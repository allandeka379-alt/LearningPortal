// Stack, circular queue and linked-list simulators used by the w4a lessons and slices (array implementations, 1-based like the pseudocode).
import { mdTable } from "../lib.mjs";

/** Stack in an array of `size` places. ops: [["push", v] | ["pop"] | ["peek"]]. Returns rows and final state. */
export function stackRun(size, ops) {
  const data = Array(size).fill("");
  let top = 0;
  const rows = [];
  for (const [op, v] of ops) {
    let note = "";
    if (op === "push") {
      if (top === size) note = "stack full: not stored";
      else { top++; data[top - 1] = v; }
    } else if (op === "pop") {
      if (top === 0) note = "stack empty";
      else { note = `returns ${data[top - 1]}`; data[top - 1] = ""; top--; }
    } else if (op === "peek") note = top === 0 ? "stack empty" : `returns ${data[top - 1]}`;
    rows.push({ op: op === "push" ? `push ${v}` : op, top, data: [...data], note });
  }
  return { rows, top, data };
}
export function stackMd(size, ops) {
  const r = stackRun(size, ops);
  const heads = ["Operation", "Top", ...Array.from({ length: size }, (_, i) => `[${i + 1}]`), "Result"];
  return mdTable(heads, r.rows.map((x) => [x.op, x.top, ...x.data.map((d) => (d === "" ? "" : d)), x.note]));
}

/** Circular queue in `size` places. ops: [["enqueue", v] | ["dequeue"]]. Front starts at 1, Rear at 0, Count at 0. */
export function queueRun(size, ops) {
  const data = Array(size).fill("");
  let front = 1, rear = 0, count = 0;
  const rows = [];
  for (const [op, v] of ops) {
    let note = "";
    if (op === "enqueue") {
      if (count === size) note = "queue full: not stored";
      else { rear = (rear % size) + 1; data[rear - 1] = v; count++; }
    } else if (op === "dequeue") {
      if (count === 0) note = "queue empty";
      else { note = `returns ${data[front - 1]}`; data[front - 1] = ""; front = (front % size) + 1; count--; }
    }
    rows.push({ op: op === "enqueue" ? `enqueue ${v}` : op, front, rear, count, data: [...data], note });
  }
  return { rows, front, rear, count, data };
}
export function queueMd(size, ops) {
  const r = queueRun(size, ops);
  const heads = ["Operation", "Front", "Rear", "Count", ...Array.from({ length: size }, (_, i) => `[${i + 1}]`), "Result"];
  return mdTable(heads, r.rows.map((x) => [x.op, x.front, x.rear, x.count, ...x.data, x.note]));
}

/** Linked list in arrays: Data[1..n], Next[1..n] (0 = null), Start, Free. */
export function makeList(data, next, start, free) {
  return { data: [...data], next: [...next], start, free };
}
export function listMd(l, { title } = {}) {
  const n = l.data.length;
  const t = mdTable(["Index", "Data", "Next"], l.data.map((d, i) => [i + 1, d === "" ? "(unused)" : d, l.next[i]]));
  return `${t}\n\nStart = ${l.start}, Free = ${l.free}`;
}
/** The names in list order. */
export function listOrder(l) {
  const out = [];
  for (let p = l.start; p !== 0; p = l.next[p - 1]) out.push(l.data[p - 1]);
  return out;
}
export function freeOrder(l) {
  const out = [];
  for (let p = l.free; p !== 0; p = l.next[p - 1]) out.push(p);
  return out;
}
/** Insert `item` in alphabetical order (smaller strings first). Returns { list, node, after } */
export function listInsert(l, item) {
  const r = makeList(l.data, l.next, l.start, l.free);
  if (r.free === 0) throw new Error("list full");
  const node = r.free;
  r.free = r.next[node - 1];
  r.data[node - 1] = item;
  let prev = 0, cur = r.start;
  while (cur !== 0 && r.data[cur - 1] < item) { prev = cur; cur = r.next[cur - 1]; }
  r.next[node - 1] = cur;
  if (prev === 0) r.start = node; else r.next[prev - 1] = node;
  return { list: r, node, prev };
}
export function listDelete(l, item) {
  const r = makeList(l.data, l.next, l.start, l.free);
  let prev = 0, cur = r.start;
  while (cur !== 0 && r.data[cur - 1] !== item) { prev = cur; cur = r.next[cur - 1]; }
  if (cur === 0) throw new Error("not found");
  if (prev === 0) r.start = r.next[cur - 1]; else r.next[prev - 1] = r.next[cur - 1];
  r.next[cur - 1] = r.free;
  r.free = cur;
  r.data[cur - 1] = r.data[cur - 1]; // the data stays but is logically deleted
  return { list: r, node: cur, prev };
}
