# Changelog

Registro histórico das atualizações de **conteúdo** do site — o que mudou, quando
e com base em quê. Serve para responder, meses depois, à pergunta que o histórico
do git responde mal: *por que esta nota diz isso, e desde quando?*

> **Este arquivo é escrito para ser publicado.** Hoje ele vive só no repositório
> (`docs/` está no `exclude` do `_config.yml`), mas a intenção é que em algum
> momento seja público. Escreva cada entrada como se ela já estivesse no ar: sem
> informação sensível, sem polêmica, sem detalhe interno de processo. As regras
> completas estão em
> [`AGENTS.md`](../AGENTS.md#changelog-registro-histórico-das-atualizações).

Formato: uma seção por data (`AAAA-MM-DD`), da mais recente para a mais antiga,
com as mudanças agrupadas por área. Entradas descrevem **o que passou a constar**
no site, não o caminho até lá.

---

## 2026-08-22

### Notas de legislação

- A seção passou a oferecer a [busca global do acervo](/notas/busca), com
  resultados para notas, seções, normas, artigos e definições. A consulta
  preserva links profundos para as âncoras existentes e pode ser compartilhada
  pelos parâmetros da URL.
- A home de `/notas` passou a reunir busca e definições em uma seção de recursos
  do acervo, e o cabeçalho ganhou um acesso direto à busca com a tecla `s`.
- A busca passou a focar o campo ao abrir, exibir contagens por categoria e
  aceitar a combinação de vários tipos. O acesso por cabeçalho e pela tecla `s`
  também está disponível na página de definições; os resultados usam cores
  distintas por tipo para facilitar a leitura do conjunto.
- A ordenação dos resultados passou a ponderar o campo em que o termo aparece,
  a raridade do termo, coincidências de frase e a posição no título; a
  ordenação alfabética ficou restrita aos desempates.
- A busca passou a colocar resultados de jurisdição brasileira antes dos de
  outras jurisdições, mantendo a relevância para ordenar cada grupo.
- A página de busca ganhou uma seção de inspiração com seis tópicos sorteados a
  cada carregamento a partir de títulos de notas, seções e temas do glossário.
- O cabeçalho de todas as páginas de `/notas` passou a compartilhar os mesmos
  controles de busca, atalhos e tema, com a mesma borda, área de toque e estados
  de foco. A lista de atalhos se adapta ao contexto da página e à largura da
  tela.

### Documentação

- Documentados o índice de busca gerado no build, o carregamento sob demanda e
  o diretório de categorias disponível sem JavaScript.
- O build passou a validar o índice gerado antes da publicação, incluindo
  esquema, duplicidades, destinos e âncoras de notas e normas extras.

## 2026-08-20

### Notas de legislação

- O painel da nota do **AI Act** passou a exibir uma única norma: o [Regulamento
  (UE) 2024/1689 na versão consolidada oficial de 27 de julho de 2026](https://eur-lex.europa.eu/legal-content/PT/TXT/HTML/?uri=CELEX:02024R1689-20260727),
  que incorpora o [Regulamento (UE) 2026/1744 — Digital Omnibus sobre a IA](https://eur-lex.europa.eu/eli/reg/2026/1744/oj).
  Foram retirados do painel o texto original, a consolidação não oficial e o ato
  alterador em separado; os links dos comentários passaram a apontar para a
  redação consolidada ou para a fonte externa do texto histórico.
- O glossário de definições normativas passou a usar a redação e os metadados do
  texto consolidado oficial do AI Act.
- Publicada a página de **Definições normativas**, que reúne a literalidade das
  definições das leis, decretos, resoluções e regulamentos disponíveis em
  `/notas`. Termos iguais ou próximos da mesma jurisdição aparecem no mesmo
  verbete, com links separados para a nota e para o dispositivo; o índice
  lateral permite percorrer todos os verbetes em ordem alfabética ou temática,
  buscar também por norma e tema e ocultar as normas da União Europeia.
  Redações materialmente iguais aparecem uma vez, com todas as suas referências
  normativas, enquanto redações diferentes permanecem separadas.
- As notas passaram a dar acesso contextual aos verbetes ao longo dos
  comentários, limitado à própria jurisdição. Os blocos que repetiam as
  definições da LGPD, do Marco Civil, do ECA Digital, do GDPR e do AI Act foram
  retirados; a análise técnica sobre anonimização permanece na nota da LGPD.

### Documentação

- O antigo backlog de navegação foi reorganizado como
  [`docs/notas-roadmap.md`](./notas-roadmap.md), com a auditoria da página
  `/notas/definicoes`, o backlog residual e critérios editoriais para aumentar
  a utilidade das notas sem ampliar seu volume de texto.
- Documentados o banco gerado a partir de `_leis/`, a página consolidada, o
  acesso contextual nas notas e a conversão direta de textos consolidados do
  EUR-Lex.

## 2026-08-19

### Notas de legislação

Incorporação dos **radares tecnológicos** e **estudos técnicos** publicados pela
ANPD na [central de documentos técnicos e orientativos](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos).
São documentos públicos, sem efeito normativo — a série Radar Tecnológico traz
ressalva expressa de que não firma posicionamento institucional, e os textos para
discussão são preliminares. Cada afirmação nova nas notas leva o link do documento
de origem, e cada nota afetada ganhou uma subseção de referências em "Normas".

**[ECA Digital](../_notas/eca-digital.md)** (`/notas/eca-digital`)

- Em "Mecanismos de aferição de idade", subseção nova com o **Radar Tecnológico
  nº 5 — Mecanismos de aferição de idade** (outubro de 2025): a taxonomia adotada
  pela ANPD (aferição como guarda-chuva; verificação, estimativa e inferência como
  métodos) e a razão de a autodeclaração não contar como método; as cinco etapas de
  funcionamento de um mecanismo; as cinco gerações de soluções, da autodeclaração
  aos testes em ecossistema; a distinção entre _token_ de idade, modelo duplo-cego e
  provas de conhecimento zero; o custo em dados pessoais de cada método; os oito
  princípios em que os reguladores convergem; e os dois marcos australianos de 2025,
  com a crítica pública ao ensaio.
- Na mesma subseção, o **caso TikTok** (Notas Técnicas nº 6/2023 e nº 50/2024) como
  precedente de fiscalização anterior ao ECA Digital sobre autodeclaração isolada.
- Em "Prevenção e combate a violações graves", subseção nova com o **Radar
  Tecnológico nº 6 — _Deepfakes_** (2026): o levantamento sobre _deepfakes_
  pornográficos em ambiente escolar e a cronologia do caso Grok, da representação à
  medida preventiva.

**[LGPD](../_notas/lgpd.md)** (`/notas/lgpd`)

- Em "Crianças e adolescentes", subseção nova com o **Estudo Preliminar sobre
  hipóteses legais aplicáveis ao tratamento de dados pessoais de crianças e
  adolescentes** (setembro de 2022): as três interpretações do art. 14 em disputa,
  os argumentos favoráveis e contrários a cada uma e o raciocínio que levou à
  terceira — a que veio a ser fixada pelo Enunciado CD/ANPD nº 1/2023 —, com as duas
  ressalvas que costumam sumir na citação do enunciado.
- Em "Definições › Técnicas", subseção nova sobre **anonimização como processo
  baseado em risco**, a partir dos três estudos técnicos de novembro de 2023
  (análise jurídica, processo e técnicas computacionais, estudo de casos):
  identificadores diretos e indiretos, a inexistência de risco zero, os tipos de
  ataque de reidentificação, a diferença entre "esforços razoáveis" e "meios
  próprios", e as quatro etapas de gestão do risco.
- Em "Dados pessoais sensíveis", duas subseções novas: **biometria e reconhecimento
  facial** (Radar nº 2, junho de 2024), com os pontos de atenção do estudo e os
  recortes escolar e de segurança pública; e **dados neurais** (Radar nº 4, junho de
  2025), com o raciocínio que os enquadra como dado pessoal e, conforme o contexto,
  como dado sensível.
- Em "Hipóteses de tratamento", duas subseções novas: **fins acadêmicos e estudos
  por órgão de pesquisa** (Texto para Discussão nº 1/2022) e **raspagem de dados e
  treinamento de modelos de IA** (Radares nº 3 e nº 6).
- Em "Poder Público", subseção nova sobre **cidades inteligentes** (Radar nº 1,
  janeiro de 2024), ligando os riscos mapeados aos arts. 26 e 27.
- Em "Boas práticas e governança", subseção nova sobre **sandbox regulatório**
  (estudo técnico de setembro de 2023), com a distinção entre sandbox e centro de
  inovação.

**[Marco Civil da Internet](../_notas/mci.md)** (`/notas/mci`)

- Em "Proteção de mulheres no ambiente digital", subseção nova com o **Radar
  Tecnológico nº 6**: o levantamento sobre _deepfakes_ contra meninas e mulheres e o
  caso Grok, construído sobre o regime de responsabilidade das plataformas.

**[AI Act](../_notas/ai-act.md)** (`/notas/ai-act`)

- Em "Transparência de conteúdos gerados por IA", subseção nova lendo o art. 50.º a
  partir do **Radar Tecnológico nº 6**: os três padrões regulatórios em uso no mundo
  (transparência, vedação eleitoral, criminalização), o contraste entre a escolha
  transversal europeia e a setorial brasileira, os cinco desafios da regulação de
  _deepfakes_ e o dado sobre os limites das ferramentas de detecção.

**[GDPR](../_notas/gdpr.md)** (`/notas/gdpr`)

- Em "Consentimento", subseção nova sobre **como se comprova a idade sem
  identificar o usuário**: Declaração 1/2025 do CEPD, _EU Age Verification
  Solution_, a crítica de exclusão e a distinção entre provas de conhecimento zero e
  modelo duplo-cego.

**Fora do recorte desta atualização**, e candidatos a uma próxima: as notas
técnicas de fiscalização da ANPD não citadas pelos radares e os documentos
orientativos em parceria — entre eles as "Perguntas e respostas sobre o ECA
Digital" (março de 2026).

### Documentação

- Criado este changelog e registrada, em [`AGENTS.md`](../AGENTS.md), a regra de
  mantê-lo.
