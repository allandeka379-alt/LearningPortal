"use client";

import { RouteError } from "@/components/student/RouteError";

export default function ExamResultsError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load your results" backHref="/app/exams" backLabel="Back to tests" />;
}
