/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const { TopicJump } = await import("./TopicJump");

afterEach(() => {
  cleanup();
  push.mockReset();
});

const TOPICS = [
  { id: "t1", label: "1 Number", section: "Paper 1" },
  { id: "t2", label: "2 Algebra", section: "Paper 1" },
  { id: "t3", label: "3 Mechanics", section: null },
];

describe("TopicJump", () => {
  it("opens any chosen topic, in any order", () => {
    render(<TopicJump subjectId="s1" topics={TOPICS} />);
    const select = screen.getByLabelText("Go to any topic") as HTMLSelectElement;
    expect(screen.getByRole("button", { name: "Open" }).hasAttribute("disabled")).toBe(true);
    fireEvent.change(select, { target: { value: "t3" } });
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(push).toHaveBeenCalledWith("/app/subjects/s1/topics/t3");
  });

  it("groups topics by section and hides itself for a single topic", () => {
    const { container, rerender } = render(<TopicJump subjectId="s1" topics={TOPICS} />);
    expect(container.querySelector('optgroup[label="Paper 1"]')?.querySelectorAll("option")).toHaveLength(2);
    rerender(<TopicJump subjectId="s1" topics={TOPICS.slice(0, 1)} />);
    expect(screen.queryByLabelText("Go to any topic")).toBeNull();
  });
});
