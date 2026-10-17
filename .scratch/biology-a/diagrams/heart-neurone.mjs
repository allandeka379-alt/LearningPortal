// biology-a cardiac cycle pressure graph and action potential trace. Run: node .scratch/biology-a/diagrams/heart-neurone.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, curve, fig } from "./_h.mjs";

// ---- Cardiac cycle: the lesson's pressure table
{
  const t = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
  const la = [1.0, 1.5, 0.6, 0.7, 0.9, 1.0, 0.9, 0.9, 1.0];
  const lv = [0.8, 1.2, 15.0, 16.0, 8.0, 0.6, 0.6, 0.7, 0.8];
  const ao = [11.0, 10.7, 14.5, 15.5, 13.2, 12.6, 12.0, 11.5, 11.0];
  const ax = D.axes({ x: [0, 0.8], y: [0, 20], w: 600, h: 420, xTicks: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8], yTicks: 2, xLabel: "Time / s", yLabel: "Pressure / kPa", pad: { l: 64, r: 40, t: 34, b: 58 } });
  let b = ax.frame;
  b += curve(ax, t.map((x, i) => [x, ao[i]]), { stroke: C.red }) + curve(ax, t.map((x, i) => [x, lv[i]]), { stroke: C.blue }) + curve(ax, t.map((x, i) => [x, la[i]]), { stroke: C.amber });
  t.forEach((x, i) => { b += ax.point(x, lv[i], { stroke: C.blue, r: 3 }); });
  b += ax.tag(0.45, 16.5, "left ventricle", { fill: C.blue }) + ax.tag(0.62, 13.8, "aorta", { fill: C.red }) + ax.tag(0.55, 3.4, "left atrium", { fill: C.amber });
  b += D.text(ax.X(0.008), ax.Y(7), "0.1 s: AV valve open,\natrial systole", { size: 12, fill: C.muted }) + D.line(ax.X(0.1), ax.Y(6.2), ax.X(0.1), ax.Y(1.7), { stroke: C.muted, width: 1 });
  b += D.line(ax.X(0.25), ax.Y(18.2), ax.X(0.25), ax.Y(0), { stroke: C.muted, width: 1, dash: true });
  b += D.text(ax.X(0.25), ax.Y(19.2), "0.2-0.3 s: AV closed, semilunar open", { size: 12, anchor: "middle", fill: C.muted });
  b += D.line(ax.X(0.4) + 5, ax.Y(8), ax.X(0.5) - 2, ax.Y(9.5), { stroke: C.muted, width: 1 }) + D.text(ax.X(0.5), ax.Y(9.9), "0.4 s: ventricle 8.0 < aorta\n13.2, semilunar valve closed", { size: 12, fill: C.muted });
  const alt = "Pressure in the left atrium, left ventricle and aorta over one 0.8 s cardiac cycle: ventricular pressure jumps from 1.2 to 15.0 kPa between 0.1 and 0.2 s and peaks at 16.0 kPa at 0.3 s, above the aortic 14.5 to 15.5 kPa so the semilunar valve opens; by 0.4 s the ventricle (8.0) is below the aorta (13.2) and it shuts, while aortic pressure never falls below 10.7 kPa.";
  const cap = "Figure: pressure changes in the left side of the heart during one cycle (data from the worked solution)";
  await fig("cardiac-cycle-pressure-graph", D.svg(600, 420, b), alt, cap, "mammal-transport/heart", "3. **Diastole");
}

// ---- Action potential trace: the lesson's worked-solution readings
{
  const t = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0];
  const v = [-70, -55, 35, -10, -65, -80, -75, -70];
  const ax = D.axes({ x: [0, 4], y: [-100, 50], w: 600, h: 420, xTicks: 0.5, yTicks: [-80, -60, -40, -20, 0, 20, 40], xLabel: "Time / ms", yLabel: "Potential difference / mV", origin: false, pad: { l: 70, r: 40, t: 34, b: 58 } });
  let b = ax.frame;
  b += D.line(ax.X(0), ax.Y(-55), ax.X(4), ax.Y(-55), { stroke: C.red, width: 1.4, dash: true }) + D.text(ax.X(4), ax.Y(-55) - 6, "threshold about −55", { anchor: "end", size: 13, fill: C.red });
  b += D.line(ax.X(0), ax.Y(-70), ax.X(4), ax.Y(-70), { stroke: C.muted, width: 1.4, dash: true }) + D.text(ax.X(4), ax.Y(-70) + 18, "resting −70", { anchor: "end", size: 13, fill: C.muted });
  b += curve(ax, t.map((x, i) => [x, v[i]]), { stroke: C.blue });
  t.forEach((x, i) => { b += ax.point(x, v[i], { stroke: C.blue, r: 3.5 }); });
  b += ax.tag(1.0, 35, "peak +35 mV at 1.0 ms", { dx: 12, dy: -2 });
  b += ax.tag(2.5, -90, "−80 mV: hyperpolarisation", { dx: -80 });
  b += D.text(ax.X(0.8), ax.Y(15), "Na⁺ enters", { size: 13, anchor: "end", fill: C.blue });
  b += D.text(ax.X(1.45) + 10, ax.Y(15), "K⁺ leaves", { size: 13, fill: C.blue });
  const alt = "Action potential trace from the worked solution: resting potential −70 mV, rising past the −55 mV threshold to a peak of +35 mV at 1.0 ms as sodium ions enter, then falling as potassium ions leave through −65 mV at 2.0 ms to a hyperpolarisation of −80 mV at 2.5 ms and back to −70 mV by 4.0 ms.";
  const cap = "Figure: an action potential at one point on an axon, with the ion movements that cause each phase";
  await fig("action-potential-trace", D.svg(600, 420, b), alt, cap, "coordination/action-potential", "The whole event lasts about 2-3 ms");
}
