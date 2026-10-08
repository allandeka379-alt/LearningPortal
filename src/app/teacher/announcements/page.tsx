import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnnouncementList } from "@/components/teacher/AnnouncementList";
import { requireRole } from "@/server/auth/guards";
import { listTeacherAnnouncements } from "@/server/teaching/announcements";

export const metadata: Metadata = { title: "Announcements" };

/** Recent announcements across the teacher's classes. Writing one happens on the class's Announcements page. */
export default async function TeacherAnnouncementsPage() {
  const actor = await requireRole("TEACHER", { next: "/teacher/announcements" });
  const items = await listTeacherAnnouncements(actor);
  return (
    <Container size="reading" className="space-y-4 pb-10">
      <PageHeader title="Announcements" description="Recent announcements to your classes. To write one, open the class and choose Announcements." className="pb-0" />
      <AnnouncementList items={items} timeZone={actor.timeZone} />
    </Container>
  );
}
