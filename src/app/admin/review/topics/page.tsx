import { FolderTree } from "lucide-react";
import Link from "next/link";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { getReviewTopicTree, listReviewSyllabi } from "@/server/cms/review/topics";
import { orNotFound } from "../_lib/load";

export const metadata = { title: "Review by topic" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * /admin/review/topics — review content topic by topic (bulk content pipeline, docs/CONTENT_PIPELINE.md): choose a
 * syllabus version, then a topic; the topic page shows everything waiting in its subtree on one page.
 */
export default async function ReviewByTopicPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.review", { next: "/admin/review/topics" });
  const params = await searchParams;
  const syllabusParam = firstParam(params, "syllabus");
  const syllabusId = syllabusParam && UUID.test(syllabusParam) ? syllabusParam : null;
  const breadcrumbs = [
    { label: "Admin", href: "/admin" },
    { label: "Review queue", href: "/admin/review" },
    ...(syllabusId ? [{ label: "By topic", href: "/admin/review/topics" }] : [{ label: "By topic" }]),
  ];

  if (!syllabusId) {
    const syllabi = await listReviewSyllabi(actor);
    return (
      <Container size="wide">
        <PageHeader
          title="Review by topic"
          breadcrumbs={breadcrumbs}
          description="Choose a syllabus version to see how many items wait for review in each topic. A topic page shows every waiting lesson, question, flashcard and test of that topic in full, so you can read them in one go."
        />
        <DataTable
          caption="Syllabus versions"
          rows={syllabi}
          rowKey={(row) => row.id}
          empty={<EmptyState icon={<FolderTree aria-hidden="true" />} title="No syllabus versions yet" />}
          columns={[
            {
              key: "syllabus",
              header: "Syllabus version",
              primary: true,
              cell: (row) => (
                <span className="block min-w-0">
                  <Link href={`/admin/review/topics?syllabus=${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                    {row.title}
                  </Link>
                  <span className="mt-0.5 block text-sm text-muted">
                    {row.board} {row.qualification} · {row.subject} · {row.versionLabel}
                  </span>
                </span>
              ),
            },
            { key: "status", header: "Status", hideOnMobile: true, cell: (row) => <StatusBadge kind="syllabus" status={row.status} /> },
            {
              key: "waiting",
              header: "Waiting",
              cell: (row) =>
                row.waiting > 0 ? (
                  <Badge tone="warning" size="sm">
                    {formatNumber(row.waiting)} to review
                  </Badge>
                ) : (
                  <span className="text-sm text-muted">None</span>
                ),
            },
          ]}
        />
        <div className="mb-12" />
      </Container>
    );
  }

  const tree = await orNotFound(getReviewTopicTree(actor, syllabusId));
  return (
    <Container size="wide">
      <PageHeader
        title={tree.syllabus.title}
        eyebrow={`Review by topic · ${tree.syllabus.versionLabel}`}
        breadcrumbs={[...breadcrumbs, { label: tree.syllabus.title }]}
        description={`${formatNumber(tree.syllabus.waiting)} item${tree.syllabus.waiting === 1 ? "" : "s"} waiting for review or publication in this version. Open a topic to read everything under it.`}
      />
      {tree.topics.length === 0 ? (
        <EmptyState icon={<FolderTree aria-hidden="true" />} title="This version has no topics yet" />
      ) : (
        <nav aria-label="Topics" className="mb-12">
          <ul className="divide-y divide-border rounded-card border border-border bg-surface">
            {tree.topics.map((topic) => (
              <li key={topic.id} className="flex min-h-11 items-center gap-3 px-4 py-2" style={{ paddingLeft: `${1 + topic.depth * 1.25}rem` }}>
                <Link
                  href={`/admin/review/topics/${topic.id}`}
                  className={cn(
                    "min-w-0 flex-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                    topic.depth === 0 ? "font-semibold text-text" : "text-text",
                    topic.total === 0 && "text-muted",
                  )}
                >
                  {topic.code ? <span className="mr-2 tabular-nums text-muted">{topic.code}</span> : null}
                  {topic.name}
                </Link>
                {topic.total > 0 ? (
                  <Badge tone="warning" size="sm">
                    {formatNumber(topic.total)} waiting
                  </Badge>
                ) : (
                  <span className="text-xs text-muted">nothing waiting</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Container>
  );
}
