import { cn } from "@/lib/cn";

export type SpinnerSize = "sm" | "md" | "lg";

const SIZE: Record<SpinnerSize, string> = { sm: "size-4", md: "size-5", lg: "size-8" };

export interface SpinnerProps {
  size?: SpinnerSize;
  /**
   * When set, the spinner announces itself (`role="status"`) with this text. Omit it when the spinner sits
   * inside something that already conveys the busy state (e.g. a `Button` with `aria-busy`).
   */
  label?: string;
  className?: string;
}

/** Inline loading indicator. Inherits `currentColor`; stops spinning under reduced motion (globals.css). */
export function Spinner({ size = "md", label, className }: SpinnerProps) {
  const svg = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 animate-spin", SIZE[size], !label && className)}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
  if (!label) return svg;
  return (
    <span role="status" className={cn("inline-flex items-center gap-2", className)}>
      {svg}
      <span className="sr-only">{label}</span>
    </span>
  );
}
