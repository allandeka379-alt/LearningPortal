// Slice w4b: Cambridge 0478 Paper 2 exam-format items: 2 STRUCTURED 12-mark (arrays and string handling;
// procedures, functions and files) and 4 EXTENDED_RESPONSE 15-mark scenario questions.
import { concept, P, CAM, SCENARIO_LEVELS } from "../lib.mjs";
import { fence, C, LENGTH, SUBSTRING, arrayMd } from "./w4b-0-kit.mjs";

// ---- P2 item 1: arrays and string handling.
const Codes = ["MUT0412C", "HRE1187B", "MUT0935A", "GWE2210C", "MUT1406B", "HRE0078C"];
const codeLoop = `Count ← 0
FOR Index ← 1 TO 6
    IF SUBSTRING(Codes[Index], 1, 3) = "MUT"
        THEN
            Count ← Count + 1
            OUTPUT SUBSTRING(Codes[Index], 4, 4)
    ENDIF
NEXT Index
OUTPUT Count`;
const mutOut = Codes.filter((c) => SUBSTRING(c, 1, 3) === "MUT").map((c) => SUBSTRING(c, 4, 4));
const mutCount = mutOut.length;

// ---- P2 item 2: procedures, functions and files.
const codeShop = `FUNCTION Discount(Total : REAL, Loyal : BOOLEAN) RETURNS REAL
    IF Loyal AND Total >= 100
        THEN
            RETURN Total * 0.1
        ELSE
            RETURN 0
    ENDIF
ENDFUNCTION

PROCEDURE SaveSale(Customer : STRING, Amount : REAL)
    OPENFILE "sales.txt" FOR WRITE
    WRITEFILE "sales.txt", Customer
    WRITEFILE "sales.txt", Amount
    CLOSEFILE "sales.txt"
ENDPROCEDURE`;
const discount = (t, loyal) => (loyal && t >= 100 ? Number((t * 0.1).toFixed(2)) : 0);
const d1 = discount(150, true);
const d2 = discount(150, false);
const d3 = discount(100, true);
const linesAfterThree = 2; // WRITE mode recreates the file on each call: only the last sale's 2 lines remain.

// ---- Scenario model answers.
const s1Model = `DECLARE Route : INTEGER
DECLARE Day : INTEGER
DECLARE RouteTotal : INTEGER
DECLARE Highest : INTEGER
DECLARE BusiestRoute : INTEGER
DECLARE ChosenDay : INTEGER
DECLARE DayTotal : INTEGER
DECLARE Average : REAL

// weekly totals, averages and the busiest route
Highest ← -1
BusiestRoute ← 0
FOR Route ← 1 TO 8
    RouteTotal ← 0
    FOR Day ← 1 TO 7
        RouteTotal ← RouteTotal + Passengers[Route, Day]
    NEXT Day
    Average ← ROUND(RouteTotal / 7, 1)
    OUTPUT RouteName[Route], " total: ", RouteTotal, " average per day: ", Average
    IF RouteTotal > Highest
        THEN
            Highest ← RouteTotal
            BusiestRoute ← Route
    ENDIF
NEXT Route
OUTPUT "Busiest route: ", RouteName[BusiestRoute], " with ", Highest, " passengers"

// total for one chosen day
REPEAT
    OUTPUT "Enter a day number (1 = Monday to 7 = Sunday)"
    INPUT ChosenDay
    IF ChosenDay < 1 OR ChosenDay > 7
        THEN
            OUTPUT "Day must be from 1 to 7"
    ENDIF
UNTIL ChosenDay >= 1 AND ChosenDay <= 7
DayTotal ← 0
FOR Route ← 1 TO 8
    DayTotal ← DayTotal + Passengers[Route, ChosenDay]
NEXT Route
OUTPUT "Passengers on day ", ChosenDay, ": ", DayTotal`;

const s2Model = `DECLARE ItemWanted : STRING
DECLARE Index : INTEGER
DECLARE Found : BOOLEAN
DECLARE Quantity : INTEGER
DECLARE Takings : REAL
DECLARE SaleCost : REAL

Takings ← 0.0
OUTPUT "Enter item name (END to finish)"
INPUT ItemWanted
WHILE ItemWanted <> "END" DO
    // linear search for the item
    Found ← FALSE
    Index ← 0
    WHILE Found = FALSE AND Index < 50 DO
        Index ← Index + 1
        IF ItemName[Index] = ItemWanted
            THEN
                Found ← TRUE
        ENDIF
    ENDWHILE
    IF Found = FALSE
        THEN
            OUTPUT "Item not found"
        ELSE
            IF Stock[Index] = 0
                THEN
                    OUTPUT "Out of stock"
                ELSE
                    REPEAT
                        OUTPUT "Quantity (1 to ", Stock[Index], ")"
                        INPUT Quantity
                        IF Quantity < 1 OR Quantity > Stock[Index]
                            THEN
                                OUTPUT "Invalid quantity"
                        ENDIF
                    UNTIL Quantity >= 1 AND Quantity <= Stock[Index]
                    Stock[Index] ← Stock[Index] - Quantity
                    SaleCost ← Price[Index] * Quantity
                    Takings ← Takings + SaleCost
                    OUTPUT "Cost of this sale: ", SaleCost
            ENDIF
    ENDIF
    OUTPUT "Enter item name (END to finish)"
    INPUT ItemWanted
ENDWHILE
OUTPUT "Total takings: ", Takings

// items to reorder
OPENFILE "reorder.txt" FOR WRITE
FOR Index ← 1 TO 50
    IF Stock[Index] < 5
        THEN
            WRITEFILE "reorder.txt", ItemName[Index]
    ENDIF
NEXT Index
CLOSEFILE "reorder.txt"`;

const s3Model = `DECLARE Athlete : INTEGER
DECLARE Heat : INTEGER
DECLARE Best : REAL
DECLARE Total : REAL
DECLARE Average : REAL
DECLARE FastestTime : REAL
DECLARE FastestAthlete : INTEGER
DECLARE UnderCount : INTEGER

FastestTime ← 61.0
FastestAthlete ← 0
UnderCount ← 0
FOR Athlete ← 1 TO 16
    Total ← 0.0
    FOR Heat ← 1 TO 3
        REPEAT
            OUTPUT "Time for ", AthleteName[Athlete], " in heat ", Heat
            INPUT Times[Athlete, Heat]
            IF Times[Athlete, Heat] < 9.5 OR Times[Athlete, Heat] > 60.0
                THEN
                    OUTPUT "Time must be from 9.5 to 60.0 seconds"
            ENDIF
        UNTIL Times[Athlete, Heat] >= 9.5 AND Times[Athlete, Heat] <= 60.0
        Total ← Total + Times[Athlete, Heat]
    NEXT Heat
    Best ← Times[Athlete, 1]
    FOR Heat ← 2 TO 3
        IF Times[Athlete, Heat] < Best
            THEN
                Best ← Times[Athlete, Heat]
        ENDIF
    NEXT Heat
    Average ← ROUND(Total / 3, 2)
    OUTPUT AthleteName[Athlete], " best: ", Best, " average: ", Average
    IF Best < FastestTime
        THEN
            FastestTime ← Best
            FastestAthlete ← Athlete
    ENDIF
    IF Average < 12.0
        THEN
            UnderCount ← UnderCount + 1
    ENDIF
NEXT Athlete
OUTPUT "Fastest athlete: ", AthleteName[FastestAthlete], " with ", FastestTime, " seconds"
OUTPUT "Athletes averaging under 12.0 seconds: ", UnderCount`;

const s4Model = `FUNCTION IsValidID(ID : STRING) RETURNS BOOLEAN
    DECLARE Valid : BOOLEAN
    DECLARE Position : INTEGER
    DECLARE Ch : STRING
    Valid ← TRUE
    IF LENGTH(ID) <> 7
        THEN
            Valid ← FALSE
        ELSE
            IF SUBSTRING(ID, 1, 2) <> "ZW"
                THEN
                    Valid ← FALSE
            ENDIF
            FOR Position ← 3 TO 6
                Ch ← SUBSTRING(ID, Position, 1)
                IF Ch < "0" OR Ch > "9"
                    THEN
                        Valid ← FALSE
                ENDIF
            NEXT Position
            Ch ← SUBSTRING(ID, 7, 1)
            IF Ch < "A" OR Ch > "Z"
                THEN
                    Valid ← FALSE
            ENDIF
    ENDIF
    RETURN Valid
ENDFUNCTION

DECLARE EnteredID : STRING
DECLARE Index : INTEGER
DECLARE Found : BOOLEAN
DECLARE ValidCount : INTEGER
DECLARE FoundCount : INTEGER

ValidCount ← 0
FoundCount ← 0
OUTPUT "Enter a learner ID (STOP to finish)"
INPUT EnteredID
EnteredID ← UCASE(EnteredID)
WHILE EnteredID <> "STOP" DO
    IF IsValidID(EnteredID) = FALSE
        THEN
            OUTPUT "Invalid format"
        ELSE
            ValidCount ← ValidCount + 1
            Found ← FALSE
            Index ← 0
            WHILE Found = FALSE AND Index < 500 DO
                Index ← Index + 1
                IF LearnerID[Index] = EnteredID
                    THEN
                        Found ← TRUE
                ENDIF
            ENDWHILE
            IF Found
                THEN
                    FoundCount ← FoundCount + 1
                    OUTPUT "Registered at position ", Index
                ELSE
                    OUTPUT "Not registered"
            ENDIF
    ENDIF
    OUTPUT "Enter a learner ID (STOP to finish)"
    INPUT EnteredID
    EnteredID ← UCASE(EnteredID)
ENDWHILE
OUTPUT "Valid IDs entered: ", ValidCount
OUTPUT "Registered IDs found: ", FoundCount`;

// JS mirror of IsValidID to check the scenario's examples.
const isValidID = (id) => {
  if (LENGTH(id) !== 7) return false;
  let ok = SUBSTRING(id, 1, 2) === "ZW";
  for (let p = 3; p <= 6; p++) {
    const ch = SUBSTRING(id, p, 1);
    if (ch < "0" || ch > "9") ok = false;
  }
  const last = SUBSTRING(id, 7, 1);
  if (last < "A" || last > "Z") ok = false;
  return ok;
};
if (!isValidID("ZW2741K") || isValidID("ZW27A1K") || isValidID("ZA2741K") || isValidID("ZW27411")) throw new Error("IsValidID examples");

const ext = (b, o) =>
  b.ext({
    d: 5, skill: "CREATION", examStyle: true, paper: "Paper 2", marks: 15, secs: 1350, calculator: false,
    levels: SCENARIO_LEVELS, wordLimit: { max: 600 },
    ...o,
  });

concept(C("prog.arrays-1d"), { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, calculator: false,
    concepts: [C("prog.arrays-1d"), C("prog.string-handling"), C("prog.iteration")],
    hints: ["Number the characters of each code: 3 letters, 4 digits, 1 letter.", "SUBSTRING(s, start, length) starts at position 1."],
    stem: `A college with campuses in Mutare (MUT), Harare (HRE) and Gweru (GWE) gives each learner a code made of the campus letters, a four-digit number and a course letter (A, B or C). Six codes are stored in the array \`Codes\`:\n\n${arrayMd("Codes", Codes)}\n\n${fence(codeLoop)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement declares the array `Codes`?",
        options: [["`DECLARE Codes : ARRAY[1:6] OF STRING`", "Correct: six elements, each a string."], ["`DECLARE Codes : ARRAY[1:6] OF CHAR`", "Each code has eight characters, so CHAR is too small."], ["`DECLARE Codes : ARRAY[1:8] OF STRING`", "There are 6 codes; 8 is the length of each code."], ["`DECLARE Codes : STRING[1:6]`", "The ARRAY keyword and OF clause are missing."]],
        answer: "A", explanation: "`DECLARE <identifier> : ARRAY[<lower>:<upper>] OF <type>`.",
      }),
      P.num({ label: "(b)", stem: "State the value returned by `LENGTH(Codes[2])`.", value: LENGTH(Codes[1]), wrong: [LENGTH(Codes[1]) - 1], explanation: `"${Codes[1]}" has ${LENGTH(Codes[1])} characters.`, workedSolution: `1. 3 letters + 4 digits + 1 letter.\n2. ${LENGTH(Codes[1])}.` }),
      P.short({ label: "(c)", stem: "State the value returned by `SUBSTRING(Codes[4], 1, 3)`.", accepted: [SUBSTRING(Codes[3], 1, 3)], wrong: [SUBSTRING(Codes[2], 1, 3)], explanation: `Codes[4] is "${Codes[3]}"; its first three characters are "${SUBSTRING(Codes[3], 1, 3)}".` }),
      P.fib({
        label: "(d)", marks: 3, stem: "Complete the values output inside the loop, in order.",
        template: "First: {{blank:a}}, second: {{blank:b}}, third: {{blank:c}}",
        blanks: mutOut.map((v, i) => ({ id: "abc"[i], accepted: [v] })),
        wrong: [mutOut.map((v) => SUBSTRING(v, 1, 3))],
        explanation: `Only codes starting "MUT" are processed: ${Codes.filter((c) => c.startsWith("MUT")).join(", ")}. SUBSTRING(…, 4, 4) gives ${mutOut.join(", ")}.`,
      }),
      P.num({ label: "(e)", stem: "State the final value output.", value: mutCount, wrong: [Codes.length], explanation: `${mutCount} codes start with MUT.`, workedSolution: `1. MUT codes at indexes ${Codes.map((c, i) => (c.startsWith("MUT") ? i + 1 : null)).filter(Boolean).join(", ")}.\n2. Count = ${mutCount}.` }),
      P.manual({
        label: "(f)", marks: 5,
        stem: "Write pseudocode that inputs a course letter, accepting only A, B or C in either upper or lower case (re-input until valid), and then outputs how many codes in `Codes` end with that letter.",
        points: [
          "Prompt and INPUT of the letter, converted with UCASE",
          "Validation loop that repeats until the letter is A, B or C (with an error message or prompt)",
          "Counter initialised to 0 and a loop over all 6 elements",
          "Extracts the last character with SUBSTRING(Codes[Index], 8, 1) or SUBSTRING(Codes[Index], LENGTH(Codes[Index]), 1) and compares it with the letter",
          "Increments the counter and outputs it after the loop with a message",
        ],
        modelAnswer: "```\nREPEAT\n    OUTPUT \"Enter course letter (A, B or C)\"\n    INPUT Course\n    Course ← UCASE(Course)\nUNTIL Course = \"A\" OR Course = \"B\" OR Course = \"C\"\nCourseCount ← 0\nFOR Index ← 1 TO 6\n    IF SUBSTRING(Codes[Index], LENGTH(Codes[Index]), 1) = Course\n        THEN\n            CourseCount ← CourseCount + 1\n    ENDIF\nNEXT Index\nOUTPUT \"Learners on course \", Course, \": \", CourseCount\n```",
      }),
    ],
    explanation: `(b) ${LENGTH(Codes[1])}; (c) ${SUBSTRING(Codes[3], 1, 3)}; (d) ${mutOut.join(", ")}; (e) ${mutCount}.`,
  });

  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, calculator: false,
    concepts: [C("prog.subroutines"), C("prog.file-handling"), C("prog.selection")],
    hints: ["Both conditions must be TRUE for a discount.", "What does WRITE mode do to an existing file?"],
    stem: `A hardware shop in Gweru uses this function and procedure.\n\n${fence(codeShop)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which of these is a parameter of `SaveSale`?",
        options: [["Amount", "Correct: it is listed in the procedure header."], ["Discount", "Discount is a function."], ["sales.txt", "This is the name of a file."], ["Loyal", "Loyal is a parameter of Discount, not SaveSale."]],
        answer: "A", explanation: "SaveSale's parameters are Customer and Amount.",
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "State the value returned by each call.",
        template: "`Discount(150, TRUE)`: {{blank:a}}\n\n`Discount(150, FALSE)`: {{blank:b}}",
        blanks: [
          { id: "a", accepted: [String(d1), d1.toFixed(1)], input: "number" },
          { id: "b", accepted: [String(d2), "0.0"], input: "number" },
        ],
        wrong: [["0", "15"]],
        explanation: `Loyal and 150 >= 100: 150 × 0.1 = ${d1}. Not loyal: ${d2}.`,
      }),
      P.num({ label: "(c)", stem: "State the value returned by `Discount(100, TRUE)`.", value: d3, wrong: [0], explanation: `100 >= 100 is TRUE, so 100 × 0.1 = ${d3}.`, workedSolution: `1. Loyal is TRUE and 100 >= 100 is TRUE.\n2. 100 × 0.1 = ${d3}.` }),
      P.num({ label: "(d)", stem: "`SaveSale` is called three times, for three different customers. How many lines does `sales.txt` contain afterwards?", value: linesAfterThree, wrong: [6], explanation: "Each call opens the file FOR WRITE, which starts a new file, so only the last customer's 2 lines remain.", workedSolution: "1. Each call: OPENFILE … FOR WRITE empties the file.\n2. Then 2 lines are written.\n3. After the third call: 2 lines." }),
      P.mcq({
        label: "(e)", stem: "Why is `Discount` written as a function but `SaveSale` as a procedure?",
        options: [["Discount returns a value; SaveSale only performs a task", "Correct: SaveSale stores data and returns nothing."], ["A function is not allowed to open or write to files", "A function could use a file; the difference is the returned value."], ["Procedures cannot have REAL parameters", "Amount is a REAL parameter of SaveSale."], ["Discount has two parameters and SaveSale has none", "SaveSale also has two parameters, and procedures may have parameters."]],
        answer: "A", explanation: "A function returns a single value to its call; a procedure does not.",
      }),
      P.manual({
        label: "(f)", marks: 6,
        stem: "Write the main program. It inputs a customer's name, the total of their purchase (re-input until it is greater than 0) and whether they are a loyalty-card holder (Y or N). It calculates the amount to pay using `Discount`, outputs it, and saves the sale with `SaveSale`.",
        points: [
          "Inputs the customer name with a prompt",
          "Inputs the total with a loop that repeats until Total > 0",
          "Inputs Y/N and sets a BOOLEAN (e.g. Loyal ← (Answer = \"Y\")) or uses IF",
          "Calculates Amount ← Total - Discount(Total, Loyal) (function called in an expression, no CALL)",
          "Outputs the amount to pay with a message",
          "CALL SaveSale(CustomerName, Amount) with arguments in the right order",
        ],
        modelAnswer: "```\nOUTPUT \"Customer name?\"\nINPUT CustomerName\nREPEAT\n    OUTPUT \"Purchase total (greater than 0)?\"\n    INPUT Total\nUNTIL Total > 0\nOUTPUT \"Loyalty card? (Y/N)\"\nINPUT Answer\nIF UCASE(Answer) = \"Y\"\n    THEN\n        Loyal ← TRUE\n    ELSE\n        Loyal ← FALSE\nENDIF\nAmount ← Total - Discount(Total, Loyal)\nOUTPUT \"Amount to pay: \", Amount\nCALL SaveSale(CustomerName, Amount)\n```",
      }),
    ],
    explanation: `(b) ${d1} and ${d2}; (c) ${d3}; (d) ${linesAfterThree} lines.`,
  });

  ext(b, {
    concepts: [C("prog.arrays-2d"), C("prog.arrays-1d"), C("prog.iteration"), C("prog.selection"), C("prog.operators")],
    hints: ["Reset the route total for each route.", "Validate the day number with a loop."],
    stem: "A bus company in Harare runs 8 routes. The one-dimensional array `RouteName[1:8]` stores the name of each route. The two-dimensional array `Passengers[1:8, 1:7]` stores the number of passengers carried on each route (row) on each day of last week (column 1 is Monday, column 7 is Sunday). Both arrays are already populated.\n\nWrite a program that:\n\n- outputs, for every route, its name, its total number of passengers for the week and its average number of passengers per day, rounded to 1 decimal place\n- outputs the name of the route with the highest weekly total and that total\n- inputs a day number and outputs the total number of passengers carried on all routes on that day.\n\nThe day number input must be validated. You must use pseudocode or program code and add comments to explain how your code works. You do not need to declare the arrays or initialise their data.",
    points: [
      "Declares the variables used, with suitable data types",
      "Outer loop over the 8 routes",
      "Route total reset to 0 for each route, before the inner loop",
      "Inner loop over the 7 days adding Passengers[Route, Day] to the route total",
      "Calculates the average as route total / 7",
      "Rounds the average to 1 decimal place with ROUND(…, 1)",
      "Outputs RouteName[Route], the total and the average for each route with messages",
      "Initialises the highest total (and its route) before the route loop",
      "Compares each route total with the highest and stores the new highest and its route index",
      "Outputs the name of the busiest route and its total after the loop",
      "Prompts for and inputs a day number",
      "Validates the day number (1 to 7) with a loop that repeats with an error message until valid",
      "Day total initialised to 0 and a loop over the 8 routes adding Passengers[Route, ChosenDay]",
      "Outputs the day total with a message",
      "Uses the given array names with route as the row and day as the column throughout, and comments the code",
    ],
    modelAnswer: fence(s1Model),
    explanation: "Nested loops give route totals and averages; a maximum is tracked in the outer loop; a validated day number selects a column to total.",
  });

  ext(b, {
    concepts: [C("prog.arrays-1d"), C("prog.file-handling"), C("prog.iteration"), C("prog.selection")],
    hints: ["Search ItemName for the item; the same index gives its price and stock.", "Open the file once, before the loop that writes to it."],
    stem: "The tuck shop at a school in Bulawayo sells 50 items. Three one-dimensional arrays are already populated:\n\n- `ItemName[1:50]` stores the name of each item\n- `Price[1:50]` stores the price of each item in dollars\n- `Stock[1:50]` stores the number of each item in stock.\n\nThe same index refers to the same item in all three arrays.\n\nWrite a program that:\n\n- repeatedly inputs the name of an item being sold, until `END` is entered\n- searches for the item and outputs a message if it is not found or is out of stock\n- otherwise inputs the quantity sold, which must be from 1 to the number in stock, updates the stock level and outputs the cost of the sale\n- outputs the total takings when `END` is entered\n- then writes the name of every item with fewer than 5 in stock to a new text file `reorder.txt`.\n\nAll inputs must be validated. You must use pseudocode or program code and add comments to explain how your code works.",
    points: [
      "Declares variables with suitable data types and initialises the total takings to 0",
      "Inputs the item name with a prompt before the loop and again at the end of the loop body",
      "Loop that ends when END is entered (END is not processed as a sale)",
      "Linear search through ItemName[1:50] comparing with the input",
      "Search stops when found (flag or condition) and the index of the item is kept",
      "Outputs a message when the item is not found",
      "Outputs a message when the item is out of stock",
      "Inputs the quantity with a prompt",
      "Validates the quantity: at least 1 and no more than Stock[Index], with an error message and re-input",
      "Updates Stock[Index] by subtracting the quantity",
      "Calculates the cost as Price[Index] * quantity, adds it to the takings and outputs it",
      "Outputs the total takings after the loop",
      "Opens reorder.txt FOR WRITE once, before the loop that writes to it",
      "Loops over all 50 items and writes ItemName[Index] when Stock[Index] < 5",
      "Closes the file after the loop",
    ],
    modelAnswer: fence(s2Model),
    explanation: "A rogue-value loop around a linear search over parallel arrays, a validated quantity, stock and takings updates, then a file of items to reorder.",
  });

  ext(b, {
    concepts: [C("prog.arrays-2d"), C("prog.arrays-1d"), C("prog.iteration"), C("prog.selection"), C("prog.operators")],
    hints: ["Validate each time inside the inner loop.", "Start the best time at the first heat's time."],
    stem: "An athletics meeting in Gweru has 16 athletes in the 100 m. The one-dimensional array `AthleteName[1:16]` is already populated with their names. Each athlete runs three heats, and their times in seconds will be stored in the two-dimensional array `Times[1:16, 1:3]` (row = athlete, column = heat), which is declared but empty.\n\nWrite a program that:\n\n- inputs and stores the three heat times for each athlete; each time must be from 9.5 to 60.0 seconds inclusive\n- calculates each athlete's best (lowest) time and average time, rounded to 2 decimal places, and outputs them with the athlete's name\n- outputs the name and time of the athlete with the fastest best time\n- outputs how many athletes have an average time below 12.0 seconds.\n\nAll inputs must be validated. You must use pseudocode or program code and add comments to explain how your code works.",
    points: [
      "Declares variables with suitable data types (REAL for times and averages)",
      "Outer loop over the 16 athletes and inner loop over the 3 heats",
      "Prompts with the athlete's name and heat number and inputs into Times[Athlete, Heat]",
      "Validates each time (9.5 to 60.0 inclusive) with a loop that repeats until valid",
      "Outputs an error message for an invalid time",
      "Total for each athlete reset to 0 before the heats and each valid time added",
      "Best time initialised for each athlete (e.g. to the first heat's time)",
      "Compares each heat's time with the best and replaces it when lower",
      "Calculates the average as total / 3",
      "Rounds the average with ROUND(…, 2)",
      "Outputs the athlete's name, best time and average",
      "Fastest time (and athlete index) initialised before the athlete loop and updated when an athlete's best is lower",
      "Outputs the name and time of the fastest athlete after the loops",
      "Counter of averages below 12.0 initialised to 0 and incremented correctly",
      "Outputs the count with a message",
    ],
    modelAnswer: fence(s3Model),
    explanation: "Input into a 2D array with validation, a per-row minimum and average, an overall minimum with its index, and a conditional count.",
  });

  ext(b, {
    concepts: [C("prog.string-handling"), C("prog.subroutines"), C("prog.arrays-1d"), C("prog.iteration"), C("prog.selection")],
    hints: ["Check the length before using SUBSTRING.", "A character is a digit if it is from \"0\" to \"9\"."],
    stem: "A school in Masvingo gives every learner an ID of exactly 7 characters: the letters `ZW`, then four digits, then one upper-case letter, for example `ZW2741K`. The one-dimensional array `LearnerID[1:500]` is already populated with the IDs of registered learners.\n\nWrite a program that:\n\n- includes a function `IsValidID` that takes an ID as a parameter and returns TRUE if it has the correct format and FALSE otherwise\n- repeatedly inputs an ID, converts it to upper case, and stops when `STOP` is entered\n- outputs `Invalid format` for an ID that fails the format check\n- for a valid ID, searches `LearnerID` and outputs its position in the array, or `Not registered`\n- when `STOP` is entered, outputs how many valid IDs were entered and how many of them were registered.\n\nYou must use pseudocode or program code and add comments to explain how your code works.",
    points: [
      "Function header with a STRING parameter and RETURNS BOOLEAN, ending with ENDFUNCTION",
      "Checks the length is 7 with LENGTH",
      "Checks the first two characters are \"ZW\" with SUBSTRING(ID, 1, 2)",
      "Loop over positions 3 to 6 using SUBSTRING(ID, Position, 1)",
      "Tests each of those characters is a digit (from \"0\" to \"9\")",
      "Tests the seventh character is a letter from \"A\" to \"Z\"",
      "Returns TRUE only when every check passes, otherwise FALSE",
      "Inputs an ID with a prompt and converts it with UCASE",
      "Loop that repeats until STOP is entered, with the next input at the end of the loop body",
      "Calls IsValidID in a condition (no CALL) and outputs Invalid format when it returns FALSE",
      "Counts the valid IDs entered",
      "Linear search through LearnerID[1:500] for a valid ID",
      "Stops the search when found and outputs the position (index)",
      "Outputs Not registered when the ID is not found, and counts the IDs that are found",
      "Outputs both counts after the loop with messages",
    ],
    modelAnswer: fence(s4Model),
    explanation: "String functions inside a validation function, a rogue-value input loop, a linear search and two counters.",
  });
});
