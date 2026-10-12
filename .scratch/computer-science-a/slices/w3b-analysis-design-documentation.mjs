// Slice w3b: System analysis, design, implementation, documentation and evaluation (acs.sdlc.analysis-design-documentation, ZIMSEC only).
import { concept, P, chk, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

// Shop stock file
const stockFields = [["ItemCode", 5], ["Description", 30], ["Quantity", 5], ["Price", 8], ["Supplier", 20]];
const recLen = stockFields.reduce((s, f) => s + f[1], 0);
chk(recLen, 68);
const items = 2048;
const bytes = recLen * items;
chk(bytes, 139264);
chk(bytes / 1024, 136);
const memberFields = [["MemberNo", 6], ["Name", 25], ["Phone", 12], ["JoinDate", 10]];
const memberLen = memberFields.reduce((t, f) => t + f[1], 0);
chk(memberLen, 53);
const memberTable = mdTable(["Field", "Size (bytes)"], memberFields);
chk(3072 * 32, 98304);
chk(98304 / 1024, 96);
chk((48 * 1024) / 96, 512);
const capacityKB = 68;
const capacityRecords = (capacityKB * 1024) / recLen;
chk(capacityRecords, 1024);
const stockTable = mdTable(["Field", "Size (bytes)"], stockFields);
// DFD of the shop
const flows = [
  ["Customer", "Order", "1. Take order"],
  ["1. Take order", "Sale record", "D1 Sales file"],
  ["D1 Sales file", "Items sold", "2. Update stock"],
  ["2. Update stock", "New quantity", "D2 Stock file"],
  ["D2 Stock file", "Items below minimum", "3. Print reorder list"],
  ["3. Print reorder list", "Reorder list", "Manager"],
];
const flowTable = mdTable(["From", "Data flow", "To"], flows);
const stores = new Set(flows.flatMap((f) => [f[0], f[2]]).filter((x) => /^D\d/.test(x)));
chk(stores.size, 2);
const intoP2 = flows.filter((f) => f[2] === "2. Update stock").length;
chk(intoP2, 1);

concept("acs.sdlc.analysis-design-documentation", { file: "sdlc/analysis-design-documentation", keyPrefix: "sdlc.analysis-design-documentation" }, (b) => {
  mc(b, 1, "RECALL", "In a data flow diagram, what does a data store represent?",
    ["A file or database where data is kept", "Correct."],
    [["A person or organisation outside the system", "That is an external entity."], ["Work that changes data", "That is a process."], ["The movement of data between two parts", "That is a data flow."]],
    "A data store is where data is held between processes.");
  mc(b, 2, "RECALL", "Which changeover method runs the old and new systems together for a period?",
    ["Parallel", "Correct."],
    [["Direct", "In direct changeover the old system stops at once."], ["Phased", "Phased introduces one part at a time."], ["Pilot", "Pilot tries the system in one place first."]],
    "Parallel running keeps the old system as a back-up.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main disadvantage of direct changeover?",
    ["No old system is left to fall back on", "Correct."],
    [["It takes longer than any other changeover method", "Direct changeover is the quickest."], ["All of the work has to be done twice over", "That is true of parallel running."], ["Only part of the system is replaced at one time", "That is phased changeover."]],
    "Direct changeover is quick but risky.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Who is technical documentation written for?",
    ["The staff who maintain the system", "Correct."],
    [["The people who use the system every day", "That is user documentation."], ["The customers of the organisation", "Customers do not use the documentation."], ["The people who invented the programming language", "Not relevant."]],
    "Technical documentation supports maintenance.");
  mc(b, 3, "APPLICATION", "A bank is replacing the system that records customers' accounts. An error would be very costly. Which changeover method is the most suitable?",
    ["Parallel", "Correct: the old system is a safe back-up while results are compared."],
    [["Direct", "Too risky for an important system."], ["No changeover", "The old system is being replaced."], ["Direct, with no training", "Neither safe nor sensible."]],
    "Parallel running suits critical systems.", { hints: ["Which method keeps the old system working?"] });
  mc(b, 3, "APPLICATION", "A chain of four shops introduces a new till system in one shop and, if it works well, in the other three later. Which changeover method is this?",
    ["Pilot", "Correct: it is tried in one place first."],
    [["Direct", "Direct replaces the old system everywhere at once."], ["Parallel", "Parallel runs both systems together."], ["Phased", "Phased introduces one function at a time, not one location."]],
    "A pilot test uses one site as a trial.", { hints: ["Is it one place or one part of the system?"] });
  mc(b, 3, "ANALYSIS", "Which item of the design stage describes the fields, their data types and sizes and the validation for each?",
    ["File design", "Correct."],
    [["Output and report design", "That describes the layout of reports and screens."], ["Test plan", "That lists tests and expected results."], ["User guide", "That is documentation for the users."]],
    "File design lists the fields, data types, sizes and validation.", { hints: ["Which design item concerns stored data?"] });
  mc(b, 4, "ANALYSIS", "A system has been working for six months. The analyst compares its performance with the objectives in the requirements specification and reports on the users' opinions. Which stage is this?",
    ["Evaluation", "Correct."],
    [["Analysis", "Analysis comes before design."], ["Implementation", "Implementation installs the system."], ["Design", "Design plans the system."]],
    "Evaluation judges the finished system against its objectives.", { hints: ["When does this happen: before or after the system is in use?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "User documentation is written mainly for the programmers who maintain the system.", answer: false, explanation: "False. That is technical documentation; user documentation is for the users." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each changeover method to its description.",
    pairs: [["Direct", "The old system is stopped and the new one starts at once"], ["Parallel", "Both systems run together and their results are compared"], ["Phased", "The new system is introduced one part at a time"], ["Pilot", "The new system is tried in one branch or department first"]],
    explanation: "Each method manages risk in a different way." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each design item to what it describes.",
    pairs: [["Data capture form", "The layout of the screen used to enter data"], ["File design", "The fields, data types, sizes and validation of the stored data"], ["Output design", "The layout of reports and statements"], ["Test plan", "The tests, the test data and the expected results"]],
    explanation: "Each is a separate design document." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about the stages.",
    template: "{{blank:a}} finds out what the new system must do. {{blank:b}} decides how the system will do it. {{blank:c}} judges whether the finished system met its objectives.",
    blanks: [
      { id: "a", accepted: ["Analysis"], choices: ["Analysis", "Design", "Evaluation", "Implementation"] },
      { id: "b", accepted: ["Design"], choices: ["Analysis", "Design", "Evaluation", "Implementation"] },
      { id: "c", accepted: ["Evaluation"], choices: ["Analysis", "Design", "Evaluation", "Implementation"] },
    ], explanation: "Analysis is the what; design is the how; evaluation looks back." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the diagram that shows how data moves between external entities, processes and data stores. (Give the full name or the three-letter abbreviation.)",
    accepted: ["data flow diagram", "DFD", "a data flow diagram", "dfd"], explanation: "The data flow diagram." });
  b.num({ d: 3, skill: "APPLICATION", unit: "bytes", hints: ["Add the sizes of all four fields."],
    stem: `A club's member file record has these fields.\n\n${memberTable}\n\nCalculate the length of one record, in bytes.`,
    value: memberLen, wrong: [43, 63], workedSolution: "1. " + "6 + 25 + 12 + 10 = 53.", explanation: "The field sizes add up to 53 bytes." });
  b.num({ d: 3, skill: "APPLICATION", unit: "KB", hints: ["File size in bytes = record length × number of records.", "1 KB = 1024 bytes."],
    stem: `A file has 3072 records of 32 bytes each. Calculate the size of the file in KB. (1 KB = 1024 bytes.)`,
    value: 96, wrong: [98304, 32], workedSolution: "1. Size = 3072 × 32 = 98304 bytes.\n2. 98304 ÷ 1024 = 96 KB.", explanation: "98304 bytes = 96 KB." });
  b.num({ d: 4, skill: "ANALYSIS", hints: ["Change KB to bytes, then divide by the record length."],
    stem: `A file area has 48 KB of space free. Each record is 96 bytes. How many records can be stored? (1 KB = 1024 bytes.)`,
    value: 512, unit: undefined, wrong: [500, 48], workedSolution: "1. 48 × 1024 = 49152 bytes.\n2. 49152 ÷ 96 = 512.", explanation: "49152 ÷ 96 = 512 records." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["An advantage and a disadvantage for each method."],
    stem: "Compare direct changeover and parallel running. [4]",
    points: ["Direct: the old system is stopped and the new one starts at once", "Direct: quick and cheap but risky, because there is nothing to fall back on", "Parallel: both systems run together and the results are compared", "Parallel: safe because the old system is a back-up, but slow and costly because the work is done twice"],
    modelAnswer: "In direct changeover the old system stops and the new one starts at once; it is quick and cheap but risky because there is no back-up. In parallel running both systems run together and their results are compared; it is safe but slow and costly because the work is done twice.",
    explanation: "Describe each and give an advantage and a disadvantage." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name the audience first."],
    stem: "Distinguish between technical documentation and user documentation. [4]",
    points: ["Technical documentation is for programmers and administrators who maintain the system", "It contains the design, data dictionary, file layouts, program listings and test results", "User documentation is for the people who use the system", "It explains how to enter data, print reports and correct errors (a user guide and help)"],
    modelAnswer: "Technical documentation is for the programmers and administrators who maintain the system and contains the design, file layouts, program listings and test results. User documentation is for the people who use the system and explains how to enter data, print reports and correct errors.",
    explanation: "Audience and contents for each." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Think of the questions the analyst asks."],
    stem: "State three ways in which a system may be evaluated after it has been in use for some time. [3]",
    points: ["Compare it with the objectives in the requirements specification", "Ask the users for their opinions (interview or questionnaire)", "Check its performance, for example the time taken to complete a task, and look for faults or missing features"],
    modelAnswer: "Compare it with the objectives in the requirements specification, ask the users for their opinions and check its performance and any faults.",
    explanation: "Objectives, users, performance." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare the risk and the cost of each method for this scenario."],
    stem: "A school with 1 280 learners is replacing its paper fees records with a computer system at the start of a new term. Recommend a changeover method and justify your choice. [4]",
    points: ["Recommends parallel running (or phased)", "Fees are important and an error would be costly, so the old records are kept as a back-up", "The results of the two systems are compared until the new system is shown to be correct", "Direct changeover is too risky because there would be no fallback"],
    modelAnswer: "Parallel running is suitable. Fees records are important and errors are costly, so the old system is kept as a back-up while the results of the two systems are compared. Direct changeover would be too risky.",
    explanation: "Recommendation with reasons." });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Count the arrows into and out of each box."],
    explanation: "The table shows two data stores (D1 and D2) and three processes; the manager receives the reorder list.",
    stem: `The data flow diagram of a shop's stock system is described by the table below. D1 and D2 are data stores.\n\n${flowTable}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many data stores are shown?", value: stores.size, wrong: [1, 3], explanation: "D1 and D2.", workedSolution: "1. " + ("D1 and D2.") }),
      P.short({ label: "(b)", marks: 1, stem: "Name the external entity that receives the reorder list.", accepted: ["Manager", "the manager"], explanation: "The flow from process 3 goes to the Manager." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the process that sends data to the stock file D2.", accepted: ["Update stock", "2. Update stock", "process 2", "2"], explanation: "Process 2, Update stock, writes the new quantity." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe what happens to the data in the system from the moment a customer places an order until the stock file is updated.", points: ["The customer's order is taken in process 1 and a sale record is made", "The sale record is stored in the sales file D1", "The items sold are read from D1 by process 2, which updates the stock file D2 with the new quantity"], modelAnswer: "The order is taken in process 1 and a sale record is stored in the sales file D1. Process 2 reads the items sold from D1 and writes the new quantity to the stock file D2.", explanation: "Follow the arrows." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Add the field sizes.", "Divide by 1024 for KB."],
    explanation: `Record length ${recLen} bytes; file size ${bytes} bytes = 136 KB.`,
    stem: `A shop's stock file is designed as follows.\n\n${stockTable}\n\nThe shop has ${items} items. (1 KB = 1024 bytes.)`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the length of one record, in bytes.", value: recLen, wrong: [60, 128], explanation: "5 + 30 + 5 + 8 + 20 = 68.", workedSolution: "1. " + ("5 + 30 + 5 + 8 + 20 = 68.") }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the size of the file in KB.", value: 136, wrong: [139264, 68], workedSolution: `1. ${recLen} × ${items} = ${bytes} bytes.\n2. ${bytes} ÷ 1024 = 136 KB.`, explanation: `${bytes} ÷ 1024 = 136 KB.` }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the validation checks that could be used on the Quantity and ItemCode fields.", points: ["A range check on Quantity (for example 0 or more)", "A type check on Quantity so that only whole numbers are accepted (or a presence check)", "A length or format check on ItemCode so that it has exactly 5 characters"], modelAnswer: "A range check on Quantity so it is 0 or more, a type check so only whole numbers are entered, and a length check so that ItemCode has exactly 5 characters.", explanation: "Choose checks that fit each field." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two items that should be included in the test plan.", points: ["The test data to be used (normal, abnormal and extreme)", "The expected result for each test"], modelAnswer: "The test data, including normal, abnormal and extreme values, and the expected result for each test.", explanation: "Test data and expected results." }),
    ] });
  b.card("DEFINITION", "Data flow diagram (DFD)", "A diagram of how data moves between external entities, processes and data stores.");
  b.card("FACT", "DFD symbols", "External entity (outside the system), process (changes data), data store (file or database), data flow (arrow, labelled).");
  b.card("FACT", "Design items", "Data capture forms, file and data structure design, output design, test plan.");
  b.card("CONCEPT", "Direct and parallel changeover", "Direct: stop old, start new at once (quick, risky). Parallel: both run together (safe, costly).");
  b.card("CONCEPT", "Phased and pilot changeover", "Phased: one part at a time. Pilot: one branch or department first.");
  b.card("CONCEPT", "Technical and user documentation", "Technical: for maintainers (design, file layouts, listings). User: for users (how to use the system).");
  b.card("DEFINITION", "Evaluation", "Judging the finished system against its objectives and the users' needs, to identify improvements.");
  b.card("FORMULA", "File size", "File size = record length × number of records (bytes); divide by 1024 for KB.");
  b.card("CONCEPT", "Analysis against design", "Analysis finds what the new system must do; design decides how it will do it.");
});
