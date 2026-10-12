// Slice w2a: writing and tracing assembly programs (acs.asm.assembly-programs, Cambridge AS).
import { concept, P, chk, same, CAM, runAsm, toBase, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w2a-q.mjs";

const at = (src, base) => codeBlock(src.map((l, i) => `${base + i}  ${l}`).join("\n"));

concept("acs.asm.assembly-programs", { file: "asm/assembly-programs", keyPrefix: "asm.assembly-programs", applies: CAM }, (b) => {
  // Program M: multiplication by repeated addition (base 100)
  const mulSrc = ["Start: LDM #0", "STO Result", "Loop: LDD Result", "ADD Num", "STO Result", "LDD Times", "DEC ACC", "STO Times", "CMP #0", "JPN Loop", "END", "Num: 7", "Times: 3", "Result: 0"];
  const mul = runAsm(mulSrc, { base: 100 });
  chk(mul.mem[mul.labels.Result], 21);
  const stoResult = mul.trace.filter((t) => t.text === "STO Result").length;
  chk(stoResult, 4); // once to clear, then three times in the loop
  const loopStos = mul.trace.filter((t) => t.addr === 104).length;
  chk(loopStos, 3);
  const mulListing = at(mulSrc, 100);

  // Program U: lower case to upper case (base 200)
  const upSrc = ["IN", "SUB #32", "OUT", "END"];
  const up = runAsm(upSrc, { base: 200, input: "k" });
  same(up.output, "K");
  chk(up.acc, 75);

  // Program H: HI (base 300)
  const hi = runAsm(["LDM #72", "OUT", "INC ACC", "OUT", "END"], { base: 300 });
  same(hi.output, "HI");

  // Program C: count the entries equal to Wanted (base 600)
  const cntSrc = ["LDR #0", "LDM #0", "STO Count", "Next: LDX Codes", "CMP Wanted", "JPN Skip", "LDD Count", "INC ACC", "STO Count", "Skip: INC IX", "LDD Left", "DEC ACC", "STO Left", "CMP #0", "JPN Next", "END", "Codes: 5", "2", "5", "5", "9", "Left: 5", "Wanted: 5", "Count: 0"];
  const cnt = runAsm(cntSrc, { base: 600, watch: ["Count", "Left"] });
  chk(cnt.mem[cnt.labels.Count], 3);
  chk(cnt.labels.Skip, 609); chk(cnt.labels.Codes, 616); chk(cnt.labels.Count, 623);
  const rowsAtJpn = cnt.trace.filter((t) => t.addr === 614);
  const ixAfterPass = rowsAtJpn.map((t) => t.ix);
  const cntAfterPass = rowsAtJpn.map((t) => t.mem[cnt.labels.Count]);
  same(ixAfterPass, [1, 2, 3, 4, 5]);
  same(cntAfterPass, [1, 1, 2, 3, 3]);
  const cntLdd = cnt.trace.filter((t) => t.addr === 606).length; // times the count is increased
  chk(cntLdd, 3);
  const cntListing = at(cntSrc, 600);

  // Table fragment for indexed addressing
  const idx = runAsm(["LDR #2", "LDX Tbl", "END", "Tbl: 8", "3", "9", "4"], { base: 700 });
  chk(idx.acc, 9);

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which instruction loads the accumulator with the contents of the address formed by adding the index register to the address in the instruction?",
    ["LDX", "Correct: LDX is the indexed load."],
    [["LDD", "LDD uses the address in the instruction only."], ["LDR", "LDR loads a number into the index register."], ["LDI", "LDI is indirect: the address is read from memory."]],
    "LDX addr loads the contents of addr + IX into ACC.", { daily: true });
  mc(b, 1, "RECALL", "Which instruction sets the index register to zero before a loop starts?",
    ["LDR #0", "Correct: LDR loads a number into IX."],
    [["LDM #0", "LDM loads ACC, not IX."], ["STO IX", "STO stores ACC at an address."], ["DEC IX", "DEC subtracts 1 from IX; it does not set it to zero."]],
    "LDR #n loads the number n into IX.");
  mc(b, 2, "UNDERSTANDING", "In the lines CMP #0 followed by JPN Loop, when is the jump made?",
    ["When ACC does not equal 0", "Correct: JPN jumps when the comparison found the values not equal."],
    [["When ACC equals 0", "That is JPE."], ["When ACC is greater than 0", "The instruction set tests only for equal and not equal."], ["Every time, whatever the flag", "That is JMP."]],
    "JPN jumps when the last CMP gave not equal.");
  mc(b, 2, "UNDERSTANDING", "Why are data items and tables normally written after the END instruction?",
    ["So that they are not executed as instructions", "Correct: the processor would try to run them if they came among the instructions."],
    [["Because END copies them into the index register", "END does not move data."], ["Because data must have higher addresses than the stack", "No such rule exists in this instruction set."], ["Because labels can only be placed after END", "Labels can be placed on any line."]],
    "Execution runs on in order, so data placed among instructions would be run as code.");
  mc(b, 3, "APPLICATION", "A program starts at address 700 with LDR #2 and then LDX Tbl, where the table Tbl holds 8, 3, 9 and 4 in successive locations. What does ACC hold after the LDX?",
    [String(idx.acc), "Correct: IX = 2, so the element at Tbl + 2 is read, the third value."],
    [["8", "That is the first element, which is read when IX is 0."], ["3", "That would need IX = 1."], ["4", "That would need IX = 3."]],
    "Tbl + 2 holds the third element, 9.", { hints: ["Count from zero: IX = 0 gives the first element."] });
  mc(b, 3, "APPLICATION", "The program LDM #72, OUT, INC ACC, OUT, END is run. The code for H is 72 and the codes of the letters follow in alphabetical order. What is displayed?",
    ["HI", "Correct: OUT shows H, INC makes the code 73 and OUT shows I."],
    [["H", "The second OUT displays another character."], ["72 73", "OUT shows the character for the code, not the number."], ["IH", "The characters are displayed in the order of the OUT instructions."]],
    "H then I.", { hints: ["OUT displays the character for the code in ACC."] });
  mc(b, 4, "ANALYSIS", "A loop that totals a table is meant to start at the first element, but the programmer leaves out the LDR #0 before it. IX happens to hold 1 from earlier. What is the effect?",
    ["The loop starts one place along and skips the first element", "Correct: every access is one location further along than intended."],
    [["The loop never ends because the flag is never set by the CMP", "The flag is set by CMP, which is not affected by IX."], ["The program stops with an error at the first LDX", "The processor has no check on IX at that point."], ["The total is correct because IX is reset by END", "END does not run until after the loop."]],
    "An index register not reset leaves the loop starting from the wrong place.", { hints: ["LDX reads the location at Table + IX."] });

  // ---- true / false, matching, fill in the blanks
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The instruction JPE jumps when the value in ACC is greater than the value it was compared with.", answer: false,
    explanation: "False. JPE jumps when the last comparison found the values equal. The 9618 set has no greater-than jump." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If IX holds 0, LDX Table loads the same value as LDD Table.", answer: true,
    explanation: "True. The effective address is Table + 0, which is Table." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each instruction to what it does.",
    pairs: [["LDR #5", "Loads the number 5 into the index register"], ["INC IX", "Adds 1 to the index register"], ["STO Total", "Copies ACC into the location Total"], ["OUT", "Displays the character whose code is in ACC"], ["JPN Back", "Jumps to Back if the last comparison gave not equal"]],
    explanation: "Each is an instruction of the 9618 set." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["The counter is decreased, stored, then tested against zero."],
    stem: "Complete the loop-control lines of a program that repeats its loop while the counter Left is not zero.",
    template: "LDD Left\n\n{{blank:a}} ACC\n\nSTO Left\n\nCMP {{blank:b}}\n\n{{blank:c}} Loop",
    blanks: [
      { id: "a", accepted: ["DEC"], choices: ["DEC", "INC", "OUT", "LDR"] },
      { id: "b", accepted: ["#0"], choices: ["#0", "#1", "Left", "Loop"] },
      { id: "c", accepted: ["JPN"], choices: ["JPN", "JPE", "STO", "END"] },
    ],
    explanation: "Decrease the count, store it, compare with 0 and jump back while it is not equal." });

  // ---- numerical, bits, short
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Num is added to Result once for every pass, and Times controls the passes."],
    stem: "A program starts at address 100:\n\n" + mulListing + "\n\nWhat value is held in `Result` when the program ends?",
    value: 21, wrong: [10, 7], workedSolution: "1. Result is cleared to 0.\n2. Each pass adds Num (7) to Result and reduces Times by 1.\n3. The loop runs while Times is not 0: 3 passes.\n4. Result = 7 + 7 + 7 = 21.",
    explanation: "The program multiplies Num by Times by repeated addition: 7 × 3 = 21." });
  b.num({ d: 3, skill: "ANALYSIS", calculator: false, hints: ["Count only the STO Result inside the loop (address 104)."],
    stem: "Using the program in the previous question, how many times is the instruction at address 104 (`STO Result`) executed?",
    value: loopStos, wrong: [4, 1], workedSolution: "1. The instruction at 104 is inside the loop.\n2. The loop runs once for each value of Times: 3, 2 and 1.\n3. So it is executed 3 times.",
    explanation: "Three passes of the loop." });
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Work out the number of instructions in one pass and the instructions outside the loop."],
    stem: "How many instructions are executed altogether, from `LDM #0` at address 100 to `END` at address 110 inclusive, in the program in the previous questions?",
    value: mul.steps, wrong: [14, 11], workedSolution: "1. Before the loop: 2 instructions (100, 101).\n2. Each pass runs 8 instructions (102 to 109); there are 3 passes = 24.\n3. END = 1.\n4. Total = 2 + 24 + 1 = 27.",
    explanation: "2 + 3 × 8 + 1 = 27 instructions." });
  b.bits({ d: 3, skill: "APPLICATION", value: up.acc, base: 2, width: 8, calculator: false, hints: ["Subtract 32 from the code of k, then write the result in binary."],
    stem: "The program `IN`, `SUB #32`, `OUT`, `END` is run and the user types the letter k, whose code is 107. Write the value in ACC when the program ends as an 8-bit binary number.",
    explanation: "107 - 32 = 75, which is 01001011 in 8 bits (the code for K)." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the register whose contents are added to the address in an LDX instruction.",
    accepted: ["IX", "index register", "the index register"], wrong: ["ACC", "accumulator"], explanation: "LDX uses the index register, IX, to form the address." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Say what the loop does with Num and Times, then what Result holds."],
    stem: "Describe the purpose of the program at address 100 (listed in the earlier question) and explain how it works. [3]",
    points: ["It multiplies Num by Times / calculates 7 × 3", "By adding Num to Result once for each pass of the loop", "Times is used as a counter that is decreased until it is 0, and Result holds the product"],
    modelAnswer: "It multiplies Num by Times using repeated addition. Num is added to Result on every pass and Times is decreased as the loop counter until it reaches 0, so Result holds the product.",
    explanation: "Purpose, method, role of the counter." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, hints: ["Mention the address and what changes each time."],
    stem: "Explain the purpose of the index register when a program processes a table of values. [2]",
    points: ["It is added to the address in an indexed instruction such as LDX to give the address that is used", "Adding 1 to it each time moves to the next element, so one loop can process the whole table"],
    modelAnswer: "The index register is added to the address in LDX to give the address used. Increasing it by 1 each pass moves to the next element, so one loop can process the whole table.",
    explanation: "Effective address and stepping through the table." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 3, hints: ["Load, add, store: three instructions."],
    stem: "A and B are labelled locations holding numbers. Write assembly language instructions to store the sum of A and B in the location C, followed by `END`. [3]",
    points: ["Loads one of the numbers into ACC with LDD", "Adds the other number from its address with ADD", "Stores ACC at C with STO C (and ends with END)"],
    modelAnswer: "\n" + codeBlock("LDD A\nADD B\nSTO C\nEND"),
    explanation: "LDD A, ADD B, STO C." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Think about the number of instructions and the changes needed to handle more values."],
    stem: "A programmer adds 50 test marks by writing 50 pairs of LDD and ADD instructions. Explain why a loop with the index register is better. [4]",
    points: ["The loop program is much shorter and uses less memory", "It is easier to write and to check for mistakes", "To change the number of marks only the counter and the table need to change", "The same instructions work for a table of any size"],
    modelAnswer: "A loop is much shorter, so it uses less memory and is easier to write and check. To handle a different number of marks only the counter and the table change, so the same instructions work for any size of table.",
    explanation: "Shorter, easier, flexible." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Trace the pass with IX = 1: the element is 2, which is not equal to Wanted.", "Count is increased only when the element equals Wanted."],
    explanation: "The program counts how many entries equal Wanted: 3 of the 5 codes are 5.",
    stem: "A program starts at address 600. It examines a table of five codes and counts how many of them equal the code in `Wanted`.\n\n" + cntListing,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What address does the assembler give to the label `Skip`?", value: cnt.labels.Skip, wrong: [608, 610], workedSolution: "1. The lines are numbered from 600.\n2. The line `Skip: INC IX` has the address 609.", explanation: "Skip is at 609." }),
      P.fib({ label: "(b)", marks: 2, stem: "State the contents of IX and of `Count` at the end of each of the first two passes (when `JPN Next` is reached).",
        template: "Pass 1: IX = {{blank:i1}}, Count = {{blank:c1}}\n\nPass 2: IX = {{blank:i2}}, Count = {{blank:c2}}",
        blanks: [
          { id: "i1", accepted: [String(ixAfterPass[0])], input: "number" }, { id: "c1", accepted: [String(cntAfterPass[0])], input: "number" },
          { id: "i2", accepted: [String(ixAfterPass[1])], input: "number" }, { id: "c2", accepted: [String(cntAfterPass[1])], input: "number" },
        ], wrong: [["0", "0", "0", "0"]], explanation: "Pass 1: element 5 equals Wanted, so Count = 1 and IX = 1. Pass 2: element 2 does not, so Count stays 1 and IX = 2." }),
      P.num({ label: "(c)", marks: 1, stem: "What is the value of `Count` when the program ends?", value: cnt.mem[cnt.labels.Count], wrong: [2, 5], workedSolution: "1. The codes are 5, 2, 5, 5, 9 and Wanted is 5.\n2. Three codes are equal to Wanted.", explanation: "Three codes equal 5." }),
      P.num({ label: "(d)", marks: 1, stem: "How many times is the instruction `INC ACC` at address 607 executed?", value: cntLdd, wrong: [5, 1], workedSolution: "1. It is executed only when a code equals Wanted.\n2. That happens 3 times.", explanation: "3 times." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain the purpose of the instructions at addresses 605 and 609.", points: ["JPN Skip jumps over the instructions that add 1 to Count when the code is not equal to Wanted", "The jump is made when the comparison gave not equal", "INC IX at 609 moves to the next element of the table and is executed on every pass"], modelAnswer: "JPN Skip jumps past the lines that increase Count when the element is not equal to Wanted. INC IX at 609 is executed on every pass to move on to the next element.", explanation: "Skip the count for non-matching codes; step the index on every pass." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["IN gives the code of the typed key in ACC."],
    explanation: "SUB #32 turns a lower-case letter into the upper-case letter; the program displays it.",
    stem: "A programmer in Masvingo writes this program, which starts at address 200:\n\n" + at(upSrc, 200),
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What does the instruction `IN` do?", options: [["Puts the code of the key pressed into ACC", "Correct."], ["Displays the character whose code is in ACC", "That is OUT."], ["Loads the number 0 into ACC", "That would be LDM #0."], ["Stores ACC in the index register", "That is MOV IX."]], answer: "A", explanation: "IN reads a character into ACC." }),
      P.short({ label: "(b)", marks: 1, stem: "The user types the letter b (code 98). What character is displayed?", accepted: ["B", "capital B"], wrong: ["b"], explanation: "98 - 32 = 66, which is B." }),
      P.num({ label: "(c)", marks: 1, stem: "What is the value in ACC when `END` is reached, if the user types the letter b?", value: 66, wrong: [98, 32], workedSolution: "1. ACC = 98 after IN.\n2. SUB #32 gives 66.", explanation: "98 - 32 = 66." }),
      P.manual({ label: "(d)", marks: 1, stem: "State why the program gives a wrong result if the user types a letter that is already upper case.", points: ["Subtracting 32 would give the code of a different character (not a letter)"], modelAnswer: "Subtracting 32 from an upper-case code gives a character that is not the intended letter.", explanation: "The program assumes lower-case input." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Loop counter (assembly)", "A memory location holding the number of repeats left; it is decreased each pass and tested against 0 to end the loop.");
  b.card("CONCEPT", "Reading a table with LDX", "Set IX with LDR #0, use LDX Table to read the element at Table + IX, then INC IX to move to the next element.");
  b.card("FACT", "What CMP, JPE and JPN do", "CMP compares ACC with a number or the contents of an address and sets a flag. JPE jumps if equal; JPN jumps if not equal. There is no greater-than jump.");
  b.card("FACT", "IN and OUT", "IN puts the code of the key pressed in ACC; OUT displays the character whose code is in ACC.");
  b.card("CONCEPT", "Where to put data", "After END, so that tables and variables are not executed as instructions.");
  b.card("CONCEPT", "Trace table for assembly", "One row per instruction executed, with columns for ACC, IX and every memory location that changes.");
  b.card("CONCEPT", "Letter arithmetic", "Characters are their codes: adding 1 to a code gives the next letter; the code of a lower-case letter is 32 more than the upper-case one.");
  b.card("FACT", "A method for writing a program", "Write pseudocode, decide the data, build the loop, check the exit condition, trace with small data.");
  b.card("FORMULA", "Effective address of LDX", "Operand address + contents of IX.");
});
