import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Secondary navigation across the curriculum admin (some pages, such as countries, levels, year groups, categories,
 * exam sessions and grade schemes, are not in the main sidebar). Wraps instead of scrolling sideways. Server component.
 */

export type CurriculumArea =
  | "boards"
  | "countries"
  | "qualifications"
  | "levels"
  | "year-groups"
  | "subjects"
  | "categories"
  | "syllabuses"
  | "topics"
  | "exam-sessions"
  | "grade-schemes";

const LINKS: readonly { area: CurriculumArea; href: string; label: string }[] = [
  { area: "boards", href: "/admin/boards", label: "Boards" },
  { area: "countries", href: "/admin/boards/countries", label: "Countries" },
  { area: "qualifications", href: "/admin/qualifications", label: "Qualifications" },
  { area: "levels", href: "/admin/qualifications/levels", label: "Levels" },
  { area: "year-groups", href: "/admin/qualifications/year-groups", label: "Year groups" },
  { area: "subjects", href: "/admin/subjects", label: "Subjects" },
  { area: "categories", href: "/admin/subjects/categories", label: "Categories" },
  { area: "syllabuses", href: "/admin/syllabuses", label: "Syllabus versions" },
  { area: "topics", href: "/admin/topics", label: "Topic search" },
  { area: "exam-sessions", href: "/admin/exam-sessions", label: "Exam sessions" },
  { area: "grade-schemes", href: "/admin/grade-schemes", label: "Grade schemes" },
];

export function CurriculumSubnav({ active, className }: { active: CurriculumArea; className?: string }) {
  return (
    <nav aria-label="Curriculum sections" className={cn("mb-5", className)}>
      <ul className="flex flex-wrap gap-1.5">
        {LINKS.map((link) => {
          const current = link.area === active;
          return (
            <li key={link.area}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-3 text-sm font-medium transition-colors",
                  current ? "border-transparent bg-primary-soft text-on-primary-soft" : "border-border text-muted hover:border-border-strong hover:text-text",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Honest notice for content editors on catalogue pages they may read but not change. */
export function ReadOnlyNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="mb-4 rounded-card border border-border bg-subtle px-4 py-3 text-sm text-muted">
      {children ?? "You can view the catalogue. Changes to boards, qualifications and subjects are made by an admin."}
    </p>
  );
}
