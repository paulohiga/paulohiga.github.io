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
- [Modo leitura](#modo-leitura)
- [Ementas dos artigos](#ementas-dos-artigos)
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
independente. Em telas estreitas viram abas ("Comentários" / "Lei seca"); em
telas largas, um deles pode ocupar a tela inteira (ver
[Modo leitura](#modo-leitura)).

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
| `_layouts/notas-index.html` | Monta o índice a partir de `site.notas`, ordenado por `ordem` e agrupado por `jurisdicao` |
| `_includes/notas-index-head.html` | `<head>` do índice |
| `_notas/<slug>.md` | Os comentários — é o que vira página, em `/notas/<slug>` |
| `_leis/<slug>.md` | O texto legal em Markdown puro. `output: false`: nunca vira página |
| `_fragmentos/<slug>.html` | Fragmento da norma, buscado via `fetch()`. Um por norma de `_leis` |
| `_layouts/nota.html` | Monta os dois painéis |
| `_includes/lei-anotada.html` | Renderiza o texto legal dando um id a cada dispositivo |
| `_includes/nota-head.html` | `<head>` das notas (canonical, OG, JSON-LD `Article`) |
| `_includes/nota-aviso.html` | Aviso de IA + isenção institucional, em toda nota |
| `_includes/painel-leitura.html` | Botão de [modo leitura](#modo-leitura) da barra de título de cada painel |
| `_includes/nota-style.css` | CSS da seção — inline, isolado do `style.css` |
| `notas.js` | Painéis, [modo leitura](#modo-leitura), seletor de normas, sumários, referências clicáveis e busca |
| `_data/normas.yml` | Registro de aliases das normas, para `ancorar_referencias.py` |
| `_data/ementas/<slug>.yml` | A [ementa](#ementas-dos-artigos) de cada artigo, rótulo do artigo no sumário da lei seca |

**A página índice se atualiza sozinha.** A lista vem de `site.notas`, então
publicar ou remover uma nota não pede edição nenhuma em `notas.md` nem em
`_layouts/notas-index.html` — inclusive o grupo em que ela aparece, que sai do
`jurisdicao` do próprio front matter. O `sitemap.xml` também se ajusta sozinho.

## Publicar uma nota nova

1. **`_leis/<slug>.md`** — o texto legal em Markdown puro, sem âncoras nem
   classes, com o [front matter](#front-matter) preenchido. Se for norma
   europeia, converta com
   [`converter_eurlex.py`](#trazendo-uma-norma-do-eur-lex) em vez de digitar.
2. **`_notas/<slug>.md`** — os comentários, com `lei: <slug>` apontando para o
   arquivo acima. É aqui que entram `ordem` e `jurisdicao`, que decidem onde a
   nota aparece no índice — sem `ordem` ela cai no fim da lista.
3. **`_fragmentos/<slug>.html`** — um por norma de `_leis`, inclusive a
   principal desta nota: é assim que ela pode ser aberta ao lado dos
   comentários de outra. Replique
   [`_fragmentos/decreto-12880.html`](../_fragmentos/decreto-12880.html)
   trocando o slug; não crie uma página solta fora de coleção (ver
   [Múltiplas normas por nota](#múltiplas-normas-por-nota)).
4. **`_data/normas.yml`** — uma entrada por norma (principal e extras), com
   `nota`, `prefixo` e `aliases`. É o que permite ao
   [script de ancoragem](#ancorando-referências-automaticamente) reconhecer
   citações a ela em texto corrido.
5. **`_data/ementas/<slug>.yml`** — uma [ementa](#ementas-dos-artigos) por
   artigo, também uma entrada por norma. Confira com
   `python3 scripts/conferir_ementas.py <slug>`.

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
| `ordem` | sim | Posição da nota no índice `/notas`, por relevância editorial (não alfabética). Sem ela a nota vai para o fim da lista |
| `jurisdicao` | sim | Grupo do índice. O valor é o rótulo exibido — hoje `Brasil` e `União Europeia`. Um grupo novo é só um valor novo; o layout não precisa saber dele |
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
| `prefixo` | sim | Namespace curto e estável dos ids dessa norma quando ela é exibida numa nota que não é a dela. Toda norma precisa do seu, porque o seletor do painel dá acesso a todas — mas a norma **principal** de cada nota continua renderizada sem prefixo na página dela, e é por isso que as âncoras publicadas (`#art-5-v`) não mudam |

**O texto da lei não se altera.** Os arquivos gerados por script trazem
"NÃO EDITE ESTE ARQUIVO À MÃO" no front matter — respeite.

## Múltiplas normas por nota

Uma nota pode exibir, no painel "Lei seca", mais de um texto legal — por
exemplo a lei e um decreto que a regulamenta. A norma indicada em `lei` é a
principal: fica pré-carregada no HTML, sem prefixo de id, exatamente como antes
desse recurso existir (as âncoras já publicadas, tipo `#art-5-v`, não mudam).

O seletor do painel tem **dois grupos**. O primeiro é o das normas *desta* nota:
a principal e as de `normas_extra`. O segundo é o de **todas as outras normas de
`_leis`** — ler a LGPD ao lado dos comentários do Marco Civil é legítimo, porque
as normas da seção se citam o tempo todo, e não havia por que a única forma de
chegar a um texto ser abrir a nota dele. Os dois grupos funcionam igual: a norma
é buscada e exibida ali mesmo, sem sair da página.

O que `normas_extra` decide, então, não é mais *se* uma norma pode ser exibida,
e sim **em que grupo do seletor ela aparece** — isto é, quais normas a nota
declara como suas. Ela também continua decidindo o que o `ancorar_referencias.py`
pode transformar em link nos comentários daquela nota (ver
[`_data/normas.yml`](#ancorando-referências-automaticamente)).

Por isso **toda norma de `_leis` precisa de `prefixo` no front matter**, e não
só as extras: o prefixo vira `dec12880-art-5`, `rgpd-art-17`,
`lei-dec12880-capitulo-i-…` etc., e é ele que evita a colisão de ids quando uma
norma é exibida numa nota que não é a dela. `lei-anotada.html` o recebe como
parâmetro opcional, e a norma principal de cada nota continua sendo renderizada
**sem** ele.

Norma que não é a principal **não é pré-carregada**: é buscada via `fetch()` só
quando o leitor a seleciona (ou ao abrir um link com âncora prefixada, tipo
`/notas/eca-digital#dec12880-art-24`), e o resultado fica em cache na aba
enquanto ela estiver aberta. Isso significa que **o seletor de normas e a
navegação para qualquer norma que não a principal exigem JavaScript** — exceção
consciente à regra geral de "funciona sem JS" das notas, decidida para não
pré-carregar 13 textos legais em toda página. Sem JavaScript o seletor fica
oculto e o lugar dele, na barra de título do painel, é ocupado por um `<h2>` com
o nome da norma principal, que é a única exibida.

**O prefixo sozinho é uma âncora válida**: `/notas/mci#dec8771` abre a nota já
exibindo o Decreto nº 8.771, sem apontar para dispositivo nenhum. É o que o
seletor grava na URL quando o leitor troca de norma, para a escolha poder ser
compartilhada e sobreviver a um recarregamento — a norma principal é o padrão e
não leva marca. Um link escrito à mão pode usar a mesma forma quando o destino
é a norma inteira, e não um artigo dela. A troca de norma também guarda,
enquanto a aba estiver aberta, onde o leitor parou em cada norma, e devolve-o
ao mesmo ponto quando ele volta.

Cada norma é servida por um HTML solto em `_fragmentos/<slug>.html` (coleção
`fragmentos`, ver `_config.yml`), sem link algum apontando para ele, fora do
sitemap (`sitemap: false`) e bloqueado em `robots.txt`
(`/notas/fragmentos/`) — não é uma página para navegação humana. **Toda norma
de `_leis` tem o seu**, inclusive a que é principal de alguma nota: é assim que
ela pode ser aberta ao lado dos comentários de outra. O fragmento só chama
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

## Modo leitura

A tela dividida existe para conferir o comentário contra o dispositivo. Só
**ler** é outra coisa, e para isso metade de 1440px é uma coluna estreita. O
botão no canto da barra de título de cada painel expande aquele painel para a
tela inteira; o mesmo botão volta à divisão.

Três coisas mudam ao entrar:

- **O outro painel e o divisor sumem.** O painel que fica ocupa a largura toda.
- **A coluna de texto tem teto**, e o corpo do tipo cresce. Um parágrafo de
  ponta a ponta em 1440px não se lê, e alargar a coluna sem mexer no tipo só
  alongaria a linha em número de caracteres — que é o que de fato cansa. Com o
  tipo maior a linha fica mais larga em pixels e mais curta em caracteres: na
  lei seca, de ~116 caracteres por linha na tela dividida para ~94.
- **O sumário deixa de ser gaveta e vira coluna** fixa ao lado do texto, aberta,
  e na lei seca com os artigos à mostra. Com o painel inteiro à disposição,
  esconder o mapa da norma atrás de um botão passa a ser desperdício. A coluna
  não fecha ao clicar fora nem com `Esc`, que são gestos de dispensar
  sobreposição; fecha pelo X, e o botão da borda volta para reabri-la.

**É de tela larga.** Abaixo de 900px as abas já mostram um painel por vez, e a
coluna do sumário não caberia: o botão some, e estreitar a janela com o modo
ligado o desliga. Sem JavaScript o botão também some.

O estado dura a sessão (`sessionStorage`), como a proporção da tela dividida, e
vale para as outras notas abertas na mesma aba. Quem o aplica é um **script
inline no layout**, não o `notas.js`: este é `defer`, e aplicar o modo depois do
primeiro paint faria a tela dividida saltar para a coluna única já desenhada. A
grade reserva a coluna do sumário desde o início, então o texto nasce na largura
final mesmo antes de a lista ser montada.

Uma exceção que vale conhecer: **seguir uma remissão do comentário devolve a
tela dividida**. Ir do comentário ao dispositivo é justamente o que a divisão
existe para fazer, e o painel de destino está escondido — o salto seria para um
`display: none`.

## Ementas dos artigos

No sumário do painel "Lei seca", cada artigo aparece como o marcador mais uma
frase curta que diz do que ele trata — a **ementa**. Ela mora em
`_data/ementas/<slug>.yml`, um arquivo por norma, com uma linha por artigo:

```yaml
art-4: Fundamentos do uso de tecnologia por crianças
art-5: Deveres de prevenção, proteção e segurança
```

A chave é o id do artigo **sem prefixo de norma** (`art-55-a`, e não
`dec12880-art-5`): o arquivo já é o de uma norma só, e o prefixo existe para
separar normas dentro de uma página. `lei-anotada.html` faz a busca e entrega o
resultado num `data-ementa` no `<p>` do artigo, de onde o `notas.js` o lê ao
montar o sumário. Artigo sem ementa cadastrada não quebra nada: o sumário volta
a mostrar o começo do caput, que era o comportamento anterior.

**A ementa é rótulo de navegação, não texto legal.** Ela não aparece no painel
da norma, não entra em `_leis/` e não vira âncora — o texto da norma continua
intacto, e é por isso que ela fica em arquivo separado.

Três regras de escrita, todas a serviço de varrer a lista com o olho:

- **O núcleo primeiro.** As primeiras palavras são as que o olho lê ao descer a
  lista, e é nelas que tem de estar o assunto do artigo. O art. 4º do ECA
  Digital abre com "A utilização de produtos ou serviços de tecnologia da
  informação por crianças e adolescentes tem como fundamentos:" — nove palavras
  de fórmula antes do assunto. A ementa é "Fundamentos do uso de tecnologia por
  crianças".
- **Até 52 caracteres.** É o que cabe em duas linhas do item, medido no
  navegador, contando que o marcador ("Art. 55-A ") já ocupa a primeira. Frase
  maior é cortada com reticências, e o filtro do sumário não casa com o que
  ficou de fora. `conferir_ementas.py` reclama do que passar disso.
- **Sem verbo conjugado, sem ponto final.** É rótulo, não resumo — "Sanções por
  violação da guarda e do sigilo", não "Este artigo prevê as sanções…".

**Numa norma europeia, o artigo já tem epígrafe oficial** ("Artigo 5.º —
Princípios relativos ao tratamento de dados pessoais"), e ela é mantida palavra
por palavra sempre que cabe nos 52 caracteres. As compridas demais — a do
art. 89.º do RGPD tem 167 — entram encurtadas, na mesma terminologia oficial em
PT-PT do EUR-Lex ("controlo", "conceção", "subcontratante", "coimas"). Não
traduza para o vocabulário brasileiro: a ementa é rótulo do texto que está do
lado, e ele é o do Jornal Oficial.

`scripts/conferir_ementas.py` compara os dois lados e é o que avisa quando eles
saem de sincronia — artigo novo sem ementa, ementa órfã de artigo que saiu da
norma, frase longa demais. Rode-o ao mexer em `_leis/` ou em `_data/ementas/`.

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

Os cinco scripts de `scripts/` são **ferramentas de autoria**: rodam na sua
máquina, não entram no site e não fazem parte do build. As dependências estão
em [`scripts/requirements.txt`](../scripts/requirements.txt); para instalá-las,
veja [Rodar localmente](../README.md#scripts-de-autoria) no `README.md`.

| Script | O que faz |
| --- | --- |
| `converter_eurlex.py` | Converte o HTML oficial do EUR-Lex para o Markdown de `_leis`, no dialeto `formato: ue` |
| `montar_rgpd.py` | Monta `_leis/gdpr.md` juntando os considerandos do Jornal Oficial ao articulado consolidado |
| `consolidar_ai_act.py` | Gera a consolidação não oficial do AI Act aplicando as alterações do Digital Omnibus |
| `ancorar_referencias.py` | Transforma citações em texto puro nos links âncora corretos |
| `conferir_ementas.py` | Confere as [ementas](#ementas-dos-artigos) de `_data/ementas/` contra os artigos de `_leis/` |
