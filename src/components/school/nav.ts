import type { NavItem } from "@/components/layout/nav-types";

/**
 * School-admin navigation (/school, §23). Plain data for `AppShell`: the desktop sidebar shows every entry, the mobile
 * tab bar the first {@link SCHOOL_TAB_LIMIT}; the rest is reachable from the account menu on phones.
 */
export const SCHOOL_NAV: readonly NavItem[] = [
  { href: "/school", label: "Overview", icon: "dashboard", match: "exact" },
  { href: "/school/students", label: "Students", icon: "students" },
  { href: "/school/teachers", label: "Teachers", icon: "teachers" },
  { href: "/school/classes", label: "Classes", icon: "classes" },
  { href: "/school/reports", label: "Reports", icon: "reports" },
  { href: "/school/subjects", label: "Subjects", icon: "subjects" },
  { href: "/school/billing", label: "Subscription", icon: "subscriptions" },
];

export const SCHOOL_TAB_LIMIT = 5;

/** The navigation with a join-request badge on Students (real count; omitted when zero or unknown). */
export function schoolNav(joinRequests: number | null = null): NavItem[] {
  return SCHOOL_NAV.map((item) => (item.href === "/school/students" && joinRequests !== null && joinRequests > 0 ? { ...item, badge: joinRequests } : { ...item }));
}

/** Mobile bottom tab bar entries. */
export function schoolTabs(items: readonly NavItem[] = SCHOOL_NAV): NavItem[] {
  return items.slice(0, SCHOOL_TAB_LIMIT);
}

/** Entries not in the tab bar (account menu on phones). */
export function schoolMenuNav(items: readonly NavItem[] = SCHOOL_NAV): NavItem[] {
  return items.slice(SCHOOL_TAB_LIMIT);
}
