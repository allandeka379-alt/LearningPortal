// Slice w3b: documentation and user training (comp.sad.documentation-training, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.sad.documentation-training", { file: "sad/documentation-training", keyPrefix: "sad.documentation-training" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who is **technical documentation** mainly written for?",
    options: [
      ["Programmers and technicians who maintain the system", "Correct: it explains how the system was built."],
      ["Customers who buy goods from the business", "Customers do not use system documentation."],
      ["Clerks who enter data into the system each day", "Clerks need the user documentation."],
      ["Managers who approve the project's budget", "They need the feasibility report."],
    ],
    answer: "A",
    explanation: "Technical documentation is for the people who maintain, correct and improve the system.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item would be found in **user** documentation?",
    options: [
      ["Step-by-step instructions for printing a report", "Correct: users need to know how to carry out tasks."],
      ["A listing of the program code with comments", "Code belongs in technical documentation."],
      ["The data dictionary of every table", "Data structures belong in technical documentation."],
      ["The algorithms written in pseudocode", "Algorithms belong in technical documentation."],
    ],
    answer: "A",
    explanation: "User documentation explains how to use the system to do tasks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is technical documentation especially important when the original programmer leaves the company?",
    options: [
      ["A new programmer can understand the system and maintain it", "Correct: the knowledge is kept in writing."],
      ["Users can learn how to log in to the system", "That is in user documentation."],
      ["It stops the system from ever needing changes", "All systems need maintenance."],
      ["It replaces the need to test the system", "Testing is still needed."],
    ],
    answer: "A",
    explanation: "Without technical documentation, a new programmer would struggle to fix or change the system.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A clerk sees the message *Database locked by another user*. Which section of the user guide should she read?",
    options: [
      ["Troubleshooting (error messages)", "Correct: it explains error messages and what to do."],
      ["Glossary of terms", "A glossary explains words, not errors."],
      ["Hardware requirements", "This lists equipment needed."],
      ["Version history", "This belongs in technical documentation."],
    ],
    answer: "A",
    explanation: "The troubleshooting section lists error messages with their causes and solutions.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens if staff do not know how to use a system?"],
    stem: "Which is the **main** reason for training users before a new system goes live?",
    options: [
      ["So they use it correctly and make fewer errors", "Correct: trained users enter data accurately and efficiently."],
      ["So the programmers can stop writing documentation", "Documentation is still needed."],
      ["So the hardware lasts longer", "Training does not affect hardware life."],
      ["So the system needs no backups", "Backups are still needed."],
    ],
    answer: "A",
    explanation: "Training reduces errors, increases efficiency and helps users accept the new system.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Who is spread out, and who needs to learn at their own pace?"],
    stem: "A bank must train 300 tellers in branches across Zimbabwe on a new feature. Which training method is **most** practical?",
    options: [
      ["Online video tutorials and e-learning", "Correct: staff in every branch can learn at their own pace without travel."],
      ["One classroom course in Harare for all 300 tellers", "Bringing 300 staff to one place is costly and closes branches."],
      ["The programmer visits each teller in turn", "This would take far too long."],
      ["Giving each teller the program listing", "Tellers do not need the code."],
    ],
    answer: "A",
    explanation: "E-learning suits large numbers of staff spread over many places.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which disadvantage applies to self-study?"],
    stem: "A shop gives its staff only the user manual instead of a training course. What is the **most likely** problem?",
    options: [
      ["Some staff will not read it and will make mistakes", "Correct: self-study relies on staff reading the manual."],
      ["The manual will cost more than the course", "A manual is usually much cheaper."],
      ["The staff will be away from work for several days", "This is a disadvantage of a course, not a manual."],
      ["The manual will contain program listings", "A user manual should not contain code."],
    ],
    answer: "A",
    explanation: "Manuals are cheap and always available, but some users never read them and have no one to ask.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "User documentation should be written in plain, non-technical language.",
    answer: true,
    explanation: "True. Users are not programmers, so instructions must be simple, clear and illustrated.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All documentation is written only after the system has been fully installed.",
    answer: false,
    explanation: "False. Documentation is built up throughout the project (requirements, designs, test results) and completed at implementation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each item as user or technical documentation.",
    pairs: ["How to log in and change your password", "Program listing with comments", "Frequently asked questions", "Test data and test results"],
    right: ["User documentation", "Technical documentation"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Log-in instructions and FAQs are for users; code and test results are for programmers.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Think about cost, pace and where it happens."],
    stem: "Match each training method to an advantage.",
    pairs: [
      ["Instructor-led course", "Questions are answered immediately"],
      ["On-the-job training", "Skills are learnt in the real work situation"],
      ["E-learning", "Staff learn at their own pace and time"],
      ["Help screens", "Help is always available inside the program"],
    ],
    explanation: "Course: immediate answers. On-the-job: real situation. E-learning: own pace. Help screens: always there.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["One lists meanings of words; one lists past changes."],
    stem: "Complete the sentences.",
    template: "The section of a user guide that explains unfamiliar words is the {{blank:a}}. The part of the technical documentation that records what has changed in each release is the version {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["glossary"], choices: ["glossary", "index", "listing", "appendix"] },
      { id: "b", accepted: ["history"], choices: ["history", "control", "number", "check"] },
    ],
    explanation: "Glossary; version history.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the other name for the printed user documentation that explains how to operate a system (two words).",
    accepted: ["user guide", "user manual", "users guide", "user's guide", "user's manual", "users manual"],
    wrong: ["program listing"],
    explanation: "User documentation is often called the user guide or user manual.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["What does a programmer need to change the system?"],
    stem: "State **four** items that should be included in technical documentation.",
    points: [
      "Program listings with comments / algorithms (pseudocode, flowcharts)",
      "File structures / data dictionary / database design",
      "System flowcharts / DFDs / requirements specification",
      "Test plan and results / hardware and software requirements / known bugs / version history",
    ],
    explanation: "Technical documentation records how the system was designed, built and tested.",
    modelAnswer: "The commented program code, the data dictionary showing each table and field, the system flowchart, and the test plan with its test data and results.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Different users do different jobs.", "Give a consequence for each reason."],
    stem: "Explain why different users of a new hospital system need different training, and why training is important for the hospital.",
    points: [
      "Different users do different tasks (e.g. receptionists book, doctors record diagnoses, technicians do backups)",
      "So each group is trained in the features they use / access levels differ",
      "Importance: fewer data entry errors (e.g. wrong patient records)",
      "Importance: efficient use / user acceptance / security awareness",
    ],
    explanation: "Training should match each user's job, and it reduces errors and resistance.",
    modelAnswer: "Receptionists only book appointments, while doctors record diagnoses and technicians manage backups, so each group needs training in the features it uses. Training means fewer mistakes in patients' records, staff work faster, and they accept the new system instead of resisting it.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Users need tasks; programmers need structure and code.", "Weigh cost against effectiveness."],
    stem: "Chipo's Supermarket (fictional) in Bulawayo is installing a new point-of-sale system in its four branches. It employs 30 cashiers and one IT technician.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which document does the IT technician need to change the discount rules in the code?",
        options: [["Technical documentation", "Correct: it explains the code and data structures."], ["User documentation", "It explains how to use the system."], ["The feasibility report", "This is an early project document."], ["The questionnaire results", "These are fact-finding results."]],
        answer: "A", explanation: "Changing code needs technical documentation.",
      }),
      P.match({
        label: "(b)", stem: "Classify each item for the supermarket's documentation.",
        pairs: ["How to void an item on a sale", "Structure of the Products table", "What to do if the scanner stops working"],
        right: ["User documentation", "Technical documentation"],
        rightIndex: [0, 1, 0],
        explanation: "Voiding a sale and scanner troubleshooting: user. Table structure: technical.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Recommend a training method for the 30 cashiers and justify it.",
        points: ["A suitable method (e.g. hands-on instructor-led session / on-the-job training at the till)", "Justification linked to the scenario (practice on real tills / questions answered / little time away from work)"],
        modelAnswer: "On-the-job training at the tills, given by a trained supervisor in each branch, because cashiers learn on the real equipment and the shops stay open.",
      }),
    ],
    explanation: "(a) Technical documentation. (b) User, technical, user.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["Think about format and audience."],
    stem: "A Gweru software company is writing user documentation for a farm records app used by farmers with little computer experience.",
    parts: [
      P.tf({ label: "(a)", stem: "The user guide should include the data dictionary of the app's database.", answer: false, explanation: "False: farmers do not need data structures; that is technical documentation." }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **four** features that would make the user documentation suitable for these farmers.",
        points: ["Plain, non-technical language / glossary for any terms", "Step-by-step instructions with screenshots or pictures", "Short videos or built-in help screens / available offline", "Troubleshooting / FAQs / index and contact details for support"],
        modelAnswer: "It should use plain language with a glossary, give step-by-step instructions with screenshots, include short videos that work offline, and have a troubleshooting section with a phone number for support.",
      }),
    ],
    explanation: "(a) False.",
  });

  b.card("DEFINITION", "User documentation", "Written for users: how to operate the system to do their tasks, in plain language (user guide/manual, help screens).");
  b.card("DEFINITION", "Technical documentation", "Written for programmers and technicians: how the system was designed and built, so it can be maintained.");
  b.card("CONCEPT", "Contents of user documentation", "Purpose; requirements; installing and starting; step-by-step tasks with screenshots; examples; backups; troubleshooting; FAQs; glossary; index; support contacts.");
  b.card("CONCEPT", "Contents of technical documentation", "Requirements; system flowcharts and DFDs; algorithms; commented code; data dictionary; variables; hardware/software; test plan and results; limitations; version history.");
  b.card("CONCEPT", "Why technical documentation matters", "Lets a different programmer maintain, fix and improve the system if the developer leaves.");
  b.card("CONCEPT", "Why train users", "Fewer errors; efficient use of all features; confidence and acceptance; security awareness; fewer help-desk calls.");
  b.card("CONCEPT", "Training methods", "Instructor-led course; on-the-job; e-learning and videos; manuals and help screens. Match the method to the number, location and needs of users.");
  b.card("FACT", "When documentation is written", "Built up throughout the project (requirements, designs, test results) and completed during implementation.");
});
