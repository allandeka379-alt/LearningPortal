import type { NavIconName } from "@/components/layout/nav-icons";
import type { NavItem, NavSection } from "@/components/layout/nav-types";
import type { Role } from "@/generated/prisma/enums";
import type { FeatureFlags, FeatureName } from "@/lib/features";
import { hasAnyRole, hasPermission, type Permission, type PermissionScope, type RoleHolder } from "@/server/auth/permissions";

/**
 * THE admin navigation config (§36 sections; ARCHITECTURE §3.3 admin route map, §5.2 RBAC matrix). Plain data, so
 * every admin area extends this one list instead of keeping its own sidebar.
 *
 * Each item names the permission (and minimum scope) a user needs to SEE it; the page and its Server Actions still
 * re-check their own permission (the sidebar is a convenience, never the authorization). Content editors therefore
 * see only the curriculum / content / workflow sections, while ADMIN and SUPER_ADMIN see operations and commerce;
 * SUPER_ADMIN alone sees Settings.
 *
 * To add a section item: append it here with the permission its page enforces. Keep `href`s under `/admin`. Items of an
 * optional platform feature name it (`feature`) and are shown only when the layout passes that flag as on (owner
 * decision 2026-10-07: the AI pages are hidden, and return 404, while `features.ai` is off).
 */

export interface AdminNavItem extends Omit<NavItem, "badge"> {
  /** Permission the item's page requires. Omit for pages every staff member may open (the dashboard). */
  permission?: Permission;
  /** Minimum scope of `permission` (default: any scope). `"all"` hides platform-wide pages from restricted editors. */
  minScope?: PermissionScope;
  /** Optional key used to attach a real computed badge count (see {@link adminNavFor}). */
  badgeKey?: string;
  /** Platform feature flag the page needs (src/lib/features.ts): hidden unless `options.features` has it on. */
  feature?: FeatureName;
}

export interface AdminNavSection {
  title: string;
  items: readonly AdminNavItem[];
}

export const ADMIN_HOME = "/admin";

/** Grouped admin sections (§36: Dashboard, Users, Schools, Students, Teachers, Boards … Settings, Audit log). */
export const ADMIN_NAV: readonly AdminNavSection[] = [
  {
    title: "Overview",
    items: [
      { href: ADMIN_HOME, label: "Dashboard", icon: "dashboard", match: "exact" },
      { href: "/admin/analytics", label: "Analytics", icon: "analytics", permission: "analytics.platform", minScope: "all" },
    ],
  },
  {
    title: "People",
    items: [
      { href: "/admin/users", label: "Users", icon: "users", permission: "users.manage" },
      { href: "/admin/schools", label: "Schools", icon: "schools", permission: "school.manage", minScope: "all" },
      { href: "/admin/students", label: "Students", icon: "students", permission: "users.manage" },
      { href: "/admin/teachers", label: "Teachers", icon: "teachers", permission: "users.manage" },
    ],
  },
  {
    title: "Curriculum",
    items: [
      { href: "/admin/boards", label: "Boards", icon: "boards", permission: "curriculum.manage" },
      { href: "/admin/qualifications", label: "Qualifications", icon: "qualifications", permission: "curriculum.manage" },
      { href: "/admin/subjects", label: "Subjects", icon: "subjects", permission: "curriculum.manage" },
      { href: "/admin/syllabuses", label: "Syllabuses", icon: "syllabuses", permission: "curriculum.manage" },
      { href: "/admin/topics", label: "Topics", icon: "topics", permission: "curriculum.manage" },
      { href: "/admin/exam-sessions", label: "Exam sessions", icon: "sessions", permission: "curriculum.manage" },
      { href: "/admin/grade-schemes", label: "Grade schemes", icon: "grades", permission: "curriculum.manage" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/lessons", label: "Lessons", icon: "lessons", permission: "content.draft", minScope: "all" },
      { href: "/admin/questions", label: "Questions", icon: "questions", permission: "content.draft", minScope: "all" },
      { href: "/admin/exams", label: "Exams", icon: "exams", permission: "content.draft", minScope: "all" },
      { href: "/admin/study-packs", label: "Study packs", icon: "packs", permission: "content.draft", minScope: "all" },
      { href: "/admin/flashcards", label: "Flashcards", icon: "flashcards", permission: "content.draft", minScope: "all" },
      { href: "/admin/media", label: "Media library", icon: "media", permission: "content.draft", minScope: "all" },
      { href: "/admin/daily-questions", label: "Daily questions", icon: "plan", permission: "content.publish", minScope: "all" },
      { href: "/admin/faq", label: "FAQ", icon: "help", permission: "content.publish", minScope: "all" },
      { href: "/admin/testimonials", label: "Testimonials", icon: "messages", permission: "content.publish", minScope: "all" },
    ],
  },
  {
    title: "Workflow",
    items: [
      { href: "/admin/review", label: "Review queue", icon: "review", permission: "content.review", badgeKey: "review" },
      { href: "/admin/flags", label: "Flags", icon: "flags", permission: "content.draft", minScope: "all", badgeKey: "flags" },
      { href: "/admin/imports", label: "Imports", icon: "imports", permission: "imports.run" },
      { href: "/admin/ai", label: "AI", icon: "ai", permission: "ai.generate", feature: "ai" },
      { href: "/admin/ai/usage", label: "AI usage", icon: "usage", permission: "ai.admin", minScope: "restricted", feature: "ai" },
      { href: "/admin/ai/settings", label: "AI settings", icon: "tuning", permission: "ai.admin", minScope: "restricted", feature: "ai" },
    ],
  },
  {
    title: "Commerce",
    items: [
      { href: "/admin/subscriptions", label: "Subscriptions", icon: "subscriptions", permission: "billing.manage" },
      { href: "/admin/payments", label: "Payments", icon: "payments", permission: "payments.view", minScope: "all" },
      { href: "/admin/plans", label: "Plans & prices", icon: "plans", permission: "billing.manage" },
      { href: "/admin/promo-codes", label: "Promo codes", icon: "promos", permission: "billing.manage" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/notifications", label: "Notifications", icon: "notifications", permission: "class.manage", minScope: "all" },
      { href: "/admin/settings", label: "Settings", icon: "settings", permission: "settings.manage" },
      { href: "/admin/audit", label: "Audit log", icon: "audit", permission: "audit.view" },
      // Dead-letter queue: the page requires the ADMIN or SUPER_ADMIN role; `audit.view` is held by exactly those roles.
      { href: "/admin/jobs", label: "Background jobs", icon: "usage", permission: "audit.view" },
    ],
  },
];

/** Platform staff roles that may enter the admin console (the layout enforces it; the nav mirrors it). */
export const ADMIN_STAFF_ROLES: readonly Role[] = ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"];

/** True when `holder` may see `item` in the sidebar. Non-staff never see permissioned items (school roles included). */
export function canSeeAdminNavItem(holder: RoleHolder, item: Pick<AdminNavItem, "permission" | "minScope">): boolean {
  if (item.permission === undefined) return true;
  if (!hasAnyRole(holder, ...ADMIN_STAFF_ROLES)) return false;
  return hasPermission(holder, item.permission, item.minScope ?? "preview");
}

export interface AdminNavOptions {
  /** Real computed counts by `badgeKey` (omit unknown values — never invent a number). */
  badges?: Readonly<Record<string, number | undefined>>;
  /** Override the config (tests, previews). */
  sections?: readonly AdminNavSection[];
  /** Platform feature flags (`getFeatures()`); items with a `feature` are hidden unless it is on here. */
  features?: FeatureFlags;
}

/**
 * The sections `holder` may see, in `AdminShell`'s `NavSection` shape: items filtered by permission, empty sections
 * dropped, badge counts attached only when provided and positive.
 */
export function adminNavFor(holder: RoleHolder, options: AdminNavOptions = {}): NavSection[] {
  const sections = options.sections ?? ADMIN_NAV;
  const result: NavSection[] = [];
  for (const section of sections) {
    const items: NavItem[] = [];
    for (const item of section.items) {
      if (item.feature !== undefined && options.features?.[item.feature] !== true) continue;
      if (!canSeeAdminNavItem(holder, item)) continue;
      const badge = item.badgeKey === undefined ? undefined : options.badges?.[item.badgeKey];
      const navItem: NavItem = { href: item.href, label: item.label, icon: item.icon as NavIconName };
      if (item.match !== undefined) navItem.match = item.match;
      if (badge !== undefined && Number.isFinite(badge) && badge > 0) navItem.badge = badge;
      items.push(navItem);
    }
    if (items.length > 0) result.push({ title: section.title, items });
  }
  return result;
}

/** Every admin href in the config (route tests, link checks). */
export function adminNavHrefs(sections: readonly AdminNavSection[] = ADMIN_NAV): string[] {
  return sections.flatMap((section) => section.items.map((item) => item.href));
}
