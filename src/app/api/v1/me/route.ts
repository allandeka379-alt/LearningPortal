import { getMe } from "@/server/api/account";
import { operations } from "@/server/api/contract";
import { v1Route } from "@/server/api/route";

/** GET /api/v1/me — the signed-in user (any role) and the current session. Works while a password change is pending. */

export const runtime = "nodejs";

export const GET = v1Route(operations.getMe, ({ auth }) => getMe(auth));
