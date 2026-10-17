import { D, fig } from "./lib.mjs";
const C = D.C;
const lab = (x, y, s, o = {}) => D.tag(x, y, s, { size: 13, anchor: "middle", ...o });

// 1. flowchart: game park fee (nested selection)
{
  const cx = 190;
  let b = "";
  b += D.node(cx - 55, 10, 110, 34, "START", { kind: "terminator", fill: C.fillGreen });
  b += D.node(cx - 80, 64, 160, 40, "INPUT Age", { kind: "io" });
  b += D.node(cx - 80, 124, 160, 60, "Age < 12?", { kind: "decision", fill: C.fillAmber });
  b += D.node(cx - 80, 214, 160, 60, "Age >= 60?", { kind: "decision", fill: C.fillAmber });
  b += D.node(cx - 55, 304, 110, 40, "Fee ← 5", { fill: C.fillBlue });
  b += D.node(350, 134, 110, 40, "Fee ← 2");
  b += D.node(350, 224, 110, 40, "Fee ← 3");
  b += D.node(cx - 80, 366, 160, 40, "OUTPUT Fee", { kind: "io" });
  b += D.node(cx - 55, 426, 110, 34, "STOP", { kind: "terminator", fill: C.fillGreen });
  b += D.arrow(cx, 44, cx, 64) + D.arrow(cx, 104, cx, 124) + D.arrow(cx, 184, cx, 214) + D.arrow(cx, 274, cx, 304) + D.arrow(cx, 344, cx, 366) + D.arrow(cx, 406, cx, 426);
  b += D.arrow(cx + 80, 154, 350, 154) + D.arrow(cx + 80, 244, 350, 244);
  b += D.polyline([[460, 154], [490, 154], [490, 386], [cx + 80 - 6, 386]], { width: 2, arrow: true });
  b += D.line(460, 244, 490, 244, { width: 2 }) + D.dot(490, 244);
  b += lab(cx + 120, 148, "Yes") + lab(cx + 120, 238, "Yes") + D.text(cx + 8, 205, "No", { size: 13, weight: 700 }) + D.text(cx + 8, 295, "No", { size: 13, weight: 700 });
  b += D.text(350, 300, "Ages 9, 35, 60 give\nfees 2, 5, 3", { size: 13, fill: C.muted });
  await fig("flowchart-park-fee-selection", D.svg(520, 472, b),
    "Flowchart for the game park fee: input Age; if Age < 12 the fee is 2; otherwise if Age >= 60 the fee is 3; otherwise the fee is 5; then output the fee. Ages 9, 35 and 60 give 2, 5 and 3",
    "Figure: the game park fee flowchart with two decision boxes", "algorithms/flowcharts", "## Sequence, selection and loops in a flowchart");
}

// 2. flowchart: loop with rogue value -1
{
  const cx = 150;
  let b = "";
  b += D.node(cx - 55, 10, 110, 34, "START", { kind: "terminator", fill: C.fillGreen });
  b += D.node(cx - 95, 64, 190, 40, "Total ← 0, Count ← 0");
  b += D.node(cx - 80, 124, 160, 40, "INPUT Number", { kind: "io" });
  b += D.node(cx - 85, 184, 170, 64, "Number = -1?", { kind: "decision", fill: C.fillAmber });
  b += D.node(cx - 95, 280, 190, 40, "OUTPUT Total, \" \", Count", { kind: "io", size: 13 });
  b += D.node(cx - 55, 340, 110, 34, "STOP", { kind: "terminator", fill: C.fillGreen });
  b += D.node(320, 190, 220, 52, "Total ← Total + Number\nCount ← Count + 1", { size: 13 });
  b += D.arrow(cx, 44, cx, 64) + D.arrow(cx, 104, cx, 124) + D.arrow(cx, 164, cx, 184) + D.arrow(cx, 248, cx, 280) + D.arrow(cx, 320, cx, 340);
  b += D.arrow(cx + 85, 216, 320, 216);
  b += D.polyline([[430, 190], [430, 144], [cx + 80 - 6, 144]], { width: 2, arrow: true });
  b += lab(cx + 120, 210, "No") + D.text(cx + 8, 270, "Yes", { size: 13, weight: 700 });
  b += D.text(320, 280, "Inputs 6, 9, 4, -1:\nTotal 19, Count 3,\noutput \"19 3\"", { size: 13, fill: C.muted });
  await fig("flowchart-loop-rogue-value", D.svg(560, 386, b),
    "Flowchart of a loop that adds numbers until the rogue value -1: the decision Number = -1 comes straight after each input, so -1 is never added; with inputs 6, 9, 4, -1 the output is 19 3",
    "Figure: a flowchart loop that totals numbers until the rogue value -1 is entered", "algorithms/flowcharts", "## Following a loop");
}

// 3. linear search
{
  const codes = [418, 205, 377, 960, 122, 543, 381, 709];
  const idx = (target) => { const i = codes.indexOf(target); return i < 0 ? codes.length : i + 1; };
  const strip = (y, target, title) => {
    const n = idx(target), found = codes.includes(target);
    let s = D.text(10, y, title, { weight: 700, size: 14 });
    codes.forEach((v, i) => {
      const x = 20 + i * 66, compared = i + 1 <= n;
      const fill = !compared ? "#fff" : found && i + 1 === n ? C.fillGreen : C.fillAmber;
      s += D.text(x + 28, y + 24, String(i + 1), { anchor: "middle", size: 13, fill: C.muted });
      s += D.rect(x, y + 30, 56, 38, { fill, stroke: compared ? C.axis : C.grid, width: 1.6 });
      s += D.text(x + 28, y + 55, String(v), { anchor: "middle", size: 16, weight: 700, fill: compared ? C.ink : C.muted });
    });
    s += D.text(20, y + 92, found ? `Match at index ${n} after ${n} comparisons; indexes ${n + 1} to 8 are never looked at.` : `All ${codes.length} codes compared, no match: Not found.`, { size: 13, fill: C.muted });
    return s;
  };
  if (idx(122) !== 5 || codes.includes(300)) throw new Error("data");
  let b = strip(20, 122, "Search for 122 (amber = compared, no match; green = found)") + strip(150, 300, "Search for 300 (not in the list)");
  await fig("linear-search-codes", D.svg(560, 260, b),
    "Linear search of the codes 418, 205, 377, 960, 122, 543, 381, 709: searching for 122 stops at index 5 after 5 comparisons, while searching for 300 compares all 8 codes and reports Not found",
    "Figure: a linear search finding 122 at index 5, and failing to find 300 after 8 comparisons", "algorithms/search-sort", "A `WHILE` loop with a `Found` flag");
}

// 4. bubble sort: 27, 12, 35, 8, 19
{
  const start = [27, 12, 35, 8, 19];
  const arr = [...start];
  const rows = [{ label: "Start", a: [...arr], pair: null, sorted: 0 }];
  const passSummary = [];
  for (let p = 1; p <= 4; p += 1) {
    for (let i = 0; i < 5 - p; i += 1) {
      let swapped = false;
      if (arr[i] > arr[i + 1]) { [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; swapped = true; }
      if (p === 1) rows.push({ label: `Pass 1, compare ${i + 1}: ${swapped ? "swap" : "no swap"}`, a: [...arr], pair: i, sorted: 0 });
    }
    passSummary.push([...arr]);
  }
  // check against the lesson's table
  const expect = ["12,27,8,19,35", "12,8,19,27,35", "8,12,19,27,35", "8,12,19,27,35"];
  passSummary.forEach((a, i) => { if (a.join(",") !== expect[i]) throw new Error("bubble mismatch " + a); });
  passSummary.forEach((a, i) => { if (i > 0) rows.push({ label: `After pass ${i + 1}`, a, pair: null, sorted: i + 1 }); });
  rows[4].label += "";
  rows.splice(5, 0, { label: "After pass 1", a: passSummary[0], pair: null, sorted: 1 });
  let b = "";
  rows.forEach((r, k) => {
    const y = 14 + k * 42;
    b += D.text(10, y + 24, r.label, { size: 13, fill: r.pair === null ? C.ink : C.muted, weight: r.pair === null ? 700 : 400 });
    r.a.forEach((v, i) => {
      const x = 270 + i * 50;
      const inSorted = i >= 5 - r.sorted;
      const hi = r.pair !== null && (i === r.pair || i === r.pair + 1);
      b += D.rect(x, y, 44, 34, { fill: hi ? C.fillAmber : inSorted ? C.fillGreen : "#fff", stroke: hi ? C.amber : C.axis, width: hi ? 2.4 : 1.4 }) + D.text(x + 22, y + 24, String(v), { anchor: "middle", size: 16, weight: 700 });
    });
  });
  b += D.text(10, 14 + rows.length * 42 + 14, "Amber = pair being compared; green = in its final place (the largest values bubble to the end).", { size: 13, fill: C.muted });
  await fig("bubble-sort-passes", D.svg(560, 14 + rows.length * 42 + 28, b),
    "Bubble sort of 27, 12, 35, 8, 19: pass 1 makes 3 swaps and moves 35 to the end giving 12, 27, 8, 19, 35; pass 2 gives 12, 8, 19, 27, 35; pass 3 gives 8, 12, 19, 27, 35 and pass 4 makes no swaps",
    "Figure: the first pass of a bubble sort comparison by comparison, then the array after each later pass", "algorithms/search-sort", "Swapping needs a temporary variable");
}

// 5. program development life cycle
{
  let b = "";
  const box = (x, y, t, d, f) => D.rect(x, y, 230, 96, { fill: f, stroke: C.axis, r: 10 }) + D.text(x + 115, y + 28, t, { anchor: "middle", weight: 700, size: 16 }) + D.text(x + 115, y + 52, d, { anchor: "middle", size: 13 });
  b += box(20, 14, "1. Analysis", "Identify requirements;\nabstraction and decomposition", C.fillBlue);
  b += box(310, 14, "2. Design", "Structure diagrams, flowcharts,\npseudocode; plan data and screens", C.fillAmber);
  b += box(310, 160, "3. Coding", "Write the program; test each\nmodule as you write it", C.fillGreen);
  b += box(20, 160, "4. Testing", "Normal, abnormal, extreme and\nboundary test data", C.fillGrey);
  b += D.arrow(250, 62, 308, 62, { width: 2.6 }) + D.arrow(425, 110, 425, 158, { width: 2.6 }) + D.arrow(308, 208, 252, 208, { width: 2.6 }) + D.arrow(135, 158, 135, 112, { width: 2.6 });
  b += D.text(290, 134, "go back and revise if testing", { anchor: "middle", size: 13, fill: C.muted }) + D.text(290, 152, "shows a fault or a missed requirement", { anchor: "middle", size: 13, fill: C.muted });
  await fig("program-development-life-cycle", D.svg(560, 272, b),
    "The four stages of the program development life cycle in a cycle: analysis, design, coding, testing; testing leads back to analysis or design when a fault or a misunderstood requirement is found",
    "Figure: the program development life cycle as a repeating cycle of four stages", "algorithms/decomposition-pdlc", "The stages are a cycle rather than a straight line");
}

// 6. structure diagram: library loans system
{
  const W = 94, G = 6, x0 = 4;
  const col = (i) => x0 + i * (W + G);
  let b = "";
  const leaves = [["Add\nmember", 0], ["Remove\nmember", 1], ["Issue\nbook", 2], ["Return\nbook", 3], ["Calculate\nfine", 4]];
  const mid = [["Manage members", 0, 1], ["Manage loans", 2, 4], ["Produce reports", 5, 5]];
  b += D.node(col(2) + 10, 10, 2 * W + G + 70, 44, "Library loans system", { fill: C.fillAmber, weight: 700 });
  const rootCx = col(2) + 10 + (2 * W + G + 70) / 2;
  mid.forEach(([t, a, z]) => {
    const cx = (col(a) + col(z) + W) / 2, w = t === "Manage members" ? 150 : t === "Manage loans" ? 150 : W;
    b += D.polyline([[rootCx, 54], [rootCx, 72], [cx, 72], [cx, 90]], { width: 1.8 });
    b += D.node(cx - w / 2, 90, w, 44, t.replace("Produce reports", "Produce\nreports"), { fill: C.fillBlue, size: 13 });
    if (a !== 5) {
      for (let i = a; i <= z; i += 1) {
        const lx = col(i) + W / 2;
        b += D.polyline([[cx, 134], [cx, 152], [lx, 152], [lx, 170]], { width: 1.8 });
      }
    }
  });
  leaves.forEach(([t, i]) => (b += D.node(col(i), 170, W, 50, t, { size: 13 })));
  b += D.text(10, 250, "Top level: the main jobs. Next level: how each job is done. Each bottom box becomes one module.", { size: 13, fill: C.muted });
  await fig("structure-diagram-library-loans", D.svg(604, 262, b),
    "Structure diagram of a library loans system: the top box splits into Manage members (Add member, Remove member), Manage loans (Issue book, Return book, Calculate fine) and Produce reports",
    "Figure: a top-down structure diagram for a library loans system", "algorithms/decomposition-pdlc", "Read from left to right, the sub-systems");
}
