import { describe, expect, it, vi } from "vitest";
import { reviewPathFor } from "./paths";

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(location);
  }
}

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  permanentRedirect: (to: string) => {
    throw new RedirectSignal(to);
  },
}));

const CLASS = "0f8fad5b-d9cb-469f-a165-70867728950e";
const ATTEMPT = "7c9e6679-7425-40de-944b-e07fc1f90ae7";

async function locationOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

describe("/teacher/marking alias", () => {
  it("maps to /teacher/review, keeping only a valid class filter or attempt id", () => {
    expect(reviewPathFor(null)).toBe("/teacher/review");
    expect(reviewPathFor(null, { classId: CLASS })).toBe(`/teacher/review?classId=${CLASS}`);
    expect(reviewPathFor(null, { classId: "x\r\nLocation: https://evil.example" })).toBe("/teacher/review");
    expect(reviewPathFor(ATTEMPT)).toBe(`/teacher/review/${ATTEMPT}`);
    expect(reviewPathFor("../../admin")).toBe("/teacher/review");
  });

  it("redirects both pages", async () => {
    const index = (await import("./page")).default;
    const attempt = (await import("./[attemptId]/page")).default;
    expect(await locationOf(index({ searchParams: Promise.resolve({ classId: [CLASS, "other"] }) }))).toBe(`/teacher/review?classId=${CLASS}`);
    expect(await locationOf(attempt({ params: Promise.resolve({ attemptId: ATTEMPT }) }))).toBe(`/teacher/review/${ATTEMPT}`);
  });
});
