import "server-only";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { AppError } from "@/server/lib/errors";

/** Shared list helpers for school member lists (keyset cursors and the name / email / username / number search). */

const cursorSchema = z.object({ t: z.number().int().nonnegative(), id: z.uuid() });

/** Opaque keyset cursor (newest first): `createdAt` + `id` tiebreak. */
export function encodeMemberCursor(row: { createdAt: Date; id: string }): string {
  return Buffer.from(JSON.stringify({ t: row.createdAt.getTime(), id: row.id })).toString("base64url");
}

export function decodeMemberCursor(cursor: string): { createdAt: Date; id: string } {
  try {
    const parsed = cursorSchema.parse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")));
    return { createdAt: new Date(parsed.t), id: parsed.id };
  } catch {
    throw AppError.validation({ cursor: ["This page link is out of date. Go back to the first page."] });
  }
}

/**
 * Which login identifiers the admin may see for the members being listed:
 * - `"listed"`: shown in the list in full (teachers: the email is the staff work contact), so prefix search is fine;
 * - `"hidden"`: never shown (students: contact details are never listed, and only usernames this school issued are).
 *   A prefix match on a hidden value would be an oracle: search "t", "ta", "tan"… and watch whether the student stays in
 *   the results to recover their private email one character at a time (PRIV-03). Hidden values therefore match only
 *   in full; the school's own issued usernames (`provisionedBySchoolId` = this school) keep prefix search.
 */
export type MemberIdentifierVisibility = "listed" | "hidden";

/**
 * Search across a member's names, school username, admission number (case-insensitive) and email: prefix matches on
 * identifiers the list shows, exact matches only on those it hides (see {@link MemberIdentifierVisibility}).
 */
export function memberSearchWhere(q: string, scope: { schoolId: string; identifiers: MemberIdentifierVisibility }): Prisma.SchoolMemberWhereInput {
  const term = q.trim();
  const lower = term.toLowerCase();
  const identifierMatches: Prisma.SchoolMemberWhereInput[] =
    scope.identifiers === "listed"
      ? [{ user: { emailNormalized: { startsWith: lower } } }, { user: { loginUsername: { startsWith: lower } } }]
      : [
          { user: { emailNormalized: { equals: lower } } },
          { user: { loginUsername: { equals: lower } } },
          { user: { loginUsername: { startsWith: lower }, provisionedBySchoolId: scope.schoolId } },
        ];
  return {
    OR: [
      { studentNumber: { equals: term, mode: "insensitive" } },
      ...identifierMatches,
      { user: { profile: { is: { firstName: { contains: term, mode: "insensitive" } } } } },
      { user: { profile: { is: { lastName: { contains: term, mode: "insensitive" } } } } },
      { user: { profile: { is: { displayName: { contains: term, mode: "insensitive" } } } } },
    ],
  };
}
