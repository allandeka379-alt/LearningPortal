/**
 * The AI tutor (§14, §15, §40; ARCHITECTURE §6.3, §6.4). Server-only; the chat UI imports types from `./protocol`.
 *
 * - `getTutorStatus(actor)`                      configured / switched on / plan / today's allowance
 * - `listTutorSubjects(actor)`, `listTutorTopics(actor, subjectId)`  pickers (enrolments, pinned syllabus topics)
 * - `createConversation(actor, { subjectId?, topicId?, questionId? })`  validated scope + frozen PII-free context
 * - `listConversations(actor, { cursor, limit })` history list (RLS, cursor-paginated)
 * - `getConversation(actor, id, { before })`     messages with server-rendered answers (RLS)
 * - `archiveConversation(actor, id)`, `rateTutorMessage(actor, { messageId, rating })`
 * - `sendTutorMessage(actor, id, { text, mode, clientMessageId }, { signal })`  async generator of stream events
 *
 * No background jobs: nothing to register with the worker.
 */
export {
  archiveConversation,
  createConversation,
  createConversationSchema,
  getConversation,
  getTutorStatus,
  listConversations,
  listTutorSubjects,
  listTutorTopics,
  loadHelplines,
  rateMessageSchema,
  rateTutorMessage,
  renderAnswer,
  sendTutorMessage,
  sendTutorMessageSchema,
  subjectIdForTopic,
  TUTOR_ROUTE,
  type CreateConversationInput,
  type SendTutorMessageInput,
  type SendTutorMessageOptions,
  type TutorActor,
  type TutorConversationSummary,
  type TutorConversationView,
  type TutorDeps,
  type TutorStatus,
  type TutorSubjectOption,
  type TutorTopicOption,
} from "./service";
export { getAiHelpGate, hasActiveExam } from "./context";
export { aiLockMessage, type AiHelpGate, type AiHelpLock } from "./core";
export * from "./protocol";
