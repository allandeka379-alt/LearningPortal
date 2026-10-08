"use server";

import { redirect } from "next/navigation";
import { clearAuthFlowCookie } from "@/server/auth/flow-cookie";
import { logout } from "@/server/auth/flows";
import { clearSessionCookie, readSessionCookie, revokeSessionByToken, validateSessionToken } from "@/server/auth/sessions";
import { logger } from "@/server/lib/logger";
import { requestMeta } from "./_lib/action-helpers";

/**
 * Sign out (POST only, ARCHITECTURE §5.4: no state changes via GET). Revokes the current session, clears the cookies
 * and returns to the home page. Use through `<LogoutButton />` (src/components/auth/LogoutButton.tsx).
 */
export async function logoutAction(): Promise<void> {
  const token = await readSessionCookie();
  if (token !== null) {
    try {
      const validated = await validateSessionToken(token, { kind: "WEB" });
      if (validated !== null) await logout(validated.session, await requestMeta(), validated.user.roles);
      else await revokeSessionByToken(token, "logout");
    } catch (error) {
      // Signing out must always clear the browser state, even if the database write failed.
      logger.error("logout: session revoke failed", { err: error });
    }
  }
  await clearSessionCookie();
  await clearAuthFlowCookie();
  redirect("/");
}
