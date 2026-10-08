"use client";

import type { ReactNode } from "react";
import { clearOfflineData } from "@/lib/pwa/saved-lessons";

/**
 * Wrap a sign-out form with this: when the form is submitted, lessons saved for offline reading are deleted from the
 * device (shared phones, ARCHITECTURE §3.13). The form itself is unchanged and still works without JavaScript; the
 * wrapper uses `display: contents`, so it does not affect layout.
 *
 * `<ClearOfflineDataOnSubmit><form action={logoutAction}>…</form></ClearOfflineDataOnSubmit>`
 */
export function ClearOfflineDataOnSubmit({ children }: { children: ReactNode }) {
  return (
    <div className="contents" onSubmit={() => void clearOfflineData()}>
      {children}
    </div>
  );
}
