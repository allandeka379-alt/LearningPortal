// Slice w3b: the feasibility study (comp.sad.feasibility, ZIMSEC only).
import { concept, P } from "../lib.mjs";

// Payback: development cost / (yearly saving - yearly running cost).
const devA = 15000, saveA = 9000, runA = 4000;
const netA = saveA - runA;
const paybackA = devA / netA;
if (!Number.isInteger(paybackA)) throw new Error("paybackA");
const devB = 8000, saveB = 3500, runB = 1500;
const netB = saveB - runB;
const paybackB = devB / netB;
// Total benefit over life
const lifeB = 5;
const gainB = netB * lifeB - devB;

concept("comp.sad.feasibility", { file: "sad/feasibility", keyPrefix: "sad.feasibility" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the purpose of a **feasibility study**?",
    options: [
      ["To decide whether a proposed system is possible and worthwhile", "Correct: it decides whether to go ahead."],
      ["To train users before the new system goes live", "Training happens during implementation."],
      ["To correct errors found after the system is in use", "That is maintenance."],
      ["To write the program code for the new system", "Coding happens in development."],
    ],
    answer: "A",
    explanation: "A feasibility study is done early to decide whether the project should go ahead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which area of feasibility asks whether the **benefits of a system outweigh its costs**?",
    options: [
      ["Economic", "Correct: it compares costs with benefits."],
      ["Technical", "Technical feasibility is about the technology."],
      ["Operational", "Operational feasibility is about whether people will use it."],
      ["Legal", "Legal feasibility is about obeying the law."],
    ],
    answer: "A",
    explanation: "Economic feasibility compares the costs of developing and running a system with its benefits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A company checks whether the new system will store customers' personal data in line with the Cyber and Data Protection Act. Which area of feasibility is this?",
    options: [
      ["Legal", "Correct: it checks the system obeys the law."],
      ["Technical", "No question of technology is being asked."],
      ["Schedule", "Schedule feasibility is about time."],
      ["Social", "Social feasibility is about the effect on people and jobs."],
    ],
    answer: "A",
    explanation: "Legal feasibility checks data protection, licensing and other laws.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which question belongs to **technical** feasibility?",
    options: [
      ["Can the existing network support the new software?", "Correct: it is about the technology."],
      ["Will the clerks be willing to use the new system?", "This is operational feasibility."],
      ["Will the system be ready before the end of the year?", "This is schedule feasibility."],
      ["Will any workers lose their jobs because of it?", "This is social feasibility."],
    ],
    answer: "A",
    explanation: "Technical feasibility asks whether suitable hardware, software and infrastructure exist and are compatible.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Is the issue the technology, or the people?"],
    stem: "A rural clinic's nurses have never used computers and are worried about a new records system. Which area of feasibility does this mainly affect?",
    options: [
      ["Operational", "Correct: it concerns whether the staff can and will use the system."],
      ["Technical", "The technology itself is not in question."],
      ["Economic", "Costs and benefits are not the issue described."],
      ["Legal", "No law is involved."],
    ],
    answer: "A",
    explanation: "Operational feasibility asks whether the system will work in practice for its users, which depends on their skills and attitude.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Can you put a money value on it easily?"],
    stem: "Which is an **intangible** benefit of a new computerised booking system?",
    options: [
      ["Customers are more satisfied with the service", "Correct: real, but hard to measure in money."],
      ["Two fewer clerks are needed, saving wages", "Saved wages can be measured in money, so this is tangible."],
      ["Paper costs fall by a known amount each month", "This can be measured, so it is tangible."],
      ["Double bookings no longer cause refunds", "Refunds saved can be counted, so this is tangible."],
    ],
    answer: "A",
    explanation: "Intangible benefits, such as customer satisfaction, are real but hard to express in money.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["A feasibility conclusion must be justified by findings."],
    stem: "Which is the **best** conclusion for a feasibility report?",
    options: [
      ["Feasible: payback is two years, staff support it and hardware is available", "Correct: a clear recommendation justified by findings."],
      ["Feasible, because computers are modern and everybody uses them", "This is not based on the study's findings."],
      ["Not feasible, because new systems are always expensive", "Cost alone, without benefits, is not a valid reason."],
      ["Feasible, because the analyst likes the new software", "Personal preference is not a justification."],
    ],
    answer: "A",
    explanation: "A good conclusion refers to the findings for several areas of feasibility.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A system that costs a lot of money can still be economically feasible.",
    answer: true,
    explanation: "True. What matters is whether its benefits over its life outweigh its costs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The feasibility study is carried out after the new system has been installed.",
    answer: false,
    explanation: "False. It is carried out early, straight after the preliminary investigation, to decide whether to proceed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each area of feasibility to its key question.",
    pairs: [
      ["Technical", "Can it be built and run with available technology?"],
      ["Operational", "Will the users be able and willing to use it?"],
      ["Social", "How will it affect jobs and the community?"],
      ["Schedule", "Can it be completed in the time available?"],
    ],
    explanation: "Technical: technology. Operational: users. Social: people and jobs. Schedule: time.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["One-off costs happen once; running costs continue."],
    stem: "Classify each cost of a new system.",
    pairs: ["Buying the server", "Monthly internet subscription", "Initial training of staff", "Annual maintenance contract"],
    right: ["Development (one-off) cost", "Running (ongoing) cost"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Hardware and initial training are one-off; subscriptions and maintenance contracts are ongoing.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["First find the net saving per year.", "Payback = development cost ÷ net saving per year."],
    stem: `A transport company in Mutare plans a vehicle-tracking system. Development costs USD ${devA.toLocaleString("en-GB")}. It will save USD ${saveA.toLocaleString("en-GB")} a year, and running costs are USD ${runA.toLocaleString("en-GB")} a year. Calculate the payback period in years.`,
    value: paybackA,
    wrong: [devA / saveA],
    explanation: `Net saving = ${saveA} − ${runA} = ${netA}; payback = ${devA} ÷ ${netA} = ${paybackA} years.`,
    workedSolution: `1. Net saving per year = ${saveA} − ${runA} = USD ${netA}.\n2. Payback = ${devA} ÷ ${netA} = ${paybackA} years.`,
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["The report goes to management at the end of the study."],
    stem: "Complete the sentences.",
    template: "The findings of the feasibility study are written in the feasibility {{blank:a}}. Comparing the costs of a system with the benefits it brings is called a cost-{{blank:b}} analysis.",
    blanks: [
      { id: "a", accepted: ["report"], choices: ["report", "manual", "diagram", "licence"] },
      { id: "b", accepted: ["benefit"], choices: ["benefit", "profit", "time", "risk"] },
    ],
    explanation: "Feasibility report; cost-benefit analysis.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Name the area, then say what it checks."],
    stem: "Explain **four** areas of feasibility.",
    points: [
      "Technical: whether hardware/software/infrastructure and skills exist to build and run it",
      "Economic: whether benefits outweigh development and running costs",
      "Legal: whether it obeys laws such as data protection and software licensing",
      "Operational / social / schedule: whether users will use it / effect on jobs and people / whether it can be finished in time",
    ],
    explanation: "Each area answers one key question about the proposed system.",
    modelAnswer: "Technical feasibility checks that suitable hardware and software exist. Economic feasibility checks that the benefits outweigh the costs. Legal feasibility checks the system obeys laws such as the Cyber and Data Protection Act. Operational feasibility checks the staff are able and willing to use it.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Make each point fit the tuck shop."],
    stem: "A school tuck shop in Masvingo wants a computerised till that records sales and stock. Explain how the technical and social feasibility of this proposal could be assessed, with **two** points each.",
    points: [
      "Technical: is there reliable electricity / a UPS or solar supply for the till?",
      "Technical: is suitable till hardware and software available / compatible / can staff support it?",
      "Social: will any tuck shop workers lose their jobs or need retraining?",
      "Social: effect on learners (faster queues) / changes to working conditions",
    ],
    explanation: "Points must refer to the tuck shop scenario.",
    modelAnswer: "Technically, the school must check that power is reliable or that a UPS can be fitted, and that an affordable till package is available that the staff can be supported to use. Socially, it must consider whether any tuck shop helpers would lose work and how faster queues would affect learners.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: false,
    hints: ["Net saving = saving − running cost.", "Compare the payback with the system's life."],
    stem: `Chipo's Hardware (fictional) in Gweru is considering a stock control system. Development costs USD ${devB.toLocaleString("en-GB")}. It will save USD ${saveB.toLocaleString("en-GB")} a year; running costs are USD ${runB.toLocaleString("en-GB")} a year. The system is expected to last ${lifeB} years.`,
    parts: [
      P.num({ label: "(a)", stem: "Calculate the net saving per year in USD.", value: netB, wrong: [saveB], explanation: `${saveB} − ${runB} = ${netB}.`, workedSolution: `1. ${saveB} − ${runB} = USD ${netB}.` }),
      P.num({ label: "(b)", stem: "Calculate the payback period in years.", value: paybackB, wrong: [devB / saveB], explanation: `${devB} ÷ ${netB} = ${paybackB}.`, workedSolution: `1. ${devB} ÷ ${netB} = ${paybackB} years.` }),
      P.num({ label: "(c)", stem: `Calculate the total gain in USD over the ${lifeB}-year life, after the development cost is repaid.`, value: gainB, wrong: [netB * lifeB], explanation: `${netB} × ${lifeB} − ${devB} = ${gainB}.`, workedSolution: `1. Savings over ${lifeB} years: ${netB} × ${lifeB} = ${netB * lifeB}.\n2. Minus development: ${netB * lifeB} − ${devB} = USD ${gainB}.` }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Write a short conclusion for the feasibility report on economic grounds, and name **one** other area of feasibility the owner should also check, with a reason.",
        points: ["States it is economically feasible", `Justifies with the figures (payback of ${paybackB} years within the ${lifeB}-year life / gain of USD ${gainB})`, "Another area with a reason (e.g. operational: will staff be able to use it; technical: power and hardware)"],
        modelAnswer: `The system is economically feasible: it pays for itself in ${paybackB} years and gains USD ${gainB} over its ${lifeB}-year life. The owner should also check operational feasibility, because the shop assistants will need to be trained and willing to use it.`,
      }),
    ],
    explanation: `(a) ${netB} (b) ${paybackB} years (c) ${gainB}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["Match each finding to the area it belongs to."],
    stem: "A feasibility study for an online ordering system at a bakery in Harare produced these findings:\n\n1. The bakery's internet connection often fails.\n2. Two delivery clerks will no longer be needed.\n3. The website must be finished before the festive season in eight weeks; suppliers need twelve.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each finding to its area of feasibility.",
        pairs: ["Finding 1", "Finding 2", "Finding 3"],
        right: ["Technical", "Social", "Schedule", "Legal"],
        rightIndex: [0, 1, 2],
        explanation: "Internet: technical. Jobs: social. Deadline: schedule.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Using the findings, recommend whether the project should go ahead now. Justify your answer.",
        points: ["Recommends not now / delay (or go ahead only with conditions)", "Justification using the findings: cannot meet the eight-week deadline / unreliable internet must be fixed first / plan for the clerks"],
        modelAnswer: "It should not go ahead now. The suppliers need twelve weeks, so it cannot be ready for the festive season, and the internet connection must be made reliable first. It could start after the season, with the two clerks retrained for other work.",
      }),
    ],
    explanation: "(a) Technical, social, schedule.",
  });

  b.card("DEFINITION", "Feasibility study", "An early investigation deciding whether a proposed system is possible, practical and worthwhile; ends in a recommendation.");
  b.card("CONCEPT", "Technical feasibility", "Can it be built and run with available hardware, software, power, network and skills?");
  b.card("CONCEPT", "Economic feasibility", "Do the benefits (savings, extra income) outweigh development and running costs?");
  b.card("CONCEPT", "Legal feasibility", "Does it obey laws: data protection, copyright and licences, tax, employment?");
  b.card("CONCEPT", "Operational feasibility", "Will the system work in practice: can and will the users use it, and does it fit how the organisation works?");
  b.card("CONCEPT", "Social and schedule feasibility", "Social: effect on jobs, workers and the community. Schedule: can it be completed in the time available?");
  b.card("FORMULA", "Payback period", "Payback = development cost ÷ (yearly saving − yearly running cost).");
  b.card("CONCEPT", "Tangible vs intangible benefits", "Tangible: measurable in money (saved wages, less waste). Intangible: hard to measure (customer satisfaction, reputation).");
  b.card("CONCEPT", "Feasibility report conclusion", "States whether to proceed and which option, justified by findings in each area, with any conditions.");
});
