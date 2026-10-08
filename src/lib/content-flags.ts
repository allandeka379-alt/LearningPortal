/**
 * Content quality flag reasons and labels (§42), isomorphic and dependency-free so the learner "Report a problem" form
 * (a client component) can use them without pulling validation code into the client bundle. The server schemas in
 * src/server/cms/flags/schemas.ts re-export these.
 */

export const FLAG_REASONS = [
  "INCORRECT_ANSWER",
  "AMBIGUOUS",
  "INCORRECT_MARKING",
  "WRONG_TOPIC",
  "WRONG_DIFFICULTY",
  "TYPO_OR_FORMATTING",
  "COPYRIGHT_CONCERN",
  "OTHER",
] as const;
export type FlagReason = (typeof FLAG_REASONS)[number];

/** Editor-facing labels (triage queue, flag detail). */
export const FLAG_REASON_LABELS: Readonly<Record<FlagReason, string>> = {
  INCORRECT_ANSWER: "Incorrect answer",
  AMBIGUOUS: "Ambiguous question",
  INCORRECT_MARKING: "Incorrect marking",
  WRONG_TOPIC: "Wrong topic",
  WRONG_DIFFICULTY: "Wrong difficulty",
  TYPO_OR_FORMATTING: "Typo or formatting",
  COPYRIGHT_CONCERN: "Copyright concern",
  OTHER: "Other",
};

/** Learner-facing wording of the same reasons (the "Report a problem" form). */
export const LEARNER_FLAG_REASON_LABELS: Readonly<Record<FlagReason, string>> = {
  INCORRECT_ANSWER: "The correct answer is wrong",
  AMBIGUOUS: "It's unclear or confusing",
  INCORRECT_MARKING: "My answer was marked wrongly",
  WRONG_TOPIC: "It's in the wrong topic",
  WRONG_DIFFICULTY: "The difficulty seems wrong",
  TYPO_OR_FORMATTING: "A typo or something displays badly",
  COPYRIGHT_CONCERN: "It may copy someone else's work",
  OTHER: "Something else",
};

/** Content a learner can report from the learning UI. */
export type LearnerReportableType = "QUESTION" | "LESSON" | "FLASHCARD";

/** Reasons offered to learners per content type, most common first. */
export const LEARNER_REPORT_REASONS: Readonly<Record<LearnerReportableType, readonly FlagReason[]>> = {
  QUESTION: ["INCORRECT_ANSWER", "INCORRECT_MARKING", "AMBIGUOUS", "TYPO_OR_FORMATTING", "WRONG_TOPIC", "WRONG_DIFFICULTY", "COPYRIGHT_CONCERN", "OTHER"],
  LESSON: ["AMBIGUOUS", "TYPO_OR_FORMATTING", "WRONG_TOPIC", "COPYRIGHT_CONCERN", "OTHER"],
  FLASHCARD: ["INCORRECT_ANSWER", "AMBIGUOUS", "TYPO_OR_FORMATTING", "WRONG_TOPIC", "OTHER"],
};

export const MAX_FLAG_DETAILS = 2_000;
