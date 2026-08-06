"""Monta `_leis/gdpr.md` a partir dos dois HTML oficiais do RGPD no EUR-Lex.

Nenhum dos dois basta sozinho:

- o **Jornal Oficial** de 4.5.2016 (CELEX 32016R0679) traz o ato como
  publicado — preâmbulo e os 173 considerandos —, mas com o articulado
  anterior às duas retificações;
- o **texto consolidado** (CELEX 02016R0679-20160504) traz o articulado em
  vigor, com as retificações incorporadas, mas **sem preâmbulo nem
  considerandos**: o próprio EUR-Lex avisa que "as versões dos atos
  relevantes que fazem fé, incluindo os respetivos preâmbulos, são as
  publicadas no Jornal Oficial".

Este script converte os dois por `converter_eurlex.py` e junta o que cada um
tem de melhor: cabeçalho, preâmbulo e considerandos do Jornal Oficial;
articulado (CAPÍTULO I em diante) do consolidado. Nada é redigitado, e a única
alteração de texto é a **retificação do considerando 71** — a única que atinge
os considerandos, e que por isso não vem no consolidado. Ela é aplicada com o
texto da própria retificação, e o script aborta se o trecho a substituir não
existir.

Uso:
    python3 scripts/montar_rgpd.py <jo.html> <consolidado.html>

Os dois arquivos são o "Texto integral" e o "Texto consolidado" em português
baixados do EUR-Lex. Dependências de autoria, como no conversor:

    pip install beautifulsoup4 lxml
"""
from __future__ import annotations

import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

from converter_eurlex import converter  # noqa: E402

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "_leis/gdpr.md"

FRENTE = """---
titulo: Regulamento (UE) 2016/679, de 27 de abril de 2016
apelido: RGPD (GDPR)
fonte: https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:02016R0679-20160504
formato: ue
compilado_ate: Retificações publicadas no JO L 127, de 23/5/2018, e no JO L 74, de 4/3/2021
# NÃO EDITE ESTE ARQUIVO À MÃO. Ele é gerado por scripts/montar_rgpd.py.
#
# Texto oficial em português, em duas metades que o EUR-Lex publica separadas:
# o cabeçalho, o preâmbulo e os 173 considerandos vêm do Jornal Oficial de
# 4/5/2016 (CELEX 32016R0679); o articulado, do texto consolidado oficial
# (CELEX 02016R0679-20160504), que é o que traz as duas retificações — entre
# elas a do art. 3.º, n.º 2 ("titulares que se encontrem no território da
# União") e a da definição de consentimento do art. 4.º, ponto 11
# ("inequívoca", e não "explícita"). A consolidação do EUR-Lex não inclui os
# considerandos; a única retificação que atinge um deles (o considerando 71) é
# aplicada pelo script, com o texto da própria retificação.
#
# O RGPD não tem anexos, e até aqui não foi alterado por ato posterior: o
# Regulamento (UE) 2025/2518 acrescenta normas processuais sem mexer no
# articulado, e está no painel como norma própria.
---
"""

# Retificação publicada no JO L 127, de 23/5/2018, p. 2 — considerando 71,
# quinto e sexto períodos. É a única que atinge os considerandos, e por isso a
# única que a consolidação do EUR-Lex não resolve.
RETIFICACAO_71 = [
    ("e de forma a prevenir, por exemplo, efeitos discriminatórios",
     "e evitar, por exemplo, efeitos discriminatórios"),
    ("ou a impedir que as medidas venham a ter tais efeitos.",
     "ou que o tratamento dos dados resulte em medidas que venham a ter tais efeitos."),
]


def blocos(texto: str) -> list[str]:
    return [b.strip() for b in re.split(r"\n\s*\n", texto) if b.strip()]


def parte(texto: str, ate_capitulo: bool) -> list[str]:
    """Divide a conversão no primeiro "## CAPÍTULO I": antes está o preâmbulo
    com os considerandos, depois o articulado."""
    todos = blocos(texto)
    corte = next(i for i, b in enumerate(todos) if b.startswith("## CAPÍTULO I"))
    return todos[:corte] if ate_capitulo else todos[corte:]


def main(jo: pathlib.Path, consolidado: pathlib.Path) -> None:
    preambulo = parte(converter(jo), ate_capitulo=True)
    articulado = parte(converter(consolidado), ate_capitulo=False)

    considerandos = [i for i, b in enumerate(preambulo) if b.startswith("(71) ")]
    assert len(considerandos) == 1, "considerando 71 não encontrado no preâmbulo"
    c71 = preambulo[considerandos[0]]
    for antigo, novo in RETIFICACAO_71:
        assert c71.count(antigo) == 1, f"retificação do considerando 71: {antigo!r}"
        c71 = c71.replace(antigo, novo)
    preambulo[considerandos[0]] = c71

    texto = "\n\n".join(preambulo + articulado) + "\n"
    DESTINO.write_text(FRENTE + texto, encoding="utf-8")

    artigos = re.findall(r"(?m)^Artigo (\d+)\.º —", texto)
    assert [int(a) for a in artigos] == list(range(1, 100)), "faltam artigos, ou fora de ordem"
    assert len(re.findall(r"(?m)^\(\d+\) ", texto)) == 173, "faltam considerandos"
    assert not re.search(r"(?m)^\d{1,3}\. ", texto), "número sem escape (viraria lista)"
    assert "▼" not in texto and "►" not in texto, "marca de alteração da consolidação no texto"
    print(f"{DESTINO.relative_to(RAIZ)}: {len(artigos)} artigos, "
          f"{len(blocos(texto))} blocos")


if __name__ == "__main__":
    main(pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]))
