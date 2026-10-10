import { table, pctChange, dpStr, mean } from "../lib.mjs";
const conv = { yield: 1.6, sprays: 9, larvae: 14 };
const bt = { yield: 1.9, sprays: 3, larvae: 2 };
console.log(table(["Measurement (mean per hectare or per plant)", "Conventional cotton", "Bt cotton"], [["Seed cotton yield / tonnes per hectare", conv.yield.toFixed(1), bt.yield.toFixed(1)], ["Insecticide sprays per season", conv.sprays, bt.sprays], ["Bollworm larvae per 10 plants", conv.larvae, bt.larvae]]));
console.log(dpStr(pctChange(conv.yield, bt.yield), 1), dpStr(pctChange(conv.sprays, bt.sprays), 1));
// salmon
const w = [0.5, 1.0, 1.5, 2.0];
const gm = [180, 920, 2600, 4100], wild = [60, 250, 800, 1700];
console.log(table(["Age / years", ...w.map(String)], [["GM salmon mean mass / g", ...gm.map(String)], ["Non-GM salmon mean mass / g", ...wild.map(String)]]));
console.log((gm[3]/wild[3]).toFixed(2));
