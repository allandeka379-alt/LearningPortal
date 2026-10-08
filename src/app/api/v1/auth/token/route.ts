import { grantTokenWithPassword, revokeCurrentToken } from "@/server/api/account";
import { operations } from "@/server/api/contract";
import { requestMetaOf, v1Route } from "@/server/api/route";

/**
 * POST   /api/v1/auth/token  `{ identifier, password, label? }` -> 201 `{ data: { token, expiresAt, ... } }` (token shown
 *                            once), or 202 `{ data: { flowToken, ... } }` when the email / phone still needs verifying.
 * DELETE /api/v1/auth/token  revokes the bearer token of the request -> 204.
 *
 * Generic failures (one 401 for unknown identifier and wrong password); rate limits and lockout live in the auth flows
 * (src/server/api/account.ts, src/server/auth/flows.ts). Contract: src/server/api/contract.ts.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.createToken, async (context) => {
  const grant = await grantTokenWithPassword(context.body, requestMetaOf(context));
  return Response.json({ data: grant.data }, { status: grant.kind === "token" ? 201 : 202 });
});

export const DELETE = v1Route(operations.revokeToken, async (context) => {
  await revokeCurrentToken(context.auth, requestMetaOf(context));
});
