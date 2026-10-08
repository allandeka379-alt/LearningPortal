import { describe, expect, it } from "vitest";
import { TEACHER_NAV, TEACHER_TAB_LIMIT, teacherMenuNav, teacherNav, teacherTabs } from "./nav";

describe("teacher navigation", () => {
  it("lists the teacher areas once each", () => {
    const hrefs = TEACHER_NAV.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs[0]).toBe("/teacher");
    expect(hrefs).toEqual(expect.arrayContaining(["/teacher/classes", "/teacher/assignments", "/teacher/review", "/teacher/assessments", "/teacher/announcements"]));
  });

  it("splits tabs and menu entries", () => {
    expect(teacherTabs()).toHaveLength(TEACHER_TAB_LIMIT);
    expect([...teacherTabs(), ...teacherMenuNav()].map((i) => i.href)).toEqual(TEACHER_NAV.map((i) => i.href));
  });

  it("shows a real marking count only", () => {
    expect(teacherNav(3).find((i) => i.href === "/teacher/review")?.badge).toBe(3);
    expect(teacherNav(0).find((i) => i.href === "/teacher/review")?.badge).toBeUndefined();
    expect(teacherNav(null).every((i) => i.badge === undefined)).toBe(true);
  });
});
