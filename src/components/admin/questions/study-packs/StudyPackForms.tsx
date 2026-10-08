import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import type { Entitlements } from "@/lib/billing/entitlements";
import type { MediaOption, Option } from "@/server/cms/questions/lookups";
import type { StudyPackMetaInput } from "@/server/cms/study-packs/schemas";
import type { PdfExportCheck } from "@/server/cms/study-packs/service";
import { EntitlementsEditor } from "./EntitlementsEditor";

/** Study-pack details form (§24): marketing copy, cover, merchandising, PDF export and what the pack unlocks. */
export function StudyPackDetailsForm({
  action,
  submitLabel,
  values,
  hiddenFields,
  covers,
  entitlements,
  pdfCheck,
}: {
  action: AdminFormAction<unknown>;
  submitLabel: string;
  values: StudyPackMetaInput;
  hiddenFields: Record<string, string>;
  covers: readonly MediaOption[];
  /** Omit on the create form (a new pack unlocks nothing until saved). */
  entitlements?: Entitlements;
  pdfCheck?: PdfExportCheck;
}) {
  const text = (value: unknown) => (value === null || value === undefined ? undefined : String(value));
  const pdfAllowed = pdfCheck?.allowed === true;
  return (
    <ActionForm action={action} submitLabel={submitLabel} hiddenFields={hiddenFields} columns="two" successAs="toast">
      <AdminField name="title" label="Title" required maxLength={200} defaultValue={values.title} wide />
      <AdminField name="slug" label="Web address" required mono maxLength={80} defaultValue={values.slug} hint="Lower-case words joined by hyphens, e.g. o-level-maths-complete." />
      <AdminField name="subtitle" label="Subtitle" optional maxLength={200} defaultValue={text(values.subtitle)} />
      <AdminField
        name="description"
        label="Description"
        type="textarea"
        optional
        mono
        rows={6}
        maxLength={20000}
        defaultValue={text(values.description)}
        hint="Markdown. Describe what is included honestly: no invented pass rates or testimonials."
        wide
      />
      <AdminField
        name="coverImageId"
        label="Cover image"
        type="select"
        optional
        options={covers.map((c) => ({ value: c.value, label: c.label }))}
        placeholder={covers.length === 0 ? "Upload a marketing image in the media library first" : "No cover"}
        defaultValue={text(values.coverImageId)}
      />
      <AdminField name="sortOrder" label="Order in listings" type="number" min={-1000} max={1000} defaultValue={text(values.sortOrder) ?? "0"} />
      <AdminField name="metaTitle" label="SEO title" optional maxLength={70} defaultValue={text(values.metaTitle)} />
      <AdminField name="metaDescription" label="SEO description" optional maxLength={200} defaultValue={text(values.metaDescription)} />
      <AdminField name="isFeatured" label="Feature on the packs page" type="checkbox" defaultChecked={values.isFeatured === true} />
      {pdfCheck && (
        <AdminField
          name="allowPdfExport"
          label="Offer PDF export"
          type="checkbox"
          defaultChecked={values.allowPdfExport === true}
          disabled={!pdfAllowed && values.allowPdfExport !== true}
          description={
            pdfAllowed
              ? "Every included item's licence permits PDF export."
              : pdfCheck.emptyScope
                ? "Add scope rules first."
                : `${pdfCheck.blocked} of ${pdfCheck.total} included items do not permit PDF export (see the licensing check).`
          }
        />
      )}
      {entitlements && <EntitlementsEditor initial={entitlements} />}
    </ActionForm>
  );
}

/** One-off price form (`billing.manage`): a new row per price; the database freezes price-defining columns. */
export function StudyPackPriceForm({ action, studyPackId, countries }: { action: AdminFormAction<unknown>; studyPackId: string; countries: readonly (Option & { currency: string })[] }) {
  return (
    <ActionForm action={action} submitLabel="Add price" hiddenFields={{ studyPackId }} columns="two" successAs="toast">
      <AdminField name="currency" label="Currency" required maxLength={3} mono placeholder="USD" hint="ISO code, e.g. USD or ZWG." />
      <AdminField name="amount" label="Amount" required placeholder="12.50" hint="Without a currency symbol." />
      <AdminField name="accessDays" label="Access period (days)" type="number" optional min={1} max={3650} hint="Blank: access does not expire." />
      <AdminField name="countryId" label="Country" type="select" optional options={countries} placeholder="Every country" />
      <AdminField name="label" label="Label" optional maxLength={100} placeholder="Launch price" />
      <AdminField name="sortOrder" label="Order" type="number" min={-1000} max={1000} defaultValue="0" />
      <AdminField name="validFrom" label="Available from" type="datetime-local" optional hint="Blank: now. Platform time (Harare)." />
      <AdminField name="validTo" label="Available until" type="datetime-local" optional />
    </ActionForm>
  );
}
