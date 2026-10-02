# LUMÉ — Premium Beauty Studio

A production-quality, mobile-first marketing website for a premium salon / beauty
studio. Built as a **reusable client template**: almost everything a real business
would want to change lives in a single config file.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Lucide icons

- No database, no auth, no payments, no CMS, no API keys.
- No external image host — all photography ships locally, so images can never 404.
- Maps are hand-drawn SVG + a plain Google Maps directions link (no paid API).
- Fully static output. Deploy to any Node host, or Vercel, with no config.

---

## 1. Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (static output)
npm run start        # serve the production build
npx tsc --noEmit     # type check
npx eslint .         # lint
npm run verify:images # check every image the site references
```

Requires **Node.js 20.9+** (Node 22 LTS recommended).

> **Image safety net.** `npm run build` runs `scripts/verify-images.mjs` first
> (via `prebuild`). It fails the build if any referenced image is missing,
> too small to be a photograph, not a readable JPEG, or the wrong aspect ratio
> for its slot. A broken image can no longer ship silently.

---

## 2. Customising for a client

### The one file that matters

**`config/site.ts`** — this drives the entire site. In order, it contains:

| Section | What to change |
| --- | --- |
| `business` | Name, descriptor, tagline, founding year, description |
| `contact` | **WhatsApp number**, phone, email, address, map query |
| `hours` | Opening hours table (add/remove rows freely) |
| `social` | Instagram + Facebook URLs |
| `nav` | Header/footer menu items (labels + anchor hrefs) |
| `hero` | Eyebrow, headline, lead, CTA labels, trust points, availability card, layered detail image |
| `about` | Story paragraphs, signature, stats |
| `services` | Title, description, **price**, duration, icon, image — per service |
| `experience` | The four "why choose us" pillars |
| `gallery` | Images, alt text, captions |
| `testimonials` | Quotes, names (use **initials only**), service labels |
| `booking` | Booking headline, copy, WhatsApp message template |
| `seo` | Title, description, keywords, site URL, OG image |
| `theme` | **All colours** — the whole palette |

### The 60-second checklist for a new client

1. **`contact.whatsapp`** — digits only, country code first, no `+` or spaces.
   India → `"919812345678"`. UK → `"447700900123"`. US → `"12135550123"`.
   This one field updates every WhatsApp button and every prefilled message.
2. **`contact.phone`** (`tel:` link) and **`contact.phoneDisplay`** (shown text).
3. **`contact.email`**.
4. **`contact.address`** — including `mapQuery`, which builds the directions link.
5. **`hours`** and **`social`**.
6. **`business.name`** and **`business.tagline`**.
7. **`theme`** — change these hex values to re-skin the whole site.
8. **`seo.siteUrl`** — the client's real domain (used for canonical + sitemap).
9. **Images** — replace the files in `public/images/` (details below).
10. **`booking.message`** — the prefilled WhatsApp text. `{business}` and
    `{service}` are replaced automatically.

### Images

Every image is a **real photograph**, shipped locally so nothing can 404 or
depend on a third-party host. They were fetched and processed by
`scripts/fetch-photos.mjs`; per-file attribution is in
[`docs/IMAGE-CREDITS.md`](docs/IMAGE-CREDITS.md).

To use a client's own photography, drop files into `public/images/` keeping the
same names — the layout adapts automatically. Or point the paths in
`config/site.ts` anywhere you like (`/images/your-photo.jpg` for local files, or a
full `https://` URL for a CDN).

| File | Used for | Baked size | Ratio |
| --- | --- | --- | --- |
| `hero.jpg` | Hero panel | 1200 × 1500 | 4:5 portrait |
| `about.jpg` | About + hero detail inset | 1100 × 1375 | 4:5 portrait |
| `experience.jpg` | Experience section | 1100 × 1375 | 4:5 portrait |
| `booking.jpg` | Booking CTA background | 2000 × 1100 | ~16:9 wide |
| `service-*.jpg` ×6 | Service cards | 1000 × 750 | 4:3 landscape |
| `gallery-01.jpg` | Gallery lead tile | 2000 × 1250 | 16:10 wide |
| `gallery-02..09.jpg` | Gallery grid | 1250×1000 / 1000×1000 / 1000×1250 | mixed |
| `og.jpg` | Social share preview | 1200 × 630 | — |

**Image tips:** export at the baked size above, or larger in the same ratio.
`next/image` handles responsive resizing, lazy loading and optimisation.

**Regenerating the set:** `node scripts/fetch-photos.mjs` re-fetches from Burst
and re-applies the crop and colour grade. It is deterministic and caches raw
downloads in `.photo-cache/` (git-ignored), so re-runs are fast and free.

**Checking the set:** `npm run verify:images` re-runs the same checks the build
does, on demand.

Two processing choices are worth knowing about, because they are what make mixed
stock look like one commissioned shoot:

- **Smart crop** — each photo is cropped to its slot with sharp's `attention`
  strategy (edge + saliency detection), which keeps the most visually important
  region and so avoids decapitating subjects.
- **One shared grade** — a single mild colour grade (slight warmth, marginally
  reduced saturation, gentle contrast, light unsharp mask) is applied to every
  frame. Change `GRADE` in `scripts/fetch-photos.mjs` to re-tune the whole set.

The slot manifest in that script is hand-curated: each slot lists Burst photo
slugs in preference order, and the first that downloads wins. Edit `picks` to
change what a slot shows.

### Colours

Colours are defined **once**, in `config/site.ts` under `theme`, and injected as
CSS variables (`--lume-*`) that map to Tailwind utilities. So `bg-ivory`,
`text-muted`, `border-line` etc. all follow the config automatically.

Current palette: warm ivory background (`#FAF3E4`), deep espresso text
(`#2A1D13`), warm taupe borders (`#E3D3B8`), and a muted antique brass accent
(`#A8855A` / `#80603A`). Every value is a warm tone — red leads blue by 15–43
points across the scale — so the site reads as ivory/espresso/champagne rather
than grey/beige/black.

All text colours meet WCAG AA (4.5:1) against both the ivory and cream
backgrounds; `brassDeep` is additionally checked against cream, where eyebrow
labels sit.

To **add** a new colour: add it to `siteConfig.theme`, then map it in the
`@theme inline` block at the top of `app/globals.css`.

### Icons

Service and pillar icons are referenced by a short string key, e.g. `icon: "scissors"`.
Available keys: `scissors`, `palette`, `flower`, `hand`, `crown`, `waves`, `award`,
`gem`, `shield`, `clipboard`. To add another, import it from `lucide-react` and
register it in `components/icon-registry.ts`.

### Fonts

Cormorant Garamond (display) + Inter (text), self-hosted at build time by
`next/font/google` — no external requests at runtime. Swap them in
`app/layout.tsx`, then update the `--font-display` / `--font-sans` entries in the
`@theme inline` block in `app/globals.css`.

---

## 3. Project structure

```
config/site.ts            ← ALL business content (start here)
lib/utils.ts              ← WhatsApp / tel / maps link builders, theme CSS
app/
  layout.tsx              ← fonts, metadata, JSON-LD, theme injection
  page.tsx                ← section order
  globals.css             ← theme mapping, base styles, animations
  icon.svg                ← favicon
  sitemap.ts robots.ts    ← SEO
components/
  Header.tsx              ← sticky nav, scroll progress, scroll spy, mobile menu
  Hero.tsx About.tsx Services.tsx Experience.tsx
  Gallery.tsx             ← lead tile + masonry grid + accessible lightbox
  Testimonials.tsx BookingCta.tsx Location.tsx Footer.tsx
  Reveal.tsx              ← scroll-reveal primitive
  ui.tsx                  ← Section / Container / headings / buttons
  icon-registry.ts        ← icon key → Lucide component
  BrandIcons.tsx          ← Instagram / Facebook / WhatsApp SVGs
docs/IMAGE-CREDITS.md     ← per-file photo attribution
public/images/            ← all photography (local, no hotlinking)
scripts/fetch-photos.mjs  ← fetch / smart-crop / grade the photo set
scripts/verify-images.mjs ← build-time guard: every image must be valid
```

---

## 4. Sections included

Hero · About (+ stats) · Services (+ pricing) · Featured Experience ·
Gallery (lightbox) · Testimonials · Booking CTA · Location & Contact · Footer.

**Interactions**

- Smooth scrolling with a fixed-header offset on every anchor.
- Header scroll spy: the section you are reading is underlined in the nav, on
  both desktop and mobile.
- Mobile full-width menu with staggered links, scroll lock and Escape to close.
- Service cards are set out like a printed menu, with a dotted leader running
  from the price to the booking link.
- Every photograph zooms gently and gains a deeper veil on hover; the gallery
  opens with a full-width lead image above the grid.
- Every WhatsApp button opens a prefilled appointment message; per-service
  buttons name the service automatically.
- Reading-progress bar, hover states, and scroll/entrance animations.
- `prefers-reduced-motion` is fully respected: animations and smooth scrolling
  are disabled and all content renders immediately.
- Skip-to-content link, visible focus rings, ARIA labels, keyboard-navigable
  lightbox (Esc / ← / →).

---

## 5. Deployment

Static output, so anything works:

- **Vercel** — import the repo, accept the defaults, deploy.
- **Node host** — `npm run build && npm run start`.
- **Static host** (Netlify, Cloudflare Pages, S3) — publish `.next` per your
  platform, or set `output: "export"` in `next.config.ts` for a fully static
  export (the only image is the OG image, which is already a static file).

Before going live, update `seo.siteUrl` in `config/site.ts`.
