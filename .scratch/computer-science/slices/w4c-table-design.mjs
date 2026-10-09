// Slice w4c: designing a single database table (comp.db.table-design).
import { concept, P, ZIM } from "../lib.mjs";
import { table } from "./w4c-0-kit.mjs";

const uniqueCols = (t) =>
  t.columns.map((c) => c[0]).filter((_, i) => new Set(t.rows.map((r) => r[i])).size === t.rows.length);

// Q: best primary key (vehicle service records, Gweru garage).
const vehicles = table("Vehicles", [["RegNumber", "TEXT"], ["Make", "TEXT"], ["Colour", "TEXT"], ["OwnerSurname", "TEXT"], ["YearMade", "INTEGER"]], [
  ["AFK 3381", "Toyota", "White", "Moyo", 2016],
  ["ADW 7064", "Nissan", "Silver", "Chikwanha", 2019],
  ["AEH 5590", "Toyota", "Blue", "Moyo", 2016],
  ["AGB 1478", "Mazda", "White", "Ndlovu", 2021],
]);
const vehKeys = uniqueCols(vehicles);
if (vehKeys.length !== 1 || vehKeys[0] !== "RegNumber") throw new Error(`vehicle keys ${vehKeys}`);

// Q: count fields (clinic patients).
const patients = table("Patients", [["PatientNo", "TEXT"], ["FirstName", "TEXT"], ["Surname", "TEXT"], ["DateOfBirth", "TEXT"], ["Ward", "TEXT"], ["Insured", "INTEGER", { bool: true }]], [
  ["P-806", "Rudo", "Mhlanga", "17/06/2009", "East", true],
  ["P-811", "Sipho", "Dube", "02/11/1987", "West", false],
  ["P-823", "Chipo", "Banda", "28/02/1964", "East", true],
]);
const patientFields = patients.columns.length;

// Q: fields and records (choir members).
const choir = table("Members", [["MemberID", "INTEGER"], ["Name", "TEXT"], ["Voice", "TEXT"], ["Form", "INTEGER"]], [
  [61, "Tendai", "Tenor", 3],
  [62, "Nyasha", "Alto", 2],
  [64, "Thandeka", "Soprano", 4],
  [67, "Tatenda", "Bass", 3],
  [68, "Chipo", "Alto", 1],
]);

// Practice struct (8 marks): bicycle hire.
const bikes = table("Bikes", [["BikeID", "TEXT"], ["Type", "TEXT"], ["FrameSize", "TEXT"], ["DailyRate", "REAL"], ["Gears", "INTEGER"], ["Available", "INTEGER", { bool: true }]], [
  ["VF-07", "Mountain", "M", 8.5, 21, true],
  ["VF-08", "Road", "L", 9.75, 18, false],
  ["VF-15", "Mountain", "S", 8.5, 21, true],
  ["VF-22", "Child", "S", 3.25, 6, true],
  ["VF-23", "Road", "M", 9.75, 18, true],
  ["VF-36", "Mountain", "L", 8.5, 24, false],
  ["VF-41", "Child", "M", 3.25, 6, false],
]);
const bikeKeys = uniqueCols(bikes);
if (bikeKeys.length !== 1 || bikeKeys[0] !== "BikeID") throw new Error(`bike keys ${bikeKeys}`);

// Practice struct (6 marks): clinic appointments, described in words.
const apptFields = ["AppointmentID", "PatientName", "AppointmentDate", "AppointmentTime", "Doctor", "FollowUp", "Fee"];

concept("comp.db.table-design", { file: "db/table-design", keyPrefix: "db.table-design" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a database table, what is a **field**?",
    options: [
      ["One item of data stored about every record, shown as a column", "Correct: a field is a column, such as Surname or Price."],
      ["All the data stored about one item, shown as a row", "That describes a record."],
      ["A collection of records about one type of thing", "That describes a table."],
      ["A value that is unique for every row and identifies each record in the table", "That describes a primary key, which is one special field."],
    ],
    answer: "A",
    explanation: "A field holds one item of data (one attribute) for every record; it is a column of the table and has a name and a data type.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a database table of learners, what is one **record**?",
    options: [
      ["All the data stored about one learner", "Correct: a record is one row, about one learner."],
      ["The surnames of all the learners", "That is the values of one field (a column)."],
      ["The names of the columns of the table", "The field names are headings, not a record."],
      ["The field that identifies each learner", "That is the primary key."],
    ],
    answer: "A",
    explanation: "A record is a row: every field's value for one item (here, one learner).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A table stores the mobile telephone number of each parent, for example 0712 345 678. Which data type is most suitable for this field?",
    options: [
      ["Text", "Correct: it keeps the leading zero and the spaces, and no arithmetic is done on it."],
      ["Integer", "An integer would lose the leading zero and cannot hold spaces."],
      ["Real", "It is not a measurement with a fractional part."],
      ["Boolean", "A Boolean holds only TRUE or FALSE."],
    ],
    answer: "A",
    explanation: "Telephone numbers are made of digits but are never used in calculations; text keeps the leading 0, spaces and any + sign.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A canteen table stores the price of each meal in dollars and cents. Which data type is most suitable for the price field?",
    options: [
      ["Real", "Correct: a price can have a fractional part (the cents)."],
      ["Integer", "An integer cannot hold the cents."],
      ["Character", "A character field holds a single character."],
      ["Date/time", "A price is not a date or a time."],
    ],
    answer: "A",
    explanation: "Money with cents needs a fractional part, so real (in a database package, a currency type also works).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A school table records whether each learner is a boarder or a day scholar. Which data type is most suitable?",
    options: [
      ["Boolean", "Correct: there are exactly two possible values."],
      ["Character", "A single letter could work, but two-valued data is exactly what Boolean is for."],
      ["Integer", "There is nothing to count or calculate."],
      ["Text", "Free text allows inconsistent entries such as 'board', 'B' and 'yes'."],
    ],
    answer: "A",
    explanation: "A field with only two values (boarder TRUE or FALSE) is Boolean, which also makes searching for boarders simple.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Look for the field whose values never repeat.", "Could a future record share that value?"],
    stem: `A garage in Gweru keeps this table of vehicles it services.\n\n${vehicles.md}\n\nWhich field is the most suitable primary key?`,
    options: [
      ["RegNumber", "Correct: every vehicle has a different registration number."],
      ["OwnerSurname", "Moyo appears twice; one owner can have several vehicles."],
      ["Make", "Toyota appears twice; many vehicles share a make."],
      ["YearMade", "Several vehicles are made in the same year."],
    ],
    answer: "A",
    explanation: "A primary key must be unique for every record. Only the registration number is different in every row, and no two vehicles can share one.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `A clinic in Mutare stores patients in this table. How many **fields** does the table have?\n\n${patients.md}`,
    value: patientFields,
    wrong: [patients.count],
    explanation: `Each column is a field: PatientNo, FirstName, Surname, DateOfBirth, Ward and Insured, so ${patientFields} fields (the ${patients.count} rows are records).`,
    workedSolution: `1. Fields are columns: count the headings.\n2. ${patients.columns.map((c) => c[0]).join(", ")}.\n3. ${patientFields} fields.`,
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: `A school choir keeps this table.\n\n${choir.md}\n\nComplete the sentences.`,
    template: "The table has {{blank:f}} fields and {{blank:r}} records.",
    blanks: [
      { id: "f", accepted: [String(choir.columns.length)], input: "number", wrong: String(choir.count) },
      { id: "r", accepted: [String(choir.count)], input: "number", wrong: String(choir.count + 1) },
    ],
    explanation: `There are ${choir.columns.length} columns (fields) and ${choir.count} rows of data (records); the heading row is not a record.`,
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each field to the most suitable data type.",
    pairs: [
      ["Number of seats in a minibus", "Integer"],
      ["Mass of a parcel in kilograms, such as 3.6", "Real"],
      ["Clothing size code: S, M or L", "Character"],
      ["Date a licence expires", "Date/time"],
      ["Whether a fee has been paid", "Boolean"],
      ["Learner's home address", "Text / alphanumeric"],
    ],
    explanation: "Whole counts are integer, measurements with a fractional part are real, one letter is character, dates are date/time, yes/no values are Boolean, and words or mixed characters are text.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two records in the same table may have the same value in the primary key field.",
    answer: false,
    explanation: "False. The primary key must be unique for every record; that is how each record is identified.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Changing the display format of a date field, for example from 14/03/2025 to 14-Mar-2025, changes the date that is stored.",
    answer: false,
    explanation: "False. A format controls only how the value is displayed; the stored date is the same.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each validation check to the rule it applies.",
    pairs: [
      ["Presence check", "The surname field must not be left empty"],
      ["Range check", "A test mark must be from 0 to 80"],
      ["Length check", "A PIN must have exactly 4 characters"],
      ["Format check", "A class code must be a digit followed by two letters, such as 3BG"],
      ["Type check", "The number of children must be a whole number"],
    ],
    explanation: "Presence: not blank. Range: between limits. Length: number of characters. Format: a pattern. Type: the right kind of data.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["The rule sets a lowest and a highest value."],
    stem: "A shop's stock table must only accept a reorder quantity from 5 to 500. Which validation check should be used?",
    options: [
      ["Range check", "Correct: the value must lie between a lower and an upper limit."],
      ["Length check", "A length check counts characters, not the size of a value."],
      ["Presence check", "A presence check only makes sure something has been entered."],
      ["Format check", "A format check tests a pattern of characters."],
    ],
    answer: "A",
    explanation: "Limits on a value (here 5 and 500) are tested by a range check.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    hints: ["It acts while the user is typing, character by character."],
    stem: "A database designer sets an **input mask** on the ProductCode field. What does the input mask do?",
    options: [
      ["It controls the pattern of characters that can be typed", "Correct: for example a letter followed by four digits."],
      ["It hides the field from users who are not allowed to see it", "That is an access right or a view, not an input mask."],
      ["It changes how the stored value is displayed in reports", "That is the format property."],
      ["It stops two records having the same product code", "That is done by making the field the primary key."],
    ],
    answer: "A",
    explanation: "An input mask is a template for data entry: it fixes which kind of character (letter, digit) may go in each position and can fill in fixed characters such as dashes.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "A field stores each learner's house initial, which is always one letter: R, G, B or Y. Name the most suitable data type for this field.",
    accepted: ["character", "char"],
    wrong: ["text"],
    explanation: "Exactly one character is stored, so the character (char) data type is the most suitable.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Validation checks that data is reasonable, not that it is true."],
    stem: "A secretary types a learner's date of birth as 16/08/2010. The true date is 18/06/2010. The date field has a range check that accepts dates from the start of 2005 to the end of 2014. Which statement is correct?",
    options: [
      ["The wrong date is accepted, because validation cannot check that data is correct", "Correct: 16/08/2010 is within the range."],
      ["The wrong date is rejected, because it does not match the true date", "The database does not know the true date."],
      ["The wrong date is rejected, because some digits are mixed up", "16/08/2010 is still a valid date inside the range."],
      ["The wrong date is accepted, because a range check only works on integers", "Range checks also work on dates and real numbers."],
    ],
    answer: "A",
    explanation: "Validation only tests whether data is sensible and allowed. A typing error that produces another valid value is not detected; verification (such as proofreading or double entry) is needed for that.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What happens to a stored age after a year?"],
    stem: "A club stores each member's age in a field called `Age`. Explain why it is better to store the date of birth instead.",
    points: [
      "An age changes every year, so a stored age becomes wrong / would need to be updated for every member",
      "The date of birth never changes, and the age can be calculated from it whenever it is needed",
    ],
    explanation: "Store data that does not change; derive values that do.",
    modelAnswer: "A stored age is only correct until the member's next birthday, so every record would need editing each year. The date of birth never changes, and the current age can always be calculated from it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Could two learners share the value?", "What would a better key look like?"],
    stem: "A school in Masvingo plans to use the field `FullName` as the primary key of its `Learners` table. Explain why this is not suitable and suggest a better primary key.",
    points: [
      "A primary key must be unique for every record",
      "Two learners can have the same full name (and a name can change or be misspelt), so FullName may repeat",
      "Suggests a unique ID field, such as a learner number / admission number (generated automatically)",
    ],
    explanation: "Names are not unique; use an identifier created for the purpose.",
    modelAnswer: "A primary key has to be different for every learner so that each record can be identified, but two learners could easily have the same full name. A unique admission number, such as LRN0412, should be used as the key instead.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Each item the receptionist stores is one field.", "A date and a time of day are both date/time data."],
    stem: `A doctors' surgery in Bulawayo wants a table called \`Appointments\`. For each appointment it will store: a unique appointment number such as A2291, the patient's name, the date and the time (in two separate fields), the name of the doctor, whether a follow-up visit is needed, and the fee in dollars and cents.`,
    parts: [
      P.num({ label: "(a)", stem: "State the number of fields needed in the table.", value: apptFields.length, wrong: [apptFields.length - 1], explanation: `${apptFields.join(", ")}: ${apptFields.length} fields.`, workedSolution: `1. One field per item stored.\n2. ${apptFields.length} items are stored.` }),
      P.fib({
        label: "(b)", marks: 3, stem: "Choose the most suitable data type for each field.",
        template: "FollowUp: {{blank:a}}\n\nFee: {{blank:b}}\n\nAppointmentDate: {{blank:c}}",
        blanks: [
          { id: "a", accepted: ["Boolean"], choices: ["Boolean", "Text", "Integer", "Real", "Date/time", "Character"] },
          { id: "b", accepted: ["Real"], choices: ["Boolean", "Text", "Integer", "Real", "Date/time", "Character"] },
          { id: "c", accepted: ["Date/time"], choices: ["Boolean", "Text", "Integer", "Real", "Date/time", "Character"] },
        ],
        explanation: "Follow-up needed is yes/no (Boolean); a fee has cents (real); a date is date/time.",
      }),
      P.mcq({
        label: "(c)", stem: "Which field should be the primary key?",
        options: [["AppointmentID", "Correct: each appointment number is unique."], ["PatientName", "A patient can have many appointments."], ["Doctor", "Each doctor sees many patients."], ["AppointmentDate", "Many appointments share a date."]],
        answer: "A", explanation: "The appointment number is the only value that is different for every appointment.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest one validation check for the Fee field and give a rule for it.",
        points: ["A suitable check with a matching rule, e.g. range check: fee greater than 0 (and below a sensible maximum) / presence check: fee must be entered / type check: must be a number"],
        modelAnswer: "A range check: the fee must be greater than 0 and no more than 500 dollars.",
      }),
    ],
    explanation: "Seven fields; FollowUp Boolean, Fee real, AppointmentDate date/time; AppointmentID is the primary key.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Rows are records; columns are fields.", "Check every column for repeated values before choosing the key."],
    stem: `A bicycle hire shop in Victoria Falls stores data about its bicycles in the table \`Bikes\`.\n\n${bikes.md}`,
    parts: [
      P.num({ label: "(a)", stem: "State the number of records in the table.", value: bikes.count, wrong: [bikes.columns.length], explanation: `There are ${bikes.count} rows of data, one per bicycle.`, workedSolution: `1. Count the rows below the headings: ${bikes.count}.` }),
      P.fib({
        label: "(b)", marks: 4, stem: "Choose the most suitable data type for each field.",
        template: "Type: {{blank:a}}\n\nFrameSize: {{blank:b}}\n\nDailyRate: {{blank:c}}\n\nAvailable: {{blank:d}}",
        blanks: [
          { id: "a", accepted: ["Text"], choices: ["Text", "Character", "Boolean", "Integer", "Real", "Date/time"] },
          { id: "b", accepted: ["Character"], choices: ["Text", "Character", "Boolean", "Integer", "Real", "Date/time"] },
          { id: "c", accepted: ["Real"], choices: ["Text", "Character", "Boolean", "Integer", "Real", "Date/time"] },
          { id: "d", accepted: ["Boolean"], choices: ["Text", "Character", "Boolean", "Integer", "Real", "Date/time"] },
        ],
        wrong: [["Character", "Text", "Integer", "Text"]],
        explanation: "Type is a word (text); FrameSize is always one letter (character); DailyRate has a fractional part (real); Available is TRUE/FALSE (Boolean).",
      }),
      P.short({ label: "(c)", stem: "Identify the field that is most suitable as the primary key.", accepted: ["BikeID", "Bike ID"], wrong: ["Type"], explanation: "BikeID is the only field with a different value in every record." }),
      P.manual({
        label: "(d)", marks: 1, stem: "Explain why the field you identified in (c) is suitable as the primary key.",
        points: ["Its value is unique for every bicycle / record (no value repeats), so it identifies each record"],
        modelAnswer: "Every bicycle has a different BikeID, so the ID identifies exactly one record.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest a validation check for the Gears field, stating the rule.",
        points: ["A suitable check and rule, e.g. range check: from 1 to 30 / type check: whole number / presence check: must be entered"],
        modelAnswer: "A range check that only accepts whole numbers from 1 to 30.",
      }),
    ],
    explanation: `${bikes.count} records; Type text, FrameSize character, DailyRate real, Available Boolean; BikeID is the primary key.`,
  });

  b.card("DEFINITION", "Field", "One item of data stored about every record; a column of the table, with a name and a data type.");
  b.card("DEFINITION", "Record", "All the data stored about one item (one entity occurrence); a row of the table.");
  b.card("DEFINITION", "Primary key", "A field whose value is unique for every record, so it identifies each record.");
  b.card("CONCEPT", "The six basic data types for database fields", "Text/alphanumeric, character, Boolean, integer, real, date/time.");
  b.card("FACT", "Data type for a telephone number", "Text: it keeps the leading zero, spaces and + sign, and no arithmetic is done on it.");
  b.card("CONCEPT", "Why store a date of birth instead of an age?", "An age changes every year and would need updating; the age can be calculated from the date of birth, which never changes.");
  b.card("DEFINITION", "Validation rule", "A rule applied as data is entered that rejects values that are not sensible or allowed, e.g. a range, presence, length, type or format check.");
  b.card("DEFINITION", "Input mask", "A pattern that controls the characters that may be typed into a field, position by position (e.g. a letter then four digits).", undefined, { applies: ZIM });
  b.card("CONCEPT", "Format versus input mask", "Format changes how a stored value is displayed; an input mask controls what may be typed in.", undefined, { applies: ZIM });
});
