"use client";

import { RouteError } from "@/components/student/RouteError";

export default function NotificationsError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load your notifications" backHref="/app" />;
}
