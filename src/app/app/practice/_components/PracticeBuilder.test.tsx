/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const router = vi.hoisted(() => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import type { ActionResult } from "@/server/lib/errors";
import type { PracticeTopicOption, StartedPractice, StartPracticeInput } from "@/server/practice";
import { PracticeBuilder } from "./PracticeBuilder";

const SUBJECT = { id: "0199a1b2-0000-7000-8000-000000000001", name: "Mathematics" };
const topic = (id: string, name: string, depth: number, parentId: string | null): PracticeTopicOption => ({ id, name, code: null, depth, parentId, hasChildren: false });
const TOPICS = [
  topic("t1", "Algebra", 0, null),
  topic("t1a", "Quadratic equations", 1, "t1"),
  topic("t1b", "Inequalities", 1, "t1"),
  topic("t2", "Geometry", 0, null),
];

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function renderBuilder(startAction: (input: StartPracticeInput) => Promise<ActionResult<StartedPractice>>, overrides: Partial<Parameters<typeof PracticeBuilder>[0]> = {}) {
  const user = userEvent.setup();
  render(
    <PracticeBuilder
      subject={SUBJECT}
      topics={TOPICS}
      defaults={{ topicIds: [], count: 10, difficulty: "ADAPTIVE", mode: "PRACTICE", origin: "BUILDER" }}
      sizes={[5, 10, 20, 30]}
      blocked={false}
      upgradeHref="/pricing"
      startAction={startAction}
      {...overrides}
    />,
  );
  return user;
}

describe("PracticeBuilder", () => {
  it("defaults to adaptive / 10 questions / all topics and starts the session", async () => {
    const startAction = vi.fn<(input: StartPracticeInput) => Promise<ActionResult<StartedPractice>>>(async () => ({
      ok: true,
      data: { attemptId: "0199a1b2-0000-7000-8000-00000000abcd", resumed: false, questionCount: 10, shortfall: 0 },
    }));
    const user = renderBuilder(startAction);
    expect((screen.getByRole("radio", { name: /Adaptive/ }) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByRole("radio", { name: "10" }) as HTMLInputElement).checked).toBe(true);
    await user.click(screen.getByRole("button", { name: "Start practising" }));
    expect(startAction).toHaveBeenCalledWith(
      expect.objectContaining({ subjectId: SUBJECT.id, topicIds: [], count: 10, difficulty: "ADAPTIVE", mode: "PRACTICE", origin: "BUILDER" }),
    );
    expect(startAction.mock.calls[0]?.[0]?.idempotencyKey).toMatch(/^[A-Za-z0-9_-]{8,64}$/);
    expect(router.push).toHaveBeenCalledWith("/app/practice/0199a1b2-0000-7000-8000-00000000abcd");
  });

  it("topics, size and difficulty choices are sent; subtopics sit under their topic", async () => {
    const startAction = vi.fn(async (): Promise<ActionResult<StartedPractice>> => ({
      ok: true,
      data: { attemptId: "0199a1b2-0000-7000-8000-00000000abce", resumed: false, questionCount: 4, shortfall: 16 },
    }));
    const user = renderBuilder(startAction);
    expect(screen.getByText("2 subtopics")).toBeTruthy();
    await user.click(screen.getByRole("checkbox", { name: "Geometry" }));
    await user.click(screen.getByText("2 subtopics"));
    await user.click(screen.getByRole("checkbox", { name: "Inequalities" }));
    expect(screen.getByText("2 topics selected")).toBeTruthy();
    await user.click(screen.getByRole("radio", { name: "20" }));
    await user.click(screen.getByRole("radio", { name: /Hard/ }));
    await user.click(screen.getByRole("button", { name: "Start practising" }));
    expect(startAction).toHaveBeenCalledWith(expect.objectContaining({ topicIds: ["t2", "t1b"], count: 20, difficulty: "HARD" }));
    expect(router.push).toHaveBeenCalledWith("/app/practice/0199a1b2-0000-7000-8000-00000000abce?requested=20");
  });

  it("a used-up allowance gets a friendly upgrade prompt, not a raw error", async () => {
    const startAction = vi.fn(async (): Promise<ActionResult<StartedPractice>> => ({
      ok: false,
      error: { code: "QUOTA_EXCEEDED", message: "You've reached your plan's limit of 20 practice questions today." },
    }));
    const user = renderBuilder(startAction);
    await user.click(screen.getByRole("button", { name: "Start practising" }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("You've reached today's practice limit");
    expect(screen.getByRole("link", { name: "Get full access" }).getAttribute("href")).toBe("/app/unlock");
    expect(router.push).not.toHaveBeenCalled();
  });

  it("is disabled when the allowance is used up; re-test wording and deep-link defaults", () => {
    renderBuilder(vi.fn(), {
      blocked: true,
      defaults: { topicIds: ["t1a", "unknown"], count: 20, difficulty: "MEDIUM", mode: "RETEST", origin: "RETEST" },
    });
    expect((screen.getByRole("button", { name: "Start re-test" }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole("checkbox", { name: "Quadratic equations" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByText("1 topic selected")).toBeTruthy();
    expect((screen.getByRole("radio", { name: /Medium/ }) as HTMLInputElement).checked).toBe(true);
  });
});
