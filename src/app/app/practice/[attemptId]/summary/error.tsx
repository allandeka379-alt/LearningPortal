"use client";

import { RouteError } from "@/components/student/RouteError";

export default function PracticeSummaryError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <RouteError error={error} retry={retry} title="We couldn't load your results" backHref="/app/practice" backLabel="Back to practice" />
  );
}
