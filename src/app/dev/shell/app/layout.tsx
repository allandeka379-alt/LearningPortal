import { ArrowLeft, Flame, Settings, User } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import type { NavItem } from "@/components/layout/nav-types";
import { Avatar } from "@/components/ui/Avatar";
import { CountdownPill } from "@/components/ui/CountdownPill";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";

const BASE = "/dev/shell/app";

const NAV: NavItem[] = [
  { href: BASE, label: "Home", icon: "home" },
  { href: `${BASE}/subjects`, label: "Subjects", icon: "subjects" },
  { href: `${BASE}/practice`, label: "Practice", icon: "practice" },
  { href: `${BASE}/exams`, label: "Exams", icon: "exams" },
  { href: `${BASE}/progress`, label: "Progress", icon: "progress" },
  { href: `${BASE}/flashcards`, label: "Flashcards", icon: "flashcards", badge: 12 },
  { href: `${BASE}/plan`, label: "Study plan", icon: "plan" },
  { href: `${BASE}/tutor`, label: "AI tutor", icon: "tutor" },
];

/** Dev preview of the student AppShell with sample header actions (values are illustrative only). */
export default function AppShellPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      nav={NAV}
      homeHref={BASE}
      sidebarFooter={
        <Link href="/dev" className="inline-flex min-h-10 items-center gap-2 text-sm text-muted hover:text-text">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to previews
        </Link>
      }
      headerActions={
        <>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-text tabular-nums">
            <Flame aria-hidden="true" className="size-4" />
            12<span className="sr-only"> day streak</span>
          </span>
          <CountdownPill days={126} />
          <DropdownMenu
            align="end"
            triggerLabel="Account menu"
            triggerClassName="inline-flex size-11 items-center justify-center rounded-full"
            trigger={<Avatar name="Sample Student" size="sm" decorative />}
          >
            <DropdownMenuLabel>Sample Student</DropdownMenuLabel>
            <DropdownMenuItem href={`${BASE}/profile`} icon={<User aria-hidden="true" />}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem href={`${BASE}/settings`} icon={<Settings aria-hidden="true" />}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem href="/dev" icon={<ArrowLeft aria-hidden="true" />}>
              Back to previews
            </DropdownMenuItem>
          </DropdownMenu>
        </>
      }
    >
      {children}
    </AppShell>
  );
}
