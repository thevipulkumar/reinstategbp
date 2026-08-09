"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `to` when scrolled into view.
 *
 * Renders the final value on the server and on first paint, so the statistic is
 * correct for crawlers, for no-JS visitors and under reduced-motion. The count
 * only starts once the element intersects, and the panel sits well below the
 * fold, so the pre-animation value is not seen in practice.
 */
export function CountUp({
  to,
  suffix = "",
  duration = 900,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") return;

    let frame = 0;

    const run = () => {
      started.current = true;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        // Ease-out — matches the motion language in §3.3, no bounce.
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * to));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      setValue(0);
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
