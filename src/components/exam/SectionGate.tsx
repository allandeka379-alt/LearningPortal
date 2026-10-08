"use client";

import { Play } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { formatCount } from "@/lib/format";
import { formatTimeLimit } from "./exam-model";

export interface SectionGateProps {
  title: string;
  questionCount: number;
  marks: number;
  timeLimitSeconds: number;
  /** Another paper is running: it must be finished first. */
  blockedBy: { sectionNumber: number; title: string } | null;
  starting: boolean;
  error: string | null;
  onStart: () => void;
  onGoTo: (sectionNumber: number) => void;
  /** Opens the "Finish paper" confirmation for the running paper. */
  onFinishRunning: (sectionNumber: number) => void;
}

/**
 * Start screen of a separately timed paper (multi-paper mocks, §12): what the paper contains and how long it lasts,
 * and that its clock starts on "Start". Only one paper runs at a time, so a running paper must be finished first.
 */
export function SectionGate({ title, questionCount, marks, timeLimitSeconds, blockedBy, starting, error, onStart, onGoTo, onFinishRunning }: SectionGateProps) {
  return (
    <Card as="section" aria-labelledby="section-gate-heading" className="mx-auto max-w-reading">
      <CardBody className="space-y-4">
        <div className="space-y-1">
          <h2 id="section-gate-heading" tabIndex={-1} className="text-xl font-semibold text-text">
            {title}
          </h2>
          <p className="text-sm text-muted">
            {formatCount(questionCount, "question")} · {formatCount(marks, "mark")} · {formatTimeLimit(timeLimitSeconds)}
          </p>
        </div>
        <p className="text-sm text-text">
          This paper has its own timer of {formatTimeLimit(timeLimitSeconds)}. It starts when you press Start and keeps running if you
          leave the page. Your answers save automatically.
        </p>
        {blockedBy ? (
          <Alert tone="info" title={`${blockedBy.title} is still running`}>
            <p>Finish {blockedBy.title} (or let its time run out) before you start this paper.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button onClick={() => onFinishRunning(blockedBy.sectionNumber)}>Finish {blockedBy.title}</Button>
              <Button variant="outline" onClick={() => onGoTo(blockedBy.sectionNumber)}>
                Go to {blockedBy.title}
              </Button>
            </div>
          </Alert>
        ) : (
          <Button size="lg" onClick={onStart} loading={starting} loadingText="Starting…" iconStart={<Play aria-hidden="true" />}>
            Start {title}
          </Button>
        )}
        {error && (
          <p role="alert" className="text-sm font-medium text-danger-text">
            {error}
          </p>
        )}
      </CardBody>
    </Card>
  );
}
