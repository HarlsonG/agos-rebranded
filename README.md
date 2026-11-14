# AGOS Landing Page

Static site: plain HTML, CSS, and JS. No build step.

## Run
Open the folder in VS Code and use the **Live Server** extension (right-click `index.html` > Open with Live Server). Opening `index.html` directly also works.

## Structure
- `index.html`: markup and sections
- `css/style.css`: styles; colors are CSS variables at the top (`:root` for day, `[data-theme=night]` for night mode)
- `js/main.js`: content data (apps, features, pipeline), loader, hero reveal, theme toggle, menu, modal
- `assets/`: `logo.webp`, `device-exterior.webp` (hero base), `device-cutaway.webp` (revealed under the cursor)

## Things to edit
- App links: search `href="#"` in `js/main.js` (the "Open AGOS Admin / Patrol / Advisory" buttons)
- Copy: `A`, `F`, `P` arrays in `js/main.js`, plus the hero text in `index.html`
- Hero device: replace the two WebP files in `assets/` (keep both the same size and angle so the reveal lines up)
- The "Request a demo" form is a stub: it has no backend yet (see the `#fm` submit handler)

External: Google Font (Onest) and Lenis (jsDelivr CDN), so an internet connection is needed for those.
