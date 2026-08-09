"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for every `.reveal` on the page, mounted once in the
 * root layout. Re-scans on navigation so client-side route changes pick up the
 * new page's elements.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (element: Element) => element.setAttribute("data-revealed", "true");
    const pending = () => document.querySelectorAll(".reveal:not([data-revealed])");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      pending().forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    pending().forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
