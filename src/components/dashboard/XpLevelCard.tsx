import { Flame, Snowflake, Sparkles } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount, formatNumber } from "@/lib/format";

export interface XpLevelCardProps {
  xp: { total: number; thisWeek: number; level: { level: number; xpIntoLevel: number; xpForNextLevel: number; xpToNextLevel: number } };
  streak: { current: number; longest: number; freezesAvailable: number };
}

/**
 * XP, level and streak (§19): the level with progress to the next one, XP this week, and the streak with its
 * longest run and available streak freezes. Values come straight from the student's stats. Server component.
 */
export function XpLevelCard({ xp, streak }: XpLevelCardProps) {
  const { level } = xp;
  return (
    <Card as="section" aria-labelledby="xp-level-title">
      <CardHeader titleAs="h2" title={<span id="xp-level-title">Level and streak</span>} />
      <CardBody className="space-y-5">
        <div>
          <p className="flex items-baseline gap-2 text-text">
            <span className="text-4xl font-bold tracking-tight">Level {formatNumber(level.level)}</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {formatNumber(xp.total)} XP in total · {formatNumber(xp.thisWeek)} XP this week
          </p>
          <ProgressBar
            className="mt-3"
            label={`Progress to level ${formatNumber(level.level + 1)}`}
            value={level.xpIntoLevel}
            max={level.xpForNextLevel}
            valueText={`${formatNumber(level.xpToNextLevel)} XP to go`}
            tone="accent"
          />
        </div>
        <dl className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-control bg-subtle p-3">
            <dt className="flex items-center justify-center gap-1 text-xs font-medium text-muted">
              <Flame aria-hidden="true" className="size-3.5" />
              Streak
            </dt>
            <dd className="mt-1 text-lg font-semibold text-text">{formatCount(streak.current, "day")}</dd>
          </div>
          <div className="rounded-control bg-subtle p-3">
            <dt className="flex items-center justify-center gap-1 text-xs font-medium text-muted">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Longest
            </dt>
            <dd className="mt-1 text-lg font-semibold text-text">{formatCount(streak.longest, "day")}</dd>
          </div>
          <div className="rounded-control bg-subtle p-3">
            <dt className="flex items-center justify-center gap-1 text-xs font-medium text-muted">
              <Snowflake aria-hidden="true" className="size-3.5" />
              Freezes
            </dt>
            <dd className="mt-1 text-lg font-semibold text-text">{formatNumber(streak.freezesAvailable)}</dd>
          </div>
        </dl>
        <p className="text-xs text-muted">A streak freeze covers one missed day. You earn one in a week you meet your weekly goal.</p>
      </CardBody>
    </Card>
  );
}
