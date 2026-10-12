// Slice w1b: fetch-execute cycle and interrupts (acs.cpu.fetch-execute-interrupts, both boards).
import { concept, P, chk, ZIM, runAsm } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.cpu.fetch-execute-interrupts", { file: "cpu/fetch-execute-interrupts", keyPrefix: "cpu.fetch-execute-interrupts" }, (b) => {
  // Trace program for the structured item (base 500), run for real.
  const run = runAsm(["LDM #8", "SUB Used", "STO Left", "END", "Used: 3", "Left: 0"], { base: 500 });
  const L = run.labels;
  chk(L.Used, 504); chk(L.Left, 505);
  chk(run.trace[0].acc, 8); chk(run.trace[1].acc, 5); chk(run.mem[L.Left], 5);

  mc(b, 1, "RECALL", "Which register transfer is the first step of the fetch stage?",
    ["MAR ← [PC]", "Correct: the address of the next instruction is copied from the PC to the MAR."],
    [["PC ← [MDR]", "The PC does not take its value from the MDR in a normal fetch."], ["CIR ← [MAR]", "The CIR receives the instruction from the MDR, after it has been read."], ["MDR ← [PC]", "The MDR holds data read from memory, not the address in the PC."]],
    "Fetch begins by copying the PC into the MAR.");
  mc(b, 2, "UNDERSTANDING", "What happens to the program counter during the fetch stage?",
    ["It is increased by one to point to the next instruction", "Correct: this happens before the instruction is executed."],
    [["It is set to zero so the program starts again", "It is reset only by a jump or by starting a program."], ["It is copied to the accumulator", "The accumulator holds data, not the PC."], ["It is not changed until the instruction has been executed", "The PC is increased in the fetch stage."]],
    "PC ← [PC] + 1 is the second step of the fetch.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the purpose of an interrupt?",
    ["To make the processor pause and deal with an event", "Correct: urgent events are handled by a special routine."],
    [["To make the processor run faster for a short period", "An interrupt does not increase the speed of the processor."], ["To copy data from the hard disk into the cache", "That is a data transfer, not the purpose of an interrupt."], ["To remove errors from a program before it is run", "Errors are found by testing and translators, not by interrupts."]],
    "An interrupt signals that something needs attention, so the processor runs an interrupt service routine.");
  mc(b, 2, "RECALL", "At which point does the processor check for interrupts?",
    ["After each instruction is done", "Correct: it never stops in the middle of an instruction."],
    [["At the start of the program only, never later", "Interrupts can occur at any time and are checked all the time."], ["Halfway through each of the instructions", "The current instruction is always completed first."], ["Only at the moment when the program ends", "The program may need to be interrupted before it ends."]],
    "The control unit checks for pending interrupts after each instruction is complete.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why are the contents of the PC and the other registers saved before an interrupt service routine runs?",
    ["So the old program can carry on correctly", "Correct: the registers are restored when the ISR finishes."],
    [["So the ISR can run without using any registers at all", "The ISR does use registers; that is why the old values are saved."], ["So the interrupt can be ignored later", "The interrupt is handled, not ignored."], ["So the main program can be copied to the hard disk", "Saving registers does not copy the program."]],
    "The ISR will overwrite registers and the PC, so their values are saved and later restored.", { hints: ["What would be lost if the PC were overwritten by the ISR address?"] });
  mc(b, 3, "APPLICATION", "A program divides a number by zero and the processor signals an error. How does ZIMSEC classify this interrupt?",
    ["Internal", "Correct: it is caused by the running program inside the processor."],
    [["External", "External interrupts come from hardware outside the processor."], ["Software, requested on purpose by a system call", "A software interrupt is a deliberate request by a program."], ["Timer", "Nothing here involves the timer."]],
    "Division by zero and overflow are internal interrupts.", { applies: ZIM, hints: ["Where does the cause of the interrupt come from?"] });
  mc(b, 3, "APPLICATION", "In register transfer notation, what does MDR ← [[MAR]] mean?",
    ["The contents of the addressed location go to the MDR", "Correct: the double brackets mean the contents of the addressed location."],
    [["The address held in the MAR is copied to the MDR register", "That would be written MDR ← [MAR] when [MAR] means the register contents."], ["The value in the MDR is copied into the MAR register", "The arrow points to the MDR, so it is the destination."], ["The program counter is copied into the MDR register", "The PC is not mentioned."]],
    "[MAR] is the address; [[MAR]] is the contents of memory at that address.", { hints: ["One pair of brackets takes the contents of a register; two pairs take the contents of the location it points to."] });
  mc(b, 4, "ANALYSIS", "An interrupt service routine for a keyboard is running when a power failure interrupt of higher priority arrives. What should happen?",
    ["The keyboard ISR is suspended and the power failure is done first", "Correct: higher-priority interrupts are dealt with first."],
    [["The power failure interrupt is ignored until the keyboard ISR ends", "That would treat a lower-priority task as more important."], ["The processor stops and waits for the user to restart it", "The processor deals with the interrupts itself."], ["Both ISRs run together on the same registers", "One processor core runs one routine at a time."]],
    "Priorities decide the order. The state of the keyboard ISR is saved and restored once the more urgent interrupt is complete.", { hints: ["Which of the two events is more urgent?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "When an interrupt occurs, the processor stops in the middle of the current instruction.", answer: false,
    explanation: "False. The current instruction is completed. The interrupt is detected at the end of the fetch-execute cycle." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "After an interrupt service routine has finished, the saved register values are restored.", answer: true,
    explanation: "True. Restoring the PC and the other registers lets the interrupted program continue exactly where it left off." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each register transfer to its meaning.",
    pairs: [["MAR ← [PC]", "The address of the next instruction is copied to the MAR"], ["PC ← [PC] + 1", "The PC is moved on to the next instruction"], ["MDR ← [[MAR]]", "The contents of the addressed location are read into the MDR"], ["CIR ← [MDR]", "The instruction is placed in the current instruction register"]],
    explanation: "These four transfers are the fetch stage of the cycle." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the steps of handling an interrupt.",
    template: "The current instruction is {{blank:a}}. The contents of the registers are {{blank:b}}. The PC is loaded with the address of the {{blank:c}}. When it finishes, the registers are restored.",
    blanks: [
      { id: "a", accepted: ["completed"], choices: ["completed", "deleted", "repeated", "ignored"] },
      { id: "b", accepted: ["saved"], choices: ["saved", "erased", "printed", "compressed"] },
      { id: "c", accepted: ["interrupt service routine"], choices: ["interrupt service routine", "main program", "bootstrap", "next file"] },
    ],
    explanation: "Complete, save, run the ISR, restore." });
  const run3 = runAsm(["LDM #6", "ADD Rate", "STO Pay", "END", "Rate: 4", "Pay: 0"], { base: 600 });
  chk(run3.mem[run3.labels.Pay], 10);
  b.num({ d: 3, skill: "APPLICATION", hints: ["Follow the three instructions and keep the value in the accumulator."],
    stem: "A program is stored from address 600:\n\n```\n600  LDM #6\n601  ADD Rate\n602  STO Pay\n603  END\n604  Rate: 4\n605  Pay: 0\n```\n\n`LDM #6` loads the number 6 into the accumulator, `ADD Rate` adds the value stored at `Rate` to the accumulator and `STO Pay` stores the accumulator at `Pay`. What value is stored at `Pay` when the program ends?",
    value: run3.mem[run3.labels.Pay], wrong: [6, 4], workedSolution: "1. LDM #6: ACC = 6.\n2. ADD Rate: ACC = 6 + 4 = 10.\n3. STO Pay: address 605 holds 10.", explanation: "6 + 4 = 10 is stored at Pay." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the routine that is run to deal with a particular interrupt.",
    accepted: ["interrupt service routine", "ISR", "interrupt handler", "the interrupt service routine"], wrong: ["bootstrap", "buffer"], explanation: "The interrupt service routine (ISR) or interrupt handler deals with the interrupt." });
  b.manualShort({ d: 3, skill: "RECALL", marks: 4, hints: ["Four lines: MAR, PC, MDR, CIR."],
    stem: "Write the four register transfers that make up the fetch stage of the fetch-execute cycle. [4]",
    points: ["MAR ← [PC]", "PC ← [PC] + 1", "MDR ← [[MAR]] (or MDR ← [MAR])", "CIR ← [MDR]"],
    modelAnswer: "MAR ← [PC]\nPC ← [PC] + 1\nMDR ← [[MAR]]\nCIR ← [MDR]",
    explanation: "One mark for each transfer in the correct order." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Complete, check, save, ISR, restore."],
    stem: "Describe how the processor handles an interrupt that occurs while a program is running. [4]",
    points: ["The current instruction is completed and the interrupt is detected at the end of the cycle", "The contents of the PC and the registers are saved (for example on a stack)", "The PC is loaded with the address of the interrupt service routine, which then runs", "The saved values are restored and the interrupted program continues"],
    modelAnswer: "The current instruction is finished and the interrupt is detected at the end of the cycle. The PC and registers are saved on a stack, then the PC is loaded with the address of the ISR. When the ISR has finished, the saved values are restored and the program carries on.",
    explanation: "Detect, save, run the ISR, restore." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["What would the ISR overwrite?"],
    stem: "Explain why the contents of the registers are saved before the interrupt service routine runs. [2]",
    points: ["The ISR will use the same registers and overwrite their contents", "The saved values are restored afterwards so the interrupted program can continue correctly"],
    modelAnswer: "The ISR uses the registers and would overwrite their contents. Restoring the saved values lets the interrupted program continue as if nothing had happened.",
    explanation: "Overwriting, then continuing correctly." });
  b.manualShort({ d: 2, skill: "RECALL", marks: 3, hints: ["Give three different causes."],
    stem: "Give three different causes of an interrupt. [3]",
    points: ["A hardware fault, such as a power failure", "An input or output event, such as a key being pressed or a printer ready for data", "A software error or request, such as division by zero, or a timer signal"],
    modelAnswer: "A power failure, a key being pressed, and a division by zero.",
    explanation: "Any three different valid causes." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["The PC is increased during the fetch.", "SUB uses direct addressing, so the MAR holds the address of Used."],
    explanation: "After the fetch of the instruction at 501: PC 502, MAR 501, CIR SUB Used. ACC becomes 5, the MAR holds 505 when STO writes.",
    stem: "The program below is stored from address 500. The instruction at address 501 has just been fetched.\n\n```\n500  LDM #8\n501  SUB Used\n502  STO Left\n503  END\n504  Used: 3\n505  Left: 0\n```",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "State the contents of the PC, the MAR and the CIR after the fetch.",
        template: "PC: {{blank:pc}}\n\nMAR: {{blank:mar}}\n\nCIR: {{blank:cir}}",
        blanks: [
          { id: "pc", accepted: ["502"], input: "number" },
          { id: "mar", accepted: ["501"], input: "number" },
          { id: "cir", accepted: ["SUB Used"], choices: ["LDM #8", "SUB Used", "STO Left", "END"] },
        ], wrong: [["501", "502", "LDM #8"]], explanation: "PC = 502, MAR = 501, CIR = SUB Used." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value in the accumulator after the instruction at address 501 has been executed.", value: 5, wrong: [8, 3], workedSolution: "1. ACC was 8 after LDM #8.\n2. SUB Used subtracts 3: 8 − 3 = 5.", explanation: "8 − 3 = 5." }),
      P.num({ label: "(c)", marks: 1, stem: "State the value in the MAR when `STO Left` writes to memory.", value: 505, wrong: [502, 5], workedSolution: "1. Left is at address 505.\n2. The MAR holds the address being written: 505.", explanation: "Left is at address 505." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the register that holds the instruction while it is being decoded.", accepted: ["current instruction register", "CIR", "the CIR"], wrong: ["MAR"], explanation: "The CIR holds the instruction being decoded." }),
      P.manual({ label: "(e)", marks: 2, stem: "An interrupt arrives while `SUB Used` is being executed. Explain why it is not handled until `SUB Used` is complete.", points: ["The processor completes the current instruction", "Interrupts are checked at the end of each fetch-execute cycle"], modelAnswer: "The current instruction is always completed, and the check for interrupts takes place at the end of each fetch-execute cycle.", explanation: "Complete the instruction; check at the end." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Think about what has to be restored afterwards."],
    explanation: "Interrupts are checked at the end of the cycle; the PC and registers are saved and restored; priority decides which interrupt is handled first.",
    stem: "A school computer is running a spreadsheet when the user presses a key. The key press generates an interrupt.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "When does the processor check whether an interrupt has been signalled?", options: [["At the end of each fetch-execute cycle", "Correct."], ["In the middle of every instruction", "Instructions are completed first."], ["Only when the user switches off the computer", "Interrupts are checked all the time the processor is running."], ["Only after the program has ended", "The program must be able to be interrupted while it runs."]], answer: "A", explanation: "The check takes place after each instruction is complete." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the program that is run to deal with the key press.", accepted: ["interrupt service routine", "ISR", "interrupt handler"], wrong: ["spreadsheet"], explanation: "The interrupt service routine." }),
      P.manual({ label: "(c)", marks: 2, stem: "State what must be saved before the routine runs, and where it may be saved.", points: ["The contents of the PC and the registers in use", "On a stack (or in a reserved area of memory)"], modelAnswer: "The program counter and the registers, saved on a stack.", explanation: "Contents and place." }),
      P.manual({ label: "(d)", marks: 2, stem: "While the keyboard routine is running, a power failure interrupt of higher priority occurs. Describe what the processor does.", points: ["It suspends the keyboard routine and saves its state", "It handles the power failure first, then returns to the keyboard routine"], modelAnswer: "The keyboard routine is suspended and its state saved. The power failure routine runs first, and afterwards the keyboard routine resumes.", explanation: "Higher priority runs first." }),
    ] });
  b.card("DEFINITION", "Fetch-execute cycle", "The repeated sequence of fetching an instruction, decoding it and executing it.");
  b.card("FORMULA", "Fetch in register transfer notation", "MAR ← [PC]; PC ← [PC] + 1; MDR ← [[MAR]]; CIR ← [MDR].", "Square brackets mean 'contents of'.");
  b.card("CONCEPT", "Decode and execute", "The CU decodes the opcode and operand in the CIR; the instruction is then carried out by the ALU or the CU.");
  b.card("DEFINITION", "Interrupt", "A signal asking the processor to pause the current program and run a routine to deal with an event.");
  b.card("FACT", "Causes of interrupts", "Hardware faults, I/O events, software errors and traps, timers and user action.");
  b.card("CONCEPT", "Handling an interrupt", "Finish the instruction, save the registers, load the PC with the ISR address, run the ISR, restore the registers.");
  b.card("CONCEPT", "When interrupts are detected", "At the end of each fetch-execute cycle.");
  b.card("CONCEPT", "Interrupt priority", "A higher-priority interrupt is handled first; lower priority interrupts wait.");
  b.card("FACT", "ZIMSEC interrupt types", "Internal (from the running program), external (from hardware) and software (requested by a program).", "ZIMSEC wording.", { applies: ZIM });
});
