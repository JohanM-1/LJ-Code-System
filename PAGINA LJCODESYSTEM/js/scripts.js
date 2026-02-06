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
        'python': 'fab fa-python',
        'java': 'fab fa-java',
        'c#': 'fas fa-code',
        'mysql': 'fas fa-database',
        'mongodb': 'fas fa-database',
        'git': 'fab fa-git-alt',
        'github': 'fab fa-github',
        'docker': 'fab fa-docker',
        'aws': 'fab fa-aws'
    };

    const projectCards = document.querySelectorAll('.project-card');
    const projectsToggle = document.getElementById('projects-toggle');
    const projectsGrid = document.querySelector('.projects-grid');

    if (projectCards.length > 0) {
        // Initial check: Hide extra projects
        projectCards.forEach((card, index) => {
            if (index >= 3) {
                card.classList.add('hidden');
                card.style.display = 'none'; // Force hide initially
            }
            
            // Icon mapping logic
            const tags = card.querySelectorAll('.tag');
            tags.forEach(tag => {
                const text = tag.textContent.toLowerCase().trim();
                if (techIconMap[text]) {
                    const icon = document.createElement('i');
                    icon.className = techIconMap[text];
                    icon.style.marginRight = '5px';
                    tag.prepend(icon);
                }
            });
        });
    }

    if (projectsToggle && projectsGrid) {
        projectsToggle.addEventListener('click', () => {
            const isExpanded = projectsToggle.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                // Collapse
                projectCards.forEach((card, index) => {
                    if (index >= 3) {
                        card.classList.add('hidden');
                        setTimeout(() => {
                             if(card.classList.contains('hidden')) card.style.display = 'none';
                        }, 500); // Wait for fade out
                    }
                });
                projectsToggle.setAttribute('aria-expanded', 'false');
                projectsToggle.textContent = 'Ver más';
            } else {
                // Expand
                projectCards.forEach((card, index) => {
                    if (index >= 3) {
                        card.style.display = 'block'; // Show before removing hidden class for animation
                        // Small delay to allow display:block to apply before opacity transition
                        setTimeout(() => {
                            card.classList.remove('hidden');
                        }, 10);
                    }
                });
                projectsToggle.setAttribute('aria-expanded', 'true');
                projectsToggle.textContent = 'Ver menos';
            }
            applyTranslations(); // Re-apply translations for button text
        });
    }

    // Language Switcher Logic
    const translations = {
        es: {
            nav_about: 'Sobre Nosotros',
            nav_projects: 'Proyectos',
            nav_devs: 'Desarrolladores',
            nav_contact: 'Contacto',
            welcome_left_h2: 'Innovación y Desarrollo a Medida',
            welcome_left_p: 'Creamos soluciones de software que impulsan el crecimiento y la eficiencia de tu negocio. Desde aplicaciones web hasta sistemas complejos, transformamos tus ideas en realidad.',
            welcome_right_h2: 'Compromiso y Calidad Garantizada',
            welcome_right_p: 'Entregamos productos de alta calidad, enfocados en la experiencia de usuario y el rendimiento. Tu éxito es nuestro principal objetivo.',
            projects_title: 'Mis Proyectos',
            devs_title: 'Nuestros Desarrolladores',
            contact_title: 'Contáctanos',
            dev_prompt: 'Haz clic para ver info',
            see_more: 'Ver más',
            see_less: 'Ver menos',
            in_dev: 'En desarrollo',
            proj1_desc: 'Plataforma de torneos de fútbol online'
        },
        en: {
            nav_about: 'About Us',
            nav_projects: 'Projects',
            nav_devs: 'Developers',
            nav_contact: 'Contact',
            welcome_left_h2: 'Innovation and Custom Development',
            welcome_left_p: 'We create software solutions that drive your business growth and efficiency. From web apps to complex systems, we turn your ideas into reality.',
            welcome_right_h2: 'Commitment and Guaranteed Quality',
            welcome_right_p: 'We deliver high-quality products focused on user experience and performance. Your success is our main goal.',
            projects_title: 'My Projects',
            devs_title: 'Our Developers',
            contact_title: 'Contact Us',
            dev_prompt: 'Click to see info',
            see_more: 'See more',
            see_less: 'See less',
            in_dev: 'In development',
            proj1_desc: 'Online soccer tournament platform'
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
            proj1_desc: 'Plataforma de torneios de futebol online',
            footer_desc: 'Desenvolvemos soluções de software sob medida para impulsionar seu negócio.',
            footer_contact_title: 'Contato Rápido',
            footer_rights: '© 2024 LJ Code System. Todos os direitos reservados.',
            job_main_dev: 'Desenvolvedor Principal',
            job_socials: 'Redes Sociais',
            dev_tech_title: 'Tecnologias',
            dev_studies_title: 'Estudos',
            dev_portfolio_btn: 'Portfólio Pessoal',
            dev_job_title: 'Desenvolvedor',
            btn_email: 'Email'
        },
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

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});

// Global function for Gmail compose popup
window.openGmailCompose = function(email) {
    // Usamos el enlace directo a la cuenta 0 (default) para evitar redirecciones
    const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`;
    
    const width = 600;
    const height = 600;
    
    // Simplificamos el cálculo para que sea más rápido
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    
    // AGREGADO CLAVE: 'noopener,noreferrer'
    // Esto le dice al navegador: "Carga esto aparte, no esperes a mi página"
    window.open(
        url, 
        '_blank', // Cambiamos el nombre a _blank para forzar nuevo proceso
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,noopener,noreferrer`
    );
    return false;
};
