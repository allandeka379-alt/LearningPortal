/**
 * Flashcard decks and the review queue (§18). Pure core: no DB, no I/O; the service (./service.ts) loads rows and
 * delegates every decision here, so the rules are unit tested in isolation (CLAUDE.md rule 2).
 *
 * **Decks.** A student's cards in a subject are the PUBLISHED platform cards tagged (FlashcardTopic) to in-scope topics
 * of the enrolment's pinned syllabus version, plus the student's own personal cards. A topic deck is the cards tagged
 * to that topic's subtree. Topic decks sit at the TOPIC level of the tree (roots when a tree has no TOPIC nodes), so a
 * subtopic-tagged card counts in its topic's deck and a section-tagged card only in the subject deck.
 *
 * **Counts.** Every card is counted once per deck: never studied → `newAvailable`; suspended → `suspended`; in
 * (re)learning steps → `learning`; graduated → `young` (interval < 21 days) or `mature` (≥ 21 days, Anki's definition).
 * `due` = (re)learning or review cards whose due time has come.
 *
 * **Queue.** Due cards first — (re)learning cards (time-sensitive minute steps) before review cards, each oldest due
 * first — then new cards up to the day's remaining new-card allowance, in introduction order: the student's own cards
 * first (oldest first), then platform cards in syllabus order (topic tree order, the tag's sort order, creation order).
 */
import { ancestorIdsFromPath } from "@/server/curriculum/core";
import type { CardPhase, DeckCounts } from "@/components/flashcards/types";

/** Graduated cards with an interval of at least this many days are "mature" (Anki's definition). */
export const MATURE_INTERVAL_DAYS = 21;
/** Default number of NEW cards introduced per student per local day (Setting `flashcards.scheduler`). */
export const DEFAULT_NEW_CARDS_PER_DAY = 20;
export const MAX_NEW_CARDS_PER_DAY = 500;
/** Learning cards due within this many minutes come back in the same session (Anki's "learn ahead" limit). */
export const LEARN_AHEAD_MINUTES = 20;

/** A topic node of a pinned syllabus version, as decks need it (tree order is the array order). */
export interface DeckTopic {
  id: string;
  parentId: string | null;
  kind: "SECTION" | "TOPIC" | "SUBTOPIC";
  /** Materialised path of ids, root first, "/"-separated. */
  path: string;
  name: string;
  code: string | null;
}

/** A card the student can study in one subject. */
export interface DeckCard {
  flashcardId: string;
  subjectId: string;
  /** In-scope topics of the subject's pinned version the card is tagged to (personal cards: their topic, if any). */
  topicIds: readonly string[];
  isPersonal: boolean;
  /** Tree position of the card's first in-scope topic (Infinity when untagged). */
  topicOrder: number;
  /** FlashcardTopic.sortOrder of that tag (0 for personal cards). */
  tagOrder: number;
  /** Creation time (ms since epoch). */
  createdAtMs: number;
}

/** The scheduling facts of a FlashcardState row that decks and the queue read. */
export interface DeckCardState {
  flashcardId: string;
  phase: CardPhase;
  dueAt: Date;
  intervalDays: number;
  isSuspended: boolean;
}

export type QueueKind = "LEARNING" | "REVIEW" | "NEW";

export interface QueueEntry {
  flashcardId: string;
  subjectId: string;
  kind: QueueKind;
}

export function emptyDeckCounts(): DeckCounts {
  return { total: 0, due: 0, newAvailable: 0, learning: 0, young: 0, mature: 0, suspended: 0 };
}

/** True for cards waiting to be studied for the first time (no state, or introduced but never answered). */
export function isNewCard(state: DeckCardState | undefined): boolean {
  return state === undefined || (state.phase === "NEW" && !state.isSuspended);
}

/** True when a studied, unsuspended card is due at `now`. */
export function isDueCard(state: DeckCardState | undefined, now: Date): boolean {
  if (!state || state.isSuspended || state.phase === "NEW") return false;
  return state.dueAt.getTime() <= now.getTime();
}

/** Adds one card to `counts` (mutates and returns it). */
export function countCard(counts: DeckCounts, state: DeckCardState | undefined, now: Date): DeckCounts {
  if (state?.isSuspended) {
    counts.suspended += 1;
    return counts;
  }
  counts.total += 1;
  if (isNewCard(state) || !state) {
    counts.newAvailable += 1;
    return counts;
  }
  if (state.phase === "LEARNING" || state.phase === "RELEARNING") counts.learning += 1;
  else if (state.intervalDays >= MATURE_INTERVAL_DAYS) counts.mature += 1;
  else counts.young += 1;
  if (isDueCard(state, now)) counts.due += 1;
  return counts;
}

/** Deck nodes of a tree: TOPIC-kind nodes, or the roots when the tree has none. Tree order is kept. */
export function deckTopics(topics: readonly DeckTopic[]): DeckTopic[] {
  const topicLevel = topics.filter((t) => t.kind === "TOPIC");
  return topicLevel.length > 0 ? topicLevel : topics.filter((t) => t.parentId === null);
}

/** For every topic: the deck nodes among itself and its ancestors (usually exactly one). */
export function deckIndex(topics: readonly DeckTopic[], decks: readonly DeckTopic[]): Map<string, string[]> {
  const deckIds = new Set(decks.map((d) => d.id));
  const index = new Map<string, string[]>();
  for (const topic of topics) {
    const chain = [...ancestorIdsFromPath(topic.path), topic.id];
    index.set(
      topic.id,
      chain.filter((id) => deckIds.has(id)),
    );
  }
  return index;
}

/** True when the card is tagged to `topicId` or a topic below it. */
export function cardInTopic(card: Pick<DeckCard, "topicIds">, topicId: string, topicsById: ReadonlyMap<string, Pick<DeckTopic, "path">>): boolean {
  return card.topicIds.some((id) => {
    if (id === topicId) return true;
    const topic = topicsById.get(id);
    return topic !== undefined && ancestorIdsFromPath(topic.path).includes(topicId);
  });
}

export interface TopicDeckSummary {
  topicId: string;
  name: string;
  code: string | null;
  counts: DeckCounts;
}

export interface SubjectDeckSummary {
  counts: DeckCounts;
  /** Personal cards in the subject (excluding deleted ones). */
  personalCards: number;
  /** Topic decks with at least one card, in tree order. */
  topics: TopicDeckSummary[];
}

/** Counts of a subject deck and its topic decks. */
export function summarizeSubjectDeck(input: {
  topics: readonly DeckTopic[];
  cards: readonly DeckCard[];
  states: ReadonlyMap<string, DeckCardState>;
  now: Date;
}): SubjectDeckSummary {
  const decks = deckTopics(input.topics);
  const index = deckIndex(input.topics, decks);
  const perDeck = new Map(decks.map((d) => [d.id, emptyDeckCounts()]));
  const counts = emptyDeckCounts();
  let personalCards = 0;
  for (const card of input.cards) {
    const state = input.states.get(card.flashcardId);
    countCard(counts, state, input.now);
    if (card.isPersonal) personalCards += 1;
    const deckIds = new Set(card.topicIds.flatMap((id) => index.get(id) ?? []));
    for (const deckId of deckIds) {
      const deckCounts = perDeck.get(deckId);
      if (deckCounts) countCard(deckCounts, state, input.now);
    }
  }
  return {
    counts,
    personalCards,
    topics: decks.flatMap((deck) => {
      const deckCounts = perDeck.get(deck.id);
      return deckCounts && deckCounts.total + deckCounts.suspended > 0 ? [{ topicId: deck.id, name: deck.name, code: deck.code, counts: deckCounts }] : [];
    }),
  };
}

/** Adds `b` into `a` (mutates and returns `a`). */
export function addDeckCounts(a: DeckCounts, b: DeckCounts): DeckCounts {
  a.total += b.total;
  a.due += b.due;
  a.newAvailable += b.newAvailable;
  a.learning += b.learning;
  a.young += b.young;
  a.mature += b.mature;
  a.suspended += b.suspended;
  return a;
}

/** Introduction order of new cards (see the module header). */
export function compareNewCards(a: DeckCard, b: DeckCard): number {
  if (a.isPersonal !== b.isPersonal) return a.isPersonal ? -1 : 1;
  if (a.isPersonal) return a.createdAtMs - b.createdAtMs || a.flashcardId.localeCompare(b.flashcardId);
  if (a.topicOrder !== b.topicOrder) return a.topicOrder < b.topicOrder ? -1 : 1;
  if (a.tagOrder !== b.tagOrder) return a.tagOrder - b.tagOrder;
  return a.createdAtMs - b.createdAtMs || a.flashcardId.localeCompare(b.flashcardId);
}

/** New cards the student may still start today (never negative). */
export function newCardsRemaining(newCardsPerDay: number, newStudiedToday: number): number {
  const cap = Number.isFinite(newCardsPerDay) ? Math.max(0, Math.floor(newCardsPerDay)) : DEFAULT_NEW_CARDS_PER_DAY;
  return Math.max(0, cap - Math.max(0, Math.floor(newStudiedToday)));
}

export interface DueQueue {
  entries: QueueEntry[];
  /** Due cards in scope (before the session limit). */
  dueTotal: number;
  /** Never-studied cards in scope (before the daily allowance and the session limit). */
  newAvailable: number;
}

/**
 * The review queue (see the module header): due cards first, then at most `newLimit` new cards, `limit` in total.
 * Suspended cards never appear. `cards` must hold each card once.
 */
export function buildDueQueue(input: {
  cards: readonly DeckCard[];
  states: ReadonlyMap<string, DeckCardState>;
  now: Date;
  limit: number;
  newLimit: number;
}): DueQueue {
  const limit = Math.max(0, Math.floor(input.limit));
  const due: { card: DeckCard; state: DeckCardState }[] = [];
  const fresh: DeckCard[] = [];
  for (const card of input.cards) {
    const state = input.states.get(card.flashcardId);
    if (isDueCard(state, input.now) && state) due.push({ card, state });
    else if (isNewCard(state)) fresh.push(card);
  }
  const learningFirst = (phase: CardPhase) => (phase === "LEARNING" || phase === "RELEARNING" ? 0 : 1);
  due.sort(
    (a, b) =>
      learningFirst(a.state.phase) - learningFirst(b.state.phase) ||
      a.state.dueAt.getTime() - b.state.dueAt.getTime() ||
      a.card.flashcardId.localeCompare(b.card.flashcardId),
  );
  fresh.sort(compareNewCards);

  const entries: QueueEntry[] = due.slice(0, limit).map(({ card, state }) => ({
    flashcardId: card.flashcardId,
    subjectId: card.subjectId,
    kind: learningFirst(state.phase) === 0 ? "LEARNING" : "REVIEW",
  }));
  const newCount = Math.max(0, Math.min(Math.floor(input.newLimit), limit - entries.length));
  for (const card of fresh.slice(0, newCount)) entries.push({ flashcardId: card.flashcardId, subjectId: card.subjectId, kind: "NEW" });
  return { entries, dueTotal: due.length, newAvailable: fresh.length };
}

/** The earliest future due time among studied, unsuspended cards (for "next card due in 8 minutes"); null if none. */
export function nextDueAt(states: Iterable<DeckCardState>, now: Date): Date | null {
  let next: Date | null = null;
  for (const state of states) {
    if (state.isSuspended || state.phase === "NEW" || state.dueAt.getTime() <= now.getTime()) continue;
    if (next === null || state.dueAt.getTime() < next.getTime()) next = state.dueAt;
  }
  return next;
}

/** True when a just-answered card is due again soon enough to come back in the same session. */
export function comesBackInSession(result: { isLearningStep: boolean; dueAt: Date }, now: Date): boolean {
  return result.isLearningStep && result.dueAt.getTime() - now.getTime() <= LEARN_AHEAD_MINUTES * 60_000;
}

/**
 * Assigns each card to ONE subject (cards are reused across boards, so a student taking two related subjects may
 * meet the same card twice): the subject its state was introduced under when that subject offers it, otherwise the
 * first subject (enrolment order) that offers it. Input: per subject, the cards it offers. Output keeps subject order.
 */
export function assignCardsToSubjects(
  offers: readonly { subjectId: string; cards: readonly DeckCard[] }[],
  stateSubjects: ReadonlyMap<string, string>,
): Map<string, DeckCard[]> {
  const offeredBy = new Map<string, Set<string>>();
  for (const offer of offers) {
    for (const card of offer.cards) {
      const set = offeredBy.get(card.flashcardId) ?? new Set<string>();
      set.add(offer.subjectId);
      offeredBy.set(card.flashcardId, set);
    }
  }
  const taken = new Set<string>();
  const out = new Map<string, DeckCard[]>(offers.map((o) => [o.subjectId, []]));
  for (const offer of offers) {
    for (const card of offer.cards) {
      if (taken.has(card.flashcardId)) continue;
      const preferred = stateSubjects.get(card.flashcardId);
      if (preferred && preferred !== offer.subjectId && offeredBy.get(card.flashcardId)?.has(preferred)) continue;
      taken.add(card.flashcardId);
      out.get(offer.subjectId)?.push(card);
    }
  }
  return out;
}
