/**
 * Amunt i Avall - Logica d'interacció de la pàgina web
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Canvi d'estil del Header en fer Scroll
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar per defecte per si es recarrega a meitat pàgina

    // 2. Menú de Navegació Mòbil (Hamburger Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Bloquejar scroll del body quan el menú estigui actiu
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Tancar menú en fer clic a un enllaç
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Activar enllaç de navegació actiu segons l'scroll (Scroll Spy)
    const sections = document.querySelectorAll('section[id]');
    const scrollSpy = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Ajust per al header fix
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);

    // 4. Animació d'entrada en fer scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.feature-badge, .panel, .contact-card, .security-banner');
    
    // Configurar els estils inicials per Javascript perquè funcioni correctament com a millora progressiva
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Deixar d'observar un cop animat
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});
