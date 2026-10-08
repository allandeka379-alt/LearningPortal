import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { recordPaymentEvent, type RecordPaymentEventInput } from "./registry";
import { syntheticEventId } from "./types";

/** PaymentEvent is append-only: these rows stay in the shared test DB, so every event id is unique per test. */

function input(overrides: Partial<RecordPaymentEventInput> = {}): RecordPaymentEventInput {
  return {
    provider: "sandbox",
    providerEventId: `evt_${randomUUID()}`,
    source: "WEBHOOK",
    eventType: "payment.status",
    providerStatus: "PAID",
    mappedStatus: "SUCCESSFUL",
    amountMinor: 500,
    currency: "usd",
    signatureValid: true,
    payload: { status: "PAID" },
    ...overrides,
  };
}

describe("recordPaymentEvent", () => {
  it("is idempotent for signature-valid events and returns the existing row", async () => {
    const event = input();
    const first = await recordPaymentEvent(event);
    expect(first).toMatchObject({ duplicate: false, processedAt: null, paymentId: null });
    const replay = await recordPaymentEvent(event);
    expect(replay).toEqual({ ...first, duplicate: true });
    expect(await db.paymentEvent.count({ where: { provider: "sandbox", providerEventId: event.providerEventId } })).toBe(1);
    const stored = await db.paymentEvent.findUniqueOrThrow({ where: { id: first.id } });
    expect(stored).toMatchObject({ currency: "USD", amountMinor: 500, signatureValid: true, mappedStatus: "SUCCESSFUL" });
  });

  it("stores unsigned forgeries without letting them claim the idempotency key", async () => {
    const id = `evt_${randomUUID()}`;
    const forgery = await recordPaymentEvent(input({ providerEventId: id, signatureValid: false }));
    const forgeryAgain = await recordPaymentEvent(input({ providerEventId: id, signatureValid: false }));
    expect(forgery.duplicate).toBe(false);
    expect(forgeryAgain.duplicate).toBe(false);
    const genuine = await recordPaymentEvent(input({ providerEventId: id }));
    expect(genuine.duplicate).toBe(false); // the real event still gets in
    expect(await db.paymentEvent.count({ where: { provider: "sandbox", providerEventId: id } })).toBe(3);
  });

  it("never marks return-URL hits as authentic and redacts contact details in payloads", async () => {
    const recorded = await recordPaymentEvent(
      input({
        source: "RETURN_URL",
        signatureValid: true,
        payload: { status: "PAID", phone: "+263771234567", note: "reach me at payer@example.test", nested: { token: "secret-token" } },
      }),
    );
    const row = await db.paymentEvent.findUniqueOrThrow({ where: { id: recorded.id }, select: { signatureValid: true, payload: true } });
    expect(row.signatureValid).toBe(false);
    const text = JSON.stringify(row.payload);
    expect(text).not.toContain("+263771234567");
    expect(text).not.toContain("payer@example.test");
    expect(text).not.toContain("secret-token");
  });

  it("a duplicate inside a transaction does not abort it", async () => {
    const event = input();
    const result = await db.$transaction(async (tx) => {
      await recordPaymentEvent(event, tx);
      const again = await recordPaymentEvent(event, tx);
      const count = await tx.paymentEvent.count({ where: { provider: "sandbox", providerEventId: event.providerEventId } });
      return { again, count };
    });
    expect(result.again.duplicate).toBe(true);
    expect(result.count).toBe(1);
  });

  it("hashes over-long provider event ids and normalises invalid currencies away", async () => {
    const long = `evt_${"x".repeat(300)}_${randomUUID()}`;
    const recorded = await recordPaymentEvent(input({ providerEventId: long, currency: "dollars" }));
    const row = await db.paymentEvent.findUniqueOrThrow({ where: { id: recorded.id }, select: { providerEventId: true, currency: true } });
    expect(row.providerEventId).toBe(syntheticEventId("sandbox", [long]));
    expect(row.currency).toBeNull();
  });
});
