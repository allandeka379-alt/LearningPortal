// Lesson numbers for soil/types: drainage funnel experiment (worked example).
import { pct, round, table } from "../lib.mjs";
const poured = 200;
const drained = { "Sandy soil": 150, "Loam soil": 110, "Clay soil": 64 };
const rows = Object.entries(drained).map(([s, d]) => [s, poured, d, poured - d, round(pct(poured - d, poured), 1)]);
console.log(table(["Soil", "Water poured (mL)", "Water collected (mL)", "Water retained (mL)", "Retained (%)"], rows));
