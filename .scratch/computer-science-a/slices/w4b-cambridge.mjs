// W4b exam-format items: three Cambridge Paper 2 structured questions (CAM_P2_SHORT, 12 marks) and three Paper 2 final
// scenario questions (15 marks, self-marked) on programming constructs, procedures and functions, strings and files.
import { concept, P, EXAM, CAM_P2_SCENARIO, SCENARIO_LEVELS, checkExam, CAM, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { pm } from "../tables/w4b-q.mjs";

const Z = { skill: EXAM.CAM_P2_SHORT.skill, secs: EXAM.CAM_P2_SHORT.secs, examStyle: true, applies: CAM };
const SC = { skill: CAM_P2_SCENARIO.skill, secs: CAM_P2_SCENARIO.secs, examStyle: true, applies: CAM };
const C = (k) => `acs.${k}`;
const DIV = (a, b) => Math.floor(a / b);
const MOD = (a, b) => a - b * Math.floor(a / b);

concept(C("prog.iteration"), { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  // ================================================================== P2 SHORT 1: selection and iteration
  {
    const inputs = [14, -5, 30, 8, -1];
    let count = 0, total = 0, high = 0, passes = 0, i = 0, reading;
    do { reading = inputs[i++]; passes++; if (reading >= 0) { count++; total += reading; if (reading > high) high = reading; } } while (reading !== -1);
    same([count, total, high, passes], [3, 52, 30, 5]);
    const code = `DECLARE Reading, Count, Total, High : INTEGER
Count ← 0
Total ← 0
High ← 0
REPEAT
    INPUT Reading
    IF Reading >= 0 THEN
        Count ← Count + 1
        Total ← Total + Reading
        IF Reading > High THEN
            High ← Reading
        ENDIF
    ENDIF
UNTIL Reading = -1
OUTPUT Count, " ", Total, " ", High`;
    same(py(`count = total = high = 0
vals = [14, -5, 30, 8, -1]
i = 0
while True:
    reading = vals[i]
    i += 1
    if reading >= 0:
        count += 1
        total += reading
        if reading > high:
            high = reading
    if reading == -1:
        break
print(count, total, high)`), "3 52 30");
    b.struct({
      ...Z, d: 3, paper: "Cambridge Paper 2", calculator: false,
      concepts: [C("prog.iteration"), C("prog.selection")],
      stem: `A weather station in Kariba records daily rainfall readings in millimetres. A technician writes this pseudocode. The readings 14, -5, 30, 8 and -1 are entered in that order. The value -1 ends the input.\n\n${codeBlock(code)}`,
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.fib({ label: "(a)", marks: 3, stem: "State the final values of the variables.", template: "Count = {{blank:a}}\n\nTotal = {{blank:b}}\n\nHigh = {{blank:c}}", blanks: [{ id: "a", input: "number", accepted: [String(count)] }, { id: "b", input: "number", accepted: [String(total)] }, { id: "c", input: "number", accepted: [String(high)] }], wrong: [["4", "52", "30"]], explanation: "-5 and -1 fail the test Reading >= 0, so only 14, 30 and 8 are counted: Count 3, Total 52, High 30." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of times the statement `INPUT Reading` is executed.", value: passes, wrong: [3, 4], workedSolution: "One input for each of the values 14, -5, 30, 8 and -1.", explanation: "The loop body runs 5 times." }),
        pm("(c)", "Which statement describes the type of loop used?", ["A post-condition loop, because the test is made after the body has run", "REPEAT ... UNTIL tests at the end."], [["A pre-condition loop, because the test is made before the body runs", "That describes WHILE."], ["A count-controlled loop, because it runs a fixed number of times", "The number of passes depends on the data."], ["A nested loop, because it contains an IF statement", "A selection inside a loop is not a nested loop."]], "REPEAT ... UNTIL is a post-condition loop."),
        P.manual({ label: "(d)", marks: 2, stem: "The value -5 was ignored silently. Describe a change that would tell the technician that an invalid reading was entered.", points: ["Add an ELSE branch (or a separate test) for readings below 0 that are not -1", "Output an error message in that branch (and optionally ask again)"], modelAnswer: "Test for a reading below 0 that is not -1 and output a message such as \"Invalid reading\" in an ELSE branch.", explanation: "Report invalid data." }),
        P.manual({ label: "(e)", marks: 2, stem: "Write the pseudocode that should be added after the loop to output the average of the readings, or the message `No readings` if none were counted.", points: ["Tests Count > 0 (or Count <> 0) before the division", "Outputs Total / Count in one branch and \"No readings\" in the other"], modelAnswer: codeBlock(`IF Count > 0 THEN
    OUTPUT Total / Count
ELSE
    OUTPUT "No readings"
ENDIF`), explanation: "Avoid division by zero." }),
        P.manual({ label: "(f)", marks: 3, stem: "Rewrite the loop using a `WHILE ... ENDWHILE` loop, so that it gives the same results.", points: ["Reads the first value before the loop", "WHILE Reading <> -1 DO with the same IF statements inside", "Reads the next value at the end of the loop body"], modelAnswer: codeBlock(`INPUT Reading
WHILE Reading <> -1 DO
    IF Reading >= 0 THEN
        Count ← Count + 1
        Total ← Total + Reading
        IF Reading > High THEN
            High ← Reading
        ENDIF
    ENDIF
    INPUT Reading
ENDWHILE`), explanation: "A WHILE loop needs a first read before the loop and a read at the end." }),
      ]),
      hints: ["Follow the readings one at a time and decide whether each passes the test Reading >= 0.", "A WHILE loop tests before the first pass."],
      explanation: "Count 3, Total 52 and High 30 after 5 passes; REPEAT is a post-condition loop.",
    });
  }

  // ================================================================== P2 SHORT 2: procedures and functions with BYVAL / BYREF
  {
    const split = (total) => { const hours = DIV(total, 3600); const rest = MOD(total, 3600); const minutes = DIV(rest, 60); return { hours, minutes, seconds: total }; };
    const r = split(9000);
    same([r.hours, r.minutes, r.seconds], [2, 30, 9000]);
    const rate = (h) => (h >= 2 ? 3.0 : 1.5);
    const cost = r.hours * rate(r.hours) + r.minutes * 0.05;
    chk(cost, 7.5);
    const byrefSeconds = MOD(9000, 3600);
    chk(byrefSeconds, 1800);
    const code = `PROCEDURE Split(BYVAL Total : INTEGER, BYREF Hours : INTEGER, BYREF Minutes : INTEGER)
    Hours ← DIV(Total, 3600)
    Total ← MOD(Total, 3600)
    Minutes ← DIV(Total, 60)
ENDPROCEDURE

FUNCTION Rate(Hours : INTEGER) RETURNS REAL
    IF Hours >= 2 THEN
        RETURN 3.0
    ELSE
        RETURN 1.5
    ENDIF
ENDFUNCTION

Seconds ← 9000
CALL Split(Seconds, H, M)
Cost ← H * Rate(H) + M * 0.05
OUTPUT Cost`;
    b.struct({
      ...Z, d: 4, paper: "Cambridge Paper 2", calculator: false,
      concepts: [C("prog.procedures-functions")],
      stem: `A car park in Mutare charges for the time a car stays. The time in seconds is split into hours and minutes, and the cost in USD is calculated. This pseudocode is used.\n\n${codeBlock(code)}`,
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.fib({ label: "(a)", marks: 3, stem: "State the values of `H`, `M` and `Seconds` after the statement `CALL Split(Seconds, H, M)` has been executed.", template: "H = {{blank:a}}\n\nM = {{blank:b}}\n\nSeconds = {{blank:c}}", blanks: [{ id: "a", input: "number", accepted: [String(r.hours)] }, { id: "b", input: "number", accepted: [String(r.minutes)] }, { id: "c", input: "number", accepted: [String(r.seconds)] }], wrong: [["2", "30", "1800"]], explanation: "9000 DIV 3600 = 2 hours, the remainder is 1800, and 1800 DIV 60 = 30 minutes. Total is passed by value, so Seconds is unchanged." }),
        P.num({ label: "(b)", marks: 2, stem: "State the value output.", value: cost, wrong: [6, 7], workedSolution: "Rate(2) is 3.0, so 2 × 3.0 = 6.0; 30 × 0.05 = 1.5; 6.0 + 1.5 = 7.5.", explanation: "The cost is 7.5." }),
        pm("(c)", "Why is the parameter `Total` declared `BYVAL`?", ["So that `Seconds` is not changed by the procedure", "The procedure changes its copy of Total."], [["So that the procedure can return a value to the main program as well", "That is the purpose of BYREF."], ["So that the procedure can be called more than once in a program", "Any procedure can be called many times."], ["So that Total can store a much larger number than other variables", "BYVAL does not affect the size of a value."]], "The procedure assigns a new value to Total, and BYVAL stops this reaching the caller."),
        P.manual({ label: "(d)", marks: 3, stem: "Write the pseudocode for a procedure `ShowTime` that takes the hours and minutes by value and outputs them in the form `2 h 30 min`.", points: ["PROCEDURE header with two BYVAL INTEGER parameters and ENDPROCEDURE", "Outputs the hours and the text h", "Outputs the minutes and the text min"], modelAnswer: codeBlock(`PROCEDURE ShowTime(BYVAL Hours : INTEGER, BYVAL Minutes : INTEGER)
    OUTPUT Hours, " h ", Minutes, " min"
ENDPROCEDURE`), explanation: "A procedure with value parameters and an output." }),
        P.num({ label: "(e)", marks: 1, stem: "The header is changed to `BYREF Total : INTEGER`. State the value of `Seconds` after `CALL Split(Seconds, H, M)`.", value: byrefSeconds, wrong: [9000, 0], workedSolution: "Total ← MOD(Total, 3600) now changes Seconds itself: 9000 MOD 3600 = 1800.", explanation: "The caller's variable is changed to 1800." }),
        P.manual({ label: "(f)", marks: 2, stem: "State two reasons why the calculation is divided into the routines `Split` and `Rate`.", points: ["Each routine has one job and can be tested on its own", "The routines can be reused (for example Rate in another program) and changed without altering the rest"], modelAnswer: "Each routine has one job and can be tested on its own, and a routine such as Rate can be reused or changed without altering the rest of the program.", explanation: "Modular design." }),
      ]),
      hints: ["A BYVAL parameter is a copy; a BYREF parameter is the caller's variable.", "Work out Hours and the remainder first."],
      explanation: "H is 2 and M is 30, Seconds is unchanged because Total is by value, and the cost is 7.5.",
    });
  }

  // ================================================================== P2 SHORT 3: string handling
  {
    const name = "Tendai Moyo";
    let space = 0;
    for (let i = 1; i <= name.length; i++) if (name.substr(i - 1, 1) === " ") space = i;
    const surname = name.substr(space, name.length - space);
    const user = name.substr(0, 1).toLowerCase() + surname.toLowerCase();
    same([space, surname, user], [7, "Moyo", "tmoyo"]);
    const mid = name.substr(2, 4);
    same(mid, "ndai");
    const code = `DECLARE Name, Surname, User : STRING
DECLARE Space, Index : INTEGER
Name ← "Tendai Moyo"
Space ← 0
FOR Index ← 1 TO LENGTH(Name)
    IF MID(Name, Index, 1) = " " THEN
        Space ← Index
    ENDIF
NEXT Index
Surname ← MID(Name, Space + 1, LENGTH(Name) - Space)
User ← TO_LOWER(LEFT(Name, 1)) & TO_LOWER(Surname)
OUTPUT User`;
    b.struct({
      ...Z, d: 4, paper: "Cambridge Paper 2", calculator: false,
      concepts: [C("prog.programming-basics"), C("prog.iteration")],
      stem: `A school in Chipinge creates a user name for each learner from the full name. The functions used are: \`LENGTH(S)\` returns the number of characters in \`S\`; \`MID(S, X, N)\` returns \`N\` characters of \`S\` starting at position \`X\` (the first character is position 1); \`LEFT(S, N)\` returns the first \`N\` characters; \`TO_LOWER(S)\` returns \`S\` in lower case; \`&\` joins two strings.\n\n${codeBlock(code)}`,
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.num({ label: "(a)", marks: 1, stem: "State the value of `Space` when the loop ends.", value: space, wrong: [6, 11], workedSolution: "The space is the 7th character of \"Tendai Moyo\".", explanation: "Space is 7." }),
        P.short({ label: "(b)", marks: 1, stem: "State the value of `Surname`.", accepted: [surname], explanation: "MID(Name, 8, 4) is the 4 characters from position 8: Moyo." }),
        P.short({ label: "(c)", marks: 1, stem: "State the value output.", accepted: [user], explanation: "The lower-case first letter t followed by moyo." }),
        pm("(d)", "What is the value of `MID(Name, 3, 4)`?", [mid, "The 4 characters from position 3 are n, d, a, i."], [["enda", "That starts at position 2."], ["dai M", "That starts at position 4 and has 5 characters."], ["Tend", "That starts at position 1."]], "MID(S, 3, 4) starts at the 3rd character."),
        P.manual({ label: "(e)", marks: 3, stem: "The name `Rudo` has no space. Describe what the algorithm does for this name and the problem it causes.", points: ["Space stays 0, because the test for a space is never true", "MID(Name, 1, 4) gives the whole name, so Surname is Rudo (and LENGTH - 0 = 4)", "The user name is rudo with the first letter repeated: rr... (the first letter + the whole name = rrudo), which is wrong"], modelAnswer: "Space stays 0. Surname becomes the whole name Rudo, and the user name is the first letter r followed by rudo, giving rrudo, which is wrong. The algorithm should test for Space = 0.", explanation: "No space is a case the algorithm does not handle." }),
        P.manual({ label: "(f)", marks: 3, stem: "Write a pseudocode function `Initials` that takes a full name containing exactly one space and returns the first letter of the first name and the first letter of the surname, in upper case, for example `TM`.", points: ["FUNCTION header with a STRING parameter and RETURNS STRING, ended by ENDFUNCTION", "Finds the position of the space (loop or a function) and uses MID or LEFT to take the first letters", "Joins the two letters with & after TO_UPPER, and returns the result"], modelAnswer: codeBlock(`FUNCTION Initials(FullName : STRING) RETURNS STRING
    DECLARE Space, Index : INTEGER
    Space ← 0
    FOR Index ← 1 TO LENGTH(FullName)
        IF MID(FullName, Index, 1) = " " THEN
            Space ← Index
        ENDIF
    NEXT Index
    RETURN TO_UPPER(LEFT(FullName, 1)) & TO_UPPER(MID(FullName, Space + 1, 1))
ENDFUNCTION`), explanation: "Find the space, then take the two letters." }),
        P.manual({ label: "(g)", marks: 2, stem: "State one test, other than the name `Tendai Moyo`, that should be used on the algorithm, and the expected result.", points: ["A name that tests an unhandled case, such as a name with no space (Rudo) or with two spaces", "The expected result stated: a sensible user name or message (not rrudo), or the surname after the last space"], modelAnswer: "The name Rudo, which has no space. The expected result is a sensible message or user name, not rrudo.", explanation: "Test the case that is not handled." }),
      ]),
      hints: ["Find the position of the space first.", "MID takes the start position and the number of characters."],
      explanation: "Space is 7, Surname is Moyo, and the user name is tmoyo.",
    });
  }

  // ================================================================== SCENARIO 1: procedures and functions (bus routes)
  {
    const Route = ["Harare", "Mutare", "Gweru", "Masvingo", "Kadoma", "Chegutu", "Karoi", "Rusape"];
    const Km = [30, 263, 275, 292, 20, 11, 75, 170];
    const Riders = [38, 12, 25, 18, 40, 60, 9, 14];
    const fare = (km) => Math.max(1.0, km * 0.1);
    const incomes = Km.map((k, i) => fare(k) * Riders[i]);
    const total = incomes.reduce((a, c) => a + c, 0);
    const best = incomes.indexOf(Math.max(...incomes));
    // mirror of the model answer
    const lines = [];
    let t = 0;
    for (let i = 0; i < 8; i++) { const inc = fare(Km[i]) * Riders[i]; lines.push(`${Route[i]} ${round2(inc)}`); t += inc; }
    function round2(x) { return Math.round(x * 100) / 100; }
    chk(round2(t), round2(total));
    const tbl = mdTable(["Index", "1", "2", "3", "4", "5", "6", "7", "8"], [["Route", ...Route], ["Km", ...Km], ["Riders", ...Riders]]);
    const model = codeBlock(`FUNCTION Fare(Distance : INTEGER) RETURNS REAL
    DECLARE Amount : REAL
    Amount ← Distance * 0.1
    IF Amount < 1.00 THEN
        Amount ← 1.00
    ENDIF
    RETURN Amount
ENDFUNCTION

PROCEDURE ShowIncome(BYVAL Index : INTEGER, BYREF Total : REAL)
    DECLARE Income : REAL
    Income ← Fare(Km[Index]) * Riders[Index]
    OUTPUT Route[Index], " ", Income
    Total ← Total + Income
ENDPROCEDURE

DECLARE Total, Income, Highest : REAL
DECLARE Index, Best : INTEGER
Total ← 0
Highest ← 0
FOR Index ← 1 TO 8
    CALL ShowIncome(Index, Total)
    Income ← Fare(Km[Index]) * Riders[Index]
    IF Income > Highest THEN
        Highest ← Income
        Best ← Index
    ENDIF
NEXT Index
OUTPUT "Total income: ", Total
OUTPUT "Highest income: ", Route[Best]`);
    b.ext({
      ...SC, d: 4, paper: "Cambridge Paper 2", marks: 15,
      concepts: [C("prog.procedures-functions"), C("prog.iteration")],
      hints: ["Write the function first, then the procedure that uses it.", "The procedure needs one BYVAL and one BYREF parameter."],
      stem: `A bus company in Harare stores details of eight routes in three arrays that have already been filled with data:\n\n- \`Route\`, a one-dimensional array of 8 STRING values (indexes 1 to 8)\n- \`Km\`, a one-dimensional array of 8 INTEGER values: the distance of the route in kilometres\n- \`Riders\`, a one-dimensional array of 8 INTEGER values: the number of passengers on the route in one day\n\nThe first three elements of the arrays are \`Harare\`, 30, 38; \`Mutare\`, 263, 12; and \`Gweru\`, 275, 25.\n\nThe fare for a passenger is USD 0.10 for each kilometre, but never less than USD 1.00.\n\nWrite pseudocode for:\n\n- a function \`Fare(Distance : INTEGER)\` that returns the fare for a route of that distance\n- a procedure \`ShowIncome(Index, Total)\` where \`Index\` is passed by value and \`Total\` by reference. It works out the income of the route at \`Index\` (fare multiplied by riders), outputs the route name and the income, and adds the income to \`Total\`\n- a main program that calls the procedure for every route, then outputs the total income and the name of the route with the highest income.\n\nYou do not need to validate the data. [15]`,
      points: [
        ["The function Fare has a header with an INTEGER parameter and RETURNS REAL, and ends with ENDFUNCTION", 1],
        ["Calculates the fare as Distance * 0.1", 1],
        ["Tests whether the fare is less than 1.00 and sets or returns 1.00 in that case", 1],
        ["Returns the fare with RETURN", 1],
        ["The procedure header has Index BYVAL and Total BYREF, with the correct types, and ends with ENDPROCEDURE", 2],
        ["Calculates the income as Fare(Km[Index]) * Riders[Index] using the function and the given arrays", 2],
        ["Outputs the route name and the income", 1],
        ["Adds the income to Total", 1],
        ["Sets Total (and the highest income) to 0 before the loop in the main program", 1],
        ["A loop from 1 to 8 that calls the procedure with CALL, passing the index and Total", 2],
        ["Finds the highest income and the index of that route, with a comparison inside the loop", 1],
        ["Outputs the total income and the name of the route with the highest income after the loop", 1],
      ],
      levels: SCENARIO_LEVELS, wordLimit: { max: 600 },
      modelAnswer: model + `\n\nFor the given data the total income is ${round2(total)} and the route with the highest income is ${Route[best]} (checked by a mirror of this algorithm). Other correct algorithms also score the marks.`,
      explanation: "A complete answer defines the function with the minimum fare, the procedure with a value and a reference parameter, and a main loop that calls the procedure and tracks the highest income.",
    });
    // the data table is part of the stem above for the first three elements; the full table is used to check the mirror only
    void tbl;
  }

  // ================================================================== SCENARIO 2: functions, validation and a procedure (rainfall)
  {
    const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const Rain = [180, 150, 120, 45, 10, 3, 2, 4, 15, 40, 110, 170];
    const avg = Rain.reduce((a, c) => a + c, 0) / 12;
    chk(avg, 70.75);
    const above = (lim) => Rain.filter((r) => r > lim);
    const lim = 100;
    same(above(lim).length, 5);
    const ml = Month.filter((m, i) => Rain[i] > lim);
    same(ml, ["Jan", "Feb", "Mar", "Nov", "Dec"]);
    const model = codeBlock(`FUNCTION AverageRain() RETURNS REAL
    DECLARE Total : REAL
    DECLARE Index : INTEGER
    Total ← 0
    FOR Index ← 1 TO 12
        Total ← Total + Rain[Index]
    NEXT Index
    RETURN Total / 12
ENDFUNCTION

FUNCTION CountAbove(Limit : REAL) RETURNS INTEGER
    DECLARE Count, Index : INTEGER
    Count ← 0
    FOR Index ← 1 TO 12
        IF Rain[Index] > Limit THEN
            Count ← Count + 1
        ENDIF
    NEXT Index
    RETURN Count
ENDFUNCTION

PROCEDURE ShowWet(BYVAL Limit : REAL)
    DECLARE Index : INTEGER
    FOR Index ← 1 TO 12
        IF Rain[Index] > Limit THEN
            OUTPUT Month[Index], " ", Rain[Index]
        ENDIF
    NEXT Index
ENDPROCEDURE

DECLARE Limit : REAL
REPEAT
    OUTPUT "Enter a limit in mm (0 to 1000)"
    INPUT Limit
UNTIL Limit >= 0 AND Limit <= 1000
OUTPUT "Average rainfall: ", AverageRain()
OUTPUT "Months above the limit: ", CountAbove(Limit)
CALL ShowWet(Limit)`);
    // mirror
    const run = (limits) => {
      const out = []; let k = 0; let L;
      do { L = limits[k++]; } while (!(L >= 0 && L <= 1000));
      out.push(`Average rainfall: ${avg}`, `Months above the limit: ${Rain.filter((r) => r > L).length}`);
      Month.forEach((m, i) => { if (Rain[i] > L) out.push(`${m} ${Rain[i]}`); });
      return out;
    };
    same(run([-5, 1200, 100]), [`Average rainfall: ${avg}`, "Months above the limit: 5", "Jan 180", "Feb 150", "Mar 120", "Nov 110", "Dec 170"]);
    b.ext({
      ...SC, d: 4, paper: "Cambridge Paper 2", marks: 15,
      concepts: [C("prog.procedures-functions"), C("prog.iteration"), C("prog.selection")],
      hints: ["Write the two functions and the procedure first; each uses a loop from 1 to 12.", "The input limit needs a loop that repeats until it is in range."],
      stem: "A weather station in Gweru stores the monthly rainfall for one year in two arrays that have already been filled with data:\n\n- `Month`, a one-dimensional array of 12 STRING values (indexes 1 to 12), for example `\"Jan\"`\n- `Rain`, a one-dimensional array of 12 REAL values (indexes 1 to 12): the rainfall in millimetres in the month in `Month` at the same index.\n\nWrite pseudocode for:\n\n- a function `AverageRain()` that returns the mean of the 12 rainfall values\n- a function `CountAbove(Limit : REAL)` that returns the number of months whose rainfall is greater than `Limit`\n- a procedure `ShowWet(Limit : REAL)` that outputs the name and rainfall of every month whose rainfall is greater than `Limit`\n- a main program that inputs a limit, repeating the input until it is from 0 to 1000 inclusive, outputs the average rainfall, outputs the number of months above the limit and calls the procedure to show those months. [15]",
      points: [
        ["AverageRain: function header with RETURNS REAL and no parameters", 1],
        ["AverageRain: totals the 12 values with a loop and returns the total divided by 12", 2],
        ["CountAbove: function header with a REAL parameter and RETURNS INTEGER", 1],
        ["CountAbove: loop through the 12 months comparing each rainfall with the limit (greater than)", 2],
        ["CountAbove: counter initialised to 0, incremented when the test is true, and returned", 1],
        ["ShowWet: procedure header with the Limit parameter and ENDPROCEDURE", 1],
        ["ShowWet: loop through the 12 months with the correct comparison", 1],
        ["ShowWet: outputs the month name and rainfall at the same index", 1],
        ["Main: input inside a loop that repeats until the limit is from 0 to 1000 (both limits tested)", 2],
        ["Main: outputs the average rainfall from the function", 1],
        ["Main: outputs the number of months above the limit from the function", 1],
        ["Main: calls the procedure with CALL and the limit", 1],
      ],
      levels: SCENARIO_LEVELS, wordLimit: { max: 600 },
      modelAnswer: model + `\n\nFor the data 180, 150, 120, 45, 10, 3, 2, 4, 15, 40, 110, 170 and a limit of 100 the program outputs 5 months (Jan, Feb, Mar, Nov and Dec) (checked by a mirror). Other correct algorithms also score the marks.`,
      explanation: "A complete answer defines two functions and a procedure that loop through the 12 values, and a main program that validates the limit and uses them.",
    });
  }

  // ================================================================== SCENARIO 3: files with a procedure and a function (transactions)
  {
    const amounts = [25.5, 100, 12, 60.25, 8];
    const total = amounts.reduce((a, c) => a + c, 0);
    chk(total, 205.75);
    chk(Math.max(...amounts), 100);
    const model = codeBlock(`PROCEDURE LoadAmounts(BYREF Count : INTEGER)
    DECLARE Line : STRING
    Count ← 0
    OPENFILE "Trans.txt" FOR READ
    WHILE NOT EOF("Trans.txt") DO
        READFILE "Trans.txt", Line
        Count ← Count + 1
        Amount[Count] ← STR_TO_NUM(Line)
    ENDWHILE
    CLOSEFILE "Trans.txt"
ENDPROCEDURE

FUNCTION Largest(BYVAL Count : INTEGER) RETURNS REAL
    DECLARE Max : REAL
    DECLARE Index : INTEGER
    Max ← Amount[1]
    FOR Index ← 2 TO Count
        IF Amount[Index] > Max THEN
            Max ← Amount[Index]
        ENDIF
    NEXT Index
    RETURN Max
ENDFUNCTION

DECLARE Count, Index : INTEGER
DECLARE Total : REAL
CALL LoadAmounts(Count)
Total ← 0
FOR Index ← 1 TO Count
    Total ← Total + Amount[Index]
NEXT Index
OPENFILE "Summary.txt" FOR WRITE
WRITEFILE "Summary.txt", NUM_TO_STR(Count)
WRITEFILE "Summary.txt", NUM_TO_STR(Total)
WRITEFILE "Summary.txt", NUM_TO_STR(Largest(Count))
CLOSEFILE "Summary.txt"
OUTPUT "Summary saved"`);
    // mirror run in Python against real files
    const mirrorOut = py(`import os, tempfile
os.chdir(tempfile.mkdtemp())
with open("Trans.txt", "w") as f:
    for a in [25.5, 100, 12, 60.25, 8]:
        print(a, file=f)
amount = []
with open("Trans.txt") as f:
    for line in f:
        amount.append(float(line))
count = len(amount)
largest = amount[0]
for i in range(1, count):
    if amount[i] > largest:
        largest = amount[i]
total = 0
for a in amount:
    total = total + a
with open("Summary.txt", "w") as f:
    print(count, file=f)
    print(total, file=f)
    print(largest, file=f)
print(open("Summary.txt").read().split())`);
    same(mirrorOut, "['5', '205.75', '100.0']");
    b.ext({
      ...SC, d: 5, paper: "Cambridge Paper 2", marks: 15,
      concepts: [C("prog.file-processing-exceptions"), C("prog.procedures-functions")],
      hints: ["Reading the file into the array comes first; everything else uses the array.", "Remember to open, use and close each file."],
      stem: "A mobile-money agent in Kwekwe saves the amount of each transaction of the day as a line of text in the file `Trans.txt`. There is one amount on each line, and the file holds at least 1 and at most 100 lines. The one-dimensional array `Amount` of 100 REAL values (indexes 1 to 100) has been declared.\n\nWrite pseudocode for:\n\n- a procedure `LoadAmounts(Count)`, where `Count` is passed by reference, that reads every line of `Trans.txt` into the array `Amount` and sets `Count` to the number of lines read\n- a function `Largest(Count)`, where `Count` is passed by value, that returns the largest amount in the first `Count` elements of `Amount`\n- a main program that calls the procedure, calculates the total of the amounts, and writes three lines to a new file `Summary.txt`: the number of transactions, the total and the largest amount. It then outputs `Summary saved`.\n\nYou may assume that every line of the file holds a valid number. [15]",
      points: [
        ["LoadAmounts: procedure header with Count passed BYREF, and ENDPROCEDURE", 1],
        ["LoadAmounts: opens Trans.txt for reading and closes it after the loop", 2],
        ["LoadAmounts: loop that tests EOF before each read", 1],
        ["LoadAmounts: reads a line with READFILE and converts it with STR_TO_NUM into Amount at the next index", 2],
        ["LoadAmounts: Count set to 0 before the loop and increased once for each line", 1],
        ["Largest: function header with a BYVAL INTEGER parameter and RETURNS REAL", 1],
        ["Largest: starts from the first element and compares the others in a loop that uses Count as the limit", 2],
        ["Largest: updates the maximum when a larger value is found and returns it", 1],
        ["Main: calls LoadAmounts with Count and totals the Count amounts in a loop", 2],
        ["Main: opens Summary.txt for writing, writes the three values with WRITEFILE and closes the file", 2],
      ],
      levels: SCENARIO_LEVELS, wordLimit: { max: 600 },
      modelAnswer: model + "\n\nFor the five amounts 25.5, 100, 12, 60.25 and 8 the file holds 5, 205.75 and 100.0 (checked by a mirror). Other correct algorithms also score the marks.",
      explanation: "A complete answer reads the file into the array with an EOF loop, finds the largest value, totals the amounts and writes three lines to the new file.",
    });
  }
});
