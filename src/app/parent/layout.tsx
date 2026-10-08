import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PARENT_NAV } from "@/components/parent/nav";
import { ParentHeaderActions } from "@/components/parent/ParentHeaderActions";
import { requireRole } from "@/server/auth/guards";

// Private, per-family pages: never indexed. Pages set their own `title` (the root template adds the brand).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Parent area shell (§21, ARCHITECTURE §3.3 "/parent"). Signed-out visitors go to /login, other roles to their own
 * area. Every page also calls the guard itself (layouts and pages render concurrently), and every read goes through
 * the family services, which scope to the parent's ACTIVE links.
 */
export default async function ParentAreaLayout({ children }: { children: ReactNode }) {
  const actor = await requireRole("PARENT");
  return (
    <AppShell nav={PARENT_NAV} tabs={PARENT_NAV} homeHref="/parent" navLabel="Parent" headerActions={<ParentHeaderActions displayName={actor.displayName} />}>
      {children}
    </AppShell>
  );
}
