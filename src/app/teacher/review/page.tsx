import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDateTime } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber, pluralize } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { listTeacherClasses } from "@/server/teaching/classes";
import { listMarkingQueue } from "@/server/teaching/marking";

export const metadata: Metadata = { title: "Marking" };

/**
 * The marking queue (§22): handed-in work with answers waiting for a teacher (written answers, manual questions,
 * answers the AI was unsure about) from students in the teacher's classes, oldest first.
 */
export default async function MarkingQueuePage({ searchParams }: { searchParams: Promise<{ classId?: string; cursor?: string }> }) {
  const actor = await requireRole("TEACHER", { next: "/teacher/review" });
  const { classId: rawClassId, cursor } = await searchParams;
  const classId = rawClassId && isUuid(rawClassId) ? rawClassId : null;
  const [queue, classes] = await Promise.all([listMarkingQueue(actor, { classId, cursor: cursor ?? null }), listTeacherClasses(actor)]);

  return (
    <Container className="space-y-4 pb-10">
      <PageHeader
        title="Marking"
        description={
          queue.totalPendingAnswers > 0
            ? `${formatNumber(queue.totalPendingAnswers)} ${pluralize(queue.totalPendingAnswers, "answer")} waiting for you. Students see a provisional score until you mark them.`
            : "Answers that need a teacher's judgement appear here."
        }
        className="pb-0"
      />
      {classes.length > 1 && (
        <nav aria-label="Filter by class">
          <ul className="flex flex-wrap gap-2">
            <li>
              <ButtonLink href="/teacher/review" size="sm" variant={classId === null ? "secondary" : "ghost"} aria-current={classId === null ? "page" : undefined}>
                All classes
              </ButtonLink>
            </li>
            {classes.map((cls) => (
              <li key={cls.id}>
                <ButtonLink href={`/teacher/review?classId=${cls.id}`} size="sm" variant={classId === cls.id ? "secondary" : "ghost"} aria-current={classId === cls.id ? "page" : undefined}>
                  {cls.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <DataTable
        caption="Work waiting for marking"
        rows={queue.items}
        rowKey={(row) => row.attemptId}
        empty={<EmptyState icon={<CircleCheck aria-hidden="true" />} title="All caught up" description="Nothing is waiting for your marking." />}
        columns={[
          {
            key: "student",
            header: "Student",
            primary: true,
            cell: (row) => (
              <Link href={`/teacher/review/${row.attemptId}`} className="font-semibold text-text hover:underline">
                {row.studentName}
              </Link>
            ),
          },
          { key: "work", header: "Assignment", cell: (row) => `${row.assignmentTitle} · ${row.className}` },
          { key: "submitted", header: "Handed in", cell: (row) => formatDateTime(row.submittedAt, actor.timeZone) },
          { key: "pending", header: "To mark", align: "end", cell: (row) => <Badge tone="accent">{formatNumber(row.pendingAnswers)}</Badge> },
          {
            key: "open",
            header: "",
            align: "end",
            cell: (row) => (
              <ButtonLink href={`/teacher/review/${row.attemptId}`} size="sm" aria-label={`Mark ${row.studentName}'s ${row.assignmentTitle}`}>
                Mark
              </ButtonLink>
            ),
          },
        ]}
      />
      {queue.nextCursor && (
        <div className="flex justify-end">
          <ButtonLink href={`/teacher/review?${classId ? `classId=${classId}&` : ""}cursor=${encodeURIComponent(queue.nextCursor)}`} variant="outline">
            More
          </ButtonLink>
        </div>
      )}
    </Container>
  );
}
