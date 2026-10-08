"use client";

import { useEffect } from "react";
import { reportOfflineViewer } from "@/lib/pwa/saved-lessons";

/**
 * Reports the signed-in student's viewer tag to the service worker (docs/OFFLINE.md, PRIV-01), so saved lessons are
 * only ever shown to the student who saved them and are deleted when someone else signs in on the same phone. Mounted
 * by the student area layout, so it also runs after a sign-in that ends in a client-side navigation. Renders nothing.
 */
export function OfflineViewerSync({ viewer }: { viewer: string }) {
  useEffect(() => {
    reportOfflineViewer(viewer);
  }, [viewer]);
  return null;
}
