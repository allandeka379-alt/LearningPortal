import { chk, same, mdTable, py } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// A simple packet filter: rules are checked in order and the first match decides.
export const rules = [
  { n: 1, action: "ALLOW", port: 443, from: "any" },
  { n: 2, action: "ALLOW", port: 80, from: "any" },
  { n: 3, action: "ALLOW", port: 22, from: "10.0.0." },
  { n: 4, action: "BLOCK", port: "any", from: "any" },
];
export function filter(ruleList, src, port) {
  for (const r of ruleList) {
    const portOk = r.port === "any" || r.port === port;
    const fromOk = r.from === "any" || src.startsWith(r.from);
    if (portOk && fromOk) return { rule: r.n, action: r.action };
  }
  return { rule: null, action: "BLOCK" };
}
export const packets = [
  ["41.57.9.3", 443],
  ["10.0.0.15", 22],
  ["41.57.9.3", 22],
  ["196.2.4.8", 23],
  ["196.2.4.8", 80],
];
export const results = packets.map(([src, port]) => ({ src, port, ...filter(rules, src, port) }));
same(results.map((r) => r.action), ["ALLOW", "ALLOW", "BLOCK", "BLOCK", "ALLOW"]);
same(results.map((r) => r.rule), [1, 3, 4, 4, 2]);
export const rulesMd = mdTable(["Rule", "Action", "Destination port", "Source address"], rules.map((r) => [r.n, r.action, r.port === "any" ? "any" : r.port, r.from === "any" ? "any" : `starts with ${r.from}`]));
export const resultsMd = mdTable(["Packet", "Source address", "Destination port", "First matching rule", "Result"], results.map((r, i) => [i + 1, r.src, r.port, r.rule, r.action]));

// Account lock-out: 3 wrong attempts lock the account.
export const pinCombos = 10 ** 4;
export const attempts = 3;
export const pGuess = attempts / pinCombos;
chk(pGuess, 0.0003);
export const avgNoLimit = pinCombos / 2;
chk(avgNoLimit, 5000);

// Two-factor: probability both factors guessed (1 in 10,000 PIN and a one-time code of 6 digits, one attempt each).
export const pBoth = (1 / 10 ** 4) * (1 / 10 ** 6);
chk(pBoth, 1e-10, 1e-14);

if (process.argv[1]?.endsWith("w3a-protection-methods.mjs")) {
  console.log(rulesMd);
  console.log(resultsMd);
  console.log({ pGuess, avgNoLimit, pBoth });
  needs("security/protection-methods", [rulesMd, resultsMd, "0.03%", "5,000"]);
  console.log("lesson values OK");
}
