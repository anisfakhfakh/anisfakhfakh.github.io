# Anis Fakhfakh Portfolio — context for Claude

Single-page HTML/CSS/JS portfolio, no build tools. Deployed via GitHub Pages
from this repo (`anisfakhfakh/anisfakhfakh.github.io`), custom domain
`anisfakhfakh.com` via Cloudflare DNS. Anis has ~0 web dev background —
keep explanations non-technical.

- **For any routine content edit** (colors, photo, CV, projects, experience,
  skills, Formspree, enabling Certifications): read `CUSTOMIZE.md` first.
- Nearly all text exists twice in `index.html` — `class="lang-en"` and
  `class="lang-fr"` pairs, shown/hidden via `<html data-lang="en|fr">`. Keep
  both in sync for any new text.
- **Do not nest HTML comments** (`<!-- ... <!-- ... --> ... -->` is invalid
  and spills raw text onto the page). Use the `ADD_GITHUB_LINK_HERE`
  placeholder-href pattern instead for "hide until ready" content.
- `.gitignore` excludes root-level backup/source files (raw photo, source
  CV, source logo PNGs) — the real files the site uses live under `assets/`.
  Gitignore patterns here are anchored with a leading `/` on purpose so they
  only match the root copies, not `assets/**` — don't remove the anchors.
- After any change: `git add -A && git commit -m "..." && git push` — the
  live site updates within about a minute, no other deploy step needed.
- Deployment/DNS/hosting history and decisions: see `PROJECT_HANDOFF.md`
  (not pushed to GitHub — local reference only).
