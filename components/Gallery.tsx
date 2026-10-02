"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const gallery = siteConfig.gallery;

const ratioClass: Record<(typeof gallery.items)[number]["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[5/4]",
  square: "aspect-square",
};

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        if (current === null) return current;
        const next = (current + delta + gallery.items.length) % gallery.items.length;
        return next;
      });
    },
    [],
  );

  /* --- keyboard support while the lightbox is open --- */
  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    document.body.classList.add("nav-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [active, close, step]);

  const current = active === null ? null : gallery.items[active];

  return (
    <Section id="gallery" tone="cream" className="py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={gallery.eyebrow}
          headline={gallery.headline}
          lead={gallery.lead}
          align="center"
        />

        {/* ---------------------------------------------------- */}
        {/*  Lead image â€” full-bleed within the container, so the  */}
        {/*  set opens on one strong frame instead of nine equal   */}
        {/*  tiles competing for attention.                        */}
        {/* ---------------------------------------------------- */}
        {gallery.items[0] ? (
          <Reveal distance={20} className="mt-14 lg:mt-16">
            {(() => {
              const lead = gallery.items[0];
              return (
                <button
                  type="button"
                  onClick={() => setActive(0)}
                  aria-label={`View larger: ${lead.caption}`}
                  className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-sand sm:aspect-[16/8]"
                >
                  <Image
                    src={lead.src}
                    alt={lead.alt}
                    fill
                    preload
                    sizes="(max-width: 1023px) 92vw, 1200px"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-7">
                    <span className="font-display text-[1.35rem] text-ivory sm:text-[1.6rem]">
                      {lead.caption}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory">
                      <Maximize2 size={14} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })()}
          </Reveal>
        ) : null}

        {/* ---------------------------------------------------- */}
        {/*  Supporting grid                                      */}
        {/* ---------------------------------------------------- */}
        <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.items.slice(1).map((image, i) => {
            const index = i + 1;

            return (
              <Reveal key={image.src} delay={(i % 3) * 70} distance={18}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View larger: ${image.caption}`}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-[2px] bg-sand",
                    ratioClass[image.ratio],
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />

                  {/* Hover veil */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between gap-3 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ivory">
                      {image.caption}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory">
                      <Maximize2 size={12} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {/* ---------------------------------------------------- */}
      {/*  Lightbox                                            */}
      {/* ---------------------------------------------------- */}
      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 px-4 py-8 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-ink sm:right-7 sm:top-7"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-ink sm:left-6"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-ink sm:right-6"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          <figure
            className="relative max-h-full w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[2px] bg-ink/50">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="90vw"
                className="anim-fade object-contain"
              />
            </div>

            <figcaption className="mt-5 flex items-center justify-center gap-4 text-center">
              <span className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ivory/90">
                {current.caption}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-brass/60" />
              <span className="text-[11.5px] tracking-[0.12em] text-ivory/50">
                {(active ?? 0) + 1} / {gallery.items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </Section>
  );
}
