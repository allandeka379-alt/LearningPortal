import { Trophy, UserPlus } from "lucide-react";
import type { Metadata } from "next";
import { XpLevelCard } from "@/components/dashboard/XpLevelCard";
import { AchievementGrid } from "@/components/gamification/AchievementGrid";
import { WeeklyGoalCard } from "@/components/gamification/WeeklyGoalCard";
import { WeeklyGoalForm } from "@/components/gamification/WeeklyGoalForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { createShareAction, renewShareAction, revokeShareAction } from "@/components/share/actions";
import { MySharesList } from "@/components/share/MySharesList";
import { ShareButton } from "@/components/share/ShareButton";
import { formatInstantDate, streakDescription } from "@/components/student/format";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatCount, formatNumber } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getAchievementsView } from "@/server/leaderboards/achievements";
import { WEEKLY_GOAL_LIMITS } from "@/server/leaderboards/achievements-core";
import { listMyShares } from "@/server/sharing/service";
import { updateWeeklyGoalAction } from "./actions";

export const metadata: Metadata = { title: "Achievements" };

/**
 * /app/achievements (§19): level progress, streak and freezes, this week's goal (editable targets), badges earned with
 * their dates and badges still locked with the rule and real progress, plus share links (§46) for the streak and each
 * badge and the list of the student's shared links. Read models only; empty states are honest (§50).
 */
export default async function AchievementsPage() {
  const actor = await requireOnboardedStudent({ next: "/app/achievements" });
  const [view, shares] = await Promise.all([getAchievementsView(actor), listMyShares(actor, { limit: 20 })]);
  const { weeklyGoal } = view;

  return (
    <Container className="space-y-6 pb-12">
      <PageHeader
        title="Achievements"
        description="Your level, streak, weekly goal and badges. Every number here comes from your own study."
        actions={
          <>
            <ButtonLink href="/app/leaderboard" variant="outline" iconStart={<Trophy aria-hidden="true" />}>
              Leaderboard
            </ButtonLink>
            <ButtonLink href="/app/invite" variant="ghost" iconStart={<UserPlus aria-hidden="true" />}>
              Invite friends
            </ButtonLink>
          </>
        }
        className="pb-0"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <XpLevelCard xp={view.xp} streak={view.streak} />
          {view.streak.current > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-surface p-4">
              <p className="text-sm text-muted">{streakDescription(view.streak.current, view.streak.status)}</p>
              <ShareButton
                request={{ kind: "STREAK" }}
                createAction={createShareAction}
                revokeAction={revokeShareAction}
                label="Share streak"
                shows="how many days in a row you have studied"
                size="sm"
              />
            </div>
          )}
        </div>
        <WeeklyGoalCard
          goal={weeklyGoal}
          form={
            <WeeklyGoalForm
              weeklyGoalMinutes={weeklyGoal.minutes.source === "CUSTOM" ? weeklyGoal.minutes.target : null}
              defaultMinutes={weeklyGoal.minutes.defaultTarget}
              weeklyGoalXp={weeklyGoal.xp.target}
              limits={WEEKLY_GOAL_LIMITS}
              action={updateWeeklyGoalAction}
            />
          }
        />
      </div>

      <Card as="section" aria-labelledby="earned-title">
        <CardHeader
          titleAs="h2"
          title={<span id="earned-title">Badges earned</span>}
          description={view.earned.length > 0 ? `${formatNumber(view.earned.length)} so far` : undefined}
        />
        <CardBody>
          <AchievementGrid
            items={view.earned}
            timeZone={view.timeZone}
            emptyTitle="No badges yet"
            emptyDescription="Badges come from real study: streaks, questions answered, topics mastered and mock exams."
            action={(item) =>
              item.earned ? (
                <ShareButton
                  request={{ kind: "ACHIEVEMENT", achievementId: item.achievementId }}
                  createAction={createShareAction}
                  revokeAction={revokeShareAction}
                  label="Share"
                  ariaLabel={`Share the ${item.name} badge`}
                  shows="the badge name"
                  size="sm"
                  variant="ghost"
                />
              ) : null
            }
          />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="locked-title">
        <CardHeader
          titleAs="h2"
          title={<span id="locked-title">Still to earn</span>}
          description={view.hiddenCount > 0 ? `Plus ${formatCount(view.hiddenCount, "hidden badge")} you'll discover along the way.` : undefined}
        />
        <CardBody>
          <AchievementGrid
            items={view.locked}
            timeZone={view.timeZone}
            emptyTitle={view.earned.length > 0 ? "You've earned every badge" : "No badges are available yet"}
            emptyDescription={view.earned.length > 0 ? "New badges will appear here when they are added." : "Badges will appear here when they are set up."}
          />
        </CardBody>
      </Card>

      {shares.length > 0 && (
        <Card as="section" aria-labelledby="shares-title">
          <CardHeader
            titleAs="h2"
            title={<span id="shares-title">Your shared links</span>}
            description="Anyone with a live link can see that card. Turn a link off whenever you like."
          />
          <CardBody>
            <MySharesList
              shares={shares.map((share) => ({
                shareId: share.shareId,
                headline: share.headline,
                status: share.status,
                viewCount: share.viewCount,
                createdOn: formatInstantDate(share.createdAt, view.timeZone),
                expiresOn: formatInstantDate(share.expiresAt, view.timeZone),
              }))}
              renewAction={renewShareAction}
              revokeAction={revokeShareAction}
            />
          </CardBody>
        </Card>
      )}
    </Container>
  );
}
