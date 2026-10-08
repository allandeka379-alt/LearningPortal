import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { ActiveNavList } from "./ActiveNavList";
import { resolveNavItems } from "./nav-icons";
import type { NavItem } from "./nav-types";
import { MAIN_CONTENT_ID } from "./SkipLink";

/** The bottom tab bar holds at most five destinations (thumb reach + legibility at 360px). */
export const MAX_TAB_BAR_ITEMS = 5;

export interface AppShellProps {
  /** Full navigation for the desktop sidebar. */
  nav: readonly NavItem[];
  /**
   * Destinations for the mobile bottom tab bar (max 5; extras are dropped). Defaults to the first five of `nav`.
   * Put the remaining destinations somewhere reachable on mobile (e.g. the avatar menu or a "More" page).
   */
  tabs?: readonly NavItem[];
  /** Where the logo links (the area's home, e.g. "/app"). */
  homeHref: string;
  /**
   * Right side of the top bar: streak, `CountdownPill`, avatar `DropdownMenu`. Keep it to ~2 compact items on
   * phones (hide extras with `hidden sm:flex`).
   */
  headerActions?: ReactNode;
  /** Optional content pinned to the bottom of the desktop sidebar. */
  sidebarFooter?: ReactNode;
  /** Accessible name for the primary navigation. */
  navLabel?: string;
  children: ReactNode;
}

/**
 * Shell for authenticated areas (student, parent, teacher, school). Mobile: sticky top bar + bottom tab bar with
 * safe-area insets. Desktop (≥1024px): fixed left sidebar + top bar. Server component; only the active-link
 * detection runs on the client.
 */
export function AppShell({
  nav,
  tabs,
  homeHref,
  headerActions,
  sidebarFooter,
  navLabel = "Main",
  children,
}: AppShellProps) {
  const sidebarItems = resolveNavItems(nav);
  const tabItems = resolveNavItems((tabs ?? nav).slice(0, MAX_TAB_BAR_ITEMS));

  return (
    <div className="min-h-dvh lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface lg:flex">
        <div className="flex h-16 shrink-0 items-center px-5">
          <Link href={homeHref} className="inline-flex min-h-11 items-center rounded-control">
            <Logo />
          </Link>
        </div>
        <nav aria-label={navLabel} className="flex-1 overflow-y-auto px-3 py-3">
          <ActiveNavList items={sidebarItems} variant="sidebar" />
        </nav>
        {sidebarFooter && <div className="shrink-0 border-t border-border p-4">{sidebarFooter}</div>}
      </aside>

      <header className="sticky top-0 z-20 border-b border-border bg-surface pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:h-16 lg:px-8">
          <Link href={homeHref} className="inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-control lg:hidden">
            {/* Mark only below 400px (the name stays for screen readers), so the header actions fit at 360px. */}
            <Logo size="sm" wordmarkClassName="max-[400px]:sr-only" />
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">{headerActions}</div>
        </div>
      </header>

      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12"
      >
        {children}
      </main>

      <nav
        aria-label={navLabel}
        data-tabbar=""
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <ActiveNavList items={tabItems} variant="tabbar" className="mx-auto max-w-lg" />
      </nav>
    </div>
  );
}
