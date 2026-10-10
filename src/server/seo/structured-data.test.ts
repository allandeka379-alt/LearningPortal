import { describe, expect, it } from "vitest";
import {
  articleJsonLd,
  breadcrumbListJsonLd,
  collectionPageJsonLd,
  courseJsonLd,
  JSON_LD_LIST_LIMIT,
  serializeJsonLd,
  siteOrganization,
} from "./structured-data";

const provider = siteOrganization("BvunzoHub", "https://dzidza.example");

describe("serializeJsonLd", () => {
  it("cannot be broken out of a script element by CMS text", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script> & <!--" });
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    expect(out).not.toContain("&");
    // Still valid JSON that round-trips the original text.
    expect(JSON.parse(out)).toEqual({ name: "</script><script>alert(1)</script> & <!--" });
  });

  it("escapes line and paragraph separators", () => {
    const text = `a${String.fromCharCode(0x2028)}b${String.fromCharCode(0x2029)}c`;
    const out = serializeJsonLd({ text });
    expect(out).toContain("\\u2028");
    expect(out).toContain("\\u2029");
    expect(JSON.parse(out)).toEqual({ text });
  });
});

describe("builders", () => {
  it("numbers breadcrumb items from 1 with absolute URLs", () => {
    const data = breadcrumbListJsonLd([
      { name: "Home", url: "https://dzidza.example/" },
      { name: "ZIMSEC", url: "https://dzidza.example/zimsec" },
    ]);
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dzidza.example/" },
        { "@type": "ListItem", position: 2, name: "ZIMSEC", item: "https://dzidza.example/zimsec" },
      ],
    });
  });

  it("builds a Course without invented ratings, reviews or offers", () => {
    const course = courseJsonLd({
      name: "ZIMSEC O-Level Mathematics",
      description: "Topics and practice.",
      url: "https://dzidza.example/zimsec/o-level/mathematics",
      provider,
      courseCode: "4004",
      educationalLevel: "ZIMSEC O-Level",
      inLanguage: "en",
      teaches: Array.from({ length: JSON_LD_LIST_LIMIT + 10 }, (_, i) => `Topic ${i + 1}`),
      about: { "@type": "Organization", name: "Zimbabwe School Examinations Council" },
    });
    expect(course).toMatchObject({ "@type": "Course", courseCode: "4004", provider: { "@type": "EducationalOrganization", name: "BvunzoHub" } });
    expect(course.teaches).toHaveLength(JSON_LD_LIST_LIMIT);
    const json = JSON.stringify(course);
    for (const forbidden of ["aggregateRating", "review", "offers", "ratingValue"]) expect(json).not.toContain(forbidden);
  });

  it("omits an empty item list and caps long ones", () => {
    const base = { name: "ZIMSEC", description: "", url: "https://dzidza.example/zimsec", about: provider, publisher: provider };
    expect(collectionPageJsonLd({ ...base, items: [] })).not.toHaveProperty("mainEntity");
    expect(collectionPageJsonLd({ ...base, items: [] })).not.toHaveProperty("description");
    const many = collectionPageJsonLd({ ...base, items: Array.from({ length: 80 }, (_, i) => ({ name: `S${i}`, url: `https://dzidza.example/s${i}` })) });
    expect((many.mainEntity as { itemListElement: unknown[] }).itemListElement).toHaveLength(JSON_LD_LIST_LIMIT);
  });

  it("builds an Article that falls back to the publisher as author", () => {
    const article = articleJsonLd({
      headline: "How grading works",
      description: "A guide.",
      url: "https://dzidza.example/zimsec/guides/grading",
      inLanguage: "en",
      publisher: provider,
      author: null,
      datePublished: new Date("2026-09-01T00:00:00Z"),
      dateModified: null,
    });
    expect(article).toMatchObject({ "@type": "Article", author: provider, datePublished: "2026-09-01T00:00:00.000Z", isAccessibleForFree: true });
    expect(article).not.toHaveProperty("dateModified");
  });
});
