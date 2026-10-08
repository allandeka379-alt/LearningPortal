import { Archive, Camera, ScanSearch } from "lucide-react";
import Link from "next/link";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/button-styles";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { SolveSummary } from "@/server/solver/types";
import { modeLabel, outcomeLabel } from "./labels";

export interface SolveHistoryProps {
  items: readonly SolveSummary[];
  timeZone: string;
  /** Server Action archiving `solveId` (form field). */
  archiveAction: (formData: FormData) => Promise<void>;
  /** Hide the empty state (e.g. on a later page, or when the form is not offered). */
  emptyState?: boolean;
}

/** The student's past solves (private): title, subject · topic, mode, date, and a remove-from-history control. */
export function SolveHistory({ items, timeZone, archiveAction, emptyState = true }: SolveHistoryProps) {
  if (items.length === 0) {
    return emptyState ? (
      <EmptyState
        icon={<ScanSearch aria-hidden="true" />}
        title="No questions yet"
        description="Questions you ask the solver appear here, so you can look back at the steps later."
      />
    ) : null;
  }
  return (
    <ul className="space-y-3" aria-label="Your past questions">
      {items.map((item) => {
        const title = item.title ?? "Question";
        const context = [item.subjectName, item.topicName && item.topicName !== title ? item.topicName : null].filter(Boolean).join(" · ");
        const status = outcomeLabel(item.outcome);
        return (
          <Card as="li" key={item.id} interactive className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <Link href={`/app/solver/${item.id}`} className="block font-semibold text-text after:absolute after:inset-0 hover:text-primary">
                <span className="line-clamp-2 break-words">{title}</span>
              </Link>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                {item.hasPhoto && (
                  <span className="inline-flex items-center gap-1">
                    <Camera aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">Photo question.</span>
                  </span>
                )}
                {context && <span>{context}</span>}
                <span>{formatInstantDate(item.createdAt, timeZone, "medium")}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge size="sm" tone={item.mode === "ANSWER" ? "neutral" : "primary"}>
                  {modeLabel(item.mode)}
                </Badge>
                {status && (
                  <Badge size="sm" tone="warning">
                    {status}
                  </Badge>
                )}
              </div>
            </div>
            <form action={archiveAction} className="relative z-10 shrink-0">
              <input type="hidden" name="solveId" value={item.id} />
              <button type="submit" aria-label={`Remove "${title}" from your history`} className={buttonStyles({ variant: "ghost", iconOnly: true })}>
                <Archive aria-hidden="true" />
              </button>
            </form>
          </Card>
        );
      })}
    </ul>
  );
}
