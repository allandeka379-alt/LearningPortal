// Slice w4a: algorithms and the sequence construct (comp.algorithms.algorithm-basics). freePreview lesson.
import { concept, P } from "../lib.mjs";
import { fence } from "./w4a-0-kit.mjs";

const DIV = (a, b) => Math.floor(a / b);
const MOD = (a, b) => a % b;

// Seconds to minutes and seconds.
const secs = 250;
const secMin = DIV(secs, 60);
const secRem = MOD(secs, 60);
// Sum of the digits of a three-digit number.
const digitCode = `OUTPUT "Enter a three-digit number"
INPUT Number
Hundreds ← DIV(Number, 100)
Tens ← MOD(DIV(Number, 10), 10)
Units ← MOD(Number, 10)
Result ← Hundreds + Tens + Units
OUTPUT Result`;
const digitIn = 487;
const dH = DIV(digitIn, 100);
const dT = MOD(DIV(digitIn, 10), 10);
const dU = MOD(digitIn, 10);
const digitOut = dH + dT + dU;
// Wrong-order swap.
const swapA = 12;
const swapB = 5;
const badSwap = (() => {
  let a = swapA;
  let b2 = swapB;
  a = b2;
  b2 = a;
  return [a, b2];
})();
// Shop discount sequence.
const price = 40;
const qty = 3;
const discount = 10; // per cent
const costBefore = price * qty;
const costAfter = costBefore - (costBefore * discount) / 100;
// Celsius to Fahrenheit.
const cel = 35;
const fah = (cel * 9) / 5 + 32;
// Struct: airtime bundle.
const bundleCode = `CONSTANT BundleSize ← 750
OUTPUT "Enter megabytes needed"
INPUT Needed
Bundles ← DIV(Needed, BundleSize) + 1
Spare ← Bundles * BundleSize - Needed
OUTPUT "Buy ", Bundles, " bundles. Spare MB: ", Spare`;
const need = 2000;
const bundles = DIV(need, 750) + 1;
const spare = bundles * 750 - need;
const need2 = 1500; // exact multiple: the algorithm buys one bundle too many
const bundles2 = DIV(need2, 750) + 1;
const spare2 = bundles2 * 750 - need2;
// Struct: fuel algorithm values.
const order = ["`INPUT Length`", "`INPUT Width`", "`Area ← Length * Width`", "`OUTPUT \"Area is \", Area`"];

concept("comp.algorithms.algorithm-basics", { file: "algorithms/algorithm-basics", keyPrefix: "algorithms.algorithm-basics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of an **algorithm**?",
    options: [
      ["A finite sequence of precise steps that solves a problem", "Correct: finite, precise and ordered."],
      ["A program written in a high-level language such as Python", "A program is one way of carrying out an algorithm, written in code."],
      ["A diagram that shows how a computer's hardware is connected", "That would be a hardware or network diagram."],
      ["A list of all the variables that a program uses", "That is closer to a data dictionary."],
    ],
    answer: "A",
    explanation: "An algorithm is a finite sequence of precise, ordered steps for solving a problem; it can be written as pseudocode or a flowchart before it is coded.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the **sequence** construct mean?",
    options: [
      ["Statements are carried out one after another in the order written", "Correct."],
      ["A group of statements is repeated until a condition is met", "That is iteration."],
      ["A choice is made between two paths depending on a condition", "That is selection."],
      ["Statements can be carried out in any order the computer chooses", "The order is fixed and matters."],
    ],
    answer: "A",
    explanation: "In a sequence each statement runs once, from top to bottom; selection chooses a path and iteration repeats.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must every step of an algorithm be **unambiguous**?",
    options: [
      ["So that each step can be understood and carried out in only one way", "Correct: a computer cannot guess what was meant."],
      ["So that the algorithm runs faster on any computer", "Clarity is about meaning, not speed."],
      ["So that the algorithm can be written without any variables", "Unambiguous steps still use variables."],
      ["So that the algorithm never needs to be tested", "Every algorithm still needs testing."],
    ],
    answer: "A",
    explanation: "A computer follows instructions exactly, so a step that could mean two things may give the wrong result.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a reason for writing an algorithm in pseudocode **before** coding the program?",
    options: [
      ["The logic can be checked without one language's rules", "Correct: pseudocode is language-independent."],
      ["Pseudocode can be run directly by the computer", "Pseudocode must be turned into program code to run."],
      ["Pseudocode removes the need for any testing", "The program must still be tested."],
      ["Pseudocode programs use less memory than coded programs when they run", "Pseudocode is not run at all."],
    ],
    answer: "A",
    explanation: "Pseudocode lets a programmer concentrate on the logic, dry-run it and share it with others who may code it in any language.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `What is output by this algorithm?\n\n${fence(`Seconds ← ${secs}\nWhole ← DIV(Seconds, 60)\nOUTPUT Whole`)}`,
    value: secMin,
    wrong: [secRem],
    explanation: `\`DIV(${secs}, 60)\` is the whole-number part of ${secs} ÷ 60, which is ${secMin}.`,
    workedSolution: `1. ${secMin} × 60 = ${secMin * 60}, the largest multiple of 60 not above ${secs}.\n2. So \`DIV(${secs}, 60)\` = ${secMin}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `What value is stored in \`Left\`?\n\n${fence(`Seconds ← ${secs}\nLeft ← MOD(Seconds, 60)`)}`,
    value: secRem,
    wrong: [secMin],
    explanation: `\`MOD\` gives the remainder: ${secs} − ${secMin} × 60 = ${secRem}.`,
    workedSolution: `1. \`DIV(${secs}, 60)\` = ${secMin}.\n2. Remainder: ${secs} − ${secMin * 60} = ${secRem}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Work out the cost before the discount first.", "10% of a number is that number divided by 10."],
    stem: `Trace this algorithm and give the final value output.\n\n${fence(`Price ← ${price}\nQuantity ← ${qty}\nCost ← Price * Quantity\nCost ← Cost - Cost * ${discount} / 100\nOUTPUT Cost`)}`,
    value: costAfter,
    wrong: [costBefore],
    explanation: `Cost is first ${price} × ${qty} = ${costBefore}; then ${costBefore} − ${(costBefore * discount) / 100} = ${costAfter}.`,
    workedSolution: `1. \`Cost ← ${price} * ${qty}\` = ${costBefore}.\n2. \`Cost * ${discount} / 100\` = ${(costBefore * discount) / 100}.\n3. \`Cost ← ${costBefore} - ${(costBefore * discount) / 100}\` = ${costAfter}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Trace it with two simple values."],
    stem: `State the purpose of this algorithm.\n\n${fence(`OUTPUT "Enter temperature"\nINPUT Celsius\nFahrenheit ← Celsius * 9 / 5 + 32\nOUTPUT Fahrenheit`)}`,
    options: [
      ["To convert a temperature from Celsius to Fahrenheit", `Correct: for example ${cel} gives ${fah}.`],
      ["To check whether a temperature is too high", "There is no decision in the algorithm."],
      ["To find the average of several temperatures", "Only one temperature is input."],
      ["To convert a temperature from Fahrenheit to Celsius", "The input is named Celsius and the formula multiplies by 9/5 and adds 32."],
    ],
    answer: "A",
    explanation: "The algorithm inputs a Celsius value, applies the conversion formula and outputs the Fahrenheit value.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Trace the two assignments in order."],
    stem: `Sipho tries to swap two values without a temporary variable.\n\n${fence(`First ← ${swapA}\nSecond ← ${swapB}\nFirst ← Second\nSecond ← First\nOUTPUT First, " ", Second`)}\n\nWhat is output?`,
    options: [
      [`${badSwap[0]} ${badSwap[1]}`, "Correct: the first value is overwritten before it is copied."],
      [`${swapB} ${swapA}`, "That would need a temporary variable to save the first value."],
      [`${swapA} ${swapB}`, "The first assignment changes First."],
      [`${swapA} ${swapA}`, "First is overwritten with Second's value, so the original value is lost."],
    ],
    answer: "A",
    explanation: `After \`First ← Second\` both hold ${swapB}; \`Second ← First\` copies ${swapB} again, so the output is ${badSwap.join(" ")}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Try it with a number such as 123.", "What do DIV and MOD by 10 and 100 pick out?"],
    stem: `State the purpose of this algorithm.\n\n${fence(digitCode)}`,
    options: [
      ["To add up the digits of a three-digit number", "Correct: it splits off each digit and adds them."],
      ["To reverse the digits of a three-digit number", "The digits are added, not rearranged."],
      ["To check that the number has three digits", "There is no check or decision."],
      ["To round the number to the nearest hundred", "DIV(Number, 100) is only one of the three parts."],
    ],
    answer: "A",
    explanation: "DIV by 100 gives the hundreds digit, MOD(DIV by 10, 10) the tens digit and MOD by 10 the units digit; the three are added.",
  });
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    hints: ["Find Hundreds, Tens and Units one at a time."],
    stem: `What is output by this algorithm when the input is ${digitIn}?\n\n${fence(digitCode)}`,
    value: digitOut,
    wrong: [digitIn],
    explanation: `Hundreds = ${dH}, Tens = ${dT}, Units = ${dU}; ${dH} + ${dT} + ${dU} = ${digitOut}.`,
    workedSolution: `1. \`DIV(${digitIn}, 100)\` = ${dH}.\n2. \`DIV(${digitIn}, 10)\` = ${DIV(digitIn, 10)}; \`MOD(${DIV(digitIn, 10)}, 10)\` = ${dT}.\n3. \`MOD(${digitIn}, 10)\` = ${dU}.\n4. ${dH} + ${dT} + ${dU} = ${digitOut}.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a sequence, the order of the statements does not affect the result.",
    answer: false,
    explanation: "False. Values must be input or calculated before they are used; changing the order can give wrong results or use values that do not exist yet.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The same algorithm can be written as pseudocode or drawn as a flowchart.",
    answer: true,
    explanation: "True. Pseudocode and flowcharts are two ways of representing the same algorithm.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pseudocode statement to what it does.",
    pairs: [
      ["`INPUT Quantity`", "Takes a value from the user and stores it"],
      ["`OUTPUT \"Done\"`", "Displays a message"],
      ["`Total ← Price * Quantity`", "Calculates a value and stores it in a variable"],
      ["`CONSTANT Rate ← 0.15`", "Names a value that cannot change while the program runs"],
    ],
    explanation: "INPUT reads, OUTPUT displays, ← assigns, CONSTANT fixes a named value.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the algorithm, which asks for a learner's name and greets them.\n\n```\nOUTPUT \"What is your name?\"\n[1] Name\nGreeting [2] \"Hello\"\n[3] Greeting, \" \", Name\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["INPUT"], choices: ["INPUT", "OUTPUT", "DECLARE", "RETURN"] },
      { id: "b", accepted: ["←"], choices: ["←", "=", "<>", ">="] },
      { id: "c", accepted: ["OUTPUT"], choices: ["OUTPUT", "INPUT", "CALL", "CONSTANT"] },
    ],
    explanation: "The name is read with INPUT, the greeting is assigned with ←, and the result is displayed with OUTPUT.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: `\`Total\` holds 12. Write exactly what is displayed by:\n\n${fence(`OUTPUT "Total is ", Total`)}`,
    accepted: ["Total is 12"],
    rejected: ["Total is Total", "\"Total is \", Total"],
    wrong: ["Total is Total"],
    explanation: "Text in quotes is displayed as written; a variable name without quotes is replaced by its value, so the output is: Total is 12.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which line uses a value that has not been set yet?"],
    stem: `This algorithm should output the area of a rectangle.\n\n${fence(`1  INPUT Length\n2  Area ← Length * Width\n3  INPUT Width\n4  OUTPUT "Area is ", Area`)}\n\nWhat is wrong with it?`,
    options: [
      ["Width is used on line 2 before it is input on line 3", "Correct: lines 2 and 3 should be swapped."],
      ["Line 4 should output Length instead of Area", "The area is the result that is required."],
      ["Line 1 should come after line 2", "Length must be input before it is used."],
      ["Line 2 should use + instead of *", "Area is length multiplied by width."],
    ],
    answer: "A",
    explanation: `In a sequence every value must be set before use. The correct order is ${order.join(", ")}.`,
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4,
    hints: ["Prompt, input, calculate, output.", "Use meaningful variable names."],
    stem: "A builder in Bulawayo needs the number of tiles for a floor. Write an algorithm in pseudocode that inputs the length and the width of a floor in metres and the number of tiles needed per square metre, then calculates and outputs the number of tiles needed.",
    points: [
      "Prompts and INPUTs the length and the width",
      "Prompts and INPUTs the number of tiles per square metre",
      "Calculates the area as length × width and multiplies by tiles per square metre, using ←",
      "OUTPUTs the number of tiles with a suitable message, after the calculation",
    ],
    explanation: "A sequence algorithm follows input, process, output, with each value set before it is used.",
    modelAnswer: "```\nOUTPUT \"Enter the length in metres\"\nINPUT Length\nOUTPUT \"Enter the width in metres\"\nINPUT Width\nOUTPUT \"Enter the tiles needed per square metre\"\nINPUT TilesPerSquareMetre\nTiles ← Length * Width * TilesPerSquareMetre\nOUTPUT \"Number of tiles needed: \", Tiles\n```",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Say what each step does, in order, in words."],
    stem: `Describe the processes in this algorithm.\n\n${fence(`OUTPUT "Enter the price in cents"\nINPUT PriceCents\nDollars ← DIV(PriceCents, 100)\nCents ← MOD(PriceCents, 100)\nOUTPUT Dollars, " dollars and ", Cents, " cents"`)}`,
    points: [
      "Inputs a price given in cents (after a prompt)",
      "Finds the whole number of dollars by integer division by 100 and the cents left over as the remainder (MOD 100)",
      "Outputs the price as dollars and cents",
    ],
    explanation: "Describe each step in order: the input, the two calculations and the output.",
    modelAnswer: "It asks for and inputs a price in cents. It divides the price by 100 using DIV to get the whole dollars and uses MOD 100 to get the cents left over. It then outputs the price as dollars and cents.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["DIV gives the whole number of bundles; one more is added.", "What happens when Needed is an exact multiple of 750?"],
    stem: `Thandeka's phone shop sells data bundles of 750 MB. This algorithm works out how many bundles a customer must buy.\n\n${fence(bundleCode)}`,
    parts: [
      P.num({
        label: "(a)", stem: `The input is ${need}. State the value of \`Bundles\`.`, value: bundles, wrong: [DIV(need, 750)],
        explanation: `\`DIV(${need}, 750)\` = ${DIV(need, 750)}; plus 1 gives ${bundles}.`,
        workedSolution: `1. \`DIV(${need}, 750)\` = ${DIV(need, 750)}.\n2. ${DIV(need, 750)} + 1 = ${bundles}.`,
      }),
      P.num({
        label: "(b)", stem: `The input is ${need}. State the value of \`Spare\`.`, value: spare, wrong: [need - DIV(need, 750) * 750],
        explanation: `${bundles} × 750 − ${need} = ${spare}.`,
        workedSolution: `1. ${bundles} × 750 = ${bundles * 750}.\n2. ${bundles * 750} − ${need} = ${spare}.`,
      }),
      P.num({
        label: "(c)", stem: `The input is ${need2}. State the value of \`Spare\`.`, value: spare2, wrong: [0],
        explanation: `\`DIV(${need2}, 750)\` = ${DIV(need2, 750)}, so Bundles = ${bundles2} and Spare = ${bundles2 * 750} − ${need2} = ${spare2}.`,
        workedSolution: `1. Bundles = ${DIV(need2, 750)} + 1 = ${bundles2}.\n2. Spare = ${bundles2 * 750} − ${need2} = ${spare2}.`,
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "State the purpose of the algorithm.",
        points: ["To calculate (and output) the number of 750 MB bundles a customer must buy and the megabytes left over"],
        modelAnswer: "To work out how many 750 MB bundles cover the megabytes a customer needs, and how many megabytes will be spare.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: `Explain the problem shown by your answer to (c).`,
        points: ["When the megabytes needed are an exact multiple of 750, the algorithm still adds 1 bundle", `so the customer is told to buy one bundle too many (${spare2} MB spare)`],
        modelAnswer: `${need2} MB is exactly ${DIV(need2, 750)} bundles, but the algorithm always adds 1, so it tells the customer to buy ${bundles2} bundles and leaves ${spare2} MB unused.`,
      }),
    ],
    explanation: `(a) ${bundles}. (b) ${spare}. (c) ${spare2}: one bundle too many for an exact multiple.`,
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 5, secs: 450,
    hints: ["Each value must be set before it is used.", "Put the steps in input, process, output order."],
    stem: "Farai writes the steps of an algorithm to work out the area of a rectangular garden, but in the wrong order:\n\n- P: `OUTPUT \"Area is \", Area`\n- Q: `INPUT Width`\n- R: `Area ← Length * Width`\n- S: `INPUT Length`",
    parts: [
      P.fib({
        label: "(a)", stem: "Put the steps in a correct order (Length is input before Width).",
        template: "First {{blank:a}}, then {{blank:b}}, then {{blank:c}}, then {{blank:d}}.",
        blanks: [
          { id: "a", accepted: ["S"], choices: ["P", "Q", "R", "S"] },
          { id: "b", accepted: ["Q"], choices: ["P", "Q", "R", "S"] },
          { id: "c", accepted: ["R"], choices: ["P", "Q", "R", "S"] },
          { id: "d", accepted: ["P"], choices: ["P", "Q", "R", "S"] },
        ],
        explanation: "Input Length (S), input Width (Q), calculate (R), output (P).",
      }),
      P.short({
        label: "(b)", stem: "Name the programming construct used when steps are carried out one after another in this way.",
        accepted: ["sequence", "sequence construct", "sequencing"], rejected: ["selection", "iteration"], wrong: ["selection"],
        explanation: "Statements carried out one after another in order form a sequence.",
      }),
    ],
    explanation: "S, Q, R, P: the sequence construct.",
  });

  b.card("DEFINITION", "Algorithm", "A finite sequence of precise, ordered steps that solves a problem or carries out a task.");
  b.card("DEFINITION", "Sequence", "Statements carried out one after another, once each, in the order written.");
  b.card("CONCEPT", "Good algorithm", "Finite (has an end), precise and unambiguous steps, correct order, clear inputs and outputs.");
  b.card("CONCEPT", "Why design algorithms first", "Plan and check the logic without a language's rules, dry-run it to find errors early, share it with other programmers, document the program.");
  b.card("FORMULA", "DIV and MOD", "DIV(a, b): whole-number part of a ÷ b. MOD(a, b): remainder. DIV(17, 5) = 3, MOD(17, 5) = 2.");
  b.card("CONCEPT", "Assignment", "`Total ← Price * Quantity`: work out the right-hand side, store it in the variable on the left. `=` only compares.");
  b.card("CONCEPT", "Swapping two values", "Temp ← First; First ← Second; Second ← Temp. Without Temp the first value is lost.");
  b.card("CONCEPT", "Purpose vs processes", "Purpose: the job the algorithm does, in one sentence. Processes: each step it takes, in order.");
  b.card("FACT", "Three constructs", "Every algorithm is built from sequence, selection and iteration.");
});
