import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ToastProvider } from "@/components/ui/Toast";
import { BoardCountriesForm } from "./BoardCountriesForm";
import { BoardForm, SubjectForm } from "./CatalogueForms";
import { CatalogueStatusBadge, ProvisionalBadge, VerifiedBadge } from "./CurriculumBadges";
import { CurriculumSubnav } from "./CurriculumSubnav";
import { EditableList } from "./EditableList";
import { RouteForm } from "./SyllabusForms";
import { VersionLifecycle, type VersionLifecycleProps } from "./VersionLifecycle";

/**
 * Server-rendered markup of the curriculum admin building blocks (what staff see before hydration): publish
 * checklist and four-eyes notice, live-slug confirmation, the verification field, route paper fields and badges.
 */

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

function lifecycle(overrides: Partial<VersionLifecycleProps> = {}): VersionLifecycleProps {
  return {
    id: "v1",
    status: "DRAFT",
    versionLabel: "2028-2030",
    permissions: { canPublish: true, canMakeCurrent: false, canArchive: false, canDelete: true },
    publishProblems: {},
    publishBlockedByFourEyes: false,
    canDraft: true,
    currentVersionLabel: "2025-2027",
    pinnedEnrollments: 0,
    effectiveFromInFuture: true,
    actions: { publish: noop, makeCurrent: noop, archive: noop, deleteDraft: noop },
    ...overrides,
  };
}

describe("VersionLifecycle", () => {
  it("shows the publish checklist and enables publishing when nothing blocks it", () => {
    const markup = html(<VersionLifecycle {...lifecycle()} />);
    expect(markup).toContain('aria-label="Publish checklist"');
    expect(markup).toContain("Done: </span>Copyright cleared");
    expect(markup).toMatch(/<button[^>]*>.*Publish version/s);
    expect(markup).not.toMatch(/<button[^>]*disabled=""[^>]*>(?:(?!<\/button>).)*Publish version/s);
    expect(markup).toContain("Delete draft");
  });

  it("blocks publishing with open problems or under four-eyes, and explains why", () => {
    const blocked = html(<VersionLifecycle {...lifecycle({ publishProblems: { copyrightStatus: ["Clear the copyright status first."] } })} />);
    expect(blocked).toContain("Not done: </span>Copyright cleared");
    expect(blocked).toContain("Clear the copyright status first.");
    expect(blocked).toMatch(/<button[^>]*disabled=""[^>]*>(?:(?!<\/button>).)*Publish version/s);
    const ownDraft = html(<VersionLifecycle {...lifecycle({ publishBlockedByFourEyes: true })} />);
    expect(ownDraft).toContain("another admin must publish it (four-eyes rule)");
    expect(ownDraft).toMatch(/<button[^>]*disabled=""[^>]*>(?:(?!<\/button>).)*Publish version/s);
    const editor = html(<VersionLifecycle {...lifecycle({ permissions: { canPublish: false, canMakeCurrent: false, canArchive: false, canDelete: true } })} />);
    expect(editor).toContain("An admin publishes syllabus versions");
    expect(editor).not.toContain("Publish version");
  });

  it("offers make-current and archive for published versions, and explains the current one", () => {
    const superseded = html(
      <VersionLifecycle {...lifecycle({ status: "SUPERSEDED", permissions: { canPublish: false, canMakeCurrent: true, canArchive: true, canDelete: false }, pinnedEnrollments: 12 })} />,
    );
    expect(superseded).toContain("Make current");
    expect(superseded).toContain("Archive");
    expect(superseded).not.toContain("Publish checklist");
    const current = html(<VersionLifecycle {...lifecycle({ status: "CURRENT", permissions: { canPublish: false, canMakeCurrent: false, canArchive: false, canDelete: false } })} />);
    expect(current).toContain("This is the current version. To replace it, create a new version");
  });
});

describe("catalogue forms", () => {
  it("asks for an explicit confirmation before renaming a live slug", () => {
    const live = html(<BoardForm action={noop} values={{ id: "b1", slug: "zimsec", shortName: "ZIMSEC" }} countries={[]} live cancelHref="/admin/boards" submitLabel="Save" />);
    expect(live).toContain('name="confirmSlugChange"');
    expect(live).toContain("Rename the live URL");
    expect(live).toContain('value="b1"');
    const hidden = html(<BoardForm action={noop} countries={[]} live={false} cancelHref="/admin/boards" submitLabel="Create" />);
    expect(hidden).not.toContain('name="confirmSlugChange"');
  });

  it("records the official list a subject was verified against", () => {
    const markup = html(
      <SubjectForm
        action={noop}
        values={{ id: "s1", name: "Mathematics", catalogueStatus: "HIDDEN", sourceId: null }}
        qualifications={null}
        categories={[{ value: "c1", label: "Mathematics" }]}
        sources={[{ value: "src1", label: "ZIMSEC subject list (Official syllabus)" }]}
        live={false}
        publicPrefix="/zimsec/o-level/"
        cancelHref="/admin/subjects"
        submitLabel="Save"
      />,
    );
    expect(markup).toContain("Verified against (official list)");
    expect(markup).toContain("Not verified yet");
    expect(markup).not.toContain('name="qualificationId"');
  });
});

describe("route papers and lists", () => {
  it("posts each paper of a route as an indexed row", () => {
    const markup = html(
      <RouteForm
        action={noop}
        syllabusId="v1"
        values={{ id: "r1", code: "CORE", name: "Core", componentLinks: [{ componentId: "p2", isCompulsory: false, choiceGroup: "One of" }] }}
        components={[
          { id: "p1", code: "1", name: "Paper 1" },
          { id: "p2", code: "2", name: "Paper 2" },
        ]}
        gradeSchemes={[]}
        submitLabel="Save route"
      />,
    );
    expect(markup).toContain('name="components.0.componentId" value="p1"');
    expect(markup).toMatch(/name="components.1.included" checked=""/);
    expect(markup).toContain('value="One of"');
    expect(markup).not.toMatch(/name="components.0.included" checked=""/);
  });

  it("renders editable rows as disclosures and honest empty states", () => {
    expect(html(<EditableList rows={[]} empty={<p>No papers yet</p>} />)).toContain("No papers yet");
    const markup = html(<EditableList rows={[{ id: "a", title: "Form 4", editLabel: "Edit Form 4", editor: <form /> }, { id: "b", title: "Read only" }]} empty={null} />);
    expect(markup).toContain("<details");
    expect(markup).toContain("Edit Form 4");
    expect(markup.match(/<details/g)).toHaveLength(1);
  });

  it("marks the current curriculum section and labels statuses in text", () => {
    expect(html(<CurriculumSubnav active="exam-sessions" />)).toMatch(/aria-current="page"[^>]*>Exam sessions/);
    expect(html(<CatalogueStatusBadge status="COMING_SOON" />)).toContain("Coming soon");
    expect(html(<VerifiedBadge verified={false} />)).toContain("Unverified");
    expect(html(<ProvisionalBadge provisional />)).toContain("Provisional dates");
  });
});

describe("BoardCountriesForm (§43 data tables)", () => {
  it("is a captioned table with column headers and a named order box per country", () => {
    const markup = html(
      <BoardCountriesForm
        action={noop}
        boardId="b1"
        countries={[{ id: "zw", name: "Zimbabwe", isoCode: "ZW" }]}
        links={[{ countryId: "zw", isActive: true, sortOrder: 2 }]}
        disabled
      />,
    );
    expect(markup).toMatch(/<table[^>]*>\s*<caption[^>]*>Countries where this board is offered/);
    expect(markup.match(/<th scope="col"/g)).toHaveLength(2);
    expect(markup).toContain('aria-label="Order of this board in Zimbabwe&#x27;s list"');
  });
});
