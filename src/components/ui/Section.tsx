import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Page section with the standard vertical rhythm (96px desktop / 64px mobile)
 * and the alternating background sequence from §3.3.
 */
export function Section({
  id,
  tone = "white",
  className,
  containerClassName,
  bleed = false,
  children,
}: {
  id?: string;
  tone?: "white" | "surface" | "mint" | "mint-pale" | "navy";
  className?: string;
  containerClassName?: string;
  /** Skip the inner container — the section manages its own layout. */
  bleed?: boolean;
  children: ReactNode;
}) {
  const tones = {
    white: "bg-white",
    surface: "bg-surface",
    mint: "bg-mint",
    "mint-pale": "bg-mint-pale",
    navy: "bg-navy text-white",
  } as const;

  return (
    <section id={id} className={cn("section-y", tones[tone], className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
