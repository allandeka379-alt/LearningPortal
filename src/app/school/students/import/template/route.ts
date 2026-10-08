import { getActor } from "@/server/auth/actor";
import { ROSTER_TEMPLATE_HEADERS, toCsv } from "@/server/schools/core";

/**
 * GET /school/students/import/template — the roster import template (CSV header plus one example row with made-up
 * values that are clearly an example). School admins only; no school data is included.
 */
export async function GET(): Promise<Response> {
  const actor = await getActor();
  if (!actor || !actor.roles.includes("SCHOOL_ADMIN")) return new Response("Not found", { status: 404 });
  const csv = toCsv(ROSTER_TEMPLATE_HEADERS, [["Example", "Student", "Form 3", "3B", "", "", "0771234567", "2026-001", "Mathematics; English Language"]]);
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="student-roster-template.csv"',
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
