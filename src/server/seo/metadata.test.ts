import { describe, expect, it } from "vitest";
import { buildPageMetadata, NOT_FOUND_METADATA, OG_LOCALE } from "./metadata";

describe("buildPageMetadata", () => {
  const input = {
    title: "ZIMSEC O-Level Mathematics — topics, lessons and practice | BvunzoHub",
    socialTitle: "ZIMSEC O-Level Mathematics — topics, lessons and practice",
    description: "The syllabus topic list.",
    path: "/zimsec/o-level/mathematics",
    appName: "BvunzoHub",
  };

  it("sets an absolute title, canonical URL, Open Graph and Twitter cards", () => {
    expect(buildPageMetadata(input)).toEqual({
      title: { absolute: input.title },
      description: input.description,
      alternates: { canonical: input.path },
      openGraph: {
        type: "website",
        siteName: "BvunzoHub",
        title: input.socialTitle,
        description: input.description,
        url: input.path,
        locale: OG_LOCALE,
      },
      twitter: { card: "summary", title: input.socialTitle, description: input.description },
    });
  });

  it("lists the social image on Open Graph and switches Twitter to the large card", () => {
    const image = { url: "/opengraph-image", width: 1200, height: 630, alt: "BvunzoHub: Learn every topic. Be ready for every paper." };
    const meta = buildPageMetadata({ ...input, image });
    expect(meta.openGraph).toMatchObject({ images: [image] });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", images: [image] });
  });

  it("marks thin pages noindex but followable", () => {
    expect(buildPageMetadata({ ...input, noIndex: true }).robots).toEqual({ index: false, follow: true });
  });

  it("adds article times for guides", () => {
    const meta = buildPageMetadata({
      ...input,
      type: "article",
      publishedTime: new Date("2026-09-01T00:00:00Z"),
      modifiedTime: new Date("2026-09-02T00:00:00Z"),
    });
    expect(meta.openGraph).toMatchObject({ type: "article", publishedTime: "2026-09-01T00:00:00.000Z", modifiedTime: "2026-09-02T00:00:00.000Z" });
  });

  it("keeps unknown URLs out of the index", () => {
    expect(NOT_FOUND_METADATA.robots).toEqual({ index: false, follow: false });
  });
});
