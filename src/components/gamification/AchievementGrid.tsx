import { Award, Compass, Flame, Lock, Medal, Target, Timer, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

/** One badge as the page shows it (from the achievements read model). */
export interface AchievementGridItem {
  achievementId: string;
  name: string;
  description: string;
  tier: number;
  iconKey: string;
  xpReward: number;
  earned: boolean;
  unlockedAt: Date | null;
  criteria: string | null;
  progress: { current: number; target: number; unit: string } | null;
}

/** Icon keys used by achievement definitions (data); unknown keys fall back to a medal. */
const ICONS: Readonly<Record<string, LucideIcon>> = { flame: Flame, target: Target, timer: Timer, award: Award, compass: Compass, medal: Medal };

/** Tier changes only the ring weight: no confetti, no gamified noise (§19 "not childish"). */
const TIER_RING: Readonly<Record<number, string>> = { 1: "ring-1 ring-border", 2: "ring-2 ring-primary/40", 3: "ring-2 ring-accent" };

export interface AchievementGridProps {
  items: readonly AchievementGridItem[];
  timeZone: string;
  /** Heading level for badge names. */
  headingAs?: "h3" | "h4";
  /** Optional per-badge action (e.g. a Share button on earned badges). */
  action?: (item: AchievementGridItem) => ReactNode;
  emptyTitle: string;
  emptyDescription: string;
}

function progressText(progress: NonNullable<AchievementGridItem["progress"]>): string {
  return progress.unit === "%" ? `Best so far ${progress.current}% of ${progress.target}%` : `${formatNumber(progress.current)} of ${formatNumber(progress.target)} ${progress.unit}`;
}

/**
 * Badges (§19): earned ones with the date and what they were for; locked ones dimmed with the rule written out and the
 * student's real progress toward it. Server component (actions are passed in as rendered nodes).
 */
export function AchievementGrid({ items, timeZone, headingAs = "h3", action, emptyTitle, emptyDescription }: AchievementGridProps) {
  if (items.length === 0) {
    return <EmptyState appearance="plain" titleAs="p" icon={<Medal aria-hidden="true" />} title={emptyTitle} description={emptyDescription} />;
  }
  const Heading = headingAs;
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item) => {
        const Icon = item.earned ? (ICONS[item.iconKey] ?? Medal) : Lock;
        const extra = action?.(item);
        return (
          <li key={item.achievementId} className={cn("flex flex-col gap-3 rounded-card border border-border p-4", item.earned ? "bg-surface" : "bg-subtle")}>
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full [&_svg]:size-5",
                  item.earned ? "bg-primary-soft text-on-primary-soft" : "bg-surface text-muted",
                  item.earned && (TIER_RING[item.tier] ?? TIER_RING[1]),
                )}
              >
                <Icon />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <Heading className="flex flex-wrap items-center gap-2 text-sm font-semibold text-text">
                  {item.name}
                  {!item.earned && (
                    <Badge tone="neutral" size="sm">
                      Locked
                    </Badge>
                  )}
                </Heading>
                <p className="text-sm text-muted">{item.earned ? item.description : (item.criteria ?? item.description)}</p>
                {item.earned && item.unlockedAt ? (
                  <p className="text-xs text-muted">Earned {formatInstantDate(item.unlockedAt, timeZone, "long")}</p>
                ) : item.xpReward > 0 ? (
                  <p className="text-xs text-muted">Worth {formatNumber(item.xpReward)} XP</p>
                ) : null}
              </div>
            </div>
            {!item.earned && item.progress && (
              <ProgressBar
                label={`Progress toward ${item.name}`}
                labelHidden
                value={item.progress.current}
                max={item.progress.target}
                valueText={progressText(item.progress)}
                size="sm"
              />
            )}
            {extra ? <div className="flex flex-wrap gap-2">{extra}</div> : null}
          </li>
        );
      })}
    </ul>
  );
}
