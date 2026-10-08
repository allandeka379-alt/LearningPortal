import { CircleAlert, CircleCheck, Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AlertTone = "info" | "success" | "warning" | "danger" | "accent" | "neutral";

const TONE: Record<AlertTone, { box: string; callout: string; icon: string; title: string }> = {
  info: { box: "bg-info-soft border-info/30", callout: "border-l-info", icon: "text-info-text", title: "text-info-text" },
  success: {
    box: "bg-success-soft border-success/30",
    callout: "border-l-success",
    icon: "text-success-text",
    title: "text-success-text",
  },
  warning: {
    box: "bg-warning-soft border-warning/30",
    callout: "border-l-warning",
    icon: "text-warning-text",
    title: "text-warning-text",
  },
  danger: {
    box: "bg-danger-soft border-danger/30",
    callout: "border-l-danger",
    icon: "text-danger-text",
    title: "text-danger-text",
  },
  accent: {
    box: "bg-accent-soft border-accent/40",
    callout: "border-l-accent",
    icon: "text-accent-text",
    title: "text-on-accent-soft",
  },
  neutral: { box: "bg-subtle border-border", callout: "border-l-border-strong", icon: "text-muted", title: "text-text" },
};

const DEFAULT_ICON: Record<AlertTone, ReactNode> = {
  info: <Info aria-hidden="true" />,
  success: <CircleCheck aria-hidden="true" />,
  warning: <TriangleAlert aria-hidden="true" />,
  danger: <CircleAlert aria-hidden="true" />,
  accent: <Lightbulb aria-hidden="true" />,
  neutral: <Info aria-hidden="true" />,
};

export interface AlertProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  tone?: AlertTone;
  title?: ReactNode;
  /** Override the tone icon, or `false` to hide it. */
  icon?: ReactNode | false;
  /** Trailing actions (buttons/links). */
  action?: ReactNode;
  /**
   * `"alert"` (default): tinted status box for system messages.
   * `"callout"`: left-ruled aside for content ("Exam tip", "Common mistake") inside lessons.
   */
  variant?: "alert" | "callout";
}

/**
 * Status message or content callout. Static by default (no live-region role) because server-rendered messages
 * are read in document order. For messages that appear after a user action, pass `role="alert"` (urgent errors)
 * or `role="status"` (confirmations), or use the toast system.
 */
export function Alert({ tone = "info", title, icon, action, variant = "alert", className, children, ...props }: AlertProps) {
  const styles = TONE[tone];
  const iconNode = icon === false ? null : (icon ?? DEFAULT_ICON[tone]);
  return (
    <div
      className={cn(
        "flex gap-3 text-sm text-text",
        variant === "alert"
          ? cn("rounded-card border p-4", styles.box)
          : cn("rounded-r-card border-l-4 bg-surface py-3 pr-4 pl-4", styles.callout),
        className,
      )}
      {...props}
    >
      {iconNode && <span className={cn("mt-px shrink-0 [&_svg]:size-5", styles.icon)}>{iconNode}</span>}
      <div className="min-w-0 flex-1">
        {title && <p className={cn("font-semibold", styles.title)}>{title}</p>}
        {children && <div className={cn("leading-relaxed", title ? "mt-1" : undefined)}>{children}</div>}
        {action && <div className="mt-3 flex flex-wrap gap-2">{action}</div>}
      </div>
    </div>
  );
}

/** Content callout (lesson tips, worked-example notes). Alias of `Alert` with `variant="callout"`. */
export function Callout(props: Omit<AlertProps, "variant">) {
  return <Alert {...props} variant="callout" />;
}
