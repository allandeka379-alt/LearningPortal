import { CircleDot, Lock, Timer } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { formatCount, formatPercent } from "@/lib/format";
import type { ExamListItem } from "@/server/exams/service";
import { durationText } from "./labels";

/** The short access line of a catalogue card (pure; tested). */
export function accessSummary(access: ExamListItem["access"]): { text: string; locked: boolean } | null {
  switch (access.status) {
    case "AVAILABLE":
      return access.allowance ? { text: `${access.allowance.remaining} of ${access.allowance.limit} ${access.allowance.label}`, locked: false } : null;
    case "IN_PROGRESS":
      return { text: "You started this test. Continue where you left off.", locked: false };
    default:
      return { text: access.message, locked: true };
  }
}

/**
 * One assessment in the exams catalogue (§12): kind, subject, title, duration, questions, marks, topics, the student's
 * best score and what the plan allows. The whole card opens the instructions page (stretched link); a locked test
 * still opens it, where the upgrade prompt explains why. Server component.
 */
export function AssessmentCard({ item, showSubject }: { item: ExamListItem; showSubject: boolean }) {
  const access = accessSummary(item.access);
  const inProgress = item.access.status === "IN_PROGRESS";
  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              {item.kindLabel}
              {showSubject ? ` · ${item.subject.name}` : ""}
            </p>
            <h3 className="text-base font-semibold text-text">
              <Link
                href={`/app/exams/${item.id}`}
                className="rounded-control break-words after:absolute after:inset-0 after:rounded-card focus-visible:outline-none"
              >
                {item.title}
              </Link>
            </h3>
          </div>
          {inProgress ? (
            <Badge tone="info" icon={<CircleDot aria-hidden="true" />}>
              In progress
            </Badge>
          ) : access?.locked ? (
            <Badge tone="neutral" icon={<Lock aria-hidden="true" />}>
              Locked
            </Badge>
          ) : null}
        </div>
        {item.description && <p className="line-clamp-2 text-sm text-muted">{item.description}</p>}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <li className="inline-flex items-center gap-1.5">
            <Timer aria-hidden="true" className="size-4" />
            {durationText(item.timeLimitSeconds, item.timedPaperCount)}
          </li>
          <li>{formatCount(item.questionCount, "question")}</li>
          <li>{formatCount(item.totalMarks, "mark")}</li>
        </ul>
        {item.topics.length > 0 && <p className="text-sm text-text">Covers: {item.topics.join(", ")}</p>}
        <div className="mt-auto space-y-1 pt-1 text-sm">
          {item.bestPercent !== null && (
            <p className="text-text">
              Your best: <span className="font-semibold tabular-nums">{formatPercent(item.bestPercent)}</span>
              <span className="text-muted"> · {formatCount(item.attemptsUsed, "attempt")}</span>
            </p>
          )}
          {item.bestPercent === null && item.attemptsUsed === 0 && <p className="text-muted">Not taken yet</p>}
          {access && <p className={access.locked ? "text-muted" : "text-text"}>{access.text}</p>}
        </div>
      </CardBody>
    </Card>
  );
}
