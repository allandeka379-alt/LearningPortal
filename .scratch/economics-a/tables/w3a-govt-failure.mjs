import { chk, linearMarket } from "../lib.mjs";
const base = { a: 104, b: 0.5, c: 8, d: 0.25 };
const mkt = linearMarket(base); console.log("market", mkt.quantity, mkt.price);
const mec = 12;
const opt = linearMarket({ ...base, c: base.c + mec }); console.log("optimum", opt.quantity, opt.price);
const wl0 = 0.5 * mec * (mkt.quantity - opt.quantity); console.log("wl no policy", wl0);
for (const tax of [12, 24, 18]) {
  const after = linearMarket({ ...base, c: base.c + tax });
  const gap = Math.abs(tax - mec);
  // welfare loss relative to optimum = 1/2 * |tax - mec| * |Qopt - Qtax|
  const wl = 0.5 * Math.abs(tax - mec) * Math.abs(opt.quantity - after.quantity);
  console.log("tax", tax, "Q", after.quantity, "P", after.price, "wl", wl, "revenue", tax*after.quantity);
}
// admin costs
console.log("net revenue", 1200-150, 150/1200*100);
