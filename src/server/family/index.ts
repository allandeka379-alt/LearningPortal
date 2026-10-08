/**
 * Family: parent accounts, parent-student links with consent, the parent's child views, paying for a child, and
 * parent summaries (§21; ARCHITECTURE §5.3, §5.12).
 *
 * - links:            codes (both directions), requests by contact, accept / decline, revoke, permissions, AI consent
 * - consent:          guardian consent for minors (method PARENT_ACCOUNT)
 * - queries:          /app/family and /parent read models (RBAC-scoped; never AI conversations)
 * - ai-conversations: the separately consented parent read path (platform switch + student consent + RLS)
 * - billing:          "Subscribe for this child" (shared checkout), the parent's payments
 * - digest:           weekly / monthly summary preference and job
 * - jobs:             `registerFamilyJobs()` for the worker
 */
export * from "./schemas";
export * from "./codes";
export {
  createParentLinkCode,
  createStudentLinkCode,
  LINK_REQUEST_SENT_MESSAGE,
  redeemParentCode,
  redeemStudentCode,
  requestLinkByContact,
  respondToLinkRequest,
  revokeLink,
  setAiConversationAccess,
  updateLinkPermissions,
  type AiAccessOptions,
  type IssuedLinkCode,
} from "./links";
export { grantGuardianConsent, withdrawGuardianConsent, type GuardianConsentInput } from "./consent";
export {
  childHasParentReports,
  getParentChildDetail,
  getParentDashboard,
  getParentOutstandingCode,
  getStudentFamilyView,
  getStudentLinkForConsent,
  listParentChildren,
  requireLinkedChild,
  type ParentChild,
  type ParentChildDetail,
  type StudentFamilyLink,
  type StudentFamilyRequest,
  type StudentFamilyView,
} from "./queries";
export {
  AI_CONVERSATION_PAGE_SIZE,
  canParentReadAiConversations,
  getChildAiConversation,
  listChildAiConversations,
  type ParentAiConversationSummary,
  type ParentAiConversationView,
} from "./ai-conversations";
export {
  CHECKOUT_METHOD_IDS,
  childrenWithLifetimeAccess,
  getChildCheckoutOptions,
  getParentPayment,
  listParentPayments,
  PARENT_PAYMENT_RESULT_PATH,
  refreshParentPayment,
  startChildCheckout,
  type CheckoutMethodId,
  type CheckoutMethodOption,
  type CheckoutPlanOption,
  type CheckoutPriceOption,
  type ChildCheckoutOptions,
  type ChildCheckoutResult,
  type ParentPaymentResult,
  type ParentPaymentRow,
} from "./billing";
export {
  composeDigest,
  getParentDigestPreference,
  PARENT_DIGEST_JOB,
  runParentDigest,
  setParentDigestPreference,
  type DigestKind,
} from "./digest";
export { EXPIRE_LINK_INVITES_JOB, expireLinkInvites, registerFamilyJobs } from "./jobs";
export type { FamilyActor, FamilyRequestMeta } from "./common";
