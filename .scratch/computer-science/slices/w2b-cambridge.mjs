// Slice w2b: Cambridge 0478 Paper 1 exam-format items (STRUCTURED, 15 marks, ANALYSIS, Cambridge only).
import { concept, P, CAM } from "../lib.mjs";

const C = (k) => `comp.${k}`;

concept(C("software.interrupts-firmware"), { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350, calculator: false,
    concepts: [C("software.system-application"), C("software.operating-systems"), C("software.interrupts-firmware"), C("software.languages-translators")],
    hints: ["Interrupts: check, save, ISR, restore.", "Compiler: whole program, executable. Interpreter: line by line, stops at first error."],
    stem: "Tendai uses a laptop to write programs for his school's computer club in Harare.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the difference between system software and application software. Give an example of each.", points: ["System software provides the services the computer needs, e.g. operating system / utility", "Application software provides the services the user needs, e.g. word processor / spreadsheet / browser"], modelAnswer: "System software, such as the operating system, provides the services the computer needs; application software, such as a spreadsheet, provides the services the user needs." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe **three** functions of an operating system.", points: ["A named function with a description (e.g. managing memory: allocates RAM to processes)", "A second (e.g. managing peripherals and drivers / managing files)", "A third (e.g. multitasking / handling interrupts / security / user accounts / interface / platform for applications)"], modelAnswer: "It manages memory by allocating RAM to each process; it manages peripherals through their drivers; and it provides security through user accounts and passwords." }),
      P.match({ label: "(c)", stem: "Classify each event as a hardware interrupt or a software interrupt.", pairs: ["Tendai moves the mouse", "His program divides a number by zero", "The printer runs out of paper", "Two processes try to access the same memory location"], right: ["Hardware interrupt", "Software interrupt"], rightIndex: [0, 1, 0, 1], explanation: "Devices: hardware; programs: software." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how the processor handles an interrupt.", points: ["At the end of the current FDE cycle the processor checks for interrupts / compares priority", "The current state (register contents) is saved and the interrupt service routine for the source is run", "The saved state is restored and the interrupted task continues"], modelAnswer: "After the current fetch-decode-execute cycle the processor checks for an interrupt with a higher priority. It saves its register contents, runs the matching interrupt service routine, then restores the registers and continues the task." }),
      P.mcq({ label: "(e)", stem: "Tendai's translator stops at the first line containing an error. Which translator is it?", options: [["An interpreter", "Correct."], ["A compiler", "Reports all errors after translating the whole program."], ["An assembler", "Translates assembly language."], ["A code editor", "Not a translator."]], answer: "A", explanation: "Interpreters translate and run line by line." }),
      P.mcq({ label: "(f)", stem: "Which IDE function formats his code with consistent indentation and colour?", options: [["Prettyprint", "Correct."], ["Auto-completion", "Suggests the rest of a word."], ["Run-time environment", "Runs the program."], ["Error diagnostics", "Highlights errors."]], answer: "A", explanation: "Prettyprint." }),
      P.tf({ label: "(g)", stem: "True or false: a compiler produces an executable file that can run without the compiler.", answer: true, explanation: "True." }),
    ],
    explanation: "(c) hardware, software, hardware, software; (e) interpreter; (f) prettyprint; (g) true.",
  });

  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350, calculator: false,
    concepts: [C("emerging.automated-systems"), C("emerging.robotics"), C("emerging.artificial-intelligence")],
    hints: ["Sensor → ADC → microprocessor compares with stored value → actuator → repeat.", "Robot: structure, electrical components, programmable."],
    stem: "A large citrus estate near Mazowe uses an automated irrigation system, fruit-picking robots and an expert system.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how sensors, a microprocessor and actuators work together to water the orchards.", points: ["Moisture sensors take readings continuously; an ADC converts them to digital", "The microprocessor compares each reading with a stored (minimum) value", "If below the value, a signal is sent to an actuator (pump / valve) to start watering; stopped when the stored value is reached", "The process repeats continuously"], modelAnswer: "Moisture sensors take readings, which an ADC converts to digital. The microprocessor compares each with the stored minimum; if it is lower, it signals the actuator to open the valve, and closes it when the soil is moist enough. This repeats continuously." }),
      P.mcq({ label: "(b)", stem: "Which component is an actuator in the irrigation system?", options: [["The motor that opens the valve", "Correct."], ["The moisture sensor", "Input device."], ["The microprocessor", "Processing."], ["The stored minimum value", "Data, not a device."]], answer: "A", explanation: "Actuators produce movement." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of the automated irrigation system for the estate.", points: ["Advantage: waters only when needed, saving water / works day and night / responds faster than workers", "Disadvantage: expensive to install and maintain / faulty sensor could over- or under-water"], modelAnswer: "It waters only when needed, saving water, but a faulty sensor could leave trees dry." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the characteristics of the fruit-picking robot that make it a robot.", points: ["Mechanical structure / framework (e.g. arm, gripper, wheels)", "Electrical components: sensors (e.g. camera), microprocessor and actuators (motors)", "Programmable (can be programmed / reprogrammed for different tasks)"], modelAnswer: "It has a mechanical structure (an arm with a gripper on wheels), electrical components (a camera to find fruit, a microprocessor and motors) and it is programmable." }),
      P.match({ label: "(e)", stem: "The estate's expert system diagnoses citrus diseases. Match each component to its role.", pairs: [["Knowledge base", "Stores facts about citrus diseases"], ["Rule base", "Holds the IF … THEN rules"], ["Inference engine", "Applies the rules to the answers to reach a conclusion"], ["Interface", "Asks questions and displays the diagnosis and explanation"]], explanation: "Facts, rules, reasoning, communication." }),
      P.mcq({ label: "(f)", stem: "The estate's yield-prediction program becomes more accurate each season as it adapts its own data. What is this?", options: [["Machine learning", "Correct."], ["An expert system", "Fixed rules."], ["Robotics", "No robot involved."], ["An interrupt", "Not related."]], answer: "A", explanation: "Machine learning adapts its own processes or data." }),
    ],
    explanation: "(b) the valve motor; (e) knowledge base facts, rule base rules, inference engine reasons, interface communicates; (f) machine learning.",
  });
});
