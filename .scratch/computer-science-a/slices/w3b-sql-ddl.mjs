// Slice w3b: SQL data definition language (acs.db.sql-ddl, both boards). Every script shown is run on SQLite.
import { DatabaseSync } from "node:sqlite";
import { concept, P, chk, same, codeBlock, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

function run(script, check) {
  const db = new DatabaseSync(":memory:");
  try {
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec(script);
    return check ? check(db) : null;
  } finally {
    db.close();
  }
}
const fields = (db, t) => db.prepare(`SELECT name, type, "notnull", pk FROM pragma_table_info('${t}')`).all();

// clinic script used in several items
const clinic = `CREATE TABLE Doctor (
    DoctorID CHARACTER(4) PRIMARY KEY,
    Surname VARCHAR(30) NOT NULL,
    Room INTEGER
);

CREATE TABLE Patient (
    PatientID CHARACTER(6) PRIMARY KEY,
    Surname VARCHAR(30) NOT NULL,
    DateOfBirth DATE,
    Phone VARCHAR(15),
    Insured BOOLEAN,
    DoctorID CHARACTER(4),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);`;
const nPatientFields = run(clinic, (db) => fields(db, "Patient").length);
const nNotNull = run(clinic, (db) => ["Doctor", "Patient"].flatMap((t) => fields(db, t)).filter((f) => f.notnull).length);
chk(nPatientFields, 6);
chk(nNotNull, 2);

// model answers (each is run to prove it is valid)
const modelBook = `CREATE TABLE Book (
    BookID CHARACTER(5) PRIMARY KEY,
    Title VARCHAR(60) NOT NULL,
    Price REAL,
    Published DATE,
    InStock BOOLEAN
);`;
run(modelBook, (db) => same(fields(db, "Book").length, 5));
const modelLoan = `CREATE TABLE Member (
    MemberID CHARACTER(4) PRIMARY KEY,
    Surname VARCHAR(30) NOT NULL
);

CREATE TABLE Loan (
    LoanID INTEGER PRIMARY KEY,
    MemberID CHARACTER(4) NOT NULL,
    BookID CHARACTER(5),
    DateOut DATE,
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID)
);`;
run(modelLoan, (db) => same(fields(db, "Loan").length, 4));
const alterStmt = "ALTER TABLE Patient ADD Email VARCHAR(50);";
run(`${clinic}\n${alterStmt}`, (db) => same(fields(db, "Patient").length, 7));

concept("acs.db.sql-ddl", { file: "db/sql-ddl", keyPrefix: "db.sql-ddl" }, (b) => {
  mc(b, 1, "RECALL", "Which SQL statement is used to create a new table?",
    ["CREATE TABLE", "Correct."],
    [["INSERT INTO", "INSERT INTO adds a record to an existing table."], ["SELECT", "SELECT reads data from a table."], ["UPDATE", "UPDATE changes records already in a table."]],
    "CREATE TABLE defines a new table.");
  mc(b, 2, "RECALL", "Which of these is part of the data definition language (DDL)?",
    ["ALTER TABLE", "Correct: it changes the structure of a table."],
    [["DELETE FROM", "DELETE FROM removes records, which is data manipulation."], ["UPDATE", "UPDATE changes records, which is data manipulation."], ["SELECT", "SELECT reads data, which is data manipulation."]],
    "DDL defines structure; SELECT, INSERT, UPDATE and DELETE are DML.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which data type is the most suitable for a field that stores a Zimbabwean mobile phone number such as `0771234567`?",
    ["`VARCHAR(15)`", "Correct: it is a label that starts with a zero and is never used in a calculation."],
    [["`INTEGER`", "An integer would remove the leading zero."], ["`REAL`", "A real number would lose digits and the leading zero."], ["`BOOLEAN`", "A boolean holds only true or false."]],
    "Phone numbers are text, so leading zeros are kept.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the effect of `NOT NULL` on a field?",
    ["A value must always be entered in the field", "Correct."],
    [["The field must contain only numbers", "NOT NULL does not restrict the data type."], ["The value must be different in every record", "That describes a primary key."], ["The field is linked to another table", "That is a foreign key."]],
    "NOT NULL stops a record being saved without a value in that field.");
  mc(b, 3, "APPLICATION", "A `Patient` table has a field `DoctorID` that must match a `DoctorID` in the `Doctor` table. Which clause enforces this?",
    ["`FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)`", "Correct."],
    [["`PRIMARY KEY (DoctorID) REFERENCES Doctor(DoctorID)`", "A primary key cannot refer to another table."], ["`FOREIGN KEY (Doctor) REFERENCES DoctorID(Doctor)`", "The table and field names are the wrong way round."], ["`NOT NULL (DoctorID) LINKS Doctor`", "There is no such clause."]],
    "The foreign key names the field in this table and the table and field it refers to.", { hints: ["Which field refers to which table?"] });
  mc(b, 3, "APPLICATION", "Which statement adds a field `Email` of up to 50 characters to an existing table `Patient`?",
    ["`ALTER TABLE Patient ADD Email VARCHAR(50);`", "Correct."],
    [["`INSERT INTO Patient ADD Email VARCHAR(50);`", "INSERT INTO adds records."], ["`CREATE TABLE Patient ADD Email VARCHAR(50);`", "CREATE TABLE makes a new table."], ["`UPDATE Patient SET Email VARCHAR(50);`", "UPDATE changes values, not structure."]],
    "ALTER TABLE changes the structure of an existing table.", { hints: ["Is the structure or the data being changed?"] });
  mc(b, 3, "ANALYSIS", "A script creates the table `Patient` with a foreign key to `Doctor`, but `Doctor` is created after `Patient`. What happens in most systems?",
    ["The statement fails, because `Doctor` does not exist yet", "Correct: create the referred-to table first."],
    [["The tables are created and the order of creation never matters", "The referred-to table must exist."], ["The `Doctor` table is created automatically", "The DBMS does not create tables by itself."], ["The foreign key is changed into a primary key", "The DBMS does not change keys."]],
    "A foreign key refers to an existing table, so that table must be created first.", { hints: ["Can a key refer to a table that does not exist?"] });
  mc(b, 3, "ANALYSIS", "Which statement about `CHARACTER(4)` and `VARCHAR(4)` is correct?",
    ["`CHARACTER(4)` always holds exactly 4 characters; `VARCHAR(4)` holds up to 4", "Correct."],
    [["`VARCHAR(4)` always holds exactly 4 characters; `CHARACTER(4)` holds up to 4", "The two are the wrong way round."], ["Both hold only numbers", "Both hold text."], ["`CHARACTER(4)` holds 4 numbers and `VARCHAR(4)` holds 4 dates", "Neither type is for numbers or dates."]],
    "CHARACTER is fixed length; VARCHAR is variable length.", { hints: ["Think about the word VARiable."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A field declared as PRIMARY KEY may contain the same value in two records.", answer: false, explanation: "False. A primary key must be unique and cannot be empty." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A student number such as S0042 should be stored in an INTEGER field.", answer: false, explanation: "False. It contains a letter and is a label, so it needs a text type." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each SQL data type to the data it is best suited to.",
    pairs: [["INTEGER", "The number of seats in a room"], ["REAL", "The price of an item in dollars and cents"], ["DATE", "A person's date of birth"], ["BOOLEAN", "Whether a patient is insured"], ["VARCHAR(30)", "A surname"]],
    explanation: "Each type fits the kind of value stored." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["The table must refer to the Doctor table."],
    stem: "Complete the missing keywords in the table definition.",
    template: "CREATE TABLE Patient (PatientID CHARACTER(6) {{blank:a}}, Surname VARCHAR(30) {{blank:b}}, DoctorID CHARACTER(4), {{blank:c}} (DoctorID) {{blank:d}} Doctor(DoctorID));",
    blanks: [
      { id: "a", accepted: ["PRIMARY KEY"], choices: ["PRIMARY KEY", "FOREIGN KEY", "NOT NULL", "REFERENCES"] },
      { id: "b", accepted: ["NOT NULL"], choices: ["PRIMARY KEY", "FOREIGN KEY", "NOT NULL", "REFERENCES"] },
      { id: "c", accepted: ["FOREIGN KEY"], choices: ["PRIMARY KEY", "FOREIGN KEY", "NOT NULL", "REFERENCES"] },
      { id: "d", accepted: ["REFERENCES"], choices: ["PRIMARY KEY", "FOREIGN KEY", "NOT NULL", "REFERENCES"] },
    ], explanation: "PRIMARY KEY identifies records, NOT NULL requires a value, FOREIGN KEY ... REFERENCES links to the other table." });
  b.short({ d: 2, skill: "RECALL", stem: "Write the SQL keyword (two words) that begins a statement to change the structure of a table.",
    accepted: ["ALTER TABLE"], explanation: "ALTER TABLE changes a table's structure." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Look at the CREATE TABLE statement for Patient."],
    stem: `Here is part of a script.\n\n${codeBlock(clinic)}\n\nName the field in the \`Patient\` table that is the foreign key.`,
    accepted: ["DoctorID"], explanation: "DoctorID in Patient refers to Doctor(DoctorID)." });
  b.num({ d: 2, skill: "APPLICATION", calculator: false, daily: true, hints: ["Count the fields listed for Patient, not the FOREIGN KEY line."],
    stem: `Here is a script.\n\n${codeBlock(clinic)}\n\nHow many fields does the \`Patient\` table have?`,
    value: nPatientFields, wrong: [5, 7], workedSolution: "1. The fields are PatientID, Surname, DateOfBirth, Phone, Insured and DoctorID.\n2. The FOREIGN KEY line is a constraint, not a field.\n3. Total = 6.", explanation: "Six fields; the FOREIGN KEY line is not a field." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Look for NOT NULL in both tables."],
    stem: `Here is a script.\n\n${codeBlock(clinic)}\n\nHow many fields in the two tables together are declared NOT NULL (not counting the primary keys)?`,
    value: nNotNull, wrong: [1, 4], workedSolution: "1. Doctor: Surname is NOT NULL.\n2. Patient: Surname is NOT NULL.\n3. Total = 2.", explanation: "Surname in each table." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["Choose a data type for each field.", "Mark the primary key."],
    stem: "A bookshop stores books in a table `Book` with the fields `BookID` (always 5 characters), `Title` (up to 60 characters, must always be entered), `Price` (dollars and cents), `Published` (a date) and `InStock` (true or false). `BookID` is the primary key. Write the SQL statement to create the table. [4]",
    points: ["CREATE TABLE Book with the five fields in brackets, separated by commas", "BookID declared as CHARACTER(5) and as the PRIMARY KEY", "Title declared as VARCHAR(60) NOT NULL", "Price as REAL, Published as DATE and InStock as BOOLEAN"],
    modelAnswer: `\n${codeBlock(modelBook)}`,
    explanation: "One mark for the statement, then the key, the text field and the other types." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 2, hints: ["Which statement changes a table's structure?"],
    stem: "Write an SQL statement to add a field `Email`, of up to 50 characters, to the table `Patient`. [2]",
    points: ["ALTER TABLE Patient", "ADD Email VARCHAR(50);"],
    modelAnswer: `\n${codeBlock(alterStmt)}`,
    explanation: "ALTER TABLE ... ADD field type." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about leading zeros and about calculations."],
    stem: "A developer stores phone numbers in a field of type `INTEGER`. Explain two problems this could cause. [3]",
    points: ["A leading zero would be lost, so the number would be stored wrongly", "A phone number is never used in calculations, so a numeric type has no benefit", "Characters such as + or spaces cannot be stored, so some numbers cannot be entered"],
    modelAnswer: "The leading zero would be lost, so the number would be changed. Phone numbers are never used in calculations, so an integer has no benefit. Characters like + cannot be stored.",
    explanation: "Phone numbers are text labels." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Which table does the foreign key refer to?"],
    stem: "A script creates `Loan` with the clause `FOREIGN KEY (MemberID) REFERENCES Member(MemberID)`. Explain what this clause does and why the `Member` table must be created first. [3]",
    points: ["It makes MemberID in Loan a foreign key that refers to MemberID in the Member table", "The DBMS then refuses a loan whose MemberID does not exist in Member (referential integrity)", "Member must already exist, because a key cannot refer to a table that has not been created"],
    modelAnswer: "The clause makes MemberID in Loan a foreign key that refers to Member. The DBMS then refuses a loan for a MemberID that does not exist in Member. Member must be created first because the key cannot refer to a table that does not yet exist.",
    explanation: "Link, integrity and order." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Read the script line by line.", "A foreign key line is a constraint, not a field."],
    explanation: `The script creates Doctor (3 fields) and Patient (${nPatientFields} fields); DoctorID is the foreign key.`,
    stem: `A clinic's database is built with this script.\n\n${codeBlock(clinic)}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the primary key of the `Doctor` table.", accepted: ["DoctorID"], explanation: "DoctorID is declared PRIMARY KEY." }),
      P.num({ label: "(b)", marks: 1, stem: "How many fields does the `Patient` table have?", value: nPatientFields, wrong: [5, 7], explanation: "Six fields.", workedSolution: "1. " + ("Six fields.") }),
      P.short({ label: "(c)", marks: 1, stem: "Which data type is used for the field that records whether a patient is insured?", accepted: ["BOOLEAN"], explanation: "Insured is BOOLEAN." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain what happens if the clinic tries to add a patient whose `DoctorID` is `D999` when no doctor has that identifier.", points: ["The DoctorID in Patient is a foreign key referring to Doctor", "D999 does not match any DoctorID in Doctor", "The DBMS refuses to add the record, protecting referential integrity"], modelAnswer: "DoctorID is a foreign key referring to Doctor. D999 does not match any doctor, so the DBMS refuses to add the patient, which protects referential integrity.", explanation: "Foreign key, no match, refused." }),
    ] });
  b.struct({ d: 4, skill: "CREATION", examStyle: true, hints: ["Create Member before Loan.", "LoanID is the primary key of Loan; MemberID is the foreign key."],
    explanation: "Member is created first; Loan has a foreign key to Member.",
    stem: "A library has two tables. `Member(MemberID, Surname)`: `MemberID` is 4 characters and is the primary key; `Surname` is up to 30 characters and must be entered. `Loan(LoanID, MemberID, BookID, DateOut)`: `LoanID` is a whole number and the primary key; `MemberID` is a foreign key to `Member` and must be entered; `BookID` is 5 characters; `DateOut` is a date.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Write the SQL statement to create the table `Member`, and the statement to create the table `Loan`, in the order in which they must be run. Show the key clauses.", points: ["Member is created before Loan", "Member: MemberID CHARACTER(4) PRIMARY KEY and Surname VARCHAR(30) NOT NULL", "Loan: LoanID INTEGER PRIMARY KEY, MemberID CHARACTER(4) NOT NULL, BookID CHARACTER(5) and DateOut DATE", "FOREIGN KEY (MemberID) REFERENCES Member(MemberID) in Loan"], modelAnswer: `\n${codeBlock(modelLoan)}`, explanation: "Correct order, types, primary keys and the foreign key." }),
      P.manual({ label: "(b)", marks: 2, stem: "The library now wants to record the date each book is due back. Write an SQL statement to add the field `DateDue`, of type DATE, to `Loan`.", points: ["ALTER TABLE Loan", "ADD DateDue DATE;"], modelAnswer: `\n${codeBlock("ALTER TABLE Loan ADD DateDue DATE;")}`, explanation: "ALTER TABLE ... ADD." }),
      P.manual({ label: "(c)", marks: 2, stem: "State why the new field cannot be declared NOT NULL when records already exist in `Loan`.", points: ["The existing records have no value for the new field", "NOT NULL would be broken by those records, so the field must allow NULL (or have a default)"], modelAnswer: "The existing loans have no due date, so the new field must be allowed to hold NULL for them.", explanation: "Existing records hold NULL." }),
    ] });
  b.card("DEFINITION", "DDL", "Data definition language: the SQL statements that create and change the structure (CREATE TABLE, ALTER TABLE).");
  b.card("FACT", "SQL data types", "CHARACTER(n), VARCHAR(n), BOOLEAN, INTEGER, REAL, DATE, TIME.");
  b.card("CONCEPT", "CHARACTER and VARCHAR", "CHARACTER(n) is always n characters long; VARCHAR(n) is up to n characters.");
  b.card("FACT", "CREATE TABLE form", "CREATE TABLE Name (Field Type constraints, ..., FOREIGN KEY (Field) REFERENCES Table(Field));");
  b.card("CONCEPT", "PRIMARY KEY and NOT NULL", "PRIMARY KEY: unique and never empty. NOT NULL: a value must always be given.");
  b.card("CONCEPT", "FOREIGN KEY ... REFERENCES", "Makes a field refer to the primary key of another table, which enforces referential integrity.");
  b.card("FACT", "ALTER TABLE", "Changes an existing table, for example ALTER TABLE Patient ADD Email VARCHAR(50);");
  b.card("CONCEPT", "Order of creating tables", "Create the table that is referred to before the table that refers to it.");
  b.card("CONCEPT", "Identifiers are text", "Phone numbers and student numbers are labels: use CHARACTER or VARCHAR to keep leading zeros.");
});
