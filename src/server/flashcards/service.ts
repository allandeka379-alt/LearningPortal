import "server-only";
import { z } from "zod";
import type { FlashcardSrsState, Prisma, Role } from "@/generated/prisma/client";
import {
  CARD_TYPE_LABELS,
  FLASHCARD_RATINGS,
  FLASHCARD_TYPES,
  type CardPhase,
  type DeckCounts,
  type FlashcardCardType,
  type FlashcardRating,
  type ReviewCardView,
  type ReviewOutcome,
} from "@/components/flashcards/types";
import type { SanitizedHtml } from "@/lib/content/types";
import { DEFAULT_TIMEZONE, addDays, dateColumnFromLocalDate, isValidTimeZone, localDateString, startOfLocalDay } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { EntitlementRequiredError, getSubjectEntitlements, hasFeature } from "@/server/billing/entitlements";
import { trustPersistedHtml, type AssetResolver } from "@/server/content/render";
import { loadAssetResolver, PIPELINE_VERSION, renderFlashcardHtml, toRenderedJson } from "@/server/content/service";
import { ancestorIdsFromPath, buildTopicTree, flattenTopicTree } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import { awardXp, evaluateAchievements, getXpRules, recordActivity } from "@/server/gamification/service";
import { xpFor, type XpRules } from "@/server/gamification/xp";
import { memoizeAsync } from "@/server/lib/cache";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, RATE_LIMIT_PRESETS, rateLimits } from "@/server/lib/rate-limit";
import { getSetting } from "@/server/lib/settings";
import { inScopeLeafTopicIds, type ScopeRules, type ScopeTopic } from "@/server/progress/service";
import { recordPlanActivity } from "@/server/studyplan/service";
import {
  DEFAULT_NEW_CARDS_PER_DAY,
  addDeckCounts,
  assignCardsToSubjects,
  buildDueQueue,
  cardInTopic,
  comesBackInSession,
  emptyDeckCounts,
  newCardsRemaining,
  nextDueAt,
  summarizeSubjectDeck,
  type DeckCard,
  type DeckCardState,
  type TopicDeckSummary,
} from "./decks";
import { SCHEDULER_SETTING_KEY, schedulerSettingSchema } from "./scheduler-setting";
import { DEFAULT_SRS_CONFIG, newCardState, previewIntervals, schedule, type CardState, type SrsConfig } from "./srs";

/**
 * Flashcards with spaced repetition (§18; ARCHITECTURE §3.3 `/app/flashcards`, §3.13 offline review): decks, the due
 * queue, reviews, personal cards and suspension. Wires the pure cores (./decks, ./srs) to the database.
 *
 * - **Entitlement** `flashcards` (CLAUDE.md rule 9), resolved per subject so study packs count; PREMIUM platform cards
 *   additionally need full content access in that subject (`lessons.full`). Personal cards are the student's own.
 * - **Decks** come from the enrolment's PINNED syllabus version (§26): PUBLISHED platform cards tagged to in-scope
 *   topics (route papers, chosen options, exam year — the same scope rules as progress) plus personal cards.
 * - **Privacy**: personal cards are visible only to their owner; every read filters `ownerUserId = actor`. Another
 *   student's card id answers NOT_FOUND, never FORBIDDEN, so ids cannot be probed.
 * - **Reviews** are idempotent per client review id (`FlashcardReview.clientReviewId`, offline replay): the state row
 *   is locked (SELECT … FOR UPDATE), the scheduler (./srs) applied, the review appended, DailyActivity / streak updated
 *   through the gamification service, all in one transaction. XP is awarded per completed batch of reviews
 *   (`FLASHCARD_SESSION_COMPLETED`, idempotent per local day and batch number), never per answer.
 * - **New cards per day**: Setting `flashcards.scheduler.newCardsPerDay` (default 20) across all subjects, counted from
 *   the review log (first answers of never-studied cards in the student's local day).
 */

// =====================================================================================================================
// Actor, configuration, small helpers
// =====================================================================================================================

/** The acting student. Structurally satisfied by the auth `Actor`. */
export interface FlashcardActor {
  userId: string;
  roles: readonly Role[];
  /** IANA zone for day boundaries; falls back to the profile, then Africa/Harare. */
  timeZone?: string;
}

/** Most cards one queue request returns. */
export const MAX_QUEUE_LIMIT = 200;
export const DEFAULT_QUEUE_LIMIT = 100;
/** Personal card limits (abuse guard; generous for real study). */
export const MAX_PERSONAL_CARDS = 5_000;
export const MAX_PERSONAL_SIDE_LENGTH = 2_000;
/** Creating / editing personal cards: hits per hour (inline rule until a `flashcardWrite` preset exists). */
export const PERSONAL_CARD_WRITES_PER_HOUR = RATE_LIMIT_PRESETS.flashcardWrite.limit;
/** XP for flashcards is earned per batch of reviews, at most this many batches per local day (anti-farming). */
export const MAX_XP_BATCHES_PER_DAY = 20;
/** One review counts at most this long toward study time (a card left on screen is not study). */
export const MAX_STUDY_SECONDS_PER_REVIEW = 120;
/** Offline reviews older than this are applied as if answered now. */
const MAX_REPLAY_AGE_MS = 30 * 86_400_000;
const MAX_DURATION_MS = 3_600_000;
const TX_OPTIONS = { maxWait: 10_000, timeout: 20_000 } as const;

/** Admin-tunable scheduler parameters (Setting `flashcards.scheduler`, registered in src/server/lib/settings.ts). */
export { SCHEDULER_SETTING_KEY, schedulerSettingSchema } from "./scheduler-setting";

export interface FlashcardScheduler {
  newCardsPerDay: number;
  /** Overrides merged onto DEFAULT_SRS_CONFIG (time zone excluded: that is per student). */
  srs: Partial<SrsConfig>;
}

/** Scheduler parameters from Setting `flashcards.scheduler` (defaults when unset, invalid or unreadable). */
export async function getFlashcardScheduler(): Promise<FlashcardScheduler> {
  try {
    const setting = await getSetting(SCHEDULER_SETTING_KEY, schedulerSettingSchema, {});
    const { newCardsPerDay, ...srs } = setting;
    const overrides: Partial<SrsConfig> = {};
    for (const key of ["learningStepsMinutes", "relearningStepsMinutes", "graduatingIntervalDays", "easyIntervalDays", "startingEase", "maxIntervalDays", "leechThreshold"] as const) {
      if (srs[key] !== undefined) Object.assign(overrides, { [key]: srs[key] });
    }
    return { newCardsPerDay: newCardsPerDay ?? DEFAULT_NEW_CARDS_PER_DAY, srs: overrides };
  } catch (error) {
    logger.error("flashcards: scheduler setting unreadable, using defaults", { err: error });
    return { newCardsPerDay: DEFAULT_NEW_CARDS_PER_DAY, srs: {} };
  }
}

function assertStudent(actor: FlashcardActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) throw AppError.forbidden("Only students have flashcards.");
}

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

async function zoneOf(actor: FlashcardActor): Promise<string> {
  if (actor.timeZone && isValidTimeZone(actor.timeZone)) return actor.timeZone;
  const profile = await db.profile.findUnique({ where: { userId: actor.userId }, select: { timezone: true } });
  return safeZone(profile?.timezone);
}

const uuid = z.uuid();

function notFound(): AppError {
  return AppError.notFound("That flashcard isn't available.");
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error, result.error.issues[0]?.message);
  return result.data;
}

function srsConfigFor(scheduler: FlashcardScheduler, timeZone: string): Partial<SrsConfig> {
  return { ...scheduler.srs, timeZone };
}

/** Button labels for a card state. */
function intervalLabels(state: CardState, now: Date, config: Partial<SrsConfig>): Record<FlashcardRating, string> {
  const preview = previewIntervals(state, now, config);
  return { AGAIN: preview.AGAIN.label, HARD: preview.HARD.label, GOOD: preview.GOOD.label, EASY: preview.EASY.label };
}

// =====================================================================================================================
// Syllabus structure and enrolment scope (published versions are structurally frozen, so a short cache is safe)
// =====================================================================================================================

interface StructureTopic extends ScopeTopic {
  /** Tree position. */
  order: number;
}

interface SyllabusStructure {
  topics: StructureTopic[];
  byId: Map<string, StructureTopic>;
  topicComponents: Map<string, string[]>;
  defaultRouteId: string | null;
  routeComponents: Map<string, Set<string>>;
}

const loadStructure = memoizeAsync(
  async (syllabusId: string): Promise<SyllabusStructure> => {
    const [rows, links, routes] = await Promise.all([
      db.topic.findMany({
        where: { syllabusId },
        select: {
          id: true,
          parentId: true,
          kind: true,
          depth: true,
          path: true,
          sortOrder: true,
          code: true,
          name: true,
          isOptional: true,
          examYearFrom: true,
          examYearTo: true,
        },
      }),
      db.topicComponent.findMany({ where: { topic: { syllabusId } }, select: { topicId: true, componentId: true } }),
      db.syllabusRoute.findMany({ where: { syllabusId }, select: { id: true, isDefault: true, componentLinks: { select: { componentId: true } } } }),
    ]);
    const ordered = flattenTopicTree(buildTopicTree(rows));
    const topics: StructureTopic[] = ordered.map((node, order) => ({
      id: node.id,
      parentId: node.parentId,
      kind: node.kind,
      depth: node.depth,
      path: node.path,
      sortOrder: node.sortOrder,
      code: node.code,
      name: node.name,
      isOptional: node.isOptional,
      examYearFrom: node.examYearFrom,
      examYearTo: node.examYearTo,
      order,
    }));
    const topicComponents = new Map<string, string[]>();
    for (const link of links) topicComponents.set(link.topicId, [...(topicComponents.get(link.topicId) ?? []), link.componentId]);
    return {
      topics,
      byId: new Map(topics.map((t) => [t.id, t])),
      topicComponents,
      defaultRouteId: routes.find((r) => r.isDefault)?.id ?? null,
      routeComponents: new Map(routes.map((r) => [r.id, new Set(r.componentLinks.map((l) => l.componentId))])),
    };
  },
  { ttlMs: 5 * 60_000, maxEntries: 200 },
);

/** Drops cached syllabus structures (tests, version tools). */
export function invalidateFlashcardStructureCache(): void {
  loadStructure.clear();
}

interface SubjectScope {
  subjectId: string;
  subjectName: string;
  syllabusId: string;
  languageCode: string;
  structure: SyllabusStructure;
  /** In-scope topics in tree order. */
  topics: StructureTopic[];
  inScope: Set<string>;
  /** Plan includes flashcards in this subject. */
  entitled: boolean;
  /** Full (premium) content is open in this subject. */
  premiumOpen: boolean;
}

function scopeRulesFor(structure: SyllabusStructure, routeId: string | null, examYear: number | null, chosen: readonly string[]): ScopeRules {
  const route = routeId ?? structure.defaultRouteId;
  const components = route ? structure.routeComponents.get(route) : undefined;
  return {
    routeComponentIds: components && components.size > 0 ? components : null,
    topicComponents: structure.topicComponents,
    chosenTopicIds: new Set(chosen),
    examYear,
  };
}

/** ACTIVE enrolments of the student with their pinned scope and entitlements, in enrolment order. */
async function loadSubjectScopes(userId: string, subjectId?: string): Promise<SubjectScope[]> {
  const enrollments = await db.subjectEnrollment.findMany({
    where: { userId, status: "ACTIVE", ...(subjectId ? { subjectId } : {}) },
    select: {
      subjectId: true,
      syllabusId: true,
      routeId: true,
      subject: { select: { name: true, languageCode: true } },
      targetExamSession: { select: { year: true } },
      topicChoices: { select: { topicId: true } },
    },
    orderBy: [{ createdAt: "asc" }, { subjectId: "asc" }],
  });
  return Promise.all(
    enrollments.map(async (enrollment): Promise<SubjectScope> => {
      const [structure, entitlements] = await Promise.all([
        loadStructure(enrollment.syllabusId),
        getSubjectEntitlements(userId, enrollment.subjectId, { syllabusId: enrollment.syllabusId }),
      ]);
      const rules = scopeRulesFor(
        structure,
        enrollment.routeId,
        enrollment.targetExamSession?.year ?? null,
        enrollment.topicChoices.map((c) => c.topicId),
      );
      const inScope = new Set<string>();
      for (const leafId of inScopeLeafTopicIds(structure.topics, rules)) {
        inScope.add(leafId);
        const leaf = structure.byId.get(leafId);
        if (leaf) for (const ancestorId of ancestorIdsFromPath(leaf.path)) inScope.add(ancestorId);
      }
      return {
        subjectId: enrollment.subjectId,
        subjectName: enrollment.subject.name,
        syllabusId: enrollment.syllabusId,
        languageCode: enrollment.subject.languageCode,
        structure,
        topics: structure.topics.filter((t) => inScope.has(t.id)),
        inScope,
        entitled: hasFeature(entitlements, "flashcards"),
        premiumOpen: hasFeature(entitlements, "lessons.full"),
      };
    }),
  );
}

// =====================================================================================================================
// Card discovery and states
// =====================================================================================================================

const STATE_SELECT = {
  flashcardId: true,
  subjectId: true,
  state: true,
  dueAt: true,
  intervalDays: true,
  isSuspended: true,
  easeFactor: true,
  learningStep: true,
  lastReviewedAt: true,
  reviewCount: true,
  lapses: true,
} as const satisfies Prisma.FlashcardStateSelect;

type StateRow = Prisma.FlashcardStateGetPayload<{ select: typeof STATE_SELECT }>;

function toDeckState(row: StateRow): DeckCardState {
  return { flashcardId: row.flashcardId, phase: row.state, dueAt: row.dueAt, intervalDays: row.intervalDays, isSuspended: row.isSuspended };
}

/** The scheduler state of a persisted row (srs.ts CardState). */
export function cardStateFromRow(row: Pick<StateRow, "state" | "learningStep" | "easeFactor" | "intervalDays" | "dueAt" | "lastReviewedAt" | "reviewCount" | "lapses">): CardState {
  return {
    phase: row.state,
    step: row.learningStep,
    easeFactor: row.easeFactor,
    intervalDays: row.intervalDays,
    dueAt: row.state === "NEW" ? null : row.dueAt,
    lastReviewedAt: row.lastReviewedAt,
    reps: row.reviewCount,
    lapses: row.lapses,
  };
}

interface StudyMaterial {
  scopes: SubjectScope[];
  /** Cards per subject (each card in exactly one subject). */
  cardsBySubject: Map<string, DeckCard[]>;
  states: Map<string, StateRow>;
}

/**
 * Every card the student can study in their ACTIVE, entitled subjects (platform cards in scope + personal cards),
 * assigned to one subject each, and all of the student's scheduling states.
 */
async function loadStudyMaterial(userId: string, scopes: SubjectScope[]): Promise<StudyMaterial> {
  const entitled = scopes.filter((s) => s.entitled);
  const topicScope = new Map<string, SubjectScope>();
  for (const scope of entitled) for (const topic of scope.structure.topics) topicScope.set(topic.id, scope);

  const [tags, personal, stateRows] = await Promise.all([
    entitled.length === 0
      ? Promise.resolve([])
      : db.flashcardTopic.findMany({
          where: {
            topic: { syllabusId: { in: entitled.map((s) => s.syllabusId) } },
            flashcard: { status: "PUBLISHED", ownerUserId: null, draftOfId: null },
          },
          select: { flashcardId: true, topicId: true, sortOrder: true, flashcard: { select: { accessTier: true, createdAt: true } } },
        }),
    entitled.length === 0
      ? Promise.resolve([])
      : db.flashcard.findMany({
          where: { ownerUserId: userId, status: "PUBLISHED", subjectId: { in: entitled.map((s) => s.subjectId) } },
          select: { id: true, subjectId: true, createdAt: true, topics: { select: { topicId: true } } },
        }),
    db.flashcardState.findMany({ where: { userId }, select: STATE_SELECT }),
  ]);

  const offers = new Map<string, Map<string, DeckCard>>(entitled.map((s) => [s.subjectId, new Map()]));
  for (const card of personal) {
    const scope = entitled.find((s) => s.subjectId === card.subjectId);
    if (!scope) continue;
    const topicIds = card.topics.map((t) => t.topicId).filter((id) => scope.structure.byId.has(id));
    const firstOrder = Math.min(...topicIds.map((id) => scope.structure.byId.get(id)?.order ?? Infinity), Infinity);
    offers.get(scope.subjectId)?.set(card.id, {
      flashcardId: card.id,
      subjectId: scope.subjectId,
      topicIds,
      isPersonal: true,
      topicOrder: firstOrder,
      tagOrder: 0,
      createdAtMs: card.createdAt.getTime(),
    });
  }
  for (const tag of tags) {
    const scope = topicScope.get(tag.topicId);
    if (!scope || !scope.inScope.has(tag.topicId)) continue;
    if (tag.flashcard.accessTier === "PREMIUM" && !scope.premiumOpen) continue;
    const order = scope.structure.byId.get(tag.topicId)?.order ?? Infinity;
    const subjectCards = offers.get(scope.subjectId);
    const existing = subjectCards?.get(tag.flashcardId);
    if (existing) {
      (existing.topicIds as string[]).push(tag.topicId);
      if (order < existing.topicOrder) {
        existing.topicOrder = order;
        existing.tagOrder = tag.sortOrder;
      }
    } else {
      subjectCards?.set(tag.flashcardId, {
        flashcardId: tag.flashcardId,
        subjectId: scope.subjectId,
        topicIds: [tag.topicId],
        isPersonal: false,
        topicOrder: order,
        tagOrder: tag.sortOrder,
        createdAtMs: tag.flashcard.createdAt.getTime(),
      });
    }
  }
  const states = new Map(stateRows.map((row) => [row.flashcardId, row]));
  const cardsBySubject = assignCardsToSubjects(
    entitled.map((s) => ({ subjectId: s.subjectId, cards: [...(offers.get(s.subjectId)?.values() ?? [])] })),
    new Map(stateRows.map((row) => [row.flashcardId, row.subjectId])),
  );
  return { scopes, cardsBySubject, states };
}

function deckStates(material: StudyMaterial): Map<string, DeckCardState> {
  return new Map([...material.states.values()].map((row) => [row.flashcardId, toDeckState(row)]));
}

/** Never-studied cards the student started (first answer) in their current local day. */
async function countNewStudiedToday(userId: string, timeZone: string, now: Date): Promise<number> {
  const today = localDateString(now, timeZone);
  return db.flashcardReview.count({
    where: {
      userId,
      previousState: "NEW",
      reviewedAt: { gte: startOfLocalDay(today, timeZone), lt: startOfLocalDay(addDays(today, 1), timeZone) },
    },
  });
}

// =====================================================================================================================
// Deck overview (/app/flashcards)
// =====================================================================================================================

export interface SubjectDeckView {
  subjectId: string;
  name: string;
  /** The student's plan includes flashcards in this subject. */
  entitled: boolean;
  counts: DeckCounts;
  personalCards: number;
  /** Topic decks with cards, in syllabus order. */
  topics: TopicDeckSummary[];
}

export interface DeckOverview {
  /** At least one subject includes flashcards. */
  entitled: boolean;
  /** The student has ACTIVE subjects at all. */
  hasSubjects: boolean;
  newCardsPerDay: number;
  newStudiedToday: number;
  newRemainingToday: number;
  totals: DeckCounts;
  /** Cards "Review all" would start with now (due + today's new allowance). */
  reviewAllCount: number;
  /** Next future due time (ISO) when nothing is due now. */
  nextDueAt: string | null;
  subjects: SubjectDeckView[];
}

/** Decks by subject and topic with due / new / learning / mature counts (§18). */
export async function getDeckOverview(actor: FlashcardActor, now: Date = new Date()): Promise<DeckOverview> {
  assertStudent(actor);
  const [timeZone, scheduler, scopes] = await Promise.all([zoneOf(actor), getFlashcardScheduler(), loadSubjectScopes(actor.userId)]);
  const [material, newStudiedToday] = await Promise.all([loadStudyMaterial(actor.userId, scopes), countNewStudiedToday(actor.userId, timeZone, now)]);
  const states = deckStates(material);
  const totals = emptyDeckCounts();
  const subjects = scopes.map((scope): SubjectDeckView => {
    const cards = material.cardsBySubject.get(scope.subjectId) ?? [];
    const summary = summarizeSubjectDeck({ topics: scope.topics, cards, states, now });
    if (scope.entitled) addDeckCounts(totals, summary.counts);
    return {
      subjectId: scope.subjectId,
      name: scope.subjectName,
      entitled: scope.entitled,
      counts: summary.counts,
      personalCards: summary.personalCards,
      topics: summary.topics,
    };
  });
  const newRemainingToday = newCardsRemaining(scheduler.newCardsPerDay, newStudiedToday);
  const studied = [...material.cardsBySubject.values()].flat().flatMap((card) => {
    const state = states.get(card.flashcardId);
    return state ? [state] : [];
  });
  return {
    entitled: scopes.some((s) => s.entitled),
    hasSubjects: scopes.length > 0,
    newCardsPerDay: scheduler.newCardsPerDay,
    newStudiedToday,
    newRemainingToday,
    totals,
    reviewAllCount: totals.due + Math.min(totals.newAvailable, newRemainingToday),
    nextDueAt: nextDueAt(studied, now)?.toISOString() ?? null,
    subjects,
  };
}

// =====================================================================================================================
// Due queue (/app/flashcards/review)
// =====================================================================================================================

export const queueOptionsSchema = z.object({
  subjectId: z.uuid().optional(),
  topicId: z.uuid().optional(),
  limit: z.int().min(1).max(MAX_QUEUE_LIMIT).optional(),
});
export type QueueOptions = z.input<typeof queueOptionsSchema>;

export interface DueQueueView {
  /** False when the plan does not include flashcards (for this subject / at all): show the upgrade prompt. */
  entitled: boolean;
  scope: { subjectId: string | null; subjectName: string | null; topicId: string | null; topicName: string | null };
  cards: ReviewCardView[];
  /** Due cards in scope (the session may hold fewer: `limit`). */
  dueTotal: number;
  /** Never-studied cards in scope. */
  newAvailable: number;
  newRemainingToday: number;
  newCardsPerDay: number;
  /** Next future due time (ISO) in scope, for "Nothing due — next card in 8 minutes". */
  nextDueAt: string | null;
}

const renderedSchema = z.object({ front: z.string(), back: z.string(), notes: z.string().optional() });

interface CardFaces {
  frontHtml: SanitizedHtml;
  backHtml: SanitizedHtml;
  notesHtml: SanitizedHtml | null;
}

interface FaceSource {
  id: string;
  front: string;
  back: string;
  notes: string | null;
  renderedHtml: Prisma.JsonValue | null;
  renderVersion: number | null;
}

/** The write-time render cache when current, else a fresh render through the content pipeline. */
function facesOf(card: FaceSource, resolveAsset: AssetResolver): CardFaces {
  if (card.renderVersion === PIPELINE_VERSION) {
    const cached = renderedSchema.safeParse(card.renderedHtml);
    if (cached.success && (card.notes === null || cached.data.notes !== undefined)) {
      return {
        frontHtml: trustPersistedHtml(cached.data.front),
        backHtml: trustPersistedHtml(cached.data.back),
        notesHtml: cached.data.notes ? trustPersistedHtml(cached.data.notes) : null,
      };
    }
  }
  return renderFaces(card, resolveAsset);
}

/** Fresh render through the content pipeline (sanitised, KaTeX), branded as pipeline output. */
function renderFaces(card: { id: string; front: string; back: string; notes: string | null }, resolveAsset: AssetResolver): CardFaces {
  const rendered = renderFlashcardHtml(card, resolveAsset);
  return {
    frontHtml: trustPersistedHtml(rendered.front),
    backHtml: trustPersistedHtml(rendered.back),
    notesHtml: rendered.notes ? trustPersistedHtml(rendered.notes) : null,
  };
}

const CARD_CONTENT_SELECT = {
  id: true,
  cardType: true,
  front: true,
  back: true,
  notes: true,
  renderedHtml: true,
  renderVersion: true,
  languageCode: true,
  ownerUserId: true,
  topics: { select: { topicId: true, isPrimary: true } },
} as const satisfies Prisma.FlashcardSelect;

type CardContentRow = Prisma.FlashcardGetPayload<{ select: typeof CARD_CONTENT_SELECT }>;

/** Rendered faces for many cards; one asset query for every card whose cache is stale. */
async function loadCardContent(ids: readonly string[]): Promise<{ rows: Map<string, CardContentRow>; faces: Map<string, CardFaces> }> {
  if (ids.length === 0) return { rows: new Map(), faces: new Map() };
  const rows = await db.flashcard.findMany({ where: { id: { in: [...ids] } }, select: CARD_CONTENT_SELECT });
  const stale = rows.filter((row) => row.renderVersion !== PIPELINE_VERSION && row.ownerUserId === null);
  const resolveAsset = stale.length > 0 ? await loadAssetResolver(stale.flatMap((row) => [row.front, row.back, row.notes])) : () => null;
  return {
    rows: new Map(rows.map((row) => [row.id, row])),
    faces: new Map(rows.map((row) => [row.id, facesOf(row, row.ownerUserId === null ? resolveAsset : () => null)])),
  };
}

function topicNameFor(row: CardContentRow, scope: SubjectScope | undefined): string | null {
  if (!scope) return null;
  const tags = [...row.topics].sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  for (const tag of tags) {
    const topic = scope.structure.byId.get(tag.topicId);
    if (topic) return topic.name;
  }
  return null;
}

/**
 * The review queue (§18): due cards first, then new cards up to today's remaining allowance, optionally limited to a
 * subject and/or a topic subtree. Faces are rendered server-side; each card carries its four interval labels.
 *
 * @throws AppError FORBIDDEN (not a student) | NOT_FOUND (subject not on the student's list, unknown topic)
 */
export async function getDueQueue(actor: FlashcardActor, rawOptions: QueueOptions = {}, now: Date = new Date()): Promise<DueQueueView> {
  assertStudent(actor);
  const options = parse(queueOptionsSchema, rawOptions);
  const [timeZone, scheduler, allScopes] = await Promise.all([zoneOf(actor), getFlashcardScheduler(), loadSubjectScopes(actor.userId)]);

  let scopes = allScopes;
  if (options.subjectId) {
    scopes = allScopes.filter((s) => s.subjectId === options.subjectId);
    if (scopes.length === 0) throw AppError.notFound("That subject isn't on your list.");
  }
  let topic: { id: string; name: string } | null = null;
  if (options.topicId) {
    const owner = scopes.find((s) => s.structure.byId.has(options.topicId as string));
    const node = owner?.structure.byId.get(options.topicId);
    if (!owner || !node) throw AppError.notFound("That topic isn't part of your subjects.");
    scopes = [owner];
    topic = { id: node.id, name: node.name };
  }
  const scopeSubject = options.subjectId || options.topicId ? (scopes[0] ?? null) : null;
  const entitled = scopes.some((s) => s.entitled);
  const newCardsPerDay = scheduler.newCardsPerDay;
  const view: DueQueueView = {
    entitled,
    scope: { subjectId: scopeSubject?.subjectId ?? null, subjectName: scopeSubject?.subjectName ?? null, topicId: topic?.id ?? null, topicName: topic?.name ?? null },
    cards: [],
    dueTotal: 0,
    newAvailable: 0,
    newRemainingToday: 0,
    newCardsPerDay,
    nextDueAt: null,
  };
  if (!entitled) return view;

  const [material, newStudiedToday] = await Promise.all([loadStudyMaterial(actor.userId, allScopes), countNewStudiedToday(actor.userId, timeZone, now)]);
  const subjectIds = new Set(scopes.map((s) => s.subjectId));
  let cards = [...material.cardsBySubject.entries()].filter(([subjectId]) => subjectIds.has(subjectId)).flatMap(([, list]) => list);
  if (topic && scopeSubject) {
    const topicId = topic.id;
    cards = cards.filter((card) => cardInTopic(card, topicId, scopeSubject.structure.byId));
  }
  const states = deckStates(material);
  const newRemainingToday = newCardsRemaining(newCardsPerDay, newStudiedToday);
  const queue = buildDueQueue({ cards, states, now, limit: options.limit ?? DEFAULT_QUEUE_LIMIT, newLimit: newRemainingToday });
  const inScopeStates = cards.flatMap((card) => {
    const state = states.get(card.flashcardId);
    return state ? [state] : [];
  });

  const { rows, faces } = await loadCardContent(queue.entries.map((e) => e.flashcardId));
  const config = srsConfigFor(scheduler, timeZone);
  const scopeBySubject = new Map(allScopes.map((s) => [s.subjectId, s]));
  for (const entry of queue.entries) {
    const row = rows.get(entry.flashcardId);
    const face = faces.get(entry.flashcardId);
    if (!row || !face) continue;
    const scope = scopeBySubject.get(entry.subjectId);
    const stateRow = material.states.get(entry.flashcardId);
    const cardState = stateRow ? cardStateFromRow(stateRow) : newCardState(config);
    view.cards.push({
      flashcardId: row.id,
      subjectId: entry.subjectId,
      subjectName: scope?.subjectName ?? "",
      topicName: topicNameFor(row, scope),
      cardType: row.cardType,
      ...face,
      languageCode: row.languageCode,
      isPersonal: row.ownerUserId !== null,
      isNew: entry.kind === "NEW",
      phase: cardState.phase,
      intervals: intervalLabels(cardState, now, config),
    });
  }
  view.dueTotal = queue.dueTotal;
  view.newAvailable = queue.newAvailable;
  view.newRemainingToday = newRemainingToday;
  view.nextDueAt = nextDueAt(inScopeStates, now)?.toISOString() ?? null;
  return view;
}

/**
 * Studied cards due now in the student's ACTIVE subjects (one indexed count; no deck assembly), for reminders
 * ("flashcards due", `notifications.dailyReminders`) and dashboard badges. New cards are not included. The deck page
 * stays authoritative (it also applies scope and plan rules), so show this as "cards due", never as a promise.
 */
export async function countDueFlashcards(userId: string, now: Date = new Date()): Promise<number> {
  if (!uuid.safeParse(userId).success) return 0;
  return db.flashcardState.count({
    where: {
      userId,
      isSuspended: false,
      state: { not: "NEW" },
      dueAt: { lte: now },
      enrollment: { status: "ACTIVE" },
      flashcard: { status: "PUBLISHED" },
    },
  });
}

// =====================================================================================================================
// Card access (reviews, suspension, previews)
// =====================================================================================================================

interface CardAccess {
  flashcardId: string;
  isPersonal: boolean;
  subjectId: string;
}

/**
 * Where (which enrolment subject) the student studies this card, after checking they may: their own personal card, or
 * a PUBLISHED platform card in scope of one of their ACTIVE subjects (a card already introduced keeps its subject).
 * Entitlement `flashcards` in that subject; PREMIUM platform cards also need full content access.
 *
 * @throws AppError NOT_FOUND | ENTITLEMENT_REQUIRED
 */
async function resolveCardAccess(userId: string, flashcardId: string, hintSubjectId?: string): Promise<CardAccess> {
  if (!uuid.safeParse(flashcardId).success) throw notFound();
  const [card, state] = await Promise.all([
    db.flashcard.findUnique({ where: { id: flashcardId }, select: { id: true, ownerUserId: true, subjectId: true, accessTier: true, status: true } }),
    db.flashcardState.findUnique({ where: { userId_flashcardId: { userId, flashcardId } }, select: { subjectId: true } }),
  ]);
  if (!card || card.status !== "PUBLISHED") throw notFound();
  if (card.ownerUserId !== null && card.ownerUserId !== userId) throw notFound();

  let subjectId: string;
  if (state) {
    subjectId = state.subjectId;
  } else if (card.ownerUserId !== null) {
    subjectId = card.subjectId;
    const enrollment = await db.subjectEnrollment.findUnique({ where: { userId_subjectId: { userId, subjectId } }, select: { status: true } });
    if (enrollment?.status !== "ACTIVE") throw AppError.notFound("Add this card's subject to your list to study it.");
  } else {
    const [scopes, tags] = await Promise.all([
      loadSubjectScopes(userId),
      db.flashcardTopic.findMany({ where: { flashcardId }, select: { topicId: true } }),
    ]);
    const offering = scopes.filter((scope) => tags.some((tag) => scope.inScope.has(tag.topicId)));
    const chosen = offering.find((scope) => scope.subjectId === hintSubjectId) ?? offering[0];
    if (!chosen) throw AppError.notFound("That flashcard isn't part of your subjects.");
    subjectId = chosen.subjectId;
  }

  const enrollment = await db.subjectEnrollment.findUnique({ where: { userId_subjectId: { userId, subjectId } }, select: { syllabusId: true } });
  const entitlements = await getSubjectEntitlements(userId, subjectId, { syllabusId: enrollment?.syllabusId ?? null });
  if (!hasFeature(entitlements, "flashcards")) throw new EntitlementRequiredError("flashcards");
  if (card.ownerUserId === null && card.accessTier === "PREMIUM" && !hasFeature(entitlements, "lessons.full")) {
    throw new EntitlementRequiredError("lessons.full");
  }
  return { flashcardId, isPersonal: card.ownerUserId !== null, subjectId };
}

// =====================================================================================================================
// Reviews
// =====================================================================================================================

const clientReviewIdSchema = z.string().regex(/^[A-Za-z0-9_.:-]{8,64}$/, "Use a review id of 8-64 letters, digits, '-', '_', '.' or ':'.");

export const reviewInputSchema = z.strictObject({
  flashcardId: z.uuid("Choose a valid flashcard."),
  rating: z.enum(FLASHCARD_RATINGS, { message: "Choose Again, Hard, Good or Easy." }),
  durationMs: z.number().int().min(0).nullable().optional(),
  clientReviewId: clientReviewIdSchema.optional(),
  reviewedAt: z.iso.datetime({ offset: true }).optional(),
  subjectId: z.uuid().optional(),
});
export type ReviewCardInput = z.input<typeof reviewInputSchema>;

function isLearningPhase(phase: CardPhase): boolean {
  return phase === "LEARNING" || phase === "RELEARNING";
}

/** Review time: the client's press time for offline replays, never in the future and never older than 30 days. */
export function effectiveReviewTime(reviewedAt: string | undefined, now: Date, lastReviewedAt: Date | null): Date {
  let at = now;
  if (reviewedAt) {
    const client = new Date(reviewedAt);
    if (Number.isFinite(client.getTime()) && client.getTime() <= now.getTime() && now.getTime() - client.getTime() <= MAX_REPLAY_AGE_MS) at = client;
  }
  // Out-of-order replays never travel back before the card's last answer.
  if (lastReviewedAt && at.getTime() < lastReviewedAt.getTime()) at = new Date(Math.min(now.getTime(), lastReviewedAt.getTime()));
  return at;
}

/** Repetitions = consecutive answers that were not "Again". */
function nextRepetitions(previous: number, rating: FlashcardRating): number {
  return rating === "AGAIN" ? 0 : previous + 1;
}

async function replayOutcome(client: DbClient, userId: string, clientReviewId: string, leechThreshold: number): Promise<ReviewOutcome | null> {
  const review = await client.flashcardReview.findFirst({
    where: { userId, clientReviewId },
    select: { flashcardId: true, newState: true, newDueAt: true, newIntervalDays: true, cardState: { select: { lapses: true } } },
  });
  if (!review) return null;
  return {
    flashcardId: review.flashcardId,
    replayed: true,
    phase: review.newState,
    dueAt: review.newDueAt.toISOString(),
    intervalDays: isLearningPhase(review.newState) ? 0 : review.newIntervalDays,
    isLearningStep: isLearningPhase(review.newState),
    isLeech: review.cardState.lapses >= leechThreshold,
    nextIntervals: null,
    xpAwarded: 0,
  };
}

/** Lifetime LearnerStats.flashcardsReviewed := Σ DailyActivity (self-healing; never lowered). One statement. */
async function syncLifetimeFlashcards(tx: DbClient, userId: string, at: Date): Promise<void> {
  await tx.$executeRaw`
    INSERT INTO "LearnerStats" ("userId", "createdAt", "updatedAt", "flashcardsReviewed")
    SELECT ${userId}::uuid, ${at}, ${at}, COALESCE(SUM(d."flashcardsReviewed"), 0)::int
      FROM "DailyActivity" d WHERE d."userId" = ${userId}::uuid
    ON CONFLICT ("userId") DO UPDATE SET
      "flashcardsReviewed" = GREATEST("LearnerStats"."flashcardsReviewed", EXCLUDED."flashcardsReviewed"),
      "updatedAt" = EXCLUDED."updatedAt"`;
}

/**
 * XP and badges for flashcard reviews: every `flashcardSessionMinCards` reviews in a local day complete a batch that
 * earns `FLASHCARD_SESSION_COMPLETED` XP (idempotent on `flashcards:<date>:<n>`, at most {@link MAX_XP_BATCHES_PER_DAY}
 * a day); at the same moment the lifetime counter is synced and achievements are evaluated. Returns the XP awarded.
 */
async function creditFlashcardBatch(
  tx: DbClient,
  userId: string,
  reviewedToday: number,
  context: { date: string; at: Date; timeZone: string; rules: XpRules },
): Promise<number> {
  const batch = Math.max(1, Math.floor(context.rules.flashcardSessionMinCards));
  if (reviewedToday <= 0 || reviewedToday % batch !== 0) return 0;
  let xp = 0;
  const n = reviewedToday / batch;
  if (n <= MAX_XP_BATCHES_PER_DAY) {
    const amount = xpFor({ type: "FLASHCARD_SESSION", cardsReviewed: batch }, context.rules);
    if (amount > 0) {
      const award = await awardXp(tx, userId, "FLASHCARD_SESSION_COMPLETED", `flashcards:${context.date}:${n}`, amount, {
        sourceType: "DAILY_ACTIVITY",
        at: context.at,
        timeZone: context.timeZone,
        rules: context.rules,
      });
      if (award.awarded) xp += award.amount;
    }
  }
  await syncLifetimeFlashcards(tx, userId, context.at);
  const unlocked = await evaluateAchievements(tx, userId, { at: context.at, timeZone: context.timeZone, rules: context.rules });
  return xp + unlocked.reduce((sum, a) => sum + Math.max(0, a.xpReward), 0);
}

/**
 * Applies one Again / Hard / Good / Easy answer (§18): FlashcardState upsert (row-locked) + FlashcardReview append +
 * DailyActivity (streak, daily goal) + batch XP, in one transaction. Idempotent per `clientReviewId`: a retry or an
 * offline replay of the same id returns the stored outcome (`replayed: true`) and changes nothing.
 *
 * @throws AppError VALIDATION | FORBIDDEN | NOT_FOUND | ENTITLEMENT_REQUIRED | CONFLICT (review id reused for another card)
 */
export async function reviewCard(actor: FlashcardActor, raw: unknown, now: Date = new Date()): Promise<ReviewOutcome> {
  assertStudent(actor);
  const input = parse(reviewInputSchema, raw);
  const userId = actor.userId;
  const [scheduler, timeZone, rules] = await Promise.all([getFlashcardScheduler(), zoneOf(actor), getXpRules()]);
  const config = srsConfigFor(scheduler, timeZone);
  const leechThreshold = config.leechThreshold ?? DEFAULT_SRS_CONFIG.leechThreshold;

  if (input.clientReviewId) {
    const replay = await replayOutcome(db, userId, input.clientReviewId, leechThreshold);
    if (replay) {
      if (replay.flashcardId !== input.flashcardId) throw AppError.conflict("That review id was already used for another card.");
      return replay;
    }
  }
  const access = await resolveCardAccess(userId, input.flashcardId, input.subjectId);
  const durationMs = input.durationMs === null || input.durationMs === undefined ? null : Math.min(MAX_DURATION_MS, input.durationMs);

  const result = await db.$transaction(async (tx) => {
    await tx.flashcardState.createMany({
      data: [{ userId, flashcardId: access.flashcardId, subjectId: access.subjectId, dueAt: now, easeFactor: config.startingEase ?? DEFAULT_SRS_CONFIG.startingEase, state: "NEW" }],
      skipDuplicates: true,
    });
    await tx.$queryRaw`SELECT 1 FROM "FlashcardState" WHERE "userId" = ${userId}::uuid AND "flashcardId" = ${access.flashcardId}::uuid FOR UPDATE`;
    if (input.clientReviewId) {
      const replay = await replayOutcome(tx, userId, input.clientReviewId, leechThreshold);
      if (replay) return { outcome: replay, reviewedToday: 0 };
    }
    const row = await tx.flashcardState.findUniqueOrThrow({
      where: { userId_flashcardId: { userId, flashcardId: access.flashcardId } },
      select: { ...STATE_SELECT, repetitions: true },
    });
    const at = effectiveReviewTime(input.reviewedAt, now, row.lastReviewedAt);
    const before = cardStateFromRow(row);
    const scheduled = schedule(before, input.rating, at, { config, seed: `${access.flashcardId}:${row.reviewCount}` });
    const next = scheduled.nextState;
    const newState: FlashcardSrsState = next.phase;

    await tx.flashcardState.update({
      where: { userId_flashcardId: { userId, flashcardId: access.flashcardId } },
      data: {
        dueAt: scheduled.dueAt,
        lastReviewedAt: at,
        easeFactor: next.easeFactor,
        // The scheduler's interval: review days, or (relearning) the post-lapse interval restored on graduation.
        intervalDays: next.intervalDays,
        repetitions: nextRepetitions(row.repetitions, input.rating),
        lapses: next.lapses,
        reviewCount: row.reviewCount + 1,
        state: newState,
        lastRating: input.rating,
        learningStep: next.step,
      },
    });
    await tx.flashcardReview.create({
      data: {
        userId,
        flashcardId: access.flashcardId,
        reviewedAt: at,
        previousDueAt: row.state === "NEW" ? null : row.dueAt,
        newDueAt: scheduled.dueAt,
        previousEaseFactor: row.easeFactor,
        newEaseFactor: next.easeFactor,
        previousIntervalDays: row.intervalDays,
        newIntervalDays: next.intervalDays,
        durationMs,
        rating: input.rating,
        previousState: row.state,
        newState,
        clientReviewId: input.clientReviewId ?? null,
      },
      select: { id: true },
    });

    const studySeconds = durationMs === null ? 0 : Math.round(Math.min(durationMs, MAX_STUDY_SECONDS_PER_REVIEW * 1000) / 1000);
    const activity = await recordActivity(tx, userId, { flashcards: 1, studySeconds }, { at, timeZone, rules });
    const day = await tx.dailyActivity.findUnique({
      where: { userId_date: { userId, date: dateColumnFromLocalDate(activity.date) } },
      select: { flashcardsReviewed: true },
    });
    const reviewedToday = day?.flashcardsReviewed ?? 0;
    const batchXp = await creditFlashcardBatch(tx, userId, reviewedToday, { date: activity.date, at, timeZone, rules });

    const back = comesBackInSession(scheduled, now);
    const outcome: ReviewOutcome = {
      flashcardId: access.flashcardId,
      replayed: false,
      phase: newState,
      dueAt: scheduled.dueAt.toISOString(),
      intervalDays: scheduled.intervalDays,
      isLearningStep: scheduled.isLearningStep,
      isLeech: scheduled.isLeech,
      nextIntervals: back ? intervalLabels(next, new Date(Math.max(now.getTime(), scheduled.dueAt.getTime())), config) : null,
      xpAwarded: activity.xpAwarded + batchXp,
    };
    return { outcome, reviewedToday };
  }, TX_OPTIONS);

  if (!result.outcome.replayed && result.reviewedToday === 1) {
    // First flashcard of the day: tick the plan's FLASHCARDS item (§16). Best effort, outside the review transaction.
    try {
      await recordPlanActivity(db, { userId, at: now, timeZone });
    } catch (error) {
      logger.warn("flashcards: study plan sync failed after a review", { err: error });
    }
  }
  return result.outcome;
}

/** A queued review as the batch endpoint receives it (each item is validated on its own by {@link reviewCard}). */
const queuedReviewSchema = z.looseObject({ clientReviewId: z.unknown().optional(), reviewedAt: z.unknown().optional() });
export const syncReviewsSchema = z.array(queuedReviewSchema).min(1, "Send at least one review.").max(MAX_QUEUE_LIMIT, `Send at most ${MAX_QUEUE_LIMIT} reviews at a time.`);

export type SyncedReview =
  | { clientReviewId: string | null; ok: true; outcome: ReviewOutcome }
  | { clientReviewId: string | null; ok: false; code: string; message: string };

/**
 * Batch replay of queued reviews (offline sync, `POST /api/v1/flashcards/reviews`): applied in press order, each
 * idempotent; one bad review never blocks the rest (its failure is reported in its slot).
 */
export async function syncReviews(actor: FlashcardActor, raw: unknown, now: Date = new Date()): Promise<SyncedReview[]> {
  assertStudent(actor);
  const items = parse(syncReviewsSchema, raw);
  const pressedAt = (value: unknown) => (typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : Infinity);
  const ordered = items.map((item, index) => ({ item, index, at: pressedAt(item.reviewedAt) })).sort((a, b) => a.at - b.at || a.index - b.index);
  const results: SyncedReview[] = [];
  for (const { item } of ordered) {
    const clientReviewId = typeof item.clientReviewId === "string" ? item.clientReviewId : null;
    try {
      results.push({ clientReviewId, ok: true, outcome: await reviewCard(actor, item, now) });
    } catch (error) {
      if (!(error instanceof AppError)) throw error;
      results.push({ clientReviewId, ok: false, code: error.code, message: error.message });
    }
  }
  return results;
}

// =====================================================================================================================
// Suspension
// =====================================================================================================================

export const suspendInputSchema = z.strictObject({
  flashcardId: z.uuid("Choose a valid flashcard."),
  suspended: z.boolean(),
  subjectId: z.uuid().optional(),
});

/**
 * Suspends ("hide from my reviews") or restores a card. Suspending a card never studied introduces it as suspended,
 * so it stops appearing as new. Scheduling state is kept, so a restored card continues where it was.
 *
 * @throws AppError VALIDATION | FORBIDDEN | NOT_FOUND | ENTITLEMENT_REQUIRED
 */
export async function setCardSuspended(actor: FlashcardActor, raw: unknown, now: Date = new Date()): Promise<{ flashcardId: string; suspended: boolean }> {
  assertStudent(actor);
  const input = parse(suspendInputSchema, raw);
  const userId = actor.userId;
  if (!input.suspended) {
    // Restoring needs only the student's own state row (a card they may no longer be offered stays restorable).
    const updated = await db.flashcardState.updateMany({ where: { userId, flashcardId: input.flashcardId }, data: { isSuspended: false } });
    if (updated.count === 0) throw notFound();
    return { flashcardId: input.flashcardId, suspended: false };
  }
  const access = await resolveCardAccess(userId, input.flashcardId, input.subjectId);
  const scheduler = await getFlashcardScheduler();
  await db.flashcardState.upsert({
    where: { userId_flashcardId: { userId, flashcardId: access.flashcardId } },
    create: {
      userId,
      flashcardId: access.flashcardId,
      subjectId: access.subjectId,
      dueAt: now,
      easeFactor: scheduler.srs.startingEase ?? DEFAULT_SRS_CONFIG.startingEase,
      state: "NEW",
      isSuspended: true,
    },
    update: { isSuspended: true },
    select: { flashcardId: true },
  });
  return { flashcardId: access.flashcardId, suspended: true };
}

export interface SuspendedCardItem {
  flashcardId: string;
  subjectName: string;
  cardType: FlashcardCardType;
  frontHtml: SanitizedHtml;
  isPersonal: boolean;
}

export const pageSchema = z.object({ cursor: z.uuid().optional(), limit: z.int().min(1).max(100).optional() });

/** The student's suspended cards (cursor pagination by card id). */
export async function listSuspendedCards(
  actor: FlashcardActor,
  raw: z.input<typeof pageSchema> = {},
): Promise<{ items: SuspendedCardItem[]; nextCursor: string | null }> {
  assertStudent(actor);
  const page = parse(pageSchema, raw);
  const limit = page.limit ?? 30;
  const rows = await db.flashcardState.findMany({
    where: {
      userId: actor.userId,
      isSuspended: true,
      flashcard: { status: "PUBLISHED", OR: [{ ownerUserId: null }, { ownerUserId: actor.userId }] },
      ...(page.cursor ? { flashcardId: { gt: page.cursor } } : {}),
    },
    select: { flashcardId: true, enrollment: { select: { subject: { select: { name: true } } } } },
    orderBy: { flashcardId: "asc" },
    take: limit + 1,
  });
  const pageRows = rows.slice(0, limit);
  const { rows: content, faces } = await loadCardContent(pageRows.map((r) => r.flashcardId));
  const items = pageRows.flatMap((row): SuspendedCardItem[] => {
    const card = content.get(row.flashcardId);
    const face = faces.get(row.flashcardId);
    return card && face
      ? [{ flashcardId: row.flashcardId, subjectName: row.enrollment.subject.name, cardType: card.cardType, frontHtml: face.frontHtml, isPersonal: card.ownerUserId !== null }]
      : [];
  });
  return { items, nextCursor: rows.length > limit ? (pageRows.at(-1)?.flashcardId ?? null) : null };
}

// =====================================================================================================================
// Card preview (search deep link /app/flashcards?cardId=…)
// =====================================================================================================================

export interface CardPreview {
  flashcardId: string;
  subjectId: string;
  subjectName: string;
  topicName: string | null;
  cardType: FlashcardCardType;
  cardTypeLabel: string;
  frontHtml: SanitizedHtml;
  backHtml: SanitizedHtml;
  notesHtml: SanitizedHtml | null;
  languageCode: string;
  isPersonal: boolean;
  /** Studied before (has a scheduling state). */
  studied: boolean;
  suspended: boolean;
  /** Next due time (ISO) when studied. */
  dueAt: string | null;
}

/** One card the student may study, for a direct link (search results). Null when it isn't available to them. */
export async function getCardPreview(actor: FlashcardActor, flashcardId: string): Promise<CardPreview | null> {
  assertStudent(actor);
  let access: CardAccess;
  try {
    access = await resolveCardAccess(actor.userId, flashcardId);
  } catch (error) {
    if (error instanceof AppError && (error.code === "NOT_FOUND" || error.code === "ENTITLEMENT_REQUIRED")) return null;
    throw error;
  }
  const [{ rows, faces }, state, scopes] = await Promise.all([
    loadCardContent([access.flashcardId]),
    db.flashcardState.findUnique({
      where: { userId_flashcardId: { userId: actor.userId, flashcardId: access.flashcardId } },
      select: { state: true, dueAt: true, isSuspended: true },
    }),
    loadSubjectScopes(actor.userId, access.subjectId),
  ]);
  const row = rows.get(access.flashcardId);
  const face = faces.get(access.flashcardId);
  const scope = scopes[0];
  if (!row || !face) return null;
  const studied = state !== null && state.state !== "NEW";
  return {
    flashcardId: row.id,
    subjectId: access.subjectId,
    subjectName: scope?.subjectName ?? "",
    topicName: topicNameFor(row, scope),
    cardType: row.cardType,
    cardTypeLabel: CARD_TYPE_LABELS[row.cardType],
    ...face,
    languageCode: row.languageCode,
    isPersonal: access.isPersonal,
    studied,
    suspended: state?.isSuspended ?? false,
    dueAt: studied && state ? state.dueAt.toISOString() : null,
  };
}

// =====================================================================================================================
// Personal cards (private to their owner; no editorial workflow; "deleted" = ARCHIVED, review history kept)
// =====================================================================================================================

const side = (label: string) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : (value ?? "")),
    z
      .string()
      .min(1, `Write the ${label} of the card.`)
      .max(MAX_PERSONAL_SIDE_LENGTH, `Keep the ${label} under ${MAX_PERSONAL_SIDE_LENGTH.toLocaleString("en")} characters.`),
  );

const optionalText = z.preprocess(
  (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.replace(/\r\n?/g, "\n").trim()) : (value ?? null)),
  z.string().max(MAX_PERSONAL_SIDE_LENGTH, `Keep the notes under ${MAX_PERSONAL_SIDE_LENGTH.toLocaleString("en")} characters.`).nullable(),
);

const optionalUuid = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null)),
  z.uuid("Choose a topic from the list.").nullable(),
);

export const personalCardSchema = z.strictObject({
  subjectId: z.uuid("Choose a subject."),
  topicId: optionalUuid,
  cardType: z.enum(FLASHCARD_TYPES, { message: "Choose the kind of card." }),
  front: side("front"),
  back: side("back"),
  notes: optionalText,
});
export type PersonalCardInput = z.input<typeof personalCardSchema>;

export const updatePersonalCardSchema = z.strictObject({ id: z.uuid("Choose a valid card.") }).extend(personalCardSchema.shape);
export type UpdatePersonalCardInput = z.input<typeof updatePersonalCardSchema>;

export const previewCardSchema = z.strictObject({ front: side("front"), back: side("back"), notes: optionalText });

export interface PersonalCardFormSubject {
  subjectId: string;
  name: string;
  /** Topics of the pinned version in tree order (`depth` for indentation). */
  topics: { id: string; name: string; code: string | null; depth: number }[];
}

export interface PersonalCardFormOptions {
  /** At least one subject includes flashcards. */
  entitled: boolean;
  subjects: PersonalCardFormSubject[];
}

/** Subjects (ACTIVE, entitled) and their in-scope topics for the personal-card form. */
export async function getPersonalCardFormOptions(actor: FlashcardActor): Promise<PersonalCardFormOptions> {
  assertStudent(actor);
  const scopes = await loadSubjectScopes(actor.userId);
  const subjects = scopes
    .filter((s) => s.entitled)
    .map((s) => ({ subjectId: s.subjectId, name: s.subjectName, topics: s.topics.map((t) => ({ id: t.id, name: t.name, code: t.code, depth: t.depth })) }));
  return { entitled: subjects.length > 0, subjects };
}

/** Subject (ACTIVE enrolment, entitled) and topic (in the pinned version) checks for a personal card. */
async function assertPersonalCardTarget(userId: string, subjectId: string, topicId: string | null): Promise<{ languageCode: string }> {
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId, subjectId } },
    select: { status: true, syllabusId: true, subject: { select: { languageCode: true } } },
  });
  if (!enrollment || enrollment.status !== "ACTIVE") throw AppError.validation({ subjectId: ["Choose one of your subjects."] });
  const entitlements = await getSubjectEntitlements(userId, subjectId, { syllabusId: enrollment.syllabusId });
  if (!hasFeature(entitlements, "flashcards")) throw new EntitlementRequiredError("flashcards");
  if (topicId) {
    const topic = await db.topic.findUnique({ where: { id: topicId }, select: { syllabusId: true } });
    if (topic?.syllabusId !== enrollment.syllabusId) throw AppError.validation({ topicId: ["Choose a topic from this subject."] });
  }
  return { languageCode: enrollment.subject.languageCode };
}

async function assertPersonalWriteRate(userId: string): Promise<void> {
  await assertRateLimit(
    rateLimits.flashcardWrite(userId),
    "You've saved a lot of cards in a short time. Please wait a little and try again.",
  );
}

function renderPersonal(id: string, card: { front: string; back: string; notes: string | null }) {
  // Personal cards never resolve `asset:` images (no uploads into private cards); text, Markdown and LaTeX only.
  return { renderedHtml: toRenderedJson(renderFlashcardHtml({ id, ...card }, () => null)), renderVersion: PIPELINE_VERSION };
}

/**
 * Creates a personal card (§18 "your own cards"): PUBLISHED at once (no editorial workflow), private to the student,
 * rendered at save time, tagged to one topic of the pinned version when given.
 *
 * @throws AppError VALIDATION | FORBIDDEN | ENTITLEMENT_REQUIRED | QUOTA_EXCEEDED | RATE_LIMITED
 */
export async function createPersonalCard(actor: FlashcardActor, raw: unknown, now: Date = new Date()): Promise<{ id: string }> {
  assertStudent(actor);
  const input = parse(personalCardSchema, raw);
  const target = await assertPersonalCardTarget(actor.userId, input.subjectId, input.topicId);
  const owned = await db.flashcard.count({ where: { ownerUserId: actor.userId, status: "PUBLISHED" } });
  if (owned >= MAX_PERSONAL_CARDS) {
    throw new AppError("QUOTA_EXCEEDED", `You can keep up to ${MAX_PERSONAL_CARDS.toLocaleString("en")} of your own cards. Delete some to add more.`);
  }
  await assertPersonalWriteRate(actor.userId);
  return db.$transaction(async (tx) => {
    const ids = await tx.$queryRaw<{ id: string }[]>`SELECT uuidv7()::text AS "id"`;
    const id = ids[0]?.id;
    if (!id) throw new Error("uuidv7() returned no id");
    await tx.flashcard.create({
      data: {
        id,
        subjectId: input.subjectId,
        ownerUserId: actor.userId,
        cardType: input.cardType,
        front: input.front,
        back: input.back,
        notes: input.notes,
        languageCode: target.languageCode,
        accessTier: "PREMIUM",
        status: "PUBLISHED",
        publishedAt: now,
        createdById: actor.userId,
        ...renderPersonal(id, input),
        ...(input.topicId ? { topics: { create: { topicId: input.topicId, isPrimary: true } } } : {}),
      },
      select: { id: true },
    });
    return { id };
  }, TX_OPTIONS);
}

/** Loads one of the student's own live cards or answers NOT_FOUND (never reveals other students' cards). */
async function ownCard(userId: string, id: string) {
  if (!uuid.safeParse(id).success) throw notFound();
  const card = await db.flashcard.findFirst({
    where: { id, ownerUserId: userId, status: "PUBLISHED" },
    select: { id: true, subjectId: true, cardType: true, front: true, back: true, notes: true, topics: { select: { topicId: true, isPrimary: true } } },
  });
  if (!card) throw notFound();
  return card;
}

export interface PersonalCardDetail {
  id: string;
  subjectId: string;
  topicId: string | null;
  cardType: FlashcardCardType;
  front: string;
  back: string;
  notes: string | null;
}

/** One of the student's own cards, for the edit form. @throws AppError NOT_FOUND */
export async function getPersonalCard(actor: FlashcardActor, id: string): Promise<PersonalCardDetail> {
  assertStudent(actor);
  const card = await ownCard(actor.userId, id);
  const primary = card.topics.find((t) => t.isPrimary) ?? card.topics[0];
  return { id: card.id, subjectId: card.subjectId, topicId: primary?.topicId ?? null, cardType: card.cardType, front: card.front, back: card.back, notes: card.notes };
}

/**
 * Edits one of the student's own cards (text, kind, subject, topic). The schedule is kept unless the subject changes,
 * in which case the card starts afresh in the new subject (its review history is kept).
 *
 * @throws AppError VALIDATION | NOT_FOUND | ENTITLEMENT_REQUIRED | RATE_LIMITED
 */
export async function updatePersonalCard(actor: FlashcardActor, raw: unknown): Promise<{ id: string }> {
  assertStudent(actor);
  const input = parse(updatePersonalCardSchema, raw);
  const card = await ownCard(actor.userId, input.id);
  const target = await assertPersonalCardTarget(actor.userId, input.subjectId, input.topicId);
  await assertPersonalWriteRate(actor.userId);
  await db.$transaction(async (tx) => {
    await tx.flashcard.update({
      where: { id: card.id },
      data: {
        subjectId: input.subjectId,
        cardType: input.cardType,
        front: input.front,
        back: input.back,
        notes: input.notes,
        languageCode: target.languageCode,
        ...renderPersonal(card.id, input),
      },
      select: { id: true },
    });
    await tx.flashcardTopic.deleteMany({ where: { flashcardId: card.id } });
    if (input.topicId) await tx.flashcardTopic.create({ data: { flashcardId: card.id, topicId: input.topicId, isPrimary: true } });
    if (input.subjectId !== card.subjectId) {
      // The state's composite FK pins it to the old enrolment: move it (keeping its schedule) to the new subject.
      await tx.flashcardState.updateMany({ where: { userId: actor.userId, flashcardId: card.id }, data: { subjectId: input.subjectId } });
    }
  }, TX_OPTIONS);
  return { id: card.id };
}

/**
 * Deletes one of the student's own cards: ARCHIVED (out of every deck and queue); review history is kept for the
 * student's statistics. @throws AppError NOT_FOUND
 */
export async function deletePersonalCard(actor: FlashcardActor, id: string, now: Date = new Date()): Promise<{ id: string }> {
  assertStudent(actor);
  const card = await ownCard(actor.userId, id);
  await db.flashcard.update({ where: { id: card.id }, data: { status: "ARCHIVED", archivedAt: now }, select: { id: true } });
  return { id: card.id };
}

export interface PersonalCardItem {
  id: string;
  subjectId: string;
  subjectName: string;
  topicName: string | null;
  cardType: FlashcardCardType;
  frontHtml: SanitizedHtml;
  backHtml: SanitizedHtml;
  suspended: boolean;
  /** Next due time (ISO) once studied. */
  dueAt: string | null;
}

export const listPersonalSchema = pageSchema.extend({ subjectId: z.uuid().optional() });

/** The student's own cards, newest first (cursor pagination on the time-ordered id). */
export async function listPersonalCards(
  actor: FlashcardActor,
  raw: z.input<typeof listPersonalSchema> = {},
): Promise<{ items: PersonalCardItem[]; nextCursor: string | null }> {
  assertStudent(actor);
  const page = parse(listPersonalSchema, raw);
  const limit = page.limit ?? 30;
  const rows = await db.flashcard.findMany({
    where: {
      ownerUserId: actor.userId,
      status: "PUBLISHED",
      ...(page.subjectId ? { subjectId: page.subjectId } : {}),
      ...(page.cursor ? { id: { lt: page.cursor } } : {}),
    },
    select: {
      ...CARD_CONTENT_SELECT,
      subjectId: true,
      subject: { select: { name: true } },
      topics: { select: { topicId: true, isPrimary: true, topic: { select: { name: true } } } },
      states: { where: { userId: actor.userId }, select: { state: true, dueAt: true, isSuspended: true } },
    },
    orderBy: { id: "desc" },
    take: limit + 1,
  });
  const pageRows = rows.slice(0, limit);
  const items = pageRows.map((row): PersonalCardItem => {
    const face = facesOf(row, () => null);
    const state = row.states[0];
    const topic = row.topics.find((t) => t.isPrimary) ?? row.topics[0];
    return {
      id: row.id,
      subjectId: row.subjectId,
      subjectName: row.subject.name,
      topicName: topic?.topic.name ?? null,
      cardType: row.cardType,
      frontHtml: face.frontHtml,
      backHtml: face.backHtml,
      suspended: state?.isSuspended ?? false,
      dueAt: state && state.state !== "NEW" ? state.dueAt.toISOString() : null,
    };
  });
  return { items, nextCursor: rows.length > limit ? (pageRows.at(-1)?.id ?? null) : null };
}

/** Renders a draft card exactly as it will look (Markdown + LaTeX), without saving. */
export function previewPersonalCard(actor: FlashcardActor, raw: unknown): CardFaces {
  assertStudent(actor);
  const input = parse(previewCardSchema, raw);
  return renderFaces({ id: "preview0", front: input.front, back: input.back, notes: input.notes }, () => null);
}
