
# Relatório de auditoria e oportunidades de evolução

**Data:** 22 de agosto de 2026
**Escopo:** site inteiro, incluindo as quatro páginas de apresentação, a seção
/notas, o glossário normativo, a geração das normas, o build e a publicação.

## Resumo executivo

O site tem uma base técnica acima da média para um site Jekyll: o conteúdo fica
separado da apresentação, a versão sem JavaScript continua utilizável, a
navegação principal tem URLs reais, o tema evita flash, as notas têm dois
painéis sincronizados, sumários por seção e artigo, modo leitura, âncoras
estáveis e uma camada de definições normativas gerada a partir das leis.

As maiores oportunidades estão na descoberta e na continuidade da leitura. O
leitor consegue chegar a um artigo por uma remissão, mas ainda não tem busca
transversal, histórico navegável dos saltos, backlinks para as seções que
comentam um artigo ou uma forma simples de retomar a leitura. A manutenção
também depende mais de verificações locais do que de uma barreira automática no
CI.

### Prioridade recomendada

| Ordem | Frente | Complexidade | Impacto | Motivo |
| --- | --- | --- | --- | --- |
| 1 | Quality gate no CI e build reprodutível | Média | Alto | Reduz risco de publicar links, âncoras ou dados gerados inválidos. |
| 2 | Busca global de notas, normas e definições | Média | Alto | Resolve a principal lacuna de descoberta do acervo. |
| 3 | Histórico e estado compartilhável da leitura | Média | Alto | Torna remissões, voltar/avançar e links profundos previsíveis. |
| 4 | Busca textual e acessibilidade do painel “Ir para” | Baixa | Alto | Melhora a tarefa mais frequente na lei seca e o uso por teclado. |
| 5 | Backlinks entre artigo e comentário | Média/alta | Alto | Transforma o acervo em uma rede de estudo, sem duplicar conteúdo. |
| 6 | Metadados visíveis de versão e vigência | Média | Alto | Deixa claro qual texto oficial está sendo lido. |

Complexidade: baixa = alteração localizada; média = novo dado ou fluxo em
Jekyll/JS; alta = modelo editorial novo, parsing ou bastante validação manual.
Impacto considera utilidade para estudo, acessibilidade, manutenção e risco de
erro público.

## Estado atual observado

- O site de apresentação usa quatro estados derivados de _data/pages.yml, com
  navegação client-side sobre links reais. O núcleo está em
  [script.js](../script.js), e a arquitetura está descrita em
  [docs/arquitetura.md](arquitetura.md).
- /notas é um domínio isolado, com sete notas publicadas, 19 textos legais e
  um banco de 234 definições em 219 verbetes no estado atual. A página de
  definições já permite ordenar, filtrar por termo/norma/tema e separar normas
  brasileiras e europeias.
- A navegação da lei seca já reconhece artigos, parágrafos, incisos e alíneas,
  carrega normas extras sob demanda e atualiza a âncora da URL. O sumário
  acompanha a leitura e o modo leitura preserva a posição na sessão.
- O workflow de publicação executa minificação e build, mas ainda não funciona
  como uma barreira completa de qualidade: não há job explícito para sintaxe JS,
  cobertura de âncoras, links internos, acessibilidade ou orçamento de tamanho.
- O build local produzido nesta auditoria passou. Foram conferidas as ementas,
  os scripts de âncoras, a sintaxe de script.js/notas.js, a compilação dos
  scripts Python, os caminhos internos e a ausência de IDs duplicados. Os dois
  links estáticos restantes para # são os gatilhos intencionais do formulário
  de contato.

## Recomendações detalhadas

### 1. Quality gate e build reprodutível

**Resumo do recurso.** Criar uma verificação automática que impeça a publicação
quando o site compilar com âncoras ausentes, ementas inconsistentes, links
internos quebrados, JavaScript inválido ou artefatos acima de um limite definido.

**Sugestão de implementação.** Estender
[pages.yml](../.github/workflows/pages.yml) com um job de qualidade separado do
deploy. Ele pode executar bundle exec jekyll build, node --check,
py_compile, conferir_ementas.py, ancorar_referencias.py --check para todas as
notas, git diff --check, um verificador de links/IDs sobre _site e um teste de
HTML mínimo. Fixar as versões de lightningcss-cli e terser usadas pelo
workflow, hoje chamadas por npx -y sem versão explícita. O job deve produzir um
resumo de tamanho por página e falhar apenas com limites documentados.

**Complexidade × impacto.** Média × alto. É trabalho inicial de automação, mas
reduz regressões justamente nas partes mais sensíveis: texto legal, remissões e
dados gerados. Deve ser a primeira frente.

### 2. Busca global do acervo

**Resumo do recurso.** Uma busca em /notas/busca que encontre comentários,
seções, artigos, ementas, definições e normas, com filtro por nota e
jurisdição. Cada resultado deve apontar para a nota, o painel e a âncora exatos.

**Sugestão de implementação.** Gerar no build um índice estático a partir de
_notas/, _leis/ e _data/definicoes.yml, com campos como tipo, nota, norma,
titulo, trecho, url e id. A página pode usar um filtro textual leve em
JavaScript, mantendo uma lista útil sem JS por categoria ou por nota. Os filtros
devem entrar na URL (?q=, ?nota=, ?tipo=) para permitir compartilhamento. O
índice não deve substituir o texto original nem reescrever o conteúdo jurídico.

**Complexidade × impacto.** Média × alto. Exige definir o formato do índice e
controlar o peso do JSON, mas reaproveita a estrutura de definições e as âncoras
já existentes. É o melhor recurso para aumentar o valor do acervo sem criar
mais texto editorial.

### 3. Histórico de navegação e estado compartilhável

**Resumo do recurso.** Fazer com que Voltar/Avançar restaure o artigo, a norma,
o painel e, quando apropriado, o modo de leitura que o leitor estava usando.

**Sugestão de implementação.** Centralizar um objeto de estado com pathname,
hash, painel, norma e modoLeitura. Saltos significativos devem usar pushState;
atualizações de rolagem e ajustes transitórios continuam com replaceState. O
popstate deve reativar a norma sob demanda, trocar a aba e rolar para o alvo. A
lógica atual já concentra a maior parte dos pontos de integração em
[notas.js](../notas.js), mas hoje a troca de norma e os saltos usam replaceState;
a própria documentação do código registra que o histórico de saltos ainda não
existe.

**Complexidade × impacto.** Média × alto. O risco está em não conflitar com
sessionStorage e com o carregamento de fragmentos; testes de sequência de
saltos devem fazer parte do CI ou de uma bateria manual curta.

### 4. “Ir para” com busca textual, sugestões e erro anunciado

**Resumo do recurso.** Expandir o campo da lei seca para aceitar tanto um artigo
quanto uma expressão do texto, mostrando resultados e mensagens compreensíveis
quando nada for encontrado.

**Sugestão de implementação.** Preservar o parser atual para entradas como
art. 5º, p2, mas acrescentar uma busca no texto da norma ativa. Mostrar lista de
resultados com artigo, ementa e trecho; permitir Enter para o primeiro resultado
e próximo/anterior para os demais. Adicionar uma mensagem em role="status",
aria-errormessage no campo e um estado de carregamento/erro para normas extras.
O formulário e o campo estão em
[_layouts/nota.html](../_layouts/nota.html), e a resolução atual está em
[notas.js](../notas.js#L804-L838).

**Complexidade × impacto.** Baixa para mensagens e sugestões de âncora; média
com busca textual. Impacto alto, porque reduz a procura manual em normas longas
e fecha uma lacuna de acessibilidade apontada no roadmap.

### 5. Backlinks entre dispositivos e comentários

**Resumo do recurso.** Em cada artigo, mostrar “Comentado em” com as seções das
notas que o analisam; no comentário, oferecer um retorno explícito ao artigo e
às demais seções relacionadas.

**Sugestão de implementação.** Gerar um índice reverso depois da ancoragem das
referências, usando a nota, o título da seção mais próximo, o artigo e a URL.
Para links de normas extras, preservar o prefixo do namespace. Exibir backlinks
apenas quando houver ganho real e apontar para a seção específica, não para o
topo da nota. O mapa também pode servir de base para o histórico de navegação e
para uma busca futura; não convém criar dois parsers independentes.

**Complexidade × impacto.** Média/alta × alto. A parte técnica é viável, mas a
associação entre dispositivo e seção precisa de revisão editorial para evitar
que uma citação incidental pareça uma análise completa.

### 6. Metadados visíveis de norma, versão e vigência

**Resumo do recurso.** Identificar claramente, no painel da lei seca, a fonte,
o tipo de texto, a data de consolidação, a redação aplicável e o caráter
documental de uma consolidação europeia.

**Sugestão de implementação.** Os arquivos de _leis/ já carregam campos como
fonte, tipo, formato e compilado_ate; alguns também explicam no front matter se
são textos oficiais ou consolidações. Transformar esses dados em uma ficha curta
junto ao seletor de normas: “texto oficial”, “texto consolidado de X”, “inclui
alteração Y”, “fonte oficial”. Para atos europeus, manter a distinção entre
versão consolidada documental e versão autêntica publicada no Jornal Oficial. O
JSON-LD já usa parte dessa informação em
[_includes/nota-head.html](../_includes/nota-head.html#L49-L79).

**Complexidade × impacto.** Média × alto. A maior parte do dado já existe; o
ganho é de confiança, transparência e manutenção, especialmente quando houver
mais atos alteradores.

### 7. Estado compartilhável da página de definições

**Resumo do recurso.** Permitir que uma busca do glossário seja copiada e
reaberta exatamente com o termo, a ordenação e o filtro de jurisdição usados.

**Sugestão de implementação.** Serializar os controles de
[_layouts/definicoes.html](../_layouts/definicoes.html#L36-L56) em parâmetros
como q, ordem e br. Hidratar o estado no carregamento, usar replaceState durante
a digitação e oferecer um botão “Copiar link” com fallback para a URL. O #id do
verbete já funciona como permalink; a melhoria completa a parte dos filtros.

**Complexidade × impacto.** Baixa × médio/alto. É uma alteração localizada,
útil para estudo e para links compartilhados, com pouco risco editorial.

### 8. Skip link para a lei seca e navegação de teclado explícita

**Resumo do recurso.** Dar ao leitor de teclado uma entrada direta para cada
painel e anunciar corretamente os estados de troca, erro e carregamento.

**Sugestão de implementação.** Manter o skip link para comentários e adicionar
um segundo para a lei seca, ocultando-o quando o painel estiver fora da tela.
Completar a relação entre o campo “Ir para” e sua mensagem de erro com
aria-errormessage; anunciar a troca de norma e a posição encontrada em um
role="status". O skip link atual aponta apenas para #comentarios em
[_layouts/nota.html](../_layouts/nota.html#L80-L85), enquanto os controles
principais do painel estão centenas de elementos depois no DOM.

**Complexidade × impacto.** Baixa × alto. É uma pequena melhoria de WCAG e de
uso com teclado, especialmente relevante em notas extensas.

### 9. Retomar leitura e favoritos locais

**Resumo do recurso.** Oferecer “continuar de onde parei” e favoritos por
artigo/seção, sem conta de usuário e sem enviar dados ao servidor.

**Sugestão de implementação.** Salvar em localStorage apenas o slug da nota,
o painel, a norma, o hash e uma posição aproximada. Mostrar a ação no índice e
um marcador discreto no painel. Limitar o número de posições e fornecer “limpar
histórico neste dispositivo”. O código já usa sessionStorage para proporção dos
painéis e modo leitura, mas a posição não sobrevive à sessão; a barra de
progresso é apenas visual em
[notas.js](../notas.js#L1487-L1524).

**Complexidade × impacto.** Média × médio/alto. Tem grande valor para estudo
recorrente, mas precisa de uma interface discreta e de cuidado com restauração
de âncoras em normas carregadas sob demanda.

### 10. Impressão e exportação por modo de leitura

**Resumo do recurso.** Criar uma saída de estudo para comentários, lei seca ou
ambos, com título, fonte, data e links preservados.

**Sugestão de implementação.** Aproveitar o @media print já existente, que
remove controles e transforma a divisão em uma coluna, e acrescentar três ações:
“imprimir comentários”, “imprimir lei seca” e “imprimir tudo”. Antes da
impressão, incluir uma ficha com a norma ativa, a fonte oficial e compilado_ate;
excluir sumários duplicados e elementos de interface. Um download Markdown pode
ser oferecido para o conteúdo já presente no repositório; PDF deve continuar
sendo uma saída do navegador, sem servidor adicional.

**Complexidade × impacto.** Média × médio. O CSS de impressão reduz o esforço,
mas cada combinação de painéis precisa de revisão em papel e PDF do navegador.

### 11. Feed Atom/RSS de notas atualizadas

**Resumo do recurso.** Criar um feed pequeno para acompanhar novas notas e
atualizações de conteúdo, com a data atualizado_em e link canônico.

**Sugestão de implementação.** Adicionar um template Liquid em /notas/feed.xml
ordenando site.notas por atualizado_em, e um link rel="alternate" no cabeçalho
da seção. O feed deve resumir e linkar a nota; não precisa reproduzir a lei seca
nem o comentário inteiro. A mesma data já alimenta o índice, o JSON-LD e o
sitemap.

**Complexidade × impacto.** Baixa × médio. É barato, melhora a descoberta e não
introduz dependência de runtime.

### 12. Registro e monitoramento de fontes oficiais

**Resumo do recurso.** Detectar indisponibilidade ou mudança nas fontes externas
antes que o leitor descubra um link quebrado.

**Sugestão de implementação.** Criar um registro derivado do front matter com
URL, norma, jurisdição, tipo de fonte e identificador de versão. Um job agendado
pode testar status HTTP, redirecionamentos e, quando seguro, ETag/hash do
arquivo baixado. O resultado deve abrir uma issue ou gerar um relatório para
revisão humana; não deve alterar automaticamente _leis/ nem publicar uma nova
redação. A atualização editorial continua passando pelos conversores, pela
conferência de âncoras e pelo changelog.

**Complexidade × impacto.** Média × alto para manutenção. Há dependência de
fontes externas e falsos positivos, por isso o monitor deve alertar, não decidir
o conteúdo jurídico.

### 13. Comparações estruturadas entre regimes

**Resumo do recurso.** Criar tabelas curtas e navegáveis para relações já
explicadas nas notas: LGPD × RGPD, ECA Digital × DSA, AI Act × projeto
brasileiro, por exemplo.

**Sugestão de implementação.** Manter um arquivo editorial como
_data/comparacoes.yml, com linhas escritas manualmente: tema, conclusão curta,
limite, jurisdição e links para os artigos de cada lado. Renderizar a comparação
em uma página própria e, quando fizer sentido, inserir um resumo na nota. A
estrutura deve registrar diferença material; não deve inferir equivalência só
porque os nomes dos conceitos coincidem.

**Complexidade × impacto.** Alta × alto. É o recurso com maior potencial
pedagógico, mas exige mais curadoria do que programação e deve vir depois da
busca e dos backlinks.

### 14. Orçamento de performance para notas extensas

**Resumo do recurso.** Medir e controlar o custo real de HTML, CSS inline,
parse do DOM e enriquecimentos JavaScript nas páginas maiores.

**Sugestão de implementação.** Registrar no CI o tamanho bruto e comprimido,
tempo de build e, em um ambiente de navegador, LCP, INP e CLS. As notas atuais
geradas no build variaram aproximadamente de 640 a 754 KB de HTML; a página de
definições ficou em torno de 457 KB, e cada nota incorpora o CSS de
nota-style.css. Preservar o CSS crítico inline exigido pela arquitetura, mas
medir se estilos não críticos podem ser separados ou se trechos abaixo da dobra
podem usar content-visibility: auto com contain-intrinsic-size. O enriquecimento
de termos do glossário em
[notas.js](../notas.js#L188-L253) também pode ser adiado para
requestIdleCallback ou para a primeira interação, sem alterar o HTML sem
JavaScript.

**Complexidade × impacto.** Média × médio/alto. O impacto precisa ser medido;
otimização especulativa pode piorar acessibilidade, CLS ou a experiência de
leitura. O ganho principal é evitar que o crescimento do acervo transforme o
layout atual em gargalo.

### 15. Formulário de contato mais resiliente

**Resumo do recurso.** Reduzir spam e tornar falhas de envio mais recuperáveis,
sem perder o fallback nativo para o endpoint do Formspree.

**Sugestão de implementação.** Acrescentar um honeypot acessível a tecnologias
assistivas, limitar tentativas no cliente, preservar o texto preenchido quando a
requisição falhar e oferecer uma alternativa clara de nova tentativa. Se o
volume justificar, ativar a proteção antispam do próprio Formspree. O formulário
já tem validação, mensagens de status e focus trap em
[script.js](../script.js#L368-L518); a melhoria deve manter o envio normal sem
JavaScript.

**Complexidade × impacto.** Baixa × médio. É uma melhoria operacional, não a
prioridade de produto, mas protege o único canal de contato do site.

## Roadmap sugerido

### Fase 1 — segurança e descoberta básica

1. Quality gate do CI, versões de minificação fixadas e orçamento de artefato.
2. Mensagens acessíveis do “Ir para” e segundo skip link.
3. Estado compartilhável das definições.
4. Feed de notas e botão de copiar link de artigo/seção.

### Fase 2 — leitura transversal

1. Busca global com links profundos.
2. Histórico pushState/popstate para saltos e normas.
3. Metadados visíveis de versão, consolidação e fonte.
4. Backlinks entre dispositivos e comentários.

### Fase 3 — estudo continuado

1. Retomar leitura e favoritos locais.
2. Impressão/exportação por painel.
3. Comparações estruturadas entre regimes.
4. Monitoramento de fontes oficiais.

## Melhorias que já estão encaminhadas

O documento [docs/notas-roadmap.md](notas-roadmap.md) já registra parte do
backlog específico de /notas: busca entre notas, backlinks, skip link para a
lei seca, busca textual no campo “Ir para”, permalinks visíveis e melhorias no
sumário mobile. As recomendações deste relatório consolidam esses itens com as
frentes do site de apresentação e acrescentam CI, feed, metadados de versão,
retomada de leitura, exportação e monitoramento de fontes.

## Itens que não recomendo priorizar agora

- Framework de frontend ou dependência de ícones: a arquitetura sem runtime já
  atende ao problema e reduz custo de manutenção.
- Busca que reescreva o texto jurídico no cliente: ela aumentaria risco de
  literalidade e divergência; o cliente deve apenas localizar e navegar.
- Atualização automática de _leis/ a partir de fontes externas: atos
  consolidados, retificações e redações superadas exigem decisão editorial.
- PWA offline sem indicação de data: uma cópia legal antiga precisa mostrar
  claramente sua versão e data para não parecer o texto vigente.
- Mais animações na seção de notas: a utilidade marginal é baixa diante das
  tarefas de localização, comparação e continuidade da leitura.

## Critério de sucesso

Após a primeira rodada, o leitor deve conseguir: encontrar uma expressão em
qualquer nota ou norma; abrir um resultado no artigo e na seção corretos; seguir
uma remissão e voltar pelo histórico sem perder o contexto; saber qual versão
oficial está sendo exibida; navegar aos dois painéis só com teclado; e continuar
uma sessão de estudo no ponto em que parou. A medição deve combinar tarefas
reais em desktop e mobile com LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1, além de
verificações automatizadas de âncoras, links, ementas e acessibilidade.
