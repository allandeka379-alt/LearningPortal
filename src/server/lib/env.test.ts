import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ENV_KEYS,
  EnvValidationError,
  absoluteUrl,
  getAppUrl,
  getEnv,
  isDev,
  isProd,
  isTest,
  parseEnv,
  resetEnvCache,
  type EnvSource,
} from "./env";

const DEV: EnvSource = {
  NODE_ENV: "development",
  APP_URL: "http://localhost:3000/",
  DATABASE_URL: "postgresql://postgres@localhost:5433/zimstudy",
  SESSION_SECRET: "replace-with-a-long-random-string",
};

const STRONG_SECRET = "4f9c2b7e8d1a6f3c0b5e9a2d7c4f1b8e6a3d0c9f";

const PROD: EnvSource = {
  NODE_ENV: "production",
  APP_URL: "https://learn.example.com",
  DATABASE_URL: "postgresql://app@db.internal:5432/zimstudy",
  SESSION_SECRET: STRONG_SECRET,
  EMAIL_PROVIDER: "resend",
  RESEND_API_KEY: "re_live_key_value",
  EMAIL_FROM: "BvunzoHub <no-reply@mail.learn.dzidza.test>",
  SMS_PROVIDER: "africastalking",
  AFRICASTALKING_USERNAME: "dzidza",
  AFRICASTALKING_API_KEY: "at-api-key-value",
  PAYMENTS_ENABLED_PROVIDERS: "paynow",
  PAYNOW_INTEGRATION_ID: "12345",
  PAYNOW_INTEGRATION_KEY: "paynow-key-value",
  TRUSTED_PROXY_HOPS: "2",
};

function issuesOf(source: EnvSource): { key: string; message: string }[] {
  try {
    parseEnv(source);
  } catch (error) {
    if (error instanceof EnvValidationError) return [...error.issues];
    throw error;
  }
  throw new Error("expected EnvValidationError");
}

/** Replaces every known key in process.env, so the developer's own .env cannot influence these tests. */
function stubServerEnv(source: EnvSource): void {
  for (const key of ENV_KEYS) vi.stubEnv(key, source[key]);
}

afterEach(() => {
  resetEnvCache();
  vi.unstubAllEnvs();
});

describe("parseEnv", () => {
  it("parses a minimal development environment with defaults", () => {
    const env = parseEnv(DEV);
    expect(env).toMatchObject({
      NODE_ENV: "development",
      APP_URL: "http://localhost:3000",
      EMAIL_PROVIDER: "console",
      SMS_PROVIDER: "console",
      PAYMENTS_ENABLED_PROVIDERS: [],
      STORAGE_DRIVER: "local",
    });
    expect(env.ANTHROPIC_API_KEY).toBeUndefined();
    expect(Object.isFrozen(env)).toBe(true);
  });

  it("treats empty and whitespace-only values as unset", () => {
    const env = parseEnv({ ...DEV, ANTHROPIC_API_KEY: "", GOOGLE_CLIENT_ID: "   ", GOOGLE_CLIENT_SECRET: "", NODE_ENV: "" });
    expect(env.ANTHROPIC_API_KEY).toBeUndefined();
    expect(env.GOOGLE_CLIENT_ID).toBeUndefined();
    expect(env.NODE_ENV).toBe("development");
  });

  it("ignores unknown variables", () => {
    const env = parseEnv({ ...DEV, PATH: "/usr/bin", SOMETHING_ELSE: "x" });
    expect(env).not.toHaveProperty("PATH");
  });

  it("parses the payment provider list", () => {
    const env = parseEnv({
      ...DEV,
      PAYMENTS_ENABLED_PROVIDERS: " Sandbox, paynow,sandbox ",
      PAYNOW_INTEGRATION_ID: "1",
      PAYNOW_INTEGRATION_KEY: "k",
    });
    expect(env.PAYMENTS_ENABLED_PROVIDERS).toEqual(["sandbox", "paynow"]);
  });

  it("lists every missing required key at once", () => {
    const issues = issuesOf({ NODE_ENV: "development" });
    expect(issues).toEqual(
      expect.arrayContaining([
        { key: "APP_URL", message: "is required but not set" },
        { key: "DATABASE_URL", message: "is required but not set" },
        { key: "SESSION_SECRET", message: "is required but not set" },
      ]),
    );
    expect(issues).toHaveLength(3);
  });

  it("reports invalid values without echoing them", () => {
    const source = {
      ...DEV,
      NODE_ENV: "staging",
      APP_URL: "ftp://files.example.com",
      DATABASE_URL: "mysql://root:SuperSecretPw@localhost/db",
      SESSION_SECRET: "short",
      STORAGE_DRIVER: "dropbox",
      LOG_LEVEL: "verbose",
      NEXT_PUBLIC_SUPPORT_EMAIL: "not-an-email",
      PAYMENTS_ENABLED_PROVIDERS: "sandbox,bitcoin",
    };
    let message = "";
    try {
      parseEnv(source);
    } catch (error) {
      expect(error).toBeInstanceOf(EnvValidationError);
      message = (error as Error).message;
    }
    for (const key of [
      "NODE_ENV",
      "APP_URL",
      "DATABASE_URL",
      "SESSION_SECRET",
      "STORAGE_DRIVER",
      "LOG_LEVEL",
      "NEXT_PUBLIC_SUPPORT_EMAIL",
      "PAYMENTS_ENABLED_PROVIDERS",
    ]) {
      expect(message).toContain(`- ${key}:`);
    }
    expect(message).not.toContain("SuperSecretPw");
    expect(message).not.toContain("short");
    expect(message).toContain(".env.example");
  });

  it("requires provider keys for enabled payment providers", () => {
    expect(issuesOf({ ...DEV, PAYMENTS_ENABLED_PROVIDERS: "paynow,stripe", PAYNOW_INTEGRATION_ID: "1" })).toEqual([
      { key: "PAYNOW_INTEGRATION_KEY", message: 'required because PAYMENTS_ENABLED_PROVIDERS includes "paynow"' },
      { key: "STRIPE_SECRET_KEY", message: 'required because PAYMENTS_ENABLED_PROVIDERS includes "stripe"' },
      { key: "STRIPE_WEBHOOK_SECRET", message: 'required because PAYMENTS_ENABLED_PROVIDERS includes "stripe"' },
    ]);
  });

  it("requires Google and WhatsApp credentials as complete sets", () => {
    const keys = issuesOf({ ...DEV, GOOGLE_CLIENT_ID: "id", WHATSAPP_ACCESS_TOKEN: "t" }).map((issue) => issue.key);
    expect(keys).toEqual([
      "GOOGLE_CLIENT_SECRET",
      "WHATSAPP_VERIFY_TOKEN",
      "WHATSAPP_PHONE_NUMBER_ID",
      "WHATSAPP_APP_SECRET",
    ]);
    expect(() =>
      parseEnv({ ...DEV, GOOGLE_CLIENT_ID: "id", GOOGLE_CLIENT_SECRET: "secret" }),
    ).not.toThrow();
  });

  it("requires the chosen messaging provider's keys in every environment", () => {
    expect(issuesOf({ ...DEV, EMAIL_PROVIDER: "resend", SMS_PROVIDER: "twilio" })).toEqual([
      { key: "RESEND_API_KEY", message: 'required because EMAIL_PROVIDER is "resend"' },
      { key: "EMAIL_FROM", message: 'required because EMAIL_PROVIDER is "resend"' },
      { key: "TWILIO_ACCOUNT_SID", message: 'required because SMS_PROVIDER is "twilio"' },
      { key: "TWILIO_AUTH_TOKEN", message: 'required because SMS_PROVIDER is "twilio"' },
      { key: "TWILIO_FROM", message: 'required because SMS_PROVIDER is "twilio" (or set TWILIO_MESSAGING_SERVICE_SID)' },
    ]);
    expect(issuesOf({ ...DEV, SMS_PROVIDER: "africastalking" }).map((issue) => issue.key)).toEqual([
      "AFRICASTALKING_USERNAME",
      "AFRICASTALKING_API_KEY",
    ]);
    const twilio = {
      ...DEV,
      SMS_PROVIDER: "twilio",
      TWILIO_ACCOUNT_SID: `AC${"ab12".repeat(8)}`,
      TWILIO_AUTH_TOKEN: "token",
    };
    expect(parseEnv({ ...twilio, TWILIO_MESSAGING_SERVICE_SID: `MG${"cd34".repeat(8)}` }).TWILIO_MESSAGING_SERVICE_SID).toMatch(/^MG/);
    expect(parseEnv({ ...twilio, TWILIO_FROM: "+15005550006" }).TWILIO_FROM).toBe("+15005550006");
    expect(parseEnv({ ...twilio, TWILIO_FROM: "DZIDZA" }).TWILIO_FROM).toBe("DZIDZA");
    // Unknown names stay allowed outside production (they resolve to a fail-loud stub).
    expect(parseEnv({ ...DEV, EMAIL_PROVIDER: "smtp" }).EMAIL_PROVIDER).toBe("smtp");
  });

  it("validates messaging key formats without echoing them", () => {
    const issues = issuesOf({
      ...DEV,
      EMAIL_FROM: "BvunzoHub <no-reply@x.test>\r\nBcc: victim@x.test",
      EMAIL_REPLY_TO: "not-an-email",
      TWILIO_ACCOUNT_SID: "SK0123",
      TWILIO_FROM: "A-sender-id-that-is-too-long",
      TWILIO_MESSAGING_SERVICE_SID: "MG123",
      AFRICASTALKING_SENDER_ID: "!!",
    });
    expect(issues.map((issue) => issue.key).sort()).toEqual(
      ["AFRICASTALKING_SENDER_ID", "EMAIL_FROM", "EMAIL_REPLY_TO", "TWILIO_ACCOUNT_SID", "TWILIO_FROM", "TWILIO_MESSAGING_SERVICE_SID"].sort(),
    );
    expect(JSON.stringify(issues)).not.toContain("victim");
    expect(parseEnv({ ...DEV, EMAIL_FROM: '"BvunzoHub Team" <no-reply@mail.dzidza.test>' }).EMAIL_FROM).toBe('"BvunzoHub Team" <no-reply@mail.dzidza.test>');
    expect(parseEnv({ ...DEV, EMAIL_FROM: "no-reply@mail.dzidza.test" }).EMAIL_FROM).toBe("no-reply@mail.dzidza.test");
  });

  describe("production rules", () => {
    it("accepts a safe production environment", () => {
      const env = parseEnv(PROD);
      expect(env.NODE_ENV).toBe("production");
      expect(env.PAYMENTS_ENABLED_PROVIDERS).toEqual(["paynow"]);
    });

    it("rejects weak secrets, http URLs, sandbox payments and console messaging", () => {
      const issues = issuesOf({
        ...PROD,
        SESSION_SECRET: "only-twenty-chars-xx",
        APP_URL: "http://learn.example.com",
        PAYMENTS_ENABLED_PROVIDERS: "sandbox,paynow",
        EMAIL_PROVIDER: "console",
        SMS_PROVIDER: "console",
      });
      expect(issues).toEqual([
        { key: "SESSION_SECRET", message: "must be at least 32 characters in production" },
        { key: "APP_URL", message: "must use https:// in production" },
        { key: "PAYMENTS_ENABLED_PROVIDERS", message: 'must not include "sandbox" in production' },
        {
          key: "EMAIL_PROVIDER",
          message: 'must name an email adapter in production (allowed: resend): sign-in codes and password resets go by email, and "console" would log them',
        },
        { key: "SMS_PROVIDER", message: 'must not be "console" in production (it would log message contents)' },
      ]);
    });

    it("requires a real email provider in production: accounts are email-based (owner decision 2026-10-07)", () => {
      const noEmail = { ...PROD, EMAIL_PROVIDER: undefined, RESEND_API_KEY: undefined, EMAIL_FROM: undefined };
      expect(issuesOf(noEmail)).toEqual([
        {
          key: "EMAIL_PROVIDER",
          message: 'must name an email adapter in production (allowed: resend): sign-in codes and password resets go by email, and "console" would log them',
        },
      ]);
      expect(issuesOf({ ...noEmail, EMAIL_PROVIDER: "none" })).toEqual([
        { key: "EMAIL_PROVIDER", message: "must name an email adapter in production (allowed: resend)" },
      ]);
      // Resend needs its key and a sender.
      expect(issuesOf({ ...noEmail, EMAIL_PROVIDER: "resend" }).map((issue) => issue.key)).toEqual(["RESEND_API_KEY", "EMAIL_FROM"]);
      // Development keeps the console capture driver as its default.
      expect(parseEnv({ ...DEV, EMAIL_PROVIDER: undefined }).EMAIL_PROVIDER).toBe("console");
    });

    it("needs no SMS provider (SMS is switched off): unset means none, and no SMS keys are required", () => {
      const noSms = { ...PROD, SMS_PROVIDER: undefined, AFRICASTALKING_USERNAME: undefined, AFRICASTALKING_API_KEY: undefined };
      expect(parseEnv(noSms).SMS_PROVIDER).toBe("none");
      expect(parseEnv({ ...noSms, SMS_PROVIDER: "none" }).SMS_PROVIDER).toBe("none");
      // Development keeps the console capture driver as its default.
      expect(parseEnv({ ...DEV, SMS_PROVIDER: undefined }).SMS_PROVIDER).toBe("console");
    });

    it("needs no Stripe keys in production (Paynow only; the Stripe adapter is dormant)", () => {
      const env = parseEnv({ ...PROD, STRIPE_SECRET_KEY: undefined, STRIPE_WEBHOOK_SECRET: undefined });
      expect(env.PAYMENTS_ENABLED_PROVIDERS).toEqual(["paynow"]);
    });

    it("accepts only real messaging adapters, real senders and the live Africa's Talking API", () => {
      expect(issuesOf({ ...PROD, EMAIL_PROVIDER: "smtp", SMS_PROVIDER: "gateway" })).toEqual([
        { key: "EMAIL_PROVIDER", message: "must name an email adapter in production (allowed: resend)" },
        { key: "SMS_PROVIDER", message: 'must be "none" (no SMS) or name an SMS adapter in production (allowed: twilio, africastalking)' },
      ]);
      expect(issuesOf({ ...PROD, EMAIL_FROM: "BvunzoHub <no-reply@example.com>", AFRICASTALKING_USERNAME: "sandbox" })).toEqual([
        { key: "EMAIL_FROM", message: "still uses a placeholder domain (example.com); use your verified sending domain" },
        { key: "AFRICASTALKING_USERNAME", message: 'must not be "sandbox" in production (the sandbox delivers nothing)' },
      ]);
      expect(issuesOf({ ...PROD, RESEND_API_KEY: undefined }).map((issue) => issue.key)).toEqual(["RESEND_API_KEY"]);
      const twilio = parseEnv({
        ...PROD,
        SMS_PROVIDER: "twilio",
        TWILIO_ACCOUNT_SID: `AC${"ab12".repeat(8)}`,
        TWILIO_AUTH_TOKEN: "token",
        TWILIO_MESSAGING_SERVICE_SID: `MG${"cd34".repeat(8)}`,
      });
      expect(twilio.SMS_PROVIDER).toBe("twilio");
    });

    it("skips only the runtime-only rules while `next build` prerenders", () => {
      const issues = issuesOf({
        ...PROD,
        NEXT_PHASE: "phase-production-build",
        APP_URL: "http://learn.example.com",
        PAYMENTS_ENABLED_PROVIDERS: "sandbox",
        EMAIL_PROVIDER: "console",
        SMS_PROVIDER: "console",
      });
      // Static pages embed APP_URL, so it must still be https; payments/messaging are checked when the server starts.
      expect(issues).toEqual([{ key: "APP_URL", message: "must use https:// in production" }]);
    });

    it("requires an explicit client-IP source in production (forged X-Forwarded-For would bypass IP limits)", () => {
      expect(issuesOf({ ...PROD, TRUSTED_PROXY_HOPS: undefined })).toEqual([
        {
          key: "TRUSTED_PROXY_HOPS",
          message: "must be set in production (proxies that append to X-Forwarded-For, e.g. 2 for CDN + load balancer), or set CLIENT_IP_HEADER",
        },
      ]);
      expect(parseEnv({ ...PROD, TRUSTED_PROXY_HOPS: undefined, CLIENT_IP_HEADER: "CF-Connecting-IP" }).CLIENT_IP_HEADER).toBe("cf-connecting-ip");
      expect(parseEnv(PROD).TRUSTED_PROXY_HOPS).toBe(2);
      expect(issuesOf({ ...PROD, TRUSTED_PROXY_HOPS: "0" }).map((issue) => issue.key)).toEqual(["TRUSTED_PROXY_HOPS"]);
      expect(issuesOf({ ...PROD, CLIENT_IP_HEADER: "not a header" }).map((issue) => issue.key)).toEqual(["CLIENT_IP_HEADER"]);
      // Development keeps the default (one proxy).
      expect(parseEnv(DEV).TRUSTED_PROXY_HOPS).toBeUndefined();
    });

    it("rejects the .env.example placeholder secret when padded to length", () => {
      const placeholder = "replace-with-a-long-random-string";
      expect(placeholder.length).toBeGreaterThanOrEqual(32);
      expect(issuesOf({ ...PROD, SESSION_SECRET: placeholder })).toEqual([
        { key: "SESSION_SECRET", message: "still has the .env.example placeholder value" },
      ]);
    });

    it("reports schema and policy problems together", () => {
      const keys = issuesOf({ ...PROD, DATABASE_URL: undefined, APP_URL: "http://x.example" }).map((i) => i.key);
      expect(keys).toEqual(["DATABASE_URL", "APP_URL"]);
    });
  });
});

describe("getEnv", () => {
  it("parses an injected source without caching it", () => {
    expect(getEnv(DEV).APP_URL).toBe("http://localhost:3000");
    expect(getEnv({ ...DEV, APP_URL: "http://127.0.0.1:4000" }).APP_URL).toBe("http://127.0.0.1:4000");
  });

  it("caches process.env until reset", () => {
    stubServerEnv({ ...DEV, APP_URL: "http://first.example" });
    expect(getEnv().APP_URL).toBe("http://first.example");
    vi.stubEnv("APP_URL", "http://second.example");
    expect(getEnv().APP_URL).toBe("http://first.example");
    resetEnvCache();
    expect(getEnv().APP_URL).toBe("http://second.example");
  });

  it("builds absolute URLs on the app origin", () => {
    stubServerEnv({ ...DEV, APP_URL: "https://learn.example.com/" });
    expect(getAppUrl()).toBe("https://learn.example.com");
    expect(absoluteUrl("/share/abc?x=1")).toBe("https://learn.example.com/share/abc?x=1");
    expect(() => absoluteUrl("share/abc")).toThrow();
    expect(() => absoluteUrl("//evil.example")).toThrow();
  });
});

describe("environment checks", () => {
  it("reads NODE_ENV without validating anything else", () => {
    expect(isProd({ NODE_ENV: "production" })).toBe(true);
    expect(isProd({ NODE_ENV: "development" })).toBe(false);
    expect(isDev({ NODE_ENV: "development" })).toBe(true);
    expect(isDev({})).toBe(true);
    expect(isDev({ NODE_ENV: "test" })).toBe(false);
    expect(isTest({ NODE_ENV: "test" })).toBe(true);
  });

  it("defaults to process.env (NODE_ENV=test under Vitest)", () => {
    expect(isTest()).toBe(true);
    expect(isProd()).toBe(false);
  });
});
