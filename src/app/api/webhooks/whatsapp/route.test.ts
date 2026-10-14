import { randomInt, randomUUID } from "node:crypto";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { resetEnvCache } from "@/server/lib/env";
import { computeSignature } from "@/server/whatsapp/signature";
import { uniquePhone } from "../../../../../tests/factories/index";

/**
 * Route wiring of /api/webhooks/whatsapp with WhatsApp configured through the environment (this test file's worker
 * only): the GET handshake and POST signature handling, end to end through the real service and test database. The
 * channel is switched on for this file (`features.whatsapp`); the last block switches it off.
 */

const testSettings = vi.hoisted(() => ({
  flags: { ai: false, whatsapp: true, email: false, stripe: false },
  rateLimits: { webhookReceipt: { limit: 8, windowSeconds: 60 } },
}));
vi.mock("@/server/lib/settings", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/server/lib/settings")>();
  const base = (await import("../../../../../tests/support/feature-flags")).settingsWithFeatureFlags(actual, testSettings.flags);
  return {
    ...base,
    getKnownSetting: ((key) => (key === "rateLimits" ? Promise.resolve(testSettings.rateLimits) : base.getKnownSetting(key))) as typeof actual.getKnownSetting,
    getRateLimitOverrides: () => Promise.resolve(testSettings.rateLimits),
  };
});
afterEach(() => {
  testSettings.flags.whatsapp = true;
});

const VERIFY_TOKEN = "route-verify-token";
const APP_SECRET = "route-app-secret";
const PHONE_NUMBER_ID = "555000111";
const env = process.env as Record<string, string | undefined>;
const saved = { ...env };

beforeAll(() => {
  env.WHATSAPP_VERIFY_TOKEN = VERIFY_TOKEN;
  env.WHATSAPP_APP_SECRET = APP_SECRET;
  env.WHATSAPP_ACCESS_TOKEN = "route-access-token";
  env.WHATSAPP_PHONE_NUMBER_ID = PHONE_NUMBER_ID;
  resetEnvCache();
});

afterAll(() => {
  for (const key of ["WHATSAPP_VERIFY_TOKEN", "WHATSAPP_APP_SECRET", "WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID"]) env[key] = saved[key];
  resetEnvCache();
});

const { GET, POST } = await import("./route");
const { db } = await import("@/server/db");
const { rateLimits } = await import("@/server/lib/rate-limit");

/** A fresh client IP per test, so the per-IP receipt bucket is the test's own. */
const randomIp = () => `10.${randomInt(0, 256)}.${randomInt(0, 256)}.${randomInt(1, 255)}`;

function body(): { text: string; id: string } {
  const id = `wamid.${randomUUID()}`;
  const text = JSON.stringify({
    object: "whatsapp_business_account",
    entry: [
      {
        id: "waba",
        changes: [
          {
            field: "messages",
            value: {
              messaging_product: "whatsapp",
              metadata: { phone_number_id: PHONE_NUMBER_ID },
              messages: [{ from: uniquePhone().slice(1), id, timestamp: String(Math.floor(Date.now() / 1000)), type: "text", text: { body: "HELP" } }],
            },
          },
        ],
      },
    ],
  });
  return { text, id };
}

describe("GET /api/webhooks/whatsapp", () => {
  it("echoes the challenge for the right verify token only", async () => {
    const ok = await GET(new Request(`http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=424242`));
    expect(ok.status).toBe(200);
    expect(await ok.text()).toBe("424242");
    expect(ok.headers.get("content-type")).toContain("text/plain");
    expect(ok.headers.get("cache-control")).toBe("no-store");

    const denied = await GET(new Request("http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=nope&hub.challenge=424242"));
    expect(denied.status).toBe(403);
  });
});

describe("POST /api/webhooks/whatsapp", () => {
  it("stores a signed delivery and rejects unsigned or forged ones", async () => {
    const signed = body();
    const accepted = await POST(
      new Request("http://localhost:3000/api/webhooks/whatsapp", {
        method: "POST",
        headers: { "content-type": "application/json", "x-hub-signature-256": computeSignature(signed.text, APP_SECRET) },
        body: signed.text,
      }),
    );
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toEqual({ received: true });
    expect(accepted.headers.get("x-request-id")).toBeTruthy();
    expect(await db.channelMessage.count({ where: { externalMessageId: signed.id } })).toBe(1);

    const forged = body();
    const rejected = await POST(
      new Request("http://localhost:3000/api/webhooks/whatsapp", {
        method: "POST",
        headers: { "content-type": "application/json", "x-hub-signature-256": computeSignature(forged.text, "wrong-secret") },
        body: forged.text,
      }),
    );
    expect(rejected.status).toBe(401);
    const missing = await POST(new Request("http://localhost:3000/api/webhooks/whatsapp", { method: "POST", headers: { "content-type": "application/json" }, body: forged.text }));
    expect(missing.status).toBe(401);
    expect(await db.channelMessage.count({ where: { externalMessageId: forged.id } })).toBe(0);
  });
});

describe("per-IP receipt limit", () => {
  it("answers 429 above the limit for GET and POST alike, before the signature is checked or anything stored", async () => {
    const ip = randomIp();
    const limit = testSettings.rateLimits.webhookReceipt.limit;
    const handshake = () =>
      GET(new Request(`http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=guess&hub.challenge=1`, { headers: { "x-forwarded-for": ip } }));
    for (let i = 0; i < limit; i += 1) expect((await handshake()).status).toBe(403);
    const limited = await handshake();
    expect(limited.status).toBe(429);
    expect(Number(limited.headers.get("retry-after"))).toBeGreaterThan(0);
    expect(await limited.json()).toEqual({ received: false, error: "rate_limited" });

    // A correctly signed delivery from the same IP is refused too (Meta retries later) and stores nothing.
    const signed = body();
    const refused = await POST(
      new Request("http://localhost:3000/api/webhooks/whatsapp", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": ip, "x-hub-signature-256": computeSignature(signed.text, APP_SECRET) },
        body: signed.text,
      }),
    );
    expect(refused.status).toBe(429);
    expect(await db.channelMessage.count({ where: { externalMessageId: signed.id } })).toBe(0);

    // Other IPs are unaffected.
    const other = await GET(
      new Request(`http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=7`, { headers: { "x-forwarded-for": randomIp() } }),
    );
    expect(other.status).toBe(200);
  });
});

describe("switched off (features.whatsapp = false)", () => {
  it("answers 404 to the handshake and to deliveries, before the rate limit, and stores nothing", async () => {
    testSettings.flags.whatsapp = false;
    const ip = randomIp();
    const handshake = await GET(
      new Request(`http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=424242`, { headers: { "x-forwarded-for": ip } }),
    );
    expect(handshake.status).toBe(404);
    expect(await handshake.text()).not.toContain("424242");

    const signed = body();
    const delivery = await POST(
      new Request("http://localhost:3000/api/webhooks/whatsapp", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": ip, "x-hub-signature-256": computeSignature(signed.text, APP_SECRET) },
        body: signed.text,
      }),
    );
    expect(delivery.status).toBe(404);
    expect(await db.channelMessage.count({ where: { externalMessageId: signed.id } })).toBe(0);
    // No receipt bucket was touched for this IP.
    expect(await db.rateLimitBucket.count({ where: { key: rateLimits.webhookReceipt("whatsapp", ip).key } })).toBe(0);
  });
});
