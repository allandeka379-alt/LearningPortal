"use client";

import { RouteError } from "@/components/student/RouteError";

export default function DiagnosticReportError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <RouteError
      error={error}
      retry={retry}
      title="We couldn't load your diagnostic report"
      backHref="/app/diagnostic"
      backLabel="Back to the diagnostic"
    />
  );
}
