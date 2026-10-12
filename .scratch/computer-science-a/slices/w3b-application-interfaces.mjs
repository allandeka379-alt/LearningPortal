// Slice w3b: Database applications and accessing data from programs (acs.db.application-interfaces, ZIMSEC only).
// Every Python program shown is run for real with py().
import { concept, P, chk, same, py, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

const setupPy = `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE Item (Code TEXT, Name TEXT, Stock INTEGER)")
cur.executemany("INSERT INTO Item VALUES (?, ?, ?)",
                [("A1", "Pen", 40), ("A2", "Book", 15), ("A3", "Ruler", 8), ("A4", "Bag", 3)])
`;
const progA = `${setupPy}
cur.execute("SELECT Name FROM Item WHERE Stock < ?", (10,))
rows = cur.fetchall()
print(len(rows))
for r in rows:
    print(r[0])
conn.close()`;
const outA = py(progA);
same(outA, "2\nRuler\nBag");

const progB = `${setupPy}
cur.execute("UPDATE Item SET Stock = Stock + ? WHERE Stock < ?", (10, 20))
print("Changed:", cur.rowcount)
conn.commit()
cur.execute("SELECT SUM(Stock) FROM Item")
print("Total stock:", cur.fetchone()[0])
conn.close()`;
const outB = py(progB);
same(outB, "Changed: 3\nTotal stock: 96");
chk(40 + 25 + 18 + 13, 96);

// injection scenario
const progC = `name = input()
statement = "SELECT * FROM Member WHERE Surname = '" + name + "'"
print(statement)`;
const built = py(progC, "' OR '1'='1");
same(built, "SELECT * FROM Member WHERE Surname = '' OR '1'='1'");
const builtNormal = py(progC, "Moyo");
same(builtNormal, "SELECT * FROM Member WHERE Surname = 'Moyo'");

// model answer tested
const model = `import sqlite3

conn = sqlite3.connect("shop.db")
cur = conn.cursor()
code = input("Enter the item code: ")
cur.execute("SELECT Name, Stock FROM Item WHERE Code = ?", (code,))
row = cur.fetchone()
if row is None:
    print("Item not found")
else:
    print(row[0], "has", row[1], "in stock")
conn.close()`;
const testable = (stdin) => py(model.replace('"shop.db"', '":memory:"').replace("code = input", `cur.execute("CREATE TABLE Item (Code TEXT, Name TEXT, Stock INTEGER)")\ncur.executemany("INSERT INTO Item VALUES (?, ?, ?)", [("A1", "Pen", 40), ("A3", "Ruler", 8)])\ncode = input`), stdin);
same(testable("A3"), "Enter the item code: Ruler has 8 in stock");
same(testable("Z9"), "Enter the item code: Item not found");

concept("acs.db.application-interfaces", { file: "db/application-interfaces", keyPrefix: "db.application-interfaces" }, (b) => {
  mc(b, 1, "RECALL", "Which database object is used to enter or view one record at a time on the screen?",
    ["Form", "Correct."],
    [["Report", "A report is formatted output, usually printed."], ["Query", "A query selects data."], ["Index", "An index speeds up searching."]],
    "A form shows or collects one record at a time.");
  mc(b, 2, "RECALL", "Which database object produces a formatted printout, with grouping and totals?",
    ["Report", "Correct."],
    [["Form", "A form is for entering and viewing records."], ["Table", "A table stores the data."], ["Primary key", "A key identifies records."]],
    "A report is formatted output for printing.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is SQL injection?",
    ["User input that is run as SQL and changes a statement", "Correct."],
    [["Copying a whole database onto a removable memory stick", "That is a backup."], ["Adding a new table to the database by using a form", "That is database design."], ["A virus that deletes the DBMS software itself", "SQL injection works through the input box of an application."]],
    "SQL injection exploits statements built by joining user text.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In a Python program that uses `sqlite3`, what is the purpose of `conn.commit()`?",
    ["To save the changes made by INSERT, UPDATE or DELETE", "Correct."],
    [["To open the connection between the program and the database", "That is done by connect."], ["To read the rows that a query has returned to the program", "That is done by fetchone or fetchall."], ["To stop SQL injection from happening in the program", "That needs placeholders in the query."]],
    "Changes are saved only when commit is called.");
  mc(b, 3, "APPLICATION", "Which Python statement is safe from SQL injection?",
    ["`cur.execute(\"SELECT * FROM Member WHERE Surname = ?\", (name,))`", "Correct: the value is sent separately from the SQL."],
    [["`cur.execute(\"SELECT * FROM Member WHERE Surname = '\" + name + \"'\")`", "Joining the input into the text allows injection."], ["`cur.execute(\"SELECT * FROM Member WHERE Surname = \" + name)`", "This also joins the input into the statement."], ["`cur.execute(f\"SELECT * FROM Member WHERE Surname = '{name}'\")`", "A formatted string inserts the input into the SQL in the same way."]],
    "A placeholder with the value passed separately is a parameterised query.", { hints: ["Is the user's text inside the SQL or passed separately?"] });
  mc(b, 3, "APPLICATION", "A school wants a screen where staff choose a form from a drop-down list and see the learners in it. Which object should be built on a query?",
    ["A form based on a query that finds the learners", "Correct."],
    [["An index on the Surname field of the Learner table", "An index speeds up searching but is not a screen."], ["A new primary key for the Learner table in the database", "A key does not display data."], ["A backup file of the whole learner database", "A backup protects data."]],
    "Forms and reports are usually based on queries.", { hints: ["Which objects display data to the user?"] });
  mc(b, 3, "ANALYSIS", "In which stage of building a database application would the developer enter data that is too long for a field, to see whether the application copes?",
    ["Testing", "Correct: abnormal data is part of testing."],
    [["Requirements", "In the requirements stage the needs are found out."], ["Database design", "Design decides the tables and keys."], ["Documentation", "Documentation explains how to use the system."]],
    "Testing uses normal, abnormal and extreme data.", { hints: ["Which stage checks that the system works?"] });
  mc(b, 4, "ANALYSIS", "A programmer says: \"I validate every input, so I do not need parameterised queries.\" Which reply is best?",
    ["Validation helps, but parameterised queries are the reliable defence", "Correct."],
    [["Correct: input validation by itself completely prevents any SQL injection", "Validation can miss unusual input."], ["Wrong: validation is useless in a database application", "Validation is still useful for correct data."], ["Wrong: parameterised queries only work for numbers", "They work for text and numbers."]],
    "Use both, but rely on parameters to separate data from SQL.", { hints: ["Could a clever input pass a simple validation rule?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "A report is normally used to enter new records into a table.", answer: false, explanation: "False. A form is used to enter records; a report is formatted output." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a parameterised query the values are sent to the database separately from the SQL statement.", answer: true, explanation: "True. This means the values can only be treated as data." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["What happens to uncommitted changes when the connection is closed?"],
    stem: "A program runs an UPDATE statement and closes the connection without calling commit. The change is saved in the database file.", answer: false, explanation: "False. Changes are only saved by commit, so the update is lost." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each step of a database program to the Python method used.",
    pairs: [["Open the connection to the database", "connect"], ["Run an SQL statement", "execute"], ["Read all the rows of a query result", "fetchall"], ["Save the changes made to the data", "commit"], ["Release the database when finished", "close"]],
    explanation: "A program connects, executes, fetches, commits and closes." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Which method saves the changes?"],
    stem: "Complete the Python statements to change the stock of item A2 to 20 and save the change.",
    template: "cur.{{blank:a}}(\"UPDATE Item SET Stock = ? WHERE Code = ?\", (20, \"A2\"))\n\nconn.{{blank:b}}()",
    blanks: [
      { id: "a", accepted: ["execute"], choices: ["execute", "fetchall", "commit", "connect"] },
      { id: "b", accepted: ["commit"], choices: ["execute", "fetchall", "commit", "connect"] },
    ], explanation: "execute runs the statement and commit saves the change." });
  b.num({ d: 3, skill: "ANALYSIS", hints: ["Which items have Stock below 10?"],
    stem: `Here is a Python program. The table \`Item\` holds A1 Pen 40, A2 Book 15, A3 Ruler 8 and A4 Bag 3.\n\n${codeBlock(progA, "python")}\n\nHow many lines does the program output?`,
    value: outA.split("\n").length, wrong: [2, 4], workedSolution: "1. Items with Stock below 10 are Ruler (8) and Bag (3).\n2. The program prints the count (1 line) and then the names (2 lines).\n3. Total = 3 lines.", explanation: "The output is 2, Ruler and Bag: three lines." });
  b.num({ d: 4, skill: "ANALYSIS", hints: ["Which records are changed? Add the new stock to the total."],
    stem: `Here is a Python program. The table \`Item\` holds A1 Pen 40, A2 Book 15, A3 Ruler 8 and A4 Bag 3.\n\n${codeBlock(progB, "python")}\n\nState the total stock that the program prints.`,
    value: 96, wrong: [66, 86], workedSolution: "1. Items with Stock below 20: Book (15), Ruler (8), Bag (3): three records.\n2. Each gains 10: 25, 18, 13.\n3. Total = 40 + 25 + 18 + 13 = 96.", explanation: "Three records are increased by 10: 40 + 25 + 18 + 13 = 96." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the Python `sqlite3` method that is used to run an SQL statement.",
    accepted: ["execute", "cur.execute", "cursor.execute", "execute()", "cur.execute()"], explanation: "execute runs the statement." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Look at the program: it changes records."],
    stem: `Here is a statement built by a program when the user types \`' OR '1'='1\` into the surname box.\n\n${codeBlock(built)}\n\nState the number of rows that this statement returns if the Member table holds 25 records.`,
    accepted: ["25", "all", "25 rows", "all 25"], explanation: "The condition '1'='1' is always true, so every record matches." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What does the attacker type, and what happens to it?"],
    stem: "Explain what is meant by SQL injection. [3]",
    points: ["The attacker types SQL code into an input box", "The program joins the input into an SQL statement", "The statement is run with a meaning that the programmer did not intend (for example, returning all records)"],
    modelAnswer: "A user types SQL code into an input box. The program joins that input into an SQL statement, so the statement is run with a different meaning from the one intended, for example returning all the records.",
    explanation: "Input is treated as code." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the stage and say what is done."],
    stem: "Describe three stages in the development of a small database application for a school. [3]",
    points: ["Requirements: find out what data must be stored and what outputs are needed", "Design and build: design the tables and keys, then create the tables, forms, queries and reports", "Test the application with normal, abnormal and extreme data (or document, train and maintain)"],
    modelAnswer: "First the requirements are found out. The tables, keys, forms, queries and reports are then designed and built. The application is tested with normal, abnormal and extreme data, and then documented, installed and maintained.",
    explanation: "Requirements, design and build, test." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 5, hints: ["Connect, ask for the code, run a parameterised query, fetch the row, test whether a row was found."],
    stem: "A Python program uses the table `Item(Code, Name, Stock)` in the database file `shop.db`. Write a program that asks the user for an item code, finds the item with a parameterised query and outputs the name and the stock, or the message `Item not found`. [5]",
    points: ["Imports sqlite3, connects to shop.db and creates a cursor", "Inputs the item code from the user", "Executes a SELECT with a ? placeholder and the code passed as a parameter", "Fetches one row and tests whether it is None", "Outputs the name and stock, or Item not found, and closes the connection"],
    modelAnswer: `\n${codeBlock(model, "python")}`,
    explanation: "A tested program: for A3 it prints Ruler has 8 in stock; for Z9 it prints Item not found." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Which items have Stock below 20?"],
    explanation: "Three records are changed and the total stock becomes 96; commit saves the changes.",
    stem: `A shop's program is shown below. The table \`Item\` holds A1 Pen 40, A2 Book 15, A3 Ruler 8 and A4 Bag 3.\n\n${codeBlock(progB, "python")}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number printed after `Changed:`.", value: 3, wrong: [1, 4], explanation: "Three items have Stock below 20.", workedSolution: "1. " + ("Three items have Stock below 20.") }),
      P.num({ label: "(b)", marks: 2, stem: "State the total stock that the program prints.", value: 96, wrong: [66, 86], explanation: "40 + 25 + 18 + 13 = 96.", workedSolution: "1. " + ("40 + 25 + 18 + 13 = 96.") }),
      P.short({ label: "(c)", marks: 1, stem: "Name the method that saves the changes to the database.", accepted: ["commit", "conn.commit", "conn.commit()", "commit()"], explanation: "commit saves the changes." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the statement uses `?` placeholders instead of joining the numbers into the text of the SQL.", points: ["The values are sent separately and are treated only as data", "This prevents SQL injection if the values come from a user"], modelAnswer: "The values are sent separately and are treated only as data, which prevents SQL injection if they come from a user.", explanation: "Parameterised query." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Look at how the statement is built from the input.", "A placeholder keeps data and SQL separate."],
    explanation: "The input closes the quote and adds an always-true condition; a placeholder prevents this.",
    stem: `A library program builds this statement from the surname that a user types.\n\n${codeBlock(progC.split("\n").slice(1, 2).join("\n"), "python")}\n\nA user types \`' OR '1'='1\` as the surname.`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which statement is built?", options: [[built, "Correct: the quote after the empty text is closed and an always-true condition is added."], ["SELECT * FROM Member WHERE Surname = ' OR '1'='1'", "The opening quote added by the program is missing from this statement."], ["SELECT * FROM Member WHERE Surname = ''", "The rest of the input would be missing."], ["SELECT * FROM Member", "The WHERE clause is not removed."]], answer: "A", explanation: "The user's first quote closes the opening quote of the program." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why this statement returns every record in the table.", points: ["The first quote typed by the user closes the text, giving an empty surname", "OR '1'='1' is added to the condition", "'1'='1' is always true, so every record meets the condition"], modelAnswer: "The user's quote closes the text, so the surname is empty, and OR '1'='1' is added. '1'='1' is always true, so every record meets the condition.", explanation: "Always-true condition." }),
      P.manual({ label: "(c)", marks: 3, stem: "Rewrite the Python statement that runs the query so that it is safe from this attack.", points: ["The SQL text contains a ? placeholder instead of the surname", "The surname is passed as a separate parameter in a tuple to execute", "The cursor's execute method is used with both arguments"], modelAnswer: `\n${codeBlock('cur.execute("SELECT * FROM Member WHERE Surname = ?", (name,))', "python")}`, explanation: "Placeholder and parameter tuple." }),
      P.manual({ label: "(d)", marks: 1, stem: "State one other way of reducing the risk of SQL injection.", points: ["Validate the input, or limit the rights of the application's database account"], modelAnswer: "Validate the input (type, length, characters) or give the application's account only the rights it needs.", explanation: "Defence in depth." }),
    ] });
  b.card("DEFINITION", "Database application", "A program that gives users a friendly interface (forms, queries, reports) to a database.");
  b.card("CONCEPT", "Form, query, report", "Form: enter or view one record. Query: a saved request for data. Report: formatted, often printed, output with grouping and totals.");
  b.card("FACT", "Python database steps", "connect, create a cursor, execute, fetchone/fetchall (for SELECT), commit (for changes), close.");
  b.card("DEFINITION", "SQL injection", "User input that is run as SQL because the program joined it into the statement.");
  b.card("DEFINITION", "Parameterised query", "An SQL statement with ? placeholders; the values are passed separately, so they are only data.");
  b.card("FACT", "Preventing SQL injection", "Parameterised queries (main defence), input validation, limited database rights, no detailed error messages to users.");
  b.card("CONCEPT", "commit", "Saves the changes made by INSERT, UPDATE and DELETE; uncommitted changes are lost when the connection closes.");
  b.card("FACT", "Stages of a database application", "Requirements, design, build tables, build interface, test, document and train, implement and maintain.");
});
