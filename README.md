# adamnoonan.xyz

Personal website for Adam Noonan.

## What this repo contains

- A lightweight static website (`index.html`, `style.css`, `script.js`).
- A profile page with background, contact links, and active project links.
- Canvas-based visual treatment for the page background.

## Projects featured on the site

- [`relay-cli`](https://github.com/ACNoonan/relay-cli) - Local agent harness CLI for orchestrating AI-assisted development workflows.
- [`legal-bot`](https://github.com/ACNoonan/legal-bot) - CLI-first legal research assistant with citation-focused workflows.
- [`colony`](https://github.com/ACNoonan/colony) - Early-stage Jido + Kafka runtime for coordination-heavy distributed agent systems.

## Local development

No build step is required.

Open `index.html` directly in a browser, or serve the directory with a static server.

Example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Writing desk

Page prose for the art series lives in `story.md` next to each page's `index.html`.
Edit it in the browser with:

```bash
python3 tools/write.py
```

Save renders the Markdown into the page between the `story:start` / `story:end`
markers. Publish commits those two files, pushes to master and runs `vercel --prod`.
To add another page, create a `story.md` beside it and wrap its prose in the markers.
`tools/` is excluded from the deploy by `.vercelignore`.

`python3 tools/pick.py` opens a picker with every painting Adam rated love in the geometric-abstraction
rounds (untouched Qwen output only). Picks save to `tools/picks/mondrian-decomp.json`; "Use these on the
site" copies them to `art/mondrian-decomp/img/` in pick order and rewrites the page's grid.

## Suggested repo standards for a personal-site repo

- Keep the site and README in sync (bio, project links, contact links).
- Use short, descriptive commits for content updates.
- If you add CI later, start simple with HTML/CSS/Markdown validation.
