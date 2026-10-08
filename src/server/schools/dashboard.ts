import "server-only";
import type { LocalDate } from "@/lib/dates";
import { getSchoolAnalytics, type SchoolAnalytics } from "@/server/analytics/school";
import { db } from "@/server/db";
import { assertSchoolAdmin, type SchoolActor } from "./access";
import { getSchoolSeatSummary } from "./billing";
import type { SeatUsage } from "./core";

/**
 * The /school dashboard (§23): the school's §23 analytics (average score by subject, pass-rate ESTIMATE, topic
 * performance, engagement, class outcomes per teacher framed as outcomes, examination readiness; aggregates of the
 * current roster, never AI data) plus seat usage against the school subscription and the setup gaps that need action.
 * Aggregates only, so no per-student audit entry (individual records are audited in ./students).
 */

export interface SchoolDashboard {
  school: { schoolId: string; name: string; status: string; timezone: string };
  analytics: SchoolAnalytics;
  seats: (SeatUsage & { planName: string; status: string; currentPeriodEnd: Date | null }) | null;
  pending: { invitations: number; joinRequests: number };
  setup: { subjects: number; classes: number; classesWithoutTeacher: number; studentsWithoutClass: number; teachers: number };
}

export async function getSchoolDashboard(
  actor: SchoolActor,
  input: { schoolId: string; from: LocalDate; to: LocalDate },
  options: { now?: Date } = {},
): Promise<SchoolDashboard> {
  const school = await assertSchoolAdmin(actor, input.schoolId);
  const now = options.now ?? new Date();
  const schoolId = school.schoolId;
  const [analytics, invitations, joinRequests, subjects, classesWithoutTeacher, studentsWithoutClass] = await Promise.all([
    getSchoolAnalytics({ schoolId }, { from: input.from, to: input.to }, { now }),
    db.invitation.count({ where: { schoolId, kind: "SCHOOL_MEMBER", acceptedAt: null, revokedAt: null, expiresAt: { gt: now } } }),
    db.schoolMember.count({ where: { schoolId, role: "STUDENT", status: "REQUESTED" } }),
    db.schoolSubject.count({ where: { schoolId, isActive: true } }),
    db.class.count({ where: { schoolId, archivedAt: null, teachers: { none: { removedAt: null } } } }),
    db.schoolMember.count({
      where: {
        schoolId,
        role: "STUDENT",
        status: "ACTIVE",
        user: { classMemberships: { none: { status: "ACTIVE", class: { schoolId, archivedAt: null } } } },
      },
    }),
  ]);
  const seats = await getSchoolSeatSummary(schoolId, analytics.roster.students, now);
  return {
    school: { schoolId, name: school.name, status: school.status, timezone: school.timezone },
    analytics,
    seats: seats ? { ...seats } : null,
    pending: { invitations, joinRequests },
    setup: {
      subjects,
      classes: analytics.roster.classes,
      classesWithoutTeacher,
      studentsWithoutClass,
      teachers: analytics.roster.teachers,
    },
  };
}
