"use client";

import { ChevronDown, ListTree } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { activeTocId, type TocItem } from "./toc";

export interface LessonTocProps {
  items: readonly TocItem[];
  /**
   * `sidebar`: a list beside the lesson (place it in a sticky column on large screens).
   * `compact`: a sticky, collapsible "On this page" bar above the lesson for phones and tablets.
   */
  variant: "sidebar" | "compact";
  className?: string;
}

/** Sticky app header height plus breathing room: a heading above this line counts as "being read". */
const READING_LINE_PX = 120;

/** Tracks the section being read (scroll position, throttled to one measurement per animation frame). */
function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    if (ids.length === 0) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const positions = ids.flatMap((id) => {
        const element = document.getElementById(id);
        return element ? [{ id, top: element.getBoundingClientRect().top }] : [];
      });
      setActive(activeTocId(positions, READING_LINE_PX));
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
}

/**
 * In-lesson table of contents ("On this page", §8). Plain anchor links, so it works without JavaScript; with it, the
 * section being read is highlighted (`aria-current="location"`) and the compact variant closes after a jump. Scrolling
 * follows the reader's reduced-motion setting (global `scroll-behavior`).
 */
export function LessonToc({ items, variant, className }: LessonTocProps) {
  // Stable across re-renders with equal headings (router refreshes pass new arrays); ids never contain "|".
  const key = items.map((item) => item.id).join("|");
  const ids = useMemo(() => (key === "" ? [] : key.split("|")), [key]);
  const active = useActiveSection(ids);
  const headingId = useId();
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  const links = (compact: boolean) => (
    <ol className={cn(compact ? "space-y-0.5 pb-3" : "space-y-0.5 border-l border-border")}>
      {items.map((item) => {
        const current = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current ? "location" : undefined}
              onClick={compact ? () => setOpen(false) : undefined}
              className={cn(
                "block rounded-control leading-snug break-words",
                compact
                  ? cn("flex min-h-11 items-center px-3 py-2 text-sm", item.level === 1 && "pl-7", current ? "bg-primary-soft font-medium text-on-primary-soft" : "text-text hover:bg-subtle")
                  : cn(
                      "-ml-px rounded-none border-l-2 py-1.5 pr-2 text-sm",
                      item.level === 1 ? "pl-6" : "pl-3",
                      current ? "border-primary font-medium text-primary" : "border-transparent text-muted hover:border-border-strong hover:text-text",
                    ),
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "sidebar") {
    return (
      <nav aria-labelledby={headingId} className={cn("text-sm", className)}>
        <h2 id={headingId} className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
          On this page
        </h2>
        {links(false)}
      </nav>
    );
  }

  const activeLabel = items.find((item) => item.id === active)?.label ?? null;
  return (
    <nav
      aria-label="On this page"
      className={cn(
        "sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-10 -mx-4 border-y border-border bg-surface px-4 sm:-mx-6 sm:px-6 print:hidden",
        className,
      )}
    >
      <details className="group" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
        <summary className="flex min-h-11 list-none items-center gap-2 rounded-control text-sm [&::-webkit-details-marker]:hidden">
          <ListTree aria-hidden="true" className="size-4 shrink-0 text-muted" />
          <span className="shrink-0 font-semibold text-text">On this page</span>
          {activeLabel && (
            <span className="min-w-0 truncate text-muted">
              <span aria-hidden="true">· </span>
              {activeLabel}
            </span>
          )}
          <ChevronDown aria-hidden="true" className="ml-auto size-4 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="max-h-[60vh] overflow-y-auto overscroll-contain">{links(true)}</div>
      </details>
    </nav>
  );
}
