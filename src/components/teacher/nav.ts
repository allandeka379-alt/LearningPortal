import type { NavItem } from "@/components/layout/nav-types";

/**
 * Teacher-area navigation (/teacher, §22). Plain data for `AppShell`: the desktop sidebar shows every entry, the
 * mobile tab bar the first {@link TEACHER_TAB_LIMIT}; the rest is reachable from the account menu on phones.
 */
export const TEACHER_NAV: readonly NavItem[] = [
  { href: "/teacher", label: "Home", icon: "home", match: "exact" },
  { href: "/teacher/classes", label: "Classes", icon: "classes" },
  { href: "/teacher/assignments", label: "Assignments", icon: "exams" },
  { href: "/teacher/review", label: "Marking", icon: "content" },
  { href: "/teacher/assessments", label: "Tests", icon: "questions" },
  { href: "/teacher/announcements", label: "Announcements", icon: "notifications" },
];

export const TEACHER_TAB_LIMIT = 5;

/** The navigation with the marking badge (answers waiting; omitted when zero or unknown). */
export function teacherNav(markingBadge: number | null = null): NavItem[] {
  return TEACHER_NAV.map((item) => (item.href === "/teacher/review" && markingBadge !== null && markingBadge > 0 ? { ...item, badge: markingBadge } : { ...item }));
}

/** Mobile bottom tab bar entries. */
export function teacherTabs(items: readonly NavItem[] = TEACHER_NAV): NavItem[] {
  return items.slice(0, TEACHER_TAB_LIMIT);
}

/** Entries not in the tab bar (account menu on phones). */
export function teacherMenuNav(items: readonly NavItem[] = TEACHER_NAV): NavItem[] {
  return items.slice(TEACHER_TAB_LIMIT);
}
