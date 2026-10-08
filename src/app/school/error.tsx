"use client";

import { RouteError } from "@/components/student/RouteError";

export default function SchoolError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load this page" backHref="/school" backLabel="Back to the school overview" />;
}
