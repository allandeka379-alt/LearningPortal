// Diagrams for physics-a forces and solids lessons. Run: node .scratch/physics-a/diagrams/mechanics.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const f1 = (v, d = 1) => v.toFixed(d).replace("-", "−");

// ---- Ladder: 5.0 m, 200 N, 60 deg, smooth wall
{
  const len = 5.0, W = 200, th = Math.PI / 3;
  const Nw = (W * (len / 2) * Math.cos(th)) / (len * Math.sin(th)); // 57.7 N
  const px = 58, gy = 330, wx = 520;
  const foot = [wx - len * Math.cos(th) * px, gy], top = [wx, gy - len * Math.sin(th) * px];
  const mid = [(foot[0] + top[0]) / 2, (foot[1] + top[1]) / 2];
  const s = 0.4;
  const body =
    D.line(40, gy, 580, gy, { width: 3 }) + D.line(wx, gy, wx, 20, { width: 3 }) +
    D.line(...foot, ...top, { stroke: C.axis, width: 6 }) +
    D.arrow(mid[0], mid[1], mid[0], mid[1] + W * s, { stroke: C.red, width: 2.6 }) +
    D.text(mid[0], mid[1] + W * s + 20, `weight ${W} N`, { fill: C.red, size: 15, anchor: "middle" }) +
    D.arrow(top[0], top[1], top[0] - Nw * s * 2, top[1], { stroke: C.blue, width: 2.6 }) +
    D.text(top[0] - 170, top[1] - 12, `wall force ${f1(Nw)} N`, { fill: C.blue, size: 15 }) +
    D.arrow(foot[0], foot[1], foot[0], foot[1] - W * s, { stroke: C.green, width: 2.6 }) +
    D.text(foot[0] - 10, foot[1] - W * s * 0.5, `ground reaction ${W} N`, { fill: C.green, size: 15, anchor: "end" }) +
    D.arrow(foot[0], foot[1], foot[0] + Nw * s * 2, foot[1], { stroke: C.amber, width: 2.6 }) +
    D.text(foot[0] + 4, foot[1] + 24, `friction ${f1(Nw)} N`, { fill: C.amber, size: 15 }) +
    D.text(foot[0] + 40, foot[1] - 8, "60°", { size: 15 }) +
    D.text(wx - 6, 36, "smooth wall", { anchor: "end", size: 14, fill: C.muted }) + D.text(60, gy + 24, "rough ground", { size: 14, fill: C.muted });
  const alt = "Free-body diagram of a 5.0 m, 200 N ladder at 60° to rough ground against a smooth wall: the weight 200 N acts down at the centre, the wall pushes horizontally with 57.7 N, and at the foot the ground gives an upward reaction of 200 N and friction of 57.7 N towards the wall.";
  const cap = "Figure: the four forces on the ladder (arrow lengths drawn to one scale)";
  await D.figure(F, "ladder-forces", D.svg(600, 370, body), { alt, caption: cap });
  D.insertAfter(L("forces/equilibrium"), "A uniform ladder $5.0", D.md("ladder-forces", alt, cap));
}

// ---- Lamp on two cables 30 and 60 deg, 50 N; force triangle
{
  const W = 50, a1 = Math.PI / 6, a2 = Math.PI / 3;
  const T1 = W * Math.sin(a1), T2 = W * Math.cos(a1);
  const jx = 150, jy = 190;
  const A = [jx - 130 * Math.cos(a1), jy - 130 * Math.sin(a1)];
  const B = [jx + 130 * Math.cos(a2), jy - 130 * Math.sin(a2)];
  const body =
    D.line(10, 20, 290, 20, { width: 4 }) +
    D.line(jx, jy, A[0], A[1], { stroke: C.axis, width: 3 }) + D.line(jx, jy, B[0], B[1], { stroke: C.axis, width: 3 }) +
    D.arrow(jx, jy, jx, jy + 70, { stroke: C.red, width: 2.6 }) + D.text(jx + 8, jy + 66, `weight ${W} N`, { fill: C.red, size: 14 }) +
    D.circle(jx, jy, 5, { fill: C.ink }) +
    D.text(50, 92, `T₁ = ${f1(T1)} N, 30°`, { fill: C.blue, size: 14 }) +
    D.text(B[0] + 6, B[1] + 50, `T₂ = ${f1(T2)} N, 60°`, { fill: C.amber, size: 14, anchor: "start" });
  const s = 3.4, q0 = [400, 270];
  const q1 = [q0[0] + T2 * Math.cos(a2) * s, q0[1] - T2 * Math.sin(a2) * s];
  const q2 = [q1[0] - T1 * Math.cos(a1) * s, q1[1] - T1 * Math.sin(a1) * s];
  const tri =
    D.arrow(...q0, ...q1, { stroke: C.amber, width: 2.6 }) + D.arrow(...q1, ...q2, { stroke: C.blue, width: 2.6 }) + D.arrow(...q2, ...q0, { stroke: C.red, width: 2.6 }) +
    D.text((q0[0] + q1[0]) / 2 + 10, (q0[1] + q1[1]) / 2 + 16, `T₂ = ${f1(T2)} N`, { fill: C.amber, size: 14 }) +
    D.text((q1[0] + q2[0]) / 2 + 8, (q1[1] + q2[1]) / 2 - 8, `T₁ = ${f1(T1)} N`, { fill: C.blue, size: 14 }) +
    D.text(q0[0] - 6, (q2[1] + q0[1]) / 2 + 4, `weight ${W} N`, { fill: C.red, size: 14, anchor: "end" }) +
    D.text(440, 24, "Closed vector triangle", { size: 15, weight: 700, anchor: "middle" }) + D.text(440, 44, "(tip to tail, resultant zero)", { size: 13, fill: C.muted, anchor: "middle" });
  const alt = `A ${W} N lamp hangs from two cables at 30° and 60° to the horizontal. The three forces, drawn tip to tail, form a closed right-angled triangle with the weight (${W} N) as hypotenuse, giving tensions of ${f1(T1)} N and ${f1(T2)} N; the steeper cable carries more.`;
  const cap = "Figure: the cable tensions from a closed triangle of forces";
  await D.figure(F, "lamp-two-cables-triangle", D.svg(600, 310, body + tri), { alt, caption: cap });
  D.insertAfter(L("forces/equilibrium"), "A lamp of weight $50", D.md("lamp-two-cables-triangle", alt, cap));
}

// ---- Spanner: moment of an angled force
{
  const r = 0.30, Fn = 150, th = Math.PI / 3;
  const dperp = r * Math.sin(th);
  const nx = 90, ny = 230, k = 480; // px per m
  const E = [nx + r * k, ny];
  const dir = [Math.cos(th), -Math.sin(th)];
  const back = r * Math.cos(th) * k;
  const foot = [E[0] - back * dir[0], E[1] - back * dir[1]];
  const body =
    D.rect(nx, ny - 9, r * k, 18, { fill: C.fillGrey, r: 4 }) + D.circle(nx, ny, 12, { fill: "#fff", width: 2.5 }) +
    D.text(nx - 60, ny + 36, "nut (pivot)", { size: 14, fill: C.muted }) +
    D.line(foot[0], foot[1], E[0], E[1], { stroke: C.muted, width: 1.5, dash: true }) +
    D.arrow(E[0], E[1], E[0] + dir[0] * 120, E[1] + dir[1] * 120, { stroke: C.red, width: 3 }) +
    D.text(E[0] + dir[0] * 120 + 8, E[1] + dir[1] * 120 + 4, `F = ${Fn} N`, { fill: C.red, size: 15 }) +
    D.line(nx, ny, foot[0], foot[1], { stroke: C.blue, width: 2.2, dash: true }) +
    D.text(foot[0] + 12, foot[1] + 8, `d⊥ = ${dperp.toFixed(3)} m`, { fill: C.blue, size: 15 }) +
    D.text(E[0] + 18, E[1] - 12, "60°", { size: 14 }) +
    D.line(nx, ny - 46, E[0], ny - 46, { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true }) + D.text((nx + E[0]) / 2, ny - 54, `r = ${r.toFixed(2)} m`, { size: 14, anchor: "middle" }) +
    D.text(300, 36, `moment = F d⊥ = ${Fn} × ${dperp.toFixed(3)} = ${(Fn * dperp).toFixed(1)} N m`, { size: 15, weight: 700, anchor: "middle" });
  const alt = "A spanner 0.30 m long is pulled at its end by a 150 N force at 60° to the spanner. The perpendicular distance from the nut to the line of action of the force is 0.30 sin 60° = 0.260 m, so the moment is 150 × 0.260 = 39.0 N m, less than the 45 N m from a force at 90°.";
  const cap = "Figure: only the perpendicular distance to the line of action counts";
  await D.figure(F, "spanner-moment-angled-force", D.svg(600, 330, body), { alt, caption: cap });
  D.insertAfter(L("forces/moments-couples"), "Rudo pulls on the end of a spanner", D.md("spanner-moment-angled-force", alt, cap));
}

// ---- Hooke's law spring data (lesson table)
{
  const x = [0, 2.6, 5.0, 7.4, 10.1, 12.5, 16.2], f = [0, 1, 2, 3, 4, 5, 6];
  const k = 40; // N/m = 0.40 N/cm
  const ax = D.axes({ x: [0, 18], y: [0, 7], xTicks: 2, yTicks: 1, xLabel: "extension x / cm", yLabel: "load F / N", w: 600, h: 400 });
  let body = ax.frame + ax.line([[0, 0], [17, 17 * k / 100]], { stroke: C.muted, width: 1.6, dash: true });
  body += ax.line([[0, 0], [12.5, 5]], { stroke: C.blue, width: 2.8 });
  x.forEach((xv, i) => { body += ax.point(xv, f[i], { stroke: i === 6 ? C.red : C.blue, r: 5 }); });
  body += ax.guides(12.5, 5, { stroke: C.muted }) +
    ax.tag(0.6, 5.9, "limit of proportionality, about 5.0 N", { fill: C.blue }) +
    ax.tag(17.8, 5.1, "past the limit", { anchor: "end", fill: C.red }) +
    ax.tag(0.6, 6.7, "gradient = 5.0 N / 0.125 m = 40 N m⁻¹", { fill: C.blue });
  const alt = "Force-extension graph for the spring: the first six points (0 to 5.0 N, extension up to 12.5 cm) lie on a straight line through the origin of gradient 40 N/m, so Hooke's law holds; the 6.0 N point at 16.2 cm lies below that line, past the limit of proportionality.";
  const cap = "Figure: Hooke's law holds up to the limit of proportionality, where the graph bends";
  await D.figure(F, "spring-force-extension-graph", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("solids/hookes-law"), "If you plot extension against load instead", D.md("spring-force-extension-graph", alt, cap));
}

// ---- Stress-strain, ductile metal (qualitative curve, shape only)
{
  const ax = D.axes({ x: [0, 10], y: [0, 10], xLabel: "strain", yLabel: "stress", w: 600, h: 400, tickLabels: false, grid: false, xTicks: [], yTicks: [] });
  const pts = [[0, 0], [2, 5.5], [2.5, 6.1], [3.4, 6.2], [5, 7.5], [6.6, 8.6], [7.6, 8.4], [8.4, 7.4]];
  const curve = `M${ax.X(0)},${ax.Y(0)} L${ax.X(2)},${ax.Y(5.5)} ` +
    pts.slice(2).map(([a, b]) => `L${ax.X(a)},${ax.Y(b)}`).join(" ");
  const body = ax.frame + D.path_(curve, { stroke: C.blue, width: 2.8 }) +
    ax.point(2, 5.5, { r: 5 }) + ax.tag(2.4, 4.4, "P: limit of proportionality") +
    ax.point(2.5, 6.1, { r: 5 }) + ax.tag(3.2, 6.9, "Y: yield point", { anchor: "end" }) +
    ax.point(6.6, 8.6, { r: 5 }) + ax.tag(6.6, 9.5, "U: ultimate tensile stress", { anchor: "middle" }) +
    ax.point(8.4, 7.4, { r: 5 }) + ax.tag(9.9, 6.5, "B: breaking point", { anchor: "end" }) +
    ax.tag(1.2, 2.0, "gradient = Young modulus E", { fill: C.amber });
  const alt = "Stress-strain graph for a ductile metal such as copper or mild steel: a straight line from the origin whose gradient is the Young modulus up to the limit of proportionality, then a yield point where strain rises with little extra stress, a maximum at the ultimate tensile stress, and a breaking point below it as the wire necks.";
  const cap = "Figure: stress-strain curve of a ductile metal (shape only; no scale)";
  await D.figure(F, "stress-strain-ductile-metal", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("solids/stress-strain-young"), "A **ductile** material, such as copper", D.md("stress-strain-ductile-metal", alt, cap));
}
console.log("mechanics ok");
