import { describe, expect, it } from "vitest";
import {
  buildGoogleAuthorizationUrl,
  createOAuthState,
  createPkcePair,
  decodeJwtPayload,
  exchangeGoogleCode,
  fetchGoogleUserInfo,
  getGoogleConfig,
  pkceChallenge,
  validateGoogleIdTokenClaims,
  type FetchLike,
  type GoogleConfig,
} from "./google";
import { parseEnv } from "@/server/lib/env";

const config: GoogleConfig = {
  clientId: "client-123.apps.googleusercontent.com",
  clientSecret: "secret",
  redirectUri: "http://localhost:3000/api/auth/google/callback",
};

function jwt(payload: Record<string, unknown>): string {
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "RS256", typ: "JWT" })}.${encode(payload)}.signature`;
}

describe("Google configuration", () => {
  it("is enabled only with both client id and secret", () => {
    const base = { APP_URL: "http://localhost:3000", DATABASE_URL: "postgresql://x@localhost/db", SESSION_SECRET: "0123456789abcdef0123" };
    expect(getGoogleConfig(parseEnv(base))).toBeNull();
    expect(getGoogleConfig(parseEnv({ ...base, GOOGLE_CLIENT_ID: "id", GOOGLE_CLIENT_SECRET: "s" }))).toEqual({
      clientId: "id",
      clientSecret: "s",
      redirectUri: "http://localhost:3000/api/auth/google/callback",
    });
  });
});

describe("PKCE, state and authorization URL", () => {
  it("uses S256 challenges of 43-character verifiers", () => {
    const { verifier, challenge } = createPkcePair();
    expect(verifier).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(challenge).toBe(pkceChallenge(verifier));
    // RFC 7636 appendix B test vector.
    expect(pkceChallenge("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")).toBe("E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
  });

  it("builds the consent URL with state, nonce and challenge, and validates next", () => {
    const state = createOAuthState("//evil.example", "PARENT");
    expect(state.next).toBeNull();
    expect(state.role).toBe("PARENT");
    const url = new URL(buildGoogleAuthorizationUrl(config, state));
    expect(url.origin).toBe("https://accounts.google.com");
    expect(Object.fromEntries(url.searchParams)).toMatchObject({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state: state.state,
      nonce: state.nonce,
      code_challenge: pkceChallenge(state.verifier),
      code_challenge_method: "S256",
    });
    expect(url.searchParams.has("code_verifier")).toBe(false);
  });
});

describe("ID token claims", () => {
  const now = new Date("2026-10-05T08:00:00Z");
  const seconds = Math.floor(now.getTime() / 1000);
  const good = { iss: "https://accounts.google.com", aud: config.clientId, exp: seconds + 600, nonce: "n-1234567890abcdef", sub: "1098765" };
  const check = (claims: Record<string, unknown> | null) => validateGoogleIdTokenClaims(claims, { clientId: config.clientId, nonce: good.nonce, now });

  it("accepts valid claims", () => {
    expect(check(good)).toEqual({ sub: "1098765" });
    expect(check({ ...good, iss: "accounts.google.com" })).toEqual({ sub: "1098765" });
    expect(check({ ...good, aud: [config.clientId] })).toEqual({ sub: "1098765" });
  });

  it.each([
    ["wrong issuer", { iss: "https://evil.example" }],
    ["wrong audience", { aud: "someone-else" }],
    ["multi-audience without azp", { aud: [config.clientId, "other"] }],
    ["expired", { exp: seconds - 120 }],
    ["wrong nonce", { nonce: "other-nonce-000000" }],
    ["missing subject", { sub: "" }],
  ])("rejects %s", (_label, override) => {
    expect(check({ ...good, ...override })).toBeNull();
  });

  it("decodes JWT payloads defensively", () => {
    expect(decodeJwtPayload(jwt(good))).toEqual(good);
    expect(decodeJwtPayload("a.b")).toBeNull();
    expect(decodeJwtPayload("a.%%%.c")).toBeNull();
    expect(check(null)).toBeNull();
  });
});

describe("token exchange and userinfo (mocked fetch)", () => {
  it("exchanges the code with the PKCE verifier", async () => {
    const calls: { url: string; init?: RequestInit }[] = [];
    const fetchMock: FetchLike = async (url, init) => {
      calls.push({ url, init });
      return Response.json({ id_token: "header.payload.sig", access_token: "ya29.token", token_type: "Bearer" });
    };
    const tokens = await exchangeGoogleCode(config, "auth-code", "verifier-value", fetchMock);
    expect(tokens).toEqual({ idToken: "header.payload.sig", accessToken: "ya29.token" });
    expect(calls[0]?.url).toBe("https://oauth2.googleapis.com/token");
    const sent = new URLSearchParams(String(calls[0]?.init?.body));
    expect(Object.fromEntries(sent)).toEqual({
      grant_type: "authorization_code",
      code: "auth-code",
      code_verifier: "verifier-value",
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
    });
  });

  it("fails cleanly on provider errors", async () => {
    const failing: FetchLike = async () => new Response("nope", { status: 400 });
    await expect(exchangeGoogleCode(config, "x", "y", failing)).rejects.toThrow(/Google sign-in failed/);
    const garbage: FetchLike = async () => Response.json({ unexpected: true });
    await expect(fetchGoogleUserInfo("token", garbage)).rejects.toThrow(/Google sign-in failed/);
  });

  it("maps userinfo claims", async () => {
    const fetchMock: FetchLike = async (_url, init) => {
      expect(new Headers(init?.headers).get("authorization")).toBe("Bearer ya29.token");
      return Response.json({ sub: "42", email: "Rudo@Gmail.com", email_verified: "true", given_name: " Rudo ", name: "Rudo Moyo" });
    };
    expect(await fetchGoogleUserInfo("ya29.token", fetchMock)).toEqual({
      sub: "42",
      email: "Rudo@Gmail.com",
      emailVerified: true,
      givenName: "Rudo",
      familyName: null,
      name: "Rudo Moyo",
    });
  });
});
