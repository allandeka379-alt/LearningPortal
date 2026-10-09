// Values printed in the w3a network and security lessons (computed, never typed by hand).
// Run: node .scratch/computer-science/tables/w3a-networks.mjs
import { toBase, group } from "../lib.mjs";

// Topologies: cables needed for n computers.
const mesh = (n) => (n * (n - 1)) / 2;
console.log("## topologies");
for (const n of [4, 5, 6, 8, 10]) console.log(`n=${n}: star ${n} cables to the switch, ring ${n}, full mesh ${mesh(n)}`);

// Transmission media: time to send a file.
console.log("\n## media");
const t = (megabits, rate) => megabits / rate;
console.log(`800 megabits at 100 Mbit/s: ${t(800, 100)} s; at 1000 Mbit/s: ${t(800, 1000)} s`);

// Addressing.
console.log("\n## addressing");
const mac = "00:1B:44:3A:9C:E7";
const parts = mac.split(":");
console.log("MAC", mac, "manufacturer", parts.slice(0, 3).join(":"), "serial", parts.slice(3).join(":"));
console.log("MAC bits", parts.length * 8, "hex digits", parts.length * 2);
for (const h of ["1B", "E7"]) console.log(h, "=", parseInt(h, 16), "=", toBase(parseInt(h, 16), 2, 8));
const ip = [192, 168, 10, 25];
console.log("IPv4", ip.join("."), "->", ip.map((o) => toBase(o, 2, 8)).join("."));
console.log("IPv4 total addresses", 2 ** 32, "IPv4 bits", 32, "octet max", 2 ** 8 - 1);
console.log("IPv6 bits", 128, "groups", 128 / 16, "hex digits per group", 16 / 4);
const v6full = "2001:0db8:0000:0000:0000:0a0b:0000:0042";
const v6short = v6full
  .split(":")
  .map((g) => g.replace(/^0+(?=.)/, ""))
  .join(":")
  .replace(/(^|:)0(:0)+(:|$)/, "::");
console.log("IPv6", v6full, "->", v6short);
console.log("binary", group(toBase(0x1b, 2, 8)));

// Cloud: photos on a plan.
console.log("\n## cloud");
console.log(`5 GiB plan of 4 MiB photos: ${(5 * 1024) / 4}`);

// Brute force: key spaces.
console.log("\n## brute force");
console.log(`4-digit PIN: ${10 ** 4}; 6-digit PIN: ${10 ** 6}; 3 attempts out of 10^4 chance ${3 / 10 ** 4}`);
console.log(`lower-case letters, 8 chars: ${26 ** 8}; 62 symbols, 8 chars: ${62 ** 8}; ratio ${(62 ** 8 / 26 ** 8).toFixed(0)}`);

// Place-value tables for the addressing lesson.
const pv = (n) => {
  const bits = toBase(n, 2, 8).split("");
  return `| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |\n|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|\n| ${bits.join(" | ")} |`;
};
console.log("\n## place value 192\n" + pv(192));
console.log("\n## place value 0x1B\n" + pv(0x1b));
console.log("IPv6 upper", v6full.toUpperCase(), "->", v6short.toUpperCase());
