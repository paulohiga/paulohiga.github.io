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

    function getLang() { return root.getAttribute('data-lang'); }   // 'pt' | 'en'
    function getView() { return root.getAttribute('data-view'); }   // 'short' | 'full'
    function metaFor(lang, view) { return pageMeta[lang + '-' + view]; }

    // --- Theme Selector ---
    const themeIcon = themeToggle.querySelector('i');

    function setThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === null && prefersDark)) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        setThemeIcon(true);
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        setThemeIcon(false);
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            setThemeIcon(false);
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            setThemeIcon(true);
            localStorage.setItem('theme', 'dark');
        }
    });

    const formTranslations = {
        pt: {
            formTitle: 'Contato',
            formName: 'Nome:',
            formEmail: 'E-mail:',
            formMessage: 'Mensagem:',
            formSubmit: 'Enviar',
            contactButton: 'Entrar em contato',
            profession: 'Gestor Público',
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

    // Keep a bio toggle button (icon + ARIA) in sync with a given view.
    function syncBioButton(lang, view) {
        const btn = document.getElementById(`${lang}-bio-toggle`);
        if (!btn) return;
        const expanded = view === 'full';
        btn.setAttribute('aria-expanded', String(expanded));
        const icon = btn.querySelector('i');
        if (icon) icon.className = expanded
            ? 'fas fa-circle-minus bio-info-icon'
            : 'fas fa-circle-plus bio-info-icon';
    }

    function updateToolbar(lang) {
        langPt.classList.toggle('active', lang === 'pt');
        langEn.classList.toggle('active', lang === 'en');
    }

    // --- Language Selector (instant swap, mirrors the original behaviour) ---
    function setLanguage(lang) {
        if (lang === getLang()) return;
        const view = getView();
        root.setAttribute('data-lang', lang);
        updateToolbar(lang);
        syncBioButton(lang, view);
        updateFormLanguage(lang);
        applyHead(lang, view);
        localStorage.setItem('lang', lang);
        history.pushState({ lang, view }, '', metaFor(lang, view).url);
    }

    langPt.addEventListener('click', () => setLanguage('pt'));
    langEn.addEventListener('click', () => setLanguage('en'));

    // --- Bio Inline Toggle (short <-> full, animated) ---
    function toggleBio() {
        const lang = getLang();
        const goingFull = getView() === 'short';
        const shortEl = document.getElementById(`${lang}-bio-short`);
        const fullEl = document.getElementById(`${lang}-bio-full`);
        const expandBtn = document.getElementById(`${lang}-bio-toggle`);
        const fromEl = goingFull ? shortEl : fullEl;
        const toEl = goingFull ? fullEl : shortEl;
        const nextView = goingFull ? 'full' : 'short';
        const duration = prefersReducedMotion ? 0 : BIO_EXIT_MS;

        const commit = () => {
            fromEl.classList.remove('bio-exiting');
            root.setAttribute('data-view', nextView);
            toEl.classList.add('bio-entering');
            toEl.addEventListener('animationend', () => toEl.classList.remove('bio-entering'), { once: true });

            if (expandBtn) {
                expandBtn.setAttribute('aria-expanded', String(goingFull));
                const icon = expandBtn.querySelector('i');
                if (icon) icon.className = goingFull
                    ? 'fas fa-circle-minus bio-info-icon'
                    : 'fas fa-circle-plus bio-info-icon';
            }

            if (goingFull) {
                const collapseBtn = fullEl.querySelector('.bio-collapse-btn');
                if (collapseBtn) collapseBtn.focus();
            } else if (expandBtn) {
                expandBtn.focus();
            }

            applyHead(lang, nextView);
            localStorage.setItem('lang', lang);
            history.pushState({ lang, view: nextView }, '', metaFor(lang, nextView).url);
        };

        if (duration === 0) {
            commit();
            return;
        }
        fromEl.classList.add('bio-exiting');
        setTimeout(commit, duration);
    }

    document.querySelectorAll('.bio-toggle-btn, .bio-collapse-btn').forEach(btn => {
        btn.addEventListener('click', toggleBio);
    });

    // Photo button toggles bio (expand or collapse)
    document.getElementById('foto-btn').addEventListener('click', toggleBio);

    // --- Back/forward navigation: apply state instantly, no history push ---
    function stateFromPath(pathname) {
        const lang = pathname.startsWith('/en') ? 'en' : 'pt';
        const view = pathname.endsWith('/bio.html') ? 'full' : 'short';
        return { lang, view };
    }

    window.addEventListener('popstate', (e) => {
        const { lang, view } = e.state || stateFromPath(location.pathname);
        if (lang !== getLang()) {
            root.setAttribute('data-lang', lang);
            updateToolbar(lang);
            updateFormLanguage(lang);
        }
        root.setAttribute('data-view', view);
        syncBioButton(lang, view);
        applyHead(lang, view);
    });

    // --- Contact Form ---
    const formOverlay = document.getElementById('form-overlay');
    const contactForm = document.getElementById('contact-form');
    const contactLinks = document.querySelectorAll('.contact-link');
    const closeFormBtn = document.getElementById('close-form');
    const nameInput = document.getElementById('name');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    let formLastFocused = null;

    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
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
    updateFormLanguage(getLang());
    history.replaceState({ lang: getLang(), view: getView() }, '', location.pathname);
});
