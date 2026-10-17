// biology-o: enzymes/temperature-and-ph (temperature curve, pH curves) and photosynthesis graphs/apparatus
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

// ---------- temperature curve: optimum 37 C, rate zero by 60 C, low but not zero at 0-10 C
const OPT = 37, ZERO = 60;
const rate = (t) => (t <= OPT ? 0.3 + 9.7 * (t / OPT) ** 2.3 : Math.max(0, 10 * (1 - (t - OPT) / (ZERO - OPT)) ** 1.4));
{
  const ax = D.axes({ x: [0, 70], y: [0, 12], xTicks: 10, yTicks: [], xLabel: "Temperature (°C)", yLabel: "Rate of reaction", w: 560, h: 380, pad: { l: 50, r: 30, t: 30, b: 60 } });
  let b = ax.frame;
  b += ax.plot(rate, { stroke: C.blue, width: 3, domain: [0, 70] });
  b += ax.guides(OPT, rate(OPT));
  b += D.dot(ax.X(OPT), ax.Y(rate(OPT)), { r: 5, fill: C.amber, stroke: C.amber });
  b += ax.tag(OPT, 11.4, "Optimum: about 37 °C (body temperature)", { anchor: "middle", size: 13 });
  b += ax.label(1.5, 6.6, "Cold: slow, but the", { size: 13 }) + ax.label(1.5, 6.6, "enzyme is not damaged", { size: 13, dy: 17 });
  b += ax.label(44.5, 8.2, "Above the optimum:", { size: 13 }) + ax.label(44.5, 8.2, "enzyme denatured,", { size: 13, dy: 17 }) + ax.label(44.5, 8.2, "rate zero by 60 °C", { size: 13, dy: 34 });
  await D.figure(FAMILY, "enzyme-temperature-graph", D.svg(560, 380, b), {
    alt: "Graph of enzyme rate against temperature: the rate is low but not zero at 0 to 10 degrees Celsius, rises to a peak at the optimum of about 37 degrees Celsius, then falls much more steeply to zero by about 60 degrees Celsius as the enzyme is denatured.",
    caption: "Figure: the effect of temperature on the rate of an enzyme reaction",
  });
}

// ---------- pH curves: pepsin 2, salivary amylase 7, trypsin 8
{
  const peaks = [["Pepsin", 2, C.red], ["Amylase", 7, C.blue], ["Trypsin", 8.2, C.green]];
  const bell = (p, w) => (x) => 10 * Math.exp(-(((x - p) / w) ** 2));
  const ax = D.axes({ x: [0, 14], y: [0, 14], xTicks: 2, yTicks: [], xLabel: "pH", yLabel: "Rate of reaction", w: 560, h: 380, pad: { l: 50, r: 30, t: 30, b: 60 } });
  let b = ax.frame;
  const opts = { pepsin: 2, amylase: 7, trypsin: 8 };
  for (const [name, p, col] of peaks) {
    const pp = opts[name.toLowerCase()];
    b += ax.plot(bell(pp, name === "Pepsin" ? 1.6 : 1.9), { stroke: col, width: 3 });
  }
  b += ax.tag(0.3, 13, "Pepsin: pH 2 (stomach)", { anchor: "start", size: 13, fill: C.red });
  b += ax.tag(7, 11.6, "Amylase: pH 7 (mouth)", { anchor: "middle", size: 13, fill: C.blue });
  b += ax.tag(13.8, 13, "Trypsin: pH 8 (intestine)", { anchor: "end", size: 13, fill: C.green });
  await D.figure(FAMILY, "enzyme-ph-graph", D.svg(560, 380, b), {
    alt: "Graph of enzyme rate against pH for three enzymes: pepsin peaks at about pH 2 in the stomach, salivary amylase at about pH 7 in the mouth and trypsin at about pH 8 in the small intestine; each rate falls on both sides of its optimum pH.",
    caption: "Figure: each enzyme has its own optimum pH, and the rate falls on both sides of it",
  });
}

// ---------- placement
place(LES("enzymes/temperature-and-ph"), "The curve is not symmetrical", D.md("enzyme-temperature-graph", "Graph of enzyme rate against temperature: the rate is low but not zero at 0 to 10 degrees Celsius, rises to a peak at the optimum of about 37 degrees Celsius, then falls much more steeply to zero by about 60 degrees Celsius as the enzyme is denatured.", "Figure: the effect of temperature on the rate of an enzyme reaction"));
place(LES("enzymes/temperature-and-ph"), "A graph of rate against pH is a peak shape", D.md("enzyme-ph-graph", "Graph of enzyme rate against pH for three enzymes: pepsin peaks at about pH 2 in the stomach, salivary amylase at about pH 7 in the mouth and trypsin at about pH 8 in the small intestine; each rate falls on both sides of its optimum pH.", "Figure: each enzyme has its own optimum pH, and the rate falls on both sides of it"));
