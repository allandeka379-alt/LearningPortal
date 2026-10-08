/**
 * Personal study-plan generator. Pure core: no DB, no I/O; deterministic for a given input and seed.
 * Satisfies §16 (weekly schedule that adapts to performance, remaining syllabus, time available, exam date, weak
 * topics and previous sessions), §6 ("daily target", "current study plan") and §52 step 7 ("get a personalised
 * study plan"). Used by the `studyplan.adapt` nightly job and after mock submissions (ARCHITECTURE §3.7).
 *
 * ## Algorithm
 * 1. **Days.** From `today` for `horizonDays` (default 14). With a future exam date the plan stops the day before
 *    the exam (EXAM_PREP mode); with no exam date, or one today or in the past, it is a MAINTENANCE plan (no mocks).
 *    Each day's budget is the availability for its weekday minus minutes already reserved by completed items. The
 *    sum of a day's `targetMinutes` NEVER exceeds its budget.
 * 2. **Subject need** = priorityWeight × Σ topic need (min 0.1 per topic, so strong subjects keep a maintenance
 *    share). Topic need: 1 for an unassessed topic; otherwise the gap to the subject's target score
 *    `(target − mastery) / target` (target from the target grade, default 75), +0.25 when below 60 (weak), +0.25
 *    when lessons remain. Study minutes are shared in proportion to need with a deficit (fair-share) scheduler that
 *    also counts the last 7 days' sessions, so a neglected subject catches up first.
 * 3. **Fixed slots** placed before study blocks:
 *    - MOCK_EXAM by cadence (EXAM_PREP only): none more than 12 weeks out, every 28 days from 12 to 6 weeks, every
 *      14 days from 6 to 2 weeks, every 7 days in the final 2 weeks (thresholds are parameters). A due mock goes on
 *      the roomiest day of the next week that fits at least `minMockExamMinutes`; subjects take turns (oldest mock
 *      first). A mock day holds only the mock (and flashcards if time remains).
 *    - DIAGNOSTIC for a subject with no mastery evidence at all and no diagnostic yet (§52 step 5), on the first day
 *      with room; that subject's lessons start after it.
 *    - FLASHCARDS: a short daily slot (10 min) on days with at least 25 minutes, rotating through subjects that have
 *      flashcards ("short and frequent").
 * 4. **Study blocks.** The remaining minutes are cut into units of about 30 minutes (45 → one unit, 75 → 40 + 35)
 *    and each unit goes to the subject furthest behind its fair share, so equal-need subjects share a day while a
 *    much needier subject can take the whole day; at most 3 subjects a day. Interleaving: a subject studied on each
 *    of the previous 2 days rests while another subject that did not is behind its share ("avoid the same subject
 *    more than 2 days in a row when others need time").
 * 5. **Inside a block**, tasks are pulled in priority order: spaced REVIEW that is due → one weak-topic PRACTICE
 *    (lowest mastery first; then a REVIEW 2 days later and re-practice no sooner than 5 days) → PRACTICE that
 *    follows a lesson just finished → the next LESSON (new and in-progress topics follow lesson → practice; long
 *    lessons are split across sessions) → MAINTENANCE practice of competent topics (at most weekly per topic) →
 *    extra practice on the weakest topic not yet practised today. In the final 2 weeks before the exam (revision
 *    phase) practice and review come first and new lessons last.
 * 6. When a block's tasks run out, its last practice/review absorbs the rest of the block; a block with no work at
 *    all passes its minutes to the next subject. Day leftovers shorter than an item (< 10 min) go to the day's last
 *    practice/review; anything else stays unplanned rather than inventing work.
 *
 * `adaptPlan` re-plans from today while keeping completed items (and everything before today) untouched;
 * completed items consume their day's budget and their lessons are not planned again.
 */
import {
  addDays,
  daysBetween,
  eachLocalDate,
  isValidTimeZone,
  isoWeekday,
  localDateString,
  parseLocalDate,
  type LocalDate,
} from "@/lib/dates";
import { roundHalfUp } from "@/server/progress/core";
import { MASTERY_BAND_MIN_SCORE } from "@/lib/mastery-band";
import { createRng, shuffled, type Seed } from "@/server/adaptive/core";

// ---------------------------------------------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------------------------------------------

export const PLAN_ACTIVITY_TYPES = ["LESSON", "PRACTICE", "FLASHCARDS", "REVIEW", "MOCK_EXAM", "DIAGNOSTIC"] as const;
export type PlanActivityType = (typeof PLAN_ACTIVITY_TYPES)[number];

/** Why an item is in the plan (UI copy is mapped from these codes). */
export type PlanReason =
  | "DIAGNOSTIC_BASELINE"
  | "MOCK_EXAM_CADENCE"
  | "FLASHCARD_REVIEW"
  | "SPACED_REVIEW"
  | "WEAK_TOPIC_PRACTICE"
  | "NEW_TOPIC_LESSON"
  | "NEXT_LESSON"
  | "CONTINUE_LESSON"
  | "PRACTICE_AFTER_LESSON"
  | "UNASSESSED_TOPIC_PRACTICE"
  | "MAINTENANCE_PRACTICE"
  | "REVISION_PRACTICE"
  | "EXTRA_PRACTICE";

export const WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type WeekdayKey = (typeof WEEKDAY_KEYS)[number];
/** Study minutes available on each weekday. */
export type WeeklyAvailability = Readonly<Record<WeekdayKey, number>>;

export interface PlanLesson {
  lessonId: string;
  /** Estimated minutes to study the lesson. */
  minutes: number;
}

export interface PlanTopic {
  topicId: string;
  /** Current mastery (0–100) or null if never assessed. */
  mastery: number | null;
  /** Unfinished published lessons in syllabus order. */
  lessonsRemaining: readonly PlanLesson[];
  /** Minutes for a useful practice session in this topic (0 → planner default). */
  estimatedPracticeMinutes: number;
}

export interface PlanSubject {
  subjectId: string;
  /** Informational (e.g. "A"); the service converts it to `targetScore`. */
  targetGrade?: string | null;
  /** Mastery (0–100) the target grade requires; defaults to `defaultTargetScore` (75). */
  targetScore?: number | null;
  /** Student/parent emphasis multiplier (default 1). */
  priorityWeight?: number;
  /** The subject has published flashcards for the student (enables FLASHCARDS slots). */
  hasFlashcards?: boolean;
  /** Topics in syllabus order. */
  topics: readonly PlanTopic[];
}

export interface RecentSession {
  subjectId: string;
  topicId?: string | null;
  activityType: PlanActivityType;
  startedAt: Date;
  minutes: number;
}

export interface PlannerConfig {
  minItemMinutes: number;
  preferredBlockMinutes: number;
  maxSubjectsPerDay: number;
  /** A subject is not planned on more than this many consecutive days while another subject can take the slot. */
  maxConsecutiveDays: number;
  defaultTargetScore: number;
  minutesPerQuestion: number;
  defaultPracticeMinutes: number;
  reviewMinutes: number;
  /** Days after a weak-topic (or first) practice before its spaced REVIEW. */
  reviewOffsetDays: number;
  /** Days before a weak topic may be practised again. */
  weakRepracticeDays: number;
  /** Days before a competent topic gets maintenance practice again. */
  maintenanceIntervalDays: number;
  /** A lesson is only split when at least this many minutes are free. */
  lessonSplitMinMinutes: number;
  flashcardMinutes: number;
  flashcardMinDayBudget: number;
  diagnosticMinutes: number;
  mockExamMinutes: number;
  minMockExamMinutes: number;
  /** Ascending by `withinDays`: when the exam is ≤ withinDays away, a mock is due every `everyDays`. */
  mockCadence: readonly { withinDays: number; everyDays: number }[];
  /** Final days before the exam in which practice and review take precedence over new lessons. */
  revisionPhaseDays: number;
  /** How far back `recentSessions` influence fair share and interleaving. */
  recentWindowDays: number;
  maxHorizonDays: number;
}

export const DEFAULT_PLANNER_CONFIG: Readonly<PlannerConfig> = Object.freeze({
  minItemMinutes: 10,
  preferredBlockMinutes: 30,
  maxSubjectsPerDay: 3,
  maxConsecutiveDays: 2,
  defaultTargetScore: 75,
  minutesPerQuestion: 2,
  defaultPracticeMinutes: 20,
  reviewMinutes: 15,
  reviewOffsetDays: 2,
  weakRepracticeDays: 5,
  maintenanceIntervalDays: 7,
  lessonSplitMinMinutes: 15,
  flashcardMinutes: 10,
  flashcardMinDayBudget: 25,
  diagnosticMinutes: 30,
  mockExamMinutes: 120,
  minMockExamMinutes: 60,
  mockCadence: Object.freeze([
    { withinDays: 14, everyDays: 7 },
    { withinDays: 42, everyDays: 14 },
    { withinDays: 84, everyDays: 28 },
  ]),
  revisionPhaseDays: 14,
  recentWindowDays: 7,
  maxHorizonDays: 92,
});

export interface PlanInput {
  /** The student's current local date. */
  today: LocalDate;
  examDate?: LocalDate | null;
  /** Student's IANA time zone (used to date `recentSessions`). */
  timeZone: string;
  availability: WeeklyAvailability;
  subjects: readonly PlanSubject[];
  recentSessions?: readonly RecentSession[];
  horizonDays?: number;
  seed: Seed;
  config?: Partial<PlannerConfig>;
}

export interface PlanItem {
  date: LocalDate;
  /** 0-based position within the day. */
  order: number;
  subjectId: string;
  topicId?: string;
  lessonId?: string;
  activityType: PlanActivityType;
  targetMinutes: number;
  targetQuestions?: number;
  reason: PlanReason;
}

export interface StudyPlan {
  items: PlanItem[];
  mode: "EXAM_PREP" | "MAINTENANCE";
  /** Whole days from today to the exam (§17 semantics); null without an exam date. */
  daysUntilExam: number | null;
  startDate: LocalDate;
  /** Last day covered by the plan (inclusive). */
  endDate: LocalDate;
  totalMinutes: number;
  minutesBySubject: Record<string, number>;
}

export type PlanItemStatus = "PENDING" | "COMPLETED" | "SKIPPED";

export interface ExistingPlanItem extends PlanItem {
  id: string;
  status: PlanItemStatus;
}

export interface AdaptedPlan {
  /** Completed items and everything dated before today: leave untouched. */
  keep: ExistingPlanItem[];
  /** Pending/skipped items from today on: delete or archive. */
  discard: ExistingPlanItem[];
  /** New items to insert. */
  add: PlanItem[];
  /** The regenerated plan (`items === add`). */
  plan: StudyPlan;
}

// ---------------------------------------------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------------------------------------------

/** Availability key for a local date. */
export function weekdayKey(date: LocalDate): WeekdayKey {
  return WEEKDAY_KEYS[isoWeekday(date) - 1] as WeekdayKey;
}

function minutesFromAvailability(availability: WeeklyAvailability, key: WeekdayKey): number {
  const value = (availability as Partial<Record<WeekdayKey, number>>)[key] ?? 0;
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`Availability for ${key} must be a non-negative number, received ${String(value)}`);
  return Math.min(1440, Math.floor(value));
}

/**
 * The dashboard's "Today's target" (§6): the student's available minutes for `date`'s weekday. Prefer
 * {@link plannedMinutesOn} when a plan exists for the day (it can be lower after completed work or rest days).
 */
export function dailyTarget(availability: WeeklyAvailability, date: LocalDate): number {
  return minutesFromAvailability(availability, weekdayKey(date));
}

/** Total planned minutes on `date`. */
export function plannedMinutesOn(items: readonly Pick<PlanItem, "date" | "targetMinutes">[], date: LocalDate): number {
  return items.reduce((sum, item) => (item.date === date ? sum + item.targetMinutes : sum), 0);
}

function resolveConfig(overrides?: Partial<PlannerConfig>): PlannerConfig {
  const cfg = overrides ? { ...DEFAULT_PLANNER_CONFIG, ...overrides } : DEFAULT_PLANNER_CONFIG;
  if (!(cfg.minItemMinutes >= 1)) throw new RangeError("minItemMinutes must be at least 1");
  if (!(cfg.preferredBlockMinutes >= cfg.minItemMinutes)) throw new RangeError("preferredBlockMinutes must be ≥ minItemMinutes");
  if (!(cfg.maxSubjectsPerDay >= 1) || !(cfg.maxConsecutiveDays >= 1)) throw new RangeError("maxSubjectsPerDay and maxConsecutiveDays must be ≥ 1");
  return cfg;
}

const compareIds = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
const isBefore = (a: LocalDate, b: LocalDate) => daysBetween(a, b) > 0;
const onOrBefore = (a: LocalDate, b: LocalDate) => daysBetween(a, b) >= 0;

function questionsFor(minutes: number, cfg: PlannerConfig, perQuestion = cfg.minutesPerQuestion): number {
  return Math.max(1, Math.round(minutes / perQuestion));
}

// ---------------------------------------------------------------------------------------------------------------
// Internal planning state
// ---------------------------------------------------------------------------------------------------------------

interface LessonTask {
  topicId: string;
  lessonId: string;
  minutesLeft: number;
  started: boolean;
  topicAssessed: boolean;
  lastOfTopic: boolean;
  practiceMinutes: number;
}

interface PracticeTask {
  topicId: string;
  minutes: number;
  availableFrom: LocalDate;
  reason: PlanReason;
}

interface TopicSlot {
  topicId: string;
  mastery: number;
  practiceMinutes: number;
  nextEligible: LocalDate;
}

interface SubjectState {
  subjectId: string;
  order: number;
  need: number;
  share: number;
  allocated: number;
  hasFlashcards: boolean;
  lessons: LessonTask[];
  practices: PracticeTask[];
  weak: TopicSlot[];
  maintenance: TopicSlot[];
  reviews: { topicId: string; due: LocalDate }[];
  fallbackTopics: { topicId: string; mastery: number; practiceMinutes: number }[];
  needsDiagnostic: boolean;
  diagnosticDate: LocalDate | null;
  studied: Set<LocalDate>;
  lastMock: LocalDate | null;
}

interface Reservations {
  minutesByDate: Map<LocalDate, number>;
  subjectsByDate: Map<LocalDate, Set<string>>;
  nextOrderByDate: Map<LocalDate, number>;
  completedLessonIds: Set<string>;
  /** Completed activities on or after today that matter for cadence and spacing. */
  completed: { date: LocalDate; subjectId: string; topicId?: string; activityType: PlanActivityType }[];
}

function emptyReservations(): Reservations {
  return { minutesByDate: new Map(), subjectsByDate: new Map(), nextOrderByDate: new Map(), completedLessonIds: new Set(), completed: [] };
}

type Draft = Omit<PlanItem, "order" | "date">;

interface Activity {
  date: LocalDate;
  subjectId: string;
  topicId?: string | null;
  activityType: PlanActivityType;
  minutes: number;
}

// ---------------------------------------------------------------------------------------------------------------
// Subject preparation
// ---------------------------------------------------------------------------------------------------------------

function topicNeed(topic: PlanTopic, target: number, hasLessons: boolean): number {
  if (topic.mastery === null) return 1;
  const mastery = Math.min(100, Math.max(0, topic.mastery));
  let need = Math.min(1, Math.max(0, (target - mastery) / target));
  if (roundHalfUp(mastery) < MASTERY_BAND_MIN_SCORE.COMPETENT) need += 0.25;
  if (hasLessons) need += 0.25;
  return need;
}

function prepareSubject(
  subject: PlanSubject,
  order: number,
  today: LocalDate,
  history: readonly Activity[],
  reserved: Reservations,
  cfg: PlannerConfig,
): SubjectState {
  const target = Math.min(100, Math.max(1, subject.targetScore ?? cfg.defaultTargetScore));
  const priority = subject.priorityWeight !== undefined && Number.isFinite(subject.priorityWeight) ? Math.max(0, subject.priorityWeight) : 1;
  const mine = history.filter((a) => a.subjectId === subject.subjectId);
  const lastPractice = new Map<string, LocalDate>();
  for (const a of mine) {
    if (!a.topicId || (a.activityType !== "PRACTICE" && a.activityType !== "REVIEW")) continue;
    const prev = lastPractice.get(a.topicId);
    if (!prev || isBefore(prev, a.date)) lastPractice.set(a.topicId, a.date);
  }

  const inProgress: LessonTask[][] = [];
  const fresh: LessonTask[][] = [];
  const practices: PracticeTask[] = [];
  const weak: TopicSlot[] = [];
  const maintenance: TopicSlot[] = [];
  const reviews: { topicId: string; due: LocalDate }[] = [];
  const fallbackTopics: SubjectState["fallbackTopics"] = [];
  let need = 0;

  for (const topic of subject.topics) {
    if (topic.mastery !== null && !Number.isFinite(topic.mastery)) throw new RangeError(`Topic ${topic.topicId} has a non-finite mastery`);
    const practiceMinutes = topic.estimatedPracticeMinutes > 0 ? Math.round(topic.estimatedPracticeMinutes) : cfg.defaultPracticeMinutes;
    const lessons = topic.lessonsRemaining.filter((l) => !reserved.completedLessonIds.has(l.lessonId));
    need += Math.max(0.1, topicNeed(topic, target, lessons.length > 0));

    const assessed = topic.mastery !== null;
    if (lessons.length > 0) {
      const tasks = lessons.map((lesson, i) => ({
        topicId: topic.topicId,
        lessonId: lesson.lessonId,
        minutesLeft: Math.max(5, Math.round(Number.isFinite(lesson.minutes) ? lesson.minutes : cfg.defaultPracticeMinutes)),
        started: false,
        topicAssessed: assessed,
        lastOfTopic: i === lessons.length - 1,
        practiceMinutes,
      }));
      (assessed ? inProgress : fresh).push(tasks);
    } else if (!assessed) {
      practices.push({ topicId: topic.topicId, minutes: practiceMinutes, availableFrom: today, reason: "UNASSESSED_TOPIC_PRACTICE" });
    }

    if (!assessed) continue;
    const mastery = Math.min(100, Math.max(0, topic.mastery as number));
    fallbackTopics.push({ topicId: topic.topicId, mastery, practiceMinutes });
    const last = lastPractice.get(topic.topicId);
    if (roundHalfUp(mastery) < MASTERY_BAND_MIN_SCORE.COMPETENT) {
      weak.push({ topicId: topic.topicId, mastery, practiceMinutes, nextEligible: last ? maxDate(today, addDays(last, cfg.weakRepracticeDays)) : today });
      if (last) {
        const due = addDays(last, cfg.reviewOffsetDays);
        if (onOrBefore(today, due)) reviews.push({ topicId: topic.topicId, due });
      }
    } else {
      maintenance.push({ topicId: topic.topicId, mastery, practiceMinutes, nextEligible: last ? maxDate(today, addDays(last, cfg.maintenanceIntervalDays)) : today });
    }
  }

  // In-progress topics (weakest first) before brand-new ones (syllabus order).
  inProgress.sort((a, b) => {
    const ma = subject.topics.find((t) => t.topicId === a[0]?.topicId)?.mastery ?? 0;
    const mb = subject.topics.find((t) => t.topicId === b[0]?.topicId)?.mastery ?? 0;
    return ma - mb;
  });
  weak.sort((a, b) => a.mastery - b.mastery || compareIds(a.topicId, b.topicId));
  maintenance.sort((a, b) => a.mastery - b.mastery || compareIds(a.topicId, b.topicId));
  fallbackTopics.sort((a, b) => a.mastery - b.mastery || compareIds(a.topicId, b.topicId));

  const hadDiagnostic = mine.some((a) => a.activityType === "DIAGNOSTIC");
  const lastMock = mine.filter((a) => a.activityType === "MOCK_EXAM").reduce<LocalDate | null>((acc, a) => (acc === null || isBefore(acc, a.date) ? a.date : acc), null);
  return {
    subjectId: subject.subjectId,
    order,
    need: need * priority,
    share: 0,
    allocated: 0,
    hasFlashcards: subject.hasFlashcards === true,
    lessons: [...inProgress.flat(), ...fresh.flat()],
    practices,
    weak,
    maintenance,
    reviews,
    fallbackTopics,
    needsDiagnostic: subject.topics.every((t) => t.mastery === null) && !hadDiagnostic,
    diagnosticDate: null,
    studied: new Set(mine.filter((a) => a.activityType !== "FLASHCARDS").map((a) => a.date)),
    lastMock,
  };
}

function maxDate(a: LocalDate, b: LocalDate): LocalDate {
  return isBefore(a, b) ? b : a;
}

// ---------------------------------------------------------------------------------------------------------------
// Block filling
// ---------------------------------------------------------------------------------------------------------------

interface DayContext {
  date: LocalDate;
  revision: boolean;
  /** Topics already given practice/review today (no topic twice a day, except lesson → practice). */
  practisedTopics: Set<string>;
}

/** Minutes for an elastic practice/review item: its wish, at least `minItemMinutes`, at most what is left (0 = no room). */
function takePractice(minutesWanted: number, remaining: number, cfg: PlannerConfig): number {
  return remaining >= cfg.minItemMinutes ? Math.min(Math.max(minutesWanted, cfg.minItemMinutes), remaining) : 0;
}

function nextTask(s: SubjectState, remaining: number, day: DayContext, weakTaken: number, cfg: PlannerConfig): Draft | null {
  const { date, practisedTopics } = day;
  const free = (topicId: string) => !practisedTopics.has(topicId);

  const review = (): Draft | null => {
    const index = s.reviews.findIndex((r) => onOrBefore(r.due, date) && free(r.topicId));
    const task = s.reviews[index];
    if (!task) return null;
    const minutes = takePractice(cfg.reviewMinutes, remaining, cfg);
    if (!minutes) return null;
    s.reviews.splice(index, 1);
    practisedTopics.add(task.topicId);
    return { subjectId: s.subjectId, topicId: task.topicId, activityType: "REVIEW", targetMinutes: minutes, targetQuestions: questionsFor(minutes, cfg, cfg.minutesPerQuestion * 2), reason: "SPACED_REVIEW" };
  };

  const weakPractice = (): Draft | null => {
    if (!day.revision && weakTaken >= 1) return null;
    const slot = s.weak.find((w) => onOrBefore(w.nextEligible, date) && free(w.topicId));
    if (!slot) return null;
    const minutes = takePractice(slot.practiceMinutes, remaining, cfg);
    if (!minutes) return null;
    slot.nextEligible = addDays(date, cfg.weakRepracticeDays);
    s.reviews.push({ topicId: slot.topicId, due: addDays(date, cfg.reviewOffsetDays) });
    practisedTopics.add(slot.topicId);
    return { subjectId: s.subjectId, topicId: slot.topicId, activityType: "PRACTICE", targetMinutes: minutes, targetQuestions: questionsFor(minutes, cfg), reason: "WEAK_TOPIC_PRACTICE" };
  };

  const followUpPractice = (): Draft | null => {
    const index = s.practices.findIndex((p) => onOrBefore(p.availableFrom, date) && free(p.topicId));
    const task = s.practices[index];
    if (!task) return null;
    const minutes = takePractice(task.minutes, remaining, cfg);
    if (!minutes) return null;
    s.practices.splice(index, 1);
    practisedTopics.add(task.topicId);
    // First practice of a new topic gets a spaced review too.
    s.reviews.push({ topicId: task.topicId, due: addDays(date, cfg.reviewOffsetDays) });
    return { subjectId: s.subjectId, topicId: task.topicId, activityType: "PRACTICE", targetMinutes: minutes, targetQuestions: questionsFor(minutes, cfg), reason: task.reason };
  };

  const lesson = (): Draft | null => {
    const task = s.lessons[0];
    if (!task) return null;
    // Fits: take it whole. Otherwise split, leaving a remainder of at least `minItemMinutes` for a later session,
    // and only when the chunk itself is worth a sitting (`lessonSplitMinMinutes`).
    const chunk = Math.min(remaining, task.minutesLeft - cfg.minItemMinutes);
    let minutes: number;
    if (task.minutesLeft <= remaining) minutes = task.minutesLeft;
    else if (chunk >= Math.max(cfg.minItemMinutes, cfg.lessonSplitMinMinutes)) minutes = chunk;
    else return null;
    const reason: PlanReason = task.started ? "CONTINUE_LESSON" : task.topicAssessed ? "NEXT_LESSON" : "NEW_TOPIC_LESSON";
    task.minutesLeft -= minutes;
    task.started = true;
    if (task.minutesLeft <= 0) {
      s.lessons.shift();
      if (task.lastOfTopic) {
        s.practices.unshift({ topicId: task.topicId, minutes: task.practiceMinutes, availableFrom: date, reason: "PRACTICE_AFTER_LESSON" });
      }
    }
    return { subjectId: s.subjectId, topicId: task.topicId, lessonId: task.lessonId, activityType: "LESSON", targetMinutes: minutes, reason };
  };

  const maintenancePractice = (): Draft | null => {
    const slot = s.maintenance.find((m) => onOrBefore(m.nextEligible, date) && free(m.topicId));
    if (!slot) return null;
    const minutes = takePractice(slot.practiceMinutes, remaining, cfg);
    if (!minutes) return null;
    slot.nextEligible = addDays(date, cfg.maintenanceIntervalDays);
    practisedTopics.add(slot.topicId);
    return {
      subjectId: s.subjectId,
      topicId: slot.topicId,
      activityType: "PRACTICE",
      targetMinutes: minutes,
      targetQuestions: questionsFor(minutes, cfg),
      reason: day.revision ? "REVISION_PRACTICE" : "MAINTENANCE_PRACTICE",
    };
  };

  const extraPractice = (): Draft | null => {
    const topic = s.fallbackTopics.find((t) => free(t.topicId));
    if (!topic) return null;
    const minutes = takePractice(topic.practiceMinutes, remaining, cfg);
    if (!minutes) return null;
    practisedTopics.add(topic.topicId);
    return { subjectId: s.subjectId, topicId: topic.topicId, activityType: "PRACTICE", targetMinutes: minutes, targetQuestions: questionsFor(minutes, cfg), reason: "EXTRA_PRACTICE" };
  };

  const order = day.revision
    ? [review, weakPractice, maintenancePractice, followUpPractice, lesson, extraPractice]
    : [review, weakPractice, followUpPractice, lesson, maintenancePractice, extraPractice];
  for (const pick of order) {
    const draft = pick();
    if (draft) return draft;
  }
  return null;
}

function fillBlock(s: SubjectState, minutes: number, day: DayContext, cfg: PlannerConfig): Draft[] {
  const drafts: Draft[] = [];
  let remaining = minutes;
  let weakTaken = 0;
  for (let guard = 0; guard < 64 && remaining >= cfg.minItemMinutes; guard++) {
    const draft = nextTask(s, remaining, day, weakTaken, cfg);
    if (!draft) break;
    if (draft.reason === "WEAK_TOPIC_PRACTICE") weakTaken += 1;
    drafts.push(draft);
    remaining -= draft.targetMinutes;
  }
  // The block is this subject's fair share: when no further task fits, lengthen its last practice/review rather
  // than handing the minutes to a subject that is meant to rest today.
  const elastic = [...drafts].reverse().find(isElastic);
  if (elastic && remaining > 0) extendDraft(elastic, remaining, cfg);
  return drafts;
}

function isElastic(draft: Draft): boolean {
  return draft.activityType === "PRACTICE" || draft.activityType === "REVIEW";
}

function extendDraft(draft: Draft, minutes: number, cfg: PlannerConfig): void {
  draft.targetMinutes += minutes;
  if (draft.targetQuestions !== undefined) {
    draft.targetQuestions = questionsFor(draft.targetMinutes, cfg, draft.activityType === "REVIEW" ? cfg.minutesPerQuestion * 2 : cfg.minutesPerQuestion);
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Plan construction
// ---------------------------------------------------------------------------------------------------------------

function mockIntervalFor(daysToExam: number, cfg: PlannerConfig): number | null {
  const rule = [...cfg.mockCadence].sort((a, b) => a.withinDays - b.withinDays).find((r) => daysToExam <= r.withinDays);
  return rule ? rule.everyDays : null;
}

function splitMinutes(total: number, parts: number): number[] {
  // Five-minute granularity; earlier (higher-deficit) subjects get the extra chunks and the last odd minutes.
  const base = Math.floor(total / parts / 5) * 5;
  const out = Array.from({ length: parts }, () => base);
  let left = total - base * parts;
  for (let i = 0; left >= 5; i = (i + 1) % parts) {
    out[i] = (out[i] as number) + 5;
    left -= 5;
  }
  out[0] = (out[0] as number) + left;
  return out;
}

function buildPlan(input: PlanInput, reserved: Reservations): StudyPlan {
  const cfg = resolveConfig(input.config);
  const today = input.today;
  parseLocalDate(today);
  if (!isValidTimeZone(input.timeZone)) throw new RangeError(`Unknown time zone ${input.timeZone}`);
  for (const key of WEEKDAY_KEYS) minutesFromAvailability(input.availability, key);
  const horizon = Math.min(cfg.maxHorizonDays, Math.max(1, Math.floor(Number.isFinite(input.horizonDays) ? (input.horizonDays as number) : 14)));
  const examDate = input.examDate ?? null;
  const daysUntilExam = examDate === null ? null : daysBetween(today, examDate);
  const mode: StudyPlan["mode"] = daysUntilExam !== null && daysUntilExam >= 1 ? "EXAM_PREP" : "MAINTENANCE";
  const dates = eachLocalDate(today, mode === "EXAM_PREP" ? Math.min(horizon, daysUntilExam as number) : horizon);
  const endDate = dates[dates.length - 1] ?? today;

  // Subjects without topics have nothing to plan; duplicate subject ids keep their first occurrence.
  const bySubjectId = new Map<string, PlanSubject>();
  for (const s of input.subjects) if (s.topics.length > 0 && !bySubjectId.has(s.subjectId)) bySubjectId.set(s.subjectId, s);
  const subjectsIn = [...bySubjectId.values()];
  const empty: StudyPlan = { items: [], mode, daysUntilExam, startDate: today, endDate, totalMinutes: 0, minutesBySubject: {} };
  if (subjectsIn.length === 0) return empty;

  const random = createRng(input.seed);
  const windowStart = addDays(today, -cfg.recentWindowDays);
  const history: Activity[] = [
    ...(input.recentSessions ?? []).map((r) => ({
      date: localDateString(r.startedAt, input.timeZone),
      subjectId: r.subjectId,
      topicId: r.topicId ?? null,
      activityType: r.activityType,
      minutes: Number.isFinite(r.minutes) ? Math.max(0, r.minutes) : 0,
    })),
    ...reserved.completed.map((c) => ({ ...c, minutes: 0 })),
  ];
  const seededOrder = shuffled(subjectsIn.map((s) => s.subjectId).sort(compareIds), random);
  const subjects = subjectsIn
    .map((s) => prepareSubject(s, seededOrder.indexOf(s.subjectId), today, history, reserved, cfg))
    .sort((a, b) => a.order - b.order);
  const totalNeed = subjects.reduce((sum, s) => sum + s.need, 0);
  for (const s of subjects) {
    s.share = totalNeed > 0 ? s.need / totalNeed : 1 / subjects.length;
    // Fair share starts from what was studied recently (diagnostics and study only; mocks follow their cadence).
    s.allocated = history
      .filter((a) => a.subjectId === s.subjectId && isBefore(windowStart, a.date) && isBefore(a.date, today) && a.activityType !== "MOCK_EXAM" && a.activityType !== "FLASHCARDS")
      .reduce((sum, a) => sum + a.minutes, 0);
  }
  for (const [date, ids] of reserved.subjectsByDate) for (const s of subjects) if (ids.has(s.subjectId)) s.studied.add(date);

  const budget = new Map<LocalDate, number>(
    dates.map((d) => [d, Math.max(0, dailyTarget(input.availability, d) - (reserved.minutesByDate.get(d) ?? 0))]),
  );

  // --- Mock exams (EXAM_PREP only) ---
  const mockDays = new Set<LocalDate>();
  if (mode === "EXAM_PREP" && examDate !== null) {
    let last = subjects.reduce<LocalDate | null>((acc, s) => (s.lastMock && (acc === null || isBefore(acc, s.lastMock)) ? s.lastMock : acc), null);
    let i = 0;
    while (i < dates.length) {
      const date = dates[i] as LocalDate;
      const interval = mockIntervalFor(daysBetween(date, examDate), cfg);
      if (interval === null || (last !== null && daysBetween(last, date) < interval)) {
        i += 1;
        continue;
      }
      const windowEnd = Math.min(dates.length - 1, i + Math.min(interval, 7) - 1);
      let best = -1;
      for (let j = i; j <= windowEnd; j++) {
        const minutes = budget.get(dates[j] as LocalDate) ?? 0;
        if (minutes >= cfg.minMockExamMinutes && (best === -1 || minutes > (budget.get(dates[best] as LocalDate) ?? 0))) best = j;
      }
      if (best === -1) {
        i = windowEnd + 1;
        continue;
      }
      mockDays.add(dates[best] as LocalDate);
      last = dates[best] as LocalDate;
      i = best + 1;
    }
  }

  // --- Diagnostics ---
  const diagnosticDays = new Map<LocalDate, SubjectState>();
  for (const s of [...subjects].filter((x) => x.needsDiagnostic).sort((a, b) => b.need - a.need || a.order - b.order)) {
    const date = dates.find((d) => !mockDays.has(d) && !diagnosticDays.has(d) && (budget.get(d) ?? 0) >= cfg.diagnosticMinutes);
    if (date) {
      s.diagnosticDate = date;
      diagnosticDays.set(date, s);
    }
  }

  const flashcardSubjects = subjects.filter((s) => s.hasFlashcards);
  let flashcardTurn = 0;
  const items: PlanItem[] = [];

  const studiedRecently = (s: SubjectState, date: LocalDate) => {
    for (let k = 1; k <= cfg.maxConsecutiveDays; k++) if (!s.studied.has(addDays(date, -k))) return false;
    return true;
  };

  // Mock subject rotation: never-mocked subjects first, then the oldest mock; ties by need, then seeded order.
  const mockAge = (s: SubjectState) => (s.lastMock === null ? -1e9 : daysBetween(today, s.lastMock));

  for (const date of dates) {
    const dayBudget = budget.get(date) ?? 0;
    let remaining = dayBudget;
    const head: Draft[] = []; // short warm-up (flashcards)
    const main: Draft[] = [];
    const usedToday = new Set<string>(reserved.subjectsByDate.get(date) ?? []);
    const revision = mode === "EXAM_PREP" && examDate !== null && daysBetween(date, examDate) <= cfg.revisionPhaseDays;
    const day: DayContext = { date, revision, practisedTopics: new Set() };
    for (const c of reserved.completed) if (c.date === date && c.topicId) day.practisedTopics.add(c.topicId);

    /** Adds the flashcard slot when the day is long enough and `reserve` minutes would still be left afterwards. */
    const addFlashcards = (reserve: number): void => {
      const subject = flashcardSubjects[flashcardTurn % Math.max(1, flashcardSubjects.length)];
      if (!subject || dayBudget < cfg.flashcardMinDayBudget || remaining - cfg.flashcardMinutes < reserve) return;
      flashcardTurn += 1;
      head.push({ subjectId: subject.subjectId, activityType: "FLASHCARDS", targetMinutes: cfg.flashcardMinutes, reason: "FLASHCARD_REVIEW" });
      remaining -= cfg.flashcardMinutes;
    };

    if (mockDays.has(date)) {
      const subject = [...subjects].sort((a, b) => mockAge(a) - mockAge(b) || b.need - a.need || a.order - b.order)[0] as SubjectState;
      const minutes = Math.min(cfg.mockExamMinutes, remaining);
      main.push({ subjectId: subject.subjectId, activityType: "MOCK_EXAM", targetMinutes: minutes, reason: "MOCK_EXAM_CADENCE" });
      remaining -= minutes;
      subject.lastMock = date;
      subject.studied.add(date);
      addFlashcards(0); // a mock day holds only the mock and, if time remains, flashcards
    } else {
      const diagnostic = diagnosticDays.get(date);
      if (diagnostic && remaining >= cfg.diagnosticMinutes) {
        main.push({ subjectId: diagnostic.subjectId, activityType: "DIAGNOSTIC", targetMinutes: cfg.diagnosticMinutes, reason: "DIAGNOSTIC_BASELINE" });
        remaining -= cfg.diagnosticMinutes;
        diagnostic.allocated += cfg.diagnosticMinutes;
        diagnostic.studied.add(date);
        usedToday.add(diagnostic.subjectId);
      }
      addFlashcards(cfg.minItemMinutes); // only if a study item still fits afterwards

      // A subject waiting for its diagnostic gets no lessons or practice before (or on) that day.
      const eligible = (s: SubjectState) => !usedToday.has(s.subjectId) && !(s.diagnosticDate !== null && !isBefore(s.diagnosticDate, date));
      const planned = new Map<SubjectState, number>();
      const dayTotal = subjects.reduce((sum, s) => sum + s.allocated, 0) + remaining;
      const deficit = (s: SubjectState) => s.share * dayTotal - s.allocated - (planned.get(s) ?? 0);
      const chooseSubject = (): SubjectState | null => {
        const atLimit = usedToday.size + planned.size >= cfg.maxSubjectsPerDay;
        const ranked = subjects
          .filter((s) => eligible(s) && (!atLimit || planned.has(s)))
          .sort((a, b) => deficit(b) - deficit(a) || a.order - b.order);
        // Interleaving: a subject studied on each of the previous `maxConsecutiveDays` days rests today while another
        // subject that has not is behind its fair share ("while others need time").
        const resting = (s: SubjectState) =>
          studiedRecently(s, date) && ranked.some((o) => o !== s && !studiedRecently(o, date) && deficit(o) > 0);
        return ranked.find((s) => !resting(s)) ?? null;
      };
      const fill = (s: SubjectState, minutes: number): number => {
        const blockDrafts = fillBlock(s, minutes, day, cfg);
        const used = blockDrafts.reduce((sum, d) => sum + d.targetMinutes, 0);
        if (used > 0) {
          main.push(...blockDrafts);
          s.allocated += used;
          s.studied.add(date);
        }
        return used;
      };

      // Share the day in ~30-minute units, each to the subject furthest behind its fair share (a subject may take
      // several units; at most `maxSubjectsPerDay` subjects a day).
      const units =
        remaining >= cfg.minItemMinutes ? splitMinutes(remaining, Math.max(1, Math.floor(remaining / cfg.preferredBlockMinutes))) : [];
      for (const unit of units) {
        const s = chooseSubject();
        if (!s) break;
        planned.set(s, (planned.get(s) ?? 0) + unit);
      }
      let carry = 0;
      for (const [s, minutes] of planned) {
        usedToday.add(s.subjectId);
        const blockMinutes = minutes + carry;
        const used = fill(s, blockMinutes);
        carry = blockMinutes - used;
        remaining -= used;
      }
      planned.clear();
      // Planned subjects had no work left at all: offer the time to others, within the per-day subject limit.
      while (remaining >= cfg.minItemMinutes && usedToday.size < cfg.maxSubjectsPerDay) {
        const s = chooseSubject();
        if (!s) break;
        usedToday.add(s.subjectId);
        remaining -= fill(s, remaining);
      }
    }

    const drafts = [...head, ...main];
    // Leftover minutes too short for an item of their own go to the day's last practice/review.
    if (remaining > 0 && remaining < cfg.minItemMinutes) {
      const elastic = [...drafts].reverse().find(isElastic);
      if (elastic) {
        extendDraft(elastic, remaining, cfg);
        const owner = subjects.find((s) => s.subjectId === elastic.subjectId);
        if (owner) owner.allocated += remaining;
        remaining = 0;
      }
    }

    const firstOrder = reserved.nextOrderByDate.get(date) ?? 0;
    drafts.forEach((draft, i) => items.push({ ...draft, date, order: firstOrder + i }));
  }

  const minutesBySubject: Record<string, number> = {};
  for (const item of items) minutesBySubject[item.subjectId] = (minutesBySubject[item.subjectId] ?? 0) + item.targetMinutes;
  return {
    items,
    mode,
    daysUntilExam,
    startDate: today,
    endDate,
    totalMinutes: items.reduce((sum, i) => sum + i.targetMinutes, 0),
    minutesBySubject,
  };
}

/**
 * Generates a study plan from `input.today` (see the module header for the rules). Deterministic for the same
 * input and seed. Throws `RangeError` on an invalid date, time zone or availability.
 */
export function generatePlan(input: PlanInput): StudyPlan {
  return buildPlan(input, emptyReservations());
}

/**
 * Re-plans from `input.today`, keeping completed items and all items dated before today untouched (§16 "adapts
 * dynamically"). Completed items from today on consume their day's minutes, count for interleaving and mock
 * cadence, and their lessons are never planned again. Pending and skipped items from today on are discarded and
 * replaced by `add`.
 */
export function adaptPlan(existingItems: readonly ExistingPlanItem[], input: PlanInput): AdaptedPlan {
  parseLocalDate(input.today);
  const keep: ExistingPlanItem[] = [];
  const discard: ExistingPlanItem[] = [];
  const reserved = emptyReservations();
  for (const item of existingItems) {
    const future = !isBefore(item.date, input.today);
    if (item.status === "COMPLETED" && item.lessonId) reserved.completedLessonIds.add(item.lessonId);
    if (!future) {
      keep.push(item);
      continue;
    }
    if (item.status !== "COMPLETED") {
      discard.push(item);
      continue;
    }
    keep.push(item);
    reserved.minutesByDate.set(item.date, (reserved.minutesByDate.get(item.date) ?? 0) + item.targetMinutes);
    reserved.nextOrderByDate.set(item.date, Math.max(reserved.nextOrderByDate.get(item.date) ?? 0, item.order + 1));
    if (item.activityType !== "FLASHCARDS") {
      const set = reserved.subjectsByDate.get(item.date) ?? new Set<string>();
      set.add(item.subjectId);
      reserved.subjectsByDate.set(item.date, set);
    }
    reserved.completed.push({
      date: item.date,
      subjectId: item.subjectId,
      activityType: item.activityType,
      ...(item.topicId ? { topicId: item.topicId } : {}),
    });
  }
  const plan = buildPlan(input, reserved);
  return { keep, discard, add: plan.items, plan };
}
