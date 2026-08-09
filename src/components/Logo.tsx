import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/**
 * The brand lockup: red map pin + "REINSTATE" in letterspaced caps with
 * "GOOGLE BUSINESS PROFILE" beneath.
 *
 * Built as live text rather than an image so it stays crisp at any size, remains
 * selectable and readable to assistive tech, and — because the wordmark uses
 * `currentColor` — inverts cleanly on the dark hero and footer. The only file in
 * the asset folder is a 500×500 raster on a green plate, which does neither.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12c0 8.5 10.36 18.86 10.8 19.3a1.7 1.7 0 0 0 2.4 0C13.64 30.86 24 20.5 24 12 24 5.373 18.627 0 12 0Z"
        fill="var(--color-accent-red)"
      />
      <circle cx="12" cy="11.5" r="4.6" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function Logo({
  className,
  size = "md",
  href = "/",
}: {
  className?: string;
  size?: "sm" | "md";
  /** Pass null to render the lockup without wrapping it in a link. */
  href?: string | null;
}) {
  const isSmall = size === "sm";

  const lockup = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={isSmall ? "h-7 w-auto" : "h-9 w-auto"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-bold uppercase leading-none",
            isSmall ? "text-lg tracking-[0.14em]" : "text-xl tracking-[0.16em]",
          )}
        >
          Reinstate
        </span>
        <span
          className={cn(
            "font-semibold uppercase leading-none opacity-80",
            isSmall
              ? "mt-1 text-[8px] tracking-[0.16em]"
              : "mt-1.5 text-[9px] tracking-[0.185em]",
          )}
        >
          Google Business Profile
        </span>
      </span>
    </span>
  );

  if (href === null) return lockup;

  return (
    <Link href={href} aria-label={`${site.name} — home`} className="inline-flex">
      {lockup}
    </Link>
  );
}
