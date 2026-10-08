// W3a: depreciation, causes and methods (straight line, reducing balance, revaluation).
import { concept, P, money, check, sum, r2, depreciation } from "../lib.mjs";
import { table, schedule, slRows, rbRows, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.depreciation-methods", { file: "adjustments/depreciation-methods", keyPrefix: "adjustments.depreciation-methods" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **depreciation**?",
    options: [
      ["The part of an asset's cost used up in a period", "Correct: it allocates the cost over the asset's useful life."],
      ["Cash put aside each year to buy a replacement asset later", "No cash is set aside; depreciation is a non-cash expense."],
      ["The amount received when a non-current asset is sold", "That is the sale proceeds (disposal value)."],
      ["The fall in the market price of goods held for resale", "Goods for resale are inventory, not non-current assets."],
    ],
    answer: "A",
    explanation: "Depreciation charges part of a non-current asset's cost as an expense in each period that benefits from the asset.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A business replaces its computers because new models are much faster, although the old ones still work. Which cause of depreciation is this?",
    options: [
      ["Obsolescence", "Correct: the asset is out of date, not worn out."],
      ["Wear and tear", "The computers still work; they have not worn out."],
      ["Depletion", "Depletion applies to natural resources such as mines and quarries."],
      ["Passage of time", "That applies to assets with a fixed legal life, such as a lease."],
    ],
    answer: "A",
    explanation: "Obsolescence is loss of value because better or more efficient assets have become available.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which accounting concept is the main reason for charging depreciation?",
    options: [
      ["Matching (accruals)", "Correct: the cost is matched against the income the asset helps to earn over its life."],
      ["Going concern", "Going concern supports valuing assets at cost, but it is not the reason for spreading the cost."],
      ["Business entity", "That separates the owner from the business."],
      ["Duality", "Duality explains double entry, not why cost is spread over years."],
    ],
    answer: "A",
    explanation: "Depreciation spreads the cost of a non-current asset over the periods that benefit, applying the matching concept.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which non-current asset is most suitably depreciated by the **revaluation** method?",
    options: [
      ["Loose tools in a motor repair workshop", "Correct: many small items, impractical to depreciate one by one."],
      ["A delivery lorry", "Vehicles lose most value early: reducing balance suits them."],
      ["A building on a 20-year lease", "A lease loses value evenly with time: straight line suits it."],
      ["Office furniture bought on one date", "A single purchase used evenly suits straight line."],
    ],
    answer: "A",
    explanation: "The revaluation method values groups of small items (loose tools, crockery, livestock) at each year end.",
  });
  // RB with error distractors
  const rb1 = depreciation.reducingBalance(15000, 20, 2);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A machine costing US\\$15,000 is depreciated at 20% per annum on the reducing-balance method. What is the depreciation charge for the **second** year?",
    options: [
      [money(rb1[1].charge), "Correct: 20% of the net book value of 12,000 at the start of year 2."],
      [money(3000), "This is 20% of cost: the straight-line answer."],
      [money(rb1[1].nbv), "This is the net book value at the end of year 2."],
      [money(6000), "This is the accumulated depreciation after two years at 20% of cost."],
    ],
    answer: "A",
    explanation: `Year 1: 20% × 15,000 = 3,000; NBV 12,000. Year 2: 20% × 12,000 = ${f(rb1[1].charge)}.`,
  });
  check("rb1", rb1[1].charge, 2400);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the reducing-balance method often chosen for motor vehicles?",
    options: [
      ["Vehicles lose most of their value in the early years of use", "Correct: the high early charges match the fast early fall in value."],
      ["It reduces the total depreciation charged over the vehicle's life", "Over the whole life the total charged is about the same; only the timing differs."],
      ["The charge is the same every year, so it is easy to compare", "That describes straight line."],
      ["It ignores the residual value of the vehicle", "Ignoring residual value is not a reason to choose a method."],
    ],
    answer: "A",
    hints: ["Think about how a vehicle's market value falls after it is bought."],
    explanation: "Vehicles lose value fastest when new, and their repair costs rise as they age, so falling depreciation charges keep the total yearly cost more even.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A business buys a machine on 1 October 2025. Its policy is to charge 12% per annum on cost, time apportioned. The year end is 31 December. For how many months is depreciation charged in 2025?",
    options: [
      ["3 months", "Correct: October, November and December."],
      ["9 months", "This counts the months before the purchase."],
      ["12 months", "This would be the policy of a full year in the year of purchase."],
      ["No months", "This would be the policy of no depreciation in the year of purchase."],
    ],
    answer: "A",
    hints: ["Count the months from the purchase date to the year end."],
    explanation: "Time apportioned means only the months the asset was owned: 1 October to 31 December is 3 months.",
  });
  const slx = depreciation.straightLine(32000, 4000, 5);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Tatenda buys a hammer mill for US\\$32,000. He expects to use it for five years and then sell it for US\\$4,000. What is its net book value after **three** years using the straight-line method?",
    options: [
      [money(r2(32000 - 3 * slx)), "Correct: 32,000 − 3 × 5,600."],
      [money(r2(32000 - 3 * 6400)), "This ignores the residual value (32,000 ÷ 5 = 6,400 a year)."],
      [money(r2(3 * slx)), "This is the accumulated depreciation, not the net book value."],
      [money(r2(32000 - 2 * slx)), "This is the value after two years."],
    ],
    answer: "A",
    hints: ["Annual charge = (cost − residual value) ÷ life."],
    explanation: `Annual charge (32,000 − 4,000) ÷ 5 = ${f(slx)}. After three years: 32,000 − 3 × ${f(slx)} = ${f(r2(32000 - 3 * slx))}.`,
  });
  check("slx", slx, 5600);

  // ---- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Charging depreciation reduces the cash balance of the business.",
    answer: false,
    explanation: "False. Depreciation is a non-cash expense; cash left the business when the asset was bought.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the reducing-balance method the depreciation charge falls every year.",
    answer: true,
    explanation: "True. The same percentage is applied to a smaller net book value each year.",
  });

  // ---- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each asset with the cause of depreciation that mainly affects it.",
    pairs: [["A minibus used daily on rough roads", "Wear and tear"], ["A copper mine", "Depletion"], ["A 15-year lease on a shop in Gweru", "Passage of time"], ["Mobile phones used by sales staff", "Obsolescence"]],
    explanation: "Physical use wears out vehicles; mines are used up; leases expire with time; technology goes out of date.",
  });

  // ---- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the formulas.",
    template: "Straight line: (cost − {{blank:a}}) ÷ useful life. Reducing balance: rate × {{blank:b}} at the start of the year. Revaluation: opening value + purchases − {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["residual value"], choices: ["residual value", "accumulated depreciation", "sale proceeds"] },
      { id: "b", accepted: ["net book value"], choices: ["net book value", "cost", "residual value"] },
      { id: "c", accepted: ["closing value"], choices: ["closing value", "cost", "depreciation"] },
    ],
    explanation: "These three formulas cover every depreciation calculation at this level.",
  });

  // ---- Numerical
  const rv = { open: 3150, bought: 1240, sold: 180, close: 3420 };
  const rvDep = r2(rv.open + rv.bought - rv.sold - rv.close);
  b.calc({
    d: 3, kind: "money", value: rvDep, calculator: true, wrong: [r2(rvDep + rv.sold), r2(rv.open - rv.close + rv.bought + rv.sold)],
    stem: "Chipo runs a restaurant in Masvingo. Her crockery and cutlery were valued at US\\$3,150 on 1 January 2025. During the year she bought more for US\\$1,240 and sold some old items for US\\$180 cash. On 31 December 2025 the crockery and cutlery were valued at US\\$3,420. Calculate the depreciation for the year.",
    hints: ["Opening value + purchases − sale proceeds − closing value."],
    explanation: `3,150 + 1,240 − 180 − 3,420 = ${f(rvDep)}. Forgetting to deduct the 180 received gives ${f(r2(rvDep + rv.sold))}.`,
  });
  check("rvDep", rvDep, 790);
  const pm = r2((14400 * 15) / 100 * (7 / 12));
  b.calc({
    d: 3, kind: "money", value: pm, calculator: true, wrong: [r2(14400 * 0.15), r2((14400 * 0.15 * 5) / 12)],
    stem: "Sipho bought a generator on 1 June 2025 for US\\$14,400. He depreciates generators at 15% per annum on cost, on a monthly basis. His year end is 31 December. Calculate the depreciation charge for 2025.",
    hints: ["June to December inclusive is how many months?"],
    explanation: `Annual charge 15% × 14,400 = 2,160. June to December = 7 months: 2,160 × 7/12 = ${f(pm)}. A full year would be 2,160; counting only 5 months gives 900.`,
  });
  check("pm", pm, 1260);
  const rb3 = rbRows(40000, 30, 3);
  b.calc({
    d: 4, kind: "money", value: rb3[2].nbv, calculator: true, wrong: [r2(40000 - 3 * 12000), rb3[2].charge],
    stem: "Nyasha bought a tractor for her farm near Chinhoyi on 1 January 2023 for US\\$40,000. She depreciates it at 30% per annum using the reducing-balance method. Calculate the net book value of the tractor at 31 December 2025.",
    hints: ["Work year by year: each charge is 30% of the previous closing net book value.", "Three years: 2023, 2024 and 2025."],
    explanation: `2023: 30% × 40,000 = 12,000; NBV 28,000. 2024: 30% × 28,000 = 8,400; NBV 19,600. 2025: 30% × 19,600 = 5,880; NBV ${f(rb3[2].nbv)}. Taking 30% of cost every year would give 4,000.`,
  });
  check("rb3", rb3[2].nbv, 13720);
  const slr = { cost: 7650, life: 6, res: 450 };
  const slrc = depreciation.straightLine(slr.cost, slr.res, slr.life);
  b.num({
    d: 2, kind: "money", value: slrc, daily: true, wrong: [r2(slr.cost / slr.life)],
    stem: "A printer for a school club costs US\\$7,650, has a useful life of 6 years and a residual value of US\\$450. Calculate the annual straight-line depreciation.",
    explanation: `(7,650 − 450) ÷ 6 = ${f(slrc)}. Ignoring the residual value gives 1,275.`,
  });
  check("slrc", slrc, 1200);

  // ---- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** causes of depreciation and give an example of an asset affected by each.",
    points: ["One cause with a suitable asset, e.g. wear and tear: delivery van", "A second cause with a suitable asset, e.g. obsolescence: computer; passage of time: lease; depletion: quarry"],
    modelAnswer: "Wear and tear, for example a delivery van used every day; obsolescence, for example a computer replaced by a faster model.",
    explanation: "Any two of wear and tear, obsolescence, passage of time and depletion, each with a matching asset.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Farai says he will not charge depreciation this year because profits are low and 'the machine has not cost any money this year'. Explain why he is wrong.",
    points: ["The machine has been used to earn this year's income, so part of its cost must be matched against it (matching concept)", "Without depreciation profit would be overstated", "and the machine would be overstated in the statement of financial position / the method should be applied consistently every year"],
    modelAnswer: "Depreciation is not a payment but an allocation of cost. The machine helped earn this year's income, so part of its cost is an expense of this year (matching). Leaving it out overstates profit and the asset's value, and breaks the consistency concept.",
    hints: ["Is depreciation a cash payment?"],
    explanation: "Depreciation must be charged every year the asset is used, whatever the level of profit.",
  });

  // ---- Practice structured 1: compare methods
  const cmpSl = slRows(27000, 3000, 4, 2023);
  const cmpRb = rbRows(27000, 40, 3, 2023);
  const slAcc = sum(cmpSl.slice(0, 3).map((x) => x.charge));
  const rbAcc = sum(cmpRb.map((x) => x.charge));
  check("cmp", cmpSl[0].charge, 6000);
  check("rbAcc", rbAcc, 21168);
  const rbTable = schedule(27000, cmpRb).md;
  b.struct({
    d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Thandeka runs a courier service in Harare. On 1 January 2023 she bought a motorcycle fleet for US\\$27,000. She expects to use it for four years and then sell it for US\\$3,000. She is comparing two depreciation methods:\n\n- Method 1: straight line.\n- Method 2: reducing balance at 40% per annum.\n\nHer year end is 31 December.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cmpSl[0].charge, wrong: [r2(27000 / 4)], stem: "Calculate the annual depreciation charge using Method 1.", explanation: "(27,000 − 3,000) ÷ 4 = 6,000." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: cmpRb[0].charge, wrong: [r2(24000 * 0.4)], stem: "Calculate the depreciation charge for 2023 using Method 2.", explanation: "40% × 27,000 = 10,800 (the residual value is not deducted under reducing balance)." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: cmpRb[1].charge, wrong: [cmpRb[0].charge], stem: "Calculate the depreciation charge for 2024 using Method 2.", explanation: `40% × (27,000 − 10,800) = 40% × 16,200 = ${f(cmpRb[1].charge)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: cmpRb[2].nbv, wrong: [r2(27000 - 3 * 10800)], stem: "Calculate the net book value at 31 December 2025 using Method 2.", explanation: `2025 charge: 40% × 9,720 = 3,888. NBV 9,720 − 3,888 = ${f(cmpRb[2].nbv)}.` }),
      P.num({ label: "(e)", marks: 1, kind: "money", value: r2(rbAcc - slAcc), wrong: [rbAcc], stem: "By how much is the total depreciation charged for 2023–2025 under Method 2 greater than under Method 1?", explanation: `Method 2: 10,800 + 6,480 + 3,888 = ${f(rbAcc)}. Method 1: 3 × 6,000 = ${f(slAcc)}. Difference ${f(r2(rbAcc - slAcc))}.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Advise Thandeka which method to use. Give a reason.", points: ["Reducing balance (Method 2)", "Motorcycles lose most value in the early years / repairs rise later so the total yearly cost is more even"], modelAnswer: "Method 2, reducing balance: motorcycles lose value fastest when new, and as repair costs rise the depreciation falls, keeping the yearly cost of using them more even. (Straight line accepted only with a reason such as simplicity.)", explanation: "Name the method and link the reason to how the asset loses value." }),
    ],
    hints: ["Reducing balance ignores residual value: apply the rate to the net book value.", "Each method's total over three years is the sum of the three charges."],
    explanation: `Schedule under Method 2:\n\n${rbTable}`,
  });

  // ---- Practice structured 2: revaluation + straight line schedule
  const lv = { open: 4860, bought: 1575, close: 5120 };
  const lvDep = r2(lv.open + lv.bought - lv.close);
  check("lvDep", lvDep, 1315);
  const eq = slRows(12600, 600, 5, 2024);
  b.struct({
    d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Tendai owns a panel-beating workshop in Gweru. His year end is 31 December.\n\n" +
      table(["Information", U], [["Loose tools at valuation, 1 January 2025", lv.open], ["Loose tools bought during 2025", lv.bought], ["Loose tools at valuation, 31 December 2025", lv.close], ["Spray-painting equipment bought 1 January 2024, at cost", 12600]]) +
      "\n\nThe spray-painting equipment has a useful life of five years and a residual value of US\\$600. It is depreciated by the straight-line method.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: lvDep, wrong: [r2(lv.close - lv.open)], stem: "Calculate the depreciation of loose tools for 2025.", explanation: `4,860 + 1,575 − 5,120 = ${f(lvDep)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: eq[0].charge, wrong: [r2(12600 / 5)], stem: "Calculate the annual depreciation of the spray-painting equipment.", explanation: "(12,600 − 600) ÷ 5 = 2,400." }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: eq[1].nbv, wrong: [eq[0].nbv], stem: "Calculate the net book value of the equipment at 31 December 2025.", explanation: `12,600 − 2 × 2,400 = ${f(eq[1].nbv)}.` }),
      P.mcq({ label: "(d)", stem: "Why is the revaluation method used for the loose tools?", options: [["There are too many small items to depreciate one by one", "Correct."], ["Loose tools never wear out or lose value through use", "They do wear out and get lost; that is why their value falls."], ["The revaluation method always gives a lower charge", "The charge depends on the valuations, not the method."], ["Tools bought during the year must not be depreciated at all", "Purchases are included in the calculation."]], answer: "A", explanation: "Loose tools are numerous, cheap and easily lost, so a year-end valuation is used." }),
      P.manual({ label: "(e)", marks: 2, stem: "State **one** advantage and **one** disadvantage of the revaluation method.", points: ["Advantage: simple for many small items / reflects actual loss, including losses and breakages", "Disadvantage: valuation is subjective / depends on judgement, so profit may vary"], modelAnswer: "It is simple and reflects real losses of small items; but valuations depend on judgement, so the charge can be inconsistent.", explanation: "Balance practicality against subjectivity." }),
    ],
    hints: ["Revaluation: opening value + purchases − closing value."],
    explanation: "This item practises the revaluation and straight-line methods.",
  });

  // ---- More MCQ / TF to reach the mix
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about the **straight-line** method is correct?",
    options: [
      ["The same amount is charged in each year of the asset's useful life", "Correct."],
      ["The charge is highest in the first year", "That describes reducing balance."],
      ["The asset is valued at each year end to find the charge", "That describes revaluation."],
      ["The residual value is depreciated as well", "Only cost less residual value is spread over the life."],
    ],
    answer: "A",
    explanation: "Straight line spreads (cost − residual value) equally over the useful life.",
  });

  // ---- Cards
  b.card("DEFINITION", "What is **depreciation**?", "The part of a non-current asset's cost used up in a period, charged as an expense (a non-cash expense).");
  b.card("FACT", "Four causes of depreciation", "Wear and tear; obsolescence; passage of time; depletion.");
  b.card("FORMULA", "Straight-line depreciation", "(Cost − residual value) ÷ useful life in years.");
  b.card("FORMULA", "Reducing-balance depreciation", "Rate % × net book value at the start of the year (cost − depreciation so far).");
  b.card("FORMULA", "Revaluation method", "Opening value + items bought − sale proceeds − closing value.");
  b.card("DEFINITION", "What is **net book value**?", "Cost less accumulated depreciation (Cambridge also says carrying amount).");
  b.card("CONCEPT", "Why charge depreciation?", "Matching: spread the cost over the years that benefit; prudence: do not overstate profit or assets.");
  b.card("FACT", "Which method suits vehicles, buildings and loose tools?", "Vehicles: reducing balance. Buildings, leases, furniture: straight line. Loose tools, crockery, livestock: revaluation.");
  b.card("FACT", "Time-apportioned depreciation", "Charge only for the months owned: annual charge × months ÷ 12.");
});
