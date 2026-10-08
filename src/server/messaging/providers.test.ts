import { afterEach, describe, expect, it } from "vitest";
import { APP_NAME } from "@/lib/config";
import { getEnv } from "@/server/lib/env";
import { isAppError } from "@/server/lib/errors";
import { describeJobError, isPermanentJobError } from "@/server/lib/jobs";
import { createLogger } from "@/server/lib/logger";
import { ConsoleDriver } from "./console-driver";
import { buildResendEmail, classifyResendError, ResendEmailDriver, resendTagValue } from "./email-resend";
import { MessagingProviderError, parseRetryAfter, safeProviderText } from "./http";
import { otpRetryDelayMs, sendOtpMessage } from "./otp";
import { emailProviderFromEnv, smsProviderFromEnv, UnconfiguredProvider } from "./providers";
import { resolveMessagingChannel, setMessagingChannel } from "./send";
import { AfricasTalkingSmsDriver, classifyAfricasTalkingRecipient } from "./sms-africastalking";
import { classifyTwilioError, TwilioSmsDriver } from "./sms-twilio";
import type { MessagingChannel, OutboundMessage, SendResult } from "./types";

// ---------------------------------------------------------------------------------------------------------------------
// Test doubles (no network: every adapter gets a fake fetch)
// ---------------------------------------------------------------------------------------------------------------------

interface Captured {
  url: string;
  method: string;
  headers: Headers;
  body: string;
}

type FakeReply = Response | Error | "hang";

/** A fetch double that records requests and answers from a queue. `"hang"` never answers (until the abort). */
function fakeFetch(...replies: FakeReply[]): { fetch: typeof fetch; calls: Captured[] } {
  const calls: Captured[] = [];
  const impl = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    calls.push({ url: String(input), method: init?.method ?? "GET", headers: new Headers(init?.headers), body: String(init?.body ?? "") });
    const next = replies.shift();
    if (next === undefined) return Promise.reject(new Error("fakeFetch: no reply queued"));
    if (next === "hang") {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(new DOMException("The operation was aborted.", "AbortError")));
      });
    }
    if (next instanceof Error) return Promise.reject(next);
    return Promise.resolve(next);
  };
  return { fetch: impl as typeof fetch, calls };
}

function capture(): { lines: string[]; logger: ReturnType<typeof createLogger> } {
  const lines: string[] = [];
  return { lines, logger: createLogger({ level: "debug", format: "json", write: (line) => lines.push(line) }) };
}

async function failure(promise: Promise<unknown>): Promise<MessagingProviderError> {
  const error = await promise.then(
    () => null,
    (caught: unknown) => caught,
  );
  expect(error).toBeInstanceOf(MessagingProviderError);
  return error as MessagingProviderError;
}

const OTP_TEXT = `Your ${APP_NAME} sign-in code is 482913. It expires in 10 minutes. Never share this code with anyone.`;
const ZW_NUMBER = "+263771234567";

const baseEnv = {
  NODE_ENV: "test",
  APP_URL: "http://localhost:3000",
  DATABASE_URL: "postgresql://x@localhost:5433/x_test",
  SESSION_SECRET: "test-only-session-secret-not-for-real-use-0123456789",
};

// ---------------------------------------------------------------------------------------------------------------------
// Resend (email)
// ---------------------------------------------------------------------------------------------------------------------

const RESEND_KEY = "re_test_key_not_real_0123456789";

function resend(fetchImpl: typeof fetch, options: { logger?: ReturnType<typeof createLogger>; timeoutMs?: number } = {}) {
  return new ResendEmailDriver(
    { apiKey: RESEND_KEY, from: "Learning Platform <no-reply@mail.dzidza.test>", replyTo: "support@dzidza.test" },
    { fetch: fetchImpl, logger: options.logger ?? createLogger({ level: "silent" }), ...(options.timeoutMs ? { timeoutMs: options.timeoutMs } : {}) },
  );
}

const email: OutboundMessage = {
  channel: "email",
  to: "tendai@example.test",
  subject: `Your ${APP_NAME} code`,
  text: OTP_TEXT,
  tag: "otp.LOGIN_OTP",
  sensitive: true,
};

describe("ResendEmailDriver", () => {
  it("POSTs the documented JSON with a bearer key and returns the email id (success)", async () => {
    const { fetch, calls } = fakeFetch(Response.json({ id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794" }));
    const { lines, logger } = capture();
    const result = await resend(fetch, { logger }).send({ ...email, idempotencyKey: "notification:abc:EMAIL" });

    expect(result).toEqual({ providerRef: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794", driver: "resend" });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.url).toBe("https://api.resend.com/emails");
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.headers.get("authorization")).toBe(`Bearer ${RESEND_KEY}`);
    expect(calls[0]?.headers.get("content-type")).toBe("application/json");
    expect(calls[0]?.headers.get("idempotency-key")).toBe("notification:abc:EMAIL");
    const body = JSON.parse(calls[0]?.body ?? "{}") as Record<string, unknown>;
    expect(body).toMatchObject({
      from: "Learning Platform <no-reply@mail.dzidza.test>",
      to: ["tendai@example.test"],
      subject: `Your ${APP_NAME} code`,
      text: OTP_TEXT,
      reply_to: "support@dzidza.test",
      tags: [{ name: "category", value: "otp_LOGIN_OTP" }],
    });
    expect(String(body.html)).toContain("482913");

    // One redacted log line: no code, no key, no full address, no subject.
    expect(lines).toHaveLength(1);
    const log = lines.join("\n");
    for (const secret of ["482913", RESEND_KEY, "tendai@example.test", "sign-in code"]) expect(log).not.toContain(secret);
    expect(log).toContain("t***@example.test");
  });

  it("treats a 422 for the recipient as permanent (job FAILED, user-safe message)", async () => {
    const { fetch } = fakeFetch(
      Response.json({ statusCode: 422, name: "validation_error", message: "Invalid `to` field. tendai@example.test is not valid." }, { status: 422 }),
    );
    const error = await failure(resend(fetch).send(email));
    expect(error).toMatchObject({ reason: "recipient", retryable: false, providerStatus: 422, providerCode: "validation_error", code: "BAD_REQUEST" });
    expect(isPermanentJobError(error)).toBe(true);
    expect(error.message).toMatch(/^We couldn't deliver a message to that address/);
    expect(describeJobError(error)).not.toContain("tendai@example.test");
    expect(JSON.stringify(error.details)).not.toContain("tendai@example.test");
  });

  it("treats auth / unverified-domain errors as retryable configuration problems", async () => {
    const unauthorised = await failure(
      resend(fakeFetch(Response.json({ statusCode: 401, name: "missing_api_key", message: "Missing API key" }, { status: 401 })).fetch).send(email),
    );
    expect(unauthorised).toMatchObject({ reason: "auth", retryable: true, code: "INTERNAL" });
    const domain = await failure(
      resend(fakeFetch(Response.json({ statusCode: 403, name: "validation_error", message: "The dzidza.test domain is not verified." }, { status: 403 })).fetch).send(email),
    );
    expect(domain).toMatchObject({ reason: "config", retryable: true });
    expect(isPermanentJobError(domain)).toBe(false);
    expect(classifyResendError(422, "invalid_from_address", "Invalid from")).toBe("config");
    expect(classifyResendError(422, "missing_required_field", "Missing subject")).toBe("rejected");
    expect(classifyResendError(429, "daily_quota_exceeded", null)).toBe("rate_limited");
  });

  it("treats 5xx and 429 as retryable (the job backs off) and keeps Retry-After", async () => {
    const outage = await failure(
      resend(fakeFetch(Response.json({ statusCode: 500, name: "internal_server_error", message: "Unexpected error" }, { status: 500 })).fetch).send(email),
    );
    expect(outage).toMatchObject({ reason: "unavailable", retryable: true, providerStatus: 500, code: "INTERNAL" });
    expect(isPermanentJobError(outage)).toBe(false);

    const limited = await failure(
      resend(
        fakeFetch(Response.json({ name: "rate_limit_exceeded", message: "Too many requests" }, { status: 429, headers: { "retry-after": "2" } })).fetch,
      ).send(email),
    );
    expect(limited).toMatchObject({ reason: "rate_limited", retryable: true, retryAfterSeconds: 2 });
  });

  it("times out (retryable) and reports network failures without echoing the URL", async () => {
    const { lines, logger } = capture();
    const timedOut = await failure(resend(fakeFetch("hang").fetch, { logger, timeoutMs: 20 }).send(email));
    expect(timedOut).toMatchObject({ reason: "timeout", retryable: true, providerStatus: null });
    expect(lines.join("\n")).not.toContain(RESEND_KEY);

    const refused = new TypeError("fetch failed", { cause: Object.assign(new Error("connect ECONNREFUSED"), { code: "ECONNREFUSED" }) });
    const network = await failure(resend(fakeFetch(refused).fetch).send(email));
    expect(network).toMatchObject({ reason: "network", retryable: true });
    expect(network.message).toContain("ECONNREFUSED");
  });

  it("does not trust a 2xx without an id (and does not retry it: the email may have gone)", async () => {
    const error = await failure(resend(fakeFetch(new Response("OK", { status: 200 })).fetch).send(email));
    expect(error).toMatchObject({ reason: "invalid_response", retryable: false });
  });

  it("builds a safe HTML part and a fallback subject", () => {
    const body = buildResendEmail(
      { from: "x@dzidza.test" },
      { channel: "email", to: "a@b.test", text: "Hi <b>there</b> & welcome.\n\nOpen https://learn.dzidza.test/app?x=1&y=2.", tag: "t" },
    );
    expect(body.subject).toBe(APP_NAME);
    expect(body).not.toHaveProperty("reply_to");
    const html = String(body.html);
    expect(html).toContain("Hi &lt;b&gt;there&lt;/b&gt; &amp; welcome.");
    expect(html).toContain('<a href="https://learn.dzidza.test/app?x=1&amp;y=2">https://learn.dzidza.test/app?x=1&amp;y=2</a>.');
    expect(html).not.toContain("<b>");
    expect(resendTagValue("notification.STREAK_RISK")).toBe("notification_STREAK_RISK");
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Twilio (SMS)
// ---------------------------------------------------------------------------------------------------------------------

const TWILIO_SID = `AC${"a1".repeat(16)}`;
const TWILIO_TOKEN = "twilio-auth-token-not-real-0123";

function twilio(fetchImpl: typeof fetch, options: { logger?: ReturnType<typeof createLogger>; timeoutMs?: number; service?: boolean } = {}) {
  return new TwilioSmsDriver(
    options.service
      ? { accountSid: TWILIO_SID, authToken: TWILIO_TOKEN, messagingServiceSid: `MG${"b2".repeat(16)}` }
      : { accountSid: TWILIO_SID, authToken: TWILIO_TOKEN, from: "DZIDZA" },
    { fetch: fetchImpl, logger: options.logger ?? createLogger({ level: "silent" }), ...(options.timeoutMs ? { timeoutMs: options.timeoutMs } : {}) },
  );
}

const sms: OutboundMessage = { channel: "sms", to: ZW_NUMBER, text: OTP_TEXT, tag: "otp.LOGIN_OTP", sensitive: true };

describe("TwilioSmsDriver", () => {
  it("POSTs a form with basic auth to the account's Messages endpoint (success)", async () => {
    const { fetch, calls } = fakeFetch(Response.json({ sid: `SM${"c3".repeat(16)}`, status: "queued", error_code: null }, { status: 201 }));
    const { lines, logger } = capture();
    const result = await twilio(fetch, { logger }).send(sms);

    expect(result).toEqual({ providerRef: `SM${"c3".repeat(16)}`, driver: "twilio" });
    expect(calls[0]?.url).toBe(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`);
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.headers.get("authorization")).toBe(`Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64")}`);
    expect(calls[0]?.headers.get("content-type")).toBe("application/x-www-form-urlencoded");
    const form = new URLSearchParams(calls[0]?.body);
    expect(form.get("To")).toBe(ZW_NUMBER);
    expect(form.get("From")).toBe("DZIDZA");
    expect(form.get("Body")).toBe(OTP_TEXT);
    expect(form.has("MessagingServiceSid")).toBe(false);

    const log = lines.join("\n");
    for (const secret of ["482913", TWILIO_TOKEN, ZW_NUMBER, "771234567"]) expect(log).not.toContain(secret);
    expect(log).toContain('"network":"econet"');
    expect(log).toContain('"segments":1');
  });

  it("uses the Messaging Service when configured and normalises national Zimbabwean numbers to E.164", async () => {
    const { fetch, calls } = fakeFetch(Response.json({ sid: `SM${"d4".repeat(16)}`, status: "accepted" }, { status: 201 }));
    await twilio(fetch, { service: true }).send({ ...sms, to: "+263 71 234 5678" });
    const form = new URLSearchParams(calls[0]?.body);
    expect(form.get("To")).toBe("+263712345678");
    expect(form.get("MessagingServiceSid")).toBe(`MG${"b2".repeat(16)}`);
    expect(form.has("From")).toBe(false);
  });

  it("classifies 4xx: invalid number permanent, Geo Permissions / auth retryable", async () => {
    const invalid = await failure(
      twilio(
        fakeFetch(Response.json({ code: 21211, message: "The 'To' number +263771234567 is not a valid phone number.", status: 400 }, { status: 400 })).fetch,
      ).send(sms),
    );
    expect(invalid).toMatchObject({ reason: "recipient", retryable: false, providerCode: "21211", code: "BAD_REQUEST" });
    expect(isPermanentJobError(invalid)).toBe(true);
    expect(JSON.stringify(invalid.details)).not.toContain("771234567");
    expect(describeJobError(invalid)).not.toContain("771234567");

    const geo = await failure(
      twilio(fakeFetch(Response.json({ code: 21408, message: "Permission to send an SMS has not been enabled for the region", status: 400 }, { status: 400 })).fetch).send(sms),
    );
    expect(geo).toMatchObject({ reason: "config", retryable: true, code: "INTERNAL" });

    const auth = await failure(
      twilio(fakeFetch(Response.json({ code: 20003, message: "Authenticate", status: 401 }, { status: 401 })).fetch).send(sms),
    );
    expect(auth).toMatchObject({ reason: "auth", retryable: true });
    expect(classifyTwilioError(400, 21610)).toBe("recipient");
    expect(classifyTwilioError(400, 99999)).toBe("rejected");
  });

  it("classifies 5xx and 429 as retryable", async () => {
    const outage = await failure(twilio(fakeFetch(new Response("Service Unavailable", { status: 503 })).fetch).send(sms));
    expect(outage).toMatchObject({ reason: "unavailable", retryable: true, providerStatus: 503 });
    const limited = await failure(
      twilio(fakeFetch(Response.json({ code: 20429, message: "Too Many Requests" }, { status: 429, headers: { "retry-after": "1" } })).fetch).send(sms),
    );
    expect(limited).toMatchObject({ reason: "rate_limited", retryable: true, retryAfterSeconds: 1 });
  });

  it("times out as a retryable failure", async () => {
    const error = await failure(twilio(fakeFetch("hang").fetch, { timeoutMs: 20 }).send(sms));
    expect(error).toMatchObject({ reason: "timeout", retryable: true });
  });

  it("refuses numbers that cannot receive SMS before spending money", async () => {
    const { fetch, calls } = fakeFetch();
    // A Harare fixed line (no SMS) and a Zimbabwean number one digit short.
    for (const to of ["+263242123456", "+2637712345"]) {
      const error = await twilio(fetch).send({ ...sms, to }).catch((caught: unknown) => caught);
      expect(isAppError(error) && error.code, to).toBe("BAD_REQUEST");
    }
    expect(calls).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Africa's Talking (SMS)
// ---------------------------------------------------------------------------------------------------------------------

const AT_KEY = "atsk_not_a_real_key_0123456789abcdef";

function africasTalking(
  fetchImpl: typeof fetch,
  options: { logger?: ReturnType<typeof createLogger>; timeoutMs?: number; username?: string; senderId?: string } = {},
) {
  return new AfricasTalkingSmsDriver(
    { username: options.username ?? "dzidza", apiKey: AT_KEY, senderId: options.senderId },
    { fetch: fetchImpl, logger: options.logger ?? createLogger({ level: "silent" }), ...(options.timeoutMs ? { timeoutMs: options.timeoutMs } : {}) },
  );
}

function atReply(recipient: Record<string, unknown> | null, message = "Sent to 1/1 Total Cost: USD 0.0200", status = 201): Response {
  return Response.json({ SMSMessageData: { Message: message, Recipients: recipient ? [recipient] : [] } }, { status });
}

describe("AfricasTalkingSmsDriver", () => {
  it("POSTs username/to/message/from with the apiKey header and returns the message id (success)", async () => {
    const { fetch, calls } = fakeFetch(
      atReply({ statusCode: 101, number: ZW_NUMBER, status: "Success", cost: "USD 0.0200", messageId: "ATXid_4f2b0a9e1c" }),
    );
    const { lines, logger } = capture();
    const result = await africasTalking(fetch, { logger, senderId: "DZIDZA" }).send(sms);

    expect(result).toEqual({ providerRef: "ATXid_4f2b0a9e1c", driver: "africastalking" });
    expect(calls[0]?.url).toBe("https://api.africastalking.com/version1/messaging");
    expect(calls[0]?.headers.get("apikey")).toBe(AT_KEY);
    expect(calls[0]?.headers.get("accept")).toBe("application/json");
    expect(calls[0]?.headers.get("content-type")).toBe("application/x-www-form-urlencoded");
    const form = new URLSearchParams(calls[0]?.body);
    expect(Object.fromEntries(form)).toEqual({ username: "dzidza", to: ZW_NUMBER, message: OTP_TEXT, from: "DZIDZA" });

    const log = lines.join("\n");
    for (const secret of ["482913", AT_KEY, ZW_NUMBER]) expect(log).not.toContain(secret);
  });

  it("uses the sandbox host for the sandbox username and omits `from` without a sender ID", async () => {
    const { fetch, calls } = fakeFetch(atReply({ statusCode: 102, status: "Queued", messageId: "ATXid_sandbox" }));
    await africasTalking(fetch, { username: "sandbox" }).send({ ...sms, to: "0731234567" });
    expect(calls[0]?.url).toBe("https://api.sandbox.africastalking.com/version1/messaging");
    const form = new URLSearchParams(calls[0]?.body);
    expect(form.get("to")).toBe("+263731234567");
    expect(form.has("from")).toBe(false);
  });

  it("classifies per-recipient failures inside a 201 (4xx-style status codes)", async () => {
    const invalid = await failure(
      africasTalking(fakeFetch(atReply({ statusCode: 403, number: ZW_NUMBER, status: "InvalidPhoneNumber", messageId: "None" }, "Sent to 0/1")).fetch).send(sms),
    );
    expect(invalid).toMatchObject({ reason: "recipient", retryable: false, providerCode: "InvalidPhoneNumber", code: "BAD_REQUEST" });
    expect(isPermanentJobError(invalid)).toBe(true);

    const balance = await failure(
      africasTalking(fakeFetch(atReply({ statusCode: 405, status: "InsufficientBalance", messageId: "None" }, "Sent to 0/1")).fetch).send(sms),
    );
    expect(balance).toMatchObject({ reason: "config", retryable: true, code: "INTERNAL" });

    const sender = await failure(africasTalking(fakeFetch(atReply(null, "InvalidSenderId")).fetch).send(sms));
    expect(sender).toMatchObject({ reason: "config", retryable: true });

    expect(classifyAfricasTalkingRecipient(407, "CouldNotRoute")).toBe("recipient");
    expect(classifyAfricasTalkingRecipient(501, "GatewayError")).toBe("unavailable");
    expect(classifyAfricasTalkingRecipient(502, "RejectedByGateway")).toBe("rejected");
  });

  it("classifies HTTP 4xx (plain-text bodies) and 5xx", async () => {
    const auth = await failure(africasTalking(fakeFetch(new Response("The supplied authentication is invalid", { status: 401 })).fetch).send(sms));
    expect(auth).toMatchObject({ reason: "auth", retryable: true, providerStatus: 401 });

    const bad = await failure(africasTalking(fakeFetch(new Response("Request is missing required form field 'to'", { status: 400 })).fetch).send(sms));
    expect(bad).toMatchObject({ reason: "rejected", retryable: false, code: "BAD_REQUEST" });

    const outage = await failure(africasTalking(fakeFetch(new Response("Internal Server Error", { status: 500 })).fetch).send(sms));
    expect(outage).toMatchObject({ reason: "unavailable", retryable: true });
    expect(isPermanentJobError(outage)).toBe(false);

    const recipientInRecipients = await failure(
      africasTalking(fakeFetch(atReply({ statusCode: 500, status: "InternalServerError", messageId: "None" })).fetch).send(sms),
    );
    expect(recipientInRecipients).toMatchObject({ reason: "unavailable", retryable: true });
  });

  it("times out as a retryable failure", async () => {
    const error = await failure(africasTalking(fakeFetch("hang").fetch, { timeoutMs: 20 }).send(sms));
    expect(error).toMatchObject({ reason: "timeout", retryable: true });
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Shared helpers, selection and the OTP retry
// ---------------------------------------------------------------------------------------------------------------------

describe("provider error helpers", () => {
  it("scrubs provider free text and parses Retry-After", () => {
    expect(safeProviderText("The 'To' number 263771234567 is invalid for a@b.example")).toBe("The 'To' number [NUMBER] is invalid for [EMAIL]");
    expect(safeProviderText("call +263 77 123 4567 now")).not.toMatch(/\d{3}/);
    expect(safeProviderText(42)).toBeNull();
    expect(safeProviderText("x".repeat(500))?.length).toBeLessThanOrEqual(160);
    expect(parseRetryAfter("5")).toBe(5);
    expect(parseRetryAfter("99999")).toBe(3600);
    expect(parseRetryAfter(new Date(Date.UTC(2026, 9, 7, 12, 0, 30)).toUTCString(), new Date(Date.UTC(2026, 9, 7, 12, 0, 0)))).toBe(30);
    expect(parseRetryAfter("soon")).toBeUndefined();
    expect(parseRetryAfter(null)).toBeUndefined();
  });
});

describe("provider selection", () => {
  const resendEnv = { ...baseEnv, EMAIL_PROVIDER: "resend", RESEND_API_KEY: RESEND_KEY, EMAIL_FROM: "Learning Platform <no-reply@mail.dzidza.test>" };
  const twilioEnv = { ...baseEnv, SMS_PROVIDER: "twilio", TWILIO_ACCOUNT_SID: TWILIO_SID, TWILIO_AUTH_TOKEN: TWILIO_TOKEN, TWILIO_FROM: "+15005550006" };
  const atEnv = { ...baseEnv, SMS_PROVIDER: "africastalking", AFRICASTALKING_USERNAME: "dzidza", AFRICASTALKING_API_KEY: AT_KEY };

  it("maps EMAIL_PROVIDER / SMS_PROVIDER to the real adapters", () => {
    expect(resolveMessagingChannel("email", getEnv(resendEnv))).toBeInstanceOf(ResendEmailDriver);
    expect(resolveMessagingChannel("sms", getEnv(twilioEnv))).toBeInstanceOf(TwilioSmsDriver);
    expect(resolveMessagingChannel("sms", getEnv(atEnv))).toBeInstanceOf(AfricasTalkingSmsDriver);
    expect(emailProviderFromEnv(getEnv(baseEnv))).toBeNull();
    expect(smsProviderFromEnv(getEnv(baseEnv))).toBeNull();
    // Unknown names stay a fail-loud stub in dev/test.
    expect(resolveMessagingChannel("email", getEnv({ ...baseEnv, EMAIL_PROVIDER: "smtp" }))).toBeInstanceOf(UnconfiguredProvider);
  });

  it("resolves real adapters in production", () => {
    const prod = getEnv({
      ...resendEnv,
      ...atEnv,
      NODE_ENV: "production",
      APP_URL: "https://learn.dzidza.test",
      SESSION_SECRET: "production-like-session-secret-0123456789-abcdefghijklmnopqrstuvwxyz",
      TRUSTED_PROXY_HOPS: "1",
    });
    expect(resolveMessagingChannel("email", prod).driver).toBe("resend");
    expect(resolveMessagingChannel("sms", prod).driver).toBe("africastalking");
  });
});

describe("sendOtpMessage retry", () => {
  // Codes go by email (account email: always sent, whatever `features.email` says; owner decision 2026-10-07).
  afterEach(() => setMessagingChannel("email", null));

  /** An email adapter that fails with the queued errors, then succeeds. */
  function flaky(...errors: Error[]): MessagingChannel & { attempts: number } {
    return {
      channel: "email",
      driver: "flaky",
      attempts: 0,
      async send(): Promise<SendResult> {
        this.attempts += 1;
        const next = errors.shift();
        if (next) throw next;
        return { providerRef: `ref-${this.attempts}`, driver: "flaky" };
      },
    };
  }
  const providerError = (reason: ConstructorParameters<typeof MessagingProviderError>[0]["reason"], retryAfterSeconds?: number) =>
    new MessagingProviderError({ channel: "email", provider: "flaky", reason, providerStatus: 503, ...(retryAfterSeconds === undefined ? {} : { retryAfterSeconds }) });
  const input = { channel: "email" as const, to: "tendai@example.test", code: "482913", purpose: "LOGIN_OTP" as const };

  it("retries a transient failure once, after a short pause", async () => {
    const adapter = flaky(providerError("unavailable"));
    setMessagingChannel("email", adapter);
    const pauses: number[] = [];
    const result = await sendOtpMessage(input, { sleep: async (ms) => void pauses.push(ms) });
    expect(result.providerRef).toBe("ref-2");
    expect(adapter.attempts).toBe(2);
    expect(pauses).toEqual([750]);
  });

  it("gives up after the second failure and never retries timeouts, configuration or permanent errors", async () => {
    const twice = flaky(providerError("network"), providerError("unavailable"));
    setMessagingChannel("email", twice);
    await expect(sendOtpMessage(input, { sleep: async () => {} })).rejects.toBeInstanceOf(MessagingProviderError);
    expect(twice.attempts).toBe(2);

    for (const reason of ["timeout", "auth", "config", "recipient", "rejected"] as const) {
      const once = flaky(providerError(reason));
      setMessagingChannel("email", once);
      await expect(sendOtpMessage(input, { sleep: async () => {} })).rejects.toBeInstanceOf(MessagingProviderError);
      expect(once.attempts, reason).toBe(1);
    }
    expect(otpRetryDelayMs(providerError("rate_limited", 1))).toBe(1000);
    expect(otpRetryDelayMs(providerError("rate_limited", 30))).toBeNull();
    expect(otpRetryDelayMs(new Error("x"))).toBeNull();
  });

  it("keeps working with the console driver", async () => {
    setMessagingChannel("email", new ConsoleDriver("email", { logger: createLogger({ level: "silent" }) }));
    expect((await sendOtpMessage(input)).driver).toBe("console");
  });
});
