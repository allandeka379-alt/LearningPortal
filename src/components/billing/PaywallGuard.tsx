"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { paywallRedirect } from "@/lib/billing/paywall";

/**
 * Client half of the student-area paywall (src/lib/billing/paywall.ts). The /app layout redirects unpaid students on
 * the server, but a client-side navigation does not re-render a layout, so this guard re-checks the allow-list on every
 * path change and sends the browser to the unlock page with a FULL navigation: the layout then runs again with fresh
 * entitlements (a student who has just paid gets straight back in instead of looping on stale state). The learning
 * services refuse unpaid use on their own (ENTITLEMENT_REQUIRED), so this guard is about the experience, not security.
 */
export function PaywallGuard({ locked }: { locked: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!locked) return;
    const target = paywallRedirect(pathname, false);
    if (target !== null) window.location.replace(target);
  }, [locked, pathname]);
  return null;
}
