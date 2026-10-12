// Slice w1b: CPU architecture and registers (acs.cpu.architecture-registers, both boards; Harvard items are ZIMSEC).
import { concept, P, chk, ZIM, CAM, runAsm } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.cpu.architecture-registers", { file: "cpu/architecture-registers", keyPrefix: "cpu.architecture-registers" }, (b) => {
  // Program for the trace questions (base 300), run for real.
  const run = runAsm(["LDD Mark", "ADD Bonus", "STO Total", "END", "Mark: 41", "Bonus: 9", "Total: 0"], { base: 300 });
  const L = run.labels;
  chk(L.Mark, 304); chk(L.Bonus, 305); chk(L.Total, 306);
  chk(run.trace[0].acc, 41); chk(run.trace[1].acc, 50); chk(run.mem[L.Total], 50);
  const run2 = runAsm(["LDD Price", "SUB Discount", "STO Cost", "END", "Price: 75", "Discount: 20", "Cost: 0"], { base: 400 });
  chk(run2.mem[run2.labels.Cost], 55);

  mc(b, 1, "RECALL", "Which register holds the address of the next instruction to be fetched?",
    ["The program counter", "Correct: the PC always points to the next instruction."],
    [["The accumulator", "The accumulator holds the results of ALU operations."], ["The memory data register", "The MDR holds data or an instruction that has just been read or is about to be written."], ["The current instruction register", "The CIR holds the instruction being executed, not the next one."]],
    "The program counter holds the address of the next instruction and is increased after each fetch.");
  mc(b, 2, "UNDERSTANDING", "Which statement describes the stored-program concept?",
    ["Binary instructions are held in memory, like data", "Correct: this is the basis of the Von Neumann model."],
    [["Programs stay on secondary storage and are read one line at a time", "Instructions must be in main memory for the processor to fetch them."], ["Each program has its own separate processor", "One processor runs many programs, one instruction at a time."], ["Data is held in memory but the instructions are built into the ALU", "Instructions are stored in memory, not built into the ALU."]],
    "In a stored-program computer both the program and its data are binary values in main memory.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is meant by the Von Neumann bottleneck?",
    ["One shared path blocks fetching an instruction and data together", "Correct: instructions and data use the same path to memory."],
    [["The ALU can only add two numbers at one time in each cycle", "The ALU limit is not the bottleneck described."], ["The clock cannot run faster than the speed of the memory", "That is a speed limit, not the Von Neumann bottleneck."], ["The registers can hold only a few bits of data each", "Register size is not the bottleneck."]],
    "With one memory and one set of buses, the processor cannot fetch the next instruction while it is reading or writing data.");
  mc(b, 2, "RECALL", "In which architecture are instructions and data stored in separate memories with separate buses?",
    ["Harvard", "Correct: this is the Harvard architecture."],
    [["Von Neumann", "Von Neumann uses a single memory and one set of buses."], ["Stored program only", "The stored-program concept does not require separate memories."], ["Pipelined", "Pipelining is a method of overlapping instructions, not a memory layout."]],
    "Harvard: separate instruction and data memories, each with its own buses.", { applies: ZIM });
  mc(b, 3, "APPLICATION", "An instruction is stored at address 300 and is about to be fetched. What do the program counter (PC) and the memory address register (MAR) hold after the fetch has started and the PC has been increased?",
    ["PC = 301 and MAR = 300", "Correct: the MAR holds the address used, and the PC the next address."],
    [["PC = 300 and MAR = 301", "The PC moves on after the address is copied to the MAR, not before."], ["PC = 300 and MAR = 300", "The PC is increased once the instruction address has been used."], ["PC = 301 and MAR = 301", "The MAR keeps the address of the instruction fetched."]],
    "The PC is copied to the MAR, then the PC is increased by one.", { hints: ["The MAR holds the address of the instruction, the PC the address of the next one."] });
  mc(b, 3, "APPLICATION", "After the ALU adds two numbers, in which register is the result normally held?",
    ["The accumulator", "Correct: the ACC holds the result of ALU operations."],
    [["The memory address register", "The MAR holds an address."], ["The index register", "The IX is used to modify addresses."], ["The program counter", "The PC holds the address of the next instruction."]],
    "ALU results are held in the accumulator.", { daily: true, hints: ["Which register is used by the ALU for results?"] });
  mc(b, 3, "ANALYSIS", "A programmer jumps to another part of a program. Which register is changed by the jump instruction?",
    ["The program counter", "Correct: it is loaded with the address of the new instruction."],
    [["The current instruction register only", "The CIR changes with every instruction but does not decide where the program goes next."], ["The status register only", "The status register records flags, not the address of the next instruction."], ["The accumulator only", "The accumulator holds a data value."]],
    "A jump writes the target address into the PC, so the next fetch happens from there.", { hints: ["Which register decides where the next instruction comes from?"] });
  mc(b, 4, "EVALUATION", "A small embedded controller must read sensor data and fetch its next instruction at the same time. Why is a Harvard architecture suitable?",
    ["Separate buses let both accesses happen together", "Correct: instruction and data memories are independent."],
    [["It stores every instruction inside the ALU itself", "Instructions are in memory, not inside the ALU."], ["It needs no memory as the registers hold the program", "Registers are far too small to hold a program."], ["It uses only one bus, which is cheaper", "A Harvard design uses separate buses."]],
    "Separate memories and buses allow an instruction fetch and a data access in the same cycle.", { applies: ZIM, hints: ["Think about the shared bus in a Von Neumann machine."] });
  b.tf({ d: 2, skill: "RECALL", stem: "The arithmetic logic unit fetches and decodes the instructions of a program.", answer: false,
    explanation: "False. The control unit fetches and decodes instructions. The ALU performs arithmetic, logic and shifts." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "The current instruction register (CIR) holds the instruction that is being decoded and executed.", answer: true,
    explanation: "True. The instruction is copied from the MDR into the CIR so that it can be decoded and executed." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each register to what it holds.",
    pairs: [["Program counter", "Address of the next instruction"], ["Memory address register", "Address of the location being accessed"], ["Memory data register", "Data just read or about to be written"], ["Accumulator", "Result of the ALU operation"], ["Status register", "Flags such as zero, carry and overflow"]],
    explanation: "Each register has a single purpose in the cycle." });
  b.fib({ d: 2, skill: "RECALL", stem: "Complete the sentences about the parts of the processor.",
    template: "The {{blank:a}} fetches and decodes instructions. The {{blank:b}} performs calculations and comparisons. The {{blank:c}} sends pulses that keep every operation in step.",
    blanks: [
      { id: "a", accepted: ["control unit"], choices: ["control unit", "ALU", "clock", "accumulator"] },
      { id: "b", accepted: ["ALU"], choices: ["ALU", "control unit", "clock", "program counter"] },
      { id: "c", accepted: ["system clock"], choices: ["system clock", "ALU", "control unit", "status register"] },
    ],
    explanation: "Control unit: fetch, decode, control. ALU: arithmetic and logic. Clock: timing." });
  b.num({ d: 2, skill: "APPLICATION", stem: "The program counter holds 312 and the instruction at that address is about to be fetched. What value is in the program counter once the fetch has finished?",
    value: 313, wrong: [312, 311], workedSolution: "1. The PC is copied to the MAR (312).\n2. The PC is increased by one: 312 + 1 = 313.", explanation: "The PC is increased by one during the fetch, so it holds 313." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the register that holds the address of the memory location that is about to be read or written.",
    accepted: ["memory address register", "MAR", "the memory address register", "the MAR"], wrong: ["MDR", "program counter"], explanation: "The memory address register (MAR) holds the address being accessed." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Follow the three instructions in order and keep the accumulator value."],
    stem: "A program is stored from address 400:\n\n```\n400  LDD Price\n401  SUB Discount\n402  STO Cost\n403  END\n404  Price: 75\n405  Discount: 20\n406  Cost: 0\n```\n\n`LDD` loads a value from an address into the accumulator, `SUB` subtracts a value held at an address from the accumulator and `STO` stores the accumulator in an address. What value is stored in `Cost` when the program ends?",
    value: run2.mem[run2.labels.Cost], wrong: [75, 95], workedSolution: "1. LDD Price: ACC = 75.\n2. SUB Discount: ACC = 75 − 20 = 55.\n3. STO Cost: address 406 holds 55.", explanation: "75 − 20 = 55 is stored in Cost." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Where are instructions kept, in what form, and in what order are they used?"],
    stem: "Describe the stored-program concept. [3]",
    points: ["The program instructions are stored in main memory", "They are stored as binary numbers, in the same way as the data", "The processor fetches them and executes them one after another"],
    modelAnswer: "Program instructions are held in main memory as binary, just as data is. The processor fetches the instructions from memory and executes them in sequence.",
    explanation: "Location, form and use." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM, hints: ["Compare memory, buses and speed."],
    stem: "Compare the Von Neumann architecture with the Harvard architecture. [4]",
    points: ["Von Neumann uses one memory for instructions and data; Harvard uses separate memories", "Von Neumann uses one set of buses; Harvard has separate buses for each memory", "Harvard can fetch an instruction and access data at the same time; Von Neumann cannot", "Harvard is more complex and costly; Von Neumann is simpler"],
    modelAnswer: "Von Neumann has one memory and one set of buses, so instructions and data cannot be accessed together. Harvard has separate memories and buses, so both can be accessed at once, but it is more complex and costly.",
    explanation: "Matching points on memory, buses, speed and cost." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Use the order: PC to MAR, memory to MDR, MDR to CIR."],
    stem: "Explain the roles of the program counter, the memory address register and the memory data register when an instruction is fetched. [3]",
    points: ["The PC holds the address of the instruction and this is copied to the MAR", "The MAR is used to find the location in memory, and the instruction is read into the MDR", "The PC is increased by one so that it points to the next instruction"],
    modelAnswer: "The address in the PC is copied to the MAR. The instruction at that address is read into the MDR. The PC is then incremented to point to the next instruction.",
    explanation: "Address copied, data returned, PC incremented." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Use the program in the stem: the PC is increased as soon as the fetch has taken place.", "ADD Bonus uses direct addressing."],
    explanation: "After fetching the instruction at 301: PC 302, MAR 301, CIR ADD Bonus. LDD gives ACC 41; ADD reads 305; the total is 50.",
    stem: "The program below is stored from address 300 and run on a processor with a program counter (PC), memory address register (MAR), current instruction register (CIR) and accumulator (ACC).\n\n```\n300  LDD Mark\n301  ADD Bonus\n302  STO Total\n303  END\n304  Mark: 41\n305  Bonus: 9\n306  Total: 0\n```",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "The instruction at address 301 has just been fetched. State the contents of each register.",
        template: "PC: {{blank:pc}}\n\nMAR: {{blank:mar}}\n\nCIR: {{blank:cir}}",
        blanks: [
          { id: "pc", accepted: ["302"], input: "number" },
          { id: "mar", accepted: ["301"], input: "number" },
          { id: "cir", accepted: ["ADD Bonus"], choices: ["LDD Mark", "ADD Bonus", "STO Total", "END"] },
        ], wrong: [["301", "302", "LDD Mark"]], explanation: "PC = 302, MAR = 301 (address of the instruction fetched), CIR = ADD Bonus." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value in the accumulator after the instruction at address 300 has been executed.", value: 41, wrong: [9, 0], workedSolution: "1. The instruction at 300 is LDD Mark.\n2. Mark (address 304) holds 41, which is loaded into the ACC.", explanation: "LDD Mark loads 41 into the ACC." }),
      P.num({ label: "(c)", marks: 1, stem: "State the address placed in the MAR when `ADD Bonus` reads its operand.", value: 305, wrong: [301, 9], workedSolution: "1. ADD Bonus uses direct addressing.\n2. Bonus is the label of address 305, so the MAR holds 305.", explanation: "Bonus is at address 305." }),
      P.num({ label: "(d)", marks: 1, stem: "State the value stored in `Total` when the program ends.", value: 50, wrong: [41, 9], workedSolution: "1. After LDD Mark: ACC = 41.\n2. After ADD Bonus: ACC = 41 + 9 = 50.\n3. STO Total copies 50 to address 306.", explanation: "41 + 9 = 50." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the program counter holds 302, not 301, once the instruction at address 301 has been fetched.", points: ["The PC is increased by one as part of the fetch", "So that it points to the address of the next instruction to be fetched"], modelAnswer: "The PC is incremented during the fetch so that it holds the address of the next instruction, 302.", explanation: "Increment, pointing to the next instruction." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, applies: ZIM, hints: ["Compare how many accesses can happen in one cycle."],
    explanation: "Harvard: separate memories and buses allow an instruction fetch and a data access together; Von Neumann shares one path.",
    stem: "A digital signal processor in a mobile phone uses the Harvard architecture.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What is stored in the separate data memory of a Harvard machine?", options: [["The data that the program uses", "Correct: instructions are in the instruction memory."], ["Only the instructions", "Instructions are in the other memory."], ["Only the operating system", "A Harvard machine stores instructions and data in separate memories whatever the program."], ["The contents of the registers", "Registers are inside the processor."]], answer: "A", explanation: "Data memory holds the data; instruction memory holds the program." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two benefits of the Harvard architecture compared with the Von Neumann architecture.", points: ["An instruction can be fetched while data is being accessed", "Faster execution because the shared-bus bottleneck is removed"], modelAnswer: "An instruction fetch and a data access can happen at the same time, which removes the bottleneck and speeds up execution.", explanation: "Parallel access and no bottleneck." }),
      P.manual({ label: "(c)", marks: 1, stem: "State one drawback of the Harvard architecture.", points: ["More complex and costly because it needs extra memory and buses"], modelAnswer: "It is more complex and more expensive.", explanation: "Extra hardware." }),
    ] });
  b.card("DEFINITION", "Stored-program concept", "Instructions are held in memory as binary, like data, and fetched and executed in sequence.");
  b.card("CONCEPT", "Von Neumann architecture", "One memory for instructions and data and one set of buses; simple, but has the Von Neumann bottleneck.");
  b.card("CONCEPT", "Harvard architecture", "Separate instruction and data memories with separate buses; instruction and data accessed together.", "ZIMSEC detail.", { applies: ZIM });
  b.card("DEFINITION", "Program counter (PC)", "Holds the address of the next instruction to be fetched; increased during the fetch.");
  b.card("DEFINITION", "MAR and MDR", "MAR: address of the location being accessed. MDR: data or instruction just read or about to be written.");
  b.card("DEFINITION", "Current instruction register (CIR)", "Holds the instruction currently being decoded and executed.");
  b.card("DEFINITION", "Accumulator (ACC)", "Holds the results of ALU operations and the value being worked on.");
  b.card("DEFINITION", "Status register (SR)", "Flags that record the outcome of operations, such as zero, carry, overflow and negative.");
  b.card("CONCEPT", "Roles of the ALU, CU and clock", "ALU: arithmetic and logic. CU: fetch, decode, control signals. Clock: pulses that keep operations in step.");
});
