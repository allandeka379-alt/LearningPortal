"use client";

import { RouteError } from "@/components/student/RouteError";

/** The exam could not be opened. Answers already saved are safe; the server timer and auto-submit keep working. */
export default function ExamRoomError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't open your exam. Your saved answers are safe." backHref="/app/exams" backLabel="Back to tests" />;
}
