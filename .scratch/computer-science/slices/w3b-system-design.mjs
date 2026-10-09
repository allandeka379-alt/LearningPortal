// Slice w3b: system design: inputs, outputs, interface, files, system flowcharts, algorithms (comp.sad.system-design, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const fence = (s) => "```\n" + s + "\n```";
// Counting free rooms: Occupied is an array of 8 Booleans.
const occupied = [true, false, false, true, true, false, true, false];
const freeCount = occupied.filter((x) => !x).length;
const lastFree = occupied.lastIndexOf(false) + 1;
const roomCode = `Free ← 0
FOR Room ← 1 TO 8
    IF Occupied[Room] = FALSE
        THEN
            Free ← Free + 1
            LastFree ← Room
    ENDIF
NEXT Room
OUTPUT "Free rooms: ", Free, " last free room: ", LastFree`;
const occMd = `| Room | ${occupied.map((_, i) => i + 1).join(" | ")} |\n|:--|${occupied.map(() => ":-:").join("|")}|\n| Occupied | ${occupied.map((x) => (x ? "TRUE" : "FALSE")).join(" | ")} |`;

concept("comp.sad.system-design", { file: "sad/system-design", keyPrefix: "sad.system-design" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which activity takes place in the **design** stage of the SDLC?",
    options: [
      ["Planning the layout of input screens and reports", "Correct: input and output design are design activities."],
      ["Interviewing users about the current system", "Fact-finding happens in analysis."],
      ["Training users to operate the new system", "Training happens in implementation."],
      ["Correcting errors reported after the system goes live", "That is maintenance."],
    ],
    answer: "A",
    explanation: "Design plans inputs, outputs, interfaces, files, processes and testing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does a well-designed input form use a **drop-down list** for a learner's class?",
    options: [
      ["It limits entries to valid choices and reduces typing errors", "Correct: the user can only pick an allowed value."],
      ["It makes the form print faster on paper", "A drop-down list is an on-screen feature."],
      ["It encrypts the learner's class automatically when the record is stored", "Drop-down lists do not encrypt data."],
      ["It allows any text at all to be typed in", "It does the opposite: it restricts the choices."],
    ],
    answer: "A",
    explanation: "Selecting from a list prevents misspellings and invalid values.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which data type is most suitable for a field storing whether a hotel guest has paid?",
    options: [
      ["Boolean", "Correct: only two values, Yes/No (TRUE/FALSE)."],
      ["Integer", "Whole numbers are not needed for yes/no."],
      ["Text", "Text would allow inconsistent entries such as 'y', 'paid'."],
      ["Date", "A date is not a yes/no value."],
    ],
    answer: "A",
    explanation: "A field with only two possible values is Boolean.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In a system flowchart, which symbol represents a **printed document** such as a receipt?",
    options: [
      ["A rectangle with a wavy bottom edge", "Correct: the document symbol."],
      ["A cylinder", "A cylinder is online (disk) storage."],
      ["A plain rectangle", "A plain rectangle is a process."],
      ["A rectangle with a sloping top edge", "That is manual input."],
    ],
    answer: "A",
    explanation: "The document symbol has a wavy bottom edge, like a torn sheet of paper.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which field is unique for every guest?"],
    stem: "A hotel's Guests table has the fields GuestID, Surname, Town and PhoneNumber. Which field is the best **primary key**?",
    options: [
      ["GuestID", "Correct: it is created to be unique for every guest."],
      ["Surname", "Many guests share surnames."],
      ["Town", "Many guests come from the same town."],
      ["PhoneNumber", "Numbers can change or be shared by a family."],
    ],
    answer: "A",
    explanation: "A primary key must be unique for every record; an ID field is designed for that.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Whole system, or one algorithm's steps?"],
    stem: "How does a **system** flowchart differ from a **program** flowchart?",
    options: [
      ["It shows the inputs, files and outputs of a whole system", "Correct: it gives an overview of the system."],
      ["It shows every decision inside one algorithm", "That is what a program flowchart shows."],
      ["It lists the fields and data types of each file", "That is a data dictionary."],
      ["It shows the hardware wiring of each computer", "Flowcharts do not show wiring."],
    ],
    answer: "A",
    explanation: "A system flowchart is a high-level view of data through the whole system; a program flowchart shows the detailed logic of one program.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which feature prevents the most serious mistake?"],
    stem: "A pharmacy's new system has a button that deletes a customer's whole record. Which interface design feature is **most** important for this button?",
    options: [
      ["A confirmation message before the record is deleted", "Correct: it stops accidental, irreversible deletion."],
      ["Bright red text in a large decorative font", "Colour helps but does not prevent a mistaken click."],
      ["Placing it in the same position as the Save button", "This would make accidental deletion more likely."],
      ["A sound that plays after the record is deleted", "By then it is too late."],
    ],
    answer: "A",
    explanation: "Forgiving interfaces confirm destructive actions before carrying them out.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A test plan is first drawn up during the design stage and lists test data with the expected results.",
    answer: true,
    explanation: "True. The design stage produces the test plan, which is used later during testing.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A good report shows every field in the database so that users never miss anything.",
    answer: false,
    explanation: "False. Outputs should show only what the user needs; extra fields clutter the report and may expose personal data.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each field of a learners' file to the most suitable data type.",
    pairs: [
      ["DateOfBirth", "Date"],
      ["NumberOfSubjects", "Integer"],
      ["Surname", "Text"],
      ["BoardingLearner (yes or no)", "Boolean"],
    ],
    explanation: "Dates: Date. Counts: Integer. Names: Text. Yes/no: Boolean.",
  });
  b.match({
    d: 3, skill: "RECALL",
    hints: ["Picture each shape."],
    stem: "Match each system flowchart symbol to its meaning.",
    pairs: [
      ["Cylinder", "Online (disk) storage"],
      ["Rectangle with a sloping top edge", "Manual (keyboard) input"],
      ["Plain rectangle", "A computer process"],
      ["Shape with a curved right side and a pointed left side", "Output on a screen (display)"],
    ],
    explanation: "Cylinder: disk storage. Sloping top: manual input. Rectangle: process. Curved-right shape: display.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Count the FALSE values.", "LastFree keeps the most recent free room found."],
    stem: `A guest house uses an array \`Occupied\` of 8 Boolean values.\n\n${occMd}\n\nThis algorithm is designed for the booking system.\n\n${fence(roomCode)}`,
    template: "The value of `Free` output is {{blank:a}}. The value of `LastFree` output is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: [String(freeCount)], input: "number" },
      { id: "b", accepted: [String(lastFree)], input: "number" },
    ],
    explanation: `Rooms ${occupied.map((x, i) => (!x ? i + 1 : null)).filter(Boolean).join(", ")} are free, so Free = ${freeCount} and the last free room found is ${lastFree}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["The loop repeats while the seat is out of range."],
    stem: "Complete the design of the seat-number input for a 45-seat bus.\n\n```\nINPUT Seat\nWHILE Seat < 1 [1] Seat > 45 DO\n    OUTPUT \"Invalid seat\"\n    INPUT Seat\n[2]\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["OR"], choices: ["OR", "AND", "NOT", "THEN"] },
      { id: "b", accepted: ["ENDWHILE"], choices: ["ENDWHILE", "ENDIF", "NEXT Seat", "UNTIL"] },
    ],
    explanation: "The seat is invalid if it is below 1 OR above 45; a WHILE loop is closed with ENDWHILE.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about layout, choices, instructions and checks."],
    stem: "Describe **four** features of a well-designed on-screen data entry form.",
    points: [
      "Clear title and instructions",
      "Fields in a logical order / grouped / matching the source document",
      "Drop-down lists, option buttons or tick boxes for fixed choices",
      "Validation with helpful error messages / submit, clear and cancel buttons / consistent layout",
    ],
    explanation: "Good forms are clear, ordered, restrict choices and validate input.",
    modelAnswer: "It has a title and short instructions; the fields are in the same order as the paper form; fixed choices such as the route use a drop-down list; and each field is validated with a clear error message beside it.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 4,
    hints: ["For each field give name, data type and validation."],
    stem: "A sports club in Harare stores each member's ID, full name, date of joining and membership fee (in dollars and cents). Design the data dictionary entries for these four fields, giving a data type and a validation check for each.",
    points: [
      "MemberID: text (or integer), format/presence check, identified as the primary key",
      "FullName: text, presence check (and length check)",
      "DateJoined: date, format check / not in the future",
      "Fee: real (currency), range check (e.g. greater than 0)",
    ],
    explanation: "Each field needs a sensible data type and a check that fits it.",
    modelAnswer: "MemberID: text, format check (e.g. M followed by four digits), primary key. FullName: text, presence check. DateJoined: date, format DD/MM/YYYY and not after today. Fee: real, range check greater than 0.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Storage is a cylinder; printed output is a document.", "Each field needs a type that matches its values."],
    stem: "Gweru Car Hire (fictional) is designing a new booking system. A clerk keys in each booking; the system checks the Cars file to see if a car is available, saves the booking in the Bookings file and prints a hire agreement.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each part of the system to its system flowchart symbol.",
        pairs: ["Clerk keys in the booking", "Cars file", "Printed hire agreement"],
        right: ["Manual input", "Online storage (cylinder)", "Document", "Display"],
        rightIndex: [0, 1, 2],
        explanation: "Keying in: manual input. Cars file: online storage. Hire agreement: document.",
      }),
      P.mcq({
        label: "(b)", stem: "Which data type suits the field *DailyRate* (for example 45.50)?",
        options: [["Real", "Correct: it has a decimal part."], ["Integer", "Integers have no decimal part."], ["Boolean", "Only two values."], ["Date", "Not a date."]],
        answer: "A", explanation: "Money with cents needs a real (currency) type.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Describe **two** features the clerk's booking screen should have, with a reason for each.",
        points: ["A feature with a reason (e.g. drop-down list of car models, so only valid cars are chosen)", "A second feature with a reason (e.g. date picker / validation messages / confirmation before saving)"],
        modelAnswer: "A drop-down list of available cars, so the clerk cannot type a car that does not exist, and a date picker for the hire dates, so dates are always in the correct format.",
      }),
    ],
    explanation: "(a) Manual input, online storage, document. (b) Real.",
  });
  b.struct({
    d: 5, skill: "CREATION", examStyle: true, marks: 8,
    hints: ["Normal, extreme and abnormal test data.", "Validate in a loop; then update and output."],
    stem: "A school canteen in Masvingo is designing a system to sell meal tickets. Each learner may buy from 1 to 5 tickets at a time; each ticket costs 2 dollars.",
    parts: [
      P.match({
        label: "(a)", stem: "Classify each item of test data for the number of tickets.",
        pairs: ["3", "5", "9"],
        right: ["Normal", "Extreme", "Abnormal"],
        rightIndex: [0, 1, 2],
        explanation: "3: normal. 5: extreme (the upper limit, accepted). 9: abnormal (rejected).",
      }),
      P.num({ label: "(b)", stem: "State the cost in dollars output when 4 tickets are bought.", value: 4 * 2, wrong: [4], explanation: "4 × 2 = 8.", workedSolution: "1. 4 × 2 = 8 dollars." }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Write a pseudocode algorithm for the design that inputs the number of tickets, validates it (1 to 5), and outputs the total cost.",
        points: ["INPUT the number of tickets (with a prompt)", "A loop that repeats while/until the number is outside / inside 1 to 5", "An error message and re-input inside the loop", "Calculates cost as tickets × 2 and outputs it with a message"],
        modelAnswer: "```\nOUTPUT \"How many tickets (1 to 5)?\"\nINPUT Tickets\nWHILE Tickets < 1 OR Tickets > 5 DO\n    OUTPUT \"Enter 1 to 5\"\n    INPUT Tickets\nENDWHILE\nCost ← Tickets * 2\nOUTPUT \"Total cost: \", Cost, \" dollars\"\n```",
      }),
    ],
    explanation: "(a) Normal, extreme, abnormal. (b) 8.",
  });

  b.card("DEFINITION", "System design", "The SDLC stage that plans inputs, outputs, interface, files, processes, security and testing of the new system.");
  b.card("DEFINITION", "Data capture form", "A paper or on-screen form that collects data in a structured way for accurate entry.");
  b.card("DEFINITION", "Data dictionary", "A table describing each field: name, data type, length/format, validation and an example.");
  b.card("CONCEPT", "Good input design", "Title and instructions; logical order; character boxes; drop-down lists/tick boxes; validation messages; submit, clear and cancel buttons.");
  b.card("CONCEPT", "Good output design", "Title, date, clear headings, totals, page numbers; only the information the user needs.");
  b.card("CONCEPT", "System flowchart symbols", "Process: rectangle. Document: wavy-bottom rectangle. Manual input: sloping-top rectangle. Online storage: cylinder. Display: curved-right shape.");
  b.card("CONCEPT", "System vs program flowchart", "System flowchart: whole system's inputs, files and outputs. Program flowchart: detailed steps and decisions of one algorithm.");
  b.card("DEFINITION", "Test plan", "A list of tests with purpose, test data (normal, abnormal, extreme) and expected results, drawn up at design.");
  b.card("DEFINITION", "Primary key", "A field whose value is unique for every record, used to identify each record.");
});
