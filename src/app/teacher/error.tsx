"use client";

import { RouteError } from "@/components/student/RouteError";

export default function TeacherError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load this page" backHref="/teacher" backLabel="Back to teacher home" />;
}
