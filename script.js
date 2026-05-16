document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FOCUS_DELAY_MS = 50;

    const themeToggle = document.getElementById('theme-toggle');
    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');

    function getCurrentLanguage() {
        return langPt.classList.contains('active') ? 'pt' : 'en';
    }
    const ptVersion = document.getElementById('pt-version');
    const enVersion = document.getElementById('en-version');

    // Theme Selector
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

    // Language Selector
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('en')) {
        setLanguage('en');
    } else {
        setLanguage('pt');
    }

    langPt.addEventListener('click', () => setLanguage('pt'));
    langEn.addEventListener('click', () => setLanguage('en'));

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

    function setLanguage(lang) {
        collapseBio('pt');
        collapseBio('en');

        if (lang === 'pt') {
            ptVersion.style.display = 'block';
            enVersion.style.display = 'none';
            langPt.classList.add('active');
            langEn.classList.remove('active');
            document.documentElement.lang = 'pt-BR';
        } else {
            ptVersion.style.display = 'none';
            enVersion.style.display = 'block';
            langEn.classList.add('active');
            langPt.classList.remove('active');
            document.documentElement.lang = 'en-US';
        }
        updateFormLanguage(lang);
    }

    // Contact Form
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
            const currentLang = getCurrentLanguage();
            updateFormLanguage(currentLang);

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
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const translations = formTranslations[lang];

        clearFormErrors();

        if (!name.value.trim()) {
            setFieldError('name', translations.errorNameRequired);
            isValid = false;
        }

        if (!email.value.trim()) {
            setFieldError('email', translations.errorEmailInvalid);
            isValid = false;
        } else if (!email.value.includes('@') || !email.value.includes('.')) {
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
        const currentLang = getCurrentLanguage();

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

    // --- Bio Inline Toggle ---
    function collapseBio(lang) {
        const shortEl = document.getElementById(`${lang}-bio-short`);
        const fullEl = document.getElementById(`${lang}-bio-full`);
        if (!shortEl || !fullEl || !fullEl.hidden) return;
        fullEl.hidden = true;
        shortEl.hidden = false;
        const expandBtn = document.getElementById(`${lang}-bio-toggle`);
        if (expandBtn) {
            expandBtn.setAttribute('aria-expanded', 'false');
            const icon = expandBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-circle-plus bio-info-icon';
        }
    }

    function toggleBio(lang) {
        const shortEl = document.getElementById(`${lang}-bio-short`);
        const fullEl = document.getElementById(`${lang}-bio-full`);
        const expandBtn = document.getElementById(`${lang}-bio-toggle`);
        const isExpanded = !fullEl.hidden;
        const duration = prefersReducedMotion ? 0 : 200;

        if (isExpanded) {
            fullEl.classList.add('bio-exiting');
            setTimeout(() => {
                fullEl.hidden = true;
                fullEl.classList.remove('bio-exiting');
                shortEl.hidden = false;
                shortEl.classList.add('bio-entering');
                shortEl.addEventListener('animationend', () => shortEl.classList.remove('bio-entering'), { once: true });
                if (expandBtn) {
                    expandBtn.setAttribute('aria-expanded', 'false');
                    const icon = expandBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-circle-plus bio-info-icon';
                    expandBtn.focus();
                }
            }, duration);
        } else {
            shortEl.classList.add('bio-exiting');
            setTimeout(() => {
                shortEl.hidden = true;
                shortEl.classList.remove('bio-exiting');
                fullEl.hidden = false;
                fullEl.classList.add('bio-entering');
                fullEl.addEventListener('animationend', () => fullEl.classList.remove('bio-entering'), { once: true });
                if (expandBtn) {
                    expandBtn.setAttribute('aria-expanded', 'true');
                    const icon = expandBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-circle-minus bio-info-icon';
                }
                const collapseBtn = fullEl.querySelector('.bio-collapse-btn');
                if (collapseBtn) collapseBtn.focus();
            }, duration);
        }
    }

    document.querySelectorAll('.bio-toggle-btn, .bio-collapse-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = getCurrentLanguage();
            toggleBio(lang);
        });
    });

    // Photo button expands bio if not already expanded
    document.getElementById('foto-btn').addEventListener('click', () => {
        const lang = getCurrentLanguage();
        const fullEl = document.getElementById(`${lang}-bio-full`);
        if (fullEl && fullEl.hidden) toggleBio(lang);
    });
});
