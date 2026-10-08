"use client";

import { RouteError } from "@/components/student/RouteError";

export default function SubjectDashboardError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load this subject" backHref="/app/subjects" backLabel="Back to subjects" />;
}
