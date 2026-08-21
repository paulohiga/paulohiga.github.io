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

## 2026-08-21

### Notas de legislação

- Publicada a nota do **DSA**, o [Regulamento (UE) 2022/2065](https://eur-lex.europa.eu/legal-content/PT/TXT/HTML/?uri=CELEX:32022R2065),
  relativo a um mercado único para os serviços digitais, em `/notas/dsa`. O
  painel traz o ato como publicado no Jornal Oficial L 277, de 27 de outubro de
  2022 — preâmbulo, 156 considerandos e 93 artigos —, que em português é
  também o texto em vigor: o regulamento não foi alterado por ato posterior, e
  as retificações registradas pelo EUR-Lex atingem as versões francesa, polaca
  e alemã.
- A nota cobre as isenções de responsabilidade dos prestadores intermediários
  (arts. 4.º a 8.º), o regime das ordens das autoridades nacionais, a escada de
  quatro degraus de deveres de devida diligência, o regime de risco sistêmico
  das plataformas e motores de pesquisa de muito grande dimensão, a repartição
  de competências entre coordenadores nacionais e a Comissão Europeia, as
  sanções e o cronograma de aplicação.
- A seção "A execução até agora" registra, com base na [lista oficial de
  serviços designados](https://digital-strategy.ec.europa.eu/en/policies/list-designated-vlops-and-vloses)
  e nos comunicados da Comissão Europeia, as três coimas já aplicadas: [X,
  120 milhões de euros em 5/12/2025](https://digital-strategy.ec.europa.eu/en/news/commission-fines-x-eu120-million-under-digital-services-act),
  [Temu, 200 milhões em 28/5/2026](https://digital-strategy.ec.europa.eu/en/news/commission-fines-temu-eu200-million-breaching-digital-services-act)
  e [AliExpress, 550 milhões em 20/7/2026](https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1654).
- A nota compara o DSA com o regime brasileiro nascido dos Temas 987 e 533 do
  STF e dos decretos de 2026, apontando as convergências (notificação
  extrajudicial como gatilho, aferição sistêmica, devido processo na moderação)
  e as divergências (auditoria independente obrigatória, acesso de
  investigadores aos dados, designação pública das maiores plataformas e teto
  sancionatório percentual).
- As **Definições normativas** passaram a incluir os 24 verbetes do art. 3.º do
  DSA, entre eles serviço intermediário, plataforma em linha, motor de pesquisa
  em linha, conteúdos ilegais, moderação de conteúdos e sistema de recomendação.
  O acervo passou de 195 para 219 verbetes.
- As notas do **Marco Civil**, do **ECA Digital**, do **GDPR** e do **AI Act**
  passaram a remeter à nota do DSA. A do Marco Civil registra que a norma
  europeia ocupa o espaço preenchido aqui pelos Temas 987 e 533; a do ECA
  Digital, que o [art. 28.º do DSA](https://eur-lex.europa.eu/legal-content/PT/TXT/HTML/?uri=CELEX:32022R2065)
  pede proteção de menores sem obrigar a tratar dados adicionais para
  identificá-los, com as [orientações da Comissão de 14/7/2025](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors)
  no papel que aqui cabe ao decreto e aos atos da ANPD.

### Documentação

- O esquema de âncoras passou a reconhecer alíneas de a) a z). Antes parava em
  j), o que deixava sem âncora as listas longas das normas europeias — as 24
  definições do art. 3.º do DSA e o art. 70.º, n.º 1, do RGPD, entre outras.

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
