import { describe, expect, it } from "vitest";
import {
  boardHref,
  groupBoards,
  groupLevels,
  groupSubjectsByCategory,
  groupSubjectsByQualification,
  qualificationLabel,
  subjectHref,
  type BoardRow,
  type LevelRow,
  type QualificationRow,
  type SubjectRow,
} from "./catalogue-core";

const ZIMSEC: BoardRow = { id: "b1", slug: "zimsec", name: "Zimbabwe School Examinations Council", shortName: "ZIMSEC", description: "National board", publicSummary: null, sortOrder: 1 };
const CAMBRIDGE: BoardRow = { id: "b2", slug: "cambridge", name: "Cambridge International Education", shortName: "Cambridge", description: null, publicSummary: "International", sortOrder: 2 };
const O_LEVEL: LevelRow = { id: "l1", slug: "o-level", name: "O-Level", shortName: "O-Level", sortOrder: 1 };
const A_LEVEL: LevelRow = { id: "l2", slug: "a-level", name: "A-Level", shortName: "A-Level", sortOrder: 2 };

function qual(id: string, board: BoardRow, level: LevelRow, slug: string, shortName: string, overrides: Partial<QualificationRow> = {}): QualificationRow {
  return { id, slug, name: `${board.shortName} ${shortName}`, shortName, description: null, publicSummary: null, catalogueStatus: "AVAILABLE", sortOrder: 0, board, level, ...overrides };
}

const QUALS: QualificationRow[] = [
  qual("q4", CAMBRIDGE, A_LEVEL, "a-level", "AS & A Level", { catalogueStatus: "COMING_SOON" }),
  qual("q1", ZIMSEC, O_LEVEL, "o-level", "O-Level", { description: "Forms 1 to 4" }),
  qual("q3", CAMBRIDGE, O_LEVEL, "igcse", "IGCSE"),
  qual("q2", ZIMSEC, A_LEVEL, "a-level", "A-Level", { catalogueStatus: "COMING_SOON" }),
];

const MATHS = { id: "c1", slug: "mathematics", name: "Mathematics", sortOrder: 1 };
const SCIENCES = { id: "c2", slug: "sciences", name: "Sciences", sortOrder: 2 };

function subject(id: string, qualificationId: string, name: string, category: SubjectRow["category"], overrides: Partial<SubjectRow> = {}): SubjectRow {
  return { id, slug: name.toLowerCase().replace(/\s+/g, "-"), name, isPublic: true, sortOrder: 0, qualificationId, category, ...overrides };
}

describe("hrefs and labels", () => {
  it("builds public SEO paths and refuses reserved or malformed slugs", () => {
    expect(boardHref("zimsec")).toBe("/zimsec");
    expect(boardHref("pricing")).toBeNull();
    expect(subjectHref("zimsec", "o-level", "mathematics")).toBe("/zimsec/o-level/mathematics");
    expect(subjectHref("zimsec", "O Level", "mathematics")).toBeNull();
  });

  it("does not repeat the board name", () => {
    expect(qualificationLabel("Cambridge", "IGCSE")).toBe("Cambridge IGCSE");
    expect(qualificationLabel("Cambridge", "Cambridge IGCSE")).toBe("Cambridge IGCSE");
  });
});

describe("groupBoards", () => {
  it("orders boards and their qualifications, with summaries, hrefs and coming-soon flags", () => {
    const boards = groupBoards(QUALS);
    expect(boards.map((b) => b.shortName)).toEqual(["ZIMSEC", "Cambridge"]);
    expect(boards[0]?.qualifications.map((q) => q.id)).toEqual(["q1", "q2"]);
    expect(boards[0]?.summary).toBe("National board");
    expect(boards[1]?.summary).toBe("International");
    expect(boards[0]?.qualifications[0]).toMatchObject({ href: "/zimsec/o-level", comingSoon: false, summary: "Forms 1 to 4" });
    expect(boards[0]?.qualifications[1]?.comingSoon).toBe(true);
  });
});

describe("groupLevels", () => {
  it("groups qualifications by level across boards", () => {
    const levels = groupLevels(QUALS);
    expect(levels.map((l) => l.name)).toEqual(["O-Level", "A-Level"]);
    expect(levels[0]?.qualifications.map((q) => q.id)).toEqual(["q1", "q3"]);
    expect(levels[1]?.qualifications.map((q) => q.id)).toEqual(["q2", "q4"]);
  });
});

describe("groupSubjectsByCategory", () => {
  const subjects = [
    subject("s1", "q1", "Mathematics", MATHS),
    subject("s2", "q3", "Mathematics", MATHS),
    subject("s3", "q3", "Chemistry", SCIENCES),
    subject("s4", "q1", "Biology", SCIENCES, { isPublic: false }),
    subject("s5", "missing", "Physics", SCIENCES),
  ];

  it("merges subjects by name across boards, in category and board order", () => {
    const categories = groupSubjectsByCategory(QUALS, subjects);
    expect(categories.map((c) => c.category.name)).toEqual(["Mathematics", "Sciences"]);
    expect(categories[0]?.subjects).toEqual([
      {
        name: "Mathematics",
        offerings: [
          { subjectId: "s1", label: "ZIMSEC O-Level", href: "/zimsec/o-level/mathematics" },
          { subjectId: "s2", label: "Cambridge IGCSE", href: "/cambridge/igcse/mathematics" },
        ],
      },
    ]);
    expect(categories[1]?.subjects.map((s) => s.name)).toEqual(["Biology", "Chemistry"]);
    // Not public → listed without a link; unknown qualification → dropped.
    expect(categories[1]?.subjects[0]?.offerings[0]?.href).toBeNull();
    expect(categories.flatMap((c) => c.subjects).some((s) => s.name === "Physics")).toBe(false);
  });

  it("groups per qualification for the /subjects directory", () => {
    const byQualification = groupSubjectsByQualification(QUALS, subjects);
    expect(byQualification.map((entry) => entry.qualification.id)).toEqual(["q1", "q2", "q3", "q4"]);
    expect(byQualification[0]?.categories.map((c) => [c.category.name, c.subjects.map((s) => s.name)])).toEqual([
      ["Mathematics", ["Mathematics"]],
      ["Sciences", ["Biology"]],
    ]);
    expect(byQualification[1]?.categories).toEqual([]);
  });
});
