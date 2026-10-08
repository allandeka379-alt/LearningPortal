import "server-only";
import { hash, parseOptions, verify, type Algorithm, type Options } from "@node-rs/argon2";
import { randomToken } from "@/server/lib/crypto";
import { logger } from "@/server/lib/logger";
import { PASSWORD_MAX_LENGTH } from "./password-policy";

/**
 * Password hashing (§39, ARCHITECTURE §5.1): Argon2id with the OWASP baseline parameters (19 MiB memory, 2 passes,
 * parallelism 1). Hashes are self-describing PHC strings (`$argon2id$v=19$m=19456,t=2,p=1$…`), so parameters can be
 * raised later: {@link verifyPassword} reports `needsRehash` and the login flow re-hashes transparently.
 *
 * Passwords are NFKC-normalised before hashing so the same visible password typed on different keyboards (composed
 * vs decomposed accents, full-width digits) verifies. Policy checks live in ./password-policy.
 */

/** Current Argon2id parameters. Changing them makes existing hashes report `needsRehash` on the next login. */
export const ARGON2_PARAMS = Object.freeze({ memoryCost: 19_456, timeCost: 2, parallelism: 1, outputLen: 32 });

/** `Algorithm.Argon2id` (the package exports a const enum, which isolatedModules cannot reference). */
const ARGON2ID = 2 as Algorithm;

const HASH_OPTIONS: Options = { ...ARGON2_PARAMS, algorithm: ARGON2ID };

/** Upper bound on what we are willing to feed to Argon2 at verify time (policy max is 128 code points). */
const MAX_VERIFY_INPUT = PASSWORD_MAX_LENGTH * 4;

function prepare(password: string): string {
  return password.normalize("NFKC");
}

/** Hashes a password with Argon2id. Callers must run the policy check first. */
export async function hashPassword(password: string): Promise<string> {
  if (password.length === 0) throw new Error("hashPassword: empty password");
  return hash(prepare(password), HASH_OPTIONS);
}

/** True when `passwordHash` was not produced with the current algorithm and parameters. */
export function passwordNeedsRehash(passwordHash: string): boolean {
  try {
    const params = parseOptions(passwordHash);
    return (
      params.algorithm !== ARGON2ID ||
      params.memoryCost !== ARGON2_PARAMS.memoryCost ||
      params.timeCost !== ARGON2_PARAMS.timeCost ||
      params.parallelism !== ARGON2_PARAMS.parallelism ||
      params.outputLen !== ARGON2_PARAMS.outputLen
    );
  } catch {
    return true;
  }
}

export interface PasswordVerification {
  valid: boolean;
  /** The hash is valid but uses outdated parameters: store `await hashPassword(password)` after a successful login. */
  needsRehash: boolean;
}

/**
 * Verifies `password` against a stored Argon2 PHC string in constant time. Malformed hashes verify as `false` (and
 * are logged), never throw.
 */
export async function verifyPassword(passwordHash: string, password: string): Promise<PasswordVerification> {
  if (password.length === 0 || password.length > MAX_VERIFY_INPUT) return { valid: false, needsRehash: false };
  try {
    const valid = await verify(passwordHash, prepare(password));
    return { valid, needsRehash: valid && passwordNeedsRehash(passwordHash) };
  } catch (error) {
    logger.error("password hash could not be verified (malformed hash)", { err: error });
    return { valid: false, needsRehash: false };
  }
}

let dummyHash: Promise<string> | undefined;

/**
 * Burns the same CPU time as a real verification and returns `false`. Call it when the account does not exist (or
 * has no password) so response times do not reveal which identifiers are registered.
 */
export async function verifyDummyPassword(password: string): Promise<false> {
  dummyHash ??= hash(randomToken(16), HASH_OPTIONS);
  try {
    await verify(await dummyHash, prepare(password.slice(0, MAX_VERIFY_INPUT) || "x"));
  } catch {
    // ignore: only the timing matters
  }
  return false;
}
