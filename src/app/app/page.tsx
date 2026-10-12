import type { Metadata } from "next";
import { DiagnosticOfferCard } from "@/components/dashboard/DiagnosticOfferCard";
import { DiagnosticSummaryCard } from "@/components/dashboard/DiagnosticSummaryCard";
import { greetingText } from "@/components/dashboard/links";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { RecentMocks } from "@/components/dashboard/RecentMocks";
import { RecommendedSessions } from "@/components/dashboard/RecommendedSessions";
import { SubjectProgressList } from "@/components/dashboard/SubjectProgressList";
import { ContinueLearningCard } from "@/components/learn/ContinueLearningCard";
import { CourseProgressList } from "@/components/learn/CourseProgressList";
import { ExamDistanceLine, ExamPrepPanel } from "@/components/learn/ExamPrepPanel";
import { learnerLine } from "@/components/learn/format";
import { MasteryTabsCard } from "@/components/learn/MasteryTabsCard";
import { WeekPlanCard } from "@/components/learn/WeekPlanCard";
import { Container } from "@/components/layout/Container";
import { formatLocalDate } from "@/components/student/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { hasEntitlement } from "@/server/billing/entitlements";
import { getLearningHome } from "@/server/lessons/course";
import { examFocus, monthsUntil } from "@/server/lessons/course-core";
import { getStudentDashboard } from "@/server/progress/service";
import { getRecentDiagnostics } from "@/server/progress/student-overview";

export const metadata: Metadata = { title: "Home" };

/** Weak topics the exam-preparation panel lists. */
const EXAM_PANEL_WEAK_TOPICS = 3;

/**
 * Student dashboard (§6, design brief "learning first"): greeting with the student's form and qualification, then
 * "Continue learning" (the next lesson of the course studied most recently), "This week" (today's target and the study
 * plan's next seven days) and the courses' lesson progress. Exam preparation (countdown, readiness, mocks, weak topics)
 * leads when the target exam is within about ten months or the student is in their exam year; otherwise one line says
 * how far away the exam is. Analytics (overall progress, per-subject mastery, one tabbed weak / strong card, recent
 * mocks) come last. Every number comes from the read models; a new student sees honest empty states (§50).
 */
export default async function StudentDashboardPage() {
  const actor = await requireOnboardedStudent({ next: "/app" });
  const [dashboard, home, diagnostics, countdownIncluded, diagnosticIncluded] = await Promise.all([
    getStudentDashboard(actor),
    getLearningHome(actor),
    getRecentDiagnostics(actor),
    hasEntitlement(actor, "examCountdown"),
    hasEntitlement(actor, "diagnostic_test"),
  ]);
  const countdown = countdownIncluded ? dashboard.examCountdown : null;
  const focus = examFocus({ daysUntil: countdown?.daysUntil ?? null, examYear: home.learner.examYear });
  const hasEvidence = dashboard.questionsAttempted > 0;
  const subline = learnerLine(home.learner.yearGroupName, home.learner.qualificationName);
  const lastMock = dashboard.recentMocks.find((mock) => mock.percentage !== null) ?? dashboard.recentMocks[0] ?? null;
  const lessonsPublished = home.courses.reduce((sum, course) => sum + course.totalLessons, 0);

  return (
    <Container className="space-y-6 pb-10">
      <header className="space-y-1.5 pt-6 sm:pt-8">
        <p className="text-sm font-semibold text-primary">{formatLocalDate(dashboard.today, "weekday")}</p>
        <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{greetingText(dashboard.greeting.partOfDay, home.learner.firstName)}</h1>
        {subline && <p className="text-base text-muted">{subline}</p>}
        {focus === "LIGHT" && countdown && <ExamDistanceLine countdown={countdown} months={monthsUntil(countdown.daysUntil)} className="pt-1" />}
      </header>

      <ContinueLearningCard item={home.continueLearning} library={{ courses: home.courses.length, lessons: lessonsPublished }} />

      {focus === "PREPARE" && (
        <ExamPrepPanel
          countdown={countdown}
          readiness={{
            progressPercent: dashboard.overall.progressPercent,
            topicsCompleted: dashboard.overall.topicsCompleted,
            topicsTotal: dashboard.overall.topicsTotal,
            lastMock: lastMock ? { subjectName: lastMock.subjectName, percentage: lastMock.percentage, gradeEstimate: lastMock.gradeEstimate } : null,
          }}
          weakTopics={dashboard.weakTopics.slice(0, EXAM_PANEL_WEAK_TOPICS)}
        />
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <WeekPlanCard today={dashboard.today} dailyTarget={dashboard.dailyTarget} week={home.week} />
        <CourseProgressList courses={home.courses} />
      </div>

      {diagnosticIncluded && dashboard.diagnosticOffer && <DiagnosticOfferCard status={dashboard.diagnosticOffer} />}

      <RecommendedSessions items={dashboard.recommended} />

      <DiagnosticSummaryCard summaries={diagnostics} timeZone={dashboard.timeZone} />

      <section aria-labelledby="your-progress-title" className="space-y-4 pt-2">
        <div className="space-y-1">
          <h2 id="your-progress-title" className="text-lg font-semibold text-text">
            Your progress
          </h2>
          <p className="text-sm text-muted">Mastery from your practice, tests and mock exams.</p>
        </div>
        <OverviewStats
          overall={dashboard.overall}
          questionsAttempted={dashboard.questionsAttempted}
          questionsCorrect={dashboard.questionsCorrect}
          accuracyPercent={dashboard.accuracyPercent}
          averageScorePercent={dashboard.averageScorePercent}
          streak={dashboard.streak}
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <SubjectProgressList subjects={dashboard.subjects} />
          <MasteryTabsCard
            id="topic-mastery-title"
            description="Lowest mastery first under “To work on”."
            weak={dashboard.weakTopics}
            strong={dashboard.strongTopics}
            weakEmpty={
              hasEvidence
                ? "No weak topics right now. Keep practising to stay on top."
                : "Answer some practice questions and the topics that need more work will show here."
            }
            strongEmpty={hasEvidence ? "Topics reach this list at the Strong band (75% mastery)." : "Your strongest topics will show here as you practise."}
          />
        </div>
      </section>

      <RecentMocks mocks={dashboard.recentMocks} timeZone={dashboard.timeZone} />
    </Container>
  );
}
