import { ChartLine } from "lucide-react";
import type { Metadata } from "next";
import { AchievementList } from "@/components/dashboard/AchievementList";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { MasteryDistribution } from "@/components/dashboard/MasteryDistribution";
import { XpLevelCard } from "@/components/dashboard/XpLevelCard";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DetailedAnalytics, DetailedAnalyticsLocked } from "@/components/progress/DetailedAnalytics";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatTile } from "@/components/ui/StatTile";
import { formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { detailedAnalyticsIncluded, getDetailedAnalytics } from "@/server/progress/detailed-analytics";
import { getProgressOverview } from "@/server/progress/student-overview";

export const metadata: Metadata = { title: "Progress" };

/**
 * Cross-subject progress (§6, §11, §19): mastery distribution per subject, the last 30 days of study activity
 * (DailyActivity), XP and level, streak, and badges earned. Read models only; empty states are honest (§50).
 * "Detailed analytics" (topic trends, accuracy by difficulty, time per question) needs the `advancedAnalytics`
 * entitlement (§31): it is computed only for students whose plan includes it; others see what it offers.
 */
export default async function ProgressPage() {
  const actor = await requireOnboardedStudent({ next: "/app/progress" });
  const [overview, detailedIncluded] = await Promise.all([getProgressOverview(actor), detailedAnalyticsIncluded(actor)]);
  const detailed = detailedIncluded ? await getDetailedAnalytics(actor) : null;
  const { activity } = overview;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader title="Progress" description="How your mastery, study time and streak are developing across your subjects." className="pb-0" />

      <section aria-labelledby="activity-title" className="space-y-4">
        <h2 id="activity-title" className="text-lg font-semibold text-text">
          Last 30 days
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Time studied" value={formatDuration(activity.studyMinutes)} />
          <StatTile label="Active days" value={activity.activeDays} hint={`Daily goal met on ${formatNumber(activity.goalDays)}`} />
          <StatTile label="Questions answered" value={activity.questionsAttempted} />
          <StatTile label="Accuracy" value={activity.accuracyPercent === null ? null : formatPercent(activity.accuracyPercent)} />
        </div>
        <Card>
          <CardHeader titleAs="h3" title="Study time per day" description="Minutes of study recorded each day, in your time zone." />
          <CardBody>
            {activity.activeDays === 0 ? (
              <EmptyState
                appearance="plain"
                titleAs="p"
                icon={<ChartLine aria-hidden="true" />}
                title="No study activity in the last 30 days"
                description="Lessons, practice and tests you complete will show here day by day."
                action={<ButtonLink href="/app/practice">Start practising</ButtonLink>}
              />
            ) : (
              <ActivityChart days={activity.days} today={overview.today} />
            )}
          </CardBody>
        </Card>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card as="section" aria-labelledby="mastery-title">
          <CardHeader
            titleAs="h2"
            title={<span id="mastery-title">Mastery by subject</span>}
            description="How many topics of each subject sit in each mastery band."
          />
          <CardBody>
            {overview.subjects.length === 0 ? (
              <EmptyState
                appearance="plain"
                titleAs="p"
                title="No subjects yet"
                description="Add your subjects to track mastery topic by topic."
                action={<ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>}
              />
            ) : (
              <MasteryDistribution subjects={overview.subjects} />
            )}
          </CardBody>
        </Card>
        <XpLevelCard xp={overview.xp} streak={overview.streak} />
      </div>

      {detailed ? <DetailedAnalytics data={detailed} /> : <DetailedAnalyticsLocked />}

      <Card as="section" aria-labelledby="achievements-title">
        <CardHeader
          titleAs="h2"
          title={<span id="achievements-title">Badges</span>}
          description={
            overview.achievements.totalAvailable > 0
              ? `${formatNumber(overview.achievements.earned.length)} of ${formatNumber(overview.achievements.totalAvailable)} earned`
              : undefined
          }
        />
        <CardBody>
          <AchievementList earned={overview.achievements.earned} totalAvailable={overview.achievements.totalAvailable} timeZone={overview.timeZone} />
        </CardBody>
      </Card>
    </Container>
  );
}
