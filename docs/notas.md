# Notas de legislação (`/notas`)

Referência técnica da seção de notas: como ela é montada, que arquivos a
compõem, como os dispositivos ganham âncora e que scripts existem para não
fazer nada disso à mão.

> **As regras editoriais da seção estão no
> [`AGENTS.md`](../AGENTS.md#notas-de-legislação-regras-editoriais) e são não
> negociáveis.** Leia-as antes de escrever ou revisar qualquer comentário —
> este documento cuida só da mecânica.

## Índice

- [O que é a seção, e por que é isolada](#o-que-é-a-seção-e-por-que-é-isolada)
- [Anatomia](#anatomia)
- [Publicar uma nota nova](#publicar-uma-nota-nova)
- [Front matter](#front-matter)
- [Múltiplas normas por nota](#múltiplas-normas-por-nota)
- [Referências clicáveis](#referências-clicáveis)
- [Normas estrangeiras (`formato: ue`)](#normas-estrangeiras-formato-ue)
- [Trazendo uma norma do EUR-Lex](#trazendo-uma-norma-do-eur-lex)
- [Ancorando referências automaticamente](#ancorando-referências-automaticamente)
- [Scripts de autoria](#scripts-de-autoria)

## O que é a seção, e por que é isolada

Seção de estudo sobre legislação (LGPD, Marco Civil, ECA Digital, o Regimento
Interno da ANPD e as normas europeias GDPR e AI Act), pública e indexável. Nem
toda norma comentada é lei em sentido estrito — o Regimento Interno é ato do
Conselho Diretor da ANPD, aprovado por portaria —, mas a estrutura é sempre a
mesma: comentários de um lado, texto da norma do outro, cada painel com rolagem
independente. Em telas estreitas viram abas ("Comentários" / "Lei seca").

A seção é **isolada do restante do site**: `_layouts/nota.html` não usa o
`default.html`, o `script.js` nem o `_data/pages.yml`, e o CSS
(`_includes/nota-style.css`) e o JS (`notas.js`) são próprios. Uma mudança nas
notas não pode afetar as quatro páginas de apresentação, e vice-versa.

É uma seção **só em pt-br** — exceção consciente à regra de replicação em
en-us, que continua valendo para as páginas de apresentação (ver
[`AGENTS.md`](../AGENTS.md#idiomas-pt-br-e-en-us)).

## Anatomia

| Arquivo | Papel |
| --- | --- |
| `notas.md` | A página índice (`/notas`). Corpo vazio: só front matter |
| `_layouts/notas-index.html` | Monta o índice a partir de `site.notas \| sort: "title"` |
| `_includes/notas-index-head.html` | `<head>` do índice |
| `_notas/<slug>.md` | Os comentários — é o que vira página, em `/notas/<slug>` |
| `_leis/<slug>.md` | O texto legal em Markdown puro. `output: false`: nunca vira página |
| `_fragmentos/<slug>.html` | Fragmento de uma norma extra, buscado via `fetch()` |
| `_layouts/nota.html` | Monta os dois painéis |
| `_includes/lei-anotada.html` | Renderiza o texto legal dando um id a cada dispositivo |
| `_includes/nota-head.html` | `<head>` das notas (canonical, OG, JSON-LD `Article`) |
| `_includes/nota-aviso.html` | Aviso de IA + isenção institucional, em toda nota |
| `_includes/nota-style.css` | CSS da seção — inline, isolado do `style.css` |
| `notas.js` | Painéis, seletor de normas, referências clicáveis e busca |
| `_data/normas.yml` | Registro de aliases das normas, para `ancorar_referencias.py` |

**A página índice se atualiza sozinha.** A lista vem de `site.notas`, então
publicar ou remover uma nota não pede edição nenhuma em `notas.md` nem em
`_layouts/notas-index.html`. O `sitemap.xml` também se ajusta sozinho.

## Publicar uma nota nova

1. **`_leis/<slug>.md`** — o texto legal em Markdown puro, sem âncoras nem
   classes, com o [front matter](#front-matter) preenchido. Se for norma
   europeia, converta com
   [`converter_eurlex.py`](#trazendo-uma-norma-do-eur-lex) em vez de digitar.
2. **`_notas/<slug>.md`** — os comentários, com `lei: <slug>` apontando para o
   arquivo acima.
3. **`_fragmentos/<slug>.html`** — **só** para cada norma listada em
   `normas_extra`. Replique
   [`_fragmentos/decreto-12880.html`](../_fragmentos/decreto-12880.html)
   trocando o slug; não crie uma página solta fora de coleção (ver
   [Múltiplas normas por nota](#múltiplas-normas-por-nota)).
4. **`_data/normas.yml`** — uma entrada por norma (principal e extras), com
   `nota`, `prefixo` e `aliases`. É o que permite ao
   [script de ancoragem](#ancorando-referências-automaticamente) reconhecer
   citações a ela em texto corrido.

O índice `/notas`, os links entre notas e o `sitemap.xml` se ajustam sozinhos
no build. Excluir uma nota é apagar os arquivos correspondentes.

## Front matter

**`_notas/<slug>.md`:**

| Campo | Obrigatório | Descrição |
| --- | --- | --- |
| `layout` | sim | Sempre `nota` |
| `permalink` | sim | `/notas/<slug>` |
| `title`, `description` | sim | Usados no `<head>`, no índice e no JSON-LD |
| `lei` | sim | Slug da norma principal, pré-carregada no HTML |
| `normas_extra` | não | Lista de slugs de `_leis/` com normas adicionais |
| `atualizado_em` | sim | Data da última atualização de conteúdo (ver [`AGENTS.md`](../AGENTS.md#notas-de-legislação-regras-editoriais)) |

**`_leis/<slug>.md`:**

| Campo | Obrigatório | Descrição |
| --- | --- | --- |
| `titulo` | sim | Título formal da norma |
| `apelido` | sim | Nome curto, exibido no seletor de normas |
| `fonte` | sim | URL do texto oficial |
| `compilado_ate` | não | Até que alteração o texto está compilado |
| `formato` | não | `br` (padrão) ou `ue` — ver [Normas estrangeiras](#normas-estrangeiras-formato-ue) |
| `tipo` | só em norma extra | Espécie normativa. Em uso hoje: `decreto`, `regulamento`, `portaria`. Vocabulário aberto — acrescente o que a norma for (`resolucao`, `lei`, `instrucao-normativa`…). É documental: não altera o comportamento, mas evita ambiguidade se o rótulo do link de fonte vier a depender da espécie |
| `prefixo` | só em norma extra | Namespace curto e estável dos ids dessa norma |

**O texto da lei não se altera.** Os arquivos gerados por script trazem
"NÃO EDITE ESTE ARQUIVO À MÃO" no front matter — respeite.

## Múltiplas normas por nota

Uma nota pode exibir, no painel "Lei seca", mais de um texto legal — por
exemplo a lei e um decreto que a regulamenta. A norma indicada em `lei` é a
principal: fica pré-carregada no HTML, sem prefixo de id, exatamente como antes
desse recurso existir (as âncoras já publicadas, tipo `#art-5-v`, não mudam).
Normas adicionais entram em `normas_extra`, e o arquivo delas em `_leis/`
precisa de `tipo` e `prefixo` no front matter. O prefixo vira `dec12880-art-5`,
`lei-dec12880-capitulo-i-…` etc. — `lei-anotada.html` o recebe como parâmetro
opcional.

Uma norma extra **não é pré-carregada**: é buscada via `fetch()` só quando o
leitor a seleciona no seletor de normas (ou ao abrir um link com âncora
prefixada, tipo `/notas/eca-digital#dec12880-art-24`), e o resultado fica em
cache na aba enquanto ela estiver aberta. Isso significa que **o seletor de
normas e a navegação para uma norma extra exigem JavaScript** — exceção
consciente à regra geral de "funciona sem JS" das notas, decidida para não
pré-carregar normas que ainda vão se multiplicar (resoluções da ANPD, outros
decretos do MCI). Sem JavaScript, o seletor fica oculto e só a norma principal
aparece.

A norma extra é servida por um HTML solto em `_fragmentos/<slug>.html` (coleção
`fragmentos`, ver `_config.yml`), sem link algum apontando para ele, fora do
sitemap (`sitemap: false`) e bloqueado em `robots.txt`
(`/notas/fragmentos/`) — não é uma página para navegação humana. Ele só chama
`lei-anotada.html` com o `prefixo` da norma:

```liquid
{%- assign norma = site.leis | where: 'slug', 'decreto-12880' | first -%}
{%- include lei-anotada.html lei=norma prefixo=norma.prefixo -%}
```

**Por que uma coleção própria, e por que ela vem antes de `leis` no
`_config.yml`:** o Jekyll renderiza as coleções na ordem declarada em
`_config.yml`, e renderizar uma coleção reescreve o `.content` de cada
documento dela para o HTML já convertido (mesmo com `output: false`). Se o
fragmento fosse uma página solta (fora de qualquer coleção), ele seria
renderizado *depois* de todas as coleções — inclusive depois de `leis` — e
receberia o `.content` da norma já convertido pelo Kramdown padrão, sem as
âncoras por dispositivo. Colocar o fragmento numa coleção (`fragmentos`)
declarada *antes* de `leis` garante que ele lê o Markdown ainda cru, do mesmo
jeito que `_notas/*.md` já fazia.

## Referências clicáveis

Os comentários apontam para o texto legal com links Markdown comuns, cujo
destino segue um esquema previsível gerado por `lei-anotada.html`. O include
percorre o texto bloco a bloco, dá a cada dispositivo um id, rebaixa os títulos
em um nível e prefixa os ids deles com `lei-` para não colidirem com os do
comentário. Assim os arquivos `.md` continuam limpos.

| Dispositivo | id |
| --- | --- |
| Art. 5º | `art-5` |
| Art. 55-A | `art-55-a` |
| § 2º do art. 3º | `art-3-p2` |
| Parágrafo único do art. 1º | `art-1-pu` |
| Inciso V do art. 5º | `art-5-v` |
| Inciso I do § 1º do art. 52 | `art-52-p1-i` |
| Alínea "b" do inciso II do art. 4º | `art-4-ii-b` |

Escreva `([art. 5º, inciso V](#art-5-v))` preservando o texto visível da
citação. O clique é interceptado pelo `notas.js`, que rola o painel da lei,
destaca o dispositivo e leva o foco até ele. **Sem JavaScript nada quebra**: as
âncoras existem no HTML e o navegador faz o salto sozinho, com o realce vindo do
`:target`. Não introduza referências que dependam de JS.

**Confira toda remissão nova contra o texto legal antes de publicar**: link
errado numa página pública de legislação é um defeito, não um detalhe.

### Dois casos que ficam deliberadamente sem âncora

A âncora deve levar sempre ao texto **desta** lei e **em vigor**. Por isso não
recebem id:

- **Dispositivos citados dentro de blocos de citação** — as alterações que a
  lei promove em *outras* leis, como no art. 60 da LGPD.
- **Redação superada**, marcada com tachado (`~~…~~`) no texto compilado. É
  também o que evita id duplicado quando o mesmo artigo aparece duas vezes, a
  redação antiga e a nova, como no art. 41-A do ECA Digital. Se um dispositivo
  só existe em redação tachada, ele não tem âncora e não deve ser linkado: é o
  caso dos artigos que vieram de medida provisória rejeitada, como a MPV nº
  1.068/2021 no Marco Civil (arts. 8º-A a 8º-D, 28-A e os incisos IX e X do
  art. 5º), e do art. 36-A do ECA Digital, com vigência encerrada.

### Três cuidados que já custaram tempo

- **`#art-…` sem prefixo é sempre a norma principal (`lei`) daquela nota.** Uma
  nota pode comentar decretos, resoluções e outras leis citadas só em texto
  puro — nesses casos o número do artigo colide: "Decreto nº 12.880/2026, art.
  24" não é o art. 24 do ECA Digital, e não deve virar link para `#art-24`.
  Isso só deixa de valer para uma norma listada em `normas_extra`: ela tem
  prefixo próprio (ex. `dec12880-art-24`) e pode ser linkada com segurança.
- **Dispositivo revogado**: a remissão a ele nos comentários aponta para o
  texto **original** (`#original-art-10-p5`), não para a consolidação, que por
  definição não o tem.
- **Entre notas, use o caminho da página**:
  `[art. 6º da LGPD](/notas/lgpd#art-6)` abre a outra nota já posicionada no
  dispositivo.

## Normas estrangeiras (`formato: ue`)

Uma norma da União Europeia marca o dispositivo de outro jeito, e o arquivo em
`_leis/` sinaliza isso com `formato: ue` no front matter (o padrão, `br`, não
precisa ser escrito). **O esquema de ids não muda** — muda só o que o include
reconhece como dispositivo, de modo que os links dos comentários e o campo "Ir
para" valem igual nos dois formatos:

| Dispositivo | id |
| --- | --- |
| Artigo 5.º | `art-5` |
| Artigo 6.º-A | `art-6-a` |
| n.º 1 do artigo 5.º (o "1." do texto) | `art-5-p1` |
| alínea "a" do n.º 1 do artigo 5.º | `art-5-p1-a` |
| alínea "a" de artigo sem números | `art-1-a` |

Não há inciso romano entre o número e a alínea: a alínea se pendura no número
corrente ou, na falta dele, no próprio artigo. **Subalíneas ficam de fora** —
"ii)" e seguintes não recebem âncora, e "i)" é indistinguível da alínea "i)" de
uma lista longa, então remissão a subalínea se confere no texto ou fica sem
link. O mesmo vale para os considerandos, que não são dispositivos e não são
ancorados.

Dispositivo acrescentado por ato alterador leva o sufixo **colado** no id: o
n.º 1-A é `art-5-p1a`, a alínea b-A) é `art-5-p1-ba`. Colado, e não com hífen,
porque `art-5-p1-a` já é a alínea a) do n.º 1.

Três cuidados próprios desse formato:

- **O ponto do número vem escapado** no arquivo de `_leis` (`1\. Texto`). Sem
  isso o Kramdown lê "1. Texto" como lista ordenada: o dispositivo vira `<ol>`
  em vez de `<p>` (perdendo a âncora, que é posta no primeiro `<p>`) e cada
  bloco reinicia a numeração em 1. A barra não aparece na renderização.
- **Anexo zera o artigo corrente.** Os itens de um anexo são "1.", "a)" como os
  de um artigo, mas não pertencem a nenhum — sem zerar, o "1." do Anexo III
  herdaria o último artigo e viraria `art-113-p1`. Conteúdo de anexo não é
  ancorado.
- **Id repetido não vira âncora.** O mesmo número pode ter duas listas de
  alíneas independentes (o art. 43.º, n.º 1, do AI Act tem duas a)/b)); a
  segunda entra sem âncora.

`scripts/ancorar_referencias.py` acompanha o formato ao calcular os ids
válidos, mas continua reconhecendo *citações* na praxe brasileira: uma citação
europeia com sufixo ("art. 5.º, n.º 1") cai no artigo seco em vez do número —
link menos preciso, nunca errado.

## Trazendo uma norma do EUR-Lex

`scripts/converter_eurlex.py` converte o HTML oficial do EUR-Lex para o
Markdown de `_leis`, já nesse dialeto — ver o docstring do script para o uso.

O EUR-Lex publica o mesmo ato em **duas marcações diferentes**, e o script lê as
duas: a do **Jornal Oficial** (classes `oj-*`), que traz o ato como publicado, e
a do **texto consolidado** (folha `clg.css`), que traz o articulado em vigor.
`normalizar_consolidado()` reescreve a segunda na primeira, para o resto do
script não precisar saber de qual das duas veio o arquivo. Vale saber a
diferença antes de escolher:

- o texto do Jornal Oficial **não** tem as retificações posteriores. No RGPD
  isso mudaria o alcance do art. 3.º, n.º 2, e a própria definição de
  consentimento do art. 4.º, ponto 11;
- o texto consolidado **não** tem preâmbulo nem considerandos — a própria
  página avisa que "as versões dos atos relevantes que fazem fé, incluindo os
  respetivos preâmbulos, são as publicadas no Jornal Oficial";
- quando as duas coisas são necessárias, converta os dois arquivos e junte-os
  por script, como faz `scripts/montar_rgpd.py` (considerandos do JO +
  articulado consolidado, com a única retificação que atinge um considerando
  aplicada a partir do texto da própria retificação). O arquivo gerado leva
  "NÃO EDITE ESTE ARQUIVO À MÃO" no front matter, e as duas fontes ficam
  registradas nele.

O ato entra **inteiro**: preâmbulo, considerandos, articulado e anexos. Os
considerandos não são dispositivos e não recebem âncora, mas ficam no painel —
num regulamento europeu são eles que dizem por que cada regra existe, e a
Comissão e o Tribunal de Justiça os usam para interpretar o articulado. Fica de
fora só o aparato de notas de rodapé do JO, que é referência bibliográfica, e —
num texto consolidado — as **marcas de alteração** (▼B, ▼C1, ►C1 … ◄), que são
aparato editorial da consolidação e não texto normativo.

### Quando não existe versão consolidada

Quando a União Europeia **ainda não publicou a versão consolidada** de uma
norma alterada — é o caso do AI Act com o Digital Omnibus —, publique **os dois
textos oficiais** no painel, e diga isso ao leitor na própria nota. O texto de
uma norma alteradora é quase todo citação, e citação não recebe âncora.

Uma consolidação pode ser oferecida ao lado deles, e é o que `/notas/ai-act`
faz, sob três condições que não se negociam:

- **gerada por script, nunca à mão** — `scripts/consolidar_ai_act.py` endereça
  cada alteração e copia o texto novo do próprio arquivo do ato alterador;
  nenhuma palavra é redigitada, e o script aborta se um dispositivo alvo sumir.
  O arquivo gerado leva "NÃO EDITE ESTE ARQUIVO À MÃO" no front matter;
- **rotulada como não oficial** no `apelido`, no front matter e na nota, com o
  aviso de que prevalece o Jornal Oficial em caso de divergência;
- **acompanhada dos textos oficiais** no mesmo painel, para conferência.

## Ancorando referências automaticamente

`scripts/ancorar_referencias.py` varre um comentário em busca de menções, em
texto puro, a uma norma que já existe em `/notas` (a própria lei da nota, uma
`normas_extra` dela, ou a lei principal de outra nota) e as transforma nesses
links — sem gastar token de LLM nisso a cada nova norma publicada ou comentário
editado. Ele reconhece a norma por um registro de aliases em `_data/normas.yml`
(adicione uma entrada lá para cada norma nova) e só cria o link se o id de
destino realmente existir no texto legal correspondente — recalculado a partir
de `_leis/<norma>.md` com a mesma regra de `lei-anotada.html` (ids inválidos não
geram link partido).

```bash
python3 scripts/ancorar_referencias.py --check eca-digital lgpd mci   # mostra o diff, não grava
python3 scripts/ancorar_referencias.py --apply eca-digital            # grava
python3 scripts/ancorar_referencias.py --validar lgpd mci             # mede fidelidade contra os links já existentes
```

**Por padrão, o script só cria link quando a norma está nomeada perto da
citação** (antes: "Decreto nº 12.880/2026, art. 24"; ou depois: "art. 6º da
LGPD"). Citações "nuas" (só "art. 24", sem norma por perto) não são ligadas por
padrão — use `--incluir-padrao` para isso, com **revisão redobrada do diff**:
essa opção assume que uma citação nua é da norma principal da própria nota, o
que já se mostrou errado em parágrafos que nomeiam a norma numa frase e a
omitem nas seguintes (o script não rastreia contexto entre linhas). É por isso
que `--validar` mede a fidelidade contra o LGPD e o Marco Civil (que já têm
essas citações nuas manualmente linkadas) sempre com `--incluir-padrao` ligado
— é o que está sendo calibrado — mas o `--apply` do dia a dia deve continuar no
modo padrão, que é o que gerou os links do Decreto nº 12.880/2026.

Limitações conhecidas, por design (documentadas com mais detalhe no docstring
do script): citações compostas com mais de um sufixo em formatos incomuns (ex.:
uma faixa de parágrafos "§§ 2º a 4º"), ou que misturam faixa e lista de
artigos, ficam de fora — o script prefere não linkar a linkar para o
dispositivo errado.

## Scripts de autoria

Os quatro scripts de `scripts/` são **ferramentas de autoria**: rodam na sua
máquina, não entram no site e não fazem parte do build. As dependências estão
em [`scripts/requirements.txt`](../scripts/requirements.txt); para instalá-las,
veja [Rodar localmente](../README.md#scripts-de-autoria) no `README.md`.

| Script | O que faz |
| --- | --- |
| `converter_eurlex.py` | Converte o HTML oficial do EUR-Lex para o Markdown de `_leis`, no dialeto `formato: ue` |
| `montar_rgpd.py` | Monta `_leis/gdpr.md` juntando os considerandos do Jornal Oficial ao articulado consolidado |
| `consolidar_ai_act.py` | Gera a consolidação não oficial do AI Act aplicando as alterações do Digital Omnibus |
| `ancorar_referencias.py` | Transforma citações em texto puro nos links âncora corretos |
