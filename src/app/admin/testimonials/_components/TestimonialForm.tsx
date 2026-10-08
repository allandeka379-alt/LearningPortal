import type { ReactNode } from "react";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { CONSENT_METHOD_LABELS, TESTIMONIAL_CONSENT_METHODS, TESTIMONIAL_LIMITS } from "@/server/cms/testimonials/schemas";

export interface TestimonialFormValues {
  displayName?: string;
  descriptor?: string | null;
  quote?: string;
  photoMediaId?: string | null;
  userId?: string | null;
  /** `YYYY-MM-DDTHH:mm` on the platform clock. */
  consentRecordedAt?: string;
  consentMethod?: string;
  consentEvidenceRef?: string | null;
  authorIsMinor?: boolean;
  guardianConsentRecordedAt?: string;
  sortOrder?: number;
}

/**
 * Create / edit form for a testimonial: what is shown (name, description, quote, photo) and the consent record (when,
 * how, evidence, minor + guardian consent). Server-compatible.
 */
export function TestimonialForm({
  action,
  submitLabel,
  hiddenFields,
  initial = {},
  secondaryActions,
}: {
  action: AdminFormAction<unknown>;
  submitLabel: string;
  hiddenFields?: Readonly<Record<string, string>>;
  initial?: TestimonialFormValues;
  secondaryActions?: ReactNode;
}) {
  return (
    <ActionForm action={action} submitLabel={submitLabel} hiddenFields={hiddenFields} columns="two" successAs="toast" secondaryActions={secondaryActions}>
      <AdminField
        name="displayName"
        label="Name shown"
        required
        maxLength={TESTIMONIAL_LIMITS.displayName}
        defaultValue={initial.displayName}
        hint="Exactly as the person agreed, e.g. “Tariro M.”."
      />
      <AdminField
        name="descriptor"
        label="Description"
        optional
        maxLength={TESTIMONIAL_LIMITS.descriptor}
        defaultValue={initial.descriptor}
        hint="e.g. “Form 4 student, Bulawayo” or “Parent”. No school name unless they agreed to it."
      />
      <AdminField name="quote" label="Quote" type="textarea" rows={5} required wide maxLength={TESTIMONIAL_LIMITS.quote} defaultValue={initial.quote} hint="Their words, unedited apart from spelling." />
      <AdminField
        name="consentRecordedAt"
        label="Consent given on"
        type="datetime-local"
        required
        defaultValue={initial.consentRecordedAt}
        hint="Platform time (Harare)."
      />
      <AdminField
        name="consentMethod"
        label="How consent was given"
        type="select"
        required
        placeholder="Choose"
        options={TESTIMONIAL_CONSENT_METHODS.map((value) => ({ value, label: CONSENT_METHOD_LABELS[value] ?? value }))}
        defaultValue={initial.consentMethod}
      />
      <AdminField
        name="consentEvidenceRef"
        label="Where the consent is kept"
        optional
        wide
        maxLength={TESTIMONIAL_LIMITS.evidenceRef}
        defaultValue={initial.consentEvidenceRef}
        hint="A reference to the stored form, email or message (document id, ticket number). Never paste the person's contact details."
      />
      <AdminField
        name="authorIsMinor"
        label="The author is under 18"
        type="checkbox"
        defaultChecked={initial.authorIsMinor ?? false}
        description="Minors' testimonials need a parent's or guardian's consent before they can be published."
      />
      <AdminField
        name="guardianConsentRecordedAt"
        label="Guardian consent given on"
        type="datetime-local"
        optional
        defaultValue={initial.guardianConsentRecordedAt}
        hint="Only for authors under 18."
      />
      <AdminField
        name="userId"
        label="Platform account id"
        optional
        mono
        defaultValue={initial.userId}
        hint="Optional. Links the testimonial to the person's account, so deleting the account erases it."
      />
      <AdminField
        name="photoMediaId"
        label="Photo (media library id)"
        optional
        mono
        defaultValue={initial.photoMediaId}
        hint="Optional, and only with consent to use the photo. Only public, ready images are shown; otherwise initials appear."
      />
      <AdminField name="sortOrder" label="Order" type="number" min={0} optional defaultValue={initial.sortOrder} hint="Lower numbers first on the home page." />
    </ActionForm>
  );
}
