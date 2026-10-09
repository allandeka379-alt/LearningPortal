// Slice w4a: problem decomposition and the program development life cycle (comp.algorithms.decomposition-pdlc).
import { concept, P, CAM, ZIM } from "../lib.mjs";

// A structure diagram used in two items; the counts are computed from the tree.
const busTree = {
  name: "Bus booking system",
  kids: [
    { name: "Manage routes", kids: [{ name: "Add route" }, { name: "Change fare" }] },
    { name: "Sell ticket", kids: [{ name: "Choose route" }, { name: "Choose seat" }, { name: "Take payment" }, { name: "Print ticket" }] },
    { name: "Produce reports", kids: [{ name: "Daily takings" }, { name: "Seats sold per route" }] },
  ],
};
const treeMd = (n, depth = 0) => [`${"  ".repeat(depth)}- ${n.name}`, ...(n.kids ?? []).flatMap((k) => treeMd(k, depth + 1))];
const busMd = treeMd(busTree).join("\n");
const leaves = (n) => (n.kids ? n.kids.reduce((s, k) => s + leaves(k), 0) : 1);
const busLevel2 = busTree.kids.length;
const busLeaves = leaves(busTree);
const sellKids = busTree.kids[1].kids.length;

concept("comp.algorithms.decomposition-pdlc", { file: "algorithms/decomposition-pdlc", keyPrefix: "algorithms.decomposition-pdlc" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which list gives the stages of the program development life cycle in the correct order?",
    options: [
      ["Analysis, design, coding, testing", "Correct: the problem is understood, planned, coded and then tested."],
      ["Design, analysis, testing, coding", "The problem must be analysed before a solution can be designed."],
      ["Coding, analysis, design, testing", "Coding before analysis means writing a program without knowing the requirements."],
      ["Analysis, coding, design, testing", "The solution is designed before it is coded."],
    ],
    answer: "A",
    explanation: "The four stages are analysis, design, coding and testing, in that order, repeated when problems are found.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which stage of the program development life cycle is a structure diagram produced?",
    options: [
      ["Design", "Correct: structure diagrams, flowcharts and pseudocode are design tools."],
      ["Analysis", "Analysis identifies the problem and requirements; the solution is planned in design."],
      ["Coding", "Coding turns the design into program code."],
      ["Testing", "Testing runs the finished code with test data."],
    ],
    answer: "A",
    explanation: "The design stage plans how the program will work, using structure diagrams, flowcharts and pseudocode.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A programmer leaves out learners' home addresses when planning a homework-tracking program, because the program does not need them. What is this an example of?",
    options: [
      ["Abstraction", "Correct: unnecessary detail is removed."],
      ["Decomposition", "Decomposition splits the problem into parts; here detail is removed."],
      ["Iterative testing", "Iterative testing is repeated testing of code while it is written."],
      ["Validation", "Validation checks that input data is sensible."],
    ],
    answer: "A",
    explanation: "Abstraction keeps only the information needed to solve the problem and removes the rest.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **iterative testing** during the coding stage?",
    options: [
      ["Each module is tested and corrected repeatedly as it is written", "Correct: test, fix and retest while coding."],
      ["The whole program is tested once when coding is complete", "That describes final testing in the testing stage."],
      ["The program is tested only with normal data", "Iterative testing is about when testing happens, not the type of data."],
      ["The user tests the program after it has been installed", "That is acceptance testing after the life cycle."],
    ],
    answer: "A",
    explanation: "In iterative testing each part is tested, corrected and tested again during coding, so errors are found early.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which task belongs to the **analysis** stage?",
    options: [
      ["Identifying the requirements of the program", "Correct: analysis finds out what the program must do."],
      ["Writing pseudocode for each module", "Pseudocode is written in the design stage."],
      ["Writing the program in a high-level language", "That is the coding stage."],
      ["Running the program with boundary data", "That is the testing stage."],
    ],
    answer: "A",
    explanation: "Analysis identifies the problem and its requirements, using abstraction and decomposition.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which approach starts from the whole problem?"],
    stem: "Chipo starts with the whole problem \"run the school library\" and keeps splitting each part into smaller parts until each one can be coded. Which approach is she using?",
    options: [
      ["Top-down design", "Correct: she starts at the top (the whole system) and works down."],
      ["Bottom-up design", "Bottom-up starts with small modules and combines them."],
      ["Abstraction", "Abstraction removes detail; she is splitting the problem."],
      ["Iterative testing", "No code is being tested yet."],
    ],
    answer: "A",
    explanation: "Top-down design begins with the whole problem and repeatedly decomposes it into smaller sub-problems.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["A process changes or works on data; storage keeps it."],
    stem: "A program for a clinic in Masvingo records each patient's temperature, works out whether it is above 37.5 °C, displays a warning and saves the reading in a file. Which item is a **process**?",
    options: [
      ["Deciding if the reading is above 37.5 °C", "Correct: comparing the reading is processing."],
      ["The temperature typed in by the nurse", "That is an input."],
      ["The warning shown on the screen", "That is an output."],
      ["The file in which every reading is saved", "That is storage."],
    ],
    answer: "A",
    explanation: "Inputs go in, processes act on the data (calculations and decisions), outputs come out, storage keeps data for later.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Think about what happens when several programmers share the work."],
    stem: "Which is a benefit of decomposing a large program into sub-systems?",
    options: [
      ["Several programmers can work on parts at once", "Correct: the parts are independent enough to share out."],
      ["The program no longer needs to be tested", "Every part, and the whole, must still be tested."],
      ["The finished program always runs faster", "Decomposition makes development easier; it does not guarantee speed."],
      ["The design stage can be skipped completely", "Decomposition is part of analysis and design."],
    ],
    answer: "A",
    explanation: "Small parts are easier to understand, share out, test, debug and reuse.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A sub-system can itself be made up of further sub-systems.",
    answer: true,
    explanation: "True. Systems are decomposed level by level; each sub-system can be split again until the parts are simple.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the Cambridge program development life cycle, maintenance is the fifth stage, after testing.",
    answer: false,
    explanation: "False. The 0478 program development life cycle has four stages: analysis, design, coding and testing.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each task to the stage of the program development life cycle in which it is done.",
    pairs: ["Removing unnecessary detail from the problem", "Producing a flowchart of the solution", "Writing the program in Python and testing each module", "Running the finished program with abnormal data"],
    right: ["Analysis", "Design", "Coding", "Testing"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Abstraction: analysis. Flowchart: design. Writing code with iterative testing: coding. Test data: testing.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Does the item go in, get worked on, come out, or get kept?"],
    stem: "A bakery in Bulawayo uses a program to take orders: the clerk types the customer's order, the program works out the cost, prints a receipt and keeps every order in a file for the month's records. Classify each item.",
    pairs: ["Number of loaves ordered", "Calculating the total cost", "The printed receipt", "The file of the month's orders"],
    right: ["Input", "Process", "Output", "Storage"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Typed data is input; the calculation is a process; the receipt is output; the file is storage.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about the program development life cycle.",
    template: "Identifying the requirements is done in {{blank:a}}. Structure diagrams and pseudocode are produced in {{blank:b}}. Test data is used to check the whole program in {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["analysis"], choices: ["analysis", "design", "coding", "testing"] },
      { id: "b", accepted: ["design"], choices: ["analysis", "design", "coding", "testing"] },
      { id: "c", accepted: ["testing"], choices: ["analysis", "design", "coding", "testing"] },
    ],
    explanation: "Requirements: analysis. Structure diagrams and pseudocode: design. Test data on the whole program: testing.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A structure diagram is written as an indented list (each indent is one level down):\n\n${busMd}\n\nHow many sub-systems are on the level directly below "Bus booking system"?`,
    value: busLevel2,
    wrong: [busLeaves],
    explanation: `The second level holds ${busTree.kids.map((k) => `"${k.name}"`).join(", ")}: ${busLevel2} sub-systems.`,
    workedSolution: `1. Find the boxes indented exactly one level below the top box.
2. ${busTree.kids.map((k) => k.name).join(", ")}.
3. Count: ${busLevel2}.`,
  });
  b.num({
    d: 3, skill: "ANALYSIS",
    hints: ["Bottom-level boxes have nothing indented below them.", "Count them under every second-level box."],
    stem: `Use the same structure diagram:\n\n${busMd}\n\nEach bottom-level box will become one module. How many modules will be written?`,
    value: busLeaves,
    wrong: [busLevel2],
    explanation: `Bottom-level boxes: ${busTree.kids.map((k) => `${k.kids.length} under "${k.name}"`).join(", ")}, so ${busLeaves} modules.`,
    workedSolution: `1. Count the boxes with nothing below them under each second-level box: ${busTree.kids.map((k) => k.kids.length).join(" + ")}.
2. Total: ${busLeaves} modules.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the term for breaking a complex problem down into smaller sub-problems.",
    accepted: ["decomposition", "problem decomposition", "top-down design", "top down design", "decomposing"],
    rejected: ["abstraction"],
    wrong: ["abstraction"],
    explanation: "Decomposition (as in top-down design) splits the problem into smaller sub-problems.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["One benefit and one drawback, or two benefits each explained."],
    stem: "Compare top-down design with bottom-up design.",
    points: [
      "Top-down starts with the whole problem and splits it into smaller and smaller sub-problems",
      "Bottom-up starts with small (existing / tested) modules and combines them into larger parts until the whole system is built",
    ],
    explanation: "The direction is the key difference: top-down works from the whole to the parts, bottom-up from the parts to the whole.",
    modelAnswer: "Top-down design starts with the whole problem and repeatedly decomposes it into sub-problems until each one can be coded. Bottom-up design starts with small modules, often already written and tested, and combines them into larger parts until the whole system exists.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Take the inputs, processes and outputs from the wording of the scenario.", "Storage is anything kept for later use."],
    stem: "Rudo is planning a program for her school's tuck-shop in Mutare. The cashier types the code of each item sold and the quantity. The program finds the item's price in a price list, calculates the cost and adds it to the day's takings. It shows the cost on screen and, at closing time, prints a report of the day's takings, which is also saved.\n\nIdentify **one** input, **one** process, **one** output and **one** item of storage for this program.",
    points: [
      "Input: item code or quantity",
      "Process: look up the price / calculate the cost (price × quantity) / add the cost to the day's takings",
      "Output: cost displayed on screen / printed report of the day's takings",
      "Storage: the price list / the saved report or record of takings",
    ],
    explanation: "Take each part from the scenario: what is typed in, what is calculated or decided, what is shown or printed, and what is kept.",
    modelAnswer: "Input: the quantity sold. Process: calculating the cost as price × quantity. Output: the cost shown on the screen. Storage: the price list of items.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540,
    hints: ["Use the stage names exactly.", "A structure diagram's second level is the main jobs."],
    stem: "A transport company in Harare wants a program to sell bus tickets. A programmer follows the program development life cycle.",
    parts: [
      P.mcq({
        label: "(a)", stem: "During which stage does the programmer interview the booking clerks to find out what the program must do?",
        options: [["Analysis", "Correct: finding the requirements."], ["Design", "Design plans the solution once the requirements are known."], ["Coding", "No code is written in an interview."], ["Testing", "There is nothing to test yet."]],
        answer: "A", explanation: "Finding the requirements is analysis.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe **two** tasks carried out in the design stage.",
        points: ["Decomposing the problem / drawing a structure diagram", "Producing flowcharts or pseudocode for the algorithms (or designing the data and screens)"],
        modelAnswer: "The programmer decomposes the system and draws a structure diagram, then writes pseudocode or draws flowcharts for each module.",
      }),
      P.num({
        label: "(c)", stem: `The programmer's structure diagram is:\n\n${busMd}\n\nHow many sub-systems are shown directly below "Sell ticket"?`,
        value: sellKids, wrong: [busLeaves],
        explanation: `"Sell ticket" has ${sellKids} boxes below it.`,
        workedSolution: `1. Boxes indented under "Sell ticket": ${busTree.kids[1].kids.map((k) => k.name).join(", ")}.
2. Count: ${sellKids}.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the programmer tests each module during the coding stage instead of waiting until the whole program is written.",
        points: ["Errors are found in a small module, so they are easier to locate and fix", "A tested module can be relied on when the next modules are added / errors do not build up"],
        modelAnswer: "If each module is tested as it is written, any error must be in that small piece of code, so it is quick to find and fix, and later modules are built on parts that are known to work.",
      }),
    ],
    explanation: "(a) Analysis. (c) " + sellKids + " sub-systems.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 5, secs: 450,
    hints: ["Abstraction removes, decomposition splits.", "Think about what is kept for later use."],
    stem: "Tatenda is writing a program that records the times of runners in a school athletics competition in Gweru, finds the winner of each race and keeps the results for the end-of-year awards.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Tatenda decides that the runners' shoe sizes are not needed. What is this?",
        options: [["Abstraction", "Correct: irrelevant detail is removed."], ["Decomposition", "Nothing is being split into parts."], ["Coding", "No code is being written."], ["Verification", "Verification checks data was copied correctly."]],
        answer: "A", explanation: "Removing unneeded detail is abstraction.",
      }),
      P.match({
        label: "(b)", stem: "Classify each item.",
        pairs: ["Each runner's time", "Finding the fastest time in each race", "The saved results of every race"],
        right: ["Input", "Process", "Output", "Storage"],
        rightIndex: [0, 1, 3],
        explanation: "Time typed in: input. Finding the fastest: process. Saved results: storage.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "State **one** output of the program.",
        points: ["The winner (name / time) of each race, or a results list displayed or printed"],
        modelAnswer: "The name and time of the winner of each race, displayed on screen.",
      }),
    ],
    explanation: "(a) Abstraction. (b) Input, process, storage.",
  });

  b.card("DEFINITION", "Program development life cycle", "The stages followed to produce a program: analysis, design, coding and testing (repeated when problems are found).");
  b.card("CONCEPT", "Analysis stage", "Identify the problem and the requirements; use abstraction and decomposition.");
  b.card("CONCEPT", "Design stage", "Plan the solution: decomposition, structure diagrams, flowcharts, pseudocode, data and interface design.");
  b.card("CONCEPT", "Coding and testing stages", "Coding: write the program with iterative testing of each module. Testing: run the whole program with normal, abnormal, extreme and boundary data.");
  b.card("DEFINITION", "Abstraction", "Removing unnecessary detail so only the information needed to solve the problem remains.");
  b.card("DEFINITION", "Decomposition", "Breaking a complex problem into smaller sub-problems that can each be solved separately.");
  b.card("CONCEPT", "Inputs, processes, outputs, storage", "The four parts of a decomposed problem: data in, what is done to it, information out, data kept for later.");
  b.card("DEFINITION", "Structure diagram", "Shows a system broken into sub-systems level by level; each bottom-level box becomes a module.");
  b.card("CONCEPT", "Top-down vs bottom-up design", "Top-down: split the whole problem into smaller parts. Bottom-up: build small modules first and combine them into the whole.", "ZIMSEC asks for a top-down approach.");
});
