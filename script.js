document.addEventListener('DOMContentLoaded', () => {
    // Cache media query result once at startup
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Delay (ms) to allow modal reflow before moving focus
    const FOCUS_DELAY_MS = 50;

    const themeToggle = document.getElementById('theme-toggle');
    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');

    // Returns current active language ('pt' or 'en')
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

    function setLanguage(lang) {
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
    }

    const formOverlay = document.getElementById('form-overlay');
    const contactForm = document.getElementById('contact-form');
    const contactLinks = document.querySelectorAll('.contact-link');
    const closeFormBtn = document.getElementById('close-form');
    const nameInput = document.getElementById('name');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    let formLastFocused = null;

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

    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = getCurrentLanguage();
            updateFormLanguage(currentLang);
            
            formLastFocused = document.activeElement;
            formOverlay.classList.add('visible');
            formOverlay.setAttribute('aria-hidden', 'false');

            // Clear previous errors when opening form
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

    // Clear field errors when opening form
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

    // Validate form fields (WCAG 3.3.1, 3.3.4)
    function validateForm(lang = 'pt') {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const translations = formTranslations[lang];

        // Clear previous errors
        clearFormErrors();

        // Validate name
        if (!name.value.trim()) {
            setFieldError('name', translations.errorNameRequired);
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            setFieldError('email', translations.errorEmailInvalid);
            isValid = false;
        } else if (!email.value.includes('@') || !email.value.includes('.')) {
            setFieldError('email', translations.errorEmailInvalid);
            isValid = false;
        }

        // Validate message
        if (!message.value.trim()) {
            setFieldError('message', translations.errorMessageRequired);
            isValid = false;
        }

        return isValid;
    }

    // Set field error (WCAG 3.3.1)
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

        // Validate form before submission (WCAG 3.3.1, 3.3.4)
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

    // Hook into existing language switcher
    langPt.addEventListener('click', () => updateFormLanguage('pt'));
    langEn.addEventListener('click', () => updateFormLanguage('en'));

    // --- Analysis Modal (easter egg: click "Paulo Higa" in the intro) ---
    const analysisModal = document.getElementById('analysis-modal');
    const analysisModalInner = analysisModal.querySelector('.analysis-modal-inner');
    const closeAnalysisBtn = document.getElementById('close-analysis');
    const backToTopBtn = document.getElementById('back-to-top-analysis');
    let analysisLastFocused = null;

    analysisModal.addEventListener('scroll', () => {
        if (analysisModal.scrollTop > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        analysisModal.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    function openAnalysisModal() {
        const lang = getCurrentLanguage();

        // Show correct language pane
        document.getElementById('analysis-modal-pt').hidden = lang !== 'pt';
        document.getElementById('analysis-modal-en').hidden = lang !== 'en';

        analysisLastFocused = document.activeElement;
        analysisModal.setAttribute('aria-hidden', 'false');
        analysisModal.classList.add('visible');
        document.body.style.overflow = 'hidden';
        closeAnalysisBtn.focus();
    }

    function closeAnalysisModal() {
        analysisModal.classList.remove('visible');
        analysisModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (analysisLastFocused) analysisLastFocused.focus();
    }

    // Easter egg: clicking "Paulo Higa" link opens modal instead of PDF
    document.querySelectorAll('.analysis-modal-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            openAnalysisModal();
        });
    });

    // Make profile photo button open biography modal (<button> handles Enter/Space natively)
    document.getElementById('foto-btn').addEventListener('click', openAnalysisModal);

    closeAnalysisBtn.addEventListener('click', closeAnalysisModal);

    analysisModal.addEventListener('click', e => {
        if (e.target === analysisModal) closeAnalysisModal();
    });

    // Focus trap inside modal
    analysisModalInner.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        const focusable = analysisModalInner.querySelectorAll(
            'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
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
        if (e.key === 'Escape') {
            if (analysisModal.classList.contains('visible')) {
                closeAnalysisModal();
            } else if (formOverlay.classList.contains('visible')) {
                closeForm();
            }
        }
    });
});