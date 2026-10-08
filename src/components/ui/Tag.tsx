import Link from "next/link";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TagProps {
  children: ReactNode;
  /** Makes the tag a link (e.g. a topic tag linking to the topic page). */
  href?: string;
  /** Decorative leading icon. */
  icon?: ReactNode;
  /**
   * Renders a remove button. Only usable from client components (functions can't cross the server boundary).
   * `removeLabel` is required with it, e.g. "Remove Mathematics".
   */
  onRemove?: () => void;
  removeLabel?: string;
  className?: string;
}

const BASE =
  "inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-surface text-sm text-text [&_svg]:size-3.5 [&_svg]:shrink-0";

/**
 * Neutral pill for topics, subjects and filters. Use `Badge` for statuses. Server-compatible unless `onRemove` is
 * used.
 */
export function Tag({ children, href, icon, onRemove, removeLabel, className }: TagProps) {
  const content = (
    <>
      {icon}
      <span className="truncate">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          BASE,
          "relative min-h-8 px-3 py-1 transition-colors after:absolute after:inset-x-0 after:-inset-y-1.5 hover:border-border-strong hover:bg-subtle",
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={cn(BASE, "min-h-8 py-1 pl-3", onRemove ? "pr-1" : "pr-3", className)}>
      {content}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ?? "Remove"}
          className="relative -my-1 inline-flex size-7 items-center justify-center rounded-full text-muted after:absolute after:-inset-2 hover:bg-subtle hover:text-text"
        >
          <X aria-hidden="true" />
        </button>
      )}
    </span>
  );
}
