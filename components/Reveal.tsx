"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Extra classes for the wrapper element. */
  className?: string;
  /** Delay in milliseconds before the element animates in. */
  delay?: number;
  /** How far the element travels, in pixels. */
  distance?: number;
};

/**
 * Fades and lifts its children into view the first time they scroll in.
 *
 * Accessibility notes:
 *  - `prefers-reduced-motion: reduce` is handled entirely in CSS, which
 *    forces revealed content visible with no transition. This component
 *    therefore does not need to observe anything in that case.
 *  - If JavaScript never runs, a <noscript> rule in the layout makes
 *    revealed content visible too. Content is never trapped behind an
 *    effect that might fail.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: the stylesheet reveals everything immediately,
    // so there is nothing to observe and nothing to set up.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    ...(shown ? null : { "--reveal-y": `${distance}px` }),
  } as CSSProperties;

  return (
    <div ref={ref} style={style} className={cn("reveal", shown && "is-visible", className)}>
      {children}
    </div>
  );
}
