import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { AdminSection } from "@/components/admin/DetailParts";
import { buildHref, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { defaultAcademicYear } from "@/server/teaching/core";
import { getClassFormOptions, listSchoolClasses } from "@/server/schools/classes";
import { requireSchoolPage } from "../_lib/context";
import { createClassAction } from "./actions";

export const metadata: Metadata = { title: "Classes" };

/** /school/classes — create classes, see their teachers and sizes (§23 "create classes", "assign subjects"). */
export default async function SchoolClassesPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const { actor, school } = await requireSchoolPage("/school/classes");
  const query = await searchParams;
  const showArchived = firstParam(query, "archived") === "1";
  const [classes, options] = await Promise.all([
    listSchoolClasses(actor, { schoolId: school.schoolId, includeArchived: showArchived }),
    getClassFormOptions(actor, school.schoolId),
  ]);
  const rows = showArchived ? classes.filter((cls) => cls.archivedAt !== null) : classes;

  return (
    <Container size="wide">
      <PageHeader title="Classes" description="Create your school's classes, give each a subject and a teacher, then place students in them." />
      <div className="space-y-6 pb-8">
        <section aria-labelledby="class-list" className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="class-list" className="text-lg font-semibold text-text">
              {showArchived ? "Archived classes" : "Current classes"}
            </h2>
            <nav aria-label="Class status" className="flex gap-1 rounded-control bg-subtle p-1">
              {[
                { value: false, label: "Current" },
                { value: true, label: "Archived" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={buildHref("/school/classes", { archived: item.value ? "1" : undefined })}
                  aria-current={item.value === showArchived ? "page" : undefined}
                  className={cn("inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:text-text lg:pointer-fine:min-h-9", item.value === showArchived && "bg-surface text-text shadow-xs")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <DataTable
            caption="Classes"
            rows={rows}
            rowKey={(row) => row.id}
            empty={<EmptyState title={showArchived ? "No archived classes" : "No classes yet"} description={showArchived ? undefined : "Create your first class below, or let the roster import create them from your class lists."} titleAs="p" />}
            columns={[
              {
                key: "name",
                header: "Class",
                primary: true,
                cell: (row) => (
                  <Link href={`/school/classes/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {row.name}
                  </Link>
                ),
              },
              { key: "subject", header: "Subject", cell: (row) => row.subject?.name ?? <span className="text-muted">No subject</span> },
              { key: "form", header: "Form", hideOnMobile: true, cell: (row) => row.form ?? "—" },
              { key: "year", header: "Year", hideOnMobile: true, cell: (row) => row.academicYear },
              {
                key: "teachers",
                header: "Teachers",
                cell: (row) =>
                  row.teachers.length === 0 ? (
                    <Badge tone="warning">No teacher</Badge>
                  ) : (
                    row.teachers.map((t) => `${t.name}${t.role === "ASSISTANT" ? " (assistant)" : ""}`).join(", ")
                  ),
              },
              { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.students) },
            ]}
          />
        </section>

        {!showArchived && (
          <AdminSection title="Create a class" description={options.subjects.length === 0 ? "Tip: add the subjects your school offers first, so classes can have a subject." : undefined}>
            <ActionForm action={createClassAction} submitLabel="Create class" columns="two">
              <AdminField name="name" label="Class name" required maxLength={120} hint="For example 4A Mathematics or Form 3 Blue." />
              <AdminField name="academicYear" label="Academic year" required defaultValue={defaultAcademicYear(new Date())} maxLength={7} />
              <AdminField
                name="subjectId"
                label="Subject"
                type="select"
                optional
                placeholder="No subject (a form group)"
                options={options.subjects.map((s) => ({ value: s.id, label: `${s.name} (${s.qualificationLabel})` }))}
              />
              <AdminField name="yearGroupId" label="Form or year" type="select" optional placeholder="Not set" options={options.yearGroups.map((g) => ({ value: g.id, label: g.name }))} />
              <AdminField
                name="teacherUserId"
                label="Lead teacher"
                type="select"
                optional
                placeholder="Assign later"
                options={options.teachers.map((t) => ({ value: t.userId, label: t.name }))}
                wide
              />
            </ActionForm>
          </AdminSection>
        )}
      </div>
    </Container>
  );
}
