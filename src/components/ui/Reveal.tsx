import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fade-and-rise on scroll — 400ms, 12px travel (§3.3).
 *
 * This is a *server* component: it only stamps a class name. A single
 * `<RevealObserver />` in the root layout watches every `.reveal` on the page
 * with one shared IntersectionObserver, which keeps ~30 reveals per page from
 * becoming ~30 client component instances and ~30 observers.
 *
 * The transition itself lives in globals.css under `.js .reveal`, so content is
 * fully visible without JavaScript and under prefers-reduced-motion.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  /** Stagger in ms. Keep small — this is a trust-driven site. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
