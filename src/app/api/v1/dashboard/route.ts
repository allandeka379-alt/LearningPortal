import { operations } from "@/server/api/contract";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";
import { getStudentDashboard } from "@/server/progress/service";

/** GET /api/v1/dashboard — the student dashboard read model (§6), the same one the web /app page renders. */

export const runtime = "nodejs";

export const GET = v1Route(operations.getDashboard, async ({ actor }) => toJson(await getStudentDashboard(actor)));
