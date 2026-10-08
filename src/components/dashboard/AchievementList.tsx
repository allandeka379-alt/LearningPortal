import { Award, Compass, Flame, Medal, Target, Timer, type LucideIcon } from "lucide-react";
import { formatInstantDate } from "@/components/student/format";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";

export interface EarnedAchievementView {
  achievementId: string;
  name: string;
  description: string;
  tier: number;
  iconKey: string;
  unlockedAt: Date;
}

/** Icon keys used by achievement definitions (data); unknown keys fall back to a medal. */
const ICONS: Readonly<Record<string, LucideIcon>> = {
  flame: Flame,
  target: Target,
  timer: Timer,
  award: Award,
  compass: Compass,
  medal: Medal,
};

const TIER_RING: Readonly<Record<number, string>> = {
  1: "ring-1 ring-border",
  2: "ring-2 ring-primary/40",
  3: "ring-2 ring-accent",
};

export interface AchievementListProps {
  earned: readonly EarnedAchievementView[];
  totalAvailable: number;
  timeZone: string;
}

/**
 * Badges earned (§19): name, what it was for, and when, newest first. Tier changes only the ring weight (no
 * confetti, no gamified noise). Honest empty state for new students. Server component.
 */
export function AchievementList({ earned, totalAvailable, timeZone }: AchievementListProps) {
  if (earned.length === 0) {
    return (
      <EmptyState
        appearance="plain"
        titleAs="h3"
        icon={<Medal aria-hidden="true" />}
        title="No badges yet"
        description={
          totalAvailable > 0
            ? `There ${totalAvailable === 1 ? "is 1 badge" : `are ${totalAvailable} badges`} to earn, for streaks, practice, mastery and exams.`
            : "Badges for streaks, practice, mastery and exams will appear here."
        }
      />
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {earned.map((achievement) => {
        const Icon = ICONS[achievement.iconKey] ?? Medal;
        return (
          <li key={achievement.achievementId} className="flex items-start gap-3 rounded-control border border-border p-3">
            <span
              aria-hidden="true"
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-5",
                TIER_RING[achievement.tier] ?? TIER_RING[1],
              )}
            >
              <Icon />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text">{achievement.name}</p>
              <p className="text-sm text-muted">{achievement.description}</p>
              <p className="mt-1 text-xs text-muted">Earned {formatInstantDate(achievement.unlockedAt, timeZone)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
