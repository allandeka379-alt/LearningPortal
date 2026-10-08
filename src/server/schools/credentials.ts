import "server-only";
import { randomInt } from "node:crypto";
import { LOGIN_USERNAME_PATTERN } from "@/server/auth/identifiers";
import { passwordPolicyErrors } from "@/server/auth/password-policy";
import { hashPassword } from "@/server/auth/passwords";
import { generatePublicUsername } from "@/server/auth/usernames";
import type { DbClient } from "@/server/db";
import { generateTemporaryPassword, provisionedUsernameCandidate, schoolUsernamePrefix } from "./core";

/**
 * Credentials of school-provisioned accounts (§23 roster import; schema `User.loginUsername`,
 * `User.provisionedBySchoolId`). Temporary passwords are generated here, hashed with Argon2id (the auth module's
 * `hashPassword`) and returned ONCE to the school admin for the printable slip: the plain text is never stored or
 * logged.
 */

const cryptoRandom = (max: number) => randomInt(0, max);

/** A fresh temporary password and its Argon2id hash. */
export async function issueTemporaryPassword(context: { username?: string | null } = {}): Promise<{ password: string; passwordHash: string }> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const password = generateTemporaryPassword(cryptoRandom);
    if (passwordPolicyErrors(password, { username: context.username ?? null }).length === 0) {
      return { password, passwordHash: await hashPassword(password) };
    }
  }
  throw new Error("issueTemporaryPassword: could not generate a policy-compliant password");
}

/**
 * Picks unused login usernames for a batch of students (`<school prefix>.<initial><surname><digits>`). Checks the
 * database in one query per round and avoids collisions inside the batch; callers hold the roster advisory lock so
 * concurrent imports cannot pick the same name (the unique index is the final guard).
 */
export async function allocateUsernames(
  client: DbClient,
  schoolSlug: string,
  people: readonly { key: string; firstName: string; lastName: string }[],
): Promise<Map<string, string>> {
  const prefix = schoolUsernamePrefix(schoolSlug);
  const result = new Map<string, string>();
  const reserved = new Set<string>();
  let pending = [...people];
  for (let round = 0; round < 6 && pending.length > 0; round += 1) {
    const digits = 2 + Math.floor(round / 2);
    const candidates = pending.map((person) => {
      let candidate = provisionedUsernameCandidate(prefix, person.firstName, person.lastName, cryptoRandom, digits);
      for (let i = 0; i < 5 && reserved.has(candidate); i += 1) {
        candidate = provisionedUsernameCandidate(prefix, person.firstName, person.lastName, cryptoRandom, digits + 1);
      }
      return { person, candidate };
    });
    const taken = new Set(
      (
        await client.user.findMany({ where: { loginUsername: { in: candidates.map((c) => c.candidate) } }, select: { loginUsername: true } })
      ).map((row) => row.loginUsername),
    );
    const next: typeof pending = [];
    for (const { person, candidate } of candidates) {
      if (taken.has(candidate) || reserved.has(candidate) || !LOGIN_USERNAME_PATTERN.test(candidate)) {
        next.push(person);
      } else {
        reserved.add(candidate);
        result.set(person.key, candidate);
      }
    }
    pending = next;
  }
  if (pending.length > 0) throw new Error("allocateUsernames: could not find free usernames");
  return result;
}

/** A public leaderboard handle (Profile.username), never the login username and never the real name (§20). */
export async function allocatePublicHandle(client: DbClient): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = generatePublicUsername(cryptoRandom, attempt >= 4 ? 2 : 0);
    const taken = await client.profile.findUnique({ where: { username: candidate }, select: { userId: true } });
    if (!taken) return candidate;
  }
  return generatePublicUsername(cryptoRandom, 6);
}
