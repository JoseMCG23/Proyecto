// Carrusel accesible + swipe + teclado 
(function () {
    const root = document.getElementById('carrusel');
    if (!root) return;

    const track = document.getElementById('track');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const slides = [...track.querySelectorAll('img')];

    let index = 0;

    const goTo = (i) => {
        index = (i + slides.length) % slides.length;
        track.scrollTo({ left: root.clientWidth * index, behavior: 'smooth' });
    };

    prev.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));

    root.tabIndex = 0;
    root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(index - 1);
        if (e.key === 'ArrowRight') goTo(index + 1);
    });

    const ro = new ResizeObserver(() => goTo(index));
    ro.observe(root);

    let startX = 0, startTime = 0, pid = null;
    const THRESHOLD = 40;
    track.addEventListener('pointerdown', (e) => {
        startX = e.clientX; startTime = Date.now(); pid = e.pointerId;
        track.setPointerCapture(pid);
    });
    track.addEventListener('pointerup', (e) => {
        if (pid !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dt = Date.now() - startTime;
        if (Math.abs(dx) > THRESHOLD || (Math.abs(dx) > 10 && dt < 180)) {
            dx < 0 ? goTo(index + 1) : goTo(index - 1);
        }
        pid = null;
    });

    track.addEventListener('scroll', () => {
        const i = Math.round(track.scrollLeft / root.clientWidth);
        if (!Number.isNaN(i)) index = i;
    });
})();
