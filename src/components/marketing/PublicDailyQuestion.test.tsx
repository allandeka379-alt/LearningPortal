/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const router = vi.hoisted(() => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { feedback, mcqSingle } from "@/components/questions/testing";
import type { PresentedFeedback } from "@/components/questions/types";
import type { ActionResult } from "@/server/lib/errors";
import { PublicDailyQuestion, type PublicDailyAnswer } from "./PublicDailyQuestion";

const DAILY_ID = "0199a1b2-0000-7000-8000-dddddddddddd";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function setup(result: ActionResult<PresentedFeedback>, extra: { signUpLabel?: string } = {}) {
  const action = vi.fn<(input: PublicDailyAnswer) => Promise<ActionResult<PresentedFeedback>>>(async () => result);
  const user = userEvent.setup();
  render(
    <PublicDailyQuestion
      answerId={DAILY_ID}
      question={mcqSingle()}
      heading="Mathematics"
      action={action}
      signUpHref="/register?next=/app/daily"
      signInHref="/login?next=/app/daily"
      {...extra}
    />,
  );
  return { user, action };
}

describe("PublicDailyQuestion", () => {
  it("sends the answer with its id and shows the feedback with a sign-up invitation", async () => {
    const { user, action } = setup({ ok: true, data: feedback({ attemptCompleted: true, nextPosition: null }) });
    const check = screen.getByRole("button", { name: "Check answer" }) as HTMLButtonElement;
    expect(check.disabled).toBe(true);
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(check);
    expect(action).toHaveBeenCalledWith({ id: DAILY_ID, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } });
    expect(await screen.findByRole("region", { name: "Correct" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Sign up to keep a streak/ }).getAttribute("href")).toBe("/register?next=/app/daily");
    expect(screen.getByRole("link", { name: "I have an account" }).getAttribute("href")).toBe("/login?next=/app/daily");
    expect(screen.queryByRole("button", { name: "Check answer" })).toBeNull();
  });

  it("explains the anonymous rate limit and offers an account", async () => {
    const { user } = setup({ ok: false, error: { code: "RATE_LIMITED", message: "Please wait a while." } });
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Take a short break");
    expect(alert.textContent).toContain("Please wait a while.");
    expect(screen.getByRole("link", { name: "Join to keep practising" })).toBeTruthy();
  });

  it("takes a custom sign-up label (topic-page samples)", async () => {
    const { user } = setup({ ok: true, data: feedback({ attemptCompleted: true, nextPosition: null }) }, { signUpLabel: "Practise more Algebra questions" });
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect((await screen.findByRole("link", { name: /Practise more Algebra questions/ })).getAttribute("href")).toBe("/register?next=/app/daily");
    expect(screen.queryByRole("link", { name: /Sign up to keep a streak/ })).toBeNull();
  });

  it("offers a reload when the question was replaced", async () => {
    const { user } = setup({ ok: false, error: { code: "NOT_FOUND", message: "This daily question is no longer available." } });
    await user.click(screen.getByRole("radio", { name: /x = 2/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    await user.click(await screen.findByRole("button", { name: "Reload" }));
    expect(router.refresh).toHaveBeenCalledTimes(1);
  });
});
