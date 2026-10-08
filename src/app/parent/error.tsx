"use client";

import { RouteError } from "@/components/student/RouteError";

export default function ParentAreaError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load this page" backHref="/parent" backLabel="Back to your children" />;
}
