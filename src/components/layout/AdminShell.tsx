import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { ActiveNavList } from "./ActiveNavList";
import { MobileNavSheet } from "./MobileNavSheet";
import { resolveNavItems } from "./nav-icons";
import type { NavSection } from "./nav-types";
import { MAIN_CONTENT_ID } from "./SkipLink";

export interface AdminShellProps {
  /** Grouped navigation (§36: Dashboard, Users, Schools, …, Settings). Filter by permission before passing. */
  sections: readonly NavSection[];
  homeHref: string;
  /** Short area name next to the logo, e.g. "Admin" or "Content". */
  areaLabel?: string;
  /** Right side of the top bar (environment badge, user menu). */
  headerActions?: ReactNode;
  navLabel?: string;
  children: ReactNode;
}

function SectionedNav({ sections, idPrefix }: { sections: readonly NavSection[]; idPrefix: string }) {
  return (
    <div className="space-y-5">
      {sections.map((section, index) => {
        const headingId = `${idPrefix}-section-${index}`;
        return (
          <div key={section.title}>
            <p id={headingId} className="px-2.5 pb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              {section.title}
            </p>
            <ActiveNavList items={resolveNavItems(section.items)} variant="dense" labelledBy={headingId} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Denser shell for admin/CMS/operations: grouped sidebar on desktop (≥1024px); on smaller screens the same
 * navigation collapses into a left sheet behind a menu button. Server component.
 */
export function AdminShell({ sections, homeHref, areaLabel = "Admin", headerActions, navLabel = "Admin", children }: AdminShellProps) {
  const brand = (
    <Link href={homeHref} className="inline-flex min-h-11 items-center gap-2 rounded-control">
      <Logo size="sm" />
      <span className="rounded-md bg-subtle px-1.5 py-0.5 text-xs font-semibold text-muted">{areaLabel}</span>
    </Link>
  );

  return (
    <div className="min-h-dvh lg:pl-60">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface lg:flex">
        <div className="flex h-14 shrink-0 items-center px-4">{brand}</div>
        <nav aria-label={navLabel} className="flex-1 overflow-y-auto px-2 pt-2 pb-6">
          <SectionedNav sections={sections} idPrefix="admin-sidebar" />
        </nav>
      </aside>

      <header className="sticky top-0 z-20 border-b border-border bg-surface pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center gap-2 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 lg:hidden">
            <MobileNavSheet title={`${areaLabel} navigation`} triggerLabel="Open navigation">
              <nav aria-label={navLabel}>
                <SectionedNav sections={sections} idPrefix="admin-sheet" />
              </nav>
            </MobileNavSheet>
            {brand}
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">{headerActions}</div>
        </div>
      </header>

      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="pb-12">
        {children}
      </main>
    </div>
  );
}
