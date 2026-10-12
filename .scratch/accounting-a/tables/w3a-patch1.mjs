import fs from "node:fs";
const BS = String.fromCharCode(92);
const U = "US" + BS + BS + "$"; // US\\$ as written in JS source
const p = ".scratch/accounting-a/slices/w3a-company-changes-in-equity.mjs";
let s = fs.readFileSync(p, "utf8");
const rep = [
  ["shares: 12000, par: 1, issuePrice: 1.4 }", "shares: 15000, par: 1, issuePrice: 1.4 }"],
  ["chk(prem3, 12000);", "chk(prem3, 13200);"],
  [`issued 12,000 ordinary shares of ${U}1 at ${U}1.40`, `issued 15,000 ordinary shares of ${U}1 at ${U}1.40`],
  ["New premium = 12,000 × 0.40 = 4,800; closing balance = 7,200 + 4,800 = 12,000. The new premium alone is 4,800.", "New premium = 15,000 × 0.40 = 6,000; closing balance = 7,200 + 6,000 = 13,200. The new premium alone is 6,000."],
  ["g3 = 9000;", "g3 = 9350;"],
  ["chk(ret3, 97970);", "chk(ret3, 97620);"],
  ["88,650 + 41,720 - 23,400 - 9,000 = 97,970. Leaving out the transfer gives 106,970.", "88,650 + 41,720 - 23,400 - 9,350 = 97,620. Leaving out the transfer gives 106,970."],
  ["const oA = [150000, 12000, 0, 20000, 47500];", "const oA = [152000, 12500, 0, 22000, 47500];"],
  ["const pA = 38640, dA = 15000, trA = 8000;", "const pA = 38640, dA = 16500, trA = 8200;"],
  ["shares: 40000, par: 1, issuePrice: 1.25 }", "shares: 45000, par: 1, issuePrice: 1.25 }"],
  [`"Issue of 40,000 shares at ${U}1.25"`, `"Issue of 45,000 shares at ${U}1.25"`],
  ["chk(sA.closing[1], 22000);", "chk(sA.closing[1], 23750);"],
  ["chk(sA.closing[4], 63140);", "chk(sA.closing[4], 61440);"],
  ["Premium on the issue 40,000 × 0.25", "Premium on the issue 45,000 × 0.25"],
  ["issued 40,000 shares at", "issued 45,000 shares at"],
  ["const oB = [180000, 24000, 18000, 32000, 61400];", "const oB = [186000, 24000, 17500, 33000, 61400];"],
  ["const pB = 46850, revB = 9000, dB2 = 21600;", "const pB = 46850, revB = 8400, dB2 = 21600;"],
  ["held: 180000, newPerOld: [1, 6]", "held: 186000, newPerOld: [1, 6]"],
  ["chk(bonusB.newShares, 30000);", "chk(bonusB.newShares, 31000);"],
  ["bonusB.fromReserves, -24000, 0, -6000, 0]", "bonusB.fromReserves, -24000, 0, -7000, 0]"],
  ["chk(sB.closing[0], 210000);", "chk(sB.closing[0], 217000);"],
  ["chk(sB.closing[3], 26000);", "chk(sB.closing[3], 26000);"],
  ["has issued 180,000 ordinary shares", "has issued 186,000 ordinary shares"],
  ["wrong: [bonusB.newShares / 6, 180000]", "wrong: [bonusB.newShares, 186000]"],
  [`"180,000 ÷ 6 = 30,000 shares of ${U}1 = ${U}30,000."`, `"186,000 ÷ 6 = 31,000 shares of ${U}1 = ${U}31,000."`],
  ["wrong: [r2(sB.total + 30000), r2(sB.total - revB)]", "wrong: [r2(sB.total + 31000), r2(sB.total - revB)]"],
  [`makes the company ${U}30,000 richer`, `makes the company ${U}31,000 richer`],
  [`"Reserves are converted into share capital and no cash is received"`, `"Reserves are capitalised and no cash is received"`],
];
for (const [a, b] of rep) {
  if (!s.includes(a)) console.log("MISSING:", a.slice(0, 60));
  s = s.split(a).join(b);
}
fs.writeFileSync(p, s);
