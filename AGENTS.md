# Guia para agentes de IA generativa

Este documento orienta agentes de IA (Claude Code, Gemini CLI, ChatGPT Codex e
afins) que contribuem com o site [higa.me](https://higa.me). Leia-o antes de
qualquer alteração e siga estas diretrizes em conjunto com o `README.md`, que
descreve a estrutura do projeto e como atualizar o conteúdo.

## Visão geral do projeto

O site é processado por **Jekyll no GitHub Pages**. Sempre que possível,
mantenha o **conteúdo textual em Markdown** separado do código (HTML/JS/CSS),
para facilitar a manutenção. Consulte o `README.md` para a estrutura de
diretórios e o fluxo de edição.

## Idiomas (pt-br e en-us)

- O idioma principal do site é **pt-br**.
- Toda alteração de conteúdo é solicitada em pt-br e **deve ser replicada em
  en-us**, mantendo consistência, o mesmo tom de linguagem e construção de
  texto natural.
- A versão en-us é destinada a um público que **não conhece necessariamente as
  peculiaridades do Brasil** — adapte (não apenas traduza literalmente)
  expressões, contexto e referências culturais quando preciso.

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
  automaticamente pelo Jekyll** (notas de rodapé — ver `README.md`).

## Acessibilidade (WCAG)

- Toda alteração de código deve ser **testada para acessibilidade** conforme a
  **última versão disponível do WCAG**.
- Garanta no mínimo o nível **AA (duplo A)**; busque **AAA (triplo A)** sempre
  que possível.

## Usabilidade e responsividade

- Garanta **layout responsivo**, com **animações fluidas** e visualização
  agradável **também em mobile**.

## SEO e descoberta por agentes de IA

- A estrutura e o código devem **facilitar a indexação** por motores de busca e
  por agentes de IA generativa.
- Use **HTML semântico** e **metadados estruturados** (ex.: JSON-LD,
  Open Graph) tanto quanto possível.

## Antes de finalizar (checklist)

- [ ] Conteúdo alterado em pt-br **e** replicado em en-us com tom consistente.
- [ ] Biografia gerada por IA segue NPOV, com afirmações verificáveis e
      referências citadas após cada afirmação.
- [ ] Resumo da home não foi alterado sem solicitação explícita.
- [ ] Acessibilidade verificada (WCAG, no mínimo AA).
- [ ] Layout responsivo e fluido, inclusive em mobile.
- [ ] HTML semântico e metadados estruturados preservados/aprimorados.
- [ ] **`last_modified` atualizado** no front matter de cada página de conteúdo
      alterada (`index.md`, `bio.md`, `en/index.md`, `en/bio.md`).

## Sitemap (`<lastmod>`)

O `sitemap.xml` é **gerado automaticamente** pelo Jekyll a partir de
`_data/pages.yml` (URLs e links `hreflang`) e do campo **`last_modified`** no
front matter de cada página. **Não edite `sitemap.xml` diretamente.** Ao
alterar o conteúdo de uma página, atualize apenas o `last_modified` no front
matter dessa página (formato `AAAA-MM-DD`) — o `<lastmod>` correspondente é
recalculado na compilação.
