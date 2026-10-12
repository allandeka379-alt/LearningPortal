import "server-only";
import { z } from "zod";
import type { AbilityLevel, OnboardingStep, Prisma, Role } from "@/generated/prisma/client";
import { UNLOCK_PATH } from "@/lib/billing/paywall";
import { DEFAULT_COUNTRY_CODE } from "@/lib/config";
import { daysUntil, localDateFromDateColumn, type LocalDate } from "@/lib/dates";
import { DAILY_GOAL_MAX_MINUTES, DAILY_GOAL_MIN_MINUTES } from "@/server/accounts/student-settings";
import { hasEntitlement, hasStudentAppAccess } from "@/server/billing/entitlements";
import { ENROLLABLE_SYLLABUS_STATUSES } from "@/server/curriculum/core";
import { listBoardsForCountry, listCountries, listQualificationsByLevel, listSubjectsForQualification } from "@/server/curriculum/catalogue";
import { getExamSessions } from "@/server/curriculum/exam-sessions";
import { getGradeScheme } from "@/server/curriculum/grades";
import { db } from "@/server/db";
import { enrolInSubjects, type EnrollmentView } from "@/server/enrollment";
import { AppError, isAppError } from "@/server/lib/errors";
import { getStudyDefaults } from "@/server/lib/settings";
import { enqueueReferralCheck } from "@/server/referrals/service";
import { findDirectorySchool, requestSchoolMembership, searchSchoolDirectory, SCHOOL_SEARCH_MIN_LENGTH, type DirectorySchool } from "@/server/schools/join-requests";
import {
  canVisit,
  DASHBOARD_PATH,
  DIAGNOSTIC_PATH,
  furthestStep,
  planStepSave,
  stepHref,
  stepIndex,
  type ClearableAnswer,
  type OnboardingData,
  type WizardStep,
} from "./steps";

/**
 * Onboarding wizard service (§5 onboarding, §52 steps 2-4; ARCHITECTURE §3.3). Reads what each screen offers from the
 * catalogue (countries → boards offered in the country → qualifications grouped by level → year groups → subjects
 * grouped by category → exam sessions → grade scheme), validates and saves one screen at a time, and completes the
 * wizard by enrolling the student in the chosen subjects through the enrollment service, which PINS each subject's
 * syllabus version (the one whose range contains the target exam date, §26).
 *
 * Every answer is stored server-side as soon as its screen is saved (Student track columns, `onboardingData` for the
 * subject list, LearnerStats for the daily goal), so a dropped connection loses nothing and `/onboarding` resumes at
 * the furthest screen reached. Position and invalidation rules live in ./steps (pure, unit tested).
 *
 * Nothing here is hard-coded content: every list comes from the database; only UI wording lives in components.
 */

/** The acting user. Structurally satisfied by the auth `Actor`. */
export interface OnboardingActor {
  userId: string;
  roles: readonly Role[];
  /** IANA time zone for "days until" wording (the auth Actor carries it); default Africa/Harare. */
  timeZone?: string;
}

export const ABILITY_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const satisfies readonly AbilityLevel[];

/** Daily goal choices offered besides the platform default (minutes). */
export const DAILY_GOAL_PRESETS = [15, 30, 45, 60, 90] as const;

/** Most subjects one onboarding may enrol (the enrollment service's limit). */
export const MAX_ONBOARDING_SUBJECTS = 20;

// =====================================================================================================================
// State
// =====================================================================================================================

export interface OnboardingAnswers {
  countryId: string | null;
  examBoardId: string | null;
  qualificationId: string | null;
  yearGroupId: string | null;
  subjectIds: string[];
  targetExamSessionId: string | null;
  abilityLevel: AbilityLevel | null;
  targetGrade: string | null;
  /** The student's own daily goal (null = platform default). */
  dailyGoalMinutes: number | null;
}

export interface OnboardingState {
  stored: OnboardingStep;
  /** Furthest screen reached ("done" once completed). */
  furthest: WizardStep | "done";
  completed: boolean;
  answers: OnboardingAnswers;
  data: OnboardingData;
}

const onboardingDataSchema = z.looseObject({
  subjectIds: z.array(z.uuid()).max(MAX_ONBOARDING_SUBJECTS).optional().catch(undefined),
  dailyGoalConfirmed: z.boolean().optional().catch(undefined),
  wantsDiagnostic: z.boolean().optional().catch(undefined),
  schoolId: z.uuid().optional().catch(undefined),
});

/** Reads Student.onboardingData; anything unreadable becomes an empty document (pure). */
export function readOnboardingData(raw: unknown): OnboardingData {
  const parsed = onboardingDataSchema.safeParse(raw ?? {});
  const value = parsed.success ? parsed.data : {};
  const out: OnboardingData = { ...value, version: 1 };
  for (const key of ["subjectIds", "dailyGoalConfirmed", "wantsDiagnostic", "schoolId"] as const) if (out[key] === undefined) delete out[key];
  return out;
}

const STUDENT_SELECT = {
  countryId: true,
  examBoardId: true,
  qualificationId: true,
  yearGroupId: true,
  targetExamSessionId: true,
  abilityLevel: true,
  targetGrade: true,
  onboardingStep: true,
  onboardingData: true,
  onboardingCompletedAt: true,
} as const satisfies Prisma.StudentSelect;

function assertStudentRole(actor: OnboardingActor): void {
  if (!actor.roles.includes("STUDENT")) throw AppError.forbidden("Onboarding is for student accounts.");
}

/** The student's wizard state (answers so far and the furthest screen reached). */
export async function getOnboardingState(actor: OnboardingActor): Promise<OnboardingState> {
  assertStudentRole(actor);
  const [student, stats] = await Promise.all([
    db.student.findUnique({ where: { userId: actor.userId }, select: STUDENT_SELECT }),
    db.learnerStats.findUnique({ where: { userId: actor.userId }, select: { dailyGoalMinutes: true } }),
  ]);
  if (!student) throw AppError.forbidden("Onboarding is for student accounts.");
  const data = readOnboardingData(student.onboardingData);
  const completed = student.onboardingCompletedAt !== null;
  return {
    stored: student.onboardingStep,
    furthest: completed ? "done" : furthestStep(student.onboardingStep, data),
    completed,
    data,
    answers: {
      countryId: student.countryId,
      examBoardId: student.examBoardId,
      qualificationId: student.qualificationId,
      yearGroupId: student.yearGroupId,
      subjectIds: data.subjectIds ?? [],
      targetExamSessionId: student.targetExamSessionId,
      abilityLevel: student.abilityLevel,
      targetGrade: student.targetGrade,
      dailyGoalMinutes: stats?.dailyGoalMinutes ?? null,
    },
  };
}

/** The first screen whose answer a later screen needs but is missing (defence against inconsistent rows). */
function missingPrerequisite(step: WizardStep, answers: OnboardingAnswers): WizardStep | null {
  const needs: [WizardStep, boolean][] = [
    ["country", answers.countryId !== null],
    ["board", answers.examBoardId !== null],
    ["level", answers.qualificationId !== null],
  ];
  for (const [required, present] of needs) {
    if (stepIndex(step) > stepIndex(required) && !present) return required;
  }
  if (stepIndex(step) > stepIndex("subjects") && answers.subjectIds.length === 0) return "subjects";
  return null;
}

// =====================================================================================================================
// Screen views
// =====================================================================================================================

/** One selectable card (country, board, qualification, year group). */
export interface ChoiceOption {
  id: string;
  label: string;
  description: string | null;
  /** False for catalogue rows listed as "coming soon" (shown, never selectable, §50). */
  available: boolean;
}

export interface SubjectChoice {
  id: string;
  name: string;
  /** Official syllabus / subject code, e.g. "4004". */
  code: string | null;
}

export interface SubjectCategoryChoice {
  categoryId: string;
  categoryName: string;
  subjects: SubjectChoice[];
}

export interface SessionChoice {
  id: string;
  name: string;
  startsOn: LocalDate;
  /** Dates not yet confirmed against the board's official timetable: always labelled "provisional". */
  isProvisional: boolean;
  /** Development seed data: labelled as a demo date. */
  isDemo: boolean;
  daysUntil: number;
}

export interface OnboardingSummary {
  country: string | null;
  board: string | null;
  qualification: string | null;
  yearGroup: string | null;
  subjects: string[];
  exam: { name: string; startsOn: LocalDate; isProvisional: boolean; isDemo: boolean } | null;
  abilityLevel: AbilityLevel | null;
  targetGrade: string | null;
  dailyGoalMinutes: number;
}

export type StepView =
  | { step: "country"; countries: ChoiceOption[]; selectedId: string | null }
  | { step: "board"; countryName: string; boards: ChoiceOption[]; selectedId: string | null }
  | {
      step: "level";
      boardName: string;
      groups: { levelId: string; levelName: string; options: ChoiceOption[] }[];
      selectedId: string | null;
    }
  | {
      step: "year";
      qualificationName: string;
      primary: ChoiceOption[];
      others: ChoiceOption[];
      selectedId: string | null;
      /** Optional school picker; null when the student already belongs to (or was invited by) a school. */
      school: SchoolPickerView | null;
    }
  | {
      step: "subjects";
      qualificationName: string;
      groups: SubjectCategoryChoice[];
      /** Listed honestly but not selectable (coming soon, or no published syllabus yet). */
      comingSoon: SubjectChoice[];
      selectedIds: string[];
      maxSubjects: number;
    }
  | {
      step: "exam";
      qualificationName: string;
      sessions: SessionChoice[];
      selectedId: string | null;
      /** The screen was saved before (so "not sure yet" is the saved answer when `selectedId` is null). */
      answered: boolean;
    }
  | { step: "ability"; selected: AbilityLevel | null }
  | { step: "grade"; qualificationName: string; grades: string[]; selected: string | null; answered: boolean }
  | { step: "goal"; options: number[]; defaultMinutes: number; selected: number | null; min: number; max: number }
  | {
      step: "finish";
      summary: OnboardingSummary;
      diagnosticIncluded: boolean;
      /** The student already has full access (a school seat, a grant, a parent's purchase); otherwise finishing opens /app/unlock. */
      fullAccess: boolean;
    };

/** The `year` screen's optional "your school" picker (§5, §23 join requests). */
export interface SchoolPickerView {
  /** The school picked earlier (kept until changed), or null. */
  selected: DirectorySchool | null;
  /** The search typed (`?school=` on the screen), "" when none. */
  query: string;
  /** Matches for {@link query} (empty when the query is too short). */
  results: DirectorySchool[];
  /** Shortest search the directory answers. */
  minQueryLength: number;
}

export interface LoadStepOptions {
  /** School directory search for the `year` screen (`?school=`). */
  schoolQuery?: string | null;
}

export type StepLoad = { kind: "STEP"; state: OnboardingState; view: StepView } | { kind: "REDIRECT"; href: string };

/** Whether a screen was already saved (its answer, possibly "none", is the student's). */
function answered(step: WizardStep, state: OnboardingState): boolean {
  return state.furthest !== "done" && stepIndex(state.furthest) > stepIndex(step);
}

/** Daily goal options: the presets plus the platform default, within the allowed range, ascending (pure). */
export function dailyGoalOptions(defaultMinutes: number): number[] {
  const values = new Set<number>([...DAILY_GOAL_PRESETS, defaultMinutes]);
  return [...values].filter((v) => Number.isInteger(v) && v >= DAILY_GOAL_MIN_MINUTES && v <= DAILY_GOAL_MAX_MINUTES).sort((a, b) => a - b);
}

/** Subject ids (of `ids`) that have a syllabus version a new enrolment may pin. One query. */
async function subjectsWithEnrollableSyllabus(ids: readonly string[]): Promise<Set<string>> {
  if (ids.length === 0) return new Set();
  const rows = await db.syllabus.groupBy({
    by: ["subjectId"],
    where: { subjectId: { in: [...ids] }, status: { in: [...ENROLLABLE_SYLLABUS_STATUSES] } },
  });
  return new Set(rows.map((r) => r.subjectId));
}

interface SubjectCatalogue {
  groups: SubjectCategoryChoice[];
  comingSoon: SubjectChoice[];
  selectable: Map<string, string>;
}

async function subjectCatalogue(qualificationId: string): Promise<SubjectCatalogue> {
  const categories = await listSubjectsForQualification(qualificationId);
  const enrollableIds = categories.flatMap((c) => c.subjects.filter((s) => s.isEnrollable).map((s) => s.id));
  const ready = await subjectsWithEnrollableSyllabus(enrollableIds);
  const groups: SubjectCategoryChoice[] = [];
  const comingSoon: SubjectChoice[] = [];
  const selectable = new Map<string, string>();
  for (const category of categories) {
    const subjects: SubjectChoice[] = [];
    for (const subject of category.subjects) {
      const choice = { id: subject.id, name: subject.name, code: subject.officialCode };
      if (subject.isEnrollable && ready.has(subject.id)) {
        subjects.push(choice);
        selectable.set(subject.id, subject.name);
      } else {
        comingSoon.push(choice);
      }
    }
    if (subjects.length > 0) groups.push({ categoryId: category.category.id, categoryName: category.category.name, subjects });
  }
  return { groups, comingSoon, selectable };
}

async function qualificationOf(qualificationId: string) {
  return db.qualification.findUnique({ where: { id: qualificationId }, select: { id: true, name: true, levelId: true } });
}

async function buildSummary(actor: OnboardingActor, state: OnboardingState): Promise<OnboardingSummary> {
  const { answers } = state;
  const [student, subjects, defaults] = await Promise.all([
    db.student.findUnique({
      where: { userId: actor.userId },
      select: {
        country: { select: { name: true } },
        examBoard: { select: { shortName: true } },
        qualification: { select: { name: true } },
        yearGroup: { select: { name: true } },
        targetExamSession: { select: { name: true, startsOn: true, isProvisional: true, isDemo: true } },
      },
    }),
    answers.subjectIds.length
      ? db.subject.findMany({ where: { id: { in: answers.subjectIds } }, select: { id: true, name: true } })
      : Promise.resolve([]),
    getStudyDefaults(),
  ]);
  const order = new Map(answers.subjectIds.map((id, index) => [id, index]));
  const session = student?.targetExamSession ?? null;
  return {
    country: student?.country?.name ?? null,
    board: student?.examBoard?.shortName ?? null,
    qualification: student?.qualification?.name ?? null,
    yearGroup: student?.yearGroup?.name ?? null,
    subjects: [...subjects].sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0)).map((s) => s.name),
    exam: session
      ? { name: session.name, startsOn: localDateFromDateColumn(session.startsOn), isProvisional: session.isProvisional, isDemo: session.isDemo }
      : null,
    abilityLevel: answers.abilityLevel,
    targetGrade: answers.targetGrade,
    dailyGoalMinutes: answers.dailyGoalMinutes ?? defaults.dailyGoalMinutes,
  };
}

/**
 * Everything one screen shows, or where to go instead: the dashboard once onboarding is complete, the furthest screen
 * reached when `step` is ahead of it, or the screen whose answer is missing.
 *
 * @throws AppError FORBIDDEN (not a student)
 */
export async function loadOnboardingStep(actor: OnboardingActor, step: WizardStep, now: Date = new Date(), options: LoadStepOptions = {}): Promise<StepLoad> {
  const state = await getOnboardingState(actor);
  if (state.completed) return { kind: "REDIRECT", href: DASHBOARD_PATH };
  if (!canVisit(step, state.furthest)) return { kind: "REDIRECT", href: stepHref(state.furthest as WizardStep) };
  const missing = missingPrerequisite(step, state.answers);
  if (missing) return { kind: "REDIRECT", href: stepHref(missing) };
  const view = await buildView(actor, step, state, now, options);
  // A referenced catalogue row is gone (cannot happen with the Restrict FKs, but never render half a screen).
  if (view === null) return { kind: "REDIRECT", href: stepHref("country") };
  return { kind: "STEP", state, view };
}

/** The school picker of the `year` screen, or null for students who already have a school (pure data load). */
async function schoolPicker(actor: OnboardingActor, countryId: string, data: OnboardingData, rawQuery: string | null | undefined): Promise<SchoolPickerView | null> {
  const [student, memberships] = await Promise.all([
    db.student.findUnique({ where: { userId: actor.userId }, select: { schoolId: true } }),
    db.schoolMember.count({ where: { userId: actor.userId, role: "STUDENT", status: { in: ["ACTIVE", "INVITED"] } } }),
  ]);
  if (student?.schoolId || memberships > 0) return null;
  const query = (rawQuery ?? "").trim().slice(0, 100);
  const [selected, results] = await Promise.all([
    data.schoolId ? findDirectorySchool(countryId, data.schoolId) : Promise.resolve(null),
    query.length >= SCHOOL_SEARCH_MIN_LENGTH ? searchSchoolDirectory({ countryId, query }) : Promise.resolve([]),
  ]);
  return { selected, query, results: results.filter((school) => school.id !== selected?.id), minQueryLength: SCHOOL_SEARCH_MIN_LENGTH };
}

async function buildView(actor: OnboardingActor, step: WizardStep, state: OnboardingState, now: Date, options: LoadStepOptions = {}): Promise<StepView | null> {
  const { answers } = state;
  switch (step) {
    case "country": {
      const countries = await listCountries();
      const available = countries.filter((c) => c.catalogueStatus === "AVAILABLE");
      // §5 "Country (Zimbabwe)": the platform's home country is pre-selected (or the only one offered).
      const suggested = available.find((c) => c.isoCode === DEFAULT_COUNTRY_CODE) ?? (available.length === 1 ? available[0] : undefined);
      return {
        step,
        countries: countries.map((c) => ({ id: c.id, label: c.name, description: null, available: c.catalogueStatus === "AVAILABLE" })),
        selectedId: answers.countryId ?? suggested?.id ?? null,
      };
    }
    case "board": {
      const countryId = answers.countryId as string;
      const [country, boards] = await Promise.all([
        db.country.findUnique({ where: { id: countryId }, select: { name: true } }),
        listBoardsForCountry(countryId),
      ]);
      if (!country) return null;
      return {
        step,
        countryName: country.name,
        boards: boards.map((b) => ({
          id: b.id,
          label: b.shortName,
          description: b.name === b.shortName ? b.description : b.name,
          available: b.catalogueStatus === "AVAILABLE",
        })),
        selectedId: answers.examBoardId,
      };
    }
    case "level": {
      const boardId = answers.examBoardId as string;
      const [board, groups] = await Promise.all([
        db.examBoard.findUnique({ where: { id: boardId }, select: { shortName: true } }),
        listQualificationsByLevel({ countryId: answers.countryId, examBoardIds: [boardId] }),
      ]);
      if (!board) return null;
      return {
        step,
        boardName: board.shortName,
        groups: groups.map((g) => ({
          levelId: g.level.id,
          levelName: g.level.name,
          options: g.qualifications.map((q) => ({ id: q.id, label: q.name, description: q.description, available: q.isEnrollable })),
        })),
        selectedId: answers.qualificationId,
      };
    }
    case "year": {
      const qualification = await qualificationOf(answers.qualificationId as string);
      if (!qualification) return null;
      const yearGroups = await db.yearGroup.findMany({
        where: { countryId: answers.countryId as string, isActive: true },
        select: { id: true, name: true, typicalLevelId: true },
        orderBy: [{ ordinal: "asc" }, { name: "asc" }],
      });
      const toOption = (y: { id: string; name: string }): ChoiceOption => ({ id: y.id, label: y.name, description: null, available: true });
      const primary = yearGroups.filter((y) => y.typicalLevelId === qualification.levelId);
      // No year group is tagged with this level: offer the country's whole list instead of an empty screen.
      const main = primary.length > 0 ? primary : yearGroups;
      return {
        step,
        qualificationName: qualification.name,
        primary: main.map(toOption),
        others: primary.length > 0 ? yearGroups.filter((y) => y.typicalLevelId !== qualification.levelId).map(toOption) : [],
        selectedId: answers.yearGroupId,
        school: await schoolPicker(actor, answers.countryId as string, state.data, options.schoolQuery),
      };
    }
    case "subjects": {
      const qualification = await qualificationOf(answers.qualificationId as string);
      if (!qualification) return null;
      const catalogue = await subjectCatalogue(qualification.id);
      return {
        step,
        qualificationName: qualification.name,
        groups: catalogue.groups,
        comingSoon: catalogue.comingSoon,
        selectedIds: answers.subjectIds.filter((id) => catalogue.selectable.has(id)),
        maxSubjects: MAX_ONBOARDING_SUBJECTS,
      };
    }
    case "exam": {
      const qualification = await qualificationOf(answers.qualificationId as string);
      if (!qualification) return null;
      const sessions = await getExamSessions(qualification.id, now);
      return {
        step,
        qualificationName: qualification.name,
        sessions: sessions.map((s) => ({
          id: s.id,
          name: s.name,
          startsOn: s.startsOn,
          isProvisional: s.isProvisional,
          isDemo: s.isDemo,
          daysUntil: daysUntil(s.startsOn, now, actor.timeZone),
        })),
        selectedId: answers.targetExamSessionId,
        answered: answered("exam", state),
      };
    }
    case "ability":
      return { step, selected: answers.abilityLevel };
    case "grade": {
      const qualification = await qualificationOf(answers.qualificationId as string);
      if (!qualification) return null;
      const scheme = await getGradeScheme(qualification.id);
      return {
        step,
        qualificationName: qualification.name,
        grades: scheme?.bands.map((b) => b.grade) ?? [],
        selected: answers.targetGrade,
        answered: answered("grade", state),
      };
    }
    case "goal": {
      const defaults = await getStudyDefaults();
      return {
        step,
        options: dailyGoalOptions(defaults.dailyGoalMinutes),
        defaultMinutes: defaults.dailyGoalMinutes,
        selected: answers.dailyGoalMinutes,
        min: DAILY_GOAL_MIN_MINUTES,
        max: DAILY_GOAL_MAX_MINUTES,
      };
    }
    case "finish": {
      const [summary, diagnosticIncluded, fullAccess] = await Promise.all([
        buildSummary(actor, state),
        hasEntitlement(actor, "diagnostic_test"),
        hasStudentAppAccess(actor.userId),
      ]);
      return { step, summary, diagnosticIncluded: diagnosticIncluded && fullAccess, fullAccess };
    }
  }
}

// =====================================================================================================================
// Saving a screen
// =====================================================================================================================

const uuid = (message: string) => z.uuid({ error: message });

const stepSchemas = {
  country: z.object({ countryId: uuid("Choose your country.") }),
  board: z.object({ examBoardId: uuid("Choose your examination board.") }),
  level: z.object({ qualificationId: uuid("Choose your level.") }),
  // "" only when the country has no year groups configured (the screen then has nothing to choose).
  year: z.object({
    yearGroupId: z.union([z.literal(""), z.uuid()], { error: "Choose your year or form." }),
    // Optional school: a directory school id, "" = none / not listed, absent = keep the earlier choice.
    schoolId: z.union([z.literal(""), z.uuid()], { error: "Choose a school from the list." }).optional(),
  }),
  subjects: z.object({
    subjectIds: z
      .array(uuid("Choose subjects from the list."), { error: "Choose at least one subject." })
      .min(1, "Choose at least one subject.")
      .max(MAX_ONBOARDING_SUBJECTS, `Choose at most ${MAX_ONBOARDING_SUBJECTS} subjects.`),
  }),
  exam: z.object({
    targetExamSessionId: z.union([z.literal(""), z.uuid()], { error: "Choose an examination, or “I'm not sure yet”." }),
  }),
  ability: z.object({ abilityLevel: z.enum(ABILITY_LEVELS, { error: "Choose the option that describes you best." }) }),
  grade: z.object({ targetGrade: z.string({ error: "Choose a target grade, or “No target yet”." }).trim().max(8) }),
  goal: z.object({
    dailyGoalMinutes: z
      .int({ error: "Enter a whole number of minutes." })
      .min(DAILY_GOAL_MIN_MINUTES, `Set at least ${DAILY_GOAL_MIN_MINUTES} minutes.`)
      .max(DAILY_GOAL_MAX_MINUTES, `Set at most ${DAILY_GOAL_MAX_MINUTES} minutes.`),
  }),
} as const;

type SavableStep = keyof typeof stepSchemas;

/** Plain JSON for the onboardingData column (drops undefined keys). */
function toJson(data: OnboardingData): Prisma.InputJsonObject {
  return JSON.parse(JSON.stringify(data)) as Prisma.InputJsonObject;
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

/**
 * The daily goal from the form: the custom amount when one was typed (or "custom" was chosen), else the chosen
 * preset (pure). Returns NaN-free numbers or the raw value for the schema to reject.
 */
export function resolveDailyGoal(choice: string | null | undefined, custom: string | null | undefined): unknown {
  const typed = custom?.trim() ?? "";
  const raw = typed !== "" || choice === "custom" ? typed : (choice?.trim() ?? "");
  if (raw === "") return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : raw;
}

export interface SavedStep {
  next: WizardStep;
  href: string;
}

const CLEARED_COLUMNS: Readonly<Record<Exclude<ClearableAnswer, "subjectIds">, true>> = {
  examBoardId: true,
  qualificationId: true,
  yearGroupId: true,
  targetExamSessionId: true,
  targetGrade: true,
};

/**
 * Validates and saves one screen (`finish` is {@link completeOnboarding}), then returns the next screen. Answers that
 * no longer fit (e.g. subjects of another qualification after changing the level) are cleared in the same write.
 *
 * Input fields per screen: `countryId`, `examBoardId`, `qualificationId`, `yearGroupId`, `subjectIds` (array),
 * `targetExamSessionId` ("" = not sure yet), `abilityLevel`, `targetGrade` ("" = no target), `dailyGoalMinutes`.
 *
 * @throws AppError FORBIDDEN (not a student) | CONFLICT (already set up, or an earlier screen is unanswered) |
 *         VALIDATION (field errors keyed by the field names above)
 */
export async function saveOnboardingStep(
  actor: OnboardingActor,
  step: Exclude<WizardStep, "finish">,
  input: unknown,
  now: Date = new Date(),
): Promise<SavedStep> {
  const state = await getOnboardingState(actor);
  if (state.completed) throw AppError.conflict("Your account is already set up.");
  if (!canVisit(step, state.furthest) || missingPrerequisite(step, state.answers)) {
    throw AppError.conflict("Please answer the earlier questions first.");
  }
  const { answers } = state;
  const data: OnboardingData = { ...state.data };
  const studentData: Prisma.StudentUncheckedUpdateInput = {};
  let changed = false;
  let levelChanged = false;
  let dailyGoal: number | null = null;

  switch (step as SavableStep) {
    case "country": {
      const { countryId } = parse(stepSchemas.country, input);
      const country = (await listCountries()).find((c) => c.id === countryId);
      if (!country) throw AppError.validation({ countryId: ["Choose a country from the list."] });
      if (country.catalogueStatus !== "AVAILABLE") throw AppError.validation({ countryId: [`${country.name} is coming soon and can't be chosen yet.`] });
      changed = answers.countryId !== countryId;
      studentData.countryId = countryId;
      break;
    }
    case "board": {
      const { examBoardId } = parse(stepSchemas.board, input);
      const board = (await listBoardsForCountry(answers.countryId as string)).find((b) => b.id === examBoardId);
      if (!board) throw AppError.validation({ examBoardId: ["Choose a board offered in your country."] });
      if (board.catalogueStatus !== "AVAILABLE") throw AppError.validation({ examBoardId: [`${board.shortName} is coming soon and can't be chosen yet.`] });
      changed = answers.examBoardId !== examBoardId;
      studentData.examBoardId = examBoardId;
      break;
    }
    case "level": {
      const { qualificationId } = parse(stepSchemas.level, input);
      const groups = await listQualificationsByLevel({ countryId: answers.countryId, examBoardIds: [answers.examBoardId as string] });
      const group = groups.find((g) => g.qualifications.some((q) => q.id === qualificationId));
      const qualification = group?.qualifications.find((q) => q.id === qualificationId);
      if (!group || !qualification) throw AppError.validation({ qualificationId: ["Choose a level offered by your board."] });
      if (!qualification.isEnrollable) throw AppError.validation({ qualificationId: [`${qualification.name} is coming soon and can't be chosen yet.`] });
      changed = answers.qualificationId !== qualificationId;
      if (changed && answers.qualificationId) {
        const previous = await qualificationOf(answers.qualificationId);
        levelChanged = previous?.levelId !== group.level.id;
      }
      studentData.qualificationId = qualificationId;
      break;
    }
    case "year": {
      const { yearGroupId, schoolId } = parse(stepSchemas.year, input);
      const countryId = answers.countryId as string;
      if (yearGroupId === "") {
        // Allowed only when there is nothing to choose (Student.yearGroupId is optional).
        if ((await db.yearGroup.count({ where: { countryId, isActive: true } })) > 0) {
          throw AppError.validation({ yearGroupId: ["Choose your year or form."] });
        }
      } else {
        const yearGroup = await db.yearGroup.findFirst({ where: { id: yearGroupId, countryId, isActive: true }, select: { id: true } });
        if (!yearGroup) throw AppError.validation({ yearGroupId: ["Choose a year or form from the list."] });
      }
      const value = yearGroupId === "" ? null : yearGroupId;
      changed = answers.yearGroupId !== value;
      studentData.yearGroupId = value;
      if (schoolId === "") {
        delete data.schoolId;
      } else if (schoolId !== undefined) {
        if (!(await findDirectorySchool(countryId, schoolId))) throw AppError.validation({ schoolId: ["Choose a school from the list."] });
        data.schoolId = schoolId;
      }
      break;
    }
    case "subjects": {
      const parsed = parse(stepSchemas.subjects, input);
      const subjectIds = [...new Set(parsed.subjectIds)];
      const catalogue = await subjectCatalogue(answers.qualificationId as string);
      const unknown = subjectIds.filter((id) => !catalogue.selectable.has(id));
      if (unknown.length > 0) {
        const comingSoon = catalogue.comingSoon.filter((s) => unknown.includes(s.id)).map((s) => s.name);
        throw AppError.validation({
          subjectIds: [comingSoon.length > 0 ? `Not available yet: ${comingSoon.join(", ")}.` : "Choose subjects from the list."],
        });
      }
      changed = subjectIds.join() !== answers.subjectIds.join();
      data.subjectIds = subjectIds;
      break;
    }
    case "exam": {
      const { targetExamSessionId } = parse(stepSchemas.exam, input);
      if (targetExamSessionId !== "") {
        const sessions = await getExamSessions(answers.qualificationId as string, now);
        if (!sessions.some((s) => s.id === targetExamSessionId)) {
          throw AppError.validation({ targetExamSessionId: ["Choose an examination from the list."] });
        }
      }
      const value = targetExamSessionId === "" ? null : targetExamSessionId;
      changed = answers.targetExamSessionId !== value;
      studentData.targetExamSessionId = value;
      break;
    }
    case "ability": {
      const { abilityLevel } = parse(stepSchemas.ability, input);
      changed = answers.abilityLevel !== abilityLevel;
      studentData.abilityLevel = abilityLevel;
      break;
    }
    case "grade": {
      const { targetGrade } = parse(stepSchemas.grade, input);
      if (targetGrade !== "") {
        const scheme = await getGradeScheme(answers.qualificationId as string);
        if (!scheme || !scheme.bands.some((b) => b.grade === targetGrade)) {
          throw AppError.validation({ targetGrade: ["Choose a grade from the list."] });
        }
      }
      const value = targetGrade === "" ? null : targetGrade;
      changed = answers.targetGrade !== value;
      studentData.targetGrade = value;
      break;
    }
    case "goal": {
      const { dailyGoalMinutes } = parse(stepSchemas.goal, input);
      dailyGoal = dailyGoalMinutes;
      changed = answers.dailyGoalMinutes !== dailyGoalMinutes;
      data.dailyGoalConfirmed = true;
      break;
    }
  }

  // Schools belong to a country: a new country drops the school picked for the old one.
  if (step === "country" && changed) delete data.schoolId;
  const outcome = planStepSave(step, state.stored, { changed, levelChanged });
  for (const field of outcome.clear) {
    if (field === "subjectIds") delete data.subjectIds;
    else if (CLEARED_COLUMNS[field]) studentData[field] = null;
  }
  if (outcome.resetGoal) delete data.dailyGoalConfirmed;
  studentData.onboardingStep = outcome.stored;
  studentData.onboardingData = toJson(data);

  await db.$transaction(async (tx) => {
    await tx.student.update({ where: { userId: actor.userId }, data: studentData });
    if (step === "country" && typeof studentData.countryId === "string") {
      // Country of residence for pricing and phone defaults, when the profile has none yet (§53).
      await tx.profile.updateMany({ where: { userId: actor.userId, countryId: null }, data: { countryId: studentData.countryId } });
    }
    if (dailyGoal !== null) {
      await tx.learnerStats.upsert({
        where: { userId: actor.userId },
        create: { userId: actor.userId, dailyGoalMinutes: dailyGoal },
        update: { dailyGoalMinutes: dailyGoal },
      });
    }
  });
  return { next: outcome.next, href: stepHref(outcome.next) };
}

// =====================================================================================================================
// Completion
// =====================================================================================================================

export const FINISH_CHOICES = ["diagnostic", "dashboard"] as const;
export type FinishChoice = (typeof FINISH_CHOICES)[number];

const finishSchema = z.object({ choice: z.enum(FINISH_CHOICES, { error: "Choose what to do next." }) });

export interface CompletedOnboarding {
  /** `/app/diagnostic?from=onboarding` or `/app`. */
  href: string;
  /** The enrolments made (each pins a syllabus version). Empty when onboarding was already complete. */
  enrolments: EnrollmentView[];
}

/**
 * Completes the wizard (§52 step 4 → 5): enrols the student in the chosen subjects (the enrollment service pins each
 * subject's syllabus version for the target exam date and copies ability and target grade into each enrolment), marks
 * onboarding COMPLETED, records the answer to the diagnostic offer (skipping sets `diagnosticSkippedAt`) and, when a
 * directory school was picked, asks to join it (SchoolMember STUDENT / REQUESTED / source REQUEST, approved by the
 * school's admins on /school/students). Idempotent: a repeated submit after completion just returns the destination.
 *
 * @throws AppError FORBIDDEN | CONFLICT (earlier screens unanswered) | VALIDATION (choice, or a subject that can no
 *         longer be enrolled, e.g. withdrawn since it was chosen)
 */
export async function completeOnboarding(actor: OnboardingActor, input: unknown, now: Date = new Date()): Promise<CompletedOnboarding> {
  const { choice } = parse(finishSchema, input);
  // No free tier (owner decision 2026-10-12): a student without full access continues to the unlock page.
  const href = !(await hasStudentAppAccess(actor.userId))
    ? UNLOCK_PATH
    : choice === "diagnostic"
      ? `${DIAGNOSTIC_PATH}?from=onboarding`
      : DASHBOARD_PATH;
  const state = await getOnboardingState(actor);
  if (state.completed) return { href, enrolments: [] };
  const { answers } = state;
  if (state.furthest !== "finish" || missingPrerequisite("finish", answers)) {
    throw AppError.conflict("Please answer the earlier questions first.");
  }

  let enrolments: EnrollmentView[];
  try {
    enrolments = await enrolInSubjects(
      actor,
      {
        subjectIds: answers.subjectIds,
        ...(answers.targetExamSessionId ? { targetExamSessionId: answers.targetExamSessionId } : {}),
        ...(answers.targetGrade ? { targetGrade: answers.targetGrade } : {}),
        ...(answers.abilityLevel ? { abilityLevel: answers.abilityLevel } : {}),
      },
      now,
    );
  } catch (error) {
    if (isAppError(error) && error.code === "VALIDATION") {
      const messages = Object.values(error.fieldErrors ?? {}).flat();
      throw AppError.validation(
        { subjectIds: messages.length > 0 ? messages : ["One of your subjects can't be added right now."] },
        "Some of your choices can't be saved. Go back to Subjects and change them.",
      );
    }
    throw error;
  }

  const data: OnboardingData = { ...state.data, wantsDiagnostic: choice === "diagnostic" };
  await db.$transaction(async (tx) => {
    await tx.student.updateMany({
      where: { userId: actor.userId, onboardingCompletedAt: null },
      data: { onboardingStep: "COMPLETED", onboardingCompletedAt: now, onboardingData: toJson(data) },
    });
    if (choice === "dashboard") {
      await tx.student.updateMany({
        where: { userId: actor.userId, diagnosticCompletedAt: null, diagnosticSkippedAt: null },
        data: { diagnosticSkippedAt: now },
      });
    }
    if (state.data.schoolId && answers.countryId) {
      // A school picked earlier that has since left the directory is skipped (the student can ask again later).
      await requestSchoolMembership(tx, { userId: actor.userId, countryId: answers.countryId, schoolId: state.data.schoolId, now });
    }
    // Finishing onboarding is part of the referral activity rule (§46): re-check this student's referral, if any.
    await enqueueReferralCheck(actor.userId, { client: tx });
  });
  return { href, enrolments };
}
