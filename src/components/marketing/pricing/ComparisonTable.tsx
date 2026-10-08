import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ComparisonGroup } from "@/server/marketing/plan-features";
import { INCLUDED_TEXT, NOT_INCLUDED_TEXT } from "@/server/marketing/plan-features";

export interface ComparisonTableProps {
  /** Column headings, in the same order as each row's cells. */
  plans: readonly { id: string; name: string }[];
  groups: readonly ComparisonGroup[];
  caption: string;
  className?: string;
}

function Cell({ included, text }: { included: boolean; text: string }) {
  if (text === INCLUDED_TEXT) {
    return (
      <>
        <Check aria-hidden="true" className="mx-auto size-5 text-primary" />
        <span className="sr-only">{INCLUDED_TEXT}</span>
      </>
    );
  }
  if (!included || text === NOT_INCLUDED_TEXT) {
    return (
      <>
        <Minus aria-hidden="true" className="mx-auto size-4 text-border-strong" />
        <span className="sr-only">{NOT_INCLUDED_TEXT}</span>
      </>
    );
  }
  return <span className="text-xs font-medium text-text sm:text-sm">{text}</span>;
}

/**
 * Plan feature comparison generated from the plans' entitlements (§31; labels in `server/marketing/plan-features`).
 * A real table (row and column headers) for screen readers; the feature column sticks while the plan columns scroll
 * inside the table's own container on very narrow screens, never the page.
 */
export function ComparisonTable({ plans, groups, caption, className }: ComparisonTableProps) {
  if (plans.length === 0 || groups.length === 0) return null;
  return (
    <div className={cn("relative overflow-x-auto rounded-card border border-border bg-surface", className)}>
      <table className="w-full min-w-[20rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 z-10 bg-surface px-3 py-3 text-sm font-semibold text-muted sm:px-5">
              Feature
            </th>
            {plans.map((plan) => (
              <th key={plan.id} scope="col" className="px-2 py-3 text-center text-sm font-bold text-text sm:px-4">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.group}>
            <tr className="bg-subtle">
              <th scope="colgroup" colSpan={plans.length + 1} className="sticky left-0 px-3 py-2 text-xs font-semibold tracking-wide text-muted uppercase sm:px-5">
                {group.group}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.key} className="border-t border-border">
                <th scope="row" className="sticky left-0 z-10 bg-surface px-3 py-3 text-sm font-medium text-text sm:px-5">
                  {row.label}
                </th>
                {row.cells.map((cell, index) => (
                  <td key={plans[index]?.id ?? index} className="px-2 py-3 text-center align-middle sm:px-4">
                    <Cell included={cell.included} text={cell.text} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
