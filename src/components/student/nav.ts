import type { NavItem } from "@/components/layout/nav-types";
import type { FeatureFlags, FeatureName } from "@/lib/features";

/**
 * Student-area navigation (/app). THE single list every student feature extends: add an entry (or flip `available`)
 * when a route ships, and both the desktop sidebar and the mobile tab bar / account menu pick it up.
 *
 * - `available: false` hides an entry until its route exists, so the nav never links to a 404.
 * - `tab: true` puts an available entry in the mobile bottom tab bar (max 5, in list order). Every other available
 *   entry is reachable on phones from the account menu ({@link studentMenuNav}).
 * - `feature` ties an entry to a platform feature flag (src/lib/features.ts): {@link studentNavFor} hides it while the
 *   flag is off (its routes then return 404), so the layout passes the flags it read on the server.
 */
export interface StudentNavItem extends NavItem {
  /** Whether the route is built. Unavailable entries are never rendered. */
  available: boolean;
  /** Candidate for the mobile bottom tab bar. */
  tab?: boolean;
  /** Platform feature flag the entry needs (hidden while it is off). */
  feature?: FeatureName;
}

export const STUDENT_NAV: StudentNavItem[] = [
  { href: "/app", label: "Home", icon: "home", match: "exact", available: true, tab: true },
  { href: "/app/subjects", label: "Subjects", icon: "subjects", available: true, tab: true },
  { href: "/app/practice", label: "Practice", icon: "practice", available: true, tab: true },
  // Menu entries (not tabs): the daily question (§46) and the diagnostic (§52) hub.
  { href: "/app/daily", label: "Daily question", icon: "questions", available: true },
  { href: "/app/exams", label: "Exams", icon: "exams", available: true, tab: true },
  { href: "/app/diagnostic", label: "Diagnostic", icon: "reports", available: true },
  // AI features (owner decision 2026-10-07: hidden until `features.ai` is switched on).
  { href: "/app/tutor", label: "Tutor", icon: "tutor", available: true, feature: "ai" },
  { href: "/app/solver", label: "Question solver", icon: "help", available: true, feature: "ai" },
  { href: "/app/flashcards", label: "Flashcards", icon: "flashcards", available: true },
  { href: "/app/plan", label: "Study plan", icon: "plan", available: true, tab: true },
  { href: "/app/progress", label: "Progress", icon: "progress", available: true },
  // §24: the study-pack catalogue (packs for the student's qualification, bought through the checkout).
  { href: "/app/study-packs", label: "Study packs", icon: "packs", available: true },
  // Engagement (§19-§20, §46): badges and levels, opt-in leaderboards, inviting friends.
  { href: "/app/achievements", label: "Achievements", icon: "qualifications", available: true },
  { href: "/app/leaderboard", label: "Leaderboard", icon: "leaderboard", available: true },
  { href: "/app/classes", label: "Classes", icon: "classes", available: true },
  { href: "/app/invite", label: "Invite friends", icon: "invite", available: true },
  { href: "/app/notifications", label: "Notifications", icon: "notifications", available: true },
  // Parents and guardians (§21): links, requests and codes.
  { href: "/app/family", label: "Family", icon: "users", available: true },
  { href: "/app/settings", label: "Settings", icon: "settings", available: true },
];

/** Maximum entries in the mobile tab bar (matches AppShell's MAX_TAB_BAR_ITEMS). */
export const STUDENT_TAB_LIMIT = 5;

/** The nav with entries whose platform feature is switched off marked unavailable (never rendered, never a 404 link). */
export function studentNavFor(features: FeatureFlags, items: readonly StudentNavItem[] = STUDENT_NAV): StudentNavItem[] {
  return items.map((item) => (item.feature !== undefined && !features[item.feature] ? { ...item, available: false } : item));
}

/** Strips the student-only flags so the item can be handed to the shells. */
function toNavItem(item: StudentNavItem): NavItem {
  const nav: NavItem = { href: item.href, label: item.label, icon: item.icon };
  if (item.match !== undefined) nav.match = item.match;
  if (item.badge !== undefined) nav.badge = item.badge;
  return nav;
}

/** Entries whose route exists, in list order (sidebar). */
export function visibleStudentNav(items: readonly StudentNavItem[] = STUDENT_NAV): NavItem[] {
  return items.filter((item) => item.available).map(toNavItem);
}

/** Mobile bottom tab bar: available `tab` entries, at most {@link STUDENT_TAB_LIMIT}. */
export function studentTabNav(items: readonly StudentNavItem[] = STUDENT_NAV): NavItem[] {
  return items
    .filter((item) => item.available && item.tab)
    .slice(0, STUDENT_TAB_LIMIT)
    .map(toNavItem);
}

/**
 * Available entries that are NOT in the tab bar (account menu on phones), excluding `/app/settings`, which the menu
 * always lists on its own.
 */
export function studentMenuNav(items: readonly StudentNavItem[] = STUDENT_NAV): NavItem[] {
  const tabs = new Set(studentTabNav(items).map((item) => item.href));
  return items.filter((item) => item.available && !tabs.has(item.href) && item.href !== "/app/settings").map(toNavItem);
}
