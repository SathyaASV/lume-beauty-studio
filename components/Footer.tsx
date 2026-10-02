import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, addressLines } from "@/config/site";
import { directionsUrl, whatsappUrl } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { Container } from "./ui";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <p className="font-display text-[2rem] leading-none tracking-[0.26em] text-ink">
              {siteConfig.business.name}
            </p>
            <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.32em] text-muted">
              {siteConfig.business.descriptor}
            </p>
            <p className="mt-6 max-w-xs text-[13.5px] leading-[1.8] text-muted">
              {siteConfig.business.tagline} Established {siteConfig.business.established}.
            </p>

            <div className="mt-7 flex items-center gap-2.5">
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

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-brass-deep"
                  >
                    {item.label}
                    <ArrowRight
                      size={12}
                      strokeWidth={1.7}
                      aria-hidden="true"
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="group inline-flex items-center gap-1.5 text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-brass-deep"
                >
                  Book Appointment
                  <ArrowRight
                    size={12}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              </li>
            </ul>
          </nav>

          {/* Treatments */}
          <nav aria-label="Treatments">
            <h2 className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
              Treatments
            </h2>
            <ul className="mt-5 space-y-3.5">
              {siteConfig.services.items.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-brass-deep"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted">
              Contact
            </h2>
            <address className="mt-5 not-italic">
              <span className="flex gap-3 text-[13.5px] leading-[1.7] text-ink-soft">
                <MapPin
                  size={15}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brass-deep"
                />
                <span>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a
                    href={directionsUrl()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1.5 inline-block text-[12px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-brass-deep"
                  >
                    Get directions
                  </a>
                </span>
              </span>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="mt-4 flex items-center gap-3 text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-brass-deep"
              >
                <Phone
                  size={15}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="shrink-0 text-brass-deep"
                />
                {siteConfig.contact.phoneDisplay}
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-3 flex items-center gap-3 text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-brass-deep"
              >
                <Mail
                  size={15}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="shrink-0 text-brass-deep"
                />
                {siteConfig.contact.email}
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-5 border-t border-line pt-7 sm:flex-row sm:justify-between">
          <p className="text-[12px] tracking-[0.02em] text-muted">
            © {year} {siteConfig.business.name} {siteConfig.business.descriptor}.
            All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-[12px] text-muted">
              Est. {siteConfig.business.established} · {siteConfig.contact.address.city}
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-brass-deep"
            >
              Back to top
              <span
                aria-hidden="true"
                className="flex h-7 w-7 rotate-[-45deg] items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink"
              >
                <ArrowRight size={12} strokeWidth={1.7} />
              </span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
