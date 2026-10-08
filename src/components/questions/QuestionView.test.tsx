/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { questionResponseSchema } from "@/lib/questions";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element -- test double for next/image
  default: ({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) => <img src={src} alt={alt} width={width} height={height} />,
}));

import { QuestionView } from "./QuestionView";
import {
  calculationQuestion,
  diagramQuestion,
  essayQuestion,
  feedback,
  fillQuestion,
  matchingQuestion,
  mcqMultiple,
  mcqSingle,
  numericalQuestion,
  reveal,
  shortAnswerQuestion,
  structuredQuestion,
  trueFalseQuestion,
} from "./testing";
import type { PresentedQuestion, QuestionResponse } from "./types";

afterEach(cleanup);

// jsdom has no CSS.escape; user-event uses it to walk radio groups with the arrow keys.
if (typeof globalThis.CSS === "undefined" || typeof globalThis.CSS.escape !== "function") {
  Object.defineProperty(globalThis, "CSS", {
    configurable: true,
    value: { ...(globalThis.CSS ?? {}), escape: (value: string) => value.replace(/[^A-Za-z0-9_-]/g, (ch) => `\\${ch}`) },
  });
}

type HarnessProps = Omit<ComponentProps<typeof QuestionView>, "response" | "onChange"> & {
  initial?: QuestionResponse | null;
  onChange?: (value: QuestionResponse | null) => void;
};

/** Owns the response like the real owners (AnswerRunner, exam UI) do. */
function Harness({ initial = null, onChange, ...props }: HarnessProps) {
  const [response, setResponse] = useState<QuestionResponse | null>(initial);
  return (
    <QuestionView
      {...props}
      response={response}
      onChange={(next) => {
        setResponse(next);
        onChange?.(next);
      }}
    />
  );
}

function setup(question: PresentedQuestion, props: Partial<HarnessProps> = {}) {
  const onChange = vi.fn<(value: QuestionResponse | null) => void>();
  const user = userEvent.setup();
  render(<Harness question={question} mode="practice" onChange={onChange} {...props} />);
  const last = () => onChange.mock.calls.at(-1)?.[0] ?? null;
  return { user, onChange, last };
}

/** The last emitted response, asserted to match the stored-response schema exactly. */
function valid(value: QuestionResponse | null): QuestionResponse {
  expect(value).not.toBeNull();
  expect(questionResponseSchema.parse(value)).toEqual(value);
  return value as QuestionResponse;
}

describe("QuestionView shell", () => {
  it("renders the heading, the stem and the mark allocation", () => {
    render(<QuestionView question={mcqSingle()} mode="practice" response={null} onChange={() => {}} heading="Question 3 of 20" />);
    const region = screen.getByRole("region", { name: "Question 3 of 20" });
    expect(within(region).getByRole("heading", { level: 2, name: "Question 3 of 20" })).toBeTruthy();
    expect(within(region).getByText("Original test stem.")).toBeTruthy();
    expect(within(region).getByText("[1 mark]")).toBeTruthy();
    expect(within(region).getByText("1 mark", { selector: ".sr-only" })).toBeTruthy();
  });
});

describe("MULTIPLE_CHOICE", () => {
  it("single answer: a labelled radio group that serialises one key", async () => {
    const { user, last } = setup(mcqSingle());
    const group = screen.getByRole("group", { name: "Choose one answer" });
    expect(within(group).getAllByRole("radio")).toHaveLength(3);
    await user.click(screen.getByRole("radio", { name: /x = -2/ }));
    expect(valid(last())).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["B"] });
  });

  it("single answer is keyboard operable (Tab to the group, arrows to move, selection follows)", async () => {
    const { user, last } = setup(mcqSingle());
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: /x = 2/ }));
    await user.keyboard(" ");
    expect(valid(last())).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["A"] });
    await user.keyboard("{ArrowDown}");
    expect(valid(last())).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["B"] });
  });

  it("multiple answers: 'Select all that apply' checkboxes; keys in display order; none = no answer", async () => {
    const { user, last } = setup(mcqMultiple());
    expect(screen.getByRole("group", { name: "Select all that apply" })).toBeTruthy();
    await user.click(screen.getByRole("checkbox", { name: /Argon/ }));
    await user.click(screen.getByRole("checkbox", { name: /Oxygen/ }));
    expect(valid(last())).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["A", "C"] });
    await user.click(screen.getByRole("checkbox", { name: /Argon/ }));
    await user.click(screen.getByRole("checkbox", { name: /Oxygen/ }));
    expect(last()).toBeNull();
  });

  it("review mode: disabled, with the correct option and the student's wrong choice labelled in text", () => {
    const fb = feedback({
      outcome: "incorrect",
      marksAwarded: 0,
      reveal: reveal({ options: [{ key: "A", isCorrect: true, rationaleHtml: null }, { key: "B", isCorrect: false, rationaleHtml: null }, { key: "C", isCorrect: false, rationaleHtml: null }] }),
    });
    render(<QuestionView question={mcqSingle()} mode="review" response={{ type: "MULTIPLE_CHOICE", optionKeys: ["B"] }} feedback={fb} />);
    for (const radio of screen.getAllByRole("radio")) expect((radio as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByRole("radio", { name: /x = -2/ }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByText("Correct answer")).toBeTruthy();
    expect(screen.getByText("Your answer")).toBeTruthy();
    expect(screen.getByText("[0/1 mark]")).toBeTruthy();
  });

  it("exam mode never shows answer annotations even when feedback is passed", () => {
    const fb = feedback({ reveal: reveal({ options: [{ key: "A", isCorrect: true, rationaleHtml: null }] }) });
    render(<QuestionView question={mcqSingle()} mode="exam" response={null} onChange={() => {}} feedback={fb} />);
    expect(screen.queryByText("Correct answer")).toBeNull();
    expect(screen.getByText("[1 mark]")).toBeTruthy();
  });
});

describe("TRUE_FALSE", () => {
  it("serialises a boolean", async () => {
    const { user, last } = setup(trueFalseQuestion());
    await user.click(screen.getByRole("radio", { name: "False" }));
    expect(valid(last())).toEqual({ type: "TRUE_FALSE", value: false });
    await user.click(screen.getByRole("radio", { name: "True" }));
    expect(valid(last())).toEqual({ type: "TRUE_FALSE", value: true });
  });

  it("yes / no wording", () => {
    setup(trueFalseQuestion("yes_no"));
    expect(screen.getByRole("radio", { name: "Yes" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "No" })).toBeTruthy();
  });
});

describe("SHORT_ANSWER", () => {
  it("a labelled text box with the length limit; clearing it means no answer", async () => {
    const { user, last } = setup(shortAnswerQuestion());
    const box = screen.getByRole("textbox", { name: "Your answer" }) as HTMLInputElement;
    expect(box.maxLength).toBe(40);
    expect(box.getAttribute("spellcheck")).toBe("false");
    await user.type(box, "Oxygen");
    expect(valid(last())).toEqual({ type: "SHORT_ANSWER", text: "Oxygen" });
    await user.clear(box);
    expect(last()).toBeNull();
  });

  it("is read-only when disabled", () => {
    render(<QuestionView question={shortAnswerQuestion()} mode="practice" response={{ type: "SHORT_ANSWER", text: "x" }} onChange={() => {}} disabled />);
    expect((screen.getByRole("textbox", { name: "Your answer" }) as HTMLInputElement).disabled).toBe(true);
  });
});

describe("NUMERICAL / CALCULATION", () => {
  it("decimal keypad, prefix and unit hint; the shown unit is the answer's unit", async () => {
    const { user, last } = setup(numericalQuestion({ answerPrefix: "x =", unitHint: "cm" }));
    const box = screen.getByRole("textbox", { name: "Your answer" });
    expect(box.getAttribute("inputmode")).toBe("decimal");
    expect(screen.getByText("Complete: x = … Answer in cm.")).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: /Unit/ })).toBeNull();
    await user.type(box, "5");
    expect(valid(last())).toEqual({ type: "NUMERICAL", value: "5", unit: "cm" });
  });

  it("offers the full keyboard for minus signs and powers of ten", async () => {
    const { user } = setup(numericalQuestion());
    const box = screen.getByRole("textbox", { name: "Your answer" });
    await user.click(screen.getByRole("button", { name: /Use the full keyboard/ }));
    expect(box.getAttribute("inputmode")).toBe("text");
    // The label names the next action, so the button is not a toggle (no contradictory "pressed" state).
    const back = screen.getByRole("button", { name: "Use the number keypad" });
    expect(back.hasAttribute("aria-pressed")).toBe(false);
    expect(back.getAttribute("aria-controls")).toBe(box.id);
    await user.click(back);
    expect(box.getAttribute("inputmode")).toBe("decimal");
  });

  it("an optional unit box when no unit is shown; a unit typed first is kept", async () => {
    const { user, last } = setup(numericalQuestion());
    await user.type(screen.getByRole("textbox", { name: /^Unit/ }), "m");
    expect(last()).toBeNull();
    await user.type(screen.getByRole("textbox", { name: "Your answer" }), "-1.5");
    expect(valid(last())).toEqual({ type: "NUMERICAL", value: "-1.5", unit: "m" });
  });

  it("calculation: working first, then the final answer", async () => {
    const { user, last } = setup(calculationQuestion());
    await user.type(screen.getByRole("textbox", { name: /Working/ }), "150 / 2.5 = 60");
    await user.type(screen.getByRole("textbox", { name: "Final answer" }), "60");
    expect(valid(last())).toEqual({ type: "CALCULATION", value: "60", unit: "km/h", working: "150 / 2.5 = 60" });
  });
});

describe("MATCHING", () => {
  it("one labelled select per item (no drag and drop)", async () => {
    const { user, last } = setup(matchingQuestion());
    const mito = screen.getByRole("combobox", { name: /Mitochondrion/ });
    expect(within(mito).getByRole("option", { name: "B. Respiration" })).toBeTruthy();
    await user.selectOptions(mito, "r1");
    await user.selectOptions(screen.getByRole("combobox", { name: /Ribosome/ }), "r2");
    expect(valid(last())).toEqual({ type: "MATCHING", pairs: [{ leftId: "l1", rightId: "r1" }, { leftId: "l2", rightId: "r2" }] });
    await user.selectOptions(mito, "");
    expect(valid(last())).toEqual({ type: "MATCHING", pairs: [{ leftId: "l2", rightId: "r2" }] });
  });
});

describe("FILL_IN_THE_BLANK", () => {
  it("inline controls labelled 'Blank n of N' with the right keyboard per blank", async () => {
    const { user, last } = setup(fillQuestion());
    expect(screen.getByRole("group", { name: "Fill in the 3 blanks" })).toBeTruthy();
    const first = screen.getByRole("textbox", { name: "Blank 1 of 3" });
    const second = screen.getByRole("textbox", { name: "Blank 2 of 3" });
    expect(second.getAttribute("inputmode")).toBe("decimal");
    await user.type(second, "100");
    await user.type(first, "Harare");
    await user.selectOptions(screen.getByRole("combobox", { name: "Blank 3 of 3" }), "solid");
    expect(valid(last())).toEqual({
      type: "FILL_IN_THE_BLANK",
      blanks: [
        { blankId: "b1", text: "Harare" },
        { blankId: "b2", text: "100" },
        { blankId: "b3", text: "solid" },
      ],
    });
    expect(screen.getByText("The capital of Zimbabwe is")).toBeTruthy();
  });

  it("keyboard order follows the sentence", async () => {
    const { user } = setup(fillQuestion());
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Blank 1 of 3" }));
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Blank 2 of 3" }));
  });
});

describe("DIAGRAM_LABELLING", () => {
  it("numbered markers move focus to their label control; word-bank labels serialise label ids", async () => {
    const { user, last } = setup(diagramQuestion());
    expect(screen.getByRole("img", { name: "A plant cell with two numbered parts" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Label 2: go to its answer box" }));
    const second = screen.getByRole("combobox", { name: "Label 2" });
    expect(document.activeElement).toBe(second);
    await user.selectOptions(second, "L2");
    await user.selectOptions(screen.getByRole("combobox", { name: "Label 1" }), "L1");
    expect(valid(last())).toEqual({ type: "DIAGRAM_LABELLING", labels: [{ targetId: "h1", labelId: "L1" }, { targetId: "h2", labelId: "L2" }] });
  });

  it("free-text labelling and a read-only review without interactive markers", async () => {
    const { user, last } = setup(diagramQuestion(false));
    await user.type(screen.getByRole("textbox", { name: "Label 1" }), "nucleus");
    expect(valid(last())).toEqual({ type: "DIAGRAM_LABELLING", labels: [{ targetId: "h1", text: "nucleus" }] });
    cleanup();
    render(<QuestionView question={diagramQuestion()} mode="review" response={null} />);
    expect(screen.queryByRole("button", { name: /go to its answer box/ })).toBeNull();
    expect((screen.getByRole("combobox", { name: "Label 1" }) as HTMLSelectElement).disabled).toBe(true);
  });
});

describe("STRUCTURED", () => {
  it("renders each part with its label, marks and input, combined into one response", async () => {
    const { question, partA, partB } = structuredQuestion();
    const { user, last } = setup(question);
    const a = screen.getByRole("region", { name: "(a)" });
    const b = screen.getByRole("region", { name: "(b)" });
    expect(within(b).getByText("[2 marks]")).toBeTruthy();
    expect(within(a).getByRole("heading", { level: 3, name: "(a)" })).toBeTruthy();
    await user.type(within(b).getByRole("textbox", { name: "Your answer" }), "5");
    await user.type(within(a).getByRole("textbox", { name: "Your answer" }), "x(x+3)");
    expect(valid(last())).toEqual({
      type: "STRUCTURED",
      parts: [
        { partId: partA.id, response: { type: "SHORT_ANSWER", text: "x(x+3)" } },
        { partId: partB.id, response: { type: "NUMERICAL", value: "5" } },
      ],
    });
  });

  it("links the owner's answer error to every part's control, after the part's own stem", () => {
    const { question } = structuredQuestion();
    setup(question, { errorId: "answer-error" });
    for (const name of ["(a)", "(b)"]) {
      const box = within(screen.getByRole("region", { name })).getByRole("textbox", { name: "Your answer" });
      const ids = (box.getAttribute("aria-describedby") ?? "").split(" ");
      expect(ids).toContain("answer-error");
      expect(ids.indexOf("answer-error")).toBeGreaterThan(0);
    }
  });

  it("shows part marks in review", () => {
    const { question, partB } = structuredQuestion();
    const fb = feedback({
      outcome: "partial",
      marksAwarded: 1,
      marksAvailable: 3,
      reveal: reveal({ parts: [reveal({ questionId: partB.id, partResult: { awarded: 0, max: 2, correct: false, pending: false } })] }),
    });
    render(<QuestionView question={question} mode="review" response={null} feedback={fb} />);
    expect(within(screen.getByRole("region", { name: "(b)" })).getByText("[0/2 marks]")).toBeTruthy();
  });
});

describe("ESSAY / EXTENDED_RESPONSE", () => {
  it("counts words against the limit and announces going over it once", async () => {
    const { user, last } = setup(essayQuestion(5));
    const box = screen.getByRole("textbox", { name: "Your answer" });
    expect(screen.getByText("Write up to 5 words.")).toBeTruthy();
    await user.type(box, "Solar power is cheap");
    expect(screen.getByText("4 of 5 words")).toBeTruthy();
    expect(valid(last())).toEqual({ type: "ESSAY", text: "Solar power is cheap" });
    await user.type(box, " and clean too");
    expect(screen.getByText("7 of 5 words")).toBeTruthy();
    expect(screen.getByText("You are over the word limit.")).toBeTruthy();
  });

  it("is read-only in review mode", () => {
    render(<QuestionView question={essayQuestion()} mode="review" response={{ type: "ESSAY", text: "My answer" }} />);
    const box = screen.getByRole("textbox", { name: "Your answer" }) as HTMLTextAreaElement;
    expect(box.value).toBe("My answer");
    expect(box.disabled).toBe(true);
  });
});
