"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Re-renders the (server) page every few seconds while a background job is working on it, so progress and the final
 * result appear without a reload. Pauses while the tab is hidden (saves data on slow connections, §29) and stops
 * after `maxMinutes`. Renders a polite status line for screen readers. No data fetching library: it only asks the
 * router to refresh the Server Component.
 */
export function AutoRefresh({ intervalMs = 4_000, maxMinutes = 30, label = "This page updates automatically while the job runs." }: { intervalMs?: number; maxMinutes?: number; label?: string }) {
  const router = useRouter();
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (Date.now() - started > maxMinutes * 60_000) {
        window.clearInterval(timer);
        setStopped(true);
        return;
      }
      if (document.visibilityState === "visible") router.refresh();
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [router, intervalMs, maxMinutes]);

  return (
    <p className="text-sm text-muted" role="status" aria-live="polite">
      {stopped ? "Automatic updates stopped. Reload the page to see the latest state." : label}
    </p>
  );
}
