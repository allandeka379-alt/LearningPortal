"use client";

import { RouteError } from "@/components/student/RouteError";

export default function TutorConversationError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load this conversation" backHref="/app/tutor" backLabel="Back to the tutor" />;
}
