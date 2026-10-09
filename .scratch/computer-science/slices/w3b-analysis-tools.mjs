// Slice w3b: systems analysis, requirements, DFDs and activity diagrams (comp.sad.analysis-tools, ZIMSEC only).
import { concept, P } from "../lib.mjs";

// A DFD for a fees system, described as a table.
const FEES = [
  ["Parent (entity)", "Payment and learner ID", "Process 1: Record payment"],
  ["Process 1: Record payment", "Payment details", "Data store D1: Payments"],
  ["Data store D2: Learners", "Learner details", "Process 1: Record payment"],
  ["Process 1: Record payment", "Receipt", "Parent (entity)"],
  ["Data store D1: Payments", "Unpaid balances", "Process 2: Produce arrears report"],
  ["Process 2: Produce arrears report", "Arrears report", "Bursar (entity)"],
];
const feesMd = ["| From | Data flow | To |", "|:--|:--|:--|", ...FEES.map((r) => `| ${r.join(" | ")} |`)].join("\n");
const uniq = (pred) => [...new Set(FEES.flat().filter(pred))];
const feesProcesses = uniq((x) => x.startsWith("Process"));
const feesStores = uniq((x) => x.startsWith("Data store"));
const feesEntities = uniq((x) => x.endsWith("(entity)"));
const feesFlows = FEES.length;

concept("comp.sad.analysis-tools", { file: "sad/analysis-tools", keyPrefix: "sad.analysis-tools" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a data flow diagram, what does an **external entity** represent?",
    options: [
      ["A person or organisation outside the system that sends or receives data", "Correct: for example a customer or supplier."],
      ["A place inside the system where data is stored until a process needs it", "That is a data store."],
      ["An action that changes or uses data", "That is a process."],
      ["Data moving from one part of the system to another", "That is a data flow."],
    ],
    answer: "A",
    explanation: "External entities are sources or destinations of data outside the system.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a DFD, which symbol is drawn as an **open-ended rectangle** (two parallel lines)?",
    options: [
      ["Data store", "Correct: it holds data such as a file or table."],
      ["External entity", "An entity is a closed rectangle."],
      ["Process", "A process is a rounded rectangle or circle."],
      ["Data flow", "A data flow is a labelled arrow."],
    ],
    answer: "A",
    explanation: "Data stores are drawn as open-ended rectangles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **non-functional** requirement for a school results system?",
    options: [
      ["Reports must appear within 3 seconds", "Correct: it states a quality (speed), not a function."],
      ["The system must calculate each learner's average", "This is a function the system performs."],
      ["The system must print report cards", "This is a function."],
      ["Teachers must be able to enter marks", "This is a user/functional requirement."],
    ],
    answer: "A",
    explanation: "Non-functional requirements describe qualities and constraints such as speed, security and reliability.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In an activity diagram, what does a **diamond** represent?",
    options: [
      ["A decision (or a merge of paths)", "Correct: the outgoing arrows carry conditions in square brackets."],
      ["The start of the activity", "The start is a solid black circle."],
      ["Actions happening at the same time", "Parallel actions use a fork bar."],
      ["The end of the activity", "The end is a bullseye."],
    ],
    answer: "A",
    explanation: "A diamond is a decision (one in, several out) or a merge (several in, one out).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Every data flow must start or end at a process."],
    stem: "Which data flow is **not allowed** in a DFD?",
    options: [
      ["From the Customer entity directly to the Orders data store", "Correct: data must pass through a process before it is stored."],
      ["From the Customer entity to the Take order process", "Entity to process is allowed."],
      ["From the Take order process to the Orders data store", "Process to store is allowed."],
      ["From the Orders data store to the Print invoice process", "Store to process is allowed."],
    ],
    answer: "A",
    explanation: "Data cannot go straight from an entity to a data store; a process must handle it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What does a thick bar with one arrow in and several out show?"],
    stem: "In an activity diagram for a bank withdrawal, *Dispense cash* and *Update balance* both leave a thick bar. What does this show?",
    options: [
      ["The two actions happen in parallel", "Correct: a fork starts several actions at the same time."],
      ["The customer chooses one of the two actions", "A choice is shown with a decision diamond."],
      ["The activity ends after these actions", "The end is a bullseye."],
      ["The two actions are repeated until the balance is zero", "No loop is shown by a fork."],
    ],
    answer: "A",
    explanation: "A fork (thick bar) splits the flow into actions that happen at the same time.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which diagram shows order and decisions?"],
    stem: "An analyst wants to show the order in which a hospital processes an admission, including the decision about whether the patient has medical aid. Which diagram is **most** suitable?",
    options: [
      ["An activity diagram", "Correct: it shows the sequence of actions and decisions."],
      ["A data flow diagram", "A DFD shows data movement and storage but not the order of steps or decisions."],
      ["A table of data stores", "This lists storage only."],
      ["An entity-relationship diagram", "This shows relationships between database tables."],
    ],
    answer: "A",
    explanation: "Activity diagrams show the sequence of actions and the decisions in a process.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A data flow diagram shows the decisions made in a process and the order of the steps.",
    answer: false,
    explanation: "False. A DFD shows how data moves and where it is stored. An activity diagram or flowchart shows order and decisions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Processes in a DFD should be labelled with verb phrases such as *Calculate fees*.",
    answer: true,
    explanation: "True. A process does something, so it is named with a verb phrase; entities and stores are named with nouns.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each DFD symbol to its description.",
    pairs: [
      ["External entity", "A rectangle labelled with a noun, outside the system"],
      ["Process", "A rounded rectangle labelled with a verb phrase"],
      ["Data store", "An open-ended rectangle"],
      ["Data flow", "A labelled arrow"],
    ],
    explanation: "Entity: rectangle. Process: rounded rectangle. Store: open-ended rectangle. Flow: arrow.",
  });
  b.match({
    d: 3, skill: "RECALL",
    hints: ["Start, end, parallel, choice."],
    stem: "Match each activity diagram symbol to its meaning.",
    pairs: [
      ["Small solid black circle", "Initial node: the start"],
      ["Solid circle inside a ring", "Final node: the end"],
      ["Thick bar with one arrow in and several out", "Fork: actions start in parallel"],
      ["Rounded rectangle", "An action (step)"],
    ],
    explanation: "Solid circle: start. Bullseye: end. Thick bar: fork. Rounded rectangle: action.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    hints: ["Count each kind of label in the table."],
    stem: `This table describes a DFD of a school fees system.\n\n${feesMd}`,
    template: "Number of external entities: {{blank:a}}. Number of processes: {{blank:b}}. Number of data stores: {{blank:c}}. Number of data flows: {{blank:d}}.",
    blanks: [
      { id: "a", accepted: [String(feesEntities.length)], input: "number" },
      { id: "b", accepted: [String(feesProcesses.length)], input: "number" },
      { id: "c", accepted: [String(feesStores.length)], input: "number" },
      { id: "d", accepted: [String(feesFlows)], input: "number" },
    ],
    explanation: `Entities: ${feesEntities.join(", ")}. Processes: ${feesProcesses.join("; ")}. Stores: ${feesStores.join("; ")}. Each row is one data flow: ${feesFlows}.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the document produced at the end of analysis that lists exactly what the new system must do.",
    accepted: ["requirements specification", "requirement specification", "system requirements specification", "requirements specification document", "specification of requirements"],
    wrong: ["feasibility report"],
    explanation: "The requirements specification lists the functional and non-functional requirements of the new system.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["What does the analyst do after fact-finding?"],
    stem: "Describe **four** activities carried out in the analysis stage of the SDLC.",
    points: [
      "Fact-finding (questionnaires, interviews, observation, record inspection)",
      "Describing / modelling the current system (e.g. with a DFD) and identifying its problems",
      "Identifying the user and system requirements / writing the requirements specification",
      "Considering alternative solutions and recommending one",
    ],
    explanation: "Analysis studies the current system and specifies the new one.",
    modelAnswer: "The analyst collects facts by interviews and observation, draws a DFD of the current system to show its problems, lists the requirements of the new system in a requirements specification, and compares alternatives such as a package or a bespoke system before recommending one.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Think about cost, time and fit to needs."],
    stem: "A Bulawayo bus company could buy an off-the-shelf booking package or have a bespoke booking system written. Give **two** advantages of each alternative.",
    points: [
      "Package: cheaper (cost shared among many buyers)",
      "Package: available immediately / well tested / support and user community",
      "Bespoke: fits the company's exact requirements",
      "Bespoke: can be changed as needs change / competitive advantage / no unneeded features",
    ],
    explanation: "Packages are quicker and cheaper; bespoke systems fit exactly.",
    modelAnswer: "A package is cheaper and can be used immediately, and it has been tested by many users. A bespoke system is written to fit the company's own routes and fares exactly, and it can be changed whenever the company needs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Entities are outside; stores hold data; processes act.", "Read the From and To columns."],
    stem: `Thandeka is analysing the fees system at a secondary school. She describes the DFD as a table.\n\n${feesMd}`,
    parts: [
      P.match({
        label: "(a)", stem: "Classify each item from the DFD.",
        pairs: ["Parent", "Record payment", "Payments", "Receipt"],
        right: ["External entity", "Process", "Data store", "Data flow"],
        rightIndex: [0, 1, 2, 3],
        explanation: "Parent: entity. Record payment: process. Payments: store. Receipt: data flow.",
      }),
      P.short({
        label: "(b)", stem: "Name the external entity that receives the arrears report.",
        accepted: ["Bursar", "the bursar"], wrong: ["Parent"],
        explanation: "The arrears report goes from process 2 to the Bursar.",
      }),
      P.manual({
        label: "(c)", marks: 1,
        stem: "Explain why the Parent cannot be joined directly to the Payments data store by a data flow.",
        points: ["Data must pass through a process (to be checked/recorded) before it is stored; an entity cannot write directly to a store"],
        modelAnswer: "In a DFD data cannot move directly from an entity to a store; a process must receive and record it first.",
      }),
    ],
    explanation: "(a) Entity, process, store, flow. (b) Bursar.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Follow the arrows from the solid circle.", "Square brackets hold the conditions."],
    stem: "An activity diagram for a learner borrowing a library book is described as nodes:\n\n1. Initial node → action 2.\n2. Action: *Scan learner card* → decision 3.\n3. Decision: [learner has overdue books] → action 4; [no overdue books] → action 5.\n4. Action: *Refuse loan* → final node 7.\n5. Action: *Scan book* → fork 6.\n6. Fork: *Record loan* and *Stamp return date* in parallel → join → final node 7.\n7. Final node.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What shape represents node 3?",
        options: [["A diamond", "Correct: a decision."], ["A thick bar", "That is a fork or join."], ["A bullseye", "That is the final node."], ["A solid black circle", "That is the initial node."]],
        answer: "A", explanation: "Decisions are diamonds.",
      }),
      P.tf({ label: "(b)", stem: "A learner with overdue books still has the book scanned.", answer: false, explanation: "False: the [overdue] path goes to *Refuse loan* and then ends." }),
      P.tf({ label: "(c)", stem: "*Record loan* and *Stamp return date* happen at the same time.", answer: true, explanation: "True: they leave the fork in parallel." }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Describe, in words, what happens when a learner with no overdue books borrows a book.",
        points: ["The learner's card is scanned and the system checks for overdue books", "As none are overdue, the book is scanned", "The loan is recorded and the return date stamped at the same time, then the activity ends"],
        modelAnswer: "The librarian scans the learner's card and the system checks for overdue books. As there are none, the book is scanned, and then the loan is recorded while the return date is stamped. The activity then ends.",
      }),
    ],
    explanation: "(a) Diamond. (b) False. (c) True.",
  });

  b.card("DEFINITION", "Systems analysis", "Studying the current system in detail, identifying problems and requirements, and considering alternative solutions.");
  b.card("DEFINITION", "Requirements specification", "Document listing exactly what the new system must do (functional) and the qualities it must have (non-functional).");
  b.card("CONCEPT", "Functional vs non-functional requirements", "Functional: what the system does (record loans, print lists). Non-functional: qualities such as speed, security, reliability.");
  b.card("CONCEPT", "DFD symbols", "External entity: rectangle. Process: rounded rectangle or circle. Data store: open-ended rectangle. Data flow: labelled arrow.");
  b.card("FACT", "DFD rules", "Every flow is labelled and passes through a process; no flows directly between entities, between stores, or from store to entity.");
  b.card("CONCEPT", "Activity diagram symbols", "Initial node: solid circle. Action: rounded rectangle. Decision/merge: diamond. Fork/join: thick bar. Final node: bullseye.");
  b.card("CONCEPT", "DFD vs activity diagram", "DFD: what data moves and where it is stored. Activity diagram: order of actions, decisions and parallel steps.");
  b.card("CONCEPT", "Alternative solutions", "Improve the manual system; buy an off-the-shelf package; customise a package; have a bespoke system written.");
});
