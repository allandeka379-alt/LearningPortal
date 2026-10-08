import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { PresentedQuestion, PresentedReveal } from "@/components/questions/types";
import type { SanitizedHtml } from "@/lib/content/types";
import type { ExamSessionView, TopicOutlineNode } from "@/server/seo/pages";
import { ExamSessionList } from "./ExamSessionList";
import { JsonLd } from "./JsonLd";
import { LessonPreviewList } from "./LessonPreviewList";
import { SampleQuestionCard } from "./SampleQuestionCard";
import { TopicOutline } from "./TopicOutline";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const html = (value: string) => value as SanitizedHtml;
const render = (element: ReactElement) => renderToStaticMarkup(element);

function node(partial: Partial<TopicOutlineNode> & Pick<TopicOutlineNode, "id" | "name" | "kind">): TopicOutlineNode {
  return { code: null, href: `/b/q/s/${partial.id}`, summary: null, isOptional: false, children: [], ...partial };
}

describe("TopicOutline", () => {
  it("groups topics under sections with the next heading level and flattens deeper nodes into subtopic links", () => {
    const out = render(
      <TopicOutline
        nodes={[
          node({
            id: "sec",
            kind: "SECTION",
            name: "Pure Mathematics 1",
            code: "P1",
            children: [
              node({
                id: "alg",
                kind: "TOPIC",
                name: "Algebra",
                code: "1",
                summary: "Expressions and equations.",
                isOptional: true,
                children: [node({ id: "quad", kind: "SUBTOPIC", name: "Quadratics", code: "1.1", children: [node({ id: "deep", kind: "SUBTOPIC", name: "Completing the square" })] })],
              }),
            ],
          }),
          node({ id: "stats", kind: "TOPIC", name: "Statistics" }),
        ]}
      />,
    );
    expect(out).toMatch(/<h3[^>]*>.*Pure Mathematics 1.*<\/h3>/);
    expect(out).toMatch(/<h4[^>]*>.*Algebra.*<\/h4>/);
    expect(out).toMatch(/<h3[^>]*>.*Statistics.*<\/h3>/);
    expect(out).toContain("Optional");
    expect(out).toContain("Expressions and equations.");
    expect(out).toContain('href="/b/q/s/quad"');
    expect(out).toContain('href="/b/q/s/deep"');
    expect(out).toContain("1.1 Quadratics");
  });
});

describe("SampleQuestionCard", () => {
  const question: PresentedQuestion = {
    id: "q1",
    type: "MULTIPLE_CHOICE",
    markingMode: "AUTO",
    marks: 1,
    partLabel: null,
    stemHtml: html("<p>Which value is even?</p>"),
    interaction: {
      type: "MULTIPLE_CHOICE",
      selectMode: "single",
      // Shuffled order: keys are stable ids, letters follow the shown position.
      options: [
        { key: "C", html: html("x = 3"), image: null },
        { key: "A", html: html("x = 2"), image: null },
      ],
    },
    hintCount: 1,
    calculatorAllowed: null,
    estimatedSeconds: null,
    parts: [],
  };
  const reveal: PresentedReveal = {
    questionId: "q1",
    partLabel: null,
    correctAnswerHtml: html("A"),
    explanationHtml: html("<p>Because 2 is even.</p>"),
    workedSolutionHtml: null,
    conceptHtml: null,
    options: [
      { key: "A", isCorrect: true, rationaleHtml: null },
      { key: "C", isCorrect: false, rationaleHtml: null },
    ],
    markScheme: null,
    modelAnswerHtml: null,
    methodMarks: [],
    partResult: null,
    parts: [],
  };

  it("shows the question read-only with the answer behind a native disclosure", () => {
    const out = render(<SampleQuestionCard sample={{ question, reveal, difficulty: 2, isExamStyle: true }} heading="Sample question" />);
    expect(out).toContain("Which value is even?");
    expect(out).toContain("Choose one answer");
    expect(out).toMatch(/<details[^>]*>\s*<summary/);
    expect(out).toContain("Show answer and explanation");
    expect(out).toContain("Exam style");
    // The correct option (key A) is shown in second position, so it is labelled B.
    expect(out).toMatch(/Correct answer<\/p>.*B\.<\/span>.*x = 2/s);
    expect(out).toContain("Because 2 is even.");
    // No form controls: nothing to submit on a static page.
    expect(out).not.toMatch(/<input|<form|<button/);
  });
});

describe("ExamSessionList", () => {
  const session: ExamSessionView = {
    id: "s1",
    name: "November 2027",
    dateLabel: "20 Oct – 30 Nov 2027",
    startsOn: "2027-10-20",
    endsOn: "2027-11-30",
    isProvisional: true,
    isDemo: true,
    sourceUrl: "https://example.org/timetable",
  };

  it("labels provisional and demo sessions and links the official timetable", () => {
    const out = render(<ExamSessionList sessions={[session]} label="ZIMSEC O-Level" />);
    expect(out).toContain("Provisional dates");
    expect(out).toContain("Demo data");
    expect(out).toContain('href="https://example.org/timetable"');
    expect(out).toContain('rel="noopener noreferrer"');
    expect(out).toContain('<time dateTime="2027-10-20">');
  });

  it("says so honestly when nothing is published", () => {
    expect(render(<ExamSessionList sessions={[]} label="ZIMSEC O-Level" />)).toContain("No upcoming ZIMSEC O-Level exam sessions have been published yet.");
  });
});

describe("LessonPreviewList", () => {
  it("shows excerpts for free previews and only titles with lock reasons for the rest", () => {
    const out = render(
      <LessonPreviewList
        previews={[{ id: "p", title: "Factorising", kind: "LESSON", excerpt: "Find two numbers…", estimatedMinutes: 8, href: "/b/q/s/guides/factorising" }]}
        lessons={[
          { id: "f", title: "Completing the square", kind: "LESSON", estimatedMinutes: 10, accessTier: "FREE", lockReason: "SIGN_IN", href: null },
          { id: "m", title: "The formula", kind: "LESSON", estimatedMinutes: 12, accessTier: "PREMIUM", lockReason: "PREMIUM", href: null },
        ]}
        total={5}
        signUpHref="/register"
        pricingHref="/pricing"
      />,
    );
    expect(out).toContain("Free preview");
    expect(out).toContain("Find two numbers…");
    expect(out).toContain('href="/b/q/s/guides/factorising"');
    expect(out).toContain("Free with an account");
    expect(out).toContain("Premium");
    expect(out).toContain("2 more lessons in this topic.");
  });
});

describe("JsonLd", () => {
  it("renders script-safe JSON", () => {
    const out = render(<JsonLd data={{ "@type": "Thing", name: "</script><script>alert(1)</script>" }} />);
    expect(out).toContain('<script type="application/ld+json">');
    expect(out).not.toContain("</script><script>");
    expect(out).toContain("\\u003c/script\\u003e");
  });
});
