import "server-only";
import { hmacSha256 } from "@/server/lib/crypto";
import { anonymousPseudonym } from "./core";

/**
 * Stable "Student #1234" shown for a student who appears on leaderboards anonymously (§20): a keyed digest of the
 * user id, so the label can never be reversed to an id. One function for the boards (./service) and the settings
 * preview (src/server/accounts/student-settings.ts), so a student sees exactly the name others see.
 */
export function pseudonymFor(userId: string): string {
  return anonymousPseudonym(hmacSha256(`leaderboard:anon:${userId}`));
}
