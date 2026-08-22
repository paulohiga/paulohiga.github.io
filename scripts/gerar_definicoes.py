#!/usr/bin/env python3
"""Gera o banco de definições normativas a partir dos textos de `_leis/`.

As fontes de verdade continuam sendo os textos normativos. Este script localiza
os artigos cuja ementa contém "Definições", extrai cada inciso/ponto sem
reescrever a literalidade e agrupa termos iguais ou equivalentes somente dentro
da mesma jurisdição. O banco também registra as ocorrências das formas de busca
de cada verbete no corpo das notas e dos textos normativos, para permitir
ordenação por frequência na página consolidada. O item pode vir numerado (o
inciso "V –" das normas brasileiras, o ponto "10)" do RGPD e do AI Act) ou
como alínea ("a)", que é como o art. 3.º do DSA lista as suas definições).
"""

from __future__ import annotations

import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import yaml


RAIZ = Path(__file__).resolve().parents[1]
LEIS = RAIZ / "_leis"
NOTAS = RAIZ / "_notas"
EMENTAS = RAIZ / "_data" / "ementas"
SAIDA = RAIZ / "_data" / "definicoes.yml"

# Definições materiais que aparecem fora de artigos/capítulos intitulados
# "Definições". Os limites são dispositivos, não números de linha, para
# sobreviverem a atualizações do texto ao redor.
EXTRAS = (
    {
        "slug": "eca-digital", "artigo": "1", "sufixo": "pu",
        "termo": "acesso provável por crianças e adolescentes",
        "dispositivo": "art. 1º, parágrafo único",
        "inicio": r"^Parágrafo único\. Para os fins desta Lei, considera-se acesso provável por crianças e adolescentes ",
        "fim": r"^Art\. 2º",
    },
    {
        "slug": "decreto-12880", "artigo": "9", "sufixo": "pu",
        "termo": "mecanismos de incentivo ao uso excessivo, problemático ou compulsivo",
        "dispositivo": "art. 9º, parágrafo único",
        "inicio": r"^Parágrafo único\.  Para fins do disposto neste Decreto, consideram-se mecanismos de incentivo ao uso excessivo, problemático ou compulsivo:",
        "fim": r"^Art\. 10\.",
    },
    {
        "slug": "decreto-12880", "artigo": "10", "sufixo": "pu",
        "termo": "práticas manipulativas, enganosas ou coercitivas",
        "dispositivo": "art. 10, parágrafo único",
        "inicio": r"^Parágrafo único\.  Para fins do disposto neste Decreto, consideram-se práticas manipulativas, enganosas ou coercitivas, em produtos ou serviços de tecnologia da informação direcionados a crianças e adolescentes ou de acesso provável por eles, ",
        "fim": r"^Art\. 11\.",
    },
    {
        "slug": "decreto-12880", "artigo": "15", "sufixo": "p1",
        "termo": "conteúdos, produtos e serviços proibidos para crianças e adolescentes",
        "dispositivo": "art. 15, § 1º",
        "inicio": r"^§ 1º  Para fins do disposto no \*caput\*, consideram-se conteúdos, produtos e serviços proibidos para crianças e adolescentes:",
        "fim": r"^§ 2º",
    },
    {
        "slug": "resolucao-anpd-2", "artigo": "4", "sufixo": "",
        "termo": "tratamento de alto risco",
        "dispositivo": "art. 4º",
        "inicio": r"^Art\. 4º Para fins deste regulamento, e sem prejuízo do disposto no art\. 16, será considerado de alto risco o ",
        "fim": r"^§ 1º",
    },
    {
        "slug": "resolucao-anpd-4", "artigo": "12", "sufixo": "p1",
        "termo": "faturamento",
        "dispositivo": "art. 12, § 1º",
        "inicio": r"^§ 1º Para fins do disposto no inciso II do caput, será considerado como faturamento:",
        "fim": r"^§ 2º",
    },
)

# Equivalências editoriais conservadoras. O agrupamento nunca atravessa a
# jurisdição: a chave final sempre inclui BR ou UE.
EQUIVALENTES = {
    "dados pessoais": "dado pessoal",
    "titular dos dados": "titular",
    "tratamento de dados pessoais": "tratamento",
    "agentes de tratamento": "agente de tratamento",
    "grupo ou conglomerado de empresas": "grupo ou conglomerado empresarial",
    "grupo ou conglomerado empresarial": "grupo ou conglomerado empresarial",
    "microempresas e empresas de pequeno porte": "microempresa e empresa de pequeno porte",
    "registros de acesso a aplicações de internet": "registro de acesso a aplicações de internet",
    "regras vinculativas aplicáveis às empresas": "regras vinculativas aplicáveis a empresas",
}

# Equivalentes brasileiros dos termos das normas europeias, cuja literalidade é
# a do EUR-Lex, em PT-PT. Servem a três coisas ao mesmo tempo: aparecem no
# verbete como "no Brasil", entram na busca da página consolidada e permitem
# que o comentário de uma nota europeia, escrito em pt-BR, continue marcando o
# termo e levando ao verbete certo. O título do verbete e a redação da norma
# não mudam.
#
# A chave é a de `chave_termo` (minúscula e sem acento). Um equivalente que
# colida com o termo de outro verbete da mesma jurisdição é recusado por
# `conferir_equivalentes()` — foi o que barrou "operador" como equivalente de
# «Subcontratante» do RGPD: no AI Act, «Operador» é o gênero que abrange
# fornecedor, implementador, importador, distribuidor e mandatário.
EQUIVALENTES_BR = {
    "prestador": ["fornecedor"],
    "prestador a jusante": ["fornecedor a jusante"],
    "responsavel pela implantacao": ["implementador"],
    "responsavel pelo tratamento": ["controlador"],
    "autoridade de controlo": ["autoridade de controle"],
    "ambiente de testagem da regulamentacao da ia": ["sandbox regulatório"],
    "plano do ambiente de testagem": ["plano do sandbox regulatório"],
    "testagem em condicoes reais": ["teste em condições reais"],
    "plano de testagem em condicoes reais": ["plano de teste em condições reais"],
    "falsificacoes profundas": ["deepfake"],
    "risco sistemico": ["risco sistêmico"],
    "literacia no dominio da ia": ["letramento em IA"],
    "dados de treino": ["dados de treinamento"],
    "operacao de virgula flutuante": ["operação de ponto flutuante"],
    "instrucoes de utilizacao": ["instruções de uso"],
    "utilizacao indevida razoavelmente previsivel": ["uso indevido razoavelmente previsível"],
    "sistema de acompanhamento pos comercializacao": ["monitoramento pós-comercialização"],
    "avaliacao da conformidade": ["avaliação de conformidade"],
    "organismo de avaliacao da conformidade": ["organismo de avaliação de conformidade"],
    "autoridade de fiscalizacao do mercado": ["autoridade de fiscalização de mercado"],
    "definicao de perfis": ["perfilamento", "criação de perfis"],
    "capacidades de elevado impacto": ["capacidades de alto impacto"],
    "modelo de ia de finalidade geral": ["modelo de IA de propósito geral"],
    "sistema de ia de finalidade geral": ["sistema de IA de propósito geral"],
    "mandatario": ["representante autorizado"],
    "plataforma em linha": ["plataforma online"],
    "motor de pesquisa em linha": ["mecanismo de busca"],
    "interface em linha": ["interface online"],
    "destinatario do servico": ["usuário do serviço"],
    "termos e condicoes": ["termos de uso"],
    "volume de negocios": ["faturamento"],
    "coordenador dos servicos digitais de estabelecimento": ["coordenador de estabelecimento"],
    "coordenador dos servicos digitais de destino": ["coordenador de destino"],
    "categorias especiais de dados pessoais": ["dados sensíveis"],
}

# Variações de grafia e plurais que só interessam à busca e à marcação: não são
# termos equivalentes e por isso não aparecem no verbete.
FORMAS = {
    "rede social": ["redes sociais"],
    "prestador": ["fornecedores"],
    "responsavel pela implantacao": ["implementadores"],
    "falsificacoes profundas": ["deepfakes"],
    "literacia no dominio da ia": ["literacia em IA"],
    "testagem em condicoes reais": ["testes em condições reais"],
    "plataforma em linha": ["plataformas online"],
    "motor de pesquisa em linha": ["mecanismos de busca"],
    "servico intermediario": ["serviços intermediários"],
    "destinatario do servico": ["usuários do serviço"],
    "conteudos ilegais": ["conteúdo ilegal"],
    "moderacao de conteudos": ["moderação de conteúdo"],
    "comerciante": ["comerciantes"],
    "sistema de recomendacao": ["sistemas de recomendação"],
    "contrato a distancia": ["contratar à distância"],
}

NOTAS_TITULOS = {"ai-act": "AI Act", "dsa": "DSA", "eca-digital": "ECA Digital", "gdpr": "GDPR", "lgpd": "LGPD", "mci": "Marco Civil da Internet", "regimento-interno-anpd": "Regimento Interno da ANPD"}

TEMAS = (
    ("Crianças, adolescentes e idade", ("criança", "adolescente", "idade", "parental", "infantil")),
    ("Inteligência artificial", ("inteligência artificial", "sistema de ia", "biométr", "algorit", "modelo", "treino", "testagem", "falsificaç", "sistema de reconhecimento")),
    ("Segurança, incidentes e violência", ("segurança", "incidente", "confidencialidade", "integridade", "disponibilidade", "autenticidade", "sigilo", "violência")),
    ("Internet e plataformas", ("internet", "rede social", "terminal", "endereço ip", "conexão", "aplicação", "conteúdo", "impulsionamento", "monetização", "em linha", "plataforma", "motor de pesquisa", "intermediári", "recomendaç", "moderaç", "difusão ao público", "sociedade da informação", "termos e condições", "publicitário")),
    ("Fiscalização e sanções", ("infração", "infrator", "fiscalização", "sanção", "autuado", "denúncia", "requerimento", "petição", "obstrução", "reincidência", "faturamento", "volume de negócios")),
    ("Transferências internacionais", ("transferência", "exportador", "importador", "organismo internacional", "organização internacional", "adequação")),
    ("Agentes e governança", ("controlador", "operador", "responsável", "subcontratante", "encarregado", "agente", "empresa", "entidade", "autoridade", "prestador", "distribuidor", "mandatário", "coordenador", "destinatário", "comerciante", "consumidor")),
    ("Dados pessoais e tratamento", ("dado", "tratamento", "titular", "consentimento", "anonim", "pseudonim", "perfil", "ficheiro", "eliminação", "bloqueio")),
)


def conferir_equivalentes(verbetes: list[dict]) -> None:
    """Recusa equivalente órfão ou ambíguo.

    Ambíguo é o equivalente que já é termo, equivalente ou forma de busca de
    outro verbete da mesma jurisdição: ali a marcação nos comentários levaria
    ao verbete errado, em silêncio. Órfão é a chave cadastrada que nenhum
    verbete tem — sinal de termo renomeado ou removido da norma.
    """
    dono: dict[tuple[str, str], str] = {}
    for verbete in verbetes:
        for forma in verbete["busca"]:
            dono.setdefault((verbete["jurisdicao"], chave_termo(forma)), verbete["id"])

    erros = []
    chaves_vistas = {(v["jurisdicao"], chave_termo(t)) for v in verbetes for t in v["termos"]}
    for chave in EQUIVALENTES_BR:
        if ("UE", chave) not in chaves_vistas:
            erros.append(f"equivalente órfão: nenhum verbete UE para '{chave}'")
    for chave in FORMAS:
        if not any((j, chave) in chaves_vistas for j in ("BR", "UE")):
            erros.append(f"forma órfã: nenhum verbete para '{chave}'")

    for verbete in verbetes:
        proprias = {chave_termo(t) for t in verbete["termos"]}
        for extra in verbete["equivalentes"] + FORMAS.get(chave_termo(verbete["termos"][0]), []):
            chave = chave_termo(extra)
            alvo = dono.get((verbete["jurisdicao"], chave))
            if chave not in proprias and alvo not in (None, verbete["id"]):
                erros.append(
                    f"'{extra}' é de {verbete['id']} e de {alvo} na mesma jurisdição"
                )

    if erros:
        raise SystemExit("EQUIVALENTES_BR/FORMAS:\n  " + "\n  ".join(sorted(set(erros))))

def corpo_para_contagem(texto: str) -> str:
    """Retira o front matter; conta apenas o conteúdo da nota ou da norma."""
    partes = texto.split("---", 2)
    return partes[2] if len(partes) == 3 else texto


def textos_para_contagem(diretorio: Path, jurisdicao: str) -> list[str]:
    textos = []
    for caminho in sorted(diretorio.glob("*.md")):
        meta, _ = frente(caminho.read_text())
        formato = meta.get("formato", "br")
        juris = "UE" if formato == "ue" or "europa" in str(meta.get("jurisdicao", "")).lower() else "BR"
        if juris == jurisdicao:
            textos.append(sem_acentos(corpo_para_contagem(caminho.read_text())))
    return textos


def contar_mencoes(textos: list[str], formas: list[str]) -> int:
    """Conta formas inteiras, sem diferenciar maiúsculas nem acentos."""
    formas = sorted(
        {sem_acentos(forma) for forma in formas if forma},
        key=len,
        reverse=True,
    )
    if not formas:
        return 0
    padrao = re.compile(
        r"(?<![a-z0-9])(?:" + "|".join(re.escape(forma) for forma in formas) + r")(?![a-z0-9])"
    )
    return sum(len(padrao.findall(texto)) for texto in textos)


def frente(texto: str) -> tuple[dict, str]:
    partes = texto.split("---", 2)
    if len(partes) != 3:
        raise ValueError("front matter ausente")
    return yaml.safe_load(partes[1]) or {}, partes[2].lstrip("\n")


def sem_acentos(texto: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", texto.lower())
        if unicodedata.category(c) != "Mn"
    )


def chave_termo(termo: str) -> str:
    chave = re.sub(r"[^a-z0-9]+", " ", sem_acentos(termo)).strip()
    return EQUIVALENTES.get(chave, chave)


def id_seguro(texto: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", sem_acentos(texto)).strip("-")


def inicial_maiuscula(texto: str) -> str:
    """Uniformiza a apresentação do verbete sem tocar na literalidade."""
    return texto[:1].upper() + texto[1:]


def limpar_literal(texto: str) -> str:
    texto = texto.strip()
    texto = re.sub(r"\s+_\((?:Redação|Incluído|Alterado|Revogado).*?\)_\s*$", "", texto)
    texto = re.sub(r"(?:;\s*e|[.;])\s*$", "", texto, flags=re.IGNORECASE)
    return texto


def chave_literal(texto: str) -> str:
    """Compara redações sem diferenças meramente tipográficas."""
    texto = re.sub(r"[*_`]", "", texto)
    texto = re.sub(r"\s+", " ", texto).strip()
    return sem_acentos(texto)


def agrupar_definicoes(itens: list[dict]) -> list[dict]:
    grupos: list[dict] = []
    por_texto: dict[str, dict] = {}
    for item in itens:
        chave = chave_literal(item["texto"])
        grupo = por_texto.get(chave)
        if grupo is None:
            grupo = {"texto": item["texto"], "referencias": []}
            por_texto[chave] = grupo
            grupos.append(grupo)
        grupo["referencias"].append({
            campo: item[campo]
            for campo in (
                "jurisdicao", "norma", "norma_apelido", "norma_titulo",
                "fonte", "dispositivo", "url", "nota_url",
            )
        })
    return grupos


def tema_de(termos: list[str]) -> str:
    alvo = sem_acentos(" ".join(termos))
    for tema, palavras in TEMAS:
        if any(
            re.search(r"\bidade\b", alvo) if sem_acentos(palavra) == "idade"
            else sem_acentos(palavra) in alvo
            for palavra in palavras
        ):
            return tema
    return "Outros conceitos normativos"


def artigo_da_chave(chave: str) -> str:
    return chave.removeprefix("art-")


def localizar_artigo(corpo: str, artigo: str) -> str:
    numero = re.escape(artigo).replace(r"\-", "[-.]?")
    padrao = re.compile(
        rf"^Art(?:igo|\.)\s+{numero}(?:\.?º|\.º|°)?(?:\s|\.|—|-)",
        re.MULTILINE | re.IGNORECASE,
    )
    inicio = padrao.search(corpo)
    if not inicio:
        raise ValueError(f"artigo {artigo} não localizado")
    proximo = re.compile(r"^Art(?:igo|\.)\s+", re.MULTILINE).search(corpo, inicio.end())
    return corpo[inicio.start() : proximo.start() if proximo else len(corpo)]


def extrair_itens(bloco: str, ue: bool) -> list[dict]:
    linhas = bloco.splitlines()[1:]
    itens: list[dict] = []
    atual: dict | None = None

    # O marcador do item pode ser numerado ("10)", como no RGPD e no AI Act) ou
    # uma alínea ("a)", como no art. 3.º do DSA). Subníveis chegam aqui como
    # item de lista ("- i) …") e não casam com nenhum dos dois.
    padrao_ue = re.compile(
        r"^(?:([a-z](?:-[A-Za-z])?|\d+(?:-[A-Z])?)\)\s+)?[«“\"]([^»”\"]+)[»”\"]\s*[,–—:-]?\s*(.*)$"
    )
    padrao_br = re.compile(r"^([IVXLCDM]+)\s*[–-]\s*(.+?)\s*[:–-]\s+(.*)$")

    for linha in linhas:
        limpa = linha.strip()
        if not limpa:
            continue
        # Redações superadas e novos blocos estruturais não integram a
        # definição imediatamente anterior. Isso evita que o último inciso
        # absorva texto tachado, parágrafos ou o capítulo seguinte.
        if limpa.startswith("~~") or re.match(r"^(?:#{1,6}\s|§\s|Parágrafo único\.)", limpa):
            if atual:
                itens.append(atual)
                atual = None
            break
        casamento = padrao_ue.match(limpa) if ue else padrao_br.match(limpa)
        if casamento:
            if atual:
                itens.append(atual)
            if ue:
                marcador, termo, definicao = casamento.groups()
            else:
                marcador, termo, definicao = casamento.groups()
            atual = {
                "marcador": marcador or "",
                "termo": termo.strip(),
                "definicao": definicao.strip(),
                "continuacao": [],
            }
        elif atual:
            atual["continuacao"].append(limpa)
    if atual:
        itens.append(atual)

    for item in itens:
        partes = [item.pop("definicao"), *item.pop("continuacao")]
        item["texto"] = limpar_literal("\n\n".join(p for p in partes if p))
    return itens


def url_dispositivo(norma: dict, artigo: str, sufixo: str = "") -> str:
    normas = yaml.safe_load((RAIZ / "_data" / "normas.yml").read_text())
    registro = normas[norma["slug"]]
    prefixo = registro.get("prefixo", "")
    base_id = f"art-{artigo}"
    if sufixo:
        base_id += f"-{sufixo.lower()}"
    ancora = f"{prefixo}-{base_id}" if prefixo else base_id
    return f"/notas/{registro['nota']}#{ancora}"


def url_nota(norma: dict) -> str:
    normas = yaml.safe_load((RAIZ / "_data" / "normas.yml").read_text())
    return f"/notas/{normas[norma['slug']]['nota']}"


def sufixo_ponto(marcador: str) -> str:
    """Converte o marcador europeu no sufixo do id: o ponto numerado `10`/`14-A`
    vira `p10`/`p14a`; a alínea `a`/`b-a`, o próprio `a`/`ba` — o mesmo esquema
    de `_includes/lei-anotada.html`."""
    casamento = re.fullmatch(r"(\d+)(?:-([A-Z]))?", marcador)
    if not casamento:
        return marcador.replace("-", "").lower()
    return f"p{casamento.group(1)}{(casamento.group(2) or '').lower()}"


def referencia(norma: dict, artigo: str, marcador: str, ue: bool) -> tuple[str, str]:
    sem_ancora_propria = norma["slug"] == "resolucao-anpd-15" and marcador in {"XIV", "XVI"}
    if ue:
        sufixo = sufixo_ponto(marcador) if marcador else ""
    else:
        sufixo = "" if sem_ancora_propria else marcador
    url = url_dispositivo(norma, artigo, sufixo)
    dispositivo = f"art. {artigo}.º" if ue else f"art. {artigo}º"
    if marcador and ue:
        if marcador[0].isdigit():
            dispositivo += f", ponto {marcador}"
        else:
            dispositivo += f", alínea {marcador})"
    elif marcador:
        dispositivo += f", {marcador}"
    return dispositivo, url


def extrair_extra(especificacao: dict, corpo: str) -> str:
    inicio = re.search(especificacao["inicio"], corpo, re.MULTILINE)
    if not inicio:
        raise ValueError(f"início da definição extra não localizado: {especificacao['termo']}")
    fim = re.search(especificacao["fim"], corpo[inicio.end():], re.MULTILINE)
    limite = inicio.end() + fim.start() if fim else len(corpo)
    resto_primeira_linha = corpo[inicio.end():].splitlines()[0]
    continuacao_inicio = corpo.find("\n", inicio.end()) + 1
    continuacao = corpo[continuacao_inicio:limite].strip()
    texto = resto_primeira_linha.strip().lstrip(": ")
    if continuacao:
        texto = (texto + "\n\n" + continuacao).strip()
    return limpar_literal(texto)


def main() -> None:
    definicoes: list[dict] = []
    textos_notas = {jurisdicao: textos_para_contagem(NOTAS, jurisdicao) for jurisdicao in ("BR", "UE")}
    textos_normas = {jurisdicao: textos_para_contagem(LEIS, jurisdicao) for jurisdicao in ("BR", "UE")}
    for caminho in sorted(LEIS.glob("*.md")):
        slug = caminho.stem
        ementa_path = EMENTAS / f"{slug}.yml"
        if not ementa_path.exists():
            continue
        ementas = yaml.safe_load(ementa_path.read_text()) or {}
        artigos = [chave for chave, rotulo in ementas.items() if "defini" in sem_acentos(str(rotulo))]
        if not artigos:
            continue

        meta, corpo = frente(caminho.read_text())
        meta["slug"] = slug
        ue = meta.get("formato") == "ue"
        jurisdicao = "UE" if ue else "BR"
        for chave_artigo in artigos:
            artigo = artigo_da_chave(chave_artigo)
            bloco = localizar_artigo(corpo, artigo)
            for item in extrair_itens(bloco, ue):
                dispositivo, url = referencia(meta, artigo, item["marcador"], ue)
                definicoes.append({
                    "termo": item["termo"],
                    "texto": item["texto"],
                    "jurisdicao": jurisdicao,
                    "norma": slug,
                    "norma_apelido": meta["apelido"],
                    "norma_titulo": meta["titulo"],
                    "fonte": meta["fonte"],
                    "dispositivo": dispositivo,
                    "url": url,
                    "nota_url": url_nota(meta),
                })

    for extra in EXTRAS:
        caminho = LEIS / f"{extra['slug']}.md"
        meta, corpo = frente(caminho.read_text())
        meta["slug"] = extra["slug"]
        definicoes.append({
            "termo": extra["termo"],
            "texto": extrair_extra(extra, corpo),
            "jurisdicao": "BR",
            "norma": extra["slug"],
            "norma_apelido": meta["apelido"],
            "norma_titulo": meta["titulo"],
            "fonte": meta["fonte"],
            "dispositivo": extra["dispositivo"],
            "url": url_dispositivo(meta, extra["artigo"], extra["sufixo"]),
            "nota_url": url_nota(meta),
        })

    grupos: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for definicao in definicoes:
        grupos[(definicao["jurisdicao"], chave_termo(definicao["termo"]))].append(definicao)

    saida = []
    ids = set()
    for (jurisdicao, chave), itens in grupos.items():
        termos = list(dict.fromkeys(inicial_maiuscula(item["termo"]) for item in itens))
        for item in itens:
            item["termo"] = inicial_maiuscula(item["termo"])
        titulo = " · ".join(termos)
        base_id = id_seguro(f"{jurisdicao}-{chave}")
        verbete_id = base_id
        contador = 2
        while verbete_id in ids:
            verbete_id = f"{base_id}-{contador}"
            contador += 1
        ids.add(verbete_id)
        tema = tema_de(termos)
        equivalentes = EQUIVALENTES_BR.get(chave, []) if jurisdicao == "UE" else []
        formas = FORMAS.get(chave, [])
        busca = list(dict.fromkeys([*termos, *equivalentes, *formas]))
        mencoes_notas = contar_mencoes(textos_notas[jurisdicao], busca)
        mencoes_normas = contar_mencoes(textos_normas[jurisdicao], busca)
        busca_texto = " ".join(dict.fromkeys([
            *busca,
            tema,
            *(item["norma_apelido"] for item in itens),
            *(item["norma_titulo"] for item in itens),
        ]))
        notas_ids = sorted({
            referencia["nota_url"].removeprefix("/notas/")
            for definicao in agrupar_definicoes(itens)
            for referencia in definicao["referencias"]
        })
        notas = [NOTAS_TITULOS.get(nota, nota) for nota in notas_ids]
        notas_texto = " · ".join(notas)
        saida.append({
            "id": verbete_id,
            "titulo": titulo,
            "termos": termos,
            "equivalentes": equivalentes,
            "busca": termos + equivalentes + formas,
            "busca_texto": busca_texto,
            "letra": sem_acentos(termos[0])[0].upper(),
            "tema": tema,
            "jurisdicao": jurisdicao,
            "mencoes": mencoes_notas + mencoes_normas,
            "mencoes_notas": mencoes_notas,
            "mencoes_normas": mencoes_normas,
            "notas": notas,
            "notas_texto": notas_texto,
            "definicoes": agrupar_definicoes(itens),
        })

    saida.sort(key=lambda item: (sem_acentos(item["titulo"]), item["jurisdicao"]))
    conferir_equivalentes(saida)
    cabecalho = (
        "# GERADO POR scripts/gerar_definicoes.py. NÃO EDITE À MÃO.\n"
        "# A literalidade vem de _leis/; equivalências e temas ficam no script.\n"
    )
    SAIDA.write_text(cabecalho + yaml.safe_dump(saida, allow_unicode=True, sort_keys=False, width=1000))
    print(f"{len(definicoes)} definições em {len(saida)} verbetes: {SAIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
