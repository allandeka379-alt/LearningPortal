"use client";

import { RouteError } from "@/components/student/RouteError";

export default function SearchError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't search just now" backHref="/app" />;
}
