// Slice w4c: Cambridge 0478 Paper 2 exam-format item (STRUCTURED, 12 marks, APPLICATION): single-table database and
// SQL. Every count and query output is computed in SQLite.
import { concept, P, CAM } from "../lib.mjs";
import { table, fence, C } from "./w4c-0-kit.mjs";

const phones = table("Handsets", [["HandsetID", "TEXT"], ["Model", "TEXT"], ["Brand", "TEXT"], ["StorageGB", "INTEGER"], ["Price", "REAL", { dp: 2 }], ["Refurbished", "INTEGER", { bool: true }]], [
  ["HS-117", "Nova 5", "Kestrel", 64, 135.5, false],
  ["HS-123", "Nova 5", "Kestrel", 64, 98.0, true],
  ["HS-131", "Orbit X", "Sable", 128, 214.0, false],
  ["HS-136", "Orbit Mini", "Sable", 32, 79.5, true],
  ["HS-142", "Pulse 3", "Kestrel", 128, 189.99, false],
  ["HS-148", "Pulse 3", "Kestrel", 128, 152.0, true],
  ["HS-153", "Ridge", "Granite", 256, 214.0, false],
]);
const fields = phones.columns.length;
const records = phones.count;
const keys = phones.columns.map((c) => c[0]).filter((_, i) => new Set(phones.rows.map((r) => r[i])).size === phones.rows.length);
if (keys.join() !== "HandsetID") throw new Error(`keys ${keys}`);

const qd = "SELECT Model, StorageGB\nFROM Handsets\nWHERE Brand = 'Kestrel' AND Refurbished = TRUE\nORDER BY StorageGB DESC;";
const rd = phones.result(qd).rows;
const qf = "SELECT COUNT(*)\nFROM Handsets\nWHERE StorageGB >= 128 OR Price < 80;";
const vf = phones.value(qf);
const vfAnd = phones.value("SELECT COUNT(*) FROM Handsets WHERE StorageGB >= 128 AND Price < 80");

concept(C("db.sql"), { file: "exam/w4c-cambridge", keyPrefix: "exam.w4c-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, calculator: false,
    concepts: [C("db.table-design"), C("db.sql")],
    hints: ["Filter with WHERE, sort with ORDER BY, then show only the selected fields.", "With OR, count each record that meets at least one condition, once."],
    stem: `A mobile phone shop in Harare stores details of the handsets it sells in a database table, \`Handsets\`.\n\n${phones.md}`,
    parts: [
      P.num({ label: "(a)", stem: "State the number of fields in the table.", value: fields, wrong: [records], explanation: `Columns: ${phones.columns.map((c) => c[0]).join(", ")}: ${fields} fields.`, workedSolution: `1. Count the column headings: ${fields}.` }),
      P.num({ label: "(b)", stem: "State the number of records in the table.", value: records, wrong: [fields], explanation: `There are ${records} rows of data, one per handset.`, workedSolution: `1. Count the rows below the headings: ${records}.` }),
      P.short({ label: "(c)", stem: "Identify the field that is most suitable as the primary key.", accepted: ["HandsetID", "Handset ID"], wrong: ["Model"], explanation: "HandsetID is the only field with a different value in every record." }),
      P.manual({
        label: "(d)", marks: 1, stem: "Explain why the Model field is **not** suitable as the primary key.",
        points: ["Model values repeat (e.g. Nova 5 and Pulse 3 appear twice), so Model cannot identify a single record / is not unique"],
        modelAnswer: "The same model appears in more than one record, for example Pulse 3 twice, so it does not identify one handset.",
      }),
      P.fib({
        label: "(e)", marks: 2, stem: "Choose the most suitable data type for each field.",
        template: "Price: {{blank:a}}\n\nRefurbished: {{blank:b}}",
        blanks: [
          { id: "a", accepted: ["Real"], choices: ["Integer", "Real", "Text", "Boolean", "Character", "Date/time"] },
          { id: "b", accepted: ["Boolean"], choices: ["Integer", "Real", "Text", "Boolean", "Character", "Date/time"] },
        ],
        wrong: [["Integer", "Text"]],
        explanation: "Prices have a fractional part (real); Refurbished is TRUE or FALSE (Boolean).",
      }),
      P.fib({
        label: "(f)", marks: 2, stem: `Complete the output of this SQL script.\n\n${fence(qd)}`,
        template: rd.map((r, i) => `Row ${i + 1}: Model {{blank:m${i}}}, StorageGB {{blank:s${i}}}`).join("\n\n"),
        blanks: rd.flatMap((r, i) => [
          { id: `m${i}`, accepted: [r.Model], choices: ["Nova 5", "Orbit X", "Orbit Mini", "Pulse 3", "Ridge"], wrong: rd[(i + 1) % rd.length].Model },
          { id: `s${i}`, accepted: [String(r.StorageGB)], input: "number", wrong: String(rd[(i + 1) % rd.length].StorageGB) },
        ]),
        explanation: `Refurbished Kestrel handsets, largest storage first:\n\n${phones.result(qd).md}`,
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Write an SQL script to display the model and price of every handset made by Sable or Granite, in ascending order of price.",
        points: ["`SELECT Model, Price FROM Handsets`", "`WHERE Brand = 'Sable' OR Brand = 'Granite'`", "`ORDER BY Price ASC`"],
        modelAnswer: "SELECT Model, Price\nFROM Handsets\nWHERE Brand = 'Sable' OR Brand = 'Granite'\nORDER BY Price ASC;",
      }),
      P.num({
        label: "(h)", stem: `State the output of this SQL script.\n\n${fence(qf)}`, value: vf, wrong: [vfAnd],
        explanation: `Handsets with at least 128 GB: ${phones.run("SELECT HandsetID FROM Handsets WHERE StorageGB >= 128").map((r) => r.HandsetID).join(", ")}; under 80 dollars: ${phones.run("SELECT HandsetID FROM Handsets WHERE Price < 80").map((r) => r.HandsetID).join(", ")}. COUNT = ${vf}.`,
        workedSolution: `1. StorageGB >= 128: ${phones.run("SELECT HandsetID FROM Handsets WHERE StorageGB >= 128").length} records.\n2. Price < 80: ${phones.run("SELECT HandsetID FROM Handsets WHERE Price < 80").length} record, not already counted.\n3. COUNT = ${vf}.`,
      }),
    ],
    explanation: `(a) ${fields} fields. (b) ${records} records. (c) HandsetID. (e) Real, Boolean. (f) ${rd.map((r) => `${r.Model} ${r.StorageGB}`).join("; ")}. (h) ${vf}.`,
  });
});
