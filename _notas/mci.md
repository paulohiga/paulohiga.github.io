---
layout: nota
permalink: /notas/mci
title: Marco Civil da Internet — Lei nº 12.965/2014
description: Notas de estudo sobre o Marco Civil da Internet — princípios, neutralidade de rede, guarda de registros, responsabilidade das plataformas após os Temas 987 e 533 do STF e o papel da ANPD, com o texto da lei ao lado.
lei: mci
normas_extra:
  - decreto-8771
  - decreto-12975
  - decreto-12976
ordem: 2
jurisdicao: Brasil
atualizado_em: 2026-08-20
---

## Resumo geral

O Marco Civil da Internet foi a primeira lei brasileira a fixar um regime jurídico geral para o uso da internet no país, num momento em que a rede já era parte essencial da vida cotidiana, mas carecia de balizas legais claras sobre neutralidade de rede, guarda de registros, privacidade das comunicações e responsabilidade de provedores por conteúdo de terceiros. Sua importância é reconhecida internacionalmente pelo processo de elaboração: foi construído por meio de consulta pública com participação social direta, o que lhe rendeu a alcunha de "Constituição da Internet".

A lei garante, entre outros pontos, a **neutralidade de rede** ([art. 9º](#art-9)) — vedando discriminação ou degradação de tráfego por parte das operadoras, salvo exceções técnicas ou de urgência —, a **inviolabilidade da intimidade e da vida privada** nas comunicações pela internet ([art. 7º](#art-7)), prazos e condições para a **guarda de registros de conexão e de acesso a aplicações** ([arts. 10 a 17](#art-10)), e um regime de responsabilização das aplicações de internet por conteúdo gerado por terceiros, historicamente concentrado no [art. 19](#art-19). Também estabeleceu diretrizes para a atuação do poder público na promoção do acesso à internet e no desenvolvimento de padrões tecnológicos ([arts. 24 a 29](#art-24)).

Passados dez anos de vigência, o Marco Civil permanece como referência principiológica, mas seu regime de responsabilização das plataformas foi profundamente reinterpretado pelo Supremo Tribunal Federal nos [Temas 987](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5160549&numeroProcesso=1037396&classeProcesso=RE&numeroTema=987) e [533](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5217273&numeroProcesso=1057258&classeProcesso=RE&numeroTema=533) de repercussão geral, com efeitos práticos equivalentes a uma reforma legislativa (ver "O novo regime de responsabilização das plataformas", abaixo). Essa reinterpretação foi operacionalizada pelo [Decreto nº 12.975/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12975.htm), que também atribuiu à [ANPD](https://www.gov.br/anpd/pt-br/assuntos/marco-civil-da-internet) — já responsável pela [LGPD](/notas/lgpd) e pelo [ECA Digital](/notas/eca-digital) — competência de regulação e fiscalização sobre a matéria, consolidando a Agência como o principal regulador do ambiente digital brasileiro.

Ao longo da década, tentativas de reforma legislativa mais ampla do Marco Civil — como o **PL nº 2.630/2020** ("PL das Fake News") e a **Medida Provisória nº 1.068/2021** (ver "Alterações posteriores ao Marco Civil", abaixo) — não avançaram, seja por arquivamento, seja por devolução sumária por inconstitucionalidade. Esse histórico de impasses legislativos é apontado, inclusive pelo próprio [CGI.br, em nota pública](https://cgi.br/esclarecimento/nota-publica-sobre-os-decretos-nos-12-975-2026-e-12-976-2026-regulamentacao-do-marco-civil-da-internet/), como fator que empurrou o debate sobre regulação de plataformas para o Judiciário, culminando nos Temas 987 e 533 e na regulamentação por decreto que se sucedeu a eles.

## Fundamentos

O Marco Civil não regula a internet como infraestrutura técnica, mas estabelece um piso principiológico para seu uso no Brasil — daí a alcunha de "Constituição da Internet". Sua elaboração é frequentemente citada como caso de sucesso de governança multiparticipativa, tendo sido moldada por consulta pública com contribuições de cidadãos, empresas, acadêmicos e sociedade civil.

### Fundamentos ([art. 2º](#art-2))

A disciplina do uso da internet no Brasil tem como fundamento o **respeito à liberdade de expressão**, bem como:

- o reconhecimento da escala mundial da rede ([inciso I](#art-2-i));
- os direitos humanos, o desenvolvimento da personalidade e o exercício da cidadania em meios digitais ([inciso II](#art-2-ii));
- a pluralidade e a diversidade ([inciso III](#art-2-iii));
- a abertura e a colaboração ([inciso IV](#art-2-iv));
- a livre iniciativa, a livre concorrência e a defesa do consumidor ([inciso V](#art-2-v)); e
- a finalidade social da rede ([inciso VI](#art-2-vi)).

### Princípios ([art. 3º](#art-3))

- garantia da liberdade de expressão, comunicação e manifestação de pensamento, nos termos da Constituição Federal ([I](#art-3-i));
- proteção da privacidade ([II](#art-3-ii));
- proteção dos dados pessoais, na forma da lei ([III](#art-3-iii));
- preservação e garantia da **neutralidade de rede** ([IV](#art-3-iv));
- preservação da estabilidade, segurança e funcionalidade da rede, por meio de medidas técnicas compatíveis com padrões internacionais e estímulo a boas práticas ([V](#art-3-v));
- responsabilização dos agentes de acordo com suas atividades, nos termos da lei ([VI](#art-3-vi));
- preservação da natureza participativa da rede ([VII](#art-3-vii));
- liberdade dos modelos de negócios promovidos na internet, desde que não conflitem com os demais princípios ([VIII](#art-3-viii)).

Os princípios da Lei não excluem outros previstos no ordenamento jurídico pátrio ou em tratados internacionais dos quais o Brasil seja parte ([parágrafo único](#art-3-pu)).

### Objetivos ([art. 4º](#art-4))

Promoção do direito de acesso à internet a todos ([I](#art-4-i)); do acesso à informação, ao conhecimento e à participação na vida cultural e na condução dos assuntos públicos ([II](#art-4-ii)); da inovação e da ampla difusão de novas tecnologias e modelos de uso e acesso ([III](#art-4-iii)); e da adesão a padrões tecnológicos abertos que permitam comunicação, acessibilidade e interoperabilidade ([IV](#art-4-iv)).

### Interpretação ([art. 6º](#art-6))

Além dos fundamentos, princípios e objetivos, a interpretação da Lei deve considerar a natureza da internet, seus usos e costumes particulares e sua importância para a promoção do desenvolvimento humano, econômico, social e cultural.

## Direitos e garantias dos usuários (Capítulo II)

### Disposições gerais ([art. 7º](#art-7))

O acesso à internet é essencial ao exercício da cidadania. São assegurados ao usuário, entre outros:

- inviolabilidade da intimidade e da vida privada, com indenização pelo dano material ou moral decorrente de violação ([I](#art-7-i));
- inviolabilidade e sigilo do fluxo de comunicações pela internet, salvo por ordem judicial ([II](#art-7-ii));
- inviolabilidade e sigilo das comunicações privadas armazenadas, salvo por ordem judicial ([III](#art-7-iii));
- não suspensão da conexão à internet, salvo por débito diretamente decorrente de sua utilização ([IV](#art-7-iv));
- manutenção da qualidade contratada da conexão ([V](#art-7-v));
- informações claras e completas nos contratos, com detalhamento do regime de proteção aos registros ([VI](#art-7-vi));
- **não fornecimento a terceiros de dados pessoais**, inclusive registros de conexão e de acesso a aplicações, salvo consentimento livre, expresso e informado ou hipóteses legais ([VII](#art-7-vii));
- informações claras e completas sobre coleta, uso, armazenamento, tratamento e proteção de dados pessoais, limitadas a finalidades que justifiquem a coleta, não sejam vedadas por lei e estejam especificadas em contrato ([VIII](#art-7-viii));
- consentimento expresso, destacado das demais cláusulas contratuais ([IX](#art-7-ix));
- exclusão definitiva dos dados pessoais fornecidos, a requerimento, ao término da relação, ressalvadas as hipóteses de guarda obrigatória previstas no MCI **e na legislação de proteção de dados** ([X](#art-7-x), redação dada pela LGPD);
- publicidade e clareza das políticas de uso dos provedores ([XI](#art-7-xi));
- acessibilidade, consideradas as características físico-motoras, perceptivas, sensoriais, intelectuais e mentais do usuário ([XII](#art-7-xii)); e
- aplicação das normas de proteção e defesa do consumidor nas relações de consumo na internet ([XIII](#art-7-xiii)).

### Nulidade de cláusulas ([art. 8º](#art-8))

A garantia do direito à privacidade e à liberdade de expressão nas comunicações é condição para o pleno exercício do direito de acesso à internet. São **nulas de pleno direito** as cláusulas contratuais que ofendam a inviolabilidade e o sigilo das comunicações privadas ([parágrafo único, I](#art-8-pu-i)) ou que, em contrato de adesão, não ofereçam ao contratante a alternativa do foro brasileiro para litígios sobre serviços prestados no Brasil ([II](#art-8-pu-ii)).

## Da provisão de conexão e de aplicações de internet (Capítulo III)

### Neutralidade de rede ([art. 9º](#art-9))

O responsável pela transmissão, comutação ou roteamento tem o dever de **tratar de forma isonômica** quaisquer pacotes de dados, sem distinção por conteúdo, origem e destino, serviço, terminal ou aplicação. Discriminação ou degradação de tráfego é medida **excepcional**, regulamentada por decreto (ouvidos o CGI.br e a Anatel), e só pode decorrer de requisitos técnicos indispensáveis à prestação adequada dos serviços ou de priorização de serviços de emergência ([§ 1º](#art-9-p1)). Nessas hipóteses, o responsável deve abster-se de causar dano aos usuários (art. 927 do Código Civil), agir com proporcionalidade, transparência e isonomia, informar previamente as práticas de gerenciamento de tráfego e oferecer condições comerciais não discriminatórias ([§ 2º](#art-9-p2)). É vedado, na provisão de conexão, **bloquear, monitorar, filtrar ou analisar o conteúdo dos pacotes de dados** ([§ 3º](#art-9-p3)).

O Decreto nº 8.771/2016 detalhou essas exceções: são excepcionais e devem atender a requisitos técnicos indispensáveis (segurança de redes, controle de ataques de negação de serviço, situações de congestionamento) ou à priorização emergencial; veda a priorização de pacotes por arranjos comerciais e a cobrança diferenciada por tipo de conteúdo acessado. A fiscalização compete à Anatel, em conjunto com o CGI.br.

**Zero-rating (planos com franquia grátis para WhatsApp/redes sociais).** É a prática, comum no mercado brasileiro desde antes do próprio MCI, de operadoras móveis oferecerem acesso a aplicativos específicos (WhatsApp, redes sociais) sem descontar da franquia de dados contratada — sem, porém, alterar a velocidade, a prioridade técnica ou as condições de entrega desses pacotes em relação aos demais. O status jurídico da prática é **controvertido e não pacificado**:

- **Leitura que a permite**: tanto o [Cade](https://sei.cade.gov.br/sei/modulos/pesquisa/md_pesq_documento_consulta_externa.php?DZ2uWeaYicbuRZEFhBt-n3BfPLlu9u7akQAh8mpB9yN_Jjavdwv3xbbzR-jjbytTTUr5UQ8WR6l5l1EOlMu6MVoV2OR7-mnaiKYHuHBtfQrXjFjVRQ0kNDVkNdxYE-oL=) (inquérito arquivado em 2017, por "conduta não configurada") quanto a análise técnica da Anatel entenderam que a neutralidade do [art. 9º](#art-9) protege apenas o **tratamento técnico** dos pacotes (velocidade, prioridade, bloqueio) — e não a política comercial de cobrança —, já que o conteúdo zero-rated trafega "nas mesmas condições técnicas" dos demais. Para o Cade, cabe à Anatel (não à autoridade concorrencial) se posicionar sobre neutralidade de rede propriamente dita.
- **Leitura crítica**: entidades como [Intervozes](https://www.minhaoperadora.com.br/2021/06/intervozes-protocola-recurso-contra-o-zero-rating.html) e parte da academia (ver [Observatório do Marco Civil](https://web.archive.org/web/20230926164009/https://www.omci.org.br/jurisprudencia/207/neutralidade-de-rede-e-ordem-economica/) e [InternetLab](https://internetlab.org.br/pt/especial/neutralidade-da-rede-questoes-atuais-e-futuras-em-debate/)) sustentam que essa distinção não encontra respaldo na redação literal do [art. 9º](#art-9), que veda distinção "por conteúdo, origem e destino, **serviço**, terminal ou **aplicação**" — cobrança diferenciada por aplicativo seria, por definição, esse tipo de distinção; e apontam o Brasil como um dos países com maior incidência de zero-rating no mundo.
- Nem a Lei nem o Decreto nº 8.771/2016 tratam do tema de forma expressa e definitiva; a prática segue amplamente oferecida pelas operadoras (planos de "WhatsApp/redes sociais grátis") sem que tenha havido, até o momento, sanção administrativa ou judicial que a proíba de forma geral.

### Proteção a registros, dados pessoais e comunicações privadas ([arts. 10 a 17](#art-10))

- **Guarda e disponibilização** ([art. 10](#art-10)): devem atender à preservação da intimidade, vida privada, honra e imagem. O conteúdo das comunicações privadas só pode ser disponibilizado mediante ordem judicial ([§ 2º](#art-10-p2)); o mesmo vale para registros associados a dados pessoais que possam identificar o usuário ([§ 1º](#art-10-p1)).
    - **Exceção — dados cadastrais** ([art. 10, § 3º](#art-10-p3)): autoridades administrativas com competência legal para requisitá-los podem acessar **dados cadastrais** (qualificação pessoal, filiação e endereço) **sem precisar de ordem judicial**. É uma exceção pontual, restrita a esse conjunto básico de dados de identificação — não alcança registros de conexão/acesso, nem o conteúdo de comunicações, que continuam exigindo ordem judicial. Exemplo típico: uma delegacia de polícia, investigando um crime, requisita diretamente a uma operadora de telefonia ou a um aplicativo o **nome, o CPF e o endereço** vinculados a um número de telefone ou a uma conta de usuário — mas, para obter o **histórico de acessos** dessa mesma conta ou o **conteúdo das mensagens** trocadas por ela, precisa de autorização judicial. O mesmo mecanismo é usado por CPIs, que têm poderes de investigação próprios das autoridades judiciais (CF, art. 58, § 3º) e costumam requisitar dados cadastrais diretamente às plataformas.
- **Aplicação da legislação brasileira e extraterritorialidade** ([art. 11](#art-11)): em qualquer operação de coleta, armazenamento, guarda e tratamento de registros, dados pessoais ou comunicações em que pelo menos um ato ocorra em território nacional, aplicam-se obrigatoriamente a legislação brasileira e os direitos à privacidade, à proteção de dados e ao sigilo — inclusive quando a pessoa jurídica é sediada no exterior, desde que ofereça serviço ao público brasileiro ou integre grupo econômico com estabelecimento no Brasil ([§ 2º](#art-11-p2)).
    - **Na prática**, a regra esbarra num problema real: nem toda empresa estrangeira tem CNPJ ou representante formal no Brasil, o que dificulta citação, fiscalização e execução de decisões. A jurisprudência lida com isso de duas formas:
        - Quando o grupo econômico tem **alguma presença corporativa** no País — ainda que apenas uma controlada local —, os tribunais responsabilizam essa entidade brasileira pelas obrigações do grupo estrangeiro. Foi o caso do [WhatsApp](https://www.migalhas.com.br/quentes/305128/facebook-e-whatsapp-sao-multados-em-r-23-milhoes-por-descumprimento-de-ordem-judicial): a Justiça responsabilizou a Facebook Serviços Online do Brasil, representante local do grupo que controla o aplicativo, por descumprimentos de ordens de fornecimento de dados, com base no art. 75, X, do CPC combinado com os arts. 11, [§§ 1º](#art-11-p1) e [2º](#art-11-p2), e [13](#art-13) do MCI.
        - Quando **não há representação alguma** no Brasil, o Judiciário recorre à sanção mais drástica do [art. 12](#art-12) (incisos [III](#art-12-iii) e [IV](#art-12-iv) — suspensão temporária ou proibição de exercício das atividades), determinando aos provedores de conexão que bloqueiem o acesso ao serviço em todo o território nacional como medida coercitiva indireta. Foi o fundamento usado nos bloqueios do WhatsApp (2015-2016) e, de forma mais explícita, no [bloqueio do Telegram em março de 2022](https://pt.m.wikipedia.org/wiki/Ordem_de_bloqueio_do_Telegram_no_Brasil) — determinado pelo ministro Alexandre de Moraes depois que o aplicativo deixou de ter representante legal no País; o serviço voltou ao ar assim que a empresa indicou um novo representante.
    - Essa segunda via é [contestada no próprio STF](https://noticias.stf.jus.br/postsnoticias/entenda-stf-julga-acoes-contra-normas-do-marco-civil-da-internet/): a **ADPF 403** e a **ADI 5527** questionam a validade de decisões que bloqueiam o serviço inteiro, medida que atinge milhões de usuários por conduta da empresa. O julgamento conjunto começou em maio de 2020, com os relatores votando contra o bloqueio e contra ordens que obriguem a enfraquecer a criptografia, e foi suspenso por pedido de vista do ministro Alexandre de Moraes — **até hoje sem conclusão**, de modo que a questão segue formalmente em aberto no Tribunal. A controvérsia expõe o vazio que a lei buscava evitar: por isso o Decreto nº 12.975/2026 passou a exigir, de forma expressa, que provedores com atuação no Brasil mantenham [**sede e representante legal no País**](#dec8771-art-16-a), com poderes de resposta administrativa e judicial (ver seção sobre o novo regime de responsabilização, abaixo).
- **Sanções** por infração às normas dos [arts. 10](#art-10) e [11](#art-11), sem prejuízo das demais sanções cíveis, criminais ou administrativas, aplicadas de forma **isolada ou cumulativa**, conforme o caso ([art. 12](#art-12)):
    - **advertência**, com indicação de prazo para adoção de medidas corretivas ([inciso I](#art-12-i));
    - **multa de até 10% do faturamento do grupo econômico no Brasil** no último exercício, excluídos os tributos, considerados a condição econômica do infrator e o princípio da proporcionalidade entre a gravidade da falta e a intensidade da sanção ([inciso II](#art-12-ii));
    - **suspensão temporária** das atividades que envolvam os atos previstos no [art. 11](#art-11) ([inciso III](#art-12-iii)); ou
    - **proibição de exercício** das atividades que envolvam os atos previstos no [art. 11](#art-11) ([inciso IV](#art-12-iv)).
    - **Solidariedade** ([parágrafo único](#art-12-pu)): tratando-se de empresa estrangeira, respondem solidariamente pelo pagamento da multa sua filial, sucursal, escritório ou estabelecimento situado no País.
- **Guarda de registros de conexão** ([art. 13](#art-13)): dever do administrador de sistema autônomo, sob sigilo e em ambiente controlado e de segurança, pelo prazo de **1 ano**; a responsabilidade não pode ser transferida a terceiros ([§ 1º](#art-13-p1)); autoridade policial, administrativa ou o Ministério Público podem requerer cautelarmente prazo maior ([§ 2º](#art-13-p2)), com 60 dias para buscar autorização judicial de acesso ([§ 3º](#art-13-p3)).
- **Vedação de guarda de registros de acesso a aplicações na provisão de conexão** ([art. 14](#art-14)).
- **Guarda de registros de acesso a aplicações de internet** ([art. 15](#art-15)): dever do provedor constituído como pessoa jurídica que exerça a atividade de forma organizada, profissional e com fins econômicos, pelo prazo de **6 meses**.
- **Vedações à guarda** ([art. 16](#art-16)): de registros de acesso a outras aplicações sem consentimento prévio do titular ([I](#art-16-i)), e de dados pessoais excessivos em relação à finalidade do consentimento — **ressalvadas as hipóteses previstas na LGPD** ([II](#art-16-ii), redação dada pela Lei nº 13.709/2018).
- **Ausência de responsabilidade pela opção de não guardar** registros de acesso a aplicações fora das hipóteses legais ([art. 17](#art-17)).

### Responsabilidade por danos decorrentes de conteúdo gerado por terceiros ([arts. 18 a 21](#art-18))

- **Provedor de conexão** ([art. 18](#art-18)): não é responsabilizado civilmente por danos decorrentes de conteúdo gerado por terceiros.
- **Provedor de aplicações — regra original do [art. 19](#art-19)**: "com o intuito de assegurar a liberdade de expressão e impedir a censura", o provedor de aplicações somente poderia ser responsabilizado civilmente por danos decorrentes de conteúdo de terceiros se, após **ordem judicial específica**, não tomasse providências para tornar o conteúdo indisponível no prazo assinalado. Essa regra foi **declarada parcialmente inconstitucional** pelo STF (Temas 987 e 533) — ver seção própria abaixo.
- **Comunicação ao usuário responsável** ([art. 20](#art-20)): o provedor deve comunicar ao usuário os motivos da indisponibilização, permitindo contraditório e ampla defesa, salvo previsão legal ou determinação judicial fundamentada em contrário; a pedido do usuário, o conteúdo removido é substituído pela motivação ou ordem judicial que fundamentou a remoção ([parágrafo único](#art-20-pu)).
- **Regime especial para conteúdo íntimo não consentido** ([art. 21](#art-21)): o provedor é responsabilizado **subsidiariamente** pela violação de intimidade decorrente da divulgação não autorizada de imagens, vídeos ou materiais com cenas de nudez ou atos sexuais de caráter privado quando, **notificado extrajudicialmente** pelo participante ou seu representante, deixar de promover a indisponibilização diligente do conteúdo. Este sempre foi o único regime do MCI que dispensava ordem judicial — e serviu de modelo para a nova interpretação geral do art. 19 fixada pelo STF.

### Requisição judicial de registros ([arts. 22](#art-22) e [23](#art-23))

A parte interessada pode requerer ao juiz, para formar conjunto probatório em processo cível ou penal, que ordene ao responsável pela guarda o fornecimento de registros de conexão ou de acesso a aplicações — mediante fundados indícios do ilícito ([I](#art-22-pu-i)), justificativa da utilidade probatória ([II](#art-22-pu-ii)) e delimitação do período ([III](#art-22-pu-iii)). Cabe ao juiz garantir o sigilo das informações e a preservação da intimidade, podendo determinar segredo de justiça ([art. 23](#art-23)).

## O novo regime de responsabilização das plataformas (STF, Temas 987 e 533)

Em 26/6/2025, o Plenário do STF, por 8 votos a 3 (vencidos os ministros André Mendonça, Edson Fachin e Nunes Marques), julgou conjuntamente o [RE 1.037.396](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5160549&numeroProcesso=1037396&classeProcesso=RE&numeroTema=987) (**Tema 987**, relator Dias Toffoli) e o [RE 1.057.258](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5217273&numeroProcesso=1057258&classeProcesso=RE&numeroTema=533) (**Tema 533**, relator Luiz Fux) e declarou a **inconstitucionalidade parcial e progressiva do [art. 19](#art-19)** do MCI, por entender que a exigência de ordem judicial prévia para qualquer responsabilização civil configura um "estado de omissão parcial" que não confere proteção suficiente a bens jurídicos constitucionais de alta relevância — os direitos fundamentais e a própria democracia.

- **Tema 987**: caso de perfil falso criado no Facebook em nome de pessoa que não tinha conta na rede, usado para ofender terceiros; a plataforma foi notificada por sua própria ferramenta de denúncia, mas não removeu o perfil. Discutia diretamente a constitucionalidade do [art. 19](#art-19).
- **Tema 533**: caso anterior à vigência do MCI (fatos de 2011), em que o Google foi condenado por negligência por não fiscalizar e remover, sem ordem judicial, conteúdo ofensivo de uma comunidade no Orkut. Discutia o dever de a empresa hospedeira fiscalizar e retirar conteúdo ofensivo do ar por conta própria.

**Embargos de declaração** — recurso cabível contra decisão judicial que contenha obscuridade, contradição, omissão ou erro material, cujo objetivo formal é apenas esclarecer ou completar a decisão (não substituí-la) — começaram a ser apreciados em 29/5/2026. A maior parte dos pedidos [não foi sequer conhecida pelo Plenário](https://www.migalhas.com.br/quentes/457854/stf-julga-recursos-contra-ampliacao-de-responsabilidade-de-redes), sendo recebida apenas como manifestação. Ainda assim, o Tribunal aproveitou o julgamento para **ajustar a tese** em pontos relevantes, primeiro nas sessões de 11 e 12 de junho e depois na sessão extraordinária de **17/6/2026**, que encerrou o julgamento por unanimidade e decretou o **trânsito em julgado imediato** — isto é, não cabe mais recurso, independentemente da publicação do acórdão. É essa redação ajustada, e não a de 2025, que vale hoje.

Quatro ajustes mudam o que se cobra do provedor:

- **A lista de provedores fora do novo regime cresceu.** Além de e-mail, mensageria privada e reuniões fechadas de voz e vídeo, o art. 19 passou a alcançar os **demais provedores de aplicações que não tenham ingerência no fluxo comunicacional e informacional**. É critério funcional, não lista fechada: quem só intermedeia, sem curadoria nem amplificação algorítmica, fica de fora. Repare que o [Decreto nº 12.975/2026 não tem essa quarta categoria](#dec8771-art-16-o) — ele foi escrito contra a tese de 2025, e sua lista de exclusões é fechada em três itens.
- **A presunção deixou de ser de responsabilidade e passou a ser de culpa, relativa.** Nos anúncios pagos e nas redes artificiais de distribuição, presume-se a **culpa** do provedor, e não sua responsabilidade. A distinção não é acadêmica: culpa presumida se afasta com prova de diligência, e o [decreto ainda usa a fórmula antiga](#dec8771-art-16-l) ("presume-se a responsabilidade"), embora já ressalvasse a mesma excludente.
- **Ficou expressa a excludente de dúvida razoável quanto à ilicitude.** O provedor notificado que, após **análise diligente e fundamentada**, permanece em dúvida razoável sobre o caráter ilícito do conteúdo não responde por mantê-lo no ar — é a válvula contra a sobre-remoção preventiva. Aqui o decreto chegou primeiro: a mesma solução já constava do seu [art. 16-G, § 1º](#dec8771-art-16-g-p1), com a ressalva de que a dúvida se pesa contra a gravidade do crime.
- **O STF reconheceu a competência regulamentar do Executivo** (CF, art. 84, IV e VI) sobre a matéria — leitura que dá respaldo aos Decretos nºs 12.975/2026 e 12.976/2026, editados menos de um mês antes desse julgamento e questionados no Congresso por suposto excesso de poder regulamentar (ver "Debate em curso", ao final).

Os efeitos da tese são **ex nunc** — ou seja, valem "a partir de agora", sem retroagir a fatos anteriores à decisão (o oposto do efeito _ex tunc_, que retroagiria à data de origem da norma questionada). Na prática, contam-se da publicação da ata do julgamento de mérito original, em **5/8/2025**, ressalvados atos continuados ou permanentes — um conteúdo publicado antes dessa data, mas ainda disponível, entra no novo regime. O prazo de **60 dias** para os provedores implementarem as obrigações estruturais ligadas ao dever de cuidado corre de outro marco: a publicação da ata do julgamento dos embargos, em 18/6/2026, o que o faz terminar em **17 de agosto de 2026**.

Pontos centrais da tese fixada, enquanto não sobrevier legislação específica:

- o [art. 19](#art-19) deixa de ser a regra geral; o **modelo de notificação-remoção do [art. 21](#art-21)** (originalmente pensado só para imagens íntimas) passa a orientar, com responsabilidade solidária, os danos decorrentes de conteúdos ilícitos gerados por terceiros em geral — o provedor responde se, após notificação extrajudicial, não promover a remoção diligente, **salvo dúvida razoável quanto à ilicitude** apurada em análise diligente;
- para **crimes contra a honra**, continua a se aplicar o [art. 19](#art-19) (ordem judicial específica), sem prejuízo da remoção por notificação extrajudicial;
- o [art. 19](#art-19) também continua valendo, por inteiro, para **e-mail, mensageria privada e reuniões fechadas de voz e vídeo** — protegidos pelo sigilo das comunicações — e para os **demais provedores de aplicações sem ingerência no fluxo comunicacional e informacional**, exceção acrescentada no julgamento dos embargos;
- em caso de **replicação sucessiva** de conteúdo ofensivo já reconhecido por decisão judicial, todos os provedores devem remover publicações com conteúdo idêntico a partir de notificação judicial ou extrajudicial, sem necessidade de nova decisão judicial para cada réplica;
- em **anúncios e impulsionamentos pagos** ou em **redes artificiais de distribuição** (_chatbots_, robôs) com conteúdo ilícito, presume-se a **culpa** do provedor, independentemente de notificação — presunção **relativa**, afastada pela prova de atuação diligente e tempestiva;
- há um **dever de cuidado** específico para a indisponibilização imediata de conteúdos que configurem um **rol taxativo de crimes graves**: atos antidemocráticos (CP, art. 286, parágrafo único, e arts. 359-L a 359-R); terrorismo (Lei nº 13.260/2016); indução, instigação ou auxílio a suicídio ou automutilação (CP, art. 122); discriminação por raça, cor, etnia, religião, procedência nacional, sexualidade ou identidade de gênero (Lei nº 7.716/1989); crimes contra a mulher em razão do sexo feminino; crimes sexuais contra pessoas vulneráveis e pornografia infantil (CP e ECA); e tráfico de pessoas (CP, art. 149-A). A responsabilidade aqui exige **falha sistêmica**.
    - **Dever de cuidado**: obrigação contínua e preventiva de manter mecanismos, processos e estruturas de governança capazes de evitar a circulação massiva desses conteúdos graves — diferente da lógica pontual de reagir a cada notificação (essa é a do [art. 21](#art-21)). É um padrão de diligência razoável, não uma lista fechada de medidas obrigatórias; seus critérios objetivos de aferição ainda estão sendo construídos pela ANPD (ver "Pendências normativas" ao final desta nota).
    - **Falha sistêmica**: o gatilho concreto dessa responsabilidade — o descumprimento do dever de cuidado. A própria tese do STF (item 5.2) a define como deixar de adotar medidas adequadas de prevenção ou remoção dos conteúdos ilícitos listados, em violação ao dever de atuar de forma responsável, transparente e cautelosa. A ANPD precisou o conceito no [FAQ sobre os Decretos de 2026](https://www.gov.br/anpd/pt-br/assuntos/marco-civil-da-internet) (ver seção seguinte); faltam ainda os parâmetros objetivos de fiscalização — o que conta como "medida adequada" para cada tipo de serviço.

**Os regimes que passaram a conviver**

| Situação | O que faz o provedor responder | Como ele se exime |
| --- | --- | --- |
| Conteúdo ilícito em geral | Não remover diligentemente após **notificação extrajudicial** — responde solidariamente com quem publicou | Remover a tempo, ou demonstrar **dúvida razoável** quanto à ilicitude após análise diligente |
| Crimes contra a honra | Descumprir **ordem judicial específica** ([art. 19](#art-19), regime original) | Cumprir a ordem no prazo assinalado |
| Réplica de conteúdo já reconhecido ilícito em juízo | Não remover publicações idênticas após notificação judicial ou extrajudicial | Remover, sem exigir nova decisão para cada réplica |
| Anúncio pago ou rede artificial de distribuição | **Presunção relativa de culpa**, independentemente de notificação | Provar atuação diligente e tempestiva |
| Rol taxativo de crimes graves | **Falha sistêmica** no dever de cuidado — ausência de medidas capazes de inibir a circulação massiva | Demonstrar medidas adequadas de prevenção e remoção; conteúdo isolado não caracteriza falha |
| E-mail, mensageria privada, reuniões fechadas e provedores sem ingerência no fluxo | Só o descumprimento de **ordem judicial** ([art. 19](#art-19) preservado por inteiro) | Cumprir a ordem no prazo assinalado |

O **Decreto nº 12.975/2026** transpõe essa interpretação judicial para o plano regulamentar, inserindo no Decreto nº 8.771/2016 um bloco inteiro de deveres ([arts. 16-A a 16-P](#dec8771-art-16-a)) e atribuindo à **ANPD** competência de regulação, fiscalização e apuração de infrações ([art. 19-A](#dec8771-art-19-a)). O mapa desses deveres:

| Dispositivo | Do que trata |
| --- | --- |
| [16-A](#dec8771-art-16-a) | Sede e representante legal no País (pessoa jurídica, com contato acessível no site); canal permanente de denúncia; medidas contra redes artificiais de distribuição; segurança e transparência do serviço |
| [16-B](#dec8771-art-16-b) e [16-C](#dec8771-art-16-c) | Dever de cuidado e responsabilidade por **falha sistêmica** no rol de crimes graves; gestão diligente dos riscos sistêmicos criados ou potencializados pelo serviço |
| [16-D](#dec8771-art-16-d) a [16-F](#dec8771-art-16-f) | Requisitos da notificação, **sob pena de nulidade** (identificar a conduta, o conteúdo e o notificante); resposta ao notificante e a quem publicou, com fundamento e meios de contestação; medidas contra o uso abusivo do próprio canal de denúncia |
| [16-G](#dec8771-art-16-g) a [16-I](#dec8771-art-16-i) | Indisponibilização do conteúdo criminoso notificado, exceto crimes contra a honra; excludente de **dúvida razoável** após análise fundamentada; encaminhamento ao Poder Público; vedação de punir o provedor pela decisão sobre um conteúdo isolado |
| [16-J](#dec8771-art-16-j) | Hipóteses em que continua a valer a **ordem judicial** do [art. 19](#art-19); remoção de réplicas de conteúdo já reconhecido ilícito, sem nova decisão |
| [16-K](#dec8771-art-16-k) a [16-N](#dec8771-art-16-n) | Anúncios e impulsionamentos: vedar a contratação de conteúdo ilícito, presunção de responsabilidade, guarda das informações por **1 ano** e remoção de **publicidade enganosa, abusiva ou fraudulenta** (CDC, art. 37) mediante notificação do Sistema Nacional de Defesa do Consumidor ou da AGU |
| [16-O](#dec8771-art-16-o) e [16-P](#dec8771-art-16-p) | Serviços excluídos dos deveres dos arts. 16-B a 16-J (e-mail, mensageria interpessoal e reuniões em grupo restrito) e critérios diferenciados por porte, interferência, estado da técnica e risco |
| [20-A](#dec8771-art-20-a) | Autorregulação obrigatória: termos de uso, sistema de notificações, devido processo e relatórios de transparência |

Duas peças desse bloco são contraintuitivas. A primeira é o [art. 16-N, § 2º](#dec8771-art-16-n-p2): **publicidade que o usuário não consegue identificar como publicidade é, por definição, enganosa** — regra que alcança o marketing de influência sem sinalização. A segunda é o [art. 16-F](#dec8771-art-16-f): o mesmo decreto que obriga a criar canal de denúncia obriga a **coibir seu uso abusivo**, em especial o que atente contra a liberdade de expressão — a denúncia em massa como forma de silenciar alguém é, ela própria, objeto de dever.

Segundo o [FAQ da ANPD sobre o tema](https://www.gov.br/anpd/pt-br/assuntos/marco-civil-da-internet):

- a atuação da Agência tem caráter **sistêmico**: avalia se os provedores adotam mecanismos, processos, governança, canais de denúncia e medidas técnicas adequadas — **não analisa conteúdo ou publicação isoladamente**, nem determina a suspensão de contas;
- retoma e precisa o conceito de **falha sistêmica** já visto acima: é a ausência de medidas adequadas de prevenção ou remoção capazes de inibir a circulação massiva de conteúdo ilícito; a existência isolada de um conteúdo ilícito, por si só, não a caracteriza;
- para preservar a liberdade de expressão, a retirada de conteúdo deve ser **justificada e contestável**: o provedor comunica a decisão ao denunciante e a quem publicou, informa os meios de recurso e, ao decidir manter o conteúdo, também deve justificar a manutenção ao denunciante; a avaliação considera o contexto, a liberdade religiosa e de crença e eventual finalidade informativa, educativa, de crítica, sátira ou paródia;
- como regra geral, o decreto **não se aplica** a mensagens privadas, e-mails e plataformas de reunião virtual ([respeitado o sigilo das comunicações](#dec8771-art-16-o)), mas alcança grupos e canais abertos — a exclusão é da conversa interpessoal, não do serviço inteiro;
- as **sanções** aplicáveis são as já previstas no Marco Civil e na legislação correlata — advertência com prazo para correção, multa de até 10% do faturamento do grupo econômico no Brasil, suspensão temporária e proibição de exercício da atividade —, observados devido processo legal, ampla defesa e proporcionalidade.

## Proteção de mulheres no ambiente digital (Decreto nº 12.976/2026)

Editado na mesma data do Decreto nº 12.975/2026 e com a mesma _vacatio legis_ de 60 dias (em vigor desde 20/7/2026), estabelece diretrizes para a proteção de mulheres na internet e o enfrentamento da violência contra mulheres em ambiente digital, com fundamento no art. 84, _caput_, incisos IV e VI, "a", da Constituição, e na Lei nº 12.965/2014.

- Define **violência contra mulheres em ambiente digital** como crimes ou atos ilícitos praticados em razão da condição do sexo feminino — causando dano ou sofrimento físico, sexual, psicológico, político ou econômico —, cometidos, instigados, facilitados ou agravados pelo uso de tecnologias digitais: violência doméstica e familiar (inclusive psicológica), perseguição digital, violência política de gênero, divulgação não consentida de conteúdo íntimo, ameaças e conteúdos que propagam ódio ou aversão às mulheres, entre outros.
- Princípios que regem a atuação normativa, fiscalizatória e sancionatória, e as políticas públicas de enfrentamento ([art. 2º](#dec12976-art-2)):
    - **não discriminação** em razão da condição do sexo feminino, vedadas quaisquer formas de violência, intimidação ou exposição degradante praticadas em ambiente digital ([inciso I](#dec12976-art-2-i));
    - **centralidade da vítima**: acolhimento adequado, preservação de provas, disponibilidade de canais acessíveis de denúncia e adoção de medidas para cessação ou mitigação do dano ([inciso II](#dec12976-art-2-ii));
    - **proteção de dados e da privacidade**: inviolabilidade da intimidade, da vida privada, da honra e da imagem das mulheres ([inciso III](#dec12976-art-2-iii));
    - **não revitimização**: vedadas novas exposições da mulher, tanto pelas autoridades competentes quanto pelos provedores de aplicações de internet, ao adotarem as medidas de cessação ou mitigação do dano ([inciso IV](#dec12976-art-2-iv)).
- Deveres específicos das plataformas:
    - **dever de cuidado** dos provedores que intermedeiam conteúdo de terceiro, quanto a crimes ou atos ilícitos praticados contra mulheres em razão do sexo feminino, com responsabilização em caso de falha sistêmica ([art. 4º](#dec12976-art-4));
    - [**remoção de conteúdo íntimo divulgado sem consentimento em até 2 horas**](#dec12976-art-7) após a notificação, com marcação digital para bloquear automaticamente o reenvio;
    - [**redução tempestiva do alcance e da visibilidade de ataques coordenados**](#dec12976-art-8) contra mulheres — inclusive de ofício, independentemente de denúncia prévia da vítima —, com prioridade para casos de violência política e de mulheres com exposição pública (jornalistas, por exemplo);
    - [**vedação à geração e à modificação de conteúdo íntimo por inteligência artificial**](#dec12976-art-9) (_deepfakes_), com obrigação de implementar salvaguardas técnicas para identificar e bloquear esse tipo de solicitação.
- Legitimados a notificar, além da própria vítima: [advogado, autoridades policiais, Ministério Público (Federal, estadual e distrital) e Defensorias Públicas](#dec12976-art-7-p3).
- Prevê a criação de [**grupo de trabalho interministerial**](#dec12976-art-11), com participação garantida do Ministério das Mulheres e da Secretaria de Comunicação Social da Presidência, para propor um sistema integrado de prevenção, proteção e acolhimento a vítimas de violência digital.
- Canal de apoio: Ligue 180 (ligação gratuita e anônima, 24h, também por WhatsApp e em Libras).

**Os prazos que já valem.** Este é o único dos dois decretos que fixou prazos concretos de resposta, e o fez em regra **transitória**, válida até que a ANPD regulamente ([art. 12](#dec12976-art-12)). Enquanto isso, o provedor notificado tem de remover o conteúdo **ou** comunicar ao notificante por que o manteve, com os meios de contestação, dentro destes prazos:

| Situação | Prazo, contado da notificação |
| --- | --- |
| Conteúdo íntimo divulgado sem consentimento | **2 horas** para indisponibilizar ([art. 7º, § 1º](#dec12976-art-7-p1)) — esse prazo não é transitório e não admite a alternativa de apenas justificar |
| Conteúdo manifestamente ilegal, entre os crimes e atos ilícitos do [art. 4º](#dec12976-art-4) | **6 horas** ([art. 12, I](#dec12976-art-12-i)) |
| Demais casos de violência contra a mulher em ambiente digital | **24 horas** ([art. 12, II](#dec12976-art-12-ii)) |
| Decisão sobre a contestação apresentada | **24 horas** para restaurar ou remover e comunicar as duas partes ([art. 12, parágrafo único](#dec12976-art-12-pu)) |

Vale contrastar com o Decreto nº 12.975/2026, que **não fixou prazo algum** e remeteu o ponto à regulamentação da Agência ([art. 16-D, parágrafo único, II](#dec8771-art-16-d-pu-ii)). Na prática, hoje, a única remoção com relógio correndo é a de conteúdo íntimo não consentido.

### _Deepfakes_ e o dever de cuidado, no levantamento da ANPD

O [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (ANPD, 2026) é o documento público que melhor descreve o fenômeno que o [art. 9º do Decreto nº 12.976/2026](#dec12976-art-9) tenta conter. Como os demais volumes da série, não firma posicionamento institucional.

O capítulo brasileiro do estudo reúne, a partir de levantamento da SaferNet Brasil, **16 casos documentados em instituições de ensino de 10 unidades federativas entre 2023 e 2025, com 72 vítimas e 57 agressores** — imagens de nudez ou de conteúdo sexual em que rostos reais, quase sempre extraídos de redes sociais, são sobrepostos a corpos nus. As vítimas identificadas são, em sua ampla maioria, meninas e mulheres, o que sustenta a leitura do decreto: _deepfake_ pornográfico é violência de gênero praticada por meio digital.

O Radar também documenta o **caso Grok**, que interessa a esta nota porque foi construído sobre o regime de responsabilidade discutido acima:

- **20 de janeiro de 2026** — ANPD, Ministério Público Federal e Senacon expedem [Recomendação Conjunta](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/recomendacao_conjunta_anpd_mpf_senacon_caso_grok.pdf) à empresa responsável pela plataforma X, por permitir que a ferramenta de IA generativa integrada ao serviço editasse imagens de terceiros sem verificação de consentimento, gerando conteúdo sexualizado de mulheres e de crianças e adolescentes. O documento sustenta duas teses relevantes: que a empresa, ao **oferecer e estruturar** a ferramenta, não atua como mero intermediário de conteúdo de terceiro; e que, mesmo à luz do Marco Civil, há **dever de cuidado reforçado**, especialmente depois de o STF ter relativizado a imunidade do [art. 19](#art-19).
- **11 de fevereiro de 2026** — consideradas insuficientes as providências informadas, a ANPD expede **medida preventiva** — instrumento dos [arts. 32, III](/notas/regimento-interno-anpd#res1-art-32-iii) e [35 do Regulamento de Fiscalização](/notas/regimento-interno-anpd#res1-art-35) — para impedir a geração desses conteúdos, documentada na [Nota Técnica nº 1/2026/FIS/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/nota-tecnica-no-1-2026-fis-cgf-anpd.pdf).

O caso é anterior à vigência dos dois decretos de 2026 — a recomendação e a medida preventiva se apoiaram na [LGPD](/notas/lgpd), no [ECA Digital](/notas/eca-digital), no ECA, no Código de Defesa do Consumidor e no Marco Civil tal como reinterpretado pelo STF. Serve, por isso, como demonstração do argumento que percorre esta nota: o novo regime deu contorno normativo escrito a um dever de cuidado que já operava.

## Da atuação do poder público (Capítulo IV, [arts. 24 a 29](#art-24))

- **Diretrizes gerais** para União, Estados, Distrito Federal e Municípios no desenvolvimento da internet no Brasil ([art. 24](#art-24)): governança multiparticipativa (com participação do CGI.br); racionalização da gestão da internet; interoperabilidade tecnológica entre serviços de governo eletrônico; adoção preferencial de padrões abertos e livres; publicidade e disseminação de dados públicos; otimização de infraestrutura e estímulo a centros de dados no País; capacitação para o uso da internet; promoção da cultura e da cidadania; e prestação de serviços públicos integrada e multicanal.
- **Aplicações de internet de entes públicos** ([art. 25](#art-25)) devem buscar compatibilidade entre terminais, acessibilidade, tratamento automatizado de informações e fortalecimento da participação social.
- **Educação** ([art. 26](#art-26)): o dever constitucional de educação inclui a capacitação para o uso seguro, consciente e responsável da internet.
- **Fomento à cultura digital** ([art. 27](#art-27)): iniciativas públicas devem promover inclusão digital, reduzir desigualdades regionais de acesso e fomentar a produção de conteúdo nacional.
- **Planejamento** ([art. 28](#art-28)): o Estado deve formular estudos, metas, estratégias e cronogramas sobre o uso e o desenvolvimento da internet.
- **Controle parental** ([art. 29](#art-29)): o usuário tem **livre escolha** de programas de controle de conteúdo impróprio a filhos menores, respeitados os princípios do MCI e do ECA — cabendo ao poder público, junto a provedores e sociedade civil, promover educação e boas práticas de inclusão digital de crianças e adolescentes ([parágrafo único](#art-29-pu)).

## Disposições finais ([arts. 30 a 32](#art-30))

A defesa dos direitos do MCI pode ser exercida em juízo, individual ou coletivamente ([art. 30](#art-30)). Até a entrada em vigor de lei específica ([art. 19, § 2º](#art-19-p2)), a responsabilidade por infração a direitos autorais ou conexos continua disciplinada pela legislação autoral vigente à data do MCI ([art. 31](#art-31)). Vigência: 60 dias após a publicação oficial ([art. 32](#art-32)).

## ANPD e a regulação do Marco Civil da Internet

Os Decretos nºs 12.975/2026 e 12.976/2026 atribuíram à ANPD competências de **regulação, fiscalização e apuração de infrações** relacionadas aos direitos dos usuários e aos deveres dos provedores de aplicações de internet — uma terceira frente de atuação da Agência, somada à proteção de dados pessoais ([LGPD](/notas/lgpd)) e à proteção de crianças e adolescentes no ambiente digital ([ECA Digital](/notas/eca-digital)). O próprio [CGI.br destacou, em nota pública](https://cgi.br/esclarecimento/nota-publica-sobre-os-decretos-nos-12-975-2026-e-12-976-2026-regulamentacao-do-marco-civil-da-internet/), que essa atribuição é **coerente** com as competências já conferidas à ANPD pelo ECA Digital.

A ampliação de mandato acompanha o fortalecimento institucional recente da Agência: pela Lei nº 15.352/2026 (conversão da MPV nº 1.317/2025), a ANPD foi transformada em **agência reguladora**, autarquia de natureza especial com autonomia funcional, técnica, decisória, administrativa e financeira — equiparando-se a entidades como Anatel e Aneel —, e foi criada a Carreira de Regulação e Fiscalização de Proteção de Dados, com 200 cargos de especialista providos por concurso público. Como agência reguladora, a ANPD está submetida à Lei nº 13.848/2019 (transparência, prestação de contas e participação social).

A atuação da ANPD sobre o Marco Civil é declaradamente **sistêmica**: fiscaliza mecanismos, processos e estruturas de governança dos provedores, não conteúdos ou publicações isolados. Cabe também à Agência editar normas complementares sobre formas de notificação, prazos de resposta, procedimentos de contestação, legitimidade para notificar, relatórios de transparência e salvaguardas técnicas contra conteúdo íntimo gerado por IA — por resolução do Conselho Diretor, no rito do [regimento interno](/notas/regimento-interno-anpd).

## Quem pode o quê: a divisão de competências normativas

Entre as três normas comentadas nestas notas, o Marco Civil é a que tem o desenho institucional mais disperso. Não há um regulador único: a fiscalização foi repartida por decreto entre **quatro** órgãos, cada um aplicando a sua própria lei. Não há, tampouco, um capítulo de competências equivalente ao [art. 55-J da LGPD](/notas/lgpd#art-55-j) — o MCI é uma lei principiológica, que remete pontos a decreto e cala sobre quem os fiscaliza. E, diferentemente das outras duas, a mudança mais profunda da última década não veio do Legislativo nem do Executivo, mas do **Supremo Tribunal Federal**.

### Quem pode legislar

Compete **privativamente à União** legislar sobre informática e telecomunicações (CF, art. 22, IV) e, desde a EC nº 115/2022, sobre proteção e tratamento de dados pessoais (CF, art. 22, XXX). Estados e Municípios não editam "marcos civis" próprios — mas não estão fora do jogo: o [art. 24](#art-24) do MCI fixa **diretrizes para a atuação da União, dos Estados, do Distrito Federal e dos Municípios** no desenvolvimento da internet, e o [art. 25](#art-25) alcança as aplicações de internet de todos os entes públicos. É competência de fomento e de organização dos próprios serviços, não de regulação de terceiros.

### O que só a lei pode fazer (reserva legal)

Pela regra do art. 5º, II, da Constituição, ficam reservados à lei:

- os **direitos e garantias dos usuários** (Capítulo II, [arts. 7º](#art-7) e [8º](#art-8)), inclusive a nulidade de pleno direito das cláusulas que os contrariem;
- o **regime de responsabilidade** dos provedores por conteúdo de terceiros ([arts. 18 a 21](#art-18));
- os **tipos de sanção e seu teto** — advertência, multa de até 10% do faturamento do grupo econômico no Brasil, suspensão e proibição ([art. 12](#art-12)).

O MCI ainda contém duas **reservas legais que ele mesmo declarou e que seguem sem cumprimento**, o que é um dado relevante para quem estuda a lei:

- a responsabilidade por infração a **direitos autorais** depende de "lei específica" ([art. 19, § 2º](#art-19-p2)); até que ela venha, aplica-se a legislação autoral vigente em 2014 ([art. 31](#art-31));
- a tese do STF nos Temas 987 e 533 vale expressamente **"enquanto não sobrevier legislação específica"** — o próprio Tribunal reconheceu que a palavra final é do Congresso.

Um episódio ilustra bem o limite: a **Medida Provisória nº 1.068/2021** pretendeu reformar o regime de moderação de conteúdo e foi **devolvida sumariamente** pelo presidente do Senado, sem sequer entrar em pauta (ver "Alterações posteriores ao Marco Civil", abaixo). Reformar esse núcleo exige lei em sentido próprio, discutida nas duas Casas.

### O que só o Judiciário pode fazer

O MCI é generoso em reservas de jurisdição, e por uma razão constitucional direta: o art. 5º, XII, da Constituição só admite a quebra do sigilo das comunicações **por ordem judicial**.

- **Conteúdo de comunicações privadas** e **registros que permitam identificar o usuário** só podem ser disponibilizados mediante ordem judicial ([art. 10, §§ 1º e 2º](#art-10-p1)).
- **Requisição de registros** para formar prova em processo cível ou penal depende de decisão judicial fundamentada, com delimitação de período e demonstração de utilidade ([arts. 22](#art-22) e [23](#art-23)).
- A **exceção** é estreita: autoridades administrativas com competência legal podem requisitar diretamente **dados cadastrais** — qualificação pessoal, filiação e endereço ([art. 10, § 3º](#art-10-p3)). Nada além disso.

O caso do art. 19 é de outra natureza: nos **Temas 987 e 533**, o STF não alterou o texto da lei, mas declarou sua inconstitucionalidade parcial e fixou tese vinculante — competência que nem o Executivo nem qualquer agência possuem, pois só ao Judiciário cabe o controle de constitucionalidade. Ao mesmo tempo, o Tribunal delimitou a própria atuação, condicionando a tese à ausência de lei específica (ver "O novo regime de responsabilização das plataformas", acima).

### O que a própria lei reservou a decreto

Aqui o Marco Civil tem uma peculiaridade: ele **nomeia o dispositivo constitucional** no seu próprio texto. O [art. 9º, § 1º](#art-9-p1) diz que a discriminação ou degradação de tráfego "será regulamentada nos termos das atribuições privativas do Presidente da República previstas no inciso IV do art. 84 da Constituição Federal, **para a fiel execução desta Lei**, ouvidos o Comitê Gestor da Internet e a Agência Nacional de Telecomunicações".

São três informações numa frase só: o instrumento é o **decreto de execução**; ele não pode inovar, apenas executar; e sua edição depende de **oitiva prévia** do CGI.br e da Anatel. O [art. 11, § 4º](#art-11-p4) traz a segunda remessa expressa — "Decreto regulamentará o procedimento para apuração de infrações ao disposto neste artigo" —, e o [§ 3º](#art-11-p3) manda que os provedores prestem informações de conformidade "na forma da regulamentação".

Foi nesse espaço que se editou o [Decreto nº 8.771/2016](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/decreto/d8771.htm), cujo preâmbulo invoca apenas o art. 84, IV — regulamento de execução puro, precedido de consulta pública com mais de 2.500 contribuições.

### Quem fiscaliza: quatro portas, não uma

O MCI não criou agência nem designou autoridade. Quem repartiu a fiscalização foi o Capítulo IV do Decreto nº 8.771/2016, e cada órgão atua **nos termos da sua própria lei**:

- **Anatel** — regulação, fiscalização e apuração de infrações, nos termos da Lei nº 9.472/1997 ([dec. art. 17](#dec8771-art-17)); é dela a fiscalização dos requisitos técnicos da neutralidade de rede, consideradas as diretrizes do CGI.br ([dec. art. 5º, § 2º](#dec8771-art-5-p2));
- **Secretaria Nacional do Consumidor** — nos termos do Código de Defesa do Consumidor ([dec. art. 18](#dec8771-art-18));
- **Sistema Brasileiro de Defesa da Concorrência** — infrações à ordem econômica, nos termos da Lei nº 12.529/2011 ([dec. art. 19](#dec8771-art-19));
- **ANPD** — desde 2026, direitos dos usuários e deveres dos provedores de aplicações ([dec. art. 19-A](#dec8771-art-19-a)).

O decreto ainda determina atuação **colaborativa** entre esses órgãos, consideradas as diretrizes do CGI.br ([dec. art. 20](#dec8771-art-20)), e deixa claro que cada apuração segue os procedimentos internos do órgão competente, podendo iniciar-se de ofício ou por requerimento ([dec. art. 21](#dec8771-art-21)).

O **CGI.br**, criado pelo [Decreto nº 4.829/2003](https://www.planalto.gov.br/ccivil_03/decreto/2003/d4829.htm), é peça central desse arranjo sem ser regulador: é órgão de governança multiparticipativa, cuja oitiva a lei exige ([art. 9º, § 1º](#art-9-p1)) e cujas diretrizes o decreto manda considerar — mas não fiscaliza nem sanciona.

### Um limite que o próprio decreto impôs ao regulador

A norma traz uma autolimitação incomum: **é vedado à autoridade competente notificar provedores para moderar conteúdos criminosos ou ilícitos de forma isolada** ([dec. art. 16-I, parágrafo único](#dec8771-art-16-i-pu)). E, na apuração de responsabilidade, é proibido fundamentar a punição exclusivamente na manutenção ou na remoção de um conteúdo específico ([dec. art. 16-I](#dec8771-art-16-i)).

Ou seja: o desenho normativo impede que a ANPD funcione como instância de moderação caso a caso. É a tradução regulamentar da **atuação sistêmica** que a Agência descreve em seu [FAQ público](https://www.gov.br/anpd/pt-br/assuntos/marco-civil-da-internet) — avaliar mecanismos, processos e governança, não publicações. O decreto também preserva a exigência de **ordem judicial específica** para responsabilizar provedor por conteúdo de terceiro nos crimes contra a honra e nos serviços excluídos ([dec. art. 16-J](#dec8771-art-16-j)), e admite critérios diferenciados conforme porte, grau de interferência, estado da técnica e risco ([dec. art. 16-P](#dec8771-art-16-p)).

## Sanções

Os dois regimes abaixo **coexistem** — não há substituição de um pelo outro. Continuam sendo hipóteses distintas de infração, previstas em normas diferentes e fiscalizadas com fundamentos diferentes: o regime original do [art. 12](#art-12) nunca foi revogado e segue punindo o descumprimento dos deveres de guarda e tratamento de registros e dados ([arts. 10](#art-10) e [11](#art-11)); o novo regime do Decreto nº 12.975/2026 é uma camada adicional, criada para operacionalizar a decisão do STF sobre responsabilização por conteúdo de terceiros ([art. 19-A](#dec8771-art-19-a)) — um problema jurídico diferente, que antes não tinha sanção administrativa prevista em decreto. Uma mesma plataforma pode, em tese, ser enquadrada nos dois regimes ao mesmo tempo, por fatos distintos.

### Regime original — infrações aos [arts. 10](#art-10) e [11](#art-11) ([art. 12](#art-12))

Aplicável a violações dos deveres de guarda e tratamento de registros, dados pessoais e comunicações:

- [advertência](#art-12-i), com prazo para medidas corretivas;
- [multa](#art-12-ii) de até **10% do faturamento do grupo econômico no Brasil** no último exercício, excluídos tributos — considerada a condição econômica do infrator e a proporcionalidade entre gravidade e sanção;
- [suspensão temporária](#art-12-iii) das atividades envolvidas; ou
- [proibição de exercício](#art-12-iv) dessas atividades.

Empresa estrangeira responde solidariamente por meio de filial, sucursal, escritório ou estabelecimento situado no País ([parágrafo único](#art-12-pu); detalhamento completo na seção "Proteção a registros, dados pessoais e comunicações privadas" acima).

### Novo regime — falha sistêmica no dever de cuidado (Decreto nº 12.975/2026)

Aplica-se o **mesmo rol de sanções** do Marco Civil — advertência, multa de até 10% do faturamento do grupo econômico no Brasil, suspensão temporária e proibição de exercício da atividade —, mas a hipótese de incidência é distinta: aqui a sanção pune a **falha sistêmica no dever de cuidado**, não uma infração pontual aos arts. 10/11. A aplicação observa:

- devido processo legal e ampla defesa;
- proporcionalidade entre gravidade e sanção; e
- se a plataforma atuou **diligentemente** para evitar a falha sistêmica.

## Implementação e cronograma da ANPD (Decretos nºs 12.975/2026 e 12.976/2026)

- **Etapa I (maio a agosto/2026)** — orientação, comunicação institucional e escuta social: elaboração de FAQ e materiais informativos (maio-junho); abertura da Tomada de Subsídios exploratória (junho); elaboração de Radar Tecnológico sobre _deepfakes_ (julho); início do monitoramento do cumprimento dos deveres dos provedores, com foco em dever de cuidado, notificação e indisponibilização de conteúdo criminoso, anúncios e impulsionamentos pagos (junho-julho); atualização dos canais de denúncia e das informações institucionais de transparência ativa.
- **Etapa II (novembro-dezembro/2026)** — definição de temas prioritários para a Agenda Regulatória 2027-2028 da ANPD, a partir dos subsídios recebidos e do monitoramento; atualização dos Regulamentos de Fiscalização e de Dosimetria para incorporar as novas competências.
- **Etapa III (a partir de 2027)** — implementação permanente de ações de fiscalização sobre as obrigações dos provedores e monitoramento contínuo de riscos digitais, incluindo _deepfakes_ e novas tecnologias.

## Debate em curso

- **Vácuo legislativo e ativismo institucional**: o arquivamento do PL 2.630/2020 pela Câmara em 2024 deixou a regulação de plataformas sem solução legislativa; o vácuo foi preenchido, em sequência, por uma decisão judicial de repercussão geral (STF, Temas 987/533, 2025) e por decretos executivos que regulamentam lei já existente (Decretos nºs 12.975/2026 e 12.976/2026) — uma trajetória atípica de formação de política pública digital no Brasil, que mistura Judiciário, Executivo e a atuação de uma agência reguladora recém-fortalecida.
- **Disputa entre Executivo e Legislativo sobre os decretos**: no dia seguinte à publicação, parlamentares apresentaram dezenas de **projetos de decreto legislativo** para sustar, no todo ou em parte, os Decretos nºs 12.975/2026 e 12.976/2026 — instrumento previsto no art. 49, V, da Constituição, pelo qual o Congresso susta atos normativos do Executivo que exorbitem do poder regulamentar. A tese central é a de que os decretos criaram deveres e hipóteses de responsabilidade sem previsão em lei. Nenhum deles foi aprovado até aqui, e o argumento perdeu força com o julgamento dos embargos, em que o **STF reconheceu a competência regulamentar do Executivo** sobre a matéria (CF, art. 84, IV e VI). Em sentido contrário, pela manutenção dos textos, manifestou-se a [Coalizão Direitos na Rede](https://direitosnarede.org.br/2026/05/27/nota-publica-sobre-os-decretos-de-regulacao-de-plataformas-digitais/), em nota de 27 de maio de 2026 reproduzida por entidades como a Associação Brasileira de Imprensa.
- **Pendências normativas**: segundo a própria [ANPD](https://www.gov.br/anpd/pt-br/assuntos/marco-civil-da-internet), ainda faltam detalhar critérios específicos para avaliação da atuação sistêmica das plataformas, prazos de adequação e parâmetros de dosimetria — a serem tratados na Agenda Regulatória 2027-2028 e na atualização dos Regulamentos de Fiscalização e de Dosimetria.
- **Tensão estrutural**: o desenho original do [art. 19](#art-19) (ordem judicial prévia) buscava proteger a liberdade de expressão contra remoção arbitrária por provedores; a nova interpretação do STF e sua regulamentação buscam maior responsividade das plataformas diante de danos a direitos fundamentais — o equilíbrio entre os dois valores segue sendo o eixo central da disputa, inclusive quanto ao risco de sobre-remoção (_chilling effect_) por parte de provedores avessos a risco regulatório.

## Normas

### Legislação principal

- [Lei nº 12.965, de 23 de abril de 2014](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm) — estabelece princípios, garantias, direitos e deveres para o uso da internet no Brasil e determina diretrizes para a atuação da União, dos Estados, do Distrito Federal e dos Municípios em relação à matéria ([art. 1º](#art-1)). Publicada no DOU de 24/4/2014; entra em vigor 60 dias após a publicação oficial ([art. 32](#art-32)). Conhecida como "Constituição da Internet", por seu caráter principiológico e por ter sido construída por meio de consulta pública com participação social direta. O anteprojeto foi debatido _on-line_ entre outubro de 2009 e maio de 2010, em duas fases sucessivas na plataforma culturadigital.br, conduzidas pela Secretaria de Assuntos Legislativos do Ministério da Justiça em parceria com a FGV Direito Rio: a primeira, sobre os princípios que deveriam orientar a lei; a segunda, sobre a minuta redigida a partir das contribuições da primeira. Somadas, passaram de duas mil contribuições, a que se acrescentaram, já na tramitação legislativa, audiências públicas e sugestões colhidas pelo portal e-Democracia da Câmara. O mesmo modelo participativo foi replicado na regulamentação por decreto: a consulta pública que resultou no Decreto nº 8.771/2016 recebeu mais de 2.500 contribuições e cerca de 70 mil acessos.
- [Constituição Federal de 1988](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm), especialmente os arts. 5º, IV e IX (liberdade de expressão e manifestação do pensamento, vedado o anonimato), X e XII (privacidade e sigilo das comunicações), XIV (acesso à informação); e 220, _caput_ e §§ 1º e 2º (liberdade de informação e vedação à censura).
- [Decreto nº 4.829, de 3 de setembro de 2003](https://www.planalto.gov.br/ccivil_03/decreto/2003/d4829.htm) — cria o **Comitê Gestor da Internet no Brasil (CGI.br)**, órgão de governança multiparticipativa (governo, setor empresarial, sociedade civil e comunidade acadêmica) expressamente referido pelo Marco Civil como interlocutor da regulamentação da neutralidade de rede ([art. 9º, § 1º](#art-9-p1)) e da atuação do poder público (art. 24, [I](#art-24-i) e [II](#art-24-ii)).

### Alterações posteriores ao Marco Civil

- [Lei nº 13.709, de 14 de agosto de 2018](https://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2018/Lei/L13709.htm) (LGPD) — deu nova redação ao [art. 7º, X](#art-7-x) (a exclusão definitiva de dados pessoais passa a ressalvar também as hipóteses de guarda obrigatória previstas na legislação de proteção de dados) e ao [art. 16, II](#art-16-ii) (a vedação à guarda de dados excessivos passa a admitir exceções previstas na LGPD).
- **Medida Provisória nº 1.068, de 6 de setembro de 2021** — tentativa de reforma ampla do Marco Civil e da Lei de Direitos Autorais (Lei nº 9.610/1998), sob a justificativa de combater a remoção arbitrária de contas e conteúdos por redes sociais. Criaria as definições de **rede social** e **moderação em redes sociais** (art. 5º, IX e X), uma nova Seção II no Capítulo II com direitos específicos de usuários de redes sociais (arts. 8º-A a 8º-D, com rol taxativo de hipóteses de "justa causa" para exclusão de contas e conteúdos — notadamente, sem incluir desinformação e discurso de ódio em geral) e um Capítulo IV-A de sanções administrativas próprias (art. 28-A). [**Devolvida sumariamente**](https://www12.senado.leg.br/noticias/materias/2021/09/14/pacheco-devolve-mp-que-dificultava-retirada-de-conteudo-da-internet) pelo presidente do Senado, Rodrigo Pacheco, em 14/9/2021, por entendimento de inconstitucionalidade formal (matéria vedada a medida provisória) e material (violação a liberdade de expressão, livre iniciativa e livre concorrência); consta como **rejeitada** no texto compilado da lei — não integra o Marco Civil vigente. O episódio é referência recorrente no debate sobre os limites do uso de MP para regular plataformas.
- **STF, Temas 987 e 533 de repercussão geral** ([RE 1.037.396](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5160549&numeroProcesso=1037396&classeProcesso=RE&numeroTema=987) e [RE 1.057.258](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5217273&numeroProcesso=1057258&classeProcesso=RE&numeroTema=533)) — sem alterar o texto legal, fixaram interpretação vinculante e geral sobre o [art. 19](#art-19) do MCI, com efeitos equivalentes aos de uma reforma legislativa enquanto não sobrevier lei específica; ver seção própria acima.

### Regulamentos e atos aplicáveis

- [Decreto nº 8.771, de 11 de maio de 2016](https://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2016/Decreto/D8771.htm) — regulamento original do Marco Civil, editado no último dia de mandato da presidenta Dilma Rousseff antes do afastamento por _impeachment_, após consulta pública com mais de 2.500 contribuições. Trata da **neutralidade de rede** (regulamentando o [art. 9º, § 1º](#art-9-p1): discriminação/degradação de tráfego como medida excepcional, vedada priorização por arranjos comerciais, vedado bloqueio, monitoramento, filtragem ou análise de conteúdo de pacotes), da **proteção a registros e dados pessoais** ([art. 10, § 4º](#art-10-p4)) e da prestação de informações sobre cumprimento da legislação (art. 11, [§§ 3º](#art-11-p3) e [4º](#art-11-p4)). Fiscalização da neutralidade cabe à **Anatel**, ouvido o CGI.br.
- [Decreto nº 12.975, de 20 de maio de 2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12975.htm) (DOU de 21/5/2026) — altera o Decreto nº 8.771/2016 para **operacionalizar a decisão do STF** sobre o [art. 19](#art-19): insere o [art. 19-A](#dec8771-art-19-a), detalhando deveres de cuidado, prevenção, moderação, transparência e mitigação da circulação massiva de conteúdos criminosos, e atribui à **ANPD** competência de regulação, fiscalização e apuração de infrações. _Vacatio legis_ de 60 dias; em vigor desde 20/7/2026. Ver seção própria acima.
- [Decreto nº 12.976, de 20 de maio de 2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12976.htm) (DOU de 21/5/2026) — estabelece diretrizes específicas para a **proteção de mulheres no ambiente digital** e o enfrentamento da violência digital de gênero, com fundamento no Marco Civil. Mesma _vacatio legis_; em vigor desde 20/7/2026. Ver seção própria acima.
- [Nota Técnica nº 5/2026/CGTAD/SRE/ANPD](https://www.gov.br/anpd/pt-br/assuntos/marco-civil-da-internet) — instrui a Tomada de Subsídios da ANPD sobre a implementação dos Decretos nºs 12.975/2026 e 12.976/2026; registra que os dispositivos dos decretos são **autoaplicáveis**.
- [Tomada de Subsídios sobre o Marco Civil da Internet](https://brasilparticipativo.presidencia.gov.br/processes/Tomada-Subsidios-Marco-Civil-da-Internet) (ANPD, via Brasil Participativo) — aberta em 30/6/2026, contribuições até **17/8/2026**, para mapear dúvidas, temas sensíveis e prioridades regulatórias. A tomada de subsídios é o procedimento **simplificado** de coleta de contribuições previsto no [art. 58 do regimento interno da ANPD](/notas/regimento-interno-anpd#art-58), sem as formalidades da [consulta pública](/notas/regimento-interno-anpd#art-62).
- **Cronograma da ANPD para o Marco Civil** (Etapas I a III, 2026-2027) — ver seção "Implementação e cronograma da ANPD" acima.
- [Nota Pública do CGI.br sobre os Decretos nºs 12.975/2026 e 12.976/2026](https://cgi.br/esclarecimento/nota-publica-sobre-os-decretos-nos-12-975-2026-e-12-976-2026-regulamentacao-do-marco-civil-da-internet/) (21/5/2026) — manifestação institucional de apoio às novas regras e à atribuição de competências à ANPD, com ressalva de que o STF ainda apreciaria, a partir de 29/5/2026, os embargos de declaração do Tema 987, o que poderia exigir ajustes nos decretos.

### Estudos técnicos da ANPD

Estudos sem força de norma; a série **Radar Tecnológico** traz ressalva expressa de que não firma posicionamento institucional. Estão na [central de documentos técnicos e orientativos](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos) da Agência.

- [Radar Tecnológico nº 6 — _Deepfakes_](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/rt_deepfakes_anpd.pdf) (2026) — inclui o levantamento sobre _deepfakes_ pornográficos contra meninas e mulheres e o caso Grok, com a [Recomendação Conjunta ANPD/MPF/Senacon](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/recomendacao_conjunta_anpd_mpf_senacon_caso_grok.pdf) e a [Nota Técnica nº 1/2026/FIS/CGF/ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/nota-tecnica-no-1-2026-fis-cgf-anpd.pdf).

### Normas correlatas

- [Lei nº 13.709 - Lei Geral de Proteção de Dados Pessoais (LGPD)](/notas/lgpd) — historicamente entrelaçada ao Marco Civil (a própria LGPD nasceu, em parte, para preencher lacunas de proteção de dados deixadas por ele, e alterou os [arts. 7º, X](#art-7-x), e [16, II](#art-16-ii), do MCI); as duas leis passam a compartilhar a mesma autoridade reguladora, a ANPD.
- [Lei nº 15.211 - Estatuto Digital da Criança e do Adolescente (ECA Digital)](/notas/eca-digital) — utiliza os conceitos de internet, aplicações de internet e terminal do [art. 5º](#art-5) do MCI ([ECA Digital, art. 2º, § 1º](/notas/eca-digital#art-2-p1)) e articula-se com os prazos de guarda de registros dos [arts. 13](#art-13) e [15](#art-15) do MCI ([ECA Digital, art. 27, § 2º](/notas/eca-digital#art-27-p2)); MCI, [art. 29](#art-29), por sua vez, remete ao ECA (Lei nº 8.069/1990) quanto ao controle parental de conteúdo.
- **PL nº 2.630/2020** ("PL das Fake News", para apoiadores; "PL da Censura", para opositores) — instituiria a Lei Brasileira de Liberdade, Responsabilidade e Transparência na Internet, alterando o MCI para impor obrigações de transparência, moderação e combate à desinformação a big techs. Aprovado no Senado em 2020; teve regime de urgência aprovado na Câmara em abril/2023 (238 a 192 votos), em meio a intenso lobby das plataformas; **arquivado pelo presidente da Câmara, Arthur Lira, em 9/4/2024**. O próprio [CGI.br](https://cgi.br/esclarecimento/nota-publica-sobre-os-decretos-nos-12-975-2026-e-12-976-2026-regulamentacao-do-marco-civil-da-internet/) aponta a não aprovação de propostas legislativas de regulação de plataformas como fator que ampliou o debate levado ao STF nos Temas 987 e 533.
- [Lei nº 13.848, de 25 de junho de 2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13848.htm) — regime geral das agências reguladoras federais; aplicável à ANPD desde sua transformação em agência reguladora pela Lei nº 15.352/2026, e citada pela própria Agência como parâmetro de transparência, prestação de contas e participação social em sua atuação sobre o Marco Civil.
- [Lei nº 8.069, de 13 de julho de 1990 (ECA)](https://www.planalto.gov.br/ccivil_03/LEIS/L8069.htm) — referida no [art. 29](#art-29) do MCI (controle parental de conteúdo impróprio) e no rol de hipóteses de "justa causa" para moderação da MPV nº 1.068/2021 (não vigente).
- [Lei nº 9.610, de 19 de fevereiro de 1998](https://www.planalto.gov.br/ccivil_03/LEIS/L9610.htm) (Lei de Direitos Autorais) — o MCI ressalva expressamente que a responsabilidade por infrações a direitos autorais depende de legislação específica ([art. 19, § 2º](#art-19-p2)) e, até lei própria, permanece disciplinada pela legislação autoral vigente à data do MCI ([art. 31](#art-31)).
