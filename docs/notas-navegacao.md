# Notas de legislação (`/notas`): navegação, leitura e fluidez

Segunda varredura da seção, feita em 9 de agosto de 2026 sobre o estado do
código em `833b796` — seis notas (LGPD, Marco Civil, ECA Digital, Regimento
Interno da ANPD, GDPR e AI Act) e treze normas no painel da lei seca.

A primeira varredura (7/8/2026) olhou só para navegação. Esta olha para quatro
coisas, que é como o leitor de fato usa a seção: **navegar**, **ler**, **ir de
uma nota a outra** e **ir de um painel a outro**. Sete dos dezesseis itens
daquela lista foram executados; os nove que sobraram continuam aqui, com o mesmo
número e com as medições refeitas, e junto deles entram **treze achados novos**
que uma varredura de navegação não alcançava — entre eles um eixo inteiro, o de
leitura.

É um **backlog**, não um plano fechado: os itens são independentes salvo onde
indicado, e a ordem de execução é a de "Se eu tivesse que escolher", no fim.
Nenhuma proposta aqui exige dependência nova, *build step* novo ou saída da
arquitetura descrita em [`notas.md`](./notas.md) — tudo cabe em `notas.js`,
`_includes/nota-style.css`, os layouts e includes da seção, o front matter das
notas e `scripts/`, e todas degradam sem JavaScript como a seção já degrada
hoje.

## Estado

| Item | Situação |
| --- | --- |
| A1 | pendente |
| A2, A3 | **feito** (7/8/2026) |
| A4, A5, A6 | pendente |
| **A17, A18, A19** | **novo** |
| B7, B8, B9, B10 | **feito** (7/8/2026) |
| B11, B12, B13 | pendente |
| **B20, B21** | **novo** |
| C14 | **feito** (7/8/2026) |
| C15, C16 | pendente |
| **C22** | **novo** |
| **D23, D24, D25, D26, D27** | **novo** — eixo de leitura, que a lista anterior não tinha |
| **E28, E29** | **novo** — espera e falha |

## O que foi feito desde o levantamento anterior

Dois lotes, e o segundo não veio desta lista.

**PR #43 (7/8/2026) — A2, A3, B8 e C14.** Faixa "← Voltar para ‹nota de
origem›" quando o `document.referrer` é outra nota, decidida antes do primeiro
paint (revelada depois, ela custava 0,040 de CLS em 390px). Cabeçalho compactado
e preso no topo no mobile, com a pilha do que fica preso descrita por variáveis
CSS — foi o que expôs o `top: 3.1rem` solto que deixava o topo do painel 6px
encoberto pela barra de abas de 3.5rem. Artigos sob cada título do sumário da
lei seca, num `<details>` rotulado com a contagem. Índice `/notas` por relevância
editorial (`ordem`) e agrupado por `jurisdicao`, com as normas e a data em cada
cartão.

**PR #44 (9/8/2026) — trabalho novo, fora da lista.** As **713 ementas**, uma
por artigo das treze normas, que substituíram o começo do caput como rótulo do
artigo no sumário. O **modo leitura**, que expande um painel para a tela inteira
e promove o sumário dele a coluna fixa. O **seletor com todas as normas de
`_leis`**, e não só as da nota. O **sumário que acompanha a leitura**, com quatro
limites para não atrapalhar. E a correção do salto que começava do topo, no
`ativarNorma`.

**Antes disso (ee53f60) — B7, B9 e B10.** Posição de leitura preservada ao trocar
de painel no mobile; filtro e marcação de seção corrente nos dois sumários;
posição por norma e norma na URL (`/notas/mci#dec8771`).

O que cada um decidiu de propósito — e por quê — está nos comentários do código
e nas mensagens desses commits. O que **ficou de fora de propósito** e continua
valendo a pena:

- **B9:** no desktop, o sumário como coluna fixa em vez de gaveta. O modo leitura
  do PR #44 fez isso, mas só para o painel expandido — na tela dividida o
  sumário continua sendo gaveta sobreposta.
- **B10:** a troca de norma grava só `replaceState`, à espera do **A4**.
- **A2:** a volta leva ao topo da nota de origem, não ao parágrafo em que o
  leitor estava. Virou o **A18**, agora com um efeito colateral medido.
- **A3:** o `<h2>` com o apelido da norma continua oculto no mobile.

## Como esta varredura foi feita

Build local do Jekyll (`bundle exec jekyll build`, `LANG=C.UTF-8`) servido por
um estático que resolve as URLs como o site publicado — `/notas` serve
`notas.html`, e não a listagem de `_site/notas/`. Roteiros de Playwright com
Chromium, **com as fontes reais servidas do disco** (Inter e Merriweather: sem
elas, toda contagem de caracteres por linha seria a do *fallback*). Percursos
reais: chegada por link entre notas, clique em referência, troca de norma, os
dois sumários, modo leitura, teclado, 320/390/720/900/1100/1280/1440/1680/1920/2560px,
os dois temas, com e sem JavaScript, com `prefers-reduced-motion`, em 4G lento
(400 kbps, 400 ms de latência) e offline. Os números citados são medidos.

**O que está saudável, e convém não estragar:**

| | Medido |
| --- | --- |
| Links | **1.790 âncoras internas e 235 links entre notas, zero quebrados** (recontados no HTML gerado, contra todos os ids de notas e fragmentos) |
| Ementas | os **447 artigos** das seis normas principais têm ementa; **nenhum rótulo do sumário sai cortado**, em 1440/390/320px |
| Core Web Vitals | LCP 144–260 ms · CLS ≤ 0,0035 · montar o sumário 10–14 ms · uma tecla no filtro < 1 ms |
| Contraste | pior caso **6,7:1** (claro) e **7,6:1** (escuro) — passa AAA nos dois temas |
| WCAG 1.4.4 e 1.4.12 | zoom de 200% em 1440×900 e o espaçamento de texto de referência: **sem estouro e sem corte** |
| Sem JavaScript | painéis empilhados, âncora nativa parando no lugar certo nas duas larguras, realce por `:target` |
| Movimento reduzido | o salto estabiliza em ~68 ms, sem animação |
| Foco visível | contorno de 3px em **todos** os controles percorridos por Tab |

Os problemas abaixo não são de link partido nem de desempenho. São de *onde o
link deixa o leitor*, *como ele volta*, *quanto ele espera sem saber que está
esperando* e *como é o texto quando ele finalmente chega*.

---

## A. Navegação entre normas e entre notas

### A1. Um link entre notas leva à lei seca, nunca ao comentário

**Hoje, medido.** Chegando em `/notas/lgpd#art-55-j` a partir da nota do Marco
Civil — o percurso mais comum da seção:

| | 1440px | 390px |
| --- | --- | --- |
| painel da lei | `scrollTop: 26.121`, art. 55-J destacado | aba "Lei seca", página rolada 40.245px |
| painel de comentários | `scrollTop: 0` (no aviso de IA) | nunca visitado |

O tratamento do hash de chegada (`notas.js`, bloco `location.hash`) só chama
`irPara()`, que age sobre o painel da lei. `irParaComentario()` existe, mas só é
acionado pelo sumário dos comentários.

**Por que incomoda.** O leitor foi mandado à LGPD para entender o que a LGPD diz
sobre aquilo. Recebe o texto cru do artigo e nenhum dos comentários, que são o
valor da nota. No mobile é pior: ele cai na aba "Lei seca" e pode não perceber
que existe comentário sobre aquele dispositivo.

**O mapa que falta já está escrito — nas próprias remissões.** A varredura
mediu: das **150 remissões entre notas que apontam para um artigo, 149 (99%)**
vão para um artigo que alguma seção de comentário da nota de destino **já
remete** com um `#art-N` no corpo. Não é preciso adivinhar do que a seção trata:
ela declara isso, link a link.

É um sinal bem melhor do que a heurística de título proposta na lista anterior,
que resolveria **63%** dessas remissões (94 das 150) — porque só 126 dos 314
títulos de comentário citam um artigo no próprio texto do título.

**Proposta.** Gerar no build `dispositivo → seção de comentário`, por um script
irmão do `ancorar_referencias.py`, a partir dos `#art-N` escritos em cada seção.
O `lei-anotada.html` emite `data-comentario="<id>"` no `<p>` do artigo e o
`notas.js` posiciona **os dois painéis** na chegada por âncora.

- **Desempate.** Um artigo costuma ser remetido por mais de uma seção — na LGPD,
  37 dos 53 artigos remetidos. Ordem de desempate: (1) a seção cujo **título**
  cita o artigo; (2) a que mais o remete; (3) a primeira do texto. Com o
  primeiro critério cobrindo os casos que importam, os outros dois são rede.
- **Escape editorial.** Aceitar âncora composta (`/notas/lgpd#art-6+principios`)
  para os casos em que o desempate erra. É o **(b)** da lista anterior, agora
  como exceção e não como plano.

**Onde mexe.** Script novo em `scripts/`, `_data/`, `_includes/lei-anotada.html`,
`notas.js`.

### A4. Não há volta depois de um salto — o Voltar sai da nota

**Hoje, medido.** Três saltos seguidos numa nota (`#art-6`, `#art-18`,
`#art-52`): `history.length` continua **3**, o mesmo de antes do primeiro. O
primeiro Voltar **sai da nota inteira**, para `/notas`, em vez de desfazer o
salto. Todo salto usa `history.replaceState`.

**Por que incomoda.** É a expectativa universal de navegação por âncora, e o
custo é assimétrico: sem Voltar, reencontrar o parágrafo de origem é manual — e
os painéis têm de 17.600 a 238.800px de rolagem (ver **B20**).

**Proposta.** `pushState` nos saltos iniciados por clique (mantendo
`replaceState` para o hash de chegada) e tratamento de `popstate` restaurando a
posição anterior. Guardar `{comentarios, lei, norma, leitura}` no `state` do
history resolve **A4**, **A1** e a dívida do **B10** com a mesma estrutura.

**Risco.** Mexe no histórico do navegador; pede teste explícito de
Voltar/Avançar em sequência, inclusive alternando entre notas e entre normas.

**Onde mexe.** `notas.js`.

### A5. Não existe "quem cita este artigo" (backlinks)

**Hoje, contado.** A rede de citações é densa e muito assimétrica — 235 links
entre notas, dos quais **157 apontam para a LGPD**:

```
gdpr        → lgpd: 96      eca-digital → lgpd: 20      lgpd → regimento: 10
ai-act      → lgpd: 19      regimento   → lgpd: 18      mci  → lgpd:  4
```

Vendo por dispositivo: **71 artigos e incisos da LGPD recebem link de outra
nota**, e o art. 55-J recebe de três notas diferentes. Nenhum deles tem qualquer
indicação disso. Quem lê o art. 6º da LGPD não descobre que o AI Act, o GDPR e o
ECA Digital comentam esse artigo.

**Proposta.** Índice reverso gerado no build (`_data/backlinks.yml`, pelo mesmo
script do **A1** — é a mesma travessia de links, na direção contrária), exibido
junto ao dispositivo na lei seca ou no fim da seção de comentário: "Também
comentado em: GDPR · AI Act". É a mudança que mais transforma seis notas
isoladas numa base articulada.

**Onde mexe.** Script novo em `scripts/`, `_data/`, `_includes/lei-anotada.html`.

### A6. Da lei seca não se chega ao comentário

**Hoje, medido.** O painel da lei da LGPD tem **80 artigos e zero links** para o
comentário — nenhum `data-comentario`, nenhum marcador clicável. Comentário → lei
funciona (é o coração da seção); lei → comentário não existe em lugar nenhum.

**Por que incomoda.** Quem usa a nota como consulta ("o que diz o art. 20?")
entra pela lei seca, lê o artigo e não tem porta de entrada para a análise. O
seletor do PR #44 alargou o problema: agora se lê a LGPD dentro da nota do Marco
Civil, e do artigo na tela não há caminho para o comentário dele — só o menu do
cabeçalho, que leva ao **topo** da nota da LGPD.

**Proposta.** Mesmo dado do **A1** visto do outro lado, e mesma solução: com o
mapa, um marcador discreto no dispositivo. Quando a norma exibida não é a
principal da nota, o marcador aponta para a nota dela (`/notas/lgpd#art-20`).

### A17. O menu do cabeçalho desfaz a ordem editorial do índice — NOVO

**Hoje, medido.** As duas listas de notas da seção discordam:

| | Ordem |
| --- | --- |
| índice `/notas` | LGPD · Marco Civil · ECA Digital · Regimento Interno · GDPR · AI Act |
| menu do título, dentro da nota | AI Act · ECA Digital · GDPR · Marco Civil · Regimento Interno |

O índice ordena por `ordem` e agrupa por `jurisdicao` — foi o **C14**. O menu
faz `sort: "title"` (`_layouts/nota.html`), e o AI Act volta ao primeiro lugar
de onde o C14 o tirou, sem separação entre Brasil e União Europeia.

**Por que incomoda.** O menu é o caminho curto entre notas — o índice é o longo —
e está em toda página da seção, ao lado do título. É justamente ele que ignora a
relevância editorial que o índice passou a respeitar. E duas listas das mesmas
seis notas em ordens diferentes é a mesma incoerência que o C14 corrigiu entre a
página e o JSON-LD.

**Proposta.** `sort: "ordem"` e os mesmos rótulos de `jurisdicao` como
separadores do menu. Nota sem `ordem` vai para o fim, como no índice. Custo:
poucas linhas de Liquid e um separador no CSS.

**Onde mexe.** `_layouts/nota.html`, `_includes/nota-style.css`.

### A18. A faixa de origem vira pingue-pongue, e devolve o leitor ao topo — NOVO

**Hoje, medido.** Percurso Marco Civil → LGPD → Regimento Interno:

```
em /notas/mci                        (sem faixa)
em /notas/lgpd    (veio do MCI)      "← Voltar para Marco Civil da Internet"
em /notas/regimento (veio da LGPD)   "← Voltar para LGPD"
clico na faixa → /notas/lgpd         "← Voltar para Regimento Interno da ANPD"
```

Dois problemas na última linha. **A faixa inverteu o sentido**: ela aponta para
onde o leitor acabou de sair, e clicá-la de novo o devolve para lá — os dois
ficam em pingue-pongue, e o Marco Civil, a origem real da trilha, sumiu. E a
volta chega com `scrollTop 0` nos dois painéis: os 18.000px que o leitor tinha
percorrido na LGPD não voltam.

É consequência direta do mecanismo: a faixa é o `document.referrer`, e o
`referrer` não sabe a diferença entre "de onde vim" e "para onde acabei de ir".

**Por que incomoda.** A faixa foi feita para o percurso "Marco Civil → art. 6º da
LGPD → volto ao Marco Civil". Com três notas ela deixa de servir a esse percurso
e passa a oferecer uma volta que não é volta. Somado ao **A19** (cada salto é uma
recarga de 7,7 s em 4G lento), o leitor paga oito segundos para chegar ao topo de
uma nota que já tinha lido pela metade.

**Proposta.** Trocar o `referrer` por uma **trilha em `sessionStorage`** — a
pilha de notas visitadas, com a posição de leitura de cada painel em cada uma.
A faixa passa a mostrar o topo da pilha e a desempilhar ao ser usada, em vez de
apontar para o último `referrer`; e a volta restaura a posição guardada. O
`referrer` continua sendo o que **inicia** a pilha quando ela está vazia (chegada
por link externo), e sair da seção continua limpando. Continua sem estado no
servidor e sem cookie, e continua aplicado antes do primeiro paint pelo mesmo
script inline — a faixa não pode nascer depois, pelo CLS.

**Onde mexe.** O script inline de `_layouts/nota.html`.

### A19. Cada salto entre notas é uma recarga de 344 KB a 1 MB — NOVO

**Hoje, medido.** Ir de uma nota a outra é uma navegação completa, e as notas são
documentos grandes: a norma inteira vem pré-carregada no HTML.

| Destino | HTML | *load* sem limite | *load* em 4G lento |
| --- | --- | --- | --- |
| `/notas/lgpd#art-6` | 344 KB | 287 ms | **7,7 s** |
| `/notas/ai-act#art-5` | 1.013 KB | 537 ms | **21,1 s** |

Peso das seis: MCI 264 KB · Regimento 273 KB · ECA Digital 310 KB · LGPD 344 KB ·
GDPR 674 KB · AI Act 1.013 KB.

**Por que incomoda.** O GDPR cita a LGPD 96 vezes. Cada uma dessas remissões é,
no celular fora de casa, uma espera de oito segundos — e a volta, outra. É o
maior custo isolado da seção, e não estava em nenhuma lista.

**Proposta, em duas frentes independentes:**

- **(a) Adiar o que não é a primeira tela.** A norma principal é pré-carregada
  inteira, e o leitor chega vendo um artigo. `content-visibility: auto` com
  `contain-intrinsic-size` nos blocos da lei seca não muda o peso da rede, mas
  tira o custo de layout dos 119 artigos que ninguém está olhando — é uma linha
  de CSS e não altera o HTML. Medir antes e depois: o LCP já é bom (144–260 ms),
  então o ganho aqui é de INP e de memória, não de LCP.
- **(b) Pré-buscar a nota vizinha.** As remissões entre notas são conhecidas no
  build. Um `<link rel="prefetch">` para as notas mais citadas a partir desta —
  na LGPD, o Regimento Interno; no GDPR, a LGPD — resolve o caso comum sem tocar
  em arquitetura. Vale medir se compensa: prefetch de 344 KB numa visita que
  talvez não use o link é um custo real, e `prefetch` não deve ser disparado sob
  `prefers-reduced-data`.

A saída que **não** vale a pena é transformar a seção numa SPA que troque de nota
por `fetch`: quebraria "funciona sem JavaScript", que é regra da casa.

**Onde mexe.** `_includes/nota-style.css` (a); `_includes/nota-head.html` e o
script de ancoragem (b).

---

## B. Navegação dentro da nota

### B11. Até 498 tabulações para chegar ao painel da lei

**Hoje, contado** (1440px, elementos focáveis visíveis):

| Nota | Comentários | Lei | Tabs até o campo "Ir para" |
| --- | --- | --- | --- |
| Marco Civil | 284 | 5 | 295 |
| Regimento Interno | 280 | 5 | 291 |
| AI Act | 357 | 5 | 368 |
| ECA Digital | 442 | 5 | 453 |
| LGPD | 454 | 5 | **465** |
| GDPR | 487 | 5 | **498** |

Há um único *skip link* ("Pular para os comentários"), e o painel da lei vem
depois no DOM: o campo "Ir para", o seletor de normas e o botão de modo leitura
ficam atrás de todas essas paradas. O modo leitura da lei derruba o total para
110 — mas para chegar ao botão que o liga já se pagou o percurso inteiro.

**Proposta.** Um segundo *skip link* ("Pular para a lei seca") e um atalho de
teclado para focar o campo "Ir para" (`/` ou `g`), anunciado no
`aria-describedby` que já existe. É também conformidade com o WCAG 2.4.1, que o
`AGENTS.md` exige em AA.

### B12. "Ir para" não busca texto, e o erro não fala

**Hoje, medido** na LGPD. `6`, `art. 6º, X`, `55-A` e `20, p1` funcionam. `999`,
`consentimento`, `xyz` e o **campo vazio** são recusados — e o único retorno é
`aria-invalid="true"`, que rende uma borda vermelha. Sem mensagem, sem sugestão e
sem anúncio para leitor de tela.

Há um segundo efeito, que a lista anterior não tinha visto: **o realce do salto
anterior continua na tela**. Quem busca `999` depois de ter ido ao art. 55-A vê o
art. 55-A destacado e uma borda vermelha — dois sinais que se contradizem.

**Proposta.** (a) Mensagem em `role="status"` junto ao campo: "Não encontrei o
art. 999 nesta norma" — e limpar o realce anterior quando a busca falha.
(b) Busca textual como *fallback*: se o termo não casa com o padrão de
dispositivo, procurar no texto da norma exibida e listar os artigos que contêm a
expressão. É o que faria o campo cumprir o que o rótulo promete, e é meio caminho
do **C15**.

### B13. Não há permalink visível em artigo nem em seção de comentário

**Hoje.** Os ids existem e funcionam: `/notas/lgpd#princípios-art-6º` posiciona o
painel de comentários corretamente (medido: `scrollTop 10.128`, alvo a 131px do
topo). Mas não há nenhum elemento clicável que revele ou copie esse link, e
**35 ids do comentário da LGPD têm acento** — colados viram
`#princ%C3%ADpios-art-6%C2%BA`.

**Proposta.** Um `#` discreto (visível no `:hover`/`:focus`) ao lado de cada
`h2`/`h3` do comentário e de cada `<p class="lei-artigo">`, copiando o link
absoluto. **Atenção:** mudar id publicado quebra link externo já compartilhado —
se os ids acentuados forem limpos, mantenha o antigo como âncora duplicada.

### B20. Rolando a lei seca, nada diz em que capítulo o leitor está — NOVO

**Hoje, medido.** Os painéis são longos:

| Nota | Comentários | Lei seca |
| --- | --- | --- |
| Regimento Interno | 21.800px | 29.100px |
| Marco Civil | 27.400px | 17.600px |
| LGPD | 37.700px | 35.800px |
| ECA Digital | 41.400px | 19.600px |
| GDPR | 43.900px | **133.500px** |
| AI Act | 48.900px | **238.800px** |

Rolado 90.000px dentro do AI Act, o leitor está no **Capítulo II — Práticas de IA
proibidas**, no **artigo 5.º**. A barra de título do painel diz, o tempo todo,
apenas "AI Act consolidado (não oficial)". A barra de progresso mostra 38% — em
3px de altura e `aria-hidden="true"`.

**Por que incomoda.** Numa norma de 119 artigos, "38%" não responde a pergunta
que se faz ao rolar, que é "em que capítulo estou?". O sumário sabe a resposta —
o **B9** e o PR #44 fizeram exatamente isso —, mas só quando está aberto, e
abri-lo cobre o texto (na tela dividida ele é gaveta sobreposta).

**Proposta.** O capítulo corrente na própria barra de título do painel, ao lado
do seletor de normas, atualizado no mesmo quadro (`requestAnimationFrame`) em que
a barra de progresso e a marcação do sumário já leem a rolagem — o cálculo já
existe em `marcarSumarioAtivo`, é só publicá-lo em outro lugar. Vale para os dois
painéis: no de comentários, a seção corrente.

Alternativa mais barata e mais forte visualmente: `position: sticky` no `h2` de
capítulo dentro do painel. Custa nada em JavaScript, mas come altura útil e
concorre com a pilha do mobile (ver **D26**) — convém medir antes de escolher.

**Onde mexe.** `notas.js` (`marcarSumarioAtivo`), `_layouts/nota.html`,
`_includes/nota-style.css`.

### B21. O sumário se comporta como modal, mas não é declarado nem contido — NOVO

**Hoje, medido em 390px.** A gaveta do sumário ocupa **320 de 390px — 82% da
tela**. Fecha ao clicar fora e com `Esc`, que são gestos de dispensar
sobreposição. Mas:

- não tem `role="dialog"` nem `aria-modal="true"` — para o leitor de tela é uma
  região comum, e nada anuncia que uma camada se abriu;
- **não contém o foco**: 462 elementos focáveis continuam atrás dela. Percorrendo
  por Tab, o leitor sai da lista para dentro de um texto que ele não está vendo;
- o `aria-expanded` fica no botão da borda, que **some** enquanto a gaveta está
  aberta no modo leitura — o estado é anunciado por um controle fora da tela.

O `AGENTS.md` já exige *focus trap* no modal de contato do restante do site; aqui
o mesmo padrão não foi aplicado.

**Por que incomoda.** É a única forma de chegar a um artigo específico sem saber
o número de cor — o "Ir para" exige o número —, e é o ponto da seção que menos
se comporta como o resto dela para quem usa teclado ou leitor de tela.

**Proposta.** `role="dialog"` + `aria-modal="true"` + retenção do foco **enquanto
for gaveta sobreposta** (uma coluna, ou tela dividida). No **modo leitura** ele é
coluna da grade, não sobreposição: ali nada disso vale, e o `ancorado()` que o
`notas.js` já tem é exatamente o teste que separa os dois casos. Fechar continua
devolvendo o foco ao botão, como hoje.

**Onde mexe.** `notas.js` (`configurarSumario`), `_layouts/nota.html`.

---

## C. Índice e descoberta

### C15. Não há busca em nenhum nível

**Hoje, medido.** Zero campos de busca em `/notas`. Dentro da nota há o filtro
dos sumários (títulos e ementas já listados) e o "Ir para" por dispositivo —
nenhum dos dois procura no **texto**.

**Proposta.** Índice JSON gerado no build (títulos de seção, ementas e primeiras
linhas) com busca *client-side* em `/notas`. As ementas mudam a conta desta
proposta: **713 frases curtas** já escritas, uma por artigo, são um índice de
busca pronto e barato — pesquisar "aferição de idade" e receber o art. 15 do ECA
Digital não exige indexar o corpo das normas. Restrito a títulos e ementas, cabe
no orçamento de performance.

### C16. Os botões de sumário são pouco descobríveis e cobrem o texto

**Hoje, medido.** **34×52px**, `position: fixed` no meio vertical da tela, um em
cada borda, só com ícone. Em 390px eles ficam **por cima do aviso de IA** e, mais
abaixo, do texto. Passam o AA de tamanho de alvo (24×24) e **não** o AAA (44×44)
que o `AGENTS.md` pede quando possível — e o X de fechar o sumário, com 25×25px,
passa no AA por um pixel.

Dois ícones idênticos em bordas opostas não comunicam "sumário dos comentários" e
"sumário da lei".

**Proposta.** Mover para o `.painel__topo` de cada painel, onde já há o rótulo do
painel, como botão rotulado — resolve descoberta, sobreposição e tamanho de alvo
de uma vez. No mobile isso tem um efeito colateral bom: tira dois elementos
`fixed` da área de leitura. Tem um custo: a barra da lei seca já quebra em duas
linhas abaixo de 1100px (medido: 72px em 900–1000px, 43px acima disso) — o botão
precisa entrar no grupo `.painel__ferramentas`, e não solto.

### C22. Do índice não se chega a um artigo — NOVO

**Hoje, medido.** Os seis cartões de `/notas` levam à nota inteira e a mais nada:
**um único link com fragmento na página, e é o *skip link***. O cartão diz o
título, o resumo, as normas do painel e a data — não diz quantos artigos a norma
tem, quantas seções o comentário tem, nem o que ele cobre.

**Por que incomoda.** Quem chega por busca externa procurando "art. 20 da LGPD"
cai no índice e precisa entrar na nota, abrir o sumário e filtrar — três passos
para um destino que o índice já poderia endereçar.

**Proposta, do mais barato ao mais caro:**

- **(a)** Números no cartão, que o build já sabe: "80 artigos · 54 seções de
  comentário". Custa uma contagem em Liquid.
- **(b)** As seções principais do comentário como *chips* clicáveis no cartão,
  levando direto à âncora (`/notas/lgpd#princípios-art-6º`). Três ou quatro por
  cartão, escolhidas por um campo novo no front matter — não automaticamente, que
  daria uma lista arbitrária.
- **(c)** O **C15**, que resolve isto e mais.

---

## D. Leitura

Eixo que a lista anterior não tinha. A seção existe para ser lida, e as medidas
abaixo são de conforto de leitura, não de navegação.

### D23. A tela dividida não tem teto de medida — NOVO

**Hoje, medido** na LGPD, com as fontes reais carregadas. Caracteres por linha:

| Janela | Comentários | Lei seca |
| --- | --- | --- |
| 1280px | 65 | 70 |
| 1440px | 74 | 80 |
| 1680px | 88 | 94 |
| 1920px | **101** | **109** |
| 2560px | **119** | **125** |

A faixa confortável para texto corrido é de 45 a 75 caracteres. A tela dividida
sai dela **logo acima de 1440px** — 76 caracteres já em 1470px — e chega ao dobro
do limite num monitor de 27 polegadas. O teto que existe (`max-width: 70rem` nos
comentários, `68rem` na lei) é largo demais para segurar isso: em 2560px a coluna
dos comentários bate em 1064px.

**Por que incomoda.** É o modo **padrão** — o que todo leitor vê antes de
descobrir que existe um botão de modo leitura. O modo leitura resolve a medida
(65 caracteres na lei seca), mas só para quem o liga, e ele esconde o outro
painel, que é justamente o que a tela dividida existe para mostrar.

**Proposta.** Teto de medida na própria tela dividida: `max-width` em `ch` — a
unidade que fala a língua do problema — em vez de `rem`, com a coluna centrada no
painel. O divisor continua mandando na largura do **painel**; o teto manda na
largura do **texto**. Abaixo do teto nada muda, então nenhuma das larguras
medidas até 1440px é afetada.

Medido, com `70ch` e o corpo do **D25** aplicados à lei seca: **72 caracteres em
1440px, 73 em 1920px e 73 em 2560px** — a linha para de crescer. Vale calibrar
pelo resultado e não pelo número: `ch` é a largura do algarismo "0", e nestas
duas fontes 70ch entrega ~73 caracteres de texto real.

**Onde mexe.** `_includes/nota-style.css`.

### D24. O modo leitura dos comentários alonga a linha em vez de encurtá-la — NOVO

**Hoje, medido em 1440px:**

| | Tela dividida | Modo leitura |
| --- | --- | --- |
| comentários | 664px · 16px · **74 caracteres** | 744px · 16,8px · **80 caracteres** |
| lei seca | 657px · 14,4px · **80 caracteres** | 712px · 19,2px · **65 caracteres** |

O modo leitura da lei seca faz exatamente o que o [`notas.md`](./notas.md#modo-leitura)
promete: linha mais larga em pixels e **mais curta em caracteres**. O dos
comentários faz o contrário — o tipo cresce 5% e a coluna cresce 12%, e a linha
ganha seis caracteres. Quem entra no modo leitura dos comentários lê uma linha
pior do que a da tela dividida.

**Proposta.** Trocar `--nota-leitura-largura` de `50rem` por `70ch` — a mesma
unidade do **D23**, e a incoerência deixa de poder voltar sem ser vista. Medido
em 1440px:

| | Coluna | Caracteres |
| --- | --- | --- |
| hoje (`50rem` · `1.05rem`) | 744px | 80 |
| `70ch` · `1.05rem` | 685px | **73** |
| `70ch` · `1.15rem` | 756px | **74** |
| `44rem` · `1.15rem` | 648px | 63 |

A segunda linha é a mudança mínima — uma variável — e já põe o modo leitura dos
comentários abaixo da tela dividida, que é o que ele promete. A terceira entrega
a mesma medida com o tipo maior, se a intenção for também aliviar o corpo.

**Onde mexe.** `_includes/nota-style.css` (uma variável, ou duas).

### D25. O texto da norma é o menor da tela — NOVO

**Hoje, medido.** O comentário é Inter 16px; a lei seca é **Merriweather 14,4px**
(`0.9rem`). O texto normativo — serifado, dividido em incisos e alíneas, o que se
lê com mais cuidado — é 10% menor que o comentário sobre ele, e num tipo cujo
desenho pede mais tamanho, não menos.

Não é violação de WCAG (contraste e zoom passam com folga), mas é hierarquia
invertida: o objeto do estudo em corpo de nota de rodapé.

**E corrigir isso melhora a linha, não piora.** A intuição diz que o tipo menor é
o preço de caber texto numa coluna estreita; a medição diz o contrário, porque
tipo maior significa **menos** caracteres na mesma largura:

| Janela | a `0.9rem` (hoje) | a `1rem` |
| --- | --- | --- |
| 1280px | 70 caracteres | **63** |
| 1440px | 80 caracteres | **72** |
| 1680px | 94 caracteres | **85** |

Subir o corpo melhora a medida da linha em toda largura, ao mesmo tempo que
melhora a legibilidade do tipo. É a mesma conta que o modo leitura já faz ao
levar a lei seca a 1,2rem.

**Proposta.** Levar `.painel--lei .painel__corpo` de `0.9rem` a `1rem`. É
independente do **D23**, e os dois se reforçam: com o teto de medida, `1rem`
entrega 72–73 caracteres de 1440px a 2560px. Conferir junto a altura da barra de
título do painel, que não muda de corpo, e o sumário em 390px.

### D26. A primeira tela é aviso, bibliografia e — no mobile — um terço de barras — NOVO

**Hoje, medido**, igual nas seis notas: o aviso de IA ocupa **177px, 23% da
primeira tela** do painel de comentários, e o primeiro título de conteúdo é
**"Normas"** — uma lista de links para os textos oficiais — a **29%** da altura
do painel. Em 1440×900 o leitor rola quase uma tela inteira antes do primeiro
comentário.

Em 390px a conta é outra, e some por outro caminho: o que fica preso no topo.
Aberta a nota direto, na aba de comentários, são 149px (cabeçalho 50 + abas 56 +
topo do painel 43) — 18% da tela. **Chegando por um link de outra nota**, que é o
percurso do **A1**, entram a faixa de origem e a barra da lei seca, que em 390px
quebra em duas linhas:

| | Altura |
| --- | --- |
| cabeçalho | 50px |
| faixa "← Voltar para…" | 39px |
| barra de abas | 56px |
| topo do painel da lei | 74px |
| **soma** | **219px** |

São **26% de um iPhone 14 e 33% de um SE** — um terço da tela, na navegação em
que o leitor mais precisa de texto à vista.

**Duas restrições que não se negociam**, e a proposta tem de caber nelas: o aviso
é obrigatório em toda nota e é renderizado pelo layout (`AGENTS.md`), e o texto
dele não é ornamento — diz que a nota não é orientação oficial.

**Proposta.**

- **O aviso continua inteiro e continua primeiro no DOM**, mas em duas linhas em
  vez de cinco: a primeira frase (a que identifica o material e a data) visível, o
  resto num `<details>` aberto por "o que isto significa". Nada sai da página, e
  quem usa leitor de tela continua recebendo o texto na mesma ordem. Medir o CLS:
  um `<details>` que nasce fechado não move nada depois do paint.
- **"Normas" é editorial**, não código: a seção é a bibliografia da nota e está
  no lugar em que se põe uma bibliografia num documento impresso — o começo. Vale
  avaliar movê-la para o fim, ou trocá-la por um "Resumo geral" de abertura (que
  a LGPD já tem, mais abaixo). Não é mudança de layout, é decisão de quem escreve.
- **No mobile, um andar a menos.** Dos quatro que ficam presos, o mais caro é o
  topo do painel (74px, duas linhas) e é o que menos informa: em 390px o `<h2>`
  dele já está oculto de propósito (**A3**), e o que sobra é o seletor de normas,
  o link "Texto oficial" e o "Ir para". O seletor precisa ficar — é ele que diz
  qual norma está na tela. Os outros dois podem sair da faixa presa e virar uma
  linha que rola com o texto, ou entrar no cabeçalho, que já é o lugar dos
  controles da página. Cuidado: o **C16** propõe mover para cá os botões de
  sumário — os dois itens disputam a mesma barra e precisam ser decididos juntos.

**Onde mexe.** `_includes/nota-aviso.html`, `_includes/nota-style.css`,
`_layouts/nota.html`; e, opcionalmente, `_notas/*.md`.

### D27. Estouro horizontal: três notas, agora com os culpados nomeados — NOVO (era um achado solto)

**Hoje, medido** (excesso de rolagem horizontal da página):

| Largura | Nota | Painel | Excesso | Culpado |
| --- | --- | --- | --- | --- |
| 390px | GDPR | comentários | 58px | `confidencialidade/integridade/disponibilidade/resiliência,` — 57 caracteres sem ponto de quebra, no comentário do art. 32.º |
| 320px | GDPR | comentários | 128px | o mesmo |
| 320px | LGPD | lei seca | 29px | a sequência de "…" no bloco de citação do art. 60 |
| 320px | AI Act | lei seca | 16px | citação longa em bloco, no texto do Digital Omnibus |

A boa notícia: **em 390px a lei seca da LGPD não estoura mais** (eram 61px no
levantamento anterior) — a folga veio junto com o trabalho do PR #44. O que
sobrou em 390px é um caso só, e é de comentário, não de lei.

**Proposta.** Duas causas, duas correções:

- **A barra em texto corrido** (`confidencialidade/integridade/…`) é conteúdo:
  reescrever com espaços ou com barras finas resolve na origem e não custa CSS.
  Como isso vai voltar a acontecer, vale junto um `overflow-wrap: anywhere` no
  parágrafo dos comentários abaixo de 400px — as tabelas já têm exatamente esse
  tratamento, com a mesma justificativa.
- **Os blocos de citação** (`…` e citação longa) pedem `overflow-x: auto` no
  `blockquote` do painel da lei: o conteúdo é texto legal, não se reescreve, e
  rolar a citação é melhor do que rolar a página inteira.

**Onde mexe.** `_notas/gdpr.md`, `_includes/nota-style.css`.

---

## E. Espera e falha

### E28. Trocar de norma em rede lenta deixa o painel em branco por 15,8 s, sem aviso — NOVO

**Hoje, medido** em 4G lento (400 kbps, 400 ms de latência), selecionando "AI Act
consolidado (não oficial)" (767 KB) no painel da LGPD:

```
    65ms  painel vazio · sumário com 0 itens · nenhum aviso
  ...
 15409ms  painel vazio · sumário com 0 itens · nenhum aviso
 15824ms  119 artigos, 208.400px de texto, sumário com 162 itens
```

Dezesseis segundos de painel branco. Não há `aria-busy`, não há `role="status"`,
não há indicador visual nenhum — o `carregarNorma()` do `notas.js` esconde a
norma antiga e só mostra a nova quando o `fetch` resolve. O sumário da lei
esvazia junto e fica vazio o tempo todo.

Os fragmentos vão de 20 KB (Decreto nº 12.975) a **767 KB** (AI Act consolidado);
somados, 2,7 MB. Cinco dos treze passam de 130 KB.

**Por que incomoda.** É o defeito mais visível desta varredura e o mais barato de
corrigir. Um leitor em rede ruim conclui que a seleção não funcionou e tenta de
novo — e um segundo `fetch` não é cancelado nem ignorado.

**Proposta.**

- **Aviso desde o primeiro quadro**: `aria-busy="true"` no painel e uma mensagem
  em `role="status"` ("Carregando o AI Act consolidado…") que sai quando o texto
  chega. Um esqueleto visual é bem-vindo, mas o `role="status"` é o que resolve
  para quem não vê a tela.
- **Não esvaziar antes da hora**: manter a norma anterior à vista até o fragmento
  chegar. Trocar texto por texto é sempre melhor do que trocar texto por vazio, e
  já existe o `scrollTop` guardado por norma para devolvê-lo.
- **Uma requisição por vez**: guardar a promessa em curso e ignorar (ou abortar,
  com `AbortController`) a seleção anterior quando outra chega.

**Onde mexe.** `notas.js` (`carregarNorma`, `ativarNorma`), `_layouts/nota.html`.

### E29. A falha de carregamento não é anunciada, e o sumário fica vazio — NOVO

**Hoje, medido** com a rede desligada, selecionando o Decreto nº 8.771 na nota do
Marco Civil. O painel exibe a mensagem certa — "Não foi possível carregar este
texto agora. Consulte a fonte oficial" —, mas:

- ela entra como conteúdo comum, **sem `role="alert"`**: quem usa leitor de tela e
  acabou de operar o `<select>` não recebe nada;
- **o sumário da lei fica com 0 itens** e assim permanece, sem dizer por quê;
- **não há como tentar de novo** sem reabrir o `<select>` e reselecionar a norma,
  que é o gesto que acabou de falhar;
- o seletor continua marcando a norma que não carregou, então a barra do painel
  afirma uma coisa e o corpo dele mostra outra.

**Proposta.** `role="alert"` na mensagem, um botão "Tentar de novo" ao lado dela,
e voltar o seletor para a norma que continua exibida — de mãos dadas com o
"não esvaziar antes da hora" do **E28**, que já elimina o painel vazio.

**Onde mexe.** `notas.js` (`carregarNorma`).

---

## Se eu tivesse que escolher

| Ordem | Item | Custo | Impacto | Por quê |
| --- | --- | --- | --- | --- |
| 1º | **A1 + A6 + A5** — o mapa dispositivo ↔ comentário | médio | máximo | Uma infraestrutura, três entregas. E agora se sabe que ela é viável: **99% das remissões entre notas já apontam para um artigo que alguma seção comenta** |
| 2º | **E28 + E29** — aviso de carga e de falha | **baixo** | alto | Dezesseis segundos de painel branco é defeito, não limitação. É a melhor relação custo/benefício da lista |
| 3º | **D23 + D24 + D25** — teto de medida e corpo da lei seca | **baixo** | alto | Atinge toda leitura, no modo que todo leitor usa. São três variáveis de CSS, e as três medidas já estão feitas: 72–73 caracteres de 1440px a 2560px |
| 4º | **A17 + A18** — ordem do menu e trilha de volta | baixo | médio-alto | É a fluidez entre notas, que é o que a seção tem de próprio; o A17 são poucas linhas de Liquid |
| 5º | **A4** — `pushState` e Voltar funcionando | médio | alto | Melhora com o A1 pronto: os dois querem guardar o mesmo estado (`{comentarios, lei, norma, leitura}`) |
| 6º | **B11 + B21** — teclado e sumário | médio | médio | Conformidade AA que o `AGENTS.md` exige, nos dois pontos em que a seção hoje não a cumpre |

**Construir o mapa primeiro.** O **A1**, o **A5** e o **A6** são a mesma
travessia de links vista de três ângulos, e o **A4** guarda o mesmo estado que o
**A1** precisa restaurar. Fazer o script uma vez e os quatro sobre ele evita
escrever a mesma leitura de `#art-N` quatro vezes.

**Os três itens de leitura vão juntos, e num PR só.** O **D23**, o **D24** e o
**D25** mexem nas mesmas quatro declarações de `_includes/nota-style.css` e uma
mede a outra: separados, cada um pediria a mesma varredura de 1280 a 2560px.
Cuidado com a intuição aqui — subir o corpo do tipo **encurta** a linha em
caracteres, e foi medindo que a ordem entre eles deixou de importar.

**O que ficou de fora desta ordem, e por quê.** O **B12** (mensagem no "Ir para")
e o **D27** (estouro) são pequenos e independentes — cabem em qualquer PR que
passe perto. O **B13** (permalink) e o **C22** (índice) esperam decisão editorial
antes de virarem código. O **C15** (busca) e o **A19** (peso) são os dois maiores,
e os dois ficam melhores depois: a busca, porque as 713 ementas já são metade do
índice que ela precisaria; o peso, porque medir prefetch faz mais sentido quando
a chegada por âncora já posicionar os dois painéis.
