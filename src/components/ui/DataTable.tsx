import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EmptyState } from "./EmptyState";

export interface DataTableColumn<Row> {
  /** Stable column key. */
  key: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  align?: "start" | "end" | "center";
  /** Rendered as the card title on mobile (no inline header label). Usually the name column. */
  primary?: boolean;
  /** Hide this column on mobile cards (keep cards short). */
  hideOnMobile?: boolean;
  className?: string;
}

export interface DataTableProps<Row> {
  columns: readonly DataTableColumn<Row>[];
  rows: readonly Row[];
  rowKey: (row: Row) => string;
  /** Required accessible table caption (describe what the rows are). */
  caption: string;
  captionHidden?: boolean;
  /** Shown instead of the table when `rows` is empty. Defaults to a generic honest empty state. */
  empty?: ReactNode;
  className?: string;
}

const ALIGN = { start: "md:text-left", end: "md:text-right", center: "md:text-center" } as const;

/**
 * Responsive data table. One DOM for both layouts (no duplicated markup on slow connections): a real table from
 * `md` up, stacked cards below it. Explicit ARIA table roles keep the semantics when CSS changes the display type
 * (some browsers drop implicit table semantics for `display: block`). On mobile each cell shows its column header
 * as a visual label (`aria-hidden`, since screen readers already announce the column header).
 *
 * Paginate upstream (rule 11) — this renders what it's given. Server-compatible; `cell` functions run on the
 * server when used from a Server Component.
 */
export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  caption,
  captionHidden = true,
  empty,
  className,
}: DataTableProps<Row>) {
  if (rows.length === 0) {
    return <>{empty ?? <EmptyState title="Nothing to show yet" titleAs="p" className={className} />}</>;
  }

  return (
    <div className={cn("relative rounded-card border border-border bg-surface md:overflow-x-auto", className)}>
      <table role="table" className="block w-full text-sm md:table md:border-collapse">
        <caption className={cn(captionHidden ? "sr-only" : "px-4 pt-4 text-left text-base font-semibold text-text")}>
          {caption}
        </caption>
        <thead role="rowgroup" className="sr-only md:not-sr-only md:table-header-group">
          <tr role="row" className="md:border-b md:border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                role="columnheader"
                scope="col"
                className={cn(
                  "px-4 py-3 text-xs font-semibold tracking-wide whitespace-nowrap text-muted uppercase",
                  ALIGN[column.align ?? "start"],
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup" className="block divide-y divide-border md:table-row-group">
          {rows.map((row) => (
            <tr key={rowKey(row)} role="row" className="block space-y-2 px-4 py-4 md:table-row md:space-y-0 md:p-0 md:hover:bg-subtle/60">
              {columns.map((column) => (
                <td
                  key={column.key}
                  role="cell"
                  className={cn(
                    "md:table-cell md:px-4 md:py-3 md:align-middle",
                    column.primary ? "block text-base font-semibold text-text md:text-sm" : "flex items-start justify-between gap-4 text-text",
                    column.hideOnMobile && "hidden",
                    ALIGN[column.align ?? "start"],
                    column.className,
                  )}
                >
                  {!column.primary && (
                    <span aria-hidden="true" className="shrink-0 text-muted md:hidden">
                      {column.header}
                    </span>
                  )}
                  <span className={cn("min-w-0", !column.primary && "max-md:text-right")}>{column.cell(row)}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
