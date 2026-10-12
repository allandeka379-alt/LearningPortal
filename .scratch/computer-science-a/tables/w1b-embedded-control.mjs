import { chk, mdTable, round } from "../lib.mjs";
// ADC: 8-bit, 0 to 2.56 V, sensor gives 10 mV per degree C (0 V at 0 C)
const vmax = 2.56, bits = 8;
const step = vmax / 2 ** bits; // V per count
chk(step, 0.01);
const readingFor = (c) => Math.round(((c * 0.01) / vmax) * 2 ** bits);
const reading31 = readingFor(31);
chk(reading31, 31);
// Greenhouse control loop (hysteresis)
const readings = [22, 23, 25, 27, 28, 27, 25, 23];
let heater = false;
const rows = readings.map((r, i) => {
  const before = heater;
  if (r < 24) heater = true;
  else if (r > 26) heater = false;
  return [i + 1, r, r < 24 ? "below 24" : r > 26 ? "above 26" : "between 24 and 26", before ? "ON" : "OFF", heater ? "ON" : "OFF"];
});
const trace = mdTable(["Sample", "Reading (°C)", "Position", "Heater before", "Heater after"], rows);
const onCount = rows.filter((r) => r[4] === "ON").length;
// Resolution: 10-bit ADC over 5 V
const step10 = 5 / 2 ** 10;
const table = mdTable(
  ["Feature", "Monitoring system", "Control system"],
  [
    ["Purpose", "Measure and report or record values", "Measure, compare with a set value and act"],
    ["Uses actuators?", "No", "Yes"],
    ["Feedback to the input?", "No", "Yes: the action changes the next reading"],
    ["Example", "Clinic fridge logger that records temperature", "Greenhouse heater that keeps temperature in range"],
  ],
);
export const snips = {
  stepMv: String(step * 1000),
  reading31: String(reading31),
  trace,
  onCount: String(onCount),
  step10: String(round(step10 * 1000, 2)),
  table,
};
if (process.argv[1].endsWith("w1b-embedded-control.mjs")) console.log(snips);
