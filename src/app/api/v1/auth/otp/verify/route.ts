import { verifyLoginCodeForApi } from "@/server/api/account";
import { operations } from "@/server/api/contract";
import { requestMetaOf, v1Route } from "@/server/api/route";

/**
 * POST /api/v1/auth/otp/verify — passwordless sign-in, step 2. `{ flowToken, code, label? }` -> 201
 * `{ data: { token, expiresAt, ... } }` (token shown once). A wrong / expired code or flow token is one generic 422.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.verifyOtp, async (context) =>
  Response.json({ data: await verifyLoginCodeForApi(context.body, requestMetaOf(context)) }, { status: 201 }),
);
