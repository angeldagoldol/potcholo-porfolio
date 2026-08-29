# Pocholo F. Leano — Kage Portfolio

A cinematic single-page React portfolio based on the selected Kage-inspired Design 2.

## Included

- Five chapters: Threshold, About, Skills, Works, and Afterlight
- Local WebGL environment plates with rain, embers, film grain, parallax, and scene transitions
- Working desktop and mobile navigation
- Supplied profile photograph and complete portfolio information
- Responsive desktop, tablet, and mobile layouts
- Keyboard navigation, semantic landmarks, reduced-motion behavior, and a motion pause control
- Local fonts and image assets; no analytics or remote runtime assets

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run check
```

## Deploy

The project is ready for Vercel. Import the GitHub repository and deploy; the included `vercel.json` already selects `npm run build` and the correct `dist/client` output folder.

## GitHub upload note

Upload the source files from this project, but do **not** upload `node_modules` or `dist`. GitHub/Vercel will recreate both folders from `package.json` and `package-lock.json`. The included `.gitignore` prevents them from being committed when Git is used normally.
