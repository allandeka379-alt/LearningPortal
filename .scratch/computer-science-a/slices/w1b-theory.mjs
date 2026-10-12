// W1b exam-format items: four THEORY10 and three THEORY5 (Paper 1 / Paper 3 style) on hardware, the processor and assembly.
import { concept, P, EXAM, checkExam, CAM, chk, runAsm, round, seriesR, parallelR } from "../lib.mjs";

const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true };
const C = (k) => `acs.${k}`;
const opt = (items, correct = 0) => items.map(([c, w], i) => [c, w]);

concept(C("cpu.architecture-registers"), { file: "exam/w1b-theory", keyPrefix: "exam.w1b-theory" }, (b) => {
  // ------------------------------------------------------------------ 1. Von Neumann, registers and the F-E cycle (both)
  {
    const run = runAsm(["LDD Credit", "ADD Top", "STO Balance", "END", "Credit: 35", "Top: 15", "Balance: 0"], { base: 960 });
    chk(run.trace[1].acc, 50);
    chk(run.labels.Top, 965);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("cpu.architecture-registers"), C("cpu.fetch-execute-interrupts")],
      stem: "A small computer used to sell airtime in a Mutare shop holds this program in memory, stored from address 960. `LDD` loads the contents of an address into the accumulator, `ADD` adds the contents of an address to the accumulator and `STO` stores the accumulator at an address.\n\n```\n960  LDD Credit\n961  ADD Top\n962  STO Balance\n963  END\n964  Credit: 35\n965  Top: 15\n966  Balance: 0\n```",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Which register holds the address of the next instruction to be fetched?", options: [["The program counter", "Correct."], ["The accumulator", "The accumulator holds the results of ALU operations."], ["The memory data register", "The MDR holds the data or instruction just read."], ["The status register", "The status register holds flags."]], answer: "A", explanation: "The PC holds the address of the next instruction." }),
        P.fib({ label: "(b)", marks: 3, stem: "The instruction at address 961 has just been fetched. State the contents of each register.",
          template: "PC: {{blank:pc}}\n\nMAR: {{blank:mar}}\n\nCIR: {{blank:cir}}",
          blanks: [
            { id: "pc", accepted: ["962"], input: "number" },
            { id: "mar", accepted: ["961"], input: "number" },
            { id: "cir", accepted: ["ADD Top"], choices: ["LDD Credit", "ADD Top", "STO Balance", "END"] },
          ], wrong: [["961", "962", "LDD Credit"]], explanation: "PC = 962 (increased during the fetch), MAR = 961, CIR = ADD Top." }),
        P.num({ label: "(c)", marks: 1, type: "CALCULATION", stem: "State the value in the accumulator after `ADD Top` has been executed.", value: 50, wrong: [15, 35], workedSolution: "1. LDD Credit: ACC = 35.\n2. ADD Top: ACC = 35 + 15 = 50.", explanation: "35 + 15 = 50." }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe what happens to the PC, the MAR, the MDR and the CIR during the fetch of an instruction.", points: ["The address in the PC is copied to the MAR", "The PC is increased by one and the instruction at the address in the MAR is read into the MDR", "The instruction is copied from the MDR to the CIR"], modelAnswer: "The PC is copied to the MAR. The PC is incremented and the instruction at the address in the MAR is read into the MDR. The instruction is then copied to the CIR.", explanation: "Three transfers, one mark each." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain what is meant by the stored-program concept.", points: ["The instructions of a program are held in main memory as binary, like the data", "They are fetched and executed one after another by the processor"], modelAnswer: "Program instructions are held in memory as binary numbers in the same way as data, and the processor fetches and executes them one after another.", explanation: "Stored in memory as binary; fetched in sequence." }),
      ]),
      hints: ["The PC is increased during the fetch.", "The MAR holds the address of the instruction fetched."],
      explanation: "After the fetch at 961: PC 962, MAR 961, CIR ADD Top. ACC = 35 + 15 = 50.",
    });
  }
  // ------------------------------------------------------------------ 2. Memory, storage and an embedded control system (CAM)
  {
    const step = 5.12 / 256;
    const reading = Math.round(3.0 / step);
    chk(reading, 150);
    const bytes = 64 * 24 * 30;
    chk(bytes / 1024, 45);
    b.struct({
      ...TH10, d: 3, paper: "Cambridge Paper 1", applies: CAM,
      concepts: [C("hardware.primary-memory"), C("hardware.secondary-storage"), C("hardware.embedded-control")],
      stem: "A borehole pump on a farm near Kariba is controlled by an embedded system. A level sensor in the tank is connected through an 8-bit analogue-to-digital converter (ADC) that covers 0 V to 5.12 V. The microprocessor compares each reading with stored limits, and switches the pump motor on or off. The controller logs 64 bytes of readings every hour on a flash memory chip.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Which type of memory should hold the fixed control program?", options: [["ROM", "Correct: the program never changes and must survive power cuts."], ["DRAM", "DRAM is volatile."], ["SRAM", "SRAM is volatile."], ["A buffer", "A buffer holds data temporarily."]], answer: "A", explanation: "A fixed program is held in ROM." }),
        P.short({ label: "(b)", marks: 1, stem: "Name a type of memory that keeps the stored limits when the power is cut and can be rewritten electrically.", accepted: ["EEPROM", "flash", "flash memory", "EEPROM or flash"], wrong: ["ROM"], explanation: "EEPROM and flash are non-volatile and electrically erasable." }),
        P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "The sensor gives 3.0 V. Calculate the reading given by the ADC.", value: 150, wrong: [3, 256], workedSolution: "1. Readings = 2^8 = 256.\n2. Step = 5.12 ÷ 256 = 0.02 V.\n3. Reading = 3.0 ÷ 0.02 = 150.", explanation: "Each step is 0.02 V, so 3.0 V gives 150." }),
        P.num({ label: "(d)", marks: 1, type: "CALCULATION", unit: "KiB", stem: "Calculate the size of the log in KiB after 30 days (1 KiB = 1024 bytes).", value: 45, wrong: [1920, 46080], workedSolution: "1. Bytes per day = 64 × 24 = 1536.\n2. For 30 days = 1536 × 30 = 46 080 bytes.\n3. 46 080 ÷ 1024 = 45 KiB.", explanation: "46 080 bytes is 45 KiB." }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe how the embedded system keeps the water in the tank above the lower limit.", points: ["The sensor measures the level and the ADC converts it to a digital value", "The microprocessor compares the value with the stored lower limit", "If the level is too low, a signal switches on the pump motor (the actuator)"], modelAnswer: "The level sensor's signal is converted by the ADC. The microprocessor compares it with the lower limit and, if the water is too low, signals the motor to switch on the pump.", explanation: "Sensor and ADC, comparison, actuator." }),
        P.manual({ label: "(f)", marks: 2, stem: "The data could be stored on a hard disk instead of flash memory. Give two reasons why flash is more suitable here.", points: ["No moving parts, so it withstands knocks and vibration", "Uses less power, which suits a controller running on a solar panel"], modelAnswer: "Flash has no moving parts, so it is more robust, and it uses less power.", explanation: "Robustness and power." }),
      ]),
      hints: ["An n-bit ADC has 2^n readings.", "Reading = voltage ÷ step."],
      explanation: "ROM holds the program, EEPROM or flash the limits; 3.0 V gives 150; 46 080 bytes = 45 KiB.",
    });
  }
  // ------------------------------------------------------------------ 3. Interrupts (both)
  {
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("cpu.fetch-execute-interrupts")],
      stem: "A teacher in Gweru is typing a report on a school computer while a large document is being printed. When the printer is ready for more data it sends an interrupt signal to the processor. The processor is executing the instruction at address 212 when the signal arrives.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "When does the processor check whether an interrupt has been signalled?", options: [["At the end of each fetch-execute cycle", "Correct."], ["In the middle of the current instruction", "The instruction is completed first."], ["Only when the document ends", "Interrupts must be handled as they occur."], ["Only at start-up", "Interrupts occur at any time."]], answer: "A", explanation: "The check is made after each instruction is complete." }),
        P.short({ label: "(b)", marks: 1, stem: "Name the program that is run to deal with the printer's interrupt.", accepted: ["interrupt service routine", "ISR", "interrupt handler"], wrong: ["word processor"], explanation: "The interrupt service routine (or interrupt handler)." }),
        P.fib({ label: "(c)", marks: 3, stem: "Complete the description of what the processor does.",
          template: "The processor {{blank:a}} the PC and registers, then {{blank:b}} the PC with the address of the ISR. When the ISR has finished, the saved values are {{blank:c}} and the report program continues.",
          blanks: [
            { id: "a", accepted: ["saves"], choices: ["saves", "deletes", "prints", "ignores"] },
            { id: "b", accepted: ["loads"], choices: ["loads", "empties", "doubles", "closes"] },
            { id: "c", accepted: ["restored"], choices: ["restored", "erased", "compressed", "printed"] },
          ], explanation: "Save, load the ISR address, restore." }),
        P.num({ label: "(d)", marks: 1, stem: "The instruction at 212 is completed and the interrupt is detected. State the value of the PC that is saved.", value: 213, wrong: [212, 211], workedSolution: "1. The PC was increased during the fetch of the instruction at 212.\n2. It holds 213, the address of the next instruction, which is saved.", explanation: "The PC points to the next instruction, 213." }),
        P.manual({ label: "(e)", marks: 2, stem: "Give two causes of interrupts, other than a printer being ready.", points: ["A key being pressed / input event", "A hardware fault, a software error such as division by zero, or a timer signal"], modelAnswer: "A key being pressed, and a division by zero.", explanation: "Any two valid causes." }),
        P.manual({ label: "(f)", marks: 2, stem: "While the printer's routine is running, a power failure interrupt of higher priority occurs. Describe what the processor does.", points: ["The printer routine is suspended and its state saved", "The power failure routine is run first; the printer routine resumes afterwards"], modelAnswer: "The printer routine is suspended and its state saved. The power-failure routine runs first and the printer routine resumes afterwards.", explanation: "Higher priority is handled first." }),
      ]),
      hints: ["The PC is increased during the fetch.", "The registers are saved before the ISR runs."],
      explanation: "Interrupts are checked at the end of the cycle; PC 213 is saved; the ISR runs and the registers are restored.",
    });
  }
  // ------------------------------------------------------------------ 4. RISC, CISC, pipelining and parallel processing (CAM)
  {
    const piped = 9 + 4 - 1;
    chk(piped, 12);
    chk(9 * 4, 36);
    const sp = 1 / ((1 - 0.75) + 0.75 / 3);
    chk(sp, 2);
    b.struct({
      ...TH10, d: 4, paper: "Cambridge Paper 3", applies: CAM,
      concepts: [C("cpu.risc-cisc-pipelining"), C("cpu.parallel-processing")],
      stem: "A company in Harare is choosing processors for a new product. Processor A is a RISC processor with a four-stage pipeline. Each stage takes one clock cycle. A program of 9 instructions with no jumps is run on it.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "cycles", stem: "Calculate the number of clock cycles needed to complete the 9 instructions using the pipeline.", value: 12, wrong: [36, 13], workedSolution: "1. Cycles = n + k − 1.\n2. 9 + 4 − 1 = 12.", explanation: "9 + 4 − 1 = 12 cycles." }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", unit: "cycles", stem: "Calculate the number of clock cycles needed without a pipeline, if each instruction takes 4 cycles.", value: 36, wrong: [12, 13], workedSolution: "1. 9 × 4 = 36.", explanation: "9 × 4 = 36 cycles." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Processor B has many units that all apply one instruction to different pixels of an image at the same time. Which architecture is this?", options: [["SIMD", "Correct."], ["SISD", "SISD handles one data item at a time."], ["MISD", "MISD has one data stream."], ["MIMD", "MIMD runs different instructions on different data."]], answer: "A", explanation: "One instruction on many data items is SIMD." }),
        P.num({ label: "(d)", marks: 2, type: "CALCULATION", stem: "75% of a task can be run in parallel. Calculate the speed-up on 3 processors.", value: 2, wrong: [3, 2.25], workedSolution: "1. 1 − p = 0.25 and p ÷ n = 0.75 ÷ 3 = 0.25.\n2. Speed-up = 1 ÷ (0.25 + 0.25) = 2.", explanation: "1 ÷ 0.5 = 2." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two differences between a RISC and a CISC processor.", points: ["RISC has a small set of simple instructions; CISC has a large set of complex instructions", "RISC instructions are fixed length and mostly take one cycle; CISC instructions vary in length and cycles"], modelAnswer: "RISC has a small set of simple, fixed-length instructions that mostly take one cycle. CISC has a large set of complex, variable-length instructions that take several cycles.", explanation: "Any two valid differences." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why a jump instruction reduces the benefit of a pipeline.", points: ["The instructions after the jump have already been fetched before the target is known", "They must be discarded and the pipeline refilled, wasting cycles"], modelAnswer: "Instructions after the jump are already in the pipeline. If the jump is taken they are wrong, so they are discarded and the pipeline refilled.", explanation: "Wrong instructions in the pipeline." }),
      ]),
      hints: ["Pipeline cycles = n + k − 1.", "Speed-up = 1 ÷ ((1 − p) + p ÷ n)."],
      explanation: "9 + 4 − 1 = 12 cycles against 36; SIMD applies one instruction to many data; speed-up = 2.",
    });
  }
  // ------------------------------------------------------------------ 5. Buses and bus width (both) THEORY5
  {
    chk(2 ** 16, 65536);
    b.struct({
      ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("cpu.buses-ports")],
      stem: "A processor in a school's weather logger has a 16-wire address bus and an 8-wire data bus.",
      parts: checkExam(EXAM.THEORY5, [
        P.mcq({ label: "(a)", marks: 1, stem: "In which direction do signals travel on the address bus?", options: [["From the processor to memory only", "Correct."], ["From memory to the processor only", "Memory does not send addresses."], ["Both ways", "That is the data bus."], ["From the keyboard to the screen", "This is not a bus direction."]], answer: "A", explanation: "The address bus is one-way, from the processor." }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the number of memory locations that can be addressed.", value: 65536, wrong: [16, 256], workedSolution: "1. n wires give 2^n addresses.\n2. 2^16 = 65 536.", explanation: "2^16 = 65 536 locations." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain the effect of replacing the 8-wire data bus with a 16-wire data bus.", points: ["Twice as many bits are moved in each transfer", "Data reaches the processor faster, so performance is improved"], modelAnswer: "Twice as many bits are moved in each transfer, so data reaches the processor faster and performance improves.", explanation: "More bits per transfer." }),
      ]),
      explanation: "The address bus is one-way; 16 wires give 65 536 locations; a wider data bus moves more bits per transfer.",
    });
  }
  // ------------------------------------------------------------------ 6. Input and output devices (CAM) THEORY5
  {
    b.struct({
      ...TH5, d: 2, paper: "Cambridge Paper 1", applies: CAM,
      concepts: [C("hardware.io-devices")],
      stem: "A hardware shop in Mutare uses a laser printer for receipts and a touchscreen for taking orders. Staff often wear thick gloves.",
      parts: checkExam(EXAM.THEORY5, [
        P.short({ label: "(a)", marks: 1, stem: "Name the part of a laser printer that melts the toner onto the paper.", accepted: ["fuser", "the fuser"], wrong: ["drum"], explanation: "The fuser uses heat and pressure to fix the toner." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which type of touchscreen is better for staff wearing thick gloves?", options: [["Resistive", "Correct: it responds to pressure."], ["Capacitive", "It needs a conducting fingertip."], ["Virtual reality", "This is not a type of touchscreen."], ["Laser", "This is not a type of touchscreen."]], answer: "A", explanation: "A resistive screen works through a glove." }),
        P.manual({ label: "(c)", marks: 3, stem: "Describe how a microphone allows sound to be stored in a computer.", points: ["Sound waves make a diaphragm vibrate", "This produces a varying analogue voltage", "An analogue-to-digital converter changes it into binary numbers"], modelAnswer: "Sound makes a diaphragm vibrate, producing a varying voltage. An ADC converts the voltage into binary numbers for storage.", explanation: "Diaphragm, voltage, ADC." }),
      ]),
      explanation: "The fuser fixes the toner; a resistive screen works with gloves; the microphone signal passes through an ADC.",
    });
  }
  // ------------------------------------------------------------------ 7. Addressing modes (both) THEORY5
  {
    const run = runAsm(["LDR #1", "LDX Tab", "LDI Ptr", "END", "Tab: 14", "22", "Ptr: 507", "Dat: 61"], { base: 500 });
    chk(run.labels.Tab, 504); chk(run.labels.Ptr, 506); chk(run.labels.Dat, 507);
    chk(run.trace[1].acc, 22); chk(run.trace[2].acc, 61);
    b.struct({
      ...TH5, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("asm.addressing-modes")],
      stem: "A program is stored from address 500. `LDR #1` loads 1 into the index register.\n\n```\n500  LDR #1\n501  LDX Tab\n502  LDI Ptr\n503  END\n504  Tab: 14\n505  22\n506  Ptr: 507\n507  Dat: 61\n```",
      parts: checkExam(EXAM.THEORY5, [
        P.short({ label: "(a)", marks: 1, stem: "State the name of the addressing mode used by `LDX Tab`.", accepted: ["indexed", "indexed addressing"], wrong: ["direct"], explanation: "LDX uses indexed addressing." }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "State the effective address used by `LDX Tab`.", value: 505, wrong: [504, 22], workedSolution: "1. IX = 1.\n2. Tab is at address 504.\n3. Effective address = 504 + 1 = 505.", explanation: "504 + 1 = 505." }),
        P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "State the value in the accumulator after `LDI Ptr` has been executed.", value: 61, wrong: [507, 22], workedSolution: "1. The contents of Ptr (address 506) are 507.\n2. The contents of address 507 are 61.", explanation: "Ptr holds 507 and address 507 holds 61." }),
      ]),
      hints: ["For indexed addressing add the contents of IX to the operand.", "For indirect addressing read the pointer first."],
      explanation: "LDX Tab with IX = 1 reads address 505 (22); LDI Ptr reads 507, which holds 61.",
    });
  }
});
