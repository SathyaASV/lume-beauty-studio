import { Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container, Section } from "./ui";
import { Reveal } from "./Reveal";

const t = siteConfig.testimonials;

export function Testimonials() {
  return (
    <Section id="reviews" className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-brass-deep">
              <span aria-hidden="true" className="h-px w-7 bg-brass/70" />
              {t.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-[2.05rem] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[2.6rem] lg:text-[3.1rem]">
              {t.headline}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-muted sm:text-base">
              {t.lead}
            </p>
          </Reveal>

          {/* Aggregate rating */}
          <Reveal delay={120}>
            <div className="flex items-center gap-5 rounded-[2px] border border-line bg-cream/50 px-7 py-6">
              <div>
                <p className="font-display text-[2.5rem] leading-none text-ink">
                  {t.rating.value}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  {t.rating.outOf} rating
                </p>
              </div>
              <span aria-hidden="true" className="h-14 w-px bg-line" />
              <div>
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-brass text-brass"
                      strokeWidth={1.4}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[11.5px] tracking-[0.02em] text-muted">
                  {t.rating.count}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- */}
        {/*  Testimonial cards                                  */}
        {/* ---------------------------------------------------- */}
        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 100} className="h-full">
              <figure className="group relative flex h-full flex-col border border-line/80 bg-ivory px-7 py-9 transition-colors duration-500 hover:border-brass/50 sm:px-8">
                {/* Oversized serif mark, set into the corner like a pull-quote */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 right-6 font-display text-[5.5rem] leading-none text-brass/15 transition-colors duration-500 group-hover:text-brass/30"
                >
                  &ldquo;
                </span>

                <blockquote className="flex-1">
                  <p className="font-display text-[1.14rem] leading-[1.62] text-ink-soft">
                    {item.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-9 flex items-center gap-4 border-t border-line pt-6">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-cream font-display text-[15px] tracking-[0.06em] text-brass-deep"
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] tracking-[0.01em] text-ink">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted">
                      {item.service}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
