/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { ExamCountdown, type CountdownBoardOption } from "./ExamCountdown";

afterEach(cleanup);

const today = localDateString(new Date(), "Africa/Harare");

const BOARDS: CountdownBoardOption[] = [
  {
    slug: "zimsec",
    shortName: "ZIMSEC",
    qualifications: [
      {
        id: "q-o",
        label: "ZIMSEC O-Level",
        sessions: [
          { id: "s1", name: "November", startsOn: addDays(today, 30), endsOn: addDays(today, 60), isProvisional: true, isDemo: false, sourceUrl: null },
          { id: "s2", name: "June", startsOn: addDays(today, 200), endsOn: addDays(today, 220), isProvisional: false, isDemo: false, sourceUrl: "https://example.test/timetable" },
        ],
      },
    ],
  },
  {
    slug: "cambridge",
    shortName: "Cambridge",
    qualifications: [
      {
        id: "q-i",
        label: "Cambridge IGCSE",
        sessions: [{ id: "s3", name: "October/November", startsOn: addDays(today, -5), endsOn: addDays(today, 20), isProvisional: true, isDemo: true, sourceUrl: null }],
      },
    ],
  },
];

describe("ExamCountdown", () => {
  it("counts the days to the first session and labels provisional dates", () => {
    render(<ExamCountdown boards={BOARDS} />);
    expect(screen.getByText("30 days")).toBeTruthy();
    expect(screen.getByText("until ZIMSEC O-Level November begins")).toBeTruthy();
    expect(screen.getByText("Provisional date")).toBeTruthy();
  });

  it("switches session and board, resetting the dependent choices", async () => {
    const user = userEvent.setup();
    render(<ExamCountdown boards={BOARDS} />);
    await user.selectOptions(screen.getByLabelText("Exam session"), "s2");
    expect(screen.getByText("200 days")).toBeTruthy();
    expect(screen.queryByText("Provisional date")).toBeNull();
    expect(screen.getByRole("link", { name: /Official timetable/ }).getAttribute("href")).toBe("https://example.test/timetable");

    await user.selectOptions(screen.getByLabelText("Examination board"), "cambridge");
    expect((screen.getByLabelText("Qualification") as HTMLSelectElement).value).toBe("q-i");
    expect(screen.getByText("In progress")).toBeTruthy();
    expect(screen.getByText("Demo data")).toBeTruthy();
  });

  it("renders nothing without sessions", () => {
    const { container } = render(<ExamCountdown boards={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
