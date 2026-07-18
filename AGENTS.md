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
- Ao incorporar **fontes mais recentes**, atualize o campo `last_modified` no
  front matter de `bio.md` **e** de `en/bio.md` (mesma data nos dois arquivos):
  é ele que define a data-limite exibida no aviso de conteúdo gerado por IA
  ("…fontes públicas disponíveis até X"). É uma data **editorial** — não a
  atualize em edições que não mudam o recorte das fontes (ver `README.md`).

## Fluxo de trabalho padrão

1. O agente cria uma branch automaticamente e realiza as alterações nela.
2. O **Netlify** detecta o push e faz o deploy de preview da branch
   automaticamente (build com Jekyll).
3. O **humano acessa a URL de preview** gerada pelo Netlify e valida as
   alterações manualmente.
4. Somente após a validação, o humano **solicita a criação do Pull Request**.
5. O humano faz **squash and merge** do PR na branch principal.

> Não crie o Pull Request sem solicitação explícita do humano.

## Performance: Core Web Vitals

- Toda alteração de código deve ser **testada para as métricas do Core Web
  Vitals** (LCP, INP e CLS), garantindo a melhor experiência ao usuário.
- Consulte a documentação de referência:
  <https://web.dev/articles/vitals>.
- Priorize especialmente **LCP ≤ 2,5 s**, **INP ≤ 200 ms** e **CLS ≤ 0,1**.

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
- [ ] `last_modified` de `bio.md` e `en/bio.md` atualizado (mesma data) se o
      recorte de fontes da biografia mudou.
- [ ] Resumo da home não foi alterado sem solicitação explícita.
- [ ] Acessibilidade verificada (WCAG, no mínimo AA).
- [ ] Core Web Vitals verificados (LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1).
- [ ] Layout responsivo e fluido, inclusive em mobile.
- [ ] HTML semântico e metadados estruturados preservados/aprimorados.

## Sitemap (`<lastmod>`)

O `sitemap.xml` é **gerado automaticamente** e **não exige ação manual**. Ele é
um template Liquid que monta as URLs e os links `hreflang` a partir de
`_data/pages.yml`, e preenche o `<lastmod>` de cada página com a **data do
último commit** que tocou o arquivo (plugin `jekyll-last-modified-at`, no build
via GitHub Actions). **Não edite `sitemap.xml` diretamente** e **não é preciso**
manter datas à mão: basta commitar a alteração de conteúdo.

> O build de produção roda pelo workflow `.github/workflows/pages.yml` (não pelo
> build padrão do GitHub Pages), o que permite usar plugins fora da allowlist do
> Pages. Para o `<lastmod>` do sitemap, o campo `last_modified` do front matter
> serve apenas de fallback caso o histórico do git não esteja disponível — mas,
> nas biografias, esse mesmo campo define a data-limite do aviso de conteúdo
> gerado por IA e é mantido à mão (ver regras da biografia, acima).
