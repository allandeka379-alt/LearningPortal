// W4b: single entry, statements of affairs and profit from changes in capital.
import { concept, P, money } from "../lib.mjs";
import { statementOfAffairs, capitalCalc, profitFromCapital, table, U, fmt, r2, sum, check } from "../tables/w4b-lib.mjs";

concept("acc.incomplete.statement-of-affairs", { file: "incomplete/statement-of-affairs", keyPrefix: "incomplete.statement-of-affairs" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A statement of affairs is used to find a trader's …",
    options: [
      ["capital on a given date", "Correct: assets less liabilities on that date equal capital."],
      ["revenue for the year", "Revenue comes from a reconstructed income statement, not from a list of assets and liabilities."],
      ["cash received during the year", "Receipts come from a cash and bank summary."],
      ["gross profit for the year", "A statement of affairs shows no trading figures at all."],
    ],
    answer: "A",
    explanation: "The statement of affairs applies the accounting equation at one date: capital = assets − liabilities.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **disadvantage** of keeping incomplete records?",
    options: [
      ["No trial balance can be drawn up to check the arithmetic", "Correct: without double entry there is no arithmetical check."],
      ["The records cost little to keep", "Low cost is an advantage of incomplete records."],
      ["The owner needs little bookkeeping knowledge", "This is an advantage, not a disadvantage."],
      ["Records can be kept quickly by the owner", "Speed is an advantage."],
    ],
    answer: "A",
    explanation: "Incomplete records are cheap and simple, but there is no trial balance, little detail and theft is hard to detect.",
  });
  {
    const op = 8420, cl = 11150, dr = 5200;
    const p = profitFromCapital({ opening: op, closing: cl, drawings: dr });
    check("soa mcq1", p, 7930);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Tatenda's capital was ${money(op)} on 1 January 2025 and ${money(cl)} on 31 December 2025. His drawings for the year were ${money(dr)}. What was his profit for the year?`,
      options: [
        [money(p), "Correct: 11,150 − 8,420 + 5,200."],
        [money(r2(cl - op)), "This is only the increase in capital; drawings have not been added back."],
        [`a loss of ${money(Math.abs(r2(cl - op - dr)))}`, "Drawings have been deducted instead of added back."],
        [money(r2(cl + op - dr)), "The two capitals have been added instead of compared."],
      ],
      answer: "A",
      explanation: `Profit = closing capital − opening capital + drawings = ${fmt(cl)} − ${fmt(op)} + ${fmt(dr)} = ${fmt(p)}.`,
    });
  }
  {
    const op = 15600, cl = 18900, dr = 3800, ci = 5000;
    const p = profitFromCapital({ opening: op, closing: cl, drawings: dr, introduced: ci });
    check("soa mcq2", p, 2100);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Thandeka's capital rose from ${money(op)} to ${money(cl)} during 2025. She took drawings of ${money(dr)} and paid ${money(ci)} of her savings into the business. What was the profit for the year?`,
      options: [
        [money(p), "Correct: 18,900 − 15,600 + 3,800 − 5,000."],
        [money(r2(cl - op + dr + ci)), "Capital introduced has been added instead of deducted."],
        [money(r2(cl - op + dr)), "Capital introduced has been ignored, so the savings are counted as profit."],
        [money(r2(cl - op - dr + ci)), "The signs of drawings and capital introduced have been swapped."],
      ],
      answer: "A",
      hints: ["Add back what the owner took out; take away what the owner put in."],
      explanation: `${fmt(cl)} − ${fmt(op)} = ${fmt(cl - op)}; + drawings ${fmt(dr)} − capital introduced ${fmt(ci)} = ${fmt(p)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a statement of affairs, how is a **bank overdraft** shown?",
    options: [
      ["As a current liability", "Correct: the business owes the bank this amount."],
      ["As a current asset", "An overdraft is money owed, not money held."],
      ["As a non-current liability", "An overdraft is repayable on demand, so it is current."],
      ["As a deduction from capital introduced", "It is a liability of the business, not an owner item."],
    ],
    answer: "A",
    explanation: "An overdraft is a short-term debt to the bank: a current liability.",
  });
  {
    const assets = [["Van", 6500], ["Inventory", 2340], ["Trade receivables", 1170], ["Cash", 260]];
    const liabs = [["Trade payables", 1890], ["Rent owing", 150]];
    const cap = r2(sum(assets.map((x) => x[1])) - sum(liabs.map((x) => x[1])));
    check("soa mcq3", cap, 8230);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `On 1 January 2025 Sipho's carpentry business had: van ${money(6500)}, inventory ${money(2340)}, trade receivables ${money(1170)}, cash ${money(260)}; trade payables ${money(1890)} and rent owing ${money(150)}. What was his capital?`,
      options: [
        [money(cap), "Correct: assets 10,270 − liabilities 2,040."],
        [money(r2(cap + 300)), "Rent owing has been added as an asset instead of deducted as a liability."],
        [money(r2(sum(assets.map((x) => x[1])))), "This is total assets; liabilities have not been deducted."],
        [money(r2(cap - 6500)), "The van has been left out: non-current assets are part of capital."],
      ],
      answer: "A",
      explanation: `Assets ${fmt(sum(assets.map((x) => x[1])))} − liabilities ${fmt(sum(liabs.map((x) => x[1])))} = ${fmt(cap)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A trader's capital fell during the year, yet the business made a profit. Which explains this?",
    options: [
      ["Drawings were greater than the profit", "Correct: taking out more than was earned reduces capital."],
      ["The owner introduced extra capital", "Capital introduced would increase capital, not reduce it."],
      ["Inventory at the year end was higher", "Higher inventory increases assets and capital."],
      ["Trade payables at the year end were lower", "Lower liabilities increase capital."],
    ],
    answer: "A",
    hints: ["Closing capital = opening capital + profit + capital introduced − drawings."],
    explanation: "Closing capital = opening + profit − drawings (+ capital introduced). If drawings exceed profit, capital falls even though there was a profit.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "During the year Chipo took goods costing US\\$480 from her shop for her family, as well as cash drawings. How are the goods treated when profit is found from the change in capital?",
    options: [
      ["They are added to the cash drawings and added back", "Correct: goods taken are drawings at cost."],
      ["They are deducted as capital introduced", "Capital introduced is resources put in, not taken out."],
      ["They are ignored because no cash changed hands", "Any asset taken for private use is drawings."],
      ["They are added to closing inventory", "The goods have left the business, so they are not inventory."],
    ],
    answer: "A",
    hints: ["Drawings can be cash, goods or other assets."],
    explanation: "Goods taken for private use reduce the business's assets, so they are drawings and must be added back with the cash drawings.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the change-in-capital method **not** tell the owner?",
    options: [
      ["How much gross profit was made on sales", "Correct: the method gives only the overall profit or loss."],
      ["Whether the business made a profit or a loss", "This is exactly what the method finds."],
      ["The capital at the end of the year", "The closing statement of affairs shows it."],
      ["The total value of assets at the year end", "The closing statement of affairs lists them."],
    ],
    answer: "A",
    explanation: "Comparing capitals gives one figure. There is no revenue, cost of sales or list of expenses, so the owner cannot see how the profit arose.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Expenses paid in advance at the year end are listed as a current asset in the statement of affairs.",
    answer: true,
    explanation: "True. A prepayment is a benefit the business has paid for but not yet used: an asset.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Money lent to the business by the owner's brother is treated as capital introduced.",
    answer: false,
    explanation: "False. A loan from anyone other than the owner is a liability of the business. Only resources put in by the owner are capital introduced.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with where it belongs when a trader's profit is found from the change in capital.",
    right: ["Asset in the statement of affairs", "Liability in the statement of affairs", "Added back to the change in capital", "Deducted from the change in capital"],
    pairs: ["Insurance paid in advance", "Wages owing", "Goods taken by the owner", "A legacy paid into the business by the owner", "Bank overdraft", "Trade receivables"],
    rightIndex: [0, 1, 2, 3, 1, 0],
    explanation: "Prepayments and receivables are assets; accruals and overdrafts are liabilities; drawings (cash or goods) are added back; capital introduced is deducted.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula.",
    template: "Profit for the year = closing capital − opening capital {{blank:a}} drawings {{blank:b}} capital introduced.",
    blanks: [
      { id: "a", accepted: ["+"], choices: ["+", "−"] },
      { id: "b", accepted: ["−"], choices: ["+", "−"] },
    ],
    explanation: "Drawings are added back because they reduced closing capital; capital introduced is deducted because it increased closing capital without being earned.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const op = 23480, cl = 21790, dr = 6300, ci = 1500;
    const p = profitFromCapital({ opening: op, closing: cl, drawings: dr, introduced: ci });
    check("soa num1", p, 3110);
    b.calc({
      d: 3, kind: "money", value: p, calculator: true, wrong: [r2(cl - op), r2(cl - op + dr + ci)],
      stem: `Nyasha's transport business had capital of ${money(op)} at 1 January 2025 and ${money(cl)} at 31 December 2025. During the year she withdrew ${money(dr)} and paid in ${money(ci)} from the sale of a private plot. Calculate the profit for the year.`,
      hints: ["Capital fell, but drawings were large. Adjust the change in capital for both owner items."],
      explanation: `Change in capital ${fmt(cl)} − ${fmt(op)} = ${fmt(r2(cl - op))} (a fall). Add drawings ${fmt(dr)}: ${fmt(r2(cl - op + dr))}. Less capital introduced ${fmt(ci)}: profit ${fmt(p)}. Using only the change in capital suggests a loss of ${fmt(Math.abs(r2(cl - op)))}; adding the capital introduced gives ${fmt(r2(cl - op + dr + ci))}.`,
    });
  }
  {
    const op = 9750, p = 6420, dr = 4880;
    const cl = r2(op + p - dr);
    check("soa num2", cl, 11290);
    b.num({
      d: 2, kind: "money", value: cl, wrong: [r2(op + p + dr)],
      stem: `Rudo's opening capital was ${money(op)}. Her profit for the year was ${money(p)} and her drawings ${money(dr)}. Calculate her closing capital.`,
      explanation: `Closing capital = ${fmt(op)} + ${fmt(p)} − ${fmt(dr)} = ${fmt(cl)}. Adding the drawings gives ${fmt(r2(op + p + dr))}.`,
    });
  }
  {
    const cl = 14260, p = 5130, dr = 3970;
    const op = r2(cl - p + dr);
    check("soa num3", op, 13100);
    b.calc({
      d: 4, kind: "money", value: op, calculator: true, wrong: [r2(cl - p - dr)],
      stem: `Farai's records were destroyed in a fire. His accountant knows that his capital at 31 December 2025 was ${money(cl)}, his profit for 2025 was ${money(p)} and his drawings were ${money(dr)}. No capital was introduced. Calculate Farai's capital at 1 January 2025.`,
      hints: ["Start from closing = opening + profit − drawings and rearrange."],
      explanation: `Opening = closing − profit + drawings = ${fmt(cl)} − ${fmt(p)} + ${fmt(dr)} = ${fmt(op)}. Deducting the drawings as well gives ${fmt(r2(cl - p - dr))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** reasons why the owner of a small market stall may keep incomplete records.",
    points: ["Full double-entry records take too much time / the owner lacks bookkeeping knowledge", "A bookkeeper or accountant costs money the business cannot afford / few transactions so detail seems unnecessary"],
    modelAnswer: "She has no training in double entry and is busy selling, and she cannot afford to pay a bookkeeper for a business with so few transactions.",
    explanation: "Time, knowledge and cost are the usual reasons.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Sipho calculates his profit each year from the change in capital. Advise him whether he should start keeping a full set of double-entry records. Give **two** reasons and a conclusion.",
    points: ["Double entry gives a trial balance check on accuracy / helps detect theft or errors", "It shows detail: revenue, gross profit and each expense, so costs can be controlled; lenders prefer it", "Conclusion weighed against cost/time (e.g. he should, if the business is growing or needs a loan)"],
    modelAnswer: "Full records would let him prepare a trial balance, so errors and missing cash would be found, and an income statement would show which expenses are rising. A bank would also accept the figures more readily. Although they take more time or a bookkeeper's fee, he should change if he plans to grow or borrow.",
    hints: ["Think about what the change-in-capital method cannot show."],
    explanation: "A balanced answer weighs detail and control against cost and time.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const o = statementOfAffairs({ name: "Chipo Dube", date: "1 January 2025", nca: [["Sewing machines", 3200]], ca: [["Inventory of fabric", 1460], ["Trade receivables", 540], ["Bank", 1215]], cl: [["Trade payables", 685]] });
    const c = statementOfAffairs({ name: "Chipo Dube", date: "31 December 2025", nca: [["Sewing machines", 4720]], ca: [["Inventory of fabric", 1830], ["Trade receivables", 760], ["Insurance prepaid", 120], ["Cash", 340]], cl: [["Trade payables", 910], ["Bank overdraft", 395]] });
    const dr = 2900, goods = 270, ci = 1000;
    const calc = capitalCalc({ name: "Chipo Dube", opening: o.capital, closing: c.capital, drawings: r2(dr + goods), introduced: ci });
    check("soa s1", calc.profit, 2905);
    const stim = table(["Item", "1 January 2025 US\\$", "31 December 2025 US\\$"], [["Sewing machines", 3200, 4720], ["Inventory of fabric", 1460, 1830], ["Trade receivables", 540, 760], ["Insurance prepaid", "–", 120], ["Bank", 1215, "395 overdrawn"], ["Cash", "–", 340], ["Trade payables", 685, 910]]);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Chipo Dube makes school uniforms in Gweru. She does not keep full accounting records. The following information is available:\n\n${stim}\n\nDuring 2025 Chipo withdrew ${money(dr)} in cash and took fabric costing ${money(goods)} for her own use. In June she paid ${money(ci)} from her savings into the business bank account.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: o.capital, wrong: [r2(o.capital + 685)], stem: "Calculate Chipo's capital at 1 January 2025.", explanation: `Assets ${fmt(o.assets)} − liabilities ${fmt(o.liabs)} = ${fmt(o.capital)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: c.capital, wrong: [r2(c.capital + 2 * 395)], stem: "Calculate Chipo's capital at 31 December 2025.", explanation: `Assets ${fmt(c.assets)} − liabilities ${fmt(c.liabs)} (trade payables 910 and overdraft 395) = ${fmt(c.capital)}. Treating the overdraft as an asset gives ${fmt(r2(c.capital + 2 * 395))}.` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: calc.profit, wrong: [r2(calc.profit - goods), r2(calc.profit + 2 * ci)], stem: "Calculate Chipo's profit for the year ended 31 December 2025.", explanation: `${fmt(c.capital)} − ${fmt(o.capital)} + drawings ${fmt(dr + goods)} (cash and goods) − capital introduced ${fmt(ci)} = ${fmt(calc.profit)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State **two** disadvantages to Chipo of keeping incomplete records.", points: ["No trial balance / arithmetical check on the records", "No detailed income statement, so she cannot see gross profit or which expenses are high (or: theft hard to detect; harder to get a loan)"], modelAnswer: "She cannot prepare a trial balance to check her figures, and she cannot see her gross profit or which expenses are rising.", explanation: "Any two distinct disadvantages." }),
      ],
      hints: ["The overdraft at the year end is a liability.", "Goods taken are drawings at cost."],
      explanation: `Model answers:\n\n${o.md}\n\n${c.md}\n\n${calc.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (loss, loan)
  {
    const o = statementOfAffairs({ name: "Tendai Mhlanga", date: "1 January 2025", nca: [["Minibus", 18500], ["Office equipment", 1300]], ca: [["Inventory of spares", 640], ["Trade receivables", 880], ["Bank", 2470]], cl: [["Trade payables", 1150], ["Licence fees owing", 220]] });
    const c = statementOfAffairs({ name: "Tendai Mhlanga", date: "31 December 2025", nca: [["Minibus", 15800], ["Office equipment", 1150]], ca: [["Inventory of spares", 710], ["Trade receivables", 1240], ["Bank", 1860]], cl: [["Trade payables", 1390]], ncl: [["Loan from a finance house (repayable 2028)", 3000]] });
    const dr = 7200;
    const calc = capitalCalc({ name: "Tendai Mhlanga", opening: o.capital, closing: c.capital, drawings: dr });
    check("soa s2", calc.profit, 1150);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Tendai Mhlanga operates a commuter minibus between Harare and Chitungwiza. He keeps only bank statements and a notebook.\n\nAt 1 January 2025: minibus ${money(18500)}, office equipment ${money(1300)}, inventory of spares ${money(640)}, trade receivables ${money(880)}, bank ${money(2470)}; trade payables ${money(1150)}, licence fees owing ${money(220)}.\n\nAt 31 December 2025: minibus ${money(15800)}, office equipment ${money(1150)}, inventory of spares ${money(710)}, trade receivables ${money(1240)}, bank ${money(1860)}; trade payables ${money(1390)}. In March 2025 Tendai borrowed ${money(3000)} from a finance house, repayable in 2028.\n\nTendai's drawings were ${money(600)} a month.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: o.capital, stem: "Calculate Tendai's capital at 1 January 2025.", explanation: `Assets ${fmt(o.assets)} − liabilities ${fmt(o.liabs)} = ${fmt(o.capital)}.` }),
        P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare Tendai's statement of affairs at 31 December 2025.", points: ["Heading: name, \"Statement of affairs\", at 31 December 2025", `Non-current assets 15,800 + 1,150 = ${fmt(c.totNca)}`, `Current assets total ${fmt(c.totCA)}`, `Current liabilities 1,390; net current assets ${fmt(c.wc)}`, `Loan 3,000 deducted as a non-current liability; capital ${fmt(c.capital)}`], modelAnswer: c.md, explanation: "Lay it out like a statement of financial position ending with capital." }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: calc.profit, wrong: [r2(c.capital - o.capital), r2(c.capital - o.capital + dr + 3000)], stem: "Calculate Tendai's profit for the year ended 31 December 2025.", explanation: `${fmt(c.capital)} − ${fmt(o.capital)} + drawings ${fmt(dr)} = ${fmt(calc.profit)}. The loan is a liability, not capital introduced, so it is not deducted again.` }),
        P.mcq({ label: "(d)", stem: "Tendai's capital fell during 2025. What is the main reason?", options: [["His drawings were larger than his profit", "Correct: 7,200 drawn against a profit of 1,150."], ["He took out a loan", "The loan increased both assets (bank) and liabilities; it did not change capital."], ["His minibus lost value", "Depreciation reduced profit, but the profit was still positive."], ["His trade receivables increased", "Higher receivables increase assets and capital."]], answer: "A", explanation: "Capital falls whenever drawings exceed profit." }),
      ],
      hints: ["Monthly drawings × 12.", "A loan increases assets and liabilities equally; it is not capital introduced."],
      explanation: `Model answers:\n\n${o.md}\n\n${c.md}\n\n${calc.md}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Statement of affairs", "A list of a business's assets and liabilities at one date, prepared when full records are not kept. Assets − liabilities = capital.");
  b.card("DEFINITION", "Incomplete records (single entry)", "Records in which transactions are not all kept by double entry: usually just a cash book or bank statements and lists of debts.");
  b.card("FORMULA", "Profit from the change in capital", "Profit = closing capital − opening capital + drawings − capital introduced. A negative answer is a loss.");
  b.card("FORMULA", "Closing capital", "Closing capital = opening capital + profit + capital introduced − drawings.");
  b.card("FACT", "Advantages of incomplete records", "Cheap, quick, and need little accounting knowledge.");
  b.card("FACT", "Disadvantages of incomplete records", "No trial balance check; no detailed income statement; theft hard to detect; lenders and tax authorities may not accept them.");
  b.card("CONCEPT", "Why are drawings added back?", "Drawings already reduced closing capital. Adding them back shows the full amount the business earned.");
  b.card("CONCEPT", "Why is capital introduced deducted?", "It increased closing capital but was not earned by trading, so it is not profit.");
  b.card("FACT", "Bank overdraft in a statement of affairs", "A current liability: the business owes the bank.");
});
