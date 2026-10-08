import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DiagnosticOfferCard } from "@/components/dashboard/DiagnosticOfferCard";
import { DiagnosticSummaryCard } from "@/components/dashboard/DiagnosticSummaryCard";
import { ExamCountdownCard } from "@/components/dashboard/ExamCountdownCard";
import { greetingText } from "@/components/dashboard/links";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { RecentMocks } from "@/components/dashboard/RecentMocks";
import { RecommendedSessions } from "@/components/dashboard/RecommendedSessions";
import { SubjectProgressList } from "@/components/dashboard/SubjectProgressList";
import { TodayCard } from "@/components/dashboard/TodayCard";
import { TopicMasteryList } from "@/components/dashboard/TopicMasteryList";
import { countdownSentence, formatLocalDate } from "@/components/student/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { hasEntitlement } from "@/server/billing/entitlements";
import { getStudentDashboard } from "@/server/progress/service";
import { getRecentDiagnostics } from "@/server/progress/student-overview";

export const metadata: Metadata = { title: "Home" };

/**
 * Student dashboard (§6): greeting in the student's time zone, exam countdown (§17), today's target and plan items,
 * recommended sessions, the free diagnostic until it is taken (§46) and its report for new students (§52), overall and
 * per-subject progress, weak and strong topics, streak, questions attempted, accuracy, average score and recent mock
 * scores. Every number comes from the progress read models; a new student sees honest empty states (§50).
 */
export default async function StudentDashboardPage() {
  const actor = await requireOnboardedStudent({ next: "/app" });
  const [dashboard, diagnostics, countdownIncluded, diagnosticIncluded] = await Promise.all([
    getStudentDashboard(actor),
    getRecentDiagnostics(actor),
    hasEntitlement(actor, "examCountdown"),
    hasEntitlement(actor, "diagnostic_test"),
  ]);
  const countdown = countdownIncluded ? dashboard.examCountdown : null;
  const hasEvidence = dashboard.questionsAttempted > 0;

  return (
    <Container className="space-y-6 pb-10">
      <header className="space-y-1.5 pt-6 sm:pt-8">
        <p className="text-sm font-semibold text-primary">{formatLocalDate(dashboard.today, "weekday")}</p>
        <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{greetingText(dashboard.greeting.partOfDay, dashboard.greeting.name)}</h1>
        {countdown && (
          <p className="text-base text-muted">
            {countdownSentence(countdown.daysUntil)}
            {countdown.isProvisional ? " (provisional date)" : ""}.
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <TodayCard today={dashboard.today} dailyTarget={dashboard.dailyTarget} plan={dashboard.studyPlan} />
        {countdownIncluded && <ExamCountdownCard countdown={countdown} />}
      </div>

      {diagnosticIncluded && dashboard.diagnosticOffer && <DiagnosticOfferCard status={dashboard.diagnosticOffer} />}

      <RecommendedSessions items={dashboard.recommended} />

      <DiagnosticSummaryCard summaries={diagnostics} timeZone={dashboard.timeZone} />

      <section aria-labelledby="your-progress-title" className="space-y-4">
        <h2 id="your-progress-title" className="text-lg font-semibold text-text">
          Your progress
        </h2>
        <OverviewStats
          overall={dashboard.overall}
          questionsAttempted={dashboard.questionsAttempted}
          questionsCorrect={dashboard.questionsCorrect}
          accuracyPercent={dashboard.accuracyPercent}
          averageScorePercent={dashboard.averageScorePercent}
          streak={dashboard.streak}
        />
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <SubjectProgressList subjects={dashboard.subjects} />
        <div className="space-y-4">
          <TopicMasteryList
            id="weak-topics-title"
            title="Topics to work on"
            description="Your lowest mastery first."
            variant="weak"
            topics={dashboard.weakTopics}
            empty={
              hasEvidence
                ? "No weak topics right now. Keep practising to stay on top."
                : "Answer some practice questions and the topics that need more work will show here."
            }
          />
          <TopicMasteryList
            id="strong-topics-title"
            title="Strongest topics"
            variant="strong"
            topics={dashboard.strongTopics}
            empty={hasEvidence ? "Topics reach this list at the Strong band (75% mastery)." : "Your strongest topics will show here as you practise."}
          />
        </div>
      </div>

      <RecentMocks mocks={dashboard.recentMocks} timeZone={dashboard.timeZone} />
    </Container>
  );
}
