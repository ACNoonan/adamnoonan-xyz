# adamnoonan.xyz

Personal website for Adam Noonan.

## What this repo contains

- A lightweight static website (`index.html`, `style.css`, `script.js`), with no build step.
- The home page: research, art, about, background, open source, writings and contact.
- `blog/`: the posts. `art/`: the painting series, with a viewer that runs each sketch live beside its code and prompt (`art/viewer.js`).
- `kit.js` loads PostHog analytics through the `/kit/*` rewrites in `vercel.json`. Vercel Web
  Analytics runs beside it.
- Canvas-based visual treatment for the page background.

The projects and papers featured on the site are listed in `index.html`. That file is the
source of truth, so this README doesn't repeat them.

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
markers. Publish commits those two files and pushes to master, which deploys.
To add another page, create a `story.md` beside it and wrap its prose in the markers.
`tools/` is excluded from the deploy by `.vercelignore`.

`python3 tools/pick.py` opens a picker with every painting Adam rated love in the geometric-abstraction
rounds (untouched Qwen output only). Picks save to `tools/picks/mondrian-decomp.json`; "Use these on the
site" copies them to `art/mondrian-decomp/img/` in pick order and rewrites the page's grid.

## Suggested repo standards for a personal-site repo

- Keep the site and README in sync (bio, project links, contact links).
- Use short, descriptive commits for content updates.
- If you add CI later, start simple with HTML/CSS/Markdown validation.
