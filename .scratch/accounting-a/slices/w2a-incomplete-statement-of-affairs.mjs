// W2a: incomplete.statement-of-affairs
import { concept, P, table, r2, fmt, money, chk } from "../lib.mjs";
import { mc, affairs, profitFromCapital } from "../tables/w2a-lib.mjs";

concept("aacc.incomplete.statement-of-affairs", { file: "incomplete/statement-of-affairs", keyPrefix: "incomplete.statement-of-affairs" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a statement of affairs, the owner's capital is the:",
    ok: ["difference between total assets and total liabilities", "Correct: capital = assets - liabilities."],
    bad: [["total of the assets only", "Assets are financed by capital and liabilities together."], ["profit for the year less the owner's drawings", "That is the change in capital, not the capital itself."], ["total of the liabilities only", "Liabilities are what the business owes to outsiders."]],
    explanation: "Capital is the owner's claim on the business: assets less liabilities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which formula gives the profit for the year when only statements of affairs are available?",
    ok: ["Closing capital - opening capital + drawings - capital introduced", "Correct: it removes the effect of drawings and new capital."],
    bad: [["Closing capital - opening capital - drawings + capital introduced", "The signs of drawings and capital introduced are reversed."], ["Closing capital + opening capital + drawings - capital introduced", "Opening capital must be deducted, not added."], ["Closing capital - opening capital", "This ignores drawings and capital introduced."]],
    explanation: "Drawings reduced closing capital, so they are added back; capital introduced increased it without being earned, so it is deducted.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a limitation of finding profit by comparing two statements of affairs?",
    ok: ["It does not show how the profit was earned", "Correct: sales, cost of sales and expenses are not revealed."],
    bad: [["It cannot be used by a sole trader or small business", "Sole traders are the usual users of the method."], ["It always overstates profit", "The result may be over- or understated depending on the valuations."], ["It requires a trial balance", "A trial balance is not available when records are incomplete."]],
    explanation: "Only a single estimated profit figure results; the detail needed to control the business is missing.",
  });
  const cc = 24610;
  const oc = 19840;
  const dd = 7525;
  const ii = 2090;
  const pp = profitFromCapital({ closing: cc, opening: oc, drawings: dd, introduced: ii });
  chk(pp, 10205);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A trader's capital was ${money(oc)} at 1 January and ${money(cc)} at 31 December. During the year drawings were ${money(dd)} and the owner introduced ${money(ii)} of new capital. What was the profit for the year?`,
    ok: [money(pp), "Correct: 24,610 - 19,840 + 7,525 - 2,090."],
    bad: [[money(r2(cc - oc + dd + ii)), "Capital introduced has been added instead of deducted."], [money(r2(cc - oc + dd)), "Capital introduced has been ignored."], [money(r2(cc - oc)), "Drawings and capital introduced have been ignored."]],
    hints: ["Add back drawings; deduct capital introduced."],
    explanation: "Profit = 24,610 - 19,840 + 7,525 - 2,090 = 10,205.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Equipment in the closing statement of affairs was left at cost and the year's depreciation was forgotten. What is the effect on the estimated profit?",
    ok: ["Profit is overstated by the depreciation", "Correct: closing assets and capital are too high by that amount."],
    bad: [["Profit is understated by the depreciation", "Capital is too high, so profit is too high."], ["Profit is correct but liabilities are overstated", "Liabilities are not affected."], ["There is no effect because depreciation is not cash", "Closing capital falls when assets are depreciated, even though no cash moves."]],
    hints: ["What happens to closing capital if an asset is overvalued?"],
    explanation: "An overvalued asset raises closing capital and therefore the profit calculated from it.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following would not appear in a statement of affairs?",
    ok: ["Sales for the year", "Correct: sales are a flow for the period, not an asset or liability at a date."],
    bad: [["Trade payables", "Amounts owed to suppliers are a liability."], ["Cash in the till at the year end", "Cash is an asset."], ["Rent owing", "An accrual is a liability."]],
    explanation: "A statement of affairs lists balances at one date; it does not list income or expenses.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A trader's capital was US\\$16,300 at the start of the year and US\\$13,900 at the end. Drawings were US\\$1,650 and no capital was introduced. What was the result for the year?",
    ok: ["A loss of US\\$750", "Correct: 13,900 - 16,300 + 1,650 = -750."],
    bad: [["A profit of US\\$750", "The sign is wrong: the figure is negative."], ["A loss of US\\$2,400", "Drawings have not been added back."], ["A profit of US\\$4,050", "The fall in capital has been treated as a profit and the drawings added to it."]],
    hints: ["The result is negative if closing capital + drawings is less than opening capital."],
    explanation: "Profit = 13,900 - 16,300 + 1,650 = -750, so a loss of 750.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "The owner forgot to include US\\$500 of capital introduced when calculating profit from two statements of affairs. What is the effect?",
    ok: ["Profit is overstated by US\\$500", "Correct: the 500 is not earned, but it increased closing capital."],
    bad: [["Profit is understated by US\\$500", "Leaving out a deduction raises the profit."], ["Profit is correct because capital introduced is not an expense", "It must still be deducted from the rise in capital."], ["Drawings are understated by US\\$500", "Drawings are an independent figure."]],
    hints: ["Capital introduced is deducted in the formula."],
    explanation: "Failing to deduct 500 leaves it inside the increase in capital, so profit is 500 too high.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Capital introduced by the owner during the year is deducted when profit is calculated from the change in capital.", answer: true, explanation: "True. It increased capital but was not earned." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A statement of affairs can show a negative capital.", answer: true, hints: ["Compare liabilities with assets."], explanation: "True. If liabilities exceed assets the balancing figure is negative, meaning the business owes more than it owns." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to its treatment when profit is calculated from the change in capital.",
    pairs: ["Closing capital", "Opening capital", "Drawings", "Capital introduced"],
    right: ["Starting figure (added)", "Deducted", "Added back", "Deducted from the increase"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Profit = closing capital - opening capital + drawings - capital introduced.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the profit formula.",
    template: "Profit = closing capital {{blank:a}} opening capital {{blank:b}} drawings {{blank:c}} capital introduced.",
    blanks: [
      { id: "a", accepted: ["minus"], choices: ["plus", "minus"] },
      { id: "b", accepted: ["plus"], choices: ["plus", "minus"] },
      { id: "c", accepted: ["minus"], choices: ["plus", "minus"] },
    ],
    explanation: "Profit = closing capital - opening capital + drawings - capital introduced.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the statement that lists the assets and liabilities of a business without full records, so that its capital can be found.",
    accepted: ["statement of affairs", "a statement of affairs"],
    explanation: "A statement of affairs lists assets and liabilities at a date and gives the capital as the balance.",
  });

  // numerical
  const assets1 = [["Equipment", 7340], ["Inventory", 3185], ["Trade receivables", 1465], ["Bank", 2250], ["Cash", 315]];
  const liabs1 = [["Trade payables", 2870], ["Loan", 4000]];
  const A1 = affairs({ biz: "x", when: "x", assets: [{ h: "Assets", items: assets1 }], liabilities: [{ h: "Liabilities", items: liabs1 }] });
  chk(A1.capital, 7685);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: A1.capital, daily: true, calculator: true, wrong: [A1.assets, r2(A1.assets + A1.liabilities)],
    stem: `Nyasha's business has equipment of ${money(7340)}, inventory ${money(3185)}, trade receivables ${money(1465)}, bank ${money(2250)} and cash ${money(315)}. It owes trade payables ${money(2870)} and a loan of ${money(4000)}. Calculate the capital.`,
    explanation: "Assets: 7,340 + 3,185 + 1,465 + 2,250 + 315 = 14,555. Liabilities: 2,870 + 4,000 = 6,870. Capital = 7,685. Ignoring the loan gives 11,685.",
  });
  const prof = profitFromCapital({ closing: 18260, opening: 14935, drawings: 8420, introduced: 0 });
  chk(prof, 11745);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: prof, calculator: true, wrong: [r2(18260 - 14935), r2(18260 - 14935 - 8420)],
    stem: `Capital was ${money(14935)} at 1 January 2025 and ${money(18260)} at 31 December 2025. Drawings during the year were ${money(8420)}; no new capital was introduced. Calculate the profit for the year.`,
    hints: ["Drawings reduced closing capital."],
    explanation: "Profit = 18,260 - 14,935 + 8,420 = 11,745. Leaving out the drawings gives 3,325.",
  });
  const dr = r2(23480 + 12360 + 1500 - 29915);
  chk(dr, 7425);
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: dr, calculator: true, wrong: [r2(29915 - 23480 - 12360), r2(23480 + 12360 - 1500 - 29915)],
    stem: `Rudo started the year with capital of ${money(23480)} and ended with ${money(29915)}. Her profit for the year was ${money(12360)} and she introduced ${money(1500)} of capital. Calculate her drawings.`,
    hints: ["Closing = opening + profit - drawings + capital introduced. Solve for drawings."],
    explanation: "Drawings = 23,480 + 12,360 + 1,500 - 29,915 = 7,425.",
  });
  const cl = 31870;
  const dep = 1240;
  const invOver = 385;
  const adjCl = r2(cl - dep - invOver);
  const adjProfit = profitFromCapital({ closing: adjCl, opening: 27160, drawings: 9640, introduced: 0 });
  chk(adjProfit, 12725);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: adjProfit, calculator: true, wrong: [profitFromCapital({ closing: cl, opening: 27160, drawings: 9640 }), profitFromCapital({ closing: r2(cl - dep), opening: 27160, drawings: 9640 })],
    stem: `The closing statement of affairs of Tafara's workshop showed capital of ${money(cl)}. It was then found that depreciation of ${money(dep)} on the equipment had not been deducted and that inventory had been overvalued by ${money(invOver)}. Capital at the start of the year was ${money(27160)} and drawings were ${money(9640)}. No capital was introduced. Calculate the corrected profit for the year.`,
    hints: ["Correct the closing capital first."],
    explanation: "Corrected closing capital = 31,870 - 1,240 - 385 = 30,245. Profit = 30,245 - 27,160 + 9,640 = 12,725. Using the uncorrected capital gives 14,350; correcting only the depreciation gives 13,110.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between a statement of affairs and a statement of financial position.",
    points: ["A statement of financial position is prepared from a trial balance of a full double-entry system", "A statement of affairs is built from lists of assets and liabilities and valuations, and capital is the balancing figure"],
    modelAnswer: "A statement of financial position comes from a full set of books and its figures are checked by a trial balance. A statement of affairs is made from lists and estimates when records are incomplete, and the capital is simply the balance.",
    explanation: "One mark for each side of the contrast.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain three limitations of calculating profit from the change in capital.",
    points: ["It gives one profit figure and does not show sales, cost of sales or expenses", "Errors in the lists or valuations are not detected and pass into the profit", "Opening capital and drawings may be estimated from memory, so the result may be unreliable"],
    modelAnswer: "It shows only a single profit, so the owner cannot see sales or costs. Mistakes in valuing assets are not discovered because there is no trial balance. Drawings and opening capital may be estimates, so the profit is not precise.",
    hints: ["Think of detail, errors and estimates."],
    explanation: "One mark for each limitation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A bank asks Farai, who keeps no books, to submit statements before it will lend. Evaluate the usefulness of a profit figure found from two statements of affairs, and advise him.",
    points: ["It gives a quick estimate of the profit and the capital, which shows the bank the size of the business", "It cannot show sales, costs or margins, so the bank cannot judge how profit is earned or whether it is sustainable", "Errors and estimated valuations make the figure less reliable than audited accounts", "Advice: start double-entry records, or have the accounts prepared by an accountant, to give the bank a full set of statements"],
    modelAnswer: "The figure gives the bank an estimate of profit and shows capital, which is useful. But it hides sales and costs, relies on estimated valuations and cannot be checked, so the bank may still refuse. Farai should keep full records or ask an accountant to prepare statements.",
    hints: ["What would the bank want to see?"],
    explanation: "One mark for a benefit, one for each of two weaknesses, one for the advice.",
  });

  // Structured 1: ten marks
  const aO = affairs({ biz: "Chipo Ncube", when: "at 1 January 2025", assets: [{ h: "Assets", items: [["Equipment", 6215], ["Inventory", 2835], ["Trade receivables", 1160], ["Bank", 2745]] }], liabilities: [{ h: "Liabilities", items: [["Trade payables", 1895], ["Electricity owing", 130]] }] });
  const aC = affairs({ biz: "Chipo Ncube", when: "at 31 December 2025", assets: [{ h: "Assets", items: [["Equipment", 5595], ["Inventory", 3460], ["Trade receivables", 1535], ["Bank", 4020], ["Cash", 285]] }], liabilities: [{ h: "Liabilities", items: [["Trade payables", 2210], ["Electricity owing", 175]] }] });
  const dr1 = 7310;
  const in1 = 900;
  const p1 = profitFromCapital({ closing: aC.capital, opening: aO.capital, drawings: dr1, introduced: in1 });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chipo Ncube runs a tailoring shop in Bulawayo and keeps no ledger. Her assets and liabilities are:\n\n` + table(["", "1 January 2025 (US\\$)", "31 December 2025 (US\\$)"], [
      ["Equipment", 6215, 5595], ["Inventory", 2835, 3460], ["Trade receivables", 1160, 1535], ["Bank", 2745, 4020], ["Cash", 0, 285], ["Trade payables", 1895, 2210], ["Electricity owing", 130, 175],
    ]) + `\n\nDuring 2025 she took ${money(dr1)} in drawings and paid ${money(in1)} of her savings into the business bank account.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: aO.capital, wrong: [aO.assets], stem: "Calculate the capital at 1 January 2025.", explanation: `Assets ${fmt(aO.assets)} - liabilities ${fmt(aO.liabilities)} = ${fmt(aO.capital)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: aC.capital, wrong: [aC.assets], stem: "Calculate the capital at 31 December 2025.", explanation: `Assets ${fmt(aC.assets)} - liabilities ${fmt(aC.liabilities)} = ${fmt(aC.capital)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: p1, wrong: [r2(p1 + 2 * in1), r2(p1 - dr1)], stem: "Calculate the profit for the year.", explanation: `${fmt(aC.capital)} - ${fmt(aO.capital)} + ${fmt(dr1)} - ${fmt(in1)} = ${fmt(p1)}. Adding the capital introduced gives ${fmt(p1 + 2 * in1)}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain two reasons why this profit may be unreliable.", points: ["Valuations of equipment, inventory and receivables are estimates, and errors go undetected", "Drawings and the opening position may be recalled from memory, not from records", "No separate figures for sales and expenses exist to check the result"], modelAnswer: "The assets are valued by estimate and there is no trial balance to find mistakes. Drawings and the opening balances may be remembered, not recorded, and sales and expenses cannot be used as a check.", explanation: "One mark for each reason, up to three." }),
    ],
    hints: ["Capital = assets - liabilities at each date.", "Deduct capital introduced; add back drawings."],
    explanation: "This item tests statements of affairs and the profit formula.",
  });
  chk(p1, profitFromCapital({ closing: aC.capital, opening: aO.capital, drawings: dr1, introduced: in1 }));

  // Structured 2: sixteen marks, with depreciation, loss and recommendation
  const bO = affairs({ biz: "Tendai Shumba", when: "at 1 July 2024", assets: [{ h: "Assets", items: [["Delivery van", 12850], ["Inventory", 4375], ["Trade receivables", 2190], ["Bank", 1065]] }], liabilities: [{ h: "Liabilities", items: [["Trade payables", 3640], ["Bank loan", 6000]] }] });
  const vanDep = 2570;
  const bC = affairs({ biz: "Tendai Shumba", when: "at 30 June 2025", assets: [{ h: "Assets", items: [["Delivery van", r2(12850 - vanDep)], ["Inventory", 3915], ["Trade receivables", 2745], ["Bank", 940]] }], liabilities: [{ h: "Liabilities", items: [["Trade payables", 3780], ["Bank loan", 5000]] }] });
  const drB = 9385;
  const pB = profitFromCapital({ closing: bC.capital, opening: bO.capital, drawings: drB });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Tendai Shumba delivers groceries in Gweru with one van and has no ledger. His financial year ends on 30 June.\n\n${bO.md}\n\nAt 30 June 2025 the van was valued at its cost less ${money(vanDep)} depreciation for the year. The other balances at 30 June 2025 were: inventory ${money(3915)}, trade receivables ${money(2745)}, bank ${money(940)}, trade payables ${money(3780)} and bank loan ${money(5000)}. Tendai's drawings for the year were ${money(drB)}.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: bC.capital, wrong: [bC.assets, r2(bC.capital + vanDep)], stem: "Calculate the capital at 30 June 2025.", explanation: `Van ${fmt(12850 - vanDep)} + inventory 3,915 + receivables 2,745 + bank 940 = ${fmt(bC.assets)}; liabilities ${fmt(bC.liabilities)}; capital ${fmt(bC.capital)}.` }),
      P.num({ label: "(b)", marks: 4, kind: "money", value: pB, wrong: [r2(bC.capital - bO.capital), r2(pB - 2 * drB)], stem: "Calculate the profit or loss for the year. Enter a loss as a negative number.", explanation: `Opening capital ${fmt(bO.capital)}. Profit = ${fmt(bC.capital)} - ${fmt(bO.capital)} + ${fmt(drB)} = ${fmt(pB)}.` }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of affairs at 30 June 2025.", points: ["Heading with business name, statement and date", `Assets listed with the van at ${fmt(12850 - vanDep)} and total assets ${fmt(bC.assets)}`, "Liabilities listed (trade payables and bank loan) with a total", `Capital as the balancing figure ${fmt(bC.capital)}`, "Layout with sub-totals for non-current and current items"], modelAnswer: bC.md, explanation: "Award one mark per point; allow follow-through." }),
      P.manual({ label: "(d)", marks: 4, stem: `Tendai says: "The business is healthy: profit was ${fmt(pB)} and I am safe to take more drawings." Evaluate his statement and advise him.`, points: [`Profit of ${fmt(pB)} is an estimate; it covers drawings of ${fmt(drB)} with only ${fmt(r2(pB - drB))} left, so capital has risen only slightly (or fallen)`, "Bank is only 940 and a loan of 5,000 is still owed, so cash for extra drawings is limited", "The estimate depends on the valuation of the van and inventory and may be unreliable", "Advice: keep drawings at or below profit, keep records and build up cash before taking more"], modelAnswer: `The profit is an estimate and after drawings of US\\$${fmt(drB)} little is left. Cash is only US\\$940 with a loan outstanding, so more drawings are risky. He should keep drawings below profit and start keeping full records.`, explanation: "One mark for each reasoned point, supported by figures." }),
    ],
    hints: ["Work out the opening capital from the statement given.", "Drawings are added back."],
    explanation: "This item tests two statements of affairs, the profit calculation, preparation and evaluation.",
  });

  b.card("DEFINITION", "What is a **statement of affairs**?", "A list of the assets and liabilities of a business at a date; the difference is the owner's capital.");
  b.card("FORMULA", "Profit from the accounting equation", "Closing capital - opening capital + drawings - capital introduced.");
  b.card("FORMULA", "Accounting equation", "Assets = capital + liabilities, so capital = assets - liabilities.");
  b.card("FACT", "Why add back drawings?", "Drawings reduced closing capital but are not an expense, so they are added back to find the profit that was earned.");
  b.card("FACT", "Why deduct capital introduced?", "New money from the owner raises capital but is not earned profit.");
  b.card("FACT", "Effect of overvalued closing inventory on estimated profit", "Closing capital and profit are overstated by the same amount.");
  b.card("CONCEPT", "Limitations of the statement of affairs method", "One profit figure only, no detail of sales and costs, errors undetected, reliance on estimates and memory.");
  b.card("FACT", "A negative result in the capital formula", "It means a loss for the year.");
  b.card("CONCEPT", "Is the capital in a statement of affairs ever negative?", "Yes, if liabilities exceed assets: the business owes more than it owns.");
});
