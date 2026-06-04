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
├── _config.yml             # Configuração do Jekyll
├── _data/pages.yml         # Metadados (título, descrição, URL) de cada estado
├── _layouts/default.html   # Casca da página (head, sidebar, conteúdo, form)
├── _includes/
│   ├── head.html           # <head>: meta tags, Open Graph, JSON-LD
│   ├── toolbar.html        # Seletor de idioma + tema
│   ├── sidebar.html        # Foto, nome, ações
│   ├── contact-form.html   # Formulário de contato (modal)
│   └── ai-disclaimer.html  # Aviso de conteúdo gerado por IA (bio completa)
│
├── index.md                # Conteúdo: resumo em português        → /
├── bio.md                  # Conteúdo: biografia completa (PT)     → /bio
├── en/index.md             # Conteúdo: resumo em inglês            → /en/
├── en/bio.md               # Conteúdo: biografia completa (EN)     → /en/bio
│
├── sitemap.xml             # Template Liquid: gera o sitemap automaticamente
├── style.css               # Todo o CSS (inclusive ícones via ::before/::after)
├── script.js               # Tema, troca de idioma, navegação sem reload, form
└── img/                    # Imagens
```

As quatro páginas `.md` contêm **apenas o texto** (em Markdown). Toda a
apresentação (cartão, ícones, tabelas, índice, lista de referências) é montada
pelo layout, pelo CSS e pelo Markdown processado pelo Jekyll.

## Como atualizar o conteúdo

Edite os arquivos `.md` — não é preciso mexer em HTML/CSS/JS.

- **Resumo (home):** `index.md` (PT) e `en/index.md` (EN).
- **Biografia completa:** `bio.md` (PT) e `en/bio.md` (EN).

Ao alterar o conteúdo de uma página, atualize o campo `last_modified`
(`AAAA-MM-DD`) no front matter dela. O `sitemap.xml` é gerado automaticamente
a partir desse campo e de `_data/pages.yml` — não edite o `sitemap.xml` à mão.

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
