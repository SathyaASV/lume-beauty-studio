"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappUrl } from "@/lib/utils";
import { WhatsAppIcon } from "./BrandIcons";

/** Height of the fixed header, used for scroll offset in CSS. */
export const HEADER_OFFSET = 88;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("");

  /* --- scroll state: solid background + reading progress --- */
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 24);

        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? Math.min(y / total, 1) : 0);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* --- scroll spy: mark the section currently being read --- */
  useEffect(() => {
    const sections = siteConfig.nav
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // Pick the most-visible section so the highlight never flickers
        // between two sections that straddle the fold.
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActiveId(bestRatio > 0 ? best : "");
      },
      {
        // A band across the upper-middle of the viewport: a section counts as
        // "current" once it reaches the reader's natural resting line.
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* --- lock the page behind the mobile menu --- */
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  /* --- escape closes the menu --- */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line/70 bg-ivory/85 shadow-[0_1px_0_0_rgba(20,16,13,0.02),0_18px_40px_-32px_rgba(20,16,13,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
          {/* Wordmark */}
          <a
            href="#top"
            onClick={close}
            className="group flex shrink-0 flex-col leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-deep"
          >
            <span
              className={cn(
                "font-display text-[1.6rem] tracking-[0.3em] transition-colors duration-500 sm:text-[1.75rem]",
                scrolled ? "text-ink" : "text-ink",
              )}
            >
              {siteConfig.business.name}
            </span>
            <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.34em] text-muted">
              {siteConfig.business.descriptor}
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {siteConfig.nav.map((item) => {
                const isActive = activeId === item.href.replace("#", "");

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "nav-link relative text-[13px] tracking-[0.02em] transition-colors duration-300 hover:text-ink",
                        isActive ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {item.label}
                      {/* Underline grows from the centre on the active item. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute -bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2 bg-brass transition-all duration-500",
                          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12.5px] font-medium tracking-[0.04em] text-ivory transition-all duration-300 hover:bg-ink-soft hover:shadow-[0_10px_24px_-14px_rgba(20,16,13,0.7)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-deep"
            >
              <WhatsAppIcon size={15} />
              Book
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Reading progress */}
        <div
          aria-hidden="true"
          className={cn(
            "h-px origin-left bg-brass transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={close}
          className={cn(
            "absolute inset-0 bg-ink/25 transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "absolute inset-x-0 top-0 origin-top border-b border-line bg-ivory px-5 pb-8 pt-24 transition-all duration-500 sm:px-8",
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0",
          )}
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col divide-y divide-line/70">
              {siteConfig.nav.map((item, i) => {
                const isActive = activeId === item.href.replace("#", "");

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={close}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "menu-item flex items-center justify-between py-4 font-display text-[1.65rem] leading-none transition-colors duration-300",
                        isActive ? "text-brass-deep" : "text-ink",
                      )}
                      style={{ transitionDelay: open ? `${i * 45 + 60}ms` : "0ms" }}
                    >
                      {item.label}
                      <span className="text-[11px] font-sans tracking-[0.2em] text-muted">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer noopener"
              onClick={close}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[14px] font-medium text-ivory"
            >
              <WhatsAppIcon size={16} />
              Book an Appointment
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              onClick={close}
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 text-[14px] font-medium text-ink"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
