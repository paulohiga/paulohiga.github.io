#!/usr/bin/env python3
"""Extrai, do texto de uma norma em `_leis/`, o **texto literal** das definições
que ela dá aos próprios termos, no formato de
`_data/definicoes/verbetes/<norma>.yml`.

A regra editorial é que o campo `definicao` de um verbete traga a letra da
norma, e não uma paráfrase (ver "Definições legais" em docs/notas.md). Escrever
isso à mão para 20 normas é caro e, pior, é o tipo de trabalho em que um erro
de transcrição não aparece — a página mostraria uma definição que a lei não
tem. Este script tira a transcrição das mãos: lê o artigo de definições, separa
termo e texto e emite o esqueleto do YAML.

O que ele reconhece:

  - **formato br** — "Art. 5º ... considera-se:" seguido de incisos romanos
    ("I - dado pessoal: informação relacionada a…;"), com as alíneas do inciso
    coladas ao texto dele. A âncora é a do inciso (`art-5-i`).
  - **formato ue** — "Artigo 4.º — Definições" seguido de itens numerados
    ("1) «Dados pessoais», informação relativa a…;"), com aspas angulares ou
    curvas, sufixo de ato alterador ("14-A)") e alíneas coladas. Item numerado
    de artigo europeu não tem âncora própria (ver "Normas estrangeiras" em
    docs/notas.md): a base traz o número do item e a âncora leva ao artigo.

**Ele não decide nada além do texto.** `tema` sai como `TODO`, e `aliases` e
`nota` ficam em branco — são curadoria, e é onde entra quem escreve. Por isso o
script é **re-executável**: quando já existe um arquivo de verbetes da norma,
ele preserva o `slug`, o `tema`, os `aliases` e a `nota` de cada verbete cujo
termo ou âncora coincida, e atualiza só o texto da definição. É assim que uma
alteração da norma se propaga sem desfazer a curadoria.

    python3 scripts/extrair_definicoes.py lgpd            # imprime o YAML
    python3 scripts/extrair_definicoes.py lgpd --gravar    # escreve o arquivo
    python3 scripts/extrair_definicoes.py --listar         # normas com artigo de definições

Depois de gravar, troque os `TODO`, escreva os `aliases` que a nota usa e rode
`python3 scripts/conferir_definicoes.py <slug>`.
"""

from __future__ import annotations

import argparse
import re
import sys
import unicodedata
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
LEIS_DIR = RAIZ / "_leis"
VERBETES_DIR = RAIZ / "_data" / "definicoes" / "verbetes"

ROMANOS = [
    "L", "XLIX", "XLVIII", "XLVII", "XLVI", "XLV", "XLIV", "XLIII", "XLII",
    "XLI", "XL", "XXXIX", "XXXVIII", "XXXVII", "XXXVI", "XXXV", "XXXIV",
    "XXXIII", "XXXII", "XXXI", "XXX", "XXIX", "XXVIII", "XXVII", "XXVI", "XXV",
    "XXIV", "XXIII", "XXII", "XXI", "XX", "XIX", "XVIII", "XVII", "XVI", "XV",
    "XIV", "XIII", "XII", "XI", "X", "IX", "VIII", "VII", "VI", "V", "IV",
    "III", "II", "I",
]
ROMANO_RE = "|".join(ROMANOS)

# "considera-se:", "adotam-se as seguintes definições:" e parentes.
GATILHO = re.compile(
    r"(considera-se|considera-se, para|entende-se por|s[ãa]o adotadas as seguintes defini"
    r"|adotam-se as seguintes defini|aplicam-se as seguintes defini"
    r"|as seguintes defini\w+ s[ãa]o adotadas|—\s*Defini[çc][õo]es"
    # O Regimento Interno da ANPD não tem artigo de definições, mas o art. 51
    # define os instrumentos pelos quais a Agência fala, um por inciso, na
    # mesma forma "termo: texto".
    r"|por meio dos seguintes instrumentos)",
    re.I,
)

INCISO_BR = re.compile(rf"^({ROMANO_RE})(-[A-Z])?\s*[-–]\s*(.+)$", re.S)
ITEM_UE = re.compile(r"^(\d+)(-[A-Z])?\)\s*(.+)$", re.S)
ALINEA = re.compile(r"^-\s*[a-z]\)", re.M)
ASPAS = re.compile(r"[«“\"]([^»”\"]+)[»”\"]")


def front_matter_e_corpo(caminho: Path) -> tuple[dict, str]:
    texto = caminho.read_text(encoding="utf-8")
    if not texto.startswith("---"):
        return {}, texto
    partes = texto.split("---\n", 2)
    if len(partes) < 3:
        return {}, texto
    return (yaml.safe_load(partes[1]) or {}), partes[2]


def blocos(corpo: str) -> list[str]:
    return [b.strip() for b in re.split(r"\n\s*\n", corpo)]


def numero_do_artigo(bloco: str, formato: str) -> str:
    palavras = bloco.split(" ")
    bruto = palavras[1] if len(palavras) > 1 else ""
    return bruto.replace("º", "").replace(".", "").replace("o", "").lower()


def sluguificar(termo: str) -> str:
    sem_acento = unicodedata.normalize("NFD", termo)
    sem_acento = "".join(c for c in sem_acento if unicodedata.category(c) != "Mn")
    limpo = re.sub(r"[^a-zA-Z0-9]+", "-", sem_acento).strip("-").lower()
    if len(limpo) <= 72:
        return limpo
    # Corta em hífen, para o slug não terminar em palavra partida.
    return limpo[:72].rsplit("-", 1)[0]


def _limpar(texto: str) -> str:
    """Junta as linhas do bloco e tira a pontuação de lista do fim."""
    texto = re.sub(r"\s*\n\s*", " ", texto).strip()
    texto = re.sub(r"[;,]\s*(e|ou)$", "", texto).strip()
    return texto.rstrip(";").rstrip(".").strip()


def _partir_br(corpo_inciso: str) -> tuple[str, str] | None:
    """"dado pessoal: informação relacionada a…" → (termo, definição).

    Duas pontuações separam o termo do texto, e as duas aparecem no acervo: os
    dois-pontos das leis (LGPD, Marco Civil, ECA Digital) e o travessão dos
    decretos ("I - conteúdo íntimo - imagem, vídeo…"). Vale a que vier antes,
    e só na primeira linha do inciso — as alíneas vêm coladas embaixo, e um
    travessão no meio da definição não pode virar corte.
    """
    primeira = corpo_inciso.split("\n", 1)[0]
    cortes = [primeira.find(": "), primeira.find(" - "), primeira.find(" – ")]
    cortes = [c for c in cortes if c > 0]
    if not cortes:
        return None
    corte = min(cortes)
    termo = primeira[:corte].strip()
    salto = 1 if primeira[corte] == ":" else 3
    definicao = (primeira[corte + salto:] + corpo_inciso[len(primeira):]).strip()
    # Um inciso pode abrir com dois-pontos e trazer as alíneas embaixo ("XV -
    # incidente de segurança: ..."); nesse caso o texto pode ficar vazio.
    if not termo or len(termo) > 160:
        return None
    return termo, definicao


def _partir_ue(corpo_item: str) -> tuple[str, list[str], str] | None:
    """"«Dados pessoais», informação relativa a…" → (termo, apelidos, definição).

    Um item pode nomear duas formas do mesmo termo ("«Micro, pequena ou média
    empresa», ou «PME», …"); a segunda vira apelido.
    """
    aspas = list(ASPAS.finditer(corpo_item))
    if not aspas:
        return None
    termo = aspas[0].group(1).strip()
    fim = aspas[0].end()
    apelidos: list[str] = []
    # "«X», ou «Y», definição" — só as aspas que vêm coladas ao termo.
    for extra in aspas[1:]:
        entre = corpo_item[fim:extra.start()]
        if not re.fullmatch(r"[,\s]*(ou|e)?[,\s]*", entre):
            break
        apelidos.append(extra.group(1).strip())
        fim = extra.end()
    resto = corpo_item[fim:].lstrip()
    resto = re.sub(r"^(do titular dos dados|do titular)\b", "", resto).lstrip()
    resto = resto.lstrip(",:").strip()
    return termo, apelidos, resto


def extrair(slug: str) -> list[dict]:
    caminho = LEIS_DIR / f"{slug}.md"
    frente, corpo = front_matter_e_corpo(caminho)
    formato = frente.get("formato", "br")
    marcador_artigo = "Artigo" if formato == "ue" else "Art."

    verbetes: list[dict] = []
    artigo = ""
    dentro = False

    def continuar(bloco: str) -> None:
        """Bloco que não abre item novo: é continuação do anterior.

        São as alíneas de um inciso ou de um número ("- a) …"), que o Kramdown
        recebe como lista solta, e os parágrafos que completam a definição.
        Entram verbatim, com a pontuação da norma, para a definição continuar
        sendo a letra dela. Só se colam ao verbete quando ele é do artigo em
        curso: sem essa trava, um artigo mais adiante da norma emendaria texto
        na última definição extraída.
        """
        if not verbetes or not verbetes[-1]["ancora"].startswith(f"art-{artigo}"):
            return
        verbetes[-1]["definicao"] += "\n\n" + bloco.strip()

    for bloco in blocos(corpo):
        if not bloco or bloco[0] == "#" or "~~" in bloco or bloco[0] == ">":
            continue
        palavras = bloco.split(" ")
        if palavras[0] == marcador_artigo:
            artigo = numero_do_artigo(bloco, formato)
            dentro = bool(GATILHO.search(bloco[:400]))
            continue
        if not dentro:
            continue
        if palavras[0] in ("§", "Parágrafo"):
            dentro = False
            continue

        if formato == "ue":
            achado = ITEM_UE.match(bloco)
            if not achado:
                # Um item pode vir sem número — o Regulamento (UE) 2025/2518
                # tem uma definição solta. Fora esse caso, o bloco é o
                # preâmbulo do artigo ("Para efeitos do presente regulamento,
                # entende-se por:"), antes do primeiro item, ou continuação do
                # último.
                partido = _partir_ue(bloco) if ASPAS.match(bloco) else None
                if not partido:
                    continuar(bloco)
                    continue
                termo, apelidos, definicao = partido
                verbetes.append({
                    "termo": termo, "apelidos": apelidos,
                    "definicao": _limpar(definicao),
                    "base": f"art. {artigo}.º", "ancora": f"art-{artigo}",
                })
                continue
            numero = achado.group(1) + (achado.group(2) or "")
            partido = _partir_ue(achado.group(3))
            if not partido:
                continuar(bloco)
                continue
            termo, apelidos, definicao = partido
            verbetes.append({
                "termo": termo, "apelidos": apelidos,
                "definicao": _limpar(definicao),
                "base": f"art. {artigo}.º, {numero})", "ancora": f"art-{artigo}",
            })
            continue

        achado = INCISO_BR.match(bloco)
        if not achado:
            continuar(bloco)
            continue
        romano = achado.group(1) + (achado.group(2) or "")
        partido = _partir_br(achado.group(3))
        if not partido:
            # Inciso que não separa termo de definição: o artigo não é de
            # definições, apesar do gatilho ("Considera-se efetuada a ciência
            # oficial com a intimação: I - por meio eletrônico…"). Encerra.
            dentro = False
            continue
        termo, definicao = partido
        verbetes.append({
            "termo": termo, "apelidos": [],
            "definicao": _limpar(definicao),
            "base": f"art. {artigo}, {romano}",
            "ancora": f"art-{artigo}-{romano.lower()}",
        })

    return verbetes


def curadoria_existente(slug: str) -> dict[str, dict]:
    """Curadoria já escrita, indexada por termo normalizado e por âncora.

    A âncora só entra no índice quando é **única** no arquivo: numa norma
    europeia, as 70 definições do artigo 3.º compartilham a âncora `art-3` (o
    item numerado não recebe id próprio), e indexar por ela faria toda
    definição herdar a curadoria da primeira. O termo é a chave que sempre
    vale; a âncora serve ao caso em que o termo mudou de redação.
    """
    arquivo = VERBETES_DIR / f"{slug}.yml"
    if not arquivo.exists():
        return {}
    atuais = yaml.safe_load(arquivo.read_text(encoding="utf-8")) or []

    quantas: dict[str, int] = {}
    for verbete in atuais:
        for base in verbete.get("bases") or []:
            if base.get("ancora"):
                quantas[base["ancora"]] = quantas.get(base["ancora"], 0) + 1

    indice: dict[str, dict] = {}
    for verbete in atuais:
        chaves = [sluguificar(verbete.get("termo", ""))]
        for base in verbete.get("bases") or []:
            ancora = base.get("ancora")
            if ancora and quantas[ancora] == 1:
                chaves.append("@" + ancora)
        for chave in chaves:
            indice.setdefault(chave, verbete)
    return indice


def montar(slug: str) -> str:
    extraidos = extrair(slug)
    antigos = curadoria_existente(slug)
    saida: list[dict] = []
    usados: set[str] = set()

    for bruto in extraidos:
        chave = sluguificar(bruto["termo"])
        anterior = antigos.get(chave) or antigos.get("@" + bruto["ancora"]) or {}
        proposto = anterior.get("slug") or chave
        while proposto in usados:
            proposto += "-2"
        usados.add(proposto)

        verbete: dict = {
            "termo": bruto["termo"][0].upper() + bruto["termo"][1:],
            "slug": proposto,
            "tema": anterior.get("tema", "TODO"),
            "bases": [{"texto": bruto["base"], "ancora": bruto["ancora"]}],
        }
        apelidos = list(anterior.get("aliases") or []) + [
            a for a in bruto["apelidos"] if a not in (anterior.get("aliases") or [])
        ]
        if apelidos:
            verbete["aliases"] = apelidos
        verbete["definicao"] = bruto["definicao"].strip()
        if anterior.get("nota"):
            verbete["nota"] = anterior["nota"]
        saida.append(verbete)

    return yaml.safe_dump(saida, allow_unicode=True, sort_keys=False, width=78)


def listar() -> None:
    for caminho in sorted(LEIS_DIR.glob("*.md")):
        achados = extrair(caminho.stem)
        if achados:
            print(f"{caminho.stem}: {len(achados)} definição(ões)")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("slug", nargs="?", help="norma em _leis/")
    parser.add_argument("--gravar", action="store_true",
                        help="escreve _data/definicoes/verbetes/<slug>.yml")
    parser.add_argument("--listar", action="store_true",
                        help="lista as normas com artigo de definições")
    args = parser.parse_args()

    if args.listar:
        listar()
        return 0
    if not args.slug:
        parser.error("informe o slug da norma, ou use --listar")
    if not (LEIS_DIR / f"{args.slug}.md").exists():
        print(f"{args.slug}: norma inexistente em _leis/", file=sys.stderr)
        return 1

    texto = montar(args.slug)
    if not texto.strip():
        print(f"{args.slug}: nenhuma definição reconhecida", file=sys.stderr)
        return 1
    if args.gravar:
        (VERBETES_DIR / f"{args.slug}.yml").write_text(texto, encoding="utf-8")
        print(f"{args.slug}: gravado")
    else:
        print(texto)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
