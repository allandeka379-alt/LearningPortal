import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createContentSource, createCurriculumChain, ensureTestCountry, uniqueCode, uniqueSlug } from "../../../../tests/factories/index";
import {
  createBoard,
  createCategory,
  createCountry,
  createLevel,
  createQualification,
  createSubject,
  createYearGroup,
  getBoard,
  getCatalogueOptions,
  getSubject,
  listBoards,
  listCategories,
  listCountries,
  listLevels,
  listQualifications,
  listSubjects,
  listYearGroups,
  setBoardCountries,
  updateBoard,
  updateCategory,
  updateLevel,
  updateQualification,
  updateSubject,
  updateYearGroup,
} from "./catalogue";
import { seedNoteFor } from "./seed-notes";
import { auditOperations, auditRowsFor, staffActor, studentActor } from "./testing";
import type { CurriculumActor } from "./access";

let admin: CurriculumActor;
let editor: CurriculumActor;
let student: CurriculumActor;

beforeAll(async () => {
  [admin, editor, student] = await Promise.all([staffActor("ADMIN"), staffActor("CONTENT_EDITOR"), studentActor()]);
});

function boardInput(overrides: Record<string, unknown> = {}) {
  const slug = uniqueSlug("cms-board");
  return {
    slug,
    code: uniqueCode("CB"),
    name: `CMS Test Board ${slug}`,
    shortName: "CMSB",
    catalogueStatus: "HIDDEN",
    sortOrder: "3",
    ...overrides,
  };
}

describe("permissions", () => {
  it("forbids non-staff from reading or writing the catalogue", async () => {
    await expect(listBoards(student)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(getCatalogueOptions(student)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createBoard(student, boardInput())).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("lets content editors read but not change the catalogue", async () => {
    await expect(listBoards(editor)).resolves.toMatchObject({ items: expect.any(Array) });
    await expect(createBoard(editor, boardInput())).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createSubject(editor, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("exam boards", () => {
  it("creates a board, derives a slug when blank and audits the change", async () => {
    const input = boardInput({ slug: "", shortName: `Board ${uniqueCode("S")}` });
    const { id } = await createBoard(admin, input);
    const board = await getBoard(admin, id);
    expect(board.slug).toMatch(/^board-s[0-9a-f]{8}$/);
    expect(board.code).toBe(input.code);
    expect(board.sortOrder).toBe(3);
    expect(board.publicPath).toBe(`/${board.slug}`);
    const rows = await auditRowsFor(id);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ action: "curriculum.update", entityType: "ExamBoard", actorUserId: admin.userId });
    expect(await auditOperations(id)).toEqual(["curriculum.board.create"]);
  });

  it("validates input, reserved slugs and unique codes", async () => {
    await expect(createBoard(admin, boardInput({ code: "x", name: "" }))).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { code: [expect.any(String)], name: [expect.any(String)] },
    });
    await expect(createBoard(admin, boardInput({ slug: "admin" }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: [expect.stringMatching(/reserved/)] } });
    const first = boardInput();
    await createBoard(admin, first);
    await expect(createBoard(admin, boardInput({ code: first.code }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { code: [expect.any(String)] } });
    await expect(createBoard(admin, boardInput({ slug: first.slug }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: [expect.any(String)] } });
  });

  it("asks for confirmation before renaming a live board slug", async () => {
    const input = boardInput({ catalogueStatus: "AVAILABLE" });
    const { id } = await createBoard(admin, input);
    const renamed = { ...input, id, slug: uniqueSlug("renamed") };
    await expect(updateBoard(admin, renamed)).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: [expect.stringMatching(/live in public URLs/)] } });
    await updateBoard(admin, { ...renamed, confirmSlugChange: "on" });
    expect((await getBoard(admin, id)).slug).toBe(renamed.slug);
    // Hidden boards rename freely.
    const hidden = boardInput();
    const created = await createBoard(admin, hidden);
    await expect(updateBoard(admin, { ...hidden, id: created.id, slug: uniqueSlug("free") })).resolves.toEqual({ id: created.id });
    expect(await auditOperations(id)).toEqual(["curriculum.board.create", "curriculum.board.update"]);
  });

  it("sets the countries a board is offered in without deleting history", async () => {
    const country = await ensureTestCountry();
    const { id } = await createBoard(admin, boardInput());
    await setBoardCountries(admin, { boardId: id, links: [{ countryId: country.id, isActive: "on", sortOrder: "2" }] });
    expect((await getBoard(admin, id)).countryLinks).toMatchObject([{ countryId: country.id, isActive: true, sortOrder: 2 }]);
    await setBoardCountries(admin, { boardId: id, links: [] });
    expect((await getBoard(admin, id)).countryLinks).toMatchObject([{ countryId: country.id, isActive: false }]);
    await expect(setBoardCountries(editor, { boardId: id, links: [] })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("filters and paginates boards with an opaque cursor", async () => {
    const tag = uniqueCode("PG");
    for (let i = 0; i < 3; i += 1) await createBoard(admin, boardInput({ name: `Paging ${tag} ${i}` }));
    const first = await listBoards(admin, { q: tag });
    expect(first.items.map((row) => row.name)).toEqual([`Paging ${tag} 0`, `Paging ${tag} 1`, `Paging ${tag} 2`]);
    expect(first.nextCursor).toBeNull();
    await expect(listBoards(admin, { cursor: "not-a-cursor" })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("countries, levels, year groups and categories", () => {
  it("creates and edits a country (read-mostly)", async () => {
    const iso = `Q${String.fromCharCode(77 + Math.floor(Math.random() * 14))}`;
    const existing = await db.country.findUnique({ where: { isoCode: iso } });
    if (!existing) {
      const { id } = await createCountry(admin, { isoCode: iso.toLowerCase(), name: `Testcountry ${iso}`, slug: uniqueSlug("country"), defaultCurrency: "usd", timezone: "Africa/Harare", defaultLocale: "en-ZW", dialCode: "", catalogueStatus: "HIDDEN", sortOrder: "" });
      const page = await listCountries(admin, { q: `Testcountry ${iso}` });
      expect(page.items.find((row) => row.id === id)).toMatchObject({ isoCode: iso, defaultCurrency: "USD", dialCode: null });
    }
    await expect(
      createCountry(admin, { isoCode: "ZZZ", name: "x", defaultCurrency: "US", timezone: "Mars/Base", defaultLocale: "english", catalogueStatus: "HIDDEN" }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { isoCode: expect.any(Array), defaultCurrency: expect.any(Array), timezone: expect.any(Array), defaultLocale: expect.any(Array) } });
  });

  it("manages levels, year groups and categories", async () => {
    const levelName = `Level ${uniqueCode("L")}`;
    const level = await createLevel(admin, { name: levelName, slug: "", isActive: "on" });
    await updateLevel(admin, { id: level.id, name: `${levelName} renamed`, slug: uniqueSlug("level"), isActive: "on", sortOrder: "4" });
    expect((await listLevels(editor, { q: levelName })).items).toMatchObject([{ id: level.id, name: `${levelName} renamed`, sortOrder: 4 }]);

    const country = await ensureTestCountry();
    const code = uniqueCode("Y").slice(0, 10);
    const year = await createYearGroup(admin, { countryId: country.id, code, name: "Form 9", ordinal: "9", typicalLevelId: level.id, isActive: "on" });
    await expect(createYearGroup(admin, { countryId: country.id, code, name: "Dup", ordinal: "1", isActive: "on" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { code: [expect.any(String)] },
    });
    await updateYearGroup(admin, { id: year.id, code, name: "Form Nine", ordinal: "9", typicalLevelId: "", isActive: "" });
    expect((await listYearGroups(editor, { countryId: country.id, q: code })).items).toMatchObject([{ id: year.id, name: "Form Nine", isActive: false, typicalLevelId: null }]);

    const categoryName = `Category ${uniqueCode("C")}`;
    const category = await createCategory(admin, { name: categoryName, isActive: "on" });
    await updateCategory(admin, { id: category.id, name: `${categoryName} (sciences)`, slug: uniqueSlug("cat"), isActive: "on" });
    expect((await listCategories(editor, { q: categoryName })).items.map((row) => row.name)).toEqual([`${categoryName} (sciences)`]);
    await expect(createLevel(editor, { name: "x" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("qualifications", () => {
  it("creates per-board unique slugs and keeps the board fixed", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const slug = uniqueSlug("qual");
    const base = { examBoardId: chain.examBoard.id, levelId: chain.level.id, slug, name: "Test Advanced Level", shortName: "TAL", catalogueStatus: "COMING_SOON" };
    const { id } = await createQualification(admin, base);
    await expect(createQualification(admin, base)).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: [expect.any(String)] } });
    await expect(updateQualification(admin, { ...base, id, slug: uniqueSlug("moved") })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { confirmSlugChange: expect.any(Array) } });
    await updateQualification(admin, { ...base, id, name: "Renamed", examBoardId: "ignored-not-a-field" });
    const page = await listQualifications(editor, { boardId: chain.examBoard.id });
    expect(page.items.find((row) => row.id === id)).toMatchObject({ name: "Renamed", examBoard: { id: chain.examBoard.id } });
  });
});

describe("subjects and the verified rule", () => {
  it("keeps unverified subjects out of student listings until an official source is recorded", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const input = {
      qualificationId: chain.qualification.id,
      categoryId: chain.category.id,
      slug: uniqueSlug("subject"),
      name: "Test Commerce",
      languageCode: "en",
      catalogueStatus: "HIDDEN",
      isPublic: "on",
    };
    const { id } = await createSubject(admin, input);
    let subject = await getSubject(editor, id);
    expect(subject).toMatchObject({ verified: false, catalogueStatus: "HIDDEN", seedNote: null });

    await expect(updateSubject(admin, { ...input, id, catalogueStatus: "COMING_SOON" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { catalogueStatus: [expect.stringMatching(/Verify the subject/)] },
    });
    const officialList = await createContentSource({ type: "OFFICIAL_SYLLABUS", name: "Official subject list (test)" });
    await updateSubject(admin, { ...input, id, catalogueStatus: "COMING_SOON", sourceId: officialList.id, officialCode: "9999" });
    subject = await getSubject(editor, id);
    expect(subject).toMatchObject({ verified: true, catalogueStatus: "COMING_SOON", officialCode: "9999", source: { id: officialList.id } });
    expect(await auditOperations(id)).toEqual(["curriculum.subject.create", "curriculum.subject.verify"]);

    await expect(updateSubject(admin, { ...input, id, catalogueStatus: "AVAILABLE", sourceId: officialList.id })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { catalogueStatus: [expect.stringMatching(/current syllabus/)] },
    });
    // The chain's subject has a CURRENT version and a source: it may be AVAILABLE.
    await expect(
      updateSubject(admin, {
        id: chain.subject.id,
        categoryId: chain.category.id,
        slug: chain.subject.slug,
        name: chain.subject.name,
        languageCode: "en",
        catalogueStatus: "AVAILABLE",
        isPublic: "on",
        sourceId: chain.source.id,
      }),
    ).resolves.toEqual({ id: chain.subject.id });

    const verifiedOnly = await listSubjects(editor, { qualificationId: chain.qualification.id, verified: "yes" });
    expect(verifiedOnly.items.map((row) => row.id).sort()).toEqual([chain.subject.id, id].sort());
    const unverified = await listSubjects(editor, { qualificationId: chain.qualification.id, verified: "no" });
    expect(unverified.items).toEqual([]);
  });

  it("refuses an AVAILABLE subject on creation and protects live subject slugs", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    await expect(
      createSubject(admin, { qualificationId: chain.qualification.id, categoryId: chain.category.id, name: "New", languageCode: "en", catalogueStatus: "AVAILABLE", sourceId: chain.source.id }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(
      updateSubject(admin, {
        id: chain.subject.id,
        categoryId: chain.category.id,
        slug: uniqueSlug("renamed-subject"),
        name: chain.subject.name,
        languageCode: "en",
        catalogueStatus: "AVAILABLE",
        isPublic: "on",
        sourceId: chain.source.id,
      }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: [expect.stringMatching(/live/)] } });
  });

  it("finds the seed verification note of seeded catalogue entries", () => {
    expect(seedNoteFor("zimsec", "o-level", "business-studies")).toMatchObject({ note: "Confirm current ZIMSEC title.", seededCode: null });
    expect(seedNoteFor("zimsec", "o-level", "mathematics")).toMatchObject({ note: null, seededName: "Mathematics" });
    expect(seedNoteFor("nowhere", "o-level", "mathematics")).toBeNull();
  });
});
