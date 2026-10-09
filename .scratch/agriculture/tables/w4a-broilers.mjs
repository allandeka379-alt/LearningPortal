// Lesson numbers for livestock/broilers (Rudo's batch of 200).
import { fcr, dressingPct, mortalityPct, grossMargin, round, check, table, money } from "../lib.mjs";
const placed = 200, died = 6, alive = placed - died;
console.log("mortality", mortalityPct({ died, started: placed }));
const liveKg = 2.2, chickKg = 0.04, feedKg = 680;
const gain = alive * liveKg - placed * chickKg;
console.log("live mass", alive * liveKg, "chick mass", placed * chickKg, "gain", gain, "FCR", fcr({ feedKg, gainKg: gain }), round(fcr({ feedKg, gainKg: gain }), 2));
console.log("dressing", dressingPct({ carcassKg: 1.6, liveKg: 2.2 }));
const gm = grossMargin({
  output: [["Dressed broilers", alive, 5]],
  variable: [["Day-old chicks (200 at US$0.80)", 160], ["Feed (680 kg at US$0.60/kg)", 408], ["Vaccines and medicines", 18], ["Litter and disinfectant", 20], ["Heating fuel", 33], ["Packaging", 16]],
});
console.log(gm.grossOutput, gm.variableCosts, gm.grossMargin, "per bird", gm.grossMargin / alive);
console.log(table(["Item", "US\$"], [...gm.variableRows.map(([i, a]) => [i, a]), ["Total variable costs", gm.variableCosts]]));
console.log("floor m2 at 10/m2", placed / 10);
