// Slice w4c: multi-table queries and connecting a database to a program (comp.db.advanced-queries, ZIMSEC only).
// Every query result is computed in SQLite; the Python program was run with python 3 and its output is checked
// against the same statements run here.
import { concept, P } from "../lib.mjs";
import { table, fence } from "./w4c-0-kit.mjs";

// Q: calculated field in a join (tour company).
const tours = table("Tours", [["TourCode", "TEXT"], ["Destination", "TEXT"], ["PricePerPerson", "INTEGER"]], [
  ["TR-A", "Great Zimbabwe", 35],
  ["TR-B", "Matobo Hills", 28],
  ["TR-C", "Chimanimani", 42],
], [{ name: "Bookings", columns: [["BookingNo", "INTEGER"], ["TourCode", "TEXT"], ["People", "INTEGER"]], rows: [
  [6021, "TR-B", 3],
  [6022, "TR-C", 2],
  [6023, "TR-A", 5],
  [6024, "TR-B", 4],
] }]);
const q7 = "SELECT Bookings.BookingNo, Tours.Destination, Bookings.People * Tours.PricePerPerson AS Cost\nFROM Bookings\nINNER JOIN Tours ON Bookings.TourCode = Tours.TourCode\nWHERE Bookings.BookingNo = 6024;";
const v7 = tours.value("SELECT Bookings.People * Tours.PricePerPerson FROM Bookings INNER JOIN Tours ON Bookings.TourCode = Tours.TourCode WHERE Bookings.BookingNo = 6024");

// Q: COUNT per group (clubs and members).
const clubs = table("Clubs", [["ClubID", "TEXT"], ["ClubName", "TEXT"]], [["CB1", "Debate"], ["CB2", "Chess"], ["CB3", "Choir"]], [
  { name: "Members", columns: [["MemberID", "TEXT"], ["FirstName", "TEXT"], ["ClubID", "TEXT"]], rows: [
    ["MB-A", "Tendai", "CB2"], ["MB-B", "Rudo", "CB3"], ["MB-C", "Sipho", "CB2"], ["MB-D", "Chipo", "CB3"], ["MB-E", "Farai", "CB2"], ["MB-F", "Nyasha", "CB1"],
  ] },
]);
const q8 = "SELECT Clubs.ClubName, COUNT(*) AS Total\nFROM Members\nINNER JOIN Clubs ON Members.ClubID = Clubs.ClubID\nGROUP BY Clubs.ClubName;";
const r8 = clubs.result(q8);
const chessCount = r8.rows.find((r) => r.ClubName === "Chess").Total;

// Q: total takings with a join (school canteen).
const canteen = table("Meals", [["MealID", "TEXT"], ["MealName", "TEXT"], ["Price", "INTEGER"]], [["ML1", "Sadza and beef", 3], ["ML2", "Rice and chicken", 4], ["ML3", "Vegetable stew", 2]], [
  { name: "Orders", columns: [["OrderID", "TEXT"], ["MealID", "TEXT"], ["Qty", "INTEGER"]], rows: [
    ["OD-1", "ML2", 11], ["OD-2", "ML1", 14], ["OD-3", "ML3", 9], ["OD-4", "ML2", 6],
  ] },
]);
const q16 = "SELECT SUM(Orders.Qty * Meals.Price) AS Takings\nFROM Orders\nINNER JOIN Meals ON Orders.MealID = Meals.MealID;";
const v16 = canteen.value(q16);
const v16qty = canteen.value("SELECT SUM(Qty) FROM Orders");
const topMeal = canteen.run("SELECT Meals.MealName, SUM(Orders.Qty) AS Sold FROM Orders INNER JOIN Meals ON Orders.MealID = Meals.MealID GROUP BY Meals.MealName ORDER BY Sold DESC")[0];

// Practice struct 6 marks: a Python program (run with python 3; output pasted, then checked here).
const py = `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE Books (BookID TEXT, Title TEXT, Copies INTEGER)")
cur.executemany("INSERT INTO Books VALUES (?, ?, ?)",
                [("K1", "Atlas", 4), ("K2", "Poems", 1), ("K3", "Physics", 6)])
conn.commit()

wanted = 3
cur.execute("SELECT Title FROM Books WHERE Copies >= ? ORDER BY Copies DESC", (wanted,))
for row in cur.fetchall():
    print(row[0])

cur.execute("UPDATE Books SET Copies = Copies + 2 WHERE BookID = ?", ("K2",))
conn.commit()
cur.execute("SELECT SUM(Copies) FROM Books")
print("Total copies:", cur.fetchone()[0])
conn.close()`;
const pyOutput = ["Physics", "Atlas", "Total copies: 13"]; // pasted from python 3
const bk = table("Books", [["BookID", "TEXT"], ["Title", "TEXT"], ["Copies", "INTEGER"]], [["K1", "Atlas", 4], ["K2", "Poems", 1], ["K3", "Physics", 6]]);
const pyFirst = bk.run("SELECT Title FROM Books WHERE Copies >= 3 ORDER BY Copies DESC").map((r) => r.Title);
bk.run("UPDATE Books SET Copies = Copies + 2 WHERE BookID = 'K2'");
const pyTotal = bk.value("SELECT SUM(Copies) FROM Books");
if (pyFirst.join() !== pyOutput.slice(0, 2).join() || `Total copies: ${pyTotal}` !== pyOutput[2]) throw new Error("python mirror");

// Practice struct 8 marks: courier parcels and branches.
const courier = table("Branches", [["BranchID", "TEXT"], ["Town", "TEXT"]], [["BX1", "Harare"], ["BX2", "Bulawayo"], ["BX3", "Kwekwe"]], [
  { name: "Parcels", columns: [["ParcelNo", "INTEGER"], ["BranchID", "TEXT"], ["MassKg", "INTEGER"], ["Express", "INTEGER", { bool: true }]], rows: [
    [9011, "BX2", 3, true], [9012, "BX1", 12, false], [9013, "BX2", 7, false], [9014, "BX3", 2, true], [9015, "BX2", 5, true], [9016, "BX1", 4, true],
  ] },
]);
const q18a = "SELECT Parcels.ParcelNo, Branches.Town\nFROM Parcels\nINNER JOIN Branches ON Parcels.BranchID = Branches.BranchID\nWHERE Parcels.Express = TRUE AND Parcels.MassKg > 3;";
const r18a = courier.result(q18a).rows;
const q18b = "SELECT Branches.Town, SUM(Parcels.MassKg) AS TotalMass\nFROM Parcels\nINNER JOIN Branches ON Parcels.BranchID = Branches.BranchID\nGROUP BY Branches.Town\nORDER BY TotalMass DESC;";
const r18b = courier.result(q18b).rows;

concept("comp.db.advanced-queries", { file: "db/advanced-queries", keyPrefix: "db.advanced-queries" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a query, what does a **join** do?",
    options: [
      ["Combines records from related tables by matching a common field", "Correct: usually a foreign key matched to a primary key."],
      ["Adds the values of a numeric field for all the records", "That is SUM."],
      ["Adds new records to the end of a table", "That is INSERT."],
      ["Copies a table into a spreadsheet file", "That is exporting."],
    ],
    answer: "A",
    explanation: "A join pairs each record in one table with the related record(s) in another, using matching key values.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement describes a **calculated field** in a query?",
    options: [
      ["Its values are worked out from other fields each time the query runs", "Correct: for example Quantity * Price."],
      ["It is typed into the table by the user for every record", "Calculated values are not typed in."],
      ["It is the primary key of the table the query uses", "A key is a stored field."],
      ["It prompts the user for a value when the query runs", "That is a parameter."],
    ],
    answer: "A",
    explanation: "A calculated field is an expression in the query, such as `Hours * Rate AS Pay`; it is not stored in a table.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A pharmacy saves a query whose criteria for the Supplier field is `[Enter supplier name]`. What happens when the query is run?",
    options: [
      ["The user is asked to type a supplier name, and only that supplier's records are shown", "Correct: it is a parameter query."],
      ["Only records whose supplier is literally 'Enter supplier name' are shown", "Square brackets make it a prompt, not a text value."],
      ["Every record is shown, sorted by supplier name", "No sorting is set; the criterion filters records."],
      ["A new supplier record is added to the table", "Queries that select records do not add records."],
    ],
    answer: "A",
    explanation: "A parameter query prompts for a value at run time and uses it in the criteria, so one query serves every supplier.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The values of a calculated field in a query are stored permanently in the table.",
    answer: false,
    explanation: "False. They are calculated whenever the query runs, so they always use the current values of the fields.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A query with `GROUP BY Town` and `COUNT(*)` returns one row for each different town.",
    answer: true,
    explanation: "True. Records with the same town form one group, and COUNT gives the number of records in each group.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its description.",
    pairs: [
      ["Join", "Combines related records from two tables using matching key values"],
      ["Calculated field", "A result column worked out from other fields, such as Hours * Rate"],
      ["Parameter query", "Asks the user for a value when it runs and uses it as the criterion"],
      ["GROUP BY", "Gives one result row for each set of records sharing a value"],
      ["Database connection", "The link a program opens to send SQL to a database"],
    ],
    explanation: "Join, calculated field, parameter query, grouping and connection are the Form 4 query and programming terms.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Find the tour for booking 6024, then its price per person."],
    stem: `A tour company stores these tables.\n\n${tours.md}\n\n${tours.mdOf("Bookings")}\n\nWhat value of Cost is output by this query?\n\n${fence(q7)}`,
    value: v7,
    wrong: [4 * 35],
    explanation: `Booking 6024 is for TR-B (Matobo Hills, 28 per person) with 4 people: 4 × 28 = ${v7}.`,
    workedSolution: `1. Booking 6024: TourCode TR-B, People 4.\n2. Join: TR-B has PricePerPerson 28.\n3. Cost = 4 × 28 = ${v7}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Find the ClubID of Chess, then count it in Members."],
    stem: `A school stores clubs and members.\n\n${clubs.md}\n\n${clubs.mdOf("Members")}\n\nThis query is run:\n\n${fence(q8)}\n\nWhat is the value of Total in the row for Chess?`,
    value: chessCount,
    wrong: [1],
    explanation: `Chess is CB2, which appears ${chessCount} times in Members. The full output:\n\n${r8.md}`,
    workedSolution: `1. Chess has ClubID CB2.\n2. Members with CB2: Tendai, Sipho, Farai.\n3. COUNT = ${chessCount}.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Match the foreign key to the primary key it refers to."],
    stem: "The table `Results` has the fields `ResultID`, `CandidateNo`, `Subject` and `Grade`. The table `Candidates` has the fields `CandidateNo`, `Surname` and `Centre`. Which join condition links the tables correctly?",
    options: [
      ["`ON Results.CandidateNo = Candidates.CandidateNo`", "Correct: the foreign key in Results matches the primary key of Candidates."],
      ["`ON Results.ResultID = Candidates.CandidateNo`", "ResultID is the key of Results, not a link to a candidate."],
      ["`ON Results.Subject = Candidates.Surname`", "These fields hold different kinds of data."],
      ["`ON Results.Grade = Candidates.Centre`", "Grade and Centre are not related fields."],
    ],
    answer: "A",
    explanation: "Tables are joined on the field they share: the foreign key `Results.CandidateNo` and the primary key `Candidates.CandidateNo`.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Which keyword gives a calculated column a name?", "Which keyword introduces the join condition?"],
    stem: "Complete the query, which lists each employee's name with their weekly pay (hours multiplied by hourly rate). `Timesheets` holds `EmpID` and `Hours`; `Employees` holds `EmpID`, `EmpName` and `Rate`.",
    template: "SELECT Employees.EmpName, Timesheets.Hours * Employees.Rate {{blank:a}} WeeklyPay\n\nFROM Timesheets\n\nINNER JOIN Employees {{blank:b}} Timesheets.EmpID = Employees.{{blank:c}};",
    blanks: [
      { id: "a", accepted: ["AS"], choices: ["AS", "ON", "BY", "SET"] },
      { id: "b", accepted: ["ON"], choices: ["ON", "AS", "WHERE", "BY"] },
      { id: "c", accepted: ["EmpID"], choices: ["EmpID", "EmpName", "Rate", "Hours"] },
    ],
    wrong: [["ON", "AS", "EmpName"]],
    explanation: "`AS WeeklyPay` names the calculated field; `ON Timesheets.EmpID = Employees.EmpID` matches the foreign key to the primary key.",
  });
  b.short({
    d: 4, skill: "ANALYSIS",
    hints: ["Group the orders by meal and add their quantities."],
    stem: `A school canteen stores meals and orders.\n\n${canteen.md}\n\n${canteen.mdOf("Orders")}\n\nA query groups the orders by meal name and sums Qty. Which meal has the largest total?`,
    accepted: [topMeal.MealName],
    wrong: ["Sadza and beef"],
    explanation: `Totals: ${canteen.run("SELECT Meals.MealName, SUM(Orders.Qty) AS Sold FROM Orders INNER JOIN Meals ON Orders.MealID = Meals.MealID GROUP BY Meals.MealName ORDER BY Sold DESC").map((r) => `${r.MealName} ${r.Sold}`).join(", ")}. The largest is ${topMeal.MealName}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    hints: ["Work out Qty × Price for each order, then add."],
    stem: `Using the same canteen tables, state the output of this query.\n\n${canteen.md}\n\n${canteen.mdOf("Orders")}\n\n${fence(q16)}`,
    value: v16,
    wrong: [v16qty],
    explanation: `Each order's value is Qty × Price: ${canteen.run("SELECT Orders.Qty AS q, Meals.Price AS p FROM Orders INNER JOIN Meals ON Orders.MealID = Meals.MealID").map((r) => `${r.q} × ${r.p}`).join(" + ")} = ${v16}.`,
    workedSolution: `1. Join each order to its meal's price.\n2. ${canteen.run("SELECT Orders.OrderID AS o, Orders.Qty AS q, Meals.Price AS p FROM Orders INNER JOIN Meals ON Orders.MealID = Meals.MealID").map((r) => `${r.o}: ${r.q} × ${r.p} = ${r.q * r.p}`).join("; ")}.\n3. Sum = ${v16}.`,
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "A program has run an UPDATE statement on a database. Which step makes the change permanent?",
    options: [
      ["Committing the changes", "Correct: commit saves the changes to the database."],
      ["Opening the connection again", "Opening a connection does not save earlier changes."],
      ["Running a SELECT statement", "SELECT only reads data."],
      ["Printing the records on screen", "Displaying data does not save it."],
    ],
    answer: "A",
    explanation: "The usual steps are connect, send SQL, use the results, commit any changes, then close the connection.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What could a user type into a search box?"],
    stem: "Why should a program pass the text typed by a user to the database as a parameter (placeholder), rather than joining it into the SQL statement?",
    options: [
      ["So the input is treated only as data, which prevents SQL injection", "Correct: typed SQL code cannot change the statement."],
      ["So the query runs without needing a database connection", "A connection is always needed."],
      ["So the user's text is automatically spelt correctly", "Parameters do not check spelling."],
      ["So the results are always sorted in ascending order", "Sorting is set by ORDER BY."],
    ],
    answer: "A",
    explanation: "If input is pasted into the SQL text, a user could type SQL that changes or deletes data (SQL injection). Parameters keep input separate from the statement.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What happens to a stored total when a price changes?"],
    stem: "A clerk suggests adding a field `TotalCost` to the `Orders` table and typing in Quantity × UnitPrice for every order. Explain why a calculated field in a query is better.",
    points: [
      "A calculated field is worked out from the current data every time, so it is always correct (a stored total becomes wrong / inconsistent if the quantity or price changes)",
      "It saves typing / storage and avoids arithmetic errors by the clerk",
    ],
    explanation: "Derived values should be calculated, not stored.",
    modelAnswer: "The query calculates TotalCost from the current quantity and price each time it runs, so it is never out of date and never mistyped. A stored total would be wrong as soon as an order or price changed, and typing it in wastes time.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think of the steps from opening the database to finishing with it."],
    stem: "Describe the steps a program takes to read the records of a database table and display them.",
    points: [
      "Opens a connection to the database (file or server)",
      "Sends / executes an SQL SELECT statement (with any user input passed as parameters)",
      "Reads the returned records one at a time in a loop and displays the fields of each",
      "Closes the connection when finished",
    ],
    explanation: "Connect, query, loop through the results, close.",
    modelAnswer: "The program first opens a connection to the database. It then executes a SELECT statement, passing any search value as a parameter. It loops through the records returned, displaying the fields of each one, and finally closes the connection.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["The ? is replaced by the value of wanted.", "The UPDATE adds 2 copies to one book only."],
    stem: `Farai writes this Python program for his school library project.\n\n${fence(py)}`,
    parts: [
      P.short({
        label: "(a)", marks: 2, stem: "Write the first two lines that the program outputs, in order, separated by a comma.",
        accepted: [{ value: pyOutput.slice(0, 2).join(", "), marks: 2 }, { value: pyOutput.slice(0, 2).reverse().join(", "), marks: 1, feedback: "Right titles, but DESC puts the larger number of copies first." }],
        wrong: ["Atlas"],
        explanation: `Books with at least 3 copies: Atlas (4) and Physics (6). Sorted by Copies descending: ${pyOutput.slice(0, 2).join(", ")}.`,
      }),
      P.num({ label: "(b)", stem: "State the number printed on the last line.", value: pyTotal, wrong: [4 + 1 + 6], explanation: `Poems rises from 1 to 3 copies, so the total is 4 + 3 + 6 = ${pyTotal}.`, workedSolution: `1. UPDATE: K2 has 1 + 2 = 3 copies.\n2. SUM = 4 + 3 + 6 = ${pyTotal}.` }),
      P.mcq({
        label: "(c)", stem: "What is the purpose of `conn.commit()` after the UPDATE?",
        options: [["To save the change permanently in the database", "Correct."], ["To open a connection to the database", "That is sqlite3.connect."], ["To print the updated record on screen", "print does that."], ["To undo the change if it was a mistake", "That would be a rollback."]],
        answer: "A", explanation: "commit makes the changes of INSERT, UPDATE and DELETE permanent.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "The program passes `wanted` to the SELECT statement using `?`. Explain why this is better than joining the value into the SQL text.",
        points: ["The value is treated only as data, not as part of the SQL command", "This prevents SQL injection (a user typing SQL that changes or deletes data) / avoids quoting errors"],
        modelAnswer: "With a placeholder, the database treats the value strictly as data, so if the value came from a user, any SQL they typed could not change the statement. This protects against SQL injection.",
      }),
    ],
    explanation: `Output: ${pyOutput.join(" / ")}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Join first: each parcel takes its branch's town.", "Group by town and add the masses."],
    stem: `A courier company stores its branches and parcels.\n\n${courier.md}\n\n${courier.mdOf("Parcels")}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: `Complete the output of this query.\n\n${fence(q18a)}`,
        template: r18a.map((r, i) => `Row ${i + 1}: ParcelNo {{blank:n${i}}}, Town {{blank:t${i}}}`).join("\n\n"),
        blanks: r18a.flatMap((r, i) => [
          { id: `n${i}`, accepted: [String(r.ParcelNo)], input: "number", wrong: "9011" },
          { id: `t${i}`, accepted: [r.Town], choices: ["Harare", "Bulawayo", "Kwekwe"], wrong: r.Town === "Harare" ? "Kwekwe" : "Harare" },
        ]),
        explanation: `Express parcels heavier than 3 kg:\n\n${courier.result(q18a).md}`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: `Complete the output of this query.\n\n${fence(q18b)}`,
        template: r18b.map((r, i) => `Row ${i + 1}: Town {{blank:t${i}}}, TotalMass {{blank:m${i}}}`).join("\n\n"),
        blanks: r18b.flatMap((r, i) => [
          { id: `t${i}`, accepted: [r.Town], choices: ["Harare", "Bulawayo", "Kwekwe"], wrong: r18b[(i + 1) % r18b.length].Town },
          { id: `m${i}`, accepted: [String(r.TotalMass)], input: "number", wrong: String(r.TotalMass + 1) },
        ]),
        explanation: `Masses by town, heaviest first:\n\n${courier.result(q18b).md}`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "The manager wants one saved query that lists the parcels for whichever town she types in. Describe how this would be set up.",
        points: ["A parameter query: the criterion for Town is a prompt such as [Enter town] (or a ? placeholder)", "The query joins Parcels to Branches on BranchID so that Town can be tested / the typed town is used to select records each time it runs"],
        modelAnswer: "Make a parameter query joining Parcels and Branches on BranchID, with [Enter town] as the criterion for Town. Each time it runs, she types a town and only that town's parcels are listed.",
      }),
      P.mcq({
        label: "(d)", stem: "Why does Town have to come from the Branches table rather than being stored again in Parcels?",
        options: [["Each town is then stored once, avoiding repeated data", "Correct: the parcel stores only the BranchID foreign key."], ["Parcels cannot have more than four fields", "There is no such limit."], ["A join only works when no field is repeated", "Joins depend on matching keys."], ["Town is the primary key of Parcels", "ParcelNo is the primary key of Parcels."]],
        answer: "A", explanation: "Storing the town once in Branches reduces redundancy; the join fetches it when needed.",
      }),
    ],
    explanation: `(a) ${r18a.map((r) => `${r.ParcelNo} ${r.Town}`).join("; ")}. (b) ${r18b.map((r) => `${r.Town} ${r.TotalMass}`).join("; ")}.`,
  });

  b.card("DEFINITION", "Join", "Combines records from two or more tables by matching a related field, usually a foreign key with the primary key it refers to.");
  b.card("DEFINITION", "Calculated field", "A query column worked out from other fields when the query runs, e.g. Quantity * UnitPrice AS LineTotal; it is not stored.");
  b.card("DEFINITION", "Parameter query", "A query that prompts the user for a value each time it runs (e.g. [Enter town]) and uses it in its criteria.");
  b.card("CONCEPT", "GROUP BY", "Collects records sharing a value into groups and gives one result row per group, with SUM or COUNT for each.");
  b.card("FORMULA", "Join syntax", "SELECT … FROM A INNER JOIN B ON A.Key = B.Key WHERE …;");
  b.card("CONCEPT", "Steps for a program using a database", "Connect, send SQL, read the results (loop), commit changes, close the connection.");
  b.card("DEFINITION", "SQL injection", "An attack in which a user types SQL code into an input so that it changes the statement a program runs; prevented by passing input as parameters.");
  b.card("FACT", "Table.Field notation", "When two joined tables share a field name, write the table name and a dot first, e.g. Sales.ProductID.");
});
