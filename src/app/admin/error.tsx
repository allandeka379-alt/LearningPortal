"use client";

import { RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * Admin route error boundary. Shows a calm, generic message (never the internal error text or stack) plus the
 * digest so staff can quote it when reporting; the server log has the details under that reference.
 */
export default function AdminError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <Container size="wide" className="pt-8">
      <h1 className="text-2xl font-bold tracking-tight text-text">This page couldn&apos;t load</h1>
      <Alert tone="danger" className="mt-4 max-w-2xl" role="alert" title="Something went wrong on our side">
        Try again. If it keeps happening, report it with the reference below.
        {error.digest && (
          <span className="mt-2 block font-mono text-xs text-muted">Reference: {error.digest}</span>
        )}
      </Alert>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={retry} iconStart={<RotateCcw aria-hidden="true" />}>
          Try again
        </Button>
        <ButtonLink href="/admin" variant="outline">
          Admin dashboard
        </ButtonLink>
      </div>
    </Container>
  );
}
