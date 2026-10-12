// W3b exam-format item: one ZIMSEC Paper 2 section B item (Programming, Algorithm design and Databases, 40 marks):
// a school database with relational design to 2NF, SQL queries (real results) and a short Python program.
import { concept, P, EXAM, checkExam, ZIM, chk, same, sql, py, mdTable, codeBlock } from "../lib.mjs";

const Z = { skill: EXAM.ZIM_P2_PROG.skill, secs: EXAM.ZIM_P2_PROG.secs, examStyle: true, applies: ZIM };
const C = (k) => `acs.${k}`;

const setup = `
CREATE TABLE Learner (LearnerID CHARACTER(2) PRIMARY KEY, Surname VARCHAR(20), Form CHARACTER(2));
CREATE TABLE Subject (SubjectCode CHARACTER(2) PRIMARY KEY, SubjectTitle VARCHAR(25));
CREATE TABLE Result (LearnerID CHARACTER(2), SubjectCode CHARACTER(2), Mark INTEGER, PRIMARY KEY (LearnerID, SubjectCode),
  FOREIGN KEY (LearnerID) REFERENCES Learner(LearnerID), FOREIGN KEY (SubjectCode) REFERENCES Subject(SubjectCode));
INSERT INTO Learner VALUES ('L1','Moyo','5A'),('L2','Ncube','5A'),('L3','Banda','5B'),('L4','Chuma','5B'),('L5','Dube','5A');
INSERT INTO Subject VALUES ('CS','Computer Science'),('MA','Mathematics'),('PH','Physics');
INSERT INTO Result VALUES ('L1','CS',68),('L1','MA',61),('L2','CS',53),('L2','PH',47),('L3','CS',79),('L3','MA',56),('L4','CS',42),('L4','PH',63),('L5','CS',74),('L5','MA',69);
`;
const q = (s) => sql(setup, s);

concept(C("db.normalisation"), { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  // flat table for part (a): the first three learners
  const flat = q(`SELECT Result.LearnerID, Result.SubjectCode, Learner.Surname, Learner.Form, Subject.SubjectTitle, Result.Mark
    FROM Result INNER JOIN Learner ON Result.LearnerID = Learner.LearnerID INNER JOIN Subject ON Result.SubjectCode = Subject.SubjectCode
    WHERE Result.LearnerID IN ('L1','L2','L3') ORDER BY Result.LearnerID, Result.SubjectCode`);
  const fcols = ["LearnerID", "SubjectCode", "Surname", "Form", "SubjectTitle", "Mark"];
  same(flat.columns, fcols);
  chk(flat.count, 6);
  const holds = (det, dep) => {
    const di = det.map((c) => fcols.indexOf(c));
    const pi = dep.map((c) => fcols.indexOf(c));
    const m = new Map();
    for (const r of flat.rows) {
      const k = JSON.stringify(di.map((i) => r[i]));
      const v = JSON.stringify(pi.map((i) => r[i]));
      if (m.has(k) && m.get(k) !== v) return false;
      m.set(k, v);
    }
    return true;
  };
  same(holds(["LearnerID"], ["Surname", "Form"]), true);
  same(holds(["SubjectCode"], ["SubjectTitle"]), true);
  same(holds(["LearnerID", "SubjectCode"], ["Mark"]), true);
  same(holds(["LearnerID"], ["Mark"]), false);
  same(holds(["SubjectCode"], ["Mark"]), false);
  const tables = `**Learner**\n\n${q("SELECT * FROM Learner").md}\n\n**Subject**\n\n${q("SELECT * FROM Subject").md}\n\n**Result**\n\n${q("SELECT * FROM Result").md}`;

  // (d) real query results
  const nPass = q("SELECT COUNT(*) FROM Result WHERE Mark >= 50").rows[0][0];
  chk(nPass, 8);
  const avgCs = q("SELECT AVG(Mark) FROM Result WHERE SubjectCode = 'CS'").rows[0][0];
  chk(avgCs, 63.2, 1e-9);
  const topCs = q("SELECT Surname FROM Learner INNER JOIN Result ON Learner.LearnerID = Result.LearnerID WHERE SubjectCode = 'CS' ORDER BY Mark DESC").rows[0][0];
  same(topCs, "Banda");
  const modelQ = "SELECT Learner.Surname, Result.Mark\nFROM Learner\nINNER JOIN Result ON Learner.LearnerID = Result.LearnerID\nWHERE Result.SubjectCode = 'CS' AND Result.Mark > 60\nORDER BY Result.Mark DESC;";
  same(q(modelQ).rows, [["Banda", 79], ["Dube", 74], ["Moyo", 68]]);

  // (c) DDL model, run on SQLite
  const modelDdl = `CREATE TABLE Learner (
    LearnerID CHARACTER(2) PRIMARY KEY,
    Surname VARCHAR(20) NOT NULL,
    Form CHARACTER(2)
);

CREATE TABLE Subject (
    SubjectCode CHARACTER(2) PRIMARY KEY,
    SubjectTitle VARCHAR(25) NOT NULL
);

CREATE TABLE Result (
    LearnerID CHARACTER(2),
    SubjectCode CHARACTER(2),
    Mark INTEGER,
    PRIMARY KEY (LearnerID, SubjectCode),
    FOREIGN KEY (LearnerID) REFERENCES Learner(LearnerID),
    FOREIGN KEY (SubjectCode) REFERENCES Subject(SubjectCode)
);`;
  sql(modelDdl, "SELECT 1");

  // (e) Python program run for real
  const prog = `import sqlite3

conn = sqlite3.connect("school.db")
cur = conn.cursor()
cur.execute("SELECT Surname, Mark FROM Learner INNER JOIN Result ON Learner.LearnerID = Result.LearnerID WHERE SubjectCode = ? AND Mark < ? ORDER BY Mark", ("CS", 60))
rows = cur.fetchall()
for r in rows:
    print(r[0], r[1])
print("Below 60:", len(rows))
conn.close()`;
  const pySetup = (code) => `import sqlite3
_c = sqlite3.connect(":memory:")
_c.executescript(${JSON.stringify(setup)})
_orig = sqlite3.connect
sqlite3.connect = lambda name: _c
` + code;
  const progOut = py(pySetup(prog));
  same(progOut, "Chuma 42\nNcube 53\nBelow 60: 2");
  const model = `import sqlite3

conn = sqlite3.connect("school.db")
cur = conn.cursor()
learner_id = input("Enter the learner ID: ")
cur.execute("SELECT AVG(Mark) FROM Result WHERE LearnerID = ?", (learner_id,))
average = cur.fetchone()[0]
if average is None:
    print("No results for that learner")
else:
    print("Average mark:", round(average, 1))
conn.close()`;
  same(py(pySetup(model), "L1"), "Enter the learner ID: Average mark: 64.5");
  same(py(pySetup(model), "L9"), "Enter the learner ID: No results for that learner");

  b.struct({
    ...Z, d: 4, paper: "ZIMSEC Paper 2 Section B",
    concepts: [C("db.normalisation"), C("db.sql-ddl"), C("db.sql-dml"), C("db.application-interfaces")],
    stem: `A secondary school in Kwekwe keeps learners' marks in a database. At first the data was held in one table. This is part of it (the first three learners).\n\n${flat.md}\n\nThe primary key of this table is the combination of \`LearnerID\` and \`SubjectCode\`.\n\nThe data was then reorganised into the three tables below. \`Result\` has a composite primary key (\`LearnerID\`, \`SubjectCode\`).\n\n${tables}`,
    parts: checkExam(EXAM.ZIM_P2_PROG, [
      P.group({ label: "(a)", stem: "Study the single table.", parts: [
        P.mcq({ label: "(i)", marks: 1, stem: "How many fields make up the primary key?", options: [["Two", "Correct: LearnerID and SubjectCode."], ["One", "No single field is unique."], ["Three", "Only two fields are needed."], ["Six", "A key does not include every field."]], answer: "A", explanation: "The key is (LearnerID, SubjectCode)." }),
        P.mcq({ label: "(ii)", marks: 2, multiple: true, stem: "Select the three fields that depend on only part of the primary key.", options: [["Surname", "Correct: depends on LearnerID alone."], ["Form", "Correct: depends on LearnerID alone."], ["SubjectTitle", "Correct: depends on SubjectCode alone."], ["Mark", "Mark depends on both fields: a learner's mark in one subject."], ["LearnerID", "LearnerID is part of the primary key."], ["SubjectCode", "SubjectCode is part of the primary key."]], answer: ["A", "B", "C"], explanation: "Surname, Form and SubjectTitle are partially dependent." }),
        P.short({ label: "(iii)", marks: 1, stem: "State the highest normal form that the single table is in. Give your answer as 1NF, 2NF or 3NF.", accepted: ["1NF", "first normal form", "1"], explanation: "It is in 1NF but has partial dependencies." }),
      ] }),
      P.manual({ label: "(b)", marks: 6, stem: "Explain how the single table was normalised into the three tables. Write each table with its primary key and the foreign keys, and say which dependency caused each table to be made.", points: ["Learner(LearnerID, Surname, Form) with LearnerID as the primary key", "Surname and Form depend on LearnerID alone, so they were moved out (partial dependency)", "Subject(SubjectCode, SubjectTitle) with SubjectCode as the primary key", "SubjectTitle depends on SubjectCode alone, so it was moved out (partial dependency)", "Result(LearnerID, SubjectCode, Mark) with the composite primary key (LearnerID, SubjectCode)", "LearnerID and SubjectCode in Result are foreign keys that link to Learner and Subject"], modelAnswer: "Learner(LearnerID, Surname, Form): Surname and Form depend on LearnerID alone, so they were moved out. Subject(SubjectCode, SubjectTitle): SubjectTitle depends on SubjectCode alone, so it was moved out. Result(LearnerID, SubjectCode, Mark) keeps what depends on the whole key, with the composite primary key (LearnerID, SubjectCode); LearnerID and SubjectCode are foreign keys to Learner and Subject.", explanation: "Each partial dependency moves its attributes to a table keyed on its determinant." }),
      P.manual({ label: "(c)", marks: 6, stem: "Write SQL statements to create the three tables. Show the data types, the primary keys and the foreign keys. The tables must be created in the correct order.", points: ["Learner and Subject are created before Result", "Learner: LearnerID CHARACTER(2) as primary key, Surname VARCHAR and Form CHARACTER(2)", "Subject: SubjectCode CHARACTER(2) as primary key and SubjectTitle VARCHAR", "Result: LearnerID, SubjectCode and Mark INTEGER with suitable types", "PRIMARY KEY (LearnerID, SubjectCode) in Result", "FOREIGN KEY ... REFERENCES for both LearnerID and SubjectCode"], modelAnswer: `\n${codeBlock(modelDdl)}`, explanation: "Types, keys and the order of creation." }),
      P.group({ label: "(d)", stem: "Use the three tables to answer these questions about SQL queries.", parts: [
        P.num({ label: "(i)", marks: 1, stem: `State the number returned by:\n\n${codeBlock("SELECT COUNT(*)\nFROM Result\nWHERE Mark >= 50;")}`, value: nPass, wrong: [10, 2], explanation: "Eight results are 50 or more (the marks 47 and 42 are below 50).", workedSolution: "1. " + ("Eight results are 50 or more (the marks 47 and 42 are below 50).") }),
        P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: `State the number returned by:\n\n${codeBlock("SELECT AVG(Mark)\nFROM Result\nWHERE SubjectCode = 'CS';")}`, value: avgCs, answer: "63.2", tol: 0.001, wrong: [316, 70], workedSolution: "1. The Computer Science marks are 68, 53, 79, 42 and 74.\n2. Total = 316, divided by 5 = 63.2.", explanation: "316 ÷ 5 = 63.2." }),
        P.short({ label: "(iii)", marks: 1, stem: "State the surname of the learner with the highest Computer Science mark.", accepted: ["Banda"], explanation: "Banda scored 79 in Computer Science." }),
        P.manual({ label: "(iv)", marks: 4, stem: "Write an SQL query to show the surname and the mark of every learner who scored more than 60 in Computer Science (subject code CS), with the highest mark first.", points: ["SELECT Learner.Surname, Result.Mark FROM Learner", "INNER JOIN Result ON Learner.LearnerID = Result.LearnerID", "WHERE Result.SubjectCode = 'CS' AND Result.Mark > 60", "ORDER BY Result.Mark DESC"], modelAnswer: `\n${codeBlock(modelQ)}`, explanation: "Join, filter on subject and mark, sort descending." }),
      ] }),
      P.group({ label: "(e)", stem: `A teacher writes this Python program to read the database \`school.db\`, which holds the three tables.\n\n${codeBlock(prog, "python")}`, parts: [
        P.fib({ label: "(i)", marks: 2, stem: "State the first line of output and the number printed after `Below 60:`.", template: "First line: {{blank:s}} {{blank:m}}\n\nBelow 60: {{blank:n}}", blanks: [{ id: "s", accepted: ["Chuma"] }, { id: "m", input: "number", accepted: ["42"] }, { id: "n", input: "number", accepted: ["2"] }], explanation: "The CS marks below 60 are Chuma 42 and Ncube 53, in ascending order of mark; there are 2." }),
        P.manual({ label: "(ii)", marks: 6, stem: "Write a Python program that connects to `school.db`, asks the user for a learner ID, uses a parameterised query to find the learner's average mark across all subjects, and outputs it rounded to 1 decimal place. If the learner has no results the program must output a message instead.", points: ["Imports sqlite3, connects to school.db and creates a cursor", "Inputs the learner ID from the user", "Executes a SELECT AVG(Mark) query on Result with a ? placeholder", "Passes the learner ID as a parameter, not joined into the SQL", "Tests whether the result is None and outputs a message if it is", "Otherwise outputs the average rounded to 1 decimal place"], modelAnswer: `\n${codeBlock(model, "python")}`, explanation: "A tested program: for L1 it prints Average mark: 64.5; for L9 it prints the message." }),
      ] }),
      P.manual({ label: "(f)", marks: 4, stem: "Explain what is meant by SQL injection and how the use of a parameterised query in part (e) prevents it.", points: ["SQL injection is when a user types SQL code into an input box", "If the input is joined into the text of the query, it can change the meaning of the statement (for example make a condition always true)", "In a parameterised query the SQL contains a placeholder and the input is sent separately", "The input is therefore treated only as data and never as SQL"], modelAnswer: "SQL injection is when a user types SQL code into an input box. If the input is joined into the text of the query it can change the meaning of the statement. In a parameterised query the input is sent separately from the SQL, so it is treated only as data.", explanation: "Injection and the parameter defence." }),
      P.group({ label: "(g)", stem: "The database has a rule that a mark must be a whole number from 0 to 100 inclusive.", parts: [
        P.fib({ label: "(i)", marks: 3, stem: "State the type of test data for each value.", template: "55: {{blank:a}}\n\n0: {{blank:b}}\n\n101: {{blank:c}}", blanks: [{ id: "a", accepted: ["Normal"], choices: ["Normal", "Extreme", "Abnormal"] }, { id: "b", accepted: ["Extreme"], choices: ["Normal", "Extreme", "Abnormal"] }, { id: "c", accepted: ["Abnormal"], choices: ["Normal", "Extreme", "Abnormal"] }], explanation: "55 is typical, 0 is at the limit and 101 is outside the range." }),
        P.short({ label: "(ii)", marks: 1, stem: "Name the type of validation check that tests whether a mark is between 0 and 100.", accepted: ["range check", "range", "a range check"], explanation: "A range check." }),
      ] }),
    ]),
    hints: ["In (a), ask whether each field depends on both parts of the key.", "In (d), run each query by hand on the tables.", "In (e)(ii), pass the learner ID as a parameter."],
    explanation: "The single table is in 1NF with three partial dependencies; the queries give 8, 63.2 and Banda; the program outputs Chuma 42, Ncube 53 and Below 60: 2.",
  });
});
