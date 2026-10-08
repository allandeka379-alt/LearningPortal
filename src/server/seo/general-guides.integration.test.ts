import { describe, expect, it } from "vitest";
import { createCurriculumChain } from "../../../tests/factories/curriculum";
import { getGeneralGuidePage } from "./guides";
import { guideCrumbs, guideMetadata, guideScopeLabel, GENERAL_GUIDE_SCOPE_LABEL } from "./page-seo";
import { guideScopeOf } from "./pages";
import { guidePath } from "./routing";
import { listCatalogueSitemapEntries } from "./sitemap";
import { createScopedGuide } from "./testing";

/**
 * General guides (§44): PUBLIC study guides / articles with no board, qualification or subject (allowed by
 * `Lesson_scope_chk`) live at `/guides/[slug]`, which is also where search results and the sitemap link to.
 */

const SITE = { appName: "Dzidza", appUrl: "https://dzidza.test" };

describe("general guides (/guides/[slug])", () => {
  it("loads a PUBLISHED scope-less PUBLIC guide, and nothing else, by slug", async () => {
    const guide = await createScopedGuide({}, "How to plan your revision", "Plan **every** week.");
    const page = await getGeneralGuidePage(guide.slug);
    expect(page).toMatchObject({ path: null, scope: { kind: "general" }, canonicalPath: `/guides/${guide.slug}` });
    expect(page?.lesson.title).toBe("How to plan your revision");
    expect(String(page?.html)).toContain("<strong>every</strong>");
    if (!page) throw new Error("expected a page");
    expect(guideScopeLabel(page)).toBe(GENERAL_GUIDE_SCOPE_LABEL);
    expect(guideCrumbs(page).map((crumb) => crumb.href)).toEqual(["/", `/guides/${guide.slug}`]);
    expect(guideMetadata(page, SITE).alternates?.canonical).toContain(`/guides/${guide.slug}`);

    // A board-scoped guide is not a general guide (it lives under its board).
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const boardGuide = await createScopedGuide({ examBoardId: chain.examBoard.id }, "Board guide", "Board body.");
    expect(await getGeneralGuidePage(boardGuide.slug)).toBeNull();
    expect(await getGeneralGuidePage("Not A Slug")).toBeNull();
    expect(await getGeneralGuidePage("missing-guide-slug-0000")).toBeNull();
  });

  it("is the scope the sitemap and topic pages use for a guide without a scope", async () => {
    expect(guideScopeOf({ subject: null, qualification: null, examBoard: null })).toEqual({ kind: "general" });
    expect(guidePath({ kind: "general" }, "how-to-revise")).toBe("/guides/how-to-revise");
    const guide = await createScopedGuide({}, "Exam-day checklist", "Sleep well.");
    const entries = await listCatalogueSitemapEntries();
    expect(entries.map((entry) => entry.path)).toContain(`/guides/${guide.slug}`);
  });
});
