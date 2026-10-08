import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ButtonLink } from "@/components/ui/Button";
import type { SelectOption } from "@/components/ui/Select";
import { GradeBandsEditor, type BandRow } from "./GradeBandsEditor";

/** Create/edit form of a grade scheme (§12 estimates). Server component around `ActionForm` + the band editor. */
export function GradeSchemeForm({
  action,
  values,
  qualifications,
  sources,
  canEditLive,
  frozen,
  cancelHref,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  values?: {
    id?: string;
    qualificationId?: string;
    name?: string;
    description?: string | null;
    disclaimer?: string | null;
    isEstimate?: boolean;
    sourceId?: string | null;
    sourceNote?: string | null;
    isDefault?: boolean;
    isActive?: boolean;
    bands?: readonly { label: string; minPercent: number; isPass: boolean; description: string | null }[];
  };
  qualifications: readonly SelectOption[] | null;
  sources: readonly SelectOption[];
  /** ADMIN: may activate / make default (editors save inactive drafts for review). */
  canEditLive: boolean;
  frozen: boolean;
  cancelHref: string;
  submitLabel: string;
}) {
  const bands: BandRow[] = (values?.bands ?? []).map((band) => ({
    label: band.label,
    minPercent: String(band.minPercent),
    isPass: band.isPass,
    description: band.description ?? "",
  }));
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
      <AdminField name="name" label="Name" required defaultValue={values?.name} hint='e.g. "IGCSE A*-G (estimate)"' wide />
      <AdminField
        name="disclaimer"
        label="Caveat shown to students"
        type="textarea"
        rows={2}
        wide
        defaultValue={values?.disclaimer ?? "Estimated from your practice results. Not an official grade: boards set grade thresholds for each exam series."}
        hint="Shown next to every estimated grade."
      />
      <AdminField
        name="isEstimate"
        label="These are estimates"
        type="checkbox"
        defaultChecked={values?.isEstimate ?? true}
        description="Untick only for thresholds the board itself publishes as fixed; then cite that source."
      />
      <AdminField name="sourceId" label="Source" type="select" options={sources} placeholder="None" defaultValue={values?.sourceId ?? undefined} />
      <AdminField name="sourceNote" label="Source note" optional wide defaultValue={values?.sourceNote ?? undefined} />
      <AdminField name="description" label="Description" type="textarea" optional rows={2} wide defaultValue={values?.description ?? undefined} />
      <AdminField
        name="isActive"
        label="Active"
        type="checkbox"
        defaultChecked={values?.isActive ?? false}
        disabled={!canEditLive}
        description={canEditLive ? "Active schemes can be used for new grade estimates." : "An admin activates schemes after review."}
      />
      <AdminField
        name="isDefault"
        label="Qualification default"
        type="checkbox"
        defaultChecked={values?.isDefault ?? false}
        disabled={!canEditLive}
        description="Used when a version, route or assessment names no scheme. One per qualification."
      />
      <GradeBandsEditor
        initial={
          bands.length > 0
            ? bands
            : [
                { label: "", minPercent: "50", isPass: true, description: "" },
                { label: "U", minPercent: "0", isPass: false, description: "" },
              ]
        }
        frozen={frozen}
      />
    </ActionForm>
  );
}
