# TipiLAN

Official website for **TipiLAN** — Estonia's largest student-organised LAN event.

> Work in progress. Event date: **September 11, 2026**.

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, SSG, Turbopack
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [next-intl](https://next-intl.dev/) — ET / EN localisation
- [react-icons](https://react-icons.github.io/react-icons/)

Requires **Node.js ≥ 22**.

---

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/et` by default.

---

## Scripts

```bash
npm run dev        # Dev server (Turbopack, localhost:3000)
npm run build      # Production build (outputs SSG for /et and /en)
npm start          # Serve production build
npm run lint:fix   # ESLint with auto-fix
```

---

## Project Structure

```
src/
  app/[locale]/        # Locale-based pages (et, en)
  components/teaser/   # HeroSection, CarouselSection, EndSection, Footer
  components/          # LanguageSwitcher, TeaserPage
  i18n/                # next-intl routing + request config
  lib/                 # blurPlaceholders.ts (auto-generated)
  proxy.ts             # next-intl routing middleware

translations/          # et.json, en.json
public/images/
  backgrounds/         # Full-viewport background WebPs
  heros/               # Character/hero image WebPs
  flags/               # Language switcher SVGs
  original/            # Original PNG sources (not served)
scripts/               # Image processing utilities
```

---

## Image Utilities

When adding or replacing images, re-run:

```bash
# Convert new PNGs → WebP (quality 85)
node scripts/convert-images.mjs

# Regenerate blur placeholders for all images
node scripts/gen-blur-placeholders.mjs
```

---

## Localisation

Translation files live in `translations/et.json` and `translations/en.json`.  
Routing is handled by `src/proxy.ts` — `/` redirects to `/et` (default locale).
