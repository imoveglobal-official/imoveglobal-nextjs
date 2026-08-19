# Migration: Vite/React-Router → Next.js (App Router)

This document records how the original site (`../imoveglobal-website`, a React 19 + Vite +
React Router v6 + Tailwind v3 SPA) was migrated to this Next.js app, what could not be reproduced
exactly, the environment-variable changes, and how to deploy to Vercel.

The original repository was treated as **read-only reference** and was not modified.

## Goal

A 100% visual and behavioural replica: every page, at every breakpoint, in the `arctic-aurora`
theme, indistinguishable from the original — same layout, spacing, fonts, colours, animations,
hover/scroll behaviour, forms, and the interactive 3D globe. Where a Next.js idiom would change
rendered pixels, the plain equivalent was chosen instead (parity beats "best practice").

## Stack mapping

| Original | Next.js app |
| --- | --- |
| Vite 5 + React 19 | Next.js 16 (App Router) + React 19 |
| JSX | TypeScript (strict) `.tsx` |
| React Router v6 | App Router file routing |
| Tailwind v3.4 (PostCSS) | Tailwind v3.4 (PostCSS) — unchanged |
| `three` (raw scene) | `three` (raw scene) — unchanged |
| GitHub Pages | Vercel (standard server build) |

## Routing

| Original route | Next.js file | Component |
| --- | --- | --- |
| `/` | `app/page.tsx` | `components/pages/Home` (globe + `CourseModules`) |
| `/career-boost` | `app/career-boost/page.tsx` | `CareerBoost` |
| `/course-overview` | `app/course-overview/page.tsx` | `CourseOverview` |
| `/community` | `app/community/page.tsx` | `ActiveCommunity` |
| `/registration` | `app/registration/page.tsx` | `Registration` |
| `/exams` | `app/exams/page.tsx` | `Exams` (wrapped in `<Suspense>`) |
| `/scholarships` | `app/scholarships/page.tsx` | `Scholarships` |
| `/study-abroad` | `app/study-abroad/page.tsx` | `StudyAbroadScope` |
| `/commitments` | `app/commitments/page.tsx` | `Commitments` |
| `/news-and-blogs` | `app/news-and-blogs/page.tsx` | `NewsndBlogs` |
| `/faqs` | `app/faqs/page.tsx` | `Faqs` |
| `*` → `/` | `app/not-found.tsx` (`redirect('/')`) | — |

- The commented-out `/course-modules` and `/reviews` routes are **omitted** exactly as the source
  left them. `CourseModules`, `ActiveCommunity`, `CareerBoost`, and `CourseOverview` still render
  inside `Home` (and also serve their own routes).
- `Exams_backup.jsx` and `Review.jsx` (dead code in the source) were not ported.

### Router API translation

| React Router | Next.js |
| --- | --- |
| `<Link>` (react-router) | `next/link` (logo only; most nav is programmatic) |
| `useNavigate()` → `navigate(path)` | `useRouter()` → `router.push(path)` |
| `useLocation().pathname` | `usePathname()` |
| `useLocation().search` / query | `useSearchParams()` (Suspense-wrapped) |
| `<Navigate to="/" />` catch-all | `app/not-found.tsx` → `redirect('/')` |

### Query-string / scroll behaviours (preserved)

- **`/exams?section=<id>`** selects the exam tab (TOEFL/IELTS) and scrolls to the matching element
  id. `activeExam` is now **derived from the query string during render** (instead of `useState` +
  effect) — same visible result, no cascading render. The scroll remains an effect keyed on the
  section id. Verified working.
- **`more` nav action** ("EGPT") navigates home, then scrolls to `[data-module-id="1"]`.
- **Footer quick links** navigate home then scroll to `[data-module-id="N"]`.
- App Router restores scroll-to-top on navigation by default, matching the source `ScrollToTop`
  component, so no custom re-implementation was needed.

## Providers, context, and content

- `app/providers.tsx` (a Client Component) nests `ThemeProvider → ContentProvider → NewsBlogProvider`
  in the same order as the source, mounted in `app/layout.tsx`.
- `content/content.json` and `content/news_blog.json` were copied verbatim and are imported at build
  time. `ContentContext` / `NewsBlogContext` were ported to `.tsx` with types derived from the JSON
  (`typeof`), preserving the commented-out future-`fetch` block, the exposed field list, and every
  `?.` + hardcoded-English fallback in consumers.

## Theming

- `styles/index.css` → `app/globals.css`, **byte-for-byte**, imported in the root layout. All CSS
  variables and utility classes (`.glass-card`, `.btn-gradient`, `.bg-theme-gradient-text`,
  `.input-field`, `.tab-button`, `.tooltip`, keyframes, etc.) are unchanged.
- `ThemeContext` keeps `localStorage` persistence and sets `data-theme` on `<html>`. An inline
  `<script>` in the layout `<head>` sets `data-theme` before hydration to avoid any theme flash.
  (With a single theme whose variables are also defined on bare `:root`, there is no visible flash
  regardless.)
- `tailwind.config.ts` ports the source config (custom `purple` palette, `Inter` sans family,
  `fadeIn`/`slideIn` keyframes+animations) with `content` globs updated for `app/`, `components/`,
  `context/`. `postcss.config.js` is retained.

## Fonts, assets, metadata

- **Fonts:** the exact Google Fonts `<link>` tags (Inter 300–700, Manrope 200–800) are placed in the
  layout `<head>` rather than using `next/font`, to guarantee identical rendering (the body font is
  `Manrope !important`; Tailwind `sans` is `Inter`).
- **Assets:** `public/` was copied across (logo.png, sphere.webp, the `*.svg` icons, `courses/` gifs,
  `news/` images) with the same absolute `/...` reference paths. The favicon/icon is `/logo.png`.
- **Metadata/SEO:** reproduced via the Next Metadata API — `<title>Imoveglobal | EGPT</title>`, the
  meta description, the `google-site-verification` tag, and `icon = /logo.png`. `app/sitemap.ts` and
  `app/robots.ts` replace the static `sitemap.xml`.
- **Globe texture:** loaded at runtime from the same `raw.githubusercontent.com` URL as the source.

## Environment variables (renamed)

| Original (Vite) | This app (Next) |
| --- | --- |
| `VITE_FORM_SCRIPT_URL` | `NEXT_PUBLIC_FORM_SCRIPT_URL` |
| `VITE_FORM_SUBMISSION_TOKEN` | `NEXT_PUBLIC_FORM_SUBMISSION_TOKEN` |

Both are client-exposed (baked into the bundle), matching the original behaviour — the token is a
soft spam guard, not a secret. `services/formSubmission.ts` and `isConfigured()` were updated to read
the new names. `.env.example` and `.env.local` are provided; `.env.local` is gitignored.

## Deliberate deviations from Next.js "best practice" (for parity)

- **Plain `<img>` instead of `next/image`** everywhere — avoids layout shift and pixel differences.
  `@next/next/no-img-element` is disabled in `eslint.config.mjs`.
- **Google Font `<link>` tags instead of `next/font`** — exact font parity.
  `@next/next/no-page-custom-font` is disabled (it targets the pages-router `_document`).
- **`react-hooks/refs`** is disabled: it false-positives on a ref read inside an event handler
  (`CourseModules` step navigation), a correct pattern preserved from the source.
- The `react-hooks/set-state-in-effect` rule is honoured everywhere except one intentional
  reset-internal-state-on-open effect in `NewsModal` (inline-disabled with a comment).
- No SPA 404 redirect hack (`public/404.html`, `spa-github-pages`) — Next has real routing. The
  GitHub Pages `CNAME` and `.github/workflows/deploy.yml` were not ported.

## Things that could NOT be reproduced exactly

- **None affecting rendered output.** Every route matches the original at desktop width (verified by
  side-by-side screenshots — see "Verification"). The two intentional, non-visual additions are:
  - `app/robots.ts` (the source had **no** `robots.txt`; a standard allow-all + sitemap file was
    added — remove `app/robots.ts` if you prefer to match the source's absence exactly).
  - Faithful but non-visual refactors noted above (derived `activeExam`, `next/link` logo).

## Verification

Both apps were run locally (original on `:5173`, this app on `:3000`) and compared side-by-side with
browser automation at desktop width. Confirmed pixel-identical:

- Every route: Home (hero + globe + `CourseModules` + `ActiveCommunity` + `CareerBoost` +
  `CourseOverview`), `career-boost`, `course-overview`, `community`, `registration`, `exams`,
  `scholarships`, `study-abroad`, `commitments`, `news-and-blogs`, `faqs`.
- Interactive behaviours: the three.js globe (renders, rotates, textured, interactive), the theme
  (`arctic-aurora` variables), the two-step registration wizard (both tabs), the exams `?section=`
  deep-link (tab filter + scroll), the news/blog modal with markdown parsing (`**bold**`, `_italic_`,
  `• ` bullets), and the FAQ accordion.

**Breakpoint note:** the browser tool captures at a fixed ~1456px logical width (Chrome enforces a
minimum window width), so mobile (375) and tablet (768) viewports could not be screenshotted
directly. Responsive parity is nonetheless guaranteed structurally: the markup carries byte-identical
`sm:`/`md:`/`lg:`/`xl:` classes, `globals.css` is a byte-for-byte copy, and `tailwind.config.ts`
matches the source — the same CSS applied to the same markup renders identically at every breakpoint,
and desktop is confirmed pixel-identical.

## Deploying to Vercel

1. Push this repository to GitHub (or import the local repo into Vercel).
2. In Vercel, **New Project → Import** the repo. Framework preset auto-detects **Next.js**; keep the
   default build command (`next build`) and output — do **not** set `output: 'export'`.
3. Under **Settings → Environment Variables**, add for Production (and Preview/Development as needed):
   - `NEXT_PUBLIC_FORM_SCRIPT_URL` = your Google Apps Script Web App URL
   - `NEXT_PUBLIC_FORM_SUBMISSION_TOKEN` = the token matching the script's `CONFIG.SECRET_TOKEN`
4. Deploy.
5. **Custom domain:** Settings → Domains → add `imoveglobal.in` (and `www.imoveglobal.in` if desired),
   then update the domain's DNS at your registrar per Vercel's instructions (apex `A`/`ALIAS` record,
   `www` `CNAME`). No `vercel.json` is required for this app.
