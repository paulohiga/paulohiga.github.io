# Como o site funciona

Esta é a explicação de **como as peças se encaixam** — para quem for mexer no
código. Para só atualizar o texto das páginas, veja
[Como atualizar o conteúdo](../README.md#como-atualizar-o-conteúdo) no
`README.md`. A seção de notas de legislação tem arquitetura própria, isolada
desta, e está em [`notas.md`](./notas.md).

## Índice

- [Páginas, estados e metadados](#páginas-estados-e-metadados)
- [Layout, includes e conteúdo](#layout-includes-e-conteúdo)
- [Faixas full-bleed (banding)](#faixas-full-bleed-banding)
- [Navegação sem reload (client-side)](#navegação-sem-reload-client-side)
- [Tema claro/escuro](#tema-claroescuro)
- [Herói compacto, scroll reveal e animação](#herói-compacto-scroll-reveal-e-animação)
- [Formulário de contato](#formulário-de-contato)
- [Ícones e fontes](#ícones-e-fontes)
- [Performance (Core Web Vitals)](#performance-core-web-vitals)
- [Build reprodutível e quality gate](#build-reprodutível-e-quality-gate)
- [SEO e dados estruturados](#seo-e-dados-estruturados)
- [Sitemap (`<lastmod>`)](#sitemap-lastmod)

## Páginas, estados e metadados

O site de apresentação tem **quatro páginas**, uma para cada combinação de
idioma e visão:

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

A seção `/notas` **não** participa desse esquema: ela é só em pt-br, não tem
estados de idioma e não passa por `_data/pages.yml`.

## Layout, includes e conteúdo

O `_layouts/default.html` é a **casca** compartilhada pelas quatro páginas:
toolbar, herói, herói compacto, área de conteúdo, rodapé e modal de contato,
montados a partir dos `_includes/`. As páginas `.md` contêm **apenas o texto**
(mais algumas anotações de classe do kramdown — ver
[Como atualizar o conteúdo](../README.md#como-atualizar-o-conteúdo)); o layout
injeta esse texto em `<article class="content-area">`. Só a página do
idioma/visão ativos é renderizada em cada URL — a troca para as outras é feita
sem recarregar.

> O layout remove, via filtros `replace`, os papéis DPUB-ARIA obsoletos
> (`doc-endnote`/`doc-noteref`) que o kramdown injeta na marcação de notas de
> rodapé, mantendo o HTML limpo para leitores de tela.

## Faixas full-bleed (banding)

O conteúdo é fatiado em **faixas de largura total** (`<section class="band">`)
com fundos alternados. A função `window.bandContent` (definida inline no layout e
reutilizada pelo `script.js`) percorre os elementos do conteúdo e inicia uma nova
faixa a cada `##` (`<h2>`) ou dica de contato. Ela roda **antes do primeiro
paint**, para o texto já nascer na coluna de leitura estreita e não "piscar" em
largura total (evitando CLS). **Sem JavaScript**, o texto cai num fluxo simples e
legível.

## Navegação sem reload (client-side)

Trocar de idioma (PT/EN) ou abrir/recolher a biografia **não recarrega a
página**. O `script.js` intercepta cliques em links marcados com `data-nav`,
busca o HTML da URL de destino (`fetch`), extrai o `.content-area` e o troca no
lugar, atualizando `<title>`, meta tags, `<link rel=canonical>`, `lang`,
`history` (pushState/popstate) e os controles da interface. Os fragmentos são
**cacheados** e **pré-carregados no hover/focus**, então a troca é instantânea.
Tudo é _progressive enhancement_: os links são reais (`href` para `/`, `/bio`,
`/en/`, `/en/bio`), então sem JS a navegação funciona por recarga normal.

## Tema claro/escuro

O tema é aplicado **antes do primeiro paint** por um script inline no layout, que
lê `localStorage.theme` (ou `prefers-color-scheme` na primeira visita) e define a
classe `dark-theme`/`light-theme` no `<body>` — evitando o flash de tema errado.
O `script.js` apenas alterna a classe e persiste a escolha quando o usuário clica
no botão de tema (na toolbar ou no herói compacto). Os scripts que precisam rodar
antes do paint levam `data-cfasync="false"` para o Cloudflare Rocket Loader não
os adiar.

## Herói compacto, scroll reveal e animação

- **Herói compacto fixo:** ao rolar para fora do herói principal, um cabeçalho
  compacto (foto, nome, controles de idioma/tema/contato) desliza no topo. A
  detecção usa `IntersectionObserver`.
- **Scroll reveal:** as faixas surgem com uma animação suave conforme entram na
  viewport (também via `IntersectionObserver`). Respeita
  `prefers-reduced-motion`.
- **Gradiente animado do herói:** começa **na primeira interação** do visitante
  (não no load), para não ficar repintando os frames de que o Speed Index é
  calculado.

## Formulário de contato

O modal de contato (`_includes/contact-form.html`) envia via **Formspree** (ver
[Serviços externos](../README.md#serviços-externos)). O `script.js` cuida da
abertura/fechamento, validação, mensagens de status, tradução PT/EN dos rótulos
e _focus trap_ (acessibilidade). Paulo não usa redes sociais; o formulário e o
LinkedIn são os canais de contato.

## Ícones e fontes

- **Ícones:** SVG inline (LinkedIn, alfinete, prédio, sol/lua, e-mail) ou
  **máscaras CSS** (ícones de seção). **Não há Font Awesome** nem qualquer
  dependência de ícones.
- **Fontes:** Inter (texto) e Merriweather (títulos/nome), carregadas pelo
  Cloudflare Fonts. `@font-face` com _fallbacks_ locais (Arial/Georgia)
  ajustados por métrica (`size-adjust`, `ascent-override` etc., calculados com
  Capsize) ocupam o mesmo espaço da fonte final — o _swap_ não move o layout
  (CLS ~0) nem gera um LCP maior depois.

## Performance (Core Web Vitals)

O site é otimizado para nota alta de PageSpeed em mobile e desktop:

- **CSS inline no `<head>`** de cada página (via `{% include style.css %}`),
  removendo o request bloqueante de `style.css` do caminho crítico.
- **Minificação no deploy:** o workflow minifica `_includes/style.css` e
  `_includes/nota-style.css` (lightningcss) e `script.js` e `notas.js` (terser)
  **só na produção**; os previews do Netlify usam os fontes legíveis. Ver
  [Build de produção](../README.md#build-de-produção).
- **Imagens responsivas:** a foto do herói (LCP) é servida em **AVIF/WebP/JPG**
  via `<picture>`, com `srcset`/`sizes`, `fetchpriority="high"`,
  `decoding="sync"` e um `<link rel="preload">` responsivo em AVIF.
- **Analytics adiado:** o Microsoft Clarity carrega só após o `load` + `idle`,
  para não competir por rede/CPU durante o carregamento (TBT).
- **Banding e tema antes do paint**, para não haver reflow após o load.

As metas por métrica (LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1) e o que testar
antes de finalizar estão no [`AGENTS.md`](../AGENTS.md#como-testar-antes-de-finalizar).

## Build reprodutível e quality gate

O repositório separa o workflow que verifica o código do workflow que publica o
site:

- [`.github/workflows/quality.yml`](../.github/workflows/quality.yml) roda os
  checks em pull requests, em pushes na `master` e por execução manual. Ele
  constrói o site e valida o resultado antes de considerá-lo saudável.
- [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) instala as
  mesmas ferramentas, minifica os arquivos de produção e publica o resultado no
  GitHub Pages.

Os dois workflows fixam Ruby `3.3.12` e Bundler `4.0.16`. O Node é definido por
`.node-version` (`22.22.2`), e as dependências Ruby e Node são resolvidas pelos
lockfiles versionados (`Gemfile.lock` e `package-lock.json`). As dependências
Python dos scripts estão pinadas em
[`scripts/requirements.txt`](../scripts/requirements.txt), e o CI usa Python
`3.11.6`.

Essa separação preserva os fontes legíveis nos previews e reserva a minificação
ao deploy de produção. Lightning CSS `1.33.0` e Terser `5.50.0` são instalados
com `npm ci`; o deploy chama `npx --no-install`, de modo que a execução falha se
as versões registradas não estiverem disponíveis em vez de buscar uma versão
indefinida.

O quality gate executa, nesta ordem lógica:

1. instala os runtimes e dependências fixados;
2. verifica os minificadores sem alterar os fontes versionados;
3. roda `bundle exec jekyll build`;
4. verifica a sintaxe de `script.js` e `notas.js`;
5. compila todos os Python de `scripts/`;
6. confere as ementas e as âncoras das notas;
7. roda [`scripts/verificar_site.py`](../scripts/verificar_site.py), que lê
   `_site/` e verifica links internos, fragmentos e IDs duplicados;
8. executa `git diff --check` sobre a alteração relevante do evento do CI.

`verificar_site.py` também considera os HTML de
`_site/notas/fragmentos/`, pois a seção `/notas` carrega parte das âncoras sob
demanda. Para links no formato `/notas/<slug>#<prefixo>`, ele também valida o
`data-norma-prefixo` registrado no documento: esse é o contrato de uma âncora
que abre uma norma inteira, sem dispositivo, e não um `id` HTML literal. Links
externos, `mailto:`, `tel:` e URLs JavaScript ficam fora do escopo: o teste
garante a integridade do site publicado, sem depender da disponibilidade de
serviços externos.

O quality gate não altera conteúdo editorial nem grava arquivos no repositório.
A minificação do workflow de publicação ocorre no checkout efêmero do runner;
os arquivos minificados são usados para gerar o deploy e não representam uma
mudança editorial nos fontes.

## SEO e dados estruturados

- **JSON-LD** (`schema.org/Person`) em `_includes/head.html`, com nome, datas,
  formação, empregador, redes e `subjectOf` apontando para a biografia. As notas
  usam `schema.org/Article`, em `_includes/nota-head.html`.
- **Open Graph** e **Twitter Card** completos (com `og:image` 1200×630).
- **`<link rel="canonical">`** por página e **`hreflang`** (`pt-BR`, `en`,
  `x-default`) ligando as versões de idioma.
- **`robots.txt`** libera explicitamente crawlers de IA (OAI-SearchBot,
  ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, GPTBot etc.), para o
  site poder ser citado por assistentes e buscas com IA. Bloqueia só
  `/notas/fragmentos/`, que não são páginas (ver [`notas.md`](./notas.md)).

## Sitemap (`<lastmod>`)

O `sitemap.xml` é **gerado automaticamente** e **não exige ação manual** — não o
edite à mão. É um template Liquid que monta as URLs e os links `hreflang` a
partir de `_data/pages.yml`, e depois acrescenta a página `/notas` e cada nota
de `site.notas`.

O `<lastmod>` de cada URL vem da **data do último commit** que tocou o arquivo,
pelo plugin `jekyll-last-modified-at` — que só funciona porque o build roda no
GitHub Actions com `fetch-depth: 0`, e não pelo build padrão do GitHub Pages
(ver [Build de produção](../README.md#build-de-produção)). Basta commitar a
alteração de conteúdo.

Quando o histórico do git não está disponível, o template cai para um campo do
front matter: `last_modified` nas quatro páginas de apresentação,
`atualizado_em` nas notas. Cuidado com o primeiro: nas biografias esse mesmo
campo tem uma segunda função, editorial, e é mantido à mão — ver
[Data-limite do aviso de IA](../README.md#data-limite-do-aviso-de-ia-last_modified).
