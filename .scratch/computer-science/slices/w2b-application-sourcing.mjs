// Slice w2b: off-the-shelf, customised and open-source software (comp.software.application-sourcing, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.software.application-sourcing", { file: "software/application-sourcing", keyPrefix: "software.application-sourcing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **customised (bespoke)** software?",
    options: [
      ["Software written specially to meet the needs of one organisation", "Correct: it is designed around one client's exact requirements."],
      ["Software sold ready-made to many users with similar needs", "That describes off-the-shelf (generic) software."],
      ["Software whose source code anyone may study and change", "That describes open-source software."],
      ["Software that may be tried free for 30 days before paying", "That describes shareware."],
    ],
    answer: "A",
    explanation: "Customised or bespoke software is written (or adapted) for one organisation's requirements.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feature defines **open-source** software?",
    options: [
      ["Its source code is available for anyone to study, change and share", "Correct: access to the source code is the defining feature."],
      ["It can only be bought from a software shop on an installation disc", "How software is delivered does not make it open-source."],
      ["It is written specially for one company and is never sold to others", "That describes bespoke software."],
      ["It never contains any errors", "No software is guaranteed error-free."],
    ],
    answer: "A",
    explanation: "Open-source software publishes its source code under a licence that allows it to be studied, changed and shared.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is off-the-shelf software usually cheaper than customised software?",
    options: [
      ["The development cost is shared among many buyers", "Correct: one program is sold to thousands of customers."],
      ["It is always written in a cheaper programming language", "The language used does not explain the price."],
      ["It has no licence conditions", "Off-the-shelf software usually has a licence."],
      ["It is never updated after it is sold", "Most off-the-shelf packages receive updates."],
    ],
    answer: "A",
    explanation: "With off-the-shelf software, many customers pay for the same program, so each pays a small part of the development cost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of customised software?",
    options: [
      ["It takes a long time to develop before it can be used", "Correct: analysis, programming and testing must all happen first."],
      ["It contains many features the organisation does not need", "That is a drawback of off-the-shelf software."],
      ["The organisation must change how it works to fit it", "Bespoke software is built to fit the organisation, so this is an off-the-shelf drawback."],
      ["Its source code is published for anyone to read", "That describes open-source software."],
    ],
    answer: "A",
    explanation: "Bespoke software is expensive and slow to develop, and help comes only from its developers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Sipho downloads a program that he may use free for 30 days, after which he is asked to pay. What type of software is this?",
    options: [
      ["Shareware", "Correct: try before you buy."],
      ["Freeware", "Freeware stays free with no request for payment."],
      ["Open-source software", "Open-source software publishes its code; a time-limited trial is not the defining feature."],
      ["Customised software", "It was not written for Sipho alone."],
    ],
    answer: "A",
    explanation: "Shareware is distributed free for a trial period or with limited features; the user pays to keep using it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Are the needs general or unique? Is the budget large or small?"],
    stem: "A primary school in Mutare with a very small budget wants software to type letters and newsletters. Which choice is most suitable?",
    options: [
      ["A free open-source office suite", "Correct: general needs, no licence fee."],
      ["Customised software written by a programming company", "Far too expensive and slow for general needs that existing packages meet."],
      ["A trial version that stops working after 30 days", "Shareware would stop working or need payment."],
      ["Writing its own word processor in a programming language", "This is bespoke development: costly and unnecessary."],
    ],
    answer: "A",
    explanation: "Typing letters is a general need met by many packages; a free open-source suite suits a tiny budget.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which type gives the company control over every feature?"],
    stem: "A bus company in Harare needs software linking its ticket machines, GPS trackers on its buses and its own payroll rules. No package does all of this. Which choice is most suitable, and why?",
    options: [
      ["Customised software, because the needs are unique to the company", "Correct: it can be designed around the company's exact systems and rules."],
      ["Off-the-shelf software, because it is cheaper and ready at once", "It is cheaper, but no package meets these needs."],
      ["Freeware, because it has no licence fee", "Cost alone does not help when no program does the job."],
      ["Shareware, because it can be tried first", "A trial does not make a package meet needs it was not written for."],
    ],
    answer: "A",
    explanation: "When requirements are specialised and no package fits, bespoke software is justified despite its cost and development time.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Freeware is free, but can you change it?"],
    stem: "How does **freeware** differ from **open-source** software?",
    options: [
      ["Freeware is free to use, but its source code is not available to change", "Correct: freeware is closed; open-source publishes its code."],
      ["Freeware may be changed by anyone, but open-source code is kept secret", "It is the other way round: open-source allows changes."],
      ["Freeware must be paid for after a trial period", "That describes shareware."],
      ["Freeware is written for one organisation only", "That describes customised software."],
    ],
    answer: "A",
    explanation: "Both can be free of charge; only open-source gives access to the source code.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Customised software usually has fewer errors when it is first released than an off-the-shelf package used by millions of people.",
    answer: false,
    explanation: "False. Off-the-shelf packages have been used and tested by many people, so most errors have been found. Bespoke software has few users at first, so errors are more likely.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Installing a commercial program on more computers than its licence allows breaks copyright law.",
    answer: true,
    explanation: "True. The licence limits how many copies may be used; extra copies are software piracy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each statement to the type of software it describes.",
    pairs: [
      "Built around the exact requirements of one client",
      "Bought ready-made and installed immediately",
      "Source code may be studied and changed by anyone",
      "Free to try for a limited time, then payment is expected",
    ],
    right: ["Customised (bespoke)", "Off-the-shelf", "Open-source", "Shareware"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Bespoke fits one client; off-the-shelf is ready-made; open-source shares its code; shareware is try-before-you-buy.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Each statement is an advantage of exactly one type."],
    stem: "Match each advantage to the type of software it belongs to.",
    pairs: [
      "Many tutorials and trained users already exist",
      "No unnecessary features; fits existing working methods",
      "No licence fee, and the code can be adapted",
    ],
    right: ["Off-the-shelf", "Customised (bespoke)", "Open-source"],
    rightIndex: [0, 1, 2],
    explanation: "Wide use gives off-the-shelf packages plentiful help; bespoke fits exactly; open-source is free and adaptable.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The program as written by the programmer is called the {{blank:a}} code. A legal agreement stating how software may be used is a software {{blank:b}}. Software that is free to use but whose code cannot be changed is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["source"], choices: ["source", "machine", "object", "binary"] },
      { id: "b", accepted: ["licence"], choices: ["licence", "patent", "template", "driver"] },
      { id: "c", accepted: ["freeware"], choices: ["freeware", "shareware", "open-source", "bespoke"] },
    ],
    explanation: "Source code; licence; freeware.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the other name for customised software.",
    accepted: ["bespoke", "bespoke software", "tailor-made", "tailor made", "tailor-made software", "custom-written", "custom-written software", "custom software"],
    wrong: ["generic", "off-the-shelf"],
    explanation: "Customised software is also called bespoke (tailor-made) software.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about cost and about how soon it can be used."],
    stem: "Give **two** advantages of off-the-shelf software over customised software. [2]",
    points: [
      "Cheaper, because the development cost is shared among many users",
      "Available immediately / already tested by many users so fewer errors / plenty of help, tutorials and trained staff",
    ],
    modelAnswer: "It is cheaper because many buyers share the development cost, and it is available immediately and already well tested.",
    explanation: "Accept any two distinct advantages with a reason.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Name the type, then link two reasons to the farm's situation."],
    stem: "A large tobacco estate near Marondera wants software to record the work of 300 seasonal workers, their piece-rate pay and the grading of every bale. Its manager says no package handles the estate's grading rules. Recommend a type of software and justify your choice. [3]",
    points: [
      "Recommends customised (bespoke) software",
      "Justification linked to the scenario: the grading and piece-rate rules are unique, so no package fits",
      "Second justification: designed to fit the estate's existing methods / can be changed as needs grow / a large estate can afford it",
    ],
    modelAnswer: "Customised software. The estate's grading and piece-rate rules are unique and no package handles them, so software written for the estate will do exactly what is needed, and as a large business it can afford the cost and ask for changes later.",
    explanation: "Specialised needs plus a budget to pay for development point to bespoke software.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Separate the advantages and disadvantages of each type.", "Open-source is defined by access to the source code."],
    stem: "Rudo is starting an online craft business in Bulawayo and needs software for bookkeeping and for a simple website.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of software has source code that Rudo could change if she learned to program?", options: [["Open-source software", "Correct."], ["Freeware", "Freeware is free but closed."], ["Shareware", "Shareware is closed and free only for a trial."], ["Commercial off-the-shelf software", "Commercial packages keep their code private."]], answer: "A", explanation: "Only open-source publishes its source code." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **two** advantages of an off-the-shelf bookkeeping package for Rudo.", points: ["Cheap / cost shared among many users / available immediately", "Well tested / support, tutorials and updates available"], modelAnswer: "It is cheap and available straight away, and it is already well tested with plenty of tutorials and support." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** disadvantages of open-source software for Rudo's website.", points: ["Support may only come from community forums, not a company", "Changing it needs programming skills / may be less compatible or polished"], modelAnswer: "Help may only come from online forums, and changing it needs programming skills she does not have." }),
      P.tf({ label: "(d)", stem: "True or false: commissioning customised bookkeeping software would be the cheapest choice for Rudo.", answer: false, explanation: "False: bespoke software is the most expensive option." }),
    ],
    explanation: "Open-source: code available. Off-the-shelf: cheap, immediate, tested. Bespoke: costly.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    hints: ["Compare cost, time, fit and support.", "Shareware and freeware differ in payment, not in code access."],
    stem: "Gweru City Engineering (fictional) is choosing software for its drawing office and for its unusual job-costing method.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Compare off-the-shelf and customised software for the job-costing system. Refer to cost, development time, how well it fits and support.", points: ["Cost: off-the-shelf is cheaper / bespoke pays the full development cost", "Time: off-the-shelf available immediately whereas bespoke takes months", "Fit: bespoke fits the unusual costing method exactly whereas off-the-shelf may not / may force changes in working methods", "Support: off-the-shelf has wide support and many users whereas bespoke relies on its developers"], modelAnswer: "Off-the-shelf is cheaper, since many buyers share the cost, and can be used at once, whereas bespoke software costs the full development price and takes months. However, bespoke fits the unusual job-costing method exactly, while a package might force the company to change its methods. Off-the-shelf has wide support; bespoke support comes only from its developers." }),
      P.mcq({ label: "(b)", stem: "Which choice suits the job-costing system best?", options: [["Customised software", "Correct: the method is unusual."], ["A freeware calculator", "Too limited."], ["A shareware trial", "It would need payment and still not fit."], ["A general open-source spreadsheet with no changes", "Possible for simple needs, but the unusual method needs software designed for it."]], answer: "A", explanation: "Unique requirements favour bespoke software." }),
      P.manual({ label: "(c)", marks: 1, stem: "State the difference between freeware and shareware.", points: ["Freeware is free to use permanently; shareware is free only for a trial period / with limited features, then must be paid for"], modelAnswer: "Freeware stays free; shareware must be paid for after a trial." }),
    ],
    explanation: "Bespoke for unique needs; freeware stays free, shareware is a trial.",
  });

  b.card("DEFINITION", "Off-the-shelf (generic) software", "Ready-made application software written for many users with similar needs; bought or licensed and installed straight away.");
  b.card("DEFINITION", "Customised (bespoke) software", "Software written or adapted to meet the exact requirements of one organisation.");
  b.card("DEFINITION", "Open-source software", "Software whose source code is freely available to study, change and share under an open-source licence.");
  b.card("CONCEPT", "Advantages of off-the-shelf software", "Cheaper (cost shared by many buyers); available immediately; well tested; lots of support, tutorials and trained users.");
  b.card("CONCEPT", "Disadvantages of customised software", "Expensive; long development time; may have more errors at first; support only from its developers.");
  b.card("CONCEPT", "Disadvantages of open-source software", "Support often only from community forums; changing it needs programming skills; may be less polished or compatible.");
  b.card("DEFINITION", "Software licence", "A legal agreement stating how software may be used, e.g. how many computers it may be installed on and whether it may be copied or changed.");
  b.card("CONCEPT", "Freeware vs shareware", "Freeware: free to use permanently, code closed. Shareware: free trial (time- or feature-limited), then payment expected.");
  b.card("FACT", "When is bespoke software justified?", "When the organisation's needs are specialised or unique, no package fits, and it can afford the cost and wait.");
});
