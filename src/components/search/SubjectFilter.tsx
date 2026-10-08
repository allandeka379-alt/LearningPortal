import Link from "next/link";
import { cn } from "@/lib/cn";

export interface SubjectFilterOption {
  id: string;
  name: string;
}

export interface SubjectFilterProps {
  /** The student's own subjects (real enrolments). */
  subjects: readonly SubjectFilterOption[];
  /** The subject the results are limited to, if any. */
  activeId: string | null;
  /** Link that searches again in one subject (`null` = all subjects); drops the page cursor. */
  hrefFor: (subjectId: string | null) => string;
}

/** Shown when it helps: the student takes several subjects, or one is already selected. */
export function shouldShowSubjectFilter(subjects: readonly SubjectFilterOption[], activeId: string | null): boolean {
  return subjects.length > 1 || (activeId !== null && subjects.some((subject) => subject.id === activeId));
}

/**
 * Narrow results to one of the student's subjects (`/app/search?subjectId=…`). Links, so each view has its own URL and
 * works without JavaScript; the current choice is marked with `aria-current`. Scrolls sideways inside itself on narrow
 * phones (never the page). Server component.
 */
export function SubjectFilter({ subjects, activeId, hrefFor }: SubjectFilterProps) {
  if (!shouldShowSubjectFilter(subjects, activeId)) return null;
  const options: { id: string | null; name: string }[] = [{ id: null, name: "All subjects" }, ...subjects];
  return (
    <nav aria-label="Filter by subject" className="-mx-4 sm:mx-0">
      <ul className="no-scrollbar relative flex gap-2 overflow-x-auto px-4 py-1 sm:flex-wrap sm:px-0">
        {options.map((option) => {
          const current = option.id === activeId;
          return (
            <li key={option.id ?? "all"} className="shrink-0">
              <Link
                href={hrefFor(option.id)}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "relative inline-flex min-h-9 items-center rounded-full border px-3 text-sm whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:-inset-y-1",
                  current
                    ? "border-primary bg-primary-soft font-semibold text-on-primary-soft"
                    : "border-border bg-surface text-text hover:border-border-strong hover:bg-subtle",
                )}
              >
                {option.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
