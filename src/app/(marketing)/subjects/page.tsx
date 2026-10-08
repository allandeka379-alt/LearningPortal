import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMarketingCatalogue } from "@/server/marketing/catalogue";
import { qualificationLabel } from "@/server/marketing/catalogue-core";
import { marketingMetadata } from "@/server/marketing/metadata";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return marketingMetadata({
    title: "Subjects",
    description: "ZIMSEC and Cambridge O-Level and A-Level subjects you can study: lessons, practice questions and mock exams by syllabus.",
    path: "/subjects",
  });
}

/**
 * /subjects: the catalogue by qualification (board order), each with its available subjects grouped by category and
 * linked to their public syllabus pages (§44). Qualifications that are listed but not open yet say so honestly.
 */
export default async function SubjectsPage() {
  const { subjectsByQualification } = await getMarketingCatalogue();

  return (
    <>
      <Container className="pb-12 sm:pb-16">
        <PageHeader
          eyebrow="Subjects"
          title="Find your subjects"
          description="Choose your qualification to see its subjects. Each one follows that board's syllabus, topic by topic."
        />
        {subjectsByQualification.length === 0 ? (
          <EmptyState icon={<BookOpen aria-hidden="true" />} title="Subjects are being prepared" description="Subjects appear here once their syllabus and content are published." />
        ) : (
          <>
            <nav aria-label="Qualifications" className="mb-10">
              <ul className="flex flex-wrap gap-2">
                {subjectsByQualification.map(({ qualification }) => (
                  <li key={qualification.id}>
                    <a
                      href={`#q-${qualification.board.slug}-${qualification.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-text transition-colors hover:border-border-strong"
                    >
                      {qualificationLabel(qualification.board.shortName, qualification.shortName)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-12">
              {subjectsByQualification.map(({ qualification, categories }) => {
                const anchor = `q-${qualification.board.slug}-${qualification.slug}`;
                return (
                  <section key={qualification.id} id={anchor} aria-labelledby={`${anchor}-heading`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 id={`${anchor}-heading`} className="text-2xl font-bold tracking-tight text-text">
                        {qualification.name}
                      </h2>
                      {qualification.comingSoon && <Badge tone="neutral">Coming soon</Badge>}
                    </div>
                    {qualification.summary && <p className="mt-2 max-w-2xl text-muted">{qualification.summary}</p>}
                    {categories.length === 0 ? (
                      <p className="mt-4 text-sm text-muted">
                        {qualification.comingSoon ? "Subjects for this qualification are on the way." : "No subjects are open for study here yet."}
                      </p>
                    ) : (
                      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map(({ category, subjects }) => (
                          <div key={category.id} className="rounded-card border border-border bg-surface p-5">
                            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">{category.name}</h3>
                            <ul className="mt-2">
                              {subjects.map((subject) => (
                                <li key={subject.id}>
                                  {subject.href ? (
                                    <Link
                                      href={subject.href}
                                      className="flex min-h-11 items-center justify-between gap-3 rounded-control text-base font-medium text-text underline-offset-4 hover:text-primary hover:underline"
                                    >
                                      {subject.name}
                                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                                    </Link>
                                  ) : (
                                    <span className="flex min-h-11 items-center text-base text-text">{subject.name}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    {qualification.href && (
                      <Link href={qualification.href} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                        About {qualificationLabel(qualification.board.shortName, qualification.shortName)}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        )}
      </Container>
      <FinalCta />
    </>
  );
}
