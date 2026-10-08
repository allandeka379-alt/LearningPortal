import { describe, expect, it } from "vitest";
import { aliasVariants, buildCatalogueIndex, parseSearchQuery, type SearchCatalogue } from "./query-understanding";

// A realistic catalogue snapshot (test data only; the real one comes from the database).
const catalogue: SearchCatalogue = {
  boards: [
    { id: "b-zim", slug: "zimsec", code: "ZIMSEC", name: "Zimbabwe School Examinations Council", shortName: "ZIMSEC" },
    { id: "b-cam", slug: "cambridge", code: "CAIE", name: "Cambridge International", shortName: "Cambridge" },
  ],
  levels: [
    { id: "l-o", slug: "o-level", name: "O-Level", shortName: "O Level" },
    { id: "l-a", slug: "a-level", name: "A-Level", shortName: "A Level" },
  ],
  qualifications: [
    { id: "q-zo", examBoardId: "b-zim", levelId: "l-o", slug: "o-level", code: null, name: "ZIMSEC Ordinary Level", shortName: "O-Level" },
    { id: "q-za", examBoardId: "b-zim", levelId: "l-a", slug: "a-level", code: null, name: "ZIMSEC Advanced Level", shortName: "A-Level" },
    { id: "q-ci", examBoardId: "b-cam", levelId: "l-o", slug: "igcse", code: "IGCSE", name: "Cambridge IGCSE", shortName: "IGCSE" },
    {
      id: "q-ca",
      examBoardId: "b-cam",
      levelId: "l-a",
      slug: "as-a-level",
      code: "AS-A",
      name: "Cambridge International AS & A Level",
      shortName: "AS & A Level",
    },
  ],
  subjects: [
    { id: "s-zo-math", qualificationId: "q-zo", slug: "mathematics", name: "Mathematics", shortName: "Maths", codes: ["4004"] },
    { id: "s-zo-chem", qualificationId: "q-zo", slug: "chemistry", name: "Chemistry", shortName: null, codes: ["5070"] },
    { id: "s-za-chem", qualificationId: "q-za", slug: "chemistry", name: "Chemistry", shortName: null, codes: ["6031"] },
    { id: "s-ci-math", qualificationId: "q-ci", slug: "mathematics", name: "Mathematics", shortName: "Maths", codes: ["0580"] },
    { id: "s-ci-chem", qualificationId: "q-ci", slug: "chemistry", name: "Chemistry", shortName: null, codes: ["0620"] },
    { id: "s-ca-chem", qualificationId: "q-ca", slug: "chemistry", name: "Chemistry", shortName: null, codes: ["9701"] },
    { id: "s-ca-math", qualificationId: "q-ca", slug: "mathematics", name: "Mathematics", shortName: "Maths", codes: ["9709"] },
  ],
};

const index = buildCatalogueIndex(catalogue);
const parse = (q: string, ctx = {}) => parseSearchQuery(q, index, ctx);
const sorted = (ids: readonly string[] | null | undefined) => (ids ? [...ids].sort() : ids);

describe("aliasVariants", () => {
  it("adds joined and singular variants", () => {
    expect(aliasVariants("O-Level")).toEqual(["o level", "olevel"]);
    expect(aliasVariants("Maths")).toEqual(["maths", "math"]);
  });

  it("ignores aliases made only of 1-2 letter words", () => {
    expect(aliasVariants("AS")).toEqual([]);
    expect(aliasVariants("AS-A")).toEqual([]);
    expect(aliasVariants(null)).toEqual([]);
  });
});

describe("parseSearchQuery", () => {
  it('understands "igcse chemistry moles"', () => {
    const parsed = parse("igcse chemistry moles");
    expect(parsed.residual).toBe("moles");
    expect(parsed.filters).toEqual({ boardIds: null, qualificationIds: ["q-ci"], subjectIds: ["s-ci-chem"] });
    expect(parsed.detected.map((d) => [d.kind, d.label, d.matchedText])).toEqual([
      ["qualification", "Cambridge IGCSE", "igcse"],
      ["subject", "Chemistry", "chemistry"],
    ]);
  });

  it('detects syllabus codes: "0580 quadratic"', () => {
    const parsed = parse("0580 quadratic");
    expect(parsed.residual).toBe("quadratic");
    expect(parsed.filters.subjectIds).toEqual(["s-ci-math"]);
    expect(parsed.detected[0]).toMatchObject({ kind: "subject", byCode: true, label: "Mathematics", matchedText: "0580" });
  });

  it('understands "zimsec o level maths" (board + level narrowed to the board + short name)', () => {
    const parsed = parse("zimsec o level maths");
    expect(parsed.residual).toBe("");
    expect(parsed.filters).toEqual({ boardIds: ["b-zim"], qualificationIds: ["q-zo"], subjectIds: ["s-zo-math"] });
    expect(parsed.detected.map((d) => d.kind)).toEqual(["board", "level", "subject"]);
    expect(parsed.detected[1]).toMatchObject({ label: "O-Level", matchedText: "o level" });
  });

  it("expands a level to every qualification at that level", () => {
    const parsed = parse("A-Level chemistry");
    expect(sorted(parsed.filters.qualificationIds)).toEqual(["q-ca", "q-za"]);
    expect(sorted(parsed.filters.subjectIds)).toEqual(["s-ca-chem", "s-za-chem"]);
  });

  it("matches a subject name across boards when nothing narrows it", () => {
    expect(sorted(parse("chemistry").filters.subjectIds)).toEqual(["s-ca-chem", "s-ci-chem", "s-za-chem", "s-zo-chem"]);
  });

  it("accepts joined and singular spellings", () => {
    expect(parse("olevel math").filters).toEqual({
      boardIds: null,
      qualificationIds: expect.arrayContaining(["q-zo", "q-ci"]) as unknown as string[],
      subjectIds: expect.arrayContaining(["s-zo-math", "s-ci-math"]) as unknown as string[],
    });
  });

  it("never turns quoted or negated words into filters", () => {
    expect(parse('"chemistry" moles').detected).toEqual([]);
    expect(parse("moles -chemistry").detected).toEqual([]);
    expect(parse("moles -chemistry").residual).toBe("moles -chemistry");
  });

  it("ignores ordinary words that only resemble short codes", () => {
    expect(parse("y as a function of x").detected).toEqual([]);
  });

  it("returns removable chips that drop exactly their words", () => {
    const parsed = parse("IGCSE Chemistry moles");
    expect(parsed.detected.map((d) => d.removeQuery)).toEqual(["Chemistry moles", "IGCSE moles"]);
  });

  it("keeps a phrase as text when the other filters exclude all its candidates", () => {
    const parsed = parse("zimsec 0580");
    expect(parsed.filters).toEqual({ boardIds: ["b-zim"], qualificationIds: null, subjectIds: null });
    expect(parsed.residual).toBe("0580");
    expect(parsed.detected.map((d) => d.kind)).toEqual(["board"]);
  });

  it("does nothing with an explicit subject or topic filter", () => {
    expect(parse("igcse chemistry", { subjectId: "s-x" })).toMatchObject({ residual: "igcse chemistry", detected: [] });
    expect(parse("igcse chemistry", { topicId: "t-x" }).detected).toEqual([]);
  });

  it("narrows subject detection to an explicit qualification and skips board/level words", () => {
    const parsed = parse("zimsec chemistry", { qualificationId: "q-ci" });
    expect(parsed.filters).toEqual({ boardIds: null, qualificationIds: null, subjectIds: ["s-ci-chem"] });
    expect(parsed.residual).toBe("zimsec");
  });

  it("narrows level detection to an explicit board", () => {
    const parsed = parse("o level chemistry", { boardId: "b-cam" });
    expect(parsed.filters).toEqual({ boardIds: null, qualificationIds: ["q-ci"], subjectIds: ["s-ci-chem"] });
  });

  it("leaves plain text alone", () => {
    expect(parse("photosynthesis in plants")).toMatchObject({ residual: "photosynthesis in plants", detected: [] });
    expect(parse("   ")).toMatchObject({ residual: "", detected: [] });
  });
});
