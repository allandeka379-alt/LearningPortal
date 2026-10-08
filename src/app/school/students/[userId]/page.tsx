import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { formatDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  ChildCountdownCard,
  ChildProgressCard,
  ChildResultsCard,
  ChildStudyTimeCard,
  ChildSubjectsCard,
  ChildWeakAreasCard,
} from "@/components/parent/ChildSections";
import { CONSENT_LABELS, CONSENT_METHOD_LABELS } from "@/components/school/labels";
import { PasswordResetPanel } from "@/components/school/PasswordResetPanel";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { localDateString } from "@/lib/dates";
import { getEnv } from "@/server/lib/env";
import { listSchoolClasses } from "@/server/schools/classes";
import { getSchoolStudent } from "@/server/schools/students";
import { auditRequest, orNotFound, requireSchoolPage, signInUrl } from "../../_lib/context";
import { addStudentToClassAction, deactivateStudentAction, resetPasswordsAction, setStudentNumberAction } from "../actions";

export const metadata: Metadata = { title: "Student" };

/**
 * /school/students/[userId] — one student's record for the school admin (§23; ARCHITECTURE §5.3 "individual
 * performance of members"). Opening it writes a `student.view` audit entry (with its reason) before anything is shown.
 * Learning overview only: never AI conversations, payments or the student's own contact details.
 */
export default async function SchoolStudentPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const { actor, school } = await requireSchoolPage(`/school/students/${userId}`);
  const [student, classes] = await Promise.all([
    orNotFound(getSchoolStudent(actor, { schoolId: school.schoolId, userId }, await auditRequest())),
    listSchoolClasses(actor, { schoolId: school.schoolId }),
  ]);
  const { overview } = student;
  const firstName = overview.student.firstName ?? student.name;
  const today = localDateString(new Date(), overview.student.timezone);
  const otherClasses = classes.filter((cls) => !student.classes.some((own) => own.classId === cls.id));

  return (
    <Container size="wide">
      <PageHeader
        title={student.name}
        eyebrow={[student.form, student.studentNumber ? `No. ${student.studentNumber}` : null].filter(Boolean).join(" · ") || "Student"}
        breadcrumbs={[{ label: "Students", href: "/school/students" }, { label: student.name }]}
        description="Viewing a student's record is recorded in your school's audit log."
      />
      <div className="space-y-6 pb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <AdminSection title="Account">
            <KeyValueList
              items={[
                {
                  label: "Signs in with",
                  value: student.account.provisioned ? (
                    <span className="font-mono">{student.account.username}</span>
                  ) : student.account.hasOwnLogin ? (
                    "Their own email or phone"
                  ) : (
                    "—"
                  ),
                },
                { label: "Created by", value: student.account.provisioned ? "Your school (roster import)" : "The student" },
                { label: "Family contact phone", value: student.account.contactPhoneMasked, hideWhenEmpty: true },
                { label: "Last active", value: formatDate(student.account.lastActiveAt, school.timezone) },
                { label: "On your roster since", value: formatDate(student.joinedAt, school.timezone) },
                {
                  label: "Guardian consent",
                  value: student.guardianConsent.isMinor
                    ? `${CONSENT_LABELS[student.guardianConsent.status] ?? student.guardianConsent.status}${student.guardianConsent.method ? ` (${CONSENT_METHOD_LABELS[student.guardianConsent.method] ?? student.guardianConsent.method})` : ""}`
                    : "Not required (adult)",
                },
                { label: "School seat", value: student.hasSeat ? <Badge tone="success">Has a seat</Badge> : <Badge>No seat</Badge> },
              ]}
            />
            {student.account.provisioned && (
              <div className="mt-5 border-t border-border pt-4">
                <PasswordResetPanel
                  action={resetPasswordsAction}
                  userIds={[student.userId]}
                  triggerLabel="Reset password and print slip"
                  schoolName={school.name}
                  signInUrl={signInUrl(getEnv().APP_URL)}
                />
              </div>
            )}
          </AdminSection>

          <AdminSection title="Classes">
            {student.classes.length === 0 ? (
              <p className="text-sm text-muted">Not in any class yet.</p>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {student.classes.map((cls) => (
                  <li key={cls.classId} className="flex items-center justify-between gap-3 py-2">
                    <Link href={`/school/classes/${cls.classId}`} className="font-medium text-primary underline-offset-4 hover:underline">
                      {cls.name}
                    </Link>
                    <span className="text-muted">{cls.subjectName ?? "No subject"}</span>
                  </li>
                ))}
              </ul>
            )}
            {otherClasses.length > 0 && (
              <ActionForm action={addStudentToClassAction} hiddenFields={{ userId: student.userId }} submitLabel="Add to class" successAs="toast" className="mt-4">
                <AdminField name="classId" label="Add to a class" type="select" required placeholder="Choose a class" options={otherClasses.map((cls) => ({ value: cls.id, label: cls.name }))} />
              </ActionForm>
            )}
          </AdminSection>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChildSubjectsCard subjects={overview.subjects} name={firstName} />
          <ChildCountdownCard countdown={overview.examCountdown} name={firstName} />
        </div>
        <ChildProgressCard progress={overview.progress} name={firstName} />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChildWeakAreasCard weakAreas={overview.weakAreas} name={firstName} />
          <ChildResultsCard testResults={overview.testResults} name={firstName} timeZone={overview.student.timezone} />
        </div>
        <ChildStudyTimeCard studyTime={overview.studyTime} activityCalendar={overview.activityCalendar} name={firstName} today={today} />

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminSection title="Student number" description="Your school's admission number (unique within your school).">
            <ActionForm action={setStudentNumberAction} hiddenFields={{ userId: student.userId }} submitLabel="Save number" successAs="toast">
              <AdminField name="studentNumber" label="Student number" defaultValue={student.studentNumber} maxLength={32} mono />
            </ActionForm>
          </AdminSection>
          <AdminSection title="Remove from your school">
            <Alert tone="neutral" className="mb-4">
              The student leaves your classes and loses their school seat. Their own account, progress and history stay with them.
            </Alert>
            <ConfirmAction
              action={deactivateStudentAction}
              fields={{ userId: student.userId }}
              triggerLabel="Remove from school"
              tone="danger"
              title={`Remove ${student.name} from your school?`}
              description="They are taken out of every class of your school at once."
              confirmLabel="Remove"
              reason={{ label: "Reason (optional, kept in the audit log)", maxLength: 500 }}
            />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
