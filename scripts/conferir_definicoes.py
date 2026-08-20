#!/usr/bin/env python3
"""Confere os verbetes de `_data/definicoes/verbetes/<norma>.yml`.

A página `/notas/definicoes` reúne as definições que antes ficavam repetidas no
começo de cada nota. Ela é montada só de dados, e é isso que a torna frágil de
um jeito silencioso: âncora errada não quebra o build — vira um link que não vai
a lugar nenhum, numa página pública de legislação. Este script é o aviso.

O que ele confere, por norma:

  - a norma existe em `_leis/` e está registrada em `_data/normas.yml` (é de lá
    que a página tira a nota e o prefixo com que monta o link da base legal);
  - todo verbete tem `termo`, `slug`, `tema`, `definicao` e ao menos uma base;
  - o `slug` é minúsculo, sem acento, e único dentro da norma;
  - o `tema` é um dos declarados em `_data/definicoes/temas.yml`;
  - toda `ancora` de base existe de fato no texto da norma, com a mesma regra de
    `_includes/lei-anotada.html` (via `ids_da_lei`, de `ancorar_referencias`);
  - nenhum termo ou apelido colide com outro **dentro da mesma nota** — é a
    colisão que importa, porque o índice que marca os termos no comentário é
    montado com as normas daquela nota, e duas entradas com o mesmo texto
    deixariam a marcação escolher no escuro.

    python3 scripts/conferir_definicoes.py            # todas as normas
    python3 scripts/conferir_definicoes.py lgpd mci   # só estas

Sai com status 1 se houver qualquer problema, para poder ser encadeado.
"""

from __future__ import annotations

import re
import sys
import unicodedata
from pathlib import Path

import yaml

from ancorar_referencias import ids_da_lei

RAIZ = Path(__file__).resolve().parent.parent
VERBETES_DIR = RAIZ / "_data" / "definicoes" / "verbetes"
TEMAS_YML = RAIZ / "_data" / "definicoes" / "temas.yml"
NORMAS_YML = RAIZ / "_data" / "normas.yml"
NOTAS_DIR = RAIZ / "_notas"
LEIS_DIR = RAIZ / "_leis"

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
OBRIGATORIOS = ("termo", "slug", "tema", "definicao")


def _yaml(caminho: Path):
    return yaml.safe_load(caminho.read_text(encoding="utf-8"))


def _front_matter(caminho: Path) -> dict:
    texto = caminho.read_text(encoding="utf-8")
    if not texto.startswith("---"):
        return {}
    partes = texto.split("---\n", 2)
    return yaml.safe_load(partes[1]) if len(partes) >= 3 else {}


def normalizar(texto: str) -> str:
    """Mesma normalização da marcação de termos no `notas.js`: sem acento, em
    minúsculas. É nesse espaço que a colisão entre dois termos acontece."""
    sem_acento = unicodedata.normalize("NFD", texto)
    sem_acento = "".join(c for c in sem_acento if unicodedata.category(c) != "Mn")
    return sem_acento.lower().strip()


def conferir(slug: str, temas: set[str], registro: dict) -> list[str]:
    arquivo = VERBETES_DIR / f"{slug}.yml"
    problemas: list[str] = []

    if not (LEIS_DIR / f"{slug}.md").exists():
        return [f"{slug}: norma inexistente em _leis/"]
    if slug not in registro:
        problemas.append(f"{slug}: norma sem entrada em _data/normas.yml")

    verbetes = _yaml(arquivo) or []
    if not isinstance(verbetes, list):
        return [f"{slug}: o arquivo precisa ser uma lista de verbetes"]

    validos = ids_da_lei(slug, "")
    vistos: set[str] = set()

    for i, verbete in enumerate(verbetes, start=1):
        onde = f"{slug}[{i}]"
        if not isinstance(verbete, dict):
            problemas.append(f"{onde}: verbete precisa ser um mapa")
            continue
        onde = f"{slug}/{verbete.get('slug') or i}"

        for campo in OBRIGATORIOS:
            if not str(verbete.get(campo) or "").strip():
                problemas.append(f"{onde}: sem `{campo}`")

        chave = str(verbete.get("slug") or "")
        if chave and not SLUG_RE.match(chave):
            problemas.append(f"{onde}: slug fora do formato (minúsculas, sem acento, hifens)")
        if chave in vistos:
            problemas.append(f"{onde}: slug repetido na norma")
        vistos.add(chave)

        tema = verbete.get("tema")
        if tema and tema not in temas:
            problemas.append(f"{onde}: tema `{tema}` não está em _data/definicoes/temas.yml")

        bases = verbete.get("bases") or []
        if not bases:
            problemas.append(f"{onde}: sem base legal")
        for base in bases:
            if not isinstance(base, dict) or not str(base.get("texto") or "").strip():
                problemas.append(f"{onde}: base sem `texto`")
                continue
            ancora = base.get("ancora")
            if ancora and ancora not in validos:
                problemas.append(f"{onde}: âncora `{ancora}` não existe em _leis/{slug}.md")

    return problemas


def conferir_colisoes(por_norma: dict[str, list]) -> list[str]:
    """Termos e apelidos repetidos dentro de uma mesma nota.

    O índice que marca os termos no painel de comentários é montado com as
    normas daquela nota (a principal e as de `normas_extra`). Se duas entradas
    chegarem lá com o mesmo texto, a marcação abriria uma delas por sorteio.
    """
    problemas: list[str] = []
    for nota in sorted(NOTAS_DIR.glob("*.md")):
        frente = _front_matter(nota)
        normas = [frente.get("lei")] + list(frente.get("normas_extra") or [])
        formas: dict[str, str] = {}
        for norma in normas:
            for verbete in por_norma.get(norma, []):
                textos = [verbete.get("termo", "")] + list(verbete.get("aliases") or [])
                for texto in textos:
                    chave = normalizar(texto)
                    dono = f"{norma}/{verbete.get('slug')}"
                    if chave in formas and formas[chave] != dono:
                        problemas.append(
                            f"{nota.stem}: \"{texto}\" está em {formas[chave]} e em {dono}"
                        )
                    formas[chave] = dono
    return problemas


def main() -> int:
    temas = {t["id"] for t in (_yaml(TEMAS_YML) or [])}
    registro = _yaml(NORMAS_YML) or {}
    slugs = sys.argv[1:] or sorted(p.stem for p in VERBETES_DIR.glob("*.yml"))

    problemas: list[str] = []
    por_norma: dict[str, list] = {}
    for slug in slugs:
        arquivo = VERBETES_DIR / f"{slug}.yml"
        if not arquivo.exists():
            problemas.append(f"{slug}: sem arquivo de verbetes ({arquivo.relative_to(RAIZ)})")
            continue
        problemas.extend(conferir(slug, temas, registro))
        por_norma[slug] = _yaml(arquivo) or []

    if not sys.argv[1:]:
        for arquivo in VERBETES_DIR.glob("*.yml"):
            por_norma.setdefault(arquivo.stem, _yaml(arquivo) or [])
        problemas.extend(conferir_colisoes(por_norma))

    for p in problemas:
        print(p)
    if problemas:
        print(f"\n{len(problemas)} problema(s).")
        return 1
    total = sum(len(v) for v in por_norma.values())
    print(f"{len(slugs)} norma(s) conferida(s), {total} verbete(s): toda base no lugar.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
