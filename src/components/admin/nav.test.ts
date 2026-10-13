import { describe, expect, it } from "vitest";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/features";
import { ADMIN_NAV, adminNavFor, adminNavHrefs } from "./nav";

/** Every optional feature switched on (the AI pages are hidden otherwise). */
const ALL_ON = { ai: true, whatsapp: true, email: true, sms: true, stripe: true } as const;
const AI_PAGES = ["/admin/ai", "/admin/ai/usage", "/admin/ai/settings"];

function hrefs(sections: ReturnType<typeof adminNavFor>): string[] {
  return sections.flatMap((section) => section.items.map((item) => item.href));
}

describe("adminNavFor", () => {
  it("shows content editors only the content, curriculum and workflow sections", () => {
    const nav = adminNavFor(["CONTENT_EDITOR"]);
    expect(nav.map((section) => section.title)).toEqual(["Overview", "Curriculum", "Content", "Workflow"]);
    const links = hrefs(nav);
    expect(links).toContain("/admin/questions");
    expect(links).toContain("/admin/review");
    expect(links).not.toContain("/admin/analytics");
    expect(links).not.toContain("/admin/reports");
    expect(links).not.toContain("/admin/users");
    expect(links).not.toContain("/admin/audit");
    expect(links).not.toContain("/admin/settings");
  });

  it("shows ADMIN operations and commerce but not Settings; SUPER_ADMIN sees everything", () => {
    const admin = hrefs(adminNavFor(["ADMIN"]));
    expect(admin).toEqual(expect.arrayContaining(["/admin/users", "/admin/schools", "/admin/analytics", "/admin/reports", "/admin/payments", "/admin/notifications", "/admin/audit"]));
    expect(admin).not.toContain("/admin/settings");
    expect(hrefs(adminNavFor(["SUPER_ADMIN"], { features: ALL_ON }))).toEqual(adminNavHrefs());
  });

  it("hides the AI pages unless features.ai is on (owner decision 2026-10-07), whatever the role", () => {
    for (const roles of [["CONTENT_EDITOR"], ["ADMIN"], ["SUPER_ADMIN"]] as const) {
      for (const links of [hrefs(adminNavFor(roles)), hrefs(adminNavFor(roles, { features: DEFAULT_FEATURE_FLAGS }))]) {
        for (const page of AI_PAGES) expect(links, `${roles[0]} ${page}`).not.toContain(page);
      }
    }
    expect(hrefs(adminNavFor(["SUPER_ADMIN"], { features: { ...DEFAULT_FEATURE_FLAGS, ai: true } }))).toEqual(expect.arrayContaining(AI_PAGES));
    // Without AI the rest of the nav is unchanged.
    expect(hrefs(adminNavFor(["SUPER_ADMIN"]))).toEqual(adminNavHrefs().filter((href) => !AI_PAGES.includes(href)));
  });

  it("lists exam sessions, grade schemes, the media library, promo codes and the AI admin pages for the right roles", () => {
    const editor = hrefs(adminNavFor(["CONTENT_EDITOR"]));
    expect(editor).toEqual(expect.arrayContaining(["/admin/exam-sessions", "/admin/grade-schemes", "/admin/media"]));
    expect(editor).not.toContain("/admin/promo-codes");
    expect(editor).not.toContain("/admin/ai/settings");
    const admin = hrefs(adminNavFor(["ADMIN"], { features: ALL_ON }));
    expect(admin).toEqual(expect.arrayContaining(["/admin/promo-codes", "/admin/ai/usage", "/admin/ai/settings", "/admin/media"]));
    const icons = Object.fromEntries(adminNavFor(["SUPER_ADMIN"]).flatMap((section) => section.items.map((item) => [item.href, item.icon])));
    expect(icons).toMatchObject({ "/admin/review": "review", "/admin/flags": "flags", "/admin/plans": "plans", "/admin/media": "media" });
  });

  it("lists the daily-question calendar, FAQ and testimonials under Content for content.publish holders", () => {
    for (const roles of [["CONTENT_EDITOR"], ["ADMIN"], ["SUPER_ADMIN"]] as const) {
      const content = adminNavFor(roles).find((section) => section.title === "Content");
      expect(content?.items.map((item) => item.href)).toEqual(expect.arrayContaining(["/admin/daily-questions", "/admin/faq", "/admin/testimonials"]));
    }
  });

  it("gives non-staff roles nothing but the dashboard link (the layout refuses them anyway)", () => {
    expect(hrefs(adminNavFor(["STUDENT", "SCHOOL_ADMIN", "TEACHER"]))).toEqual(["/admin"]);
  });

  it("attaches only real, positive badge counts", () => {
    const nav = adminNavFor(["ADMIN"], { badges: { review: 4, flags: 0 } });
    const items = nav.flatMap((section) => section.items);
    expect(items.find((item) => item.href === "/admin/review")?.badge).toBe(4);
    expect(items.find((item) => item.href === "/admin/flags")?.badge).toBeUndefined();
  });

  it("keeps every href unique and under /admin, covering the §36 sections", () => {
    const all = adminNavHrefs(ADMIN_NAV);
    expect(new Set(all).size).toBe(all.length);
    expect(all.every((href) => href === "/admin" || href.startsWith("/admin/"))).toBe(true);
    const labels = ADMIN_NAV.flatMap((section) => section.items.map((item) => item.label));
    for (const required of ["Dashboard", "Users", "Schools", "Students", "Teachers", "Boards", "Qualifications", "Subjects", "Syllabuses", "Topics", "Lessons", "Questions", "Exams", "Study packs", "AI", "Subscriptions", "Payments", "Analytics", "Reports", "Notifications", "Settings"]) {
      expect(labels).toContain(required);
    }
  });
});
