// Slice w4c: relational databases, keys, relationships and ERDs (comp.db.relational-erd, ZIMSEC only).
import { concept, P } from "../lib.mjs";
import { table } from "./w4c-0-kit.mjs";

// Q: identify the foreign key (bank branches and staff).
const bank = table("Branches", [["BranchCode", "TEXT"], ["BranchTown", "TEXT"], ["Manager", "TEXT"]], [
  ["BR-HRE", "Harare", "R. Chiweshe"],
  ["BR-BYO", "Bulawayo", "T. Nkomo"],
  ["BR-MTR", "Mutare", "F. Sigauke"],
], [{ name: "Staff", columns: [["StaffNo", "INTEGER"], ["StaffName", "TEXT"], ["JobTitle", "TEXT"], ["BranchCode", "TEXT"]], rows: [
  [4031, "Nyasha Gora", "Teller", "BR-BYO"],
  [4032, "Sipho Moyo", "Clerk", "BR-HRE"],
  [4037, "Rudo Tafa", "Teller", "BR-BYO"],
  [4040, "Farai Chuma", "Loans officer", "BR-BYO"],
  [4043, "Chipo Dzino", "Teller", "BR-MTR"],
] }]);
// Q: count linked records (pharmacy suppliers and medicines).
const pharm = table("Suppliers", [["SupplierID", "TEXT"], ["SupplierName", "TEXT"], ["City", "TEXT"]], [
  ["SUP-A", "Kopje Medical", "Harare"],
  ["SUP-B", "Matopos Pharma", "Bulawayo"],
  ["SUP-C", "Eastern Health", "Mutare"],
], [{ name: "Medicines", columns: [["MedicineCode", "TEXT"], ["MedicineName", "TEXT"], ["SupplierID", "TEXT"]], rows: [
  ["M-PCM", "Paracetamol", "SUP-B"],
  ["M-AMX", "Amoxicillin", "SUP-A"],
  ["M-ORS", "Oral rehydration salts", "SUP-B"],
  ["M-IBU", "Ibuprofen", "SUP-C"],
  ["M-CTM", "Cough mixture", "SUP-B"],
  ["M-ZNC", "Zinc tablets", "SUP-A"],
] }]);
const byoMeds = pharm.value("SELECT COUNT(*) FROM Medicines JOIN Suppliers USING(SupplierID) WHERE City = 'Bulawayo'");

// Q: referential integrity (courses and enrolments).
const courseCodes = ["CS1", "CS2", "BK1", "AG3"];
const candidates = [["E-551", "CS2"], ["E-552", "AG3"], ["E-553", "BK2"], ["E-554", "BK1"]];
const rejected = candidates.filter(([, c]) => !courseCodes.includes(c));
if (rejected.length !== 1) throw new Error("ref integrity item");

// Practice struct 6 marks: netball teams and players.
const league = table("Teams", [["TeamID", "TEXT"], ["TeamName", "TEXT"], ["HomeGround", "TEXT"]], [
  ["T1", "Eagles", "Sakubva"],
  ["T2", "Herons", "Mkoba"],
  ["T3", "Kudus", "Rujeko"],
], [{ name: "Players", columns: [["PlayerID", "TEXT"], ["PlayerName", "TEXT"], ["Position", "TEXT"], ["TeamID", "TEXT"]], rows: [
  ["NP-63", "Thandeka", "Goal shooter", "T2"],
  ["NP-66", "Rudo", "Centre", "T1"],
  ["NP-69", "Nyasha", "Goal keeper", "T2"],
  ["NP-73", "Chipo", "Wing attack", "T3"],
  ["NP-78", "Tatenda", "Centre", "T2"],
  ["NP-84", "Sipho", "Goal defence", "T1"],
] }]);
const heronsCount = league.value("SELECT COUNT(*) FROM Players JOIN Teams USING(TeamID) WHERE TeamName = 'Herons'");

// Practice struct 8 marks: farmers and crops (many-to-many through Plantings).
const plantings = [["F1", "Maize"], ["F1", "Soya"], ["F2", "Maize"], ["F3", "Tobacco"], ["F3", "Maize"], ["F3", "Soya"], ["F4", "Cotton"]];
const linkRecords = plantings.length;
const maizeFarmers = plantings.filter(([, c]) => c === "Maize").length;

concept("comp.db.relational-erd", { file: "db/relational-erd", keyPrefix: "db.relational-erd" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **foreign key**?",
    options: [
      ["A field in one table that is the primary key of another table", "Correct: it links a record to a record in the other table."],
      ["A field whose value is unique for every record in its own table", "That describes a primary key."],
      ["A field that has been imported from a spreadsheet", "Importing has nothing to do with keys."],
      ["A password that protects a table from other users", "Security passwords are not keys in this sense."],
    ],
    answer: "A",
    explanation: "A foreign key holds values of another table's primary key, which creates the link (relationship) between the tables.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which description fits a **relational database**?",
    options: [
      ["Several tables linked by matching values in key fields", "Correct: tables (relations) are joined through primary and foreign keys."],
      ["A single table that holds every item of data", "That is a flat-file database."],
      ["Records arranged in a tree, each with one parent", "That is the hierarchical model."],
      ["A spreadsheet with formulas linking its cells", "A spreadsheet is not a relational database."],
    ],
    answer: "A",
    explanation: "A relational database stores each entity in its own table and links the tables with keys.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A school has many form classes. Each learner is in exactly one form class, and each form class has many learners. What is the relationship between FormClass and Learner?",
    options: [
      ["One-to-many", "Correct: one form class to many learners."],
      ["One-to-one", "A form class has many learners, not one."],
      ["Many-to-many", "Each learner is in only one form class."],
      ["Many-to-one from FormClass to Learner", "Read from FormClass, it is one class to many learners."],
    ],
    answer: "A",
    explanation: "Ask both ways: one class has many learners; one learner belongs to one class. That is one-to-many.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "In a boarding school, each boarder is given one locker and each locker is given to only one boarder. What is the relationship between Boarder and Locker?",
    options: [
      ["One-to-one", "Correct: one boarder to one locker, and one locker to one boarder."],
      ["One-to-many", "No boarder has many lockers."],
      ["Many-to-many", "Neither side has many."],
      ["There is no relationship", "Each locker is linked to a boarder."],
    ],
    answer: "A",
    explanation: "Each record on one side matches at most one record on the other, so the relationship is one-to-one.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Can one teacher teach several subjects?", "Can one subject be taught by several teachers?"],
    stem: "At a large secondary school in Bulawayo, a teacher may teach several subjects, and each subject is taught by several teachers. Which statement is correct?",
    options: [
      ["The relationship is many-to-many and needs a link table", "Correct: both sides have many, so a third table is needed."],
      ["The relationship is one-to-many, so Subject holds a TeacherID", "One subject has several teachers, so one TeacherID is not enough."],
      ["The relationship is one-to-one, so the tables can be merged", "Neither side is limited to one."],
      ["The relationship is many-to-many, so Teacher holds a SubjectID", "One SubjectID field cannot hold several subjects."],
    ],
    answer: "A",
    explanation: "Many-to-many relationships are resolved with a link table (for example TeacherSubject) that holds TeacherID and SubjectID, giving two one-to-many relationships.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each pair of entities to the type of relationship between them.",
    pairs: [
      "Country and its capital city",
      "Bus route and the passengers who buy tickets for it (each ticket is for one route)",
      "Customers and the products they buy (a product is bought by many customers)",
      "Mother and her children (each child record stores one mother)",
      "Authors and books (a book can have several authors)",
    ],
    right: ["One-to-one", "One-to-many", "Many-to-many"],
    rightIndex: [0, 1, 2, 1, 2],
    explanation: "One capital per country and one country per capital: 1:1. One route, many tickets: 1:M. One mother, many children: 1:M. Customers and products, and authors and books: many on both sides, M:M.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which field appears in both tables?", "In which table is it the primary key?"],
    stem: `A bank stores these two tables.\n\n${bank.md}\n\n${bank.mdOf("Staff")}\n\nWhich field is a foreign key, and in which table?`,
    options: [
      ["BranchCode in the Staff table", "Correct: it is the primary key of Branches, stored in Staff to link each worker to a branch."],
      ["BranchCode in the Branches table", "In Branches, BranchCode is the primary key."],
      ["StaffNo in the Staff table", "StaffNo is the primary key of Staff."],
      ["JobTitle in the Staff table", "JobTitle repeats but does not link to another table."],
    ],
    answer: "A",
    explanation: "BranchCode is the primary key of Branches; the same field in Staff links each worker to one branch, so there it is a foreign key.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Find the SupplierID of the Bulawayo supplier first."],
    stem: `A pharmacy stores two linked tables. How many medicines come from the supplier based in Bulawayo?\n\n${pharm.md}\n\n${pharm.mdOf("Medicines")}`,
    value: byoMeds,
    wrong: [1],
    explanation: `The Bulawayo supplier is SUP-B, which appears as the foreign key in ${byoMeds} Medicines records.`,
    workedSolution: `1. In Suppliers, the Bulawayo supplier has SupplierID SUP-B.\n2. Count the Medicines records with SupplierID SUP-B: ${byoMeds}.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Every value in a foreign key field must be different from all the other values in that field.",
    answer: false,
    explanation: "False. A foreign key may repeat: many patients can share the same DoctorID. It is the primary key that must be unique.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A many-to-many relationship can be stored directly between two tables without any other table.",
    answer: false,
    explanation: "False. A relational database resolves it with a link table, giving two one-to-many relationships.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["A foreign key value must already exist as a primary key value in the other table."],
    stem: `A college's \`Courses\` table holds the course codes ${courseCodes.join(", ")}. Referential integrity is enforced between \`Courses\` and \`Enrolments\`. Which new enrolment record would be **rejected**?`,
    options: candidates.map(([e, c]) => [`EnrolmentID ${e}, CourseCode ${c}`, courseCodes.includes(c) ? `${c} exists in Courses, so the record is accepted.` : `Correct: ${c} is not a course code in Courses.`]),
    answer: String.fromCharCode(65 + candidates.findIndex(([, c]) => !courseCodes.includes(c))),
    explanation: `Referential integrity refuses a foreign key value with no matching primary key: ${rejected[0][1]} is not in Courses.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an entity-relationship diagram drawn in crow's foot notation, the line between Supplier and Product ends in three short prongs at the Product end and a plain end at the Supplier end. What does this show?",
    options: [
      ["One supplier supplies many products", "Correct: the crow's foot marks the 'many' end."],
      ["One product is supplied by many suppliers", "The prongs are at the Product end, so Product is the 'many' side."],
      ["Each supplier supplies exactly three products", "The three prongs mean 'many', not the number three."],
      ["Supplier and Product are not related", "A line between two entities shows a relationship."],
    ],
    answer: "A",
    explanation: "A plain end means one and a crow's foot means many, so one supplier is linked to many products.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each database model to its description.",
    pairs: [
      ["Flat-file", "All the data is held in a single table, so values are often repeated"],
      ["Hierarchical", "Records form a tree in which each child record has exactly one parent"],
      ["Network", "Records are linked as a graph, so a record can have several parents"],
      ["Relational", "Data is held in separate tables linked by primary and foreign keys"],
    ],
    explanation: "Flat-file: one table. Hierarchical: a tree. Network: a graph of links. Relational: linked tables.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A teacher sends a class list from the school database to a spreadsheet as a comma-separated values (CSV) file. What is this process called?",
    options: [
      ["Exporting", "Correct: data is sent out of the database in another format."],
      ["Importing", "Importing brings data into the database."],
      ["Normalising", "Normalising splits data into linked tables."],
      ["Validating", "Validation checks data as it is entered."],
    ],
    answer: "A",
    explanation: "Exporting sends data out (here as CSV); importing brings data in from a file such as a spreadsheet or CSV.",
  });
  b.short({
    d: 3, skill: "RECALL",
    hints: ["The key is made from more than one field."],
    stem: "A link table `Memberships` has the fields `LearnerID` and `ClubID`. Neither field is unique on its own, but each pair of values is. What name is given to a primary key made from two or more fields?",
    accepted: ["composite key", "composite primary key", "compound key", "composite"],
    wrong: ["foreign key"],
    explanation: "A primary key made from more than one field is a composite (compound) key.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about data repeated in many rows."],
    stem: "A shop keeps customers and their orders in one flat-file table, so a customer's address is typed into every order. Explain two advantages of using two related tables instead.",
    points: [
      "Less data redundancy: each customer's details are stored only once, saving storage / typing",
      "Fewer inconsistencies: a change of address is made in one record, so the data stays consistent (improved data integrity)",
    ],
    explanation: "Relational design stores each fact once.",
    modelAnswer: "The address would be stored once in a Customers table instead of in every order, which saves space and typing. When a customer moves, only one record is changed, so different orders cannot show different addresses.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Each driver drives many trips; each bus is used for many trips.", "Which table holds the foreign keys?"],
    stem: "A bus company in Masvingo stores `Driver`, `Bus` and `Trip` entities. Each trip uses one bus and one driver; a driver makes many trips and a bus is used for many trips. Describe the entity-relationship diagram for this system.",
    points: [
      "Three rectangles labelled Driver, Bus and Trip",
      "A line from Driver to Trip: one at the Driver end, many (crow's foot) at the Trip end",
      "A line from Bus to Trip: one at the Bus end, many (crow's foot) at the Trip end",
      "Trip holds DriverID and BusID as foreign keys (it resolves the many-to-many between drivers and buses)",
    ],
    explanation: "Two one-to-many relationships meet at Trip.",
    modelAnswer: "There are three entities, Driver, Bus and Trip, drawn as rectangles. Driver is joined to Trip by a line that is plain at Driver and has a crow's foot at Trip, because one driver makes many trips. Bus is joined to Trip in the same way, because one bus is used for many trips. Trip stores DriverID and BusID as foreign keys, so it acts as the link between drivers and buses.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["The primary key of Teams appears again in Players.", "Count the Players records whose TeamID is the Herons' TeamID."],
    stem: `A netball league in Mutare stores two tables.\n\n${league.md}\n\n${league.mdOf("Players")}`,
    parts: [
      P.short({ label: "(a)", stem: "Identify the primary key of the Teams table.", accepted: ["TeamID", "Team ID"], wrong: ["TeamName"], explanation: "TeamID is unique for every team." }),
      P.short({ label: "(b)", stem: "Identify the foreign key in the Players table.", accepted: ["TeamID", "Team ID"], wrong: ["PlayerID"], explanation: "TeamID in Players holds the primary key of Teams." }),
      P.mcq({
        label: "(c)", stem: "State the relationship between Teams and Players.",
        options: [["One-to-many", "Correct: one team has many players; each player record holds one TeamID."], ["One-to-one", "Herons has several players."], ["Many-to-many", "Each player is in one team only."], ["Many-to-one from Teams to Players", "Read from Teams, one team links to many players."]],
        answer: "A", explanation: "One team, many players: one-to-many.",
      }),
      P.num({ label: "(d)", stem: "State how many players play for the Herons.", value: heronsCount, wrong: [heronsCount - 1], explanation: `The Herons are T2, and T2 appears ${heronsCount} times in Players.`, workedSolution: `1. Look up Herons in Teams: TeamID T2.\n2. Count T2 in Players: ${heronsCount}.` }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why TeamID, and not TeamName and HomeGround, is stored in the Players table.",
        points: ["The team's details are stored once, in Teams, so they are not repeated for every player (less redundancy)", "If a team's home ground changes, only one record changes, so the data stays consistent / the ID is enough to look up the details"],
        modelAnswer: "Storing only TeamID means the team name and ground are held once in Teams. If the Herons move ground, one record is updated and every player still links to the correct details.",
      }),
    ],
    explanation: `(a) TeamID. (b) TeamID. (c) One-to-many. (d) ${heronsCount}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["One farmer grows many crops; one crop is grown by many farmers.", "One record in the link table per farmer-crop pair."],
    stem: `An agricultural extension office in Gweru stores \`Farmers\` (FarmerID, FarmerName, Ward) and \`Crops\` (CropID, CropName, GrowingDays). This season, F1 grows maize and soya; F2 grows maize; F3 grows tobacco, maize and soya; F4 grows cotton.`,
    parts: [
      P.mcq({
        label: "(a)", stem: "State the relationship between Farmers and Crops.",
        options: [["Many-to-many", "Correct: farmers grow several crops and crops are grown by several farmers."], ["One-to-many", "Maize is grown by three farmers, so a crop is not limited to one farmer."], ["One-to-one", "F3 grows three crops."], ["Many-to-one", "Both sides can have many."]],
        answer: "A", explanation: "Many on both sides: many-to-many.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why this relationship cannot be stored by adding a CropID field to the Farmers table.",
        points: ["A single CropID field holds only one crop, but a farmer grows several crops", "Repeating the farmer's record for each crop (or adding CropID1, CropID2, …) would duplicate data / limit the number of crops / cause inconsistency"],
        modelAnswer: "One CropID field can store one crop only, yet F3 grows three. Repeating the farmer's record for each crop would duplicate the farmer's details, and adding several crop fields would set a limit and leave many fields empty.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe a link table that resolves this relationship, naming its fields.",
        points: ["A third table, e.g. Plantings, with one record for each farmer-crop pair", "Fields FarmerID and CropID, each a foreign key (to Farmers and Crops), with (FarmerID, CropID) as the composite primary key"],
        modelAnswer: "A Plantings table with fields FarmerID and CropID. Each record pairs one farmer with one crop; FarmerID links to Farmers, CropID links to Crops, and the two fields together form the primary key.",
      }),
      P.num({ label: "(d)", stem: "State how many records the link table holds for this season.", value: linkRecords, wrong: [4], explanation: `One record per farmer-crop pair: ${plantings.map(([f, c]) => `${f}-${c}`).join(", ")}: ${linkRecords} records.`, workedSolution: `1. F1: 2, F2: 1, F3: 3, F4: 1.\n2. Total ${linkRecords}.` }),
      P.num({ label: "(e)", stem: "State how many records in the link table refer to maize.", value: maizeFarmers, wrong: [1], explanation: `F1, F2 and F3 grow maize: ${maizeFarmers} records.`, workedSolution: `1. Look for Maize in each pair: ${plantings.filter(([, c]) => c === "Maize").map(([f]) => f).join(", ")}.
2. ${maizeFarmers} records.` }),
      P.mcq({
        label: "(f)", stem: "Referential integrity is enforced. Which change would the database refuse?",
        options: [["Adding a link record with a FarmerID that is not in Farmers", "Correct: a foreign key value must exist as a primary key."], ["Adding a new crop to Crops that no farmer grows yet", "A crop does not need any link records."], ["Adding a second crop for farmer F2", "This is a new, valid pair."], ["Changing the Ward of farmer F4", "Ward is not a key."]],
        answer: "A", explanation: "Every foreign key value must match an existing primary key value.",
      }),
    ],
    explanation: `(a) Many-to-many. (d) ${linkRecords} records. (e) ${maizeFarmers}.`,
  });

  b.card("DEFINITION", "Foreign key", "A field in one table that is the primary key of another table, used to link related records.");
  b.card("DEFINITION", "Relational database", "A database of two or more tables linked by matching values in primary and foreign key fields.");
  b.card("CONCEPT", "One-to-many relationship", "One record in table A links to many in table B; each B record links to one A record. The foreign key goes in B (the many side).");
  b.card("CONCEPT", "Resolving a many-to-many relationship", "Add a link (junction) table holding the primary keys of both tables as foreign keys; it creates two one-to-many relationships.");
  b.card("DEFINITION", "Composite key", "A primary key made of two or more fields whose combined values are unique, e.g. (LearnerID, ClubID) in a link table.");
  b.card("DEFINITION", "Referential integrity", "Every foreign key value must match an existing primary key value in the linked table.");
  b.card("FACT", "Crow's foot notation in an ERD", "Entities are rectangles joined by lines; a plain end means one, a three-pronged (crow's foot) end means many.");
  b.card("CONCEPT", "Database models", "Flat-file: one table. Hierarchical: tree, one parent each. Network: graph, several parents. Relational: tables linked by keys.");
  b.card("DEFINITION", "Importing and exporting data", "Importing brings data into a database from another source (e.g. CSV or spreadsheet); exporting sends data out in such a format.");
});
