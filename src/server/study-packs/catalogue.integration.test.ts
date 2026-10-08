import { createHash, randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import type { Prisma } from "@/generated/prisma/client";
import type { Actor } from "@/server/auth/actor";
import { db } from "@/server/db";
import { setContentPublishContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import { createCurriculumChain, createStudent, uniqueSlug, type CurriculumChain } from "../../../tests/factories/index";
import { getStudyPackForStudent, listStudyPacksForStudent, packCheckoutPath, studyPackPath } from "./catalogue";

/** The student study-pack catalogue and landing page against Postgres (§24). Assertions only look at this file's packs. */

let ours: CurriculumChain;
let other: CurriculumChain;

beforeAll(async () => {
  ours = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 1 });
  other = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
});

function studentActor(userId: string, onboarded = true): Actor {
  return {
    kind: "user",
    userId,
    roles: ["STUDENT"],
    platformRoles: ["STUDENT"],
    schoolRoles: [],
    displayName: "Test",
    studentId: userId,
    studentOnboardingCompleted: onboarded,
    timeZone: "Africa/Harare",
    sessionId: null,
    channel: "web",
  };
}

async function student(chain: CurriculumChain): Promise<Actor> {
  const { user } = await createStudent({
    student: { isMinor: false, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  return studentActor(user.id);
}

type ScopeInput = { subjectId?: string; qualificationId?: string };

/** A PUBLISHED pack with its revision snapshot (the workflow trigger checks it at COMMIT). */
async function publishedPack(scopes: ScopeInput[], options: { title?: string; entitlements?: Prisma.InputJsonValue; status?: "PUBLISHED" | "DRAFT" } = {}) {
  const now = new Date();
  const status = options.status ?? "PUBLISHED";
  return db.$transaction(async (tx) => {
    const pack = await tx.studyPack.create({
      data: {
        slug: uniqueSlug("pack"),
        title: options.title ?? "Test Study Pack",
        subtitle: "Everything for one subject",
        description: "## Inside\n\nEvery **lesson** and test.",
        entitlements: options.entitlements ?? { version: 1, features: { flashcards: true }, limits: {} },
        status,
        ...(status === "PUBLISHED" ? { approvedAt: now, publishedAt: now } : {}),
      },
      select: { id: true, slug: true, title: true },
    });
    await setContentPublishContext(tx, pack.id);
    for (const scope of scopes) await tx.studyPackScope.create({ data: { studyPackId: pack.id, ...scope } });
    if (status === "PUBLISHED") {
      const snapshot = { studyPack: { id: pack.id, title: pack.title }, scopes };
      await tx.contentRevision.create({
        data: {
          entityType: "STUDY_PACK",
          entityId: pack.id,
          revision: 1,
          snapshot,
          contentHash: createHash("sha256").update(JSON.stringify(snapshot)).digest("hex"),
          changeNote: "Test fixture",
        },
      });
    }
    return pack;
  });
}

async function price(studyPackId: string, data: Partial<Prisma.PlanPriceUncheckedCreateInput> = {}) {
  return db.planPrice.create({ data: { studyPackId, currency: "USD", amountMinor: 900, interval: "ONE_OFF", ...data }, select: { id: true } });
}

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${(error as Error).message}`;
  }
}

describe("listStudyPacksForStudent", () => {
  it("lists published, purchasable (or owned) packs for the student's qualification with what they unlock and their prices", async () => {
    const actor = await student(ours);
    const forSubject = await publishedPack([{ subjectId: ours.subject.id }], {
      title: "Maths Complete",
      entitlements: { version: 1, features: { flashcards: true, pdfExport: true, personalisedLearning: true, aiTutor: true, advancedAnalytics: true }, limits: {} },
    });
    await price(forSubject.id, { amountMinor: 1200 });
    await price(forSubject.id, { amountMinor: 900, periodDays: 180 });
    const forQualification = await publishedPack([{ qualificationId: ours.qualification.id }], { title: "Whole qualification" });
    await price(forQualification.id, { currency: "ZWG", amountMinor: 25_000 });
    const elsewhere = await publishedPack([{ subjectId: other.subject.id }], { title: "Other qualification" });
    await price(elsewhere.id);
    const unpriced = await publishedPack([{ subjectId: ours.subject.id }], { title: "No price yet" });
    const draft = await publishedPack([{ subjectId: ours.subject.id }], { title: "Draft pack", status: "DRAFT" });
    await price(draft.id);
    const zeroPriced = await publishedPack([{ subjectId: ours.subject.id }], { title: "Zero" });
    await price(zeroPriced.id, { amountMinor: 0 });

    const catalogue = await listStudyPacksForStudent(actor);
    const mine = new Set([forSubject.id, forQualification.id, elsewhere.id, unpriced.id, draft.id, zeroPriced.id]);
    const listed = catalogue.packs.filter((pack) => mine.has(pack.id));
    expect(listed.map((pack) => pack.id).sort()).toEqual([forSubject.id, forQualification.id].sort());
    expect(catalogue.qualificationLabels.length).toBeGreaterThan(0);

    const card = listed.find((pack) => pack.id === forSubject.id);
    expect(card).toMatchObject({
      title: "Maths Complete",
      href: studyPackPath(forSubject.slug),
      checkoutHref: packCheckoutPath(forSubject.id),
      ownership: { state: "none" },
      forYourSubjects: false,
    });
    expect(card?.scopes.map((scope) => scope.kind)).toEqual(["SUBJECT"]);
    expect(card?.fromPrices.map((p) => [p.currency, p.amountMinor])).toEqual([["USD", 900]]);
    expect(card?.prices.map((p) => p.amountMinor)).toEqual([900, 1200]);
    // A pack always unlocks full lessons in its scope; unbuilt features (UNBUILT_FEATURES) and account-wide features
    // that ignore scoped grants (AI tutor, detailed analytics) are never listed.
    expect(card?.unlocks.map((line) => line.key)).toEqual(["lessons", "flashcards"]);
    expect(listed.find((pack) => pack.id === forQualification.id)?.scopes[0]?.kind).toBe("QUALIFICATION");

    // Owning a pack that has no price keeps it in the list, without a checkout link.
    await db.entitlementGrant.create({ data: { userId: actor.userId, source: "STUDY_PACK", studyPackId: unpriced.id, startsAt: new Date(Date.now() - 60_000) } });
    const afterGrant = await listStudyPacksForStudent(actor);
    const owned = afterGrant.packs.find((pack) => pack.id === unpriced.id);
    expect(owned).toMatchObject({ ownership: { state: "active", endsAt: null }, checkoutHref: null });
  });

  it("is empty (honestly) without a qualification, and refuses students who have not finished onboarding", async () => {
    // No qualification and no subjects (the actor flag stands in for a finished onboarding).
    const { user } = await createStudent({ student: { isMinor: false } });
    const catalogue = await listStudyPacksForStudent(studentActor(user.id));
    expect(catalogue).toEqual({ qualificationLabels: [], packs: [] });
    expect(await codeOf(listStudyPacksForStudent(studentActor(user.id, false)))).toBe("FORBIDDEN");
    expect(await codeOf(listStudyPacksForStudent({ ...studentActor(user.id), roles: ["PARENT"], platformRoles: ["PARENT"] }))).toBe("FORBIDDEN");
  });
});

describe("getStudyPackForStudent", () => {
  it("loads a live pack by slug with counts, rendered description and prices; 404 for unknown, draft or malformed slugs", async () => {
    const actor = await student(ours);
    const pack = await publishedPack([{ subjectId: ours.subject.id }], { title: "Landing pack" });
    await price(pack.id, { amountMinor: 1500 });
    const elsewhere = await publishedPack([{ subjectId: other.subject.id }], { title: "Elsewhere pack" });
    const draft = await publishedPack([{ subjectId: ours.subject.id }], { status: "DRAFT" });

    const detail = await getStudyPackForStudent(actor, pack.slug);
    expect(detail).toMatchObject({ id: pack.id, title: "Landing pack", forYourQualification: true, checkoutHref: packCheckoutPath(pack.id) });
    expect(String(detail?.descriptionHtml)).toContain("<strong>lesson</strong>");
    expect(detail?.contents.lessons).toBeGreaterThanOrEqual(0);
    expect(Object.keys(detail?.contents ?? {}).sort()).toEqual(["assessments", "flashcards", "lessons", "questions"]);
    expect(detail?.prices.map((p) => p.amountMinor)).toEqual([1500]);

    const foreign = await getStudyPackForStudent(actor, elsewhere.slug);
    expect(foreign).toMatchObject({ forYourQualification: false, checkoutHref: null, prices: [] });

    expect(await getStudyPackForStudent(actor, draft.slug)).toBeNull();
    expect(await getStudyPackForStudent(actor, `missing-${randomUUID().slice(0, 8)}`)).toBeNull();
    expect(await getStudyPackForStudent(actor, "../etc/passwd")).toBeNull();
    expect(await codeOf(getStudyPackForStudent(studentActor(actor.userId, false), pack.slug))).toBe("FORBIDDEN");
  });
});
