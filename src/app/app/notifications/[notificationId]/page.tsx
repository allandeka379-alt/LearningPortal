import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryIcon } from "@/components/notifications/CategoryIcon";
import { categoryLabel } from "@/components/notifications/format";
import { MarkReadOnView } from "@/components/notifications/NotificationReadTracking";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getInboxNotification } from "@/server/notifications/digest";

export const metadata: Metadata = { title: "Notification" };

/**
 * One notification in full (§21 / §22 announcements): the announcement's sanitised body when it is an announcement
 * (rendered at write time by the content pipeline), otherwise the plain-text message, plus its link. Only the
 * recipient can open it (ownership is part of the query; anyone else gets a 404). Marked read once viewed.
 */
export default async function NotificationDetailPage({ params }: { params: Promise<{ notificationId: string }> }) {
  const actor = await requireOnboardedStudent({ next: "/app/notifications" });
  const { notificationId } = await params;
  const item = await getInboxNotification(actor.userId, notificationId);
  if (!item) notFound();

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        breadcrumbs={[{ label: "Notifications", href: "/app/notifications" }, { label: item.isAnnouncement ? "Announcement" : categoryLabel(item.category) }]}
        eyebrow={
          <span className="inline-flex items-center gap-1.5 [&_svg]:size-4">
            <CategoryIcon category={item.category} />
            {categoryLabel(item.category)}
          </span>
        }
        title={item.announcement?.title ?? item.title}
        description={<time dateTime={item.createdAt.toISOString()}>{formatInstantDate(item.createdAt, actor.timeZone, "long")}</time>}
      />
      <Card>
        <CardBody className="space-y-5">
          {item.announcementWithdrawn ? (
            <Alert tone="neutral" title="This announcement was withdrawn">
              Its author removed it after it was sent.
            </Alert>
          ) : item.announcement ? (
            <RichContent html={item.announcement.bodyHtml} />
          ) : (
            <p className="text-base break-words whitespace-pre-line text-text">{item.body}</p>
          )}
          {item.actionHref && (
            <ButtonLink href={item.actionHref} iconEnd={<ArrowRight aria-hidden="true" />}>
              Open
            </ButtonLink>
          )}
        </CardBody>
      </Card>
      <MarkReadOnView id={item.id} unread={item.unread} />
    </Container>
  );
}
