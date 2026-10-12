import { mdTable, chk } from "../lib.mjs";
// Economic feasibility for a clinic booking system.
const costs = [
  ["Computers and router", 1800],
  ["Software development", 2200],
  ["Staff training", 400],
];
const initial = costs.reduce((s, c) => s + c[1], 0);
chk(initial, 4400);
const monthlySaving = 275; // paper, filing and clerk time saved each month
const payback = initial / monthlySaving;
chk(payback, 16);
const years = 3;
const running = 60; // yearly running cost (US$)
const benefit3 = monthlySaving * 12 * years;
const runningTotal = running * 12 * years === 2160 ? 2160 : running * 12 * years;
const net3 = benefit3 - initial - runningTotal;
// running cost here is US$ 60 per month
chk(running * 12 * years, 2160);
chk(benefit3, 9900);
chk(net3, 3340);
// questionnaire
const sent = 120;
const returned = 78;
const rate = (returned / sent) * 100;
chk(rate, 65);
// interviews
const interviews = 12;
const mins = 30;
const hours = (interviews * mins) / 60;
chk(hours, 6);
export const snips = {
  costTable: mdTable(["Item", "Cost (US\\$)"], [...costs.map((c) => [c[0], c[1].toLocaleString("en-US").replace(/,/g, " ")]), ["**Total initial cost**", String(initial).replace(/(\d)(\d{3})$/, "$1 $2")]]),
  initial: String(initial).replace(/(\d)(\d{3})$/, "$1 $2"),
  monthlySaving: String(monthlySaving),
  payback: String(payback),
  benefit3: String(benefit3).replace(/(\d)(\d{3})$/, "$1 $2"),
  running: String(running),
  runningTotal: String(running * 12 * years).replace(/(\d)(\d{3})$/, "$1 $2"),
  net3: String(net3).replace(/(\d)(\d{3})$/, "$1 $2"),
  sent: String(sent), returned: String(returned), rate: String(rate),
  interviews: String(interviews), mins: String(mins), hours: String(hours),
};
if (process.argv[1].endsWith("w3b-fact-finding-feasibility.mjs")) console.log(snips);
