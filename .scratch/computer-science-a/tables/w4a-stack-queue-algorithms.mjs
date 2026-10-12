import { mdTable, codeBlock, pyBlock, chk, same } from "../lib.mjs";
import { stackMd, stackRun, queueMd, queueRun } from "./w4a-adt.mjs";

const stackPseudo = `CONSTANT StackSize ← 5
DECLARE Stack : ARRAY[1:5] OF INTEGER
DECLARE TopPointer : INTEGER

PROCEDURE InitialiseStack()
    TopPointer ← 0
ENDPROCEDURE

FUNCTION IsEmpty() RETURNS BOOLEAN
    RETURN TopPointer = 0
ENDFUNCTION

FUNCTION IsFull() RETURNS BOOLEAN
    RETURN TopPointer = StackSize
ENDFUNCTION

FUNCTION Push(Item : INTEGER) RETURNS BOOLEAN
    IF IsFull() THEN
        RETURN FALSE
    ELSE
        TopPointer ← TopPointer + 1
        Stack[TopPointer] ← Item
        RETURN TRUE
    ENDIF
ENDFUNCTION

FUNCTION Pop() RETURNS INTEGER
    DECLARE Item : INTEGER
    IF IsEmpty() THEN
        RETURN -1        // -1 shows that the stack was empty
    ELSE
        Item ← Stack[TopPointer]
        TopPointer ← TopPointer - 1
        RETURN Item
    ENDIF
ENDFUNCTION`;
const queuePseudo = `CONSTANT QueueSize ← 5
DECLARE Queue : ARRAY[1:5] OF STRING
DECLARE FrontPointer, RearPointer, Count : INTEGER

PROCEDURE InitialiseQueue()
    FrontPointer ← 1
    RearPointer ← 0
    Count ← 0
ENDPROCEDURE

FUNCTION Enqueue(Item : STRING) RETURNS BOOLEAN
    IF Count = QueueSize THEN
        RETURN FALSE
    ELSE
        RearPointer ← MOD(RearPointer, QueueSize) + 1
        Queue[RearPointer] ← Item
        Count ← Count + 1
        RETURN TRUE
    ENDIF
ENDFUNCTION

FUNCTION Dequeue() RETURNS STRING
    DECLARE Item : STRING
    IF Count = 0 THEN
        RETURN ""        // an empty string shows that the queue was empty
    ELSE
        Item ← Queue[FrontPointer]
        FrontPointer ← MOD(FrontPointer, QueueSize) + 1
        Count ← Count - 1
        RETURN Item
    ENDIF
ENDFUNCTION`;

const stackPy = `class Stack:
    def __init__(self, size):
        self.items = [None] * size
        self.size = size
        self.top = 0

    def is_empty(self):
        return self.top == 0

    def is_full(self):
        return self.top == self.size

    def push(self, item):
        if self.is_full():
            return False
        self.items[self.top] = item
        self.top = self.top + 1
        return True

    def pop(self):
        if self.is_empty():
            return None
        self.top = self.top - 1
        return self.items[self.top]

pages = Stack(3)
for page in ("Home", "News", "Sport", "Weather"):
    print(page, pages.push(page))
print(pages.pop())
print(pages.pop())
print(pages.is_empty())`;
const sRun = pyBlock(stackPy);
same(sRun.text, "Home True\nNews True\nSport True\nWeather False\nSport\nNews\nFalse");

const queuePy = `class CircularQueue:
    def __init__(self, size):
        self.items = [None] * size
        self.size = size
        self.front = 0
        self.rear = -1
        self.count = 0

    def enqueue(self, item):
        if self.count == self.size:
            return False
        self.rear = (self.rear + 1) % self.size
        self.items[self.rear] = item
        self.count = self.count + 1
        return True

    def dequeue(self):
        if self.count == 0:
            return None
        item = self.items[self.front]
        self.front = (self.front + 1) % self.size
        self.count = self.count - 1
        return item

jobs = CircularQueue(3)
for name in ("J1", "J2", "J3", "J4"):
    print(name, jobs.enqueue(name))
print(jobs.dequeue())
print(jobs.enqueue("J4"))
print(jobs.items, jobs.front, jobs.rear)`;
const qRun = pyBlock(queuePy);
same(qRun.text, "J1 True\nJ2 True\nJ3 True\nJ4 False\nJ1\nTrue\n['J4', 'J2', 'J3'] 1 0");

// pseudocode trace tables (1-based)
const sOps = [["push", 40], ["push", 25], ["push", 60], ["pop"], ["pop"], ["push", 15], ["pop"], ["pop"], ["pop"]];
const sTr = stackRun(5, sOps);
same(sTr.rows.map((r) => r.note), ["", "", "", "returns 60", "returns 25", "", "returns 15", "returns 40", "stack empty"]);
const stackTable = stackMd(5, sOps);
const qOps = [["enqueue", "Rudo"], ["enqueue", "Sipho"], ["enqueue", "Tatenda"], ["enqueue", "Chipo"], ["dequeue"], ["dequeue"], ["enqueue", "Farai"], ["enqueue", "Nyasha"], ["enqueue", "Thandeka"], ["enqueue", "Blessing"]];
const qTr = queueRun(5, qOps);
chk(qTr.rows[7].rear, 1); chk(qTr.rows[8].rear, 2); chk(qTr.rows[8].count, 5); same(qTr.rows[9].note, "queue full: not stored"); chk(qTr.count, 5);
const queueTable = queueMd(5, qOps);

// linear queue wastes space
function linearQueue(size, ops) {
  const items = Array(size).fill(""); let front = 1, rear = 0; const rows = [];
  for (const [op, v] of ops) {
    let note = "";
    if (op === "enqueue") { if (rear === size) note = "not stored: Rear is at the last place"; else { rear++; items[rear - 1] = v; } }
    else { if (front > rear) note = "queue empty"; else { note = `returns ${items[front - 1]}`; items[front - 1] = ""; front++; } }
    rows.push([op === "enqueue" ? `enqueue ${v}` : op, front, rear, ...items, note]);
  }
  return rows;
}
const lq = linearQueue(4, [["enqueue", "A"], ["enqueue", "B"], ["enqueue", "C"], ["enqueue", "D"], ["dequeue"], ["dequeue"], ["enqueue", "E"]]);
same(lq[6][lq[6].length - 1], "not stored: Rear is at the last place");
const linearTable = mdTable(["Operation", "Front", "Rear", "[1]", "[2]", "[3]", "[4]", "Result"], lq);

// reversing a word with a stack
const word = "KARIBA";
const rev = pyBlock(`word = "KARIBA"
stack = []
for letter in word:
    stack.append(letter)
reversed_word = ""
while len(stack) > 0:
    reversed_word = reversed_word + stack.pop()
print(reversed_word)`);
same(rev.text, [...word].reverse().join(""));

export const snips = { stackPseudo: codeBlock(stackPseudo), queuePseudo: codeBlock(queuePseudo), stackPy: sRun.code, stackOut: sRun.output, queuePy: qRun.code, queueOut: qRun.output, stackTable, queueTable, linearTable, revPy: rev.code, revOut: rev.output };
if (process.argv[1].endsWith("w4a-stack-queue-algorithms.mjs")) console.log(Object.values(snips).join("\n\n"));
