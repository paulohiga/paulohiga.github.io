# Notas de legislação (`/notas`): pontos de melhoria de navegação

Levantamento feito em 7 de agosto de 2026 sobre o estado da seção naquele
momento (seis notas: LGPD, Marco Civil, ECA Digital, Regimento Interno da
ANPD, GDPR e AI Act).

É um **backlog**, não um plano fechado: os itens são independentes salvo onde
indicado, e a ordem de execução é a de "Se eu tivesse que escolher", no fim.
Nenhuma proposta aqui exige dependência nova, *build step* novo ou saída da
arquitetura descrita em [`notas.md`](./notas.md) — tudo cabe em `notas.js`,
`_includes/nota-style.css`, os layouts e includes da seção, o front matter das
notas e `scripts/`, e todas degradam sem JavaScript como a seção já degrada
hoje.

Referências de linha apontam para o estado do código em 7/8/2026 (commit
`17062a0`) e servem de ponto de partida, não de endereço exato.

## Estado

| Item | Situação |
| --- | --- |
| A1 | pendente |
| A2 | **feito** (7/8/2026) |
| A3 | **feito** (7/8/2026) |
| A4, A5, A6 | pendente |
| B7 | **feito** (7/8/2026) |
| B8 | **feito** (7/8/2026) |
| B9 | **feito** (7/8/2026) |
| B10 | **feito** (7/8/2026) |
| B11 | **feito em parte** (13/8/2026) |
| B12, B13 | pendente |
| C14 | **feito** (7/8/2026) |
| C15, C16 | pendente |
| B17 | **feito** (10/8/2026) |

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

### A2. A chegada não dizia de onde o leitor veio, nem oferecia volta — FEITO

**Como era.** Nada na página de destino registrava a origem; a trilha era
sempre `higa.me / notas`, fixa. "Marco Civil → art. 6º da LGPD → volto ao
Marco Civil" — o percurso central de quem estuda normas que se citam — só
existia pelo botão Voltar do navegador, que tem o problema do **A4**.

**O que foi feito.** Uma faixa discreta, "← Voltar para Marco Civil da
Internet", que aparece quando o `document.referrer` é outra nota da seção. Sem
estado no servidor e sem cookie.

- **De onde vem o nome.** O menu do título já lista todas as outras notas com
  o título de cada uma: é o mapa de que a faixa precisa, sem marcação nova. Do
  título fica só o apelido — os títulos seguem "‹apelido› — ‹nome formal›", e
  numa faixa de uma linha o que serve é "Marco Civil da Internet", não "Marco
  Civil da Internet — Lei nº 12.965/2014".
- **O que conta como origem.** Só outra nota. Vir de `/notas` não acende a
  faixa: para o índice já existe a trilha do cabeçalho. Vir de fora da seção
  apaga o que estivesse guardado — a trilha anterior não vale mais.
- **`sessionStorage`** guarda a origem por caminho de destino, para a faixa
  sobreviver a uma abertura sem `referrer` (recarga pela barra de endereços).
- **Roda antes do primeiro paint**, num script inline em `_layouts/nota.html`,
  e não no `notas.js`, que é `defer`. Revelada depois, a faixa empurraria os
  painéis para baixo: medido, **0,040 de CLS em 390px** e 0,025 em 1440px,
  justamente na navegação que ela serve. Inline, o CLS da página com faixa
  ficou igual ao da página sem (0,0012 em 390px). É a mesma estratégia já usada
  para o tema e para a divisão dos painéis, e o motivo é o mesmo.

**Onde ela ficou, e por quê.** Fora dos dois painéis, entre o cabeçalho e a
barra de abas — e não no topo do painel de comentários, como a proposta
original dizia. Dentro do painel ela teria dois problemas: no mobile a chegada
por âncora abre a aba "Lei seca", e a faixa nasceria escondida justamente na
navegação que a justifica; e, em qualquer largura, sairia da tela na primeira
rolagem. No mobile ela é `sticky` junto com o cabeçalho (ver **A3**): medido,
chegando em `/notas/lgpd#art-55-j` a partir do Marco Civil, a faixa fica em
`top: 50` com o texto já rolado 40.000px.

**Ficou de fora, de propósito:** a volta leva ao topo da nota de origem, não ao
parágrafo em que o leitor estava — o `referrer` não carrega fragmento, por
especificação. Devolver a posição exata é trabalho do **A4**.

### A3. No mobile o cabeçalho rolava embora e a nota perdia identidade — FEITO

**Como era.** `.nota-topo` era `position: static` (medido: `top: -2000` depois
de rolar). Ficavam fixos só a barra de abas e o `.painel__topo` — e o `<h2>` do
topo do painel é escondido de propósito no mobile. Somado ao **A1**, quem
chegava do Marco Civil via na tela apenas `[Comentários | Lei seca]` e texto de
lei: **nada dizia que ele estava na LGPD agora**.

**O que foi feito.** O cabeçalho foi compactado e preso no topo, com o título
em uma linha só, cortado com reticências (`LGPD — Lei Geral de Proteç…`). O
texto completo continua no DOM, para leitor de tela, e o menu logo abaixo
mostra o nome inteiro das outras notas. Preso, o cabeçalho mantém à mão as três
coisas que se procura ao chegar: em que norma se está, a volta para `/notas` e
o menu para outra nota.

**A pilha de elementos presos**, que agora tem quatro andares (cabeçalho →
faixa de origem → abas → topo do painel), passou a ser descrita por variáveis
CSS, e cada elemento recebe a sua altura como `height`/`min-height` — não como
estimativa. Foi assim que apareceu um defeito antigo: o `top: 3.1rem` do
`.painel__topo` era um número solto, e a barra de abas media **3.5rem**; o topo
do painel nascia 6px por baixo dela, encoberto. A faixa do **A2** entra na
conta por uma variável só, zerada quando ela não existe.

O `notas.js` **não repete esses números**: `alturaDosElementosFixos()` percorre
os elementos e soma os que o estilo calculado disser que estão presos
(`position: sticky`), de modo que o ponto de corte de 900px vive só no CSS.

**Medido em 390px:** cabeçalho 50px, faixa 38px (quando existe), abas 56px,
topo do painel 43px — encostados um no outro, sem buraco nem sobreposição, e a
âncora de chegada parando logo abaixo de tudo. Sem JavaScript o cabeçalho
continua preso e a âncora nativa também para no lugar certo.

**Ficou de fora, de propósito:** o `<h2>` com o apelido da norma continua
oculto no mobile. Com o cabeçalho preso, a identidade já está na tela, e
exibi-lo empurraria o topo do painel da lei para mais uma linha em telas
estreitas — o campo "Ir para" e o link do texto oficial já dividem essa faixa.

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

### B8. O sumário da lei seca só tinha capítulos, nunca artigos — FEITO

**Como era, contado:** LGPD **11 itens**, Marco Civil **6**, AI Act 43. O
`construirSumario()` varria só `h2[id], h3[id]`, e os dispositivos são `<p>`.
Seis entradas de sumário para os 32 artigos do Marco Civil; para chegar a um
artigo específico só havia o campo "Ir para", que exige saber o número de cor.

**O que foi feito.** Um nível de artigos sob o título a que pertencem,
recolhido por padrão num `<details>` rotulado com a contagem ("15 artigos").
`<details>` porque ele já traz o teclado, o estado aberto/fechado e o anúncio
para leitor de tela prontos — nada disso precisou ser reescrito em ARIA.

- **O rótulo do artigo** é o marcador em destaque mais o começo do texto, que é
  o que diz do que ele trata: "**Art. 20** O titular dos dados tem direito a
  solicitar a revisão de decisões tomadas…". Numa norma europeia o marcador já
  vem com a ementa ("**Artigo 5.º** — Princípios relativos ao tratamento de
  dados pessoais"). O corte do resumo é feito no JavaScript, e não só no CSS,
  porque o filtro compara com o que está escrito no item: o que não aparece não
  deve casar com a busca.
- **O filtro do B9 passou a alcançar artigos**, e abre sozinho o grupo em que
  achou — filtrar "20" no Marco Civil traz o art. 20 sem que se precise abrir
  capítulo nenhum. Limpar o filtro não recolhe de volta.
- **O capítulo em que o leitor está abre com os artigos à mostra** quando o
  sumário é aberto: é ali que ele vai procurar o artigo vizinho ao que lê.
- **A "seção atual" continuava sendo o título**, e não o artigo, para o capítulo
  não deixar de ser destacado — é ele que situa a leitura. Isso valeu até o
  **B17**, que pôs os artigos na conta sem perder o capítulo: o destaque desce
  para o artigo e o capítulo fica marcado como ramo.
- **Norma sem capítulo algum** (é o caso dos decretos) ganha os artigos no
  primeiro nível: antes o sumário dela vinha vazio.

**Medido:** LGPD 11 títulos + **80** dispositivos de artigo (os 65 numerados
mais a série 55-A…55-L), Marco Civil 6 + 32, AI Act 43 + 119, GDPR 27 + 99,
Regimento Interno 7 + 75. O sumário dos comentários não mudou.

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
  lugar nenhum. Ao abrir, o sumário rola até a seção marcada. (O **B17** depois
  pôs os artigos na conta e passou a marcar o destino do salto já no clique.)
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
  buscado. O prefixo sozinho passou a ser âncora válida — está documentado em
  [`notas.md`](./notas.md#múltiplas-normas-por-nota), junto do esquema de ids.
- Âncoras de dispositivo em norma extra (`#dec8771-art-5`) continuam
  intactas: a URL não é reescrita para `#dec8771` ao abrir uma delas.

**Ficou de fora, de propósito:** só `replaceState`. Fazer a troca de norma
virar entrada no histórico é parte do **A4**, que ainda não existe para salto
nenhum — meia implementação aqui deixaria o botão Voltar funcionando para
normas e não para dispositivos, que é pior que não funcionar para nada.

### B11. Teclado: 453 tabulações até o painel da lei — FEITO EM PARTE

**Como era, contado:** painel de comentários com **453 elementos focáveis**,
painel da lei com **3**, e um único *skip link* ("Pular para os comentários").
Como o painel da lei vem depois no DOM, o campo "Ir para", o seletor de normas
e o link "Texto oficial" ficam atrás de 453 paradas de Tab.

**O que foi feito.** Um atalho por controle, e não só para o campo "Ir para":
`c` e `l` abrem os sumários, `Shift+C` e `Shift+L` dão a tela inteira a cada
painel, `n` abre o menu de notas (agora percorrido por `↑` `↓`), `e` abre o
seletor de normas, `/` (ou `i`) vai ao campo "Ir para", `?` mostra a lista
inteira e `Esc` desfaz uma camada por toque. O esquema, as três regras que
valem para todas as teclas e as decisões do painel de ajuda estão em
[`notas.md`](./notas.md#atalhos-de-teclado).

- **A lista é visível**, num botão discreto ao lado do de tema: atalho que só
  existe no código é atalho que ninguém usa. Ela é a documentação das teclas —
  as duas andam juntas.
- **As teclas podem ser desligadas**, o que não é luxo: atalho de uma tecla só
  precisa disso pelo WCAG 2.1.4, nível **A** (quem digita por voz dispara essas
  teclas sem querer). O `Esc` continua valendo desligado.
- **Nada dispara com o foco num campo nem com Ctrl/Alt/Meta**, e atalho que
  aponta para painel escondido pelo modo leitura devolve a tela dividida antes
  de agir, como as remissões já faziam.

**Falta o *skip link*.** O segundo salto ("Pular para a lei seca") é o que
atende o **WCAG 2.4.1** para quem não conhece os atalhos — e é a única parte
deste item que vale sem teclado físico, já que a lista de atalhos é de tela
larga. Fica pendente com o `aria-describedby` do campo "Ir para", que também
podia anunciar a tecla.

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

### B17. O destaque do sumário chegava atrasado e ignorava os artigos — FEITO

*Não estava no levantamento de 7/8/2026: apareceu no uso, depois do **B8**.*

**Como era, medido em 1440×900.** Clicar num item do sumário não o destacava:
a marca só se mexia quando o leitor rolava mais um pouco. A causa era uma
diferença de 4px entre dois números que precisavam andar juntos — em duas
colunas a âncora parava 12px abaixo do topo útil do painel, e a linha de
leitura que decide o item corrente ficava a 8px. O item recém-saltado nascia
**abaixo** da linha, isto é, ainda "não alcançado", e o sumário continuava
marcando o trecho anterior. Valia nos dois sumários. Em uma coluna os dois
números coincidiam (8 e 8) — sem folga nenhuma para o subpixel com que a
rolagem suave termina.

Somava-se a isso o **B8**, que pôs os artigos na lista mas os deixou fora da
conta do destaque: clicar num artigo nunca o marcava (a marca ia para o
capítulo dele), e percorrer a LGPD inteira movia a marca onze vezes, uma por
título, para 80 artigos.

**O que foi feito.**

- **Os artigos entram na conta.** Os alvos que o sumário acompanha passaram a
  ser títulos **e** artigos, em ordem de documento. O que se perderia com isso
  — o capítulo destacado, que situa a leitura — volta como marca de **ramo**:
  o item corrente leva a barra de destaque e o `aria-current`, e o título que o
  contém, uma barra em tom de traço e o negrito. Um `aria-current` só, no item
  mais fundo: dois no mesmo caminho seriam anunciados como duas posições.
- **Marca só o que está à mostra.** Artigo dentro de um grupo recolhido, ou
  escondido pelo filtro, devolve o destaque ao título que o guarda — é o que
  faz a gaveta de grupos fechados continuar marcando o capítulo, exatamente
  como antes. Abrir o grupo desce a marca até o artigo, e fechá-lo a sobe de
  volta; como `<details>` não borbulha o `toggle`, o sumário o escuta na
  captura.
- **O salto fixa o destino.** O item clicado é marcado no ato do clique e fica
  fixo até o leitor rolar por conta própria, em vez de esperar a geometria. Com
  isso o destaque também acerta a âncora perto do fim da norma, onde a rolagem
  para onde alcança e não onde a linha de leitura a encontraria.
- **A linha de leitura virou constante**, derivada da parada da âncora mais uma
  folga para o subpixel da rolagem suave. Eram dois números soltos, e é assim
  que a diferença de 4px tinha aparecido.
- **As escritas no DOM saem só quando o item muda.** Antes cada quadro de
  rolagem repintava a lista inteira; com os artigos são até 162 links por norma.
  Medido: rolagem contínua da LGPD em quadros de 16,7ms, sem quadro longo.

**Medido depois:** clicar em capítulo, em artigo e em seção de comentário marca
o item no quadro seguinte ao clique (~20ms) e o mantém durante toda a rolagem;
seis paradas de rolagem na LGPD dão seis marcas distintas, todas em artigos, com
o capítulo em ramo.

---

## C. Índice e descoberta

### C14. O índice `/notas` mostrava menos do que já sabia — FEITO

**Como era.** Seis cartões com título e `description`, em ordem alfabética — o
que punha o **AI Act em primeiro** numa seção de público brasileiro, e a LGPD
(o centro da rede, com 157 citações recebidas) em quarto. O *front matter* já
tinha dados que o índice ignorava: `atualizado_em` e `normas_extra`.

**O que foi feito.**

- **Ordem editorial.** Dois campos novos no *front matter* da nota — `ordem`
  (relevância) e `jurisdicao` (o grupo) —, documentados em
  [`notas.md`](./notas.md#front-matter). A lista sai LGPD, Marco Civil, ECA
  Digital, Regimento Interno, GDPR, AI Act, sob os títulos **Brasil** e **União
  Europeia**. Grupo novo não pede edição no layout: o rótulo é o próprio valor
  de `jurisdicao`, e os grupos saem na ordem em que aparecem na lista já
  ordenada. Nota sem `ordem` vai para o fim em vez de derrubar a página.
- **Normas no cartão.** A principal e as extras, em etiquetas — são 13 nos seis
  cartões. É o que responde, do índice, "o que vem junto?": o Marco Civil abre
  com três decretos, o AI Act com o texto original e o Omnibus ao lado.
- **Data por extenso**, com `<time datetime>` legível por máquina.
- **A `ItemList` do JSON-LD segue a mesma ordem** da página: as duas descrevem
  a mesma lista, e não faria sentido divergirem.

**De quebra, um ganho de acessibilidade:** o cartão inteiro era um `<a>`, e o
nome acessível do link virava o bloco de texto todo — que agora, com normas e
data, seria bem maior. Só o título é link; o cartão continua clicável por um
pseudoelemento que cobre a área.

**Onde mexeu.** `_layouts/notas-index.html`, `_includes/notas-index-head.html`
(a ordem do JSON-LD), o CSS do índice e o *front matter* das seis notas.

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
| 3º | **A5** — backlinks "também comentado em" | médio-alto | alto |

Os três compartilham a mesma infraestrutura (o mapa dispositivo ↔ seção de
comentário): convém construir o mapa primeiro e depois os três sobre ele. O
**A4** tem ainda a dívida registrada no **B10** — a troca de norma só grava
`replaceState`, à espera de um tratamento de histórico que valha para todos os
saltos.

**A2**, **A3**, **B7**, **B8**, **B9**, **B10** e **C14** saíram desta lista
porque foram feitos — o que restou de cada um está anotado na seção do próprio
item.

**Achado fora desta lista, ainda pendente:** em 390px a aba "Lei seca" da LGPD
estoura 61px de rolagem horizontal, e o painel de comentários do GDPR, 82px. É
conteúdo, não layout — uma sequência de "…………" inquebrável no bloco de citação
do art. 60 da LGPD, e um trecho equivalente no comentário do art. 32.º do GDPR.
Já era assim antes destas mudanças (medido nos dois builds).
