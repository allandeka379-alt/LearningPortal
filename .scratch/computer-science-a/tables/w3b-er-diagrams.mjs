import { mdTable, chk, same } from "../lib.mjs";
// Library scenario for the lesson.
const entities = {
  Member: { pk: "MemberID", fk: [], attrs: ["Name", "Phone"] },
  Category: { pk: "CategoryID", fk: [], attrs: ["CategoryName"] },
  Book: { pk: "BookID", fk: [["CategoryID", "Category"]], attrs: ["Title", "Author"] },
  Loan: { pk: "LoanID", fk: [["MemberID", "Member"], ["BookID", "Book"]], attrs: ["DateOut", "DateDue"] },
};
const rels = [
  ["Category", "Book", "one-to-many", "Each category has many books; each book is in one category", "Book (CategoryID)"],
  ["Member", "Loan", "one-to-many", "A member can make many loans; each loan is made by one member", "Loan (MemberID)"],
  ["Book", "Loan", "one-to-many", "A book can be lent many times; each loan is for one book", "Loan (BookID)"],
];
const schemaRows = Object.entries(entities).map(([n, e]) => [
  `\`${n}\``, e.pk, e.fk.length ? e.fk.map(([f, t]) => `${f} → ${t}`).join("; ") : "none", e.attrs.join(", "),
]);
const tableCount = Object.keys(entities).length;
chk(tableCount, 4);
// many-to-many: Student and Subject
const enrol = [
  ["S201", "MA"], ["S201", "EN"], ["S201", "CS"],
  ["S202", "MA"], ["S202", "PH"],
  ["S203", "EN"], ["S203", "CS"], ["S203", "PH"], ["S203", "MA"],
];
const perStudent = {};
for (const [s] of enrol) perStudent[s] = (perStudent[s] ?? 0) + 1;
const perSubject = {};
for (const [, s] of enrol) perSubject[s] = (perSubject[s] ?? 0) + 1;
same(perStudent, { S201: 3, S202: 2, S203: 4 });
same(perSubject, { MA: 3, EN: 2, CS: 2, PH: 2 });
chk(enrol.length, 9);
const dup = new Set(enrol.map((r) => r.join("|"))).size;
chk(dup, 9); // composite key (StudentID, SubjectID) is unique
export const snips = {
  relTable: mdTable(["Entity A", "Entity B", "Relationship", "Reading", "Foreign key placed in"], rels),
  schemaTable: mdTable(["Table", "Primary key", "Foreign keys", "Other fields"], schemaRows),
  nTables: String(tableCount),
  enrolTable: mdTable(["StudentID", "SubjectID"], enrol),
  nEnrol: String(enrol.length),
  maxSubjects: String(Math.max(...Object.values(perStudent))),
  maxSubjectName: "S203",
};
if (process.argv[1].endsWith("w3b-er-diagrams.mjs")) console.log(snips);
