import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { resetEnvCache } from "@/server/lib/env";
import { createUser, uniqueEmail, uniquePhone, uniqueSuffix } from "../../../tests/factories/index";
import { parseCookieHeader } from "./cookies";
import { trustedDeviceFor } from "./device-trust";
import type { FetchLike } from "./google";
import { handleGoogleCallback, handleGoogleStart } from "./google-handlers";
import { validateSessionToken } from "./sessions";
import { randomIp } from "./testing";

const CLIENT_ID = "test-client.apps.googleusercontent.com";
const ORIGIN = "http://localhost:3000";

beforeAll(() => {
  process.env.GOOGLE_CLIENT_ID = CLIENT_ID;
  process.env.GOOGLE_CLIENT_SECRET = "test-client-secret";
  resetEnvCache();
});

function jwt(payload: Record<string, unknown>): string {
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "RS256" })}.${encode(payload)}.sig`;
}

/** `Set-Cookie` values of a response, by cookie name. */
function setCookies(response: Response): Map<string, string> {
  const result = new Map<string, string>();
  for (const header of response.headers.getSetCookie()) {
    const [pair] = header.split(";");
    const eq = pair!.indexOf("=");
    result.set(pair!.slice(0, eq), decodeURIComponent(pair!.slice(eq + 1)));
  }
  return result;
}

interface GoogleIdentity {
  sub: string;
  email: string | null;
  emailVerified?: boolean;
  givenName?: string;
}

/** Runs start → (fake Google) → callback and returns the callback response. */
async function signInWithGoogle(identity: GoogleIdentity, options: { next?: string; role?: string; tamperState?: boolean; extraCookie?: string } = {}) {
  const ip = randomIp();
  const query = new URLSearchParams();
  if (options.next) query.set("next", options.next);
  if (options.role) query.set("role", options.role);
  const start = await handleGoogleStart(new Request(`${ORIGIN}/api/auth/google/start?${query}`, { headers: { "x-forwarded-for": ip } }));
  expect(start.status).toBe(303);
  const authorizeUrl = new URL(start.headers.get("location")!);
  expect(authorizeUrl.origin).toBe("https://accounts.google.com");
  const oauthCookie = setCookies(start).get("dz_oauth");
  expect(oauthCookie).toBeTruthy();
  const state = authorizeUrl.searchParams.get("state")!;
  const nonce = authorizeUrl.searchParams.get("nonce")!;

  const fetchMock: FetchLike = async (url) => {
    if (url.startsWith("https://oauth2.googleapis.com/token")) {
      const idToken = jwt({ iss: "https://accounts.google.com", aud: CLIENT_ID, exp: Math.floor(Date.now() / 1000) + 600, nonce, sub: identity.sub });
      return Response.json({ id_token: idToken, access_token: "ya29.test" });
    }
    return Response.json({
      sub: identity.sub,
      ...(identity.email ? { email: identity.email } : {}),
      email_verified: identity.emailVerified ?? true,
      given_name: identity.givenName ?? "Tafadzwa",
      family_name: "Moyo",
    });
  };
  const callbackUrl = `${ORIGIN}/api/auth/google/callback?code=auth-code&state=${options.tamperState ? "forged-state-value" : state}`;
  return handleGoogleCallback(
    new Request(callbackUrl, { headers: { cookie: `dz_oauth=${oauthCookie}${options.extraCookie ? `; ${options.extraCookie}` : ""}`, "x-forwarded-for": ip } }),
    { fetch: fetchMock },
  );
}

function errorOf(response: Response): string | null {
  return new URL(response.headers.get("location")!).searchParams.get("error");
}

describe("Google sign-in", () => {
  it("attributes a Google sign-UP to the referral landing cookie and clears it; a sign-in never does", async () => {
    const { createLearner } = await import("../../../tests/factories/index");
    const { getOrCreateReferralCode } = await import("@/server/referrals/service");
    const referrer = await createLearner();
    const { code } = await getOrCreateReferralCode(referrer.actor);
    const email = uniqueEmail("google-ref");
    const sub = `g-${uniqueSuffix()}`;
    const response = await signInWithGoogle({ sub, email }, { extraCookie: `dz_ref=${code}` });
    expect(setCookies(response).get("dz_ref")).toBe("");
    const user = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, select: { id: true } });
    expect(await db.referral.findUnique({ where: { referredUserId: user.id }, select: { referrerUserId: true } })).toEqual({ referrerUserId: referrer.userId });

    // Signing in again with the cookie still present attributes nothing new (and leaves the cookie alone).
    const again = await signInWithGoogle({ sub, email }, { extraCookie: `dz_ref=${code}` });
    expect(setCookies(again).has("dz_ref")).toBe(false);
    expect(await db.referral.count({ where: { referredUserId: user.id } })).toBe(1);
  });

  it("creates a student account for a new verified Google identity and sends it to onboarding", async () => {
    const email = uniqueEmail("google-new");
    const sub = `g-${uniqueSuffix()}`;
    const response = await signInWithGoogle({ sub, email: email.toUpperCase() }, { next: "/app/practice" });
    expect(response.status).toBe(303);
    // Onboarding first; the wizard continues to the page the student wanted afterwards.
    expect(response.headers.get("location")).toBe(`${ORIGIN}/onboarding?next=%2Fapp%2Fpractice`);
    const cookies = setCookies(response);
    expect(cookies.get("dz_oauth")).toBe("");
    const token = cookies.get("dz_session")!;
    const validated = await validateSessionToken(token, { kind: "WEB" });
    expect(validated?.session.authMethod).toBe("GOOGLE");

    const user = await db.user.findUniqueOrThrow({
      where: { emailNormalized: email },
      include: { oauthAccounts: true, profile: true, student: true },
    });
    expect(user.roles).toEqual(["STUDENT"]);
    expect(user.emailVerifiedAt).not.toBeNull();
    expect(user.passwordHash).toBeNull();
    expect(user.oauthAccounts).toMatchObject([{ provider: "google", providerAccountId: sub, emailVerified: true }]);
    expect(user.profile).toMatchObject({ firstName: "Tafadzwa", lastName: "Moyo" });
    expect(user.student?.isMinor).toBe(true);
    // The browser is remembered for the account (its correct passwords skip lockouts, ./device-trust).
    expect(await trustedDeviceFor(cookies.get("dz_device"), user.id)).not.toBeNull();

    // Signing in again finds the linked identity (no duplicate account).
    const again = await signInWithGoogle({ sub, email });
    expect(again.headers.get("location")).toBe(`${ORIGIN}/onboarding`);
    expect(await db.oAuthAccount.count({ where: { providerAccountId: sub } })).toBe(1);
  });

  it("creates a parent when started from the parent sign-up", async () => {
    const email = uniqueEmail("google-parent");
    const response = await signInWithGoogle({ sub: `g-${uniqueSuffix()}`, email }, { role: "parent" });
    expect(response.headers.get("location")).toBe(`${ORIGIN}/parent`);
    const user = await db.user.findUniqueOrThrow({ where: { emailNormalized: email }, include: { parent: true } });
    expect(user.roles).toEqual(["PARENT"]);
    expect(user.parent).not.toBeNull();
  });

  it("auto-links an existing account whose email is verified, honouring next", async () => {
    const { user } = await createUser({ roles: ["TEACHER"], emailVerified: true });
    const sub = `g-${uniqueSuffix()}`;
    const response = await signInWithGoogle({ sub, email: user.emailNormalized! }, { next: "/teacher/classes" });
    expect(response.headers.get("location")).toBe(`${ORIGIN}/teacher/classes`);
    const linked = await db.oAuthAccount.findFirstOrThrow({ where: { providerAccountId: sub } });
    expect(linked.userId).toBe(user.id);
    const actions = await db.auditLog.findMany({ where: { targetUserId: user.id }, select: { action: true } });
    expect(actions.map((row) => row.action)).toEqual(expect.arrayContaining(["auth.oauth.link", "auth.login.success"]));
  });

  it("brings the account's saved theme and text size to this device", async () => {
    const { user } = await createUser({ roles: ["STUDENT"], emailVerified: true });
    await db.profile.upsert({ where: { userId: user.id }, create: { userId: user.id, theme: "DARK", fontScale: "LARGE" }, update: { theme: "DARK", fontScale: "LARGE" } });
    const response = await signInWithGoogle({ sub: `g-${uniqueSuffix()}`, email: user.emailNormalized! });
    const cookies = setCookies(response);
    expect(cookies.get("dz_session")).toBeTruthy();
    expect(cookies.get("dz_theme")).toBe("dark");
    expect(cookies.get("dz_font_scale")).toBe("lg");
    const theme = response.headers.getSetCookie().find((cookie) => cookie.startsWith("dz_theme="));
    expect(theme).toContain("SameSite=Lax");
    expect(theme).not.toContain("HttpOnly");
  });

  it("refuses to link an account whose email is unverified but which is otherwise in use", async () => {
    const { user } = await createUser({ roles: ["STUDENT"], phone: uniquePhone() });
    await db.user.update({ where: { id: user.id }, data: { phoneVerifiedAt: new Date() } });
    const response = await signInWithGoogle({ sub: `g-${uniqueSuffix()}`, email: user.emailNormalized! });
    expect(errorOf(response)).toBe("google_link_required");
    expect(response.headers.getSetCookie().some((cookie) => cookie.startsWith("dz_session="))).toBe(false);
  });

  it("takes over an abandoned registration (Google proves the email): verifies it and drops the old password", async () => {
    const { user } = await createUser({ roles: ["STUDENT"], passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHQ$aGFzaA" });
    const response = await signInWithGoogle({ sub: `g-${uniqueSuffix()}`, email: user.emailNormalized! });
    expect(response.headers.get("location")).toBe(`${ORIGIN}/onboarding`);
    const after = await db.user.findUniqueOrThrow({ where: { id: user.id } });
    expect(after.emailVerifiedAt).not.toBeNull();
    expect(after.passwordHash).toBeNull();
  });

  it("refuses unverified Google emails and suspended accounts", async () => {
    const unverified = await signInWithGoogle({ sub: `g-${uniqueSuffix()}`, email: uniqueEmail("g-unverified"), emailVerified: false });
    expect(errorOf(unverified)).toBe("google_email_unverified");

    const { user } = await createUser({ roles: ["STUDENT"], emailVerified: true, status: "SUSPENDED" });
    const suspended = await signInWithGoogle({ sub: `g-${uniqueSuffix()}`, email: user.emailNormalized! });
    expect(errorOf(suspended)).toBe("google_account_unavailable");
  });

  it("rejects a forged state, a missing cookie and provider errors", async () => {
    const forged = await signInWithGoogle({ sub: `g-${uniqueSuffix()}`, email: uniqueEmail("g-forged") }, { tamperState: true });
    expect(errorOf(forged)).toBe("google_failed");

    const noCookie = await handleGoogleCallback(new Request(`${ORIGIN}/api/auth/google/callback?code=x&state=y`));
    expect(errorOf(noCookie)).toBe("google_failed");

    const cancelled = await handleGoogleCallback(new Request(`${ORIGIN}/api/auth/google/callback?error=access_denied`));
    expect(errorOf(cancelled)).toBe("google_cancelled");
    expect(parseCookieHeader(cancelled.headers.getSetCookie().join("; ")).get("dz_oauth")).toBe("");
  });
});
