"use client";

import { CircleAlert, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button, ButtonLink } from "@/components/ui/Button";

export interface RouteErrorProps {
  error: Error & { digest?: string };
  /** Next.js `retry()`: re-fetches and re-renders the segment. */
  retry: () => void;
  /** Short statement of what failed, e.g. "We couldn't load your subjects." */
  title?: string;
  /** Where "Back" goes; omit on the student home itself. */
  backHref?: string;
  backLabel?: string;
}

/**
 * Error fallback for student routes (`error.tsx`). Calm wording, a retry and a way out; the server-side reference
 * (digest) is shown so support can match the log entry. Never shows the raw error message (server errors arrive
 * redacted in production anyway). Focus moves to the heading so screen-reader users hear what happened.
 */
export function RouteError({ error, retry, title = "Something went wrong", backHref, backLabel = "Back to home" }: RouteErrorProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <Container size="reading" className="py-10 sm:py-14">
      <div role="alert" className="rounded-card border border-border bg-surface p-6 text-center sm:p-8">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-danger-soft text-danger-text [&_svg]:size-6">
          <CircleAlert aria-hidden="true" />
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="text-xl font-semibold text-text">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          This is usually temporary, for example a weak connection. Please try again.
        </p>
        {error.digest && <p className="mt-2 text-xs text-muted">Reference: {error.digest}</p>}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={() => retry()} iconStart={<RotateCcw aria-hidden="true" />}>
            Try again
          </Button>
          {backHref && (
            <ButtonLink href={backHref} variant="outline">
              {backLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </Container>
  );
}
