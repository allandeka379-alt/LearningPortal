import { cloneElement, isValidElement, useId, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface TooltipProps {
  /** Supplementary text. Never put essential information only here (touch devices have no hover). */
  content: string;
  /** A single focusable element with its own accessible name (button, link). */
  children: ReactElement<{ "aria-describedby"?: string }>;
  side?: "top" | "bottom";
  className?: string;
}

/**
 * CSS-only tooltip: shown on hover and keyboard focus, linked with `aria-describedby`, no JavaScript shipped.
 * Trade-off: it can't be dismissed with Escape (WCAG 1.4.13); it is small, never covers the trigger, and
 * disappears on blur. Use it for hints only.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  const trigger = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": [children.props["aria-describedby"], id].filter(Boolean).join(" "),
      })
    : children;

  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {trigger}
      <span
        role="tooltip"
        id={id}
        className={cn(
          // `hidden` (display:none) rather than `invisible` so a hidden tooltip near the screen edge can't create
          // horizontal scroll on phones. aria-describedby still resolves hidden content.
          "pointer-events-none absolute left-1/2 z-50 hidden w-max max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md bg-text px-2.5 py-1.5 text-center text-xs font-medium text-bg shadow-md",
          "group-hover/tooltip:block group-focus-within/tooltip:block",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
        )}
      >
        {content}
      </span>
    </span>
  );
}
