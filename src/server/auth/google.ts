import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { db } from "@/server/db";
import { audit } from "@/server/lib/audit";
import { randomToken } from "@/server/lib/crypto";
import { getEnv, type ServerEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { AUTH_AUDIT } from "./audit-events";
import { internal, isMinorFromBirthYear, PRIVACY_NOTICE_VERSION, TERMS_VERSION, type SessionOutcome } from "./flows";
import { normalizeEmail } from "./identifiers";
import { safeNextPath } from "./redirects";
import { SELF_SERVICE_ROLES, type SelfServiceRole } from "./schemas";
import type { RequestMeta } from "./sessions";

/**
 * Google sign-in (§33 "Google login where appropriate"; ARCHITECTURE §5.1): OpenID Connect authorization code flow
 * with PKCE (S256), `state` and `nonce`. Enabled only when GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set.
 *
 * The code is exchanged server-side over TLS directly with Google's token endpoint, so the ID token's signature need
 * not be re-verified (OIDC Core §3.1.3.7); its claims are still checked: `iss`, `aud`, `exp`, `nonce`. Profile data
 * comes from the userinfo endpoint and must belong to the same `sub`. Only identity claims are stored
 * (`OAuthAccount`), never Google tokens.
 *
 * Account resolution ({@link completeGoogleLogin}):
 * 1. a linked Google identity → sign in;
 * 2. else an account with the same email that is VERIFIED on our side → auto-link, sign in;
 * 3. else an account with that email that has never verified anything and never signed in (an abandoned
 *    registration) → Google proves the email: mark it verified, drop the pre-verification password, link, sign in;
 * 4. else an account with that email in any other state → refuse ("sign in first, then link Google in settings");
 * 5. else create a new account (role from the sign-up page, STUDENT by default) → onboarding.
 */

export const GOOGLE_PROVIDER = "google";
export const GOOGLE_CALLBACK_PATH = "/api/auth/google/callback";

const AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const USERINFO_ENDPOINT = "https://openidconnect.googleapis.com/v1/userinfo";
const GOOGLE_ISSUERS = ["https://accounts.google.com", "accounts.google.com"];
const FETCH_TIMEOUT_MS = 10_000;

export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/** Google config from the environment, or `null` when Google login is not configured. */
export function getGoogleConfig(env: ServerEnv = getEnv()): GoogleConfig | null {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return null;
  return { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, redirectUri: `${env.APP_URL}${GOOGLE_CALLBACK_PATH}` };
}

/** True when the "Continue with Google" button should be shown. */
export function isGoogleLoginEnabled(): boolean {
  return getGoogleConfig() !== null;
}

/** PKCE verifier (43 base64url characters) and its S256 challenge. */
export function createPkcePair(): { verifier: string; challenge: string } {
  const verifier = randomToken(32);
  return { verifier, challenge: pkceChallenge(verifier) };
}

export function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier, "ascii").digest("base64url");
}

/** What the start route keeps (sealed) in the OAuth cookie until the callback. */
export const oauthStateSchema = z.object({
  state: z.string().min(16).max(128),
  verifier: z.string().min(43).max(128),
  nonce: z.string().min(16).max(128),
  next: z.string().max(2048).nullable(),
  role: z.enum(SELF_SERVICE_ROLES),
});
export type OAuthState = z.output<typeof oauthStateSchema>;

/** Fresh state / verifier / nonce for a sign-in attempt. */
export function createOAuthState(next: string | null | undefined, role: SelfServiceRole = "STUDENT"): OAuthState {
  return { state: randomToken(24), verifier: randomToken(32), nonce: randomToken(24), next: safeNextPath(next), role };
}

/** Google's consent-screen URL for this attempt. */
export function buildGoogleAuthorizationUrl(config: GoogleConfig, state: OAuthState): string {
  const url = new URL(AUTHORIZATION_ENDPOINT);
  url.search = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state: state.state,
    nonce: state.nonce,
    code_challenge: pkceChallenge(state.verifier),
    code_challenge_method: "S256",
    prompt: "select_account",
    access_type: "online",
  }).toString();
  return url.toString();
}

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

const tokenResponseSchema = z.object({ id_token: z.string().min(1), access_token: z.string().min(1) });

/** Exchanges the authorization code (with the PKCE verifier) for tokens. */
export async function exchangeGoogleCode(
  config: GoogleConfig,
  code: string,
  verifier: string,
  fetchImpl: FetchLike = fetch,
): Promise<{ idToken: string; accessToken: string }> {
  const response = await fetchImpl(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: verifier,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
    }).toString(),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) throw new AppError("BAD_REQUEST", "Google sign-in failed. Please try again.", { details: { status: response.status } });
  const parsed = tokenResponseSchema.safeParse(await response.json());
  if (!parsed.success) throw new AppError("BAD_REQUEST", "Google sign-in failed. Please try again.");
  return { idToken: parsed.data.id_token, accessToken: parsed.data.access_token };
}

/** Decodes a JWT payload WITHOUT verifying its signature (see the module note on why that is sound here). */
export function decodeJwtPayload(jwt: string): Record<string, unknown> | null {
  const parts = jwt.split(".");
  if (parts.length !== 3 || !parts[1]) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as unknown;
    return typeof payload === "object" && payload !== null && !Array.isArray(payload) ? (payload as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Validates the ID-token claims (pure). Returns the subject, or `null` when any check fails. */
export function validateGoogleIdTokenClaims(
  claims: Record<string, unknown> | null,
  expected: { clientId: string; nonce: string; now?: Date },
): { sub: string } | null {
  if (claims === null) return null;
  const nowSeconds = Math.floor((expected.now ?? new Date()).getTime() / 1000);
  const aud = claims.aud;
  const audiences = Array.isArray(aud) ? aud : [aud];
  if (typeof claims.iss !== "string" || !GOOGLE_ISSUERS.includes(claims.iss)) return null;
  if (!audiences.includes(expected.clientId)) return null;
  if (Array.isArray(aud) && aud.length > 1 && claims.azp !== expected.clientId) return null;
  if (typeof claims.exp !== "number" || claims.exp <= nowSeconds - 60) return null;
  if (typeof claims.nonce !== "string" || claims.nonce !== expected.nonce) return null;
  if (typeof claims.sub !== "string" || claims.sub.length === 0 || claims.sub.length > 255) return null;
  return { sub: claims.sub };
}

const userInfoSchema = z.object({
  sub: z.string().min(1).max(255),
  email: z.string().max(254).optional(),
  email_verified: z.union([z.boolean(), z.literal("true"), z.literal("false")]).optional(),
  given_name: z.string().max(200).optional(),
  family_name: z.string().max(200).optional(),
  name: z.string().max(300).optional(),
});

/** The identity claims we use. */
export interface GoogleProfile {
  sub: string;
  email: string | null;
  emailVerified: boolean;
  givenName: string | null;
  familyName: string | null;
  name: string | null;
}

/** Fetches the OIDC userinfo for an access token. */
export async function fetchGoogleUserInfo(accessToken: string, fetchImpl: FetchLike = fetch): Promise<GoogleProfile> {
  const response = await fetchImpl(USERINFO_ENDPOINT, {
    headers: { authorization: `Bearer ${accessToken}`, accept: "application/json" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) throw new AppError("BAD_REQUEST", "Google sign-in failed. Please try again.", { details: { status: response.status } });
  const parsed = userInfoSchema.safeParse(await response.json());
  if (!parsed.success) throw new AppError("BAD_REQUEST", "Google sign-in failed. Please try again.");
  const info = parsed.data;
  return {
    sub: info.sub,
    email: info.email ?? null,
    emailVerified: info.email_verified === true || info.email_verified === "true",
    givenName: info.given_name?.trim() || null,
    familyName: info.family_name?.trim() || null,
    name: info.name?.trim() || null,
  };
}

/**
 * Runs the whole callback exchange: code → tokens → claims check → userinfo (same `sub`). Throws AppError
 * BAD_REQUEST on any mismatch.
 */
export async function resolveGoogleProfile(
  config: GoogleConfig,
  state: OAuthState,
  code: string,
  fetchImpl: FetchLike = fetch,
): Promise<GoogleProfile> {
  const tokens = await exchangeGoogleCode(config, code, state.verifier, fetchImpl);
  const claims = validateGoogleIdTokenClaims(decodeJwtPayload(tokens.idToken), { clientId: config.clientId, nonce: state.nonce });
  if (claims === null) throw new AppError("BAD_REQUEST", "Google sign-in failed. Please try again.");
  const profile = await fetchGoogleUserInfo(tokens.accessToken, fetchImpl);
  if (profile.sub !== claims.sub) throw new AppError("BAD_REQUEST", "Google sign-in failed. Please try again.");
  return profile;
}

/** Why a Google sign-in could not complete (mapped to `/login?error=…`). */
export type GoogleLoginFailure = "email_unverified" | "link_required" | "account_unavailable";

/** `newAccount`: this sign-in created the account (the route then attributes a referral landing cookie, §46). */
export type GoogleLoginResult = (SessionOutcome & { newAccount?: boolean }) | { kind: "error"; reason: GoogleLoginFailure };

function firstNameFrom(profile: GoogleProfile): string {
  const fromName = profile.name?.split(/\s+/)[0];
  return (profile.givenName ?? fromName ?? "").slice(0, 100) || "New user";
}

/** Resolves (or creates) the account for a verified Google profile and signs in. See the module note for the rules. */
export async function completeGoogleLogin(
  profile: GoogleProfile,
  options: { next: string | null; role: SelfServiceRole; meta: RequestMeta },
): Promise<GoogleLoginResult> {
  const { meta } = options;
  const now = new Date();
  const linked = await db.oAuthAccount.findUnique({
    where: { provider_providerAccountId: { provider: GOOGLE_PROVIDER, providerAccountId: profile.sub } },
    select: { id: true, user: { select: { id: true, status: true, roles: true } } },
  });
  const email = profile.email ? normalizeEmail(profile.email) : null;

  if (linked) {
    if (!internal.canSignIn(linked.user.status)) return { kind: "error", reason: "account_unavailable" };
    await db.oAuthAccount.update({
      where: { id: linked.id },
      data: { lastLoginAt: now, emailNormalized: email, emailVerified: profile.emailVerified },
      select: { id: true },
    });
    return internal.startSession(linked.user, meta, { authMethod: "GOOGLE", next: options.next });
  }

  if (email === null || !profile.emailVerified) return { kind: "error", reason: "email_unverified" };
  const existing = await internal.findAccount({ kind: "email", value: email });

  if (existing) {
    if (!internal.canSignIn(existing.status)) return { kind: "error", reason: "account_unavailable" };
    if (existing._count.oauthAccounts > 0) return { kind: "error", reason: "link_required" };
    const emailVerified = existing.emailVerifiedAt !== null;
    const abandoned = internal.isReclaimableRegistration(existing);
    if (!emailVerified && !abandoned) return { kind: "error", reason: "link_required" };
    await db.$transaction(async (tx) => {
      if (!emailVerified) {
        // Google proved the email for an account nobody ever verified: drop the pre-verification password.
        await tx.user.update({
          where: { id: existing.id },
          data: { emailVerifiedAt: now, passwordHash: null, passwordUpdatedAt: now },
          select: { id: true },
        });
      }
      await tx.oAuthAccount.create({
        data: {
          userId: existing.id,
          provider: GOOGLE_PROVIDER,
          providerAccountId: profile.sub,
          emailNormalized: email,
          emailVerified: true,
          lastLoginAt: now,
        },
        select: { id: true },
      });
    });
    await audit({
      actorUserId: existing.id,
      actorRoles: existing.roles,
      action: AUTH_AUDIT.OAUTH_LINK,
      entityType: "User",
      entityId: existing.id,
      targetUserId: existing.id,
      metadata: { provider: GOOGLE_PROVIDER, emailWasVerified: emailVerified },
      request: internal.auditRequest(meta),
    });
    return internal.startSession(existing, meta, { authMethod: "GOOGLE", next: options.next });
  }

  const role = options.role;
  const firstName = firstNameFrom(profile);
  const userId = await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { emailNormalized: email, emailVerifiedAt: now, roles: [role], signupChannel: "WEB" },
      select: { id: true },
    });
    await tx.profile.create({
      data: {
        userId: user.id,
        firstName,
        lastName: profile.familyName?.slice(0, 100) ?? null,
        displayName: firstName,
        username: await internal.pickPublicUsername(tx),
        termsAcceptedAt: now,
        termsVersion: TERMS_VERSION,
        privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
      },
    });
    await internal.createRoleExtension(tx, user.id, role, { isMinor: isMinorFromBirthYear(null, now) });
    await tx.oAuthAccount.create({
      data: {
        userId: user.id,
        provider: GOOGLE_PROVIDER,
        providerAccountId: profile.sub,
        emailNormalized: email,
        emailVerified: true,
        lastLoginAt: now,
      },
      select: { id: true },
    });
    return user.id;
  });
  for (const action of [AUTH_AUDIT.REGISTER, AUTH_AUDIT.OAUTH_LINK]) {
    await audit({
      actorUserId: userId,
      actorRoles: [role],
      action,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      metadata: { provider: GOOGLE_PROVIDER, role },
      request: internal.auditRequest(meta),
    });
  }
  const outcome = await internal.startSession({ id: userId, roles: [role] }, meta, { authMethod: "GOOGLE", next: options.next });
  return { ...outcome, newAccount: true };
}
