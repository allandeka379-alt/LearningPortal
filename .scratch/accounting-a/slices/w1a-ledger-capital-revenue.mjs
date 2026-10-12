// W1a: ledger.capital-revenue (Cambridge only: concept tagged automatically)
import { concept, P, table, check, sum, r2, fmt, money, journal } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.ledger.capital-revenue", { file: "ledger/capital-revenue", keyPrefix: "ledger.capital-revenue" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is **capital expenditure** for a bakery?",
    ok: ["Buying a new commercial oven", "Correct: it is a non-current asset used over several years."],
    bad: [["Buying flour for baking", "Materials used in production are revenue expenditure."], ["Paying the monthly electricity bill", "A running cost: revenue expenditure."], ["Servicing the delivery van", "Maintenance keeps the van as it was: revenue expenditure."]],
    explanation: "Capital expenditure acquires non-current assets that benefit more than one year.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is **revenue expenditure**?",
    ok: ["Annual servicing of a machine", "Correct: it maintains the machine in its existing condition."],
    bad: [["Purchase of a machine", "Acquiring a non-current asset is capital."], ["Installation of a machine", "Installation is part of the cost of bringing the machine into use."], ["Extending the factory building", "An extension improves the asset: capital."]],
    explanation: "Servicing and repairs are revenue expenditure.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Legal fees paid when a business buys a shop building should be:",
    ok: ["added to the cost of the building as capital expenditure", "Correct: they are necessary to acquire the asset."],
    bad: [["charged to the statement of profit or loss as revenue expenditure", "Costs of acquiring a non-current asset are capital."], ["recorded as drawings", "The fees are a business cost, not the owner's."], ["deducted from the sale proceeds of the old building", "They are costs of buying, not selling."]],
    explanation: "The cost of a non-current asset includes the costs of bringing it into the business and into use, including legal fees.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which one of these is a **capital receipt**?",
    ok: ["Proceeds from selling an old delivery van", "Correct: the sale of a non-current asset is not trading income."],
    bad: [["Rent received from a tenant", "Rent is income from activities: a revenue receipt."], ["Interest received on a deposit", "Interest is a revenue receipt."], ["Commission received from a supplier", "Commission is a revenue receipt."]],
    explanation: "Capital receipts include loans, capital introduced and the sale of non-current assets.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A clothing manufacturer's own employees build a new storeroom extension. Their wages for the work are US\\$2,400. How should the wages be treated?",
    ok: ["As capital expenditure, part of the cost of the extension", "Correct: the labour was used to create a non-current asset."],
    bad: [["As revenue expenditure, under wages", "The work created an asset, so the wages are part of its cost."], ["As drawings", "The employees work for the business, not the owner personally."], ["As a deduction from sales", "Wages are never deducted from sales."]],
    hints: ["Classify by what the work achieved."],
    explanation: "Wages used to create a non-current asset are capitalised.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A machine costing US\\$6,000 is wrongly debited to the repairs account. What is the effect on the financial statements of the year of purchase, ignoring depreciation?",
    ok: ["Profit and non-current assets are both understated by US\\$6,000", "Correct: an expense has been overstated and the asset omitted."],
    bad: [["Profit and non-current assets are both overstated by US\\$6,000", "The error is in the opposite direction."], ["Profit is overstated and non-current assets are understated", "An overstated expense understates profit."], ["Profit is understated but non-current assets are unaffected", "The asset is missing, so non-current assets are understated."]],
    hints: ["What happens to expenses and to the asset?"],
    explanation: "Charging an asset as an expense reduces profit and omits the asset from the statement of financial position.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A repair costing US\\$1,800 is wrongly added to the cost of equipment. What is the effect, ignoring depreciation?",
    ok: ["Profit and non-current assets are both overstated by US\\$1,800", "Correct: the expense has not been charged and the asset is too high."],
    bad: [["Profit and non-current assets are both understated by US\\$1,800", "The error is in the opposite direction."], ["Profit is understated and non-current assets are overstated", "Not charging an expense overstates profit."], ["Only non-current assets are affected", "Profit is also overstated."]],
    hints: ["Has an expense been missed?"],
    explanation: "The repair should have been an expense. Capitalising it raises profit and asset values.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A contractor's invoice of US\\$7,200 for work on a factory roof is made up of US\\$2,100 to replace damaged sheets and US\\$5,100 to add a new skylight section. How much is capital expenditure?",
    ok: ["US\\$5,100", "Correct: the new section is an improvement."],
    bad: [["US\\$7,200", "The replacement of damaged sheets is a repair."], ["US\\$2,100", "The repair part is revenue expenditure, not capital."], ["Nil, because the roof is not a new asset", "Improvements to an existing asset are capital."]],
    hints: ["Split the invoice into repair and improvement."],
    explanation: "Mixed expenditure is apportioned: the improvement is capital; the repair is revenue.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bank loan received is revenue income because cash comes into the business.",
    answer: false,
    explanation: "False. A loan is a capital receipt and creates a liability. It is not shown in the statement of profit or loss.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The cost of delivering a new machine to the factory is part of the cost of the machine.",
    answer: true,
    explanation: "True. Carriage on the purchase of a non-current asset is capital expenditure, because it is needed to bring the asset into use.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Classify each item of Tendai's tuck shop.",
    pairs: ["Buying a freezer", "Buying packets of sweets for resale", "Building a new storage room", "Insurance of the shop", "Commission received from a drinks supplier", "Additional capital paid in by Tendai"],
    right: ["Capital expenditure", "Revenue expenditure", "Capital receipt", "Revenue receipt"],
    rightIndex: [0, 1, 0, 1, 3, 2],
    explanation: "The freezer and storage room are non-current assets; sweets and insurance are running costs; commission is income; the owner's capital is a capital receipt.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Capital expenditure is recorded in the statement of {{blank:a}} and depreciated; revenue expenditure is charged to the statement of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["financial position"], choices: ["financial position", "profit or loss"] },
      { id: "b", accepted: ["profit or loss"], choices: ["financial position", "profit or loss"] },
    ],
    explanation: "Capital expenditure becomes an asset; revenue expenditure is an expense of the period.",
  });

  const c1 = sum([9400, 380, 560]);
  check("c1", c1, 10340);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: c1, daily: true, calculator: true, wrong: [sum([9400, 380, 560, 410]), 9400],
    stem: "Nyasha buys a milling machine for her business. She pays: price US\\$9,400; delivery US\\$380; installation US\\$560; insurance for the first year US\\$410. Calculate the cost of the machine to be capitalised.",
    explanation: "9,400 + 380 + 560 = 10,340. The insurance is a running cost. Including it gives 10,750.",
  });
  const items = [["Replacement of broken windows", 640, "R"], ["Fitting a new security gate", 1980, "C"], ["Fuel", 2240, "R"], ["Extension of the workshop", 11800, "C"], ["Painting the extension on completion", 870, "C"], ["Repainting the old office", 530, "R"]];
  const revTot = sum(items.filter((i) => i[2] === "R").map((i) => i[1]));
  check("revTot", revTot, 3410);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: revTot, calculator: true, wrong: [sum(items.filter((i) => i[2] === "C").map((i) => i[1])), r2(revTot + 870)],
    stem: "Chipo's payments during the year included:\n\n" + table(["Payment", "US\\$"], items.map((i) => [i[0], i[1]])) + "\n\nCalculate the total revenue expenditure.",
    hints: ["Painting needed to complete a new extension is part of its cost.", "Replacing like with like is maintenance."],
    explanation: "Revenue: windows 640 + fuel 2,240 + repainting the old office 530 = 3,410. The gate, the extension and the painting of the extension are capital. Counting the new painting as revenue gives 4,280.",
  });
  const cp = r2(28600 + 6000 - 600);
  check("cp", cp, 34000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: cp, calculator: true, wrong: [r2(28600 + 6000), r2(28600 - 6000 + 600)],
    stem: "Draft profit for the year was US\\$28,600. A machine costing US\\$6,000 had been debited to repairs. Machinery is depreciated at 10% of cost per year, straight line, with a full year's charge in the year of purchase. Calculate the corrected profit for the year.",
    hints: ["Remove the repairs charge, then charge depreciation."],
    explanation: "Add back 6,000 and deduct depreciation of 10% × 6,000 = 600: 28,600 + 6,000 - 600 = 34,000. Leaving out the depreciation gives 34,600.",
  });
  const cp2 = r2(52000 - 3200 + 640);
  check("cp2", cp2, 49440);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: cp2, calculator: true, wrong: [r2(52000 - 3200), r2(52000 - 3200 - 640)],
    stem: "Draft profit for the year was US\\$52,000. A repair of US\\$3,200 to a lathe had been added to the cost of equipment. Equipment is depreciated at 20% a year straight line, with a full year's charge in the year of purchase, and the depreciation charge of US\\$640 on the repair has already been deducted in arriving at the draft profit. Calculate the corrected profit for the year.",
    hints: ["Charge the repair as an expense, then remove the depreciation that was charged on it."],
    explanation: "The repair is an expense: -3,200. The depreciation of 640 charged on it was wrong, so it is added back: 52,000 - 3,200 + 640 = 49,440.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State whether the cost of installing a new machine is capital or revenue expenditure.",
    accepted: ["capital", "capital expenditure", "it is capital", "capital expenditure."],
    explanation: "Installation is a cost of bringing the machine into use, so it is capital expenditure.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between a capital receipt and a revenue receipt, giving one example of each.",
    points: ["Capital receipt: not from normal trading, e.g. a bank loan or the sale of a non-current asset", "Revenue receipt: income from normal activities, e.g. sales or rent received"],
    modelAnswer: "A capital receipt is money received that is not trading income, such as a bank loan. A revenue receipt is income from normal activities, such as sales.",
    explanation: "A definition with an example for each.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why wrongly treating a repair as capital expenditure overstates profit.",
    points: ["The repair should have been charged as an expense in the year", "Capitalising it removes the expense from the statement of profit or loss, so profit is higher", "Non-current assets are also overstated, and only a small depreciation charge is made against it"],
    modelAnswer: "A repair is a running cost that should reduce profit in the year. If it is added to the cost of an asset, no expense is charged, so profit is overstated and the asset is shown at too high a value; only the depreciation on it is charged.",
    hints: ["Which statement is affected, and in which direction?"],
    explanation: "Link the classification to its effect on both statements.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Gweru Dairy's owner proposes to treat all spending on the delivery vehicle, including fuel and servicing, as capital expenditure 'so that profit looks higher for the bank'. Evaluate this proposal.",
    points: ["It would overstate profit and assets by capitalising running costs", "It breaches the matching and prudence concepts and could mislead the bank", "Only costs that acquire or improve the vehicle may be capitalised; the rest must be charged as expenses"],
    modelAnswer: "The proposal would overstate profit and the value of the vehicle, because fuel and servicing are running costs that belong to the year. This ignores matching and prudence and could mislead the bank. Only the cost of acquiring or improving the vehicle may be capitalised.",
    hints: ["Which costs really create or improve the asset?"],
    explanation: "A reasoned judgement using concepts and users' decisions.",
  });

  // Structured 1: classification (12 marks)
  const sched = [["Purchase of a guillotine for the print shop", 8950, "C"], ["Transport of the guillotine to the workshop", 275, "C"], ["Cleaning materials", 135, "R"], ["Wiring of a new power point for the guillotine", 420, "C"], ["Replacing a worn blade on the old press (same type)", 310, "R"], ["Installing air conditioning in the workshop for the first time", 2600, "C"]];
  const sCap = sum(sched.filter((s) => s[2] === "C").map((s) => s[1]));
  const sRev = sum(sched.filter((s) => s[2] === "R").map((s) => s[1]));
  check("sCap", sCap, 12245);
  check("sRev", sRev, 445);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Sipho owns a printing business in Masvingo. During the year ended 31 December 2025 he made these payments:\n\n" + table(["Payment", "US\\$"], sched.map((s) => [s[0], s[1]])),
    parts: [
      P.match({ label: "(a)", stem: "Classify each payment.", pairs: sched.map((s) => s[0]), right: ["Capital expenditure", "Revenue expenditure"], rightIndex: sched.map((s) => (s[2] === "C" ? 0 : 1)), explanation: "The guillotine, its transport, the wiring and the new air conditioning are capital; cleaning materials and like-for-like replacement of a worn blade are revenue." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: sCap, wrong: [sRev, sum(sched.map((s) => s[1]))], stem: "Calculate the total capital expenditure.", explanation: "8,950 + 275 + 420 + 2,600 = 12,245." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: sRev, wrong: [sRev + 310 * 2], stem: "Calculate the total revenue expenditure.", explanation: "135 + 310 = 445." }),
      P.manual({ label: "(d)", marks: 2, stem: "State where the guillotine and the cleaning materials appear in Sipho's financial statements.", points: ["Guillotine: non-current asset (equipment) in the statement of financial position", "Cleaning materials: an expense in the statement of profit or loss"], modelAnswer: "The guillotine is a non-current asset in the statement of financial position; the cleaning materials are an expense in the statement of profit or loss.", explanation: "Capital items go to the statement of financial position; revenue items to profit or loss." }),
    ],
    hints: ["Does the payment acquire, bring into use or improve an asset?"],
    explanation: "This item tests classification and totals.",
  });

  // Structured 2: corrected profit (14 marks)
  const d0 = 36900;
  const lorry = 18800;
  const lorryDep = r2(lorry * 0.25);
  const paint = 2150;
  const inst = 640;
  const instDep = r2(inst * 0.1);
  const fixed = r2(d0 + lorry - lorryDep - paint + inst - instDep);
  check("fixed", fixed, 49426);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `The draft profit for the year ended 31 December 2025 of Nyasha Transport, Harare, was ${money(d0)}. These errors were found:\n\n1. A lorry costing ${money(lorry)} was debited to motor expenses.\n2. Painting the depot walls, ${money(paint)}, was added to the cost of buildings.\n3. Wages of ${money(inst)} paid to employees for installing a new machine were debited to wages.\n\nLorries are depreciated at 25% of cost a year and machinery at 10% of cost a year, both straight line with a full year's charge in the year of purchase. No depreciation is charged on buildings. Depreciation on the machine's cost excluding installation has already been charged.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Record the correction of error 2.",
        template: "Debit {{blank:dr}}; credit {{blank:cr}}.",
        blanks: [
          { id: "dr", accepted: ["Repairs and maintenance"], choices: ["Repairs and maintenance", "Buildings", "Motor vehicles"] },
          { id: "cr", accepted: ["Buildings"], choices: ["Repairs and maintenance", "Buildings", "Motor vehicles"] },
        ],
        explanation: "Painting maintains the walls, so it is an expense (debit) and is removed from the asset (credit Buildings).",
      }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: lorryDep, wrong: [r2(lorry * 0.1)], stem: "Calculate the depreciation on the lorry for 2025.", explanation: "25% × 18,800 = 4,700." }),
      P.num({ label: "(c)", marks: 4, kind: "money", value: fixed, wrong: [r2(d0 + lorry - paint + inst), r2(d0 + lorry + paint - inst)], stem: "Calculate the corrected profit for the year.", explanation: "36,900 + 18,800 - 4,700 - 2,150 + 640 - 64 = 49,426." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: r2(lorry - lorryDep), wrong: [lorry], stem: "Calculate the carrying amount of the lorry at 31 December 2025.", explanation: "18,800 - 4,700 = 14,100." }),
      P.manual({ label: "(e)", marks: 4, stem: "The owner wishes to apply for a bank loan and will use the draft figures. Evaluate the effect of the errors on the owner's position.", points: ["Profit was understated by 12,526 (corrected 49,426 against draft 36,900)", "Non-current assets were understated, so the bank sees a weaker asset base", "The errors are not all in the same direction (the painting was overstated as an asset), so the correction must be made item by item", "The corrected figures give a fairer picture and should be used in the application"], modelAnswer: "The draft profit of US\\$36,900 was understated by US\\$12,526 and the lorry was missing from non-current assets, so the business looked weaker than it is. The painting was wrongly treated as an asset, so some figures were overstated. The corrected figures give a true picture and should be used for the loan application.", explanation: "Use figures from the correction and refer to the user's decision." }),
    ],
    hints: ["Capital items charged as expenses raise profit when corrected; capitalised expenses lower it.", "Do not forget the depreciation."],
    explanation: "This item tests correcting misclassification and its effect on profit and assets.",
  });

  b.card("DEFINITION", "What is **capital expenditure**?", "Spending to acquire, improve or extend the life or capacity of a non-current asset, including costs of bringing it into use.");
  b.card("DEFINITION", "What is **revenue expenditure**?", "Spending on running the business and maintaining assets in their existing condition; charged to profit or loss.");
  b.card("FACT", "Costs included in the cost of a non-current asset", "Net purchase price, delivery, installation, foundations, testing, legal fees on property.");
  b.card("CONCEPT", "Repair or improvement?", "Repair or maintenance (restores the asset): revenue. Improvement or extension of life or capacity: capital.");
  b.card("FACT", "Capital item charged as an expense", "Profit and non-current assets are both understated (before depreciation).");
  b.card("FACT", "Revenue item capitalised", "Profit and non-current assets are both overstated (before depreciation).");
  b.card("DEFINITION", "What is a **capital receipt**?", "Money received from a source other than trading: a loan, capital introduced, or the sale of a non-current asset.");
  b.card("DEFINITION", "What is a **revenue receipt**?", "Income from normal activities: sales, commission, rent and interest received.");
  b.card("CONCEPT", "Mixed expenditure", "Split an invoice into its capital and revenue parts and treat each separately.");
});
