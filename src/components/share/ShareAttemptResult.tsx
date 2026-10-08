import { createShareAction, revokeShareAction } from "./actions";
import { ShareButton } from "./ShareButton";

const TEST_MODES = new Set(["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM", "DIAGNOSTIC"]);

export interface ShareAttemptResultProps {
  attemptId: string;
  /** AssessmentAttempt.mode of the result. */
  mode: string;
  /** True once the score is final (marked, not provisional); nothing is rendered before that. */
  isFinal: boolean;
}

/**
 * "Share result" for the exam results page (§46): a mock exam becomes a MOCK_SCORE card, other tests a TEST_SCORE
 * card ("I scored 82% in O-Level Mathematics"). Hidden until marking is final, so no provisional score goes public.
 * Server component; drop it into the results page's `ScoreSummary` actions slot.
 */
export function ShareAttemptResult({ attemptId, mode, isFinal }: ShareAttemptResultProps) {
  if (!isFinal) return null;
  const kind = mode === "MOCK_EXAM" ? "MOCK_SCORE" : TEST_MODES.has(mode) ? "TEST_SCORE" : null;
  if (!kind) return null;
  return (
    <ShareButton
      request={{ kind, attemptId }}
      createAction={createShareAction}
      revokeAction={revokeShareAction}
      label="Share result"
      shows="your score, the subject and the level"
      size="sm"
    />
  );
}
