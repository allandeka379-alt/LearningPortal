import { describe, expect, it } from "vitest";
import OpenGraphImage, { alt, contentType, size } from "./opengraph-image";

describe("Open Graph image", () => {
  it("renders a 1200×630 PNG with the headline as alt text", async () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt).toContain("Master Your Exams.");
    const response = OpenGraphImage();
    const bytes = new Uint8Array(await response.arrayBuffer());
    expect(response.headers.get("content-type")).toBe("image/png");
    // PNG signature.
    expect([...bytes.slice(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
    expect(bytes.length).toBeGreaterThan(5_000);
  }, 60_000);
});
