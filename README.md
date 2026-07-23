# Anis Fakhfakh — Portfolio

A single-page, plain HTML/CSS/JS portfolio site (no build tools, no
frameworks). Covers summary, experience, education, skills, personal +
Upwork/freelance projects, and a contact form, with a dark/light toggle and
scroll animations.

- **Preview locally**: double-click `index.html`.
- **Customize content, colors, photo, CV, projects, skills**: see
  [`CUSTOMIZE.md`](CUSTOMIZE.md) — written for non-developers, no coding
  knowledge required.
- **Deploy**: push this folder to a GitHub repo and enable GitHub Pages
  (Settings → Pages → deploy from the `main` branch). The included `CNAME`
  file points the site at `anisfakhfakh.com` once that domain is purchased
  and its DNS is configured to GitHub Pages.

## Structure

```
index.html        All page content (single scrolling page)
css/style.css      Colors, layout, components, animations, responsive rules
js/script.js       Theme toggle, mobile nav, scrollspy, scroll reveal,
                   typing effect, contact form handling
assets/images/     Profile photo
assets/cv/         Downloadable CV (PDF)
assets/favicon.svg Site favicon
CNAME              Custom domain for GitHub Pages
```
