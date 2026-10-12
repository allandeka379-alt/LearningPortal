"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { getActiveNavHref } from "./nav-active";
import type { ResolvedNavItem } from "./nav-types";

export type ActiveNavVariant = "sidebar" | "dense" | "tabbar" | "inline";

const LIST: Record<ActiveNavVariant, string> = {
  sidebar: "flex flex-col gap-0.5",
  dense: "flex flex-col gap-px",
  tabbar: "flex items-stretch",
  inline: "flex items-center gap-1",
};

const LINK: Record<ActiveNavVariant, string> = {
  sidebar:
    "flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium text-muted transition-colors hover:bg-subtle hover:text-text aria-[current=page]:bg-primary-soft aria-[current=page]:text-on-primary-soft [&_svg]:size-5 [&_svg]:shrink-0",
  dense:
    "flex min-h-11 items-center gap-2.5 rounded-md px-2.5 lg:pointer-fine:min-h-9 text-sm text-muted transition-colors hover:bg-subtle hover:text-text aria-[current=page]:bg-primary-soft aria-[current=page]:font-medium aria-[current=page]:text-on-primary-soft [&_svg]:size-4 [&_svg]:shrink-0",
  tabbar:
    "relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-xs font-medium text-muted transition-colors hover:text-text aria-[current=page]:text-primary [&_svg]:size-5 before:absolute before:inset-x-4 before:top-0 before:h-0.5 before:rounded-b-full aria-[current=page]:before:bg-primary",
  inline:
    "inline-flex min-h-10 items-center rounded-control px-3 text-sm font-medium text-muted transition-colors hover:bg-subtle hover:text-text aria-[current=page]:text-text",
};

export interface ActiveNavListProps {
  items: readonly ResolvedNavItem[];
  variant: ActiveNavVariant;
  /** Labels a list inside a section (`aria-labelledby` of the section heading). */
  labelledBy?: string;
  className?: string;
}

/**
 * Renders nav links and marks the current one with `aria-current="page"` (styled via the attribute, so the
 * semantics and the visual state can't diverge). The only client-side part of the shells: it needs the pathname.
 */
export function ActiveNavList({ items, variant, labelledBy, className }: ActiveNavListProps) {
  // usePathname() can be null outside the App Router (e.g. pages-router fallbacks); treat that as "no match".
  const pathname: string | null = usePathname();
  const baseId = useId();
  // One active entry across all groups (the longest match over the whole list).
  const activeHref = pathname === null ? null : getActiveNavHref(pathname, items);
  const grouped = variant !== "tabbar" && variant !== "inline" && items.some((item) => item.group !== undefined);

  if (!grouped) return <NavLinks items={items} variant={variant} activeHref={activeHref} labelledBy={labelledBy} className={className} />;

  // Consecutive items of one group render under its heading; ungrouped items lead without a heading.
  const groups: { title: string | undefined; items: ResolvedNavItem[] }[] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (last && last.title === item.group) last.items.push(item);
    else groups.push({ title: item.group, items: [item] });
  }
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {groups.map((group, index) => {
        const headingId = group.title ? `${baseId}-group-${index}` : undefined;
        return (
          <div key={`${group.title ?? "main"}-${index}`}>
            {group.title && (
              <p id={headingId} className="px-3 pb-1 text-xs font-semibold tracking-wide text-muted uppercase">
                {group.title}
              </p>
            )}
            <NavLinks items={group.items} variant={variant} activeHref={activeHref} labelledBy={headingId ?? labelledBy} />
          </div>
        );
      })}
    </div>
  );
}

function NavLinks({
  items,
  variant,
  activeHref,
  labelledBy,
  className,
}: {
  items: readonly ResolvedNavItem[];
  variant: ActiveNavVariant;
  activeHref: string | null;
  labelledBy?: string;
  className?: string;
}) {
  return (
    <ul aria-labelledby={labelledBy} className={cn(LIST[variant], className)}>
      {items.map((item) => (
        <li key={item.href} className={variant === "tabbar" ? "min-w-0 flex-1" : undefined}>
          <Link
            href={item.href}
            aria-current={item.href === activeHref ? "page" : undefined}
            className={LINK[variant]}
          >
            {variant !== "inline" && item.icon}
            {/* Tab bar cells are a fifth of a 360px screen: at the largest text size (§43) labels wrap onto a second
                line instead of being cut to "Study pl…"; elsewhere the column scales with rem and truncation stays. */}
            <span
              className={cn(
                "min-w-0",
                variant === "tabbar" ? "line-clamp-2 max-w-full text-center leading-tight hyphens-auto [overflow-wrap:anywhere]" : "flex-1 truncate",
              )}
            >
              {item.label}
            </span>
            {item.badge !== undefined && variant !== "inline" && (
              <span
                className={cn(
                  "rounded-full bg-accent-soft font-semibold text-on-accent-soft tabular-nums",
                  variant === "tabbar" ? "absolute top-1.5 left-1/2 ml-2 px-1.5 text-[0.6875rem] leading-4" : "px-2 text-xs leading-5",
                )}
              >
                {formatNumber(item.badge, { compact: true })}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
