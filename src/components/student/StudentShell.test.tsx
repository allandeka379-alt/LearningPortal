/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const pathname = vi.hoisted(() => ({ current: "/app" }));

vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
// The sign-out Server Action pulls in server modules; the shell only needs a function to bind to the form.
vi.mock("@/app/(auth)/actions", () => ({ logoutAction: vi.fn() }));
vi.mock("@/lib/pwa/saved-lessons", () => ({ clearOfflineData: vi.fn(async () => undefined) }));

import { AppShell } from "@/components/layout/AppShell";
import { STUDENT_NAV, studentMenuNav, studentTabNav, visibleStudentNav } from "./nav";
import { StudentHeaderActions } from "./StudentHeaderActions";

function renderShell(nav = STUDENT_NAV, header?: Partial<Parameters<typeof StudentHeaderActions>[0]>) {
  return render(
    <AppShell
      nav={visibleStudentNav(nav)}
      tabs={studentTabNav(nav)}
      homeHref="/app"
      navLabel="Student"
      headerActions={
        <StudentHeaderActions
          displayName="Tariro Moyo"
          streak={{ current: 12, status: "AT_RISK" }}
          countdown={{ daysUntil: 126, name: "November 2026", isProvisional: true, isDemo: false }}
          menuNav={studentMenuNav(nav)}
          {...header}
        />
      }
    >
      <p>Page</p>
    </AppShell>,
  );
}

beforeEach(() => {
  pathname.current = "/app";
});

afterEach(cleanup);

describe("student shell navigation", () => {
  it("renders only available destinations in the sidebar and a five-item tab bar", () => {
    renderShell();
    const [sidebar, tabbar] = screen.getAllByRole("navigation", { name: "Student" });
    if (!sidebar || !tabbar) throw new Error("navigation landmarks missing");
    const sidebarLinks = within(sidebar).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(sidebarLinks).toEqual([
      "/app",
      "/app/subjects",
      "/app/practice",
      "/app/daily",
      "/app/exams",
      "/app/diagnostic",
      "/app/tutor",
      "/app/solver",
      "/app/flashcards",
      "/app/plan",
      "/app/progress",
      "/app/study-packs",
      "/app/achievements",
      "/app/leaderboard",
      "/app/classes",
      "/app/invite",
      "/app/notifications",
      "/app/family",
      "/app/settings",
    ]);
    for (const name of ["Tutor", "Question solver", "Flashcards", "Achievements", "Leaderboard", "Classes", "Invite friends", "Notifications", "Family"]) {
      expect(within(sidebar).getByRole("link", { name })).toBeTruthy();
    }
    expect(within(tabbar).getAllByRole("link")).toHaveLength(5);
    // The daily question and the diagnostic are menu entries, never tabs.
    expect(within(tabbar).queryByRole("link", { name: /daily question|diagnostic/i })).toBeNull();
  });

  it("shows a destination only while its flag is on", () => {
    renderShell(STUDENT_NAV.map((item) => (item.href === "/app/family" ? { ...item, available: false } : item)));
    const [hiddenSidebar] = screen.getAllByRole("navigation", { name: "Student" });
    if (!hiddenSidebar) throw new Error("sidebar missing");
    expect(within(hiddenSidebar).queryByRole("link", { name: "Family" })).toBeNull();
    cleanup();
    renderShell();
    const [sidebar] = screen.getAllByRole("navigation", { name: "Student" });
    if (!sidebar) throw new Error("sidebar missing");
    expect(within(sidebar).getByRole("link", { name: "Family" })).toHaveProperty("href", expect.stringContaining("/app/family"));
  });

  it("marks the current area, using the longest match", () => {
    pathname.current = "/app/subjects/abc";
    renderShell();
    const [sidebar] = screen.getAllByRole("navigation", { name: "Student" });
    if (!sidebar) throw new Error("sidebar missing");
    expect(within(sidebar).getByRole("link", { name: "Subjects" }).getAttribute("aria-current")).toBe("page");
    expect(within(sidebar).getByRole("link", { name: "Home" }).getAttribute("aria-current")).toBeNull();
  });
});

describe("student header actions", () => {
  it("states the streak and a provisional countdown in words", () => {
    renderShell();
    expect(screen.getByRole("link", { name: /12 days study streak\. Study today to keep it going\./ }).getAttribute("href")).toBe("/app/progress");
    const countdown = screen.getByRole("link", { name: /126 days until your examination, provisional date/ });
    expect(countdown.getAttribute("href")).toBe("/app#exam-countdown");
    expect(countdown.textContent).toContain("provisional");
  });

  it("fits the 360px header: a compact countdown (icon + number) below 380px and the logo mark only below 400px", () => {
    renderShell();
    const countdown = screen.getByRole("link", { name: /126 days until your examination/ });
    // Compact variant: the calendar icon is always shown, the unit word is hidden below 380px; the target stays 44px.
    expect(countdown.getAttribute("data-compact-below")).toBe("380");
    expect(countdown.className).toMatch(/\bmin-h-11\b/);
    expect(countdown.className).toMatch(/\bmin-w-11\b/);
    const icon = countdown.querySelector('[data-part="icon"]');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute("class") ?? "").not.toMatch(/(^|\s)hidden(\s|$)/);
    const unit = countdown.querySelector('[data-part="unit"]');
    expect(unit?.textContent).toBe(" days");
    expect(unit?.className).toContain("max-[380px]:hidden");
    expect(countdown.textContent).toContain("126");
    // The bell sits between the countdown and the account menu, every control at least 44px.
    expect(screen.getByRole("button", { name: /notifications/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Account menu" }).className).toMatch(/\bsize-11\b/);
    // The top bar's logo keeps its name for screen readers but shows only the mark below 400px.
    const header = document.querySelector("header");
    const wordmark = header?.querySelector('a[href="/app"] span span:last-child');
    expect(wordmark?.className).toContain("max-[400px]:sr-only");
  });

  it("hides the countdown when there is no upcoming session and the streak when it could not load", () => {
    renderShell(STUDENT_NAV, { countdown: null, streak: null });
    expect(screen.queryByRole("link", { name: /until your examination/ })).toBeNull();
    expect(screen.queryByRole("link", { name: /streak/ })).toBeNull();
  });

  it("opens an account menu with the other destinations, Settings and Sign out", () => {
    renderShell();
    const trigger = screen.getByRole("button", { name: "Account menu" });
    fireEvent.click(trigger);
    const menu = screen.getByRole("menu");
    const items = within(menu).getAllByRole("menuitem").map((item) => item.textContent);
    expect(items).toEqual([
      "Daily question",
      "Diagnostic",
      "Tutor",
      "Question solver",
      "Flashcards",
      "Progress",
      "Study packs",
      "Achievements",
      "Leaderboard",
      "Classes",
      "Invite friends",
      "Notifications",
      "Family",
      "Settings",
      "Sign out",
    ]);
    expect(within(menu).getByText("Tariro Moyo")).toBeTruthy();
  });
});
