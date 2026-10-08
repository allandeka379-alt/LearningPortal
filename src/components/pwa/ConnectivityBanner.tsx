"use client";

import { CloudOff, Wifi, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOffline } from "next/offline";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { getBrowserOnline, subscribeToConnectivity } from "@/lib/pwa/browser";
import { OFFLINE_URL } from "@/lib/pwa/constants";

/** How long "You are back online." stays before it hides itself. */
export const BACK_ONLINE_VISIBLE_MS = 4000;

const serverSnapshot = () => true;

/**
 * Polite connectivity banner (§29): "You are offline. Saved lessons are still available." while offline, then
 * "You are back online." for a few seconds. Both can be dismissed (the offline one comes back on the next change).
 *
 * Offline = the browser's `offline` state OR Next's `useOffline()` (which also catches "connected to Wi-Fi but no
 * internet" once `experimental.useOffline` is enabled; without the flag it is always false). The live region is
 * always mounted so screen readers announce changes reliably. Mount once, in the root layout.
 */
export function ConnectivityBanner() {
  const browserOnline = useSyncExternalStore(subscribeToConnectivity, getBrowserOnline, serverSnapshot);
  const frameworkOffline = useOffline();
  const offline = !browserOnline || frameworkOffline;
  const pathname = usePathname();

  // Derived from the previous render's value (React's "adjust state when a prop changes" pattern), not an effect.
  const [previousOffline, setPreviousOffline] = useState(offline);
  const [backOnline, setBackOnline] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  if (offline !== previousOffline) {
    setPreviousOffline(offline);
    setBackOnline(!offline);
    setDismissed(false);
  }

  useEffect(() => {
    if (!backOnline) return;
    const timer = window.setTimeout(() => setBackOnline(false), BACK_ONLINE_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [backOnline]);

  const state = offline ? "offline" : backOnline ? "online" : null;
  const visible = state !== null && !dismissed;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[var(--toast-offset,0px)] z-40 flex justify-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      {/* The live region (the message only, not the button) stays mounted so changes are announced reliably. */}
      <div
        data-connectivity={visible ? state : undefined}
        className={cn(
          "w-full max-w-md",
          visible &&
            "pointer-events-auto flex animate-fade-in items-center gap-3 rounded-card border border-border bg-surface-raised py-1 pr-1 pl-4 text-sm shadow-lg",
        )}
      >
        {visible &&
          (state === "offline" ? (
            <CloudOff aria-hidden="true" className="size-5 shrink-0 text-muted" />
          ) : (
            <Wifi aria-hidden="true" className="size-5 shrink-0 text-primary" />
          ))}
        <p role="status" className={cn(visible && "min-w-0 flex-1 py-2 text-text")}>
          {visible &&
            (state === "offline" ? (
              <>
                You are offline.{" "}
                {pathname === OFFLINE_URL ? (
                  "Saved lessons are still available."
                ) : (
                  <>
                    {/* A plain link (not next/link): a full navigation is answered by the service worker offline. */}
                    <a href={OFFLINE_URL} className="font-semibold text-primary underline underline-offset-2">
                      Saved lessons
                    </a>{" "}
                    are still available.
                  </>
                )}
              </>
            ) : (
              "You are back online."
            ))}
        </p>
        {visible && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-control text-muted transition-colors hover:bg-subtle hover:text-text"
          >
            <X aria-hidden="true" className="size-4" />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </div>
    </div>
  );
}
