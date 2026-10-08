import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "primary" | "accent" | "success" | "warning" | "danger" | "info";
export type BadgeAppearance = "soft" | "solid" | "outline";

const SOFT: Record<BadgeTone, string> = {
  neutral: "bg-subtle text-text",
  primary: "bg-primary-soft text-on-primary-soft",
  accent: "bg-accent-soft text-on-accent-soft",
  success: "bg-success-soft text-success-text",
  warning: "bg-warning-soft text-warning-text",
  danger: "bg-danger-soft text-danger-text",
  info: "bg-info-soft text-info-text",
};

const SOLID: Record<BadgeTone, string> = {
  neutral: "bg-text text-bg",
  primary: "bg-primary text-on-primary",
  accent: "bg-accent text-on-accent",
  success: "bg-success text-on-success",
  warning: "bg-warning text-on-warning",
  danger: "bg-danger text-on-danger",
  info: "bg-info text-on-primary",
};

const OUTLINE: Record<BadgeTone, string> = {
  neutral: "border-border-strong text-text",
  primary: "border-primary/60 text-primary",
  accent: "border-accent text-accent-text",
  success: "border-success/60 text-success-text",
  warning: "border-warning/60 text-warning-text",
  danger: "border-danger/60 text-danger-text",
  info: "border-info/60 text-info-text",
};

const APPEARANCE: Record<BadgeAppearance, Record<BadgeTone, string>> = { soft: SOFT, solid: SOLID, outline: OUTLINE };

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  tone?: BadgeTone;
  appearance?: BadgeAppearance;
  size?: "sm" | "md";
  /** Decorative leading icon. */
  icon?: ReactNode;
}

/**
 * Short status label ("Draft", "New", "Premium"). Text always carries the meaning; tone is reinforcement.
 * Feedback tones (success/warning/danger) are reserved for status and marking, not decoration.
 */
export function Badge({ tone = "neutral", appearance = "soft", size = "md", icon, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-full border font-semibold whitespace-nowrap [&_svg]:shrink-0",
        appearance === "outline" ? "bg-transparent" : "border-transparent",
        size === "sm" ? "px-2 py-px text-xs [&_svg]:size-3" : "px-2.5 py-0.5 text-xs [&_svg]:size-3.5",
        APPEARANCE[appearance][tone],
        className,
      )}
      {...props}
    >
      {icon}
      <span className="truncate">{children}</span>
    </span>
  );
}
