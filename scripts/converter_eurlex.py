"""Converte o HTML oficial do EUR-Lex (formato CONVEX do Jornal Oficial) para o
Markdown puro que a coleção `_leis` espera, no dialeto `formato: ue`.

Regras de saída (ver _includes/lei-anotada.html):
  "Artigo 5.º — Epígrafe"   → bloco de artigo   → id art-5
  "1. Texto do número"      → bloco de número   → id art-5-p1
  "a) Texto da alínea"      → bloco de alínea   → id art-5-p1-a

Dois casos que não podem virar dispositivo, e por isso saem de outra forma:

- **subníveis** (i, ii, iii… ou a), b) dentro de uma alínea) colidiriam com as
  alíneas do mesmo número, então viram lista Markdown ("- i) ..."), que não
  abre bloco de dispositivo;
- **texto citado** entre «aspas» — que num regulamento alterador como o Omnibus
  é quase todo o conteúdo — vira bloco de citação (`> `), do mesmo jeito que o
  art. 60 da LGPD já aparece em `_leis/lgpd.md`. O include não ancora bloco de
  citação: é alteração feita em *outro* ato, não dispositivo deste.

O que fica de fora, e por quê: os **considerandos** (180 no AI Act, mais de
metade do documento) e o **aparato de notas de rodapé** do JO, que são
referências de publicação. O articulado e os anexos entram íntegros. É uma
decisão de peso de página — o texto legal vai inline no HTML da nota —, não
editorial; `--com-considerandos` inclui os considerandos, se um dia fizer
sentido.

Uso:
    python3 scripts/converter_eurlex.py <arquivo.html> [--com-considerandos] > _leis/<slug>.md

O HTML de entrada é o "Texto integral" em português baixado do EUR-Lex. O
script depende de `beautifulsoup4` e `lxml`, que são **ferramenta de autoria**
— não entram no site, como o `pyyaml` de `ancorar_referencias.py`:

    pip install beautifulsoup4 lxml

Depois de gerar o arquivo, acrescente o front matter (`titulo`, `apelido`,
`fonte`, `formato: ue`, e `tipo`/`prefixo` se for norma adicional) e confira as
remissões da nota contra o texto:

    python3 scripts/ancorar_referencias.py --check <nota>
"""
from __future__ import annotations

import re
import sys
import warnings
from pathlib import Path

from bs4 import BeautifulSoup, XMLParsedAsHTMLWarning

warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)

# Enumerador de lista do JO: "a)", "iii)", "12)", "14-B)", "1.", "—".
ENUMERADOR = re.compile(r"^(?:[a-zA-Z]{1,5}|\d{1,3})(?:[-–][A-Za-z0-9]{1,3})?\)$|^[—–-]$|^\d{1,3}\.$")
CONSIDERANDO = re.compile(r"^\(\d+\)$")
CABECALHO_JO = re.compile(r"^\d{4}/\d+ — \d|^Jornal Oficial da União")


def texto(no) -> str:
    """Texto de um nó, com os ordinais do EUR-Lex remontados ("5.<sup>o</sup>"
    → "5.º") e as chamadas de nota de rodapé removidas."""
    copia = BeautifulSoup(str(no), "lxml")
    for tag in copia.select("span.oj-note-tag"):
        tag.decompose()
    for tag in copia.find_all("span", class_="oj-super"):
        bruto = tag.get_text(strip=True)
        tag.replace_with("º" if bruto in ("o", "os") else ("ª" if bruto in ("a", "as") else bruto))
    for tag in copia.find_all("a"):
        tag.replace_with(tag.get_text())

    t = copia.get_text(" ", strip=True).replace("\xa0", " ")
    t = re.sub(r"\s+([ºª])", r"\1", t)
    t = re.sub(r"([ºª])\s+([-–])", r"\1\2", t)
    t = re.sub(r"\(\s*\)", "", t)            # parênteses vazios da nota removida
    t = re.sub(r"\s+([,.;:)»])", r"\1", t)
    t = re.sub(r"([«(])\s+", r"\1", t)
    t = re.sub(r"[ \t]+", " ", t).strip()
    t = re.sub(r"^(\d+\.)\s+", r"\1 ", t)    # "1.   Texto" → "1. Texto"
    return t


def escapar(t: str) -> str:
    """Neutraliza o que o Kramdown leria como marcação e não é do texto legal."""
    t = t.replace("~~", "~ ~")
    return re.sub(r"^([#>*+])", r"\\\1", t)


def neutralizar_lista(bloco: str) -> str:
    """"1. Texto" é, para o Kramdown, uma lista ordenada — e num regulamento
    europeu é o número do artigo. Sem escapar o ponto, o dispositivo vira <ol>
    (perde a âncora, que o include põe no primeiro <p>) e cada bloco reinicia a
    numeração em 1. O escape `1\.` sai renderizado como "1." e mantém o bloco
    sendo um parágrafo. Vale também dentro de bloco de citação e de item de
    lista aninhada."""
    linhas = []
    for linha in bloco.split("\n"):
        prefixo, resto = re.match(r"^((?:> |- |  )*)(.*)$", linha).groups()
        linhas.append(prefixo + re.sub(r"^(\d{1,3})\.(?=\s)", r"\1\\.", resto))
    return "\n".join(linhas)


def citado(no) -> bool:
    """Um texto citado — a redação que o ato dá a *outro* ato — vem sempre
    embrulhado num <div> extra pelo conversor do Jornal Oficial: um <div> sem
    atributo algum, no corpo do artigo, ou um <div> dentro da célula quando a
    alteração está numa lista.

    Contar as aspas «» não serve: o JO fecha a citação depois da chamada de
    nota (o art. 102.º do AI Act abre « e nunca fecha), e o português usa as
    mesmas aspas para o termo definido — as 68 definições do artigo 3.º
    começam com «, e não são citação nenhuma.
    """
    for d in no.find_parents("div"):
        if not d.attrs:
            return True
        if d.find_parent("td") is not None and not (d.get("class") or []):
            return True
        if d.get("class"):
            return False   # eli-subdivision / eli-title: chegou ao corpo do ato
    return False


def bloco_citacao(paragrafos: list[str]) -> str:
    return "\n> \n".join("> " + p for p in paragrafos)


def agrupar_filhas(filhas: list[str]) -> list[str]:
    """Itens de lista consecutivos ficam num bloco só (uma <ul>); um bloco de
    citação no meio precisa de linha em branco antes e depois, senão o Kramdown
    o engole na lista."""
    blocos, corrida = [], []
    for f in filhas:
        if f.startswith(">"):
            if corrida:
                blocos.append("\n".join(corrida))
                corrida = []
            blocos.append(f)
        else:
            corrida.append(f)
    if corrida:
        blocos.append("\n".join(corrida))
    return blocos


def paragrafos_do_item(td, tabela):
    """Parágrafos e tabelas filhas de uma célula, em ordem de documento,
    ignorando o que pertence a uma tabela mais aninhada."""
    for el in td.find_all(["p", "table"]):
        if el.name == "table":
            if el.find_parent("table") is tabela:
                yield "tabela", el
        elif el.find_parent("table") is tabela:
            yield "citacao" if citado(el) else "texto", el


def itens_de_tabela(tabela, nivel: int) -> list[str]:
    """Uma tabela do JO é quase sempre uma lista: coluna 1 = enumerador,
    coluna 2 = texto. No nível 0 cada item vira bloco próprio (alínea); a
    partir do nível 1 vira item de lista Markdown, que não recebe âncora."""
    blocos: list[str] = []
    corpo = tabela.find("tbody") or tabela
    # Uma lista dentro de texto citado é citada por inteiro: sem isto, a
    # primeira alínea (que traz a aspa de abertura) sairia como citação e as
    # seguintes como lista solta, fora das aspas.
    tabela_citada = citado(tabela)

    for tr in corpo.find_all("tr", recursive=False):
        tds = tr.find_all("td", recursive=False)
        if len(tds) != 2:
            celulas = [texto(td) for td in tds]
            if any(celulas):
                blocos.append(escapar(" — ".join(c for c in celulas if c)))
            continue

        marcador = texto(tds[0])

        # Fragmentos da célula, em ordem de documento — a ordem importa: um
        # número inserido pode ter texto, depois alíneas, depois o fecho.
        fragmentos: list[tuple[str, object]] = []
        for tipo, el in paragrafos_do_item(tds[1], tabela):
            if tipo == "tabela":
                fragmentos.append(("filhas", itens_de_tabela(el, nivel + 1)))
            elif (t := texto(el)) and t not in (";", ".", ","):
                fragmentos.append((tipo, t))

        cabeca = []
        while fragmentos and fragmentos[0][0] == "texto":
            cabeca.append(fragmentos.pop(0)[1])
        corpo_item = " ".join(cabeca).strip()

        # Item inteiramente dentro de um texto citado: o enumerador já vem com
        # a aspa («g)), ou o corpo é só citação. Vira bloco de citação, que o
        # include não ancora.
        citado_todo = (tabela_citada or marcador.startswith("«")
                       or (not cabeca and any(f[0] == "citacao" for f in fragmentos)))
        recuo = "" if nivel == 0 else f"{'  ' * (nivel - 1)}- "

        if citado_todo:
            # Tudo do item entra na citação, em ordem: o primeiro trecho de
            # texto acompanha o enumerador («b-A) A colocação no mercado…), os
            # demais viram linhas próprias. Um filho que já veio como citação
            # perde o seu "> " para não virar citação dentro de citação.
            sequencia = list(cabeca)
            for tipo, valor in fragmentos:
                sequencia.extend(valor if tipo == "filhas" else [valor])
            sequencia = [re.sub(r"(?m)^> ?", "", s).strip() for s in sequencia]
            primeiro = sequencia.pop(0) if sequencia else ""
            linhas = [f"{marcador} {primeiro}".strip()] + sequencia
            blocos.append(bloco_citacao([l for l in linhas if l]))
            continue

        if not ENUMERADOR.match(marcador):
            if (junto := f"{marcador} {corpo_item}".strip()):
                blocos.append(escapar(junto))
        else:
            blocos.append(f"{recuo}{marcador} {corpo_item}".rstrip())

        pendentes: list[str] = []
        for tipo, valor in fragmentos:
            if tipo == "citacao":
                pendentes.append(valor)
                continue
            if pendentes:
                blocos.append(bloco_citacao(pendentes))
                pendentes = []
            if tipo == "filhas":
                blocos.extend(agrupar_filhas(valor))
            else:
                blocos.append(escapar(valor))
        if pendentes:
            blocos.append(bloco_citacao(pendentes))

    return blocos


def converter(caminho: Path, com_considerandos: bool = False) -> str:
    sopa = BeautifulSoup(caminho.read_text(encoding="utf-8", errors="replace"), "lxml")
    for tag in sopa.select("p.oj-note, div.oj-doc-end, p.oj-doc-sep, div.oj-final,"
                           " p.oj-signatory, p.oj-separator"):
        tag.decompose()

    blocos: list[str] = []
    vistos = set()
    considerandos = False
    citacao_aberta: list[str] = []

    def fechar_citacao():
        if citacao_aberta:
            blocos.append(bloco_citacao(citacao_aberta))
            citacao_aberta.clear()

    for no in sopa.find_all(["p", "table"]):
        if no.find_parent("table") is not None:
            continue  # linhas são consumidas inteiras por itens_de_tabela

        if no.name == "table":
            fechar_citacao()
            corpo = no.find("tbody") or no
            primeira = corpo.find("td")
            if considerandos and not com_considerandos and CONSIDERANDO.match(texto(primeira) if primeira else ""):
                continue
            blocos.extend(itens_de_tabela(no, 0))
            continue

        t = texto(no)
        if not t or CABECALHO_JO.match(t):
            continue

        if citado(no):
            citacao_aberta.append(t)
            continue
        fechar_citacao()

        if t == "Considerando o seguinte:":
            considerandos = True
            if not com_considerandos:
                continue
        elif t.startswith(("ADOTARAM O PRESENTE", "ADOTOU O PRESENTE")):
            considerandos = False
        if considerandos and not com_considerandos:
            continue

        classes = set(no.get("class") or [])

        if "oj-ti-art" in classes:
            pai = no.find_parent("div", class_="eli-subdivision") or no.parent
            sti = pai.find("p", class_="oj-sti-art") if pai else None
            titulo = f"{t} — {texto(sti)}" if sti and texto(sti) and not citado(sti) else t
            if titulo in vistos:
                continue
            vistos.add(titulo)
            blocos.append(titulo)
            continue

        if "oj-sti-art" in classes:
            continue  # já saiu junto do "Artigo N.º"

        if "oj-doc-ti" in classes:
            blocos.append(("## " if t.startswith("ANEXO") else "# ") + t)
            continue

        if "oj-ti-section-1" in classes:
            blocos.append("## " + t)
            continue

        if classes & {"oj-ti-section-2", "oj-ti-grseq-1"}:
            blocos.append("### " + t)
            continue

        blocos.append(escapar(t))

    fechar_citacao()

    # "CAPÍTULO III" / "SISTEMAS DE IA DE RISCO ELEVADO" e "ANEXO I" / epígrafe
    # saem em dois parágrafos no JO; aqui viram um título só.
    saida: list[str] = []
    for b in blocos:
        anterior = saida[-1] if saida else ""
        abre_unidade = re.match(r"^#{1,2} (CAPÍTULO|SECÇÃO|ANEXO)\b", anterior)
        segue_epigrafe = re.match(r"^#{1,3} ", b) and not re.match(r"^#{1,3} (CAPÍTULO|SECÇÃO|ANEXO)\b", b)
        if abre_unidade and segue_epigrafe:
            saida[-1] = anterior + " — " + re.sub(r"^#+ ", "", b)
        elif b.strip() and b.strip() != anterior.strip():
            saida.append(b)

    # O JO quebra o título do ato em quatro parágrafos; aqui vira um título só
    # + subtítulo em itálico, como nas leis brasileiras já publicadas.
    cabecalho = []
    while saida and saida[0].startswith("# "):
        cabecalho.append(saida.pop(0)[2:])
    if cabecalho:
        titulo = cabecalho[0]
        if len(cabecalho) > 1 and re.match(r"^de \d", cabecalho[1]):
            titulo += ", " + cabecalho.pop(1)
        saida = [f"# {titulo}"] + [f"*{c}*" for c in cabecalho[1:]] + saida

    return "\n\n".join(neutralizar_lista(b) for b in saida) + "\n"


if __name__ == "__main__":
    sys.stdout.write(converter(Path(sys.argv[1]), "--com-considerandos" in sys.argv))
