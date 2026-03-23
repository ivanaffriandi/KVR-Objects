document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor tracking
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = document.querySelectorAll('a, .grid-item, button, .hero-image-wrapper');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Simple Parallax & Scroll Reveal
    const parallaxImg = document.querySelector('.parallax-img');
    const heroSection = document.querySelector('.hero-section');
    
    // Set initial state for reveal items
    const revealItems = document.querySelectorAll('.grid-item');
    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(80px)';
        item.style.transition = 'opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
    });


    // Throttle helper
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const scrollHandler = () => {
        const scrolled = window.scrollY;
        
        // Parallax
        if (parallaxImg && heroSection) {
            if (scrolled < heroSection.offsetHeight) {
                parallaxImg.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }
        
        // Reveal elements
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', () => {
        // Use requestAnimationFrame for performance
        window.requestAnimationFrame(scrollHandler);
    });
    
    // Trigger once on load
    scrollHandler();
});
