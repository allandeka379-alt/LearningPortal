import { loadActor, type Actor } from "@/server/auth/actor";
import { isAppError } from "@/server/lib/errors";

/** Helpers for the family integration tests (not used by application code). */

/** The Actor a session would build for `userId` (roles + school memberships from the database). */
export async function actorOf(userId: string): Promise<Actor> {
  const actor = await loadActor(userId);
  if (!actor) throw new Error("actor not loadable");
  return actor;
}

/** The AppError code a promise rejects with (`null` when it resolves). */
export async function errorCodeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${(error as Error).message}`;
  }
}

/** A random private IPv4 address, so IP-keyed rate-limit buckets never collide between tests. */
export function randomTestIp(): string {
  const octet = () => Math.floor(Math.random() * 254) + 1;
  return `10.${octet()}.${octet()}.${octet()}`;
}

/** Injectable platform switch values. */
export const switchOn = async () => true;
export const switchOff = async () => false;
