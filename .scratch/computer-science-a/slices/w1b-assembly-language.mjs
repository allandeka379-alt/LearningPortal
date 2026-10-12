// Slice w1b: assembly language, machine code and the assembler (acs.asm.assembly-language, Cambridge AS).
import { concept, P, chk, CAM, runAsm, toBase } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.asm.assembly-language", { file: "asm/assembly-language", keyPrefix: "asm.assembly-language", applies: CAM }, (b) => {
  // Program used in several items (base 200), run for real; the symbol table comes from the same source.
  const src = ["LDD Num", "CMP #10", "JPN Skip", "LDM #1", "STO Flag", "Skip: LDD Flag", "END", "Num: 10", "Flag: 0"];
  const run = runAsm(src, { base: 200 });
  const L = run.labels;
  chk(L.Skip, 205); chk(L.Num, 207); chk(L.Flag, 208);
  chk(run.mem[L.Flag], 1);
  chk(run.acc, 1);
  const fwd = [[200, "Num"], [202, "Skip"], [204, "Flag"], [205, "Flag"]].filter(([a, l]) => L[l] > a).length;
  chk(fwd, 4);
  const listing = "```\n200  LDD Num\n201  CMP #10\n202  JPN Skip\n203  LDM #1\n204  STO Flag\n205  Skip: LDD Flag\n206  END\n207  Num: 10\n208  Flag: 0\n```";

  mc(b, 1, "RECALL", "How are assembly language instructions related to machine code instructions?",
    ["Each assembly instruction becomes one machine-code instruction", "Correct: the relationship is one to one."],
    [["Each assembly instruction becomes many machine-code instructions", "That is true of high-level statements, not assembly."], ["Assembly language is itself the binary machine code", "Assembly uses text mnemonics that must be translated."], ["There is no relationship because they are for different processors", "Each assembly language belongs to a processor and maps to its machine code."]],
    "Assembly language is a symbolic form of machine code: one mnemonic per instruction.");
  mc(b, 2, "RECALL", "What is the job of an assembler?",
    ["To translate assembly language into machine code", "Correct: it converts mnemonics and labels into binary."],
    [["To translate a high-level language into assembly language", "That is the job of a compiler stage."], ["To run machine code one line at a time", "Running code is the job of an interpreter or the processor."], ["To find syntax errors in a flowchart", "An assembler works on assembly text."]],
    "An assembler turns assembly language into machine code.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "To which group of instructions does LDD belong?",
    ["Data movement", "Correct: it loads the contents of an address into the accumulator."],
    [["Arithmetic", "Arithmetic instructions are ADD, SUB, INC and DEC."], ["Conditional jump", "Conditional jumps are JPE and JPN."], ["Input and output", "Input and output are IN and OUT."]],
    "LDD, LDM, LDI, LDX, LDR, MOV and STO move data.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the symbol table contain?",
    ["Each label with its address", "Correct: it is built in pass 1 and used in pass 2."],
    [["Each opcode with its binary value", "That is the opcode table of the processor."], ["Each variable with the value it is given when the program runs", "The table holds addresses, not run-time values."], ["Each error found in the program", "Errors are reported separately."]],
    "The symbol table maps each label to the address of the line it labels.");
  mc(b, 3, "APPLICATION", "In a program, JPE Done appears on line 102 and the label Done is defined on line 120. Why does this need the assembler to make two passes?",
    ["The address of Done is unknown at line 102", "Correct: this is a forward reference."],
    [["The jump can only be translated by the processor itself", "The assembler translates the jump."], ["The label Done cannot be used in more than one place", "A label can be used many times."], ["The instruction JPE is not in the instruction set", "JPE is an instruction of the set."]],
    "A forward reference needs the whole program to be read before every address is known.", { hints: ["When the assembler reads line 102, has it yet reached line 120?"] });
  mc(b, 3, "UNDERSTANDING", "Why is assembly language sometimes used for a small embedded controller?",
    ["It gives small, fast programs", "Correct: little memory is needed."],
    [["It runs without any translation at all by the system", "It must be assembled into machine code."], ["It is portable to every type of processor in use", "Assembly is specific to a processor."], ["It is easier to read than any high-level language", "It is harder to read than a high-level language."]],
    "Direct control and compact code make assembly attractive where memory and power are limited.", { hints: ["Think about memory size and speed."] });
  mc(b, 3, "ANALYSIS", "Why can an assembly language program written for one type of processor not normally be run on another?",
    ["Each processor has its own instruction set", "Correct: the opcodes and registers differ."],
    [["Assembly programs always contain some syntax errors", "Syntax errors are not the reason."], ["Assembly language has no loops", "Assembly programs can loop with jumps."], ["The second processor has no memory at all", "All processors have memory."]],
    "Assembly language is tied to the instruction set of one processor family.", { hints: ["What does each processor family define differently?"] });
  mc(b, 4, "ANALYSIS", "During pass 2 an assembler reads the instruction JMP Loop. What does it do?",
    ["Replaces JMP by its opcode and Loop by its address", "Correct: both parts are translated."],
    [["Adds Loop to the symbol table of labels", "Labels are added to the table in pass 1."], ["Runs the jump to test that the program works", "An assembler does not run the program."], ["Leaves Loop as text for the processor to look up", "The processor needs a numeric address."]],
    "Pass 2 converts mnemonics to opcodes and labels to addresses using the completed table.", { hints: ["Which pass builds the table and which uses it?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Machine code is written using text mnemonics such as LDD and STO.", answer: false,
    explanation: "False. Machine code is binary. Mnemonics such as LDD and STO belong to assembly language." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "JPE jumps to a given address if the last comparison found the values equal.", answer: true,
    explanation: "True. CMP sets a flag; JPE jumps when the flag shows equality and JPN when it does not." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each instruction to what it does.",
    pairs: [["LDM #7", "Load the number 7 into the accumulator"], ["STO Total", "Store the accumulator at the address Total"], ["JMP Start", "Load the PC with the address of Start"], ["CMP #0", "Compare the accumulator with 0 and set the flag"], ["DEC ACC", "Subtract 1 from the accumulator"]],
    explanation: "Each is an instruction of the 9618 set." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of a two-pass assembler.",
    template: "In pass 1 the assembler builds the {{blank:a}} table. In pass 2 it replaces each {{blank:b}} by its opcode and each label by its {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["symbol"], choices: ["symbol", "truth", "trace", "page"] },
      { id: "b", accepted: ["mnemonic"], choices: ["mnemonic", "comment", "variable", "register"] },
      { id: "c", accepted: ["address"], choices: ["address", "value", "colour", "name"] },
    ],
    explanation: "Pass 1: symbol table. Pass 2: opcodes and addresses." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Number the lines from 200 and find the line that carries the label."],
    stem: "A program is stored from address 200:\n\n" + listing + "\n\nWhat address does the assembler put in the symbol table for the label `Skip`?",
    value: L.Skip, wrong: [202, 206], workedSolution: "1. Lines are numbered from 200.\n2. The label `Skip:` is on the line numbered 205.", explanation: "Skip labels the line at address 205." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Data lines are labelled too."],
    stem: "Using the program in the previous question, what address is given to the label `Flag` in the symbol table?",
    value: L.Flag, wrong: [207, 204], workedSolution: "1. `Num: 10` is at 207.\n2. `Flag: 0` follows it at 208.", explanation: "Flag labels the data at address 208." });
  b.bits({ d: 3, skill: "APPLICATION", value: L.Flag, base: 16, width: 2, calculator: false, hints: ["Divide 208 by 16: quotient and remainder give the two hexadecimal digits."],
    stem: "In pass 2 the address of `Flag` (208) is written as an 8-bit operand in hexadecimal. Write the two hexadecimal digits.",
    explanation: "208 = 13 × 16 + 0, so the hexadecimal digits are D and 0: D0." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the table that the assembler builds in pass 1 to record each label and its address.", accepted: ["symbol table", "the symbol table"], wrong: ["opcode table", "trace table"], explanation: "The symbol table records labels and addresses." });
  const runB = runAsm(["LDM #3", "STO Count", "Back: LDD Count", "DEC ACC", "STO Count", "CMP #0", "JPN Back", "END", "Count: 0"], { base: 300 });
  const timesDec = runB.trace.filter((t) => t.addr === 304).length;
  chk(timesDec, 3);
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Trace the loop: Count changes each time round until the comparison is equal."],
    stem: "A program is stored from address 300:\n\n```\n300  LDM #3\n301  STO Count\n302  Back: LDD Count\n303  DEC ACC\n304  STO Count\n305  CMP #0\n306  JPN Back\n307  END\n308  Count: 0\n```\n\nHow many times is the instruction at address 304 (`STO Count`) executed before the program ends?",
    value: timesDec, wrong: [1, 4], workedSolution: "1. Count starts at 3 (stored at 301).\n2. Pass 1 of the loop: ACC = 2, stored; CMP #0 not equal, jump back.\n3. Pass 2: ACC = 1, stored, jump back.\n4. Pass 3: ACC = 0, stored; equal, so JPN is not taken.\n5. The instruction at 304 runs 3 times.", explanation: "Count goes 3, 2, 1, 0, so the store at 304 runs three times." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Which pass does what? Mention the symbol table in both."],
    stem: "Describe the two passes made by an assembler. [4]",
    points: ["Pass 1: each line is given an address", "Pass 1: each label and its address is entered in the symbol table", "Pass 2: each mnemonic is replaced by its opcode", "Pass 2: each label or symbolic address is replaced by the address from the symbol table, producing the machine code"],
    modelAnswer: "Pass 1 gives each line an address and records every label with its address in the symbol table. Pass 2 replaces each mnemonic by its opcode and each label by its address from the symbol table to produce the machine code.",
    explanation: "Two marks for each pass." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Two advantages and a disadvantage, or the other way round."],
    stem: "Give two advantages and one disadvantage of writing a program in assembly language rather than a high-level language. [3]",
    points: ["Advantage: the program can be small and fast", "Advantage: direct control of the hardware, registers and memory", "Disadvantage: harder to write and maintain / not portable to other processors"],
    modelAnswer: "Advantages: it produces small, fast programs and gives direct control of the hardware. Disadvantage: it is hard to write and maintain and works on one type of processor only.",
    explanation: "Any valid pair of advantages and one disadvantage." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["When is the address of the label known?"],
    stem: "Explain what is meant by a forward reference and why it needs more than one pass. [2]",
    points: ["A forward reference is a use of a label before the line that defines it", "The address is not known until the whole program has been read, so a second pass is needed to fill it in"],
    modelAnswer: "A forward reference uses a label before it is defined. The address is not known until the whole program has been read, so a second pass is needed.",
    explanation: "Definition and consequence." });
  const runC = runAsm(["IN", "CMP #65", "JPE Yes", "LDM #78", "JMP Done", "Yes: LDM #89", "Done: OUT", "END"], { base: 400, input: "A" });
  const runC2 = runAsm(["IN", "CMP #65", "JPE Yes", "LDM #78", "JMP Done", "Yes: LDM #89", "Done: OUT", "END"], { base: 400, input: "B" });
  chk(runC.labels.Yes, 405); chk(runC.labels.Done, 406);
  if (runC.output !== "Y" || runC2.output !== "N") throw new Error("program C output");
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Number the lines from 400.", "CMP #65 compares the accumulator with the ASCII code of A; IN puts the code of the key pressed into the accumulator."],
    explanation: "Symbol table: Yes 405, Done 406; 2 forward references; the program outputs Y for A and N for any other key.",
    stem: "The program below is to be assembled. It starts at address 400. `IN` puts the ASCII code of a typed character in the accumulator, and `OUT` displays the character whose code is in the accumulator. The ASCII code of A is 65, of N is 78 and of Y is 89.\n\n```\n400  IN\n401  CMP #65\n402  JPE Yes\n403  LDM #78\n404  JMP Done\n405  Yes: LDM #89\n406  Done: OUT\n407  END\n```",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Complete the symbol table produced by pass 1.",
        template: "Yes: {{blank:y}}\n\nDone: {{blank:d}}",
        blanks: [{ id: "y", accepted: [String(runC.labels.Yes)], input: "number" }, { id: "d", accepted: [String(runC.labels.Done)], input: "number" }],
        wrong: [["403", "404"]], explanation: "Yes = 405, Done = 406." }),
      P.num({ label: "(b)", marks: 1, stem: "How many instructions refer to a label that is defined on a later line?", value: 2, wrong: [1, 4], workedSolution: "1. JPE Yes (line 402, Yes at 405) and JMP Done (line 404, Done at 406).\n2. Two instructions.", explanation: "JPE Yes and JMP Done refer forward." }),
      P.short({ label: "(c)", marks: 1, stem: "What is output if the user types the letter A?", accepted: ["Y"], wrong: ["N"], explanation: "Equal, so JPE Yes is taken and Y is output." }),
      P.short({ label: "(d)", marks: 1, stem: "What is output if the user types the letter B?", accepted: ["N"], wrong: ["Y"], explanation: "Not equal, so N is loaded and JMP Done skips the Yes line." }),
      P.manual({ label: "(e)", marks: 3, stem: "Describe what pass 2 does with the line `JPE Yes`.", points: ["Replaces JPE by its opcode", "Looks up Yes in the symbol table (405)", "Writes 405 as the operand of the machine-code instruction"], modelAnswer: "It replaces JPE with its opcode, looks up Yes in the symbol table to find 405 and writes 405 as the operand.", explanation: "Opcode, lookup, operand." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Match each instruction to its group."],
    explanation: "Instructions fall into groups; assembly gives control and speed but is processor-specific.",
    stem: "An engineer in Bulawayo writes the control program for a small pump controller in assembly language.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which instruction belongs to the arithmetic group?", options: [["SUB", "Correct."], ["STO", "STO moves data."], ["JMP", "JMP is a jump."], ["OUT", "OUT is output."]], answer: "A", explanation: "SUB subtracts." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which instruction is a conditional jump?", options: [["JPN", "Correct: it jumps only if the comparison was not equal."], ["JMP", "JMP always jumps."], ["LDX", "LDX loads from an indexed address."], ["INC", "INC adds 1 to a register."]], answer: "A", explanation: "JPE and JPN are conditional." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two reasons why the engineer chose assembly language.", points: ["Small program that fits the limited memory", "Direct, exact control of the hardware / fast response"], modelAnswer: "The program is small enough for the limited memory and gives direct, fast control of the hardware.", explanation: "Size and control." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two drawbacks of this choice.", points: ["Hard to write, debug and maintain", "Not portable: must be rewritten for a different processor"], modelAnswer: "It is hard to write and maintain, and it has to be rewritten for a different processor.", explanation: "Difficulty and portability." }),
    ] });
  b.card("DEFINITION", "Assembly language", "A low-level language using mnemonics, labels and symbolic addresses, with one instruction for each machine-code instruction.");
  b.card("DEFINITION", "Opcode and operand", "Opcode: the operation to be performed. Operand: the data or address it works on.");
  b.card("DEFINITION", "Assembler", "A program that translates assembly language into machine code.");
  b.card("CONCEPT", "Pass 1 of an assembler", "Assigns an address to each line and records every label and its address in the symbol table.");
  b.card("CONCEPT", "Pass 2 of an assembler", "Replaces mnemonics by opcodes and labels by addresses using the symbol table, producing machine code.");
  b.card("DEFINITION", "Forward reference", "Use of a label before the line that defines it; the reason for two passes.");
  b.card("FACT", "Instruction groups", "Data movement, input and output, arithmetic, unconditional jump, compare and conditional jump, bit manipulation.");
  b.card("CONCEPT", "Low-level language trade-off", "Small, fast, direct hardware control, but hard to write and specific to one processor.");
});
