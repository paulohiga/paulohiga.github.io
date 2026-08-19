---
layout: nota
permalink: /notas/eca-digital
title: ECA Digital — Estatuto Digital da Criança e do Adolescente
description: Notas de estudo sobre a Lei nº 15.211/2025 — aplicação, deveres de prevenção e design, aferição de idade, supervisão parental, redes sociais, sanções e o papel da ANPD, com o texto da lei ao lado.
lei: eca-digital
normas_extra: [decreto-12880]
ordem: 3
jurisdicao: Brasil
atualizado_em: 2026-08-19
---

## Resumo geral

O ECA Digital é a primeira lei brasileira a tratar, de forma abrangente, da proteção de crianças e adolescentes especificamente no ambiente digital — até então, a matéria era enfrentada por meio de disposições gerais do [ECA](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm), da [LGPD](/notas/lgpd) e do [Marco Civil da Internet](/notas/mci), sem um regime próprio para redes sociais, jogos eletrônicos, ferramentas de IA generativa e demais serviços digitais voltados a esse público. A lei nasce num contexto de preocupação crescente com uso excessivo de telas, exposição a conteúdo impróprio, aliciamento e publicidade dirigida a menores, debate que já vinha em pauta em outras jurisdições (ver a comparação internacional na seção de aferição de idade, abaixo).

A lei estabelece, entre outros pontos, deveres de prevenção e proteção por _design_ ([arts. 5º a 8º](#art-5)) a cargo dos próprios fornecedores de produtos e serviços digitais — seguindo, no que toca a privacidade e proteção de dados, os mesmos princípios já positivados no [art. 6º da LGPD](/notas/lgpd#art-6) —, mecanismos de aferição de idade ([arts. 10 a 15](#art-10)) para restringir o acesso de crianças e adolescentes a conteúdos e serviços impróprios, ferramentas de supervisão parental ([arts. 16 a 18](#art-16)), restrições à publicidade dirigida a esse público ([arts. 22 e 23](#art-22)) e regras específicas para jogos eletrônicos ([arts. 20 e 21](#art-20)). A [ANPD](https://www.gov.br/anpd/pt-br/assuntos/eca-digital), já responsável pela [LGPD](/notas/lgpd), foi designada autoridade administrativa também para essa nova política ([Decreto nº 12.622/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12622.htm)). Foi o segundo dos três mandatos que a Agência acumula hoje: em maio de 2026, o Decreto nº 12.975/2026 lhe deu ainda competência de regulação e fiscalização sobre os deveres dos provedores de aplicações no [Marco Civil da Internet](/notas/mci) — cuja aplicação, até então, era difusa entre o Judiciário, a Anatel, a Senacon e o Sistema Brasileiro de Defesa da Concorrência. É esse acúmulo que faz dela, hoje, a principal reguladora do ambiente digital brasileiro.

O histórico legislativo foi conturbado: a Lei nº 15.211/2025 sofreu três vetos presidenciais (à competência da Anatel para encaminhar ordens de bloqueio, à vinculação das multas ao FNCA e à _vacatio legis_ de um ano), seguidos de medidas provisórias que tentaram recompor pontos vetados — uma delas, a [Medida Provisória nº 1.318/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1318.htm), perdeu a vigência por não ter sido convertida em lei no prazo constitucional. A vigência definitiva só foi fixada quando a MP nº 1.317/2025 — que transformou a antiga Autoridade Nacional na atual **Agência** Nacional de Proteção de Dados — virou a [Lei nº 15.352/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15352.htm), cujo art. 19 fixou a data. A lei entrou em vigor em 17 de março de 2026, um dia antes do seu decreto regulamentador ([Decreto nº 12.880/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12880.htm)), que detalha a Política Nacional de Promoção e Proteção dos Direitos da Criança e do Adolescente no Ambiente Digital.

Passados poucos meses de vigência, boa parte da regulamentação infralegal ainda está em elaboração — requisitos de segurança por padrão, parâmetros de aferição de idade, diretrizes de supervisão parental e outros atos da ANPD e de outros órgãos seguem pendentes, com previsão de guias definitivos a partir de agosto de 2026 (ver "Regulamentos e atos aplicáveis", abaixo). Isso torna a lei, neste momento, um objeto de estudo em construção: os contornos definitivos de vários deveres essenciais só se consolidarão com a edição desses atos.

## Fundamentos

"É dever da família, da sociedade e do Estado assegurar à criança, ao adolescente e ao jovem, com **absoluta prioridade**, o direito à vida, à saúde, à alimentação, à educação, ao lazer, à profissionalização, à cultura, à dignidade, ao respeito, à liberdade e à convivência familiar e comunitária, além de colocá-los a salvo de toda forma de negligência, discriminação, exploração, violência, crueldade e opressão" _(CF, art. 227, caput)_

Os produtos e serviços devem garantir **proteção prioritária**, ter como parâmetro o **melhor interesse** e adotar medidas adequadas e proporcionais para nível elevado de privacidade, proteção de dados e segurança, nos termos do ECA e da LGPD ([art. 3º](#art-3)).

Pais e responsáveis legais mantêm o dever de **cuidado ativo e contínuo**, com uso de ferramentas de supervisão parental adequadas à idade e ao estágio de desenvolvimento ([art. 3º, parágrafo único](#art-3-pu)). A lógica é de **responsabilidade compartilhada** entre Poder Público, famílias, sociedade civil e fornecedores (Decreto nº 12.880/2026, [art. 4º, IV](#dec12880-art-4-iv)).

O [art. 5º, § 3º](#art-5-p3) traz um dispositivo discreto, mas estruturante: a autoridade **pode emitir recomendações e orientações** sobre práticas relevantes, considerados as assimetrias regulatórias, as funcionalidades, o nível de risco, a evolução tecnológica e os padrões técnicos. É a base legal das Orientações Preliminares de março de 2026 e do faseamento previsto no [art. 49 do Decreto](#dec12880-art-49).

### Fundamentos da utilização por crianças e adolescentes ([art. 4º](#art-4))

- **Proteção integral** ([inciso I](#art-4-i))
- **Prevalência absoluta** de seus interesses ([inciso II](#art-4-ii))
- Condição peculiar de **pessoa em desenvolvimento biopsicossocial** ([inciso III](#art-4-iii))
- Segurança contra intimidação, exploração, abuso, ameaça e outras formas de violência ([inciso IV](#art-4-iv))
- Respeito à **autonomia e ao desenvolvimento progressivo** do indivíduo ([inciso V](#art-4-v))
- Proteção contra a **exploração comercial** ([inciso VI](#art-4-vi))
- Observância dos princípios do Estatuto da Pessoa com Deficiência ([inciso VII](#art-4-vii))
- Promoção da **educação digital**, com foco em cidadania e senso crítico ([inciso VIII](#art-4-viii))
- Transparência e responsabilidade no tratamento de dados pessoais ([inciso IX](#art-4-ix))

### Melhor interesse ([art. 5º, § 2º](#art-5-p2))

Para os fins da Lei, considera-se como expressão do melhor interesse da criança e do adolescente a proteção de sua **privacidade, segurança, saúde mental e física, acesso à informação, liberdade de participação na sociedade, acesso significativo às tecnologias digitais e bem-estar**.

**Origem normativa.** O princípio vem do art. 3.1 da Convenção sobre os Direitos da Criança (1989), promulgada no Brasil pelo [Decreto nº 99.710/1990](https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/D99710.htm), segundo o qual o interesse superior da criança deve ser **consideração primordial** em todas as ações que lhe digam respeito — fórmula que, como registra o próprio Comentário Geral nº 14 (§ 2º), já constava da Declaração dos Direitos da Criança de 1959. Internamente, articula-se com o art. 227 da Constituição e com o art. 4º do ECA (prioridade absoluta), compondo a **doutrina da proteção integral**, que substituiu a doutrina da situação irregular do [Código de Menores (Lei nº 6.697/1979)](https://www.planalto.gov.br/ccivil_03/leis/1970-1979/l6697.htm): a criança deixa de ser objeto de tutela e passa a **sujeito de direitos**.

**Conteúdo.** No [Comentário Geral nº 14 (2013)](https://dcjri.ministeriopublico.pt//sites/default/files/documentos/pdf/cdc_com_geral_14.pdf), o Comitê dos Direitos da Criança da ONU descreve o interesse superior como conceito de **natureza tríplice** (§ 6º):

- **direito substantivo** — a criança tem direito a que seu interesse seja avaliado e tomado como consideração primordial quando diferentes interesses estejam em jogo;
- **princípio jurídico interpretativo** — havendo mais de uma interpretação possível de uma norma, prevalece a que melhor atenda ao interesse da criança; e
- **regra de procedimento** — o processo decisório deve incluir avaliação do impacto da decisão sobre a criança, e a fundamentação deve explicitar o que se considerou ser seu interesse superior, em que critérios se baseou e como foi ponderado em face das demais considerações (§§ 6º e 97).

O Comitê o trata como **conceito dinâmico e flexível**, de avaliação casuística (§ 32), e propõe lista não exaustiva e não hierarquizada de elementos a considerar (§§ 50 e 52). Para o ambiente digital, o parâmetro específico é o [Comentário Geral nº 25 (2021)](https://criancaeconsumo.org.br/wp-content/uploads/2021/04/comentario-geral-n-25-2021.pdf), sobre os direitos da criança em relação ao ambiente digital.

**Risco de manipulação.** A objeção da indeterminação é reconhecida pelo próprio Comitê: a flexibilidade do conceito **abre espaço para manipulação**, e o interesse superior já foi invocado abusivamente por governos para justificar políticas racistas, por pais em disputas de guarda e por profissionais que o tratam como irrelevante (§ 34). Exemplo histórico documentado: na Austrália, entre as décadas de 1910 e 1970, a remoção sistemática de crianças aborígenes e ilhéus do Estreito de Torres de suas famílias — as chamadas **Gerações Roubadas** — foi formalmente justificada por autoridades em nome do bem-estar e do melhor interesse das crianças; o inquérito oficial [*Bringing Them Home*](https://humanrights.gov.au/resource-hub/older-peoples-rights/bringing-them-home-full-contents-page) (1997), da Comissão Australiana de Direitos Humanos, documentou essa política e concluiu que ela configurou grave violação de direitos humanos. O Comitê registra também que o entendimento de um adulto sobre o que é o interesse superior de uma criança **não pode prevalecer** sobre o respeito a todos os seus direitos na Convenção (§ 4º). Daí a articulação necessária com o **direito de ser ouvido** (art. 12 da Convenção): o art. 3.1 não se aplica corretamente sem que os requisitos do art. 12 sejam cumpridos (§§ 43 a 45).

**Como o ECA Digital opera com o conceito.** O [art. 5º, § 2º](#art-5-p2), adota a via da concretização, convertendo o princípio em rol de bens jurídicos verificáveis. O [art. 4º, V](#art-4-v), coloca ao lado dele a **autonomia e o desenvolvimento progressivo**, e o [art. 7º](#art-7) exige que a configuração mais protetiva seja "justificada" pelo melhor interesse. O [art. 17, § 2º](#art-17-p2), submete o desenho das próprias ferramentas de supervisão parental ao melhor interesse e ao desenvolvimento progressivo das capacidades — de modo que o instrumento de controle parental também encontra nele um limite. O Decreto nº 12.880/2026, [art. 4º, VIII](#dec12880-art-4-viii), incorpora à Política Nacional o direito de participação de crianças e adolescentes nas decisões que os afetem, remetendo ao art. 12 da Convenção.

## Aplicação ([art. 1º](#art-1))

A Lei aplica-se a **todo produto ou serviço de tecnologia da informação** direcionado a crianças e adolescentes no País **ou de acesso provável por eles**, independentemente de localização, desenvolvimento, fabricação, oferta, comercialização e operação.

Considera-se **acesso provável** ([art. 1º, parágrafo único](#art-1-pu)):

- [I](#art-1-pu-i) — suficiente **probabilidade de uso e atratividade** do produto ou serviço de tecnologia da informação por crianças e adolescentes;
- [II](#art-1-pu-ii) — considerável **facilidade ao acesso e utilização** do produto ou serviço de tecnologia da informação por crianças e adolescentes; e
- [III](#art-1-pu-iii) — significativo **grau de risco** à privacidade, à segurança ou ao desenvolvimento biopsicossocial de crianças e de adolescentes, especialmente no caso de produtos ou serviços que tenham por finalidade permitir a interação social e o compartilhamento de informações em larga escala entre usuários em ambiente digital.

Pelo caput do [art. 1º](#art-1), a Lei alcança tanto o produto ou serviço direcionado a crianças e adolescentes quanto o de acesso provável por eles. O alcance concreto desse conceito é o objeto do guia orientativo sobre escopo e obrigações gerais, submetido pela ANPD a tomada de subsídios em 2026: na prática, é ele que dirá se um serviço corporativo, uma ferramenta educacional ou uma aplicação de nicho entram ou não no regime.

## Não aplicação e dispensas

- **Funcionalidades essenciais da internet** — protocolos e padrões técnicos abertos e comuns de interconexão não são produtos ou serviços de tecnologia da informação ([art. 2º, § 2º](#art-2-p2)).
- **Modulação proporcional** ([art. 39](#art-39)): as obrigações a seguir aplicam-se conforme as características e funcionalidades do produto, o **grau de interferência** do fornecedor sobre os conteúdos, o número de usuários e o porte, cabendo à regulamentação definir critérios objetivos de aferição do grau de intervenção ([art. 39, § 3º](#art-39-p3)):
    - [art. 6º](#art-6) — prevenção e mitigação de riscos de acesso, exposição, recomendação ou contato com conteúdos nocivos;
    - [art. 17](#art-17) — deveres do fornecedor quanto às ferramentas de supervisão parental;
    - [art. 18](#art-18) — funcionalidades que as ferramentas de supervisão parental devem oferecer aos responsáveis legais;
    - [art. 19](#art-19) — produtos e serviços de monitoramento infantil;
    - [art. 20](#art-20) — vedação das caixas de recompensa (_loot boxes_);
    - [art. 27](#art-27) — remoção e comunicação às autoridades de conteúdo de exploração, abuso sexual, sequestro e aliciamento;
    - [art. 28](#art-28) — mecanismos de notificação de violações pelos usuários;
    - [art. 29](#art-29) — retirada de conteúdo violador mediante notificação, independentemente de ordem judicial;
    - [art. 31](#art-31) — relatórios semestrais de transparência e acesso de pesquisadores aos dados;
    - [art. 32](#art-32) — identificação do uso abusivo dos instrumentos de denúncia; e
    - [art. 40](#art-40) — manutenção de representante legal no País.
- **Serviços com controle editorial** e provedores de conteúdo previamente licenciado ficam dispensados daquelas obrigações desde que observem classificação indicativa, transparência etária, mediação parental e canais de denúncia ([art. 39, § 1º](#art-39-p1)).
- **Dispensa de aferição de idade** (Decreto nº 12.880/2026, [art. 22](#dec12880-art-22)): serviços com controle editorial, conteúdo licenciado, musical ou literário, desde que ofereçam contas ou perfis infantis e supervisão parental. O parágrafo único do mesmo artigo dispensa de aferição de idade os provedores de conteúdos **jornalísticos e esportivos** não sujeitos à classificação indicativa e submetidos a controle editorial.
- **Retirada de conteúdo**: conteúdos jornalísticos e submetidos a controle editorial não se sujeitam ao procedimento do [art. 29](#art-29) ([art. 29, § 4º](#art-29-p4)).

Atenção ao alcance dessas dispensas: elas afastam obrigações específicas, não a incidência da Lei. Um serviço dispensado de aferir idade continua sujeito, por exemplo, aos deveres de _design_ do [art. 7º](#art-7) e à vedação de perfilamento publicitário do [art. 22](#art-22).

## Definições

### Sujeitos e serviços ([art. 2º](#art-2))

- **Produto ou serviço de tecnologia da informação**: fornecido a distância, por meio eletrônico, mediante requisição individual — ex.: aplicações de internet, _softwares_, sistemas operacionais de terminais, lojas de aplicações e jogos eletrônicos conectados à internet ou a outra rede _([inciso I](#art-2-i))_.
- **Produto ou serviço de monitoramento infantil**: destinado ao acompanhamento, por pais ou responsáveis legais, das ações de crianças e adolescentes em ambientes digitais, via registro ou transmissão de imagens, sons, localização, atividade ou outros dados _([inciso II](#art-2-ii))_.
- **Rede social**: aplicação de internet cuja finalidade principal é o compartilhamento e a disseminação, pelos usuários, de opiniões e informações (texto, imagem, som ou audiovisual) em uma única plataforma, por meio de contas conectadas ou acessíveis de forma articulada, com conexão permitida entre usuários _([inciso III](#art-2-iii))_.
- **Loja de aplicações de internet**: aplicação que distribui e facilita o _download_, para usuários de terminais, de outras aplicações disponibilizadas por meio de sua plataforma _([inciso VI](#art-2-vi))_.
- **Sistema operacional**: _software_ de sistema que controla as funções básicas de um _hardware_ ou _software_ e permite a execução de outras aplicações, programas ou _softwares_ _([inciso VII](#art-2-vii))_.
- **Serviço com controle editorial**: aplicação cuja finalidade principal é disponibilizar conteúdos previamente selecionados por agente econômico responsável, sem meios automatizados de seleção _([inciso IX](#art-2-ix))_.
- **Autoridade administrativa autônoma de proteção dos direitos de crianças e de adolescentes no ambiente digital**: entidade pública criada por lei, responsável por aplicar e fiscalizar a Lei e por editar regulamentos, observado o Capítulo I da Lei nº 13.848/2019 no processo decisório _([inciso X](#art-2-x))_ — papel atribuído à **ANPD** pelo Decreto nº 12.622/2025.

Aplicam-se ainda os conceitos de **criança e adolescente** do art. 2º do ECA e os de **internet, aplicações de internet e terminal** do [art. 5º do Marco Civil da Internet](/notas/mci#art-5) _([art. 2º, § 1º](#art-2-p1))_.

### Conteúdos, produtos e serviços impróprios ou proibidos (Decreto nº 12.880/2026, [art. 2º](#dec12880-art-2))

- **Conteúdo, produto ou serviço impróprio ou inadequado**: risco à privacidade, à segurança, ao desenvolvimento psicossocial, à saúde mental e física ou ao bem-estar da criança e do adolescente, nos termos da classificação indicativa, quando aplicável _(inciso I)_. A Lei também considera impróprio ou inadequado o que contenha material pornográfico ou seja vedado pela legislação vigente _([art. 9º, § 2º](#art-9-p2))_.
- **Conteúdo, produto ou serviço proibido para crianças e adolescentes**: acesso, disponibilização, aquisição ou consumo expressamente vedado por determinação legal específica _(inciso II)_ — rol no art. 15, § 1º, do mesmo Decreto.
- **Conteúdo pornográfico**: finalidade predominantemente voltada à representação de atos sexualmente explícitos ou à exibição de nudez com conotação ou finalidade sexual, ressalvadas as exceções do art. 16 _(inciso III)_.

### Aferição de idade (Decreto nº 12.880/2026, [art. 2º](#dec12880-art-2))

- **Aferição de idade**: termo geral para os procedimentos que verificam, estimam ou inferem a idade ou a faixa etária de um usuário, por métodos como análise documental, biométrica, de padrões de uso ou outros meios tecnicamente idôneos _(inciso IV)_. Mecanismos:
    - **Verificação de idade**: aferição de alto grau de confiabilidade, nos termos da ANPD, que comprova a exatidão da idade ou faixa etária declarada mediante mecanismos técnicos ou documentais _(inciso V)_.
    - **Sinal de idade**: credencial que atesta a idade ou faixa etária de um usuário a fornecedores de produtos ou serviços direcionados a crianças e adolescentes ou de acesso provável por eles, sem revelar dados pessoais adicionais _(inciso VI)_. Na prática, é o "sim/não" que a loja ou o sistema operacional envia ao aplicativo ("este usuário tem mais de 18 anos"), sem entregar documento nem data de nascimento.
    - **Autodeclaração de idade**: indicação da idade, faixa etária ou outro dado pelo próprio usuário, sem evidências que confirmem sua veracidade ou titularidade _(inciso VII)_ — **vedada** como mecanismo de verificação _(Lei, [art. 9º, § 1º](#art-9-p1))_.

### Práticas e funcionalidades

- **Caixa de recompensa**: funcionalidade de jogos eletrônicos que permite adquirir, mediante pagamento, itens virtuais ou vantagens aleatórias, sem conhecimento prévio do conteúdo ou garantia de utilidade _([art. 2º, IV](#art-2-iv))_.
- **Perfilamento**: tratamento de dados pessoais, automatizado ou não, para classificar uma pessoa em grupo ou perfil e inferir comportamento, situação econômica, saúde, preferências, interesses, localização, deslocamentos, posições políticas ou características assemelhadas _([art. 2º, V](#art-2-v))_.
- **Mecanismo de supervisão parental**: configurações, ferramentas e salvaguardas que permitem a pais ou responsáveis supervisionar, limitar e gerenciar o uso do serviço, o conteúdo acessado e o tratamento de dados pessoais _([art. 2º, VIII](#art-2-viii))_.
- **Monetização**: remuneração, direta ou indireta, de usuário pela publicação ou distribuição de conteúdo, incluída receita por visualizações, assinaturas, doações, patrocínios, publicidade ou venda de produtos e serviços vinculados _([art. 2º, XI](#art-2-xi))_.
- **Impulsionamento**: ampliação artificial do alcance, da visibilidade ou da priorização de conteúdo mediante pagamento pecuniário ou valor estimável em dinheiro _([art. 2º, XII](#art-2-xii))_.
- **Mecanismos de incentivo ao uso excessivo, problemático ou compulsivo** _(Decreto nº 12.880/2026, [art. 9º, parágrafo único](#dec12880-art-9-pu))_: ocultação de pontos naturais de parada; novos conteúdos acionados sem solicitação; recompensas pelo tempo de uso; e notificações excessivas.
- **Práticas manipulativas, enganosas ou coercitivas** _(Decreto nº 12.880/2026, [art. 10, parágrafo único](#dec12880-art-10-pu))_: arquiteturas de escolha, fluxos de interação ou funcionalidades que, por objetivo ou efeito, interferem na autonomia decisória do usuário ou exploram suas vulnerabilidades — em especial as cognitivas e etárias:
    - **obstrução** — caminhos excessivamente complexos ou confusos que dificultam ações como interromper o uso, cancelar serviços ou mudar preferências;
    - **exploração de vulnerabilidades cognitivas** — pressões emocionais, urgências fabricadas, escolhas enviesadas, inferências emocionais ou estímulos inadequados à idade, para induzir decisões contrárias ao melhor interesse da criança ou do adolescente; ou
    - **prejuízo ao exercício de direitos** — ocultar, fragmentar ou dificultar o acesso a controles de privacidade, supervisão parental, consentimento ou revogação de permissões.

## Deveres e vedações essenciais

### Idade no meio digital: quem deve o quê

A Lei não trata crianças e adolescentes como bloco homogêneo: usa a faixa etária, em vários pontos, como critério de graduação de deveres. Os cortes relevantes são o de **18 anos** (fim da incidência da Lei), o de **16 anos** (vinculação obrigatória de conta a responsável legal, [art. 24](#art-24)) e o de **12 anos** (limite entre criança e adolescente na definição do [art. 2º, § 1º](#art-2-p1), remetida ao art. 2º do ECA, com reflexo no consentimento da LGPD).

| Faixa etária | Regime | Fonte do corte |
| --- | --- | --- |
| Menores de 12 (criança) | Tudo o que se aplica aos menores de 18, **mais** o consentimento parental específico e destacado para tratar dados pessoais | [art. 14, § 1º, da LGPD](/notas/lgpd#art-14-p1), pela remissão do [art. 2º, § 1º](#art-2-p1) |
| De 12 a 16 (adolescente) | Deveres gerais **mais** a vinculação obrigatória da conta à de um responsável legal | [art. 24](#art-24) |
| De 16 a 18 (adolescente) | Só os deveres gerais; a supervisão parental passa a ser **por adesão**, não por imposição | Autonomia progressiva ([art. 4º, V](#art-4-v); [art. 5º, § 2º](#art-5-p2)) |
| A partir de 18 | A Lei deixa de incidir sobre a pessoa — mas continua incidindo sobre o **serviço**, se for de acesso provável por crianças e adolescentes | [art. 1º](#art-1) |

**Para todos os menores de 18 anos** (crianças e adolescentes, sem distinção de idade dentro dessa faixa):

- verificação de idade a cada acesso a conteúdo, produto ou serviço impróprio, inadequado ou proibido, vedada a autodeclaração ([art. 9º](#art-9) e [§ 1º](#art-9-p1));
- prevenção e mitigação de riscos de exploração sexual, violência, indução a comportamentos danosos, jogos de azar, publicidade predatória e conteúdo pornográfico, desde a concepção do produto ou serviço ([art. 6º](#art-6));
- configuração **por padrão** no modelo mais protetivo de privacidade e proteção de dados ([art. 7º](#art-7));
- vedação de **perfilamento, análise emocional** e uso de realidade aumentada, estendida ou virtual para direcionar publicidade ([art. 22](#art-22)), e de criação de perfis comportamentais para fins publicitários ([art. 26](#art-26));
- vedação de monetização ou impulsionamento de conteúdo que os retrate de forma erotizada ou sexualmente sugestiva ([art. 23](#art-23));
- vedação de caixas de recompensa (_loot boxes_) em jogos a eles direcionados ou de acesso provável ([art. 20](#art-20));
- direito a ferramentas de supervisão parental fáceis de encontrar e usar, com o essencial ativado por padrão ([arts. 16 a 18](#art-16));
- remoção e comunicação às autoridades de conteúdos de exploração, abuso sexual, sequestro e aliciamento ([art. 27](#art-27)).

**Até os 16 anos**, soma-se um dever adicional e mais intrusivo:

- **vinculação obrigatória** da conta a um usuário ou conta de um responsável legal, no âmbito dos serviços do provedor ([art. 24, _caput_](#art-24));
- na ausência de conta ou usuário do responsável, é **vedado** rebaixar as configurações de supervisão parental abaixo do padrão dos [arts. 3º e 7º](#art-3) ([art. 24, § 5º](#art-24-p5));
- havendo fundados indícios de conta operada por criança ou adolescente **em desconformidade com os requisitos de idade mínima previstos na legislação**, o provedor de rede social deve **suspender o acesso** e garantir procedimento célere de apelação ao responsável ([art. 24, § 4º](#art-24-p4)).

**Onde exatamente fica esse corte.** O texto legal diz "crianças e de adolescentes **de até 16 (dezesseis) anos de idade**". A leitura literal mais natural inclui quem já completou 16 e ainda não completou 17 — diferentemente do ECA, que, quando quis excluir a idade mencionada, escreveu "até doze anos de idade **incompletos**" (art. 2º). Uma leitura restritiva, que pararia no aniversário de 16 anos, é defensável mas contraria a diferença de redação. Nem a lei nem o Decreto nº 12.880/2026 resolveram a ambiguidade, e o ponto ainda não foi enfrentado em guia da ANPD: na dúvida, o dever de proteção prioritária ([art. 3º](#art-3)) recomenda a leitura mais abrangente.

Dentro dessa faixa, um subcorte adicional vem da LGPD: para **menores de 12 anos** (criança, [art. 2º, § 1º](#art-2-p1)), o tratamento de dados pessoais depende de **consentimento específico e em destaque** de ao menos um dos pais ou responsável legal, nos termos do [art. 14, § 1º, da LGPD](/notas/lgpd#art-14-p1), cujo aprimoramento os provedores devem reportar nos relatórios semestrais de transparência ([art. 31, VI](#art-31-vi)).

**Depois dos 16 anos e antes dos 18**, aplicam-se todos os deveres gerais acima, mas **não** a vinculação obrigatória de conta a responsável do [art. 24](#art-24) — o que reflete o princípio da **autonomia e do desenvolvimento progressivo** ([art. 4º, V](#art-4-v); [art. 5º, § 2º](#art-5-p2)), também determinante do desenho das próprias ferramentas de supervisão parental ([art. 17, § 2º](#art-17-p2)) e da autorização de _download_ de aplicativos por lojas e sistemas operacionais (Decreto nº 12.880/2026, [art. 25, § 3º](#dec12880-art-25-p3)). Na prática, o corte concentra nessa faixa final da adolescência uma supervisão parental **por adesão** — dependente da existência de conta do responsável e do padrão protetivo já configurado — em vez da vinculação **por imposição** que vale antes.

**Um ponto de escopo em aberto.** O _caput_ do art. 24 fala em "provedores de produtos ou serviços direcionados a crianças e a adolescentes ou de acesso provável por eles" — redação bem mais ampla do que o título do Capítulo IX, "Das Redes Sociais", e do que os §§ 1º a 4º, que se referem expressamente a provedores de redes sociais. Lido isoladamente, o _caput_ imporia a vinculação de contas a qualquer serviço de acesso provável; lido no sistema do capítulo, apenas a redes sociais. É uma das perguntas que a regulamentação da ANPD ainda precisa responder.

### Principais vedações, em lista

- Não permitir **autodeclaração de idade** como mecanismo de verificação para conteúdo impróprio, inadequado ou proibido ([art. 9º, § 1º](#art-9-p1)).
- Não usar dados coletados para aferição de idade em **qualquer outra finalidade**, inclusive perfis comportamentais ([art. 13](#art-13); Decreto nº 12.880/2026, [art. 24, III](#dec12880-art-24-iii) e [§ 1º](#dec12880-art-24-p1)).
- Não operar, por padrão, em configuração menos protetiva que a máxima disponível ([arts. 7º](#art-7) e [17, § 4º](#art-17-p4)).
- Não empregar **perfilamento, análise emocional, realidade aumentada, estendida ou virtual** para direcionar publicidade a crianças e adolescentes ([art. 22](#art-22); Decreto nº 12.880/2026, [art. 33](#dec12880-art-33)).
- Não criar **perfis comportamentais** de crianças e adolescentes para publicidade comercial ([art. 26](#art-26)).
- Não **monetizar ou impulsionar** conteúdo que retrate crianças e adolescentes de forma erotizada, sexualmente sugestiva ou em contexto sexual adulto ([art. 23](#art-23)), nem em situações violadoras, vexatórias ou degradantes (Decreto nº 12.880/2026, [art. 35](#dec12880-art-35)).
- Não oferecer **caixas de recompensa** em jogos direcionados a crianças e adolescentes ou de acesso provável ([art. 20](#art-20)).
- Não manipular interfaces para enfraquecer salvaguardas ou ferramentas de supervisão parental ([art. 18, § 2º](#art-18-p2)).
- Não deixar de **remover e comunicar** conteúdos de exploração, abuso sexual, sequestro e aliciamento às autoridades ([art. 27](#art-27)).
- Não operar no País sem **representante legal** com poderes de recebimento de citações e de resposta perante Executivo, Judiciário e Ministério Público ([art. 40](#art-40)).
- **Vedação dirigida ao regulador**: a regulamentação não pode autorizar ou resultar em **vigilância massiva, genérica ou indiscriminada**, nem em práticas contrárias à liberdade de expressão e à privacidade ([art. 34, § 1º](#art-34-p1)); o [art. 37, parágrafo único](#art-37-pu), dirigido ao Executivo, acrescenta o verbo "impor".

## Quem pode o quê: a divisão de competências normativas

O ECA Digital distribui competências de um jeito próprio, diferente do da [LGPD](/notas/lgpd). Três traços o distinguem: a lei **não nomeou** a autoridade que a aplicaria, deixando a escolha ao Executivo; as sanções foram **partidas** entre a autoridade administrativa e o Poder Judiciário; e boa parte da governança ficou com **outros ministérios**, não com o regulador. Entender esses recortes ajuda a saber, diante de cada obrigação, de quem esperar a regra que ainda falta.

### Quem pode legislar

A base material é o art. 227 da Constituição — dever da família, da sociedade e do Estado de assegurar a crianças e adolescentes, com **absoluta prioridade**, um conjunto de direitos e de colocá-los a salvo de negligência, exploração e violência.

A competência legislativa é mista, e vale distinguir:

- **proteção à infância e à juventude** é competência **concorrente** da União, dos Estados e do Distrito Federal (CF, art. 24, XV), cabendo à União as normas gerais (CF, art. 24, § 1º) — foi nessa chave que se editou o próprio [ECA](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm);
- já o **objeto** que o ECA Digital regula — produtos e serviços de tecnologia da informação e tratamento de dados pessoais — recai em competência **privativa** da União (CF, art. 22, IV e XXX).

Daí a lei ser federal e a autoridade fiscalizar seu cumprimento "em todo o território nacional" ([art. 34](#art-34)), sem que isso esvazie os órgãos locais do sistema de garantia de direitos: conselhos tutelares e Ministério Público, por exemplo, seguem com atribuições próprias (Decreto nº 12.880/2026, [art. 1º, parágrafo único](#dec12880-art-1-pu)).

### O que só a lei pode fazer (reserva legal)

Pela regra do art. 5º, II, da Constituição, os deveres impostos a fornecedores e as penalidades correspondentes precisam vir de lei. Estão nesse núcleo:

- os **deveres e vedações substantivos** — prevenção e _design_ ([arts. 5º a 8º](#art-5)), aferição de idade ([arts. 9º a 15](#art-9)), supervisão parental ([arts. 16 a 18](#art-16)), publicidade ([arts. 22](#art-22) e [23](#art-23)), redes sociais ([arts. 24 a 26](#art-24)) e remoção de conteúdo ([arts. 27 a 30](#art-27));
- os **tipos de sanção e seus limites** — advertência, multa de até 10% do faturamento do grupo econômico no Brasil (ou de R$ 10 a R$ 1.000 por usuário cadastrado, na ausência de faturamento), limitada a R$ 50 milhões por infração, suspensão e proibição ([art. 35](#art-35));
- a **repartição da competência sancionadora** entre autoridade administrativa e Judiciário ([art. 35, § 5º](#art-35-p5));
- a **exigência de que a autoridade seja entidade criada por lei** ([art. 2º, X](#art-2-x)).

Três episódios do histórico da lei mostram essas fronteiras funcionando na prática:

- **A competência da Anatel.** O § 7º do art. 35 do projeto atribuía à agência o encaminhamento das ordens de bloqueio. Foi **vetado por vício de iniciativa**: definir atribuições de órgão da administração federal é iniciativa privativa do Presidente (CF, art. 61, § 1º, II, "e"), e sua organização se faz por decreto (art. 84, VI, "a"). Poucos dias depois, o mesmo conteúdo foi restabelecido pelo [Decreto nº 12.622/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12622.htm) — que ainda acrescentou o CGI.br para o domínio ".br". Não era o conteúdo que estava errado; era o veículo.
- **A destinação das multas.** O art. 36 do projeto, que vinculava a receita das multas ao FNCA, foi **vetado** por incompatibilidade com a LDO de 2025. A [Medida Provisória nº 1.318/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1318.htm) tentou recompô-la, mas **perdeu a eficácia** em 25/2/2026 por não ter sido convertida em lei no prazo do art. 62, § 3º, da Constituição. Resultado: hoje não há destinação específica — contraste com a LGPD, cujo [art. 52, § 5º](/notas/lgpd#art-52-p5) manda o produto das multas ao Fundo de Defesa de Direitos Difusos.
- **A vigência.** O veto à _vacatio legis_ e sua recomposição por medida provisória só se estabilizaram quando a MP nº 1.317/2025 virou a [Lei nº 15.352/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15352.htm), que deu a redação atual ao [art. 41-A](#art-41-a) e revogou a MP nº 1.319/2025. Nenhum decreto poderia ter feito isso.

### A autoridade que a lei não nomeou

O [art. 2º, X](#art-2-x), define a "autoridade administrativa autônoma de proteção dos direitos de crianças e de adolescentes no ambiente digital" como **entidade da administração pública criada por lei**, responsável por zelar pela aplicação da Lei, fiscalizá-la e editar regulamentos e procedimentos para sua execução, observado, no processo decisório, o Capítulo I da [Lei nº 13.848/2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13848.htm) (regime geral das agências reguladoras).

Repare no desenho: a lei descreveu o cargo, mas não disse quem o ocuparia. Coube ao [Decreto nº 12.622/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12622.htm) **designar a ANPD**. E o decreto só podia designar — jamais criar —, porque autarquia depende de lei específica (CF, art. 37, XIX) e a própria lei exigia entidade "criada por lei". A escolha recaiu sobre uma autoridade que já existia.

O encaixe institucional se completou depois: a Lei nº 15.352/2026 (conversão da MP nº 1.317/2025) transformou a Autoridade Nacional na **Agência** Nacional de Proteção de Dados e a incluiu no rol de agências reguladoras do art. 2º da Lei nº 13.848/2019 — a mesma lei cujo Capítulo I o art. 2º, X, do ECA Digital já mandava observar. O Decreto nº 12.881/2026 aprovou a nova Estrutura Regimental, e desde **8 de abril de 2026** a Agência exerce suas atribuições de forma plena, extinta a antiga Autoridade.

Uma consequência prática costuma passar despercebida: ao atuar aqui, a ANPD exerce as competências **do ECA Digital**, não as da LGPD. O fundamento de cada exigência é o [art. 34](#art-34) desta Lei, e não o [art. 55-J da LGPD](/notas/lgpd#art-55-j) — ainda que sejam a mesma Agência, o mesmo [Conselho Diretor](/notas/regimento-interno-anpd) e o mesmo corpo técnico em todas as frentes. Desde 2026 são **três** os mandatos que convivem assim (LGPD, ECA Digital e, pelo Decreto nº 12.975/2026, os deveres dos provedores no [Marco Civil](/notas/mci)), cada um com sua base legal própria e seu próprio rol de sanções. O rito de deliberação, esse sim, é comum: os três chegam ao colegiado pelo caminho do [regimento interno](/notas/regimento-interno-anpd) da Agência.

### O que a ANPD pode fazer, na letra do regulamento

O Decreto nº 12.881/2026 (Anexo I, art. 2º, incisos XXV a XXXVI) é hoje a lista mais concreta das competências da Agência sob o ECA Digital, e vale como mapa de leitura:

- zelar pela aplicação da Lei, editar normas complementares e fiscalizar seu cumprimento em todo o território nacional (XXV);
- **estabelecer os processos e procedimentos administrativos** para apurar infrações e aplicar advertência e multa (XXVI) — ponto decisivo, ver "Rito das sanções", abaixo;
- atualizar anualmente os valores das multas pelo IPCA (XXVII);
- emitir recomendações e orientações sobre práticas relevantes (XXVIII);
- fixar diretrizes e padrões mínimos de supervisão parental (XXIX) e apreciar mecanismos submetidos voluntariamente pelos fornecedores (XXXIV);
- avaliar o grau de efetividade e o progresso dos mecanismos de verificação de idade das redes sociais (XXX);
- definir critérios e requisitos para o acesso de pesquisadores aos dados (XXXI);
- **normatizar o processo de suspensão de acesso a redes sociais** e a apelação do responsável legal (XXXII);
- requisitar relatórios de impacto, de monitoramento e de avaliação da proteção de dados (XXXIII);
- atuar como reguladora e promotora de soluções técnicas de verificação de idade, inclusive definindo requisitos mínimos de confiabilidade, eficácia, transparência, segurança e interoperabilidade (XXXV);
- definir os critérios de aferição do grau de intervenção e de aplicação proporcional das obrigações do [art. 39, § 3º](#art-39-p3) (XXXVI).

O mesmo Anexo repete, em seus §§ 9º e 10, os dois limites da Lei: nada de vigilância massiva e observância de assimetrias regulatórias com abordagem responsiva.

### Duas trilhas de regulamentação: decreto e normas da ANPD

O ECA Digital abriu **duas** vias regulamentares distintas, e confundi-las é fonte comum de erro:

1. **Decreto do Poder Executivo** — o [art. 37](#art-37) determina que "o Poder Executivo regulamentará, no que couber, o disposto nesta Lei". É a via do [Decreto nº 12.880/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12880.htm), editado com fundamento no art. 84, IV e VI, "a", da Constituição, e tendo em vista o art. 227 da Constituição, dispositivos do ECA (inclusive o art. 149), o art. 37 do CDC, os arts. 15 a 17 da Lei nº 14.852/2024 e o [art. 37](#art-37) da própria Lei.
2. **Normas complementares da autoridade** — o [art. 34](#art-34) autoriza a ANPD a "editar normas complementares para regulamentar os seus dispositivos". É a via das resoluções e dos guias, hoje em boa parte pendentes (ver "Regulamentos e atos aplicáveis", abaixo).

As duas se comunicam: em vários pontos o decreto **repassa à ANPD** o que a lei atribuíra genericamente ao Poder Executivo. O caso mais claro é o [art. 12, § 3º](#art-12-p3) da Lei ("ato do Poder Executivo regulamentará os requisitos mínimos de transparência, de segurança e de interoperabilidade"), delegado à Agência pelo [art. 24, § 2º, do Decreto](#dec12880-art-24-p2).

A segunda trilha é a mais movimentada: lei e decreto remetem à ANPD dezenas de pontos — requisitos mínimos de segurança por padrão ([dec. art. 10](#dec12880-art-10)), IA generativa e agentes conversacionais ([dec. art. 11, parágrafo único](#dec12880-art-11-pu)), parâmetros de aferição de idade ([dec. art. 24, § 2º](#dec12880-art-24-p2)), padrões de supervisão parental ([art. 17, § 1º](#art-17-p1)), avaliação da verificação de idade nas redes sociais ([art. 24, § 2º](#art-24-p2)), certificação de soluções técnicas ([dec. art. 30](#dec12880-art-30)), habilitação de entidades notificantes ([dec. art. 44, § 1º](#dec12880-art-44-p1)) e de instituições de pesquisa ([dec. art. 48](#dec12880-art-48)), entre outros.

Nas duas trilhas incidem os **mesmos dois limites expressos**, escritos em termos quase idênticos:

- **vedação à vigilância massiva** — a regulamentação não pode, "em nenhuma hipótese", autorizar ou resultar em mecanismos de vigilância massiva, genérica ou indiscriminada, nem em práticas contrárias à liberdade de expressão, à privacidade, à proteção integral e ao tratamento diferenciado dos dados de crianças e adolescentes ([art. 34, § 1º](#art-34-p1), dirigido à autoridade; [art. 37, parágrafo único](#art-37-pu), dirigido ao Executivo, que acrescenta o verbo "impor"). É raro uma lei brasileira endereçar proibição tão direta a quem vai regulamentá-la;
- **assimetria regulatória e abordagem responsiva** — tratamento diferenciado e proporcional conforme natureza, risco e modelo de negócio ([art. 34, § 2º](#art-34-p2)), reforçado pela modulação do [art. 39](#art-39) e pela definição de etapas de implementação ([dec. art. 49](#dec12880-art-49)).

### O que só o Judiciário pode fazer

Aqui está a diferença mais marcante em relação à LGPD, em que todas as sanções ficam com a ANPD ([art. 52 da LGPD](/notas/lgpd#art-52)). No ECA Digital a competência é **dividida pela própria lei** ([art. 35, § 5º](#art-35-p5)): advertência e multa cabem à **ANPD**; suspensão temporária e proibição do exercício das atividades, ao **Poder Judiciário**.

A opção faz sentido pelo efeito das medidas: suspender ou proibir a atividade implica, quando não cumprida diretamente pelo infrator, **ordem de bloqueio** dirigida a prestadoras de conexão, gestoras de pontos de troca de tráfego, provedores de DNS e demais agentes que viabilizam a conexão ([art. 35, § 6º](#art-35-p6)) — medida que atinge a comunicação de terceiros e cuja gravidade a lei quis submeter a **reserva de jurisdição**, isto é, à decisão exclusiva de um juiz. Na execução, a ordem passa pela Anatel (conexão) e pelo CGI.br (domínios ".br"), nos termos do Decreto nº 12.622/2025.

Também depende de decisão judicial a **autorização do art. 149 do ECA** para conteúdo monetizado ou impulsionado que explore de forma habitual a imagem ou a rotina de criança ou adolescente (Decreto nº 12.880/2026, [art. 34](#dec12880-art-34)) — nenhum ato administrativo dispensa esse alvará. O decreto encarrega o MJSP de atuar **em articulação** com o CNJ e o CNMP para operacionalizar o dispositivo ([dec. art. 34, § 3º](#dec12880-art-34-p3)): um decreto do Executivo não comanda o Judiciário nem o Ministério Público, cujos atos normativos próprios cabem aos respectivos conselhos (CF, arts. 103-B, § 4º, e 130-A, § 2º).

### Os outros órgãos

Ao contrário da LGPD, aqui a ANPD divide a competência com vários órgãos. A repartição, fixada sobretudo pelo Decreto nº 12.880/2026, é:

- **MJSP** — classificação indicativa ([dec. arts. 12](#dec12880-art-12) e [13](#dec12880-art-13)), estrutura e funcionamento do Centro Nacional de Triagem de Notificações e normas sobre os alvarás de atividade artística;
- **Polícia Federal** — recebimento centralizado, triagem e distribuição dos relatórios de violações graves ([dec. arts. 36](#dec12880-art-36) e [37](#dec12880-art-37));
- **MGI** — soluções tecnológicas públicas de verificação de idade e de vinculação a responsáveis legais ([dec. arts. 20](#dec12880-art-20) e [28](#dec12880-art-28));
- **MDHC** — coordenação da Política Nacional e do comitê intersetorial ([dec. arts. 7º](#dec12880-art-7) e [8º](#dec12880-art-8));
- **Anatel e CGI.br** — execução das ordens judiciais de bloqueio (Decreto nº 12.622/2025, art. 3º).

Essa divisão de trabalho está desenvolvida em "Política Nacional e arranjo institucional", mais abaixo.

## Deveres gerais de prevenção e _design_ ([arts. 5º a 8º](#art-5))

### Prevenção e mitigação de riscos ([art. 6º](#art-6))

Medidas razoáveis **desde a concepção e ao longo da operação** para prevenir e mitigar riscos de acesso, exposição, recomendação ou facilitação de contato com:

- [I](#art-6-i) — exploração e abuso sexual;
- [II](#art-6-ii) — violência física, intimidação sistemática virtual (_cyberbullying_) e assédio;
- [III](#art-6-iii) — indução, incitação ou auxílio a comportamentos danosos à saúde física ou mental (violência, substâncias que causem dependência, autodiagnóstico e automedicação, automutilação e suicídio);
- [IV](#art-6-iv) — promoção e comercialização de jogos de azar, apostas de quota fixa, loterias, tabaco, bebidas alcoólicas, narcóticos e produtos de comercialização proibida;
- [V](#art-6-v) — práticas publicitárias predatórias, injustas ou enganosas e outras que causem danos financeiros; e
- [VI](#art-6-vi) — conteúdo pornográfico.

O dever do fornecedor **não exime** pais e responsáveis, quem se beneficia financeiramente da produção ou distribuição de imagens de crianças e adolescentes, nem as autoridades administrativas, judiciárias e policiais ([art. 6º, § 1º](#art-6-p1)). Incluem-se ainda políticas de prevenção à intimidação sistemática virtual, mecanismos de apoio às vítimas e programas educativos de conscientização ([art. 6º, § 2º](#art-6-p2)).

### Proteção por padrão ([art. 7º](#art-7))

Configuração, **por padrão e desde a concepção**, no modelo mais protetivo disponível de privacidade e proteção de dados. Informações claras e acessíveis são obrigatórias para que criança, adolescente e responsáveis façam escolhas informadas quanto à adoção de configurações menos protetivas. Aplicam-se os princípios do [art. 6º da LGPD](/notas/lgpd#art-6).

### Obrigações operacionais ([art. 8º](#art-8))

- [I](#art-8-i) — **gerenciamento de riscos** de recursos, funcionalidades e sistemas quanto a segurança e saúde;
- [II](#art-8-ii) — avaliação do conteúdo por faixa etária, compatível com a classificação indicativa;
- [III](#art-8-iii) — sistemas e processos para impedir o encontro de conteúdos ilegais, pornográficos e manifestamente inadequados;
- [IV](#art-8-iv) — configurações que **evitem o uso compulsivo**; e
- [V](#art-8-v) — informação extensiva sobre a faixa etária indicada no momento do acesso.

### Uso excessivo, problemático ou compulsivo (Decreto nº 12.880/2026, [arts. 9º a 11](#dec12880-art-9))

Obrigação de implementar mecanismos que evitem esse uso, com a ANPD regulamentando os **requisitos mínimos de segurança por padrão** e coibindo práticas manipulativas.

### Obrigações para serviços de IA generativa e agentes conversacionais ([art. 11 do Decreto nº 12.880/2026](#dec12880-art-11))

- **transparência** quanto ao caráter sintético e automatizado da interação;
- **prevenção de manipulação comportamental**;
- **avaliação do risco algorítmico** à segurança e à saúde; e
- **salvaguardas** ao desenvolvimento físico, mental e psicossocial.

A ANPD regulamentará e fiscalizará o dispositivo. Vale ler esse artigo ao lado do [art. 16, § 4º](#dec12880-art-16-p4), que **equipara a conteúdo pornográfico** a interação com sistemas que produzam ou troquem, de forma automatizada, material sexualmente explícito — as duas normas juntas formam o regime aplicável a companheiros virtuais e geradores de imagem.

## Vedação de acesso a conteúdos e serviços impróprios ([art. 9º](#art-9); Decreto nº 12.880/2026, [arts. 14 a 23](#dec12880-art-14))

Quem disponibiliza conteúdo, produto ou serviço **impróprio, inadequado ou proibido para menores de 18 anos** deve adotar medidas eficazes para impedir o acesso, com **mecanismos confiáveis de verificação de idade a cada acesso**, vedada a autodeclaração. Provedores de conteúdo pornográfico devem impedir a criação de contas ou perfis por crianças e adolescentes ([art. 9º, § 3º](#art-9-p3)).

O Decreto separa dois regimes com consequências distintas:

- **Impróprio ou inadequado** ([art. 14](#dec12880-art-14)): a disponibilização fica condicionada, **cumulativamente**, à observância da classificação indicativa, à adoção de medidas de segurança por padrão desde a concepção e à oferta de ferramentas efetivas de supervisão parental com bloqueio configurável. O parágrafo único autoriza a **ANPD a determinar medidas de proteção adicionais** quando identificar riscos relevantes — é um poder de intervenção caso a caso, sem necessidade de nova norma.
- **Proibido** ([art. 15](#dec12880-art-15)): exige mecanismos eficazes de verificação de idade **e** impedimento efetivo do acesso, da fruição ou do consumo.

São considerados **proibidos** (Decreto nº 12.880/2026, [art. 15, § 1º](#dec12880-art-15-p1)): armas, munições e explosivos; bebidas alcoólicas; produtos fumígenos, inclusive dispositivos eletrônicos para fumar (DEF); produtos que causem dependência; fogos de estampido e artifício; jogos de azar, apostas e loterias; caixas de recompensa; conteúdo pornográfico; serviços de acompanhantes; aplicações voltadas a encontros ou relacionamentos de cunho sexual; e, por cláusula de abertura (inciso XI), quaisquer outros com vedação legal. Nos casos dos incisos VI a X — dos jogos de azar às aplicações de encontros —, o fornecedor deve ainda **vedar a criação de contas e perfis** por crianças e adolescentes e **identificar e remover** as contas já operadas por eles ([§ 2º](#dec12880-art-15-p2)).

Outros pontos relevantes do Decreto nº 12.880/2026:

- **Conteúdo pornográfico** (art. 16) é definido pela finalidade, funcionalidade ou modelo de negócio; ficam excluídos contextos educativo, artístico, informativo ou jornalístico, educação em saúde, livros e áudio. Quem disponibiliza esse conteúdo, próprio ou de terceiros, deve adotar verificação própria que impeça o acesso **inclusive a prévias, imagens, títulos e legendas** (§ 1º). **Equipara-se a conteúdo pornográfico** a interação com sistemas que permitam diálogos, produção ou troca de vídeos e imagens de teor sexualmente explícito de forma artificial ou automatizada (§ 4º).
- **Exibição por padrão** (art. 17): ocultar, desfocar ou não exibir conteúdo pornográfico a usuário não cadastrado, não verificado ou identificado como criança ou adolescente, ou exigir verificação para desbloqueio.
- **Comércio eletrônico** (art. 18): bloqueio por padrão no cadastro ou impedimento na aquisição, para os produtos dos incisos I a VII.
- **Redes sociais** (art. 19): criar versões sem o conteúdo proibido — hipótese em que fica dispensada a verificação — ou adotar verificação efetiva.
- **Enquadramento** (arts. 16, § 3º, e 19, § 2º): a ANPD pode, a qualquer tempo, determinar enquadramento diverso do autoatribuído pelo fornecedor — inclusive para decidir se um serviço é ou não "rede social".
- **Lojas e sistemas operacionais** (art. 21) devem impedir a disponibilização de aplicações de loterias e apostas não autorizadas ou sem solução de verificação de idade.
- **Classificação indicativa** (arts. 12 e 13): competência do MJSP, agora considerando riscos de conteúdo, privacidade, segurança e saúde mental, com sinalização de interação entre usuários, _loot boxes_, estímulo ao uso problemático, microtransações e práticas manipulativas.

## Mecanismos de aferição de idade ([arts. 10 a 15](#art-10); Decreto nº 12.880/2026, [arts. 24 a 30](#dec12880-art-24))

O [art. 11](#art-11) autoriza o poder público a atuar como **regulador, certificador ou promotor** de soluções técnicas, assegurada a participação social por consulta pública.

**Requisitos da aferição de idade** (Decreto nº 12.880/2026, [art. 24](#dec12880-art-24)):

- I — a **proporcionalidade** entre a solução adotada e o nível de risco associado ao serviço;
- II — a **acurácia, a robustez e a confiabilidade**;
- III — a **vedação de uso, para finalidade diversa**, de dados coletados para fins de aferição de idade ([art. 13](#art-13) da Lei);
- IV — a **minimização de dados**, entendida como a restrição do tratamento ao mínimo necessário para fins de aferição de idade;
- V — a proteção da **privacidade** dos usuários;
- VI — a vedação ao **compartilhamento contínuo, automatizado e irrestrito** de dados pessoais;
- VII — a **segurança** dos dados coletados;
- VIII — a **vedação à rastreabilidade** da identidade e do histórico de acessos, solicitações e verificações realizadas pelos cidadãos;
- IX — a **interoperabilidade** entre sistemas e soluções públicas e privadas;
- X — a **inclusão e a não discriminação**; e
- XI — a **transparência e a auditabilidade**.

A vedação do inciso III alcança o tratamento para criação de perfis comportamentais (§ 1º). O tratamento decorrente de coleta documental limita-se ao dado relativo à idade ou à confirmação da faixa etária, vedados armazenamento, retenção ou qualquer conservação da imagem ou da cópia do documento, que deve ser eliminada de modo **imediato e irreversível** após a captura da informação necessária (§ 3º).

Esse rol é o núcleo do interesse de uma autoridade de proteção de dados no tema: verificar idade exige tratar dados pessoais, e o decreto responde a isso com minimização, proibição de finalidade secundária, vedação de rastreabilidade e eliminação imediata do documento — o desenho que a literatura chama de _double anonymity_, em que nem o verificador sabe o que o usuário acessa, nem o serviço sabe quem é o usuário.

**Obrigações das lojas de aplicações e dos sistemas operacionais** ([art. 12](#art-12); Decreto nº 12.880/2026, [art. 25](#dec12880-art-25)):

- medidas proporcionais, auditáveis e tecnicamente seguras de aferição ([inciso I](#art-12-i));
- oferta de supervisão parental configurável pelos responsáveis ([inciso II](#art-12-ii));
- fornecimento de **sinal de idade** por API segura, exclusivamente para as finalidades da Lei, observada a minimização de dados e vedado o compartilhamento contínuo, automatizado e irrestrito ([inciso III](#art-12-iii) e [§ 1º](#art-12-p1));
- esse fornecimento é **gratuito** e limitado ao estritamente necessário, **vedado** o envio de data de nascimento exata, identidade civil ou dados de perfilamento (Decreto, [art. 25, _caput_ e § 1º](#dec12880-art-25));
- solicitar a declaração de idade na criação da conta e, além dela, **aferir a idade por método confiável**, preferencialmente com credenciais verificáveis (Decreto, art. 25, § 2º, I e II);
- permitir contestação e retificação da classificação etária mediante evidência adicional, com decisão fundamentada (Decreto, art. 25, § 2º, III);
- adotar medidas contra múltiplas contas e artifícios de burla (Decreto, art. 25, § 2º, IV); e
- solicitar autorização dos responsáveis para _download_ e instalação e informá-los da classificação indicativa antes da autorização, vedada a presunção de autorização pelo silêncio ([art. 12, § 2º](#art-12-p2); Decreto, art. 25, § 3º).

**Do lado do fornecedor** ([arts. 14](#art-14) e [15](#art-15); Decreto nº 12.880/2026, [arts. 26](#dec12880-art-26) e [27](#dec12880-art-27)):

- adotar medidas técnicas e organizacionais para **garantir o recebimento** das informações de idade de que trata o [art. 12](#art-12) ([art. 14](#art-14)) e, recebidos os sinais, **adequar a experiência** do produto ou serviço (Decreto, art. 26, _caput_ e § 1º);
- **independentemente** das medidas adotadas pelos sistemas operacionais e pelas lojas de aplicações, implementar **mecanismos próprios** para impedir o acesso indevido a conteúdos inadequados à faixa etária ([art. 14, parágrafo único](#art-14-pu));
- fornecedores acessíveis por navegador **devem aferir a idade**, podendo utilizar sinais disponibilizados pelo sistema operacional, pela loja ou por outro fornecedor (Decreto, art. 26, § 2º);
- havendo **divergência** entre a aferição própria e o sinal recebido, adotar as medidas correspondentes à alternativa **mais protetiva** (Decreto, art. 25, § 4º);
- o recebimento do sinal **não isenta** a responsabilidade do fornecedor pela efetividade da adequação etária e das medidas de proteção adotadas (Decreto, art. 26, § 3º); e
- possibilitar ao usuário **meio adequado para contestar** a idade ou faixa etária aferida (Decreto, art. 27).

**Papel do Estado**: o MGI poderá disponibilizar solução tecnológica pública e gratuita para verificação de idade e para confirmar a vinculação de crianças e adolescentes a responsáveis legais (Decreto nº 12.880/2026, [arts. 20](#dec12880-art-20) e [28](#dec12880-art-28)). A ANPD disciplinará a **certificação** das soluções, diretamente ou por entidades acreditadoras (art. 30), e poderá determinar medidas técnicas adicionais para impedir ou dificultar mecanismos tecnológicos que visem a contornar ou burlar as regras de aferição de idade e de vedação de acesso (art. 29), observados os limites do art. 34, §§ 1º e 2º, da Lei e o estado da técnica.

### Dupla camada de verificação

O desenho normativo não desloca a aferição para um único ponto da cadeia: ela é exigida **cumulativamente** na camada do dispositivo (lojas de aplicações e sistemas operacionais, [art. 12](#art-12)) e na camada do serviço (fornecedor, [art. 14, parágrafo único](#art-14-pu)).

Havendo conflito entre as duas camadas, prevalece a alternativa **mais protetiva**, e o sinal recebido nunca opera como excludente de responsabilidade. Fecha o arranjo o [art. 15](#art-15): o cumprimento das obrigações do Capítulo IV **não exime os demais agentes da cadeia digital** de suas responsabilidades legais, cabendo a todos os envolvidos garantir **de forma solidária** a proteção integral de crianças e de adolescentes.

#### Comparação internacional

O ponto de comparação mais próximo são as _App Store Accountability Acts_ norte-americanas — [Utah](https://le.utah.gov/~2025/bills/static/SB0142.html) (SB 142), [Texas](https://capitol.texas.gov/tlodocs/89R/billtext/html/SB02420F.HTM) (SB 2420) e [Louisiana](https://www.legis.la.gov/legis/BillInfo.aspx?s=25RS&b=HB570) (HB 570). As três distribuem obrigações entre loja e desenvolvedor, mas em lógica inversa quanto à responsabilidade: preveem **porto seguro** (_safe harbor_) para o desenvolvedor que atue de boa-fé confiando nos dados de idade e de consentimento recebidos da loja.

A lei texana ainda rendeu litígio: sua vigência, prevista para 1º de janeiro de 2026, foi barrada por liminar federal em dezembro de 2025, por alegada violação à Primeira Emenda; a lei só passou a valer em **4 de junho de 2026**, quando o [Quinto Circuito suspendeu a liminar](https://www.pearlcohen.com/fifth-circuit-stays-injunctions-against-texas-app-store-accountability-act/) enquanto julga o recurso, e em 6 de julho de 2026 a Suprema Corte **negou os pedidos de urgência** para cassar essa suspensão. A lei segue em vigor com o mérito pendente. O contraste com o Brasil é de desenho constitucional, não de mérito: lá a discussão é se exigir verificação de idade restringe a liberdade de expressão de adultos; aqui, o art. 227 da Constituição dá à proteção da criança prioridade absoluta expressa, e o debate se deslocou para *como* verificar sem criar vigilância — a preocupação que o [art. 34, § 1º](#art-34-p1), transformou em vedação escrita.

A [Digital Age Assurance Act](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB1043) da Califórnia (AB 1043) concentra o dever de emissão do sinal etário nos provedores de sistema operacional.

Já o **Reino Unido** (dever de _highly effective age assurance_ do serviço regulado, sob o [Online Safety Act 2023](https://www.legislation.gov.uk/ukpga/2023/50/section/82)) e a **Austrália** ([Social Media Minimum Age](https://www.legislation.gov.au/C2024A00127/asmade), Parte 4A do [Online Safety Act 2021](https://www.legislation.gov.au/C2021A00076/latest/text), com dever de _reasonable steps_ da plataforma desde dezembro de 2025) alocam a obrigação **à camada do serviço**, sem dever equivalente para lojas e sistemas operacionais.

A combinação brasileira — dever em ambas as camadas, vedação expressa de exoneração pelo sinal recebido e solidariedade — não encontra correspondência direta nesses regimes.

### O mapa técnico da ANPD: o Radar Tecnológico nº 5

A Lei e o Decreto dizem **o que** a aferição de idade tem de garantir, e deixam as tecnologias de fora. Elas estão no [Radar Tecnológico nº 5 — Mecanismos de aferição de idade](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar-tecnologico-5-mecanismos-de-afericao-de-idade.pdf) (ANPD, outubro de 2025), publicado meses antes do Decreto. O documento é **não normativo**: a série se apresenta como abordagem didática, "sem a intenção de esgotar as temáticas ou firmar posicionamentos institucionais", e o capítulo sobre proteção de dados avisa que não é exaustivo. Serve como mapa do terreno; as decisões da Agência estão nos atos listados em "Normas", abaixo.

#### Aferição é o guarda-chuva; verificação, estimativa e inferência são os métodos

O primeiro serviço do Radar é terminológico: a Lei usa "aferição" e "verificação" sem defini-las, e a literatura internacional usa quatro ou cinco palavras para coisas parecidas. O documento adota **aferição de idade** como termo guarda-chuva — equivalente ao _age assurance_ da [ISO/IEC 27566-1](https://www.iso.org/standard/88143.html), que o Radar ainda citava como proposta em fase final de aprovação (FDIS) e que veio a ser **publicada em dezembro de 2025**, já depois dele — e organiza sob ele três métodos:

- **Verificação** — determina a idade com alto grau de acurácia, por prova documental ou por consulta a base oficial. Subdivide-se em verificação por **documento** (envio de imagem ou vídeo, leitura por OCR, comparação da selfie com a foto do documento); por **cartão de crédito**; por **ato de terceiro** (consentimento parental, conta familiar, reconhecimento social por usuários já verificados); e como **serviço** (_verification as a service_ — VaaS), em que um terceiro confiável confronta os dados com bases oficiais e devolve um atestado, eventualmente na forma de _token_.
- **Estimativa** — calcula a idade *provável*, sem documento. Por **biometria** (face, voz), por **análise de comportamento** (histórico de navegação, cadência de digitação, tempo de resposta) ou por **teste de capacidade** (perguntas-desafio que situam o usuário numa faixa etária).
- **Inferência** — conclusão indireta a partir de informações já verificadas ou de sinais contextuais, sem pedir documento nem coletar biometria.

O segundo serviço decide a leitura do [art. 9º](#art-9): **a autodeclaração vale como característica que acompanha outro método, jamais como método isolado**. O Radar segue nisso o Ofcom e o ICO britânicos, e a própria fiscalização brasileira, no caso descrito adiante. A vedação escrita no [art. 9º, § 1º](#art-9-p1), da Lei ratificou o estado da técnica.

#### Como o mecanismo funciona por dentro

Qualquer que seja o método, o Radar descreve o funcionamento como uma sequência de cinco etapas — útil porque é nela que se localizam os pontos de risco que os requisitos do [art. 24 do Decreto](#dec12880-art-24) tentam endereçar:

1. **Coleta** — fotografia, vídeo, áudio, documento oficial ou sinais indiretos.
2. **Pré-processamento** — leitura por OCR, normalização de imagem ou áudio, extração das características relevantes.
3. **Processamento principal** — comparação com base oficial, estimativa algorítmica ou classificação em faixa ("menor de 13", "18+"). É aqui que os desenhos mais recentes deixam de revelar identidade e passam a gerar apenas uma credencial de atributo etário.
4. **Controles de integridade** — prova de vivacidade (_liveness_), detecção de apresentações falsas como fotos estáticas e _deepfakes_, limitação de tentativas, revisão humana quando necessária.
5. **Emissão da evidência** — a prova final de que o critério etário foi cumprido, idealmente reduzida ao atributo essencial, com prazo de validade e proteção criptográfica.

#### Cinco gerações, da autodeclaração ao teste em ecossistema

O documento organiza a evolução das soluções em cinco gerações. A classificação é do próprio Radar, que ressalva a sobreposição entre elas: as gerações convivem, e a sequência serve para ver por que o desenho brasileiro chegou onde chegou:

| Geração | Período | O que é | Limite reconhecido |
| --- | --- | --- | --- |
| 1ª — **autodeclaração** | 2000–2010 | Data de nascimento digitada, caixa "tenho mais de 18 anos", às vezes reforçada por SMS ou e-mail validado | Baixa intrusão e baixa confiabilidade; data de nascimento é dado facilmente falsificável, e estudos regulatórios registram altas taxas de falsificação etária por crianças (_lying up_) |
| 2ª — **documento e biometria** | 2010–2018 | Captura de documento oficial, OCR, comparação facial com a foto do documento, prova de vivacidade | Exige infraestrutura segura para grandes volumes de dados; exclui quem não tem documento |
| 3ª — **estimativa e inferência** | 2018–2022 | Redes neurais estimam idade a partir de face, voz, escrita ou padrões de interação, com saída numérica ou por faixa | Acurácia varia com tom de pele, sexo e idade, e cai perto do limiar (18 anos); a estimativa comportamental coleta muito mais do que idade |
| 4ª — **tokens e provas criptográficas** | 2022–2025 | Credenciais mínimas que atestam só o atributo ("18+"), sob modelo duplo-cego ou provas de conhecimento zero | Depende de carteiras digitais e emissores confiáveis amplamente distribuídos |
| 5ª — **testes e integração no ecossistema** | 2025 em diante | APIs nativas de sistema operacional e navegador, credenciais interoperáveis, ambientes de teste (_testbeds_) comparando soluções sob os mesmos critérios | Padronização global complexa; resultados de teste nem sempre transferíveis entre contextos culturais e jurídicos |

Três peças da quarta geração operam em planos diferentes:

- O **_token_ de idade** é a credencial: um atestado assinado por entidade de confiança que carrega apenas "maior de 18" ou "entre 16 e 18", sem nome, CPF ou data de nascimento. Emitido após uma validação inicial robusta, guardado pelo usuário (carteira digital ou armazenamento local) e apresentado ao serviço, que o valida pela chave pública do emissor.
- O **modelo duplo-cego** (_double-blind_) é o protocolo que rege a circulação desse _token_: nem o emissor sabe em que serviço a credencial será apresentada, nem o serviço sabe quem está por trás dela. É essa separação que impede o rastreamento cruzado.
- As **provas de conhecimento zero** (_zero-knowledge proofs_) são a técnica criptográfica que permite demonstrar matematicamente o atendimento ao critério etário sem revelar o dado subjacente — a plataforma recebe "sim" ou "não", nunca a data de nascimento. Podem ser combinadas com o duplo-cego: uma é método criptográfico, o outro é arranjo de confiança.

É esse conjunto — credencial mínima, não vinculação, não rastreabilidade — que dá conteúdo técnico aos incisos VI e VIII do [art. 24 do Decreto](#dec12880-art-24) e ao "sinal de idade" do [art. 12, III, da Lei](#art-12-iii). O Radar registra ainda dois desenvolvimentos concretos nessa linha: a **_EU Age Verification Solution_** ("mini carteira"), lançada em piloto pela Comissão Europeia em julho de 2025 e destinada a interoperar com a _EU Digital Identity Wallet_, e a possibilidade de uso do **gov.br** como emissor de atributo derivado no Brasil — o que corresponde, no Decreto, à solução tecnológica pública facultada ao MGI ([arts. 20](#dec12880-art-20) e [28](#dec12880-art-28)).

#### O que cada método custa em dados pessoais

**Verificar idade exige tratar dados pessoais**, às vezes sensíveis. Nenhum método sai ileso:

| Método | Risco que o Radar destaca |
| --- | --- |
| Autodeclaração | Expõe pouco dado, mas não oferece garantia efetiva e é trivialmente burlável |
| Documento oficial | Alta acurácia, mas exige infraestrutura robusta para grandes volumes; pode revelar mais do que a idade e excluir quem não tem documento |
| Cartão de crédito | Coleta dado financeiro, permite perfilamento, tem baixa fidelidade (a criança usa o cartão do adulto) e acessibilidade restrita |
| Identidade digital nacional (gov.br, eID) | Reduz exposição ao compartilhar só o atributo derivado, mas concentra identidade em poucos servidores e, se o serviço pedir mais do que precisa, viabiliza rastreamento de alta confiabilidade. Estimativa citada da EDRi: uma carteira eID poderia excluir 20% dos usuários |
| Consentimento parental e reconhecimento social | Depende de verificar antes a idade do responsável e o vínculo familiar; a garantia dada por terceiros não é verificável; e a pesquisa citada mostra pais criando perfis de filhos contra as próprias regras das plataformas |
| Verificação como serviço (VaaS) | Se o provedor de serviço souber a identidade, o verificador souber qual serviço foi acessado e os dois se conhecerem, as três informações somadas viabilizam vigilância e perfilamento |
| Estimativa biométrica | Coleta de biometria em massa levanta proporcionalidade; a acurácia cai no limiar dos 18 anos; e o usuário pode exibir a foto de outra pessoa |
| Estimativa comportamental | Precisa de muito mais dado do que idade e, agregado, esse dado pode reidentificar e perfilar |
| Teste de capacidade | Quase não coleta dado pessoal, mas é impreciso e enviesado — capacidade cognitiva varia, e a exclusão é risco real |

**Não existe método infalível que ao mesmo tempo proteja os direitos fundamentais de adultos e crianças**, e a acurácia anda junto com a intrusão. Outro efeito colateral: verificação que revela identidade permite associar a pessoa ao conteúdo acessado, o que ameaça quem depende de anonimato por segurança física ou profissional, atinge grupos marginalizados e vítimas de violência, e inibe atividade legítima. É a preocupação que o [art. 34, § 1º](#art-34-p1) transformou em vedação escrita.

#### Os princípios em que os reguladores convergem

O Radar reuniu os princípios de autoridades e organizações de várias jurisdições — CNIL (França), Comissão Europeia, CEPD/EDPB, ARCOM, AEPD (Espanha), _eSafety Commissioner_ (Austrália), Ofcom (Reino Unido), o _Global Age Assurance Standards Summit_ e a 5Rights Foundation, cujos princípios embasaram a norma [IEEE 2089.1-2024](https://standards.ieee.org/ieee/2089.1/10933/) — e identificou convergência em oito pontos: privacidade e proteção de dados **desde a concepção e por padrão**; **proporcionalidade** ao risco do serviço; **minimização e limitação da finalidade**; **transparência e responsabilização**; **gestão de riscos e segurança**; **inclusão e acessibilidade**; **direitos humanos, não discriminação e equidade**; e **interoperabilidade e robustez técnica**.

Comparado a esse rol, o [art. 24 do Decreto nº 12.880/2026](#dec12880-art-24) positiva, quase item a item, um consenso regulatório internacional já formado quando a norma brasileira foi escrita — com um acréscimo que os documentos estrangeiros tratam de passagem, a **vedação à rastreabilidade** do inciso VIII.

Dois marcos estrangeiros de 2025 situam o desenho brasileiro. O primeiro é o ensaio australiano [_Age Assurance Technology Trial_](https://ageassurance.com.au/report/), que testou 48 fornecedores em ambiente controlado e concluiu pela viabilidade técnica da aferição de idade — conclusão **contestada publicamente** pela Electronic Frontiers Australia, que participou do conselho consultivo do estudo e classificou como _privacy washing_ a avaliação de conformidade baseada apenas na leitura de políticas de privacidade. O segundo é o guia regulatório australiano sobre idade mínima em redes sociais, que introduziu a **validação sucessiva** (uso combinado e sequencial de métodos, para reduzir falhas e vieses) e **proibiu exigir exclusivamente documento estatal ou credencial de identidade digital nacional**, obrigando a oferta de alternativas proporcionais. Nesse ponto o Brasil ficou aquém: nem a Lei nem o Decreto vedam que o fornecedor aceite só o documento oficial.

#### O caso TikTok: o que a fiscalização já disse sobre autodeclaração

O Radar registra o único processo de fiscalização brasileiro publicamente documentado sobre aferição de idade, e ele antecede o ECA Digital. Em março de 2021 a ANPD abriu ação de fiscalização sobre a coleta e o tratamento de dados pela plataforma TikTok, a partir de questionamentos sobre o "feed sem cadastro" — que permitia navegar sem criar conta — e sobre o compartilhamento previsto na política de privacidade. A [Nota Técnica nº 6/2023/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/tiktok-nota_tecnica_6_versao_publica_ret-1.pdf) concluiu que o mecanismo de verificação de idade era frágil e que o **_age gate_ por autodeclaração, usado isoladamente, não é suficiente** para impedir o acesso de crianças e adolescentes.

O desdobramento veio na [Nota Técnica nº 50/2024/FIS/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/nt-50-pub.pdf): a Agência entendeu haver indícios suficientes de infração à LGPD para instaurar processo administrativo sancionador, determinou a **suspensão integral do "feed sem cadastro"** enquanto não houvesse mecanismos adequados de verificação de idade e exigiu **plano de conformidade** — objeto, prazos, ações de reversão, critérios de acompanhamento e trajetória de alcance dos resultados, na forma do [art. 36 do Regulamento de Fiscalização](/notas/regimento-interno-anpd#res1-art-36) (Resolução CD/ANPD nº 1/2021; o artigo de mesmo número da [LGPD](/notas/lgpd#art-36) trata de transferência internacional). É o precedente mais próximo do que hoje é dever expresso: a autoridade já tratava a autodeclaração isolada como insuficiente **antes** de a Lei nº 15.211/2025 vedá-la.

## Supervisão parental ([arts. 16 a 18](#art-16))

- **Transparência prévia**: informar riscos e medidas de segurança em local acessível, sem exigir que o produto já tenha sido adquirido, conforme o [art. 14 da LGPD](/notas/lgpd#art-14) ([art. 16](#art-16)). Se o tratamento de dados for além do estritamente necessário, o controlador mapeia riscos e elabora relatório de impacto, a ser compartilhado sob requisição da ANPD ([parágrafo único](#art-16-pu)).
- **Ferramentas exigidas** ([art. 17](#art-17)): acessíveis e fáceis de usar, informadas em local de fácil acesso, com aviso claro e visível quando a supervisão estiver ativa e quais controles foram aplicados, e que permitam limitar e monitorar o tempo de uso.
- **Padrão no nível mais protetivo** ([art. 17, § 4º](#art-17-p4)): por padrão, a conta já vem com o essencial ativado — restrição de comunicação por usuários não autorizados, limitação de recursos que prolongam artificialmente o uso (reprodução automática, recompensas por tempo de uso, notificações), ferramentas de acompanhamento e de limitação do tempo de uso, controle sobre recomendações personalizadas com opção de desativação, restrição de geolocalização com aviso prévio, educação digital midiática, **revisão regular das ferramentas de inteligência artificial** com participação de especialistas e possibilidade de desabilitar funcionalidades não essenciais, e acesso a serviços de suporte emocional e bem-estar.
- **Poderes dos responsáveis** ([art. 18](#art-18)): visualizar, configurar e gerenciar conta e privacidade; restringir compras e transações financeiras; **identificar os perfis de adultos** com os quais a criança ou o adolescente se comunica; acessar métricas consolidadas de tempo de uso; ativar e desativar salvaguardas — tudo com informações e controles **em língua portuguesa**.
- As informações devem ser apropriadas às diferentes idades e capacidades e **não podem incentivar** a desativação ou o enfraquecimento das salvaguardas ([art. 18, § 1º](#art-18-p1)).
- A ANPD regulamentará padrões mínimos ([art. 17, § 1º](#art-17-p1)), mas submeter mecanismos à sua avaliação é **opcional**, não pré-requisito para operar ([§ 3º](#art-17-p3)).

## Produtos de monitoramento infantil ([art. 19](#art-19))

Devem garantir a **inviolabilidade** das imagens, sons e informações captadas, armazenadas e transmitidas aos responsáveis; informar crianças e adolescentes, em linguagem apropriada, sobre a realização do monitoramento ([§ 1º](#art-19-p1)); e orientar-se pelo melhor interesse e pelo pleno desenvolvimento de suas capacidades ([§ 2º](#art-19-p2)).

## Jogos eletrônicos ([arts. 20](#art-20) e [21](#art-21))

- **Vedação das caixas de recompensa** em jogos direcionados a crianças e adolescentes ou de acesso provável, conforme a classificação indicativa. O Decreto nº 12.880/2026 ([art. 23](#dec12880-art-23)) admite duas saídas: oferecer versões sem _loot boxes_ ou restringir totalmente a funcionalidade por padrão — casos em que a verificação de idade é dispensada; caso contrário, verificação obrigatória.
- Jogos com **interação entre usuários** devem observar integralmente as salvaguardas do art. 16 da Lei nº 14.852/2024 (moderação, proteção contra contatos prejudiciais, atuação parental) e limitar, por padrão, as funcionalidades de interação, assegurando o consentimento dos responsáveis ([art. 21, parágrafo único](#art-21-pu)).
- **Competência nova**: o [art. 23, § 2º, do Decreto](#dec12880-art-23-p2) atribui à **ANPD** a fiscalização dos arts. 16 e 17 da Lei nº 14.852/2024 — a Agência passa a fiscalizar dispositivos do marco legal dos jogos eletrônicos, além do ECA Digital.

## Publicidade em meio digital ([arts. 22](#art-22) e [23](#art-23); Decreto nº 12.880/2026, [arts. 31 a 35](#dec12880-art-31))

- Vedado o **perfilamento** para direcionamento de publicidade comercial a crianças e adolescentes, bem como análise emocional, realidade aumentada, estendida e virtual para esse fim ([art. 22](#art-22)). O [art. 33 do Decreto](#dec12880-art-33) converte isso em dever ativo: quem oferta publicidade ou sua distribuição deve **impedir** o uso dessas técnicas.
- Vedados **monetização e impulsionamento** de conteúdos que retratem crianças e adolescentes de forma erotizada, sexualmente sugestiva ou em contexto sexual adulto ([art. 23](#art-23)) e, pelo [art. 35 do Decreto](#dec12880-art-35), também a veiculação, monetização ou impulsionamento de conteúdos que os exponham a situações violadoras, vexatórias ou degradantes.
- É **abusiva**, nos termos do art. 37, § 2º, do CDC, toda publicidade que se aproveite da deficiência de julgamento e experiência da criança (Decreto nº 12.880/2026, [art. 31](#dec12880-art-31)).
- A ANPD regulamentará formas e requisitos mínimos para prevenir exposição de crianças e adolescentes à promoção de apostas, tabaco, álcool e demais produtos proibidos (Decreto nº 12.880/2026, [art. 32](#dec12880-art-32)).
- **Atividade artística de crianças e adolescentes** (Decreto nº 12.880/2026, [art. 34](#dec12880-art-34)): conteúdo monetizado ou impulsionado que explore **de forma habitual** a imagem ou a rotina de criança ou adolescente exige **autorização judicial** (art. 149 do ECA); verificada a ausência, o fornecedor deve retirar o conteúdo imediatamente. O § 2º condiciona a obrigação aos conteúdos cuja monetização ou impulsionamento "se inicie no prazo de noventa dias após a data de publicação" do Decreto — redação ambígua, lida na prática como um período de adaptação encerrado em meados de junho de 2026, a partir do qual a exigência incide sobre a monetização nova.

## Redes sociais ([arts. 24 a 26](#art-24))

- **Vinculação obrigatória**: contas de crianças e adolescentes **de até 16 anos** devem estar vinculadas ao usuário ou à conta de um responsável legal ([art. 24](#art-24)) — sobre o alcance exato do corte e do sujeito obrigado, ver "Idade no meio digital", acima.
- Serviços impróprios devem informar claramente a inadequação, monitorar e restringir conteúdos que evidentemente atraiam crianças e adolescentes, e **aprimorar continuamente** os mecanismos de verificação de idade — cuja efetividade e progresso serão avaliados pela ANPD ([art. 24, § 1º](#art-24-p1) e [§ 2º](#art-24-p2)).
- Diante de **fundados indícios** de operação por criança ou adolescente, o provedor **pode** requerer confirmação de identificação, inclusive por métodos complementares, usados exclusivamente para verificação de idade ([art. 24, § 3º](#art-24-p3)).
- Constatados indícios de conta operada em desconformidade com os requisitos de idade mínima, o provedor **deve suspender o acesso** e instaurar procedimento célere e acessível de apelação pelo responsável legal ([art. 24, § 4º](#art-24-p4)) — procedimento que caberá à ANPD normatizar (Decreto nº 12.881/2026, Anexo I, art. 2º, XXXII).
- Na ausência de conta de responsável, é vedado reduzir o nível de proteção das configurações de supervisão parental ([art. 24, § 5º](#art-24-p5)).
- Regras específicas, concretas e documentadas para o tratamento de dados desse público ([art. 25](#art-25)) e **vedação de perfis comportamentais** para publicidade, inclusive a partir de dados obtidos na verificação de idade e de dados grupais e coletivos ([art. 26](#art-26)).

### Comparação internacional

O ECA Digital não proíbe o acesso de adolescentes a redes sociais — exige **vinculação a responsável legal** ([art. 24](#art-24)). É um modelo mais brando que o de proibição total adotado por outras jurisdições:

| Jurisdição | Modelo | Situação em agosto de 2026 |
| --- | --- | --- |
| **Brasil** | Sem proibição; **vinculação da conta à de um responsável** até os 16 anos | Em vigor desde 17/3/2026 ([art. 24](#art-24)) |
| **Austrália** | Proibição de contas para **menores de 16**, com dever de _reasonable steps_ da plataforma | Em vigor desde 10/12/2025 ([Social Media Minimum Age](https://www.legislation.gov.au/C2024A00127/asmade), Parte 4A do Online Safety Act 2021). Primeiro país do mundo a adotá-la |
| **França** | Proibição de contas para **menores de 15** | [Aprovada em 21/7/2026](https://www.biometricupdate.com/202607/france-sets-15-as-minimum-age-for-social-media-nationwide); contas novas a partir de setembro de 2026 e contas existentes a partir de janeiro de 2027. Primeiro país da UE a legislar sobre o tema |
| **Dinamarca** | Proibição para **menores de 15**, com dispensa parental a partir dos 13 | [Acordo político de novembro de 2025](https://www.pbs.org/newshour/world/denmarks-government-aims-to-ban-access-to-social-media-for-children-aged-under-15), com apoio majoritário declarado; sem aprovação formal no parlamento até agora |
| **União Europeia** | Sem idade mínima uniforme de acesso | A idade de consentimento digital para tratamento de dados ([art. 8.º do RGPD](/notas/gdpr#art-8)) varia de 13 a 16 anos por Estado-membro; o Parlamento Europeu aprovou, em novembro de 2025, resolução **não vinculante** recomendando piso de 16 |
| **Reino Unido** | Sem proibição etária de acesso; dever de _highly effective age assurance_ | [Online Safety Act 2023](https://www.legislation.gov.uk/ukpga/2023/50/contents), restrito a serviços com conteúdo pornográfico ou de alto risco |
| **Estados Unidos** | Sem lei federal de idade mínima | O piso de 13 anos do [COPPA](https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa) regula só a coleta de dados; a regulação é estadual, como a [Flórida (HB 3)](https://www.flsenate.gov/Session/Bill/2024/3), que proíbe contas para menores de 14 e exige consentimento parental dos 14 aos 15 |

Duas observações que a tabela não comporta. A lei francesa **saiu do parlamento sem o mecanismo de verificação de idade**: os dispositivos que o detalhavam foram suprimidos na votação final, de modo que a execução depende da regulação europeia já existente — contraste instrutivo com o Brasil, que optou por especificar o mecanismo em lei e em decreto. E a União Europeia trabalha com um corte que não se confunde com idade mínima de acesso: o [art. 8.º do RGPD](/notas/gdpr#art-8) fixa a idade a partir da qual a própria criança pode consentir com o tratamento de seus dados, e não a idade para ter conta.

**O que a experiência australiana já mostra.** Por ser o regime mais antigo em vigor, a Austrália é hoje a única fonte de dados sobre o que uma proibição etária produz na prática — e o resultado é ambíguo, o que interessa diretamente a quem avalia a escolha brasileira. De um lado, as plataformas removeram milhões de contas de menores de 16 nos primeiros meses. De outro, o regulador abriu investigação contra cinco grandes plataformas em março de 2026 por suspeita de descumprimento, um estudo publicado no _BMJ_ apontou que mais de 85% dos adolescentes pesquisados continuavam usando redes sociais três meses depois da proibição, e o governo anunciou, em junho de 2026, o reforço dos poderes do regulador e a duplicação do teto das multas. A lição que se extrai é que **o gargalo de qualquer desses modelos — proibição ou vinculação — é o mesmo: a aferição de idade**. É o ponto em que o Brasil concentrou lei, decreto e a primeira etapa de fiscalização da ANPD.

## Prevenção e combate a violações graves ([art. 27](#art-27); Decreto nº 12.880/2026, [arts. 36 a 40](#dec12880-art-36))

Fornecedores disponíveis no território nacional devem **remover e comunicar** conteúdos de aparente exploração, abuso sexual, sequestro e aliciamento às autoridades nacionais e internacionais competentes, retendo os dados associados pelo prazo do [art. 15 do Marco Civil](/notas/mci#art-15) ([art. 27, § 2º](#art-27-p2)).

- A **Polícia Federal** é a autoridade competente para recebimento centralizado, processamento, triagem e gerenciamento dos relatórios (Decreto nº 12.880/2026, [art. 36](#dec12880-art-36)).
- Fica autorizada a criação do **Centro Nacional de Triagem de Notificações**, no âmbito da PF, com competência para receber, validar, triar e distribuir os relatórios às polícias judiciárias e publicar relatórios estatísticos periódicos por fornecedor (art. 37). Até que sua Estrutura Regimental seja aprovada, a PF recebe apoio técnico, administrativo e financeiro do MJSP, por força-tarefa (art. 51).
- Fornecedores que já enviem notificações idênticas a centrais estrangeiras acessíveis às autoridades brasileiras ficam **dispensados** do envio duplicado, e esses relatórios se equiparam, para todos os fins jurídicos e probatórios, aos apresentados diretamente (art. 37, §§ 2º e 3º).
- Os relatórios têm **classificação de sigilo** compatível com a sensibilidade das informações (art. 38).
- Hipóteses de comunicação obrigatória (art. 39): exploração, abuso ou aliciamento sexual; sequestro e cárcere privado; e aliciamento, recrutamento ou cooptação para práticas com risco crível, iminente ou em andamento de lesão grave ou morte, incluído o tráfico e atos preparatórios de **violência extrema preordenada contra comunidade escolar ou grupos vulnerabilizados**.
- Após remoção imediata e confirmação de recebimento, o material deve ser excluído dos servidores, preservados demais dados da conta, informações do usuário e metadados (art. 39, §§ 1º e 2º). O mesmo canal pode ser usado, facultativamente, para outras situações de risco crível à integridade ou à vida (§ 3º).
- **Sanção por falha reincidente** (art. 40): o descumprimento sujeita às penalidades do [art. 35](#art-35) quando houver falha **reincidente** — negligência ou insuficiência dos mecanismos de resposta —, não se aplicando a falhas isoladas ou residuais inerentes ao estado da técnica.

### _Deepfakes_ sexuais: o levantamento do Radar Tecnológico nº 6

O [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (ANPD, 2026) dedica um capítulo ao uso dessas mídias contra meninas e mulheres, e o retrato brasileiro que ele reúne interessa diretamente a este artigo, porque a escola é o principal local de incidência. Como os demais volumes da série, não firma posicionamento institucional.

Com base em levantamento da SaferNet Brasil, o Radar registra, **entre 2023 e 2025, ao menos 16 casos documentados em instituições de ensino de 10 unidades federativas, envolvendo 72 vítimas e 57 agressores** — imagens de nudez ou de conteúdo sexual em que rostos reais, quase sempre extraídos de redes sociais, são sobrepostos a corpos nus por ferramentas de IA generativa de acesso público. Os episódios descritos envolvem estudantes produzindo material sobre colegas e professoras, inseridos em dinâmicas de _bullying_ e humilhação pública, com circulação em redes sociais, aplicativos de mensagem e fóruns.

O documento também reconstrói o **caso Grok**, que é o precedente mais recente de atuação da ANPD sobre conteúdo sintético envolvendo crianças e adolescentes:

- **14 de janeiro de 2026** — representação apresentada à ANPD contra o sistema de inteligência artificial Grok, integrado à plataforma X, por permitir a edição automatizada de imagens de terceiros sem verificação de consentimento ou finalidade legítima.
- **20 de janeiro de 2026** — ANPD, Ministério Público Federal e Senacon expedem [Recomendação Conjunta](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/recomendacao_conjunta_anpd_mpf_senacon_caso_grok.pdf) à empresa responsável pela plataforma, fundamentada na Constituição, no ECA, na [LGPD](/notas/lgpd), no [Marco Civil](/notas/mci), no Código de Defesa do Consumidor e neste ECA Digital. O documento sustenta que, ao oferecer e estruturar a ferramenta, a empresa **não atua como mero intermediário**, e cobra: bloqueio da geração de conteúdo sexualizado sem consentimento, remoção do que já circulava, aplicação das próprias políticas internas, canais acessíveis de denúncia e elaboração de relatório de impacto.
- **11 de fevereiro de 2026** — consideradas insuficientes as providências informadas, a ANPD expede **medida preventiva** (arts. [32, III](/notas/regimento-interno-anpd#res1-art-32-iii) e [35](/notas/regimento-interno-anpd#res1-art-35) do Regulamento de Fiscalização) para impedir que a ferramenta gere conteúdos que representem crianças e adolescentes, ou pessoas identificadas e identificáveis, em contextos sexualizados sem autorização. O caso está documentado na [Nota Técnica nº 1/2026/FIS/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/nota-tecnica-no-1-2026-fis-cgf-anpd.pdf).

Duas consequências. O [art. 11 do Decreto nº 12.880/2026](#dec12880-art-11) — transparência, prevenção de manipulação, avaliação de risco algorítmico e salvaguardas — somado à equiparação do [art. 16, § 4º](#dec12880-art-16-p4), que trata como conteúdo pornográfico a interação com sistemas que produzam material sexualmente explícito de forma automatizada, deixou de ser hipótese teórica antes mesmo de a Agência regulamentá-lo. E **o Brasil não tem tipo penal específico para _deepfake_**: a conduta é enquadrada no art. 218-C do Código Penal e, quando a vítima é mulher, no art. 147-B, cuja pena foi agravada pela Lei nº 15.123/2025 quando a violência psicológica é praticada com uso de inteligência artificial. O dever de remover e comunicar deste artigo é resposta **civil e administrativa**, e corre em paralelo à persecução penal.

## Reporte de violações e retirada de conteúdo ([arts. 28 a 30](#art-28); Decreto nº 12.880/2026, [arts. 41 a 46](#dec12880-art-41))

Dever de disponibilizar mecanismos de notificação de violações ([art. 28](#art-28)), que devem ser **acessíveis, gratuitos, efetivos e amplamente divulgados** (Decreto nº 12.880/2026, [art. 41, parágrafo único](#dec12880-art-41-pu)). Notificados, os fornecedores devem, quando for o caso, **oficiar às autoridades competentes** para instauração de investigação ([art. 28, parágrafo único](#art-28-pu)) — obrigação que o [art. 42 do Decreto](#dec12880-art-42) canaliza para o Centro Nacional de Triagem, por sistemas automatizados.

**Retirada sem ordem judicial** ([art. 29](#art-29)): o fornecedor deve retirar conteúdo violador de direitos de crianças e adolescentes assim que comunicado do caráter ofensivo pela vítima ou seus representantes, pelo **Ministério Público**, por **autoridades policiais** (Decreto nº 12.880/2026, [art. 43, III](#dec12880-art-43-iii)) ou por **entidades representativas** de defesa desses direitos de reconhecida atuação nacional. São violadores os conteúdos do [art. 6º](#art-6), nos termos da classificação indicativa ([art. 29, § 1º](#art-29-p1)). A notificação exige identificação técnica específica do conteúdo e do notificante, **vedada a denúncia anônima**, sob pena de nulidade ([art. 29, § 2º](#art-29-p2)).

- **Conselhos tutelares** não notificam diretamente: devem provocar o Ministério Público para que este notifique os fornecedores (Decreto nº 12.880/2026, [art. 43, parágrafo único](#dec12880-art-43-pu)).
- Compete à **ANPD habilitar** as entidades representativas, exigidos experiência demonstrada, independência em relação aos fornecedores, procedimentos internos de qualidade e imparcialidade e ausência de fins lucrativos; a lista é publicada no sítio da Agência, cabendo **desabilitação** em caso de desvio de atuação ou envio abusivo de notificações (art. 44). Até a regulamentação, admite-se habilitação provisória de entidades do Conanda ou da Comissão Intersetorial (art. 52).
- **Transparência dos notificantes** (art. 46): Ministério Público, autoridades policiais e entidades habilitadas devem publicar relatório anual das notificações enviadas, com quantitativo, destinatário, classificação por tipo de conteúdo e medidas adotadas pelo fornecedor. A prestação de contas, aqui, corre nos dois sentidos.
- **Devido processo na moderação** ([art. 30](#art-30)): notificação da retirada; motivo e fundamentação, com indicação se a identificação foi humana ou automatizada; possibilidade e fácil acesso ao recurso; e prazos procedimentais definidos.

## Transparência e prestação de contas ([art. 31](#art-31); Decreto nº 12.880/2026, [arts. 45](#dec12880-art-45) a [48](#dec12880-art-48))

Provedores com mais de **1 milhão de usuários registrados** nessa faixa etária no território nacional devem publicar **relatórios semestrais em português** contendo canais de denúncia e processos de apuração; quantidade de denúncias; quantidade de moderação por tipo; medidas de identificação de contas infantis e de atos ilícitos; aprimoramentos técnicos de proteção de dados e de aferição do consentimento parental ([art. 14, § 1º, da LGPD](/notas/lgpd#art-14-p1)); e detalhamento das avaliações de impacto e gerenciamento de riscos. O Decreto acrescenta a esses relatórios a quantidade de notificações recebidas por categoria e os dados proporcionais sobre o prosseguimento dado a elas ([art. 45](#dec12880-art-45)).

- **Avaliação de impacto à segurança e à saúde** (Decreto nº 12.880/2026, [art. 47](#dec12880-art-47)): identificação e análise de riscos, avaliação de probabilidade e gravidade, tratamento e mitigação e acompanhamento contínuo da efetividade, com publicidade de **versão resumida em linguagem clara**. Ato da ANPD poderá definir conteúdo mínimo, periodicidade e condições. Note que é uma avaliação distinta do relatório de impacto à proteção de dados da LGPD, embora os dois se sobreponham em parte.
- **Acesso de pesquisadores** ([art. 31, parágrafo único](#art-31-pu)): acesso gratuito a dados para pesquisa por instituições acadêmicas, científicas, tecnológicas, de inovação ou jornalísticas, vedado uso comercial. A **ANPD habilitará** essas instituições por edital público (Decreto nº 12.880/2026, [art. 48](#dec12880-art-48)).

## Uso abusivo dos instrumentos de denúncia ([arts. 32](#art-32) e [33](#art-33))

Os provedores devem adotar mecanismos eficazes para identificar o uso abusivo dos instrumentos de denúncia, coibindo sua utilização para **censura, perseguição ou outras práticas ilícitas**. Devem informar as hipóteses de uso indevido e as sanções cabíveis (suspensão temporária, cancelamento em caso de reincidência ou abuso grave e comunicação às autoridades) ([art. 33, § 1º](#art-33-p1)), com critérios técnicos objetivos, notificação, recurso, prazos definidos ([§ 2º](#art-33-p2)) e manutenção de registros detalhados ([§ 3º](#art-33-p3)).

## Governança ([art. 34](#art-34))

A autoridade fiscaliza o cumprimento em todo o território nacional e pode **editar normas complementares**. Dois limites expressos:

- [§ 1º](#art-34-p1) — a regulamentação **não pode**, em nenhuma hipótese, autorizar ou resultar em vigilância massiva, genérica ou indiscriminada, nem em práticas contrárias à liberdade de expressão, à privacidade, à proteção integral e ao tratamento diferenciado de dados de crianças e adolescentes.
- [§ 2º](#art-34-p2) — dever de observar **assimetrias regulatórias** e adotar **abordagem responsiva**, com tratamento diferenciado e proporcional conforme natureza, risco e modelo de negócio.

## Sanções ([art. 35](#art-35))

Sem prejuízo das sanções cíveis, criminais e administrativas, assegurados devido processo legal, ampla defesa e contraditório:

- [**advertência**](#art-35-i), com prazo de até 30 dias para medidas corretivas;
- [**multa simples**](#art-35-ii) de até **10% do faturamento do grupo econômico no Brasil** no último exercício ou, ausente faturamento, de **R$ 10,00 a R$ 1.000,00 por usuário cadastrado**, limitada, no total, a **R$ 50 milhões por infração** e atualizada anualmente pelo IPCA ([§ 4º](#art-35-p4));
- [**suspensão temporária**](#art-35-iii) das atividades; e
- [**proibição do exercício**](#art-35-iv) das atividades.

Circunstâncias de dosimetria ([§ 1º](#art-35-p1)): gravidade da infração e extensão do dano individual e coletivo; reincidência; capacidade econômica; e finalidade social do fornecedor e impacto sobre a coletividade quanto ao fluxo de informações.

- **Competência dividida** ([§ 5º](#art-35-p5)): advertência e multa cabem à **ANPD**; suspensão e proibição, ao **Poder Judiciário**.
- **Execução do bloqueio** ([§ 6º](#art-35-p6)): ordem dirigida a prestadoras de conexão, gestoras de pontos de troca de tráfego (PTT), provedores de DNS e demais agentes que viabilizam a conexão — com recebimento e distribuição pela Anatel e, para domínios ".br", pelo CGI.br (Decreto nº 12.622/2025, art. 3º).
- **Solidariedade** ([§ 2º](#art-35-p2)): filial, sucursal, escritório ou estabelecimento no País responde solidariamente pela multa de empresa estrangeira.
- **Rito** ([§ 3º](#art-35-p3)): a lei manda aplicar "as disposições relativas à apuração de infrações administrativas às normas de proteção da criança e do adolescente" do ECA, sem citar artigos; a doutrina identifica o rito dos arts. 194 a 197 da Lei nº 8.069/1990. Ver o passo a passo simplificado em "Rito das sanções", abaixo.
- **Destinação — sem regra em vigor**: o [art. 36](#art-36) do PL, que vinculava a receita das multas, foi **vetado**. O art. 36-A, incluído pela [Medida Provisória nº 1.318/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1318.htm) para destinar os valores ao **FNCA** por 5 anos, teve sua **vigência encerrada em 25/2/2026** por perda de eficácia — a MP não foi convertida em lei dentro do prazo constitucional (art. 62, § 3º, da CF) nem houve decreto legislativo disciplinando as relações jurídicas dela decorrentes. Atualmente, portanto, a Lei não prevê destinação específica para os valores arrecadados com as multas.

### Rito das sanções

O procedimento não foi criado especificamente para o ambiente digital — é o mesmo que o ECA já usa para apurar qualquer infração contra os direitos da criança e do adolescente (arts. 194 a 197), conduzido pela **autoridade judiciária**. Em termos simples:

1. **Abertura** — por representação do Ministério Público **ou** do Conselho Tutelar, **ou** por auto de infração lavrado por servidor efetivo ou voluntário credenciado (o documento que registra o que aconteceu), assinado por duas testemunhas quando possível. São vias alternativas, não etapas sucessivas.
2. **Defesa** — o requerido tem **10 dias** para se defender, contados da intimação.
3. **Sem defesa** — o Ministério Público se manifesta em **5 dias**, e a autoridade judiciária decide em igual prazo.
4. **Com defesa** — a autoridade judiciária decide ou, sendo necessário, designa **audiência de instrução e julgamento**: colhida a prova oral, Ministério Público e defesa se manifestam por até **20 minutos** cada (prorrogáveis por mais 10), e a sentença é proferida em seguida.

**Como isso convive com a competência da ANPD.** O [§ 3º](#art-35-p3) manda seguir esse rito judicial; o [§ 5º](#art-35-p5) atribui advertência e multa à Agência. A leitura que o Executivo adotou está no Decreto nº 12.881/2026 (Anexo I, art. 2º, XXVI), que incumbe a ANPD de **estabelecer os processos e procedimentos administrativos** para apurar infrações e aplicar advertência e multa: na prática, o rito dos arts. 194 a 197 fica reservado às sanções sob reserva de jurisdição, e as sanções administrativas seguem processo próprio da Agência. A consolidação virá com a atualização dos Regulamentos de Fiscalização e de Aplicação de Sanções Administrativas, prevista no cronograma a partir de agosto de 2026.

**Exemplo:** imagine a rede social fictícia "ConectaJov". Mesmo notificada, ela demora a remover um conteúdo que expõe a rotina de uma criança de forma vexatória. Um Conselho Tutelar recebe a denúncia e provoca o Ministério Público, que representa contra a empresa perante o juízo da infância. A ConectaJov tem 10 dias para se defender, alegando, por exemplo, que já removeu o conteúdo assim que notificada. O juiz pode decidir de plano ou marcar audiência, ouvir as partes por até 20 minutos cada e, só então, decidir. Paralelamente, a mesma conduta pode render uma advertência ou multa aplicada pela ANPD em processo administrativo próprio.

### As três leis, lado a lado

Como a ANPD aplica hoje as três normas comentadas nestas notas, vale ver de que régua ela dispõe em cada uma:

| | [LGPD, art. 52](/notas/lgpd#art-52) | [Marco Civil, art. 12](/notas/mci#art-12) | [ECA Digital, art. 35](#art-35) |
| --- | --- | --- | --- |
| Teto da multa | **2%** do faturamento | **10%** do faturamento | **10%** do faturamento |
| Base de cálculo | Pessoa jurídica, grupo ou conglomerado no Brasil, **excluídos os tributos** | Grupo econômico no Brasil, **excluídos os tributos** | Grupo econômico no Brasil, **sem previsão de exclusão de tributos** |
| Teto absoluto | R$ 50 milhões por infração | não há | R$ 50 milhões por infração, atualizados pelo IPCA |
| Alternativa na ausência de faturamento | não há | não há | R$ 10 a R$ 1.000 **por usuário cadastrado** |
| Quem aplica | ANPD, integralmente | O órgão competente conforme a matéria — Anatel, Senacon, SBDC ou ANPD | **Dividido**: advertência e multa com a ANPD; suspensão e proibição com o Judiciário |
| Destino da arrecadação | Fundo de Defesa de Direitos Difusos ([art. 52, § 5º](/notas/lgpd#art-52-p5)) | sem previsão específica | sem previsão em vigor (ver acima) |

Três diferenças pesam. O **percentual quintuplica** da LGPD para as outras duas, o que reflete o objeto: proteger criança e adolescente e disciplinar plataformas foram tratados pelo legislador como mais graves do que o descumprimento genérico de dever de proteção de dados. A ausência da cláusula "excluídos os tributos" no ECA Digital **amplia a base de cálculo** em relação às outras duas — provavelmente por lapso redacional, mas é o que o texto diz. E, ao contrário do [art. 52 da LGPD](/notas/lgpd#art-52), cuja aplicação é integralmente da Agência, aqui as sanções mais graves ficam sob **reserva de jurisdição**.

## Disposições finais ([arts. 37 a 40](#art-37))

- **Regulamentação** pelo Poder Executivo, com a mesma vedação a vigilância massiva ([art. 37](#art-37)).
- **Adesivo em embalagens** de equipamentos eletrônicos de uso pessoal com acesso à internet ([art. 38](#art-38)). Até regulamentação específica da ANPD, o Decreto nº 12.880/2026 ([art. 50](#dec12880-art-50)) fixou prazo de 30 dias e a redação: "Este produto permite acesso à internet. Conteúdos da internet podem apresentar riscos a crianças e adolescentes. O uso do produto requer supervisão parental." Atenção ao alcance: a regra transitória vale apenas para equipamentos cuja **apresentação, embalagem ou comunicação mercadológica seja exclusivamente direcionada a crianças e adolescentes**, e não se aplica aos fabricados ou importados até a publicação do Decreto. O dever mais amplo do art. 38 da Lei só ganhará contornos com o ato da ANPD (art. 50, § 3º).
- **Modulação proporcional** das obrigações ([art. 39](#art-39)).
- **Representante legal no País** com poderes plenos de recebimento e resposta ([art. 40](#art-40)).

## Política Nacional e arranjo institucional (Decreto nº 12.880/2026, [arts. 3º a 8º](#dec12880-art-3))

Instituída a **Política Nacional de Promoção e Proteção dos Direitos da Criança e do Adolescente no Ambiente Digital**, com princípios que incluem proteção integral e prioridade absoluta, autonomia progressiva, responsabilidade compartilhada, educação digital e midiática, direito à **participação** de crianças e adolescentes nas decisões que os afetem (art. 12 da Convenção sobre os Direitos da Criança) e redução de desigualdades estruturais, com medidas específicas para crianças e adolescentes indígenas e de povos e comunidades tradicionais.

- **Instrumentos**: plano trienal; atuação integrada com a política da Lei nº 14.811/2024; articulação com a Política Nacional de Educação Digital; Estratégia Brasileira de Educação Midiática; e publicação periódica de guias e materiais educativos.
- **Comitê intersetorial** permanente, instituído por ato do MDHC, com representação garantida de MJSP, Saúde, Educação, MCTI, MGI, Secom, **ANPD** e **Conanda** (art. 7º). O comitê pode articular-se, em conjunto com a ANPD, com o Ministério Público, o Judiciário e a sociedade civil e, em coordenação com o MRE, com organismos internacionais (art. 8º).

Divisão de trabalho relevante: a **ANPD regula e fiscaliza** o ECA Digital (Decreto nº 12.880/2026, [art. 1º, parágrafo único](#dec12880-art-1-pu)); o **MDHC** coordena a Política Nacional; o **MJSP** responde pela classificação indicativa e pelo funcionamento do Centro Nacional de Triagem; a **PF** opera a triagem; o **MGI** pode ofertar soluções tecnológicas públicas; e **Anatel** e **CGI.br** executam as ordens judiciais de bloqueio.

## Implementação e cronograma da ANPD

Cronograma publicado em 20/03/2026, junto com as Orientações Preliminares e o Mapa de Temas Prioritários da Fiscalização 2026-2027:

- **Etapa 1 (a partir de março de 2026)** — atuação **preventiva** e de levantamento de informações, priorizando **lojas de aplicativos e sistemas operacionais proprietários**, pelo papel estruturante e pela concentração de mercado: atuar sobre poucos agentes produz efeitos amplos na cadeia. O monitoramento formal desses agentes começou em **10 de junho de 2026**, com foco nos mecanismos de aferição de idade e de transmissão do sinal de idade, e alcança inicialmente Apple (App Store), Google (Play Store) e Microsoft (Windows). Antes disso, ainda em janeiro de 2026, a Agência já havia instituído processo de monitoramento sobre cerca de 37 empresas relevantes para o público infantojuvenil.
- **Canal de denúncias** — no ar desde **1º de junho de 2026**, no portal da ANPD, com autenticação gov.br e possibilidade de denúncia anônima. A Agência não responde individualmente: as denúncias são analisadas de forma agregada e servem para priorizar fiscalização, regulação e ações educativas. Denúncias de crimes devem ir às autoridades policiais.
- **Tomadas de subsídios (2026)** — guia sobre escopo e obrigações gerais (30/04 a 15/06) e guia sobre mecanismos de aferição de idade (22/05 a 09/07), na plataforma Brasil Participativo.
- **Etapa 2 (a partir de agosto de 2026)** — publicação das **orientações definitivas e dos parâmetros normativos** sobre aferição de idade; ampliação do monitoramento a outros setores conforme o nível de risco; período de adaptação de agosto a novembro de 2026; e atualização dos Regulamentos de Fiscalização e de Aplicação de Sanções Administrativas.
- **Etapa 3 (a partir de janeiro de 2027)** — início dos ciclos de fiscalização, com possibilidade de **aplicação sistemática das sanções**.

O [art. 49 do Decreto nº 12.880/2026](#dec12880-art-49) ancora esse faseamento: cabe à ANPD definir as etapas de implementação das soluções de aferição de idade, com abordagem responsiva, emissão de recomendações e definição de prioridades de monitoramento conforme o nível de risco — sempre com o objetivo declarado de estimular um ecossistema de soluções públicas e privadas interoperáveis que preserve a liberdade de escolha do usuário.

## Normas

### Legislação principal

- [Lei nº 15.211, de 17 de setembro de 2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm) — dispõe sobre a proteção de crianças e adolescentes em ambientes digitais (Estatuto Digital da Criança e do Adolescente). Publicada no DOU de 17/09/2025 (Edição Extra) e **em vigor desde 17 de março de 2026**.
- [Constituição Federal de 1988](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm), especialmente os arts. 227 (proteção integral e prioridade absoluta); 5º, X e LXXIX; e 220, § 2º (vedação à censura).
- [Lei nº 8.069, de 13 de julho de 1990 (ECA)](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm) — fonte dos conceitos de criança e adolescente ([art. 2º, § 1º](#art-2-p1)), do rito de apuração de infrações administrativas e imposição de penalidades ([art. 35, § 3º](#art-35-p3)) e de deveres expressamente remetidos pelos [arts. 3º](#art-3) e [5º](#art-5).

### Vetos, medidas provisórias e vigência

O caminho da lei entre a sanção e a vigência foi acidentado, e entender esse percurso ajuda a explicar por que alguns dispositivos existem, outros sumiram e outros voltaram por vias diferentes.

**Vetos presidenciais** ([Mensagem nº 1.307/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Msg/Vep/VEP-1307-25.htm)) — foram **três**, não dois:

- **§ 7º do art. 35 do PL**, que atribuía à **Anatel** o encaminhamento das ordens de bloqueio. Veto por **inconstitucionalidade formal**: criar competência para uma agência é matéria de iniciativa privativa do Presidente da República (CF, art. 61, § 1º, II, "e", e art. 84, VI, "a"), e o Congresso não pode fazê-lo por emenda. O conteúdo voltou dias depois — pela via correta, o [Decreto nº 12.622/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12622.htm).
- **Art. 36 do PL** (vinculação da receita das multas ao FNCA). Veto por contrariedade ao interesse público: a vinculação não trazia a cláusula de vigência determinada exigida pelo art. 137 da LDO de 2025 ([Lei nº 15.080/2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l15080.htm)).
- **Art. 41 do PL** (_vacatio legis_ — o intervalo entre a publicação e a entrada em vigor — de 1 ano). Veto por contrariedade ao interesse público: prazo incompatível com a urgência da proteção e com a prioridade absoluta do art. 227 da Constituição.

**Medidas provisórias e a lei de conversão:**

- [Medida Provisória nº 1.318, de 17 de setembro de 2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1318.htm) — acrescentou o **art. 36-A**, destinando as multas ao **Fundo Nacional para a Criança e o Adolescente (FNCA)** pelo prazo de 5 anos. **Vigência encerrada em 25/2/2026**: não foi convertida em lei no prazo constitucional, e o art. 36-A deixou de vigorar.
- [Medida Provisória nº 1.319, de 17 de setembro de 2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1319.htm) — acrescentou o **art. 41-A**, recompondo a _vacatio_ suprimida pelo veto e fixando a vigência em seis meses após a publicação. Foi **revogada** pela Lei nº 15.352/2026 (art. 20).
- [Medida Provisória nº 1.317, de 17 de setembro de 2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Mpv/mpv1317.htm), convertida na [Lei nº 15.352, de 25 de fevereiro de 2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15352.htm) — não tratava originalmente do ECA Digital: **criou a Agência Nacional de Proteção de Dados** em lugar da antiga Autoridade Nacional (nova redação do [art. 55-A da LGPD](/notas/lgpd#art-55-a)), criou a Carreira de Regulação e Fiscalização de Proteção de Dados e **incluiu a ANPD no rol de agências reguladoras** do art. 2º da [Lei nº 13.848/2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13848.htm). Foi na conversão que o Congresso acrescentou o art. 19, dando a redação atual ao [art. 41-A](#art-41-a): "Esta Lei entra em vigor em 17 de março de 2026".

### Regulamentos e atos aplicáveis

- [Decreto nº 12.622, de 17 de setembro de 2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12622.htm) — **designou a ANPD** como a autoridade administrativa autônoma de proteção dos direitos de crianças e adolescentes no ambiente digital a que se refere o [art. 2º, X](#art-2-x), da Lei; e, regulamentando o [art. 35, § 6º](#art-35-p6), atribuiu à **Anatel** o recebimento e a distribuição das ordens judiciais de bloqueio às prestadoras de conexão e demais agentes, e ao **CGI.br** o recebimento das ordens relativas à resolução de nomes de domínio ".br", facultada a ambos a escolha da técnica de implementação.
- [Decreto nº 12.880, de 18 de março de 2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12880.htm) — regulamenta a Lei nº 15.211/2025, institui a Política Nacional de Promoção e Proteção dos Direitos da Criança e do Adolescente no Ambiente Digital e autoriza a criação do Centro Nacional de Triagem de Notificações. Revogou o Decreto nº 9.856/2019, que dispunha sobre o Comitê de Acompanhamento pela Sociedade Civil para a Classificação Indicativa — matéria agora remetida a ato do MJSP ([art. 13](#dec12880-art-13)).
- [Decreto nº 12.881, de 18 de março de 2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12881.htm) — aprova a **Estrutura Regimental da ANPD**, detalha suas competências sob o ECA Digital (Anexo I, art. 2º, incisos XXV a XXXVI) e extingue a antiga Autoridade Nacional de Proteção de Dados, que passa a ser sucedida pela Agência. Entrou em vigor 21 dias após a publicação, em **8 de abril de 2026**.
- [Decreto nº 12.882, de 18 de março de 2026](https://www.gov.br/mj/pt-br/assuntos/arquivos-imprensa/sedigi/decretos-eca-digital.pdf) — altera a estrutura regimental do **MJSP** (Decreto nº 11.348/2023), remanejando e transformando cargos e funções, inclusive na **Diretoria de Combate a Crimes Cibernéticos da Polícia Federal**. É a peça administrativa que dá lastro de pessoal ao arranjo; a criação do Centro Nacional de Triagem de Notificações, na PF, é autorizada pelo [art. 37 do Decreto nº 12.880/2026](#dec12880-art-37).
- [Portaria Sedigi/MJSP nº 1, de 1º de abril de 2026](https://dspace.mj.gov.br/handle/1/16946) — institui o Comitê Interinstitucional sobre Trabalho Artístico de Crianças e Adolescentes em Plataformas Digitais, encarregado de elaborar diretrizes para os alvarás judiciais de que trata o [art. 34 do Decreto nº 12.880/2026](#dec12880-art-34).
- [Portaria MDHC nº 807, de 6 de maio de 2026](https://sintse.tse.jus.br/documentos/2026/Mai/7/para-conhecimento-institucional/portaria-no-807-de-6-de-maio-de-2026-institui-o-comite-intersetorial-da-politica-nacional-de) — institui o Comitê Intersetorial da Política Nacional ([art. 7º do Decreto nº 12.880/2026](#dec12880-art-7)), integrado por MDHC, MJSP, Saúde, Educação, MCTI, MGI, Secom/PR, ANPD, Conanda e Comitê de Participação de Adolescentes.
- [Orientações Preliminares sobre Mecanismos Confiáveis de Aferição de Idade](https://www.gov.br/anpd/pt-br/assuntos/eca-digital/mecanismos-confiaveis-de-afericao-de-idade-orientacoes-preliminares.pdf/@@display-file/file) (ANPD, 20/03/2026) — parâmetros iniciais, sem natureza de norma definitiva, publicados junto com o cronograma de implementação.
- **Tomadas de subsídios sobre guias orientativos (2026)** — é o nome que a ANPD dá à consulta prévia à sociedade, feita na plataforma Brasil Participativo: "Fornecedores de produtos ou serviços de tecnologia da informação: escopo e obrigações gerais do ECA Digital" (aberta em 30/04, contribuições até 15/06/2026) e "Mecanismos de Aferição de Idade" (22/05 a 09/07/2026). Guias definitivos previstos para **agosto de 2026**.
- **Atos ainda não editados** (situação em agosto de 2026). Da **ANPD**:
    - requisitos mínimos de segurança por padrão e repressão a práticas manipulativas (Decreto nº 12.880/2026, [art. 10](#dec12880-art-10));
    - IA generativa, agentes conversacionais e interfaces similares (Decreto nº 12.880/2026, [art. 11, parágrafo único](#dec12880-art-11-pu));
    - requisitos mínimos de transparência, segurança e interoperabilidade da aferição de idade (Decreto nº 12.880/2026, [art. 24, § 2º](#dec12880-art-24-p2), que delegou à Agência o ato do Poder Executivo previsto na Lei, [art. 12, § 3º](#art-12-p3));
    - diretrizes e padrões mínimos de supervisão parental e procedimento de submissão voluntária de mecanismos (Lei, art. 17, [§§ 1º](#art-17-p1) e [3º](#art-17-p3));
    - avaliação da efetividade dos mecanismos de verificação de idade das redes sociais e normatização do procedimento de suspensão e apelação (Lei, art. 24, [§§ 2º](#art-24-p2) e [4º](#art-24-p4));
    - certificação de soluções técnicas de aferição de idade, direta ou por entidades acreditadoras (Decreto nº 12.880/2026, [art. 30](#dec12880-art-30));
    - formas e requisitos mínimos de prevenção à exposição publicitária a produtos proibidos (Decreto nº 12.880/2026, [art. 32](#dec12880-art-32));
    - credenciamento, supervisão e descredenciamento de entidades notificantes (Decreto nº 12.880/2026, [art. 44, § 1º](#dec12880-art-44-p1)) — até lá, vale a habilitação provisória do art. 52;
    - conteúdo mínimo, periodicidade e condições da avaliação de impacto à segurança e à saúde (Decreto nº 12.880/2026, [art. 47, § 2º](#dec12880-art-47-p2));
    - edital de habilitação de instituições acadêmicas, científicas, tecnológicas, de inovação ou jornalísticas para acesso a dados (Decreto nº 12.880/2026, [art. 48](#dec12880-art-48));
    - exibição do aviso nas embalagens de equipamentos eletrônicos (Lei, [art. 38](#art-38); Decreto nº 12.880/2026, [art. 50, § 3º](#dec12880-art-50-p3)) — até lá, vale a redação transitória do art. 50, § 1º;
    - critérios objetivos de aferição do grau de intervenção do fornecedor, para a aplicação proporcional do [art. 39, § 3º](#art-39-p3) — competência que o Decreto nº 12.881/2026 (Anexo I, art. 2º, XXXVI) atribuiu **à ANPD**, e não genericamente ao Poder Executivo;
    - guias definitivos sobre escopo e obrigações gerais e sobre aferição de idade, e atualização dos Regulamentos de Fiscalização e de Aplicação de Sanções Administrativas, previstos no cronograma a partir de agosto de 2026.
- **Atos ainda não editados** por outros órgãos:
    - **MJSP** — forma de apresentação da faixa etária (Decreto nº 12.880/2026, [art. 12, § 3º](#dec12880-art-12-p3)); Comitê de Acompanhamento pela Sociedade Civil para a Classificação Indicativa (art. 13); funcionamento do Centro Nacional de Triagem de Notificações, protocolos, fluxos, requisitos e prazos dos relatórios de notificação (arts. 37, § 4º, e 39, §§ 1º e 2º); e normas sobre os alvarás de atividade artística, em articulação com CNJ e CNMP (art. 34, § 3º);
    - **MGI** — implementação e uso da solução de vinculação de crianças e adolescentes a responsáveis legais (Decreto nº 12.880/2026, [art. 20, II](#dec12880-art-20-ii)) e das soluções públicas de verificação de idade (art. 28).

### Estudos técnicos e radares tecnológicos da ANPD

Estudos publicados na [central de documentos técnicos e orientativos](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos) da Agência, sem efeito vinculante e, no caso da série Radar Tecnológico, com ressalva expressa de que não firmam posicionamento institucional. Entram aqui porque são a fonte pública do que esta nota afirma sobre o estado da técnica.

- [Radar Tecnológico nº 5 — Mecanismos de aferição de idade](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar-tecnologico-5-mecanismos-de-afericao-de-idade.pdf) (outubro de 2025) — taxonomia dos métodos, cinco gerações de soluções, riscos de proteção de dados de cada uma e convergência de princípios entre reguladores. Há também [versão em inglês](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar-tecnologico-5-mecanismos-de-afericao-de-idade-em-lingua-inglesa.pdf).
- [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (2026) — conceitos, funcionamento, riscos à proteção de dados e o capítulo sobre _deepfakes_ pornográficos contra meninas e mulheres, com o caso Grok.
- Notas técnicas de fiscalização citadas acima: [nº 6/2023/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/tiktok-nota_tecnica_6_versao_publica_ret-1.pdf) e [nº 50/2024/FIS/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/nt-50-pub.pdf) (aferição de idade em plataforma de vídeos curtos) e [nº 1/2026/FIS/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/nota-tecnica-no-1-2026-fis-cgf-anpd.pdf), com a [Recomendação Conjunta ANPD/MPF/Senacon](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/recomendacao_conjunta_anpd_mpf_senacon_caso_grok.pdf) (caso Grok).

### Normas correlatas

- [Lei nº 13.709 - Lei Geral de Proteção de Dados Pessoais (LGPD)](/notas/lgpd) — remetida expressamente nos [arts. 3º](#art-3) (nível elevado de privacidade e proteção de dados), [7º, § 2º](#art-7-p2), e [12, I](#art-12-i) (princípios do [art. 6º da LGPD](/notas/lgpd#art-6)), [16](#art-16) ([art. 14 da LGPD](/notas/lgpd#art-14)), [31, VI](#art-31-vi) (consentimento parental do [art. 14, § 1º](/notas/lgpd#art-14-p1)), [34, § 1º](#art-34-p1), e [37, parágrafo único](#art-37-pu).
- [Lei nº 12.965 - Marco Civil da Internet](/notas/mci) — conceitos de internet, aplicações de internet e terminal ([art. 2º, § 1º](#art-2-p1)) e prazos de guarda de registros ([art. 27, § 2º](#art-27-p2)).
- [Lei nº 8.078/1990 - Código de Defesa do Consumidor](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm) — deveres de segurança e informação ([art. 5º](#art-5)) e publicidade abusiva (art. 37, § 2º).
- [Lei nº 14.852/2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14852.htm) — marco legal da indústria de jogos eletrônicos; art. 16 (salvaguardas de interação) incorporado pelo [art. 21](#art-21), e arts. 16 e 17 postos sob fiscalização da ANPD pelo [art. 23, § 2º, do Decreto nº 12.880/2026](#dec12880-art-23-p2).
- [Lei nº 13.431/2017](https://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2017/lei/l13431.htm) — sistema de garantia de direitos da criança e do adolescente vítima ou testemunha de violência.
- [Lei nº 14.811/2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14811.htm) — Política Nacional de Prevenção e Combate ao Abuso e Exploração Sexual da Criança e do Adolescente.
- [Lei nº 13.848/2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13848.htm) — Capítulo I aplicável ao processo decisório da autoridade ([art. 2º, X](#art-2-x)); desde a Lei nº 15.352/2026, a ANPD integra o rol de agências reguladoras do seu art. 2º.
- Também referidas: Lei nº 13.146/2015 (Estatuto da Pessoa com Deficiência), Lei nº 14.533/2023 (Política Nacional de Educação Digital), Lei nº 14.790/2023 (apostas de quota fixa), Lei nº 8.242/1991 (Conanda e FNCA) e Decreto nº 12.002/2024 (classificação indicativa).
