// Slice w4a: Cambridge 0478 Paper 2 exam-format items: STRUCTURED 12 / APPLICATION (trace; errors; search and sort)
// and EXTENDED_RESPONSE 15 / CREATION scenario questions (self-marked against 15 points with SCENARIO_LEVELS).
import { concept, P, CAM, SCENARIO_LEVELS } from "../lib.mjs";
import { fence, recordTrace, bubble, linear, arrayMd, list, C } from "./w4a-0-kit.mjs";

// ---- P2 Q1: trace an algorithm (coach luggage) -------------------------------------------------------------------
const codeL = `Count ← 0
Total ← 0
Largest ← 0
OUTPUT "Enter weight in kg, 0 to stop"
INPUT Weight
WHILE Weight <> 0 DO
    IF Weight > 25
        THEN
            OUTPUT "Too heavy"
        ELSE
            Total ← Total + Weight
            Count ← Count + 1
            IF Weight > Largest
                THEN
                    Largest ← Weight
            ENDIF
    ENDIF
    OUTPUT "Enter weight in kg, 0 to stop"
    INPUT Weight
ENDWHILE
OUTPUT Count, " bags, total ", Total, " kg, largest ", Largest`;
const runL = (ins) => {
  let count = 0;
  let total = 0;
  let largest = 0;
  let heavy = 0;
  let prompts = 1;
  let k = 0;
  let w = ins[k++];
  while (w !== 0) {
    if (w > 25) heavy++;
    else {
      total += w;
      count++;
      if (w > largest) largest = w;
    }
    prompts++;
    w = ins[k++];
  }
  return { count, total, largest, heavy, prompts, out: `${count} bags, total ${total} kg, largest ${largest}` };
};
const insL = [12, 30, 8, 20, 0];
const rL = runL(insL);
const rL0 = runL([0]);
const trL = recordTrace(["Weight", "Count", "Total", "Largest", "OUTPUT"], (rec) => {
  const s = { Count: 0, Total: 0, Largest: 0 };
  rec(s);
  let k = 0;
  s.OUTPUT = "Enter weight in kg, 0 to stop"; rec(s); s.OUTPUT = undefined;
  s.Weight = insL[k++]; rec(s);
  while (s.Weight !== 0) {
    if (s.Weight > 25) { s.OUTPUT = "Too heavy"; rec(s); s.OUTPUT = undefined; }
    else {
      s.Total += s.Weight; s.Count++;
      if (s.Weight > s.Largest) s.Largest = s.Weight;
      rec(s);
    }
    s.OUTPUT = "Enter weight in kg, 0 to stop"; rec(s); s.OUTPUT = undefined;
    s.Weight = insL[k++]; rec(s);
  }
  s.OUTPUT = `${s.Count} bags, total ${s.Total} kg, largest ${s.Largest}`; rec(s);
});

// ---- P2 Q2: find and correct errors (test scores) ----------------------------------------------------------------
const codeE = `1   Total ← 0
2   Passes ← 0
3   Highest ← 40
4   FOR Learner ← 1 TO 30
5       REPEAT
6           OUTPUT "Enter score"
7           INPUT Score
8       UNTIL Score >= 0 OR Score <= 40
9       Total ← Total + Score
10      IF Score > 20
11          THEN
12              Passes ← Passes + 1
13      ENDIF
14      IF Score > Highest
15          THEN
16              Highest ← Score
17      ENDIF
18  NEXT Learner
19  Average ← Total / Learner
20  OUTPUT Average, " ", Passes, " ", Highest`;
const errLines = [3, 8, 10, 19];
// The faulty line 8 condition accepts any number: check a few values.
const faulty8 = (x) => x >= 0 || x <= 40;
if (![-5, 75, 20].every(faulty8)) throw new Error("line 8");

// ---- P2 Q3: linear search and bubble sort --------------------------------------------------------------------------
const books = [5120, 3301, 7745, 1208, 6634, 2987, 4410];
const pass1B = bubble(books)[0];
const passesB = bubble(books);
const findB = linear(books, 6634);
const missB = linear(books, 3000);

// ---- Scenario points ------------------------------------------------------------------------------------------------
const scenarioCommon = { d: 5, skill: "CREATION", examStyle: true, paper: "Paper 2", marks: 15, secs: 1350, levels: SCENARIO_LEVELS, wordLimit: { max: 600 } };
const scenConcepts = [C("algorithms.scenario-problems"), C("algorithms.totalling-counting")];

concept(C("algorithms.scenario-problems"), { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // P2 Q1: trace.
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, calculator: false,
    concepts: [C("algorithms.trace-tables"), C("algorithms.totalling-counting")],
    hints: ["Weights over 25 are rejected and not added.", "A prompt is output before every input, including the 0."],
    stem: `A coach company checks passengers' bags at its Harare depot with this algorithm.\n\n${fence(codeL)}`,
    parts: [
      P.fib({
        label: "(a)", marks: 5, stem: `Dry-run the algorithm with the inputs ${insL.join(", ")}. Complete the statements.`,
        template: "Final value of Count: {{blank:c}}\n\nFinal value of Total: {{blank:t}}\n\nFinal value of Largest: {{blank:l}}\n\nNumber of times \"Too heavy\" is output: {{blank:h}}\n\nNumber of times the prompt is output: {{blank:p}}",
        blanks: [
          { id: "c", accepted: [String(rL.count)], input: "number", wrong: String(rL.count + 1) },
          { id: "t", accepted: [String(rL.total)], input: "number", wrong: String(rL.total + 30) },
          { id: "l", accepted: [String(rL.largest)], input: "number", wrong: "30" },
          { id: "h", accepted: [String(rL.heavy)], input: "number", wrong: "0" },
          { id: "p", accepted: [String(rL.prompts)], input: "number", wrong: String(rL.prompts - 1) },
        ],
        explanation: `Trace:\n\n${trL.md}`,
      }),
      P.short({
        label: "(b)", stem: "Write exactly what the last line outputs.",
        accepted: [rL.out], normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"], wrong: [runL([12, 30, 8, 20, 0].map((x) => (x === 30 ? 25 : x))).out],
        explanation: `The values are joined with the text: ${rL.out}.`,
      }),
      P.mcq({
        label: "(c)", stem: "What is output by the last line if the first weight entered is 0?",
        options: [[`\`${rL0.out}\``, "Correct: the loop body never runs, so the starting values are output."], ["Nothing: the program stops at once", "The last line still runs after the loop."], ["`Too heavy`", "That is only output for weights over 25."], ["An error, because Total is divided by Count", "There is no division in this algorithm."]],
        answer: "A", explanation: "WHILE tests before the first pass; 0 <> 0 is false, so the loop is skipped.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe the purpose of the algorithm.",
        points: ["Inputs bag weights until 0 is entered, rejecting (with a message) bags over 25 kg", "Counts and totals the accepted bags, finds the heaviest accepted bag, and outputs the three results"],
        modelAnswer: "It inputs the weights of bags until 0 is entered. Bags over 25 kg are rejected with \"Too heavy\". For the accepted bags it counts them, totals their weight and finds the heaviest, then outputs the count, total and largest weight.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Write the changes needed so that the algorithm also counts the bags that are too heavy and outputs this count at the end.",
        points: ["Initialise a new counter (e.g. Rejected ← 0) before the loop", "Add Rejected ← Rejected + 1 in the THEN branch with \"Too heavy\"", "Output Rejected (with a message) after the loop"],
        modelAnswer: "```\nRejected ← 0              // before the loop\n...\n        THEN\n            OUTPUT \"Too heavy\"\n            Rejected ← Rejected + 1\n...\nOUTPUT \"Bags rejected: \", Rejected   // after the loop\n```",
      }),
    ],
    explanation: `${rL.out}; ${rL.heavy} rejected.`,
  });

  // P2 Q2: errors.
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, calculator: false,
    concepts: [C("algorithms.errors-debugging"), C("algorithms.test-data"), C("algorithms.totalling-counting")],
    hints: ["Check the starting value of Highest, the validation condition, the pass mark and the divisor.", "Scores of 20 or more are passes."],
    stem: `This algorithm should input the scores of 30 learners in a test marked out of 40, rejecting any score outside 0 to 40, then output the average score, the number of passes (a score of 20 or more) and the highest score. It contains four errors.\n\n${fence(codeE)}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Give the line numbers of the four errors, in ascending order.",
        template: errLines.map((_, i) => `Error ${i + 1}: line {{blank:e${i}}}`).join("\n\n"),
        blanks: errLines.map((l, i) => ({ id: `e${i}`, accepted: [String(l)], input: "number", wrong: String(l + 1) })),
        explanation: `Lines ${errLines.join(", ")}.`,
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Write the corrected version of each line you identified.",
        points: [
          "Line 3: Highest ← -1 (or 0, or any value below 0; or Highest set from the first score)",
          "Line 8: UNTIL Score >= 0 AND Score <= 40",
          "Line 10: IF Score >= 20",
          "Line 19: Average ← Total / 30",
        ],
        modelAnswer: "Line 3: `Highest ← -1`. Line 8: `UNTIL Score >= 0 AND Score <= 40`. Line 10: `IF Score >= 20`. Line 19: `Average ← Total / 30`.",
      }),
      P.num({
        label: "(c)", stem: "With the original line 3, what value of `Highest` is output whatever valid scores are entered?", value: 40, wrong: [0],
        explanation: "Highest starts at 40 and no valid score is greater than 40, so 40 is always output.",
        workedSolution: "1. Highest ← 40.\n2. Valid scores are at most 40, so Score > Highest is never true.\n3. Output 40.",
      }),
      P.mcq({
        label: "(d)", stem: "Which single test score shows the error on line 10?",
        options: [["20", "Correct: 20 is a pass but 20 > 20 is false."], ["35", "35 is counted as a pass by both versions."], ["10", "10 is a fail in both versions."], ["45", "45 is rejected by correct validation."]],
        answer: "A", explanation: "Boundary values reveal comparison errors.",
      }),
      P.mcq({
        label: "(e)", stem: "What type of error is on line 8?",
        options: [["Logic error", "Correct: it runs but accepts invalid scores."], ["Syntax error", "The line follows the pseudocode rules."], ["Run-time error", "It does not crash the program."], ["Data entry error", "The fault is in the algorithm, not the typing."]],
        answer: "A", explanation: "The condition is valid but wrong: a logic error.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Explain why the condition on line 8 lets invalid scores through. Use an example score.",
        points: ["With OR only one part needs to be true", "Every number is either >= 0 or <= 40 (or both), so the loop always ends after one input", "Example: 75 is >= 0, so it is accepted (or -5 is <= 40, so it is accepted)"],
        modelAnswer: "With OR, the loop ends if either part is true. Every number is at least 0 or at most 40, so any value ends the loop: for example 75 passes because 75 >= 0. AND is needed so both limits apply.",
      }),
    ],
    explanation: `Errors on lines ${errLines.join(", ")}.`,
  });

  // P2 Q3: linear search and bubble sort.
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, calculator: false,
    concepts: [C("algorithms.search-sort")],
    hints: ["Compare neighbouring codes and swap when the left one is larger.", "A linear search stops at the first match."],
    stem: `A library in Gweru stores seven book codes in the array \`BookCodes\`:\n\n${arrayMd("BookCodes", books)}`,
    parts: [
      P.num({
        label: "(a)", stem: "A linear search (which stops when the item is found) looks for 6634. How many comparisons does it make?", value: findB.comparisons, wrong: [books.length],
        explanation: `6634 is at position ${findB.index}.`,
        workedSolution: `1. Compare with ${books.slice(0, findB.index).join(", ")}.\n2. ${findB.comparisons} comparisons.`,
      }),
      P.num({
        label: "(b)", stem: "How many comparisons does it make when searching for 3000?", value: missB.comparisons, wrong: [0],
        explanation: "3000 is not in the array, so all 7 codes are compared.",
        workedSolution: "1. No code matches.\n2. All 7 are compared.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Write pseudocode for a linear search that inputs a book code and outputs its position in `BookCodes`, or a message if it is not found. The search must stop when the code is found.",
        points: [
          "Inputs the code to find, and sets Found ← FALSE and Index ← 1 before the loop",
          "WHILE (or REPEAT) loop that continues while not found and Index <= 7",
          "Compares BookCodes[Index] with the code: sets Found ← TRUE if equal, otherwise Index ← Index + 1",
          "After the loop outputs the position if found, otherwise a not-found message",
        ],
        modelAnswer: "```\nOUTPUT \"Enter book code\"\nINPUT Wanted\nFound ← FALSE\nIndex ← 1\nWHILE Found = FALSE AND Index <= 7 DO\n    IF BookCodes[Index] = Wanted\n        THEN\n            Found ← TRUE\n        ELSE\n            Index ← Index + 1\n    ENDIF\nENDWHILE\nIF Found = TRUE\n    THEN\n        OUTPUT \"Found at position \", Index\n    ELSE\n        OUTPUT \"Code not found\"\nENDIF\n```",
      }),
      P.fib({
        label: "(d)", marks: 3, stem: "The codes are sorted into ascending order with a bubble sort. Give the contents of `BookCodes` after the **first** pass.",
        template: pass1B.after.map((_, i) => `BookCodes[${i + 1}]: {{blank:p${i}}}`).join("\n\n"),
        blanks: pass1B.after.map((v, i) => ({ id: `p${i}`, accepted: [String(v)], input: "number", wrong: String(books[i] === v ? v + 1 : books[i]) })),
        explanation: `After pass 1: ${list(pass1B.after)}.`,
      }),
      P.num({
        label: "(e)", stem: "The sort uses a flag and stops after the first pass with no swaps. How many passes does it make in total?", value: passesB.length, wrong: [books.length - 1 === passesB.length ? passesB.length + 1 : books.length - 1],
        explanation: passesB.map((p, i) => `Pass ${i + 1}: ${list(p.after)} (${p.swaps} swaps)`).join("; ") + ".",
        workedSolution: passesB.map((p, i) => `${i + 1}. Pass ${i + 1}: ${p.swaps} swaps.`).join("\n"),
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the bubble sort uses a flag.",
        points: ["The flag records whether any swap was made during a pass", "If a pass makes no swaps the list is sorted, so the sort stops early, saving unnecessary passes"],
        modelAnswer: "The flag is set to FALSE at the start of each pass and TRUE when a swap happens. A pass with no swaps means the codes are in order, so the sort can stop instead of making the remaining passes.",
      }),
    ],
    explanation: `Search: ${findB.comparisons} and ${missB.comparisons} comparisons. Pass 1: ${list(pass1B.after)}; ${passesB.length} passes.`,
  });

  // ---- Scenario 1: tuck-shop weekly sales -----------------------------------------------------------------------
  b.ext({
    ...scenarioCommon, concepts: scenConcepts,
    hints: ["Outer loop over the 15 items, inner loop over the 5 days.", "Reset each item's quantity before its inner loop."],
    stem: "A school tuck-shop in Bulawayo sells 15 items. The names of the items are stored in the array `Items[1:15]` and their prices in dollars in the array `Prices[1:15]`; the item at each index of `Items` has its price at the same index of `Prices`. The two-dimensional array `Sold[1:15, 1:5]` has been declared to store the number of each item sold on each of the five school days of a week.\n\nWrite a program that meets the following requirements:\n\n- input and store the number of each item sold on each day; each number must be from 0 to 200;\n- for each item, calculate the total number sold in the week and the takings for that item (number sold × price);\n- output each item's name, the number sold and the takings, rounded to two decimal places;\n- calculate and output the total takings for the week, rounded to two decimal places;\n- find and output the name of the item that sold the most units;\n- count and output the number of items that sold fewer than 20 units in the week.\n\nAll inputs must be validated. You must use pseudocode or program code and add comments to explain how your code works. You do not need to declare the arrays `Items`, `Prices` and `Sold`, or initialise `Items` and `Prices`.",
    points: [
      "Declares the variables used, with suitable data types (counters, totals, best item)",
      "Initialises the week's takings, the slow-seller count and the best quantity before the loops",
      "Outer loop that runs for all 15 items",
      "Inner loop that runs for all 5 days of each item",
      "Prompts and inputs each value into Sold[Item, Day]",
      "Validation loop that repeats while the value is below 0 or above 200",
      "Suitable error message for an invalid value",
      "Item total reset before the inner loop and the day's value added to it inside the inner loop",
      "Calculates the item's takings as the item total × Prices[Item]",
      "Adds each item's takings to the week's takings",
      "Outputs Items[Item], the number sold and the takings rounded to 2 decimal places",
      "Compares each item's total with the most so far and stores the new most and the item's name",
      "Counts items whose weekly total is below 20",
      "Outputs the week's takings rounded to 2 decimal places after the loops",
      "Outputs the best-selling item's name and the count of slow sellers with messages",
    ],
    explanation: "A nested loop processes the 2D array; per-item totals feed the overall total, the maximum and the conditional count.",
    modelAnswer: "```\nDECLARE Item : INTEGER\nDECLARE Day : INTEGER\nDECLARE ItemQuantity : INTEGER\nDECLARE ItemTakings : REAL\nDECLARE WeekTakings : REAL\nDECLARE BestQuantity : INTEGER\nDECLARE BestItem : STRING\nDECLARE SlowSellers : INTEGER\n\nWeekTakings ← 0\nBestQuantity ← -1\nSlowSellers ← 0\nFOR Item ← 1 TO 15\n    ItemQuantity ← 0                      // fresh total for this item\n    FOR Day ← 1 TO 5\n        OUTPUT \"Enter number of \", Items[Item], \" sold on day \", Day\n        INPUT Sold[Item, Day]\n        WHILE Sold[Item, Day] < 0 OR Sold[Item, Day] > 200 DO   // validate\n            OUTPUT \"Must be from 0 to 200, enter again\"\n            INPUT Sold[Item, Day]\n        ENDWHILE\n        ItemQuantity ← ItemQuantity + Sold[Item, Day]\n    NEXT Day\n    ItemTakings ← ItemQuantity * Prices[Item]\n    WeekTakings ← WeekTakings + ItemTakings\n    OUTPUT Items[Item], \": \", ItemQuantity, \" sold, takings \", ROUND(ItemTakings, 2)\n    IF ItemQuantity > BestQuantity        // best seller so far\n        THEN\n            BestQuantity ← ItemQuantity\n            BestItem ← Items[Item]\n    ENDIF\n    IF ItemQuantity < 20                  // slow seller\n        THEN\n            SlowSellers ← SlowSellers + 1\n    ENDIF\nNEXT Item\nOUTPUT \"Total takings for the week: \", ROUND(WeekTakings, 2)\nOUTPUT \"Best-selling item: \", BestItem\nOUTPUT \"Items selling fewer than 20: \", SlowSellers\n```",
  });

  // ---- Scenario 2: coach seat booking ---------------------------------------------------------------------------
  b.ext({
    ...scenarioCommon, concepts: [C("algorithms.scenario-problems"), C("algorithms.totalling-counting")],
    hints: ["Use a conditional loop for the bookings and a nested FOR loop for the report.", "A seat is free when its element holds an empty string."],
    stem: "A coach running from Harare to Mutare has 12 rows of 4 seats. The two-dimensional array `Seats[1:12, 1:4]` stores the name of the passenger in each seat; a free seat holds an empty string `\"\"`. At the start every element has been set to `\"\"`. Every ticket costs 25 dollars.\n\nWrite a program that meets the following requirements:\n\n- allow the booking clerk to make bookings until they choose to stop: for each booking, input a row number (1 to 12) and a seat number (1 to 4);\n- if the seat is free, input the passenger's name, which must not be blank, store it in `Seats`, and output a confirmation; if the seat is already taken, output a suitable message;\n- after each booking attempt, ask whether another booking is to be made (Y or N);\n- when the clerk stops, output the number of bookings made and the total fares taken;\n- output, for each row, the row number and the number of free seats in that row, and then the total number of free seats on the coach.\n\nAll inputs must be validated. You must use pseudocode or program code and add comments to explain how your code works. You do not need to declare or initialise the array `Seats`.",
    points: [
      "Declares the variables used with suitable data types, and a constant (or variable) for the fare of 25",
      "Initialises the number of bookings to 0 before the booking loop",
      "Conditional loop (REPEAT … UNTIL / WHILE) that continues until the clerk chooses to stop",
      "Inputs the row with validation 1 to 12 and an error message",
      "Inputs the seat with validation 1 to 4 and an error message",
      "Checks whether Seats[Row, Seat] is empty (free)",
      "If free, inputs the passenger's name with a presence check (repeats while blank)",
      "Stores the name in Seats[Row, Seat], adds 1 to the bookings and outputs a confirmation",
      "If the seat is taken, outputs a suitable message",
      "Inputs Y or N for another booking, validated (repeats until Y or N)",
      "After the loop, outputs the number of bookings and the total fares (bookings × 25)",
      "Nested loops over all 12 rows and 4 seats for the report",
      "Free-seat count for a row reset before the inner loop and increased for each empty element",
      "Outputs each row number with its number of free seats",
      "Totals and outputs the number of free seats on the coach",
    ],
    explanation: "Combines a conditional loop with validation and a presence check, a 2D array update, and a nested-loop report.",
    modelAnswer: "```\nCONSTANT Fare ← 25\nDECLARE Row : INTEGER\nDECLARE Seat : INTEGER\nDECLARE Name : STRING\nDECLARE Again : STRING\nDECLARE Bookings : INTEGER\nDECLARE RowFree : INTEGER\nDECLARE TotalFree : INTEGER\n\nBookings ← 0\nREPEAT\n    OUTPUT \"Enter row number (1 to 12)\"\n    INPUT Row\n    WHILE Row < 1 OR Row > 12 DO\n        OUTPUT \"Row must be 1 to 12, enter again\"\n        INPUT Row\n    ENDWHILE\n    OUTPUT \"Enter seat number (1 to 4)\"\n    INPUT Seat\n    WHILE Seat < 1 OR Seat > 4 DO\n        OUTPUT \"Seat must be 1 to 4, enter again\"\n        INPUT Seat\n    ENDWHILE\n    IF Seats[Row, Seat] = \"\"              // seat is free\n        THEN\n            OUTPUT \"Enter passenger name\"\n            INPUT Name\n            WHILE Name = \"\" DO           // presence check\n                OUTPUT \"Name must not be blank, enter again\"\n                INPUT Name\n            ENDWHILE\n            Seats[Row, Seat] ← Name\n            Bookings ← Bookings + 1\n            OUTPUT \"Row \", Row, \" seat \", Seat, \" booked for \", Name\n        ELSE\n            OUTPUT \"That seat is already booked\"\n    ENDIF\n    REPEAT\n        OUTPUT \"Another booking? (Y/N)\"\n        INPUT Again\n    UNTIL Again = \"Y\" OR Again = \"N\"\nUNTIL Again = \"N\"\nOUTPUT \"Bookings made: \", Bookings, \" Total fares: \", Bookings * Fare\nTotalFree ← 0\nFOR Row ← 1 TO 12                         // report of free seats\n    RowFree ← 0\n    FOR Seat ← 1 TO 4\n        IF Seats[Row, Seat] = \"\"\n            THEN\n                RowFree ← RowFree + 1\n        ENDIF\n    NEXT Seat\n    OUTPUT \"Row \", Row, \": \", RowFree, \" seats free\"\n    TotalFree ← TotalFree + RowFree\nNEXT Row\nOUTPUT \"Seats still free: \", TotalFree\n```",
  });

  // ---- Scenario 3: class test results with grades -----------------------------------------------------------------
  b.ext({
    ...scenarioCommon, concepts: scenConcepts,
    hints: ["Total each learner's four marks in an inner loop.", "Use nested IF (or a chain) to award the grade, counting each grade."],
    stem: "A Form 3 class in Gweru has 35 learners. Their names are stored in the array `Learners[1:35]`. The two-dimensional array `Marks[1:35, 1:4]` has been declared to store each learner's marks in four tests; each test is marked out of 50.\n\nWrite a program that meets the following requirements:\n\n- input and store the four test marks for every learner; each mark must be from 0 to 50;\n- calculate each learner's total and their percentage (total out of 200 converted to a percentage);\n- award a grade: A for 80% or more, B for 65% to less than 80%, C for 50% to less than 65%, U below 50%;\n- output each learner's name, percentage rounded to one decimal place, and grade;\n- count and output the number of learners awarded each grade;\n- calculate and output the class's average percentage, rounded to one decimal place.\n\nAll inputs must be validated. You must use pseudocode or program code and add comments to explain how your code works. You do not need to declare the arrays `Learners` and `Marks`, or initialise `Learners`.",
    points: [
      "Declares the variables used with suitable data types (including a CHAR or STRING for the grade)",
      "Initialises the four grade counters and the class total to 0 before the loops",
      "Outer loop for all 35 learners",
      "Inner loop for the 4 tests",
      "Prompts and inputs each mark into Marks[Learner, Test]",
      "Validation of each mark (0 to 50) in a loop, with an error message",
      "Learner's total reset before the inner loop and each mark added inside it",
      "Calculates the percentage as total / 200 × 100 (or total / 2)",
      "Correct conditions for grade A (>= 80) and grade B (>= 65 and < 80)",
      "Correct conditions for grade C (>= 50 and < 65) and grade U (< 50)",
      "Adds 1 to the counter for the grade awarded",
      "Outputs each learner's name, percentage rounded to 1 decimal place and grade",
      "Adds each learner's percentage (or total) to the class total",
      "Outputs the number of learners with each grade after the loops",
      "Calculates and outputs the class average percentage rounded to 1 decimal place",
    ],
    explanation: "Nested loops fill and total the 2D array; selection awards and counts grades; the class average comes after the loops.",
    modelAnswer: "```\nDECLARE Learner : INTEGER\nDECLARE Test : INTEGER\nDECLARE Total : INTEGER\nDECLARE Percentage : REAL\nDECLARE Grade : CHAR\nDECLARE CountA : INTEGER\nDECLARE CountB : INTEGER\nDECLARE CountC : INTEGER\nDECLARE CountU : INTEGER\nDECLARE ClassTotal : REAL\n\nCountA ← 0\nCountB ← 0\nCountC ← 0\nCountU ← 0\nClassTotal ← 0\nFOR Learner ← 1 TO 35\n    Total ← 0\n    FOR Test ← 1 TO 4\n        REPEAT                                     // validate each mark\n            OUTPUT \"Enter mark for test \", Test, \" for \", Learners[Learner]\n            INPUT Marks[Learner, Test]\n            IF Marks[Learner, Test] < 0 OR Marks[Learner, Test] > 50\n                THEN\n                    OUTPUT \"Mark must be from 0 to 50\"\n            ENDIF\n        UNTIL Marks[Learner, Test] >= 0 AND Marks[Learner, Test] <= 50\n        Total ← Total + Marks[Learner, Test]\n    NEXT Test\n    Percentage ← Total / 200 * 100\n    IF Percentage >= 80                            // award and count the grade\n        THEN\n            Grade ← 'A'\n            CountA ← CountA + 1\n        ELSE\n            IF Percentage >= 65\n                THEN\n                    Grade ← 'B'\n                    CountB ← CountB + 1\n                ELSE\n                    IF Percentage >= 50\n                        THEN\n                            Grade ← 'C'\n                            CountC ← CountC + 1\n                        ELSE\n                            Grade ← 'U'\n                            CountU ← CountU + 1\n                    ENDIF\n            ENDIF\n    ENDIF\n    ClassTotal ← ClassTotal + Percentage\n    OUTPUT Learners[Learner], \" \", ROUND(Percentage, 1), \"% grade \", Grade\nNEXT Learner\nOUTPUT \"A: \", CountA, \" B: \", CountB, \" C: \", CountC, \" U: \", CountU\nOUTPUT \"Class average: \", ROUND(ClassTotal / 35, 1), \"%\"\n```",
  });

  // ---- Scenario 4: borehole water use ------------------------------------------------------------------------------
  b.ext({
    ...scenarioCommon, concepts: scenConcepts,
    hints: ["Each household's weekly total is the sum of its seven days.", "Start the lowest total above any possible weekly total, or at the first household's total."],
    stem: "A community borehole near Masvingo supplies 40 households. The names of the households are stored in the array `Households[1:40]`. The two-dimensional array `Litres[1:40, 1:7]` has been declared to store the number of litres each household draws on each day of a week.\n\nWrite a program that meets the following requirements:\n\n- input and store the litres drawn by each household on each of the seven days; each value must be a whole number from 0 to 2000;\n- calculate each household's total for the week and its average daily use;\n- output each household's name, weekly total and average daily use rounded to one decimal place; if the weekly total is more than 7000 litres, also output the words \"Over limit\" next to that household;\n- count and output the number of households over the limit;\n- find and output the name of the household with the lowest weekly total;\n- calculate and output the total number of litres drawn from the borehole in the week.\n\nAll inputs must be validated. You must use pseudocode or program code and add comments to explain how your code works. You do not need to declare the arrays `Households` and `Litres`, or initialise `Households`.",
    points: [
      "Declares the variables used with suitable data types",
      "Initialises the borehole total and the over-limit count to 0 before the loops",
      "Initialises the lowest total to a value above any possible weekly total (above 14000) or to the first household's total",
      "Outer loop for all 40 households",
      "Inner loop for the 7 days",
      "Prompts and inputs each value into Litres[House, Day]",
      "Validation loop for 0 to 2000 with an error message",
      "Weekly total reset before the inner loop and each day's litres added inside it",
      "Calculates the average daily use as weekly total / 7",
      "Outputs the household's name, weekly total and average rounded to 1 decimal place",
      "Outputs \"Over limit\" when the weekly total is greater than 7000",
      "Adds 1 to the over-limit count for each such household",
      "Compares each weekly total with the lowest so far, storing the new lowest and the household's name",
      "Adds each weekly total to the borehole total",
      "After the loops, outputs the borehole total, the over-limit count and the name of the lowest user, with messages",
    ],
    explanation: "Nested loops over the 2D array with validation; per-household totals, a conditional count, a minimum with its name and a grand total.",
    modelAnswer: "```\nDECLARE House : INTEGER\nDECLARE Day : INTEGER\nDECLARE WeekTotal : INTEGER\nDECLARE BoreholeTotal : INTEGER\nDECLARE OverLimit : INTEGER\nDECLARE LowestTotal : INTEGER\nDECLARE LowestName : STRING\n\nBoreholeTotal ← 0\nOverLimit ← 0\nLowestTotal ← 99999                        // above any possible weekly total\nFOR House ← 1 TO 40\n    WeekTotal ← 0\n    FOR Day ← 1 TO 7\n        OUTPUT \"Litres used by \", Households[House], \" on day \", Day\n        INPUT Litres[House, Day]\n        WHILE Litres[House, Day] < 0 OR Litres[House, Day] > 2000 DO\n            OUTPUT \"Litres must be from 0 to 2000, enter again\"\n            INPUT Litres[House, Day]\n        ENDWHILE\n        WeekTotal ← WeekTotal + Litres[House, Day]\n    NEXT Day\n    BoreholeTotal ← BoreholeTotal + WeekTotal\n    IF WeekTotal > 7000                     // flag heavy users\n        THEN\n            OUTPUT Households[House], \" \", WeekTotal, \" litres, average \", ROUND(WeekTotal / 7, 1), \" Over limit\"\n            OverLimit ← OverLimit + 1\n        ELSE\n            OUTPUT Households[House], \" \", WeekTotal, \" litres, average \", ROUND(WeekTotal / 7, 1)\n    ENDIF\n    IF WeekTotal < LowestTotal              // lowest user so far\n        THEN\n            LowestTotal ← WeekTotal\n            LowestName ← Households[House]\n    ENDIF\nNEXT House\nOUTPUT \"Total drawn from the borehole: \", BoreholeTotal, \" litres\"\nOUTPUT \"Households over the limit: \", OverLimit\nOUTPUT \"Lowest use: \", LowestName\n```",
  });
});
