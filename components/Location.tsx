import {
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { siteConfig, addressLines, fullAddress } from "@/config/site";
import { directionsUrl, whatsappUrl } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";

export function Location() {
  const c = siteConfig.contact;

  return (
    <Section id="contact" className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ------------------------------------------------------ */}
          {/*  Details                                               */}
          {/* ------------------------------------------------------ */}
          <div>
            <Reveal>
              <Eyebrow>Visit Us</Eyebrow>
              <h2 className="mt-6 max-w-[16ch] font-display text-[2.05rem] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[2.6rem] lg:text-[3.1rem]">
                Find the studio.
              </h2>
            </Reveal>

            {/* Address */}
            <Reveal delay={80}>
              <div className="mt-10 flex gap-5 border-b border-line pb-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-brass-deep">
                  <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
                    Address
                  </p>
                  <address className="mt-2.5 not-italic text-[15px] leading-[1.7] text-ink">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
                    {siteConfig.parkingNote}
                  </p>
                  <a
                    href={directionsUrl()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-brass-deep"
                  >
                    <Navigation size={13} strokeWidth={1.7} aria-hidden="true" />
                    Get directions
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Hours */}
            <Reveal delay={140}>
              <div className="flex gap-5 border-b border-line py-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-brass-deep">
                  <Clock size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
                    Opening Hours
                  </p>
                  <dl className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-x-8">
                    {siteConfig.hours.map((row) => (
                      <div
                        key={row.days}
                        className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2 sm:border-b-0 sm:pb-0"
                      >
                        <dt className="text-[13.5px] text-ink-soft">{row.days}</dt>
                        <dd className="shrink-0 text-[13px] tabular-nums text-muted">
                          {row.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>

            {/* Contact */}
            <Reveal delay={200}>
              <div className="flex gap-5 py-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-brass-deep">
                  <Phone size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 space-y-4">
                  <div>
                    <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
                      Phone
                    </p>
                    <a
                      href={`tel:${c.phone}`}
                      className="mt-2 block text-[15px] text-ink transition-colors hover:text-brass-deep"
                    >
                      {c.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-2 flex items-center gap-2 text-[15px] text-ink transition-colors hover:text-brass-deep"
                    >
                      <Mail size={14} strokeWidth={1.6} aria-hidden="true" />
                      {c.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
                      Follow
                    </p>
                    <div className="mt-3 flex items-center gap-2.5">
                      <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="LUMÉ on Instagram"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
                      >
                        <InstagramIcon size={16} />
                      </a>
                      <a
                        href={siteConfig.social.facebook}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="LUMÉ on Facebook"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
                      >
                        <FacebookIcon size={16} />
                      </a>
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Message LUMÉ on WhatsApp"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
                      >
                        <WhatsAppIcon size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* WhatsApp CTA */}
            <Reveal delay={260}>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[14.5px] font-medium text-ivory transition-all duration-300 hover:bg-ink-soft active:scale-[0.985] sm:w-auto"
              >
                <WhatsAppIcon size={17} className="text-[#1FA855]" />
                Book on WhatsApp
              </a>
            </Reveal>
          </div>

          {/* ------------------------------------------------------ */}
          {/*  Map visual â€” hand-drawn SVG, no map API required     */}
          {/* ------------------------------------------------------ */}
          <Reveal delay={140}>
            <div className="relative h-full min-h-[26rem]">
              <div className="relative h-full overflow-hidden rounded-[3px] border border-line bg-cream">
                <MapArtwork />

                {/* Pin label */}
                <div className="absolute left-1/2 top-1/2 w-[min(19rem,72%)] -translate-x-1/2 -translate-y-[calc(100%+1.1rem)] sm:-translate-y-[calc(100%+1.3rem)]">
                  <div className="rounded-[2px] border border-line bg-ivory/95 px-4 py-3 text-center shadow-[0_16px_34px_-24px_rgba(20,16,13,0.6)] backdrop-blur-sm">
                    <p className="font-display text-[1.1rem] leading-none text-ink">
                      {siteConfig.business.name}
                    </p>
                    <p className="mt-1.5 text-[9.5px] font-medium uppercase tracking-[0.18em] text-muted">
                      {c.address.building}
                    </p>
                  </div>
                </div>

                {/* Directions pill */}
                <a
                  href={directionsUrl()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11.5px] font-medium tracking-[0.04em] text-ivory transition-colors duration-300 hover:bg-ink-soft"
                >
                  <Navigation size={13} strokeWidth={1.7} aria-hidden="true" />
                  Directions
                </a>
              </div>

              {/* Address caption */}
              <p className="mt-4 text-center text-[12px] leading-relaxed text-muted sm:text-left">
                {fullAddress} â€” {c.address.country}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stylised map â€” pure SVG so no API key, billing or tracking is     */
/*  involved. Swap for a real embed later if the client wants one.   */
/* ------------------------------------------------------------------ */
function MapArtwork() {
  return (
    <svg
      viewBox="0 0 600 640"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Stylised map showing the location of ${siteConfig.business.name} in ${siteConfig.contact.address.city}`}
    >
      <defs>
        <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0H0v40"
            fill="none"
            stroke="currentColor"
            className="text-ink/[0.045]"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="600" height="640" fill="currentColor" className="text-cream" />
      <rect width="600" height="640" fill="url(#mapGrid)" />

      {/* City blocks */}
      <g className="fill-ink/[0.05]">
        <rect x="24" y="24" width="150" height="104" rx="3" />
        <rect x="196" y="24" width="118" height="104" rx="3" />
        <rect x="336" y="24" width="240" height="104" rx="3" />
        <rect x="24" y="156" width="150" height="96" rx="3" />
        <rect x="196" y="156" width="118" height="96" rx="3" />
        <rect x="336" y="156" width="118" height="96" rx="3" />
        <rect x="476" y="156" width="100" height="96" rx="3" />

        <rect x="24" y="390" width="118" height="112" rx="3" />
        <rect x="164" y="390" width="150" height="112" rx="3" />
        <rect x="336" y="390" width="118" height="112" rx="3" />
        <rect x="476" y="390" width="100" height="112" rx="3" />

        <rect x="24" y="530" width="150" height="86" rx="3" />
        <rect x="196" y="530" width="118" height="86" rx="3" />
        <rect x="336" y="530" width="240" height="86" rx="3" />
      </g>

      {/* Park */}
      <g>
        <rect
          x="336"
          y="280"
          width="240"
          height="86"
          rx="3"
          className="fill-[#9aa183]/25"
        />
        {[
          [372, 322],
          [420, 310],
          [468, 330],
          [516, 314],
          [396, 344],
          [500, 346],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i % 2 ? 9 : 12}
            className="fill-[#8b9279]/40"
          />
        ))}
      </g>

      {/* River */}
      <path
        d="M0 268c60-8 92 22 150 20s78-30 138-26 76 32 136 30 108-26 176-18"
        fill="none"
        className="stroke-[#a8bcc4]/45"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Roads */}
      <g className="stroke-ivory" fill="none" strokeLinecap="square">
        <path d="M0 280h600" strokeWidth="16" className="opacity-90" />
        <path d="M0 140h600" strokeWidth="9" className="opacity-80" />
        <path d="M0 365h600" strokeWidth="9" className="opacity-80" />
        <path d="M0 520h600" strokeWidth="9" className="opacity-80" />
        <path d="M186 0v640" strokeWidth="11" className="opacity-85" />
        <path d="M326 0v640" strokeWidth="9" className="opacity-80" />
        <path d="M466 0v640" strokeWidth="11" className="opacity-85" />
      </g>

      {/* Road casing */}
      <g className="stroke-ink/[0.10]" fill="none">
        <path d="M0 280h600" strokeWidth="1" />
        <path d="M186 0v640" strokeWidth="1" />
      </g>

      {/* Location pin */}
      <g transform="translate(326 300)">
        {/* pulse */}
        <circle
          r="34"
          className="fill-brass/15 anim-pulse"
          style={{ transformOrigin: "center" }}
        />
        <path
          d="M0 14c0 0-16-13.6-16-24.6A16 16 0 0 1 0-27a16 16 0 0 1 16 16.4C16 .4 0 14 0 14Z"
          transform="translate(0 -6)"
          className="fill-ink"
        />
        <circle
          cy="-18"
          r="5.5"
          className="fill-cream"
        />
      </g>
    </svg>
  );
}
