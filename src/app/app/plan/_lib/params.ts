/**
 * `?subjectIds=a,b` on /app/plan (the diagnostic report's "Create my study plan", §52 step 7): the subjects to tick in
 * the plan form. Pure. Only the student's own enrolled subjects survive (unknown or malformed ids are dropped,
 * duplicates removed, enrolment order kept); null when the parameter is absent or nothing valid remains.
 */
export function requestedPlanSubjectIds(raw: string | string[] | undefined, enrolledSubjectIds: readonly string[]): string[] | null {
  const values = (Array.isArray(raw) ? raw : raw === undefined ? [] : [raw]).flatMap((value) => value.split(","));
  const wanted = new Set(values.map((value) => value.trim().toLowerCase()).filter((value) => value.length > 0));
  if (wanted.size === 0) return null;
  const chosen = enrolledSubjectIds.filter((id) => wanted.has(id.toLowerCase()));
  return chosen.length > 0 ? chosen : null;
}

/**
 * Subjects ticked in the plan form: the requested ones for a new plan (else every subject); for an existing plan its
 * subjects plus any requested subject it does not cover yet (else every subject when the plan names none).
 */
export function planFormSubjectIds(input: {
  enrolledSubjectIds: readonly string[];
  planSubjectIds: readonly string[] | null;
  requested: readonly string[] | null;
}): { selected: string[]; addsSubjects: boolean } {
  const { enrolledSubjectIds, planSubjectIds, requested } = input;
  if (planSubjectIds === null) return { selected: [...(requested ?? enrolledSubjectIds)], addsSubjects: false };
  const base = planSubjectIds.length > 0 ? planSubjectIds : enrolledSubjectIds;
  const extra = (requested ?? []).filter((id) => !base.includes(id));
  const selected = new Set([...base, ...extra]);
  return { selected: enrolledSubjectIds.filter((id) => selected.has(id)), addsSubjects: extra.length > 0 };
}
