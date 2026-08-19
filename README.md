# Imoveglobal — Next.js

Marketing site for **Imoveglobal (EGPT)** — a Next.js 16 (App Router) + React 19 + TypeScript +
Tailwind CSS v3 application. It is a pixel- and behaviour-faithful migration of the original
Vite/React-Router build, deployed on **Vercel**.

## Tech stack

- **Next.js 16** (App Router, standard server build)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v3.4** (via PostCSS) + CSS-variable theming
- **three.js** for the interactive hero globe
- **ESLint** (eslint-config-next, flat config)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values (optional for local dev)
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build (type-checks too)
npm run start   # serve the production build
npm run lint    # eslint
```

## Environment variables

Both are **client-exposed** (`NEXT_PUBLIC_*`, baked into the browser bundle) — this matches the
original app. The token is a soft spam guard for the Google Apps Script form endpoint, not a secret.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORM_SCRIPT_URL` | Google Apps Script Web App URL the registration form POSTs to |
| `NEXT_PUBLIC_FORM_SUBMISSION_TOKEN` | Token echoed in the payload; must match the script's `CONFIG.SECRET_TOKEN` |

Locally: copy `.env.example` → `.env.local`. On Vercel: set both under **Project → Settings →
Environment Variables**. Until they are set to real values, `isConfigured()` disables form submission.

## Routes

`/`, `/career-boost`, `/course-overview`, `/community`, `/registration`, `/exams`, `/scholarships`,
`/study-abroad`, `/commitments`, `/news-and-blogs`, `/faqs`. Unknown paths redirect to `/`.

## Project layout

```
app/            # App Router: layout, providers, pages, sitemap.ts, robots.ts, not-found
components/     # header, footer, common (NewsModal, JobDetailsPopover), forms, pages
context/        # ThemeContext, ContentContext, NewsBlogContext (TS)
content/        # content.json, news_blog.json (site copy — edit here, not in JSX)
services/       # formSubmission.ts
public/         # logo, sphere.webp, svg icons, course gifs, news images
```

## Content & theming

- **Copy lives in JSON** (`content/*.json`), surfaced through context providers. Edit the JSON to
  change site text; components fall back to hardcoded English if a key is missing.
- **Theming is CSS variables** in `app/globals.css` plus utility classes (`.glass-card`,
  `.btn-gradient`, …). A single theme, `arctic-aurora`, is active.

See `CLAUDE.md` for architecture details and `MIGRATION.md` for the migration mapping and Vercel
deployment steps.

## Deployment

Standard Next.js server build on Vercel. Import the repo, set the two environment variables, and
point the domain `imoveglobal.in` at the project. Full steps in `MIGRATION.md`.
