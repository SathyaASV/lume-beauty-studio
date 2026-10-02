import Image from "next/image";
import { ArrowRight, CalendarCheck, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappUrl } from "@/lib/utils";
import { Container, PrimaryLink, SecondaryLink } from "./ui";

const hero = siteConfig.hero;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ivory pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      {/* Soft tonal shape behind the image column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-8 hidden h-[520px] w-[520px] rounded-full bg-cream lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 hidden h-[380px] w-[380px] rounded-full bg-cream/60 xl:block"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ------------------------------------------------------ */}
          {/*  Copy                                                    */}
          {/* ------------------------------------------------------ */}
          <div>
            <p className="anim-in-up flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-brass-deep">
              <span aria-hidden="true" className="h-px w-7 bg-brass/70" />
              {hero.eyebrow}
            </p>

            <h1 className="anim-in-up anim-delay-1 mt-7 font-display text-[3rem] leading-[1.03] tracking-[-0.02em] text-ink sm:text-[4rem] lg:text-[4.75rem]">
              {hero.headline}
            </h1>

            <p className="anim-in-up anim-delay-2 mt-7 max-w-[34rem] text-[15px] leading-[1.8] text-muted sm:text-[16.5px]">
              {hero.lead}
            </p>

            {/* CTAs */}
            <div className="anim-in-up anim-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryLink href={whatsappUrl()} external>
                {hero.primaryCta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </PrimaryLink>

              <span
                aria-hidden="true"
                className="hidden h-6 w-px bg-line sm:block"
              />

              <SecondaryLink href="#services">{hero.secondaryCta}</SecondaryLink>
            </div>

            {/* Trust line */}
            <ul className="anim-in-up anim-delay-4 mt-11 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {hero.trust.map((item, i) => (
                <li key={item} className="flex items-center gap-2.5">
                  {i === 0 ? (
                    <Star
                      size={13}
                      className="shrink-0 fill-brass text-brass"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-brass/70"
                    />
                  )}
                  <span className="text-[12.5px] tracking-[0.02em] text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------ */}
          {/*  Image                                                  */}
          {/* ------------------------------------------------------ */}
          <div className="relative">
            <div className="anim-scale anim-delay-2 relative mx-auto max-w-[30rem] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 hidden h-40 w-40 border-b border-l border-brass/45 sm:block"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[14rem] rounded-b-[2px] bg-cream shadow-[0_30px_70px_-45px_rgba(20,16,13,0.5)]">
                <Image
                  src={hero.image}
                  alt={`Interior of the ${siteConfig.business.name} studio`}
                  fill
                  preload
                  sizes="(max-width: 1023px) 88vw, 44vw"
                  className="object-cover"
                />
                {/* Hairline inner frame — reads as a mounted print */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 rounded-t-[13.5rem] rounded-b-[2px] border border-ivory/25"
                />
              </div>

              {/* Layered detail shot — gives the column depth so it reads as a
                  photographed space rather than one flat panel. */}
              {hero.detailImage ? (
                <div className="anim-slide-in anim-delay-4 pointer-events-none absolute -bottom-14 -right-8 hidden w-[34%] min-w-[8.5rem] max-w-[12.5rem] xl:block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-cream shadow-[0_24px_50px_-28px_rgba(20,16,13,0.55)] ring-1 ring-ivory/70">
                    <Image
                      src={hero.detailImage.src}
                      alt={hero.detailImage.alt}
                      fill
                      sizes="12rem"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 border-t border-brass/40 pt-2 text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
                    {hero.detailImage.caption}
                  </p>
                </div>
              ) : null}

              {/* Availability card */}
              <div className="absolute -bottom-6 left-4 flex items-center gap-3.5 rounded-full border border-line bg-ivory/95 px-5 py-3.5 shadow-[0_18px_40px_-28px_rgba(20,16,13,0.55)] backdrop-blur-sm sm:-bottom-5 sm:left-8">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-brass-deep">
                  <CalendarCheck size={16} aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[9.5px] font-medium uppercase tracking-[0.2em] text-muted">
                    {hero.availability.label}
                  </span>
                  <span className="mt-0.5 block text-[13.5px] text-ink">
                    {hero.availability.value}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Marquee strip */}
      <div className={cn("relative mt-20 border-y border-line/70 bg-cream/40 py-4 lg:mt-28")}>
        <div className="flex overflow-hidden">
          <div className="marquee flex shrink-0 items-center gap-10 pr-10">
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex shrink-0 items-center gap-10" aria-hidden={group === 1}>
                {[
                  "Hair Styling",
                  "Hair Colour",
                  "Facial & Skincare",
                  "Manicure & Pedicure",
                  "Bridal Beauty",
                  "Spa Treatments",
                ].map((label) => (
                  <span
                    key={label}
                    className="flex shrink-0 items-center gap-10 text-[11px] font-medium uppercase tracking-[0.26em] text-muted"
                  >
                    {label}
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
