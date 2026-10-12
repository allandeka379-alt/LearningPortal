// Slice w3b: Normalisation to 3NF (acs.db.normalisation, both boards; ZIMSEC stops at 2NF).
import { concept, P, chk, same, CAM, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

// Does det -> dep hold in the rows? (each determinant value maps to one dependent value)
function fd(cols, rows, det, dep) {
  const di = det.map((c) => cols.indexOf(c));
  const pi = dep.map((c) => cols.indexOf(c));
  const seen = new Map();
  for (const r of rows) {
    const k = JSON.stringify(di.map((i) => r[i]));
    const v = JSON.stringify(pi.map((i) => r[i]));
    if (seen.has(k) && seen.get(k) !== v) return false;
    seen.set(k, v);
  }
  return true;
}

// Table A: enrolments (partial dependencies)
const aCols = ["StudentID", "CourseCode", "StudentName", "CourseTitle", "Grade"];
const aRows = [
  ["S31", "CS1", "Tatenda Moyo", "Programming", "B"],
  ["S31", "MA1", "Tatenda Moyo", "Statistics", "A"],
  ["S32", "CS1", "Nyasha Dube", "Programming", "C"],
  ["S33", "MA1", "Sipho Ncube", "Statistics", "B"],
  ["S33", "CS1", "Sipho Ncube", "Programming", "A"],
  ["S33", "EN1", "Sipho Ncube", "Communication", "B"],
];
same(fd(aCols, aRows, ["StudentID"], ["StudentName"]), true);
same(fd(aCols, aRows, ["CourseCode"], ["CourseTitle"]), true);
same(fd(aCols, aRows, ["StudentID", "CourseCode"], ["Grade"]), true);
same(fd(aCols, aRows, ["StudentID"], ["Grade"]), false);
same(fd(aCols, aRows, ["CourseCode"], ["Grade"]), false);
const aTable = mdTable(aCols, aRows);

// Table B: timetable (transitive dependencies, no partial dependency)
const bCols = ["ClassCode", "Period", "TeacherID", "TeacherName", "Room", "RoomSeats"];
const bRows = [
  ["4A", 1, "T05", "Mrs Chuma", "R2", 40],
  ["4A", 2, "T07", "Mr Gumbo", "R5", 32],
  ["4B", 1, "T07", "Mr Gumbo", "R5", 32],
  ["4B", 2, "T05", "Mrs Chuma", "R2", 40],
  ["4C", 1, "T09", "Ms Banda", "R2", 40],
  ["4C", 2, "T09", "Ms Banda", "R8", 25],
];
same(fd(bCols, bRows, ["ClassCode", "Period"], ["TeacherID", "Room"]), true);
same(fd(bCols, bRows, ["TeacherID"], ["TeacherName"]), true);
same(fd(bCols, bRows, ["Room"], ["RoomSeats"]), true);
same(fd(bCols, bRows, ["ClassCode"], ["TeacherID"]), false);
same(fd(bCols, bRows, ["Period"], ["Room"]), false);
const bTable = mdTable(bCols, bRows);

// counts for numerical items
const clinicRows = 40;
const doctors = 8;
chk(clinicRows - doctors, 32);
const t3 = 6 * 2; // 6 rows, 2 repeated items
const t3after = 3 * 2;
chk(t3 - t3after, 6);
const bTeachers = new Set(bRows.map((r) => r[2])).size;
const bRooms = new Set(bRows.map((r) => r[4])).size;
const savedTimetable = bRows.length * 2 - bTeachers - bRooms;
chk(savedTimetable, 6);
const fields = 8;
chk(clinicRows * fields, 320);

concept("acs.db.normalisation", { file: "db/normalisation", keyPrefix: "db.normalisation" }, (b) => {
  mc(b, 2, "RECALL", "What is the main purpose of normalising a database?",
    ["To remove redundancy and avoid update anomalies", "Correct."],
    [["To make the data harder for users to read and understand", "Normalisation does not hide data."], ["To compress the data so that it takes fewer bytes", "Normalisation is not compression."], ["To encrypt the data so that others cannot read it", "Encryption is a security measure."]],
    "Normalisation reorganises the tables so that each fact is stored once.", { daily: true });
  mc(b, 2, "RECALL", "Which condition is required for a table to be in first normal form?",
    ["Every cell holds one value; there are no repeating groups", "Correct: the values are atomic."],
    [["Every non-key attribute depends on the whole of the key", "That is the requirement for second normal form."], ["No non-key attribute depends on another non-key attribute", "That is the requirement for third normal form."], ["Every table has at least two foreign keys", "Foreign keys are not part of the definition of 1NF."]],
    "1NF: atomic values, no repeating groups and a primary key.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A table is in 1NF and its primary key is a single field. Which normal form is it certainly in as well?",
    ["Second normal form", "Correct: partial dependency needs a composite key."],
    [["Third normal form", "A single-field key does not rule out a transitive dependency."], ["Boyce-Codd normal form only", "This is not asked and is not guaranteed."], ["No further normal form is certain", "A table in 1NF with a single-field key is in 2NF."]],
    "Without a composite key there can be no partial dependency, so the table is in 2NF.", { hints: ["What must a table have for a partial dependency to exist?"] });
  mc(b, 3, "APPLICATION", "In the table `Order(OrderNo, CustomerID, CustomerName)` the primary key is `OrderNo` and `CustomerID` determines `CustomerName`. Which problem does this table have?",
    ["A transitive dependency, so it is not in 3NF", "Correct: CustomerName depends on a non-key attribute."],
    [["A partial dependency, so it is not in 2NF", "The key is a single field, so there is no partial dependency."], ["A repeating group, so it is not in 1NF", "Each cell holds one value."], ["No problem, because the table has a primary key", "A primary key is not enough for 3NF."]],
    "CustomerName depends on CustomerID, which is not the key: a transitive dependency.", { hints: ["Does CustomerName depend on the key directly or through another attribute?"] });
  mc(b, 3, "APPLICATION", "A table of clubs and members has the key (`ClubID`, `MemberID`) and the attribute `ClubName`, which depends only on `ClubID`. What is this called?",
    ["A partial dependency", "Correct: the attribute depends on part of the key."],
    [["A transitive dependency", "The attribute depends on part of the key, not on a non-key attribute."], ["A foreign key", "A foreign key links two tables."], ["A repeating group", "Nothing is repeated within a cell."]],
    "ClubName depends only on ClubID, which is part of the composite key.", { hints: ["Does ClubName depend on the whole key or only on part of it?"] });
  mc(b, 3, "ANALYSIS", "A school table holds `Pupil`, `Form` and `FormTeacher`. A new form cannot be recorded until a pupil joins it. What type of anomaly is this?",
    ["Insertion anomaly", "Correct: one fact cannot be stored without another."],
    [["Update anomaly", "An update anomaly arises when a repeated fact is changed in only some rows."], ["Deletion anomaly", "A deletion anomaly loses a fact when a row is deleted."], ["Referential anomaly", "This is not one of the three standard anomalies."]],
    "Recording a form needs a pupil in it, which is an insertion anomaly.", { hints: ["Which action is being blocked?"] });
  mc(b, 3, "ANALYSIS", "The table `Bus(BusNo, DriverID, DriverName, DriverPhone)` has the primary key `BusNo`. Which sentence describes the best normalisation?",
    ["Create a `Driver` table keyed on `DriverID`", "Correct: this removes the transitive dependency."],
    [["Move `BusNo` to a new table and drop DriverID from Bus", "The key is already correct."], ["Copy `DriverName` and `DriverPhone` into every table", "That adds redundancy."], ["Make `DriverName` the primary key of the `Bus` table", "Names are not unique."]],
    "The driver details depend on DriverID, so they move to their own table with DriverID as the key and a foreign key left behind.", { hints: ["Which attribute determines the driver's name and phone number?"] });
  mc(b, 4, "ANALYSIS", "Which statement about a correct normalisation is true?",
    ["The original rows can be rebuilt by joining on foreign keys", "Correct: no information is lost."],
    [["Each table gets a copy of every field in the original table", "That would keep all the redundancy."], ["Foreign keys are removed once the tables are separated", "Without foreign keys the tables cannot be joined."], ["The number of records in every table stays the same", "Normalised tables usually have different numbers of rows."]],
    "Foreign keys keep the link between the tables, so the original rows can be rebuilt.", { hints: ["What keeps the tables linked after the split?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A partial dependency can occur in a table whose primary key is a single field.", answer: false, explanation: "False. A partial dependency means dependence on part of a composite key, so the key must have at least two fields." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A table in third normal form must also be in second normal form.", answer: true, explanation: "True. Each normal form includes the earlier ones." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Look at what determines Grade."],
    stem: "In the Enrolment table (key `StudentID` with `CourseCode`), `Grade` depends on the whole key, so it can stay in the Enrolment table when the table is normalised.", answer: true, explanation: "True. A grade belongs to one student on one course, so it depends on both parts of the key." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each normal form to the problem that it removes.",
    pairs: [["First normal form (1NF)", "Repeating groups and cells with several values"], ["Second normal form (2NF)", "Dependence on part of a composite key"], ["Third normal form (3NF)", "Dependence of one non-key attribute on another"]],
    extraRight: ["Dependence of the foreign key on the primary key"],
    explanation: "1NF removes repeating groups, 2NF partial dependencies and 3NF transitive dependencies." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of the three anomalies.",
    template: "An {{blank:a}} anomaly means a fact cannot be stored until another fact exists. A {{blank:b}} anomaly means deleting a row also loses a fact. An {{blank:c}} anomaly means a repeated fact is changed in only some rows.",
    blanks: [
      { id: "a", accepted: ["insertion"], choices: ["insertion", "deletion", "update"] },
      { id: "b", accepted: ["deletion"], choices: ["insertion", "deletion", "update"] },
      { id: "c", accepted: ["update"], choices: ["insertion", "deletion", "update"] },
    ], explanation: "Insertion, deletion and update anomalies." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Which attributes depend on one field of the composite key only?"],
    stem: `The table \`Enrolment(StudentID, CourseCode, StudentName, CourseTitle, Grade)\` has the composite key (StudentID, CourseCode). Name the one attribute that depends on both fields of the key.`,
    accepted: ["Grade"], explanation: "StudentName depends on StudentID alone, CourseTitle on CourseCode alone, and Grade on both." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Before: one name in each row. After: one name for each doctor."],
    stem: `A clinic file has ${clinicRows} appointment rows, and each row stores the doctor's name. There are ${doctors} doctors. After normalisation the names are stored once in a \`Doctor\` table. How many fewer doctor names are stored?`,
    value: clinicRows - doctors, wrong: [doctors, clinicRows], workedSolution: `1. Before: ${clinicRows} names.\n2. After: ${doctors} names.\n3. Fewer = ${clinicRows} − ${doctors} = ${clinicRows - doctors}.`, explanation: `${clinicRows} − ${doctors} = ${clinicRows - doctors}.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the values in the two repeated columns for all rows, before and after."],
    stem: `In the timetable table below, every row stores \`TeacherName\` and \`RoomSeats\`. After moving them to separate tables keyed on \`TeacherID\` and \`Room\`, each teacher and each room is stored once.\n\n${bTable}\n\nHow many fewer \`TeacherName\` and \`RoomSeats\` values are stored altogether?`,
    value: savedTimetable,
    wrong: [12, 7], workedSolution: "1. Before: 6 rows × 2 values = 12.\n2. After: 3 teacher names + 3 room sizes = 6.\n3. Fewer = 12 − 6 = 6.", explanation: "Six rows store two values each: 12 values. After the split, 3 teachers and 3 rooms give 6 values. The difference is 6." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Name each anomaly and give an example."],
    stem: "A shop stores customer details in every one of its order rows. Describe three problems that this can cause. [3]",
    points: ["Update anomaly: a change of address must be made in every row of that customer, and if one is missed the data is inconsistent", "Insertion anomaly: a new customer cannot be stored until they place an order", "Deletion anomaly: deleting a customer's only order also deletes the customer's details"],
    modelAnswer: "A change of address must be made in every row of that customer, or the data becomes inconsistent. A new customer cannot be stored until they place an order. Deleting the only order of a customer also deletes the customer's details.",
    explanation: "The three anomalies, each with an example." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["State what each normal form removes."],
    stem: "Describe the differences between first, second and third normal form. [3]",
    points: ["1NF: every cell holds one value and there are no repeating groups", "2NF: in 1NF and every non-key attribute depends on the whole of the key (no partial dependency)", "3NF: in 2NF and no non-key attribute depends on another non-key attribute (no transitive dependency)"],
    modelAnswer: "1NF means every cell holds one value with no repeating groups. 2NF means 1NF with no partial dependency on part of a composite key. 3NF means 2NF with no non-key attribute depending on another non-key attribute.",
    explanation: "Each form builds on the one before." });
  b.manualShort({ d: 4, skill: "APPLICATION", marks: 4, hints: ["Which attributes depend on StudentID only, and which on CourseCode only?"],
    stem: `The table \`Enrolment(StudentID, CourseCode, StudentName, CourseTitle, Grade)\` has the composite key (StudentID, CourseCode). Write the tables that put it into second normal form. Mark the primary key of each. [4]`,
    points: ["Student(StudentID, StudentName) with StudentID as the primary key", "Course(CourseCode, CourseTitle) with CourseCode as the primary key", "Enrolment(StudentID, CourseCode, Grade) with the composite primary key", "StudentID and CourseCode in Enrolment identified as foreign keys"],
    modelAnswer: "Student(StudentID, StudentName); Course(CourseCode, CourseTitle); Enrolment(StudentID, CourseCode, Grade) with the primary key (StudentID, CourseCode), where StudentID and CourseCode are also foreign keys.",
    explanation: "Each partially dependent attribute moves with its determinant." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Look at which field determines each attribute.", "A partial dependency is on part of the composite key."],
    explanation: "StudentName depends on StudentID and CourseTitle on CourseCode, so both are partial dependencies; the table is in 1NF but not 2NF.",
    stem: `A college stores the following table. The primary key is the composite (\`StudentID\`, \`CourseCode\`).\n\n${aTable}`,
    parts: [
      P.mcq({ label: "(a)", marks: 2, multiple: true, stem: "Select the two attributes that depend on only part of the primary key.", options: [["StudentName", "Correct: depends on StudentID alone."], ["CourseTitle", "Correct: depends on CourseCode alone."], ["Grade", "Grade depends on both fields: a student's grade on one course."], ["CourseCode", "CourseCode is part of the key."], ["StudentID", "StudentID is part of the key."]], answer: ["A", "B"], explanation: "StudentName and CourseTitle are partially dependent." }),
      P.short({ label: "(b)", marks: 1, stem: "State the highest normal form that the table is in. Give your answer as 1NF, 2NF or 3NF.", accepted: ["1NF", "first normal form", "1"], explanation: "It is in 1NF but has partial dependencies, so it is not in 2NF." }),
      P.manual({ label: "(c)", marks: 3, stem: "Write the tables that put the data into second normal form, marking the primary keys.", points: ["Student(StudentID, StudentName) with StudentID as the primary key", "Course(CourseCode, CourseTitle) with CourseCode as the primary key", "Enrolment(StudentID, CourseCode, Grade) with the composite primary key"], modelAnswer: "Student(StudentID, StudentName); Course(CourseCode, CourseTitle); Enrolment(StudentID, CourseCode, Grade).", explanation: "Remove the partial dependencies." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: CAM, hints: ["Test each non-key attribute: does it depend on the whole key, or on another non-key attribute?", "Room determines RoomSeats."],
    explanation: "The key is (ClassCode, Period). TeacherName depends on TeacherID and RoomSeats on Room, which are non-key attributes: transitive dependencies; the table is in 2NF but not 3NF.",
    stem: `A school timetable table has the composite primary key (\`ClassCode\`, \`Period\`). A teacher has one ID and one name, and each room has a fixed number of seats.\n\n${bTable}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the highest normal form that the table is in. Give your answer as 1NF, 2NF or 3NF.", accepted: ["2NF", "second normal form", "2"], explanation: "Every non-key attribute depends on the whole key, so there is no partial dependency, but there are transitive dependencies." }),
      P.mcq({ label: "(b)", marks: 2, multiple: true, stem: "Select the two attributes that depend on a non-key attribute.", options: [["TeacherName", "Correct: depends on TeacherID."], ["RoomSeats", "Correct: depends on Room."], ["Room", "The room used depends on the class and period."], ["Period", "Period is part of the key."], ["ClassCode", "ClassCode is part of the key."]], answer: ["A", "B"], explanation: "TeacherName depends on TeacherID and RoomSeats on Room." }),
      P.manual({ label: "(c)", marks: 3, stem: "Write the tables that put the data into third normal form. Mark the primary keys and foreign keys.", points: ["Timetable(ClassCode, Period, TeacherID, Room) with the composite primary key", "Teacher(TeacherID, TeacherName) with TeacherID as the primary key", "Room(Room, RoomSeats) with Room as the primary key, and TeacherID and Room in Timetable identified as foreign keys"], modelAnswer: "Timetable(ClassCode, Period, TeacherID, Room); Teacher(TeacherID, TeacherName); Room(Room, RoomSeats). TeacherID and Room in Timetable are foreign keys.", explanation: "Move each transitively dependent attribute to a table keyed on its determinant." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give one anomaly that the original table allows and describe how the new design avoids it.", points: ["For example a deletion anomaly: deleting the only timetable row that uses room R8 also deletes the fact that R8 has 25 seats (or an update anomaly: changing the number of seats of R2 must be done in several rows)", "In the new design the room and its seats are stored once in the Room table, so deleting a timetable row does not lose them"], modelAnswer: "Deleting the only row that uses room R8 would also delete the fact that R8 has 25 seats. In the new design the room is stored once in the Room table, so it is kept.", explanation: "Anomaly and the way the new design removes it." }),
    ] });
  b.card("DEFINITION", "Normalisation", "Organising data into tables to remove redundancy and update, insertion and deletion anomalies.");
  b.card("DEFINITION", "First normal form (1NF)", "Every cell holds one value, there are no repeating groups, and there is a primary key.");
  b.card("DEFINITION", "Second normal form (2NF)", "In 1NF and no partial dependency: every non-key attribute depends on the whole of the primary key.");
  b.card("DEFINITION", "Third normal form (3NF)", "In 2NF and no transitive dependency: no non-key attribute depends on another non-key attribute.");
  b.card("DEFINITION", "Functional dependency", "A → B means each value of A is linked to exactly one value of B.");
  b.card("CONCEPT", "Update anomaly", "A repeated fact is changed in some rows only, so the data is inconsistent.");
  b.card("CONCEPT", "Insertion and deletion anomalies", "Insertion: a fact cannot be stored without another. Deletion: deleting a row also loses a fact you wanted.");
  b.card("CONCEPT", "Key, whole key, nothing but the key", "A way to remember 3NF: every non-key attribute depends on the key, the whole key and nothing but the key.");
  b.card("FACT", "Boards and normal forms", "Cambridge: normalise to 3NF. ZIMSEC: normalise to 2NF.");
});
