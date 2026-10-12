// W2a exam-format items: four THEORY10 and three THEORY5 (Cambridge Paper 1 / Paper 3 style), all Cambridge only.
import { concept, P, EXAM, checkExam, CAM, chk, same, runAsm, toBase, schedule, pageReplace, mdTable, codeBlock, evalRpn, round } from "../lib.mjs";
import { edgesToGraph, dijkstraSteps, aStarSteps, edgeMd } from "../tables/w2a-graph.mjs";
import { tokenise } from "../tables/w2a-compiler.mjs";
import { accepts, bnfText, digits } from "../tables/w2a-bnf.mjs";

const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, applies: CAM };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true, applies: CAM };
const C = (k) => `acs.${k}`;

concept(C("asm.bit-manipulation"), { file: "exam/w2a-theory", keyPrefix: "exam.w2a-theory", applies: CAM }, (b) => {
  // ------------------------------------------------------------------ 1. Assembly trace with bit manipulation (Paper 1)
  {
    const src = ["LDD Status", "AND B00000110", "LSR #1", "STO Level", "CMP #3", "JPE Full", "LDM #0", "JMP Done", "Full: LDM #1", "Done: STO Alarm", "END", "Status: B10010111", "Level: 0", "Alarm: 0"];
    const withStatus = (s) => src.map((l) => (l.startsWith("Status:") ? `Status: ${s}` : l));
    const r1 = runAsm(withStatus("B10010111"), { base: 640 });
    const r2 = runAsm(withStatus("B10010101"), { base: 640 });
    chk(r1.trace[2].acc, 3); chk(r1.mem[r1.labels.Alarm], 1); chk(r2.mem[r2.labels.Alarm], 0); chk(r2.mem[r2.labels.Level], 2);
    chk(r1.labels.Done, 649);
    const listing = codeBlock(src.map((l, i) => `${640 + i}  ${l}`).join("\n"));
    b.struct({
      ...TH10, d: 3, paper: "Cambridge Paper 1",
      concepts: [C("asm.bit-manipulation"), C("asm.assembly-programs")],
      stem: "The controller of a tank near Kadoma reads a status byte. Bits are numbered from 0 at the right-hand end: bit 1 and bit 2 together give the water level (0 to 3). The program below starts at address 640. `LSR #1` shifts ACC one place right, filling with zero. The byte `Status` holds `10010111`.\n\n" + listing,
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "What is the effect of the instruction `AND B00000110`?", options: [["It keeps bits 1 and 2 and clears the other bits", "Correct: a 1 in the mask keeps the bit."], ["It sets bits 1 and 2 to 1 and keeps the other bits", "That needs OR."], ["It toggles bits 1 and 2 and clears the other bits", "That needs XOR."], ["It clears bits 1 and 2 and keeps all the other bits", "The 1s keep those bits."]], answer: "A", explanation: "AND with a mask keeps the bits that are 1 in the mask." }),
        P.bits({ label: "(b)", marks: 2, stem: "State the 8-bit value in ACC after `LSR #1` is executed.", value: 3, base: 2, width: 8, explanation: "10010111 AND 00000110 = 00000110; one shift right gives 00000011." }),
        P.num({ label: "(c)", marks: 1, stem: "State the value held in `Alarm` when the program ends.", value: 1, wrong: [0, 3], workedSolution: "ACC = 3 equals 3 in the comparison, so JPE jumps to Full and 1 is stored.", explanation: "Alarm = 1." }),
        P.num({ label: "(d)", marks: 1, stem: "The program is run again with `Status` holding `10010101`. State the value held in `Alarm` when it ends.", value: 0, wrong: [1, 2], workedSolution: "AND gives 00000100; LSR gives 00000010 = 2, not equal to 3, so 0 is stored.", explanation: "Alarm = 0." }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe how the program uses a mask, a shift and a comparison to decide the value for `Alarm`.", points: ["The mask B00000110 isolates the two water-level bits", "The shift moves the level bits to bits 0 and 1 so that they form the number 0 to 3", "The level is compared with 3 and Alarm is set to 1 if they are equal, otherwise 0"], modelAnswer: "AND with B00000110 isolates the two level bits. LSR #1 moves them to the right so they form a number from 0 to 3. The number is compared with 3 and Alarm is 1 if it is equal, otherwise 0.", explanation: "Mask, shift, compare." }),
        P.manual({ label: "(f)", marks: 2, stem: "State the purpose of the instruction `JMP Done` and what would happen to `Alarm` if it were left out.", points: ["It skips the Full section so that LDM #1 is not executed after LDM #0", "Without it Alarm would always be set to 1 (the value 0 would be overwritten)"], modelAnswer: "It jumps over the Full section. Without it, LDM #1 would be executed after LDM #0, so Alarm would always become 1.", explanation: "Jump over the alternative section." }),
      ]),
      hints: ["Work out the byte after each instruction in groups of four bits."],
      explanation: "The mask keeps bits 1 and 2 (00000110), the shift gives 3, which equals 3, so Alarm = 1; with 10010101 the level is 2 and Alarm = 0.",
    });
  }

  // ------------------------------------------------------------------ 2. Scheduling and page replacement (Paper 3)
  {
    const procs = [{ id: "X", arrival: 0, burst: 5 }, { id: "Y", arrival: 1, burst: 3 }, { id: "Z", arrival: 2, burst: 2 }];
    const sjf = schedule(procs, "SJF");
    same(sjf.gantt.map((g) => g.id), ["X", "Z", "Y"]);
    chk(sjf.table.find((t) => t.id === "Y").waiting, 6); chk(sjf.avgWaiting, 3);
    const R = [3, 1, 4, 1, 5, 3, 2, 5, 1, 4];
    const fifo = pageReplace(R, 3, "FIFO"); chk(fifo.faults, 8);
    b.struct({
      ...TH10, d: 4, paper: "Cambridge Paper 3",
      concepts: [C("os.process-scheduling"), C("os.memory-management")],
      stem: "A computer at a clinic runs three processes. The table gives their arrival times and burst times (in ms).\n\n" + mdTable(["Process", "Arrival time", "Burst time"], procs.map((p) => [p.id, p.arrival, p.burst])) + "\nThe operating system uses shortest job first scheduling (without pre-emption). Pages of a program are requested in this order: " + R.join(", ") + ". Three frames of memory are empty at the start.",
      parts: checkExam(EXAM.THEORY10, [
        P.fib({ label: "(a)", marks: 2, stem: "State the order in which the processes run.", template: "X, {{blank:a}}, {{blank:b}}", blanks: [{ id: "a", accepted: ["Z"], choices: ["Y", "Z"] }, { id: "b", accepted: ["Y"], choices: ["Y", "Z"] }], wrong: [["Y", "Z"]], explanation: "At time 5 Y and Z are ready; Z has the shorter burst (2), so it runs first." }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the waiting time of process Y.", value: 6, wrong: [3, 7], workedSolution: "1. Y completes at 10 and arrived at 1: turnaround 9.\n2. Waiting = 9 - 3 = 6 ms.", explanation: "Waiting time = 6 ms." }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the mean waiting time of the three processes, in ms.", value: 3, wrong: [2, 6], workedSolution: "Waiting times: X 0, Y 6, Z 3. Mean = 9 ÷ 3 = 3.", explanation: "Mean waiting time = 3 ms." }),
        P.num({ label: "(d)", marks: 2, stem: "The pages are replaced using first in first out. State the number of page faults.", value: fifo.faults, wrong: [10, 5], workedSolution: "Trace of the frames (oldest first):\n\n" + mdTable(["Page", "Frames", "Fault?"], fifo.rows.map((x) => [x.ref, x.frames.join(" "), x.fault ? "yes" : "no"])) + `\n\nThere are ${fifo.faults} faults.`, explanation: `FIFO gives ${fifo.faults} faults.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Give one disadvantage of shortest job first scheduling.", points: ["Long processes may be kept waiting (starved) while shorter ones keep arriving", "The burst time must be known or estimated in advance"], modelAnswer: "A long process may wait for a very long time if shorter processes keep arriving, and the burst times have to be known or estimated.", explanation: "Starvation, and the need to know burst times." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Process Y has to wait for a disk read to finish. In which state is it?", options: [["Blocked", "Correct."], ["Running", "It cannot use the processor."], ["Ready", "It cannot run until the read finishes."], ["Terminated", "It has not finished."]], answer: "A", explanation: "Waiting for input or output is the blocked state." }),
      ]),
      hints: ["At time 5, which ready process has the shorter burst?", "Waiting time = completion - arrival - burst."],
      explanation: "SJF order X, Z, Y; Y waits 6 ms; mean 3 ms; FIFO gives 8 page faults.",
    });
  }

  // ------------------------------------------------------------------ 3. Compilation, BNF and RPN (Paper 3)
  {
    const toks = tokenise("Fee ← (Base + 15) * Rate");
    chk(toks.length, 9);
    chk(evalRpn("6 4 + 5 * 12 -".split(" ")).value, 38);
    const G = { "<digit>": digits.map((d) => [d]), "<ticket>": [["T", "<digit>", "<digit>"]] };
    chk(accepts(G, "<ticket>", "T47") ? 1 : 0, 1); chk(accepts(G, "<ticket>", "47T") ? 1 : 0, 0);
    b.struct({
      ...TH10, d: 4, paper: "Cambridge Paper 3",
      concepts: [C("translation.compilation-stages"), C("translation.bnf-syntax-diagrams"), C("translation.rpn")],
      stem: "A compiler translates the statement\n\n" + codeBlock("Fee ← (Base + 15) * Rate") + "\nThe grammar of a ticket code is given in Backus-Naur Form:\n\n" + bnfText(G),
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Which stage of compilation breaks the statement into tokens?", options: [["Lexical analysis", "Correct."], ["Syntax analysis", "That checks the grammar using the tokens."], ["Code generation", "That produces the object code."], ["Optimisation", "That improves the generated code."]], answer: "A", explanation: "Lexical analysis produces the tokens." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of tokens in the statement (the brackets are tokens).", value: toks.length, wrong: [7, 8], workedSolution: "Fee, ←, (, Base, +, 15, ), *, Rate = 9.", explanation: "9 tokens." }),
        P.fib({ label: "(c)", marks: 3, stem: "The expression `(6 + 4) * 5 - 12` is converted to Reverse Polish Notation. Complete the postfix expression.", template: "6 4 {{blank:a}} 5 {{blank:b}} 12 {{blank:c}}", blanks: [{ id: "a", accepted: ["+"], choices: ["+", "-", "*", "/"] }, { id: "b", accepted: ["*"], choices: ["+", "-", "*", "/"] }, { id: "c", accepted: ["-"], choices: ["+", "-", "*", "/"] }], wrong: [["-", "+", "*"]], explanation: "6 4 + 5 * 12 -" }),
        P.num({ label: "(d)", marks: 1, stem: "Evaluate the postfix expression `6 4 + 5 * 12 -`.", value: 38, wrong: [50, 18], workedSolution: "6 + 4 = 10; 10 × 5 = 50; 50 - 12 = 38.", explanation: "38." }),
        P.fib({ label: "(e)", marks: 2, stem: "Decide whether each string is a valid `<ticket>`.", template: "T47 is {{blank:a}}.\n\n47T is {{blank:b}}.", blanks: [{ id: "a", accepted: ["valid"], choices: ["valid", "not valid"] }, { id: "b", accepted: ["not valid"], choices: ["valid", "not valid"] }], wrong: [["not valid", "valid"]], explanation: "A ticket is the letter T followed by two digits." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain one reason why a compiler converts expressions to Reverse Polish Notation.", points: ["No brackets or precedence rules are needed to evaluate it", "It can be evaluated in one left-to-right pass using a stack"], modelAnswer: "It needs no brackets or precedence rules, and it can be evaluated in one pass from left to right using a stack.", explanation: "Simple evaluation with a stack." }),
      ]),
      hints: ["Operators come after their operands in postfix.", "Brackets are tokens too."],
      explanation: "9 tokens; postfix 6 4 + 5 * 12 - = 38; T47 is valid, 47T is not.",
    });
  }

  // ------------------------------------------------------------------ 4. Dijkstra and A* (Paper 3)
  {
    const edges = [["A", "B", 3], ["A", "C", 6], ["B", "C", 2], ["B", "D", 5], ["C", "D", 1], ["C", "E", 4], ["D", "E", 2]];
    const g = edgesToGraph(edges);
    const dj = dijkstraSteps(g, "A");
    same(dj.rows.map((r) => r.visited), ["A", "B", "C", "D", "E"]);
    const afterB = dj.rows[1];
    chk(afterB.dist.C, 5); chk(afterB.dist.D, 8); chk(dj.dist.E, 8);
    const afterC = dj.rows[2];
    chk(afterC.dist.D, 6); chk(afterC.dist.E, 9);
    const h = { A: 6, B: 4, C: 2, D: 1, E: 0 };
    const as = aStarSteps(g, "A", "E", h);
    chk(as.rows.find((r) => r.node === "C").f, 7);
    same(as.path, ["A", "B", "C", "D", "E"]);
    b.struct({
      ...TH10, d: 4, paper: "Cambridge Paper 3",
      concepts: [C("ai.graphs-search")],
      stem: "A weighted graph joins five villages A to E. The weights are distances in km:\n\n" + edgeMd(edges) + "\nDijkstra's algorithm is used from A. The distances after A and B have been visited are:\n\n" + mdTable(["Village", "A", "B", "C", "D", "E"], [["Distance", 0, 3, 5, 8, "∞"]]),
      parts: checkExam(EXAM.THEORY10, [
        P.fib({ label: "(a)", marks: 2, stem: "The next village to be visited is C. State the new distance for D and for E after C has been visited.", template: "D = {{blank:d}}\n\nE = {{blank:e}}", blanks: [{ id: "d", accepted: ["6"], input: "number" }, { id: "e", accepted: ["9"], input: "number" }], wrong: [["8", "99"]], explanation: "Through C: D = 5 + 1 = 6 and E = 5 + 4 = 9." }),
        P.num({ label: "(b)", marks: 1, stem: "State the shortest distance from A to E, in km.", value: 8, wrong: [9, 11], workedSolution: "A to B 3, B to C 2, C to D 1, D to E 2: 8 km.", explanation: "8 km." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which route from A to E is the shortest?", options: [["A, B, C, D, E", "Correct: 3 + 2 + 1 + 2 = 8."], ["A, C, E", "That is 6 + 4 = 10."], ["A, B, D, E", "That is 3 + 5 + 2 = 10."], ["A, C, D, E", "That is 6 + 1 + 2 = 9."]], answer: "A", explanation: "The shortest route is A, B, C, D, E at 8 km." }),
        P.num({ label: "(d)", marks: 1, stem: "The A* algorithm is used from A to E with these heuristic estimates h: A 6, B 4, C 2, D 1, E 0. State the value of f for village C when its best distance g has been found.", value: 7, wrong: [5, 2], workedSolution: "g(C) = 5 and h(C) = 2, so f = 7.", explanation: "f = 5 + 2 = 7." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the heuristic used in A* must not overestimate the remaining distance.", points: ["If h is too large the f value of a village on the shortest route may be too high", "So that route may not be chosen, and A* could return a route that is not the shortest"], modelAnswer: "If h is too large, a village on the shortest route can get an f value that is too high, so that route might not be chosen and A* could return a longer route.", explanation: "Overestimates can hide the best route." }),
        P.manual({ label: "(f)", marks: 3, stem: "Compare Dijkstra's algorithm with the A* algorithm.", points: ["Dijkstra finds the shortest distance to every village; A* finds a route to one goal", "A* uses a heuristic estimate to guide the search, Dijkstra does not", "A* usually examines fewer villages, but needs a suitable heuristic"], modelAnswer: "Dijkstra finds the shortest distance to every village, while A* finds a route to one goal. A* uses a heuristic estimate to guide the search, so it usually examines fewer villages, but it needs a suitable heuristic.", explanation: "Scope, heuristic, efficiency." }),
      ]),
      hints: ["Through C the distance to D is 5 + 1.", "f = g + h."],
      explanation: "Through C: D = 6, E = 9; the shortest distance A to E is 8 km (A, B, C, D, E); f(C) = 7.",
    });
  }

  // ================================================================== THEORY5
  // ------------------------------------------------------------------ 5. Operating system functions and utilities (Paper 1)
  b.struct({
    ...TH5, d: 2, paper: "Cambridge Paper 1",
    concepts: [C("os.functions-utilities")],
    stem: "A school in Masvingo has a computer laboratory. The operating system requires every student to log in with a password.",
    parts: checkExam(EXAM.THEORY5, [
      P.mcq({ label: "(a)", marks: 1, stem: "Which management task of the operating system controls who may log in and which files they may open?", options: [["Security management", "Correct."], ["Process management", "That shares the processor."], ["Memory management", "That allocates main memory."], ["File management", "That records where files are stored."]], answer: "A", explanation: "Passwords and access rights are security management." }),
      P.fib({ label: "(b)", marks: 2, stem: "Complete the sentences about utility software.", template: "{{blank:a}} software makes copies of files so that they can be restored. {{blank:b}} software joins the pieces of each file together on a magnetic disk.", blanks: [{ id: "a", accepted: ["Back-up"], choices: ["Back-up", "Defragmentation", "Virus checker", "Formatter"] }, { id: "b", accepted: ["Defragmentation"], choices: ["Back-up", "Defragmentation", "Virus checker", "Formatter"] }], wrong: [["Formatter", "Back-up"]], explanation: "Back-up copies files; defragmentation rejoins fragments." }),
      P.manual({ label: "(c)", marks: 2, stem: "Several programs in the laboratory use the same DLL file. Give two benefits of using a DLL.", points: ["One copy is loaded and shared, so less memory is used", "A correction to the DLL reaches every program that uses it / less code to write"], modelAnswer: "One copy is shared by the programs, so less memory is used, and a correction to the DLL benefits every program that uses it.", explanation: "Shared copy and easy updates." }),
    ]),
    hints: ["Think about which of the five management tasks deals with passwords."],
    explanation: "Passwords belong to security management; back-up copies files; defragmentation rejoins them; a DLL is shared.",
  });

  // ------------------------------------------------------------------ 6. Translators and IDEs (Paper 1)
  b.struct({
    ...TH5, d: 2, paper: "Cambridge Paper 1",
    concepts: [C("translation.translators-ide")],
    stem: "A student writes a program in a high-level language using an integrated development environment (IDE).",
    parts: checkExam(EXAM.THEORY5, [
      P.mcq({ label: "(a)", marks: 1, stem: "Why must the program be translated before it can be run?", options: [["The processor can execute only machine code", "Correct."], ["The IDE cannot store high-level code", "An IDE stores source code."], ["High-level code uses too much memory to store", "Size is not the reason."], ["Machine code is easier for people to read", "Machine code is harder to read."]], answer: "A", explanation: "Only machine code can be executed directly." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the IDE feature that stops the program at a chosen line so that the values of variables can be examined.", accepted: ["breakpoint", "a breakpoint", "breakpoints"], wrong: ["pretty-print", "single stepping"], explanation: "A breakpoint." }),
      P.manual({ label: "(c)", marks: 3, stem: "Compare the use of a compiler with the use of an interpreter.", points: ["A compiler translates the whole program before it is run; an interpreter translates and executes one statement at a time", "Compiled programs run faster and the object code can be given out without the source code", "An interpreter reports an error at the statement where it occurs, which suits testing"], modelAnswer: "A compiler translates the whole program before it is run, while an interpreter translates and executes one statement at a time. Compiled programs run faster and can be distributed without the source code. An interpreter stops at the statement with the error, which suits testing.", explanation: "Three contrasts." }),
    ]),
    hints: ["Think about what the processor can run."],
    explanation: "The processor runs machine code; a breakpoint pauses the program; compiler and interpreter differ in when and how they translate.",
  });

  // ------------------------------------------------------------------ 7. AI impact (Paper 1)
  {
    chk(round((100 * 40) / 50, 0), 80);
    b.struct({
      ...TH5, d: 3, paper: "Cambridge Paper 1",
      concepts: [C("ethics.ai-impact")],
      stem: "A clinic in Hwange tests a chatbot that answers patients' questions. It answers 40 of 50 test questions correctly. Almost all the questions used for its training were in one language.",
      parts: checkExam(EXAM.THEORY5, [
        P.mcq({ label: "(a)", marks: 1, stem: "What is the most likely effect of training the chatbot on questions in one language only?", options: [["It will be less accurate for patients who speak other languages", "Correct: this is bias from unrepresentative data."], ["It will be more accurate for every patient who uses it", "The training data does not cover other languages."], ["It will no longer need any data to give answers", "It still depends on data."], ["It will refuse to answer any question it is asked", "It will answer, but less accurately."]], answer: "A", explanation: "Unrepresentative training data causes bias." }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "Calculate the accuracy of the chatbot on the test questions, as a percentage.", value: 80, wrong: [40, 20], workedSolution: "40 ÷ 50 × 100 = 80%.", explanation: "80%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Discuss whether the clinic should use the chatbot to answer patients' questions about their health.", points: ["A benefit: it can answer at any time and reduce the load on staff", "A concern: wrong answers about health could harm patients / it is less accurate for some languages", "A reasoned conclusion, such as using it for simple information with a member of staff available for health advice"], modelAnswer: "The chatbot can answer questions at any time and reduce the load on staff, but a wrong answer about health could harm a patient and it may be less accurate for patients who speak other languages. The clinic should use it for simple information only, with a member of staff available for health advice.", explanation: "Benefit, concern, conclusion." }),
      ]),
      hints: ["Think about who is missing from the training data."],
      explanation: "One-language training data gives bias; 40 of 50 is 80%; a discussion needs a benefit, a concern and a conclusion.",
    });
  }
});
