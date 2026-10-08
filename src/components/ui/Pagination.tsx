import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { buttonStyles } from "./button-styles";

export interface PaginationProps {
  /** Link to the previous page/cursor, or null/undefined on the first page. */
  prevHref?: string | null;
  /** Link to the next page/cursor, or null/undefined on the last page. */
  nextHref?: string | null;
  /** Optional status text between the buttons, e.g. "Showing 21–40". Keep it honest: omit totals you don't know. */
  summary?: ReactNode;
  /** Accessible name for the navigation landmark; make it specific when a page has several. */
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}

/**
 * Previous/next pagination built from plain links, so it works with cursor-based lists (rule 11) and without
 * JavaScript. Unavailable directions render as disabled, non-focusable placeholders to keep the layout stable.
 */
export function Pagination({
  prevHref,
  nextHref,
  summary,
  label = "Pagination",
  prevLabel = "Previous",
  nextLabel = "Next",
  className,
}: PaginationProps) {
  if (!prevHref && !nextHref) return null;
  const linkClass = buttonStyles({ variant: "outline", size: "md" });
  const disabledClass = cn(linkClass, "pointer-events-none opacity-45");
  return (
    <nav aria-label={label} className={cn("flex items-center justify-between gap-3", className)}>
      {prevHref ? (
        <Link href={prevHref} rel="prev" className={linkClass}>
          <ChevronLeft aria-hidden="true" />
          {prevLabel}
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          <ChevronLeft aria-hidden="true" />
          {prevLabel}
        </span>
      )}
      {summary && <p className="min-w-0 truncate text-center text-sm text-muted tabular-nums">{summary}</p>}
      {nextHref ? (
        <Link href={nextHref} rel="next" className={linkClass}>
          {nextLabel}
          <ChevronRight aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          {nextLabel}
          <ChevronRight aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
