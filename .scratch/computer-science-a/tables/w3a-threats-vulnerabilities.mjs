import { chk, same, py, pyBlock, mdTable } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// Password search space and brute-force time at a stated guess rate (guesses per second).
export const RATE = 1e9;
export const space = (chars, len) => BigInt(chars) ** BigInt(len);
export const fmtTime = (s) => {
  if (s < 0.001) return `${Number((s * 1e6).toPrecision(3))} microseconds`;
  if (s < 60) return `${Number(s.toPrecision(3))} seconds`;
  if (s < 3600) return `${Number((s / 60).toPrecision(3))} minutes`;
  if (s < 86400) return `${Number((s / 3600).toPrecision(3))} hours`;
  if (s < 86400 * 365) return `${Number((s / 86400).toPrecision(3))} days`;
  return `${Number((s / (86400 * 365)).toPrecision(2)).toLocaleString("en-US")} years`;
};
const commas = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const rows = [
  ["4-digit PIN", 10, 4],
  ["6 lower-case letters", 26, 6],
  ["8 lower-case letters", 26, 8],
  ["8 letters (both cases) and digits", 62, 8],
  ["12 letters (both cases) and digits", 62, 12],
].map(([label, chars, len]) => ({ label, chars, len, n: space(chars, len), time: fmtTime(Number(space(chars, len)) / RATE) }));
export const tableMd = mdTable(["Password type", "Characters to choose from", "Length", "Combinations", "Time to try all at 1 000 000 000 guesses per second"], rows.map((r) => [r.label, r.chars, r.len, r.n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), r.time]));

export const sqlCode = `import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (name TEXT, password TEXT, role TEXT)")
db.executemany("INSERT INTO users VALUES (?, ?, ?)",
               [("tendai", "maroon7", "student"),
                ("rudo", "kudu2024", "teacher"),
                ("admin", "Zx9!qLm4", "admin")])


def login_unsafe(name, password):
    query = "SELECT name, role FROM users WHERE name = '" + name + "' AND password = '" + password + "'"
    return db.execute(query).fetchall()


def login_safe(name, password):
    return db.execute("SELECT name, role FROM users WHERE name = ? AND password = ?",
                      (name, password)).fetchall()


print(login_unsafe("tendai", "wrong"))
print(login_unsafe("tendai", "' OR '1'='1"))
print(login_safe("tendai", "' OR '1'='1"))`;
export const sqlRun = pyBlock(sqlCode);
same(sqlRun.text.split("\n"), ["[]", "[('tendai', 'student'), ('rudo', 'teacher'), ('admin', 'admin')]", "[]"]);

// Denial of service: a small server handles 200 requests per second.
export const capacity = 200;
export const attackers = 50;
export const perBot = 40;
export const flood = attackers * perBot;
chk(flood, 2000);
export const share = Math.round((capacity / (flood + 150)) * 100); // genuine users' 150 requests/s share served

if (process.argv[1]?.endsWith("w3a-threats-vulnerabilities.mjs")) {
  console.log(tableMd);
  console.log(sqlRun.code, "\n", sqlRun.output);
  console.log({ flood, share });
  needs("security/threats-vulnerabilities", [...rows.map((r) => r.n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), ...rows.map((r) => r.time), sqlRun.text]);
  console.log("lesson values OK");
}
