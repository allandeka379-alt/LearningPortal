import { ArrowRight, BookOpen, Compass, Layers, PenLine, RotateCcw, Timer } from "lucide-react";
import type { ReactNode } from "react";
import type { FormAction } from "@/components/student/action-state";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { PlanItemView } from "@/server/studyplan/service";
import { PlanItemActions } from "./PlanItemActions";
import { isOpenItem, planItemEyebrow, planItemHref, planItemReason, planItemSize, planItemStatus, planItemTitle } from "./plan-copy";

const ACTIVITY_ICONS: Readonly<Record<string, ReactNode>> = {
  LESSON: <BookOpen aria-hidden="true" />,
  PRACTICE: <PenLine aria-hidden="true" />,
  TEST: <PenLine aria-hidden="true" />,
  REVIEW: <RotateCcw aria-hidden="true" />,
  FLASHCARDS: <Layers aria-hidden="true" />,
  MOCK_EXAM: <Timer aria-hidden="true" />,
  DIAGNOSTIC: <Compass aria-hidden="true" />,
};

export interface PlanItemRowProps {
  item: PlanItemView;
  /** Show Start / Done / Skip / Undo (false for a read-only copy of the item). */
  interactive: boolean;
  itemAction: FormAction;
}

/**
 * One planned session (§16, §6 "Mathematics / Quadratic Equations / 20 questions"): what, how long, why, its status,
 * and the way in. Server component; only the tick buttons are a client leaf.
 */
export function PlanItemRow({ item, interactive, itemAction }: PlanItemRowProps) {
  const title = planItemTitle(item);
  const status = planItemStatus(item);
  const open = isOpenItem(item.status);
  const finished = item.status === "DONE" || item.status === "SKIPPED";
  const verb = item.status === "PARTIAL" ? "Continue" : "Start";
  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-1 gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-4.5",
            item.status === "DONE" ? "bg-success-soft text-success-text" : "bg-primary-soft text-on-primary-soft",
          )}
        >
          {ACTIVITY_ICONS[item.activityType] ?? <PenLine aria-hidden="true" />}
        </span>
        <div className="min-w-0 space-y-0.5">
          <p className="text-xs font-medium text-muted">{planItemEyebrow(item)}</p>
          <p className={cn("text-sm font-semibold break-words", finished ? "text-muted" : "text-text")}>
            {title}
            {item.status === "SKIPPED" && <span className="sr-only"> (skipped)</span>}
          </p>
          <p className="text-xs text-muted">{planItemSize(item)}</p>
          <p className="text-xs text-muted">{planItemReason(item)}</p>
          {status && (
            <div className="pt-1">
              <Badge tone={status.tone} size="sm">
                {status.label}
              </Badge>
            </div>
          )}
        </div>
      </div>
      {interactive && (
        <div className="flex flex-wrap items-start gap-2 pl-12 sm:pl-0">
          {open && (
            <ButtonLink href={planItemHref(item)} variant="primary" iconEnd={<ArrowRight aria-hidden="true" />} aria-label={`${verb}: ${title}`}>
              {verb}
            </ButtonLink>
          )}
          <PlanItemActions itemId={item.id} status={item.status} itemTitle={title} action={itemAction} />
        </div>
      )}
    </li>
  );
}
