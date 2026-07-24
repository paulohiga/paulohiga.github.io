# Guia para agentes de IA generativa

Este documento orienta agentes de IA (Claude Code, Gemini CLI, ChatGPT Codex e
afins) que contribuem com o site [higa.me](https://higa.me). Leia-o antes de
qualquer alteração e siga estas diretrizes em conjunto com o
[`README.md`](./README.md), que descreve a estrutura do projeto, a arquitetura e
como atualizar o conteúdo. Os arquivos `CLAUDE.md` e `GEMINI.md` apontam para
este guia.

## Visão geral do projeto

O site é processado por **Jekyll no GitHub Pages**, com build próprio via GitHub
Actions. A premissa central é manter o **conteúdo textual em Markdown** separado
do **código** (HTML/JS/CSS), para facilitar a manutenção. Antes de editar código,
leia a seção **"Como o site funciona (arquitetura)"** do `README.md` — ela
explica a navegação sem reload, o tema pré-paint, as faixas full-bleed, a
estratégia de performance e os dados estruturados.

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
  atualize em edições que não mudam o recorte das fontes (ver `README.md`).

## Padrões técnicos a preservar

Ao mexer no código, mantenha as decisões de arquitetura que sustentam a
performance e a acessibilidade do site:

- **Sem dependências novas.** Nada de Font Awesome, jQuery, frameworks CSS/JS ou
  bundlers. Ícones são **SVG inline** ou **máscaras CSS**; o comportamento é um
  único `script.js`.
- **CSS é editado em `_includes/style.css`** (inserido inline no `<head>`). Não
  crie um `style.css` separado nem links de folha de estilo bloqueantes.
- **`_data/pages.yml` é a fonte única** de título/descrição/URL de cada estado
  `<lang>-<view>`. Ele é compartilhado pelo Jekyll **e** pelo `script.js` (via
  JSON no `<head>`) — não duplique esses metadados em outro lugar.
- **Navegação sem reload é _progressive enhancement_.** Mantenha os links reais
  (`href`) e o atributo `data-nav`; garanta que tudo funcione **sem JavaScript**
  (recarga normal) e que a estrutura `.content-area` continue existindo.
- **Scripts que rodam antes do primeiro paint** (tema, banding) ficam inline no
  layout e levam `data-cfasync="false"` (para o Cloudflare Rocket Loader não os
  adiar). Não os mova para o `script.js` diferido.
- **Serviços externos** (Cloudflare, Netlify, Formspree, Microsoft Clarity) estão
  documentados no `README.md`. Os IDs estão versionados (não são segredos), mas
  não os altere sem necessidade.

## Como testar antes de finalizar

Rode o site localmente e valide as mudanças:

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

- **Performance:** meça com Lighthouse/PageSpeed (mobile e desktop) e confira os
  Core Web Vitals abaixo. Lembre que a minificação de CSS/JS só ocorre no build
  de produção — o preview do Netlify é o ambiente mais fiel ao publicado.
- **Sem JavaScript:** desative o JS e confirme que o texto, a navegação por links
  e o layout continuam legíveis.
- **Teclado e leitores de tela:** navegue só com o teclado (skip link, foco
  visível, _focus trap_ do modal, `aria-current` no idioma ativo).
- **Temas e idiomas:** teste claro/escuro e PT/EN, incluindo a troca sem reload.
- **Movimento reduzido:** verifique com `prefers-reduced-motion` ativo.

## Performance: Core Web Vitals

- Toda alteração de código deve ser **testada para as métricas do Core Web
  Vitals** (LCP, INP e CLS), garantindo a melhor experiência ao usuário.
- Consulte a documentação de referência: <https://web.dev/articles/vitals>.
- Priorize especialmente **LCP ≤ 2,5 s**, **INP ≤ 200 ms** e **CLS ≤ 0,1**.
- Preserve as otimizações existentes: CSS inline, imagens AVIF/WebP com preload
  do LCP, _fallbacks_ de fonte ajustados por métrica, banding antes do paint e
  carregamento adiado do analytics (ver `README.md`).

## Acessibilidade (WCAG)

- Toda alteração de código deve ser **testada para acessibilidade** conforme a
  **última versão disponível do WCAG**.
- Garanta no mínimo o nível **AA (duplo A)**; busque **AAA (triplo A)** sempre que
  possível.
- Mantenha os recursos já presentes: skip link, HTML semântico, rótulos
  `aria-*`, `aria-current` no estado ativo, _focus trap_ no modal de contato,
  contraste adequado nos dois temas e respeito a `prefers-reduced-motion`.

## Usabilidade e responsividade

- Garanta **layout responsivo**, com **animações fluidas** e visualização
  agradável **também em mobile**.

## SEO e descoberta por agentes de IA

- A estrutura e o código devem **facilitar a indexação** por motores de busca e
  por agentes de IA generativa.
- Use **HTML semântico** e **metadados estruturados** (JSON-LD, Open Graph) tanto
  quanto possível.
- Preserve o **JSON-LD** (`schema.org/Person`), as tags Open Graph/Twitter, o
  `canonical`, os `hreflang` e a liberação de crawlers de IA no `robots.txt`
  (ver `README.md`).

## Fluxo de trabalho padrão

1. O agente cria uma branch automaticamente e realiza as alterações nela.
2. O **Netlify** detecta o push e faz o deploy de preview da branch
   automaticamente (build com Jekyll).
3. O **humano acessa a URL de preview** gerada pelo Netlify e valida as
   alterações manualmente.
4. Somente após a validação, o humano **solicita a criação do Pull Request**.
5. O humano faz **squash and merge** do PR na branch principal.

> Não crie o Pull Request sem solicitação explícita do humano.

## Antes de finalizar (checklist)

- [ ] Conteúdo alterado em pt-br **e** replicado em en-us com tom consistente.
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

## Sitemap (`<lastmod>`)

O `sitemap.xml` é **gerado automaticamente** e **não exige ação manual**. Ele é
um template Liquid que monta as URLs e os links `hreflang` a partir de
`_data/pages.yml`, e preenche o `<lastmod>` de cada página com a **data do último
commit** que tocou o arquivo (plugin `jekyll-last-modified-at`, no build via
GitHub Actions). **Não edite `sitemap.xml` diretamente** e **não é preciso**
manter datas à mão: basta commitar a alteração de conteúdo.

> O build de produção roda pelo workflow `.github/workflows/pages.yml` (não pelo
> build padrão do GitHub Pages), o que permite usar plugins fora da allowlist do
> Pages. Para o `<lastmod>` do sitemap, o campo `last_modified` do front matter
> serve apenas de fallback caso o histórico do git não esteja disponível — mas,
> nas biografias, esse mesmo campo define a data-limite do aviso de conteúdo
> gerado por IA e é mantido à mão (ver regras da biografia, acima).
