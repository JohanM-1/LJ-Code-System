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
    
    // Carousel logic
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        let currentIndex = 0;
        const angle = totalItems > 0 ? 360 / totalItems : 0;

        function updateCarousel() {
            const rotateY = -currentIndex * angle;
            carousel.style.transform = `rotateY(${rotateY}deg)`;
        }

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex++;
                updateCarousel();
            });
        }

        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex--;
                updateCarousel();
            });
        }

        // Initial setup
        items.forEach((item, index) => {
            const rotateY = index * angle;
            item.style.transform = `rotateY(${rotateY}deg) translateZ(300px)`;
        });
    }


    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const popup = document.getElementById('popup-message');

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
});