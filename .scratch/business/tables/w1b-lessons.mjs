// W1b lesson figures (printed and pasted into the lessons). Run: node .scratch/business/tables/w1b-lessons.mjs
import { table, money, f, check, fmt } from "../lib.mjs";

console.log("=== insurance.nature-purpose WE1 (pooling)");
{
  const members = 4000, fires = 20, avgLoss = 6000, loading = 10;
  const expected = fires * avgLoss; const perMember = expected / members; const premium = perMember + loading;
  console.log({ expected, perMember, premium });
}
console.log("=== insurance.nature-purpose WE2 (burial society)");
{
  const members = 80, funerals = 4, benefit = 600;
  const total = funerals * benefit; const perYear = total / members; const perMonth = perYear / 12;
  console.log({ total, perYear, perMonth });
}
console.log("=== insurance.principles WE1 (contribution)");
{
  const a = 30000, bb = 20000, loss = 15000; const tot = a + bb;
  const pa = (a / tot) * loss, pb = (bb / tot) * loss; check("contribution", pa + pb, loss);
  console.log({ tot, pa, pb });
}
console.log("=== insurance.principles WE2 (under-insurance)");
{
  const value = 80000, insured = 60000, loss = 20000; const pay = (insured / value) * loss; console.log({ pay, uninsured: loss - pay });
}
console.log("=== exchange-rates WE1");
{
  const rate = 18.5; const rand = 9250; const usd = f.toUsd(rand, rate); console.log({ usd });
  const usd2 = 640; console.log({ rand2: f.toForeign(usd2, rate) });
}
console.log("=== exchange-rates WE2");
{
  const price = 40; const r1 = 16, r2 = 18; console.log({ before: f.toForeign(price, r1), after: f.toForeign(price, r2) });
  // importer: buys machine priced 27,000 rand; US$ cost before/after
  console.log({ costBefore: f.toUsd(27000, r1), costAfter: f.toUsd(27000, r2) });
  console.log(table(["", "Before: US\\$1 = 16 rand", "After: US\\$1 = 18 rand"], [["Exporter: price of a US\\$40 item in rand", f.toForeign(price, r1), f.toForeign(price, r2)], ["Importer: US\\$ cost of a machine priced 27,000 rand", f.toUsd(27000, r1), f.toUsd(27000, r2)]]));
}
console.log("=== transport.choice example");
{
  const tonnes = 30; const road = 45 * tonnes; const rail = 32 * tonnes + 2 * 180; console.log({ road, rail, diff: road - rail });
  console.log(table(["Cost item", "Road US\\$", "Rail US\\$"], [["Haulage (30 tonnes)", 45 * tonnes, 32 * tonnes], ["Lorry to and from the stations", 0, 2 * 180], ["Total", road, rail]]));
}
