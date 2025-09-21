document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');
    const ptVersion = document.getElementById('pt-version');
    const enVersion = document.getElementById('en-version');

    // Theme Selector
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === null && prefersDark)) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
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
    const contactLinks = document.querySelectorAll('.contact-link');
    const closeFormBtn = document.getElementById('close-form');

    const formTranslations = {
        pt: {
            formTitle: 'Contato',
            formName: 'Nome:',
            formEmail: 'E-mail:',
            formMessage: 'Mensagem:',
            formSubmit: 'Enviar',
            contactButton: 'Entrar em contato'
        },
        en: {
            formTitle: 'Contact',
            formName: 'Name:',
            formEmail: 'Email:',
            formMessage: 'Message:',
            formSubmit: 'Send',
            contactButton: 'Get in touch'
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
            const currentLang = document.getElementById('lang-pt').classList.contains('active') ? 'pt' : 'en';
            updateFormLanguage(currentLang);
            formOverlay.classList.add('visible');
        });
    });

    function closeForm() {
        formOverlay.classList.remove('visible');
    }

    closeFormBtn.addEventListener('click', closeForm);

    formOverlay.addEventListener('click', (e) => {
        if (e.target === formOverlay) {
            closeForm();
        }
    });

    // Hook into existing language switcher
    langPt.addEventListener('click', () => updateFormLanguage('pt'));
    langEn.addEventListener('click', () => updateFormLanguage('en'));
});