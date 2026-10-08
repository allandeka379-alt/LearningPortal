import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { DiffEntry, DisplayLine } from "@/server/cms/review/diff";

/**
 * Readable field-level diff (review queue, revision history): one row per changed field; long or multi-line values
 * are shown line by line with + / − markers (never colour alone), short values as "before → after". Text is rendered
 * as escaped plain text (it is markdown source), never as HTML. Server component.
 */

const CHANGE_META: Readonly<Record<DiffEntry["change"], { label: string; tone: "success" | "danger" | "info" }>> = {
  added: { label: "Added", tone: "success" },
  removed: { label: "Removed", tone: "danger" },
  changed: { label: "Changed", tone: "info" },
};

function Lines({ lines }: { lines: readonly DisplayLine[] }) {
  return (
    <div className="max-h-[32rem] overflow-auto rounded-control border border-border bg-surface font-mono text-xs leading-relaxed" tabIndex={0}>
      <ol className="min-w-max">
        {lines.map((line, index) => {
          if (line.kind === "skip") {
            return (
              <li key={`skip-${index}`} className="bg-subtle px-3 py-1 text-muted italic">
                … {line.count} unchanged line{line.count === 1 ? "" : "s"} …
              </li>
            );
          }
          const marker = line.kind === "add" ? "+" : line.kind === "del" ? "−" : " ";
          return (
            <li
              key={`${line.kind}-${index}`}
              className={cn(
                "flex gap-3 px-3 whitespace-pre",
                line.kind === "add" && "bg-success-soft text-success-text",
                line.kind === "del" && "bg-danger-soft text-danger-text",
                line.kind === "same" && "text-text",
              )}
            >
              <span aria-hidden="true" className="w-3 shrink-0 select-none">
                {marker}
              </span>
              <span className="sr-only">{line.kind === "add" ? "Added: " : line.kind === "del" ? "Removed: " : ""}</span>
              <span>{line.text === "" ? " " : line.text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Value({ value, emphasis }: { value: string | null; emphasis: "before" | "after" }) {
  if (value === null) return <span className="text-muted italic">(empty)</span>;
  return <span className={cn("break-words whitespace-pre-wrap", emphasis === "before" ? "text-danger-text line-through decoration-1" : "text-success-text")}>{value}</span>;
}

export function DiffView({ entries, emptyLabel = "No content changes." }: { entries: readonly DiffEntry[]; emptyLabel?: string }) {
  if (entries.length === 0) return <p className="text-sm text-muted">{emptyLabel}</p>;
  return (
    <ul className="space-y-4">
      {entries.map((entry) => {
        const meta = CHANGE_META[entry.change];
        return (
          <li key={entry.path} className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-text">{entry.label}</h3>
              <Badge tone={meta.tone} size="sm">
                {meta.label}
              </Badge>
            </div>
            {entry.lines ? (
              <Lines lines={entry.lines} />
            ) : (
              <div className="grid gap-2 rounded-control border border-border p-3 text-sm sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">Before</p>
                  <Value value={entry.before} emphasis="before" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">After</p>
                  <Value value={entry.after} emphasis="after" />
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
