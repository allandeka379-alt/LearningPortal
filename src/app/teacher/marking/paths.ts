/**
 * `/teacher/marking[/<attemptId>]` → `/teacher/review[/<attemptId>]` (the spec / architecture name of the marking
 * queue). Only a well-formed `classId` filter is carried over; everything else is dropped. Pure.
 */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function reviewPathFor(attemptId: string | null, searchParams: Record<string, string | string[] | undefined> = {}): string {
  const base = attemptId !== null && UUID.test(attemptId) ? `/teacher/review/${attemptId}` : "/teacher/review";
  const raw = searchParams.classId;
  const classId = Array.isArray(raw) ? raw[0] : raw;
  return attemptId === null && classId && UUID.test(classId) ? `${base}?classId=${classId}` : base;
}
