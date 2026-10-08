"use client";

import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { reloadPage } from "@/lib/pwa/browser";

/**
 * Reloads the current URL. On the offline page this retries the page the student was trying to open (the service
 * worker serves the offline page at that URL), or simply refreshes /offline.
 */
export function TryAgainButton() {
  return (
    <Button onClick={() => reloadPage()} iconStart={<RotateCw aria-hidden="true" />}>
      Try again
    </Button>
  );
}
