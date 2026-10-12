/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { UpgradeButton, UpgradeLink, UpgradeOfferProvider } from "./UpgradeOffer";

/** Upgrade prompts say "Unlock everything for <DB price>" inside the student area (owner decision 2026-10-07). */

afterEach(cleanup);

const OFFER = { href: "/app/billing/checkout?price=p-1", label: "Unlock everything for US$1" };

describe("UpgradeButton / UpgradeLink", () => {
  it("show the provided offer (label and checkout link from the server)", () => {
    render(
      <UpgradeOfferProvider offer={OFFER}>
        <UpgradeButton fallbackHref="/pricing" variant="accent" />
        <UpgradeLink className="underline" />
      </UpgradeOfferProvider>,
    );
    const links = screen.getAllByRole("link", { name: "Unlock everything for US$1" });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link.getAttribute("href")).toBe("/app/billing/checkout?price=p-1");
  });

  it("fall back to the in-app unlock page without an offer (or outside the provider)", () => {
    render(
      <>
        <UpgradeOfferProvider offer={null}>
          <UpgradeButton />
        </UpgradeOfferProvider>
        <UpgradeLink />
      </>,
    );
    const links = screen.getAllByRole("link", { name: "Get full access" });
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/app/unlock", "/app/unlock"]);
  });

  it("keep a prompt's own destination when it is not the general upgrade path (e.g. school tools)", () => {
    render(
      <UpgradeOfferProvider offer={OFFER}>
        <UpgradeButton fallbackHref="/schools" />
        <UpgradeLink fallbackHref="/app/unlock" />
      </UpgradeOfferProvider>,
    );
    expect(screen.getByRole("link", { name: "Learn more" }).getAttribute("href")).toBe("/schools");
    // The unlock page (UPGRADE_PATH) is the general offer: replaced by the one-off checkout.
    expect(screen.getByRole("link", { name: "Unlock everything for US$1" }).getAttribute("href")).toBe("/app/billing/checkout?price=p-1");
  });
});
