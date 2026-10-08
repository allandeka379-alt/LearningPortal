import type { ReactNode } from "react";
import type { NavIconName } from "./nav-icons";

/**
 * A navigation entry as plain data, so student/teacher/parent/school/admin areas can define their nav in a config
 * module and pass it to `AppShell` / `AdminShell`.
 */
export interface NavItem {
  href: string;
  label: string;
  icon: NavIconName;
  /** See `getActiveNavHref`: `"prefix"` (default) also highlights on descendant pages. */
  match?: "exact" | "prefix";
  /** Small count next to the label (e.g. flashcards due). Real computed values only — omit when unknown. */
  badge?: number;
}

export interface NavSection {
  /** Section heading (admin sidebar groups, §36). */
  title: string;
  items: readonly NavItem[];
}

/** Simple text link for marketing headers and footers. */
export interface NavLinkItem {
  href: string;
  label: string;
}

/** Internal: a nav item with its icon already rendered (server → client handoff). */
export interface ResolvedNavItem {
  href: string;
  label: string;
  icon: ReactNode;
  match?: "exact" | "prefix";
  badge?: number;
}
