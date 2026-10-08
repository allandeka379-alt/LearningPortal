import type { ReactNode } from "react";
import { logoutAction } from "@/app/(auth)/actions";
import { ClearOfflineDataOnSubmit } from "@/components/pwa/ClearOfflineDataOnSubmit";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

export interface LogoutButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  /** Decorative icon before the label. */
  iconStart?: ReactNode;
  children?: ReactNode;
}

/**
 * "Sign out" for shells and settings pages. A POST form bound to the logout Server Action (no state change via GET),
 * so it works without JavaScript. Server component. Lessons saved for offline reading are deleted on submit, so the
 * next person on a shared phone cannot read them (ARCHITECTURE §3.13).
 */
export function LogoutButton({ variant = "ghost", size, fullWidth, className, iconStart, children = "Sign out" }: LogoutButtonProps) {
  return (
    <ClearOfflineDataOnSubmit>
      <form action={logoutAction} className={fullWidth ? "w-full" : undefined}>
        <Button type="submit" variant={variant} size={size} fullWidth={fullWidth} className={className} iconStart={iconStart}>
          {children}
        </Button>
      </form>
    </ClearOfflineDataOnSubmit>
  );
}
