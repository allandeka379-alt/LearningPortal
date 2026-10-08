// W1b: accounting concepts: matching, prudence, consistency, materiality, realisation.
import { concept, P, money, statement, check, sum, r2, ZIM, CAM } from "../lib.mjs";

concept("acc.concepts.applied-concepts", { file: "concepts/applied-concepts", keyPrefix: "concepts.applied-concepts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which concept requires expenses to be recorded in the period in which they are incurred, whether or not they have been paid?",
    options: [
      ["Matching (accruals)", "Correct: income and expenses are matched to the period they relate to."],
      ["Prudence", "Prudence is about not overstating profit or assets."],
      ["Consistency", "Consistency is about using the same methods each year."],
      ["Going concern", "Going concern assumes the business will continue trading."],
    ],
    answer: "A",
    explanation: "**Matching (accruals)**: profit = income earned less expenses incurred in the same period, regardless of when cash moves.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which concept requires a business to use the same depreciation method every year?",
    options: [
      ["Consistency", "Correct: the same methods allow results to be compared over time."],
      ["Matching", "Matching explains why depreciation is charged, not why the method stays the same."],
      ["Prudence", "Prudence is about caution in valuing assets and profit."],
      ["Realisation", "Realisation is about when revenue is recognised."],
    ],
    answer: "A",
    explanation: "**Consistency**: methods are not changed from year to year without good reason, so profits can be compared.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Inventory that cost US\\$1,800 can now be sold for only US\\$1,100 because it is damaged. It is valued at US\\$1,100. Which concept is being applied?",
    options: [
      ["Prudence", "Correct: assets are not overstated; inventory is valued at the lower of cost and net realisable value."],
      ["Historic cost", "Historic cost alone would keep it at US\\$1,800."],
      ["Consistency", "Consistency is about using the same methods each year."],
      ["Materiality", "Materiality concerns how small items are treated."],
    ],
    answer: "A",
    explanation: "**Prudence**: an expected loss is recognised now, so inventory is shown at the lower of cost and net realisable value.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "At 31 December, wages of US\\$620 for the last week of December are unpaid. They are added to the wages expense for the year. Which concept is applied?",
    options: [
      ["Matching (accruals)", "Correct: the wages were incurred in December, so they belong to this year's expenses."],
      ["Prudence", "Prudence is about caution in valuing assets and profit, not about which period an expense belongs to."],
      ["Realisation", "Realisation concerns when revenue is earned."],
      ["Business entity", "This separates the owner from the business."],
    ],
    answer: "A",
    explanation: "Under **matching**, the accrued wages are an expense of the year in which the work was done.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: CAM,
    stem: "A large wholesaler charges a US\\$18 stapler as an expense instead of depreciating it over its useful life. Which concept allows this?",
    options: [
      ["Materiality", "Correct: the amount is too small to affect users' decisions."],
      ["Prudence", "Prudence does not decide how small items are treated."],
      ["Consistency", "Consistency is about using the same methods each year."],
      ["Matching", "Strict matching would spread the cost; materiality allows the shortcut."],
    ],
    answer: "A",
    explanation: "**Materiality**: immaterial items can be treated in the simplest way.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "On 20 December a customer pays a deposit of US\\$500 for furniture that will be made and delivered in February. How should the deposit be treated in the accounts for the year ended 31 December?",
    options: [
      ["As a liability, not revenue", "Correct: the goods have not been delivered, so the revenue is not realised."],
      ["As sales revenue for December", "Under realisation, revenue is recognised on delivery, not on receipt of a deposit."],
      ["As capital introduced", "The customer is not the owner."],
      ["As income in the year it was received, by prudence", "Prudence would not bring revenue forward; it is cautious about income."],
    ],
    answer: "A",
    hints: ["When is revenue earned under the realisation concept?"],
    explanation: "**Realisation**: revenue arises when the goods pass to the customer. Until delivery, the deposit is owed back in goods or money: a liability.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which year-end adjustment is mainly explained by the **prudence** concept?",
    options: [
      ["Creating a provision (allowance) for doubtful debts", "Correct: an expected loss is recognised before it happens."],
      ["Adding rent owing to the rent expense", "That is matching (accruals)."],
      ["Using the straight-line method every year", "That is consistency."],
      ["Deducting insurance paid in advance", "That is matching (prepayments)."],
    ],
    answer: "A",
    hints: ["Which adjustment anticipates a loss?"],
    explanation: "Prudence: expected losses are provided for now. A provision (allowance) for doubtful debts reduces trade receivables to the amount expected to be collected.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Farai's land rose in value from US\\$30,000 to US\\$45,000. He wants to add the US\\$15,000 to this year's profit. Which statement is correct?",
    options: [
      ["It should not be added: the gain is not realised, and prudence and historic cost apply", "Correct: unrealised gains are not recognised as profit."],
      ["It should be added, because matching requires all gains in the year", "Matching relates to income earned and expenses incurred, not unrealised changes in value."],
      ["It should be added, because the land could be sold at that price", "Prudence does not anticipate gains that have not happened."],
      ["It should be added to capital as capital introduced", "Farai has introduced no new resources."],
    ],
    answer: "A",
    hints: ["Has the land been sold?"],
    explanation: "A rise in value is not profit until the asset is sold. Prudence avoids overstating profit, and historic cost keeps the land at US\\$30,000.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "In ZIMSEC terms, which concept is also called the **accruals** concept?",
    options: [
      ["Matching", "Correct: matching and accruals are two names for the same concept."],
      ["Prudence", "Prudence is sometimes called conservatism, not accruals."],
      ["Consistency", "Consistency is about using the same methods every year."],
      ["Going concern", "Going concern is an assumption about the future of the business."],
    ],
    answer: "A",
    hints: ["Which concept explains accrued expenses?"],
    explanation: "ZIMSEC names it **matching (accrual)**: income and expenses are recognised when earned or incurred.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the realisation concept, a credit sale is recognised as revenue when the goods are delivered, even though the customer pays later.",
    answer: true, applies: CAM,
    explanation: "True. Revenue is earned on delivery; receiving the money later does not change the period.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Prudence means a business should make its profit as low as possible.",
    answer: false,
    explanation: "False. Prudence means not **over**stating profit and assets. Deliberately understating profit also gives a false picture.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Changing the depreciation method every year breaks the consistency concept.",
    answer: true,
    explanation: "True. Profits of different years could not be compared fairly.",
  });

  b.match({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "Match each treatment with the concept it applies.",
    pairs: [
      ["Insurance paid for next year is deducted from this year's expense", "Matching"],
      ["An allowance is made for a customer who may not pay", "Prudence"],
      ["Reducing balance depreciation is used every year for vehicles", "Consistency"],
      ["A US\\$9 calculator is charged to office expenses", "Materiality"],
      ["Goods delivered on 30 December are included in December's sales", "Realisation"],
    ],
    hints: ["Ask: is this about timing, caution, sameness, size or revenue?"],
    explanation: "Timing of expenses: matching. Caution: prudence. Same method: consistency. Small items: materiality. Revenue on delivery: realisation.",
  });

  b.fib({
    d: 2,
    stem: "Choose the correct concepts.",
    template: "Adding electricity owing to the expense for the year applies the {{blank:a}} concept. Valuing inventory at the lower of cost and net realisable value applies the {{blank:b}} concept.",
    blanks: [
      { id: "a", accepted: ["matching"], choices: ["matching", "prudence", "consistency"] },
      { id: "b", accepted: ["prudence"], choices: ["prudence", "matching", "consistency"] },
    ],
    explanation: "Accruals and prepayments: matching. Lower of cost and net realisable value: prudence.",
  });

  // Matching calculations
  const ins = { paid: 2160, prepaid: 540 };
  const insExp = r2(ins.paid - ins.prepaid);
  b.num({
    d: 2, kind: "money", value: insExp, wrong: [r2(ins.paid + ins.prepaid), ins.paid],
    stem: `A poultry project paid insurance of ${money(ins.paid)} during 2025. Of this, ${money(ins.prepaid)} covers the first three months of 2026. What insurance expense should be charged for 2025?`,
    explanation: `Matching: only the cost of 2025 cover is a 2025 expense: $2,160 - 540 = ${insExp.toLocaleString("en-GB")}$. Adding the prepayment instead gives ${money(r2(ins.paid + ins.prepaid))}.`,
  });
  const wage = { paid: 18720, owing: 690 };
  const wageExp = r2(wage.paid + wage.owing);
  b.num({
    d: 2, kind: "money", value: wageExp, wrong: [r2(wage.paid - wage.owing)],
    stem: `Nyasha paid wages of ${money(wage.paid)} during 2025. Wages of ${money(wage.owing)} for the last week of December were paid on 3 January 2026. What wages expense should appear in the income statement (statement of profit or loss) for 2025?`,
    explanation: `The December wages were incurred in 2025: $18,720 + 690 = ${wageExp.toLocaleString("en-GB")}$.`,
  });
  // Prudence: inventory
  const inv = [["Bags of cement", 3400, 3900], ["Rusted roofing sheets", 1250, 640], ["Paint", 980, 1120]];
  const invVal = sum(inv.map(([, c, n]) => Math.min(c, n)));
  b.calc({
    d: 4, kind: "money", value: invVal, wrong: [sum(inv.map((x) => x[1])), sum(inv.map(([, c, n]) => Math.max(c, n)))], calculator: true,
    stem: `A hardware shop's closing inventory consists of:\n\n| Item | Cost US\\$ | Net realisable value US\\$ |\n| --- | ---: | ---: |\n${inv.map((x) => `| ${x[0]} | ${x[1].toLocaleString("en-GB")} | ${x[2].toLocaleString("en-GB")} |`).join("\n")}\n\nApplying the prudence concept item by item, calculate the value of closing inventory.`,
    hints: ["Value each item at the lower of its cost and its net realisable value.", "Only the rusted sheets are worth less than cost."],
    explanation: `Lower of cost and net realisable value for each item: $3,400 + 640 + 980 = ${invVal.toLocaleString("en-GB")}$. Using cost for everything gives ${money(sum(inv.map((x) => x[1])))}, which overstates the asset and the profit.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the consistency concept is important to someone comparing a business's profits over several years.",
    points: ["Using the same methods means changes in profit reflect real changes in performance", "If methods changed (e.g. depreciation), profits would change for accounting reasons only, so the years could not be compared fairly"],
    modelAnswer: "If the same methods are used every year, a rise or fall in profit shows a real change in performance. Changing methods, such as switching depreciation methods, would alter profit without any change in trading, so comparisons would mislead.",
    hints: ["What could change profit apart from trading?"],
    explanation: "Consistency makes results comparable over time.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3, applies: CAM,
    stem: "Thandeka says: \"My business is small, so a US\\$300 printer is material, but for my brother's large wholesale firm the same printer is not.\" Discuss whether she is right.",
    points: ["Materiality depends on the size of the item relative to the business / whether it would affect users' decisions", "For a small business US\\$300 may be significant, so it should be treated as a non-current asset", "Conclusion: she is right; the same amount can be material for one business and immaterial for another"],
    modelAnswer: "She is right. An item is material if it could affect the decisions of users, which depends on its size compared with the business. US\\$300 is significant for her small business and should be capitalised and depreciated, but for a large wholesaler it is trivial and can be expensed.",
    hints: ["Is materiality an absolute amount?"],
    explanation: "Materiality is relative, not a fixed sum.",
  });

  // Practice structured 1 (CAM): profit correction with five concepts
  const c = { draft: 16820, deposit: 1150, invCost: 1900, invNrv: 1240, rentOwing: 480, prepaidIns: 360, kettle: 38 };
  const wd = r2(c.invCost - c.invNrv);
  const corr = r2(c.draft - c.deposit - wd - c.rentOwing + c.prepaidIns - c.kettle);
  const stmt = statement("Corrected profit for the year ended 31 December 2025", [
    ["Draft profit", null, c.draft],
    ["Add: insurance prepaid", null, c.prepaidIns],
    [null, null, r2(c.draft + c.prepaidIns)],
    ["Less: deposit included in sales", c.deposit, null],
    ["Less: inventory written down", wd, null],
    ["Less: rent owing", c.rentOwing, null],
    ["Less: kettle recorded as an asset", c.kettle, null],
    [null, null, -r2(c.deposit + wd + c.rentOwing + c.kettle)],
    ["**Corrected profit**", null, corr],
  ], { checks: [["corr", corr, c.draft + c.prepaidIns - (c.deposit + wd + c.rentOwing + c.kettle)]] });
  check("corr value", corr, 14852);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", applies: CAM, calculator: true,
    stem: `Sipho runs a building supplies business in Chinhoyi. His draft profit for the year ended 31 December 2025 is ${money(c.draft)}. The following have not been dealt with correctly:\n\n1. A deposit of ${money(c.deposit)} received on 28 December for goods to be delivered in January 2026 was included in sales.\n2. Damaged tiles in closing inventory are valued at their cost of ${money(c.invCost)}; they can be sold for ${money(c.invNrv)}.\n3. Rent of ${money(c.rentOwing)} for December is owing and has not been recorded.\n4. Insurance paid includes ${money(c.prepaidIns)} for January to March 2026.\n5. A kettle for the office costing ${money(c.kettle)} was recorded as a non-current asset.`,
    parts: [
      P.match({
        label: "(a)", stem: "Match each item with the concept that has not been applied.",
        pairs: ["Item 1", "Item 2", "Item 3", "Item 5"],
        right: ["Realisation", "Prudence", "Matching", "Materiality", "Consistency"],
        rightIndex: [0, 1, 2, 3],
        explanation: "Deposit: realisation. Damaged tiles: prudence. Rent owing: matching. Kettle: materiality.",
      }),
      P.num({
        label: "(b)", marks: 1, kind: "money", value: wd, wrong: [c.invNrv],
        stem: "Calculate the amount by which inventory must be reduced (item 2).",
        explanation: `$1,900 - 1,240 = ${wd.toLocaleString("en-GB")}$.`,
      }),
      P.num({
        label: "(c)", marks: 5, kind: "money", value: corr, wrong: [r2(corr - 2 * c.prepaidIns), r2(c.draft - c.deposit - wd - c.rentOwing - c.kettle - c.prepaidIns)],
        stem: "Calculate the corrected profit for the year.",
        explanation: `$16,820 + 360 - 1,150 - 660 - 480 - 38 = ${corr.toLocaleString("en-GB")}$. The prepaid insurance **increases** profit because it is removed from this year's expenses; deducting it gives ${money(r2(corr - 2 * c.prepaidIns))}.`,
        workedSolution: stmt,
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Sipho says the corrections \"just make my profit look worse\". Evaluate whether he should make them.",
        points: ["The corrected profit is a truer / fairer figure that follows the accounting concepts", "Users (bank, tax authorities, Sipho himself) rely on the profit for decisions; an overstated profit could mislead them", "Conclusion: he should make the corrections (one adjustment, the prepayment, actually increases profit)"],
        modelAnswer: "He should make them. The draft profit is overstated because revenue not yet earned, an expected loss and an unpaid expense were ignored. A bank or other user relying on it could make a wrong decision, and Sipho himself might draw out money the business has not earned. The corrections are not all negative: the prepayment raises profit.",
        explanation: "Evaluation needs a judgement supported by reasons.",
      }),
    ],
    hints: ["For each item decide whether profit rises or falls.", "A prepayment removed from expenses increases profit."],
    explanation: "This item applies all five applied concepts to a profit correction.",
  });

  // Practice structured 2 (both): matching and prudence
  const m = { elecPaid: 1480, elecOwing: 230, rentPaid: 5400, rentPrepaid: 450, receivables: 6200, doubtfulPct: 5 };
  const elec = r2(m.elecPaid + m.elecOwing);
  const rent = r2(m.rentPaid - m.rentPrepaid);
  const allowance = r2((m.receivables * m.doubtfulPct) / 100);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: `Chipo owns a pharmacy in Mutare. For the year ended 31 December 2025:\n\n| Item | US\\$ |\n| --- | ---: |\n| Electricity paid | ${m.elecPaid.toLocaleString("en-GB")} |\n| Electricity owing at 31 December 2025 | ${m.elecOwing} |\n| Rent paid | ${m.rentPaid.toLocaleString("en-GB")} |\n| Rent paid in advance at 31 December 2025 | ${m.rentPrepaid} |\n| Trade receivables at 31 December 2025 | ${m.receivables.toLocaleString("en-GB")} |\n\nChipo expects 5% of trade receivables not to be collected.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: elec, wrong: [r2(m.elecPaid - m.elecOwing)],
        stem: "Calculate the electricity expense for the year.",
        explanation: `$1,480 + 230 = ${elec.toLocaleString("en-GB")}$.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: rent, wrong: [r2(m.rentPaid + m.rentPrepaid)],
        stem: "Calculate the rent expense for the year.",
        explanation: `$5,400 - 450 = ${rent.toLocaleString("en-GB")}$.`,
      }),
      P.num({
        label: "(c)", marks: 1, kind: "money", value: allowance, wrong: [r2(m.receivables - allowance)],
        stem: "Calculate the provision (allowance) for doubtful debts.",
        explanation: `$6,200 \\times 5\\% = ${allowance}$.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which concept explains the adjustments in (a) and (b)?",
        options: [["Matching (accruals)", "Correct: expenses belong to the period in which they are incurred."], ["Prudence", "Prudence explains (c), the provision."], ["Consistency", "Consistency is about using the same methods each year."], ["Going concern", "Going concern does not decide which period an expense belongs to."]],
        answer: "A",
        explanation: "Accruals and prepayments apply the matching concept.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Explain how the prudence concept applies to the provision in (c).",
        points: ["Prudence recognises an expected loss now / does not overstate assets or profit", "Trade receivables are reduced to the amount expected to be collected and the provision reduces profit"],
        modelAnswer: "Chipo expects some customers not to pay. Prudence requires the expected loss to be recognised now, so trade receivables are shown net of the provision and profit is reduced, rather than overstating both.",
        explanation: "Expected losses are anticipated; expected gains are not.",
      }),
    ],
    hints: ["Owing amounts are added; amounts paid in advance are deducted.", "The provision is a percentage of trade receivables."],
    explanation: "Matching and prudence shape the year-end adjustments.",
  });

  b.card("DEFINITION", "**Matching (accruals)** concept", "Income and expenses are recognised in the period in which they are earned or incurred, not when cash is received or paid.");
  b.card("DEFINITION", "**Prudence** concept", "Do not overstate assets or profit, or understate liabilities; recognise expected losses now and gains only when realised.");
  b.card("DEFINITION", "**Consistency** concept", "Use the same accounting methods from year to year so results can be compared.");
  b.card("DEFINITION", "**Materiality** concept", "Items too small to affect users' decisions can be treated in the simplest way (e.g. expensing a stapler).", undefined, { applies: CAM });
  b.card("DEFINITION", "**Realisation** concept", "Revenue is recognised when goods are delivered or services performed and the customer is liable to pay, not when an order or deposit is received.", undefined, { applies: CAM });
  b.card("FACT", "Accruals, prepayments and depreciation apply which concept?", "Matching (accruals).");
  b.card("FACT", "Provision (allowance) for doubtful debts and inventory at lower of cost and NRV apply which concept?", "Prudence.");
  b.card("FACT", "Which applied concepts does ZIMSEC list?", "Matching (accrual), prudence and consistency.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Is a customer's deposit for undelivered goods revenue?", "No: under realisation it is a liability until the goods are delivered.", undefined, { applies: CAM });
});
