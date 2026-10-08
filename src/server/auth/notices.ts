import "server-only";
import { APP_NAME, SUPPORT_EMAIL, SUPPORT_EMAIL_CONFIGURED } from "@/lib/config";
import { absoluteUrl } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { sendMessage } from "@/server/messaging";
import { maskIdentifier } from "./identifiers";

/**
 * Security notices by email (owner decision 2026-10-07: accounts are email-based). Account email: sent whatever
 * `features.email` says (`transactional: true`), only to an address the account has VERIFIED, never with a secret in
 * it, and in the background: a provider failure is logged, never shown to the person who made the change.
 */

export type SecurityNoticeKind = "password_changed" | "password_reset" | "temporary_password" | "email_changed";

export interface SecurityNoticeInput {
  kind: SecurityNoticeKind;
  /** The verified address to notify (for `email_changed`: the OLD address). `null`: nothing to send. */
  to: string | null;
  /** `email_changed` only: the new address (shown masked). */
  newEmail?: string;
}

function helpLine(): string {
  const reset = `reset your password now at ${absoluteUrl("/forgot-password")}`;
  return SUPPORT_EMAIL_CONFIGURED ? `If this wasn't you, ${reset} and tell us at ${SUPPORT_EMAIL}.` : `If this wasn't you, ${reset}.`;
}

/** Subject and plain-text body of a notice. Pure apart from reading the app URL. */
export function renderSecurityNotice(input: Pick<SecurityNoticeInput, "kind" | "newEmail">): { subject: string; text: string } {
  switch (input.kind) {
    case "password_changed":
      return {
        subject: `Your ${APP_NAME} password was changed`,
        text: `The password for your ${APP_NAME} account was just changed, and every other device was signed out. If this was you, there is nothing else to do. ${helpLine()}`,
      };
    case "password_reset":
      return {
        subject: `Your ${APP_NAME} password was reset`,
        text: `The password for your ${APP_NAME} account was just reset with a code sent to this address, and every other device was signed out. If this was you, there is nothing else to do. ${helpLine()}`,
      };
    case "temporary_password":
      return {
        subject: `A one-time password was set for your ${APP_NAME} account`,
        text: `A member of the ${APP_NAME} team set a one-time password for your account at your request, and every device was signed out. You will choose a new password when you sign in with it. ${helpLine()}`,
      };
    case "email_changed": {
      const masked = input.newEmail ? maskIdentifier(input.newEmail) : "a new address";
      const support = SUPPORT_EMAIL_CONFIGURED ? ` and tell us at ${SUPPORT_EMAIL}` : "";
      return {
        subject: `The email address of your ${APP_NAME} account was changed`,
        text: `The email address of your ${APP_NAME} account was just changed to ${masked}. Codes and password resets now go to the new address. If this wasn't you, contact us straight away${support}.`,
      };
    }
  }
}

/** Sends a security notice in the background (never throws, never waits for the provider). */
export function sendSecurityNotice(input: SecurityNoticeInput): void {
  if (input.to === null) return;
  const { subject, text } = renderSecurityNotice(input);
  sendMessage({ channel: "email", to: input.to, subject, text, tag: `auth.security.${input.kind}`, transactional: true }).catch((error: unknown) =>
    logger.error("security notice delivery failed", { kind: input.kind, err: error }),
  );
}

/** The address to notify for an account: its email when verified, otherwise none. Pure. */
export function verifiedEmailOf(user: { emailNormalized: string | null; emailVerifiedAt: Date | null }): string | null {
  return user.emailNormalized !== null && user.emailVerifiedAt !== null ? user.emailNormalized : null;
}
