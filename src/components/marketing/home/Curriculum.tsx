import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import type { MarketingBoard, MarketingLevel, MarketingQualification, SubjectCategoryEntry } from "@/server/marketing/catalogue-core";
import { qualificationLabel } from "@/server/marketing/catalogue-core";
import { Section } from "../Section";

/** Joins names as prose: "ZIMSEC", "ZIMSEC and Cambridge", "A, B and C". */
export function joinNames(names: readonly string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function QualificationLink({ qualification, label }: { qualification: MarketingQualification; label: string }) {
  const content = (
    <>
      <span className="min-w-0 flex-1 font-medium">{label}</span>
      {qualification.comingSoon ? (
        <Badge tone="neutral" size="sm">
          Coming soon
        </Badge>
      ) : (
        qualification.href && <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
      )}
    </>
  );
  const classes = "flex min-h-11 items-center gap-3 rounded-control border border-border bg-bg px-3.5 py-2 text-sm text-text";
  return qualification.href ? (
    <Link href={qualification.href} className={cn(classes, "transition-colors hover:border-border-strong hover:bg-subtle")}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
}

/** ZIMSEC and Cambridge (§45): one card per listed board with its qualifications, from the catalogue. */
export function BoardsSection({ boards }: { boards: readonly MarketingBoard[] }) {
  if (boards.length === 0) return null;
  return (
    <Section
      id="boards"
      tone="surface"
      eyebrow="Examination boards"
      title={joinNames(boards.map((b) => b.shortName))}
      description="Each board's syllabus is set up on its own, so what you study matches the papers you will actually sit."
    >
      <ul className={cn("grid gap-5", boards.length > 1 && "md:grid-cols-2")}>
        {boards.map((board) => (
          <li key={board.id} className="flex flex-col rounded-card border border-border bg-bg p-5 sm:p-6">
            <p className="text-sm font-semibold text-primary">{board.shortName}</p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-text">{board.name}</h3>
            {board.summary && <p className="mt-2 text-sm leading-relaxed text-muted">{board.summary}</p>}
            <ul className="mt-5 grid gap-2">
              {board.qualifications.map((qualification) => (
                <li key={qualification.id}>
                  <QualificationLink qualification={qualification} label={qualification.name} />
                </li>
              ))}
            </ul>
            {board.href && (
              <Link href={board.href} className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline">
                Explore {board.shortName}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** O-Level and A-Level (§45): cross-board levels with the qualifications under each. */
export function LevelsSection({ levels }: { levels: readonly MarketingLevel[] }) {
  if (levels.length === 0) return null;
  return (
    <Section
      id="levels"
      eyebrow="Levels"
      title={joinNames(levels.map((l) => l.name))}
      description="Choose your level once. Your dashboard, practice and mock exams follow the qualification you are studying for."
    >
      <ul className={cn("grid gap-5", levels.length > 1 && "md:grid-cols-2")}>
        {levels.map((level) => (
          <li key={level.id} className="rounded-card border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-5">
                <GraduationCap />
              </span>
              <h3 className="text-xl font-bold tracking-tight text-text">{level.name}</h3>
            </div>
            <ul className="mt-5 grid gap-2">
              {level.qualifications.map((qualification) => (
                <li key={qualification.id}>
                  <QualificationLink qualification={qualification} label={qualificationLabel(qualification.board.shortName, qualification.shortName)} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Subject directory grouped by category; each subject links to its public page per qualification. */
export function SubjectDirectory({ categories, headingLevel = 3 }: { categories: readonly SubjectCategoryEntry[]; headingLevel?: 2 | 3 }) {
  if (categories.length === 0) {
    return (
      <EmptyState
        titleAs={headingLevel === 2 ? "h2" : "h3"}
        title="Subjects are being prepared"
        description="Subjects appear here as soon as their courses are published."
      />
    );
  }
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map(({ category, subjects }) => (
        <li key={category.id} className="rounded-card border border-border bg-surface p-5">
          <Heading className="text-sm font-semibold tracking-wide text-primary uppercase">{category.name}</Heading>
          <ul className="mt-3 divide-y divide-border">
            {subjects.map((subject) => (
              <li key={subject.name} className="py-3 first:pt-1 last:pb-0">
                <p className="font-semibold text-text">{subject.name}</p>
                <ul className="mt-1.5 flex flex-wrap gap-x-1 gap-y-1" aria-label={`${subject.name} is offered for`}>
                  {subject.offerings.map((offering) => (
                    <li key={offering.subjectId}>
                      {offering.href ? (
                        <Link
                          href={offering.href}
                          className="inline-flex min-h-11 items-center rounded-full px-2 text-sm text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary sm:pointer-fine:min-h-9"
                        >
                          {offering.label}
                          <span className="sr-only"> {subject.name}</span>
                        </Link>
                      ) : (
                        <span className="inline-flex min-h-9 items-center px-2 text-sm text-muted">{offering.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/** Subjects (§45): categories and subject names from the catalogue (available subjects only). */
export function SubjectsSection({ categories }: { categories: readonly SubjectCategoryEntry[] }) {
  return (
    <Section
      id="subjects"
      tone="surface"
      eyebrow="Subjects"
      title="Courses you can start today"
      description="Every subject is a full course that follows its own board's syllabus. New subjects and lessons are added as they are written."
      action={
        <Link href="/subjects" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">
          All subjects
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      }
    >
      <SubjectDirectory categories={categories} />
    </Section>
  );
}
