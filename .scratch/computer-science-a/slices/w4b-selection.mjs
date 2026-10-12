// Slice w4b: selection, IF and CASE (acs.prog.selection, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.selection", { file: "prog/selection", keyPrefix: "prog.selection" }, (b) => {
  // ---- fare rule mirrored in JS and checked in Python
  const fare = (age) => (age < 5 ? 0 : age < 17 ? 1 : age >= 60 ? 1 : 2);
  const ages = [4, 5, 16, 17, 59, 60];
  const fares = ages.map(fare);
  same(fares, [0, 1, 1, 2, 2, 1]);
  const fareCode = `IF Age < 5 THEN
    Fare ← 0
ELSE
    IF Age < 17 OR Age >= 60 THEN
        Fare ← 1
    ELSE
        Fare ← 2
    ENDIF
ENDIF`;
  same(py(`def f(a):
    if a < 5:
        return 0
    elif a < 17 or a >= 60:
        return 1
    else:
        return 2
print([f(a) for a in ${JSON.stringify(ages)}])`), "[0, 1, 1, 2, 2, 1]");

  // ---- order trap
  const trapOut = py(`score = 72
if score >= 50:
    print("Merit")
elif score >= 70:
    print("Distinction")
else:
    print("Fail")`);
  same(trapOut, "Merit");

  // ---- pump controller (6-mark structured)
  const pump = (level, power) => (level < 20 ? (power ? "PUMP ON" : "WAIT") : level > 90 ? "PUMP OFF" : "NO CHANGE");
  const cases = [[15, true], [15, false], [50, true], [95, true]];
  const pumpOut = cases.map(([l, p]) => pump(l, p));
  same(pumpOut, ["PUMP ON", "WAIT", "NO CHANGE", "PUMP OFF"]);
  const pumpCode = `IF Level < 20 THEN
    IF PowerAvailable = TRUE THEN
        OUTPUT "PUMP ON"
    ELSE
        OUTPUT "WAIT"
    ENDIF
ELSE
    IF Level > 90 THEN
        OUTPUT "PUMP OFF"
    ELSE
        OUTPUT "NO CHANGE"
    ENDIF
ENDIF`;

  // ---- bonus after IF chain
  let bonus = 0; const sales = 180; const years = 3;
  if (sales >= 200) bonus = 50; else if (sales >= 150 && years >= 2) bonus = 30; else if (sales >= 150) bonus = 20; else bonus = 5;
  chk(bonus, 30);

  // ---- multiple choice
  mc(b, 1, "RECALL", "Which keyword ends an `IF` statement in 9618-style pseudocode?",
    ["`ENDIF`", "Every IF is closed with ENDIF."],
    [["`END IF`", "The keyword is one word."], ["`NEXT`", "NEXT ends a FOR loop."], ["`ENDCASE`", "ENDCASE ends a CASE statement."]],
    "IF is closed by ENDIF; CASE by ENDCASE; FOR by NEXT.");
  mc(b, 2, "APPLICATION", "A discount is given to customers aged at least 60. Which condition is correct?",
    ["`Age >= 60`", "At least 60 includes 60."],
    [["`Age > 60`", "That excludes a customer who is exactly 60."], ["`Age < 60`", "That is the opposite group."], ["`Age = 60`", "That tests only one age."]],
    "At least means greater than or equal to.", { daily: true });
  mc(b, 2, "APPLICATION", "Which condition is TRUE only when `Temp` is from 18 to 25 inclusive?",
    ["`Temp >= 18 AND Temp <= 25`", "Both comparisons must be true for a value in the range."],
    [["`Temp >= 18 OR Temp <= 25`", "Every number satisfies at least one of these."], ["`Temp > 18 AND Temp < 25`", "The boundary values 18 and 25 are excluded."], ["`Temp <= 18 AND Temp >= 25`", "No number is both at most 18 and at least 25."]],
    "A range needs AND with >= and <=.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A mobile menu has six fixed options numbered 1 to 6 and an error message for any other number. Which construct is the most suitable?",
    ["`CASE OF` with `OTHERWISE`", "One value is compared with several fixed alternatives."],
    [["A single `IF` with no `ELSE`", "That handles one outcome only."], ["`REPEAT ... UNTIL`", "That is iteration, not selection."], ["Six unrelated `IF` statements, each with an `ELSE`", "Each ELSE would print the error for the other five numbers."]],
    "CASE is for one expression against fixed values; OTHERWISE is the default.");
  mc(b, 3, "APPLICATION", "What is output by this Python code?\n\n" + codeBlock(`score = 72
if score >= 50:
    print("Merit")
elif score >= 70:
    print("Distinction")
else:
    print("Fail")`, "python"),
    [trapOut, "The first true condition, score >= 50, runs and the rest are skipped."],
    [["Distinction", "That branch is never reached because the earlier condition is true."], ["Fail", "72 is above 50."], ["Merit and Distinction", "Only one branch of an if/elif chain runs."]],
    "The first true condition decides; the order of the tests matters.", { hints: ["Which condition is tested first?"] });
  mc(b, 3, "UNDERSTANDING", "Which condition is equivalent to `NOT (Age >= 13 AND HasPermission = TRUE)`?",
    ["`Age < 13 OR HasPermission = FALSE`", "De Morgan's law: NOT (A AND B) = (NOT A) OR (NOT B)."],
    [["`Age < 13 AND HasPermission = FALSE`", "NOT turns AND into OR."], ["`Age >= 13 OR HasPermission = FALSE`", "The first comparison must be reversed as well."], ["`Age < 13 OR HasPermission = TRUE`", "The second comparison must be reversed as well."]],
    "Reverse each condition and swap AND for OR.", { hints: ["Apply De Morgan's laws."] });
  mc(b, 2, "RECALL", "Which Python line correctly tests whether `x` equals 5?",
    ["`if x == 5:`", "== compares; a colon ends the line."],
    [["`if x = 5:`", "= is assignment and is a syntax error here."], ["`if x := 5`", "That is an assignment expression with no colon."], ["`if (x equals 5)`", "equals is not a Python operator."]],
    "Python uses == for equality.", { daily: true });
  mc(b, 3, "ANALYSIS", "A program accepts a whole number of kilograms from 1 to 50 inclusive. Which value is a boundary test for the upper limit?",
    ["50", "It is the largest valid value."],
    [["25", "A value in the middle is normal data."], ["0", "That is outside the lower limit."], ["-10", "That is abnormal data far outside the range."]],
    "Boundary data lies at the edge of the range (50 and also 51, just outside).", { hints: ["The boundary of a range is its largest or smallest allowed value."] });

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a chain of nested `IF ... ELSE` statements (Python `if/elif/else`), once a condition is found to be true the remaining conditions in the chain are not tested.", answer: true,
    explanation: "True. The chain stops at the first true condition, which is why the order of the conditions matters." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A `CASE` statement is the best way to test whether a mark is 40 or more.", answer: false,
    explanation: "False. CASE compares one value with fixed values or ranges; a single comparison such as `Mark >= 40` is an IF statement." });

  // ---- fill in the blank, numerical, short, match
  b.fib({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Follow the conditions from the top for each age."],
    stem: "A bus fare in USD is set by this algorithm.\n\n" + codeBlock(fareCode) + "\nState the value of `Fare` for each age.",
    template: ages.map((a, i) => `Age ${a}: Fare = {{blank:f${i}}}`).join("\n\n"),
    blanks: fares.map((f, i) => ({ id: `f${i}`, input: "number", accepted: [String(f)] })), wrong: [["2", "2", "2", "2", "2", "2"]],
    explanation: "Ages under 5 travel free; ages 5 to 16 and 60 or over pay 1; all other ages pay 2." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Test the conditions in order until one is true."],
    stem: "Find the value of `Bonus` after this algorithm is run with `Sales` = 180 and `Years` = 3.\n\n" + codeBlock(`IF Sales >= 200 THEN
    Bonus ← 50
ELSE
    IF Sales >= 150 AND Years >= 2 THEN
        Bonus ← 30
    ELSE
        IF Sales >= 150 THEN
            Bonus ← 20
        ELSE
            Bonus ← 5
        ENDIF
    ENDIF
ENDIF`),
    value: bonus, wrong: [50, 20, 5], workedSolution: "Sales >= 200 is false. Sales >= 150 AND Years >= 2 is true (180 >= 150 and 3 >= 2), so Bonus is 30 and the rest is skipped.", explanation: "Bonus is 30." });
  b.short({ d: 2, skill: "RECALL", stem: "State the keyword used in a `CASE` statement for the branch that runs when no other value matches.", accepted: ["OTHERWISE", "otherwise"], wrong: ["ELSE"], explanation: "OTHERWISE is the default branch of CASE." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each description to the correct condition for a variable `N`.",
    pairs: [["N is at least 5", "`N >= 5`"], ["N is more than 5", "`N > 5`"], ["N is at most 5", "`N <= 5`"], ["N is not equal to 5", "`N <> 5`"], ["N is less than 5", "`N < 5`"]],
    explanation: "At least and at most include the value; more than and less than do not." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Test the highest class first, or give each test both limits."],
    stem: "A cinema in Bulawayo charges 3 for a child under 12, 5 for a person aged 12 to 59 and 3 for a person aged 60 or over. Write pseudocode that inputs an age and outputs the price. [4]",
    points: ["Inputs the age", "Correct condition for the child price (Age < 12)", "Correct condition for the age 60 and over, or the adult range with both limits", "Outputs the correct price in every branch (using ELSE or all cases covered)"],
    modelAnswer: codeBlock(`INPUT Age
IF Age < 12 OR Age >= 60 THEN
    Price ← 3
ELSE
    Price ← 5
ENDIF
OUTPUT "Price: ", Price`), explanation: "Two groups pay the same price, so one OR condition covers both." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3, hints: ["Dry run the code with the mark 95."],
    stem: "This Python code should output Pass for 40 or more and Distinction for 80 or more, but a mark of 95 outputs only Pass.\n\n" + codeBlock(`if mark >= 40:
    print("Pass")
elif mark >= 80:
    print("Distinction")`, "python") + "\nExplain the error and write the corrected code. [3]",
    points: ["The condition mark >= 40 is true for 95, so the elif is never tested", "The most restrictive condition (80) must be tested first", "Corrected: test mark >= 80 first, then mark >= 40"],
    modelAnswer: codeBlock(`if mark >= 80:
    print("Distinction")
elif mark >= 40:
    print("Pass")`, "python"), explanation: "The order of an elif chain matters." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Think about the number of values compared and the type of comparison."],
    stem: "Compare the use of a `CASE` statement and a nested `IF` statement. [3]",
    points: ["CASE compares one expression with a list of fixed values or ranges, so it is clearer for menus and codes", "IF can test ranges, different variables and compound conditions that CASE cannot", "Either can express the same choice; CASE avoids long deeply indented nests (or IF is needed where conditions are not about one value)"],
    modelAnswer: "CASE compares a single expression against fixed values, which makes menus easier to read. Nested IF statements can test ranges, several variables and compound conditions. CASE avoids deep nesting.", explanation: "Choose the construct that matches the form of the decision." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Use int(input()) and an if/elif/else chain."],
    stem: "Write a Python program that reads the temperature of a classroom as a whole number and outputs Too cold if it is below 16, Too hot if it is above 30, and Comfortable otherwise. [4]",
    points: ["Reads the input and converts it to an integer", "Correct condition and output for below 16", "Correct condition and output for above 30", "Outputs Comfortable in the else branch"],
    modelAnswer: codeBlock(`temperature = int(input())
if temperature < 16:
    print("Too cold")
elif temperature > 30:
    print("Too hot")
else:
    print("Comfortable")`, "python"), explanation: "Two tests and a default branch cover every value." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Follow the outer condition first.", "A boolean variable is already TRUE or FALSE."],
    explanation: "A nested selection for a borehole pump.",
    stem: `A borehole pump at a farm near Gweru is controlled by this algorithm. \`Level\` is the percentage of water in the tank and \`PowerAvailable\` is TRUE when the electricity supply is on.\n\n${codeBlock(pumpCode)}`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "State the output for each set of values.", template: cases.map(([l, p], i) => `Level ${l}, PowerAvailable ${p ? "TRUE" : "FALSE"}: {{blank:c${i}}}`).join("\n\n"),
        blanks: cases.map((_, i) => ({ id: `c${i}`, accepted: [pumpOut[i]], choices: ["PUMP ON", "PUMP OFF", "WAIT", "NO CHANGE"] })), explanation: "A level below 20 starts the pump if there is power and waits if not; above 90 stops it; otherwise nothing changes." }),
      pm("(b)", "Which Level value is a boundary test for the condition `Level < 20`?", ["20", "20 is just outside the condition and 19 just inside."], [["10", "A value well inside the range is normal data."], ["50", "A middle value is normal data for the whole algorithm."], ["100", "That is the largest possible value, not the boundary of this condition."]], "Boundary tests use the value at the edge of the condition."),
      P.manual({ label: "(c)", marks: 1, stem: "State why the pump does not need a test for power when the tank is above 90 percent.", points: ["The pump is being switched off, which does not need electricity (or the output is PUMP OFF)"], modelAnswer: "Switching the pump off does not need power.", explanation: "Only starting the pump needs power." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Check each age against the conditions in order.", "Use a table of test data with expected results."],
    explanation: "Test data and a trace for a fare algorithm.",
    stem: `A bus company in Masvingo writes this algorithm to work out a fare in USD for a passenger from their age.\n\n${codeBlock(fareCode)}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "State the fare for the ages 4, 17 and 60.", template: "Age 4: {{blank:a}}\n\nAge 17: {{blank:b}}\n\nAge 60: {{blank:c}}", blanks: [{ id: "a", input: "number", accepted: [String(fare(4))] }, { id: "b", input: "number", accepted: [String(fare(17))] }, { id: "c", input: "number", accepted: [String(fare(60))] }], wrong: [["1", "1", "2"]], explanation: "Age 4 is free; 17 is not under 17 and not 60 or over, so it pays 2; 60 pays 1." }),
      pm("(b)", "Which age is a boundary value for the free-travel rule?", ["5", "It is the smallest age that is not free."], [["2", "A normal value well inside the free group."], ["30", "A normal adult value."], ["-1", "An abnormal value."]], "5 is just outside the condition Age < 5."),
      P.manual({ label: "(c)", marks: 2, stem: "State one abnormal test value for the algorithm and describe what the algorithm does with it.", points: ["A negative age such as -3 or a very large age such as 200", "The algorithm does not reject it: a negative age is treated as under 5 and gets a free fare (a large age gets 1)"], modelAnswer: "An age of -3. The algorithm accepts it and gives a free fare, because -3 is less than 5.", explanation: "The algorithm has no validation of the age." }),
      P.manual({ label: "(d)", marks: 2, stem: "Write the lines to add before the algorithm so that an age below 0 or above 120 outputs an error message and the fare is not calculated.", points: ["A condition rejecting Age < 0 OR Age > 120", "Outputs an error message and puts the fare calculation in the ELSE branch (or stops)"], modelAnswer: codeBlock(`IF Age < 0 OR Age > 120 THEN
    OUTPUT "Invalid age"
ELSE
    // the fare algorithm goes here
ENDIF`), explanation: "Validation protects the calculation." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Selection", "A construct that chooses which statements to run by evaluating a Boolean condition.");
  b.card("FACT", "IF in pseudocode", "IF condition THEN ... ELSE ... ENDIF; Python: if / elif / else with a colon and indentation.");
  b.card("FACT", "CASE in pseudocode", "CASE OF expression, branches value : statement, OTHERWISE for the default, ENDCASE. Python: match / case.");
  b.card("CONCEPT", "Choosing between IF and CASE", "CASE for one expression against fixed values (menus, codes); IF for ranges, several variables and compound conditions.");
  b.card("FACT", "Range test", "Inside a range: x >= low AND x <= high. Outside a range: x < low OR x > high.");
  b.card("FACT", "De Morgan's laws", "NOT (A AND B) = (NOT A) OR (NOT B); NOT (A OR B) = (NOT A) AND (NOT B).");
  b.card("CONCEPT", "Order of conditions", "In an if/elif chain the first true condition runs and the rest are skipped, so test the most restrictive condition first.");
  b.card("FACT", "Equality in Python", "= assigns and == compares. In pseudocode = tests equality inside a condition and the arrow assigns.");
  b.card("CONCEPT", "Test data for selection", "Normal data, every boundary value (on each side of the limit) and abnormal data that should be rejected.");
});
