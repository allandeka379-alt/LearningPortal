/**
 * Question bank data access (§9, §10, §42): attempt loading, adaptive candidate pools, revision snapshots and
 * QuestionStats counters. Server-only. Schemas and the client-safe view live in `@/lib/questions`; marking in
 * `@/server/marking`.
 */
export {
  candidatePool,
  getQuestionsForAttempt,
  type AttemptQuestion,
  type AttemptQuestionPart,
  type CandidatePoolInput,
  type GetQuestionsForAttemptOptions,
  type QuestionTenancy,
} from "./repository";
export { recordRevisionSnapshot, type RecordedRevision } from "./revisions";
export { updateQuestionStats, type QuestionStatsCounters, type QuestionStatsOutcome } from "./stats";
export { buildQuestionSnapshot, canonicalJson, QUESTION_SNAPSHOT_SCHEMA_VERSION } from "./snapshot";
