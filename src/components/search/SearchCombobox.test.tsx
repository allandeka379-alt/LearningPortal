/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SuggestionView } from "./config";
import { HeaderSearch } from "./HeaderSearch";
import { SearchCombobox, type FetchSuggestions } from "./SearchCombobox";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh: vi.fn() }) }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const TOPIC_ID = "0f8fad5b-d9cb-469f-a165-70867728950e";
const LESSON_ID = "7c9e6679-7425-40de-944b-e07fc1f90ae7";

const SUGGESTIONS: SuggestionView[] = [
  { title: "Quadratic equations", entityType: "TOPIC", entityId: TOPIC_ID, subtitle: "ZIMSEC O-Level · Mathematics", path: "/zimsec/o-level/mathematics/quadratic-equations", accessTier: "PUBLIC" },
  { title: "Solving quadratics by factorising", entityType: "LESSON", entityId: LESSON_ID, subtitle: "Mathematics · Algebra", path: `/app/lessons/${LESSON_ID}`, accessTier: "PREMIUM" },
];

async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

function setup(fetcher: FetchSuggestions = vi.fn(async () => SUGGESTIONS)) {
  const navigate = vi.fn();
  render(<SearchCombobox fetchSuggestions={fetcher} navigate={navigate} label="Search" hiddenFields={{ type: "lessons" }} />);
  const input = screen.getByRole("combobox", { name: "Search" });
  return { input, navigate, fetcher };
}

function type(input: HTMLElement, value: string) {
  fireEvent.change(input, { target: { value } });
}

beforeEach(() => {
  vi.useFakeTimers();
  push.mockReset();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("SearchCombobox", () => {
  it("is a labelled combobox in a GET search form that starts collapsed", () => {
    const { input } = setup();
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect(input.getAttribute("aria-autocomplete")).toBe("list");
    const listbox = document.getElementById(input.getAttribute("aria-controls") ?? "");
    expect(listbox?.getAttribute("role")).toBe("listbox");
    expect(listbox?.hidden).toBe(true);
    const form = screen.getByRole("search");
    expect(form.getAttribute("action")).toBe("/app/search");
    expect(form.getAttribute("method")).toBe("get");
    expect((input as HTMLInputElement).name).toBe("q");
  });

  it("debounces: one request after typing stops, none below two characters", async () => {
    const fetcher = vi.fn<FetchSuggestions>(async () => SUGGESTIONS);
    const { input } = setup(fetcher);
    type(input, "q");
    await advance(500);
    expect(fetcher).not.toHaveBeenCalled();
    type(input, "qu");
    await advance(100);
    type(input, "qua");
    await advance(100);
    type(input, "quad");
    expect(fetcher).not.toHaveBeenCalled();
    await advance(300);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher.mock.calls[0]?.[0]).toBe("quad");
    expect(input.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getByRole("status").textContent).toMatch(/2 suggestions/);
    // Premium items are marked for screen readers, not hidden.
    expect(screen.getAllByRole("option")[1]?.textContent).toMatch(/\(premium\)/);
  });

  it("reuses answers for text it has already asked about", async () => {
    const fetcher = vi.fn(async () => SUGGESTIONS);
    const { input } = setup(fetcher);
    type(input, "quad");
    await advance(300);
    type(input, "quadr");
    await advance(300);
    type(input, "quad");
    await advance(300);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("moves through options with the arrow keys (aria-activedescendant) and opens the active one on Enter", async () => {
    const { input, navigate } = setup();
    type(input, "quad");
    await advance(300);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const options = screen.getAllByRole("option");
    expect(input.getAttribute("aria-activedescendant")).toBe(options[0]?.id);
    expect(options[0]?.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-activedescendant")).toBe(options[1]?.id);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-activedescendant")).toBe(options[0]?.id); // wraps
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.getAttribute("aria-activedescendant")).toBe(options[1]?.id);
    fireEvent.keyDown(input, { key: "Enter" });
    // An in-app lesson path is used as-is.
    expect(navigate).toHaveBeenCalledWith(`/app/lessons/${LESSON_ID}`);
    expect(input.getAttribute("aria-expanded")).toBe("false");
  });

  it("opens topics through the in-app resolver and supports clicking an option", async () => {
    const { input, navigate } = setup();
    type(input, "quad");
    await advance(300);
    fireEvent.click(screen.getAllByRole("option")[0] as HTMLElement);
    const href = navigate.mock.calls[0]?.[0] as string;
    expect(href.startsWith("/app/search/open?")).toBe(true);
    const params = new URLSearchParams(href.split("?")[1]);
    expect(params.get("type")).toBe("TOPIC");
    expect(params.get("id")).toBe(TOPIC_ID);
    expect(params.get("fallback")).toBe("/zimsec/o-level/mathematics/quadratic-equations");
  });

  it("Enter without an active option runs the full search, keeping the hidden fields", async () => {
    const { input, navigate } = setup();
    type(input, "  photosynthesis  ");
    fireEvent.submit(screen.getByRole("search"));
    expect(navigate).toHaveBeenCalledWith("/app/search?q=photosynthesis&type=lessons");
  });

  it("Escape closes the list, then clears the field", async () => {
    const { input } = setup();
    type(input, "quad");
    await advance(300);
    expect(input.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect((input as HTMLInputElement).value).toBe("quad");
    fireEvent.keyDown(input, { key: "Escape" });
    expect((input as HTMLInputElement).value).toBe("");
  });

  it("stays usable when suggestions fail (offline, rate limited)", async () => {
    const fetcher = vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    });
    const { input, navigate } = setup(fetcher);
    type(input, "quad");
    await advance(300);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByRole("status").textContent).toMatch(/No suggestions/);
    fireEvent.submit(screen.getByRole("search"));
    expect(navigate).toHaveBeenCalledWith("/app/search?q=quad&type=lessons");
  });

  it("uses the router when no navigation hook is given", async () => {
    render(<SearchCombobox fetchSuggestions={async () => []} label="Search" />);
    const input = screen.getByRole("combobox", { name: "Search" });
    fireEvent.change(input, { target: { value: "algebra" } });
    fireEvent.submit(screen.getByRole("search"));
    expect(push).toHaveBeenCalledWith("/app/search?q=algebra");
  });
});

describe("HeaderSearch", () => {
  it("gives phones a labelled 44px link to the search page and wide screens the autocomplete field", () => {
    render(<HeaderSearch />);
    const link = screen.getByRole("link", { name: "Search" });
    expect(link.getAttribute("href")).toBe("/app/search");
    expect(link.className).toMatch(/lg:hidden/);
    const field = screen.getByRole("combobox", { name: "Search" });
    expect(field.closest("form")?.className).toMatch(/hidden/);
    expect(field.closest("form")?.className).toMatch(/lg:block/);
  });
});
