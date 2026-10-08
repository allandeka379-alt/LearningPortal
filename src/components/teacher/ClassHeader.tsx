import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/cn";

export type ClassSection = "overview" | "students" | "assignments" | "announcements";

const SECTIONS: { key: ClassSection; label: string; path: string }[] = [
  { key: "overview", label: "Performance", path: "" },
  { key: "students", label: "Students", path: "/students" },
  { key: "assignments", label: "Assignments", path: "/assignments" },
  { key: "announcements", label: "Announcements", path: "/announcements" },
];

export interface ClassHeaderProps {
  cls: { id: string; name: string; schoolName: string | null; subjectName: string | null; academicYear: string; archivedAt: Date | null };
  /** The section this page belongs to (marked current in the class navigation). */
  section: ClassSection;
  /** Page title when not the class name itself (e.g. a student or an assignment). */
  title?: ReactNode;
  description?: ReactNode;
  /** Extra crumbs after the class. */
  trail?: readonly BreadcrumbItem[];
  actions?: ReactNode;
}

/**
 * Heading of every class page: breadcrumbs, the class context line (school · subject · year), an archived badge and
 * the class navigation (a list of links with `aria-current`, wrapping on phones — never a horizontal scroller).
 */
export function ClassHeader({ cls, section, title, description, trail = [], actions }: ClassHeaderProps) {
  const base = `/teacher/classes/${cls.id}`;
  const context = [cls.schoolName ?? "Independent tutor class", cls.subjectName ?? "Any subject", cls.academicYear].join(" · ");
  return (
    <div className="space-y-2">
      <PageHeader
        breadcrumbs={[{ label: "Classes", href: "/teacher/classes" }, { label: cls.name, href: base }, ...trail]}
        eyebrow={context}
        title={
          <span className="inline-flex flex-wrap items-center gap-2">
            {title ?? cls.name}
            {cls.archivedAt && <Badge tone="neutral">Archived</Badge>}
          </span>
        }
        description={description}
        actions={actions}
        className="pb-2"
      />
      <nav aria-label="Class sections">
        <ul className="flex flex-wrap gap-2 border-b border-border pb-3">
          {SECTIONS.map((item) => {
            const current = item.key === section;
            return (
              <li key={item.key}>
                <Link
                  href={`${base}${item.path}`}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-control px-3 text-sm font-semibold transition-colors",
                    current ? "bg-primary-soft text-on-primary-soft" : "text-muted hover:bg-subtle hover:text-text",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
