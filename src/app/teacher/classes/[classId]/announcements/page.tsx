import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { Container } from "@/components/layout/Container";
import { AnnouncementForm } from "@/components/teacher/AnnouncementForm";
import { AnnouncementList } from "@/components/teacher/AnnouncementList";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { requireRole } from "@/server/auth/guards";
import { isUuid, loadClassForTeacher } from "@/server/teaching/access";
import { listClassAnnouncements } from "@/server/teaching/announcements";
import { orNotFound } from "../../../_lib/page";
import { archiveAnnouncementAction, createAnnouncementAction } from "../../actions";

export const metadata: Metadata = { title: "Class announcements" };

/** Announcements to a class (§22): write one (students are notified in the app), see and withdraw earlier ones. */
export default async function ClassAnnouncementsPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  if (!isUuid(classId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}/announcements` });
  const [cls, items] = await orNotFound(Promise.all([loadClassForTeacher(actor, classId), listClassAnnouncements(actor, classId)]));
  const archived = cls.archivedAt !== null;

  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader cls={cls} section="announcements" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {!archived && (
          <Card as="section" aria-labelledby="new-ann">
            <CardHeader titleAs="h2" title={<span id="new-ann">New announcement</span>} />
            <CardBody>
              <AnnouncementForm classId={cls.id} action={createAnnouncementAction} />
            </CardBody>
          </Card>
        )}
        <section aria-labelledby="ann-list" className="space-y-3">
          <h2 id="ann-list" className="text-lg font-semibold text-text">
            Sent and scheduled
          </h2>
          <AnnouncementList
            items={items}
            timeZone={actor.timeZone}
            renderActions={(item) =>
              archived ? null : (
                <ConfirmAction
                  action={archiveAnnouncementAction}
                  fields={{ announcementId: item.id, classId: cls.id }}
                  triggerLabel="Withdraw"
                  tone="danger"
                  title="Withdraw this announcement?"
                  description="It disappears from the class page and from students' notifications."
                  confirmLabel="Withdraw"
                />
              )
            }
          />
        </section>
      </div>
    </Container>
  );
}
