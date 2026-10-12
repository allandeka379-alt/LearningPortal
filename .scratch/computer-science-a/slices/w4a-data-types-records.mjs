// Slice w4a: data types and records (acs.ds.data-types-records, both boards).
import { concept, P, chk, same, mdTable, codeBlock, round } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";

concept("acs.ds.data-types-records", { file: "ds/data-types-records", keyPrefix: "ds.data-types-records" }, (b) => {
  const prices = [12.5, 8.75, 15.0];
  const totalPrice = round(prices.reduce((a, c) => a + c, 0), 2);
  chk(totalPrice, 36.25);
  const shopTotal = round(9 + 14.5 + 6.25, 2); chk(shopTotal, 29.75);
  const appts = [["Sipho Dube", "0772000111", true], ["Thandeka Moyo", "0712333444", false], ["Nyasha Chari", "0782555666", true], ["Tatenda Banda", "0733777888", true], ["Rudo Zulu", "0774999000", false]];
  const attended = appts.filter((a) => a[2]).length;
  chk(attended, 3);
  chk(40 * 5, 200);

  // ---- multiple choice
  mc(b, 1, "RECALL", "Which data type is used to store a single character, such as the grade 'B'?",
    ["CHAR", "Correct."],
    [["STRING", "A STRING holds zero or more characters, so it is not the type for exactly one character."], ["BOOLEAN", "A Boolean holds TRUE or FALSE."], ["INTEGER", "An integer holds a whole number."]],
    "CHAR holds one character.");
  mc(b, 2, "APPLICATION", "Which is the most suitable data type for the price of a loaf of bread, such as 1.75?",
    ["REAL", "Correct: it has a fractional part."],
    [["INTEGER", "An integer cannot store the cents."], ["CHAR", "A CHAR holds a single character."], ["BOOLEAN", "A Boolean holds only TRUE or FALSE."]],
    "Prices with cents need REAL.", { daily: true });
  mc(b, 2, "APPLICATION", "Which is the most suitable data type for a mobile telephone number such as 0772123456?",
    ["STRING", "Correct: it keeps the leading zero and is not used for calculations."],
    [["INTEGER", "The leading zero would be lost."], ["REAL", "A telephone number does not have a fractional part."], ["BOOLEAN", "A Boolean holds only TRUE or FALSE."]],
    "Identifiers that are not used in arithmetic are STRING.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is a record?",
    ["A group of fields of different types under one name", "Correct."],
    [["A list of items that must all have the same data type as each other", "That describes an array."], ["A single variable that holds one number or one character", "A record has several fields."], ["A file that is stored on a disk", "A record is a data structure in a program."]],
    "Related items of different types are kept together.");
  mc(b, 3, "UNDERSTANDING", "A record variable `Pupil` has a field `Average`. Which statement stores 63.5 in that field?",
    ["`Pupil.Average ← 63.5`", "Correct: the record name, a full stop and the field name."],
    [["`Average ← 63.5`", "This does not say which record the field belongs to."], ["`Pupil ← 63.5`", "This tries to put a number into the whole record."], ["`Pupil(Average) ← 63.5`", "Brackets are not used to select a field."]],
    "A field is accessed with dot notation.", { hints: ["How is a field of a record named?"] });
  mc(b, 3, "ANALYSIS", "A program stores a pupil's name, form and average in three separate arrays. Which is an advantage of using one array of records instead?",
    ["The details of one pupil stay together", "Correct: the items cannot get out of step."],
    [["The program no longer needs any loops to process the pupils", "Loops are still needed to process several records."], ["The data uses no memory when it is stored", "The data still needs to be stored."], ["Every field can then be given the same data type", "Fields in a record can have different types."]],
    "One record holds all the fields of an entity.", { hints: ["What can go wrong when the same pupil is in three arrays?"] });
  mc(b, 3, "APPLICATION", "An array `Class` holds records of type `TStudent` with a field `Name`. Which expression is the name of the second student?",
    ["`Class[2].Name`", "Correct: the element first, then the field."],
    [["`Class.Name[2]`", "The index belongs to the array, not the field."], ["`Name[2].Class`", "The array name comes first."], ["`Class(2)`", "This does not name a field."]],
    "Array element, full stop, field name.", { hints: ["First pick the element of the array, then the field."] });
  mc(b, 2, "RECALL", "Which type of value is `TRUE`?",
    ["BOOLEAN", "Correct."],
    [["STRING", "A string is written in double quotation marks."], ["CHAR", "A CHAR is a single character in single quotation marks."], ["REAL", "A real is a number."]],
    "TRUE and FALSE are the two BOOLEAN values.");

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The fields of a record must all have the same data type.", answer: false,
    explanation: "False. A record groups fields of different types; an array holds items of one type." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The value `'7'` written with single quotation marks is a CHAR, not an INTEGER.", answer: true,
    explanation: "True. It is the character 7; it cannot be used in arithmetic without being converted." });
  b.match({ d: 2, skill: "APPLICATION", stem: "Match each item of data to the most suitable data type.",
    pairs: [["The number of pupils in a class", "INTEGER"], ["The mean mark of a class", "REAL"], ["Whether a pupil has paid fees", "BOOLEAN"], ["A pupil's surname", "STRING"], ["The date of birth of a pupil", "DATE"]],
    explanation: "Choose the type from the kind of data." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Which fields hold text, numbers and yes/no values?"],
    stem: "Complete the data types in the record definition for a shop item.",
    template: "TYPE TItem: ItemName : {{blank:a}}, Quantity : {{blank:b}}, UnitPrice : {{blank:c}}, InStock : {{blank:d}}",
    blanks: [
      { id: "a", accepted: ["STRING"], choices: ["STRING", "INTEGER", "REAL", "BOOLEAN"] },
      { id: "b", accepted: ["INTEGER"], choices: ["STRING", "INTEGER", "REAL", "BOOLEAN"] },
      { id: "c", accepted: ["REAL"], choices: ["STRING", "INTEGER", "REAL", "BOOLEAN"] },
      { id: "d", accepted: ["BOOLEAN"], choices: ["STRING", "INTEGER", "REAL", "BOOLEAN"] },
    ], explanation: "A name is text, a quantity is a whole number, a price has cents and in stock is yes or no." });

  // ---- numerical
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "A record type has the fields `BookID`, `Title`, `Pages`, `Price` and `OnLoan`. How many fields does each record have?", value: 5, wrong: [4, 6], workedSolution: "Count the field names: BookID, Title, Pages, Price, OnLoan.", explanation: "5 fields." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply the number of records by the fields in each."],
    stem: "An array holds 40 records and each record has 5 fields. How many separate data items are stored altogether?", value: 200, wrong: [45, 40], workedSolution: "40 × 5 = 200.", explanation: "200 items." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, hints: ["Add the three prices."],
    stem: "The array `Shop` holds three records. The `Price` fields are 9.00, 14.50 and 6.25. State the total of the prices.", value: shopTotal, answer: "29.75", tol: 0.001, wrong: [29.5, 30.25], workedSolution: "9.00 + 14.50 + 6.25 = 29.75.", explanation: "29.75." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the pseudocode keyword that begins the definition of a record type.", accepted: ["TYPE", "type"], wrong: ["RECORD", "STRUCT"], explanation: "A record type is defined with TYPE … ENDTYPE." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compare how the data is stored and what it is for."],
    stem: "Explain the difference between an array and a record. [3]",
    points: ["An array holds items that all have the same data type, a record can hold items of different types", "Array elements are accessed by an index (position)", "Record fields are accessed by their names"],
    modelAnswer: "An array holds items of the same data type, while a record can hold fields of different types. Array elements are reached using an index, but record fields are reached by name.", explanation: "Same type with an index against mixed types with names." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Name the type for each field and give a reason."],
    stem: "A library stores the title, the number of pages and whether the book is on loan. State a suitable data type for each item. [3]",
    points: ["Title: STRING", "Number of pages: INTEGER", "On loan: BOOLEAN"],
    modelAnswer: "Title: STRING. Number of pages: INTEGER. On loan: BOOLEAN.", explanation: "Text, whole number, yes or no." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Start with TYPE and end with ENDTYPE."],
    stem: "A school stores for each learner the learner's name, form, mean mark and whether the learner has paid fees. Write the pseudocode to define a record type `TLearner`. [4]",
    points: ["TYPE TLearner ... ENDTYPE structure", "Name declared as STRING", "Form declared as INTEGER and mean mark declared as REAL", "Paid declared as BOOLEAN, each with the DECLARE keyword"],
    modelAnswer: codeBlock(`TYPE TLearner
    DECLARE Name : STRING
    DECLARE Form : INTEGER
    DECLARE MeanMark : REAL
    DECLARE FeesPaid : BOOLEAN
ENDTYPE`), explanation: "One DECLARE line per field." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Think about what is repeated when the data is in separate arrays."],
    stem: "Explain two benefits of storing learner details in an array of records instead of a separate array for each detail. [3]",
    points: ["All details of one learner are stored together, so they stay linked (for example when sorting)", "The program is easier to read because a field is named, such as Learner[1].Name", "A whole record can be passed to a subroutine or written to a file as one item"],
    modelAnswer: "The details of one learner stay together, so they cannot get out of step when the data is processed. The code is easier to read because fields are named, and a whole record can be passed to a subroutine as one item.", explanation: "Grouping and readability." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Think about whether each item is text, a whole number, a number with cents or yes/no.", "Use the array name, the index, a full stop and the field name."],
    explanation: "A record type for a library book and an array of records.",
    stem: "A school library stores a record for each book, with the fields `BookID`, `Title`, `Pages`, `Price`, `OnLoan` and `DueDate`. The records of three books are stored in the array `Library`, where `Price` is 12.50, 8.75 and 15.00.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Match each field to its most suitable data type.", pairs: [["Pages", "INTEGER"], ["Price", "REAL"], ["OnLoan", "BOOLEAN"]], explanation: "Whole number, number with cents, yes or no." }),
      pm("(b)", "Which expression is the price of the first book?", ["`Library[1].Price`", "Correct."], [["`Price.Library[1]`", "The array comes first."], ["`Library.Price`", "This does not say which element."], ["`Price[1]`", "Price is a field, not an array."]], "Element, then field."),
      pm("(c)", "Which data type is suitable for `DueDate`?", ["DATE", "Correct."], [["STRING", "A date held as text cannot easily be compared."], ["CHAR", "A CHAR holds one character."], ["BOOLEAN", "A Boolean holds only TRUE or FALSE."]], "A calendar date has the DATE type."),
      P.manual({ label: "(d)", marks: 3, stem: "Write the pseudocode to define the record type `TBook`.", points: ["TYPE TBook and ENDTYPE", "BookID and Title declared as STRING, Pages as INTEGER", "Price as REAL, OnLoan as BOOLEAN and DueDate as DATE, each with DECLARE"], modelAnswer: codeBlock(`TYPE TBook
    DECLARE BookID : STRING
    DECLARE Title : STRING
    DECLARE Pages : INTEGER
    DECLARE Price : REAL
    DECLARE OnLoan : BOOLEAN
    DECLARE DueDate : DATE
ENDTYPE`), explanation: "One DECLARE line for each field." }),
      P.num({ label: "(e)", marks: 1, stem: "State the total of the three `Price` fields.", value: totalPrice, answer: "36.25", tol: 0.001, wrong: [35.25, 36.5], workedSolution: "12.50 + 8.75 + 15.00 = 36.25.", explanation: "36.25." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Count the rows in which Attended is TRUE.", "Use a loop with a counter and an IF."],
    explanation: "Counting records in an array of appointments.",
    stem: "A clinic stores its appointments in an array `Appointment` of five records of type `TAppointment`, with the fields `PatientName`, `Phone` and `Attended`. The data is:\n\n" + mdTable(["Index", "PatientName", "Phone", "Attended"], appts.map((a, i) => [i + 1, a[0], a[1], a[2] ? "TRUE" : "FALSE"])),
    parts: [
      pm("(a)", "Which data type is most suitable for `Phone`?", ["STRING", "Correct."], [["INTEGER", "The leading zero would be lost."], ["REAL", "A telephone number has no fractional part."], ["BOOLEAN", "A Boolean holds only TRUE or FALSE."]], "A telephone number is an identifier, not used in arithmetic."),
      P.manual({ label: "(b)", marks: 2, stem: "Give two reasons for your answer to part (a).", points: ["Telephone numbers begin with 0, which would be lost if stored as a number", "They are not used in calculations such as addition"], modelAnswer: "A telephone number begins with 0, which would be lost in a number type, and it is never used in calculations.", explanation: "Leading zero and no arithmetic." }),
      P.num({ label: "(c)", marks: 1, stem: "State how many patients attended.", value: attended, wrong: [2, 5], workedSolution: "Attended is TRUE for Sipho Dube, Nyasha Chari and Tatenda Banda.", explanation: "3 patients." }),
      P.manual({ label: "(d)", marks: 2, stem: "Write pseudocode that counts the patients who attended and outputs the count.", points: ["A loop from 1 to 5 with the counter set to 0 before it", "Tests Appointment[Index].Attended and adds 1 to the counter, then outputs the counter after the loop"], modelAnswer: codeBlock(`Count ← 0
FOR Index ← 1 TO 5
    IF Appointment[Index].Attended = TRUE THEN
        Count ← Count + 1
    ENDIF
NEXT Index
OUTPUT Count`), explanation: "Count with a loop and a field test." }),
    ] });

  // ---- flashcards
  b.card("FACT", "Built-in data types", "INTEGER (whole number), REAL (fractional part), CHAR (one character), STRING (text), BOOLEAN (TRUE/FALSE), DATE.");
  b.card("CONCEPT", "Choosing a data type", "Use a number type if arithmetic is done on the value; use STRING for identifiers such as telephone numbers.");
  b.card("DEFINITION", "Record", "A structure that holds a fixed number of fields, which may have different data types, under one identifier.");
  b.card("DEFINITION", "Field", "One named item within a record.");
  b.card("CONCEPT", "Defining a record", "TYPE TName, then DECLARE Field : Type for each field, then ENDTYPE.");
  b.card("CONCEPT", "Using a field", "Record.Field ← value; for an array of records use Array[Index].Field.");
  b.card("CONCEPT", "Array against record", "Array: items of one type, accessed by index. Record: fields of different types, accessed by name.");
  b.card("CONCEPT", "Why use records", "Related data stays together, the code is easier to read and a record can be passed or stored as one item.");
  b.card("FACT", "CHAR and STRING literals", "A CHAR is written in single quotes ('B'); a STRING in double quotes (\"Harare\").");
});
