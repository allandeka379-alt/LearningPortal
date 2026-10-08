import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export interface AuthCardProps {
  /** The page's single `<h1>`. */
  title: ReactNode;
  description?: ReactNode;
  /** Secondary links under the form ("New here? Create an account"). */
  footer?: ReactNode;
  children: ReactNode;
}

/** Card frame for the auth pages: title, description, form, footer links. Server component, mobile-first. */
export function AuthCard({ title, description, footer, children }: AuthCardProps) {
  return (
    <Card as="section" aria-labelledby="auth-title" className="p-5 sm:p-8">
      <h1 id="auth-title" className="text-2xl font-bold tracking-tight text-text">
        {title}
      </h1>
      {description && <div className="mt-2 text-base text-muted">{description}</div>}
      <div className="mt-6 space-y-5">{children}</div>
      {footer && <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-muted">{footer}</div>}
    </Card>
  );
}

/** "or" separator between the form and alternative sign-in options. */
export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted" role="separator" aria-label={label}>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span aria-hidden="true">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}

/** Inline text link in auth copy (44px-friendly line height, visible focus via global styles). */
export const authLinkClassName = "font-semibold text-primary underline-offset-4 hover:underline";
