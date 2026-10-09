// Slice w4a: totalling, counting, maximum, minimum and average (comp.algorithms.totalling-counting).
import { concept, P } from "../lib.mjs";
import { fence, arrayMd, sum } from "./w4a-0-kit.mjs";

// Inputs for a total.
const insT = [15, 8, 22, 5];
const totT = sum(insT);
// Average of an array (exact).
const marks = [56, 71, 48, 90, 65];
const avgM = sum(marks) / marks.length;
// Conditional count.
const ages = [24, 37, 19, 42, 28, 33, 51];
const over15 = ages.filter((a) => a > 30).length;
// Total reset inside loop.
const insR = [7, 12, 9];
// Lowest initialised to 0.
const insL = [34, 28, 41, 30];
// All-negative temperatures with Highest ← 0.
const temps = [-5, -2, -8, -1];
const realMax = Math.max(...temps);
// Position of the maximum.
const rain = [12, 30, 7, 30, 25, 18];
let bestR = rain[0];
let posR = 1;
for (let i = 2; i <= rain.length; i++)
  if (rain[i - 1] > bestR) {
    bestR = rain[i - 1];
    posR = i;
  }
// Rogue value average with count.
const insQ = [40, 25, 55, -1];
const usedQ = insQ.slice(0, -1);
const avgQ = sum(usedQ) / usedQ.length;
// Struct: fuel sales.
const litres = [45, 30, 60, 20, 75, 50, 40, 80];
const totL = sum(litres);
const bigL = litres.filter((x) => x >= 50).length;
const maxL = Math.max(...litres);
const avgL = totL / litres.length;

const codeS = `Total ← 0
Big ← 0
Most ← Litres[1]
FOR Sale ← 1 TO 8
    Total ← Total + Litres[Sale]
    IF Litres[Sale] >= 50
        THEN
            Big ← Big + 1
    ENDIF
    IF Litres[Sale] > Most
        THEN
            Most ← Litres[Sale]
    ENDIF
NEXT Sale
OUTPUT Total, " ", Big, " ", Most`;

concept("comp.algorithms.totalling-counting", { file: "algorithms/totalling-counting", keyPrefix: "algorithms.totalling-counting" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where should `Total ← 0` be placed in an algorithm that totals values input in a loop?",
    options: [
      ["Before the loop", "Correct: the total is set to zero once, before any values are added."],
      ["Inside the loop, before the input", "The total would be reset to zero on every pass."],
      ["Inside the loop, after the addition", "Every total would be wiped out straight after it was made."],
      ["After the loop", "The total would be zero when it is output."],
    ],
    answer: "A",
    explanation: "Initialise once before the loop, update inside the loop, use after the loop.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement **counts** the number of times something happens?",
    options: [
      ["`Count ← Count + 1`", "Correct: one is added each time."],
      ["`Count ← Count + Value`", "This totals the values."],
      ["`Count ← 1`", "This sets Count to 1 every time; it never goes higher."],
      ["`Count ← Value`", "This stores the latest value."],
    ],
    answer: "A",
    explanation: "Counting adds 1; totalling adds the value.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `What is output when the inputs are ${insT.join(", ")}?\n\n${fence(`Total ← 0\nFOR Count ← 1 TO 4\n    INPUT Number\n    Total ← Total + Number\nNEXT Count\nOUTPUT Total`)}`,
    value: totT,
    wrong: [insT.at(-1)],
    explanation: `${insT.join(" + ")} = ${totT}.`,
    workedSolution: `1. Total: ${insT.map((_, i) => sum(insT.slice(0, i + 1))).join(", ")}.\n2. Output ${totT}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `The array \`Marks\` holds:\n\n${arrayMd("Marks", marks)}\n\n${fence(`Total ← 0\nFOR Index ← 1 TO 5\n    Total ← Total + Marks[Index]\nNEXT Index\nOUTPUT Total / 5`)}\n\nWhat is output?`,
    value: avgM,
    wrong: [sum(marks)],
    explanation: `Total = ${sum(marks)}; ${sum(marks)} ÷ 5 = ${avgM}.`,
    workedSolution: `1. ${marks.join(" + ")} = ${sum(marks)}.\n2. ${sum(marks)} ÷ 5 = ${avgM}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `The ages of members of a chess club in Kwekwe are ${ages.join(", ")}. An algorithm uses \`IF Age > 30 THEN Count ← Count + 1\` for each age, with \`Count\` starting at 0. What is the final value of \`Count\`?`,
    value: over15,
    wrong: [ages.filter((a) => a >= 30).length + 1],
    explanation: `Ages over 30: ${ages.filter((a) => a > 30).join(", ")}, so Count = ${over15}.`,
    workedSolution: `1. Check each age against > 30.\n2. ${ages.filter((a) => a > 30).join(", ")} pass.\n3. Count = ${over15}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Where is Total set to 0?"],
    stem: `What is output when the inputs are ${insR.join(", ")}?\n\n${fence(`FOR Count ← 1 TO 3\n    Total ← 0\n    INPUT Number\n    Total ← Total + Number\nNEXT Count\nOUTPUT Total`)}`,
    options: [
      [String(insR.at(-1)), "Correct: Total is reset on every pass, so only the last number remains."],
      [String(sum(insR)), "That would be right if Total ← 0 were before the loop."],
      ["0", "The last number is added after the final reset."],
      [String(insR[0]), "The first number is lost when Total is reset on the second pass."],
    ],
    answer: "A",
    explanation: `Because \`Total ← 0\` is inside the loop, each pass starts again from 0; the output is the last input, ${insR.at(-1)}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Is any input less than the starting value of Lowest?"],
    stem: `What is output when the inputs are ${insL.join(", ")}?\n\n${fence(`Lowest ← 0\nFOR Count ← 1 TO 4\n    INPUT Number\n    IF Number < Lowest\n        THEN\n            Lowest ← Number\n    ENDIF\nNEXT Count\nOUTPUT Lowest`)}`,
    options: [
      ["0", "Correct: no positive input is less than 0, so Lowest never changes."],
      [String(Math.min(...insL)), "That is the real minimum, but Lowest started at 0."],
      [String(insL.at(-1)), "Lowest only changes when a smaller value is found."],
      [String(Math.max(...insL)), "The algorithm looks for smaller values, not larger."],
    ],
    answer: "A",
    explanation: "Starting Lowest at 0 is a logic error: initialise it to the first value, or to a value larger than any possible input.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Could every value be below the starting value?"],
    stem: `An algorithm finds the highest night-time temperature in Nyanga in July. It starts with \`Highest ← 0\`. The temperatures are ${temps.join(", ")}. Why is the result wrong?`,
    options: [
      [`Every temperature is below 0, so 0 is output instead of ${realMax}`, "Correct: no value ever replaces the starting value."],
      [`The lowest temperature, ${Math.min(...temps)}, is output instead`, "Only values greater than Highest replace it."],
      ["Negative numbers cannot be compared with the > operator", "Negative numbers compare correctly."],
      ["The algorithm stops at the first negative temperature", "The loop processes every value."],
    ],
    answer: "A",
    explanation: "Start Highest at the first value (or a value lower than any possible temperature) so it works for negative data.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Only a value that is greater, not equal, replaces the maximum."],
    stem: `The array \`Rainfall\` holds:\n\n${arrayMd("Rainfall", rain)}\n\n${fence(`Most ← Rainfall[1]\nDay ← 1\nFOR Index ← 2 TO 6\n    IF Rainfall[Index] > Most\n        THEN\n            Most ← Rainfall[Index]\n            Day ← Index\n    ENDIF\nNEXT Index\nOUTPUT Day`)}\n\nWhat is output?`,
    value: posR,
    wrong: [rain.lastIndexOf(bestR) + 1],
    explanation: `The largest value ${bestR} first appears at index ${posR}; the second ${bestR} is equal, not greater, so Day stays ${posR}.`,
    workedSolution: `1. Most = ${rain[0]}, Day = 1.\n2. Index 2: ${rain[1]} > ${rain[0]}: Most = ${rain[1]}, Day = 2.\n3. Indexes 3 to 6: no value is greater than ${bestR}.\n4. Output ${posR}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    hints: ["The rogue value -1 is not a real value.", "Divide by the number of real values."],
    stem: `What is output when the inputs are ${insQ.join(", ")}?\n\n${fence(`Total ← 0\nCount ← 0\nINPUT Number\nWHILE Number <> -1 DO\n    Total ← Total + Number\n    Count ← Count + 1\n    INPUT Number\nENDWHILE\nIF Count > 0\n    THEN\n        OUTPUT Total / Count\nENDIF`)}`,
    value: avgQ,
    wrong: [sum(insQ) / insQ.length],
    explanation: `The -1 stops the loop and is not added: ${usedQ.join(" + ")} = ${sum(usedQ)}, Count = ${usedQ.length}, ${sum(usedQ)} ÷ ${usedQ.length} = ${avgQ}.`,
    workedSolution: `1. Values added: ${usedQ.join(", ")}.\n2. Total = ${sum(usedQ)}, Count = ${usedQ.length}.\n3. Average = ${avgQ}.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens if the first input is the rogue value?"],
    stem: "Why does the algorithm above check `IF Count > 0` before dividing?",
    options: [
      ["To avoid dividing by zero when no values are entered", "Correct: Total / 0 would cause a run-time error."],
      ["To make sure the average is a whole number", "The check does not affect rounding."],
      ["To stop the rogue value from being added to Total", "The WHILE condition already does that."],
      ["To count how many values were entered", "Count is updated inside the loop."],
    ],
    answer: "A",
    explanation: "If the first input is -1, Count stays 0 and Total / Count would be a division by zero.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The average of the values input in a loop should be calculated inside the loop, straight after each value is added.",
    answer: false,
    explanation: "False. The average is calculated once, after the loop, when the total is complete.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Setting `Highest` to the first value before comparing the others works for any set of numbers, including negative ones.",
    answer: true,
    explanation: "True. The first value is a real value, so the maximum can never be one that was not input.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each task to the statement inside the loop.",
    pairs: [
      ["Running total of prices", "`Total ← Total + Price`"],
      ["Number of prices over 10", "`IF Price > 10 THEN Count ← Count + 1`"],
      ["Highest price so far", "`IF Price > Highest THEN Highest ← Price`"],
      ["Lowest price so far", "`IF Price < Lowest THEN Lowest ← Price`"],
    ],
    explanation: "Totalling adds the value; counting adds 1 under a condition; max and min compare and replace.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Initial values go before the loop.", "The average is worked out after the loop."],
    stem: "Complete the algorithm, which inputs 10 numbers and outputs their average.\n\n```\nSum ← [1]\nFOR Count ← 1 TO 10\n    INPUT Number\n    Sum ← [2]\nNEXT Count\nAverage ← [3]\nOUTPUT Average\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["0"], choices: ["0", "1", "Number", "10"] },
      { id: "b", accepted: ["Sum + Number"], choices: ["Sum + Number", "Sum + 1", "Number", "Sum / 10"] },
      { id: "c", accepted: ["Sum / 10"], choices: ["Sum / 10", "Sum / Count", "Number / 10", "Sum * 10"] },
    ],
    explanation: "Sum starts at 0, each number is added, and the average is Sum / 10 after the loop.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What range can a mark take?"],
    stem: "Marks are whole numbers from 0 to 100. Explain why `Lowest ← 101` is a suitable starting value when finding the lowest mark, and why `Lowest ← 0` is not.",
    points: [
      "101 is above any possible mark, so the first mark compared is always lower and replaces it",
      "With 0, no mark is lower (unless a mark is 0), so Lowest stays 0 and the output is wrong",
    ],
    explanation: "The starting value must be beaten by any real value.",
    modelAnswer: "Every mark is at most 100, so the first mark is always less than 101 and becomes the lowest so far. If Lowest started at 0, no mark could be lower, so 0 would be output even if the lowest mark was 35.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 6,
    hints: ["Initialise before the loop, update inside, output after.", "Use the first value, or suitable extremes, to start the max and min."],
    stem: "Write an algorithm in pseudocode that inputs the midday temperatures for the 7 days of a week and outputs the highest temperature, the lowest temperature and the average temperature. Temperatures may be negative.",
    points: [
      "Initialises the total to 0 before the loop",
      "Initialises highest and lowest suitably (to the first temperature, or to values outside any possible range)",
      "Loop that runs for all 7 days with an INPUT of the temperature (with a prompt)",
      "Adds each temperature to the total inside the loop",
      "Compares each temperature with highest and with lowest and replaces them when greater / smaller",
      "Calculates the average as total / 7 after the loop and outputs highest, lowest and average with messages",
    ],
    explanation: "Three standard methods share one loop; each has its starting value before the loop.",
    modelAnswer: "```\nOUTPUT \"Enter temperature for day 1\"\nINPUT Temperature\nTotal ← Temperature\nHighest ← Temperature\nLowest ← Temperature\nFOR Day ← 2 TO 7\n    OUTPUT \"Enter temperature for day \", Day\n    INPUT Temperature\n    Total ← Total + Temperature\n    IF Temperature > Highest\n        THEN\n            Highest ← Temperature\n    ENDIF\n    IF Temperature < Lowest\n        THEN\n            Lowest ← Temperature\n    ENDIF\nNEXT Day\nOUTPUT \"Highest: \", Highest\nOUTPUT \"Lowest: \", Lowest\nOUTPUT \"Average: \", Total / 7\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Big counts sales of 50 litres or more.", "Most starts at the first value."],
    stem: `A service station in Gweru stores the litres of fuel in each of its last 8 sales in the array \`Litres\`:\n\n${arrayMd("Litres", litres)}\n\n${fence(codeS)}`,
    parts: [
      P.num({
        label: "(a)", stem: "State the final value of `Total`.", value: totL, wrong: [totL - litres[0]],
        explanation: `${litres.join(" + ")} = ${totL}.`,
        workedSolution: `1. Add all eight values.\n2. Total = ${totL}.`,
      }),
      P.num({
        label: "(b)", stem: "State the final value of `Big`.", value: bigL, wrong: [litres.filter((x) => x > 50).length],
        explanation: `Values of 50 or more: ${litres.filter((x) => x >= 50).join(", ")}.`,
        workedSolution: `1. >= 50 includes 50.\n2. ${litres.filter((x) => x >= 50).join(", ")}: ${bigL} values.`,
      }),
      P.num({
        label: "(c)", stem: "State the final value of `Most`.", value: maxL, wrong: [litres[0]],
        explanation: `The largest value is ${maxL}.`,
        workedSolution: `1. Most starts at ${litres[0]}.\n2. It is replaced by ${litres.filter((x, i) => x > Math.max(...litres.slice(0, i), litres[0]) ).join(", ")}.\n3. Final value ${maxL}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which statement, added after the loop, outputs the average sale?",
        options: [["`OUTPUT Total / 8`", `Correct: ${totL} ÷ 8 = ${avgL}.`], ["`OUTPUT Total / Big`", "Big counts only the large sales."], ["`OUTPUT Most / 8`", "Most is the largest single sale."], ["`OUTPUT Total / Sale`", "Sale is the loop counter; its value after the loop should not be relied on, so divide by 8."]],
        answer: "A", explanation: "Average = total ÷ number of values.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "The manager also wants the smallest sale and the **number** of the sale (its index) in which it happened. Write the extra pseudocode needed, showing where it goes.",
        points: [
          "Before the loop: Least ← Litres[1] and LeastSale ← 1",
          "Inside the loop: IF Litres[Sale] < Least",
          "THEN Least ← Litres[Sale] and LeastSale ← Sale",
          "After the loop: OUTPUT Least and LeastSale with a message",
        ],
        modelAnswer: "```\n// before the loop\nLeast ← Litres[1]\nLeastSale ← 1\n// inside the loop\n    IF Litres[Sale] < Least\n        THEN\n            Least ← Litres[Sale]\n            LeastSale ← Sale\n    ENDIF\n// after the loop\nOUTPUT \"Smallest sale: \", Least, \" litres, sale number \", LeastSale\n```",
      }),
    ],
    explanation: `Total ${totL}, Big ${bigL}, Most ${maxL}, average ${avgL}.`,
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 5, secs: 450,
    hints: ["Initialise, update, use."],
    stem: "Chipo writes an algorithm to count how many of 25 learners scored 75 or more in a test, and to total all the scores.",
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Complete the statements.",
        template: "Before the loop: `Count ← {{blank:a}}`. Inside the loop, for each `Score`: `IF Score {{blank:b}} 75 THEN Count ← Count + 1`. Inside the loop: `Total ← Total + {{blank:c}}`.",
        blanks: [
          { id: "a", accepted: ["0"], choices: ["0", "1", "25", "75"] },
          { id: "b", accepted: [">="], choices: [">=", ">", "<=", "="] },
          { id: "c", accepted: ["Score"], choices: ["Score", "1", "Count", "75"] },
        ],
        explanation: "Count starts at 0; 75 or more is >= 75; the total adds the score.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain the difference between counting and totalling.",
        points: ["Counting adds 1 each time an event / condition happens", "Totalling adds the value itself to a running total"],
        modelAnswer: "Counting adds one to the counter each time a score of 75 or more is found; totalling adds the score itself to the running total.",
      }),
    ],
    explanation: "0, >=, Score.",
  });

  b.card("FORMULA", "Totalling", "Before the loop: Total ← 0. Inside: Total ← Total + Value.");
  b.card("FORMULA", "Counting", "Before the loop: Count ← 0. Inside (often in an IF): Count ← Count + 1.");
  b.card("FORMULA", "Average", "Total / number of values, calculated once after the loop. Check the count is not 0 first.");
  b.card("CONCEPT", "Maximum", "Highest ← first value (or below any possible value); inside the loop IF Value > Highest THEN Highest ← Value.");
  b.card("CONCEPT", "Minimum", "Lowest ← first value (or above any possible value); inside the loop IF Value < Lowest THEN Lowest ← Value.");
  b.card("CONCEPT", "Position of the maximum", "Store the index too: IF Value > Highest THEN Highest ← Value, Where ← Index.");
  b.card("FACT", "Lowest ← 0 error", "If all values are positive, nothing is less than 0, so the minimum is wrongly output as 0.");
  b.card("FACT", "Total ← 0 inside the loop", "Resets the total on every pass, so only the last value is kept.");
  b.card("CONCEPT", "Initialise, update, use", "Every standard method: starting value before the loop, update inside, result used after.");
});
