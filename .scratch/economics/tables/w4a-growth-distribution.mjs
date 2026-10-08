// Figures for lessons/population/growth-distribution.md (W4a).
import { table, population, pct, fmt, check } from "../lib.mjs";
// WE1: Country X over one year.
const pop = 15000000, births = 450000, deaths = 135000, imm = 20000, emi = 95000;
const br = population.ratePerThousand(births, pop), dr = population.ratePerThousand(deaths, pop);
const ni = population.naturalIncrease(br, dr), nm = population.netMigration(imm, emi);
const change = births - deaths + nm, growth = (change / pop) * 100;
console.log({ br, dr, ni, nm, change, growth, end: pop + change });
check("change", change, 240000);
// WE2: occupational distribution (thousands of workers).
const occ = [["Primary (farming, mining, forestry)", 3150], ["Secondary (manufacturing, construction)", 630], ["Tertiary (trade, transport, services)", 1470]];
const tot = occ.reduce((s, o) => s + o[1], 0);
console.log(table(["Sector", "Workers (thousands)", "Share of workers (%)"], [...occ.map(([n, w]) => [n, w, fmt((w / tot) * 100, 1)]), ["**Total**", `**${fmt(tot)}**`, "**100.0**"]]));
check("tot", tot, 5250);
