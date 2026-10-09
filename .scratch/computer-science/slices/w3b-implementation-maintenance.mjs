// Slice w3b: implementation, evaluation and maintenance (comp.sad.implementation-maintenance, ZIMSEC only).
import { concept, P } from "../lib.mjs";

// Evaluation: objective "fewer than 3 complaints a week"; measured complaints over 4 weeks.
const complaints = [4, 2, 1, 1];
const avgComplaints = complaints.reduce((a, b) => a + b, 0) / complaints.length;
// Parallel running cost: staff overtime.
const staff = 6, hoursPerDay = 2, days = 20, rate = 3; // USD per hour
const overtime = staff * hoursPerDay * days * rate;

concept("comp.sad.implementation-maintenance", { file: "sad/implementation-maintenance", keyPrefix: "sad.implementation-maintenance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which changeover method are the old and new systems run **at the same time**?",
    options: [
      ["Parallel running", "Correct: both systems process the same data."],
      ["Direct changeover", "The old system stops when the new one starts."],
      ["Phased implementation", "One part is introduced at a time."],
      ["Pilot implementation", "One location tries the system first."],
    ],
    answer: "A",
    explanation: "Parallel running keeps the old system going alongside the new one.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main **disadvantage** of direct changeover?",
    options: [
      ["If the new system fails there is no old system to fall back on", "Correct: it is the riskiest method."],
      ["Staff must do all of their work twice, once on each system, for several weeks", "That is a disadvantage of parallel running."],
      ["It takes a long time to reach every branch", "That applies to pilot implementation."],
      ["It is the most expensive changeover method", "Direct changeover is the cheapest."],
    ],
    answer: "A",
    explanation: "Direct changeover is quick and cheap but has no fallback if the new system fails.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A supermarket installs its new till system in its Mutare branch only, then in the other branches once it works well. Which method is this?",
    options: [
      ["Pilot implementation", "Correct: the whole system is tried in one location first."],
      ["Phased implementation", "Phased introduces one part of the system at a time everywhere."],
      ["Parallel running", "Parallel runs old and new together."],
      ["Direct changeover", "Direct switches everything at once."],
    ],
    answer: "A",
    explanation: "Trying the whole system in one branch first is a pilot.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Changing a payroll system because the government has introduced a new tax rate is an example of:",
    options: [
      ["Adaptive maintenance", "Correct: the system is adapted to a change in its environment."],
      ["Corrective maintenance", "There was no error in the system."],
      ["Perfective maintenance", "This is not an improvement requested by users."],
      ["Parallel running", "This is a changeover method."],
    ],
    answer: "A",
    explanation: "Adaptive maintenance responds to changes such as new laws, rates or hardware.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which method is safest when errors could be life-threatening?"],
    stem: "A district hospital is replacing its patient medication records system. Which changeover method is **most** suitable?",
    options: [
      ["Parallel running", "Correct: the old system remains as a fallback and results can be compared."],
      ["Direct changeover", "Too risky where errors could harm patients."],
      ["A changeover with no testing to save time", "Not a valid method."],
      ["Switching off both systems for a week", "Patients would be put at risk."],
    ],
    answer: "A",
    explanation: "Where data is critical, the safety of parallel running justifies its cost.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["One part everywhere, or everything in one place?"],
    stem: "Which statement correctly describes **phased** implementation?",
    options: [
      ["One module at a time is introduced across the whole organisation", "Correct: e.g. stock first, then sales, then payroll."],
      ["The whole system is introduced in one branch first", "That is a pilot."],
      ["The old and new systems run together for a month", "That is parallel running."],
      ["The old system is switched off as the new one starts", "That is direct changeover."],
    ],
    answer: "A",
    explanation: "Phased implementation introduces the new system part by part.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What is the evaluation measured against?"],
    stem: "During evaluation, a new system is mainly compared with:",
    options: [
      ["The objectives and requirements set at the start", "Correct: evaluation checks whether these were met."],
      ["The systems of competing companies", "Comparisons with competitors are not the main purpose."],
      ["The price of the hardware and software bought for the new system", "Cost is only one part, compared with the feasibility predictions."],
      ["The number of lines of program code", "Code length says nothing about meeting needs."],
    ],
    answer: "A",
    explanation: "Evaluation judges the system against its original objectives and the requirements specification.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Consider cost, risk and the number of parts."],
    stem: "A small school with one office is adding fees, marks and library modules. Staff are already busy, and the budget is small. Which changeover is **best**?",
    options: [
      ["Phased: introduce one module each term", "Correct: staff learn one part at a time with no double work."],
      ["Parallel: run all three modules alongside paper records", "Double work would overload busy staff and cost more."],
      ["Pilot: try the system in one branch first", "There is only one office, so a pilot is not possible."],
      ["Direct: switch all three modules on the same day", "Too much change at once for busy staff, with no fallback."],
    ],
    answer: "A",
    explanation: "Separate modules, busy staff and a small budget suit a phased introduction.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Parallel running is the safest changeover method but also the most expensive.",
    answer: true,
    explanation: "True. The old system is a fallback, but staff must do all the work twice.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Fixing a bug that makes the system crash when a date is left blank is perfective maintenance.",
    answer: false,
    explanation: "False. Fixing an error is corrective maintenance; perfective maintenance improves a system that already works.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of maintenance to an example.",
    pairs: [
      ["Corrective", "Fixing a total that is calculated wrongly"],
      ["Adaptive", "Updating the system to run on a new operating system"],
      ["Perfective", "Adding a search box that users have asked for"],
    ],
    explanation: "Corrective: errors. Adaptive: changes in the environment. Perfective: improvements.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Each advantage belongs to one method."],
    stem: "Match each changeover method to an advantage.",
    pairs: [
      ["Direct", "Quickest and cheapest; benefits are immediate"],
      ["Parallel", "Results can be compared with the old system"],
      ["Phased", "Staff learn one part of the system at a time"],
      ["Pilot", "Problems are found in one location before full roll-out"],
    ],
    explanation: "Direct: cheap and fast. Parallel: comparison and fallback. Phased: one part at a time. Pilot: one location first.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["Moving old records into the new files."],
    stem: "Complete the sentences about implementation.",
    template: "Transferring existing records into the files of the new system is called data {{blank:a}}. After the records are loaded they should be {{blank:b}} to make sure they were copied accurately.",
    blanks: [
      { id: "a", accepted: ["conversion"], choices: ["conversion", "compression", "encryption", "validation"] },
      { id: "b", accepted: ["verified"], choices: ["verified", "encrypted", "deleted", "compressed"] },
    ],
    explanation: "Data conversion; the loaded data is verified against the originals.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Multiply staff × hours × days × rate."],
    stem: `During ${days} working days of parallel running, ${staff} clerks each work ${hoursPerDay} hours of overtime a day at USD ${rate} an hour. What is the total overtime cost in USD?`,
    value: overtime,
    wrong: [staff * hoursPerDay * days],
    explanation: `${staff} × ${hoursPerDay} × ${days} × ${rate} = ${overtime}.`,
    workedSolution: `1. Overtime hours: ${staff} × ${hoursPerDay} × ${days} = ${staff * hoursPerDay * days}.\n2. Cost: ${staff * hoursPerDay * days} × ${rate} = USD ${overtime}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["What must happen before users can work on the new system?"],
    stem: "Describe **four** activities carried out during the implementation stage.",
    points: [
      "Installing the hardware (and preparing the site)",
      "Installing the software",
      "Converting / loading existing data into the new system (and verifying it)",
      "Training users / completing documentation / changing over from the old system",
    ],
    explanation: "Implementation puts the tested system into use.",
    modelAnswer: "The new computers and network are installed, the software is installed and configured, existing records are converted and loaded into the new files and checked, and users are trained before the changeover.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    hints: ["Compare the measured value with the objective."],
    stem: `A help-desk system had the objective *fewer than 3 complaints a week*. In its first four weeks the complaints were ${complaints.join(", ")}. Evaluate whether the objective was met and suggest what the analyst should do next.`,
    points: [
      `Calculates or describes the average (${avgComplaints} a week) or notes that week 1 had ${complaints[0]}`,
      "Judges: met on average / in later weeks, but not in the first week (improving trend)",
      "Next step: investigate early complaints / gather user feedback / recommend improvements or extra training",
    ],
    explanation: `The average is ${avgComplaints}, below 3, but week 1 exceeded the target.`,
    modelAnswer: `The average was ${avgComplaints} complaints a week, so the objective was met overall, and complaints fell after the first week (${complaints[0]}). The analyst should find out what caused the early complaints, perhaps a lack of training, and keep monitoring.`,
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["How many branches? How critical is the data?"],
    stem: "Zambezi Building Society (fictional) has eight branches. It is replacing its savings accounts system. Customers' balances must never be wrong.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which method would allow the society to try the system in the Masvingo branch before the others?",
        options: [["Pilot", "Correct."], ["Phased", "Phased introduces modules one at a time."], ["Direct", "Direct switches over everywhere at once."], ["Parallel", "Parallel runs both systems together."]],
        answer: "A", explanation: "A pilot tries the whole system in one location.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "The manager suggests direct changeover in all branches. Explain **why** this is not suitable and recommend an alternative.",
        points: ["Direct has no fallback: if the system fails, balances could be lost or wrong", "Balances must never be wrong, so risk must be low / customers would be affected in all eight branches", "Recommends parallel running (or pilot then parallel) with a reason"],
        modelAnswer: "If the new system failed after a direct changeover there would be no old system to fall back on, and wrong balances would affect customers in all eight branches. The society should use parallel running, at least in a pilot branch, so the new balances can be checked against the old system.",
      }),
      P.match({
        label: "(c)", stem: "After a year, three changes are made. Classify each.",
        pairs: ["Interest is calculated wrongly for accounts opened in a leap year", "A new central bank rule requires an extra report", "Customers can now view their balance on a phone"],
        right: ["Corrective", "Adaptive", "Perfective"],
        rightIndex: [0, 1, 2],
        explanation: "Wrong calculation: corrective. New rule: adaptive. New feature: perfective.",
      }),
    ],
    explanation: "(a) Pilot. (c) Corrective, adaptive, perfective.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 6,
    hints: ["Compare each measured result with its objective."],
    stem: "A Harare courier company's new tracking system had these objectives: (1) a parcel's location found in under 10 seconds; (2) fewer than 2 lost parcels a month; (3) every driver able to use the app without help. After three months: location found in 4 seconds; 3 parcels lost a month; 18 of 20 drivers use the app without help.",
    parts: [
      P.match({
        label: "(a)", stem: "Decide whether each objective has been met.",
        pairs: ["Objective 1", "Objective 2", "Objective 3"],
        right: ["Met", "Not met"],
        rightIndex: [0, 1, 1],
        explanation: "4 s < 10 s: met. 3 is not fewer than 2: not met. 18 of 20 is not every driver: not met.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Recommend improvements for the objectives that were not met.",
        points: ["Objective 2: investigate why parcels are lost (e.g. add scanning at each hand-over / validation)", "Objective 3: extra training / simpler app screens / help screens for the two drivers", "Recommend further review / perfective maintenance with a reason"],
        modelAnswer: "To reduce lost parcels, require drivers to scan each parcel at every hand-over so its last location is always known. Give the two drivers extra training and add help screens to the app. Review the system again after three months.",
      }),
    ],
    explanation: "(a) Met, not met, not met.",
  });

  b.card("DEFINITION", "Implementation", "Installing hardware and software, converting data, training users and changing over to the new system.");
  b.card("CONCEPT", "Direct changeover", "Old system stops, new starts at once. + quick, cheap. − no fallback; highest risk.");
  b.card("CONCEPT", "Parallel running", "Old and new run together on the same data. + safest; results compared. − most expensive; double work.");
  b.card("CONCEPT", "Phased implementation", "One part (module) at a time across the organisation. + one part at risk; gradual learning. − slow; parts must work together.");
  b.card("CONCEPT", "Pilot implementation", "Whole system in one branch first, then rolled out. + only one branch at risk; pilot staff train others. − slow; pilot may not be typical.");
  b.card("DEFINITION", "Evaluation", "Reviewing the system in use against its objectives and requirements, with user feedback, to identify improvements.");
  b.card("CONCEPT", "Corrective maintenance", "Fixing errors (bugs) not found in testing.");
  b.card("CONCEPT", "Adaptive maintenance", "Changing the system for changes in its environment: new laws, tax rates, hardware or operating systems.");
  b.card("CONCEPT", "Perfective maintenance", "Improving a working system: better performance or new features users want.");
});
