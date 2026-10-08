import { KeyRound, LogOut, Mail } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import { NavIcon } from "@/components/layout/nav-icons";
import type { NavItem } from "@/components/layout/nav-types";
import { Avatar } from "@/components/ui/Avatar";
import { DropdownMenu, DropdownMenuFormItem, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";

export interface TeacherHeaderActionsProps {
  displayName: string;
  /** Destinations not in the mobile tab bar. */
  menuNav: readonly NavItem[];
}

/** Right side of the teacher top bar: the account menu (other destinations, email and password, sign out). Server component. */
export function TeacherHeaderActions({ displayName, menuNav }: TeacherHeaderActionsProps) {
  return (
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
  );
}
