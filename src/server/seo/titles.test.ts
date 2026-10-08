import { describe, expect, it, vi } from "vitest";

// next/font is a compile-time transform; outside Next it only has to hand back a class name.
vi.mock("next/font/google", () => ({ Plus_Jakarta_Sans: () => ({ variable: "font-jakarta", className: "font-jakarta" }) }));

import { generateMetadata } from "@/app/layout";
import { APP_NAME, TITLE_SEPARATOR } from "@/lib/config";
import { marketingMetadata } from "@/server/marketing/metadata";
import { withBrand } from "./text";

/**
 * One title format across the site: the root layout's template ("%s · APP_NAME") for ordinary pages, and the same
 * format for the absolute titles of the SEO curriculum pages and the marketing social cards.
 */
describe("document titles", () => {
  const template = (() => {
    const title = generateMetadata().title;
    if (!title || typeof title !== "object" || !("template" in title) || typeof title.template !== "string") throw new Error("root title template missing");
    return title.template;
  })();
  const brand = (page: string) => template.replace("%s", page);

  it("uses '%s · APP_NAME' as the root template", () => {
    expect(TITLE_SEPARATOR).toBe(" · ");
    expect(template).toBe(`%s · ${APP_NAME}`);
  });

  it("brands SEO page titles exactly like the root template", () => {
    const page = "Quadratic equations — ZIMSEC O-Level Mathematics";
    expect(withBrand(page, APP_NAME)).toBe(brand(page));
    expect(withBrand(`  ${page}  `, APP_NAME)).toBe(brand(page));
  });

  it("brands marketing social titles the same way", () => {
    const meta = marketingMetadata({ title: "Pricing", description: "Plans and prices.", path: "/pricing" });
    expect(meta.title).toBe("Pricing");
    expect(meta.openGraph?.title).toBe(brand("Pricing"));
    expect(meta.twitter?.title).toBe(brand("Pricing"));
  });
});
