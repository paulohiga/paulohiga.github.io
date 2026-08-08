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

    /* --- Menu do título: alternar para outra nota sem passar pela página
       principal. A lista de links já vem pronta (e visível) no HTML — funciona
       como navegação normal sem JavaScript. Com JavaScript, vira um menu
       recolhível preso ao título. */
    var botaoTitulo = document.getElementById('nota-titulo-btn');
    var menuTitulo = document.getElementById('nota-titulo-menu');
    if (botaoTitulo && menuTitulo) {
        menuTitulo.hidden = true;

        function fecharMenuTitulo(devolverFoco) {
            menuTitulo.hidden = true;
            botaoTitulo.setAttribute('aria-expanded', 'false');
            if (devolverFoco) botaoTitulo.focus();
        }

        botaoTitulo.setAttribute('aria-expanded', 'false');
        botaoTitulo.addEventListener('click', function () {
            var abrir = menuTitulo.hidden;
            menuTitulo.hidden = !abrir;
            botaoTitulo.setAttribute('aria-expanded', String(abrir));
        });
        menuTitulo.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape') fecharMenuTitulo(true);
        });
        document.addEventListener('click', function (evento) {
            if (!menuTitulo.hidden && !menuTitulo.contains(evento.target) && evento.target !== botaoTitulo && !botaoTitulo.contains(evento.target)) {
                fecharMenuTitulo(false);
            }
        });
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

    /* --- Rolagem suave própria, com metade da duração da rolagem suave
       nativa dos navegadores — a "rolagem" usada tanto pelos links âncora
       quanto pela busca "ir para o dispositivo". `behavior: 'smooth'` nativo
       não permite controlar a duração; uma animação própria permite. */
    var DURACAO_ROLAGEM = 300;

    function suavizar(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animarRolagem(lerPosicao, aplicarPosicao, destino) {
        var inicio = lerPosicao();
        var distancia = destino - inicio;
        if (distancia === 0) return;
        var t0 = null;
        function passo(agora) {
            if (t0 === null) t0 = agora;
            var progresso = Math.min(1, (agora - t0) / DURACAO_ROLAGEM);
            aplicarPosicao(inicio + distancia * suavizar(progresso));
            if (progresso < 1) requestAnimationFrame(passo);
        }
        requestAnimationFrame(passo);
    }

    function rolarElemento(el, destino) {
        if (semMovimento.matches) { el.scrollTop = destino; return; }
        animarRolagem(function () { return el.scrollTop; }, function (v) { el.scrollTop = v; }, destino);
    }

    function rolarJanela(destino) {
        if (semMovimento.matches) { window.scrollTo(0, destino); return; }
        animarRolagem(function () { return window.scrollY; }, function (v) { window.scrollTo(0, v); }, destino);
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

    abas.forEach(function (aba) {
        aba.addEventListener('click', function () {
            guardarPosicaoDoPainel(aba.dataset.painel);
            mostrarPainel(aba.dataset.painel);
            // Restaurar posição de scroll do novo painel
            if (!duasColunas.matches) {
                var posicao = scrollPositions[aba.dataset.painel] || 0;
                window.scrollTo({ top: posicao, behavior: 'auto' });
            }
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
        if (normaAtiva && normaAtiva !== normaAlvo) normaAtiva.scrollTop = corpoDaLei.scrollTop;
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

        if (duasColunas.matches) {
            // O painel é o container de rolagem: posicionar o dispositivo no
            // topo dele, sem mexer na rolagem da página.
            var deslocamento = alvo.getBoundingClientRect().top -
                corpoEl.getBoundingClientRect().top + corpoEl.scrollTop - 12;
            rolarElemento(corpoEl, deslocamento);
        } else {
            // Em uma coluna quem rola é a página, e as abas e o topo do painel
            // ficam fixos: o dispositivo precisa parar abaixo deles.
            guardarPosicaoDoPainel(nomePainel);
            mostrarPainel(nomePainel);
            var fixos = alturaDosElementosFixos(painelEl);
            rolarJanela(alvo.getBoundingClientRect().top + window.scrollY - fixos - 8);
        }

        destacar(alvo);
        // Leva o foco junto com a rolagem, para quem navega por teclado ou
        // leitor de tela chegar ao dispositivo, e não continuar no comentário.
        alvo.setAttribute('tabindex', '-1');
        alvo.focus({ preventScroll: true });
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

    // Comparação sem acento e sem caixa: quem filtra por "principios" espera
    // achar "Princípios", e o teclado do celular não põe acento sozinho.
    function normalizar(texto) {
        return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

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
    }

    /* `comArtigos` só vale para o sumário da lei seca: no dos comentários os
       títulos das seções já são o conteúdo — e lá o sumário desce até o h4,
       para uma subseção longa ("Envolvimento humano significativo", dentro da
       seção sobre decisões automatizadas da LGPD) não ficar invisível no mapa
       do texto. Na lei seca o nível a mais é o artigo, que tem tratamento
       próprio (grupo recolhível), e h4/h5 lá são subdivisões de capítulo que
       só alongariam a lista.

       Devolve os títulos — e só eles —, porque é sobre títulos que a marcação
       de "seção atual" trabalha: com os artigos na conta, o capítulo em que o
       leitor está deixaria de ser destacado, e é ele que situa a leitura. */
    function construirSumario(lista, raiz, comArtigos, artigosAbertos) {
        lista.innerHTML = '';
        var seletor = comArtigos ? 'h2[id], h3[id], p.lei-artigo[id]' : 'h2[id], h3[id], h4[id]';
        var nos = Array.prototype.slice.call(raiz.querySelectorAll(seletor));
        var titulos = [];
        var ultimoPorNivel = {};
        var itemDoTitulo = null;
        var grupoDeArtigos = null;

        nos.forEach(function (no) {
            if (no.tagName === 'P') {
                if (!grupoDeArtigos) grupoDeArtigos = criarGrupoDeArtigos(itemDoTitulo, lista, artigosAbertos);
                acrescentarArtigo(grupoDeArtigos, no);
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

            titulos.push(no);
            itemDoTitulo = item;
            grupoDeArtigos = null;
        });
        return titulos;
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

    /* Seção em que o leitor está: o último título que já passou pela linha de
       leitura (o topo útil do painel, abaixo do que estiver fixo ali). Sem
       isso, abrir um sumário de 50 entradas não diz onde ele está — só para
       onde pode ir. Só é recalculado com o sumário aberto: fechado, o
       resultado não apareceria em lugar nenhum. */
    function marcarSumarioAtivo(sumario, painelEl, corpoEl) {
        if (!sumario || sumario.painel.hidden || !sumario.titulos.length) return;
        var linha = (duasColunas.matches
            ? corpoEl.getBoundingClientRect().top
            : alturaDosElementosFixos(painelEl)) + 8;
        var atual = sumario.titulos[0];
        sumario.titulos.forEach(function (titulo) {
            if (titulo.getBoundingClientRect().top <= linha) atual = titulo;
        });
        Array.prototype.forEach.call(sumario.lista.querySelectorAll('a'), function (link) {
            var eOAtual = decodeURIComponent(link.getAttribute('href').slice(1)) === atual.id;
            link.classList.toggle('nota-toc__atual', eOAtual);
            if (eOAtual) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
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
        var sumario = { painel: painelSumario, lista: lista, titulos: [] };

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
            var atual = lista.querySelector('.nota-toc__atual');
            if (atual) {
                // No sumário da lei seca, o capítulo em que o leitor está abre
                // com os artigos à mostra: é ali que ele vai procurar o
                // artigo vizinho ao que está lendo.
                var grupoAtual = atual.closest('li').querySelector(':scope > details');
                if (grupoAtual) grupoAtual.open = true;
                atual.scrollIntoView({ block: 'nearest' });
            }
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
            });
            // Esc num campo de busca limpa o texto em vez de propagar: só
            // fecha o sumário quando não há mais o que limpar.
            campo.addEventListener('keydown', function (evento) {
                if (evento.key !== 'Escape' || !campo.value) return;
                campo.value = '';
                filtrarSumario(lista, vazio, '');
                evento.stopPropagation();
            });
        }
        painelSumario.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape' && !ancorado()) fecharSumario(true);
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
        sumario.abrir = abrir;
        sumario.fechar = fecharSumario;
        return sumario;
    }

    var sumarioComentarios = configurarSumario('toc-comentarios-btn', 'toc-comentarios', comentarios, corpoDosComentarios, 'comentarios');
    var sumarioLei = configurarSumario('toc-lei-btn', 'toc-lei', lei, corpoDaLei, 'lei');

    if (sumarioComentarios) {
        sumarioComentarios.titulos = construirSumario(sumarioComentarios.lista, corpoDosComentarios, false);
    }

    function reconstruirSumarioLei() {
        if (!sumarioLei) return;
        var docAtivo = corpoDaLei.querySelector('.lei-doc:not([hidden])') || corpoDaLei;
        // A lista é outra: um filtro digitado para a norma anterior não diz
        // nada sobre esta, e deixá-lo ligado esconderia o sumário inteiro.
        sumarioLei.limparFiltro();
        sumarioLei.titulos = construirSumario(sumarioLei.lista, docAtivo, true, leituraAtiva() === 'lei');
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
        atualizarProgressos();
    }

    botoesLeitura.forEach(function (botao) {
        botao.addEventListener('click', function () {
            var alvo = botao.dataset.leituraPainel;
            aplicarLeitura(leituraAtiva() === alvo ? '' : alvo);
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

    corpoDosComentarios.addEventListener('scroll', atualizarProgressos, { passive: true });
    corpoDaLei.addEventListener('scroll', atualizarProgressos, { passive: true });
    window.addEventListener('scroll', atualizarProgressos, { passive: true });
    window.addEventListener('resize', atualizarProgressos);
    if (duasColunas.addEventListener) duasColunas.addEventListener('change', atualizarProgressos);
    atualizarProgressos();

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
