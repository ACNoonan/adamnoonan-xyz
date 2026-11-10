#!/usr/bin/env python3
"""Local writing desk for adamnoonan.xyz.

    python3 tools/write.py

Opens an editor in the browser. Each page's prose lives in a `story.md` next to
its index.html. Saving renders the Markdown into the page between the
`<!-- story:start -->` and `<!-- story:end -->` markers. Publish commits only
those two files, pushes to master and runs `vercel --prod`.

Markdown supported: `## heading`, paragraphs (blank line between), `- list`,
`*italic*`, `**bold**`, `[text](url)`, and `---` for a rule. Anything else is
passed through as plain text. Frontmatter holds `draft: true|false`.
"""

import html
import json
import os
import re
import subprocess
import sys
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent.parent
EDITOR = Path(__file__).resolve().parent / "editor.html"
PORT = int(os.environ.get("WRITE_PORT", "4747"))
START = re.compile(r"^([ \t]*)<!-- story:start.*?-->\n", re.M)
END = re.compile(r"^[ \t]*<!-- story:end -->", re.M)
BADGE = '<span class="draft-badge">draft</span>'


# --- Markdown -------------------------------------------------------------

def inline(text):
    t = html.escape(text, quote=False)
    t = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)",
               lambda m: f'<a href="{html.escape(m.group(2))}">{m.group(1)}</a>', t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", t)
    t = re.sub(r"(?<=\w)'(?=\w)", "’", t)  # apostrophes in words
    return t


def render(md):
    out = []
    for block in re.split(r"\n\s*\n", md.strip()):
        lines = [l.rstrip() for l in block.strip().splitlines()]
        if not lines:
            continue
        if lines[0].startswith("## "):
            out.append(f"<h2>{inline(lines[0][3:].strip())}</h2>")
            lines = lines[1:]
            if not lines:
                continue
        if lines == ["---"]:
            out.append("<hr>")
        elif all(re.match(r"[-*] ", l) for l in lines):
            items = "".join(f"<li>{inline(l[2:].strip())}</li>" for l in lines)
            out.append(f"<ul>{items}</ul>")
        else:
            out.append(f"<p>{inline(' '.join(l.strip() for l in lines))}</p>")
    return out


def split_front(text):
    meta = {"draft": False}
    m = re.match(r"---\n(.*?)\n---\n?", text, re.S)
    if m:
        for line in m.group(1).splitlines():
            k, _, v = line.partition(":")
            if k.strip() == "draft":
                meta["draft"] = v.strip().lower() == "true"
        text = text[m.end():]
    return meta, text.lstrip("\n")


def join_front(meta, body):
    return f"---\ndraft: {'true' if meta['draft'] else 'false'}\n---\n\n{body.strip()}\n"


# --- Pages ----------------------------------------------------------------

def stories():
    found = []
    for md in sorted(ROOT.glob("*/*/story.md")):
        page = md.parent / "index.html"
        if not page.exists():
            continue
        title = re.search(r'<h1 class="post-title">(.*?)</h1>', page.read_text())
        imgs = sorted(p.name for p in (md.parent / "img").glob("*.png")) if (md.parent / "img").exists() else []
        found.append({
            "slug": str(md.parent.relative_to(ROOT)),
            "title": html.unescape(title.group(1)) if title else md.parent.name,
            "images": imgs,
        })
    return found


def safe_dir(slug):
    d = (ROOT / slug).resolve()
    if ROOT not in d.parents or not (d / "story.md").exists():
        raise ValueError(f"no story.md at {slug}")
    return d


def save(slug, body, draft):
    d = safe_dir(slug)
    (d / "story.md").write_text(join_front({"draft": draft}, body))
    page = d / "index.html"
    s = page.read_text()
    a, b = START.search(s), END.search(s)
    if not a or not b or b.start() < a.end():
        raise ValueError(f"{page} is missing the story:start / story:end markers")
    indent = a.group(1)
    inner = "".join(f"{indent}{line}\n" for line in render(body))
    s = s[:a.end()] + inner + s[b.start():]
    s = re.sub(r'(<p class="post-meta">.*?)(?:<span class="draft-badge">draft</span>)?(</p>)',
               lambda m: m.group(1) + (BADGE if draft else "") + m.group(2), s, count=1)
    page.write_text(s)
    return [d / "story.md", page]


def run(cmd):
    p = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    return p.returncode, (p.stdout + p.stderr).strip()


def publish(slug, body, draft, message):
    files = [str(f.relative_to(ROOT)) for f in save(slug, body, draft)]
    log = []
    code, out = run(["git", "diff", "--quiet", "--", *files])
    if code == 0 and not run(["git", "ls-files", "--others", "--exclude-standard", "--", *files])[1]:
        log.append("No changes to the text since the last commit. Deploying anyway.")
    else:
        run(["git", "add", "--", *files])
        code, out = run(["git", "commit", "-m", message, "--", *files])
        log.append(out)
        if code:
            return False, "\n".join(log), None
    code, out = run(["git", "push", "origin", "master"])
    log.append(out)
    if code:
        return False, "\n".join(log), None
    code, out = run(["vercel", "--prod", "--yes"])
    log.append(out)
    urls = re.findall(r"https://\S+\.vercel\.app\S*", out)
    return code == 0, "\n".join(log), (urls[-1] if urls else None)


# --- Server ---------------------------------------------------------------

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    def log_message(self, *a):
        pass

    def send_json(self, obj, status=200):
        data = json.dumps(obj).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        u = urlparse(self.path)
        if u.path in ("/_write", "/_write/"):
            data = EDITOR.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(data)
        elif u.path == "/_write/api/stories":
            self.send_json(stories())
        elif u.path == "/_write/api/story":
            try:
                d = safe_dir(parse_qs(u.query)["slug"][0])
                meta, body = split_front((d / "story.md").read_text())
                self.send_json({"body": body, "draft": meta["draft"]})
            except Exception as e:
                self.send_json({"error": str(e)}, 400)
        else:
            super().do_GET()

    def do_POST(self):
        u = urlparse(self.path)
        req = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or "{}")
        try:
            if u.path == "/_write/api/render":
                self.send_json({"html": "\n".join(render(req["body"]))})
            elif u.path == "/_write/api/save":
                save(req["slug"], req["body"], req["draft"])
                self.send_json({"ok": True})
            elif u.path == "/_write/api/publish":
                ok, log, url = publish(req["slug"], req["body"], req["draft"], req["message"])
                self.send_json({"ok": ok, "log": log, "url": url})
            else:
                self.send_json({"error": "not found"}, 404)
        except Exception as e:
            self.send_json({"error": str(e)}, 400)


def main():
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    url = f"http://localhost:{PORT}/_write/"
    print(f"Writing desk: {url}  (Ctrl-C to stop)")
    if "--no-open" not in sys.argv:
        threading.Timer(0.4, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
