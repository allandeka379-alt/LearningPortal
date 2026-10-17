// economics-a: market-structure lessons. Run: node .scratch/economics-a/diagrams/firms.mjs
import { D, C, put, putAfterBlock, lab, dotted, dash } from "./common.mjs";

const lineF = (ax, f, x0, x1, o = {}) => ax.line([[x0, f(x0)], [x1, f(x1)]], o);
const poly = (ax, pts, o) => D.polyline(pts.map(([a, b]) => [ax.X(a), ax.Y(b)]), { close: true, ...o });
const hline = (ax, y, x0, x1, o = {}) => ax.line([[x0, y], [x1, y]], o);

// ---------------------------------------------------------------- perfect competition (maize farm, TFC 40)
{
  const tvc = [0, 30, 52, 66, 81, 100, 130, 172, 226];
  const q = [1, 2, 3, 4, 5, 6, 7, 8];
  const mc = q.map((n) => [n, tvc[n] - tvc[n - 1]]);
  const atc = q.map((n) => [n, (40 + tvc[n]) / n]);
  const avc = q.map((n) => [n, tvc[n] / n]);
  const base = () => D.axes({ x: [0, 10], y: [0, 70], xTicks: 1, yTicks: 10, xLabel: "Output (tonnes)", yLabel: "US$", w: 600, h: 440 });
  // short run: price 36
  {
    const ax = base();
    const profit = D.rect(ax.X(0), ax.Y(36), ax.X(6) - ax.X(0), ax.Y(28.33) - ax.Y(36), { fill: C.fillGreen, stroke: C.green, width: 1.5 });
    const body = profit + ax.frame + dotted(ax, atc, { stroke: C.blue }) + dotted(ax, avc, { stroke: C.muted }) + dotted(ax, mc, { stroke: C.amber }) +
      hline(ax, 36, 0, 9.5, { stroke: C.red, width: 2.4 }) + lab(ax, 9.5, 36, "P = AR = MR", { dx: -118, dy: -8, fill: C.red, size: 14 }) +
      lab(ax, 8, 54, "MC", { dx: 8, dy: 4, fill: C.amber }) + lab(ax, 8, 33.25, "ATC", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, 8, 28.25, "AVC", { dx: 8, dy: 18, fill: C.muted }) +
      ax.line([[6, 0], [6, 28.33]], { stroke: C.muted, dash: true, width: 1.4 }) + ax.point(6, 30, { stroke: C.amber, r: 5 }) +
      ax.label(0.15, 33.2, "Supernormal profit", { size: 13, fill: C.green, weight: 700 }) + ax.label(0.15, 30.8, "US$46", { size: 13, fill: C.green, weight: 700 }) +
      ax.tag(6, 8, "6 units: MC 30 below US$36", { dx: 12, dy: 0, size: 13 });
    const alt = "Short-run equilibrium of a perfectly competitive maize farm at a price of US$36: MC is US$30 at the sixth unit and US$42 at the seventh, so output is 6 units; ATC at 6 units is US$28.33 and the shaded rectangle (36 - 28.33) x 6 is a supernormal profit of US$46.";
    await put("perfect-competition-short-run", D.svg(600, 440, body), alt, "Figure: a price-taker maximises profit where MC meets the horizontal price line; the rectangle is supernormal profit", "firms/perfect-competition", "**The firm's short-run supply curve**");
  }
  // normal profit, loss, shutdown
  {
    const ax = base();
    const body = ax.frame + dotted(ax, atc, { stroke: C.blue }) + dotted(ax, avc, { stroke: C.muted }) + dotted(ax, mc, { stroke: C.amber }) +
      hline(ax, 28, 0, 9.9, { stroke: C.green, width: 2 }) + hline(ax, 24, 0, 9.9, { stroke: C.amber, width: 2, dash: true }) + hline(ax, 18, 0, 9.9, { stroke: C.red, width: 2 }) +
      ax.tag(9.9, 28, "P = 28", { anchor: "end", size: 12, fill: C.green }) + ax.tag(9.9, 24, "P = 24", { anchor: "end", dy: 24, size: 12, fill: C.amber }) + ax.tag(9.9, 18, "P = 18", { anchor: "end", dy: 24, size: 12, fill: C.red }) +
      lab(ax, 8, 54, "MC", { dx: 8, dy: 4, fill: C.amber }) + lab(ax, 8, 33.25, "ATC", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, 8, 28.25, "AVC", { dx: 8, dy: 22, fill: C.muted }) +
      ax.point(5, 28, { stroke: C.green, r: 6 }) + ax.point(5, 20, { stroke: C.muted, r: 5 }) +
      ax.tag(5.2, 68, "P = 28 = min ATC: normal profit", { size: 13, fill: C.green }) + ax.tag(5.2, 63.5, "P = 24: loss US$20, keeps producing", { size: 13, fill: C.amber }) + ax.tag(5.2, 59, "P = 18 < min AVC 20: shut down", { size: 13, fill: C.red });
    const alt = "The maize farm at three prices: at US$28, the minimum of ATC, it produces 5 units and earns normal profit; at US$24 it also produces 5 units and loses US$20 but covers its variable cost (minimum AVC is US$20); at US$18, below minimum AVC, it shuts down.";
    await put("perfect-competition-shutdown", D.svg(600, 440, body), alt, "Figure: normal profit at P = minimum ATC (US$28), a loss that is still worth bearing at US$24, and shutdown below minimum AVC (US$18)", "firms/perfect-competition", "In the example, the long-run price is US\\$28");
  }
}

// ---------------------------------------------------------------- monopoly (quarry, P = 80 - 2Q)
{
  const d = (q) => 80 - 2 * q, mr = (q) => 80 - 4 * q, atc = (q) => 20 + 250 / q;
  const ax = D.axes({ x: [0, 45], y: [0, 90], xTicks: 5, yTicks: 10, xLabel: "Quantity (thousand units)", yLabel: "US$", w: 600, h: 450 });
  const profit = poly(ax, [[0, 50], [15, 50], [15, atc(15)], [0, atc(15)]], { fill: C.fillGreen, stroke: C.green, width: 1.3 });
  const dwl = poly(ax, [[15, 50], [15, 20], [30, 20]], { fill: "#f8d4cf", stroke: C.red, width: 1.3 });
  const body = profit + dwl + ax.frame + lineF(ax, d, 0, 40) + lineF(ax, mr, 0, 20, { stroke: C.muted }) + ax.plot(atc, { domain: [5, 36], stroke: C.green, width: 2.2 }) + hline(ax, 20, 0, 40, { stroke: C.amber, width: 2.4 }) +
    lab(ax, 36, 8, "D = AR", { dx: 10, dy: -4, fill: C.blue }) + lab(ax, 20, 0, "MR", { dx: 6, dy: -18, fill: C.muted }) + lab(ax, 40, 20, "MC", { dx: 4, dy: -8, fill: C.amber }) + lab(ax, 36, atc(36), "ATC", { dx: 6, dy: -4, fill: C.green }) +
    ax.line([[15, 0], [15, 50]], { stroke: C.muted, dash: true, width: 1.4 }) + hline(ax, 50, 0, 15, { stroke: C.muted, dash: true, width: 1.4 }) +
    ax.point(15, 50, { r: 5 }) + ax.tag(15, 50, "Monopoly: 15, US$50", { dx: 12, dy: -6, size: 13 }) +
    ax.point(30, 20, { r: 4 }) + ax.tag(30, 20, "Competitive: 30, US$20", { dx: -26, dy: 34, size: 13 }) +
    ax.label(0.8, 44, "Profit US$200", { size: 13, fill: C.green, weight: 700 }) + ax.label(0.8, 40.5, "thousand", { size: 13, fill: C.green, weight: 700 }) +
    ax.tag(20.5, 38, "Deadweight loss 225", { size: 13, fill: C.red });
  const alt = "Monopoly equilibrium for the quarry with demand P = 80 - 2Q and MC US$20: MR = MC at 15 thousand units, price US$50, with supernormal profit of US$200 thousand (ATC 36.67); a competitive industry would produce 30 thousand at US$20, so the deadweight loss triangle is 225.";
  await put("monopoly-welfare-loss", D.svg(600, 450, body), alt, "Figure: a monopolist sets MR = MC (15, US$50), earns supernormal profit (green) and causes a deadweight loss (red) against the competitive output of 30", "firms/monopoly", "## Comparison with perfect competition");

  // natural monopoly regulation
  const ax2 = D.axes({ x: [0, 45], y: [0, 90], xTicks: 5, yTicks: 10, xLabel: "Quantity (thousand units)", yLabel: "US$", w: 600, h: 450 });
  const body2 = ax2.frame + lineF(ax2, d, 0, 40) + lineF(ax2, mr, 0, 20, { stroke: C.muted }) + ax2.plot(atc, { domain: [4, 42], stroke: C.green, width: 2.4 }) + hline(ax2, 20, 0, 42, { stroke: C.amber, width: 2.4 }) +
    lab(ax2, 36, 8, "D = AR", { dx: 10, dy: -4, fill: C.blue }) + lab(ax2, 20, 0, "MR", { dx: 6, dy: -18, fill: C.muted }) + lab(ax2, 42, 20, "MC", { dx: 4, dy: -8, fill: C.amber }) + lab(ax2, 42, atc(42), "LRAC", { dx: -50, dy: -10, fill: C.green }) +
    [[15, 50, "Unregulated: 15, US$50", -2, -14], [25, 30, "P = ATC: 25, US$30", 10, -14], [30, 20, "P = MC: 30, US$20", -10, 30]].map(([a, b, t, dx, dy]) => ax2.point(a, b, { r: 5 }) + ax2.tag(a, b, t, { dx, dy, size: 13 })).join("") +
    ax2.tag(8, 86, "LRAC = 20 + 250/Q keeps falling: natural monopoly", { size: 13, fill: C.green });
  const alt2 = "Regulating the natural monopoly quarry: LRAC = 20 + 250/Q falls throughout; unregulated it sells 15 thousand at US$50, marginal-cost pricing gives 30 thousand at US$20 but a loss equal to the fixed cost of US$250 thousand, and average-cost pricing gives 25 thousand at US$30 where price equals ATC and profit is normal.";
  await put("natural-monopoly-regulation", D.svg(600, 450, body2), alt2, "Figure: price and output under no regulation, marginal-cost pricing and average-cost pricing for a natural monopoly", "firms/monopoly", "Regulators therefore often choose between");
}

// ---------------------------------------------------------------- monopolistic competition (salon)
{
  const atc = (q) => 10 + 50 / q;
  const mk = () => D.axes({ x: [0, 18], y: [0, 40], xTicks: 2, yTicks: 5, xLabel: "Customers per day", yLabel: "US$", w: 600, h: 430 });
  {
    const ax = mk();
    const prof = poly(ax, [[0, 22], [6, 22], [6, atc(6)], [0, atc(6)]], { fill: C.fillGreen, stroke: C.green, width: 1.3 });
    const body = prof + ax.frame + lineF(ax, (q) => 34 - 2 * q, 0, 17) + lineF(ax, (q) => 34 - 4 * q, 0, 8.5, { stroke: C.muted }) + hline(ax, 10, 0, 17, { stroke: C.amber, width: 2.4 }) + ax.plot(atc, { domain: [1.6, 17], stroke: C.green, width: 2.4 }) +
      lab(ax, 17, 0, "D = AR", { dx: -30, dy: -12, fill: C.blue }) + lab(ax, 8.5, 0, "MR", { dx: 6, dy: -18, fill: C.muted }) + lab(ax, 17, 10, "MC", { dx: 4, dy: -6, fill: C.amber }) + lab(ax, 15, atc(15), "ATC", { dx: 4, dy: -10, fill: C.green }) +
      ax.line([[6, 0], [6, 22]], { stroke: C.muted, dash: true, width: 1.4 }) + ax.point(6, 22, { r: 5 }) + ax.tag(6, 22, "6 customers, US$22", { dx: 12, dy: -8, size: 13 }) +
      ax.point(6, atc(6), { stroke: C.green, r: 4 }) + ax.label(0.3, 20.6, "Profit US$22", { size: 13, fill: C.green, weight: 700 }) + ax.label(0.2, 16.2, "ATC at 6 = 18.33", { size: 13, fill: C.green });
    const alt = "Short-run equilibrium of the salon with demand P = 34 - 2Q and MC US$10: MR = MC at 6 customers, price US$22 against ATC US$18.33, a supernormal profit rectangle of US$22 a day.";
    await put("monopolistic-competition-short-run", D.svg(600, 430, body), alt, "Figure: in the short run a monopolistically competitive firm earns supernormal profit (green) at MR = MC", "firms/monopolistic-competition", "The same equations can give a loss");
  }
  {
    const ax = mk();
    const body = ax.frame + lineF(ax, (q) => 34 - 2 * q, 0, 17, { stroke: C.muted, dash: true, width: 1.8 }) + lineF(ax, (q) => 30 - 2 * q, 0, 15) + lineF(ax, (q) => 30 - 4 * q, 0, 7.5, { stroke: C.teal }) + hline(ax, 10, 0, 17, { stroke: C.amber, width: 2.4 }) + ax.plot(atc, { domain: [1.6, 17], stroke: C.green, width: 2.4 }) +
      lab(ax, 13, 4, "D2 = AR", { dx: 10, dy: -4, fill: C.blue }) + lab(ax, 17, 0, "D1", { dx: -10, dy: -34, fill: C.muted }) + lab(ax, 7.5, 0, "MR2", { dx: 6, dy: -18, fill: C.teal }) + lab(ax, 17, 10, "MC", { dx: 4, dy: -6, fill: C.amber }) + lab(ax, 15, atc(15), "ATC", { dx: 4, dy: -10, fill: C.green }) +
      ax.line([[5, 0], [5, 20]], { stroke: C.muted, dash: true, width: 1.4 }) + hline(ax, 20, 0, 5, { stroke: C.muted, dash: true, width: 1.4 }) + ax.point(5, 20, { r: 6 }) + ax.tag(5, 20, "Tangency: 5 customers, US$20 = ATC", { dx: 12, dy: -14, size: 13 }) +
      ax.tag(5, 10, "MR = MC", { dx: 12, dy: 28, size: 13 });
    const alt = "Long-run equilibrium of the salon: entry shifts demand left to P = 30 - 2Q, so MR = MC at 5 customers and price US$20, which equals ATC (10 + 50/5); the demand curve just touches the ATC curve, so profit is normal, and at that output ATC is still falling.";
    await put("monopolistic-competition-long-run", D.svg(600, 430, body), alt, "Figure: in the long run entry shifts demand left until it is tangent to ATC at the MR = MC output: normal profit only", "firms/monopolistic-competition", "(In this example the demand curve moves in parallel.");
  }
}

// ---------------------------------------------------------------- kinked demand (firms/oligopoly.md)
{
  const up = (q) => 12.5 - q / 40, lo = (q) => 50 / 3 - q / 15;
  const mu = (q) => 12.5 - q / 20, ml = (q) => 50 / 3 - (2 * q) / 15;
  const ax = D.axes({ x: [0, 140], y: [0, 14], xTicks: 20, yTicks: 2, xLabel: "Quantity (units per week)", yLabel: "Price (US$)", w: 600, h: 450 });
  const gap = ax.line([[100, ml(100)], [100, mu(100)]], { stroke: C.red, width: 4 });
  const body = ax.frame + lineF(ax, up, 30, 100) + lineF(ax, lo, 100, 135) + lineF(ax, mu, 30, 100, { stroke: C.muted, dash: true, width: 2 }) + lineF(ax, ml, 100, 125, { stroke: C.muted, dash: true, width: 2 }) + gap +
    ax.point(100, 10, { r: 5 }) + ax.tag(138, 13.4, "Kink: 100 units, US$10", { anchor: "end", size: 13 }) + ax.arrow(100, 12.6, 100, 10.4, { width: 1.4 }) +
    hline(ax, 4, 60, 135, { stroke: C.amber, width: 2.2 }) + hline(ax, 7, 60, 135, { stroke: C.amber, width: 2.2 }) +
    ax.label(135, 4, "MC at US$4", { dx: -92, dy: 18, fill: C.amber, size: 13 }) + ax.label(135, 7, "MC rises to US$7", { dx: -118, dy: -8, fill: C.amber, size: 13 }) +
    ax.label(30, up(30), "Elastic above the kink", { dx: -6, dy: -30, size: 13 }) + ax.label(112, lo(112), "Less elastic below", { dx: 10, dy: -12, size: 13 }) +
    ax.tag(100, 5.4, "MR gap 3.33 to 7.50", { dx: -138, dy: 0, size: 13, fill: C.red }) + ax.label(30, mu(30), "MR", { dx: 4, dy: 18, fill: C.muted, weight: 700 });
  const alt = "Kinked demand curve at 100 units and US$10: demand above the kink is elastic (PED -4) and below it less elastic (PED -1.5); the marginal revenue curve has a vertical gap from US$3.33 to US$7.50 at 100 units, so marginal cost of US$4 or US$7 still gives the same price and output.";
  await put("kinked-demand-mr-gap", D.svg(600, 450, body), alt, "Figure: the kinked demand curve and the gap in MR; cost changes within the gap leave price at US$10", "firms/oligopoly", "If marginal cost lies anywhere in the gap");
}

// ---------------------------------------------------------------- third-degree price discrimination (bus company)
{
  const panel = (ox, title, a, Qm, Pm, rev, fill) => {
    const ax = D.axes({ x: [0, 26], y: [0, 52], xTicks: 5, yTicks: 10, xLabel: "Hundreds", yLabel: "US$", w: 310, h: 360, pad: { l: 44, r: 14, t: 44, b: 52 } });
    const d = (q) => a - 2 * q, mr = (q) => a - 4 * q;
    const prof = poly(ax, [[0, Pm], [Qm, Pm], [Qm, 10], [0, 10]], { fill, stroke: C.green, width: 1.3 });
    const g = prof + ax.frame + lineF(ax, d, 0, a / 2) + lineF(ax, mr, 0, a / 4, { stroke: C.muted }) + hline(ax, 10, 0, 25, { stroke: C.amber, width: 2.2 }) +
      ax.line([[Qm, 0], [Qm, Pm]], { stroke: C.muted, dash: true, width: 1.3 }) + ax.point(Qm, Pm, { r: 4.5 }) +
      ax.tag(Qm, Pm, `Q ${Qm}, P US$${Pm}`, { dx: 8, dy: -8, size: 13 }) + ax.label(20, 10, "MC 10", { dx: 0, dy: -6, size: 13, fill: C.amber }) +
      ax.label(a / 2 - 5, 3, "D", { dx: 0, dy: 0, weight: 700, fill: C.blue }) + ax.label(a / 4 - 0.5, 0, "MR", { dx: 6, dy: -18, size: 13, fill: C.muted, weight: 700 }) +
      ax.label(0.5, 20, `Profit
${rev}`, { size: 13, fill: C.green, weight: 700 });
    return D.group(g + D.text(155, 16, title, { anchor: "middle", weight: 700, size: 14 }), { translate: [ox, 0] });
  };
  const body = panel(0, "Adults: P = 50 - 2Q", 50, 10, 30, 200, C.fillGreen) + panel(310, "Students: P = 34 - 2Q", 34, 6, 22, 72, C.fillGreen);
  const alt = "Third-degree price discrimination by a bus company with marginal cost US$10: MR = MC gives adults (less elastic demand) 10 hundred passengers at US$30, and students (more elastic demand) 6 hundred at US$22; profit before fixed costs is 200 + 72 = 272 hundred dollars against 256 at a single price.";
  await putAfterBlock("price-discrimination-two-markets", D.svg(620, 360, body), alt, "Figure: the same MR = MC rule applied in each market gives the higher price (US$30) to adults and the lower price (US$22) to students", "firms/price-discrimination", "Prices and outputs in the two markets");
}
console.log("done");
