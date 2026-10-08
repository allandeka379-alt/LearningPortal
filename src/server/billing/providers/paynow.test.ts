import { randomUUID } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import {
  PAYNOW_EVENT_TYPE,
  PAYNOW_INITIATE_URL,
  PAYNOW_REMOTE_URL,
  PaynowError,
  createPaynowProvider,
  formatPaynowAmount,
  mapPaynowStatus,
  parsePaynowAmount,
  parsePaynowMessage,
  paynowFieldsHash,
  paynowGuidFromPollUrl,
  paynowHash,
  toPaynowPhone,
  validPaynowUrl,
  verifyPaynowFields,
  type PaynowConfig,
} from "./paynow";
import { syntheticEventId, type CheckoutRequest } from "./types";

const KEY = "3e9fed89-60e1-4ce5-ab6e-6b1eb2d4f977";
const GUID = "a1b2c3d4-e5f6-4711-8899-aabbccddeeff";
const POLL_URL = `https://www.paynow.co.zw/Interface/CheckPayment/?guid=${GUID}`;
const BROWSER_URL = `https://www.paynow.co.zw/Payment/ConfirmPayment/9510?guid=${GUID}`;

/** A Paynow message with a valid hash (what Paynow would send). */
function signed(fields: [string, string][], key = KEY): string {
  return new URLSearchParams([...fields, ["hash", paynowFieldsHash(fields, key)]]).toString();
}

function reply(body: string, status = 200): Response {
  return new Response(body, { status, headers: { "content-type": "text/plain" } });
}

function provider(fetchImpl: (url: string, init?: RequestInit) => Promise<Response>, extra: Partial<PaynowConfig> = {}) {
  const fetchMock = vi.fn(fetchImpl);
  const instance = createPaynowProvider({
    integrationId: "1201",
    integrationKey: KEY,
    fetch: fetchMock as unknown as typeof fetch,
    ...extra,
  });
  return { instance, fetchMock };
}

function checkout(overrides: Partial<CheckoutRequest> = {}): CheckoutRequest {
  const paymentId = randomUUID();
  return {
    paymentId,
    amountMinor: 500,
    currency: "USD",
    description: "Dzidza Student - 1 month",
    payer: { email: "payer@example.test" },
    returnUrl: `http://localhost:3000/billing/return?paymentId=${paymentId}&provider=paynow`,
    webhookUrl: "http://localhost:3000/api/webhooks/payments/paynow",
    ...overrides,
  };
}

function sentFields(fetchMock: ReturnType<typeof vi.fn>, call = 0): [string, string][] {
  const init = fetchMock.mock.calls[call]?.[1] as RequestInit | undefined;
  return parsePaynowMessage(String(init?.body ?? ""));
}

describe("hash", () => {
  it("matches the worked example in Paynow's developer docs (known answer)", () => {
    const values = [
      "1201",
      "TEST REF",
      "99.99",
      "A test ticket transaction",
      "http://www.google.com/search?q=returnurl",
      "http://www.google.com/search?q=resulturl",
      "Message",
    ];
    expect(paynowHash(values, KEY)).toBe(
      "2A033FC38798D913D42ECB786B9B19645ADEDBDE788862032F1BD82CF3B92DEF84F316385D5B40DBB35F1A4FD7D5BFE73835174136463CDD48C9366B0749C689",
    );
  });

  it("hashes field values in order, skipping the hash field, and verifies in constant time", () => {
    const fields: [string, string][] = [
      ["reference", "abc"],
      ["amount", "5.00"],
      ["status", "Paid"],
    ];
    const hash = paynowFieldsHash(fields, KEY);
    expect(hash).toBe(paynowHash(["abc", "5.00", "Paid"], KEY));
    expect(hash).toMatch(/^[0-9A-F]{128}$/);
    expect(paynowFieldsHash([...fields, ["hash", "ignored"]], KEY)).toBe(hash);
    expect(verifyPaynowFields([...fields, ["hash", hash]], KEY)).toBe(true);
    expect(verifyPaynowFields([...fields, ["hash", hash.toLowerCase()]], KEY)).toBe(true);
    expect(verifyPaynowFields([...fields, ["hash", hash]], "another-key")).toBe(false);
    expect(verifyPaynowFields([["reference", "abc"], ["amount", "500.00"], ["status", "Paid"], ["hash", hash]], KEY)).toBe(false);
    expect(verifyPaynowFields([["amount", "5.00"], ["reference", "abc"], ["status", "Paid"], ["hash", hash]], KEY)).toBe(false); // order matters
    expect(verifyPaynowFields(fields, KEY)).toBe(false); // no hash
    expect(verifyPaynowFields([...fields, ["hash", "ABC"]], KEY)).toBe(false);
  });
});

describe("pure helpers", () => {
  it("formats and parses amounts with integer arithmetic", () => {
    expect(formatPaynowAmount(500)).toBe("5.00");
    expect(formatPaynowAmount(1)).toBe("0.01");
    expect(formatPaynowAmount(123_456)).toBe("1234.56");
    expect(() => formatPaynowAmount(0)).toThrow(RangeError);
    expect(() => formatPaynowAmount(1.5)).toThrow(RangeError);
    expect(parsePaynowAmount("5.00")).toBe(500);
    expect(parsePaynowAmount("5")).toBe(500);
    expect(parsePaynowAmount("5.5")).toBe(550);
    expect(parsePaynowAmount(" 0.10 ")).toBe(10);
    expect(parsePaynowAmount("5.001")).toBeNull();
    expect(parsePaynowAmount("-5.00")).toBeNull();
    expect(parsePaynowAmount("five")).toBeNull();
    expect(parsePaynowAmount(undefined)).toBeNull();
  });

  it("maps Paynow statuses", () => {
    expect(mapPaynowStatus("Paid")).toEqual({ status: "PAID", disputed: false });
    expect(mapPaynowStatus("Awaiting Delivery")).toEqual({ status: "PAID", disputed: false });
    expect(mapPaynowStatus("delivered")).toEqual({ status: "PAID", disputed: false });
    expect(mapPaynowStatus("Cancelled")).toEqual({ status: "CANCELLED", disputed: false });
    expect(mapPaynowStatus("Failed")).toEqual({ status: "FAILED", disputed: false });
    expect(mapPaynowStatus("Refunded")).toEqual({ status: "REFUNDED", disputed: false });
    expect(mapPaynowStatus("Created")).toEqual({ status: "PENDING", disputed: false });
    expect(mapPaynowStatus("Sent")).toEqual({ status: "PENDING", disputed: false });
    expect(mapPaynowStatus("Disputed")).toEqual({ status: null, disputed: true });
    expect(mapPaynowStatus("Something new")).toEqual({ status: null, disputed: false });
  });

  it("normalises Zimbabwe wallet numbers to Paynow's local format", () => {
    expect(toPaynowPhone("+263771234567")).toBe("0771234567");
    expect(toPaynowPhone("263 77 123 4567")).toBe("0771234567");
    expect(toPaynowPhone("0771234567")).toBe("0771234567");
    expect(toPaynowPhone("+27821234567")).toBeNull();
    expect(toPaynowPhone("077123")).toBeNull();
    expect(toPaynowPhone(undefined)).toBeNull();
  });

  it("only trusts https URLs on Paynow hosts (no SSRF through a crafted poll URL)", () => {
    expect(validPaynowUrl(POLL_URL)).toBe(POLL_URL);
    expect(validPaynowUrl("http://www.paynow.co.zw/Interface/CheckPayment/?guid=x")).toBeNull();
    expect(validPaynowUrl("https://evil.example/Interface/CheckPayment/")).toBeNull();
    expect(validPaynowUrl("https://www.paynow.co.zw.evil.example/x")).toBeNull();
    expect(validPaynowUrl("https://user:pass@www.paynow.co.zw/x")).toBeNull();
    expect(validPaynowUrl("https://www.paynow.co.zw:8443/x")).toBeNull();
    expect(validPaynowUrl("not a url")).toBeNull();
    expect(paynowGuidFromPollUrl(POLL_URL)).toBe(GUID);
    expect(paynowGuidFromPollUrl("https://www.paynow.co.zw/Interface/CheckPayment/")).toBeNull();
  });
});

describe("createCheckout", () => {
  it("web checkout: posts the documented fields in order with a valid hash and parses the verified answer", async () => {
    const { instance, fetchMock } = provider(async () =>
      reply(signed([["status", "Ok"], ["browserurl", BROWSER_URL], ["pollurl", POLL_URL]])),
    );
    const input = checkout();
    const result = await instance.createCheckout(input);
    expect(result).toEqual({ kind: "redirect", url: BROWSER_URL, providerRef: GUID, pollUrl: POLL_URL });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(PAYNOW_INITIATE_URL);
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>)["content-type"]).toBe("application/x-www-form-urlencoded");
    const fields = sentFields(fetchMock);
    expect(fields.map(([key]) => key)).toEqual(["id", "reference", "amount", "additionalinfo", "returnurl", "resulturl", "status", "hash"]);
    expect(Object.fromEntries(fields)).toMatchObject({
      id: "1201",
      reference: input.paymentId,
      amount: "5.00",
      additionalinfo: input.description,
      returnurl: input.returnUrl,
      resulturl: input.webhookUrl,
      status: "Message",
    });
    // Web checkout does not send the payer's email (data minimisation); the hash covers exactly what was sent.
    expect(fields.some(([key]) => key === "authemail")).toBe(false);
    expect(verifyPaynowFields(fields, KEY)).toBe(true);
  });

  it("mobile express checkout: remotetransaction with local phone, method and auth email", async () => {
    const { instance, fetchMock } = provider(async () =>
      reply(signed([["status", "Ok"], ["instructions", "Dial *151*2*4# and enter your EcoCash PIN"], ["pollurl", POLL_URL]])),
    );
    const result = await instance.createCheckout(checkout({ method: "ecocash", payer: { email: "payer@example.test", phone: "+263771234567" } }));
    expect(result).toEqual({
      kind: "mobile_prompt",
      instructions: "Dial *151*2*4# and enter your EcoCash PIN",
      providerRef: GUID,
      pollUrl: POLL_URL,
    });
    expect(fetchMock.mock.calls[0]?.[0]).toBe(PAYNOW_REMOTE_URL);
    const fields = sentFields(fetchMock);
    expect(fields.map(([key]) => key)).toEqual([
      "id",
      "reference",
      "amount",
      "additionalinfo",
      "returnurl",
      "resulturl",
      "authemail",
      "phone",
      "method",
      "status",
      "hash",
    ]);
    expect(Object.fromEntries(fields)).toMatchObject({ authemail: "payer@example.test", phone: "0771234567", method: "ecocash" });
    expect(verifyPaynowFields(fields, KEY)).toBe(true);
  });

  it("test mode always sends the merchant email as authemail", async () => {
    const { instance, fetchMock } = provider(
      async () => reply(signed([["status", "Ok"], ["browserurl", BROWSER_URL], ["pollurl", POLL_URL]])),
      { testMode: true, merchantEmail: "merchant@example.test" },
    );
    await instance.createCheckout(checkout());
    expect(Object.fromEntries(sentFields(fetchMock)).authemail).toBe("merchant@example.test");
    expect(() => createPaynowProvider({ integrationId: "1", integrationKey: "k", testMode: true })).toThrow(/merchant email/);
  });

  it("rejects error answers, unverifiable answers and foreign URLs", async () => {
    const error = provider(async () => reply(new URLSearchParams([["status", "Error"], ["error", "Invalid amount field"]]).toString()));
    await expect(error.instance.createCheckout(checkout())).rejects.toThrow(/Invalid amount field/);

    const badHash = provider(async () =>
      reply(new URLSearchParams([["status", "Ok"], ["browserurl", BROWSER_URL], ["pollurl", POLL_URL], ["hash", "0".repeat(128)]]).toString()),
    );
    await expect(badHash.instance.createCheckout(checkout())).rejects.toThrow(/hash mismatch/);

    const foreign = provider(async () =>
      reply(signed([["status", "Ok"], ["browserurl", "https://evil.example/pay"], ["pollurl", POLL_URL]])),
    );
    await expect(foreign.instance.createCheckout(checkout())).rejects.toBeInstanceOf(PaynowError);

    const http500 = provider(async () => reply("oops", 500));
    await expect(http500.instance.createCheckout(checkout())).rejects.toThrow(/HTTP 500/);

    const network = provider(async () => {
      throw new TypeError("fetch failed");
    });
    await expect(network.instance.createCheckout(checkout())).rejects.toBeInstanceOf(PaynowError);
  });

  it("validates its input before calling Paynow", async () => {
    const { instance, fetchMock } = provider(async () => reply(""));
    await expect(instance.createCheckout(checkout({ currency: "ZWG" }))).rejects.toThrow(RangeError);
    await expect(instance.createCheckout(checkout({ paymentId: "nope" }))).rejects.toThrow(RangeError);
    await expect(instance.createCheckout(checkout({ method: "onemoney", payer: { email: "a@example.test", phone: "12345" } }))).rejects.toThrow(
      RangeError,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("verifyWebhook (result URL)", () => {
  const paymentId = randomUUID();
  const update = (overrides: Record<string, string> = {}): [string, string][] =>
    Object.entries({ reference: paymentId, paynowreference: "987654", amount: "5.00", status: "Paid", pollurl: POLL_URL, ...overrides });

  it("verifies the hash and normalises the status update", async () => {
    const { instance } = provider(async () => reply(""));
    const rawBody = signed(update());
    const event = await instance.verifyWebhook({ headers: new Headers(), rawBody });
    expect(event).toMatchObject({
      eventType: PAYNOW_EVENT_TYPE,
      paymentId,
      providerRef: GUID,
      status: "PAID",
      providerStatus: "Paid",
      amountMinor: 500,
      currency: "USD",
      disputed: false,
      pollUrl: POLL_URL,
      metadata: { paynowReference: "987654" },
    });
    expect(event?.providerEventId).toBe(syntheticEventId("paynow", [paymentId, "paid", "987654", "500"]));
    expect(JSON.stringify(event?.payload)).not.toContain("hash");
    // A replay of the same status has the same id; a new status is a new event.
    expect((await instance.verifyWebhook({ headers: new Headers(), rawBody }))?.providerEventId).toBe(event?.providerEventId);
    const cancelled = await instance.verifyWebhook({ headers: new Headers(), rawBody: signed(update({ status: "Cancelled" })) });
    expect(cancelled?.providerEventId).not.toBe(event?.providerEventId);
    expect(cancelled?.status).toBe("CANCELLED");
  });

  it("rejects a bad, missing or replayed-with-tampering hash", async () => {
    const { instance } = provider(async () => reply(""));
    const headers = new Headers();
    const good = signed(update());
    await expect(instance.verifyWebhook({ headers, rawBody: good.replace("amount=5.00", "amount=0.01") })).resolves.toBeNull();
    await expect(instance.verifyWebhook({ headers, rawBody: new URLSearchParams(update()).toString() })).resolves.toBeNull();
    await expect(instance.verifyWebhook({ headers, rawBody: signed(update(), "wrong-key") })).resolves.toBeNull();
    await expect(instance.verifyWebhook({ headers, rawBody: "" })).resolves.toBeNull();
    await expect(instance.verifyWebhook({ headers, rawBody: signed([["status", "Paid"]]) })).resolves.toBeNull(); // no reference
  });

  it("flags disputes without a state change and keeps foreign references unmatched", async () => {
    const { instance } = provider(async () => reply(""));
    const disputed = await instance.verifyWebhook({ headers: new Headers(), rawBody: signed(update({ status: "Disputed" })) });
    expect(disputed).toMatchObject({ status: null, disputed: true });
    const foreign = await instance.verifyWebhook({ headers: new Headers(), rawBody: signed(update({ reference: "INV-42" })) });
    expect(foreign?.paymentId).toBeNull();
  });
});

describe("poll and refund", () => {
  it("polls the verified poll URL and maps the answer", async () => {
    const paymentId = randomUUID();
    const { instance, fetchMock } = provider(async () =>
      reply(signed([["reference", paymentId], ["paynowreference", "555"], ["amount", "5.00"], ["status", "Sent"], ["pollurl", POLL_URL]])),
    );
    const result = await instance.poll({ providerRef: GUID, pollUrl: POLL_URL });
    expect(result).toMatchObject({ status: "PENDING", providerStatus: "Sent", amountMinor: 500, currency: "USD" });
    expect(result.providerEventId).toBe(syntheticEventId("paynow", [paymentId, "sent", "555", "500"]));
    expect(fetchMock.mock.calls[0]?.[0]).toBe(POLL_URL);
  });

  it("never fetches a foreign poll URL and rejects unverifiable answers", async () => {
    const { instance, fetchMock } = provider(async () => reply(new URLSearchParams([["status", "Paid"], ["hash", "0".repeat(128)]]).toString()));
    await expect(instance.poll({ providerRef: GUID, pollUrl: "https://evil.example/poll" })).resolves.toMatchObject({
      status: "PENDING",
      providerStatus: "UNKNOWN",
    });
    expect(fetchMock).not.toHaveBeenCalled();
    await expect(instance.poll({ providerRef: GUID, pollUrl: POLL_URL })).rejects.toThrow(/hash mismatch/);
  });

  it("refunds are manual and support is per integration currency", async () => {
    const { instance } = provider(async () => reply(""));
    await expect(instance.refund({ providerRef: GUID, amountMinor: 100, currency: "USD", reason: "test" })).resolves.toEqual({
      status: "MANUAL_REQUIRED",
    });
    expect(instance.supports("USD")).toBe(true);
    expect(instance.supports("USD", "ecocash")).toBe(true);
    expect(instance.supports("USD", "sandbox")).toBe(false);
    expect(instance.supports("ZWG")).toBe(false);
    expect(createPaynowProvider({ integrationId: "1", integrationKey: "k", currency: "zwg" }).supports("ZWG")).toBe(true);
    expect(() => createPaynowProvider({ integrationId: " ", integrationKey: "k" })).toThrow();
  });
});
