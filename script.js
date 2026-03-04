// ── Globals ─────────────────────────────────────────────────────────

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, dpr;
let isMobile = window.innerWidth < 769;

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
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
});

function getScrollT() {
    const max = document.documentElement.scrollHeight - H;
    return max > 0 ? window.scrollY / max : 0;
}

// ── Single Continuous Line ──────────────────────────────────────────
// One thin line traces sacred geometry as you scroll.
// Total path: circle → triangle → hexagon → flower of life petals → spiral out
// scrollT controls how far along the path has been "drawn"

function buildPath() {
    const cx = isMobile ? W * 0.5 : W * 0.68;
    const cy = H * 0.5;
    const baseR = Math.min(W, H) * (isMobile ? 0.3 : 0.22);
    const points = [];

    // Phase 1 (0.00–0.15): Circle
    const circleSteps = 200;
    for (let i = 0; i <= circleSteps; i++) {
        const a = (i / circleSteps) * Math.PI * 2;
        points.push({ x: cx + Math.cos(a) * baseR, y: cy + Math.sin(a) * baseR });
    }

    // Phase 2 (0.15–0.30): Triangle inscribed
    const triR = baseR * 0.95;
    const triSteps = 80;
    for (let side = 0; side < 3; side++) {
        const a1 = -Math.PI / 2 + (side * Math.PI * 2) / 3;
        const a2 = -Math.PI / 2 + ((side + 1) * Math.PI * 2) / 3;
        for (let i = 0; i <= triSteps; i++) {
            const t = i / triSteps;
            points.push({
                x: cx + Math.cos(a1) * triR + (Math.cos(a2) - Math.cos(a1)) * triR * t,
                y: cy + Math.sin(a1) * triR + (Math.sin(a2) - Math.sin(a1)) * triR * t,
            });
        }
    }

    // Phase 3 (0.30–0.50): Hexagon + inner star
    const hexR = baseR * 0.85;
    // Hexagon
    for (let side = 0; side < 6; side++) {
        const a1 = (side * Math.PI) / 3;
        const a2 = ((side + 1) * Math.PI) / 3;
        const steps = 50;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            points.push({
                x: cx + Math.cos(a1) * hexR + (Math.cos(a2) - Math.cos(a1)) * hexR * t,
                y: cy + Math.sin(a1) * hexR + (Math.sin(a2) - Math.sin(a1)) * hexR * t,
            });
        }
    }
    // Inner star (connect every other vertex)
    for (let i = 0; i < 6; i++) {
        const a1 = (i * Math.PI) / 3;
        const a2 = ((i + 2) * Math.PI) / 3;
        const steps = 40;
        for (let j = 0; j <= steps; j++) {
            const t = j / steps;
            points.push({
                x: cx + Math.cos(a1) * hexR * (1 - t) + Math.cos(a2) * hexR * t,
                y: cy + Math.sin(a1) * hexR * (1 - t) + Math.sin(a2) * hexR * t,
            });
        }
    }

    // Phase 4 (0.50–0.75): Flower of Life petals (6 circles around center)
    const petalR = baseR * 0.5;
    for (let p = 0; p < 6; p++) {
        const angle = (p * Math.PI) / 3;
        const pcx = cx + Math.cos(angle) * petalR;
        const pcy = cy + Math.sin(angle) * petalR;
        const steps = 120;
        for (let i = 0; i <= steps; i++) {
            const a = (i / steps) * Math.PI * 2;
            points.push({ x: pcx + Math.cos(a) * petalR, y: pcy + Math.sin(a) * petalR });
        }
    }

    // Phase 5 (0.75–1.00): Spiral outward
    const spiralTurns = 3;
    const spiralSteps = 300;
    for (let i = 0; i <= spiralSteps; i++) {
        const t = i / spiralSteps;
        const a = t * spiralTurns * Math.PI * 2;
        const r = baseR * (1 + t * 0.8);
        points.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }

    return points;
}

let path = [];

// ── Mouse Proximity Text Scaling ────────────────────────────────────

const proximityRadius = 200;
const maxScale = 1.12;

function updateTextProximity() {
    if (isMobile) return;
    const els = document.querySelectorAll('.proximity-text');
    const mx = mouse.x, my = mouse.y;
    for (const el of els) {
        const rect = el.getBoundingClientRect();
        const ecx = rect.left + rect.width / 2;
        const ecy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - ecx) ** 2 + (my - ecy) ** 2);
        el.style.transform = dist < proximityRadius
            ? `scale(${1 + (maxScale - 1) * ((1 - dist / proximityRadius) ** 2)})`
            : '';
    }
}

let mouse = { x: -9999, y: -9999 };
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    updateTextProximity();
});
document.addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
    document.querySelectorAll('.proximity-text').forEach(el => el.style.transform = '');
});

// ── Animation Loop ──────────────────────────────────────────────────

function frame() {
    const scrollT = getScrollT();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Draw the path up to scrollT
    const drawCount = Math.floor(scrollT * path.length);
    if (drawCount < 2) { requestAnimationFrame(frame); return; }

    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 0.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < drawCount; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Draw head dot at current position
    if (drawCount > 0) {
        const head = path[drawCount - 1];
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(frame);
}

// ── Init ────────────────────────────────────────────────────────────

function init() {
    resize();
    path = buildPath();
    requestAnimationFrame(frame);
}

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); path = buildPath(); }, 200);
});

document.addEventListener('DOMContentLoaded', init);
