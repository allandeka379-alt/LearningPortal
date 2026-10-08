import Link from "next/link";
import { redirect } from "next/navigation";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection } from "@/components/admin/DetailParts";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { NewVersionForm } from "@/components/admin/curriculum/SyllabusForms";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, getNewVersionDefaults, listSubjects } from "@/server/cms/curriculum";
import { createSyllabusVersionAction } from "../actions";

export const metadata = { title: "New syllabus version" };

const STATUS_WORD: Readonly<Record<string, string>> = { DRAFT: "draft", UPCOMING: "upcoming", CURRENT: "current", SUPERSEDED: "superseded", ARCHIVED: "archived" };

/**
 * /admin/syllabuses/new?subjectId= — create a DRAFT version, optionally copying another version's structure with
 * lineage (§26). Without a subject: pick one first.
 */
export default async function NewSyllabusVersionPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/syllabuses/new" });
  if (!curriculumAccess(actor).canDraft) redirect("/admin/syllabuses");
  const params = await searchParams;
  const subjectId = firstParam(params, "subjectId");

  if (!subjectId) {
    const q = firstParam(params, "q");
    const page = await loadFirstPageOnStaleCursor({ q, cursor: firstParam(params, "cursor") }, (f) => listSubjects(actor, f));
    return (
      <Container size="wide">
        <PageHeader title="New syllabus version" breadcrumbs={[{ label: "Syllabus versions", href: "/admin/syllabuses" }, { label: "New" }]} description="Choose the subject the version belongs to." />
        <FilterBar action="/admin/syllabuses/new" search={{ label: "Find a subject", placeholder: "Subject name or code", value: q }} />
        {page.items.length === 0 ? (
          <EmptyState title="No subjects match" titleAs="p" />
        ) : (
          <ul className="divide-y divide-border rounded-card border border-border bg-surface">
            {page.items.map((subject) => (
              <li key={subject.id}>
                <Link href={`/admin/syllabuses/new?subjectId=${subject.id}`} className="flex min-h-11 flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-subtle">
                  <span className="font-medium text-primary">{subject.name}</span>
                  <span className="text-sm text-muted">
                    {subject.qualification.examBoard.shortName} {subject.qualification.shortName} · {subject._count.syllabi} versions
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <CursorPagination path="/admin/syllabuses/new" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
      </Container>
    );
  }

  const defaults = await orNotFound(getNewVersionDefaults(actor, uuidParamOrNotFound(subjectId)));
  const from = firstParam(params, "from");
  const cloneFromId = from && defaults.versions.some((version) => version.id === from) ? from : defaults.defaultCloneFromId;
  return (
    <Container size="wide">
      <PageHeader
        title="New syllabus version"
        eyebrow={`${defaults.subject.boardShortName} · ${defaults.subject.qualificationShortName} · ${defaults.subject.name}`}
        breadcrumbs={[
          { label: "Subjects", href: "/admin/subjects" },
          { label: defaults.subject.name, href: `/admin/subjects/${subjectId}` },
          { label: "New version" },
        ]}
        description="The new version starts as a draft. Copyright must be cleared again for each version before it is published."
      />
      <AdminSection title="Version">
        <NewVersionForm
          action={createSyllabusVersionAction}
          subjectId={subjectId}
          versions={defaults.versions.map((version) => ({ value: version.id, label: `Copy of ${version.versionLabel} (${STATUS_WORD[version.status] ?? version.status})` }))}
          defaults={{ versionLabel: defaults.suggestedLabel, title: defaults.suggestedTitle, code: defaults.suggestedCode, cloneFromId }}
          cancelHref={`/admin/subjects/${subjectId}`}
        />
      </AdminSection>
    </Container>
  );
}
