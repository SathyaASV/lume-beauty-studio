import Image from "next/image";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappUrl } from "@/lib/utils";
import { WhatsAppIcon } from "./BrandIcons";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";

const booking = siteConfig.booking;

export function BookingCta() {
  return (
    <Section id="booking" tone="ink" className="relative overflow-hidden">
      {/* Background artwork â€” kept low enough that the headline stays the
          focus, but visible enough that the section reads as a photographed
          space rather than a flat black band. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={booking.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.34]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
        {/* Vignette keeps the centre column legible over any photograph. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,16,13,0.72)_0%,transparent_72%)]" />
      </div>

      <Container className="relative">
        <div className="py-16 text-center sm:py-20 lg:py-28">
          <Reveal className="mx-auto max-w-3xl">
            <Eyebrow tone="dark" className="justify-center">
              {booking.eyebrow}
            </Eyebrow>

            <h2 className="mt-7 font-display text-[2.3rem] leading-[1.08] tracking-[-0.015em] text-ivory sm:text-[3.1rem] lg:text-[3.9rem]">
              {booking.headline}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.8] text-ivory/70 sm:text-[16.5px]">
              {booking.lead}
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-11">
            <div
              aria-hidden="true"
              className="mx-auto mb-9 h-px w-16 bg-gradient-to-r from-transparent via-brass/70 to-transparent"
            />
            <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ivory px-8 py-4 text-[14.5px] font-medium text-ink transition-all duration-300 hover:bg-cream active:scale-[0.985] sm:w-auto",
                )}
              >
                <WhatsAppIcon size={17} className="text-[#1FA855]" />
                {booking.cta}
              </a>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-ivory/25 px-8 py-4 text-[14.5px] font-medium text-ivory transition-all duration-300 hover:border-ivory/60 hover:bg-ivory/5 active:scale-[0.985] sm:w-auto"
              >
                <Phone size={16} strokeWidth={1.6} aria-hidden="true" />
                {booking.secondaryCta}
              </a>
            </div>

            <p className="mt-7 text-[12.5px] tracking-[0.02em] text-ivory/45">
              Or call the studio on{" "}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-ivory/75 underline decoration-ivory/25 underline-offset-4 transition-colors hover:text-ivory"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
