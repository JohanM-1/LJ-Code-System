document.addEventListener('DOMContentLoaded', () => {
    // Vanta.js background animation
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

    // Carousel logic
    const carousel = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    const angle = 360 / totalItems;

    function updateCarousel() {
        const rotateY = -currentIndex * angle;
        carousel.style.transform = `rotateY(${rotateY}deg)`;
    }

    document.getElementById('next-btn').addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    // Initial setup
    items.forEach((item, index) => {
        const rotateY = index * angle;
        item.style.transform = `rotateY(${rotateY}deg) translateZ(300px)`;
    });

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