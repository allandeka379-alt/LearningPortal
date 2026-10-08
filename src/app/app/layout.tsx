import type { Metadata } from "next";
import { unstable_rethrow } from "next/navigation";
import type { ReactNode } from "react";
import { UpgradeOfferProvider } from "@/components/billing/UpgradeOffer";
import { AppShell } from "@/components/layout/AppShell";
import { OfflineViewerSync } from "@/components/pwa/OfflineViewerSync";
import { studentMenuNav, studentNavFor, studentTabNav, visibleStudentNav } from "@/components/student/nav";
import { StudentHeaderActions, type StudentHeaderActionsProps } from "@/components/student/StudentHeaderActions";
import type { UpgradeOffer } from "@/lib/billing/offer";
import type { Actor } from "@/server/auth/actor";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { offlineViewerTag } from "@/server/auth/offline-viewer";
import { hasEntitlement } from "@/server/billing/entitlements";
import { getStudentUpgradeOffer } from "@/server/billing/offer";
import { getFeatures } from "@/server/features";
import { logger } from "@/server/lib/logger";
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
 */
export default async function StudentAreaLayout({ children }: { children: ReactNode }) {
  const actor = await requireOnboardedStudent();
  const [header, features, upgradeOffer] = await Promise.all([loadHeader(actor), getFeatures(), loadUpgradeOffer(actor)]);
  // Entries of switched-off features (AI tutor and solver while `features.ai` is off) are hidden.
  const nav = studentNavFor(features);
  const viewer = offlineViewerTag(actor.userId);
  return (
    <>
      <meta name="dz-viewer" content={viewer} />
      <OfflineViewerSync viewer={viewer} />
      <AppShell
        nav={visibleStudentNav(nav)}
        tabs={studentTabNav(nav)}
        homeHref="/app"
        navLabel="Student"
        headerActions={
          <StudentHeaderActions displayName={actor.displayName} streak={header.streak} countdown={header.countdown} menuNav={studentMenuNav(nav)} />
        }
      >
        {/* Every upgrade prompt below says "Unlock everything for <DB price>" and links to the one-off checkout. */}
        <UpgradeOfferProvider offer={upgradeOffer}>{children}</UpgradeOfferProvider>
      </AppShell>
    </>
  );
}

/** The one-off upgrade offer for this student; a failure only falls back to the neutral "See plans" prompts. */
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
