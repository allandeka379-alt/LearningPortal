import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PasswordResetPanel } from "@/components/school/PasswordResetPanel";
import { StudentPickerForm } from "@/components/school/StudentPickerForm";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { formatNumber } from "@/lib/format";
import { getEnv } from "@/server/lib/env";
import { getClassFormOptions, getSchoolClass } from "@/server/schools/classes";
import { listStudentOptions } from "@/server/schools/students";
import { orNotFound, requireSchoolPage, signInUrl } from "../../_lib/context";
import { resetPasswordsAction } from "../../students/actions";
import {
  addStudentsAction,
  archiveClassAction,
  assignTeacherAction,
  enrolClassInSubjectAction,
  removeStudentAction,
  removeTeacherAction,
  updateClassAction,
} from "../actions";

export const metadata: Metadata = { title: "Class" };

/**
 * /school/classes/[classId] — one class of the school: details and subject, teachers (one lead), students (place,
 * remove, reset school passwords and print slips), archive. Names and admission numbers only.
 */
export default async function SchoolClassPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  const { actor, school } = await requireSchoolPage(`/school/classes/${classId}`);
  const cls = await orNotFound(getSchoolClass(actor, { schoolId: school.schoolId, classId }));
  const [options, candidates] = await Promise.all([
    getClassFormOptions(actor, school.schoolId),
    cls.archivedAt ? Promise.resolve([]) : listStudentOptions(actor, school.schoolId, { notInClassId: cls.id }),
  ]);
  const archived = cls.archivedAt !== null;
  const provisioned = cls.roster.filter((row) => row.provisioned).map((row) => row.userId);
  const teacherChoices = options.teachers.filter((t) => !cls.teachers.some((current) => current.userId === t.userId && current.role === "LEAD"));

  return (
    <Container size="wide">
      <PageHeader
        title={cls.name}
        eyebrow={[cls.subject?.name ?? "No subject", cls.form, cls.academicYear].filter(Boolean).join(" · ")}
        breadcrumbs={[{ label: "Classes", href: "/school/classes" }, { label: cls.name }]}
        actions={
          <ConfirmAction
            action={archiveClassAction}
            fields={{ classId: cls.id, archive: archived ? "false" : "true" }}
            triggerLabel={archived ? "Restore class" : "Archive class"}
            tone={archived ? "primary" : "danger"}
            title={archived ? `Restore ${cls.name}?` : `Archive ${cls.name}?`}
            description={archived ? "Teachers can use the class again." : "The class becomes read-only and its join code stops working. Its work and results are kept."}
            confirmLabel={archived ? "Restore" : "Archive"}
          />
        }
      />
      <div className="space-y-6 pb-8">
        {archived && <Alert tone="neutral">This class was archived on {formatDate(cls.archivedAt, school.timezone)}. Restore it to make changes.</Alert>}

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminSection title="Teachers">
            {cls.teachers.length === 0 ? (
              <p className="mb-4 text-sm text-muted">No teacher yet.</p>
            ) : (
              <ul className="mb-4 divide-y divide-border text-sm">
                {cls.teachers.map((teacher) => (
                  <li key={teacher.userId} className="flex items-center justify-between gap-3 py-2">
                    <span className="text-text">
                      {teacher.name}{" "}
                      <Badge size="sm" tone={teacher.role === "LEAD" ? "primary" : "neutral"}>
                        {teacher.role === "LEAD" ? "Lead" : "Assistant"}
                      </Badge>
                    </span>
                    {!archived && (
                      <ConfirmAction
                        action={removeTeacherAction}
                        fields={{ classId: cls.id, teacherUserId: teacher.userId }}
                        triggerLabel="Remove"
                        triggerSize="sm"
                        triggerVariant="ghost"
                        tone="danger"
                        title={`Take ${teacher.name} off ${cls.name}?`}
                        description="They stop seeing this class's students and work."
                        confirmLabel="Remove"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
            {!archived &&
              (teacherChoices.length === 0 ? (
                <p className="text-sm text-muted">
                  <Link href="/school/teachers" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Invite teachers
                  </Link>{" "}
                  to assign them to classes.
                </p>
              ) : (
                <ActionForm action={assignTeacherAction} hiddenFields={{ classId: cls.id }} submitLabel="Assign teacher" successAs="toast" columns="two">
                  <AdminField name="teacherUserId" label="Teacher" type="select" required placeholder="Choose a teacher" options={teacherChoices.map((t) => ({ value: t.userId, label: t.name }))} />
                  <AdminField
                    name="role"
                    label="Role"
                    type="select"
                    defaultValue="LEAD"
                    options={[
                      { value: "LEAD", label: "Lead teacher" },
                      { value: "ASSISTANT", label: "Assistant teacher" },
                    ]}
                  />
                </ActionForm>
              ))}
          </AdminSection>

          <AdminSection title="Class details">
            {archived ? (
              <p className="text-sm text-muted">Restore the class to edit it.</p>
            ) : (
              <ActionForm
                action={updateClassAction}
                hiddenFields={cls.hasAssignments ? { classId: cls.id, subjectId: cls.subject?.id ?? "" } : { classId: cls.id }}
                submitLabel="Save"
                successAs="toast"
              >
                <AdminField name="name" label="Class name" required defaultValue={cls.name} maxLength={120} />
                <AdminField
                  name="subjectId"
                  label="Subject"
                  type="select"
                  optional
                  defaultValue={cls.subject?.id ?? ""}
                  placeholder="No subject (a form group)"
                  options={options.subjects.map((s) => ({ value: s.id, label: `${s.name} (${s.qualificationLabel})` }))}
                  disabled={cls.hasAssignments}
                  hint={cls.hasAssignments ? "This class already has work set, so its subject can't change." : "Teachers see students' work in the class subject only."}
                />
                <AdminField name="yearGroupId" label="Form or year" type="select" optional defaultValue={cls.yearGroupId ?? ""} placeholder="Not set" options={options.yearGroups.map((g) => ({ value: g.id, label: g.name }))} />
              </ActionForm>
            )}
          </AdminSection>
        </div>

        <AdminSection title={`Students (${formatNumber(cls.students)})`} description={cls.pendingRequests > 0 ? `${cls.pendingRequests} join request(s) are waiting for the class teacher.` : undefined} flush>
          <DataTable
            caption="Students in this class"
            rows={cls.roster}
            rowKey={(row) => row.userId}
            empty={<p className="px-4 pb-4 text-sm text-muted sm:px-5">No students in this class yet.</p>}
            columns={[
              {
                key: "name",
                header: "Student",
                primary: true,
                cell: (row) => (
                  <Link href={`/school/students/${row.userId}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {row.name}
                  </Link>
                ),
              },
              { key: "number", header: "Student no.", cell: (row) => row.studentNumber ?? "—" },
              { key: "account", header: "Account", hideOnMobile: true, cell: (row) => (row.provisioned ? "School username" : "Own account") },
              { key: "joined", header: "In class since", hideOnMobile: true, cell: (row) => formatDate(row.joinedAt, school.timezone) },
              {
                key: "actions",
                header: "Actions",
                align: "end",
                cell: (row) =>
                  archived ? null : (
                    <ConfirmAction
                      action={removeStudentAction}
                      fields={{ classId: cls.id, userId: row.userId }}
                      triggerLabel="Remove"
                      triggerSize="sm"
                      triggerVariant="ghost"
                      tone="danger"
                      title={`Take ${row.name} out of ${cls.name}?`}
                      description="They stay on your school's roster."
                      confirmLabel="Remove"
                    />
                  ),
              },
            ]}
          />
        </AdminSection>

        {!archived && (
          <div className="grid gap-6 lg:grid-cols-2">
            <AdminSection title="Add students" description="Students on your roster who are not in this class yet.">
              <StudentPickerForm
                action={addStudentsAction}
                students={candidates}
                fields={{ classId: cls.id }}
                submitLabel="Add to class"
                legend={`Students to add to ${cls.name}`}
                emptyMessage="Every student on your roster is already in this class, or your roster is empty."
              />
            </AdminSection>
            <div className="space-y-6">
              {provisioned.length > 0 && (
                <AdminSection title="Sign-in slips" description="Reset the passwords of this class's school-username accounts and print new slips (for example at the start of term).">
                  <PasswordResetPanel
                    action={resetPasswordsAction}
                    userIds={provisioned}
                    triggerLabel={`Reset ${provisioned.length} password${provisioned.length === 1 ? "" : "s"}`}
                    schoolName={school.name}
                    signInUrl={signInUrl(getEnv().APP_URL)}
                  />
                </AdminSection>
              )}
              {options.subjects.length > 0 && cls.students > 0 && (
                <AdminSection title="Enrol the class in a subject" description="Adds the subject to every student in this class (their own subject choices are kept).">
                  <ActionForm action={enrolClassInSubjectAction} hiddenFields={{ classId: cls.id }} submitLabel="Enrol students" successAs="toast">
                    <AdminField name="subjectId" label="Subject" type="select" required placeholder="Choose a subject" options={options.subjects.map((s) => ({ value: s.id, label: `${s.name} (${s.qualificationLabel})` }))} />
                  </ActionForm>
                </AdminSection>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
