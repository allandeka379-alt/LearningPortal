import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { instantToLocalDateTime } from "@/server/cms/announcements/schemas";
import { CONSENT_METHOD_LABELS } from "@/server/cms/testimonials/schemas";
import { getTestimonial, type TestimonialDetail } from "@/server/cms/testimonials/service";
import { isAppError } from "@/server/lib/errors";
import { AuditTrail } from "../../plans/_shared/AuditTrail";
import { TestimonialForm } from "../_components/TestimonialForm";
import { TestimonialStateBadge } from "../_components/TestimonialStateBadge";
import { publishTestimonialAction, unpublishTestimonialAction, updateTestimonialAction, withdrawTestimonialConsentAction } from "../actions";

export const metadata = { title: "Testimonial" };

/**
 * /admin/testimonials/[id] — one testimonial: edit, consent record, publish / unpublish, and "consent withdrawn" (which
 * unpublishes and erases it for good), with the audit trail.
 */
export default async function TestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.publish", { next: `/admin/testimonials/${id}` });
  let item: TestimonialDetail;
  try {
    item = await getTestimonial(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const local = (value: Date | null) => (value ? instantToLocalDateTime(value, DEFAULT_TIMEZONE) : "");
  const withdrawn = item.state === "withdrawn";

  return (
    <Container size="wide">
      <PageHeader
        title={item.displayName}
        breadcrumbs={[{ label: "Testimonials", href: "/admin/testimonials" }, { label: item.displayName }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <TestimonialStateBadge item={item} size="md" />
            {item.isDemo && <DemoBadge size="md" />}
            {item.descriptor && <span className="text-sm text-muted">{item.descriptor}</span>}
          </span>
        }
      />
      {item.isDemo && (
        <Alert tone="info" className="mb-4">
          Development placeholder: demo testimonials can never be published (the database refuses it).
        </Alert>
      )}
      {!item.isPublished && item.publishBlocker && !withdrawn && !item.isDemo && (
        <Alert tone="warning" className="mb-4">
          {item.publishBlocker}
        </Alert>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          {withdrawn ? (
            <AdminSection title="Erased">
              <p className="text-sm text-text">
                Consent was withdrawn on <Timestamp value={item.consentWithdrawnAt} />. The quote, name, description and photo were erased and the
                testimonial can no longer be edited or published. If the person agrees again, record a new testimonial.
              </p>
            </AdminSection>
          ) : (
            <AdminSection title="Edit">
              <TestimonialForm
                action={updateTestimonialAction}
                submitLabel="Save changes"
                hiddenFields={{ testimonialId: item.id, expectedUpdatedAt: item.updatedAt.toISOString() }}
                initial={{
                  displayName: item.displayName,
                  descriptor: item.descriptor,
                  quote: item.quote,
                  photoMediaId: item.photo?.id ?? null,
                  userId: item.userId,
                  consentRecordedAt: local(item.consentRecordedAt),
                  consentMethod: item.consentMethod,
                  consentEvidenceRef: item.consentEvidenceRef,
                  authorIsMinor: item.authorIsMinor,
                  guardianConsentRecordedAt: local(item.guardianConsentRecordedAt),
                  sortOrder: item.sortOrder,
                }}
              />
            </AdminSection>
          )}
        </div>
        <div className="min-w-0 space-y-6">
          <AdminSection title="Consent record">
            <KeyValueList
              columns={1}
              items={[
                { label: "Consent given", value: <Timestamp value={item.consentRecordedAt} /> },
                { label: "How", value: CONSENT_METHOD_LABELS[item.consentMethod] ?? item.consentMethod },
                { label: "Evidence", value: item.consentEvidenceRef, hideWhenEmpty: true },
                { label: "Recorded by", value: item.consentRecordedBy?.name, hideWhenEmpty: true },
                { label: "Author under 18", value: item.authorIsMinor ? "Yes" : "No" },
                { label: "Guardian consent", value: item.authorIsMinor ? (item.guardianConsentRecordedAt ? <Timestamp value={item.guardianConsentRecordedAt} /> : "Not recorded") : null, hideWhenEmpty: true },
                { label: "Linked account", value: item.userId ? <span className="font-mono text-xs">{item.userId}</span> : null, hideWhenEmpty: true },
                { label: "Photo", value: item.photo ? (item.photo.usable ? "Public image" : "Not shown (not a public, ready image)") : null, hideWhenEmpty: true },
                { label: "Consent withdrawn", value: item.consentWithdrawnAt ? <Timestamp value={item.consentWithdrawnAt} /> : null, hideWhenEmpty: true },
              ]}
            />
          </AdminSection>
          {!withdrawn && (
            <AdminSection title="Publication">
              <div className="space-y-3">
                {item.isPublished ? (
                  <>
                    <p className="text-sm text-muted">
                      Published <Timestamp value={item.publishedAt} />.
                    </p>
                    <ConfirmAction
                      action={unpublishTestimonialAction}
                      fields={{ testimonialId: item.id }}
                      triggerLabel="Unpublish"
                      title="Unpublish this testimonial?"
                      description="It disappears from the home page within a few minutes. The consent record is kept and you can publish it again."
                      confirmLabel="Unpublish"
                      reason={{ label: "Reason", hint: "Optional. Recorded in the audit log.", maxLength: 500 }}
                    />
                  </>
                ) : (
                  <ConfirmAction
                    action={publishTestimonialAction}
                    fields={{ testimonialId: item.id }}
                    triggerLabel="Publish"
                    triggerVariant="primary"
                    disabled={item.publishBlocker !== null}
                    disabledReason={item.publishBlocker ?? undefined}
                    title="Publish this testimonial?"
                    description="Check the name, description and quote match exactly what the person agreed to. It appears on the home page within a few minutes."
                    confirmLabel="Publish"
                  />
                )}
              </div>
            </AdminSection>
          )}
          {!withdrawn && (
            <AdminSection title="Consent withdrawn?">
              <div className="space-y-3">
                <p className="text-sm text-muted">If the person (or their guardian) withdraws consent, record it here: the testimonial is unpublished and its quote, name and photo are erased.</p>
                <ConfirmAction
                  action={withdrawTestimonialConsentAction}
                  fields={{ testimonialId: item.id }}
                  triggerLabel="Record withdrawal"
                  triggerVariant="danger"
                  tone="danger"
                  title="Record that consent was withdrawn?"
                  description="This unpublishes the testimonial and permanently erases its quote, name, description and photo. It cannot be undone."
                  confirmLabel="Erase testimonial"
                  reason={{ label: "How the withdrawal reached us", hint: "Recorded in the audit log, e.g. “email of 7 Oct”. No contact details.", maxLength: 500 }}
                />
              </div>
            </AdminSection>
          )}
          <AdminSection title="History">
            <AuditTrail entries={item.audit} entityType="Testimonial" entityId={item.id} />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
