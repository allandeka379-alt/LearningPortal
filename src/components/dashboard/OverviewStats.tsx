import { Award, Flame, Gauge, ListChecks, Percent, Target } from "lucide-react";
import { StatTile } from "@/components/ui/StatTile";
import { formatCount, formatNumber, formatPercent } from "@/lib/format";

export interface OverviewStatsProps {
  overall: { progressPercent: number | null; topicsTotal: number; topicsCompleted: number; topicsRemaining: number };
  questionsAttempted: number;
  questionsCorrect: number;
  accuracyPercent: number | null;
  averageScorePercent: number | null;
  streak: { current: number; longest: number };
}

/**
 * §6 headline numbers: overall progress (topics completed / remaining), questions attempted, accuracy, average
 * test score and streak. Every value is computed by the service; unknown values render as an em dash with "No data
 * yet" for screen readers (§50). Server component.
 */
export function OverviewStats({ overall, questionsAttempted, questionsCorrect, accuracyPercent, averageScorePercent, streak }: OverviewStatsProps) {
  const hasTopics = overall.topicsTotal > 0;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      <StatTile
        label="Overall progress"
        icon={<Gauge aria-hidden="true" />}
        value={hasTopics && overall.progressPercent !== null ? formatPercent(overall.progressPercent) : null}
        hint={hasTopics ? `${formatNumber(overall.topicsCompleted)} of ${formatCount(overall.topicsTotal, "topic")} completed` : "No topics yet"}
      />
      <StatTile
        label="Topics remaining"
        icon={<ListChecks aria-hidden="true" />}
        value={hasTopics ? overall.topicsRemaining : null}
        hint={hasTopics ? "Across your subjects" : undefined}
      />
      <StatTile
        label="Questions attempted"
        icon={<Target aria-hidden="true" />}
        value={questionsAttempted}
        hint={questionsAttempted > 0 ? `${formatNumber(questionsCorrect)} correct` : "Start practising to see this grow"}
      />
      <StatTile
        label="Accuracy"
        icon={<Percent aria-hidden="true" />}
        value={accuracyPercent === null ? null : formatPercent(accuracyPercent)}
        hint={accuracyPercent === null ? "Answer a few questions first" : "Of the questions you answered"}
      />
      <StatTile
        label="Average score"
        icon={<Award aria-hidden="true" />}
        value={averageScorePercent === null ? null : formatPercent(averageScorePercent)}
        hint={averageScorePercent === null ? "Shown after your first test" : "Tests and mock exams"}
      />
      <StatTile
        label="Study streak"
        icon={<Flame aria-hidden="true" />}
        value={streak.current}
        unit={streak.current === 1 ? "day" : "days"}
        hint={streak.longest > 0 ? `Longest: ${formatCount(streak.longest, "day")}` : "Meet your daily goal to start one"}
      />
    </div>
  );
}
