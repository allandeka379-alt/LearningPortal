/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { COOKIES_SECTIONS, COOKIES_SUMMARY, COOKIES_VERSION } from "./cookies";
import { LEGAL_DRAFT_BANNER, LegalDocument } from "./LegalDocument";
import { PRIVACY_SECTIONS, PRIVACY_SUMMARY, PRIVACY_VERSION } from "./privacy";
import { TERMS_SECTIONS, TERMS_SUMMARY, TERMS_VERSION } from "./terms";

afterEach(cleanup);

describe("legal templates", () => {
  it.each([
    ["Privacy notice", PRIVACY_SUMMARY, PRIVACY_VERSION, PRIVACY_SECTIONS],
    ["Terms of use", TERMS_SUMMARY, TERMS_VERSION, TERMS_SECTIONS],
    ["Cookie notice", COOKIES_SUMMARY, COOKIES_VERSION, COOKIES_SECTIONS],
  ] as const)("%s is bannered as a draft and has a working table of contents", (title, summary, version, sections) => {
    render(<LegalDocument title={title} summary={summary} version={version} sections={sections} />);
    expect(screen.getByRole("note").textContent).toContain(LEGAL_DRAFT_BANNER);
    expect(screen.getByRole("heading", { level: 1, name: title })).toBeTruthy();
    for (const section of sections) {
      expect(screen.getByRole("link", { name: section.heading }).getAttribute("href")).toBe(`#${section.id}`);
      expect(document.getElementById(section.id)).not.toBeNull();
    }
    expect(new Set(sections.map((s) => s.id)).size).toBe(sections.length);
  });

  it("covers the Cyber and Data Protection Act principles in the privacy notice", () => {
    render(<LegalDocument title="Privacy notice" summary={PRIVACY_SUMMARY} version={PRIVACY_VERSION} sections={PRIVACY_SECTIONS} />);
    const text = document.body.textContent ?? "";
    expect(text).toContain("Chapter 12:07");
    expect(text).toMatch(/lawful basis/i);
    expect(text).toMatch(/under 18/i);
    expect(text).toMatch(/parent or guardian/i);
    expect(text).toMatch(/your rights/i);
    expect(text).toMatch(/How long we keep it/);
    expect(text).toContain("Anthropic");
    expect(text).toContain("Paynow");
    expect(text).toMatch(/Transfers outside Zimbabwe/);
    expect(text).toContain("POTRAZ");
  });

  it("lists the cookies the app actually sets", () => {
    render(<LegalDocument title="Cookie notice" summary={COOKIES_SUMMARY} version={COOKIES_VERSION} sections={COOKIES_SECTIONS} />);
    const text = document.body.textContent ?? "";
    for (const name of ["dz_session", "dz_auth_flow", "dz_oauth", "dz_theme", "dz_font_scale", "dz_school"]) expect(text).toContain(name);
  });
});

describe("legal tables (§43)", () => {
  it.each([
    ["Privacy notice", PRIVACY_SECTIONS],
    ["Terms of use", TERMS_SECTIONS],
    ["Cookie notice", COOKIES_SECTIONS],
  ] as const)("every table in the %s has a caption and column headers", (title, sections) => {
    render(<LegalDocument title={title} summary={null} version="v" sections={sections} />);
    for (const table of screen.queryAllByRole("table")) {
      expect(table.querySelector("caption")?.textContent?.trim()).toBeTruthy();
      expect(table.querySelectorAll('th[scope="col"]').length).toBeGreaterThan(1);
    }
  });

  it("the contents links are 44px touch targets on touch screens", () => {
    render(<LegalDocument title="Cookie notice" summary={null} version="v" sections={COOKIES_SECTIONS} />);
    const first = COOKIES_SECTIONS[0];
    if (!first) throw new Error("no sections");
    const classes = (screen.getByRole("link", { name: first.heading }).getAttribute("class") ?? "").split(/\s+/);
    expect(classes).toContain("min-h-11");
    expect(classes).toContain("pointer-fine:min-h-9");
  });
});
