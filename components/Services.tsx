import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/utils";
import { getIcon } from "./icon-registry";
import { Container, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const services = siteConfig.services;

export function Services() {
  return (
    <Section id="services" tone="cream" className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={services.eyebrow}
            headline={services.headline}
            lead={services.lead}
            className="max-w-xl"
          />

          <Reveal delay={120} className="shrink-0">
            <p className="max-w-xs text-[13.5px] leading-[1.75] text-muted">
              Prices are indicative and confirmed at your consultation. Every
              treatment is one-to-one and booked by the hour.
            </p>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- */}
        {/*  Service grid                                          */}
        {/* ---------------------------------------------------- */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.items.map((service, i) => {
            const Icon = getIcon(service.icon);

            return (
              <Reveal key={service.id} delay={(i % 3) * 90} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-line/80 bg-ivory transition-all duration-500 hover:-translate-y-1 hover:border-brass/50">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                    />
                    {/* Permanent base gradient so the index reads on any photo,
                        plus a stronger wash on hover for depth. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/5 to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    {/* Index */}
                    <span className="absolute left-4 top-4 font-display text-[13px] tracking-[0.16em] text-ivory/90 drop-shadow-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Duration chip */}
                    <span className="absolute right-4 top-4 rounded-full bg-ivory/85 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
                      {service.duration}
                    </span>

                    {/* Icon chip */}
                    <span className="absolute -bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ivory text-brass-deep transition-all duration-500 group-hover:border-brass group-hover:bg-ink group-hover:text-brass">
                      <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>

                  {/* Body â€” set out like a service menu, not a card */}
                  <div className="flex flex-1 flex-col p-6 pt-8 sm:p-7 sm:pt-9">
                    <h3 className="font-display text-[1.55rem] leading-tight tracking-[-0.01em] text-ink">
                      {service.title}
                    </h3>

                    <p className="mt-3.5 flex-1 text-[14px] leading-[1.8] text-muted">
                      {service.description}
                    </p>

                    {/* Price line with a dotted leader, as on a printed menu */}
                    <div className="mt-8 flex items-end gap-4">
                      <p className="flex items-baseline gap-3 whitespace-nowrap">
                        <span className="text-[9.5px] font-medium uppercase tracking-[0.2em] text-muted">
                          {service.priceLabel}
                        </span>
                        <span className="font-display text-[1.7rem] leading-none text-ink">
                          {service.price}
                        </span>
                      </p>

                      <span
                        aria-hidden="true"
                        className="mb-1.5 flex-1 border-b border-dotted border-line"
                      />

                      <a
                        href={whatsappUrl(service.title)}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${services.cta} â€” ${service.title}`}
                        className="group/cta inline-flex shrink-0 items-center gap-1.5 pb-0.5 text-[11.5px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:text-brass-deep"
                      >
                        {services.cta}
                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.6}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
