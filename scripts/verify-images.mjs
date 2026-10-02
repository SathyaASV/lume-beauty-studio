/**
 * verify-images.mjs
 * ---------------------------------------------------------------------------
 * Fails the build if any image the site references is missing, unreadable, or
 * not a real photograph.
 *
 * Why this exists: a broken image path used to fail *silently* — the page
 * rendered, the layout looked right, and the only symptom was an empty box
 * where a photograph should be. That is exactly the kind of regression that
 * survives a visual check of the markup, so it is caught here instead.
 *
 * Checks, per image:
 *   1. the file exists under /public,
 *   2. it is large enough to be a photograph (not an error page saved as .jpg),
 *   3. it starts with the JPEG magic bytes,
 *   4. its SOF marker reports real dimensions,
 *   5. its aspect ratio is within tolerance of what the slot expects.
 *
 * Pure Node — no image library required.
 *
 * Run:  node scripts/verify-images.mjs
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

/** Minimum bytes for a usable photograph. Anything smaller is a placeholder. */
const MIN_BYTES = 12000;

/** Aspect-ratio tolerance, as a fraction (0.12 = ±12%). */
const RATIO_TOLERANCE = 0.12;

/**
 * Expected aspect ratios, keyed by the file name in /public/images.
 * Values are width / height. Add an entry whenever a new image slot is added.
 */
const EXPECTED = {
  "hero.jpg": 1200 / 1500,
  "about.jpg": 1100 / 1375,
  "experience.jpg": 1100 / 1375,
  "booking.jpg": 2000 / 1100,
  "og.jpg": 1200 / 630,
  "service-hair-styling.jpg": 1000 / 750,
  "service-hair-colour.jpg": 1000 / 750,
  "service-facial.jpg": 1000 / 750,
  "service-nails.jpg": 1000 / 750,
  "service-bridal.jpg": 1000 / 750,
  "service-spa.jpg": 1000 / 750,
  "gallery-01.jpg": 2000 / 1250,
  "gallery-02.jpg": 1250 / 1000,
  "gallery-03.jpg": 1000 / 1000,
  "gallery-04.jpg": 1000 / 1333,
  "gallery-05.jpg": 1250 / 1000,
  "gallery-06.jpg": 1000 / 1250,
  "gallery-07.jpg": 1100 / 1375,
  "gallery-08.jpg": 1250 / 1000,
  "gallery-09.jpg": 1000 / 1250,
};

/** Read width/height out of a JPEG's SOF marker. Returns null if not found. */
function jpegDimensions(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8 || buf[2] !== 0xff) {
    return null;
  }

  let offset = 2;

  while (offset + 9 < buf.length) {
    // Padding of 0xff bytes between segments is legal.
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buf[offset + 1];

    // SOF0–SOF15, excluding DHT (0xc4), DQT (0xdb) and RST (0xd0–0xd7).
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

    if (isStartOfFrame) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }

    // Standalone markers (DQT, DHT, SOI, EOI, COM) carry no length field.
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const segmentLength = buf.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }

  return null;
}

const problems = [];
const checked = [];

for (const [name, expected] of Object.entries(EXPECTED)) {
  const file = path.join(PUBLIC, "images", name);

  let buf;
  try {
    buf = await readFile(file);
  } catch {
    problems.push(`${name}: missing from public/images/`);
    continue;
  }

  if (buf.length < MIN_BYTES) {
    problems.push(`${name}: only ${buf.length} bytes — too small to be a photograph`);
    continue;
  }

  const dims = jpegDimensions(buf);
  if (!dims || !dims.width || !dims.height) {
    problems.push(`${name}: not a readable JPEG`);
    continue;
  }

  const actual = dims.width / dims.height;
  const drift = Math.abs(actual - expected) / expected;

  if (drift > RATIO_TOLERANCE) {
    problems.push(
      `${name}: aspect ${dims.width}x${dims.height} (${actual.toFixed(2)}) ` +
        `does not match the expected ${expected.toFixed(2)} — the slot will crop badly`,
    );
    continue;
  }

  checked.push(`${name}  ${dims.width}x${dims.height}`);
}

process.stdout.write(`Verified ${checked.length}/${Object.keys(EXPECTED).length} images\n`);
for (const line of checked) process.stdout.write(`  ok   ${line}\n`);

if (problems.length) {
  process.stdout.write(`\n${problems.length} problem(s):\n`);
  for (const p of problems) process.stdout.write(`  FAIL ${p}\n`);
  process.exit(1);
}
