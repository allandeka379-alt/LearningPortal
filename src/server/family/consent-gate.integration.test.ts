import { beforeAll, describe, expect, it, vi } from "vitest";
import type { GuardianConsentStatus } from "@/generated/prisma/client";
import { createAiGateway, type AiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG } from "@/server/ai/config";
import { DbUsageMeter } from "@/server/ai/meter-db";
import { FakeTransport } from "@/server/ai/testing/fake-transport";
import type { Actor } from "@/server/auth/actor";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { solveQuestion } from "@/server/solver/service";
import { createConversation, sendTutorMessage } from "@/server/tutor/service";
import type { TutorStreamEvent } from "@/server/tutor/protocol";
import { assertMayUpload } from "@/server/uploads/service";
import { createEnrollment, createLearner, createLearningSetup, UNLIMITED_LEARNING_FEATURES, type Learner, type LearningSetup } from "../../../tests/factories/index";
import { assertGuardianConsent, GUARDIAN_CONSENT_REASON, guardianConsentRefuses, MINOR_AI_CONSENT_SETTING } from "./consent-gate";

/**
 * MIN-01 regression: guardian consent was recorded but never enforced. A minor whose parent WITHDREW consent (or, where
 * the platform requires it, who has none yet) could still send messages and exercise-book photos to the AI provider
 * through the tutor, the solver and the solver upload route; only WhatsApp honoured it.
 */

// The platform switch is a global Setting row; tests run in parallel against one database, so this file overrides the
// one key in-process instead of writing the shared row.
const policy = vi.hoisted(() => ({ pendingRequired: false }));
vi.mock("@/server/lib/settings", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/server/lib/settings")>();
  const getKnownSetting = ((key: string) =>
    key === "privacy.minorAiConsentRequired" ? Promise.resolve(policy.pendingRequired) : actual.getKnownSetting(key as never)) as typeof actual.getKnownSetting;
  return { ...actual, getKnownSetting };
});

const AI_FEATURES = { ...UNLIMITED_LEARNING_FEATURES, aiTutor: true, aiMessagesPerDay: 200, aiSolverPerDay: 20, aiImageUploads: true, aiMaxModelTier: "STANDARD" } as const;
const noRateLimit = async (): Promise<void> => undefined;

let setup: LearningSetup;

beforeAll(async () => {
  setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, gradeScheme: false });
});

function gatewayWith(transport: FakeTransport): AiGateway {
  const config = structuredClone(DEFAULT_AI_CONFIG);
  config.budget.dailyCostCeilingMicros = null;
  return createAiGateway({ transport, config, meter: new DbUsageMeter() });
}

async function learnerWithConsent(status: GuardianConsentStatus | "ADULT"): Promise<Learner> {
  const learner = await createLearner({ features: { ...AI_FEATURES } });
  await createEnrollment(learner.userId, setup);
  if (status !== "ADULT") {
    await db.student.update({
      where: { userId: learner.userId },
      data:
        status === "GRANTED"
          ? { isMinor: true, guardianConsentStatus: "GRANTED", guardianConsentMethod: "SCHOOL", guardianConsentAt: new Date() }
          : { isMinor: true, guardianConsentStatus: status },
    });
  }
  return learner;
}

async function refusalOf(promise: Promise<unknown>): Promise<{ code: string; reason: unknown } | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    if (!isAppError(error)) throw error;
    return { code: error.code, reason: (error.details as Record<string, unknown> | undefined)?.reason };
  }
}

const consentRefusal = { code: "FORBIDDEN", reason: GUARDIAN_CONSENT_REASON };

async function collect(generator: AsyncGenerator<TutorStreamEvent>): Promise<TutorStreamEvent[]> {
  const events: TutorStreamEvent[] = [];
  for await (const event of generator) events.push(event);
  return events;
}

describe("guardianConsentRefuses (pure)", () => {
  it("refuses WITHDRAWN and REFUSED always, PENDING only when required, never adults or GRANTED", () => {
    const minor = (guardianConsentStatus: GuardianConsentStatus) => ({ isMinor: true, guardianConsentStatus });
    for (const pendingRefused of [false, true]) {
      expect(guardianConsentRefuses(minor("WITHDRAWN"), { pendingRefused })).toBe(true);
      expect(guardianConsentRefuses(minor("REFUSED"), { pendingRefused })).toBe(true);
      expect(guardianConsentRefuses(minor("GRANTED"), { pendingRefused })).toBe(false);
      expect(guardianConsentRefuses({ isMinor: false, guardianConsentStatus: "NOT_REQUIRED" }, { pendingRefused })).toBe(false);
      expect(guardianConsentRefuses(null, { pendingRefused })).toBe(false);
    }
    expect(guardianConsentRefuses(minor("PENDING"), { pendingRefused: false })).toBe(false);
    expect(guardianConsentRefuses(minor("PENDING"), { pendingRefused: true })).toBe(true);
    expect(MINOR_AI_CONSENT_SETTING).toBe("privacy.minorAiConsentRequired");
  });
});

describe("AI processing of a minor's text and photos", () => {
  it("is refused everywhere once a guardian WITHDREW consent, before any upload or model call", async () => {
    const learner = await learnerWithConsent("GRANTED");
    const transport = new FakeTransport();
    const gateway = gatewayWith(transport);
    // While consent stands, the tutor works.
    const conversation = await createConversation(learner.actor, { subjectId: setup.subjectId });

    await db.student.update({ where: { userId: learner.userId }, data: { guardianConsentStatus: "WITHDRAWN" } });

    expect(await refusalOf(assertGuardianConsent(learner.actor, "ai_processing"))).toEqual(consentRefusal);
    expect(await refusalOf(createConversation(learner.actor, { subjectId: setup.subjectId }))).toEqual(consentRefusal);
    const events = await collect(
      sendTutorMessage(learner.actor, conversation.id, { text: "Explain diffusion", mode: "TEACH" }, { gateway, assertRateLimit: noRateLimit }),
    );
    expect(events).toEqual([expect.objectContaining({ type: "error", code: "FORBIDDEN", message: expect.stringMatching(/withdrawn their consent/) })]);
    expect(
      await refusalOf(solveQuestion(learner.actor, { text: "Solve 2x + 3 = 7" }, { gateway, isConfigured: () => true, assertRateLimit: noRateLimit })),
    ).toEqual(consentRefusal);
    expect(await refusalOf(assertMayUpload(learner.actor as unknown as Actor, "solver"))).toEqual(consentRefusal);
    // Nothing reached the AI provider.
    expect(transport.calls).toHaveLength(0);
  });

  it("refuses PENDING consent only while the platform requires consent, and never adults or GRANTED minors", async () => {
    const pending = await learnerWithConsent("PENDING");
    const granted = await learnerWithConsent("GRANTED");
    const adult = await learnerWithConsent("ADULT");
    try {
      policy.pendingRequired = false;
      await expect(createConversation(pending.actor, { subjectId: setup.subjectId })).resolves.toMatchObject({ id: expect.any(String) });
      await expect(assertMayUpload(pending.actor as unknown as Actor, "solver")).resolves.toBeUndefined();

      policy.pendingRequired = true;
      expect(await refusalOf(createConversation(pending.actor, { subjectId: setup.subjectId }))).toEqual(consentRefusal);
      expect(await refusalOf(assertMayUpload(pending.actor as unknown as Actor, "solver"))).toEqual(consentRefusal);
      for (const allowed of [granted, adult]) {
        await expect(assertGuardianConsent(allowed.actor, "ai_processing")).resolves.toBeUndefined();
        await expect(createConversation(allowed.actor, { subjectId: setup.subjectId })).resolves.toMatchObject({ id: expect.any(String) });
      }
    } finally {
      policy.pendingRequired = false;
    }
  });

  it("lets a solve through for an adult with the same setup (the gate is not what refuses)", async () => {
    const adult = await learnerWithConsent("ADULT");
    const transport = new FakeTransport();
    const outcome = await solveQuestion(adult.actor, { text: "Solve 2x + 3 = 7" }, { gateway: gatewayWith(transport), isConfigured: () => true, assertRateLimit: noRateLimit }).then(
      () => "called",
      (error: unknown) => (isAppError(error) ? error.code : "threw"),
    );
    // Whatever the fake reply makes of it, the request was not refused for consent and the provider was asked.
    expect(outcome).not.toBe("FORBIDDEN");
    expect(transport.calls.length).toBeGreaterThan(0);
  });
});
