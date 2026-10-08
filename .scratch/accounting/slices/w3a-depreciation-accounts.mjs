// W3a: recording depreciation (asset at cost, provision for depreciation, income statement, SOFP).
import { concept, P, money, check, sum, r2, tAccount, journal, statement } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });
const C3 = [`Cost ${U}`, `Accumulated depreciation ${U}`, `Net book value ${U}`];

concept("acc.adjustments.depreciation-accounts", { file: "adjustments/depreciation-accounts", keyPrefix: "adjustments.depreciation-accounts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which entry records the annual depreciation charge?",
    options: [
      ["Debit income statement; credit provision for depreciation", "Correct: an expense, and the provision builds up."],
      ["Debit provision for depreciation; credit income statement", "This is the reverse entry."],
      ["Debit income statement; credit the asset account", "The asset account stays at cost."],
      ["Debit the asset account; credit bank", "This records buying the asset."],
    ],
    answer: "A",
    explanation: "Depreciation is an expense (debit) and the provision for depreciation is credited.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the normal balance on a provision for depreciation account?",
    options: [
      ["A credit balance", "Correct: it is built up by credits each year."],
      ["A debit balance", "Assets at cost have debit balances; the provision offsets them."],
      ["No balance; it is closed each year", "The provision is carried forward and grows each year."],
      ["Either side, depending on profit", "Profit does not affect the side of the provision."],
    ],
    answer: "A",
    explanation: "The provision account accumulates the depreciation charged so far, as a credit balance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where is the balance on the provision for depreciation account shown?",
    options: [
      ["Deducted from the asset's cost in the statement of financial position", "Correct: cost less accumulated depreciation gives net book value."],
      ["As an expense in the income statement, below gross profit", "Only this year's charge is an expense."],
      ["As a current liability", "Nothing is owed; the provision reduces an asset."],
      ["Added to the owner's capital", "The provision is not part of capital."],
    ],
    answer: "A",
    explanation: "The provision is a contra-asset: it is subtracted from cost in the statement of financial position.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the non-current asset account kept at cost rather than reduced by depreciation each year?",
    options: [
      ["So the original cost and the total depreciation can both be seen", "Correct: users see what was paid and how much has been used up."],
      ["Because depreciation is not a real expense", "Depreciation is a real (non-cash) expense."],
      ["Because the value of a non-current asset never changes once bought", "The value does fall; the fall is shown in the provision account."],
      ["So that the trial balance has fewer accounts", "It actually adds an account (the provision)."],
    ],
    answer: "A",
    explanation: "Separating cost and accumulated depreciation gives more information in the statement of financial position.",
  });
  const tb = { cost: 54000, prov: 19440, rate: 20 };
  const tbCharge = r2(((tb.cost - tb.prov) * tb.rate) / 100);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A trial balance at 31 December 2025 shows machinery at cost US\\$54,000 and provision for depreciation US\\$19,440. Machinery is depreciated at 20% per annum on the reducing balance. What is the depreciation charge for 2025?",
    options: [
      [money(tbCharge), "Correct: 20% × (54,000 − 19,440)."],
      [money(10800), "This is 20% of cost: the straight-line answer."],
      [money(3888), "This is 20% of the provision brought forward."],
      [money(r2(tb.prov + tbCharge)), "This is the closing provision, not this year's charge."],
    ],
    answer: "A",
    hints: ["Reducing balance applies the rate to cost less the provision brought forward."],
    explanation: `20% × (54,000 − 19,440) = 20% × 34,560 = ${f(tbCharge)}.`,
  });
  check("tbCharge", tbCharge, 6912);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A bookkeeper credited this year's depreciation of US\\$3,000 to the equipment account instead of to the provision for depreciation account. What is the effect on the statement of financial position?",
    options: [
      ["Net book value is correct; cost and accumulated depreciation are both US\\$3,000 too low","Correct: the deduction is in the wrong account, so the net figure is unchanged."],
      ["Net book value is overstated by US\\$3,000", "The 3,000 was still deducted, just from the wrong account."],
      ["Profit is overstated by US\\$3,000", "The debit to the income statement was correct."],
      ["Total non-current assets are understated by US\\$6,000, because both columns are too low","Cost is 3,000 too low but accumulated depreciation is also 3,000 too low."],
    ],
    answer: "A",
    hints: ["Net book value = cost − accumulated depreciation."],
    explanation: "Cost is 3,000 too low and the provision 3,000 too low, so the net book value is still correct, but the presentation is wrong.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The income statement shows the total depreciation charged on an asset since it was bought.",
    answer: false,
    explanation: "False. The income statement shows only this year's charge; the total is in the statement of financial position.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a trial balance, the provision for depreciation normally appears in the credit column.",
    answer: true,
    explanation: "True. It is a credit balance that reduces the debit balance of the asset.",
  });

  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the journal entry for depreciation of fixtures of US\\$1,850 for the year.",
    template: "Debit {{blank:a}} US\\$1,850; credit {{blank:b}} US\\$1,850.",
    blanks: [
      { id: "a", accepted: ["Income statement"], choices: ["Income statement", "Fixtures", "Provision for depreciation: fixtures", "Bank"] },
      { id: "b", accepted: ["Provision for depreciation: fixtures"], choices: ["Provision for depreciation: fixtures", "Fixtures", "Income statement", "Bank"] },
    ],
    explanation: "Expense debited; provision credited. The fixtures account is not touched.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with where it appears.",
    pairs: [["This year's depreciation charge", "Income statement, as an expense"], ["Machinery at cost", "Statement of financial position, cost column"], ["Closing balance of the provision for depreciation", "Statement of financial position, deducted from cost"], ["Cost less accumulated depreciation", "Statement of financial position, net book value column"]],
    explanation: "One year's charge is an expense; cost, accumulated depreciation and net book value appear in the statement of financial position.",
  });

  // Numerical
  const sl = { cost: 28800, rate: 12.5, yrs: 3 };
  const slC = r2((sl.cost * sl.rate) / 100);
  b.num({
    d: 2, kind: "money", value: r2(slC * sl.yrs), daily: true, wrong: [slC],
    stem: "Office furniture cost US\\$28,800 on 1 January 2023. It is depreciated at 12.5% per annum on cost. What is the balance on the provision for depreciation account at 31 December 2025?",
    explanation: `Annual charge 12.5% × 28,800 = ${f(slC)}; three years (2023–2025): ${f(r2(slC * 3))}.`,
  });
  check("slC", slC, 3600);
  const add = { cost0: 42000, add: 18000, months: 4, rate: 10 };
  const addC = r2((add.cost0 * add.rate) / 100 + ((add.add * add.rate) / 100) * (add.months / 12));
  b.calc({
    d: 4, kind: "money", value: addC, calculator: true, wrong: [r2(((add.cost0 + add.add) * add.rate) / 100), r2((add.cost0 * add.rate) / 100)],
    stem: "On 1 January 2025 Farai's equipment at cost was US\\$42,000. On 1 September 2025 he bought more equipment for US\\$18,000. Equipment is depreciated at 10% per annum on cost, on a monthly basis. Calculate the depreciation charge for the year ended 31 December 2025.",
    hints: ["Charge a full year on the opening cost.", "The new equipment was owned for September to December."],
    explanation: `Opening equipment: 10% × 42,000 = 4,200. New equipment: 10% × 18,000 × 4/12 = 600. Total ${f(addC)}. Charging a full year on the new equipment gives 6,000; ignoring it gives 4,200.`,
  });
  check("addC", addC, 4800);
  const nb = { cost: 64500, prov0: 21930, charge: 8510 };
  const nbv = r2(nb.cost - nb.prov0 - nb.charge);
  b.calc({
    d: 3, kind: "money", value: nbv, calculator: true, wrong: [r2(nb.cost - nb.prov0), r2(nb.cost - nb.charge)],
    stem: "At 31 December 2025, before year-end adjustments, a trial balance shows motor vehicles at cost US\\$64,500 and provision for depreciation US\\$21,930. Depreciation for 2025 is US\\$8,510. Calculate the net book value of motor vehicles to be shown in the statement of financial position.",
    hints: ["The trial balance provision is the opening figure."],
    explanation: `Closing provision 21,930 + 8,510 = 30,440. NBV 64,500 − 30,440 = ${f(nbv)}. Using the trial balance provision only gives 42,570.`,
  });
  check("nbv", nbv, 34060);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between the depreciation charge for the year and the balance on the provision for depreciation account.",
    points: ["The charge is the depreciation for this year only, an expense in the income statement", "The provision balance is the total depreciation charged since the asset was bought, deducted from cost in the statement of financial position"],
    modelAnswer: "The charge is this year's expense in the income statement; the provision is the accumulated total of all years' charges, deducted from cost in the statement of financial position.",
    explanation: "One year versus all years to date.",
  });

  // Practice structured 1: two years of ledger accounts, straight line with addition
  const m = { cost0: 30000, prov0: 9000, add: 15000, addDate: "1 Apr 2025", rate: 15 };
  const charge = r2((m.cost0 * m.rate) / 100 + ((m.add * m.rate) / 100) * (9 / 12));
  check("charge", charge, 6187.5);
  const provC = r2(m.prov0 + charge);
  const totalCost = r2(m.cost0 + m.add);
  const assetMd = tAccount("Machinery account", [["1 Jan 2025", "Balance b/d", m.cost0], [m.addDate, "Bank", m.add]], [], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
  const provMd = tAccount("Provision for depreciation: machinery account", [], [["1 Jan 2025", "Balance b/d", m.prov0], ["31 Dec 2025", "Income statement", charge]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
  const sofp = statement("at 31 December 2025", [["**Non-current assets**", null, null, null], ["Machinery", totalCost, provC, r2(totalCost - provC)]], { cols: C3, checks: [["nbv", r2(totalCost - provC), 29812.5]] });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Sipho runs a joinery in Mutare. On 1 January 2025 his machinery at cost was US\\$30,000 and the provision for depreciation on machinery was US\\$9,000. On 1 April 2025 he bought a new machine for US\\$15,000, paying by bank transfer. Machinery is depreciated at 15% per annum on cost, on a monthly basis. His year end is 31 December.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: charge, wrong: [r2(totalCost * 0.15), 4500], stem: "Calculate the depreciation charge on machinery for 2025.", explanation: `Old machinery 15% × 30,000 = 4,500; new machine 15% × 15,000 × 9/12 = 1,687.50; total ${f(charge)}.` }),
      P.manual({ label: "(b)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the machinery account for 2025.", points: ["Balance b/d 30,000 and Bank 15,000 on the debit side", "Balance c/d 45,000 on the credit side, totals 45,000", "Balance b/d 45,000 on 1 January 2026"], modelAnswer: assetMd, explanation: "The asset account is kept at cost: no depreciation is credited to it." }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the provision for depreciation: machinery account for 2025.", points: ["Balance b/d 9,000 on the credit side", "Income statement 6,187.50 on the credit side (own figure)", "Balance c/d 15,187.50, totals and balance b/d on 1 January 2026"], modelAnswer: provMd, explanation: "The year's charge is added to the opening provision." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: r2(totalCost - provC), wrong: [r2(totalCost - charge)], stem: "Calculate the net book value of machinery at 31 December 2025.", explanation: `45,000 − 15,187.50 = ${f(r2(totalCost - provC))}.` }),
      P.manual({ label: "(e)", marks: 1, type: "EXTENDED_RESPONSE", stem: "Show how machinery appears in the statement of financial position at 31 December 2025.", points: ["Machinery: cost 45,000, accumulated depreciation 15,187.50, net book value 29,812.50, under non-current assets"], modelAnswer: `**Sipho's Joinery**\n\n**Statement of financial position (extract)**\n\n${sofp}`, explanation: "Three columns: cost, accumulated depreciation, net book value." }),
    ],
    hints: ["Time-apportion the new machine: April to December.", "The provision brought down is the opening balance; add the year's charge."],
    explanation: "This item practises the ledger accounts for depreciation with an addition during the year.",
  });

  // Practice structured 2: from a trial balance extract, reducing balance and straight line; IS and SOFP extracts
  const t = { prem: 90000, premRate: 2, veh: 46000, vehProv: 17250, vehRate: 25, fix: 12800, fixProv: 5120, fixRate: 10 };
  const premC = r2((t.prem * t.premRate) / 100);
  const vehC = r2(((t.veh - t.vehProv) * t.vehRate) / 100);
  const fixC = r2((t.fix * t.fixRate) / 100);
  const totC = sum([premC, vehC, fixC]);
  check("vehC", vehC, 7187.5);
  check("totC", totC, 10267.5);
  const premP = premC; // premises bought on 1 Jan 2025: no opening provision
  const tbMd = table(["Trial balance extract at 31 December 2025", `Debit ${U}`, `Credit ${U}`], [["Premises at cost (bought 1 January 2025)", t.prem, null], ["Motor vans at cost", t.veh, null], ["Provision for depreciation: motor vans", null, t.vehProv], ["Fixtures at cost", t.fix, null], ["Provision for depreciation: fixtures", null, t.fixProv]]);
  const rows = [["Premises", t.prem, premP, r2(t.prem - premP)], ["Motor vans", t.veh, r2(t.vehProv + vehC), r2(t.veh - t.vehProv - vehC)], ["Fixtures", t.fix, r2(t.fixProv + fixC), r2(t.fix - t.fixProv - fixC)]];
  const tc = sum(rows.map((r) => r[1])), ta = sum(rows.map((r) => r[2])), tn = sum(rows.map((r) => r[3]));
  const sofp2 = statement("at 31 December 2025", [["**Non-current assets**", null, null, null], ...rows, [null, tc, ta, tn]], { cols: C3, checks: [["n", r2(tc - ta), tn], ["tn", tn, 116162.5]] });
  b.struct({
    d: 5, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Thandeka owns a pharmacy in Bulawayo.\n\n" + tbMd + "\n\nDepreciation policy:\n\n- Premises: 2% per annum on cost.\n- Motor vans: 25% per annum on the reducing balance.\n- Fixtures: 10% per annum on cost.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: premC, stem: "Calculate the depreciation on premises for 2025.", explanation: "2% × 90,000 = 1,800." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: vehC, wrong: [r2(t.veh * 0.25)], stem: "Calculate the depreciation on motor vans for 2025.", explanation: `25% × (46,000 − 17,250) = 25% × 28,750 = ${f(vehC)}.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: fixC, wrong: [r2((t.fix - t.fixProv) * 0.1)], stem: "Calculate the depreciation on fixtures for 2025.", explanation: "10% × 12,800 = 1,280 (straight line is on cost)." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: totC, stem: "Calculate the total depreciation charged in the income statement for 2025.", explanation: `1,800 + 7,187.50 + 1,280 = ${f(totC)}.` }),
      P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the non-current assets section of Thandeka's statement of financial position at 31 December 2025.", points: ["Heading: business name, statement of financial position, at 31 December 2025", "Three columns: cost, accumulated depreciation, net book value", "Premises 90,000 − 1,800 = 88,200", "Motor vans 46,000 − 24,437.50 = 21,562.50; fixtures 12,800 − 6,400 = 6,400", "Totals 148,800, 32,637.50 and 116,162.50"], modelAnswer: `**Thandeka's Pharmacy**\n\n**Statement of financial position (extract)**\n\n${sofp2}`, explanation: "Closing provision = trial balance provision + this year's charge." }),
      P.mcq({ label: "(f)", stem: "Thandeka's accounts clerk suggests showing only net book values to save space. Which accounting concept is best served by showing cost and accumulated depreciation as well?", options: [["Disclosure of full information to users (true and fair view)", "Correct: users see what was paid and how much has been used."], ["Going concern, because the assets will be used for many years", "Going concern assumes the business continues; it does not require showing cost."], ["Realisation", "Realisation concerns when revenue is recognised."], ["Money measurement", "All three figures are in money anyway."]], answer: "A", explanation: "Showing cost and accumulated depreciation gives users a fuller, fairer picture." }),
    ],
    hints: ["Reducing balance: rate × (cost − provision b/d).", "Straight line: rate × cost."],
    explanation: "This item practises calculating and presenting depreciation from a trial balance.",
  });

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Equipment cost US\\$16,000 and its provision for depreciation is US\\$6,400. What is its net book value?",
    options: [[money(9600), "Correct: 16,000 − 6,400."], [money(22400), "Cost and provision were added instead of subtracted."], [money(6400), "This is the provision, not the net book value."], [money(16000), "This is the cost."]],
    answer: "A",
    explanation: "Net book value = cost − accumulated depreciation = 16,000 − 6,400 = 9,600.",
  });
  check("x", 16000 - 6400, 9600);
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the name of the account that is credited each year with the depreciation charge.",
    accepted: ["provision for depreciation", "provision for depreciation account", "accumulated depreciation", "accumulated depreciation account"],
    rejected: ["depreciation", "income statement"],
    explanation: "The provision for depreciation (accumulated depreciation) account is credited.",
  });

  b.card("FACT", "Journal entry for depreciation", "Dr Income statement (depreciation); Cr Provision for depreciation.");
  b.card("CONCEPT", "Why keep the asset account at cost?", "So the statement of financial position shows both the cost and the depreciation to date.");
  b.card("DEFINITION", "Provision for depreciation account", "A credit-balance (contra-asset) account holding total depreciation charged so far.");
  b.card("FACT", "Income statement vs statement of financial position", "Income statement: this year's charge. SOFP: cost − accumulated depreciation = net book value.");
  b.card("FACT", "Trial balance provision", "Usually the opening balance: add this year's charge before using it in the SOFP.");
  b.card("FORMULA", "Reducing balance from a trial balance", "Rate × (cost − provision for depreciation b/d).");
  b.card("FACT", "Three-column layout for non-current assets", "Cost | Accumulated depreciation | Net book value, one line per class, then totals.");
  b.card("CONCEPT", "Is the provision for depreciation a liability?", "No. It is deducted from the asset's cost; nothing is owed.");
});
