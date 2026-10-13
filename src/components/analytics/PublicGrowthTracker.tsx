"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type EventType = "PAGE_VIEW" | "CLICK" | "SIGNUP_CLICK" | "CHECKOUT_CLICK";

const PRIVATE_PREFIXES = ["/admin", "/app", "/teacher", "/parent", "/school", "/api", "/dev", "/invite"] as const;
const SESSION_KEY = "bvh_growth_session";

function publicPath(path: string): boolean {
  return !PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function sessionId(): string | null {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID().replace(/-/g, "")
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    window.sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    return null;
  }
}

function utmFromLocation(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  const mapping = [
    ["utm_source", "source"],
    ["utm_medium", "medium"],
    ["utm_campaign", "campaign"],
    ["utm_term", "term"],
    ["utm_content", "content"],
  ] as const;
  for (const [param, key] of mapping) {
    const value = params.get(param)?.trim();
    if (value) out[key] = value;
  }
  return out;
}

function targetPathOrUrl(value: string): string {
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin === window.location.origin) return `${url.pathname}${url.search}${url.hash}`;
    return url.href;
  } catch {
    return value;
  }
}

function classifyClick(target: string): EventType {
  const path = targetPathOrUrl(target);
  if (path.startsWith("/register")) return "SIGNUP_CLICK";
  if (path.startsWith("/app/unlock") || path.includes("/billing") || path.includes("/checkout") || path.includes("/subscribe")) {
    return "CHECKOUT_CLICK";
  }
  return "CLICK";
}

function sendEvent(type: EventType, extra: { target?: string | null } = {}): void {
  const path = window.location.pathname;
  if (!publicPath(path)) return;
  const payload = JSON.stringify({
    type,
    path,
    target: extra.target ?? null,
    referrer: document.referrer || null,
    sessionId: sessionId(),
    utm: utmFromLocation(),
  });
  const url = "/api/analytics/events";
  const blob = new Blob([payload], { type: "application/json" });
  if (navigator.sendBeacon?.(url, blob)) return;
  void fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => undefined);
}

/** First-party public-site growth telemetry: page views plus link/CTA clicks, never form values. */
export function PublicGrowthTracker() {
  const pathname = usePathname();
  const lastPageView = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPageView.current === pathname) return;
    lastPageView.current = pathname;
    sendEvent("PAGE_VIEW");
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!publicPath(window.location.pathname)) return;
      const clicked = event.target instanceof Element ? event.target.closest("a[href],button[data-analytics-target],button[data-analytics]") : null;
      if (!(clicked instanceof HTMLElement)) return;
      const explicit = clicked.dataset.analyticsTarget ?? clicked.dataset.analytics ?? null;
      const href = clicked instanceof HTMLAnchorElement ? clicked.href : null;
      const target = explicit ?? href;
      if (!target) return;
      sendEvent(classifyClick(target), { target: targetPathOrUrl(target) });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
