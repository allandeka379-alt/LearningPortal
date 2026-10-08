import type { MasteryBand, SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import { masteryBandFromScore } from "@/lib/mastery-band";

/**
 * Pure core of the "move to the newer syllabus version" flow (§26, ARCHITECTURE §4.3): which version counts as newer,
 * how topics of the new version map back to the pinned one through `Topic.originTopicId` lineage, and what the move
 * carries over (mastery evidence, optional-topic choices, award route). No I/O; `version-move.ts` does the database work.
 */

// =====================================================================================================================
// Which version is newer
// =====================================================================================================================

export interface VersionFacts {
  id: string;
  status: SyllabusStatus;
  /** `YYYY-MM-DD`. */
  effectiveFrom: string;
  effectiveTo: string | null;
  /** Previous version this one replaces (lineage). */
  supersedesId: string | null;
}

/** Statuses a pinned version can have when a newer CURRENT version exists (it was superseded, or later archived). */
export const MOVABLE_FROM_STATUSES: readonly SyllabusStatus[] = ["SUPERSEDED", "ARCHIVED"];

/** True when `ancestorId` is reached from `version` by following `supersedesId` (at most `maxHops` steps). */
export function descendsFrom(version: VersionFacts, ancestorId: string, versions: ReadonlyMap<string, VersionFacts>, maxHops = 50): boolean {
  let cursor: string | null = version.supersedesId;
  for (let hops = 0; cursor !== null && hops < maxHops; hops += 1) {
    if (cursor === ancestorId) return true;
    cursor = versions.get(cursor)?.supersedesId ?? null;
  }
  return false;
}

/**
 * The CURRENT version a student pinned to `pinned` may move to, or null. Offered only when the pinned version was
 * superseded (or archived) AND the current one is genuinely newer: it descends from the pinned version through
 * `supersedesId`, or (versions created without lineage) it takes effect later. A rollback (an older version made current
 * again) is therefore never offered as an "upgrade".
 */
export function newerCurrentVersion<T extends VersionFacts>(pinned: VersionFacts, versions: readonly T[]): T | null {
  if (!MOVABLE_FROM_STATUSES.includes(pinned.status)) return null;
  const current = versions.find((version) => version.status === "CURRENT") ?? null;
  if (!current || current.id === pinned.id) return null;
  const byId = new Map<string, VersionFacts>(versions.map((version) => [version.id, version]));
  byId.set(pinned.id, pinned);
  if (descendsFrom(current, pinned.id, byId)) return current;
  if (descendsFrom(pinned, current.id, byId)) return null;
  return current.effectiveFrom > pinned.effectiveFrom ? current : null;
}

/** Whether a version's effective range contains a calendar date (`YYYY-MM-DD`). */
export function versionCoversDate(version: Pick<VersionFacts, "effectiveFrom" | "effectiveTo">, date: string): boolean {
  return version.effectiveFrom <= date && (version.effectiveTo === null || date <= version.effectiveTo);
}

// =====================================================================================================================
// Topic lineage
// =====================================================================================================================

export interface LineageTopic {
  id: string;
  syllabusId: string;
  /** The equivalent topic of the previous version this node was cloned from. */
  originTopicId: string | null;
}

/**
 * Maps each topic of the target version to the topic of the SOURCE version it descends from, following
 * `originTopicId` through any intermediate versions (v1 → v2 → v3). Topics added in a later version (no lineage back to
 * the source) are absent. `topics` must contain the target's topics and those of every intermediate version; topics
 * of other versions are ignored. Cycles and runaway chains stop after `maxHops`.
 */
export function mapTopicLineage(
  targetSyllabusId: string,
  sourceSyllabusId: string,
  topics: readonly LineageTopic[],
  maxHops = 50,
): Map<string, string> {
  const byId = new Map(topics.map((topic) => [topic.id, topic]));
  const out = new Map<string, string>();
  for (const topic of topics) {
    if (topic.syllabusId !== targetSyllabusId) continue;
    let cursor = topic.originTopicId;
    for (let hops = 0; cursor !== null && hops < maxHops; hops += 1) {
      const origin = byId.get(cursor);
      if (!origin) break;
      if (origin.syllabusId === sourceSyllabusId) {
        out.set(topic.id, origin.id);
        break;
      }
      if (origin.syllabusId === targetSyllabusId) break; // lineage inside the target version: not a predecessor
      cursor = origin.originTopicId;
    }
  }
  return out;
}

// =====================================================================================================================
// Mastery carry-over
// =====================================================================================================================

/** A TopicMastery row of the pinned (source) version: the evidence fields the move copies. */
export interface SourceMastery {
  topicId: string;
  isLeaf: boolean;
  score: number;
  recentAccuracy: number | null;
  questionsAttempted: number;
  questionsCorrect: number;
  marksAwarded: number;
  marksAvailable: number;
  currentDifficulty: number;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  algorithmVersion: number;
  firstPracticedAt: Date | null;
  lastPracticedAt: Date | null;
  nextReviewAt: Date | null;
  remediationStartedAt: Date | null;
  seededByDiagnostic: boolean;
}

/** A topic of the target version. */
export interface TargetTopic {
  id: string;
  kind: TopicKind;
  depth: number;
  /** No children in the target tree. */
  isLeaf: boolean;
  isOptional: boolean;
}

/** A new TopicMastery row for the target version, seeded from its predecessor's evidence. */
export interface CarriedMastery extends Omit<SourceMastery, "topicId" | "isLeaf"> {
  topicId: string;
  /** The source topic whose evidence was copied. */
  fromTopicId: string;
  topicKind: TopicKind;
  topicDepth: number;
  isLeaf: true;
  band: MasteryBand;
}

/**
 * Which mastery rows the move creates in the target version. Rules:
 * - only LEAF topics of the target version are seeded (direct evidence); ancestor rows are rollups that
 *   `refreshSubjectProgress` recomputes from the leaves;
 * - the source row must carry evidence (`questionsAttempted > 0`); a source rollup row may seed a target leaf (the
 *   new version merged subtopics into one topic);
 * - a target topic that already has a mastery row keeps it (evidence in the new version wins);
 * - the band is re-derived from the score (the database CHECK pins band = thresholds(score)).
 * Old rows are never modified: they stay as history of the old version.
 */
export function planMasteryCarryOver(input: {
  lineage: ReadonlyMap<string, string>;
  sourceRows: readonly SourceMastery[];
  targetTopics: readonly TargetTopic[];
  existingTargetTopicIds: ReadonlySet<string>;
}): CarriedMastery[] {
  const source = new Map(input.sourceRows.map((row) => [row.topicId, row]));
  const out: CarriedMastery[] = [];
  for (const topic of input.targetTopics) {
    if (!topic.isLeaf || input.existingTargetTopicIds.has(topic.id)) continue;
    const fromTopicId = input.lineage.get(topic.id);
    if (fromTopicId === undefined) continue;
    const row = source.get(fromTopicId);
    if (!row || row.questionsAttempted <= 0) continue;
    const score = Math.min(100, Math.max(0, row.score));
    out.push({
      score,
      band: masteryBandFromScore(score),
      recentAccuracy: row.recentAccuracy,
      questionsAttempted: row.questionsAttempted,
      questionsCorrect: Math.min(row.questionsCorrect, row.questionsAttempted),
      marksAwarded: Math.min(row.marksAwarded, row.marksAvailable),
      marksAvailable: row.marksAvailable,
      currentDifficulty: Math.min(5, Math.max(1, Math.round(row.currentDifficulty))),
      consecutiveCorrect: row.consecutiveCorrect,
      consecutiveIncorrect: row.consecutiveIncorrect,
      algorithmVersion: row.algorithmVersion,
      firstPracticedAt: row.firstPracticedAt,
      lastPracticedAt: row.lastPracticedAt,
      nextReviewAt: row.nextReviewAt,
      remediationStartedAt: row.remediationStartedAt,
      seededByDiagnostic: row.seededByDiagnostic,
      topicId: topic.id,
      fromTopicId,
      topicKind: topic.kind,
      topicDepth: topic.depth,
      isLeaf: true,
    });
  }
  return out;
}

// =====================================================================================================================
// Optional-topic choices and the award route
// =====================================================================================================================

/**
 * Optional-topic choices to re-make in the target version: a chosen source topic carries over to the target topic(s)
 * descending from it that are still optional. Choices whose topic was dropped or made compulsory are reported as
 * `dropped` (the student chooses again).
 */
export function planChoiceCarryOver(input: {
  lineage: ReadonlyMap<string, string>;
  chosenSourceTopicIds: readonly string[];
  targetTopics: readonly TargetTopic[];
}): { carried: string[]; dropped: string[] } {
  const optional = new Map(input.targetTopics.filter((topic) => topic.isOptional).map((topic) => [topic.id, topic]));
  const bySource = new Map<string, string[]>();
  for (const [targetId, sourceId] of input.lineage) {
    if (optional.has(targetId)) bySource.set(sourceId, [...(bySource.get(sourceId) ?? []), targetId]);
  }
  const carried = new Set<string>();
  const dropped: string[] = [];
  for (const sourceId of input.chosenSourceTopicIds) {
    const targets = bySource.get(sourceId);
    if (targets && targets.length > 0) targets.forEach((id) => carried.add(id));
    else dropped.push(sourceId);
  }
  return { carried: [...carried].sort(), dropped };
}

export interface RouteFacts {
  id: string;
  code: string;
  isDefault: boolean;
}

/**
 * The award route in the target version: the route with the same code as the pinned one (e.g. "EXTENDED"), else the
 * target's default route (what a new enrolment gets), else none.
 */
export function pickTargetRoute(pinnedRouteCode: string | null, targetRoutes: readonly RouteFacts[]): string | null {
  if (pinnedRouteCode !== null) {
    const same = targetRoutes.find((route) => route.code === pinnedRouteCode);
    if (same) return same.id;
  }
  return targetRoutes.find((route) => route.isDefault)?.id ?? null;
}
