import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./button-styles";
import { Spinner } from "./Spinner";

export type { ButtonSize, ButtonVariant } from "./button-styles";
export { buttonStyles } from "./button-styles";

interface CommonButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Icon before the label (decorative: pass `aria-hidden` icons). */
  iconStart?: ReactNode;
  /** Icon after the label (decorative). */
  iconEnd?: ReactNode;
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button">, CommonButtonProps {
  /**
   * Shows a spinner, sets `aria-busy` and disables the button so a slow connection can't trigger double
   * submits. The label stays (or is replaced by `loadingText`) so the button doesn't jump in width.
   */
  loading?: boolean;
  loadingText?: ReactNode;
}

/**
 * The standard button. Server-compatible (no hooks): pass `type="submit"` inside forms; defaults to
 * `type="button"` so a button never submits a form by accident.
 */
export function Button({
  variant,
  size,
  fullWidth,
  iconStart,
  iconEnd,
  loading = false,
  loadingText,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} /> : iconStart}
      {loading && loadingText ? loadingText : children}
      {!loading && iconEnd}
    </button>
  );
}

export interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className">, CommonButtonProps {
  className?: string;
}

/** A link styled as a button (navigation, not actions). Uses `next/link` for client-side navigation. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  iconStart,
  iconEnd,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, fullWidth, className })} {...props}>
      {iconStart}
      {children}
      {iconEnd}
    </Link>
  );
}
