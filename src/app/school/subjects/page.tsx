import type { Metadata } from "next";
import { ActionForm } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection } from "@/components/admin/DetailParts";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatNumber } from "@/lib/format";
import { isUuid } from "@/server/schools/access";
import { listSchoolSubjects, listSubjectCatalogue } from "@/server/schools/subjects";
import { requireSchoolPage } from "../_lib/context";
import { addSubjectsAction, removeSubjectAction } from "./actions";

export const metadata: Metadata = { title: "Subjects" };

/**
 * /school/subjects — the subjects the school offers (§23 "assign subjects"), chosen from the curriculum catalogue of the
 * exam boards offered in the school's country. Offered subjects are what classes and the roster import can use.
 */
export default async function SchoolSubjectsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const { actor, school } = await requireSchoolPage("/school/subjects");
  const query = await searchParams;
  const q = firstParam(query, "q");
  const qualification = firstParam(query, "qualificationId");
  const qualificationId = qualification && isUuid(qualification) ? qualification : undefined;
  const [offered, catalogue] = await Promise.all([
    listSchoolSubjects(actor, school.schoolId),
    listSubjectCatalogue(actor, { schoolId: school.schoolId, q, qualificationId, limit: 60 }),
  ]);

  return (
    <Container size="wide">
      <PageHeader title="Subjects" description="Choose the subjects your school offers. Classes, imports and reports use this list." />
      <div className="space-y-6 pb-8">
        <AdminSection title={`Offered subjects (${offered.length})`} flush>
          <DataTable
            caption="Subjects your school offers"
            rows={offered}
            rowKey={(row) => row.id}
            empty={<EmptyState title="No subjects yet" description="Find your subjects below and add them." titleAs="p" />}
            columns={[
              { key: "name", header: "Subject", primary: true, cell: (row) => row.name },
              { key: "qualification", header: "Qualification", cell: (row) => row.qualificationLabel },
              { key: "code", header: "Code", hideOnMobile: true, cell: (row) => row.officialCode ?? "—" },
              { key: "classes", header: "Classes", align: "end", cell: (row) => formatNumber(row.classes) },
              { key: "students", header: "Students enrolled", align: "end", cell: (row) => formatNumber(row.studentsEnrolled) },
              {
                key: "actions",
                header: "Actions",
                align: "end",
                cell: (row) => (
                  <ConfirmAction
                    action={removeSubjectAction}
                    fields={{ subjectIds: row.id }}
                    triggerLabel="Remove"
                    triggerSize="sm"
                    triggerVariant="ghost"
                    tone="danger"
                    title={`Stop offering ${row.name}?`}
                    description="Existing classes and students' enrolments are kept; it just disappears from your choices."
                    confirmLabel="Remove"
                  />
                ),
              },
            ]}
          />
        </AdminSection>

        <AdminSection title="Add subjects" description="Search the subjects available in your country.">
          <form method="get" action="/school/subjects" role="search" className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1 sm:max-w-sm">
              <label htmlFor="subject-search" className="sr-only">
                Search subjects
              </label>
              <Input id="subject-search" type="search" name="q" defaultValue={q} placeholder="Subject name or code" />
            </div>
            {catalogue.qualifications.length > 1 && (
              <div className="sm:w-64">
                <label htmlFor="subject-qualification" className="sr-only">
                  Qualification
                </label>
                <Select
                  id="subject-qualification"
                  name="qualificationId"
                  defaultValue={qualificationId ?? ""}
                  placeholder="All qualifications"
                  options={catalogue.qualifications.map((item) => ({ value: item.id, label: item.label }))}
                />
              </div>
            )}
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
          {catalogue.items.length === 0 ? (
            <p className="text-sm text-muted">{q ? "No subjects match your search." : "No subjects are available for your country yet."}</p>
          ) : (
            <ActionForm action={addSubjectsAction} submitLabel="Add selected subjects" successAs="toast">
              <fieldset className="rounded-card border border-border">
                <legend className="sr-only">Subjects to add</legend>
                <ul className="divide-y divide-border">
                  {catalogue.items.map((subject) => (
                    <li key={subject.id}>
                      <label className="flex min-h-11 cursor-pointer items-center gap-3 px-4 py-2 text-sm">
                        <input type="checkbox" name="subjectIds" value={subject.id} disabled={subject.offered} defaultChecked={subject.offered} className="size-5 shrink-0 accent-primary" />
                        <span className="min-w-0 flex-1">
                          <span className="font-medium text-text">{subject.name}</span>
                          <span className="block text-muted">
                            {subject.qualificationLabel}
                            {subject.officialCode ? ` · ${subject.officialCode}` : ""}
                          </span>
                        </span>
                        {subject.offered && <Badge tone="success">Offered</Badge>}
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
              {catalogue.truncated && <p className="text-sm text-muted">More subjects match. Narrow your search to see them.</p>}
            </ActionForm>
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
