---
layout: nota
permalink: /notas/ai-act
title: AI Act — Regulamento de Inteligência Artificial da União Europeia
description: Notas de estudo sobre o Regulamento (UE) 2024/1689 — pirâmide de risco, práticas proibidas, sistemas de alto risco, modelos de finalidade geral, governança e sanções, já com as alterações do Digital Omnibus, e a comparação com o PL nº 2338/2023.
lei: ai-act-consolidado
normas_extra: [ai-act, regulamento-2026-1744]
ordem: 6
jurisdicao: União Europeia
atualizado_em: 2026-08-19
---

## Resumo geral

O AI Act é a primeira lei geral de inteligência artificial de um grande bloco econômico. Em vez de regular uma tecnologia, ele regula **usos**: o mesmo modelo pode ser irrelevante para a lei num contexto e altamente regulado em outro, conforme a função que exerce e o dano que pode causar. Essa é a chamada **abordagem baseada no risco**, organizada em quatro degraus — risco inaceitável (práticas proibidas), alto risco, risco de transparência e risco mínimo —, aos quais se soma um regime próprio, transversal, para os **modelos de IA de finalidade geral**.

A escolha do instrumento importa tanto quanto o conteúdo: é um **regulamento**, não uma diretiva. Vale diretamente nos 27 Estados-Membros, sem transposição, e substitui a possibilidade de 27 leis nacionais divergentes por um texto único — a mesma técnica do [RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679), e a razão pela qual o AI Act, como ele, tende a transbordar suas fronteiras: alcança quem fornece sistemas para o mercado europeu ou cujo resultado seja usado na União, esteja onde estiver ([art. 2.º](#art-2)).

A execução seguiu outro ritmo, e a própria norma que a corrigiu diz por quê: segundo o **considerando 40** do Regulamento (UE) 2026/1744, "o atraso na disponibilidade de normas, especificações comuns e orientações alternativas e na instituição das autoridades nacionais competentes" gerou dificuldades que comprometiam o início efetivo da aplicação e ameaçavam elevar consideravelmente os custos de cumprimento, "de tal modo que a manutenção da sua data inicial de aplicação, a saber, 2 de agosto de 2026, deixe de se justificar". Daí o **Digital Omnibus sobre a IA**, o [Regulamento (UE) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj), proposto pela Comissão em novembro de 2025, acordado entre Parlamento e Conselho em 7 de maio de 2026 e **em vigor desde 27 de julho de 2026**: ele adiou as obrigações de alto risco de agosto de 2026 para **2 de dezembro de 2027** (sistemas autônomos do Anexo III) e **2 de agosto de 2028** (IA embarcada em produtos já regulados), abrandou o dever de literacia do [art. 4.º](#art-4) e simplificou documentação e registros. Mas seria erro lê-lo só como afrouxamento: ele **acrescentou duas novas proibições** ao [art. 5.º](#art-5) — a geração de imagens íntimas não consentidas ("_nudifiers_") e de material de abuso sexual infantil — e, sobretudo, deu ao Serviço para a IA da Comissão **competência exclusiva** sobre parte relevante do mercado, com um aparato de investigação e sanção que ele não tinha ([arts. 75.º-A a 75.º-D](#art-75-a)). O saldo não é de alívio, e sim de **redistribuição**: menos ônus documental sobre os operadores, mais poder concentrado no nível da União.

O resultado é um regulamento em vigor há dois anos cujo núcleo mais oneroso ainda não se aplica. O que já vale desde 2 de fevereiro de 2025 são as proibições do [art. 5.º](#art-5) e o dever de literacia em IA do [art. 4.º](#art-4) — este último em versão abrandada desde 27 de julho de 2026; desde 2 de agosto de 2025, as obrigações dos modelos de finalidade geral, a governança e o regime sancionatório; e, desde **2 de agosto de 2026**, a aplicação geral do regulamento e os deveres de transparência do [art. 50.º](#art-50) — inclusive a identificação de conteúdo sintético, que é a face do AI Act com que o público em geral efetivamente esbarra.

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
- **Identificação biométrica à distância em tempo real** (32 a 39) — o bloco mais extenso: descreve a intrusão, o efeito inibidor sobre liberdades e o desenho das exceções, da autorização prévia e do registro. Os considerandos 40 e 41 registram que **a Irlanda** e **a Dinamarca** não ficam vinculadas a parte dessas regras, por força dos Protocolos n.º 21 e n.º 22 aos Tratados. Cuidado com o título do primeiro: ele ainda se chama "Protocolo relativo à posição do Reino Unido e da Irlanda", herança anterior ao Brexit — o Reino Unido não é Estado-Membro e não tem posição a registrar aqui.
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

O regulamento alterador tem 47 considerandos próprios, também no painel. Cuidado com a numeração: **cada ato tem os seus**, e o considerando 40 do Omnibus nada tem a ver com o considerando 40 do AI Act (que trata da não vinculação da Irlanda). Os que sustentam as mudanças de maior efeito:

- **40** — a justificação do adiamento: o atraso na disponibilidade de normas, especificações comuns e orientações e na instituição das autoridades nacionais competentes compromete o início efetivo da aplicação e ameaça elevar consideravelmente os custos, "de tal modo que a manutenção da sua data inicial de aplicação, a saber, 2 de agosto de 2026, deixe de se justificar".
- **7** — o princípio que reorganiza o conceito de componente de segurança: estar integrado num produto regulado não significa, por si só, cumprir função de segurança.
- **8** — por que o dever de literacia foi abrandado: obrigações estritas de resultado não serviriam a todo tipo de prestador e oneram desproporcionalmente as empresas menores.
- **9** — por que a base jurídica para tratar categorias especiais de dados saiu do Capítulo III e foi para o Capítulo I: permitir que os prestadores façam a detecção de enviesamentos **em preparação** para o cumprimento, sem esperar 2027 ou 2028. E a advertência que dele decorre: o art. 4.º-A é **especificação de interesse público relevante**, e não base jurídica autônoma e autossuficiente.
- **11 a 16** — o desenho das novas proibições: a caracterização do material íntimo não consentido como violência sexual, sobretudo contra mulheres (11); o recorte fino de prestador e responsável pela implantação e o catálogo de salvaguardas técnicas (12); a defesa de atuação "com direito" para o material de abuso infantil (13); a fundamentação da restrição à liberdade de expressão e de empresa (14); o _ne bis in idem_ com o direito penal nacional (15); e a ressalva das vias de reparação já existentes (16).
- **22** — por que o registro dos sistemas autoexcluídos do alto risco foi mantido, e apenas simplificado: é "essencial para uma supervisão eficaz do mercado e para a responsabilização pública".
- **31 e 32** — por que a competência exclusiva do Serviço para a IA se estende à mesma empresa, e por que a Comissão recebe poderes de autoridade de fiscalização sobre sistemas integrados em plataformas e motores de pesquisa de muito grande dimensão: o sistema de supervisão que o DSA já instituiu.
- **33** — o desenho dos poderes gerais e das disposições que os especificam e limitam: o Serviço para a IA não pode contornar os limites de um poder específico invocando um poder geral correlato.
- **17, 18 e 21** — pedido único e procedimento unificado de designação de organismos notificados; o período de transição para os organismos setoriais; e o pedido às organizações europeias de normalização de produtos de normalização que sirvam ao mesmo tempo ao AI Act e à legislação setorial.
- **39** — o alcance do período de graça do art. 111.º, n.º 2, que opera por **tipo e modelo** de sistema.
- **41** — a razão da retirada de poderes de execução da Comissão: os códigos de práticas têm efeito jurídico limitado e **não conferem presunção de conformidade**.
- **42** — a transferência do Regulamento Máquinas da seção A para a seção B do Anexo I, adotando abordagem setorial para as máquinas baseadas em IA.
- **46** — a razão da entrada em vigor no terceiro dia, e não no vigésimo: assegurar segurança jurídica sem demora, diante da aplicação geral iminente em 2 de agosto de 2026.
- **47** — o registro da consulta ao Comitê Europeu para a Proteção de Dados e à Autoridade Europeia para a Proteção de Dados, que emitiram parecer conjunto em 20 de janeiro de 2026.

## Fundamentos

### Objeto e objetivos ([art. 1.º](#art-1))

O regulamento declara um objetivo duplo, e a tensão entre as duas metades explica boa parte de suas soluções de compromisso: **melhorar o funcionamento do mercado interno** e **promover a adoção de uma IA centrada no ser humano e de confiança**, assegurando ao mesmo tempo um elevado nível de proteção da saúde, da segurança e dos direitos fundamentais consagrados na Carta — incluindo a democracia, o Estado de direito e a proteção ambiental — e apoiando a inovação.

Não é retórica de preâmbulo: é a base jurídica. Por ser fundado no art. 114 do TFUE (mercado interno), o AI Act precisa ser, antes de tudo, uma norma de **harmonização** — e é isso que impede os Estados-Membros de acrescentarem requisitos nacionais divergentes no campo já ocupado por ele (ver "Quem pode o quê", abaixo).

### Uma norma de produto, não de conduta

O AI Act se organiza como a legislação europeia de **segurança de produtos**, não como uma lei de direitos ao estilo do RGPD ou da [LGPD](/notas/lgpd). Daí seu vocabulário: colocação no mercado, colocação em serviço, avaliação da conformidade, marcação CE, organismos notificados, vigilância do mercado, normas harmonizadas. A consequência prática é que o eixo do cumprimento está **antes** da chegada ao mercado — documentação técnica, gestão de risco, qualidade dos dados, supervisão humana —, e não apenas na reparação posterior do dano.

É também por isso que os direitos individuais ocupam três artigos, no penúltimo capítulo (arts. [85.º](#art-85) a [87.º](#art-87)) — e é um dos pontos em que o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) tomou caminho diferente.

### O dever transversal de literacia em IA ([art. 4.º](#art-4))

É o único dever que alcança **todo prestador e todo responsável pela implantação**, independentemente do grau de risco do sistema — e, por isso, o dispositivo do AI Act que mais gente tem de conhecer. Vale desde 2 de fevereiro de 2025.

**Digital Omnibus**: o art. 4.º foi **inteiramente substituído**. Antes, prestadores e responsáveis pela implantação deviam "assegurar um nível suficiente de literacia em IA" do seu pessoal; agora devem **tomar medidas para apoiar o desenvolvimento** dessa literacia, e o texto acrescenta a frase que fecha a discussão: a obrigação "não exige que os prestadores ou os responsáveis pela implantação garantam um nível específico de literacia em IA de qualquer pessoa". Saiu-se de uma obrigação de **resultado** para uma de **meio**. O considerando 8 justifica a mudança pelo ônus desproporcional sobre empresas menores. Dois números novos completam o desenho: a Comissão e os Estados-Membros passam a ter dever de apoiar esse esforço, publicando exemplos práticos na plataforma única de informação do [art. 62.º, n.º 3, alínea b)](#art-62-p3-b), e o Comitê deve adotar recomendações com objetivos comuns.

Um detalhe de direito intertemporal que vale registrar: por cerca de dezoito meses os operadores estiveram sujeitos a uma regra **mais rígida** do que a hoje vigente. Como o art. 4.º nunca teve sanção própria, o abrandamento pesa mais sobre o ônus documental do que sobre a exposição sancionatória.

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

Há ainda uma **dispensa parcial para software livre**, e convém não a esticar: ela alcança **sistemas** de IA disponibilizados sob licença **livre e de código aberto**, que ficam fora do regulamento salvo quando forem colocados no mercado como sistemas de alto risco, incorrerem numa prática proibida do [art. 5.º](#art-5) ou estiverem sujeitos à transparência do [art. 50.º](#art-50). **Modelos** de finalidade geral abertos não entram nessa dispensa: têm regime próprio e mais estreito no [art. 53.º, n.º 2](#art-53-p2) (ver "Inovação", abaixo).

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

- **Sistema de IA**: sistema baseado em máquinas concebido para funcionar com **níveis de autonomia variáveis**, que pode revelar **capacidade de adaptação** após a implantação e que, com base nos dados de entrada que recebe, **infere** como gerar resultados — previsões, conteúdos, recomendações ou decisões — capazes de influenciar ambientes físicos ou virtuais. A palavra decisiva é **inferir**: é ela que separa um sistema de IA de um software determinístico de regras, e a Comissão dedicou [orientações próprias](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application) ao ponto.
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

**Digital Omnibus**: acrescentadas **duas novas proibições** — as alíneas b-A) e b-B) do n.º 1 —, aplicáveis a partir de **2 de dezembro de 2026**:

- **imagens íntimas não consentidas** — colocar no mercado, colocar em serviço ou utilizar sistema que gere ou manipule imagens, vídeos, áudio ou material semelhante **realistas** das partes íntimas de pessoa identificável, ou dessa pessoa em atividade sexualmente explícita, sem consentimento "livre, específico, informado, inequívoco e **explícito**" (padrão que aperta o do RGPD, acrescentando o "explícito"). São as aplicações conhecidas como _nudifiers_;
- **material de abuso sexual infantil**, na definição da [Diretiva 2011/93/UE](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32011L0093), salvo quando o direito nacional reconheça uma defesa de atuação "com direito" — o caso, segundo o considerando 13, da geração legítima por autoridades em investigação criminal e do uso em _red-teaming_ destinado a testar o cumprimento da própria proibição.

O ponto mais fino está no novo [n.º 1-A](#art-5-p1a), que **trata prestador e responsável pela implantação de forma diferente**:

- para o **prestador**, a colocação no mercado só é proibida em duas hipóteses: (i) gerar ou manipular esse material é a **finalidade prevista** do sistema; ou (ii) o desenho, o treino, a arquitetura, as capacidades ou as funcionalidades expostas ao utilizador tornam esse resultado **razoavelmente previsível e reproduzível sem modificação técnica significativa**, *e* o sistema não dispõe de medidas de segurança e salvaguardas razoáveis e adequadas para o impedir de forma fiável e corrigir o uso indevido observado ou comunicado;
- para o **responsável pela implantação**, o uso só é proibido quando ele usa o sistema **com a finalidade** de gerar esse material. O considerando 12 é expresso: usar para fins lícitos um sistema mal salvaguardado não incorre na proibição, nem a geração acidental.

Ou seja: a alínea (ii) transforma a ausência de salvaguardas técnicas num **pressuposto de licitude da colocação no mercado**. O considerando 12 lista o que pode satisfazer esse padrão — limpeza de dados, treino de recusa, controlo de _prompts_ e de resultados, classificação e filtragem de conteúdo, restrições de uso, deteção de abuso e mecanismos de notificação e ação. Deixou de ser boa prática de engenharia para virar critério de conformidade.

O novo [n.º 1-B](#art-5-p1b) recorta a borda: manipular material preexistente **sem aumentar a exposição** das partes íntimas nem alterar a natureza da atividade sexual retratada não é "manipulação" para esse efeito — mudar fundo, ajustar brilho ou acrescentar legenda fica de fora.

> _Exemplo._ O **Retrato** é um gerador de imagens de uso geral, sem qualquer finalidade erótica declarada. Se, com _prompts_ triviais e sem alteração de código, ele produzir nus realistas de pessoas identificáveis, e a fornecedora não tiver filtros nem mecanismo de correção de abusos reportados, ela incorre na proibição a partir de 2 de dezembro de 2026 — ainda que jamais tenha pretendido esse uso. Já a agência que usa o Retrato para gerar imagens de produtos não incorre em nada, mesmo sabendo que o sistema é mal salvaguardado. O dever de blindar é de quem coloca no mercado; o de não usar para aquele fim é de quem implanta.

É o movimento em sentido contrário ao do resto do pacote: enquanto adia deveres de conformidade, o Omnibus **amplia** o rol fechado do art. 5.º. Note-se a janela: entre 27 de julho e 2 de dezembro de 2026 as proibições ainda não se aplicam — o legislador deu quatro meses para os prestadores implantarem as medidas técnicas de que a licitude passa a depender. Nesse intervalo continuam a operar o direito penal nacional, a Diretiva 2011/93/UE e a [Diretiva (UE) 2024/1385](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024L1385) sobre violência contra as mulheres, expressamente ressalvados pelo considerando 16.

No Brasil, a mesma preocupação foi endereçada por outra via — o dever de remoção e comunicação do [art. 27 do ECA Digital](/notas/eca-digital#art-27) e a vedação de monetização do [art. 23](/notas/eca-digital#art-23).

### Alto risco ([arts. 6.º](#art-6) e [7.º](#art-7))

Duas portas de entrada:

- **[Art. 6.º, n.º 1](#art-6-p1) — IA embarcada em produto regulado.** O sistema é componente de segurança de um produto (ou é ele próprio o produto) abrangido pela legislação de harmonização listada no **Anexo I** — dispositivos médicos, brinquedos, elevadores, máquinas, veículos, aeronáutica — **e** esse produto está sujeito a avaliação de conformidade por terceiros.
    - O Anexo I tem **duas seções, e a diferença entre elas decide quanto do AI Act se aplica**. Na **Seção A** estão os atos do chamado Novo Quadro Legislativo (dispositivos médicos, brinquedos, elevadores, equipamentos de proteção individual): aqui o sistema é de alto risco e responde pela lista inteira dos [arts. 8.º a 15.º](#art-8), avaliada dentro do procedimento setorial. Na **Seção B** estão os setores com regime próprio e maduro (aviação civil, veículos a motor, ferrovias): o [art. 2.º, n.º 2](#art-2-p2) manda aplicar-lhes **apenas** o art. 6.º, n.º 1, o novo art. 60.º-A e os arts. 102.º a 112.º — os requisitos substantivos migram para a legislação do setor. Estar na Seção B é, na prática, sair do regime de alto risco do AI Act.
    - **Digital Omnibus**: foi exatamente esse o efeito de mover o **Regulamento Máquinas** da Seção A para a Seção B. Dispositivos médicos e brinquedos **permaneceram** na Seção A — a mudança ficou confinada ao setor de máquinas (ver "O Digital Omnibus", abaixo).
- **[Art. 6.º, n.º 2](#art-6-p2) — os oito domínios do Anexo III**: biometria; infraestruturas críticas; educação e formação profissional; emprego, gestão de trabalhadores e acesso ao trabalho independente; acesso a serviços privados essenciais e a serviços e prestações públicos essenciais (inclusive avaliação de crédito e tarifação de seguros de vida e saúde); aplicação da lei; migração, asilo e controlo de fronteiras; administração da justiça e processos democráticos.

**Digital Omnibus**: a primeira porta foi estreitada por dois lados.

- O conceito de **componente de segurança** ([art. 3.º, ponto 14](#art-3)) foi redefinido em torno da ideia de **função de segurança**, entendida como uma finalidade prevista determinada pelo prestador: o componente cumpre função de segurança quando se destina a prevenir ou atenuar riscos à saúde e à segurança de pessoas ou bens. Os novos n.os 1-A a 1-C do [art. 6.º](#art-6) explicitam o resto: IA usada apenas para assistência ao utilizador, otimização de desempenho, eficiência do serviço, automação, conforto ou controlo de qualidade **não** é componente de segurança (n.º 1-A) — salvo se a sua falha puser em perigo a saúde e a segurança (n.º 1-B); e a avaliação por terceiros exigida apenas por riscos alheios à saúde e à segurança, como interferência eletromagnética ou distribuição de espectro de radiofrequências, **não** satisfaz a condição do n.º 1, alínea b) (n.º 1-C). O considerando 7 fixa o princípio: estar integrado num produto regulado não significa, por si só, cumprir função de segurança.
- Uma **cláusula de equivalência** entrou no [art. 2.º, n.º 13](#art-2-p13): quando a legislação do Anexo I, Seção A, já impuser requisitos de proteção **equivalente ou superior**, a aplicação de requisitos específicos dos [arts. 9.º a 15.º](#art-9) e [17.º a 25.º](#art-17) pode ser **limitada**, desde que não se reduza o nível global de proteção. Atenção ao efeito prático: a cláusula **ainda não produz efeito nenhum**. Ela depende de atos delegados que a Comissão deve adotar até **2 de agosto de 2027**, identificando quais sistemas, quais requisitos e em que medida. Até lá, tudo continua exigível.

A **derrogação do [art. 6.º, n.º 3](#art-6-p3)** é a porta de saída do alto risco, e depende de autoavaliação do próprio prestador: um sistema listado no Anexo III **não** é de alto risco se não representar risco significativo, por executar apenas tarefa processual restrita, melhorar o resultado de atividade humana já concluída, detectar padrões decisórios sem substituir nem influenciar a avaliação humana, ou realizar tarefa meramente preparatória. A ressalva que fecha a porta: será **sempre** de alto risco o sistema que realize **definição de perfis** de pessoas singulares. Quem invoca a derrogação deve documentar a avaliação e registrá-la.

**Digital Omnibus**: a Comissão havia proposto **eliminar** o registro dos sistemas autoexcluídos pelo n.º 3; o texto final manteve o registro e apenas **enxugou dois campos** do Anexo VIII, Seção B (pontos 7 e 9). O **considerando 22** do Omnibus registra a razão: é "essencial para uma supervisão eficaz do mercado e para a responsabilização pública que esses sistemas de IA sejam registados na base de dados da UE", cabendo simplificar os requisitos, não suprimi-los.

O [art. 7.º](#art-7) autoriza a Comissão a **alterar o Anexo III por ato delegado**, acrescentando ou modificando domínios segundo critérios de risco fixados na própria norma — a válvula de atualização do regulamento sem reabrir o processo legislativo.

### Risco de transparência ([art. 50.º](#art-50))

Nem proibido nem de alto risco, mas capaz de enganar: sistemas que interagem com pessoas, que geram conteúdo sintético, que reconhecem emoções ou que produzem ultrafalsificações. O dever aqui não é de conformidade prévia, e sim de **informar** — tratado em seção própria, abaixo.

### Risco mínimo

Todo o resto: filtros de _spam_, IA de videojogos, recomendação de catálogo. Sem obrigações, salvo o dever transversal de **literacia em IA** do [art. 4.º](#art-4) — hoje em versão abrandada pelo Omnibus, como visto acima — e a possibilidade de adesão voluntária aos códigos de conduta do [art. 95.º](#art-95).

## Deveres e vedações essenciais

O que o regulamento veda, reunido numa lista só — cada item é o reverso de um dever detalhado adiante. **É proibido:**

- **Colocar no mercado, colocar em serviço ou utilizar** sistema que incorra em qualquer prática do [art. 5.º](#art-5) — o único degrau cujo descumprimento leva ao teto sancionatório de 7% do volume de negócios ([art. 99.º](#art-99)).
- **Colocar no mercado sistema de alto risco** sem sistema de gestão de riscos, governação de dados, documentação técnica, registro automático de eventos, transparência ao responsável pela implantação, supervisão humana e níveis adequados de exatidão, robustez e cibersegurança ([arts. 8.º a 15.º](#art-8)).
- **Afixar a marcação CE** sem avaliação da conformidade concluída e declaração UE de conformidade emitida ([arts. 43.º](#art-43), [47.º](#art-47) e [48.º](#art-48)).
- **Invocar a derrogação** do [art. 6.º, n.º 3](#art-6-p3) sem documentar a avaliação antes de colocar o sistema no mercado — e invocá-la em qualquer caso quando o sistema executar **definição de perfis** de pessoas singulares.
    - _Exemplo._ A **Peneira** é um programa de recrutamento vendido a redes de varejo. Na primeira versão, ele só lê currículos em PDF, extrai nome, formação e experiência para uma planilha e ordena tudo por data de envio — quem decide é o RH. A fornecedora conclui que isso é "tarefa processual restrita" e que o sistema não é de alto risco. Pode estar certa; mas ela não escreve essa avaliação em lugar nenhum e não faz o registro na base de dados da UE. Só por isso já descumpre o [art. 6.º, n.º 4](#art-6-p4): a derrogação não é automática, é uma conclusão que precisa estar documentada **antes** e ficar disponível para a autoridade que a peça.
    - Na versão seguinte, a Peneira passa a dar a cada candidato uma nota de "aderência à vaga", calculada a partir do histórico de contratações da rede. Agora ela traça perfis de pessoas. Aqui não há avaliação que salve: o [art. 6.º, n.º 3](#art-6-p3) diz que sistemas do Anexo III que fazem definição de perfis são **sempre** de risco elevado. A Peneira passa a dever a lista inteira dos [arts. 8.º a 15.º](#art-8), e a derrogação deixa de estar disponível.
- **Implantar sistema de alto risco fora da finalidade prevista** pelo prestador, ou sem atribuir a supervisão humana a pessoas com competência, formação e autoridade para exercê-la ([art. 26.º](#art-26)).
    - _Exemplo._ O **Vigia** é vendido a transportadoras com uma finalidade escrita nas instruções de utilização: detectar sinais de sonolência ao volante e alertar o próprio motorista. Uma transportadora resolve aproveitar os alertas acumulados para montar um ranking mensal de motoristas e decidir quem recebe as melhores rotas. Dois problemas de uma vez: ela usa o sistema fora da finalidade prevista, contra o [art. 26.º](#art-26); e, ao transformar um sistema de segurança num sistema de **gestão de trabalhadores**, ela mesma vira **prestadora** para efeitos do regulamento ([art. 25.º, n.º 1, alínea c)](#art-25-p1-c)) — assumindo as obrigações do [art. 16.º](#art-16) sobre um produto que não desenvolveu.
- **Deixar de informar previamente os trabalhadores e seus representantes** antes de colocar em serviço, no local de trabalho, sistema de alto risco que os afete ([art. 26.º](#art-26)).
- **Deixar de informar a pessoa afetada** quando um sistema de alto risco do Anexo III for usado para tomar, ou apoiar, decisão que a atinja ([art. 26.º](#art-26)).
- **Omitir a avaliação de impacto sobre os direitos fundamentais** quando o responsável pela implantação for organismo de direito público, entidade privada que preste serviços públicos, ou implantar sistemas de avaliação de crédito e de tarifação de seguros de vida e saúde ([art. 27.º](#art-27)).
    - _Exemplo._ Duas empresas privadas compram o mesmo sistema de triagem de atendimento. A **Fila Certa** usa o sistema para ordenar o próprio call center comercial: nenhuma avaliação de impacto é exigida dela. A **Praça Aberta** opera, por concessão, o agendamento de consultas da rede pública de saúde de um município — presta serviço público, e por isso deve fazer a avaliação **antes da primeira utilização**, descrevendo processos, período e frequência de uso, quem pode ser afetado, os riscos concretos, as medidas de supervisão humana e o que fará se o risco se materializar. O gatilho não é o porte nem a natureza da empresa: é a **função** que ela exerce. Um banco cai na mesma obrigação, sem prestar serviço público nenhum, por implantar avaliação de crédito.
- **Disponibilizar sistema** que interaja com pessoas, gere conteúdo sintético ou produza ultrafalsificação **sem a informação e a marcação** do [art. 50.º](#art-50).
- **Colocar no mercado modelo de finalidade geral** sem documentação técnica, informação a jusante, política de respeito ao direito de autor e sumário público do conteúdo usado no treino ([art. 53.º](#art-53)).
- **Deixar de notificar a Comissão** ao atingir os limiares de risco sistêmico, e de avaliar, mitigar, comunicar incidentes graves e assegurar cibersegurança adequada no caso desses modelos ([arts. 52.º](#art-52) e [55.º](#art-55)).
    - _Exemplo._ O laboratório **Aurora** treina um modelo de linguagem e, no meio do treino, percebe que vai ultrapassar o limiar de computação que presume risco sistêmico. O prazo já começou: o [art. 52.º](#art-52) exige notificar a Comissão sem demora e, em qualquer caso, **em até duas semanas** contadas do momento em que o requisito foi preenchido **ou em que se soube que seria** — não da data de lançamento do modelo. Se a Aurora achar que, apesar do tamanho, o modelo não apresenta risco sistêmico, o caminho não é ficar calada: é notificar mesmo assim e apresentar, junto, os argumentos fundamentados que o [art. 52.º, n.º 2](#art-52-p2) admite. Silêncio não é defesa — a Comissão pode designar o modelo por conta própria.
- **Deixar de comunicar incidentes graves** à autoridade de fiscalização do mercado, e de adotar medidas corretivas e informar a cadeia quando o sistema deixar de estar conforme ([arts. 20.º](#art-20) e [73.º](#art-73)).
- **Obstruir a fiscalização** ou prestar informação incorreta, incompleta ou enganosa a organismos notificados e autoridades competentes — infração com teto próprio ([art. 99.º](#art-99)).

Uma vedação vai na direção contrária, e é dirigida ao **regulador**: os ambientes de testagem da regulamentação não podem afastar a supervisão quanto a riscos para a saúde, a segurança e os direitos fundamentais, e a participação neles **não exime** de responsabilidade por danos causados a terceiros ([art. 57.º](#art-57)).

Os nomes usados nos exemplos são fictícios, e as situações, construídas para ilustrar o dispositivo citado.

## Requisitos dos sistemas de alto risco ([arts. 8.º a 15.º](#art-8))

Sete requisitos, cumulativos e verificados ao longo de todo o ciclo de vida:

- **Gestão de riscos** ([art. 9.º](#art-9)) — processo iterativo e contínuo de identificação, estimativa e mitigação dos riscos previsíveis para a saúde, a segurança e os direitos fundamentais, incluindo os decorrentes de utilização indevida razoavelmente previsível, com atenção específica a crianças e a grupos vulneráveis.
- **Dados e governação de dados** ([art. 10.º](#art-10)) — conjuntos de treino, validação e teste pertinentes, suficientemente representativos, tão isentos de erros quanto possível e completos para a finalidade prevista, com exame de possíveis enviesamentos e consideração do contexto geográfico e comportamental de uso.
    - **Digital Omnibus**: o [n.º 5 deste artigo](#original-art-10-p5) foi **revogado** — o link vai ao texto original, porque no consolidado ele já não existe — e seu conteúdo virou um artigo próprio e bem mais detalhado, o novo [art. 4.º-A](#art-4-a), "Tratamento de categorias especiais de dados pessoais para deteção e correção de enviesamentos". O tratamento excecional dessas categorias passa a depender de **seis condições cumulativas**: impossibilidade de obter o resultado com dados sintéticos ou anonimizados; limitações técnicas de reutilização e pseudonimização; controlo rigoroso e documentado de acesso; proibição de transmissão a terceiros; eliminação assim que corrigido o enviesamento; e registro das razões nas atividades de tratamento. Um segundo número estende a faculdade — sem criar dever, e o texto diz isso expressamente — aos prestadores e responsáveis pela implantação de **outros** sistemas e modelos, inclusive os que não são de alto risco, e aos responsáveis pela implantação de sistemas de alto risco. A Comissão propusera rebaixar o critério de "estritamente necessário" para simples "necessário"; os colegisladores restabeleceram a estrita necessidade. Duas consequências de método: o art. 4.º-A **não é base jurídica autônoma**, e sim especificação de interesse público relevante à luz do [art. 9.º, n.º 2, alínea g), do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679) (considerando 9); e, por estar no Capítulo I, **não segue o adiamento** do Capítulo III — vale desde 27 de julho de 2026, justamente para permitir que os prestadores se preparem antes de 2027 ou 2028. O que ele não faz é legitimar tratamento anterior à sua entrada em vigor: o art. 10.º, n.º 5, revogado nunca chegou a produzir efeitos, de modo que, até aqui, o AI Act nunca ofereceu base jurídica para esse tratamento — o que houve antes se avalia só pelo RGPD. Resolve um impasse real do desenho original (exigir prova de ausência de discriminação racial ou de gênero sem permitir tratar os dados que a revelariam), e é o mesmo dilema que a [LGPD](/notas/lgpd#art-11) enfrenta no seu [art. 11](/notas/lgpd#art-11), sem solução equivalente. O texto está no [art. 1.º do Omnibus](#omnibus-art-1), item 6.
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
    - **Digital Omnibus**: acrescentou o outro lado da moeda. O prestador inicial, que deixa de ser prestador daquele sistema, passa a dever **cooperar estreitamente** com o novo prestador — disponibilizando documentação técnica suficiente, informando **limitações e modos de falha conhecidos** e concedendo acesso técnico direcionado, inclusive para teste e validação. Há uma saída: o dever não se aplica quando o prestador inicial tiver **especificado claramente** que o seu sistema não deve ser convertido em sistema de alto risco. É uma cláusula que muda contratos de fornecimento de IA — vale a pena olhar para ela como quem redige minuta.
- **Avaliação de impacto sobre os direitos fundamentais** ([art. 27.º](#art-27)) — devida antes da primeira utilização por organismos de direito público, por entidades privadas que prestem serviços públicos e por quem implante sistemas de avaliação de crédito ou de tarifação de seguros de vida e saúde. Deve descrever processos, período e frequência de uso, categorias de pessoas afetadas, riscos específicos de danos, medidas de supervisão humana e providências em caso de materialização do risco; o resultado é notificado à autoridade de fiscalização do mercado.
    - **Digital Omnibus**: articulou-a com a **avaliação de impacto sobre a proteção de dados** do [art. 35 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679). O novo n.º 4 permite que a avaliação de direitos fundamentais **remeta a seções** da avaliação de proteção de dados já feita, ou incorpore partes dela; e o n.º 5 encarrega o Serviço para a IA de desenvolver um **modelo de questionário, inclusive por ferramenta automatizada**, que viabilize essas remissões na prática. É o ponto do Omnibus com paralelo brasileiro mais direto: é a mesma pergunta sobre como articular o relatório de impacto à proteção de dados pessoais do [art. 38 da LGPD](/notas/lgpd#art-38) com a avaliação de impacto algorítmico que o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) prevê.

## Avaliação da conformidade, marcação CE e registro ([arts. 40.º a 49.º](#art-40))

O caminho normal do alto risco é a **autoavaliação** com base em **normas harmonizadas** europeias: quem segue uma norma harmonizada cuja referência foi publicada no JOUE goza de **presunção de conformidade** ([art. 40.º](#art-40)). Na falta delas, a Comissão pode adotar **especificações comuns** por ato de execução ([art. 41.º](#art-41)).

A intervenção de **organismo notificado** é exceção — reservada, em regra, a sistemas biométricos sem norma harmonizada aplicável e aos casos em que a legislação setorial do Anexo I já a exige. Concluída a avaliação, o prestador emite a **declaração UE de conformidade** ([art. 47.º](#art-47)), afixa a **marcação CE** ([art. 48.º](#art-48)) e registra o sistema na **base de dados da UE** ([arts. 49.º](#art-49) e [71.º](#art-71)), pública na parte que não seja confidencial.

O gargalo que motivou o Digital Omnibus está exatamente aqui: sem normas harmonizadas publicadas e sem organismos notificados designados em número suficiente, a obrigação de agosto de 2026 seria, para muitos sistemas, impossível de cumprir por falta de instrumento — não por falta de disposição.

**Digital Omnibus**: além do adiamento, mexeu em cinco pontos desta engrenagem.

- **Normalização conjunta** ([art. 40.º, n.º 2](#art-40-p2)) — a Comissão deve solicitar aos organismos europeus de normalização, sem demora indevida, produtos de normalização que cubram **simultaneamente** o AI Act e a legislação setorial do Anexo I, evitando que o mesmo produto tenha de satisfazer dois conjuntos paralelos de normas.
- **Documentação técnica simplificada** ([art. 11.º, n.º 1](#art-11-p1)) — PME, inclusive empresas em fase de arranque, e pequenas empresas de média capitalização podem apresentar os elementos do Anexo IV de forma simplificada, em formulário que a Comissão deve criar e que os **organismos notificados são obrigados a aceitar**.
- **Sistema de gestão da qualidade proporcional ao porte** ([art. 17.º, n.º 2](#art-17-p2)) — sem redução do grau de rigor exigido para a conformidade.
- **Cibersegurança** ([art. 42.º, n.º 3](#art-42-p3)) — sistemas de alto risco abrangidos pelo [Regulamento (UE) 2024/2847 (_Cyber Resilience Act_)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024R2847) que satisfaçam as condições do seu art. 12.º, n.º 1, passam a ser **considerados conformes** com os requisitos de cibersegurança do [art. 15.º](#art-15). Não é regra nova: o considerando 19 explica que se trata de tornar visível, dentro do AI Act, o que o outro regulamento já dizia.
- **Organismos notificados** ([arts. 28.º](#art-28) e [43.º](#art-43)) — pedido único e procedimento unificado de designação para quem já é notificado sob a legislação do Anexo I, Seção A; quem se designa uma vez vale para todos os atos da Seção A que o abranjam. Esses organismos podem avaliar sistemas de alto risco desde já, mas devem pedir designação sob o AI Act **até 28 de janeiro de 2028**. E ficou expresso o que gerava confusão: classificar um produto como sistema de alto risco pelo art. 6.º, n.º 1, **não** obriga a avaliação por terceiro se a legislação setorial não a exigia — o fabricante mantém a opção de recorrer a normas harmonizadas, desde que estas cubram também os requisitos da Seção 2.

## Modelos de IA de finalidade geral ([arts. 51.º a 56.º](#art-51))

Camada acrescentada tardiamente à negociação, sob o impacto dos modelos generativos de grande escala. Ela não segue a pirâmide de risco: incide sobre o **modelo**, e não sobre o uso.

- **Obrigações de todos os prestadores de modelos de finalidade geral** ([art. 53.º](#art-53)): elaborar e manter documentação técnica do modelo; disponibilizar informação e documentação aos prestadores a jusante que integrem o modelo em seus sistemas; instituir **política de cumprimento do direito de autor**, inclusive quanto à reserva de direitos na prospeção de textos e dados; e publicar um **sumário suficientemente pormenorizado do conteúdo utilizado no treino**, segundo [modelo divulgado pela Comissão](https://digital-strategy.ec.europa.eu/en/library/explanatory-notice-and-template-public-summary-training-content-general-purpose-ai-models).
    - Prestadores estabelecidos fora da União devem designar **mandatário** ([art. 54.º](#art-54)).
    - Modelos disponibilizados sob **licença livre e de código aberto**, com parâmetros e arquitetura publicamente acessíveis, ficam dispensados da documentação técnica e da informação a jusante — mas **não** da política de direito de autor nem do sumário de treino, e a dispensa **não vale** para modelos com risco sistêmico.
- **Risco sistêmico** ([art. 51.º](#art-51)): presume-se quando a quantidade cumulativa de computação usada no treino, medida em operações de vírgula flutuante (FLOP), ultrapassa **10²⁵ FLOP** — um número, não um conceito, e por isso mesmo alterável por ato delegado da Comissão à medida que o estado da arte avança (o considerando 111 diz isso com todas as letras); a Comissão também pode designar um modelo por decisão, com base em critérios do Anexo XIII. Atingido o limiar, o prestador **notifica a Comissão** ([art. 52.º](#art-52)) e pode argumentar, com fundamento, que o modelo não apresenta risco sistêmico.
- **Obrigações adicionais dos modelos com risco sistêmico** ([art. 55.º](#art-55)): avaliação do modelo segundo protocolos normalizados, incluindo **testes contraditórios** (_adversarial testing_); avaliação e atenuação dos riscos sistêmicos a nível da União; **comunicação de incidentes graves** ao Serviço para a IA e, quando cabível, às autoridades nacionais; e nível adequado de cibersegurança do modelo e de sua infraestrutura física.
- **Códigos de práticas** ([art. 56.º](#art-56)): o [Código de Práticas para a IA de finalidade geral](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai), publicado em julho de 2025, é o instrumento pelo qual os prestadores podem **demonstrar** o cumprimento. Aderir é voluntário; não aderir obriga a demonstrar conformidade por meios alternativos adequados — desenho que produz adesão sem imposição formal.
    - **Digital Omnibus**: o considerando 41 assenta um ponto que costumava gerar confusão — os códigos de práticas têm **efeito jurídico limitado e não conferem presunção de conformidade**, ao contrário das normas harmonizadas. Daí a Comissão ter perdido o poder de **aprová-los** por ato de execução (arts. [50.º, n.º 7](#art-50-p7) e [56.º, n.º 6](#art-56-p6)): o que sobra é avaliar se são adequados e, se os considerar inadequados, adotar regras comuns por ato de execução. De competência ordinária, passou a competência **subsidiária e condicionada**.

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

### O art. 50.º visto do Brasil: o Radar Tecnológico nº 6

O [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (ANPD, 2026) dedica um capítulo à comparação de regimes e cita o [art. 50.º](#art-50) como o exemplo do padrão que chama de **transparência** — dever de marcar e divulgar conteúdo sintético, independentemente do contexto de uso. O documento é didático e não firma posicionamento institucional, mas é a leitura brasileira mais recente e mais detalhada desse artigo. Três contribuições dele valem o registro aqui.

**Os três padrões regulatórios em uso no mundo.** O Radar identifica que as leis vigentes sobre _deepfakes_ se distribuem em três modelos, frequentemente combinados: (i) **transparência**, obrigando a sinalização de conteúdo sintético — de que o art. 50.º é o caso mais amplo; (ii) **vedações eleitorais**, com proibições em janela temporal próxima ao pleito — a Coreia do Sul veda produção, edição, distribuição e publicação de vídeos _deepfake_ para campanha nos 90 dias anteriores à eleição, e o Brasil, pelas Resoluções nºs 23.732/2024 e 23.755/2026 do TSE, veda conteúdo sintético que substitua ou altere imagem ou voz de pessoa viva, falecida ou fictícia, exige rotulagem quando o uso é admitido e proíbe publicação, republicação e impulsionamento de novos conteúdos sintéticos com imagem, voz ou manifestação de candidato ou pessoa pública entre 72 horas antes e 24 horas depois do fim do pleito, **ainda que rotulados**; e (iii) **criminalização** de abusos, sobretudo sexuais — Coreia do Sul, Reino Unido, França, Austrália e o _Take It Down Act_ norte-americano de 2025.

O contraste com o AI Act é de arquitetura. O regulamento europeu escolheu o primeiro padrão e o fez **transversal**: qualquer conteúdo sintético, em qualquer contexto, deve ser marcado e detetável. O Brasil escolheu os outros dois, e de forma **setorial** — a regra eleitoral só vale em campanha; a criminal, só depois do dano; e não há tipo penal específico para _deepfake_, de modo que a conduta é enquadrada no art. 218-C do Código Penal ou, quando a vítima é mulher, no art. 147-B, com a agravante que a Lei nº 15.123/2025 acrescentou para o uso de inteligência artificial. É esse o vazio registrado acima, quando esta nota observa que não há, no Brasil, dever geral equivalente de identificação de conteúdo sintético.

**Cinco desafios que o Radar atribui à regulação de _deepfakes_**, e que ajudam a ler as ressalvas do próprio art. 50.º: **ambiguidade conceitual** (não há definição uniforme, o que dificulta delimitar o objeto); **defasagem regulatória** (a norma envelhece mais rápido do que se aprova); **equilíbrio entre direitos fundamentais** (conter o abuso sem sufocar expressão legítima — a ressalva do uso artístico, criativo, satírico ou ficcional do art. 50.º é exatamente isso); **identificação e responsabilização** (anonimato e natureza transfronteiriça); e **opacidade tecnológica** (a dificuldade de detectar, auditar e provar). O documento conclui que regulações centradas no **risco** e nos usos, e não na tecnologia empregada, tendem a envelhecer melhor — que é a escolha declarada do AI Act.

**A marcação é mais confiável do que a detecção.** O Radar analisou comparativamente três ferramentas comerciais de detecção de _deepfakes_ e registra que nenhuma identificou com segurança os casos testados, dando respostas incertas tanto para material sintético quanto para material original de baixa resolução ou produzido em ambiente controlado — daí a recomendação de combinar ferramenta e avaliação humana. Do outro lado, lista os mecanismos de **proveniência**: assinaturas criptográficas, marcas d'água visíveis e invisíveis e padrões de rastreabilidade como o [C2PA](https://c2pa.org/), que registram origem, autoria e histórico de edição. O dado explica a opção do legislador europeu: exigir marcação **na origem** ([art. 50.º, n.º 2](#art-50-p2)), por soluções interoperáveis e sólidas, é aposta em proveniência, não em detecção _a posteriori_ — porque a detecção, hoje, não entrega o que seria preciso.

## Direitos das pessoas afetadas

O AI Act não é uma lei de direitos individuais, e isso se nota na quantidade e na posição dos dispositivos. Ainda assim, há um núcleo:

- **Informação sobre o uso** ([art. 26.º](#art-26)) — quem for objeto de decisão tomada ou apoiada por sistema de alto risco do Anexo III deve ser informado disso pelo responsável pela implantação; trabalhadores e seus representantes devem ser informados **antes** do uso no local de trabalho.
- **Direito à explicação da decisão individual** ([art. 86.º](#art-86)) — quem for objeto de decisão tomada por responsável pela implantação com base nos resultados de sistema de alto risco do Anexo III, e que produza **efeitos jurídicos** ou a afete significativamente de modo adverso quanto à saúde, à segurança ou aos direitos fundamentais, tem direito a obter explicações **claras e pertinentes** sobre o papel do sistema no processo decisório e sobre os principais elementos da decisão. Aplica-se apenas aos usos do Anexo III que não estejam excluídos e sem prejuízo do [art. 22 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679).
- **Direito de apresentar queixa** ([art. 85.º](#art-85)) — qualquer pessoa com motivos para considerar que houve infração ao regulamento pode apresentar queixa à **autoridade de fiscalização do mercado** competente, que a tratará conforme seus procedimentos.
- **Denúncia protegida** ([art. 87.º](#art-87)) — as infrações ao regulamento entram no âmbito da [Diretiva (UE) 2019/1937](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L1937), com a proteção de denunciantes que ela assegura.
- **Ação coletiva** — o próprio AI Act, no [art. 110.º](#art-110), acrescentou-se ao Anexo I da [Diretiva (UE) 2020/1828](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32020L1828), a diretiva das **ações representativas**, permitindo tutela coletiva de consumidores por infrações ao regulamento.

Duas ausências, comparadas à [LGPD](/notas/lgpd) e ao [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), merecem registro: não há **direito de contestação** da decisão automatizada nem direito autônomo a **revisão humana** no AI Act — o [art. 20 da LGPD](/notas/lgpd#art-20) e o [art. 22 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679) continuam sendo a via para isso —, e o regulamento **não cria** um regime próprio de responsabilidade civil. A proposta de diretiva sobre responsabilidade em matéria de IA, que ocuparia essa lacuna, foi **retirada** pela Comissão em 2025, deixando a reparação de danos ao direito nacional dos Estados-Membros e ao regime geral de responsabilidade por produtos defeituosos.

## Inovação: ambientes de testagem, PME e software livre ([arts. 57.º a 63.º](#art-57))

- **Ambientes de testagem da regulamentação** (_regulatory sandboxes_, [art. 57.º](#art-57)) — cada Estado-Membro deve assegurar que sua autoridade competente crie **pelo menos um** ambiente nacional, **operacional até 2 de agosto de 2027** — prazo adiado em um ano pelo Digital Omnibus, que era originalmente 2 de agosto de 2026. Oferecem ambiente controlado de desenvolvimento, treino, teste e validação sob supervisão, com orientação da autoridade sobre expectativas regulatórias, e a participação **não afasta** a responsabilidade por danos a terceiros.
- **Tratamento ulterior de dados pessoais** ([art. 59.º](#art-59)) — dentro do ambiente de testagem, admite-se o tratamento de dados pessoais licitamente recolhidos para outras finalidades no desenvolvimento de sistemas de IA de **interesse público substancial**, sob condições estritas e cumulativas.
- **Ensaios em condições reais fora do ambiente de testagem** ([arts. 60.º](#art-60) e [61.º](#art-61)) — sujeitos a plano aprovado, prazo limitado, registro, supervisão e **consentimento informado** dos participantes.
- **Medidas para PME e empresas em fase de arranque** ([art. 62.º](#art-62)) — **acesso prioritário** aos ambientes de testagem, ações de sensibilização, canais dedicados de comunicação com as autoridades, participação no processo de normalização e taxas de avaliação da conformidade reduzidas proporcionalmente ao porte.
- **Derrogações simplificadoras** ([art. 63.º](#art-63)) — cumprimento simplificado de elementos do sistema de gestão da qualidade, sem redução do nível de proteção. **Digital Omnibus**: a faculdade era reservada às **microempresas** e passou a alcançar **todas as PME, inclusive empresas em fase de arranque**.
- **Software livre** ([art. 2.º](#art-2)) — a dispensa geral descrita em "Não aplicação e dispensas", acima, e o regime intermediário dos modelos de finalidade geral abertos ([art. 53.º](#art-53)).

**Digital Omnibus**: quatro mudanças aqui.

- **Ambiente de testagem à escala da União** ([art. 57.º, n.º 3-A](#art-57-p3a)) — o Serviço para a IA **pode** criar um ambiente próprio, restrito aos sistemas sob sua competência exclusiva do [art. 75.º, n.º 1](#art-75-p1), em cooperação com as autoridades competentes e com acesso prioritário a PME, empresas em fase de arranque e pequenas empresas de média capitalização. É faculdade, não dever, e o regulamento não fixa prazo.
- **Ensaios em condições reais ampliados** — o [art. 60.º](#art-60), antes restrito aos sistemas do Anexo III, passou a alcançar também os cobertos pela legislação do **Anexo I, Seção A**. E um novo [art. 60.º-A](#art-60-a) abre a porta para os da **Seção B**: os Estados-Membros **podem** permiti-los, adotando quadros de ensaio — individual ou conjuntamente — e notificando-os à Comissão antes de os implementar.
- **Plano único** ([art. 57.º, n.º 5](#art-57-p5)) — quando o projeto supervisionado no ambiente de testagem também envolver ensaios em condições reais, o plano de ensaios é **incorporado ao plano do ambiente**, em vez de correr em paralelo.
- **Apoio estendido** — as medidas de apoio regulatório, inclusive o acesso prioritário, alcançam agora também as **pequenas empresas de média capitalização** (_small mid-caps_), corrigindo o degrau que deixava sem apoio a empresa no instante em que deixava de ser PME. Duas definições novas entraram no [art. 3.º](#art-3) para dar contorno a isso: PME, por remissão à Recomendação 2003/361/CE, e SMC, por remissão à Recomendação (UE) 2025/1099.

## Quem pode o quê: a divisão de competências normativas

A mesma pergunta que organiza as notas da [LGPD](/notas/lgpd#quem-pode-o-quê-a-divisão-de-competências-normativas), do [Marco Civil](/notas/mci) e do [ECA Digital](/notas/eca-digital) tem, na União Europeia, um degrau a mais: antes de saber qual instrumento pode dispor sobre o quê, é preciso saber **qual ordem jurídica** — a da União ou a nacional — está autorizada a dispor.

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
        - Mais importante do que o alargamento da competência é o que veio junto: quatro artigos novos ([arts. 75.º-A a 75.º-D](#art-75-a)) dotam o Serviço para a IA de um **aparato de investigação e sanção** que ele não tinha. Ele passa a ter todos os poderes de uma autoridade de fiscalização do mercado, podendo abrir investigação por iniciativa própria ou mediante queixa; pedir informação por simples pedido ou por decisão; realizar **inspeções remotas e no local**, com entrada nas instalações, exame e cópia de documentos em qualquer suporte, pedido de explicações orais e **selagem de instalações e registros** enquanto durar a inspeção. Onde o direito nacional exigir autorização judicial, o juiz verifica que a medida não é arbitrária nem excessiva, mas **não pode rever a necessidade da investigação** nem exigir o processo — a legalidade da decisão fica reservada ao Tribunal de Justiça. O art. 75.º-B admite **compromissos** tornados vinculativos por decisão; o 75.º-C fixa o procedimento de constatação de incumprimento, com aplicação por remissão das coimas do [art. 99.º](#art-99), n.os 3 a 7, e **sanções pecuniárias compulsórias** de até 5% do rendimento médio diário ou do volume de negócios mundial do exercício anterior, **por dia**, com prescrição de cinco anos e jurisdição plena do Tribunal de Justiça; o 75.º-D assegura direitos de defesa e acesso ao processo. Quem conhece direito da concorrência reconhece o desenho: é o modelo antitruste transplantado para a IA.
        - O contrapeso é frágil. O novo [art. 64.º, n.º 3](#art-64-p3) determina que o Serviço para a IA receba recursos adequados — mas "sem prejuízo do processo orçamental". Poder de selar instalações exige estrutura administrativa para exercê-lo; a cláusula de recursos é programática e não a garante. É a tensão a acompanhar nos próximos anos.
- **Autoridades nacionais competentes** ([art. 70.º](#art-70)) — cada Estado-Membro designa ao menos uma **autoridade notificadora** e uma **autoridade de fiscalização do mercado**, com independência, competência técnica e recursos adequados. É a elas que se dirigem as queixas do [art. 85.º](#art-85).
- **Autoridades de proteção dos direitos fundamentais** ([art. 77.º](#art-77)) — organismos nacionais de supervisão de direitos fundamentais podem requisitar e aceder à documentação dos sistemas de alto risco. **Digital Omnibus**: esclareceu o caminho — o pedido é dirigido à **autoridade de fiscalização do mercado** competente, que deve responder sem demora indevida, com dever mútuo de cooperação e sem prejuízo dos poderes que esses organismos já tenham por outra via para pedir informação diretamente aos operadores.
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

**Digital Omnibus**: reescreveu o [art. 99.º, n.º 1](#art-99-p1) para deixar claro que os Estados-Membros estabelecem regras sobre **sanções e outras medidas de execução** — que podem incluir coimas, mas também **advertências e medidas não pecuniárias** —, tendo em conta a viabilidade econômica de PME e de pequenas empresas de média capitalização. É uma abertura relevante: nem toda resposta a um descumprimento precisa ser multa. Acrescente-se que, sobre os sistemas de sua competência exclusiva, o Serviço para a IA dispõe ainda das **sanções pecuniárias compulsórias** do [art. 75.º-C](#art-75-c), descritas acima — instrumento distinto da coima, e potencialmente mais gravoso, por incidir por dia de descumprimento.

O regime sancionatório vale desde **2 de agosto de 2025**, com exceção do [art. 101.º](#art-101) — as coimas aplicadas pela Comissão aos prestadores de modelos de finalidade geral —, que ficou de fora dessa antecipação e só se aplica desde **2 de agosto de 2026**, a data geral do regulamento.

## Cronograma de aplicação ([art. 113.º](#art-113))

Antes da lista, uma distinção que o Digital Omnibus tornou indispensável: **entrar em vigor não é o mesmo que aplicar-se**. Desde 27 de julho de 2026 as alterações do Omnibus são texto do AI Act; mas cada dispositivo alterado só se torna exigível na data que o art. 113.º lhe reserva. Um art. 6.º já alterado no papel só produzirá efeito em dezembro de 2027. Vale também separar duas coisas que a leitura corrida embaralha: as **datas de aplicação** de cada bloco do regulamento e os **prazos de conformação** dados a sistemas que já estavam no mercado — estes últimos, no [art. 111.º](#art-111), vão até 2030 e não significam que a regra só entre em vigor lá.

Datas de aplicação já cumpridas:

- **1º de agosto de 2024** — entrada em vigor.
- **2 de fevereiro de 2025** — disposições gerais, definições ([art. 3.º](#art-3)), **literacia em IA** ([art. 4.º](#art-4)) e **práticas proibidas** ([art. 5.º](#art-5)).
- **2 de agosto de 2025** — **modelos de finalidade geral** ([arts. 51.º a 56.º](#art-51)), **governança** ([arts. 64.º a 70.º](#art-64)), autoridades notificadoras e organismos notificados, confidencialidade e o **regime sancionatório**, exceto o [art. 101.º](#art-101). Prazo, também, para os Estados-Membros designarem suas autoridades nacionais.
- **27 de julho de 2026** — **Digital Omnibus**: entrada em vigor. As versões alteradas do [art. 4.º](#art-4), do novo [art. 4.º-A](#art-4-a) e das demais disposições do Capítulo I passam a valer de imediato, por já estarem em aplicação desde fevereiro de 2025.
- **2 de agosto de 2026** — **aplicação geral** do regulamento, incluindo os deveres de **transparência do [art. 50.º](#art-50)**, a competência e os poderes do Serviço para a IA ([arts. 75.º](#art-75) e [75.º-A a 75.º-D](#art-75-a)) e as coimas do [art. 101.º](#art-101).

A cumprir:

- **2 de dezembro de 2026** — **Digital Omnibus**: entrada em aplicação das **novas proibições** do [art. 5.º](#art-5) (imagens íntimas não consentidas e material de abuso sexual infantil) e fim do período de transição da **marcação legível por máquina** para sistemas generativos já no mercado em 2 de agosto de 2026.
- **1º de agosto de 2027** — prazo para a Comissão publicar **orientações** sobre a aplicação coordenada do AI Act e da legislação de harmonização do Anexo I, Seção A ([art. 96.º, n.º 1, alínea g)](#art-96-p1-g)).
- **2 de agosto de 2027** — conformação dos **modelos de finalidade geral colocados no mercado antes de 2 de agosto de 2025** ([art. 111.º](#art-111)); **Digital Omnibus**: prazo para a Comissão adotar os **atos delegados da cláusula de equivalência** ([art. 2.º, n.º 13](#art-2-p13)) e prazo para que ao menos um **ambiente nacional de testagem** esteja operacional em cada Estado-Membro ([art. 57.º, n.º 1](#art-57-p1)) — adiado de 2 de agosto de 2026.
- **2 de setembro de 2027** — **Digital Omnibus**: prazo para a Comissão publicar orientações, com modelo facultativo, sobre o **plano de acompanhamento pós-comercialização** ([art. 72.º, n.º 3](#art-72-p3)).
- **2 de dezembro de 2027** — **Digital Omnibus**: obrigações dos sistemas de **alto risco do Anexo III** ([art. 6.º, n.º 2](#art-6-p2)), **adiadas de 2 de agosto de 2026**. Tecnicamente, é a data de aplicação das Seções 1, 2 e 3 do Capítulo III a esses sistemas, ressalvado o art. 6.º, n.º 5.
- **28 de janeiro de 2028** — **Digital Omnibus**: prazo para os **organismos notificados** já designados sob a legislação do Anexo I, Seção A, pedirem designação sob o AI Act ([art. 43.º, n.º 3](#art-43-p3)).
- **2 de agosto de 2028** — **Digital Omnibus**: obrigações dos sistemas de **alto risco embarcados em produtos regulados** do Anexo I ([art. 6.º, n.º 1](#art-6-p1)), **adiadas de 2 de agosto de 2027**. Data-limite, também, para a aplicação dos **atos delegados** que inserem os requisitos de IA no Anexo III do Regulamento Máquinas.

Prazos de conformação de sistemas já no mercado ([art. 111.º](#art-111)):

- **2 de agosto de 2030** — sistemas de alto risco destinados a **autoridades públicas** colocados no mercado antes de 2 de agosto de 2026. **Digital Omnibus**: o considerando 39 esclareceu o alcance desse período de graça — ele opera por **tipo e modelo** de sistema, de modo que, colocada licitamente no mercado ao menos uma unidade antes da data, as demais unidades do mesmo tipo e modelo o acompanham, enquanto o desenho do sistema não mudar de forma significativa.
- **31 de dezembro de 2030** — sistemas que sejam componentes de **sistemas informáticos de grande escala** listados no Anexo X.

## O Digital Omnibus: o que mudou e o que ficou de fora

### Como chegou aqui

Em 19 de novembro de 2025 a Comissão Europeia apresentou o pacote **Digital Omnibus**, com dois instrumentos distintos que convém não confundir:

- o **Digital Omnibus sobre a IA**, restrito ao AI Act e à legislação setorial conexa — **aprovado e em vigor** desde 27 de julho de 2026, como [Regulamento (UE) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj); e
- o **Digital Omnibus** de dados, que propõe alterações ao **RGPD**, à Diretiva ePrivacy, ao Regulamento dos Dados e à Diretiva SRI 2 — incluindo o tratamento de dados pseudonimizados, as regras de _cookies_ e as bases de tratamento para treino de IA. Esse continua **em tramitação**, sem acordo final, e não produziu efeito algum até aqui.

A distinção importa porque parte do que se discute sob o nome "Digital Omnibus" — inclusive o [parecer conjunto do Comitê Europeu para a Proteção de Dados e da Autoridade Europeia para a Proteção de Dados](https://www.edpb.europa.eu/news/news/2026/digital-omnibus-edpb-and-edps-support-simplification-and-competitiveness-while_en), que apoiou o objetivo de simplificação e registrou preocupações de fundo — trata do **segundo**, e não do que já virou lei.

### O balanço das alterações ao AI Act

São **43 itens de alteração** ao AI Act, no [art. 1.º do Omnibus](#omnibus-art-1), mais ajustes ao Regulamento de Base da Aviação (art. 2.º) e ao Regulamento Máquinas (art. 3.º). Agrupados por efeito:

**Adia**: o alto risco do Anexo III de 2 de agosto de 2026 para **2 de dezembro de 2027**; o alto risco embarcado do Anexo I de 2 de agosto de 2027 para **2 de agosto de 2028** (nova redação do [art. 113.º](#art-113), terceiro parágrafo, alínea c)); e o prazo dos **ambientes nacionais de testagem** de 2 de agosto de 2026 para 2 de agosto de 2027 ([art. 57.º, n.º 1](#art-57-p1)). São **datas fixas**, e não prazos condicionados à publicação das normas harmonizadas, como se cogitou durante a negociação: o adiamento não depende de ato posterior da Comissão para produzir efeito. Note-se o recorte — o adiamento alcança as **Seções 1, 2 e 3 do Capítulo III**, e não o regulamento inteiro.

**Amplia**:

- duas novas práticas proibidas no [art. 5.º](#art-5) — alíneas b-A) e b-B) do n.º 1, com os novos n.os 1-A e 1-B a delimitá-las —, aplicáveis a partir de 2 de dezembro de 2026;
- a **competência exclusiva do Serviço para a IA** do [art. 75.º](#art-75), sobre os sistemas construídos sobre modelos de finalidade geral do mesmo prestador **ou da mesma empresa** e os integrados em plataformas e motores de pesquisa de muito grande dimensão do DSA, com as exceções descritas acima;
- e, sobretudo, o **aparato de execução** dos novos [arts. 75.º-A a 75.º-D](#art-75-a): investigação, pedidos de informação por decisão, inspeções com poder de selagem, compromissos vinculativos, coimas e sanções pecuniárias compulsórias diárias. Por volume de texto, é a maior parte do regulamento alterador — e a que menos atenção recebeu.

**Abranda**: o dever de **literacia em IA** do [art. 4.º](#art-4), que deixou de ser obrigação de resultado ("assegurar um nível suficiente") para ser obrigação de meio ("tomar medidas para apoiar o desenvolvimento"), com ressalva expressa de que não se exige garantir nível específico de ninguém.

**Simplifica**:

- artigo próprio para o tratamento de **dados de categorias especiais** na detecção e correção de enviesamentos (novo [art. 4.º-A](#art-4-a), com o [art. 10.º, n.º 5](#original-art-10-p5), revogado), agora disponível também a responsáveis pela implantação e a sistemas que não são de alto risco;
- **critério do componente de segurança** afinado no [art. 3.º, ponto 14](#art-3) e no [art. 6.º](#art-6) (novos n.os 1-A a 1-C);
- **cláusula de equivalência** no [art. 2.º, n.º 13](#art-2-p13), dependente de atos delegados até 2 de agosto de 2027;
- **documentação técnica simplificada** para PME e pequenas empresas de média capitalização, em formulário que a Comissão deve criar e que os organismos notificados são obrigados a aceitar ([art. 11.º](#art-11)), e sistema de gestão da qualidade proporcional ao porte ([art. 17.º, n.º 2](#art-17-p2));
- **presunção de cibersegurança** para sistemas abrangidos pelo _Cyber Resilience Act_ ([art. 42.º, n.º 3](#art-42-p3));
- normas harmonizadas que cubram **simultaneamente** o AI Act e a legislação setorial ([art. 40.º, n.º 2](#art-40-p2)), e **pedido único** de designação de organismos notificados ([art. 28.º, n.os 8 e 9](#art-28-p8));
- **remissões cruzadas** entre a avaliação de impacto sobre direitos fundamentais e a avaliação de impacto sobre a proteção de dados, com modelo de questionário do Serviço para a IA ([art. 27.º, n.os 4 e 5](#art-27-p4));
- ambiente de testagem à escala da União e extensão do apoio regulatório às **pequenas empresas de média capitalização**, inclusive no teto das coimas, que para elas passa a ser o **menor** dos dois valores ([art. 99.º](#art-99), novo n.º 6-A);
- extensão a todas as **PME** da simplificação do sistema de gestão da qualidade antes reservada a microempresas ([art. 63.º](#art-63)).

**Setorializa**: o **Regulamento Máquinas** saiu da Seção A e entrou como ponto 21 da **Seção B** do Anexo I ([art. 1.º, ponto 41](#omnibus-art-1)), de modo que a IA embarcada em máquinas passa a responder apenas pelo art. 6.º, n.º 1, pelo art. 60.º-A e pelos arts. 102.º a 112.º do AI Act. Os requisitos substantivos migram para o **Anexo III do Regulamento Máquinas**, por atos delegados que a Comissão deve fazer aplicar até 2 de agosto de 2028; e, na ponte entre um regime e outro, o novo art. 20.º, n.º 10, do Regulamento Máquinas admite que o fabricante se apoie nas normas harmonizadas do AI Act para obter presunção de conformidade. Vale corrigir uma expectativa que circulou durante a negociação: **dispositivos médicos e brinquedos permaneceram na Seção A** — a setorialização ficou restrita a máquinas.

**Preservou** o que a proposta original queria enxugar: o **registro na base de dados da UE** dos sistemas autoexcluídos do alto risco pelo [art. 6.º, n.º 3](#art-6-p3) — o texto final considerou-o essencial à vigilância do mercado e à prestação de contas, e limitou-se a suprimir dois campos da seção B do Anexo VIII (pontos 7 e 9); a **aplicação do [art. 50.º](#art-50)** na data original; e o critério da **estrita necessidade** no tratamento de categorias especiais de dados, que a Comissão propusera abrandar para simples necessidade e que os colegisladores restabeleceram, alinhados ao parecer conjunto do Comitê Europeu para a Proteção de Dados e da Autoridade Europeia para a Proteção de Dados, de 20 de janeiro de 2026 (considerando 47).

**Estreou**: o Anexo XIV, uma nomenclatura de códigos que delimita o âmbito da designação dos organismos notificados ([art. 30.º, n.º 2](#art-30-p2)) — códigos AIP para sistemas cobertos por legislação de produto, AIB para os sistemas biométricos do Anexo III, ponto 1, e AIH para as tecnologias subjacentes. Um detalhe merece registro para quem acompanha o debate brasileiro: o código residual **AIH 0401**, de "tecnologias emergentes", menciona expressamente a **IA agêntica**. É, ao que se sabe, a primeira vez que o termo aparece em ato vinculativo da União Europeia — sem definição, sem regime próprio e sem critério de classificação. O anexo não preenche a lacuna; apenas certifica que ela existe.

### O alcance da reforma

O que o Omnibus **não** tocou delimita seu alcance: a abordagem baseada no risco, a arquitetura de papéis, o conteúdo dos sete requisitos dos sistemas de alto risco e o regime dos modelos de finalidade geral seguem como estavam. As alterações incidem sobre **prazos, competências de supervisão e requisitos de documentação** — e, em dois pontos, sobre o mérito: o rol de proibições do [art. 5.º](#art-5), que foi ampliado, e o dever de literacia do [art. 4.º](#art-4), que foi abrandado.

Vendido como pacote de simplificação, o texto publicado devolve um retrato mais ambíguo. As simplificações são reais — documentação mais leve, procedimento único de designação, presunção de cibersegurança, registro reduzido, remissões entre avaliações de impacto. Mas o mesmo ato criou duas proibições absolutas, uma nova base jurídica para tratar dados sensíveis e um aparato investigatório e sancionatório inédito. O saldo não é de alívio: é de **redistribuição** — menos ônus documental sobre os operadores, mais poder no nível da União.

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

O [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), de autoria do então presidente do Senado, resultou dos trabalhos de uma comissão de juristas e foi **aprovado pelo Plenário do Senado em 10 de dezembro de 2024**. Chegou à [Câmara dos Deputados](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262) em 17 de março de 2025, com regime de **prioridade** e sujeito à apreciação do Plenário. Em 29 de abril de 2025, ato da Presidência constituiu a **comissão especial** para examiná-lo, presidida pela deputada Luisa Canziani (União Brasil-PR); em 20 de maio de 2025 foi designado relator o deputado Aguinaldo Ribeiro (PP-PB). A comissão realizou ciclo de audiências públicas — doze, entre maio e setembro de 2025 — e seminários regionais, e ao projeto já foram **apensadas dezenas de proposições**.

Uma delas importa mais que as outras. Em dezembro de 2025 o Poder Executivo enviou ao Congresso projeto próprio sobre a **governança** da IA, articulado com o relator, para sanar o **vício de iniciativa** do desenho original: como a criação de órgãos e de despesa é de iniciativa privativa do Executivo, essa parte do PL nº 2338/2023 seria inconstitucional se viesse do Legislativo. O projeto do governo institui o Conselho Brasileiro de Inteligência Artificial (CBIA), à frente do SIA, reunindo a [ANPD](https://www.gov.br/anpd/pt-br) e ministérios. É a peça a acompanhar: a arquitetura de autoridade que sair do substitutivo provavelmente não será a que o Senado aprovou.

A votação foi sucessivamente adiada — do fim de 2025 para 2026 — em meio a divergências sobre os pontos sensíveis. Na data de fechamento desta nota, a ficha de tramitação registra a situação como **"aguardando parecer do relator na comissão especial"**: o parecer ainda não foi apresentado, e a movimentação de 2026 se resume a despachos de apensação de novos projetos. O PL **não é lei**, e não há texto de relatoria a comparar — a comparação abaixo é, portanto, com o **substitutivo aprovado pelo Senado**, único texto com deliberação concluída.

Para situar os dois calendários: entre a aprovação do texto no Senado, em dezembro de 2024, e hoje, a União Europeia colocou o AI Act em vigor, aplicou três das suas cinco fases de exigibilidade e aprovou a primeira reforma; no mesmo intervalo, o projeto brasileiro passou da apresentação na Câmara à espera do parecer do relator.

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
- **Direitos das pessoas afetadas.** O PL prevê um catálogo mais largo e o posiciona no corpo inicial do texto: informação prévia, explicação, **contestação de decisões** e **revisão humana**, além de direito à não discriminação e à correção de vieses. O AI Act traz explicação ([art. 86.º](#art-86)) e queixa ([art. 85.º](#art-85)) em capítulo final, e **não** cria direito de contestação nem de revisão humana, que continuam a depender do [art. 22 do RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679) — assim como, no Brasil, hoje dependem do [art. 20 da LGPD](/notas/lgpd#art-20).
- **Responsabilidade civil.** O PL trata do tema, articulando-o com o Código de Defesa do Consumidor e com o regime de responsabilidade agravada para alto risco. O AI Act **não** cria regime de responsabilidade civil, e a diretiva que o faria foi retirada em 2025.
- **Autoridade.** O texto aprovado pelo Senado atribui à [ANPD](https://www.gov.br/anpd/pt-br) a coordenação do SIA, consolidando-a como reguladora também da IA — trajetória já percorrida com o [ECA Digital](/notas/eca-digital) e o [Marco Civil](/notas/mci). Com a ressalva feita acima: o projeto de governança enviado pelo Executivo em dezembro de 2025 interpõe o CBIA à frente do SIA, e é dele que deve sair a arquitetura final. A União Europeia, por sua vez, criou estrutura nova, o Serviço para a IA, dentro da Comissão, e não atribuiu a matéria às autoridades de proteção de dados; a essas reservou a supervisão das instituições da própria União ([art. 100.º](#art-100)) e a competência que já lhes cabe pelo RGPD. Vale reparar no movimento europeu recente: com o Omnibus, a supervisão dos maiores agentes migrou das autoridades nacionais para a Comissão. Quem discute no Brasil o equilíbrio entre autoridade central e reguladores setoriais tem aí um dado de experiência — a tendência europeia, ao menos nesta rodada, foi de **centralizar**.
- **Trabalho e sindicatos.** O AI Act tem cláusula expressa permitindo aos Estados-Membros normas **mais protetivas aos trabalhadores** ([art. 2.º](#art-2)) e impõe informação prévia a trabalhadores e seus representantes ([art. 26.º](#art-26)). O PL trata do impacto sobre trabalhadores, mas sem a articulação com negociação coletiva que o texto europeu deixa em aberto.
- **Segurança nacional.** A exclusão europeia de usos militares, de defesa e de segurança nacional ([art. 2.º](#art-2)) é ampla e incondicionada. O PL não replica exclusão de igual largura, o que tende a produzir alcance material maior no Brasil justamente na zona mais sensível.
- **Estágio.** O AI Act está em vigor desde 2024, com três das cinco fases de exigibilidade já aplicadas, orientações da Comissão publicadas, códigos de práticas em uso, base de dados em construção e uma reforma aprovada. O PL não é lei e não tem parecer na comissão especial. São textos em estágios diferentes, e não dois regimes vigentes a comparar.

### Três pontos de contato com o debate brasileiro

Sem transpor conclusões — são ordens jurídicas distintas —, três aspectos da execução europeia têm equivalente direto no que o Brasil terá de resolver:

- **A dependência entre prazo e instrumento de conformidade.** O Omnibus justifica o adiamento, no considerando 40, pela indisponibilidade de normas harmonizadas e de especificações comuns e pelo atraso na instituição das autoridades nacionais competentes. No desenho brasileiro, o papel dos instrumentos caberia à regulamentação da ANPD e à capacidade de fiscalização do SIA — pendências que o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) remete a atos posteriores, como a [LGPD](/notas/lgpd) fez.
- **Quem define o conteúdo concreto do dever.** Na União Europeia, o que satisfaz o [art. 15.º](#art-15) é fixado por normas do CEN e do CENELEC, não pelo legislador nem pela Comissão. O equivalente brasileiro seriam resoluções da ANPD e normas técnicas da ABNT — com a mesma questão sobre publicidade e acesso ao texto que define a obrigação.
- **O recorte do que foi e do que não foi adiado.** O adiamento alcançou os deveres de conformidade dos sistemas de alto risco; as proibições do [art. 5.º](#art-5) e a transparência do [art. 50.º](#art-50) mantiveram as datas, e o rol de proibições foi ampliado. É um dado a considerar em qualquer discussão sobre escalonamento de vigência no marco brasileiro.

## Pontos em aberto

Questões que o texto vigente não fecha, e que condicionam como o regulamento será aplicado daqui em diante:

- **O pacote de dados do Digital Omnibus.** As alterações propostas ao RGPD, à Diretiva ePrivacy, ao Regulamento dos Dados e à Diretiva SRI 2 seguem em tramitação, sem acordo final, com desfecho esperado apenas para o primeiro semestre de 2027. O [Comitê Europeu para a Proteção de Dados e a Autoridade Europeia para a Proteção de Dados manifestaram-se sobre elas em parecer conjunto](https://www.edpb.europa.eu/news/news/2026/digital-omnibus-edpb-and-edps-support-simplification-and-competitiveness-while_en), apoiando o objetivo de simplificação e registrando preocupações de fundo. Como parte dessas propostas toca o tratamento de dados para treino de IA, o desfecho afeta o cumprimento do AI Act sem alterá-lo.
- **As normas harmonizadas.** A presunção de conformidade do [art. 40.º](#art-40) só opera quando a referência da norma é publicada no Jornal Oficial. Foi a ausência dessas publicações que fundamentou o adiamento; enquanto não vierem, o cumprimento dos [arts. 8.º a 15.º](#art-8) tem de ser demonstrado por outro caminho.
- **A derrogação do [art. 6.º, n.º 3](#art-6-p3).** O critério é autoaplicado pelo prestador e o registro dos sistemas autoexcluídos foi mantido pelo Omnibus. Quanto do Anexo III fica efetivamente fora do alto risco por essa via é algo que só a base de dados da UE e a prática de fiscalização vão mostrar.
- **A reparação de danos.** O AI Act não cria regime de responsabilidade civil, e a proposta de diretiva sobre responsabilidade em matéria de IA foi retirada pela Comissão em 2025. A reparação continua repartida entre os direitos nacionais e o regime de responsabilidade por produtos defeituosos — diferentemente do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), que trata do tema no próprio projeto.
- **A capacidade do Serviço para a IA.** O Omnibus deu-lhe poderes de autoridade antitruste e, em troca, uma cláusula de recursos "sem prejuízo do processo orçamental" ([art. 64.º, n.º 3](#art-64-p3)). Centralizar supervisão sem capacidade correspondente é um risco reconhecido, e é o ponto em que a reforma pode falhar por dentro. Vale acompanhar, no Brasil, o paralelo óbvio com a capacidade instalada de quem vier a coordenar o SIA.
- **A cláusula de equivalência.** O [art. 2.º, n.º 13](#art-2-p13) autoriza limitar requisitos dos [arts. 9.º a 15.º](#art-9) e [17.º a 25.º](#art-17) quando a legislação setorial já proteger de forma equivalente — mas nada disso opera antes dos atos delegados devidos até 2 de agosto de 2027. Quanto do alto risco embarcado será efetivamente aliviado por essa via é a incógnita mais relevante para os setores do Anexo I.
- **A IA agêntica.** O Anexo XIV nomeia-a, no código residual AIH 0401, sem definir, classificar ou regular. Não há definição, não há obrigações próprias e não há critério que a distinga dos sistemas construídos sobre modelos de finalidade geral. É a lacuna mais provável da próxima rodada de revisão — e um tema em que o Brasil, se legislar depois, poderá chegar com o problema já desenhado.
- **A repercussão internacional.** O AI Act é a primeira lei geral de IA de um grande bloco, e o RGPD é precedente de difusão de modelo regulatório europeu. Até aqui os caminhos divergiram: os Estados Unidos regulam por ordens executivas federais e leis estaduais, o Reino Unido optou por abordagem setorial sem lei geral, e o Brasil, apesar da inspiração declarada, ainda não converteu o PL nº 2338/2023 em lei e diverge do modelo europeu nos pontos listados acima.

## Normas

### Legislação principal

- [Regulamento (UE) 2024/1689, de 13 de junho de 2024](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024R1689) — estabelece regras harmonizadas em matéria de inteligência artificial (Regulamento da Inteligência Artificial, ou **AI Act**). Publicado no Jornal Oficial da União Europeia em 12 de julho de 2024 e **em vigor desde 1º de agosto de 2024**, com aplicação escalonada até 2028 (ver "Cronograma de aplicação", acima).
- [Tratado sobre o Funcionamento da União Europeia (TFUE)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012E/TXT), especialmente os arts. 16 (proteção de dados pessoais) e 114 (aproximação de legislações para o mercado interno) — as bases jurídicas do regulamento.
- [Carta dos Direitos Fundamentais da União Europeia](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012P/TXT) — parâmetro material de boa parte das proibições e dos requisitos de alto risco, e objeto direto da avaliação de impacto do [art. 27.º](#art-27).

### Alterações posteriores ao AI Act

- [Regulamento (UE) 2026/1744, de 8 de julho de 2026](https://eur-lex.europa.eu/eli/reg/2026/1744/oj) — **Digital Omnibus sobre a IA**. Altera o Regulamento (UE) 2024/1689, o Regulamento de Base da Aviação (UE) 2018/1139 e o Regulamento Máquinas (UE) 2023/1230 quanto à simplificação da execução das regras harmonizadas de IA. Publicado no JOUE de 24 de julho de 2026 e **em vigor desde 27 de julho de 2026**. É a primeira alteração de fundo do AI Act, e está sinalizada ao longo desta nota como **Digital Omnibus**.

> **Sobre o painel "Lei seca".** O EUR-Lex ainda **não publicou a versão consolidada** do AI Act com as alterações do Omnibus. O painel traz, então, **três textos**, selecionáveis no alto:
>
> 1. **AI Act consolidado (não oficial)** — o que abre por padrão, e o alvo dos links destes comentários. É o Regulamento (UE) 2024/1689 com as 43 alterações do art. 1.º do Omnibus já aplicadas, geradas por script a partir dos dois textos oficiais: nenhuma palavra foi redigitada, e o script para se um dispositivo alvo não for encontrado. **Não é fonte oficial** — serve para ler o regulamento como ele vigora hoje, mas em caso de divergência prevalece o Jornal Oficial.
> 2. **AI Act (texto original)** — o Regulamento (UE) 2024/1689 como publicado em 12/7/2024, para quem precise da redação anterior de um dispositivo alterado. É para onde aponta, por exemplo, o link do art. 10.º, n.º 5, que a consolidação não tem porque foi revogado.
> 3. **Digital Omnibus sobre a IA** — o Regulamento (UE) 2026/1744, o ato alterador em si.
>
> Os três estão ali **na íntegra**, com os considerandos — os 180 do AI Act e os 47 do Omnibus. Considerando não é dispositivo e não recebe âncora, mas num regulamento europeu é neles que está o *porquê* de cada regra, e tanto a Comissão quanto o Tribunal de Justiça os usam para interpretar o articulado.

### Regulamentos e atos aplicáveis

Diferentemente da [LGPD](/notas/lgpd) e do [ECA Digital](/notas/eca-digital), o AI Act não tem "decreto regulamentador": o detalhamento vem por **atos delegados e de execução** da Comissão Europeia, por **normas harmonizadas** europeias e por **códigos de práticas** de adesão voluntária (ver "Quem pode o quê", acima).

- [Código de Práticas para a IA de finalidade geral](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai) — publicado em julho de 2025; instrumento voluntário pelo qual os prestadores de modelos de finalidade geral podem demonstrar o cumprimento dos [arts. 53.º](#art-53) e [55.º](#art-55).
- [Modelo de sumário público do conteúdo usado no treino](https://digital-strategy.ec.europa.eu/en/library/explanatory-notice-and-template-public-summary-training-content-general-purpose-ai-models) — formulário obrigatório previsto no [art. 53.º](#art-53).
- [Orientações da Comissão sobre práticas de IA proibidas](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act) e sobre a [definição de sistema de IA](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application) — ambas de fevereiro de 2025.
- [Orientações e Código de Práticas sobre transparência de conteúdos gerados por IA](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content) — detalham a marcação e a divulgação exigidas pelo [art. 50.º](#art-50).
- [Serviço de Apoio ao AI Act (_AI Act Service Desk_)](https://ai-act-service-desk.ec.europa.eu/) — canal oficial de orientação da Comissão, com o cronograma de aplicação atualizado.

### Estudos técnicos da ANPD

Não são normas nem se aplicam ao regulamento europeu — entram aqui porque são a fonte pública do que esta nota afirma sobre o debate brasileiro. A série **Radar Tecnológico** se apresenta como abordagem didática de tecnologias emergentes, "sem a intenção de esgotar as temáticas ou firmar posicionamentos institucionais"; os documentos estão na [central de documentos técnicos e orientativos](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos) da Agência.

- [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (2026) — conceitos, funcionamento, riscos à proteção de dados, comparação de regimes regulatórios (inclusive o [art. 50.º](#art-50)) e limites das ferramentas de detecção.
- [Radar Tecnológico nº 3 — Inteligência artificial generativa](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar_tecnologico_ia_generativa_anpd.pdf) (novembro de 2024) — ciclo de tratamento de dados pessoais em sistemas generativos, da raspagem para treinamento à eliminação.

### Normas correlatas

- [Regulamento (UE) 2016/679 — RGPD](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679), a que o AI Act expressamente não derroga ([art. 2.º](#art-2)); é a norma de referência da [LGPD](/notas/lgpd).
- [Regulamento (UE) 2022/2065 — Regulamento dos Serviços Digitais (DSA)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32022R2065) e [Regulamento (UE) 2022/1925 — Regulamento dos Mercados Digitais (DMA)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32022R1925).
- [Regulamento (UE) 2023/2854 — Regulamento dos Dados (_Data Act_)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32023R2854).
- [Regulamento (UE) 2023/1230 — Regulamento Máquinas](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32023R1230) e [Regulamento (UE) 2018/1139 — Regulamento de Base da Aviação](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32018R1139), ambos alterados pelo Digital Omnibus para alinhar prazos e avaliações de conformidade.
- [Diretiva (UE) 2019/1937](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L1937) — proteção de denunciantes, aplicável às denúncias do [art. 87.º](#art-87).
- No Brasil: [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) (ver "Comparação com o PL nº 2338/2023", acima), a [LGPD](/notas/lgpd), o [ECA Digital](/notas/eca-digital) e o [Marco Civil da Internet](/notas/mci).
