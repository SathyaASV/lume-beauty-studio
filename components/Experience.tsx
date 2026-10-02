import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getIcon } from "./icon-registry";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";

const exp = siteConfig.experience;

export function Experience() {
  return (
    <Section id="experience" className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          {/* ------------------------------------------------------ */}
          {/*  Image                                                 */}
          {/* ------------------------------------------------------ */}
          <Reveal>
            <div className="group relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-cream shadow-[0_28px_60px_-50px_rgba(20,16,13,0.5)]">
                <Image
                  src={exp.image}
                  alt="Consultation corner at the LUMÉ studio"
                  fill
                  sizes="(max-width: 1023px) 90vw, 44vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute -right-5 -top-5 hidden h-24 w-24 border-r border-t border-brass/45 lg:block"
              />

              <p className="mt-5 text-center text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted sm:text-left">
                {exp.imageCaption}
              </p>
            </div>
          </Reveal>

          {/* ------------------------------------------------------ */}
          {/*  Four pillars                                          */}
          {/* ------------------------------------------------------ */}
          <div>
            <Reveal>
              <Eyebrow>{exp.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] font-display text-[2.05rem] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[2.6rem] lg:text-[3.1rem]">
                {exp.headline}
              </h2>
              <p className="mt-5 max-w-[34rem] text-[15px] leading-[1.8] text-muted sm:text-base">
                {exp.lead}
              </p>
            </Reveal>

            <div className="mt-11 divide-y divide-line border-y border-line">
              {exp.items.map((item, i) => {
                const Icon = getIcon(item.icon);

                return (
                  <Reveal key={item.id} delay={i * 80}>
                    <div className="group flex items-start gap-5 py-6 sm:gap-6 sm:py-7">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-brass-deep transition-all duration-500 group-hover:border-brass group-hover:bg-ink group-hover:text-brass sm:h-12 sm:w-12">
                        <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-3">
                          <span className="text-[10px] font-medium tracking-[0.2em] text-brass/80">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-display text-[1.3rem] leading-snug text-ink sm:text-[1.45rem]">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-2 pl-[1.9rem] text-[14px] leading-[1.75] text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
