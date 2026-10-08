import Link from "next/link";
import { cn } from "@/lib/cn";
import type { DailyQualificationOption } from "@/server/marketing/daily";

/** Qualification selector for the public daily question: one link per listed qualification. */
export function DailyQualificationNav({ options, currentId }: { options: readonly DailyQualificationOption[]; currentId?: string }) {
  if (options.length === 0) return null;
  return (
    <nav aria-label="Choose your qualification">
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => {
          const current = option.qualificationId === currentId;
          return (
            <li key={option.qualificationId}>
              <Link
                href={option.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                  current ? "border-primary bg-primary-soft text-on-primary-soft" : "border-border bg-surface text-text hover:border-border-strong",
                )}
              >
                {option.label}
                {option.questionCount === 0 && <span className="text-xs font-normal text-muted">· none today</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
