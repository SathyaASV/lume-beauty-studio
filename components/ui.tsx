import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------ */
/*  Section shell — keeps vertical rhythm consistent across the page  */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  children,
  className,
  tone = "ivory",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "ivory" | "cream" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 md:scroll-mt-28",
        tone === "cream" && "bg-cream",
        tone === "ink" && "bg-ink text-ivory",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typography helpers                                                */
/* ------------------------------------------------------------------ */

/** Small uppercase label with a leading rule — the recurring accent. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]",
        tone === "dark" ? "text-brass" : "text-brass-deep",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-7 transition-colors",
          tone === "dark" ? "bg-brass/60" : "bg-brass/70",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  headline,
  lead,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow: string;
  headline: string;
  lead?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-6 font-display text-[2.05rem] leading-[1.14] tracking-[-0.01em] sm:text-[2.6rem] lg:text-[3.1rem]",
          tone === "dark" ? "text-ivory" : "text-ink",
        )}
      >
        {headline}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-[15px] leading-[1.75] sm:text-base",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-ivory/70" : "text-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                           */
/* ------------------------------------------------------------------ */

const buttonBase =
  "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full text-[14px] font-medium tracking-[0.01em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-deep active:scale-[0.985]";

export function PrimaryLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        buttonBase,
        "bg-ink px-7 py-3.5 text-ivory hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-[0_16px_30px_-18px_rgba(20,16,13,0.75)]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SecondaryLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        buttonBase,
        "border border-line bg-transparent px-7 py-3.5 text-ink hover:-translate-y-0.5 hover:border-ink/50 hover:bg-ink/[0.03]",
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Text link with a sliding arrow — used for inline CTAs. */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group/link inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-deep",
        tone === "dark" ? "text-ivory/80 hover:text-ivory" : "text-ink hover:text-brass-deep",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover/link:w-full"
        />
      </span>
      <ArrowRightIcon />
    </a>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover/link:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
