"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { createFaqItem, deleteFaqItem, moveFaqItem, setFaqItemPublished, updateFaqItem } from "@/server/cms/faq/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * FAQ CMS Server Actions (thin; §45). `content.publish` at scope "all"; the service validates (including the content
 * pipeline check of the Markdown answer) and audits. Public pages showing FAQ entries are revalidated on every change.
 */

const PUBLIC_PATHS = ["/faq", "/", "/pricing", "/schools"] as const;

function paths(faqItemId?: string): string[] {
  return ["/admin/faq", ...(faqItemId ? [`/admin/faq/${faqItemId}`] : []), ...PUBLIC_PATHS];
}

async function auditRequest() {
  return auditRequestFrom(await adminRequestMeta());
}

function entryFields(formData: FormData) {
  return {
    question: formText(formData, "question") ?? "",
    answer: formText(formData, "answer") ?? "",
    category: formText(formData, "category") ?? "",
    locale: formText(formData, "locale"),
    sortOrder: formText(formData, "sortOrder"),
  };
}

export async function createFaqAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.faq.create", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const created = await createFaqItem(actor, entryFields(formData), await auditRequest());
    return { data: created, message: "FAQ entry saved (not published yet).", redirectTo: `/admin/faq/${created.id}`, revalidate: paths() };
  });
}

export async function updateFaqAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.faq.update", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const faqItemId = formText(formData, "faqItemId") ?? "";
    const result = await updateFaqItem(actor, { ...entryFields(formData), faqItemId, expectedUpdatedAt: formText(formData, "expectedUpdatedAt") ?? "" }, await auditRequest());
    return { data: result, message: result.changed.length === 0 ? "Nothing changed." : "FAQ entry saved.", revalidate: paths(faqItemId) };
  });
}

export async function publishFaqAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.faq.publish", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const faqItemId = formText(formData, "faqItemId") ?? "";
    const result = await setFaqItemPublished(actor, { faqItemId, reason: formText(formData, "reason") }, true, await auditRequest());
    return { data: result, message: "Published. It shows on the public site within a few minutes.", revalidate: paths(faqItemId) };
  });
}

export async function unpublishFaqAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.faq.unpublish", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const faqItemId = formText(formData, "faqItemId") ?? "";
    const result = await setFaqItemPublished(actor, { faqItemId, reason: formText(formData, "reason") }, false, await auditRequest());
    return { data: result, message: "Unpublished.", revalidate: paths(faqItemId) };
  });
}

export async function moveFaqAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.faq.move", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const direction = formText(formData, "direction");
    const result = await moveFaqItem(actor, { faqItemId: formText(formData, "faqItemId") ?? "", direction: direction === "up" || direction === "down" ? direction : ("" as never) }, await auditRequest());
    return { data: result, revalidate: paths() };
  });
}

export async function deleteFaqAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.faq.delete", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const result = await deleteFaqItem(actor, { faqItemId: formText(formData, "faqItemId") ?? "", reason: formText(formData, "reason") }, await auditRequest());
    return { data: result, message: "FAQ entry deleted.", redirectTo: "/admin/faq", revalidate: paths() };
  });
}
