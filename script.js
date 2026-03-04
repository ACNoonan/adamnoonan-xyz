// ── Globals ─────────────────────────────────────────────────────────

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let W, H, dpr;
let mouse = { x: -9999, y: -9999 };
let isMobile = window.innerWidth < 769;
let time = 0;

// ── Tree of Life / Neural Net Layout ────────────────────────────────
// 10 Sephirot arranged in three pillars, plus Da'at (hidden/knowledge).
// Positions are normalized 0–1, mapped to screen in render.

const NODES = [
    // id, x (0-1), y (0-1), radius multiplier, name
    { id: 0,  x: 0.5,  y: 0.04, r: 1.1,  name: 'Keter' },      // Crown
    { id: 1,  x: 0.78, y: 0.14, r: 0.9,  name: 'Chokmah' },    // Wisdom
    { id: 2,  x: 0.22, y: 0.14, r: 0.9,  name: 'Binah' },      // Understanding
    { id: 3,  x: 0.5,  y: 0.22, r: 0.6,  name: 'Daat' },       // Knowledge (hidden)
    { id: 4,  x: 0.78, y: 0.36, r: 0.85, name: 'Chesed' },     // Mercy
    { id: 5,  x: 0.22, y: 0.36, r: 0.85, name: 'Gevurah' },    // Severity
    { id: 6,  x: 0.5,  y: 0.46, r: 1.0,  name: 'Tiferet' },    // Beauty
    { id: 7,  x: 0.78, y: 0.60, r: 0.8,  name: 'Netzach' },    // Victory
    { id: 8,  x: 0.22, y: 0.60, r: 0.8,  name: 'Hod' },        // Splendor
    { id: 9,  x: 0.5,  y: 0.72, r: 0.75, name: 'Yesod' },      // Foundation
    { id: 10, x: 0.5,  y: 0.88, r: 1.05, name: 'Malkuth' },    // Kingdom
];

// 22 paths (edges) — the classic Tree of Life connections
// Each edge: [fromId, toId, weight (neural net style)]
const EDGES = [
    [0, 1, 0.8],  [0, 2, 0.8],  [0, 6, 0.6],
    [1, 2, 0.5],  [1, 3, 0.4],  [1, 4, 0.7],  [1, 6, 0.5],
    [2, 3, 0.4],  [2, 5, 0.7],  [2, 6, 0.5],
    [3, 4, 0.3],  [3, 5, 0.3],
    [4, 5, 0.5],  [4, 6, 0.6],  [4, 7, 0.7],
    [5, 6, 0.6],  [5, 8, 0.7],
    [6, 7, 0.5],  [6, 8, 0.5],  [6, 9, 0.7],
    [7, 9, 0.6],  [8, 9, 0.6],
    [9, 10, 0.9],
];

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
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
});

// ── Map node positions to screen ────────────────────────────────────

function getNodeScreen(node) {
    // Tree occupies right portion of screen
    const treeLeft = isMobile ? W * 0.1 : W * 0.48;
    const treeRight = isMobile ? W * 0.9 : W * 0.95;
    const treeTop = H * 0.05;
    const treeBottom = H * 0.95;
    const treeW = treeRight - treeLeft;
    const treeH = treeBottom - treeTop;

    return {
        x: treeLeft + node.x * treeW,
        y: treeTop + node.y * treeH,
    };
}

// ── Draw Concentric Node (p5-style) ─────────────────────────────────

function drawNode(node, activation) {
    const pos = getNodeScreen(node);
    const baseRadius = (isMobile ? 22 : 35) * node.r;
    const step = isMobile ? 3 : 2;
    const count = Math.floor(baseRadius / step);

    // Activation makes node bolder and slightly larger
    const scale = 1 + activation * 0.2;
    const baseAlpha = 0.15 + activation * 0.5;

    ctx.lineWidth = 0.5 + activation * 0.5;

    for (let c = 1; c <= count; c++) {
        const r = c * step * scale;
        const fade = c / count;
        const alpha = baseAlpha * (0.3 + fade * 0.7);
        ctx.strokeStyle = `rgba(0,0,0,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Inner dot for activated nodes
    if (activation > 0.3) {
        ctx.fillStyle = `rgba(0,0,0,${(activation * 0.4).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2 + activation * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ── Draw Edge with Pulse ────────────────────────────────────────────

function drawEdge(fromNode, toNode, weight, scrollT) {
    const from = getNodeScreen(fromNode);
    const to = getNodeScreen(toNode);

    // Base edge
    const baseAlpha = 0.08 + weight * 0.12;
    ctx.strokeStyle = `rgba(0,0,0,${baseAlpha.toFixed(3)})`;
    ctx.lineWidth = 0.3 + weight * 1.2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    // Pulse traveling along edge (scroll-driven)
    // Pulse position based on scroll + edge depth
    const edgeDepth = (fromNode.y + toNode.y) / 2;
    const pulsePhase = (scrollT * 3 - edgeDepth) % 1;
    if (pulsePhase > 0 && pulsePhase < 0.3) {
        const t = pulsePhase / 0.3;
        const px = from.x + (to.x - from.x) * t;
        const py = from.y + (to.y - from.y) * t;
        const pulseAlpha = Math.sin(t * Math.PI) * 0.5 * weight;

        // Pulse glow
        ctx.fillStyle = `rgba(0,0,0,${pulseAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, 2 + weight * 3, 0, Math.PI * 2);
        ctx.fill();

        // Bright line segment near pulse
        const t0 = Math.max(0, t - 0.15);
        const t1 = Math.min(1, t + 0.05);
        ctx.strokeStyle = `rgba(0,0,0,${(pulseAlpha * 0.8).toFixed(3)})`;
        ctx.lineWidth = 0.5 + weight * 2;
        ctx.beginPath();
        ctx.moveTo(from.x + (to.x - from.x) * t0, from.y + (to.y - from.y) * t0);
        ctx.lineTo(from.x + (to.x - from.x) * t1, from.y + (to.y - from.y) * t1);
        ctx.stroke();
    }
}

// ── Sacred Geometry Overlays ────────────────────────────────────────

function drawSacredGeometry(scrollT) {
    const cx = getNodeScreen(NODES[6]).x; // Tiferet = center
    const cy = getNodeScreen(NODES[6]).y;

    // Outer circle encompassing the tree
    const outerR = isMobile ? Math.min(W, H) * 0.42 : H * 0.44;
    ctx.strokeStyle = `rgba(0,0,0,0.04)`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    // Second outer circle
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * 1.08, 0, Math.PI * 2);
    ctx.stroke();

    // Three pillars (vertical lines)
    const pillars = [0.22, 0.5, 0.78];
    const treeLeft = isMobile ? W * 0.1 : W * 0.48;
    const treeRight = isMobile ? W * 0.9 : W * 0.95;
    const treeW = treeRight - treeLeft;

    ctx.strokeStyle = `rgba(0,0,0,0.025)`;
    ctx.lineWidth = 0.5;
    for (const px of pillars) {
        const sx = treeLeft + px * treeW;
        ctx.beginPath();
        ctx.moveTo(sx, H * 0.02);
        ctx.lineTo(sx, H * 0.98);
        ctx.stroke();
    }

    // Rotating hexagram (Star of David) — slow rotation from scroll
    const hexAngle = scrollT * Math.PI * 0.5;
    const hexR = outerR * 0.55;
    ctx.strokeStyle = `rgba(0,0,0,0.035)`;
    ctx.lineWidth = 0.5;

    // Upward triangle
    ctx.beginPath();
    for (let i = 0; i <= 3; i++) {
        const a = hexAngle + (i * Math.PI * 2) / 3 - Math.PI / 2;
        const px = cx + Math.cos(a) * hexR;
        const py = cy + Math.sin(a) * hexR;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Downward triangle
    ctx.beginPath();
    for (let i = 0; i <= 3; i++) {
        const a = hexAngle + (i * Math.PI * 2) / 3 + Math.PI / 2;
        const px = cx + Math.cos(a) * hexR;
        const py = cy + Math.sin(a) * hexR;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Small circles at each node position (Rosicrucian rose points)
    for (const node of NODES) {
        const pos = getNodeScreen(node);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// ── Compute Node Activations ────────────────────────────────────────
// Activation flows top-to-bottom driven by scroll.

function getActivation(node, scrollT) {
    // Wave sweeps from top (y=0.04) at scrollT=0 to bottom (y=0.88) at scrollT=1
    const topY = 0.04;
    const bottomY = 0.88;
    const wave = topY + scrollT * (bottomY - topY);
    const dist = Math.abs(node.y - wave);
    return Math.max(0, 1 - dist * 2.5);
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

// ── Animation Loop ──────────────────────────────────────────────────

function frame(ts) {
    time = ts * 0.001;

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - H;
    const scrollT = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Sacred geometry background layer
    drawSacredGeometry(scrollT);

    // Draw edges with pulses
    for (const [fromId, toId, weight] of EDGES) {
        drawEdge(NODES[fromId], NODES[toId], weight, scrollT);
    }

    // Draw nodes with activation
    for (const node of NODES) {
        const activation = getActivation(node, scrollT);
        drawNode(node, activation);
    }

    requestAnimationFrame(frame);
}

// ── Init ────────────────────────────────────────────────────────────

function init() {
    resize();
    requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', init);
