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

## 2026-08-20

### Notas de legislação

As **definições legais** das normas comentadas passaram a viver numa página
própria, **[`/notas/definicoes`](https://higa.me/notas/definicoes)**, e saíram
do começo das notas. São 210 definições, cada uma com o dispositivo em que a
norma a dá — e com **o texto da norma**, transcrito, e não resumido: 20 da LGPD,
8 do Marco Civil da Internet e 2 do Decreto nº 8.771/2016, 13 do ECA Digital e 9
do Decreto nº 12.880/2026, 2 do Decreto nº 12.976/2026, 29 do RGPD, 70 do AI
Act, 1 do Regulamento (UE) 2025/2518, 7 do Regimento Interno da ANPD e 49 das
resoluções do Conselho Diretor da ANPD sobre fiscalização e sanções, dosimetria,
agentes de pequeno porte, incidente de segurança, encarregado e transferência
internacional.

**Termo que mais de uma norma define é um verbete só.** "Dado pessoal" tem
definição na LGPD, no Decreto nº 8.771/2016, no RGPD e no AI Act, e as quatro
ficam no mesmo verbete, uma acepção abaixo da outra, cada qual com a sua base
legal. São 193 verbetes para as 210 definições. Vale também para os homônimos:
"operador" é o operador da LGPD e o gênero que reúne prestador, importador e
distribuidor no AI Act, e ver as duas definições lado a lado é o que desfaz a
confusão.

A página organiza a lista de duas maneiras — **em ordem alfabética** e **por
tema** (sujeitos e papéis, dados e informação, operações e técnicas, rede e
plataformas, conteúdo e moderação, inteligência artificial, infância e
adolescência, segurança e incidentes, transferência internacional, governança e
conformidade, fiscalização e sanções, rito e deliberação) —, cada uma com o seu
índice, e traz um filtro por termo, norma, tema ou jurisdição, mais um
alternador para ver **só as normas brasileiras**. Em tela larga, um **sumário
lateral** de altura inteira lista os verbetes e acompanha a leitura.

**Cada acepção diz de qual ordenamento fala.** Uma etiqueta marca o que é
direito brasileiro; sem ela, a acepção é de direito estrangeiro, que não obriga
no Brasil. "Dados pessoais" tem uma definição no
[art. 5º, I, da LGPD](https://higa.me/notas/lgpd#art-5-i) e outra no
[art. 4.º, 1), do RGPD](https://higa.me/notas/gdpr#art-4), e lê-las na mesma
lista sem essa distinção seria confundi-las.

**Nos comentários, os mesmos termos ficam marcados no corpo do texto** — o
primeiro uso de cada um em cada seção — e o clique abre a definição ali mesmo,
com a base legal. Clicar na base leva ao dispositivo no painel da lei,
trocando a norma exibida quando for o caso. O termo não precisa ser das normas
daquela nota: "rede social" é definido pelo ECA Digital e passou a ficar
marcado também no Marco Civil e na LGPD, que o citam sem defini-lo. **A
jurisdição não se mistura**: uma nota brasileira só abre definição de norma
brasileira, e uma nota europeia só abre definição europeia.

**Cada definição tem link próprio**, num "#" discreto ao lado da base legal: o
que se compartilha é "a definição de dado pessoal do RGPD", e não as quatro
definições de dado pessoal.

O que saiu das notas foi a **lista de definições**, que agora estaria repetida
em dois lugares — o "tratamento" da LGPD e o do RGPD eram o mesmo verbete
escrito duas vezes. O comentário *sobre* as definições ficou, e em três casos
mudou de lugar:

- **[LGPD](../_notas/lgpd.md)** (`/notas/lgpd`) — a análise dos três estudos
  técnicos da ANPD sobre anonimização, antes uma subseção dentro de
  "Definições", virou seção própria: **"Anonimização: um processo baseado em
  risco"**, logo depois de "Quando a LGPD não se aplica", que é onde ela pesa —
  dado anonimizado está fora do alcance da lei enquanto a anonimização
  resistir.
- **[Marco Civil da Internet](../_notas/mci.md)** (`/notas/mci`) — a subseção
  **"O que o Marco Civil não define"** registra que rede social e moderação em
  redes sociais não têm definição legal na lei: os incisos IX e X do art. 5º só
  existiram na redação da MPV nº 1.068/2021, rejeitada. A nota passou a apontar
  que quem define rede social é o [ECA Digital](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15211.htm),
  e só para os fins daquela lei.
- **[Regimento Interno da ANPD](../_notas/regimento-interno-anpd.md)**
  (`/notas/regimento-interno-anpd`) — o antigo "Glossário do rito" virou **"O
  vocabulário do rito"**, com a ressalva de que o Regimento não tem artigo de
  definições: relator, destaque, vista coletiva e os demais termos aparecem no
  dispositivo que os cria, e é dele que vem o sentido. Os que a norma define de
  fato — os instrumentos do [art. 51](https://higa.me/notas/regimento-interno-anpd#art-51)
  e o Circuito Deliberativo do [art. 40](https://higa.me/notas/regimento-interno-anpd#art-40)
  — passaram para a página de definições.

O apelido do RGPD no seletor de normas do painel "Lei seca" passou de "RGPD
(GDPR)" para **"General Data Protection Regulation (GDPR) da UE"**, mais fácil
de encontrar numa lista de vinte normas.

A observação de que o texto do EUR-Lex traz a "ultrafalsificação" do AI Act sob
o rótulo **«falsificações profundas»** passou a constar do verbete
correspondente.

### Documentação

- [`docs/notas.md`](./notas.md) ganhou a seção **Definições legais**: o formato
  do verbete, a regra de que a definição é a letra da norma, como extrair e
  conferir, como a página monta as duas organizações e como o termo marcado no
  comentário funciona.
- [`AGENTS.md`](../AGENTS.md) passou a trazer a regra de que **definição de
  termo não se escreve na nota** e de que **o verbete traz a transcrição do
  dispositivo**, não uma paráfrase. `conferir_definicoes.py` entrou na lista de
  conferências antes de fechar uma alteração.

---

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
