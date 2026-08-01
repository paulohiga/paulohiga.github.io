"""Aplica ao texto do AI Act as alterações do art. 1.º do Digital Omnibus,
produzindo a consolidação não oficial.

O endereçamento de cada operação é escrito à mão (a instrução do JO é prosa, não
dado estruturado), mas o **texto** nunca é redigitado: vem do arquivo do Omnibus
já convertido, por `omnibus_itens.json`. Toda operação verifica que o alvo
existe antes de mexer, e o script aborta no primeiro alvo que não encontrar.
"""
import pathlib, re

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ORIGINAL = RAIZ / "_leis/ai-act.md"
OMNIBUS = RAIZ / "_leis/regulamento-2026-1744.md"
DESTINO = RAIZ / "_leis/ai-act-consolidado.md"

FRENTE = """---
titulo: Regulamento (UE) 2024/1689, consolidado com o Regulamento (UE) 2026/1744
apelido: AI Act consolidado (não oficial)
fonte: https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024R1689
formato: ue
# CONSOLIDAÇÃO NÃO OFICIAL. O EUR-Lex ainda não publicou a versão consolidada
# do AI Act com o Digital Omnibus. Este arquivo aplica ao texto do Regulamento
# (UE) 2024/1689, publicado no JO de 12/7/2024, as 43 alterações do art. 1.º do
# Regulamento (UE) 2026/1744, publicado no JO de 24/7/2026. As duas normas
# oficiais continuam no painel, selecionáveis, e são elas que valem: em caso de
# divergência, prevalece o Jornal Oficial.
#
# NÃO EDITE ESTE ARQUIVO À MÃO. Ele é gerado por scripts/consolidar_ai_act.py,
# que endereça cada alteração e copia o texto novo do próprio arquivo do
# Omnibus — nada é redigitado — e aborta se algum dispositivo alvo sumir.
---
"""


def carregar_itens():
    """Lê o art. 1.º do Omnibus e devolve, para cada alteração, a instrução e o
    texto citado. O item traz o `pai` para distinguir subitens homônimos: "- a)
    O n.º 2 passa a ter a seguinte redação" aparece em vários artigos."""
    corpo = OMNIBUS.read_text(encoding="utf-8").split("---\n", 2)[2]
    art1 = re.search(r"(?ms)^Artigo 1\.º —.*?(?=^Artigo 2\.º —)", corpo).group(0)

    def aberto(partes):
        junto = "\n".join(partes)
        return junto.count("«") > junto.count("»")

    itens, atual, pai = [], None, ""
    for b in [x.strip() for x in re.split(r"\n\s*\n", art1) if x.strip()]:
        if re.match(r"^\d+\) ", b) or re.match(r"^- [a-z]\) ", b):
            if atual:
                itens.append(atual)
            instrucao, _, inline = b.partition("«")
            instrucao = instrucao.strip()
            if re.match(r"^\d+\) ", instrucao):
                pai = instrucao
            atual = {"pai": pai, "instrucao": instrucao, "citado": []}
            if inline:
                atual["citado"].append("«" + inline)
        elif atual is not None and (b.startswith(">") or aberto(atual["citado"])):
            # Um item de lista aninhado pode sair fora do bloco de citação;
            # enquanto as aspas « » não fecharem, ainda é texto citado.
            atual["citado"].append(re.sub(r"(?m)^> ?", "", b).strip())
    if atual:
        itens.append(atual)
    return itens


fonte = ORIGINAL.read_text(encoding="utf-8").split("---\n", 2)[2]
blocos = [b.strip() for b in re.split(r"\n\s*\n", fonte) if b.strip()]
itens = carregar_itens()

# ---------------------------------------------------------------- utilidades

def citado(n, sub=None):
    """Texto citado do item `n)` do art. 1.º do Omnibus — ou do seu subitem
    `sub` ("a", "b", ...) —, devolvido em blocos e sem as aspas externas."""
    pai = f"{n}) "
    achados = [i for i in itens if i["pai"].startswith(pai)
               and (i["instrucao"].startswith(f"- {sub}) ") if sub
                    else i["instrucao"].startswith(pai))]
    assert len(achados) == 1, f"item {n}{'-' + sub if sub else ''}: {len(achados)} achados"
    partes = achados[0]["citado"]
    assert partes, f"item {n}{sub or ''} não tem texto citado"
    partes = [q for p in partes for q in re.split(r"\n\s*\n", p) if q.strip()]
    limpo = []
    for k, p in enumerate(partes):
        p = p.strip()
        if k == 0:
            p = p.lstrip("«")
        if k == len(partes) - 1:
            p = p.rstrip("»")
        limpo.append(p.strip())
    return juntar_epigrafe([reescapar(promover(p)) for p in limpo if p])


def promover(b):
    """Um dispositivo inserido pelo Omnibus pode vir como item de lista
    aninhada ("- b-B) ..."), porque no JO ele continua a lista aberta pela
    alínea anterior. Aqui ele volta a ser bloco de primeiro nível, para
    receber âncora como qualquer outra alínea ou número. O recorte é o
    enumerador com sufixo — "b-B)", "14-B)", "1-C." —, que só existe em
    dispositivo acrescentado; subalínea ("i)", "ii)") nunca tem essa forma e
    continua sendo lista.
    """
    return re.sub(r"^(?:  )*- (?=(?:[a-z]|\d{1,3})-[A-Z](?:\)|\\?\.)\s)", "", b)


def reescapar(b):
    """Ao tirar as aspas de abertura, um número volta a começar a linha
    ("«1. Os sistemas" → "1. Os sistemas") e o Kramdown o leria como lista
    ordenada. O escape do ponto tem de ser refeito — ver `formato: ue`."""
    linhas = []
    for linha in b.split("\n"):
        pre, resto = re.match(r"^((?:- |  )*)(.*)$", linha).groups()
        linhas.append(pre + re.sub(r"^(\d{1,3})\.(?=\s)", r"\1\\.", resto))
    return "\n".join(linhas)


def juntar_epigrafe(bs):
    """No JO, um artigo citado vem com o número e a epígrafe em parágrafos
    separados ("Artigo 4.º" / "Literacia no domínio da IA"). O resto do
    arquivo usa "Artigo 4.º — Literacia no domínio da IA" num bloco só, que é
    o que o `formato: ue` reconhece como abertura de artigo."""
    saida, pular = [], False
    for k, b in enumerate(bs):
        if pular:
            pular = False
            continue
        if re.fullmatch(r"Artigo \d+\.º(?:-[A-Z])?", b) and k + 1 < len(bs) \
                and not re.match(r"^(\d+\\?\.|[a-z]\)|-)\s", bs[k + 1]):
            saida.append(f"{b} — {bs[k + 1]}")
            pular = True
        else:
            saida.append(b)
    return saida


def i_artigo(n):
    alvo = f"Artigo {n}.º —"
    for k, b in enumerate(blocos):
        if b.startswith(alvo):
            return k
    raise AssertionError(f"artigo {n} não encontrado")


def fim_artigo(k):
    for j in range(k + 1, len(blocos)):
        if re.match(r"^Artigo \d+\.º(?:-[A-Z])? —", blocos[j]) or blocos[j].startswith("#"):
            return j
    return len(blocos)


def i_numero(art, n):
    ini, fim = i_artigo(art), fim_artigo(i_artigo(art))
    for k in range(ini, fim):
        if re.match(rf"^{n}\\?\.\s", blocos[k]):
            return k
    raise AssertionError(f"artigo {art}, n.º {n} não encontrado")


def fim_numero(art, n):
    k, fim = i_numero(art, n), fim_artigo(i_artigo(art))
    for j in range(k + 1, fim):
        if re.match(r"^\d+\\?\.\s", blocos[j]):
            return j
    return fim


def i_alinea(art, n, letra):
    for k in range(i_numero(art, n), fim_numero(art, n)):
        if blocos[k].startswith(f"{letra}) "):
            return k
    raise AssertionError(f"artigo {art}, n.º {n}, alínea {letra} não encontrada")


def troca(ini, fim, novo):
    blocos[ini:fim] = novo


# ---------------------------------------------------------- 43 itens do art. 1.º

# 1) art. 1.º, n.º 2, alínea g)
troca(i_alinea(1, 2, "g"), i_alinea(1, 2, "g") + 1, citado(1))

# 2) art. 2.º, n.º 2 e n.º 7
troca(i_numero(2, 2), fim_numero(2, 2), citado(2, "a"))
troca(i_numero(2, 7), fim_numero(2, 7), citado(2, "b"))

# 3) art. 2.º: novo n.º 13, no fim do artigo
troca(fim_artigo(i_artigo(2)), fim_artigo(i_artigo(2)), citado(3))

# 4) art. 3.º: ponto 14 e novos 14-A/14-B
k14 = next(k for k in range(i_artigo(3), fim_artigo(i_artigo(3))) if blocos[k].startswith("14) "))
troca(k14, k14 + 1, citado(4, "a"))
k14 = next(k for k in range(i_artigo(3), fim_artigo(i_artigo(3))) if blocos[k].startswith("14) "))
troca(k14 + 1, k14 + 1, citado(4, "b"))

# 5) art. 4.º: nova redação integral
troca(i_artigo(4), fim_artigo(i_artigo(4)), citado(5))

# 6) novo art. 4.º-A, depois do 4.º
troca(fim_artigo(i_artigo(4)), fim_artigo(i_artigo(4)), citado(6))

# 7) art. 5.º: novas alíneas b-A/b-B no n.º 1 e novos n.º 1-A/1-B
kb = i_alinea(5, 1, "b")
troca(kb + 1, kb + 1, citado(7, "a"))
troca(fim_numero(5, 1), fim_numero(5, 1), citado(7, "b"))

# 8) art. 6.º: novos n.º 1-A a 1-C, depois do n.º 1
troca(fim_numero(6, 1), fim_numero(6, 1), citado(8))

# 9) art. 10.º: n.º 1 e n.º 6 novos, n.º 5 suprimido
troca(i_numero(10, 1), fim_numero(10, 1), citado(9, "a"))
troca(i_numero(10, 6), fim_numero(10, 6), citado(9, "c"))
troca(i_numero(10, 5), fim_numero(10, 5), [])          # b) É suprimido o n.º 5

# 10) art. 11.º, n.º 1, segundo parágrafo
k = i_numero(11, 1)
troca(k + 1, k + 2, citado(10))

# 11) art. 17.º, n.º 2
troca(i_numero(17, 2), fim_numero(17, 2), citado(11))

# 12) art. 25.º: n.º 2 e primeiro parágrafo do n.º 4
troca(i_numero(25, 2), fim_numero(25, 2), citado(12, "a"))
troca(i_numero(25, 4), i_numero(25, 4) + 1, citado(12, "b"))

# 13) art. 27.º: n.º 4 e n.º 5
troca(i_numero(27, 4), fim_numero(27, 4), citado(13, "a"))
troca(i_numero(27, 5), fim_numero(27, 5), citado(13, "b"))

# 14) art. 28.º: novos números no fim
troca(fim_artigo(i_artigo(28)), fim_artigo(i_artigo(28)), citado(14))

# 15) art. 29.º, n.º 4 · 16) art. 30.º, n.º 2
troca(i_numero(29, 4), fim_numero(29, 4), citado(15))
troca(i_numero(30, 2), fim_numero(30, 2), citado(16))

# 17) art. 40.º, n.º 2: parágrafo aditado
troca(fim_numero(40, 2), fim_numero(40, 2), citado(17))

# 18) art. 42.º: número aditado
troca(fim_artigo(i_artigo(42)), fim_artigo(i_artigo(42)), citado(18))

# 19) art. 43.º, n.º 3 · 20) art. 50.º, n.º 7 · 21) art. 56.º, n.º 6
troca(i_numero(43, 3), fim_numero(43, 3), citado(19))
troca(i_numero(50, 7), fim_numero(50, 7), citado(20))
troca(i_numero(56, 6), fim_numero(56, 6), citado(21))

# 22) art. 57.º
troca(i_numero(57, 1), i_numero(57, 1) + 1, citado(22, "a"))
troca(i_numero(57, 3), fim_numero(57, 3), citado(22, "b"))
troca(fim_numero(57, 3), fim_numero(57, 3), citado(22, "c"))
troca(i_numero(57, 5), fim_numero(57, 5), citado(22, "d"))
troca(i_alinea(57, 9, "e"), i_alinea(57, 9, "e") + 1, citado(22, "e"))
troca(i_numero(57, 10), fim_numero(57, 10), citado(22, "f"))
troca(i_numero(57, 14), fim_numero(57, 14), citado(22, "g"))

# 23) art. 58.º, n.º 1: parte introdutória e alínea aditada
troca(i_numero(58, 1), i_numero(58, 1) + 1, citado(23, "a"))
troca(fim_numero(58, 1), fim_numero(58, 1), citado(23, "b"))

# 24) art. 60.º: primeiro parágrafo do n.º 1 e n.º 2
troca(i_numero(60, 1), i_numero(60, 1) + 1, citado(24, "a"))
troca(i_numero(60, 2), fim_numero(60, 2), citado(24, "b"))

# 25) novo art. 60.º-A · 26) art. 63.º, n.º 1 · 27) art. 64.º: número aditado
troca(fim_artigo(i_artigo(60)), fim_artigo(i_artigo(60)), citado(25))
troca(i_numero(63, 1), fim_numero(63, 1), citado(26))
troca(fim_artigo(i_artigo(64)), fim_artigo(i_artigo(64)), citado(27))

# 28) art. 69.º, n.º 2 · 29) art. 70.º, n.º 8 · 30) art. 72.º, n.º 3
troca(i_numero(69, 2), fim_numero(69, 2), citado(28))
troca(i_numero(70, 8), fim_numero(70, 8), citado(29))
troca(i_numero(72, 3), fim_numero(72, 3), citado(30))

# 31) art. 75.º: título, n.º 1 e novos números
blocos[i_artigo(75)] = "Artigo 75.º — " + citado(31, "a")[0]
troca(i_numero(75, 1), fim_numero(75, 1), citado(31, "b"))
troca(fim_numero(75, 1), fim_numero(75, 1), citado(31, "c"))
troca(fim_artigo(i_artigo(75)), fim_artigo(i_artigo(75)), citado(31, "d"))

# 32) novos artigos depois do 75.º
troca(fim_artigo(i_artigo(75)), fim_artigo(i_artigo(75)), citado(32))

# 33) art. 76.º, n.º 1: parágrafo aditado
troca(fim_numero(76, 1), fim_numero(76, 1), citado(33))

# 34) art. 77.º: título, n.º 1 e novos números
blocos[i_artigo(77)] = "Artigo 77.º — " + citado(34, "a")[0]
troca(i_numero(77, 1), fim_numero(77, 1), citado(34, "b"))
troca(fim_numero(77, 1), fim_numero(77, 1), citado(34, "c"))

# 35) art. 95.º, n.º 4
troca(i_numero(95, 4), fim_numero(95, 4), citado(35))

# 36) art. 96.º, n.º 1: alínea a), alínea aditada e segundo parágrafo
troca(i_alinea(96, 1, "a"), i_alinea(96, 1, "a") + 1, citado(36, "a"))
troca(fim_numero(96, 1) , fim_numero(96, 1), citado(36, "b"))
k = fim_numero(96, 1)
troca(k, k, citado(36, "c"))

# 37) art. 97.º: n.º 2 e 3, e n.º 6
troca(i_numero(97, 2), fim_numero(97, 3), citado(37, "a"))
troca(i_numero(97, 6), fim_numero(97, 6), citado(37, "b"))

# 38) art. 99.º: n.º 1, alínea no n.º 4 e novo n.º 6-A
troca(i_numero(99, 1), fim_numero(99, 1), citado(38, "a"))
troca(i_alinea(99, 4, "d") + 1, i_alinea(99, 4, "d") + 1, citado(38, "b"))
troca(fim_numero(99, 6), fim_numero(99, 6), citado(38, "c"))

# 39) art. 111.º: n.º 2 e novo n.º 4
troca(i_numero(111, 2), fim_numero(111, 2), citado(39, "a"))
troca(fim_artigo(i_artigo(111)), fim_artigo(i_artigo(111)), citado(39, "b"))

# 40) art. 113.º, terceiro parágrafo: alíneas a), c) e nova d)
ini113, fim113 = i_artigo(113), fim_artigo(i_artigo(113))
ka = next(k for k in range(ini113, fim113) if blocos[k].startswith("a) "))
troca(ka, ka + 1, citado(40, "a"))
kc = next(k for k in range(i_artigo(113), fim_artigo(i_artigo(113))) if blocos[k].startswith("c) "))
troca(kc, kc + 1, citado(40, "b"))
kc = next(k for k in range(i_artigo(113), fim_artigo(i_artigo(113))) if blocos[k].startswith("c) "))
fimc = next((k for k in range(kc + 1, fim_artigo(i_artigo(113)))
             if not blocos[k].startswith("-")), kc + 1)
troca(fimc, fimc, citado(40, "c"))

texto = "\n\n".join(blocos) + "\n"

# ------------------------------------------------------------------- anexos

def sub_unica(t, alvo, novo, rotulo):
    assert t.count(alvo) == 1, f"{rotulo}: {t.count(alvo)} ocorrências"
    return t.replace(alvo, novo)

# 41 a) anexo I, secção A: ponto 1 suprimido (o Regulamento Máquinas passa
# à secção B — considerando 42 do Omnibus)
m = re.search(r"(?ms)^### SECÇÃO A .*?(?=^### |^## |\Z)", texto)
assert m, "anexo I, secção A não encontrada"
sec = m.group(0)
sem1 = re.sub(r"(?m)^1\\\.\s—[^\n]*\n\n", "", sec, count=1)
assert sem1 != sec, "ponto 1 da secção A do anexo I não removido"
texto = texto[:m.start()] + sem1 + texto[m.end():]

# 41 b) anexo I, secção B: ponto aditado ao fim da secção
m = re.search(r"(?ms)^### SECÇÃO B Lista de outra legislação.*?(?=^## |\Z)", texto)
assert m, "anexo I, secção B não encontrada"
novo_ponto = "\n\n".join(citado(41, "b"))
texto = texto[:m.end()].rstrip() + "\n\n" + novo_ponto + "\n\n" + texto[m.end():]

# 42) anexo VIII, secção B: pontos 7 e 9 suprimidos
m = re.search(r"(?ms)^### SECÇÃO B Informações a apresentar pelos prestadores de sistemas de IA de risco elevado nos termos.*?(?=^### |^## |\Z)", texto)
assert m, "anexo VIII, secção B não encontrada"
sec = m.group(0)
nova = re.sub(r"(?m)^(?:7|9)\\\.\s[^\n]*\n\n", "", sec)
assert nova.count("\n\n") == sec.count("\n\n") - 2, "pontos 7 e 9 do anexo VIII: remoção inesperada"
texto = texto[:m.start()] + nova + texto[m.end():]

# 43) novo anexo, ao fim
texto = texto.rstrip() + "\n\n" + "\n\n".join(citado(43)) + "\n"

DESTINO.write_text(FRENTE + texto, encoding="utf-8")

artigos = re.findall(r"(?m)^Artigo (\d+\.º(?:-[A-Z])?) —", texto)
originais = re.findall(r"(?m)^Artigo (\d+\.º(?:-[A-Z])?) —", fonte)
assert not set(originais) - set(artigos), "artigo sumiu na consolidação"
assert not re.search(r"(?m)^\d{1,3}\. ", texto), "número sem escape (viraria lista)"
print(f"{DESTINO.relative_to(RAIZ)}: {len(artigos)} artigos "
      f"({len(set(artigos) - set(originais))} novos), "
      f"{len(re.split(chr(10) + chr(10), texto.strip()))} blocos")
