import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { SanitizedHtml } from "@/lib/content/types";
import type { AdminFormAction } from "../form-state";
import { ContentWorkflowBar } from "./ContentWorkflowBar";
import { DiffView } from "./DiffView";
import { PreviewSections } from "./PreviewSections";
import { WarningList } from "./WarningList";
import { WorkflowSummary } from "./WorkflowSummary";

/** Server-rendered markup of the editorial components: workflow buttons per status / capability, diffs, warnings. */

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/admin" }));
vi.mock("../step-up-actions", () => ({ confirmPasswordAction: vi.fn() }));

const noop: AdminFormAction<unknown> = async () => null;
const html = (node: ReactNode) => renderToStaticMarkup(<>{node}</>);
const all = { canDraft: true, canReview: true, canPublish: true, canArchive: true };
const actions = { submit: noop, requestChanges: noop, approve: noop, publish: noop, archive: noop, startEdit: noop, discard: noop };

function bar(props: Partial<Parameters<typeof ContentWorkflowBar>[0]>) {
  return html(
    <ContentWorkflowBar
      entityType="LESSON"
      id="l1"
      status="DRAFT"
      draftOfId={null}
      aiGenerated={false}
      isOwnWork={false}
      fourEyes
      capabilities={all}
      actions={actions}
      itemLabel="this lesson"
      {...props}
    />,
  );
}

describe("ContentWorkflowBar", () => {
  it("offers only legal transitions for the viewer", () => {
    expect(bar({ status: "DRAFT" })).toContain("Submit for review");
    const review = bar({ status: "IN_REVIEW" });
    expect(review).toContain("Approve");
    expect(review).toContain("Request changes");
    expect(review).not.toContain("Publish");
    expect(bar({ status: "APPROVED" })).toContain("Publish");
    const published = bar({ status: "PUBLISHED" });
    expect(published).toContain("Edit published version");
    expect(published).toContain("Archive");
    expect(bar({ status: "IN_REVIEW", capabilities: { ...all, canReview: false } })).toBe("");
  });

  it("disables approval of one's own work under four-eyes and explains why", () => {
    const own = bar({ status: "IN_REVIEW", isOwnWork: true });
    expect(own).toMatch(/<button[^>]*disabled=""[^>]*>.*Approve/s);
    expect(own).toContain("four-eyes rule");
    expect(bar({ status: "IN_REVIEW", isOwnWork: true, fourEyes: false })).not.toContain("four-eyes rule");
  });

  it("handles draft copies and pending edits", () => {
    const copy = bar({ status: "DRAFT", draftOfId: "live" });
    expect(copy).toContain("Discard draft copy");
    expect(bar({ status: "APPROVED", draftOfId: "live" })).toContain("Publish changes");
    const pending = bar({ status: "PUBLISHED", pendingDraftId: "copy" });
    expect(pending).not.toContain("Edit published version");
    expect(pending).toContain("Publish or discard the pending draft copy");
  });
});

describe("DiffView / WarningList / PreviewSections / WorkflowSummary", () => {
  it("renders line diffs with text markers and before/after values", () => {
    const out = html(
      <DiffView
        entries={[
          { path: "lesson.title", label: "Title", change: "changed", before: "Old", after: "New <b>" },
          {
            path: "lesson.body",
            label: "Body",
            change: "changed",
            before: "a",
            after: "b",
            lines: [
              { kind: "skip", count: 4 },
              { kind: "del", text: "a" },
              { kind: "add", text: "b" },
            ],
          },
        ]}
      />,
    );
    expect(out).toContain("Title");
    expect(out).toContain("New &lt;b&gt;");
    expect(out).toContain("4 unchanged lines");
    expect(out).toContain("Removed: ");
    expect(out).toContain("Added: ");
    expect(html(<DiffView entries={[]} />)).toContain("No content changes.");
  });

  it("marks blocking warnings and renders previews", () => {
    const warnings = html(
      <WarningList
        warnings={[
          { code: "math-error", message: "Bad LaTeX", line: 4 },
          { code: "math-currency", message: "Money?" },
        ]}
      />,
    );
    expect(warnings).toContain("Maths error");
    expect(warnings).toContain("Must fix");
    expect(warnings).toContain("Line 4");
    expect(html(<WarningList warnings={[]} />)).toBe("");
    expect(html(<PreviewSections sections={[{ label: "Body", html: "<p>Hello</p>" as SanitizedHtml, inline: false, warnings: [] }]} />)).toContain("<p>Hello</p>");
  });

  it("summarises workflow state without inventing who published", () => {
    const out = html(
      <WorkflowSummary
        status="DRAFT"
        revision={2}
        draftOfId="live"
        aiGenerated
        reviewNotes="Fix the units."
        people={{ createdBy: "Rudo", createdAt: new Date("2026-10-01T08:00:00Z"), reviewedBy: null, reviewedAt: null, approvedBy: null, approvedAt: null, publishedAt: null }}
        openFlags={2}
        flagsHref="/admin/flags?entityId=live"
        historyHref="/admin/review/lesson/live/revisions"
        liveHref="/admin/lessons/live"
      />,
    );
    expect(out).toContain("Draft of revision 2");
    expect(out).toContain("AI-generated");
    expect(out).toContain("Reviewer asked for changes");
    expect(out).toContain("2 open flags");
    expect(out).toContain("Created");
    expect(out).not.toContain("Published");
  });
});
