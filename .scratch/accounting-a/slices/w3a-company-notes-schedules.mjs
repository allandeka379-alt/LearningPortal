// W3a: company.notes-schedules
import { concept, P, table, check, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";
import { ncaSchedule } from "../tables/w3a-models.mjs";

concept("aacc.company.notes-schedules", { file: "company/notes-schedules", keyPrefix: "company.notes-schedules" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a schedule of non-current assets, how is an asset that has been sold removed?",
    ok: ["At cost from cost and at its accumulated depreciation from depreciation", "Correct: both records of the asset are cleared."],
    bad: [["At the sale proceeds, taken from the cost section only", "The proceeds are not the cost of the asset."], ["At its carrying amount, taken from the cost section only", "The accumulated depreciation must also be removed."], ["It is left in the schedule until the end of the next year", "A disposed asset leaves the schedule in the year of sale."]],
    explanation: "The schedule is built from cost and accumulated depreciation, so a disposal reduces both.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the profit or loss on the disposal of a non-current asset calculated?",
    ok: ["Proceeds less the carrying amount at the date of sale", "Correct: a positive result is a profit."],
    bad: [["Proceeds less the original cost", "That ignores the depreciation charged."], ["Original cost less accumulated depreciation, ignoring the proceeds", "That is the carrying amount only."], ["Proceeds less the depreciation charge for the last year", "Total accumulated depreciation is needed."]],
    explanation: "Profit or loss = proceeds - (cost - accumulated depreciation).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item would normally be disclosed in the notes to a company's financial statements?",
    ok: ["The dates on which the loan notes are repayable", "Correct: the statement shows only the total."],
    bad: [["The ledger accounts of each customer", "Ledgers are not part of the published statements."], ["The trial balance before adjustments", "A trial balance is an internal working."], ["The names of all trade payables", "Only the total is shown."]],
    explanation: "Notes give analysis of items such as borrowings that the face of the statements cannot show.",
  });
  const c1 = 96000, ad1 = 38000, ch1 = 12000;
  const cv1 = r2(c1 - ad1 - ch1);
  chk(cv1, 46000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A class of machinery had a cost of ${money(c1)} and accumulated depreciation of ${money(ad1)} at the start of the year. There were no additions or disposals. The depreciation charge for the year was ${money(ch1)}. What is the carrying amount at the end of the year?`,
    ok: [money(cv1), "Correct: 96,000 - 38,000 - 12,000."],
    bad: [[money(r2(c1 - ad1)), "This year's depreciation has not been deducted."], [money(r2(c1 - ch1)), "The opening accumulated depreciation has been ignored."], [money(r2(c1 - ad1 + ch1)), "The charge has been added instead of deducted."]],
    hints: ["Accumulated depreciation at the end = opening + charge."],
    explanation: "Closing accumulated depreciation = 38,000 + 12,000 = 50,000; carrying amount = 96,000 - 50,000 = 46,000.",
  });
  const dc = 27000, da = 19800, dp = 5400;
  const dres = r2(dp - (dc - da));
  chk(dres, -1800);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A lorry which cost ${money(dc)} had accumulated depreciation of ${money(da)} when it was sold for ${money(dp)}. What is the result of the disposal?`,
    ok: ["A loss of US\\$1,800", "Correct: carrying amount 7,200 against proceeds of 5,400."],
    bad: [["A profit of US\\$1,800", "The proceeds are below the carrying amount, so it is a loss."], ["A loss of US\\$21,600", "That compares the proceeds with the cost."], ["A profit of US\\$5,400", "The proceeds are not the profit."]],
    hints: ["First find the carrying amount at the date of sale."],
    explanation: "Carrying amount = 27,000 - 19,800 = 7,200; proceeds 5,400; loss 1,800.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Accumulated depreciation on plant was US\\$62,000 at the start of the year. The charge for the year was US\\$15,500 and the accumulated depreciation on plant sold was US\\$9,400. What is the accumulated depreciation at the end of the year?",
    ok: [money(r2(62000 + 15500 - 9400)), "Correct: 62,000 + 15,500 - 9,400."],
    bad: [[money(r2(62000 + 15500)), "The depreciation on the plant sold has not been removed."], [money(r2(62000 + 15500 + 9400)), "The depreciation of the plant sold has been added."], [money(r2(62000 - 15500 - 9400)), "The charge for the year is added, not deducted."]],
    hints: ["Sold assets take their depreciation with them."],
    explanation: "62,000 + 15,500 - 9,400 = 68,100.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Land is revalued upwards by US\\$18,500. Where does the gain appear in the schedule and in the statements?",
    ok: ["As a revaluation increase in valuation, and as other comprehensive income", "Correct: it is credited to the revaluation reserve."],
    bad: [["As a reduction in accumulated depreciation, and as sales revenue", "Land is not depreciated and the gain is not revenue."], ["As a disposal, and as profit for the year", "No sale has taken place."], ["Nowhere in the schedule, because land is never revalued", "IAS 16 allows revaluation of a whole class of assets."]],
    hints: ["Is the gain realised?"],
    explanation: "The revaluation raises the valuation of the land and is reported in other comprehensive income.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "The sale proceeds of a machine were deducted from the cost column in the schedule instead of the cost of the machine. What is the effect?",
    ok: ["Closing cost is overstated if the proceeds were lower than the cost", "Correct: too little has been removed."],
    bad: [["Closing cost is understated if the proceeds were lower than the cost", "Removing a smaller amount leaves cost too high."], ["There is no effect, because both are cash figures", "The cost and the proceeds are different amounts."], ["Only the depreciation charge is affected", "The cost column is also wrong."]],
    hints: ["Compare the amount removed with the amount that should be removed."],
    explanation: "Only the cost of the asset should be removed; using the lower proceeds leaves cost overstated.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Land is depreciated in the schedule of non-current assets in the same way as buildings.", answer: false, explanation: "False. Land has an unlimited life, so it is not depreciated; the buildings on it are." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A final dividend proposed after the year end is shown as a current liability in the statement of financial position and repeated in the notes.", answer: false, hints: ["Was there an obligation at the year end?"], explanation: "False. It is disclosed in the notes only; it is not a liability at the year end." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to the section of the schedule of non-current assets in which it appears.",
    pairs: ["Purchase of new machinery", "Charge for the year", "Accumulated depreciation of a vehicle sold", "Upward revaluation of land"],
    right: ["Additions in the cost section", "Charge in the depreciation section", "Disposals in the depreciation section", "Revaluation in the cost section"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Purchases and revaluations belong in the cost or valuation section; the charge and the depreciation on disposals belong in the depreciation section.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about disposals.",
    template: "Carrying amount = cost {{blank:a}} accumulated depreciation. If the proceeds are lower than the carrying amount, the result is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["minus"], choices: ["plus", "minus"] },
      { id: "b", accepted: ["loss"], choices: ["profit", "loss"] },
    ],
    explanation: "Carrying amount is cost less accumulated depreciation; proceeds below it give a loss on disposal.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the document that gives extra information and analysis of items in the main financial statements.",
    accepted: ["notes", "the notes", "notes to the financial statements", "notes to the accounts", "notes to the financial statement"],
    explanation: "The notes to the financial statements explain and analyse the figures in the statements.",
  });

  // numerical
  const sc = 140000, srate = 15, sdisp = 22000;
  const base = r2(sc - sdisp);
  const chg = r2((base * srate) / 100);
  chk(chg, 17700);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: chg, calculator: true, wrong: [r2((sc * srate) / 100), r2((sdisp * srate) / 100)],
    stem: `A company depreciates equipment at ${srate}% of the cost of assets held at the year end, with no charge on assets sold. The cost of equipment was ${money(sc)} at the start of the year; equipment costing ${money(sdisp)} was sold and there were no purchases. Calculate the depreciation charge for the year.`,
    hints: ["Which assets are held at the year end?"],
    explanation: "Assets held at the year end cost 140,000 - 22,000 = 118,000; 15% × 118,000 = 17,700. Using the opening cost gives 21,000.",
  });
  const opcv = 168400, add = 32500, rev = 12000, dcv = 6800, depn = 24100;
  const clcv = r2(opcv + add + rev - dcv - depn);
  chk(clcv, 182000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: clcv, calculator: true, wrong: [r2(opcv + add - dcv - depn), r2(opcv + add + rev + dcv - depn)],
    stem: `The carrying amount of property, plant and equipment was ${money(opcv)} at the start of the year. During the year additions cost ${money(add)}, land was revalued upwards by ${money(rev)}, an asset with a carrying amount of ${money(dcv)} was sold and depreciation for the year was ${money(depn)}. Calculate the carrying amount at the end of the year.`,
    hints: ["Which movements increase the carrying amount?"],
    explanation: "168,400 + 32,500 + 12,000 - 6,800 - 24,100 = 182,000. Leaving out the revaluation gives 170,000.",
  });
  const cost3 = 41500, acc3 = 30200, pr3 = 14300;
  const res3 = r2(pr3 - (cost3 - acc3));
  chk(res3, 3000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: res3, calculator: true, daily: true, wrong: [r2(pr3 - cost3), pr3],
    stem: `A machine which cost ${money(cost3)} had accumulated depreciation of ${money(acc3)} when it was sold for ${money(pr3)}. Calculate the profit on disposal.`,
    explanation: "Carrying amount = 41,500 - 30,200 = 11,300; profit = 14,300 - 11,300 = 3,000. Comparing the proceeds with cost gives a loss of 27,200.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State two reasons why a company provides notes with its financial statements.",
    points: ["To analyse or give more detail of figures in the statements (for example property, plant and equipment or borrowings)", "To give information that cannot be shown in the statements, such as accounting policies and non-adjusting events"],
    modelAnswer: "Notes break down figures such as property, plant and equipment, and they give information the statements cannot show, such as accounting policies.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a schedule of non-current assets is useful to the users of financial statements.",
    points: ["It shows how the carrying amount changed during the year through additions, disposals, revaluation and depreciation", "It shows what the company invests in and how quickly assets are being depreciated", "It lets users check the carrying amount against the statement of financial position and the depreciation against profit"],
    modelAnswer: "The schedule shows the movements in each class of asset, so users can see what was bought, sold and depreciated. It also lets them agree the totals to the statements.",
    hints: ["Think about what the single figure in the statement hides."],
    explanation: "One mark each for movements, investment policy and agreement with the statements.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A company's schedule shows that accumulated depreciation is 85% of the cost of its vehicles and that no vehicles were bought in the last three years. Evaluate what this may mean and advise the directors.",
    points: ["The vehicles are nearly fully depreciated, so they are old and the carrying amount is small", "Repairs and breakdowns are likely to rise, and the vehicles may soon need replacing, which needs cash", "However, old vehicles may still be in good condition and cost nothing to depreciate further", "Advice: inspect the fleet, plan replacement and budget for the cash"],
    modelAnswer: "With 85% of cost depreciated, the vehicles are old and the carrying amount is low. Repair costs may rise and replacement will need cash, although some may still be sound. The directors should inspect the fleet and plan and budget for replacement.",
    hints: ["What does a high ratio of accumulated depreciation to cost indicate?"],
    explanation: "One mark each for the age of the fleet, the consequence, a balancing point and advice.",
  });

  // Structured 1 (10 marks)
  const A = [
    { name: "Equipment", costOpen: 96000, add: 24000, depOpen: 31200 },
    { name: "Vehicles", costOpen: 54000, disp: 17000, depOpen: 21600, depDisp: 13600 },
  ];
  const chEq = r2(((A[0].costOpen + A[0].add) * 15) / 100);
  const chVe = r2(((A[1].costOpen - A[1].disp) * 20) / 100);
  A[0].charge = chEq;
  A[1].charge = chVe;
  const sA = ncaSchedule(A);
  const resA = r2(2900 - (17000 - 13600));
  chk(resA, -500);
  chk(sA.t.cv, 92400);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Gwanda Mining Supplies Ltd has equipment which cost US\\$${fmt(96000)} and vehicles which cost US\\$${fmt(54000)} at 1 January 2025. Accumulated depreciation was US\\$${fmt(31200)} on equipment and US\\$${fmt(21600)} on vehicles. During the year new equipment costing US\\$${fmt(24000)} was bought. Vehicles which cost US\\$${fmt(17000)} and had accumulated depreciation of US\\$${fmt(13600)} were sold for US\\$${fmt(2900)}. Depreciation is charged at 15% of the cost of equipment and 20% of the cost of vehicles held at the year end.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: chEq, wrong: [r2((96000 * 15) / 100), r2((24000 * 15) / 100)], stem: "Calculate the depreciation charge for equipment.", explanation: `15% × (${fmt(96000)} + ${fmt(24000)}) = ${fmt(chEq)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: chVe, wrong: [r2((54000 * 20) / 100), r2((17000 * 20) / 100)], stem: "Calculate the depreciation charge for vehicles.", explanation: `20% × (${fmt(54000)} - ${fmt(17000)}) = ${fmt(chVe)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: resA, wrong: [-(17000 - 13600), r2(2900 - 17000)], stem: "Calculate the profit (+) or loss (-) on the disposal of the vehicles. Enter a loss as a negative number.", explanation: `Carrying amount ${fmt(17000 - 13600)}; proceeds ${fmt(2900)}; result ${fmt(resA)}, a loss of ${fmt(-resA)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: sA.t.cv, wrong: [r2(sA.t.cv + 13600), r2(sA.t.cv - 13600)], stem: "Calculate the total carrying amount of equipment and vehicles at 31 December 2025.", explanation: `Cost ${fmt(sA.t.costClose)} less accumulated depreciation ${fmt(sA.t.depClose)} = ${fmt(sA.t.cv)}.` }),
    ],
    hints: ["Depreciate only the assets held at the year end.", "Remove the depreciation of the vehicles sold from the accumulated total."],
    explanation: "This item tests the depreciation charge, disposal result and closing carrying amount in a schedule.",
  });

  // Structured 2 (14 marks)
  const B = [
    { name: "Land and buildings", costOpen: 310000, reval: 21500, depOpen: 28800, charge: r2((120000 * 2) / 100) },
    { name: "Machinery", costOpen: 205000, add: 36500, disp: 42000, depOpen: 98400, depDisp: 33600, charge: r2(((205000 + 36500 - 42000) * 10) / 100) },
    { name: "Motor vehicles", costOpen: 78000, depOpen: 39000, charge: r2((78000 * 20) / 100) },
  ];
  const sB = ncaSchedule(B, { title: "Schedule of non-current assets", when: "year ended 31 December 2025" });
  const profB = r2(11200 - (42000 - 33600));
  chk(profB, 2800);
  chk(sB.t.charge, 2400 + 19950 + 15600);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Chiredzi Sugar Services Ltd had the following non-current assets at 1 January 2025.\n\n${table(["Class", "Cost US\\$", "Accumulated depreciation US\\$"], [["Land and buildings (buildings US\\$120,000)", 310000, 28800], ["Machinery", 205000, 98400], ["Motor vehicles", 78000, 39000]])}\n\nDuring 2025: land was revalued upwards by US\\$${fmt(21500)}; machinery costing US\\$${fmt(36500)} was bought; machinery which cost US\\$${fmt(42000)} and had accumulated depreciation of US\\$${fmt(33600)} was sold for US\\$${fmt(11200)}. Depreciation is charged on the cost of assets held at the year end: buildings 2%, machinery 10% and motor vehicles 20%. Land is not depreciated.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: B[1].charge, wrong: [r2(205000 * 0.1), r2((205000 + 36500) * 0.1)], stem: "Calculate the depreciation charge for machinery.", explanation: `10% × (${fmt(205000)} + ${fmt(36500)} - ${fmt(42000)}) = ${fmt(B[1].charge)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: profB, wrong: [-profB, 11200], stem: "Calculate the profit on the disposal of machinery.", explanation: `Carrying amount ${fmt(42000 - 33600)}; proceeds ${fmt(11200)}; profit ${fmt(profB)}.` }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the schedule of non-current assets for the year ended 31 December 2025, with columns for each class and a total.", points: ["Headings and a column for each class and a total", "Opening cost, additions, disposals and revaluation entered correctly", "Closing cost correct for each class", "Opening accumulated depreciation, charge and depreciation on disposals entered", "Closing accumulated depreciation correct", `Carrying amounts correct, total ${fmt(sB.t.cv)}`], modelAnswer: sB.md, explanation: "One mark for each of the six elements; allow follow-through." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: sB.t.cv, wrong: [sB.t.costClose, r2(sB.t.cv - 21500)], stem: "State the figure for property, plant and equipment in the statement of financial position.", explanation: `The total carrying amount at 31 December 2025 is ${fmt(sB.t.cv)}.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain how the depreciation in the schedule and the profit on disposal are used in the statement of cash flows.", points: ["The depreciation charge is added back to profit before tax because it is not a cash flow", "The profit on disposal is deducted from profit (and the proceeds are shown as investing cash inflow)"], modelAnswer: "Depreciation is a non-cash expense, so it is added back. The profit on disposal is deducted because the proceeds are shown separately in investing activities.", explanation: "One mark for each adjustment." }),
    ],
    hints: ["The land is revalued, not depreciated.", "Remove the sold machine from both cost and depreciation."],
    explanation: "This item tests a full schedule of non-current assets with a revaluation and a disposal.",
  });
  void check; void sum;

  b.card("DEFINITION", "What is a **schedule of non-current assets**?", "A table showing cost or valuation and accumulated depreciation by class, with additions, disposals, revaluation and the depreciation charge.");
  b.card("FORMULA", "Profit or loss on disposal", "Proceeds - (cost - accumulated depreciation at the date of sale); a negative answer is a loss.");
  b.card("FORMULA", "Carrying amount", "Cost (or valuation) - accumulated depreciation.");
  b.card("FACT", "Treatment of a disposal in the schedule", "Remove the asset at cost from the cost section and at its accumulated depreciation from the depreciation section.");
  b.card("FACT", "Revaluation of land in the schedule", "Add the gain to cost or valuation; the gain is other comprehensive income. Land is not depreciated.");
  b.card("CONCEPT", "Why a schedule agrees with the statements", "Closing carrying amount = property, plant and equipment in the statement of financial position; the charge = depreciation in the statement of profit or loss.");
  b.card("DEFINITION", "What are **notes to the financial statements**?", "Additional information that explains and analyses the figures: policies, schedule, share capital, borrowings, dividends.");
  b.card("FACT", "A dividend proposed after the year end", "Disclosed in the notes, not recognised as a liability at the year end.");
  b.card("CONCEPT", "Reconciling carrying amount", "Opening carrying amount + additions + revaluation - carrying amount of disposals - depreciation = closing carrying amount.");
});
