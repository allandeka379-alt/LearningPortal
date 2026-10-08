import type { Metadata } from "next";
import { unstable_rethrow } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { schoolMenuNav, schoolNav, schoolTabs } from "@/components/school/nav";
import { SchoolHeaderActions } from "@/components/school/SchoolHeaderActions";
import { db } from "@/server/db";
import { logger } from "@/server/lib/logger";
import { administeredSchools, requireSchoolPage } from "./_lib/context";
import { switchSchoolAction } from "./actions";

// Private school pages: never indexed. Pages set their own titles (the root template adds the brand).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * School administration shell (§23, ARCHITECTURE §3.3 "/school"): an ACTIVE SCHOOL_ADMIN of an operating school is
 * required (others go to their own area). The Students badge is a real count of open join requests; a failure there
 * only drops the badge. Every page also resolves the school itself (layouts and pages render concurrently) and every
 * service re-checks the membership.
 */
export default async function SchoolAreaLayout({ children }: { children: ReactNode }) {
  const { actor, school } = await requireSchoolPage("/school");
  let requests: number | null = null;
  let schools: { id: string; name: string }[] = [{ id: school.schoolId, name: school.name }];
  try {
    [requests, schools] = await Promise.all([
      db.schoolMember.count({ where: { schoolId: school.schoolId, role: "STUDENT", status: "REQUESTED" } }),
      administeredSchools(actor),
    ]);
  } catch (error) {
    unstable_rethrow(error);
    logger.error("school area: header data failed", { userId: actor.userId, err: error });
  }
  const nav = schoolNav(requests);
  return (
    <AppShell
      nav={nav}
      tabs={schoolTabs(nav)}
      homeHref="/school"
      navLabel="School"
      headerActions={
        <SchoolHeaderActions
          displayName={actor.displayName}
          schoolName={school.name}
          menuNav={schoolMenuNav(nav)}
          schools={schools}
          currentSchoolId={school.schoolId}
          switchSchoolAction={switchSchoolAction}
        />
      }
    >
      {children}
    </AppShell>
  );
}
