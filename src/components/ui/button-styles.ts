import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control border text-center font-semibold leading-tight " +
  "transition-colors duration-150 select-none disabled:cursor-not-allowed disabled:opacity-55 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-55";

/*
 * Every variant keeps a 1px border (transparent where not visible) so buttons stay outlined in forced-colours
 * mode. `not-disabled:hover:` avoids hover feedback on disabled buttons while still working for links.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-primary text-on-primary not-disabled:hover:bg-primary-hover",
  secondary: "border-transparent bg-primary-soft text-on-primary-soft not-disabled:hover:bg-primary-soft-hover",
  outline: "border-border-strong bg-transparent text-text not-disabled:hover:bg-subtle",
  ghost: "border-transparent bg-transparent text-text not-disabled:hover:bg-subtle",
  danger: "border-transparent bg-danger text-on-danger not-disabled:hover:bg-danger-hover",
  accent: "border-transparent bg-accent text-on-accent not-disabled:hover:bg-accent-hover",
};

/**
 * `md` is the default and meets the 44px touch-target rule. `sm` is 36px only with a precise pointer (mouse, trackpad);
 * on touch screens it keeps the 44px target (§29, §43), so dense desktop layouts never shrink a phone's targets.
 */
const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-11 pointer-fine:min-h-9 px-3 text-sm [&_svg]:size-4",
  md: "min-h-11 px-4 text-sm [&_svg]:size-4.5",
  lg: "min-h-12 px-6 text-base [&_svg]:size-5",
};

const ICON_SIZES: Record<ButtonSize, string> = {
  sm: "size-11 pointer-fine:size-9 [&_svg]:size-4",
  md: "size-11 [&_svg]:size-5",
  lg: "size-12 [&_svg]:size-5",
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Square button sized for a single icon. */
  iconOnly?: boolean;
  className?: string;
}

/**
 * Class list for anything that should look like a button (`<button>`, `<Link>`, `<summary>`, a menu trigger).
 * Prefer `Button` / `ButtonLink` / `IconButton`; use this only when you need the look on another element.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconOnly = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(BASE, VARIANTS[variant], iconOnly ? ICON_SIZES[size] : SIZES[size], fullWidth && "w-full", className);
}
