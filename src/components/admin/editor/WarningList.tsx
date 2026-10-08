import { TriangleAlert } from "lucide-react";
import type { ContentWarning } from "@/lib/content/types";
import { cn } from "@/lib/cn";
import { BLOCKING_WARNING_CODES, WARNING_LABELS } from "./types";

/**
 * Authoring warnings from the content renderer (docs/CONTENT_AUTHORING.md §7), e.g. an image without alt text or
 * invalid LaTeX. Blocking ones are marked ("Must fix") because they stop the item from entering review. With
 * `onJump`, each line number is a button that moves the editor caret there. Server- and client-compatible.
 */
export function WarningList({
  warnings,
  onJump,
  className,
  title = "Preview warnings",
}: {
  warnings: readonly ContentWarning[];
  onJump?: (line: number) => void;
  className?: string;
  title?: string;
}) {
  if (warnings.length === 0) return null;
  return (
    <section aria-label={title} className={cn("rounded-control border border-warning/40 bg-warning-soft p-3 text-sm", className)}>
      <h3 className="mb-2 flex items-center gap-1.5 font-semibold text-warning-text">
        <TriangleAlert aria-hidden="true" className="size-4" />
        {title} ({warnings.length})
      </h3>
      <ul className="space-y-1.5">
        {warnings.map((warning, index) => (
          <li key={`${warning.code}-${warning.line ?? "x"}-${index}`} className="flex flex-wrap items-baseline gap-x-2 text-text">
            <span className="font-medium">{WARNING_LABELS[warning.code] ?? warning.code}</span>
            {BLOCKING_WARNING_CODES.has(warning.code) && (
              <span className="rounded-sm bg-danger-soft px-1.5 text-xs font-semibold text-danger-text">Must fix</span>
            )}
            {warning.line !== undefined &&
              (onJump ? (
                <button
                  type="button"
                  className="text-xs font-medium text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={() => onJump(warning.line as number)}
                >
                  Line {warning.line}
                </button>
              ) : (
                <span className="text-xs text-muted">Line {warning.line}</span>
              ))}
            <span className="basis-full text-muted">{warning.message}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
