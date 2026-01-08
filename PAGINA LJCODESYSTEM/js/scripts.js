document.addEventListener('DOMContentLoaded', () => {
    
    // Developer Modal Logic (Placed at top to ensure execution)
    const developerModal = document.getElementById('developer-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const developerCards = document.querySelectorAll('.desarrollador-card');

    if (developerCards.length > 0) {
        developerCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent bubbling if clicking links inside
                if (e.target.closest('a')) return;

                const nameElement = card.querySelector('h3');
                const infoElement = card.querySelector('.developer-info-hidden');

                if (nameElement && infoElement && modalBody && developerModal) {
                    const name = nameElement.textContent;
                    const info = infoElement.innerHTML;
                    
                    // Populate modal
                    modalBody.innerHTML = `<h3>${name}</h3>${info}`;
                    
                    // Show modal
                    developerModal.classList.add('show');
                } else {
                    console.error('Missing elements for modal');
                }
            });
        });
    }

    if (closeModal && developerModal) {
        closeModal.addEventListener('click', () => {
            developerModal.classList.remove('show');
        });
    }

    if (developerModal) {
        developerModal.addEventListener('click', (e) => {
            if (e.target === developerModal) {
                developerModal.classList.remove('show');
            }
        });
    }

    // Vanta.js background animation
    try {
        if (typeof VANTA !== 'undefined') {
            VANTA.NET({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x003366,
                backgroundColor: 0x001f3f,
                points: 10.00,
                maxDistance: 22.00,
                spacing: 16.00
            });
        }
    } catch (error) {
        console.error("Vanta error:", error);
    }
    
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    const techIconMap = {
        'html': 'fab fa-html5',
        'css': 'fab fa-css3-alt',
        'javascript': 'fab fa-js',
        'react': 'fab fa-react',
        'node.js': 'fab fa-node-js',
        'node': 'fab fa-node-js',
        'express': 'fas fa-server',
        'vue': 'fab fa-vuejs',
        'firebase': 'fas fa-fire',
        'angular': 'fab fa-angular',
        '.net': 'fab fa-microsoft',
        'python': 'fab fa-python',
        'django': 'fas fa-leaf',
        'java': 'fab fa-java',
        'spring boot': 'fas fa-leaf',
        'next.js': 'fas fa-bolt',
        'tailwind css': 'fas fa-wind',
        'vercel': 'fas fa-rocket',
        'hsts': 'fas fa-shield-halved'
    };

    function initProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            const githubUrl = card.getAttribute('data-github') || '';
            const liveUrl = card.getAttribute('data-live') || '';
            const imgEl = card.querySelector('.project-image img');
            const links = card.querySelectorAll('.project-links a');
            if (links[0]) {
                if (githubUrl) {
                    links[0].setAttribute('href', githubUrl);
                    links[0].setAttribute('rel', 'noopener noreferrer');
                } else {
                    links[0].setAttribute('href', '#');
                }
            }
            if (links[1]) {
                if (liveUrl) {
                    links[1].setAttribute('href', liveUrl);
                    links[1].setAttribute('rel', 'noopener noreferrer');
                } else {
                    links[1].setAttribute('href', '#');
                }
            }
            if (githubUrl && imgEl) {
                try {
                    const url = new URL(githubUrl);
                    const parts = url.pathname.split('/').filter(Boolean);
                    if (parts.length >= 2) {
                        const owner = parts[0];
                        const repo = parts[1];
                        const previewUrl = `https://opengraph.githubassets.com/preview/${owner}/${repo}`;
                        imgEl.src = previewUrl;
                        imgEl.alt = `${repo}`;
                    }
                } catch (e) {}
            }
            const techSpans = card.querySelectorAll('.project-tech span');
            techSpans.forEach(span => {
                const text = span.textContent.trim();
                const key = text.toLowerCase();
                const iconClass = techIconMap[key];
                if (iconClass) {
                    span.innerHTML = `<i class="${iconClass}"></i> ${text}`;
                }
            });
        });
    }

    initProjectCards();
    
    function initProjectsToggle() {
        const list = document.querySelector('.projects-list');
        const btn = document.getElementById('projects-toggle');
        if (!list || !btn) return;
        const visibleCountAttr = list.getAttribute('data-visible');
        const visibleCount = visibleCountAttr ? parseInt(visibleCountAttr, 10) : 3;
        const cards = Array.from(list.querySelectorAll('.project-card'));
        let expanded = false;
        function collapse() {
            cards.forEach((card, idx) => {
                if (idx >= visibleCount) {
                    card.classList.add('is-collapsed');
                    card.style.display = 'none';
                } else {
                    card.classList.remove('is-collapsed');
                    card.style.display = '';
                }
            });
            btn.textContent = getTranslation('see_more');
            btn.setAttribute('aria-expanded', 'false');
            expanded = false;
        }
        function expand() {
            cards.forEach(card => {
                card.classList.remove('is-collapsed');
                card.style.display = '';
            });
            btn.textContent = getTranslation('see_less');
            btn.setAttribute('aria-expanded', 'true');
            expanded = true;
        }
        if (cards.length <= visibleCount) {
            btn.style.display = 'none';
            return;
        }
        collapse();
        btn.addEventListener('click', () => {
            if (expanded) collapse(); else expand();
        });
    }
    initProjectsToggle();
    
    const translations = {
        es: {
            nav_about: 'Sobre Nosotros',
            nav_projects: 'Proyectos',
            nav_devs: 'Desarrolladores',
            nav_contact: 'Contacto',
            welcome_left_h2: 'Innovación y Desarrollo a tu Medida',
            welcome_left_p: 'Creamos soluciones de software que impulsan el crecimiento y la eficiencia de tu negocio. Desde aplicaciones web hasta sistemas complejos, nuestro equipo está listo para convertir tus ideas en realidad.',
            welcome_right_h2: 'Compromiso y Calidad Garantizada',
            welcome_right_p: 'Nos dedicamos a entregar productos de alta calidad, con un enfoque en la experiencia de usuario y un rendimiento excepcional. Tu éxito es nuestro principal objetivo.',
            projects_title: 'Mis Proyectos',
            devs_title: 'Nuestros Desarrolladores',
            contact_title: 'CONTACTANOS',
            dev_prompt: 'Click para ver info',
            see_more: 'Ver más',
            see_less: 'Ver menos',
            in_dev: 'En desarrollo',
            proj1_desc: 'Plataforma de torneos de fútbol en línea'
        },
        en: {
            nav_about: 'About Us',
            nav_projects: 'Projects',
            nav_devs: 'Developers',
            nav_contact: 'Contact',
            welcome_left_h2: 'Innovation and Tailored Development',
            welcome_left_p: 'We build software solutions that boost your business growth and efficiency. From web apps to complex systems, our team turns your ideas into reality.',
            welcome_right_h2: 'Commitment and Guaranteed Quality',
            welcome_right_p: 'We deliver high-quality products focused on user experience and performance. Your success is our main goal.',
            projects_title: 'My Projects',
            devs_title: 'Our Developers',
            contact_title: 'Contact Us',
            dev_prompt: 'Click to view info',
            see_more: 'See more',
            see_less: 'See less',
            in_dev: 'In development',
            proj1_desc: 'Online football tournaments platform'
        },
        pt: {
            nav_about: 'Sobre Nós',
            nav_projects: 'Projetos',
            nav_devs: 'Desenvolvedores',
            nav_contact: 'Contato',
            welcome_left_h2: 'Inovação e Desenvolvimento Sob Medida',
            welcome_left_p: 'Criamos soluções de software que impulsionam o crescimento e a eficiência do seu negócio. De apps web a sistemas complexos, transformamos suas ideias em realidade.',
            welcome_right_h2: 'Compromisso e Qualidade Garantida',
            welcome_right_p: 'Entregamos produtos de alta qualidade, focados em experiência do usuário e desempenho. Seu sucesso é nosso principal objetivo.',
            projects_title: 'Meus Projetos',
            devs_title: 'Nossos Desenvolvedores',
            contact_title: 'Contate-nos',
            dev_prompt: 'Clique para ver info',
            see_more: 'Ver mais',
            see_less: 'Ver menos',
            in_dev: 'Em desenvolvimento',
            proj1_desc: 'Plataforma de torneios de futebol online'
        }
    };

    function getCurrentLang() {
        const stored = localStorage.getItem('lang') || 'es';
        return stored;
    }
    function setCurrentLang(lang) {
        localStorage.setItem('lang', lang);
    }
    function getTranslation(key) {
        const lang = getCurrentLang();
        const t = translations[lang] || translations.es;
        return t[key] || translations.es[key] || '';
    }
    function applyTranslations() {
        const lang = getCurrentLang();
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getTranslation(key);
            if (value) el.textContent = value;
        });
        const btn = document.getElementById('projects-toggle');
        if (btn) {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.textContent = expanded ? getTranslation('see_less') : getTranslation('see_more');
        }
        const select = document.getElementById('lang-switcher');
        if (select) select.value = lang;
    }
    const langSelect = document.getElementById('lang-switcher');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            setCurrentLang(lang);
            applyTranslations();
        });
    }
    applyTranslations();
    

    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const popup = document.getElementById('popup-message');

    if (popup) { // Check if popup exists
        portfolioLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                popup.classList.add('show');
            });
        });

        popup.addEventListener('click', (e) => {
            if (e.target.id === 'popup-message') {
                popup.classList.remove('show');
            }
        });
    }
});
