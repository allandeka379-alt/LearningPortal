import { LogOut, Settings, UserPlus } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import { Avatar } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuFormItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";

/** Right side of the parent top bar: the account menu (link a child, settings, sign out). Server component. */
export function ParentHeaderActions({ displayName }: { displayName: string }) {
  return (
    <DropdownMenu
      align="end"
      triggerLabel="Account menu"
      triggerClassName="inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-subtle"
      trigger={<Avatar name={displayName} size="sm" decorative />}
    >
      <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
      <DropdownMenuItem href="/parent/link" icon={<UserPlus aria-hidden="true" />}>
        Link a child
      </DropdownMenuItem>
      <DropdownMenuItem href="/parent/settings" icon={<Settings aria-hidden="true" />}>
        Settings
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuFormItem action={logoutAction} icon={<LogOut aria-hidden="true" />}>
        Sign out
      </DropdownMenuFormItem>
    </DropdownMenu>
  );
}
