import { BadgeCheck } from "lucide-react";
import { AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, ApprovalInfo, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatLocalDate } from "@/components/admin/format";
import { DemoBadge, ExamSessionStatusBadge, ProvisionalBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { ExamSessionForm } from "@/components/admin/curriculum/ExamSessionForm";
import { FormDialog } from "@/components/admin/curriculum/FormDialog";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { getExamSession } from "@/server/cms/curriculum";
import { confirmExamSessionDatesAction, setExamSessionStatusAction, updateExamSessionAction } from "../actions";

export const metadata = { title: "Exam session" };

const TRANSITION_COPY: Readonly<Record<string, { label: string; title: string; body: string; tone: "primary" | "danger" }>> = {
  PUBLISHED: {
    label: "Publish",
    title: "Publish this session?",
    body: "It will appear in onboarding and drive students' countdowns. Provisional dates are labelled as provisional.",
    tone: "primary",
  },
  DRAFT: { label: "Back to draft", title: "Unpublish this session?", body: "It disappears from onboarding. Refused while students target it.", tone: "danger" },
  CANCELLED: {
    label: "Cancel session",
    title: "Cancel this session?",
    body: "Use this when the board cancels the series. Students who target it keep it until they choose another session.",
    tone: "danger",
  },
  ARCHIVED: { label: "Archive", title: "Archive this session?", body: "Archived sessions are kept as history and can no longer be edited.", tone: "danger" },
};

/** /admin/exam-sessions/[id] — details, publish status and date confirmation (who/when) of one exam session. */
export default async function ExamSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/exam-sessions/${id}` });
  const session = await orNotFound(getExamSession(actor, id));
  const targeting = session._count.targetingStudents + session._count.targetingEnrollments;

  return (
    <Container size="wide">
      <PageHeader
        title={session.name}
        eyebrow={`${session.qualification.examBoard.shortName} · ${session.qualification.shortName}`}
        breadcrumbs={[{ label: "Exam sessions", href: "/admin/exam-sessions" }, { label: session.name }]}
      />
      <div className="space-y-6">
        {session.isDemo && (
          <Alert tone="warning" title="Development demo data">
            Seeded with typical months, not an official timetable. It can never drive a real countdown.
          </Alert>
        )}
        <AdminSection title="Status">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <ExamSessionStatusBadge status={session.status} />
              <ProvisionalBadge provisional={session.isProvisional} />
              {session.isDemo && <DemoBadge />}
            </div>
            <ApprovalInfo steps={[{ label: "Dates confirmed", by: session.confirmedByName, at: session.confirmedAt }]} />
            <KeyValueList
              columns={3}
              items={[
                { label: "Series code", value: <span className="font-mono">{session.seriesCode}</span> },
                { label: "Dates", value: `${formatLocalDate(session.startsOn)} to ${formatLocalDate(session.endsOn)}` },
                { label: "Students targeting it", value: targeting },
                { label: "Timetable entries", value: session._count.timetableEntries },
                {
                  label: "Official timetable",
                  value: session.sourceUrl ? (
                    <a href={session.sourceUrl} className="text-primary underline underline-offset-4" target="_blank" rel="noreferrer noopener">
                      {session.sourceUrl}
                    </a>
                  ) : null,
                },
                { label: "Last changed", value: <Timestamp value={session.updatedAt} /> },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              {session.allowedTransitions.map((status) => {
                const copy = TRANSITION_COPY[status];
                if (!copy) return null;
                return (
                  <ConfirmAction
                    key={status}
                    action={setExamSessionStatusAction}
                    fields={{ id, status }}
                    triggerLabel={copy.label}
                    triggerVariant={status === "PUBLISHED" ? "primary" : "outline"}
                    triggerSize="md"
                    title={copy.title}
                    confirmLabel={copy.label}
                    tone={copy.tone}
                  >
                    {copy.body}
                    {targeting > 0 && status !== "PUBLISHED" ? ` ${targeting} students currently target this session.` : ""}
                  </ConfirmAction>
                );
              })}
              {session.canConfirm && (
                <FormDialog
                  action={confirmExamSessionDatesAction}
                  hiddenFields={{ id }}
                  triggerLabel="Confirm dates"
                  triggerIcon={<BadgeCheck aria-hidden="true" />}
                  triggerSize="md"
                  title="Confirm the dates"
                  description={`Check ${formatLocalDate(session.startsOn)} to ${formatLocalDate(session.endsOn)} against the board's official timetable. Your name and the time are recorded.`}
                  submitLabel="Confirm dates"
                >
                  <AdminField name="sourceUrl" label="Official timetable link" type="url" required defaultValue={session.sourceUrl ?? undefined} wide />
                </FormDialog>
              )}
            </div>
            {session.allowedTransitions.length === 0 && !session.canEdit && (
              <p className="text-sm text-muted">Only an admin can publish sessions or confirm their dates.</p>
            )}
          </div>
        </AdminSection>

        <AdminSection title="Details" description={session.isProvisional ? undefined : "Changing the dates makes them provisional again until re-confirmed."}>
          {session.canEdit ? (
            <ExamSessionForm action={updateExamSessionAction} values={session} qualifications={null} cancelHref="/admin/exam-sessions" submitLabel="Save session" />
          ) : (
            <KeyValueList
              items={[
                { label: "Name", value: session.name },
                { label: "Year", value: session.year },
                { label: "Notes", value: session.notes },
              ]}
            />
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
