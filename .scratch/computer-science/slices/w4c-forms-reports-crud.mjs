// Slice w4c: datasheets, forms, reports and CRUD (comp.db.forms-reports-crud, ZIMSEC only).
// Every table state after an INSERT / UPDATE / DELETE is computed by running the statements in SQLite.
import { concept, P } from "../lib.mjs";
import { table, fence } from "./w4c-0-kit.mjs";

// Q: records left after a DELETE (bus tickets).
const tickets = () => table("Tickets", [["TicketNo", "INTEGER"], ["Passenger", "TEXT"], ["Destination", "TEXT"], ["Fare", "INTEGER"], ["Cancelled", "INTEGER", { bool: true }]], [
  [3301, "Tendai", "Mutare", 12, false],
  [3302, "Rudo", "Gweru", 9, true],
  [3303, "Farai", "Mutare", 12, true],
  [3304, "Chipo", "Masvingo", 10, false],
  [3305, "Sipho", "Gweru", 9, false],
  [3306, "Thandeka", "Mutare", 12, false],
]);
const tk = tickets();
const delTk = "DELETE FROM Tickets\nWHERE Cancelled = TRUE OR Destination = 'Masvingo';";
tk.run(delTk);
const leftTk = tk.value("SELECT COUNT(*) FROM Tickets");
const tk2 = tickets();
tk2.run("DELETE FROM Tickets WHERE Cancelled = TRUE AND Destination = 'Masvingo'");
const leftTkAnd = tk2.value("SELECT COUNT(*) FROM Tickets");

// Q: CRUD sequence (school tuck-shop stock).
const stock = table("Stock", [["ItemCode", "TEXT"], ["ItemName", "TEXT"], ["Quantity", "INTEGER"], ["Price", "REAL"]], [
  ["TS1", "Freezit", 80, 0.5],
  ["TS2", "Bun", 36, 0.6],
  ["TS3", "Crisps", 64, 0.7],
]);
const seqStock = [
  "INSERT INTO Stock VALUES ('TS4', 'Maheu', 48, 1.0);",
  "UPDATE Stock SET Quantity = Quantity - 12 WHERE Price < 0.65;",
  "DELETE FROM Stock WHERE Quantity < 30;",
];
const startStockMd = stock.md;
for (const s of seqStock) stock.run(s);
const stockLeft = stock.value("SELECT COUNT(*) FROM Stock");
const totalQty = stock.value("SELECT SUM(Quantity) FROM Stock");
const finalStock = stock.result("SELECT * FROM Stock");

// Practice struct 6 marks: library members.
const lib = table("Members", [["MemberNo", "INTEGER"], ["MemberName", "TEXT"], ["Form", "INTEGER"], ["BooksOut", "INTEGER"], ["Suspended", "INTEGER", { bool: true }]], [
  [211, "Nyasha", 2, 3, false],
  [214, "Tatenda", 4, 0, true],
  [219, "Rudo", 1, 2, false],
  [226, "Farai", 4, 1, false],
  [233, "Chipo", 3, 4, true],
]);
const libStart = lib.md;
const libU = "UPDATE Members\nSET Form = Form + 1\nWHERE Form < 4;";
lib.run(libU);
const formsAfter = lib.run("SELECT MemberName, Form FROM Members ORDER BY MemberNo");
const libD = "DELETE FROM Members\nWHERE Form = 4 AND BooksOut = 0;";
lib.run(libD);
const libLeft = lib.run("SELECT MemberName FROM Members ORDER BY MemberNo").map((r) => r.MemberName);
const filtered = lib.value("SELECT COUNT(*) FROM Members WHERE Suspended = TRUE");

// Practice struct 8 marks: clinic vaccination bookings.
const vac = table("Bookings", [["BookingID", "TEXT"], ["ChildName", "TEXT"], ["Village", "TEXT"], ["Dose", "INTEGER"], ["Attended", "INTEGER", { bool: true }]], [
  ["VB-81", "Tafara", "Chivi", 1, true],
  ["VB-82", "Rutendo", "Zaka", 2, false],
  ["VB-83", "Kudzai", "Chivi", 2, true],
  ["VB-84", "Ruvimbo", "Bikita", 1, false],
  ["VB-85", "Tinashe", "Zaka", 3, false],
]);
const vacStart = vac.md;
const vacU = "UPDATE Bookings SET Attended = TRUE WHERE Village = 'Zaka';";
vac.run(vacU);
const vacAttended = vac.value("SELECT COUNT(*) FROM Bookings WHERE Attended = TRUE");
const vacD = "DELETE FROM Bookings WHERE Attended = TRUE AND Dose = 2;";
vac.run(vacD);
const vacLeft = vac.value("SELECT COUNT(*) FROM Bookings");

concept("comp.db.forms-reports-crud", { file: "db/forms-reports-crud", keyPrefix: "db.forms-reports-crud" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of a **form** in a database?",
    options: [
      ["To enter, view and edit data one record at a time", "Correct: a form gives a user-friendly screen for data entry."],
      ["To present data in a layout ready for printing", "That is the purpose of a report."],
      ["To store the data permanently in rows and columns", "Data is stored in tables."],
      ["To link two tables using a foreign key", "That is a relationship."],
    ],
    answer: "A",
    explanation: "Forms are designed for data entry and editing; they can include drop-down lists, check boxes and buttons that reduce errors.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of a **report** in a database?",
    options: [
      ["To present selected data in a layout for printing", "Correct: reports are output objects."],
      ["To enter new records quickly and with fewer typing errors", "That is a form."],
      ["To hide records temporarily while a user works", "That is a filter."],
      ["To check that data is sensible as it is typed", "That is validation."],
    ],
    answer: "A",
    explanation: "A report presents data from a table or query, often grouped and with totals, headers and page numbers; it is not used to edit data.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each CRUD operation to the SQL statement that carries it out.",
    pairs: [
      ["Create", "INSERT INTO"],
      ["Read", "SELECT"],
      ["Update", "UPDATE … SET"],
      ["Delete", "DELETE FROM"],
    ],
    explanation: "Create adds records (INSERT), Read retrieves them (SELECT), Update changes them (UPDATE … SET) and Delete removes them (DELETE FROM).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "At the end of each month a school bursar needs a printed list of unpaid fees, grouped by form, with a total for each form. Which database object should be used?",
    options: [
      ["A report", "Correct: grouping, totals and a print layout are report features."],
      ["A form", "Forms are for entering and editing data."],
      ["A datasheet", "A datasheet has no grouping or group totals for printing."],
      ["A filter", "A filter hides records on screen but does not lay them out with totals."],
    ],
    answer: "A",
    explanation: "Reports present data for reading or printing, with grouping and totals; it would be built on a query that selects the unpaid fees.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Applying a filter to a datasheet permanently deletes the records that do not meet the condition.",
    answer: false,
    explanation: "False. A filter only hides those records; removing the filter shows them again.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Sorting a table in descending order of a field changes only the order in which the records are shown, not the values stored in them.",
    answer: true,
    explanation: "True. Sorting reorders the records; it does not edit any data.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A data-entry form includes the Boolean field `Paid`. Which form control is most suitable for it?",
    options: [
      ["A check box", "Correct: ticked for TRUE, empty for FALSE."],
      ["A text box", "A text box would allow any typing, such as 'yes', 'Y' or 'paid'."],
      ["A report footer", "A footer belongs to a report, not a form."],
      ["A page number", "Page numbers belong in reports."],
    ],
    answer: "A",
    explanation: "A check box can only be ticked or not, which matches the two values of a Boolean field.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What can the user type or choose?"],
    stem: "A form for a clinic uses a drop-down list (combo box) for the `Ward` field, listing the four wards. Why does this improve the data entered?",
    options: [
      ["Only allowed ward names can be chosen, so no misspellings", "Correct: the user picks from valid values."],
      ["The ward names are encrypted before they are stored", "A drop-down list has nothing to do with encryption."],
      ["Each patient is automatically given a unique ward number", "Many patients can be in the same ward."],
      ["The form no longer needs to be linked to a table", "The form still saves the choice into the table."],
    ],
    answer: "A",
    explanation: "Choosing from a list prevents typing errors and inconsistent spellings, so searches and reports on Ward work correctly.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["OR deletes a record if either condition is TRUE."],
    stem: `A bus company stores tickets.\n\n${tickets().md}\n\nHow many records are left after this statement runs?\n\n${fence(delTk)}`,
    value: leftTk,
    wrong: [leftTkAnd],
    explanation: `Deleted: the cancelled tickets (Rudo, Farai) and the Masvingo ticket (Chipo). ${leftTk} records remain.`,
    workedSolution: `1. Cancelled = TRUE: Rudo, Farai.\n2. Destination = 'Masvingo': Chipo.\n3. 6 − 3 = ${leftTk} records remain.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which records does the statement affect when there is no condition?"],
    stem: `A clerk meant to raise the price of one item but ran this statement:\n\n${fence("UPDATE Products\nSET Price = Price * 1.1;")}\n\nWhat happens?`,
    options: [
      ["The price of every product is increased by 10%", "Correct: without WHERE, every record is updated."],
      ["Only the first product's price is increased", "UPDATE has no idea of 'first'; it affects all matching records."],
      ["Nothing happens, because a WHERE clause is required", "The statement is valid; WHERE is optional."],
      ["Every product is deleted and re-entered with the new price", "UPDATE changes values in place; it does not delete."],
    ],
    answer: "A",
    explanation: "The WHERE clause selects the records to change. With no WHERE clause, all records are updated, so the statement needed `WHERE ProductID = …`.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["UPDATE needs the table, SET and a condition."],
    stem: "Complete the statement so that learner L2093 is moved to class 4B in the table `Learners`.",
    template: "{{blank:a}} Learners\n\n{{blank:b}} ClassName = '4B'\n\n{{blank:c}} LearnerID = 'L2093';",
    blanks: [
      { id: "a", accepted: ["UPDATE"], choices: ["UPDATE", "INSERT INTO", "SELECT", "DELETE FROM"] },
      { id: "b", accepted: ["SET"], choices: ["SET", "VALUES", "FROM", "ORDER BY"] },
      { id: "c", accepted: ["WHERE"], choices: ["WHERE", "AND", "SET", "FROM"] },
    ],
    wrong: [["INSERT INTO", "VALUES", "AND"]],
    explanation: "`UPDATE Learners SET ClassName = '4B' WHERE LearnerID = 'L2093';` changes one field of one existing record.",
  });
  b.fib({
    d: 4, skill: "ANALYSIS",
    hints: ["Run the statements one at a time, using the new values each time.", "After the UPDATE, check every quantity against 30."],
    stem: `A tuck-shop table starts like this.\n\n${startStockMd}\n\nThese statements run in order:\n\n${fence(seqStock.join("\n"))}\n\nComplete the sentences about the table afterwards.`,
    template: "Number of records: {{blank:n}}\n\nTotal of the Quantity field: {{blank:q}}",
    blanks: [
      { id: "n", accepted: [String(stockLeft)], input: "number", wrong: String(stockLeft + 1) },
      { id: "q", accepted: [String(totalQty)], input: "number", wrong: String(totalQty + 12) },
    ],
    explanation: `After the INSERT there are 4 items. Items priced below 0.65 (Freezit, Bun) lose 12, so Bun drops to 24, below 30, and is deleted. Final table:\n\n${finalStock.md}`,
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each task in a hardware shop to the most suitable database tool.",
    pairs: [
      ["Enter a new supplier's details at the counter", "Form"],
      ["Print a monthly list of sales grouped by department with totals", "Report"],
      ["Quickly show only the items from one supplier while a customer waits", "Filter"],
      ["Save a selection of low-stock items to reuse every week", "Query"],
      ["List all items in order of price, cheapest first", "Sort"],
    ],
    explanation: "Forms enter data, reports present it, filters hide records temporarily, saved queries select records again and again, and sorting reorders records.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about how each feature stops the user making a mistake."],
    stem: "Describe two features of a well-designed data-entry form and explain how each helps the user.",
    points: [
      "One feature with its benefit, e.g. drop-down list of allowed values prevents spelling errors / check box for Yes/No fields",
      "A second feature with its benefit, e.g. clear labels and grouped fields / sensible tab order / validation messages / New and Save buttons make entry quick and accurate",
    ],
    explanation: "Any two features, each with how it helps.",
    modelAnswer: "A drop-down list for the Category field lets the user pick only allowed categories, so there are no spelling mistakes. Clear labels next to each box, with related fields grouped together, show the user exactly what to type where.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Which one is saved and can be reused?"],
    stem: "Explain one difference between applying a filter to a datasheet and running a saved query.",
    points: [
      "A filter temporarily hides non-matching records in the open datasheet (and is removed afterwards)",
      "A query is saved as a database object, so it can be run again, choose which fields to show, and be used as the source of a form or report",
    ],
    explanation: "Filters are temporary views; queries are saved, reusable objects.",
    modelAnswer: "A filter only hides the records that do not match while the datasheet is open, and is removed afterwards. A query is saved, can show selected fields from the table, and can be run again or used to build a report.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 3,
    hints: ["INSERT INTO table VALUES (…) for text values in quotes.", "DELETE needs a WHERE clause."],
    stem: "The table `Students` has the fields `StudentID` (text), `StudentName` (text) and `Form` (integer). Write SQL statements to (i) add the student S0581, Kudzai, in Form 2, and (ii) remove the record of student S0477.",
    points: [
      "`INSERT INTO Students VALUES ('S0581', 'Kudzai', 2);` (values in field order, text in quotes, number not in quotes)",
      "`DELETE FROM Students`",
      "`WHERE StudentID = 'S0477';`",
    ],
    explanation: "Create with INSERT, delete with DELETE FROM … WHERE.",
    modelAnswer: "INSERT INTO Students VALUES ('S0581', 'Kudzai', 2); and DELETE FROM Students WHERE StudentID = 'S0477';",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Rewrite the table after the UPDATE before you apply the DELETE.", "Form < 4 does not include 4."],
    stem: `A school library in Gweru keeps this table at the end of the year.\n\n${libStart}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: `This statement promotes the members:\n\n${fence(libU)}\n\nState each member's Form afterwards.`,
        template: formsAfter.map((r, i) => `${r.MemberName}: {{blank:f${i}}}`).join("\n\n"),
        blanks: formsAfter.map((r, i) => ({ id: `f${i}`, accepted: [String(r.Form)], input: "number", wrong: String(r.Form + 1) })),
        explanation: `Members in Forms 1 to 3 move up one; Form 4 members are unchanged: ${formsAfter.map((r) => `${r.MemberName} ${r.Form}`).join(", ")}.`,
      }),
      P.short({
        label: "(b)", stem: `This statement then runs:\n\n${fence(libD)}\n\nWrite the names of the members left in the table, in table order, separated by commas.`,
        accepted: [libLeft.join(", ")], wrong: ["Nyasha, Rudo"],
        explanation: `After the UPDATE, only Tatenda is in Form 4 with 0 books out, so only Tatenda is deleted. Farai is in Form 4 but has a book out, and Chipo moves into Form 4 but has 4 books out. Left: ${libLeft.join(", ")}.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which CRUD operation does the statement in (a) carry out?",
        options: [["Update", "Correct: it changes values in existing records."], ["Create", "No record is added."], ["Read", "Nothing is retrieved for display."], ["Delete", "No record is removed."]],
        answer: "A", explanation: "UPDATE … SET changes existing records.",
      }),
      P.num({ label: "(d)", stem: "The librarian then filters the datasheet to show only suspended members. State how many records are shown.", value: filtered, wrong: [filtered + 1], explanation: `After the deletion, the suspended members still in the table: ${lib.run("SELECT MemberName FROM Members WHERE Suspended = TRUE").map((r) => r.MemberName).join(", ")} = ${filtered}.`, workedSolution: `1. Tatenda (suspended) was deleted in (b).\n2. Suspended members left: ${filtered}.` }),
      P.manual({
        label: "(e)", marks: 1, stem: "Explain why the librarian should not run `DELETE FROM Members;` to remove the leavers.",
        points: ["With no WHERE clause, every record would be deleted, not just the leavers"],
        modelAnswer: "Without a WHERE clause the statement deletes every member, not only the ones who are leaving.",
      }),
    ],
    explanation: `(a) ${formsAfter.map((r) => `${r.MemberName} ${r.Form}`).join(", ")}. (b) ${libLeft.join(", ")}. (d) ${filtered}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Apply the UPDATE first, then test both DELETE conditions on the new values."],
    stem: `A rural clinic in Masvingo province records vaccination bookings in the table \`Bookings\`.\n\n${vacStart}`,
    parts: [
      P.num({ label: "(a)", stem: `This statement runs:\n\n${fence(vacU)}\n\nState how many records then have Attended = TRUE.`, value: vacAttended, wrong: [2], explanation: `Two bookings were already TRUE and the two Zaka bookings become TRUE: ${vacAttended}.`, workedSolution: `1. Already TRUE: VB-81, VB-83.\n2. Zaka: VB-82, VB-85 become TRUE.\n3. Total ${vacAttended}.` }),
      P.num({ label: "(b)", stem: `Next this statement runs:\n\n${fence(vacD)}\n\nState how many records are left.`, value: vacLeft, wrong: [4], explanation: `Attended and dose 2: VB-82 and VB-83 are deleted, leaving ${vacLeft}.`, workedSolution: `1. Attended = TRUE: VB-81, VB-82, VB-83, VB-85.\n2. Of these, Dose = 2: VB-82, VB-83.\n3. 5 − 2 = ${vacLeft}.` }),
      P.mcq({
        label: "(c)", stem: "A nurse wants to add a new booking. Which SQL statement does this?",
        options: [["`INSERT INTO Bookings VALUES ('VB-86', 'Anesu', 'Chivi', 1, FALSE);`", "Correct: INSERT INTO creates a record."], ["`UPDATE Bookings SET ChildName = 'Anesu' WHERE BookingID = 'VB-86';`", "This changes an existing record; VB-86 does not exist yet, so nothing is added."], ["`SELECT BookingID, ChildName FROM Bookings WHERE Village = 'Chivi';`", "SELECT reads data; it adds nothing."], ["`DELETE FROM Bookings WHERE ChildName = 'Anesu';`", "DELETE removes records."]],
        answer: "A", explanation: "Create = INSERT INTO … VALUES (…).",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "The nurse enters bookings through a form. Describe two ways the form could reduce data-entry errors for this table.",
        points: ["A drop-down list for Village (only the clinic's villages can be chosen)", "A check box for Attended / validation on Dose (1 to 3) with a clear error message / input mask on BookingID"],
        modelAnswer: "A drop-down list for Village lets the nurse choose only the villages the clinic serves, so names are spelt the same every time. A check box for Attended and a range check that accepts Dose 1 to 3 stop impossible values being saved.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "The clinic manager wants a weekly printout of bookings not yet attended, grouped by village. Describe how this should be produced.",
        points: ["Create (save) a query that selects the bookings where Attended = FALSE", "Build a report on the query, grouped by Village (with a count / heading), and print it each week"],
        modelAnswer: "Save a query that selects bookings with Attended = FALSE, then create a report based on that query, grouped by Village with a count for each village, and print it every week.",
      }),
    ],
    explanation: `(a) ${vacAttended}. (b) ${vacLeft}. (c) INSERT INTO.`,
  });

  b.card("DEFINITION", "CRUD", "Create, Read, Update, Delete: the four basic operations on stored data (INSERT, SELECT, UPDATE, DELETE in SQL).");
  b.card("DEFINITION", "Form", "A database object for entering, viewing and editing data one record at a time in a user-friendly layout.");
  b.card("DEFINITION", "Report", "A database object that presents data from a table or query in a formatted layout for reading or printing, often grouped with totals.");
  b.card("DEFINITION", "Datasheet", "A row-and-column view of a table or query in which many records can be viewed and edited directly.");
  b.card("FORMULA", "SQL to change records", "UPDATE Table SET Field = value WHERE condition;  (no WHERE = every record changes)");
  b.card("FORMULA", "SQL to add and remove records", "INSERT INTO Table VALUES (v1, v2, …);   DELETE FROM Table WHERE condition;");
  b.card("CONCEPT", "Filter versus query", "A filter temporarily hides non-matching records in a datasheet; a query is a saved, reusable selection that can feed forms and reports.");
  b.card("FACT", "Sorting", "Puts records in ascending or descending order of a field; it never changes the stored values.");
  b.card("CONCEPT", "Form controls that reduce errors", "Drop-down lists (allowed values), check boxes (Yes/No), clear labels, tab order, validation messages, input masks.");
});
