import "server-only";
import type { z } from "zod";
import { AUTH_FLOW_TTL_MS, sealAuthFlow, unsealAuthFlow } from "@/server/auth/flow-cookie";
import { AUTH_MESSAGES, loginWithPassword, logout, requestLoginCode, verifyCode, type SessionOutcome } from "@/server/auth/flows";
import { maskIdentifier } from "@/server/auth/identifiers";
import { OTP_POLICY } from "@/server/auth/otp";
import type { RequestAuth } from "@/server/auth/request-auth";
import type { AuthFlow } from "@/server/auth/schemas";
import type { RequestMeta } from "@/server/auth/sessions";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { assertRateLimit, rateLimits } from "@/server/lib/rate-limit";
import type { codeFlowSchema, meSchema, otpRequestBodySchema, otpVerifyBodySchema, tokenIssuedSchema, tokenRequestSchema } from "./schemas";

/**
 * Bearer-token authentication for the native app and integrations (§33, §39; ARCHITECTURE §5.1 "API / mobile").
 *
 * Thin over the channel-agnostic flows in `src/server/auth/flows.ts` — the same password check, lockout, one-time-code
 * issue / verification, anti-enumeration rules and audit entries as the web sign-in — with two API specifics:
 *
 * - The session is kind API: the raw token (`dz_` + 32 random bytes) is returned ONCE in the response body; only its
 *   SHA-256 is stored. Expiry slides with use (`session-policy.ts`), and DELETE /auth/token revokes it.
 * - The pending one-time-code step that the web keeps in a sealed cookie is handed to the client as an opaque
 *   `flowToken` (the same AES-256-GCM seal, 15-minute expiry). It never contains anything readable: the email address
 *   is shown only masked.
 *
 * Every failure is generic: unknown identifiers and wrong passwords get the same 401; code requests answer the same
 * whether or not the account exists; an expired / tampered `flowToken` looks like a wrong code.
 */

export type TokenIssued = z.output<typeof tokenIssuedSchema>;
export type CodeFlow = z.output<typeof codeFlowSchema>;
export type MeJson = z.output<typeof meSchema>;

/** Outcome of POST /auth/token: a token (201), or a verification step (202). */
export type TokenGrant = { kind: "token"; data: TokenIssued } | { kind: "verify"; data: CodeFlow };

function tokenFrom(outcome: SessionOutcome): TokenIssued {
  return {
    status: "authenticated",
    token: outcome.token,
    tokenType: "Bearer",
    sessionId: outcome.session.id,
    userId: outcome.userId,
    expiresAt: outcome.session.expiresAt.toISOString(),
    absoluteExpiresAt: outcome.session.absoluteExpiresAt?.toISOString() ?? null,
  };
}

function codeFlowFrom(flow: AuthFlow, status: CodeFlow["status"]): CodeFlow {
  return {
    status,
    flowToken: sealAuthFlow(flow),
    channel: "EMAIL",
    destination: maskIdentifier(flow.target),
    expiresInSeconds: Math.round(AUTH_FLOW_TTL_MS / 1000),
    resendAfterSeconds: OTP_POLICY.resendCooldownSeconds,
  };
}

/**
 * Password sign-in for the API (POST /auth/token).
 *
 * @throws AppError UNAUTHENTICATED (generic), RATE_LIMITED (limit or account lock), FORBIDDEN (suspended account,
 *   only after a correct password), VALIDATION.
 */
export async function grantTokenWithPassword(input: z.output<typeof tokenRequestSchema>, meta: RequestMeta): Promise<TokenGrant> {
  const outcome = await loginWithPassword({ identifier: input.identifier, password: input.password }, meta, {
    sessionKind: "API",
    label: input.label ?? null,
  });
  if (outcome.kind === "session") return { kind: "token", data: tokenFrom(outcome) };
  return { kind: "verify", data: codeFlowFrom(outcome.flow, "verification_required") };
}

/**
 * Passwordless sign-in, step 1 (POST /auth/otp/request). Same answer whether or not the account exists.
 *
 * @throws AppError VALIDATION (not an email address), RATE_LIMITED (cooldown or send limits).
 */
export async function requestLoginCodeForApi(input: z.output<typeof otpRequestBodySchema>, meta: RequestMeta): Promise<CodeFlow> {
  const outcome = await requestLoginCode({ identifier: input.identifier }, meta);
  return codeFlowFrom(outcome.flow, "code_sent");
}

function expiredFlow(): AppError {
  return AppError.validation({ flowToken: [AUTH_MESSAGES.flowExpired] }, AUTH_MESSAGES.flowExpired);
}

/**
 * Passwordless sign-in, step 2 (POST /auth/otp/verify): the code from step 1 (or from a 202 of POST /auth/token) for
 * a bearer token. Also marks the email address verified.
 *
 * @throws AppError VALIDATION (`code` wrong or expired, `flowToken` expired or tampered), RATE_LIMITED, FORBIDDEN
 *   (suspended account).
 */
export async function verifyLoginCodeForApi(input: z.output<typeof otpVerifyBodySchema>, meta: RequestMeta): Promise<TokenIssued> {
  const flow = unsealAuthFlow(input.flowToken);
  // Password-reset codes are completed on the web only (the reset form sets a new password).
  if (flow === null || flow.purpose === "PASSWORD_RESET") throw expiredFlow();
  // Per (IP, destination), on top of the per-code and per-destination limits inside verifyOtp and the IP-wide
  // credential limit inside verifyCode.
  await assertRateLimit(rateLimits.apiOtpVerify(meta.ip, flow.target), AUTH_MESSAGES.tooManyAttempts);
  const outcome = await verifyCode(flow, { code: input.code }, meta, { sessionKind: "API", label: input.label ?? null });
  return tokenFrom(outcome);
}

/**
 * Revokes the bearer token of this request (DELETE /auth/token). Idempotent; audited by `logout`.
 *
 * @throws AppError BAD_REQUEST for cookie-authenticated calls (web sessions sign out through the website).
 */
export async function revokeCurrentToken(auth: RequestAuth, meta: RequestMeta): Promise<void> {
  if (auth.via !== "bearer") throw new AppError("BAD_REQUEST", "Only access tokens can be revoked here. Sign out of the website from its menu.");
  await logout({ id: auth.session.id, userId: auth.actor.userId }, meta, auth.actor.roles);
}

/** The signed-in user and the session of this request (GET /me). */
export async function getMe(auth: RequestAuth): Promise<MeJson> {
  const { actor, session } = auth;
  const user = await db.user.findUnique({
    where: { id: actor.userId },
    select: { emailNormalized: true, emailVerifiedAt: true, phoneE164: true, phoneVerifiedAt: true },
  });
  if (!user) throw AppError.unauthenticated();
  return {
    id: actor.userId,
    displayName: actor.displayName,
    roles: [...actor.roles],
    timeZone: actor.timeZone,
    email: user.emailNormalized,
    emailVerified: user.emailVerifiedAt !== null,
    phone: user.phoneE164,
    phoneVerified: user.phoneVerifiedAt !== null,
    passwordMustChange: actor.passwordMustChange === true,
    student: actor.studentOnboardingCompleted === null ? null : { onboardingCompleted: actor.studentOnboardingCompleted },
    session: {
      id: session.id,
      kind: session.kind,
      via: auth.via,
      authMethod: session.authMethod,
      label: session.label,
      createdAt: session.createdAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
      absoluteExpiresAt: session.absoluteExpiresAt?.toISOString() ?? null,
    },
  };
}
