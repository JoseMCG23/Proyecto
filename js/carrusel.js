// Carrusel funciona detectando el contenedor y avanza un slide por click
(() => {
    const viewport =
        document.getElementById('carrusel') ||
        document.querySelector('.nos__carousel') ||
        document.querySelector('.carrusel');
    if (!viewport) return;

    const track =
        viewport.querySelector('.pista') ||
        viewport.querySelector('.nos__track') ||
        viewport.firstElementChild;
    const prev =
        viewport.querySelector('.prev') ||
        viewport.querySelector('.nos__prev');
    const next =
        viewport.querySelector('.next') ||
        viewport.querySelector('.nos__next');

    if (!track || !prev || !next) return;

    // Ancho de una "slide" (de cada cuadro por decirlo assi)
    const slideWidth = () => {
        const firstSlide =
            track.querySelector('img, .slide, *') || viewport;
        const w = firstSlide.getBoundingClientRect().width || viewport.clientWidth;
        // Fallback seguro
        return Math.max(w, viewport.clientWidth);
    };

    // Mover a la siguiente
    function go(dir = 1) {
        const step = slideWidth();
        const maxLeft = track.scrollWidth - viewport.clientWidth;
        const dest = Math.min(
            Math.max(0, viewport.scrollLeft + dir * step),
            Math.max(0, maxLeft)
        );
        viewport.scrollTo({ left: dest, behavior: 'smooth' });
    }

    next.addEventListener('click', () => go(1));
    prev.addEventListener('click', () => go(-1));

    // Swipe táctil
    let startX = null;
    viewport.addEventListener('touchstart', e => (startX = e.touches[0].clientX), { passive: true });
    viewport.addEventListener('touchend', e => {
        if (startX == null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        startX = null;
    });

    // Teclado 
    viewport.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
    });
})();

