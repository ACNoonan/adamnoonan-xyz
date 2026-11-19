// Click a Mondrian Decomp painting to run its p5.js sketch live, beside its code and the prompt that wrote it.
// Same viewer as the GitHub Pages site for mondrian-decomp-1. Used by the home page strip and the series grid.
// Keys: ← → to move, Esc to close. Swipe the painting on touch screens. Without JS the links still open.
(function () {
    const links = Array.from(document.querySelectorAll('.art-grid a, .art-strip a'));
    if (!links.length) return;

    const BASE = '/art/mondrian-decomp/';
    const P5 = 'https://cdn.jsdelivr.net/npm/p5@2.3.2/lib/p5.min.js';
    let catalog = null, at = 0, lastFocus = null;

    const box = document.createElement('div');
    box.className = 'viewer';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Painting');
    box.innerHTML =
        '<div class="viewer__controls">' +
            '<button class="viewer__prev" aria-label="Previous painting">&larr;</button>' +
            '<button class="viewer__next" aria-label="Next painting">&rarr;</button>' +
            '<span class="viewer__count"></span>' +
            '<span class="viewer__grow"></span>' +
            '<a class="viewer__raw" target="_blank" rel="noopener">sketch.js</a>' +
            '<button class="viewer__close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="viewer__stage">' +
            '<iframe title="Live sketch" sandbox="allow-scripts"></iframe>' +
            '<p class="viewer__meta"></p>' +
        '</div>' +
        '<pre class="viewer__code"></pre>';
    document.body.appendChild(box);

    const $ = sel => box.querySelector(sel);
    const frame = $('iframe'), code = $('.viewer__code'), meta = $('.viewer__meta');

    const page = src => '<!doctype html><html><head><meta charset="utf-8">' +
        '<script src="' + P5 + '"><\/script>' +
        '<style>html,body{margin:0;overflow:hidden;background:#fff}canvas{width:100vw!important;height:100vw!important;display:block}</style>' +
        '</head><body><script>' + src.replace(/<\/script/gi, '<\\/script') + '<\/script></body></html>';

    function load() {
        if (!catalog) catalog = fetch(BASE + 'catalog.json').then(r => r.json());
        return catalog;
    }

    function track(c, how) {
        if (!window.posthog || !window.posthog.capture) return;
        window.posthog.capture('painting_viewed', { painting: c.n, of: 75, how: how, page: location.pathname });
    }

    function link(href, text) {
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = text;
        return a;
    }

    const BASE_MODEL = 'Qwen3.5-35B-A3B';
    const HF_BASE = 'https://huggingface.co/Qwen/Qwen3.5-35B-A3B';
    const HF_LORA = 'https://huggingface.co/adamcnoonan/mondrian-decomp-1-lora';

    // "Qwen3.5-35B-A3B" or "Qwen3.5-35B-A3B + Mondrian Decomp 1 LoRA": each part links to its Hugging Face page
    function model(name) {
        if (name.indexOf(BASE_MODEL) !== 0) return [name];
        const rest = name.slice(BASE_MODEL.length).replace(/^ \+ /, '');
        const parts = [link(HF_BASE, BASE_MODEL)];
        if (rest) parts.push(' + ', link(HF_LORA, rest));
        return parts;
    }

    function setMeta(c) {
        const name = c.system_prompt.split('/').pop().replace('.txt', '');
        meta.replaceChildren(
            ...model(c.model), ' · ', link(BASE + c.system_prompt, 'system prompt ' + name),
            (c.rule_filter ? ' + rule filter' : '') + ' · "' + c.user_prompt + '"'
        );
    }

    async function show(i, how) {
        const list = await load();
        at = (i + list.length) % list.length;
        const c = list[at];
        track(c, how || 'step');
        $('.viewer__count').textContent = c.n + ' / ' + list.length;
        $('.viewer__raw').href = BASE + c.sketch;
        setMeta(c);
        const src = await fetch(BASE + c.sketch).then(r => r.text());
        if (list[at] !== c) return; // the reader moved on while this loaded
        code.textContent = src;
        code.scrollTop = 0;
        frame.srcdoc = page(src);
        history.replaceState(null, '', '#' + c.n);
    }

    function open(n) {
        lastFocus = document.activeElement;
        box.hidden = false;
        document.body.style.overflow = 'hidden';
        show(n - 1, 'open');
        $('.viewer__next').focus();
    }

    function close() {
        box.hidden = true;
        document.body.style.overflow = '';
        frame.srcdoc = '';
        history.replaceState(null, '', location.pathname + location.search);
        if (lastFocus) lastFocus.focus();
    }

    links.forEach(function (a) {
        const m = (a.querySelector('img') || {}).src && a.querySelector('img').src.match(/(\d+)\.png$/);
        if (!m) return;
        const n = parseInt(m[1], 10);
        a.removeAttribute('target');
        a.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let cmd-click open a tab
            e.preventDefault();
            open(n);
        });
    });

    $('.viewer__prev').addEventListener('click', function () { show(at - 1); });
    $('.viewer__next').addEventListener('click', function () { show(at + 1); });
    $('.viewer__close').addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') show(at + 1);
        else if (e.key === 'ArrowLeft') show(at - 1);
    });

    let x0 = null;
    const stage = $('.viewer__stage');
    stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1));
        x0 = null;
    });

    const n = parseInt(location.hash.slice(1), 10);
    if (n >= 1 && n <= 75) open(n);
})();
