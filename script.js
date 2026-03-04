// ── Which version? ──────────────────────────────────────────────────
// Use ?v=1 through ?v=5 in URL

const VERSION = parseInt(new URLSearchParams(location.search).get('v')) || 1;

// ── Simplex Noise ───────────────────────────────────────────────────

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
        return function(x, y) {
            const s2 = (x + y) * F2;
            const i = Math.floor(x + s2), j = Math.floor(y + s2);
            const t = (i + j) * G2;
            const x0 = x - (i - t), y0 = y - (j - t);
            const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
            const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
            const x2 = x0 - 1 + 2*G2, y2 = y0 - 1 + 2*G2;
            const ii = i & 255, jj = j & 255;
            let n0=0,n1=0,n2=0;
            let t0 = 0.5-x0*x0-y0*y0;
            if(t0>0){t0*=t0;const g=grad[perm[ii+perm[jj]]&7];n0=t0*t0*(g[0]*x0+g[1]*y0);}
            let t1=0.5-x1*x1-y1*y1;
            if(t1>0){t1*=t1;const g=grad[perm[ii+i1+perm[jj+j1]]&7];n1=t1*t1*(g[0]*x1+g[1]*y1);}
            let t2=0.5-x2*x2-y2*y2;
            if(t2>0){t2*=t2;const g=grad[perm[ii+1+perm[jj+1]]&7];n2=t2*t2*(g[0]*x2+g[1]*y2);}
            return 70*(n0+n1+n2);
        };
    }
    return { create };
})();

// ── Globals ─────────────────────────────────────────────────────────

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const seed = Math.random() * 2147483647;
const noise = SimplexNoise.create(seed);
const noise2 = SimplexNoise.create(seed + 7919);

let W, H, dpr;
let mouse = { x: -9999, y: -9999 };
let isMobile = window.innerWidth < 769;
let time = 0;

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
    if (versions[VERSION] && versions[VERSION].init) versions[VERSION].init();
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
});

// ── Shared: concentric circle node ──────────────────────────────────

function drawConcentricCircle(x, y, radius, alpha, step) {
    step = step || (isMobile ? 2.5 : 1.8);
    const count = Math.floor(radius / step);
    ctx.lineWidth = 0.5;
    for (let c = 1; c <= count; c++) {
        const fade = c / count;
        ctx.strokeStyle = `rgba(0,0,0,${(alpha * (0.3 + fade * 0.7)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, c * step, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// ── Shared: draw version marker ─────────────────────────────────────

function drawMarker() {
    ctx.save();
    ctx.font = '700 24px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.textAlign = 'right';
    ctx.fillText(`v${VERSION}`, W - 20, 36);
    ctx.restore();
}

// ── Shared: get scroll T ────────────────────────────────────────────

function getScrollT() {
    const maxScroll = document.documentElement.scrollHeight - H;
    return maxScroll > 0 ? window.scrollY / maxScroll : 0;
}

// ── Shared: tree area bounds ────────────────────────────────────────

function treeBounds() {
    const left = isMobile ? W * 0.1 : W * 0.48;
    const right = isMobile ? W * 0.9 : W * 0.95;
    const top = H * 0.05;
    const bottom = H * 0.95;
    return { left, right, top, bottom, w: right - left, h: bottom - top,
             cx: (left + right) / 2, cy: (top + bottom) / 2 };
}

// ════════════════════════════════════════════════════════════════════
// VERSION 1: Fractal Branching Network
// ════════════════════════════════════════════════════════════════════

const v1 = (() => {
    let nodes = [];
    let edges = [];

    function generate() {
        nodes = [];
        edges = [];
        const b = treeBounds();
        const maxDepth = isMobile ? 5 : 6;

        function branch(x, y, depth, parentIdx) {
            const idx = nodes.length;
            const r = 12 + (maxDepth - depth) * 5;
            nodes.push({ x, y, r, depth });
            if (parentIdx >= 0) edges.push([parentIdx, idx]);

            if (depth >= maxDepth) return;

            const children = depth < 2 ? 3 : 2;
            const spread = b.w * (0.18 / (depth + 1));
            const stepY = b.h / (maxDepth + 1);

            for (let c = 0; c < children; c++) {
                const angle = ((c / (children - 1 || 1)) - 0.5) * 2;
                const nx = x + angle * spread + noise(idx * 0.5 + c, depth) * spread * 0.3;
                const ny = y + stepY + noise(idx * 0.3, c * 2) * stepY * 0.2;
                branch(nx, ny, depth + 1, idx);
            }
        }

        branch(b.cx, b.top + 30, 0, -1);
    }

    function draw(scrollT) {
        const wave = scrollT;

        // Edges
        for (const [fi, ti] of edges) {
            const f = nodes[fi], t = nodes[ti];
            const edgeY = (f.y + t.y) / 2;
            const normY = (edgeY - treeBounds().top) / treeBounds().h;
            const active = Math.max(0, 1 - Math.abs(normY - wave) * 2.5);
            ctx.strokeStyle = `rgba(0,0,0,${(0.06 + active * 0.25).toFixed(3)})`;
            ctx.lineWidth = 0.3 + active * 1.5;
            ctx.beginPath();
            ctx.moveTo(f.x, f.y);
            // Slight curve
            const mx = (f.x + t.x) / 2 + noise2(fi * 0.1, ti * 0.1) * 15;
            const my = (f.y + t.y) / 2;
            ctx.quadraticCurveTo(mx, my, t.x, t.y);
            ctx.stroke();

            // Pulse
            if (active > 0.2) {
                const pt = (active - 0.2) / 0.8;
                const px = f.x + (t.x - f.x) * pt;
                const py = f.y + (t.y - f.y) * pt;
                ctx.fillStyle = `rgba(0,0,0,${(active * 0.3).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Nodes
        for (const n of nodes) {
            const normY = (n.y - treeBounds().top) / treeBounds().h;
            const active = Math.max(0, 1 - Math.abs(normY - wave) * 2.5);
            drawConcentricCircle(n.x, n.y, n.r * (1 + active * 0.3), 0.15 + active * 0.5);
        }
    }

    return { init: generate, draw };
})();

// ════════════════════════════════════════════════════════════════════
// VERSION 2: Emergent Graph (noise-placed nodes, proximity edges)
// ════════════════════════════════════════════════════════════════════

const v2 = (() => {
    let nodes = [];
    let edges = [];

    function generate() {
        nodes = [];
        edges = [];
        const b = treeBounds();
        const count = isMobile ? 25 : 40;

        for (let i = 0; i < count; i++) {
            const x = b.left + noise(i * 0.7, 0) * b.w * 0.4 + b.w * 0.3;
            const y = b.top + (i / count) * b.h + noise(i * 0.5, 1) * 40;
            const r = 10 + Math.abs(noise(i * 0.4, 2)) * 25;
            nodes.push({ x, y, r });
        }

        // Connect nearby nodes
        const maxDist = isMobile ? 130 : 160;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < maxDist) {
                    edges.push([i, j, 1 - d / maxDist]);
                }
            }
        }
    }

    function draw(scrollT) {
        const b = treeBounds();

        // Edges
        for (const [fi, ti, w] of edges) {
            const f = nodes[fi], t = nodes[ti];
            const normY = ((f.y + t.y) / 2 - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2.2);
            ctx.strokeStyle = `rgba(0,0,0,${(0.03 + w * 0.08 + active * 0.2).toFixed(3)})`;
            ctx.lineWidth = 0.2 + w * 0.8 + active * 1;
            ctx.beginPath();
            ctx.moveTo(f.x, f.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
        }

        // Nodes
        for (const n of nodes) {
            const normY = (n.y - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2.2);
            drawConcentricCircle(n.x, n.y, n.r * (1 + active * 0.25), 0.12 + active * 0.5);
        }
    }

    return { init: generate, draw };
})();

// ════════════════════════════════════════════════════════════════════
// VERSION 3: Recursive Sacred Geometry (Sierpinski + concentric nodes)
// ════════════════════════════════════════════════════════════════════

const v3 = (() => {
    let nodes = [];
    let edges = [];

    function generate() {
        nodes = [];
        edges = [];
        const b = treeBounds();
        const maxDepth = isMobile ? 4 : 5;

        // Start with a large triangle
        const margin = 20;
        const top = { x: b.cx, y: b.top + margin };
        const bl = { x: b.left + margin, y: b.bottom - margin };
        const br = { x: b.right - margin, y: b.bottom - margin };

        function subdivide(a, c2, c3, depth) {
            const idx = nodes.length;
            // Node at each vertex
            const addNode = (p) => {
                const existing = nodes.findIndex(n =>
                    Math.abs(n.x - p.x) < 2 && Math.abs(n.y - p.y) < 2);
                if (existing >= 0) return existing;
                const ni = nodes.length;
                const r = 8 + (maxDepth - depth) * 6;
                nodes.push({ x: p.x, y: p.y, r, depth });
                return ni;
            };

            const i0 = addNode(a);
            const i1 = addNode(c2);
            const i2 = addNode(c3);
            edges.push([i0, i1], [i1, i2], [i2, i0]);

            if (depth >= maxDepth) return;

            const m01 = { x: (a.x + c2.x) / 2, y: (a.y + c2.y) / 2 };
            const m12 = { x: (c2.x + c3.x) / 2, y: (c2.y + c3.y) / 2 };
            const m02 = { x: (a.x + c3.x) / 2, y: (a.y + c3.y) / 2 };

            subdivide(a, m01, m02, depth + 1);
            subdivide(m01, c2, m12, depth + 1);
            subdivide(m02, m12, c3, depth + 1);
        }

        subdivide(top, bl, br, 0);
    }

    function draw(scrollT) {
        const b = treeBounds();

        // Edges
        for (const [fi, ti] of edges) {
            const f = nodes[fi], t = nodes[ti];
            const normY = ((f.y + t.y) / 2 - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2);
            ctx.strokeStyle = `rgba(0,0,0,${(0.04 + active * 0.18).toFixed(3)})`;
            ctx.lineWidth = 0.3 + active * 1;
            ctx.beginPath();
            ctx.moveTo(f.x, f.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
        }

        // Nodes
        for (const n of nodes) {
            const normY = (n.y - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2);
            drawConcentricCircle(n.x, n.y, n.r * (1 + active * 0.3), 0.1 + active * 0.5);
        }
    }

    return { init: generate, draw };
})();

// ════════════════════════════════════════════════════════════════════
// VERSION 4: Drifting Neural Net Layers
// ════════════════════════════════════════════════════════════════════

const v4 = (() => {
    let layers = [];
    let edges = [];

    function generate() {
        layers = [];
        edges = [];
        const b = treeBounds();
        const layerCount = isMobile ? 5 : 7;
        const nodesPerLayer = isMobile ? [3,5,6,5,3] : [3,5,7,8,7,5,3];

        for (let l = 0; l < layerCount; l++) {
            const count = nodesPerLayer[l];
            const y = b.top + (l / (layerCount - 1)) * b.h;
            const layer = [];
            for (let n = 0; n < count; n++) {
                const x = b.cx + ((n / (count - 1 || 1)) - 0.5) * b.w * 0.7;
                // Drift offset from noise
                const dx = noise(l * 3 + n * 0.5, 0) * 20;
                const dy = noise(l * 3 + n * 0.5, 1) * 15;
                const r = 10 + Math.abs(noise(l + n * 0.3, 2)) * 18;
                layer.push({ x: x + dx, y: y + dy, r, layer: l });
            }
            layers.push(layer);
        }

        // Connect adjacent layers
        for (let l = 0; l < layers.length - 1; l++) {
            for (const from of layers[l]) {
                for (const to of layers[l + 1]) {
                    const dx = from.x - to.x;
                    const dy = from.y - to.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    const maxD = b.w * 0.5;
                    if (d < maxD) {
                        const w = (1 - d / maxD) * Math.abs(noise(from.x * 0.01, to.y * 0.01));
                        if (w > 0.1) edges.push([from, to, w]);
                    }
                }
            }
        }
    }

    function draw(scrollT) {
        const b = treeBounds();

        // Edges — flex with time
        for (const [f, t, w] of edges) {
            const normY = ((f.y + t.y) / 2 - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2);
            const flex = Math.sin(time * 0.5 + f.x * 0.01) * 8;
            ctx.strokeStyle = `rgba(0,0,0,${(0.02 + w * 0.06 + active * 0.15).toFixed(3)})`;
            ctx.lineWidth = 0.2 + w * 0.6 + active * 1.2;
            ctx.beginPath();
            ctx.moveTo(f.x, f.y);
            const mx = (f.x + t.x) / 2 + flex;
            const my = (f.y + t.y) / 2;
            ctx.quadraticCurveTo(mx, my, t.x, t.y);
            ctx.stroke();
        }

        // Nodes
        for (const layer of layers) {
            for (const n of layer) {
                const normY = (n.y - b.top) / b.h;
                const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2);
                // Subtle drift
                const dx = Math.sin(time * 0.3 + n.x * 0.02) * 3;
                const dy = Math.cos(time * 0.25 + n.y * 0.02) * 2;
                drawConcentricCircle(n.x + dx, n.y + dy, n.r * (1 + active * 0.3), 0.12 + active * 0.5);
            }
        }
    }

    return { init: generate, draw };
})();

// ════════════════════════════════════════════════════════════════════
// VERSION 5: Voronoi Cells with Node Centers
// ════════════════════════════════════════════════════════════════════

const v5 = (() => {
    let sites = [];
    let voronoiEdges = [];
    let neighborPairs = [];

    function generate() {
        sites = [];
        voronoiEdges = [];
        neighborPairs = [];
        const b = treeBounds();
        const count = isMobile ? 20 : 35;

        for (let i = 0; i < count; i++) {
            const x = b.left + (noise(i * 0.7, 0) + 1) * 0.5 * b.w;
            const y = b.top + (i / count) * b.h + noise(i * 0.5, 1) * 30;
            const r = 8 + Math.abs(noise(i * 0.4, 2)) * 20;
            sites.push({ x, y, r });
        }

        // Approximate Voronoi by sampling grid and finding cell boundaries
        const step = isMobile ? 8 : 5;
        const checked = new Set();
        for (let gy = b.top; gy < b.bottom; gy += step) {
            for (let gx = b.left; gx < b.right; gx += step) {
                // Find two closest sites
                let d1 = Infinity, d2 = Infinity, i1 = -1, i2 = -1;
                for (let i = 0; i < sites.length; i++) {
                    const dx = gx - sites[i].x, dy = gy - sites[i].y;
                    const d = dx * dx + dy * dy;
                    if (d < d1) { d2 = d1; i2 = i1; d1 = d; i1 = i; }
                    else if (d < d2) { d2 = d; i2 = i; }
                }
                // If close to boundary, record as edge point
                const diff = Math.abs(Math.sqrt(d1) - Math.sqrt(d2));
                if (diff < step * 1.5) {
                    voronoiEdges.push({ x: gx, y: gy });
                    const key = Math.min(i1, i2) + ',' + Math.max(i1, i2);
                    if (!checked.has(key)) {
                        checked.add(key);
                        neighborPairs.push([i1, i2]);
                    }
                }
            }
        }
    }

    function draw(scrollT) {
        const b = treeBounds();

        // Voronoi cell boundaries
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        for (const pt of voronoiEdges) {
            const normY = (pt.y - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2.5);
            ctx.globalAlpha = 0.04 + active * 0.1;
            ctx.fillRect(pt.x, pt.y, isMobile ? 2 : 1.5, isMobile ? 2 : 1.5);
        }
        ctx.globalAlpha = 1;

        // Neighbor connections
        for (const [i, j] of neighborPairs) {
            const f = sites[i], t = sites[j];
            const normY = ((f.y + t.y) / 2 - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2.5);
            ctx.strokeStyle = `rgba(0,0,0,${(0.03 + active * 0.12).toFixed(3)})`;
            ctx.lineWidth = 0.3 + active * 0.8;
            ctx.beginPath();
            ctx.moveTo(f.x, f.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
        }

        // Nodes
        for (const s of sites) {
            const normY = (s.y - b.top) / b.h;
            const active = Math.max(0, 1 - Math.abs(normY - scrollT) * 2.5);
            drawConcentricCircle(s.x, s.y, s.r * (1 + active * 0.3), 0.1 + active * 0.5);
        }
    }

    return { init: generate, draw };
})();

// ════════════════════════════════════════════════════════════════════

const versions = { 1: v1, 2: v2, 3: v3, 4: v4, 5: v5 };

// ── Mouse Proximity Text Scaling ────────────────────────────────────

const proximityRadius = 200;
const maxScale = 1.12;

function updateTextProximity() {
    if (isMobile) return;
    const els = document.querySelectorAll('.proximity-text');
    const mx = mouse.x, my = mouse.y;
    for (const el of els) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        if (dist < proximityRadius) {
            const t = 1 - dist / proximityRadius;
            el.style.transform = `scale(${1 + (maxScale - 1) * t * t})`;
        } else {
            el.style.transform = '';
        }
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

// ── Animation Loop ──────────────────────────────────────────────────

function frame(ts) {
    time = ts * 0.001;
    const scrollT = getScrollT();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const v = versions[VERSION];
    if (v) v.draw(scrollT);

    drawMarker();
    requestAnimationFrame(frame);
}

function init() {
    resize();
    requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', init);
