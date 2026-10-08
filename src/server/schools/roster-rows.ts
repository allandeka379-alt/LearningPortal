import type { RosterRow } from "./core";

/**
 * Roster-import helpers the browser runs (the import screen batches its commit requests). Kept apart from `./core`
 * on purpose: `./core` imports the login-identifier normalisers, whose Zod email schema would put the whole of Zod
 * (~90 kB gzip) into the import page's bundle.
 */

/** Rows committed per request (each row hashes a password, so chunks keep requests short). */
export const ROSTER_CHUNK_SIZE = 50;

/** Just the row fields the commit step takes back (drops dry-run annotations such as outcome and issues). */
export function rosterRowForCommit(row: RosterRow): RosterRow {
  return {
    row: row.row,
    firstName: row.firstName,
    lastName: row.lastName,
    form: row.form,
    className: row.className,
    email: row.email,
    phone: row.phone,
    parentPhone: row.parentPhone,
    studentNumber: row.studentNumber,
    subjects: [...row.subjects],
  };
}

/** Splits rows into commit chunks of {@link ROSTER_CHUNK_SIZE}. */
export function chunkRows<T>(rows: readonly T[], size: number = ROSTER_CHUNK_SIZE): T[][] {
  const chunks: T[][] = [];
  for (let start = 0; start < rows.length; start += size) chunks.push(rows.slice(start, start + size));
  return chunks;
}
