import { Pagination } from "@/components/ui/Pagination";
import { hrefWith, type PageSearchParams } from "./search-params";

export interface CursorPaginationProps {
  /** List path, e.g. "/admin/users". */
  path: string;
  /** Current search params (filters are kept, the cursor is replaced). */
  params: PageSearchParams | undefined;
  /** Opaque cursor of the next page from the service, `null` on the last page. */
  nextCursor: string | null;
  /** Name of the cursor param (default "cursor"). */
  cursorParam?: string;
  /** Number of rows on this page, for the honest summary ("Showing 25"). Totals are never guessed. */
  shownCount: number;
  label?: string;
  className?: string;
}

/**
 * Keyset (cursor) pagination for admin lists (rule 11): "First page" and "Next" as plain links. There is no total
 * count and no page numbers, because counting a large table on every view is what keyset pagination avoids.
 */
export function CursorPagination({
  path,
  params,
  nextCursor,
  cursorParam = "cursor",
  shownCount,
  label = "Pages",
  className,
}: CursorPaginationProps) {
  const onFirstPage = !params?.[cursorParam];
  return (
    <Pagination
      className={className}
      label={label}
      prevLabel="First page"
      prevHref={onFirstPage ? null : hrefWith(path, params, { [cursorParam]: null })}
      nextHref={nextCursor ? hrefWith(path, params, { [cursorParam]: nextCursor }) : null}
      summary={`Showing ${shownCount} ${shownCount === 1 ? "row" : "rows"}${onFirstPage ? "" : " (later page)"}`}
    />
  );
}
