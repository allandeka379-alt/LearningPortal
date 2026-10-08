import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { BarList, FunnelBars } from "./charts/BarList";
import { CursorPagination } from "./CursorPagination";
import { DateRangeFilter, presetRange, rangeFromParams } from "./DateRangeFilter";
import { ApprovalInfo, KeyValueList } from "./DetailParts";
import { FilterBar } from "./FilterBar";
import type { AdminFormAction } from "./form-state";
import { AiDraftBadge, ContentStatusBadge, StatusBadge } from "./StatusBadge";
import { WorkflowActions } from "./WorkflowActions";

/**
 * Server-rendered markup of the shared admin components (what staff see before hydration): labels, honest empty
 * values, workflow buttons per status, URL-driven filters and pagination.
 */

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/admin" }));
vi.mock("./step-up-actions", () => ({ confirmPasswordAction: vi.fn() }));

const noop: AdminFormAction<unknown> = async () => null;
const html = (node: ReactNode) => renderToStaticMarkup(<>{node}</>);

describe("WorkflowActions", () => {
  const actions = { submit: noop, requestChanges: noop, approve: noop, publish: noop, archive: noop };

  it("offers only the transitions legal from the current status", () => {
    expect(html(<WorkflowActions status="DRAFT" fields={{ id: "q1" }} actions={actions} />)).toContain("Submit for review");
    const review = html(<WorkflowActions status="IN_REVIEW" fields={{ id: "q1" }} actions={actions} />);
    expect(review).toContain("Approve");
    expect(review).toContain("Request changes");
    expect(review).not.toContain("Publish");
    expect(html(<WorkflowActions status="APPROVED" fields={{ id: "q1" }} actions={actions} />)).toContain("Publish");
    expect(html(<WorkflowActions status="PUBLISHED" fields={{ id: "q1" }} actions={actions} />)).toContain("Archive");
    expect(html(<WorkflowActions status="ARCHIVED" fields={{ id: "q1" }} actions={actions} />)).toBe("");
  });

  it("blocks approving your own work under four-eyes, with the reason in text", () => {
    const markup = html(<WorkflowActions status="IN_REVIEW" fields={{ id: "q1" }} actions={actions} isOwnWork />);
    expect(markup).toMatch(/<button[^>]*disabled=""[^>]*>.*Approve/s);
    expect(markup).toContain("another reviewer must approve it");
    expect(html(<WorkflowActions status="IN_REVIEW" fields={{ id: "q1" }} actions={actions} isOwnWork fourEyes={false} />)).not.toMatch(/disabled=""/);
  });

  it("hides transitions the caller didn't pass", () => {
    expect(html(<WorkflowActions status="APPROVED" fields={{ id: "q1" }} actions={{ submit: noop }} />)).toBe("");
  });
});

describe("badges and details", () => {
  it("labels statuses in words, not colour alone", () => {
    expect(html(<ContentStatusBadge status="IN_REVIEW" />)).toContain("In review");
    expect(html(<StatusBadge kind="school" status="PENDING_VERIFICATION" />)).toContain("Pending verification");
    expect(html(<StatusBadge kind="user" status="SOMETHING_NEW" />)).toContain("Something new");
    expect(html(<AiDraftBadge />)).toContain("AI-generated");
  });

  it("shows an em dash for missing values and attributes approvals", () => {
    const markup = html(<KeyValueList items={[{ label: "Email", value: null }, { label: "Hidden", value: "", hideWhenEmpty: true }]} />);
    expect(markup).toContain("Email");
    expect(markup).toContain("—");
    expect(markup).not.toContain("Hidden");
    const approvals = html(<ApprovalInfo steps={[{ label: "Approved", by: "Tendai", at: new Date("2026-10-05T12:00:00Z") }, { label: "Published", by: null, at: null }]} />);
    expect(approvals).toContain("Approved</span> by Tendai");
    expect(approvals).toContain('dateTime="2026-10-05T12:00:00.000Z"');
    expect(approvals).not.toContain("Published");
  });
});

describe("charts (server markup)", () => {
  it("labels every bar with its value and ships a table twin", () => {
    const markup = html(
      <BarList
        measureLabel="Active student-days"
        categoryLabel="Subject"
        items={[
          { key: "a", label: "Mathematics", labelText: "Mathematics", value: 1200 },
          { key: "b", label: "Biology", labelText: "Biology", value: 300 },
        ]}
      />,
    );
    expect(markup).toContain("1,200");
    expect(markup).toContain("Show data table");
    expect(markup).toContain('aria-label="Active student-days"');
    expect(markup).toContain("width:25%");
  });

  it("shows funnel gaps as no data and the share of the previous step", () => {
    const markup = html(
      <FunnelBars
        steps={[
          { key: "u", label: "Users", value: 200 },
          { key: "a", label: "Active", value: 50 },
          { key: "p", label: "Paid", value: null },
        ]}
      />,
    );
    expect(markup).toContain("25% of previous step");
    expect(markup).toContain("No data yet");
  });
});

describe("URL-driven controls", () => {
  it("renders filters as a GET form with a Clear link only when filtered", () => {
    const filtered = html(
      <FilterBar action="/admin/users" search={{ label: "Search", value: "tendai" }} filters={[{ kind: "select", name: "role", label: "Role", options: [{ value: "ADMIN", label: "Admin" }] }]} />,
    );
    expect(filtered).toMatch(/<form[^>]*method="get"/);
    expect(filtered).toMatch(/<form[^>]*action="\/admin\/users"/);
    expect(filtered).toContain('value="tendai"');
    expect(filtered).toContain('href="/admin/users"');
    expect(html(<FilterBar action="/admin/users" search={{ label: "Search" }} />)).not.toContain(">Clear<");
  });

  it("keeps filters in pagination links and never invents totals", () => {
    const markup = html(<CursorPagination path="/admin/users" params={{ q: "x", cursor: "abc" }} nextCursor="def" shownCount={25} />);
    expect(markup).toContain('href="/admin/users?q=x"');
    expect(markup).toContain('href="/admin/users?cursor=def&amp;q=x"');
    expect(markup).toContain("Showing 25 rows");
    expect(html(<CursorPagination path="/admin/users" params={{}} nextCursor={null} shownCount={3} />)).toBe("");
  });

  it("reads date ranges defensively and marks the active preset", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    expect(presetRange(7, now)).toEqual({ from: "2026-09-28", to: "2026-10-04" });
    expect(rangeFromParams("2026-10-09", "2026-10-01", now)).toMatchObject({ from: "2026-09-05", to: "2026-10-04", isDefault: true });
    expect(rangeFromParams("2024-01-01", "2026-01-01", now).isDefault).toBe(true);
    expect(rangeFromParams("2026-09-01", "2026-09-30", now)).toEqual({ from: "2026-09-01", to: "2026-09-30", isDefault: false });
    const markup = html(<DateRangeFilter path="/admin" range={presetRange(7, now)} now={now} />);
    expect(markup).toMatch(/aria-current="true"[^>]*>.*Last 7 days/s);
  });
});
