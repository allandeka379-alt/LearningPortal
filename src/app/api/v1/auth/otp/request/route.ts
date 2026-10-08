import { requestLoginCodeForApi } from "@/server/api/account";
import { operations } from "@/server/api/contract";
import { requestMetaOf, v1Route } from "@/server/api/route";

/**
 * POST /api/v1/auth/otp/request — passwordless sign-in, step 1. `{ identifier }` (email or phone) -> 202
 * `{ data: { status: "code_sent", flowToken, channel, destination, expiresInSeconds, resendAfterSeconds } }`, identical
 * whether or not an account exists. Cooldown and send limits: src/server/auth/otp.ts.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.requestOtp, async (context) =>
  Response.json({ data: await requestLoginCodeForApi(context.body, requestMetaOf(context)) }, { status: 202 }),
);
