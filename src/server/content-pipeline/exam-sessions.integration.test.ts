import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createCurriculumChain } from "../../../tests/factories";
import { syncExamSessions, type ExamSessionEntry } from "./exam-sessions";

/** Exam sessions from content/exam-sessions.json: created, published, kept in sync while provisional, idempotent. */
describe("syncExamSessions", () => {
  it("creates and publishes provisional sessions, is idempotent, and never touches a confirmed one", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const entry: ExamSessionEntry = {
      board: chain.examBoard.slug,
      qualification: chain.qualification.slug,
      seriesCode: "2027-NOV",
      name: "November 2027",
      year: 2027,
      startsOn: "2027-10-11",
      endsOn: "2027-11-26",
      notes: "Estimate from previous years.",
    };

    expect((await syncExamSessions([entry]))[0]?.outcome).toBe("created");
    const row = await db.examSession.findUniqueOrThrow({
      where: { qualificationId_seriesCode: { qualificationId: chain.qualification.id, seriesCode: "2027-NOV" } },
      select: { id: true, status: true, isProvisional: true, isDemo: true },
    });
    expect(row).toMatchObject({ status: "PUBLISHED", isProvisional: true, isDemo: false });

    expect((await syncExamSessions([entry]))[0]?.outcome).toBe("unchanged");
    expect((await syncExamSessions([{ ...entry, endsOn: "2027-11-27" }]))[0]?.outcome).toBe("updated");

    await db.examSession.update({ where: { id: row.id }, data: { isProvisional: false, confirmedAt: new Date() } });
    expect((await syncExamSessions([{ ...entry, endsOn: "2027-12-01" }]))[0]?.outcome).toBe("confirmed (left alone)");
    const after = await db.examSession.findUniqueOrThrow({ where: { id: row.id }, select: { endsOn: true } });
    expect(after.endsOn.toISOString().slice(0, 10)).toBe("2027-11-27");
  });

  it("reports an unknown qualification instead of failing the whole run", async () => {
    const [outcome] = await syncExamSessions([
      { board: "no-such-board", qualification: "no-such-qualification", seriesCode: "2027-NOV", name: "November 2027", year: 2027, startsOn: "2027-10-11", endsOn: "2027-11-26" },
    ]);
    expect(outcome).toMatchObject({ outcome: "error", message: "qualification not found" });
  });
});
