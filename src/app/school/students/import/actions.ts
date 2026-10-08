"use server";

import type { RosterChunkView, RosterCommitInput, RosterDryRunView } from "@/components/school/RosterImport";
import { AppError, fail, normalizeError, type ActionResult } from "@/server/lib/errors";
import { MAX_ROSTER_FILE_BYTES } from "@/server/schools/core";
import { commitRosterChunk, validateRosterFile } from "@/server/schools/roster";
import { auditRequest, requireSchoolAction } from "../../_lib/context";

function failure(error: unknown, operation: string) {
  const normalized = normalizeError(error, { operation });
  return fail(normalized.code, normalized.message, normalized.fieldErrors);
}

/** Dry run of an uploaded roster file: nothing is written and the file is not stored. */
export async function validateRosterAction(formData: FormData): Promise<ActionResult<RosterDryRunView>> {
  try {
    const { actor, schoolId } = await requireSchoolAction();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) throw AppError.validation({ file: ["Choose a CSV or Excel file first."] });
    if (file.size > MAX_ROSTER_FILE_BYTES) throw AppError.validation({ file: ["The file is larger than 2 MB."] });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const result = await validateRosterFile(actor, { schoolId, bytes });
    return { ok: true, data: result };
  } catch (error) {
    return failure(error, "school.roster.validate");
  }
}

/** Commits one chunk (≤ 50 rows) of a checked roster; returns the one-time credential slips of new accounts. */
export async function commitRosterAction(input: RosterCommitInput): Promise<ActionResult<RosterChunkView>> {
  try {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await commitRosterChunk(actor, { ...input, schoolId }, await auditRequest());
    return { ok: true, data: result };
  } catch (error) {
    return failure(error, "school.roster.commit");
  }
}
