import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (normally the last item). */
  href?: string;
}

export interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb trail (`<nav aria-label="Breadcrumb">` + ordered list). The last item is marked
 * `aria-current="page"`. Items wrap instead of scrolling horizontally on narrow screens; long names truncate.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="-my-3 flex flex-wrap items-center gap-x-1 text-sm text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 max-w-[14rem] min-w-11 items-center rounded-sm underline-offset-4 hover:text-text hover:underline"
                >
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn("max-w-[16rem] truncate", isLast && "font-medium text-text")}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
