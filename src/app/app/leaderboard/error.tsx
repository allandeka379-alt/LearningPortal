"use client";

import { RouteError } from "@/components/student/RouteError";

export default function LeaderboardError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load the leaderboard" backHref="/app" />;
}
