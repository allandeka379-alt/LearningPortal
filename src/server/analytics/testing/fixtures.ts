/**
 * Inline fixture builders for the analytics integration tests. Test-only (imported from `*.test.ts` files only).
 *
 * The shared test database is never truncated and test files run in parallel, so every row gets unique values
 * (random slugs/codes/emails) and tests assert only on rows they created. Rows satisfy the init migration's CHECKs and
 * triggers (published syllabus before enrolment, timed mocks, consistent marking states, payment invariants...).
 * Kept here instead of `tests/factories/**`, which another workstream owns.
 */
import "server-only";
import { randomUUID } from "node:crypto";
import type { AiFeature, AttemptMode, AttemptStatus, Prisma, SubscriptionStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { dateColumnFromLocalDate, type LocalDate } from "@/lib/dates";
import { masteryBandFromScore } from "@/lib/mastery-band";

export function suffix(): string {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

/**
 * A random far-away calendar date (default years 2001–2018) so platform-wide daily metrics only see test rows written
 * for that day.
 */
export function isolatedDate(fromYear = 2001, toYear = 2018): LocalDate {
  const base = Date.UTC(fromYear, 0, 1);
  const span = Date.UTC(toYear + 1, 0, 1) - base;
  const ms = base + Math.floor(Math.random() * (span / 86_400_000)) * 86_400_000;
  return new Date(ms).toISOString().slice(0, 10);
}

/** Instant at `hh:mm` Africa/Harare (UTC+2, no DST) on local day `date`. */
export function harareTime(date: LocalDate, hh: number, mm = 0): Date {
  return new Date(Date.UTC(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, Number(date.slice(8, 10)), hh - 2, mm));
}

const TEST_COUNTRY_ISO = "XT";

/** A shared test-only country (user-assigned ISO code), created once and reused (isoCode space is tiny). */
export async function testCountryId(): Promise<string> {
  const existing = await db.country.findUnique({ where: { isoCode: TEST_COUNTRY_ISO }, select: { id: true } });
  if (existing) return existing.id;
  try {
    const created = await db.country.create({
      data: {
        isoCode: TEST_COUNTRY_ISO,
        name: "Testland",
        slug: "testland-xt",
        defaultCurrency: "USD",
        timezone: "Africa/Harare",
        defaultLocale: "en-ZW",
      },
      select: { id: true },
    });
    return created.id;
  } catch {
    // Another test file created it concurrently.
    const row = await db.country.findUniqueOrThrow({ where: { isoCode: TEST_COUNTRY_ISO }, select: { id: true } });
    return row.id;
  }
}

export interface CurriculumFixture {
  qualificationId: string;
  subjectId: string;
  subjectName: string;
  syllabusId: string;
  gradeSchemeId: string;
  topicIds: string[];
  topicNames: string[];
  questionIds: string[];
  mockAssessmentId: string;
  testAssessmentId: string;
  examSessionId: string;
}

export interface CurriculumOptions {
  topicCount?: number;
  /** First exam day of the target session (YYYY-MM-DD). */
  examStartsOn?: LocalDate;
  examProvisional?: boolean;
}

/**
 * Board → level → qualification → subject → published syllabus (with topics) + grade scheme (A ≥ 70, B ≥ 60, C ≥ 50
 * pass; D ≥ 40, U fail) + exam session + one draft question per topic + mock and subject-test assessments.
 */
export async function createCurriculum(options: CurriculumOptions = {}): Promise<CurriculumFixture> {
  const s = suffix();
  const topicCount = options.topicCount ?? 3;
  const board = await db.examBoard.create({
    data: { slug: `an-board-${s}`, code: `AB${s}`.slice(0, 32), name: `Board ${s}`, shortName: `B${s.slice(0, 4)}` },
  });
  const level = await db.qualificationLevel.create({ data: { slug: `an-level-${s}`, name: `Level ${s}` } });
  const qualification = await db.qualification.create({
    data: { examBoardId: board.id, levelId: level.id, slug: `an-qual-${s}`, name: `Qualification ${s}`, shortName: `Q-${s.slice(0, 6)}` },
  });
  const category = await db.subjectCategory.create({ data: { slug: `an-cat-${s}`, name: `Category ${s}` } });
  const subjectName = `Mathematics ${s}`;
  const subject = await db.subject.create({
    data: { qualificationId: qualification.id, categoryId: category.id, slug: `an-subject-${s}`, name: subjectName },
  });
  const source = await db.contentSource.create({ data: { name: `Source ${s}`, slug: `an-source-${s}`, type: "ORIGINAL" } });
  const scheme = await db.gradeScheme.create({
    data: {
      qualificationId: qualification.id,
      name: `Scheme ${s} (estimate)`,
      bands: {
        create: [
          { label: "A", minPercent: 70, sortOrder: 0, isPass: true },
          { label: "B", minPercent: 60, sortOrder: 1, isPass: true },
          { label: "C", minPercent: 50, sortOrder: 2, isPass: true },
          { label: "D", minPercent: 40, sortOrder: 3, isPass: false },
          { label: "U", minPercent: 0, sortOrder: 4, isPass: false },
        ],
      },
    },
  });
  const syllabus = await db.syllabus.create({
    data: {
      subjectId: subject.id,
      title: `Syllabus ${s}`,
      versionLabel: "2026",
      effectiveFrom: new Date("2000-01-01T00:00:00Z"),
      gradeSchemeId: scheme.id,
      sourceId: source.id,
    },
  });
  const topicIds: string[] = [];
  const topicNames: string[] = [];
  for (let i = 0; i < topicCount; i += 1) {
    const id = randomUUID();
    const name = `Topic ${i + 1} ${s}`;
    await db.topic.create({
      data: { id, syllabusId: syllabus.id, kind: "TOPIC", depth: 0, path: id, sortOrder: i, name, slug: `topic-${i + 1}` },
    });
    topicIds.push(id);
    topicNames.push(name);
  }
  await db.syllabus.update({
    where: { id: syllabus.id },
    data: { status: "CURRENT", publishedAt: new Date(), copyrightStatus: "OWNED" },
  });
  const startsOn = options.examStartsOn ?? "2027-11-01";
  const provisional = options.examProvisional ?? true;
  const session = await db.examSession.create({
    data: {
      qualificationId: qualification.id,
      name: `November ${startsOn.slice(0, 4)}`,
      seriesCode: `S-${s}`.slice(0, 32),
      year: Number(startsOn.slice(0, 4)),
      startsOn: dateColumnFromLocalDate(startsOn),
      endsOn: dateColumnFromLocalDate(startsOn),
      isProvisional: provisional,
      confirmedAt: provisional ? null : new Date(),
      status: "PUBLISHED",
    },
  });
  const questionIds: string[] = [];
  for (let i = 0; i < topicCount; i += 1) {
    const question = await db.question.create({
      data: { subjectId: subject.id, type: "MULTIPLE_CHOICE", stem: `Question ${i} ${s}`, difficulty: 3, marks: 1 },
    });
    questionIds.push(question.id);
  }
  const mock = await db.assessment.create({
    data: { kind: "MOCK_EXAM", subjectId: subject.id, syllabusId: syllabus.id, title: `Mock ${s}`, totalMarks: 100, timeLimitSeconds: 7200 },
  });
  const test = await db.assessment.create({
    data: { kind: "SUBJECT_TEST", subjectId: subject.id, syllabusId: syllabus.id, title: `Subject test ${s}`, totalMarks: 50 },
  });
  return {
    qualificationId: qualification.id,
    subjectId: subject.id,
    subjectName,
    syllabusId: syllabus.id,
    gradeSchemeId: scheme.id,
    topicIds,
    topicNames,
    questionIds,
    mockAssessmentId: mock.id,
    testAssessmentId: test.id,
    examSessionId: session.id,
  };
}

export interface UserOptions {
  createdAt?: Date;
  signupChannel?: "WEB" | "WHATSAPP" | "API";
  isDemo?: boolean;
  student?: boolean;
  firstName?: string;
  lastName?: string;
  roles?: ("STUDENT" | "PARENT" | "TEACHER")[];
}

export async function createUser(options: UserOptions = {}): Promise<string> {
  const s = suffix();
  const user = await db.user.create({
    data: {
      emailNormalized: `analytics.${s}@example.test`,
      signupChannel: options.signupChannel ?? "WEB",
      isDemo: options.isDemo ?? false,
      roles: options.roles ?? (options.student === false ? [] : ["STUDENT"]),
      ...(options.createdAt ? { createdAt: options.createdAt } : {}),
      profile: { create: { firstName: options.firstName ?? `Learner${s.slice(0, 4)}`, lastName: options.lastName ?? null } },
      ...(options.student === false ? {} : { student: { create: {} } }),
    },
    select: { id: true },
  });
  return user.id;
}

export async function enrol(
  userId: string,
  curriculum: CurriculumFixture,
  options: { targetGrade?: string; targetExamSessionId?: string | null; status?: "ACTIVE" | "PAUSED" | "DROPPED" } = {},
): Promise<void> {
  await db.subjectEnrollment.create({
    data: {
      userId,
      subjectId: curriculum.subjectId,
      syllabusId: curriculum.syllabusId,
      targetGrade: options.targetGrade ?? null,
      targetExamSessionId: options.targetExamSessionId === undefined ? curriculum.examSessionId : options.targetExamSessionId,
      status: options.status ?? "ACTIVE",
    },
  });
}

export interface AttemptOptions {
  userId: string;
  curriculum: CurriculumFixture;
  mode: AttemptMode;
  startedAt: Date;
  submittedAt?: Date | null;
  status?: AttemptStatus;
  percentage?: number | null;
  gradeIsPass?: boolean | null;
  gradeEstimate?: string | null;
  assignmentId?: string | null;
  /** Answers to create: one QuestionAttempt per entry, true = correct. Presented at `startedAt` unless overridden. */
  answers?: { correct: boolean; topicIndex?: number; createdAt?: Date }[];
  pendingReviewCount?: number;
}

/** Creates an AssessmentAttempt (+ QuestionAttempts) that satisfies every attempt CHECK and trigger. */
export async function createAttempt(options: AttemptOptions): Promise<string> {
  const { curriculum, mode } = options;
  const status = options.status ?? (options.submittedAt ? "MARKED" : "IN_PROGRESS");
  const submittedAt = options.submittedAt ?? null;
  const assessmentId =
    mode === "MOCK_EXAM" ? curriculum.mockAssessmentId : ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST"].includes(mode) ? curriculum.testAssessmentId : null;
  const timed = mode === "MOCK_EXAM" || mode === "TIMED_EXAM";
  const answers = options.answers ?? [];
  const correctCount = answers.filter((a) => a.correct).length;
  const marked = status === "MARKED";
  const totalMarks = marked ? Math.max(answers.length, 1) * 10 : null;
  const percentage = options.percentage === undefined ? (marked && answers.length ? (correctCount * 100) / answers.length : null) : options.percentage;
  const marksAwarded = marked && totalMarks !== null ? Math.round(((percentage ?? 0) / 100) * totalMarks) : null;
  const gradeIsPass = options.gradeIsPass ?? null;
  const attempt = await db.assessmentAttempt.create({
    data: {
      userId: options.userId,
      subjectId: curriculum.subjectId,
      mode,
      status,
      assessmentId,
      assessmentRevision: assessmentId ? 1 : null,
      assignmentId: options.assignmentId ?? null,
      startedAt: options.startedAt,
      lastSavedAt: options.startedAt,
      deadlineAt: timed ? new Date(options.startedAt.getTime() + 7_200_000) : null,
      timeLimitSeconds: timed ? 7200 : null,
      submittedAt,
      submitReason: submittedAt ? "STUDENT" : null,
      markedAt: marked && submittedAt ? submittedAt : null,
      totalMarks,
      marksAwarded,
      percentage: marked ? percentage : null,
      gradeSchemeId: gradeIsPass === null ? null : curriculum.gradeSchemeId,
      gradeEstimate: gradeIsPass === null ? null : (options.gradeEstimate ?? (gradeIsPass ? "C" : "U")),
      gradeIsPass,
      questionCount: answers.length,
      answeredCount: submittedAt ? answers.length : 0,
      correctCount: submittedAt ? correctCount : 0,
      pendingReviewCount: options.pendingReviewCount ?? 0,
      config: { feedback: "ON_SUBMIT", origin: "BUILDER" },
    },
    select: { id: true },
  });
  if (answers.length) {
    await db.questionAttempt.createMany({
      data: answers.map((answer, index) => {
        const topicIndex = answer.topicIndex ?? 0;
        const createdAt = answer.createdAt ?? options.startedAt;
        return {
          attemptId: attempt.id,
          userId: options.userId,
          subjectId: curriculum.subjectId,
          topicId: curriculum.topicIds[topicIndex] ?? curriculum.topicIds[0]!,
          questionId: curriculum.questionIds[topicIndex] ?? curriculum.questionIds[0]!,
          createdAt,
          answeredAt: createdAt,
          markedAt: createdAt,
          questionRevision: 1,
          markingStatus: "AUTO_MARKED" as const,
          position: index + 1,
          difficulty: 3,
          marksAvailable: 1,
          marksAwarded: answer.correct ? 1 : 0,
          isCorrect: answer.correct,
          response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
        };
      }),
    });
  }
  return attempt.id;
}

export async function addDailyActivity(
  userId: string,
  date: LocalDate,
  values: { studySeconds?: number; questionsAttempted?: number; questionsCorrect?: number; flashcardsReviewed?: number; freezeOnly?: boolean } = {},
): Promise<void> {
  const freeze = values.freezeOnly === true;
  await db.dailyActivity.create({
    data: {
      userId,
      date: dateColumnFromLocalDate(date),
      studySeconds: freeze ? 0 : (values.studySeconds ?? 600),
      questionsAttempted: freeze ? 0 : (values.questionsAttempted ?? 0),
      questionsCorrect: freeze ? 0 : (values.questionsCorrect ?? 0),
      flashcardsReviewed: freeze ? 0 : (values.flashcardsReviewed ?? 0),
      streakCredited: freeze,
      streakFreezeUsed: freeze,
    },
  });
}

export async function addStudySession(
  userId: string,
  subjectId: string | null,
  startedAt: Date,
  localDate: LocalDate,
  durationSeconds: number,
): Promise<void> {
  const lastActiveAt = new Date(startedAt.getTime() + durationSeconds * 1000);
  await db.studySession.create({
    data: {
      userId,
      subjectId,
      startedAt,
      lastActiveAt,
      endedAt: lastActiveAt,
      localDate: dateColumnFromLocalDate(localDate),
      durationSeconds,
      activityType: "PRACTICE",
    },
  });
}

export async function createPlan(audience: "INDIVIDUAL" | "SCHOOL"): Promise<{ id: string; code: string }> {
  const code = `T${suffix().toUpperCase()}`;
  const plan = await db.plan.create({
    data: { code, name: `Plan ${code}`, audience, entitlements: { version: 1, features: {}, limits: {} } },
  });
  return { id: plan.id, code };
}

export async function createUserSubscription(
  userId: string,
  planId: string,
  options: { status: SubscriptionStatus; startedAt: Date; periodEnd: Date; endedAt?: Date | null },
): Promise<string> {
  const ended = options.status === "CANCELLED" || options.status === "EXPIRED";
  const sub = await db.subscription.create({
    data: {
      planId,
      holderUserId: userId,
      status: options.status,
      startedAt: options.startedAt,
      currentPeriodStart: options.startedAt,
      currentPeriodEnd: options.periodEnd,
      trialEndsAt: options.status === "TRIALING" ? options.periodEnd : null,
      cancelledAt: options.status === "CANCELLED" ? (options.endedAt ?? options.periodEnd) : null,
      endedAt: ended ? (options.endedAt ?? options.periodEnd) : null,
    },
    select: { id: true },
  });
  return sub.id;
}

export async function createPayment(options: {
  payerUserId: string;
  beneficiaryUserId: string;
  subscriptionId: string;
  amountMinor: number;
  currency: string;
  paidAt: Date;
  refundedAt?: Date;
}): Promise<string> {
  const refunded = options.refundedAt !== undefined;
  const payment = await db.payment.create({
    data: {
      purpose: "SUBSCRIPTION",
      status: refunded ? "REFUNDED" : "SUCCESSFUL",
      provider: "sandbox",
      payerUserId: options.payerUserId,
      beneficiaryUserId: options.beneficiaryUserId,
      subscriptionId: options.subscriptionId,
      amountMinor: options.amountMinor,
      currency: options.currency,
      idempotencyKey: suffix(),
      createdAt: options.paidAt,
      paidAt: options.paidAt,
      refundedAmountMinor: refunded ? options.amountMinor : 0,
      refundedAt: options.refundedAt ?? null,
    },
    select: { id: true },
  });
  return payment.id;
}

export interface SchoolFixture {
  schoolId: string;
  adminUserId: string;
}

export async function createSchool(options: { settings?: Prisma.InputJsonObject } = {}): Promise<SchoolFixture> {
  const s = suffix();
  const countryId = await testCountryId();
  const school = await db.school.create({
    data: {
      name: `School ${s}`,
      slug: `an-school-${s}`,
      countryId,
      type: "GOVERNMENT",
      status: "ACTIVE",
      verifiedAt: new Date(),
      ...(options.settings ? { settings: options.settings } : {}),
    },
  });
  const adminUserId = await createUser({ student: false, roles: [], firstName: "Admin" });
  await addSchoolMember(school.id, adminUserId, "SCHOOL_ADMIN");
  return { schoolId: school.id, adminUserId };
}

export async function addSchoolMember(
  schoolId: string,
  userId: string,
  role: "SCHOOL_ADMIN" | "TEACHER" | "STUDENT",
  status: "ACTIVE" | "REMOVED" = "ACTIVE",
): Promise<void> {
  await db.schoolMember.create({
    data: {
      schoolId,
      userId,
      role,
      status,
      joinedAt: new Date(),
      removedAt: status === "REMOVED" ? new Date() : null,
    },
  });
}

/** A live SCHOOL subscription for the school plus a SCHOOL_SEAT grant for `studentUserId` (an ACTIVE student member). */
export async function createSchoolSeat(options: {
  schoolId: string;
  studentUserId: string;
  schoolPlanId: string;
  startedAt: Date;
  periodEnd: Date;
}): Promise<void> {
  const subscription = await db.subscription.create({
    data: {
      planId: options.schoolPlanId,
      schoolId: options.schoolId,
      seats: 5,
      status: "ACTIVE",
      startedAt: options.startedAt,
      currentPeriodStart: options.startedAt,
      currentPeriodEnd: options.periodEnd,
    },
    select: { id: true },
  });
  await db.entitlementGrant.create({
    data: {
      userId: options.studentUserId,
      source: "SCHOOL_SEAT",
      subscriptionId: subscription.id,
      planId: options.schoolPlanId,
      startsAt: options.startedAt,
    },
  });
}

export async function createClass(options: {
  schoolId: string | null;
  subjectId: string | null;
  teacherUserId: string;
  name?: string;
}): Promise<string> {
  const cls = await db.class.create({
    data: {
      schoolId: options.schoolId,
      subjectId: options.subjectId,
      name: options.name ?? `Class ${suffix()}`,
      academicYear: "2026",
      createdById: options.teacherUserId,
    },
    select: { id: true },
  });
  await db.classTeacher.create({ data: { classId: cls.id, userId: options.teacherUserId, role: "LEAD" } });
  return cls.id;
}

export async function addClassTeacher(classId: string, userId: string, role: "LEAD" | "ASSISTANT" = "ASSISTANT"): Promise<void> {
  await db.classTeacher.create({ data: { classId, userId, role } });
}

export async function addClassMember(classId: string, userId: string, status: "ACTIVE" | "PENDING" | "REMOVED" = "ACTIVE"): Promise<void> {
  await db.classMember.create({
    data: { classId, userId, status, removedAt: status === "REMOVED" ? new Date() : null },
  });
}

export async function addSubjectProgress(
  userId: string,
  subjectId: string,
  values: {
    progressPercent?: number;
    syllabusCoveragePercent?: number;
    averageScorePercent?: number | null;
    averageMockPercent?: number | null;
    lastMockPercent?: number | null;
    readinessPercent?: number | null;
    topicsTotal?: number;
    topicsStarted?: number;
    topicsCompleted?: number;
    questionsAttempted?: number;
    questionsCorrect?: number;
    studySeconds?: number;
    predictedGrade?: string | null;
    lastActivityAt?: Date | null;
  } = {},
): Promise<void> {
  await db.subjectProgress.create({ data: { userId, subjectId, ...values } });
}

export async function addTopicMastery(
  userId: string,
  curriculum: CurriculumFixture,
  topicIndex: number,
  values: { score: number; attempted: number; correct: number; lastPracticedAt?: Date },
): Promise<void> {
  await db.topicMastery.create({
    data: {
      userId,
      topicId: curriculum.topicIds[topicIndex]!,
      subjectId: curriculum.subjectId,
      syllabusId: curriculum.syllabusId,
      topicKind: "TOPIC",
      score: values.score,
      band: masteryBandFromScore(values.score),
      questionsAttempted: values.attempted,
      questionsCorrect: values.correct,
      marksAvailable: values.attempted,
      marksAwarded: values.correct,
      firstPracticedAt: values.lastPracticedAt ?? new Date(),
      lastPracticedAt: values.lastPracticedAt ?? new Date(),
    },
  });
}

export async function createAssignment(options: {
  classId: string;
  teacherUserId: string;
  curriculum: CurriculumFixture;
  publishedAt: Date | null;
  dueAt?: Date | null;
  status?: "DRAFT" | "PUBLISHED" | "CLOSED";
  title?: string;
}): Promise<string> {
  const status = options.status ?? (options.publishedAt ? "PUBLISHED" : "DRAFT");
  const assignment = await db.assignment.create({
    data: {
      classId: options.classId,
      createdById: options.teacherUserId,
      subjectId: options.curriculum.subjectId,
      type: "ASSESSMENT",
      assessmentId: options.curriculum.testAssessmentId,
      status,
      publishedAt: options.publishedAt,
      dueAt: options.dueAt ?? null,
      title: options.title ?? `Assignment ${suffix()}`,
    },
    select: { id: true },
  });
  return assignment.id;
}

export async function addAssignmentProgress(
  assignmentId: string,
  userId: string,
  status: "NOT_STARTED" | "IN_PROGRESS" | "SUBMITTED" | "LATE" | "MISSED" | "EXCUSED",
  scorePercent: number | null = null,
): Promise<void> {
  const submitted = status === "SUBMITTED" || status === "LATE";
  await db.assignmentProgress.create({
    data: { assignmentId, userId, status, submittedAt: submitted ? new Date() : null, scorePercent },
  });
}

export async function addAiUsage(userId: string, date: LocalDate, feature: AiFeature, requests: number, costMicros: number): Promise<void> {
  await db.aiUsageDaily.create({
    data: { userId, date: dateColumnFromLocalDate(date), feature, requests, costMicros },
  });
}

/** Increments a global AiSpendDaily shard (its key is only (date, shard), so it is upserted, never assumed empty). */
export async function addAiSpend(date: LocalDate, shard: number, requests: number, costMicros: number): Promise<void> {
  const day = dateColumnFromLocalDate(date);
  await db.aiSpendDaily.upsert({
    where: { date_shard: { date: day, shard } },
    create: { date: day, shard, requests, costMicros: BigInt(costMicros) },
    update: { requests: { increment: requests }, costMicros: { increment: BigInt(costMicros) } },
  });
}
