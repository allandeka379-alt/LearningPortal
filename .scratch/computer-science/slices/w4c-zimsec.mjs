// Slice w4c: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIMSEC only):
// relational database design; SQL and forms. Every count and query output is computed in SQLite.
import { concept, P, ZIM } from "../lib.mjs";
import { table, fence, C } from "./w4c-0-kit.mjs";

// ---- Q1: relational database design (inter-house athletics) -------------------------------------------------------
const sports = table("Houses", [["HouseID", "TEXT"], ["HouseName", "TEXT"], ["Colour", "TEXT"]], [
  ["H1", "Zambezi", "Blue"],
  ["H2", "Limpopo", "Green"],
  ["H3", "Save", "Red"],
], [{ name: "Athletes", columns: [["AthleteID", "TEXT"], ["AthleteName", "TEXT"], ["DateOfBirth", "TEXT"], ["Boarder", "INTEGER", { bool: true }], ["HouseID", "TEXT"]], rows: [
  ["AT-401", "Tinotenda", "15/02/2011", true, "H2"],
  ["AT-402", "Ruvarashe", "30/09/2010", false, "H1"],
  ["AT-405", "Kudakwashe", "07/06/2011", false, "H2"],
  ["AT-409", "Mufaro", "23/11/2009", true, "H3"],
  ["AT-412", "Anesu", "05/01/2010", true, "H2"],
  ["AT-416", "Tanaka", "20/08/2011", false, "H1"],
] }]);
const limpopo = sports.value("SELECT COUNT(*) FROM Athletes JOIN Houses USING(HouseID) WHERE HouseName = 'Limpopo'");
const newAthletes = [["AT-420", "H3"], ["AT-421", "H4"], ["AT-422", "H1"], ["AT-423", "H2"]];
const houseIds = sports.run("SELECT HouseID FROM Houses").map((r) => r.HouseID);
const badIdx = newAthletes.findIndex(([, h]) => !houseIds.includes(h));
if (newAthletes.filter(([, h]) => !houseIds.includes(h)).length !== 1) throw new Error("ref integrity");

// ---- Q2: SQL and forms (school uniform shop) ------------------------------------------------------------------------
const uniform = () => table("Uniforms", [["ItemCode", "TEXT"], ["ItemName", "TEXT"], ["Size", "TEXT"], ["Price", "INTEGER"], ["InStock", "INTEGER"]], [
  ["U01", "Blazer", "M", 39, 6],
  ["U02", "Blazer", "L", 43, 0],
  ["U03", "Tie", "One size", 7, 44],
  ["U04", "Shirt", "S", 13, 31],
  ["U05", "Shirt", "M", 13, 27],
  ["U06", "Jersey", "M", 24, 3],
]);
const uni = uniform();
const qa = "SELECT ItemName, Size\nFROM Uniforms\nWHERE Price > 12 AND InStock < 10\nORDER BY Price ASC;";
const ra = uni.result(qa).rows;
const qb = "SELECT COUNT(*)\nFROM Uniforms\nWHERE ItemName = 'Shirt' OR InStock = 0;";
const vb = uni.value(qb);
const qc = "SELECT SUM(InStock)\nFROM Uniforms\nWHERE Size = 'M';";
const vc = uni.value(qc);
const upd = "UPDATE Uniforms\nSET Price = Price + 2\nWHERE ItemName = 'Blazer' OR ItemName = 'Jersey';";
const uni2 = uniform();
const before = uni2.run("SELECT ItemCode, Price FROM Uniforms");
uni2.run(upd);
const after = uni2.run("SELECT ItemCode, Price FROM Uniforms");
const changed = after.filter((r, i) => r.Price !== before[i].Price).length;

concept(C("db.relational-erd"), { file: "exam/w4c-zimsec", keyPrefix: "exam.w4c-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900, calculator: false,
    concepts: [C("db.relational-erd"), C("db.table-design")],
    hints: ["The field that appears in both tables links them.", "A foreign key value must exist as a primary key in the other table."],
    stem: `A secondary school in Chinhoyi stores its inter-house athletics data in two related tables.\n\n${sports.md}\n\n${sports.mdOf("Athletes")}`,
    parts: [
      P.manual({
        label: "(a)", marks: 1, stem: "Define the term *primary key*.",
        points: ["A field (or fields) whose value is unique for every record, used to identify each record"],
        modelAnswer: "A field whose value is different in every record, so that it identifies each record.",
      }),
      P.short({ label: "(b)", stem: "Identify the foreign key in the Athletes table.", accepted: ["HouseID", "House ID"], wrong: ["AthleteID"], explanation: "HouseID is the primary key of Houses, stored in Athletes to link each athlete to a house." }),
      P.mcq({
        label: "(c)", stem: "State the type of relationship between Houses and Athletes.",
        options: [["One-to-many", "Correct: one house has many athletes; each athlete is in one house."], ["One-to-one", "Limpopo has several athletes."], ["Many-to-many", "Each athlete record holds only one HouseID."], ["Many-to-one from Houses to Athletes", "Read from Houses, it is one house to many athletes."]],
        answer: "A", explanation: "One house, many athletes: one-to-many, with the foreign key on the many side (Athletes).",
      }),
      P.fib({
        label: "(d)", marks: 2, stem: "Choose the most suitable data type for each field of the Athletes table.",
        template: "DateOfBirth: {{blank:a}}\n\nBoarder: {{blank:b}}",
        blanks: [
          { id: "a", accepted: ["Date/time"], choices: ["Text", "Integer", "Date/time", "Boolean"] },
          { id: "b", accepted: ["Boolean"], choices: ["Text", "Integer", "Date/time", "Boolean"] },
        ],
        wrong: [["Text", "Text"]],
        explanation: "A date of birth is date/time (so ages can be calculated and dates sorted); Boarder has only two values, so Boolean.",
      }),
      P.num({ label: "(e)", stem: "State how many athletes belong to Limpopo house.", value: limpopo, wrong: [limpopo - 1], explanation: `Limpopo is H2, which appears ${limpopo} times in Athletes.`, workedSolution: `1. Houses: Limpopo has HouseID H2.\n2. Athletes with HouseID H2: Tinotenda, Kudakwashe, Anesu = ${limpopo}.` }),
      P.mcq({
        label: "(f)", stem: "Referential integrity is enforced. Which new Athletes record would be rejected?",
        options: newAthletes.map(([a, h]) => [`AthleteID ${a} with HouseID ${h}`, houseIds.includes(h) ? `${h} exists in Houses, so it is accepted.` : `Correct: there is no house ${h}.`]),
        answer: String.fromCharCode(65 + badIdx),
        explanation: "A foreign key value must match an existing primary key value; H4 is not in Houses.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Each athlete may enter several events and each event has several athletes. Describe how the database should store which athletes enter which events.",
        points: ["Add an Events table (EventID primary key) and a link table, e.g. Entries", "The link table holds AthleteID and EventID as foreign keys, one record per entry, with the pair as a composite primary key (resolving the many-to-many into two one-to-many relationships)"],
        modelAnswer: "Create an Events table with EventID as its primary key, and a link table called Entries with the fields AthleteID and EventID. Each record in Entries is one athlete in one event; the two fields are foreign keys and together form the primary key.",
      }),
      P.manual({
        label: "(h)", marks: 1, stem: "Suggest a validation rule for the DateOfBirth field.",
        points: ["A sensible rule, e.g. range check: between 01/01/2004 and 31/12/2013 / must not be in the future / presence check"],
        modelAnswer: "A range check accepting only dates from 1 January 2004 to 31 December 2013 (ages for secondary learners).",
      }),
    ],
    explanation: `(b) HouseID. (c) One-to-many. (d) Date/time, Boolean. (e) ${limpopo}. (f) The record with HouseID H4.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900, calculator: false,
    concepts: [C("db.sql"), C("db.forms-reports-crud")],
    hints: ["For each query: filter with WHERE, sort, then show the selected fields.", "OR includes a record when either condition is TRUE."],
    stem: `A school uniform shop in Kadoma keeps this table, \`Uniforms\`.\n\n${uniform().md}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: `Complete the output of this query.\n\n${fence(qa)}`,
        template: ra.map((r, i) => `Row ${i + 1}: ItemName {{blank:n${i}}}, Size {{blank:s${i}}}`).join("\n\n"),
        blanks: ra.flatMap((r, i) => [
          { id: `n${i}`, accepted: [r.ItemName], choices: ["Blazer", "Tie", "Shirt", "Jersey"], wrong: r.ItemName === "Blazer" ? "Jersey" : "Blazer" },
          { id: `s${i}`, accepted: [r.Size], choices: ["S", "M", "L", "One size"], wrong: r.Size === "M" ? "L" : "M" },
        ]),
        explanation: `Items over 12 dollars with fewer than 10 in stock, cheapest first:\n\n${uni.result(qa).md}`,
      }),
      P.num({ label: "(b)", stem: `State the output of this query.\n\n${fence(qb)}`, value: vb, wrong: [2], explanation: `Shirts (U04, U05) and items with none in stock (U02): ${vb} records.`, workedSolution: `1. ItemName = 'Shirt': U04, U05.\n2. InStock = 0: U02.\n3. COUNT = ${vb}.` }),
      P.num({ label: "(c)", stem: `State the output of this query.\n\n${fence(qc)}`, value: vc, wrong: [3], explanation: `Size M items: ${uni.run("SELECT InStock FROM Uniforms WHERE Size = 'M'").map((r) => r.InStock).join(" + ")} = ${vc}.`, workedSolution: `1. Size M: U01, U05, U06.\n2. ${uni.run("SELECT InStock FROM Uniforms WHERE Size = 'M'").map((r) => r.InStock).join(" + ")} = ${vc}.` }),
      P.manual({
        label: "(d)", marks: 3, stem: "Write an SQL query to show the item code and price of every item that is out of stock, with the most expensive first.",
        points: ["`SELECT ItemCode, Price FROM Uniforms`", "`WHERE InStock = 0`", "`ORDER BY Price DESC`"],
        modelAnswer: "SELECT ItemCode, Price FROM Uniforms WHERE InStock = 0 ORDER BY Price DESC;",
      }),
      P.num({ label: "(e)", stem: `The manager runs this statement. State how many records are changed.\n\n${fence(upd)}`, value: changed, wrong: [2], explanation: `Two blazer records and one jersey record match: ${changed} records each rise by 2 dollars.`, workedSolution: `1. Blazer: U01, U02.\n2. Jersey: U06.\n3. ${changed} records updated.` }),
      P.manual({
        label: "(f)", marks: 2, stem: "The shop assistant enters new stock using a form, and the manager receives a printed report each month. State the purpose of each.",
        points: ["Form: to enter / edit data one record at a time in a user-friendly way, reducing errors (e.g. drop-down list for Size)", "Report: to present selected data in a formatted layout for printing / reading, e.g. grouped with totals"],
        modelAnswer: "The form gives the assistant a clear screen to type in or edit one item at a time, with a drop-down list for Size to avoid mistakes. The report presents the stock data in a printed layout, grouped by item with totals, for the manager to read.",
      }),
    ],
    explanation: `(a) ${ra.map((r) => `${r.ItemName} ${r.Size}`).join("; ")}. (b) ${vb}. (c) ${vc}. (e) ${changed}.`,
  });
});
