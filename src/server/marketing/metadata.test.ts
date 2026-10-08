import { describe, expect, it } from "vitest";
import { getEnv } from "@/server/lib/env";
import { marketingMetadata, OG_IMAGE_PATH } from "./metadata";

describe("marketingMetadata", () => {
  it("sets a canonical URL on APP_URL, Open Graph and Twitter cards with the shared image", () => {
    const metadata = marketingMetadata({ title: "Plans and pricing", description: "Compare plans.", path: "/pricing" });
    const base = getEnv().APP_URL;
    expect(metadata.title).toBe("Plans and pricing");
    expect(metadata.alternates?.canonical).toBe(`${base}/pricing`);
    expect(metadata.openGraph).toMatchObject({ url: `${base}/pricing`, description: "Compare plans.", locale: "en_ZW" });
    expect(JSON.stringify(metadata.openGraph)).toContain(OG_IMAGE_PATH);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.robots).toBeUndefined();
  });

  it("supports an absolute home title and noindex drafts", () => {
    expect(marketingMetadata({ title: "Home", description: "d", path: "/", absoluteTitle: true }).title).toEqual({ absolute: "Home" });
    expect(marketingMetadata({ title: "Terms", description: "d", path: "/legal/terms", noIndex: true }).robots).toEqual({ index: false, follow: true });
  });

  it("refuses non-relative paths", () => {
    expect(() => marketingMetadata({ title: "x", description: "d", path: "https://evil.test/" })).toThrow();
  });
});
