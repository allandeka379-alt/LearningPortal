import Link from "next/link";
import type { LeaderboardMetric, LeaderboardScope } from "@/generated/prisma/client";
import { cn } from "@/lib/cn";
import { METRIC_COPY, SCOPE_COPY, leaderboardHref } from "./labels";

export interface LeaderboardTabsProps {
  metric: LeaderboardMetric;
  metrics: readonly LeaderboardMetric[];
  scope: { scope: LeaderboardScope; scopeId: string | null };
  scopes: readonly { scope: LeaderboardScope; scopeId: string | null; label: string }[];
}

const PILL =
  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

function pillClass(active: boolean): string {
  return cn(PILL, active ? "border-primary bg-primary text-on-primary" : "border-border bg-surface text-text hover:bg-subtle");
}

/**
 * Metric and scope switchers for the leaderboard (§20). Plain links (each board has its own URL, no client JavaScript),
 * wrapping onto new lines on phones instead of scrolling sideways. The current choice is marked `aria-current`.
 */
export function LeaderboardTabs({ metric, metrics, scope, scopes }: LeaderboardTabsProps) {
  return (
    <div className="space-y-4">
      <nav aria-label="Leaderboard measure">
        <ul className="flex flex-wrap gap-2">
          {metrics.map((m) => (
            <li key={m}>
              <Link href={leaderboardHref({ metric: m })} aria-current={m === metric ? "page" : undefined} className={pillClass(m === metric)}>
                {METRIC_COPY[m].label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {scopes.length > 1 && (
        <nav aria-label="Who you're compared with">
          <ul className="flex flex-wrap gap-2">
            {scopes.map((option) => {
              const active = option.scope === scope.scope && option.scopeId === scope.scopeId;
              return (
                <li key={`${option.scope}:${option.scopeId ?? ""}`}>
                  <Link
                    href={leaderboardHref({ metric, scope: option.scope, scopeId: option.scopeId })}
                    aria-current={active ? "page" : undefined}
                    className={cn(pillClass(active), "max-w-full")}
                  >
                    <span className="sr-only">{SCOPE_COPY[option.scope]}: </span>
                    <span className="truncate">{option.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
