"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formFlag, formText, runAdminAction } from "@/components/admin/server-action";
import {
  createTestimonial,
  publishTestimonial,
  unpublishTestimonial,
  updateTestimonial,
  withdrawTestimonialConsent,
} from "@/server/cms/testimonials/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Testimonial CMS Server Actions (thin; §45, rule 6). `content.publish` at scope "all"; the service enforces consent,
 * guardian consent for minors and the demo rule, and audits without names or quotes. The home page (the only public
 * page showing testimonials) is revalidated on every change.
 */

function paths(testimonialId?: string): string[] {
  return ["/admin/testimonials", ...(testimonialId ? [`/admin/testimonials/${testimonialId}`] : []), "/"];
}

async function auditRequest() {
  return auditRequestFrom(await adminRequestMeta());
}

function testimonialFields(formData: FormData) {
  return {
    displayName: formText(formData, "displayName") ?? "",
    descriptor: formText(formData, "descriptor"),
    quote: formText(formData, "quote") ?? "",
    photoMediaId: formText(formData, "photoMediaId"),
    userId: formText(formData, "userId"),
    consentRecordedAt: formText(formData, "consentRecordedAt") ?? "",
    consentMethod: (formText(formData, "consentMethod") ?? "") as never,
    consentEvidenceRef: formText(formData, "consentEvidenceRef"),
    authorIsMinor: formFlag(formData, "authorIsMinor"),
    guardianConsentRecordedAt: formText(formData, "guardianConsentRecordedAt"),
    sortOrder: formText(formData, "sortOrder"),
  };
}

export async function createTestimonialAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.testimonials.create", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const created = await createTestimonial(actor, testimonialFields(formData), await auditRequest());
    return { data: created, message: "Testimonial saved (not published yet).", redirectTo: `/admin/testimonials/${created.id}`, revalidate: paths() };
  });
}

export async function updateTestimonialAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.testimonials.update", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const testimonialId = formText(formData, "testimonialId") ?? "";
    const result = await updateTestimonial(
      actor,
      { ...testimonialFields(formData), testimonialId, expectedUpdatedAt: formText(formData, "expectedUpdatedAt") ?? "" },
      await auditRequest(),
    );
    return { data: result, message: result.changed.length === 0 ? "Nothing changed." : "Testimonial saved.", revalidate: paths(testimonialId) };
  });
}

export async function publishTestimonialAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.testimonials.publish", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const testimonialId = formText(formData, "testimonialId") ?? "";
    const result = await publishTestimonial(actor, { testimonialId, reason: formText(formData, "reason") }, await auditRequest());
    return { data: result, message: "Published. It shows on the home page within a few minutes.", revalidate: paths(testimonialId) };
  });
}

export async function unpublishTestimonialAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.testimonials.unpublish", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const testimonialId = formText(formData, "testimonialId") ?? "";
    const result = await unpublishTestimonial(actor, { testimonialId, reason: formText(formData, "reason") }, await auditRequest());
    return { data: result, message: "Unpublished.", revalidate: paths(testimonialId) };
  });
}

export async function withdrawTestimonialConsentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.testimonials.withdrawConsent", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const testimonialId = formText(formData, "testimonialId") ?? "";
    const result = await withdrawTestimonialConsent(actor, { testimonialId, reason: formText(formData, "reason") }, await auditRequest());
    return { data: result, message: "Consent withdrawal recorded: the testimonial is unpublished and erased.", revalidate: paths(testimonialId) };
  });
}
