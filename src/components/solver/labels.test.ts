import { describe, expect, it } from "vitest";
import { formatMegabytes, initialRevealed, modeLabel, newRequestId, outcomeLabel, solverAvailabilityOf, solverQuotaText, SOLVE_MODE_OPTIONS } from "./labels";
import { needsDownscale, PHOTO_MAX_EDGE, prepareQuestionPhoto, targetSize } from "./photo";

describe("solver labels", () => {
  it("offers 'Teach me' first (the default)", () => {
    expect(SOLVE_MODE_OPTIONS.map((option) => option.mode)).toEqual(["TEACH", "ANSWER"]);
  });

  it("picks the availability state in priority order", () => {
    const ready = { configured: true, enabled: true, entitled: true, examLocked: false };
    expect(solverAvailabilityOf(ready)).toBe("ready");
    expect(solverAvailabilityOf({ ...ready, examLocked: true })).toBe("exam_locked");
    expect(solverAvailabilityOf({ ...ready, entitled: false, examLocked: true })).toBe("not_entitled");
    expect(solverAvailabilityOf({ ...ready, enabled: false, entitled: false })).toBe("disabled");
    expect(solverAvailabilityOf({ ...ready, configured: false, enabled: false })).toBe("not_configured");
  });

  it("formats allowances and sizes", () => {
    expect(solverQuotaText(null)).toBeNull();
    expect(solverQuotaText({ limit: 1, remaining: 1 })).toBe("1 of 1 question left today");
    expect(solverQuotaText({ limit: 10, remaining: 4 })).toBe("4 of 10 questions left today");
    expect(formatMegabytes(5 * 1024 * 1024)).toBe("5 MB");
    expect(formatMegabytes(2.5 * 1024 * 1024)).toBe("2.5 MB");
  });

  it("labels modes and outcomes", () => {
    expect(modeLabel("TEACH")).toBe("Teach me");
    expect(modeLabel("ANSWER")).toBe("Full answer");
    expect(outcomeLabel("COMPLETE")).toBeNull();
    expect(outcomeLabel("UNREADABLE")).toBe("Couldn't read it");
    expect(outcomeLabel("TRUNCATED")).toBe("Didn't finish");
  });

  it("reads the ?step= deep link safely", () => {
    expect(initialRevealed(undefined, 3)).toBe(1);
    expect(initialRevealed("2", 3)).toBe(2);
    expect(initialRevealed(["3", "1"], 3)).toBe(3);
    expect(initialRevealed("99", 3)).toBe(4);
    expect(initialRevealed("-1", 3)).toBe(1);
    expect(initialRevealed("abc", 3)).toBe(1);
    expect(initialRevealed("2", 0)).toBe(0);
  });

  it("makes request ids the server accepts", () => {
    expect(newRequestId(() => "0199a1b2-0000-7000-8000-aaaaaaaaaaaa")).toBe("solve_0199a1b2-0000-7000-8000-aaaaaaaaaaaa");
    expect(newRequestId(() => "a.b/c")).toBe("solve_abc");
    expect(newRequestId()).toMatch(/^[A-Za-z0-9_-]{8,64}$/);
  });
});

describe("photo preparation", () => {
  it("caps the long edge and keeps the aspect ratio", () => {
    expect(targetSize(4000, 3000)).toEqual({ width: PHOTO_MAX_EDGE, height: 960 });
    expect(targetSize(1000, 3000)).toEqual({ width: 427, height: PHOTO_MAX_EDGE });
    expect(targetSize(800, 600)).toEqual({ width: 800, height: 600 });
    expect(targetSize(0, 10)).toEqual({ width: 0, height: 0 });
  });

  it("re-encodes only large photos", () => {
    expect(needsDownscale(4000, 3000, 200_000)).toBe(true);
    expect(needsDownscale(1000, 800, 3_000_000)).toBe(true);
    expect(needsDownscale(1000, 800, 300_000)).toBe(false);
  });

  it("sends the original when the browser cannot re-encode (no createImageBitmap)", async () => {
    const file = new File([new Uint8Array([1, 2, 3])], "q.png", { type: "image/png" });
    expect(await prepareQuestionPhoto(file)).toBe(file);
  });
});
