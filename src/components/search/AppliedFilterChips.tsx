import { X } from "lucide-react";
import Link from "next/link";

export interface FilterChip {
  key: string;
  /** Kind shown before the value, e.g. "Subject". */
  kindLabel: string;
  /** Value from catalogue data, e.g. "Mathematics". */
  label: string;
  /** Link that searches again without this filter. */
  removeHref: string;
  /** True when the filter was recognised in the typed words (query understanding). */
  detected: boolean;
}

/**
 * Filters in effect (§28 "search understands subject, topic, qualification, board"): chips for what the search
 * recognised in the typed words ("o level maths" → Level: O-Level, Subject: Mathematics) and for filters picked in the
 * UI. Each chip is a link that searches again without it (works without JavaScript). Server component.
 */
export function AppliedFilterChips({ chips }: { chips: readonly FilterChip[] }) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-sm text-muted">Filtered by</p>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.key}>
            <Link
              href={chip.removeHref}
              aria-label={`Remove filter: ${chip.kindLabel} ${chip.label}`}
              className="group relative inline-flex min-h-9 max-w-full items-center after:absolute after:inset-x-0 after:-inset-y-1 gap-1.5 rounded-full border border-border bg-surface py-1 pr-1.5 pl-3 text-sm text-text transition-colors hover:border-border-strong hover:bg-subtle"
            >
              <span className="text-muted">{chip.kindLabel}:</span>
              <span className="truncate font-medium">{chip.label}</span>
              <span className="inline-flex size-6 items-center justify-center rounded-full text-muted group-hover:text-text">
                <X aria-hidden="true" className="size-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
