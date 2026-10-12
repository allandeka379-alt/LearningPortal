// Slice w1b: addressing modes (acs.asm.addressing-modes, both boards).
import { concept, P, chk, runAsm } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.asm.addressing-modes", { file: "asm/addressing-modes", keyPrefix: "asm.addressing-modes" }, (b) => {
  // Program 1 (base 300), run for real.
  const run1 = runAsm(["LDM #4", "LDD Num", "LDI Ref", "LDR #1", "LDX List", "END", "Num: 9", "Ref: 308", "Val: 40", "List: 50", "60", "70"], { base: 300 });
  const L1 = run1.labels;
  chk(L1.Num, 306); chk(L1.Ref, 307); chk(L1.Val, 308); chk(L1.List, 309);
  const accs = run1.trace.map((t) => t.acc);
  if (JSON.stringify(accs.slice(0, 5)) !== JSON.stringify([4, 9, 40, 40, 60])) throw new Error("program 1 trace");
  const listing1 = "```\n300  LDM #4\n301  LDD Num\n302  LDI Ref\n303  LDR #1\n304  LDX List\n305  END\n306  Num: 9\n307  Ref: 308\n308  Val: 40\n309  List: 50\n310  60\n311  70\n```";

  mc(b, 1, "RECALL", "Which addressing mode is used by the instruction LDM #6?",
    ["Immediate", "Correct: the operand 6 is the value itself."],
    [["Direct", "Direct addressing treats the operand as an address."], ["Indirect", "Indirect addressing uses the operand as the address of an address."], ["Indexed", "Indexed addressing adds the index register to the operand."]],
    "The # sign shows that the number is the value to be used: immediate addressing.");
  mc(b, 2, "RECALL", "Which instruction uses direct addressing?",
    ["LDD Total", "Correct: the operand is the address of the data."],
    [["LDM #50", "This uses immediate addressing."], ["LDI Ptr", "This uses indirect addressing."], ["LDX List", "This uses indexed addressing."]],
    "LDD loads from the address given: direct.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In indirect addressing, what does the operand of the instruction contain?",
    ["The address of a pointer to the data", "Correct: two reads are needed."],
    [["The data to be used by the instruction", "That is immediate addressing."], ["The address of the data itself, with nothing else", "That is direct addressing."], ["A number to be added to the program counter register", "That is relative addressing."]],
    "The operand points to a pointer, and the pointer holds the address of the data.");
  mc(b, 2, "UNDERSTANDING", "How is the effective address found in indexed addressing?",
    ["The operand is added to the contents of IX", "Correct: effective address = operand + IX."],
    [["The contents of the accumulator are added to the operand", "The accumulator is not used to form the address."], ["The operand is subtracted from the program counter value", "That would be a relative calculation."], ["The operand is copied unchanged", "That is direct addressing."]],
    "In indexed addressing the effective address is the operand plus the contents of IX.", { daily: true });
  mc(b, 3, "APPLICATION", "A program must step through every item of a table held in consecutive memory locations. Which addressing mode makes the shortest loop?",
    ["Indexed", "Correct: IX changes while the instruction stays the same."],
    [["Immediate", "Immediate addressing gives a constant, not an item in memory."], ["Direct", "A direct instruction names one fixed address, so it would need one instruction for every item."], ["Relative", "Relative addressing is used to find the next instruction, not the next data item."]],
    "Increasing IX reaches the next item with the same LDX instruction.", { hints: ["Which mode changes the address by changing a register?"] });
  mc(b, 3, "ANALYSIS", "What is the difference between LDM #5 and LDD 5?",
    ["LDM loads the number 5, LDD the contents of 5", "Correct: one uses the operand as a value and the other as an address."],
    [["LDM loads the contents of address 5 and LDD loads the number 5", "The modes are the wrong way round."], ["Both load the number 5 into the accumulator", "LDD reads memory."], ["Both load the contents of address 5 into the accumulator", "LDM does not read memory."]],
    "Immediate and direct addressing are different uses of the same number.", { hints: ["Is the operand used as a value or as an address?"] });
  mc(b, 3, "APPLICATION", "Why is a relative jump useful if a program may be loaded at different addresses?",
    ["The offset is the same wherever it is loaded", "Correct: the target moves with the program."],
    [["The jump always goes to address zero", "A relative jump goes to a place determined by the offset."], ["The processor ignores the operand of the jump", "The offset is used."], ["The jump uses the index register to find the program", "Relative jumps use the current address, not IX."]],
    "A relative jump keeps the same distance from the current instruction, so the program is position-independent.", { hints: ["What stays the same when a program is moved in memory?"] });
  mc(b, 4, "EVALUATION", "A pointer location holds the address of a record. A programmer wants the same LDI instruction to reach a different record. What is changed?",
    ["The address held in the pointer", "Correct: the instruction stays the same."],
    [["The opcode of the instruction", "The opcode stays LDI."], ["The contents of the accumulator register", "The accumulator receives the data; it does not select it."], ["The program counter value before every fetch", "The program counter selects the instruction, not the data."]],
    "Because the data address comes from the pointer, changing the pointer changes the data reached.", { hints: ["Where does the instruction get the address of the data?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "An immediate instruction needs a memory read to fetch its operand value.", answer: false,
    explanation: "False. The value is part of the instruction itself, so no extra memory access is needed for the operand." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "In indexed addressing the contents of the index register are added to the operand to form the effective address.", answer: true,
    explanation: "True. Effective address = operand + IX." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each instruction to its addressing mode.",
    pairs: [["LDM #20", "Immediate"], ["LDD Price", "Direct"], ["LDI Link", "Indirect"], ["LDX Table", "Indexed"], ["A jump of +4 from the current instruction", "Relative"]],
    explanation: "The mnemonic and the # sign identify the mode." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of the addressing modes.",
    template: "In {{blank:a}} addressing the operand is the value. In {{blank:b}} addressing the operand is the address of the value. In {{blank:c}} addressing the contents of IX are added to the operand.",
    blanks: [
      { id: "a", accepted: ["immediate"], choices: ["immediate", "direct", "indirect", "relative"] },
      { id: "b", accepted: ["direct"], choices: ["direct", "immediate", "indexed", "relative"] },
      { id: "c", accepted: ["indexed"], choices: ["indexed", "indirect", "direct", "immediate"] },
    ],
    explanation: "Immediate: value. Direct: address. Indexed: address + IX." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["IX = 1 when LDX List is executed; List is at address 309."],
    stem: "A program is stored from address 300:\n\n" + listing1 + "\n\nWhat is the effective address used by `LDX List`?",
    value: L1.List + 1, wrong: [309, 311], workedSolution: "1. LDR #1 sets IX = 1.\n2. List is at address 309.\n3. Effective address = 309 + 1 = 310.", explanation: "309 + 1 = 310." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Read Ref first, then read the address it contains."],
    stem: "In the program of the previous question, what value does `LDI Ref` load into the accumulator?",
    value: 40, wrong: [308, 9], workedSolution: "1. The contents of Ref (address 307) are 308.\n2. The contents of address 308 are 40.\n3. The accumulator becomes 40.", explanation: "Ref holds 308, and address 308 holds 40." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["The last load in the program is the indexed one."],
    stem: "In the same program, what value is in the accumulator when the program reaches `END`?",
    value: run1.acc, wrong: [50, 40], workedSolution: "1. After LDI Ref the ACC is 40.\n2. LDR #1 changes IX only.\n3. LDX List loads the contents of 310, which is 60.", explanation: "The final load, LDX List with IX = 1, puts the contents of 310 (60) in the accumulator." });
  chk(520 + 7, 527);
  b.num({ d: 2, skill: "APPLICATION", hints: ["Target = address of the jump + offset."],
    stem: "A relative jump `JMP +7` is stored at address 520. The offset is counted from the address of the jump instruction itself. At what address is the next instruction executed?",
    value: 527, wrong: [513, 521], workedSolution: "1. Target = 520 + 7 = 527.", explanation: "520 + 7 = 527." });
  chk(520 - 6, 514);
  b.num({ d: 3, skill: "APPLICATION", hints: ["A negative offset goes backwards."],
    stem: "A relative jump `JMP -6` is stored at address 520, with the offset counted from the jump instruction itself. At what address is the next instruction executed?",
    value: 514, wrong: [526, 521], workedSolution: "1. Target = 520 − 6 = 514.", explanation: "520 − 6 = 514." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Describe the two reads."],
    stem: "Explain how the instruction `LDI Ptr` loads a value into the accumulator. [3]",
    points: ["The contents of the location Ptr are read", "These contents are used as the address of the data", "The contents of that address are loaded into the accumulator"],
    modelAnswer: "The contents of Ptr are read. This value is an address. The contents of that address are loaded into the accumulator.",
    explanation: "Pointer, address, data." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Mention IX and the effect of changing it."],
    stem: "Explain why indexed addressing is useful when processing an array. [3]",
    points: ["The array elements are in consecutive locations from a base address", "The effective address is the base address plus the contents of IX", "Changing IX reaches each element with the same instruction, so a loop can be used"],
    modelAnswer: "The elements are in consecutive locations from a base address. The effective address is the base plus IX, so adding 1 to IX reaches the next element with the same instruction in a loop.",
    explanation: "Base, IX, loop." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What happens to absolute addresses when the program moves?"],
    stem: "Explain what is meant by position-independent code and how relative addressing helps. [3]",
    points: ["Position-independent code works correctly wherever it is loaded in memory", "A relative jump uses an offset from the current address, so it does not depend on where the program is", "An absolute address would be wrong if the program were loaded elsewhere"],
    modelAnswer: "Position-independent code works wherever it is loaded. A relative jump uses an offset from its own address, so the target moves with the program, whereas an absolute address would be wrong if the program were moved.",
    explanation: "Definition, relative offset, contrast." });
  // Program 2 for the structured item (base 400)
  const run2 = runAsm(["LDR #3", "LDX Tbl", "STO Out", "LDI Link", "STO Out2", "END", "Tbl: 5", "8", "13", "21", "Link: 411", "Tgt: 99", "Out: 0", "Out2: 0"], { base: 400 });
  const L2 = run2.labels;
  chk(L2.Tbl, 406); chk(L2.Link, 410); chk(L2.Tgt, 411);
  chk(run2.mem[L2.Out], 21); chk(run2.mem[L2.Out2], 99);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Effective address for indexed = operand + IX.", "For indirect, read the pointer first."],
    explanation: "LDX Tbl with IX = 3 reads address 409 (21); LDI Link reads the pointer 411 and then 99; immediate, direct, indirect and indexed are different uses of the operand.",
    stem: "A program is stored from address 400. `LDR #3` loads 3 into the index register. `STO` stores the accumulator at the given address.\n\n```\n400  LDR #3\n401  LDX Tbl\n402  STO Out\n403  LDI Link\n404  STO Out2\n405  END\n406  Tbl: 5\n407  8\n408  13\n409  21\n410  Link: 411\n411  Tgt: 99\n412  Out: 0\n413  Out2: 0\n```",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "State the effective address used by `LDX Tbl`.", value: 409, wrong: [406, 407], workedSolution: "1. IX = 3 (set by LDR #3).\n2. Tbl is at address 406.\n3. Effective address = 406 + 3 = 409.", explanation: "406 + 3 = 409." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value placed in `Out`.", value: 21, wrong: [13, 5], workedSolution: "1. The contents of address 409 are 21.\n2. STO Out stores 21 at address 412.", explanation: "Address 409 holds 21." }),
      P.num({ label: "(c)", marks: 1, stem: "State the effective address used by `LDI Link`.", value: 411, wrong: [410, 99], workedSolution: "1. The contents of Link (address 410) are 411.\n2. The effective address is 411.", explanation: "Link holds 411." }),
      P.num({ label: "(d)", marks: 1, stem: "State the value placed in `Out2`.", value: 99, wrong: [411, 21], workedSolution: "1. The contents of address 411 are 99.\n2. STO Out2 stores 99 at address 413.", explanation: "Address 411 holds 99." }),
      P.mcq({ label: "(e)", marks: 1, stem: "Which addressing mode does `STO Out` use?", options: [["Direct", "Correct: Out is the address of the location to be written."], ["Immediate", "Immediate would use a # sign and give a value."], ["Indirect", "An indirect store would use a pointer."], ["Relative", "Relative addressing is for jumps."]], answer: "A", explanation: "The operand is the address used, which is direct addressing." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain how the value in `Out` would change if `LDR #2` were used instead of `LDR #3`.", points: ["The effective address of LDX Tbl would be 406 + 2 = 408", "So the value 13 would be stored in Out"], modelAnswer: "The effective address would be 406 + 2 = 408, so 13 would be stored in Out.", explanation: "New address and new value." }),
    ] });
  b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Match the need to the mode."],
    explanation: "Constants use immediate, a total uses direct, a record reached through a pointer uses indirect and an array uses indexed addressing.",
    stem: "A programmer in Bulawayo is writing a program that keeps a running total of sales, a tax rate of 15 and a table of daily sales for seven days.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which addressing mode is best for the constant tax rate of 15?", options: [["Immediate", "Correct: the value is in the instruction."], ["Indexed", "Indexed addressing is for tables."], ["Relative", "Relative addressing is for jumps."], ["Indirect", "Indirect addressing needs a pointer."]], answer: "A", explanation: "A fixed constant is placed in the instruction." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which addressing mode is best for the running total held in a single variable?", options: [["Direct", "Correct: the address of the variable is fixed."], ["Immediate", "The total changes, so it is not a constant."], ["Relative", "Relative addressing is for branches."], ["Indirect", "A pointer is not needed for a single fixed variable."]], answer: "A", explanation: "Direct addressing names the location of the variable." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why indexed addressing suits the table of seven daily sales.", points: ["The seven values are in consecutive locations from a base address", "IX can be increased to reach each day with the same instruction in a loop"], modelAnswer: "The sales are in consecutive locations, so adding 1 to IX makes the same instruction reach each day in turn within a loop.", explanation: "Consecutive items, IX loop." }),
      P.manual({ label: "(d)", marks: 2, stem: "State the effective address if the table starts at address 650 and IX holds 4.", points: ["650 + 4", "654"], modelAnswer: "650 + 4 = 654.", explanation: "Base plus index." }),
    ] });
  b.card("DEFINITION", "Addressing mode", "The way in which the operand of an instruction is used to find the data it works on.");
  b.card("CONCEPT", "Immediate addressing", "The operand is the value itself, e.g. LDM #7; no memory access for the operand.");
  b.card("CONCEPT", "Direct addressing", "The operand is the address of the data, e.g. LDD Total.");
  b.card("CONCEPT", "Indirect addressing", "The operand is the address of a pointer that holds the address of the data, e.g. LDI Ptr (two reads).");
  b.card("FORMULA", "Indexed addressing", "Effective address = operand + contents of IX, e.g. LDX Table.");
  b.card("FORMULA", "Relative addressing", "Next instruction address = address of the instruction + offset.");
  b.card("DEFINITION", "Effective address", "The address actually used by an instruction after the addressing mode has been applied.");
  b.card("CONCEPT", "Position-independent code", "Code that works wherever it is loaded, as when relative jumps are used.");
  b.card("CONCEPT", "Choosing a mode", "Constants: immediate. Variables: direct. Pointers: indirect. Arrays: indexed. Branches: relative.");
});
