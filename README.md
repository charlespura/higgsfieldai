# Cinematic Portfolio — Example Template

React 19, TanStack Start, TypeScript, Tailwind CSS 4, and Cloudflare Workers. A responsive portfolio with a cinematic network hero, filterable project archive, accessible case-study dialogs, credentials, and a direct email inquiry panel.

**Example data only.** Alex Example, Example Studio, Example University, all projects, and all credentials are fictional placeholders. This repository does not contain a real person's portfolio, employment history, academic achievements, or certificate claims.

## Run locally

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`.

```sh
npm run build
npm run typecheck
npm run test:e2e
npm run check:media
```

The browser suite uses an installed Google Chrome (`channel: chrome`). It tests filtering, dialog dismissal and focus, email draft construction, mobile navigation, layout overflow, and reduced motion.

## Repository layout

```text
src/
  components/      # Sections, project archive, media, dialogs, contact
  data/            # Profile data and typed media manifest
  hooks/           # Lenis and GSAP lifecycle
  routes/          # TanStack Start root and index routes
  styles/          # Tailwind import and responsive design system
public/assets/     # Higgsfield image/video delivery files
docs/              # Asset prompts, integration and delivery criteria
scripts/           # Media readiness validation
tests/             # Browser interaction and responsive checks
```

## Content and media

All profile details, employer and education names, projects, and credential issuers are fictional. The project and learning counts reflect the number of example entries, rather than professional achievements. Project visuals are original HTML/CSS concept illustrations, labeled accordingly. No real certificate images, credential IDs, or verification links are included.

Optional Higgsfield media prompts and suggested filenames are specified in [docs/media-prompts.md](docs/media-prompts.md). No generated media or account configuration is included. Set `src` values in `src/data/media-manifest.json` after adding your own files; null sources deliberately prevent missing-media requests. The video loader supports GSAP frame seeking with ScrollTrigger. The native SVG network scene is retained for reduced motion, data-saving, and media failures.

## Make it your own

- Edit `src/data/portfolio.ts` for identity, contact address, education, projects, and learning entries.
- Update the example narrative in `src/components/Portfolio.tsx` and the concept mockup labels in `src/components/ProjectArchive.tsx`.
- Add your own media under `public/assets/` and activate it in `src/data/media-manifest.json`.
- Add genuine certificate verification links only for credentials you actually hold.
- Set your own Worker name in `wrangler.jsonc` before deployment.

Keep the example-content labels when presenting this repository as a demo. The stylesheet's IBM Plex Mono references identify an open-source font dependency, not a certificate issuer or personal credential.

Lenis and GSAP load after hydration only when motion is allowed. Listeners, animation contexts, and tickers are cleaned up on unmount. Content remains readable before animations load. Images use lazy loading and explicit container aspect ratios. Fonts are self-hosted through npm packages.

## Contact behavior

The inquiry panel validates its fields and opens the visitor’s email application with a URL-encoded draft to `hello@example.com`, a nonfunctional example destination. Replace that address in `src/data/portfolio.ts` before using the form for real inquiries. It does not silently send mail or store visitor data. An email client is required; a direct email link and copy button are also provided.

## Cloudflare deployment

The configuration follows the [official TanStack Cloudflare hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting). No Node server or database is required.

```sh
npx wrangler login
npm run deploy
```

Deployment requires your own authenticated Cloudflare account. This repository contains deployment configuration, not a live deployment. Review your customized content and media before publishing. Use `node scripts/check-media.mjs --strict` when all optional media assets must be present.

## Sharing on GitHub

Commit the source files, `package.json`, and `package-lock.json`. The `.gitignore` excludes dependencies, build output, screenshots, browser traces, runtime caches, and local environment files. No Git repository or GitHub publication is created automatically. Do not force-add ignored files; generated output can contain local machine paths.
