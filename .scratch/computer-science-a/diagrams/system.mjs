import { D, fig, figBefore } from "./lib.mjs";
const { C, text, line, rect, node, arrow } = D;
const dbl = (x1, y1, x2, y2, o = {}) => line(x1, y1, x2, y2, { arrow: true, arrowStart: true, ...o });

// ---- paging: logical 4100 -> physical 9220
{
  const size = 1024, table = [5, 2, 7, 0, 9];
  const logical = 4100, page = Math.floor(logical / size), off = logical % size, frame = table[page];
  const phys = frame * size + off;
  if (page !== 4 || off !== 4 || phys !== 9220) throw new Error("paging");
  let b = "";
  b += rect(10, 40, 170, 130, { fill: C.fillBlue, r: 8, stroke: C.axis }) + text(95, 62, "Logical address", { anchor: "middle", size: 14, weight: 700 }) + text(95, 90, `${logical}`, { anchor: "middle", size: 20, weight: 700 }) +
    text(95, 114, `page = ${logical} ÷ ${size} = ${page}`, { anchor: "middle", size: 13 }) + text(95, 134, `offset = remainder = ${off}`, { anchor: "middle", size: 13 }) + text(95, 154, `(page size ${size} bytes)`, { anchor: "middle", size: 12, fill: C.muted });
  b += text(285, 26, "Page table", { anchor: "middle", size: 14, weight: 700 });
  b += rect(235, 34, 100, 26, { fill: C.fillGrey, stroke: C.axis, width: 1.3 }) + text(260, 52, "Page", { anchor: "middle", size: 13, weight: 700 }) + text(310, 52, "Frame", { anchor: "middle", size: 13, weight: 700 });
  table.forEach((f, p) => {
    const y = 60 + p * 26, hi = p === page;
    b += rect(235, y, 100, 26, { fill: hi ? C.fillAmber : "#fff", stroke: hi ? C.amber : C.axis, width: hi ? 3 : 1.3 }) + text(260, y + 18, String(p), { anchor: "middle", size: 14, weight: hi ? 700 : 400 }) + text(310, y + 18, String(f), { anchor: "middle", size: 14, weight: hi ? 700 : 400 });
  });
  b += rect(395, 40, 175, 130, { fill: C.fillGreen, r: 8, stroke: C.axis }) + text(482, 62, "Physical address", { anchor: "middle", size: 14, weight: 700 }) + text(482, 92, `${phys}`, { anchor: "middle", size: 20, weight: 700 }) +
    text(482, 116, `frame ${frame} × ${size} + ${off}`, { anchor: "middle", size: 13 }) + text(482, 136, `= ${phys}`, { anchor: "middle", size: 13 });
  b += arrow(180, 105, 235, 60 + page * 26 + 13) + arrow(335, 60 + page * 26 + 13, 395, 105);
  b += text(10, 218, "Same method: logical 2500 is page 2, offset 452, frame 7, physical 7 × 1024 + 452 = 7620.", { size: 13 });
  await figBefore("os-paging-translation", D.svg(580, 236, b),
    "Paging: logical address 4100 with 1024-byte pages is page 4, offset 4; the page table maps page 4 to frame 9, so the physical address is 9 x 1024 + 4 = 9220",
    "Figure: translating logical address 4100 to physical address 9220 through the page table", "os/memory-management", ":::worked-solution{title=\"Translating addresses");
}

// ---- FCFS Gantt chart
{
  const procs = [["A", 0, 6], ["B", 1, 3], ["C", 2, 4], ["D", 5, 2]];
  let t = 0;
  const bars = procs.map(([n, arr, burst]) => { const s = Math.max(t, arr); t = s + burst; return { n, arr, s, e: t, wait: s - arr }; });
  const meanWait = bars.reduce((a, x) => a + x.wait, 0) / bars.length;
  if (bars.map((x) => `${x.s}-${x.e}`).join() !== "0-6,6-9,9-13,13-15" || meanWait !== 5) throw new Error("gantt");
  const sx = 30, x0 = 20;
  let b = text(x0, 20, "First come first served: the processor is used by one process at a time", { size: 14, weight: 700 });
  const fills = [C.fillBlue, C.fillAmber, C.fillGreen, C.fillGrey];
  bars.forEach((x, i) => {
    b += rect(x0 + x.s * sx, 40, (x.e - x.s) * sx, 40, { fill: fills[i], stroke: C.axis, width: 1.6 }) + text(x0 + ((x.s + x.e) / 2) * sx, 66, x.n, { anchor: "middle", size: 18, weight: 700 });
  });
  for (let k = 0; k <= 15; k += 1) { b += line(x0 + k * sx, 80, x0 + k * sx, 88, { width: 1.2, stroke: C.axis }) + text(x0 + k * sx, 104, String(k), { anchor: "middle", size: 12, fill: C.muted }); }
  b += text(x0 + 15 * sx + 16, 104, "time", { size: 12, fill: C.muted });
  b += text(x0, 140, "Arrival: A 0, B 1, C 2, D 5.  Waiting = start - arrival:", { size: 13 });
  b += text(x0, 160, `A ${bars[0].wait}, B ${bars[1].wait}, C ${bars[2].wait}, D ${bars[3].wait}; mean waiting time = ${meanWait}`, { size: 13, weight: 700 });
  await figBefore("os-fcfs-gantt", D.svg(520, 176, b),
    "Gantt chart for first come first served: A runs 0 to 6, B 6 to 9, C 9 to 13 and D 13 to 15; the waiting times are 0, 5, 7 and 8, so the mean waiting time is 5",
    "Figure: the FCFS schedule for processes A, B, C and D", "os/process-scheduling", ":::worked-solution{title=\"First come first served\"}");
}

// ---- three-tier architecture
{
  const tiers = [
    ["Presentation", "The user's device", "The web page where a parent types the learner number", C.fillBlue],
    ["Application (logic)", "The application server", "Checks the parent may see the marks; calculates the average", C.fillAmber],
    ["Data", "The database server", "The tables of marks and learners", C.fillGreen],
  ];
  let b = "";
  tiers.forEach(([n, where, ex, fill], i) => {
    const y = 15 + i * 100;
    b += node(15, y, 190, 54, `${n}\n(${where})`, { fill, size: 14, weight: 700 });
    b += text(225, y + 22, ex.length > 36 ? ex.slice(0, ex.lastIndexOf(" ", 36)) : ex, { size: 13 }) + (ex.length > 36 ? text(225, y + 40, ex.slice(ex.lastIndexOf(" ", 36) + 1), { size: 13 }) : "");
    if (i < 2) b += dbl(110, y + 54, 110, y + 100) + text(124, y + 82, i === 0 ? "request / result" : "query / data", { size: 12, fill: C.muted });
  });
  b += text(15, 320, "Each tier talks only to the tier next to it (separation of concerns).", { size: 12, fill: C.muted });
  await fig("sdlc-three-tier", D.svg(560, 336, b),
    "Three-tier architecture of a results portal: the presentation tier on the user's device talks only to the application tier on the application server, which talks to the data tier on the database server",
    "Figure: the presentation, application and data tiers with the results-portal example", "sdlc/software-architecture", "## Layered architecture");
}
