// Slice w2a: Von Neumann architecture, the FDE cycle and CPU performance (comp.hardware.fetch-execute, Cambridge only).
import { concept, P } from "../lib.mjs";

// A tiny Von Neumann machine: runs `n` instructions from `start` and records the registers after each FDE cycle.
function runMachine(mem, start, n) {
  const r = { PC: start, MAR: null, MDR: null, CIR: null, ACC: 0 };
  const after = [];
  for (let i = 0; i < n; i++) {
    r.MAR = r.PC;
    r.MDR = mem[r.MAR];
    r.PC += 1;
    r.CIR = r.MDR;
    const [op, a] = r.CIR.split(" ");
    const addr = Number(a);
    if (op === "LDA") { r.MAR = addr; r.MDR = mem[addr]; r.ACC = r.MDR; }
    else if (op === "ADD") { r.MAR = addr; r.MDR = mem[addr]; r.ACC += r.MDR; }
    else if (op === "STO") { r.MAR = addr; r.MDR = r.ACC; mem[addr] = r.ACC; }
    else throw new Error(op);
    after.push({ ...r });
  }
  return after;
}
const memA = { 40: "LDA 52", 41: "ADD 53", 42: "STO 54", 52: 9, 53: 34, 54: 0 };
const runA = runMachine({ ...memA }, 40, 3);
const [a1, a2, a3] = runA;
const memB = { 60: "LDA 75", 61: "ADD 76", 62: "ADD 77", 63: "STO 78", 75: 12, 76: 5, 77: 20, 78: 0 };
const runB = runMachine({ ...memB }, 60, 4);
const memC = { 10: "LDA 25", 11: "ADD 26", 12: "ADD 25", 13: "STO 27", 25: 8, 26: 13, 27: 0 };
const runC = runMachine({ ...memC }, 10, 4);
const ghz = 2.4;
const cyclesPerSec = Math.round(ghz * 1e9);
const fmtInt = (n) => n.toLocaleString("en-GB").replace(/,/g, " ");

concept("comp.hardware.fetch-execute", { file: "hardware/fetch-execute", keyPrefix: "hardware.fetch-execute" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which register holds the address of the **next** instruction to be fetched?",
    options: [
      ["Program counter (PC)", "Correct: the PC always points at the next instruction."],
      ["Memory address register (MAR)", "The MAR holds the address currently being read from or written to."],
      ["Current instruction register (CIR)", "The CIR holds the instruction being decoded and executed now."],
      ["Accumulator (ACC)", "The ACC holds results from the ALU."],
    ],
    answer: "A",
    explanation: "The program counter holds the address of the next instruction; it is incremented during the fetch stage.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which bus carries addresses from the CPU to memory, in one direction only?",
    options: [
      ["Address bus", "Correct: the address bus is unidirectional, from the MAR to memory."],
      ["Data bus", "The data bus carries data and instructions in both directions."],
      ["Control bus", "The control bus carries control and timing signals."],
      ["Universal serial bus", "USB connects peripherals; it is not one of the CPU's internal buses."],
    ],
    answer: "A",
    explanation: "Address bus: one-way, CPU to memory. Data bus and control bus: two-way.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the fetch stage, which register receives the instruction that comes back from memory along the data bus?",
    options: [
      ["Memory data register (MDR)", "Correct: everything read from memory arrives in the MDR first."],
      ["Memory address register (MAR)", "The MAR holds the address, not the instruction found there."],
      ["Program counter (PC)", "The PC holds an address, not an instruction."],
      ["Accumulator (ACC)", "The ACC holds results of calculations."],
    ],
    answer: "A",
    explanation: "Data or instructions read from memory go into the MDR; an instruction is then copied to the CIR.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which component **decodes** the instruction held in the current instruction register?",
    options: [
      ["The control unit", "Correct: the CU decodes the instruction and sends control signals."],
      ["The arithmetic logic unit", "The ALU carries out calculations during the execute stage."],
      ["The memory data register", "The MDR only holds what was read from memory."],
      ["The cache", "Cache stores frequently used data and instructions; it does not decode them."],
    ],
    answer: "A",
    explanation: "Decoding is done by the control unit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is an **instruction set**?",
    options: [
      ["The list of all the machine code commands a CPU can process", "Correct: each type of CPU has its own instruction set."],
      ["The set of programs installed on a computer", "Installed programs are application and system software."],
      ["The order in which the registers are used in the fetch stage", "That is the fetch-decode-execute cycle."],
      ["A set of rules for writing high-level programs", "That describes a programming language's syntax."],
    ],
    answer: "A",
    explanation: "An instruction set is the list of commands (machine code) that a particular CPU can carry out.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Ask what cache stores and how quickly it can be reached."],
    stem: "Why does increasing the size of the cache usually improve CPU performance?",
    options: [
      ["Frequently used instructions and data are kept near the CPU, so fewer slow fetches from RAM are needed", "Correct: cache is faster to access than RAM."],
      ["The clock produces more pulses every second, so each cycle finishes sooner", "That describes a faster clock speed, not a larger cache."],
      ["More instructions can be carried out at the same time on separate processing units inside the CPU", "That describes more cores."],
      ["Programs no longer need to be loaded into main memory at all before they run, so they start much sooner", "Programs are still loaded into RAM; cache holds copies of the parts used most."],
    ],
    answer: "A",
    explanation: "Cache is very fast memory near the CPU. A larger cache holds more of what the CPU needs, so it waits for RAM less often.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["More cores only help if the work can be divided."],
    stem: "A program does one long calculation in which every step needs the answer to the step before. Which upgrade is **least** likely to make this program run faster?",
    options: [
      ["Changing from a 4-core CPU to an 8-core CPU", "Correct: the steps cannot run at the same time, so extra cores sit idle."],
      ["Increasing the clock speed from 3.0 GHz to 3.6 GHz", "A faster clock speeds up every step, so this would help."],
      ["Increasing the size of the cache", "A larger cache reduces waiting for RAM, so this would help."],
      ["Using a CPU with both a faster clock and a larger cache", "Both changes speed up a single sequence of steps."],
    ],
    answer: "A",
    explanation: "Extra cores only improve performance when the work can be split into parts that run at the same time.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a Von Neumann computer, program instructions and data are stored in the same memory.",
    answer: true,
    explanation: "True. Both instructions and data are held in the same main memory and travel along the same buses.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The program counter is incremented during the execute stage, after the instruction has been carried out.",
    answer: false,
    explanation: "False. The PC is incremented during the fetch stage, so it already points at the next instruction while the current one is decoded and executed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each register to what it holds.",
    pairs: [
      ["Program counter", "The address of the next instruction"],
      ["Memory address register", "The address of the location being read or written"],
      ["Memory data register", "The data or instruction just read from memory"],
      ["Current instruction register", "The instruction being decoded and executed"],
      ["Accumulator", "The result of a calculation in the ALU"],
    ],
    explanation: "PC and MAR hold addresses; MDR, CIR and ACC hold data, instructions or results.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Addresses travel on the address bus; instructions come back on the data bus."],
    stem: "Complete the description of the fetch stage.",
    template: "The address in the {{blank:a}} is copied to the MAR. It is sent to memory along the {{blank:b}} bus. The instruction at that address is returned along the {{blank:c}} bus to the MDR, the PC is incremented, and the instruction is copied to the {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["PC"], choices: ["PC", "ACC", "CIR", "MDR"] },
      { id: "b", accepted: ["address"], choices: ["address", "data", "control"] },
      { id: "c", accepted: ["data"], choices: ["address", "data", "control"] },
      { id: "d", accepted: ["CIR"], choices: ["CIR", "ACC", "PC", "MAR"] },
    ],
    explanation: "PC → MAR → address bus → memory → data bus → MDR → CIR, and the PC is incremented.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["1 GHz is one thousand million (10⁹) cycles per second."],
    stem: `A tablet's CPU has a clock speed of ${ghz} GHz. How many clock cycles does it produce each second? Give your answer in full (digits only).`,
    value: cyclesPerSec,
    answer: String(cyclesPerSec),
    wrong: [2400000, 24000000000],
    explanation: `${ghz} GHz = ${ghz} × 1 000 000 000 = ${fmtInt(cyclesPerSec)} cycles per second.`,
    workedSolution: `1. 1 GHz = 1 000 000 000 cycles per second.
2. ${ghz} × 1 000 000 000 = ${fmtInt(cyclesPerSec)} cycles per second.`,
  });
  b.num({
    d: 4, skill: "APPLICATION",
    hints: ["Work through the instructions one at a time.", "Remember the PC is incremented in every fetch."],
    stem: `Memory holds this program and data. The PC starts at 60.

| Address | Contents |
|:-:|:--|
| 60 | LDA 75 (load the value at address 75 into the ACC) |
| 61 | ADD 76 (add the value at address 76 to the ACC) |
| 62 | ADD 77 (add the value at address 77 to the ACC) |
| 63 | STO 78 (store the ACC at address 78) |
| 75 | ${memB[75]} |
| 76 | ${memB[76]} |
| 77 | ${memB[77]} |

State the value held in the **program counter** after all four instructions have been fetched and executed.`,
    value: runB[3].PC,
    wrong: [runB[3].PC - 1, 78],
    explanation: `The PC is incremented once per fetch: 60 → ${runB.map((r) => r.PC).join(" → ")}. It holds the address of the next instruction.`,
    workedSolution: `1. Fetching the instruction at 60 increments the PC to ${runB[0].PC}.
2. Each later fetch adds 1: ${runB.slice(1).map((r) => r.PC).join(", ")}.
3. After the fourth fetch the PC holds ${runB[3].PC}.`,
  });
  b.num({
    d: 4, skill: "APPLICATION",
    hints: ["LDA loads a value; ADD adds to what is already in the accumulator; STO copies the accumulator to memory."],
    stem: `Memory holds this program and data. The PC starts at 10.

| Address | Contents |
|:-:|:--|
| 10 | LDA 25 |
| 11 | ADD 26 |
| 12 | ADD 25 |
| 13 | STO 27 |
| 25 | ${memC[25]} |
| 26 | ${memC[26]} |

LDA loads the value at an address into the ACC, ADD adds the value at an address to the ACC and STO stores the ACC at an address. State the value stored at address 27 when the program has finished.`,
    value: runC[3].ACC,
    wrong: [memC[25] + memC[26], runC[3].ACC + 1],
    explanation: `ACC: ${runC.map((r) => r.ACC).join(" → ")}; STO 27 stores ${runC[3].ACC}.`,
    workedSolution: `1. LDA 25: ACC = ${runC[0].ACC}.
2. ADD 26: ACC = ${runC[0].ACC} + ${memC[26]} = ${runC[1].ACC}.
3. ADD 25: ACC = ${runC[1].ACC} + ${memC[25]} = ${runC[2].ACC}.
4. STO 27 copies ${runC[3].ACC} to address 27.`,
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    hints: ["Name the register or bus used at each step."],
    stem: "Describe the **fetch** stage of the fetch-decode-execute cycle. [4]",
    points: [
      "The address in the PC is copied to the MAR",
      "The address is sent along the address bus to memory (with a read signal on the control bus)",
      "The instruction at that address is sent along the data bus to the MDR",
      "The PC is incremented and the instruction is copied from the MDR to the CIR",
    ],
    modelAnswer: "The address of the next instruction is copied from the PC into the MAR and sent along the address bus to RAM. The instruction stored there is returned along the data bus into the MDR. The PC is incremented, and the instruction is copied from the MDR into the CIR.",
    explanation: "PC → MAR → address bus → data bus → MDR → CIR; PC incremented.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    hints: ["For each factor say what it is and why it speeds up processing."],
    stem: "Rudo is choosing between two laptops for her accounting business in Harare.\n\n| | Laptop P | Laptop Q |\n|:--|:-:|:-:|\n| Cores | 2 | 6 |\n| Clock speed | 3.2 GHz | 2.8 GHz |\n| Cache | 4 MiB | 12 MiB |",
    parts: [
      P.mcq({ label: "(a)", stem: "What is a **core**?", options: [["A complete processing unit within the CPU", "Correct: each core has its own ALU, CU and registers."], ["The fastest part of the computer's memory", "That describes cache."], ["The part that sends regular timing pulses", "That is the clock."], ["The main circuit board of the laptop", "That is the motherboard."]], answer: "A", explanation: "A core can process instructions independently of the other cores." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the larger cache of Laptop Q could improve its performance.", points: ["Cache stores frequently used instructions/data close to the CPU", "More can be fetched from fast cache instead of slower RAM, so instructions are processed faster"], modelAnswer: "Cache holds frequently used instructions and data near the CPU. With 12 MiB, more of them are in cache, so the CPU fetches from the slower RAM less often and runs faster." }),
      P.manual({ label: "(c)", marks: 3, stem: "Rudo runs several programs at once. Recommend a laptop and justify your choice.", points: ["Recommends Laptop Q", "Six cores can process several programs/tasks at the same time", "Its larger cache outweighs the slightly slower clock / Laptop P's faster clock only helps one task at a time"], modelAnswer: "Laptop Q. Its six cores can run her programs at the same time, and its larger cache reduces waiting for RAM. Laptop P's faster clock does not make up for having only two cores when several programs are open." }),
    ],
    explanation: "Cores: parallel tasks; cache: fewer RAM fetches; clock: cycles per second.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    hints: ["The PC and MAR hold addresses; the MDR, CIR and ACC hold data or instructions.", "The PC changes during the fetch, before the instruction is executed."],
    stem: `A CPU with a Von Neumann architecture runs this program. The PC starts at 40.\n\n| Address | Contents |\n|:-:|:--|\n| 40 | LDA 52 |\n| 41 | ADD 53 |\n| 42 | STO 54 |\n| 52 | ${memA[52]} |\n| 53 | ${memA[53]} |`,
    parts: [
      P.num({ label: "(a)", stem: "State the contents of the **MAR** at the moment the first instruction is fetched from memory.", value: 40, wrong: [41], explanation: "The address in the PC (40) is copied into the MAR.", workedSolution: "1. At the start of the fetch the PC holds 40.\n2. PC → MAR, so the MAR holds 40." }),
      P.short({ label: "(b)", stem: "State the contents of the **CIR** while the second instruction is being executed.", accepted: ["ADD 53"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["LDA 52"], explanation: "The CIR holds the instruction currently being executed: ADD 53." }),
      P.num({ label: "(c)", stem: "State the contents of the **ACC** after the second instruction has been executed.", value: a2.ACC, wrong: [memA[53]], explanation: `${memA[52]} + ${memA[53]} = ${a2.ACC}, calculated by the ALU.`, workedSolution: `1. LDA 52 puts ${a1.ACC} in the ACC.
2. ADD 53: ${a1.ACC} + ${memA[53]} = ${a2.ACC}.` }),
      P.num({ label: "(d)", stem: "State the contents of the **PC** while the third instruction is being executed.", value: a3.PC, wrong: [42], explanation: `The PC was incremented to ${a3.PC} when STO 54 was fetched.`, workedSolution: `1. STO 54 is at address 42.
2. When it is fetched the PC is incremented to ${a3.PC}, before it is executed.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain the role of the control unit when the second instruction is processed.", points: ["Decodes the instruction in the CIR (ADD 53)", "Sends control signals (e.g. read signal on the control bus / tells the ALU to add)"], modelAnswer: "The CU decodes ADD 53 and sends control signals: a read signal to fetch the value at address 53 and a signal telling the ALU to add it to the accumulator." }),
    ],
    explanation: `(a) 40 (b) ADD 53 (c) ${a2.ACC} (d) ${a3.PC}.`,
  });

  b.card("DEFINITION", "**Von Neumann architecture**", "A design in which instructions and data share the same memory and are fetched one at a time by the CPU over shared buses.");
  b.card("FACT", "PC (program counter)", "Holds the address of the next instruction to be fetched.");
  b.card("FACT", "MAR and MDR", "MAR: the address being read from or written to. MDR: the data or instruction read from (or going to) that address.");
  b.card("FACT", "CIR and ACC", "CIR: the instruction being decoded and executed. ACC: results of ALU calculations.");
  b.card("FACT", "The three buses", "Address bus (one-way, CPU to memory); data bus (two-way); control bus (two-way control and timing signals).");
  b.card("CONCEPT", "The fetch stage", "PC → MAR → address bus → memory → data bus → MDR → CIR; the PC is incremented.");
  b.card("CONCEPT", "Clock, cores, cache", "Faster clock: more cycles per second. More cores: tasks in parallel (if the work can be split). Larger cache: fewer slow fetches from RAM.");
  b.card("DEFINITION", "**Instruction set**", "The list of all the machine code commands a particular CPU can process.");
  b.card("DEFINITION", "**Cache**", "A small amount of very fast memory in or near the CPU that holds frequently used instructions and data.");
});
