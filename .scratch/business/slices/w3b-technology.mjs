// W3b: technology and ICT in operations (BES, CAM).
import { concept, P, BES, CAM, f, money, round, r2, table } from "../lib.mjs";

// Labour productivity.
const out0 = 2040, emp0 = 17;
const prod0 = f.labourProductivity(out0, emp0); // 120
const outA = 2700, empA = 18;
const prodA = f.labourProductivity(outA, empA); // 150
const outB = 3600, empB = 15;
const prodB = f.labourProductivity(outB, empB); // 240
const prodPct = ((prodB - prodA) / prodA) * 100; // 60
// Structured: CAD/CAM machine.
const before = [6, 960]; // workers, chairs per week
const after = [4, 1200];
const pB = f.labourProductivity(before[1], before[0]); // 160
const pA = f.labourProductivity(after[1], after[0]); // 300
const wage = 75; // per worker per week
const labCostB = (before[0] * wage) / before[1]; // 0.46875
const labCostA = (after[0] * wage) / after[1]; // 0.25
const tTbl = table(["", "Now", "With CNC cutting machine"], [["Workers in the cutting section", before[0], after[0]], ["Chair sets cut per week", before[1], after[1]]]);

concept("bus.operations.technology", { file: "operations/technology", keyPrefix: "operations.technology" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does CAD stand for?",
    options: [
      ["Computer-aided design", "Correct."],
      ["Computer-assisted delivery", "Not a standard term."],
      ["Customer account database", "Not what CAD means."],
      ["Central automated distribution", "Not what CAD means."],
    ],
    answer: "A",
    explanation: "**CAD**: designing products using computer software.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which technology lets a supermarket till read the price of a product by scanning a pattern of lines?",
    options: [
      ["Bar codes", "Correct."],
      ["3D printing", "This builds objects layer by layer."],
      ["Computer-aided design", "This is for designing products."],
      ["Video conferencing", "This is for meetings."],
    ],
    answer: "A",
    explanation: "Bar codes identify products at the till, charge the price and update stock records.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main difference between mechanisation and automation?",
    options: [
      ["In automation computers control the machines with little human input", "Correct."],
      ["Mechanisation uses no machines at all", "Mechanisation uses machines operated by workers."],
      ["Automation is only used in farming", "Automation is used in many industries."],
      ["Mechanisation always employs fewer workers than automation does in a factory", "Usually the reverse."],
    ],
    answer: "A",
    explanation: "Mechanisation: workers operate machines. Automation: computer-controlled machines work with little human involvement.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A cattle farmer fits each animal with an ear tag that sends its identity to a reader as it passes a gate. Which technology is this?",
    options: [
      ["Radio frequency identification (RFID)", "Correct: tags are read by radio without line of sight."],
      ["Computer-aided manufacture", "CAM controls production machines."],
      ["Online billing", "Online billing sends bills electronically."],
      ["Contactless (near-field) card payment", "No payment is involved."],
    ],
    answer: "A",
    explanation: "RFID tags send data by radio, so items or animals can be tracked automatically.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage to a business of electronic stock control?",
    options: [
      ["Stock levels are always up to date, so reordering is timely", "Correct."],
      ["It removes the need to buy or hold any stock at all", "Stock is still needed."],
      ["It never breaks down or needs power", "It depends on power and equipment."],
      ["It increases the amount of stock stolen from the shelves", "It helps detect losses."],
    ],
    answer: "A",
    explanation: "Electronic stock control records each sale and delivery, showing when to reorder.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might employees resist the introduction of automation in a factory?",
    options: [
      ["They fear losing their jobs or having to learn new skills", "Correct: job insecurity and retraining."],
      ["Automation always makes work more dangerous", "Automation often makes work safer."],
      ["Automation always reduces wages for every worker", "Some technical jobs pay more."],
      ["Automated machines need no supervision by anyone in the factory", "They still need technicians and supervisors."],
    ],
    answer: "A",
    hints: ["Think about job security."],
    explanation: "Automation can replace unskilled jobs and requires new skills, so workers may resist it.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    stem: "A small engineering firm needs one replacement part for an old machine that is no longer made. Which technology is most suitable?",
    options: [
      ["3D printing the part from a digital design", "Correct: ideal for one-off parts."],
      ["Installing a fully automated production line", "Far too costly for one part."],
      ["Using RFID tags on the old machine", "Tags track items; they do not make parts."],
      ["Introducing online billing for customers", "Billing does not produce parts."],
    ],
    answer: "A",
    hints: ["Which technology can make a single item cheaply?"],
    explanation: "3D printing makes one-off parts and prototypes cheaply from a digital design.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Labour productivity is calculated as output divided by the number of employees.",
    answer: true,
    explanation: "True. Labour productivity = output ÷ number of employees.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "New technology always lowers a small business's total costs immediately.",
    answer: false,
    explanation: "False. Equipment, training and maintenance cost money; savings come only if output is high enough.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each technology with its use.",
    pairs: [
      ["CAD", "Designing a new sofa on a computer"],
      ["CAM", "A computer-controlled machine cutting the sofa frame"],
      ["Contactless payment", "A customer tapping a card to pay"],
      ["Online billing", "Sending a monthly invoice to customers by email"],
      ["Bar code", "Identifying a tin of beans at the till"],
    ],
    explanation: "Each technology supports a different stage of production or service.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Using computers to control the machines that make products is called computer-aided {{blank:a}}. Building an object layer by layer from a digital design is called {{blank:b}} printing.",
    blanks: [
      { id: "a", accepted: ["manufacture", "manufacturing"], wrong: "design" },
      { id: "b", accepted: ["3D", "3-D", "three-dimensional", "three dimensional"], wrong: "laser" },
    ],
    explanation: "CAM = computer-aided manufacture; 3D printing builds objects in layers.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A tile factory produces ${out0.toLocaleString("en-GB")} tiles a day with ${emp0} workers. Calculate the labour productivity.`,
    kind: "units", value: prod0, wrong: [emp0 / out0, out0 * emp0],
    explanation: `${out0.toLocaleString("en-GB")} ÷ ${emp0} = ${prod0} tiles per worker per day.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A brick works produced ${outA.toLocaleString("en-GB")} bricks a day with ${empA} workers. After buying a new machine, it produces ${outB.toLocaleString("en-GB")} bricks a day with ${empB} workers. Calculate the percentage increase in labour productivity.`,
    kind: "pct", dp: 0, value: prodPct, wrong: [round(((outB - outA) / outA) * 100, 1), round(((prodB - prodA) / prodB) * 100, 1)],
    hints: ["Work out productivity after, then the change as a percentage of productivity before."],
    explanation: `After = ${outB.toLocaleString("en-GB")} ÷ ${empB} = ${prodB}. Increase = (${prodB} − ${prodA}) ÷ ${prodA} × 100 = ${prodPct}%.`,
    workedSolution: `1. Productivity before = ${outA} ÷ ${empA} = ${prodA}.\n2. Productivity after = ${outB} ÷ ${empB} = ${prodB}.\n3. Increase = ${prodB} − ${prodA} = ${prodB - prodA}.\n4. Percentage increase = ${prodB - prodA} ÷ ${prodA} × 100 = ${prodPct}%.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **one** advantage and **one** disadvantage for employees when a business introduces automation.",
    points: [
      "Advantage: less heavy, boring or dangerous work / chance to learn new skills.",
      "Explained: safer conditions / better-paid technical jobs.",
      "Disadvantage: job losses / need to retrain / job insecurity.",
      "Explained: unskilled workers replaced by machines; stress of change.",
    ],
    hints: ["Think about safety, skills and jobs."],
    modelAnswer: "Machines take over heavy and dangerous tasks, so work is safer and some employees learn technical skills that are better paid. However, fewer workers are needed, so some lose their jobs and others must retrain.",
    explanation: "Technology improves conditions and skills for some workers but causes job losses for others.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION", applies: BES,
    stem: "Rudo runs a busy pharmacy in Masvingo. Recommend **two** ICT tools she could use in her operations and explain how each would help.",
    points: [
      "Tool 1, e.g. bar-code scanning at the till / electronic stock control.",
      "How it helps: correct prices, faster service, stock and expiry dates tracked.",
      "Tool 2, e.g. contactless or mobile payments / online billing for clinics / online ordering.",
      "How it helps: customers without cash can pay, fewer queues, quicker payments.",
    ],
    hints: ["Think about the till, the stock and how customers pay."],
    modelAnswer: "Rudo could scan bar codes at the till with electronic stock control, so each sale updates stock and she knows when medicines need reordering or are near expiry. She could also accept contactless and mobile payments, so customers without cash can still buy and queues move faster.",
    explanation: "Recommend tools that solve the business's actual problems and fit its budget.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Tendai's furniture business in Mutare is deciding whether to buy a computer-controlled (CNC) cutting machine with CAD software. The machine costs US\\$18,000. Each worker in the cutting section is paid ${money(wage)} a week.\n\n${tTbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate labour productivity in the cutting section now (chair sets per worker per week).",
        kind: "units", value: pB, wrong: [before[0] / before[1], before[1] * before[0]],
        explanation: `${before[1]} ÷ ${before[0]} = ${pB}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate labour productivity with the CNC machine.",
        kind: "units", value: pA, wrong: [pB, after[1] / before[0]],
        explanation: `${after[1].toLocaleString("en-GB")} ÷ ${after[0]} = ${pA}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the labour cost per chair set with the CNC machine, in US dollars to two decimal places.",
        kind: "money", value: labCostA, dp: 2, wrong: [r2(labCostB), wage / after[1]],
        explanation: `(${after[0]} × ${money(wage)}) ÷ ${after[1].toLocaleString("en-GB")} = ${money(labCostA)}.`,
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Evaluate whether Tendai should buy the CNC machine.",
        points: [`Productivity rises from ${pB} to ${pA}; labour cost per set falls from about US\\$0.47 to ${money(labCostA)}.`, "More output (1,200 sets) can be sold? Depends on demand.", "CAD: designs shown to customers, changed easily; consistent quality.", "Cost US\\$18,000: finance, maintenance, training, power cuts.", "Two workers no longer needed: redundancy or redeployment; morale.", "Justified conclusion (e.g. buy if demand for extra output and finance available)."],
        modelAnswer: `The machine almost doubles productivity, from ${pB} to ${pA} chair sets per worker a week, and labour cost per set falls from about US\\$0.47 to ${money(labCostA)}. CAD also lets Tendai show customers designs and keep quality consistent. However, the machine costs US\\$18,000 plus training and maintenance, it stops during power cuts, and two cutting jobs are no longer needed, which may upset the remaining staff. The weekly labour saving is small, so the machine only pays off if Tendai can sell the extra output. He should buy it only if orders support about 1,200 sets a week and he can move the two workers to assembly or finishing rather than dismiss them.`,
      }),
    ],
    hints: ["(a) and (b) Output ÷ number of workers.", "(c) Total weekly wages ÷ output.", "(d) Will extra output sell?"],
    explanation: `(a) ${pB}. (b) ${pA}. (c) ${money(labCostA)}. (d) Weigh productivity and quality against cost, demand and workers.`,
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Nyasha owns a busy grocery shop in Chinhoyi. Cashiers add up prices by hand, queues are long at month-end, and Nyasha often finds that popular items have run out. She is considering a bar-code till system with electronic stock control.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain what is meant by *electronic stock control*.", points: ["A computer records stock levels.", "Updated automatically with each sale/delivery; shows or triggers reordering."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** ways the bar-code system would help Nyasha's shop.",
        points: ["Faster, accurate checkout: prices scanned, no adding errors.", "So shorter queues at month-end, happier customers.", "Stock updated with every sale; reorder alerts.", "So popular items do not run out; fewer lost sales."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether Nyasha should introduce the system.",
        points: ["Benefits (b) applied: queues, stock-outs, accurate records.", "Costs: equipment, software, labelling items without bar codes, training cashiers.", "Power cuts and breakdowns: needs back-up.", "Cashiers may resist / fear job losses.", "Size of business: busy shop with month-end queues likely to justify it.", "Justified conclusion."],
        modelAnswer: "Scanning would speed up checkout and remove adding errors, cutting month-end queues, and electronic stock control would warn Nyasha before popular items run out, so she loses fewer sales. Against this, the system costs money, items without bar codes must be labelled, cashiers need training, and power cuts would stop the tills unless she has back-up power. Because the shop is busy and is already losing sales through queues and stock-outs, the benefits are likely to outweigh the costs; Nyasha should introduce the system with a back-up power supply.",
      }),
    ],
    hints: ["(b) Think about the checkout and the shelves.", "(c) Compare the cost with the lost sales now."],
    explanation: "Bar codes and electronic stock control speed service and prevent stock-outs, at a cost.",
  });
  b.card("DEFINITION", "Mechanisation vs automation?", "Mechanisation: workers operate machines. Automation: computer-controlled machines with little human input.");
  b.card("DEFINITION", "CAD and CAM?", "CAD: designing products on computer. CAM: computers controlling the machines that make products.");
  b.card("DEFINITION", "3D printing?", "Building an object layer by layer from a digital design; good for prototypes and one-off parts.");
  b.card("FACT", "ICT in services?", "Bar codes, RFID, electronic stock control, online billing, contactless and mobile payments, online booking.");
  b.card("FORMULA", "Labour productivity?", "Output ÷ number of employees (per period).");
  b.card("CONCEPT", "Advantages of new technology for a business?", "Higher productivity, lower cost per unit, consistent quality, speed, better information and customer service.");
  b.card("CONCEPT", "Disadvantages of new technology for a business?", "High initial cost, training, breakdowns and power cuts, maintenance, becoming outdated, security risks.");
  b.card("CONCEPT", "Effects of technology on employees?", "Safer, less boring work and new skills; but job losses, retraining and insecurity.");
  b.card("DEFINITION", "RFID?", "Radio frequency identification: tags read by radio without line of sight, used to track goods or animals.");
});
