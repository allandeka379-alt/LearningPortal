// Slice w4c: querying one table with SQL (comp.db.sql). Every output is computed by running the query in SQLite.
import { concept, P, ZIM } from "../lib.mjs";
import { table, fence, colList } from "./w4c-0-kit.mjs";

// T1 learners and house points.
const learners = table("Learners", [["LearnerID", "TEXT"], ["FirstName", "TEXT"], ["House", "TEXT"], ["Form", "INTEGER"], ["Points", "INTEGER"]], [
  ["L101", "Tendai", "Kariba", 3, 47],
  ["L102", "Rudo", "Nyanga", 4, 33],
  ["L103", "Farai", "Kariba", 2, 14],
  ["L104", "Chipo", "Kariba", 4, 41],
  ["L105", "Sipho", "Nyanga", 1, 26],
  ["L106", "Nyasha", "Kariba", 3, 35],
]);
const q1 = "SELECT FirstName\nFROM Learners\nWHERE House = 'Kariba' AND Points > 35\nORDER BY FirstName ASC;";
const r1 = learners.result(q1).rows;
const a1 = colList(r1, "FirstName");
if (a1 !== "Chipo, Tendai") throw new Error(a1);

// T2 cars at a dealer.
const cars = table("Cars", [["StockNo", "TEXT"], ["Make", "TEXT"], ["Colour", "TEXT"], ["YearMade", "INTEGER"], ["Automatic", "INTEGER", { bool: true }]], [
  ["C-301", "Toyota", "White", 2017, true],
  ["C-302", "Honda", "Grey", 2019, true],
  ["C-305", "Nissan", "Blue", 2014, false],
  ["C-309", "Toyota", "Silver", 2021, true],
  ["C-310", "Mazda", "Red", 2019, false],
  ["C-314", "Honda", "White", 2015, true],
]);
const q2 = "SELECT COUNT(*)\nFROM Cars\nWHERE Automatic = TRUE AND YearMade >= 2017;";
const v2 = cars.value(q2);

// T3 bakery orders.
const orders = table("Orders", [["OrderNo", "INTEGER"], ["Item", "TEXT"], ["Category", "TEXT"], ["Quantity", "INTEGER"]], [
  [501, "White loaf", "Bread", 35],
  [502, "Fruit scone", "Scones", 48],
  [503, "Birthday cake", "Cakes", 1],
  [504, "Brown loaf", "Bread", 27],
  [505, "Cheese scone", "Scones", 56],
  [506, "Cupcake", "Cakes", 72],
]);
const q3 = "SELECT SUM(Quantity)\nFROM Orders\nWHERE Category = 'Bread' OR Category = 'Scones';";
const v3 = orders.value(q3);
const v3and = orders.value("SELECT COUNT(*) FROM Orders WHERE Category = 'Bread' OR Category = 'Scones'");

// T4 songs.
const songs = table("Songs", [["SongID", "TEXT"], ["Title", "TEXT"], ["Genre", "TEXT"], ["LengthSecs", "INTEGER"]], [
  ["S1", "Morning Market", "Sungura", 243],
  ["S2", "Long Road Home", "Gospel", 318],
  ["S3", "Highveld Rain", "Sungura", 197],
  ["S4", "Sunset Drums", "Jazz", 286],
  ["S5", "River Song", "Sungura", 265],
]);
const q4 = "SELECT Title\nFROM Songs\nWHERE Genre = 'Sungura'\nORDER BY LengthSecs DESC;";
const a4 = colList(songs.result(q4).rows, "Title");

// T5 bookshop: which query gives this output?
const shop = table("Stationery", [["Code", "TEXT"], ["ItemName", "TEXT"], ["Price", "REAL"], ["InStock", "INTEGER"]], [
  ["ST1", "Ruler", 1.5, 120],
  ["ST2", "Exercise book", 0.8, 300],
  ["ST3", "Calculator", 14, 9],
  ["ST4", "Geometry set", 6.5, 0],
  ["ST5", "Pen", 0.4, 450],
]);
const q5 = "SELECT ItemName, Price FROM Stationery WHERE Price > 1 ORDER BY Price DESC;";
const out5 = shop.result(q5);
const alt5 = [
  "SELECT ItemName, Price FROM Stationery WHERE Price > 1 ORDER BY Price ASC;",
  "SELECT ItemName, Price FROM Stationery WHERE InStock > 1 ORDER BY Price DESC;",
  "SELECT ItemName FROM Stationery WHERE Price > 1 ORDER BY Price DESC;",
];
for (const q of alt5) if (shop.result(q).md === out5.md) throw new Error(`distractor gives same output: ${q}`);

// T6 rainfall: AND that can never be true.
const rain = table("Rainfall", [["Town", "TEXT"], ["MonthName", "TEXT"], ["RainMm", "INTEGER"]], [
  ["Mutare", "January", 211],
  ["Gweru", "January", 158],
  ["Mutare", "February", 176],
  ["Gweru", "February", 132],
]);
const q6 = "SELECT MonthName, RainMm\nFROM Rainfall\nWHERE Town = 'Mutare' AND Town = 'Gweru';";
if (rain.run(q6).length !== 0) throw new Error("q6");
const n6 = rain.run("SELECT * FROM Rainfall WHERE Town = 'Mutare' OR Town = 'Gweru'").length;

// Practice struct 6 marks: lodge rooms.
const rooms = table("Rooms", [["RoomNo", "INTEGER"], ["RoomType", "TEXT"], ["Beds", "INTEGER"], ["Rate", "INTEGER"], ["LakeView", "INTEGER", { bool: true }]], [
  [11, "Single", 1, 55, false],
  [12, "Double", 2, 85, true],
  [14, "Family", 4, 130, true],
  [17, "Double", 2, 70, false],
  [19, "Single", 1, 65, true],
  [22, "Family", 4, 115, false],
]);
const q8a = "SELECT RoomNo, Rate\nFROM Rooms\nWHERE LakeView = TRUE\nORDER BY Rate ASC;";
const r8a = rooms.result(q8a).rows;
const q8c = "SELECT SUM(Beds) FROM Rooms WHERE RoomType = 'Double' OR RoomType = 'Family';";
const v8c = rooms.value(q8c);
const q8bModel = "SELECT RoomNo, RoomType\nFROM Rooms\nWHERE Rate < 80 AND Beds = 1\nORDER BY RoomNo DESC;";
const r8b = rooms.result(q8bModel);

// Practice struct 8 marks: football academy.
const players = table("Players", [["PlayerID", "TEXT"], ["PlayerName", "TEXT"], ["AgeGroup", "TEXT"], ["Position", "TEXT"], ["Goals", "INTEGER"], ["FeesPaid", "INTEGER", { bool: true }]], [
  ["P01", "Tatenda", "U15", "Striker", 13, true],
  ["P02", "Sipho", "U13", "Defender", 1, false],
  ["P03", "Farai", "U15", "Midfielder", 6, true],
  ["P04", "Thandeka", "U13", "Striker", 9, true],
  ["P05", "Tendai", "U15", "Striker", 11, false],
  ["P06", "Nyasha", "U13", "Midfielder", 4, true],
  ["P07", "Chipo", "U15", "Goalkeeper", 0, true],
]);
const q9a = "SELECT PlayerName, Goals\nFROM Players\nWHERE AgeGroup = 'U15' AND Goals > 5\nORDER BY Goals DESC;";
const r9a = players.result(q9a).rows;
const q9b = "SELECT COUNT(*)\nFROM Players\nWHERE FeesPaid = FALSE OR Position = 'Striker';";
const v9b = players.value(q9b);
const q9c = "SELECT SUM(Goals) FROM Players WHERE Position = 'Striker';";
const v9c = players.value(q9c);
if (players.run("SELECT PlayerName FROM Players WHERE FeesPaid = FALSE AND Position = 'Striker'").map((r) => r.PlayerName).join() !== "Tendai") throw new Error("q9b overlap");

concept("comp.db.sql", { file: "db/sql", keyPrefix: "db.sql" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In an SQL query, which keyword names the table that the data comes from?",
    options: [
      ["FROM", "Correct: for example `FROM Learners`."],
      ["SELECT", "SELECT lists the fields to show."],
      ["WHERE", "WHERE gives the condition records must meet."],
      ["ORDER BY", "ORDER BY sorts the results."],
    ],
    answer: "A",
    explanation: "A query has the form SELECT fields FROM table WHERE condition ORDER BY field.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does `ORDER BY Mark DESC` do to the results of a query?",
    options: [
      ["Sorts them from the highest mark to the lowest", "Correct: DESC means descending."],
      ["Sorts them from the lowest mark to the highest", "That is ascending order, ASC."],
      ["Shows only the record with the highest mark", "ORDER BY sorts; it does not remove records."],
      ["Adds up the marks of all the records", "That is SUM(Mark)."],
    ],
    answer: "A",
    explanation: "DESC sorts in descending order (largest first, or Z to A for text); ASC sorts in ascending order.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of an SQL query to its purpose.",
    pairs: [
      ["SELECT", "Lists the fields to be shown in the results"],
      ["WHERE", "Gives the condition that records must meet"],
      ["ORDER BY", "Sorts the records in the results"],
      ["COUNT", "Returns the number of records that meet the condition"],
      ["SUM", "Adds up the values of a numeric field"],
    ],
    explanation: "SELECT chooses fields, WHERE filters records, ORDER BY sorts, COUNT counts records and SUM totals a field.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A table `Customers` has a text field `Town`. Which WHERE clause correctly selects the customers who live in Gweru?",
    options: [
      ["`WHERE Town = 'Gweru'`", "Correct: a text value goes in quotation marks."],
      ["`WHERE Town = Gweru`", "Without quotes, Gweru would be read as a field name."],
      ["`WHERE 'Town' = Gweru`", "The quotes are around the wrong item: Town is the field."],
      ["`WHERE Gweru = Town()`", "The field goes on the left and needs no brackets."],
    ],
    answer: "A",
    explanation: "Field names are written as they are; text values are enclosed in single quotes.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A teacher wants the learners who scored **at least** 65 in a test. Which condition is correct?",
    options: [
      ["`WHERE Score >= 65`", "Correct: 'at least 65' includes 65."],
      ["`WHERE Score > 65`", "This leaves out learners who scored exactly 65."],
      ["`WHERE Score <= 65`", "This selects scores of 65 or less."],
      ["`WHERE Score = 65`", "This selects only scores of exactly 65."],
    ],
    answer: "A",
    explanation: "'At least' and 'or more' mean `>=`; 'more than' means `>`.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A field can be used in the WHERE clause of a query even when it is not listed after SELECT.",
    answer: true,
    explanation: "True. WHERE and ORDER BY may use any field of the table; only the fields after SELECT appear in the output.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "`SELECT COUNT(*) FROM Sales;` adds up the values stored in every field of the Sales table.",
    answer: false,
    explanation: "False. COUNT(*) returns the number of records. SUM(Field) adds up the values of one numeric field.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `A car dealer in Harare has this table.\n\n${cars.md}\n\nWhat is output by this query?\n\n${fence(q2)}`,
    value: v2,
    wrong: [cars.value("SELECT COUNT(*) FROM Cars WHERE Automatic = TRUE")],
    explanation: `A record is counted only if it is automatic AND made in 2017 or later: ${cars.run("SELECT StockNo FROM Cars WHERE Automatic = TRUE AND YearMade >= 2017").map((r) => r.StockNo).join(", ")}. The output is ${v2}.`,
    workedSolution: `1. Automatic cars: ${cars.run("SELECT StockNo FROM Cars WHERE Automatic = TRUE").map((r) => r.StockNo).join(", ")}.\n2. Of these, made in 2017 or later: ${cars.run("SELECT StockNo FROM Cars WHERE Automatic = TRUE AND YearMade >= 2017").map((r) => r.StockNo).join(", ")}.\n3. COUNT gives ${v2}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["OR includes a record if either condition is TRUE.", "SUM adds the Quantity values; it does not count the records."],
    stem: `A bakery in Bulawayo stores today's orders.\n\n${orders.md}\n\nWhat is output by this query?\n\n${fence(q3)}`,
    value: v3,
    wrong: [v3and],
    explanation: `Bread and scone orders: ${orders.run("SELECT Quantity FROM Orders WHERE Category = 'Bread' OR Category = 'Scones'").map((r) => r.Quantity).join(" + ")} = ${v3}.`,
    workedSolution: `1. Records where Category is Bread or Scones: ${orders.run("SELECT Item FROM Orders WHERE Category = 'Bread' OR Category = 'Scones'").map((r) => r.Item).join(", ")}.\n2. Add their quantities: ${orders.run("SELECT Quantity FROM Orders WHERE Category = 'Bread' OR Category = 'Scones'").map((r) => r.Quantity).join(" + ")} = ${v3}.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Both conditions must be TRUE.", "> 35 does not include 35."],
    stem: `A school records house points.\n\n${learners.md}\n\nWhich names are output by this query, in order?\n\n${fence(q1)}`,
    options: [
      [a1, "Correct: Kariba learners with more than 35 points, sorted A to Z."],
      ["Chipo, Nyasha, Tendai", "Nyasha has exactly 35 points, and 35 > 35 is FALSE."],
      ["Tendai, Chipo", "These are the right learners, but ASC sorts the names A to Z."],
      ["Chipo, Rudo, Tendai", "Rudo is in Nyanga house, so the first condition is FALSE."],
    ],
    answer: "A",
    explanation: `Kariba learners: Tendai (47), Farai (14), Chipo (41), Nyasha (35). More than 35: Tendai and Chipo. Sorted ascending by name: ${a1}.`,
  });
  b.short({
    d: 3, skill: "APPLICATION",
    hints: ["Filter first, then sort by length, then show only the titles."],
    stem: `A radio station stores songs.\n\n${songs.md}\n\nWrite the titles output by this query, in order, separated by commas.\n\n${fence(q4)}`,
    accepted: [a4],
    wrong: [colList(songs.result("SELECT Title FROM Songs WHERE Genre = 'Sungura' ORDER BY LengthSecs ASC").rows, "Title")],
    explanation: `The Sungura songs sorted by length, longest first: ${songs.run("SELECT Title, LengthSecs FROM Songs WHERE Genre = 'Sungura' ORDER BY LengthSecs DESC").map((r) => `${r.Title} (${r.LengthSecs} s)`).join(", ")}. Only Title is shown.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Check the fields shown, the condition and the order separately."],
    stem: `A stationery shop has this table.\n\n${shop.md}\n\nWhich query produces exactly this output?\n\n${out5.md}`,
    options: [
      [`\`${q5}\``, "Correct: items over 1 dollar, most expensive first, showing name and price."],
      [`\`${alt5[0]}\``, "ASC would put the cheapest of these items first."],
      [`\`${alt5[1]}\``, "Testing InStock > 1 would include the exercise book and the pen, and drop the geometry set."],
      [`\`${alt5[2]}\``, "This shows only ItemName; the output also has a Price column."],
    ],
    answer: "A",
    explanation: "The output has two fields (ItemName, Price), contains only items over 1 dollar, and is sorted from the highest price down, so the query needs `WHERE Price > 1` and `ORDER BY Price DESC`.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Can one record have two different towns?"],
    stem: `A weather table stores monthly rainfall.\n\n${rain.md}\n\nThe query below was meant to show the rainfall for both towns. Why does it output no records?\n\n${fence(q6)}`,
    options: [
      ["No record can have Town equal to both values, so OR is needed", "Correct: with OR, all the records would be output."],
      ["Text values must not be put in quotation marks", "Quotes around text values are correct."],
      ["Town is not listed after SELECT, so it cannot be tested", "WHERE can test any field of the table."],
      ["The query needs an ORDER BY clause to output records", "ORDER BY is optional; it only sorts."],
    ],
    answer: "A",
    explanation: `AND needs both conditions TRUE for the same record, which is impossible here. \`WHERE Town = 'Mutare' OR Town = 'Gweru'\` returns all ${n6} records.`,
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the query, which lists the names of products in the Drinks category in alphabetical order.",
    template: "{{blank:a}} ProductName\n\n{{blank:b}} Products\n\n{{blank:c}} Category = 'Drinks'\n\n{{blank:d}} ProductName ASC;",
    blanks: [
      { id: "a", accepted: ["SELECT"], choices: ["SELECT", "FROM", "WHERE", "ORDER BY"] },
      { id: "b", accepted: ["FROM"], choices: ["SELECT", "FROM", "WHERE", "ORDER BY"] },
      { id: "c", accepted: ["WHERE"], choices: ["SELECT", "FROM", "WHERE", "ORDER BY"] },
      { id: "d", accepted: ["ORDER BY"], choices: ["SELECT", "FROM", "WHERE", "ORDER BY"] },
    ],
    wrong: [["FROM", "SELECT", "WHERE", "ORDER BY"]],
    explanation: "The clauses always come in the order SELECT, FROM, WHERE, ORDER BY.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["'Fewer than' does not include the number itself.", "Which value is text and needs quotes?"],
    stem: "A table `Buses` has the fields `Route`, `Depot`, `Seats` and `Wifi` (Boolean). Complete the query so that it shows the route of every bus from the Masvingo depot that has fewer than 60 seats.",
    template: "SELECT Route\n\nFROM Buses\n\nWHERE Depot = {{blank:a}} {{blank:b}} Seats {{blank:c}} 60;",
    blanks: [
      { id: "a", accepted: ["'Masvingo'"], choices: ["'Masvingo'", "Masvingo", "Depot", "'Depot'"] },
      { id: "b", accepted: ["AND"], choices: ["AND", "OR", "NOT", "ORDER BY"] },
      { id: "c", accepted: ["<"], choices: ["<", "<=", ">", ">="] },
    ],
    wrong: [["Masvingo", "OR", "<="]],
    explanation: "`WHERE Depot = 'Masvingo' AND Seats < 60`: the text value is quoted, both conditions must hold, and 'fewer than' is `<`.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "Nyasha builds a query in the design grid of a database package. She wants only products with a price over 100. Where does she type `>100`?",
    options: [
      ["In the Criteria row of the Price column", "Correct: conditions go in the Criteria row under the field."],
      ["In the Sort row of the Price column", "The Sort row sets ascending or descending order."],
      ["In the Show row of the Price column", "The Show box decides whether the field appears in the results."],
      ["In the Table row of the Price column", "The Table row names the table the field comes from."],
    ],
    answer: "A",
    explanation: "In a query design grid, each condition is entered in the Criteria row of the field it tests; it becomes the WHERE clause of the SQL.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4,
    hints: ["Name the fields, then the table, then the condition, then the order."],
    stem: "A table `Members` has the fields `MemberID`, `Surname`, `Town`, `Phone` and `JoinYear`. Write an SQL query to show the surname and phone number of every member who lives in Mutare, sorted by surname from A to Z.",
    points: [
      "`SELECT Surname, Phone`",
      "`FROM Members`",
      "`WHERE Town = 'Mutare'` (text in quotes)",
      "`ORDER BY Surname ASC` (ASC may be omitted only if the answer still states ascending order)",
    ],
    explanation: "One mark per correct clause.",
    modelAnswer: "SELECT Surname, Phone FROM Members WHERE Town = 'Mutare' ORDER BY Surname ASC;",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 3,
    hints: ["SUM returns one value.", "Two conditions joined by AND."],
    stem: "A table `Sales` has the fields `SaleID`, `Branch`, `Product`, `Amount` and `Paid` (Boolean). Write an SQL query that outputs the total of the `Amount` field for all the sales at the Gweru branch that have been paid.",
    points: [
      "`SELECT SUM(Amount)`",
      "`FROM Sales`",
      "`WHERE Branch = 'Gweru' AND Paid = TRUE`",
    ],
    explanation: "SUM totals one field over the records that meet both conditions.",
    modelAnswer: "SELECT SUM(Amount) FROM Sales WHERE Branch = 'Gweru' AND Paid = TRUE;",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Filter, sort, then show only the selected fields.", "OR includes both room types."],
    stem: `A lodge at Lake Kariba stores its rooms in the table \`Rooms\`.\n\n${rooms.md}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: `Complete the output of this query.\n\n${fence(q8a)}`,
        template: r8a.map((r, i) => `Row ${i + 1}: RoomNo {{blank:n${i}}}, Rate {{blank:r${i}}}`).join("\n\n"),
        blanks: r8a.flatMap((r, i) => [
          { id: `n${i}`, accepted: [String(r.RoomNo)], input: "number", wrong: String(r8a[(i + 1) % r8a.length].RoomNo) },
          { id: `r${i}`, accepted: [String(r.Rate)], input: "number", wrong: String(r8a[(i + 1) % r8a.length].Rate) },
        ]),
        explanation: `Lake-view rooms sorted by rate, lowest first:\n\n${rooms.result(q8a).md}`,
      }),
      P.num({
        label: "(b)", stem: `State the output of this query.\n\n${fence(q8c)}`, value: v8c,
        wrong: [rooms.value("SELECT COUNT(*) FROM Rooms WHERE RoomType = 'Double' OR RoomType = 'Family'")],
        explanation: `Double and family rooms have ${rooms.run("SELECT Beds FROM Rooms WHERE RoomType = 'Double' OR RoomType = 'Family'").map((r) => r.Beds).join(" + ")} = ${v8c} beds.`,
        workedSolution: `1. Double or family rooms: ${rooms.run("SELECT RoomNo FROM Rooms WHERE RoomType = 'Double' OR RoomType = 'Family'").map((r) => r.RoomNo).join(", ")}.\n2. Sum of Beds = ${v8c}.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Write an SQL query to show the room number and room type of every one-bed room with a rate below 80, sorted with the highest room number first.",
        points: ["`SELECT RoomNo, RoomType FROM Rooms`", "`WHERE Rate < 80 AND Beds = 1` (both conditions, joined by AND)", "`ORDER BY RoomNo DESC`"],
        modelAnswer: `${q8bModel.replace(/\n/g, " ")} (output on this data: ${colList(r8b.rows, "RoomNo")})`,
      }),
    ],
    explanation: `(a) ${r8a.map((r) => `${r.RoomNo} at ${r.Rate}`).join("; ")}. (b) ${v8c}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["For AND, a record must pass both tests; for OR, either.", "Write the output as rows in the sorted order."],
    stem: `A football academy in Bulawayo keeps this table, \`Players\`.\n\n${players.md}`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: `Complete the output of this query, row by row.\n\n${fence(q9a)}`,
        template: r9a.map((r, i) => `Row ${i + 1}: {{blank:p${i}}}`).join("\n\n"),
        blanks: r9a.map((r, i) => ({ id: `p${i}`, accepted: [r.PlayerName], choices: players.rows.map((x) => x[1]), wrong: r9a[(i + 1) % r9a.length].PlayerName })),
        explanation: `U15 players with more than 5 goals, most goals first:\n\n${players.result(q9a).md}`,
      }),
      P.num({
        label: "(b)", stem: `State the output of this query.\n\n${fence(q9b)}`, value: v9b,
        wrong: [players.value("SELECT COUNT(*) FROM Players WHERE FeesPaid = FALSE AND Position = 'Striker'")],
        explanation: `Records with fees unpaid OR playing as striker: ${players.run("SELECT PlayerName FROM Players WHERE FeesPaid = FALSE OR Position = 'Striker'").map((r) => r.PlayerName).join(", ")}. Each is counted once: ${v9b}.`,
        workedSolution: `1. Unpaid: ${players.run("SELECT PlayerName FROM Players WHERE FeesPaid = FALSE").map((r) => r.PlayerName).join(", ")}.\n2. Strikers: ${players.run("SELECT PlayerName FROM Players WHERE Position = 'Striker'").map((r) => r.PlayerName).join(", ")}.\n3. Together, without counting Tendai twice: ${v9b}.`,
      }),
      P.num({
        label: "(c)", stem: `State the output of this query.\n\n${fence(q9c)}`, value: v9c,
        wrong: [players.value("SELECT COUNT(*) FROM Players WHERE Position = 'Striker'")],
        explanation: `Strikers' goals: ${players.run("SELECT Goals FROM Players WHERE Position = 'Striker'").map((r) => r.Goals).join(" + ")} = ${v9c}.`,
        workedSolution: `1. Strikers: ${players.run("SELECT PlayerName FROM Players WHERE Position = 'Striker'").map((r) => r.PlayerName).join(", ")}.
2. Add their goals: ${players.run("SELECT Goals FROM Players WHERE Position = 'Striker'").map((r) => r.Goals).join(" + ")} = ${v9c}.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Write an SQL query to show the name and position of every player whose fees have not been paid, in alphabetical order of name.",
        points: ["`SELECT PlayerName, Position FROM Players`", "`WHERE FeesPaid = FALSE`", "`ORDER BY PlayerName ASC`"],
        modelAnswer: "SELECT PlayerName, Position FROM Players WHERE FeesPaid = FALSE ORDER BY PlayerName ASC;",
      }),
    ],
    explanation: `(a) ${colList(r9a, "PlayerName")}. (b) ${v9b}. (c) ${v9c}.`,
  });

  b.card("DEFINITION", "Query", "A request for data from a database that returns only the fields and records meeting given conditions, in a given order.");
  b.card("CONCEPT", "Order of the clauses in an SQL query", "SELECT fields, FROM table, WHERE condition, ORDER BY field ASC/DESC, ending with a semicolon.");
  b.card("CONCEPT", "How to work out the output of a query", "1 Filter the records with WHERE. 2 Sort them with ORDER BY. 3 Show only the fields listed after SELECT, in that order.");
  b.card("FACT", "COUNT(*) versus SUM(Field)", "COUNT(*) gives the number of records selected; SUM(Field) adds up the values of a numeric field. Each returns one value.");
  b.card("FACT", "AND versus OR in WHERE", "AND: both conditions must be TRUE for the record. OR: at least one must be TRUE. 'Show A and B' in English usually means OR.");
  b.card("FACT", "ASC and DESC", "ASC = ascending (smallest first, A to Z). DESC = descending (largest first, Z to A).");
  b.card("FACT", "Quotes in a WHERE clause", "Text values go in single quotes ('Gweru'); numbers and TRUE/FALSE do not.");
  b.card("FORMULA", "Template: total of a field for selected records", "SELECT SUM(Field) FROM Table WHERE condition;");
  b.card("CONCEPT", "Query design grid (database package)", "Fields go in columns; conditions in the Criteria row; Ascending/Descending in the Sort row; the Show box decides if a field is output.", undefined, { applies: ZIM });
});
