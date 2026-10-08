import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "flat" | "sunken";
type CardElement = "div" | "section" | "article" | "li" | "aside";

const VARIANTS: Record<CardVariant, string> = {
  default: "border border-border bg-surface shadow-xs",
  flat: "border border-border bg-surface",
  sunken: "border border-transparent bg-subtle",
};

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** Semantic element; use `article` for self-contained items, `section` when the card has a heading. */
  as?: CardElement;
  variant?: CardVariant;
  /**
   * Hover affordance for cards that contain a stretched primary link. Pattern: put `relative` on the card
   * (added automatically) and `after:absolute after:inset-0` on the title link, so the whole card is clickable
   * while the link stays the single accessible target.
   */
  interactive?: boolean;
}

/** Surface container. Compose with `CardHeader`, `CardBody`, `CardFooter`. */
export function Card({ as = "div", variant = "default", interactive = false, className, ...props }: CardProps) {
  // All allowed elements accept the same global attributes; type them as div for JSX checking.
  const Component = as as "div";
  return (
    <Component
      className={cn(
        "rounded-card",
        VARIANTS[variant],
        interactive &&
          "relative transition-[border-color,box-shadow] duration-150 hover:border-border-strong hover:shadow-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus",
        className,
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  /** Heading level for `title`; pick the one that fits the page outline. */
  titleAs?: "h2" | "h3" | "h4";
  /** Right-aligned slot (a button, menu or badge). */
  action?: ReactNode;
}

/** Card header with optional title/description/action. Pass `children` instead for a custom layout. */
export function CardHeader({ title, description, titleAs = "h3", action, className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5", className)} {...props}>
      {children ?? (
        <div className="min-w-0 space-y-1">
          {title !== undefined && <CardTitle as={titleAs}>{title}</CardTitle>}
          {description !== undefined && <CardDescription>{description}</CardDescription>}
        </div>
      )}
      {action !== undefined && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export interface CardTitleProps extends ComponentPropsWithoutRef<"h3"> {
  as?: "h2" | "h3" | "h4" | "p";
}

export function CardTitle({ as = "h3", className, ...props }: CardTitleProps) {
  const Component = as as "h3";
  return <Component className={cn("text-base font-semibold text-text", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-sm text-muted", className)} {...props} />;
}

export function CardBody({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("p-4 sm:p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3 border-t border-border px-4 py-3 sm:px-5", className)}
      {...props}
    />
  );
}
