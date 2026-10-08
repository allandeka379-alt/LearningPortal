import type { Metadata } from "next";
import { unstable_rethrow } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { teacherMenuNav, teacherNav, teacherTabs } from "@/components/teacher/nav";
import { TeacherHeaderActions } from "@/components/teacher/TeacherHeaderActions";
import { requireRole } from "@/server/auth/guards";
import { logger } from "@/server/lib/logger";
import { countAwaitingMarking } from "@/server/teaching/marking";

// Private teacher pages: never indexed. Pages set their own titles (the root template adds the brand).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Teacher area shell (§22, ARCHITECTURE §3.3 "/teacher"): TEACHER role required (others go to their own area). The
 * marking badge is a real count of answers waiting; a failure there only drops the badge. Every page also checks the
 * role itself (layouts and pages render concurrently) and the services apply the class-level checks.
 */
export default async function TeacherAreaLayout({ children }: { children: ReactNode }) {
  const actor = await requireRole("TEACHER");
  let badge: number | null = null;
  try {
    badge = await countAwaitingMarking(actor);
  } catch (error) {
    unstable_rethrow(error);
    logger.error("teacher area: marking badge failed", { userId: actor.userId, err: error });
  }
  const nav = teacherNav(badge);
  return (
    <AppShell
      nav={nav}
      tabs={teacherTabs(nav)}
      homeHref="/teacher"
      navLabel="Teacher"
      headerActions={<TeacherHeaderActions displayName={actor.displayName} menuNav={teacherMenuNav(nav)} />}
    >
      {children}
    </AppShell>
  );
}
