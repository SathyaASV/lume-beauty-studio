import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";

const about = siteConfig.about;

export function About() {
  return (
    <Section id="about" className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* ------------------------------------------------------ */}
          {/*  Image + signature                                     */}
          {/* ------------------------------------------------------ */}
          <Reveal className="order-2 lg:order-1">
            <div className="group relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-cream shadow-[0_28px_60px_-50px_rgba(20,16,13,0.55)]">
                <Image
                  src={about.image}
                  alt={`The ${siteConfig.business.name} studio`}
                  fill
                  sizes="(max-width: 1023px) 90vw, 42vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
                />
              </div>

              {/* Stats panel overlapping the image edge */}
              <div className="relative z-10 -mt-10 ml-4 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:-mt-12 sm:ml-10 lg:ml-14">
                {about.stats.map((stat, i) => (
                  <Reveal
                    key={stat.label}
                    delay={i * 70}
                    className="bg-ivory px-5 py-6 sm:px-6 sm:py-7"
                  >
                    <span className="block font-display text-[2rem] leading-none text-ink sm:text-[2.4rem]">
                      {stat.value}
                    </span>
                    <span className="mt-2.5 block text-[10.5px] font-medium uppercase leading-snug tracking-[0.16em] text-muted">
                      {stat.label}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------------ */}
          {/*  Copy                                                 */}
          {/* ------------------------------------------------------ */}
          <div className="order-1 lg:order-2 lg:pt-4">
            <Reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[20ch] font-display text-[2.05rem] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[2.6rem] lg:text-[3.1rem]">
                {about.headline}
              </h2>
            </Reveal>

            {about.body.map((paragraph, i) => (
              <Reveal key={i} delay={90 + i * 80}>
                <p className="mt-6 max-w-[38rem] text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={260}>
              <div className="mt-10 flex items-center gap-5 border-t border-line pt-8">
                <span
                  aria-hidden="true"
                  className="h-11 w-px bg-line"
                />
                <div>
                  <p className="font-display text-[1.35rem] leading-none text-ink">
                    {about.signature.name}
                  </p>
                  <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
                    {about.signature.role}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
