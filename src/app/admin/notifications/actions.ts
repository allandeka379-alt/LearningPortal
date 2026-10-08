"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formFlag, formList, formText, runAdminAction } from "@/components/admin/server-action";
import {
  archiveAnnouncement,
  createAnnouncement,
  expireAnnouncement,
  publishAnnouncementNow,
  unscheduleAnnouncement,
  updateAnnouncement,
} from "@/server/cms/announcements/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Announcement Server Actions (thin). `class.manage` with scope "all" (ADMIN / SUPER_ADMIN) is re-checked on every
 * call; the service validates, renders the body, enqueues the fan-out with the publication and audits.
 */

async function audit() {
  return auditRequestFrom(await adminRequestMeta());
}

function announcementFields(formData: FormData) {
  return {
    scope: formText(formData, "scope"),
    schoolRef: formText(formData, "schoolRef"),
    classRef: formText(formData, "classRef"),
    countryId: formText(formData, "countryId"),
    title: formText(formData, "title"),
    body: formText(formData, "body"),
    audienceRoles: formList(formData, "audienceRoles"),
    pinned: formFlag(formData, "pinned"),
    notify: formFlag(formData, "notify"),
    publish: formText(formData, "publish") ?? "draft",
    publishAt: formText(formData, "publishAt"),
    expiresAt: formText(formData, "expiresAt"),
  };
}

const STATE_MESSAGES: Record<string, string> = {
  DRAFT: "Saved as a draft.",
  SCHEDULED: "Scheduled. It will be delivered at the chosen time.",
  LIVE: "Published. Delivery to recipients has started.",
};

export async function createAnnouncementAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.announcements.create", formData, async () => {
    const actor = await requireAdminAction("class.manage");
    const result = await createAnnouncement(actor, announcementFields(formData), await audit());
    return {
      data: result,
      message: STATE_MESSAGES[result.state] ?? "Saved.",
      redirectTo: `/admin/notifications/${result.id}`,
      revalidate: ["/admin/notifications"],
    };
  });
}

export async function updateAnnouncementAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.announcements.update", formData, async () => {
    const actor = await requireAdminAction("class.manage");
    const announcementId = formText(formData, "announcementId");
    const result = await updateAnnouncement(actor, { announcementId, ...announcementFields(formData) }, await audit());
    return { data: result, message: STATE_MESSAGES[result.state] ?? "Saved.", revalidate: ["/admin/notifications", `/admin/notifications/${result.id}`] };
  });
}

function lifecycle(operation: string, run: typeof publishAnnouncementNow, message: string) {
  return async (formData: FormData): Promise<AdminActionState> =>
    runAdminAction(operation, formData, async () => {
      const actor = await requireAdminAction("class.manage");
      const announcementId = formText(formData, "announcementId");
      await run(actor, { announcementId }, await audit());
      return { data: null, message, revalidate: ["/admin/notifications", `/admin/notifications/${announcementId ?? ""}`] };
    });
}

const publishNow = lifecycle("admin.announcements.publish", publishAnnouncementNow, "Published. Delivery to recipients has started.");
const unschedule = lifecycle("admin.announcements.unschedule", unscheduleAnnouncement, "Moved back to drafts.");
const expire = lifecycle("admin.announcements.expire", async (actor, input, request) => void (await expireAnnouncement(actor, input, request)), "Ended. Recipients no longer see it.");
const archive = lifecycle("admin.announcements.archive", async (actor, input, request) => void (await archiveAnnouncement(actor, input, request)), "Archived.");

export async function publishAnnouncementAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return publishNow(formData);
}

export async function unscheduleAnnouncementAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return unschedule(formData);
}

export async function expireAnnouncementAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return expire(formData);
}

export async function archiveAnnouncementAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return archive(formData);
}
