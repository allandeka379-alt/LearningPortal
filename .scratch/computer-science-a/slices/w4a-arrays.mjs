// Slice w4a: one- and two-dimensional arrays (acs.ds.arrays, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";
import { arrayMd } from "../tables/w4a-util.mjs";

concept("acs.ds.arrays", { file: "ds/arrays", keyPrefix: "ds.arrays" }, (b) => {
  const rain = [12, 0, 7, 25, 3, 18, 9];
  const rTotal = rain.reduce((a, c) => a + c, 0), rMax = Math.max(...rain), rPos = rain.indexOf(rMax) + 1, rWet = rain.filter((x) => x > 10).length;
  chk(rTotal, 74); chk(rMax, 25); chk(rPos, 4); chk(rWet, 3);
  const sales = [[120, 95, 140, 110], [80, 105, 90, 125], [150, 130, 115, 160]];
  const rowT = sales.map((r) => r.reduce((a, c) => a + c, 0));
  const colT = [0, 1, 2, 3].map((c) => sales.reduce((a, r) => a + r[c], 0));
  same(rowT, [465, 400, 555]); same(colT, [350, 330, 345, 395]); chk(rowT.reduce((a, c) => a + c, 0), 1420);
  chk(sales[1][3], 125); chk(sales[2][1], 130);
  chk(3 * 4, 12); chk(6 * 5, 30); chk(30 - 1 + 1, 30);
  const temps = [18, 21, 19, 25, 23];
  chk(temps[3], 25);
  const salesGrid = mdTable(["", "Week 1", "Week 2", "Week 3", "Week 4"], sales.map((r, i) => [`Shop ${i + 1}`, ...r]));

  // ---- multiple choice
  mc(b, 1, "RECALL", "What is an array?",
    ["A fixed number of items of one type under one name", "Correct."],
    [["A structure that groups fields of different data types", "That describes a record."], ["A variable that can hold only one value at a time", "An array holds many values."], ["A list that grows as items are added", "That describes a dynamic structure."]],
    "An array has a fixed size and one data type.");
  mc(b, 2, "UNDERSTANDING", "What is the index of an array element?",
    ["The number that gives its position", "Correct."],
    [["The value stored in the element", "That is the content of the element."], ["The data type shared by all the elements of the array", "All the elements share the type."], ["The number of elements that the array can hold in all", "That is the size of the array."]],
    "An index selects an element.", { daily: true });
  mc(b, 2, "APPLICATION", "An array is declared `DECLARE Temps : ARRAY[1:5] OF INTEGER` and holds 18, 21, 19, 25, 23. What is the value of `Temps[4]`?",
    ["25", "Correct: the fourth element."],
    [["19", "That is the third element."], ["23", "That is the fifth element."], ["4", "That is the index, not the value."]],
    "Count from index 1: 18, 21, 19, 25.", { daily: true });
  mc(b, 3, "APPLICATION", "An array is declared `ARRAY[1:30] OF STRING`. Which statement causes an error?",
    ["`Names[31] ← \"Rudo\"`", "Correct: 31 is outside the bounds 1 to 30."],
    [["`Names[1] ← \"Rudo\"`", "Index 1 is the lower bound and is valid."], ["`Names[30] ← \"Rudo\"`", "Index 30 is the upper bound and is valid."], ["`Names[15] ← \"Rudo\"`", "Index 15 is within the bounds."]],
    "Only 1 to 30 are valid.", { hints: ["What is the upper bound?"] });
  mc(b, 3, "APPLICATION", "Which data is best stored in a two-dimensional array?",
    ["Takings of five shops on each of seven days", "Correct: each value needs a shop and a day."],
    [["The names of all the pupils who are in a class", "A list of names needs one index."], ["The total mark that is scored by a single pupil", "A single value needs no array."], ["Today's date", "A single value."]],
    "A table with two characteristics suits two indexes.", { hints: ["Which data forms a table of rows and columns?"] });
  mc(b, 3, "UNDERSTANDING", "Which is a feature of a static data structure such as an array?",
    ["Its size is fixed when it is declared", "Correct."],
    [["It can grow while the program runs", "That is a dynamic structure."], ["Its elements may have different types", "Array elements share one type."], ["It uses memory only for the items stored", "Memory is reserved for the whole array."]],
    "A static structure cannot change size while the program runs.", { hints: ["Can an array be made bigger by the program?"] });
  mc(b, 3, "APPLICATION", "A Python list `scores` holds the marks of eight pupils. Which expression gives the mark of the fourth pupil?",
    ["`scores[3]`", "Correct: Python counts from 0."],
    [["`scores[4]`", "That is the fifth item."], ["`scores(4)`", "Round brackets are for function calls."], ["`scores[0:4]`", "That is a slice of four items."]],
    "Position 4 is index 3.", { hints: ["What is the first index in Python?"] });
  mc(b, 4, "ANALYSIS", "A 2D array `Seats` is declared `ARRAY[1:6, 1:5] OF BOOLEAN`. Which statement is true?",
    ["`Seats[3, 5]` refers to row 3 and column 5", "Correct: the first index is the row."],
    [["`Seats[3, 5]` refers to row 5 and column 3", "The row index comes first."], ["`Seats[6, 6]` is a valid element", "The columns only go up to 5."], ["The array holds 11 elements", "It holds 6 × 5 = 30 elements."]],
    "Row first, column second, within 1 to 6 and 1 to 5.", { hints: ["Which index is given first?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "All the elements of an array must have the same data type.", answer: true,
    explanation: "True. That is why a record is used when the items have different types." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A two-dimensional array needs a single loop to process every element.", answer: false,
    explanation: "False. It normally needs nested loops, one for the rows and one for the columns." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Element", "One item stored in an array"], ["Index", "The number that identifies an element's position"], ["Upper bound", "The largest valid index"], ["Static structure", "Its size is fixed when it is declared"], ["Two-dimensional array", "Each element is identified by a row and a column"]],
    explanation: "Terms used with arrays." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Declare the bounds as [1:n] and use a counter loop to visit each element."],
    stem: "Complete the pseudocode that adds up the seven values of the array `Rain`.",
    template: "DECLARE Rain : ARRAY[1:{{blank:a}}] OF INTEGER\n\nTotal ← 0\n\nFOR Day ← 1 TO {{blank:b}}\n\nTotal ← Total + Rain[{{blank:c}}]\n\nNEXT Day",
    blanks: [{ id: "a", accepted: ["7"], input: "number" }, { id: "b", accepted: ["7"], input: "number" }, { id: "c", accepted: ["Day"], choices: ["Day", "Total", "7", "1"] }], wrong: [["1", "1", "Total"]],
    explanation: "Seven elements, a loop from 1 to 7 and the loop variable as the index." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Rows × columns."],
    stem: "A theatre has 6 rows of 5 seats stored in `ARRAY[1:6, 1:5] OF BOOLEAN`. How many elements does the array have?", value: 30, wrong: [11, 36], workedSolution: "6 × 5 = 30.", explanation: "30 elements." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the seven values."],
    stem: "The array `Rain` holds the daily rainfall in mm:\n\n" + arrayMd(rain, { name: "Rain" }) + "\n\nState the total of the elements.", value: rTotal, wrong: [25, 70], workedSolution: "12 + 0 + 7 + 25 + 3 + 18 + 9 = 74.", explanation: "74 mm." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the elements greater than 10."],
    stem: "The array `Rain` holds the daily rainfall in mm:" + "\n\n" + arrayMd(rain, { name: "Rain" }) + "\n\nHow many elements are greater than 10?", value: rWet, wrong: [2, 4], workedSolution: "The values 12, 25 and 18 are greater than 10.", explanation: "3 elements." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["The row is given first."],
    stem: "The array `Takings` holds the takings of 2 stalls (rows) over 3 days (columns).\n\n" + mdTable(["", "Day 1", "Day 2", "Day 3"], [["Stall 1", 44, 63, 29], ["Stall 2", 57, 46, 70]]) + "\n\nState the value of `Takings[2, 3]`.", value: 70, wrong: [29, 46], workedSolution: "Row 2 is Stall 2 and column 3 is Day 3: 70.", explanation: "70." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about the code needed for 30 pupils with and without an array."],
    stem: "Explain why an array is better than 30 separate variables for storing the marks of a class. [3]",
    points: ["One identifier holds all the marks and an index selects one", "A loop can process all the elements, so the code is short", "The program can be changed for a different class size by changing the bounds"],
    modelAnswer: "One identifier holds all 30 marks and the index chooses one. A loop can process every element, so the code is short, and the size can be changed easily.", explanation: "One name, an index and loops." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Total, then divide by 10; the loop runs 10 times."],
    stem: "The array `Marks` holds 10 integers (indexes 1 to 10). Write pseudocode to calculate and output their average. [4]",
    points: ["Total set to 0 before the loop", "A loop from 1 to 10 using the loop variable as the index", "Adds Marks[Index] to the total inside the loop", "Divides the total by 10 after the loop and outputs the result"],
    modelAnswer: codeBlock(`Total ← 0
FOR Index ← 1 TO 10
    Total ← Total + Marks[Index]
NEXT Index
Average ← Total / 10
OUTPUT Average`), explanation: "A running total then a division." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Start with the first element as the largest."],
    stem: "Write pseudocode to find and output the largest value in the array `Data`, which has indexes 1 to 20. [4]",
    points: ["Sets Largest to Data[1] before the loop", "A loop through the other elements (2 to 20) using the index", "Compares Data[Index] with Largest and replaces Largest when it is bigger", "Outputs Largest after the loop"],
    modelAnswer: codeBlock(`Largest ← Data[1]
FOR Index ← 2 TO 20
    IF Data[Index] > Largest THEN
        Largest ← Data[Index]
    ENDIF
NEXT Index
OUTPUT Largest`), explanation: "Compare each element with the largest so far." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Consider memory and speed of access."],
    stem: "Give two advantages and one disadvantage of an array as a static data structure. [3]",
    points: ["Advantage: access to any element is quick because its position is worked out from the index", "Advantage: the elements are stored together and the memory needed is known in advance", "Disadvantage: the size is fixed, so memory is wasted if it is too large and items cannot be added if it is too small"],
    modelAnswer: "Any element can be reached quickly from its index, and the memory needed is known in advance. The size is fixed, so memory is wasted if the array is too big and items cannot be added if it is too small.", explanation: "Fast access against fixed size." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Total, largest and a counter are all found in one pass.", "Compare each element with 10."],
    explanation: "Processing a 1D array of rainfall readings.",
    stem: "A weather station in Hwange records the rainfall in mm for seven days in the array `Rain`.\n\n" + arrayMd(rain, { name: "Rain" }),
    parts: [
      pm("(a)", "Which is the correct declaration of the array?", ["`DECLARE Rain : ARRAY[1:7] OF INTEGER`", "Correct."], [["`DECLARE Rain : ARRAY[1:8] OF INTEGER`", "There are only seven days."], ["`DECLARE Rain : INTEGER[1:7]`", "This is not the pseudocode form."], ["`DECLARE Rain : ARRAY[1:7] OF STRING`", "Rainfall values are numbers."]], "Seven integer elements, indexes 1 to 7."),
      P.num({ label: "(b)", marks: 1, stem: "State the total rainfall for the week.", value: rTotal, wrong: [70, 25], workedSolution: "12 + 0 + 7 + 25 + 3 + 18 + 9 = 74.", explanation: "74 mm." }),
      P.num({ label: "(c)", marks: 1, stem: "State the largest value in the array.", value: rMax, wrong: [18, 12], workedSolution: "The largest of the seven values is 25.", explanation: "25 mm." }),
      P.num({ label: "(d)", marks: 1, stem: "State the index of the largest value.", value: rPos, wrong: [3, 5], workedSolution: "25 is the fourth element.", explanation: "Index 4." }),
      P.manual({ label: "(e)", marks: 3, stem: "Write pseudocode that outputs the number of days on which the rainfall was more than 10 mm.", points: ["A counter set to 0 before the loop", "A loop from 1 to 7 testing Rain[Index] > 10", "Adds 1 to the counter inside the IF and outputs it after the loop"], modelAnswer: codeBlock(`Wet ← 0
FOR Index ← 1 TO 7
    IF Rain[Index] > 10 THEN
        Wet ← Wet + 1
    ENDIF
NEXT Index
OUTPUT Wet`), explanation: "Count with a condition." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why an array is used rather than seven separate variables.", points: ["The elements can be processed with a loop using the index", "One identifier is used, so the code is shorter and easier to change"], modelAnswer: "A loop can process the elements using the index, so the code is shorter and easier to change than with seven variables.", explanation: "An index lets a loop do the repeating." }),
    ] });
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["The first index is the shop (row).", "A column total adds the three shops for one week."],
    explanation: "Reading and processing a 2D array of sales.",
    stem: "A company stores the weekly sales of three shops in the two-dimensional array `Sales`, declared `ARRAY[1:3, 1:4] OF INTEGER`. The rows are the shops and the columns are the weeks.\n\n" + salesGrid,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the total sales of Shop 3 over the four weeks.", value: rowT[2], wrong: [130, 160], workedSolution: "150 + 130 + 115 + 160 = 555.", explanation: "555." }),
      P.num({ label: "(b)", marks: 1, stem: "State the total sales of all three shops in Week 3.", value: colT[2], wrong: [115, 400], workedSolution: "140 + 90 + 115 = 345.", explanation: "345." }),
      P.num({ label: "(c)", marks: 1, stem: "State the value of `Sales[3, 2]`.", value: 130, wrong: [105, 150], workedSolution: "Row 3, column 2 is Shop 3, Week 2: 130.", explanation: "130." }),
      P.manual({ label: "(d)", marks: 3, stem: "Write pseudocode using nested loops that outputs the total of all the values in the array.", points: ["Total set to 0 before the loops", "An outer loop for the rows (1 to 3) and an inner loop for the columns (1 to 4)", "Adds Sales[Row, Col] to the total and outputs the total after the loops"], modelAnswer: codeBlock(`Total ← 0
FOR Row ← 1 TO 3
    FOR Col ← 1 TO 4
        Total ← Total + Sales[Row, Col]
    NEXT Col
NEXT Row
OUTPUT Total`), explanation: "Nested loops visit every cell; the answer is 1 420." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Array", "A data structure holding a fixed number of items of the same type under one identifier, reached by an index.");
  b.card("DEFINITION", "Element and index", "An element is one item in an array; its index is the number giving its position.");
  b.card("DEFINITION", "Lower and upper bound", "The smallest and largest valid index. An index outside them is an error.");
  b.card("FORMULA", "Declaring arrays", "ARRAY[1:n] OF type for 1D; ARRAY[1:r, 1:c] OF type for 2D (r rows, c columns).");
  b.card("CONCEPT", "Processing a 1D array", "A loop with the loop variable as the index: total, maximum, count or search.");
  b.card("CONCEPT", "Processing a 2D array", "Nested loops: the outer for the rows and the inner for the columns; the element is Array[Row, Col].");
  b.card("CONCEPT", "Python lists", "Counting starts at 0, so pseudocode Marks[4] is marks[3]; a 2D array is a list of lists, scores[row][col].");
  b.card("CONCEPT", "Static against dynamic structures", "Static (array): fixed size, elements stored together, quick access. Dynamic (linked list, tree): size changes as the program runs.");
  b.card("CONCEPT", "Choosing 1D or 2D", "A list of one kind of value: 1D. A table where each value needs two characteristics: 2D.");
});
