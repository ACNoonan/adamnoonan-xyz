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
    resizeTimer = setTimeout(() => { resize(); segments = buildPath(); }, 200);
});

function getScrollT() {
    const max = document.documentElement.scrollHeight - H;
    return max > 0 ? window.scrollY / max : 0;
}

// ── Path Builder ────────────────────────────────────────────────────
// Returns an array of segments. Each segment is a self-contained array
// of {x,y} points forming one clean element of the Seed of Life.
// No connecting lines between elements — when fully drawn the result
// is perfectly symmetrical.

function buildPath() {
    const cx = isMobile ? W * 0.5 : W * 0.68;
    const cy = H * 0.5;
    const R = Math.min(W, H) * (isMobile ? 0.25 : 0.2);
    const segs = [];

    function arcPts(x, y, r, from, to, n) {
        const pts = [];
        for (let i = 0; i <= n; i++) {
            const a = from + (to - from) * (i / n);
            pts.push({ x: x + Math.cos(a) * r, y: y + Math.sin(a) * r });
        }
        return pts;
    }

    function closedTriPts(verts, n) {
        const pts = [];
        for (let i = 0; i < 3; i++) {
            const a = verts[i], b = verts[(i + 1) % 3];
            for (let j = (i === 0 ? 0 : 1); j <= n; j++) {
                const t = j / n;
                pts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
            }
        }
        return pts;
    }

    // 1. Center circle (start at top, clockwise)
    segs.push(arcPts(cx, cy, R, -Math.PI / 2, Math.PI * 3 / 2, 180));

    // 2–7. Six petal circles (each starts from the center point, full sweep)
    for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 3;
        const pcx = cx + Math.cos(a) * R;
        const pcy = cy + Math.sin(a) * R;
        const startA = a + Math.PI; // direction toward main center
        segs.push(arcPts(pcx, pcy, R, startA, startA + Math.PI * 2, 180));
    }

    // 8. Triangle 1 — vertices at petal positions 0, 2, 4
    const t1 = [0, 2, 4].map(idx => {
        const a = -Math.PI / 2 + idx * Math.PI / 3;
        return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
    });
    segs.push(closedTriPts(t1, 40));

    // 9. Triangle 2 — vertices at petal positions 1, 3, 5
    const t2 = [1, 3, 5].map(idx => {
        const a = -Math.PI / 2 + idx * Math.PI / 3;
        return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
    });
    segs.push(closedTriPts(t2, 40));

    // 10. Outer circle
    segs.push(arcPts(cx, cy, R * 1.85, -Math.PI / 2, Math.PI * 3 / 2, 220));

    return segs;
}

let segments = [];

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

    // Drawing completes at 75% scroll; last 25% shows finished shape
    const drawT = Math.min(scrollT / 0.75, 1);

    let totalPts = 0;
    for (const seg of segments) totalPts += seg.length;

    const drawCount = Math.floor(drawT * totalPts);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    if (drawCount < 2) { requestAnimationFrame(frame); return; }

    // Completeness ramps 0→1 over the last 10% of drawing
    const completeness = Math.min(1, Math.max(0, (drawT - 0.9) / 0.1));

    // Main strokes — each segment drawn independently, no connecting lines
    const mainAlpha = 0.3 + completeness * 0.1;
    ctx.strokeStyle = `rgba(0,0,0,${mainAlpha})`;
    ctx.lineWidth = 0.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let consumed = 0;
    let lastPt = null;

    for (const seg of segments) {
        if (consumed >= drawCount) break;
        const n = Math.min(seg.length, drawCount - consumed);
        if (n > 1) {
            ctx.beginPath();
            ctx.moveTo(seg[0].x, seg[0].y);
            for (let i = 1; i < n; i++) ctx.lineTo(seg[i].x, seg[i].y);
            ctx.stroke();
            lastPt = seg[n - 1];
        }
        consumed += seg.length;
    }

    // Fresh ink + head dot — fade out as drawing nears completion
    if (completeness < 1 && lastPt) {
        const fade = 1 - completeness;
        const freshLen = Math.floor(totalPts * 0.03);
        const freshFrom = Math.max(0, drawCount - freshLen);

        ctx.strokeStyle = `rgba(0,0,0,${0.55 * fade})`;
        ctx.lineWidth = 1.2;

        let idx = 0;
        for (const seg of segments) {
            const segEnd = idx + seg.length;
            if (segEnd <= freshFrom || idx >= drawCount) { idx = segEnd; continue; }
            const a = Math.max(0, freshFrom - idx);
            const b = Math.min(seg.length, drawCount - idx);
            if (b - a > 1) {
                ctx.beginPath();
                ctx.moveTo(seg[a].x, seg[a].y);
                for (let i = a + 1; i < b; i++) ctx.lineTo(seg[i].x, seg[i].y);
                ctx.stroke();
            }
            idx = segEnd;
        }

        ctx.fillStyle = `rgba(0,0,0,${0.6 * fade})`;
        ctx.beginPath();
        ctx.arc(lastPt.x, lastPt.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(frame);
}

// ── Init ────────────────────────────────────────────────────────────

function init() {
    resize();
    segments = buildPath();
    requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', init);
