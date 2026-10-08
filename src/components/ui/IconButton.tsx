import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./button-styles";

export interface IconButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "aria-label" | "children"> {
  /** Required: an icon-only button has no other accessible name. */
  "aria-label": string;
  /** The icon element, e.g. `<X aria-hidden />`. */
  icon: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Square icon-only button (44px at `md`). Server-compatible. */
export function IconButton({ icon, variant = "ghost", size = "md", className, type = "button", ...props }: IconButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, iconOnly: true, className })} {...props}>
      {icon}
    </button>
  );
}
