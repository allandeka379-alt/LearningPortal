// economics-a: utility lessons. Run: node .scratch/economics-a/diagrams/utility.mjs
import { D, C, put, putAfterBlock, lab, dotted, dash } from "./common.mjs";

const lineF = (ax, f, x0, x1, o = {}) => ax.line([[x0, f(x0)], [x1, f(x1)]], o);

// ---- total and marginal utility (marginal-utility.md)
{
  const tu = [[0, 0], [1, 10], [2, 18], [3, 24], [4, 28], [5, 30], [6, 30], [7, 28]];
  const mu = [[1, 10], [2, 8], [3, 6], [4, 4], [5, 2], [6, 0], [7, -2]];
  const top = D.axes({ x: [0, 8], y: [0, 36], xTicks: 1, yTicks: 10, xLabel: "Slices of bread", yLabel: "Total utility (utils)", w: 600, h: 260, pad: { l: 64, r: 28, t: 30, b: 50 } });
  const bot = D.axes({ x: [0, 8], y: [-4, 12], xTicks: 1, yTicks: 4, yLabel: "Marginal utility (utils)", w: 600, h: 260, pad: { l: 64, r: 28, t: 30, b: 50 } });
  const g1 = top.frame + dotted(top, tu) + top.tag(7.9, 33, "Maximum TU 30 where MU = 0 (5th and 6th slices)", { anchor: "end", size: 13, fill: C.green }) + top.tag(7, 28, "TU falls: MU negative", { dx: -150, dy: 30, size: 13, fill: C.red });
  const g2 = bot.frame + dotted(bot, mu, { stroke: C.amber }) + bot.tag(1, 10, "MU of 1st slice: 10", { dx: 14, dy: -2, size: 13, fill: C.amber }) + bot.tag(6, 0, "MU = 0 at 6th slice", { dx: -60, dy: -34, size: 13 }) + bot.tag(7, -2, "MU -2", { dx: 12, dy: 4, size: 13, fill: C.red }) + D.text(560, 252, "Slices of bread", { anchor: "end", weight: 600, size: 14 });
  const body = D.group(g1, { translate: [0, 0] }) + D.group(g2, { translate: [0, 270] });
  const alt = "Total and marginal utility of bread slices: total utility rises 10, 18, 24, 28, 30 and peaks at 30 for the 5th and 6th slices, while marginal utility falls 10, 8, 6, 4, 2, 0 and becomes -2 at the 7th slice, where total utility falls to 28.";
  await put("utility-total-marginal", D.svg(600, 530, body), alt, "Figure: marginal utility diminishes; total utility is greatest when marginal utility reaches zero and falls once it is negative", "utility/marginal-utility", "Marginal utility is the difference between successive totals");
}

// ---- budget line and consumer equilibrium; price fall decomposition (indifference-curves.md)
{
  const ic = (u) => (x) => u / x;
  const mk = () => D.axes({ x: [0, 66], y: [0, 24], xTicks: 10, yTicks: 4, xLabel: "Good X (units)", yLabel: "Good Y (units)", w: 600, h: 440 });
  {
    const ax = mk();
    const body = ax.frame + lineF(ax, (x) => 20 - (2 / 3) * x, 0, 30, { stroke: C.blue, width: 2.8 }) + lineF(ax, (x) => 20 - (1 / 3) * x, 0, 60, { stroke: C.amber, width: 2.2, dash: true }) +
      ax.plot(ic(150), { domain: [6.5, 60], stroke: C.green, width: 2.6 }) +
      ax.point(15, 10, { r: 6 }) + ax.guides(15, 10) + ax.tag(15, 10, "Equilibrium (15, 10)", { anchor: "end", dx: -14, dy: 30, size: 13 }) +
      ax.tag(30, 0, "(30, 0)", { dx: -8, dy: -8, size: 13, anchor: "middle" }) + ax.tag(0, 20, "(0, 20)", { dx: 8, dy: 0, size: 13 }) +
      ax.tag(60, 0, "(60, 0)", { dx: -8, dy: -8, size: 13, anchor: "middle" }) +
      ax.label(36, 22.5, "Solid line: budget line, income", { size: 13, fill: C.blue }) + ax.label(36, 21.2, "US$120, PX US$4, PY US$6", { size: 13, fill: C.blue }) +
      ax.label(36, 18.6, "Dashed: PX falls to US$2,", { size: 13, fill: C.amber }) + ax.label(36, 17.3, "X intercept becomes 60", { size: 13, fill: C.amber }) +
      ax.tag(9, 22.3, "Indifference curve XY = 150", { size: 13, fill: C.green });
    const alt = "Consumer equilibrium: with income US$120, X costing US$4 and Y US$6, the budget line runs from 30 units of X to 20 units of Y; the highest reachable indifference curve touches it at 15 units of X and 10 of Y, where the slopes are equal (MRS = price ratio 0.67); a dashed line shows the pivot to 60 units of X when the price of X falls to US$2.";
    await put("indifference-budget-equilibrium", D.svg(600, 440, body), alt, "Figure: the consumer chooses the point where the budget line is tangent to the highest indifference curve (illustrative preferences XY = 150)", "utility/indifference-curves", "When the price of X falls to US\\$2 with income unchanged");
  }
  {
    const ax = mk();
    const comp = 84.85;
    const body = ax.frame + lineF(ax, (x) => 20 - (2 / 3) * x, 0, 30, { stroke: C.muted, width: 1.8 }) + lineF(ax, (x) => 20 - (1 / 3) * x, 0, 60, { stroke: C.blue, width: 2.8 }) +
      lineF(ax, (x) => comp / 6 - (1 / 3) * x, 0, comp / 2, { stroke: C.amber, width: 2.4, dash: true }) +
      ax.plot(ic(150), { domain: [6.5, 60], stroke: C.green, width: 2.6 }) + ax.plot(ic(300), { domain: [13.5, 60], stroke: C.purple, width: 2.2 }) +
      ax.point(15, 10, { r: 5 }) + ax.point(21.21, 7.07, { r: 5, stroke: C.amber }) + ax.point(30, 10, { r: 5, stroke: C.purple }) +
      D.line(ax.X(15), ax.Y(0), ax.X(15), ax.Y(0) + 0, {}) + dash(ax, [[15, 10], [15, 0]]) + dash(ax, [[21.21, 7.07], [21.21, 0]]) + dash(ax, [[30, 10], [30, 0]]) +
      ax.tag(15, 10, "A: 15", { dx: -52, dy: -10, size: 13 }) + ax.tag(21.21, 7.07, "B: 21.21", { dx: -6, dy: 52, size: 13, fill: C.amber }) + ax.tag(30, 10, "C: 30", { dx: 12, dy: -12, size: 13, fill: C.purple }) +
      ax.tag(33, 23, "A to B: substitution effect +6.21", { dx: 0, dy: 0, size: 13, fill: C.amber }) + ax.tag(33, 20.2, "B to C: income effect +8.79", { dx: 0, dy: 0, size: 13, fill: C.purple }) +
      ax.tag(33, 17.4, "A to C: price effect +15", { dx: 0, dy: 0, size: 13 }) +
      ax.tag(16, 17.4, "New budget line", { size: 13, fill: C.blue }) + ax.tag(1, 8, "Compensated", { size: 13, fill: C.amber });
    const alt = "Income and substitution effects of a fall in the price of X from US$4 to US$2: the consumer moves from A at 15 units of X to the compensated bundle B at 21.21 units on the original indifference curve (substitution effect +6.21), then to C at 30 units on a higher curve (income effect +8.79), a total price effect of +15 units.";
    await putAfterBlock("indifference-income-substitution", D.svg(600, 440, body), alt, "Figure: the dashed line parallel to the new budget line and tangent to the original curve separates the substitution effect (A to B) from the income effect (B to C)", "utility/indifference-curves", "Decomposing a price fall (illustrative preferences)");
  }
}
console.log("done");
