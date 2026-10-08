/**
 * Fixtures for the onboarding and diagnostic integration tests (not used by application code). Builds, with unique
 * values, a catalogue shaped like a real one: a board offered in the test country, two levels, an AVAILABLE
 * qualification with a COMING_SOON sibling, year groups, subjects in every catalogue state, two syllabus versions of
 * the main subject (CURRENT until 2027, UPCOMING from 2028, so the exam session decides the pinned version), exam
 * sessions and a grade scheme.
 */
import { randomUUID } from "node:crypto";
import { invalidateCatalogueCache } from "@/server/curriculum/catalogue";
import { invalidateGradeSchemeCache } from "@/server/curriculum/grades";
import { db } from "@/server/db";
import { createCurriculumChain, type CurriculumChain } from "../../../tests/factories/curriculum";
import { createExamSession, createGradeScheme } from "../../../tests/factories/learning";
import { uniqueCode, uniqueSlug } from "../../../tests/factories/util";

export interface OnboardingCatalogue {
  chain: CurriculumChain;
  /** Main subject (chain.subject): CURRENT version until 2027-12-31 (chain.syllabus) + this UPCOMING one from 2028. */
  upcomingSyllabusId: string;
  /** Second selectable subject of the qualification (open-ended CURRENT version). */
  subjectB: { id: string; name: string; syllabusId: string };
  /** Listed but not selectable. */
  comingSoonSubject: { id: string; name: string };
  /** AVAILABLE but without a published syllabus: shown as coming soon, not selectable. */
  noSyllabusSubject: { id: string; name: string };
  comingSoonQualificationId: string;
  /** AVAILABLE qualification of the same board in another level (A-Level). */
  otherLevelQualificationId: string;
  /** Year group typical for the chain's level, and one for no level. */
  yearGroupId: string;
  otherYearGroupId: string;
  /** Sessions of chain.qualification. */
  session2027Id: string;
  session2028Id: string;
}

async function publishedSyllabus(
  subjectId: string,
  sourceId: string,
  options: { versionLabel: string; status: "CURRENT" | "UPCOMING"; effectiveFrom: string; effectiveTo?: string; supersedesId?: string },
): Promise<string> {
  const draft = await db.syllabus.create({
    data: {
      subjectId,
      title: `Test syllabus ${options.versionLabel}`,
      versionLabel: options.versionLabel,
      effectiveFrom: new Date(`${options.effectiveFrom}T00:00:00.000Z`),
      ...(options.effectiveTo ? { effectiveTo: new Date(`${options.effectiveTo}T00:00:00.000Z`) } : {}),
      sourceId,
      copyrightStatus: "OWNED",
      ...(options.supersedesId ? { supersedesId: options.supersedesId } : {}),
    },
    select: { id: true },
  });
  const topicId = randomUUID();
  await db.topic.create({
    data: { id: topicId, syllabusId: draft.id, kind: "TOPIC", depth: 0, path: topicId, name: "Only topic", slug: uniqueSlug("only-topic") },
  });
  await db.syllabus.update({ where: { id: draft.id }, data: { status: options.status, publishedAt: new Date() } });
  return draft.id;
}

/** See the module header. Clears this process's catalogue caches so the new rows are visible at once. */
export async function createOnboardingCatalogue(): Promise<OnboardingCatalogue> {
  const chain = await createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 2, lessonsPerTopic: 0, syllabusStatus: "DRAFT" });
  await db.syllabus.update({ where: { id: chain.syllabus.id }, data: { effectiveTo: new Date("2027-12-31T00:00:00.000Z") } });
  chain.syllabus = await db.syllabus.update({ where: { id: chain.syllabus.id }, data: { status: "CURRENT", publishedAt: new Date() } });
  const upcomingSyllabusId = await publishedSyllabus(chain.subject.id, chain.source.id, {
    versionLabel: "2028-2030",
    status: "UPCOMING",
    effectiveFrom: "2028-01-01",
    supersedesId: chain.syllabus.id,
  });

  const subject = (name: string, catalogueStatus: "AVAILABLE" | "COMING_SOON", sortOrder: number) =>
    db.subject.create({
      data: {
        qualificationId: chain.qualification.id,
        categoryId: chain.category.id,
        slug: uniqueSlug(name),
        name,
        catalogueStatus,
        sourceId: chain.source.id,
        sortOrder,
      },
      select: { id: true, name: true },
    });
  const b = await subject("Test Physics", "AVAILABLE", 1);
  const subjectBSyllabusId = await publishedSyllabus(b.id, chain.source.id, { versionLabel: "2026-open", status: "CURRENT", effectiveFrom: "2026-01-01" });
  const comingSoonSubject = await subject("Test Music", "COMING_SOON", 2);
  const noSyllabusSubject = await subject("Test Latin", "AVAILABLE", 3);

  const comingSoonQualification = await db.qualification.create({
    data: {
      examBoardId: chain.examBoard.id,
      levelId: chain.level.id,
      slug: uniqueSlug("soon-qualification"),
      name: "Test Coming Level",
      shortName: "TCL",
      catalogueStatus: "COMING_SOON",
    },
    select: { id: true },
  });
  const otherLevel = await db.qualificationLevel.create({ data: { slug: uniqueSlug("a-level"), name: "Test Advanced", sortOrder: 2 } });
  const otherLevelQualification = await db.qualification.create({
    data: {
      examBoardId: chain.examBoard.id,
      levelId: otherLevel.id,
      slug: uniqueSlug("advanced"),
      name: "Test Advanced Level",
      shortName: "TAL",
      catalogueStatus: "AVAILABLE",
    },
    select: { id: true },
  });

  const yearGroup = await db.yearGroup.create({
    data: { countryId: chain.country.id, code: uniqueCode("Y").slice(0, 16), name: "Form Four (test)", ordinal: 4, typicalLevelId: chain.level.id },
    select: { id: true },
  });
  const otherYearGroup = await db.yearGroup.create({
    data: { countryId: chain.country.id, code: uniqueCode("Y").slice(0, 16), name: "Year Nine (test)", ordinal: 9, typicalLevelId: otherLevel.id },
    select: { id: true },
  });

  await createGradeScheme(chain.qualification.id);
  const session2027 = await createExamSession(chain.qualification.id, { startsOn: "2027-06-01", name: "June 2027 (test)" });
  // Confirmed against the (test) timetable: a confirmed session needs its confirmation time (ExamSession_confirmed_chk).
  await db.examSession.update({ where: { id: session2027.id }, data: { isProvisional: false, confirmedAt: new Date() } });
  const session2028 = await createExamSession(chain.qualification.id, { startsOn: "2028-11-02", name: "November 2028 (test)" });

  // Catalogue reads are cached per process (60 s): the board list of the shared test country was read by earlier tests.
  invalidateCatalogueCache();
  invalidateGradeSchemeCache();

  return {
    chain,
    upcomingSyllabusId,
    subjectB: { id: b.id, name: b.name, syllabusId: subjectBSyllabusId },
    comingSoonSubject,
    noSyllabusSubject,
    comingSoonQualificationId: comingSoonQualification.id,
    otherLevelQualificationId: otherLevelQualification.id,
    yearGroupId: yearGroup.id,
    otherYearGroupId: otherYearGroup.id,
    session2027Id: session2027.id,
    session2028Id: session2028.id,
  };
}
