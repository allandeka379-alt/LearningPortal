/**
 * Onboarding and the free diagnostic (§5, §46, §52 steps 2-7). Server-only.
 *
 * - Wizard model (pure, ./steps): screens, persisted position, invalidation, entry routing.
 * - Wizard service (./service): `loadOnboardingStep`, `saveOnboardingStep`, `completeOnboarding`, `getOnboardingState`.
 * - Diagnostic (./diagnostic): `getDiagnosticHub`, `startDiagnostics`, `getDiagnosticRoom`, `submitDiagnostic`,
 *   `getDiagnosticReport`; pure rules in ./report.
 */
export * from "./steps";
export {
  ABILITY_LEVELS,
  DAILY_GOAL_PRESETS,
  FINISH_CHOICES,
  MAX_ONBOARDING_SUBJECTS,
  completeOnboarding,
  dailyGoalOptions,
  getOnboardingState,
  loadOnboardingStep,
  readOnboardingData,
  resolveDailyGoal,
  saveOnboardingStep,
  type ChoiceOption,
  type CompletedOnboarding,
  type FinishChoice,
  type OnboardingActor,
  type OnboardingAnswers,
  type OnboardingState,
  type OnboardingSummary,
  type SavedStep,
  type SessionChoice,
  type StepLoad,
  type StepView,
  type SubjectCategoryChoice,
  type SubjectChoice,
} from "./service";
export {
  getDiagnosticHub,
  getDiagnosticReport,
  getDiagnosticRoom,
  startDiagnostics,
  startDiagnosticsSchema,
  submitDiagnostic,
  type DiagnosticHub,
  type DiagnosticReport,
  type DiagnosticReportLoad,
  type DiagnosticRoomLoad,
  type DiagnosticStatus,
  type DiagnosticSubject,
  type OtherDiagnostic,
  type StartDiagnosticsInput,
  type StartedDiagnostics,
  type StartingTopicView,
} from "./diagnostic";
export * from "./report";
