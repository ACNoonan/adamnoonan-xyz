// Click a painting in .art-grid to view it large and step through the series.
// Keys: ← → to move, Esc to close. Swipe on touch screens. Without JS the links open the image.
(function () {
    const links = Array.from(document.querySelectorAll('.art-grid a'));
    if (!links.length) return;

    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Painting viewer');
    box.hidden = true;
    box.innerHTML =
        '<button class="lightbox__close" aria-label="Close">&times;</button>' +
        '<button class="lightbox__nav lightbox__prev" aria-label="Previous painting">&larr;</button>' +
        '<figure class="lightbox__figure"><img alt=""><figcaption></figcaption></figure>' +
        '<button class="lightbox__nav lightbox__next" aria-label="Next painting">&rarr;</button>';
    document.body.appendChild(box);

    const img = box.querySelector('img');
    const caption = box.querySelector('figcaption');
    let at = 0;
    let lastFocus = null;

    function show(i) {
        at = (i + links.length) % links.length;
        const a = links[at];
        img.src = a.getAttribute('href');
        img.alt = a.querySelector('img').alt;
        caption.textContent = (at + 1) + ' / ' + links.length;
        // warm the neighbours so stepping feels instant
        [at - 1, at + 1].forEach(function (j) {
            new Image().src = links[(j + links.length) % links.length].getAttribute('href');
        });
    }

    function open(i) {
        lastFocus = document.activeElement;
        show(i);
        box.hidden = false;
        document.body.style.overflow = 'hidden';
        box.querySelector('.lightbox__next').focus();
    }

    function close() {
        box.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    links.forEach(function (a, i) {
        a.removeAttribute('target');
        a.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let cmd-click open a tab
            e.preventDefault();
            open(i);
        });
    });

    box.querySelector('.lightbox__prev').addEventListener('click', function () { show(at - 1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { show(at + 1); });
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') show(at + 1);
        else if (e.key === 'ArrowLeft') show(at - 1);
    });

    let x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1));
        x0 = null;
    });
})();
