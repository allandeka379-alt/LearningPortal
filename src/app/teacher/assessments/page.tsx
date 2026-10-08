import { FileQuestion, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireRole } from "@/server/auth/guards";
import { listTeacherTests } from "@/server/teaching/test-builder";

export const metadata: Metadata = { title: "Tests" };

const KIND_LABELS: Record<string, string> = { QUIZ: "Quiz", TOPIC_TEST: "Topic test", CHAPTER_TEST: "Chapter test", SUBJECT_TEST: "Subject test" };

/** Tests made by the teacher and their schools' colleagues (§22 "create tests"). Platform tests are set directly. */
export default async function TeacherTestsPage() {
  const actor = await requireRole("TEACHER", { next: "/teacher/assessments" });
  const tests = await listTeacherTests(actor);
  return (
    <Container className="space-y-4 pb-10">
      <PageHeader
        title="Tests"
        description="Your school's tests and your own. Published tests can be set to classes; published platform tests can be set too."
        actions={
          <ButtonLink href="/teacher/assessments/new" iconStart={<Plus aria-hidden="true" />}>
            New test
          </ButtonLink>
        }
        className="pb-0"
      />
      <DataTable
        caption="Tests"
        rows={tests}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<FileQuestion aria-hidden="true" />}
            title="No tests yet"
            description="Build a test from bank questions and your own, then set it to a class."
            action={<ButtonLink href="/teacher/assessments/new">Create a test</ButtonLink>}
          />
        }
        columns={[
          {
            key: "title",
            header: "Test",
            primary: true,
            cell: (row) => (
              <Link href={`/teacher/assessments/${row.id}`} className="font-semibold text-text hover:underline">
                {row.title}
              </Link>
            ),
          },
          { key: "status", header: "Status", cell: (row) => <Badge tone={row.status === "PUBLISHED" ? "success" : "neutral"}>{row.status === "PUBLISHED" ? "Published" : "Draft"}</Badge> },
          { key: "subject", header: "Subject", cell: (row) => `${row.subjectName} · ${KIND_LABELS[row.kind] ?? row.kind}` },
          { key: "owner", header: "Owner", cell: (row) => row.ownerName, hideOnMobile: true },
          { key: "size", header: "Questions", align: "end", cell: (row) => `${row.questionCount} · ${row.totalMarks} marks` },
          { key: "updated", header: "Updated", cell: (row) => `${formatDate(row.updatedAt, actor.timeZone)}${row.author && !row.isMine ? ` · ${row.author}` : ""}`, hideOnMobile: true },
        ]}
      />
    </Container>
  );
}
