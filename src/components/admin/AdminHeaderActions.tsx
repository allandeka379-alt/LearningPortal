import { LogOut } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Badge } from "@/components/ui/Badge";
import type { Role } from "@/generated/prisma/enums";

const ROLE_LABEL: Partial<Record<Role, string>> = {
  SUPER_ADMIN: "Super admin",
  ADMIN: "Admin",
  CONTENT_EDITOR: "Content editor",
};

/** Highest staff role, for the header label. */
export function staffRoleLabel(roles: readonly Role[]): string {
  for (const role of ["SUPER_ADMIN", "ADMIN", "CONTENT_EDITOR"] as const) if (roles.includes(role)) return ROLE_LABEL[role]!;
  return "Staff";
}

/** Right side of the admin top bar: environment badge (non-production), who is signed in, sign out. Server component. */
export function AdminHeaderActions({ displayName, roles, environment }: { displayName: string; roles: readonly Role[]; environment: string }) {
  return (
    <>
      {environment !== "production" && (
        <span className="hidden sm:inline-flex">
          <Badge tone="warning">{environment === "test" ? "Test" : "Development"}</Badge>
        </span>
      )}
      <p className="hidden min-w-0 text-right text-sm leading-tight md:block">
        <span className="block truncate font-medium text-text">{displayName}</span>
        <span className="block text-xs text-muted">{staffRoleLabel(roles)}</span>
      </p>
      <LogoutButton size="sm" variant="ghost" iconStart={<LogOut aria-hidden="true" />}>
        Sign out
      </LogoutButton>
    </>
  );
}
