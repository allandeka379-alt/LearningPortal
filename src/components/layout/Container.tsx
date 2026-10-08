import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const SIZES = {
  /** ~65 characters per line: lessons, articles, forms. */
  reading: "max-w-reading",
  /** Standard app/marketing page width. */
  default: "max-w-page",
  /** Dense admin tables and analytics. */
  wide: "max-w-[90rem]",
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof SIZES;

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: ContainerSize;
  as?: "div" | "section" | "header" | "footer" | "article";
}

/** Centred page column with the responsive side gutters (16px on phones → 32px on desktop). */
export function Container({ size = "default", as = "div", className, ...props }: ContainerProps) {
  const Component = as as "div";
  return <Component className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", SIZES[size], className)} {...props} />;
}
