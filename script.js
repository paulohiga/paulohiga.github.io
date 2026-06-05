document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FOCUS_DELAY_MS = 50;
    const BIO_EXIT_MS = 200;

    const themeToggle = document.getElementById('theme-toggle');
    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');

    // Per-state metadata (title/description/canonical/url), shared with Jekyll.
    const pageMeta = JSON.parse(document.getElementById('page-meta').textContent);
    const internalUrls = new Set(Object.values(pageMeta).map(m => m.url));

    function getLang() { return root.getAttribute('data-lang'); }   // 'pt' | 'en'
    function getView() { return root.getAttribute('data-view'); }   // 'short' | 'full'
    function metaFor(lang, view) { return pageMeta[lang + '-' + view]; }

    // --- Theme Selector ---
    // The sun/moon glyphs are inline SVGs toggled purely via CSS
    // (body.dark-theme); JS only flips the theme class + persists the choice.
    // The initial theme is applied before first paint by an inline script in
    // the layout, so there is no work to do here on load.
    function toggleTheme() {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Both the toolbar toggle and the compact-hero toggle share this behaviour.
    themeToggle.addEventListener('click', toggleTheme);
    const compactTheme = document.getElementById('compact-theme');
    if (compactTheme) compactTheme.addEventListener('click', toggleTheme);

    // --- Full-bleed section banding ---
    // The Markdown renders a flat run of elements that are grouped into
    // full-bleed <section class="band"> wrappers by window.bandContent, defined
    // and first run (before paint) by an inline script in the layout. Here we
    // only re-band the content swapped in by in-page navigation.
    function enhanceSections() {
        window.bandContent(document.querySelector('.content-area > .bio-short, .content-area > .bio-full'));
    }

    // --- Scroll reveal ---
    let revealObserver = null;
    const supportsIO = 'IntersectionObserver' in window;

    function revealAll() {
        document.querySelectorAll('.band').forEach(b => b.classList.add('in-view'));
    }

    function initReveal() {
        if (prefersReducedMotion || !supportsIO) {
            revealAll();
            return;
        }
        if (revealObserver) revealObserver.disconnect();
        revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        document.querySelectorAll('.band').forEach(b => revealObserver.observe(b));
    }

    function applyEnhancements(revealMode) {
        enhanceSections();
        if (revealMode === 'all') revealAll();
        else initReveal();
    }

    // --- Sticky compact hero ---
    // Reveal the compact hero once the full hero has scrolled out of view.
    // The full hero is persistent chrome (not swapped on navigation), so this
    // is wired up once. The smooth slide is handled by CSS transitions.
    function initStickyHero() {
        const hero = document.querySelector('.hero');
        const compact = document.querySelector('.hero-compact');
        if (!hero || !compact) return;

        if (!supportsIO) {
            // Fallback: always show the compact hero (no scroll detection).
            document.body.classList.add('show-compact-hero');
            return;
        }
        const obs = new IntersectionObserver(entries => {
            document.body.classList.toggle('show-compact-hero', !entries[0].isIntersecting);
        }, { threshold: 0 });
        obs.observe(hero);

        // Clicking the name in the compact hero smoothly returns to the top.
        if (compactName) {
            compactName.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });
        }
    }

    const formTranslations = {
        pt: {
            formTitle: 'Contato',
            formName: 'Nome:',
            formEmail: 'E-mail:',
            formMessage: 'Mensagem:',
            formSubmit: 'Enviar',
            contactButton: 'Entrar em contato',
            profession: 'Gestor público',
            closeForm: 'Fechar formulário',
            errorNameRequired: 'Nome é obrigatório',
            errorEmailInvalid: 'Insira um e-mail válido',
            errorMessageRequired: 'Mensagem é obrigatória'
        },
        en: {
            formTitle: 'Contact',
            formName: 'Name:',
            formEmail: 'Email:',
            formMessage: 'Message:',
            formSubmit: 'Send',
            contactButton: 'Get in touch',
            profession: 'Public Manager',
            closeForm: 'Close form',
            errorNameRequired: 'Name is required',
            errorEmailInvalid: 'Please enter a valid email',
            errorMessageRequired: 'Message is required'
        }
    };

    function updateFormLanguage(lang) {
        const translations = formTranslations[lang];
        if (!translations) return;
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });
    }

    // --- Head metadata + URL for in-page (no-reload) navigation ---
    function setNamedMeta(name, content) {
        const el = document.querySelector(`meta[name="${name}"]`);
        if (el) el.setAttribute('content', content);
    }

    function setProperty(prop, content) {
        const el = document.querySelector(`meta[property="${prop}"]`);
        if (el) el.setAttribute('content', content);
    }

    function setCanonical(href) {
        const el = document.querySelector('link[rel="canonical"]');
        if (el) el.setAttribute('href', href);
    }

    function applyHead(lang, view) {
        const m = metaFor(lang, view);
        if (!m) return;
        document.title = m.title;
        root.lang = m.htmlLang;
        setNamedMeta('description', m.description);
        setCanonical(m.canonical);
        setProperty('og:title', m.title);
        setProperty('og:description', m.description);
        setProperty('og:url', m.canonical);
        setProperty('og:locale', m.ogLocale);
    }

    // Accessible label for the sidebar photo link, which toggles the bio view.
    function fotoLabel(lang, view) {
        if (lang === 'en') {
            return view === 'full' ? 'Collapse Paulo Higa biography' : 'Read the full biography of Paulo Higa';
        }
        return view === 'full' ? 'Recolher biografia de Paulo Higa' : 'Expandir biografia de Paulo Higa';
    }

    // The compact-hero language control is a single toggle: it shows (and
    // switches to) the other language.
    function langToggleCode(lang) { return lang === 'en' ? 'PT' : 'EN'; }
    function langToggleLabel(lang) { return lang === 'en' ? 'Switch to Portuguese' : 'Mudar para inglês'; }

    function setAriaCurrent(el, on) {
        if (on) el.setAttribute('aria-current', 'true');
        else el.removeAttribute('aria-current');
    }

    // Persistent chrome aria-labels that must follow the active language.
    const chromeLabels = {
        pt: { nav: 'Opções de visualização', theme: 'Alternar tema claro/escuro', backToTop: 'Voltar ao topo da página' },
        en: { nav: 'Display options', theme: 'Toggle light/dark theme', backToTop: 'Back to top of page' }
    };

    const toolbarNav = document.querySelector('nav.toolbar');
    const compactName = document.querySelector('.hero-compact__name');
    const compactLang = document.getElementById('compact-lang');

    function syncChromeLabels(lang) {
        const labels = chromeLabels[lang] || chromeLabels.pt;
        if (toolbarNav) toolbarNav.setAttribute('aria-label', labels.nav);
        if (themeToggle) themeToggle.setAttribute('aria-label', labels.theme);
        if (compactName) compactName.setAttribute('aria-label', labels.backToTop);
        if (compactTheme) compactTheme.setAttribute('aria-label', labels.theme);
    }

    // Keep the persistent chrome (toolbar + both photo links) in sync with the
    // active state, so their real-link targets stay correct. There are two
    // photo toggles — the main hero one and the compact sticky one.
    function syncChrome(lang, view) {
        langPt.classList.toggle('active', lang === 'pt');
        langEn.classList.toggle('active', lang === 'en');
        langPt.href = metaFor('pt', view).url;
        langEn.href = metaFor('en', view).url;
        setAriaCurrent(langPt, lang === 'pt');
        setAriaCurrent(langEn, lang === 'en');
        syncChromeLabels(lang);

        const oppositeView = view === 'full' ? 'short' : 'full';
        document.querySelectorAll('.foto-toggle').forEach(btn => {
            btn.href = metaFor(lang, oppositeView).url;
            btn.setAttribute('aria-label', fotoLabel(lang, view));
        });

        if (compactLang) {
            compactLang.textContent = langToggleCode(lang);
            compactLang.setAttribute('aria-label', langToggleLabel(lang));
        }
    }

    // --- In-page navigation (progressive enhancement over real links) ---
    // Each URL is a standalone page that renders only its own content block.
    // We fetch the target, swap in its .content-area, and update head/history
    // without a reload. Fetched fragments are cached (and prewarmed on hover),
    // so language swaps stay instant and bio toggles keep their animation.
    function stateFromPath(pathname) {
        const lang = pathname.startsWith('/en') ? 'en' : 'pt';
        // Match the full-bio permalink (/bio, /en/bio) plus the legacy
        // .html form and an optional trailing slash, so old links and
        // extensionless URLs both resolve to the full view.
        const view = /\/bio(\.html)?\/?$/.test(pathname) ? 'full' : 'short';
        return { lang, view };
    }

    const pageCache = new Map();
    function fetchContent(path) {
        if (pageCache.has(path)) return pageCache.get(path);
        const promise = fetch(path)
            .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
            .then(html => {
                const area = new DOMParser().parseFromString(html, 'text/html').querySelector('.content-area');
                if (!area) throw new Error('no .content-area');
                return area.innerHTML;
            })
            .catch(err => { pageCache.delete(path); throw err; });
        pageCache.set(path, promise);
        return promise;
    }

    let navToken = 0;
    function navigate(path, { push = true, animate } = {}) {
        const target = stateFromPath(path);
        const cur = { lang: getLang(), view: getView() };
        if (target.lang === cur.lang && target.view === cur.view) return;
        const doAnimate = animate !== undefined ? animate : (target.view !== cur.view);
        const myToken = ++navToken;

        fetchContent(path).then(html => {
            if (myToken !== navToken) return;   // a newer navigation superseded this one
            const contentArea = document.querySelector('.content-area');

            const commit = () => {
                contentArea.innerHTML = html;
                applyEnhancements('all');
                root.setAttribute('data-lang', target.lang);
                root.setAttribute('data-view', target.view);
                applyHead(target.lang, target.view);
                if (target.lang !== cur.lang) updateFormLanguage(target.lang);
                syncChrome(target.lang, target.view);
                localStorage.setItem('lang', target.lang);
                if (push) history.pushState(target, '', path);

                const block = contentArea.firstElementChild;
                if (doAnimate && !prefersReducedMotion && block) {
                    block.classList.add('bio-entering');
                    block.addEventListener('animationend', () => block.classList.remove('bio-entering'), { once: true });
                }

                // On view changes, move focus into the new content so the
                // transition is announced to assistive technology.
                if (doAnimate) {
                    const focusEl = target.view === 'full'
                        ? contentArea.querySelector('.bio-collapse-btn')
                        : document.getElementById(target.lang + '-bio-toggle');
                    if (focusEl) focusEl.focus();
                }
            };

            if (doAnimate && !prefersReducedMotion) {
                const oldBlock = contentArea.firstElementChild;
                if (oldBlock) oldBlock.classList.add('bio-exiting');
                setTimeout(commit, BIO_EXIT_MS);
            } else {
                commit();
            }
        }).catch(() => { window.location.href = path; });
    }

    function navTarget(el) {
        const link = el.closest && el.closest('a[data-nav]');
        if (!link) return null;
        const path = new URL(link.getAttribute('href'), location.origin).pathname;
        return internalUrls.has(path) ? path : null;
    }

    // Intercept clicks on internal nav links; let modified clicks (new tab,
    // download, etc.) and the no-JS path fall back to normal navigation.
    document.addEventListener('click', e => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const path = navTarget(e.target);
        if (!path) return;
        e.preventDefault();
        navigate(path);
    });

    // Warm the cache on hover/focus so the swap feels instant.
    function prewarm(e) {
        const path = navTarget(e.target);
        if (path) fetchContent(path).catch(() => {});
    }
    document.addEventListener('pointerover', prewarm);
    document.addEventListener('focusin', prewarm);

    // Compact-hero language toggle: switch to the other language, same view.
    if (compactLang) {
        compactLang.addEventListener('click', () => {
            const otherLang = getLang() === 'pt' ? 'en' : 'pt';
            navigate(metaFor(otherLang, getView()).url);
        });
    }

    window.addEventListener('popstate', () => {
        navigate(location.pathname, { push: false, animate: false });
    });

    // --- Contact Form ---
    const formOverlay = document.getElementById('form-overlay');
    const contactForm = document.getElementById('contact-form');
    const closeFormBtn = document.getElementById('close-form');
    const nameInput = document.getElementById('name');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    let formLastFocused = null;

    // Delegated handler so contact links inside dynamically swapped content
    // (e.g. the "e-mail" link in the summary) keep working after navigation.
    document.addEventListener('click', (e) => {
        const link = e.target.closest && e.target.closest('.contact-link');
        if (!link) return;
        e.preventDefault();
        updateFormLanguage(getLang());

        formLastFocused = document.activeElement;
        formOverlay.classList.add('visible');
        formOverlay.setAttribute('aria-hidden', 'false');

        clearFormErrors();

        if (formStatus) {
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }

        setTimeout(() => nameInput.focus(), FOCUS_DELAY_MS);
    });

    function closeForm() {
        formOverlay.classList.remove('visible');
        formOverlay.setAttribute('aria-hidden', 'true');
        if (formLastFocused) formLastFocused.focus();
    }

    closeFormBtn.addEventListener('click', closeForm);

    formOverlay.addEventListener('click', (e) => {
        if (e.target === formOverlay) {
            closeForm();
        }
    });

    function clearFormErrors() {
        contactForm.querySelectorAll('[aria-invalid]').forEach(input => {
            const errorEl = document.getElementById(`${input.id}-error`);
            if (errorEl) {
                errorEl.style.display = 'none';
                errorEl.textContent = '';
            }
            input.setAttribute('aria-invalid', 'false');
        });
    }

    function validateForm(lang = 'pt') {
        let isValid = true;
        const name = nameInput;
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const translations = formTranslations[lang];

        clearFormErrors();

        if (!name.value.trim()) {
            setFieldError('name', translations.errorNameRequired);
            isValid = false;
        }

        if (!email.value.trim() || !email.checkValidity()) {
            setFieldError('email', translations.errorEmailInvalid);
            isValid = false;
        }

        if (!message.value.trim()) {
            setFieldError('message', translations.errorMessageRequired);
            isValid = false;
        }

        return isValid;
    }

    function setFieldError(fieldId, errorText) {
        const errorEl = document.getElementById(`${fieldId}-error`);
        const input = document.getElementById(fieldId);
        errorEl.textContent = errorText;
        errorEl.style.display = 'block';
        input.setAttribute('aria-invalid', 'true');
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentLang = getLang();

        if (!validateForm(currentLang)) {
            formStatus.textContent = currentLang === 'pt' ? 'Por favor, corrija os erros no formulário.' : 'Please correct the errors in the form.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            return;
        }

        submitButton.disabled = true;
        const originalBtnText = submitButton.textContent;
        submitButton.textContent = currentLang === 'pt' ? 'Enviando...' : 'Sending...';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = currentLang === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                contactForm.reset();
                setTimeout(() => { closeForm(); }, 3000);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            formStatus.textContent = currentLang === 'pt' ? 'Ocorreu um erro. Tente novamente.' : 'An error occurred. Please try again.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalBtnText;
        }
    });

    // Focus trap inside Form Modal (WCAG 2.1.1, 2.1.2)
    contactForm.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        const elements = [closeFormBtn, ...contactForm.querySelectorAll('input, textarea, button[type="submit"]')];
        const focusable = elements.filter(el => !el.disabled);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && formOverlay.classList.contains('visible')) {
            closeForm();
        }
    });

    // --- Initial sync ---
    applyEnhancements('observe');
    initStickyHero();
    updateFormLanguage(getLang());
    history.replaceState({ lang: getLang(), view: getView() }, '', location.pathname);
});
