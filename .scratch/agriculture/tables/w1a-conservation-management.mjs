import { money } from "../lib.mjs";
// Worked example: fictional district shares US$48,000 hunting income: wards 60%, council 25%, wildlife management 15%
const total = 48000;
const shares = [["Producer wards", 60], ["Rural district council administration", 25], ["Wildlife management (patrols, water points)", 15]];
for (const [n, p] of shares) console.log(n, (total * p) / 100, money((total * p) / 100));
// ward share split between 4 wards equally then 50% to households (300 households in one ward)
const ward = (total * 60) / 100 / 4; console.log("each ward", ward, "household half", ward / 2, "per household", ward / 2 / 300);
