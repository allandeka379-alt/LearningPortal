import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { EntitlementLine } from "./entitlement-summary";

/**
 * What a plan includes, in plain words (§31). Included items first; with `showExcluded`, the rest follow in a quieter
 * "Not included" list so students can see what an upgrade adds. Server component.
 */
export function EntitlementList({ lines, showExcluded = false, className }: { lines: readonly EntitlementLine[]; showExcluded?: boolean; className?: string }) {
  const included = lines.filter((line) => line.included);
  const excluded = lines.filter((line) => !line.included);
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2", className)}>
      <div>
        <h3 className="text-sm font-semibold text-text">Included</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-text">
          {included.map((line) => (
            <li key={line.key} className="flex items-start gap-2">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success-text" />
              <span>{line.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {showExcluded && excluded.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text">Not included</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted">
            {excluded.map((line) => (
              <li key={line.key} className="flex items-start gap-2">
                <Minus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{line.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
