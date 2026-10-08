import "server-only";
import { cache } from "react";
import type { Role, SchoolMemberRole } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { OPERATING_SCHOOL_STATUSES, SESSION_USER_STATUSES } from "./session-policy";
import { getCurrentSession, type SessionUser, type ValidatedSession } from "./sessions";

/**
 * The authenticated user context every service receives (CLAUDE.md rule 1, ARCHITECTURE §3.1). Services never read
 * cookies or headers: routes resolve an `Actor` (cookie session, bearer token, WhatsApp identity) and pass it down.
 *
 * Structurally compatible with `InfraActor` (src/server/lib/audit.ts: `{ kind: "user", userId, roles }`), so an Actor
 * can be passed to `setSetting`, `createMediaAsset` and `auditActorFields` as-is.
 */

export type ActorChannel = "web" | "api" | "whatsapp";

/** An ACTIVE school membership. SCHOOL_ADMIN authority exists only through these rows (§23). */
export interface SchoolRole {
  schoolId: string;
  role: SchoolMemberRole;
}

export interface Actor {
  kind: "user";
  userId: string;
  /**
   * Effective roles: the platform roles plus SCHOOL_ADMIN when the user administers at least one school. Use with
   * `hasPermission` / `requireRole`. Which school is a resource question: use the checks in ./rbac.
   */
  roles: Role[];
  /** `User.roles` as stored (never contains SCHOOL_ADMIN). */
  platformRoles: Role[];
  /** ACTIVE memberships in schools that are not suspended or closed. */
  schoolRoles: SchoolRole[];
  /** Name for UI greetings (display name, first name or public username). Never log it. */
  displayName: string;
  /** Set when the user has a Student row (the Student primary key is the user id). */
  studentId?: string;
  /** `null` when the user is not a student; otherwise whether the onboarding wizard is complete. */
  studentOnboardingCompleted: boolean | null;
  /**
   * True while the user signs in with a password someone else set (school roster import or school-admin reset): every
   * guard sends them to /change-password (pages) or refuses with FORBIDDEN (actions, API) until they choose their own.
   */
  passwordMustChange?: boolean;
  /** IANA time zone for day boundaries (streaks, daily goals). */
  timeZone: string;
  /** Session the actor was resolved from; `null` for actors built outside a session (jobs acting for a user). */
  sessionId: string | null;
  channel: ActorChannel;
}

/** Message of the FORBIDDEN error while the user still has to replace a school-set password. */
export const PASSWORD_CHANGE_REQUIRED_MESSAGE = "Choose a new password to continue. Your school set the one you signed in with.";

/**
 * Throws FORBIDDEN (`details.reason = "password_change_required"`) while the actor must replace a school-set password
 * (`Actor.passwordMustChange`). Used by every action / API guard (./guards, `apiRoute` in src/server/lib/api.ts).
 */
export function assertPasswordSettled(actor: Pick<Actor, "passwordMustChange">): void {
  if (actor.passwordMustChange === true) {
    throw new AppError("FORBIDDEN", PASSWORD_CHANGE_REQUIRED_MESSAGE, { details: { reason: "password_change_required" } });
  }
}

/** Builds an {@link Actor} from the user facts loaded with a session. Pure. */
export function buildActor(user: SessionUser, context: { sessionId: string | null; channel: ActorChannel }): Actor {
  const platformRoles = [...new Set(user.roles)].filter((role) => role !== "SCHOOL_ADMIN");
  const schoolRoles = user.schoolMemberships.map(({ schoolId, role }) => ({ schoolId, role }));
  const roles: Role[] = [...platformRoles];
  if (schoolRoles.some((membership) => membership.role === "SCHOOL_ADMIN")) roles.push("SCHOOL_ADMIN");
  const profile = user.profile;
  const actor: Actor = {
    kind: "user",
    userId: user.id,
    roles,
    platformRoles,
    schoolRoles,
    displayName: profile?.displayName?.trim() || profile?.firstName?.trim() || profile?.username || "User",
    studentOnboardingCompleted: user.student === null ? null : user.student.onboardingCompletedAt !== null,
    passwordMustChange: user.passwordMustChange === true,
    timeZone: profile?.timezone || DEFAULT_TIMEZONE,
    sessionId: context.sessionId,
    channel: context.channel,
  };
  if (user.student !== null) actor.studentId = user.id;
  return actor;
}

/** Actor for a validated session. */
export function actorFromSession(validated: ValidatedSession, channel?: ActorChannel): Actor {
  const resolved = channel ?? (validated.session.kind === "API" ? "api" : validated.session.kind === "WHATSAPP" ? "whatsapp" : "web");
  return buildActor(validated.user, { sessionId: validated.session.id, channel: resolved });
}

/**
 * Loads an Actor for `userId` straight from the database (no session): for the worker acting on a user's behalf, the
 * WhatsApp channel after identity resolution, and post-login routing. `null` when the user does not exist or may not
 * act (suspended / deleted).
 */
export async function loadActor(
  userId: string,
  context: { sessionId?: string | null; channel?: ActorChannel } = {},
): Promise<Actor | null> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      status: true,
      roles: true,
      passwordUpdatedAt: true,
      passwordMustChange: true,
      lastActiveAt: true,
      profile: { select: { displayName: true, firstName: true, username: true, timezone: true } },
      student: { select: { onboardingCompletedAt: true } },
      schoolMemberships: {
        where: { status: "ACTIVE", school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } },
        select: { schoolId: true, role: true },
      },
    },
  });
  if (!user || !SESSION_USER_STATUSES.includes(user.status)) return null;
  return buildActor(user, { sessionId: context.sessionId ?? null, channel: context.channel ?? "web" });
}

/** The signed-in user of the current web request (cookie session), memoised per request; `null` when signed out. */
export const getActor = cache(async (): Promise<Actor | null> => {
  const validated = await getCurrentSession();
  return validated === null ? null : actorFromSession(validated, "web");
});

/**
 * The signed-in user of the current web request, or `AppError("UNAUTHENTICATED")`. For Server Actions and services
 * called from them; pages use `requireUser()` from ./guards (which redirects to /login instead).
 */
export async function requireActor(): Promise<Actor> {
  const actor = await getActor();
  if (actor === null) throw AppError.unauthenticated();
  return actor;
}
