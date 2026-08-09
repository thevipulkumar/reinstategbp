import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 1140px content column with 24px gutters (§3.3). */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}
