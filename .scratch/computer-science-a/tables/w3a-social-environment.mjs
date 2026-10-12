import { chk, mdTable } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// Energy wasted by computers left switched on outside lessons.
export const pcs = 30;
export const idleKw = 0.05;
export const idleHours = 18;
export const perDay = pcs * idleKw * idleHours;
chk(perDay, 27);
export const perWeek = perDay * 5;
chk(perWeek, 135);
export const tariff = 0.12;
export const costWeek = perWeek * tariff;
chk(costWeek, 16.2, 1e-9);
export const term = perWeek * 13;
chk(term, 1755);

// E-waste: 40 computers of 9 kg are replaced; a recycler recovers 65% of the mass.
export const units = 40;
export const kg = 9;
export const mass = units * kg;
chk(mass, 360);
export const recovered = mass * 0.65;
chk(recovered, 234, 1e-9);
export const toDisposal = mass - recovered;
chk(toDisposal, 126, 1e-9);

export const energyMd = mdTable(["Quantity", "Working", "Result"], [
  ["Energy used per day by idle computers", "30 × 0.05 kW × 18 h", "27 kWh"],
  ["Energy per week (5 weekdays)", "27 × 5", "135 kWh"],
  ["Energy per term (13 weeks)", "135 × 13", "1755 kWh"],
  ["Cost per week at US\\$0.12 per kWh", "135 × 0.12", "US\\$16.20"],
]);

if (process.argv[1]?.endsWith("w3a-social-environment.mjs")) {
  console.log(energyMd);
  console.log({ mass, recovered, toDisposal });
  needs("ethics/social-environment", [energyMd, "360 kg", "234 kg", "126 kg"]);
  console.log("lesson values OK");
}
