/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppliedFilterChips } from "./AppliedFilterChips";
import { SearchEmptyState } from "./SearchEmptyState";
import { SearchResultList, type SearchResultView } from "./SearchResultList";
import { SearchTypeTabs, tabCount, type TypeFacet } from "./SearchTypeTabs";
import { shouldShowSubjectFilter, SubjectFilter } from "./SubjectFilter";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

afterEach(() => cleanup());

const ID = "0f8fad5b-d9cb-469f-a165-70867728950e";

const OPEN: SearchResultView = {
  id: "doc-1",
  entityType: "LESSON",
  entityId: ID,
  title: "Quadratic equations",
  subtitle: "Mathematics · Algebra",
  path: `/app/lessons/${ID}`,
  locked: false,
  lockReason: null,
  snippet: [
    { text: "Solve ", match: false },
    { text: "quadratic", match: true },
    { text: " equations by factorising <b>now</b>", match: false },
  ],
};

const LOCKED: SearchResultView = {
  id: "doc-2",
  entityType: "QUESTION",
  entityId: ID,
  title: "Algebra question (3 marks)",
  subtitle: "Mathematics · Algebra",
  path: `/app/practice?questionId=${ID}`,
  locked: true,
  lockReason: "PREMIUM",
  snippet: null,
};

describe("SearchResultList", () => {
  it("links open results into the app and highlights matches as text (never HTML)", () => {
    render(<SearchResultList items={[OPEN]} label="Search results" />);
    const link = screen.getByRole("link", { name: "Quadratic equations" });
    expect(link.getAttribute("href")).toBe(`/app/lessons/${ID}`);
    const mark = document.querySelector("mark");
    expect(mark?.textContent).toBe("quadratic");
    expect(document.querySelector("b")).toBeNull();
    expect(screen.getByText(/<b>now<\/b>/)).toBeTruthy();
  });

  it("shows locked premium items as teasers with an upgrade link and no content", () => {
    render(<SearchResultList items={[LOCKED]} label="Search results" />);
    const list = screen.getByRole("list", { name: "Search results" });
    expect(within(list).queryByRole("link", { name: "Algebra question (3 marks)" })).toBeNull();
    expect(within(list).getByText("Premium")).toBeTruthy();
    const upgrade = within(list).getByRole("link", { name: /See plans to unlock Algebra question/ });
    expect(upgrade.getAttribute("href")).toBe("/app/billing#plans");
    expect(document.querySelector("mark")).toBeNull();
  });
});

describe("SearchTypeTabs", () => {
  const facets: TypeFacet[] = [
    { type: "LESSON", count: 3 },
    { type: "QUESTION", count: 0 },
    { type: "TOPIC", count: 2 },
    { type: "SUBJECT", count: 1 },
  ];

  it("counts per tab", () => {
    expect(tabCount(facets, null)).toBe(6);
    expect(tabCount(facets, ["TOPIC", "SUBJECT"])).toBe(3);
  });

  it("marks the current tab, links the others with counts, and does not link empty types", () => {
    render(<SearchTypeTabs active="lessons" facets={facets} countsAreLowerBounds={false} hrefFor={(key) => `/app/search?q=x&type=${key}`} />);
    const nav = screen.getByRole("navigation", { name: "Result types" });
    const current = within(nav).getByRole("link", { current: "page" });
    expect(current.textContent).toContain("Lessons");
    expect(current.textContent).toContain("3");
    expect(within(nav).getByRole("link", { name: /^Topics/ }).getAttribute("href")).toBe("/app/search?q=x&type=topics");
    expect(within(nav).queryByRole("link", { name: /^Questions/ })).toBeNull();
    expect(within(nav).getAllByText("(no results)", { exact: false }).length).toBeGreaterThan(0);
  });

  it("shows capped totals as lower bounds", () => {
    render(<SearchTypeTabs active="all" facets={[{ type: "LESSON", count: 1001 }]} countsAreLowerBounds hrefFor={() => "#"} />);
    expect(screen.getByRole("link", { current: "page" }).textContent).toMatch(/1,001\+/);
  });
});

describe("AppliedFilterChips", () => {
  it("renders removable chips as links with explicit accessible names", () => {
    render(
      <AppliedFilterChips
        chips={[
          { key: "a", kindLabel: "Level", label: "O-Level", removeHref: "/app/search?q=maths", detected: true },
          { key: "b", kindLabel: "Subject", label: "Mathematics", removeHref: "/app/search?q=o+level", detected: true },
        ]}
      />,
    );
    const chip = screen.getByRole("link", { name: "Remove filter: Subject Mathematics" });
    expect(chip.getAttribute("href")).toBe("/app/search?q=o+level");
  });

  it("renders nothing without chips", () => {
    const { container } = render(<AppliedFilterChips chips={[]} />);
    expect(container.textContent).toBe("");
  });
});

describe("SearchEmptyState", () => {
  it("offers tips, wider searches and the student's own subjects (no invented content)", () => {
    render(
      <SearchEmptyState
        query="photosynthsis"
        widen={[{ key: "all", label: "Search all subjects", href: "/app/search?q=photosynthsis" }]}
        subjects={[{ key: "s", label: "Biology", href: "/app/subjects/s" }]}
      />,
    );
    expect(screen.getByRole("heading", { name: "No results for “photosynthsis”" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Search all subjects" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Biology" }).getAttribute("href")).toBe("/app/subjects/s");
  });
});

describe("SubjectFilter", () => {
  const MATHS = { id: "11111111-1111-4111-8111-111111111111", name: "Mathematics" };
  const BIOLOGY = { id: "22222222-2222-4222-8222-222222222222", name: "Biology" };
  const hrefFor = (subjectId: string | null) => (subjectId ? `/app/search?q=cells&subjectId=${subjectId}` : "/app/search?q=cells");

  it("links each of the student's subjects and 'All subjects', marking the current one", () => {
    render(<SubjectFilter subjects={[MATHS, BIOLOGY]} activeId={BIOLOGY.id} hrefFor={hrefFor} />);
    const nav = screen.getByRole("navigation", { name: "Filter by subject" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["All subjects", "Mathematics", "Biology"]);
    expect(links[0]?.getAttribute("href")).toBe("/app/search?q=cells");
    expect(links[2]?.getAttribute("aria-current")).toBe("true");
    expect(links[1]?.getAttribute("aria-current")).toBeNull();
  });

  it("is left out when it would not help (one subject, nothing selected)", () => {
    expect(shouldShowSubjectFilter([MATHS], null)).toBe(false);
    expect(shouldShowSubjectFilter([MATHS], MATHS.id)).toBe(true);
    expect(shouldShowSubjectFilter([], BIOLOGY.id)).toBe(false);
    const { container } = render(<SubjectFilter subjects={[MATHS]} activeId={null} hrefFor={hrefFor} />);
    expect(container.textContent).toBe("");
  });
});
