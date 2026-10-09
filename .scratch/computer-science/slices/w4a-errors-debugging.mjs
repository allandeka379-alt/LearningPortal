// Slice w4a: finding and correcting errors (comp.algorithms.errors-debugging). Faulty outputs come from JS mirrors.
import { concept, P } from "../lib.mjs";
import { fence, sum } from "./w4a-0-kit.mjs";

// Faulty totalling: Total ← Number.
const insF = [12, 30, 18, 20];
const faultyAvg = insF.at(-1) / 4;
const rightAvg = sum(insF) / 4;
// Faulty count: Over ← Price + 1.
const pricesE = [35, 72, 50, 64, 18, 90, 41, 55, 27, 60];
const faultyOver = (() => {
  let over = 0;
  for (const p of pricesE) if (p > 50) over = p + 1;
  return over;
})();
const rightOver = pricesE.filter((p) => p > 50).length;
const faultyTotal = 1 + sum(pricesE);
const rightTotal = sum(pricesE);
const codeE = `1   Total ← 1
2   Over ← 0
3   FOR Item ← 1 TO 10
4       INPUT Price
5       Total ← Total + Price
6       IF Price > 50
7           THEN
8               Over ← Price + 1
9       ENDIF
10  NEXT Item
11  OUTPUT Total, " ", Over`;

// Struct 2: array index out of range + wrong comparison.
const codeR = `1   DECLARE Scores : ARRAY[1:10] OF INTEGER
2   DECLARE Lowest : INTEGER
3   DECLARE Index : INTEGER
4   Lowest ← Scores[1]
5   FOR Index ← 2 TO 11
6       IF Scores[Index] > Lowest
7           THEN
8               Lowest ← Scores[Index]
9       ENDIF
10  NEXT Index
11  OUTPUT "Lowest score: ", Lowest`;

concept("comp.algorithms.errors-debugging", { file: "algorithms/errors-debugging", keyPrefix: "algorithms.errors-debugging" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **syntax error**?",
    options: [
      ["An error that breaks the grammar rules of the programming language", "Correct: the translator cannot translate it."],
      ["An error that lets the program run but makes it give the wrong answer", "That is a logic error."],
      ["An error that makes a running program crash", "That is a run-time error."],
      ["An error made by the user when typing input data", "That is a data entry error, caught by validation."],
    ],
    answer: "A",
    explanation: "A syntax error, such as a misspelt keyword or a missing ENDIF, is reported by the compiler or interpreter.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A program runs without stopping but always outputs the wrong total. What type of error does it contain?",
    options: [
      ["Logic error", "Correct: it runs, but the algorithm is wrong."],
      ["Syntax error", "A syntax error would stop the program being translated and run."],
      ["Run-time error", "A run-time error makes the program crash."],
      ["Transmission error", "That is an error in data sent over a network."],
    ],
    answer: "A",
    explanation: "Logic errors give wrong results with no warning; they are found by testing with known results.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these causes a **run-time** error?",
    options: [
      ["Dividing a total by a count that is zero", "Correct: division by zero crashes the program while it runs."],
      ["Spelling `OUTPUT` as `OUPUT`", "That is a syntax error."],
      ["Using `<` where `>` was needed in a condition", "That is a logic error."],
      ["Leaving out a comment", "Comments do not affect how a program runs."],
    ],
    answer: "A",
    explanation: "Run-time errors happen during execution: division by zero, an index out of range, a missing file.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each error.",
    pairs: [
      "An `IF` statement has no `ENDIF`",
      "`Count ← Count - 1` was written instead of `Count ← Count + 1`",
      "The program reads `Marks[31]` from an array declared as `ARRAY[1:30]`",
      "The keyword `WHILE` is typed as `WHIEL`",
    ],
    right: ["Syntax error", "Logic error", "Run-time error"],
    rightIndex: [0, 1, 2, 0],
    explanation: "Grammar mistakes are syntax errors; a wrong but valid statement is a logic error; reading past the end of an array crashes at run time.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A program that contains a logic error cannot be run.",
    answer: false,
    explanation: "False. A program with a logic error runs, but gives wrong results. A syntax error stops a program from being translated and run.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Syntax errors are reported by the compiler or interpreter when the program is translated.",
    answer: true,
    explanation: "True. The translator checks the code against the language's rules and reports the line of each syntax error.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `State the line number of the syntax error.\n\n${fence(`1  INPUT Score\n2  IF Score >= 50\n3      THEN\n4          OUPTUT "Pass"\n5      ELSE\n6          OUTPUT "Fail"\n7  ENDIF`)}`,
    value: 4,
    wrong: [2],
    explanation: "Line 4 misspells the keyword OUTPUT.",
    workedSolution: "1. Check each keyword.\n2. Line 4 has OUPTUT; it should be OUTPUT.",
  });
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    hints: ["Trace Total: what does it hold after each input?"],
    stem: `This algorithm should output the average of four numbers. The inputs are ${insF.join(", ")}.\n\n${fence(`Total ← 0\nFOR Count ← 1 TO 4\n    INPUT Number\n    Total ← Number\nNEXT Count\nOUTPUT Total / 4`)}\n\nWhat does it actually output?`,
    value: faultyAvg,
    wrong: [rightAvg],
    explanation: `\`Total ← Number\` replaces the total each time, so Total ends as ${insF.at(-1)} and ${insF.at(-1)} ÷ 4 = ${faultyAvg}. The correct output would be ${rightAvg}; the fix is \`Total ← Total + Number\`.`,
    workedSolution: `1. Total after each input: ${insF.join(", ")}.\n2. Output ${insF.at(-1)} / 4 = ${faultyAvg}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What changes Count inside the loop?"],
    stem: `What happens when this algorithm runs?\n\n${fence(`Count ← 1\nWHILE Count <= 5 DO\n    OUTPUT Count * 2\nENDWHILE`)}`,
    options: [
      ["It outputs 2 for ever, because Count never changes", "Correct: an infinite loop, a logic error."],
      ["It outputs 2, 4, 6, 8 and 10 and then stops", "That needs Count ← Count + 1 inside the loop."],
      ["It reports a syntax error and does not run", "Every statement is valid pseudocode."],
      ["It outputs nothing, because the condition is false at the start", "1 <= 5 is true, so the loop runs."],
    ],
    answer: "A",
    explanation: "The loop condition never becomes false because Count is not updated; add `Count ← Count + 1` inside the loop.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Should equal values count as a pass?"],
    stem: "This algorithm should output \"Pass\" for marks of 50 **or more**.\n\n```\n1  INPUT Mark\n2  IF Mark > 50\n3      THEN\n4          OUTPUT \"Pass\"\n5      ELSE\n6          OUTPUT \"Fail\"\n7  ENDIF\n```",
    template: "The error is on line {{blank:a}}. The corrected line is `IF Mark {{blank:b}} 50`.",
    blanks: [
      { id: "a", accepted: ["2"], input: "number", wrong: "4" },
      { id: "b", accepted: [">="], choices: [">=", ">", "<=", "<>"] },
    ],
    explanation: "With > a mark of exactly 50 fails; line 2 should be `IF Mark >= 50`. This is a logic error.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a **breakpoint** do when debugging?",
    options: [
      ["It pauses the program at a chosen line so values can be inspected", "Correct."],
      ["It stops the program permanently as soon as any error is found in it", "A breakpoint is a deliberate, temporary pause."],
      ["It splits a long program into separate modules", "That is decomposition."],
      ["It corrects syntax errors automatically", "It does not change the code."],
    ],
    answer: "A",
    explanation: "A breakpoint, set in an IDE, pauses execution at a line so the programmer can check variable values there.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which errors give no message at all?"],
    stem: "Why is a trace table especially useful for finding **logic** errors?",
    options: [
      ["It shows every value, so you see where results go wrong", "Correct."],
      ["It lists the syntax errors with their line numbers", "That is what the translator's error diagnostics do."],
      ["It stops the program from crashing while it runs", "A trace is done by hand; it does not change the program."],
      ["It translates the algorithm into program code", "A trace table does not translate anything."],
    ],
    answer: "A",
    explanation: "A logic error gives no warning, so the programmer must follow the values step by step to see where they first differ from what was expected.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What is the last index the loop uses?"],
    stem: `What type of error does this contain?\n\n${fence(`DECLARE Names : ARRAY[1:25] OF STRING\nFOR Index ← 1 TO 26\n    OUTPUT Names[Index]\nNEXT Index`)}`,
    options: [
      ["A run-time error, because index 26 does not exist", "Correct: the array only has positions 1 to 25."],
      ["A syntax error, because the FOR loop is written wrongly", "The loop is written correctly; its limit is wrong."],
      ["A logic error that just outputs one name too few", "It tries to output one more name than exists."],
      ["No error: arrays grow to fit the index used", "Arrays have fixed bounds set in the declaration."],
    ],
    answer: "A",
    explanation: "On the last pass Names[26] is read, which is outside the declared bounds, so the program stops with an index-out-of-range error. The loop should go to 25.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What happens if no values were entered?"],
    stem: "Which change best prevents a run-time error in `Average ← Total / Count`?",
    options: [
      ["Only divide when `Count > 0`, otherwise output a message", "Correct: this avoids division by zero."],
      ["Change the line to `Average ← Total * Count` so it never divides", "That calculates something different."],
      ["Initialise `Total` to 1 instead of 0", "That makes the total wrong and does not stop the crash."],
      ["Use `Average ← Count / Total` instead", "That is the wrong calculation and Total could also be 0."],
    ],
    answer: "A",
    explanation: "Checking the divisor before dividing is simple error handling that prevents a division-by-zero crash.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Check the starting value of the total.", "What should Over count?"],
    stem: `This algorithm should input the prices of 10 items, then output the total of all the prices and the number of prices over 50. Identify the **two** errors, giving the line numbers, and write the corrected lines.\n\n${fence(codeE)}`,
    points: [
      "Line 1: the total starts at 1 instead of 0",
      "Corrected line 1: Total ← 0",
      "Line 8: Over is set to the price plus 1 instead of being increased by 1",
      "Corrected line 8: Over ← Over + 1",
    ],
    explanation: `With the test prices ${pricesE.join(", ")} the faulty version outputs ${faultyTotal} and ${faultyOver}; the corrected one outputs ${rightTotal} and ${rightOver}.`,
    modelAnswer: "Line 1 should be `Total ← 0`, because starting at 1 adds one too many to the total. Line 8 should be `Over ← Over + 1`, because Over must count the prices over 50, not store a price.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Name the tool and say how it helps."],
    stem: "Describe **two** features of an integrated development environment (IDE) that help a programmer to debug a program.",
    points: [
      "Names a feature: breakpoints / single stepping / variable watch / error diagnostics",
      "Explains it: e.g. a breakpoint pauses the program at a chosen line",
      "Names a second feature",
      "Explains it: e.g. a watch shows a variable's value as it changes, or stepping runs one line at a time, or diagnostics show the line of a syntax error",
    ],
    explanation: "Each feature lets the programmer see what the program is doing at a particular point.",
    modelAnswer: "Breakpoints pause the program at a chosen line, so the programmer can check the values of the variables there. A variable watch window shows chosen variables' values changing as the program runs, so the point where a value goes wrong can be seen.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Trace the faulty version with the test prices.", "One error affects the total, one the count."],
    stem: `A hardware shop in Masvingo uses this algorithm to input the prices of 10 items and output the total of the prices and how many prices are over 50.\n\n${fence(codeE)}\n\nIt is tested with the prices ${pricesE.join(", ")}.`,
    parts: [
      P.num({
        label: "(a)", stem: "State the value of `Total` that the faulty algorithm outputs.", value: faultyTotal, wrong: [rightTotal],
        explanation: `Total starts at 1, so it ends at 1 + ${rightTotal} = ${faultyTotal}.`,
        workedSolution: `1. Sum of prices: ${rightTotal}.\n2. Starting from 1: ${faultyTotal}.`,
      }),
      P.num({
        label: "(b)", stem: "State the value of `Over` that the faulty algorithm outputs.", value: faultyOver, wrong: [rightOver],
        explanation: `Each price over 50 sets Over to price + 1; the last is ${pricesE.filter((p) => p > 50).at(-1)}, so Over = ${faultyOver}.`,
        workedSolution: `1. Prices over 50: ${pricesE.filter((p) => p > 50).join(", ")}.\n2. The last one sets Over ← ${pricesE.filter((p) => p > 50).at(-1)} + 1 = ${faultyOver}.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Complete the corrections.",
        template: "Line 1: `Total ← {{blank:a}}`\n\nLine 8: `Over ← {{blank:b}}`",
        blanks: [
          { id: "a", accepted: ["0"], choices: ["0", "1", "Price", "10"] },
          { id: "b", accepted: ["Over + 1"], choices: ["Over + 1", "Price + 1", "Over + Price", "1"] },
        ],
        explanation: "The total starts at 0; the count adds 1.",
      }),
      P.num({
        label: "(d)", stem: "State the value of `Over` output by the corrected algorithm with the same prices.", value: rightOver, wrong: [rightOver + 1],
        explanation: `Prices over 50: ${pricesE.filter((p) => p > 50).join(", ")}; 50 itself is not over 50.`,
        workedSolution: `1. > 50 excludes 50.\n2. ${pricesE.filter((p) => p > 50).join(", ")}: ${rightOver} prices.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why these errors are logic errors and not syntax errors.",
        points: ["Every statement follows the rules of the language, so the algorithm runs / is translated", "but it produces wrong results (a wrong total and count)"],
        modelAnswer: "Both lines are valid pseudocode, so the program translates and runs; it just gives the wrong total and the wrong count, which is what a logic error does.",
      }),
    ],
    explanation: `Faulty output ${faultyTotal} and ${faultyOver}; corrected ${rightTotal} and ${rightOver}.`,
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540,
    hints: ["Which index does the last pass of the loop use?", "Which comparison finds smaller values?"],
    stem: `This algorithm should output the lowest of the 10 scores stored in \`Scores\`.\n\n${fence(codeR)}`,
    parts: [
      P.num({
        label: "(a)", stem: "State the line number that causes a run-time error.", value: 5, wrong: [6],
        explanation: "Line 5 runs the loop to 11, but the array has only 10 elements, so Scores[11] is out of range.",
        workedSolution: "1. ARRAY[1:10] has indexes 1 to 10.\n2. FOR Index ← 2 TO 11 reaches 11 on line 5.",
      }),
      P.short({
        label: "(b)", stem: "Write the corrected line 5.",
        accepted: ["FOR Index ← 2 TO 10", "FOR Index <- 2 TO 10"],
        normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["FOR Index ← 1 TO 11"],
        explanation: "The loop must stop at the last index, 10.",
      }),
      P.num({
        label: "(c)", stem: "State the line number that contains a logic error.", value: 6, wrong: [8],
        explanation: "Line 6 uses > so it finds the highest score, not the lowest.",
        workedSolution: "1. To find the lowest, replace Lowest when a score is smaller.\n2. Line 6 uses >, so it is wrong.",
      }),
      P.mcq({
        label: "(d)", stem: "Which is the corrected line 6?",
        options: [["`IF Scores[Index] < Lowest`", "Correct."], ["`IF Scores[Index] >= Lowest`", "This still finds the highest."], ["`IF Lowest < Scores[Index]`", "This is the same test as the faulty line."], ["`IF Scores[Index] = Lowest`", "Equal values do not change the lowest."]],
        answer: "A", explanation: "A smaller score replaces Lowest.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how a run-time error differs from a logic error.",
        points: ["A run-time error makes the program stop / crash while it is running", "A logic error lets the program finish but gives a wrong result"],
        modelAnswer: "A run-time error, like reading Scores[11], stops the program while it runs. A logic error, like using >, lets the program finish but outputs the wrong answer.",
      }),
    ],
    explanation: "Line 5: TO 10. Line 6: <.",
  });

  b.card("DEFINITION", "Syntax error", "Breaks the language's grammar rules (misspelt keyword, missing ENDIF); reported by the translator; the program cannot run.");
  b.card("DEFINITION", "Logic error", "The program runs but gives wrong results (wrong operator, wrong formula, wrong loop limit); found by testing and dry runs.");
  b.card("DEFINITION", "Run-time error", "Crashes the program while it runs: division by zero, index out of range, file not found.");
  b.card("CONCEPT", "Correcting a given algorithm", "Give the line number, describe the error, and write the full corrected line.");
  b.card("CONCEPT", "Usual suspects", "Initial values, FOR … NEXT variable, loop limits (< vs <=), counter + 1, comparison direction, divisor of the average, missing outputs.");
  b.card("CONCEPT", "IDE debugging tools", "Breakpoints (pause at a line), stepping (one line at a time), variable watch, error diagnostics.");
  b.card("CONCEPT", "Preventing run-time errors", "Validate input; check divisor ≠ 0; check index is within bounds; check the file exists.");
  b.card("FACT", "Infinite loop", "A loop whose condition never changes (e.g. the counter is never updated) runs for ever: a logic error.");
  b.card("CONCEPT", "Exception handling", "Some languages catch run-time errors instead of crashing, e.g. Python try … except.", "ZIMSEC Form 3 error-handling techniques.");
});
