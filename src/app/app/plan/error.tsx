"use client";

import { RouteError } from "@/components/student/RouteError";

export default function StudyPlanError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load your study plan" backHref="/app" />;
}
