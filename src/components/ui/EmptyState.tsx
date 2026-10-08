import type { ReactNode } from "react";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  /** Decorative icon (e.g. `<Inbox aria-hidden />`). */
  icon?: ReactNode;
  /** Primary next step, e.g. a `ButtonLink` to start practising. */
  action?: ReactNode;
  /** Heading level that fits the page outline. */
  titleAs?: "h2" | "h3" | "p";
  /** Show the chevron motif band above the content. */
  motif?: boolean;
  /** `card` draws its own bordered surface; `plain` sits inside an existing card. */
  appearance?: "card" | "plain";
  className?: string;
}

/**
 * Honest empty state ("No mock exams yet") with a clear next action — what dashboards render instead of invented
 * numbers (rule 6). Server-compatible.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  titleAs = "h2",
  motif = false,
  appearance = "card",
  className,
}: EmptyStateProps) {
  const Title = titleAs;
  return (
    <div
      className={cn(
        "relative flex flex-col items-center overflow-hidden px-6 py-10 text-center",
        appearance === "card" && "rounded-card border border-dashed border-border bg-surface",
        className,
      )}
    >
      {motif && <ChevronPattern variant="band" className="absolute inset-x-0 top-0" opacity={0.35} />}
      {icon && (
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
          {icon}
        </div>
      )}
      <Title className="text-base font-semibold text-text">{title}</Title>
      {description && <div className="mt-1.5 max-w-sm text-sm text-muted">{description}</div>}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
