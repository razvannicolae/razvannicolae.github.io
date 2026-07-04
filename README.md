# Personal Website — Razvan Nicolae

A lightweight, minimalist portfolio built with plain HTML, CSS, and a small
vanilla-JS file. No build step, no frameworks, no dependencies — just static
files that GitHub Pages can serve directly.

## Structure

```
.
├── index.html      # All page content
├── styles.css      # Design system + layout (black / white / dark blue)
├── script.js       # Theme toggle, year, scroll reveal
├── assets/
│   └── resume.pdf  # Downloadable résumé
└── .nojekyll       # Tell GitHub Pages to serve files as-is
```

## Preview locally

Any static server works. For example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html`.

## Deploy to GitHub Pages

1. Create a new repo. To serve at `https://<username>.github.io`, name it
   `<username>.github.io`. Any other name serves at
   `https://<username>.github.io/<repo>/`.
2. Push these files:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment**. Set
   **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`, save.
4. Wait ~1 minute, then visit the published URL.

## Customize

- **Content** lives in `index.html` — edit text, projects, and links directly.
- **Project links** currently point to `github.com/razvannicolae`; swap in the
  specific repo URLs when they're public.
- **Colors** are CSS variables at the top of `styles.css` (`--accent` is the
  dark blue). Change them in one place to re-theme the whole site.
- **Résumé** — replace `assets/resume.pdf` to update the download.
