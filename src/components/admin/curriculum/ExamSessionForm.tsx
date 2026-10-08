import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ButtonLink } from "@/components/ui/Button";
import type { SelectOption } from "@/components/ui/Select";

/** Create/edit form of an exam session (§17). Server component around the shared `ActionForm`. */
export function ExamSessionForm({
  action,
  values,
  qualifications,
  cancelHref,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  values?: { id?: string; qualificationId?: string; name?: string; seriesCode?: string; year?: number; startsOn?: string; endsOn?: string; sourceUrl?: string | null; notes?: string | null };
  /** Shown on create only (a session's qualification is fixed). */
  qualifications: readonly SelectOption[] | null;
  cancelHref: string;
  submitLabel: string;
}) {
  return (
    <ActionForm
      action={action}
      submitLabel={submitLabel}
      columns="two"
      hiddenFields={values?.id ? { id: values.id } : undefined}
      secondaryActions={
        <ButtonLink href={cancelHref} variant="ghost">
          Cancel
        </ButtonLink>
      }
    >
      {qualifications && (
        <AdminField name="qualificationId" label="Qualification" type="select" required options={qualifications} placeholder="Choose a qualification" defaultValue={values?.qualificationId} wide />
      )}
      <AdminField name="name" label="Name" required defaultValue={values?.name} hint='As students see it, e.g. "November 2027".' />
      <AdminField name="seriesCode" label="Series code" required mono maxLength={32} defaultValue={values?.seriesCode} hint="Unique per qualification, e.g. 2027-NOV." />
      <AdminField name="year" label="Series year" type="number" min={2000} max={2100} required defaultValue={values?.year} />
      <AdminField name="startsOn" label="First exam day" type="date" required defaultValue={values?.startsOn} hint="The default countdown target." />
      <AdminField name="endsOn" label="Last exam day" type="date" required defaultValue={values?.endsOn} />
      <AdminField name="sourceUrl" label="Official timetable link" type="url" optional defaultValue={values?.sourceUrl ?? undefined} hint="Link only. Needed when confirming the dates." />
      <AdminField name="notes" label="Notes" type="textarea" optional rows={3} wide defaultValue={values?.notes ?? undefined} hint="Staff-only notes, e.g. where the dates came from." />
    </ActionForm>
  );
}
