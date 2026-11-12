# adamnoonan-xyz

Personal website. Static site (HTML/CSS/JS), no build step, deployed to Vercel.

## Workflow: ship every change

After **every** change to this repo (content, code, styles, copy — anything visible), without waiting to be asked:

1. `git add` the changed files and commit with a short, conventional message matching the existing log style — e.g. `content: ...`, `style: ...`, `fix: ...`.
2. `git push origin master`. That deploys to production: Vercel builds every push to master.

This is Adam's standing instruction — he wants to see each change live so he can verify it. Don't batch unrelated edits into one commit; one logical change per commit, ship immediately.

Don't also run `vercel --prod`; it deploys the same commit a second time. The Vercel project is `adamnoonan-xyz-1` (it serves adamnoonan.xyz), linked locally via `.vercel/repo.json` for CLI use like `vercel ls`. After pushing, check the change on the live domain and give Adam that link.
