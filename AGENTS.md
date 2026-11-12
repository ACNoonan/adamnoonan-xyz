# adamnoonan-xyz

Personal website. Static site (HTML/CSS/JS), no build step, deployed to Vercel.

## Workflow: ship every change

After **every** change to this repo (content, code, styles, copy — anything visible), without waiting to be asked:

1. `git add` the changed files and commit with a short, conventional message matching the existing log style — e.g. `content: ...`, `style: ...`, `fix: ...`.
2. `git push origin master`.
3. Deploy to production with `vercel --prod`.

This is Adam's standing instruction — he wants to see each change live so he can verify it. Don't batch unrelated edits into one commit; one logical change per commit, ship immediately.

The Vercel project `adamnoonan-xyz-1` (the one serving adamnoonan.xyz) is linked via `.vercel/repo.json`, so `vercel --prod` works without arguments. It also deploys from GitHub on every push to master. Report the production URL Vercel returns so Adam can click through.
