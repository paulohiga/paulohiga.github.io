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

    /* --- Página de definições normativas: a mesma lista se reorganiza sem
       duplicar cartões no HTML. Sem JS permanece a ordem alfabética. --- */
    var listaDefinicoes = document.getElementById('lista-definicoes');
    if (listaDefinicoes) {
        var cardsDefinicoes = Array.prototype.slice.call(listaDefinicoes.querySelectorAll('.definicao-card'));
        var indiceDefinicoes = document.getElementById('definicoes-indice-lista');
        var itensIndice = Object.create(null);
        Array.prototype.forEach.call(indiceDefinicoes.querySelectorAll('.definicoes-nav__item'), function (item) {
            itensIndice[item.dataset.alvo] = item;
        });
        var ordemDefinicoes = 'alfabetica';
        var soBrasil = document.getElementById('definicoes-so-brasil');
        var buscaDefinicoes = document.getElementById('definicoes-busca');
        var cardsVisiveis = cardsDefinicoes;
        var quadroPendente = false;
        var indiceTravado = '';
        var destravarIndice = 0;
        var preservarIndicePorFoco = false;

        function textoComparavel(texto) {
            return (texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        }

        function redesenharDefinicoes() {
            Array.prototype.forEach.call(listaDefinicoes.querySelectorAll('.definicoes-grupo, .definicao-card--clone'), function (elemento) {
                elemento.remove();
            });
            Array.prototype.forEach.call(indiceDefinicoes.querySelectorAll('.definicoes-nav__grupo, .definicoes-nav__item--clone'), function (elemento) {
                elemento.remove();
            });
            /* Os itens do índice também são remontados. Se os antigos ficam
               no DOM, os que o filtro escondeu permanecem antes dos visíveis
               (e o display do link pode prevalecer sobre o atributo hidden). */
            Array.prototype.forEach.call(indiceDefinicoes.querySelectorAll('.definicoes-nav__item'), function (item) {
                item.remove();
            });
            var busca = textoComparavel(buscaDefinicoes.value.trim());
            var visiveis = cardsDefinicoes.filter(function (card) {
                var aparece = (!soBrasil.checked || card.dataset.jurisdicao === 'BR') &&
                    (!busca || textoComparavel(card.dataset.busca).indexOf(busca) !== -1);
                card.hidden = !aparece;
                itensIndice[card.id].hidden = !aparece;
                return aparece;
            });
            var entradas = [];
            visiveis.forEach(function (card) {
                var grupos = ordemDefinicoes === 'tema'
                    ? card.dataset.notas.split(' · ')
                    : [ordemDefinicoes === 'mencoes' ? 'Mais citados' : card.dataset.letra];
                grupos.forEach(function (grupo, indice) {
                    entradas.push({ card: card, grupo: grupo, indice: indice });
                });
            });
            entradas.sort(function (a, b) {
                return a.grupo.localeCompare(b.grupo, 'pt-BR') ||
                    (ordemDefinicoes === 'mencoes'
                        ? Number(b.card.dataset.mencoes) - Number(a.card.dataset.mencoes)
                        : a.card.querySelector('h3').textContent.localeCompare(b.card.querySelector('h3').textContent, 'pt-BR'));
            });
            var grupoAnterior = '';
            entradas.forEach(function (entrada) {
                var card = entrada.indice === 0 ? entrada.card : entrada.card.cloneNode(true);
                if (entrada.indice > 0) {
                    card.removeAttribute('id');
                    card.classList.add('definicao-card--clone');
                    card.setAttribute('aria-hidden', 'true');
                }
                var grupo = entrada.grupo;
                if (grupo !== grupoAnterior) {
                    var titulo = document.createElement('h2');
                    titulo.className = 'definicoes-grupo';
                    titulo.dataset.grupo = grupo;
                    titulo.textContent = grupo;
                    listaDefinicoes.appendChild(titulo);
                    var tituloIndice = document.createElement('h3');
                    tituloIndice.className = 'definicoes-nav__grupo';
                    tituloIndice.dataset.grupo = grupo;
                    tituloIndice.textContent = grupo;
                    indiceDefinicoes.appendChild(tituloIndice);
                    grupoAnterior = grupo;
                }
                listaDefinicoes.appendChild(card);
                var itemIndice = entrada.indice === 0 ? itensIndice[entrada.card.id] : itensIndice[entrada.card.id].cloneNode(true);
                if (entrada.indice > 0) itemIndice.classList.add('definicoes-nav__item--clone');
                indiceDefinicoes.appendChild(itemIndice);
            });
            cardsVisiveis = visiveis;
            document.getElementById('definicoes-vazio').hidden = visiveis.length !== 0;
            marcarIndiceAtual();
        }

        function marcarIndiceAtual(idPreferido) {
            if (!cardsVisiveis.length) return;
            var atual = idPreferido && itensIndice[idPreferido] ? document.getElementById(idPreferido) : null;
            if (!atual || atual.hidden) {
                atual = cardsVisiveis[0];
                var pontoLeitura = Math.min(96, Math.max(32, innerHeight * 0.08));
                var menorDistancia = Infinity;
                for (var i = 0; i < cardsVisiveis.length; i += 1) {
                    var card = cardsVisiveis[i];
                    var quadroCard = card.getBoundingClientRect();
                    if (quadroCard.top <= pontoLeitura && quadroCard.bottom > pontoLeitura) {
                        atual = card;
                        break;
                    }
                    var distancia = quadroCard.top > pontoLeitura
                        ? quadroCard.top - pontoLeitura
                        : pontoLeitura - quadroCard.bottom;
                    if (distancia < menorDistancia) {
                        menorDistancia = distancia;
                        atual = card;
                    }
                }
            }
            Array.prototype.forEach.call(indiceDefinicoes.querySelectorAll('.definicoes-nav__item[aria-current]'), function (item) {
                item.removeAttribute('aria-current');
            });
            var itemAtual = itensIndice[atual.id];
            itemAtual.setAttribute('aria-current', 'location');
            if (!(preservarIndicePorFoco && indiceDefinicoes.contains(document.activeElement))) {
                var quadroLista = indiceDefinicoes.getBoundingClientRect();
                var quadroItem = itemAtual.getBoundingClientRect();
                if (quadroItem.top < quadroLista.top || quadroItem.bottom > quadroLista.bottom) {
                    indiceDefinicoes.scrollTop += quadroItem.top - quadroLista.top - indiceDefinicoes.clientHeight / 3;
                }
            }
        }

        Array.prototype.forEach.call(document.querySelectorAll('input[name="ordem-definicoes"]'), function (radio) {
            radio.addEventListener('change', function () {
                ordemDefinicoes = radio.value;
                redesenharDefinicoes();
            });
        });
        soBrasil.addEventListener('change', redesenharDefinicoes);
        buscaDefinicoes.addEventListener('input', redesenharDefinicoes);
        indiceDefinicoes.addEventListener('keydown', function () {
            preservarIndicePorFoco = true;
        });
        indiceDefinicoes.addEventListener('pointerdown', function () {
            preservarIndicePorFoco = false;
        });
        indiceDefinicoes.addEventListener('focusout', function (evento) {
            if (!indiceDefinicoes.contains(evento.relatedTarget)) preservarIndicePorFoco = false;
        });
        Array.prototype.forEach.call(indiceDefinicoes.querySelectorAll('.definicoes-nav__item'), function (item) {
            item.addEventListener('click', function () {
                indiceTravado = item.dataset.alvo;
                clearTimeout(destravarIndice);
                marcarIndiceAtual(item.dataset.alvo);
                destravarIndice = setTimeout(function () {
                    indiceTravado = '';
                    marcarIndiceAtual();
                }, 700);
            });
        });
        addEventListener('scroll', function () {
            if (quadroPendente) return;
            quadroPendente = true;
            requestAnimationFrame(function () {
                marcarIndiceAtual(indiceTravado || undefined);
                quadroPendente = false;
            });
        }, { passive: true });
    }

    /* --- Definições dentro dos comentários. Cada termo aparece no máximo
       uma vez por seção e quatro vezes por nota; o texto continua leve, mas
       termos recorrentes como "rede social" voltam a ficar alcançáveis. --- */
    var indiceDefinicoesEl = document.getElementById('definicoes-indice');
    var dialogDefinicao = document.getElementById('definicao-dialog');
    if (indiceDefinicoesEl && dialogDefinicao) {
        var indiceDefinicoes = JSON.parse(indiceDefinicoesEl.textContent);
        var porTermo = Object.create(null);
        var contagemDefinicoes = Object.create(null);
        var termosDefinicoes = [];
        indiceDefinicoes.forEach(function (verbete) {
            verbete.termos.forEach(function (termo) {
                if (termo.length < 8) return;
                porTermo[termo.toLocaleLowerCase('pt-BR')] = verbete;
                termosDefinicoes.push(termo);
            });
        });
        termosDefinicoes.sort(function (a, b) { return b.length - a.length; });
        var escaparRegex = function (texto) { return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
        var regexDefinicoes = termosDefinicoes.length
            ? new RegExp('(^|[^\\p{L}\\p{N}])(' + termosDefinicoes.map(escaparRegex).join('|') + ')(?=$|[^\\p{L}\\p{N}])', 'giu')
            : null;
        var ignorarDefinicaoEm = 'A, BUTTON, CODE, PRE, SCRIPT, STYLE, TEXTAREA, INPUT, SELECT, H1, H2, H3, H4, H5, H6, .nota-aviso, .footnotes';

        function marcarTextoDefinido(no, vistosNaSecao) {
            if (!regexDefinicoes || !no.nodeValue.trim() || no.parentElement.closest(ignorarDefinicaoEm)) return;
            regexDefinicoes.lastIndex = 0;
            var texto = no.nodeValue;
            var fragmento = document.createDocumentFragment();
            var ultimo = 0;
            var alterou = false;
            var casamento;
            while ((casamento = regexDefinicoes.exec(texto))) {
                var prefixo = casamento[1];
                var palavra = casamento[2];
                var verbete = porTermo[palavra.toLocaleLowerCase('pt-BR')];
                var inicioPalavra = casamento.index + prefixo.length;
                if (!verbete || vistosNaSecao[verbete.id] || (contagemDefinicoes[verbete.id] || 0) >= 4) continue;
                fragmento.appendChild(document.createTextNode(texto.slice(ultimo, inicioPalavra)));
                var botao = document.createElement('a');
                botao.href = '/notas/definicoes#' + verbete.id;
                botao.className = 'definicao-termo' + (verbete.jurisdicao === 'UE' ? ' definicao-termo--ue' : '');
                botao.dataset.definicao = verbete.id;
                botao.setAttribute('aria-label', 'Abrir definição normativa de ' + palavra);
                botao.setAttribute('aria-haspopup', 'dialog');
                botao.setAttribute('aria-controls', 'definicao-dialog');
                botao.textContent = palavra;
                fragmento.appendChild(botao);
                ultimo = inicioPalavra + palavra.length;
                vistosNaSecao[verbete.id] = true;
                contagemDefinicoes[verbete.id] = (contagemDefinicoes[verbete.id] || 0) + 1;
                alterou = true;
            }
            if (!alterou) return;
            fragmento.appendChild(document.createTextNode(texto.slice(ultimo)));
            no.replaceWith(fragmento);
        }

        var vistosNaSecao = Object.create(null);
        var corpoComentariosDefinicoes = document.querySelector('.painel--comentarios .painel__corpo');
        Array.prototype.forEach.call(corpoComentariosDefinicoes.querySelectorAll('*'), function (elemento) {
            if (elemento.tagName === 'H2') vistosNaSecao = Object.create(null);
            Array.prototype.slice.call(elemento.childNodes).forEach(function (no) {
                if (no.nodeType === Node.TEXT_NODE) marcarTextoDefinido(no, vistosNaSecao);
            });
        });

        var bancoDefinicoes = null;
        var focoAntesDaDefinicao = null;
        function criarReferenciaDefinicao(referencia) {
            var linha = document.createElement('p');
            linha.className = 'definicao-referencia' + (referencia.jurisdicao === 'UE' ? ' definicao-referencia--ue' : '');
            var juris = document.createElement('span');
            juris.textContent = referencia.jurisdicao === 'BR' ? 'Brasil' : 'União Europeia';
            var nota = document.createElement('a');
            nota.className = 'definicao-referencia__nota';
            nota.href = referencia.nota_url;
            nota.textContent = referencia.norma_apelido;
            var dispositivo = document.createElement('a');
            dispositivo.className = 'definicao-referencia__dispositivo';
            dispositivo.href = referencia.url;
            dispositivo.textContent = referencia.dispositivo;
            linha.append(juris, nota, dispositivo);
            return linha;
        }

        function preencherDialog(verbete) {
            dialogDefinicao.querySelector('h2').textContent = verbete.titulo;
            var corpo = dialogDefinicao.querySelector('.definicao-dialog__corpo');
            corpo.replaceChildren();
            /* O comentário é escrito em pt-BR e o verbete guarda a literalidade
               do EUR-Lex, em PT-PT: quem clica em "fornecedor" precisa ver, no
               alto do diálogo, que o termo da norma é «Prestador». */
            if (verbete.equivalentes && verbete.equivalentes.length) {
                var equivalentes = document.createElement('p');
                equivalentes.className = 'definicao-equivalentes';
                var rotulo = document.createElement('span');
                rotulo.textContent = 'No Brasil';
                equivalentes.append(rotulo, verbete.equivalentes.join(' · '));
                corpo.appendChild(equivalentes);
            }
            verbete.definicoes.forEach(function (definicao) {
                var bloco = document.createElement('section');
                bloco.className = 'definicao-dialog__fonte';
                var texto = document.createElement('p');
                texto.className = 'definicao-dialog__texto';
                texto.textContent = definicao.texto;
                bloco.appendChild(texto);
                definicao.referencias.forEach(function (referencia) {
                    bloco.appendChild(criarReferenciaDefinicao(referencia));
                });
                corpo.appendChild(bloco);
            });
            marcarLinksExternos(corpo);
        }

        document.addEventListener('click', function (evento) {
            var botao = evento.target.closest('.definicao-termo');
            if (!botao) return;
            evento.preventDefault();
            focoAntesDaDefinicao = botao;
            var abrir = function () {
                var verbete = bancoDefinicoes.filter(function (item) { return item.id === botao.dataset.definicao; })[0];
                if (!verbete) return;
                preencherDialog(verbete);
                dialogDefinicao.showModal();
            };
            if (bancoDefinicoes) abrir();
            else fetch('/notas/definicoes.json').then(function (resposta) {
                if (!resposta.ok) throw new Error('Falha ao carregar definições');
                return resposta.json();
            }).then(function (dados) { bancoDefinicoes = dados; abrir(); });
        });
        dialogDefinicao.querySelector('.definicao-dialog__fechar').addEventListener('click', function () {
            dialogDefinicao.close();
        });
        dialogDefinicao.addEventListener('click', function (evento) {
            if (evento.target === dialogDefinicao) dialogDefinicao.close();
            var dispositivo = evento.target.closest('.definicao-referencia__dispositivo');
            if (dispositivo && navegarParaDispositivo(evento, dispositivo)) dialogDefinicao.close();
        });
        dialogDefinicao.addEventListener('close', function () {
            if (focoAntesDaDefinicao) focoAntesDaDefinicao.focus();
        });
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

    /* Links para dispositivos podem aparecer fora do painel de comentários —
       por exemplo, nas referências do diálogo de definições. Resolva também
       URLs completas da própria nota, para que esses links usem a mesma troca
       de norma, carga sob demanda e rolagem das remissões escritas no texto. */
    function navegarParaDispositivo(evento, link) {
        var destino;
        try { destino = new URL(link.href, location.href); } catch (erro) { return false; }
        var caminhoAtual = location.pathname.replace(/\/+$/, '');
        var caminhoDestino = destino.pathname.replace(/\/+$/, '');
        if (destino.origin !== location.origin || caminhoDestino !== caminhoAtual || !destino.hash) return false;

        var id = decodeURIComponent(destino.hash.slice(1));
        var normaAlvo = normaDoId(id);
        /* Para a norma principal o alvo já está no HTML; preserve o
           comportamento nativo de uma âncora desconhecida. Uma norma extra
           pode ainda estar aguardando o fetch, então o prefixo basta para
           deixá-la seguir pelo carregamento sob demanda. */
        if (!normaAlvo || (!normaAlvo.prefixo && !document.getElementById(id))) return false;

        evento.preventDefault();
        ativarNorma(normaAlvo);
        carregarNorma(normaAlvo, function () {
            if (irPara(id)) history.replaceState(null, '', '#' + id);
        });
        return true;
    }

    comentarios.addEventListener('click', function (evento) {
        var link = evento.target.closest('a[href]');
        if (!link) return;
        navegarParaDispositivo(evento, link);
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
