import { Plus, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { listTeacherClasses } from "@/server/teaching/classes";
import { formatJoinCode } from "@/server/teaching/core";

export const metadata: Metadata = { title: "Classes" };

/** Every class the teacher teaches, including archived ones (§22). */
export default async function TeacherClassesPage({ searchParams }: { searchParams: Promise<{ archived?: string }> }) {
  const actor = await requireRole("TEACHER", { next: "/teacher/classes" });
  const { archived } = await searchParams;
  const includeArchived = archived === "1";
  const classes = await listTeacherClasses(actor, { includeArchived });

  return (
    <Container className="space-y-4 pb-10">
      <PageHeader
        title="Classes"
        description="Classes you lead or co-teach."
        actions={
          <>
            <ButtonLink href={includeArchived ? "/teacher/classes" : "/teacher/classes?archived=1"} variant="outline">
              {includeArchived ? "Hide archived" : "Show archived"}
            </ButtonLink>
            <ButtonLink href="/teacher/classes/new" iconStart={<Plus aria-hidden="true" />}>
              New class
            </ButtonLink>
          </>
        }
        className="pb-0"
      />
      <DataTable
        caption="Your classes"
        rows={classes}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<UsersRound aria-hidden="true" />}
            title="No classes yet"
            description="Create a class to start setting work."
            action={<ButtonLink href="/teacher/classes/new">Create a class</ButtonLink>}
          />
        }
        columns={[
          {
            key: "name",
            header: "Class",
            primary: true,
            cell: (row) => (
              <span className="inline-flex flex-wrap items-center gap-2">
                <Link href={`/teacher/classes/${row.id}`} className="font-semibold text-text hover:underline">
                  {row.name}
                </Link>
                {row.archived && <Badge tone="neutral">Archived</Badge>}
                {row.role === "ASSISTANT" && <Badge tone="info">Co-teacher</Badge>}
              </span>
            ),
          },
          { key: "context", header: "School · subject", cell: (row) => `${row.schoolName ?? "Independent"} · ${row.subjectName ?? "Any subject"}` },
          { key: "year", header: "Year", cell: (row) => row.academicYear, hideOnMobile: true },
          { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.activeStudents) },
          {
            key: "requests",
            header: "Join requests",
            align: "end",
            cell: (row) => (row.pendingRequests > 0 ? <Badge tone="warning">{formatNumber(row.pendingRequests)}</Badge> : "—"),
          },
          { key: "code", header: "Join code", cell: (row) => (row.joinCode ? <span className="font-mono">{formatJoinCode(row.joinCode)}</span> : "Off"), hideOnMobile: true },
        ]}
      />
    </Container>
  );
}
