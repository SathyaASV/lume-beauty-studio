import { siteConfig } from "@/config/site";

/* -------------------------------------------------------------------------- */
/*  Small utilities. No extra dependencies on purpose.                        */
/* -------------------------------------------------------------------------- */

/** Join conditional class names. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Resolve the pre-filled WhatsApp message from config/site.ts.
 * `{business}` and `{service}` are replaced; pass a service to name it.
 */
export function appointmentMessage(serviceName?: string): string {
  const base = siteConfig.booking.message
    .replace("{business}", siteConfig.business.name)
    .replace("{service}", serviceName ?? "")
    .trim();

  return serviceName ? `${base}\n\nService: ${serviceName}` : base;
}

/** Build a wa.me link with a pre-filled message. */
export function whatsappUrl(serviceName?: string): string {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    appointmentMessage(serviceName),
  )}`;
}

/** A free Google Maps directions link — no API key, no billing. */
export function directionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.contact.address.mapQuery,
  )}`;
}

/** Theme -> CSS custom properties, injected once from the root layout. */
export function themeCss(): string {
  const kebab = (key: string) =>
    key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  const vars = Object.entries(siteConfig.theme)
    .map(([key, value]) => `--lume-${kebab(key)}: ${value};`)
    .join(" ");

  return `:root { ${vars} }`;
}
