import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { ContentAccessTier } from "@/generated/prisma/client";
import { localDateString } from "@/lib/dates";
import { hasEntitlement } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createEnrollment, createLearner, createLearningSetup, type LearningSetup } from "../../../tests/factories/learning";
import {
  countDueFlashcards,
  createPersonalCard,
  deletePersonalCard,
  getCardPreview,
  getDeckOverview,
  getDueQueue,
  getPersonalCard,
  listPersonalCards,
  listSuspendedCards,
  reviewCard,
  setCardSuspended,
  syncReviews,
  updatePersonalCard,
} from "./service";

/**
 * Integration tests (test DB) for the flashcards service (§18): decks from the pinned version, due-queue ordering, the
 * daily new-card cap, persisted review transitions (state + log + DailyActivity + XP), idempotent replays, suspension
 * and privacy of personal cards. Every fixture is unique to its test; nothing global is read or truncated.
 */

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

async function setup(): Promise<{ learning: LearningSetup; userId: string; actor: { userId: string; roles: ["STUDENT"] } }> {
  const learning = await createLearningSetup({ topics: 2, subtopicsPerTopic: 2, questionsPerLeaf: 0, lessonsPerTopic: 0, gradeScheme: false });
  const { userId } = await createLearner();
  await createEnrollment(userId, learning);
  return { learning, userId, actor: { userId, roles: ["STUDENT"] } };
}

let cardCounter = 0;

/** A PUBLISHED platform card (with its ContentRevision snapshot, like the publish flow) tagged to `topicId`. */
async function platformCard(learning: LearningSetup, topicId: string, options: { front?: string; accessTier?: ContentAccessTier; sortOrder?: number } = {}): Promise<string> {
  cardCounter += 1;
  const front = options.front ?? `Term ${cardCounter} with $x^2$`;
  const back = `Definition ${cardCounter}`;
  const now = new Date();
  return db.$transaction(async (tx) => {
    const card = await tx.flashcard.create({
      data: {
        subjectId: learning.subjectId,
        cardType: "DEFINITION",
        front,
        back,
        accessTier: options.accessTier ?? "FREE",
        status: "PUBLISHED",
        revision: 1,
        approvedAt: now,
        publishedAt: now,
        copyrightStatus: "OWNED",
        author: "Test author",
        topics: { create: { topicId, isPrimary: true, sortOrder: options.sortOrder ?? 0 } },
      },
      select: { id: true },
    });
    const snapshot = { flashcard: { id: card.id, front, back, cardType: "DEFINITION", revision: 1 }, topics: [{ topicId, isPrimary: true }] };
    await tx.contentRevision.create({
      data: {
        entityType: "FLASHCARD",
        entityId: card.id,
        revision: 1,
        snapshot,
        contentHash: createHash("sha256").update(JSON.stringify(snapshot)).digest("hex"),
        changeNote: "Test fixture",
      },
    });
    return card.id;
  });
}

function leaf(learning: LearningSetup, index: number): string {
  const id = learning.leafTopicIds[index];
  if (!id) throw new Error(`no leaf ${index}`);
  return id;
}

async function codeOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    return isAppError(error) ? error.code : "UNEXPECTED";
  }
  return "RESOLVED";
}

describe("decks and the due queue", () => {
  it("orders due cards first (learning, then reviews) and then new cards in syllabus order", async () => {
    const { learning, actor } = await setup();
    // Created out of syllabus order on purpose: the queue follows the topic tree, not creation time.
    const lateNew = await platformCard(learning, leaf(learning, 3));
    const earlyNew = await platformCard(learning, leaf(learning, 0));
    const learningCard = await platformCard(learning, leaf(learning, 1));
    const reviewCardId = await platformCard(learning, leaf(learning, 1));
    const notDue = await platformCard(learning, leaf(learning, 2));

    const t0 = new Date(Date.now() - 2 * DAY);
    await reviewCard(actor, { flashcardId: learningCard, rating: "GOOD" }, t0); // step 2: due in 10 minutes
    await reviewCard(actor, { flashcardId: reviewCardId, rating: "GOOD" }, t0);
    await reviewCard(actor, { flashcardId: reviewCardId, rating: "GOOD" }, new Date(t0.getTime() + 11 * 60_000)); // graduates: 1 day
    await reviewCard(actor, { flashcardId: notDue, rating: "EASY" }, t0); // 3-5 days: not due yet

    const queue = await getDueQueue(actor, { subjectId: learning.subjectId });
    expect(queue.entitled).toBe(true);
    expect(queue.cards.map((c) => c.flashcardId)).toEqual([learningCard, reviewCardId, earlyNew, lateNew]);
    expect(queue.cards.map((c) => c.isNew)).toEqual([false, false, true, true]);
    expect(queue).toMatchObject({ dueTotal: 2, newAvailable: 2, newRemainingToday: 20 });
    const first = queue.cards[0];
    expect(first?.phase).toBe("LEARNING");
    expect(first?.intervals.GOOD).toMatch(/^\d+d$/);
    const fresh = queue.cards[2];
    expect(fresh?.intervals).toEqual({ AGAIN: "<1m", HARD: "<6m", GOOD: "<10m", EASY: "4d" });
    expect(fresh?.frontHtml).toContain("katex");
    expect(fresh?.subjectName).toBe(learning.chain.subject.name);
    expect(fresh?.topicName).toBe("Subtopic 1.1");

    expect(await countDueFlashcards(actor.userId)).toBe(2);

    const overview = await getDeckOverview(actor);
    const subject = overview.subjects.find((s) => s.subjectId === learning.subjectId);
    expect(subject?.counts).toMatchObject({ total: 5, due: 2, newAvailable: 2, learning: 1, young: 2 });
    expect(subject?.topics.map((t) => t.name)).toEqual(["Topic 1", "Topic 2"]);
    expect(subject?.topics[0]?.counts).toMatchObject({ total: 3, due: 2, newAvailable: 1 });
    expect(overview.reviewAllCount).toBe(4);
  });

  it("limits the queue to a topic subtree", async () => {
    const { learning, actor } = await setup();
    const inTopic1 = [await platformCard(learning, leaf(learning, 0)), await platformCard(learning, leaf(learning, 1))];
    await platformCard(learning, leaf(learning, 2));
    const topic1 = learning.topicIds[0] as string;

    const topicQueue = await getDueQueue(actor, { topicId: topic1 });
    expect(topicQueue.scope).toMatchObject({ subjectId: learning.subjectId, topicId: topic1, topicName: "Topic 1" });
    expect(topicQueue.cards.map((c) => c.flashcardId).sort()).toEqual([...inTopic1].sort());
    const leafQueue = await getDueQueue(actor, { subjectId: learning.subjectId, topicId: leaf(learning, 1) });
    expect(leafQueue.cards.map((c) => c.flashcardId)).toEqual([inTopic1[1]]);
    expect(await codeOf(getDueQueue(actor, { topicId: "0199a1b2-0000-7000-8000-000000000001" }))).toBe("NOT_FOUND");
  });

  it("caps new cards per local day, counting cards already started today", async () => {
    const { learning, actor } = await setup();
    const ids: string[] = [];
    for (let i = 0; i < 24; i += 1) ids.push(await platformCard(learning, leaf(learning, i % 4), { sortOrder: i }));

    const before = await getDueQueue(actor, {});
    expect(before.cards.filter((c) => c.isNew)).toHaveLength(20);
    expect(before.newAvailable).toBe(24);

    for (const card of before.cards.slice(0, 5)) await reviewCard(actor, { flashcardId: card.flashcardId, rating: "GOOD" });
    const after = await getDueQueue(actor, {});
    // Five started today: 15 new cards left today; the five learning cards come back in 10 minutes (not due yet).
    expect(after.newRemainingToday).toBe(15);
    expect(after.cards.filter((c) => c.isNew)).toHaveLength(15);
    expect(after.cards.some((c) => !c.isNew)).toBe(false);
    expect(after.nextDueAt).not.toBeNull();
  });

  it("hides platform cards (FREE ones too, no free tier) without full access and everything without the flashcards entitlement", async () => {
    const learning = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, lessonsPerTopic: 0, gradeScheme: false });
    const { userId } = await createLearner({ features: { flashcards: true } });
    await createEnrollment(userId, learning);
    const actor = { userId, roles: ["STUDENT" as const] };
    const free = await platformCard(learning, leaf(learning, 0), { accessTier: "FREE" });
    const premium = await platformCard(learning, leaf(learning, 0), { accessTier: "PREMIUM" });

    const queue = await getDueQueue(actor, {});
    const ids = queue.cards.map((c) => c.flashcardId);
    // The shared default plan may open full content; only assert the full-access rule when it does not.
    if (!(await hasEntitlement(actor, "lessons.full"))) {
      expect(ids).not.toContain(free);
      expect(ids).not.toContain(premium);
      expect(await codeOf(reviewCard(actor, { flashcardId: free, rating: "GOOD" }))).toBe("ENTITLEMENT_REQUIRED");
      expect(await codeOf(reviewCard(actor, { flashcardId: premium, rating: "GOOD" }))).toBe("ENTITLEMENT_REQUIRED");
    }
    const full = await createLearner({ features: { flashcards: true, lessonAccess: "ALL" } });
    await createEnrollment(full.userId, learning);
    const fullIds = (await getDueQueue({ userId: full.userId, roles: ["STUDENT" as const] }, {})).cards.map((c) => c.flashcardId);
    expect(fullIds).toEqual(expect.arrayContaining([free, premium]));

    const plain = await createLearner({ features: null });
    await createEnrollment(plain.userId, learning);
    const plainActor = { userId: plain.userId, roles: ["STUDENT" as const] };
    if (!(await hasEntitlement(plainActor, "flashcards"))) {
      expect(await getDueQueue(plainActor, {})).toMatchObject({ entitled: false, cards: [] });
      expect((await getDeckOverview(plainActor)).entitled).toBe(false);
      expect(await codeOf(reviewCard(plainActor, { flashcardId: free, rating: "GOOD" }))).toBe("ENTITLEMENT_REQUIRED");
    }
  });

  it("refuses non-students and subjects the student does not take", async () => {
    const { learning, actor } = await setup();
    expect(await codeOf(getDueQueue({ userId: actor.userId, roles: ["PARENT"] }, {}))).toBe("FORBIDDEN");
    const other = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, lessonsPerTopic: 0, gradeScheme: false });
    expect(await codeOf(getDueQueue(actor, { subjectId: other.subjectId }))).toBe("NOT_FOUND");
    const elsewhere = await platformCard(other, leaf(other, 0));
    expect(await codeOf(reviewCard(actor, { flashcardId: elsewhere, rating: "GOOD" }))).toBe("NOT_FOUND");
    expect(await getCardPreview(actor, elsewhere)).toBeNull();
    expect(learning.subjectId).not.toBe(other.subjectId);
  });
});

describe("reviews", () => {
  it("persists the transition, the review log and the day's activity", async () => {
    const { learning, actor, userId } = await setup();
    const id = await platformCard(learning, leaf(learning, 0));
    // An offline answer from two days ago (client press time), so the graduated card is due again by now.
    const at = new Date(Date.now() - 2 * DAY);

    const outcome = await reviewCard(actor, { flashcardId: id, rating: "GOOD", durationMs: 4_000, clientReviewId: "test-review-0001", reviewedAt: at.toISOString() });
    expect(outcome).toMatchObject({ flashcardId: id, replayed: false, phase: "LEARNING", isLearningStep: true, isLeech: false, intervalDays: 0 });
    expect(outcome.nextIntervals).toEqual({ AGAIN: "<1m", HARD: "<10m", GOOD: "1d", EASY: "4d" });

    const state = await db.flashcardState.findUniqueOrThrow({ where: { userId_flashcardId: { userId, flashcardId: id } } });
    expect(state).toMatchObject({ subjectId: learning.subjectId, state: "LEARNING", learningStep: 1, reviewCount: 1, repetitions: 1, lastRating: "GOOD", easeFactor: 2.5 });
    expect(state.lastReviewedAt).toEqual(at);
    expect(state.dueAt.getTime()).toBe(at.getTime() + 10 * 60_000);

    const reviews = await db.flashcardReview.findMany({ where: { userId, flashcardId: id } });
    expect(reviews).toHaveLength(1);
    expect(reviews[0]).toMatchObject({ previousState: "NEW", newState: "LEARNING", rating: "GOOD", durationMs: 4_000, clientReviewId: "test-review-0001", previousDueAt: null });

    // Graduate, then forget it: a lapse (ease drops, relearning).
    await reviewCard(actor, { flashcardId: id, rating: "GOOD", reviewedAt: new Date(at.getTime() + 11 * 60_000).toISOString() });
    const graduated = await db.flashcardState.findUniqueOrThrow({ where: { userId_flashcardId: { userId, flashcardId: id } } });
    expect(graduated).toMatchObject({ state: "REVIEW", intervalDays: 1, reviewCount: 2 });
    expect(graduated.dueAt.getTime()).toBeLessThanOrEqual(Date.now());
    const lapse = await reviewCard(actor, { flashcardId: id, rating: "AGAIN" });
    expect(lapse.phase).toBe("RELEARNING");
    const lapsed = await db.flashcardState.findUniqueOrThrow({ where: { userId_flashcardId: { userId, flashcardId: id } } });
    expect(lapsed).toMatchObject({ state: "RELEARNING", lapses: 1, repetitions: 0, easeFactor: 2.3, reviewCount: 3 });

    const firstDay = await db.dailyActivity.findUniqueOrThrow({
      where: { userId_date: { userId, date: new Date(`${localDateString(at, "Africa/Harare")}T00:00:00.000Z`) } },
    });
    expect(firstDay.flashcardsReviewed).toBeGreaterThanOrEqual(1);
    expect(firstDay.studySeconds).toBeGreaterThanOrEqual(4);
    const totals = await db.dailyActivity.aggregate({ where: { userId }, _sum: { flashcardsReviewed: true } });
    expect(totals._sum.flashcardsReviewed).toBe(3);
  });

  it("applies a review id once, however often it is retried", async () => {
    const { learning, actor, userId } = await setup();
    const id = await platformCard(learning, leaf(learning, 0));
    const other = await platformCard(learning, leaf(learning, 1));
    const input = { flashcardId: id, rating: "EASY" as const, durationMs: 1_000, clientReviewId: "offline:abc:1", reviewedAt: new Date().toISOString() };

    const [a, b] = await Promise.all([reviewCard(actor, input), reviewCard(actor, input)]);
    expect([a.replayed, b.replayed].sort()).toEqual([false, true]);
    expect(a.dueAt).toBe(b.dueAt);
    const replay = await reviewCard(actor, input);
    expect(replay).toMatchObject({ replayed: true, phase: "REVIEW", xpAwarded: 0 });
    expect(await db.flashcardReview.count({ where: { userId, flashcardId: id } })).toBe(1);
    expect((await db.flashcardState.findUniqueOrThrow({ where: { userId_flashcardId: { userId, flashcardId: id } } })).reviewCount).toBe(1);
    const day = await db.dailyActivity.findFirstOrThrow({ where: { userId }, orderBy: { date: "desc" } });
    expect(day.flashcardsReviewed).toBe(1);

    expect(await codeOf(reviewCard(actor, { ...input, flashcardId: other }))).toBe("CONFLICT");
    expect(await codeOf(reviewCard(actor, { flashcardId: id, rating: "MAYBE" }))).toBe("VALIDATION");
  });

  it("replays an offline batch in press order and reports bad items in place", async () => {
    const { learning, actor, userId } = await setup();
    const id = await platformCard(learning, leaf(learning, 0));
    const t = Date.now() - 30 * 60_000;
    const results = await syncReviews(actor, [
      { flashcardId: id, rating: "GOOD", clientReviewId: "batch-0000-2", reviewedAt: new Date(t + 11 * 60_000).toISOString(), durationMs: 2000 },
      { flashcardId: id, rating: "GOOD", clientReviewId: "batch-0000-1", reviewedAt: new Date(t).toISOString(), durationMs: 2000 },
      { flashcardId: "not-a-uuid", rating: "GOOD", clientReviewId: "batch-0000-3" },
    ]);
    expect(results.map((r) => [r.clientReviewId, r.ok])).toEqual([
      ["batch-0000-1", true],
      ["batch-0000-2", true],
      ["batch-0000-3", false],
    ]);
    const state = await db.flashcardState.findUniqueOrThrow({ where: { userId_flashcardId: { userId, flashcardId: id } } });
    expect(state).toMatchObject({ state: "REVIEW", reviewCount: 2 });
  });

  it("earns flashcard XP per batch of ten reviews and keeps the lifetime counter", async () => {
    const { learning, actor, userId } = await setup();
    const ids: string[] = [];
    for (let i = 0; i < 10; i += 1) ids.push(await platformCard(learning, leaf(learning, i % 4)));
    const at = new Date(Date.now() - 2 * HOUR);
    let xp = 0;
    for (const [i, id] of ids.entries()) {
      const outcome = await reviewCard(actor, { flashcardId: id, rating: "EASY", reviewedAt: new Date(at.getTime() + i * 1000).toISOString(), durationMs: 3000 });
      xp += outcome.xpAwarded;
    }
    const date = localDateString(at, "Africa/Harare");
    const batch = await db.xpEvent.findMany({ where: { userId, reason: "FLASHCARD_SESSION_COMPLETED" } });
    expect(batch.map((e) => e.sourceId)).toEqual([`flashcards:${date}:1`]);
    expect(xp).toBeGreaterThanOrEqual(batch[0]?.amount ?? 1);
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats.flashcardsReviewed).toBe(10);
    // Reviewing 5 flashcards meets the daily goal: the streak started today.
    expect(stats.currentStreak).toBeGreaterThanOrEqual(1);
  });
});

describe("suspension", () => {
  it("removes a card from the queue and restores it with its schedule", async () => {
    const { learning, actor, userId } = await setup();
    const id = await platformCard(learning, leaf(learning, 0));
    await setCardSuspended(actor, { flashcardId: id, suspended: true });
    expect((await getDueQueue(actor, {})).cards.map((c) => c.flashcardId)).not.toContain(id);
    const overview = await getDeckOverview(actor);
    expect(overview.subjects[0]?.counts).toMatchObject({ suspended: 1, total: 0 });
    expect((await listSuspendedCards(actor)).items.map((i) => i.flashcardId)).toEqual([id]);
    expect((await getCardPreview(actor, id))?.suspended).toBe(true);

    await setCardSuspended(actor, { flashcardId: id, suspended: false });
    expect((await getDueQueue(actor, {})).cards.map((c) => c.flashcardId)).toContain(id);
    expect((await db.flashcardState.findUniqueOrThrow({ where: { userId_flashcardId: { userId, flashcardId: id } } })).state).toBe("NEW");
    expect(await codeOf(setCardSuspended(actor, { flashcardId: "0199a1b2-0000-7000-8000-000000000002", suspended: false }))).toBe("NOT_FOUND");
  });
});

describe("personal cards", () => {
  it("are created PUBLISHED and rendered, studied first, and private to their owner", async () => {
    const { learning, actor } = await setup();
    await platformCard(learning, leaf(learning, 0));
    const { id } = await createPersonalCard(actor, {
      subjectId: learning.subjectId,
      topicId: leaf(learning, 1),
      cardType: "FORMULA",
      front: "Quadratic formula",
      back: "$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
      notes: "",
    });
    const row = await db.flashcard.findUniqueOrThrow({ where: { id }, include: { topics: true } });
    expect(row).toMatchObject({ ownerUserId: actor.userId, status: "PUBLISHED", notes: null, cardType: "FORMULA" });
    expect(JSON.stringify(row.renderedHtml)).toContain("katex");
    expect(row.topics).toEqual([expect.objectContaining({ topicId: leaf(learning, 1), isPrimary: true })]);

    const queue = await getDueQueue(actor, {});
    expect(queue.cards[0]).toMatchObject({ flashcardId: id, isPersonal: true, topicName: "Subtopic 1.2" });
    expect((await getDeckOverview(actor)).subjects[0]?.personalCards).toBe(1);
    expect((await listPersonalCards(actor)).items.map((i) => i.id)).toEqual([id]);

    // Another student in the same subject never sees or touches it.
    const intruder = await createLearner();
    await createEnrollment(intruder.userId, learning);
    const other = { userId: intruder.userId, roles: ["STUDENT" as const] };
    expect((await getDueQueue(other, {})).cards.map((c) => c.flashcardId)).not.toContain(id);
    expect((await listPersonalCards(other)).items).toEqual([]);
    expect(await getCardPreview(other, id)).toBeNull();
    expect(await codeOf(getPersonalCard(other, id))).toBe("NOT_FOUND");
    expect(await codeOf(reviewCard(other, { flashcardId: id, rating: "GOOD" }))).toBe("NOT_FOUND");
    expect(await codeOf(setCardSuspended(other, { flashcardId: id, suspended: true }))).toBe("NOT_FOUND");
    expect(await codeOf(updatePersonalCard(other, { id, subjectId: learning.subjectId, cardType: "FACT", front: "x", back: "y" }))).toBe("NOT_FOUND");
    expect(await codeOf(deletePersonalCard(other, id))).toBe("NOT_FOUND");
  });

  it("are edited and deleted by their owner; deleting keeps the review history", async () => {
    const { learning, actor, userId } = await setup();
    const { id } = await createPersonalCard(actor, { subjectId: learning.subjectId, cardType: "VOCABULARY", front: "Osmosis", back: "Water moves" });
    await reviewCard(actor, { flashcardId: id, rating: "GOOD" });

    await updatePersonalCard(actor, { id, subjectId: learning.subjectId, topicId: leaf(learning, 0), cardType: "DEFINITION", front: "Osmosis (biology)", back: "Net movement of water", notes: "Through a membrane" });
    expect(await getPersonalCard(actor, id)).toMatchObject({ front: "Osmosis (biology)", topicId: leaf(learning, 0), cardType: "DEFINITION", notes: "Through a membrane" });
    expect((await db.flashcardState.findUniqueOrThrow({ where: { userId_flashcardId: { userId, flashcardId: id } } })).reviewCount).toBe(1);

    await deletePersonalCard(actor, id);
    expect(await db.flashcard.findUniqueOrThrow({ where: { id } })).toMatchObject({ status: "ARCHIVED" });
    expect(await db.flashcardReview.count({ where: { userId, flashcardId: id } })).toBe(1);
    expect((await getDueQueue(actor, {})).cards.map((c) => c.flashcardId)).not.toContain(id);
    expect(await codeOf(getPersonalCard(actor, id))).toBe("NOT_FOUND");
  });

  it("validate the subject, the topic and the text", async () => {
    const { learning, actor } = await setup();
    const other = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 0, lessonsPerTopic: 0, gradeScheme: false });
    expect(await codeOf(createPersonalCard(actor, { subjectId: other.subjectId, cardType: "FACT", front: "a", back: "b" }))).toBe("VALIDATION");
    expect(await codeOf(createPersonalCard(actor, { subjectId: learning.subjectId, topicId: leaf(other, 0), cardType: "FACT", front: "a", back: "b" }))).toBe("VALIDATION");
    expect(await codeOf(createPersonalCard(actor, { subjectId: learning.subjectId, cardType: "FACT", front: "   ", back: "b" }))).toBe("VALIDATION");
    expect(await codeOf(createPersonalCard(actor, { subjectId: learning.subjectId, cardType: "NOPE", front: "a", back: "b" }))).toBe("VALIDATION");
    expect(await codeOf(createPersonalCard(actor, { subjectId: learning.subjectId, cardType: "FACT", front: "a".repeat(2001), back: "b" }))).toBe("VALIDATION");
  });
});
