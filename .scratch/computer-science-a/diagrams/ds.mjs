import { D, fig, figBefore } from "./lib.mjs";
const { C, text, line, rect, node, arrow, circle } = D;

// ---- stack trace (lesson: tracing a stack of six places)
{
  const ops = ["push 12", "push 7", "push 20", "pop", "push 5", "pop", "pop"];
  const stack = [];
  const snaps = [];
  for (const op of ops) {
    let note = "";
    if (op.startsWith("push")) stack.push(Number(op.split(" ")[1]));
    else note = `returns ${stack.pop()}`;
    snaps.push({ op, items: [...stack], note });
  }
  // expected from the lesson
  const want = ["returns 20", "returns 5", "returns 7"];
  if (snaps.filter((s) => s.note).map((s) => s.note).join() !== want.join()) throw new Error("stack");
  let b = "";
  const cw = 66, ch = 26, y0 = 40;
  snaps.forEach((s, i) => {
    const x = 14 + i * cw;
    b += text(x + 27, 22, s.op, { anchor: "middle", size: 13, weight: 700 });
    for (let k = 0; k < 6; k += 1) {
      const y = y0 + (5 - k) * ch;
      const v = s.items[k];
      b += rect(x, y, 54, ch, { fill: v === undefined ? "#fff" : C.fillBlue, stroke: C.axis, width: 1.3 });
      if (v !== undefined) b += text(x + 27, y + 18, String(v), { anchor: "middle", size: 14, weight: k === s.items.length - 1 ? 700 : 400 });
    }
    b += text(x + 27, y0 + 6 * ch + 20, `Top = ${s.items.length}`, { anchor: "middle", size: 12 });
    if (s.note) b += text(x + 27, y0 + 6 * ch + 38, s.note.replace("returns ", "gives "), { anchor: "middle", size: 12, fill: C.amber, weight: 700 });
  });
  b += text(14, 268, "Each column: the six-place stack after that operation.", { size: 12, fill: C.muted });
  await fig("ds-stack-trace", D.svg(490, 280, b),
    "Stack of six places after push 12, push 7, push 20, pop, push 5, pop, pop: the pops return 20, 5 and 7 (last in, first out) and the stack finally holds only 12 with Top = 1",
    "Figure: the stack after each of seven push and pop operations", "ds/adt-introduction", "## Stack");
}
// ---- circular queue (final state)
{
  const slots = ["T6", "T7", "T3", "T4", "T5"]; // [1]..[5]
  const front = 3, rear = 2;
  let b = "";
  const cx = 170, cy = 140, R = 88;
  const pos = (i) => { const a = (-90 + i * 72) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
  slots.forEach((v, i) => {
    const [x, y] = pos(i);
    const fill = i + 1 === front ? C.fillGreen : i + 1 === rear ? C.fillAmber : C.fillBlue;
    b += node(x - 26, y - 18, 52, 36, v, { fill, size: 15, weight: 700 });
    const a = (-90 + i * 72) * Math.PI / 180;
    b += text(x + Math.cos(a) * 46 - (Math.cos(a) < -0.3 ? 4 : 0), y + Math.sin(a) * 30 + 4, `[${i + 1}]`, { anchor: "middle", size: 12, fill: C.muted });
  });
  // ring arrows
  b += text(cx, cy - 2, "circular", { anchor: "middle", size: 13, fill: C.muted }) + text(cx, cy + 15, "queue", { anchor: "middle", size: 13, fill: C.muted });
  const tagOld = (i, label, fill) => { const a = (-90 + (i - 1) * 72) * Math.PI / 180; const [x, y] = pos(i - 1); return text(x + Math.cos(a) * 80 + (Math.cos(a) > 0.2 ? 6 : Math.cos(a) < -0.2 ? -6 : 0), y + Math.sin(a) * 52 + 5, label, { anchor: Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle", size: 14, weight: 700, fill }); };
  { const [fx, fy] = pos(front - 1), [rx, ry] = pos(rear - 1); b += text(fx, fy + 46, "Front = 3", { anchor: "middle", size: 14, weight: 700, fill: C.green }) + text(rx + 6, ry - 26, "Rear = 2", { anchor: "middle", size: 14, weight: 700, fill: C.amber }); }
  b += text(400, 60, "Count = 5: the queue is full", { size: 14, weight: 700 }) + text(400, 84, "Rear (2) is just behind", { size: 13 }) + text(400, 102, "Front (3) in the ring.", { size: 13 }) + text(400, 130, "Leaves in order of arrival:", { size: 13 }) + text(400, 148, "T3, T4, T5, T6, T7", { size: 14, weight: 700 }) + text(400, 176, "T6 wrapped round into", { size: 13 }) + text(400, 194, "place [1], emptied by T1.", { size: 13 });
  await fig("ds-circular-queue", D.svg(620, 285, b),
    "Circular queue of five places after the lesson's operations: places [1] to [5] hold T6, T7, T3, T4 and T5, Front = 3 and Rear = 2, Count = 5 so it is full, and T6 and T7 reused the places emptied by T1 and T2",
    "Figure: the final state of the circular queue, with Front and Rear", "ds/adt-introduction", "## Queue");
}

// ---- linked list chains
function chain({ order, data, next, start, free, title, hi = [] }) {
  const nw = 94, gap = 24, x0 = 20, y = 72;
  let b = text(20, 20, title, { size: 14, weight: 700 });
  order.forEach((idx, k) => {
    const x = x0 + k * (nw + gap);
    const changed = hi.includes(idx);
    b += rect(x, y, 62, 40, { fill: changed ? C.fillAmber : C.fillBlue, stroke: C.axis, width: 1.5 }) + text(x + 31, y + 25, data[idx], { anchor: "middle", size: 13 });
    b += rect(x + 62, y, 32, 40, { fill: changed ? C.fillAmber : "#fff", stroke: C.axis, width: 1.5 }) + text(x + 78, y + 25, String(next[idx]), { anchor: "middle", size: 14, weight: 700 });
    b += text(x + 47, y + 56, `node ${idx}`, { anchor: "middle", size: 12, fill: C.muted });
    if (k < order.length - 1) b += arrow(x + 94, y + 20, x + nw + gap, y + 20);
    else b += text(x + 78, y + 76, "0 = null", { anchor: "middle", size: 12, fill: C.muted });
  });
  b += arrow(x0 + 31, 50, x0 + 31, y - 2, {}) + text(x0 + 31, 44, `Start = ${start}`, { anchor: "middle", size: 13, weight: 700, fill: C.blue });
  b += text(20, y + 110, `Free list: ${free}`, { size: 13 }) + text(20, y + 130, "Each node shows its data (left) and its Next pointer (right).", { size: 12, fill: C.muted });
  return b;
}
{
  const data = { 1: "Nyasha", 2: "Chipo", 3: "Tatenda", 4: "Farai", 5: "Rudo" };
  const next = { 1: 5, 2: 4, 3: 0, 4: 1, 5: 3 };
  // verify order by following pointers
  const seq = []; for (let p = 2; p; p = next[p]) seq.push(p);
  if (seq.join() !== "2,4,1,5,3") throw new Error("ll order");
  await fig("ds-linked-list-add-rudo", D.svg(600, 225, chain({ order: seq, data, next, start: 2, free: "6 (node 5 has been used)", title: "Alphabetical linked list after adding Rudo", hi: [1, 5] })),
    "Linked list after adding Rudo: following Next from Start = 2 gives Chipo, Farai, Nyasha, Rudo, Tatenda, null; only Next[1] changed from 3 to 5 and Rudo's Next is 3, so no items moved",
    "Figure: the names in alphabetical order; Nyasha and Rudo (amber) are the nodes whose pointers changed", "ds/adt-introduction", "**Add Rudo.**");
}
{
  const data = { 1: "Tendai", 2: "Farai", 3: "Nyasha", 4: "Anesu", 5: "Zodwa" };
  const next = { 1: 5, 2: 3, 3: 1, 4: 2, 5: 0 };
  const seq = []; for (let p = 4; p; p = next[p]) seq.push(p);
  if (seq.map((p) => data[p]).join() !== "Anesu,Farai,Nyasha,Tendai,Zodwa") throw new Error("ll2");
  await fig("ds-linked-list-nyasha", D.svg(640, 225, chain({ order: seq, data, next, start: 4, free: "6", title: "List after Delete Rudo and Insert Nyasha", hi: [2, 3] })),
    "Linked list after deleting Rudo and inserting Nyasha: from Start = 4 the pointers give Anesu, Farai, Nyasha, Tendai, Zodwa, null; Nyasha reused the freed node 3 and no item moved",
    "Figure: the six-node list after the last operation; Farai and Nyasha (amber) are the nodes whose pointers changed", "ds/linked-list-algorithms", "The list is now Anesu, Farai, Nyasha, Tendai, Zodwa.");
}

// ---- binary search tree
{
  const keys = [45, 28, 63, 17, 36, 52, 71, 40];
  const nodes = {};
  let root = null;
  const ins = (k) => {
    const nd = { k, l: null, r: null };
    if (!root) { root = nd; return; }
    let c = root;
    for (;;) { const side = k < c.k ? "l" : "r"; if (!c[side]) { c[side] = nd; return; } c = c[side]; }
  };
  keys.forEach(ins);
  const inorder = (n, o = []) => (n ? (inorder(n.l, o), o.push(n.k), inorder(n.r, o), o) : o);
  if (inorder(root).join() !== "17,28,36,40,45,52,63,71") throw new Error("bst");
  const posOf = { 45: [260, 40], 28: [140, 110], 63: [380, 110], 17: [80, 180], 36: [200, 180], 52: [320, 180], 71: [440, 180], 40: [250, 250] };
  let b = "";
  const walk = (n) => { if (!n) return; for (const s of ["l", "r"]) if (n[s]) { const [x1, y1] = posOf[n.k], [x2, y2] = posOf[n[s].k]; b += line(x1, y1, x2, y2, { width: 2 }); walk(n[s]); } };
  walk(root);
  for (const k of keys) { const [x, y] = posOf[k]; b += circle(x, y, 20, { fill: k === 45 ? C.fillAmber : C.fillBlue }) + text(x, y + 5, String(k), { anchor: "middle", size: 15, weight: 700 }); }
  b += text(300, 40, "root", { size: 13, fill: C.amber, weight: 700 });
  b += text(14, 285, "In-order: 17, 28, 36, 40, 45, 52, 63, 71 (ascending).", { size: 13 });
  await figBefore("ds-binary-search-tree", D.svg(500, 300, b),
    "Binary search tree built by inserting 45, 28, 63, 17, 36, 52, 71, 40: smaller keys go left and larger keys go right, so 40 is the right child of 36; an in-order walk gives 17, 28, 36, 40, 45, 52, 63, 71",
    "Figure: the tree built from the keys in the order 45, 28, 63, 17, 36, 52, 71, 40", "ds/binary-tree-algorithms", ":::worked-solution{title=\"Building a tree from a list");
}

// ---- weighted graph and its directed version
{
  const P = { A: [60, 90], B: [190, 35], C: [190, 145], D: [320, 90], E: [440, 90] };
  const und = [["A", "B", 4], ["A", "C", 2], ["B", "D", 5], ["C", "D", 8], ["D", "E", 3]];
  const dir = [["A", "B", 4], ["B", "D", 5], ["C", "A", 2], ["D", "E", 3]];
  const R = 20;
  const drawGraph = (edges, directed, oy) => {
    let s = "";
    for (const [a, c, w] of edges) {
      const [x1, y1] = P[a], [x2, y2] = P[c];
      const d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
      s += directed ? arrow(x1 + ux * R, y1 + uy * R + oy, x2 - ux * (R + 2), y2 - uy * (R + 2) + oy, { width: 2 }) : line(x1, y1 + oy, x2, y2 + oy, { width: 2 });
      s += D.tag((x1 + x2) / 2 + 6, (y1 + y2) / 2 + oy + 6, String(w), { anchor: "middle", size: 14 });
    }
    for (const [k, [x, y]] of Object.entries(P)) s += circle(x, y + oy, R, { fill: C.fillBlue }) + text(x, y + oy + 5, k, { anchor: "middle", size: 15, weight: 700 });
    return s;
  };
  let b = text(14, 18, "Undirected weighted graph (the lesson's five edges)", { size: 14, weight: 700 }) + drawGraph(und, false, 14);
  b += text(14, 220, "Directed version: A to B (4), B to D (5), C to A (2), D to E (3)", { size: 14, weight: 700 }) + drawGraph(dir, true, 216);
  await figBefore("ds-weighted-graph", D.svg(500, 400, b),
    "Weighted graph with vertices A to E: undirected edges A-B 4, A-C 2, B-D 5, C-D 8 and D-E 3; below, the directed version with one-way edges A to B 4, B to D 5, C to A 2 and D to E 3",
    "Figure: the undirected weighted graph and the directed graph used in the lesson", "ds/graphs-dictionaries", "### Adjacency matrix");
}
