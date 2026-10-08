/**
 * The AI question solver (§15, §14, §40; ARCHITECTURE §6.2-§6.4). Server-only; UI code imports types from `./types`.
 *
 * - `getSolverStatus(actor)`                       configured / switched on / plan / photos / allowance / exam lock
 * - `listSolverSubjects(actor)`                    the optional subject picker (enrolments)
 * - `solveQuestion(actor, { text, imageAssetId, mode, subjectId, clientRequestId }, { photo })`
 *                                                  -> { kind: "SOLVED", conversationId } | { kind: "SAFEGUARD", helplines }
 * - `listSolves(actor, { cursor, limit })`         history (RLS, cursor-paginated)
 * - `getSolve(actor, id)`                          the stored solution, rendered server-side (KaTeX)
 * - `archiveSolve(actor, id)`, `rateSolution(actor, { messageId, rating })`
 *
 * No background jobs: nothing to register with the worker.
 */
export {
  archiveSolve,
  getSolve,
  getSolverStatus,
  listSolverSubjects,
  listSolves,
  rateSolution,
  rateSolutionSchema,
  solveQuestion,
  solveQuestionSchema,
  type SolveQuestionInput,
  type SolverActor,
  type SolverDeps,
  type SolverPhotoUpload,
} from "./service";
export {
  parseStoredSolution,
  solutionToMarkdown,
  SOLVE_MODES,
  SOLVER_CODE_DETAIL,
  SOLVER_HARD_ROUTE,
  SOLVER_PROMPT_VERSION,
  SOLVER_ROUTE,
  type SolveMode,
  type StoredSolution,
} from "./core";
export type * from "./types";
