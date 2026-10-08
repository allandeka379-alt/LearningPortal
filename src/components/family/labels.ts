import type { GuardianConsentStatus, GuardianRelationship } from "@/generated/prisma/client";

/** UI copy shared by the student (/app/family) and parent (/parent) screens. Pure, isomorphic. */

export const RELATIONSHIP_LABELS: Readonly<Record<GuardianRelationship, string>> = {
  PARENT: "Parent",
  GUARDIAN: "Guardian",
  GRANDPARENT: "Grandparent",
  SIBLING: "Brother or sister",
  OTHER_RELATIVE: "Other relative",
  SPONSOR: "Sponsor",
  OTHER: "Other",
};

/** Options for relationship pickers, in display order. */
export const RELATIONSHIP_OPTIONS: readonly { value: GuardianRelationship; label: string }[] = (
  Object.keys(RELATIONSHIP_LABELS) as GuardianRelationship[]
).map((value) => ({ value, label: RELATIONSHIP_LABELS[value] }));

/** What each link permission covers (§21). Subjects and the exam countdown are always shared on an active link. */
export const PERMISSION_COPY = {
  progress: { label: "Progress and weak areas", description: "Mastery by subject and topic, and the topics that need more work." },
  activity: { label: "Study time and activity", description: "Minutes studied, streaks and the activity calendar." },
  results: { label: "Test and mock exam results", description: "Scores and estimated grades from quizzes, tests and mock exams." },
} as const;

export const ALWAYS_SHARED_COPY = "Your subjects and exam countdown are always shared with a linked parent.";

export const GUARDIAN_CONSENT_COPY: Readonly<Record<GuardianConsentStatus, string>> = {
  NOT_REQUIRED: "Not needed (adult account).",
  PENDING: "Waiting for a parent or guardian's consent.",
  GRANTED: "Given.",
  REFUSED: "Refused.",
  WITHDRAWN: "Withdrawn.",
};

