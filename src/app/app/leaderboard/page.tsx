import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { Medal, UserPlus } from "lucide-react";
import type { Metadata } from "next";
import { LeaderboardOptIn } from "@/components/leaderboard/LeaderboardOptIn";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { LeaderboardTabs } from "@/components/leaderboard/LeaderboardTabs";
import { METRIC_COPY, SCOPE_COPY } from "@/components/leaderboard/labels";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatLocalDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatCount } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getLeaderboard, type LeaderboardPeriod } from "@/server/leaderboards/service";
import { updateLeaderboardOptInAction } from "./actions";

export const metadata: Metadata = { title: "Leaderboard" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function periodLabel(period: LeaderboardPeriod): string {
  if (period.kind === "WEEK" && period.startsOn && period.endsOn) {
    return `This week, ${formatLocalDate(period.startsOn, "short")} to ${formatLocalDate(period.endsOn, "short")}`;
  }
  if (period.kind === "MONTH" && period.startsOn) {
    const month = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${period.startsOn}T12:00:00Z`));
    return `This month, ${month}`;
  }
  return "Right now";
}

function updatedLabel(updatedAt: Date | null, timeZone: string): string {
  if (!updatedAt) return "Scores update every hour.";
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short", timeZone }).format(updatedAt);
  return `Scores update every hour. Last change ${time}.`;
}

/**
 * /app/leaderboard (§20): optional, privacy-first leaderboards. Metric and scope tabs (only the student's own country,
 * schools, classes and subjects), the top of the board with names in each student's chosen mode, the student's own
 * rank even outside the top, and a clear opt-in with a privacy explanation for students who are not on the boards.
 */
export default async function LeaderboardPage({ searchParams }: { searchParams: SearchParams }) {
  const actor = await requireOnboardedStudent({ next: "/app/leaderboard" });
  const params = await searchParams;
  const view = await getLeaderboard(actor, { metric: first(params.metric), scope: first(params.scope), scopeId: first(params.scopeId) });
  const copy = METRIC_COPY[view.metric];
  const optIn = (
    <LeaderboardOptIn
      optedIn={view.optedIn}
      display={view.display}
      previews={view.previews}
      realNameNeedsConsent={view.realNameNeedsConsent}
      action={updateLeaderboardOptInAction}
    />
  );

  return (
    <Container className="space-y-6 pb-12">
      <PageHeader
        title="Leaderboard"
        description="Optional and private by default. See how your effort compares with students who chose to take part."
        actions={
          <>
            <ButtonLink href="/app/achievements" variant="outline" iconStart={<Medal aria-hidden="true" />}>
              Achievements
            </ButtonLink>
            <ButtonLink href="/app/invite" variant="ghost" iconStart={<UserPlus aria-hidden="true" />}>
              Invite friends
            </ButtonLink>
          </>
        }
        className="pb-0"
      />

      {!view.entitled ? (
        <Alert tone="info" title="Leaderboards aren't included in your plan" action={<UpgradeButton />}>
          Your badges, streak and weekly goal are on your Achievements page.
        </Alert>
      ) : (
        <>
          {!view.optedIn && optIn}

          <LeaderboardTabs metric={view.metric} metrics={view.metrics} scope={view.scope} scopes={view.scopes} />

          <Card as="section" aria-labelledby="board-title">
            <CardHeader
              titleAs="h2"
              title={
                <span id="board-title">
                  {copy.label} · {view.scope.scope === "GLOBAL" ? SCOPE_COPY.GLOBAL : view.scope.label}
                </span>
              }
              description={`${periodLabel(view.period)}. ${copy.description}`}
            />
            <CardBody className="space-y-4">
              {view.scopes.length === 0 ? (
                <p className="text-sm text-muted">This board is for subjects and classes. Add a subject or join a class to see it.</p>
              ) : (
                <LeaderboardTable
                  metric={view.metric}
                  rows={view.rows}
                  me={view.me}
                  myName={view.myName}
                  total={view.total}
                  emptyTitle="No scores on this board yet"
                  emptyDescription={
                    view.metric === "MOCK_AVERAGE"
                      ? `Students appear here after ${view.minMocks} marked mock exams this month.`
                      : "Scores appear here once students who joined the leaderboards start studying."
                  }
                />
              )}
              <p className="text-xs text-muted">
                {view.total > 0 ? `${formatCount(view.total, "student")} on this board. ` : ""}
                {updatedLabel(view.updatedAt, actor.timeZone)}
              </p>
              {view.optedIn && !view.me && view.rows.length > 0 && (
                <p className="text-sm text-muted">You&apos;re not on this board yet. Keep studying and your score will appear after the next update.</p>
              )}
            </CardBody>
          </Card>

          {view.optedIn && optIn}
        </>
      )}
    </Container>
  );
}
