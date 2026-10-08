"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ActionResult } from "@/server/lib/errors";
import type { SlotRef } from "./AnswerRunner";
import { FeedbackPanel } from "./FeedbackPanel";
import type { ReportProblemButtonProps } from "./ReportProblem";
import type { SelfAssessmentInput } from "./SelfAssessmentForm";
import type { PresentedFeedback } from "./types";

/** Saves a self-assessment of one answer (a Server Action) and returns the answer's feedback with the new mark. */
export type SelfAssessAction = (input: SlotRef & SelfAssessmentInput) => Promise<ActionResult<PresentedFeedback>>;

export interface SelfMarkableFeedbackProps {
  attemptId: string;
  position: number;
  /** The answer's feedback; the form shows when it carries a self-assessment offer. */
  feedback: PresentedFeedback;
  action: SelfAssessAction;
  headingLevel?: 2 | 3;
  /** "Report a problem" with the question (§42). */
  report?: ReportProblemButtonProps;
  /** Offer "Ask the tutor about this" (the AI tutor is switched on: `features.ai`). Default false. */
  askTutor?: boolean;
}

/**
 * An answer's feedback on a results page (practice summary, exam results, diagnostic report). When the answer waits for
 * marking and AI marking is not configured, it carries the mark scheme and the self-assessment form: saving shows the
 * new mark at once (focused and announced politely) and refreshes the page so the score and status update. Other
 * answers render as plain feedback (always the server's latest).
 */
export function SelfMarkableFeedback({ attemptId, position, feedback, action, headingLevel = 3, report, askTutor = false }: SelfMarkableFeedbackProps) {
  const router = useRouter();
  const [marked, setMarked] = useState<PresentedFeedback | null>(null);
  const shown = marked ?? feedback;

  const selfAssess = async (input: SelfAssessmentInput): Promise<string | null> => {
    const result = await action({ attemptId, position, ...input });
    if (!result.ok) return result.error.message;
    setMarked({ ...result.data, selfAssessment: null });
    router.refresh();
    return null;
  };

  return (
    <FeedbackPanel
      feedback={shown}
      autoFocus={marked !== null}
      announce={marked !== null}
      headingLevel={headingLevel}
      onSelfAssess={shown.selfAssessment ? selfAssess : undefined}
      report={report}
      askTutor={askTutor}
    />
  );
}
