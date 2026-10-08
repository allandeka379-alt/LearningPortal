"use client";

import { ArrowLeft, Flag, LogOut, Send } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatCount } from "@/lib/format";
import type { AnswerSummary } from "./exam-model";
import { ShortcutHelp } from "./ShortcutHelp";

export interface ReviewPaper {
  sectionNumber: number;
  title: string;
  statusLabel: string;
  answered: number;
  total: number;
  /** The paper is running and may be finished early. */
  canFinish: boolean;
  /** The paper has not started yet (open it to start it). */
  firstPosition: number | null;
  notStarted: boolean;
}

export interface ReviewScreenProps {
  summary: AnswerSummary;
  papers: readonly ReviewPaper[];
  backPosition: number;
  onJump: (position: number) => void;
  onBack: () => void;
  onSubmit: () => void;
  onFinishPaper: (sectionNumber: number) => void;
  onLeave: () => void;
  leaving: boolean;
  submitDisabled: boolean;
  /** The question grid (shown here on phones; desktop has it in the side panel). */
  navigator: ReactNode;
  saveStatus: ReactNode;
  /** What is being submitted, in running text ("exam", "diagnostic"). Default "exam". */
  noun?: string;
}

function PositionLinks({ positions, onJump, empty }: { positions: readonly number[]; onJump: (position: number) => void; empty: string }) {
  if (positions.length === 0) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <ul className="flex flex-wrap gap-2">
      {positions.map((position) => (
        <li key={position}>
          <Button variant="outline" onClick={() => onJump(position)}>
            Question {position}
          </Button>
        </li>
      ))}
    </ul>
  );
}

/**
 * Review screen (§13 "review unanswered questions", "flag question", "submit exam"): what is answered, what is not, what
 * is flagged, each paper's state, then Submit (with a confirmation dialog) or back to the questions. Also explains the
 * keyboard shortcuts and how to leave safely.
 */
export function ReviewScreen({
  summary,
  papers,
  backPosition,
  onJump,
  onBack,
  onSubmit,
  onFinishPaper,
  onLeave,
  leaving,
  submitDisabled,
  navigator,
  saveStatus,
  noun = "exam",
}: ReviewScreenProps) {
  return (
    <section aria-labelledby="review-heading" className="mx-auto max-w-reading space-y-6 py-6">
      <div className="space-y-2">
        <h2 id="review-heading" tabIndex={-1} className="text-xl font-semibold text-text">
          Review your answers
        </h2>
        <p className="text-base text-text">
          You&apos;ve answered {summary.answered} of {formatCount(summary.total, "question")}.
        </p>
        {saveStatus}
      </div>

      {papers.length > 1 && (
        <Card as="section" aria-labelledby="review-papers">
          <CardHeader titleAs="h3" title={<span id="review-papers">Papers</span>} />
          <CardBody>
            <ul className="divide-y divide-border">
              {papers.map((paper) => (
                <li key={paper.sectionNumber} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="font-semibold text-text">{paper.title}</p>
                    <p className="text-sm text-muted">
                      {paper.answered} of {paper.total} answered{paper.statusLabel ? ` · ${paper.statusLabel}` : ""}
                    </p>
                  </div>
                  {paper.canFinish ? (
                    <Button variant="outline" onClick={() => onFinishPaper(paper.sectionNumber)}>
                      Finish {paper.title}
                    </Button>
                  ) : paper.notStarted && paper.firstPosition !== null ? (
                    <Button variant="outline" onClick={() => onJump(paper.firstPosition as number)}>
                      Open {paper.title}
                    </Button>
                  ) : null}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <Card as="section" aria-labelledby="review-unanswered">
        <CardHeader titleAs="h3" title={<span id="review-unanswered">Not answered ({summary.unanswered.length})</span>} />
        <CardBody>
          <PositionLinks positions={summary.unanswered} onJump={onJump} empty="Every question has an answer." />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="review-flagged">
        <CardHeader
          titleAs="h3"
          title={
            <span id="review-flagged" className="inline-flex items-center gap-2">
              <Flag aria-hidden="true" className="size-4 text-accent-text" />
              Flagged for review ({summary.flagged.length})
            </span>
          }
        />
        <CardBody>
          <PositionLinks positions={summary.flagged} onJump={onJump} empty="You haven't flagged any questions." />
        </CardBody>
      </Card>

      <div className="lg:hidden">{navigator}</div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack} iconStart={<ArrowLeft aria-hidden="true" />}>
          Back to question {backPosition}
        </Button>
        <Button onClick={onSubmit} disabled={submitDisabled} iconStart={<Send aria-hidden="true" />}>
          Submit {noun}
        </Button>
      </div>

      <ShortcutHelp />

      <div className="space-y-2 border-t border-border pt-4">
        <Button variant="ghost" onClick={onLeave} loading={leaving} loadingText="Saving…" iconStart={<LogOut aria-hidden="true" />}>
          Save and leave
        </Button>
        <p className="text-sm text-muted">Your answers are saved. The timer keeps running while you&apos;re away.</p>
      </div>
    </section>
  );
}
