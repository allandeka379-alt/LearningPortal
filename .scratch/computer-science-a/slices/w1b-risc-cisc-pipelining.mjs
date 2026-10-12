// Slice w1b: RISC, CISC and pipelining (acs.cpu.risc-cisc-pipelining, both boards; RISC against CISC is Cambridge detail).
import { concept, P, chk, round } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

const piped = (n, k) => n + k - 1;
const unpiped = (n, k) => n * k;

concept("acs.cpu.risc-cisc-pipelining", { file: "cpu/risc-cisc-pipelining", keyPrefix: "cpu.risc-cisc-pipelining" }, (b) => {
  mc(b, 1, "RECALL", "Which feature describes a RISC processor?",
    ["A small set of simple instructions of fixed length", "Correct: simple fixed-length instructions suit pipelining."],
    [["A large set of complex instructions of different lengths", "That describes a CISC processor."], ["Instructions that take many different numbers of cycles", "RISC instructions mostly take one cycle."], ["Very few registers so that memory is used for most data", "RISC has many registers."]],
    "RISC: reduced, simple, fixed-length instructions, mostly one cycle, many registers.");
  mc(b, 2, "RECALL", "Which statement is true of a CISC processor?",
    ["It has complex instructions, some taking several cycles", "Correct: one CISC instruction may do the work of several RISC ones."],
    [["It has only load and store instructions that access memory", "That describes the load-store design of RISC."], ["Every instruction is the same length and takes one cycle", "That is a RISC feature."], ["It needs more instructions for a task than a RISC processor", "CISC needs fewer instructions."]],
    "CISC has many powerful instructions of varying length and cycle count.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does pipelining do?",
    ["Overlaps the stages of different instructions", "Correct: while one instruction executes, the next is decoded and the following one fetched."],
    [["Makes one instruction finish in fewer cycles than before", "A single instruction takes as long as before."], ["Runs each instruction on a separate computer", "That would be parallel processing on separate machines."], ["Stores the whole program in the cache", "That is not what a pipeline is."]],
    "A pipeline increases throughput; it does not shorten the time for one instruction.");
  mc(b, 2, "UNDERSTANDING", "Why do RISC processors have many registers?",
    ["Data can stay in the processor, avoiding slow memory accesses", "Correct: only load and store instructions use memory."],
    [["Each instruction needs a different register to run", "Registers are not allocated one per instruction."], ["The registers replace the need for a clock", "Every processor needs a clock."], ["More registers allow the instruction set to be larger", "The instruction set is small in RISC."]],
    "With many registers, values are kept in the processor between instructions, keeping the pipeline supplied.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why does a jump instruction reduce the efficiency of a pipeline?",
    ["Instructions fetched after the jump may have to be discarded", "Correct: the next instruction in order may not be the one to run."],
    [["The pipeline stops working until the program is restarted", "The pipeline carries on, but with the wrong instructions removed."], ["Jump instructions need extra registers", "The problem is the instructions already in the pipeline."], ["The clock speed halves after every jump", "A jump does not change the clock speed."]],
    "After a jump the instructions behind it in the pipeline are wrong and must be flushed.", { hints: ["What has already been fetched by the time the jump is executed?"] });
  mc(b, 3, "APPLICATION", "A designer needs a processor for a battery-powered tablet that must do a lot of work with little power. Which choice is the best reason to prefer a RISC design?",
    ["Its simple instructions need simple, low-power hardware", "Correct: simpler circuits use less energy."],
    [["Its programs are always much shorter than CISC programs", "RISC programs are usually longer."], ["It does not need a clock", "All processors need a clock."], ["It can run without any registers", "RISC uses many registers."]],
    "Simple fixed-length instructions allow a simpler control unit and lower power use.", { hints: ["Think about the hardware needed to decode simple instructions."] });
  mc(b, 3, "UNDERSTANDING", "What is meant by a load-store architecture?",
    ["Only load and store instructions access memory", "Correct: arithmetic is done on registers."],
    [["Every instruction can take its operands directly from memory", "That is typical of CISC."], ["All data is stored on the stack, not in registers", "A load-store design uses registers."], ["The processor loads the whole program into the cache first", "Loading programs is not what the term means."]],
    "In a load-store design, memory is reached only by LOAD and STORE; other instructions work on registers.", { hints: ["Which instructions are allowed to touch memory?"] });
  mc(b, 4, "ANALYSIS", "A pipeline completes one instruction in every clock cycle once it is full. Which statement about the effect of the pipeline is correct?",
    ["The throughput rises but the time for one instruction is unchanged", "Correct: more instructions finish per second, each still takes all its stages."],
    [["The time for one instruction is cut to one cycle", "Each instruction still passes through every stage."], ["The throughput is unchanged but the energy used falls", "Throughput is what the pipeline raises."], ["The number of instructions needed for the program is halved", "The program contains the same instructions."]],
    "Pipelining raises throughput, not the latency of a single instruction.", { hints: ["Compare instructions per second with the time for one instruction."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Pipelining reduces the time taken to carry out one single instruction.", answer: false,
    explanation: "False. A single instruction still passes through every stage. Pipelining increases the number of instructions completed per second." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "A RISC program usually needs more instructions than a CISC program for the same task.", answer: true,
    explanation: "True. Each RISC instruction is simple and does little, so more are needed." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each description to RISC or CISC.",
    pairs: [["Instructions have a fixed length", "RISC"], ["Instructions vary in length and cycle count", "CISC"], ["Many general-purpose registers", "RISC"], ["Complex control unit with powerful instructions", "CISC"], ["Only load and store access memory", "RISC"]],
    explanation: "RISC: fixed length, many registers, load-store. CISC: variable length, powerful instructions." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about pipelining.",
    template: "In a pipeline, while one instruction is being {{blank:a}}, the next is being {{blank:b}} and the one after is being fetched. After a {{blank:c}} instruction, the instructions already fetched may have to be discarded.",
    blanks: [
      { id: "a", accepted: ["executed"], choices: ["executed", "deleted", "printed", "stored"] },
      { id: "b", accepted: ["decoded"], choices: ["decoded", "executed", "fetched", "erased"] },
      { id: "c", accepted: ["jump"], choices: ["jump", "load", "add", "output"] },
    ],
    explanation: "Execute, decode, fetch overlap; a jump forces a flush." });
  chk(piped(12, 4), 15);
  b.num({ d: 3, skill: "APPLICATION", unit: "cycles", hints: ["A pipeline with k stages finishes n instructions in n + k − 1 cycles."],
    stem: "A four-stage pipeline executes 12 instructions. Each stage takes one clock cycle and no instruction is discarded. How many clock cycles are needed to complete all 12?",
    value: 15, wrong: [48, 16], workedSolution: "1. Cycles = n + k − 1.\n2. 12 + 4 − 1 = 15.", explanation: "12 + 4 − 1 = 15 cycles." });
  chk(unpiped(12, 4), 48);
  b.num({ d: 2, skill: "APPLICATION", unit: "cycles", stem: "The same 12 instructions are run on a processor without a pipeline. Each instruction needs 4 clock cycles in sequence. How many clock cycles are needed?",
    value: 48, wrong: [15, 16], workedSolution: "1. Cycles = n × k.\n2. 12 × 4 = 48.", explanation: "12 × 4 = 48 cycles." });
  chk(round(unpiped(200, 5) / piped(200, 5), 1), 4.9);
  b.num({ d: 4, skill: "ANALYSIS", answer: "4.9", tol: 0.05, unit: "×", hints: ["Speed-up = cycles without a pipeline ÷ cycles with one."],
    stem: "A program of 200 instructions runs on a five-stage pipeline with no discarded instructions. Calculate the speed-up compared with running it without a pipeline, to 1 decimal place.",
    value: 4.9, wrong: [5, 1], workedSolution: "1. Without a pipeline: 200 × 5 = 1000 cycles.\n2. With a pipeline: 200 + 5 − 1 = 204 cycles.\n3. Speed-up = 1000 ÷ 204 = 4.9.", explanation: "1000 ÷ 204 = 4.9 (close to the 5 stages)." });
  b.num({ d: 3, skill: "ANALYSIS", hints: ["Count the stages that come before the third stage."],
    stem: "In a five-stage pipeline a jump instruction is resolved in the third stage. At that moment two later instructions are in the first and second stages. How many instructions have to be discarded when the jump is taken?",
    value: 2, wrong: [1, 5], workedSolution: "1. The instructions behind the jump are in stages 1 and 2.\n2. Both were fetched along the wrong path, so both are discarded: 2.", explanation: "Two instructions entered the pipeline behind the jump and are discarded." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Match comparisons: number, length, cycles, registers."],
    stem: "Compare RISC and CISC processors. [4]",
    points: ["RISC has a small set of simple instructions; CISC has a large set of complex instructions", "RISC instructions are a fixed length; CISC instructions vary in length", "RISC instructions mostly take one cycle; CISC instructions take several", "RISC has many registers (and a load-store design); CISC has fewer registers"],
    modelAnswer: "RISC has few simple instructions of fixed length that mostly take one cycle and it has many registers. CISC has many complex instructions of varying length that can take several cycles, and fewer registers.",
    explanation: "Four matching comparisons." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Describe the overlap and the effect."],
    stem: "Explain how pipelining improves the performance of a processor. [3]",
    points: ["The stages (fetch, decode, execute) of different instructions are overlapped", "While one instruction is executed the next is decoded and another is fetched", "More instructions are completed per second (throughput rises)"],
    modelAnswer: "The stages of different instructions overlap: while one is being executed the next is decoded and another fetched. This completes more instructions each second.",
    explanation: "Overlap, example of overlap, throughput." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Explain the problem, then give a remedy."],
    stem: "Explain why a branch instruction causes a problem for a pipeline, and describe one way of reducing the problem. [3]",
    points: ["Instructions after the branch have already been fetched before the outcome is known", "If the branch is taken they are the wrong instructions and have to be discarded, wasting cycles", "Branch prediction: guess the outcome and fetch from the predicted path"],
    modelAnswer: "The instructions after the branch are already in the pipeline before the outcome is known. If the branch is taken they are wrong and are discarded, which wastes cycles. Branch prediction guesses the result and fetches ahead on the likely path.",
    explanation: "Problem, consequence, remedy." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Think about the instructions that are partly through the pipeline."],
    stem: "Explain one difference in how an interrupt is handled on a RISC processor with a pipeline compared with a CISC processor with long instructions. [3]",
    points: ["On the RISC processor several instructions are in the pipeline at the same time", "These must be completed or discarded, and the address of the instruction to resume with recorded", "On a CISC processor, a long instruction is usually completed (or made restartable) before the interrupt is serviced"],
    modelAnswer: "On a RISC processor several instructions are in the pipeline, so they must be completed or discarded and the resume address recorded. A CISC processor usually completes the current long instruction, or makes it restartable, before servicing the interrupt.",
    explanation: "Pipeline contents against long instructions." });
  const wasteCycles = piped(4, 3);
  chk(wasteCycles, 6);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["A new instruction enters the pipeline each cycle.", "n + k − 1 cycles with a pipeline; n × k without."],
    explanation: "With 4 instructions and 3 stages the pipeline finishes in 6 cycles against 12 without one; throughput rises, not the time for one instruction.",
    stem: "A processor executes each instruction in three stages (fetch, decode, execute), one clock cycle per stage. It runs a program of 4 instructions with no jumps.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "State the number of clock cycles needed to execute the program without a pipeline.", value: 12, wrong: [6, 7], workedSolution: "1. 4 instructions × 3 cycles each = 12 cycles.", explanation: "4 × 3 = 12." }),
      P.num({ label: "(b)", marks: 2, stem: "State the number of clock cycles needed to execute the program with a pipeline.", value: 6, wrong: [12, 7], workedSolution: "1. Cycles = n + k − 1.\n2. 4 + 3 − 1 = 6.", explanation: "4 + 3 − 1 = 6 cycles." }),
      P.mcq({ label: "(c)", marks: 1, stem: "In which clock cycle is the fourth instruction in its execute stage?", options: [["Cycle 6", "Correct: it starts in cycle 4 and executes in cycle 6."], ["Cycle 4", "Cycle 4 is when it is fetched."], ["Cycle 5", "Cycle 5 is when it is decoded."], ["Cycle 7", "The program is finished by cycle 6."]], answer: "A", explanation: "Instruction 4 is fetched in cycle 4, decoded in 5 and executed in 6." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the time to execute a single instruction is not reduced by pipelining, but the program finishes sooner.", points: ["Each instruction still passes through all three stages", "Stages of different instructions overlap, so a new instruction is completed every cycle once the pipeline is full", "So more instructions are completed in the same time"], modelAnswer: "Each instruction still needs fetch, decode and execute. But the stages of different instructions overlap, so once the pipeline is full an instruction is completed every cycle and the whole program finishes sooner.", explanation: "Latency unchanged; throughput up." }),
    ] });
  b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Think about power, cost and the software that has to run."],
    explanation: "RISC simple instructions suit low-power pipelined phones; CISC gives shorter programs and compatibility with older software.",
    stem: "A company in Harare is choosing a processor for a low-cost smartphone.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which design makes pipelining easiest?", options: [["RISC", "Correct: fixed-length simple instructions of similar timing."], ["CISC", "Variable length and cycle counts make pipelining harder."], ["A design with no registers", "Registers are needed by every design."], ["A design with no clock", "Every processor needs a clock."]], answer: "A", explanation: "RISC instructions are of equal length and mostly one cycle." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two advantages of a RISC processor for the phone.", points: ["Simple hardware that uses less power", "Pipelining works efficiently, so more instructions per second"], modelAnswer: "Simple hardware uses little power and a pipeline works efficiently, giving more instructions per second.", explanation: "Power and throughput." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two disadvantages of a RISC processor compared with a CISC processor.", points: ["More instructions are needed for each task, so programs are longer", "Needs a good compiler to produce efficient code"], modelAnswer: "Programs are longer because more instructions are needed, and a good compiler is required.", explanation: "Longer programs and compiler dependence." }),
      P.manual({ label: "(d)", marks: 1, stem: "Explain why many registers help a RISC processor.", points: ["Data can stay in the processor so fewer slow memory accesses are needed"], modelAnswer: "Data stays in fast registers, so fewer slow accesses to memory are needed.", explanation: "Fewer memory accesses." }),
    ] });
  b.card("DEFINITION", "RISC", "Reduced Instruction Set Computer: few simple, fixed-length instructions, mostly one cycle each, many registers, load-store.");
  b.card("DEFINITION", "CISC", "Complex Instruction Set Computer: many powerful, variable-length instructions taking several cycles, fewer registers.");
  b.card("DEFINITION", "Pipelining", "Overlapping the stages of different instructions so that more instructions are completed per second.");
  b.card("FORMULA", "Pipeline cycles", "n instructions on k stages take n + k − 1 cycles; without a pipeline n × k.");
  b.card("CONCEPT", "Throughput against time per instruction", "Pipelining raises throughput; the time for one instruction does not fall.");
  b.card("CONCEPT", "Branch hazard", "After a jump, the instructions already fetched may be wrong and are discarded, wasting cycles.");
  b.card("CONCEPT", "Registers in RISC", "Many registers keep data inside the processor, avoiding slow memory accesses.");
  b.card("CONCEPT", "Interrupts and pipelines", "Instructions in the pipeline must be completed or discarded and the resume address recorded.");
});
