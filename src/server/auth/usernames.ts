import { randomInt } from "node:crypto";

/**
 * Public handles (`Profile.username`, §20): auto-generated at registration so the default leaderboard identity never
 * exposes a real name, e.g. "swiftkudu482". Format `^[a-z0-9_]{3,30}$` (Profile_username_format_chk).
 *
 * Words are neutral and positive; animals are ones learners in the region know. Not a login key.
 */

const ADJECTIVES = [
  "able", "agile", "amber", "bold", "brave", "bright", "calm", "clever", "cool", "eager", "fair", "fast", "gentle",
  "golden", "grand", "happy", "humble", "keen", "kind", "lively", "lucky", "mighty", "noble", "proud", "quick",
  "quiet", "rapid", "royal", "sharp", "shiny", "smart", "steady", "strong", "sunny", "swift", "true", "vivid",
  "wise", "witty", "young",
] as const;

const ANIMALS = [
  "baobab", "buffalo", "cheetah", "crane", "duiker", "eagle", "eland", "elephant", "falcon", "gemsbok", "giraffe",
  "heron", "hippo", "hornbill", "hyrax", "ibis", "impala", "jackal", "kudu", "leopard", "lion", "meerkat", "nyala",
  "oribi", "oryx", "pangolin", "rhino", "roller", "sable", "serval", "springbok", "sunbird", "tsessebe", "weaver",
  "zebra",
] as const;

export const PUBLIC_USERNAME_PATTERN = /^[a-z0-9_]{3,30}$/;

/** Random integer in [0, max) — injectable for tests. */
export type RandomInt = (max: number) => number;

const cryptoRandom: RandomInt = (max) => randomInt(0, max);

function pick<T>(items: readonly T[], random: RandomInt): T {
  const item = items[random(items.length)];
  if (item === undefined) throw new Error("pick: empty list");
  return item;
}

/**
 * A new candidate handle: adjective + animal + 3 digits. Callers retry on a unique-constraint conflict (the space is
 * ~1.4 million combinations; add digits via `extraDigits` on retries).
 */
export function generatePublicUsername(random: RandomInt = cryptoRandom, extraDigits = 0): string {
  const digitCount = 3 + Math.max(0, Math.min(extraDigits, 6));
  let digits = "";
  for (let i = 0; i < digitCount; i += 1) digits += String(random(10));
  return `${pick(ADJECTIVES, random)}${pick(ANIMALS, random)}${digits}`;
}
