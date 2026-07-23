# Customizing Your Portfolio

This site is plain HTML, CSS and JavaScript — no build tools, no installs.
You edit `index.html`, `css/style.css`, and `js/script.js` directly with any
text editor (Notepad, VS Code, etc.) and refresh your browser to see changes.

## 1. Preview it locally

Just double-click `index.html` — it opens in your browser and works fully,
including the CV download link. (The contact form needs your real Formspree
ID to actually send emails — see step 8 below.)

## 2. Editing bilingual text (English / French)

Almost every piece of text on the site appears **twice** in `index.html`,
right next to each other:

```html
<span class="lang-en">Home</span><span class="lang-fr">Accueil</span>
```

Only one shows at a time — whichever matches the language button (top
right) — but both live in the file at once. To change wording in one
language, just edit the text inside the matching `lang-en` or `lang-fr`
tag; the other language is unaffected.

Skills/tools spelled the same in both languages (Python, Docker, Claude
Code, MLOps, etc.) are **not** duplicated — there's just one plain copy of
those, no `lang-en`/`lang-fr` wrapper needed.

## 3. Change colors or fonts

Open `css/style.css` and look at the very top — **Section 1, "FONTS & CSS
VARIABLES — EDIT COLORS HERE"**. Every color on the site traces back to one
of these values, so changing e.g. `--primary-color` there changes buttons,
links, and highlights everywhere at once. There's a separate block for dark
mode colors right below it (Section 2).

## 4. Swap your profile photo

Replace the file at `assets/images/profile.jpg` with your new photo, **keeping
the exact same filename** (`profile.jpg`). If you want a different filename,
also update the one `<img src="assets/images/profile.jpg">` line inside the
Hero section (`id="home"`) in `index.html`.

## 5. Replace your CV

Same idea: replace `assets/cv/Anis-Fakhfakh-CV.pdf` with your new PDF, keeping
the filename. If you rename it, update both places it's linked in
`index.html`: the "Download CV" button in the Hero section, and the
"Download CV" link in the Contact section.

## 6. Add or remove a project

In `index.html`, find the `<section id="projects">` section. Each project is
a block that looks like this:

```html
<!-- ============ COPY BLOCK: PROJECT CARD (start) ============ -->
<div class="project-card reveal">
  <h4>
    <span class="lang-en">Project Title</span>
    <span class="lang-fr">Titre du projet</span>
  </h4>
  <p class="lang-en">Short description of the project.</p>
  <p class="lang-fr">Courte description du projet.</p>
  <a class="btn btn-outline project-link" href="https://github.com/you/repo" target="_blank" rel="noopener">
    <img class="btn-icon" src="https://cdn.simpleicons.org/github" alt=""> <span class="lang-en">View on GitHub</span><span class="lang-fr">Voir sur GitHub</span>
  </a>
</div>
<!-- ============ COPY BLOCK: PROJECT CARD (end) ============ -->
```

- **To add one**: copy this whole block, paste it before the closing
  `</div>` of the grid (`.projects-grid`), and edit the title, description,
  and link.
- **To remove one**: delete the whole block from its `(start)` comment to
  its `(end)` comment.
- **The "View on GitHub" button shows/hides itself automatically**: if you
  don't have a repo link yet, set `href="ADD_GITHUB_LINK_HERE"` (leave that
  exact placeholder text) and the button stays hidden — no need to comment
  anything out. The moment you replace it with a real URL and refresh the
  page, the button appears. Two of the existing personal projects already
  use this placeholder.

## 7. Add or remove an experience entry

In `index.html`, find `<section id="experience">`. Each job is a block like:

```html
<!-- ============ COPY BLOCK: EXPERIENCE ITEM (start) ============ -->
<div class="timeline-item reveal" data-animation="slideInFromLeft">
  <div class="timeline-dot"></div>
  <div class="timeline-card">
    <h3><span class="lang-en">Job Title</span><span class="lang-fr">Titre du poste</span></h3>
    <h4>Company Name</h4>
    <span class="meta">
      <span class="lang-en">Month Year – Month Year · City, Country</span>
      <span class="lang-fr">Mois Année – Mois Année · Ville, Pays</span>
    </span>
    <ul class="lang-en">
      <li>An achievement or responsibility.</li>
    </ul>
    <ul class="lang-fr">
      <li>Une réalisation ou responsabilité.</li>
    </ul>
  </div>
</div>
<!-- ============ COPY BLOCK: EXPERIENCE ITEM (end) ============ -->
```

Copy it to add a new job (paste it **first**, since the most recent job goes
on top), or delete it to remove one. Each bullet needs one line in the
`lang-en` list and a matching line in the `lang-fr` list (same order).
Alternate `data-animation="slideInFromLeft"` and `"slideInFromRight"`
between entries if you want the left/right stagger effect, or leave it out
entirely for a plain fade-up.

## 8. Set up the contact form (Formspree)

The form won't actually deliver messages until you do this **one-time,
free** setup:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and verify it with your email.
3. Copy the endpoint URL Formspree gives you (looks like
   `https://formspree.io/f/abcijklm`).
4. In `index.html`, find `<section id="contact">`, then the line:
   `<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   and replace `YOUR_FORM_ID` with your real endpoint.

Until you do this, submitting the form will show a friendly error message —
that's expected, not a bug.

## 9. Add or remove a skill / language

Skills live in `<section id="skills">`, inside three `.pill-cloud` groups
(ML & Data Science / Engineering / Practices). A skill that's spelled the
same in English and French is one line:

```html
<span class="pill"><img class="pill-icon" src="https://cdn.simpleicons.org/python" alt=""> Python</span>
```

A skill with different wording per language duplicates just the label:

```html
<span class="pill"><svg class="pill-icon" ...>...</svg> <span class="lang-en">Deep Learning</span><span class="lang-fr">Apprentissage profond</span></span>
```

- **To add a tool/language with a real logo**: copy a pill that uses `<img>`,
  change the text label, and change the slug at the end of the
  `src="https://cdn.simpleicons.org/<slug>"` URL (find slugs by searching
  "simple icons [tool name]"). Azure, Power BI, and the LinkedIn contact
  icon use local files in `assets/logos/` instead of the CDN (because those
  particular logos weren't on simpleicons.org) — swap those the same way
  you'd swap the profile photo.
- **To remove one**: delete its `<span class="pill">...</span>` line.
- Languages under Education use the same `.pill` style, just without icons.

## 10. Enabling the Certifications section

There's a whole "Certifications" section already built, but since you don't
have any certifications to list yet, it's wrapped in an HTML comment so it
doesn't show up or take any space. To turn it on when you're ready:

1. In `index.html`, search for `HIDDEN: CERTIFICATIONS SECTION`. Just below
   the instructions there, delete the comment-start line and, further down,
   the matching comment-end line right before `<!-- ================= SKILLS`.
2. Just above that, in the header `<nav>`, uncomment the "Certifications"
   nav link (instructions are right there) so a tab appears for it.
3. Edit the example certification card, or copy it (the same way you'd copy
   an education card) to list more than one.

## 11. Publishing updates

Once the site is deployed to GitHub Pages (see the deployment steps Claude
walked you through), any time you save changes to these files and push them
to GitHub, the live site updates automatically within about a minute — no
extra step needed.
