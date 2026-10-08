"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { reloadPage } from "@/lib/pwa/browser";
import { SW_URL } from "@/lib/pwa/constants";
import {
  REGISTRATION_OPTIONS,
  requestSkipWaiting,
  shouldCheckForUpdate,
  shouldRegisterServiceWorker,
  unregisterAppWorkers,
  watchForWaitingWorker,
} from "@/lib/pwa/sw-lifecycle";

/** If the new worker has not taken over this long after "Refresh", reload anyway (the page is fetched fresh). */
export const APPLY_UPDATE_FALLBACK_MS = 5000;

/**
 * Registers `/sw.js` as a module service worker (production builds only; docs/OFFLINE.md) and offers updates.
 *
 * A new version never takes over on its own: a student may be mid-exam. When one is waiting, a polite prompt offers
 * "Refresh"; only that click activates it (SKIP_WAITING) and reloads the page once the new worker controls it. "Later"
 * hides the prompt until the next page load. Long-lived tabs re-check for updates when they become visible again (at
 * most hourly).
 *
 * In development it instead removes any leftover production worker on this origin, so `next dev` never serves cached
 * assets. Mount once, in the root layout.
 *
 * The prompt is rendered here rather than through `useToast()` because toasts have no action slot yet; see
 * docs/OFFLINE.md ("Update prompt").
 */
export function ServiceWorkerRegistrar() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [dismissed, setDismissed] = useState<ServiceWorker | null>(null);
  const [applying, setApplying] = useState(false);
  const reloadRequested = useRef(false);

  useEffect(() => {
    const hasServiceWorker = typeof navigator !== "undefined" && "serviceWorker" in navigator;
    if (!hasServiceWorker) return;
    const container = navigator.serviceWorker;

    if (!shouldRegisterServiceWorker({ nodeEnv: process.env.NODE_ENV, hasServiceWorker })) {
      unregisterAppWorkers(container).catch(() => undefined);
      return;
    }

    let disposed = false;
    let registration: ServiceWorkerRegistration | null = null;
    let stopWatching = () => {};
    let lastCheckedAt = Date.now();

    const onControllerChange = () => {
      // Only the tab where the user chose "Refresh" reloads; other tabs keep what they are doing.
      if (reloadRequested.current) reloadPage();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible" || registration === null) return;
      const now = Date.now();
      if (!shouldCheckForUpdate(lastCheckedAt, now)) return;
      lastCheckedAt = now;
      registration.update().catch(() => undefined);
    };
    container.addEventListener("controllerchange", onControllerChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    container.register(SW_URL, REGISTRATION_OPTIONS).then(
      (registered) => {
        if (disposed) return;
        registration = registered;
        stopWatching = watchForWaitingWorker(registered, () => container.controller !== null, setWaiting);
      },
      () => {
        // Unsupported (e.g. no module service workers) or blocked by the browser: the app keeps working online.
      },
    );

    return () => {
      disposed = true;
      stopWatching();
      container.removeEventListener("controllerchange", onControllerChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Forget a waiting worker that was discarded (e.g. superseded by an even newer version).
  useEffect(() => {
    if (waiting === null) return;
    const onStateChange = () => {
      if (waiting.state === "redundant") setWaiting(null);
    };
    waiting.addEventListener("statechange", onStateChange);
    return () => waiting.removeEventListener("statechange", onStateChange);
  }, [waiting]);

  useEffect(() => {
    if (!applying) return;
    const timer = window.setTimeout(reloadPage, APPLY_UPDATE_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [applying]);

  const applyUpdate = () => {
    if (waiting === null) return;
    // Another tab may already have activated it: then this page only needs a reload.
    if (waiting.state === "activated") {
      reloadPage();
      return;
    }
    reloadRequested.current = true;
    setApplying(true);
    requestSkipWaiting(waiting);
  };

  const visible = waiting !== null && dismissed !== waiting;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top)+4.5rem)] z-40 flex justify-center px-4 sm:justify-end sm:px-6">
      <div
        role={visible ? "group" : undefined}
        aria-label={visible ? "App update" : undefined}
        className={cn(
          "w-full max-w-sm",
          visible &&
            "pointer-events-auto flex animate-fade-in items-start gap-3 rounded-card border border-border bg-surface-raised p-4 text-sm shadow-lg",
        )}
      >
        {visible && <RefreshCw aria-hidden="true" className="mt-px size-5 shrink-0 text-info-text" />}
        <div className={cn(visible && "min-w-0 flex-1")}>
          {/* Always-mounted polite live region with the message only (not the buttons), so it is announced. */}
          <div role="status">
            {visible && (
              <>
                <p className="font-semibold text-text">A new version is available</p>
                <p className="mt-0.5 text-muted">Refresh to start using it.</p>
              </>
            )}
          </div>
          {visible && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Button onClick={applyUpdate} loading={applying} loadingText="Refreshing…">
                Refresh
              </Button>
              <Button variant="ghost" onClick={() => setDismissed(waiting)} disabled={applying}>
                Later
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
