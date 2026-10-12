// Slice w4b: programming languages and paradigms (acs.prog.language-paradigms, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py, sql } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.language-paradigms", { file: "prog/language-paradigms", keyPrefix: "prog.language-paradigms" }, (b) => {
  // ---- computed: clinic table
  const setup = `CREATE TABLE Patients (Name TEXT, Age INTEGER, Ward TEXT);
INSERT INTO Patients VALUES ('Moyo', 72, 'A'), ('Ncube', 34, 'B'), ('Banda', 65, 'A'), ('Chuma', 41, 'B'), ('Dube', 80, 'A');`;
  const patients = sql(setup, "SELECT * FROM Patients");
  const query = "SELECT COUNT(*) AS Total FROM Patients WHERE Age >= 60 AND Ward = 'A'";
  const q = sql(setup, query);
  const countA60 = q.rows[0][0];
  chk(countA60, 3);
  const loopOut = py(`patients = [("Moyo", 72, "A"), ("Ncube", 34, "B"), ("Banda", 65, "A"), ("Chuma", 41, "B"), ("Dube", 80, "A")]
total = 0
for name, age, ward in patients:
    if age >= 60 and ward == "A":
        total = total + 1
print(total)`);
  same(loopOut, "3");
  const wardB = sql(setup, "SELECT COUNT(*) FROM Patients WHERE Ward = 'B'").rows[0][0];
  chk(wardB, 2);
  const names = sql(setup, "SELECT Name FROM Patients WHERE Age < 50 ORDER BY Name").rows.map((r) => r[0]);
  same(names, ["Chuma", "Ncube"]);

  // ---- multiple choice
  mc(b, 2, "RECALL", "In a declarative language, the programmer",
    ["states what result is wanted, using facts, rules or queries", "The language system decides how to find it."],
    [["lists every machine operation in order", "That describes low-level code."], ["organises the program into classes and objects", "That describes object-oriented programming."], ["controls which registers hold the data", "That is low-level programming."]],
    "Declarative programs describe the result, not the steps.", { daily: true });
  mc(b, 2, "RECALL", "Which statement describes an imperative (procedural) language?",
    ["A program is a sequence of statements that change the state of the program", "The programmer states how the result is obtained."],
    [["A program is made of facts and rules that are matched against a goal", "That describes a declarative logic language."], ["A program is made of instructions for one particular processor only", "That describes a low-level language."], ["A program is made only of classes with no statements", "Object-oriented programs still contain statements."]],
    "Imperative code is a series of statements executed in order.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is assembly language called a low-level language?",
    ["Each instruction becomes one machine-code instruction", "It is close to the hardware."],
    [["It is easy to read because it uses English sentences", "Assembly uses short mnemonics, not sentences."], ["It can run on any processor without change", "Assembly is specific to one processor type."], ["It needs no translator", "An assembler is needed."]],
    "Assembly is close to the hardware and specific to one processor.", { daily: true });
  mc(b, 3, "APPLICATION", "A programmer must write the firmware for a small controller with very little memory that switches a relay on a borehole pump. Which paradigm is the most suitable?",
    ["Low-level", "Direct control of the hardware and a small, fast program are needed."],
    [["Declarative", "The controller needs exact control of the hardware, not a query."], ["Object-oriented with a large class library", "A large library would not fit the available memory."], ["Imperative, using many large libraries", "Large libraries would not fit in the small memory."]],
    "Small memory and direct hardware control suggest low-level code.", { hints: ["Which paradigm gives the programmer control of the hardware?"] });
  mc(b, 3, "APPLICATION", "A school wants one system with learners, teachers, classes and rooms, each with their own data and actions, and the types interact in many ways. Which paradigm suits this best?",
    ["Object-oriented", "Each type of thing becomes a class with its own data and methods."],
    [["Low-level", "A large system of interacting types would be very hard to write in assembly."], ["Declarative only", "A declarative language answers queries; it is not used to model objects with actions."], ["Imperative, with one long list of statements and no routines", "A single list of statements would be hard to manage for so many interacting parts."]],
    "Many interacting kinds of thing suggest classes and objects.", { hints: ["Which paradigm combines data and actions in one unit?"] });
  mc(b, 2, "RECALL", "SQL is designed for one kind of task, working with databases. What type of language is it?",
    ["A special-purpose, declarative language", "It is designed for one task and states what data is wanted."],
    [["A general-purpose, low-level language", "SQL is not low-level or general-purpose."], ["An object-oriented machine code", "SQL is not machine code."], ["An imperative, assembly language", "SQL is not assembly."]],
    "SQL states what data is wanted, and is made for databases only.");
  mc(b, 3, "ANALYSIS", "Which pair of statements about the paradigms is correct?",
    ["Python supports both imperative and object-oriented styles", "A language can support more than one paradigm."],
    [["Every language belongs to exactly one paradigm", "Many languages support several."], ["Assembly language can be moved to any computer unchanged", "Assembly is specific to a processor."], ["Declarative programs are always faster than imperative ones", "Speed depends on the problem and the system."]],
    "Languages and paradigms are not the same thing: one language can support several paradigms.", { hints: ["Is a paradigm a property of a language or of a style of programming?"] });
  mc(b, 2, "UNDERSTANDING", "Which is a general-purpose high-level language?",
    ["Python", "It is used for many kinds of problem."],
    [["SQL", "SQL is a special-purpose language for databases."], ["Machine code", "Machine code is low-level."], ["Assembly language", "Assembly is low-level."]],
    "A general-purpose language is not limited to one kind of task.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A program written in a low-level language can usually be run unchanged on any type of processor.", answer: false,
    explanation: "False. Low-level code is written for the instruction set of one type of processor." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In an object-oriented program, the data and the methods that act on it are combined in a single unit called an object.", answer: true,
    explanation: "True. An object holds its own data (properties) and the methods that work on it." });

  // ---- fib, num, short, match
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences by choosing the correct paradigm.",
    template: "A program built from classes and objects is {{blank:a}}.\n\nA program written as a list of instructions for one processor is {{blank:b}}.\n\nA program that states facts and rules and a goal is {{blank:c}}.",
    blanks: [{ id: "a", accepted: ["object-oriented"], choices: ["object-oriented", "low-level", "declarative", "imperative"] }, { id: "b", accepted: ["low-level"], choices: ["object-oriented", "low-level", "declarative", "imperative"] }, { id: "c", accepted: ["declarative"], choices: ["object-oriented", "low-level", "declarative", "imperative"] }],
    explanation: "Classes and objects: object-oriented. Processor instructions: low-level. Facts, rules and a goal: declarative." });
  const setup2 = "CREATE TABLE Visits (Client TEXT, Days INTEGER, Town TEXT); INSERT INTO Visits VALUES ('Sibanda', 3, 'Gweru'), ('Mpofu', 8, 'Mutare'), ('Zulu', 12, 'Gweru'), ('Phiri', 5, 'Gweru'), ('Tembo', 15, 'Mutare'), ('Bvumbi', 9, 'Gweru');";
  const visits = sql(setup2, "SELECT * FROM Visits");
  const query2 = "SELECT COUNT(*) AS Total FROM Visits WHERE Days >= 8 AND Town = 'Gweru'";
  const count2 = sql(setup2, query2).rows[0][0];
  chk(count2, 2);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the rows that satisfy both conditions in the table."],
    stem: `A health worker keeps a record of clients and the days they stayed in the table below.

${visits.md}

The declarative query \`${query2}\` is run. State the number it returns.`,
    value: count2, wrong: [1, 3], workedSolution: "Clients in Gweru who stayed at least 8 days are Zulu (12) and Bvumbi (9): 2.", explanation: "Two clients meet both conditions." });
  b.short({ d: 2, skill: "RECALL", stem: "State the name of the paradigm in which a program is built from classes and objects.", accepted: ["object-oriented", "object oriented", "OOP", "object-oriented programming"], wrong: ["declarative"], explanation: "The object-oriented paradigm." });
  b.match({ d: 2, skill: "APPLICATION", stem: "Match each problem to the paradigm that suits it best.",
    pairs: [["A set of queries over a database of patients", "Declarative"], ["Firmware for a pump controller with very little memory", "Low-level"], ["A calculation script that processes a list of marks step by step", "Imperative (procedural)"], ["A game with many kinds of character that interact", "Object-oriented"]],
    explanation: "Match the feature of the problem to the strength of the paradigm." });

  // ---- self-marked
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, stem: "Describe the difference between an imperative language and a declarative language. [2]",
    points: ["In an imperative language the programmer writes the statements that say how the result is obtained, step by step", "In a declarative language the programmer states what result is wanted (facts, rules or a query) and the system decides how"],
    modelAnswer: "An imperative program is a sequence of statements telling the computer how to get the result. A declarative program states what result is wanted and the language system works out how.", explanation: "How versus what." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about the processor and the translator."],
    stem: "Describe two characteristics of a low-level language. [3]",
    points: ["It is specific to one type of processor (not portable)", "Each instruction corresponds to one machine-code instruction and gives direct control of the registers and memory", "It is harder to write and read than a high-level language (or produces fast, small programs)"],
    modelAnswer: "Low-level code is specific to one type of processor. Each instruction matches one machine-code operation, giving direct control of registers and memory, but it is harder to write and read.", explanation: "Close to the hardware." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Name the paradigm, then link two features of the problem to its strengths."],
    stem: "A company is developing a booking system for a bus service with passengers, buses, routes and tickets, which are linked in many ways. Justify the choice of the object-oriented paradigm. [4]",
    points: ["Names the object-oriented paradigm", "Each type of thing (passenger, bus, route, ticket) can be a class with its own data and methods", "Objects can interact by calling methods, which models the links between them", "Classes can be reused and extended (inheritance), and the system is easier to maintain in parts"],
    modelAnswer: "Each kind of thing (passenger, bus, route, ticket) can be a class holding its own data and methods. Objects interact through methods, which matches the links in the problem, and classes can be reused and extended, so a large system is easier to maintain.", explanation: "Link the paradigm to the problem." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Consider a query over stored data."],
    stem: "A manager wants to find all customers whose balance is below zero. Explain why a declarative language such as SQL is suitable for this. [3]",
    points: ["The data is stored in a database table", "The manager only has to state what is wanted (customers where the balance is below zero), not how to search", "The database system chooses the method of finding the rows"],
    modelAnswer: "The data is held in a table. In SQL the manager states only what is wanted, customers whose balance is below zero, and the database system decides how to search the table.", explanation: "A query states the result wanted." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Read the table before the query.", "Compare the loop with the query."],
    explanation: "The same question answered declaratively and imperatively.",
    stem: `A clinic in Bulawayo wants to know how many older patients are in Ward A. Its data is in this table.\n\n${patients.md}\n\nThe question is answered in two ways.\n\n**Method 1**\n\n${codeBlock(query + ";")}\n\n**Method 2**\n\n${codeBlock(`patients = [("Moyo", 72, "A"), ("Ncube", 34, "B"), ("Banda", 65, "A"), ("Chuma", 41, "B"), ("Dube", 80, "A")]
total = 0
for name, age, ward in patients:
    if age >= 60 and ward == "A":
        total = total + 1
print(total)`, "python")}`,
    parts: [
      pm("(a)", "Which method uses a declarative language?", ["Method 1", "The query states what is wanted."], [["Method 2", "Method 2 gives the steps to follow."], ["Both methods", "Only the query is declarative."], ["Neither method", "SQL is declarative."]], "SQL states the result wanted."),
      P.num({ label: "(b)", marks: 1, stem: "State the value produced by both methods.", value: countA60, wrong: [2, 5], workedSolution: "Moyo (72), Banda (65) and Dube (80) are in Ward A and aged 60 or over.", explanation: "The result is 3." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the difference between the two methods in terms of the programmer's task.", points: ["In Method 1 the programmer states what is wanted (the count of patients meeting the condition) and the database system works out how", "In Method 2 the programmer writes each step: a loop, a test and a counter"], modelAnswer: "In Method 1 the programmer states only what is wanted and the database decides how. In Method 2 the programmer writes each step: the loop, the test and the counter.", explanation: "Declarative versus imperative." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give one reason why Method 2 might still be chosen by a programmer.", points: ["The data is not in a database (it is in a list in the program)", "Method 2 can be combined with other processing in a general-purpose program, e.g. output or calculations that SQL does not do"], modelAnswer: "The data is already held in a list in the program, and the loop can be combined with other processing in the same general-purpose program.", explanation: "A general-purpose language can do more than one job." }),
    ] });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Name the paradigm first, then the feature of the problem that suits it."],
    explanation: "Choosing and justifying paradigms for described problems.",
    stem: "A software company in Harare is working on three projects: (1) firmware for a solar-panel controller with a very small memory; (2) a graphical game with many different characters, items and places that interact; (3) a system for a hospital that answers questions asked of its stored records.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Match each project to the most suitable paradigm.", pairs: [["Project 1", "Low-level"], ["Project 2", "Object-oriented"], ["Project 3", "Declarative"]], extraRight: ["Imperative (procedural)"], explanation: "Hardware control, interacting objects, and queries over stored records." }),
      P.manual({ label: "(b)", marks: 3, stem: "Justify your choice of paradigm for Project 2.", points: ["The characters, items and places can each be a class with data and methods", "Objects interact by calling each other's methods, as in the game", "Classes can be extended (for example a new type of character) without rewriting the rest"], modelAnswer: "Each character, item and place can be a class with its own data and methods. Objects interact by calling methods, as in the game, and a new type of character can be added by extending a class.", explanation: "Link the problem to the paradigm." }),
      pm("(c)", "Which is a disadvantage of using the paradigm chosen for Project 1?", ["Programs are tied to one type of processor", "Low-level code is not portable."], [["Programs cannot control hardware directly", "They control hardware directly."], ["Programs need a compiler for a high-level language", "Low-level code uses an assembler."], ["Programs cannot be stored in memory", "They are stored in memory like all programs."]], "A low-level program must be rewritten for a different processor."),
      P.manual({ label: "(d)", marks: 1, stem: "State one reason why a general-purpose language could not replace the language chosen for Project 3.", points: ["A declarative query language answers questions about stored data without the programmer writing the search steps"], modelAnswer: "A declarative language lets the staff state what they want without writing the search steps.", explanation: "Queries state the result wanted." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Programming paradigm", "A style of programming that decides how a solution is described: low-level, imperative (procedural), object-oriented or declarative.");
  b.card("DEFINITION", "Low-level language", "Close to the hardware (machine code, assembly); specific to one processor; direct control of registers and memory.");
  b.card("DEFINITION", "Imperative (procedural) language", "A program is a sequence of statements that change the program's state, organised in procedures and functions: how the result is obtained.");
  b.card("DEFINITION", "Object-oriented language", "A program built from objects that combine data and methods, created from classes.");
  b.card("DEFINITION", "Declarative language", "The programmer states what result is wanted (facts, rules, queries); the system decides how.");
  b.card("FACT", "General-purpose and special-purpose", "General-purpose: used for many tasks (Python, Java). Special-purpose: made for one task (SQL for databases).");
  b.card("FACT", "Typical uses", "Low-level: drivers, embedded controllers. Imperative: calculations and scripts. OOP: large systems, games, GUIs. Declarative: database queries, expert systems.");
  b.card("CONCEPT", "Paradigm and language", "A language can support several paradigms (Python is imperative and object-oriented); a paradigm is a style, not a language.");
  b.card("CONCEPT", "Choosing a paradigm", "Link a feature of the problem to the strength of the paradigm: hardware control, step-by-step processing, interacting objects, queries over facts.");
});
