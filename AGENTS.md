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

## Notas de legislação (`/notas`)

Seção de estudo sobre legislação (LGPD, Marco Civil, ECA Digital e o AI Act
europeu), pública e indexável. É **isolada do restante do site**: layout, CSS, JS e includes
próprios, sem passar pelo `default.html`, pelo `script.js` nem pelo
`_data/pages.yml`. Uma mudança nas notas não pode afetar as quatro páginas de
apresentação, e vice-versa.

### Estrutura

- `_notas/<assunto>.md` — a nota publicada (comentários). Front matter:
  `layout: nota`, `permalink`, `title`, `description`, `lei` (a norma
  principal, pré-carregada no HTML), `normas_extra` (opcional — lista de
  slugs de `_leis` para normas adicionais, ver abaixo) e `revisado_em` (data
  da última revisão **humana**).
- `_leis/<assunto>.md` — o texto legal em Markdown puro, sem âncoras nem
  classes. Front matter: `titulo`, `apelido`, `fonte`, `compilado_ate`
  (opcional), `formato` (opcional — `br`, o padrão, ou `ue`; ver "Normas
  estrangeiras", abaixo) e, só para normas adicionais (ver abaixo), `tipo` e
  `prefixo`. **O texto da lei não se altera.**
- `_layouts/nota.html` monta os dois painéis; `_includes/lei-anotada.html`
  renderiza o texto legal dando um id a cada dispositivo.

Criar uma nota é criar um arquivo; excluir é apagá-lo. O sitemap e os links se
ajustam sozinhos no build.

#### Múltiplas normas por nota

Uma nota pode exibir, no painel "Lei seca", mais de um texto legal — por
exemplo a lei e um decreto que a regulamenta. A norma indicada em `lei` é a
principal: fica pré-carregada no HTML, sem prefixo de id, exatamente como
antes desse recurso existir (as âncoras já publicadas, tipo `#art-5-v`, não
mudam). Normas adicionais entram em `normas_extra` (lista de slugs de
`_leis/`), com dois requisitos extras no front matter do arquivo em `_leis/`:

- `tipo` — `lei`, `decreto` ou `resolucao` (documentação; não altera o
  comportamento hoje, mas evita ambiguidade se o rótulo do link de fonte vier
  a depender do tipo).
- `prefixo` — namespace curto e estável dos ids dessa norma (ex.:
  `dec12880`), para não colidir com os ids da norma principal nem de outras
  normas extras. Vira `dec12880-art-5`, `lei-dec12880-capitulo-i-…` etc. —
  ver o include `lei-anotada.html`, que recebe `prefixo` como parâmetro
  opcional.

Uma norma extra **não é pré-carregada**: ela é buscada via `fetch()` só quando
o leitor a seleciona no seletor de normas (ou ao abrir um link com âncora
prefixada, tipo `/notas/eca-digital#dec12880-art-24`), e o resultado fica em
cache na aba enquanto ela estiver aberta. Isso significa que **o seletor de
normas e a navegação para uma norma extra exigem JavaScript** — é uma exceção
consciente à regra geral de "funciona sem JS" das notas, decidida para não
pré-carregar normas que ainda vão se multiplicar (resoluções da ANPD, outros
decretos do MCI). Sem JavaScript, o seletor fica oculto e só a norma principal
aparece.

A norma extra é servida por um HTML solto em `_fragmentos/<slug>.html`
(coleção `fragmentos`, ver `_config.yml`), sem link algum apontando para ele,
fora do sitemap (`sitemap: false`) e bloqueado em `robots.txt`
(`/notas/fragmentos/`) — não é uma página para navegação humana. Ele só chama
`lei-anotada.html` com o `prefixo` da norma:

```liquid
{%- assign norma = site.leis | where: 'slug', 'decreto-12880' | first -%}
{%- include lei-anotada.html lei=norma prefixo=norma.prefixo -%}
```

**Por que uma coleção própria, e por que ela vem antes de `leis` no
`_config.yml`:** o Jekyll renderiza as coleções na ordem declarada em
`_config.yml`, e renderizar uma coleção reescreve o `.content` de cada
documento dela para o HTML já convertido (mesmo com `output: false`). Se o
fragmento fosse uma página solta (fora de qualquer coleção), ele seria
renderizado *depois* de todas as coleções — inclusive depois de `leis` — e
receberia o `.content` da norma já convertido pelo Kramdown padrão, sem as
âncoras por dispositivo. Colocar o fragmento numa coleção (`fragmentos`)
declarada *antes* de `leis` garante que ele lê o Markdown ainda cru, do mesmo
jeito que `_notas/*.md` já fazia. Ao criar uma nova norma extra, replique o
padrão de `_fragmentos/decreto-12880.html` — não crie uma página solta fora de
coleção para isso.

### Referências clicáveis

Os comentários apontam para o texto legal com links Markdown comuns, cujo
destino segue um esquema previsível gerado por `lei-anotada.html`:

| Dispositivo | id |
| --- | --- |
| Art. 5º | `art-5` |
| Art. 55-A | `art-55-a` |
| § 2º do art. 3º | `art-3-p2` |
| Parágrafo único do art. 1º | `art-1-pu` |
| Inciso V do art. 5º | `art-5-v` |
| Inciso I do § 1º do art. 52 | `art-52-p1-i` |
| Alínea "b" do inciso II do art. 4º | `art-4-ii-b` |

#### Normas estrangeiras (`formato: ue`)

Uma norma da União Europeia marca o dispositivo de outro jeito, e o arquivo em
`_leis/` sinaliza isso com `formato: ue` no front matter (o padrão, `br`, não
precisa ser escrito). **O esquema de ids não muda** — muda só o que o include
reconhece como dispositivo:

| Dispositivo | id |
| --- | --- |
| Artigo 5.º | `art-5` |
| Artigo 6.º-A | `art-6-a` |
| n.º 1 do artigo 5.º (o "1." do texto) | `art-5-p1` |
| alínea "a" do n.º 1 do artigo 5.º | `art-5-p1-a` |
| alínea "a" de artigo sem números | `art-1-a` |

Não há inciso romano entre o número e a alínea: a alínea se pendura no número
corrente ou, na falta dele, no próprio artigo. **Subalíneas ficam de fora** —
"ii)" e seguintes não recebem âncora, e "i)" é indistinguível da alínea "i)"
de uma lista longa, então remissão a subalínea se confere no texto ou fica sem
link. O mesmo vale para os considerandos, que não são dispositivos e não são
ancorados.

`scripts/ancorar_referencias.py` acompanha o formato ao calcular os ids
válidos, mas continua reconhecendo *citações* na praxe brasileira: uma citação
europeia com sufixo ("art. 5.º, n.º 1") cai no artigo seco em vez do número —
link menos preciso, nunca errado.

Escreva `([art. 5º, inciso V](#art-5-v))` preservando o texto visível da
citação. Sem JavaScript o link continua funcionando como âncora normal — não
introduza referências que dependam de JS. **Confira toda remissão nova contra o
texto legal antes de publicar**: link errado numa página pública de legislação é
um defeito, não um detalhe.

Três cuidados que já custaram tempo:

- **`#art-…` sem prefixo é sempre a norma principal (`lei`) daquela nota.**
  Uma nota pode comentar decretos, resoluções e outras leis citadas só em
  texto puro — nesses casos o número do artigo colide: "Decreto nº
  12.880/2026, art. 24" não é o art. 24 do ECA Digital, e não deve virar link
  para `#art-24`. Isso só deixa de valer para uma norma listada em
  `normas_extra` (ver "Múltiplas normas por nota" acima): ela tem prefixo
  próprio (ex. `dec12880-art-24`) e pode ser linkada com segurança, porque o
  prefixo já evita a colisão.
- **Redação superada não recebe âncora.** Quando o texto legal traz a redação
  antiga tachada (`~~…~~`) ao lado da nova, só a vigente é ancorada — é o que
  evita id duplicado e link para texto fora de vigor. Se um dispositivo só
  existe em redação tachada, ele não tem âncora e não deve ser linkado: é o caso
  dos artigos que vieram de medida provisória rejeitada, como a MPV nº
  1.068/2021 no Marco Civil (arts. 8º-A a 8º-D, 28-A e os incisos IX e X do art.
  5º), e do art. 36-A do ECA Digital, com vigência encerrada.
- **Entre notas, use o caminho da página**: `[art. 6º da LGPD](/notas/lgpd#art-6)`
  abre a outra nota já posicionada no dispositivo.

### Ancorando referências automaticamente

`scripts/ancorar_referencias.py` varre um comentário em busca de menções, em
texto puro, a uma norma que já existe em `/notas` (a própria lei da nota, uma
`normas_extra` dela, ou a lei principal de outra nota) e as transforma nesses
links — sem gastar token de LLM nisso a cada nova norma publicada ou
comentário editado. Ele reconhece a norma por um registro de aliases em
`_data/normas.yml` (adicione uma entrada lá para cada norma nova) e só cria o
link se o id de destino realmente existir no texto legal correspondente —
recalculado a partir de `_leis/<norma>.md` com a mesma regra de
`lei-anotada.html` (ids inválidos não geram link partido).

```bash
python3 scripts/ancorar_referencias.py --check eca-digital lgpd mci   # mostra o diff, não grava
python3 scripts/ancorar_referencias.py --apply eca-digital            # grava
python3 scripts/ancorar_referencias.py --validar lgpd mci             # mede fidelidade contra os links já existentes
```

**Por padrão, o script só cria link quando a norma está nomeada perto da
citação** (antes: "Decreto nº 12.880/2026, art. 24"; ou depois: "art. 6º da
LGPD"). Citações "nuas" (só "art. 24", sem norma por perto) não são ligadas
por padrão — use `--incluir-padrao` para isso, com **revisão redobrada do
diff**: essa opção assume que uma citação nua é da norma principal da própria
nota, o que já se mostrou errado em parágrafos que nomeiam a norma numa frase
e a omitem nas seguintes (o script não rastreia contexto entre linhas). É por
isso que `--validar` mede a fidelidade contra o LGPD e o Marco Civil (que já
têm essas citações nuas manualmente linkadas) sempre com `--incluir-padrao`
ligado — é o que está sendo calibrado — mas o `--apply` do dia a dia deve
continuar no modo padrão (sem essa opção), que é o que gerou os links do
Decreto nº 12.880/2026.

Limitações conhecidas, por design (documentadas com mais detalhe no docstring
do script): citações compostas com mais de um sufixo em formatos incomuns
(ex.: uma faixa de parágrafos "§§ 2º a 4º"), ou que misturam faixa e lista de
artigos, ficam de fora — o script prefere não linkar a linkar para o
dispositivo errado.

### Regras editoriais (não negociáveis)

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
- `revisado_em` é atualizado **pelo humano** que revisou, não pela IA.

### Idioma

Esta seção é **pt-br apenas** — exceção consciente à regra de replicação em
en-us, que continua valendo para as quatro páginas de apresentação. O público é
brasileiro e a manutenção em dois idiomas não se justifica. Não "corrija" isso
criando `/en/notas`.

Isso vale inclusive para as normas estrangeiras que entram na seção por
iluminarem o direito brasileiro (é o caso do AI Act): os comentários são
escritos em pt-br, e o painel "Lei seca" exibe a **versão oficial em
português** da norma — no caso da União Europeia, o texto do EUR-Lex, que é
PT-PT. Quando a terminologia oficial divergir da brasileira, explique a
correspondência na própria nota em vez de reescrever o texto legal.

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
  e o layout continuam legíveis. Exceção conhecida e aceita: nas notas com mais
  de uma norma (`normas_extra`), o seletor de normas some e só a norma
  principal fica visível — ver "Múltiplas normas por nota".
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

### Nome da branch: limite de 63 caracteres

O preview do Netlify é publicado em `<branch>--<site>.netlify.app`, e as barras
do nome da branch viram hifens. Esse rótulo de subdomínio **não pode passar de
63 caracteres** — somados o nome da branch e o nome do site. Se estourar, o
Netlify simplesmente **não publica o preview**, e o passo 3 do fluxo acima fica
impossível.

Como o nome do site consome parte do limite, mantenha a branch **curta e
descritiva: até cerca de 25 caracteres**, contando o prefixo `claude/`.

- Bom: `claude/notas-lgpd`, `claude/bio-links-audit`
- Ruim: `claude/public-legislation-notes-repo-8bvrdo` (43 caracteres)

Não use o assunto inteiro do pedido como nome da branch — resuma.

## Antes de finalizar (checklist)

- [ ] Conteúdo alterado em pt-br **e** replicado em en-us com tom consistente
      (não se aplica às notas de legislação, que são pt-br apenas).
- [ ] Nas notas de legislação: aviso preservado, remissões conferidas contra o
      texto legal e regras editoriais observadas.
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
