---
layout: nota
permalink: /notas/gdpr
title: GDPR — Regulamento Geral sobre a Proteção de Dados da União Europeia
description: Notas de estudo sobre o Regulamento (UE) 2016/679 — princípios, bases legais, direitos do titular, transferências internacionais, autoridades e coimas —, com a jurisprudência histórica do Tribunal de Justiça, os casos emblemáticos de violação, o estado das alterações em negociação e a comparação com a LGPD.
lei: gdpr
normas_extra: [regulamento-2025-2518]
ordem: 5
jurisdicao: União Europeia
atualizado_em: 2026-08-21
---

## Resumo geral

O RGPD e a [LGPD](/notas/lgpd) compartilham vocabulário e arquitetura: controlador e operador, bases legais para o tratamento, direitos do titular em capítulo próprio, encarregado, relatório de impacto, alcance extraterritorial e multa proporcional ao faturamento. As duas foram escritas na mesma década e no mesmo debate internacional, e desde janeiro de 2026 os dois regimes se reconhecem mutuamente como adequados. Para um leitor brasileiro, ler o regulamento europeu serve a duas coisas ao mesmo tempo: é a norma que alcança diretamente quem oferece bens ou serviços na Europa, e é o termo de comparação mais útil para enxergar onde a solução brasileira coincide com a europeia e onde segue caminho próprio.

Três decisões estruturais explicam quase tudo o que vem depois.

A primeira é **o instrumento**: é um regulamento, não uma diretiva. Vale diretamente nos 27 Estados-Membros, sem lei nacional de transposição — ao contrário da Diretiva 95/46/CE, que gerara uma lei nacional por Estado-Membro, divergentes entre si, e um mercado interno fragmentado. Mas o RGPD não é uniforme como parece: ele contém mais de cinquenta "cláusulas de abertura", pontos em que manda ou permite que cada país legisle (idade de consentimento de crianças, tratamento no contexto laboral, jornalismo, saúde, coimas ao setor público). Regulamento na forma, harmonização parcial no conteúdo.

A segunda é **o alcance**. O [art. 3.º](#art-3) aplica o regulamento a quem esteja estabelecido na União, mas também a quem, de fora dela, ofereça bens ou serviços a pessoas que se encontrem na União, ou monitore o comportamento delas. Uma empresa brasileira sem escritório, servidor ou cliente pagante na Europa pode estar sujeita ao RGPD por causa de um formulário de _newsletter_ ou de um _pixel_ de rastreamento. Foi essa cláusula que fez a lei europeia virar padrão de fato global — o chamado "efeito Bruxelas" —, e é ela que a [LGPD](/notas/lgpd) copiou no [art. 3º](/notas/lgpd#art-3).

A terceira é **o sistema de aplicação**. O RGPD não criou um regulador europeu: manteve uma autoridade por Estado-Membro ([art. 51.º](#art-51)) e inventou o **balcão único** ([art. 56.º](#art-56)), pelo qual uma empresa com estabelecimento principal na Irlanda responde perante a autoridade irlandesa por tudo o que faz na União. A ideia era simplificar a vida das empresas; o efeito colateral foi concentrar a fiscalização das maiores plataformas do mundo numa autoridade pequena, com filas de anos, e transferir a resolução dos conflitos para o CEPD. Boa parte da história da execução do RGPD é a história dessa tensão — e é ela que o [Regulamento (UE) 2025/2518](#reg2518-art-1) veio destravar, com prazos e ritos processuais que passam a valer em abril de 2027.

Passados oito anos da aplicação, o balanço tem duas metades. De um lado, o regulamento produziu um corpo de jurisprudência que fixou coisas que o texto não dizia: que dano moral indenizável exige dano concreto, mas não exige gravidade mínima; que coima exige culpa; que "empresa", para calcular a multa, é o grupo econômico inteiro; que dado pseudonimizado pode ser pessoal para quem o gerou e não ser para quem o recebe. De outro, acumulou-se a percepção — dentro e fora da Comissão — de que o custo de conformidade ficou desproporcional para quem é pequeno, e de que a lei escrita antes do ChatGPT não responde bem ao treinamento de modelos.

Daí o **Digital Omnibus**, proposto pela Comissão em 19 de novembro de 2025 e partido em dois. A metade da inteligência artificial virou o [Regulamento (UE) 2026/1744](/notas/ai-act), em vigor desde julho de 2026. A metade dos **dados** — a que mexeria no RGPD — continua em negociação, e mal: a presidência cipriota retirou seu texto de compromisso do Coreper ao fim de junho de 2026 por não reunir maioria qualificada, e a presidência irlandesa reabriu a discussão em julho. **Até agora, portanto, o RGPD que se aplica é o de 2016** — e é ele que está no painel ao lado.

## Fundamentos

### Objeto e objetivos ([art. 1.º](#art-1))

O regulamento declara dois objetivos que puxam para lados diferentes, e a tensão entre eles explica boa parte de suas soluções de compromisso: **proteger os direitos e liberdades fundamentais** das pessoas singulares, em especial o direito à proteção de dados, e **assegurar a livre circulação** desses dados dentro da União. O [n.º 3](#art-1-p3) é explícito: a livre circulação "não é restringida nem proibida" por motivos de proteção de dados.

Isso é a estrutura da lei: no direito europeu, proteção de dados é **um regime que autoriza o tratamento sob condições**. A [LGPD](/notas/lgpd) diz a mesma coisa quando põe, no mesmo [art. 2º](/notas/lgpd#art-2), a privacidade e o desenvolvimento econômico e a inovação.

### Uma lei de direitos, não de produto

O contraste com o [AI Act](/notas/ai-act) ajuda: é a outra grande norma digital europeia e funciona de um jeito completamente diferente. O AI Act é uma **norma de produto**: fala em colocação no mercado, avaliação da conformidade, marcação CE, organismos notificados. O RGPD é uma **norma de conduta e de direitos**: fala em princípios, bases de licitude, direitos exercíveis pelo titular e responsabilidade do agente. Um se cumpre antes de o produto chegar ao mercado; o outro se cumpre continuamente, em cada operação, e se comprova depois.

A consequência prática é que o RGPD não tem uma lista de "sistemas proibidos". Ele tem princípios abertos ([art. 5.º](#art-5)) e um dever de demonstrar cumprimento — a **responsabilidade proativa**, ou _accountability_ ([art. 5.º, n.º 2](#art-5-p2) e [art. 24.º](#art-24)). Quem trata dados não precisa só cumprir a lei: precisa poder provar que cumpre.

### O regulamento e o direito nacional: as cláusulas de abertura

Um regulamento europeu, em regra, não admite lei nacional no mesmo campo. O RGPD é a exceção mais conhecida: em dezenas de pontos ele **remete ao direito do Estado-Membro**. Os mais relevantes:

- a **idade** a partir da qual a criança consente sozinha em serviços da sociedade da informação: 16 anos por padrão, mas cada país pode baixar até 13 ([art. 8.º, n.º 1](#art-8-p1)) — e a maioria baixou, o que faz o limite variar de 13 a 16 conforme o Estado-Membro;
- o **tratamento no contexto laboral** ([art. 88.º](#art-88)), em que os países podem ser mais protetivos que o regulamento;
- **jornalismo e expressão** ([art. 85.º](#art-85)): as derrogações são desenhadas por lei nacional, não pelo RGPD;
- o **número de identificação nacional** ([art. 87.º](#art-87)) — o equivalente ao CPF;
- as **limitações** a direitos e princípios por razões de segurança, defesa e interesse público ([art. 23.º](#art-23));
- as **coimas aplicáveis a autoridades e organismos públicos** ([art. 83.º, n.º 7](#art-83-p7)): cada país decide se o Estado paga multa — e vários decidiram que não.

É por isso que, na prática, não existe "o RGPD" isolado: existe o RGPD mais a lei de proteção de dados de cada país. Vale ter isso em conta ao comparar com a [LGPD](/notas/lgpd) — de um lado está uma lei nacional; do outro, um regulamento **mais** a lei do Estado-Membro que importa no caso.

### Terminologia: PT-PT × pt-BR

O texto oficial em português é o de Portugal; estes comentários são escritos em português do Brasil. A ortografia aqui é a brasileira — "registro", "eletrônico", "seção", "fato" —, mas **os termos técnicos do regulamento ficam como estão no texto oficial**, para que a palavra procurada nos comentários seja a mesma que aparece no painel ao lado. As correspondências que valem a pena fixar:

**Sujeitos**

| No RGPD (PT-PT) | Na LGPD e na prática brasileira |
| --- | --- |
| **titular dos dados** | titular ([art. 5º, V](/notas/lgpd#art-5-v)) |
| **responsável pelo tratamento** | controlador ([art. 5º, VI](/notas/lgpd#art-5-vi)) |
| **subcontratante** | operador ([art. 5º, VII](/notas/lgpd#art-5-vii)) |
| **encarregado da proteção de dados** (EPD, ou _DPO_) | encarregado ([art. 5º, VIII](/notas/lgpd#art-5-viii)) |
| **autoridade de controlo** | autoridade nacional (a ANPD) |
| **pessoa singular** / **pessoa coletiva** | pessoa natural / pessoa jurídica |

**Atos e conceitos**

| No RGPD (PT-PT) | Na LGPD e na prática brasileira |
| --- | --- |
| **recolha** | coleta |
| **conservação** | armazenamento |
| **apagamento** | eliminação |
| **retificação** | correção |
| **limitação do tratamento** | bloqueio ([art. 5º, XIII](/notas/lgpd#art-5-xiii)) |
| **definição de perfis** | perfilamento (_profiling_) |
| **violação de dados pessoais** | incidente de segurança ([art. 48](/notas/lgpd#art-48)) |
| **avaliação de impacto sobre a proteção de dados** (AIPD) | relatório de impacto à proteção de dados pessoais ([art. 5º, XVII](/notas/lgpd#art-5-xvii)) |
| **regras vinculativas aplicáveis às empresas** (_BCR_) | normas corporativas globais ([art. 33, II, "c"](/notas/lgpd#art-33-ii-c)) |
| **cláusulas-tipo de proteção de dados** | cláusulas-padrão contratuais ([art. 33, II, "b"](/notas/lgpd#art-33-ii-b)) |
| **decisão de adequação** | reconhecimento de grau de proteção adequado ([art. 33, I](/notas/lgpd#art-33-i)) |
| **ficheiro** | banco de dados (com a diferença explicada abaixo) |
| **coima** | multa administrativa |
| **serviços da sociedade da informação** | aplicações de internet, no vocabulário do [Marco Civil](/notas/mci#art-5-vii) |

**Órgãos**

- **Comité Europeu para a Proteção de Dados (CEPD)** — o colegiado das autoridades nacionais, grafado "Comité" no texto oficial. É o _European Data Protection Board_ (EDPB) da literatura em inglês; esta nota usa a designação oficial em português.
- **Autoridade Europeia para a Proteção de Dados (AEPD)** — o regulador das próprias instituições da União (_European Data Protection Supervisor_, EDPS). Não confundir com o CEPD, nem com a AEPD espanhola (a _Agencia Española de Protección de Datos_).

Três armadilhas específicas:

- **"Ficheiro" não é "arquivo de computador"**, e é a palavra que define quando o regulamento alcança papel: o [art. 2.º, n.º 1](#art-2-p1) aplica o RGPD ao tratamento não automatizado apenas de dados **contidos em ficheiros ou a eles destinados**, isto é, num conjunto estruturado e acessível segundo critérios ([art. 4.º, ponto 6](#art-4)). Uma caixa de fichas organizada por nome está dentro; uma pilha desorganizada de papéis, não. A [LGPD](/notas/lgpd) é mais larga aqui: alcança o tratamento "independentemente do meio" ([art. 3º](/notas/lgpd#art-3)), sem essa exigência de estrutura.
- **"Legítimo interesse" é a mesma coisa, "interesse público" não.** A base do [art. 6.º, n.º 1, alínea e)](#art-6-p1-e) — exercício de funções de interesse público — é usada na Europa pelo setor público, enquanto no Brasil o [art. 23 da LGPD](/notas/lgpd#art-23) tem capítulo próprio para o Poder Público.
- **"Operador"**, no [AI Act](/notas/ai-act#art-3), é o gênero que abrange prestador, importador e distribuidor — e **não** corresponde ao "operador" da [LGPD](/notas/lgpd#art-5-vii), que é o _subcontratante_ do RGPD. Duas leis europeias, dois sentidos, e nenhum deles igual ao brasileiro.

## Aplicação ([arts. 2.º](#art-2) e [3.º](#art-3))

**Materialmente** ([art. 2.º, n.º 1](#art-2-p1)), o RGPD alcança o tratamento de dados pessoais por meios total ou parcialmente automatizados, e o tratamento não automatizado de dados contidos em ficheiros.

**Territorialmente** ([art. 3.º](#art-3)), alcança três situações, alternativas — basta uma:

- tratamento efetuado **no contexto das atividades de um estabelecimento** do responsável ou do subcontratante situado na União, ocorra o tratamento dentro ou fora dela ([n.º 1](#art-3-p1)). "Estabelecimento" aqui é conceito material, não formal: o Tribunal de Justiça já reconheceu estabelecimento em estrutura local de vendas e publicidade que apenas dava suporte econômico à operação estrangeira;
- tratamento de dados de titulares **que se encontrem** na União, por responsável ou subcontratante **não estabelecido** nela, quando as atividades estejam relacionadas com a **oferta de bens ou serviços** a esses titulares — pagos ou gratuitos — ou com o **controlo do seu comportamento** dentro da União ([n.º 2](#art-3-p2));
- tratamento por responsável estabelecido fora da União, mas em lugar onde se aplique o direito de um Estado-Membro por força do direito internacional público ([n.º 3](#art-3-p3)) — embaixadas, navios.

Duas consequências práticas que costumam surpreender quem lê rápido:

- **"Que se encontrem" não é "residentes".** A tradução original errava nisso, e a [retificação de 2018](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679R(02)) corrigiu. Um brasileiro em viagem pela Europa é titular protegido enquanto está lá; um europeu morando no Brasil, para essa hipótese, não é.
- **Não basta ser acessível.** O considerando 23 exige que a oferta seja **direcionada**: idioma, moeda, domínio, entrega, menção a clientes europeus. Um site brasileiro em português, que cobra em reais e só entrega no Brasil, não passa a estar sujeito ao RGPD porque alguém o abriu de Lisboa. O que sujeita é o direcionamento — ou o rastreamento.

Quem está sujeito ao regulamento sem estar estabelecido na União precisa designar por escrito um **representante** na União ([art. 27.º](#art-27)), salvo se o tratamento for ocasional, não envolver dados sensíveis em larga escala e for improvável que gere risco. É o equivalente funcional do agente de que fala o [art. 61 da LGPD](/notas/lgpd#art-61) — com a diferença de que o brasileiro é regra de citação processual, e o europeu é uma obrigação substantiva, cujo descumprimento é ele próprio infração.

## Não aplicação ([art. 2.º, n.º 2](#art-2-p2))

O RGPD **não se aplica** ao tratamento:

- efetuado no exercício de **atividades não sujeitas à aplicação do direito da União** ([alínea a)](#art-2-p2-a)) — na prática, segurança nacional;
- efetuado pelos Estados-Membros no âmbito da **política externa e de segurança comum** ([alínea b)](#art-2-p2-b));
- efetuado por **pessoa singular no exercício de atividades exclusivamente pessoais ou domésticas** ([alínea c)](#art-2-p2-c)) — a "exceção doméstica", paralela direta do [art. 4º, I, da LGPD](/notas/lgpd#art-4-i);
- efetuado pelas **autoridades competentes** para prevenção, investigação, detecção e repressão de infrações penais ou execução de sanções penais ([alínea d)](#art-2-p2-d)) — campo da Diretiva (UE) 2016/680.

A exceção doméstica é mais estreita do que parece, e a jurisprudência a apertou desde cedo: publicar dados de terceiros numa página aberta na internet **não** é atividade puramente pessoal, decidiu o Tribunal de Justiça já em 2003 (processo C-101/01), e uma câmera doméstica que filma também a via pública sai da exceção (processo C-212/13, de 2014). Como na [LGPD](/notas/lgpd#art-4), a palavra dura é "exclusivamente".

Repare no que **não** está na lista: não há exceção para dados de pessoas falecidas (o considerando 27 deixa isso ao direito nacional), nem para pessoas jurídicas — o RGPD, como a [LGPD](/notas/lgpd), protege apenas a **pessoa singular** ([art. 1.º, n.º 1](#art-1-p1)).

## Princípios ([art. 5.º](#art-5))

São seis princípios, mais o dever de comprová-los. Vale ler lado a lado com os dez princípios do [art. 6º da LGPD](/notas/lgpd#art-6): a lista brasileira é mais longa porque desdobra em incisos separados o que o europeu agrupa.

- **Licitude, lealdade e transparência** ([alínea a)](#art-5-p1-a)) — a "lealdade" (_fairness_) é um princípio autônomo, e é o que permite censurar um tratamento formalmente lícito mas manipulador ou surpreendente para o titular. Na LGPD, o correspondente é a **boa-fé** que o [caput do art. 6º](/notas/lgpd#art-6) manda observar antes de listar os princípios.
- **Limitação das finalidades** ([alínea b)](#art-5-p1-b)) — finalidades determinadas, explícitas e legítimas, e nada de tratamento posterior incompatível com elas. O teste de compatibilidade está no [art. 6.º, n.º 4](#art-6-p4).
- **Minimização dos dados** ([alínea c)](#art-5-p1-c)) — adequados, pertinentes e limitados ao necessário. Foi com base neste princípio que o Tribunal de Justiça, em 2024, disse que uma plataforma não pode acumular dados para publicidade **sem limite de tempo** (processo C-446/21).
- **Exatidão** ([alínea d)](#art-5-p1-d)).
- **Limitação da conservação** ([alínea e)](#art-5-p1-e)) — guardar apenas pelo tempo necessário. É o princípio que sustenta a maior parte das coimas por retenção excessiva.
- **Integridade e confidencialidade** ([alínea f)](#art-5-p1-f)) — segurança, detalhada no [art. 32.º](#art-32).
- **Responsabilidade** ([n.º 2](#art-5-p2)) — o responsável **é responsável** pelo cumprimento e **tem de poder comprová-lo**. Este é o dispositivo que transforma proteção de dados em programa de governança documentado, e é a matriz do [art. 6º, X, da LGPD](/notas/lgpd#art-6-x).

## Bases legais: as condições de licitude ([arts. 6.º a 11.º](#art-6))

### As seis bases do [art. 6.º](#art-6)

Todo tratamento precisa de **pelo menos uma** base, escolhida **antes** de o tratamento começar. E o entendimento firmado pelo CEPD é que ela não se troca no meio do caminho: quem apoiou uma campanha em consentimento e o vê retirado não pode migrar para legítimo interesse para continuar tratando.

- [alínea a)](#art-6-p1-a) — **consentimento** do titular para uma ou mais finalidades específicas;
- [alínea b)](#art-6-p1-b) — **execução de contrato** de que o titular é parte, ou diligências pré-contratuais a pedido dele;
- [alínea c)](#art-6-p1-c) — **obrigação jurídica** a que o responsável esteja sujeito;
- [alínea d)](#art-6-p1-d) — **interesses vitais** do titular ou de outra pessoa;
- [alínea e)](#art-6-p1-e) — **interesse público** ou exercício de autoridade pública;
- [alínea f)](#art-6-p1-f) — **interesses legítimos** do responsável ou de terceiro, salvo se prevalecerem os interesses ou direitos fundamentais do titular, "em especial se o titular for uma criança".

São **seis**, contra as **dez** hipóteses do [art. 7º da LGPD](/notas/lgpd#art-7). A lei brasileira criou bases que a europeia não tem — proteção do crédito ([inciso X](/notas/lgpd#art-7-x)), tutela da saúde ([inciso VIII](/notas/lgpd#art-7-viii)) e exercício regular de direitos em processo ([inciso VI](/notas/lgpd#art-7-vi)) — e recortou de forma diferente o que na Europa cabe numa base só.

Duas regras do RGPD sem paralelo no texto da LGPD:

- **O setor público não pode invocar interesse legítimo** no exercício de suas funções ([art. 6.º, n.º 1, último parágrafo](#art-6-p1)). A LGPD não traz vedação equivalente no [art. 7º, IX](/notas/lgpd#art-7-ix); a disciplina do Poder Público está concentrada, no Brasil, no capítulo próprio do [art. 23](/notas/lgpd#art-23).
- **Bases dos incisos c) e e) exigem previsão em lei** da União ou do Estado-Membro ([art. 6.º, n.º 3](#art-6-p3)) — não basta o responsável achar que há obrigação ou interesse público.

O [art. 6.º, n.º 4](#art-6-p4) traz o **teste de compatibilidade** para tratamento com finalidade nova: consideram-se o vínculo entre as finalidades, o contexto da coleta, a natureza dos dados, as consequências e a existência de salvaguardas como cifragem ou pseudonimização. Se passar no teste, não é preciso nova base. A LGPD não escreve esse teste: o controle do uso posterior fica com os princípios da **finalidade** e da **adequação** ([art. 6º, I](/notas/lgpd#art-6-i) e [II](/notas/lgpd#art-6-ii)).

### Consentimento ([arts. 7.º](#art-7) e [8.º](#art-8))

O RGPD escreve quatro condições de validade do consentimento que a LGPD não detalha no mesmo grau — e é um dos pontos que costumam exigir ajuste quando um programa de conformidade passa de um regime para o outro:

- o responsável tem de **poder demonstrar** que o titular consentiu ([n.º 1](#art-7-p1));
- num documento que trate de outros assuntos, o pedido de consentimento tem de ser **claramente distinguível**, inteligível e em linguagem clara ([n.º 2](#art-7-p2));
- retirar o consentimento tem de ser **tão fácil quanto dá-lo**, e a retirada é livre a qualquer momento ([n.º 3](#art-7-p3)) — o botão de "descadastrar" não pode ser mais difícil que o de assinar;
- o consentimento **não é livre** se a execução de um contrato estiver condicionada a consentir num tratamento **não necessário** a esse contrato ([n.º 4](#art-7-p4)). É a proibição do "consentimento agrupado", e é a norma que sustenta boa parte das decisões contra publicidade comportamental.

Para **crianças**, o [art. 8.º](#art-8) exige consentimento (ou autorização) de quem exerce as responsabilidades parentais quando o serviço da sociedade da informação é oferecido diretamente a menores de **16 anos**, permitindo que cada Estado-Membro baixe esse limite até **13**. Compare com o [art. 14 da LGPD](/notas/lgpd#art-14), que fixa o melhor interesse como critério e exige consentimento específico de **um dos pais ou responsável** para dados de crianças (até 12 anos incompletos), e com o [ECA Digital](/notas/eca-digital), que foi muito além dos dois ao desenhar verificação de idade e supervisão parental.

#### Como se comprova a idade sem identificar o usuário

O [art. 8.º](#art-8) fixa o limiar etário e cala sobre como aferi-lo. É aí que a discussão europeia se concentrou, e o [Radar Tecnológico nº 5 da ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar-tecnologico-5-mecanismos-de-afericao-de-idade.pdf) (outubro de 2025), detalhado na nota do [ECA Digital](/notas/eca-digital), reúne três peças que interessam a quem lê o RGPD:

- **Declaração 1/2025 do CEPD sobre garantia de idade** — dez princípios para o tratamento de dados nesse contexto, entre eles limitar a coleta ao mínimo necessário, avaliar riscos previamente, aplicar proteção de dados desde a concepção e assegurar licitude, transparência e responsabilização dos provedores. O comité já havia registrado, em documento anterior, que mecanismos de aferição de idade podem, eles próprios, afetar direitos fundamentais.
- **_EU Age Verification Solution_** — a "mini carteira" lançada em piloto pela Comissão Europeia em julho de 2025, que permite comprovar a maioridade sem partilhar qualquer outro dado pessoal, com emissão e apresentação da prova feitas por **entidades separadas**, para impedir o rastreamento entre serviços. É interoperável com a _EU Digital Identity Wallet_ prevista pelo eIDAS.
- **A crítica de exclusão** — a European Digital Rights (EDRi) estima que uma carteira de identidade eletrônica poderia deixar de fora **20% dos usuários**, o que põe a acessibilidade no plano dos direitos.

Duas peças dão suporte a esse desenho. As **provas de conhecimento zero** (_zero-knowledge proofs_) permitem demonstrar matematicamente o atendimento ao critério etário sem revelar a data de nascimento — o serviço recebe "sim" ou "não". O **modelo duplo-cego** é o arranjo de confiança que rege a circulação da credencial: nem o emissor sabe onde ela será usada, nem o serviço sabe quem está por trás dela. Uma é método criptográfico, o outro é arquitetura — e podem ser combinados.

O ponto de contato com o RGPD é direto: minimização ([art. 5.º, n.º 1, alínea c)](#art-5-p1-c)) e proteção de dados desde a conceção e por defeito ([art. 25.º](#art-25)) são o que essas arquiteturas tentam operacionalizar. E é útil ler esse conjunto ao lado do [ECA Digital](/notas/eca-digital) brasileiro, que positivou requisitos equivalentes — minimização, vedação de finalidade secundária, vedação de rastreabilidade — num nível de detalhe que o RGPD deixou para o intérprete.

### Categorias especiais ([art. 9.º](#art-9)) e dados penais ([art. 10.º](#art-10))

O [art. 9.º, n.º 1](#art-9-p1) começa **proibindo** o tratamento de dados sensíveis, e o [n.º 2](#art-9-p2) abre dez exceções — entre elas o **consentimento explícito** ([alínea a)](#art-9-p2-a)), o direito laboral e da segurança social ([alínea b)](#art-9-p2-b)), a **manifesta publicização pelo próprio titular** ([alínea e)](#art-9-p2-e)), a medicina e a saúde pública ([alíneas h)](#art-9-p2-h) e [i)](#art-9-p2-i)) e o arquivo, a investigação científica e a estatística ([alínea j)](#art-9-p2-j)).

A técnica é a mesma do [art. 11 da LGPD](/notas/lgpd#art-11) — proibição com exceções, e consentimento **específico e destacado** no lugar do "explícito" europeu. Uma diferença que importa: o [art. 9.º](#art-9) exige, para várias exceções, que o direito nacional preveja **medidas adequadas de salvaguarda**; a LGPD delega isso à ANPD e ao regulamento.

Sobre a alínea e) — dados "manifestamente tornados públicos pelo titular" —, o Tribunal de Justiça a leu de forma **estrita** em 2024 (processo C-446/21): declarar publicamente a própria orientação sexual num evento não autoriza a plataforma a usar esse dado para publicidade personalizada. A regra brasileira do [art. 7º, § 4º](/notas/lgpd#art-7-p4), sobre dados tornados manifestamente públicos, guarda o mesmo espírito — dispensa a base, não dispensa a finalidade legítima.

O [art. 10.º](#art-10) reserva o tratamento de **dados de condenações e infrações penais** ao controle de autoridade pública ou a autorização legal com garantias adequadas, e proíbe registros completos de condenações fora do controle estatal. A LGPD não tem dispositivo específico sobre esses dados; no Brasil, a matéria é regida pelo sigilo processual, pela Lei de Acesso à Informação e pelas regras de certidões e antecedentes.

## Direitos do titular (Capítulo III, [arts. 12.º a 23.º](#art-12))

### O artigo que rege todos os outros ([art. 12.º](#art-12))

Antes de listar direitos, o RGPD fixa **como** eles se exercem: informação concisa, transparente, inteligível, de fácil acesso e em linguagem clara e simples, "em especial quando dirigida a crianças" ([n.º 1](#art-12-p1)). A resposta é **gratuita** ([n.º 5](#art-12-p5)) e vem em **um mês**, prorrogável por mais dois em casos complexos ([n.º 3](#art-12-p3)). Pedido manifestamente infundado ou excessivo pode ser recusado ou cobrado — mas o **ônus de provar** esse caráter é do responsável ([n.º 5](#art-12-p5)).

Contraste com a LGPD: o prazo brasileiro para confirmação e acesso é de **15 dias** ([art. 19, II](/notas/lgpd#art-19-ii)), e o formato simplificado é **imediato** ([art. 19, I](/notas/lgpd#art-19-i)). O europeu dá mais tempo; o brasileiro, mais pressa.

### Informação ([arts. 13.º](#art-13) e [14.º](#art-14))

Dois artigos densos, e a distinção entre eles é a origem do dado: [art. 13.º](#art-13) quando os dados vêm **do próprio titular**; [art. 14.º](#art-14) quando vêm **de outro lugar** — e aí é preciso informar também **de que fonte** vieram ([n.º 2, alínea f)](#art-14-p2-f)), num prazo máximo de um mês ([n.º 3](#art-14-p3)).

Em ambos entram: identidade e contato do responsável e do encarregado, finalidades **e a base jurídica**, os legítimos interesses invocados, destinatários, transferências internacionais e suas garantias, prazo de conservação, os direitos do titular, o direito de reclamar à autoridade e a existência de **decisões automatizadas**, com "informações úteis relativas à lógica subjacente" e as consequências previstas.

São as listas mais longas do regulamento: somadas, passam de vinte itens entre os dois artigos, contra os seis incisos do [art. 9º da LGPD](/notas/lgpd#art-9) — que, em compensação, delega à ANPD a fixação de conteúdo adicional. Transparência é também o tema escolhido pelo CEPD para a sua [ação coordenada de fiscalização de 2026](https://www.edpb.europa.eu/news/news/2025/coordinated-enforcement-framework-edpb-selects-topic-2026_en).

### Acesso, retificação, apagamento, limitação e portabilidade ([arts. 15.º a 20.º](#art-15))

- **Acesso** ([art. 15.º](#art-15)) — confirmação, cópia dos dados e um rol de metadados. O Tribunal de Justiça já decidiu que "destinatários" significa a **identidade** de quem recebeu os dados, salvo impossibilidade, e não apenas as categorias.
- **Retificação** ([art. 16.º](#art-16)) — correção e completação, inclusive por declaração adicional.
- **Apagamento**, o "**direito a ser esquecido**" ([art. 17.º](#art-17)) — em seis hipóteses ([n.º 1](#art-17-p1)), entre elas o fim da necessidade, a retirada do consentimento, a oposição procedente e o tratamento ilícito. O [n.º 2](#art-17-p2) manda o responsável que tornou os dados públicos avisar os demais responsáveis; o [n.º 3](#art-17-p3) exclui, entre outras, a liberdade de expressão e informação. A LGPD trata do tema como **eliminação** ([art. 18, VI](/notas/lgpd#art-18-vi)), que é direito do titular sem lista de hipóteses e exceções no próprio dispositivo — as ressalvas estão no [art. 16](/notas/lgpd#art-16), que fixa quando os dados podem ser conservados.
- **Limitação do tratamento** ([art. 18.º](#art-18)) — o dado fica conservado, mas congelado. É o **bloqueio** do [art. 18, IV, da LGPD](/notas/lgpd#art-18-iv).
- **Notificação a terceiros** ([art. 19.º](#art-19)) — o responsável comunica retificações, apagamentos e limitações a cada destinatário, e informa quem são, se o titular pedir. Espelha o [art. 18, § 6º, da LGPD](/notas/lgpd#art-18-p6).
- **Portabilidade** ([art. 20.º](#art-20)) — em formato estruturado, de uso corrente e leitura automática, e com direito à transmissão **direta** entre responsáveis quando tecnicamente possível ([n.º 2](#art-20-p2)). O direito é mais estreito do que se costuma supor: só alcança dados **fornecidos pelo titular**, tratados por meios automatizados, e apenas quando a base for **consentimento ou contrato** ([n.º 1](#art-20-p1)). Nada de portabilidade sobre dado tratado por legítimo interesse.

### Oposição e decisões automatizadas ([arts. 21.º](#art-21) e [22.º](#art-22))

O **direito de oposição** ([art. 21.º](#art-21)) vale contra tratamentos fundados em interesse público ou legítimo interesse, e obriga o responsável a parar salvo se demonstrar razões imperiosas que prevaleçam. Para **comercialização direta**, porém, a oposição é **absoluta** ([n.º 2](#art-21-p2) e [n.º 3](#art-21-p3)): basta o titular se opor, sem justificar e sem ponderação. É a diferença mais nítida em relação ao [art. 18, § 2º, da LGPD](/notas/lgpd#art-18-p2), que condiciona a oposição à alegação de descumprimento.

O [art. 22.º](#art-22) dá ao titular o direito de **não ficar sujeito** a decisão exclusivamente automatizada com efeitos jurídicos ou impacto significativo. As exceções ([n.º 2](#art-22-p2)) são necessidade contratual, autorização legal e consentimento explícito — e, mesmo nelas, o responsável deve assegurar **intervenção humana**, o direito de manifestar o ponto de vista e o de contestar a decisão ([n.º 3](#art-22-p3)). Decisão automatizada sobre **dados sensíveis** só nas condições do [n.º 4](#art-22-p4).

Aqui está uma das divergências mais consequentes com a lei brasileira. O [art. 20 da LGPD](/notas/lgpd#art-20) garante o direito de **solicitar revisão** de decisões automatizadas, e o veto ao § 3º original retirou do texto a exigência de que a revisão fosse feita por pessoa natural. Os dois sistemas chegam ao mesmo requisito por caminhos diferentes: na Europa, a intervenção humana está no texto do [n.º 3](#art-22-p3); no Brasil, o **envolvimento humano significativo** foi firmado por [interpretação da ANPD](/notas/lgpd#envolvimento-humano-significativo) — via regulatória, e não legislativa. E, no [processo C-634/21](https://curia.europa.eu/juris/liste.jsf?num=C-634/21), de 7 de dezembro de 2023, o Tribunal de Justiça foi além: a **produção do escore** por um birô de crédito já é, ela própria, decisão automatizada quando o banco decide com base determinante nele — a responsabilidade não é só de quem nega o crédito.

### Limitações ([art. 23.º](#art-23))

Os Estados-Membros podem restringir direitos e princípios por medida legislativa, desde que respeitem o conteúdo essencial dos direitos fundamentais e sejam necessárias e proporcionadas, para finalidades taxativas ([n.º 1](#art-23-p1)) — segurança nacional, defesa, segurança pública, prevenção e repressão penal, entre outras. O [n.º 2](#art-23-p2) exige que a lei restritiva especifique finalidades, categorias, salvaguardas e prazos: não basta invocar segurança, é preciso escrever a restrição com precisão.

## Deveres do responsável e do subcontratante (Capítulo IV, [arts. 24.º a 43.º](#art-24))

### Responsabilidade, proteção desde a conceção e por defeito ([arts. 24.º a 26.º](#art-24))

- **Responsabilidade** ([art. 24.º](#art-24)) — medidas técnicas e organizativas adequadas, revistas e atualizadas, **capazes de comprovar** conformidade. Onde proporcional, políticas internas de proteção de dados.
- **Proteção desde a conceção e por defeito** ([art. 25.º](#art-25)) — o _privacy by design_ e o _by default_ como obrigação legal, não como boa prática. O [n.º 2](#art-25-p2) é o mais concreto: **por padrão**, só devem ser tratados os dados necessários, e os dados pessoais não podem, **sem intervenção do titular**, ser disponibilizados a um número indeterminado de pessoas. Um perfil que nasce público viola esse dispositivo. Na LGPD, o correspondente é o [art. 46, § 2º](/notas/lgpd#art-46-p2), que manda observar as medidas de segurança "desde a fase de concepção do produto ou do serviço até a sua execução" — mesma ideia, formulada como princípio em vez de regra de configuração padrão.
- **Responsáveis conjuntos** ([art. 26.º](#art-26)) — acordo que define quem cumpre o quê, cujo conteúdo essencial deve ser **disponibilizado ao titular**; e o titular pode exercer seus direitos **contra qualquer um** deles.

### Contrato com o subcontratante ([art. 28.º](#art-28))

Um dos artigos mais operacionais do regulamento e, na prática, o que mais gerou papel no mundo: o tratamento por subcontratante é regido por **contrato escrito**. O [n.º 3](#art-28-p3) manda que o contrato descreva objeto, duração, natureza e finalidade do tratamento, tipo de dados e categorias de titulares — e, além disso, imponha ao subcontratante oito deveres, das alíneas a) a h): tratar apenas mediante instruções documentadas, garantir o sigilo de quem tem acesso, adotar as medidas de segurança do [art. 32.º](#art-32), não subcontratar sem autorização, ajudar o responsável a atender os direitos do titular, ajudá-lo nos deveres dos [arts. 32.º a 36.º](#art-32), apagar ou devolver os dados ao fim do contrato e disponibilizar tudo o que for preciso para auditoria.

Um subcontratante que **determine finalidades e meios** por conta própria passa a ser **responsável** por esse tratamento ([n.º 10](#art-28-p10)). A LGPD resolve o mesmo problema pela via da responsabilidade: o operador responde solidariamente quando descumpre a lei ou deixa de seguir as instruções lícitas do controlador ([art. 42, § 1º, I](/notas/lgpd#art-42-p1-i)).

### Registro das atividades ([art. 30.º](#art-30))

Cada responsável e cada subcontratante mantém **registro escrito** das operações, com o conteúdo dos [n.os 1](#art-30-p1) e [2](#art-30-p2), disponível à autoridade quando solicitado ([n.º 4](#art-30-p4)).

A famosa dispensa para **empresas com menos de 250 trabalhadores** ([n.º 5](#art-30-p5)) é bem mais estreita do que se propaga: ela cai se o tratamento for **suscetível de implicar risco** para os direitos do titular, se **não for ocasional**, ou se abranger **dados sensíveis ou penais**. Uma loja com 10 funcionários que mantém cadastro de clientes trata dados de forma não ocasional — e, portanto, registra. É o equivalente ao [art. 37 da LGPD](/notas/lgpd#art-37), com a diferença de que a lei brasileira não traz dispensa por porte no próprio texto: quem cuida disso é a [Resolução CD/ANPD nº 2/2022](https://www.in.gov.br/web/dou/-/resolucao-cd/anpd-n-2-de-27-de-janeiro-de-2022-376562019).

### Segurança e violação de dados ([arts. 32.º a 34.º](#art-32))

O [art. 32.º](#art-32) exige medidas adequadas ao risco, e cita quatro exemplos: **pseudonimização e cifragem**, garantia de confidencialidade/integridade/disponibilidade/resiliência, capacidade de **restabelecer** o acesso depois de um incidente e **testar e avaliar regularmente** a eficácia das medidas. O [art. 46 da LGPD](/notas/lgpd#art-46) impõe o mesmo dever — medidas técnicas e administrativas aptas a proteger os dados —, sem trazer exemplos no texto: no Brasil, o detalhamento vem dos regulamentos e das orientações da ANPD.

O regime de **violação de dados** é o ponto em que o RGPD e a LGPD mais se distanciam na letra, e mais se aproximaram na prática:

| | RGPD | LGPD |
| --- | --- | --- |
| Prazo para notificar a autoridade | **72 horas** a contar do conhecimento ([art. 33.º, n.º 1](#art-33-p1)) | **3 dias úteis** ([art. 48, § 1º](/notas/lgpd#art-48-p1), na forma da [Resolução nº 15/2024](https://www.in.gov.br/web/dou/-/resolucao-cd/anpd-n-15-de-24-de-abril-de-2024-556243024)) |
| Quando notificar a autoridade | salvo se **improvável** que resulte em risco | quando puder acarretar **risco ou dano relevante** |
| Quando comunicar ao titular | **risco elevado** ([art. 34.º, n.º 1](#art-34-p1)) | risco ou dano relevante |
| Dispensa da comunicação ao titular | dados cifrados, medidas posteriores que afastem o risco, ou esforço desproporcionado (com comunicação pública em substituição) — [n.º 3](#art-34-p3) | avaliação da ANPD |
| Notificação em atraso | admitida, mas **acompanhada de justificação** ([n.º 1](#art-33-p1)) | idem |
| Registro interno | **sempre**, mesmo sem notificar ([n.º 5](#art-33-p5)) | idem, na resolução |

O subcontratante não notifica a autoridade: notifica **o responsável**, "sem demora injustificada" ([n.º 2](#art-33-p2)).

### Avaliação de impacto e consulta prévia ([arts. 35.º](#art-35) e [36.º](#art-36))

A **AIPD** é obrigatória quando o tratamento for suscetível de implicar **risco elevado**, e o [n.º 3](#art-35-p3) lista três casos em que ela sempre é devida: avaliação sistemática e completa de aspectos pessoais com base em tratamento automatizado (inclusive definição de perfis) que sirva de base a decisões com efeitos jurídicos; tratamento **em grande escala** de dados sensíveis ou penais; e **controlo sistemático** de zona acessível ao público em grande escala. As autoridades nacionais publicam listas próprias ([n.os 4](#art-35-p4) e [5](#art-35-p5)).

Se a AIPD indicar risco elevado **residual** — que o responsável não consegue mitigar —, é obrigatório consultar a autoridade **antes** de tratar ([art. 36.º](#art-36)), que tem até oito semanas, prorrogáveis por seis, para se manifestar.

A diferença com o Brasil é de desenho institucional, não de conceito: os dois sistemas têm o instrumento — a LGPD define o **relatório de impacto** no [art. 5º, XVII](/notas/lgpd#art-5-xvii) —, mas alocam de forma diferente a decisão de elaborá-lo. Na Europa, quem avalia se o risco é elevado e produz a AIPD é o próprio responsável, sujeito a controle posterior; no Brasil, o [art. 38](/notas/lgpd#art-38) põe a **ANPD** no gatilho, ao prever que ela pode determinar a elaboração do relatório.

### Encarregado da proteção de dados ([arts. 37.º a 39.º](#art-37))

A designação é **obrigatória** em três casos ([art. 37.º, n.º 1](#art-37-p1)): autoridades ou organismos públicos; atividades principais que exijam **controlo regular e sistemático em grande escala**; e atividades principais que consistam em tratamento **em grande escala** de dados sensíveis **ou** penais (é aqui que a retificação de 2018 trocou o "e" pelo "ou").

O encarregado pode ser **empregado ou prestador de serviços** ([n.º 6](#art-37-p6)), e um grupo pode designar um só, desde que acessível a partir de cada estabelecimento ([n.º 2](#art-37-p2)). O [art. 38.º](#art-38) blinda a função: não recebe instruções sobre o exercício das suas atribuições, não pode ser destituído nem penalizado por exercê-las e reporta diretamente à direção de topo. O [art. 39.º](#art-39) lista suas funções — informar, aconselhar, controlar a conformidade, aconselhar quanto à AIPD e ser ponto de contato da autoridade.

No Brasil, a repartição é outra: o [art. 41](/notas/lgpd#art-41) define o encarregado como **canal de comunicação** entre controlador, titulares e ANPD, e deixa para regulamento os critérios de obrigatoriedade e as condições de atuação — hoje na [Resolução CD/ANPD nº 18/2024](https://www.in.gov.br/web/dou/-/resolucao-cd/anpd-n-18-de-16-de-julho-de-2024-572632074). O que na Europa está na lei, aqui está na norma da autoridade.

### Códigos de conduta e certificação ([arts. 40.º a 43.º](#art-40))

Dois instrumentos voluntários que a lei transformou em prova de conformidade: **códigos de conduta** aprovados pela autoridade (e, se de alcance europeu, pela Comissão) e **certificações** por organismos acreditados, válidas por até três anos ([art. 42.º, n.º 7](#art-42-p7)). Aderir não isenta de responsabilidade, mas conta como circunstância atenuante no cálculo da coima ([art. 83.º, n.º 2, alínea j)](#art-83-p2-j)) — e serve, também, de garantia adequada para transferência internacional ([art. 46.º, n.º 2, alíneas e)](#art-46-p2-e) e [f)](#art-46-p2-f)). Os equivalentes brasileiros são as regras de boas práticas e governança do [art. 50 da LGPD](/notas/lgpd#art-50).

## Transferências internacionais (Capítulo V, [arts. 44.º a 50.º](#art-44))

A regra geral do [art. 44.º](#art-44) é que **o nível de proteção não pode ser comprometido** pela transferência — inclusive nas retransferências para um quarto país. A partir daí há três degraus, em ordem de preferência:

1. **Decisão de adequação** ([art. 45.º](#art-45)) — a Comissão avalia o país terceiro e, se concluir que a proteção é "essencialmente equivalente", a transferência dispensa qualquer autorização adicional ([n.º 1](#art-45-p1)). Os critérios estão no [n.º 2](#art-45-p2): Estado de direito, direitos fundamentais, acesso das autoridades públicas aos dados, existência de **autoridade independente** e compromissos internacionais. A decisão é revista periodicamente e pode ser revogada ([n.os 3](#art-45-p3) a [5](#art-45-p5)).
2. **Garantias adequadas** ([art. 46.º](#art-46)) — na falta de adequação: instrumento vinculativo entre autoridades públicas, **regras vinculativas aplicáveis às empresas** (BCR, detalhadas no [art. 47.º](#art-47)), **cláusulas-tipo** aprovadas pela Comissão ou pela autoridade, código de conduta ou certificação com compromissos vinculativos. Exige, em todos os casos, direitos oponíveis e vias de recurso efetivas para o titular.
3. **Derrogações** ([art. 49.º](#art-49)) — para situações específicas: consentimento explícito e informado dos riscos, execução de contrato, interesse público importante, exercício de direitos em processo, interesses vitais, registros públicos. São **excepcionais**, de leitura restrita, e a derrogação residual do [n.º 1, último parágrafo](#art-49-p1) — interesse legítimo imperioso — exige transferência não repetitiva, número limitado de titulares, avaliação documentada e comunicação à autoridade.

O [art. 48.º](#art-48) é curto e político: decisão de autoridade **judicial ou administrativa de país terceiro** só é executável na União se estiver baseada em acordo internacional em vigor. É o dispositivo que a Europa opõe a pedidos diretos de acesso a dados por autoridades estrangeiras.

Para o Brasil, o Capítulo V mudou de figura em **janeiro de 2026**: a [Decisão de Execução (UE) 2026/179](https://eur-lex.europa.eu/eli/dec_impl/2026/179/oj) reconheceu o país como adequado, e a [Resolução CD/ANPD nº 32/2026](https://www.in.gov.br/web/dou/-/resolucao-n-32-de-26-de-janeiro-de-2026-683334547) fez o mesmo em relação à União Europeia, na hipótese do [art. 33, I, da LGPD](/notas/lgpd#art-33-i). É a **primeira decisão de adequação sobre o Brasil**, e uma das poucas a cobrir setor público e privado de uma vez (ver "Comparação com a LGPD", abaixo).

## Autoridades de controlo (Capítulo VI, [arts. 51.º a 59.º](#art-51))

Cada Estado-Membro tem uma ou mais autoridades independentes ([art. 51.º](#art-51)). A **independência** do [art. 52.º](#art-52) é detalhada até o desconforto: os membros agem com total independência, não solicitam nem recebem instruções, não exercem atividade incompatível, têm recursos humanos, técnicos e financeiros próprios e escolhem o próprio pessoal ([n.os 1](#art-52-p1) a [5](#art-52-p5)). Isso é matéria constitucional europeia: o Tribunal de Justiça já condenou Estados-Membros por autoridades insuficientemente independentes, muito antes do RGPD.

O [art. 57.º](#art-57) lista **22 atribuições** e o [art. 58.º](#art-58) os **poderes**, em três blocos: investigação ([n.º 1](#art-58-p1)) — ordenar informações, auditar, acessar instalações e dados; correção ([n.º 2](#art-58-p2)) — advertir, repreender, ordenar o atendimento de pedidos do titular, ordenar a conformidade, **limitar ou proibir** o tratamento, ordenar retificação ou apagamento, retirar certificação, aplicar coima e **suspender fluxos de dados** para país terceiro; e autorização e consultivo ([n.º 3](#art-58-p3)).

Duas atribuições que a ANPD não tem: aconselhar **o parlamento e o governo** por iniciativa própria ([art. 58.º, n.º 3, alínea b)](#art-58-p3-b)) e, sobretudo, **litigar** — o [n.º 5](#art-58-p5) manda que cada Estado dê à autoridade poder para levar violações aos tribunais. É uma autoridade com legitimidade processual ativa, e não apenas administrativa.

## Cooperação e coerência: o balcão único (Capítulo VII, [arts. 60.º a 76.º](#art-60))

Quando um tratamento é **transfronteiriço**, a autoridade do **estabelecimento principal** vira **autoridade principal** ([art. 56.º](#art-56)) e conduz o caso, cooperando com as demais autoridades interessadas ([art. 60.º](#art-60)). Ela circula um **projeto de decisão**; as outras podem apresentar **objeção pertinente e fundamentada** em quatro semanas; se a principal não a acolher, o caso vai ao **mecanismo de coerência**.

O mecanismo tem dois níveis: **parecer do CEPD** ([art. 64.º](#art-64)), que não vincula, mas que a autoridade deve "ter na melhor conta" — e, se decidir não segui-lo, o caso escala —, e **decisão vinculativa** ([art. 65.º](#art-65)), adotada por maioria de dois terços, que a autoridade principal tem de executar. Há ainda um **procedimento de urgência** ([art. 66.º](#art-66)) para medidas provisórias de até três meses.

Foi por essa engrenagem que passaram as maiores coimas da história do regulamento: várias das decisões irlandesas contra grandes plataformas só chegaram ao valor final porque o CEPD, provocado por autoridades de outros países, determinou o agravamento.

E foi o gargalo dessa engrenagem que motivou o **[Regulamento (UE) 2025/2518](#reg2518-art-1)**, aplicável a partir de 2 de abril de 2027. O que ele acrescenta:

- **forma e conteúdo mínimos da reclamação** e obrigação de a autoridade se pronunciar sobre a admissibilidade ([art. 4.º](#reg2518-art-4));
- **resolução antecipada**, quando o responsável adota medidas que satisfazem o reclamante ([art. 5.º](#reg2518-art-5));
- **exposição sumária das questões essenciais**, que a autoridade principal envia às demais logo no início, para que os desacordos apareçam antes e não no fim ([art. 10.º](#reg2518-art-10));
- **prazos duros**: como regra, quinze meses para a autoridade principal apresentar o projeto de decisão, prorrogáveis por doze em casos complexos ([art. 12.º](#reg2518-art-12));
- **direito de audiência** da parte investigada sobre as conclusões preliminares ([art. 19.º](#reg2518-art-19)) e do reclamante sobre o que lhe diz respeito ([art. 20.º](#reg2518-art-20));
- **definição do que é uma objeção pertinente e fundamentada** ([art. 23.º](#reg2518-art-23)) — o conceito que mais travou o mecanismo de coerência;
- **regime de confidencialidade** e de acesso ao processo administrativo ([arts. 24.º](#reg2518-art-24) e [25.º](#reg2518-art-25));
- **prazos para o próprio CEPD** na resolução de litígios ([arts. 27.º a 30.º](#reg2518-art-27)) e no procedimento de urgência ([arts. 31.º a 33.º](#reg2518-art-31));
- **estatísticas públicas de execução** ([art. 34.º](#reg2518-art-34)).

É uma reforma de **processo**, não de direito material: nenhum direito do titular muda, nenhuma obrigação nova aparece. O que muda é a chance de uma reclamação apresentada em Lisboa contra uma empresa estabelecida em Dublin ter desfecho antes de a tecnologia discutida ficar obsoleta.

## Vias de recurso, responsabilidade e coimas (Capítulo VIII, [arts. 77.º a 84.º](#art-77))

O titular pode **reclamar à autoridade** do seu Estado-Membro, do seu local de trabalho ou do local da infração ([art. 77.º](#art-77)); pode **acionar judicialmente a autoridade** que não decide ou decide mal ([art. 78.º](#art-78)); e pode **acionar diretamente** o responsável ou o subcontratante, no foro do estabelecimento **ou no da sua própria residência** ([art. 79.º](#art-79)). Essa opção de foro é decisiva na prática: permite processar uma plataforma na comarca de casa.

O [art. 80.º](#art-80) admite **representação por entidade sem fins lucrativos** — mandato do titular no [n.º 1](#art-80-p1) e, se o direito nacional permitir, ação **independente de mandato** no [n.º 2](#art-80-p2). É o embrião da litigância coletiva de dados na Europa, hoje reforçada pela diretiva de ações coletivas.

O [art. 82.º](#art-82) dá direito a **indemnização** por danos materiais **e imateriais**, com responsabilidade solidária entre responsáveis e subcontratantes envolvidos ([n.º 4](#art-82-p4)) e exoneração de quem provar que não é de modo algum responsável pelo evento ([n.º 3](#art-82-p3)).

### O catálogo de coimas ([art. 83.º](#art-83))

Dois patamares, e é preciso ler a norma violada para saber em qual se cai:

- até **10 milhões de euros ou 2% do volume de negócios anual mundial** do exercício anterior, o que for **mais elevado** ([n.º 4](#art-83-p4)) — infrações às obrigações do responsável e do subcontratante (arts. 8.º, 11.º, 25.º a 39.º, 42.º e 43.º), dos organismos de certificação e dos organismos de supervisão de códigos;
- até **20 milhões de euros ou 4%** ([n.º 5](#art-83-p5)) — princípios ([arts. 5.º](#art-5), [6.º](#art-6), [7.º](#art-7) e [9.º](#art-9)), direitos dos titulares (arts. 12.º a 22.º), transferências internacionais (arts. 44.º a 49.º), obrigações do direito nacional do Capítulo IX e descumprimento de ordem da autoridade. O [n.º 6](#art-83-p6) equipara a este patamar o descumprimento de ordem do [art. 58.º, n.º 2](#art-58-p2).

O [n.º 2](#art-83-p2) lista **onze fatores** de dosimetria — natureza, gravidade e duração; caráter doloso ou negligente; medidas de mitigação; grau de responsabilidade considerando os arts. 25.º e 32.º; infrações anteriores; grau de cooperação; categorias de dados afetadas; forma como a autoridade tomou conhecimento; cumprimento de medidas anteriores; adesão a códigos ou certificações; e qualquer outro fator agravante ou atenuante, "como os benefícios financeiros obtidos".

Quatro pontos que a jurisprudência fixou e que não estão evidentes no texto:

- **coima exige culpa** — dolo ou negligência, não basta a infração objetiva (processo C-807/21, de 5 de dezembro de 2023);
- **"empresa" é o grupo econômico**, no sentido do direito da concorrência: o teto percentual se calcula sobre o volume de negócios mundial de toda a unidade econômica, e não só da subsidiária infratora (processo C-383/23, de 13 de fevereiro de 2025);
- **em concurso de infrações**, o total não pode exceder o montante previsto para a infração mais grave ([n.º 3](#art-83-p3));
- a coima do RGPD **não substitui** as demais sanções: o [art. 84.º](#art-84) manda os Estados preverem outras, inclusive penais.

Comparando com a [LGPD](/notas/lgpd#art-52): o teto brasileiro é de **2% do faturamento no Brasil, limitado a R$ 50 milhões por infração** — sem patamar duplo, sem referência a faturamento mundial e sem multa fixa alternativa. É a diferença de ordem de grandeza que explica por que quase todas as sanções bilionárias em proteção de dados são europeias.

## Situações específicas (Capítulo IX, [arts. 85.º a 91.º](#art-85))

Este capítulo é o que sobra da harmonização: sete artigos que mandam ou permitem que os Estados-Membros legislem.

- **Liberdade de expressão e de informação** ([art. 85.º](#art-85)) — cada país concilia o RGPD com o jornalismo, a academia, a arte e a literatura, e **deve** notificar à Comissão as regras que adotar. Compare com o [art. 4º, II, da LGPD](/notas/lgpd#art-4-ii), que resolve o mesmo problema com uma exclusão direta de aplicação.
- **Acesso do público a documentos oficiais** ([art. 86.º](#art-86)) — proteção de dados não se opõe automaticamente à transparência pública.
- **Número de identificação nacional** ([art. 87.º](#art-87)).
- **Contexto laboral** ([art. 88.º](#art-88)) — cada país pode ser mais protetivo, com regras específicas sobre recrutamento, execução do contrato, gestão, monitoramento no local de trabalho e cessação. Não existe correspondente na LGPD, e é aí que a Alemanha, por exemplo, construiu um regime muito mais rígido que a média europeia.
- **Arquivo, investigação científica e histórica e estatística** ([art. 89.º](#art-89)) — garantias, com destaque para a **minimização** e a pseudonimização, e possibilidade de derrogar direitos quando eles inviabilizarem a finalidade.
- **Sigilo profissional** ([art. 90.º](#art-90)) e **igrejas e associações religiosas** ([art. 91.º](#art-91)) — este último permitindo que regras eclesiásticas anteriores continuem, sob supervisão de autoridade própria.

## Quem pode o quê: a divisão de competências normativas

### Quem pode legislar

- A **União Europeia** — Parlamento e Conselho, sob proposta da Comissão —, com base no art. 16 do TFUE. Foi assim que nasceu o RGPD, e é assim que nasceria qualquer alteração dele: **processo legislativo ordinário**, sem atalho.
- Os **Estados-Membros**, apenas onde o próprio regulamento abre espaço (as cláusulas de abertura listadas acima). Fora delas, lei nacional que acrescente requisitos no campo já ocupado é incompatível com o direito da União.

### O que só o regulamento pode fazer

Definir o que é dado pessoal, quais são as bases de licitude, quais direitos o titular tem e quais os tetos das coimas. Nada disso é delegável — nem à Comissão, nem ao CEPD, nem às autoridades nacionais. É esse limite que o CEPD e a AEPD invocaram, na [opinião conjunta 2/2026](https://www.edpb.europa.eu/documents/legislative-opinion/edpb-edps-joint-opinion-22026-on-the-proposal-for-a-regulation-as_en), contra a proposta de deixar a Comissão decidir por ato de execução quando um dado pseudonimizado deixa de ser pessoal: seria definir por ato administrativo o **alcance** da própria lei.

### O que a Comissão Europeia pode fazer

Por **ato de execução** ([art. 93.º](#art-93)): decisões de adequação ([art. 45.º](#art-45)), cláusulas-tipo ([art. 46.º, n.º 2, alínea c)](#art-46-p2-c)), aprovação de códigos de conduta com alcance europeu ([art. 40.º, n.º 9](#art-40-p9)) e formatos e procedimentos de intercâmbio. Por **ato delegado** ([art. 92.º](#art-92)), pouco: os requisitos dos selos de certificação ([art. 43.º, n.º 8](#art-43-p8)) e a informação a apresentar por ícones ([art. 12.º, n.º 8](#art-12-p8)) — que, aliás, nunca foram editados.

Cabe-lhe ainda **avaliar e reportar** o regulamento periodicamente ([art. 97.º](#art-97)) — o relatório é o veículo formal por onde uma reforma como o Digital Omnibus se anuncia.

### O que o CEPD pode fazer

O [art. 70.º](#art-70) dá ao Comité 25 atribuições. Ele **emite diretrizes, recomendações e melhores práticas**, aprova critérios de acreditação, dá pareceres à Comissão e mantém registros públicos. Nada disso é lei — mas, como as autoridades nacionais o compõem e depois aplicam, na prática as diretrizes têm força de padrão.

O poder real e vinculativo está no [art. 65.º](#art-65): a **decisão de resolução de litígios**, que a autoridade nacional é obrigada a executar. É o instrumento pelo qual o coletivo europeu corrige a autoridade principal — e o que fez, mais de uma vez, uma coima projetada em dezenas de milhões de euros terminar em centenas de milhões.

### O que ficou com os Estados-Membros

Além das cláusulas de abertura: constituir e financiar a autoridade ([art. 54.º](#art-54)), definir se e como o **setor público** paga coima ([art. 83.º, n.º 7](#art-83-p7)), estabelecer as **demais sanções**, inclusive penais ([art. 84.º](#art-84)), e regular a legitimidade das entidades representativas ([art. 80.º, n.º 2](#art-80-p2)).

### Quem fiscaliza

A **autoridade nacional** — uma por Estado-Membro, no mínimo —, com o balcão único a definir qual delas conduz um caso transfronteiriço. A **Comissão** não fiscaliza empresas: fiscaliza Estados, e pode acioná-los no Tribunal de Justiça por incumprimento (foi assim que autoridades sem independência suficiente foram corrigidas). E o **Tribunal de Justiça** é a última palavra interpretativa, quase sempre por **reenvio prejudicial** de um tribunal nacional.

A diferença estrutural em relação ao Brasil é essa: o modelo europeu é **plural e descentralizado**, com um mecanismo de coerência por cima. O brasileiro é **unitário** — a [ANPD](/notas/regimento-interno-anpd) é a única autoridade, e o [art. 55-K da LGPD](/notas/lgpd#art-55-k) diz expressamente que suas competências prevalecem sobre as de outros órgãos.

## Cronologia: de 1995 a 2026

| Data | O que aconteceu |
| --- | --- |
| 1981 | Convenção 108 do Conselho da Europa — primeiro tratado internacional vinculativo sobre proteção de dados |
| 24/10/1995 | Diretiva 95/46/CE — o regime que o RGPD substituiu |
| 12/2009 | Carta dos Direitos Fundamentais ganha força de tratado, com o art. 8 (proteção de dados) |
| 25/1/2012 | Comissão propõe o RGPD |
| 8/4/2014 | Tribunal de Justiça invalida a Diretiva de Conservação de Dados (processos C-293/12 e C-594/12) |
| 13/5/2014 | Acórdão do "direito a ser esquecido" contra motor de busca (processo C-131/12) |
| 6/10/2015 | Queda do acordo "Porto Seguro" UE-EUA (processo C-362/14) |
| 27/4/2016 | RGPD adotado; publicado em 4/5/2016; em vigor em 24/5/2016 |
| **25/5/2018** | **RGPD passa a ser aplicável** ([art. 99.º, n.º 2](#art-99-p2)) |
| 23/5/2018 | Primeira retificação da versão portuguesa |
| 14/8/2018 | Brasil sanciona a [LGPD](/notas/lgpd), fortemente inspirada no RGPD |
| 16/7/2020 | Queda do "Escudo de Proteção da Privacidade" UE-EUA (processo C-311/18) |
| 4/3/2021 | Segunda retificação da versão portuguesa (definição de consentimento) |
| 2023 | Ano de virada na jurisprudência: dano, culpa, bases legais e escore automatizado |
| 10/7/2023 | Comissão adota a adequação do Quadro de Privacidade de Dados UE-EUA |
| 3/9/2025 | Tribunal Geral confirma a validade dessa adequação (processo T-553/23) |
| 4/9/2025 | Tribunal de Justiça adota a leitura relativa do dado pseudonimizado (processo C-413/23 P) |
| 19/11/2025 | Comissão propõe o **Digital Omnibus**, que altera o RGPD |
| 26/11/2025 | Adotado o Regulamento (UE) 2025/2518, sobre normas processuais |
| 26/1/2026 | Adequação mútua **Brasil–União Europeia** |
| 11/2/2026 | CEPD e AEPD publicam a opinião conjunta 2/2026 sobre o Omnibus |
| 30/6/2026 | Presidência cipriota retira do Coreper o texto de compromisso sobre dados |
| 1/7/2026 | Presidência irlandesa reabre a negociação |
| 2/4/2027 | Data em que o Regulamento (UE) 2025/2518 passa a ser aplicável |

## Alterações legislativas: o que mudou e o que está em negociação

### O que já mudou: o Regulamento (UE) 2025/2518

É a única alteração legislativa **concluída** no entorno do RGPD, e o alcance dela é estreito: preserva o articulado do regulamento, os direitos, as bases legais e as coimas, e dá **procedimento** ao balcão único, com prazos, direito de audiência e um conceito operacional de objeção pertinente e fundamentada, a partir de **2 de abril de 2027**. O texto está no painel ao lado.

Para quem opera no Brasil, o efeito prático é indireto mas real: uma empresa brasileira com estabelecimento na União passa a ter, a partir de 2027, um rito previsível — e prazos — na apuração de reclamações transfronteiriças.

### O que está em negociação: o Digital Omnibus sobre dados

Em **19 de novembro de 2025**, a Comissão apresentou o **Digital Omnibus**, um pacote de simplificação do arcabouço digital europeu. Ele foi partido em dois:

- a metade da **inteligência artificial** virou o [Regulamento (UE) 2026/1744](/notas/ai-act), em vigor desde 27 de julho de 2026 — ver a [nota do AI Act](/notas/ai-act);
- a metade dos **dados** — que alteraria o RGPD, a Diretiva ePrivacy, o Regulamento dos Dados, o Regulamento de Governação de Dados e a Diretiva NIS 2 — **continua em negociação**.

As alterações propostas ao RGPD, e por que cada uma é polêmica:

- **Definição de dado pessoal relativa ao agente.** Um conjunto de dados seria "pessoal" apenas para quem pode razoavelmente identificar o titular; para quem não pode, sairia do regulamento. É a codificação do que o Tribunal de Justiça decidiu em 2025 (processo C-413/23 P) — mas transposta do caso concreto para a definição geral do [art. 4.º](#art-4), o que o CEPD e a AEPD consideram um estreitamento do próprio alcance da lei.
- **Pseudonimização por ato de execução.** A Comissão poderia especificar, por ato administrativo, quando o dado pseudonimizado deixa de ser pessoal. É a objeção mais dura da opinião conjunta 2/2026: definir o alcance da lei não é matéria de execução.
- **Novo art. 88.º-A: _cookies_ e equipamento terminal**, trazendo para dentro do RGPD o que hoje está na Diretiva ePrivacy, com uma lista ampliada de casos dispensados de consentimento (medição de audiência de primeira parte, segurança, prestação do serviço pedido). Como os artigos propostos ainda não existem, eles não têm âncora no painel ao lado — o texto que está lá é o RGPD em vigor.
- **Novo art. 88.º-B: sinais automatizados de consentimento** — o navegador exprimiria a escolha do usuário de forma legível por máquina, e o responsável seria obrigado a respeitá-la. É a proposta que quase todos apoiam.
- **Novo art. 88.º-C: legítimo interesse para treinar modelos de IA**, com transparência reforçada e direito incondicional de oposição.
- **Dados sensíveis "residuais" em sistemas de IA** — derrogação para o caso em que dados de categoria especial aparecem incidentalmente no treino ou na operação, sem que essa fosse a finalidade.
- **Violação de dados**: prazo de notificação de **72 para 96 horas**, elevação do limiar (só notificar quando houver **risco elevado**) e **ponto único de entrada** para reportar sob RGPD, NIS 2, DORA e eIDAS de uma vez.
- **Pedidos abusivos do titular**: o [art. 12.º](#art-12) passaria a permitir recusar ou cobrar quando o direito for exercido para fins alheios à proteção de dados, com ônus probatório mais leve para o responsável.

**Onde a negociação está**, em agosto de 2026:

- o CEPD e a AEPD adotaram em **11 de fevereiro de 2026** a [opinião conjunta 2/2026](https://www.edpb.europa.eu/documents/legislative-opinion/edpb-edps-joint-opinion-22026-on-the-proposal-for-a-regulation-as_en). Apoiaram a simplificação de documentação, o limiar mais alto de notificação de violação, os sinais automatizados de consentimento e a harmonização do conceito de investigação científica; **pediram aos colegisladores que não adotassem** a nova definição de dado pessoal e a delegação sobre pseudonimização;
- no **Conselho**, a presidência cipriota retirou seu texto de compromisso do Coreper ao fim de junho de 2026, por não reunir maioria qualificada. Vários governos consideraram a simplificação insuficiente; o texto que circulava já havia **suprimido** do articulado a base de legítimo interesse para IA e as regras de _cookies_. A presidência irlandesa, que assumiu em 1º de julho de 2026, reabriu a discussão por questionário aos Estados-Membros;
- no **Parlamento Europeu**, o relatório de projeto de junho de 2026 evitou os pontos mais contenciosos, e mais de mil emendas foram apresentadas até o prazo de 15 de julho de 2026. A posição negocial do Parlamento não é esperada antes de 2027.

Em resumo: **nada do Digital Omnibus sobre dados está em vigor**, o desenho final é incerto e as três alterações mais estruturais do RGPD são as que perderam apoio no Conselho. Para quem estuda a norma hoje, o RGPD relevante é o de 2016, com as duas retificações.

### O que não foi adiante: o Regulamento ePrivacy

O episódio explica uma anomalia. A União tentou, de 2017 a 2025, substituir a Diretiva ePrivacy por um **regulamento** que modernizasse as regras de comunicações eletrônicas e _cookies_. Nunca houve acordo, e em **11 de fevereiro de 2025** a Comissão anunciou a **retirada da proposta**. O resultado é que o consentimento de _cookies_ continua regido por uma **diretiva de 2002**, transposta de 27 maneiras diferentes, enquanto os dados que os _cookies_ produzem são regidos por um regulamento de 2016. É essa incoerência que o Digital Omnibus tenta resolver movendo a matéria para dentro do RGPD — e é um dos pontos em que o Conselho recuou.

## Jurisprudências históricas

O RGPD é um texto curto para o que regula, e boa parte do seu sentido foi fixada em tribunal. O que se segue são os acórdãos que mudaram a prática — citados por número de processo, órgão e tema.

### Antes do RGPD: o que a Diretiva 95/46/CE deixou pronto

- **[C-101/01](https://curia.europa.eu/juris/liste.jsf?num=C-101/01)** (Tribunal de Justiça, 6/11/2003) — publicar dados de terceiros numa página aberta na internet **não** é atividade puramente pessoal e doméstica, e carregar dados num servidor não é, por si só, transferência internacional. Foi o primeiro acórdão a dizer que a lei de dados alcança o cidadão comum publicando na web.
- **[C-293/12 e C-594/12](https://curia.europa.eu/juris/liste.jsf?num=C-293/12)** (Grande Secção, 8/4/2014) — **invalidou** a Diretiva de Conservação de Dados, que obrigava operadoras a guardar metadados de toda a população. É a decisão que fixou que retenção **generalizada e indiferenciada** viola os arts. 7 e 8 da Carta, e o parâmetro contra o qual se mede, até hoje, qualquer regime de guarda de registros — inclusive, por analogia comparativa, os [arts. 13 a 15 do Marco Civil](/notas/mci#art-13).
- **[C-131/12](https://curia.europa.eu/juris/liste.jsf?num=C-131/12)** (Grande Secção, 13/5/2014) — o acórdão do **direito a ser esquecido**. Decidiu que um motor de busca é responsável pelo tratamento que realiza ao indexar, que o operador estrangeiro está sujeito à lei europeia por ter estabelecimento de vendas de publicidade no país, e que o titular pode exigir a **desindexação** de resultados inadequados, irrelevantes ou excessivos, ainda que a publicação original seja lícita. Virou o [art. 17.º](#art-17) do RGPD. Cinco anos depois, o **[C-507/17](https://curia.europa.eu/juris/liste.jsf?num=C-507/17)** (24/9/2019) limitou o alcance: a desindexação é devida nas versões europeias do buscador, não no mundo inteiro.
- **[C-362/14](https://curia.europa.eu/juris/liste.jsf?num=C-362/14)** (Grande Secção, 6/10/2015) — invalidou a decisão de adequação do acordo **"Porto Seguro"** com os Estados Unidos, por acesso generalizado das autoridades americanas a conteúdo de comunicações e ausência de via de recurso. Fixou também que uma autoridade nacional pode examinar reclamação mesmo havendo decisão de adequação da Comissão.
- **[C-203/15 e C-698/15](https://curia.europa.eu/juris/liste.jsf?num=C-203/15)** (Grande Secção, 21/12/2016) — confirmou que os Estados-Membros não podem impor conservação generalizada e indiferenciada de metadados, e que o acesso posterior exige controle prévio de tribunal ou autoridade independente.
- **[C-210/16](https://curia.europa.eu/juris/liste.jsf?num=C-210/16)** (Grande Secção, 5/6/2018) — quem administra uma **página de fãs** numa rede social é **corresponsável** pelo tratamento feito pela plataforma sobre os visitantes, ainda que não tenha acesso aos dados. Foi o acórdão que espalhou a corresponsabilidade pela internet inteira.

### O RGPD no Tribunal de Justiça

- **[C-40/17](https://curia.europa.eu/juris/liste.jsf?num=C-40/17)** (29/7/2019) — quem embute o botão social de uma plataforma no próprio site é **corresponsável** pela coleta e transmissão dos dados dos visitantes, e é dele o dever de informar e de obter consentimento — mas só quanto às operações em que efetivamente influi.
- **[C-673/17](https://curia.europa.eu/juris/liste.jsf?num=C-673/17)** (1/10/2019) — **caixa pré-marcada não é consentimento**, e a informação devida inclui a duração dos _cookies_ e quem mais tem acesso a eles. Vale independentemente de o dado ser pessoal.
- **[C-311/18](https://curia.europa.eu/juris/liste.jsf?num=C-311/18)** (Grande Secção, 16/7/2020) — invalidou a adequação do **"Escudo de Proteção da Privacidade"**, sucessor do Porto Seguro, e manteve válidas as cláusulas-tipo, **desde que** o exportador avalie caso a caso o direito do país de destino e suspenda a transferência se não puder garantir proteção equivalente. Foi essa exigência que criou a prática das "avaliações de impacto de transferência".
- **[C-645/19](https://curia.europa.eu/juris/liste.jsf?num=C-645/19)** (Grande Secção, 15/6/2021) — em condições estritas, uma autoridade **que não é a principal** pode acionar judicialmente um tratamento transfronteiriço. Foi a primeira rachadura no balcão único.
- **[C-252/21](https://curia.europa.eu/juris/liste.jsf?num=C-252/21)** (Grande Secção, 4/7/2023) — uma autoridade **de concorrência** pode examinar o cumprimento do RGPD ao apurar abuso de posição dominante, desde que coopere com a autoridade de dados. No mérito: a coleta de dados de fora da plataforma para publicidade personalizada **não** é necessária à execução do contrato, e o consentimento de quem tem posição dominante deve ser examinado com rigor especial, porque o desequilíbrio compromete a liberdade da escolha.
- **[C-300/21](https://curia.europa.eu/juris/liste.jsf?num=C-300/21)** (4/5/2023) — a violação do RGPD **não gera, por si só**, direito a indenização: é preciso demonstrar dano concreto. Mas **não há limiar mínimo de gravidade** — o incômodo, se provado, é indenizável. Fixou o equilíbrio que evitou tanto a indenização automática quanto a exigência de dano grave.
- **[C-807/21](https://curia.europa.eu/juris/liste.jsf?num=C-807/21)** (Grande Secção, 5/12/2023) — **coima exige culpa**: dolo ou negligência do responsável. E a pessoa coletiva responde por infrações cometidas por seus representantes, dirigentes ou gestores, sem necessidade de identificar a pessoa física.
- **[C-634/21](https://curia.europa.eu/juris/liste.jsf?num=C-634/21)** (7/12/2023) — a **produção de um escore de crédito** por birô é, ela mesma, decisão automatizada do [art. 22.º](#art-22) quando o banco decide com base determinante nele. Deslocou a responsabilidade para quem calcula, e não apenas para quem aplica.
- **[C-604/22](https://curia.europa.eu/juris/liste.jsf?num=C-604/22)** (7/3/2024) — a _string_ de consentimento do quadro de transparência da publicidade digital é **dado pessoal**, e a entidade setorial que o desenhou é **corresponsável** pelo registro das preferências — mas não, automaticamente, por tudo o que os participantes fazem depois. Foi a decisão que abalou a arquitetura de consentimento de boa parte da publicidade programática europeia; o tribunal de apelação belga confirmou o essencial em **14 de maio de 2025**.
- **[C-621/22](https://curia.europa.eu/juris/liste.jsf?num=C-621/22)** (4/10/2024) — um interesse **puramente comercial** pode ser legítimo interesse, desde que lícito e aprovado no teste de ponderação; não é preciso que esteja previsto em lei. Encerrou a tese de que marketing jamais poderia se apoiar no [art. 6.º, n.º 1, alínea f)](#art-6-p1-f).
- **[C-446/21](https://curia.europa.eu/juris/liste.jsf?num=C-446/21)** (4/10/2024) — a **minimização** impede acumular dados para publicidade **sem limite de tempo**; e o fato de alguém ter revelado publicamente a própria orientação sexual não autoriza o uso desse dado sensível para personalizar anúncios.
- **[C-21/23](https://curia.europa.eu/juris/liste.jsf?num=C-21/23)** (4/10/2024) — o RGPD **não impede** que a lei nacional dê a **concorrentes** legitimidade para acionar quem o viola, por concorrência desleal; e os dados de pedidos de medicamentos, mesmo os sem receita, são **dados de saúde**.
- **[C-383/23](https://curia.europa.eu/juris/liste.jsf?num=C-383/23)** (13/2/2025) — "empresa", para calcular o teto percentual da coima, é a **unidade econômica** do direito da concorrência: vale o volume de negócios do **grupo inteiro**. Multiplicou o risco sancionatório de subsidiárias pequenas de grupos grandes.
- **[C-413/23 P](https://curia.europa.eu/juris/liste.jsf?num=C-413/23%20P)** (Grande Secção, 4/9/2025) — o acórdão no centro do debate legislativo atual. Decidiu que dado **pseudonimizado** transferido a um terceiro pode **não ser dado pessoal para esse terceiro**, se ele não dispuser de meios razoáveis de reidentificação; a avaliação é **relativa**, feita da perspectiva de quem detém os dados, e não absoluta. Foi um afastamento explícito da posição de décadas das autoridades de proteção de dados, e é a decisão que a Comissão invoca para propor mudar o [art. 4.º](#art-4) — enquanto o CEPD sustenta que codificá-la na definição geral vai além do que o tribunal decidiu.
- **[T-553/23](https://curia.europa.eu/juris/liste.jsf?num=T-553/23)** (Tribunal Geral, 3/9/2025) — julgou improcedente o pedido de anulação da adequação do **Quadro de Privacidade de Dados UE-EUA**, reconhecendo proteção essencialmente equivalente e independência suficiente do tribunal de revisão americano. Diferentemente dos dois acordos anteriores, este sobreviveu ao primeiro exame judicial — o que não impede recurso nem revisão futura.

### Tribunais e autoridades nacionais

- **Tribunal Administrativo de Recurso do Luxemburgo, 12/3/2026** — **anulou** a coima de 746 milhões de euros aplicada em 2021 a uma grande plataforma de comércio eletrônico, então a maior da história do RGPD. O motivo foi **processual**: a autoridade não realizou as análises que a jurisprudência europeia posterior passou a exigir, entre elas a aferição do caráter doloso ou negligente da conduta (o requisito fixado no processo C-807/21). O tribunal **manteve** o reconhecimento de que houve infrações — falta de base válida para publicidade comportamental, transparência e direitos do titular — e devolveu o caso à autoridade. É a ilustração mais didática de um ponto que se repete: no RGPD, o rito derruba a multa sem absolver a conduta.
- **Tribunal de Roma, 18/3/2026** — anulou a coima de 15 milhões de euros aplicada em dezembro de 2024 pela autoridade italiana ao fornecedor do ChatGPT. Também aqui o fundamento foi processual, e específico do modelo europeu: depois de a empresa estabelecer subsidiária na Irlanda, em 2024, a competência passou à autoridade irlandesa pelo **balcão único**, e a italiana já não podia decidir sozinha. O mérito — se treinar um modelo de linguagem com dados raspados da web tem base legal — segue **sem resposta judicial**.
- **Tribunal de Apelação de Bruxelas, 14/5/2025** — confirmou que o quadro de transparência e consentimento da publicidade programática, tal como operado, não cumpria o RGPD, e que a entidade setorial que o mantém é corresponsável.
- **Autoridade neerlandesa, 2024–2025** — diante do não pagamento reiterado de coimas por uma empresa americana de reconhecimento facial sem estabelecimento na União, passou a **investigar a responsabilidade pessoal dos administradores**. É o teste mais duro da execução extraterritorial do regulamento: a coima é aplicável, mas cobrá-la é outra história.

### O CEPD como intérprete

Sem ser tribunal, o Comité produziu três documentos que mudaram práticas de mercado:

- **Opinião 08/2024**, de 17/4/2024, sobre os modelos "**consentir ou pagar**" de grandes plataformas: na maioria dos casos, oferecer apenas a escolha binária entre aceitar publicidade comportamental e pagar **não** produz consentimento livre; é preciso oferecer também uma alternativa equivalente sem publicidade comportamental.
- **Opinião 28/2024**, de 17/12/2024, sobre **modelos de IA**: um modelo treinado com dados pessoais **não é automaticamente anônimo** — a anonimidade se avalia caso a caso, e exige demonstrar que a probabilidade de identificação é insignificante; o legítimo interesse **pode** fundamentar o desenvolvimento e a implantação, sujeito ao teste de três etapas; e o tratamento ilícito na fase de desenvolvimento contamina, em certas condições, o uso posterior do modelo.
- **Diretrizes 3/2018** sobre o âmbito territorial do [art. 3.º](#art-3), que fixaram os critérios de "direcionamento" e de "monitoramento" usados até hoje para decidir se uma empresa de fora da União está sujeita ao regulamento.

## Casos emblemáticos de violações

Cada um destes casos fixou uma leitura do regulamento, e é por isso que estão aqui, agrupados pelo dispositivo que puseram à prova — e não por valor.

### Transferências internacionais ([arts. 44.º a 49.º](#art-44))

- **1,2 bilhão de euros, maio de 2023** — a maior coima da história do RGPD, aplicada pela autoridade irlandesa à operação europeia de uma grande rede social por transferir dados de usuários europeus aos Estados Unidos com base em cláusulas-tipo, depois de o processo C-311/18 ter dito que as cláusulas, sozinhas, não bastam quando o direito do país de destino permite acesso governamental amplo. Veio acompanhada de ordem de suspensão das transferências. O valor não saiu da autoridade principal: foi o CEPD, por decisão vinculativa do [art. 65.º](#art-65), que determinou a inclusão da coima.
- **530 milhões de euros, maio de 2025** — aplicada pela mesma autoridade a uma plataforma de vídeos curtos, por transferências para a China ([art. 46.º, n.º 1](#art-46-p1), 485 milhões) e falha de transparência ([art. 13.º, n.º 1, alínea f)](#art-13-p1-f), 45 milhões), com ordem de suspensão em seis meses se não houvesse conformidade. É a decisão que estendeu o raciocínio do processo C-311/18 para além dos Estados Unidos: o teste é sobre **qualquer** país de destino cuja legislação permita acesso estatal incompatível com a Carta.
- **290 milhões de euros, agosto de 2024** — aplicada pela autoridade neerlandesa a uma plataforma de transporte, por transferir dados de motoristas europeus aos Estados Unidos sem garantias adequadas no intervalo entre a queda do Escudo de Proteção da Privacidade e a adequação de 2023. Ilustra o custo do "vácuo" entre dois acordos.

### Bases legais e publicidade comportamental ([arts. 6.º](#art-6) e [7.º](#art-7))

- **50 milhões de euros, janeiro de 2019** — a primeira grande coima do RGPD, aplicada pela autoridade francesa a um provedor de sistema operacional móvel: informação dispersa por várias telas, consentimento nem específico nem inequívoco para personalização de anúncios, com opções pré-marcadas. Fixou o padrão de que consentimento válido é consentimento **granular** e **encontrável**.
- **390 milhões de euros, janeiro de 2023** — aplicada à operação europeia de duas redes sociais por, às vésperas da aplicação do RGPD em 2018, trocar a base do consentimento pela **execução de contrato** para publicidade personalizada. A autoridade principal tendia a aceitar a manobra; o CEPD, por decisão vinculativa, a rejeitou. Meses depois, o processo C-252/21 confirmou judicialmente a rejeição.
- **746 milhões de euros, julho de 2021 — anulados em março de 2026** — a coima luxemburguesa contra uma plataforma de comércio eletrônico por publicidade comportamental sem base válida. A infração foi reconhecida em juízo, a sanção caiu por vício de procedimento, e o processo voltou à autoridade. Mostra que, no RGPD, **a dosimetria é tão exigível quanto a conduta**.
- **310 milhões de euros, outubro de 2024** — aplicada pela autoridade irlandesa a uma rede social profissional por publicidade comportamental sem base legal válida, discutindo simultaneamente consentimento, contrato e legítimo interesse. É o caso que mostra que as três bases não são intercambiáveis: falhar em todas as três é um resultado possível.

### Crianças e adolescentes ([art. 8.º](#art-8))

- **405 milhões de euros, setembro de 2022** — aplicada pela autoridade irlandesa a uma rede social de imagens porque contas de adolescentes que migravam para o modo "comercial" tinham telefone e e-mail **publicados por padrão**, e porque contas de menores nasciam públicas. É a aplicação mais concreta que existe do [art. 25.º, n.º 2](#art-25-p2) — proteção **por defeito** —, e o precedente europeu mais próximo do que o [ECA Digital](/notas/eca-digital#art-7) veio a exigir no Brasil como "proteção por padrão".
- **345 milhões de euros, setembro de 2023** — aplicada à mesma plataforma de vídeos curtos citada acima, por contas de adolescentes públicas por padrão, pela funcionalidade que vinculava conta de menor à de um adulto sem verificar o vínculo, e por padrões de interface que empurravam a escolha mais exposta ("_dark patterns_").

### Incidentes de segurança ([arts. 32.º a 34.º](#art-32))

- **20 milhões de libras (companhia aérea) e 18,4 milhões (rede hoteleira), outubro de 2020** — as duas coimas mais didáticas em matéria de segurança, ambas da autoridade britânica, quando o Reino Unido ainda aplicava o RGPD. As duas foram anunciadas em 2019 com valores muito maiores (183,4 milhões e 99 milhões de libras) e reduzidas em cerca de 90% e 80% depois da defesa, das medidas de mitigação e da consideração do impacto econômico da pandemia. A lição está no [art. 83.º, n.º 2](#art-83-p2): a dosimetria é um procedimento real, com contraditório.
- **265 milhões de euros, novembro de 2022, e 251 milhões, dezembro de 2024** — dois casos contra a mesma rede social: o primeiro por raspagem em massa de perfis explorando uma funcionalidade de importação de contatos; o segundo por uma falha de 2018 que expôs cerca de 29 milhões de contas no mundo, das quais 3 milhões na União. Fixaram que **proteção desde a conceção** ([art. 25.º](#art-25)) é obrigação exigível, e que a notificação tardia ou incompleta é infração autônoma.
- **35,3 milhões de euros, outubro de 2020** — aplicada pela autoridade de Hamburgo a uma rede de varejo de moda que mantinha registros detalhados sobre doenças, crenças e vida familiar de funcionários, acessíveis a dezenas de gestores. É o caso de referência sobre o [art. 88.º](#art-88): monitoramento no trabalho não é território livre.

### Inteligência artificial e biometria

Esta é a fronteira atual, e é onde o RGPD encontra o [AI Act](/notas/ai-act) — que não o substitui nem o derroga.

- **Reconhecimento facial por raspagem da web** — a mesma empresa americana foi multada em cerca de 20 milhões de euros pela autoridade italiana (fevereiro de 2022), 20 milhões pela francesa (outubro de 2022), 20 milhões pela grega (julho de 2022) e 30,5 milhões pela neerlandesa (2024), sempre pelos mesmos fundamentos: coleta de imagens faciais em massa sem base legal, tratamento de dados biométricos fora das exceções do [art. 9.º](#art-9) e recusa de atender pedidos de acesso e apagamento. A empresa não tem estabelecimento nem representante na União, não pagou as coimas e não cumpriu as determinações. O caso virou o exemplo-padrão do limite prático do [art. 3.º, n.º 2](#art-3-p2): a lei alcança, a execução não necessariamente — daí a tentativa neerlandesa de responsabilizar administradores pessoalmente.
- **ChatGPT** — a autoridade italiana **bloqueou temporariamente** o serviço na Itália em março de 2023, o primeiro caso do gênero num país ocidental, alegando falta de base legal para o treinamento, informação insuficiente e ausência de verificação de idade. O serviço voltou depois de mudanças, e em dezembro de 2024 veio uma coima de 15 milhões de euros — **anulada em março de 2026** por incompetência da autoridade italiana após a empresa se estabelecer na Irlanda. O saldo: quatro anos de litígio e **nenhuma decisão de mérito** sobre a licitude de treinar modelos com dados raspados da web.
- **Chatbot de companhia virtual** — 5 milhões de euros, autoridade italiana, 2025: política de privacidade inadequada e ausência de mecanismo válido de verificação de idade, num serviço com conteúdo adulto acessível a menores.
- **Modelo de linguagem chinês** — a mesma autoridade determinou, em janeiro de 2025, a **limitação do tratamento** de dados de usuários italianos por um assistente de IA cujos operadores sustentavam não estar sujeitos ao direito europeu. É o [art. 3.º, n.º 2](#art-3-p2) aplicado de forma sumária.
- **Verificação de humanidade por escaneamento de íris** — o projeto que oferecia criptomoeda em troca de leitura biométrica de íris foi examinado por várias autoridades, com fundamentos diferentes. Em **março de 2024**, as autoridades da Espanha e de Portugal suspenderam a coleta, invocando transparência, dados de menores e ausência de mecanismo de retirada do consentimento; em **dezembro de 2024**, a autoridade da Baviera determinou o apagamento dos dados e a readequação do tratamento; e em **janeiro de 2025** a **ANPD** atacou um ponto próprio — a **compensação financeira** oferecida em troca da coleta, incompatível com a **liberdade** que o [art. 11, I, da LGPD](/notas/lgpd#art-11-i) exige do consentimento para dado sensível. A empresa recorreu, teve o recurso negado e suspendeu a operação no Brasil. O fundamento brasileiro tem paralelo direto no [art. 7.º, n.º 4](#art-7-p4) do RGPD: consentimento condicionado ou comprado não é livre.

### Ecos no Brasil

Três episódios mostram como o repertório europeu chega à prática brasileira:

- **A adequação de 2026** ([Decisão de Execução (UE) 2026/179](https://eur-lex.europa.eu/eli/dec_impl/2026/179/oj) e [Resolução CD/ANPD nº 32/2026](https://www.in.gov.br/web/dou/-/resolucao-n-32-de-26-de-janeiro-de-2026-683334547)) dispensou, na generalidade dos casos, cláusulas-padrão e garantias adicionais nos fluxos Brasil–União Europeia. Para uma empresa brasileira, isso significa que o vetor de risco deixou de ser o **instrumento** de transferência e passou a ser a **manutenção** da adequação — que a Comissão monitora continuamente e pode suspender.
- **O caso do escaneamento de íris** mostra os dois repertórios operando sobre o mesmo fato com fundamentos distintos: as autoridades europeias trataram de transparência, menores e retirada do consentimento; a ANPD foi ao ponto da **contrapartida financeira**, que nenhuma delas havia enfrentado de frente. O raciocínio vale nos dois sistemas, porque a exigência de consentimento livre é comum aos dois.
- **A responsabilidade das plataformas**, no Brasil, não passou pela lei de dados: veio do STF, nos [Temas 987 e 533](/notas/mci#o-novo-regime-de-responsabilização-das-plataformas-stf-temas-987-e-533), e dos decretos de 2026 que regulamentaram o [Marco Civil](/notas/mci). Na Europa, esse debate está no [DSA](/notas/dsa), não no RGPD. São matérias alojadas em normas distintas nos dois sistemas, e vale não misturá-las ao comparar.

## Comparação com a LGPD

### Como as duas leis se relacionam

A [LGPD](/notas/lgpd) foi sancionada em **14 de agosto de 2018**, menos de três meses depois de o RGPD passar a ser aplicável, ao fim de um debate legislativo que corria no Brasil desde 2010 — anteprojeto do Ministério da Justiça, consultas públicas e projetos que tramitaram em paralelo à negociação do regulamento europeu. As duas leis compartilham, por isso, boa parte do vocabulário e do desenho: definição ampla de dado pessoal, papéis de controlador e operador, rol de bases legais, direitos do titular em capítulo próprio, encarregado, relatório de impacto, transferência internacional condicionada, autoridade independente e multa proporcional ao faturamento.

O que **não** compartilham é o detalhe — e é aí que está o trabalho de quem precisa cumprir as duas. Um programa de conformidade desenhado para o RGPD **não** está automaticamente conforme à LGPD, e vice-versa.

### Onde os dois convergem

- **Alcance extraterritorial** pela oferta de bens e serviços — [art. 3.º](#art-3) e [art. 3º da LGPD](/notas/lgpd#art-3).
- **Definição ampla de dado pessoal**, com o mesmo teste de identificabilidade razoável, e o mesmo tratamento do dado anonimizado como fora da lei.
- **Categoria de dados sensíveis** com regime proibitivo e exceções taxativas.
- **Princípios** materialmente equivalentes, inclusive a responsabilidade proativa — [art. 5.º, n.º 2](#art-5-p2) e [art. 6º, X](/notas/lgpd#art-6-x).
- **Direitos do titular**: acesso, correção, eliminação, portabilidade, informação sobre compartilhamento, revisão de decisões automatizadas.
- **Encarregado**, **relatório de impacto**, **segurança** e **comunicação de incidente**.
- **Autoridade independente** com poderes de investigação, correção e sanção, e **multa sobre faturamento**.
- **Coexistência com outras normas**: sanção de dados não afasta responsabilidade civil, consumerista ou concorrencial — [art. 84.º](#art-84) e [arts. 45](/notas/lgpd#art-45) e [52, § 2º](/notas/lgpd#art-52-p2).

### Onde divergem

| Tema | RGPD | LGPD |
| --- | --- | --- |
| Bases legais | **6** ([art. 6.º](#art-6)); dados sensíveis, 10 exceções ([art. 9.º](#art-9)) | **10** ([art. 7º](/notas/lgpd#art-7)); sensíveis, 8 hipóteses ([art. 11](/notas/lgpd#art-11)) |
| Legítimo interesse pelo poder público | **vedado** ([art. 6.º, n.º 1](#art-6-p1)) | sem vedação expressa |
| Consentimento de criança | 16 anos, redutível a 13 por lei nacional ([art. 8.º](#art-8)) | melhor interesse; consentimento específico de um dos pais ([art. 14](/notas/lgpd#art-14)) |
| Oposição a marketing direto | absoluta, sem ponderação ([art. 21.º, n.º 2](#art-21-p2)) | oposição condicionada a descumprimento ([art. 18, § 2º](/notas/lgpd#art-18-p2)) |
| Decisão automatizada | direito de **não ficar sujeito**, com intervenção humana no texto da lei ([art. 22.º](#art-22)) | direito de **solicitar revisão** ([art. 20](/notas/lgpd#art-20)); revisão humana veio por interpretação |
| Relatório de impacto | obrigatório por critérios de risco definidos pelo responsável ([art. 35.º](#art-35)) | elaborado mediante solicitação da autoridade ([art. 38](/notas/lgpd#art-38)) |
| Encarregado | obrigatório em três hipóteses, com independência garantida em lei ([arts. 37.º a 39.º](#art-37)) | figura de canal de comunicação ([art. 41](/notas/lgpd#art-41)); detalhes por resolução |
| Prazo de resposta ao titular | 1 mês, prorrogável por 2 ([art. 12.º, n.º 3](#art-12-p3)) | 15 dias, ou imediato em formato simplificado ([art. 19](/notas/lgpd#art-19)) |
| Incidente de segurança | 72 horas ([art. 33.º](#art-33)) | 3 dias úteis ([art. 48](/notas/lgpd#art-48)) |
| Registro de operações | obrigatório, com dispensa estreita por porte ([art. 30.º](#art-30)) | obrigatório sem dispensa legal ([art. 37](/notas/lgpd#art-37)); porte tratado em resolução |
| Teto da multa | 20 milhões de euros **ou 4% do faturamento mundial do grupo** ([art. 83.º, n.º 5](#art-83-p5)) | 2% do faturamento no Brasil, limitado a **R$ 50 milhões por infração** ([art. 52, II](/notas/lgpd#art-52-ii)) |
| Sanções não pecuniárias | limitação e **proibição do tratamento**, suspensão de fluxos ([art. 58.º, n.º 2](#art-58-p2)) | bloqueio, eliminação, suspensão parcial ou total do banco de dados e proibição parcial ou total ([art. 52](/notas/lgpd#art-52)) |
| Modelo de autoridade | uma por Estado-Membro, com balcão único e CEPD | **única** ([ANPD](/notas/regimento-interno-anpd)), com competência prevalente ([art. 55-K](/notas/lgpd#art-55-k)) |
| Ação judicial | foro do domicílio do titular ([art. 79.º](#art-79)); representação por entidade ([art. 80.º](#art-80)) | regras gerais do processo civil e coletivo ([art. 22](/notas/lgpd#art-22)) |
| Setor penal e de segurança pública | Diretiva (UE) 2016/680 já em vigor | lei específica **ainda não editada** ([art. 4º, § 1º](/notas/lgpd#art-4-p1)) |
| Corresponsabilidade | figura própria, com acordo e transparência ([art. 26.º](#art-26)) | sem figura equivalente; resolve-se pela responsabilidade solidária ([arts. 42 a 44](/notas/lgpd#art-42)) |
| Contexto laboral | cláusula de abertura para lei nacional mais protetiva ([art. 88.º](#art-88)) | sem regra específica |
| _Cookies_ | Diretiva ePrivacy, fora do RGPD ([art. 95.º](#art-95)) | sem regra específica; aplica-se a LGPD e o [Marco Civil](/notas/mci) |

### Três diferenças que mudam decisões práticas

1. **O teto da multa não é comparável.** Quatro por cento do faturamento **mundial do grupo econômico** (processo C-383/23) contra dois por cento do faturamento **no Brasil**, com teto absoluto de R$ 50 milhões por infração. Para uma multinacional, a exposição europeia pode ser duas ordens de grandeza maior, e é por isso que decisões globais de conformidade costumam ser calibradas pelo teto europeu. O que essa calibragem **não** faz é dispensar a conferência item a item: há pontos em que a LGPD alcança tratamento que o RGPD não alcança — o registro em papel sem estrutura de ficheiro é um deles —, e outros em que a exigência brasileira é mais rápida, como o prazo de resposta ao titular.
2. **Marketing direto.** Na Europa, a oposição a marketing direto é um direito absoluto: o titular diz "não" e acabou. No Brasil, o [art. 18, § 2º](/notas/lgpd#art-18-p2) condiciona a oposição à alegação de descumprimento da lei — e, quando o tratamento se apoia em legítimo interesse, o titular tem o direito de pedir informação e revisão, não um veto direto. Uma mesma campanha pode ser lícita aqui e ilícita lá.
3. **Decisão automatizada.** O [art. 22.º](#art-22) parte de uma **proibição com exceções**; o [art. 20 da LGPD](/notas/lgpd#art-20), de um **direito de revisão**. Quem desenha um sistema de crédito, seleção ou precificação para os dois mercados precisa cumprir a regra europeia — que exige intervenção humana, contestação e explicação da lógica —, e não apenas oferecer um canal de reanálise.

### A adequação mútua de 2026

Em **26 de janeiro de 2026**, os dois lados reconheceram-se mutuamente adequados: a Comissão Europeia pela [Decisão de Execução (UE) 2026/179](https://eur-lex.europa.eu/eli/dec_impl/2026/179/oj), com base no [art. 45.º](#art-45) do RGPD e após a [opinião 28/2025 do CEPD, de 4 de novembro de 2025](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-art-70/opinion-282025-regarding-european-commission-draft_en) — que se disse amplamente favorável, notando o alinhamento da LGPD com a legislação e a jurisprudência europeias, e pediu esclarecimentos sobre o relatório de impacto, os poderes da ANPD perante autoridades de segurança pública e o contorno do conceito brasileiro de segurança nacional; e o Brasil pela [Resolução CD/ANPD nº 32/2026](https://www.in.gov.br/web/dou/-/resolucao-n-32-de-26-de-janeiro-de-2026-683334547), com base no [art. 33, I, da LGPD](/notas/lgpd#art-33-i).

Três leituras que essa decisão autoriza, e uma que ela não autoriza:

- **Autoriza** dizer que a Comissão examinou a LGPD, a estrutura da [ANPD](/notas/regimento-interno-anpd), o [art. 5º, LXXIX, da Constituição](/notas/lgpd#fundamentos) e as vias de recurso brasileiras, e as considerou de proteção **essencialmente equivalente** — inclusive quanto ao acesso de autoridades públicas a dados, que é o critério que derrubou dois acordos com os Estados Unidos.
- **Autoriza** dizer que a decisão é ampla: cobre setor público e privado, dentro do âmbito material e territorial da LGPD.
- **Autoriza** dizer que ela é **revisável**: a Comissão monitora continuamente e fará revisão formal em quatro anos, com poder de suspender, revogar ou alterar ([art. 45.º, n.os 3 a 5](#art-45-p3)).
- **Não autoriza** dizer que LGPD e RGPD são a mesma lei. Adequação é juízo sobre o **nível** de proteção, não sobre identidade de regras — e todas as divergências da tabela acima continuam de pé. Uma empresa brasileira que trata dados de pessoas na União continua sujeita ao RGPD pelo [art. 3.º, n.º 2](#art-3-p2); a adequação apenas retirou o obstáculo formal à transferência.

### Armadilhas de tradução

Além do glossário PT-PT × pt-BR acima, três confusões recorrentes:

- **"GDPR" e "RGPD" são a mesma norma.** A sigla oficial em português é RGPD; GDPR é a inglesa. Esta nota usa as duas, e o painel ao lado traz o texto oficial em português de Portugal.
- **"Legítimo interesse" não é curinga em lugar nenhum.** Nos dois sistemas, exige finalidade concreta, teste de necessidade e ponderação documentada — e, na Europa, é vedado ao setor público no exercício de suas funções.
- **"Adequação" tem dois sentidos.** No [art. 45.º](#art-45) do RGPD e no [art. 33, I, da LGPD](/notas/lgpd#art-33-i), é o reconhecimento de um **país**. No jargão de mercado, "estar adequado" virou sinônimo de "estar conforme". Não são a mesma coisa, e a confusão aparece até em material técnico.

## Pontos em aberto

- **O Digital Omnibus sobre dados.** Se o Conselho e o Parlamento chegarem a acordo, a definição de dado pessoal, o regime de _cookies_ e a base legal para treinar modelos de IA podem mudar. Se não chegarem — cenário plausível, dado o impasse de junho de 2026 —, o RGPD segue como está, e a pressão volta para a interpretação judicial.
- **O que é dado pessoal depois do processo C-413/23 P.** O tribunal decidiu um caso concreto de transferência a um terceiro. Quanto dessa leitura relativa vale para o conceito em geral — e o que ela significa para dados pseudonimizados dentro da mesma organização — ainda não está resolvido. As [diretrizes do CEPD sobre anonimização](https://www.edpb.europa.eu/public-consultations/guidelines-022026-on-anonymisation_en), em consulta pública com prazo até 30 de outubro de 2026, são o próximo capítulo.
- **Treinamento de modelos com dados raspados da web.** Nenhum tribunal europeu decidiu o mérito. A opinião 28/2024 do CEPD dá o método; a coima italiana que testaria a tese foi anulada por incompetência. A questão continua aberta em ambos os lados do Atlântico — e no Brasil, onde o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) fez escolhas próprias sobre o assunto (ver a [nota do AI Act](/notas/ai-act#comparação-com-o-pl-nº-23382023)).
- **Execução contra quem não tem estabelecimento na União.** O [art. 3.º, n.º 2](#art-3-p2) alcança; cobrar é outra coisa. A tentativa neerlandesa de responsabilizar administradores pessoalmente é o experimento em curso.
- **O balcão único depois de 2027.** O [Regulamento (UE) 2025/2518](#reg2518-art-1) impõe prazos e ritos, mas não muda quem decide. Se ele bastará para destravar casos que hoje levam anos é uma pergunta empírica, cuja resposta começará a aparecer nas [estatísticas de execução](#reg2518-art-34) que o próprio regulamento tornou obrigatórias.
- **A adequação UE-EUA.** Sobreviveu ao primeiro exame judicial em 2025 (processo T-553/23), mas a história dos dois acordos anteriores recomenda cautela: mudanças no direito americano de vigilância podem reabrir a discussão a qualquer momento — e, com ela, o problema prático de toda empresa que usa serviços de nuvem americanos.

## Normas

### Legislação principal

- [Regulamento (UE) 2016/679, de 27 de abril de 2016](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:02016R0679-20160504) — relativo à proteção das pessoas singulares no que diz respeito ao tratamento de dados pessoais e à livre circulação desses dados, e que revoga a Diretiva 95/46/CE. É o **Regulamento Geral sobre a Proteção de Dados** — RGPD no português oficial, **GDPR** na sigla inglesa que se popularizou no Brasil. Publicado no Jornal Oficial da União Europeia de 4 de maio de 2016, **em vigor desde 24 de maio de 2016** e **aplicável desde 25 de maio de 2018** ([art. 99.º](#art-99)).
- [Tratado sobre o Funcionamento da União Europeia (TFUE)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012E/TXT), art. 16 — a base jurídica do regulamento, e a norma que dá à União competência para legislar sobre proteção de dados.
- [Carta dos Direitos Fundamentais da União Europeia](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012P/TXT), arts. 7 (vida privada) e 8 (proteção de dados pessoais) — o parâmetro material de todo o regulamento, e o dispositivo que separa, no direito europeu, **privacidade** de **proteção de dados**: são dois direitos fundamentais distintos, e não sinônimos.
- [Diretiva 95/46/CE](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:31995L0046) — o regime anterior, **revogado** pelo [art. 94.º](#art-94). Não vale mais, mas continua indispensável: quase toda a jurisprudência histórica que ainda estrutura a matéria foi construída sobre ela.

### Alterações posteriores ao RGPD

Em oito anos de aplicação, o articulado do RGPD **nunca foi alterado**. O que houve foram duas **retificações** de tradução e um regulamento que o complementa sem tocar em seu texto:

- [Retificação publicada no JO L 127, de 23 de maio de 2018](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679R(02)) — corrigiu dezesseis pontos da versão portuguesa, dois deles de peso: o [art. 3.º, n.º 2](#art-3-p2), que falava em titulares "residentes" no território da União e passou a falar em titulares "**que se encontrem**" nele (uma diferença enorme de alcance: turista e residente contam igual), e o [art. 37.º, n.º 1, alínea c)](#art-37-p1-c), em que um "e" virou "**ou**", separando duas hipóteses que o texto errado havia somado.
- [Retificação publicada no JO L 74, de 4 de março de 2021](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679R(03)) — corrigiu a própria **definição de consentimento** ([art. 4.º, ponto 11](#art-4)): a manifestação de vontade deve ser "livre, específica, informada e **inequívoca**", e não "explícita", como dizia a tradução original. A diferença não é estilística — "explícito" é o padrão reforçado que o [art. 9.º, n.º 2, alínea a)](#art-9-p2-a) exige só para dados sensíveis.
- [Regulamento (UE) 2025/2518, de 26 de novembro de 2025](https://eur-lex.europa.eu/eli/reg/2025/2518/oj) — **normas processuais adicionais** para a aplicação do RGPD nos casos de tratamento transfronteiriço. Publicado no JO de 12 de dezembro de 2025 e **aplicável a partir de 2 de abril de 2027** ([art. 37.º](#reg2518-art-37)). Não altera uma linha do RGPD: dá procedimento ao que os [arts. 60.º](#art-60), [65.º](#art-65) e [66.º](#art-66) só esboçavam (ver "Alterações legislativas: o que mudou e o que está em negociação", acima).

> **Sobre o painel "Lei seca".** O painel traz **dois textos**, selecionáveis no alto: o **RGPD**, que abre por padrão e é o alvo dos links destes comentários, e o **Regulamento (UE) 2025/2518**.
>
> O texto do RGPD aqui é o **oficial em português**, montado das duas metades em que o EUR-Lex o publica: o articulado vem da **versão consolidada** (que é a que traz as duas retificações), e o cabeçalho, o preâmbulo e os **173 considerandos** vêm do Jornal Oficial de 4/5/2016 — porque a consolidação europeia, por desenho, não inclui considerandos. Nada foi redigitado: a junção é feita por script (`scripts/montar_rgpd.py`), que também aplica a única retificação que atinge um considerando (o 71) com o texto da própria retificação. Considerandos ficam fora do esquema de âncoras, mas entram no painel, pesquisáveis: num regulamento europeu é neles que está o *porquê* de cada regra, e é a ele que a Comissão e o Tribunal de Justiça recorrem quando o artigo é aberto demais.

### Atos e instrumentos aplicáveis

O RGPD não tem "decreto regulamentador". O detalhamento vem de três fontes distintas, com forças diferentes:

- **Decisões de adequação da Comissão Europeia** ([art. 45.º](#art-45)) — atos de execução que reconhecem que um país terceiro protege dados de forma "essencialmente equivalente" à europeia, dispensando garantias adicionais na transferência. Há cerca de quinze em vigor; as que mais interessam aqui são a [Decisão de Execução (UE) 2026/179, de 26 de janeiro de 2026](https://eur-lex.europa.eu/eli/dec_impl/2026/179/oj), sobre o **Brasil**, e a [Decisão de Execução (UE) 2023/1795, de 10 de julho de 2023](https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj), sobre o **Quadro de Privacidade de Dados UE-EUA**.
- **Cláusulas-tipo de proteção de dados** ([art. 46.º, n.º 2, alínea c)](#art-46-p2-c)) — o formulário contratual padrão para transferir dados sem decisão de adequação, fixado pela [Decisão de Execução (UE) 2021/914](https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj). É o equivalente europeu das cláusulas-padrão da [Resolução CD/ANPD nº 19/2024](https://www.in.gov.br/web/dou/-/resolucao-cd/anpd-n-19-de-23-de-agosto-de-2024-580095396).
- **Diretrizes, recomendações e melhores práticas do Comité Europeu para a Proteção de Dados** ([art. 70.º](#art-70)) — o CEPD (_European Data Protection Board_, EDPB) não legisla, mas é ele que uniformiza a interpretação, e na prática as autoridades nacionais seguem suas [diretrizes](https://www.edpb.europa.eu/documents_pt). Suas **decisões vinculativas** do [art. 65.º](#art-65), essas sim, obrigam a autoridade nacional no caso concreto.

### Estudos técnicos da ANPD

Levantamentos da autoridade brasileira, publicados na [central de documentos técnicos e orientativos](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos) da Agência, com ressalva expressa de que a série **Radar Tecnológico** não firma posicionamento institucional. Entram aqui como fonte do que esta nota afirma sobre o estado da técnica.

- [Radar Tecnológico nº 5 — Mecanismos de aferição de idade](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar-tecnologico-5-mecanismos-de-afericao-de-idade.pdf) (outubro de 2025) — reúne a Declaração 1/2025 do CEPD, a _EU Age Verification Solution_ e a discussão sobre provas de conhecimento zero e modelo duplo-cego. Detalhado na nota do [ECA Digital](/notas/eca-digital).

### Normas correlatas

- [Diretiva (UE) 2016/680](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016L0680) — a "diretiva policial", gêmea do RGPD para o tratamento por autoridades penais. Cobre o campo que o RGPD exclui no [art. 2.º, n.º 2, alínea d)](#art-2-p2-d) e que a [LGPD](/notas/lgpd) também exclui, no [art. 4º, III](/notas/lgpd#art-4-iii). A diferença está no instrumento e no calendário: a União tratou o tema numa diretiva editada no mesmo dia do RGPD; no Brasil, a legislação específica que o [art. 4º, § 1º](/notas/lgpd#art-4-p1) prevê ainda não foi editada.
- [Regulamento (UE) 2018/1725](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32018R1725) — o RGPD das próprias instituições da União, fiscalizado pela Autoridade Europeia para a Proteção de Dados (AEPD).
- [Diretiva 2002/58/CE (ePrivacy)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32002L0058) — é ela, e não o RGPD, que exige consentimento para _cookies_ e para o acesso ao equipamento terminal do usuário. O [art. 95.º](#art-95) do RGPD preserva essa divisão, que o Digital Omnibus propõe desfazer.
- [DSA](/notas/dsa) — o Regulamento (UE) 2022/2065, dos serviços digitais, que preserva expressamente o RGPD e dele toma emprestadas a definição de perfis e as categorias especiais de dados ([DSA, art. 2.º, n.º 4, alínea g)](/notas/dsa#art-2-p4-g)), e [Regulamento (UE) 2022/1925 — Mercados Digitais (DMA)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32022R1925).
- [AI Act](/notas/ai-act) — o Regulamento (UE) 2024/1689, que expressamente **não derroga** o RGPD ([art. 2.º do AI Act](/notas/ai-act#art-2)).
- [Convenção 108 do Conselho da Europa](https://www.coe.int/en/web/data-protection/convention108-and-protocol), de 1981, e seu protocolo de modernização (Convenção 108+, de 2018) — o tratado internacional que antecede tudo isso, aberto também a Estados de fora da Europa. O Brasil **não é parte**; participa do Comité da Convenção 108 como **observador** desde 2018.
- No Brasil: a [LGPD](/notas/lgpd), o [Marco Civil da Internet](/notas/mci), o [ECA Digital](/notas/eca-digital) e o [Regimento Interno da ANPD](/notas/regimento-interno-anpd).
