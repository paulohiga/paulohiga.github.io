#!/usr/bin/env python3
"""Valida links internos, fragmentos e ids no HTML gerado pelo Jekyll.

O teste trabalha apenas sobre `_site`, sem fazer requisições à internet. Links
externos, esquemas de contato e URLs usadas pelo JavaScript ficam fora do
recorte; toda URL HTML interna precisa apontar para um arquivo publicado e,
quando leva fragmento, para um id existente nesse arquivo.
"""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse


ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "_site"
HOSTS_LOCAIS = {"", "higa.me", "www.higa.me", "localhost", "127.0.0.1"}
ESQUEMAS_IGNORADOS = {"data", "javascript", "mailto", "tel"}


class DocumentoHTML(HTMLParser):
    """Coleta ids e hrefs sem depender de BeautifulSoup no CI."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: dict[str, int] = {}
        self.duplicados: list[tuple[str, int]] = []
        self.hrefs: list[tuple[str, int]] = []

    def _atributos(self, attrs: list[tuple[str, str | None]]) -> dict[str, str]:
        return {nome: valor or "" for nome, valor in attrs}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        atributos = self._atributos(attrs)
        linha = self.getpos()[0]
        id_ = atributos.get("id")
        if id_:
            if id_ in self.ids:
                self.duplicados.append((id_, linha))
            else:
                self.ids[id_] = linha
        if "href" in atributos:
            self.hrefs.append((atributos["href"], linha))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def url_do_arquivo(arquivo: Path) -> str:
    relativo = arquivo.relative_to(SITE)
    if relativo.name == "index.html":
        pasta = relativo.parent.as_posix()
        return "/" if pasta == "." else f"/{pasta}/"
    if relativo.suffix == ".html":
        return "/" + relativo.with_suffix("").as_posix()
    return "/" + relativo.as_posix()


def arquivo_da_url(caminho: str) -> Path | None:
    """Resolve URLs pretty, `.html` e diretórios com `index.html`."""
    caminho = unquote(caminho or "/")
    if not caminho.startswith("/"):
        caminho = "/" + caminho
    relativo = caminho.lstrip("/")
    candidatos: list[Path]
    if caminho.endswith("/"):
        candidatos = [SITE / relativo / "index.html"]
    else:
        candidatos = [
            SITE / relativo,
            SITE / f"{relativo}.html",
            SITE / relativo / "index.html",
        ]
    return next((candidato for candidato in candidatos if candidato.is_file()), None)


def href_local(documento: Path, href: str) -> tuple[Path | None, str] | None:
    href = href.strip()
    if not href or href == "#":
        return None

    parsed = urlparse(href)
    if parsed.scheme.lower() in ESQUEMAS_IGNORADOS:
        return None
    if parsed.netloc and parsed.netloc.lower() not in HOSTS_LOCAIS:
        return None
    if parsed.scheme and parsed.scheme.lower() not in {"http", "https"}:
        return None

    url_atual = url_do_arquivo(documento)
    resolvida = urljoin(url_atual, href)
    alvo = urlparse(resolvida)
    arquivo = arquivo_da_url(alvo.path)
    if arquivo is None:
        return None, f"arquivo inexistente: {alvo.path or '/'}"
    return arquivo, unquote(alvo.fragment)


def main() -> int:
    if not SITE.is_dir():
        print("_site/ não existe; rode o build antes deste teste.", file=sys.stderr)
        return 1

    documentos: dict[Path, DocumentoHTML] = {}
    problemas: list[str] = []

    for arquivo in sorted(SITE.rglob("*.html")):
        parser = DocumentoHTML()
        parser.feed(arquivo.read_text(encoding="utf-8"))
        documentos[arquivo] = parser
        relativo = arquivo.relative_to(ROOT)
        for id_, linha in parser.duplicados:
            problemas.append(f"{relativo}:{linha}: id duplicado: {id_}")

    ids_fragmentos = {
        id_
        for arquivo, parser in documentos.items()
        if "notas/fragmentos/" in arquivo.relative_to(SITE).as_posix()
        for id_ in parser.ids
    }

    for documento, parser in documentos.items():
        relativo = documento.relative_to(ROOT)
        for href, linha in parser.hrefs:
            resultado = href_local(documento, href)
            if resultado is None:
                continue
            alvo, fragmento = resultado
            if alvo is None:
                problemas.append(f"{relativo}:{linha}: {href} — {fragmento}")
                continue
            ids_alvo = documentos.get(alvo, DocumentoHTML()).ids
            if (
                fragmento
                and fragmento not in ids_alvo
                and fragmento not in ids_fragmentos
            ):
                problemas.append(
                    f"{relativo}:{linha}: fragmento inexistente em {href}: #{fragmento}"
                )

    if problemas:
        print("\n".join(problemas), file=sys.stderr)
        print(f"\n{len(problemas)} problema(s) em {_site_count(documentos)} arquivo(s) HTML.", file=sys.stderr)
        return 1

    print(f"{_site_count(documentos)} arquivo(s) HTML: links internos e ids válidos.")
    return 0


def _site_count(documentos: dict[Path, DocumentoHTML]) -> int:
    return len(documentos)


if __name__ == "__main__":
    raise SystemExit(main())
