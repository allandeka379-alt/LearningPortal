// Slice w2b: firmware, the bootloader and interrupts (comp.software.interrupts-firmware, Cambridge only).
import { concept, P } from "../lib.mjs";

const STEPS = ["The interrupt signal is sent to the processor", "The processor saves the contents of its registers", "The interrupt service routine is run", "The saved register contents are restored and the task resumes"];

concept("comp.software.interrupts-firmware", { file: "software/interrupts-firmware", keyPrefix: "software.interrupts-firmware" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **interrupt**?",
    options: [
      ["A signal to the processor that an event needs attention", "Correct: it is sent by a device or by software."],
      ["A fault that switches the computer off", "An interrupt is a normal signal, not a shutdown."],
      ["A program stored permanently in ROM", "That describes firmware."],
      ["A cable that connects a device to the computer", "An interrupt is a signal, not a connection."],
    ],
    answer: "A",
    explanation: "An interrupt is a signal from hardware or software telling the processor that something needs attention.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which program runs first when a computer is switched on, and loads the operating system?",
    options: [
      ["The bootloader", "Correct: this firmware starts the computer and loads the OS."],
      ["The interrupt service routine", "An ISR handles one type of interrupt."],
      ["The device driver", "Drivers are loaded by the OS later."],
      ["The compiler", "A compiler translates program code."],
    ],
    answer: "A",
    explanation: "The bootloader is firmware held in ROM or flash memory; it checks the hardware and loads the OS into RAM.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these generates a **software** interrupt?",
    options: [
      ["A program attempts to divide a number by zero", "Correct: the error arises in a running program."],
      ["A key is pressed on the keyboard during a download", "A key press is a hardware interrupt."],
      ["The mouse is moved", "Mouse movement is a hardware interrupt."],
      ["The printer runs out of paper in the middle of a job", "This comes from a hardware device."],
    ],
    answer: "A",
    explanation: "Software interrupts come from programs: division by zero, two processes accessing the same memory location, requests for OS services.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the bootloader stored in ROM or flash memory rather than in RAM?",
    options: [
      ["It must be available as soon as the power is switched on, and RAM is volatile", "Correct: RAM is empty at power-on; ROM and flash keep their contents."],
      ["ROM is much faster to access than RAM, so the computer starts up far more quickly", "Speed is not the reason; RAM is usually faster to access."],
      ["RAM is too small to hold the bootloader as well as the OS", "RAM holds the OS and applications once loaded."],
      ["The user needs to change the bootloader every day", "Firmware is rarely changed; ROM is read-only."],
    ],
    answer: "A",
    explanation: "RAM loses its contents when the power is off, so the start-up program must be held in non-volatile memory.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When does the processor check whether an interrupt is waiting?",
    options: [
      ["At the end of each fetch-decode-execute cycle", "Correct: the current instruction is completed first."],
      ["Only when the computer is switched on", "Interrupts are checked continually, not only at start-up."],
      ["Only when the user presses the power button", "Interrupts come from many events."],
      ["In the middle of decoding each instruction", "The current cycle is completed before an interrupt is serviced."],
    ],
    answer: "A",
    explanation: "The processor finishes the current cycle, then checks for interrupts before fetching the next instruction.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What must the processor remember so that it can carry on afterwards?"],
    stem: "Before running an interrupt service routine, why does the processor save the contents of its registers?",
    options: [
      ["So that the interrupted task can be resumed from where it stopped", "Correct: the saved state is restored after the ISR."],
      ["So that the interrupt can be deleted", "Saving registers does not remove the interrupt."],
      ["So that the operating system can be reloaded from storage", "The OS is already in RAM."],
      ["So that the hardware can be checked for faults", "Hardware checks are done by the bootloader at start-up."],
    ],
    answer: "A",
    explanation: "The ISR will use the registers. Saving them (including the program counter) lets the original task continue afterwards.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which layer runs directly on the hardware?"],
    stem: "Which statement correctly describes how software runs on a computer?",
    options: [
      ["Applications run on the OS, the OS runs on the firmware, the firmware runs on the hardware", "Correct: each layer runs on the one below."],
      ["Applications run directly on the hardware, without the OS", "Applications request services from the OS."],
      ["The OS runs on the applications, the applications run on the firmware, the firmware on the hardware", "The OS and the applications are the wrong way round."],
      ["The firmware runs on the OS, and the OS runs directly on the hardware", "The firmware is below the OS: it loads it."],
    ],
    answer: "A",
    explanation: "Hardware → firmware (bootloader) → operating system → applications.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Compare the priority of the waiting interrupt with the current task."],
    stem: "An interrupt arrives while the processor is servicing another interrupt of **higher** priority. What happens?",
    options: [
      ["The new interrupt waits until the higher-priority task is finished", "Correct: lower-priority interrupts are held until they can be serviced."],
      ["The new interrupt is serviced at once and the current ISR is abandoned", "Only a higher-priority interrupt can pause the current task."],
      ["The new interrupt is deleted and never serviced", "It is not discarded; it waits."],
      ["The computer restarts to clear both interrupts", "Interrupts are a normal event; no restart is needed."],
    ],
    answer: "A",
    explanation: "Interrupts are given priorities; a lower-priority interrupt waits until the processor can deal with it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Moving the mouse generates a hardware interrupt.",
    answer: true,
    explanation: "True. Mouse movements and key presses are hardware interrupts generated by input devices.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "On a PC the operating system is stored permanently in ROM and runs from there.",
    answer: false,
    explanation: "False. The OS is stored on secondary storage and loaded into RAM by the bootloader, which is the firmware stored in ROM or flash memory.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each event as a hardware or a software interrupt.",
    pairs: ["A key is pressed", "Two processes try to write to the same memory location", "The printer's buffer becomes empty", "A program divides by zero", "The mouse is clicked"],
    right: ["Hardware interrupt", "Software interrupt"],
    rightIndex: [0, 1, 0, 1, 0],
    explanation: "Devices generate hardware interrupts; running programs generate software interrupts.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["The ISR runs between saving and restoring."],
    stem: "Put the steps for handling an interrupt in order by choosing the correct step for each position.",
    template: STEPS.map((_, i) => `Step ${i + 1}: {{blank:s${i + 1}}}`).join("\n\n"),
    blanks: STEPS.map((s, i) => ({ id: `s${i + 1}`, accepted: [s], choices: STEPS })),
    explanation: STEPS.map((s, i) => `${i + 1}. ${s}.`).join(" "),
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A short program run to deal with one type of interrupt is an interrupt {{blank:a}} routine. Software stored permanently on a chip that controls hardware at a basic level is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["service"], choices: ["service", "storage", "search", "status"] },
      { id: "b", accepted: ["firmware"], choices: ["firmware", "freeware", "shareware", "middleware"] },
    ],
    explanation: "Interrupt service routine; firmware.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the abbreviation for the routine that handles an interrupt.",
    accepted: ["ISR", "interrupt service routine", "interrupt handler"],
    wrong: ["IDE"],
    explanation: "ISR: interrupt service routine.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Start from switching on: what is in RAM, and what is in ROM?"],
    stem: "Explain how hardware, firmware and an operating system are all needed to run an application. [3]",
    points: [
      "The firmware / bootloader (in ROM or flash) runs on the hardware when the computer is switched on",
      "It loads the operating system from storage into RAM / starts the OS",
      "The application runs on the OS, which provides services / manages the hardware for it",
    ],
    modelAnswer: "When the computer is switched on, the bootloader (firmware in ROM) runs on the hardware and loads the operating system into RAM. The application then runs on the operating system, which manages the hardware for it.",
    explanation: "The answer must show the chain: hardware → firmware → OS → application.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Four steps: check, save, ISR, restore."],
    stem: "Describe how the processor handles an interrupt. [4]",
    points: [
      "The processor checks for interrupts at the end of each FDE cycle / checks priority against the current task",
      "The current state / contents of the registers are saved",
      "The source is identified and the matching interrupt service routine is run",
      "The saved state is restored and the original task resumes (or the next interrupt is serviced)",
    ],
    modelAnswer: "At the end of the current fetch-decode-execute cycle the processor checks for interrupts and compares the priority. If higher, it saves the contents of its registers, identifies the source and runs the matching ISR. Afterwards it restores the registers and continues the interrupted task.",
    explanation: "Check, save, run ISR, restore.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["The key press comes from a device.", "Say what the user sees as a result."],
    stem: "Nyasha is typing an essay while a large file is downloading in the background.",
    parts: [
      P.mcq({ label: "(a)", stem: "Each key press generates which type of interrupt?", options: [["Hardware interrupt", "Correct."], ["Software interrupt", "It comes from a device, not a program."], ["Firmware interrupt", "Not a category used here."], ["Boot interrupt", "Not a category used here."]], answer: "A", explanation: "Keyboard → hardware interrupt." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe what happens from the moment the key is pressed until the letter appears.", points: ["Interrupt signal sent; the processor checks at the end of the FDE cycle and the priority is higher than the download task", "The download task's state (registers) is saved and the keyboard ISR runs", "The character is processed and displayed; the state is restored and the download continues"], modelAnswer: "The key press sends an interrupt. At the end of its current cycle the processor sees it has higher priority, saves the download task's registers and runs the keyboard ISR, which stores and displays the letter. It then restores the registers and the download continues." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** examples of software interrupts.", points: ["Division by zero", "Two processes trying to access the same memory location (or a program requesting an OS service / a program error)"], modelAnswer: "Division by zero; two processes trying to access the same memory location." }),
    ],
    explanation: "Key press = hardware interrupt; save state, run ISR, restore.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["RAM is volatile.", "The bootloader is firmware."],
    stem: "Tendai switches on the desktop computer in a Bulawayo internet café.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why the bootloader must be stored in non-volatile memory.", points: ["RAM is volatile so it is empty when the power is switched on", "The bootloader must be available immediately to start the computer / load the OS, so it is held in ROM or flash memory"], modelAnswer: "RAM is empty when the computer is switched on because it is volatile, so the start-up program must be in ROM or flash where it is available at once." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe what the bootloader does.", points: ["Checks / tests the hardware", "Loads the operating system from secondary storage into RAM and starts it"], modelAnswer: "It tests the hardware, then loads the OS from the drive into RAM and starts it." }),
      P.mcq({ label: "(c)", stem: "Tendai's browser runs on which layer?", options: [["The operating system", "Correct."], ["The bootloader directly", "Applications need the OS."], ["The ROM chip", "Applications run in RAM on the OS."], ["The interrupt service routine", "ISRs handle interrupts."]], answer: "A", explanation: "Applications run on the OS." }),
      P.mcq({ label: "(d)", stem: "The printer runs out of paper while Tendai prints. What is the most likely result of the interrupt?", options: [["A message asking him to add paper is displayed", "Correct."], ["The computer restarts to clear the printer queue", "No restart is needed."], ["The document is deleted from the print queue", "The job waits."], ["The browser closes", "The interrupt does not close the application."]], answer: "A", explanation: "The ISR displays a message; printing resumes later." }),
    ],
    explanation: "Non-volatile firmware; bootloader loads the OS; apps on the OS; ISR displays a message.",
  });

  b.card("DEFINITION", "Firmware", "Software stored permanently in ROM or flash memory that controls hardware at a basic level, e.g. the bootloader.");
  b.card("DEFINITION", "Bootloader", "Firmware that runs at switch-on, checks the hardware and loads the operating system from storage into RAM.");
  b.card("CONCEPT", "Layers needed to run an application", "Applications run on the OS → the OS is loaded and run by the firmware (bootloader) → the firmware runs on the hardware.");
  b.card("DEFINITION", "Interrupt", "A signal from hardware or software to the processor that an event needs attention.");
  b.card("DEFINITION", "Interrupt service routine (ISR)", "A short program (part of the OS or a driver) that deals with one particular type of interrupt.");
  b.card("FACT", "Examples of hardware interrupts", "Key pressed, mouse moved or clicked, printer out of paper or buffer empty, disk transfer finished.");
  b.card("FACT", "Examples of software interrupts", "Division by zero; two processes trying to access the same memory location; a program requesting an OS service.");
  b.card("CONCEPT", "Steps in handling an interrupt", "Checked at end of FDE cycle → priority compared → registers saved → ISR run → registers restored → task resumes.");
});
