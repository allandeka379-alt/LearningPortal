import { Check, KeyRound, LogOut, Mail, School } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import { NavIcon } from "@/components/layout/nav-icons";
import type { NavItem } from "@/components/layout/nav-types";
import { Avatar } from "@/components/ui/Avatar";
import { DropdownMenu, DropdownMenuFormItem, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";

export interface SchoolHeaderActionsProps {
  displayName: string;
  schoolName: string;
  /** Destinations not in the mobile tab bar. */
  menuNav: readonly NavItem[];
  /** Every school the user administers (a switcher appears when there are several). */
  schools: readonly { id: string; name: string }[];
  currentSchoolId: string;
  /** Server Action that switches the current school (`schoolId` field). */
  switchSchoolAction: (formData: FormData) => Promise<void>;
}

/**
 * Right side of the school-admin top bar: the school's name (from `sm`) and the account menu (other destinations,
 * school switcher for admins of several schools, email and password, sign out). Server component.
 */
export function SchoolHeaderActions({ displayName, schoolName, menuNav, schools, currentSchoolId, switchSchoolAction }: SchoolHeaderActionsProps) {
  return (
    <>
      <p className="hidden max-w-[16rem] truncate text-sm font-medium text-muted sm:block" title={schoolName}>
        {schoolName}
      </p>
      <DropdownMenu
        align="end"
        triggerLabel="Account menu"
        triggerClassName="inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-subtle"
        trigger={<Avatar name={displayName} size="sm" decorative />}
      >
        <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
        {menuNav.map((item) => (
          <DropdownMenuItem key={item.href} href={item.href} icon={<NavIcon name={item.icon} />}>
            {item.label}
          </DropdownMenuItem>
        ))}
        {schools.length > 1 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Switch school</DropdownMenuLabel>
            {schools.map((school) => (
              <DropdownMenuFormItem
                key={school.id}
                action={switchSchoolAction}
                fields={{ schoolId: school.id }}
                icon={school.id === currentSchoolId ? <Check aria-hidden="true" /> : <School aria-hidden="true" />}
              >
                {school.name}
              </DropdownMenuFormItem>
            ))}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem href="/change-email" icon={<Mail aria-hidden="true" />}>
          Change email
        </DropdownMenuItem>
        <DropdownMenuItem href="/change-password" icon={<KeyRound aria-hidden="true" />}>
          Change password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuFormItem action={logoutAction} icon={<LogOut aria-hidden="true" />}>
          Sign out
        </DropdownMenuFormItem>
      </DropdownMenu>
    </>
  );
}
