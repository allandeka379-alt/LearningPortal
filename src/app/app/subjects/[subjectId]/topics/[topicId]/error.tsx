"use client";

import { RouteError } from "@/components/student/RouteError";

export default function TopicError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load this topic" backHref="/app/subjects" backLabel="Back to subjects" />;
}
