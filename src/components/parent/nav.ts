import type { NavItem } from "@/components/layout/nav-types";

/**
 * Parent-area navigation (/parent, §21). Four destinations, so the same list serves the desktop sidebar and the
 * mobile tab bar. "/parent" matches by prefix so a child's page keeps "Children" highlighted (the longest match wins,
 * so /parent/link highlights "Link a child").
 */
export const PARENT_NAV: readonly NavItem[] = [
  { href: "/parent", label: "Children", icon: "children" },
  { href: "/parent/link", label: "Link a child", icon: "users" },
  { href: "/parent/billing", label: "Payments", icon: "payments" },
  { href: "/parent/settings", label: "Settings", icon: "settings" },
];
