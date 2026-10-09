// Tables for lessons/transmission/encryption.md (w1b): Caesar-shift illustration of a symmetric key.
const caesar = (s, k) => s.replace(/[A-Z]/g, (c) => String.fromCharCode(((c.charCodeAt(0) - 65 + k + 26) % 26) + 65));
const p = "MEET AT NOON";
console.log(p, "->", caesar(p, 3), "-> back", caesar(caesar(p, 3), -3));
console.log("| Plaintext | " + [..."MEET"].join(" | ") + " |");
console.log("| Ciphertext (key 3) | " + [...caesar("MEET", 3)].join(" | ") + " |");
console.log("keys for 26 letters:", 25);
