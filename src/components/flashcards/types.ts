import type { SanitizedHtml } from "@/lib/content/types";

/**
 * Isomorphic view types of the flashcards feature (§18), shared by the service (`src/server/flashcards/service.ts`),
 * the Server Actions and the client review session. No runtime imports from the server: safe for client bundles.
 */

export const FLASHCARD_RATINGS = ["AGAIN", "HARD", "GOOD", "EASY"] as const;
export type FlashcardRating = (typeof FLASHCARD_RATINGS)[number];

/** Button labels of the four ratings (§18 "Again / Hard / Good / Easy"). */
export const RATING_LABELS: Readonly<Record<FlashcardRating, string>> = {
  AGAIN: "Again",
  HARD: "Hard",
  GOOD: "Good",
  EASY: "Easy",
};

/** Keyboard shortcut of each rating (1-4, Anki convention). */
export const RATING_KEYS: Readonly<Record<string, FlashcardRating>> = { "1": "AGAIN", "2": "HARD", "3": "GOOD", "4": "EASY" };

export const FLASHCARD_TYPES = ["DEFINITION", "FORMULA", "VOCABULARY", "CONCEPT", "DATE", "FACT"] as const;
export type FlashcardCardType = (typeof FLASHCARD_TYPES)[number];

/** §18 card kinds: "definitions, formulas, vocabulary, key concepts, dates, scientific facts". */
export const CARD_TYPE_LABELS: Readonly<Record<FlashcardCardType, string>> = {
  DEFINITION: "Definition",
  FORMULA: "Formula",
  VOCABULARY: "Vocabulary",
  CONCEPT: "Key concept",
  DATE: "Date",
  FACT: "Fact",
};

export type CardPhase = "NEW" | "LEARNING" | "REVIEW" | "RELEARNING";

/** One card of a review session, faces rendered server-side (KaTeX, sanitised). */
export interface ReviewCardView {
  flashcardId: string;
  /** Enrolment subject the card is studied under. */
  subjectId: string;
  subjectName: string;
  /** Topic the card belongs to in the student's syllabus version, when known. */
  topicName: string | null;
  cardType: FlashcardCardType;
  frontHtml: SanitizedHtml;
  backHtml: SanitizedHtml;
  notesHtml: SanitizedHtml | null;
  /** BCP-47 language of the card's text (for `lang` on the faces). */
  languageCode: string;
  /** The student's own card (never reported to editors). */
  isPersonal: boolean;
  /** Never studied before (counts toward today's new-card limit). */
  isNew: boolean;
  phase: CardPhase;
  /** What each rating would schedule, e.g. `{ AGAIN: "<1m", HARD: "<6m", GOOD: "<10m", EASY: "4d" }`. */
  intervals: Readonly<Record<FlashcardRating, string>>;
}

/** One rating, as sent by the review session (and replayed after a connection drop). */
export interface ReviewInput {
  flashcardId: string;
  rating: FlashcardRating;
  /** Time from the card being shown to the rating (ms). */
  durationMs: number;
  /** Client-generated id: the same id is applied once, however often it is retried (offline replay). */
  clientReviewId: string;
  /** When the student pressed the button (ISO 8601). The server clamps it to its own clock. */
  reviewedAt: string;
  /** Subject the card was shown under (a hint for cards studied for the first time). */
  subjectId?: string;
}

/** The server's answer to a rating. */
export interface ReviewOutcome {
  flashcardId: string;
  /** True when this review id had already been applied (a retry): nothing changed. */
  replayed: boolean;
  phase: CardPhase;
  /** Next due time (ISO 8601). */
  dueAt: string;
  intervalDays: number;
  isLearningStep: boolean;
  /** Forgotten many times: suggest studying the lesson or rewriting the card. */
  isLeech: boolean;
  /** Labels for the next answer when the card comes back within this session (learning steps); otherwise null. */
  nextIntervals: Readonly<Record<FlashcardRating, string>> | null;
  /** XP earned by this review (flashcard batch, daily goal, streak milestones). */
  xpAwarded: number;
}

/** Card counts of a deck. `due`, `learning`, `young` and `mature` overlap (a due card is also learning or young). */
export interface DeckCounts {
  /** Cards the student can study in this deck (excluding suspended ones). */
  total: number;
  /** Learning and review cards due now. */
  due: number;
  /** Cards never studied. */
  newAvailable: number;
  /** In (re)learning steps. */
  learning: number;
  /** Graduated, interval under 21 days. */
  young: number;
  /** Graduated, interval of 21 days or more. */
  mature: number;
  suspended: number;
}
