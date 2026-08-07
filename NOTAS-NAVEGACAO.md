# Notas de legislação (`/notas`): pontos de melhoria de navegação

Levantamento feito em 7 de agosto de 2026 sobre o estado da seção naquele
momento (seis notas: LGPD, Marco Civil, ECA Digital, Regimento Interno da
ANPD, GDPR e AI Act).

É um **backlog**, não um plano fechado: os itens são independentes salvo onde
indicado, e a ordem de execução é a de "Se eu tivesse que escolher", no fim.
Nenhuma proposta aqui exige dependência nova, *build step* novo ou saída da
arquitetura descrita no `AGENTS.md` — tudo cabe em `notas.js`,
`_includes/nota-style.css`, `_layouts/nota.html`,
`_layouts/notas-index.html` e `scripts/`, e todas degradam sem JavaScript
como a seção já degrada hoje.

Referências de linha apontam para o estado do código em 7/8/2026 (commit
`17062a0`) e servem de ponto de partida, não de endereço exato.

## Estado

| Item | Situação |
| --- | --- |
| A1, A2, A3, A4, A5, A6 | pendente |
| B7 | **feito** (7/8/2026) |
| B8 | pendente |
| B9 | **feito** (7/8/2026) |
| B10 | **feito** (7/8/2026) |
| B11, B12, B13 | pendente |
| C14, C15, C16 | pendente |

Os itens feitos ficam registrados abaixo com o que foi entregue, para que o
histórico do diagnóstico não se perca e para que quem retomar a lista saiba o
que já não precisa ser refeito.

## Como o levantamento foi feito

Build local do Jekyll servido com URLs sem extensão, e roteiros de Playwright
percorrendo os caminhos reais: chegada por link entre notas, clique em
referência, troca de norma, sumários, navegação por teclado, em 1440px
(dois painéis) e 390px (abas). Os números citados em cada item são medidos,
não estimados.

**Ponto de partida saudável:** os **1.796 links-âncora internos e os 265
links entre notas estão todos íntegros** — nenhum destino inexistente. O
`scripts/ancorar_referencias.py` está cumprindo o papel dele. Os problemas
abaixo não são de link partido; são de *onde o link deixa o leitor* e de
*como ele volta*.

---

## A. Navegação entre normas e entre notas

### A1. Um link entre notas leva à lei seca, nunca ao comentário

**Hoje.** Chegando em `/notas/lgpd#art-55-j` a partir da nota do Marco Civil:

| | 1440px | 390px |
| --- | --- | --- |
| painel da lei | rolado até o art. 55-J, destacado | aba "Lei seca" ativa |
| painel de comentários | `scrollTop: 0` (no aviso de IA) | nunca visitado |

O tratamento do hash de chegada (`notas.js`, ~linha 546) só chama `irPara()`,
que age sobre o painel da lei. `irParaComentario()` existe, mas só é acionado
pelo sumário dos comentários.

**Por que incomoda.** O leitor foi mandado à LGPD para entender o que a LGPD
diz sobre aquilo. Recebe o texto cru do artigo e nenhum dos comentários, que
são o valor da nota. No mobile é pior: ele cai na aba "Lei seca" e pode não
perceber que existe comentário sobre aquele dispositivo.

**Proposta.** Um mapa dispositivo → seção do comentário, para posicionar
**os dois painéis** na chegada por âncora. Duas formas:

- **(a) Heurística de build.** Uma etapa que, para cada `art-N`, encontra o
  título de comentário mais próximo que cita aquele artigo — os títulos já
  trazem a citação no texto (`princípios-art-6º`,
  `quando-a-lgpd-se-aplica-art-3º`) — e emite `data-comentario="<id>"` no
  `<p id="art-6">`. O `notas.js` lê o atributo e rola o painel de comentários
  junto.
- **(b) Âncora composta explícita.** Aceitar `/notas/lgpd#art-6+principios`:
  dois alvos, um por painel. Controle editorial exato, mas exige escrever o
  link à mão ou ensinar o `ancorar_referencias.py` a preencher o segundo
  termo.

Recomendação: **(a)**, com **(b)** como escape para os casos em que a
heurística erra.

**Onde mexe.** `notas.js` (bloco `location.hash`),
`_includes/lei-anotada.html`, opcionalmente
`scripts/ancorar_referencias.py`.

### A2. A chegada não diz de onde o leitor veio, nem oferece volta

**Hoje.** Nada na página de destino registra a origem; a trilha é sempre
`higa.me / notas`, fixa.

**Por que incomoda.** "Marco Civil → art. 6º da LGPD → volto ao Marco Civil
onde eu estava" é o percurso central de quem estuda normas que se citam. Hoje
ele só existe pelo botão Voltar do navegador — que tem o problema do **A4**.

**Proposta.** Faixa discreta no topo do painel de comentários quando o
`document.referrer` for outra nota da seção: "← Voltar para Marco Civil da
Internet". Sem estado no servidor e sem cookie: `referrer` mais
`sessionStorage` para sobreviver a um recarregamento.

**Onde mexe.** `notas.js` e um bloco novo em `_layouts/nota.html`.

### A3. No mobile o cabeçalho rola embora e a nota perde identidade

**Hoje.** `.nota-topo` é `position: static` (medido: `top: -2000` depois de
rolar). Ficam fixos só a barra de abas e o `.painel__topo` — e o `<h2>` do
topo do painel é escondido de propósito no mobile
(`_includes/nota-style.css`, ~linha 638, `clip-path: inset(50%)`).

**Por que incomoda.** Somado ao **A1**, quem chega do Marco Civil vê na tela
apenas `[Comentários | Lei seca]` e texto de lei: **nada diz que ele está na
LGPD agora**.

**Proposta.** Compactar o cabeçalho no mobile (título em uma linha, truncado,
com o botão de menu) e torná-lo `sticky` acima das abas; ou, mais barato,
incluir o apelido da norma na barra de abas ("Comentários | Lei seca · LGPD").

**Onde mexe.** `_includes/nota-style.css`, media query `max-width: 899px`.

### A4. Não há volta depois de um salto — o Voltar sai da nota

**Hoje.** Todo salto usa `history.replaceState` (`notas.js`, ~linhas 354,
362, 477 e 483). Medido: clicar numa referência rola o painel da lei ~24.000px;
apertar Voltar **sai da página inteira**, em vez de desfazer o salto.

**Por que incomoda.** É a expectativa universal de navegação por âncora, e o
custo é assimétrico: sem Voltar, reencontrar o parágrafo de origem é manual.

**Proposta.** `pushState` nos saltos iniciados por clique (mantendo
`replaceState` para o hash de chegada) e tratamento de `popstate` restaurando
a posição anterior de cada painel. Guardar `{comentarios, lei, norma}` no
`state` do history resolve **A4** e **A1** com a mesma estrutura.

Parte do caminho já está andada: o **B10** guarda a posição de cada norma e
põe a norma escolhida na URL, e o **B7** guarda a posição de cada painel no
mobile. Falta virar isso em entradas de histórico — hoje as duas trocas usam
`replaceState` de propósito, para o botão Voltar não passar a funcionar em
umas navegações e não em outras.

**Risco.** Mexe no histórico do navegador; pede teste explícito de
Voltar/Avançar em sequência, inclusive alternando entre notas.

**Onde mexe.** `notas.js`.

### A5. Não existe "quem cita este artigo" (backlinks)

**Hoje.** A rede de citações é densa e muito assimétrica:

```
gdpr        → lgpd: 96      eca-digital → lgpd: 20      lgpd → regimento: 10
ai-act      → lgpd: 19      regimento   → lgpd: 18      mci  → lgpd:  4
```

A LGPD é citada **157 vezes** pelas outras notas e cita para fora 20 — e não
tem nenhuma indicação disso. Quem lê o art. 6º da LGPD não descobre que o
AI Act, o GDPR e o ECA Digital comentam esse artigo.

**Proposta.** Gerar no build um índice reverso (`_data/backlinks.yml`, por um
script irmão do `ancorar_referencias.py`) e exibi-lo junto ao dispositivo na
lei seca ou no fim da seção de comentário: "Também comentado em: GDPR ·
AI Act". É a mudança que mais transforma seis notas isoladas numa base
articulada.

**Onde mexe.** Script novo em `scripts/`, `_data/`,
`_includes/lei-anotada.html`.

### A6. Da lei seca não se chega ao comentário

**Hoje.** Comentário → lei funciona (é o coração da seção). Lei → comentário
não existe em lugar nenhum.

**Por que incomoda.** Quem usa a nota como consulta ("o que diz o art. 20?")
entra pela lei seca, lê o artigo e não tem porta de entrada para a análise.

**Proposta.** Mesmo dado do **A1** visto do outro lado, e mesma solução: com
o mapa dispositivo → seção, basta um marcador clicável no dispositivo.

---

## B. Navegação dentro da nota

### B7. No mobile, clicar numa referência apagava a posição de leitura — FEITO

Era um defeito, não uma limitação de projeto.

**Como era, medido:**

```
rolo os comentários até y=1979
clico numa referência   →  aba "Lei seca", y=37703    (esperado)
toco em "Comentários"   →  y=0                        (era 1979)
```

**Causa.** `irParaElemento()` chamava `mostrarPainel()` direto sem passar pelo
`scrollPositions[painelAtual] = window.scrollY`, que só existia no handler de
clique das abas. Com isso `scrollPositions['comentarios']` ficava `undefined`
e o `|| 0` mandava o leitor para o topo.

**O que foi feito.** O salvamento saiu do handler das abas para
`guardarPosicaoDoPainel(nomeDoDestino)`, que decide sozinha se há o que
guardar (só em uma coluna, e só quando o painel realmente muda), e passou a
ser chamada também por `irParaElemento` antes da troca de painel.

**Como ficou:** ida e volta devolvem `y=1979`; voltar à lei seca devolve
`y=37703`. Chegar por link de outra nota (`/notas/lgpd#art-55-j`) continua
abrindo a aba de comentários no topo — o leitor nunca esteve neles, e o topo
é o lugar certo. No desktop nada mudou: o painel de comentários fica onde
estava e só a lei rola.

### B8. O sumário da lei seca só tem capítulos, nunca artigos

**Hoje, contado:** LGPD **11 itens**, Marco Civil **6**, AI Act 43. O
`construirSumario()` varre só `h2[id], h3[id]` (`notas.js`, ~linha 409), e os
dispositivos são `<p>`.

**Por que incomoda.** Seis entradas de sumário para os 32 artigos do Marco
Civil. Para chegar a um artigo específico só há o campo "Ir para", que exige
saber o número de cor.

**Proposta.** Um nível de artigos sob cada capítulo, recolhido por padrão
(para não virar uma lista de 65 itens na LGPD), ou uma faixa de atalhos
numéricos no topo do painel.

### B9. O sumário não mostrava onde o leitor está, e não filtrava — FEITO

**Como era.** O sumário dos comentários da LGPD tem **53 itens** em lista
plana rolável, sem seção ativa destacada e sem campo de filtro.

**O que foi feito.**

- **Filtro.** Campo `type="search"` no topo de cada sumário, filtrando os
  títulos já listados. Compara sem acento e sem caixa (`normalize('NFD')`),
  porque o teclado do celular não põe acento sozinho: "principios" acha
  "Princípios". Um item que casa arrasta os ancestrais (o capítulo situa a
  seção encontrada) e os descendentes ("Definições" traz Sujeitos, Ações,
  Técnicas e Documentação). Sem resultado, aparece "Nenhuma seção com esse
  termo." num `role="status"`.
- **Seção atual.** O último título que já passou pela linha de leitura ganha
  barra de destaque, negrito e `aria-current="true"`. Calculado no mesmo
  quadro (`requestAnimationFrame`) da barra de progresso, que já lia a
  rolagem, e só com o sumário aberto — fechado, o resultado não apareceria em
  lugar nenhum. Ao abrir, o sumário rola até a seção marcada.
- **Teclado.** No desktop o foco vai para o filtro ao abrir (dá para digitar
  direto); no mobile continua no primeiro link, para não subir o teclado por
  cima da lista. `Esc` limpa o filtro na primeira vez e só fecha o sumário na
  segunda.
- **Troca de norma.** O filtro do sumário da lei seca é limpo quando a norma
  muda: um termo digitado para a norma anterior esconderia o sumário inteiro
  da nova.

**Não foi feito, e continua valendo a pena:** no desktop, onde há largura
sobrando, o sumário podia ser uma coluna fixa em vez de um painel sobreposto.

### B10. Trocar de norma perdia a posição e não entrava na URL — FEITO

**Como era, medido:** rolar o Marco Civil até 4000px, selecionar o Decreto
nº 8.771 e voltar ao Marco Civil devolvia `scrollTop: 0`. A URL continuava
`/notas/mci`, sem fragmento — não dava para compartilhar nem recarregar "a
nota mostrando o decreto". A causa era o `corpoDaLei.scrollTop = 0`
incondicional de `ativarNorma()`.

**O que foi feito.**

- **Posição por norma.** `ativarNorma()` guarda o `scrollTop` da norma que sai
  e restaura o da que entra. Vale enquanto a aba estiver aberta; norma nunca
  visitada começa no topo, como antes. Medido: 4000px no Marco Civil e 900px
  no decreto sobrevivem a ir e voltar entre os dois.
- **Norma na URL.** Trocar de norma grava o prefixo dos ids como âncora
  (`/notas/mci#dec8771`); a norma principal é o padrão e não leva marca.
  Abrir essa URL já mostra o decreto, com o seletor sincronizado e o fragmento
  buscado. O prefixo sozinho passou a ser âncora válida — está documentado no
  `AGENTS.md`, junto do esquema de ids.
- Âncoras de dispositivo em norma extra (`#dec8771-art-5`) continuam
  intactas: a URL não é reescrita para `#dec8771` ao abrir uma delas.

**Ficou de fora, de propósito:** só `replaceState`. Fazer a troca de norma
virar entrada no histórico é parte do **A4**, que ainda não existe para salto
nenhum — meia implementação aqui deixaria o botão Voltar funcionando para
normas e não para dispositivos, que é pior que não funcionar para nada.

### B11. Teclado: 453 tabulações até o painel da lei

**Hoje, contado:** painel de comentários com **453 elementos focáveis**,
painel da lei com **3**, e um único *skip link* ("Pular para os comentários").
Como o painel da lei vem depois no DOM, o campo "Ir para", o seletor de normas
e o link "Texto oficial" ficam atrás de 453 paradas de Tab.

**Proposta.** Um segundo *skip link* ("Pular para a lei seca") e/ou um atalho
de teclado para focar o campo "Ir para" (`/` ou `g`, anunciado no
`aria-describedby` que já existe). É também conformidade com o WCAG 2.4.1,
que o `AGENTS.md` exige em AA.

### B12. "Ir para" não busca texto, e o erro não fala

**Hoje, medido:** `6`, `art. 6º, X` e `55-A` funcionam; `999` e
`consentimento` são recusados. O único retorno é `aria-invalid="true"`, que
rende uma borda vermelha (`_includes/nota-style.css`, ~linha 308) — sem
mensagem, sem sugestão e sem anúncio para leitor de tela.

**Proposta.** (a) Mensagem em `role="status"`: "Não encontrei o art. 999 nesta
norma". (b) Busca textual como *fallback*: se o termo não casa com o padrão de
dispositivo, procurar no texto da norma exibida e listar os artigos que contêm
a expressão — o que faria o campo cumprir o que o rótulo já promete.

### B13. Não há permalink visível em artigo nem em seção de comentário

**Hoje.** Os ids existem (`art-5-viii`, `princípios-art-6º`) e as âncoras de
comentário funcionam quando compartilhadas — `/notas/lgpd#princípios-art-6º`
posiciona o painel corretamente pela rolagem nativa do navegador. Mas não há
nenhum elemento clicável que revele ou copie esse link.

**Por que incomoda.** Citar "a nota sobre o art. 20 da LGPD" exige
inspecionar o HTML.

**Proposta.** Um `#` discreto (visível no `:hover`/`:focus`) ao lado de cada
`h2`/`h3` do comentário e de cada `<p class="lei-artigo">`, copiando o link
absoluto. Vale junto limpar os ids acentuados gerados pelo Kramdown
(`princípios-art-6º` → `principios-art-6`), que hoje viram URLs
*percent-encoded* ao colar — **atenção:** mudar id publicado quebra link
externo já compartilhado, então convém manter o id antigo como âncora
duplicada ou avaliar se o ganho compensa.

---

## C. Índice e descoberta

### C14. O índice `/notas` mostra menos do que já sabe

**Hoje.** Seis cartões com título e `description`, em ordem alfabética — o que
põe o **AI Act em primeiro** numa seção de público brasileiro, e a LGPD (o
centro da rede, com 157 citações recebidas) em quarto.

O *front matter* já tem dados que o índice ignora: `atualizado_em` (presente
em todas as notas) e `normas_extra` — o leitor não descobre que a nota do
Marco Civil traz **três decretos** junto, nem que a do ECA Digital traz o
Decreto nº 12.880.

**Proposta.** Exibir "atualizada em ‹data›" e as normas incluídas em cada
cartão; agrupar em **Brasil** e **União Europeia**; ordenar por relevância
editorial (campo `ordem` no *front matter*) em vez de alfabética.

**Onde mexe.** Só `_layouts/notas-index.html` — a mudança de menor risco da
lista inteira.

### C15. Não há busca em nenhum nível

**Hoje.** Nenhuma busca: nem dentro da nota (fora do "Ir para" por
dispositivo), nem entre as seis notas.

**Proposta.** Índice JSON gerado no build (títulos de seção e primeiras
linhas) com busca *client-side* em `/notas`. Sem dependências, cabe no
orçamento de performance se restrita a títulos. É a proposta de maior custo da
lista — vale decidir se o volume atual (seis notas) já justifica.

### C16. Os botões de sumário são pouco descobríveis e cobrem o texto

**Hoje.** `2.15rem × 3.25rem` (medido: 34×52px), `position: fixed` no meio
vertical da tela, um em cada borda, só com ícone
(`_includes/nota-style.css`, ~linha 788). Em 390px eles ficam por cima do
texto da lei.

**Por que incomoda.** Passam o AA de tamanho de alvo (24×24) mas não o AAA
(44×44) que o `AGENTS.md` pede quando possível. E dois ícones idênticos em
bordas opostas não comunicam "sumário dos comentários" e "sumário da lei".

**Proposta.** Mover para o `.painel__topo` de cada painel, onde já há o rótulo
do painel, como botão rotulado — resolve descoberta, sobreposição e tamanho de
alvo de uma vez.

---

## Se eu tivesse que escolher

| Ordem | Item | Custo | Impacto |
| --- | --- | --- | --- |
| 1º | **A1 + A6** — posicionar os dois painéis na chegada por âncora | médio | máximo |
| 2º | **A4** — `pushState` e Voltar funcionando | médio | alto |
| 3º | **A2** — faixa "voltar para ‹nota de origem›" | baixo | alto |
| 4º | **C14** — índice com data e normas incluídas | trivial | médio |
| 5º | **A5** — backlinks "também comentado em" | médio-alto | alto |
| 6º | **B8** — artigos no sumário da lei seca | baixo | médio |

Os itens 3, 4 e 6 são independentes e podem sair em qualquer ordem. Os itens
1, 2 e 5 compartilham a mesma infraestrutura (o mapa dispositivo ↔ seção de
comentário): convém construir o mapa primeiro e depois os três sobre ele.

**B7**, **B9** e **B10** saíram desta lista porque foram feitos — o que
restou de cada um está anotado na seção do próprio item.
