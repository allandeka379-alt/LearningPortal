/**
 * Thin wrappers over browser APIs that components call, kept in one module so component tests can mock them
 * (jsdom's `location.reload` cannot be stubbed).
 */

/** Full reload of the current page (after the user accepts an update, or "Try again" on the offline page). */
export function reloadPage(): void {
  window.location.reload();
}

/** Current connectivity as the browser reports it. `true` when unknown (SSR, very old browsers). */
export function getBrowserOnline(): boolean {
  return typeof navigator === "undefined" || typeof navigator.onLine !== "boolean" ? true : navigator.onLine;
}

/** Subscribes to the window `online`/`offline` events. Returns the unsubscribe function. */
export function subscribeToConnectivity(onChange: () => void): () => void {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}
