/**
 * MCQ option keys for the question editor. Pure and dependency-free: the editor runs in the browser and imports this
 * module directly, because `./core` pulls in the Zod question schemas (~90 kB gzip in a client bundle).
 */

const KEY_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * The next MCQ option key: the first letter not in `used` (current options AND every key the live question ever had,
 * because a key is never re-used for a different option across revisions), then `A1`, `B1`…
 */
export function nextOptionKey(used: Iterable<string>): string {
  const taken = new Set([...used].map((key) => key.toUpperCase()));
  for (let round = 0; round < 100; round += 1) {
    for (const letter of KEY_ALPHABET) {
      const key = round === 0 ? letter : `${letter}${round}`;
      if (!taken.has(key)) return key;
    }
  }
  throw new RangeError("No free option key.");
}
