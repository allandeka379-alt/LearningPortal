// Slice w2a: the central processing unit (comp.hardware.cpu).
import { concept, P, ZIM, CAM } from "../lib.mjs";

concept("comp.hardware.cpu", { file: "hardware/cpu", keyPrefix: "hardware.cpu" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main role of the central processing unit (CPU)?",
    options: [
      ["To process instructions and data so that results can be output", "Correct: the CPU fetches, decodes and executes instructions to process data."],
      ["To store files permanently when the computer is off", "Permanent storage is the job of secondary storage such as a hard disk or SSD."],
      ["To display the results of processing to the user", "Displaying results is the job of an output device such as a screen."],
      ["To convert the user's key presses into electrical signals", "That is done by the keyboard, an input device."],
    ],
    answer: "A",
    explanation: "The CPU processes the instructions and data that are input into the computer, so that the result can be output or stored.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best describes a **microprocessor**?",
    options: [
      ["A CPU made as an integrated circuit on a single chip", "Correct: the whole processor is built on one chip of silicon."],
      ["A very small computer with its own screen and keyboard", "A microprocessor is only the processor, not a whole computer."],
      ["A type of memory that keeps data when the power is off", "That describes non-volatile memory such as ROM or flash memory."],
      ["A program that controls the hardware of a computer", "A program is software; a microprocessor is hardware."],
    ],
    answer: "A",
    explanation: "A microprocessor is a type of integrated circuit: a complete CPU on a single chip.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which part of the CPU decides whether a pupil's mark is greater than or equal to 50?",
    options: [
      ["The arithmetic logic unit (ALU)", "Correct: comparisons are logical operations carried out by the ALU."],
      ["The control unit (CU)", "The CU decodes the instruction and sends control signals, but does not do the comparison itself."],
      ["Main memory", "Main memory holds the mark and the program; it does not process them."],
      ["The clock", "The clock keeps operations in step; it does not compare values."],
    ],
    answer: "A",
    explanation: "The ALU carries out arithmetic (calculations) and logic (comparisons such as `Mark >= 50`).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of the **control unit**?",
    options: [
      ["Sending control signals to co-ordinate the other parts of the computer", "Correct: the CU manages and directs, using control signals."],
      ["Adding two numbers together and storing the answer", "Arithmetic is done by the ALU."],
      ["Holding the program instructions and their data in memory while the program runs", "Programs in use are held in main memory (RAM)."],
      ["Keeping data safe when the power is switched off", "That is done by secondary storage or ROM."],
    ],
    answer: "A",
    explanation: "The control unit decodes instructions and sends control signals so that each instruction is carried out at the right time.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must a program be copied into main memory before the CPU can run it?",
    options: [
      ["The CPU can only directly access instructions held in main memory", "Correct: the CPU fetches instructions and data from main memory, not from secondary storage."],
      ["Main memory keeps the program safe when the power is switched off at night", "Main memory (RAM) is volatile: it loses its contents when the power is off."],
      ["The hard disk cannot store programs, only data", "Hard disks store both programs and data."],
      ["Main memory converts the program into machine code", "Translation is done by a compiler or interpreter, not by memory."],
    ],
    answer: "A",
    explanation: "Primary storage (main memory) is directly accessed by the CPU. Programs on secondary storage are loaded into RAM before they run.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Decide which part *does* the work and which part *directs* it."],
    stem: "A school's timetable program checks 1 200 lessons to find any two that use the same room at the same time. Which part of the CPU carries out these checks?",
    options: [
      ["The ALU, because each check is a comparison", "Correct: comparing room numbers and times are logical operations done in the ALU."],
      ["The control unit, because it controls the timetable", "The CU co-ordinates the instructions but does not compare values."],
      ["Main memory, because it stores all 1 200 lessons", "Memory holds the lessons but cannot compare them."],
      ["The hard disk, because the timetable file is saved there", "Secondary storage only holds the file; the processing happens in the CPU."],
    ],
    answer: "A",
    explanation: "Every check (\"is the room the same? is the time the same?\") is a comparison, which the ALU carries out.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about what a microprocessor makes possible because it is a single, small, cheap chip."],
    stem: "Why can a microprocessor be built into a washing machine as well as a laptop?",
    options: [
      ["It is a single small chip that is cheap to manufacture", "Correct: building the whole CPU on one chip makes it small and cheap enough for everyday devices."],
      ["It does not need any instructions to work", "A microprocessor always follows instructions (a program)."],
      ["It stores all of the washing machine's clothes data permanently", "A processor processes data; it is not permanent storage."],
      ["It only works with water-proof devices", "Microprocessors are used in many kinds of device."],
    ],
    answer: "A",
    explanation: "Because the CPU is one integrated circuit, it is small, cheap and uses little power, so it can be built into many devices.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "In the ZIMSEC syllabus, which three items are grouped together as **processing devices**?",
    options: [
      ["Arithmetic logic unit, control unit and main memory", "Correct: these are the parts that process data."],
      ["Keyboard, optical mouse and barcode scanner", "These are input devices."],
      ["Monitor, printer and speaker", "These are output devices."],
      ["Hard disk drive, optical disc and USB flash drive", "These are secondary storage devices."],
    ],
    answer: "A",
    explanation: "The processing devices are the ALU, the control unit and main memory.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "The control unit carries out arithmetic calculations such as addition.",
    answer: false,
    explanation: "False. Arithmetic is done by the arithmetic logic unit; the control unit decodes instructions and sends control signals.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The tower case that holds the motherboard, drives and power supply of a desktop computer is correctly called the CPU.",
    answer: false,
    explanation: "False. The case is the system unit. The CPU is the processor chip on the motherboard inside it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each task to the part of the computer that carries it out.",
    pairs: [
      ["Subtracting the amount paid from the total", "Arithmetic logic unit"],
      ["Decoding an instruction and sending signals to carry it out", "Control unit"],
      ["Holding the program that is currently running", "Main memory (RAM)"],
      ["Keeping the program file when the computer is switched off", "Secondary storage"],
    ],
    explanation: "ALU: calculations and comparisons. CU: decode and control. RAM: programs and data in use. Secondary storage: files kept when the power is off.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about the CPU.",
    template: "The CPU repeatedly fetches, decodes and {{blank:a}} instructions. Calculations and comparisons are done by the {{blank:b}}. The part that decodes each instruction and sends control signals is the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["executes"], choices: ["executes", "stores", "deletes", "inputs"] },
      { id: "b", accepted: ["ALU"], choices: ["ALU", "control unit", "RAM", "clock"] },
      { id: "c", accepted: ["control unit"], choices: ["control unit", "ALU", "RAM", "hard disk"] },
    ],
    explanation: "Fetch, decode, execute; the ALU calculates and compares; the control unit decodes and controls.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the name of the electronic component, made of millions of transistors on one piece of silicon, that a microprocessor is an example of.",
    accepted: ["integrated circuit", "an integrated circuit", "IC", "chip", "silicon chip", "microchip"],
    wrong: ["transistor", "motherboard"],
    explanation: "A microprocessor is an integrated circuit (a chip): a whole CPU manufactured on one piece of silicon.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["One mark for each part: what it does."],
    stem: "Describe the function of the arithmetic logic unit. [2]",
    points: ["Carries out arithmetic operations / calculations (e.g. addition, subtraction)", "Carries out logical operations / comparisons (e.g. greater than, AND, OR)"],
    modelAnswer: "The ALU performs arithmetic calculations such as addition and subtraction, and logical operations such as comparing two values.",
    explanation: "Arithmetic and logic: both halves are needed for full marks.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Follow one reading from input to output.", "Name the part that does each step."],
    stem: "A greenhouse at a farm near Masvingo has a computer that switches on a heater when the temperature falls below 18 °C. Describe the roles of the control unit, the ALU and main memory when the computer processes one temperature reading. [4]",
    points: [
      "Main memory holds the program and the temperature reading / the set value of 18",
      "The control unit fetches and decodes the instruction(s) to check the temperature",
      "The ALU compares the reading with 18 (a logical operation)",
      "The control unit sends a control signal to switch the heater on if the reading is lower (and continues with the next instruction)",
    ],
    modelAnswer: "The program and the reading are held in main memory. The control unit fetches and decodes the instruction that checks the temperature. The ALU compares the reading with 18. If it is lower, the control unit sends a signal so the heater is switched on.",
    explanation: "Memory holds, CU fetches/decodes/signals, ALU compares.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Use the words fetch, decode and execute.", "ALU: calculate and compare; CU: decode and control."],
    stem: "Tatenda's fuel station in Gweru has a pump with a built-in computer. When a driver pays for fuel, the pump works out how many litres to deliver and stops when that amount has been pumped.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which part of the pump's processor works out the number of litres from the amount paid?", options: [["The arithmetic logic unit", "Correct: this is a calculation."], ["The control unit", "The CU directs the calculation but does not perform it."], ["Main memory", "Memory holds the values."], ["The flow meter", "The flow meter is an input device that measures fuel."]], answer: "A", explanation: "Calculations are done by the ALU." }),
      P.mcq({ label: "(b)", stem: "The processor in the pump is a microprocessor. What is a microprocessor?", options: [["A CPU on a single integrated circuit", "Correct."], ["A small computer with a keyboard", "It is only the processor."], ["A type of read-only memory", "ROM is memory, not a processor."], ["A program stored in the pump", "A program is software."]], answer: "A", explanation: "A microprocessor is a CPU built as an integrated circuit on one chip." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** functions of the control unit in the pump's processor.", points: ["Decodes the instructions of the program (fetched from memory)", "Sends control signals to other components, e.g. to stop the pump / co-ordinates the timing of operations"], modelAnswer: "It decodes each instruction of the pump's program and sends control signals, for example to stop the motor when enough fuel has been delivered." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the ALU is used each time the flow meter sends a new reading.", points: ["The ALU compares the litres delivered so far with the litres paid for", "This decides whether to keep pumping or stop (a logical decision based on the comparison)"], modelAnswer: "Each reading must be compared with the amount paid for; this comparison is a logical operation done by the ALU, and its result decides whether the pump stops." }),
    ],
    explanation: "ALU: the litres calculation and the comparison; CU: decode and send control signals; microprocessor: CPU on one chip.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, applies: ZIM,
    hints: ["Each processing device has one main job."],
    stem: "Nyasha says: \"The CPU is the box under my desk, and it stores all my files.\"",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain **two** errors in Nyasha's statement.", points: ["The box is the system unit; the CPU is the processor chip inside it (on the motherboard)", "Files are stored on secondary storage (hard disk / SSD), not in the CPU"], modelAnswer: "The box is the system unit, not the CPU, which is a chip on the motherboard. Files are kept on secondary storage such as the hard disk; the CPU only processes data." }),
      P.match({ label: "(b)", stem: "Match each processing device to its function.", pairs: [["Arithmetic logic unit", "Performs calculations and comparisons"], ["Control unit", "Decodes instructions and co-ordinates the computer"], ["Main memory", "Holds programs and data currently in use"]], explanation: "ALU: calculate and compare; CU: decode and co-ordinate; main memory: holds what is in use." }),
    ],
    explanation: "System unit is not the CPU; files live on secondary storage; ALU, CU and main memory are the processing devices.",
  });

  b.card("DEFINITION", "**Central processing unit (CPU)**", "The part of a computer that processes the instructions and data input into it so that results can be output or stored.");
  b.card("DEFINITION", "**Microprocessor**", "A CPU made as an integrated circuit on a single chip.");
  b.card("DEFINITION", "**Arithmetic logic unit (ALU)**", "Carries out arithmetic (calculations) and logical operations (comparisons, AND, OR, NOT).");
  b.card("DEFINITION", "**Control unit (CU)**", "Decodes instructions and sends control signals to co-ordinate the other parts of the computer.");
  b.card("DEFINITION", "**Main memory**", "Memory (mainly RAM) holding the programs and data currently in use, directly accessed by the CPU.");
  b.card("CONCEPT", "The cycle the CPU repeats", "Fetch an instruction from main memory → decode it → execute it, billions of times a second.");
  b.card("FACT", "System unit or CPU?", "The case is the system unit; the CPU is the processor chip on the motherboard inside it.");
  b.card("CONCEPT", "Why programs are loaded into RAM", "The CPU can only directly access main memory, so programs are copied from secondary storage into RAM to run.");
  b.card("FACT", "ZIMSEC processing devices", "Arithmetic logic unit, control unit and main memory.", undefined, { applies: ZIM });
});
