#!/usr/bin/env python3
"""Confere a integridade do índice estático de busca depois do build.

O índice é gerado pelo Liquid a partir das notas, normas e definições. Esta
verificação roda sobre o artefato publicado, porque é ali que uma atualização
de conteúdo pode revelar um destino inexistente, uma âncora quebrada ou um
registro incompleto. Usa somente a biblioteca padrão do Python para também
rodar no GitHub Actions sem instalar dependências novas.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


TIPOS = {"nota", "secao", "norma", "artigo", "definicao"}


class IdsHtml(HTMLParser):
    """Extrai ids sem depender de um parser HTML de terceiros."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()

    def handle_starttag(self, _tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for nome, valor in attrs:
            if nome == "id" and valor:
                self.ids.add(valor)


def ids_de(path: Path) -> set[str]:
    parser = IdsHtml()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser.ids


def caminho_publicado(site_dir: Path, caminho: str) -> Path:
    if caminho == "/notas":
        return site_dir / "notas.html"
    if caminho.endswith((".html", ".json")):
        return site_dir / caminho.lstrip("/")
    return site_dir / (caminho.lstrip("/") + ".html")


def remover_baseurl(caminho: str, baseurl: str) -> str:
    baseurl = baseurl.rstrip("/")
    if baseurl and (caminho == baseurl or caminho.startswith(baseurl + "/")):
        caminho = caminho[len(baseurl) :]
    return caminho or "/"


def entradas_do_indice(indice: dict) -> list[dict]:
    itens = indice.get("itens")
    if not isinstance(itens, dict):
        raise ValueError("o campo 'itens' precisa ser um objeto")

    entradas: list[dict] = []
    for nome in ("notas", "definicoes"):
        grupo = itens.get(nome)
        if not isinstance(grupo, list):
            raise ValueError(f"itens.{nome} precisa ser uma lista")
        entradas.extend(grupo)

    secoes = itens.get("secoes")
    if not isinstance(secoes, list):
        raise ValueError("itens.secoes precisa ser uma lista")
    for grupo in secoes:
        if not isinstance(grupo, dict) or not isinstance(grupo.get("itens"), list):
            raise ValueError("cada grupo de seções precisa ter uma lista 'itens'")
        entradas.extend(grupo["itens"])

    normas = itens.get("normas")
    if not isinstance(normas, list):
        raise ValueError("itens.normas precisa ser uma lista")
    for norma in normas:
        if not isinstance(norma, dict) or not isinstance(norma.get("artigos"), list):
            raise ValueError("cada norma precisa ter uma lista 'artigos'")
        entradas.append(norma)
        entradas.extend(norma["artigos"])
    return entradas


def validar(args: argparse.Namespace) -> int:
    site_dir = Path(args.site_dir).resolve()
    indice_path = site_dir / "notas" / "busca.json"
    if not indice_path.is_file():
        raise ValueError(f"índice não encontrado: {indice_path}")

    try:
        indice = json.loads(indice_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as erro:
        raise ValueError(f"JSON inválido em {indice_path}: {erro}") from erro
    if not isinstance(indice, dict) or indice.get("versao") != 1:
        raise ValueError("versão de índice ausente ou incompatível; esperada: 1")

    entradas = entradas_do_indice(indice)
    vistos: set[tuple[str, str]] = set()
    por_tipo = {tipo: 0 for tipo in TIPOS}
    documentos = {
        path: ids_de(path)
        for path in site_dir.glob("notas/**/*.html")
    }
    ids_de_fragmentos = set()
    for path, ids in documentos.items():
        if "/fragmentos/" in path.as_posix():
            ids_de_fragmentos.update(ids)
    namespaces_normas = {
        match.group(1)
        for valor in ids_de_fragmentos
        if (match := re.match(r"^([a-z0-9]+)-art-", valor))
    }

    erros: list[str] = []
    for numero, entrada in enumerate(entradas, start=1):
        if not isinstance(entrada, dict):
            erros.append(f"entrada {numero}: precisa ser um objeto")
            continue
        tipo = entrada.get("tipo")
        titulo = entrada.get("titulo")
        url = entrada.get("url")
        if tipo not in TIPOS:
            erros.append(f"entrada {numero}: tipo inválido: {tipo!r}")
        if not isinstance(titulo, str) or not titulo.strip():
            erros.append(f"entrada {numero}: título ausente")
        if not isinstance(url, str) or not url.strip():
            erros.append(f"entrada {numero}: URL ausente")
            continue
        chave = (tipo, url)
        if chave in vistos:
            erros.append(f"entrada {numero}: URL duplicada para {tipo}: {url}")
        vistos.add(chave)
        if tipo in por_tipo:
            por_tipo[tipo] += 1

        partes = urlsplit(url)
        if entrada.get("externo"):
            if partes.scheme not in {"http", "https"} or not partes.netloc:
                erros.append(f"entrada {numero}: URL externa inválida: {url}")
            continue
        if not partes.path.startswith("/notas"):
            erros.append(f"entrada {numero}: URL interna fora de /notas: {url}")
            continue

        caminho = remover_baseurl(partes.path, args.baseurl)
        destino = caminho_publicado(site_dir, caminho)
        if not destino.is_file():
            erros.append(f"entrada {numero}: destino não existe: {url}")
            continue
        if not partes.fragment or not destino.suffix == ".html":
            continue

        fragmento = unquote(partes.fragment)
        ids_destino = documentos.get(destino, set())
        if fragmento in ids_destino:
            continue
        # Links para uma norma extra usam apenas o prefixo (por exemplo,
        # #dec12880); o texto é carregado depois em /notas/fragmentos/.
        if fragmento in namespaces_normas:
            continue
        if fragmento not in ids_de_fragmentos:
            erros.append(f"entrada {numero}: âncora não encontrada: {url}")

    if erros:
        limite = "\n".join(erros[:40])
        resto = f"\n... e mais {len(erros) - 40} erro(s)" if len(erros) > 40 else ""
        raise ValueError(f"índice de busca inválido ({len(erros)} erro(s)):\n{limite}{resto}")

    total = len(entradas)
    print(
        "Índice de busca íntegro: "
        f"{total} entradas | "
        + ", ".join(f"{tipo}={por_tipo[tipo]}" for tipo in sorted(por_tipo))
        + f" | JSON={indice_path.stat().st_size} bytes"
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site-dir", default="_site", help="diretório gerado pelo Jekyll")
    parser.add_argument("--baseurl", default="", help="baseurl usado no build do Jekyll")
    args = parser.parse_args()
    try:
        return validar(args)
    except (OSError, ValueError) as erro:
        print(f"Erro: {erro}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
