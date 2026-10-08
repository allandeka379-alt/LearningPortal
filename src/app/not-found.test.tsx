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

import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import NotFound from "./not-found";

afterEach(cleanup);

describe("site-wide 404 (§43 landmarks)", () => {
  it("has the skip link's main target, a banner with the home link and one h1", () => {
    render(<NotFound />);
    const main = screen.getByRole("main");
    expect(main.id).toBe(MAIN_CONTENT_ID);
    expect(main.getAttribute("tabindex")).toBe("-1");
    expect(screen.getByRole("banner")).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Go to the home page" }).getAttribute("href")).toBe("/");
  });
});
