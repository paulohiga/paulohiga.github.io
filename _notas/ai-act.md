---
layout: nota
permalink: /notas/ai-act
title: AI Act — Regulamento de Inteligência Artificial da União Europeia
description: Notas de estudo sobre o Regulamento (UE) 2024/1689 — pirâmide de risco, práticas proibidas, sistemas de risco elevado, modelos de finalidade geral, transparência, governança e coimas —, no texto consolidado de 27 de julho de 2026, com o que o Digital Omnibus mudou e a comparação com o PL nº 2338/2023.
lei: ai-act
ordem: 6
jurisdicao: União Europeia
atualizado_em: 2026-08-21
---

## Resumo geral

O AI Act é a primeira lei geral de inteligência artificial de um grande bloco econômico, e o que ele regula são **usos**. O mesmo modelo pode ficar fora da lei num contexto e responder pela lista inteira de requisitos em outro, conforme a função que exerce e o dano que pode causar. É a **abordagem baseada no risco**, organizada em quatro degraus — risco inaceitável, risco elevado, risco de transparência e risco mínimo —, com um regime transversal para os **modelos de IA de finalidade geral**, que incide sobre o modelo e não sobre o uso.

O instrumento escolhido pesa tanto quanto o conteúdo. É um **regulamento**: vale diretamente nos 27 Estados-Membros, sem lei nacional de transposição, e ocupa o campo que harmoniza. É a técnica do [RGPD](/notas/gdpr), e a razão pela qual o AI Act tende a transbordar as fronteiras da União: ele alcança quem coloca sistemas no mercado europeu, ou cujo resultado seja usado ali, esteja estabelecido onde estiver ([art. 2.º](#art-2)).

A execução seguiu outro ritmo. O núcleo mais oneroso do regulamento — os requisitos dos sistemas de risco elevado — deveria ser exigível em agosto de 2026 e não é: o **Digital Omnibus sobre a IA**, o [Regulamento (UE) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj), em vigor desde 27 de julho de 2026, adiou-o para **2 de dezembro de 2027** (sistemas autônomos do Anexo III) e **2 de agosto de 2028** (IA embarcada em produtos já regulados). O considerando 40 do ato alterador dá o motivo: "o atraso na disponibilidade de normas, especificações comuns e orientações alternativas e na instituição das autoridades nacionais competentes" comprometia o início efetivo da aplicação, "de tal modo que a manutenção da sua data inicial de aplicação, a saber, 2 de agosto de 2026, deixe de se justificar".

Ler o Omnibus só como afrouxamento seria erro. Ele **acrescentou duas proibições** ao rol fechado do [art. 5.º](#art-5) — geração de imagens íntimas não consentidas e de material de abuso sexual infantil — e deu ao Serviço para a IA da Comissão **competência exclusiva** sobre parte relevante do mercado, com um aparato de investigação e sanção que ele não tinha ([arts. 75.º-A a 75.º-D](#art-75-a)). O saldo é de redistribuição: menos ônus documental sobre os operadores, mais poder concentrado no nível da União.

O que já se aplica hoje: as **proibições** do [art. 5.º](#art-5) e o dever de **literacia em IA** do [art. 4.º](#art-4), desde 2 de fevereiro de 2025; as obrigações dos **modelos de finalidade geral**, a governança e o regime sancionatório, desde 2 de agosto de 2025; e, desde **2 de agosto de 2026**, a aplicação geral do regulamento, com os deveres de **transparência** do [art. 50.º](#art-50) — a face do AI Act com que o público em geral esbarra, porque é a que manda identificar conteúdo sintético.

Para o leitor brasileiro, o regulamento interessa por dois motivos distintos. É norma **diretamente aplicável** a empresas brasileiras que ofereçam sistemas de IA no mercado europeu, do mesmo modo que o [RGPD](/notas/gdpr) já as alcançava. E é o **modelo declarado** do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), aprovado pelo Senado em dezembro de 2024 e ainda sem parecer na Câmara: a classificação por risco, os direitos das pessoas afetadas e a avaliação de impacto vieram de lá, mas o projeto brasileiro fez escolhas próprias em pontos sensíveis — algoritmos de recomendação, direito de autor no treino e desenho da autoridade. Vale a advertência que a [LGPD](/notas/lgpd) já ensinou: inspiração estrutural não é equivalência jurídica.

## Fundamentos

O regulamento tem duas bases jurídicas no Tratado sobre o Funcionamento da União Europeia: o **art. 114** (aproximação de legislações para o mercado interno) e o **art. 16** (proteção de dados pessoais). É o art. 114 que explica metade do desenho — um ato de harmonização impede os Estados-Membros de acrescentarem requisitos nacionais divergentes no campo que ele ocupa. O parâmetro material é a **Carta dos Direitos Fundamentais da União Europeia**, invocada no [art. 1.º](#art-1) e objeto direto da avaliação de impacto do [art. 27.º](#art-27).

### Objeto e objetivos ([art. 1.º](#art-1))

O objetivo é declaradamente duplo, e a tensão entre as duas metades explica boa parte das soluções de compromisso: **melhorar o funcionamento do mercado interno** e **promover a adoção de uma IA centrada no ser humano e de confiança**, com nível elevado de proteção da saúde, da segurança e dos direitos fundamentais — democracia, Estado de direito e proteção do ambiente incluídos —, apoiando ao mesmo tempo a inovação.

### Uma norma de produto, não uma lei de direitos

O AI Act se organiza como a legislação europeia de **segurança de produtos**. Daí o vocabulário: colocação no mercado, colocação em serviço, avaliação da conformidade, marcação CE, organismos notificados, fiscalização do mercado, normas harmonizadas. A consequência prática é que o cumprimento se concentra **antes** de o sistema chegar ao mercado — gestão de risco, qualidade dos dados, documentação técnica, supervisão humana —, e não na reparação posterior do dano.

É a diferença estrutural em relação ao [RGPD](/notas/gdpr) e à [LGPD](/notas/lgpd), que são normas de conduta e de direitos: princípios, bases de licitude, direitos exercíveis pelo titular, responsabilidade do agente. Um se cumpre antes do lançamento e se certifica; o outro se cumpre continuamente, em cada operação, e se comprova depois. Por isso os direitos individuais do AI Act ocupam três artigos no penúltimo capítulo ([arts. 85.º](#art-85) a [87.º](#art-87)) — e é um dos pontos em que o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) tomou caminho diferente.

### Literacia em IA: o dever que alcança todo mundo ([art. 4.º](#art-4))

É o único dever que atinge **todo prestador e todo responsável pela implantação**, qualquer que seja o grau de risco do sistema. Vale desde 2 de fevereiro de 2025, e por isso é o dispositivo do AI Act que mais gente precisa conhecer.

O Digital Omnibus substituiu o artigo inteiro. Antes, prestadores e responsáveis pela implantação deviam "assegurar um nível suficiente de literacia"; agora devem **adotar medidas para promover** a literacia do pessoal e de quem opera o sistema em seu nome, e o texto acrescenta a frase que fecha a discussão: a obrigação "não exige que os prestadores ou responsáveis pela implantação garantam que as pessoas atinjam qualquer nível específico de literacia no domínio da IA" ([art. 4.º, n.º 1](#art-4-p1)). Saiu-se de uma obrigação de resultado para uma de meio. Em troca, a Comissão e os Estados-Membros passaram a ter dever de apoiar esse esforço, publicando exemplos práticos na plataforma única de informação do [art. 62.º, n.º 3, alínea b)](#art-62-p3-b), e o Comitê deve adotar recomendações com objetivos comuns ([art. 4.º, n.º 3](#art-4-p3)).

Como o art. 4.º nunca teve sanção própria, o abrandamento pesa sobre o ônus documental, não sobre a exposição sancionatória.

### Terminologia: PT-PT × pt-BR

O texto oficial em português é o de Portugal; estes comentários são escritos em português do Brasil. A ortografia aqui é a brasileira — "registro", "detecção", "seção", "sistêmico" —, mas os **termos técnicos do regulamento ficam como estão no texto oficial**, para que a palavra procurada nos comentários seja a mesma que aparece no painel ao lado.

**Sujeitos da cadeia**

- **prestador** — o fornecedor ou desenvolvedor, no vocabulário brasileiro (o _provider_ da versão inglesa);
- **responsável pela implantação** — o implementador ou usuário profissional do sistema (o _deployer_);
- **mandatário** — o representante legal do prestador estabelecido fora da União;
- **pessoa singular** é a pessoa natural; **pessoa coletiva**, a pessoa jurídica.

**Atos e situações**

- **colocação no mercado** e **colocação em serviço** — disponibilização e entrada em operação;
- **risco elevado** — o "alto risco" da literatura brasileira e do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233); esta nota usa as duas formas como sinônimas;
- **coima** — a multa administrativa;
- **ambiente de testagem da regulamentação** — o _sandbox_ regulatório;
- **empresa em fase de arranque** — a _startup_; **pequena empresa de média capitalização** é o _small mid-cap_, a faixa entre a PME e a grande empresa;
- **falsificação profunda** — o _deepfake_, definido no [art. 3.º, ponto 60](#art-3-p60).

**Órgãos**

- **Serviço para a IA** — a estrutura da Comissão que supervisiona os modelos de finalidade geral (o _AI Office_); esta nota usa a designação oficial;
- **Comitê Europeu para a Inteligência Artificial** — o colegiado dos Estados-Membros, grafado "Comité" no texto oficial;
- **painel científico de especialistas independentes** — "peritos" no texto oficial.

Uma armadilha específica: **operador**, no AI Act, é o gênero que abrange prestador, responsável pela implantação, importador, distribuidor e mandatário ([art. 3.º, ponto 8](#art-3-p8)). Não corresponde ao operador da [LGPD](/notas/lgpd#art-5-vii), que trata dados em nome do controlador; o equivalente funcional deste, quando existe, é o responsável pela implantação.

Duas grafias atrapalham a busca no painel: o que aqui é "seção" aparece lá como **"secção"** (Anexo I, secção A), e o que aqui é "registro" aparece como **"registo"**.

## Aplicação ([art. 2.º](#art-2))

O regulamento alcança, independentemente do local de estabelecimento:

- **prestadores** que coloquem no mercado da União, ou coloquem em serviço na União, sistemas de IA ou modelos de finalidade geral ([alínea a)](#art-2-p1-a));
- **responsáveis pela implantação** estabelecidos ou localizados na União ([alínea b)](#art-2-p1-b));
- **prestadores e responsáveis pela implantação de países terceiros**, quando o **resultado** produzido pelo sistema for utilizado na União ([alínea c)](#art-2-p1-c));
- **importadores e distribuidores** de sistemas de IA ([alínea d)](#art-2-p1-d));
- **fabricantes** que coloquem no mercado um sistema de IA junto com o seu produto, sob o próprio nome ou marca ([alínea e)](#art-2-p1-e));
- **mandatários** de prestadores não estabelecidos na União ([alínea f)](#art-2-p1-f));
- **pessoas afetadas** localizadas na União ([alínea g)](#art-2-p1-g)).

Duas alíneas dão alcance extraterritorial ao regulamento. A alínea a) apanha o prestador de país terceiro que coloque o sistema no mercado da União. A alínea c) vai além, e é mais larga do que a cláusula equivalente do [RGPD](/notas/gdpr#art-3): não exige oferta de bens ou serviços nem monitoramento de comportamento — basta que o **resultado** do sistema seja usado na União. Um modelo treinado e operado no Brasil, cuja pontuação de crédito seja usada por um banco europeu, entra no regulamento sem que o prestador brasileiro tenha presença nenhuma na Europa.

Repare também em quem a lei alcança e em quem ela protege. **Alcança** toda a cadeia de fornecimento, não só quem desenvolve. E **protege** as pessoas afetadas — que aparecem no rol do art. 2.º sem serem titulares de um catálogo de direitos comparável ao do RGPD, como se vê em "Direitos das pessoas afetadas", abaixo.

## Não aplicação e dispensas ([art. 2.º](#art-2))

O regulamento **não se aplica**:

- a domínios fora do direito da União, nem afeta a competência dos Estados-Membros em **segurança nacional** ([n.º 3](#art-2-p3));
- a sistemas colocados no mercado, colocados em serviço ou utilizados **exclusivamente** para finalidades **militares, de defesa ou de segurança nacional**, seja qual for a entidade que os opere — e também aos sistemas de fora da União cujos resultados sejam usados na União só para essas finalidades ([n.º 3](#art-2-p3));
- a autoridades públicas de países terceiros e organizações internacionais que usem IA em **cooperação policial e judiciária** com a União, mediante salvaguardas adequadas ([n.º 4](#art-2-p4));
- a sistemas e modelos desenvolvidos e colocados em serviço **exclusivamente para investigação e desenvolvimento científicos** ([n.º 6](#art-2-p6));
- às atividades de **investigação, testagem e desenvolvimento anteriores** à colocação no mercado — ressalvada a testagem em condições reais, que continua abrangida ([n.º 8](#art-2-p8));
- às obrigações do responsável pela implantação **pessoa singular** que use o sistema em atividade puramente pessoal e não profissional ([n.º 10](#art-2-p10));
- a sistemas lançados sob **licença gratuita e de código aberto**, salvo se forem de risco elevado ou caírem no [art. 5.º](#art-5) ou no [art. 50.º](#art-50) ([n.º 12](#art-2-p12)).

Três ressalvas que mudam o alcance dessas portas de saída:

- **"Exclusivamente" é palavra dura**, como na [LGPD](/notas/lgpd#art-4). Um sistema de uso duplo — civil e militar — não se beneficia da exclusão de defesa, e um projeto de pesquisa que vira produto sai da dispensa científica no instante em que é colocado no mercado.
- **A dispensa do software livre é estreita.** Ela cai inteira se o sistema for de risco elevado, se incorrer numa prática proibida ou se atrair um dever de transparência. Sobra para o risco mínimo. Nos **modelos** de finalidade geral, o regime aberto é outro e está no [art. 53.º, n.º 2](#art-53-p2): dispensa de documentação técnica e de informação a jusante, mantidos a política de direito de autor e o sumário do treino — e nada disso vale para modelo com risco sistêmico.
- **Não aplicação não é vácuo normativo.** O [art. 2.º, n.º 7](#art-2-p7) diz que o direito da União sobre proteção de dados, privacidade e confidencialidade das comunicações continua a se aplicar aos dados pessoais tratados no cumprimento do regulamento, e que o AI Act **não afeta** o RGPD nem as diretivas ePrivacy e de proteção de dados na aplicação da lei. O [n.º 5](#art-2-p5) preserva o regime de responsabilidade dos intermediários do DSA, e o [n.º 9](#art-2-p9), a legislação de consumo e de segurança de produtos.

Um número separado é uma cláusula de piso, não de teto: o [n.º 11](#art-2-p11) permite aos Estados-Membros manter ou introduzir normas **mais favoráveis aos trabalhadores** quanto ao uso de IA pelos empregadores, e incentivar convenções coletivas mais protetivas. É a única abertura expressa desse tipo no regulamento.

## A pirâmide de risco

O desenho central é uma escada de quatro degraus, com um regime transversal ao lado.

### Risco inaceitável: as práticas proibidas ([art. 5.º](#art-5))

Rol **fechado**, aplicável desde 2 de fevereiro de 2025, que nenhum ato da Comissão pode ampliar ou reduzir — só o legislador europeu, como o próprio Digital Omnibus demonstrou. São proibidos:

- técnicas **subliminares**, manifestamente manipuladoras ou enganadoras que distorçam substancialmente o comportamento e causem, ou possam causar, danos significativos ([alínea a)](#art-5-p1-a));
- exploração de **vulnerabilidades** ligadas a idade, incapacidade ou situação socioeconômica específica, com o mesmo efeito ([alínea b)](#art-5-p1-b));
- **classificação social** de pessoas ou grupos por comportamento social ou características pessoais, quando leve a tratamento prejudicial descontextualizado ou desproporcionado ([alínea c)](#art-5-p1-c)) — e a proibição alcança agentes **privados**, não só o Estado;
- previsão do **risco de uma pessoa cometer infração penal** com base exclusivamente em perfilamento ou em traços de personalidade, ressalvados os sistemas que apoiam avaliação humana já fundada em fatos objetivos e verificáveis ([alínea d)](#art-5-p1-d));
- criação ou expansão de bases de **reconhecimento facial** por recolha não seletiva de imagens da internet ou de circuito fechado de televisão ([alínea e)](#art-5-p1-e));
- **reconhecimento de emoções** no local de trabalho e em instituições de ensino, salvo por razões médicas ou de segurança ([alínea f)](#art-5-p1-f));
- **categorização biométrica** para deduzir raça, opiniões políticas, filiação sindical, convicções religiosas ou filosóficas, vida sexual ou orientação sexual ([alínea g)](#art-5-p1-g));
- **identificação biométrica à distância em tempo real** em espaços acessíveis ao público para aplicação da lei, salvo em três hipóteses taxativas — busca de vítimas de rapto, tráfico ou exploração sexual e de pessoas desaparecidas; ameaça específica e iminente à vida ou de atentado terrorista; e localização de suspeito de infração do Anexo II punível com pena máxima não inferior a quatro anos ([alínea h)](#art-5-p1-h)).

A última proibição vem com um procedimento inteiro em torno dela: autorização prévia de autoridade judiciária ou administrativa independente, com prazo de 24 horas para regularizar o uso urgente ([n.º 3](#art-5-p3)); avaliação de impacto sobre os direitos fundamentais e registro na base de dados da UE antes do uso ([n.º 2](#art-5-p2)); notificação de cada uso à autoridade de fiscalização do mercado e à autoridade de proteção de dados ([n.º 4](#art-5-p4)); e, sobretudo, **habilitação por lei nacional** ([n.º 5](#art-5-p5)) — sem ela, a exceção não existe naquele Estado-Membro. É proibição com válvula, e a válvula só abre se o legislador nacional a abrir.

#### As duas proibições novas: nudificadores e material de abuso sexual infantil

O Digital Omnibus acrescentou as alíneas [b-A)](#art-5-p1-ba) e [b-B)](#art-5-p1-bb), aplicáveis a partir de **2 de dezembro de 2026**:

- **imagens íntimas não consentidas** — colocar no mercado, colocar em serviço ou utilizar sistema que gere ou manipule imagens, vídeos ou áudios **realistas** das partes íntimas de pessoa identificável, ou dessa pessoa em comportamento sexualmente explícito, sem que a pessoa tenha dado **livremente** consentimento "específico, informado, inequívoco e explícito" — é o padrão do RGPD com um adjetivo a mais. São as aplicações conhecidas como _nudifiers_;
- **material de abuso sexual infantil**, na definição da [Diretiva 2011/93/UE](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32011L0093), salvo quando o direito nacional reconheça causa de exclusão da ilicitude.

O novo [n.º 1-A](#art-5-p1a) separa prestador e responsável pela implantação:

- para o **prestador**, a colocação no mercado só é proibida se gerar esse material for a **finalidade prevista** do sistema, ou se o desenho, o treino, a arquitetura ou as funcionalidades expostas ao usuário tornarem esse resultado **razoavelmente previsível e reprodutível sem modificação técnica significativa** e o sistema não dispuser de medidas de segurança e salvaguardas razoáveis e adequadas para impedi-lo e corrigir o uso indevido observado ou assinalado;
- para o **responsável pela implantação**, o uso só é proibido quando ele usa o sistema **para gerar** esse material.

A segunda hipótese transforma a ausência de salvaguardas técnicas num **pressuposto de licitude da colocação no mercado**. Deixou de ser boa prática de engenharia para virar critério de conformidade: é a arquitetura interna do modelo que decide se ele pode ser colocado no mercado.

O [n.º 1-B](#art-5-p1b) recorta a borda: manipular material preexistente sem **aumentar a visibilidade** das partes íntimas nem alterar a natureza do comportamento sexual retratado não é "manipulação" para esse efeito. Mudar fundo, ajustar brilho ou acrescentar legenda fica de fora.

> _Exemplo._ O **Retrato** é um gerador de imagens de uso geral, sem finalidade erótica declarada. Se, com comandos triviais e sem alteração de código, ele produzir nus realistas de pessoas identificáveis, e a fornecedora não tiver filtros nem mecanismo de correção de abusos reportados, ela incorre na proibição a partir de 2 de dezembro de 2026 — ainda que jamais tenha pretendido esse uso. Já a agência que usa o Retrato para gerar imagens de produtos não incorre em nada, mesmo sabendo que o sistema é mal salvaguardado. O dever de blindar é de quem coloca no mercado; o de não usar para aquele fim é de quem implanta. _(Nome fictício; a situação foi construída para ilustrar o dispositivo.)_

A janela entre 27 de julho e 2 de dezembro de 2026 é deliberada: são quatro meses para os prestadores implantarem as medidas técnicas de que a licitude passa a depender. Nesse intervalo continuam a operar o direito penal nacional, a Diretiva 2011/93/UE e a [Diretiva (UE) 2024/1385](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024L1385) sobre violência contra as mulheres.

No Brasil, a mesma preocupação foi endereçada por outra via, e mais estreita: o dever de remoção e comunicação do [art. 27 do ECA Digital](/notas/eca-digital#art-27), a vedação de monetização do [art. 23](/notas/eca-digital#art-23) e, no plano penal, os arts. 218-C e 147-B do Código Penal, este com a agravante que a Lei nº 15.123/2025 acrescentou para o uso de inteligência artificial. Nenhum deles proíbe **colocar no mercado** a ferramenta.

### Risco elevado: as duas portas de entrada ([arts. 6.º](#art-6) e [7.º](#art-7))

**Primeira porta — IA embarcada em produto regulado ([art. 6.º, n.º 1](#art-6-p1)).** O sistema é componente de segurança de um produto, ou é ele próprio o produto, abrangido pela legislação de harmonização do **Anexo I**, *e* esse produto está sujeito a avaliação da conformidade por terceiros.

O Anexo I tem duas seções, e a diferença entre elas decide **quanto** do AI Act se aplica:

| Seção do Anexo I | O que está lá | O que se aplica |
| --- | --- | --- |
| **A** | Dispositivos médicos, diagnóstico _in vitro_, brinquedos, elevadores, equipamentos de proteção individual, aparelhos a gás, embarcações de recreio | O regulamento inteiro; os [arts. 8.º a 15.º](#art-8) são verificados **dentro** do procedimento setorial de conformidade ([art. 43.º, n.º 3](#art-43-p3)) |
| **B** | Aviação civil, veículos a motor, tratores, motociclos, equipamentos marítimos, ferrovias e — desde o Omnibus — **máquinas** | Apenas o [art. 6.º, n.º 1](#art-6-p1), o [art. 60.º-A](#art-60-a) e os [arts. 102.º a 112.º](#art-102) ([art. 2.º, n.º 2](#art-2-p2)); os requisitos substantivos migram para a legislação do setor |

Estar na Seção B é, na prática, sair do regime de risco elevado do AI Act. Foi esse o efeito de mover o **Regulamento Máquinas** de uma seção para a outra. Uma expectativa que circulou durante a negociação não se confirmou: **dispositivos médicos e brinquedos permaneceram na Seção A**.

O Omnibus estreitou essa porta por mais dois lados. O conceito de **componente de segurança** foi redefinido em torno da ideia de função de segurança: IA usada apenas para assistência ao utilizador, otimização de desempenho, eficiência do serviço, automatização, conveniência ou controle de qualidade **não** é componente de segurança ([art. 6.º, n.º 1-A](#art-6-p1a)) — salvo se a falha puser em perigo a saúde e a segurança ([n.º 1-B](#art-6-p1b)); e a avaliação por terceiros exigida só por riscos alheios à saúde e à segurança, como interferência eletromagnética, não satisfaz a condição do n.º 1, alínea b) ([n.º 1-C](#art-6-p1c)). Estar integrado num produto regulado deixou de significar, por si só, cumprir função de segurança.

Ao lado disso entrou uma **cláusula de equivalência** no [art. 2.º, n.º 13](#art-2-p13): quando a legislação do Anexo I, Seção A, já impuser proteção equivalente ou superior, a aplicação de requisitos dos [arts. 9.º a 15.º](#art-9) e [17.º a 25.º](#art-17) pode ser **limitada**, sem reduzir o nível global de proteção. Ela ainda não produz efeito nenhum: depende de atos delegados que a Comissão deve adotar **até 2 de agosto de 2027**, dizendo quais sistemas, quais requisitos e em que medida.

**Segunda porta — os oito domínios do Anexo III ([art. 6.º, n.º 2](#art-6-p2))**: dados biométricos; infraestruturas críticas; educação e formação profissional; emprego e gestão de trabalhadores; acesso a serviços privados essenciais e a serviços e prestações públicos essenciais — inclusive avaliação de solvabilidade e tarifação de seguros de vida e saúde; aplicação da lei; migração, asilo e controle de fronteiras; administração da justiça e processos democráticos.

O [art. 7.º](#art-7) autoriza a Comissão a alterar o Anexo III por **ato delegado**, acrescentando, modificando ou suprimindo casos de uso segundo critérios fixados no próprio artigo. É a válvula de atualização do regulamento sem reabrir o processo legislativo.

#### A porta de saída: a derrogação do [art. 6.º, n.º 3](#art-6-p3)

Um sistema listado no Anexo III **não** é de risco elevado se não representar risco significativo para a saúde, a segurança ou os direitos fundamentais — o que se presume em quatro situações: tarefa processual restrita; melhoria do resultado de atividade humana já concluída; detecção de padrões decisórios sem substituir nem influenciar avaliação humana já concluída; e tarefa meramente preparatória.

Duas travas fecham a porta. A primeira: será **sempre** de risco elevado o sistema que execute **definição de perfis** de pessoas singulares. A segunda: quem invoca a derrogação deve **documentar a avaliação antes** de colocar o sistema no mercado, registrá-lo na base de dados da UE ([art. 49.º, n.º 2](#art-49-p2)) e apresentar a documentação à autoridade que a pedir ([art. 6.º, n.º 4](#art-6-p4)).

A Comissão havia proposto eliminar esse registro. O texto final o manteve e limitou-se a enxugar dois campos do Anexo VIII, Seção B — o considerando 22 do Omnibus registra que registrar os sistemas autoexcluídos é "essencial para uma supervisão eficaz do mercado e para a responsabilização pública".

> _Exemplo._ A **Peneira** é um programa de recrutamento vendido a redes de varejo. Na primeira versão, ele só lê currículos, extrai formação e experiência para uma planilha e ordena tudo por data de envio; quem decide é o RH. A fornecedora conclui que isso é tarefa processual restrita — pode estar certa, mas não escreve a avaliação em lugar nenhum e não faz o registro. Já descumpre o [art. 6.º, n.º 4](#art-6-p4). Na versão seguinte, a Peneira passa a dar a cada candidato uma nota de aderência à vaga calculada a partir do histórico de contratações. Agora ela traça perfis de pessoas, e não há avaliação que salve: o próprio [art. 6.º, n.º 3](#art-6-p3) diz que sistemas do Anexo III que definem perfis são **sempre** de risco elevado. _(Nome fictício.)_

### Risco de transparência ([art. 50.º](#art-50))

Nem proibido nem de risco elevado, mas capaz de enganar: sistemas que interagem com pessoas, que geram conteúdo sintético, que reconhecem emoções ou que produzem falsificações profundas. O dever é de **informar e marcar**, sem avaliação prévia de conformidade — tratado em seção própria, abaixo.

### Risco mínimo

Todo o resto: filtros de mensagens indesejadas, IA de videojogos, recomendação de catálogo. Sem obrigações próprias, salvo o dever transversal de **literacia** do [art. 4.º](#art-4) e a possibilidade de adesão voluntária aos códigos de conduta do [art. 95.º](#art-95).

## Deveres e vedações essenciais

O que o regulamento veda, reunido numa lista só — cada item é o reverso de um dever detalhado adiante. **É proibido:**

- **Colocar no mercado, colocar em serviço ou utilizar** sistema que incorra em qualquer prática do [art. 5.º](#art-5) — o único degrau cujo descumprimento leva ao teto de 7% do volume de negócios ([art. 99.º, n.º 3](#art-99-p3)).
- **Colocar no mercado sistema de risco elevado** sem gestão de riscos, governação de dados, documentação técnica, manutenção de registos, transparência ao responsável pela implantação, supervisão humana e níveis adequados de exatidão, solidez e cibersegurança ([arts. 8.º a 15.º](#art-8)).
- **Afixar a marcação CE** sem avaliação da conformidade concluída e declaração UE de conformidade emitida ([arts. 43.º](#art-43), [47.º](#art-47) e [48.º](#art-48)).
- **Invocar a derrogação** do [art. 6.º, n.º 3](#art-6-p3) sem documentar a avaliação antes da colocação no mercado — e invocá-la em qualquer caso quando o sistema executar definição de perfis.
- **Implantar sistema de risco elevado fora da finalidade prevista** pelo prestador, ou sem atribuir a supervisão humana a pessoas com as competências, a formação e a **autoridade** necessárias ([art. 26.º, n.os 1 e 2](#art-26-p1)).
- **Deixar de informar previamente os trabalhadores e seus representantes** antes de pôr em serviço, no local de trabalho, sistema de risco elevado que os afete ([art. 26.º, n.º 7](#art-26-p7)).
- **Deixar de informar a pessoa afetada** quando um sistema de risco elevado do Anexo III for usado para tomar, ou ajudar a tomar, decisão que a atinja ([art. 26.º, n.º 11](#art-26-p11)).
- **Omitir a avaliação de impacto sobre os direitos fundamentais** quando o responsável pela implantação for organismo de direito público, entidade privada que preste serviços públicos ou implantar sistemas de avaliação de solvabilidade e de tarifação de seguros de vida e saúde ([art. 27.º](#art-27)).
- **Disponibilizar sistema** que interaja com pessoas, gere conteúdo sintético ou produza falsificação profunda **sem a informação e a marcação** do [art. 50.º](#art-50).
- **Colocar no mercado modelo de finalidade geral** sem documentação técnica, informação a jusante, política de cumprimento do direito de autor e sumário público do conteúdo de treino ([art. 53.º](#art-53)).
- **Deixar de notificar a Comissão** ao atingir o limiar de risco sistêmico ([art. 52.º](#art-52)), e de avaliar, atenuar, comunicar incidentes graves e assegurar cibersegurança adequada nesses modelos ([art. 55.º](#art-55)).
- **Deixar de comunicar incidentes graves** à autoridade de fiscalização do mercado e de adotar medidas corretivas quando o sistema deixar de estar conforme ([arts. 20.º](#art-20) e [73.º](#art-73)).
- **Obstruir a fiscalização** ou prestar informação incorreta, incompleta ou falaciosa a organismos notificados e autoridades competentes — infração com teto próprio ([art. 99.º, n.º 5](#art-99-p5)).

Um limite fecha a lista, e é dirigido a quem experimenta: participar de um ambiente de testagem **não afasta** os poderes de supervisão e correção das autoridades, nem exime o participante de responder por danos causados a terceiros ([art. 57.º](#art-57)) — ver "Inovação", abaixo.

## Requisitos dos sistemas de risco elevado ([arts. 8.º a 15.º](#art-8))

Sete requisitos, cumulativos e verificados ao longo de todo o ciclo de vida:

- **Gestão de riscos** ([art. 9.º](#art-9)) — processo iterativo e contínuo, planejado e executado durante todo o ciclo de vida, com identificação, estimativa e atenuação dos riscos previsíveis, inclusive os de utilização indevida razoavelmente previsível.
- **Dados e governação de dados** ([art. 10.º](#art-10)) — conjuntos de treino, validação e teste pertinentes, suficientemente representativos, tão isentos de erros e completos quanto possível para a finalidade prevista, com exame de enviesamentos e consideração do contexto geográfico, comportamental e funcional de uso.
- **Documentação técnica** ([art. 11.º](#art-11)) — elaborada **antes** da colocação no mercado, com o conteúdo mínimo do Anexo IV e mantida atualizada. O Omnibus criou aqui uma via simplificada: PME, empresas em fase de arranque e pequenas empresas de média capitalização podem usar um formulário simplificado que a Comissão deve criar e que os **organismos notificados são obrigados a aceitar**.
- **Manutenção de registos** ([art. 12.º](#art-12)) — registro automático de eventos ao longo do ciclo de vida, com rastreabilidade proporcional à finalidade.
- **Transparência e prestação de informações** ([art. 13.º](#art-13)) — funcionamento transparente o bastante para que o responsável pela implantação interprete os resultados e os use adequadamente, com instruções de utilização claras, completas e acessíveis.
- **Supervisão humana** ([art. 14.º](#art-14)) — concepção que permita a pessoas singulares supervisionar o sistema eficazmente enquanto ele está em uso, por medidas embutidas pelo prestador ou executáveis pelo responsável pela implantação.
- **Exatidão, solidez e cibersegurança** ([art. 15.º](#art-15)) — desempenho coerente ao longo do ciclo de vida, resiliência a erros, falhas e incoerências, e níveis de exatidão declarados nas instruções de utilização.

### Dados sensíveis para corrigir viés: o novo [art. 4.º-A](#art-4-a)

O desenho original tinha um impasse: exigir prova de ausência de discriminação racial ou de gênero sem permitir tratar os dados que a revelariam. O Omnibus revogou o antigo art. 10.º, n.º 5, e transformou a solução num artigo próprio, mais detalhado — e, por estar no Capítulo I, **fora do adiamento** do Capítulo III: vale desde 27 de julho de 2026.

O tratamento excecional de **categorias especiais de dados pessoais** para detectar e corrigir enviesamentos depende de seis condições cumulativas ([art. 4.º-A, n.º 1](#art-4-a-p1)): impossibilidade de obter o resultado com dados sintéticos ou anonimizados; limitações técnicas de reutilização e medidas de segurança que reflitam o estado da arte, incluindo pseudonimização; controle rigoroso e documentado de acesso; proibição de transmissão a terceiros; eliminação assim que corrigido o enviesamento ou vencido o prazo de conservação; e registro das razões nas atividades de tratamento.

O [n.º 2](#art-4-a-p2) estende a faculdade — e o texto diz expressamente que não cria dever — a prestadores e responsáveis pela implantação de **outros** sistemas e modelos, inclusive os que não são de risco elevado. A Comissão propusera rebaixar o critério de "estritamente necessário" para simples "necessário"; os colegisladores restabeleceram a estrita necessidade.

Duas consequências de método. O artigo opera como especificação de interesse público relevante à luz do art. 9.º, n.º 2, alínea g), do [RGPD](/notas/gdpr#art-9-p2-g), sem constituir base jurídica autônoma. E ele não legitima tratamento anterior: o dispositivo revogado nunca chegou a produzir efeitos, de modo que, até 27 de julho de 2026, o AI Act nunca ofereceu base para esse tratamento — o que houve antes se avalia só pelo RGPD. É o mesmo dilema que a [LGPD](/notas/lgpd#art-11) enfrenta no art. 11, sem solução equivalente.

## Obrigações por papel na cadeia ([arts. 16.º a 27.º](#art-16))

- **Prestador** ([art. 16.º](#art-16)) — assegurar a conformidade com os requisitos acima; manter **sistema de gestão da qualidade** ([art. 17.º](#art-17)); conservar documentação ([art. 18.º](#art-18)) e os registos gerados automaticamente ([art. 19.º](#art-19)); adotar **medidas corretivas** e informar a cadeia e as autoridades quando o sistema deixar de estar conforme ([art. 20.º](#art-20)); cooperar com as autoridades ([art. 21.º](#art-21)); designar **mandatário** na União, se estabelecido em país terceiro ([art. 22.º](#art-22)); realizar a avaliação da conformidade, emitir a declaração UE, afixar a marcação CE e registrar o sistema.
- **Importador** ([art. 23.º](#art-23)) e **distribuidor** ([art. 24.º](#art-24)) — verificar a conformidade formal antes de disponibilizar o sistema, não o colocar no mercado se souberem ou tiverem motivos para crer que não está conforme, e cooperar com as autoridades.
- **Responsável pela implantação** ([art. 26.º](#art-26)) — usar o sistema conforme as instruções; atribuir a supervisão humana a pessoas competentes, formadas e com autoridade; assegurar a pertinência dos dados de entrada sob seu controle; controlar o funcionamento e **suspender o uso** diante de risco; conservar os registos por pelo menos **seis meses**; informar trabalhadores e seus representantes antes do uso no local de trabalho; e informar as pessoas afetadas por decisões tomadas ou apoiadas por sistemas do Anexo III. Autoridades públicas devem ainda cumprir a obrigação de registro do [art. 49.º](#art-49) — e, se verificarem que o sistema não está registrado, **não podem usá-lo**.

### Quando o cliente vira prestador ([art. 25.º](#art-25))

Distribuidor, importador, responsável pela implantação ou terceiro **passa a ser considerado prestador** de um sistema de risco elevado se apuser o próprio nome ou marca, se introduzir **modificação substancial** ou se **alterar a finalidade prevista** de modo a tornar o sistema de risco elevado. É a regra que impede a diluição de responsabilidade por reetiquetagem, e a que mais preocupa integradores e revendedores.

O Omnibus acrescentou o outro lado da moeda. O prestador inicial, que deixa de sê-lo daquele sistema, passa a dever **cooperar estreitamente** com o novo prestador: documentação técnica suficiente, informação sobre limitações e modos de falha conhecidos e acesso técnico direcionado. Há uma saída contratual — o dever não se aplica quando o prestador inicial tiver **especificado claramente** que o seu sistema não deve ser convertido em sistema de risco elevado. É cláusula que muda minuta de contrato de fornecimento.

> _Exemplo._ O **Vigia** é vendido a transportadoras com uma finalidade escrita nas instruções de utilização: detectar sinais de sonolência ao volante e alertar o motorista. Uma transportadora resolve usar os alertas acumulados para montar um ranking mensal e decidir quem recebe as melhores rotas. Dois problemas de uma vez: ela usa o sistema fora da finalidade prevista, contra o [art. 26.º](#art-26); e, ao transformar um sistema de segurança num sistema de **gestão de trabalhadores**, ela mesma vira prestadora, assumindo as obrigações do [art. 16.º](#art-16) sobre um produto que não desenvolveu. _(Nome fictício.)_

### Avaliação de impacto sobre os direitos fundamentais ([art. 27.º](#art-27))

Devida **antes da primeira utilização** de sistema do Anexo III — excluído o ponto 2, infraestruturas críticas — por organismos de direito público, por entidades privadas que prestem serviços públicos e por quem implante sistemas de **avaliação de solvabilidade** ou de **tarifação de seguros de vida e saúde**. Deve descrever processos, período e frequência de uso, categorias de pessoas afetadas, riscos específicos de danos, medidas de supervisão humana e providências para o caso de o risco se materializar. O resultado é notificado à autoridade de fiscalização do mercado, com o modelo preenchido.

O gatilho é a **função** exercida, e não o porte nem a natureza da empresa. Um banco cai na obrigação sem prestar serviço público nenhum, por implantar avaliação de crédito; uma concessionária que opere agendamento de consultas da rede pública cai por prestar serviço público, ainda que privada.

O Omnibus articulou essa avaliação com a **avaliação de impacto sobre a proteção de dados** do art. 35.º do [RGPD](/notas/gdpr#art-35): o [n.º 4](#art-27-p4) permite remeter a seções da avaliação já feita ou incorporar partes dela, e o [n.º 5](#art-27-p5) encarrega o Serviço para a IA de criar um modelo de questionário, inclusive por sistema automatizado, que viabilize essas remissões. É o ponto do Omnibus com paralelo brasileiro mais direto: é a mesma pergunta sobre como articular o relatório de impacto do [art. 38 da LGPD](/notas/lgpd#art-38) com a avaliação de impacto algorítmico que o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) prevê.

## Avaliação da conformidade, marcação CE e registro ([arts. 40.º a 49.º](#art-40))

O caminho normal do risco elevado é a **autoavaliação** apoiada em **normas harmonizadas** europeias: quem segue norma cuja referência foi publicada no Jornal Oficial goza de **presunção de conformidade** ([art. 40.º](#art-40)). Na falta delas, a Comissão pode adotar **especificações comuns** por ato de execução ([art. 41.º](#art-41)).

Quem faz o quê depende do domínio:

| Sistema | Procedimento |
| --- | --- |
| Anexo III, **ponto 1** (biometria) | Aplicadas as normas harmonizadas ou as especificações comuns, o prestador **escolhe** entre controle interno (Anexo VI) e **organismo notificado** (Anexo VII); sem elas, só o Anexo VII ([art. 43.º, n.º 1](#art-43-p1)) |
| Anexo III, **pontos 2 a 8** | Controle interno (Anexo VI), **sem** organismo notificado ([art. 43.º, n.º 2](#art-43-p2)) |
| Anexo I, **Seção A** | O procedimento setorial já aplicável ao produto, no qual os requisitos dos [arts. 8.º a 15.º](#art-8) passam a ser avaliados ([art. 43.º, n.º 3](#art-43-p3)) |

Para a maior parte dos sistemas do Anexo III — emprego, crédito, educação, serviços públicos essenciais —, **não há certificação por terceiro**: o prestador avalia a si mesmo, declara a conformidade, afixa a marcação CE e registra o sistema. O controle externo é posterior, e fica com a fiscalização do mercado. A tabela desmente a intuição de que uma lei de segurança de produtos certifica antes de vender.

Três atos fecham o ciclo: a **declaração UE de conformidade** ([art. 47.º](#art-47)), mantida à disposição das autoridades por dez anos; a **marcação CE** ([art. 48.º](#art-48)), que pode ser digital quando o sistema é disponibilizado digitalmente; e o **registro na base de dados da UE** ([art. 49.º](#art-49)), com seção não pública para os usos de aplicação da lei, migração, asilo e fronteiras. Sistemas de infraestruturas críticas são registrados em nível nacional.

Modificação substancial obriga a **novo procedimento** de avaliação ([art. 43.º, n.º 4](#art-43-p4)) — com uma exceção pensada para sistemas que continuam a aprender depois de colocados no mercado: alterações predeterminadas pelo prestador na avaliação inicial e descritas na documentação técnica não contam como modificação substancial.

## Modelos de IA de finalidade geral ([arts. 51.º a 56.º](#art-51))

Camada acrescentada tardiamente à negociação, sob o impacto dos modelos generativos de grande escala. Ela não segue a pirâmide de risco: incide sobre o **modelo**, e não sobre o uso.

**Todos os prestadores de modelos de finalidade geral** devem ([art. 53.º](#art-53)): elaborar e manter a documentação técnica do modelo, com o conteúdo mínimo do Anexo XI; disponibilizar informação e documentação aos prestadores a jusante que integrem o modelo em seus sistemas (Anexo XII); aplicar uma **política de cumprimento do direito de autor**, inclusive quanto à reserva de direitos da diretiva de direito de autor; e publicar um **sumário suficientemente pormenorizado do conteúdo usado no treino**, segundo modelo do Serviço para a IA. Prestadores de países terceiros designam **mandatário** ([art. 54.º](#art-54)).

**Risco sistêmico** ([art. 51.º](#art-51)) presume-se quando a quantidade acumulada de computação usada no treino ultrapassa **10²⁵ operações de vírgula flutuante**. O limiar é um número, e por isso alterável por ato delegado da Comissão à medida que o estado da arte avança. A Comissão também pode designar um modelo por decisão, com base nos critérios do Anexo XIII, de ofício ou após alerta qualificado do painel científico.

Atingido o limiar, o prestador **notifica a Comissão** sem demora e, em qualquer caso, **em até duas semanas** contadas do momento em que o requisito foi preenchido ou em que se soube que seria ([art. 52.º, n.º 1](#art-52-p1)) — não da data de lançamento do modelo. Quem entende que o modelo não apresenta risco sistêmico apesar do tamanho notifica assim mesmo e apresenta, junto, argumentos fundamentados ([n.º 2](#art-52-p2)). Silêncio não é defesa: a Comissão pode designar o modelo por conta própria, e publica a lista dos designados.

Aos modelos com risco sistêmico somam-se quatro deveres ([art. 55.º](#art-55)): avaliação do modelo segundo protocolos que reflitam o estado da arte, com **testagem antagônica** documentada; avaliação e atenuação dos riscos sistêmicos no nível da União; comunicação de **incidentes graves** ao Serviço para a IA; e cibersegurança adequada do modelo e da infraestrutura física.

**A dispensa do código aberto tem contorno preciso** ([art. 53.º, n.º 2](#art-53-p2)): modelos sob licença gratuita e aberta que permita acesso, uso, modificação e distribuição, com parâmetros, arquitetura e informações de uso públicos, ficam livres da documentação técnica e da informação a jusante — mas não da política de direito de autor nem do sumário de treino. E a dispensa **não vale** para modelo com risco sistêmico, que responde por tudo.

Enquanto não há norma harmonizada, o meio de demonstrar cumprimento são os **códigos de práticas** do [art. 56.º](#art-56), conduzidos pelo Serviço para a IA. Aderir é voluntário; quem não adere e não segue norma harmonizada tem de demonstrar meios alternativos adequados, submetidos à avaliação da Comissão. É adesão voluntária com custo real de não aderir.

## Transparência de conteúdos gerados por IA ([art. 50.º](#art-50))

Aplicável desde **2 de agosto de 2026**, e a parte do regulamento com efeito mais visível para o público. Quatro deveres, repartidos entre quem fornece e quem usa:

| Dever | De quem | Ressalva principal |
| --- | --- | --- |
| Informar que se interage com uma IA ([n.º 1](#art-50-p1)) | Prestador | Dispensado quando for óbvio para pessoa razoavelmente informada, atenta e advertida |
| Marcar o conteúdo sintético em **formato legível por máquina** ([n.º 2](#art-50-p2)) | Prestador | Dispensado no apoio à edição normalizada e quando o sistema não altera substancialmente os dados de entrada |
| Informar as pessoas expostas a reconhecimento de emoções ou categorização biométrica ([n.º 3](#art-50-p3)) | Responsável pela implantação | Usos legalmente autorizados de aplicação da lei |
| Revelar que o conteúdo é **falsificação profunda**, ou que o texto de interesse público foi gerado por IA ([n.º 4](#art-50-p4)) | Responsável pela implantação | Obra artística, criativa, satírica ou ficcional: divulga-se sem prejudicar a fruição. Texto com **revisão humana ou controle editorial** e responsável editorial identificado fica de fora |

A informação é prestada de forma clara e percetível **na primeira interação ou exposição**, e deve observar os requisitos de acessibilidade ([n.º 5](#art-50-p5)).

Duas leituras que a tabela não entrega. A primeira: o **n.º 2 é dever de engenharia**, não de rótulo. Marcar em formato legível por máquina, com soluções "eficazes, interoperáveis, sólidas e fiáveis", é uma exigência de proveniência embutida no arquivo — não a etiqueta visível que o n.º 4 pede de quem publica. A segunda: os dois níveis têm destinatários diferentes, e quem gera o conteúdo com uma ferramenta de terceiro responde só pelo segundo.

O art. 50.º **não** foi alcançado pelo adiamento do Omnibus. A única concessão foi de transição: sistemas generativos já colocados no mercado antes de 2 de agosto de 2026 têm até **2 de dezembro de 2026** para cumprir a marcação legível por máquina ([art. 111.º, n.º 4](#art-111-p4)).

No Brasil não há dever geral equivalente. O [ECA Digital](/notas/eca-digital) impõe obrigações a serviços de IA generativa apenas na proteção de crianças e adolescentes ([Decreto nº 12.880/2026, art. 11](/notas/eca-digital#dec12880-art-11)), e a Justiça Eleitoral disciplina o tema só no período de campanha. Um dever transversal de marcação é uma das novidades do [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233).

### O art. 50.º visto do Brasil: o Radar Tecnológico nº 6

O [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (ANPD, 2026) compara regimes e cita o art. 50.º como exemplo do padrão que chama de **transparência**. É didático e não firma posicionamento institucional. Três contribuições:

**Os três padrões regulatórios em uso no mundo**, frequentemente combinados: (i) **transparência**, obrigando a sinalizar conteúdo sintético — de que o art. 50.º é o caso mais amplo; (ii) **vedações eleitorais** em janela próxima ao pleito — a Coreia do Sul veda produção, edição, distribuição e publicação de vídeos sintéticos de campanha nos 90 dias anteriores à eleição, e o Brasil, pelas Resoluções nºs 23.732/2024 e 23.755/2026 do TSE, veda conteúdo sintético que substitua ou altere imagem ou voz de pessoa viva, falecida ou fictícia, exige rotulagem quando o uso é admitido e proíbe publicar, republicar ou impulsionar novos conteúdos sintéticos com imagem, voz ou manifestação de candidato ou pessoa pública entre 72 horas antes e 24 horas depois do fim do pleito, **ainda que rotulados**; e (iii) **criminalização** de abusos, sobretudo sexuais — Coreia do Sul, Reino Unido, França, Austrália e o _Take It Down Act_ norte-americano de 2025.

O contraste com o AI Act é de arquitetura. A União Europeia escolheu o primeiro padrão e o fez **transversal**: qualquer conteúdo sintético, em qualquer contexto, marcado e detectável. O Brasil escolheu os outros dois, e de forma **setorial** — a regra eleitoral só vale em campanha, a criminal só depois do dano, e não há tipo penal específico para conteúdo sintético.

**A marcação é mais confiável do que a detecção.** O Radar analisou comparativamente três ferramentas comerciais de detecção e registra que nenhuma identificou com segurança os casos testados, dando respostas incertas tanto para material sintético quanto para material original de baixa resolução — daí a recomendação de combinar ferramenta e avaliação humana. Do outro lado, lista os mecanismos de **proveniência**: assinaturas criptográficas, marcas d'água visíveis e invisíveis e padrões de rastreabilidade como o [C2PA](https://c2pa.org/). O dado explica a opção do legislador europeu: exigir marcação **na origem**, por soluções interoperáveis e sólidas, é uma aposta em proveniência, que é o caminho que resta enquanto a detecção posterior falha.

**Cinco desafios** que o documento atribui à regulação de conteúdo sintético, e que ajudam a ler as ressalvas do próprio art. 50.º: ambiguidade conceitual; defasagem regulatória; equilíbrio entre direitos fundamentais — conter o abuso sem sufocar expressão legítima, que é o que a ressalva do uso artístico faz; identificação e responsabilização, diante do anonimato e da natureza transfronteiriça; e opacidade tecnológica. A conclusão é que regulações centradas no risco e nos usos, e não na tecnologia empregada, tendem a envelhecer melhor — a escolha declarada do AI Act.

## Direitos das pessoas afetadas

O AI Act não é uma lei de direitos individuais, e isso se nota na quantidade e na posição dos dispositivos. O núcleo é este:

- **Informação sobre o uso** ([art. 26.º](#art-26)) — quem for objeto de decisão tomada ou apoiada por sistema de risco elevado do Anexo III deve ser informado pelo responsável pela implantação; trabalhadores e seus representantes, antes do uso no local de trabalho.
- **Explicação da decisão individual** ([art. 86.º](#art-86)) — quem for objeto de decisão baseada nos resultados de sistema de risco elevado do Anexo III que produza **efeitos jurídicos**, ou o afete significativamente de modo adverso na saúde, na segurança ou nos direitos fundamentais, tem direito a explicações **claras e pertinentes** sobre o papel do sistema no processo decisório e sobre os principais elementos da decisão. Ficam de fora os sistemas de infraestruturas críticas, e o artigo só se aplica quando o direito da União não dispuser em contrário.
- **Queixa à autoridade de fiscalização do mercado** ([art. 85.º](#art-85)) — de qualquer pessoa singular ou coletiva com motivos para considerar que houve infração.
- **Denúncia protegida** ([art. 87.º](#art-87)) — as infrações ao regulamento entram no âmbito da [Diretiva (UE) 2019/1937](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L1937).
- **Ação coletiva** — o [art. 110.º](#art-110) acrescentou o próprio AI Act ao anexo da [Diretiva (UE) 2020/1828](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32020L1828), das ações representativas, abrindo a tutela coletiva de consumidores.

Duas ausências pesam na comparação com a [LGPD](/notas/lgpd) e com o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233). O AI Act não cria direito de **contestação** da decisão automatizada nem direito autônomo a **revisão humana** — o art. 22.º do [RGPD](/notas/gdpr#art-22) e o [art. 20 da LGPD](/notas/lgpd#art-20) continuam sendo a via. E o regulamento não cria regime de **responsabilidade civil**: a proposta de diretiva que ocuparia essa lacuna foi retirada pela Comissão em 2025, deixando a reparação ao direito nacional e ao regime de responsabilidade por produtos defeituosos.

## Inovação: ambientes de testagem, PME e software livre ([arts. 57.º a 63.º](#art-57))

- **Ambientes de testagem da regulamentação** ([art. 57.º](#art-57)) — cada Estado-Membro deve assegurar que sua autoridade competente crie **pelo menos um** ambiente nacional, operacional até **2 de agosto de 2027**, prazo adiado em um ano pelo Omnibus. O Serviço para a IA **pode** criar um ambiente à escala da União, restrito aos sistemas sob sua competência exclusiva, com acesso prioritário a PME e a pequenas empresas de média capitalização ([n.º 3-A](#art-57-p3a)); é faculdade sem prazo.
    - O ambiente **não suspende a fiscalização**: as autoridades mantêm os poderes de supervisão e correção e podem suspender a testagem se o risco não for atenuado ([n.º 11](#art-57-p11)); e o participante continua a responder por danos causados a terceiros. O que ele oferece em troca é **imunidade a coimas** por infração ao regulamento, para quem respeita o plano acordado e segue de boa-fé as orientações da autoridade ([n.º 12](#art-57-p12)). É esse o benefício concreto de entrar.
- **Tratamento ulterior de dados pessoais** ([art. 59.º](#art-59)) — dentro do ambiente de testagem, admite-se tratar dados licitamente recolhidos para outras finalidades no desenvolvimento de sistemas de **interesse público substancial**, sob condições estritas e cumulativas.
- **Testagem em condições reais** ([arts. 60.º](#art-60) e [61.º](#art-61)) — sujeita a plano aprovado, prazo limitado, registro, supervisão e **consentimento informado** dos participantes. O Omnibus estendeu o art. 60.º aos sistemas cobertos pela legislação do Anexo I, Seção A, e criou o [art. 60.º-A](#art-60-a), pelo qual os Estados-Membros **podem** admitir a testagem também para os da Seção B, adotando quadros próprios e notificando-os à Comissão.
- **Medidas para PME e empresas em fase de arranque** ([art. 62.º](#art-62)) — acesso prioritário aos ambientes de testagem, ações de sensibilização e formação, canais dedicados de comunicação, participação na normalização e **taxas de avaliação da conformidade reduzidas** proporcionalmente ao porte.
- **Derrogações simplificadoras** ([art. 63.º](#art-63)) — cumprimento simplificado de elementos do sistema de gestão da qualidade, sem redução do nível de proteção e sem isentar de nenhum outro requisito. O Omnibus estendeu a todas as PME a faculdade antes reservada às microempresas, e criou uma faixa nova, a das **pequenas empresas de média capitalização**, que passou a receber apoio regulatório e, nas coimas, o teto mais favorável.

## Quem pode o quê: a divisão de competências normativas

A pergunta que organiza as notas da [LGPD](/notas/lgpd#quem-pode-o-quê-a-divisão-de-competências-normativas), do [Marco Civil](/notas/mci#quem-pode-o-quê-a-divisão-de-competências-normativas) e do [ECA Digital](/notas/eca-digital#quem-pode-o-quê-a-divisão-de-competências-normativas) tem, na União Europeia, um degrau a mais: antes de saber qual instrumento pode dispor sobre o quê, é preciso saber **qual ordem jurídica** — a da União ou a nacional — está autorizada a dispor.

### Quem pode legislar

O AI Act é um **regulamento**, adotado pelo Parlamento Europeu e pelo Conselho com base nos arts. 16 e 114 do TFUE. Regulamento é diretamente aplicável: não se transpõe, não se regulamenta por lei nacional e não admite versão nacional divergente no campo harmonizado. É a diferença decisiva em relação a uma **diretiva**, que fixa o resultado e deixa a forma ao legislador nacional.

Alterar o AI Act exige, portanto, **novo ato legislativo** da União, pelo processo legislativo ordinário. Foi o percurso do Digital Omnibus: proposta da Comissão em 19 de novembro de 2025, acordo político entre Parlamento e Conselho em 7 de maio de 2026, adoção pelo Parlamento em 16 de junho, aprovação final do Conselho em 29 de junho, assinatura em 8 de julho e publicação em 24 de julho de 2026. Oito meses para adiar prazos e ajustar obrigações — um dado útil sobre a plasticidade real do regime.

### O que só o regulamento pode fazer

- **O rol de práticas proibidas** ([art. 5.º](#art-5)). A prova de que é lista fechada é que acrescentar duas proibições exigiu um regulamento alterador.
- **As definições de sistema de IA e de modelo de finalidade geral** ([art. 3.º](#art-3)). A Comissão pode publicar orientações interpretativas, e publicou; não pode redefinir os conceitos.
- **Os tetos das coimas** ([art. 99.º](#art-99)). Aos Estados-Membros o regulamento delegou fixar o regime concreto de sanções dentro desses limites.
- **A arquitetura de papéis** e a distribuição de deveres entre prestador, responsável pela implantação, importador e distribuidor.

### O que a Comissão pode fazer por ato delegado ou de execução

É o equivalente europeu da técnica que a [LGPD](/notas/lgpd#o-que-a-anpd-pode-fazer-por-regulamento) usa ao remeter pontos ao regulamento da ANPD: o legislador fixa o marco e transfere o detalhamento a quem acompanha a evolução técnica.

- **Atos delegados** ([art. 97.º](#art-97)) — alterar o **Anexo III** ([art. 7.º](#art-7)); ajustar os **limiares de risco sistêmico** dos modelos de finalidade geral ([art. 51.º, n.º 3](#art-51-p3)); especificar a **cláusula de equivalência** do [art. 2.º, n.º 13](#art-2-p13); e atualizar anexos técnicos. Ficam sujeitos a **direito de oposição** do Parlamento e do Conselho, que podem bloqueá-los ou revogar a delegação.
- **Atos de execução** ([art. 98.º](#art-98)) — **especificações comuns** quando faltam normas harmonizadas ([art. 41.º](#art-41)), modelos e formulários obrigatórios, regras comuns de transparência se o código de práticas do [art. 50.º, n.º 7](#art-50-p7) não bastar. Passam por comitologia, com o comité de Estados-Membros.
- **Orientações** ([art. 96.º](#art-96)) — instrumento interpretativo, não vinculante, mas de peso prático elevado: são elas que dizem, na prática, o que a Comissão considera uma prática proibida ou um sistema de IA. O artigo lista sete matérias, e para uma delas fixa prazo: as orientações sobre a articulação com a legislação de harmonização da Seção A do Anexo I devem sair **até 1º de agosto de 2027** ([alínea g)](#art-96-p1-g)).

### O degrau voluntário: normas harmonizadas, códigos de práticas e códigos de conduta

Peculiaridade europeia sem paralelo direto no arranjo brasileiro. Abaixo dos atos da Comissão há uma camada **tecnicamente vinculante sem ser juridicamente obrigatória**:

- **Normas harmonizadas** ([art. 40.º](#art-40)) — elaboradas pelos organismos europeus de normalização a pedido da Comissão. Segui-las é facultativo; quem as segue ganha presunção de conformidade, e quem não as segue tem de demonstrar a conformidade por outro caminho. O atraso na publicação das referências é a causa direta do adiamento do Omnibus.
- **Códigos de práticas** — do [art. 56.º](#art-56), para modelos de finalidade geral, e do [art. 50.º, n.º 7](#art-50-p7), para a marcação de conteúdo sintético. Negociados sob condução do Serviço para a IA, com participação dos prestadores e da sociedade civil; a adesão é meio de demonstrar cumprimento.
- **Códigos de conduta** ([art. 95.º](#art-95)) — adesão voluntária, por quem não é de risco elevado, a requisitos análogos aos do risco elevado.

Esse desenho transfere para fora do processo legislativo — e, no caso das normas harmonizadas, para dentro de organismos técnicos privados — parte substancial da definição concreta das obrigações. As normas do CEN e do CENELEC não são publicadas no Jornal Oficial nem são de acesso gratuito: o que se publica é a referência delas.

### Quem fiscaliza

Não há autoridade única, e sim repartição por objeto:

- **Serviço para a IA** ([art. 64.º](#art-64)), na Comissão — competência exclusiva sobre os **modelos** de finalidade geral ([arts. 88.º a 94.º](#art-88)), com poderes de pedido de documentação ([art. 91.º](#art-91)), avaliação de modelos ([art. 92.º](#art-92)), exigência de medidas ([art. 93.º](#art-93)) e coimas ([art. 101.º](#art-101)).
- **Autoridades nacionais competentes** ([art. 70.º](#art-70)) — cada Estado-Membro designa ao menos uma **autoridade notificadora** e uma **autoridade de fiscalização do mercado**, que exercem seus poderes de forma independente e imparcial, e um **ponto de contacto único**. É a elas que se dirigem as queixas do [art. 85.º](#art-85). Em três domínios o regulamento já diz quem deve ser designado: nos sistemas biométricos, de aplicação da lei, gestão de fronteiras, justiça e democracia, a autoridade de fiscalização do mercado é a **autoridade de proteção de dados** ([art. 74.º, n.º 8](#art-74-p8)); nas instituições financeiras, o supervisor financeiro ([n.º 6](#art-74-p6)); nos produtos do Anexo I, Seção A, a autoridade setorial ([n.º 3](#art-74-p3)).
- **Autoridades de proteção dos direitos fundamentais** ([art. 77.º](#art-77)) — organismos nacionais que podem pedir e obter documentação dos sistemas de risco elevado, pela via da autoridade de fiscalização do mercado.
- **Autoridade Europeia para a Proteção de Dados** — atua como autoridade de fiscalização do mercado sobre as instituições, órgãos e organismos da própria União ([art. 74.º, n.º 9](#art-74-p9)) e lhes aplica coimas ([art. 100.º](#art-100)).
- **Organismos notificados** ([arts. 28.º a 39.º](#art-28)) — entidades acreditadas que realizam a avaliação da conformidade por terceiros. São fiscalizadas, não fiscalizam.

#### A competência exclusiva do Serviço para a IA sobre sistemas ([art. 75.º](#art-75))

O Omnibus levou o Serviço para a IA além dos modelos. Pela nova redação do [art. 75.º, n.º 1](#art-75-p1), ele passou a deter **competência exclusiva** de supervisão e execução sobre duas famílias de **sistemas**:

- os **construídos sobre modelos de finalidade geral** quando modelo e sistema vêm do mesmo prestador ou de prestadores da mesma empresa;
- os que **constituam ou estejam integrados** em plataformas e motores de pesquisa em linha de muito grande dimensão designados pelo DSA.

A exclusividade não é total. Ficam de fora os sistemas ligados a produtos do Anexo I, os de **infraestruturas críticas** (Anexo III, ponto 2), os fornecidos por autoridades de aplicação da lei, de gestão de fronteiras e por instituições financeiras, e os de **administração da justiça** (Anexo III, ponto 8) — os domínios de maior sensibilidade nacional continuam com os Estados-Membros. E ela recai sobre o **prestador**: o responsável pela implantação só entra quando for também o prestador ou parte da mesma empresa. Nesses casos, os incidentes graves passam a ser comunicados ao próprio Serviço para a IA, que repassa a informação à autoridade nacional ([art. 75.º, n.º 1-A](#art-75-p1a)).

O alargamento veio acompanhado de poderes. Quatro artigos novos dotam o Serviço para a IA de um aparato de investigação e sanção que ele não tinha:

- **[Art. 75.º-A](#art-75-a)** — todos os poderes de uma autoridade de fiscalização do mercado; abertura de investigação de ofício ou por queixa; pedido de informações por simples pedido ou por decisão; **inspeções à distância e no local**, com entrada nas instalações, exame e cópia de documentos em qualquer suporte, pedido de esclarecimentos orais e **selagem** de instalações e registos enquanto durar a inspeção. Onde o direito nacional exigir autorização judicial, o juiz verifica que a medida não é arbitrária nem excessiva, mas **não pode fiscalizar a necessidade da investigação** nem exigir o processo: a legalidade da decisão fica reservada ao Tribunal de Justiça. O Serviço pode ainda **recuperar do operador os custos** da supervisão nos casos de incumprimento.
- **[Art. 75.º-B](#art-75-b)** — **compromissos** oferecidos pelo operador e tornados vinculativos por decisão, com reabertura do processo se a situação de fato mudar, se o operador os descumprir ou se a decisão tiver se apoiado em informação incorreta.
- **[Art. 75.º-C](#art-75-c)** — decisão de incumprimento, precedida de conclusões preliminares e de diálogo estruturado; coimas aplicadas por remissão ao [art. 99.º](#art-99), n.os 3 a 7, alcançando **qualquer disposição do regulamento**, e não só as listadas no n.º 4; e **sanções pecuniárias compulsórias** de até **5% do rendimento diário médio ou do volume de negócios mundial do exercício anterior, por dia**. Prescrição de cinco anos, e jurisdição plena do Tribunal de Justiça para suprimir, reduzir ou aumentar o valor.
- **[Art. 75.º-D](#art-75-d)** — direitos de defesa e acesso ao dossiê em regime de divulgação negociada, com publicação das decisões dos arts. 75.º-B e 75.º-C.

Quem conhece direito da concorrência reconhece o desenho: é o modelo antitruste transplantado para a IA. O contrapeso é frágil — o [art. 64.º, n.º 3](#art-64-p3) determina que o Serviço para a IA receba recursos adequados, mas "sem prejuízo do processo orçamental". Poder de selar instalações exige estrutura para exercê-lo, e uma cláusula programática não a garante.

### O que ficou com os Estados-Membros

Mesmo num regulamento, sobra espaço nacional, e ele é maior do que costuma se supor:

- **designar** as autoridades competentes e assegurar-lhes meios técnicos, financeiros e humanos ([art. 70.º](#art-70));
- **fixar o regime de sanções** dentro dos tetos do [art. 99.º](#art-99), inclusive as regras sobre coimas a **autoridades e organismos públicos** ([n.º 8](#art-99-p8)), e comunicá-lo à Comissão;
- **autorizar por lei nacional**, ou não autorizar, a identificação biométrica à distância em tempo real para aplicação da lei ([art. 5.º, n.º 5](#art-5-p5)), podendo ainda adotar legislação mais restritiva;
- **criar os ambientes de testagem** ([art. 57.º](#art-57)) e, se quiserem, admitir a testagem em condições reais dos produtos da Seção B do Anexo I ([art. 60.º-A](#art-60-a));
- **manter ou adotar normas mais favoráveis aos trabalhadores** quanto ao uso de IA pelos empregadores ([art. 2.º, n.º 11](#art-2-p11)).

## Governança ([arts. 64.º a 73.º](#art-64))

- **Serviço para a IA** ([art. 64.º](#art-64)) — estrutura da Comissão; supervisiona os modelos de finalidade geral e os sistemas de sua competência exclusiva, conduz os códigos de práticas e coordena-se com as autoridades nacionais.
- **Comitê Europeu para a Inteligência Artificial** ([arts. 65.º](#art-65) e [66.º](#art-66)) — um representante por Estado-Membro, mandato de três anos renovável uma vez, com a Autoridade Europeia para a Proteção de Dados como observadora e o Serviço para a IA presente sem voto. Aconselha e assiste a Comissão e os Estados-Membros, coordena as autoridades nacionais e emite pareceres. Como o Comitê Europeu para a Proteção de Dados no [RGPD](/notas/gdpr#art-70), **não** edita normas nem sanciona.
- **Fórum consultivo** ([art. 67.º](#art-67)) — composição equilibrada entre indústria, empresas em fase de arranque, PME, sociedade civil e academia, com equilíbrio também entre interesses comerciais e não comerciais. Papel propositivo, próximo ao do [CNPD](/notas/lgpd#o-cnpd-consultivo-sem-poder-normativo) brasileiro.
- **Painel científico de especialistas independentes** ([art. 68.º](#art-68)) — peritos selecionados pela Comissão por conhecimento técnico e **independência em relação a qualquer prestador**. Apoia a execução quanto aos modelos de finalidade geral e pode emitir **alertas qualificados** sobre riscos sistêmicos ([art. 90.º](#art-90)). Os Estados-Membros podem recorrer a esse grupo para as próprias atividades ([art. 69.º](#art-69)).
- **Base de dados da UE** ([art. 71.º](#art-71)) — registro dos sistemas de risco elevado do Anexo III, com seção reservada para os usos policiais, migratórios e de fronteiras.
- **Acompanhamento pós-comercialização e incidentes** ([arts. 72.º](#art-72) e [73.º](#art-73)) — plano de monitoramento durante toda a vida do sistema e comunicação de **incidentes graves** à autoridade de fiscalização do mercado, em prazos escalonados conforme a gravidade.

## Sanções ([arts. 99.º a 101.º](#art-99))

Os Estados-Membros estabelecem o regime de sanções — efetivas, proporcionadas e dissuasivas —, observados três tetos, sempre pelo **maior** valor entre o montante fixo e o percentual do volume de negócios anual mundial do exercício anterior:

| Infração | Teto |
| --- | --- |
| Práticas proibidas do [art. 5.º](#art-5) | **35 milhões de euros ou 7%** ([n.º 3](#art-99-p3)) |
| Demais obrigações de prestadores, mandatários, importadores, distribuidores, responsáveis pela implantação e organismos notificados, inclusive a transparência do [art. 50.º](#art-50) | **15 milhões de euros ou 3%** ([n.º 4](#art-99-p4)) |
| Informações incorretas, incompletas ou falaciosas a organismos notificados e autoridades | **7,5 milhões de euros ou 1%** ([n.º 5](#art-99-p5)) |

Para **PME e empresas em fase de arranque** aplica-se o **menor** dos dois valores, e não o maior ([n.º 6](#art-99-p6)); desde o Omnibus, o mesmo vale para as **pequenas empresas de média capitalização**, nos dois tetos inferiores ([n.º 6-A](#art-99-p6a)). É a inversão da regra geral, e o mecanismo de proporcionalidade por porte do capítulo sancionatório.

A dosimetria do [n.º 7](#art-99-p7) considera natureza, gravidade e duração da infração e suas consequências; se outras autoridades já aplicaram coimas pelo mesmo fato, no regulamento ou fora dele; dimensão, volume de negócios e quota de mercado do operador; benefício obtido ou perda evitada; grau de cooperação; medidas técnicas e organizativas adotadas; como a autoridade soube da infração; caráter doloso ou negligente; e medidas de atenuação do dano.

O Omnibus reescreveu o [n.º 1](#art-99-p1) para deixar claro que os Estados-Membros estabelecem regras sobre **sanções e outras medidas de execução** — que podem incluir coimas, mas também **advertências e medidas não pecuniárias** —, considerando os interesses e a viabilidade econômica das PME e das pequenas empresas de média capitalização. Nem toda resposta a um descumprimento precisa ser multa.

Dois regimes correm fora dos Estados-Membros. Às **instituições, órgãos e organismos da União** as coimas são aplicadas pela Autoridade Europeia para a Proteção de Dados, em valores fixos bem menores — 1,5 milhão de euros para práticas proibidas e 750 mil euros para as demais infrações ([art. 100.º](#art-100)). Aos **prestadores de modelos de finalidade geral**, pela própria Comissão, até 15 milhões de euros ou 3% ([art. 101.º](#art-101)), com jurisdição plena do Tribunal de Justiça. E, sobre os sistemas de sua competência exclusiva, o Serviço para a IA dispõe ainda das **sanções pecuniárias compulsórias** diárias do [art. 75.º-C](#art-75-c) — instrumento distinto da coima e potencialmente mais gravoso.

O regime sancionatório vale desde **2 de agosto de 2025**, com exceção do [art. 101.º](#art-101), que só se aplica desde **2 de agosto de 2026**.

## Cronograma de aplicação ([art. 113.º](#art-113))

Duas distinções que a leitura corrida embaralha. **Entrar em vigor não é aplicar-se**: desde 27 de julho de 2026 as alterações do Omnibus são texto do AI Act, mas cada dispositivo alterado só se torna exigível na data que o art. 113.º lhe reserva — um art. 6.º já alterado no papel só produz efeito em dezembro de 2027. E **data de aplicação não é prazo de conformação**: os prazos do [art. 111.º](#art-111), que vão até 2030, valem para sistemas já no mercado, e não significam que a regra só passe a valer lá.

Datas já cumpridas:

- **1º de agosto de 2024** — entrada em vigor.
- **2 de fevereiro de 2025** — disposições gerais, definições ([art. 3.º](#art-3)), **literacia em IA** ([art. 4.º](#art-4)) e **práticas proibidas** ([art. 5.º](#art-5)).
- **2 de agosto de 2025** — **modelos de finalidade geral** ([arts. 51.º a 56.º](#art-51)), autoridades notificadoras e organismos notificados ([arts. 28.º a 39.º](#art-28)), **governança** ([arts. 64.º a 70.º](#art-64)), confidencialidade ([art. 78.º](#art-78)) e o **regime sancionatório**, exceto o [art. 101.º](#art-101). Prazo, também, para os Estados-Membros designarem suas autoridades.
- **27 de julho de 2026** — entrada em vigor do **Digital Omnibus**, e aplicação dos [arts. 102.º a 110.º](#art-102) na redação nova. As disposições alteradas do Capítulo I, entre elas o [art. 4.º](#art-4) e o novo [art. 4.º-A](#art-4-a), passam a valer de imediato, por já estarem em aplicação desde fevereiro de 2025.
- **2 de agosto de 2026** — **aplicação geral** do regulamento, incluindo a **transparência** do [art. 50.º](#art-50), a competência e os poderes do Serviço para a IA ([arts. 75.º](#art-75) e [75.º-A a 75.º-D](#art-75-a)) e as coimas do [art. 101.º](#art-101).

A cumprir:

- **2 de dezembro de 2026** — entrada em aplicação das **novas proibições** do art. 5.º ([alíneas b-A) e b-B)](#art-5-p1-ba) e n.os [1-A](#art-5-p1a) e [1-B](#art-5-p1b)); fim do período de transição da **marcação legível por máquina** para sistemas generativos já no mercado em 2 de agosto de 2026 ([art. 111.º, n.º 4](#art-111-p4)).
- **1º de agosto de 2027** — prazo para as **orientações** da Comissão sobre a articulação com a legislação de harmonização do Anexo I, Seção A ([art. 96.º, n.º 1, alínea g)](#art-96-p1-g)).
- **2 de agosto de 2027** — conformação dos **modelos de finalidade geral** colocados no mercado antes de 2 de agosto de 2025 ([art. 111.º, n.º 3](#art-111-p3)); prazo para os **atos delegados** da cláusula de equivalência ([art. 2.º, n.º 13](#art-2-p13)); e prazo para que ao menos um **ambiente nacional de testagem** esteja operacional em cada Estado-Membro ([art. 57.º, n.º 1](#art-57-p1)).
- **2 de dezembro de 2027** — obrigações dos sistemas de **risco elevado do Anexo III** ([art. 6.º, n.º 2](#art-6-p2)), adiadas de 2 de agosto de 2026. Tecnicamente, é a data de aplicação das Seções 1, 2 e 3 do Capítulo III a esses sistemas, ressalvado o [art. 6.º, n.º 5](#art-6-p5).
- **28 de janeiro de 2028** — prazo para os **organismos notificados** já designados sob a legislação do Anexo I, Seção A, pedirem designação sob o AI Act ([art. 43.º, n.º 3](#art-43-p3)).
- **2 de agosto de 2028** — obrigações dos sistemas de **risco elevado embarcados** em produtos do Anexo I ([art. 6.º, n.º 1](#art-6-p1)), adiadas de 2 de agosto de 2027. Primeiro relatório quadrienal de reexame da Comissão ([art. 112.º, n.º 2](#art-112-p2)).

Prazos de conformação de sistemas já no mercado ([art. 111.º](#art-111)):

- **2 de agosto de 2030** — sistemas de risco elevado concebidos para uso por **autoridades públicas**, colocados no mercado antes da data de aplicação do Capítulo III. Os demais sistemas anteriores a essa data só entram no regulamento se sofrerem **alteração significativa de concepção**.
- **31 de dezembro de 2030** — sistemas que sejam componentes dos **sistemas informáticos de grande escala** do Anexo X colocados no mercado antes de 2 de agosto de 2027.

## O Digital Omnibus: o que mudou

Dois instrumentos distintos circulam sob esse nome, e convém não confundi-los. O **Digital Omnibus sobre a IA**, restrito ao AI Act e à legislação setorial conexa, está **aprovado e em vigor** desde 27 de julho de 2026. O **Digital Omnibus de dados**, que propõe alterações ao RGPD, à Diretiva ePrivacy, ao Regulamento dos Dados e à Diretiva SRI 2, continua **em tramitação** e não produziu efeito nenhum — é dele que trata boa parte do debate público, inclusive o [parecer conjunto do Comitê Europeu para a Proteção de Dados e da Autoridade Europeia para a Proteção de Dados](https://www.edpb.europa.eu/news/news/2026/digital-omnibus-edpb-and-edps-support-simplification-and-competitiveness-while_en), que apoiou o objetivo de simplificação e registrou preocupações de fundo. O estado dessa negociação está na [nota do RGPD](/notas/gdpr).

O que o ato aprovado fez com o AI Act, agrupado por efeito:

- **Adia** — o risco elevado do Anexo III para 2 de dezembro de 2027, o embarcado do Anexo I para 2 de agosto de 2028 e os ambientes nacionais de testagem para 2 de agosto de 2027. São **datas fixas**, e não prazos condicionados à publicação das normas harmonizadas, como se cogitou durante a negociação. O adiamento alcança as Seções 1, 2 e 3 do Capítulo III, e deixa o resto do regulamento no calendário original.
- **Amplia** — duas novas práticas proibidas no [art. 5.º](#art-5); a competência exclusiva do Serviço para a IA do [art. 75.º](#art-75); e o aparato de execução dos [arts. 75.º-A a 75.º-D](#art-75-a), que por volume de texto é a maior parte do ato alterador e a que menos atenção recebeu.
- **Abranda** — o dever de literacia do [art. 4.º](#art-4), que deixou de ser obrigação de resultado para ser obrigação de meio.
- **Simplifica** — artigo próprio para o tratamento de categorias especiais na correção de enviesamentos ([art. 4.º-A](#art-4-a)); critério de componente de segurança afinado ([art. 6.º](#art-6), n.os 1-A a 1-C); cláusula de equivalência ([art. 2.º, n.º 13](#art-2-p13)); documentação técnica simplificada para PME ([art. 11.º](#art-11)) e gestão da qualidade proporcional ao porte ([art. 17.º](#art-17)); presunção de cibersegurança para sistemas abrangidos pelo _Cyber Resilience Act_ ([art. 42.º, n.º 3](#art-42-p3)); normas harmonizadas que cubram ao mesmo tempo o AI Act e a legislação setorial ([art. 40.º](#art-40)); remissões cruzadas entre as duas avaliações de impacto ([art. 27.º](#art-27)); e apoio regulatório estendido às pequenas empresas de média capitalização.
- **Setorializa** — o **Regulamento Máquinas** saiu da Seção A e entrou na Seção B do Anexo I, de modo que a IA embarcada em máquinas passa a responder apenas pelo art. 6.º, n.º 1, pelo art. 60.º-A e pelos arts. 102.º a 112.º. Os requisitos substantivos migram para o anexo do próprio Regulamento Máquinas, por atos delegados aplicáveis até 2 de agosto de 2028.
- **Preservou** o que a proposta original queria enxugar — o registro dos sistemas autoexcluídos pelo [art. 6.º, n.º 3](#art-6-p3), a data de aplicação do [art. 50.º](#art-50) e o critério da **estrita necessidade** no tratamento de categorias especiais, que a Comissão propusera rebaixar.
- **Estreou** o **Anexo XIV**, uma nomenclatura de códigos que delimita o âmbito da designação dos organismos notificados ([art. 30.º, n.º 2](#art-30-p2)): IAP para os sistemas cobertos pela legislação de produto do Anexo I, IAB para os sistemas biométricos do Anexo III, ponto 1, e IAH para as tecnologias de IA em si. Um detalhe para quem acompanha o debate brasileiro: o código residual **IAH 0401**, das tecnologias emergentes, menciona expressamente a **IA agêntica** — sem definição, sem regime próprio e sem critério de classificação. O anexo não preenche a lacuna; certifica que ela existe.

O que o Omnibus **não** tocou delimita seu alcance: a abordagem baseada no risco, a arquitetura de papéis, o conteúdo dos sete requisitos dos sistemas de risco elevado e o regime dos modelos de finalidade geral seguem como estavam. As alterações incidem sobre prazos, competências de supervisão e requisitos de documentação — e, em dois pontos, sobre o mérito: o rol de proibições, ampliado, e o dever de literacia, abrandado.

Vendido como pacote de simplificação, o texto publicado devolve um retrato ambíguo. As simplificações são reais. Mas o mesmo ato criou duas proibições absolutas, uma disciplina nova para tratar dados sensíveis e um aparato investigatório e sancionatório inédito. O efeito temporal, em números: os deveres dos sistemas de risco elevado do Anexo III — que alcançam emprego, crédito, educação, serviços públicos essenciais, migração e administração da justiça — passaram a ser exigíveis **dezesseis meses depois** da data original, enquanto as proibições do art. 5.º e a transparência do art. 50.º mantiveram as suas.

Adiar por indisponibilidade dos instrumentos de conformidade não é situação estranha ao Brasil: a [LGPD](/notas/lgpd) teve a vigência adiada duas vezes e as sanções suspensas por quase um ano depois de vigente, e o [ECA Digital](/notas/eca-digital) teve a _vacatio legis_ discutida em veto e em duas medidas provisórias.

## Interação com o RGPD, o DSA e o DMA

O AI Act não substitui nem derroga nenhum deles: **acumula**. Um mesmo sistema pode responder ao mesmo tempo perante vários regimes, com autoridades e lógicas diferentes.

- **[RGPD](/notas/gdpr)** — o AI Act regula o **sistema**; o RGPD regula o **tratamento de dados pessoais** que ele realiza. Um sistema pode ser plenamente conforme ao AI Act e ilícito perante o RGPD por falta de base legal, e vice-versa. Pontos de contato diretos: a governação de dados do [art. 10.º](#art-10) e o novo [art. 4.º-A](#art-4-a); o art. 22.º do RGPD, que continua sendo a via para contestar decisões automatizadas, ao lado do direito a explicações do [art. 86.º](#art-86); e o tratamento ulterior nos ambientes de testagem ([art. 59.º](#art-59)). Para o leitor brasileiro, é a mesma sobreposição que haverá entre o [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) e a [LGPD](/notas/lgpd).
- **DSA** — regula a **moderação e o risco sistêmico das plataformas**; o AI Act regula os sistemas de IA que elas empregam. Depois do Omnibus, a repartição institucional ficou explícita: os sistemas integrados em plataformas e motores de pesquisa de muito grande dimensão passaram à supervisão do Serviço para a IA, na mesma lógica de centralização que o DSA já adotara. O regime brasileiro que ocupa o espaço do DSA nasceu da reinterpretação do [art. 19 do Marco Civil](/notas/mci#art-19) pelo STF nos Temas 987 e 533 e dos decretos que a operacionalizaram (ver [a nota do Marco Civil](/notas/mci)).
- **DMA** — regula o **poder de mercado** dos controladores de acesso; não trata de risco de IA, mas alcança serviços de IA integrados a plataformas designadas.
- **Legislação setorial do Anexo I** — o Omnibus alterou o Regulamento Máquinas e o Regulamento de Base da Aviação para evitar dupla avaliação de conformidade sobre o mesmo produto.

## Comparação com o PL nº 2338/2023

### Onde está o projeto brasileiro

O [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233), de autoria do então presidente do Senado, resultou dos trabalhos de uma comissão de juristas e foi **aprovado pelo Plenário do Senado em 10 de dezembro de 2024**. Chegou à [Câmara dos Deputados](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262) em 17 de março de 2025, com regime de prioridade. Em 29 de abril de 2025 foi constituída a **comissão especial** para examiná-lo, presidida pela deputada Luisa Canziani (União Brasil-PR); em 20 de maio de 2025 foi designado relator o deputado Aguinaldo Ribeiro (PP-PB). A comissão realizou doze audiências públicas entre maio e setembro de 2025, e ao projeto foram apensadas dezenas de proposições.

Uma delas importa mais que as outras. Em dezembro de 2025 o Poder Executivo enviou ao Congresso projeto próprio sobre a **governança** da IA, para sanar o **vício de iniciativa** do desenho original: criar órgão e despesa é iniciativa privativa do Executivo. O projeto institui o Conselho Brasileiro de Inteligência Artificial (CBIA) à frente do SIA, reunindo a [ANPD](https://www.gov.br/anpd/pt-br) e ministérios. É a peça a acompanhar: a arquitetura de autoridade que sair do substitutivo provavelmente não será a que o Senado aprovou.

Na data de fechamento desta nota, a ficha de tramitação registra a situação como **aguardando parecer do relator na comissão especial**. O PL **não é lei**, e não há texto de relatoria a comparar — a comparação abaixo é com o **substitutivo aprovado pelo Senado**, único texto com deliberação concluída.

Para situar os dois calendários: entre a aprovação do texto no Senado, em dezembro de 2024, e hoje, a União Europeia colocou o AI Act em vigor, aplicou três das suas fases de exigibilidade e aprovou a primeira reforma; no mesmo intervalo, o projeto brasileiro passou da apresentação na Câmara à espera do parecer do relator.

### Onde os dois convergem

A herança é visível na estrutura: classificação por risco, com risco excessivo vedado e alto risco listado em anexo; práticas vedadas de perfil semelhante — exploração de vulnerabilidades, classificação social pelo poder público, avaliação preditiva de risco criminal por traços de personalidade, identificação biométrica à distância em tempo real com exceções sujeitas a autorização judicial; avaliação de impacto algorítmico com função análoga à do [art. 27.º](#art-27); deveres de documentação, gestão de riscos, qualidade de dados e supervisão humana; transparência de conteúdo sintético; regime próprio para modelos de propósito geral; sanções escalonadas com teto percentual sobre o faturamento; e coordenação entre reguladores em vez de autoridade única, com o SIA cumprindo função próxima à do arranjo europeu entre Serviço para a IA, Comitê e autoridades nacionais.

### Onde divergem

- **Instrumento e efeito.** O AI Act é regulamento diretamente aplicável a 27 ordens jurídicas; o PL é lei federal ordinária, num país em que a competência legislativa sobre a matéria é da União. Não há, no Brasil, o problema de harmonização que justifica metade do desenho europeu — nem, portanto, a camada de normas harmonizadas e organismos notificados.
- **Algoritmos de recomendação.** O PL classifica como de alto risco a curadoria, a moderação e a distribuição de conteúdo em larga escala por plataformas e motores de busca. O AI Act **não** trata recomendação de conteúdo como risco elevado: o tema fica com o DSA, em regime de risco sistêmico, e não de conformidade de produto. É a divergência de maior alcance material entre os dois textos.
- **Direito de autor no treino.** O PL disciplina o uso de conteúdo protegido no treino, com direito de oposição dos titulares e previsão de **remuneração**. O AI Act exige do prestador uma **política** de cumprimento do direito de autor e o sumário público do conteúdo de treino ([art. 53.º](#art-53)), remetendo o mérito à diretiva de direito de autor e às exceções nacionais de prospeção de textos e dados.
- **Direitos das pessoas afetadas.** O PL prevê catálogo mais largo e o posiciona no corpo inicial do texto: informação prévia, explicação, **contestação** de decisões e **revisão humana**, além de não discriminação e correção de vieses. O AI Act traz explicação ([art. 86.º](#art-86)) e queixa ([art. 85.º](#art-85)) em capítulo final, e não cria contestação nem revisão humana.
- **Responsabilidade civil.** O PL trata do tema, articulando-o com o Código de Defesa do Consumidor e com responsabilidade agravada para alto risco. O AI Act não cria regime de responsabilidade civil, e a diretiva que o faria foi retirada em 2025.
- **Autoridade.** O texto do Senado atribui à [ANPD](https://www.gov.br/anpd/pt-br) a coordenação do SIA, trajetória já percorrida com o [ECA Digital](/notas/eca-digital) e o [Marco Civil](/notas/mci) — com a ressalva de que o projeto de governança do Executivo interpõe o CBIA. A União Europeia criou estrutura nova dentro da Comissão e **não** atribuiu a matéria às autoridades de proteção de dados, salvo nos domínios do [art. 74.º, n.º 8](#art-74-p8) e na supervisão das próprias instituições da União. E o movimento recente vai numa direção só: com o Omnibus, a supervisão dos maiores agentes migrou das autoridades nacionais para a Comissão. Quem discute no Brasil o equilíbrio entre autoridade central e reguladores setoriais tem aí um dado de experiência.
- **Trabalho.** O AI Act permite expressamente normas nacionais **mais protetivas aos trabalhadores** ([art. 2.º, n.º 11](#art-2-p11)) e impõe informação prévia a trabalhadores e representantes ([art. 26.º, n.º 7](#art-26-p7)). O PL trata do impacto sobre trabalhadores sem a articulação com negociação coletiva que o texto europeu deixa em aberto.
- **Segurança nacional.** A exclusão europeia de usos militares, de defesa e de segurança nacional ([art. 2.º, n.º 3](#art-2-p3)) é ampla e incondicionada. O PL não replica exclusão de igual largura, o que tende a produzir alcance material maior no Brasil na zona mais sensível.
- **Estágio.** O AI Act está em vigor desde 2024, com orientações da Comissão publicadas, códigos de práticas em uso, base de dados em construção e uma reforma aprovada. O PL não é lei e não tem parecer na comissão especial. São textos em estágios diferentes, e não dois regimes vigentes a comparar.

### Três pontos de contato com o debate brasileiro

Sem transpor conclusões — são ordens jurídicas distintas —, três aspectos da execução europeia têm equivalente direto no que o Brasil terá de resolver:

- **A dependência entre prazo e instrumento de conformidade.** O adiamento europeu se justificou pela indisponibilidade de normas harmonizadas e de especificações comuns e pelo atraso na instituição das autoridades nacionais. No desenho brasileiro, o papel dos instrumentos caberia à regulamentação da ANPD e à capacidade de fiscalização do SIA — pendências que o PL remete a atos posteriores, como a [LGPD](/notas/lgpd) fez.
- **Quem define o conteúdo concreto do dever.** Na União Europeia, o que satisfaz o [art. 15.º](#art-15) é fixado por normas do CEN e do CENELEC, não pelo legislador nem pela Comissão. O equivalente brasileiro seriam resoluções da ANPD e normas técnicas da ABNT — com a mesma questão sobre publicidade e acesso ao texto que define a obrigação.
- **O recorte do que foi e do que não foi adiado.** O adiamento alcançou os deveres de conformidade dos sistemas de risco elevado; as proibições e a transparência mantiveram as datas, e o rol de proibições foi ampliado. É um dado a considerar em qualquer discussão sobre escalonamento de vigência no marco brasileiro.

## O que ainda falta regulamentar

### Os instrumentos que faltam

O AI Act não tem decreto regulamentador: o detalhamento vem de atos delegados e de execução da Comissão, de normas harmonizadas europeias e de códigos de adesão voluntária. Seguem pendentes:

- **normas harmonizadas** cujas referências ainda não foram publicadas no Jornal Oficial ([art. 40.º](#art-40)) — sem elas não há presunção de conformidade, e o cumprimento dos [arts. 8.º a 15.º](#art-8) tem de ser demonstrado por outro caminho. Foi a ausência delas que fundamentou o adiamento;
- os **atos delegados da cláusula de equivalência** ([art. 2.º, n.º 13](#art-2-p13)), devidos até 2 de agosto de 2027, sem os quais a cláusula não produz efeito;
- as **orientações** sobre a articulação com a legislação de harmonização do Anexo I, Seção A, devidas até 1º de agosto de 2027 ([art. 96.º, n.º 1, alínea g)](#art-96-p1-g));
- o **formulário simplificado** de documentação técnica para PME ([art. 11.º, n.º 1](#art-11-p1)) e o **modelo de questionário** da avaliação de impacto sobre os direitos fundamentais ([art. 27.º, n.º 5](#art-27-p5)), ambos a cargo da Comissão e do Serviço para a IA;
- os **ambientes nacionais de testagem**, operacionais até 2 de agosto de 2027 ([art. 57.º, n.º 1](#art-57-p1));
- a **base de dados da UE** ([art. 71.º](#art-71)), ainda em construção — a utilidade dela como instrumento de prestação de contas depende do que os prestadores registrarem.

Enquanto os instrumentos não vêm, vale o regulamento, e a ausência de norma técnica detalhada não suspende o dever: as proibições, a transparência e as obrigações dos modelos de finalidade geral já são exigíveis.

### Pontos em aberto

- **O pacote de dados do Digital Omnibus.** As alterações propostas ao RGPD, à Diretiva ePrivacy, ao Regulamento dos Dados e à Diretiva SRI 2 seguem sem acordo final. Como parte delas toca o tratamento de dados para treino de modelos, o desfecho afeta o cumprimento do AI Act sem alterá-lo.
- **A derrogação do [art. 6.º, n.º 3](#art-6-p3).** O critério é autoaplicado pelo prestador, e a maior parte do Anexo III não passa por organismo notificado. Quanto do Anexo III fica fora do risco elevado por essa via é algo que só a base de dados e a prática de fiscalização vão mostrar.
- **A reparação de danos.** Sem regime próprio no regulamento e sem a diretiva retirada em 2025, a reparação continua repartida entre os direitos nacionais e o regime de responsabilidade por produtos defeituosos.
- **A capacidade do Serviço para a IA.** O Omnibus deu-lhe poderes de autoridade antitruste e, em troca, uma cláusula de recursos "sem prejuízo do processo orçamental" ([art. 64.º, n.º 3](#art-64-p3)). Centralizar supervisão sem capacidade correspondente é o ponto em que a reforma pode falhar por dentro.
- **A IA agêntica.** O Anexo XIV a nomeia, no código residual IAH 0401, sem definir, classificar ou regular. É a lacuna mais provável da próxima rodada de revisão — e um tema em que o Brasil, se legislar depois, chegará com o problema já desenhado.
- **A repercussão internacional.** O AI Act é a primeira lei geral de IA de um grande bloco, e o RGPD é precedente de difusão de modelo regulatório europeu. Até aqui os caminhos divergiram: os Estados Unidos regulam por ordens executivas federais e leis estaduais, o Reino Unido optou por abordagem setorial sem lei geral, e o Brasil, apesar da inspiração declarada, ainda não converteu o PL nº 2338/2023 em lei.

## Normas

### Legislação principal

- [Regulamento (UE) 2024/1689, de 13 de junho de 2024 — texto consolidado em 27 de julho de 2026](https://eur-lex.europa.eu/legal-content/PT/TXT/HTML/?uri=CELEX:02024R1689-20260727) — estabelece regras harmonizadas em matéria de inteligência artificial (Regulamento da Inteligência Artificial, ou **AI Act**). O ato original foi publicado no Jornal Oficial da União Europeia em 12 de julho de 2024, entrou em vigor em 1º de agosto de 2024 e está consolidado com o Digital Omnibus, com aplicação escalonada até 2028 (ver "Cronograma de aplicação", acima).
- [Tratado sobre o Funcionamento da União Europeia](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012E/TXT), especialmente os arts. 16 (proteção de dados pessoais) e 114 (aproximação de legislações para o mercado interno) — as bases jurídicas do regulamento.
- [Carta dos Direitos Fundamentais da União Europeia](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:12012P/TXT) — parâmetro material de boa parte das proibições e dos requisitos de risco elevado, e objeto direto da avaliação de impacto do [art. 27.º](#art-27).

### Alterações posteriores ao AI Act

- [Regulamento (UE) 2026/1744, de 8 de julho de 2026](https://eur-lex.europa.eu/eli/reg/2026/1744/oj) — **Digital Omnibus sobre a IA**. Altera o Regulamento (UE) 2024/1689, o Regulamento de Base da Aviação (UE) 2018/1139 e o Regulamento Máquinas (UE) 2023/1230 quanto à simplificação da execução das regras harmonizadas de IA. Publicado no Jornal Oficial de 24 de julho de 2026 e **em vigor desde 27 de julho de 2026**. É a primeira alteração de fundo do AI Act, e está sinalizada ao longo desta nota como **Omnibus**.

> **Sobre o painel "Lei seca".** Ele traz **um texto**: o [Regulamento (UE) 2024/1689 consolidado em 27 de julho de 2026](https://eur-lex.europa.eu/legal-content/PT/TXT/HTML/?uri=CELEX:02024R1689-20260727), convertido do XHTML oficial do EUR-Lex e aberto sem prefixo nas âncoras.
>
> O próprio EUR-Lex informa que a consolidação é instrumento de documentação, sem efeito jurídico: as versões que fazem fé, **inclusive os preâmbulos e os considerandos**, são as publicadas no Jornal Oficial. Por isso o painel traz o articulado e os anexos em vigor, sem os 180 considerandos do [ato original](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32024R1689) nem os 47 do [ato alterador](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32026R1744). Num regulamento europeu são eles que dizem por que cada regra existe, e a Comissão e o Tribunal de Justiça os usam para interpretar o articulado — os que esta nota invoca estão citados pelo número, com o link da fonte.

### Regulamentos e atos aplicáveis

- [Código de Práticas para a IA de finalidade geral](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai) — publicado em julho de 2025; instrumento voluntário pelo qual os prestadores de modelos de finalidade geral podem demonstrar o cumprimento dos [arts. 53.º](#art-53) e [55.º](#art-55).
- [Modelo de sumário público do conteúdo usado no treino](https://digital-strategy.ec.europa.eu/en/library/explanatory-notice-and-template-public-summary-training-content-general-purpose-ai-models) — formulário obrigatório previsto no [art. 53.º, n.º 1, alínea d)](#art-53-p1-d).
- [Orientações da Comissão sobre práticas de IA proibidas](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act) e sobre a [definição de sistema de IA](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application) — ambas de fevereiro de 2025.
- [Orientações e Código de Práticas sobre transparência de conteúdos gerados por IA](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content) — detalham a marcação e a divulgação exigidas pelo [art. 50.º](#art-50).
- [Serviço de Apoio ao AI Act](https://ai-act-service-desk.ec.europa.eu/) — canal oficial de orientação da Comissão, com o cronograma de aplicação atualizado.

### Estudos técnicos da ANPD

Levantamentos da autoridade brasileira, sem força de norma e sem aplicação ao regulamento europeu — entram aqui porque são a fonte pública do que esta nota afirma sobre o debate brasileiro. A série **Radar Tecnológico** se apresenta como abordagem didática de tecnologias emergentes, "sem a intenção de esgotar as temáticas ou firmar posicionamentos institucionais"; os documentos estão na [central de documentos técnicos e orientativos](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos) da Agência.

- [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (2026) — conceitos, funcionamento, riscos à proteção de dados, comparação de regimes regulatórios (inclusive o [art. 50.º](#art-50)) e limites das ferramentas de detecção.
- [Radar Tecnológico nº 3 — Inteligência artificial generativa](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar_tecnologico_ia_generativa_anpd.pdf) (novembro de 2024) — ciclo de tratamento de dados pessoais em sistemas generativos, da raspagem para treinamento à eliminação.

### Normas correlatas

- [RGPD — Regulamento (UE) 2016/679](/notas/gdpr), que o AI Act expressamente não afeta ([art. 2.º, n.º 7](#art-2-p7)); é a norma de referência da [LGPD](/notas/lgpd).
- [Regulamento (UE) 2022/2065 — Regulamento dos Serviços Digitais (DSA)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32022R2065) e [Regulamento (UE) 2022/1925 — Regulamento dos Mercados Digitais (DMA)](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32022R1925).
- [Regulamento (UE) 2023/2854 — Regulamento dos Dados](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32023R2854).
- [Regulamento (UE) 2023/1230 — Regulamento Máquinas](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32023R1230) e [Regulamento (UE) 2018/1139 — Regulamento de Base da Aviação](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32018R1139), ambos alterados pelo Omnibus para alinhar prazos e avaliações de conformidade.
- [Regulamento (UE) 2019/1020](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019R1020) — fiscalização do mercado e conformidade dos produtos; é dele que vêm os poderes de investigação exercidos pelas autoridades de fiscalização do mercado e pelo Serviço para a IA ([art. 74.º, n.º 1](#art-74-p1)).
- [Diretiva (UE) 2019/1937](https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32019L1937) — proteção de denunciantes, aplicável às denúncias do [art. 87.º](#art-87).
- No Brasil: [PL nº 2338/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233) (ver "Comparação com o PL nº 2338/2023", acima), a [LGPD](/notas/lgpd), o [ECA Digital](/notas/eca-digital) e o [Marco Civil da Internet](/notas/mci).
