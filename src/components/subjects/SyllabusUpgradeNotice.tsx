"use client";

import { ArrowUpRight } from "lucide-react";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export interface SyllabusUpgradeNoticeProps {
  subjectId: string;
  fromSyllabusId: string;
  toSyllabusId: string;
  /** e.g. "2023-2025". */
  pinnedLabel: string;
  currentLabel: string;
  currentTitle: string;
  /** Formatted first day of the new version, e.g. "1 January 2027". */
  currentFrom: string;
  practisedTopics: number;
  carriedTopics: number;
  droppedChoices: number;
  /** Set when the student's target exam is not examined on the new version. */
  examWarning: { sessionName: string; startsOn: string; coveredByPinned: boolean } | null;
  action: FormAction;
}

function topics(count: number): string {
  return `${count} ${count === 1 ? "topic" : "topics"}`;
}

/**
 * "A newer syllabus is available" (§26) on the subject page: what the newer version is, what carries over (practised
 * topics with an equivalent in the new version) and a confirmed move. Moving is the student's choice and cannot be
 * undone here, which the confirmation says plainly; a target-exam mismatch is shown as a warning before the button.
 */
export function SyllabusUpgradeNotice(props: SyllabusUpgradeNoticeProps) {
  const [state, formAction, pending] = useActionState(props.action, null);
  const [confirming, setConfirming] = useState(false);
  const promptId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.ok) toast({ title: state.data.message, tone: "success" });
  }, [state, toast]);

  useEffect(() => {
    if (!confirming && restoreFocus.current) {
      restoreFocus.current = false;
      wrapperRef.current?.querySelector<HTMLButtonElement>("[data-move-trigger]")?.focus();
    }
  }, [confirming]);

  const carryText =
    props.practisedTopics === 0
      ? "You have not practised this subject yet, so nothing needs to carry over."
      : props.carriedTopics > 0
        ? `Your progress in ${topics(props.carriedTopics)} carries over to the matching topics of the new version. Topics that are new start fresh.`
        : "None of the topics you practised has a direct match in the new version, so its topics start fresh.";

  return (
    <Alert
      tone={props.examWarning ? "warning" : "info"}
      title="A newer syllabus is available"
      icon={<ArrowUpRight aria-hidden="true" />}
    >
      <div ref={wrapperRef} className="space-y-3">
        <p>
          You are studying version {props.pinnedLabel}. The current version is {props.currentTitle} · version {props.currentLabel}, which
          applies from {props.currentFrom}.
        </p>
        <p>{carryText} Your answers, test results and history on version {props.pinnedLabel} are kept.</p>
        {props.droppedChoices > 0 && (
          <p>
            {props.droppedChoices === 1 ? "One optional topic you chose is" : `${props.droppedChoices} optional topics you chose are`} not part of the new
            version; you can choose again after moving.
          </p>
        )}
        {props.examWarning && (
          <p className="font-medium">
            Your target exam, {props.examWarning.sessionName} ({props.examWarning.startsOn}), is{" "}
            {props.examWarning.coveredByPinned ? "examined on your current version" : "not covered by the new version"}. Only move if your teacher or
            school has told you to, or change your target exam first.
          </p>
        )}
        {confirming ? (
          <form action={formAction} role="group" aria-labelledby={promptId} className="space-y-3 rounded-control border border-border bg-surface p-3">
            <p id={promptId} className="text-sm text-text">
              Move to version <span className="font-semibold">{props.currentLabel}</span>? You can&apos;t move back to version {props.pinnedLabel} afterwards.
            </p>
            <input type="hidden" name="subjectId" value={props.subjectId} />
            <input type="hidden" name="fromSyllabusId" value={props.fromSyllabusId} />
            <input type="hidden" name="toSyllabusId" value={props.toSyllabusId} />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" loading={pending} loadingText="Moving…" autoFocus>
                Move to version {props.currentLabel}
              </Button>
              <Button
                variant="outline"
                disabled={pending}
                onClick={() => {
                  restoreFocus.current = true;
                  setConfirming(false);
                }}
              >
                Cancel
              </Button>
            </div>
            {state !== null && !state.ok && <FormFeedback state={state} />}
          </form>
        ) : (
          <Button data-move-trigger="" variant="outline" onClick={() => setConfirming(true)}>
            Move to the new version
          </Button>
        )}
      </div>
    </Alert>
  );
}
