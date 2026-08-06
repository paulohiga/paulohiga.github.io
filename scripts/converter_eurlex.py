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

O ato entra inteiro: preâmbulo, **considerandos**, articulado e anexos. Os
considerandos importam de verdade num regulamento europeu — são eles que dizem
por que cada regra existe, e a Comissão e o Tribunal de Justiça os usam para
interpretar o articulado. Não recebem âncora (não são dispositivos), mas ficam
no painel, pesquisáveis.

Fica de fora só o **aparato de notas de rodapé** do JO, que é referência
bibliográfica de publicação e não texto normativo.

Dois HTML, uma saída
--------------------

O EUR-Lex publica o mesmo ato em duas marcações diferentes, e o script lê as
duas:

- o **Jornal Oficial** (folha de estilo `oj-*`), que traz o ato como publicado
  — com preâmbulo e considerandos, e sem as retificações posteriores;
- o **texto consolidado** (folha de estilo `clg.css`), que traz o articulado
  em vigor, já com as retificações e alterações incorporadas, mas **sem o
  preâmbulo nem os considerandos** — o próprio EUR-Lex avisa que "as versões
  dos atos relevantes que fazem fé, incluindo os respetivos preâmbulos, são as
  publicadas no Jornal Oficial".

`normalizar_consolidado()` reescreve a segunda marcação na primeira, para o
resto do script não precisar saber de qual das duas veio o arquivo. Quando as
duas coisas são necessárias — considerandos *e* articulado corrigido —, é o
caso de converter os dois arquivos e juntá-los por script (ver
`scripts/montar_rgpd.py`).

Uso:
    python3 scripts/converter_eurlex.py <arquivo.html> > _leis/<slug>.md

O HTML de entrada é o "Texto integral" (ou o "Texto consolidado") em português
baixado do EUR-Lex. O script depende de `beautifulsoup4` e `lxml`, que são
**ferramenta de autoria** — não entram no site, como o `pyyaml` de
`ancorar_referencias.py`:

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

from bs4 import BeautifulSoup, NavigableString, XMLParsedAsHTMLWarning

warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)

# Enumerador de lista do JO: "a)", "iii)", "12)", "14-B)", "1.", "—".
ENUMERADOR = re.compile(r"^(?:[a-zA-Z]{1,5}|\d{1,3})(?:[-–][A-Za-z0-9]{1,3})?\)$|^[—–-]$|^\d{1,3}\.$")
CABECALHO_JO = re.compile(r"^\d{4}/\d+ — \d|^Jornal Oficial da União")

# Marca de alteração da consolidação: "▼B", "▼C1", "►C1" e o "◄" que fecha um
# trecho corrigido no meio de uma frase.
MARCA_ALTERACAO = re.compile(r"^[▼►◄]\s*[A-Z]?\d*$")

# Marcação do texto consolidado (clg.css) → marcação do Jornal Oficial (oj-*).
# O que muda de nome é só isto; o que muda de *forma* está em
# normalizar_consolidado(), abaixo.
CLASSES_CONSOLIDADO = {
    "title-doc-first": "oj-doc-ti",
    "title-doc-last": "oj-doc-ti",
    "title-division-1": "oj-ti-section-1",
    "title-division-2": "oj-ti-section-2",
    "title-article-norm": "oj-ti-art",
    "stitle-article-norm": "oj-sti-art",
    "norm": "oj-normal",
    "superscript": "oj-super",
    "italics": "oj-italic",
    "boldface": "oj-bold",
    "expanded": "oj-expanded",
}


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


def _numerar_dispositivo(sopa, div) -> None:
    """No texto consolidado, o número do dispositivo e o texto dele são irmãos:

        <div class="norm">
          <span class="no-parag">2.  </span>
          <div class="norm inline-element">O responsável pelo tratamento…</div>
        </div>

    No Jornal Oficial os dois são um parágrafo só ("2.   O responsável…"), e é
    dessa forma que o include reconhece o dispositivo e lhe dá a âncora
    `art-5-p2`. Aqui o número volta para dentro do primeiro parágrafo do
    dispositivo."""
    marcador = div.find("span", class_="no-parag")
    if marcador is None or marcador.parent is not div:
        return
    numero = marcador.get_text(" ", strip=True)
    marcador.extract()

    interno = div.find("div", class_="inline-element") or div
    filhos = interno.find_all(["p", "div", "table"], recursive=False)

    if not filhos:
        # O texto está solto no contêiner: ele próprio é o parágrafo.
        interno.name = "p"
        interno["class"] = ["norm"]
        interno.insert(0, NavigableString(numero + " "))
        return

    primeiro = interno.find("p", recursive=False)
    if primeiro is not None and primeiro is filhos[0]:
        primeiro.insert(0, NavigableString(numero + " "))
        return

    # Número que abre direto numa lista de alíneas, sem texto de chamada: ele
    # fica sozinho no seu parágrafo, como no Jornal Oficial.
    solto = sopa.new_tag("p")
    solto["class"] = ["norm"]
    solto.string = numero
    interno.insert(0, solto)


def _listas_do_consolidado(sopa, corpo) -> None:
    """As listas do texto consolidado são <div>, e as do Jornal Oficial são
    <table> de duas colunas (enumerador | texto) — que é o que
    itens_de_tabela() sabe ler. Cada item vem no seu próprio contêiner:

        <div class="grid-container grid-list">
          <div class="list grid-list-column-1"><span>a) </span></div>
          <div class="grid-list-column-2"><p class="norm">…</p></div>
        </div>

    Itens seguidos viram linhas de uma mesma tabela, para que a lista continue
    sendo uma lista só — inclusive quando aninhada dentro de outra."""
    for grade in corpo.find_all("div", class_="grid-container"):
        anterior = grade.find_previous_sibling()
        if anterior is not None and anterior.name == "table" and anterior.get("data-lista"):
            tabela = anterior
        else:
            tabela = sopa.new_tag("table")
            tabela["data-lista"] = "1"
            grade.insert_before(tabela)

        linha = sopa.new_tag("tr")
        for classe in ("grid-list-column-1", "grid-list-column-2"):
            celula = sopa.new_tag("td")
            coluna = grade.find("div", class_=classe)
            if coluna is not None:
                for filho in list(coluna.contents):
                    celula.append(filho.extract())
            linha.append(celula)
        tabela.append(linha)
        grade.decompose()


def normalizar_consolidado(sopa) -> bool:
    """Reescreve o HTML de um *texto consolidado* do EUR-Lex na marcação do
    Jornal Oficial que o resto do script já lê, e devolve True se o arquivo era
    mesmo um consolidado.

    Fora do ato ficam o cabeçalho da consolidação (a referência
    "02016R0679 — PT — 04.05.2016 — 000.003", o aviso de que o documento não
    tem efeito jurídico e a lista dos atos alteradores) e as **marcas de
    alteração** (▼B, ▼C1, ►C1), que dizem de qual ato veio cada trecho. São
    aparato editorial da consolidação, não texto normativo: sem legenda no
    painel, só atrapalhariam a leitura — e a lista dos atos incorporados fica
    melhor no front matter (`compilado_ate`) e na própria nota."""
    corpo = sopa.find("div", class_="eli-container")
    if corpo is None:
        return False

    for tag in corpo.select("p.modref, p.arrow, p.footnote, hr"):
        tag.decompose()

    # A marca de alteração também aparece no meio da frase, delimitando o
    # trecho corrigido ("a) ►C1 Quando, num dos casos… ◄ A decisão vinculativa").
    for tag in corpo.find_all(["a", "span"]):
        if MARCA_ALTERACAO.match(tag.get_text(strip=True)):
            tag.decompose()

    # Chamada de nota de rodapé: "(1)" colado ao texto. Recebe a classe que
    # texto() já descarta, e o parêntese vazio some junto.
    for ref in corpo.select('a[href^="#"] span.superscript'):
        ref["class"] = ["oj-super", "oj-note-tag"]

    for tag in corpo.find_all(class_=True):
        classes = [CLASSES_CONSOLIDADO.get(c, c) for c in tag.get("class")]
        tag["class"] = classes

    for div in corpo.find_all("div", class_="oj-normal"):
        if "inline-element" not in (div.get("class") or []):
            _numerar_dispositivo(sopa, div)

    _listas_do_consolidado(sopa, corpo)

    # Sobra o <div class="list"> do texto de um item cujo enumerador ("—", no
    # art. 53.º, n.º 1) já foi para a primeira coluna da linha: aqui ele só
    # precisa virar parágrafo.
    for item in corpo.find_all("div", class_="list"):
        item.name = "p"
        item["class"] = ["oj-normal"]

    sopa.body.clear()
    sopa.body.append(corpo.extract())
    return True


def converter(caminho: Path) -> str:
    sopa = BeautifulSoup(caminho.read_text(encoding="utf-8", errors="replace"), "lxml")
    normalizar_consolidado(sopa)
    for tag in sopa.select("p.oj-note, div.oj-doc-end, p.oj-doc-sep, div.oj-final,"
                           " p.oj-signatory, p.oj-separator"):
        tag.decompose()

    blocos: list[str] = []
    vistos = set()
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
            blocos.extend(itens_de_tabela(no, 0))
            continue

        t = texto(no)
        if not t or CABECALHO_JO.match(t):
            continue

        if citado(no):
            citacao_aberta.append(t)
            continue
        fechar_citacao()

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
    # saem em dois parágrafos no JO; aqui viram um título só. Só a **primeira**
    # epígrafe é absorvida: um anexo costuma ser seguido de outros títulos seus
    # (as secções, ou o "1. Introdução" do Anexo VII), e encadeá-los daria um
    # título quilométrico — que é o que o leitor vê no sumário da lei seca.
    saida: list[str] = []
    aguarda_epigrafe = False
    for b in blocos:
        anterior = saida[-1] if saida else ""
        # Sem ignorar a caixa, o "Secção 1" do RGPD (que o JO grafa em caixa
        # mista, ao contrário do "SECÇÃO 1" do AI Act) ficaria sem a epígrafe.
        abre_unidade = re.match(r"^#{1,3} (CAPÍTULO|SECÇÃO|ANEXO)\b", b, re.I)
        eh_titulo = re.match(r"^#{1,3} ", b)
        if aguarda_epigrafe and eh_titulo and not abre_unidade:
            saida[-1] = anterior + " — " + re.sub(r"^#+ ", "", b)
            aguarda_epigrafe = False
        elif b.strip() and b.strip() != anterior.strip():
            saida.append(b)
            aguarda_epigrafe = bool(abre_unidade)

    # O número e a data de página do Jornal Oficial saem numa tabela no alto
    # de cada documento. Não são texto do ato, e precisam cair aqui: o filtro
    # do laço principal só alcança os <p>.
    saida = [b for b in saida if not CABECALHO_JO.match(b)]

    # O JO quebra o título do ato em quatro parágrafos, e os quatro virariam
    # <h2> — quatro entradas no sumário da lei seca, uma delas com o texto
    # inteiro da ementa. Aqui eles viram um título só, com o identificador da
    # norma (número e data), mais subtítulos em itálico com o restante,
    # palavra por palavra: é o mesmo recorte das leis brasileiras já
    # publicadas, em que o título é "LEI Nº 15.211, DE 17 DE SETEMBRO DE 2025"
    # e a ementa vem embaixo, em itálico.
    cabecalho = []
    while saida and saida[0].startswith("# "):
        cabecalho.append(saida.pop(0)[2:])
    if cabecalho:
        titulo, subtitulos = cabecalho[0], cabecalho[1:]
        # "REGULAMENTO (UE) 2024/1689 DO PARLAMENTO EUROPEU E DO CONSELHO":
        # quem editou a norma é subtítulo, não identificador dela.
        emissor = re.match(r"^(.*?)(\s+D[AEO]S?\s+(?:PARLAMENTO|CONSELHO|COMISSÃO)\b.*)$", titulo)
        if emissor:
            titulo = emissor.group(1).strip()
            subtitulos.insert(0, emissor.group(2).strip())
        if subtitulos and re.match(r"^de \d", subtitulos[0]):
            titulo += ", " + subtitulos.pop(0)
        elif len(subtitulos) > 1 and re.match(r"^de \d", subtitulos[1]):
            titulo += ", " + subtitulos.pop(1)
        saida = [f"# {titulo}"] + [f"*{c}*" for c in subtitulos] + saida

    return "\n\n".join(neutralizar_lista(b) for b in saida) + "\n"


if __name__ == "__main__":
    sys.stdout.write(converter(Path(sys.argv[1])))
