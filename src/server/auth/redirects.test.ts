import { describe, expect, it } from "vitest";
import { changePasswordPathWithNext, homePathFor, loginPathWithNext, onboardingPathWithNext, postLoginPath, safeNextPath, type RoutingSubject } from "./redirects";

describe("safeNextPath", () => {
  it.each([
    ["/app", "/app"],
    ["/app/subjects/maths?tab=topics#t1", "/app/subjects/maths?tab=topics#t1"],
    ["/parent", "/parent"],
    ["/onboarding?step=2", "/onboarding?step=2"],
    ["/app/../admin", "/admin"],
    // Stays a same-origin path: browsers do not decode %2F into a path separator when navigating.
    ["/%2F/evil.example", "/%2F/evil.example"],
  ])("accepts %s", (input, expected) => {
    expect(safeNextPath(input)).toBe(expected);
  });

  it.each([
    "",
    "app",
    "https://evil.example/",
    "//evil.example",
    "/\\evil.example",
    "/\t/evil.example",
    "/\n/evil.example",
    "/ /evil",
    "/app\\..\\..\\evil",
    "javascript:alert(1)",
    "/login",
    "/login?next=/app",
    "/register",
    "/verify",
    "/reset-password",
    "/api/auth/logout",
    `/${"a".repeat(2050)}`,
  ])("rejects %j", (input) => {
    expect(safeNextPath(input)).toBeNull();
  });

  it("rejects non-strings", () => {
    expect(safeNextPath(undefined)).toBeNull();
    expect(safeNextPath(["/app"])).toBeNull();
    expect(safeNextPath(42)).toBeNull();
  });

  it("builds login links with an encoded, validated next", () => {
    expect(loginPathWithNext("/app/practice?x=1")).toBe("/login?next=%2Fapp%2Fpractice%3Fx%3D1");
    expect(loginPathWithNext("//evil")).toBe("/login");
    expect(loginPathWithNext(null)).toBe("/login");
  });
});

const subject = (roles: RoutingSubject["roles"], studentOnboardingCompleted: boolean | null = null): RoutingSubject => ({
  roles,
  studentOnboardingCompleted,
});

describe("homePathFor / postLoginPath", () => {
  it("routes each role to its area", () => {
    expect(homePathFor(subject(["STUDENT"], false))).toBe("/onboarding");
    expect(homePathFor(subject(["STUDENT"], true))).toBe("/app");
    expect(homePathFor(subject(["PARENT"]))).toBe("/parent");
    expect(homePathFor(subject(["TEACHER"]))).toBe("/teacher");
    expect(homePathFor(subject(["TEACHER", "SCHOOL_ADMIN"]))).toBe("/school");
    expect(homePathFor(subject(["CONTENT_EDITOR"]))).toBe("/admin");
    expect(homePathFor(subject(["ADMIN"]))).toBe("/admin");
    expect(homePathFor(subject(["SUPER_ADMIN", "PARENT"]))).toBe("/admin");
    expect(homePathFor(subject([]))).toBe("/");
  });

  it("honours a safe next, except that unfinished students go to onboarding", () => {
    expect(postLoginPath(subject(["PARENT"]), "/parent/children/1")).toBe("/parent/children/1");
    expect(postLoginPath(subject(["PARENT"]), "//evil.example")).toBe("/parent");
    expect(postLoginPath(subject(["STUDENT"], true), "/app/practice")).toBe("/app/practice");
    // Unfinished students go through onboarding, which continues to the safe next afterwards.
    expect(postLoginPath(subject(["STUDENT"], false), "/app/practice")).toBe("/onboarding?next=%2Fapp%2Fpractice");
    expect(postLoginPath(subject(["STUDENT"], false), "/invite/abc")).toBe("/onboarding?next=%2Finvite%2Fabc");
    expect(postLoginPath(subject(["STUDENT"], false), "https://evil.example")).toBe("/onboarding");
    expect(postLoginPath(subject(["STUDENT"], false), "/onboarding?step=3")).toBe("/onboarding?step=3");
    expect(postLoginPath(subject(["STUDENT"], null))).toBe("/onboarding");
  });

  it("sends users with a school-set password to /change-password first, keeping a safe next", () => {
    const mustChange = { ...subject(["STUDENT"], true), passwordMustChange: true };
    expect(postLoginPath(mustChange, "/app/practice")).toBe("/change-password?next=%2Fapp%2Fpractice");
    expect(postLoginPath(mustChange, "//evil.example")).toBe("/change-password");
    expect(postLoginPath(mustChange)).toBe("/change-password");
    expect(changePasswordPathWithNext("/app?x=1")).toBe("/change-password?next=%2Fapp%3Fx%3D1");
    // The change-password page is never itself a "next" (no loops).
    expect(safeNextPath("/change-password")).toBeNull();
    expect(postLoginPath({ ...subject(["PARENT"]), passwordMustChange: false }, "/parent")).toBe("/parent");
  });

  it("builds the onboarding entry with a validated next (never into the wizard itself)", () => {
    expect(onboardingPathWithNext("/app/classes/invite/t1")).toBe("/onboarding?next=%2Fapp%2Fclasses%2Finvite%2Ft1");
    expect(onboardingPathWithNext("/onboarding/finish")).toBe("/onboarding");
    expect(onboardingPathWithNext("//evil.example")).toBe("/onboarding");
    expect(onboardingPathWithNext(null)).toBe("/onboarding");
  });

  it("drops the bare student home as a next (it would override the wizard's diagnostic offer)", () => {
    expect(onboardingPathWithNext("/app")).toBe("/onboarding");
    expect(onboardingPathWithNext("/app/")).toBe("/onboarding");
    expect(onboardingPathWithNext("/app/practice")).toBe("/onboarding?next=%2Fapp%2Fpractice");
    // The proxy's sign-in redirect for /app is /login?next=%2Fapp: an unfinished student then gets the plain wizard.
    expect(postLoginPath(subject(["STUDENT"], false), "/app")).toBe("/onboarding");
    // A school-set password is replaced first; the next is kept for afterwards (postLoginPath runs again then).
    expect(postLoginPath({ ...subject(["STUDENT"], false), passwordMustChange: true }, "/app")).toBe("/change-password?next=%2Fapp");
  });
});
