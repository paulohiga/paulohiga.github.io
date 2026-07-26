/* Comportamento da seção de notas (/notas). Tudo aqui é melhoria progressiva:
   sem JavaScript a página continua completa — os dois painéis aparecem
   empilhados e os links de referência funcionam como âncoras normais do
   navegador. Este arquivo é independente do script.js do restante do site. */
(function () {
    'use strict';

    var comentarios = document.getElementById('comentarios');
    var lei = document.getElementById('lei');
    if (!comentarios || !lei) return;

    var corpoDaLei = lei.querySelector('.painel__corpo');
    var duasColunas = matchMedia('(min-width: 900px)');
    var semMovimento = matchMedia('(prefers-reduced-motion: reduce)');
    var destacado = null;

    /* --- Tema (mesma chave usada no restante do site) --- */
    var botaoTema = document.getElementById('theme-toggle');
    if (botaoTema) {
        botaoTema.addEventListener('click', function () {
            var escuro = document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme', !escuro);
            localStorage.setItem('theme', escuro ? 'dark' : 'light');
        });
    }

    /* --- Abas, quando os painéis não cabem lado a lado --- */
    var abas = Array.prototype.slice.call(document.querySelectorAll('[data-painel]'));

    function mostrarPainel(nome) {
        document.body.setAttribute('data-painel-ativo', nome);
        abas.forEach(function (aba) {
            aba.setAttribute('aria-pressed', String(aba.dataset.painel === nome));
        });
    }

    abas.forEach(function (aba) {
        aba.addEventListener('click', function () {
            mostrarPainel(aba.dataset.painel);
            window.scrollTo({ top: 0, behavior: 'auto' });
        });
    });

    /* --- Seletor de normas, quando a nota exibe mais de uma (ex.: a lei e um
       decreto que a regulamenta). Um <select> nativo, não uma aba por norma:
       não degrada com o número de normas (ver nota-style.css). A norma
       principal já vem pronta no HTML; as demais só são buscadas (fetch) na
       primeira vez em que o leitor as seleciona — o <select> em si funciona
       sem JavaScript, mas escolher uma norma diferente não tem efeito sem
       ele. Ver a seção "Múltiplas normas por nota" do AGENTS.md. */
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

    function ativarNorma(normaAlvo) {
        normas.forEach(function (norma) {
            norma.doc.hidden = norma !== normaAlvo;
        });
        if (fonteLink) fonteLink.href = normaAlvo.fonte;
        if (seletorNorma.value !== normaAlvo.opcao.value) seletorNorma.value = normaAlvo.opcao.value;
        corpoDaLei.scrollTop = 0;
    }

    function carregarNorma(norma, pronto) {
        if (!norma.fragmento) { pronto(); return; }
        fetch(norma.fragmento).then(function (resposta) {
            if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
            return resposta.text();
        }).then(function (html) {
            norma.doc.innerHTML = html;
            norma.fragmento = null;
            pronto();
        }).catch(function () {
            norma.doc.innerHTML = '<p>Não foi possível carregar este texto agora. ' +
                '<a href="' + norma.fonte + '" target="_blank" rel="noopener">Consulte a fonte oficial</a>.</p>';
            pronto();
        });
    }

    if (seletorNorma) {
        seletorNorma.addEventListener('change', function () {
            var normaAlvo = normas[seletorNorma.selectedIndex];
            ativarNorma(normaAlvo);
            carregarNorma(normaAlvo, function () {});
        });
    }

    // Dado um id de âncora, encontra a norma (extra) a que ele pertence pelo
    // prefixo do seu id — a principal não tem prefixo e já está carregada.
    function normaDoId(id) {
        return normas.filter(function (norma) {
            return norma.prefixo && id.indexOf(norma.prefixo + '-') === 0;
        })[0];
    }

    /* --- Ir até um dispositivo da lei --- */
    function alturaDosElementosFixos() {
        var barraDeAbas = document.querySelector('.nota-abas');
        var topoDoPainel = lei.querySelector('.painel__topo');
        var altura = 0;
        if (barraDeAbas && getComputedStyle(barraDeAbas).display !== 'none') altura += barraDeAbas.offsetHeight;
        if (topoDoPainel) altura += topoDoPainel.offsetHeight;
        return altura;
    }

    function destacar(alvo) {
        if (destacado) destacado.classList.remove('lei-destacado');
        alvo.classList.add('lei-destacado');
        destacado = alvo;
    }

    function irPara(id) {
        var alvo = id ? document.getElementById(id) : null;
        if (!alvo || !lei.contains(alvo)) return false;

        var rolagem = semMovimento.matches ? 'auto' : 'smooth';

        if (duasColunas.matches) {
            // O painel é o container de rolagem: posicionar o dispositivo no
            // topo dele, sem mexer na rolagem da página.
            var deslocamento = alvo.getBoundingClientRect().top -
                corpoDaLei.getBoundingClientRect().top + corpoDaLei.scrollTop - 12;
            corpoDaLei.scrollTo({ top: deslocamento, behavior: rolagem });
        } else {
            // Em uma coluna quem rola é a página, e as abas e o topo do painel
            // ficam fixos: o dispositivo precisa parar abaixo deles.
            mostrarPainel('lei');
            var fixos = alturaDosElementosFixos();
            window.scrollTo({
                top: alvo.getBoundingClientRect().top + window.scrollY - fixos - 8,
                behavior: rolagem
            });
        }

        destacar(alvo);
        // Leva o foco junto com a rolagem, para quem navega por teclado ou
        // leitor de tela chegar ao dispositivo, e não continuar no comentário.
        alvo.setAttribute('tabindex', '-1');
        alvo.focus({ preventScroll: true });
        return true;
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
       Aceita as formas usadas nas citações: "5", "5º", "art. 5º, V", "55-A". */
    function idDoTermo(termo) {
        var texto = termo.toLowerCase().replace(/^art\.?\s*/, '').trim();
        var partes = texto.match(/^(\d+)(?:\s*-\s*([a-z]))?\s*[º°.]?(?:[,\s]+([ivxlc]+(?:-[a-z])?))?$/);
        if (!partes) return null;
        return 'art-' + partes[1] + (partes[2] ? '-' + partes[2] : '') + (partes[3] ? '-' + partes[3] : '');
    }

    var busca = document.querySelector('.lei-ir');
    if (busca) {
        var campo = busca.querySelector('input');
        busca.addEventListener('submit', function (evento) {
            evento.preventDefault();
            var encontrou = irPara(idDoTermo(campo.value));
            campo.setAttribute('aria-invalid', String(!encontrou));
        });
        campo.addEventListener('input', function () {
            campo.removeAttribute('aria-invalid');
        });
    }

    /* --- Link compartilhado com âncora (/notas/lgpd#art-5-v) --- */
    if (location.hash) {
        var idInicial = decodeURIComponent(location.hash.slice(1));
        var normaInicial = normaDoId(idInicial);
        if (normaInicial) {
            ativarNorma(normaInicial);
            carregarNorma(normaInicial, function () { irPara(idInicial); });
        } else {
            irPara(idInicial);
        }
    }
}());
