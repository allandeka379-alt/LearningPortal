import "server-only";
import { db } from "@/server/db";
import { withUserContext } from "@/server/lib/db-context";

/**
 * The account holder's data export (ARCHITECTURE §4.13 "Data export"; privacy notice "a download of your data"):
 * profile, enrolments, attempts, lesson progress, study plans, personal flashcards and the user's own AI conversations,
 * as one JSON document. AI rows are read as the owner (`withUserContext`), so row-level security applies as for any
 * other read of the student's own conversations. Large histories are capped (newest first) to keep the file bounded.
 *
 * A copy built for a minor's GUARDIAN (`audience: "guardian"`, ./guardian-privacy.ts) never contains the child's AI
 * conversations (§21: parents never see them by default); the document says so instead.
 */

export interface AccountExportOptions {
  /** Who asked: the account holder (default) or a minor's guardian (no AI conversations). */
  audience?: "owner" | "guardian";
}

export const EXPORT_FORMAT_VERSION = 1;
const MAX_ATTEMPTS = 5_000;
const MAX_CONVERSATIONS = 1_000;

/** The owner's AI conversations, read as the owner so row-level security applies. */
function loadAiConversations(userId: string) {
  return withUserContext(userId, (tx) =>
    tx.aiConversation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: MAX_CONVERSATIONS,
      select: {
        id: true,
        mode: true,
        status: true,
        title: true,
        subjectId: true,
        createdAt: true,
        lastMessageAt: true,
        messages: {
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: { role: true, content: true, contentPurgedAt: true, createdAt: true },
        },
      },
    }),
  );
}

export async function buildAccountExport(userId: string, now: Date = new Date(), options: AccountExportOptions = {}): Promise<Record<string, unknown>> {
  const forGuardian = options.audience === "guardian";
  const [user, enrollments, attempts, lessonProgress, studyPlans, flashcards] = await Promise.all([
    db.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        emailNormalized: true,
        phoneE164: true,
        loginUsername: true,
        roles: true,
        createdAt: true,
        lastLoginAt: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            displayName: true,
            username: true,
            birthYear: true,
            timezone: true,
            locale: true,
            leaderboardOptIn: true,
            leaderboardDisplay: true,
            termsAcceptedAt: true,
            termsVersion: true,
            privacyNoticeVersion: true,
            marketingEmailOptInAt: true,
            marketingSmsOptInAt: true,
            marketingWhatsappOptInAt: true,
          },
        },
        student: {
          select: {
            declaredSchoolName: true,
            targetGrade: true,
            isMinor: true,
            guardianConsentStatus: true,
            guardianConsentAt: true,
            onboardingCompletedAt: true,
          },
        },
      },
    }),
    db.subjectEnrollment.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      select: { subjectId: true, status: true, targetGrade: true, createdAt: true, subject: { select: { name: true } } },
    }),
    db.assessmentAttempt.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      take: MAX_ATTEMPTS,
      select: {
        id: true,
        mode: true,
        status: true,
        subjectId: true,
        assessmentId: true,
        startedAt: true,
        submittedAt: true,
        questionCount: true,
        answeredCount: true,
        correctCount: true,
        totalMarks: true,
        marksAwarded: true,
        percentage: true,
        gradeEstimate: true,
        timeSpentSeconds: true,
      },
    }),
    db.lessonProgress.findMany({
      where: { userId },
      orderBy: { lastViewedAt: "desc" },
      select: { lessonId: true, status: true, progressPercent: true, firstViewedAt: true, lastViewedAt: true, completedAt: true, timeSpentSeconds: true },
    }),
    db.studyPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, status: true, startsOn: true, examDate: true, dailyTargetMinutes: true, weeklyTargetMinutes: true, generatedAt: true },
    }),
    db.flashcard.findMany({
      where: { ownerUserId: userId },
      orderBy: { createdAt: "asc" },
      select: { id: true, subjectId: true, front: true, back: true, notes: true, status: true, createdAt: true },
    }),
  ]);

  const aiConversations = forGuardian ? [] : await loadAiConversations(userId);

  return {
    format: "account-export",
    version: EXPORT_FORMAT_VERSION,
    generatedAt: now.toISOString(),
    requestedBy: forGuardian ? "guardian" : "account holder",
    account: {
      id: user.id,
      email: user.emailNormalized,
      phone: user.phoneE164,
      username: user.loginUsername,
      roles: user.roles,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    },
    profile: user.profile,
    student: user.student,
    enrollments: enrollments.map((row) => ({ subjectId: row.subjectId, subject: row.subject.name, status: row.status, targetGrade: row.targetGrade, enrolledAt: row.createdAt })),
    attempts,
    lessonProgress,
    studyPlans,
    flashcards,
    ...(forGuardian
      ? { aiConversationsNote: "AI tutor conversations are private to the student and are not included in a copy requested by a parent or guardian." }
      : {}),
    aiConversations: aiConversations.map((conversation) => ({
      ...conversation,
      messages: conversation.messages.map((message) => ({
        role: message.role,
        content: message.contentPurgedAt ? null : message.content,
        contentDeletedAt: message.contentPurgedAt,
        createdAt: message.createdAt,
      })),
    })),
  };
}
