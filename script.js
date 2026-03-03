// ── Simplex Noise (2D) ──────────────────────────────────────────────

const SimplexNoise = (() => {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const grad = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];

    function create(seed) {
        const perm = new Uint8Array(512);
        const p = new Uint8Array(256);
        let s = seed | 0;
        for (let i = 0; i < 256; i++) p[i] = i;
        for (let i = 255; i > 0; i--) {
            s = (s * 16807 + 0) % 2147483647;
            const j = s % (i + 1);
            [p[i], p[j]] = [p[j], p[i]];
        }
        for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

        return function noise2D(x, y) {
            const s2 = (x + y) * F2;
            const i = Math.floor(x + s2);
            const j = Math.floor(y + s2);
            const t = (i + j) * G2;
            const X0 = i - t, Y0 = j - t;
            const x0 = x - X0, y0 = y - Y0;
            const i1 = x0 > y0 ? 1 : 0;
            const j1 = x0 > y0 ? 0 : 1;
            const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
            const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
            const ii = i & 255, jj = j & 255;

            let n0 = 0, n1 = 0, n2 = 0;
            let t0 = 0.5 - x0*x0 - y0*y0;
            if (t0 > 0) { t0 *= t0; const g = grad[perm[ii + perm[jj]] & 7]; n0 = t0 * t0 * (g[0]*x0 + g[1]*y0); }
            let t1 = 0.5 - x1*x1 - y1*y1;
            if (t1 > 0) { t1 *= t1; const g = grad[perm[ii + i1 + perm[jj + j1]] & 7]; n1 = t1 * t1 * (g[0]*x1 + g[1]*y1); }
            let t2 = 0.5 - x2*x2 - y2*y2;
            if (t2 > 0) { t2 *= t2; const g = grad[perm[ii + 1 + perm[jj + 1]] & 7]; n2 = t2 * t2 * (g[0]*x2 + g[1]*y2); }
            return 70 * (n0 + n1 + n2);
        };
    }
    return { create };
})();

// ── Globals ─────────────────────────────────────────────────────────

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const seed = Math.random() * 2147483647;
const noise = SimplexNoise.create(seed);

let W, H, dpr;
let mouse = { x: -9999, y: -9999 };
let isMobile = window.innerWidth < 769;
let sectionEls = [];
let sectionTops = [];

// ── Chain Configuration ─────────────────────────────────────────────

const CHAIN_COUNT = 14;
const PERSPECTIVE = 600;
const CIRCLE_SEGMENTS = 64; // points per concentric circle outline

let chain = [];

function buildChain() {
    chain = [];
    const types = ['circle', 'square', 'triangle'];
    const baseRadius = isMobile ? 65 : 95;

    // Build chain: each shape's top edge = previous shape's center
    let currentY = 0; // will be centered later

    for (let i = 0; i < CHAIN_COUNT; i++) {
        const type = types[i % 3];
        const radius = baseRadius + noise(i * 0.7, seed * 0.01) * 25;
        const concentricStep = isMobile ? 3 : 2;
        const concentricCount = Math.floor(radius / concentricStep);

        // This shape's center: top edge at previous center → center is at currentY + radius
        const centerY = currentY + radius;

        // Plane angle: each shape's plane is 90° from previous around Y axis
        // Shape 0: angle 0 (faces viewer)
        // Shape 1: angle PI/2 (perpendicular, going into screen)
        // Shape 2: angle PI (faces away, but we see the back → same as 0 visually)
        // Shape 3: angle 3PI/2
        const basePlaneAngle = (i * Math.PI) / 2;

        // Individual spin speed (scroll-driven)
        const spinSpeed = 0.4 + Math.abs(noise(i * 0.5, 1)) * 0.8;
        const spinDir = noise(i * 0.3, 2) > 0 ? 1 : -1;

        // Opacity
        const alpha = 0.6 + noise(i * 0.4, 3) * 0.25;

        chain.push({
            type, radius, centerY,
            concentricStep, concentricCount,
            basePlaneAngle,
            spinSpeed: spinSpeed * spinDir,
            alpha,
        });

        // Next shape starts at this shape's center
        currentY = centerY;
    }

    // Center the whole chain vertically (we'll offset with scroll)
    const totalHeight = currentY;
    const offsetY = -totalHeight / 2;
    for (const s of chain) {
        s.centerY += offsetY;
    }
}

// ── 3D Projection Helpers ───────────────────────────────────────────
// Each shape lives on a vertical plane through the chain axis.
// The plane's horizontal direction rotates around Y (the chain/vertical axis).
// local coords (u, v) → 3D: x = u * cos(angle), y = v, z = u * sin(angle)

function projectPoint(lu, lv, centerY, planeAngle, chainX, chainScreenY) {
    // 3D position
    const x3 = lu * Math.cos(planeAngle);
    const y3 = lv + centerY;
    const z3 = lu * Math.sin(planeAngle);

    // Perspective
    const depth = z3 + PERSPECTIVE;
    if (depth < 10) return null;
    const scale = PERSPECTIVE / depth;

    return {
        x: chainX + x3 * scale,
        y: chainScreenY + y3 * scale,
    };
}

// ── Shape Outline Generators (local 2D coords) ─────────────────────

function circlePoints(radius, segments) {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push({ u: Math.cos(a) * radius, v: Math.sin(a) * radius });
    }
    return pts;
}

function squarePoints(radius) {
    const s = radius;
    const h = radius * 1.25; // slight aspect ratio like the p5 sketches
    return [
        { u: -s, v: -h },
        { u: s, v: -h },
        { u: s, v: h },
        { u: -s, v: h },
        { u: -s, v: -h }, // close
    ];
}

function trianglePoints(radius) {
    const s = radius;
    return [
        { u: 0, v: -s * 1.15 },
        { u: -s, v: s * 0.65 },
        { u: s, v: s * 0.65 },
        { u: 0, v: -s * 1.15 }, // close
    ];
}

function getOutline(type, radius, segments) {
    switch (type) {
        case 'circle': return circlePoints(radius, segments);
        case 'square': return squarePoints(radius);
        case 'triangle': return trianglePoints(radius);
    }
}

// ── Draw a Single Chain Shape ───────────────────────────────────────

function drawChainShape(shape, scrollT, chainX, chainScreenY) {
    const {
        type, radius, centerY, concentricStep, concentricCount,
        basePlaneAngle, spinSpeed, alpha,
    } = shape;

    // Plane angle = base perpendicular offset + scroll-driven individual spin
    const planeAngle = basePlaneAngle + scrollT * Math.PI * 2 * spinSpeed;

    ctx.strokeStyle = `rgba(0,0,0,${alpha.toFixed(3)})`;
    ctx.lineWidth = 0.6;

    const segments = type === 'circle' ? CIRCLE_SEGMENTS : undefined;

    for (let c = 1; c <= concentricCount; c++) {
        const r = c * concentricStep;
        const outline = getOutline(type, r, segments);

        // Project each point
        ctx.beginPath();
        let started = false;
        for (const pt of outline) {
            const projected = projectPoint(pt.u, pt.v, centerY, planeAngle, chainX, chainScreenY);
            if (!projected) continue;
            if (!started) {
                ctx.moveTo(projected.x, projected.y);
                started = true;
            } else {
                ctx.lineTo(projected.x, projected.y);
            }
        }
        if (started) ctx.stroke();
    }
}

// ── Mouse Proximity Text Scaling ────────────────────────────────────

const proximityRadius = 200;
const maxScale = 1.12;

function updateTextProximity() {
    if (isMobile) return;
    const els = document.querySelectorAll('.proximity-text');
    const mx = mouse.x;
    const my = mouse.y;

    for (const el of els) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < proximityRadius) {
            const t = 1 - dist / proximityRadius;
            el.style.transform = `scale(${1 + (maxScale - 1) * t * t})`;
        } else {
            el.style.transform = '';
        }
    }
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    updateTextProximity();
});

document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
    document.querySelectorAll('.proximity-text').forEach(el => {
        el.style.transform = '';
    });
});

// ── Resize ──────────────────────────────────────────────────────────

function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    isMobile = W < 769;
    cacheSections();
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); buildChain(); }, 250);
});

function cacheSections() {
    sectionEls = Array.from(document.querySelectorAll('.section'));
    sectionTops = sectionEls.map(el => el.offsetTop);
}

// ── Animation Loop ──────────────────────────────────────────────────

function frame() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - H;
    const scrollT = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Chain position on screen
    const chainX = isMobile ? W * 0.5 : W * 0.65;
    // Scroll shifts the chain upward so you travel down it
    const chainScreenY = H * 0.5 - scrollT * H * 1.5;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Draw each shape in the chain
    for (const shape of chain) {
        drawChainShape(shape, scrollT, chainX, chainScreenY);
    }

    requestAnimationFrame(frame);
}

// ── Init ────────────────────────────────────────────────────────────

function init() {
    resize();
    buildChain();
    requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', init);
