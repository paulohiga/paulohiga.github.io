#!/usr/bin/env python3
"""Gera o banco de definições normativas a partir dos textos de `_leis/`.

As fontes de verdade continuam sendo os textos normativos. Este script localiza
os artigos cuja ementa contém "Definições", extrai cada inciso/ponto sem
reescrever a literalidade e agrupa termos iguais ou equivalentes somente dentro
da mesma jurisdição.
"""

from __future__ import annotations

import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import yaml


RAIZ = Path(__file__).resolve().parents[1]
LEIS = RAIZ / "_leis"
EMENTAS = RAIZ / "_data" / "ementas"
SAIDA = RAIZ / "_data" / "definicoes.yml"

# O texto original do AI Act permanece no painel para consulta histórica. As
# definições vigentes vêm da consolidação, que incorpora o Digital Omnibus.
IGNORAR = {"ai-act", "regulamento-2026-1744"}

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

TEMAS = (
    ("Crianças, adolescentes e idade", ("criança", "adolescente", "idade", "parental", "infantil")),
    ("Inteligência artificial", ("inteligência artificial", "sistema de ia", "biométr", "algorit", "modelo", "treino", "testagem", "falsificaç", "sistema de reconhecimento")),
    ("Segurança, incidentes e violência", ("segurança", "incidente", "confidencialidade", "integridade", "disponibilidade", "autenticidade", "sigilo", "violência")),
    ("Internet e plataformas", ("internet", "rede social", "terminal", "endereço ip", "conexão", "aplicação", "conteúdo", "impulsionamento", "monetização")),
    ("Fiscalização e sanções", ("infração", "infrator", "fiscalização", "sanção", "autuado", "denúncia", "requerimento", "petição", "obstrução", "reincidência")),
    ("Transferências internacionais", ("transferência", "exportador", "importador", "organismo internacional", "organização internacional", "adequação")),
    ("Agentes e governança", ("controlador", "operador", "responsável", "subcontratante", "encarregado", "agente", "empresa", "entidade", "autoridade", "prestador", "distribuidor", "mandatário")),
    ("Dados pessoais e tratamento", ("dado", "tratamento", "titular", "consentimento", "anonim", "pseudonim", "perfil", "ficheiro", "eliminação", "bloqueio")),
)


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


def limpar_literal(texto: str) -> str:
    texto = texto.strip()
    texto = re.sub(r"\s+_\((?:Redação|Incluído|Alterado|Revogado).*?\)_\s*$", "", texto)
    return texto


def tema_de(termos: list[str]) -> str:
    alvo = sem_acentos(" ".join(termos))
    for tema, palavras in TEMAS:
        if any(sem_acentos(palavra) in alvo for palavra in palavras):
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

    padrao_ue = re.compile(r"^(?:(\d+(?:-[A-Z])?)\)\s+)?[«“\"]([^»”\"]+)[»”\"],?\s*(.*)$")
    padrao_br = re.compile(r"^([IVXLCDM]+)\s*[–-]\s*(.+?)\s*[:–-]\s+(.*)$")

    for linha in linhas:
        limpa = linha.strip()
        if not limpa or limpa.startswith("~~"):
            if atual and limpa:
                atual["continuacao"].append(limpa)
            continue
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


def referencia(norma: dict, artigo: str, marcador: str, ue: bool) -> tuple[str, str]:
    # Nos artigos europeus de definições, os pontos usam "1)" em vez do
    # formato numerado "1." que lei-anotada.html ancora. O link vai ao artigo
    # e a referência visível especifica o ponto.
    sem_ancora_propria = norma["slug"] == "resolucao-anpd-15" and marcador in {"XIV", "XVI"}
    sufixo = "" if ue or sem_ancora_propria else marcador
    url = url_dispositivo(norma, artigo, sufixo)
    dispositivo = f"art. {artigo}.º" if ue else f"art. {artigo}º"
    if marcador:
        dispositivo += f", ponto {marcador}" if ue else f", {marcador}"
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
    for caminho in sorted(LEIS.glob("*.md")):
        slug = caminho.stem
        if slug in IGNORAR:
            continue
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
        })

    grupos: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for definicao in definicoes:
        grupos[(definicao["jurisdicao"], chave_termo(definicao["termo"]))].append(definicao)

    saida = []
    ids = set()
    for (jurisdicao, chave), itens in grupos.items():
        termos = list(dict.fromkeys(item["termo"] for item in itens))
        titulo = " · ".join(termos)
        base_id = id_seguro(f"{jurisdicao}-{chave}")
        verbete_id = base_id
        contador = 2
        while verbete_id in ids:
            verbete_id = f"{base_id}-{contador}"
            contador += 1
        ids.add(verbete_id)
        saida.append({
            "id": verbete_id,
            "titulo": titulo,
            "termos": termos,
            "busca": termos + ({"rede social": ["redes sociais"]}.get(chave, [])),
            "letra": sem_acentos(termos[0])[0].upper(),
            "tema": tema_de(termos),
            "jurisdicao": jurisdicao,
            "definicoes": itens,
        })

    saida.sort(key=lambda item: (sem_acentos(item["titulo"]), item["jurisdicao"]))
    cabecalho = (
        "# GERADO POR scripts/gerar_definicoes.py. NÃO EDITE À MÃO.\n"
        "# A literalidade vem de _leis/; equivalências e temas ficam no script.\n"
    )
    SAIDA.write_text(cabecalho + yaml.safe_dump(saida, allow_unicode=True, sort_keys=False, width=1000))
    print(f"{len(definicoes)} definições em {len(saida)} verbetes: {SAIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
