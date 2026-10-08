// W1b: accounting concepts: business entity, duality, money measurement, historic cost, going concern.
import { concept, P, money, statement, journal, check, sum, r2, ZIM, CAM } from "../lib.mjs";

concept("acc.concepts.foundation-concepts", { file: "concepts/foundation-concepts", keyPrefix: "concepts.foundation-concepts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", applies: CAM,
    stem: "Which concept states that only items that can be measured reliably in money are recorded in the accounts?",
    options: [
      ["Money measurement", "Correct: this is the definition of money measurement."],
      ["Historic cost", "Historic cost is about the value used for assets (their cost)."],
      ["Business entity", "Business entity separates the business from its owner."],
      ["Going concern", "Going concern assumes the business will continue trading."],
    ],
    answer: "A",
    explanation: "**Money measurement**: if an item cannot be given a reliable money value (staff morale, customer loyalty) it is not recorded.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which concept assumes that a business will continue to trade for the foreseeable future?",
    options: [
      ["Going concern", "Correct: this is the going concern assumption."],
      ["Duality", "Duality is about the two aspects of every transaction."],
      ["Historic cost", "Historic cost is about recording assets at cost."],
      ["Consistency", "Consistency means using the same methods from year to year."],
    ],
    answer: "A",
    explanation: "Because the business is a **going concern**, assets are valued for continued use, not at what they would fetch if the business closed.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, applies: CAM,
    stem: "Tendai pays his family's grocery bill from his hardware shop's bank account and records it as a shop expense. Which concept has been broken?",
    options: [
      ["Business entity", "Correct: the owner's private spending has been treated as a business expense."],
      ["Money measurement", "The grocery bill can be measured in money, so this is not the issue."],
      ["Going concern", "Nothing suggests the business will stop trading."],
      ["Historic cost", "No asset has been valued."],
    ],
    answer: "A",
    explanation: "Under the **business entity** concept, the owner's private expenses are not business expenses. Paid from the business, they are **drawings**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A shop's premises were bought for US\\$35,000 eight years ago and could now be sold for US\\$52,000. They are still shown at cost. Which concept is being applied?",
    options: [
      ["Historic cost", "Correct: assets are recorded at the price paid, not current market value."],
      ["Going concern", "Going concern explains why forced-sale values are not used, not why cost is kept."],
      ["Prudence", "Prudence is about not overstating; here the concept that fixes the value at cost is historic cost."],
      ["Duality", "Duality is about recording two aspects of every transaction."],
    ],
    answer: "A",
    explanation: "**Historic (historical) cost**: assets stay at their cost (less depreciation where it applies), because cost is objective and can be verified.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which concept is the basis of the rule that every debit entry has an equal credit entry?",
    options: [
      ["Duality (double entry)", "Correct: every transaction has two equal aspects."],
      ["Business entity", "Business entity separates the owner from the business."],
      ["Going concern", "Going concern is an assumption about the future of the business."],
      ["Historic cost", "Historic cost is about the value at which assets are recorded."],
    ],
    answer: "A",
    explanation: "**Duality**: each transaction affects two accounts by the same amount, which is why the trial balance agrees and assets = capital + liabilities.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Rudo's hair salon has a team of highly skilled stylists who attract many loyal customers. Why do the stylists' skills **not** appear as an asset in the statement of financial position?",
    options: [
      ["Their value cannot be measured reliably in money", "Correct: the money measurement concept excludes them."],
      ["The stylists are not owned by the business entity", "Business entity is about the owner, not the employees."],
      ["Skills lose value over time, so prudence ignores them", "Prudence does not exclude items for this reason; measurement is the problem."],
      ["The business might not be a going concern", "Nothing suggests the salon will close."],
    ],
    answer: "A",
    hints: ["Could two accountants agree on a figure for the skills?"],
    explanation: "The skills are valuable but cannot be given a reliable money value, so under **money measurement** they are not recorded. This is a limitation of financial statements.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Sipho's transport business will close down in two months. Its minibuses are shown at cost less depreciation. Which concept no longer applies, so the minibuses should be revalued?",
    options: [
      ["Going concern", "Correct: the business will not continue, so assets should be shown at what they will realise."],
      ["Business entity", "The business is still separate from Sipho."],
      ["Duality", "Every transaction still has two aspects."],
      ["Money measurement", "The minibuses can still be measured in money."],
    ],
    answer: "A",
    hints: ["Which concept assumes the business will continue?"],
    explanation: "When a business is closing, it is no longer a **going concern**; its assets are valued at their likely sale (break-up) value, which is usually lower.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: "Nyasha paid US\\$400 of her own money for a personal holiday. Which entry, if any, should appear in her business's books?",
    options: [
      ["No entry", "Correct: a private transaction paid with private money does not affect the business."],
      ["Debit drawings US\\$400; credit bank US\\$400", "Drawings arise only when business money or goods are used; the business bank did not pay."],
      ["Debit holiday expenses US\\$400; credit capital US\\$400", "A holiday is not a business expense."],
      ["Debit capital US\\$400; credit holiday expenses US\\$400", "There is nothing to record: no business resources were used."],
    ],
    answer: "A",
    hints: ["Did any business resources change?"],
    explanation: "Under the **business entity** concept only the business's transactions are recorded. Private money spent privately has no effect; it would be drawings only if business money paid for it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A delivery van was bought for US\\$16,800 plus US\\$350 for fitting a roof rack before use. At what amount should the van be recorded?",
    options: [
      ["US\\$17,150", "Correct: cost includes all costs of getting the asset ready for use."],
      ["US\\$16,800", "The roof rack fitting is part of the cost of getting the van ready."],
      ["US\\$16,450", "Costs to get an asset ready are added to cost, not deducted."],
      ["Its current market value", "Under historic cost, the cost is used, not market value."],
    ],
    answer: "A",
    hints: ["Historic cost includes more than the price on the invoice."],
    explanation: `Historic cost = purchase price + costs to bring the asset into use: $16,800 + 350 = 17,150$.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the historic cost concept, assets are recorded at the price paid for them, not at their current value.",
    answer: true,
    explanation: "True. Cost is objective and verifiable from the invoice.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Money taken by the owner from the business for private use is a breach of the business entity concept.",
    answer: false,
    explanation: "False. Recording it as **drawings** is how the concept is applied. The breach would be recording it as a business expense.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a business is a going concern, its assets are valued at what they would raise in a forced sale.",
    answer: false,
    explanation: "False. A going concern keeps its assets for use, so forced-sale values are not used; cost less depreciation is used instead.",
  });

  b.match({
    d: 2, skill: "APPLICATION", applies: CAM,
    stem: "Match each situation with the concept it illustrates.",
    pairs: [
      ["The owner's home rates paid by the business are recorded as drawings", "Business entity"],
      ["A loyal customer base is not shown as an asset", "Money measurement"],
      ["Land bought for US\\$20,000 is still shown at US\\$20,000 although it is worth more", "Historic cost"],
      ["A purchase on credit increases both purchases and trade payables", "Duality"],
      ["Specialised shop fittings are not written down to scrap value", "Going concern"],
    ],
    explanation: "Each situation applies one foundation concept: entity separates the owner; money measurement excludes what cannot be valued; historic cost keeps assets at cost; duality gives two entries; going concern rejects break-up values.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Match each ZIMSEC concept with its meaning.",
    pairs: [
      ["Going concern", "The business will continue trading for the foreseeable future"],
      ["Historical cost", "Assets are recorded at the price paid for them"],
      ["Double entry (duality)", "Every transaction has two equal and opposite aspects"],
    ],
    explanation: "These are the three foundation concepts named in the ZIMSEC syllabus.",
  });

  b.fib({
    d: 2,
    stem: "Choose the correct concept.",
    template: "Valuing a machine at cost less depreciation rather than at its scrap value assumes the business is a {{blank:a}}. Recording the machine at the invoice price plus installation applies the {{blank:b}} concept.",
    blanks: [
      { id: "a", accepted: ["going concern"], choices: ["going concern", "business entity", "duality"] },
      { id: "b", accepted: ["historic cost"], choices: ["historic cost", "money measurement", "going concern"] },
    ],
    explanation: "Going concern rejects scrap values; historic cost fixes the value at what was paid to get the asset into use.",
  });

  // Business entity correction
  const ex = { draft: 5960, rent: 600, fuel: 230 };
  const corrected = r2(ex.draft + ex.rent + ex.fuel);
  b.calc({
    d: 3, kind: "money", value: corrected, wrong: [r2(ex.draft - ex.rent - ex.fuel), ex.draft], applies: CAM,
    stem: `Thandeka's draft profit for 2025 was ${money(ex.draft)}. The expenses include ${money(ex.rent)} rent for her private flat and ${money(ex.fuel)} fuel for a family trip, both paid from the business bank account. Calculate the corrected profit.`,
    hints: ["Private expenses are not business expenses. Does removing them raise or lower profit?"],
    explanation: `Removing private expenses from the expenses **increases** profit: $5,960 + 600 + 230 = ${corrected.toLocaleString("en-GB")}$. The ${money(r2(ex.rent + ex.fuel))} is transferred to drawings. Deducting them again gives ${money(r2(ex.draft - ex.rent - ex.fuel))}.`,
  });
  // Historic cost total
  const hc = { price: 9400, delivery: 260, install: 540, insuranceYear: 310 };
  const hcCost = r2(hc.price + hc.delivery + hc.install);
  b.calc({
    d: 4, kind: "money", value: hcCost, wrong: [r2(hcCost + hc.insuranceYear), hc.price],
    stem: `Chipo bought a bread oven for her bakery. Invoice price ${money(hc.price)}; delivery ${money(hc.delivery)}; installation ${money(hc.install)}; insurance for the first year of use ${money(hc.insuranceYear)}. At what historic cost should the oven be recorded?`,
    hints: ["Include only costs needed to get the oven ready for use.", "Insurance for a year of use is a running expense."],
    explanation: `Cost = price + delivery + installation: $9,400 + 260 + 540 = ${hcCost.toLocaleString("en-GB")}$. The year's insurance is an expense of running the oven, so including it (${money(r2(hcCost + hc.insuranceYear))}) is wrong.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, applies: CAM,
    stem: "Explain **one** limitation of financial statements that results from the money measurement concept.",
    points: ["Items that cannot be measured reliably in money are left out", "Example: staff skills / customer loyalty / reputation / location, so the statements do not show the full value or strengths of the business"],
    modelAnswer: "Only items with a reliable money value are recorded, so important strengths such as a skilled workforce or loyal customers do not appear. Users therefore do not see the whole picture of the business.",
    hints: ["Name something valuable that is never recorded."],
    explanation: "This is a common evaluation point in Cambridge Paper 2.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** reasons why accountants use historic cost rather than current market values for assets.",
    points: ["Cost is objective / can be verified from an invoice or receipt", "Market values are opinions, change often and would need regular revaluation (subjective)"],
    modelAnswer: "Cost is a fact that can be checked against documents, whereas market value is an estimate that differs between valuers and changes over time.",
    hints: ["Think about evidence and reliability."],
    explanation: "Objectivity and reliability are the main arguments for historic cost.",
  });

  // Practice structured 1 (CAM): business entity case with corrected profit
  const s1 = { draft: 11240, school: 1350, car: 780, cap: 2500, home: 420 };
  const privTotal = r2(s1.school + s1.car + s1.home);
  const s1Corrected = r2(s1.draft + privTotal);
  const s1Stmt = statement("Corrected profit for the year ended 31 December 2025", [
    ["Draft profit", null, s1.draft], ["Add private expenses charged as business expenses:", null, null], ["School fees for Tatenda's son", s1.school, null], ["Repairs to Tatenda's family car", s1.car, null], ["Electricity at Tatenda's home", s1.home, null], [null, null, privTotal], ["**Corrected profit**", null, s1Corrected],
  ], { checks: [["priv", privTotal, 2550], ["corr", s1Corrected, s1.draft + privTotal]] });
  const s1J = journal([{ date: "31 Dec", lines: [["Drawings", privTotal, null], ["Sundry expenses", null, s1.school], ["Motor expenses", null, s1.car], ["Electricity", null, s1.home]], narrative: "Private expenses paid by the business transferred to drawings" }]);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", applies: CAM, calculator: true,
    stem: `Tatenda owns a furniture workshop in Bulawayo. His bookkeeper calculated a draft profit of ${money(s1.draft)} for the year ended 31 December 2025. You find that:\n\n1. School fees of ${money(s1.school)} for Tatenda's son were paid from the business bank account and debited to sundry expenses.\n2. Repairs of ${money(s1.car)} to Tatenda's family car (not used by the business) were debited to motor expenses.\n3. Tatenda paid ${money(s1.cap)} of his own savings into the business bank account; this was correctly credited to capital.\n4. Electricity of ${money(s1.home)} for Tatenda's home was paid by the business and debited to electricity.`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which concept do items 1, 2 and 4 break?",
        options: [["Business entity", "Correct: private expenses have been treated as business expenses."], ["Going concern", "Nothing suggests the business is closing."], ["Historic cost", "No asset has been valued."], ["Money measurement", "All the items are measured in money."]],
        answer: "A",
        explanation: "The owner and the business are separate: private bills paid by the business are drawings.",
      }),
      P.num({
        label: "(b)", marks: 3, kind: "money", value: s1Corrected, wrong: [r2(s1Corrected + s1.cap), r2(s1.draft - privTotal)],
        stem: "Calculate the corrected profit for the year.",
        explanation: `Add back the private expenses: $11,240 + 1,350 + 780 + 420 = ${s1Corrected.toLocaleString("en-GB")}$. Item 3 is capital, not income, so it does not change profit (adding it gives ${money(r2(s1Corrected + s1.cap))}).`,
        workedSolution: s1Stmt,
      }),
      P.manual({
        label: "(c)", marks: 3, type: "EXTENDED_RESPONSE",
        stem: "Prepare the journal entry, with a narrative, to correct items 1, 2 and 4.",
        points: [`Debit drawings ${privTotal.toLocaleString("en-GB")}`, "Credit sundry expenses 1,350, motor expenses 780 and electricity 420", "Narrative"],
        modelAnswer: s1J,
        explanation: "The expenses are reduced and drawings increased by the same amount.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain why item 3 was correctly recorded and why the business entity concept matters to Tatenda's bank manager, who is considering a loan.",
        points: ["Money the owner puts into the business is capital (the business owes it to him), so crediting capital applies the entity concept", "The bank needs the accounts to show the business's own profit and assets only", "Mixing private items understates profit / misrepresents performance, so the lending decision could be wrong"],
        modelAnswer: "Capital introduced is owed by the business to Tatenda, so crediting capital keeps owner and business separate. The bank manager needs a profit figure that shows only the business's results; private bills charged as expenses understate profit and could lead to a wrong lending decision.",
        explanation: "Lenders rely on accounts that show only the business's own results.",
      }),
    ],
    hints: ["Private expenses paid by the business become drawings.", "Does capital introduced affect profit?"],
    explanation: "Applying the business entity concept corrects the profit and the drawings.",
  });

  // Practice structured 2 (both): going concern and historic cost
  const assets = [["Premises", 72000, 95000, 58000], ["Machinery (cost less depreciation)", 18600, 15200, 6400], ["Inventory", 9300, 11800, 4700]];
  const tc = sum(assets.map((x) => x[1]));
  const tm = sum(assets.map((x) => x[2]));
  const tfv = sum(assets.map((x) => x[3]));
  check("tc", tc, 99900);
  b.struct({
    d: 5, examStyle: true, skill: "EVALUATION", calculator: true,
    stem: `Sipho manufactures school uniforms in Gweru. The business is trading normally. A valuer gives these figures for its assets at 31 December 2025:\n\n| Asset | Book value at cost US\\$ | Current market value US\\$ | Forced-sale value US\\$ |\n| --- | ---: | ---: | ---: |\n${assets.map((a) => `| ${a[0]} | ${a[1].toLocaleString("en-GB")} | ${a[2].toLocaleString("en-GB")} | ${a[3].toLocaleString("en-GB")} |`).join("\n")}\n\nSipho wants to show the assets at current market value "because it makes the business look stronger".`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: tc, wrong: [tm],
        stem: "Calculate the total value of these assets that should appear in the statement of financial position.",
        explanation: `Historic cost (book value at cost): $72,000 + 18,600 + 9,300 = ${tc.toLocaleString("en-GB")}$. Market values (${money(tm)}) are not used.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: r2(tm - tc),
        wrong: [r2(tc - tfv)],
        stem: "Calculate by how much the assets would be overstated, compared with historic cost, if Sipho used market values.",
        explanation: `$${tm.toLocaleString("en-GB")} - ${tc.toLocaleString("en-GB")} = ${r2(tm - tc).toLocaleString("en-GB")}$.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which concept explains why the forced-sale values are **not** used?",
        options: [["Going concern", "Correct: the business is expected to continue trading."], ["Historic cost", "Historic cost explains why cost is used, not why break-up values are rejected."], ["Business entity", "This separates the owner from the business."], ["Duality", "This is about two-sided entries."]],
        answer: "A",
        explanation: "Forced-sale values matter only if the business is closing.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Advise Sipho whether he should show the assets at current market value. Justify your answer.",
        points: ["Historic cost is required: assets are recorded at cost", "Cost is objective / verifiable; market values are opinions and change", "Using market values would overstate assets and capital and could mislead lenders or other users", "Conclusion: keep the assets at cost (less depreciation)"],
        modelAnswer: "He should not. Under historic cost the assets stay at what they cost, which can be proved from invoices; market values are estimates that change. Showing them would overstate assets by the difference and could mislead a bank or other user, so he should keep cost less depreciation.",
        explanation: "An advise question needs a clear conclusion supported by reasons.",
      }),
    ],
    hints: ["Which value does the historic cost concept use?", "Is the business closing?"],
    explanation: "Going concern and historic cost together decide the asset values in the statement of financial position.",
  });

  b.card("DEFINITION", "**Business entity** concept", "The business is separate from its owner: only business transactions are recorded; private expenses paid by the business are drawings.", undefined, { applies: CAM });
  b.card("DEFINITION", "**Duality** (double entry) concept", "Every transaction has two equal aspects: a debit and a credit of the same amount.");
  b.card("DEFINITION", "**Money measurement** concept", "Only items that can be measured reliably in money are recorded.", "So staff skills and customer loyalty are not shown as assets.", { applies: CAM });
  b.card("DEFINITION", "**Historic (historical) cost** concept", "Assets are recorded at what they cost (including costs to get them ready for use), not at market value.");
  b.card("DEFINITION", "**Going concern** concept", "The business is assumed to continue for the foreseeable future, so assets are not valued at forced-sale prices.");
  b.card("FACT", "When does going concern stop applying?", "When the business is about to close; assets are then valued at what they would realise on sale.");
  b.card("CONCEPT", "Why use historic cost?", "Cost is objective and verifiable from documents; market values are subjective and change.");
  b.card("FACT", "Which foundation concepts does ZIMSEC list?", "Going concern, historical cost and double entry (duality).", undefined, { applies: ZIM });
  b.card("FACT", "Owner's private bill paid from the business bank", "Debit drawings; credit bank (or move it from the expense account to drawings). It is not a business expense.", undefined, { applies: CAM });
});
