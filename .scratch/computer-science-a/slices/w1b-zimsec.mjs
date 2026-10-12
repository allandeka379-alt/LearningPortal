// W1b exam-format items: three ZIMSEC Paper 2 section A items (Computer Architecture, 30 marks each).
import { concept, P, EXAM, checkExam, ZIM, chk, runAsm, round, seriesR, parallelR } from "../lib.mjs";

const Z = { skill: EXAM.ZIM_P2_ARCH.skill, secs: EXAM.ZIM_P2_ARCH.secs, examStyle: true, applies: ZIM };
const C = (k) => `acs.${k}`;

concept(C("hardware.electronic-components"), { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------ 1. Electronic components and testing
  {
    const rLed = (9 - 2) / 0.014;
    chk(rLed, 500);
    const rs = seriesR(120, 180, 300);
    const i = 9 / rs;
    const v2 = i * 180;
    chk(rs, 600); chk(i, 0.015); chk(round(v2, 2), 2.7);
    const rp = parallelR(90, 45);
    chk(rp, 30);
    const ip = 9 / rp;
    chk(ip, 0.3);
    b.struct({
      ...Z, d: 4, paper: "ZIMSEC Paper 2 Section A",
      concepts: [C("hardware.electronic-components")],
      stem: "A Form 6 group at a school in Masvingo builds an alarm board for the school greenhouse. The board is powered by a 9 V battery and has an LED indicator, a buzzer switched by a transistor, a capacitor to smooth the supply and several resistors. A technician tests the board with a multimeter.",
      parts: checkExam(EXAM.ZIM_P2_ARCH, [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "The LED needs 2 V across it and a current of 14 mA (0.014 A). Calculate the value of the series resistor needed to run it from the 9 V battery.", value: 500, unit: "ohms", wrong: [643, 7], workedSolution: "1. Voltage across the resistor = 9 − 2 = 7 V.\n2. R = V ÷ I = 7 ÷ 0.014 = 500 Ω.", explanation: "R = (9 − 2) ÷ 0.014 = 500 Ω." }),
        P.group({ label: "(b)", stem: "Three resistors of 120 Ω, 180 Ω and 300 Ω are connected in series across the 9 V battery.", parts: [
          P.num({ label: "(i)", marks: 1, type: "CALCULATION", stem: "Calculate the total resistance.", value: 600, unit: "ohms", wrong: [100, 480], workedSolution: "1. In series the resistances add.\n2. 120 + 180 + 300 = 600 Ω.", explanation: "120 + 180 + 300 = 600 Ω." }),
          P.num({ label: "(ii)", marks: 1, type: "CALCULATION", stem: "Calculate the current in milliamperes.", value: 15, unit: "mA", wrong: [0.015, 66.7], workedSolution: "1. I = V ÷ R = 9 ÷ 600 = 0.015 A.\n2. = 15 mA.", explanation: "9 ÷ 600 = 0.015 A = 15 mA." }),
          P.num({ label: "(iii)", marks: 1, type: "CALCULATION", stem: "Calculate the voltage across the 180 Ω resistor.", value: 2.7, answer: "2.7", unit: "V", wrong: [9, 3.6], workedSolution: "1. V = I × R = 0.015 × 180.\n2. = 2.7 V.", explanation: "0.015 × 180 = 2.7 V." }),
        ] }),
        P.group({ label: "(c)", stem: "A 90 Ω resistor and a 45 Ω resistor are connected in parallel across the 9 V battery.", parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the combined resistance of the two resistors.", value: 30, unit: "ohms", wrong: [135, 67.5], workedSolution: "1. 1 ÷ R = 1 ÷ 90 + 1 ÷ 45 = 1 ÷ 90 + 2 ÷ 90 = 3 ÷ 90.\n2. R = 90 ÷ 3 = 30 Ω.", explanation: "1 ÷ R = 3 ÷ 90, so R = 30 Ω." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the total current taken from the battery, in amperes.", value: 0.3, answer: "0.3", unit: "A", wrong: [0.1, 0.2], workedSolution: "1. I = V ÷ R = 9 ÷ 30.\n2. = 0.3 A.", explanation: "9 ÷ 30 = 0.3 A." }),
        ] }),
        P.match({ label: "(d)", marks: 3, stem: "Match each component to its function on the board.", pairs: [["Capacitor", "Stores charge to smooth the supply"], ["Diode", "Lets current flow in one direction only"], ["Transistor", "Switches the buzzer from a small signal"]], explanation: "A capacitor stores charge, a diode is one-way, a transistor switches." }),
        P.manual({ label: "(e)", marks: 5, stem: "A technician suspects that a 220 Ω resistor on the board has failed. Describe how a multimeter is used to test the resistor.", points: ["Switch off the power and unplug the battery", "Isolate the resistor (remove it or lift one lead) so that other components do not affect the reading", "Set the multimeter to the resistance (ohms) range", "Connect the probes across the two ends of the resistor", "Compare the reading with 220 Ω: a very different reading or an infinite one shows a fault"], modelAnswer: "Switch off and disconnect the battery. Lift one lead of the resistor so the rest of the circuit does not affect the reading. Set the meter to ohms, touch the probes to the two ends and compare the reading with 220 Ω. A very different or open-circuit reading means the resistor has failed.", explanation: "Power off, isolate, set range, connect, compare." }),
        P.manual({ label: "(f)", marks: 5, stem: "The transistor is found to be faulty and must be replaced. Describe the steps in removing and fitting the new transistor, and two safety precautions.", points: ["Switch off and disconnect the power", "Note the orientation (which lead is the base, collector and emitter) before removal", "Desolder the old transistor using a desoldering pump or braid", "Fit the new transistor the correct way round and solder it, then trim the leads", "Safety: use a stand for the hot iron and work in a ventilated place / wear eye protection"], modelAnswer: "Disconnect the power and note which way round the transistor is fitted. Desolder it with a pump or braid, fit the new one the same way round, solder it and trim the leads. Keep the hot iron in its stand and work in a ventilated place.", explanation: "Isolate, note orientation, remove, fit, safety." }),
        P.manual({ label: "(g)", marks: 8, stem: "Explain how the transistor allows a weak signal from the greenhouse sensor to switch the buzzer, and why the LED needs a series resistor. Refer to the base, the collector and the emitter.", points: ["The sensor output is connected to the base of the transistor", "With no signal at the base no current flows between the collector and the emitter, so the buzzer is off", "When the sensor signal is high, a small base current flows", "This allows a much larger current to flow from the collector to the emitter through the buzzer", "The buzzer therefore sounds: the transistor acts as an electronic switch", "A transistor can also amplify: a small change at the base gives a larger change in the collector current", "An LED has very low resistance once it conducts, so it cannot limit its own current", "The series resistor limits the current so that the LED is not damaged"], modelAnswer: "The sensor output goes to the base. With no signal there is no base current, so no current flows from collector to emitter and the buzzer is off. When the signal is high a small base current flows and allows a much larger current from the collector to the emitter through the buzzer, so it sounds: the transistor acts as a switch (it can also amplify). An LED has a very low resistance once it conducts, so a series resistor is needed to limit the current and prevent damage.", explanation: "Transistor as a switch and the need for an LED resistor." }),
      ]),
      hints: ["V = I × R.", "In parallel use 1 ÷ R = 1 ÷ R1 + 1 ÷ R2.", "Resistance is measured with the power off."],
      explanation: "500 Ω for the LED; series 600 Ω, 15 mA, 2.7 V; parallel 30 Ω and 0.3 A; testing and transistor switching described in the manual parts.",
    });
  }
  // ------------------------------------------------------------------ 2. The fetch-decode-execute cycle with registers and addressing modes
  {
    const src = ["LDM #12", "ADD Rate", "STO Pay", "LDR #2", "LDX Grades", "STO Best", "LDI Link", "STO Extra", "END", "Rate: 8", "Pay: 0", "Grades: 40", "55", "70", "Best: 0", "Link: 166", "Item: 90", "Extra: 0"];
    const run = runAsm(src, { base: 150 });
    const L = run.labels;
    chk(L.Rate, 159); chk(L.Pay, 160); chk(L.Grades, 161); chk(L.Best, 164); chk(L.Link, 165); chk(L.Item, 166); chk(L.Extra, 167);
    chk(run.trace[0].acc, 12); chk(run.trace[1].acc, 20); chk(run.mem[L.Pay], 20);
    chk(run.mem[L.Best], 70); chk(run.mem[L.Extra], 90);
    b.struct({
      ...Z, d: 4, paper: "ZIMSEC Paper 2 Section A",
      concepts: [C("cpu.fetch-execute-interrupts"), C("asm.addressing-modes"), C("cpu.architecture-registers")],
      stem: "A processor in a school's electronic notice board has a program counter (PC), memory address register (MAR), memory data register (MDR), current instruction register (CIR), accumulator (ACC) and an index register (IX). The program below is stored from address 150. `LDM #12` loads the number 12 into the accumulator; `LDD`, `ADD` and `STO` work with the contents of an address; `LDR #2` loads 2 into IX; `LDX` loads from an address plus IX; `LDI` loads using a pointer.\n\n```\n150  LDM #12\n151  ADD Rate\n152  STO Pay\n153  LDR #2\n154  LDX Grades\n155  STO Best\n156  LDI Link\n157  STO Extra\n158  END\n159  Rate: 8\n160  Pay: 0\n161  Grades: 40\n162  55\n163  70\n164  Best: 0\n165  Link: 166\n166  Item: 90\n167  Extra: 0\n```",
      parts: checkExam(EXAM.ZIM_P2_ARCH, [
        P.fib({ label: "(a)", marks: 3, stem: "The instruction at address 151 has just been fetched. State the contents of each register.",
          template: "PC: {{blank:pc}}\n\nMAR: {{blank:mar}}\n\nCIR: {{blank:cir}}",
          blanks: [
            { id: "pc", accepted: ["152"], input: "number" },
            { id: "mar", accepted: ["151"], input: "number" },
            { id: "cir", accepted: ["ADD Rate"], choices: ["LDM #12", "ADD Rate", "STO Pay", "LDR #2"] },
          ], wrong: [["151", "152", "LDM #12"]], explanation: "PC = 152, MAR = 151, CIR = ADD Rate." }),
        P.group({ label: "(b)", stem: "The first three instructions are executed.", parts: [
          P.num({ label: "(i)", marks: 1, type: "CALCULATION", stem: "State the value in the accumulator after `LDM #12`.", value: 12, wrong: [8, 0], workedSolution: "1. LDM #12 loads the number 12.", explanation: "ACC = 12." }),
          P.num({ label: "(ii)", marks: 1, type: "CALCULATION", stem: "State the value in the accumulator after `ADD Rate`.", value: 20, wrong: [8, 12], workedSolution: "1. Rate (address 159) holds 8.\n2. ACC = 12 + 8 = 20.", explanation: "12 + 8 = 20." }),
          P.num({ label: "(iii)", marks: 1, type: "CALCULATION", stem: "State the value stored at `Pay` after `STO Pay`.", value: 20, wrong: [12, 8], workedSolution: "1. STO Pay copies the accumulator (20) to address 160.", explanation: "Pay = 20." }),
        ] }),
        P.match({ label: "(c)", marks: 4, stem: "Match each instruction to the addressing mode it uses.", pairs: [["LDM #12", "Immediate"], ["ADD Rate", "Direct"], ["LDX Grades", "Indexed"], ["LDI Link", "Indirect"]], explanation: "LDM is immediate, ADD with an address is direct, LDX indexed, LDI indirect." }),
        P.group({ label: "(d)", stem: "Consider the instruction `LDX Grades` at address 154.", parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "State the effective address used.", value: 163, wrong: [161, 162], workedSolution: "1. IX = 2 (from LDR #2).\n2. Grades is at address 161.\n3. Effective address = 161 + 2 = 163.", explanation: "161 + 2 = 163." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "State the value stored at `Best` after `STO Best`.", value: 70, wrong: [40, 55], workedSolution: "1. The contents of address 163 are 70.\n2. STO Best copies 70 to address 164.", explanation: "Address 163 holds 70." }),
        ] }),
        P.group({ label: "(e)", stem: "Consider the instruction `LDI Link` at address 156.", parts: [
          P.num({ label: "(i)", marks: 1, type: "CALCULATION", stem: "State the address from which the data is loaded.", value: 166, wrong: [165, 90], workedSolution: "1. Link (address 165) holds 166.\n2. The data is loaded from address 166.", explanation: "Link holds the pointer 166." }),
          P.num({ label: "(ii)", marks: 1, type: "CALCULATION", stem: "State the value stored at `Extra` when the program ends.", value: 90, wrong: [166, 70], workedSolution: "1. Address 166 holds 90.\n2. STO Extra stores 90 at address 167.", explanation: "Extra = 90." }),
        ] }),
        P.manual({ label: "(f)", marks: 6, stem: "Describe, using register transfer notation, the fetch of the first instruction and then its decode and execution.", points: ["MAR ← [PC]", "PC ← [PC] + 1", "MDR ← [[MAR]]", "CIR ← [MDR]", "The control unit decodes the opcode LDM and finds that the operand is the number 12", "Execute: the number 12 is placed in the accumulator (ACC ← 12)"], modelAnswer: "MAR ← [PC]\nPC ← [PC] + 1\nMDR ← [[MAR]]\nCIR ← [MDR]\nThe control unit decodes LDM and sees the operand 12. In the execute stage ACC ← 12.", explanation: "Four fetch transfers, decode, execute." }),
        P.manual({ label: "(g)", marks: 8, stem: "A keyboard interrupt arrives while the instruction at address 153 is being executed. Describe how the processor deals with the interrupt and returns to the program.", points: ["The instruction at 153 is completed first", "The interrupt is detected at the end of the fetch-execute cycle", "The priority of the interrupt is checked against the program being run", "The contents of the PC (154) are saved, for example on a stack", "The contents of the other registers (ACC, IX) are saved", "The PC is loaded with the address of the interrupt service routine", "The routine runs and deals with the keyboard", "The saved values are restored and the program continues from address 154"], modelAnswer: "The instruction at 153 is completed and the interrupt is detected at the end of the cycle. If its priority is high enough, the PC (154) and the other registers are saved on a stack. The PC is loaded with the address of the interrupt service routine, which deals with the key press. The saved values are then restored and the program continues from address 154.", explanation: "Complete, detect, save, load ISR address, run, restore, resume." }),
      ]),
      hints: ["The PC is increased during the fetch.", "Indexed: effective address = operand + IX.", "Indirect: read the pointer first."],
      explanation: "After the fetch at 151: PC 152, MAR 151, CIR ADD Rate. ACC 12 then 20; LDX reads address 163 (70); LDI reads address 166 (90).",
    });
  }
  // ------------------------------------------------------------------ 3. Buses, performance and pipelining
  {
    chk(2 ** 22, 4194304); chk(2 ** 22 / 2 ** 20, 4);
    chk(64 * 25, 1600);
    chk(2.4e9 / 3, 8e8);
    chk(20 + 5 - 1, 24); chk(20 * 5, 100);
    b.struct({
      ...Z, d: 4, paper: "ZIMSEC Paper 2 Section A",
      concepts: [C("cpu.buses-ports"), C("cpu.performance"), C("cpu.risc-cisc-pipelining"), C("cpu.architecture-registers")],
      stem: "A college in Gweru is buying computers for a new laboratory. Computer X has an address bus of 22 wires, a 64-wire data bus that makes 25 million transfers each second, and a processor running at 2.4 GHz in which an average instruction needs 3 clock cycles. The processor has a five-stage pipeline in which every stage takes one clock cycle. Memory is organised with one byte at each location (1 MB = 2^20 bytes).",
      parts: checkExam(EXAM.ZIM_P2_ARCH, [
        P.group({ label: "(a)", stem: "Computer X has an address bus of 22 wires.", parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the number of memory locations that can be addressed.", value: 4194304, wrong: [22, 2 ** 20], workedSolution: "1. n wires give 2^n addresses.\n2. 2^22 = 4 194 304.", explanation: "2^22 = 4 194 304 locations." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "State the largest amount of memory, in MB, that can be used.", value: 4, unit: "MB", wrong: [22, 4194304], workedSolution: "1. 4 194 304 bytes ÷ 2^20 = 4 MB.", explanation: "2^22 ÷ 2^20 = 4 MB." }),
        ] }),
        P.num({ label: "(b)", marks: 3, type: "CALCULATION", stem: "Calculate the data rate of the data bus in megabits per second.", value: 1600, unit: "Mbit/s", wrong: [82, 400], workedSolution: "1. Bits per transfer = 64.\n2. Transfers per second = 25 million.\n3. Rate = 64 × 25 = 1600 Mbit/s.", explanation: "64 × 25 = 1600 Mbit/s." }),
        P.num({ label: "(c)", marks: 3, type: "CALCULATION", stem: "Calculate the number of instructions that the processor can carry out each second.", value: 800000000, wrong: [2400000000, 7200000000], workedSolution: "1. Cycles per second = 2 400 000 000.\n2. Instructions per second = 2 400 000 000 ÷ 3 = 800 000 000.", explanation: "2.4 GHz ÷ 3 cycles = 800 million instructions per second." }),
        P.group({ label: "(d)", stem: "A program of 20 instructions with no jumps is run on the five-stage pipeline.", parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", unit: "cycles", stem: "Calculate the number of clock cycles needed with the pipeline.", value: 24, wrong: [100, 25], workedSolution: "1. Cycles = n + k − 1.\n2. 20 + 5 − 1 = 24.", explanation: "20 + 5 − 1 = 24 cycles." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", unit: "cycles", stem: "Calculate the number of clock cycles needed without a pipeline.", value: 100, wrong: [24, 25], workedSolution: "1. 20 × 5 = 100.", explanation: "20 × 5 = 100 cycles." }),
        ] }),
        P.manual({ label: "(e)", marks: 6, stem: "Explain how each of the following affects the performance of a computer: (1) cache memory, (2) the number of cores, (3) clock speed.", points: ["Cache: holds frequently used data and instructions close to the processor", "So fewer slow accesses to main memory are needed", "Cores: more cores can run more instructions or programs at the same time", "But only if the work can be divided between the cores", "Clock speed: a faster clock gives more cycles, and so more instructions, each second", "But the gain is limited by heat, power use and waiting for memory"], modelAnswer: "Cache holds frequently used data close to the processor so fewer slow accesses to main memory are needed. More cores run more programs at the same time, but only if the work can be divided. A faster clock gives more instructions per second, but heat, power and waiting for memory limit the gain.", explanation: "Two marks for each factor: effect and limit." }),
        P.manual({ label: "(f)", marks: 4, stem: "Compare the Von Neumann architecture with the Harvard architecture.", points: ["Von Neumann uses one memory for instructions and data; Harvard uses separate memories", "Von Neumann uses one set of buses; Harvard has separate buses for instructions and data", "Harvard can fetch an instruction and access data at the same time, so it is faster; Von Neumann has a bottleneck", "Harvard is more complex and costly; Von Neumann is simpler"], modelAnswer: "Von Neumann has one memory and one set of buses, so instructions and data cannot be accessed together. Harvard has separate memories and buses so both can be accessed at once, but it is more complex and costly.", explanation: "Memory, buses, speed, cost." }),
        P.manual({ label: "(g)", marks: 6, stem: "Computer Y has 2 cores, a 3.2 GHz clock and 2 MB of cache. Computer X has 4 cores, a 2.4 GHz clock and 8 MB of cache. The laboratory will run several programs at once for many pupils. Recommend one of the computers and justify your choice.", points: ["Recommends computer X", "Four cores allow more programs to run at the same time", "A larger cache means more data is found without using slow main memory", "Computer Y's faster clock helps a single program but only two programs can run at once", "The clock speed difference is small compared with the extra cores and cache", "Several programs at once is the main need, so X gives better overall performance"], modelAnswer: "Computer X. Its four cores let more programs run at the same time, and its larger cache reduces trips to main memory. Computer Y's faster clock helps a single program, but it has only two cores. As the laboratory runs several programs at once, X gives better overall performance.", explanation: "A clear choice linked to the workload." }),
      ]),
      hints: ["Locations = 2^(address wires).", "Pipeline cycles = n + k − 1.", "Instructions per second = cycles per second ÷ cycles per instruction."],
      explanation: "2^22 = 4 194 304 locations = 4 MB; 64 × 25 = 1600 Mbit/s; 800 million instructions per second; pipeline 24 cycles against 100.",
    });
  }
});
