import { cn } from "@/lib/utils";

/**
 * The three-colour split headline (§6.1): lead and tail in the base colour, the
 * middle phrase in brand green. Rendered as one heading with inline spans so it
 * reads as a single sentence to screen readers and to Google.
 */
export function SplitHeadline({
  as: Tag = "h1",
  lead,
  accent,
  tail,
  className,
  accentClassName = "text-brand",
}: {
  as?: "h1" | "h2";
  lead: string;
  accent: string;
  tail?: string;
  className?: string;
  accentClassName?: string;
}) {
  return (
    <Tag className={cn("font-semibold", className)}>
      {lead} <span className={accentClassName}>{accent}</span>
      {tail ? ` ${tail}` : ""}
    </Tag>
  );
}
