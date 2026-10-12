import { describe, expect, it } from "vitest";
import { isPaywallOpenPath, paywallRedirect, UNLOCK_PATH } from "./paywall";

describe("student-area paywall (no free tier, 2026-10-12)", () => {
  it("keeps the unlock, billing, settings, notifications, family and class-invite pages open (sub-pages and queries too)", () => {
    for (const path of [
      "/app/unlock",
      "/app/billing",
      "/app/billing/",
      "/app/billing/checkout?price=0190a000-0000-7000-8000-000000000001",
      "/app/billing/result?payment=abc",
      "/app/settings",
      "/app/settings/security",
      "/app/notifications",
      "/app/family",
      "/app/family/0190a000-0000-7000-8000-000000000002",
      "/app/classes/invite/some-token",
    ]) {
      expect(isPaywallOpenPath(path), path).toBe(true);
    }
  });

  it("gates every learning page, matching whole path segments only", () => {
    for (const path of [
      "/app",
      "/app/",
      "/app/subjects/maths",
      "/app/lessons/0190a000-0000-7000-8000-000000000003",
      "/app/practice",
      "/app/daily",
      "/app/diagnostic",
      "/app/exams",
      "/app/flashcards/review",
      "/app/plan",
      "/app/progress",
      "/app/classes",
      "/app/classes/0190a000-0000-7000-8000-000000000004",
      "/app/billingx",
      "/app/unlocked",
      "/app/practice?next=/app/billing",
    ]) {
      expect(isPaywallOpenPath(path), path).toBe(false);
    }
  });

  it("redirects unpaid students on gated pages to the unlock page, never students with access, never in a loop", () => {
    expect(paywallRedirect("/app/practice", false)).toBe(UNLOCK_PATH);
    expect(paywallRedirect("/app", false)).toBe(UNLOCK_PATH);
    expect(paywallRedirect(UNLOCK_PATH, false)).toBeNull();
    expect(paywallRedirect("/app/billing/checkout?price=x", false)).toBeNull();
    expect(paywallRedirect("/app/practice", true)).toBeNull();
    // Unknown page (proxy header missing): no redirect, so the unlock page can never redirect to itself.
    expect(paywallRedirect(null, false)).toBeNull();
  });
});
