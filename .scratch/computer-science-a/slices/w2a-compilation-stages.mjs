// Slice w2a: stages of compilation (acs.translation.compilation-stages, Cambridge A Level).
import { concept, P, chk, same, CAM, mdTable, codeBlock } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";
import { tokenise, tokenTable, parseExpr, treeLines, threeAddress, fold, show } from "../tables/w2a-compiler.mjs";

const exprOf = (line) => { const t = tokenise(line); return { toks: t, tree: parseExpr(t.slice(2).map((x) => x.text)), target: t[0].text }; };

concept("acs.translation.compilation-stages", { file: "translation/compilation-stages", keyPrefix: "translation.compilation-stages", applies: CAM }, (b) => {
  const A = exprOf("Wage ← Hours * Rate - Tax / 2");
  const tacA = threeAddress(A.tree, A.target);
  chk(A.toks.length, 9); chk(tacA.length, 4);
  const D = exprOf("Days ← 7 * 24 * 60");
  chk(+fold(D.tree).leaf, 10080);
  const C = exprOf("Area ← 2 * 8 + Width * 3");
  same(show(fold(C.tree)), "(16 + (Width * 3))");
  const E = exprOf("Count ← Count + 1  // add one");
  chk(E.toks.length, 5);
  const N = exprOf("Net ← (Gross - Tax) * 0.9");
  const treeN = codeBlock(treeLines(N.tree).join("\n"));
  same(treeLines(N.tree)[0], "*");
  chk(N.toks.length, 9); // brackets are tokens
  const calls = []; const fact = (n, d) => { calls.push(d); return n <= 1 ? 1 : n * fact(n - 1, d + 1); };
  chk(fact(5, 1), 120); chk(Math.max(...calls), 5);

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which stage of compilation removes comments and white space from the source code?",
    ["Lexical analysis", "Correct: it groups the characters into tokens and discards what is not needed."],
    [["Syntax analysis", "That checks the grammar using the tokens."], ["Code generation", "That produces the object or intermediate code."], ["Optimisation", "That improves the generated code."]],
    "Lexical analysis strips comments and white space and produces tokens.", { daily: true });
  mc(b, 2, "RECALL", "What is produced by syntax analysis?",
    ["A parse tree", "Correct: it shows how the statement is built from its parts."],
    [["A list of tokens", "Tokens come from lexical analysis."], ["Machine code", "That is produced by code generation."], ["A symbol table of the CPU registers", "The symbol table lists identifiers in the program."]],
    "The syntax analyser checks the tokens against the grammar and builds a parse tree.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the symbol table contain?",
    ["Each identifier in the program and its type", "Correct."],
    [["The machine code produced for each statement", "That is the object code."], ["The comments that the programmer wrote in the program", "Comments are removed."], ["The order in which the operators are applied", "That is shown by the parse tree."]],
    "It records the variables, constants and subroutines named in the program.");
  mc(b, 3, "UNDERSTANDING", "What is the main benefit of generating intermediate code before the final code?",
    ["It is independent of the processor and easier to optimise", "Correct."],
    [["It lets the program run directly on the processor without translation", "It must still be translated."], ["It removes the need for lexical analysis and syntax analysis", "The earlier stages are still needed."], ["It is always faster to execute than the final machine code", "Machine code is the final form."]],
    "Intermediate code is simple and portable.", { hints: ["Think about producing code for several types of processor."] });
  mc(b, 3, "APPLICATION", "A statement contains the expression 5 * 6 * 2, all constants. Which optimisation can the compiler apply?",
    ["Constant folding", "Correct: the compiler works out 60 once."],
    [["Removing redundant code", "No code is unreachable here."], ["Lexical analysis", "That is a stage, not an optimisation."], ["Recursion", "No subroutine calls itself."]],
    "A constant expression can be evaluated at compile time.", { hints: ["Are all the values known when the program is compiled?"] });
  mc(b, 3, "ANALYSIS", "A programmer writes IF X > 3 THEN with the THEN left out. At which stage is the error found?",
    ["Syntax analysis", "Correct: the tokens do not follow the grammar of an IF statement."],
    [["Lexical analysis", "Each token is valid by itself."], ["Optimisation", "Optimisation comes after code generation."], ["While the program is running", "A compiler finds this before running."]],
    "A break in the grammar is a syntax error.", { hints: ["Is each word valid by itself?"] });
  mc(b, 2, "UNDERSTANDING", "How does an interpreter execute a statement that is inside a loop 100 times?",
    ["It analyses and executes the statement each time round the loop", "Correct."],
    [["It translates the statement once and saves the machine code for later use", "That is what a compiler does."], ["It executes it once and copies the result 99 times", "Each pass is executed."], ["It refuses to run loops", "Loops are run normally."]],
    "That is why interpreted programs are slower.");
  mc(b, 3, "UNDERSTANDING", "Why does a compiler use a stack when it translates a recursive subroutine?",
    ["Each call needs its own parameters, locals and return address", "Correct."],
    [["A stack makes the subroutine run once only, however often it is called", "The stack lets it run many times."], ["The stack stores the source code of the subroutine for the user", "The stack holds the data for each call."], ["Recursion is not possible unless a hard disk is installed", "The stack is in main memory."]],
    "A stack frame is pushed for each call and popped on return.", { hints: ["What must be remembered for each separate call?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Optimisation may change the result that a program produces.", answer: false,
    explanation: "False. Optimisation makes the code faster or smaller but the program must give the same results." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Comments in the source code are removed during lexical analysis.", answer: true,
    explanation: "True. They are meaningless to the processor and are discarded with the white space." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each stage to its output.",
    pairs: [["Lexical analysis", "Tokens and the symbol table"], ["Syntax analysis", "A parse tree, or syntax error messages"], ["Code generation", "Object code or intermediate code"], ["Optimisation", "Faster or smaller code with the same result"]],
    explanation: "Each stage has its own input and output." });
  b.fib({ d: 3, skill: "UNDERSTANDING", hints: ["Which stage produces tokens, and which builds a tree?"], stem: "Complete the description of compilation.",
    template: "The lexical analyser produces {{blank:a}}. The syntax analyser builds a parse {{blank:b}}. Working out 60 × 60 at compile time is called constant {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["tokens"], choices: ["tokens", "errors", "loops", "frames"] },
      { id: "b", accepted: ["tree"], choices: ["tree", "table", "stack", "queue"] },
      { id: "c", accepted: ["folding"], choices: ["folding", "recursion", "generation", "pruning"] },
    ], explanation: "Tokens, tree, folding." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Operators, brackets, identifiers, numbers and the assignment symbol are all tokens; the comment is not."],
    stem: "The statement below is analysed by the lexical analyser. How many tokens does it produce?\n\n" + codeBlock(A.toks.map((t) => t.text).join(" ")),
    value: A.toks.length, wrong: [8, 4], workedSolution: "1. Wage, ←, Hours, *, Rate, -, Tax, /, 2.\n2. That is 9 tokens.", explanation: "Nine tokens." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["The comment is removed during lexical analysis."],
    stem: "How many tokens does the lexical analyser produce from the line `Count ← Count + 1  // add one`?",
    value: E.toks.length, wrong: [8, 6], workedSolution: "1. The comment is removed.\n2. Tokens: Count, ←, Count, +, 1.\n3. That is 5 tokens.", explanation: "Five tokens, because the comment is discarded." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Each operator gives one line of intermediate code, and there is one more line for the assignment."],
    stem: "A compiler turns `Wage ← Hours * Rate - Tax / 2` into intermediate code in which each line has at most one operator. How many lines of intermediate code are produced?",
    value: tacA.length, wrong: [3, 2], workedSolution: "1. " + tacA.join("; ") + "\n2. That is 4 lines (3 operators and the final assignment).", explanation: "Three operations plus the assignment: 4 lines." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Work out the multiplications from left to right."], stem: "A compiler applies constant folding to `Days ← 7 * 24 * 60`. What value does it put in the generated code?",
    value: 10080, wrong: [1008, 168], workedSolution: "1. 7 × 24 = 168.\n2. 168 × 60 = 10 080.", explanation: "7 × 24 × 60 = 10 080." });
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Each call is pushed before the previous one returns."],
    stem: "The recursive function `Fact(5)` calls `Fact(4)`, which calls `Fact(3)` and so on down to `Fact(1)`, which does not call itself. What is the greatest number of stack frames in use at one time?",
    value: 5, wrong: [4, 6], workedSolution: "1. The calls Fact(5), Fact(4), Fact(3), Fact(2), Fact(1) are all active when Fact(1) is running.\n2. That is 5 frames.", explanation: "Five frames at the deepest point." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Four stages, one mark for each stage with its output."],
    stem: "Describe the four stages of compilation. [4]",
    points: ["Lexical analysis: removes comments and white space, produces tokens and builds the symbol table", "Syntax analysis: checks the tokens against the grammar, reports syntax errors and builds the parse tree", "Code generation: produces object code or intermediate code from the parse tree", "Optimisation: improves the code so it is faster or smaller without changing the result"],
    modelAnswer: "Lexical analysis removes comments and white space, creates tokens and builds the symbol table. Syntax analysis checks the tokens against the grammar and builds a parse tree, reporting syntax errors. Code generation produces object or intermediate code from the tree. Optimisation makes the code faster or smaller without changing its result.",
    explanation: "One mark per stage." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What is stored for each call?"],
    stem: "Explain how a compiler produces code that handles a recursive function. [3]",
    points: ["A stack is used", "Each call pushes a frame holding its parameters, local variables and return address", "The frame is removed (popped) when the call returns, so the earlier call can continue"],
    modelAnswer: "The code uses a stack. Each call pushes a frame holding its parameters, local variables and return address, and the frame is popped when the call returns so that the earlier call can continue.",
    explanation: "Stack, frame contents, pop." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Compare what happens each time the statement is reached."],
    stem: "A statement inside a loop is executed 5000 times. Explain why a compiled program is likely to run faster than an interpreted one. [3]",
    points: ["The compiled program was translated once, before it was run", "The interpreter analyses and translates the statement again on each of the 5000 passes", "So the interpreted program spends extra time translating"],
    modelAnswer: "The compiled program is translated once before it is run, but an interpreter analyses and translates the statement again on every one of the 5000 passes, so it spends extra time translating.",
    explanation: "Translate once against translate every time." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Brackets are tokens; the multiplication is the last operation applied."],
    explanation: "Tokens, parse tree and intermediate code for the statement.",
    stem: "A compiler translates the statement\n\n" + codeBlock("Net ← (Gross - Tax) * 0.9") + "\nThe parse tree of the expression to the right of the arrow is:\n\n" + treeN,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many tokens does the lexical analyser produce for the statement?", value: N.toks.length + 0, wrong: [7, 5], workedSolution: "Net, ←, (, Gross, -, Tax, ), *, 0.9: the brackets are tokens too. That is 9.", explanation: "Nine tokens including both brackets." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which operator is applied last?", options: [["Multiplication", "Correct: it is the root of the tree."], ["Subtraction", "Subtraction is lower in the tree, so it is applied first."], ["Assignment", "The assignment is separate from the expression."], ["Both at the same time", "They are in order."]], answer: "A", explanation: "The root of the tree is the last operation." }),
      P.fib({ label: "(c)", marks: 2, stem: "Complete the intermediate code.", template: "T1 ← Gross {{blank:a}} Tax\n\nT2 ← T1 {{blank:b}} 0.9\n\nNet ← {{blank:c}}", blanks: [{ id: "a", accepted: ["-"], choices: ["-", "+", "*", "/"] }, { id: "b", accepted: ["*"], choices: ["*", "+", "-", "/"] }, { id: "c", accepted: ["T2"], choices: ["T1", "T2", "Net", "Tax"] }], wrong: [["+", "+", "T1"]], explanation: "Subtract first, then multiply, then assign T2." }),
      P.manual({ label: "(d)", marks: 2, stem: "State the stage at which the compiler would find that the closing bracket had been left out, and say why.", points: ["Syntax analysis", "The tokens would not match the grammar (the brackets would not be balanced)"], modelAnswer: "Syntax analysis, because the tokens would not match the grammar: the brackets would not be balanced.", explanation: "A grammar rule is broken." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Which values are known at compile time?"],
    explanation: "Constant folding evaluates the constant part once.",
    stem: "A compiler is optimising this statement:\n\n" + codeBlock("Area ← 2 * 8 + Width * 3"),
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which part of the expression can be worked out by the compiler?", options: [["2 * 8", "Correct: both values are constants."], ["Width * 3", "Width is a variable, so it is not known."], ["The whole expression", "It contains a variable."], ["Nothing", "2 * 8 is constant."]], answer: "A", explanation: "2 × 8 is constant." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value that replaces 2 * 8 in the generated code.", value: 16, wrong: [10, 28], workedSolution: "2 × 8 = 16.", explanation: "16." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain one benefit of the optimisation.", points: ["The multiplication does not have to be carried out every time the statement is run", "The program runs faster / takes less time"], modelAnswer: "The multiplication 2 * 8 is not carried out every time the statement is run, so the program runs faster.", explanation: "Work done once at compile time." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Token", "The smallest meaningful item of a program: a keyword, identifier, number or operator.");
  b.card("FACT", "Lexical analysis", "Removes comments and white space, produces tokens and builds the symbol table.");
  b.card("FACT", "Syntax analysis", "Checks tokens against the grammar, builds the parse tree and reports syntax errors.");
  b.card("FACT", "Code generation", "Produces object code, or intermediate code, from the parse tree.");
  b.card("FACT", "Optimisation", "Makes code smaller or faster without changing the result, for example by constant folding or removing unreachable code.");
  b.card("DEFINITION", "Symbol table", "A table of the identifiers in a program with their types and other information.");
  b.card("DEFINITION", "Intermediate code", "Simple, processor-independent code between source and machine code; easier to optimise and translate.");
  b.card("CONCEPT", "Constant folding", "The compiler evaluates an expression of constants once, for example 60 * 60 * 24 becomes 86400.");
  b.card("CONCEPT", "Compiling recursion", "A stack holds a frame (parameters, locals, return address) for each call; frames are popped as calls return.");
});
