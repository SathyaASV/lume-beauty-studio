/**
 * fetch-photos.mjs
 * ---------------------------------------------------------------------------
 * Downloads real salon / beauty photography and prepares it for the site.
 * Output goes to public/images/, attribution to docs/IMAGE-CREDITS.md.
 *
 * Source: Burst by Shopify (https://www.burst.shopify.com) — a curated library
 * of free, professionally shot stock photos that may be used commercially.
 * Every image is served from `burst.shopifycdn.com` at full resolution, and
 * the photo slug is a human-readable description of the subject, which is what
 * makes a hand-curated mapping possible.
 *
 * Rather than trusting a search ranking, each slot lists an ordered set of
 * candidate slugs. The first one that downloads and decodes wins; the rest are
 * fallbacks. That keeps the set on-subject and visually varied.
 *
 * Processing per image:
 *   - EXIF orientation is applied.
 *   - Cropped to the slot's aspect ratio with sharp's `attention` strategy
 *     (edge + saliency detection) so faces, hair and hands are not cut badly.
 *   - Given ONE shared, mild colour grade, so photos shot under different
 *     conditions read as a single commissioned shoot.
 *   - Re-encoded as progressive JPEG at the exact pixel size the slot needs.
 *
 * Run:  node scripts/fetch-photos.mjs
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images");
const DOCS_DIR = path.join(ROOT, "docs");
const CACHE_DIR = path.join(ROOT, ".photo-cache");

const CDN = "https://burst.shopifycdn.com/photos";
const PAGE = "https://www.burst.shopify.com/photos";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/* -------------------------------------------------------------------------- */
/*  Slot manifest                                                              */
/*                                                                             */
/*  w / h    output pixel size                                                */
/*  picks    candidate Burst slugs, best first. The first that downloads      */
/*           and decodes is used; the rest are fallbacks.                      */
/*  minW     minimum acceptable source width, in px                            */
/* -------------------------------------------------------------------------- */
const SLOTS = [
  {
    name: "hero", w: 1200, h: 1500, minW: 1200,
    picks: [
      "woman-stylist-cuts-hair-at-salon",
      "woman-getting-hair-cut-at-salon",
      "hair-stylist-combing-womans-hair",
      "combing-hair-at-salon",
    ],
    alt: "A stylist finishing a client's hair in the LUMÉ studio",
  },
  {
    name: "about", w: 1100, h: 1375, minW: 1200,
    picks: [
      "quaint-barbershop-with-eclectic-decor",
      "white-towels-and-rob-in-salon",
      "hair-salon-sinks-on-red-brick",
      "pair-of-green-and-white-chairs-in-barbershop",
    ],
    alt: "The calm interior of the LUMÉ studio",
  },
  {
    name: "experience", w: 1100, h: 1375, minW: 1200,
    picks: [
      "a-stylist-measures-before-cutting",
      "close-up-of-cutting-hair",
      "snipping-stylist",
      "stylist-combing-through-hair",
    ],
    alt: "An artist at work during a consultation at LUMÉ",
  },
  {
    name: "booking", w: 2000, h: 1100, minW: 1600,
    picks: [
      "spa-massage-table-room",
      "decor-at-natural-spa",
      "fresh-and-natural-spa-decor",
      "spa-candle-towel-and-stones",
    ],
    alt: "",
  },

  {
    name: "service-hair-styling", w: 1000, h: 750, minW: 1000,
    picks: ["blowdrying-hair", "salon-blow-drying-hair", "hands-blow-drying-hair", "blowdrying-hair-on-round-brush"],
    alt: "Hair styling at the LUMÉ studio",
  },
  {
    name: "service-hair-colour", w: 1000, h: 750, minW: 1000,
    picks: ["blue-black-on-brick", "long-blond-haired-woman", "long-curly-hair-and-dark-lipstick", "bohemian-woman-long-hair"],
    alt: "A finished colour, blended for a soft grow-out",
  },
  {
    name: "service-facial", w: 1000, h: 750, minW: 1000,
    picks: ["face-treatment-with-a-smile", "woman-practicing-her-skincare-routine", "young-woman-using-facial-roller"],
    alt: "A skin treatment facial",
  },
  {
    name: "service-nails", w: 1000, h: 750, minW: 1000,
    picks: ["painting-nails", "fashion-nails", "high-fashion-fingers", "adding-glitter-to-nails"],
    alt: "A detailed manicure",
  },
  {
    name: "service-bridal", w: 1000, h: 750, minW: 1000,
    picks: ["beautiful-bride-on-wedding-day", "smiling-bride-on-wedding", "bride-adjusts-hair-wedding-photography"],
    alt: "Bridal beauty preparation",
  },
  {
    name: "service-spa", w: 1000, h: 750, minW: 1000,
    picks: ["woman-getting-massage-treatment", "woman-getting-back-massage", "massage-therapist-treating-woman", "spa-tools-on-stones"],
    alt: "A spa treatment in a private suite",
  },

  {
    name: "gallery-01", w: 2000, h: 1250, minW: 1000,
    picks: ["long-blond-haired-woman", "bohemian-woman-long-hair", "blonde-model-portrait", "blonde-hair-sunglasses"],
    alt: "A soft, sun-lit finish",
  },
  {
    name: "gallery-02", w: 1250, h: 1000, minW: 1000,
    picks: ["close-up-hands-trimming-hair", "just-a-trim", "getting-a-trim", "hands-trimming-long-hair"],
    alt: "A precision cut",
  },
  {
    name: "gallery-03", w: 1000, h: 1000, minW: 1000,
    picks: ["blowdrying-hair-on-round-brush", "a-stylist-pulls-a-woman-s-hair-up", "styling-long-hair", "woman-gets-hair-styled"],
    alt: "A signature blow-dry",
  },
  {
    name: "gallery-04", w: 1000, h: 1333, minW: 1000,
    picks: ["smiling-brunette-woman", "brunette-woman-in-salon-chair", "woman-playing-with-blonde-hair"],
    alt: "A deep brunette finish",
  },
  {
    name: "gallery-05", w: 1250, h: 1000, minW: 1000,
    picks: ["woman-with-braided-hair-and-wedding-dress", "person-with-brown-hair-in-a-white-silk-robe", "bridal-fashion-on-beach"],
    alt: "Bridal styling with soft detail",
  },
  {
    name: "gallery-06", w: 1000, h: 1250, minW: 1000,
    picks: ["person-with-long-curly-hair-surrounded-by-green-leaves", "long-curly-hair-and-dark-lipstick", "blonde-woman-in-denim"],
    alt: "A gloss refresh on natural hair",
  },
  {
    name: "gallery-07", w: 1000, h: 1000, minW: 1000,
    picks: ["nail-polish", "silver-nails", "nails-with-stars-pearls", "base-coat-beauty"],
    alt: "A clean, minimal gel manicure",
  },
  {
    name: "gallery-08", w: 1250, h: 1000, minW: 1000,
    picks: ["woman-getting-wax-on-her-eyebrows", "woman-getting-makeup-applied", "natural-look-makeup", "makeup-artist-at-work"],
    alt: "A restorative facial",
  },
  {
    name: "gallery-09", w: 1000, h: 1250, minW: 1000,
    picks: ["hair-in-messy-bun", "blonde-model-at-night", "blond-woman-in-black-cap", "fashionable-woman-in-toronto"],
    alt: "An elegant updo for an evening event",
  },

  {
    name: "og", w: 1200, h: 630, minW: 1200,
    picks: [
      "modern-wood-panelled-wall-and-shelving-interior",
      "hair-salon-sinks-on-red-brick",
      "quaint-barbershop-with-eclectic-decor",
    ],
    alt: "",
  },
];

/* -------------------------------------------------------------------------- */
/*  Shared colour grade                                                        */
/*                                                                             */
/*  Stock shot on different days, with different lighting, does not read as a   */
/*  coherent set. One mild grade across every frame — a touch of warmth,        */
/*  slightly reduced saturation (consumer stock tends to be over-saturated),    */
/*  gentle contrast and a light unsharp mask — is what makes it look           */
/*  commissioned. Deliberately subtle: it should not be perceptible on its own.*/
/* -------------------------------------------------------------------------- */
const GRADE = {
  modulate: { brightness: 1.03, saturation: 0.9 },
  linear: [1.05, -7],
  tint: { r: 255, g: 250, b: 243 },
  sharpen: { sigma: 0.7 },
};

/* -------------------------------------------------------------------------- */
/*  Cache — raw downloads are kept so re-running costs no network time.        */
/* -------------------------------------------------------------------------- */
async function cacheGet(key) {
  try {
    return await readFile(path.join(CACHE_DIR, `${key}.bin`));
  } catch {
    return null;
  }
}

const cacheSet = (key, buf) =>
  writeFile(path.join(CACHE_DIR, `${key}.bin`), buf);

/* -------------------------------------------------------------------------- */
const used = new Set();
const credits = [];
const log = (m) => process.stdout.write(`${m}\n`);

async function download(slug) {
  const cached = await cacheGet(`raw_${slug}`);
  if (cached) return cached;

  const res = await fetch(`${CDN}/${slug}.jpg`, {
    headers: { "User-Agent": UA, Referer: "https://www.burst.shopify.com/" },
    signal: AbortSignal.timeout(90000),
    redirect: "follow",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 40000) throw new Error(`suspiciously small (${buf.length}b)`);

  await cacheSet(`raw_${slug}`, buf);
  return buf;
}

async function prepare(buf, slot) {
  return sharp(buf, { failOn: "none" })
    .rotate()
    .resize(slot.w, slot.h, {
      fit: "cover",
      position: sharp.strategy.attention,
      kernel: sharp.kernel.lanczos3,
    })
    .modulate(GRADE.modulate)
    .linear(GRADE.linear[0], GRADE.linear[1])
    .tint(GRADE.tint)
    .sharpen(GRADE.sharpen)
    .jpeg({ quality: 82, progressive: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
}

async function fillSlot(slot) {
  const problems = [];

  for (const slug of slot.picks) {
    if (used.has(slug)) {
      problems.push(`${slug}: already used elsewhere`);
      continue;
    }

    try {
       
      const raw = await download(slug);
       
      const meta = await sharp(raw).metadata();

      if (!meta.width || meta.width < slot.minW) {
        problems.push(`${slug}: source only ${meta.width}px wide`);
        continue;
      }

       
      const out = await prepare(raw, slot);
       
      await writeFile(path.join(OUT_DIR, `${slot.name}.jpg`), out);

      used.add(slug);
      credits.push({ file: `${slot.name}.jpg`, slug, page: `${PAGE}/${slug}` });

      log(
        `  ok   ${slot.name.padEnd(21)} ${slot.w}x${slot.h} ` +
          `${String(Math.round(out.length / 1024)).padStart(4)}kb  <- ${slug}`,
      );
      return true;
    } catch (err) {
      problems.push(`${slug}: ${err.message}`);
    }
  }

  log(`  FAIL ${slot.name}`);
  problems.forEach((p) => log(`         - ${p}`));
  return false;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(DOCS_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  log("Fetching salon photography from Burst...\n");

  const failed = [];
  for (const slot of SLOTS) {
     
    const ok = await fillSlot(slot);
    if (!ok) failed.push(slot.name);
  }

  /* --------------------------- attribution --------------------------- */
  const byFile = Object.fromEntries(credits.map((c) => [c.file, c]));

  const lines = [
    "# Image credits",
    "",
    "Photography in `public/images` is free stock from",
    "[Burst by Shopify](https://www.burst.shopify.com), which may be used",
    "commercially. Files were fetched and processed by",
    "`scripts/fetch-photos.mjs`.",
    "",
    "> These are licensed demo images. For a paying client, **replace them with",
    "> the studio's own photography** and delete this file.",
    "",
    "| File | Photo |",
    "| --- | --- |",
    ...credits.map((c) => `| \`${c.file}\` | [${c.slug}](${c.page}) |`),
    "",
    ...(byFile["hero.jpg"]
      ? []
      : ["_No hero image was resolved._", ""]),
  ];

  await writeFile(path.join(DOCS_DIR, "IMAGE-CREDITS.md"), lines.join("\n"), "utf8");

  log(`\nDone. ${credits.length}/${SLOTS.length} images.`);
  if (failed.length) log(`Failed: ${failed.join(", ")}`);
}

main().catch((err) => {
  log(`Fatal: ${err.stack}`);
  process.exit(1);
});
