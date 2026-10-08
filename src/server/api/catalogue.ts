import "server-only";
import type { z } from "zod";
import {
  listBoardsForCountry,
  listCountries,
  listQualificationsByLevel,
  listSubjectsForQualification,
  type CatalogueBoard,
} from "@/server/curriculum";
import type { qualificationSchema, subjectSchema } from "./schemas";

/**
 * Catalogue lists for the API's onboarding pickers (§2, §4, §5), flattened from the curriculum read services
 * (`src/server/curriculum/catalogue.ts`: listed rows only, cached per process for 60 s, admin edits invalidate). The
 * web onboarding wizard reads the same services, so both channels always offer the same choices. Ordering is the
 * services' display order; ./pagination pages over it by id.
 */

export type QualificationJson = z.output<typeof qualificationSchema>;
export type SubjectJson = z.output<typeof subjectSchema>;

/**
 * Listed examination boards, in display order. With `countryId`, the boards offered in that country; otherwise every
 * listed country's boards (a board offered in several countries appears once, at its first position).
 */
export async function listCatalogueBoards(countryId: string | null): Promise<CatalogueBoard[]> {
  if (countryId !== null) return listBoardsForCountry(countryId);
  // A handful of countries, each list served from the per-process catalogue cache.
  const countries = await listCountries();
  const perCountry = await Promise.all(countries.map((country) => listBoardsForCountry(country.id)));
  const seen = new Set<string>();
  const boards: CatalogueBoard[] = [];
  for (const board of perCountry.flat()) {
    if (seen.has(board.id)) continue;
    seen.add(board.id);
    boards.push(board);
  }
  return boards;
}

/** Listed qualifications (optionally of one board), level by level in level order, then board order. */
export async function listCatalogueQualifications(boardId: string | null): Promise<QualificationJson[]> {
  const groups = await listQualificationsByLevel(boardId !== null ? { examBoardIds: [boardId] } : {});
  return groups.flatMap((group) => group.qualifications.map((qualification) => ({ ...qualification, level: group.level })));
}

/** Listed subjects of a qualification, category by category. Unknown qualification → empty list. */
export async function listCatalogueSubjects(qualificationId: string): Promise<SubjectJson[]> {
  const groups = await listSubjectsForQualification(qualificationId);
  return groups.flatMap((group) => group.subjects.map((subject) => ({ ...subject, category: group.category })));
}
