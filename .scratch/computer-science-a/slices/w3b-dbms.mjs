// Slice w3b: Database management systems (acs.db.dbms, both boards).
import { concept, P, chk, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

// clinic backup plan (the lesson uses a school database)
const dbGB = 20;
const change = 0.05;
const incr = dbGB * change;
const weekly = dbGB + 6 * incr;
chk(incr, 1, 1e-9);
chk(weekly, 26, 1e-9);
const groups = 5;
const tables = 4;
chk(groups * tables, 20);
const rightsRows = [
  ["Doctor", "Read and write", "Read and write", "None"],
  ["Nurse", "Read", "Read and write", "None"],
  ["Receptionist", "Read and write", "None", "Read"],
  ["Accounts clerk", "Read", "None", "Read and write"],
];
const rightsTable = mdTable(["User group", "Patient table", "Treatment table", "Billing table"], rightsRows);
const writeCount = rightsRows.flatMap((r) => r.slice(1)).filter((x) => x === "Read and write").length;
chk(writeCount, 5);

concept("acs.db.dbms", { file: "db/dbms", keyPrefix: "db.dbms" }, (b) => {
  mc(b, 1, "RECALL", "What is a database management system (DBMS)?",
    ["Software that creates, stores and controls a database", "Correct."],
    [["The tables, records and fields that make up a database", "That is the database itself."], ["A network that connects database users", "A DBMS is software, not a network."], ["A language for writing database queries", "That describes SQL, which the DBMS uses."]],
    "The DBMS is the software that manages the database.");
  mc(b, 2, "RECALL", "What does the data dictionary of a DBMS contain?",
    ["Data about the database, such as field names and types", "Correct: data about the data."],
    [["The records that are stored in each table of the database", "Records are in the tables, not the dictionary."], ["The passwords that are used by the users", "Passwords are part of security, not the dictionary."], ["A copy of the whole database for use in emergencies", "That is a backup."]],
    "The data dictionary describes the fields, types, rules and relationships.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why does a DBMS allow different groups of users to have different access rights?",
    ["So that each group sees only the data its job needs", "Correct: this protects the data."],
    [["So that the database runs faster for every user of it", "Access rights are not for speed."], ["So that the data can be recovered after a fault", "That is the purpose of backup."], ["So that tables do not need primary keys", "Keys are still needed."]],
    "Access rights limit what each user can see and change.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which feature of a DBMS makes it possible to restore the data after a hard disk fails?",
    ["Backup and recovery", "Correct: a copy of the data is restored."],
    [["The query processor", "The query processor carries out queries."], ["The data dictionary tables", "The dictionary describes the data."], ["Access rights", "Access rights stop unauthorised use but do not restore lost data."]],
    "Backups allow the database to be restored.");
  mc(b, 3, "APPLICATION", "A programmer adds a new field to a table. Programs that use the table keep working without being rewritten. Which feature of the DBMS makes this possible?",
    ["Programs reach the data through the DBMS", "Correct: programs do not depend on the physical file layout."],
    [["The access rights given to each user of the database", "Access rights control permission, not program independence."], ["Referential integrity between the two tables", "Referential integrity checks foreign keys."], ["Backup and recovery of the database after a fault", "Backup copies the data."]],
    "The DBMS hides the physical storage, which removes program-data dependence.", { hints: ["Which file-based problem is solved?"] });
  mc(b, 3, "APPLICATION", "A teacher tries to enter a mark of 135 in a field that has the range check 0 to 100. The DBMS refuses it. Which feature carried out the check?",
    ["Data integrity rules held in the data dictionary", "Correct: validation rules are part of integrity."],
    [["The backup system used to copy the database", "Backups do not check values."], ["The developer interface used to build the tables", "The developer interface is used to create the database."], ["Access rights given to the teacher's account", "The teacher had permission; the value itself was invalid."]],
    "Validation rules in the data dictionary protect integrity.", { hints: ["Is the problem the user's permission or the value?"] });
  mc(b, 3, "ANALYSIS", "Which tool is used by a developer to create tables, build forms and set validation rules?",
    ["The developer interface", "Correct: it provides the tools for creating the database."],
    [["The query processor", "The query processor carries out queries."], ["The data dictionary", "The dictionary stores the definitions but is not a tool for the developer."], ["The backup utility", "The backup utility copies data."]],
    "The developer interface is the DBMS's set of tools for building a database.", { hints: ["Who uses this part of the DBMS?"] });
  mc(b, 3, "ANALYSIS", "A DBMS receives the SQL statement `SELECT Surname FROM Student`. Which part of the DBMS works out how to find the data and returns the result?",
    ["The query processor", "Correct."],
    [["The data dictionary", "The dictionary holds descriptions of the data."], ["The developer interface", "That is used to build the database."], ["The access rights table", "Access rights decide permission only."]],
    "The query processor interprets and carries out queries.", { hints: ["Which part carries out SQL?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "The data dictionary stores the records of the database.", answer: false, explanation: "False. It stores data about the data, such as field names and data types." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A DBMS allows several users to access the same data at the same time.", answer: true, explanation: "True. Sharing the data is one of the main advantages over a file-based system." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Backup protects a database against unauthorised access.", answer: false, explanation: "False. Backup protects against loss of data. Access rights and passwords protect against unauthorised access." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each DBMS feature to its purpose.",
    pairs: [["Data dictionary", "Stores the names, types and rules of the fields"], ["Access rights", "Control which users may read or change which tables"], ["Backup", "Makes a copy so that lost data can be restored"], ["Query processor", "Carries out the SQL requests of users"], ["Developer interface", "Provides tools to build the tables, forms and reports"]],
    explanation: "Each feature has a distinct role." });
  b.fib({ d: 2, skill: "RECALL", stem: "Complete the sentences about the languages of a DBMS.",
    template: "{{blank:a}} statements such as CREATE TABLE define the structure of a database. {{blank:b}} statements such as SELECT and UPDATE work with the data.",
    blanks: [
      { id: "a", accepted: ["DDL"], choices: ["DDL", "DML", "DBMS"] },
      { id: "b", accepted: ["DML"], choices: ["DDL", "DML", "DBMS"] },
    ], explanation: "DDL defines the structure and DML manipulates the data." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the part of a DBMS that holds the names, data types and validation rules of the fields in a database.",
    accepted: ["data dictionary", "the data dictionary", "dictionary"], explanation: "The data dictionary holds data about the data." });
  b.num({ d: 3, skill: "APPLICATION", unit: undefined, calculator: false, hints: ["Each incremental backup is 5% of the database.", "Add the full backup to the six incremental backups."],
    stem: `A clinic's database is ${dbGB} GB. A full backup is made on Monday and an incremental backup on each of the other six days of the week. Each incremental backup holds the 5% of the database that changed that day. Calculate the total storage used by the week's backups, in GB.`,
    value: weekly, wrong: [dbGB * 7, dbGB + incr], workedSolution: `1. One incremental backup = ${dbGB} × 0.05 = ${incr} GB.\n2. Six incremental backups = 6 × ${incr} = ${6 * incr} GB.\n3. Total = ${dbGB} + ${6 * incr} = ${weekly} GB.`, explanation: `${dbGB} + 6 × ${incr} = ${weekly} GB.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Every group needs a setting for every table."],
    stem: `A DBMS has ${groups} user groups and ${tables} tables. An administrator sets an access right for every group on every table. How many access right settings are made?`,
    value: groups * tables, wrong: [groups + tables, tables], workedSolution: `${groups} × ${tables} = ${groups * tables}.`, explanation: `${groups} groups × ${tables} tables = ${groups * tables} settings.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, hints: ["Say what the dictionary stores and why."],
    stem: "Describe the data dictionary of a DBMS. [2]",
    points: ["It stores data about the database, such as field names, data types and sizes", "It also stores validation rules, keys and relationships between tables, which the DBMS uses to check requests"],
    modelAnswer: "The data dictionary stores data about the database: the field names, data types and sizes, the keys, validation rules and relationships. The DBMS uses it to check every request.",
    explanation: "Data about the data." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two points for each of the two features."],
    stem: "Explain two ways in which a DBMS improves the security of a school database compared with a file-based system. [4]",
    points: ["Access rights can be set for individual users and groups", "A teacher can see marks but not fees, so users see only the data their job needs", "Backups are made regularly", "After a failure the data can be recovered from the backup copy"],
    modelAnswer: "Access rights can be set for individuals and groups, so a teacher can see marks but not fees. Backups are made regularly, so after a failure the data can be restored from the backup copy.",
    explanation: "Access rights and backup." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Consider the file-based problems that each feature solves."],
    stem: "A manager says that a DBMS is not needed because the school can simply keep a spreadsheet in each department. Give three reasons why a DBMS is better. [3]",
    points: ["A DBMS stores each fact once, so there is less redundancy and inconsistency", "Several users can share and update the same data at the same time", "Access rights, integrity rules and backup are controlled in one place"],
    modelAnswer: "Each fact is stored once, so there is less redundancy and inconsistency. Several users can share and update the same data at the same time. Access rights, integrity rules and backup are controlled in one place.",
    explanation: "Redundancy, sharing and central control." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Match each need to the feature that provides it."],
    explanation: "Each requirement is met by a different DBMS feature.",
    stem: "A clinic in Gweru has moved its records from separate files into a database managed by a DBMS.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Match each requirement of the clinic to the DBMS feature that meets it.", pairs: [["The receptionist must not be able to change a patient's treatment record", "Access rights"], ["The data must be recoverable if the server is stolen", "Backup and recovery of the database after a fault"], ["Every phone number must have ten digits", "Validation rules in the data dictionary"]], extraRight: ["Query processor"], explanation: "Access rights limit users, backup recovers data and validation rules check values." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the file-based approach was a poor way to store the clinic's data. Refer to two limitations.", points: ["The same patient details were stored in several files (redundancy)", "The copies could disagree after a change (inconsistency)", "Staff could not easily share or combine the data of different departments (or programs depended on the file layout)"], modelAnswer: "The same patient details were stored in several files, so the copies could disagree after a change. Departments could not easily combine or share their data.", explanation: "Redundancy, inconsistency and poor sharing." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Give each group the least access that its job needs.", "Decide the check from the data dictionary."],
    explanation: "Access rights follow the job of each group; the validation rule is held in the data dictionary.",
    stem: `The clinic database has the following access rights.\n\n${rightsTable}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which user group can both read and write the Billing table?", accepted: ["Accounts clerk", "the accounts clerk", "accounts clerks"], explanation: "Only the accounts clerk has Read and write on Billing." }),
      P.short({ label: "(b)", marks: 1, stem: "Which user group can read the Billing table but cannot change it?", accepted: ["Receptionist", "the receptionist", "receptionists"], explanation: "The receptionist has Read only access to Billing." }),
      P.num({ label: "(c)", marks: 1, stem: "How many of the 12 settings in the table give the right to write (Read and write)?", value: writeCount, wrong: [4, 6], explanation: "Doctor: Patient and Treatment (2); Nurse: Treatment (1); Receptionist: Patient (1); Accounts clerk: Billing (1). Total 5.", workedSolution: "1. " + ("Doctor: Patient and Treatment (2); Nurse: Treatment (1); Receptionist: Patient (1); Accounts clerk: Billing (1). Total 5.") }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the nurses have been given Read only access to the Patient table.", points: ["Nurses need to see the patient's details to treat them", "They do not need to change the personal details, so changing them is not allowed", "This reduces the risk of accidental or unauthorised changes"], modelAnswer: "Nurses need to see the patient's details, but they do not need to change them. Read only access reduces the risk of accidental or unauthorised changes.", explanation: "Least access needed for the job." }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe one other way that the DBMS can protect the data from loss.", points: ["Regular full or incremental backups are made", "The data can be restored from the backup after a fault"], modelAnswer: "Regular backups are made, so the data can be restored from the backup after a fault.", explanation: "Backup and recovery." }),
    ] });
  b.card("DEFINITION", "DBMS", "Software that creates, stores, secures and gives controlled access to a database for many users.");
  b.card("DEFINITION", "Data dictionary", "Data about the data: field names, types, sizes, validation rules, keys and relationships.");
  b.card("DEFINITION", "Logical schema", "The design of the whole database: tables, fields, data types, keys and relationships, not the physical storage.");
  b.card("CONCEPT", "Data integrity in a DBMS", "Validation rules, primary key rules and referential integrity keep the data correct and consistent.");
  b.card("CONCEPT", "Access rights", "Permissions (none, read, read and write) set for each user or group on each table.");
  b.card("CONCEPT", "Backup and recovery", "Full backups copy everything; incremental backups copy only the changes. The database is restored after a failure.");
  b.card("CONCEPT", "Query processor", "The part of the DBMS that checks and carries out a query and returns the result.");
  b.card("CONCEPT", "Developer interface", "The tools used to create tables, validation rules, forms, reports and queries.");
  b.card("FACT", "DDL and DML", "DDL (CREATE TABLE, ALTER TABLE) defines the structure. DML (SELECT, INSERT, UPDATE, DELETE) works with the data.");
});
