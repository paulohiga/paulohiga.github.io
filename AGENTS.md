# Guia para agentes de IA generativa

Este documento orienta agentes de IA (Claude Code, Gemini CLI, ChatGPT Codex e
afins) que contribuem com o site [higa.me](https://higa.me). Leia-o antes de
qualquer alteração. Os arquivos `CLAUDE.md` e `GEMINI.md` apontam para aqui.

Ele traz as **regras**: o que pode ser alterado, por quem, com que cuidados e o
que verificar antes de terminar. A **mecânica** — como o site é montado, como as
âncoras das notas são geradas, que scripts existem — está nos documentos ao
lado, e você vai precisar deles:

| Documento | Leia antes de |
| --- | --- |
| [`README.md`](./README.md) | Editar o texto das páginas, rodar o site, publicar |
| [`docs/arquitetura.md`](./docs/arquitetura.md) | Mexer em HTML, CSS ou JS |
| [`docs/notas.md`](./docs/notas.md) | Mexer em `_notas/`, `_leis/` ou `_fragmentos/` |

## Visão geral do projeto

O site é processado por **Jekyll no GitHub Pages**, com build próprio via GitHub
Actions. A premissa central é manter o **conteúdo textual em Markdown** separado
do **código** (HTML/JS/CSS), para facilitar a manutenção.

São duas partes independentes: as **quatro páginas de apresentação** (resumo e
biografia, em pt-br e en-us) e a seção de **notas de legislação** (`/notas`),
que tem layout, CSS, JS e includes próprios. Uma mudança numa não pode afetar a
outra.

## Idiomas (pt-br e en-us)

- O idioma principal do site é **pt-br**.
- Toda alteração de conteúdo é solicitada em pt-br e **deve ser replicada em
  en-us**, mantendo consistência, o mesmo tom de linguagem e construção de texto
  natural.
- A versão en-us é destinada a um público que **não conhece necessariamente as
  peculiaridades do Brasil** — adapte (não apenas traduza literalmente)
  expressões, contexto e referências culturais quando preciso.
- São **quatro páginas** que devem permanecer coerentes entre si: `index.md`
  (pt-short), `bio.md` (pt-full), `en/index.md` (en-short) e `en/bio.md`
  (en-full).
- **A seção `/notas` é pt-br apenas** — exceção consciente a esta regra. O
  público é brasileiro e a manutenção em dois idiomas não se justifica. Não
  "corrija" isso criando `/en/notas`.

## Conteúdo: resumo (home) x biografia completa

- **Resumo da home** (`index.md` em pt-br e `en/index.md` em en-us): escrito por
  humano. **Não altere automaticamente** — só edite se explicitamente
  solicitado.
- **Biografia completa** (`bio.md` e `en/bio.md`): atualizada primariamente por
  IA, observando as regras abaixo.

### Regras para a biografia atualizada por IA

- Siga o princípio **NPOV (Neutral Point of View)** da Wikipedia:
  <https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view>.
- Todas as afirmações devem ser **factuais e verificáveis publicamente**.
- Cite a **referência imediatamente após cada afirmação**. As referências são
  detalhadas na seção própria de referências bibliográficas, **gerada
  automaticamente pelo Jekyll** (notas de rodapé — ver `README.md`). A numeração
  segue a **ordem de aparição no texto**; a chave `^n` é só um rótulo interno e
  pode ser reutilizada para citar a mesma fonte.
- Mantenha os padrões de marcação já usados nas biografias: **tabelas de provas
  em HTML simples** (com `scope`/legenda para acessibilidade) e as **anotações de
  classe do kramdown** (`{:.classe}`) das seções — ver `README.md`.
- Ao incorporar **fontes mais recentes**, atualize o campo `last_modified` no
  front matter de `bio.md` **e** de `en/bio.md` (mesma data nos dois arquivos):
  é ele que define a data-limite exibida no aviso de conteúdo gerado por IA
  ("…fontes públicas disponíveis até X"). É uma data **editorial** — não a
  atualize em edições que não mudam o recorte das fontes (ver
  [`README.md`](./README.md#data-limite-do-aviso-de-ia-last_modified)).

## Notas de legislação: regras editoriais

Estas regras valem para tudo o que entra em `/notas` e **não são negociáveis**.
A mecânica da seção — estrutura de arquivos, esquema de âncoras, normas extras,
importação do EUR-Lex, scripts — está em [`docs/notas.md`](./docs/notas.md), que
você precisa ler antes de tocar em `_notas/`, `_leis/` ou `_fragmentos/`.

- **Só fontes públicas.** Nada de processos, minutas, discussões ou entendimentos
  internos da ANPD. Não escreva "a ANPD entende que…" sem citar ato público com
  link.
- **Nada de voz institucional.** O material é pessoal e privado; não usa
  identidade visual de órgão público nem se apresenta como orientação oficial. O
  aviso de `_includes/nota-aviso.html` é renderizado pelo layout em toda nota —
  não o remova nem o mova para o Markdown.
- **Não mencione concursos públicos** nem qualquer certame.
- **Direito autoral**: leis, decretos e decisões judiciais são de uso livre;
  doutrina e material de terceiros, não. Resuma com palavras próprias e cite.
- **Sem dados pessoais** de partes ao comentar jurisprudência: refira o caso por
  número, órgão e tema.
- **Confira toda remissão nova contra o texto legal antes de publicar.** Link
  errado numa página pública de legislação é um defeito, não um detalhe. Use
  `scripts/ancorar_referencias.py --check` e revise o diff.
- **O texto da norma não se altera**, e os arquivos gerados por script trazem
  "NÃO EDITE ESTE ARQUIVO À MÃO" no front matter.
- **A ementa do artigo é rótulo de navegação, não texto legal.** É a frase
  curta de `_data/ementas/<norma>.yml` que o sumário da lei seca mostra no
  lugar do começo do caput — ela não entra no painel da norma nem em `_leis/`.
  Escreva-a com o núcleo do artigo nas primeiras palavras e dentro do limite de
  tamanho; numa norma europeia, preserve a epígrafe oficial em PT-PT. Toda
  norma precisa da sua, e `scripts/conferir_ementas.py` é quem confere (ver
  [`docs/notas.md`](./docs/notas.md#ementas-dos-artigos)).
- **Normas estrangeiras entram em português oficial.** No caso da União
  Europeia, o texto do EUR-Lex, que é PT-PT. Quando a terminologia oficial
  divergir da brasileira, explique a correspondência na própria nota em vez de
  reescrever o texto legal.
- **`atualizado_em` é a data da última atualização de conteúdo** da nota. É o
  que o aviso exibe ("atualizadas em…") e o que alimenta o `dateModified` do
  JSON-LD e o `<lastmod>` do sitemap quando o histórico do git não estiver
  disponível. Atualize-o sempre que mexer no conteúdo dos comentários — mas
  **não** em correções que não mudam o que a nota afirma (typo, link, ajuste de
  marcação). O campo **não afirma que alguém conferiu o texto**: é data de
  atualização, não de revisão. Era por isso que o nome antigo (`revisado_em`)
  foi trocado — ele prometia uma revisão humana que nem sempre houve. Não
  reintroduza essa leitura no aviso nem no nome do campo.

## Padrões técnicos a preservar

Ao mexer no código, mantenha as decisões de arquitetura que sustentam a
performance e a acessibilidade do site. O porquê de cada uma está em
[`docs/arquitetura.md`](./docs/arquitetura.md).

- **Sem dependências novas.** Nada de Font Awesome, jQuery, frameworks CSS/JS ou
  bundlers. Ícones são **SVG inline** ou **máscaras CSS**.
- **CSS é editado em `_includes/style.css`** (inserido inline no `<head>`) e, nas
  notas, em `_includes/nota-style.css`. Não crie um `style.css` separado nem
  links de folha de estilo bloqueantes.
- **`_data/pages.yml` é a fonte única** de título/descrição/URL de cada estado
  `<lang>-<view>`. Ele é compartilhado pelo Jekyll **e** pelo `script.js` (via
  JSON no `<head>`) — não duplique esses metadados em outro lugar.
- **Navegação sem reload é _progressive enhancement_.** Mantenha os links reais
  (`href`) e o atributo `data-nav`; garanta que tudo funcione **sem JavaScript**
  (recarga normal) e que a estrutura `.content-area` continue existindo.
- **Scripts que rodam antes do primeiro paint** (tema, banding) ficam inline no
  layout e levam `data-cfasync="false"` (para o Cloudflare Rocket Loader não os
  adiar). Não os mova para o `script.js` diferido.
- **A seção `/notas` é isolada.** Ela não usa `default.html`, `script.js` nem
  `_data/pages.yml`. Não a acople ao restante do site.
- **`sitemap.xml` é gerado** — não o edite à mão.
- **Serviços externos** (Cloudflare, Netlify, Formspree, Microsoft Clarity) estão
  documentados no [`README.md`](./README.md#serviços-externos). Os IDs estão
  versionados (não são segredos), mas não os altere sem necessidade.

## Como testar antes de finalizar

Rode o site localmente e valide as mudanças (Ruby 3.3):

```bash
bundle install
bundle exec jekyll build   # o site ainda compila?
bundle exec jekyll serve   # http://localhost:4000
```

O `build` é o primeiro passo por um motivo: um erro de Liquid só apareceria no
preview do Netlify, depois do push.

- **Performance:** meça com Lighthouse/PageSpeed (mobile e desktop) e confira os
  Core Web Vitals abaixo. Lembre que a minificação de CSS/JS só ocorre no build
  de produção — o preview do Netlify é o ambiente mais fiel ao publicado.
- **Sem JavaScript:** desative o JS e confirme que o texto, a navegação por links
  e o layout continuam legíveis. Exceção conhecida e aceita: nas notas, o
  seletor de normas e o botão de modo leitura somem — fica a norma principal, na
  tela dividida, com o nome dela num `<h2>` no lugar do seletor.
- **Teclado e leitores de tela:** navegue só com o teclado (skip link, foco
  visível, _focus trap_ do modal, `aria-current` no idioma ativo).
- **Temas e idiomas:** teste claro/escuro e PT/EN, incluindo a troca sem reload.
- **Movimento reduzido:** verifique com `prefers-reduced-motion` ativo.
- **Notas:** rode `python3 scripts/ancorar_referencias.py --check <slug>` e
  revise o diff; confira as remissões novas contra o texto legal. Rode também
  `python3 scripts/conferir_ementas.py` se mexeu em `_leis/` ou em
  `_data/ementas/`, e abra o sumário da lei seca no navegador para ver se a
  frase de cada artigo aparece inteira.
- **Modo leitura das notas:** em tela larga, expanda cada painel pelo botão da
  barra de título e confira que o outro sai, que o sumário vira coluna aberta ao
  lado do texto e que a coluna de texto não chega às bordas da tela. Abaixo de
  900px o botão não deve aparecer em nenhuma das duas abas — e medir só a aba
  ativa não basta, porque tudo dentro da inativa já mede zero.

### Performance: Core Web Vitals

- Toda alteração de código deve ser **testada para as métricas do Core Web
  Vitals** (LCP, INP e CLS), garantindo a melhor experiência ao usuário.
- Priorize especialmente **LCP ≤ 2,5 s**, **INP ≤ 200 ms** e **CLS ≤ 0,1**.
  Documentação de referência: <https://web.dev/articles/vitals>.
- Preserve as otimizações existentes: CSS inline, imagens AVIF/WebP com preload
  do LCP, _fallbacks_ de fonte ajustados por métrica, banding antes do paint e
  carregamento adiado do analytics.

### Acessibilidade (WCAG)

- Toda alteração de código deve ser **testada para acessibilidade** conforme a
  **última versão disponível do WCAG**.
- Garanta no mínimo o nível **AA (duplo A)**; busque **AAA (triplo A)** sempre que
  possível.
- Mantenha os recursos já presentes: skip link, HTML semântico, rótulos
  `aria-*`, `aria-current` no estado ativo, _focus trap_ no modal de contato,
  contraste adequado nos dois temas e respeito a `prefers-reduced-motion`.

### Usabilidade e responsividade

Garanta **layout responsivo**, com **animações fluidas** e visualização
agradável **também em mobile**.

### SEO e descoberta por agentes de IA

- A estrutura e o código devem **facilitar a indexação** por motores de busca e
  por agentes de IA generativa.
- Use **HTML semântico** e **metadados estruturados** (JSON-LD, Open Graph) tanto
  quanto possível.
- Preserve o **JSON-LD**, as tags Open Graph/Twitter, o `canonical`, os
  `hreflang` e a liberação de crawlers de IA no `robots.txt`.

## Fluxo de trabalho padrão

1. O agente cria uma branch **de nome curto** e realiza as alterações nela.
2. O **Netlify** publica automaticamente um deploy de preview da branch.
3. O **humano acessa a URL de preview** e valida as alterações manualmente.
4. Somente após a validação, o humano **solicita a criação do Pull Request**.
5. O humano faz **squash and merge** do PR na branch principal.

> Não crie o Pull Request sem solicitação explícita do humano.

**O nome da branch precisa ser curto — até cerca de 25 caracteres, contando o
prefixo `claude/`.** O preview do Netlify sai em `<branch>--<site>.netlify.app`,
e esse rótulo de subdomínio não pode passar de 63 caracteres; se estourar, o
preview simplesmente não é publicado e o passo 3 fica impossível. Bom:
`claude/notas-lgpd`, `claude/bio-links-audit`. Ruim:
`claude/public-legislation-notes-repo-8bvrdo` (43 caracteres). Não use o assunto
inteiro do pedido como nome da branch — resuma. Os detalhes e o comando de
renomear estão no [`README.md`](./README.md#nome-da-branch-limite-de-63-caracteres).

## Antes de finalizar (checklist)

- [ ] `bundle exec jekyll build` roda sem erro.
- [ ] Conteúdo alterado em pt-br **e** replicado em en-us com tom consistente
      (não se aplica às notas de legislação, que são pt-br apenas).
- [ ] Nas notas de legislação: aviso preservado, `ancorar_referencias.py --check`
      rodado e o diff revisado, remissões conferidas contra o texto legal e
      regras editoriais observadas.
- [ ] `conferir_ementas.py` sem erro, se `_leis/` ou `_data/ementas/` mudaram.
- [ ] `atualizado_em` da nota alterado se o conteúdo dos comentários mudou.
- [ ] Biografia gerada por IA segue NPOV, com afirmações verificáveis e
      referências citadas após cada afirmação.
- [ ] `last_modified` de `bio.md` e `en/bio.md` atualizado (mesma data) se o
      recorte de fontes da biografia mudou.
- [ ] Resumo da home não foi alterado sem solicitação explícita.
- [ ] Padrões técnicos preservados (sem novas dependências; CSS em
      `_includes/style.css`; `_data/pages.yml` como fonte única; navegação
      funciona sem JS).
- [ ] Acessibilidade verificada (WCAG, no mínimo AA), inclusive teclado e ambos
      os temas.
- [ ] Core Web Vitals verificados (LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1).
- [ ] Layout responsivo e fluido, inclusive em mobile.
- [ ] HTML semântico e metadados estruturados (JSON-LD, OG, hreflang, sitemap,
      robots) preservados/aprimorados.
