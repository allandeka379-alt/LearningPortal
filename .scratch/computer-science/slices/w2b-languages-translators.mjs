// Slice w2b: programming languages, translators and IDEs (comp.software.languages-translators, Cambridge only).
import { concept, P } from "../lib.mjs";

concept("comp.software.languages-translators", { file: "software/languages-translators", keyPrefix: "software.languages-translators" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which translator converts **assembly language** into machine code?",
    options: [
      ["An assembler", "Correct: an assembler translates mnemonics into machine code."],
      ["A compiler", "A compiler translates a high-level language."],
      ["An interpreter", "An interpreter translates a high-level language line by line."],
      ["An editor", "An editor is used to type code; it does not translate it."],
    ],
    answer: "A",
    explanation: "Assembly language is translated by an assembler; high-level languages by compilers or interpreters.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **mnemonic** in assembly language?",
    options: [
      ["A short code, such as `ADD`, that stands for one machine code instruction", "Correct: mnemonics are easy-to-remember codes for instructions."],
      ["A complete program written in English sentences", "Assembly language is not written in sentences."],
      ["A pattern of binary digits that the processor fetches and executes directly", "That is a machine code instruction."],
      ["An error message that a compiler reports for a line of code", "Error messages are not mnemonics."],
    ],
    answer: "A",
    explanation: "Mnemonics (e.g. `LDA`, `ADD`, `STO`) are memorable codes for machine code instructions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of a **high-level** language over a low-level language?",
    options: [
      ["It is easier to read, write and debug", "Correct: English-like keywords make code easier to understand."],
      ["It allows direct manipulation of the processor's registers", "Direct hardware control is an advantage of low-level languages."],
      ["It never needs to be translated before running", "High-level code must be compiled or interpreted."],
      ["It is written for one specific type of processor", "That describes low-level languages (machine dependent)."],
    ],
    answer: "A",
    explanation: "High-level languages are easier to read, write and debug and are machine independent.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does an **interpreter** report errors?",
    options: [
      ["It stops when it reaches a line with an error and reports that error", "Correct: lines before the error have already been executed."],
      ["It lists every error in the program after translating it all", "That is how a compiler reports errors."],
      ["It corrects every error automatically and carries on", "Translators report errors; they do not fix them."],
      ["It produces an executable file containing the errors", "An interpreter produces no executable file."],
    ],
    answer: "A",
    explanation: "An interpreter translates and runs one line at a time, so it stops at the first error it meets.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a **compiler** produce when it successfully translates a program?",
    options: [
      ["An executable file of machine code", "Correct: it can be run without the compiler or the source code."],
      ["A list of mnemonics", "Mnemonics belong to assembly language."],
      ["The output of the program", "Compiling does not run the program."],
      ["A copy of the source code with comments added", "The compiler does not rewrite the source code."],
    ],
    answer: "A",
    explanation: "A compiler translates the whole program into machine code and saves it as an executable file.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which translator lets you run the program up to the first error straight away?"],
    stem: "Thandeka is still writing and testing her program. Which translator is most useful at this stage, and why?",
    options: [
      ["An interpreter, because it runs the code up to an error so she can fix it and retry", "Correct: interpreters suit development and debugging."],
      ["A compiler, because it makes a single executable file she can share with her classmates", "Useful for the finished program, not while testing small changes."],
      ["An assembler, because it translates high-level languages fastest", "An assembler translates assembly language only."],
      ["No translator, because the processor understands high-level code", "The processor needs machine code."],
    ],
    answer: "A",
    explanation: "An interpreter is mostly used during development; a compiler translates the final program.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Who would be able to read the code if the source were shared?"],
    stem: "A company sells its program to customers. Why does it compile the program instead of supplying it for an interpreter?",
    options: [
      ["Customers get an executable, so the source code stays private and no translator is needed", "Correct: compiled programs protect the source code."],
      ["Compiled programs never contain any logic errors at all when sold", "Compiling finds syntax errors, not every logic error."],
      ["An interpreter cannot run on a customer's computer", "Interpreters run on many computers; the issue is privacy and convenience."],
      ["A compiler translates one line at a time as the program runs, which makes the program run faster", "A compiler translates the whole program at once."],
    ],
    answer: "A",
    explanation: "The executable runs without the source code or a translator and runs faster than interpreted code.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which IDE feature suggests the rest of an identifier as the programmer starts to type it?",
    options: [
      ["Auto-completion", "Correct: it offers the rest of the keyword or name."],
      ["Prettyprint", "Prettyprint formats code with indentation and colour."],
      ["Run-time environment", "This runs the program inside the IDE."],
      ["Error diagnostics", "This highlights and explains errors."],
    ],
    answer: "A",
    explanation: "Auto-completion predicts and offers the rest of a word, reducing typing errors.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Low-level code can control registers and memory directly."],
    stem: "A programmer writes part of a device driver for a new sensor in assembly language. Which reason best explains this choice?",
    options: [
      ["It gives direct control of the hardware and very efficient code", "Correct: low-level code can manipulate registers and memory directly."],
      ["Assembly language is easier to read than a high-level language", "Assembly is harder to read."],
      ["Assembly language runs on every type of processor", "It is machine dependent."],
      ["Assembly language needs no translation at all", "It must be assembled into machine code."],
    ],
    answer: "A",
    explanation: "Low-level languages are chosen for direct hardware manipulation, speed and small memory use.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An interpreter produces an executable file that can be run without the interpreter.",
    answer: false,
    explanation: "False. A compiler produces an executable file; an interpreter translates the code each time it runs, so it is needed every time.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Assembly language is a low-level language.",
    answer: true,
    explanation: "True. Each mnemonic corresponds to one machine code instruction for a particular processor.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each IDE function to its description.",
    pairs: [
      ["Prettyprint", "Formats code with consistent indentation and colour"],
      ["Error diagnostics", "Highlights errors and explains where they are"],
      ["Run-time environment", "Runs the program inside the IDE so it can be tested"],
      ["Auto-correction", "Fixes common mistakes such as misspelt keywords"],
      ["Code editor", "Lets the programmer type and edit the code"],
    ],
    explanation: "Each IDE tool helps the programmer write, run or debug code.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about when translation happens for each translator."],
    stem: "Classify each statement as describing a compiler or an interpreter.",
    pairs: [
      "Translates the whole program before it is run",
      "Stops at the first error it finds",
      "Produces an executable file",
      "Must be present every time the program runs",
      "Gives a report of all errors in the program",
    ],
    right: ["Compiler", "Interpreter"],
    rightIndex: [0, 1, 0, 1, 0],
    explanation: "Compiler: whole program, executable, full error report. Interpreter: line by line, stops at the first error, needed every run.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Instructions in binary that a processor executes directly are called {{blank:a}} code. A language written for one processor's instruction set is described as machine {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["machine"], choices: ["machine", "source", "assembly", "high-level"] },
      { id: "b", accepted: ["dependent"], choices: ["dependent", "independent", "readable", "portable"] },
    ],
    explanation: "Machine code; machine dependent.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the abbreviation for a program that provides a code editor, translator, run-time environment and debugging tools together.",
    accepted: ["IDE", "integrated development environment"],
    wrong: ["ISR", "GUI"],
    explanation: "An integrated development environment (IDE).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["One mark per disadvantage: think about reading, debugging and portability."],
    stem: "Give **two** disadvantages of writing a program in a low-level language. [2]",
    points: [
      "Difficult to read / write / understand (many short instructions)",
      "Difficult to debug / machine dependent (works only on one type of processor)",
    ],
    modelAnswer: "It is hard to read and write, and it is machine dependent, so it only runs on one type of processor.",
    explanation: "Low-level code is hard to read and debug and is not portable.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Write matched pairs: compiler … whereas interpreter …"],
    stem: "Explain **two** differences between a compiler and an interpreter. [4]",
    points: [
      "Compiler translates the whole program before it runs",
      "whereas an interpreter translates and executes one line at a time",
      "Compiler produces an executable file / reports all errors at the end",
      "whereas an interpreter produces no executable file / stops at the first error",
    ],
    modelAnswer: "A compiler translates the whole program before it is run, whereas an interpreter translates and runs it one line at a time. A compiler produces an executable file and reports all the errors at once, whereas an interpreter produces no executable and stops at the first error.",
    explanation: "Two differences, each with both sides, earn four marks.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["The interpreter runs the lines before an error.", "The compiler translates everything first."],
    stem: "Chipo's program has a syntax error on line 4 and another on line 9.\n\n```\n1  OUTPUT \"Exam results\"\n2  INPUT Mark\n3  OUTPUT \"Mark entered\"\n4  IF Mark >= 50 THN\n```\n\n(Lines 5 to 9 are not shown.)",
    parts: [
      P.mcq({ label: "(a)", stem: "Chipo runs the program with an interpreter. Which errors are reported on this run?", options: [["Only the error on line 4", "Correct: the interpreter stops there."], ["Both errors, on lines 4 and 9", "That is what a compiler reports."], ["Only the error on line 9", "Line 4 is reached first."], ["No errors, because interpreters correct them", "Interpreters report errors."]], answer: "A", explanation: "The interpreter stops at the first error." }),
      P.num({ label: "(b)", stem: "How many lines are executed before the interpreter stops?", value: 3, wrong: [4], explanation: "Lines 1, 2 and 3 run; line 4 contains the error.", workedSolution: "1. Lines 1, 2 and 3 have no errors, so each is translated and executed.\n2. Line 4 contains the error, so the interpreter stops there: 3 lines executed." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe what happens if Chipo uses a compiler instead.", points: ["The whole program is translated before anything runs, so no lines are executed", "An error report lists both errors (lines 4 and 9) and no executable file is produced"], modelAnswer: "The compiler translates the whole program first, so nothing runs; it reports both errors in one report and does not produce an executable." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe **two** IDE features that would help Chipo find and fix such errors.", points: ["Error diagnostics: highlights / underlines errors and explains them", "Auto-correction / auto-completion: corrects or completes misspelt keywords such as THN"], modelAnswer: "Error diagnostics would highlight line 4 and explain the error; auto-correction would change THN to THEN." }),
    ],
    explanation: "Interpreter: stops at line 4 after running lines 1-3. Compiler: reports both errors and runs nothing.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["High-level: readable, portable. Low-level: hardware control.", "An assembler translates mnemonics."],
    stem: "A team in Harare is writing software for a new digital weighing scale used at markets.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "The menus and price calculations are written in a high-level language. Give **two** reasons.", points: ["Easier to read / write / understand, so faster to develop", "Easier to debug / machine independent (can be moved to other processors)"], modelAnswer: "High-level code is easier to write and understand, and easier to debug." }),
      P.manual({ label: "(b)", marks: 2, stem: "The code that reads the load sensor directly is written in assembly language. Explain why.", points: ["Allows direct manipulation of hardware / registers / memory locations", "Code is fast / efficient / uses little memory (important in an embedded device)"], modelAnswer: "Assembly gives direct control of the sensor hardware and registers, and produces fast, compact code suited to the small processor." }),
      P.mcq({ label: "(c)", stem: "Which translator converts the assembly code?", options: [["Assembler", "Correct."], ["Compiler", "Compilers translate high-level code."], ["Interpreter", "Interpreters translate high-level code."], ["Prettyprint", "This formats code."]], answer: "A", explanation: "Assemblers translate assembly language." }),
      P.tf({ label: "(d)", stem: "True or false: the finished high-level code should be compiled so that the scale does not need a translator.", answer: true, explanation: "True: the executable runs without a translator." }),
    ],
    explanation: "High-level for readability; assembly for direct hardware control; assembler; compile the final version.",
  });

  b.card("DEFINITION", "High-level language", "English-like, machine independent language; easy to read, write and debug; must be compiled or interpreted.");
  b.card("DEFINITION", "Low-level language", "Machine code or assembly language; relates to one processor's instruction set; allows direct hardware control.");
  b.card("DEFINITION", "Assembly language", "Low-level language using mnemonics (e.g. LDA, ADD), each standing for one machine code instruction; translated by an assembler.");
  b.card("DEFINITION", "Compiler", "Translates the whole high-level program at once before it runs, producing an executable file; reports all errors together.");
  b.card("DEFINITION", "Interpreter", "Translates and executes one line at a time; no executable file; stops at the first error.");
  b.card("CONCEPT", "When is each translator used?", "Interpreter: during development and debugging. Compiler: for the finished program (fast executable, source code private, no translator needed).");
  b.card("CONCEPT", "Advantages of low-level languages", "Direct manipulation of hardware (registers, memory); fast, efficient code using little memory.");
  b.card("FACT", "Functions of an IDE", "Code editor, run-time environment, translator, error diagnostics, auto-completion, auto-correction, prettyprint.");
  b.card("CONCEPT", "Prettyprint", "IDE feature that formats code with consistent indentation and colour-coded keywords to make it easier to read.");
});
