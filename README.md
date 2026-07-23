# higa.me

Site pessoal de Paulo Higa, publicado via **GitHub Pages (Jekyll)** em
[higa.me](https://higa.me).

O site é compilado pelo Jekyll com uma premissa central: o **conteúdo** (texto)
fica separado do **código** (HTML/CSS/JS). Atualizar a biografia é só editar
arquivos Markdown — toda a apresentação (cartão, ícones, tabelas, índice,
referências, faixas coloridas) é montada pelo layout e pelo CSS.

> **Agentes de IA generativa** (Claude Code, Gemini CLI, ChatGPT Codex etc.):
> leiam [`AGENTS.md`](./AGENTS.md) antes de qualquer alteração. Os arquivos
> [`CLAUDE.md`](./CLAUDE.md) e [`GEMINI.md`](./GEMINI.md) apontam para lá.

## Índice

- [Tecnologias](#tecnologias)
- [Estrutura de diretórios](#estrutura-de-diretórios)
- [Como o site funciona (arquitetura)](#como-o-site-funciona-arquitetura)
- [Serviços externos](#serviços-externos)
- [Como atualizar o conteúdo](#como-atualizar-o-conteúdo)
- [Rodar localmente](#rodar-localmente)
- [Publicação](#publicação)

## Tecnologias

- **Jekyll** (via gem `github-pages`) — gerador estático.
- **GitHub Pages** com build próprio no **GitHub Actions**
  (`.github/workflows/pages.yml`), em vez do build padrão do Pages. Isso permite
  usar o plugin `jekyll-last-modified-at` (fora da allowlist do Pages) e
  minificar CSS/JS no deploy.
- **HTML/CSS/JS sem frameworks nem dependências de runtime.** Sem Font Awesome,
  sem jQuery, sem bundler: os ícones são SVG inline ou máscaras CSS, e o
  JavaScript é um único `script.js` de _progressive enhancement_.
- **Fontes Inter e Merriweather**, servidas pelo Cloudflare Fonts, com
  _fallbacks_ locais ajustados por métrica (Capsize) para não causar reflow.
- Serviços externos: **Cloudflare**, **Netlify**, **Formspree** e
  **Microsoft Clarity** (ver [Serviços externos](#serviços-externos)).

## Estrutura de diretórios

```
.
├── .github/workflows/
│   └── pages.yml           # Build (Jekyll) + minificação + deploy no GitHub Pages
├── _config.yml             # Configuração do Jekyll (permalink, plugins, exclude)
├── _data/
│   └── pages.yml           # Metadados de cada estado <lang>-<view> (fonte única)
├── _layouts/
│   └── default.html        # Casca da página (head, herói, conteúdo, rodapé, form)
├── _includes/
│   ├── head.html           # <head>: meta tags, Open Graph, JSON-LD, CSS inline
│   ├── toolbar.html        # Seletor de idioma + tema (ícones SVG inline)
│   ├── hero-compact.html   # Cabeçalho fixo compacto, revelado ao rolar
│   ├── sidebar.html        # Herói: foto, nome, localização, ações
│   ├── contact-form.html   # Formulário de contato (modal → Formspree)
│   ├── ai-disclaimer.html  # Aviso de conteúdo gerado por IA (só na bio completa),
│   │                       #   com a data-limite das fontes (last_modified)
│   └── style.css           # Todo o CSS — inserido inline no <head> de cada página
│
├── index.md                # Conteúdo: resumo em português        → /
├── bio.md                  # Conteúdo: biografia completa (PT)     → /bio
├── en/index.md             # Conteúdo: resumo em inglês            → /en/
├── en/bio.md               # Conteúdo: biografia completa (EN)     → /en/bio
│
├── script.js               # Tema, navegação sem reload, banding, herói compacto,
│                           #   scroll reveal, animações e formulário de contato
├── sitemap.xml             # Template Liquid: gera o sitemap automaticamente
├── robots.txt              # Política de crawlers (robôs de IA liberados)
├── site.webmanifest        # Web App Manifest (PWA básico)
├── CNAME                   # Domínio do GitHub Pages (higa.me)
├── Gemfile                 # Gems (github-pages + jekyll-last-modified-at)
├── AGENTS.md               # Guia para agentes de IA · CLAUDE.md/GEMINI.md apontam aqui
├── img/                    # Imagens (foto do herói em AVIF/WebP/JPG, og-image, bg)
└── favicon*, apple-touch-icon.png, android-chrome-*.png   # Ícones
```

## Como o site funciona (arquitetura)

Esta seção descreve **como as peças se encaixam** — útil para quem for mexer no
código. Para só atualizar o texto, pule para
[Como atualizar o conteúdo](#como-atualizar-o-conteúdo).

### Páginas, estados e metadados

O site tem **quatro páginas**, uma para cada combinação de idioma e visão:

| Arquivo       | `lang` | `view`  | Chave (`<lang>-<view>`) | URL      |
| ------------- | ------ | ------- | ----------------------- | -------- |
| `index.md`    | `pt`   | `short` | `pt-short`              | `/`      |
| `bio.md`      | `pt`   | `full`  | `pt-full`               | `/bio`   |
| `en/index.md` | `en`   | `short` | `en-short`              | `/en/`   |
| `en/bio.md`   | `en`   | `full`  | `en-full`               | `/en/bio`|

Cada página declara no front matter `lang`, `view`, `permalink` e
`last_modified`. A chave `<lang>-<view>` indexa os metadados em
**`_data/pages.yml`** (título, descrição, URL canônica, locale). Esse arquivo é a
**fonte única de verdade**: o Jekyll o consome ao renderizar (via
`site.data.pages`) e o `script.js` recebe o mesmo objeto embutido como JSON no
`<head>` (`<script id="page-meta">`), para reaproveitá-lo na navegação
client-side. Ao alterar um título/descrição, mexa **apenas** em `_data/pages.yml`.

### Layout, includes e conteúdo

O `_layouts/default.html` é a **casca** compartilhada pelas quatro páginas:
toolbar, herói, herói compacto, área de conteúdo, rodapé e modal de contato,
montados a partir dos `_includes/`. As páginas `.md` contêm **apenas o texto**
(mais algumas anotações de classe do kramdown — ver
[Como atualizar o conteúdo](#como-atualizar-o-conteúdo)); o layout injeta esse
texto em `<article class="content-area">`. Só a página do idioma/visão ativos é
renderizada em cada URL — a troca para as outras é feita sem recarregar.

> O layout remove, via filtros `replace`, os papéis DPUB-ARIA obsoletos
> (`doc-endnote`/`doc-noteref`) que o kramdown injeta na marcação de notas de
> rodapé, mantendo o HTML limpo para leitores de tela.

### Faixas full-bleed (banding)

O conteúdo é fatiado em **faixas de largura total** (`<section class="band">`)
com fundos alternados. A função `window.bandContent` (definida inline no layout e
reutilizada pelo `script.js`) percorre os elementos do conteúdo e inicia uma nova
faixa a cada `##` (`<h2>`) ou dica de contato. Ela roda **antes do primeiro
paint**, para o texto já nascer na coluna de leitura estreita e não "piscar" em
largura total (evitando CLS). **Sem JavaScript**, o texto cai num fluxo simples e
legível.

### Navegação sem reload (client-side)

Trocar de idioma (PT/EN) ou abrir/recolher a biografia **não recarrega a
página**. O `script.js` intercepta cliques em links marcados com `data-nav`,
busca o HTML da URL de destino (`fetch`), extrai o `.content-area` e o troca no
lugar, atualizando `<title>`, meta tags, `<link rel=canonical>`, `lang`,
`history` (pushState/popstate) e os controles da interface. Os fragmentos são
**cacheados** e **pré-carregados no hover/focus**, então a troca é instantânea.
Tudo é _progressive enhancement_: os links são reais (`href` para `/`, `/bio`,
`/en/`, `/en/bio`), então sem JS a navegação funciona por recarga normal.

### Tema claro/escuro

O tema é aplicado **antes do primeiro paint** por um script inline no layout, que
lê `localStorage.theme` (ou `prefers-color-scheme` na primeira visita) e define a
classe `dark-theme`/`light-theme` no `<body>` — evitando o flash de tema errado.
O `script.js` apenas alterna a classe e persiste a escolha quando o usuário clica
no botão de tema (na toolbar ou no herói compacto). Os scripts que precisam rodar
antes do paint levam `data-cfasync="false"` para o Cloudflare Rocket Loader não
os adiar.

### Herói compacto, scroll reveal e animação

- **Herói compacto fixo:** ao rolar para fora do herói principal, um cabeçalho
  compacto (foto, nome, controles de idioma/tema/contato) desliza no topo. A
  detecção usa `IntersectionObserver`.
- **Scroll reveal:** as faixas surgem com uma animação suave conforme entram na
  viewport (também via `IntersectionObserver`). Respeita
  `prefers-reduced-motion`.
- **Gradiente animado do herói:** começa **na primeira interação** do visitante
  (não no load), para não ficar repintando os frames de que o Speed Index é
  calculado.

### Formulário de contato

O modal de contato (`_includes/contact-form.html`) envia via **Formspree**. O
`script.js` cuida da abertura/fechamento, validação, mensagens de status,
tradução PT/EN dos rótulos e _focus trap_ (acessibilidade). Paulo não usa redes
sociais; o formulário e o LinkedIn são os canais de contato.

### Ícones e fontes

- **Ícones:** SVG inline (LinkedIn, alfinete, prédio, sol/lua, e-mail) ou
  **máscaras CSS** (ícones de seção). **Não há Font Awesome** nem qualquer
  dependência de ícones.
- **Fontes:** Inter (texto) e Merriweather (títulos/nome), carregadas pelo
  Cloudflare Fonts. `@font-face` com _fallbacks_ locais (Arial/Georgia)
  ajustados por métrica (`size-adjust`, `ascent-override` etc., calculados com
  Capsize) ocupam o mesmo espaço da fonte final — o _swap_ não move o layout
  (CLS ~0) nem gera um LCP maior depois.

### Performance (Core Web Vitals)

O site é otimizado para nota alta de PageSpeed em mobile e desktop:

- **CSS inline no `<head>`** de cada página (via `{% include style.css %}`),
  removendo o request bloqueante de `style.css` do caminho crítico.
- **Minificação no deploy:** o workflow minifica `_includes/style.css`
  (lightningcss) e `script.js` (terser) **só na produção**; os previews do
  Netlify usam os fontes legíveis.
- **Imagens responsivas:** a foto do herói (LCP) é servida em **AVIF/WebP/JPG**
  via `<picture>`, com `srcset`/`sizes`, `fetchpriority="high"`,
  `decoding="sync"` e um `<link rel="preload">` responsivo em AVIF.
- **Analytics adiado:** o Microsoft Clarity carrega só após o `load` + `idle`,
  para não competir por rede/CPU durante o carregamento (TBT).
- **Banding e tema antes do paint**, para não haver reflow após o load.

### SEO e dados estruturados

- **JSON-LD** (`schema.org/Person`) em `_includes/head.html`, com nome, datas,
  formação, empregador, redes e `subjectOf` apontando para a biografia.
- **Open Graph** e **Twitter Card** completos (com `og:image` 1200×630).
- **`<link rel="canonical">`** por página e **`hreflang`** (`pt-BR`, `en`,
  `x-default`) ligando as versões de idioma.
- **`robots.txt`** libera explicitamente crawlers de IA (OAI-SearchBot,
  ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, GPTBot etc.), para o
  site poder ser citado por assistentes e buscas com IA.
- **`sitemap.xml`** gerado automaticamente (ver [Publicação](#publicação)).

## Serviços externos

Quatro serviços de terceiros participam do site. Os identificadores estão
versionados no código-fonte (não são segredos), mas troque-os com cuidado.

| Serviço               | Papel                                                                 | Onde vive no código |
| --------------------- | --------------------------------------------------------------------- | ------------------- |
| **Cloudflare**        | CDN/proxy do domínio. **Rocket Loader** adia scripts (por isso os que precisam rodar antes do paint levam `data-cfasync="false"`). **Cloudflare Fonts** reescreve o `<link>` do Google Fonts, inlina o CSS e serve os `woff2` a partir de `higa.me` (sem `preconnect` ao Google). | Configurado no painel da Cloudflare. No código: atributos `data-cfasync="false"` (`_layouts/default.html`, `_includes/head.html`) e o `<link>` de fontes em `_includes/head.html`. |
| **Netlify**           | Publica uma **URL de preview** a cada push de branch (build com Jekyll), para validação manual antes do PR. | Configurado no painel do Netlify (não há `netlify.toml` no repositório). |
| **Formspree**         | Recebe as mensagens do formulário de contato.                         | `action` do form em `_includes/contact-form.html` (endpoint `/f/xdklqqqg`). |
| **Microsoft Clarity** | Analytics de comportamento (heatmaps, gravações).                     | Snippet em `_includes/head.html` (project id `x1sidv15u2`), carregado só no idle. |

## Como atualizar o conteúdo

Edite os arquivos `.md` — não é preciso mexer em HTML/CSS/JS.

- **Resumo (home):** `index.md` (PT) e `en/index.md` (EN).
- **Biografia completa:** `bio.md` (PT) e `en/bio.md` (EN).

Toda alteração de conteúdo deve ser **replicada nos dois idiomas** (ver
`AGENTS.md`). O `sitemap.xml` é gerado automaticamente — basta commitar a
alteração; não edite datas à mão (ver [Publicação](#publicação)).

### Anotações de classe (kramdown IAL)

Apesar de o texto ser Markdown puro, alguns trechos levam _atributos inline_ do
kramdown (`{:.classe}`) que o layout/CSS usam para estilizar. Ao criar uma seção
nova, replique o padrão de uma existente:

- Parágrafo de abertura da home: `{:.intro-text}`.
- Título de seção da home: `## Título` seguido de
  `{:.bio-section .icon-public}` (ou `.icon-private` / `.icon-personal`) — a
  classe `icon-*` escolhe o ícone da seção.
- Dica de contato ao final da home: `{:.contact-hint}` (também inicia uma faixa).
- Link que abre/recolhe a biografia: leva um IAL com `.bio-toggle-btn`/
  `.bio-collapse-btn` e `data-nav`.

### Títulos de seção e índice

Os `##` / `###` viram seções; o índice da biografia é gerado automaticamente a
partir deles (`{:toc}`). Cada `##` também inicia uma nova faixa full-bleed. Não
há numeração ou âncoras para manter à mão.

### Referências (notas de rodapé)

As citações usam notas de rodapé do Markdown. No texto:

```markdown
... aprovado no curso de formação para a carreira de EPPGG[^1] ...
```

E a definição (em qualquer lugar do arquivo, normalmente no fim):

```markdown
[^1]: Carreira de EPPGG – Portal do Servidor. [gov.br/servidor](https://www.gov.br/...)
```

A lista de referências e a numeração `[1]`, `[2]`… são geradas automaticamente,
**na ordem em que aparecem no texto**. A chave (`^1`) é só um rótulo interno —
pode reutilizá-la várias vezes para citar a mesma fonte.

### Data-limite do aviso de IA (`last_modified`)

A biografia completa abre com um aviso de conteúdo gerado por IA que informa a
data-limite das fontes ("…fontes públicas disponíveis até X"). Essa data vem do
campo `last_modified` do front matter de `bio.md` e `en/bio.md` — uma data
**editorial**, mantida à mão (não é a data do último commit; edições que não
mudam o recorte das fontes não a alteram). Ao atualizar a biografia com fontes
mais recentes, **atualize o campo nos dois arquivos**, com a mesma data. O
`ai-disclaimer.html` formata essa data por extenso no idioma da página. O campo
também serve de _fallback_ para o `<lastmod>` do sitemap quando o histórico do
git não está disponível.

### Adicionar uma maratona

As tabelas de provas ficam em `bio.md` / `en/bio.md` como **HTML simples**
(preservam legenda, `scope` e acessibilidade). Para registrar uma prova, copie
uma linha `<tr>…</tr>` e ajuste os valores. Mantenha a coerência entre os dois
idiomas.

## Rodar localmente

```bash
bundle install
bundle exec jekyll serve
```

O site fica em `http://localhost:4000`. Os mesmos gems do GitHub Pages são usados
(ver `Gemfile`), então o resultado local é igual ao publicado — mas o CSS/JS
**não** é minificado localmente (a minificação roda só no deploy de produção).

## Publicação

### Fluxo padrão (branches de feature)

1. O agente cria uma branch e faz push das alterações.
2. O **Netlify** detecta o push e publica automaticamente uma **URL de preview**
   (build com Jekyll).
3. O humano acessa a URL de preview e **valida manualmente** as alterações.
4. Após validação, o humano solicita a criação do Pull Request.
5. O humano realiza **squash and merge** do PR na branch `master`.

> Não crie o Pull Request sem solicitação explícita do humano.

### Build de produção

O site de produção ([higa.me](https://higa.me)) é compilado e publicado pelo
workflow do GitHub Actions em `.github/workflows/pages.yml` a cada push na branch
`master`. O workflow: (1) faz checkout com histórico completo (`fetch-depth: 0`),
(2) minifica CSS/JS, (3) roda `jekyll build` com `JEKYLL_ENV=production` e
(4) publica no GitHub Pages.

Esse build próprio (em vez do build padrão do GitHub Pages) permite usar o plugin
`jekyll-last-modified-at`, que preenche o `<lastmod>` do `sitemap.xml` com a data
do último commit de cada página — por isso o histórico do git é buscado por
completo e não é preciso editar datas manualmente.

> **Configuração necessária no GitHub (uma vez):** em **Settings → Pages**,
> defina **Source = GitHub Actions**. Sem isso, o workflow compila mas não
> publica.
