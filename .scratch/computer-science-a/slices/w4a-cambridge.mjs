// W4a exam-format items for Cambridge only: three CAM_P2_SHORT (12 marks), three Paper 2 scenario questions (15 marks) and
// two Paper 4 tasks (25 marks), all on algorithms and data structures.
import { concept, P, EXAM, CAM_P2_SCENARIO, SCENARIO_LEVELS, checkExam, CAM, chk, same, mdTable, codeBlock, py, round } from "../lib.mjs";
import { pm } from "../tables/w4a-q.mjs";
import { arrayMd } from "../tables/w4a-util.mjs";

const P2 = { skill: EXAM.CAM_P2_SHORT.skill, secs: EXAM.CAM_P2_SHORT.secs, examStyle: true, applies: CAM };
const SC = { skill: CAM_P2_SCENARIO.skill, secs: CAM_P2_SCENARIO.secs, examStyle: true, applies: CAM };
const P4 = { skill: EXAM.CAM_P4_TASK.skill, secs: EXAM.CAM_P4_TASK.secs, examStyle: true, applies: CAM };
const C = (k) => `acs.${k}`;

concept(C("algo.trace-tables"), { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // ================================================================== P2 SHORT 1: trace and correct an algorithm
  {
    const mark = [64, 50, 45, 73, 38, 50, 82, 57];
    let passes = 0, total = 0, afterFour = null;
    mark.forEach((m, i) => { if (m > 50) { passes++; total += m; } if (i === 3) afterFour = [passes, total]; });
    chk(passes, 4); chk(total, 276); chk(total / passes, 69); same(afterFour, [2, 137]);
    let p2 = 0, t2 = 0; mark.forEach((m) => { if (m >= 50) { p2++; t2 += m; } });
    chk(p2, 6); chk(t2, 376); chk(round(t2 / p2, 2), 62.67);
    const code = `PassMark ← 50
Passes ← 0
Total ← 0
FOR Index ← 1 TO 8
    IF Mark[Index] > PassMark THEN
        Passes ← Passes + 1
        Total ← Total + Mark[Index]
    ENDIF
NEXT Index
Average ← Total / Passes
OUTPUT Passes, Average`;
    b.struct({
      ...P2, d: 4, paper: "Cambridge Paper 2",
      concepts: [C("algo.trace-tables"), C("algo.algorithm-design")],
      stem: "A teacher in Gweru wants to know how many of eight learners passed a test (a pass is a mark of **50 or more**) and the mean mark of the learners who passed. The marks are stored in the array `Mark`, indexes 1 to 8.\n\n" + arrayMd(mark, { name: "Mark" }) + "\n\nThe teacher's algorithm is:\n\n" + codeBlock(code),
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.fib({ label: "(a)", marks: 2, stem: "State the values of `Passes` and `Total` after the pass of the loop with `Index` = 4.", template: "Passes = {{blank:p}}, Total = {{blank:t}}", blanks: [{ id: "p", accepted: ["2"], input: "number" }, { id: "t", accepted: ["137"], input: "number" }], wrong: [["4", "276"]], explanation: "Only 64 and 73 are greater than 50 in the first four marks: Passes = 2 and Total = 137." }),
        P.num({ label: "(b)", marks: 1, stem: "State the value of `Passes` output when the algorithm is run with the marks above.", value: 4, wrong: [6, 8], workedSolution: "The marks greater than 50 are 64, 73, 82 and 57.", explanation: "Passes = 4." }),
        P.num({ label: "(c)", marks: 1, stem: "State the value of `Average` output.", value: 69, wrong: [62, 46], workedSolution: "Total = 276 and Passes = 4, so 276 ÷ 4 = 69.", explanation: "Average = 69." }),
        P.manual({ label: "(d)", marks: 2, stem: "The output does not agree with the aim of the teacher. Identify the error and write the correct line.", points: ["The condition > PassMark does not count marks equal to 50 (two learners scored exactly 50)", "Correct line: IF Mark[Index] >= PassMark THEN"], modelAnswer: "The condition `>` leaves out learners who scored exactly 50. The line should be `IF Mark[Index] >= PassMark THEN`.", explanation: "A boundary error." }),
        P.num({ label: "(e)", marks: 1, stem: "State the value of `Passes` output by the corrected algorithm.", value: 6, wrong: [4, 8], workedSolution: "64, 50, 73, 50, 82 and 57 are at least 50.", explanation: "Passes = 6." }),
        P.num({ label: "(f)", marks: 1, type: "CALCULATION", stem: "State the value of `Average` output by the corrected algorithm, to 2 decimal places.", value: 62.67, answer: "62.67", tol: 0.005, wrong: [69, 46], workedSolution: "Total = 376 and Passes = 6, so 376 ÷ 6 = 62.67.", explanation: "Average = 62.67." }),
        P.manual({ label: "(g)", marks: 2, stem: "The algorithm is run for a class in which no learner scores 50 or more. Describe what happens.", points: ["Passes is 0 at the end of the loop", "The calculation Total / Passes is a division by zero, which causes a run-time error"], modelAnswer: "`Passes` stays 0, so `Total / Passes` is a division by zero, which causes an error and stops the program.", explanation: "An abnormal case." }),
        P.manual({ label: "(h)", marks: 2, stem: "Write the last two lines of the algorithm again so that this problem cannot occur.", points: ["An IF statement that tests Passes > 0 (or Passes <> 0) before dividing", "Outputs the average in one branch and a suitable message (such as no passes) in the other"], modelAnswer: codeBlock(`IF Passes > 0 THEN
    Average ← Total / Passes
    OUTPUT Passes, Average
ELSE
    OUTPUT "No learner passed"
ENDIF`), explanation: "Test the divisor before dividing." }),
      ]),
      hints: ["Work through the first four marks, adding only those greater than 50.", "Two learners scored exactly 50."],
      explanation: "The condition > should be >=; the faulty algorithm outputs 4 and 69, the corrected one 6 and 62.67; a class with no passes causes a division by zero.",
    });
  }

  // ================================================================== P2 SHORT 2: arrays with bubble sort and linear search
  {
    const names = ["Tendai", "Rudo", "Farai", "Chipo", "Sipho"], scores = [58, 73, 64, 91, 47];
    const n = [...names], sc = [...scores];
    let comps = 0, swaps1 = 0, afterOne = null;
    for (let pass = 1; pass <= 4; pass++) {
      let sw = 0;
      for (let i = 0; i < 5 - pass; i++) {
        comps++;
        if (sc[i] < sc[i + 1]) { [sc[i], sc[i + 1]] = [sc[i + 1], sc[i]]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; sw++; }
      }
      if (pass === 1) { swaps1 = sw; afterOne = { n: [...n], sc: [...sc] }; }
    }
    chk(swaps1, 3); same(afterOne.sc, [73, 64, 91, 58, 47]); same(afterOne.n, ["Rudo", "Farai", "Chipo", "Tendai", "Sipho"]); chk(comps, 10);
    same(sc, [91, 73, 64, 58, 47]); same(n, ["Chipo", "Rudo", "Farai", "Tendai", "Sipho"]);
    const code = `FOR Pass ← 1 TO 4
    FOR Index ← 1 TO 5 - Pass
        IF Score[Index] < Score[Index + 1] THEN
            TempScore ← Score[Index]
            Score[Index] ← Score[Index + 1]
            Score[Index + 1] ← TempScore
            TempName ← Name[Index]
            Name[Index] ← Name[Index + 1]
            Name[Index + 1] ← TempName
        ENDIF
    NEXT Index
NEXT Pass`;
    b.struct({
      ...P2, d: 4, paper: "Cambridge Paper 2",
      concepts: [C("algo.linear-search-bubble-sort"), C("ds.arrays")],
      stem: "A netball club in Kwekwe stores the names and scores of five players in the parallel arrays `Name` and `Score`, indexes 1 to 5.\n\n" + mdTable(["Index", "1", "2", "3", "4", "5"], [["Name", ...names], ["Score", ...scores]]) + "\n\nThe algorithm below sorts both arrays into descending order of score.\n\n" + codeBlock(code),
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.num({ label: "(a)", marks: 1, stem: "State the number of swaps made during the first pass (`Pass` = 1).", value: swaps1, wrong: [4, 2], workedSolution: "Pass 1: 58 and 73 swap, 58 and 64 swap, 58 and 91 swap, and 58 and 47 do not swap: 3 swaps.", explanation: "3 swaps." }),
        P.fib({ label: "(b)", marks: 2, stem: "State the contents of `Name[3]` and `Name[4]` after the first pass.", template: "Name[3] = {{blank:a}}, Name[4] = {{blank:b}}", blanks: [{ id: "a", accepted: ["Chipo"], choices: names }, { id: "b", accepted: ["Tendai"], choices: names }], wrong: [["Farai", "Sipho"]], explanation: "After pass 1 the names are Rudo, Farai, Chipo, Tendai, Sipho." }),
        P.num({ label: "(c)", marks: 1, stem: "State the total number of times the condition in the `IF` statement is tested during the whole algorithm.", value: comps, wrong: [4, 20], workedSolution: "4 + 3 + 2 + 1 = 10.", explanation: "10 tests." }),
        pm("(d)", "Why does the algorithm swap the names as well as the scores?", ["So that each name stays with its own score", "Correct."], [["So that the names are put in alphabetical order", "The names follow the scores, not the alphabet."], ["So that the loop stops sooner", "The swap does not change the number of passes."], ["So that the scores are not lost", "The scores are swapped using TempScore."]], "Parallel arrays must be moved together."),
        P.manual({ label: "(e)", marks: 3, stem: "Write pseudocode that inputs a name and uses a linear search of `Name` to output the player's score, or the message \"Not found\".", points: ["Inputs the name and uses a loop through the array positions (up to 5) with a found indicator", "Compares Name[Index] with the input name and records the position when equal", "Outputs Score at that position if found, otherwise \"Not found\""], modelAnswer: codeBlock(`INPUT Target
Found ← FALSE
Index ← 1
WHILE Found = FALSE AND Index <= 5 DO
    IF Name[Index] = Target THEN
        Found ← TRUE
    ELSE
        Index ← Index + 1
    ENDIF
ENDWHILE
IF Found = TRUE THEN
    OUTPUT Score[Index]
ELSE
    OUTPUT "Not found"
ENDIF`), explanation: "A search with a found flag." }),
        P.manual({ label: "(f)", marks: 4, stem: "The algorithm always makes four passes. Describe how it can be changed so that it stops as soon as the arrays are in order.", points: ["Use a Boolean variable (a flag) such as Swapped", "Set it to FALSE at the start of each pass", "Set it to TRUE when a swap is made inside the IF", "Repeat the passes until a pass is completed with the flag still FALSE (using REPEAT … UNTIL or WHILE)"], modelAnswer: "Use a Boolean flag `Swapped`. Set it to FALSE at the start of each pass and to TRUE whenever a swap is made. Replace the outer FOR loop by a loop that repeats until a whole pass is completed with `Swapped` still FALSE.", explanation: "Stop when a pass makes no swap." }),
      ]),
      hints: ["Compare each score with the next one and swap if the first is smaller.", "The names move with the scores."],
      explanation: "Pass 1 makes 3 swaps and leaves the names Rudo, Farai, Chipo, Tendai, Sipho; the sort tests the condition 10 times; the names are swapped with the scores to stay linked.",
    });
  }

  // ================================================================== P2 SHORT 3: records and text files
  {
    const team = [["Tendai", 12], ["Rudo", 7], ["Farai", 15], ["Chipo", 9]];
    const lines = team.flatMap(([nm, g]) => [nm, String(g)]);
    chk(lines.length, 8); same(lines[5], "15");
    const code = `OPENFILE "goals.txt" FOR WRITE
FOR Index ← 1 TO 4
    WRITEFILE "goals.txt", Team[Index].Name
    WRITEFILE "goals.txt", NUM_TO_STR(Team[Index].Goals)
NEXT Index
CLOSEFILE "goals.txt"`;
    b.struct({
      ...P2, d: 4, paper: "Cambridge Paper 2",
      concepts: [C("ds.data-types-records"), C("ds.text-files")],
      stem: "A netball club in Mutare stores each player's name and the number of goals scored in a record of type `TPlayer`. The array `Team` holds the records of four players.\n\n" + mdTable(["Index", "Name", "Goals"], team.map(([nm, g], i) => [i + 1, nm, g])) + "\n\nThe pseudocode below writes the data to a text file.\n\n" + codeBlock(code),
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.fib({ label: "(a)", marks: 2, stem: "State a suitable data type for each field of the record.", template: "Name: {{blank:a}}\n\nGoals: {{blank:b}}", blanks: [{ id: "a", accepted: ["STRING"], choices: ["STRING", "INTEGER", "REAL", "BOOLEAN"] }, { id: "b", accepted: ["INTEGER"], choices: ["STRING", "INTEGER", "REAL", "BOOLEAN"] }], wrong: [["INTEGER", "STRING"]], explanation: "A name is text and the goals are a whole number." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of lines in the file `goals.txt` after the algorithm has run.", value: 8, wrong: [4, 2], workedSolution: "Two lines are written for each of the four players.", explanation: "8 lines." }),
        P.num({ label: "(c)", marks: 1, stem: "State the number in the sixth line of the file.", value: 15, wrong: [7, 9], workedSolution: "Line 5 is Farai and line 6 is Farai's goals, 15.", explanation: "15." }),
        pm("(d)", "What is the effect of opening `goals.txt` for WRITE if the file already exists?", ["The old contents are erased", "Correct."], [["The new lines are added at the end", "That is the effect of APPEND."], ["An error occurs", "An existing file can be opened for writing."], ["The file is opened for reading too", "A file is opened in one mode."]], "Write mode starts with an empty file."),
        P.manual({ label: "(e)", marks: 3, stem: "Write the pseudocode to define the record type `TPlayer` and to declare the array `Team` of four records.", points: ["TYPE TPlayer ... ENDTYPE with DECLARE statements", "Name declared as STRING and Goals declared as INTEGER", "DECLARE Team : ARRAY[1:4] OF TPlayer"], modelAnswer: codeBlock(`TYPE TPlayer
    DECLARE Name : STRING
    DECLARE Goals : INTEGER
ENDTYPE

DECLARE Team : ARRAY[1:4] OF TPlayer`), explanation: "A record type then an array of that type." }),
        P.manual({ label: "(f)", marks: 4, stem: "Write pseudocode that reads the file `goals.txt` back into the array `Team`, so that each name and its goals are stored in the same record.", points: ["Opens the file for READ and uses a counter starting at 1 (or a FOR loop to 4)", "Uses READFILE to read the name line into Team[Index].Name", "Uses READFILE to read the next line and STR_TO_NUM to store it in Team[Index].Goals", "Closes the file with CLOSEFILE"], modelAnswer: codeBlock(`OPENFILE "goals.txt" FOR READ
FOR Index ← 1 TO 4
    READFILE "goals.txt", Team[Index].Name
    READFILE "goals.txt", Line
    Team[Index].Goals ← STR_TO_NUM(Line)
NEXT Index
CLOSEFILE "goals.txt"`), explanation: "Two lines are read for each record." }),
      ]),
      hints: ["Each player uses two lines of the file.", "Everything read from a text file is a string."],
      explanation: "Eight lines are written; line 6 is 15; WRITE erases old contents; the file is read back two lines per record.",
    });
  }

  // ================================================================== SCENARIO 1: marks processing over two arrays
  {
    // JS mirror of the model answer, checked against an independent calculation
    const names = Array.from({ length: 30 }, (_, i) => `Learner${i + 1}`);
    const marks = Array.from({ length: 30 }, (_, i) => ((i * 37 + 11) % 91) + 10);
    const mirror = (passMark) => {
      let passes = 0, total = 0, highest = marks[0], high = 1; const below = [];
      for (let i = 1; i <= 30; i++) {
        total += marks[i - 1];
        if (marks[i - 1] >= passMark) passes++; else below.push(names[i - 1]);
        if (marks[i - 1] > highest) { highest = marks[i - 1]; high = i; }
      }
      return { passes, mean: total / 30, highest, who: names[high - 1], below };
    };
    const r = mirror(50);
    chk(r.passes, marks.filter((m) => m >= 50).length); chk(r.highest, Math.max(...marks)); chk(r.below.length, 30 - r.passes);
    chk(r.mean, marks.reduce((a, c) => a + c, 0) / 30);
    const model = codeBlock(`REPEAT
    OUTPUT "Enter the pass mark (1 to 100)"
    INPUT PassMark
UNTIL PassMark >= 1 AND PassMark <= 100
Passes ← 0
Total ← 0
Highest ← Mark[1]
HighIndex ← 1
FOR Index ← 1 TO 30
    Total ← Total + Mark[Index]
    IF Mark[Index] >= PassMark THEN
        Passes ← Passes + 1
    ELSE
        OUTPUT StudentName[Index], " is below the pass mark"
    ENDIF
    IF Mark[Index] > Highest THEN
        Highest ← Mark[Index]
        HighIndex ← Index
    ENDIF
NEXT Index
OUTPUT "Number of passes: ", Passes
OUTPUT "Mean mark: ", Total / 30
OUTPUT "Highest mark: ", Highest, " by ", StudentName[HighIndex]`);
    b.ext({
      ...SC, d: 4, paper: "Cambridge Paper 2", marks: 15,
      concepts: [C("algo.algorithm-design"), C("ds.arrays")],
      hints: ["Use one loop for the totals, the count, the highest mark and the names.", "Validate the pass mark with a loop before the main loop."],
      stem: "A secondary school in Bulawayo stores the results of a test for 30 learners in two arrays that have already been filled with data:\n\n- `StudentName`, a one-dimensional array of 30 STRING values (indexes 1 to 30)\n- `Mark`, a one-dimensional array of 30 INTEGER values (indexes 1 to 30), where `Mark[n]` is the mark of the learner whose name is `StudentName[n]`.\n\nWrite pseudocode for a program that:\n\n- inputs a pass mark and repeats the input until it is between 1 and 100 inclusive\n- counts the learners whose mark is at least the pass mark and outputs the count\n- calculates and outputs the mean mark of all 30 learners\n- finds and outputs the highest mark and the name of the learner who scored it\n- outputs the name of every learner whose mark is below the pass mark.\n\nYou do not need to declare the two arrays. [15]",
      points: [
        ["Inputs the pass mark inside a loop that repeats until it is between 1 and 100 (both limits tested)", 2],
        ["Initialises the count and the total to 0 before the main loop, and the highest mark from Mark[1] (or a very low value)", 1],
        ["A loop from 1 to 30 that uses the loop variable as the index of both arrays", 2],
        ["Adds each mark to a running total", 1],
        ["Compares each mark with the pass mark (at least) and counts those that pass", 2],
        ["Outputs the name of each learner whose mark is below the pass mark", 2],
        ["Compares each mark with the highest so far and updates the highest mark and its index", 2],
        ["Outputs the number of passes with a message after the loop", 1],
        ["Calculates the mean by dividing the total by 30 and outputs it", 1],
        ["Outputs the highest mark together with the name from the same index", 1],
      ],
      levels: SCENARIO_LEVELS, wordLimit: { max: 600 },
      modelAnswer: model + "\n\nOther correct algorithms (for example a separate loop for each requirement) also score the marks.",
      explanation: "A complete answer validates the pass mark, then uses one loop over the 30 learners to total the marks, count the passes, track the highest mark and output the names below the pass mark.",
    });
  }

  // ================================================================== SCENARIO 2: stock control
  {
    // JS mirror
    const ItemName = ["Cement", "Nails", "Paint", "Brush", "Pipe"].concat(Array.from({ length: 35 }, (_, i) => `Item${i + 6}`));
    const Quantity = [30, 12, 8, 5, 20].concat(Array(35).fill(10));
    const ReorderLevel = [10, 15, 5, 6, 8].concat(Array(35).fill(2));
    const run = (script) => {
      const out = []; let pos = 0; let sales = 0; const Q = [...Quantity];
      let item = script[pos++];
      while (item !== "STOP") {
        let found = false, index = 1;
        while (!found && index <= 40) { if (ItemName[index - 1] === item) found = true; else index++; }
        if (!found) out.push("Item not found");
        else {
          out.push(`In stock: ${Q[index - 1]}`);
          let sold;
          do { sold = script[pos++]; } while (!(sold >= 0 && sold <= Q[index - 1]));
          Q[index - 1] -= sold; sales++;
          if (Q[index - 1] < ReorderLevel[index - 1]) out.push(`Reorder ${ItemName[index - 1]}`);
        }
        item = script[pos++];
      }
      out.push(`Sales recorded: ${sales}`);
      for (let i = 1; i <= 40; i++) if (Q[i - 1] < ReorderLevel[i - 1]) out.push(ItemName[i - 1]);
      return out;
    };
    same(run(["Paint", 4, "Cement", 40, 5, "Hammer", "STOP"]), ["In stock: 8", "Reorder Paint", "In stock: 30", "Item not found", "Sales recorded: 2", "Nails", "Paint", "Brush"]);
    const model = codeBlock(`Sales ← 0
OUTPUT "Enter the item name (STOP to finish)"
INPUT Item
WHILE Item <> "STOP" DO
    Found ← FALSE
    Index ← 1
    WHILE Found = FALSE AND Index <= 40 DO
        IF ItemName[Index] = Item THEN
            Found ← TRUE
        ELSE
            Index ← Index + 1
        ENDIF
    ENDWHILE
    IF Found = FALSE THEN
        OUTPUT "Item not found"
    ELSE
        OUTPUT "In stock: ", Quantity[Index]
        REPEAT
            OUTPUT "Enter the number sold"
            INPUT Sold
        UNTIL Sold >= 0 AND Sold <= Quantity[Index]
        Quantity[Index] ← Quantity[Index] - Sold
        Sales ← Sales + 1
        IF Quantity[Index] < ReorderLevel[Index] THEN
            OUTPUT "Reorder ", ItemName[Index]
        ENDIF
    ENDIF
    OUTPUT "Enter the item name (STOP to finish)"
    INPUT Item
ENDWHILE
OUTPUT "Sales recorded: ", Sales
FOR Index ← 1 TO 40
    IF Quantity[Index] < ReorderLevel[Index] THEN
        OUTPUT ItemName[Index]
    ENDIF
NEXT Index`);
    b.ext({
      ...SC, d: 5, paper: "Cambridge Paper 2", marks: 15,
      concepts: [C("algo.linear-search-bubble-sort"), C("ds.arrays")],
      hints: ["The first INPUT goes before the WHILE loop and the next one at the end of its body.", "Search with a found flag so that the search stops as soon as the item is found."],
      stem: "A hardware shop in Harare stores its stock in three one-dimensional arrays, each with 40 elements (indexes 1 to 40), that have already been filled with data:\n\n- `ItemName`, STRING: the name of each product\n- `Quantity`, INTEGER: the number of that product in stock\n- `ReorderLevel`, INTEGER: the quantity below which the product must be reordered.\n\nWrite pseudocode for a program that repeats the following until the user enters the item name \"STOP\":\n\n- input an item name\n- search `ItemName` for the item and, if it is not found, output a suitable message\n- if it is found, output its quantity in stock, then input the number sold, repeating the input until it is between 0 and the quantity in stock\n- subtract the number sold from `Quantity`, and output a message if the new quantity is below the reorder level.\n\nWhen the user enters \"STOP\" the program outputs the number of sales recorded and then the name of every product whose quantity is below its reorder level. You do not need to declare the arrays. [15]",
      points: [
        ["Inputs the item name before the loop and again at the end of the loop body, and the loop ends when it is \"STOP\"", 2],
        ["Initialises the sales counter to 0 before the loop", 1],
        ["A linear search of ItemName using a loop through the positions 1 to 40 and a found flag (or the position)", 2],
        ["The search stops when the item is found (early exit) and the not found case is detected", 1],
        ["Outputs a message when the item is not found", 1],
        ["Outputs the quantity of the item found", 1],
        ["Inputs the number sold with a loop that repeats until it is between 0 and the quantity in stock", 2],
        ["Subtracts the number sold from Quantity at the correct index and adds 1 to the sales counter", 2],
        ["Tests whether the new quantity is below ReorderLevel at the same index and outputs a message", 1],
        ["After STOP, outputs the number of sales recorded, then loops through all 40 products outputting those below their reorder level", 2],
      ],
      levels: SCENARIO_LEVELS, wordLimit: { max: 600 },
      modelAnswer: model + "\n\nTested with the script: Paint (sell 4), Cement (an invalid 40, then 5), Hammer, STOP, which gives: In stock: 8, Reorder Paint, In stock: 30, Item not found, Sales recorded: 2, then Nails, Paint and Brush.",
      explanation: "A complete answer is a sentinel-controlled loop containing a linear search with a found flag, a validated input, an update of Quantity with a reorder test, and a final report loop.",
    });
  }

  // ================================================================== SCENARIO 3: queue management
  {
    // JS mirror of the model answer
    const clinic = (script) => {
      const Queue = Array(20).fill(""); let front = 1, rear = 0, count = 0; const out = []; let pos = 0; let choice;
      do {
        choice = script[pos++];
        switch (choice) {
          case 1: if (count === 20) out.push("Queue is full"); else { const nm = script[pos++]; rear = (rear % 20) + 1; Queue[rear - 1] = nm; count++; } break;
          case 2: if (count === 0) out.push("No patients waiting"); else { out.push(Queue[front - 1]); front = (front % 20) + 1; count--; } break;
          case 3: out.push(count); break;
          case 4: out.push("Goodbye"); break;
          default: out.push("Invalid choice");
        }
      } while (choice !== 4);
      return out;
    };
    same(clinic([1, "Anesu", 1, "Blessing", 3, 2, 2, 2, 7, 4]), [2, "Anesu", "Blessing", "No patients waiting", "Invalid choice", "Goodbye"]);
    const full = clinic([...Array.from({ length: 20 }).flatMap((_, i) => [1, `P${i + 1}`]), 1, 3, 4]);
    same(full, ["Queue is full", 20, "Goodbye"]);
    const wrap = clinic([...Array.from({ length: 20 }).flatMap((_, i) => [1, `P${i + 1}`]), 2, 1, "New", ...Array(19).fill(2), 2, 4]);
    same(wrap.slice(0, 1), ["P1"]); same(wrap[wrap.length - 2], "New");
    const model = codeBlock(`CONSTANT QueueSize ← 20
FrontPointer ← 1
RearPointer ← 0
Count ← 0
REPEAT
    OUTPUT "1 Add patient  2 Call next patient  3 Number waiting  4 Quit"
    INPUT Choice
    CASE OF Choice
        1 : IF Count = QueueSize THEN
                OUTPUT "Queue is full"
            ELSE
                INPUT PatientName
                RearPointer ← MOD(RearPointer, QueueSize) + 1
                Queue[RearPointer] ← PatientName
                Count ← Count + 1
            ENDIF
        2 : IF Count = 0 THEN
                OUTPUT "No patients waiting"
            ELSE
                OUTPUT Queue[FrontPointer]
                FrontPointer ← MOD(FrontPointer, QueueSize) + 1
                Count ← Count - 1
            ENDIF
        3 : OUTPUT Count
        4 : OUTPUT "Goodbye"
        OTHERWISE OUTPUT "Invalid choice"
    ENDCASE
UNTIL Choice = 4`);
    b.ext({
      ...SC, d: 4, paper: "Cambridge Paper 2", marks: 15,
      concepts: [C("ds.adt-introduction"), C("ds.stack-queue-algorithms")],
      hints: ["Use Count to decide whether the queue is full or empty.", "Both pointers wrap round with MOD(Pointer, QueueSize) + 1."],
      stem: "A clinic in Gweru manages the patients waiting to be seen using a circular queue. The queue is stored in a one-dimensional array `Queue` of 20 STRING values (indexes 1 to 20). The integer variables `FrontPointer`, `RearPointer` and `Count` are used with the queue.\n\nWrite pseudocode for a program that sets up the queue as empty and then repeatedly displays a menu and inputs the user's choice until the user chooses to quit:\n\n- 1: add a patient. Input the patient's name and add it to the queue. If the queue is full, output a suitable message instead.\n- 2: call the next patient. Output the name of the patient at the front and remove that patient from the queue. If the queue is empty, output a suitable message instead.\n- 3: output the number of patients waiting.\n- 4: quit.\n\nAny other choice produces an error message. You do not need to declare the array. [15]",
      points: [
        ["Sets FrontPointer to 1, RearPointer to 0 and Count to 0 before the menu loop", 2],
        ["A loop that displays the menu and inputs the choice, repeating until the choice is 4", 2],
        ["Selection (CASE or IF) of the four options, with an error message for any other choice", 2],
        ["Option 1: tests whether the queue is full (Count equals 20) and outputs a message", 1],
        ["Option 1: moves RearPointer on by one, wrapping from 20 to 1 (MOD or an IF)", 2],
        ["Option 1: inputs the name, stores it in Queue[RearPointer] and adds 1 to Count", 1],
        ["Option 2: tests whether the queue is empty (Count equals 0) and outputs a message", 1],
        ["Option 2: outputs Queue[FrontPointer], moves FrontPointer on by one with wrap-around and subtracts 1 from Count", 3],
        ["Option 3: outputs Count", 1],
      ],
      levels: SCENARIO_LEVELS, wordLimit: { max: 600 },
      modelAnswer: model + "\n\nTested with the choices 1 (Anesu), 1 (Blessing), 3, 2, 2, 2, 7, 4, which output 2, Anesu, Blessing, No patients waiting, Invalid choice and Goodbye; a run that adds 21 patients outputs Queue is full.",
      explanation: "A complete answer initialises the pointers and count, loops until 4, and implements each option with the full and empty tests, the wrapping pointers and the count.",
    });
  }

  // ================================================================== P4 TASK 1: recursion with a binary tree (Python)
  {
    const given = `class Node:
    def __init__(self, time):
        self.time = time
        self.left = None
        self.right = None

def insert(node, time):
    if node is None:
        return Node(time)
    if time < node.time:
        node.left = insert(node.left, time)
    else:
        node.right = insert(node.right, time)
    return node

def in_order(node, result):
    if node is not None:
        in_order(node.left, result)
        result.append(node.time)
        in_order(node.right, result)

root = None
for time in (14, 9, 17, 12, 8, 15, 20):
    root = insert(root, time)`;
    const solution = `def count_nodes(node):
    if node is None:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))

def contains(node, target):
    if node is None:
        return False
    if target == node.time:
        return True
    if target < node.time:
        return contains(node.left, target)
    return contains(node.right, target)

def descending(node, result):
    if node is not None:
        descending(node.right, result)
        result.append(node.time)
        descending(node.left, result)`;
    const tests = `result = []
in_order(root, result)
print(result)
print(count_nodes(root))
print(height(root))
print(contains(root, 13))
print(contains(root, 15))
print(count_nodes(None))
flat = None
for time in (8, 9, 12, 14, 15, 17, 20):
    flat = insert(flat, time)
print(height(flat))
down = []
descending(root, down)
print(down)`;
    const out = py(given + "\n\n" + solution + "\n\n" + tests).split("\n");
    same(out, ["[8, 9, 12, 14, 15, 17, 20]", "7", "3", "False", "True", "0", "7", "[20, 17, 15, 14, 12, 9, 8]"]);
    b.struct({
      ...P4, d: 5, paper: "Cambridge Paper 4",
      concepts: [C("algo.recursion"), C("ds.binary-tree-algorithms")],
      stem: "A school in Chitungwiza records the times (in seconds) of the athletes in a 100 m race. The times are stored in a binary search tree made of `Node` objects. The Python program below builds the tree by inserting the times 14, 9, 17, 12, 8, 15 and 20, in that order. Smaller times go to the left of a node and other times to the right.\n\n" + codeBlock(given, "python") + "\n\nYou will write further functions for this program. Assume that the code above is already in your program.",
      parts: checkExam(EXAM.CAM_P4_TASK, [
        P.manual({ label: "(a)", marks: 4, stem: "Write a recursive function `count_nodes(node)` that returns the number of nodes in the tree whose root is `node`. An empty tree (`None`) has no nodes.", points: ["A function header with the parameter node", "A base case: returns 0 when node is None", "Makes recursive calls on node.left and node.right", "Returns 1 plus the two counts"], modelAnswer: codeBlock(`def count_nodes(node):
    if node is None:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)`, "python"), explanation: "The count of a tree is one for the node plus the counts of its sub-trees." }),
        P.fib({ label: "(b)", marks: 3, stem: "The statements `result = []`, `in_order(root, result)` and `print(result)` are run. State the first three values in the list that is printed.", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}", blanks: [{ id: "a", accepted: ["8"], input: "number" }, { id: "b", accepted: ["9"], input: "number" }, { id: "c", accepted: ["12"], input: "number" }], wrong: [["14", "9", "17"]], explanation: "An in-order traversal gives the times in ascending order: 8, 9, 12, 14, 15, 17, 20." }),
        P.num({ label: "(c)", marks: 1, stem: "Your function from part (a) is called with `count_nodes(root)` and the result is printed. State the value printed.", value: 7, wrong: [3, 14], workedSolution: "There are seven nodes.", explanation: "7." }),
        P.manual({ label: "(d)", marks: 3, stem: "Write a recursive function `height(node)` that returns the number of levels of the tree, so that an empty tree has height 0, a tree with only a root has height 1, and so on.", points: ["A base case returning 0 when node is None", "Recursive calls on both sub-trees", "Returns 1 plus the larger of the two heights"], modelAnswer: codeBlock(`def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))`, "python"), explanation: "The height is one more than the taller sub-tree." }),
        P.manual({ label: "(e)", marks: 3, stem: "Write a recursive function `contains(node, target)` that returns True if the time `target` is in the tree and False otherwise, using the order of the tree to avoid searching both sub-trees.", points: ["Base case: returns False when node is None, and returns True when the target equals node.time", "Searches only the left sub-tree when the target is smaller", "Searches only the right sub-tree otherwise, returning the result of the recursive call"], modelAnswer: codeBlock(`def contains(node, target):
    if node is None:
        return False
    if target == node.time:
        return True
    if target < node.time:
        return contains(node.left, target)
    return contains(node.right, target)`, "python"), explanation: "A binary search tree is searched down one path." }),
        P.num({ label: "(f)", marks: 1, stem: "Your function `height` is called with `height(root)`. State the value returned.", value: 3, wrong: [4, 7], workedSolution: "The longest path is 14, 9, 12 (or 14, 17, 15): three levels.", explanation: "3." }),
        P.num({ label: "(g)", marks: 1, stem: "A second tree `flat` is built by inserting the times 8, 9, 12, 14, 15, 17 and 20, in that order. State the value returned by `height(flat)`.", value: 7, wrong: [3, 4], workedSolution: "Each time is larger than the last, so each goes to the right and the tree is a chain of seven nodes.", explanation: "7." }),
        pm("(h)", "State the value returned by `contains(root, 13)`.", ["False", "Correct: 13 is not among the times."], [["True", "13 was never inserted."], ["None", "The function returns a Boolean."], ["13", "The function does not return the time."]], "The search goes 14, 9, 12 and then reaches None."),
        P.num({ label: "(i)", marks: 1, stem: "State the value returned by `count_nodes(None)`.", value: 0, wrong: [1, -1], workedSolution: "An empty tree has no nodes: the base case.", explanation: "0." }),
        P.manual({ label: "(j)", marks: 3, stem: "Explain why the recursion in `count_nodes` always terminates.", points: ["Each recursive call is made on a child of the current node, which is a smaller tree", "Eventually a call reaches a node with no child, where the child is None", "None is the base case, which returns 0 without another recursive call"], modelAnswer: "Each call is on a child of the current node, so the tree is smaller each time. Eventually a child is None, which is the base case and returns 0 without calling the function again.", explanation: "The argument moves towards the base case." }),
        P.manual({ label: "(k)", marks: 4, stem: "Write a recursive function `descending(node, result)` that appends the times to the list `result` in descending order (largest first), in the same style as `in_order`.", points: ["Base case: does nothing when node is None (the statements are inside if node is not None)", "Visits the right sub-tree first", "Appends node.time to result after the right sub-tree", "Then visits the left sub-tree"], modelAnswer: codeBlock(`def descending(node, result):
    if node is not None:
        descending(node.right, result)
        result.append(node.time)
        descending(node.left, result)`, "python"), explanation: "A reverse in-order traversal." }),
      ]),
      hints: ["The base case of each function is an empty tree.", "Make the recursive calls on node.left and node.right."],
      explanation: "The functions count_nodes, height, contains and descending are recursive with the base case None; the model program prints [8, 9, 12, 14, 15, 17, 20], 7, 3, False, True, 0, 7 and [20, 17, 15, 14, 12, 9, 8].",
    });
  }

  // ================================================================== P4 TASK 2: sorting and searching records (Python)
  {
    const given = `class Learner:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

learners = [
    Learner("Tendai", 58),
    Learner("Rudo", 73),
    Learner("Farai", 64),
    Learner("Chipo", 91),
    Learner("Sipho", 47),
    Learner("Nyasha", 73),
    Learner("Thandeka", 69),
]`;
    const solution = `def insertion_sort(items):
    for index in range(1, len(items)):
        key = items[index]
        position = index - 1
        while position >= 0 and items[position].mark < key.mark:
            items[position + 1] = items[position]
            position = position - 1
        items[position + 1] = key

def binary_search(items, target):
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid].name == target:
            return mid
        if items[mid].name < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`;
    const tests = `insertion_sort(learners)
for learner in learners:
    print(learner.name, learner.mark)
by_name = sorted(learners, key=lambda learner: learner.name)
print(binary_search(by_name, "Tendai"))
print(binary_search(by_name, "Peter"))
print(binary_search(by_name, "Chipo"))`;
    const out = py(given + "\n\n" + solution + "\n\n" + tests).split("\n");
    same(out, ["Chipo 91", "Rudo 73", "Nyasha 73", "Thandeka 69", "Farai 64", "Tendai 58", "Sipho 47", "5", "-1", "0"]);
    // by_name = Chipo, Farai, Nyasha, Rudo, Sipho, Tendai, Thandeka
    // comparisons for Tendai: mid 3 (Rudo) < Tendai, low 4; mid 5 (Tendai) found -> 2
    const sortedNames = ["Chipo", "Farai", "Nyasha", "Rudo", "Sipho", "Tendai", "Thandeka"];
    const comps = (target) => { let lo = 0, hi = 6, c = 0; while (lo <= hi) { const mid = Math.floor((lo + hi) / 2); c++; if (sortedNames[mid] === target) return c; if (sortedNames[mid] < target) lo = mid + 1; else hi = mid - 1; } return c; };
    chk(comps("Tendai"), 2); chk(comps("Peter"), 3); chk(comps("Chipo"), 3);
    b.struct({
      ...P4, d: 5, paper: "Cambridge Paper 4",
      concepts: [C("algo.binary-search-insertion-sort"), C("ds.data-types-records")],
      stem: "A school in Mutare stores the name and mark of each learner in objects of the class `Learner`. The Python code below creates the list `learners`.\n\n" + codeBlock(given, "python") + "\n\nYou will write functions that sort and search the list. Assume that the code above is already in your program.",
      parts: checkExam(EXAM.CAM_P4_TASK, [
        P.manual({ label: "(a)", marks: 4, stem: "Write a function `insertion_sort(items)` that uses an insertion sort to sort the list of `Learner` objects in place into descending order of `mark`.", points: ["A loop through the list starting at the second item", "Stores the item being inserted in a variable (the key)", "A loop that shifts items with a smaller mark one place to the right", "Places the key in the gap that is left"], modelAnswer: codeBlock(`def insertion_sort(items):
    for index in range(1, len(items)):
        key = items[index]
        position = index - 1
        while position >= 0 and items[position].mark < key.mark:
            items[position + 1] = items[position]
            position = position - 1
        items[position + 1] = key`, "python"), explanation: "Shift smaller marks right, then insert the key." }),
        P.fib({ label: "(b)", marks: 4, stem: "The function from part (a) is called with `insertion_sort(learners)` and then the name of each learner in the list is printed in order. State the first four names printed. (Learners with equal marks stay in their original order.)", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}", blanks: ["Chipo", "Rudo", "Nyasha", "Thandeka"].map((v, i) => ({ id: "abcd"[i], accepted: [v], choices: ["Tendai", "Rudo", "Farai", "Chipo", "Sipho", "Nyasha", "Thandeka"] })), wrong: [["Tendai", "Rudo", "Farai", "Chipo"]], explanation: "In descending order of mark: Chipo 91, Rudo 73, Nyasha 73, Thandeka 69, Farai 64, Tendai 58, Sipho 47." }),
        P.manual({ label: "(c)", marks: 5, stem: "A second list, `by_name`, holds the same objects sorted into ascending alphabetical order of `name`. Write a function `binary_search(items, target)` that uses a binary search to return the index of the learner whose name is `target`, or -1 if there is no such learner.", points: ["Sets low to 0 and high to len(items) - 1", "A loop that continues while low <= high", "Calculates the middle index with integer division", "Returns mid when the name matches, otherwise moves low to mid + 1 or high to mid - 1 by comparing the names", "Returns -1 after the loop"], modelAnswer: codeBlock(`def binary_search(items, target):
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid].name == target:
            return mid
        if items[mid].name < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`, "python"), explanation: "A standard binary search on the name attribute." }),
        P.num({ label: "(d)", marks: 1, stem: "`by_name` holds the names in the order Chipo, Farai, Nyasha, Rudo, Sipho, Tendai, Thandeka. State the value returned by `binary_search(by_name, \"Tendai\")`.", value: 5, wrong: [6, 4], workedSolution: "Tendai is the sixth name, at index 5 (counting from 0).", explanation: "5." }),
        P.num({ label: "(e)", marks: 2, stem: "State the number of comparisons of `items[mid].name` with `target` (counting an equality test and an order test together as one comparison) made when searching for \"Tendai\".", value: 2, wrong: [1, 3], workedSolution: "Mid = 3 (Rudo) is before Tendai, so low = 4; then mid = 5 is Tendai.", explanation: "2 comparisons." }),
        P.num({ label: "(f)", marks: 1, stem: "State the value returned by `binary_search(by_name, \"Peter\")`, which is not in the list.", value: -1, wrong: [0, 3], workedSolution: "The search ends with low > high, so -1 is returned.", explanation: "-1." }),
        pm("(g)", "Which name makes a good extreme test of `binary_search` because it is the first item in `by_name`?", ["Chipo", "Correct: it is at index 0."], [["Tendai", "Tendai is near the end."], ["Rudo", "Rudo is in the middle."], ["Peter", "Peter is not in the list."]], "Testing both ends checks that low and high are set correctly."),
        P.manual({ label: "(h)", marks: 3, stem: "Explain why the list must be sorted by name before `binary_search` is used, and why sorting by mark would not be enough.", points: ["A binary search only works if the list is in order of the value being searched", "Otherwise discarding half the list might discard the learner searched for", "The marks order does not put the names in alphabetical order, so the comparison of names would give wrong results"], modelAnswer: "A binary search needs the items to be in order of the value being compared. A list sorted by mark is not in alphabetical order, so discarding half of it after comparing names could discard the learner being searched for.", explanation: "The search key must be the sort key." }),
        P.manual({ label: "(i)", marks: 4, stem: "The programmer used a class `Learner` rather than two lists, `names` and `marks`. Explain two benefits of using the class in this program.", points: ["The name and mark of a learner are kept together in one object", "So sorting the list moves each name with its own mark (no risk of the lists getting out of step)", "The code is easier to read, for example items[mid].name", "A learner object can be passed to a function or stored as one item"], modelAnswer: "The name and mark are kept together in one object, so sorting moves a name with its own mark and the two cannot get out of step. The code is also easier to read, for example `items[mid].name`, and a learner can be passed to a function as one item.", explanation: "Related data stays together." }),
      ]),
      hints: ["The sort compares the mark attribute; the search compares the name attribute.", "A binary search needs sorted data."],
      explanation: "After the sort the order is Chipo, Rudo, Nyasha, Thandeka, Farai, Tendai, Sipho; the search for Tendai returns 5, for Peter -1 and for Chipo 0.",
    });
  }
});
