// W3b: manufacturing costs (both boards).
import { concept, P, money, check, r2, sum } from "../lib.mjs";
import { manufacturing, table, U, fmt } from "../tables/w3b-lib.mjs";

concept("acc.manufacturing.costs", { file: "manufacturing/costs", keyPrefix: "manufacturing.costs" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is the correct definition of **prime cost**?",
    options: [
      ["Direct materials consumed + direct labour + direct expenses", "Correct: prime cost is the total of the direct costs."],
      ["Direct materials consumed + direct labour + factory overheads", "Factory overheads are added after prime cost."],
      ["Total factory cost adjusted for work in progress", "That is the production cost of goods completed."],
      ["Cost of sales of the finished goods sold", "Cost of sales is calculated in the income statement."],
    ],
    answer: "A",
    explanation: "Prime cost = direct materials consumed + direct labour + direct expenses. Overheads and work in progress come afterwards.",
  });
  b.mcq({
    d: 1, skill: "RECALL", daily: false,
    stem: "In a bakery, which cost is **direct labour**?",
    options: [
      ["Wages of the bakers who mix and bake the bread", "Correct: they make the product."],
      ["Salary of the bakery supervisor", "A supervisor does not make the bread: indirect wages, a factory overhead."],
      ["Wages of the office clerk", "Office wages are an administration expense, not a manufacturing cost."],
      ["Wages of the van driver delivering bread", "Delivery wages are a selling and distribution expense."],
    ],
    answer: "A",
    explanation: "Direct labour is the wages of the workers who actually make the product.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A furniture maker pays a royalty of US\\$5 to a designer for every cabinet made. How is the royalty classified?",
    options: [
      ["Direct expense", "Correct: it can be traced to each unit made and is neither material nor labour."],
      ["Factory overhead", "Overheads cannot be traced to individual units; this cost can."],
      ["Direct materials", "A royalty is not a material that becomes part of the cabinet."],
      ["Administration expense", "It is caused by production, so it is a manufacturing cost."],
    ],
    answer: "A",
    explanation: "Royalties paid per unit produced are the usual example of a direct expense.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which cost would **not** appear anywhere in a manufacturing account?",
    options: [
      ["Advertising of the finished products", "Correct: a selling expense, charged in the income statement."],
      ["Depreciation of factory machinery", "This is a factory overhead."],
      ["Carriage inwards on raw materials", "This is added to the cost of raw materials."],
      ["Insurance of the factory building", "This is a factory overhead."],
    ],
    answer: "A",
    explanation: "Selling, distribution and administration costs go to the income statement, never to the manufacturing account.",
  });
  {
    const o = 3800, p = 41500, c = 4600, cl = 4900;
    const used = r2(o + p + c - cl);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Raw materials: opening inventory ${money(o)}, purchases ${money(p)}, carriage inwards ${money(c)}, closing inventory ${money(cl)}. What is the cost of raw materials consumed?`,
      options: [
        [money(used), "Correct: 3,800 + 41,500 + 4,600 − 4,900."],
        [money(r2(o + p - cl)), "This leaves out the carriage inwards."],
        [money(r2(p + c - o + cl)), "This reverses the inventory adjustments."],
        [money(r2(o + p + c + cl)), "This adds the closing inventory instead of deducting it."],
      ],
      answer: "A",
      explanation: `${fmt(o)} + ${fmt(p)} + ${fmt(c)} − ${fmt(cl)} = ${fmt(used)}.`,
    });
  }
  {
    const tfc = 72600, wo = 2900, wc = 3700;
    const prod = r2(tfc + wo - wc);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Total factory cost is ${money(tfc)}. Work in progress was ${money(wo)} at the start of the year and ${money(wc)} at the end. What is the production cost of goods completed?`,
      options: [
        [money(prod), "Correct: 72,600 + 2,900 − 3,700."],
        [money(r2(tfc - wo + wc)), "This adds closing and deducts opening work in progress: the wrong way round."],
        [money(r2(tfc + wo + wc)), "Closing work in progress must be deducted, not added."],
        [money(tfc), "Work in progress has been ignored."],
      ],
      answer: "A",
      hints: ["Opening work in progress was finished this year; closing work in progress is not yet finished."],
      explanation: `${fmt(tfc)} + ${fmt(wo)} − ${fmt(wc)} = ${fmt(prod)}.`,
    });
  }
  {
    const rent = 14400, f = 0.75;
    const fac = r2(rent * f);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `Rent of ${money(rent)} is for a building used three-quarters as a factory and one-quarter as offices. How is the rent treated?`,
      options: [
        [`${money(fac)} factory overhead; ${money(r2(rent - fac))} income statement expense`, "Correct: only the factory share is a manufacturing cost."],
        [`${money(rent)} factory overhead`, "The office share is an administration expense."],
        [`${money(fac)} prime cost; ${money(r2(rent - fac))} factory overhead`, "Rent is never a direct cost, and the office share is not a factory cost."],
        [`${money(r2(rent - fac))} factory overhead; ${money(fac)} income statement expense`, "The fractions have been swapped."],
      ],
      answer: "A",
      hints: ["Split the rent first, then classify each part."],
      explanation: `Factory: ${fmt(rent)} × 3/4 = ${fmt(fac)} (overhead). Offices: ${fmt(r2(rent - fac))} (income statement).`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A trainee includes the factory supervisor's salary in direct labour instead of factory overheads. What is the effect on the manufacturing account?",
    options: [
      ["Prime cost is overstated; production cost of goods completed is unchanged", "Correct: the cost moves between two parts of the same account."],
      ["Prime cost and production cost of goods completed are both overstated", "Overheads fall by the same amount, so the total is unchanged."],
      ["Prime cost is understated; production cost of goods completed is overstated", "Adding to direct labour raises prime cost."],
      ["Neither prime cost nor production cost of goods completed changes", "Prime cost does change: direct labour is too high."],
    ],
    answer: "A",
    hints: ["Both direct labour and overheads are inside total factory cost."],
    explanation: "Direct labour rises and overheads fall by the same amount: prime cost is too high, but total factory cost and the production cost are correct.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Closing work in progress is deducted in the manufacturing account because it is carried forward as an asset.",
    answer: true,
    explanation: "True. Half-finished goods are not yet completed production; they appear as a current asset in the statement of financial position.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Depreciation of the delivery van is a factory overhead.",
    answer: false,
    explanation: "False. The delivery van is used for selling and distribution, so its depreciation is an income statement expense. Only depreciation of factory assets is an overhead.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "A shoe factory in Bulawayo has the costs below. Match each cost with its classification.",
    right: ["Direct materials", "Direct labour", "Direct expense", "Factory overhead", "Income statement expense"],
    pairs: ["Leather and soles used", "Wages of machinists stitching shoes", "Licence fee paid per pair made", "Wages of the factory storekeeper", "Repairs to factory machines", "Salary of the sales manager"],
    rightIndex: [0, 1, 2, 3, 3, 4],
    explanation: "Materials in the shoe and the makers' wages are direct; a per-pair licence fee is a direct expense; the storekeeper and machine repairs support production (overheads); the sales manager is a selling expense.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the order of the subtotals in a manufacturing account.",
    template: "Cost of raw materials consumed + direct labour + direct expenses = {{blank:a}}. Add factory overheads to give total factory cost, then add {{blank:b}} work in progress and deduct {{blank:c}} work in progress to give the production cost of goods completed.",
    blanks: [
      { id: "a", accepted: ["prime cost"], choices: ["prime cost", "gross profit", "cost of sales"] },
      { id: "b", accepted: ["opening"], choices: ["opening", "closing"] },
      { id: "c", accepted: ["closing"], choices: ["opening", "closing"] },
    ],
    explanation: "Direct costs make prime cost; overheads give total factory cost; then + opening − closing work in progress.",
  });
  {
    const pc = 58200, oh = 19450;
    const tf = r2(pc + oh);
    b.fib({
      d: 2, skill: "APPLICATION", marks: 1,
      stem: `Prime cost is ${money(pc)} and factory overheads are ${money(oh)}.`,
      template: "Total factory cost is US\\$ {{blank:a}}.",
      blanks: [{ id: "a", accepted: [String(tf), fmt(tf)] }],
      explanation: `${fmt(pc)} + ${fmt(oh)} = ${fmt(tf)}.`,
    });
  }

  // ---------------------------------------------------------------- Numerical
  {
    const used = 33750, dl = 21600, de = 950;
    const pc = r2(used + dl + de);
    b.num({
      d: 2, kind: "money", value: pc, daily: true, wrong: [r2(used + dl)],
      stem: `Raw materials consumed ${money(used)}, direct labour ${money(dl)}, direct expenses ${money(de)}. Calculate prime cost.`,
      explanation: `${fmt(used)} + ${fmt(dl)} + ${fmt(de)} = ${fmt(pc)}. Leaving out the direct expenses gives ${fmt(r2(used + dl))}.`,
    });
  }
  {
    const m = manufacturing({ name: "x", rawOpen: 2650, rawPurch: 29800, rawCarriage: 640, rawReturns: 390, rawClose: 3120, directLabour: 18700, overheads: [["a", 6100], ["b", 3250], ["c", 2400]], wipOpen: 1880, wipClose: 2340 });
    b.calc({
      d: 4, kind: "money", value: m.production, calculator: true, wrong: [r2(m.production + 2 * (2340 - 1880)), r2(m.factoryCost)],
      stem: `For the year ended 31 December 2025 a factory had: raw materials at 1 January ${money(2650)}, purchases of raw materials ${money(29800)}, carriage inwards on raw materials ${money(640)}, returns of raw materials ${money(390)}, raw materials at 31 December ${money(3120)}, direct wages ${money(18700)}, factory overheads ${money(11750)}, work in progress at 1 January ${money(1880)} and at 31 December ${money(2340)}. Calculate the production cost of goods completed.`,
      hints: ["Work out raw materials consumed first.", "Add overheads, then adjust for work in progress."],
      explanation: `1. Raw materials consumed: 2,650 + 29,800 + 640 − 390 − 3,120 = ${fmt(m.consumed)}.\n2. Prime cost: ${fmt(m.consumed)} + 18,700 = ${fmt(m.prime)}.\n3. Total factory cost: ${fmt(m.prime)} + 11,750 = ${fmt(m.factoryCost)}.\n4. Production cost: ${fmt(m.factoryCost)} + 1,880 − 2,340 = ${fmt(m.production)}. Swapping the work in progress figures gives ${fmt(r2(m.production + 2 * (2340 - 1880)))}; ignoring them gives ${fmt(m.factoryCost)}.`,
    });
    check("oh", m.totOH, 11750);
  }
  {
    const prod = 84150, units = 1700;
    const per = prod / units;
    b.num({
      d: 3, kind: "money", value: per, dp: 2, calculator: true,
      stem: `A brick maker in Masvingo had a production cost of goods completed of ${money(prod)} for ${fmt(units)} pallets of bricks. Calculate the production cost per pallet.`,
      hints: ["Divide the production cost by the number of units completed."],
      explanation: `${fmt(prod)} ÷ ${fmt(units)} = US\\$${per.toFixed(2)} per pallet.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between a **direct** cost and an **indirect** cost in a factory. Give one example of each.",
    points: ["Direct cost can be traced to each unit made / indirect cannot (shared by all production)", "Correct example of each, e.g. direct: materials in the product, makers' wages, royalty per unit; indirect: factory rent, supervisor's salary, depreciation of machinery"],
    modelAnswer: "A direct cost can be traced to each unit produced, such as the timber in a table; an indirect cost is a general factory cost that cannot be traced to particular units, such as the factory rent.",
    explanation: "Traceability to the unit is the test.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Tatenda makes metal gates in Harare. Explain **three** reasons why he needs to know the production cost of each gate completed.",
    points: ["To set a selling price that covers cost and gives a profit", "To value closing inventory of finished goods (and work in progress) in the statements", "To control costs / compare with earlier periods or quotes / decide whether to buy in rather than make"],
    modelAnswer: "He can set prices that cover his costs, value his unsold gates correctly at the year end, and spot rising costs or decide whether making a part himself is cheaper than buying it.",
    hints: ["Think about pricing, valuation and control."],
    explanation: "Pricing, inventory valuation and cost control are the main uses.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const d = { name: "Thandeka's Bakery", rawOpen: 1460, rawPurch: 24380, rawCarriage: 520, rawClose: 1730, directLabour: 15600, directExp: [], overheads: [["Bakery supervisor's wages", 6240], ["Rent of bakery (two-thirds)", 4800], ["Power for ovens", 3910], ["Depreciation of ovens", 2150]], wipOpen: 0, wipClose: 0 };
    const m = manufacturing(d);
    const stim = table(["Item", U], [
      ["Inventory of flour and ingredients at 1 January 2025", 1460], ["Purchases of flour and ingredients", 24380], ["Carriage inwards on ingredients", 520], ["Inventory of flour and ingredients at 31 December 2025", 1730],
      ["Bakers' wages", 15600], ["Bakery supervisor's wages", 6240], ["Rent of building (bakery two-thirds, shop one-third)", 7200], ["Power for ovens", 3910], ["Depreciation of ovens", 2150],
      ["Shop assistants' wages", 5300], ["Delivery costs", 1840],
    ]);
    check("rent", r2((7200 * 2) / 3), 4800);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Thandeka bakes bread in Mutare and sells it from her own shop. Her records for the year ended 31 December 2025 include:\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: m.consumed, wrong: [r2(1460 + 24380 - 1730)], stem: "Calculate the cost of raw materials consumed.", explanation: `1,460 + 24,380 + 520 − 1,730 = ${fmt(m.consumed)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: m.prime, stem: "Calculate the prime cost.", explanation: `${fmt(m.consumed)} + 15,600 = ${fmt(m.prime)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: m.totOH, wrong: [r2(m.totOH + 2400), r2(m.totOH + 5300)], stem: "Calculate the total factory overheads.", explanation: `6,240 + 4,800 (two-thirds of 7,200) + 3,910 + 2,150 = ${fmt(m.totOH)}. The shop's third of the rent and the shop assistants' wages are not factory costs.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: m.production, stem: "Calculate the production cost of goods completed (there was no work in progress).", explanation: `${fmt(m.prime)} + ${fmt(m.totOH)} = ${fmt(m.production)}.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Name **two** costs in the list that are not manufacturing costs and state where each is recorded.", points: ["Shop assistants' wages / delivery costs / one-third of rent (any two)", "Recorded as expenses in the income statement"], modelAnswer: "Shop assistants' wages and delivery costs: both are expenses in the income statement (selling and distribution).", explanation: "Selling costs never enter the manufacturing account." }),
      ],
      hints: ["Split the rent before you classify it.", "Leave out the shop's selling costs."],
      explanation: `Model layout:\n\n${m.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2
  {
    const d = { name: "Sipho's Steel Works", rawOpen: 6300, rawPurch: 52700, rawReturns: 1100, rawClose: 7450, directLabour: 31200, directExp: [["Royalties", 1650]], overheads: [["Indirect wages", 8900], ["Factory rates", 3600], ["Factory power", 5140], ["Depreciation of machinery", 4300]], wipOpen: 4250, wipClose: 3680 };
    const m = manufacturing(d);
    const units = 2500;
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Sipho makes steel window frames in Gweru. For the year ended 31 December 2025: raw materials at 1 January ${money(6300)}; purchases of raw materials ${money(52700)}; returns of raw materials ${money(1100)}; raw materials at 31 December ${money(7450)}; direct wages ${money(31200)}; royalties paid per frame ${money(1650)}; indirect wages ${money(8900)}; factory rates ${money(3600)}; factory power ${money(5140)}; depreciation of machinery ${money(4300)}; work in progress at 1 January ${money(4250)} and at 31 December ${money(3680)}. ${fmt(units)} frames were completed.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: m.prime, wrong: [r2(m.prime - 1650)], stem: "Calculate the prime cost.", explanation: `Materials consumed 6,300 + 52,700 − 1,100 − 7,450 = ${fmt(m.consumed)}; + 31,200 + 1,650 = ${fmt(m.prime)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.production, wrong: [r2(m.factoryCost - 4250 + 3680)], stem: "Calculate the production cost of goods completed.", explanation: `Overheads ${fmt(m.totOH)}; total factory cost ${fmt(m.factoryCost)}; + 4,250 − 3,680 = ${fmt(m.production)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: m.production / units, dp: 2, stem: "Calculate the production cost per frame, to the nearest cent.", explanation: `${fmt(m.production)} ÷ ${fmt(units)} = US\\$${(m.production / units).toFixed(2)}.` }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare a statement showing the production cost of goods completed for the year ended 31 December 2025, with prime cost and total factory cost clearly shown.", points: ["Correct heading", `Raw materials consumed ${fmt(m.consumed)}`, `Prime cost ${fmt(m.prime)} including royalties`, `Factory overheads ${fmt(m.totOH)} listed`, `Work in progress adjusted; production cost ${fmt(m.production)}`], modelAnswer: m.md, explanation: "Follow the order of subtotals." }),
      ],
      hints: ["Royalties are a direct expense.", "Adjust for work in progress after the overheads."],
      explanation: `Model answer:\n\n${m.md}`,
    });
  }

  // ---------------------------------------------------------------- Cards
  b.card("DEFINITION", "Prime cost", "Direct materials consumed + direct labour + direct expenses.");
  b.card("DEFINITION", "Factory overheads", "Indirect factory costs that cannot be traced to each unit: factory rent, power, indirect wages, depreciation of factory machinery.");
  b.card("DEFINITION", "Work in progress", "Goods started but not finished at a date; a current asset at the year end.");
  b.card("FORMULA", "Raw materials consumed", "Opening raw materials + purchases + carriage inwards − returns − closing raw materials.");
  b.card("FORMULA", "Production cost of goods completed", "Prime cost + factory overheads + opening work in progress − closing work in progress.");
  b.card("FACT", "Direct expense example", "Royalties or licence fees paid per unit made; hire of a special machine for one product.");
  b.card("FACT", "Indirect wages", "Wages of supervisors, storekeepers, cleaners and maintenance staff: a factory overhead, not direct labour.");
  b.card("FACT", "Where do office and selling costs go in a manufacturer?", "Income statement expenses, never the manufacturing account.");
  b.card("CONCEPT", "Why adjust work in progress after overheads?", "Half-finished goods have used overheads as well as direct costs, so they are valued at full factory cost.");
});
