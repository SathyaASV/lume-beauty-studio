/**
 * ============================================================================
 *  LUMÉ — SITE CONFIGURATION
 * ============================================================================
 *
 *  >>> THIS IS THE FILE YOU EDIT TO CUSTOMISE THE SITE FOR A NEW CLIENT. <<<
 *
 *  Everything a real business would want to change lives here: name, tagline,
 *  contact details, WhatsApp number, address, opening hours, services, prices,
 *  gallery, testimonials, social links, SEO text and the colour theme.
 *
 *  A few rules to keep it safe:
 *   1. WhatsApp number  -> digits only, country code first, no "+" or spaces.
 *                         e.g. India = "919812345678"
 *   2. Phone           -> E.164 for `tel:` links, pretty version for display.
 *   3. Service prices  -> plain text, e.g. "₹1,200". Use "Free" or "On request"
 *                         if that suits the business better.
 *   4. Section anchors -> must match the ids used in the page components
 *                         (about, services, experience, gallery, reviews, booking).
 *   5. Colours         -> any valid hex. They flow through the whole site.
 *
 *  Images: swap the files in /public/images (keep the same names) or point the
 *  paths below at your own photos. Any size works — the layout is responsive.
 * ============================================================================
 */

export type Service = {
  /** Unique key — also used for the icon lookup and the WhatsApp message. */
  id: string;
  title: string;
  /** One or two sentences. Keep it warm and specific. */
  description: string;
  /** Prefix shown before the price, e.g. "From" / "Starting at" / "Prices from". */
  priceLabel: string;
  /** Plain text price, e.g. "₹1,200". */
  price: string;
  /** Typical appointment length, e.g. "60–90 min". Shown as a meta line. */
  duration: string;
  /** Icon key — see components/icon-registry.ts for the full list. */
  icon: string;
  /** Path in /public. Landscape 4:3 works best (e.g. 1000x750). */
  image: string;
};

export type OpeningHour = {
  /** Short label, e.g. "Monday — Friday". Use "" for "Public holidays". */
  days: string;
  hours: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Pillar = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  /** Initials + surname only. Never a real full name. */
  name: string;
  service: string;
  quote: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  /** Small caption shown on hover / in the lightbox. */
  caption: string;
  /** Portrait | Landscape | Square — controls the masonry rhythm. */
  ratio: "portrait" | "landscape" | "square";
};

export const siteConfig = {
  /* ------------------------------------------------------------------ */
  /*  BUSINESS                                                          */
  /* ------------------------------------------------------------------ */
  business: {
    /** Shown as the wordmark. Accented characters are fine (LUMÉ). */
    name: "LUMÉ",
    /** Small line under the wordmark, and in the footer. */
    descriptor: "Premium Beauty Studio",
    /** Short line used in the hero, under the headline. */
    tagline: "Precision beauty, quietly delivered.",
    /** Year the studio opened. Used for the "Est." eyebrow and stats. */
    established: 2016,
    /** One-sentence description for search engines. */
    summary:
      "LUMÉ is a premium beauty studio in Bengaluru offering hair styling, colour, facials, nails, bridal beauty and spa treatments by appointment.",
  },

  /* ------------------------------------------------------------------ */
  /*  CONTACT — EDIT THESE FOR EVERY NEW CLIENT                          */
  /* ------------------------------------------------------------------ */
  contact: {
    /* >>> PLACEHOLDER NUMBER — replace with the real one. <<< */
    /** Digits only, country code first, no "+" or spaces. */
    whatsapp: "919999999999",
    /** Human-readable fallback, e.g. "+91 98123 45678". */
    whatsappDisplay: "+91 99999 99999",
    /** E.164 for the tel: link — digits and a leading "+" only. */
    phone: "+919999999999",
    phoneDisplay: "+91 99999 99999",
    email: "hello@lume.studio",
    address: {
      building: "3rd Floor, Aurora Arcade",
      street: "14 Lantern Street, Indiranagar",
      city: "Bengaluru",
      region: "Karnataka",
      postcode: "560038",
      country: "India",
      /**
       * Used to build the "Get directions" link (plain Google Maps search —
       * no API key, no billing, no tracking). Paste a full Google Maps
       * place URL here instead if you prefer.
       */
      mapQuery: "14 Lantern Street, Indiranagar, Bengaluru 560038",
    },
  },

  /** Free-text note shown under the address block. */
  parkingNote: "Valet parking available at the main entrance on Lantern Street.",

  /** Opening hours. Add or remove rows freely. */
  hours: [
    { days: "Monday — Friday", hours: "10:00 — 20:00" },
    { days: "Saturday", hours: "09:00 — 20:00" },
    { days: "Sunday", hours: "10:00 — 18:00" },
    { days: "Public holidays", hours: "By appointment" },
  ] satisfies OpeningHour[],

  /* ------------------------------------------------------------------ */
  /*  SOCIAL LINKS — replace the URLs                                    */
  /* ------------------------------------------------------------------ */
  social: {
    instagram: "https://instagram.com/lume.studio",
    facebook: "https://facebook.com/lume.studio",
  },

  /* ------------------------------------------------------------------ */
  /*  NAVIGATION                                                        */
  /*  `href` must match a section id further down the page.             */
  /* ------------------------------------------------------------------ */
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],

  /* ------------------------------------------------------------------ */
  /*  HERO                                                              */
  /* ------------------------------------------------------------------ */
  hero: {
    eyebrow: "Premium Beauty Studio · Est. 2016",
    headline: "Beauty, quietly done well.",
    lead: "A calm, private studio for hair, skin and occasion. Considered consultations, premium products, and craft refined over eight years.",
    primaryCta: "Book an Appointment",
    secondaryCta: "Explore Services",
    /** Small proof points under the buttons. */
    trust: ["4.9 / 5 average rating", "2,000+ clients welcomed", "Private, sterilised suites"],
    /** Small floating card on the hero image. */
    availability: {
      label: "Next availability",
      value: "Today, 4:30 PM",
    },
    image: "/images/hero.jpg",
    /**
     * A smaller detail shot layered over the main hero image. Gives the
     * composition depth and stops the column reading as one flat panel.
     * Set to null to hide it.
     */
    detailImage: {
      src: "/images/about.jpg",
      alt: "Inside one of the studio's private suites",
      /** Caption in the brass rule beneath the detail frame. */
      caption: "Six private suites",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  ABOUT                                                             */
  /* ------------------------------------------------------------------ */
  about: {
    eyebrow: "The Studio",
    headline: "A studio built around how you want to feel.",
    /** Two or three paragraphs, written out in full. */
    body: [
      "LUMÉ opened in 2016 with a single styling chair and one stubborn idea: that getting beautiful should never feel rushed. What started as a quiet home studio has grown into six private suites, but the approach hasn't changed. Every appointment is one-to-one, unhurried, and finished properly.",
      "We keep the team small on purpose. Every artist here has spent years — not weeks — refining their craft, and every client begins with a proper consultation. Nothing is recommended because it is trending, nothing is rushed, and you are never hurried out of the chair.",
    ],
    signature: {
      name: "N. Raghavan",
      role: "Founder & Creative Director",
    },
    image: "/images/about.jpg",
    stats: [
      { value: "8+", label: "Years Experience" },
      { value: "2K+", label: "Happy Clients" },
      { value: "15+", label: "Treatments" },
      { value: "4.9", label: "Average Rating" },
    ] satisfies Stat[],
  },

  /* ------------------------------------------------------------------ */
  /*  SERVICES — title, copy, price, icon and image are all editable    */
  /* ------------------------------------------------------------------ */
  services: {
    eyebrow: "Treatments",
    headline: "Services & Pricing",
    lead: "Every service begins with a consultation, so the treatment is built around your hair, your skin and the time you actually have.",
    items: [
      {
        id: "hair-styling",
        title: "Hair Styling",
        description: "Precision cuts, blow-dries and occasion styling, shaped around your hair texture and the time you have each morning.",
        priceLabel: "From",
        price: "₹1,200",
        duration: "60–90 min",
        icon: "scissors",
        image: "/images/service-hair-styling.jpg",
      },
      {
        id: "hair-colour",
        title: "Hair Colour",
        description: "Balayage, glossing and full colour, blended for your hair and planned to grow out softly between visits.",
        priceLabel: "From",
        price: "₹2,800",
        duration: "2–3 hrs",
        icon: "palette",
        image: "/images/service-hair-colour.jpg",
      },
      {
        id: "facial-skincare",
        title: "Facial & Skincare",
        description: "Skin-led facials with a therapist-led consultation and a routine you can realistically keep up.",
        priceLabel: "From",
        price: "₹1,900",
        duration: "60 min",
        icon: "flower",
        image: "/images/service-facial.jpg",
      },
      {
        id: "nails",
        title: "Manicure & Pedicure",
        description: "Detailed, unhurried nail care with a full sterilisation ritual performed between every single client.",
        priceLabel: "From",
        price: "₹900",
        duration: "45–75 min",
        icon: "hand",
        image: "/images/service-nails.jpg",
      },
      {
        id: "bridal",
        title: "Bridal Beauty",
        description: "A trial, a written timeline, and a calm morning-of plan — so the day itself stays exactly as it should be.",
        priceLabel: "Packages from",
        price: "₹12,000",
        duration: "Half day",
        icon: "crown",
        image: "/images/service-bridal.jpg",
      },
      {
        id: "spa",
        title: "Spa Treatments",
        description: "Massage, sculpting and restorative facials in a private suite, booked by the hour rather than the minute.",
        priceLabel: "From",
        price: "₹2,200",
        duration: "60–90 min",
        icon: "waves",
        image: "/images/service-spa.jpg",
      },
    ] satisfies Service[],
    /** What happens when someone taps "Book" on a card. */
    cta: "Book",
  },

  /* ------------------------------------------------------------------ */
  /*  FEATURED EXPERIENCE — the four reasons people choose you         */
  /* ------------------------------------------------------------------ */
  experience: {
    eyebrow: "Why LUMÉ",
    headline: "The difference is in the details nobody sees.",
    lead: "Four things we refuse to compromise on. They are not visible in a photograph, but they are the reason clients stay with us for years.",
    items: [
      {
        id: "stylists",
        title: "Experienced stylists",
        description: "Eight years on average behind the chair, and training that has never actually stopped.",
        icon: "award",
      },
      {
        id: "products",
        title: "Premium products",
        description: "Professional ranges only, chosen for how they perform rather than how they photograph.",
        icon: "gem",
      },
      {
        id: "hygiene",
        title: "Hygienic studio",
        description: "Tools autoclaved between clients, single-use disposables, and a private suite for every appointment.",
        icon: "shield",
      },
      {
        id: "consultation",
        title: "Personalised consultations",
        description: "We start by listening, then build the look around your hair, your routine and your life.",
        icon: "clipboard",
      },
    ] satisfies Pillar[],
    image: "/images/experience.jpg",
    /** Small caption under the image. */
    imageCaption: "The corner suite — where consultations happen.",
  },

  /* ------------------------------------------------------------------ */
  /*  GALLERY — add, remove or reorder freely                           */
  /* ------------------------------------------------------------------ */
  gallery: {
    eyebrow: "Portfolio",
    headline: "Selected Work",
    lead: "A look at colour, cutting, skin and occasion work from the studio — photographed between appointments.",
    items: [
      { src: "/images/gallery-01.jpg", alt: "Soft, sun-lit colour finished with a gloss", caption: "Colour & gloss", ratio: "landscape" },
      { src: "/images/gallery-02.jpg", alt: "Precision cut with a soft fringe", caption: "Precision cut", ratio: "landscape" },
      { src: "/images/gallery-03.jpg", alt: "Blow-dry finished with a smooth bend", caption: "Signature blow-dry", ratio: "square" },
      { src: "/images/gallery-04.jpg", alt: "Deep brunette root melt", caption: "Root melt", ratio: "portrait" },
      { src: "/images/gallery-05.jpg", alt: "Bridal styling with soft waves", caption: "Bridal styling", ratio: "landscape" },
      { src: "/images/gallery-06.jpg", alt: "Gloss refresh on natural hair", caption: "Gloss refresh", ratio: "portrait" },
      { src: "/images/gallery-07.jpg", alt: "Clean minimal gel manicure", caption: "Gel manicure", ratio: "square" },
      { src: "/images/gallery-08.jpg", alt: "Restorative facial treatment", caption: "Restorative facial", ratio: "landscape" },
      { src: "/images/gallery-09.jpg", alt: "Elegant updo for an evening event", caption: "Evening updo", ratio: "portrait" },
    ] satisfies GalleryImage[],
  },

  /* ------------------------------------------------------------------ */
  /*  TESTIMONIALS — initials only, never real full names               */
  /* ------------------------------------------------------------------ */
  testimonials: {
    eyebrow: "Kind Words",
    headline: "What our clients say",
    lead: "We let these speak for themselves.",
    items: [
      {
        name: "Ananya R.",
        service: "Hair Colour",
        quote: "I had tried four studios in this city for my balayage and this is the first time someone actually looked at my hair before touching it. Three appointments later the colour still looks like it grew out of my own head.",
      },
      {
        name: "Meera K.",
        service: "Bridal Beauty",
        quote: "They did the trial in March, sent a written timeline in April, and on the morning they arrived early, quiet and completely in control. I got to enjoy being a bride instead of project-managing my own face.",
      },
      {
        name: "Priya S.",
        service: "Facial & Skincare",
        quote: "The consultation was the most useful part. They told me which three products were genuinely worth buying and which four I should bin. My skin is measurably calmer eight weeks on.",
      },
    ] satisfies Testimonial[],
    rating: {
      value: "4.9",
      outOf: "5",
      count: "180+ reviews",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  BOOKING CTA                                                       */
  /* ------------------------------------------------------------------ */
  booking: {
    eyebrow: "Appointments",
    headline: "Ready for your next look?",
    lead: "Tell us what you have in mind and we will reply with availability — usually within the hour, and always the same day.",
    cta: "Book on WhatsApp",
    secondaryCta: "Call the studio",
    /** Pre-filled WhatsApp message. {business} and {service} are replaced. */
    message:
      "Hello {business}, I would like to book an appointment. Could you please share your availability?",
    image: "/images/booking.jpg",
  },

  /* ------------------------------------------------------------------ */
  /*  SEO / SHARING                                                     */
  /* ------------------------------------------------------------------ */
  seo: {
    title: "LUMÉ — Premium Beauty Studio | Hair, Skin & Bridal, Bengaluru",
    description:
      "A calm, private beauty studio in Indiranagar, Bengaluru. Hair styling, colour, facials, nails, bridal beauty and spa treatments by appointment.",
    /** Set to the real domain once the client has one. */
    siteUrl: "https://www.lume.studio",
    keywords: [
      "beauty studio Bengaluru",
      "hair colouring Indiranagar",
      "bridal makeup Bengaluru",
      "facial and skincare",
      "spa treatments Indiranagar",
    ],
    /** Path to the social sharing image inside /public. */
    ogImage: "/images/og.jpg",
  },

  /* ------------------------------------------------------------------ */
  /*  THEME — change these to re-skin the whole site                    */
  /*  Every value is a hex colour.                                       */
  /* ------------------------------------------------------------------ */
  theme: {
    /**
     * Main text colour — deep espresso brown, never pure or blue black.
     * Warmth comes from red dominating blue by ~23 points.
     */
    ink: "#2A1D13",
    /** Slightly lighter espresso for large sub-headings. */
    inkSoft: "#463628",
    /** Body copy and secondary text — warm taupe-brown. */
    muted: "#71624F",
    /**
     * Page background — warm ivory leaning to creamy champagne.
     * Deliberately not a neutral grey: red leads blue by ~22 points.
     */
    ivory: "#FAF3E4",
    /** Slightly deeper warm beige for alternating sections. */
    cream: "#F0E4C9",
    /** Borders, dividers, image mats — warm taupe. */
    sand: "#E7D6BC",
    /** Hairline rules — soft champagne. */
    line: "#E3D3B8",
    /** Primary accent — muted antique brass, kept desaturated on purpose. */
    brass: "#A8855A",
    /** Accent for text on light backgrounds (higher contrast). */
    brassDeep: "#80603A",
    /** Soft secondary accent — warm clay, deliberately not pink. */
    rose: "#C6A583",
  },
} as const;

/* ---------------------------------------------------------------------- */
/*  Derived helpers — not usually edited.                                 */
/* ---------------------------------------------------------------------- */

/** Full address as a single line, for the map link and structured data. */
export const fullAddress = [
  siteConfig.contact.address.building,
  siteConfig.contact.address.street,
  `${siteConfig.contact.address.city} ${siteConfig.contact.address.postcode}`,
  siteConfig.contact.address.region,
].join(", ");

/** Address as separate lines for display. */
export const addressLines = [
  siteConfig.contact.address.building,
  siteConfig.contact.address.street,
  `${siteConfig.contact.address.city} ${siteConfig.contact.address.postcode}`,
];
