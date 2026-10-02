import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { siteConfig, fullAddress, addressLines } from "@/config/site";
import { themeCss } from "@/lib/utils";
import "./globals.css";

/* ------------------------------------------------------------------ */
/*  Typography — an elegant serif for display, a clean sans for text  */
/* ------------------------------------------------------------------ */
const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* ------------------------------------------------------------------ */
/*  SEO                                                               */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.title,
    template: `%s · ${siteConfig.business.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.business.name,
  authors: [{ name: siteConfig.business.name }],
  creator: siteConfig.business.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.business.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.business.name} — ${siteConfig.business.descriptor}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  alternates: { canonical: "/" },
  category: "beauty",
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.ivory,
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

/* ------------------------------------------------------------------ */
/*  LocalBusiness structured data                                      */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: siteConfig.business.name,
  description: siteConfig.business.summary,
  image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
  url: siteConfig.seo.siteUrl,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  foundingDate: String(siteConfig.business.established),
  priceRange: (() => {
    const amounts = siteConfig.services.items.map((s) =>
      Number(s.price.replace(/[^0-9]/g, "")),
    );
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);
    const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
    return min === max ? fmt(min) : `${fmt(min)} - ${fmt(max)}`;
  })(),
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postcode,
    addressCountry: siteConfig.contact.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9719,
    longitude: 77.6412,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "18:00",
    },
  ],
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  addressLines,
  fullAddress,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.testimonials.rating.value,
    reviewCount: "180",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full`}
    >
      <head>
        {/* Palette from config/site.ts — must load before first paint. */}
        <style
          id="lume-theme"
          dangerouslySetInnerHTML={{ __html: themeCss() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* If JavaScript is unavailable, never hide reveal-on-scroll content. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[13px] focus:text-ivory"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
