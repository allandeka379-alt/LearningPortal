import { mdTable, codeBlock, pyBlock, chk, same } from "../lib.mjs";
import { stackRun, stackMd, queueRun, queueMd, makeList, listMd, listOrder, freeOrder, listInsert, listDelete } from "./w4a-adt.mjs";

// Stack
const sOps = [["push", 12], ["push", 7], ["push", 20], ["pop"], ["push", 5], ["pop"], ["pop"]];
const sRun = stackRun(6, sOps);
same(sRun.rows.map((r) => r.top), [1, 2, 3, 2, 3, 2, 1]);
same(sRun.rows.map((r) => r.note), ["", "", "", "returns 20", "", "returns 5", "returns 7"]);
const stackTable = stackMd(6, sOps);

// Circular queue size 5
const qOps = [["enqueue", "T1"], ["enqueue", "T2"], ["enqueue", "T3"], ["dequeue"], ["enqueue", "T4"], ["enqueue", "T5"], ["enqueue", "T6"], ["dequeue"], ["enqueue", "T7"]];
const qRun = queueRun(5, qOps);
chk(qRun.rows[5].rear, 5); chk(qRun.rows[6].rear, 1); // T6 wraps to position 1
same(qRun.rows[6].data, ["T6", "T2", "T3", "T4", "T5"]);
chk(qRun.rows[8].rear, 2);
same(qRun.data, ["T6", "T7", "T3", "T4", "T5"]);
chk(qRun.count, 5);
const queueTable = queueMd(5, qOps);

// Linked list
const L0 = makeList(["Nyasha", "Chipo", "Tatenda", "Farai", "", ""], [3, 4, 0, 1, 6, 0], 2, 5);
same(listOrder(L0), ["Chipo", "Farai", "Nyasha", "Tatenda"]); same(freeOrder(L0), [5, 6]);
const ins = listInsert(L0, "Rudo");
same(listOrder(ins.list), ["Chipo", "Farai", "Nyasha", "Rudo", "Tatenda"]);
chk(ins.node, 5); chk(ins.prev, 1); chk(ins.list.free, 6); chk(ins.list.next[0], 5); chk(ins.list.next[4], 3);
const del = listDelete(ins.list, "Farai");
same(listOrder(del.list), ["Chipo", "Nyasha", "Rudo", "Tatenda"]);
chk(del.node, 4); chk(del.list.next[1], 1); chk(del.list.free, 4); chk(del.list.next[3], 6);
same(freeOrder(del.list), [4, 6]);

const stackPy = pyBlock(`stack = []
stack.append(12)
stack.append(7)
stack.append(20)
print(stack.pop())
stack.append(5)
print(stack[-1])
print(stack)`);
same(stackPy.text, "20\n5\n[12, 7, 5]");
const queuePy = pyBlock(`queue = []
queue.append("T1")
queue.append("T2")
queue.append("T3")
print(queue.pop(0))
queue.append("T4")
print(queue)`);
same(queuePy.text, "T1\n['T2', 'T3', 'T4']");

const compare = mdTable(["Structure", "Rule", "Operations", "Typical use"], [
  ["Stack", "last in, first out (LIFO)", "push, pop, peek", "undo, the back button, calls of subroutines"],
  ["Queue", "first in, first out (FIFO)", "enqueue, dequeue", "print jobs, customers waiting, keyboard buffer"],
  ["Linked list", "items linked by pointers; order is by the pointers, not the positions", "add, find, delete (no shifting)", "a sorted list with frequent additions and deletions"],
]);
export const snips = { stackTable, queueTable, l0: listMd(L0), l1: listMd(ins.list), l2: listMd(del.list), stackPy: stackPy.code, stackOut: stackPy.output, queuePy: queuePy.code, queueOut: queuePy.output, compare };
if (process.argv[1].endsWith("w4a-adt-introduction.mjs")) console.log(Object.values(snips).join("\n\n"));
