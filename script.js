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
    resizeTimer = setTimeout(() => { resize(); path = buildPath(); }, 200);
});

function getScrollT() {
    const max = document.documentElement.scrollHeight - H;
    return max > 0 ? window.scrollY / max : 0;
}

// ── Path Builder ────────────────────────────────────────────────────
// Builds a Seed of Life → Hexagram → Outer Ring
// One continuous line. All connecting segments run through shared
// intersection points so they're invisible in the final image.
// Final point = first point (closed form).

function buildPath() {
    const cx = isMobile ? W * 0.5 : W * 0.68;
    const cy = H * 0.5;
    const R = Math.min(W, H) * (isMobile ? 0.25 : 0.2);
    const pts = [];

    function arc(x, y, r, from, to, n) {
        for (let i = 0; i <= n; i++) {
            const a = from + (to - from) * (i / n);
            pts.push({ x: x + Math.cos(a) * r, y: y + Math.sin(a) * r });
        }
    }

    function line(x1, y1, x2, y2, n) {
        for (let i = 0; i <= n; i++) {
            const t = i / n;
            pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
        }
    }

    // ── 1. Center circle (start at top, clockwise) ──
    arc(cx, cy, R, -Math.PI / 2, Math.PI * 3 / 2, 180);

    // ── 2. Six petals (Seed of Life) ──
    // Each petal center is on the center circle.
    // Each petal circle passes through main center (cx, cy).
    // We enter each petal at the center, trace the full circle, exit at center.
    for (let i = 0; i < 6; i++) {
        const pa = -Math.PI / 2 + i * Math.PI / 3;
        const pcx = cx + Math.cos(pa) * R;
        const pcy = cy + Math.sin(pa) * R;

        // Connect to center (shared point of all petals)
        const last = pts[pts.length - 1];
        line(last.x, last.y, cx, cy, 8);

        // Entry angle on petal: direction from petal center toward main center
        const entry = Math.atan2(cy - pcy, cx - pcx);
        arc(pcx, pcy, R, entry, entry + Math.PI * 2, 140);
    }

    // ── 3. Hexagram (two interlocking triangles) ──
    // Vertices sit on the center circle at the petal centers.
    const last3 = pts[pts.length - 1];
    // Triangle 1: vertices at -90°, 30°, 150°
    const t1 = [0, 2, 4].map(i => {
        const a = -Math.PI / 2 + i * Math.PI / 3;
        return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
    });
    line(last3.x, last3.y, t1[0].x, t1[0].y, 6);
    line(t1[0].x, t1[0].y, t1[1].x, t1[1].y, 40);
    line(t1[1].x, t1[1].y, t1[2].x, t1[2].y, 40);
    line(t1[2].x, t1[2].y, t1[0].x, t1[0].y, 40);

    // Triangle 2: vertices at -30°, 90°, 210°
    const t2 = [1, 3, 5].map(i => {
        const a = -Math.PI / 2 + i * Math.PI / 3;
        return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
    });
    line(t1[0].x, t1[0].y, t2[0].x, t2[0].y, 6);
    line(t2[0].x, t2[0].y, t2[1].x, t2[1].y, 40);
    line(t2[1].x, t2[1].y, t2[2].x, t2[2].y, 40);
    line(t2[2].x, t2[2].y, t2[0].x, t2[0].y, 40);

    // ── 4. Outer circle (frames the whole form) ──
    const outerR = R * 1.85;
    const lastOuter = pts[pts.length - 1];
    const outerTop = { x: cx, y: cy - outerR };
    line(lastOuter.x, lastOuter.y, outerTop.x, outerTop.y, 12);
    arc(cx, cy, outerR, -Math.PI / 2, Math.PI * 3 / 2, 220);

    // ── 5. Close: return to first point ──
    const fin = pts[pts.length - 1];
    line(fin.x, fin.y, pts[0].x, pts[0].y, 15);

    return pts;
}

let path = [];

// ── Mouse Proximity Text Scaling ────────────────────────────────────

const proximityRadius = 200;
const maxScale = 1.12;
let mouse = { x: -9999, y: -9999 };

function updateTextProximity() {
    if (isMobile) return;
    const els = document.querySelectorAll('.proximity-text');
    for (const el of els) {
        const r = el.getBoundingClientRect();
        const dist = Math.sqrt((mouse.x - r.left - r.width / 2) ** 2 + (mouse.y - r.top - r.height / 2) ** 2);
        el.style.transform = dist < proximityRadius
            ? `scale(${1 + (maxScale - 1) * ((1 - dist / proximityRadius) ** 2)})`
            : '';
    }
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    updateTextProximity();
});
document.addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
    document.querySelectorAll('.proximity-text').forEach(el => el.style.transform = '');
});

// ── Render ──────────────────────────────────────────────────────────

function frame() {
    const scrollT = getScrollT();
    const drawCount = Math.floor(scrollT * path.length);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    if (drawCount < 2) { requestAnimationFrame(frame); return; }

    // Main line
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 0.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < drawCount; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Fresh ink: last ~3% of drawn path is slightly bolder
    const freshStart = Math.max(1, drawCount - Math.floor(path.length * 0.03));
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(path[freshStart].x, path[freshStart].y);
    for (let i = freshStart + 1; i < drawCount; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Drawing head dot
    const head = path[drawCount - 1];
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath();
    ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(frame);
}

// ── Init ────────────────────────────────────────────────────────────

function init() {
    resize();
    path = buildPath();
    requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', init);
