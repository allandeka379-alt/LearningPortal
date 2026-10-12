import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import type { ReactNode } from "react";
import { PaywallGuard } from "@/components/billing/PaywallGuard";
import { UpgradeOfferProvider } from "@/components/billing/UpgradeOffer";
import { AppShell } from "@/components/layout/AppShell";
import { OfflineViewerSync } from "@/components/pwa/OfflineViewerSync";
import { studentMenuNav, studentNavFor, studentTabNav, visibleStudentNav, type StudentNavItem } from "@/components/student/nav";
import { StudentHeaderActions, type StudentHeaderActionsProps } from "@/components/student/StudentHeaderActions";
import type { UpgradeOffer } from "@/lib/billing/offer";
import { isPaywallOpenPath, paywallRedirect, UNLOCK_PATH } from "@/lib/billing/paywall";
import type { Actor } from "@/server/auth/actor";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { offlineViewerTag } from "@/server/auth/offline-viewer";
import { hasEntitlement, hasStudentAppAccess } from "@/server/billing/entitlements";
import { getStudentUpgradeOffer } from "@/server/billing/offer";
import { getFeatures } from "@/server/features";
import { logger } from "@/server/lib/logger";
import { REQUEST_PATH_HEADER } from "@/server/lib/request-path";
import { getStudentHeaderSummary } from "@/server/progress/student-overview";

// Private, per-student pages: never indexed. Pages set their own `title` (the root template adds the brand).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Student area shell (§6, ARCHITECTURE §3.3 "/app requires STUDENT"). Signed-out visitors go to /login, students
 * who have not finished onboarding go to /onboarding, other roles to their own area. Every page below also calls the
 * guard itself (layouts and pages render concurrently).
 *
 * The `dz-viewer` meta tag and {@link OfflineViewerSync} bind saved lessons to this student on the device (PRIV-01):
 * the service worker never shows one student's saved page to another on a shared phone (docs/OFFLINE.md).
 *
 * Paywall (owner decision 2026-10-12: no free tier; src/lib/billing/paywall.ts): a student without full access is
 * redirected to /app/unlock from every page except the allow-list (billing, settings, notifications, family, class
 * invites). Next layouts are not told which page they wrap, so the path comes from the `x-dz-request-path` header that
 * src/proxy.ts always sets (it overwrites any client value); client-side navigations, which skip the layout, are
 * covered by {@link PaywallGuard}; the learning services refuse unpaid use on their own (ENTITLEMENT_REQUIRED). An
 * unpaid student's navigation shows only the pages they can open.
 */
export default async function StudentAreaLayout({ children }: { children: ReactNode }) {
  const actor = await requireOnboardedStudent();
  const hasAccess = await loadAppAccess(actor);
  const target = paywallRedirect((await headers()).get(REQUEST_PATH_HEADER), hasAccess);
  if (target !== null) redirect(target);

  const [header, features, upgradeOffer] = await Promise.all([loadHeader(actor), getFeatures(), loadUpgradeOffer(actor)]);
  // Entries of switched-off features (AI tutor and solver while `features.ai` is off) are hidden.
  const nav = hasAccess ? studentNavFor(features) : lockedNav(studentNavFor(features));
  const viewer = offlineViewerTag(actor.userId);
  return (
    <>
      <meta name="dz-viewer" content={viewer} />
      <OfflineViewerSync viewer={viewer} />
      <AppShell
        nav={visibleStudentNav(nav)}
        tabs={studentTabNav(nav)}
        homeHref={hasAccess ? "/app" : UNLOCK_PATH}
        navLabel="Student"
        headerActions={
          <StudentHeaderActions displayName={actor.displayName} streak={header.streak} countdown={header.countdown} menuNav={studentMenuNav(nav)} />
        }
      >
        <PaywallGuard locked={!hasAccess} />
        {/* Every upgrade prompt below says "Unlock everything for <DB price>" and links to the one-off checkout. */}
        <UpgradeOfferProvider offer={upgradeOffer}>{children}</UpgradeOfferProvider>
      </AppShell>
    </>
  );
}

/** Navigation of a student without full access: the unlock page, Plan & billing and the pages they can still open. */
const UNLOCK_NAV: readonly StudentNavItem[] = [
  { href: UNLOCK_PATH, label: "Unlock", icon: "payments", available: true, tab: true },
  { href: "/app/billing", label: "Plan & billing", icon: "subscriptions", available: true, tab: true },
];

function lockedNav(nav: readonly StudentNavItem[]): StudentNavItem[] {
  const own = new Set(UNLOCK_NAV.map((item) => item.href));
  const open = nav
    .filter((item) => !own.has(item.href))
    .map((item) => (item.available && isPaywallOpenPath(item.href) ? { ...item, tab: true } : { ...item, available: false }));
  return [...UNLOCK_NAV, ...open];
}

/**
 * Whether the student may use the learning pages. A failure to resolve entitlements does not lock a paying student out:
 * the page then renders and its services (which resolve entitlements again) decide.
 */
async function loadAppAccess(actor: Actor): Promise<boolean> {
  try {
    return await hasStudentAppAccess(actor.userId);
  } catch (error) {
    unstable_rethrow(error);
    logger.error("student area: entitlement check failed", { userId: actor.userId, err: error });
    return true;
  }
}

/** The one-off upgrade offer for this student; a failure only falls back to the "Get full access" prompts (unlock page). */
async function loadUpgradeOffer(actor: Actor): Promise<UpgradeOffer | null> {
  try {
    return await getStudentUpgradeOffer(actor.userId);
  } catch (error) {
    unstable_rethrow(error);
    logger.error("student area: upgrade offer failed", { userId: actor.userId, err: error });
    return null;
  }
}

/** Streak + countdown for the top bar. A failure here degrades the header; it never takes the whole area down. */
async function loadHeader(actor: Actor): Promise<Pick<StudentHeaderActionsProps, "streak" | "countdown">> {
  try {
    const [summary, countdownIncluded] = await Promise.all([getStudentHeaderSummary(actor), hasEntitlement(actor, "examCountdown")]);
    return { streak: summary.streak, countdown: countdownIncluded ? summary.countdown : null };
  } catch (error) {
    unstable_rethrow(error);
    logger.error("student area: header summary failed", { userId: actor.userId, err: error });
    return { streak: null, countdown: null };
  }
}
