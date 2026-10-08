/**
 * Marking engine (§9, §10, §12, §13; ARCHITECTURE §6.5). Pure functions only: no DB, no I/O, no `server-only`
 * dependency, so the web app, REST API, WhatsApp channel and worker share it (and tests import it directly).
 *
 * Entry points: `markResponse` (raw stored JSON in, result out), `markQuestion` (a loaded question + response),
 * `toAttemptColumns` (result → QuestionAttempt columns that satisfy the table's CHECKs).
 */
export * from "./types";
export { markResponse, markQuestion, toMarkingInput } from "./mark";
export { toAttemptColumns, toAttemptFeedback, toScoringStatus, type AttemptFeedbackJson, type AttemptMarkingColumns } from "./attempt-columns";
export { assessNumericAnswer, markNumerical, type NumericAssessment } from "./numeric";
export { markMultipleChoice, markTrueFalse } from "./choice";
export { markShortAnswer } from "./short-answer";
export { markCalculation } from "./calculation";
export { markFillInTheBlank, blankMatches } from "./blanks";
export { markMatching } from "./matching";
export { markDiagramLabelling } from "./labelling";
export { markOpenResponse } from "./open-response";
export { markStructured, MAX_STRUCTURE_DEPTH } from "./structured";
export { wholeMarks } from "./result";
