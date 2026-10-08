"use client";

import { RouteError } from "@/components/student/RouteError";

export default function DiagnosticRoomError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <RouteError
      error={error}
      retry={retry}
      title="We couldn't open your diagnostic"
      backHref="/app/diagnostic"
      backLabel="Back to the diagnostic"
    />
  );
}
