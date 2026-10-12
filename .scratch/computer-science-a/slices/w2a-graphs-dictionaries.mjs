// Slice w2a: graphs, dictionaries and implementing ADTs (acs.ds.graphs-dictionaries, Cambridge A Level).
import { concept, P, chk, same, CAM, hashMod, asciiSum, pyBlock, py, mdTable, codeBlock } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";
import { adjacency, matrixMd, listMd, hashProbe, hashChain, slotsMd, chainMd, stackTrace, queueTrace } from "../tables/w2a-adt.mjs";

concept("acs.ds.graphs-dictionaries", { file: "ds/graphs-dictionaries", keyPrefix: "ds.graphs-dictionaries", applies: CAM }, (b) => {
  // graph for questions: bus stops P, Q, R, S, T
  const nodes = ["P", "Q", "R", "S", "T"];
  const edges = [["P", "Q", 6], ["P", "R", 3], ["Q", "S", 2], ["R", "S", 7], ["S", "T", 4], ["Q", "T", 9]];
  const { m, list } = adjacency(nodes, edges);
  chk(m[0][1], 6); chk(m[2][3], 7); chk(m[0][4], 0);
  const neighboursS = list.S.map(([n]) => n).sort();
  same(neighboursS, ["Q", "R", "T"]);
  const degreeQ = list.Q.length; chk(degreeQ, 3);
  const matrixCells = nodes.length ** 2, listEntries = edges.length * 2;
  chk(matrixCells, 25); chk(listEntries, 12);
  const dEdges = [["P", "Q", 6], ["R", "P", 3], ["S", "Q", 2], ["S", "T", 4]];
  const dir = adjacency(nodes, dEdges, true);
  chk(dir.m[0][2], 0); chk(dir.m[2][0], 3);
  // hash table: keys with size 8
  const keys = ["Sipho", "Kudzi", "Tinashe", "Blessing", "Anesu"];
  same(hashProbe(keys, 8).steps.map((x) => x.slot), [3, 7, 4, 0, 5]);
  const size = 8;
  const hv = keys.map((k) => hashMod(k, size));
  chk(asciiSum("Nyasha"), 612); chk(hashMod("Nyasha", 8), 4);
  const probe = hashProbe(keys, size);
  const chain = hashChain(keys, size);
  const hashT = mdTable(["Key", "Sum of ASCII codes", "Sum MOD 8"], keys.map((k, i) => [k, asciiSum(k), hv[i]]));
  // python dictionary
  const code = `stock = {"maize": 40, "beans": 15}
stock["rice"] = 22
stock["beans"] = stock["beans"] + 5
print(stock["beans"])
print("sugar" in stock)
print(len(stock))`;
  const run = pyBlock(code);
  same(run.text, "20\nFalse\n3");
  // stack and queue traces
  const st = stackTrace([["push", 6], ["push", 1], ["pop"], ["push", 8], ["push", 2]], 5);
  same(st.map((r) => r[1]), [0, 1, 0, 1, 2]);
  const qu = queueTrace([["enqueue", 4], ["enqueue", 9], ["enqueue", 1], ["dequeue"], ["dequeue"]]);
  same(qu.map((r) => r[3]), ["4 → null", "4 → 9 → null", "4 → 9 → 1 → null", "9 → 1 → null", "1 → null"]);

  // ---- multiple choice
  mc(b, 1, "RECALL", "What is the name of a link between two vertices of a graph?",
    ["An edge", "Correct."],
    [["A key", "A key identifies an entry in a dictionary."], ["A frame", "A frame belongs to memory management."], ["A node pointer", "A pointer links items in a list; the link of a graph is an edge."]],
    "Graphs have vertices (nodes) and edges.");
  mc(b, 2, "UNDERSTANDING", "Which graph feature would be used to represent a one-way street between two junctions?",
    ["A directed edge", "Correct: it can be used in one direction only."],
    [["A weighted vertex", "Weights are attached to edges."], ["A duplicate key", "Keys belong to dictionaries."], ["An empty matrix", "An empty matrix has no edges."]],
    "In a directed graph an edge goes from one vertex to another only.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does an adjacency matrix store for a weighted graph?",
    ["The weight of the edge between each pair of vertices", "Correct."],
    [["The names of the vertices in alphabetical order only, with no edges", "The matrix shows edges, not just names."], ["The shortest path between each pair of the vertices", "That is calculated by an algorithm."], ["Only the vertices that do not have any edges", "It records the edges."]],
    "Row i, column j holds the weight of the edge from vertex i to vertex j.");
  mc(b, 3, "ANALYSIS", "A graph has 1000 vertices but each vertex is joined to only 3 others. Which representation uses less memory?",
    ["An adjacency list", "Correct: it stores only the existing edges."],
    [["An adjacency matrix", "It needs 1000 × 1000 cells."], ["They use exactly the same", "The matrix is far larger."], ["A hash table with one slot", "That cannot store the graph."]],
    "A list grows with the number of edges; a matrix grows with the square of the vertices.", { hints: ["Count the cells needed by a matrix."] });
  mc(b, 2, "UNDERSTANDING", "What is the main purpose of a dictionary?",
    ["To find a value quickly from its key", "Correct."],
    [["To keep values in numerical order", "A dictionary is not kept in order."], ["To store only one item at a time", "It stores many pairs."], ["To translate a program into machine code", "That is a translator."]],
    "Pairs of keys and values are looked up by key.");
  mc(b, 3, "UNDERSTANDING", "What is a collision in a hash table?",
    ["Two different keys give the same hash value", "Correct: they would be stored in the same slot."],
    [["The table is full", "A full table is a different problem."], ["A key cannot be found", "A missing key is not a collision."], ["The hashing function produces a negative number", "A collision concerns two keys."]],
    "Collisions are handled by probing or chaining.", { hints: ["Think about the slot a key is stored in."] });
  mc(b, 3, "APPLICATION", "A stack is implemented using an array and a pointer to the top item. What does a pop operation do?",
    ["It returns the top item and moves the pointer down", "Correct."],
    [["It adds an item at the bottom of the array instead", "Items are added at the top."], ["It removes the first item that is in the array", "The top item is removed."], ["It sorts all of the items in the array", "A stack does not sort."]],
    "Pop takes the top item and reduces the top pointer.", { hints: ["Which end of the stack is used?"] });
  mc(b, 3, "ANALYSIS", "Why can a program that uses a queue be unchanged when the queue is implemented as a linked list instead of an array?",
    ["The program uses only the operations of the ADT, not its storage", "Correct."],
    [["The linked list and the array are exactly the same structure in memory", "They are different structures."], ["A queue can only be a linked list", "It can be an array too."], ["The program cannot see the queue at all", "It uses the queue through its operations."]],
    "An ADT hides the implementation behind its operations.", { hints: ["What does the program need to know about the queue?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In an undirected graph the adjacency matrix is symmetrical about its main diagonal.", answer: true,
    explanation: "True. An edge from X to Y is also an edge from Y to X, so the cell values are mirrored." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A dictionary may contain the same key twice with two different values.", answer: false,
    explanation: "False. Keys are unique. Adding an existing key replaces its value." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Vertex", "A point of a graph"], ["Adjacency list", "For each vertex, a list of its neighbours"], ["Hashing function", "Turns a key into an array index"], ["Linear probing", "Trying the next slot when a slot is taken"], ["Chaining", "Keeping a list of the keys that share a slot"]],
    explanation: "Terms for graphs and hash tables." });
  b.fib({ d: 3, skill: "UNDERSTANDING", hints: ["A hash table needs a function and a way to deal with equal results."],
    stem: "Complete the description of a hash table.",
    template: "A {{blank:a}} function turns the key into an array index. If two keys give the same index there is a {{blank:b}}, which can be dealt with by linear {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["hashing"], choices: ["hashing", "sorting", "searching", "compiling"] },
      { id: "b", accepted: ["collision"], choices: ["collision", "overflow", "recursion", "iteration"] },
      { id: "c", accepted: ["probing"], choices: ["probing", "sorting", "folding", "pushing"] },
    ], explanation: "Hashing function, collision, probing." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Look in the row of the matrix for P and the column for R."],
    stem: "The weighted graph of bus stops has these edges (minutes):\n\n" + mdTable(["Edge", "Weight"], edges.map(([a, c, w]) => [`${a} – ${c}`, w])) + "\n\nIt is stored as an adjacency matrix. What value is in row R, column S?",
    value: 7, wrong: [3, 0], workedSolution: "The edge R – S has weight 7, and the graph is undirected, so row R, column S holds 7.", explanation: "7." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the edges that include Q."],
    stem: "In the graph of the previous question, how many neighbours does vertex Q have?",
    value: degreeQ, wrong: [2, 4], workedSolution: "Q is joined to P, S and T.", explanation: "Three neighbours." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Each undirected edge appears under both of its vertices."],
    stem: "How many entries are there altogether in the adjacency list of the same graph with 6 edges (each undirected edge is listed under both ends)?",
    value: listEntries, wrong: [6, 25], workedSolution: "6 edges × 2 = 12 entries. (A matrix would need 5 × 5 = 25 cells.)", explanation: "12 entries." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the ASCII codes (given) and divide by the size, taking the remainder."],
    stem: "A hash table has 8 slots (numbered 0 to 7). The hashing function adds the ASCII codes of the characters in the key and takes the remainder when divided by 8. The sum of the codes of the key `Nyasha` is 612. In which slot is it stored?",
    value: hashMod("Nyasha", 8), wrong: [3, 76], workedSolution: "612 ÷ 8 = 76 remainder 4, so the slot is 4.", explanation: "612 MOD 8 = 4." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the method of dealing with a collision by using the next free slot.", accepted: ["linear probing", "probing", "open addressing"], wrong: ["chaining", "hashing"], explanation: "Linear probing." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare memory and the speed of checking an edge."],
    stem: "Compare an adjacency matrix with an adjacency list as ways of storing a graph. [4]",
    points: ["A matrix uses n × n cells whatever the number of edges", "A list uses space only for the edges that exist, so it is smaller for a graph with few edges", "In a matrix, whether an edge exists is found directly with one access", "In a list, the neighbour list has to be searched to find an edge"],
    modelAnswer: "A matrix needs n × n cells whatever the number of edges, while a list uses space only for the edges that exist. A matrix shows whether an edge exists with one access, but a list has to be searched.",
    explanation: "Memory and look-up time." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Say how the index is found, what a collision is and how it is dealt with."],
    stem: "Describe how a dictionary can be implemented as a hash table. [3]",
    points: ["A hashing function is applied to the key to give an index into an array", "The key-value pair is stored in that position", "If two keys give the same index (a collision), the next free slot is used (linear probing) or the keys are chained in a list"],
    modelAnswer: "A hashing function turns the key into an index of an array, and the key and value are stored there. If two keys give the same index, the next free slot is used or the keys are chained together.",
    explanation: "Hash, store, collisions." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about what operations are needed and what is stored."],
    stem: "Explain how a queue can be implemented using a linked list. [4]",
    points: ["Each item is a node holding data and a pointer to the next node", "A head pointer refers to the front node and a tail pointer to the last", "Enqueue adds a new node after the tail and moves the tail pointer", "Dequeue returns the data in the head node and moves the head pointer to the next node"],
    modelAnswer: "Each item is a node with a data value and a pointer to the next node. A head pointer marks the front and a tail pointer marks the last node. Enqueue adds a node after the tail and moves the tail pointer, and dequeue returns the head node's data and moves the head pointer to the next node.",
    explanation: "Nodes, pointers, enqueue, dequeue." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Compute the remainder for each key, then place the keys in order.", "A taken slot means the next one is tried."],
    explanation: "Hashing with linear probing on a table of 8 slots.",
    stem: "A hash table with 8 slots (0 to 7) stores names. The hashing function adds the ASCII codes of the characters of the key and takes the remainder when divided by 8. The values are:\n\n" + hashT + "\n\nThe keys are stored in the order Sipho, Kudzi, Tinashe, Blessing, Anesu. If a slot is taken, the next slot is tried (and the search wraps round after slot 7).",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the slots in which Sipho and Kudzi are stored.", template: "Sipho: slot {{blank:s}}\n\nKudzi: slot {{blank:r}}", blanks: [{ id: "s", accepted: [String(probe.steps[0].slot)], input: "number" }, { id: "r", accepted: [String(probe.steps[1].slot)], input: "number" }], wrong: [["0", "0"]], explanation: "Each key goes to the slot given by its hash value, as neither slot is taken." }),
      P.num({ label: "(b)", marks: 1, stem: "In which slot is Blessing stored? (Remember that the search wraps round after slot 7.)", value: probe.steps[3].slot, wrong: [probe.steps[3].hash, 5], workedSolution: `Blessing's hash value is ${probe.steps[3].hash}; ${probe.steps[3].probes === 1 ? "that slot is empty" : "that slot is taken, so the next free slot is used: " + probe.steps[3].slot}.`, explanation: `Blessing is stored in slot ${probe.steps[3].slot}.` }),
      P.num({ label: "(c)", marks: 1, stem: "In which slot is Anesu stored?", value: probe.steps[4].slot, wrong: [probe.steps[4].hash, 7], workedSolution: `Anesu's hash value is ${probe.steps[4].hash}; the slot used is ${probe.steps[4].slot}.`, explanation: `Anesu is stored in slot ${probe.steps[4].slot}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the program finds Blessing again.", points: ["It applies the hashing function to the key to get the starting slot", "It looks at that slot and the following slots (wrapping round) until it finds Blessing (or an empty slot)"], modelAnswer: "It applies the hashing function to Blessing to get the starting slot, then checks that slot and the following ones, wrapping round, until Blessing is found.", explanation: "Follow the same probes." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["A directed edge goes from the first vertex to the second only."],
    explanation: "Reading adjacency lists and matrices for a directed graph.",
    stem: "A directed weighted graph of one-way streets between five junctions has the edges P to Q (6), R to P (3), S to Q (2) and S to T (4). It is stored as an adjacency list:\n\n" + listMd(nodes, dir.list),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many entries are there altogether in the adjacency list?", value: 4, wrong: [8, 25], workedSolution: "Each directed edge appears once: 4 entries.", explanation: "4 entries." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which vertex has no edges leading out of it?", options: [["T", "Correct: its list is empty."], ["S", "S has two outgoing edges."], ["R", "R has an edge to P."], ["P", "P has an edge to Q."]], answer: "A", explanation: "T has no outgoing edges." }),
      P.manual({ label: "(c)", marks: 2, stem: "State what is stored in row R, column P of the adjacency matrix, and what is in row P, column R.", points: ["Row R, column P holds 3", "Row P, column R holds no edge (a blank or 0)"], modelAnswer: "Row R, column P holds 3, and row P, column R holds nothing (no edge), because the edge is directed from R to P.", explanation: "The matrix is not symmetrical for a directed graph." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give one advantage of storing the graph as an adjacency list rather than as a matrix.", points: ["It uses less memory when there are few edges", "Only the existing edges are stored"], modelAnswer: "It uses less memory when there are few edges, because only the existing edges are stored.", explanation: "Space grows with the edges." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Abstract data type", "Data together with the operations on it, defined without saying how it is stored.");
  b.card("DEFINITION", "Graph", "Vertices joined by edges; edges may be directed and/or weighted.");
  b.card("CONCEPT", "Adjacency matrix", "An n × n array; cell (X, Y) holds the weight of the edge from X to Y. Symmetrical for an undirected graph.");
  b.card("CONCEPT", "Adjacency list", "For each vertex, a list of its neighbours (with weights); uses less memory when there are few edges.");
  b.card("DEFINITION", "Dictionary", "An ADT of unique key-value pairs, searched by key.");
  b.card("CONCEPT", "Hash table", "Implements a dictionary: a hashing function turns the key into an array index.");
  b.card("CONCEPT", "Collisions", "Two keys giving the same index; handled by linear probing (next free slot) or chaining (a list in each slot).");
  b.card("CONCEPT", "Stack in an array", "Array plus a top pointer: push increases the pointer and stores; pop returns the item and decreases the pointer.");
  b.card("CONCEPT", "Queue in a linked list", "Head and tail pointers: enqueue adds a node at the tail; dequeue removes the head node.");
});
