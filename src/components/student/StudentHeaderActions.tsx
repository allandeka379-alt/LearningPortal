import { LogOut, Settings } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import { NavIcon } from "@/components/layout/nav-icons";
import type { NavItem } from "@/components/layout/nav-types";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { ClearOfflineDataOnSubmit } from "@/components/pwa/ClearOfflineDataOnSubmit";
import { Avatar } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuFormItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { ExamCountdownPill, type CountdownView } from "./ExamCountdownPill";
import { StreakIndicator } from "./StreakIndicator";

export interface StudentHeaderActionsProps {
  displayName: string;
  /** `null` when the streak could not be loaded (the header degrades instead of failing the page). */
  streak: { current: number; status: "INACTIVE" | "AT_RISK" | "DONE_TODAY" } | null;
  countdown: CountdownView | null;
  /** Available destinations that are not in the mobile tab bar (reachable from this menu on phones). */
  menuNav: readonly NavItem[];
}

/**
 * Right side of the student top bar: streak, exam countdown, notification bell and the account menu (other
 * destinations, Settings, Sign out). Server component; only the menu and bell buttons are client-side. Signing out
 * also clears lessons saved for offline reading on this device (shared phones).
 */
export function StudentHeaderActions({ displayName, streak, countdown, menuNav }: StudentHeaderActionsProps) {
  return (
    <>
      {streak && <StreakIndicator current={streak.current} status={streak.status} />}
      <ExamCountdownPill countdown={countdown} />
      <NotificationBell />
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
        <DropdownMenuItem href="/app/settings" icon={<Settings aria-hidden="true" />}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ClearOfflineDataOnSubmit>
          <DropdownMenuFormItem action={logoutAction} icon={<LogOut aria-hidden="true" />}>
            Sign out
          </DropdownMenuFormItem>
        </ClearOfflineDataOnSubmit>
      </DropdownMenu>
    </>
  );
}
