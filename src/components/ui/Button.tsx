import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "onDark" | "ghost";

const base =
  "btn-label inline-flex items-center justify-center gap-2.5 rounded-button " +
  "px-7 py-4 transition-[background-color,color,border-color,transform] duration-200 " +
  "hover:-translate-y-0.5 active:translate-y-0 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-dark text-white hover:bg-brand",
  onDark: "bg-white text-brand-dark border-2 border-brand-light hover:bg-mint",
  ghost:
    "bg-transparent text-white border-2 border-white/70 hover:border-white hover:bg-white/10",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Trailing arrow icon — on by default (§3.3). */
  withArrow?: boolean;
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = "primary",
  className,
  withArrow = true,
  fullWidth = false,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
      {withArrow ? <ArrowRight aria-hidden="true" className="size-4 shrink-0" /> : null}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  className,
  withArrow = true,
  fullWidth = false,
  href,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
      {withArrow ? <ArrowRight aria-hidden="true" className="size-4 shrink-0" /> : null}
    </Link>
  );
}
