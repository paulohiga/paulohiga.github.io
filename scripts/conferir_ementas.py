#!/usr/bin/env python3
"""Confere as ementas de `_data/ementas/<norma>.yml` contra os artigos de
`_leis/<norma>.md`.

A ementa é o rótulo que o sumário do painel "Lei seca" usa no lugar do começo
do caput (ver "Ementas dos artigos" em docs/notas.md). Ela vive num arquivo
separado do texto legal, o que é bom — o texto da norma não se altera — mas
significa que nada avisa quando os dois saem de sincronia: um artigo novo entra
sem rótulo, uma ementa órfã fica apontando para artigo que já não existe, e o
sumário volta ao começo do caput sem que ninguém perceba.

Este script é esse aviso. Ele percorre a norma bloco a bloco com a mesma regra
de `_includes/lei-anotada.html` — só que atrás de artigo, que é o único
dispositivo com ementa — e compara com as chaves do arquivo, reportando:

  - artigo sem ementa (o sumário cai no começo do caput);
  - ementa sem artigo correspondente (chave errada, ou artigo que saiu da
    norma);
  - ementa comprida demais para caber no rótulo sem corte.

    python3 scripts/conferir_ementas.py            # todas as normas
    python3 scripts/conferir_ementas.py lgpd mci   # só estas

Sai com status 1 se houver qualquer problema, para poder ser encadeado.

O limite de tamanho é empírico, medido no navegador: o painel do sumário tem
20rem, o item do artigo usa 0,82rem e cabe em duas linhas de cerca de 36
caracteres, das quais o marcador ("Art. 55-A ") já come um pedaço. 52
caracteres é onde a frase ainda entra inteira mesmo quando a quebra de linha
cai no pior lugar possível.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
EMENTAS_DIR = RAIZ / "_data" / "ementas"
LEIS_DIR = RAIZ / "_leis"

LIMITE = 52


def _corpo_e_formato(caminho: Path) -> tuple[str, str]:
    texto = caminho.read_text(encoding="utf-8")
    if not texto.startswith("---"):
        return texto, "br"
    partes = texto.split("---\n", 2)
    if len(partes) < 3:
        return texto, "br"
    frente = yaml.safe_load(partes[1]) or {}
    return partes[2], frente.get("formato", "br")


def artigos_da_lei(slug: str) -> list[str]:
    """Ids dos artigos da norma, na ordem do texto.

    Mesmo recorte de `lei-anotada.html`: bloco separado por linha em branco,
    aberto por "Art." (formato br) ou "Artigo" (formato ue). Título (`#`) e
    redação superada (`~~`) ficam de fora, como lá — e um dispositivo dentro de
    bloco de citação também, porque o bloco abre com ">" e não com o marcador.
    """
    corpo, formato = _corpo_e_formato(LEIS_DIR / f"{slug}.md")
    artigos: list[str] = []
    for bloco in re.split(r"\n\s*\n", corpo):
        bruto = bloco.strip()
        if not bruto or bruto[0] == "#" or "~~" in bruto:
            continue
        palavras = bruto.split(" ")
        if formato == "ue":
            if palavras[0] != "Artigo":
                continue
            numero = palavras[1].replace("º", "").replace("o", "").replace(".", "")
        else:
            if palavras[0] != "Art.":
                continue
            numero = palavras[1].replace("º", "").replace(".", "")
        artigos.append(f"art-{numero.lower()}")
    return artigos


def conferir(slug: str) -> list[str]:
    arquivo = EMENTAS_DIR / f"{slug}.yml"
    if not arquivo.exists():
        return [f"{slug}: sem arquivo de ementas ({arquivo.relative_to(RAIZ)})"]

    ementas = yaml.safe_load(arquivo.read_text(encoding="utf-8")) or {}
    esperados = artigos_da_lei(slug)

    problemas: list[str] = []
    for id_ in esperados:
        if id_ not in ementas:
            problemas.append(f"{slug}: {id_} sem ementa")
    for id_ in ementas:
        if id_ not in esperados:
            problemas.append(f"{slug}: ementa órfã em {id_}")
    for id_, texto in ementas.items():
        if not isinstance(texto, str) or not texto.strip():
            problemas.append(f"{slug}: {id_} com ementa vazia")
        elif len(texto) > LIMITE:
            problemas.append(
                f"{slug}: {id_} com {len(texto)} caracteres (limite {LIMITE}) — {texto}"
            )
    return problemas


def main() -> int:
    slugs = sys.argv[1:] or sorted(p.stem for p in LEIS_DIR.glob("*.md"))
    problemas: list[str] = []
    for slug in slugs:
        if not (LEIS_DIR / f"{slug}.md").exists():
            problemas.append(f"{slug}: norma inexistente em _leis/")
            continue
        problemas.extend(conferir(slug))

    for p in problemas:
        print(p)
    if problemas:
        print(f"\n{len(problemas)} problema(s).")
        return 1
    print(f"{len(slugs)} norma(s) conferida(s): toda ementa no lugar.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
