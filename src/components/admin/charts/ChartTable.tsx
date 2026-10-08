import { cn } from "@/lib/cn";

/**
 * The table-view twin every chart ships with (WCAG-clean equivalent; dataviz rule "no tooltip-only values").
 * Collapsed by default inside a native `<details>` so it costs nothing visually and works without JavaScript.
 */
export function ChartTable({
  caption,
  columns,
  rows,
  className,
  summary = "Show data table",
}: {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  className?: string;
  summary?: string;
}) {
  if (rows.length === 0) return null;
  return (
    <details className={cn("group text-sm", className)}>
      <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-control px-1 font-medium text-primary underline-offset-4 hover:underline">
        {summary}
      </summary>
      <div className="relative mt-2 max-h-80 overflow-auto rounded-control border border-border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead className="sticky top-0 bg-subtle">
            <tr>
              {columns.map((column, index) => (
                <th key={column} scope="col" className={cn("px-3 py-2 text-xs font-semibold text-muted uppercase", index > 0 && "text-right")}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row" className="px-3 py-1.5 font-normal text-text">
                      {cell}
                    </th>
                  ) : (
                    <td key={index} className="px-3 py-1.5 text-right text-text tabular-nums">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
