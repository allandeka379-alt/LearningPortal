import { Archive, CalendarX, Send, Undo2 } from "lucide-react";
import { notFound } from "next/navigation";
import { AnnouncementForm } from "@/components/admin/announcements/AnnouncementForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ROLE_LABELS } from "@/components/admin/users/UserBits";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { formatNumber, formatPercent } from "@/lib/format";
import { instantToLocalDateTime } from "@/server/cms/announcements/schemas";
import { getAnnouncement, listAnnouncementCountries, type AnnouncementDetail } from "@/server/cms/announcements/service";
import { isAppError } from "@/server/lib/errors";
import {
  archiveAnnouncementAction,
  expireAnnouncementAction,
  publishAnnouncementAction,
  unscheduleAnnouncementAction,
  updateAnnouncementAction,
} from "../actions";

export const metadata = { title: "Announcement" };

/** /admin/notifications/[id] — one announcement: preview, delivery figures, lifecycle actions, edit while unpublished. */
export default async function AdminAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("class.manage", { next: `/admin/notifications/${id}` });
  let announcement: AnnouncementDetail;
  try {
    announcement = await getAnnouncement(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const countries = announcement.editable ? await listAnnouncementCountries(actor) : [];
  const fields = { announcementId: announcement.id };
  const delivering = announcement.state === "LIVE" && announcement.fannedOutAt === null;

  return (
    <Container size="wide">
      <PageHeader
        title={announcement.title}
        breadcrumbs={[{ label: "Notifications", href: "/admin/notifications" }, { label: announcement.title }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge kind="announcement" status={announcement.state} size="md" />
            <span>{announcement.target ?? "Unknown audience"}</span>
          </span>
        }
      />
      {delivering && (
        <Alert tone="info" className="mb-6" role="status" title="Delivering">
          Notifications are being created in the background. Refresh to see the delivered count grow.
        </Alert>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <AdminSection title="Preview" description="How the message reads in the announcement feed.">
            <RichContent html={announcement.bodyHtml} />
          </AdminSection>
          {announcement.editable && (
            <AdminSection title="Edit" description="Only drafts and scheduled announcements can be edited. Delivered messages are never rewritten.">
              <AnnouncementForm
                action={updateAnnouncementAction}
                countries={countries}
                announcementId={announcement.id}
                submitLabel="Save draft"
                values={{
                  scope: announcement.scope,
                  schoolRef: announcement.schoolSlug,
                  classRef: announcement.classJoinCode ?? announcement.classId,
                  countryId: announcement.countryId,
                  title: announcement.title,
                  body: announcement.body,
                  audienceRoles: announcement.audienceRoles,
                  pinned: announcement.pinned,
                  notify: announcement.notify,
                  publish: announcement.state === "SCHEDULED" ? "schedule" : "draft",
                  publishAt: announcement.publishedAt ? instantToLocalDateTime(announcement.publishedAt, DEFAULT_TIMEZONE) : null,
                  expiresAt: announcement.expiresAt ? instantToLocalDateTime(announcement.expiresAt, DEFAULT_TIMEZONE) : null,
                }}
              />
            </AdminSection>
          )}
        </div>
        <div className="min-w-0 space-y-6">
          <AdminSection title="Delivery">
            <KeyValueList
              columns={1}
              items={[
                { label: "Audience", value: announcement.audienceRoles.length === 0 ? "Everyone in scope" : announcement.audienceRoles.map((role) => ROLE_LABELS[role]).join(", ") },
                { label: announcement.state === "SCHEDULED" ? "Publishes" : "Published", value: <Timestamp value={announcement.publishedAt} /> },
                { label: "Stops showing", value: announcement.expiresAt ? <Timestamp value={announcement.expiresAt} /> : "No end date" },
                { label: "Delivered to", value: announcement.publishedAt ? `${formatNumber(announcement.recipients)} ${announcement.recipients === 1 ? "person" : "people"}` : "Not published" },
                {
                  label: "Read",
                  value:
                    announcement.recipients > 0
                      ? `${formatNumber(announcement.read)} (${formatPercent(announcement.read / announcement.recipients, { input: "ratio" })})`
                      : null,
                  hideWhenEmpty: true,
                },
                { label: "Delivery finished", value: announcement.fannedOutAt ? <Timestamp value={announcement.fannedOutAt} /> : null, hideWhenEmpty: true },
                { label: "Pinned", value: announcement.pinned ? "Yes" : "No" },
                { label: "Author", value: announcement.author },
                { label: "Created", value: <Timestamp value={announcement.createdAt} /> },
              ]}
            />
          </AdminSection>
          <AdminSection title="Actions">
            <div className="flex flex-col items-start gap-2">
              {(announcement.state === "DRAFT" || announcement.state === "SCHEDULED") && (
                <ConfirmAction
                  action={publishAnnouncementAction}
                  fields={fields}
                  triggerLabel="Publish now"
                  triggerVariant="primary"
                  triggerIcon={<Send aria-hidden="true" />}
                  title="Publish this announcement now?"
                  description="It is delivered to every recipient's inbox straight away and can't be edited afterwards."
                  confirmLabel="Publish now"
                />
              )}
              {announcement.state === "SCHEDULED" && (
                <ConfirmAction
                  action={unscheduleAnnouncementAction}
                  fields={fields}
                  triggerLabel="Unschedule"
                  triggerIcon={<Undo2 aria-hidden="true" />}
                  title="Move back to drafts?"
                  description="It won't be published at the scheduled time."
                  confirmLabel="Unschedule"
                />
              )}
              {announcement.state === "LIVE" && (
                <ConfirmAction
                  action={expireAnnouncementAction}
                  fields={fields}
                  tone="danger"
                  triggerLabel="End now"
                  triggerIcon={<CalendarX aria-hidden="true" />}
                  title="Stop showing this announcement?"
                  description="It disappears from feeds and from recipients' inboxes. The record is kept."
                  confirmLabel="End now"
                />
              )}
              {announcement.state !== "ARCHIVED" && (
                <ConfirmAction
                  action={archiveAnnouncementAction}
                  fields={fields}
                  tone="danger"
                  triggerLabel="Archive"
                  triggerIcon={<Archive aria-hidden="true" />}
                  title="Archive this announcement?"
                  description="Archiving is final. Any delivered copies are hidden and a scheduled one won't be sent."
                  confirmLabel="Archive"
                />
              )}
              {announcement.state === "ARCHIVED" && <p className="text-sm text-muted">Archived announcements are kept for the record and can&apos;t be changed.</p>}
            </div>
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
