import "server-only";
import { db, type DbClient } from "@/server/db";
import { buildCatalogueIndex, type CatalogueIndex, type SearchCatalogue } from "./query-understanding";

/**
 * Catalogue snapshot for query understanding (board / level / qualification / subject names, slugs and codes), loaded
 * in 5 small queries and cached per process for {@link CATALOGUE_TTL_MS}. Only listed catalogue rows (not HIDDEN) are
 * included, so a hidden subject's name can never become a filter. Syllabus codes come from published versions only.
 *
 * The cache is per process (like ARCHITECTURE §3.8 in-process caches): a catalogue edit is picked up within the TTL.
 * Concurrent callers share one in-flight load.
 */

export const CATALOGUE_TTL_MS = 60_000;

export async function loadSearchCatalogue(client: DbClient = db): Promise<SearchCatalogue> {
  const [boards, levels, qualifications, subjects, syllabi] = await Promise.all([
    client.examBoard.findMany({
      where: { catalogueStatus: { not: "HIDDEN" } },
      select: { id: true, slug: true, code: true, name: true, shortName: true },
    }),
    client.qualificationLevel.findMany({
      where: { isActive: true },
      select: { id: true, slug: true, name: true, shortName: true },
    }),
    client.qualification.findMany({
      where: { catalogueStatus: { not: "HIDDEN" }, examBoard: { catalogueStatus: { not: "HIDDEN" } } },
      select: { id: true, examBoardId: true, levelId: true, slug: true, code: true, name: true, shortName: true },
    }),
    client.subject.findMany({
      where: {
        catalogueStatus: { not: "HIDDEN" },
        qualification: { catalogueStatus: { not: "HIDDEN" }, examBoard: { catalogueStatus: { not: "HIDDEN" } } },
      },
      select: { id: true, qualificationId: true, slug: true, name: true, shortName: true, officialCode: true },
    }),
    client.syllabus.findMany({
      where: { status: { not: "DRAFT" }, code: { not: null } },
      select: { subjectId: true, code: true },
    }),
  ]);

  const codesBySubject = new Map<string, Set<string>>();
  for (const syllabus of syllabi) {
    if (!syllabus.code) continue;
    let codes = codesBySubject.get(syllabus.subjectId);
    if (!codes) {
      codes = new Set();
      codesBySubject.set(syllabus.subjectId, codes);
    }
    codes.add(syllabus.code);
  }

  return {
    boards,
    levels,
    qualifications,
    subjects: subjects.map(({ officialCode, ...subject }) => {
      const codes = new Set(codesBySubject.get(subject.id) ?? []);
      if (officialCode) codes.add(officialCode);
      return { ...subject, codes: [...codes] };
    }),
  };
}

let cached: { index: CatalogueIndex; expiresAt: number } | null = null;
let inFlight: Promise<CatalogueIndex> | null = null;

/** Cached {@link CatalogueIndex} (TTL {@link CATALOGUE_TTL_MS}). */
export async function getCatalogueIndex(now: number = Date.now()): Promise<CatalogueIndex> {
  if (cached && cached.expiresAt > now) return cached.index;
  if (inFlight) return inFlight;
  inFlight = loadSearchCatalogue()
    .then((catalogue) => {
      const index = buildCatalogueIndex(catalogue);
      cached = { index, expiresAt: Date.now() + CATALOGUE_TTL_MS };
      return index;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

/** Drops the cached catalogue (after catalogue edits in this process, and in tests). */
export function clearSearchCatalogueCache(): void {
  cached = null;
}
