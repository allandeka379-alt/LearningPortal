/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }) }));

import { FeedbackPanel } from "@/components/questions/FeedbackPanel";
import { feedback } from "@/components/questions/testing";
import { AskTutorLink } from "./AskTutorLink";

afterEach(() => cleanup());

const QUESTION_ID = "0192f0c4-1c1d-7e7f-8a8b-9c9d0e0f1a1b";
const report = { action: vi.fn(async () => ({ ok: true as const, data: { received: true as const } })), entityType: "QUESTION" as const, entityId: QUESTION_ID };

/**
 * "Ask the tutor" entry points render nothing while AI is switched off (`features.ai`, owner decision 2026-10-07): the
 * flag is read on the server and passed down, so no page links to the tutor while its routes are 404s.
 */
describe("Ask the tutor entry points", () => {
  it("AskTutorLink renders nothing unless AI is switched on", () => {
    const { container } = render(<AskTutorLink enabled={false} questionId={QUESTION_ID} />);
    expect(container.innerHTML).toBe("");
    render(<AskTutorLink enabled questionId={QUESTION_ID} />);
    expect(screen.getByRole("link", { name: /ask the tutor/i }).getAttribute("href")).toBe(`/app/tutor/new?questionId=${QUESTION_ID}`);
  });

  it("FeedbackPanel offers the tutor only when told AI is on (default off), even in a student's own learning context", () => {
    const { unmount } = render(<FeedbackPanel feedback={feedback()} autoFocus={false} announce={false} report={report} />);
    expect(screen.queryByRole("link", { name: /tutor/i })).toBeNull();
    expect(document.body.textContent).not.toMatch(/\bAI\b|tutor/i);
    unmount();

    render(<FeedbackPanel feedback={feedback()} autoFocus={false} announce={false} report={report} askTutor />);
    expect(screen.getByRole("link", { name: /ask the tutor/i }).getAttribute("href")).toBe(`/app/tutor/new?questionId=${QUESTION_ID}`);
  });
});
