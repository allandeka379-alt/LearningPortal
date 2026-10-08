import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { SyllabusStatusBadge, TopicKindBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav } from "@/components/admin/curriculum/CurriculumSubnav";
import { TOPIC_KIND_LABEL } from "@/components/admin/curriculum/labels";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { searchTopics, type TopicSearchRow } from "@/server/cms/curriculum";

export const metadata = { title: "Topic search" };

/** /admin/topics — find topics and subtopics across every syllabus version; editing happens in each version's tree. */
export default async function TopicSearchPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/topics" });
  const params = await searchParams;
  const filter = {
    q: firstParam(params, "q"),
    kind: firstParam(params, "kind"),
    subjectId: firstParam(params, "subjectId"),
    syllabusId: firstParam(params, "syllabusId"),
    cursor: firstParam(params, "cursor"),
  };
  const searching = Boolean(filter.q || filter.subjectId || filter.syllabusId);
  const page = searching ? await searchTopics(actor, filter) : { items: [] as TopicSearchRow[], nextCursor: null };

  return (
    <Container size="wide">
      <PageHeader
        title="Topic search"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Topics" }]}
        description="Topics belong to one syllabus version. Open a result to edit it in that version's topic tree."
      />
      <CurriculumSubnav active="topics" />
      <FilterBar
        action="/admin/topics"
        keep={{ subjectId: filter.subjectId, syllabusId: filter.syllabusId }}
        search={{ label: "Search topics", placeholder: "Name, reference or slug", value: filter.q }}
        filters={[{ kind: "select", name: "kind", label: "Kind", options: Object.entries(TOPIC_KIND_LABEL).map(([value, label]) => ({ value, label })), value: filter.kind }]}
      />
      {!searching ? (
        <EmptyState title="Search for a topic" description="Type part of a topic name, its official reference (e.g. 1.2) or its slug." titleAs="p" />
      ) : (
        <>
          <DataTable<TopicSearchRow>
            caption="Matching topics"
            rows={page.items}
            rowKey={(row) => row.id}
            empty={<EmptyState title="No topics match" titleAs="p" />}
            columns={[
              {
                key: "topic",
                header: "Topic",
                primary: true,
                cell: (row) => (
                  <Link href={`/admin/syllabuses/${row.syllabus.id}/topics`} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {row.code && <span className="mr-1.5 font-mono font-normal text-muted">{row.code}</span>}
                    {row.name}
                  </Link>
                ),
              },
              { key: "kind", header: "Kind", cell: (row) => <TopicKindBadge kind={row.kind} /> },
              {
                key: "version",
                header: "Syllabus version",
                cell: (row) => (
                  <span className="inline-flex flex-wrap items-center gap-1.5">
                    {row.syllabus.subject.qualification.examBoard.shortName} {row.syllabus.subject.qualification.shortName} {row.syllabus.subject.name} · {row.syllabus.versionLabel}
                    <SyllabusStatusBadge status={row.syllabus.status} />
                  </span>
                ),
              },
              { key: "slug", header: "Slug", cell: (row) => <span className="font-mono text-sm">{row.slug}</span>, hideOnMobile: true },
              { key: "objectives", header: "Objectives", align: "end", cell: (row) => row._count.objectives, hideOnMobile: true },
              { key: "tags", header: "Question / lesson tags", align: "end", cell: (row) => `${row._count.questionTopics} / ${row._count.lessonTopics}` },
            ]}
          />
          <CursorPagination path="/admin/topics" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
        </>
      )}
    </Container>
  );
}
