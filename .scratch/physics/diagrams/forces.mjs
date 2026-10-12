// Run: node .scratch/physics/diagrams/forces.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", L = `content/subjects/${F}/lessons/forces`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${L}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const tri = (x, y, s = 22) => D.polyline([[x, y], [x - s, y + s * 1.4], [x + s, y + s * 1.4]], { fill: C.fillGrey, close: true });

// ---- moments: see-saw balance, 300 N at 2.0 m vs 750 N at 0.80 m (100 px per metre)
{
  const px = 300, y = 120, k = 100;
  const dc = 2.0, df = 0.8, Wc = 300, Wf = 750;
  const xc = px - dc * k, xf = px + df * k;
  let b = D.rect(60, y - 8, 480, 8, { fill: C.fillAmber }) + tri(px, y, 20) +
    D.arrow(xc, y - 90, xc, y - 10, { stroke: C.red, width: 3 }) + M(xc, y - 100, `${Wc} N`, { weight: 700, fill: C.red }) +
    D.arrow(xf, y - 90, xf, y - 10, { stroke: C.red, width: 3 }) + M(xf, y - 100, `${Wf} N`, { weight: 700, fill: C.red }) +
    D.line(xc, y + 45, px, y + 45, { stroke: C.blue, width: 1.8, arrow: true, arrowStart: true }) + M((xc + px) / 2, y + 66, `${dc.toFixed(1)} m`, { fill: C.blue }) +
    D.line(px, y + 45, xf, y + 45, { stroke: C.blue, width: 1.8, arrow: true, arrowStart: true }) + M((px + xf) / 2, y + 66, `${df.toFixed(2)} m`, { fill: C.blue }) +
    M(px, y + 100, "pivot", { fill: C.muted }) +
    "";
  b += M(300, 262, `${Wc} × ${dc.toFixed(1)} = ${Wc * dc} N m anticlockwise = ${Wf} × ${df.toFixed(2)} = ${Wf * df} N m clockwise`, { weight: 700 });
  const alt = "See-saw balanced about a pivot: the child's 300 N weight acts 2.0 m to the left and her father's 750 N weight acts 0.80 m to the right. The anticlockwise moment, 300 times 2.0, is 600 N m and equals the clockwise moment, 750 times 0.80, also 600 N m.";
  await put("moments-seesaw-balance", 600, 290, b, alt, "Figure: a see-saw balances when clockwise and anticlockwise moments are equal", "moments", "Where must her father, of weight");
}

// ---- moments: beam with three weights (5 px per cm)
{
  const px = 300, y = 120, k = 5;
  const loads = [{ d: -30, N: 4.0 }, { d: 20, N: 2.0 }, { d: 40, N: 2.0, W: true }];
  let b = D.rect(px - 250, y - 8, 500, 8, { fill: C.fillAmber }) + tri(px, y, 18) + M(px, y + 56, "pivot (centre of beam)", { fill: C.muted });
  for (const l of loads) {
    const x = px + l.d * k;
    b += D.line(x, y, x, y + 40, { stroke: C.ink, width: 1.4 }) + D.rect(x - 14, y + 40, 28, 22, { fill: C.fillGrey, r: 3 }) + M(x, y + 56, "", {});
    b += D.arrow(x, y - 70, x, y - 12, { stroke: C.red, width: 3 }) + M(x, y - 80, `${l.N.toFixed(1)} N${l.W ? " = W" : ""}`, { weight: 700, fill: C.red });
    b += M(x, y + 86, `${Math.abs(l.d)} cm`, { fill: C.blue });
  }
  b += M(300, 250, "anticlockwise: 4.0 × 30 = 120 N cm", { anchor: "middle" }) + M(300, 274, "clockwise: 2.0 × 20 + W × 40 = 40 + 40W; balance gives W = 2.0 N", { weight: 700 });
  const alt = "Uniform beam pivoted at its centre: 4.0 N hangs 30 cm to the left; 2.0 N hangs 20 cm and an unknown weight W hangs 40 cm to the right. Anticlockwise moment is 120 N cm, so 40 plus 40W equals 120 and W is 2.0 N.";
  await put("moments-beam-three-weights", 600, 295, b, alt, "Figure: balancing a beam with more than one weight on a side", "moments", "Because the beam is uniform and pivoted at its centre");
}

// ---- elasticity: load-extension graph, 1.0 cm per N (k = 100 N/m) up to limit at 6 N
{
  const lim = 6;
  const ext = (F0) => (F0 <= lim ? F0 : lim + (F0 - lim) * 1.0 + 0.35 * (F0 - lim) ** 2);
  const ax = D.axes({ x: [0, 10], y: [0, 12], xTicks: 2, yTicks: 2, xLabel: "Load (N)", yLabel: "Extension (cm)", w: 560, h: 400 });
  const b = ax.frame + ax.plot(ext, { domain: [0, 9], steps: 200 }) + ax.line([[4, 0], [4, 4], [0, 4]], { stroke: C.muted, width: 1.4, dash: true }).replace("", "") + ax.point(4, 4) +
    ax.point(lim, lim, { fill: "#fff", stroke: C.amber, r: 6 }) + ax.tag(6, 6, "limit of proportionality", { dx: 12, dy: 8, fill: C.amber }) +
    ax.tag(0.4, 11.2, "straight line through the origin: F = kx", { fill: C.blue }) + ax.tag(4, 4, "4.0 N gives 4.0 cm", { dx: 8, dy: 40 });
  const alt = "Load-extension graph for a spring: a straight line through the origin up to 6 N (a spring with 4.0 N giving 4.0 cm, so k = 100 N per m), then the line curves upwards beyond the limit of proportionality, where Hooke's law no longer applies.";
  await put("hookes-law-load-extension", 560, 400, b, alt, "Figure: extension is proportional to load up to the limit of proportionality", "elasticity", "For a spring obeying Hooke's law, the graph is a **straight line");
}

// ---- resultant force on the boat: 2400 N thrust, 600 N resistance
{
  const thrust = 2400, drag = 600, m = 900, k = 0.08;
  let b = D.rect(190, 120, 180, 60, { fill: C.fillBlue, r: 10 }) + M(280, 156, "boat 900 kg", { weight: 700 }) +
    D.arrow(370, 150, 370 + thrust * k, 150, { stroke: C.blue, width: 4 }) + M(370 + thrust * k / 2, 128, `thrust ${thrust} N`, { fill: C.blue, weight: 700 }).replace("", "") +
    D.arrow(190, 150, 190 - drag * k, 150, { stroke: C.red, width: 4 }) + M(190 - drag * k / 2 - 10, 128, `${drag} N`, { fill: C.red, weight: 700 }) + M(190 - drag * k / 2 - 10, 108, "water resistance", { fill: C.red, size: 13 }) +
    M(300, 230, `resultant = ${thrust} − ${drag} = ${thrust - drag} N forwards`, { weight: 700 }) + M(300, 254, `a = F ÷ m = ${thrust - drag} ÷ ${m} = ${(thrust - drag) / m} m/s²`, { weight: 700 });
  const alt = "Free-body diagram of a 900 kg boat: an engine thrust of 2400 N forwards and water resistance of 600 N backwards. The resultant force is 1800 N forwards, so the acceleration is 1800 divided by 900, which is 2.0 m/s squared.";
  await put("resultant-force-boat", 600, 220, `<g transform="translate(0 -60)">${b}</g>`, alt, "Figure: use the resultant force in F = ma", "resultant-newton", "The acceleration must use the **resultant** force");
}

// ---- centre of gravity: toppling
{
  const w = 70, h = 120, base = 225;
  const panel = (theta, ox, title, verdict, col) => {
    const t = (theta * Math.PI) / 180;
    const rot = (x, y) => [ox + x * Math.cos(t) - y * Math.sin(t), base + x * Math.sin(t) + y * Math.cos(t)];
    const pts = [[-w, 0], [0, 0], [0, -h], [-w, -h]].map(([x, y]) => rot(x, y));
    const [cx, cy] = rot(-w / 2, -h / 2);
    return D.polyline(pts, { fill: C.fillBlue, close: true }) + D.line(ox - 150, base, ox + 80, base, { stroke: C.axis, width: 2 }) +
      D.dot(cx, cy, { stroke: C.red, r: 5 }) + D.line(cx, cy, cx, base, { stroke: C.red, width: 2, dash: true }) + D.arrow(cx, cy + 4, cx, cy + 50, { stroke: C.red, width: 2 }) +
      M(cx - 6, cy - 12, "CG", { fill: C.red, weight: 700, size: 13 }) + M(ox - 60, 30, title, { weight: 700 }) + M(ox - 60, 52, verdict, { fill: col });
  };
  const b = panel(15, 190, "Tilted 15°", "weight line inside the base: returns", C.green) + panel(45, 490, "Tilted 45°", "weight line outside the base: topples", C.red);
  const alt = "Two sketches of a tall block tilted about its bottom corner. At 15 degrees the vertical line down from the centre of gravity still lands inside the base, so the weight turns the block back upright. At 45 degrees the line falls outside the base, so the weight turns the block over.";
  await put("centre-of-gravity-toppling", 620, 250, b, alt, "Figure: an object topples when the line of its weight falls outside its base", "centre-of-gravity", "An object topples when the vertical line");
}
console.log("forces done");
