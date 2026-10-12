// Slice w3b: File-based and relational databases (acs.db.relational-concepts, both boards).
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

// clinic scenario (the lesson uses a school)
const orders = 500;
const suppliers = 40;
const savedItems = orders * 2 - suppliers * 2;
chk(savedItems, 920);
const visits = 1200;
const patients = 300;
chk(visits - patients, 900);

concept("acs.db.relational-concepts", { file: "db/relational-concepts", keyPrefix: "db.relational-concepts" }, (b) => {
  mc(b, 2, "RECALL", "What is the name for one column in a database table?",
    ["Field", "Correct: a field (attribute) holds one item of data for every record."],
    [["Record", "A record is a row, not a column."], ["Table", "A table is the whole collection of rows and columns for one entity."], ["Key", "A key is a field used to identify or link records, not every column."]],
    "A column is a field (attribute); a row is a record (tuple).", { daily: true });
  mc(b, 1, "RECALL", "In a relational database, what is a primary key?",
    ["A field that is different in every record", "Correct: it identifies exactly one record."],
    [["A field that is copied into another table", "That describes a foreign key."], ["The first field in the table", "Position does not decide whether a field is a key."], ["A field that can be left empty", "A primary key can never be empty."]],
    "A primary key uniquely identifies each record and is never empty.");
  mc(b, 2, "UNDERSTANDING", "A clinic keeps a separate file in each department, and the patient's address is typed in every file. Which problem does this show most clearly?",
    ["Data redundancy", "Correct: the same data is stored more than once."],
    [["Data encryption", "Nothing here is about encoding data to keep it secret."], ["Referential integrity", "Referential integrity is a rule about keys in a relational database."], ["Data indexing", "Indexing speeds up searches and is not a problem of the file-based approach."]],
    "Repeating the address in every file is data redundancy, and it can lead to inconsistency.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A programmer changes the layout of a data file by adding a field. Every program that reads the file must be rewritten. Which limitation of the file-based approach is this?",
    ["Program-data dependence", "Correct: the file structure is built into each program."],
    [["Data redundancy", "Redundancy is about repeated data, not about program changes."], ["Poor sharing between users", "The problem here is the effect of changing the file layout."], ["Lack of backup", "Backup is a different issue."]],
    "In a file-based system the program depends on the layout of the file.");
  mc(b, 2, "UNDERSTANDING", "Which statement about a foreign key is correct?",
    ["It holds a primary key value from another table", "Correct: it is the link between two tables."],
    [["It identifies each record in its own table of data", "That is the primary key."], ["It is always made of two fields", "A foreign key is usually a single field."], ["It must be unique in its own table", "In a one-to-many relationship the same foreign key value appears in many records."]],
    "A foreign key matches a primary key in another table, which links the records.");
  mc(b, 3, "APPLICATION", "A table `Vehicle` has the fields `Registration`, `ChassisNo`, `Owner` and `Colour`. Registration and chassis numbers are both unique. `Registration` is chosen to identify the records. What is `ChassisNo`?",
    ["A secondary key", "Correct: it is a candidate key that was not chosen as the primary key."],
    [["A foreign key", "A foreign key links to another table; nothing here does."], ["A composite key", "A composite key is made of several fields; ChassisNo is a single field."], ["A primary key", "Registration was chosen as the primary key."]],
    "ChassisNo is a candidate key that was not chosen as the primary key, so it is a secondary key.", { hints: ["Which fields are unique for every vehicle?"] });
  mc(b, 3, "APPLICATION", "A database has a table `Parent` and a table `Learner`. Each parent can have many learners at the school, but each learner is recorded with one parent. Where should the foreign key be placed?",
    ["In `Learner`, holding the parent's primary key", "Correct: the foreign key goes on the many side."],
    [["In `Parent`, holding the learner's primary key", "That would allow only one learner for each parent."], ["In both tables", "One foreign key on the many side is enough for a one-to-many relationship."], ["In neither table, because the tables are linked by name", "Tables are linked through key values, not through their names."]],
    "In a one-to-many relationship the foreign key is on the many side.", { hints: ["Which table has many records for one record in the other?"] });
  mc(b, 3, "ANALYSIS", "A pupil record is added with `ClassID` = 9Z, but no class 9Z exists in the `Class` table. Which database rule has been broken?",
    ["Referential integrity", "Correct: a foreign key value must match an existing primary key."],
    [["Entity integrity rules", "Entity integrity concerns empty or repeated primary keys."], ["Normalisation", "Normalisation is a design process, not a rule checked on insertion."], ["Data dictionary", "A data dictionary describes the database and is not a rule."]],
    "A foreign key value with no matching primary key breaks referential integrity.", { hints: ["Look at the foreign key and the table it should match."] });
  b.tf({ d: 1, skill: "RECALL", stem: "In a relational database, each fact is normally stored once, and tables are linked by keys.", answer: true, explanation: "True. This removes most redundancy and inconsistency." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A primary key field may contain an empty (null) value if the data is not yet known.", answer: false, explanation: "False. A primary key identifies the record, so it can never be empty." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Adding an index to a field makes searches on that field faster but uses extra storage.", answer: true, explanation: "True. The sorted index structure is extra data that must also be kept up to date." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Entity", "Something about which data is stored, such as a patient"], ["Record", "One row of a table"], ["Field", "One column of a table"], ["Candidate key", "A field that could serve as the primary key"], ["Index", "A sorted structure that speeds up searching"]],
    explanation: "Each term names one part of a relational database." });
  b.fib({ d: 2, skill: "RECALL", stem: "Complete the sentences about a relational database.",
    template: "A table holds the data about one {{blank:a}}. A row is called a {{blank:b}} and a column is called a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["entity"], choices: ["entity", "field", "record", "index"] },
      { id: "b", accepted: ["record"], choices: ["record", "field", "key", "entity"] },
      { id: "c", accepted: ["field"], choices: ["field", "record", "table", "relation"] },
    ], explanation: "A table is about an entity; its rows are records and its columns are fields." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of key that is used to link a record in one table to a record in another table.",
    accepted: ["foreign key", "a foreign key"], explanation: "A foreign key holds the primary key value of the related record." });
  b.short({ d: 2, skill: "UNDERSTANDING", stem: "What name is given to a relationship in which one record in table A matches many records in table B and each record in B matches only one record in A?",
    accepted: ["one-to-many", "one to many", "1:m", "1:many", "one-to-many relationship"], normalise: ["trim", "lowercase", "collapse_whitespace"],
    explanation: "This is a one-to-many (1:M) relationship, such as one class with many pupils." });
  b.num({ d: 3, skill: "APPLICATION", unit: undefined, calculator: false, hints: ["Items stored in the file: orders × 2.", "Items stored in the database: suppliers × 2."],
    stem: `A shop's order file has ${orders} rows. Each row repeats the supplier's name and telephone number. There are only ${suppliers} different suppliers. If the supplier details were stored once for each supplier in a separate table, how many fewer data items (names and telephone numbers) would be stored?`,
    value: savedItems, wrong: [orders * 2, suppliers * 2], workedSolution: `1. In the file: ${orders} × 2 = ${orders * 2} items.\n2. In the supplier table: ${suppliers} × 2 = ${suppliers * 2} items.\n3. Saved = ${orders * 2} − ${suppliers * 2} = ${savedItems}.`, explanation: `The file stores ${orders * 2} items; the supplier table stores ${suppliers * 2}; the difference is ${savedItems}.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Each visit row repeats the patient's details; the patient table holds each patient once."],
    stem: `A clinic's visit file has ${visits} rows, one for each visit, and each row repeats the patient's address. There are ${patients} different patients. How many address entries would be removed if the address were held once for each patient in a patient table?`,
    value: visits - patients, wrong: [patients, visits], workedSolution: `1. Addresses in the file: ${visits}.\n2. Addresses in the patient table: ${patients}.\n3. Removed = ${visits} − ${patients} = ${visits - patients}.`, explanation: `${visits} − ${patients} = ${visits - patients} address entries removed.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Name each problem and give its effect."],
    stem: "Describe three limitations of a file-based approach to storing data. [3]",
    points: ["Data redundancy: the same data is stored in several files, which wastes storage", "Data inconsistency: copies of the data may disagree after an update is made in only some of the files", "Program-data dependence: programs depend on the file format, so a change to the file means the programs must be rewritten (or poor sharing and security)"],
    modelAnswer: "The same data is stored in several files (redundancy), so the copies can disagree after an update (inconsistency). Each program depends on the layout of its file, so a change to the file means the programs must be rewritten.",
    explanation: "Redundancy, inconsistency and program-data dependence are the usual three; poor sharing and weak security are also creditworthy." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["One mark for the definition, two for the consequences."],
    stem: "Explain what is meant by referential integrity. [3]",
    points: ["Every foreign key value must match an existing primary key value in the related table", "The database refuses to add a record whose foreign key has no matching record", "The database refuses to delete a record that other records still refer to (so there are no orphan records)"],
    modelAnswer: "Every foreign key value must match a primary key value in the related table. The database refuses to add a record whose foreign key has no match, and refuses to delete a record that other records still refer to.",
    explanation: "Referential integrity keeps the links between tables valid." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 4, hints: ["Two benefits and two costs."],
    stem: "A school office adds an index to the `Surname` field of a table of 2 000 pupils. Discuss the advantages and disadvantages of doing this. [4]",
    points: ["Advantage: a search for a surname is much faster because the DBMS does not read every record", "Advantage: sorted output by surname is faster", "Disadvantage: the index uses extra storage space", "Disadvantage: adding, changing or deleting a pupil is slower because the index must also be updated"],
    modelAnswer: "Searching and sorting by surname is faster because the DBMS can use the index instead of reading all 2 000 records. However, the index needs extra storage, and every insert, update or delete is slower because the index has to be updated as well.",
    explanation: "Faster searching against extra storage and slower updates." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Which table is on the many side?"],
    explanation: "A bus belongs to one route and a route has many buses, so the foreign key is RouteID in the Bus table.",
    stem: "A bus company in Bulawayo stores its data in two tables.\n\n`Route(RouteID, Origin, Destination)`\n\n`Bus(BusNo, Registration, Capacity, RouteID)`\n\nEach bus is assigned to one route and a route may have many buses. `BusNo` and `Registration` are both unique for each bus.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the primary key of the `Route` table.", accepted: ["RouteID"], explanation: "RouteID identifies each route." }),
      P.short({ label: "(b)", marks: 1, stem: "State the foreign key in the `Bus` table.", accepted: ["RouteID"], explanation: "RouteID in Bus matches the primary key of Route." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of relationship between `Route` and `Bus`.", accepted: ["one-to-many", "one to many", "1:m", "1:many"], normalise: ["trim", "lowercase", "collapse_whitespace"], explanation: "One route, many buses." }),
      P.short({ label: "(d)", marks: 1, stem: "`Registration` is also unique for each bus but was not chosen as the primary key. Name the type of key it is.", accepted: ["secondary key", "candidate key", "a secondary key"], normalise: ["trim", "lowercase", "collapse_whitespace"], explanation: "A candidate key not chosen as the primary key is a secondary key." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain how referential integrity protects the data in these two tables.", points: ["A bus cannot be added with a RouteID that does not exist in the Route table", "A route cannot be deleted while buses are still assigned to it"], modelAnswer: "A bus cannot be added with a RouteID that is not in the Route table, and a route cannot be deleted while buses still refer to it.", explanation: "Both inserting and deleting are controlled." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Look at what is repeated in the file.", "Think about what happens when one value changes."],
    explanation: "The file repeats the doctor's name and room; a database stores them once and links by DoctorID.",
    stem: "A clinic in Masvingo keeps one file of appointments. Each row holds `AppointmentNo`, `PatientName`, `PatientPhone`, `DoctorName`, `DoctorRoom` and `Date`. A patient may have many appointments.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify two items of data that are repeated and describe the problem this causes when a patient changes phone number.", points: ["PatientName and PatientPhone (or DoctorName and DoctorRoom) are repeated in each appointment row", "Every row for that patient must be changed; if one is missed the file is inconsistent"], modelAnswer: "The patient's name and phone number are repeated in each of the patient's appointment rows. When the number changes every row must be updated, and if one is missed the file contradicts itself.", explanation: "Redundancy leads to inconsistency." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe a relational design for the clinic using three tables. Name the tables, their primary keys and the foreign keys.", points: ["A Patient table with PatientID as the primary key", "A Doctor table with DoctorID as the primary key", "An Appointment table with AppointmentNo as the primary key and PatientID and DoctorID as foreign keys"], modelAnswer: "Patient(PatientID, PatientName, PatientPhone); Doctor(DoctorID, DoctorName, DoctorRoom); Appointment(AppointmentNo, Date, PatientID, DoctorID). PatientID and DoctorID in Appointment are foreign keys.", explanation: "Each entity gets a table; Appointment holds the foreign keys." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain two benefits of the relational design over the single file.", points: ["Each patient and doctor is stored once, so there is less redundancy and storage is saved", "A change is made in one place, so the data stays consistent", "Different users can share the same data, with access rights controlled by the DBMS (or programs do not depend on the file layout)"], modelAnswer: "Each patient and doctor is stored once, so less storage is used. A phone number is changed in one place only, so the data stays consistent. Users can share the data under the DBMS's access rights.", explanation: "Less redundancy, consistency, sharing." }),
    ] });
  b.card("DEFINITION", "Relational database", "A database in which data is held in tables that are linked by matching key values.");
  b.card("DEFINITION", "Primary key", "A field (or fields) whose value is different in every record, so it identifies one record. It can never be empty.");
  b.card("DEFINITION", "Foreign key", "A field in one table that holds the primary key value of a record in another table; it links the tables.");
  b.card("DEFINITION", "Candidate key and secondary key", "Candidate key: any field that could be the primary key. Secondary key: a candidate key not chosen as the primary key.");
  b.card("CONCEPT", "Record and field", "Record (tuple) = a row, all the data about one item. Field (attribute) = a column, one kind of data.");
  b.card("FACT", "Limitations of a file-based approach", "Data redundancy, data inconsistency, program-data dependence, poor sharing, weak security and integrity.");
  b.card("CONCEPT", "Where the foreign key goes", "In a one-to-many relationship, in the table on the many side. It holds the primary key of the one side.");
  b.card("DEFINITION", "Referential integrity", "Every foreign key value must match an existing primary key value, so there are no orphan records.");
  b.card("CONCEPT", "Index", "A sorted structure on a field that makes searches faster but uses extra storage and slows updates.");
});
