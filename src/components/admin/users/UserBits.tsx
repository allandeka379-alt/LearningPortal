import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Role } from "@/generated/prisma/enums";
import { DemoBadge } from "../StatusBadge";

/** Small shared pieces of the people pages (server components). */

export const ROLE_LABELS: Readonly<Record<Role, string>> = {
  STUDENT: "Student",
  PARENT: "Parent",
  TEACHER: "Teacher",
  SCHOOL_ADMIN: "School admin",
  CONTENT_EDITOR: "Content editor",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super admin",
};

export const ROLE_OPTIONS = (Object.keys(ROLE_LABELS) as Role[]).map((role) => ({ value: role, label: ROLE_LABELS[role] }));

const STAFF: readonly Role[] = ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"];

export function RoleBadges({ roles }: { roles: readonly Role[] }) {
  if (roles.length === 0) return <span className="text-muted">No roles</span>;
  return (
    <span className="inline-flex flex-wrap gap-1">
      {roles.map((role) => (
        <Badge key={role} size="sm" tone={STAFF.includes(role) ? "primary" : "neutral"} appearance={STAFF.includes(role) ? "soft" : "outline"}>
          {ROLE_LABELS[role]}
        </Badge>
      ))}
    </span>
  );
}

/** Name cell linking to the user's admin page, with the login identifier underneath. */
export function UserNameCell({
  id,
  name,
  email,
  loginUsername,
  phoneMasked,
  isDemo,
}: {
  id: string;
  name: string;
  email: string | null;
  loginUsername?: string | null;
  phoneMasked?: string | null;
  isDemo?: boolean;
}) {
  const secondary = email ?? (loginUsername ? `@${loginUsername}` : null) ?? phoneMasked ?? null;
  return (
    <span className="block min-w-0">
      <Link href={`/admin/users/${id}`} className="font-semibold text-text underline-offset-4 hover:underline">
        {name}
      </Link>
      {isDemo && (
        <span className="ml-2 align-middle">
          <DemoBadge />
        </span>
      )}
      {secondary && <span className="block truncate text-xs font-normal text-muted">{secondary}</span>}
    </span>
  );
}
