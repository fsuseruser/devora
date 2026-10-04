# DEVORA & Co. — Website

An editorial, motion-rich website for DEVORA & Co., built with **Astro 7**, **Tailwind CSS 4**, **GSAP** (ScrollTrigger + Flip) and **Lenis** smooth scrolling. The output is fully static, so you can host it anywhere.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to /dist
npm run preview   # preview the production build
```

Requires Node 20+ (Node 22 recommended).

## Editing content: no code needed

| What | Where |
|---|---|
| Company name, contact, address, nav, social, hero copy, stats, process, principles | `src/data/site.ts` |
| Services (6 detail pages are generated from this) | `src/data/services.ts` |
| Projects / case studies (6 detail pages + filters) | `src/data/projects.ts` |
| Colours & fonts | `src/styles/global.css` (`@theme` block) |
| Logo files | `public/brand/` |

### Replacing images
All placeholder images live in `public/images/` (`site/`, `services/`, `work/`).
To replace one, either:
- drop a new file in with the **same name**, or
- add your own file and update its path in the relevant data file.

The recommended sizes are 1600×1100 for landscape images, 1000×1400 for portrait images and 1920×1080 for the hero and banner images.

> ⚠️ The case studies in `projects.ts` are **placeholders**. Before launch, replace the names, copy, results and images with real client work.

### Contact form
Set `formEndpoint` in `site.ts` to a form service URL (Formspree, Basin, Web3Forms, etc.). If you leave it empty, the form opens a pre-filled email to `site.email` instead.

### Domain
Set `url` in `site.ts` to your real domain. The canonical tags, Open Graph tags, sitemap and robots.txt all use it.

## What's included
- **Pages:** Home, Work (with animated filters), 6 project pages, Services, 6 service pages, Studio, Contact, Privacy, Terms, 404, `sitemap-index.xml` and `robots.txt`.
- **Motion:**
  - On the homepage, a three-frame hero re-composes into one full-bleed image as you scroll.
  - Headlines reveal line by line, and statements reveal word by word.
  - Images use clip-path reveals and parallax.
  - The services index expands to show photography inline.
  - The process section scrolls horizontally, and its stage cards activate as they pass.
  - The expertise cards flood with colour on hover.
  - The marquee speeds up with your scroll speed.
  - There's a custom cursor, magnetic buttons, an intro loader and number counters.
- **Accessibility:** If a visitor has `prefers-reduced-motion` turned on, all motion is disabled and content shows statically. The site also has a skip link, semantic markup and visible focus states.

## Deploy
Push the project to GitHub and import it in **Vercel**, **Netlify** or **Cloudflare Pages**. Use `npm run build` as the build command and `dist` as the output directory.

## Brand files (`public/brand/`)
The logo set uses a deeper palette: forest `#0A2E22`, bronze `#A57F57` / `#C29B72`, off-white `#F3EFE4` and charcoal `#121412`.

- `devora-mark*.svg`: vector orbit mark
- `devora-logo-primary|reversed|charcoal.png`: wordmark with "& Co." and the tagline
- `devora-app-icon*.png`, `devora-social-avatar.png`: icons and profile image
- `devora-brand-sheet.png`: overview of the full set
