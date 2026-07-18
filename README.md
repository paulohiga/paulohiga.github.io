# higa.me

Site pessoal de Paulo Higa, publicado via **GitHub Pages (Jekyll)** em
[higa.me](https://higa.me).

O site é compilado pelo Jekyll: o conteúdo (texto) fica separado do código
(HTML/CSS/JS), de modo que atualizar a biografia é só editar arquivos Markdown.

> **Agentes de IA generativa** (Claude Code, Gemini CLI, ChatGPT Codex etc.):
> leiam [`AGENTS.md`](./AGENTS.md) antes de qualquer alteração.

## Estrutura

```
.
├── .github/workflows/
│   └── pages.yml           # Build (Jekyll) e deploy no GitHub Pages
├── _config.yml             # Configuração do Jekyll
├── _data/pages.yml         # Metadados (título, descrição, URL) de cada estado
├── _layouts/default.html   # Casca da página (head, herói, conteúdo, rodapé, form)
├── _includes/
│   ├── head.html           # <head>: meta tags, Open Graph, JSON-LD
│   ├── toolbar.html        # Seletor de idioma + tema (ícones SVG inline)
│   ├── hero-compact.html   # Cabeçalho fixo compacto, revelado ao rolar
│   ├── sidebar.html        # Herói: foto, nome, localização, ações
│   ├── contact-form.html   # Formulário de contato (modal)
│   └── ai-disclaimer.html  # Aviso de conteúdo gerado por IA (bio completa),
│                           #   com a data-limite das fontes (last_modified)
│
├── index.md                # Conteúdo: resumo em português        → /
├── bio.md                  # Conteúdo: biografia completa (PT)     → /bio
├── en/index.md             # Conteúdo: resumo em inglês            → /en/
├── en/bio.md               # Conteúdo: biografia completa (EN)     → /en/bio
│
├── sitemap.xml             # Template Liquid: gera o sitemap automaticamente
├── style.css               # Todo o CSS (ícones via máscaras SVG; sem dependências)
├── script.js               # Tema, troca de idioma, navegação sem reload, form,
│                           #   faixas full-bleed das seções e animações de scroll
├── robots.txt              # Política de crawlers (robôs de IA liberados)
├── CNAME                   # Domínio do GitHub Pages (higa.me)
└── img/                    # Imagens
```

O conteúdo é fatiado em **faixas full-bleed** (`<section class="band">`) pelo
`script.js`: cada `##` (ou a dica de contato) inicia uma faixa, com fundos
alternados e de larguras totais. Sem JavaScript, o texto cai num fluxo simples
e legível. Os ícones são **SVG inline** ou **máscaras CSS** — não há Font
Awesome nem outras dependências de ícones.

As quatro páginas `.md` contêm **apenas o texto** (em Markdown). Toda a
apresentação (cartão, ícones, tabelas, índice, lista de referências) é montada
pelo layout, pelo CSS e pelo Markdown processado pelo Jekyll.

Cada página declara no front matter os campos `lang` (`pt`/`en`), `view`
(`short`/`full`) e `permalink`. A combinação `<lang>-<view>` é a chave dos
metadados em `_data/pages.yml` (título, descrição, URL canônica), compartilhados
pelo Jekyll e pelo `script.js`. As páginas declaram ainda `last_modified` —
nas biografias, esse campo tem papel especial (ver abaixo).

## Como atualizar o conteúdo

Edite os arquivos `.md` — não é preciso mexer em HTML/CSS/JS.

- **Resumo (home):** `index.md` (PT) e `en/index.md` (EN).
- **Biografia completa:** `bio.md` (PT) e `en/bio.md` (EN).

O `sitemap.xml` é gerado automaticamente (a partir de `_data/pages.yml` e da
data do último commit de cada página) — não edite o `sitemap.xml` à mão nem se
preocupe com o `<lastmod>`: basta commitar a alteração de conteúdo. Veja
[Publicação](#publicação) abaixo.

### Data-limite do aviso de IA (`last_modified`)

A biografia completa abre com um aviso de conteúdo gerado por IA que informa a
data-limite das fontes ("…fontes públicas disponíveis até X"). Essa data vem do
campo `last_modified` do front matter de `bio.md` e `en/bio.md` — uma data
**editorial**, mantida à mão (não é a data do último commit; edições que não
mudam o recorte das fontes não a alteram). Ao atualizar a biografia com fontes
mais recentes, **atualize o campo nos dois arquivos**, com a mesma data. O
campo também serve de fallback para o `<lastmod>` do sitemap quando o histórico
do git não está disponível.

### Títulos de seção e índice

Os `##` / `###` viram seções; o índice da biografia é gerado automaticamente
a partir deles (`{:toc}`). Não há numeração ou âncoras para manter à mão.

### Referências (notas de rodapé)

As citações usam notas de rodapé do Markdown. No texto:

```markdown
... aprovado no curso de formação para a carreira de EPPGG[^1] ...
```

E a definição (em qualquer lugar do arquivo, normalmente no fim):

```markdown
[^1]: Carreira de EPPGG – Portal do Servidor. [gov.br/servidor](https://www.gov.br/...)
```

A lista de referências e a numeração `[1]`, `[2]`… são geradas
automaticamente, **na ordem em que aparecem no texto**. A chave (`^1`) é só um
rótulo interno — pode reutilizá-la várias vezes para citar a mesma fonte.

### Adicionar uma maratona

As tabelas de provas ficam em `bio.md` / `en/bio.md` como HTML simples
(preservam legenda e acessibilidade). Para registrar uma prova, copie uma
linha `<tr>…</tr>` e ajuste os valores.

## Rodar localmente

```bash
bundle install
bundle exec jekyll serve
```

O site fica em `http://localhost:4000`. Os mesmos gems do GitHub Pages são
usados (ver `Gemfile`), então o resultado local é igual ao publicado.

## Publicação

### Fluxo padrão (branches de feature)

1. O agente cria uma branch e faz push das alterações.
2. O **Netlify** detecta o push e publica automaticamente uma **URL de preview**
   (build com Jekyll).
3. O humano acessa a URL de preview e **valida manualmente** as alterações.
4. Após validação, o humano solicita a criação do Pull Request.
5. O humano realiza **squash and merge** do PR na branch `master`.

### Build de produção

O site de produção ([higa.me](https://higa.me)) é compilado e publicado pelo
workflow do GitHub Actions em `.github/workflows/pages.yml` a cada push na
branch `master`. Esse build próprio (em vez do build padrão do GitHub Pages)
permite usar o plugin `jekyll-last-modified-at`, que preenche o `<lastmod>` do
`sitemap.xml` com a data do último commit de cada página — por isso o histórico
do git é buscado por completo (`fetch-depth: 0`) e não é preciso editar datas
manualmente.

> **Configuração necessária no GitHub (uma vez):** em **Settings → Pages**,
> defina **Source = GitHub Actions**. Sem isso, o workflow compila mas não
> publica.
