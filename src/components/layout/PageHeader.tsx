import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/cn";

export interface PageHeaderProps {
  /** The page's single `<h1>`. */
  title: ReactNode;
  description?: ReactNode;
  /** Small context line above the title, e.g. "ZIMSEC · O-Level" (from data). */
  eyebrow?: ReactNode;
  breadcrumbs?: readonly BreadcrumbItem[];
  /** Page-level actions; they stack under the title on phones. */
  actions?: ReactNode;
  className?: string;
}

/** Standard page heading block: breadcrumbs, eyebrow, h1, description and actions. Server component. */
export function PageHeader({ title, description, eyebrow, breadcrumbs, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-3 pt-6 pb-6 sm:pt-8", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
          <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{title}</h1>
          {description && <div className="max-w-2xl text-base text-muted">{description}</div>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
