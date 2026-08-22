# Roadmap das notas de legislação (`/notas`)

Auditoria em 20 de agosto de 2026. O levantamento original, feito em 7 de
agosto, cobria seis notas: LGPD, Marco Civil, ECA Digital, Regimento Interno
da ANPD, GDPR e AI Act.

Este documento acompanha produto, código e conteúdo da seção. A ordem atual
vem de duas prioridades:

1. colocar `/notas/definicoes` em funcionamento confiável e integrá-la melhor à
   seção;
2. tornar as notas mais úteis, com a maior densidade de informação possível e
   o menor volume de texto necessário.

A seção continua isolada do restante do site: a integração prioritária ocorre
dentro de `/notas`, sem acoplar `default.html`, `script.js` ou
`_data/pages.yml`.

## Estado resumido

| Frente | Estado |
| --- | --- |
| Navegação básica entre painéis, normas e sumários | **concluída**, com pontos residuais |
| `/notas/definicoes` | **em integração**: implementada na linha de desenvolvimento, ausente de `master` |
| Redução de repetição e densidade das notas | **próxima frente editorial** |
| Histórico, backlinks e rede de relações | **pendente**, depois das duas prioridades |

### Itens do levantamento anterior

| Item | Situação em 20/8/2026 |
| --- | --- |
| A1 + A6 — chegada e retorno entre comentário e lei | **pendente** |
| A2 — faixa para voltar à nota de origem | **feito** |
| A3 — identidade da nota presa no mobile | **feito** |
| A4 — Voltar/Avançar depois de um salto | **pendente** |
| A5 — backlinks “quem cita este artigo” | **pendente** |
| B7 — preservar posição ao trocar de painel | **feito** |
| B8 — artigos no sumário da lei seca | **feito** |
| B9 — filtro e seção atual no sumário | **feito** |
| B10 — posição e norma na URL | **feito** |
| B11 — atalho para o painel da lei | **feito em parte** |
| B12 — busca textual e erro compreensível em “Ir para” | **pendente** |
| B13 — permalink visível de artigos e seções | **pendente** |
| B17 — destaque imediato do item clicado e dos artigos | **feito** |
| C14 — índice ordenado, datado e com normas | **feito** |
| C15 — busca global do acervo | **concluída** |
| C16 — botões de sumário descobríveis e sem sobreposição | **pendente** |

Os itens concluídos permanecem aqui como histórico. O que ainda precisa de
atenção está detalhado abaixo.

## 1. Prioridade: Definições normativas

### D1. Fechar o contrato da página e publicar a integração — EM INTEGRAÇÃO

A implementação candidata já entrega:

- `/notas/definicoes`, com âncoras por verbete, ordem alfabética ou temática,
  filtro por termo/norma/tema e filtro de jurisdição;
- `_data/definicoes.yml`, gerado a partir de `_leis/`, e
  `/notas/definicoes.json`, carregado sob demanda;
- referências separadas para a nota e para o dispositivo da norma;
- entrada no índice `/notas` e no menu das notas;
- fallback sem JavaScript: a página continua legível em ordem alfabética e os
  links continuam sendo links reais;
- `DefinedTermSet`, canonical, sitemap e tema claro/escuro.

Na auditoria, a linha candidata compilou com Jekyll, o gerador foi idempotente
e produziu **210 definições em 195 verbetes**. As referências geradas
resolveram tanto nos documentos principais quanto nos fragmentos carregados
sob demanda. A página ainda não está em `master`, portanto a integração só
fica concluída depois de:

- confirmar `/notas/definicoes` e `/notas/definicoes.json` no build de preview e
  no servidor sem extensão;
- testar chegada direta a `#<id>`, filtro, ordenação, tema, mobile e ausência
  de JavaScript;
- conferir foco, `Esc`, foco de retorno, leitura do diálogo e anúncio de
  estados vazios;
- conferir que os links de referência funcionam antes e depois de carregar
  uma norma extra;
- verificar CLS, LCP e INP: a marcação contextual é inserida depois do
  primeiro paint e não pode reformatar a coluna de texto.

### D2. Garantir cobertura e literalidade do acervo — ATENÇÃO

O gerador lê artigos cuja ementa contém “Definições” e recebe uma lista
explícita de conceitos definidos fora desses artigos. Esse contrato é bom para
reprodução, mas precisa de uma conferência automatizada que:

- liste as normas e os artigos cobertos e aponte norma sem definição prevista;
- falhe quando uma âncora gerada não existir no documento principal nem no
  fragmento correspondente;
- preserve a redação PT-PT das normas europeias;
- mantenha o cabeçalho de arquivo gerado e impeça edição manual silenciosa;
- exiba a fonte da definição sem misturar literalidade normativa e comentário.

Cada norma nova ou alteração em `_leis/` deve regenerar o banco e revisar o
diff. O índice não deve virar uma segunda fonte de verdade.

### D3. Tornar os links contextuais úteis e discretos — ATENÇÃO

Nas notas, a implementação candidata marca no máximo a primeira ocorrência de
um verbete por seção e quatro ocorrências por nota, abre o texto completo em
diálogo e leva cada referência ao dispositivo correspondente. A ideia atende
à prioridade editorial: a definição longa sai do comentário, mas continua a
um clique.

Antes de encerrar a frente, ajustar e medir:

- escopo: termos da jurisdição inteira podem aparecer em nota que não usa
  aquela norma; o padrão deve privilegiar a norma principal e as extras da
  nota, deixando referências mais amplas para uma ação explícita;
- falha de rede: se o JSON não carregar, o link deve continuar levando à
  página consolidada, com uma mensagem compreensível;
- contexto: o diálogo deve preservar o retorno ao termo, oferecer a página
  consolidada e permitir chegar ao artigo sem perder a norma ativa;
- carga: a indexação de termos, a substituição dos nós de texto e o diálogo
  não podem prejudicar INP, foco de teclado ou `prefers-reduced-motion`;
- aparência: a marcação do termo não pode criar quebra visível ou CLS.

### D4. Usar definições como camada de ligação da seção — PRÓXIMO

Depois da estabilização, a página pode virar a camada comum entre índice,
comentário e lei seca:

- no cartão, mostrar em quais notas o termo é usado, sem repetir a definição;
- no diálogo, indicar outros dispositivos que adotam a mesma redação;
- permitir uma URL compartilhável que abra o verbete filtrado;
- usar os mesmos ids na página consolidada, no diálogo e nos links de artigos;
- só criar uma visão comparativa quando houver diferença material entre as
  redações, em vez de duplicar tabelas nas notas.

Essa camada deve continuar curta: links e metadados carregam a relação; o
comentário explica a consequência jurídica.

### D5. Melhorar descoberta sem transformar a página em catálogo — DEPOIS

O JSON-LD atual identifica o conjunto, mas ainda pode descrever cada verbete
como `DefinedTerm`. A melhoria vale depois da correção funcional e deve incluir
apenas o que ajudar a encontrar ou compartilhar um conceito:

- `hasDefinedTerm` para os verbetes;
- título e jurisdição nos metadados;
- estado do filtro na URL (`?q=` ou fragmento);
- links internos coerentes com canonical e sitemap.

## 2. Prioridade: mais informação com menos texto

### E1. Retirar duplicações normativas dos comentários — EM INTEGRAÇÃO

A linha candidata já retirou dos comentários os blocos que repetiam definições
da LGPD, do Marco Civil, do ECA Digital, do GDPR e do AI Act. A nota da LGPD
mantém a análise técnica sobre anonimização, porque ela acrescenta raciocínio
e aplicação.

O padrão editorial passa a ser:

- literalidade na lei seca e em `/notas/definicoes`;
- comentário para consequência, distinção, controvérsia, exemplo e aplicação;
- uma afirmação por frase quando a referência muda;
- fonte junto da afirmação, sem parágrafo bibliográfico solto;
- tabela apenas quando as mesmas colunas se repetem em três ou mais itens.

Essa limpeza só fica concluída quando a integração das definições chegar ao
`master` e cada nota passar por uma leitura de redundância.

### E2. Fazer uma rodada de compressão por seção — PRÓXIMO

Para cada `##` e `###`, revisar nesta ordem:

1. a primeira frase responde o que o dispositivo faz e por que importa;
2. a segunda frase traz a distinção ou o limite que muda a aplicação;
3. exemplos, exceções e fontes ficam apenas quando alteram a conclusão;
4. contexto repetido é substituído por um link para a seção ou definição que
   já o explica;
5. mudanças recentes entram na seção existente, em vez de abrir uma subseção
   longa para cada documento novo.

O resultado deve ser medido por perguntas de estudo (“qual é a regra?”, “qual é
o limite?”, “qual artigo sustenta?”), não pela quantidade de palavras cortadas.

### E3. Criar formatos compactos para relações repetidas — PRÓXIMO

Quando a informação tiver muitas dimensões fixas, preferir:

- tabelas curtas de correspondência entre regimes;
- listas de decisão com condição, consequência e artigo;
- cronologias de poucas linhas para mudanças normativas;
- uma síntese inicial com links para a demonstração detalhada.

O critério é reduzir procura e repetição. Uma tabela que apenas transforma
prosa longa em prosa fragmentada não entra.

### E4. Medir utilidade da leitura — NOVO

Criar uma bateria pequena de tarefas em desktop e mobile, por exemplo:

- localizar a definição de um termo;
- encontrar o artigo citado e sua ementa;
- responder a regra e a exceção de uma seção;
- comparar a solução brasileira com a europeia;
- voltar ao comentário depois de consultar a lei.

Registrar tempo, cliques, posição perdida, largura excedente e necessidade de
rolagem horizontal. O roadmap deve privilegiar alterações que reduzam esses
custos sem aumentar o texto.

### E5. Política para novas fontes — NOVO

Antes de acrescentar uma subseção, decidir se a fonte:

- muda a conclusão de uma seção existente;
- preenche uma lacuna de artigo ou conceito;
- oferece um exemplo curto que melhora a aplicação;
- apenas confirma algo já explicado.

No último caso, atualizar a referência ou uma frase existente. A fonte nova
entra no changelog quando muda o que a nota afirma; o volume de texto não é
critério de atualização.

## 3. Backlog residual de navegação e descoberta

### A1 + A6. Mapa dispositivo ↔ comentário — PENDENTE, prioridade seguinte

Links entre notas e links da lei seca continuam chegando a apenas um painel.
Gerar um mapa explícito entre dispositivo e seção de comentário, com escape
editorial para exceções, e usar o mesmo mapa para:

- posicionar os dois painéis na chegada por âncora;
- levar da lei seca ao comentário;
- preservar a norma extra correta;
- preparar backlinks sem duplicar parsing.

A heurística por “título mais próximo” só entra com validação contra links reais.

### A5. Backlinks por artigo — PENDENTE

Gerar índice reverso das remissões existentes e exibir “também comentado em”
apenas quando houver ganho real. O dado deve reutilizar o mapa de A1/A6 e
apontar para a seção, não apenas para o topo da nota.

### B11. Skip link para a lei seca — PENDENTE

Os atalhos de teclado já existem e estão documentados. Falta o segundo skip
link, além de completar o `aria-describedby` do campo “Ir para”, para a
navegação por teclado não depender de atalhos de uma tecla.

### C16. Sumários sem sobreposição no mobile — PENDENTE, baixo custo

Mover os botões para a barra do painel, com rótulo visível ou acessível e alvo
de pelo menos 44×44px. O sumário deve continuar funcionando como coluna no
modo leitura.

### B12. “Ir para” com texto e erro anunciado — PENDENTE

Adicionar mensagem em `role="status"` e uma busca textual que retorne artigos
da norma exibida. A busca deve deixar claro quando encontrou texto em mais de
um dispositivo.

### B13. Permalinks visíveis — PENDENTE

Oferecer cópia do link de artigos e seções. Ids antigos precisam continuar como
âncoras alternativas antes de qualquer normalização de caracteres.

### A4. Histórico de saltos — PENDENTE

Trocar `replaceState` por entradas de histórico nos cliques e tratar
`popstate` com posição dos dois painéis, norma e modo mobile. Só implementar
depois de A1/A6, para que todas as formas de salto compartilhem o mesmo estado.

### C15. Busca global do acervo — CONCLUÍDA

`/notas/busca` oferece busca estática por notas, seções, normas, artigos e
definições. O build gera um índice JSON determinístico e compacto; o cliente o
carrega sob demanda, normaliza acentos e preserva os links profundos das
âncoras existentes. A URL guarda `q` e `tipo` (com seleção múltipla separada
por vírgulas), e a página mantém diretório por categorias para uso sem
JavaScript. O cabeçalho e a tecla `s` tornam a busca acessível em toda a seção.
O tamanho do índice é conferido junto da validação de links do build.

## 4. Correções rápidas já identificadas

- eliminar as duas sequências inquebráveis que causam rolagem horizontal em
  390px: a citação do art. 60 da LGPD e o trecho equivalente do art. 32.º do
  GDPR;
- repetir o teste em claro/escuro, sem JavaScript, com teclado, em 390px,
  900px, 1150px, 1440px e modo leitura;
- manter a verificação de âncoras, ementas, build Jekyll, WCAG AA e Core Web
  Vitals como critério de aceite de toda alteração de código.

## Ordem recomendada

| Ordem | Entrega | Motivo |
| --- | --- | --- |
| 1 | D1 + D2 + D3 — fechar `/notas/definicoes` | Corrige a base recém-criada e evita espalhar uma integração frágil |
| 2 | E1 + E2 — remover repetição e condensar seções | Aumenta a utilidade sem aumentar o acervo |
| 3 | A1 + A6 — mapa entre comentário e lei | Faz cada direção da leitura levar ao contexto certo |
| 4 | B11 + C16 — acessibilidade e descoberta dos controles | Baixo custo e ganho imediato em teclado/mobile |
| 5 | A5 + D4 — rede de relações | Integra notas, artigos e definições com o mesmo dado |
| 6 | B12 + B13 | Melhora consulta e compartilhamento |
| 7 | A4 | Fecha a semântica do histórico depois que os saltos estiverem unificados |
| 8 | D5 — descoberta do glossário | Depois da correção funcional da página de definições |
