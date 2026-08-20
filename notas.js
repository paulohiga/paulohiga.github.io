/* Comportamento da seção de notas (/notas). Tudo aqui é melhoria progressiva:
   sem JavaScript a página continua completa — os dois painéis aparecem
   empilhados e os links de referência funcionam como âncoras normais do
   navegador. Este arquivo é independente do script.js do restante do site. */
(function () {
    'use strict';

    /* --- Tema (mesma chave usada no restante do site) --- */
    var botaoTema = document.getElementById('theme-toggle');
    if (botaoTema) {
        botaoTema.addEventListener('click', function () {
            var escuro = document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme', !escuro);
            localStorage.setItem('theme', escuro ? 'dark' : 'light');
        });
    }

    /* --- Links externos: sempre em nova aba, com aviso discreto (ícone e
       texto para leitor de tela). Aplica-se a qualquer link http(s) para fora
       do próprio domínio, em qualquer página das notas — inclusive a lista em
       /notas. Sem JavaScript o link abre normalmente na mesma aba. */
    function marcarLinksExternos(escopo) {
        var host = location.hostname;
        var links = (escopo || document).querySelectorAll('a[href^="http://"], a[href^="https://"]');
        Array.prototype.forEach.call(links, function (link) {
            if (link.hostname === host || link.dataset.externoMarcado) return;
            link.dataset.externoMarcado = '1';
            link.target = '_blank';
            link.rel = link.rel ? link.rel + ' noopener' : 'noopener';
            link.classList.add('link-externo');
            var aviso = document.createElement('span');
            aviso.className = 'visualmente-oculto';
            aviso.textContent = ' (abre em nova aba)';
            link.appendChild(aviso);
        });
    }
    marcarLinksExternos();

    /* --- Comparação sem acento e sem caixa. Quem filtra por "definicoes"
       espera achar "Definições", e o teclado do celular não põe acento
       sozinho. Fica aqui em cima porque serve às três listas filtráveis da
       seção: os dois sumários das notas e a página de definições. --- */
    function normalizar(texto) {
        return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /* --- Página /notas/definicoes ---
       A lista nasce em ordem alfabética (é a ordem do DOM, e a que sobra sem
       JavaScript). Aqui ela ganha as duas coisas que dependem de script: a
       troca para a organização por tema e o filtro.

       "Por tema" **move** os verbetes para as seções vazias que o layout já
       deixou prontas, em vez de reordená-los com `order` no CSS: quem usa
       leitor de tela lê o DOM, e uma lista reordenada só visualmente seria
       lida em ordem alfabética com títulos de tema espalhados no meio. Voltar
       para A–Z devolve cada verbete à seção da letra dele — e como os verbetes
       são percorridos sempre na ordem original, a alfabética se reconstrói
       sozinha, dentro do tema e fora dele. --- */
    var listaDefinicoes = document.getElementById('lista-definicoes');
    if (listaDefinicoes) {
        var barraDefinicoes = document.querySelector('.definicoes__barra');
        var letrasDefinicoes = document.querySelector('.definicoes__letras');
        var temasDefinicoes = document.querySelector('.definicoes__temas');
        var vazioDefinicoes = listaDefinicoes.querySelector('.definicoes__vazio');
        var campoDefinicoes = document.getElementById('definicoes-filtro');
        var botoesOrganizar = Array.prototype.slice.call(
            document.querySelectorAll('.definicoes__organizar button'));
        // Ordem original = ordem alfabética. É a referência das duas
        // montagens, e por isso é lida uma vez só, antes de qualquer mexida.
        var verbetes = Array.prototype.slice.call(listaDefinicoes.querySelectorAll('.verbete'));
        var gruposPorLetra = Array.prototype.slice.call(
            listaDefinicoes.querySelectorAll('.definicoes__grupo:not(.definicoes__grupo--tema)'));
        var gruposPorTema = Array.prototype.slice.call(
            listaDefinicoes.querySelectorAll('.definicoes__grupo--tema'));
        var organizacao = 'alfabetica';

        /* A barra fica presa no topo, e é ela que o salto por âncora precisa
           descontar. A altura muda com a largura da janela (a linha de letras
           quebra) e com a chegada da fonte, então é medida, não escrita no
           CSS. */
        function medirBarra() {
            if (!barraDefinicoes) return;
            document.documentElement.style.setProperty(
                '--definicoes-barra', barraDefinicoes.offsetHeight + 'px');
        }
        medirBarra();
        window.addEventListener('resize', medirBarra);

        function grupoDe(verbete) {
            var chave = organizacao === 'tema' ? 'tema' : 'inicial';
            var grupos = organizacao === 'tema' ? gruposPorTema : gruposPorLetra;
            for (var i = 0; i < grupos.length; i++) {
                if (grupos[i].dataset[chave] === verbete.dataset[chave]) return grupos[i];
            }
            return null;
        }

        function organizar(modo) {
            organizacao = modo === 'tema' ? 'tema' : 'alfabetica';
            verbetes.forEach(function (verbete) {
                var grupo = grupoDe(verbete);
                if (grupo) grupo.querySelector('.definicoes__itens').appendChild(verbete);
            });
            gruposPorLetra.forEach(function (grupo) { grupo.hidden = organizacao === 'tema'; });
            gruposPorTema.forEach(function (grupo) { grupo.hidden = organizacao !== 'tema'; });
            // Cada índice aponta para as seções da sua organização: fora dela,
            // apontaria para o nada. Trocam de lugar junto com a lista.
            if (letrasDefinicoes) letrasDefinicoes.hidden = organizacao === 'tema';
            if (temasDefinicoes) temasDefinicoes.hidden = organizacao !== 'tema';
            botoesOrganizar.forEach(function (botao) {
                botao.setAttribute('aria-pressed', String(botao.dataset.organizacao === organizacao));
            });
            filtrar(campoDefinicoes ? campoDefinicoes.value : '');
            medirBarra();
        }

        /* Casa por *começo de palavra*, e não por trecho solto: "idade" tem de
           achar "aferição de idade" sem arrastar "disponibilidade",
           "confidencialidade" e "autenticidade" junto. Cada palavra digitada
           precisa começar alguma palavra do verbete, o que também faz "dado ue"
           funcionar como filtro de duas condições. */
        function cabeNoFiltro(verbete, palavras) {
            var alvo = ' ' + verbete.dataset.busca;
            for (var i = 0; i < palavras.length; i++) {
                if (alvo.indexOf(' ' + palavras[i]) === -1) return false;
            }
            return true;
        }

        function filtrar(termo) {
            var palavras = normalizar(termo).trim().split(/\s+/).filter(Boolean);
            var achou = 0;
            verbetes.forEach(function (verbete) {
                var cabe = !palavras.length || cabeNoFiltro(verbete, palavras);
                verbete.hidden = !cabe;
                if (cabe) achou++;
            });
            // Título de grupo sem nada embaixo é ruído: some junto.
            var grupos = organizacao === 'tema' ? gruposPorTema : gruposPorLetra;
            grupos.forEach(function (grupo) {
                grupo.hidden = !grupo.querySelector('.verbete:not([hidden])');
            });
            if (vazioDefinicoes) vazioDefinicoes.hidden = achou > 0;
        }

        botoesOrganizar.forEach(function (botao) {
            botao.addEventListener('click', function () {
                organizar(botao.dataset.organizacao);
            });
        });

        if (campoDefinicoes) {
            campoDefinicoes.addEventListener('input', function () {
                filtrar(campoDefinicoes.value);
            });
            campoDefinicoes.addEventListener('keydown', function (evento) {
                if (evento.key !== 'Escape' || !campoDefinicoes.value) return;
                // Esc com texto escrito limpa o filtro e para por aí — não é
                // gesto de sair do campo (ver o Esc global das notas).
                evento.preventDefault();
                campoDefinicoes.value = '';
                filtrar('');
            });
        }
    }

    /* --- Menu do título: alternar para outra nota sem passar pela página
       principal. A lista de links já vem pronta (e visível) no HTML — funciona
       como navegação normal sem JavaScript. Com JavaScript, vira um menu
       recolhível preso ao título. */
    var botaoTitulo = document.getElementById('nota-titulo-btn');
    var menuTitulo = document.getElementById('nota-titulo-menu');
    /* Preenchido quando o menu existe. As funções abaixo são locais ao bloco
       (`'use strict'` faz de `function` dentro de `if` uma declaração de
       bloco), e é por este objeto que o atalho de teclado e o Esc global, lá
       no fim do arquivo, chegam até elas. */
    var menuDeNotas = null;
    if (botaoTitulo && menuTitulo) {
        menuTitulo.hidden = true;
        var itensDoMenu = Array.prototype.slice.call(menuTitulo.querySelectorAll('a'));

        function fecharMenuTitulo(devolverFoco) {
            menuTitulo.hidden = true;
            botaoTitulo.setAttribute('aria-expanded', 'false');
            if (devolverFoco) botaoTitulo.focus();
        }

        function abrirMenuTitulo(comFoco) {
            menuTitulo.hidden = false;
            botaoTitulo.setAttribute('aria-expanded', 'true');
            if (comFoco) focarItemDoMenu(0);
        }

        /* Índice negativo dá a volta pelo fim (-1 é o último item), e é assim
           que a seta para cima no botão abre o menu já no fim da lista. */
        function focarItemDoMenu(indice) {
            if (!itensDoMenu.length) return;
            itensDoMenu[(indice + itensDoMenu.length) % itensDoMenu.length].focus();
        }

        botaoTitulo.setAttribute('aria-expanded', 'false');
        botaoTitulo.addEventListener('click', function () {
            /* Clique não leva o foco para dentro: quem aponta continua
               apontando, e quem usa teclado entra na lista pelas setas (ou já
               entrou, se abriu o menu por elas ou pelo atalho). */
            if (menuTitulo.hidden) abrirMenuTitulo(false); else fecharMenuTitulo(false);
        });
        botaoTitulo.addEventListener('keydown', function (evento) {
            if (evento.key !== 'ArrowDown' && evento.key !== 'ArrowUp') return;
            evento.preventDefault();
            if (menuTitulo.hidden) abrirMenuTitulo(false);
            focarItemDoMenu(evento.key === 'ArrowDown' ? 0 : -1);
        });
        menuTitulo.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape') {
                // O Esc global não repete o serviço de quem estava mais perto
                // do foco: um Esc desfaz uma camada só (ver `aoTeclar`).
                evento.preventDefault();
                fecharMenuTitulo(true);
                return;
            }
            var atual = itensDoMenu.indexOf(document.activeElement);
            if (evento.key === 'ArrowDown') focarItemDoMenu(atual + 1);
            else if (evento.key === 'ArrowUp') focarItemDoMenu(atual - 1);
            else if (evento.key === 'Home') focarItemDoMenu(0);
            else if (evento.key === 'End') focarItemDoMenu(-1);
            else return;
            evento.preventDefault();
        });
        document.addEventListener('click', function (evento) {
            if (!menuTitulo.hidden && !menuTitulo.contains(evento.target) && evento.target !== botaoTitulo && !botaoTitulo.contains(evento.target)) {
                fecharMenuTitulo(false);
            }
        });

        menuDeNotas = {
            aberto: function () { return !menuTitulo.hidden; },
            abrir: abrirMenuTitulo,
            fechar: fecharMenuTitulo
        };
    }

    /* A faixa "voltar para ‹nota de origem›" (.nota-origem) não é montada
       aqui: ela precisa estar decidida antes do primeiro paint, senão aparece
       depois e empurra os painéis para baixo. Fica num script inline em
       _layouts/nota.html, junto do tema e da divisão dos painéis, pelo mesmo
       motivo que eles. O que este arquivo faz com ela é só medir a altura,
       quando está presa no topo (ver alturaDosElementosFixos). */

    var comentarios = document.getElementById('comentarios');
    var lei = document.getElementById('lei');
    if (!comentarios || !lei) return;

    var corpoDosComentarios = comentarios.querySelector('.painel__corpo');
    var corpoDaLei = lei.querySelector('.painel__corpo');
    var duasColunas = matchMedia('(min-width: 900px)');
    var semMovimento = matchMedia('(prefers-reduced-motion: reduce)');
    var destacado = null;

    /* Com os painéis lado a lado, quem rola é cada painel (.painel__corpo),
       nunca a página — é o que garante que o cabeçalho fique sempre visível.
       Mas o próprio navegador, ao abrir um link com âncora (ex.:
       /notas/mci#art-5), rola a página inteira até o dispositivo antes do
       nosso script rodar, ignorando o `overflow: hidden` do body (que só
       impede a rolagem por gesto do usuário, não a programática/nativa).
       Sem isso, o cabeçalho some atrás do topo da janela nesse acesso
       direto. Zera essa rolagem sempre que ela aparecer nesse layout. */
    function travarRolagemDaPagina() {
        if (duasColunas.matches && (window.scrollX !== 0 || window.scrollY !== 0)) {
            window.scrollTo(0, 0);
        }
    }
    travarRolagemDaPagina();
    window.addEventListener('scroll', travarRolagemDaPagina, { passive: true });

    /* --- Rolagem até um ponto: a do navegador ---
       Serve tanto os links âncora quanto a busca "ir para o dispositivo", e vale
       para os dois contêineres que rolam nesta página: o corpo de um painel (em
       duas colunas) e a janela (em uma).

       Aqui houve uma animação própria, em `requestAnimationFrame`, escrita só
       para durar 300ms em vez dos ~500 do navegador — o `behavior: 'smooth'`
       não deixa escolher a duração. Não pagou o que custou: eram trinta linhas
       de animação para ganhar dois décimos de segundo, e uma segunda
       implementação de rolagem para manter em pé ao lado da nativa.

       Enquanto o salto corre, o sumário para de acompanhar a leitura (ver
       `marcarSumarioAtivo`): o destino já está decidido pelo clique, e seguir as
       seções do caminho até ele eram onze paradas da lista num salto só,
       piscando capítulos que o leitor não pediu. Calado, o sumário se posiciona
       uma vez, no fim. O fim é medido por um prazo, e não pelo evento
       `scrollend`, que ainda não está em todo navegador: 900ms cobre com folga a
       rolagem suave nativa mais longa, e a lista assentar um instante depois não
       custa nada — o texto já chegou. */
    var saltoEmCurso = false;
    var fimDoSalto = null;

    function rolarAte(caixa, destino) {
        saltoEmCurso = true;
        clearTimeout(fimDoSalto);
        fimDoSalto = setTimeout(function () {
            saltoEmCurso = false;
            atualizarProgressos();
        }, 900);
        caixa.scrollTo({
            top: destino,
            // O navegador honra `prefers-reduced-motion` na rolagem suave
            // declarada em CSS, mas não neste `behavior`: quem pediu menos
            // movimento continua tendo de ser atendido à mão.
            behavior: semMovimento.matches ? 'auto' : 'smooth'
        });
    }

    /* --- Painel redimensionável ---
       A divisão entre comentários e lei seca é ajustável (só faz sentido lado
       a lado, em telas largas) e a proporção escolhida persiste durante a
       sessão (sessionStorage), valendo para as outras notas abertas na mesma
       aba/sessão. O valor já é aplicado antes do primeiro paint (script
       inline no layout) para não haver salto visual. */
    var CHAVE_SPLIT = 'notas-split';
    var divisao = document.querySelector('.nota-divisao');
    var resizer = document.querySelector('.nota-resizer');

    function aplicarSplit(percentual) {
        var limitado = Math.min(80, Math.max(20, percentual));
        var valor = limitado.toFixed(2) + '%';
        document.documentElement.style.setProperty('--nota-split', valor);
        if (resizer) resizer.setAttribute('aria-valuenow', String(Math.round(limitado)));
        return valor;
    }

    if (resizer && divisao) {
        var salvo = sessionStorage.getItem(CHAVE_SPLIT);
        if (salvo) aplicarSplit(parseFloat(salvo));

        var arrastando = false;

        function mover(clienteX) {
            var rect = divisao.getBoundingClientRect();
            var percentual = ((clienteX - rect.left) / rect.width) * 100;
            var valor = aplicarSplit(percentual);
            sessionStorage.setItem(CHAVE_SPLIT, valor);
        }

        resizer.addEventListener('pointerdown', function (evento) {
            if (!duasColunas.matches) return;
            arrastando = true;
            resizer.setPointerCapture(evento.pointerId);
        });
        resizer.addEventListener('pointermove', function (evento) {
            if (!arrastando) return;
            mover(evento.clientX);
        });
        ['pointerup', 'pointercancel'].forEach(function (nomeEvento) {
            resizer.addEventListener(nomeEvento, function () { arrastando = false; });
        });
        resizer.addEventListener('keydown', function (evento) {
            var atual = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nota-split')) || 50;
            var passo = 4;
            if (evento.key === 'ArrowLeft') { sessionStorage.setItem(CHAVE_SPLIT, aplicarSplit(atual - passo)); }
            else if (evento.key === 'ArrowRight') { sessionStorage.setItem(CHAVE_SPLIT, aplicarSplit(atual + passo)); }
            else if (evento.key === 'Home') { sessionStorage.setItem(CHAVE_SPLIT, aplicarSplit(20)); }
            else if (evento.key === 'End') { sessionStorage.setItem(CHAVE_SPLIT, aplicarSplit(80)); }
            else { return; }
            evento.preventDefault();
        });
    }

    /* --- Abas, quando os painéis não cabem lado a lado --- */
    var abas = Array.prototype.slice.call(document.querySelectorAll('[data-painel]'));
    var scrollPositions = {};

    function painelAtivo() {
        return document.body.getAttribute('data-painel-ativo') || 'comentarios';
    }

    /* Em uma coluna quem rola é a página, e trocar de painel troca o que está
       na tela inteira: sem guardar onde o leitor estava no painel que sai, ele
       volta para o topo ao retornar. Vale para toda saída de painel, não só a
       feita pela aba — seguir uma referência do comentário também tira o
       leitor do painel de comentários (ver `irParaElemento`). */
    function guardarPosicaoDoPainel(nomeDoDestino) {
        var atual = painelAtivo();
        if (duasColunas.matches || atual === nomeDoDestino) return;
        scrollPositions[atual] = window.scrollY;
    }

    function mostrarPainel(nome) {
        document.body.setAttribute('data-painel-ativo', nome);
        abas.forEach(function (aba) {
            aba.setAttribute('aria-pressed', String(aba.dataset.painel === nome));
        });
    }

    /* Trocar de painel guardando onde o leitor estava no que sai e devolvendo
       onde ele parou no que entra. É o que a aba faz, e também o que um atalho
       de teclado da lei seca precisa fazer antes de falar com um campo que
       está na aba inativa (ver `revelarPainelDaLei`). */
    function trocarPainel(nome) {
        guardarPosicaoDoPainel(nome);
        mostrarPainel(nome);
        if (!duasColunas.matches) {
            window.scrollTo({ top: scrollPositions[nome] || 0, behavior: 'auto' });
        }
    }

    abas.forEach(function (aba) {
        aba.addEventListener('click', function () {
            trocarPainel(aba.dataset.painel);
        });
    });

    /* --- Seletor de normas, quando a nota exibe mais de uma (ex.: a lei e um
       decreto que a regulamenta). Um <select> nativo, não uma aba por norma:
       não degrada com o número de normas (ver nota-style.css). A norma
       principal já vem pronta no HTML; as demais só são buscadas (fetch) na
       primeira vez em que o leitor as seleciona — o <select> em si funciona
       sem JavaScript, mas escolher uma norma diferente não tem efeito sem
       ele. Ver "Múltiplas normas por nota" em docs/notas.md. */
    var fonteLink = document.getElementById('lei-fonte');
    var seletorNorma = document.getElementById('lei-norma-select');
    var normas = seletorNorma
        ? Array.prototype.slice.call(seletorNorma.options).map(function (opcao) {
            return {
                opcao: opcao,
                doc: document.getElementById(opcao.value),
                fonte: opcao.dataset.normaFonte,
                fragmento: opcao.dataset.normaFragmento || null,
                prefixo: opcao.dataset.normaPrefixo || ''
            };
        })
        : [];

    // Norma exibida no momento no painel da lei seca — a busca "ir para o
    // dispositivo" precisa levar em conta o prefixo dela (ver mais abaixo),
    // senão o campo sempre resolve o id contra a norma principal, mesmo com
    // outra norma selecionada.
    var normaAtiva = normas.length ? normas[0] : null;

    /* Ir e voltar entre a lei e o decreto que a regulamenta é justamente o
       motivo de uma nota exibir mais de uma norma — e o Marco Civil tem três
       decretos. Guardar onde o leitor parou em cada uma faz a volta devolvê-lo
       ao mesmo ponto, em vez de ao topo de um texto que ele já tinha rolado.
       A posição vale enquanto a aba estiver aberta; norma nunca visitada
       começa no topo, como antes. */
    function ativarNorma(normaAlvo) {
        /* Trocar uma norma pela que já está exposta não é troca nenhuma, e
           tratá-la como troca destruía a leitura: a linha que devolve a posição
           guardada (logo abaixo) lia `normaAlvo.scrollTop`, que só é gravado ao
           *sair* de uma norma — na própria, ele nunca foi gravado, e o painel
           voltava ao topo. Como toda remissão do comentário passa por aqui (o
           `normaDoId` resolve `#art-6` para a norma principal), o efeito era
           todo salto começar do artigo 1º e rolar dali até o destino. */
        if (normaAtiva === normaAlvo) return;
        if (normaAtiva) normaAtiva.scrollTop = corpoDaLei.scrollTop;
        normas.forEach(function (norma) {
            norma.doc.hidden = norma !== normaAlvo;
        });
        if (fonteLink) fonteLink.href = normaAlvo.fonte;
        if (seletorNorma.value !== normaAlvo.opcao.value) seletorNorma.value = normaAlvo.opcao.value;
        corpoDaLei.scrollTop = normaAlvo.scrollTop || 0;
        normaAtiva = normaAlvo;
        reconstruirSumarioLei();
    }

    function carregarNorma(norma, pronto) {
        if (!norma.fragmento) { pronto(); return; }
        fetch(norma.fragmento).then(function (resposta) {
            if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
            return resposta.text();
        }).then(function (html) {
            norma.doc.innerHTML = html;
            norma.fragmento = null;
            marcarLinksExternos(norma.doc);
            reconstruirSumarioLei();
            pronto();
        }).catch(function () {
            norma.doc.innerHTML = '<p>Não foi possível carregar este texto agora. ' +
                '<a href="' + norma.fonte + '" target="_blank" rel="noopener">Consulte a fonte oficial</a>.</p>';
            marcarLinksExternos(norma.doc);
            pronto();
        });
    }

    if (seletorNorma) {
        seletorNorma.addEventListener('change', function () {
            var normaAlvo = normas[seletorNorma.selectedIndex];
            ativarNorma(normaAlvo);
            carregarNorma(normaAlvo, function () {});
            /* A norma escolhida entra na URL: sem isso, "a nota do Marco Civil
               mostrando o Decreto nº 8.771" não é um endereço — não dá para
               compartilhar nem para sobreviver a um F5. Marca-se pelo prefixo
               dos ids da norma (`#dec8771`), o mesmo espaço de nomes das
               âncoras de dispositivo (`#dec8771-art-5`), que já reativam a
               norma certa ao abrir. A norma principal é o padrão e não leva
               marca. Só `replaceState`: fazer a troca de norma virar entrada
               no histórico é parte de rever a navegação do botão Voltar, que
               hoje ainda não existe em salto nenhum. */
            history.replaceState(null, '',
                normaAlvo.prefixo ? '#' + normaAlvo.prefixo : location.pathname + location.search);
        });
    }

    // Dado um id de âncora, encontra a norma a que ele pertence pelo prefixo
    // do id. Sem prefixo correspondente, mas ainda assim um "art-...", é a
    // norma principal — que também precisa ser reativada explicitamente
    // quando o leitor está vendo outra norma no momento (ex.: voltar da
    // "lei seca" do decreto para a da lei ao seguir uma referência cruzada).
    function normaDoId(id) {
        var extra = normas.filter(function (norma) {
            return norma.prefixo && id.indexOf(norma.prefixo + '-') === 0;
        })[0];
        if (extra) return extra;
        if (id.indexOf('art-') === 0) {
            return normas.filter(function (norma) { return !norma.prefixo; })[0];
        }
        return undefined;
    }

    // O prefixo sozinho (`#dec8771`) é a norma inteira, sem dispositivo: é o
    // que o seletor grava na URL ao trocar de norma.
    function normaDoPrefixo(id) {
        return normas.filter(function (norma) { return norma.prefixo && norma.prefixo === id; })[0];
    }

    /* --- Ir até um dispositivo/título, em qualquer um dos dois painéis ---
       Em uma coluna quem rola é a página, e o que está preso no topo cobre o
       começo dela: o cabeçalho, a faixa de origem (quando existe), a barra de
       abas e o topo do painel. É essa soma que o salto por âncora e a linha de
       leitura do sumário descontam. Nem todos estão presos sempre — o
       cabeçalho e a faixa só no mobile —, e quem diz isso é o estilo
       calculado, para o ponto de corte de 900px não precisar ser repetido
       aqui. */
    var PRESOS_NO_TOPO = ['.nota-topo', '.nota-origem', '.nota-abas'];

    /* Onde o salto por âncora deixa o alvo, contado do topo útil do painel, e a
       linha de leitura que o sumário usa para decidir em que trecho o leitor
       está. Os dois números andam juntos, e é por isso que são um só mais uma
       folga: com a linha *acima* do ponto de parada, o item recém-saltado
       nascia abaixo dela e o sumário continuava marcando o trecho anterior até
       o leitor rolar mais um pouco — o destaque só chegava depois. A folga
       absorve o arredondamento de subpixel com que a rolagem suave termina. */
    var PARADA_DA_ANCORA = 12;
    var LINHA_DE_LEITURA = PARADA_DA_ANCORA + 8;

    function alturaDosElementosFixos(painelEl) {
        var altura = 0;
        PRESOS_NO_TOPO.forEach(function (seletor) {
            var el = document.querySelector(seletor);
            if (!el) return;
            var estilo = getComputedStyle(el);
            if (estilo.position !== 'sticky' || estilo.display === 'none') return;
            altura += el.offsetHeight;
        });
        var topoDoPainel = painelEl.querySelector('.painel__topo');
        if (topoDoPainel) altura += topoDoPainel.offsetHeight;
        return altura;
    }

    function destacar(alvo) {
        if (destacado) destacado.classList.remove('nota-destacado');
        alvo.classList.add('nota-destacado');
        destacado = alvo;
    }

    function irParaElemento(painelEl, corpoEl, nomePainel, alvo) {
        if (!alvo || !painelEl.contains(alvo)) return false;

        /* Seguir uma referência do comentário até o dispositivo é justamente o
           que a tela dividida existe para fazer: se o modo leitura escondeu o
           painel de destino, o salto seria para um painel com `display: none`.
           Volta-se à divisão, e o leitor vê os dois lados da remissão. */
        if (leituraAtiva() && leituraAtiva() !== nomePainel) aplicarLeitura('');

        /* O sumário aponta o destino agora, no clique, e não quando a rolagem
           chegar lá: o trecho já está decidido, e esperar a geometria era o que
           deixava um item clicado no sumário sem destaque até o leitor rolar
           mais um pouco. */
        fixarNoSumario(nomePainel, alvo);

        if (duasColunas.matches) {
            // O painel é o container de rolagem: posicionar o dispositivo no
            // topo dele, sem mexer na rolagem da página.
            var deslocamento = alvo.getBoundingClientRect().top -
                corpoEl.getBoundingClientRect().top + corpoEl.scrollTop - PARADA_DA_ANCORA;
            rolarAte(corpoEl, deslocamento);
        } else {
            // Em uma coluna quem rola é a página, e as abas e o topo do painel
            // ficam fixos: o dispositivo precisa parar abaixo deles.
            guardarPosicaoDoPainel(nomePainel);
            mostrarPainel(nomePainel);
            var fixos = alturaDosElementosFixos(painelEl);
            rolarAte(window, alvo.getBoundingClientRect().top + window.scrollY - fixos - PARADA_DA_ANCORA);
        }

        destacar(alvo);
        // Leva o foco junto com a rolagem, para quem navega por teclado ou
        // leitor de tela chegar ao dispositivo, e não continuar no comentário.
        alvo.setAttribute('tabindex', '-1');
        alvo.focus({ preventScroll: true });
        atualizarProgressos();
        return true;
    }

    function irPara(id) {
        var alvo = id ? document.getElementById(id) : null;
        return irParaElemento(lei, corpoDaLei, 'lei', alvo);
    }

    function irParaComentario(id) {
        var alvo = id ? document.getElementById(id) : null;
        return irParaElemento(comentarios, corpoDosComentarios, 'comentarios', alvo);
    }

    comentarios.addEventListener('click', function (evento) {
        var link = evento.target.closest('a[href^="#"]');
        if (!link) return;
        var id = decodeURIComponent(link.getAttribute('href').slice(1));
        var normaAlvo = normaDoId(id);

        if (normaAlvo) {
            evento.preventDefault();
            ativarNorma(normaAlvo);
            carregarNorma(normaAlvo, function () {
                if (irPara(id)) history.replaceState(null, '', '#' + id);
            });
            return;
        }

        if (id.indexOf('art-') !== 0) return;
        if (irPara(id)) {
            evento.preventDefault();
            history.replaceState(null, '', '#' + id);
        }
    });

    /* --- Busca "ir para o dispositivo" ---
       Aceita as formas usadas nas citações: "5", "5º", "art. 5º, V", "55-A".
       O parágrafo usa a mesma notação compacta dos ids ("p2", "pu"), em vez
       do símbolo §, difícil de digitar num teclado comum — também aceita
       "único"/"unico" por extenso. Ex.: "art. 3º, p2" ou "3º, p2, I". */
    function idDoTermo(termo) {
        var texto = termo.toLowerCase().replace(/^art\.?\s*/, '').trim();
        var partes = texto.match(
            /^(\d+)(?:\s*-\s*([a-z]))?\s*[º°.]?(?:[,\s]+(?:p\.?\s*([0-9]+)|(único|unico|pu))[º°.]?)?(?:[,\s]+([ivxlc]+(?:-[a-z])?))?(?:[,\s]+([a-z])\)?)?$/
        );
        if (!partes) return null;
        var id = 'art-' + partes[1] + (partes[2] ? '-' + partes[2] : '');
        if (partes[3]) id += '-p' + partes[3];
        else if (partes[4]) id += '-pu';
        if (partes[5]) id += '-' + partes[5];
        if (partes[6]) id += '-' + partes[6];
        return id;
    }

    var busca = document.querySelector('.lei-ir');
    if (busca) {
        var campo = busca.querySelector('input');
        busca.addEventListener('submit', function (evento) {
            evento.preventDefault();
            var id = idDoTermo(campo.value);
            // O id do termo digitado nunca leva prefixo — é sempre resolvido
            // contra a norma exibida no momento no painel da lei seca.
            if (id && normaAtiva && normaAtiva.prefixo) id = normaAtiva.prefixo + '-' + id;
            var encontrou = irPara(id);
            campo.setAttribute('aria-invalid', String(!encontrou));
        });
        campo.addEventListener('input', function () {
            campo.removeAttribute('aria-invalid');
        });
    }

    /* --- Sumários retráteis (table of contents), um por painel ---
       Ocultos por padrão; abrem por um botão fixo na borda da tela (esquerda
       para os comentários, direita para a lei seca). O da lei seca é
       reconstruído sempre que a norma exibida muda (troca no seletor, ou
       chegada de uma norma extra buscada por fetch). Cada um tem um campo de
       filtro e marca a seção em que o leitor está. */

    /* Rótulo de um artigo no sumário: o marcador ("Art. 6º", "Artigo 6.º") e uma
       frase que diz do que ele trata.

       Essa frase é a ementa editorial da norma, escrita em `_data/ementas/` e
       entregue no `data-ementa` que o lei-anotada.html põe no artigo. Ela é
       curta e começa pelo núcleo do dispositivo ("Fundamentos do uso de
       tecnologia por crianças"), que é o que faz uma lista de 80
       artigos ser varrida com o olho — o começo do caput, que era o que
       aparecia aqui antes, gasta as primeiras palavras em fórmula de redação
       ("A utilização de produtos ou serviços de tecnologia da informação por
       crianças e adolescentes tem como fundamentos:").

       Sem ementa cadastrada vale o começo do próprio texto, como antes: numa
       norma europeia isso é a epígrafe oficial ("Artigo 5.º — Princípios
       relativos ao tratamento de dados pessoais"), numa brasileira é a abertura
       do caput. O corte é feito aqui, e não só no CSS, porque o filtro compara
       com o que está escrito no item: o que não aparece não deve casar com a
       busca. */
    var LIMITE_DO_RESUMO = 90;

    function partesDoArtigo(paragrafo) {
        var texto = paragrafo.textContent.replace(/\s+/g, ' ').trim();
        var corte = texto.indexOf(' ', texto.indexOf(' ') + 1);
        var marcador = corte === -1 ? texto : texto.slice(0, corte);
        var resumo = paragrafo.dataset.ementa || (corte === -1 ? '' : texto.slice(corte + 1));
        // "Art. 64." vira "Art. 64"; "Artigo 64.º" e "Art. 6º" ficam como estão.
        marcador = marcador.replace(/\.$/, '');
        if (resumo.length > LIMITE_DO_RESUMO) {
            resumo = resumo.slice(0, LIMITE_DO_RESUMO);
            var ultimoEspaco = resumo.lastIndexOf(' ');
            resumo = (ultimoEspaco > 0 ? resumo.slice(0, ultimoEspaco) : resumo) + '…';
        }
        return { marcador: marcador, resumo: resumo };
    }

    /* Na gaveta, os artigos entram recolhidos sob o título a que pertencem:
       abertos de saída eles afogariam os capítulos, que são o primeiro nível
       de orientação, e são 80 dispositivos de artigo na LGPD e 119 no AI Act.
       No modo leitura o sumário é uma coluna de altura inteira, e a conta se
       inverte — ali cabe a lista aberta, e é ela que faz o mapa da norma valer
       a coluna que ocupa. `<details>` já traz o teclado, o estado
       aberto/fechado e o anúncio para leitor de tela: nada disso precisa ser
       reescrito em ARIA. */
    function criarGrupoDeArtigos(itemDoTitulo, lista, aberto) {
        var dono = itemDoTitulo;
        if (!dono) {
            // Norma sem capítulo nenhum (é o caso dos decretos): os artigos
            // ficam no primeiro nível, que sem eles seria um sumário vazio.
            dono = document.createElement('li');
            lista.appendChild(dono);
        }
        var grupo = document.createElement('details');
        grupo.className = 'nota-toc__artigos';
        grupo.open = !!aberto;
        var rotulo = document.createElement('summary');
        var itens = document.createElement('ul');
        grupo.appendChild(rotulo);
        grupo.appendChild(itens);
        dono.appendChild(grupo);
        return { rotulo: rotulo, itens: itens, total: 0 };
    }

    function acrescentarArtigo(grupo, paragrafo) {
        var partes = partesDoArtigo(paragrafo);
        var item = document.createElement('li');
        var link = document.createElement('a');
        var marcador = document.createElement('span');
        link.href = '#' + paragrafo.id;
        marcador.className = 'nota-toc__marcador';
        marcador.textContent = partes.marcador;
        link.appendChild(marcador);
        if (partes.resumo) link.appendChild(document.createTextNode(' ' + partes.resumo));
        item.appendChild(link);
        item.dataset.busca = normalizar(partes.marcador + ' ' + partes.resumo);
        grupo.itens.appendChild(item);
        grupo.total += 1;
        grupo.rotulo.textContent = grupo.total + (grupo.total === 1 ? ' artigo' : ' artigos');
        return link;
    }

    /* `comArtigos` só vale para o sumário da lei seca: no dos comentários os
       títulos das seções já são o conteúdo — e lá o sumário desce até o h4,
       para uma subseção longa ("Envolvimento humano significativo", dentro da
       seção sobre decisões automatizadas da LGPD) não ficar invisível no mapa
       do texto. Na lei seca o nível a mais é o artigo, que tem tratamento
       próprio (grupo recolhível), e h4/h5 lá são subdivisões de capítulo que
       só alongariam a lista.

       Devolve, além da lista montada, os elementos que a marcação de "onde o
       leitor está" acompanha (`alvos`, em ordem de documento) e o link de cada
       um deles (`links`, por id). Os artigos entram nessa conta junto com os
       títulos: sem eles, percorrer uma norma de 80 artigos só movia a marca
       onze vezes, e o item clicado no sumário nunca era o marcado. Quem situa
       a leitura continua aparecendo — o capítulo do item corrente recebe a
       marca discreta de ramo (ver `aplicarMarcas`). */
    function construirSumario(lista, raiz, comArtigos, artigosAbertos) {
        lista.innerHTML = '';
        var seletor = comArtigos ? 'h2[id], h3[id], p.lei-artigo[id]' : 'h2[id], h3[id], h4[id]';
        var nos = Array.prototype.slice.call(raiz.querySelectorAll(seletor));
        var alvos = [];
        // Sem protótipo: as chaves são ids vindos do texto da norma, e um id
        // chamado "constructor" devolveria uma função no lugar de um link.
        var links = Object.create(null);
        var ultimoPorNivel = {};
        var itemDoTitulo = null;
        var grupoDeArtigos = null;

        nos.forEach(function (no) {
            if (no.tagName === 'P') {
                if (!grupoDeArtigos) grupoDeArtigos = criarGrupoDeArtigos(itemDoTitulo, lista, artigosAbertos);
                links[no.id] = acrescentarArtigo(grupoDeArtigos, no);
                alvos.push(no);
                return;
            }

            var item = document.createElement('li');
            var link = document.createElement('a');
            link.href = '#' + no.id;
            link.textContent = no.textContent;
            item.appendChild(link);
            item.dataset.busca = normalizar(no.textContent);

            /* Cada título entra sob o ancestral mais próximo já visto: o h4 sob
               o h3 anterior, o h3 sob o h2. O laço sobe nível a nível porque o
               texto pode pular um (h2 direto para h4) ou começar por h3 — nos
               dois casos ele acha o pai certo, ou nenhum, e aí o título fica no
               primeiro nível da lista. */
            var nivel = +no.tagName.slice(1);
            var pai = null;
            for (var acima = nivel - 1; acima >= 2 && !pai; acima--) {
                pai = ultimoPorNivel[acima] || null;
            }

            if (pai) {
                // `:scope >` porque o item do pai pode conter também a lista de
                // artigos do próprio capítulo, que não é a sublista dos títulos.
                var sublista = pai.querySelector(':scope > ul');
                if (!sublista) {
                    sublista = document.createElement('ul');
                    pai.appendChild(sublista);
                }
                sublista.appendChild(item);
            } else {
                lista.appendChild(item);
            }

            ultimoPorNivel[nivel] = item;
            // Um título fecha os níveis abaixo dele: a próxima subseção
            // pertence a esta seção, não à subseção anterior.
            for (var abaixo = nivel + 1; abaixo <= 6; abaixo++) delete ultimoPorNivel[abaixo];

            links[no.id] = link;
            alvos.push(no);
            itemDoTitulo = item;
            grupoDeArtigos = null;
        });
        return { alvos: alvos, links: links };
    }

    /* Monta a lista de um sumário e zera o que era da lista anterior: as marcas
       apontam elementos que saíram do DOM, e o alvo fixado por um salto também
       morre com eles. */
    function montarSumario(sumario, raiz, comArtigos, artigosAbertos) {
        var montado = construirSumario(sumario.lista, raiz, comArtigos, artigosAbertos);
        sumario.alvos = montado.alvos;
        sumario.links = montado.links;
        sumario.marcado = null;
        sumario.marcados = [];
        sumario.aVista = null;
        sumario.fixado = null;
        sumario.ultimoAtivo = null;
    }

    /* Filtra os títulos já listados. Um item que casa arrasta consigo os
       ancestrais (sem o título do capítulo, a seção encontrada aparece sem o
       contexto que a situa) e os descendentes (quem procura o capítulo quer as
       seções dele). */
    function filtrarSumario(lista, vazio, termo) {
        var alvo = normalizar(termo).trim();
        var itens = Array.prototype.slice.call(lista.querySelectorAll('li'));

        if (!alvo) {
            itens.forEach(function (item) { item.hidden = false; });
            vazio.hidden = true;
            return;
        }

        itens.forEach(function (item) { item.hidden = true; });
        var encontrou = false;
        itens.forEach(function (item) {
            if (item.dataset.busca.indexOf(alvo) === -1) return;
            encontrou = true;
            item.hidden = false;
            Array.prototype.forEach.call(item.querySelectorAll('li'), function (filho) {
                filho.hidden = false;
            });
            for (var pai = item.parentElement.closest('li'); pai; pai = pai.parentElement.closest('li')) {
                pai.hidden = false;
            }
        });
        vazio.hidden = encontrou;

        /* Artigo que casa não adianta nada dentro de um grupo recolhido — e
           capítulo que casa traz os artigos dele junto, pela mesma regra que
           já traz as seções. Limpar o filtro não recolhe de volta: o que foi
           aberto (pelo leitor ou pela busca) continua aberto. */
        Array.prototype.forEach.call(lista.querySelectorAll('details'), function (grupo) {
            if (grupo.querySelector('li:not([hidden])')) grupo.open = true;
        });
    }

    /* Rola a lista do sumário até um item, e só quando ele não está à vista —
       mexer numa lista que já mostra o que precisa mostrar é movimento gratuito.
       Fora de vista, o item vai para o meio da lista, e não para a borda de onde
       entrou: no meio ele leva junto o que vem antes e o que vem depois, que é o
       que situa a leitura, e demora mais para sair de novo.

       A rolagem é feita na lista, e não com `scrollIntoView`, que sobe pelos
       contêineres roláveis acima dela — no mobile o sumário é sobreposição de
       tela cheia, e ali quem está acima é a página. */
    function trazerParaAVista(sumario, alvo) {
        var corpo = sumario.painel.querySelector('.nota-toc__corpo');
        if (!corpo || !alvo) return;
        var area = corpo.getBoundingClientRect();
        var item = alvo.getBoundingClientRect();
        if (item.top >= area.top && item.bottom <= area.bottom) return;
        corpo.scrollTop = Math.max(0, corpo.scrollTop + (item.top - area.top) -
            (area.height - item.height) / 2);
    }

    /* Um item do sumário sai da tela por dois caminhos: o grupo de artigos que
       o guarda está recolhido, ou o filtro o escondeu. Os dois são lidos do
       DOM, e não da geometria: dentro de um `<details>` fechado o navegador
       ainda devolve um retângulo (o conteúdo é pulado por
       `content-visibility`, não removido do layout), e o `checkVisibility`,
       que acertaria, é recente demais para ser a única defesa. */
    function foraDaTela(link) {
        var grupo = link.closest('details');
        return (grupo && !grupo.open) || !!link.closest('li[hidden]');
    }

    /* O link que representa uma posição na lista: o do próprio item, quando ele
       está à mostra, ou o do título que o contém, quando não. Marcar o que não
       aparece apagaria o "você está aqui" do sumário e mandaria a lista rolar
       até um retângulo vazio — é assim que o capítulo continua sendo o item
       marcado enquanto os artigos estão recolhidos, como era antes de eles
       existirem no sumário. */
    function linkAVista(link) {
        if (!link) return null;
        if (!foraDaTela(link)) return link;
        var grupo = link.closest('details');
        var dono = grupo && grupo.closest('li');
        var acima = dono && dono.querySelector(':scope > a');
        return acima && !foraDaTela(acima) ? acima : null;
    }

    /* Marca o item corrente e o caminho até ele. Só o item mais fundo que está
       à vista leva `nota-toc__atual` e `aria-current`; o capítulo (e a seção,
       quando há) ficam com a marca discreta de ramo, que é o que responde "em
       que parte da norma estou?" quando o destaque está num artigo. Dois
       `aria-current` no mesmo caminho seriam anunciados como duas posições, e
       por isso o ramo não leva nenhum.

       As escritas no DOM acontecem só quando o item corrente muda: com os
       artigos na conta são até 162 links por norma, e repintar todos a cada
       quadro de rolagem é trabalho jogado fora. */
    function aplicarMarcas(sumario, atual) {
        (sumario.marcados || []).forEach(function (link) {
            link.classList.remove('nota-toc__atual', 'nota-toc__ramo');
            link.removeAttribute('aria-current');
        });
        var marcados = [];
        var link = linkAVista(sumario.links[atual.id]);
        if (link) {
            link.classList.add('nota-toc__atual');
            link.setAttribute('aria-current', 'true');
            marcados.push(link);
            var item = link.closest('li');
            for (var pai = item && item.parentElement.closest('li'); pai; pai = pai.parentElement.closest('li')) {
                var acima = pai.querySelector(':scope > a');
                if (!acima) continue;
                acima.classList.add('nota-toc__ramo');
                marcados.push(acima);
            }
        }
        sumario.marcados = marcados;
        sumario.aVista = link;
    }

    /* Onde o leitor está: o último alvo — título ou artigo — que já passou pela
       linha de leitura (o topo útil do painel, abaixo do que estiver fixo
       ali). */
    function alvoNaLinhaDeLeitura(sumario, painelEl, corpoEl) {
        var linha = (duasColunas.matches
            ? corpoEl.getBoundingClientRect().top
            : alturaDosElementosFixos(painelEl)) + LINHA_DE_LEITURA;
        var atual = sumario.alvos[0];
        sumario.alvos.forEach(function (alvo) {
            if (alvo.getBoundingClientRect().top <= linha) atual = alvo;
        });
        return atual;
    }

    /* Sem isso, abrir um sumário de 50 entradas não diz onde o leitor está — só
       para onde ele pode ir. Só é recalculado com o sumário aberto: fechado, o
       resultado não apareceria em lugar nenhum.

       Depois de um salto, quem manda é o alvo fixado, e não a geometria: o
       destino foi decidido pelo clique, e uma âncora perto do fim da norma para
       onde a rolagem alcança, não onde a linha de leitura a encontraria.

       Marcar não basta: numa norma de 119 artigos a marca sai da parte visível
       da lista nas primeiras rolagens, e um sumário parado no topo não responde
       "em que capítulo está este artigo?". Por isso a lista **acompanha** a
       leitura — mas só quando o item corrente muda, e nunca com o foco dentro
       do sumário, que é quando o leitor está percorrendo a lista por conta
       própria e puxá-la sob os dedos dele seria hostil. */
    function marcarSumarioAtivo(sumario, painelEl, corpoEl) {
        if (!sumario || sumario.painel.hidden || !sumario.alvos.length) return;
        var atual = sumario.fixado || alvoNaLinhaDeLeitura(sumario, painelEl, corpoEl);
        if (atual !== sumario.marcado) {
            sumario.marcado = atual;
            aplicarMarcas(sumario, atual);
        }

        /* `saltoEmCurso` sai antes de `ultimoAtivo` ser atualizado, de
           propósito: o item continua "não tratado", e a passada final que o
           fim do salto dispara é que leva a lista até ele. */
        if (!sumario.aVista || saltoEmCurso || sumario.aVista === sumario.ultimoAtivo) return;
        sumario.ultimoAtivo = sumario.aVista;
        if (sumario.painel.contains(document.activeElement)) return;
        trazerParaAVista(sumario, sumario.aVista);
    }

    /* O salto fixa o seu destino no sumário do painel de destino, para o
       destaque aparecer no clique e não mudar enquanto a rolagem corre. Alvo
       que não está no sumário (um inciso, um parágrafo) fixa o artigo a que
       pertence — o último alvo antes dele. */
    function fixarNoSumario(nomePainel, alvo) {
        var sumario = PAINEIS[nomePainel] && PAINEIS[nomePainel].sumario;
        if (!sumario || !sumario.alvos.length) return;
        var escolhido = null;
        sumario.alvos.forEach(function (candidato) {
            if (candidato === alvo || (candidato.compareDocumentPosition(alvo) &
                Node.DOCUMENT_POSITION_FOLLOWING)) {
                escolhido = candidato;
            }
        });
        sumario.fixado = escolhido;
    }

    /* O alvo fixado vale até o leitor rolar por conta própria: aí ele saiu do
       ponto para onde pediu para ir, e o sumário volta a seguir a leitura.
       Enquanto o salto corre, as rolagens são do próprio salto. */
    function soltarFixados() {
        [sumarioComentarios, sumarioLei].forEach(function (sumario) {
            if (sumario) sumario.fixado = null;
        });
    }

    function configurarSumario(idBotao, idPainel, painelEl, corpoEl, nomePainel) {
        var botao = document.getElementById(idBotao);
        var painelSumario = document.getElementById(idPainel);
        if (!botao || !painelSumario) return null;
        var lista = painelSumario.querySelector('ul');
        var fechar = painelSumario.querySelector('.nota-toc__fechar');
        var campo = painelSumario.querySelector('.nota-toc__campo');
        var vazio = painelSumario.querySelector('.nota-toc__vazio');
        var sumario = { painel: painelSumario, lista: lista, alvos: [], links: Object.create(null) };

        /* Ancorado = o sumário deste painel virou coluna fixa da grade, ao lado
           do texto, porque o painel está expandido no modo leitura. Coluna não
           é gaveta: não se fecha ao clicar fora nem com Esc, que são gestos de
           dispensar sobreposição. Fechar, o leitor ainda pode — pelo X, que
           devolve a largura ao texto e traz de volta o botão da borda. */
        function ancorado() {
            return duasColunas.matches && document.body.getAttribute('data-leitura') === nomePainel;
        }

        function abrir(comFoco) {
            painelSumario.hidden = false;
            botao.setAttribute('aria-expanded', 'true');
            marcarSumarioAtivo(sumario, painelEl, corpoEl);
            /* No desktop o foco vai para o filtro: com o sumário aberto para
               procurar uma seção, poder digitar direto poupa o percurso pela
               lista. No mobile isso abriria o teclado por cima da própria
               lista, então lá o foco continua no primeiro link. */
            if (comFoco !== false) {
                var primeiro = duasColunas.matches && campo ? campo : lista.querySelector('a');
                if (primeiro) primeiro.focus();
            }
            /* No sumário da lei seca, o capítulo em que o leitor está abre com
               os artigos à mostra: é ali que ele vai procurar o artigo vizinho
               ao que está lendo. Aberto o grupo, o artigo corrente passa a
               estar na tela e a marca desce do capítulo para ele — daí a
               segunda passada. */
            var link = sumario.marcado ? sumario.links[sumario.marcado.id] : null;
            var grupo = link && (link.closest('details') ||
                link.closest('li').querySelector(':scope > details'));
            if (grupo && !grupo.open) {
                grupo.open = true;
                sumario.remarcar();
            }
            if (sumario.aVista) trazerParaAVista(sumario, sumario.aVista);
        }

        function fecharSumario(devolverFoco) {
            painelSumario.hidden = true;
            botao.setAttribute('aria-expanded', 'false');
            if (devolverFoco) botao.focus();
        }

        botao.setAttribute('aria-expanded', String(!painelSumario.hidden));
        botao.addEventListener('click', function () {
            if (painelSumario.hidden) abrir(); else fecharSumario(false);
        });
        if (fechar) fechar.addEventListener('click', function () { fecharSumario(true); });
        if (campo) {
            campo.addEventListener('input', function () {
                filtrarSumario(lista, vazio, campo.value);
                // O filtro esconde itens e abre grupos: o item marcado pode ter
                // saído da tela, e o que o representa passa a ser outro.
                sumario.remarcar();
            });
            // Esc num campo de busca limpa o texto em vez de propagar: só
            // fecha o sumário quando não há mais o que limpar.
            campo.addEventListener('keydown', function (evento) {
                if (evento.key !== 'Escape' || !campo.value) return;
                campo.value = '';
                filtrarSumario(lista, vazio, '');
                sumario.remarcar();
                evento.stopPropagation();
            });
        }
        /* `<details>` não borbulha o `toggle`, e a captura é como o sumário fica
           sabendo que o leitor abriu ou fechou um grupo de artigos à mão:
           aberto, a marca desce do capítulo para o artigo corrente; fechado,
           ela volta para o capítulo. Passa pelo quadro do progresso para que
           abrir os grupos todos de uma vez (modo leitura) custe uma remarcação
           só. */
        lista.addEventListener('toggle', function () {
            sumario.marcado = null;
            atualizarProgressos();
        }, true);
        painelSumario.addEventListener('keydown', function (evento) {
            if (evento.key !== 'Escape' || ancorado()) return;
            // Tratado aqui, o Esc não segue para o handler global, que
            // desfaria uma segunda camada no mesmo toque (ver `aoTeclar`).
            evento.preventDefault();
            fecharSumario(true);
        });
        document.addEventListener('click', function (evento) {
            if (!painelSumario.hidden && !ancorado() && !painelSumario.contains(evento.target) &&
                evento.target !== botao && !botao.contains(evento.target)) {
                fecharSumario(false);
            }
        });
        lista.addEventListener('click', function (evento) {
            var link = evento.target.closest('a[href^="#"]');
            if (!link) return;
            evento.preventDefault();
            var id = decodeURIComponent(link.getAttribute('href').slice(1));
            // Coluna ancorada continua onde está: ela é o mapa que o leitor
            // usa para ir de um artigo a outro, e sumir a cada clique
            // obrigaria a reabri-la para o salto seguinte.
            if (!ancorado()) fecharSumario(false);
            if (nomePainel === 'lei') {
                var normaAlvo = normaDoId(id);
                if (normaAlvo) {
                    ativarNorma(normaAlvo);
                    carregarNorma(normaAlvo, function () {
                        if (irPara(id)) history.replaceState(null, '', '#' + id);
                    });
                    return;
                }
                if (irPara(id)) history.replaceState(null, '', '#' + id);
            } else if (irParaComentario(id)) {
                history.replaceState(null, '', '#' + id);
            }
        });

        sumario.limparFiltro = function () {
            if (!campo || !campo.value) return;
            campo.value = '';
            filtrarSumario(lista, vazio, '');
        };
        // Refaz a marca do zero: o item corrente pode ser o mesmo e ainda assim
        // ser representado por outro link, quando o que muda é o que está à
        // vista na lista (um grupo que abriu, o filtro que escondeu itens).
        sumario.remarcar = function () {
            sumario.marcado = null;
            marcarSumarioAtivo(sumario, painelEl, corpoEl);
        };
        sumario.abrir = abrir;
        sumario.fechar = fecharSumario;
        // Coluna do modo leitura, e não gaveta: o Esc global a deixa em paz
        // (ver `fecharOQueEstiverAberto`), como o Esc de dentro dela já fazia.
        sumario.ancorado = ancorado;
        return sumario;
    }

    var sumarioComentarios = configurarSumario('toc-comentarios-btn', 'toc-comentarios', comentarios, corpoDosComentarios, 'comentarios');
    var sumarioLei = configurarSumario('toc-lei-btn', 'toc-lei', lei, corpoDaLei, 'lei');

    if (sumarioComentarios) {
        montarSumario(sumarioComentarios, corpoDosComentarios, false);
    }

    function reconstruirSumarioLei() {
        if (!sumarioLei) return;
        var docAtivo = corpoDaLei.querySelector('.lei-doc:not([hidden])') || corpoDaLei;
        // A lista é outra: um filtro digitado para a norma anterior não diz
        // nada sobre esta, e deixá-lo ligado esconderia o sumário inteiro. A
        // marca de item corrente também é da lista antiga, e guardá-la só
        // seguraria na memória um trecho de DOM que já saiu.
        sumarioLei.limparFiltro();
        montarSumario(sumarioLei, docAtivo, true, leituraAtiva() === 'lei');
    }
    reconstruirSumarioLei();

    /* --- Modo leitura: um painel só, na tela inteira ---
       A tela dividida serve para conferir o comentário contra o dispositivo. Só
       ler é outra coisa, e para isso metade de 1440px é pouco: um clique no
       botão da barra de título dá a tela inteira ao painel, com teto de largura
       para o parágrafo não virar uma linha de ponta a ponta (o teto está no
       CSS), e promove o sumário dele de gaveta a coluna fixa ao lado do texto.

       O estado dura a sessão, como a proporção da tela dividida, e é aplicado
       antes do primeiro paint por um script inline no layout — este arquivo é
       `defer`, e aplicar aqui faria a tela dividida saltar para coluna única
       depois de já desenhada. */
    var CHAVE_LEITURA = 'notas-leitura';
    var PAINEIS = {
        comentarios: { secao: comentarios, corpo: corpoDosComentarios, sumario: sumarioComentarios },
        lei: { secao: lei, corpo: corpoDaLei, sumario: sumarioLei }
    };
    var botoesLeitura = Array.prototype.slice.call(document.querySelectorAll('[data-leitura-painel]'));
    var rolagemDoPainel = {};

    function leituraAtiva() {
        return document.body.getAttribute('data-leitura') || '';
    }

    function abrirTodosOsGrupos(sumario) {
        if (!sumario) return;
        Array.prototype.forEach.call(sumario.lista.querySelectorAll('details'), function (grupo) {
            grupo.open = true;
        });
        // Com a lista inteira à mostra, quem representa a posição do leitor
        // passa a ser o artigo, e não mais o capítulo que o guardava.
        sumario.remarcar();
    }

    /* `display: none` zera o scrollTop do painel que sai, e o leitor voltaria
       ao topo de um texto que já tinha percorrido. Guardar antes e devolver
       depois é o mesmo cuidado que a troca de norma já toma. */
    function aplicarLeitura(nome, comFoco) {
        if (!duasColunas.matches) nome = '';
        var anterior = leituraAtiva();
        if (nome === anterior) return;

        Object.keys(PAINEIS).forEach(function (chave) {
            // Só o que está à vista: um painel em `display: none` lê scrollTop
            // 0, e guardar esse zero apagaria a posição real — que já está
            // guardada desde o momento em que ele saiu da tela.
            if (anterior && anterior !== chave) return;
            rolagemDoPainel[chave] = PAINEIS[chave].corpo.scrollTop;
        });

        if (nome) document.body.setAttribute('data-leitura', nome);
        else document.body.removeAttribute('data-leitura');

        botoesLeitura.forEach(function (botao) {
            botao.setAttribute('aria-pressed', String(botao.dataset.leituraPainel === nome));
        });

        Object.keys(PAINEIS).forEach(function (chave) {
            var painel = PAINEIS[chave];
            if (nome && nome !== chave) {
                // Painel que saiu: o sumário dele iria junto, e reaparecer
                // sozinho ao voltar da leitura confundiria mais do que ajuda.
                if (painel.sumario) painel.sumario.fechar(false);
                return;
            }
            painel.corpo.scrollTop = rolagemDoPainel[chave] || 0;
            if (!painel.sumario) return;
            if (nome) {
                painel.sumario.abrir(comFoco === true);
                abrirTodosOsGrupos(painel.sumario);
            } else {
                painel.sumario.fechar(false);
            }
        });

        try { sessionStorage.setItem(CHAVE_LEITURA, nome); } catch (erro) { /* modo privado */ }
        // Entrar na leitura da lei seca tira o cabeçalho da tela, e com ele o
        // botão em que a lista de atalhos se ancora; sair traz os dois de
        // volta. A lista é `position: fixed` e não se recoloca sozinha.
        posicionarAtalhos();
        atualizarProgressos();
    }

    // O mesmo alternador para o botão da barra de título e para o atalho de
    // teclado: a segunda chamada com o painel já expandido devolve a divisão.
    function alternarLeitura(nome) {
        aplicarLeitura(leituraAtiva() === nome ? '' : nome);
    }

    botoesLeitura.forEach(function (botao) {
        botao.addEventListener('click', function () {
            alternarLeitura(botao.dataset.leituraPainel);
        });
    });

    // O estado restaurado pelo script inline não passou por aqui: os botões
    // ainda estão em `aria-pressed="false"` e os grupos de artigos do sumário
    // da lei foram montados antes de a norma ser reconstruída.
    if (leituraAtiva()) {
        var restaurado = leituraAtiva();
        botoesLeitura.forEach(function (botao) {
            botao.setAttribute('aria-pressed', String(botao.dataset.leituraPainel === restaurado));
        });
        abrirTodosOsGrupos(PAINEIS[restaurado].sumario);
    }

    // Estreitou a janela: a coluna única já mostra um painel por vez, e o modo
    // leitura deixa de fazer sentido — inclusive o sumário aberto, que ali é
    // sobreposição de tela cheia.
    if (duasColunas.addEventListener) {
        duasColunas.addEventListener('change', function (evento) {
            if (!evento.matches && leituraAtiva()) aplicarLeitura('');
        });
    }

    /* --- Barra de progresso de leitura, uma por painel --- */
    function configurarProgresso(painelEl, corpoEl, barraEl) {
        if (!barraEl) return function () {};
        return function atualizar() {
            var fracao;
            if (duasColunas.matches) {
                var maximo = corpoEl.scrollHeight - corpoEl.clientHeight;
                fracao = maximo > 0 ? corpoEl.scrollTop / maximo : 0;
            } else {
                var fixos = alturaDosElementosFixos(painelEl);
                var alturaVisivel = window.innerHeight - fixos;
                var maximoJanela = corpoEl.scrollHeight - alturaVisivel;
                var rolado = fixos - corpoEl.getBoundingClientRect().top;
                fracao = maximoJanela > 0 ? rolado / maximoJanela : 0;
            }
            fracao = Math.min(1, Math.max(0, fracao));
            barraEl.style.transform = 'scaleX(' + fracao + ')';
        };
    }

    var atualizarProgressoComentarios = configurarProgresso(
        comentarios, corpoDosComentarios, document.querySelector('#progresso-comentarios .nota-progresso__barra'));
    var atualizarProgressoLei = configurarProgresso(
        lei, corpoDaLei, document.querySelector('#progresso-lei .nota-progresso__barra'));

    var progressoPendente = false;
    function atualizarProgressos() {
        if (progressoPendente) return;
        progressoPendente = true;
        requestAnimationFrame(function () {
            progressoPendente = false;
            atualizarProgressoComentarios();
            atualizarProgressoLei();
            // Mesmo quadro da barra de progresso: as duas leem a rolagem, e o
            // sumário fechado sai na primeira linha de marcarSumarioAtivo.
            marcarSumarioAtivo(sumarioComentarios, comentarios, corpoDosComentarios);
            marcarSumarioAtivo(sumarioLei, lei, corpoDaLei);
        });
    }

    function aoRolar() {
        if (!saltoEmCurso) soltarFixados();
        atualizarProgressos();
    }

    corpoDosComentarios.addEventListener('scroll', aoRolar, { passive: true });
    corpoDaLei.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', atualizarProgressos);
    if (duasColunas.addEventListener) duasColunas.addEventListener('change', atualizarProgressos);
    atualizarProgressos();

    /* --- Termos definidos: marcação no comentário e balão com a definição ---
       As definições saíram do começo das notas e passaram a viver num lugar só
       (`_data/definicoes/verbetes/`, publicado em /notas/definicoes). Para que
       sair dali não signifique ficar longe, o termo continua a um clique de
       onde ele é usado: o comentário marca o **primeiro uso de cada termo em
       cada seção** e abre um balão com a definição, a base legal e o link para
       a página.

       Três decisões que a marcação carrega:

       - **Só o primeiro uso por seção.** "Tratamento" aparece duzentas vezes
         na nota da LGPD; marcar todas transformaria o texto em confete. Uma
         marca por seção mantém o termo à mão em qualquer ponto da leitura sem
         competir com os links azuis para os dispositivos.
       - **A marca é um link de verdade** (`/notas/definicoes#v-...`), e não um
         botão: Ctrl+clique abre a página numa aba, e o clique do meio também.
         Sem JavaScript não há marca nenhuma — a página de definições continua
         linkada no rodapé de cada nota e no índice de /notas.
       - **A definição é buscada, não embutida.** Um fetch na primeira abertura,
         cacheado na aba e reaproveitado de nota para nota, em vez de 97
         verbetes no HTML de toda nota. Mesma escolha do painel "Lei seca" para
         as normas que não são a principal. --- */
    // Letras (com os acentos do latim estendido) e algarismos: é o que não
    // pode encostar num termo para ele contar como palavra inteira. O `\b`
    // do JavaScript é ASCII e cortaria "aferição" no meio.
    var LETRA_DE_PALAVRA = 'A-Za-z\u00C0-\u024F0-9';
    var URL_DEFINICOES = '/notas/definicoes';
    var indiceVerbetes = document.getElementById('nota-verbetes');
    var balaoAberto = null;
    var marcaDoBalao = null;
    var definicoesBuscadas = null;

    function caminhoDaUrl(url) {
        return url.replace(/\.html$/, '').replace(/\/+$/, '');
    }

    function pedirDefinicoes() {
        if (!definicoesBuscadas) {
            definicoesBuscadas = fetch('/notas/fragmentos/definicoes.html').then(function (resposta) {
                if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
                return resposta.text();
            }).then(function (html) {
                var caixa = document.createElement('div');
                caixa.innerHTML = html;
                return caixa;
            });
        }
        return definicoesBuscadas;
    }

    function fecharBalao(devolverFoco) {
        if (!balaoAberto) return false;
        var voltarPara = marcaDoBalao;
        var dentro = balaoAberto.contains(document.activeElement);
        balaoAberto.remove();
        balaoAberto = null;
        marcaDoBalao = null;
        if (voltarPara) voltarPara.setAttribute('aria-expanded', 'false');
        // Só devolve o foco se ele estava no balão: fechado por um clique lá
        // fora, o leitor já escolheu onde quer estar.
        if (voltarPara && (devolverFoco || dentro)) voltarPara.focus();
        return true;
    }

    /* O balão é `position: fixed` porque o comentário é um container de
       rolagem próprio na tela dividida — preso ao fluxo, sairia cortado na
       borda do painel. Abre embaixo do termo; se não couber, em cima; se não
       couber em lugar nenhum, encostado na borda de baixo. */
    function posicionarBalao(balao, marca) {
        var caixa = marca.getBoundingClientRect();
        var janelaW = document.documentElement.clientWidth;
        var janelaH = document.documentElement.clientHeight;
        var largura = balao.offsetWidth;
        var altura = balao.offsetHeight;
        var esquerda = Math.min(Math.max(8, caixa.left), Math.max(8, janelaW - largura - 8));
        var topo = caixa.bottom + 8;
        if (topo + altura > janelaH - 8) {
            var acima = caixa.top - 8 - altura;
            topo = acima >= 8 ? acima : Math.max(8, janelaH - altura - 8);
        }
        balao.style.left = Math.round(esquerda) + 'px';
        balao.style.top = Math.round(topo) + 'px';
    }

    function montarBalao(marca, conteudo, termo) {
        fecharBalao(false);
        var balao = document.createElement('div');
        balao.className = 'verbete-balao';
        balao.setAttribute('role', 'dialog');
        balao.setAttribute('aria-label', 'Definição de ' + termo);
        balao.tabIndex = -1;

        var fechar = document.createElement('button');
        fechar.type = 'button';
        fechar.className = 'verbete-balao__fechar';
        fechar.setAttribute('aria-label', 'Fechar definição');
        fechar.innerHTML = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M18 6 6 18M6 6l12 12"/></svg>';
        fechar.addEventListener('click', function () { fecharBalao(true); });
        balao.appendChild(fechar);
        balao.appendChild(conteudo);

        var todas = document.createElement('a');
        todas.className = 'verbete-balao__todas';
        todas.href = marca.getAttribute('href');
        todas.textContent = 'Ver em Definições legais';
        balao.appendChild(todas);

        document.body.appendChild(balao);
        marcarLinksExternos(balao);
        posicionarBalao(balao, marca);
        balaoAberto = balao;
        marcaDoBalao = marca;
        marca.setAttribute('aria-expanded', 'true');
        balao.focus({ preventScroll: true });
    }

    /* As normas *desta* nota (a principal e as de `normas_extra`), lidas do
       primeiro grupo do seletor do painel. Servem ao balão: num verbete com
       várias acepções, a da norma que o leitor está lendo vem primeiro. */
    var normasDaNota = {};
    if (seletorNorma) {
        var grupoDaNota = seletorNorma.querySelector('optgroup');
        if (grupoDaNota) {
            Array.prototype.forEach.call(grupoDaNota.querySelectorAll('option'), function (opcao) {
                normasDaNota[opcao.value.replace('lei-doc-', '')] = true;
            });
        }
    }

    function corpoDoVerbete(verbete) {
        var copia = verbete.cloneNode(true);
        // O id sai: ele já existe na página de definições, e duplicá-lo aqui
        // faria `#v-...` resolver para o balão em vez de para a lista.
        copia.removeAttribute('id');

        /* Na página, as acepções vêm com o Brasil à frente. No balão, quem vem
           à frente é a norma que o leitor está lendo: abrir "dado pessoal" na
           nota do RGPD e receber a LGPD primeiro é responder outra pergunta. A
           ordem relativa das demais não muda. */
        var acepcoes = Array.prototype.slice.call(copia.querySelectorAll('.verbete__acepcao'));
        if (acepcoes.length > 1) {
            acepcoes.forEach(function (acepcao) {
                if (normasDaNota[acepcao.dataset.norma]) copia.appendChild(acepcao);
            });
            acepcoes.forEach(function (acepcao) {
                if (!normasDaNota[acepcao.dataset.norma]) copia.appendChild(acepcao);
            });
        }
        /* A etiqueta da norma vira texto quando aponta para a nota em que o
           leitor já está — seria um link que recarrega a página para chegar
           onde ele estava. Num verbete com várias acepções, as outras apontam
           para outras notas e continuam sendo link. */
        Array.prototype.forEach.call(copia.querySelectorAll('.verbete__norma'), function (etiqueta) {
            if (caminhoDaUrl(new URL(etiqueta.href).pathname) !== caminhoDaUrl(location.pathname)) return;
            var nome = document.createElement('span');
            nome.className = etiqueta.className;
            nome.textContent = etiqueta.textContent;
            etiqueta.parentNode.replaceChild(nome, etiqueta);
        });
        return copia;
    }

    function abrirBalao(marca) {
        var id = marca.dataset.verbete;
        var termo = marca.textContent;
        pedirDefinicoes().then(function (caixa) {
            var verbete = caixa.querySelector('[id="' + id + '"]');
            if (!verbete) {
                // Verbete que saiu do dado: o link para a página continua
                // valendo, e é para lá que o leitor vai.
                location.href = marca.getAttribute('href');
                return;
            }
            montarBalao(marca, corpoDoVerbete(verbete), termo);
        }).catch(function () {
            definicoesBuscadas = null;
            var aviso = document.createElement('p');
            aviso.className = 'verbete__definicao';
            aviso.textContent = 'Não foi possível carregar a definição agora.';
            montarBalao(marca, aviso, termo);
        });
    }

    var verbetesDaNota = [];
    if (indiceVerbetes) {
        try {
            verbetesDaNota = JSON.parse(indiceVerbetes.textContent) || [];
        } catch (erro) {
            verbetesDaNota = [];
        }
    }

    if (verbetesDaNota.length) {
        /* Uma expressão regular só, com todas as formas de todos os termos,
           da mais longa para a mais curta — assim "dado pessoal sensível" ganha
           de "dado pessoal" no mesmo ponto do texto. As bordas são explícitas
           (e não `\b`, que é ASCII e não conhece "ção"), e a da esquerda é
           capturada em vez de olhada para trás: `lookbehind` ainda não é
           universal. */
        var formaParaId = {};
        var ambiguas = {};
        var formas = [];
        verbetesDaNota.forEach(function (verbete) {
            for (var i = 1; i < verbete.length; i++) {
                var forma = verbete[i];
                var chave = forma.toLowerCase();
                if (formaParaId[chave]) {
                    /* Duas normas desta nota definem o mesmo termo (acontece
                       entre resoluções da ANPD). Marcar abriria uma delas por
                       sorteio, o que numa página de legislação é pior do que
                       não marcar: o termo fica sem marca, e a página de
                       definições mostra os dois verbetes, um por norma. O
                       `conferir_definicoes.py` avisa quais são. */
                    if (formaParaId[chave] !== verbete[0]) ambiguas[chave] = true;
                    continue;
                }
                formaParaId[chave] = verbete[0];
                formas.push(forma);
            }
        });
        Object.keys(ambiguas).forEach(function (chave) { delete formaParaId[chave]; });
        formas = formas.filter(function (forma) { return !ambiguas[forma.toLowerCase()]; });
        formas.sort(function (a, b) { return b.length - a.length; });
        var escapadas = formas.map(function (forma) {
            return forma.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        });
        var regexTermos = new RegExp(
            '(^|[^' + LETRA_DE_PALAVRA + '_-])(' + escapadas.join('|') + ')(?![' + LETRA_DE_PALAVRA + '_-])',
            'gi');

        // Onde marcar seria enganoso: dentro de outro link (o destino do
        // clique seria outro), no código, no aviso de IA e nos títulos, que são
        // navegação — o sumário lê o texto deles.
        var FORA_DA_MARCACAO = 'a, code, pre, abbr, h1, h2, h3, h4, h5, h6, .nota-aviso';

        function marcarNoTexto(no, jaMarcados) {
            var texto = no.nodeValue;
            var pedacos = null;
            var ultimo = 0;
            var achado;
            regexTermos.lastIndex = 0;
            while ((achado = regexTermos.exec(texto))) {
                var forma = achado[2];
                var id = formaParaId[forma.toLowerCase()];
                if (!id || jaMarcados[id]) continue;
                jaMarcados[id] = true;
                if (!pedacos) pedacos = document.createDocumentFragment();
                var inicio = achado.index + achado[1].length;
                pedacos.appendChild(document.createTextNode(texto.slice(ultimo, inicio)));
                var marca = document.createElement('a');
                marca.className = 'verbete-marca';
                marca.href = URL_DEFINICOES + '#' + id;
                marca.dataset.verbete = id;
                marca.setAttribute('aria-expanded', 'false');
                marca.textContent = forma;
                pedacos.appendChild(marca);
                ultimo = inicio + forma.length;
            }
            if (!pedacos) return;
            pedacos.appendChild(document.createTextNode(texto.slice(ultimo)));
            no.parentNode.replaceChild(pedacos, no);
        }

        function marcarBloco(bloco, jaMarcados) {
            var caminhante = document.createTreeWalker(bloco, NodeFilter.SHOW_TEXT, {
                acceptNode: function (no) {
                    if (!no.nodeValue || !no.parentElement) return NodeFilter.FILTER_REJECT;
                    return no.parentElement.closest(FORA_DA_MARCACAO)
                        ? NodeFilter.FILTER_REJECT
                        : NodeFilter.FILTER_ACCEPT;
                }
            });
            // Coletados antes de mexer: trocar um nó de texto durante a
            // caminhada invalidaria a posição do caminhante.
            var nos = [];
            var no;
            while ((no = caminhante.nextNode())) nos.push(no);
            nos.forEach(function (encontrado) { marcarNoTexto(encontrado, jaMarcados); });
        }

        function marcarTermos() {
            var jaMarcados = {};
            Array.prototype.forEach.call(corpoDosComentarios.children, function (bloco) {
                // Cada `##` recomeça a conta: o leitor que entra por uma seção
                // do meio encontra os termos dela marcados.
                if (bloco.tagName === 'H2') { jaMarcados = {}; return; }
                marcarBloco(bloco, jaMarcados);
            });
        }

        if ('requestIdleCallback' in window) requestIdleCallback(marcarTermos, { timeout: 2000 });
        else setTimeout(marcarTermos, 200);

        // O primeiro balão fica instantâneo se o texto já chegou: quem passa o
        // ponteiro por um termo marcado quase sempre vai clicar nele.
        comentarios.addEventListener('pointerover', function (evento) {
            if (evento.target.closest && evento.target.closest('.verbete-marca')) pedirDefinicoes();
        });

        comentarios.addEventListener('click', function (evento) {
            var marca = evento.target.closest('.verbete-marca');
            if (!marca) return;
            // Ctrl/Cmd/Shift e clique do meio continuam do navegador: abrir a
            // página de definições em outra aba é um gesto legítimo.
            if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.button !== 0) return;
            evento.preventDefault();
            if (marcaDoBalao === marca) { fecharBalao(true); return; }
            abrirBalao(marca);
        });

        /* Remissão escrita dentro do verbete (`art. 5º, V`, `art. 12`) chega
           aqui como link absoluto para a nota da norma — é o que faz ela
           funcionar também na página de definições, onde não há painel nenhum.
           Quando esse destino é *esta* nota, o balão devolve o salto ao painel
           da lei em vez de recarregar a página. */
        document.addEventListener('click', function (evento) {
            if (!balaoAberto) return;
            var alvo = evento.target;
            if (!balaoAberto.contains(alvo)) {
                if (!alvo.closest || !alvo.closest('.verbete-marca')) fecharBalao(false);
                return;
            }
            var link = alvo.closest && alvo.closest('a[href]');
            if (!link || evento.metaKey || evento.ctrlKey || evento.shiftKey) return;
            var destino;
            try { destino = new URL(link.href); } catch (erro) { return; }
            if (destino.origin !== location.origin) return;
            if (caminhoDaUrl(destino.pathname) !== caminhoDaUrl(location.pathname)) return;
            if (!destino.hash) return;
            evento.preventDefault();
            var id = decodeURIComponent(destino.hash.slice(1));
            fecharBalao(false);
            var normaAlvo = normaDoId(id);
            if (normaAlvo) {
                ativarNorma(normaAlvo);
                carregarNorma(normaAlvo, function () {
                    if (irPara(id)) history.replaceState(null, '', '#' + id);
                });
                return;
            }
            if (irPara(id)) history.replaceState(null, '', '#' + id);
        });

        /* Tabular para fora fecha. O balão não é modal — prendê-lo com um
           laço de foco seria mentir sobre o que ele é —, mas ele vive no fim do
           <body>: sem esta regra, o Tab a partir do último link dele sairia da
           página, e o leitor de teclado perderia o lugar onde estava lendo. */
        document.addEventListener('focusin', function (evento) {
            if (!balaoAberto) return;
            if (balaoAberto.contains(evento.target) || evento.target === marcaDoBalao) return;
            fecharBalao(false);
        });

        // Preso ao termo, o balão precisa sair quando o termo sai do lugar.
        window.addEventListener('resize', function () { fecharBalao(false); });
        window.addEventListener('scroll', function () { fecharBalao(false); }, true);
    }

    /* --- Atalhos de teclado ---
       Uma tecla para cada controle que hoje só existe no ponteiro: os dois
       sumários, o modo leitura de cada painel, o menu de notas, o seletor de
       normas e o campo "Ir para". Não é conforto: o painel de comentários tem
       centenas de elementos focáveis e vem antes da lei seca no DOM, de modo
       que chegar ao campo "Ir para" pelo Tab custa a nota inteira.

       Duas letras dizem o painel — `c` de comentários, `l` de lei seca — e a
       maiúscula troca a gaveta pela tela inteira. `_includes/nota-atalhos.html`
       é a lista que o leitor vê: **é a documentação destas teclas, e as duas
       precisam andar juntas.**

       Três regras valem para todas elas:

       - **Nada dispara com o foco num campo.** Filtrar o sumário por "leitura"
         não pode expandir painel a cada letra.
       - **Nada dispara com Ctrl/Alt/Meta.** Os atalhos do navegador continuam
         sendo dele.
       - **Atalho que aponta para o que está fora da tela traz a tela de
         volta** em vez de não fazer nada — é o mesmo que `irParaElemento` já
         faz ao seguir uma remissão para o painel escondido pelo modo leitura.

       O interruptor da lista não é enfeite: atalho de uma tecla só precisa
       poder ser desligado (WCAG 2.1.4, nível A), porque quem digita por voz ou
       com teclado adaptado os dispara sem querer. A escolha fica no
       localStorage e vale para todas as notas. O `Esc` continua valendo mesmo
       desligado: não é tecla de caractere, e é a saída de emergência. */
    var CHAVE_ATALHOS = 'notas-atalhos';
    var CLASSE_PRESA = 'nota-atalhos--preso';
    var CLASSE_DISPENSADA = 'nota-dica-dispensada';
    var botaoAtalhos = document.getElementById('nota-atalhos-btn');
    var painelAtalhos = document.getElementById('nota-atalhos');
    var chaveDosAtalhos = document.getElementById('nota-atalhos-ligados');
    var atalhosLigados = true;
    try { atalhosLigados = localStorage.getItem(CHAVE_ATALHOS) !== 'off'; } catch (erro) { /* modo privado */ }

    function atalhosPresos() {
        return !!painelAtalhos && painelAtalhos.classList.contains(CLASSE_PRESA);
    }

    // Na tela de verdade: presa pelo clique/`?`, ou revelada pelo ponteiro ou
    // pelo foco. É o que o Esc precisa saber para dispensar a dica.
    function atalhosAVista() {
        return !!painelAtalhos && painelAtalhos.getClientRects().length > 0;
    }

    /* A lista é `position: fixed` e vive fora do cabeçalho (ver
       `_includes/nota-atalhos.html`): não há pai a que se ancorar, e a altura
       do cabeçalho no desktop depende do título e da fonte carregada — escrita
       no CSS, seria o número que mente. Sem o botão na tela (modo leitura da
       lei seca, ou mobile) fica valendo o canto da janela, que é o padrão. */
    function posicionarAtalhos() {
        if (!botaoAtalhos || !painelAtalhos) return;
        var caixa = botaoAtalhos.getBoundingClientRect();
        if (!caixa.width) {
            ['top', 'right', 'max-height'].forEach(function (propriedade) {
                painelAtalhos.style.removeProperty(propriedade);
            });
            return;
        }
        /* Encostada no botão, sem folga: com um vão entre os dois, o ponteiro
           que desce do botão para a lista passa por um ponto em que nenhum dos
           dois está sob ele, e a lista some no caminho — o WCAG 1.4.13 pede
           justamente que dê para levar o ponteiro até ela. */
        painelAtalhos.style.top = caixa.bottom + 'px';
        painelAtalhos.style.right =
            Math.max(8, document.documentElement.clientWidth - caixa.right) + 'px';
        // O teto do CSS conta da borda da janela; descida para baixo do botão,
        // a lista precisa descontar o que ficou acima dela.
        painelAtalhos.style.maxHeight = 'calc(100dvh - ' + (caixa.bottom + 12) + 'px)';
    }

    function mostrarAtalhos(mostrar) {
        if (!botaoAtalhos || !painelAtalhos) return;
        if (mostrar) posicionarAtalhos();
        painelAtalhos.classList.toggle(CLASSE_PRESA, mostrar);
        botaoAtalhos.setAttribute('aria-expanded', String(mostrar));
        /* Fechar é gesto explícito, e precisa valer também com o ponteiro
           ainda sobre o botão (ou o foco nele): sem a marca, a revelação por
           hover reacenderia a lista no mesmo instante, e um clique no botão
           aberto pareceria não fazer nada. A marca sai quando o ponteiro (ou o
           foco) vai embora e volta — ver a regra no nota-style.css. */
        document.body.classList.toggle(CLASSE_DISPENSADA, !mostrar);
        // Fechada com o foco dentro dela, o foco volta para o botão; fora, ele
        // fica onde estava — o leitor não pediu para sair de onde lia.
        if (!mostrar && painelAtalhos.contains(document.activeElement)) botaoAtalhos.focus();
    }

    if (botaoAtalhos && painelAtalhos) {
        botaoAtalhos.addEventListener('click', function () {
            mostrarAtalhos(!atalhosPresos());
        });
        /* A dica aparece sozinha no hover e no foco (é regra de CSS). Aqui só
           se desfaz a marca de dispensada — chegar de novo ao botão é o gesto
           que pede a dica de volta — e se remede a posição, porque entre o
           carregamento e o primeiro hover a fonte pode ter chegado e mudado a
           altura do cabeçalho. */
        ['pointerenter', 'focus'].forEach(function (nomeEvento) {
            botaoAtalhos.addEventListener(nomeEvento, function () {
                document.body.classList.remove(CLASSE_DISPENSADA);
                posicionarAtalhos();
            });
        });
        document.addEventListener('click', function (evento) {
            if (!atalhosPresos() || painelAtalhos.contains(evento.target) ||
                botaoAtalhos.contains(evento.target)) return;
            mostrarAtalhos(false);
        });
        window.addEventListener('resize', posicionarAtalhos);
        posicionarAtalhos();
    }

    if (chaveDosAtalhos) {
        chaveDosAtalhos.checked = atalhosLigados;
        chaveDosAtalhos.addEventListener('change', function () {
            atalhosLigados = chaveDosAtalhos.checked;
            try {
                localStorage.setItem(CHAVE_ATALHOS, atalhosLigados ? 'on' : 'off');
            } catch (erro) { /* modo privado */ }
        });
    }

    function revelarPainel(nome) {
        if (leituraAtiva() && leituraAtiva() !== nome) aplicarLeitura('');
    }

    // Os controles da lei seca moram na barra de título dela: em uma coluna,
    // ela pode estar na aba inativa, e focar um campo em `display: none` não
    // acontece.
    function revelarPainelDaLei() {
        revelarPainel('lei');
        if (!duasColunas.matches && painelAtivo() !== 'lei') trocarPainel('lei');
    }

    function alternarSumario(sumario, nomePainel) {
        if (!sumario) return;
        if (!sumario.painel.hidden) {
            sumario.fechar(true);
            return;
        }
        revelarPainel(nomePainel);
        // Sem argumento, `abrir` leva o foco junto (o filtro no desktop, o
        // primeiro item no mobile) — que é o que um atalho de teclado pede.
        sumario.abrir();
    }

    function focarCampoIrPara() {
        if (!busca) return;
        var campoIr = busca.querySelector('input');
        if (!campoIr) return;
        revelarPainelDaLei();
        campoIr.focus();
        // Seleciona o que estiver escrito: a busca anterior fica à vista e o
        // leitor digita por cima dela sem precisar apagar.
        campoIr.select();
    }

    function abrirSeletorDeNormas() {
        if (!seletorNorma) return;
        revelarPainelDaLei();
        seletorNorma.focus();
        /* `showPicker` abre a lista do próprio navegador. Onde ele não existe
           (ou recusa), fica o foco no seletor — de onde as setas percorrem as
           normas do mesmo jeito, que é o comportamento nativo do <select>. */
        try { seletorNorma.showPicker(); } catch (erro) { /* navegador sem showPicker */ }
    }

    var ATALHOS = {
        c: function () { alternarSumario(sumarioComentarios, 'comentarios'); },
        l: function () { alternarSumario(sumarioLei, 'lei'); },
        C: function () { alternarLeitura('comentarios'); },
        L: function () { alternarLeitura('lei'); },
        n: function () {
            if (!menuDeNotas) return;
            if (menuDeNotas.aberto()) {
                menuDeNotas.fechar(true);
                return;
            }
            // Na leitura da lei seca o cabeçalho sai da tela, e o menu com ele.
            revelarPainel('comentarios');
            menuDeNotas.abrir(true);
        },
        e: abrirSeletorDeNormas,
        i: focarCampoIrPara,
        '/': focarCampoIrPara,
        '?': function () { mostrarAtalhos(!atalhosPresos()); }
    };

    /* O Esc desfaz uma camada por vez, da mais volátil para a mais duradoura:
       a lista de atalhos, o menu de notas, um sumário em gaveta e, por fim, o
       modo leitura, que devolve a tela dividida. A coluna do sumário do modo
       leitura fica de fora de propósito — ela não é sobreposição, e quem a
       fecha é o X (ou o próprio Esc, uma camada depois, junto com o modo). */
    function fecharOQueEstiverAberto() {
        // O balão da definição é a camada mais volátil de todas: nasceu do
        // último clique e cobre o texto que o leitor estava lendo.
        if (fecharBalao(true)) return true;
        // `aVista`, e não só `presos`: revelada pelo ponteiro, a dica também
        // precisa sair pelo Esc, sem o leitor ter de mexer o ponteiro.
        if (atalhosAVista()) {
            mostrarAtalhos(false);
            return true;
        }
        if (menuDeNotas && menuDeNotas.aberto()) {
            menuDeNotas.fechar(true);
            return true;
        }
        var gaveta = [sumarioComentarios, sumarioLei].filter(function (sumario) {
            return sumario && !sumario.painel.hidden && !sumario.ancorado();
        })[0];
        if (gaveta) {
            gaveta.fechar(true);
            return true;
        }
        if (leituraAtiva()) {
            aplicarLeitura('');
            return true;
        }
        return false;
    }

    function digitando(alvo) {
        if (!alvo || !alvo.tagName) return false;
        var tag = alvo.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || alvo.isContentEditable;
    }

    document.addEventListener('keydown', function (evento) {
        if (evento.ctrlKey || evento.metaKey || evento.altKey) return;

        if (evento.key === 'Escape') {
            // Já tratado por quem estava mais perto do foco (o filtro do
            // sumário limpa o texto; a gaveta e o menu se fecham).
            if (evento.defaultPrevented) return;
            // Com o foco num campo, o Esc devolve o teclado à página e para
            // por aí: fechar uma camada por baixo seria uma segunda coisa, que
            // o leitor não pediu.
            if (digitando(evento.target)) {
                evento.target.blur();
                return;
            }
            if (fecharOQueEstiverAberto()) evento.preventDefault();
            return;
        }

        if (!atalhosLigados || digitando(evento.target)) return;
        if (evento.key.length !== 1) return;

        /* A maiúscula é outro atalho: `c` abre o sumário do painel, `Shift+C`
           dá a tela inteira a ele. Quem decide é o `shiftKey`, e não a caixa da
           letra, para o Caps Lock ligado não trocar um pelo outro. */
        var tecla = /[a-z]/i.test(evento.key)
            ? (evento.shiftKey ? evento.key.toUpperCase() : evento.key.toLowerCase())
            : evento.key;
        var acao = ATALHOS[tecla];
        if (!acao) return;
        evento.preventDefault();
        acao();
    });

    /* --- Link compartilhado com âncora (/notas/lgpd#art-5-v) ou com norma
       (/notas/mci#dec8771, sem dispositivo) --- */
    if (location.hash) {
        var idInicial = decodeURIComponent(location.hash.slice(1));
        var soNorma = normaDoPrefixo(idInicial);
        var normaInicial = normaDoId(idInicial);
        if (soNorma) {
            ativarNorma(soNorma);
            carregarNorma(soNorma, function () {});
        } else if (normaInicial) {
            ativarNorma(normaInicial);
            carregarNorma(normaInicial, function () { irPara(idInicial); });
        } else {
            irPara(idInicial);
        }
    }
}());
