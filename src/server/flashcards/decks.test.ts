import { describe, expect, it } from "vitest";
import {
  DEFAULT_NEW_CARDS_PER_DAY,
  assignCardsToSubjects,
  buildDueQueue,
  cardInTopic,
  comesBackInSession,
  compareNewCards,
  countCard,
  deckIndex,
  deckTopics,
  emptyDeckCounts,
  newCardsRemaining,
  nextDueAt,
  summarizeSubjectDeck,
  type DeckCard,
  type DeckCardState,
  type DeckTopic,
} from "./decks";

const NOW = new Date("2026-10-05T10:00:00.000Z");
const minutes = (n: number) => new Date(NOW.getTime() + n * 60_000);

// Section S → topics T1, T2 → subtopics T1a, T1b, T2a.
const TOPICS: DeckTopic[] = [
  { id: "S", parentId: null, kind: "SECTION", path: "S", name: "Section", code: "A" },
  { id: "T1", parentId: "S", kind: "TOPIC", path: "S/T1", name: "Algebra", code: "1" },
  { id: "T1a", parentId: "T1", kind: "SUBTOPIC", path: "S/T1/T1a", name: "Indices", code: "1.1" },
  { id: "T1b", parentId: "T1", kind: "SUBTOPIC", path: "S/T1/T1b", name: "Factorising", code: "1.2" },
  { id: "T2", parentId: "S", kind: "TOPIC", path: "S/T2", name: "Geometry", code: "2" },
  { id: "T2a", parentId: "T2", kind: "SUBTOPIC", path: "S/T2/T2a", name: "Angles", code: "2.1" },
];
const BY_ID = new Map(TOPICS.map((t) => [t.id, t]));

function card(id: string, overrides: Partial<DeckCard> = {}): DeckCard {
  return { flashcardId: id, subjectId: "subj", topicIds: [], isPersonal: false, topicOrder: 0, tagOrder: 0, createdAtMs: 0, ...overrides };
}

function state(id: string, overrides: Partial<DeckCardState> = {}): DeckCardState {
  return { flashcardId: id, phase: "REVIEW", dueAt: minutes(-60), intervalDays: 3, isSuspended: false, ...overrides };
}

describe("deck structure", () => {
  it("puts topic decks at the TOPIC level, or at the roots when a tree has no TOPIC nodes", () => {
    expect(deckTopics(TOPICS).map((t) => t.id)).toEqual(["T1", "T2"]);
    const flat: DeckTopic[] = [
      { id: "R1", parentId: null, kind: "SECTION", path: "R1", name: "R1", code: null },
      { id: "R1a", parentId: "R1", kind: "SUBTOPIC", path: "R1/R1a", name: "R1a", code: null },
    ];
    expect(deckTopics(flat).map((t) => t.id)).toEqual(["R1"]);
  });

  it("maps every topic to its deck (itself or an ancestor); a section above the decks maps to none", () => {
    const index = deckIndex(TOPICS, deckTopics(TOPICS));
    expect(index.get("T1a")).toEqual(["T1"]);
    expect(index.get("T2")).toEqual(["T2"]);
    expect(index.get("S")).toEqual([]);
  });

  it("finds cards tagged to a topic or anything below it", () => {
    expect(cardInTopic(card("c", { topicIds: ["T1b"] }), "T1", BY_ID)).toBe(true);
    expect(cardInTopic(card("c", { topicIds: ["T1b"] }), "T1b", BY_ID)).toBe(true);
    expect(cardInTopic(card("c", { topicIds: ["T1b"] }), "T2", BY_ID)).toBe(false);
    expect(cardInTopic(card("c", { topicIds: ["S"] }), "T1", BY_ID)).toBe(false);
  });
});

describe("deck counts", () => {
  it("classifies each card once: new, suspended, learning, young, mature; due overlaps", () => {
    const counts = emptyDeckCounts();
    countCard(counts, undefined, NOW); // new (never introduced)
    countCard(counts, state("n", { phase: "NEW" }), NOW); // introduced, never answered
    countCard(counts, state("s", { isSuspended: true }), NOW);
    countCard(counts, state("l", { phase: "LEARNING", intervalDays: 0, dueAt: minutes(-1) }), NOW); // learning + due
    countCard(counts, state("r", { phase: "RELEARNING", intervalDays: 1, dueAt: minutes(5) }), NOW); // learning, not due
    countCard(counts, state("y", { intervalDays: 20, dueAt: minutes(-1) }), NOW); // young + due
    countCard(counts, state("m", { intervalDays: 21, dueAt: minutes(60 * 24) }), NOW); // mature, not due
    expect(counts).toEqual({ total: 6, due: 2, newAvailable: 2, learning: 2, young: 1, mature: 1, suspended: 1 });
  });

  it("summarises a subject and its topic decks, hiding empty topic decks", () => {
    const cards = [
      card("a", { topicIds: ["T1a"] }),
      card("b", { topicIds: ["T1b", "T1a"] }), // two tags in one deck: counted once there
      card("c", { topicIds: ["S"] }), // section-level: subject deck only
      card("p", { topicIds: [], isPersonal: true }),
    ];
    const states = new Map([["a", state("a")]]);
    const summary = summarizeSubjectDeck({ topics: TOPICS, cards, states, now: NOW });
    expect(summary.counts).toMatchObject({ total: 4, due: 1, newAvailable: 3 });
    expect(summary.personalCards).toBe(1);
    expect(summary.topics).toEqual([{ topicId: "T1", name: "Algebra", code: "1", counts: expect.objectContaining({ total: 2, due: 1, newAvailable: 1 }) }]);
  });
});

describe("new-card order and allowance", () => {
  it("introduces the student's own cards first (oldest first), then platform cards in syllabus order", () => {
    const cards = [
      card("late-topic", { topicOrder: 5 }),
      card("early-topic-2", { topicOrder: 1, tagOrder: 2 }),
      card("early-topic-1", { topicOrder: 1, tagOrder: 1 }),
      card("untagged", { topicOrder: Infinity }),
      card("mine-new", { isPersonal: true, createdAtMs: 200 }),
      card("mine-old", { isPersonal: true, createdAtMs: 100 }),
    ];
    expect([...cards].sort(compareNewCards).map((c) => c.flashcardId)).toEqual([
      "mine-old",
      "mine-new",
      "early-topic-1",
      "early-topic-2",
      "late-topic",
      "untagged",
    ]);
  });

  it("caps the allowance at the setting and never goes negative", () => {
    expect(newCardsRemaining(DEFAULT_NEW_CARDS_PER_DAY, 0)).toBe(20);
    expect(newCardsRemaining(20, 7)).toBe(13);
    expect(newCardsRemaining(20, 25)).toBe(0);
    expect(newCardsRemaining(0, 0)).toBe(0);
    expect(newCardsRemaining(Number.NaN, 0)).toBe(DEFAULT_NEW_CARDS_PER_DAY);
  });
});

describe("buildDueQueue", () => {
  const cards = [
    card("review-old", { topicOrder: 3 }),
    card("review-new", { topicOrder: 3 }),
    card("learning", { topicOrder: 3 }),
    card("later", { topicOrder: 3 }),
    card("suspended", { topicOrder: 3 }),
    card("new-1", { topicOrder: 1 }),
    card("new-2", { topicOrder: 2 }),
    card("new-3", { topicOrder: 3 }),
  ];
  const states = new Map<string, DeckCardState>([
    ["review-old", state("review-old", { dueAt: minutes(-3 * 24 * 60) })],
    ["review-new", state("review-new", { dueAt: minutes(-60) })],
    ["learning", state("learning", { phase: "LEARNING", intervalDays: 0, dueAt: minutes(-1) })],
    ["later", state("later", { dueAt: minutes(24 * 60) })],
    ["suspended", state("suspended", { dueAt: minutes(-10), isSuspended: true })],
  ]);

  it("orders due cards first (learning, then oldest reviews) and then new cards in introduction order", () => {
    const queue = buildDueQueue({ cards, states, now: NOW, limit: 50, newLimit: 20 });
    expect(queue.entries.map((e) => `${e.kind}:${e.flashcardId}`)).toEqual([
      "LEARNING:learning",
      "REVIEW:review-old",
      "REVIEW:review-new",
      "NEW:new-1",
      "NEW:new-2",
      "NEW:new-3",
    ]);
    expect(queue).toMatchObject({ dueTotal: 3, newAvailable: 3 });
  });

  it("applies the daily new-card cap and the session limit (due cards win)", () => {
    expect(buildDueQueue({ cards, states, now: NOW, limit: 50, newLimit: 2 }).entries.filter((e) => e.kind === "NEW").map((e) => e.flashcardId)).toEqual(["new-1", "new-2"]);
    expect(buildDueQueue({ cards, states, now: NOW, limit: 50, newLimit: 0 }).entries.some((e) => e.kind === "NEW")).toBe(false);
    const tight = buildDueQueue({ cards, states, now: NOW, limit: 4, newLimit: 20 });
    expect(tight.entries.map((e) => e.flashcardId)).toEqual(["learning", "review-old", "review-new", "new-1"]);
    expect(buildDueQueue({ cards, states, now: NOW, limit: 2, newLimit: 20 }).entries.map((e) => e.flashcardId)).toEqual(["learning", "review-old"]);
  });

  it("never queues suspended cards or cards due later; reports the next due time", () => {
    const ids = buildDueQueue({ cards, states, now: NOW, limit: 50, newLimit: 20 }).entries.map((e) => e.flashcardId);
    expect(ids).not.toContain("suspended");
    expect(ids).not.toContain("later");
    expect(nextDueAt(states.values(), NOW)).toEqual(minutes(24 * 60));
    expect(nextDueAt([state("x", { isSuspended: true, dueAt: minutes(5) })], NOW)).toBeNull();
  });
});

describe("session helpers", () => {
  it("brings learning steps due within 20 minutes back into the session", () => {
    expect(comesBackInSession({ isLearningStep: true, dueAt: minutes(10) }, NOW)).toBe(true);
    expect(comesBackInSession({ isLearningStep: true, dueAt: minutes(21) }, NOW)).toBe(false);
    expect(comesBackInSession({ isLearningStep: false, dueAt: minutes(1) }, NOW)).toBe(false);
  });

  it("assigns a card offered by two subjects to one: its state's subject, else the first offer", () => {
    const shared = (subjectId: string) => card("shared", { subjectId });
    const offers = [
      { subjectId: "maths", cards: [shared("maths"), card("m-only", { subjectId: "maths" })] },
      { subjectId: "add-maths", cards: [shared("add-maths")] },
    ];
    const fresh = assignCardsToSubjects(offers, new Map());
    expect(fresh.get("maths")?.map((c) => c.flashcardId)).toEqual(["shared", "m-only"]);
    expect(fresh.get("add-maths")).toEqual([]);
    const studied = assignCardsToSubjects(offers, new Map([["shared", "add-maths"]]));
    expect(studied.get("maths")?.map((c) => c.flashcardId)).toEqual(["m-only"]);
    expect(studied.get("add-maths")?.map((c) => c.flashcardId)).toEqual(["shared"]);
    // A state from a subject that no longer offers the card falls back to the first offer.
    expect(assignCardsToSubjects(offers, new Map([["shared", "dropped"]])).get("maths")?.map((c) => c.flashcardId)).toContain("shared");
  });
});
