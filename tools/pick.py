#!/usr/bin/env python3
"""Pick the paintings for an art series from every render Adam rated love.

    python3 tools/pick.py

Reads the love ratings from ~/Documents/geometric-abstraction (override with GA_ROOT), shows them
all in one grid, and saves picks to tools/picks/mondrian-decomp.json as you click. "Use these"
copies the picks, in pick order, to art/mondrian-decomp/img/01.png... and rewrites the page's
painting grid and count. It does not commit; publish from tools/write.py or ask Claude to ship.

Included: untouched open-model output only (Qwen, base or fine-tuned). Left out: GA-10's API
arms (Opus, GPT, DeepSeek), the multi-artist rounds before GA-04b, and portfolio/ (edited or lab
cards).
"""

import hashlib
import html
import json
import os
import re
import shutil
import sys
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
GA = Path(os.environ.get("GA_ROOT", Path.home() / "Documents/geometric-abstraction")) / "experiments"
SERIES = ROOT / "art/mondrian-decomp"
PICKS = ROOT / "tools/picks/mondrian-decomp.json"
PAGE = Path(__file__).resolve().parent / "pick.html"
PORT = int(os.environ.get("PICK_PORT", "4748"))


def latest(path, key):
    out = {}
    for line in open(path):
        if line.strip():
            j = json.loads(line)
            out[j[key]] = j
    return out


def loves():
    items = []

    def add(rnd, img, arm, note=""):
        items.append({"round": rnd, "path": str(img), "arm": arm, "note": note})

    # GA-04b, GA-05, GA-06: ratings.jsonl id -> out/rate/<id>.png, key in rate_key.json
    for rnd, d in [("GA-04b", "2026-10-04-GA-04b-mondrian-grid"),
                   ("GA-05", "2026-10-06-GA-05-tune-on-liked"),
                   ("GA-06", "2026-10-21-GA-06-prompt-m3")]:
        out = GA / d / "out"
        key = json.load(open(out / "rate_key.json"))
        for i, r in latest(out / "ratings.jsonl", "id").items():
            if r["rating"] == "love":
                add(rnd, out / "rate" / f"{i}.png", key.get(i, {}).get("arm", ""))

    # GA-07 renders, judged in GA-08's tagging pass (the current 50 came from here)
    out = GA / "2026-10-23-GA-08-taste-features/out"
    key = json.load(open(out / "tag_key.json"))
    for i, r in latest(out / "tags.jsonl", "id").items():
        if r["verdict"] == "love":
            add("GA-07", out / "tag" / f"{i}.png", key[i]["arm"], r.get("note", ""))

    # GA-09, GA-10: rate_session responses key -> render id -> out/rate/<render>.png
    for rnd, d in [("GA-09", "2026-10-23-GA-09-rules"), ("GA-10", "2026-10-25-GA-10-m5-replication")]:
        out = GA / d / "out"
        key = json.load(open(out / "rate_session_key.json"))
        for k, r in latest(out / "rate_session/responses.jsonl", "key").items():
            meta = key[k]
            if r["rating"] == "love" and not meta["arm"].startswith("api_"):
                add(rnd, out / "rate" / f"{meta['render']}.png", meta["arm"])

    # one entry per distinct image (repeats and re-shown renders collapse)
    site = {hashlib.md5(p.read_bytes()).hexdigest(): int(p.stem) for p in (SERIES / "img").glob("*.png")}
    seen, uniq = set(), []
    for it in items:
        h = hashlib.md5(Path(it["path"]).read_bytes()).hexdigest()
        if h in seen:
            continue
        seen.add(h)
        it["id"] = h[:12]
        it["onsite"] = site.get(h)  # its number on the site today, or None
        uniq.append(it)
    return uniq


ITEMS = []


def apply(ids):
    by = {it["id"]: it for it in ITEMS}
    chosen = [by[i] for i in ids]
    img = SERIES / "img"
    for p in img.glob("*.png"):
        p.unlink()
    for n, it in enumerate(chosen, 1):
        shutil.copyfile(it["path"], img / f"{n:02d}.png")
    page = SERIES / "index.html"
    s = page.read_text()
    a = s.index('<div class="art-grid">')
    b = s.index("</div>", a)
    indent = " " * 16
    cells = "".join(
        f'\n{indent}<a href="img/{n:02d}.png"><img src="img/{n:02d}.png" '
        f'alt="Mondrian Decomp 1 no. {n}" loading="lazy"><span>{n}</span></a>' for n in range(1, len(chosen) + 1))
    s = s[:a] + '<div class="art-grid">' + cells + "\n" + indent[4:] + s[b:]
    s = re.sub(r'(<p class="post-meta">[^<]*?)\b\d+ paintings', rf"\g<1>{len(chosen)} paintings", s, count=1)
    page.write_text(s)
    return len(chosen)


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def send_json(self, obj, status=200):
        data = json.dumps(obj).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        u = urlparse(self.path)
        if u.path == "/":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(PAGE.read_bytes())
        elif u.path == "/api/items":
            picks = json.load(open(PICKS)) if PICKS.exists() else {"picks": []}
            self.send_json({"items": [{k: v for k, v in it.items() if k != "path"} for it in ITEMS],
                            "picks": picks["picks"]})
        elif u.path.startswith("/img/"):
            it = next((x for x in ITEMS if x["id"] == unquote(u.path[5:])), None)
            if not it:
                self.send_error(404)
                return
            data = Path(it["path"]).read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "image/png")
            self.send_header("Cache-Control", "max-age=3600")
            self.end_headers()
            self.wfile.write(data)
        else:
            self.send_error(404)

    def do_POST(self):
        req = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or "{}")
        u = urlparse(self.path)
        if u.path == "/api/picks":
            PICKS.parent.mkdir(exist_ok=True)
            PICKS.write_text(json.dumps({"picks": req["picks"]}, indent=1) + "\n")
            self.send_json({"ok": True})
        elif u.path == "/api/apply":
            self.send_json({"ok": True, "n": apply(req["picks"])})
        else:
            self.send_error(404)


def main():
    global ITEMS
    ITEMS = loves()
    counts = {}
    for it in ITEMS:
        counts[it["round"]] = counts.get(it["round"], 0) + 1
    print(f"{len(ITEMS)} distinct loves: {counts}")
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    url = f"http://localhost:{PORT}/"
    print(f"Picker: {url}  (Ctrl-C to stop)")
    if "--no-open" not in sys.argv:
        threading.Timer(0.4, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
