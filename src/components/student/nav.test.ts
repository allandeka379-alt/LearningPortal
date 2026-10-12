import { describe, expect, it } from "vitest";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/features";
import { STUDENT_NAV, STUDENT_TAB_LIMIT, studentMenuNav, studentNavFor, studentTabNav, visibleStudentNav, type StudentNavItem } from "./nav";

/** The intended student navigation (sidebar order). Tabs: Home, Learn, Practice, Exams, Plan; then the groups. */
const ALL_HREFS = [
  "/app",
  "/app/subjects",
  "/app/practice",
  "/app/exams",
  "/app/plan",
  "/app/flashcards",
  "/app/daily",
  "/app/diagnostic",
  "/app/progress",
  "/app/tutor",
  "/app/solver",
  "/app/classes",
  "/app/leaderboard",
  "/app/achievements",
  "/app/invite",
  "/app/notifications",
  "/app/family",
  "/app/billing",
  "/app/settings",
];

/** Everything that is not a tab, in order; the account menu lists Settings on its own. */
const MENU_HREFS = [
  "/app/flashcards",
  "/app/daily",
  "/app/diagnostic",
  "/app/progress",
  "/app/tutor",
  "/app/solver",
  "/app/classes",
  "/app/leaderboard",
  "/app/achievements",
  "/app/invite",
  "/app/notifications",
  "/app/family",
  "/app/billing",
];

describe("student navigation", () => {
  it("contains the student areas once each, Settings last", () => {
    const hrefs = STUDENT_NAV.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toEqual(ALL_HREFS);
    expect(hrefs.at(-1)).toBe("/app/settings");
    expect(hrefs.indexOf("/app/billing")).toBe(hrefs.indexOf("/app/settings") - 1);
  });

  it("names the learning tabs and groups the rest: Study tools, Community, Account", () => {
    expect(studentTabNav().map((item) => item.label)).toEqual(["Home", "Learn", "Practice", "Exams", "Plan"]);
    expect(studentTabNav().every((item) => item.group === undefined)).toBe(true);
    const groupOf = new Map(visibleStudentNav().map((item) => [item.href, item.group]));
    for (const href of ["/app/flashcards", "/app/daily", "/app/diagnostic", "/app/progress", "/app/tutor", "/app/solver"]) expect(groupOf.get(href)).toBe("Study tools");
    for (const href of ["/app/classes", "/app/leaderboard", "/app/achievements", "/app/invite"]) expect(groupOf.get(href)).toBe("Community");
    for (const href of ["/app/notifications", "/app/family", "/app/billing", "/app/settings"]) expect(groupOf.get(href)).toBe("Account");
    // Every group is one consecutive block (the sidebar renders one heading per block).
    const groups = visibleStudentNav().map((item) => item.group).filter((group) => group !== undefined);
    expect(groups.filter((group, index) => group !== groups[index - 1])).toEqual(["Study tools", "Community", "Account"]);
  });

  it("only shows routes that exist", () => {
    const visible = visibleStudentNav().map((item) => item.href);
    expect(visible).toEqual(ALL_HREFS);
    expect(visibleStudentNav().every((item) => !("available" in item) && !("tab" in item))).toBe(true);
    expect(visibleStudentNav().map((item) => item.href)).not.toContain("/app/study-packs");
  });

  it("labels the engagement, classes and family entries", () => {
    const byHref = new Map(STUDENT_NAV.map((item) => [item.href, item]));
    expect(byHref.get("/app/family")).toMatchObject({ label: "Family", icon: "users", available: true });
    expect(byHref.get("/app/family")?.tab).toBeUndefined();
    expect(byHref.get("/app/solver")).toMatchObject({ label: "Question solver", icon: "help" });
    expect(byHref.get("/app/achievements")).toMatchObject({ label: "Achievements", icon: "qualifications" });
    expect(byHref.get("/app/leaderboard")).toMatchObject({ label: "Leaderboard", icon: "leaderboard" });
    expect(byHref.get("/app/invite")).toMatchObject({ label: "Invite friends", icon: "invite" });
    expect(byHref.get("/app/notifications")).toMatchObject({ label: "Notifications", icon: "notifications" });
    expect(byHref.get("/app/classes")).toMatchObject({ label: "Classes", icon: "classes" });
  });

  it("builds a tab bar of at most five available entries and puts the rest in the menu", () => {
    const items: StudentNavItem[] = [
      ...STUDENT_NAV,
      { href: "/app/extra-1", label: "Extra 1", icon: "search", available: true, tab: true },
      { href: "/app/hidden", label: "Hidden", icon: "search", available: false, tab: true },
    ];
    const tabs = studentTabNav(items).map((item) => item.href);
    expect(tabs).toHaveLength(STUDENT_TAB_LIMIT);
    expect(tabs).toEqual(["/app", "/app/subjects", "/app/practice", "/app/exams", "/app/plan"]);
    const menu = studentMenuNav(items).map((item) => item.href);
    expect(menu).toEqual([...MENU_HREFS, "/app/extra-1"]);
    expect(menu).not.toContain("/app/hidden");
    expect(menu).not.toContain("/app/settings");
  });

  it("lists the daily question and the diagnostic in the menu, never as tabs", () => {
    const tabs = studentTabNav().map((item) => item.href);
    const menu = studentMenuNav().map((item) => item.href);
    expect(menu).toEqual(MENU_HREFS);
    for (const href of ["/app/daily", "/app/diagnostic"]) {
      expect(tabs).not.toContain(href);
      expect(menu).toContain(href);
      expect(visibleStudentNav().map((item) => item.href)).toContain(href);
    }
  });

  it("hides the AI tutor and the question solver while features.ai is off (owner decision 2026-10-07)", () => {
    const off = studentNavFor(DEFAULT_FEATURE_FLAGS);
    for (const nav of [visibleStudentNav(off), studentTabNav(off), studentMenuNav(off)]) {
      const links = nav.map((item) => item.href);
      expect(links).not.toContain("/app/tutor");
      expect(links).not.toContain("/app/solver");
    }
    // Everything else stays where it was.
    expect(visibleStudentNav(off).map((item) => item.href)).toEqual(ALL_HREFS.filter((href) => href !== "/app/tutor" && href !== "/app/solver"));
    expect(studentTabNav(off).map((item) => item.href)).toEqual(studentTabNav().map((item) => item.href));

    const on = studentNavFor({ ...DEFAULT_FEATURE_FLAGS, ai: true });
    expect(visibleStudentNav(on).map((item) => item.href)).toEqual(ALL_HREFS);
    expect(studentMenuNav(on).map((item) => item.href)).toEqual(MENU_HREFS);
    // The flag never leaks into what the shells receive.
    expect(visibleStudentNav(on).every((item) => !("feature" in item))).toBe(true);
  });

  it("flipping availability shows an entry everywhere it belongs, and hides it again", () => {
    const hidden = STUDENT_NAV.map((item) => (item.href === "/app/solver" ? { ...item, available: false } : item));
    expect(visibleStudentNav(hidden).map((item) => item.href)).not.toContain("/app/solver");
    expect(studentMenuNav(hidden).map((item) => item.href)).not.toContain("/app/solver");
    const shown = hidden.map((item) => (item.href === "/app/solver" ? { ...item, available: true } : item));
    expect(visibleStudentNav(shown).map((item) => item.href)).toContain("/app/solver");
    expect(studentMenuNav(shown).map((item) => item.href)).toContain("/app/solver");
  });
});
