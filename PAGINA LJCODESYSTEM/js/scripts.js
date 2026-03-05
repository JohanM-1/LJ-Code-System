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
                    
                    // Re-apply translations for the new modal content
                    applyTranslations();
                    
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

    // Project Modal Logic
    const projectModal = document.getElementById('project-modal');
    const projectModalBody = document.getElementById('project-modal-body');
    const closeProjectModal = document.querySelector('.close-modal-project');
    const projectDetailBtns = document.querySelectorAll('.project-details-btn');
    let carouselInterval = null;

    if (projectDetailBtns.length > 0) {
        projectDetailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Clear any existing interval
                if (carouselInterval) clearInterval(carouselInterval);
                const card = btn.closest('.project-card');
                const nameElement = card.querySelector('h3');
                const infoElement = card.querySelector('.project-info-hidden');

                if (nameElement && infoElement && projectModalBody && projectModal) {
                    const name = nameElement.textContent;
                    const info = infoElement.innerHTML;
                    const liveUrl = card.getAttribute('data-live');
                    
                    let modalContent = `<h3>${name}</h3>${info}`;
                    
                    // Toggle expanded class for LCG Deportivos
                    const modalContentWrapper = projectModal.querySelector('.developer-modal-content');
                    if (name.trim() === 'LCG Deportivos') {
                        modalContentWrapper.classList.add('modal-expanded');
                    } else {
                        modalContentWrapper.classList.remove('modal-expanded');
                    }
                    
                    if (liveUrl) {
                        modalContent += `
                            <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                                <i class="fas fa-external-link-alt"></i> <span data-i18n="see_page">Ver página</span>
                            </a>
                        `;
                    }

                    projectModalBody.innerHTML = modalContent;
                    
                    // Re-apply translations for the new modal content
                    applyTranslations();

                    // Initialize Carousel if present
                    const carouselTrack = projectModalBody.querySelector('.carousel-track');
                    if (carouselTrack) {
                        const slides = Array.from(carouselTrack.children);
                        const nextButton = projectModalBody.querySelector('.next-btn');
                        const prevButton = projectModalBody.querySelector('.prev-btn');
                        const dotsNav = projectModalBody.querySelector('.carousel-nav');
                        const dots = Array.from(dotsNav.children);

                        let currentSlideIndex = 0;

                        const updateCarousel = (index) => {
                            slides.forEach((slide, i) => {
                                if (i === index) {
                                    slide.classList.add('current-slide');
                                    slide.style.opacity = '1';
                                    slide.style.zIndex = '1';
                                } else {
                                    slide.classList.remove('current-slide');
                                    slide.style.opacity = '0';
                                    slide.style.zIndex = '0';
                                }
                            });
                            
                            dots.forEach((dot, i) => {
                                if (i === index) {
                                    dot.classList.add('current-slide');
                                } else {
                                    dot.classList.remove('current-slide');
                                }
                            });
                        };

                        // Autoplay functionality
                        const startAutoplay = () => {
                            carouselInterval = setInterval(() => {
                                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                                updateCarousel(currentSlideIndex);
                            }, 5000); // Change every 5 seconds
                        };

                        const stopAutoplay = () => {
                            if (carouselInterval) clearInterval(carouselInterval);
                        };

                        const resetAutoplay = () => {
                            stopAutoplay();
                            startAutoplay();
                        };

                        // Start autoplay initially
                        startAutoplay();

                        if (nextButton) {
                            nextButton.addEventListener('click', () => {
                                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                                updateCarousel(currentSlideIndex);
                                resetAutoplay();
                            });
                        }

                        if (prevButton) {
                            prevButton.addEventListener('click', () => {
                                currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
                                updateCarousel(currentSlideIndex);
                                resetAutoplay();
                            });
                        }

                        dots.forEach((dot, index) => {
                            dot.addEventListener('click', () => {
                                currentSlideIndex = index;
                                updateCarousel(currentSlideIndex);
                            });
                        });
                    }
                    
                    // Show modal
                    projectModal.classList.add('show');
                }
            });
        });
    }

    if (closeProjectModal && projectModal) {
        closeProjectModal.addEventListener('click', () => {
            projectModal.classList.remove('show');
            if (carouselInterval) clearInterval(carouselInterval);
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('show');
                if (carouselInterval) clearInterval(carouselInterval);
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
            see_page: 'Ver página',
            in_dev: 'En desarrollo',
            proj1_desc: 'Plataforma de torneos de fútbol online',
            footer_desc: 'Desarrollamos soluciones de software a la medida para potenciar tu negocio.',
            footer_contact_title: 'Contacto Rápido',
            footer_rights: '© 2026 LJ Code System. Todos los derechos reservados.',
            job_main_dev: 'Desarrollador Principal',
            job_socials: 'Redes Sociales',
            dev_tech_title: 'Tecnologias',
            dev_studies_title: 'Estudios',
            dev_portfolio_btn: 'Portafolio Personal',
            dev_job_title: 'Desarrollador',
            btn_email: 'Email',
            dev_leo_studies: 'Tecnólogo en Desarrollo de Software, estudiando Ing. en Desarrollo de Software',
            dev_johan_studies: 'Tecnólogo en Desarrollo de Software',
            dev_santiago_studies: 'Estudiando Ing. de Sistemas',
            dev_juan_studies: 'Tecnólogo en Desarrollo de Software, estudiando Ing. en Sistemas',
            frontend: 'Frontend',
            backend: 'Backend',
            details: 'Detalles',
            technologies: 'Tecnologías',
            lcg_description: 'LCG Deportivos es un espacio dedicado a la organización y administración de torneos deportivos, especialmente de fútbol. En este sitio los equipos y participantes pueden informarse sobre las competencias disponibles, conocer categorías, reglamentos y requisitos, así como realizar procesos relacionados con la inscripción de equipos y jugadores.',
            project_two: 'Proyecto Dos',
            project_three: 'Proyecto Tres',
            github_repo_development: 'Repositorio GitHub en desarrollo',
            repo_title: 'Repositorio',
            repos_title: 'Repositorios'
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
            see_page: 'See page',
            in_dev: 'In development',
            proj1_desc: 'Online soccer tournament platform',
            footer_desc: 'We develop custom software solutions to empower your business.',
            footer_contact_title: 'Quick Contact',
            footer_rights: '© 2026 LJ Code System. All rights reserved.',
            job_main_dev: 'Lead Developer',
            job_socials: 'Social Media',
            dev_tech_title: 'Technologies',
            dev_studies_title: 'Studies',
            dev_portfolio_btn: 'Personal Portfolio',
            dev_job_title: 'Developer',
            btn_email: 'Email',
            dev_leo_studies: 'Software Development Technologist, studying Software Engineering',
            dev_johan_studies: 'Software Development Technologist',
            dev_santiago_studies: 'Studying Software Development Technology',
            dev_juan_studies: 'Software Development Technologist, studying Systems Engineering',
            github_repo_development: 'GitHub repository in Development',
            repo_title: 'Repository',
            repos_title: 'Repositories',
            frontend: 'Frontend',
            backend: 'Backend',
            details: 'Details',
            technologies: 'Technologies',
            lcg_description: 'LCG Deportivos is a space dedicated to the organization and administration of sports tournaments, especially soccer. On this site, teams and participants can get information about available competitions, learn about categories, regulations and requirements, as well as carry out processes related to the registration of teams and players.',
            project_two: 'Project Two',
            project_three: 'Project Three'
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
            see_page: 'Ver página',
            in_dev: 'Em desenvolvimento',
            proj1_desc: 'Plataforma de torneios de futebol online',
            footer_desc: 'Desenvolvemos soluções de software sob medida para impulsionar seu negócio.',
            footer_contact_title: 'Contato Rápido',
            footer_rights: '© 2026 LJ Code System. Todos os direitos reservados.',
            job_main_dev: 'Desenvolvedor Principal',
            job_socials: 'Redes Sociais',
            dev_tech_title: 'Tecnologias',
            dev_studies_title: 'Estudos',
            dev_portfolio_btn: 'Portfólio Pessoal',
            dev_job_title: 'Desenvolvedor',
            btn_email: 'Email',
            dev_leo_studies: 'Tecnólogo em Desenvolvimento de Software, estudando Eng. de Software',
            dev_johan_studies: 'Tecnólogo em Desenvolvimento de Software',
            dev_santiago_studies: 'Estudando Tecnologia em Desenvolvimento de Software',
            dev_juan_studies: 'Tecnólogo em Desenvolvimento de Software, estudando Eng. de Sistemas',
            github_repo_development: 'Repositório GitHub em Desenvolvimento',
            repo_title: 'Repositório',
            repos_title: 'Repositórios',
            frontend: 'Frontend',
            backend: 'Backend',
            details: 'Detalhes',
            technologies: 'Tecnologias',
            lcg_description: 'LCG Deportivos é um espaço dedicado à organização e administração de torneios esportivos, especialmente de futebol. Neste site, equipes e participantes podem se informar sobre as competições disponíveis, conhecer categorias, regulamentos e requisitos, além de realizar processos relacionados à inscrição de equipes e jogadores.',
            project_two: 'Projeto Dois',
            project_three: 'Projeto Três'
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
    

    // GitHub Button Popup Logic for specific projects (LCG, Project 2, Project 3)
    document.querySelectorAll('.project-card').forEach(card => {
        const titleElement = card.querySelector('h3');
        if (!titleElement) return;

        const titleText = titleElement.textContent.trim();
        const i18nKey = titleElement.getAttribute('data-i18n');
        
        const isLCG = titleText === 'LCG Deportivos';
        const isDevProject = i18nKey === 'project_two' || i18nKey === 'project_three';

        if (isLCG || isDevProject) {
            const githubIcon = card.querySelector('.project-links .fa-github');
            if (githubIcon) {
                const githubBtn = githubIcon.closest('a');
                // Remove existing listeners to avoid duplicates if this runs multiple times
                const newGithubBtn = githubBtn.cloneNode(true);
                githubBtn.parentNode.replaceChild(newGithubBtn, githubBtn);
                
                newGithubBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Clear any existing interval
                    if (typeof carouselInterval !== 'undefined' && carouselInterval) clearInterval(carouselInterval);

                    if (projectModal && projectModalBody) {
                        let modalContent = '';
                        const projectName = titleElement.textContent.trim();
                        
                        if (projectName === 'LCG Deportivos') {
                            modalContent = `
                                <h3>${projectName}</h3>
                                <div class="info-block" style="text-align: center; padding: 20px;">
                                    <h4><i class="fab fa-github"></i> <span data-i18n="repos_title">Repositorios</span></h4>
                                    <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px; flex-wrap: wrap;">
                                        <a href="https://github.com/LJprogram657/FrontDeportes" target="_blank" rel="noopener noreferrer" class="portfolio-link" style="margin: 0;">
                                            <i class="fab fa-github"></i> <span data-i18n="frontend">Frontend</span>
                                        </a>
                                        <a href="https://github.com/LJprogram657/backenddeportes" target="_blank" rel="noopener noreferrer" class="portfolio-link" style="margin: 0;">
                                            <i class="fab fa-github"></i> <span data-i18n="backend">Backend</span>
                                        </a>
                                    </div>
                                </div>
                            `;
                        } else {
                            modalContent = `
                                <h3>${projectName}</h3>
                                <div class="info-block" style="text-align: center; padding: 20px;">
                                    <h4><i class="fab fa-github"></i> <span data-i18n="repo_title">Repositorio</span></h4>
                                    <p style="font-size: 1.1rem; margin-top: 10px;"><span data-i18n="github_repo_development">GitHub repositorio en Desarrollo</span> <i class="fas fa-tools"></i></p>
                                </div>
                            `;
                        }
                        
                        // Remove expanded class if present
                        const modalContentWrapper = projectModal.querySelector('.developer-modal-content');
                        if (modalContentWrapper) {
                            modalContentWrapper.classList.remove('modal-expanded');
                        }
                        
                        projectModalBody.innerHTML = modalContent;
                        
                        // Re-apply translations for the new modal content
                        applyTranslations();
                        
                        // Show modal
                        projectModal.classList.add('show');
                    }
                });
            }
        }
    });

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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // URL estándar de Gmail para redacción
    const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`;

    if (isMobile) {
        // En móviles: abrir en nueva pestaña del mismo navegador (sin preguntar por app)
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        // En escritorio: restaurar el comportamiento original de ventana emergente (Popup)
        const width = 600;
        const height = 600;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        window.open(
            url, 
            '_blank', 
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,noopener,noreferrer`
        );
    }
    return false;
};
