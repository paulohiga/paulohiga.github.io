---
layout: nota
permalink: /notas/ai-act
title: AI Act — Regulamento de Inteligência Artificial da União Europeia
description: Notas de estudo sobre o Regulamento (UE) 2024/1689 — pirâmide de risco, práticas proibidas, sistemas de alto risco, modelos de finalidade geral, governança e sanções, já com as alterações do Digital Omnibus, e a comparação com o PL nº 2338/2023.
lei: ai-act
normas_extra: [regulamento-2026-1744]
atualizado_em: 2026-07-31
---

## Normas

### Legislação principal

- [Regulamento (UE) 2024/1689, de 13 de junho de 2024](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024R1689) — estabelece regras harmonizadas em matéria de inteligência artificial (Regulamento da Inteligência Artificial, ou **AI Act**). Publicado no Jornal Oficial da União Europeia em 12 de julho de 2024 e **em vigor desde 1º de agosto de 2024**, com aplicação escalonada até 2028 (ver "Cronograma de aplicação", abaixo).
- [Tratado sobre o Funcionamento da União Europeia (TFUE)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012E/TXT), especialmente os arts. 16 (proteção de dados pessoais) e 114 (aproximação de legislações para o mercado interno) — as bases jurídicas do regulamento.
- [Carta dos Direitos Fundamentais da União Europeia](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012P/TXT) — parâmetro material de boa parte das proibições e dos requisitos de alto risco, e objeto direto da avaliação de impacto do [art. 27.º](#art-27).

### Alterações posteriores ao AI Act

- [Regulamento (UE) 2026/1744, de 8 de julho de 2026](https://eur-lex.europa.eu/eli/reg/2026/1744/oj) — **Digital Omnibus sobre a IA**. Altera o Regulamento (UE) 2024/1689, o Regulamento de Base da Aviação (UE) 2018/1139 e o Regulamento Máquinas (UE) 2023/1230 quanto à simplificação da execução das regras harmonizadas de IA. Publicado no JOUE de 24 de julho de 2026 e **em vigor desde 27 de julho de 2026**. É a primeira alteração de fundo do AI Act, e está sinalizada ao longo desta nota como **Digital Omnibus**.

> **Sobre o painel "Lei seca".** As duas normas estão ali **na íntegra**, com os considerandos — os 180 do AI Act e os do Omnibus. Eles não são dispositivos e não recebem âncora, mas num regulamento europeu é neles que está o *porquê* de cada regra, e tanto a Comissão quanto o Tribunal de Justiça os usam para interpretar o articulado.
>
> O EUR-Lex ainda **não publicou a versão consolidada** do AI Act com as alterações do Omnibus. Por isso o painel traz as **duas normas separadas**, selecionáveis no alto: o Regulamento (UE) 2024/1689 na redação original do Jornal Oficial, e o Regulamento (UE) 2026/1744 com as alterações. Na prática, isso significa que **um dispositivo alterado aparece no texto do AI Act na redação antiga** — a redação nova está no Omnibus, em bloco de citação. Cada ponto em que isso ocorre está sinalizado nos comentários abaixo. Consolidar os dois à mão produziria um texto que não é o de nenhuma fonte oficial, e por isso não foi feito.

### Regulamentos e atos aplicáveis

Diferentemente da [LGPD](/notas/lgpd) e do [ECA Digital](/notas/eca-digital), o AI Act não tem "decreto regulamentador": o detalhamento vem por **atos delegados e de execução** da Comissão Europeia, por **normas harmonizadas** europeias e por **códigos de práticas** de adesão voluntária (ver "Quem pode o quê", abaixo).

- [Código de Práticas para a IA de finalidade geral](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai) — publicado em julho de 2025; instrumento voluntário pelo qual os prestadores de modelos de finalidade geral podem demonstrar o cumprimento dos [arts. 53.º](#art-53) e [55.º](#art-55).
- [Modelo de sumário público do conteúdo usado no treino](https://digital-strategy.ec.europa.eu/en/library/template-public-summary-training-content) — formulário obrigatório previsto no [art. 53.º](#art-53).
- [Orientações da Comissão sobre práticas de IA proibidas](https://digital-strategy.ec.europa.eu/en/policies/guidelines-prohibited-ai-practices) e sobre a [definição de sistema de IA](https://digital-strategy.ec.europa.eu/en/policies/ai-act-definition-ai-system) — ambas de fevereiro de 2025.
- [Orientações e Código de Práticas sobre transparência de conteúdos gerados por IA](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content) — detalham a marcação e a divulgação exigidas pelo [art. 50.º](#art-50).
- [Serviço de Apoio ao AI Act (_AI Act Service Desk_)](https://ai-act-service-desk.ec.europa.eu/) — canal oficial de orientação da Comissão, com o cronograma de aplicação atualizado.

### Normas correlatas

- [Regulamento (UE) 2016/679 — RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679), a que o AI Act expressamente não derroga ([art. 2.º](#art-2)); é a norma de referência da [LGPD](/notas/lgpd).
- [Regulamento (UE) 2022/2065 — Regulamento dos Serviços Digitais (DSA)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32022R2065) e [Regulamento (UE) 2022/1925 — Regulamento dos Mercados Digitais (DMA)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32022R1925).
- [Regulamento (UE) 2023/2854 — Regulamento dos Dados (_Data Act_)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32023R2854).
- [Regulamento (UE) 2023/1230 — Regulamento Máquinas](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32023R1230) e [Regulamento (UE) 2018/1139 — Regulamento de Base da Aviação](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32018R1139), ambos alterados pelo Digital Omnibus para alinhar prazos e avaliações de conformidade.
- [Diretiva (UE) 2019/1937](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L1937) — proteção de denunciantes, aplicável às denúncias do [art. 87.º](#art-87).
- No Brasil: [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) (ver "Comparação com o PL nº 2338/2023", abaixo), a [LGPD](/notas/lgpd), o [ECA Digital](/notas/eca-digital) e o [Marco Civil da Internet](/notas/mci).

## Resumo geral

O AI Act é a primeira lei geral de inteligência artificial de um grande bloco econômico. Em vez de regular uma tecnologia, ele regula **usos**: o mesmo modelo pode ser irrelevante para a lei num contexto e altamente regulado em outro, conforme a função que exerce e o dano que pode causar. Essa é a chamada **abordagem baseada no risco**, organizada em quatro degraus — risco inaceitável (práticas proibidas), alto risco, risco de transparência e risco mínimo —, aos quais se soma um regime próprio, transversal, para os **modelos de IA de finalidade geral**.

A escolha do instrumento importa tanto quanto o conteúdo: é um **regulamento**, não uma diretiva. Vale diretamente nos 27 Estados-Membros, sem transposição, e substitui a possibilidade de 27 leis nacionais divergentes por um texto único — a mesma técnica do [RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679), e a razão pela qual o AI Act, como ele, tende a transbordar suas fronteiras: alcança quem fornece sistemas para o mercado europeu ou cujo resultado seja usado na União, esteja onde estiver ([art. 2.º](#art-2)).

A execução seguiu outro ritmo, e a própria norma que a corrigiu diz por quê: segundo o **considerando 40** do Regulamento (UE) 2026/1744, "o atraso na disponibilidade de normas, especificações comuns e orientações alternativas e na instituição das autoridades nacionais competentes" gerou dificuldades que comprometiam o início efetivo da aplicação e ameaçavam elevar consideravelmente os custos de cumprimento, "de tal modo que a manutenção da sua data inicial de aplicação, a saber, 2 de agosto de 2026, deixe de se justificar". Daí o **Digital Omnibus sobre a IA**, o [Regulamento (UE) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj), proposto pela Comissão em novembro de 2025, acordado entre Parlamento e Conselho em 7 de maio de 2026 e **em vigor desde 27 de julho de 2026**: ele adiou as obrigações de alto risco de agosto de 2026 para **2 de dezembro de 2027** (sistemas autônomos do Anexo III) e **2 de agosto de 2028** (IA embarcada em produtos já regulados), centralizou parte da fiscalização no Serviço para a IA da Comissão e, na direção oposta ao afrouxamento, **acrescentou duas novas proibições** ao [art. 5.º](#art-5) — a geração de imagens íntimas não consentidas ("_nudifiers_") e de material de abuso sexual infantil.

O resultado é um regulamento em vigor há dois anos cujo núcleo mais oneroso ainda não se aplica. O que já vale desde 2 de fevereiro de 2025 são as proibições do [art. 5.º](#art-5) e o dever de literacia em IA do [art. 4.º](#art-4); desde 2 de agosto de 2025, as obrigações dos modelos de finalidade geral, a governança e o regime sancionatório; e, desde **2 de agosto de 2026**, a aplicação geral do regulamento e os deveres de transparência do [art. 50.º](#art-50) — inclusive a identificação de conteúdo sintético, que é a face do AI Act com que o público em geral efetivamente esbarra.

Para o leitor brasileiro, o AI Act interessa por dois motivos simultâneos e distintos. É norma **diretamente aplicável** a empresas brasileiras que ofereçam sistemas de IA no mercado europeu — do mesmo modo que o RGPD já as alcançava. E é o **modelo declarado** do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), aprovado pelo Senado em dezembro de 2024 e ainda pendente na Câmara dos Deputados: a classificação por risco, os direitos das pessoas afetadas e a avaliação de impacto vieram de lá, mas o projeto brasileiro fez escolhas próprias em pontos sensíveis — algoritmos de recomendação, direitos autorais no treino e desenho da autoridade —, tratadas na comparação ao final desta nota. Vale a mesma advertência que a [LGPD](/notas/lgpd) já ensinou: inspiração estrutural não é equivalência jurídica.

## Os considerandos

O AI Act tem **180 considerandos** — mais do que os seus 113 artigos, e mais da metade do documento. Não são dispositivos: não criam obrigação por si e não recebem âncora no painel ao lado. Mas são parte do ato publicado no Jornal Oficial, e é a eles que a Comissão e o Tribunal de Justiça recorrem para fixar o sentido do articulado quando o texto do artigo é aberto. Vários dos conceitos operacionais do regulamento — o que é "inferir", o que é "influenciar significativamente uma decisão", o que conta como licença livre — só ganham contorno ali.

O que se segue é um mapa do que está em cada bloco, com o número do considerando para consulta no painel.

### Por que o regulamento existe (1 a 11)

O objetivo declarado é duplo — melhorar o funcionamento do mercado interno e promover uma IA centrada no ser humano e de confiança (1) —, e a aplicação deve seguir os valores da Carta (2, 6). O problema que justifica a harmonização é a fragmentação: Estados-Membros já vinham adotando regras nacionais próprias, o que reduziria a segurança jurídica e prejudicaria a livre circulação (3). Os considerandos 4 e 5 arrolam benefícios e riscos em paralelo, e os 10 e 11 fixam o que o regulamento **não** faz: não prejudica o RGPD nem o regime de responsabilidade dos prestadores intermediários do DSA.

### Como ler as definições (12 a 19)

- **"Sistema de IA"** (12) — a definição deve alinhar-se ao trabalho de organizações internacionais, para favorecer a convergência, e apoiar-se no que distingue esses sistemas de software tradicional. A característica central é a **capacidade de inferir**; ficam de fora os sistemas baseados em regras definidas exclusivamente por pessoas para executar operações automaticamente.
- **Biometria** (14 a 18) — "dados biométricos" deve ser lido à luz do RGPD, e os considerandos delimitam identificação biométrica, categorização biométrica, identificação à distância e reconhecimento de emoções.
- **"Espaço acessível ao público"** (19) — qualquer espaço físico acessível a um número indeterminado de pessoas, independentemente de propriedade e de condições de acesso.

### A abordagem baseada no risco e os sete princípios (26 e 27)

O considerando 27 é a ponte entre o regulamento e o debate ético que o precedeu: recorda as **Orientações Éticas para uma IA de Confiança**, elaboradas em 2019 pelo grupo de especialistas de alto nível nomeado pela Comissão, e lista os **sete princípios não vinculativos** que dali saíram — iniciativa e supervisão por humanos; solidez técnica e segurança; privacidade e governação dos dados; transparência; diversidade, não discriminação e equidade; bem-estar social e ambiental; e responsabilização. O texto é expresso em dizer que eles não substituem os requisitos vinculantes do regulamento.

### Por que cada prática foi proibida (28 a 45)

- **Manipulação e exploração de vulnerabilidades** (29) — técnicas que persuadem pessoas a comportamentos indesejados sem que elas percebam.
- **Categorização biométrica** (30) e **classificação social** (31) — esta última por produzir tratamento prejudicial descontextualizado, por atores públicos **ou privados**.
- **Identificação biométrica à distância em tempo real** (32 a 39) — o bloco mais extenso: descreve a intrusão, o efeito inibidor sobre liberdades e o desenho das exceções, da autorização prévia e do registro. Os considerandos 40 e 41 registram a posição do Reino Unido, da Irlanda e da Dinamarca quanto aos protocolos dos Tratados.
- **Avaliação preditiva de risco criminal** (42) — fundamentada na **presunção de inocência**: as pessoas devem ser avaliadas pelo comportamento real, não por comportamento previsto por máquina.
- **Recolha não seletiva de imagens faciais** (43).
- **Reconhecimento de emoções** (44) — a justificação é científica antes de ser jurídica: há "sérias preocupações quanto à base científica" desses sistemas, porque a expressão de emoções varia entre culturas, situações e no mesmo indivíduo, com "fiabilidade limitada, falta de especificidade e possibilidade limitada de generalização". A proibição alcança o trabalho e o ensino por causa do **desequilíbrio de poder** nesses contextos.

### Por que estes domínios são de alto risco (46 a 63)

Um considerando para cada domínio do Anexo III, explicando o bem jurídico em causa: biometria (54), infraestruturas críticas (55), educação (56), emprego e gestão de trabalhadores (57), serviços essenciais e avaliação de crédito (58), aplicação da lei (59), migração e fronteiras (60), administração da justiça e processos democráticos (61 e 62).

Dois merecem leitura direta:

- **Considerando 53** — desenvolve os critérios da derrogação do [art. 6.º, n.º 3](#art-6-p3), com exemplos do que é "tarefa processual restrita" (converter dados não estruturados em estruturados, classificar documentos) e do que significa não influenciar significativamente o resultado da decisão.
- **Considerando 63** — a advertência mais importante do bloco: classificar um sistema como de alto risco **não** o torna lícito perante o resto do direito da União ou nacional, e o regulamento **não é fundamento jurídico** para tratar dados pessoais, salvo onde ele próprio disser o contrário.

### Os requisitos e a cadeia de valor (64 a 96)

A gestão de riscos é descrita como processo **iterativo e contínuo** por todo o ciclo de vida (65); a qualidade dos dados, como condição para que o sistema funcione como pretendido e não gere discriminação proibida (67 e 70); a privacidade, como exigência de todo o ciclo (69). Os considerandos 71 e 72 tratam da opacidade e da complexidade como o problema que a transparência e a documentação técnica endereçam; o 73, da supervisão humana; os 74 a 77, de exatidão, solidez e cibersegurança, incluindo resistência a envenenamento de dados e de modelos.

Na cadeia, o considerando 79 explica por que a responsabilidade pela conformidade se concentra no **prestador**, o 84 por que distribuidores, importadores e responsáveis pela implantação passam a prestador em certas condições, o 85 o caso do sistema de finalidade geral usado como componente de alto risco, e o 89 por que ferramentas e componentes livres e de fonte aberta que não sejam modelos de finalidade geral ficam fora dos deveres de cadeia. O 92 ressalva os deveres de informação e consulta a trabalhadores que já decorrem de outros atos.

### Modelos de finalidade geral (97 a 117)

- **Conceito** (97 a 100) — o modelo se distingue do sistema; os **grandes modelos generativos** são "um exemplo típico" de modelo de finalidade geral, por permitirem geração flexível de texto, áudio, imagens ou vídeo adaptável a tarefas distintas (99).
- **Fonte aberta** (102 a 104) — o considerando 102 define o que se espera de uma licença livre para efeitos do regulamento (parâmetros, ponderações, arquitetura e informações de uso disponibilizados ao público), e o 104 fecha a porta: a exceção **não vale** para modelos com risco sistêmico, e não alcança o sumário do conteúdo de treino nem a política de direito de autor, porque abrir o modelo não revela como o treino foi feito.
- **Treino e direito de autor** (105 a 107) — fundamentam a política de direitos de autor e o sumário público do conteúdo usado no treino.
- **Risco sistêmico** (110 e 111) — decorre de "capacidades de elevado impacto", entendidas como as que igualam ou excedem as dos modelos mais avançados; o limiar em operações de vírgula flutuante é apresentado como reflexo do **estado da arte no momento da entrada em vigor**, e não como critério permanente.
- **Códigos de práticas** (116 e 117) — descritos como "instrumento central" de cumprimento, com uma hierarquia explícita: publicada uma norma harmonizada adequada, a conformidade com ela passa a conferir presunção de conformidade; sem código nem norma, o prestador demonstra por meios alternativos adequados.

### Transparência de conteúdo sintético (132 a 137)

O considerando 133 é a justificação do [art. 50.º](#art-50): conteúdo sintético cada vez mais difícil de distinguir do humano, com impacto "na integridade e na confiança no ecossistema da informação" e riscos de desinformação em grande escala, fraude, usurpação de identidade e dissimulação dos consumidores. Daí a exigência de marcação legível por máquina, "na medida em que tal seja tecnicamente viável". O 134 trata das ultrafalsificações do lado de quem as implanta.

### Inovação, governança e vigência (138 a 179)

Os considerandos 138 a 147 descrevem os objetivos dos ambientes de testagem, a base jurídica para tratamento ulterior de dados pessoais dentro deles e as medidas para PME e microempresas. Os 148 a 167 desenham a governança — Comitê, fórum consultivo, painel científico, autoridades nacionais independentes e a repartição de competências entre União e Estados-Membros. Os 168 e 169 tratam das sanções; o **171** delimita o direito a explicação do [art. 86.º](#art-86), que só alcança decisões baseadas **principalmente** no resultado de sistemas do Anexo III e não se aplica onde o direito da União já preveja o mesmo; o 172, a proteção de denunciantes; os 173 a 175, a delegação de poderes à Comissão.

O **considerando 179** explica o escalonamento: as proibições se antecipam para 2 de fevereiro de 2025 "tendo em conta o risco inaceitável" das práticas do [art. 5.º](#art-5), com efeitos que se irradiam para outros procedimentos, inclusive de direito civil; a governança e os organismos notificados precisam estar operacionais **antes** da aplicação geral, daí agosto de 2025; e as obrigações dos modelos de finalidade geral vêm nessa mesma data por causa do ritmo de adoção desses modelos.

### Os considerandos do Digital Omnibus (47)

O regulamento alterador tem 47 considerandos próprios, também no painel. Os que sustentam as mudanças de maior efeito:

- **40** — a justificação do adiamento: o atraso na disponibilidade de normas, especificações comuns e orientações e na instituição das autoridades nacionais competentes compromete o início efetivo da aplicação e ameaça elevar consideravelmente os custos, "de tal modo que a manutenção da sua data inicial de aplicação, a saber, 2 de agosto de 2026, deixe de se justificar".
- **22** — por que o registro dos sistemas autoexcluídos do alto risco foi mantido, e apenas simplificado: é "essencial para uma supervisão eficaz do mercado e para a responsabilização pública".
- **32** — por que a Comissão recebe poderes de autoridade de fiscalização sobre sistemas integrados em plataformas e motores de pesquisa de muito grande dimensão: o sistema de supervisão que o DSA já instituiu.
- **17 e 21** — pedido único e procedimento unificado de designação de organismos notificados, e o pedido às organizações europeias de normalização de produtos de normalização que sirvam ao mesmo tempo ao AI Act e à legislação setorial.
- **42** — a transferência do Regulamento Máquinas da seção A para a seção B do Anexo I, adotando abordagem setorial para as máquinas baseadas em IA.

## Fundamentos

### Objeto e objetivos ([art. 1.º](#art-1))

O regulamento declara um objetivo duplo, e a tensão entre as duas metades explica boa parte de suas soluções de compromisso: **melhorar o funcionamento do mercado interno** e **promover a adoção de uma IA centrada no ser humano e de confiança**, assegurando ao mesmo tempo um elevado nível de proteção da saúde, da segurança e dos direitos fundamentais consagrados na Carta — incluindo a democracia, o Estado de direito e a proteção ambiental — e apoiando a inovação.

Não é retórica de preâmbulo: é a base jurídica. Por ser fundado no art. 114 do TFUE (mercado interno), o AI Act precisa ser, antes de tudo, uma norma de **harmonização** — e é isso que impede os Estados-Membros de acrescentarem requisitos nacionais divergentes no campo já ocupado por ele (ver "Quem pode o quê", abaixo).

### Uma norma de produto, não de conduta

O AI Act se organiza como a legislação europeia de **segurança de produtos**, não como uma lei de direitos ao estilo do RGPD ou da [LGPD](/notas/lgpd). Daí seu vocabulário: colocação no mercado, colocação em serviço, avaliação da conformidade, marcação CE, organismos notificados, vigilância do mercado, normas harmonizadas. A consequência prática é que o eixo do cumprimento está **antes** da chegada ao mercado — documentação técnica, gestão de risco, qualidade dos dados, supervisão humana —, e não apenas na reparação posterior do dano.

É também por isso que os direitos individuais ocupam três artigos, no penúltimo capítulo (arts. [85.º](#art-85) a [87.º](#art-87)) — e é um dos pontos em que o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) tomou caminho diferente.

### Terminologia: PT-PT × pt-BR

O texto oficial em português é o de Portugal; estes comentários são escritos em português do Brasil. A ortografia aqui é a brasileira — "registro", "detecção", "seção", "sistêmico" —, mas os **termos técnicos do regulamento ficam como estão no texto oficial**, para que a palavra procurada nos comentários seja a mesma que aparece no painel ao lado. As correspondências que valem a pena fixar:

**Sujeitos da cadeia**

- **prestador** — o fornecedor, desenvolvedor ou provedor, no vocabulário brasileiro (o _provider_ da versão inglesa);
- **responsável pela implantação** — o implementador ou usuário profissional do sistema (o _deployer_);
- **mandatário** — o representante legal do prestador estabelecido fora da União;
- **pessoa singular** — a pessoa natural ou física; **pessoa coletiva** é a pessoa jurídica.

**Atos e situações**

- **colocação no mercado** e **colocação em serviço** — disponibilização e entrada em operação;
- **risco elevado** — o "alto risco" da literatura brasileira e do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233); esta nota usa as duas formas como sinônimas;
- **coima** — a multa administrativa;
- **ambiente de testagem da regulamentação** — o _sandbox_ regulatório;
- **empresa em fase de arranque** — a _startup_; **pequena empresa de média capitalização** é o _small mid-cap_, faixa entre a PME e a grande empresa;
- **ultrafalsificação** — o _deep fake_.

**Órgãos**

- **Serviço para a IA** — a estrutura da Comissão que supervisiona os modelos de finalidade geral (o _AI Office_). Esta nota usa a designação oficial;
- **Comitê Europeu para a Inteligência Artificial** — o colegiado dos Estados-Membros, grafado "Comité" no texto oficial;
- **painel científico de especialistas independentes** — "peritos" no texto oficial.

Uma armadilha específica: **operador**, no AI Act, é o gênero que abrange prestador, responsável pela implantação, importador, distribuidor e mandatário — e **não** corresponde ao operador da [LGPD](/notas/lgpd#art-5-vii), que trata dados em nome do controlador. O equivalente funcional deste último, quando há, é o responsável pela implantação.

Duas diferenças de grafia que atrapalham a busca no painel: o que aqui é **"seção"** aparece lá como **"secção"** (Anexo I, secção A), e o que aqui é **"registro"** aparece como **"registo"**.

## Aplicação ([art. 2.º](#art-2))

O regulamento alcança, independentemente do local de estabelecimento:

- **prestadores** que coloquem no mercado da União, ou coloquem em serviço na União, sistemas de IA ou modelos de finalidade geral — estejam estabelecidos na União ou em país terceiro;
- **responsáveis pela implantação** de sistemas de IA estabelecidos ou situados na União;
- **prestadores e responsáveis pela implantação de países terceiros** quando o **resultado produzido** pelo sistema for **utilizado na União** — é a cláusula de alcance extraterritorial mais relevante para empresas brasileiras, porque não exige presença nem oferta ativa no mercado europeu;
- **importadores e distribuidores**, fabricantes de produtos que incorporem IA sob a própria marca, mandatários de prestadores não estabelecidos na União; e
- **pessoas afetadas** que se encontrem na União.

Vale para a IA como tal, e não apenas para a IA "de internet": um sistema embarcado num equipamento médico ou num elevador está tão dentro do regulamento quanto um _chatbot_.

## Não aplicação e dispensas ([art. 2.º](#art-2))

O regulamento **não se aplica**:

- a sistemas de IA colocados no mercado, colocados em serviço ou utilizados **exclusivamente para fins militares, de defesa ou de segurança nacional**, seja qual for a entidade que os utilize — a exclusão é definida pela finalidade, não pelo sujeito, e não tem contrapartida de salvaguardas no regulamento;
- a autoridades públicas de países terceiros e a organizações internacionais que atuem no âmbito de **acordos de cooperação policial e judiciária** com a União ou seus Estados-Membros, mediante salvaguardas adequadas;
- a sistemas de IA e modelos **desenvolvidos e colocados em serviço exclusivamente para fins de investigação e desenvolvimento científicos**;
- a **atividades de investigação, ensaio e desenvolvimento** anteriores à colocação no mercado — ressalvados os ensaios em condições reais, que têm regime próprio ([art. 60.º](#art-60));
- ao uso por **pessoa singular no âmbito de atividade puramente pessoal e não profissional** — paralelo direto ao [art. 4.º, I, da LGPD](/notas/lgpd#art-4-i).

Há ainda uma **dispensa parcial para software livre**: sistemas e modelos disponibilizados sob licença **livre e de código aberto** ficam fora do regulamento, salvo quando forem colocados no mercado como sistemas de alto risco, incorrerem numa prática proibida do [art. 5.º](#art-5) ou estiverem sujeitos à transparência do [art. 50.º](#art-50). Modelos de finalidade geral abertos têm regime intermediário (ver "Inovação", abaixo).

O regulamento também **não prejudica o RGPD** nem o regime de responsabilidade dos prestadores intermediários do DSA, e não impede os Estados-Membros de manterem ou adotarem normas **mais favoráveis aos trabalhadores** quanto ao uso de IA pelos empregadores.

## Definições ([art. 3.º](#art-3))

São 68 definições. As que estruturam o resto do texto:

### Sujeitos

- **Prestador**: quem desenvolve — ou manda desenvolver — um sistema de IA ou um modelo de finalidade geral e o coloca no mercado ou em serviço **sob nome ou marca próprios**, a título oneroso ou gratuito.
- **Responsável pela implantação**: quem utiliza um sistema de IA sob a sua autoridade, no exercício de atividade profissional.
- **Mandatário**: pessoa estabelecida na União que recebe mandato escrito de prestador de país terceiro ([art. 22.º](#art-22)).
- **Importador**, **distribuidor** e, como gênero de todos, **operador**.
- **Pessoa afetada**: quem sofre os efeitos do sistema, sem necessariamente operá-lo — categoria a que se ligam os direitos dos arts. [85.º](#art-85) e [86.º](#art-86).

### Sistemas e modelos

- **Sistema de IA**: sistema baseado em máquinas concebido para funcionar com **níveis de autonomia variáveis**, que pode revelar **capacidade de adaptação** após a implantação e que, com base nos dados de entrada que recebe, **infere** como gerar resultados — previsões, conteúdos, recomendações ou decisões — capazes de influenciar ambientes físicos ou virtuais. A palavra decisiva é **inferir**: é ela que separa um sistema de IA de um software determinístico de regras, e a Comissão dedicou [orientações próprias](https://digital-strategy.ec.europa.eu/en/policies/ai-act-definition-ai-system) ao ponto.
- **Modelo de IA de finalidade geral**: modelo treinado com grande volume de dados em autossupervisão e em larga escala, que revela **generalidade significativa** e é capaz de executar competentemente uma vasta gama de tarefas distintas, podendo ser integrado a diversos sistemas ou aplicações a jusante.
- **Sistema de IA de finalidade geral**: sistema baseado num modelo dessa natureza, com capacidade de servir a diversas finalidades.
- **Risco sistêmico**: risco específico das capacidades de maior impacto dos modelos de finalidade geral, com efeitos negativos significativos e razoavelmente previsíveis sobre saúde pública, segurança, direitos fundamentais ou a sociedade em geral, propagáveis em escala ([art. 51.º](#art-51)).

### Conceitos operacionais

- **Colocação no mercado** (primeira disponibilização na União), **disponibilização no mercado** e **colocação em serviço** (primeiro fornecimento ao responsável pela implantação ou uso próprio, conforme a finalidade prevista).
- **Finalidade prevista** e **utilização indevida razoavelmente previsível** — o par que delimita até onde vai o dever de antecipação do prestador.
- **Modificação substancial**: alteração posterior à colocação no mercado, não prevista na avaliação de conformidade inicial, que afete a conformidade ou modifique a finalidade prevista. É o gatilho que **transforma quem modifica em prestador** ([art. 25.º](#art-25)).
- **Ultrafalsificação** (_deep fake_): conteúdo de imagem, áudio ou vídeo gerado ou manipulado por IA que se assemelha a pessoas, objetos, locais ou acontecimentos reais e que **pareceria autêntico** a uma pessoa.
- **Incidente grave** ([art. 73.º](#art-73)): incidente ou mau funcionamento que direta ou indiretamente cause morte ou danos graves à saúde, perturbação grave e irreversível de infraestrutura crítica, violação de obrigações do direito da União destinadas a proteger direitos fundamentais, ou danos graves a bens ou ao ambiente.
- **Literacia em IA**: competências e conhecimentos que permitem implantar sistemas de IA com conhecimento de causa e tomar consciência de suas oportunidades, riscos e possíveis danos.

## A pirâmide de risco

O desenho central do regulamento é uma escada de quatro degraus, com um regime transversal ao lado.

### Risco inaceitável: práticas proibidas ([art. 5.º](#art-5))

Rol **fechado**, aplicável desde 2 de fevereiro de 2025, que nenhum ato da Comissão pode ampliar ou reduzir — só o legislador europeu, como o próprio Digital Omnibus veio demonstrar. São proibidos:

- técnicas **subliminares**, propositadamente manipuladoras ou enganadoras que distorçam materialmente o comportamento e causem, ou possam causar, danos significativos;
- exploração de **vulnerabilidades** ligadas a idade, deficiência ou situação social ou econômica específica, com o mesmo efeito;
- **classificação social** (_social scoring_) de pessoas ou grupos com base em comportamento social ou características pessoais, que leve a tratamento prejudicial descontextualizado ou desproporcionado — e note-se que a proibição alcança **agentes privados**, não apenas o Estado;
- avaliação ou previsão do **risco de uma pessoa cometer uma infração penal** baseada exclusivamente na definição de perfis ou em traços de personalidade (a proibição não alcança sistemas de apoio à avaliação humana fundada em fatos objetivos e verificáveis diretamente ligados a uma atividade criminosa);
- criação ou expansão de bases de dados de **reconhecimento facial** por recolha não seletiva (_untargeted scraping_) de imagens faciais da internet ou de circuitos de televisão em circuito fechado;
- **reconhecimento de emoções** no **local de trabalho** e em **instituições de ensino**, salvo por razões médicas ou de segurança;
- **categorização biométrica** para inferir raça, opiniões políticas, filiação sindical, convicções religiosas ou filosóficas, vida sexual ou orientação sexual;
- **identificação biométrica à distância em tempo real** em espaços acessíveis ao público para fins de aplicação da lei, salvo em hipóteses taxativas — busca de vítimas de rapto, exploração ou desaparecimento; ameaça específica e iminente à vida ou de atentado terrorista; e localização de suspeitos de infrações graves —, sempre mediante autorização prévia de autoridade judiciária ou administrativa independente e habilitação por lei nacional.

**Digital Omnibus**: acrescentadas **duas novas proibições**, aplicáveis a partir de **2 de dezembro de 2026** — sistemas de IA destinados a gerar ou manipular **imagens íntimas não consentidas** de pessoas identificáveis (as aplicações conhecidas como _nudifiers_) e a gerar **material de abuso sexual infantil**. É o movimento em sentido contrário ao do resto do pacote: enquanto adia deveres de conformidade, o Omnibus **amplia** o rol fechado do art. 5.º. No Brasil, a mesma preocupação foi endereçada por outra via — o dever de remoção e comunicação do [art. 27 do ECA Digital](/notas/eca-digital#art-27) e a vedação de monetização do [art. 23](/notas/eca-digital#art-23).

### Alto risco ([arts. 6.º](#art-6) e [7.º](#art-7))

Duas portas de entrada:

- **[Art. 6.º, n.º 1](#art-6-p1) — IA embarcada em produto regulado.** O sistema é componente de segurança de um produto (ou é ele próprio o produto) abrangido pela legislação de harmonização listada no **Anexo I** — máquinas, dispositivos médicos, brinquedos, elevadores, veículos, aeronáutica — **e** esse produto está sujeito a avaliação de conformidade por terceiros.
- **[Art. 6.º, n.º 2](#art-6-p2) — os oito domínios do Anexo III**: biometria; infraestruturas críticas; educação e formação profissional; emprego, gestão de trabalhadores e acesso ao trabalho independente; acesso a serviços privados essenciais e a serviços e prestações públicos essenciais (inclusive avaliação de crédito e tarifação de seguros de vida e saúde); aplicação da lei; migração, asilo e controlo de fronteiras; administração da justiça e processos democráticos.

A **derrogação do [art. 6.º, n.º 3](#art-6-p3)** é a porta de saída do alto risco, e depende de autoavaliação do próprio prestador: um sistema listado no Anexo III **não** é de alto risco se não representar risco significativo, por executar apenas tarefa processual restrita, melhorar o resultado de atividade humana já concluída, detectar padrões decisórios sem substituir nem influenciar a avaliação humana, ou realizar tarefa meramente preparatória. A ressalva que fecha a porta: será **sempre** de alto risco o sistema que realize **definição de perfis** de pessoas singulares. Quem invoca a derrogação deve documentar a avaliação e registrá-la.

**Digital Omnibus**: a Comissão havia proposto **eliminar** o registro dos sistemas autoexcluídos pelo n.º 3; o texto final manteve o registro e apenas **enxugou dois campos** do Anexo VIII, Seção B (pontos 7 e 9). O **considerando 22** do Omnibus registra a razão: é "essencial para uma supervisão eficaz do mercado e para a responsabilização pública que esses sistemas de IA sejam registados na base de dados da UE", cabendo simplificar os requisitos, não suprimi-los.

O [art. 7.º](#art-7) autoriza a Comissão a **alterar o Anexo III por ato delegado**, acrescentando ou modificando domínios segundo critérios de risco fixados na própria norma — a válvula de atualização do regulamento sem reabrir o processo legislativo.

### Risco de transparência ([art. 50.º](#art-50))

Nem proibido nem de alto risco, mas capaz de enganar: sistemas que interagem com pessoas, que geram conteúdo sintético, que reconhecem emoções ou que produzem ultrafalsificações. O dever aqui não é de conformidade prévia, e sim de **informar** — tratado em seção própria, abaixo.

### Risco mínimo

Todo o resto: filtros de _spam_, IA de videojogos, recomendação de catálogo. Sem obrigações, salvo o dever transversal de **literacia em IA** do [art. 4.º](#art-4) e a possibilidade de adesão voluntária aos códigos de conduta do [art. 95.º](#art-95).

## Deveres e vedações essenciais

- Não colocar no mercado, nem colocar em serviço, nem utilizar sistema que incorra em qualquer prática do [art. 5.º](#art-5) — o único degrau cujo descumprimento leva ao teto sancionatório de 7% do volume de negócios ([art. 99.º](#art-99)).
- Não colocar no mercado sistema de alto risco sem **sistema de gestão de riscos**, governação de dados, documentação técnica, registro automático de eventos, transparência ao responsável pela implantação, supervisão humana e níveis adequados de exatidão, robustez e cibersegurança ([arts. 8.º a 15.º](#art-8)).
- Não afixar a **marcação CE** sem avaliação da conformidade concluída e declaração UE de conformidade emitida ([arts. 43.º](#art-43), [47.º](#art-47) e [48.º](#art-48)).
- Não invocar a derrogação do [art. 6.º, n.º 3](#art-6-p3) sem documentar a avaliação — e nunca quando houver **definição de perfis** de pessoas singulares.
- Não implantar sistema de alto risco **fora da finalidade prevista** pelo prestador, nem sem atribuir a supervisão humana a pessoas com competência, formação e autoridade para exercê-la ([art. 26.º](#art-26)).
- Não deixar de **informar previamente os trabalhadores e seus representantes** antes de colocar em serviço, no local de trabalho, sistema de alto risco que os afete ([art. 26.º](#art-26)).
- Não deixar de **informar a pessoa afetada** quando um sistema de alto risco do Anexo III for usado para tomar, ou apoiar, decisão que a atinja ([art. 26.º](#art-26)).
- Não omitir a **avaliação de impacto sobre os direitos fundamentais** quando o responsável pela implantação for organismo público, prestador privado de serviços públicos ou implantar sistemas de avaliação de crédito e de tarifação de seguros de vida e saúde ([art. 27.º](#art-27)).
- Não disponibilizar sistema que interaja com pessoas, gere conteúdo sintético ou produza ultrafalsificação **sem a informação e a marcação** do [art. 50.º](#art-50).
- Não colocar no mercado modelo de finalidade geral sem documentação técnica, informação a jusante, política de respeito ao direito de autor e **sumário público** do conteúdo usado no treino ([art. 53.º](#art-53)).
- Não deixar de **notificar a Comissão** ao atingir os limiares de risco sistêmico, nem de avaliar, mitigar, comunicar incidentes graves e assegurar cibersegurança adequada no caso desses modelos ([arts. 52.º](#art-52) e [55.º](#art-55)).
- Não deixar de **comunicar incidentes graves** à autoridade de fiscalização do mercado, nem de adotar medidas corretivas e informar a cadeia quando o sistema deixar de estar conforme ([arts. 20.º](#art-20) e [73.º](#art-73)).
- Não obstruir a fiscalização nem prestar informação incorreta, incompleta ou enganosa a organismos notificados e autoridades competentes — infração com teto próprio ([art. 99.º](#art-99)).
- **Vedação dirigida ao regulador**: os ambientes de testagem regulamentar não podem afastar a supervisão quanto a riscos para a saúde, a segurança e os direitos fundamentais, e a participação neles **não exime** de responsabilidade por danos causados a terceiros ([art. 57.º](#art-57)).

## Requisitos dos sistemas de alto risco ([arts. 8.º a 15.º](#art-8))

Sete requisitos, cumulativos e verificados ao longo de todo o ciclo de vida:

- **Gestão de riscos** ([art. 9.º](#art-9)) — processo iterativo e contínuo de identificação, estimativa e mitigação dos riscos previsíveis para a saúde, a segurança e os direitos fundamentais, incluindo os decorrentes de utilização indevida razoavelmente previsível, com atenção específica a crianças e a grupos vulneráveis.
- **Dados e governação de dados** ([art. 10.º](#art-10)) — conjuntos de treino, validação e teste pertinentes, suficientemente representativos, tão isentos de erros quanto possível e completos para a finalidade prevista, com exame de possíveis enviesamentos e consideração do contexto geográfico e comportamental de uso.
    - **Digital Omnibus**: o [n.º 5 deste artigo](#art-10-p5) foi **revogado** e seu conteúdo virou um artigo próprio e bem mais detalhado — o novo **art. 4.º-A**, "Tratamento de categorias especiais de dados pessoais para deteção e correção de enviesamentos". O tratamento excecional dessas categorias passa a depender de **seis condições cumulativas**: impossibilidade de obter o resultado com dados sintéticos ou anonimizados; limitações técnicas de reutilização e pseudonimização; controlo rigoroso e documentado de acesso; proibição de transmissão a terceiros; eliminação assim que corrigido o enviesamento; e registro das razões nas atividades de tratamento. Um segundo número estende a faculdade — sem criar dever — aos prestadores de outros sistemas e modelos e aos responsáveis pela implantação. Resolve um impasse real do desenho original (exigir prova de ausência de discriminação racial ou de gênero sem permitir tratar os dados que a revelariam), e é o mesmo dilema que a [LGPD](/notas/lgpd#art-11) enfrenta no seu [art. 11](/notas/lgpd#art-11), sem solução equivalente. O texto está no [art. 1.º do Omnibus](#omnibus-art-1), item 6.
- **Documentação técnica** ([art. 11.º](#art-11)) — elaborada **antes** da colocação no mercado, com o conteúdo mínimo do Anexo IV, e mantida atualizada.
- **Conservação de registros** ([art. 12.º](#art-12)) — registro automático de eventos (_logs_) ao longo do ciclo de vida, apto a assegurar rastreabilidade proporcional à finalidade.
- **Transparência e prestação de informações** ([art. 13.º](#art-13)) — funcionamento suficientemente transparente para que o responsável pela implantação interprete os resultados e os utilize adequadamente, com instruções de utilização claras.
- **Supervisão humana** ([art. 14.º](#art-14)) — concepção que permita a pessoas singulares compreender as capacidades e limitações do sistema, manter-se atentas ao **viés de automação**, interpretar corretamente os resultados, decidir não usar o sistema e **interromper seu funcionamento**. Para a identificação biométrica à distância, exige-se verificação por **duas pessoas** com competência e formação necessárias.
- **Exatidão, solidez e cibersegurança** ([art. 15.º](#art-15)) — desempenho coerente ao longo do ciclo de vida, resiliência a erros e a tentativas de manipulação do sistema, incluindo envenenamento de dados e de modelos e exemplos contraditórios.

## Obrigações por papel na cadeia ([arts. 16.º a 27.º](#art-16))

- **Prestador** ([art. 16.º](#art-16) e seguintes) — assegurar a conformidade com os requisitos acima; manter **sistema de gestão da qualidade** ([art. 17.º](#art-17)); conservar documentação e registros ([arts. 18.º](#art-18) e [19.º](#art-19)); adotar **medidas corretivas** e informar a cadeia e as autoridades quando o sistema deixar de estar conforme ([art. 20.º](#art-20)); cooperar com as autoridades ([art. 21.º](#art-21)); indicar **mandatário** na União, se estabelecido em país terceiro ([art. 22.º](#art-22)); realizar a avaliação da conformidade, emitir a declaração UE, afixar a marcação CE e registrar o sistema.
- **Importador** ([art. 23.º](#art-23)) e **distribuidor** ([art. 24.º](#art-24)) — verificar a conformidade formal antes de disponibilizar o sistema, não o colocar no mercado se souberem ou tiverem motivos para crer que não está conforme, e cooperar com as autoridades.
- **Responsável pela implantação** ([art. 26.º](#art-26)) — usar o sistema conforme as instruções; atribuir a supervisão humana a pessoas competentes e com autoridade e apoio para exercê-la; assegurar a pertinência dos dados de entrada sob seu controlo; monitorizar o funcionamento e suspender o uso diante de risco; conservar os registros gerados automaticamente; **informar trabalhadores e seus representantes** antes do uso no local de trabalho; e **informar as pessoas afetadas** por decisões tomadas ou apoiadas por sistemas do Anexo III. Autoridades públicas devem ainda cumprir a obrigação de registro do [art. 49.º](#art-49).
- **Mudança de papel na cadeia** ([art. 25.º](#art-25)) — distribuidor, importador, responsável pela implantação ou terceiro **passa a ser considerado prestador** de um sistema de alto risco se apuser o próprio nome ou marca, se introduzir **modificação substancial** ou se **alterar a finalidade prevista** de modo a tornar o sistema de alto risco. É a regra que impede a diluição de responsabilidade por reetiquetagem e a que mais preocupa integradores e revendedores.
- **Avaliação de impacto sobre os direitos fundamentais** ([art. 27.º](#art-27)) — devida antes da primeira utilização por organismos de direito público, por entidades privadas que prestem serviços públicos e por quem implante sistemas de avaliação de crédito ou de tarifação de seguros de vida e saúde. Deve descrever processos, período e frequência de uso, categorias de pessoas afetadas, riscos específicos de danos, medidas de supervisão humana e providências em caso de materialização do risco; o resultado é notificado à autoridade de fiscalização do mercado.

## Avaliação da conformidade, marcação CE e registro ([arts. 40.º a 49.º](#art-40))

O caminho normal do alto risco é a **autoavaliação** com base em **normas harmonizadas** europeias: quem segue uma norma harmonizada cuja referência foi publicada no JOUE goza de **presunção de conformidade** ([art. 40.º](#art-40)). Na falta delas, a Comissão pode adotar **especificações comuns** por ato de execução ([art. 41.º](#art-41)).

A intervenção de **organismo notificado** é exceção — reservada, em regra, a sistemas biométricos sem norma harmonizada aplicável e aos casos em que a legislação setorial do Anexo I já a exige. Concluída a avaliação, o prestador emite a **declaração UE de conformidade** ([art. 47.º](#art-47)), afixa a **marcação CE** ([art. 48.º](#art-48)) e registra o sistema na **base de dados da UE** ([arts. 49.º](#art-49) e [71.º](#art-71)), pública na parte que não seja confidencial.

O gargalo que motivou o Digital Omnibus está exatamente aqui: sem normas harmonizadas publicadas e sem organismos notificados designados em número suficiente, a obrigação de agosto de 2026 seria, para muitos sistemas, impossível de cumprir por falta de instrumento — não por falta de disposição.

**Digital Omnibus**: além do adiamento, passou a exigir que a Comissão solicite aos organismos europeus de normalização a elaboração de normas que cubram **simultaneamente** o AI Act e a legislação setorial aplicável, evitando que o mesmo produto tenha de satisfazer dois conjuntos paralelos de normas.

## Modelos de IA de finalidade geral ([arts. 51.º a 56.º](#art-51))

Camada acrescentada tardiamente à negociação, sob o impacto dos modelos generativos de grande escala. Ela não segue a pirâmide de risco: incide sobre o **modelo**, e não sobre o uso.

- **Obrigações de todos os prestadores de modelos de finalidade geral** ([art. 53.º](#art-53)): elaborar e manter documentação técnica do modelo; disponibilizar informação e documentação aos prestadores a jusante que integrem o modelo em seus sistemas; instituir **política de cumprimento do direito de autor**, inclusive quanto à reserva de direitos na prospeção de textos e dados; e publicar um **sumário suficientemente pormenorizado do conteúdo utilizado no treino**, segundo [modelo divulgado pela Comissão](https://digital-strategy.ec.europa.eu/en/library/template-public-summary-training-content).
    - Prestadores estabelecidos fora da União devem designar **mandatário** ([art. 54.º](#art-54)).
    - Modelos disponibilizados sob **licença livre e de código aberto**, com parâmetros e arquitetura publicamente acessíveis, ficam dispensados da documentação técnica e da informação a jusante — mas **não** da política de direito de autor nem do sumário de treino, e a dispensa **não vale** para modelos com risco sistêmico.
- **Risco sistêmico** ([art. 51.º](#art-51)): presume-se quando a quantidade cumulativa de computação usada no treino, medida em operações de vírgula flutuante (FLOP), ultrapassa o limiar fixado no regulamento; a Comissão também pode designar um modelo por decisão, com base em critérios do Anexo XIII. Atingido o limiar, o prestador **notifica a Comissão** ([art. 52.º](#art-52)) e pode argumentar, com fundamento, que o modelo não apresenta risco sistêmico.
- **Obrigações adicionais dos modelos com risco sistêmico** ([art. 55.º](#art-55)): avaliação do modelo segundo protocolos normalizados, incluindo **testes contraditórios** (_adversarial testing_); avaliação e atenuação dos riscos sistêmicos a nível da União; **comunicação de incidentes graves** ao Serviço para a IA e, quando cabível, às autoridades nacionais; e nível adequado de cibersegurança do modelo e de sua infraestrutura física.
- **Códigos de práticas** ([art. 56.º](#art-56)): o [Código de Práticas para a IA de finalidade geral](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai), publicado em julho de 2025, é o instrumento pelo qual os prestadores podem **demonstrar** o cumprimento. Aderir é voluntário; não aderir obriga a demonstrar conformidade por meios alternativos adequados — desenho que produz adesão sem imposição formal.

Modelos colocados no mercado **antes de 2 de agosto de 2025** têm até **2 de agosto de 2027** para se conformar ([art. 111.º](#art-111)).

## Transparência de conteúdos gerados por IA ([art. 50.º](#art-50))

Aplicável desde **2 de agosto de 2026**, e a parte do regulamento com efeito mais visível para o público em geral. Quatro deveres:

- **Interação com pessoas** — sistemas destinados a interagir diretamente com pessoas singulares devem ser concebidos de modo que o usuário seja **informado de que interage com uma IA**, salvo quando isso for óbvio para uma pessoa razoavelmente informada, atenta e advertida.
- **Marcação legível por máquina** — prestadores de sistemas que geram conteúdo sintético de áudio, imagem, vídeo ou texto devem assegurar que os resultados sejam **marcados em formato legível por máquina** e detetáveis como artificialmente gerados ou manipulados, por soluções técnicas eficazes, interoperáveis, sólidas e fiáveis, na medida em que sejam tecnicamente viáveis.
- **Reconhecimento de emoções e categorização biométrica** — o responsável pela implantação deve **informar as pessoas expostas** ao funcionamento do sistema e tratar os dados conforme o RGPD.
- **Ultrafalsificações e texto de interesse público** — quem implanta um sistema que gera ou manipula conteúdo constitutivo de **ultrafalsificação** deve **divulgar** que o conteúdo foi artificialmente gerado ou manipulado; o mesmo vale para **texto publicado com o fim de informar o público sobre questões de interesse público**, salvo quando o conteúdo tenha passado por **revisão humana ou controlo editorial** com responsabilidade editorial identificada. Há ressalva expressa para o uso **manifestamente artístico, criativo, satírico ou ficcional**, em que a divulgação se faz de modo a não perturbar a fruição da obra.

A informação deve ser prestada **na primeira interação ou exposição**, de forma clara e distinguível, e acessível a pessoas com deficiência.

**Digital Omnibus**: o art. 50.º **não** foi alcançado pelo adiamento geral — manteve a aplicação em 2 de agosto de 2026, e as autoridades nacionais podem fiscalizá-lo desde essa data. A única concessão foi de transição: sistemas de IA generativa **já colocados no mercado antes de 2 de agosto de 2026** têm até **2 de dezembro de 2026** para cumprir a marcação legível por máquina ([art. 111.º](#art-111), n.º 4, acrescentado pelo Omnibus).

Vale o contraste com o Brasil: não há dever geral equivalente de identificação de conteúdo sintético. O [ECA Digital](/notas/eca-digital) impõe obrigações a serviços de IA generativa apenas na proteção de crianças e adolescentes (Decreto nº 12.880/2026, [art. 11](/notas/eca-digital#dec12880-art-11)), e a Justiça Eleitoral disciplina o tema só no período eleitoral. Um dever transversal de marcação é uma das novidades do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233).

## Direitos das pessoas afetadas

O AI Act não é uma lei de direitos individuais, e isso se nota na quantidade e na posição dos dispositivos. Ainda assim, há um núcleo:

- **Informação sobre o uso** ([art. 26.º](#art-26)) — quem for objeto de decisão tomada ou apoiada por sistema de alto risco do Anexo III deve ser informado disso pelo responsável pela implantação; trabalhadores e seus representantes devem ser informados **antes** do uso no local de trabalho.
- **Direito à explicação da decisão individual** ([art. 86.º](#art-86)) — quem for objeto de decisão tomada por responsável pela implantação com base nos resultados de sistema de alto risco do Anexo III, e que produza **efeitos jurídicos** ou a afete significativamente de modo adverso quanto à saúde, à segurança ou aos direitos fundamentais, tem direito a obter explicações **claras e pertinentes** sobre o papel do sistema no processo decisório e sobre os principais elementos da decisão. Aplica-se apenas aos usos do Anexo III que não estejam excluídos e sem prejuízo do [art. 22 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679).
- **Direito de apresentar queixa** ([art. 85.º](#art-85)) — qualquer pessoa com motivos para considerar que houve infração ao regulamento pode apresentar queixa à **autoridade de fiscalização do mercado** competente, que a tratará conforme seus procedimentos.
- **Denúncia protegida** ([art. 87.º](#art-87)) — as infrações ao regulamento entram no âmbito da [Diretiva (UE) 2019/1937](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L1937), com a proteção de denunciantes que ela assegura.
- **Ação coletiva** — o regulamento incluiu o AI Act no anexo da diretiva de **ações representativas**, permitindo tutela coletiva de consumidores.

Duas ausências, comparadas à [LGPD](/notas/lgpd) e ao [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), merecem registro: não há **direito de contestação** da decisão automatizada nem direito autônomo a **revisão humana** no AI Act — o [art. 20 da LGPD](/notas/lgpd#art-20) e o [art. 22 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679) continuam sendo a via para isso —, e o regulamento **não cria** um regime próprio de responsabilidade civil. A proposta de diretiva sobre responsabilidade em matéria de IA, que ocuparia essa lacuna, foi **retirada** pela Comissão em 2025, deixando a reparação de danos ao direito nacional dos Estados-Membros e ao regime geral de responsabilidade por produtos defeituosos.

## Inovação: ambientes de testagem, PME e software livre ([arts. 57.º a 63.º](#art-57))

- **Ambientes de testagem da regulamentação** (_regulatory sandboxes_, [art. 57.º](#art-57)) — cada Estado-Membro deve assegurar que sua autoridade competente crie **pelo menos um** ambiente nacional. Oferecem ambiente controlado de desenvolvimento, treino, teste e validação sob supervisão, com orientação da autoridade sobre expectativas regulatórias, e a participação **não afasta** a responsabilidade por danos a terceiros.
- **Tratamento ulterior de dados pessoais** ([art. 59.º](#art-59)) — dentro do ambiente de testagem, admite-se o tratamento de dados pessoais licitamente recolhidos para outras finalidades no desenvolvimento de sistemas de IA de **interesse público substancial**, sob condições estritas e cumulativas.
- **Ensaios em condições reais fora do ambiente de testagem** ([arts. 60.º](#art-60) e [61.º](#art-61)) — sujeitos a plano aprovado, prazo limitado, registro, supervisão e **consentimento informado** dos participantes.
- **Medidas para PME e empresas em fase de arranque** ([art. 62.º](#art-62)) — **acesso prioritário** aos ambientes de testagem, ações de sensibilização, canais dedicados de comunicação com as autoridades, participação no processo de normalização e taxas de avaliação da conformidade reduzidas proporcionalmente ao porte.
- **Derrogações para microempresas** ([art. 63.º](#art-63)) — cumprimento simplificado de elementos do sistema de gestão da qualidade, sem redução do nível de proteção.
- **Software livre** ([art. 2.º](#art-2)) — a dispensa geral descrita em "Não aplicação e dispensas", acima, e o regime intermediário dos modelos de finalidade geral abertos ([art. 53.º](#art-53)).

**Digital Omnibus**: cria um **ambiente de testagem à escala da União**, gerido pelo Serviço para a IA, com funcionamento previsto a partir de **2028**; consolida em **um único plano** os ensaios em condições reais que envolvam mais de uma autoridade; e estende as medidas de apoio — inclusive o acesso prioritário — às **pequenas empresas de média capitalização** (_small mid-caps_), corrigindo o degrau que deixava sem apoio a empresa no instante em que deixava de ser PME.

## Quem pode o quê: a divisão de competências normativas

A mesma pergunta que organiza as notas da [LGPD](/notas/lgpd#quem-pode-o-qu-a-diviso-de-competncias-normativas), do [Marco Civil](/notas/mci) e do [ECA Digital](/notas/eca-digital) tem, na União Europeia, um degrau a mais: antes de saber qual instrumento pode dispor sobre o quê, é preciso saber **qual ordem jurídica** — a da União ou a nacional — está autorizada a dispor.

### Quem pode legislar

O AI Act é um **regulamento**, adotado pelo Parlamento Europeu e pelo Conselho com base nos arts. 16 e 114 do TFUE. Regulamento é **diretamente aplicável** em todos os Estados-Membros: não se transpõe, não se "regulamenta por lei nacional" e não admite versão nacional divergente no campo que ele harmoniza. É a diferença decisiva em relação a uma **diretiva** — como a de proteção de denunciantes —, que fixa o resultado e deixa a forma ao legislador nacional.

Alterar o AI Act exige, portanto, **novo ato legislativo** da União, pelo processo legislativo ordinário: proposta da Comissão, negociação entre Parlamento e Conselho, adoção formal por ambos. Foi exatamente o percurso do Digital Omnibus — proposta em 19 de novembro de 2025, acordo político em 7 de maio de 2026, adoção pelo Parlamento em 16 de junho, aprovação final do Conselho em 29 de junho, assinatura em 8 de julho e publicação em 24 de julho de 2026. Oito meses para adiar prazos e ajustar obrigações: um dado útil sobre a plasticidade real do regime.

### O que só o regulamento pode fazer

- **O rol de práticas proibidas** ([art. 5.º](#art-5)). É lista fechada, e a prova disso é que acrescentar duas proibições exigiu um regulamento alterador — nem a Comissão nem as autoridades nacionais poderiam fazê-lo.
- **A definição de sistema de IA e de modelo de finalidade geral** ([art. 3.º](#art-3)). A Comissão pode publicar **orientações** interpretativas, e publicou; não pode redefinir os conceitos.
- **Os tetos das coimas** ([art. 99.º](#art-99)) — 7%, 3% e 1% do volume de negócios mundial, e os valores fixos correspondentes. Aos Estados-Membros a lei delegou apenas fixar o **regime concreto** de sanções dentro desses limites.
- **A arquitetura de papéis e a distribuição de deveres** entre prestador, responsável pela implantação, importador e distribuidor.

### O que a Comissão pode fazer por ato delegado ou de execução

O equivalente europeu da técnica que a [LGPD](/notas/lgpd#o-que-a-anpd-pode-fazer-por-regulamento) usa ao remeter pontos ao regulamento da ANPD: o legislador fixa o marco e transfere o detalhamento a quem acompanha a evolução técnica.

- **Atos delegados** ([art. 97.º](#art-97)) — alterar o **Anexo III** (acrescentar ou modificar domínios de alto risco, [art. 7.º](#art-7)); ajustar os **limiares e critérios de risco sistêmico** dos modelos de finalidade geral ([art. 51.º](#art-51)); e atualizar anexos técnicos. São atos sujeitos a **direito de oposição** do Parlamento e do Conselho, que podem bloqueá-los ou revogar a delegação.
- **Atos de execução** ([art. 98.º](#art-98)) — **especificações comuns** quando faltam normas harmonizadas ([art. 41.º](#art-41)), modelos e formulários obrigatórios, decisões sobre modelos com risco sistêmico. Passam por comitologia, com o comité de Estados-Membros.
- **Orientações** ([art. 96.º](#art-96)) — instrumento interpretativo, não vinculante, mas de peso prático elevado: são elas que dizem, na prática, o que a Comissão considera uma prática proibida ou um sistema de IA.

### O degrau voluntário: normas harmonizadas, códigos de práticas e códigos de conduta

Peculiaridade europeia sem paralelo direto no arranjo brasileiro. Abaixo dos atos da Comissão há uma camada **tecnicamente vinculante sem ser juridicamente obrigatória**:

- **Normas harmonizadas** ([art. 40.º](#art-40)) — elaboradas pelos organismos europeus de normalização (CEN e CENELEC) a pedido da Comissão. Segui-las é facultativo; quem as segue ganha **presunção de conformidade**, e quem não as segue tem de demonstrar a conformidade por outro caminho. O atraso na sua publicação é a causa direta do adiamento do Digital Omnibus.
- **Códigos de práticas** (arts. [56.º](#art-56) para modelos de finalidade geral e [50.º](#art-50) para transparência) — negociados sob a condução do Serviço para a IA, com participação dos prestadores e da sociedade civil. Aderir é voluntário; a adesão é meio de demonstrar cumprimento.
- **Códigos de conduta** ([art. 95.º](#art-95)) — adesão voluntária de quem não é de alto risco a requisitos análogos aos do alto risco.

Esse desenho transfere para fora do processo legislativo — e, no caso das normas harmonizadas, para dentro de organismos técnicos privados — parte substancial da definição concreta das obrigações. As normas do CEN e do CENELEC são elaboradas a pedido da Comissão, mas não são publicadas no Jornal Oficial nem são de acesso gratuito: o que se publica é a referência delas.

### Quem fiscaliza

Não há uma autoridade única, e sim uma repartição por objeto:

- **Serviço para a IA** (_AI Office_, [art. 64.º](#art-64)), na Comissão — competência **exclusiva** sobre os modelos de IA de finalidade geral ([arts. 88.º a 94.º](#art-88)), com poderes de pedido de informação, avaliação de modelos, exigência de medidas e aplicação de coimas ([art. 101.º](#art-101)).
    - **Digital Omnibus**: a competência do Serviço para a IA foi **ampliada** para além dos modelos de finalidade geral. Pela nova redação do [art. 75.º, n.º 1](#art-75-p1), ele passa a deter **competência exclusiva** de supervisão e execução sobre os **sistemas de IA** construídos sobre modelos de finalidade geral quando modelo e sistema vêm do **mesmo prestador ou da mesma empresa**, e sobre os sistemas que **constituam ou estejam integrados** em plataformas e motores de pesquisa em linha de muito grande dimensão designados pelo DSA. A supervisão desses agentes passa das autoridades nacionais para a Comissão. O **considerando 32** do Omnibus justifica a mudança pelo sistema de supervisão que o DSA já instituiu, para assegurar "o exercício coerente e eficaz dos poderes de supervisão e execução da Comissão" nos dois regulamentos.
        - A exclusividade **não é total**: ficam de fora os sistemas ligados a produtos do Anexo I, os de **infraestruturas críticas** (Anexo III, ponto 2), os fornecidos por autoridades de aplicação da lei, de gestão de fronteiras e por instituições financeiras, e os de **administração da justiça** (Anexo III, ponto 8) — precisamente os domínios de maior sensibilidade nacional, que permanecem com as autoridades dos Estados-Membros. A competência também só alcança o **prestador**: atinge o responsável pela implantação apenas quando ele for igualmente o prestador ou parte da mesma empresa.
        - Nesses casos, os incidentes graves passam a ser comunicados **ao próprio Serviço para a IA**, e não à autoridade nacional, que é informada em seguida.
- **Autoridades nacionais competentes** ([art. 70.º](#art-70)) — cada Estado-Membro designa ao menos uma **autoridade notificadora** e uma **autoridade de fiscalização do mercado**, com independência, competência técnica e recursos adequados. É a elas que se dirigem as queixas do [art. 85.º](#art-85).
- **Autoridades de proteção dos direitos fundamentais** ([art. 77.º](#art-77)) — organismos nacionais de supervisão de direitos fundamentais podem requisitar e aceder à documentação dos sistemas de alto risco.
- **Autoridade Europeia para a Proteção de Dados** ([art. 100.º](#art-100)) — aplica coimas às instituições, órgãos e organismos da própria União.
- **Organismos notificados** ([arts. 28.º a 39.º](#art-28)) — entidades privadas acreditadas que realizam a avaliação da conformidade por terceiros; são fiscalizadas, não fiscalizam.

### O que ficou com os Estados-Membros

Mesmo num regulamento, sobra espaço nacional — e ele é maior do que costuma se supor:

- **designar** as autoridades competentes e assegurar-lhes meios ([art. 70.º](#art-70));
- **fixar o regime de sanções**, dentro dos tetos do [art. 99.º](#art-99), e comunicá-lo à Comissão;
- **autorizar por lei nacional**, ou não autorizar, a identificação biométrica à distância em tempo real para aplicação da lei ([art. 5.º](#art-5)) — vários Estados-Membros optaram por não a autorizar;
- **criar os ambientes de testagem** ([art. 57.º](#art-57)); e
- **manter ou adotar normas mais favoráveis aos trabalhadores** quanto ao uso de IA pelos empregadores ([art. 2.º](#art-2)) — a única cláusula expressa de piso, e não de teto, do regulamento.

## Governança ([arts. 64.º a 70.º](#art-64))

- **Serviço para a IA** ([art. 64.º](#art-64)) — estrutura da Comissão, responsável pela supervisão dos modelos de finalidade geral, pela condução dos códigos de práticas e pela coordenação com as autoridades nacionais.
- **Comitê Europeu para a Inteligência Artificial** ([arts. 65.º](#art-65) e [66.º](#art-66)) — composto por representantes dos Estados-Membros; aconselha e assiste a Comissão e as autoridades nacionais, emite pareceres e recomendações e promove a aplicação coerente do regulamento. É o análogo funcional do Comitê Europeu para a Proteção de Dados no RGPD — e, como ele, **não** edita normas nem sanciona.
- **Fórum consultivo** ([art. 67.º](#art-67)) — participação equilibrada da indústria, das empresas em fase de arranque, das PME, da sociedade civil e da academia; papel propositivo, como o do [CNPD](/notas/lgpd#o-cnpd-consultivo-sem-poder-normativo) brasileiro.
- **Painel científico de especialistas independentes** ([art. 68.º](#art-68)) — assessora a execução quanto aos modelos de finalidade geral, pode emitir **alertas qualificados** sobre riscos sistêmicos e contribui para as metodologias de avaliação. Os Estados-Membros podem recorrer ao **conjunto de especialistas** para suas próprias atividades ([art. 69.º](#art-69)).
- **Base de dados da UE** ([art. 71.º](#art-71)) — registro público dos sistemas de alto risco do Anexo III, com parte reservada quanto aos usos policiais e migratórios.
- **Acompanhamento pós-comercialização e incidentes** ([arts. 72.º](#art-72) e [73.º](#art-73)) — plano de monitorização durante toda a vida do sistema e comunicação de **incidentes graves** à autoridade de fiscalização do mercado, em prazos escalonados conforme a gravidade.

## Sanções ([arts. 99.º a 101.º](#art-99))

Os Estados-Membros estabelecem o regime de sanções — efetivas, proporcionadas e dissuasivas —, observados três tetos, sempre pelo **maior** valor entre o montante fixo e o percentual do **volume de negócios anual mundial** do exercício anterior:

- **até 35 milhões de euros ou 7%** — violação das **práticas proibidas** do [art. 5.º](#art-5);
- **até 15 milhões de euros ou 3%** — descumprimento das demais obrigações de prestadores, mandatários, importadores, distribuidores, responsáveis pela implantação e organismos notificados;
- **até 7,5 milhões de euros ou 1%** — prestação de informações **incorretas, incompletas ou enganosas** a organismos notificados ou às autoridades nacionais.

Para **PME e empresas em fase de arranque** — e, desde o Digital Omnibus, também para as **pequenas empresas de média capitalização** —, aplica-se o **menor** dos dois valores, e não o maior. É a inversão da regra geral, e o mecanismo de proporcionalidade por porte que o regulamento traz no capítulo sancionatório.

A dosimetria considera natureza, gravidade e duração da infração e suas consequências; se outras autoridades já aplicaram coimas pelo mesmo fato; a dimensão, a quota de mercado e o volume de negócios do agente; eventual benefício obtido; o grau de cooperação; e se a infração foi negligente ou dolosa.

Aos **prestadores de modelos de finalidade geral**, as coimas são aplicadas **pela própria Comissão**, e não pelos Estados-Membros, até **15 milhões de euros ou 3%** do volume de negócios mundial ([art. 101.º](#art-101)) — coerente com a competência exclusiva do Serviço para a IA sobre essa camada.

O regime sancionatório vale desde **2 de agosto de 2025**, com exceção do [art. 101.º](#art-101), cuja aplicação acompanhou o cronograma dos modelos de finalidade geral.

## Cronograma de aplicação ([art. 113.º](#art-113))

Já cumpridos:

- **1º de agosto de 2024** — entrada em vigor.
- **2 de fevereiro de 2025** — disposições gerais, definições ([art. 3.º](#art-3)), **literacia em IA** ([art. 4.º](#art-4)) e **práticas proibidas** ([art. 5.º](#art-5)).
- **2 de agosto de 2025** — **modelos de finalidade geral** ([arts. 51.º a 56.º](#art-51)), **governança** ([arts. 64.º a 70.º](#art-64)), autoridades notificadoras e organismos notificados, confidencialidade e o **regime sancionatório**, exceto o [art. 101.º](#art-101). Prazo, também, para os Estados-Membros designarem suas autoridades nacionais.
- **2 de agosto de 2026** — **aplicação geral** do regulamento, incluindo os deveres de **transparência do [art. 50.º](#art-50)** e o funcionamento dos ambientes nacionais de testagem.

A cumprir:

- **2 de dezembro de 2026** — **Digital Omnibus**: entrada em aplicação das **novas proibições** do [art. 5.º](#art-5) (imagens íntimas não consentidas e material de abuso sexual infantil) e fim do período de transição da **marcação legível por máquina** para sistemas generativos já no mercado em 2 de agosto de 2026.
- **2 de agosto de 2027** — conformação dos **modelos de finalidade geral colocados no mercado antes de 2 de agosto de 2025** ([art. 111.º](#art-111)).
- **2 de dezembro de 2027** — **Digital Omnibus**: obrigações dos sistemas de **alto risco do Anexo III** ([art. 6.º, n.º 2](#art-6-p2)), **adiadas de 2 de agosto de 2026**.
- **2 de agosto de 2028** — **Digital Omnibus**: obrigações dos sistemas de **alto risco embarcados em produtos regulados** do Anexo I ([art. 6.º, n.º 1](#art-6-p1)), **adiadas de 2 de agosto de 2027**. Data prevista, também, para o funcionamento do ambiente de testagem à escala da União.
- **2 de agosto de 2030** — conformação dos sistemas de alto risco destinados a **autoridades públicas** já colocados no mercado ([art. 111.º](#art-111)).
- **31 de dezembro de 2030** — sistemas que sejam componentes de **sistemas informáticos de grande escala** listados no Anexo X.

## O Digital Omnibus: o que mudou e o que ficou de fora

### Como chegou aqui

Em 19 de novembro de 2025 a Comissão Europeia apresentou o pacote **Digital Omnibus**, com dois instrumentos distintos que convém não confundir:

- o **Digital Omnibus sobre a IA**, restrito ao AI Act e à legislação setorial conexa — **aprovado e em vigor** desde 27 de julho de 2026, como [Regulamento (UE) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj); e
- o **Digital Omnibus** de dados, que propõe alterações ao **RGPD**, à Diretiva ePrivacy, ao Regulamento dos Dados e à Diretiva SRI 2 — incluindo o tratamento de dados pseudonimizados, as regras de _cookies_ e as bases de tratamento para treino de IA. Esse continua **em tramitação**, sem acordo final, e não produziu efeito algum até aqui.

A distinção importa porque parte do que se discute sob o nome "Digital Omnibus" — inclusive o [parecer conjunto do Comitê Europeu para a Proteção de Dados e da Autoridade Europeia para a Proteção de Dados](https://www.edpb.europa.eu/news/news/2026/digital-omnibus-edpb-and-edps-support-simplification-and-competitiveness-while_en), que apoiou o objetivo de simplificação e registrou preocupações de fundo — trata do **segundo**, e não do que já virou lei.

### O balanço das alterações ao AI Act

**Adia**: o alto risco do Anexo III de 2 de agosto de 2026 para **2 de dezembro de 2027**; o alto risco embarcado do Anexo I de 2 de agosto de 2027 para **2 de agosto de 2028**. São **datas fixas**, e não prazos condicionados à publicação das normas harmonizadas, como cogitado durante a negociação — escolha que favorece a previsibilidade e retira da Comissão o poder de acionar o relógio.

São 43 itens de alteração ao AI Act, no [art. 1.º do Omnibus](#omnibus-art-1), mais ajustes ao Regulamento de Base da Aviação e ao Regulamento Máquinas. Agrupados por efeito:

**Adia**: o alto risco do Anexo III de 2 de agosto de 2026 para **2 de dezembro de 2027**; o alto risco embarcado do Anexo I de 2 de agosto de 2027 para **2 de agosto de 2028** (nova redação do [art. 113.º](#art-113), terceiro parágrafo, alínea c)). São **datas fixas**, e não prazos condicionados à publicação das normas harmonizadas: o adiamento não depende de ato posterior da Comissão para produzir efeito.

**Amplia**: duas novas práticas proibidas no [art. 5.º](#art-5) — alíneas b-A) e b-B) do n.º 1, com os novos n.º 1-A e 1-B a delimitá-las —, aplicáveis a partir de 2 de dezembro de 2026; e a **competência exclusiva do Serviço para a IA** do [art. 75.º](#art-75), sobre os sistemas construídos sobre modelos de finalidade geral do mesmo prestador e os integrados em plataformas de muito grande dimensão do DSA, com as exceções descritas acima.

**Simplifica**:

- artigo próprio para o tratamento de **dados de categorias especiais** na detecção e correção de enviesamentos (novo **art. 4.º-A**, com o [art. 10.º, n.º 5](#art-10-p5), revogado);
- **critério do componente de segurança** afinado no [art. 6.º](#art-6) (novos n.º 1-A a 1-C): IA usada só para conforto, desempenho, eficiência ou controlo de qualidade **não** é componente de segurança — salvo se a sua falha puder pôr em perigo a saúde e a segurança —, e a avaliação por terceiros exigida por riscos alheios à saúde e à segurança (interferência eletromagnética, espetro de radiofrequências) deixa de arrastar o sistema para o alto risco;
- **documentação técnica simplificada** para PME e pequenas empresas de média capitalização, em formulário que a Comissão deve criar e que os organismos notificados são obrigados a aceitar ([art. 11.º](#art-11));
- normas harmonizadas que cubram **simultaneamente** o AI Act e a legislação setorial ([art. 40.º](#art-40));
- ambiente de testagem à escala da União e extensão do apoio regulatório às **pequenas empresas de média capitalização**, inclusive no teto das coimas, que para elas passa a ser o **menor** dos dois valores ([art. 99.º](#art-99), novo n.º 6-A);
- ponto único de entrada para notificações de incidentes hoje repartidas entre vários regimes.

**Preservou** o que a proposta original queria enxugar: o **registro na base de dados da UE** dos sistemas autoexcluídos do alto risco pelo [art. 6.º, n.º 3](#art-6-p3) — o texto final considerou-o essencial à vigilância do mercado e à prestação de contas, e limitou-se a suprimir dois campos da seção B do Anexo VIII (pontos 7 e 9); e a **aplicação do [art. 50.º](#art-50)** na data original.

### O alcance da reforma

O que o Omnibus **não** tocou delimita seu alcance: a abordagem baseada no risco, a arquitetura de papéis, os sete requisitos dos sistemas de alto risco e o regime dos modelos de finalidade geral seguem como estavam. As alterações incidem sobre **prazos, competências de supervisão e requisitos de documentação** — e, no [art. 5.º](#art-5), sobre o rol de proibições, que foi ampliado.

O efeito temporal, em números: os deveres dos sistemas de alto risco do Anexo III — que alcançam emprego, crédito, educação, serviços públicos essenciais, migração e administração da justiça — passaram a ser exigíveis **dezesseis meses depois** da data original. Os deveres de transparência do [art. 50.º](#art-50) e as proibições do [art. 5.º](#art-5) não foram adiados.

O adiamento por indisponibilidade dos instrumentos de conformidade não é uma situação estranha ao Brasil: a [LGPD](/notas/lgpd) teve a vigência adiada duas vezes e as sanções suspensas por quase um ano depois de vigente, e o [ECA Digital](/notas/eca-digital) teve a _vacatio legis_ discutida em veto e em duas medidas provisórias.

## Interação com o RGPD, o DSA e o DMA

O AI Act não substitui nem derroga nenhum deles: **acumula**. Um mesmo sistema pode responder simultaneamente perante quatro regimes, com autoridades e lógicas diferentes.

- **RGPD** — o AI Act regula o **sistema**; o RGPD regula o **tratamento de dados pessoais** que ele realiza. Um sistema pode ser plenamente conforme ao AI Act e ilícito perante o RGPD por falta de base legal, e vice-versa. Pontos de contato diretos: a governação de dados do [art. 10.º](#art-10) e o tratamento de categorias especiais para detecção de enviesamento; o [art. 22 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679), que continua sendo a via para contestar decisões automatizadas, ao lado do direito a explicação do [art. 86.º](#art-86); e o tratamento ulterior nos ambientes de testagem ([art. 59.º](#art-59)). Para o leitor brasileiro, é a mesma sobreposição que haverá entre o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) e a [LGPD](/notas/lgpd).
- **DSA** — regula a **moderação e o risco sistêmico das plataformas**; o AI Act regula os sistemas de IA que elas empregam. Depois do Digital Omnibus, a repartição institucional ficou explícita: os sistemas de IA integrados em plataformas e motores de pesquisa de muito grande dimensão passam à supervisão do Serviço para a IA, na mesma lógica de centralização que o DSA já adotara. Note-se, para efeito de comparação, que o regime brasileiro que ocupa o espaço do DSA não veio de lei, mas da reinterpretação do [art. 19 do Marco Civil](/notas/mci#art-19) pelo STF nos Temas 987 e 533 e dos decretos que a operacionalizaram (ver [a nota do Marco Civil](/notas/mci)).
- **DMA** — regula o **poder de mercado** dos controladores de acesso (_gatekeepers_); não trata de risco de IA, mas alcança serviços de IA integrados a plataformas designadas.
- **Regulamento dos Dados** e legislação setorial do **Anexo I** — o Digital Omnibus alterou o Regulamento Máquinas e o Regulamento de Base da Aviação exatamente para evitar dupla avaliação de conformidade sobre o mesmo produto.

## Comparação com o PL nº 2338/2023

### Onde está o projeto brasileiro

O [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), de autoria do então presidente do Senado, resultou dos trabalhos de uma comissão de juristas e foi **aprovado pelo Plenário do Senado em 10 de dezembro de 2024**. Chegou à [Câmara dos Deputados](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262) em 17 de março de 2025, com regime de **prioridade** e sujeito à apreciação do Plenário. Em 29 de abril de 2025, ato da Presidência constituiu a **comissão especial** para examiná-lo, presidida pela deputada Luisa Canziani (PSD-PR); em 20 de maio de 2025 foi designado relator o deputado Aguinaldo Ribeiro (PP-PB). A comissão realizou ciclo de audiências públicas e seminários regionais ao longo de 2025, e ao projeto já foram **apensadas 35 proposições**.

A votação foi sucessivamente adiada — do fim de 2025 para 2026 — em meio a divergências sobre os pontos sensíveis. Na data de fechamento desta nota, a ficha de tramitação registra a situação como **"aguardando parecer do relator na comissão especial"**: o parecer ainda não foi apresentado, e a movimentação de 2026 se resume a despachos de apensação de novos projetos. O PL **não é lei**, e não há texto de relatoria a comparar — a comparação abaixo é, portanto, com o **substitutivo aprovado pelo Senado**, único texto com deliberação concluída.

Para situar os dois calendários: entre a aprovação do texto no Senado, em dezembro de 2024, e hoje, a União Europeia colocou o AI Act em vigor, aplicou três das suas quatro fases de exigibilidade e aprovou a primeira reforma; no mesmo intervalo, o projeto brasileiro passou da apresentação na Câmara à espera do parecer do relator.

### Onde os dois convergem

O PL nº 2338/2023 assume o AI Act como referência, e a herança é visível na estrutura:

- **Classificação por risco** — risco excessivo (vedado) e alto risco, com listas anexas, tal como as práticas proibidas do [art. 5.º](#art-5) e o Anexo III.
- **Práticas vedadas** de perfil semelhante — sistemas que exploram vulnerabilidades, classificação social por poder público, avaliação preditiva de risco criminal baseada em traços de personalidade, identificação biométrica à distância em tempo real em espaços públicos com exceções sujeitas a autorização judicial.
- **Avaliação de impacto algorítmico** para sistemas de alto risco, com função análoga à da avaliação de impacto sobre os direitos fundamentais do [art. 27.º](#art-27).
- **Deveres de governança** — documentação, gestão de riscos, qualidade de dados, supervisão humana, registro de operação, testes de robustez e segurança.
- **Transparência de conteúdo sintético**, com identificação de conteúdo gerado por IA.
- **Regime próprio para modelos de propósito geral e IA generativa**, com avaliação prévia de riscos.
- **Sanções escalonadas** com teto percentual sobre o faturamento.
- **Coordenação entre reguladores**, em vez de autoridade única — o SIA brasileiro cumpre função próxima à do arranjo europeu entre Serviço para a IA, Comitê e autoridades nacionais.

### Onde divergem

As divergências, ponto a ponto:

- **Instrumento e efeito.** O AI Act é regulamento diretamente aplicável a 27 ordens jurídicas; o PL é lei federal ordinária de um Estado unitário quanto à competência legislativa sobre a matéria. Não há, no Brasil, o problema de harmonização que justifica metade do desenho europeu — nem, portanto, a camada de normas harmonizadas e organismos notificados.
- **Algoritmos de recomendação.** O PL classifica como de **alto risco** a curadoria, a moderação e a distribuição de conteúdo em larga escala por plataformas e motores de busca. O AI Act **não** trata recomendação de conteúdo como alto risco: o tema fica com o DSA, em regime de risco sistêmico, e não de conformidade de produto. É a divergência de maior alcance material entre os dois textos — no desenho brasileiro, as mesmas plataformas responderiam pelos requisitos de alto risco.
- **Direito de autor no treino.** O PL disciplina expressamente o uso de conteúdo protegido no treino de sistemas de IA, com direito de oposição dos titulares e previsão de **remuneração**. O AI Act limita-se a exigir do prestador uma **política** de cumprimento do direito de autor e o sumário público do conteúdo de treino ([art. 53.º](#art-53)), remetendo o mérito à diretiva de direito de autor e às exceções nacionais de prospeção de textos e dados. O ponto está disciplinado no projeto brasileiro e não no regulamento europeu.
- **Direitos das pessoas afetadas.** O PL prevê um catálogo mais largo e o posiciona no corpo inicial do texto: informação prévia, explicação, **contestação de decisões** e **revisão humana**, além de direito à não discriminação e à correção de vieses, O AI Act traz explicação ([art. 86.º](#art-86)) e queixa ([art. 85.º](#art-85)) em capítulo final, e **não** cria direito de contestação nem de revisão humana, que continuam a depender do [art. 22 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679) — assim como, no Brasil, hoje dependem do [art. 20 da LGPD](/notas/lgpd#art-20).
- **Responsabilidade civil.** O PL trata do tema, articulando-o com o Código de Defesa do Consumidor e com o regime de responsabilidade agravada para alto risco. O AI Act **não** cria regime de responsabilidade civil, e a diretiva que o faria foi retirada em 2025.
- **Autoridade.** O PL atribui à [ANPD](https://www.gov.br/anpd/pt-br) a coordenação do SIA, consolidando-a como reguladora também da IA — trajetória já percorrida com o [ECA Digital](/notas/eca-digital) e o [Marco Civil](/notas/mci). A União Europeia criou estrutura nova, o Serviço para a IA, dentro da Comissão, e não atribuiu a matéria às autoridades de proteção de dados; a essas reservou a supervisão das instituições da própria União ([art. 100.º](#art-100)) e a competência que já lhes cabe pelo RGPD.
- **Trabalho e sindicatos.** O AI Act tem cláusula expressa permitindo aos Estados-Membros normas **mais protetivas aos trabalhadores** ([art. 2.º](#art-2)) e impõe informação prévia a trabalhadores e seus representantes ([art. 26.º](#art-26)). O PL trata do impacto sobre trabalhadores, mas sem a articulação com negociação coletiva que o texto europeu deixa em aberto.
- **Segurança nacional.** A exclusão europeia de usos militares, de defesa e de segurança nacional ([art. 2.º](#art-2)) é ampla e incondicionada. O PL não replica exclusão de igual largura, o que tende a produzir alcance material maior no Brasil justamente na zona mais sensível.
- **Estágio.** O AI Act está em vigor desde 2024, com três das quatro fases de exigibilidade já aplicadas, orientações da Comissão publicadas, códigos de práticas em uso, base de dados em construção e uma reforma aprovada. O PL não é lei e não tem parecer na comissão especial. São textos em estágios diferentes, e não dois regimes vigentes a comparar.

### Três pontos de contato com o debate brasileiro

Sem transpor conclusões — são ordens jurídicas distintas —, três aspectos da execução europeia têm equivalente direto no que o Brasil terá de resolver:

- **A dependência entre prazo e instrumento de conformidade.** O Omnibus justifica o adiamento, no considerando 40, pela indisponibilidade de normas harmonizadas e de especificações comuns e pelo atraso na instituição das autoridades nacionais competentes. No desenho brasileiro, o papel dos instrumentos caberia à regulamentação da ANPD e à capacidade de fiscalização do SIA — pendências que o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) remete a atos posteriores, como a [LGPD](/notas/lgpd) fez.
- **Quem define o conteúdo concreto do dever.** Na União Europeia, o que satisfaz o [art. 15.º](#art-15) é fixado por normas do CEN e do CENELEC, não pelo legislador nem pela Comissão. O equivalente brasileiro seriam resoluções da ANPD e normas técnicas da ABNT — com a mesma questão sobre publicidade e acesso ao texto que define a obrigação.
- **O recorte do que foi e do que não foi adiado.** O adiamento alcançou os deveres de conformidade dos sistemas de alto risco; as proibições do [art. 5.º](#art-5) e a transparência do [art. 50.º](#art-50) mantiveram as datas, e o rol de proibições foi ampliado. É um dado a considerar em qualquer discussão sobre escalonamento de vigência no marco brasileiro.

## Pontos em aberto

Questões que o texto vigente não fecha, e que condicionam como o regulamento será aplicado daqui em diante:

- **O pacote de dados do Digital Omnibus.** As alterações propostas ao RGPD, à Diretiva ePrivacy, ao Regulamento dos Dados e à Diretiva SRI 2 seguem em tramitação, sem acordo final. O [Comitê Europeu para a Proteção de Dados e a Autoridade Europeia para a Proteção de Dados manifestaram-se sobre elas em parecer conjunto](https://www.edpb.europa.eu/news/news/2026/digital-omnibus-edpb-and-edps-support-simplification-and-competitiveness-while_en), apoiando o objetivo de simplificação e registrando preocupações de fundo. Como parte dessas propostas toca o tratamento de dados para treino de IA, o desfecho afeta o cumprimento do AI Act sem alterá-lo.
- **As normas harmonizadas.** A presunção de conformidade do [art. 40.º](#art-40) só opera quando a referência da norma é publicada no Jornal Oficial. Foi a ausência dessas publicações que fundamentou o adiamento; enquanto não vierem, o cumprimento dos [arts. 8.º a 15.º](#art-8) tem de ser demonstrado por outro caminho.
- **A derrogação do [art. 6.º, n.º 3](#art-6-p3).** O critério é autoaplicado pelo prestador e o registro dos sistemas autoexcluídos foi mantido pelo Omnibus. Quanto do Anexo III fica efetivamente fora do alto risco por essa via é algo que só a base de dados da UE e a prática de fiscalização vão mostrar.
- **A reparação de danos.** O AI Act não cria regime de responsabilidade civil, e a proposta de diretiva sobre responsabilidade em matéria de IA foi retirada pela Comissão em 2025. A reparação continua repartida entre os direitos nacionais e o regime de responsabilidade por produtos defeituosos — diferentemente do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), que trata do tema no próprio projeto.
- **A repercussão internacional.** O AI Act é a primeira lei geral de IA de um grande bloco, e o RGPD é precedente de difusão de modelo regulatório europeu. Até aqui os caminhos divergiram: os Estados Unidos regulam por ordens executivas federais e leis estaduais, o Reino Unido optou por abordagem setorial sem lei geral, e o Brasil, apesar da inspiração declarada, ainda não converteu o PL nº 2338/2023 em lei e diverge do modelo europeu nos pontos listados acima.
