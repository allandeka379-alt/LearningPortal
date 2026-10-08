/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <span role="img" aria-label={alt} data-src={src} />,
}));

import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import type { SanitizedHtml } from "@/lib/content/types";
import { buildComparison } from "@/server/marketing/plan-features";
import type { PricingPlan } from "@/server/marketing/pricing";
import { groupPricesByCurrency } from "@/server/marketing/pricing-core";
import { FaqList } from "./FaqList";
import { SubjectDirectory } from "./home/Curriculum";
import { PricingTeaser } from "./home/PricingTeaser";
import { ComparisonTable } from "./pricing/ComparisonTable";
import { CurrencyPanels } from "./pricing/CurrencyPanels";
import { PlanCard } from "./pricing/PlanCard";
import { Testimonials } from "./Testimonials";

afterEach(cleanup);

function plan(overrides: Partial<PricingPlan> = {}): PricingPlan {
  return {
    id: overrides.id ?? "plan-1",
    code: "STUDENT",
    name: "Student",
    tagline: "Everything for one learner",
    descriptionHtml: null,
    highlights: [],
    audience: "INDIVIDUAL",
    isDefault: false,
    trialDays: 0,
    entitlements: { ...NO_ENTITLEMENTS, lessonAccess: "ALL", mockExams: true, mockExamsPerMonth: null },
    features: ["Every lesson", "Mock exams: unlimited"],
    prices: {},
    ...overrides,
  };
}

const USD_PRICES = groupPricesByCurrency([
  { id: "m", currency: "USD", amountMinor: 500, interval: "MONTH", intervalCount: 1, periodDays: null, perSeat: false, minSeats: null, label: null },
  { id: "y", currency: "USD", amountMinor: 4800, interval: "YEAR", intervalCount: 1, periodDays: null, perSeat: false, minSeats: null, label: "Launch price" },
]);

describe("PlanCard", () => {
  it("shows the headline price, other periods and the plan's features", () => {
    render(<PlanCard plan={plan({ prices: USD_PRICES })} currency="USD" />);
    expect(screen.getByText("US$5")).toBeTruthy();
    expect(screen.getByText("per month")).toBeTruthy();
    expect(screen.getByText("US$48")).toBeTruthy();
    expect(screen.getByText("Every lesson")).toBeTruthy();
  });

  it("never invents a price", () => {
    render(<PlanCard plan={plan()} currency="USD" />);
    expect(screen.getByText("Pricing coming soon")).toBeTruthy();
    cleanup();
    render(<PlanCard plan={plan({ isDefault: true, name: "Free" })} currency="USD" />);
    expect(screen.getAllByText("Free").length).toBeGreaterThan(1);
  });

  it("prefers admin highlights over derived features", () => {
    render(<PlanCard plan={plan({ highlights: ["Admin bullet"] })} currency={null} />);
    expect(screen.getByText("Admin bullet")).toBeTruthy();
    expect(screen.queryByText("Every lesson")).toBeNull();
  });
});

describe("PricingTeaser", () => {
  it("says pricing is coming soon when no plan is configured", () => {
    render(<PricingTeaser plans={[]} currency={null} />);
    expect(screen.getByText("Pricing coming soon")).toBeTruthy();
  });

  it("flags demo prices", () => {
    render(<PricingTeaser plans={[plan({ prices: USD_PRICES })]} currency="USD" demoPrices />);
    expect(screen.getByText("Demo prices")).toBeTruthy();
  });
});

describe("CurrencyPanels", () => {
  it("renders a radio switch and one labelled panel per currency, first selected", () => {
    render(<CurrencyPanels currencies={["USD", "ZWG"]} renderPanel={(currency) => <p>Panel {currency}</p>} />);
    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(radios.map((r) => [r.value, r.checked])).toEqual([
      ["USD", true],
      ["ZWG", false],
    ]);
    expect(screen.getByText("Panel USD")).toBeTruthy();
    expect(screen.getByText("Panel ZWG")).toBeTruthy();
    expect(screen.getByRole("region", { name: /Prices in US Dollar/i }).className).toContain("[data-ci='1']");
  });

  it("shows no switch for a single currency", () => {
    render(<CurrencyPanels currencies={["USD"]} renderPanel={(currency) => <p>Panel {currency}</p>} />);
    expect(screen.queryByRole("radio")).toBeNull();
    expect(screen.getByText("Panel USD")).toBeTruthy();
  });
});

describe("ComparisonTable", () => {
  it("renders a real table with row and column headers and accessible ticks", () => {
    const plans = [
      { id: "free", name: "Free", entitlements: { ...NO_ENTITLEMENTS, dailyQuestion: true } },
      { id: "student", name: "Student", entitlements: { ...NO_ENTITLEMENTS, dailyQuestion: true, mockExams: true, mockExamsPerMonth: 4 } },
    ];
    render(<ComparisonTable plans={plans} groups={buildComparison(plans)} caption="Features" />);
    const table = screen.getByRole("table", { name: "Features" });
    expect(within(table).getByRole("columnheader", { name: "Student" })).toBeTruthy();
    const row = within(table).getByRole("row", { name: /Mock exams/ });
    expect(row.textContent).toContain("Not included");
    expect(row.textContent).toContain("4 a month");
    expect(within(table).getByRole("row", { name: /Daily question/ }).textContent).toContain("Included");
  });
});

describe("FaqList / Testimonials / SubjectDirectory", () => {
  it("renders FAQ entries as native disclosures and nothing when empty", () => {
    const { container } = render(
      <FaqList items={[{ id: "f1", question: "Is there a free plan?", answerHtml: "<p>Yes.</p>" as SanitizedHtml, category: "general", isDemo: true }]} />,
    );
    expect(container.querySelector("details summary")?.textContent).toContain("Is there a free plan?");
    expect(screen.getByText("Demo content")).toBeTruthy();
    cleanup();
    expect(render(<FaqList items={[]} />).container.innerHTML).toBe("");
  });

  it("omits testimonials entirely when there are none", () => {
    expect(render(<Testimonials testimonials={[]} />).container.innerHTML).toBe("");
    cleanup();
    render(<Testimonials testimonials={[{ id: "t1", displayName: "Tariro M.", descriptor: "Parent", quote: "Clear explanations.", photo: null }]} />);
    expect(screen.getByRole("heading", { name: "What students and parents say" })).toBeTruthy();
    expect(screen.getByText("Tariro M.")).toBeTruthy();
  });

  it("links subjects to their public pages and shows an honest empty state", () => {
    render(
      <SubjectDirectory
        categories={[
          {
            category: { id: "c1", slug: "mathematics", name: "Mathematics" },
            subjects: [
              {
                name: "Mathematics",
                offerings: [
                  { subjectId: "s1", label: "ZIMSEC O-Level", href: "/zimsec/o-level/mathematics" },
                  { subjectId: "s2", label: "Cambridge IGCSE", href: null },
                ],
              },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: /ZIMSEC O-Level/ }).getAttribute("href")).toBe("/zimsec/o-level/mathematics");
    expect(screen.queryByRole("link", { name: /Cambridge IGCSE/ })).toBeNull();
    cleanup();
    render(<SubjectDirectory categories={[]} />);
    expect(screen.getByText("Subjects are being prepared")).toBeTruthy();
  });
});
