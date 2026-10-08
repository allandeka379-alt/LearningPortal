/**
 * The onboarding wizard's step model (§5 onboarding, §52 steps 2-4; ARCHITECTURE §3.3 "/onboarding is a resumable
 * wizard"). PURE and isomorphic: no I/O, unit tested in steps.test.ts. The service (./service.ts) loads and writes rows
 * and asks these functions where the student is, where they may go and what a change invalidates.
 *
 * Screens, in order (one small screen each, `/onboarding/<step>`):
 *
 * | Step       | Saves                                  | Persisted position (Student.onboardingStep)             |
 * |------------|----------------------------------------|---------------------------------------------------------|
 * | `country`  | Student.countryId                      | COUNTRY                                                 |
 * | `board`    | Student.examBoardId                    | EXAM_BOARD                                              |
 * | `level`    | Student.qualificationId                | LEVEL                                                   |
 * | `year`     | Student.yearGroupId                    | YEAR_GROUP                                              |
 * | `subjects` | onboardingData.subjectIds              | SUBJECTS                                                |
 * | `exam`     | Student.targetExamSessionId (optional) | TARGET_EXAM                                             |
 * | `ability`  | Student.abilityLevel                   | ABILITY                                                 |
 * | `grade`    | Student.targetGrade (optional)         | TARGET_GRADE                                            |
 * | `goal`     | LearnerStats.dailyGoalMinutes          | DIAGNOSTIC_OFFER with onboardingData.dailyGoalConfirmed unset |
 * | `finish`   | enrolments + completion                | DIAGNOSTIC_OFFER with dailyGoalConfirmed = true          |
 *
 * The schema's OnboardingStep enum has no value for the daily goal, so the goal screen shares DIAGNOSTIC_OFFER and
 * `onboardingData.dailyGoalConfirmed` tells the two apart. AGE_CHECK is not a screen: registration already records
 * the student's (optional) birth year and treats students without one as minors (guardian consent PENDING).
 *
 * The persisted position is the FURTHEST step reached: the student may go back to any earlier screen (plain links, so
 * it works without JavaScript) and forward again up to it. Changing an answer that later answers depend on (country →
 * board → qualification → exam session / target grade / subjects) clears those later answers and moves the position
 * back to the next screen, so the student never finishes with an inconsistent track.
 */
import type { OnboardingStep } from "@/generated/prisma/enums";
import { homePathFor, isStudentHomePath, safeNextPath, type RoutingSubject } from "@/server/auth/redirects";

export const WIZARD_STEPS = ["country", "board", "level", "year", "subjects", "exam", "ability", "grade", "goal", "finish"] as const;
export type WizardStep = (typeof WIZARD_STEPS)[number];

/** Short names used by the progress indicator and the summary. */
export const STEP_LABELS: Readonly<Record<WizardStep, string>> = {
  country: "Country",
  board: "Examination board",
  level: "Level",
  year: "Year or form",
  subjects: "Subjects",
  exam: "Target examination",
  ability: "Current ability",
  grade: "Target grade",
  goal: "Daily study goal",
  finish: "Diagnostic test",
};

export const ONBOARDING_BASE_PATH = "/onboarding";

/** Where the wizard sends the student once it is complete. */
export const DASHBOARD_PATH = "/app";
export const DIAGNOSTIC_PATH = "/app/diagnostic";

/** `/onboarding/<step>`. */
export function stepHref(step: WizardStep): string {
  return `${ONBOARDING_BASE_PATH}/${step}`;
}

/**
 * The validated "continue to" path the wizard carries as `?next=` (a hidden `next` field in its forms) and opens
 * once onboarding is complete, e.g. the class invitation the student opened before they had an account. Never a
 * wizard path or an auth page (`safeNextPath` rules), and never the bare dashboard (`/app` only means "the app", so the
 * finish screen's own choice, e.g. the diagnostic, applies); `null` otherwise.
 */
export function onboardingNext(value: unknown): string | null {
  const safe = safeNextPath(value);
  if (safe === null || isStudentHomePath(safe)) return null;
  const path = safe.split(/[?#]/)[0] ?? safe;
  return path === ONBOARDING_BASE_PATH || path.startsWith(`${ONBOARDING_BASE_PATH}/`) ? null : safe;
}

/** A wizard `href` that keeps the pending `next` (unchanged when there is none). */
export function withOnboardingNext(href: string, next: string | null | undefined): string {
  const safe = onboardingNext(next);
  if (safe === null) return href;
  return `${href}${href.includes("?") ? "&" : "?"}next=${encodeURIComponent(safe)}`;
}

export function isWizardStep(value: unknown): value is WizardStep {
  return typeof value === "string" && (WIZARD_STEPS as readonly string[]).includes(value);
}

/** 0-based position of a step. */
export function stepIndex(step: WizardStep): number {
  return WIZARD_STEPS.indexOf(step);
}

export function previousStep(step: WizardStep): WizardStep | null {
  return WIZARD_STEPS[stepIndex(step) - 1] ?? null;
}

export function nextStep(step: WizardStep): WizardStep | null {
  return WIZARD_STEPS[stepIndex(step) + 1] ?? null;
}

/** "Step 3 of 10" for the progress indicator (1-based). */
export function stepProgress(step: WizardStep): { current: number; total: number } {
  return { current: stepIndex(step) + 1, total: WIZARD_STEPS.length };
}

// ---------------------------------------------------------------------------------------------------------------------
// Persisted position
// ---------------------------------------------------------------------------------------------------------------------

/** Student.onboardingData (schema doc shape), as far as the wizard uses it. Unknown keys are kept. */
export interface OnboardingData {
  version: 1;
  /** Subjects chosen on the `subjects` screen; enrolled (pinning syllabus versions) when the wizard completes. */
  subjectIds?: string[];
  /** The daily goal screen was saved (it shares DIAGNOSTIC_OFFER with the final screen). */
  dailyGoalConfirmed?: boolean;
  /** The student's answer to the diagnostic offer (§46, §52). */
  wantsDiagnostic?: boolean;
  /**
   * Directory school picked on the `year` screen (optional). Completing the wizard asks to join it
   * (SchoolMember STUDENT / REQUESTED / source REQUEST) for the school's admins to approve.
   */
  schoolId?: string;
  [key: string]: unknown;
}

const STEP_FOR_STORED: Readonly<Record<OnboardingStep, WizardStep | "done">> = {
  COUNTRY: "country",
  // AGE_CHECK is not a screen of this wizard (see the module header): resume at the country step.
  AGE_CHECK: "country",
  EXAM_BOARD: "board",
  LEVEL: "level",
  YEAR_GROUP: "year",
  SUBJECTS: "subjects",
  TARGET_EXAM: "exam",
  ABILITY: "ability",
  TARGET_GRADE: "grade",
  DIAGNOSTIC_OFFER: "goal",
  COMPLETED: "done",
};

const STORED_FOR_STEP: Readonly<Record<WizardStep, OnboardingStep>> = {
  country: "COUNTRY",
  board: "EXAM_BOARD",
  level: "LEVEL",
  year: "YEAR_GROUP",
  subjects: "SUBJECTS",
  exam: "TARGET_EXAM",
  ability: "ABILITY",
  grade: "TARGET_GRADE",
  goal: "DIAGNOSTIC_OFFER",
  finish: "DIAGNOSTIC_OFFER",
};

/** The persisted enum value for a screen. */
export function storedStepFor(step: WizardStep): OnboardingStep {
  return STORED_FOR_STEP[step];
}

/** The furthest screen the student has reached (where `/onboarding` resumes), or "done" once completed. */
export function furthestStep(stored: OnboardingStep, data: Pick<OnboardingData, "dailyGoalConfirmed">): WizardStep | "done" {
  const step = STEP_FOR_STORED[stored];
  if (step === "goal" && data.dailyGoalConfirmed === true) return "finish";
  return step;
}

/** A screen may be opened when it is not beyond the furthest one reached. */
export function canVisit(step: WizardStep, furthest: WizardStep | "done"): boolean {
  if (furthest === "done") return false;
  return stepIndex(step) <= stepIndex(furthest);
}

// ---------------------------------------------------------------------------------------------------------------------
// Saving a screen
// ---------------------------------------------------------------------------------------------------------------------

/** Answers a saved screen can invalidate. */
export type ClearableAnswer = "examBoardId" | "qualificationId" | "yearGroupId" | "targetExamSessionId" | "targetGrade" | "subjectIds";

/** What changed on the saved screen (only the track screens can invalidate later answers). */
export interface StepChange {
  /** The saved value differs from the stored one. */
  changed: boolean;
  /** `level` screen: the new qualification is in a different cross-board level (O-Level → A-Level). */
  levelChanged?: boolean;
}

export interface StepSaveOutcome {
  /** New persisted position. */
  stored: OnboardingStep;
  /** Later answers to clear (they no longer fit the new answer). */
  clear: ClearableAnswer[];
  /** Whether the daily goal screen must be confirmed again (set when anything was cleared). */
  resetGoal: boolean;
  /** Where the "Continue" button leads. */
  next: WizardStep;
}

const DEPENDENTS: Readonly<Partial<Record<WizardStep, readonly ClearableAnswer[]>>> = {
  // Boards are offered per country; year groups belong to a country.
  country: ["examBoardId", "qualificationId", "yearGroupId", "targetExamSessionId", "targetGrade", "subjectIds"],
  // Qualifications belong to a board.
  board: ["qualificationId", "targetExamSessionId", "targetGrade", "subjectIds"],
  // Sessions, grade schemes and subjects belong to a qualification.
  level: ["targetExamSessionId", "targetGrade", "subjectIds"],
};

/**
 * The outcome of saving `step` (not `finish`, which completes the wizard): the new persisted position, the answers
 * to clear and the next screen. Changing an answer with dependants clears them and moves the position to the next
 * screen; otherwise the position only ever moves forward.
 */
export function planStepSave(step: Exclude<WizardStep, "finish">, stored: OnboardingStep, change: StepChange): StepSaveOutcome {
  const next = nextStep(step) as WizardStep;
  const dependents = change.changed ? [...(DEPENDENTS[step] ?? [])] : [];
  if (step === "level" && change.changed && change.levelChanged) dependents.push("yearGroupId");
  if (dependents.length > 0) {
    return { stored: storedStepFor(next), clear: dependents, resetGoal: true, next };
  }
  const current = STEP_FOR_STORED[stored];
  const currentIndex = current === "done" ? WIZARD_STEPS.length : stepIndex(current);
  const target = stepIndex(next) > currentIndex ? storedStepFor(next) : stored;
  return { stored: target, clear: [], resetGoal: false, next };
}

// ---------------------------------------------------------------------------------------------------------------------
// Entry routing
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Where a signed-in user who opens `/onboarding` belongs instead, or null when the wizard is theirs to complete:
 * other roles go to their own home area (parents link a child, teachers join a school there); a student who has
 * finished goes to the dashboard. A STUDENT without a Student row cannot be onboarded (it would loop between
 * `/onboarding` and the guard), so they go to the home page.
 */
export function onboardingEntryRedirect(subject: RoutingSubject): string | null {
  if (!subject.roles.includes("STUDENT")) return homePathFor(subject);
  if (subject.studentOnboardingCompleted === null) return "/";
  if (subject.studentOnboardingCompleted) return DASHBOARD_PATH;
  return null;
}
