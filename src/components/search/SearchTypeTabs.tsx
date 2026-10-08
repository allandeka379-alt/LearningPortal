import Link from "next/link";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";
import { SEARCH_TABS, type SearchableEntityType, type SearchTabKey } from "./config";

export interface TypeFacet {
  type: SearchableEntityType;
  count: number;
}

/** Results per tab from the service's per-type facet counts (`null` types = all). */
export function tabCount(facets: readonly TypeFacet[], types: readonly SearchableEntityType[] | null): number {
  return facets.filter((facet) => types === null || types.includes(facet.type)).reduce((sum, facet) => sum + facet.count, 0);
}

export interface SearchTypeTabsProps {
  active: SearchTabKey;
  facets: readonly TypeFacet[];
  /** Counting stopped at the service cap: show counts as "N+". */
  countsAreLowerBounds: boolean;
  /** Link for a tab (keeps the query and filters, drops the page cursor). */
  hrefFor: (key: SearchTabKey) => string;
}

/**
 * Result types as links (each view has its own URL, so they are navigation, not ARIA tabs): All, Lessons, Questions,
 * Flashcards, Mock exams & tests, Study packs, Topics, each with its match count. Empty types stay visible but quiet,
 * except that a type with no matches is not a link unless it is the current one. Scrolls sideways inside itself on
 * narrow phones (never the page). Server component.
 */
export function SearchTypeTabs({ active, facets, countsAreLowerBounds, hrefFor }: SearchTypeTabsProps) {
  return (
    <nav aria-label="Result types" className="-mx-4 sm:mx-0">
      <ul className="no-scrollbar relative flex gap-1 overflow-x-auto border-b border-border px-4 sm:px-0">
        {SEARCH_TABS.map((tab) => {
          const count = tabCount(facets, tab.types);
          const current = tab.key === active;
          const countLabel = `${formatNumber(count)}${countsAreLowerBounds && tab.key === "all" ? "+" : ""}`;
          const className = cn(
            "relative inline-flex min-h-11 shrink-0 items-center gap-1.5 px-3 text-sm font-medium whitespace-nowrap",
            "after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full",
            current ? "text-text after:bg-primary" : count === 0 ? "text-muted" : "text-muted hover:text-text",
          );
          const content = (
            <>
              {tab.label}
              <span className={cn("rounded-full px-1.5 text-xs tabular-nums", current ? "bg-primary-soft text-on-primary-soft" : "bg-subtle")}>
                {countLabel}
              </span>
            </>
          );
          return (
            <li key={tab.key} className="shrink-0">
              {count === 0 && !current ? (
                <span className={className}>
                  {content}
                  <span className="sr-only"> (no results)</span>
                </span>
              ) : (
                <Link href={hrefFor(tab.key)} aria-current={current ? "page" : undefined} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
