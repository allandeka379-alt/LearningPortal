import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { AssessmentSettingsForm } from "./assessments/AssessmentSettingsForm";
import { ChecksList, ContentWorkflowPanel, fieldLabel, RevisionHistory, type ContentWorkflowPanelProps } from "./ContentPanels";
import { StudyPackDetailsForm, StudyPackPriceForm } from "./study-packs/StudyPackForms";

/** Server-rendered markup of the shared content panels and forms (what staff see before hydration). */

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/admin" }));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn() }));

const noop: AdminFormAction<unknown> = async () => null;
const html = (node: ReactNode) => renderToStaticMarkup(<ToastProvider>{node}</ToastProvider>);
const workflow = {
  author: "Tendai",
  createdAt: new Date("2026-10-01T08:00:00Z"),
  updatedAt: new Date("2026-10-02T08:00:00Z"),
  reviewedBy: null,
  reviewedAt: null,
  reviewNotes: null,
  approvedBy: null,
  approvedAt: null,
  publishedAt: null,
  archivedAt: null,
};

function panel(overrides: Partial<ContentWorkflowPanelProps> = {}) {
  return html(
    <ContentWorkflowPanel
      id="q1"
      status="DRAFT"
      revision={1}
      aiGenerated={false}
      isDemo={false}
      draftOf={null}
      pendingDraft={null}
      workflow={workflow}
      actions={{ submit: noop, requestChanges: noop, approve: noop, publish: noop, archive: noop }}
      isOwnWork={false}
      fourEyes
      blocked={false}
      itemLabel="this question"
      basePath="/admin/questions"
      neverPublished
      editAction={noop}
      discardAction={noop}
      deleteAction={noop}
      {...overrides}
    />,
  );
}

describe("ContentWorkflowPanel", () => {
  it("offers submit and delete for a never-published draft and warns when blocked", () => {
    const markup = panel({ blocked: true });
    expect(markup).toContain("Submit for review");
    expect(markup).toContain("Delete draft");
    expect(markup).toContain("Fix the problems listed");
    expect(markup).not.toContain("Discard edit");
  });

  it("edits published content through a draft copy and links an edit in progress", () => {
    expect(panel({ status: "PUBLISHED", neverPublished: false })).toContain("Edit");
    const pending = panel({ status: "PUBLISHED", neverPublished: false, pendingDraft: { id: "q2", status: "IN_REVIEW", revision: 2, author: "Rudo" } });
    expect(pending).toContain("Revision 2 is being edited");
    expect(pending).toContain('href="/admin/questions/q2"');
    const copy = panel({ id: "q2", revision: 2, draftOf: { id: "q1", status: "PUBLISHED", revision: 1 }, neverPublished: false });
    expect(copy).toContain("Discard edit");
    expect(copy).toContain("Draft copy");
    expect(copy).not.toContain("Delete draft");
  });

  it("explains four-eyes to the author of an item in review", () => {
    expect(panel({ status: "IN_REVIEW", isOwnWork: true })).toContain("another reviewer must approve it");
  });
});

describe("ChecksList and RevisionHistory", () => {
  it("labels problems by field and lists revisions honestly", () => {
    const markup = html(<ChecksList errors={{ "answerSpec.accepted.0.value": ["Must not be blank."] }} warnings={{ markingMode: ["Manual marking sends every answer for review."] }} />);
    expect(markup).toContain("answer › accepted › 1 › value");
    expect(markup).toContain("Must not be blank.");
    expect(html(<ChecksList errors={{}} warnings={{}} />)).toContain("Nothing blocks review.");
    expect(html(<RevisionHistory revisions={[]} />)).toContain("Not published yet.");
    expect(fieldLabel("parts.0.stem")).toBe("parts › 1 › stem");
  });
});

describe("forms", () => {
  it("render the assessment settings, pack details and price forms", () => {
    const settings = html(
      <AssessmentSettingsForm
        action={noop}
        submitLabel="Save settings"
        values={{ kind: "MOCK_EXAM", assembly: "BLUEPRINT", subjectId: "s1", title: "Mock 1", feedbackTiming: "AFTER_SUBMIT", accessTier: "PREMIUM", copyrightStatus: "OWNED" }}
        hiddenFields={{ id: "a1" }}
        syllabi={[{ value: "syl1", label: "Maths · 2025", subjectId: "s1", status: "CURRENT" }]}
        routes={[]}
        gradeSchemes={[]}
        sources={[]}
        topics={[]}
      />,
    );
    expect(settings).toContain("Syllabus version");
    expect(settings).toContain("Save a syllabus version to limit");
    const details = html(
      <StudyPackDetailsForm
        action={noop}
        submitLabel="Save details"
        values={{ slug: "maths-pack", title: "Maths pack" }}
        hiddenFields={{ id: "p1" }}
        covers={[]}
        entitlements={{ ...NO_ENTITLEMENTS, mockExams: true }}
        pdfCheck={{ allowed: false, emptyScope: false, total: 4, blocked: 1, byType: [] }}
      />,
    );
    expect(details).toContain("What the pack unlocks");
    expect(details).toContain("1 of 4 included items do not permit PDF export");
    expect(html(<StudyPackPriceForm action={noop} studyPackId="p1" countries={[]} />)).toContain("Access period (days)");
  });
});
