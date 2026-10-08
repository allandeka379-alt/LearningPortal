import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCurriculumChain, createStudent, uniquePhone } from "../../../../../tests/factories/index";

/**
 * Wiring tests for the Settings → WhatsApp Server Actions: form fields -> guard -> WhatsApp channel service ->
 * ActionResult. `next/headers` (session cookie) and `next/cache` are mocked; the services and the database are real
 * (the console messaging driver captures the WhatsApp code).
 */

const jar = new Map<string, string>();
let incomingHeaders = new Headers();
const revalidated = vi.hoisted(() => [] as string[]);

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => incomingHeaders,
}));
vi.mock("next/cache", () => ({ revalidatePath: (path: string) => void revalidated.push(path) }));
// The WhatsApp channel is switched on for this file (`features.whatsapp`); one case switches it off.
const flags = vi.hoisted(() => ({ ai: false, whatsapp: true, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

const actions = await import("./actions");
const { db } = await import("@/server/db");
const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { latestCodeFor, randomIp, testMeta } = await import("@/server/auth/testing");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

async function signedInStudent(student: { isMinor: boolean }) {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
  const { user } = await createStudent({
    student: { ...student, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
  jar.set(currentSessionCookieName(), token);
  return user.id;
}

beforeEach(() => {
  jar.clear();
  revalidated.length = 0;
  flags.whatsapp = true;
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

describe("Settings → WhatsApp actions", () => {
  it("sends a code, links the number with reminders, toggles reminders and unlinks", async () => {
    const userId = await signedInStudent({ isMinor: false });
    const phone = uniquePhone();

    const requested = await actions.requestWhatsAppCodeAction(null, form({ phone }));
    expect(requested).toMatchObject({ ok: true, data: { step: "code", phone, phoneMasked: expect.stringContaining("***") } });

    const wrong = await actions.confirmWhatsAppLinkAction(null, form({ phone, code: "12345" }));
    expect(wrong).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { code: expect.any(Array) } } });

    const linked = await actions.confirmWhatsAppLinkAction(null, form({ phone, code: latestCodeFor(phone), reminders: "on" }));
    expect(linked).toMatchObject({ ok: true, data: { step: "linked" } });
    expect(revalidated).toContain("/app/settings/whatsapp");
    const identity = await db.channelIdentity.findUniqueOrThrow({ where: { userId_channel: { userId, channel: "WHATSAPP" } } });
    expect(identity.optedInAt).not.toBeNull();

    expect(await actions.updateWhatsAppRemindersAction(null, form({}))).toMatchObject({ ok: true, data: { message: "Reminders on WhatsApp are off." } });
    expect(await actions.unlinkWhatsAppAction(null, form({}))).toMatchObject({ ok: true, data: { step: "unlinked" } });
    expect(await db.channelIdentity.count({ where: { userId, channel: "WHATSAPP" } })).toBe(0);
  });

  it("explains invalid numbers and the guardian-consent rule", async () => {
    await signedInStudent({ isMinor: true });
    const consent = await actions.requestWhatsAppCodeAction(null, form({ phone: uniquePhone() }));
    expect(consent).toMatchObject({ ok: false, error: { code: "FORBIDDEN", message: expect.stringContaining("parent or guardian") } });
    jar.clear();
    await signedInStudent({ isMinor: false });
    expect(await actions.requestWhatsAppCodeAction(null, form({ phone: "abc" }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { phone: expect.any(Array) } },
    });
  });

  it("refuses a signed-out caller", async () => {
    const result = await actions.requestWhatsAppCodeAction(null, form({ phone: uniquePhone() }));
    expect(result).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
  });
});

describe("Settings → WhatsApp while the channel is switched off", () => {
  it("answers NOT_FOUND and sends nothing", async () => {
    flags.whatsapp = false;
    const userId = await signedInStudent({ isMinor: false });
    const phone = uniquePhone();
    expect(await actions.requestWhatsAppCodeAction(null, form({ phone }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(() => latestCodeFor(phone)).toThrow();
    expect(await actions.confirmWhatsAppLinkAction(null, form({ phone, code: "123456" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await actions.unlinkWhatsAppAction(null, form({}))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    expect(await db.channelIdentity.count({ where: { userId, channel: "WHATSAPP" } })).toBe(0);
  });
});
