// Slice w2a: language translators and IDEs (acs.translation.translators-ide, Cambridge AS).
import { concept, P, chk, same, CAM, py, pyBlock, traceTable, mdTable, codeBlock } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";

concept("acs.translation.translators-ide", { file: "translation/translators-ide", keyPrefix: "translation.translators-ide", applies: CAM }, (b) => {
  // break-even with other figures
  const compile = 20, runC = 0.5, runI = 2.5;
  const n = Math.floor(compile / (runI - runC)) + 1;
  chk(n, 11);
  const compiled20 = compile + runC * 20, interp20 = runI * 20;
  chk(compiled20, 30); chk(interp20, 50);
  // real Python program
  const prog = pyBlock("total = 0\nfor n in range(1, 11):\n    if n % 3 == 0:\n        total = total + n\nprint(total)");
  same(prog.text, "18");
  const pseudo = codeBlock("Total ← 0\nFOR N ← 1 TO 10\n    IF MOD(N, 3) = 0 THEN\n        Total ← Total + N\n    ENDIF\nNEXT N\nOUTPUT Total");
  const w = traceTable(["N", "Total"], { N: 0, Total: 0 }, (s) => { if (s.N === 10) return null; s.N++; if (s.N % 3 === 0) s.Total += s.N; return s; }, { showUnchanged: true });
  const totalAt6 = w.rows[6][1];
  same(totalAt6, "9");
  const watchTable = mdTable(["N", "Total"], w.rows.slice(0, 7).map((r) => [r[0], r[1]]));

  // ---- multiple choice
  mc(b, 2, "RECALL", "Why must a program written in a high-level language be translated?",
    ["The processor can execute only machine code", "Correct."],
    [["High-level programs cannot be stored in main memory", "They can be stored; they simply cannot be executed directly."], ["High-level languages contain no instructions", "They contain instructions in a form people can read."], ["The processor can read only text", "The processor reads binary machine code."]],
    "Only machine code can be executed directly.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which translator produces a complete object code program from a high-level language program?",
    ["A compiler", "Correct."],
    [["An interpreter", "An interpreter executes statements without saving a translated program."], ["A text editor", "An editor does not translate."], ["A linker", "A linker joins object code files; it does not translate source code."]],
    "A compiler translates the whole program before it is run.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is an advantage of an interpreter during the development of a program?",
    ["An error is reported at the statement where it occurs", "Correct."],
    [["The program runs faster than when it has been compiled", "Interpreted programs run more slowly."], ["The source code is hidden from the person using it", "That is a benefit of delivering object code."], ["The whole program has to be free of errors before it can start", "That describes a compiler."]],
    "Interpreters allow quick trial and correction.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why does a software company usually deliver object code rather than source code to its customers?",
    ["It runs without a translator and the source stays private", "Correct."],
    [["Object code is always smaller than any other form of the program", "Size is not the main reason."], ["Source code cannot be read by a computer under any conditions", "The reason concerns privacy and a translator."], ["Customers need to be able to correct the errors themselves", "Customers do not need to change the program."]],
    "Object code needs no translator and does not reveal how the program was written.", { hints: ["What does the customer need in order to run object code?"] });
  mc(b, 3, "UNDERSTANDING", "Why can byte code run on many different types of computer?",
    ["Each computer has a virtual machine to interpret the byte code", "Correct."],
    [["Byte code is machine code for every type of processor made", "It is not machine code for any one processor."], ["Byte code does not need to be translated or interpreted at all", "It is interpreted by the virtual machine."], ["The source code is recompiled again on every computer used", "The byte code is not recompiled."]],
    "The virtual machine hides the differences between processors.", { hints: ["Which program runs the byte code on each computer?"] });
  mc(b, 2, "UNDERSTANDING", "Which IDE feature allows a programmer to stop a program at a chosen line so that the values of the variables can be examined?",
    ["A breakpoint", "Correct."],
    [["Pretty-print", "Pretty-print lays out the code."], ["Dynamic syntax checking", "That underlines errors as they are typed."], ["Collapsing a code block", "That hides lines of code."]],
    "A breakpoint pauses execution at a line.");
  mc(b, 2, "UNDERSTANDING", "What is the purpose of dynamic syntax checking in an IDE?",
    ["It points out syntax errors as the code is typed", "Correct."],
    [["It runs the program one statement at a time under user control", "That is single stepping."], ["It converts the program to machine code", "That is translation."], ["It sets the colour of the keywords", "That is pretty-print."]],
    "Errors are flagged before the program is run.");
  mc(b, 3, "APPLICATION", "A programmer has finished a program that a bank branch will run every day for years. Which translator is the better choice for the final version?",
    ["A compiler, because it translates once and runs faster", "Correct."],
    [["An interpreter, because it hides the source code from users", "An interpreter needs the source code."], ["An assembler, because the program is in a high-level language", "An assembler translates assembly language."], ["No translator, because the bank's processor reads text", "A translator is always needed."]],
    "A program run many times benefits from being translated once.", { hints: ["How many times will the program be run?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "An interpreter produces a file of object code that can be run later without the interpreter.", answer: false,
    explanation: "False. An interpreter executes the statements directly. A compiler produces object code." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A compiler reports the syntax errors in the program after it has tried to translate all of it.", answer: true,
    explanation: "True. Compilation fails if there are syntax errors, and the errors are reported." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each IDE feature to what it does.",
    pairs: [["Single stepping", "Runs the program one statement at a time"], ["Breakpoint", "Pauses the program at a chosen line"], ["Variable report window", "Shows the current values of variables"], ["Pretty-print", "Lays out the code with indentation and colour"], ["Context-sensitive prompt", "Suggests keywords and names as you type"]],
    explanation: "Each feature helps with writing or testing a program." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "An {{blank:a}} translates assembly language into machine code. A {{blank:b}} translates the whole of a high-level program before it runs. An {{blank:c}} translates and executes one statement at a time.",
    blanks: [
      { id: "a", accepted: ["assembler"], choices: ["assembler", "compiler", "interpreter", "editor"] },
      { id: "b", accepted: ["compiler"], choices: ["compiler", "assembler", "interpreter", "debugger"] },
      { id: "c", accepted: ["interpreter"], choices: ["interpreter", "assembler", "compiler", "linker"] },
    ], explanation: "Assembler, compiler, interpreter." });

  // ---- numerical
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Compiled total = compile time + runs × 0.5; interpreted total = runs × 2.5."],
    stem: "Compiling a program takes 20 s. The compiled program takes 0.5 s to run. Interpreting the same program takes 2.5 s each time it is run. What is the smallest number of runs for which compiling and then running is faster overall than interpreting?",
    value: n, wrong: [10, 8], unit: undefined, workedSolution: "1. Compiled: 20 + 0.5n. Interpreted: 2.5n.\n2. Compiling is faster when 20 + 0.5n < 2.5n, so 2n > 20 and n > 10.\n3. The smallest whole number is 11.", explanation: "At 10 runs the totals are equal (25 s); at 11 runs compiling is faster." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the compile time to 20 runs of the compiled program."],
    stem: "Using the figures in the previous question, what is the total time in seconds to compile the program and run it 20 times?",
    value: compiled20, wrong: [50, 10], workedSolution: "1. 20 runs × 0.5 s = 10 s.\n2. Add the compile time: 20 + 10 = 30 s.", explanation: "20 + 20 × 0.5 = 30 s." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Trace the loop: which values of N are exactly divisible by 3?"],
    stem: "This program is run:\n\n" + pseudo + "\n\nWhat is output?",
    value: 18, wrong: [30, 55], workedSolution: "1. The values of N from 1 to 10 divisible by 3 are 3, 6 and 9.\n2. Total = 3 + 6 + 9 = 18.", explanation: "Total is 18." });
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Total changes only when N is divisible by 3."],
    stem: "The program in the previous question is single stepped in an IDE. The variable report window is read after each loop pass. What does it show for `Total` when `N` is 7?",
    value: 9, wrong: [7, 18], workedSolution: "1. Total changes at N = 3 (to 3) and N = 6 (to 9).\n2. At N = 7 it is still 9.", explanation: "Total is 9 until N reaches 9." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the IDE feature that runs a program one statement at a time.", accepted: ["single stepping", "stepping", "step through", "single step"], wrong: ["breakpoint", "pretty-print"], explanation: "Single stepping." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two points about each translator."],
    stem: "Compare a compiler with an interpreter. [4]",
    points: ["A compiler translates the whole program before it is run; an interpreter translates and executes one statement at a time", "A compiled program runs faster / an interpreted program is slower because each statement is translated every time it is run", "A compiler produces object code that can be distributed without the source code; an interpreter needs the source code each time", "An interpreter finds an error at the statement where it occurs, which suits testing; a compiler reports errors after translating the whole program"],
    modelAnswer: "A compiler translates the whole program before it is run, while an interpreter translates and executes one statement at a time. A compiled program runs faster, whereas interpreted statements are translated each time they are run. A compiler produces object code that can be given to users without the source, but an interpreter needs the source each time. An interpreter stops at the statement with the error, which suits testing.",
    explanation: "Four contrasting pairs." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the intermediate code and the program that runs it."],
    stem: "Some languages are partly compiled and partly interpreted. Explain how this works and one benefit. [3]",
    points: ["The source code is compiled to an intermediate code (byte code)", "A virtual machine interprets the byte code on the user's computer", "Benefit: the same byte code runs on any computer that has the virtual machine (portable)"],
    modelAnswer: "The source code is compiled to byte code, which a virtual machine then interprets on the user's computer. The same byte code can run on any computer that has the virtual machine, so it is portable.",
    explanation: "Byte code, virtual machine, portability." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Think about errors found while testing."],
    stem: "A student is learning to program and changes her program many times a day. Explain why an interpreter and an IDE with single stepping are suitable. [4]",
    points: ["An interpreter runs the program straight away after each change, without a separate compile stage", "It reports an error at the statement where it occurs, so errors can be found and corrected quickly", "Single stepping runs one statement at a time", "The variable report window shows how values change, which helps to find logic errors"],
    modelAnswer: "An interpreter runs the program straight after each change and reports an error at the statement where it occurs, so it can be corrected quickly. Single stepping runs one statement at a time and the variable report window shows how the values change, which helps her find logic errors.",
    explanation: "Quick feedback and insight into the program." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Total changes only when N is a multiple of 3."],
    explanation: "A single-stepped trace of the loop gives the values in the report window.",
    stem: "A programmer in Kariba uses an IDE to test this program, written in pseudocode (and also in Python):\n\n" + pseudo + "\n\nShe sets a breakpoint on the `OUTPUT` line and single steps through the loop first. The report window shows these values of `N` and `Total` after each pass:\n\n" + watchTable + "\n\n(only the first six passes are shown).",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of `Total` after the pass where `N` is 6.", value: 9, wrong: [6, 3], workedSolution: "3 + 6 = 9.", explanation: "Total is 9." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value displayed by the program when it ends.", value: 18, wrong: [9, 55], workedSolution: "3 + 6 + 9 = 18.", explanation: "Output is 18." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which IDE feature allows her to see the values of `N` and `Total` while the program is paused?", options: [["A variable report window", "Correct."], ["Pretty-print", "Pretty-print lays out the code."], ["Dynamic syntax checking", "That finds errors as they are typed."], ["Collapsing code blocks", "That hides lines."]], answer: "A", explanation: "The report window shows the values." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the purpose of a breakpoint and of single stepping, and say how the two are used together.", points: ["A breakpoint stops the program at a chosen line", "Single stepping runs one statement at a time", "Set a breakpoint at the section of interest, run to it, then single step through it while watching the variables"], modelAnswer: "A breakpoint stops the program at a chosen line, and single stepping runs one statement at a time. They are used together by running to a breakpoint just before the part of interest and then stepping through it while watching the variables.", explanation: "Each feature, then the way they combine." }),
    ] });
  b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Think about how often each program is run and who uses it."],
    explanation: "Choose the translator to match the use.",
    stem: "A software company in Bulawayo writes a payroll program in a high-level language. It is run by hundreds of customers every week.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which translator should the company use to make the version it sells?", options: [["Compiler", "Correct."], ["Interpreter", "An interpreter would need the source code."], ["Assembler", "The program is not in assembly language."], ["Text editor", "An editor does not translate."]], answer: "A", explanation: "A compiler produces object code." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give two reasons for your choice.", points: ["The object code runs faster because it is already translated", "The source code is not given to the customers / is protected"], modelAnswer: "The object code runs faster because it is already translated, and the company does not have to give the customers its source code.", explanation: "Speed and privacy." }),
      P.manual({ label: "(c)", marks: 3, stem: "The programmers use an interpreter while they are developing the program. Explain why.", points: ["A change can be run immediately without compiling the whole program", "An error is reported at the statement where it occurs", "So the error can be found and corrected quickly / part-finished programs can be tested"], modelAnswer: "A change can be run at once without compiling the whole program, and the interpreter reports an error at the statement where it occurs, so errors can be found and corrected quickly.", explanation: "Quick testing." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Compiler", "A translator that converts the whole of a high-level program to object code before it is run.");
  b.card("DEFINITION", "Interpreter", "A translator that analyses and executes a program one statement at a time without producing a complete translated copy.");
  b.card("DEFINITION", "Assembler", "A translator for assembly language, producing machine code.");
  b.card("DEFINITION", "Source code and object code", "Source code is the program as written; object code is the machine code produced by translating it.");
  b.card("CONCEPT", "Compiler against interpreter", "Compiled: runs faster, source hidden, errors reported after translation. Interpreted: quick to test, errors at the statement, source needed.");
  b.card("CONCEPT", "Partly compiled, partly interpreted", "Source is compiled to byte code, which a virtual machine interprets; portable across computers.");
  b.card("FACT", "IDE features", "Prompts, dynamic syntax checking, pretty-print, collapsing blocks, single stepping, breakpoints, variable and expression report windows.");
  b.card("CONCEPT", "Breakpoint and single stepping", "A breakpoint pauses at a chosen line; single stepping runs one statement at a time; the report window shows the variables.");
  b.card("CONCEPT", "When to use each translator", "Interpreter while developing and testing; compiler for the finished program that is run many times.");
});
