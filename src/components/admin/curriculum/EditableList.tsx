import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A list of small records where each row expands (native `<details>`, no JavaScript) into its edit form. Used for
 * short lookup tables (levels, year groups, categories, papers, routes). Server component.
 */

export interface EditableRow {
  id: string;
  /** Main line (name). */
  title: ReactNode;
  /** Secondary facts (codes, counts, badges). */
  meta?: ReactNode;
  /** The edit form; omit for read-only rows. */
  editor?: ReactNode;
  /** Label of the expander, e.g. "Edit Form 4". */
  editLabel?: string;
}

export function EditableList({ rows, empty, className }: { rows: readonly EditableRow[]; empty: ReactNode; className?: string }) {
  if (rows.length === 0) return <>{empty}</>;
  return (
    <ul className={cn("divide-y divide-border rounded-card border border-border bg-surface", className)}>
      {rows.map((row) => (
        <li key={row.id} className="px-4 py-3">
          {row.editor ? (
            <details className="group">
              <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center justify-between gap-2 rounded-control [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block font-medium text-text">{row.title}</span>
                  {row.meta && <span className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted">{row.meta}</span>}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  <span className="group-open:hidden">{row.editLabel ?? "Edit"}</span>
                  <span className="hidden group-open:inline">Close</span>
                  <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </span>
              </summary>
              <div className="mt-3 border-t border-border pt-4">{row.editor}</div>
            </details>
          ) : (
            <div className="min-h-11">
              <span className="block font-medium text-text">{row.title}</span>
              {row.meta && <span className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted">{row.meta}</span>}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
