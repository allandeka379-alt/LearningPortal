import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminHeaderActions } from "@/components/admin/AdminHeaderActions";
import { requireAdminPage } from "@/components/admin/guards";
import { ADMIN_HOME, adminNavFor } from "@/components/admin/nav";
import { AdminShell } from "@/components/layout/AdminShell";
import { APP_NAME } from "@/lib/config";
import type { Actor } from "@/server/auth/actor";
import { hasPermission } from "@/server/auth/permissions";
import { countOpenFlags } from "@/server/cms/flags/service";
import { countInReview } from "@/server/cms/review/service";
import { getFeatures } from "@/server/features";
import { logger } from "@/server/lib/logger";

export const metadata: Metadata = {
  title: { default: "Admin", template: `%s · Admin · ${APP_NAME}` },
  robots: { index: false, follow: false },
};

/**
 * Sidebar badge counts (real, indexed counts; never estimated). Only staff with platform `content.draft` get them; the
 * review count only for reviewers (the item is hidden otherwise). A failed count drops the badge, never the page.
 */
async function sidebarBadges(actor: Actor): Promise<Record<string, number | undefined>> {
  if (!hasPermission(actor, "content.draft", "all")) return {};
  try {
    const [review, flags] = await Promise.all([
      hasPermission(actor, "content.review") ? countInReview(actor) : Promise.resolve(undefined),
      countOpenFlags(actor),
    ]);
    return { review, flags };
  } catch (error) {
    logger.warn("admin sidebar badges unavailable", { err: error });
    return {};
  }
}

/**
 * Admin console shell (§36). Staff only (CONTENT_EDITOR, ADMIN, SUPER_ADMIN): everyone else is sent to their own
 * home area by the guard. The sidebar shows only the sections the user's permissions allow; each page and Server
 * Action still re-checks its own permission.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const actor = await requireAdminPage();
  const [badges, features] = await Promise.all([sidebarBadges(actor), getFeatures()]);
  return (
    <AdminShell
      sections={adminNavFor(actor, { badges, features })}
      homeHref={ADMIN_HOME}
      areaLabel="Admin"
      navLabel="Admin sections"
      headerActions={<AdminHeaderActions displayName={actor.displayName} roles={actor.roles} environment={process.env.NODE_ENV ?? "development"} />}
    >
      {children}
    </AdminShell>
  );
}
