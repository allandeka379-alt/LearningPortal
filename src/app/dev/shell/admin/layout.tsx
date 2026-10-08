import type { ReactNode } from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import type { NavSection } from "@/components/layout/nav-types";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

const BASE = "/dev/shell/admin";

/** Admin sections from §36, grouped. */
const SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { href: BASE, label: "Dashboard", icon: "dashboard", match: "exact" },
      { href: `${BASE}/analytics`, label: "Analytics", icon: "analytics" },
    ],
  },
  {
    title: "People",
    items: [
      { href: `${BASE}/users`, label: "Users", icon: "users" },
      { href: `${BASE}/schools`, label: "Schools", icon: "schools" },
      { href: `${BASE}/students`, label: "Students", icon: "students" },
      { href: `${BASE}/teachers`, label: "Teachers", icon: "teachers" },
    ],
  },
  {
    title: "Curriculum",
    items: [
      { href: `${BASE}/boards`, label: "Boards", icon: "boards" },
      { href: `${BASE}/qualifications`, label: "Qualifications", icon: "qualifications" },
      { href: `${BASE}/subjects`, label: "Subjects", icon: "subjects" },
      { href: `${BASE}/syllabuses`, label: "Syllabuses", icon: "syllabuses" },
      { href: `${BASE}/topics`, label: "Topics", icon: "topics" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: `${BASE}/lessons`, label: "Lessons", icon: "lessons" },
      { href: `${BASE}/questions`, label: "Questions", icon: "questions", badge: 8 },
      { href: `${BASE}/exams`, label: "Exams", icon: "exams" },
      { href: `${BASE}/packs`, label: "Study packs", icon: "packs" },
      { href: `${BASE}/ai`, label: "AI", icon: "ai" },
    ],
  },
  {
    title: "Commerce",
    items: [
      { href: `${BASE}/subscriptions`, label: "Subscriptions", icon: "subscriptions" },
      { href: `${BASE}/payments`, label: "Payments", icon: "payments" },
    ],
  },
  {
    title: "System",
    items: [
      { href: `${BASE}/notifications`, label: "Notifications", icon: "notifications" },
      { href: `${BASE}/settings`, label: "Settings", icon: "settings" },
    ],
  },
];

/** Dev preview of the AdminShell. */
export default function AdminShellPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <AdminShell
      sections={SECTIONS}
      homeHref={BASE}
      headerActions={
        <>
          <span className="hidden sm:inline-flex">
            <Badge tone="warning">Development</Badge>
          </span>
          <ButtonLink href="/dev" variant="ghost" size="sm">
            Previews
          </ButtonLink>
        </>
      }
    >
      {children}
    </AdminShell>
  );
}
