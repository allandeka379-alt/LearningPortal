import { chk, same, mdTable } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// Our own convention: score = likelihood x impact, each on a scale of 1 to 5. Low 1-5, Medium 6-12, High 15-25.
export const band = (s) => (s <= 5 ? "Low" : s <= 12 ? "Medium" : "High");
export const risks = [
  ["Malware infection", 4, 4],
  ["Power cuts and load-shedding", 5, 2],
  ["Staff deleting files by mistake", 4, 3],
  ["Theft of a laptop", 3, 3],
  ["Flood in the server room", 1, 4],
  ["Fire", 1, 5],
].map(([name, l, i]) => ({ name, l, i, score: l * i, band: band(l * i) }));
same(risks.map((r) => r.score), [16, 10, 12, 9, 4, 5]);
same(risks.map((r) => r.band), ["High", "Medium", "Medium", "Medium", "Low", "Low"]);
export const riskMd = mdTable(["Risk", "Likelihood (1-5)", "Impact (1-5)", "Score", "Level"], risks.map((r) => [r.name, r.l, r.i, r.score, r.band]));

// Backup storage: full backup every Sunday (40 GB) and an incremental each other day (2 GB), kept for 4 weeks.
export const full = 40;
export const inc = 2;
export const weeks = 4;
export const storagePlan = weeks * full + weeks * 6 * inc;
export const storageAllFull = weeks * 7 * full;
chk(storagePlan, 208);
chk(storageAllFull, 1120);
// Restore after a failure on Thursday morning: last full (Sunday) + incrementals Monday, Tuesday, Wednesday.
export const restoreGB = full + 3 * inc;
chk(restoreGB, 46);
export const restoreMB = restoreGB * 1024;
chk(restoreMB, 47104);
export const restoreSecs = restoreMB / 100;
chk(restoreSecs, 471.04, 1e-6);
export const restoreMin = Math.round((restoreSecs / 60) * 10) / 10;
chk(restoreMin, 7.9, 1e-6);

// Expected annual loss for power cuts: 6 hours of lost sales at US$120 an hour, 4 incidents a year; a UPS costs US$150 a year and removes 3 of the 4.
export const lossPerHour = 120;
export const hoursPerIncident = 6;
export const incidents = 4;
export const lossPerIncident = lossPerHour * hoursPerIncident;
export const lossPerYear = lossPerIncident * incidents;
chk(lossPerIncident, 720);
chk(lossPerYear, 2880);
export const remainingIncidents = 1;
export const lossAfter = lossPerIncident * remainingIncidents;
export const saving = lossPerYear - lossAfter;
chk(saving, 2160);
export const upsCost = 150;
export const net = saving - upsCost;
chk(net, 2010);

if (process.argv[1]?.endsWith("w3a-risk-recovery-policies.mjs")) {
  console.log(riskMd);
  console.log({ storagePlan, storageAllFull, restoreGB, restoreSecs, restoreMin, lossPerIncident, lossPerYear, saving, net });
  needs("security/risk-recovery-policies", [riskMd, "208 GB", "1120 GB", "46 GB", "47,104 MB", "471.04", "US\\$720", "US\\$2,880", "US\\$2,160", "US\\$2,010"]);
  console.log("lesson values OK");
}
