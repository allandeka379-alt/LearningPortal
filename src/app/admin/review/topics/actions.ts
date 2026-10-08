"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { formFlag, formText, runAdminAction } from "@/components/admin/server-action";
import { approveAndPublishTopic, type TopicPublishResult } from "@/server/cms/review/topics";

/**
 * Review-by-topic Server Action (thin): "Approve and publish all items on this page". The item list is the one the
 * reviewer had on screen (hidden field `items`: comma-separated `TYPE:id`), so nothing added after the page loaded is published unread.
 * Per-item approve / request changes reuse the review queue's actions (../actions.ts).
 */
export async function publishTopicAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState<TopicPublishResult>> {
  return runAdminAction("admin.review.topicPublishAll", formData, async () => {
    await requireAdminAction("content.review");
    const actor = await requireAdminAction("content.publish");
    const topicId = formText(formData, "topicId") ?? "";
    const items = (formText(formData, "items") ?? "").split(",").filter(Boolean).map((value) => {
      const [entityType, id] = value.split(":");
      return { entityType, id };
    });
    const result = await approveAndPublishTopic(actor, { topicId, items, notes: formText(formData, "notes") ?? "", confirmed: formFlag(formData, "confirmed") });
    const problems = result.skipped.length + result.failed.length;
    const details = [
      ...result.failed.map((f) => `${f.title}: ${f.message}`),
      ...result.skipped.map((s) => `${s.title}: ${s.reason}`),
    ].slice(0, 6);
    return {
      data: result,
      message:
        `Published ${result.published} item${result.published === 1 ? "" : "s"}.` +
        (problems > 0 ? ` ${problems} not published: ${details.join(" · ")}${problems > details.length ? " …" : ""}` : ""),
      revalidate: ["/admin/review", "/admin/review/topics", `/admin/review/topics/${topicId}`],
    };
  });
}
