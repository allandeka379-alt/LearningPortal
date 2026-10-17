import { D, fig, figBefore } from "./lib.mjs";
const { C, text, line, rect, node, arrow, circle, path_ } = D;

// ---- bubble sort passes (improved version, stops after a pass with no swaps)
{
  const start = [34, 12, 27, 9, 41, 18];
  const a = [...start];
  const rows = [{ label: "start", arr: [...a], c: null, s: null, fixed: 0 }];
  let pass = 0, swapped = true;
  while (swapped && pass < a.length - 1) {
    swapped = false; let c = 0, s = 0;
    for (let i = 0; i < a.length - 1 - pass; i += 1) { c += 1; if (a[i] > a[i + 1]) { [a[i], a[i + 1]] = [a[i + 1], a[i]]; s += 1; swapped = true; } }
    pass += 1;
    rows.push({ label: `pass ${pass}`, arr: [...a], c, s, fixed: pass });
  }
  const check = rows.slice(1).map((r) => `${r.arr.join()}|${r.c}|${r.s}`).join(";");
  if (check !== "12,27,9,34,18,41|5|4;12,9,27,18,34,41|4|2;9,12,18,27,34,41|3|2;9,12,18,27,34,41|2|0") throw new Error("bubble " + check);
  let b = "";
  rows.forEach((r, k) => {
    const y = 20 + k * 52;
    b += text(10, y + 22, r.label, { size: 14, weight: 700 });
    r.arr.forEach((v, i) => {
      const fixed = i >= a.length - r.fixed && r.fixed > 0;
      b += node(80 + i * 48, y, 44, 32, String(v), { fill: fixed ? C.fillGreen : "#fff", size: 14, weight: fixed ? 700 : 400 }).replace(/rx="8"/, 'rx="3"');
    });
    if (r.c !== null) b += text(385, y + 22, `${r.c} comparisons, ${r.s} swaps`, { size: 13 });
  });
  b += text(10, 20 + rows.length * 52 + 8, "Green: items already in their final place. Total 14 comparisons, 8 swaps, 4 passes.", { size: 13, fill: C.muted });
  await figBefore("algo-bubble-sort-passes", D.svg(600, 20 + rows.length * 52 + 28, b),
    "Bubble sort of 34, 12, 27, 9, 41, 18: after pass 1 the largest value 41 is at the end, passes 2 and 3 fix 34 and then 27, and pass 4 makes two comparisons with no swaps so the sort stops; 14 comparisons and 8 swaps in all",
    "Figure: the array after each pass of the bubble sort, with comparisons and swaps", "algo/linear-search-bubble-sort", ":::worked-solution{title=\"Bubble sort of six marks\"}");
}

// ---- binary search for 45
{
  const data = [5, 11, 14, 22, 27, 31, 38, 45, 52, 60, 71, 88];
  const target = 45;
  let low = 1, high = data.length;
  const steps = [];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const v = data[mid - 1];
    const res = v === target ? "equal: found" : v < target ? "less: Low = Mid + 1" : "greater: High = Mid - 1";
    steps.push({ low, high, mid, v, res });
    if (v === target) break;
    if (v < target) low = mid + 1; else high = mid - 1;
  }
  if (steps.map((s) => s.mid).join() !== "6,9,7,8") throw new Error("bs " + steps.map((s) => s.mid));
  let b = text(10, 18, "Searching for 45 in 12 sorted values", { size: 14, weight: 700 });
  data.forEach((_, i) => (b += text(78 + i * 39 + 19, 40, String(i + 1), { anchor: "middle", size: 12, fill: C.muted })));
  b += text(10, 40, "index", { size: 12, fill: C.muted });
  steps.forEach((s, k) => {
    const y = 50 + k * 70;
    b += text(10, y + 22, `step ${k + 1}`, { size: 13, weight: 700 });
    data.forEach((v, i) => {
      const idx = i + 1, inside = idx >= s.low && idx <= s.high, mid = idx === s.mid;
      b += rect(78 + i * 39, y, 37, 32, { fill: mid ? C.fillAmber : inside ? C.fillBlue : C.fillGrey, stroke: mid ? C.amber : C.axis, width: mid ? 3 : 1.2 });
      b += text(78 + i * 39 + 18.5, y + 21, String(v), { anchor: "middle", size: 13, weight: mid ? 700 : 400, fill: inside ? C.ink : C.muted });
    });
    b += text(78, y + 52, `Low ${s.low}, High ${s.high}, Mid ${s.mid}: Data[${s.mid}] = ${s.v}, ${s.res}`, { size: 13 });
  });
  b += text(10, 50 + steps.length * 70 + 6, "Blue: items still in range. Amber: the middle item compared. Grey: discarded.", { size: 12, fill: C.muted });
  await figBefore("algo-binary-search-trace", D.svg(560, 50 + steps.length * 70 + 26, b),
    "Binary search for 45 in the 12 sorted values: the middle items compared are Data[6] = 31, Data[9] = 52, Data[7] = 38 and Data[8] = 45, so the range shrinks 12, 6, 2, 1 and 45 is found in 4 comparisons",
    "Figure: the range of the search shrinking at each step", "algo/binary-search-insertion-sort", ":::worked-solution{title=\"Tracing a binary search");
}

// ---- flowchart: count positive numbers
{
  let b = "";
  const cx = 150;
  b += node(100, 8, 100, 32, "Start", { kind: "terminator", fill: C.fillGreen });
  b += arrow(cx, 40, cx, 66) + node(75, 66, 150, 34, "Count ← 0");
  b += arrow(cx, 100, cx, 126) + node(75, 126, 150, 34, "INPUT Number", { kind: "io", fill: C.fillAmber });
  b += arrow(cx, 160, cx, 186) + node(75, 186, 150, 64, "Number = 0 ?", { kind: "decision", fill: C.fillGrey });
  b += arrow(225, 218, 310, 218) + text(262, 210, "Yes", { anchor: "middle", size: 13, weight: 700 });
  b += node(310, 201, 150, 34, "OUTPUT Count", { kind: "io", fill: C.fillAmber });
  b += arrow(385, 235, 385, 266) + node(335, 266, 100, 32, "End", { kind: "terminator", fill: C.fillGreen });
  b += arrow(cx, 250, cx, 282) + text(cx + 14, 270, "No", { size: 13, weight: 700 });
  b += node(75, 282, 150, 64, "Number > 0 ?", { kind: "decision", fill: C.fillGrey });
  b += arrow(cx, 346, cx, 376) + text(cx + 14, 366, "Yes", { size: 13, weight: 700 });
  b += node(75, 376, 150, 34, "Count ← Count + 1");
  b += path_("M75,393 H20 V143 H73", { arrow: true }) + line(75, 314, 20, 314) + D.dot(20, 314, { r: 4 }) + text(46, 306, "No", { anchor: "middle", size: 13, weight: 700 });
  b += text(250, 345, "Input 4, -2, 7, 0 gives", { size: 13, fill: C.muted }) + text(250, 363, "OUTPUT Count = 2", { size: 13, weight: 700 });
  await figBefore("algo-flowchart-count-positive", D.svg(480, 425, b),
    "Flowchart that counts positive numbers: start, Count set to 0, input a number, if it is 0 output Count and end, otherwise if it is greater than 0 add 1 to Count, and loop back to the input; for 4, -2, 7, 0 the output is 2",
    "Figure: the flowchart for counting the positive numbers entered before 0", "algo/algorithm-design", ":::worked-solution{title=\"Converting a flowchart to pseudocode\"}");
}
