import { mdTable, codeBlock, pyBlock, chk, same } from "../lib.mjs";
import { makeList, listMd, listOrder, freeOrder, listInsert, listDelete } from "./w4a-adt.mjs";

const pseudo = `CONSTANT ListSize ← 6
DECLARE Data : ARRAY[1:6] OF STRING
DECLARE Next : ARRAY[1:6] OF INTEGER
DECLARE StartPointer, FreePointer : INTEGER

PROCEDURE InitialiseList()
    DECLARE Index : INTEGER
    StartPointer ← 0
    FreePointer ← 1
    FOR Index ← 1 TO ListSize - 1
        Next[Index] ← Index + 1
    NEXT Index
    Next[ListSize] ← 0
ENDPROCEDURE

FUNCTION Find(Item : STRING) RETURNS INTEGER
    DECLARE Current : INTEGER
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] <> Item DO
        Current ← Next[Current]
    ENDWHILE
    RETURN Current        // 0 if the item is not in the list
ENDFUNCTION

FUNCTION Insert(Item : STRING) RETURNS BOOLEAN
    DECLARE NewNode, Previous, Current : INTEGER
    IF FreePointer = 0 THEN
        RETURN FALSE      // no free node: the list is full
    ENDIF
    NewNode ← FreePointer
    FreePointer ← Next[NewNode]
    Data[NewNode] ← Item
    Previous ← 0
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] < Item DO
        Previous ← Current
        Current ← Next[Current]
    ENDWHILE
    Next[NewNode] ← Current
    IF Previous = 0 THEN
        StartPointer ← NewNode
    ELSE
        Next[Previous] ← NewNode
    ENDIF
    RETURN TRUE
ENDFUNCTION

FUNCTION Delete(Item : STRING) RETURNS BOOLEAN
    DECLARE Previous, Current : INTEGER
    Previous ← 0
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] <> Item DO
        Previous ← Current
        Current ← Next[Current]
    ENDWHILE
    IF Current = 0 THEN
        RETURN FALSE      // not found
    ENDIF
    IF Previous = 0 THEN
        StartPointer ← Next[Current]
    ELSE
        Next[Previous] ← Next[Current]
    ENDIF
    Next[Current] ← FreePointer
    FreePointer ← Current
    RETURN TRUE
ENDFUNCTION`;

// simulate
let L = makeList(Array(6).fill(""), [2, 3, 4, 5, 6, 0], 0, 1);
const steps = [];
const record = (op, note) => steps.push([op, L.start, L.free, listOrder(L).join(", ") || "(empty)", freeOrder(L).join(", ") || "(none)", note]);
record("InitialiseList", "all six nodes are free");
const doIns = (item) => { const r = listInsert(L, item); L = r.list; record(`Insert "${item}"`, `node ${r.node}`); return r; };
const i1 = doIns("Tendai"), i2 = doIns("Farai"), i3 = doIns("Rudo"), i4 = doIns("Anesu"), i5 = doIns("Zodwa");
chk(i1.node, 1); chk(i2.node, 2); chk(i3.node, 3); chk(i4.node, 4); chk(i5.node, 5);
same(listOrder(L), ["Anesu", "Farai", "Rudo", "Tendai", "Zodwa"]);
const afterFive = listMd(L);
const d1 = listDelete(L, "Rudo"); L = d1.list; record(`Delete "Rudo"`, `node ${d1.node} freed`);
chk(d1.node, 3);
const i6 = doIns("Nyasha"); chk(i6.node, 3); // reuses the freed node
same(listOrder(L), ["Anesu", "Farai", "Nyasha", "Tendai", "Zodwa"]);
const afterReuse = listMd(L);
const stepTable = mdTable(["Operation", "Start", "Free", "List order", "Free nodes in order", "Note"], steps);
// find
const findIdx = (l, item) => { let c = l.start; while (c !== 0 && l.data[c - 1] !== item) c = l.next[c - 1]; return c; };
chk(findIdx(L, "Tendai"), 1); chk(findIdx(L, "Peter"), 0);
// positions of Tendai in the walk
const walk = (l, item) => { const out = []; let c = l.start; while (c !== 0) { out.push(c); if (l.data[c - 1] === item) break; c = l.next[c - 1]; } return out; };
same(walk(L, "Tendai"), [4, 2, 3, 1]);

const pyCode = `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.start = None

    def insert(self, item):
        new_node = Node(item)
        previous = None
        current = self.start
        while current is not None and current.data < item:
            previous = current
            current = current.next
        new_node.next = current
        if previous is None:
            self.start = new_node
        else:
            previous.next = new_node

    def delete(self, item):
        previous = None
        current = self.start
        while current is not None and current.data != item:
            previous = current
            current = current.next
        if current is None:
            return False
        if previous is None:
            self.start = current.next
        else:
            previous.next = current.next
        return True

    def to_list(self):
        items = []
        current = self.start
        while current is not None:
            items.append(current.data)
            current = current.next
        return items

names = LinkedList()
for name in ("Tendai", "Farai", "Rudo", "Anesu", "Zodwa"):
    names.insert(name)
print(names.to_list())
print(names.delete("Rudo"))
names.insert("Nyasha")
print(names.to_list())
print(names.delete("Peter"))`;
const run = pyBlock(pyCode);
same(run.text, "['Anesu', 'Farai', 'Rudo', 'Tendai', 'Zodwa']\nTrue\n['Anesu', 'Farai', 'Nyasha', 'Tendai', 'Zodwa']\nFalse");
const compare = mdTable(["Feature", "Array", "Linked list"], [
  ["Size", "fixed when declared", "can grow and shrink (in a dynamic version)"],
  ["Insert or delete in the middle", "items after the position must be shifted", "only pointers change"],
  ["Access to the n-th item", "directly, using the index", "by following n pointers"],
  ["Binary search", "possible if the array is sorted", "not possible: items cannot be reached directly"],
  ["Memory per item", "the item only", "the item and a pointer"],
]);
export const snips = { pseudo: codeBlock(pseudo), stepTable, afterFive, afterReuse, py: run.code, out: run.output, compare };
if (process.argv[1].endsWith("w4a-linked-list-algorithms.mjs")) console.log(Object.values(snips).join("\n\n"));
