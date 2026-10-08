import "server-only";
import { AUDIT_ACTIONS } from "@/server/lib/audit";

/** Audit action keys used by the auth module, all from the shared registry (`AUDIT_ACTIONS` in src/server/lib/audit.ts). */
export const AUTH_AUDIT = {
  LOGIN_SUCCESS: AUDIT_ACTIONS.AUTH_LOGIN_SUCCESS,
  LOGIN_FAILURE: AUDIT_ACTIONS.AUTH_LOGIN_FAILURE,
  LOGOUT: AUDIT_ACTIONS.AUTH_LOGOUT,
  PASSWORD_RESET: AUDIT_ACTIONS.AUTH_PASSWORD_RESET,
  PASSWORD_CHANGE: AUDIT_ACTIONS.AUTH_PASSWORD_CHANGE,
  SESSIONS_REVOKE: AUDIT_ACTIONS.AUTH_SESSIONS_REVOKE,
  STEP_UP: AUDIT_ACTIONS.AUTH_STEP_UP,
  /** Five wrong passwords locked password login for 15 minutes. */
  ACCOUNT_LOCKED: AUDIT_ACTIONS.AUTH_ACCOUNT_LOCKED,
  /** Self-service registration (account created, contact not yet verified). */
  REGISTER: AUDIT_ACTIONS.AUTH_REGISTER,
  /** Email ownership proven with a one-time code (or by Google). */
  CONTACT_VERIFIED: AUDIT_ACTIONS.AUTH_CONTACT_VERIFY,
  /** Google identity linked to an account (auto-link by verified email, or a new account). */
  OAUTH_LINK: AUDIT_ACTIONS.AUTH_OAUTH_LINK,
  /** The account email address was replaced after a code sent to the new address was entered. */
  EMAIL_CHANGE: AUDIT_ACTIONS.AUTH_EMAIL_CHANGE,
} as const;
