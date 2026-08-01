#!/usr/bin/env python3
"""Ancora, nos comentários de `_notas/*.md`, referências a normas que já têm
texto legal em /notas (a própria nota, uma norma extra dela, ou a norma
principal de outra nota).

Não depende de LLM: reconhece as citações por expressão regular a partir do
registro em `_data/normas.yml`, calcula o id de destino reimplementando (em
Python) a mesma regra de `_includes/lei-anotada.html`, e só cria o link se
esse id realmente existir no texto legal correspondente.

Uso:
    python3 scripts/ancorar_referencias.py --check eca-digital lgpd mci
    python3 scripts/ancorar_referencias.py --apply eca-digital
    python3 scripts/ancorar_referencias.py --validar lgpd mci

--check   mostra as mudanças propostas (diff) sem gravar nada.
--apply   grava as mudanças em _notas/<slug>.md.
--validar mede, para notas já revisadas por humano, se o script reconstrói
          os mesmos links que já existem hoje (remove os links, roda o
          script de novo, compara). Não grava nada. Serve para calibrar o
          script contra LGPD e Marco Civil antes de confiar nele no ECA
          Digital ou em normas futuras. Sempre roda com o equivalente a
          --incluir-padrao ligado (ver abaixo) — é isso que está calibrando.

--incluir-padrao (só em --check/--apply; desligado por padrão) também linka
          citações "nuas" (sem norma nomeada perto) à norma principal da
          própria nota. É a leitura correta da maioria dos casos do corpus,
          mas o script não rastreia contexto entre linhas — já produziu link
          errado num parágrafo que nomeia a norma numa frase e a omite nas
          bullets seguintes (a citação nua ficou apontando para a norma
          principal da nota, quando na verdade continuava sendo da norma
          citada na frase de abertura). Revise o diff com atenção redobrada
          se usar esta opção; o modo padrão (sem ela) é mais conservador e
          foi o usado para ancorar as referências ao Decreto nº 12.880/2026.

Limitações conhecidas (por design — na dúvida, o script não cria o link):
- só reconhece UMA referência a dispositivo por vez sem ambiguidade; quando
  há exatamente dois sufixos (ex.: "art. 24, III e § 1º"), vira dois links
  separados, um por sufixo — o padrão que os comentários já usam à mão
  (`[art. 23, I](#art-23-i) e [§ 4º](#art-23-p4)`); três ou mais sufixos
  ficam sem link (não dá para saber a combinação certa de forma genérica);
- listas/faixas de mais de dois itens, ou que misturam faixa ("a") com lista
  ("e"), não são reconhecidas;
- ids inválidos (citação errada no comentário, ou dispositivo com redação
  superada — ver "Redação superada não recebe âncora" no AGENTS.md) nunca
  geram link partido: o script tenta a âncora precisa e, se não existir, cai
  para o artigo seco; se nem esse existir, não linka nada.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
NOTAS_DIR = RAIZ / "_notas"
LEIS_DIR = RAIZ / "_leis"
NORMAS_YML = RAIZ / "_data" / "normas.yml"

ROMANOS = [
    "XXVI", "XXV", "XXIV", "XXIII", "XXII", "XXI", "XX", "XIX", "XVIII", "XVII",
    "XVI", "XV", "XIV", "XIII", "XII", "XI", "X", "IX", "VIII", "VII", "VI",
    "V-B", "V-A", "V", "IV", "III", "II", "I-A", "I",
]
# Ordenados do mais longo para o mais curto, para casar "V-A" antes de "V" etc.
ROMANO_RE = "|".join(re.escape(r) for r in ROMANOS)
LETRAS = set("abcdefghij")


# --------------------------------------------------------------------------
# 1. ids válidos de cada norma (reimplementação, em Python, da lógica de
#    _includes/lei-anotada.html — ver o include para o algoritmo comentado).
# --------------------------------------------------------------------------

def ids_da_lei(slug: str, prefixo: str) -> set[str]:
    caminho = LEIS_DIR / f"{slug}.md"
    texto = caminho.read_text(encoding="utf-8")
    if texto.startswith("---"):
        partes = texto.split("---\n", 2)
        corpo = partes[2] if len(partes) >= 3 else texto
    else:
        corpo = texto

    if front_matter(caminho).get("formato") == "ue":
        return _ids_da_lei_ue(corpo, prefixo)

    prefixo_id = f"{prefixo}-" if prefixo else ""
    blocos = re.split(r"\n\s*\n", corpo)

    artigo = ""
    subdivisao = ""
    inciso = ""
    ids: set[str] = set()

    for bloco in blocos:
        bruto = bloco.strip()
        if not bruto:
            continue
        if bruto[0] == "#":
            continue  # títulos não são alvo de citação nos comentários
        if "~~" in bruto:
            continue  # redação superada: não tem âncora, contexto não muda

        palavras = bruto.split(" ")
        marcador = palavras[0]
        id_ = ""

        if marcador == "Art.":
            numero = palavras[1].replace("º", "").replace(".", "").lower()
            artigo = f"{prefixo_id}art-{numero}"
            subdivisao = ""
            inciso = ""
            id_ = artigo
        elif marcador in ("§", "Parágrafo"):
            if marcador == "§":
                subdivisao = "p" + palavras[1].replace("º", "")
            else:
                subdivisao = "pu"
            inciso = ""
            id_ = f"{artigo}-{subdivisao}"
        elif marcador in ROMANOS:
            id_ = artigo
            if subdivisao:
                id_ = f"{id_}-{subdivisao}"
            inciso = f"{id_}-{marcador.lower()}"
            id_ = inciso
        else:
            letra = marcador.rstrip(")")
            if marcador.endswith(")") and inciso and letra in LETRAS:
                id_ = f"{inciso}-{letra}"

        if id_ and artigo:
            ids.add(id_)

    return ids


def _ids_da_lei_ue(corpo: str, prefixo: str) -> set[str]:
    """Mesma coisa para as normas com `formato: ue` no front matter (os
    regulamentos da União Europeia). Muda só o reconhecimento do dispositivo —
    "Artigo 5.º" no lugar de "Art. 5º", número "1." no lugar de "§ 1º" e
    alínea "a)" pendurada direto no número, sem inciso romano no meio. Os ids
    continuam os mesmos: art-5, art-5-p1, art-5-p1-a.

    Continua valendo o que o resto do script já faz: um id que não estiver
    aqui nunca vira link. Como o reconhecimento de *citações* (`_extrai_sufixos`)
    é o da praxe brasileira, uma citação europeia com sufixo ("art. 5.º, n.º 1")
    cai no artigo seco em vez do número — link menos preciso, nunca errado.
    """
    prefixo_id = f"{prefixo}-" if prefixo else ""
    artigo = ""
    subdivisao = ""
    ids: set[str] = set()

    for bloco in re.split(r"\n\s*\n", corpo):
        bruto = bloco.strip()
        if bruto.startswith("#"):
            # Anexo não continua a numeração dos artigos — ver lei-anotada.html.
            if bruto.lstrip("# ").startswith("ANEXO"):
                artigo = subdivisao = ""
            continue
        if not bruto or "~~" in bruto:
            continue

        palavras = bruto.split(" ")
        marcador = palavras[0]
        id_ = ""

        if marcador == "Artigo" and len(palavras) > 1:
            numero = palavras[1].replace("º", "").replace("o", "").replace(".", "").lower()
            artigo = f"{prefixo_id}art-{numero}"
            subdivisao = ""
            id_ = artigo
        elif (m := re.fullmatch(r"([1-9]\d*)(?:-([A-Z]))?\\?\.", marcador)):
            # O ponto vem escapado no texto-fonte (`1\.`) — ver lei-anotada.html.
            # O sufixo de dispositivo acrescentado entra colado: 1-A → p1a.
            subdivisao = "p" + m.group(1) + (m.group(2) or "").lower()
            id_ = f"{artigo}-{subdivisao}"
        else:
            letra = marcador.rstrip(")")
            base = letra.split("-")[0]
            if marcador.endswith(")") and base in LETRAS and re.fullmatch(r"[a-j](?:-[A-Z])?", letra):
                sufixado = letra.replace("-", "").lower()
                id_ = f"{artigo}-{subdivisao}-{sufixado}" if subdivisao else f"{artigo}-{sufixado}"

        if id_ and artigo:
            ids.add(id_)

    return ids


# --------------------------------------------------------------------------
# 2. Registro de normas (_data/normas.yml) + front matter de cada nota.
# --------------------------------------------------------------------------

def carregar_registro() -> dict:
    return yaml.safe_load(NORMAS_YML.read_text(encoding="utf-8"))


def front_matter(caminho: Path) -> dict:
    texto = caminho.read_text(encoding="utf-8")
    if not texto.startswith("---"):
        return {}
    partes = texto.split("---\n", 2)
    if len(partes) < 3:
        return {}
    return yaml.safe_load(partes[1]) or {}


class Alvo:
    """Um alvo de link possível: âncora na própria página, ou link para a
    página de outra nota. `alias` é o texto (norma) que o gatilha."""

    def __init__(self, alias: str, slug: str, prefixo: str, mesma_nota: bool, url_nota: str):
        self.alias = alias
        self.slug = slug
        self.prefixo = prefixo
        self.mesma_nota = mesma_nota
        self.url_nota = url_nota
        self.ids = ids_da_lei(slug, prefixo)
        self.fonte = front_matter(LEIS_DIR / f"{slug}.md").get("fonte", "")

    def href(self, ancora: str) -> str:
        if self.mesma_nota:
            return f"#{ancora}"
        return f"{self.url_nota}#{ancora}"

    def ancora(self, numero: str, sufixo: str | None) -> str | None:
        """Id do dispositivo, se existir. Com `sufixo`, só devolve o id
        preciso (ex.: `art-5-v`) — não cai para o artigo seco sozinho; quem
        chama decide se quer tentar de novo com `sufixo=None`."""
        prefixo_id = f"{self.prefixo}-" if self.prefixo else ""
        base = f"{prefixo_id}art-{numero.lower()}"
        if sufixo:
            candidato = f"{base}-{sufixo}"
            return candidato if candidato in self.ids else None
        return base if base in self.ids else None


def alvos_para_nota(nota_slug: str, registro: dict) -> list[Alvo]:
    """Constrói a lista de alvos reconhecíveis nos comentários de uma nota:
    a norma principal e as extras (âncora na própria página) e a norma
    principal de toda outra nota (link para a página dela)."""
    fm = front_matter(NOTAS_DIR / f"{nota_slug}.md")
    lei_principal = fm.get("lei")
    normas_extra = set(fm.get("normas_extra") or [])

    alvos: list[Alvo] = []
    for slug, dados in registro.items():
        norma_nota = dados["nota"]
        prefixo = dados.get("prefixo") or ""
        mesma_nota = norma_nota == nota_slug
        if mesma_nota:
            # só reconhece a própria norma principal e as normas_extra desta
            # nota — não qualquer norma cuja `nota:` bata por coincidência.
            if slug != lei_principal and slug not in normas_extra:
                continue
        else:
            # cross-note: só linka para a norma PRINCIPAL de outra nota
            # (prefixo vazio) — sub-normas de outra nota não são suportadas.
            if prefixo:
                continue
        url_nota = f"/notas/{norma_nota}"
        for alias in dados.get("aliases", []):
            alvos.append(Alvo(alias, slug, prefixo, mesma_nota, url_nota))

    # Mais específico (alias mais longo) primeiro, para não casar "Decreto
    # nº 12.880" quando o texto diz "Decreto nº 12.880/2026".
    alvos.sort(key=lambda a: len(a.alias), reverse=True)
    return alvos


# --------------------------------------------------------------------------
# 3. Regex de citação e substituição.
# --------------------------------------------------------------------------

NUM_ARTIGO = r"\d+(?:-[A-Z])?"
# \b nos dois lados do numeral romano é essencial: sem isso, "e [ROMANO_RE]"
# com re.IGNORECASE casa o "i" de qualquer palavra que comece com "i"
# (ex.: "incorpora") como se fosse o algarismo romano "I".
SUFIXO_UNIDADE = rf"(?:inciso\s+)?\b(?:{ROMANO_RE})\b|§\s*\d+[º°]?|par[áa]grafo\s+único"

ARTIGO_RE = re.compile(
    rf"""
    \bart(?P<plural>s?)\.\s*
    (?P<num1>{NUM_ARTIGO})[º°]?
    (?!\.\d)
    (?:
        \s*(?P<sep>a|,|e)\s*(?P<num2>{NUM_ARTIGO})[º°]?
    )?
    """,
    re.VERBOSE | re.IGNORECASE,
)
# (?!\.\d) rejeita "art. 3.1" — notação decimal de instrumentos
# internacionais (ex.: Convenção sobre os Direitos da Criança), que não é o
# formato de citação da legislação brasileira e não tem id correspondente.

SUFIXO_RE = re.compile(rf"\s*,\s*({SUFIXO_UNIDADE})", re.IGNORECASE)
CONECTOR_SUFIXO_RE = re.compile(r"\s*(?:,|e)\s*", re.IGNORECASE)


def _extrai_sufixos(texto: str, pos: int) -> tuple[list[str], int]:
    """A partir de `pos`, consome cláusulas ", § N" / ", inciso X" / ", X" /
    ", parágrafo único" encadeadas por vírgula ou "e". Devolve a lista de
    unidades cruas encontradas e a nova posição (depois de tudo que foi
    consumido) — mesmo quando há mais de uma (caso em que o chamador decide
    não usar nenhuma, por ambiguidade, mas o texto consumido continua
    correto para não deixar a vírgula "solta")."""
    unidades: list[str] = []
    i = pos
    primeiro = True
    while True:
        m = SUFIXO_RE.match(texto, i) if primeiro else None
        if not m and not primeiro:
            m2 = CONECTOR_SUFIXO_RE.match(texto, i)
            if m2:
                resto = re.match(rf"({SUFIXO_UNIDADE})", texto[m2.end():], re.IGNORECASE)
                if resto:
                    unidades.append(resto.group(1))
                    i = m2.end() + resto.end()
                    continue
            break
        if m:
            unidades.append(m.group(1))
            i = m.end()
            primeiro = False
            continue
        break
    return unidades, i


def _sufixo_para_ancora(unidade: str) -> str:
    unidade = unidade.strip()
    if unidade.lower().startswith("parágrafo único") or unidade.lower().startswith("paragrafo único"):
        return "pu"
    m = re.match(r"§\s*(\d+)[º°]?", unidade)
    if m:
        return f"p{m.group(1)}"
    m = re.match(r"(?:inciso\s+)?(.+)", unidade, re.IGNORECASE)
    if m:
        return m.group(1).strip().lower()
    return unidade.lower()


ALIAS_ANTES_RE_CACHE: dict[str, re.Pattern] = {}
ALIAS_DEPOIS_RE_CACHE: dict[str, re.Pattern] = {}


def _regex_alias(alias: str) -> re.Pattern:
    if alias not in ALIAS_ANTES_RE_CACHE:
        ALIAS_ANTES_RE_CACHE[alias] = re.compile(re.escape(alias))
    return ALIAS_ANTES_RE_CACHE[alias]


def _protegidos(linha: str) -> list[tuple[int, int]]:
    """Trechos que não podem ser tocados: links markdown já existentes e
    spans de código inline."""
    spans = []
    for m in re.finditer(r"\[[^\]\n]*\]\([^)\n]*\)", linha):
        spans.append(m.span())
    for m in re.finditer(r"`[^`\n]*`", linha):
        spans.append(m.span())
    return spans


def _sobrepoe(a: tuple[int, int], protegidos: list[tuple[int, int]]) -> bool:
    return any(a[0] < p[1] and p[0] < a[1] for p in protegidos)


# Só conta como "nome de norma" antes da citação se for um dos jeitos usuais
# de nomear uma lei/norma em português jurídico (evita falso positivo com
# qualquer clausula maiúscula, tipo "Capítulo III," que não é norma nenhuma).
_PALAVRAS_NORMA = (
    r"(?:Lei|Decreto(?:-Lei)?|C[oó]digo|Constitui[çc][ãa]o|Conven[çc][ãa]o|"
    r"S[uú]mula|Portaria|Resolu[çc][ãa]o|Emenda)"
)
_SIGLA_NORMA = r"[A-Z]{2,6}"
NORMA_DESCONHECIDA_ANTES_RE = re.compile(
    rf"(?:^|[,(;:])\s*(?:{_PALAVRAS_NORMA}\b[^,()\n]{{0,60}}|{_SIGLA_NORMA})\s*,\s*$"
)


def _fim_com_ordinal(linha: str, pos: int) -> int:
    """Estende `pos` para incluir um 'º'/'°' logo em seguida, se houver —
    para não truncar o ordinal ao recortar só a parte "art. N" de uma
    citação com mais coisa depois (sufixo, "e outro artigo" etc.)."""
    if pos < len(linha) and linha[pos] in ("º", "°"):
        return pos + 1
    return pos


LINK_EXTERNO_RE = re.compile(r"\[[^\]\n]*\]\((https?://[^)\n]*)\)")


def _cita_norma_nao_cadastrada_antes(linha: str, inicio_citacao: int, fontes_conhecidas: set[str]) -> bool:
    """True quando algo antes da citação sugere que ela é de uma norma fora
    do registro — e por isso não deve cair na norma principal desta nota
    por padrão. Dois sinais, ambos vistos no corpus:

    1. um trecho nomeado logo antes, tipo "CF, art. 5º" ("CF" não está
       cadastrado, mas claramente não é a norma principal desta nota);
    2. um link para uma URL externa (não `#...`, não `/notas/...`, e não a
       própria `fonte` de uma norma já cadastrada — ex.: o link da lei para
       o Planalto na abertura do próprio item de "Legislação principal")
       antes, na mesma linha — sinal de que o parágrafo já nomeou outra
       fonte (ex.: "[Constituição Federal de 1988](https://...),
       especialmente os arts. 5º, X...") e as citações seguintes são dessa
       fonte, não da norma principal da nota.

    Em ambos os casos é mais seguro não linkar do que linkar errado."""
    trecho_antes = linha[:inicio_citacao]
    if NORMA_DESCONHECIDA_ANTES_RE.search(trecho_antes):
        return True
    for m in LINK_EXTERNO_RE.finditer(trecho_antes):
        if m.group(1) not in fontes_conhecidas:
            return True
    return False


def processar_linha(linha: str, alvos: list[Alvo], estatisticas: dict, alvo_padrao: Alvo | None,
                     fontes_conhecidas: set[str]) -> str:
    protegidos = _protegidos(linha)
    resultado = []
    cursor = 0

    for m in ARTIGO_RE.finditer(linha):
        if m.start() < cursor:
            continue  # já consumido por um match anterior
        if _sobrepoe(m.span(), protegidos):
            continue

        inicio_citacao = m.start()
        plural = bool(m.group("plural"))
        num1 = m.group("num1")
        sep = m.group("sep")
        num2 = m.group("num2")
        fim_num1 = _fim_com_ordinal(linha, m.end("num1"))
        fim_num = m.end()

        alvo_antes = None
        for alvo in alvos:
            padrao = _regex_alias(alvo.alias)
            # o alias deve terminar pouco antes do início da citação, com
            # só ", " ou " (" ou espaço entre os dois.
            trecho_antes = linha[:inicio_citacao]
            am = None
            for cand in padrao.finditer(trecho_antes):
                if re.fullmatch(r"[\s(,]*", trecho_antes[cand.end():]):
                    am = cand
            if am:
                alvo_antes = alvo
                break

        # Sem norma nomeada perto e sem norma cadastrada antes: só assume a
        # norma principal desta nota se não houver sinal de que a citação é
        # de uma outra norma (cadastrada ou não) — ver as duas funções acima.
        antes_incerto = _cita_norma_nao_cadastrada_antes(linha, inicio_citacao, fontes_conhecidas)
        pode_usar_padrao = (
            alvo_padrao is not None and not antes_incerto
            and not _norma_desconhecida_depois(linha, fim_num, alvos)
        )

        # --- Faixa "arts. X a Y" ou lista "arts. X e Y" / "arts. X, Y" ---
        if sep and not plural:
            # "art. X a/e Y" no singular é incomum e arriscado — não mexe.
            sep = None
        if sep:
            estatisticas["citacoes_compostas"] += 1

        if plural and sep in ("a",):
            alvo = alvo_antes or _alvo_depois(linha, fim_num, alvos) or (alvo_padrao if pode_usar_padrao else None)
            if alvo:
                ancora = alvo.ancora(num1, None)
                if ancora:
                    texto_visivel = linha[inicio_citacao:fim_num]
                    href = alvo.href(ancora)
                    resultado.append(linha[cursor:inicio_citacao])
                    resultado.append(f"[{texto_visivel}]({href})")
                    cursor = fim_num
                    estatisticas["links_criados"] += 1
                    continue

        elif plural and sep in ("e", ","):
            alvo = alvo_antes or _alvo_depois(linha, fim_num, alvos) or (alvo_padrao if pode_usar_padrao else None)
            if alvo:
                ancora1 = alvo.ancora(num1, None)
                ancora2 = alvo.ancora(num2, None)
                if ancora1 and ancora2:
                    prefixo_txt = linha[inicio_citacao:fim_num1]
                    sep_txt = linha[fim_num1:m.start("num2")]
                    num2_txt = linha[m.start("num2"):fim_num]
                    resultado.append(linha[cursor:inicio_citacao])
                    resultado.append(f"[{prefixo_txt}]({alvo.href(ancora1)})")
                    resultado.append(sep_txt)
                    resultado.append(f"[{num2_txt}]({alvo.href(ancora2)})")
                    cursor = fim_num
                    estatisticas["links_criados"] += 1
                    continue

        else:
            # --- Citação simples, com um ou dois sufixos ---
            # Três formas de achar a norma, nessa ordem: nomeada antes
            # ("Decreto X, art. N"), nomeada depois ("art. N da LGPD") ou,
            # na ausência das duas — e só se nada por perto sugerir uma
            # norma diferente e desconhecida —, a norma principal desta
            # própria nota (é a leitura correta da maioria das citações
            # "nuas" do corpus; ver limitações no docstring do módulo).
            unidades, pos_depois_sufixo = _extrai_sufixos(linha, fim_num)

            norma_depois = False
            if alvo_antes:
                alvo = alvo_antes
            else:
                alvo, fim_depois_alias = _alvo_depois_com_fim(linha, pos_depois_sufixo, alvos)
                if alvo:
                    norma_depois = True
                elif pode_usar_padrao and not _norma_desconhecida_depois(linha, pos_depois_sufixo, alvos):
                    alvo = alvo_padrao

            if alvo:
                # Sem norma explícita depois: o link cobre "art. N[, sufixo]"
                # (preciso, se houver um único sufixo válido; senão só o
                # artigo). Com norma explícita depois ("da/do X"), o link
                # sempre cobre até esse trecho, sufixo ou não.
                if len(unidades) == 1:
                    ancora_precisa = alvo.ancora(num1, _sufixo_para_ancora(unidades[0]))
                else:
                    ancora_precisa = None

                if norma_depois:
                    ancora = ancora_precisa or alvo.ancora(num1, None)
                    fim_link = fim_depois_alias
                elif len(unidades) == 0:
                    ancora = alvo.ancora(num1, None)
                    fim_link = fim_num
                elif len(unidades) == 1:
                    if ancora_precisa:
                        ancora = ancora_precisa
                        fim_link = pos_depois_sufixo
                    else:
                        ancora = alvo.ancora(num1, None)
                        fim_link = fim_num
                else:
                    ancora = None

                if ancora:
                    texto_visivel = linha[inicio_citacao:fim_link]
                    resultado.append(linha[cursor:inicio_citacao])
                    resultado.append(f"[{texto_visivel}]({alvo.href(ancora)})")
                    cursor = fim_link
                    estatisticas["links_criados"] += 1
                    continue

                elif len(unidades) == 2:
                    # "art. N, sufixo1 e/,, sufixo2" — vira dois links
                    # separados, como o corpus já faz manualmente: o
                    # primeiro carrega "art. N, sufixo1", o segundo só
                    # "sufixo2" — "art. N" sozinho não é linkado.
                    id1 = alvo.ancora(num1, _sufixo_para_ancora(unidades[0]))
                    id2 = alvo.ancora(num1, _sufixo_para_ancora(unidades[1]))
                    if id1 and id2:
                        pos_fim_sufixo1 = linha.index(unidades[0], fim_num, pos_depois_sufixo) + len(unidades[0])
                        pos_ini_sufixo2 = linha.rindex(unidades[1], pos_fim_sufixo1, pos_depois_sufixo)
                        prefixo_txt = linha[inicio_citacao:pos_fim_sufixo1]
                        sep_txt = linha[pos_fim_sufixo1:pos_ini_sufixo2]
                        sufixo2_txt = linha[pos_ini_sufixo2:pos_depois_sufixo]
                        resultado.append(linha[cursor:inicio_citacao])
                        resultado.append(f"[{prefixo_txt}]({alvo.href(id1)})")
                        resultado.append(sep_txt)
                        resultado.append(f"[{sufixo2_txt}]({alvo.href(id2)})")
                        cursor = pos_depois_sufixo
                        estatisticas["links_criados"] += 1
                        continue
                    estatisticas["citacoes_compostas"] += 1

                else:
                    estatisticas["citacoes_compostas"] += 1

    resultado.append(linha[cursor:])
    return "".join(resultado)


def _alvo_depois(linha: str, pos: int, alvos: list[Alvo]) -> Alvo | None:
    alvo, _ = _alvo_depois_com_fim(linha, pos, alvos)
    return alvo


NORMA_QUALQUER_DEPOIS_RE = re.compile(r"\s*d[ao]s?\s+[A-ZÀ-Ý]")


def _norma_desconhecida_depois(linha: str, pos: int, alvos: list[Alvo]) -> bool:
    """True quando "da/do <Palavra>" aparece logo depois da citação mas
    <Palavra> não é nenhum alias cadastrado (ex.: "art. 12 da Convenção") —
    sinal de norma diferente e desconhecida, tão perigoso quanto o mesmo
    padrão antes da citação (ver `_cita_norma_nao_cadastrada_antes`)."""
    if not NORMA_QUALQUER_DEPOIS_RE.match(linha[pos:]):
        return False
    return _alvo_depois(linha, pos, alvos) is None


def _alvo_depois_com_fim(linha: str, pos: int, alvos: list[Alvo]) -> tuple[Alvo | None, int]:
    """"art. N da/do <norma>" — a norma aparece IMEDIATAMENTE depois (só
    "d[ao]s? " no meio), e o link resultante inclui esse trecho."""
    m = re.match(r"\s*d[ao]s?\s+", linha[pos:], re.IGNORECASE)
    if not m:
        return None, pos
    resto = linha[pos + m.end():]
    for alvo in alvos:
        am = _regex_alias(alvo.alias).match(resto)
        if am:
            return alvo, pos + m.end() + am.end()
    return None, pos


# --------------------------------------------------------------------------
# 4. Processamento de um arquivo `_notas/<slug>.md` (preserva front matter).
# --------------------------------------------------------------------------

def processar_nota(slug: str, registro: dict, com_padrao: bool = False) -> tuple[str, str, dict]:
    caminho = NOTAS_DIR / f"{slug}.md"
    texto = caminho.read_text(encoding="utf-8")
    return processar_nota_de_texto(slug, texto, registro, com_padrao)


# --------------------------------------------------------------------------
# 5. CLI: --check / --apply / --validar
# --------------------------------------------------------------------------

def diff_resumido(original: str, novo: str) -> str:
    import difflib
    linhas = list(difflib.unified_diff(
        original.splitlines(keepends=True),
        novo.splitlines(keepends=True),
        lineterm="",
    ))
    return "".join(linhas)


LINK_RE = re.compile(r"\[([^\]\n]*)\]\(([^)\n]*)\)")


CITACAO_SIMPLES_RE = re.compile(r"^\s*arts?\.\s*\d", re.IGNORECASE)


def extrair_links(texto: str) -> set[tuple[str, str]]:
    """Só conta, para fins de validação, links cujo texto visível é da forma
    que o script reconhece ("art./arts. N..."). Links com rótulo próprio
    (ex.: "[**Consentimento**](#art-7-i)") ou continuações de uma citação
    anterior (ex.: "[4º](#art-14-p4)", depois de "art. 14, §§ 2º,") não são
    o alvo deste script — são trabalho editorial, não uma citação isolada — e
    ficariam de fora da comparação mesmo com o script funcionando bem."""
    return {(m.group(1), m.group(2)) for m in LINK_RE.finditer(texto)
            if (m.group(2).startswith("#") or m.group(2).startswith("/notas/"))
            and CITACAO_SIMPLES_RE.match(m.group(1))}


def remover_links_para_validar(texto: str) -> str:
    """Desfaz links markdown para simular o estado 'ainda não ancorado' —
    só para o modo --validar, nunca escrito em disco."""
    def substituir(m: re.Match) -> str:
        alvo = m.group(2)
        if alvo.startswith("#") or alvo.startswith("/notas/"):
            return m.group(1)
        return m.group(0)
    return LINK_RE.sub(substituir, texto)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    grupo = ap.add_mutually_exclusive_group(required=True)
    grupo.add_argument("--check", nargs="+", metavar="NOTA", help="mostra o diff, não grava")
    grupo.add_argument("--apply", nargs="+", metavar="NOTA", help="grava as mudanças")
    grupo.add_argument("--validar", nargs="+", metavar="NOTA", help="mede consistência com os links já existentes")
    ap.add_argument(
        "--incluir-padrao", action="store_true",
        help=(
            "em --check/--apply, também linka citações 'nuas' (sem norma nomeada por perto) à "
            "norma principal desta nota. Desligado por padrão: já causou link errado em citações "
            "de um bloco de texto que nomeia a norma numa frase e a omite nas seguintes (ver "
            "docstring do módulo) — revise o diff com atenção redobrada se usar esta opção. "
            "Em --validar isso é sempre ligado, porque é o que se está calibrando."
        ),
    )
    args = ap.parse_args()

    registro = carregar_registro()

    if args.validar:
        limite_ok = True
        for slug in args.validar:
            caminho = NOTAS_DIR / f"{slug}.md"
            original = caminho.read_text(encoding="utf-8")
            links_originais = extrair_links(original)

            despido = remover_links_para_validar(original)
            _, reconstruido, stats = processar_nota_de_texto(slug, despido, registro, com_padrao=True)
            links_reconstruidos = extrair_links(reconstruido)

            acertos = links_originais & links_reconstruidos
            perdidos = links_originais - links_reconstruidos
            novos = links_reconstruidos - links_originais
            total = len(links_originais) or 1
            taxa = 100 * len(acertos) / total

            print(f"=== {slug} ===")
            print(f"Links originais: {len(links_originais)} | reconstruídos iguais: {len(acertos)} | "
                  f"perdidos: {len(perdidos)} | a mais: {len(novos)}")
            print(f"Consistência: {taxa:.1f}%")
            if perdidos:
                print("  Perdidos (o script não recriou; conferir manualmente):")
                for texto, href in sorted(perdidos):
                    print(f"    [{texto}]({href})")
            if novos:
                print("  A mais (o script propôs um link que não existe hoje):")
                for texto, href in sorted(novos):
                    print(f"    [{texto}]({href})")
            print()
            if taxa < 95.0:
                limite_ok = False
        if not limite_ok:
            print("Consistência abaixo de 95% — não aplicar o script a estas notas sem revisar antes.")
            return 1
        print("Consistência >= 95% em todas as notas testadas.")
        return 0

    notas_alvo = args.check or args.apply
    for slug in notas_alvo:
        original, novo, stats = processar_nota(slug, registro, com_padrao=args.incluir_padrao)
        print(f"=== {slug} === links criados: {stats['links_criados']} | "
              f"citações compostas ignoradas: {stats['citacoes_compostas']}")
        if original == novo:
            print("(sem mudanças)")
            continue
        if args.check:
            print(diff_resumido(original, novo))
        if args.apply:
            (NOTAS_DIR / f"{slug}.md").write_text(novo, encoding="utf-8")
            print(f"Gravado em _notas/{slug}.md")
        print()
    return 0


def processar_nota_de_texto(slug: str, texto: str, registro: dict, com_padrao: bool = False) -> tuple[str, str, dict]:
    partes = texto.split("---\n", 2)
    cabecalho = "---\n".join(partes[:2]) + "---\n"
    corpo = partes[2]

    alvos = alvos_para_nota(slug, registro)
    alvo_padrao = next((a for a in alvos if a.mesma_nota and not a.prefixo), None) if com_padrao else None
    fontes_conhecidas = {a.fonte for a in alvos if a.fonte}
    estatisticas = {"links_criados": 0, "citacoes_compostas": 0}

    dentro_bloco_codigo = False
    linhas_novas = []
    for linha in corpo.split("\n"):
        if linha.strip().startswith("```"):
            dentro_bloco_codigo = not dentro_bloco_codigo
            linhas_novas.append(linha)
            continue
        if dentro_bloco_codigo:
            linhas_novas.append(linha)
            continue
        linhas_novas.append(processar_linha(linha, alvos, estatisticas, alvo_padrao, fontes_conhecidas))

    novo_corpo = "\n".join(linhas_novas)
    return texto, cabecalho + novo_corpo, estatisticas


if __name__ == "__main__":
    sys.exit(main())
