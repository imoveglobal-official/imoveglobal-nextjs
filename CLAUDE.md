# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A **Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v3** app that is a
pixel- and behaviour-faithful migration of the original Vite/React-Router site in the sibling
directory `../imoveglobal-website` (read-only reference — never write to it). Deploys to **Vercel**
with the standard Next.js server build (no `output: 'export'`).

See `MIGRATION.md` for the full mapping decisions and rationale.

## Commands

```bash
npm install
npm run dev      # Next dev server (Turbopack) on http://localhost:3000
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # eslint (eslint-config-next, flat config)
```

No test setup exists (the original had none).

## Architecture

- **Routing.** React Router routes became App Router folders under `app/`. Each `app/<route>/page.tsx`
  is a thin wrapper that renders the corresponding component in `components/pages/`. Unknown routes
  redirect to `/` via `app/not-found.tsx`. `/exams` reads `?section=` and is wrapped in `<Suspense>`
  (it consumes `useSearchParams`). The commented-out `/course-modules` and `/reviews` routes are
  intentionally omitted; `CourseModules` still renders inside Home.
- **Providers.** `app/providers.tsx` nests `ThemeProvider → ContentProvider → NewsBlogProvider`
  (same order as the source), mounted in `app/layout.tsx`.
- **Content lives in JSON, not JSX.** `content/content.json` and `content/news_blog.json` are imported
  at build time and exposed through `context/ContentContext.tsx` / `context/NewsBlogContext.tsx`.
  Components read copy via `useContent()` / `useNewsBlog()` with `?.` plus a hardcoded English
  fallback (e.g. `home?.headline?.prefix || 'Become a'`). **When changing copy, edit the JSON, keep
  the fallbacks.** Types are derived from the JSON via `typeof`.
- **Theming is CSS variables, not Tailwind config.** `app/globals.css` (a byte-for-byte copy of the
  source `styles/index.css`) defines `--color-*`, `--gradient-*`, `--glass-*` and utility classes
  (`.glass-card`, `.btn-gradient`, `.bg-theme-gradient-text`, `.input-field`, `.tab-button`,
  `.tooltip`). `ThemeContext` mirrors the values, persists to `localStorage`, sets `data-theme` on
  `<html>`. An inline script in `app/layout.tsx` sets `data-theme` before hydration. Only one theme
  (`arctic-aurora`) exists. New themed styling should use `var(--color-*)` or the existing utilities,
  not new Tailwind color classes.
- **Client components.** Anything using hooks/context/three.js/browser APIs/events is a Client
  Component (`"use client"`). `CareerBoost`, `CourseOverview`, and `Commitments` are pure
  presentational and have no directive.
- **Globe.** `components/pages/InteractiveGlobe.tsx` builds a raw three.js scene by hand and is loaded
  via `next/dynamic(..., { ssr: false })` from `Home`. It loads an earth texture from a
  raw.githubusercontent.com URL at runtime. Do not "optimize" the scene — parity matters.
- **Forms.** `Registration.tsx` owns a two-step wizard: `ForMyselfForm`/`ForInstituteForm` (step 1,
  tab = `userType`) → shared `StepTwo` (step 2). `services/formSubmission.ts` shapes the payload and
  POSTs to a Google Apps Script Web App with `mode: 'no-cors'`; success is inferred from the absence
  of a thrown error. `isConfigured()` gates submission when env vars are placeholders.

## Parity rules (important)

This repo intentionally trades some Next.js "best practices" for exact visual parity:

- **Plain `<img>`, not `next/image`** — avoids layout shift / pixel differences. `@next/next/no-img-element`
  is disabled in `eslint.config.mjs`.
- **Google Font `<link>` tags in the layout `<head>`, not `next/font`** — reproduces the source fonts
  exactly (Inter 300–700, Manrope 200–800). `@next/next/no-page-custom-font` is disabled.
- Do not refactor working UI in ways that change rendered output. Preserve class names, inline styles,
  SVG paths, and content fallbacks verbatim.

## Env vars

`NEXT_PUBLIC_FORM_SCRIPT_URL` and `NEXT_PUBLIC_FORM_SUBMISSION_TOKEN` (renamed from the source's
`VITE_*`). They are client-exposed (baked into the bundle) — the token is a soft spam guard, not a
secret. Copy `.env.example` to `.env.local` for local dev; set them in the Vercel project settings for
deploys. See `MIGRATION.md`.
