// Tables for lessons/algorithms/test-data.md: expected results computed from the validation rules.
import { mdTable } from "../slices/w4a-0-kit.mjs";

// WE1: tickets 1 to 10 (whole numbers).
const okT = (x) => typeof x === "number" && Number.isInteger(x) && x >= 1 && x <= 10;
const rowsT = [[4, "Normal"], [7, "Normal"], [15, "Abnormal"], [-3, "Abnormal"], ["four", "Abnormal"], [1, "Extreme"], [10, "Extreme"], ["0 and 1", "Boundary"], ["10 and 11", "Boundary"]];
console.log(mdTable(["Test data", "Type", "Expected result"], rowsT.map(([v, t]) => {
  if (typeof v === "string" && v.includes(" and ")) {
    const [a, b2] = v.split(" and ").map(Number);
    return [v, t, `${a} ${okT(a) ? "accepted" : "rejected"}, ${b2} ${okT(b2) ? "accepted" : "rejected"}`];
  }
  return [typeof v === "string" ? `"${v}"` : String(v), t, okT(v) ? "Accepted" : "Rejected"];
})) + "\n");

// WE2: password length 6 to 12 characters.
const okP = (s) => s.length >= 6 && s.length <= 12;
const tests = [
  ["Normal", "Mbare2024", "Valid length"],
  ["Abnormal", "cat", "Too short"],
  ["Abnormal", "", "Nothing entered"],
  ["Extreme", "Kwekwe", "Shortest valid"],
  ["Extreme", "Chimanimani1", "Longest valid"],
  ["Boundary", "Gokwe", "One below the shortest"],
  ["Boundary", "Chimanimani12", "One above the longest"],
];
console.log(mdTable(["Test", "Purpose", "Test data", "Length", "Type", "Expected result"], tests.map(([t, d, p], i) => [String(i + 1), p, d === "" ? "(empty)" : `\`${d}\``, String(d.length), t, okP(d) ? "Accepted" : "Rejected, error message"])));
