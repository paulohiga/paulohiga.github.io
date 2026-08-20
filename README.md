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

## Onde está cada coisa

| Documento | Para quê |
| --- | --- |
| **`README.md`** (este) | O que é o projeto, como editar o texto, como rodar e como publicar |
| [`docs/arquitetura.md`](./docs/arquitetura.md) | Como o site funciona por dentro: banding, navegação sem reload, tema pré-paint, fontes, performance, SEO, sitemap |
| [`docs/notas.md`](./docs/notas.md) | A seção `/notas`: estrutura, esquema de âncoras, normas extras, EUR-Lex, scripts |
| [`docs/notas-navegacao.md`](./docs/notas-navegacao.md) | Backlog de melhorias de navegação de `/notas`: o que foi medido, o que já foi feito e o que falta |
| [`docs/changelog.md`](./docs/changelog.md) | Registro histórico das atualizações de conteúdo — o que mudou, quando e com base em quê |
| [`AGENTS.md`](./AGENTS.md) | Regras de contribuição para agentes de IA — inclusive as regras editoriais das notas |

## Índice

- [Tecnologias](#tecnologias)
- [Estrutura de diretórios](#estrutura-de-diretórios)
- [Como atualizar o conteúdo](#como-atualizar-o-conteúdo)
- [Rodar localmente](#rodar-localmente)
- [Publicação](#publicação)
- [Serviços externos](#serviços-externos)

## Tecnologias

- **Jekyll** (via gem `github-pages`) — gerador estático.
- **GitHub Pages** com build próprio no **GitHub Actions**
  (`.github/workflows/pages.yml`), em vez do build padrão do Pages. Isso permite
  usar o plugin `jekyll-last-modified-at` (fora da allowlist do Pages) e
  minificar CSS/JS no deploy.
- **HTML/CSS/JS sem frameworks nem dependências de runtime.** Sem Font Awesome,
  sem jQuery, sem bundler: os ícones são SVG inline ou máscaras CSS, e o
  JavaScript é escrito à mão.
- **Fontes Inter e Merriweather**, servidas pelo Cloudflare Fonts, com
  _fallbacks_ locais ajustados por métrica (Capsize) para não causar reflow.
- **Python** só para os [scripts de autoria](#scripts-de-autoria), que não
  entram no site.
- Serviços externos: **Cloudflare**, **Netlify**, **Formspree** e
  **Microsoft Clarity** (ver [Serviços externos](#serviços-externos)).

Os detalhes de cada decisão estão em
[`docs/arquitetura.md`](./docs/arquitetura.md).

## Estrutura de diretórios

```
.
├── .github/workflows/pages.yml  # Build + minificação + deploy no GitHub Pages
├── _config.yml                  # Jekyll: coleções, plugins, exclude
├── Gemfile                      # Gems (github-pages + jekyll-last-modified-at)
│
│   ## Conteúdo — as quatro páginas de apresentação
├── index.md                     # Resumo em português           → /
├── bio.md                       # Biografia completa (PT)       → /bio
├── en/index.md                  # Resumo em inglês              → /en/
├── en/bio.md                    # Biografia completa (EN)       → /en/bio
│
│   ## Notas de legislação — ver docs/notas.md
├── notas.md                     # Página índice                 → /notas
├── definicoes.md                # Definições normativas         → /notas/definicoes
├── definicoes.json              # Banco para abertura contextual nas notas
├── _notas/                      #  6 comentários publicados     → /notas/<assunto>
├── _leis/                       # 13 textos legais em Markdown puro (output: false)
├── _fragmentos/                 # 13 fragmentos das normas (fetch sob demanda, sem link)
├── notas.js                     # Painéis, modo leitura, sumários, seletor de normas, busca e atalhos
│
│   ## Código compartilhado
├── _layouts/                    # default.html · nota.html · notas-index.html
├── _includes/                   # Partials + style.css e nota-style.css (inline no <head>)
├── _data/
│   ├── pages.yml                # Metadados de cada estado <lang>-<view> (fonte única)
│   ├── normas.yml               # Aliases das normas, para ancorar_referencias.py
│   ├── definicoes.yml           # Banco gerado de definições normativas
│   └── ementas/                 # 13 arquivos: a ementa de cada artigo, rótulo do sumário
├── script.js                    # Tema, navegação sem reload, banding, herói compacto
│
│   ## Autoria — excluídos do site publicado
├── scripts/                     # 5 scripts Python de autoria
├── docs/                        # arquitetura.md · notas.md · changelog.md
├── AGENTS.md                    # Guia para agentes · CLAUDE.md e GEMINI.md apontam aqui
│
│   ## Estáticos
├── img/                         # Foto do herói (AVIF/WebP/JPG), og-image, bg
├── sitemap.xml                  # Template Liquid: gera o sitemap automaticamente
├── robots.txt                   # Política de crawlers (robôs de IA liberados)
├── site.webmanifest             # Web App Manifest (PWA básico)
├── CNAME                        # Domínio do GitHub Pages (higa.me)
└── favicon*, apple-touch-icon.png, android-chrome-*.png
```

## Como atualizar o conteúdo

Edite os arquivos `.md` — não é preciso mexer em HTML/CSS/JS.

- **Resumo (home):** `index.md` (PT) e `en/index.md` (EN).
- **Biografia completa:** `bio.md` (PT) e `en/bio.md` (EN).

Toda alteração de conteúdo deve ser **replicada nos dois idiomas** (ver
[`AGENTS.md`](./AGENTS.md#idiomas-pt-br-e-en-us)). O `sitemap.xml` é gerado
automaticamente — basta commitar a alteração; não edite datas à mão.

Para publicar ou editar uma **nota de legislação**, veja
[`docs/notas.md`](./docs/notas.md).

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
partir deles (`{:toc}`). Cada `##` também inicia uma nova
[faixa full-bleed](./docs/arquitetura.md#faixas-full-bleed-banding). Não há
numeração ou âncoras para manter à mão.

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

Requer **Ruby 3.3** — a mesma versão que o workflow usa, para o resultado local
bater com o publicado.

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

Os mesmos gems do GitHub Pages são usados (ver `Gemfile`), mas o CSS/JS **não**
é minificado localmente: a minificação roda só no deploy de produção.

Antes de dar push, confirme que o site **compila**:

```bash
bundle exec jekyll build
```

Um erro de Liquid numa branch não aparece em lugar nenhum até o preview do
Netlify — este comando o pega antes.

### Scripts de autoria

Os cinco scripts de `scripts/` são ferramentas de autoria das notas de
legislação: rodam na sua máquina, **não entram no site** e não fazem parte do
build. O que cada um faz está em
[`docs/notas.md`](./docs/notas.md#scripts-de-autoria).

```bash
python3 -m venv .venv
.venv/bin/pip install -r scripts/requirements.txt
.venv/bin/python scripts/ancorar_referencias.py --check lgpd
.venv/bin/python scripts/conferir_ementas.py
```

## Publicação

### Fluxo padrão (branches de feature)

1. O agente cria uma branch e faz push das alterações — com **nome curto**, pelo
   motivo explicado abaixo.
2. O **Netlify** detecta o push e publica automaticamente uma **URL de preview**
   (build com Jekyll).
3. O humano acessa a URL de preview e **valida manualmente** as alterações.
4. Após validação, o humano solicita a criação do Pull Request.
5. O humano realiza **squash and merge** do PR na branch `master`.

> Não crie o Pull Request sem solicitação explícita do humano.

#### Nome da branch: limite de 63 caracteres

O preview do Netlify sai em `<branch>--<site>.netlify.app` (as barras do nome da
branch viram hifens). Esse rótulo de subdomínio é limitado a **63 caracteres**,
somados o nome da branch e o nome do site — é limite de DNS, não do Netlify.
Passando disso, **o preview não é publicado** e não há o que validar antes do PR.

Na prática: branches **curtas e descritivas, até cerca de 25 caracteres**,
incluindo o prefixo `claude/`. `claude/notas-lgpd` funciona;
`claude/public-legislation-notes-repo-8bvrdo` (43) não deixa margem. Se uma
branch já foi criada com nome longo, renomeie antes de pedir o preview:

```bash
git branch -m claude/nome-curto
git push -u origin claude/nome-curto
git push origin --delete claude/nome-antigo-e-comprido
```

### Build de produção

O site de produção ([higa.me](https://higa.me)) é compilado e publicado pelo
workflow do GitHub Actions em `.github/workflows/pages.yml` a cada push na branch
`master`. O workflow: (1) faz checkout com histórico completo (`fetch-depth: 0`),
(2) minifica CSS/JS, (3) roda `jekyll build` com `JEKYLL_ENV=production` e
(4) publica no GitHub Pages.

Esse build próprio (em vez do build padrão do GitHub Pages) permite usar o plugin
`jekyll-last-modified-at`, que preenche o
[`<lastmod>` do `sitemap.xml`](./docs/arquitetura.md#sitemap-lastmod) com a data
do último commit de cada página — por isso o histórico do git é buscado por
completo e não é preciso editar datas manualmente.

> **Configuração necessária no GitHub (uma vez):** em **Settings → Pages**,
> defina **Source = GitHub Actions**. Sem isso, o workflow compila mas não
> publica.

### O que não vai para o site

O `exclude` do `_config.yml` mantém fora do site publicado tudo o que só serve a
quem trabalha no repositório: `README.md`, `AGENTS.md`, `CLAUDE.md`,
`GEMINI.md`, `docs/`, `scripts/` e o `Gemfile`. Nada disso é alcançável por
navegação humana, então não tem por que responder numa URL — quem precisa
desses arquivos (inclusive os agentes de IA) os lê no repositório.

Os fragmentos de `_fragmentos/` são a exceção deliberada: **precisam** estar
publicados, porque o painel "Lei seca" os busca via `fetch()`. Por isso ficam
fora do sitemap e bloqueados no `robots.txt`.

## Serviços externos

Quatro serviços de terceiros participam do site. Os identificadores estão
versionados no código-fonte (não são segredos), mas troque-os com cuidado.

| Serviço               | Papel                                                                 | Onde vive no código |
| --------------------- | --------------------------------------------------------------------- | ------------------- |
| **Cloudflare**        | CDN/proxy do domínio. **Rocket Loader** adia scripts (por isso os que precisam rodar antes do paint levam `data-cfasync="false"`). **Cloudflare Fonts** reescreve o `<link>` do Google Fonts, inlina o CSS e serve os `woff2` a partir de `higa.me` (sem `preconnect` ao Google). | Configurado no painel da Cloudflare. No código: atributos `data-cfasync="false"` (`_layouts/default.html`, `_includes/head.html`) e o `<link>` de fontes em `_includes/head.html`. |
| **Netlify**           | Publica uma **URL de preview** a cada push de branch (build com Jekyll), para validação manual antes do PR. | Configurado no painel do Netlify (não há `netlify.toml` no repositório). |
| **Formspree**         | Recebe as mensagens do formulário de contato.                         | `action` do form em `_includes/contact-form.html` (endpoint `/f/xdklqqqg`). |
| **Microsoft Clarity** | Analytics de comportamento (heatmaps, gravações).                     | Snippet em `_includes/head.html`, `_includes/nota-head.html` e `_includes/notas-index-head.html` (project id `x1sidv15u2`), carregado só no idle. |
