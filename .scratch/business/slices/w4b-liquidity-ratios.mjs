// W4b: liquidity ratios (CAM 5.5.2): current ratio and acid test as x : 1.
import { concept, P, money, fmt, round, table, f } from "../lib.mjs";

concept("bus.finance.liquidity-ratios", { file: "finance/liquidity-ratios", keyPrefix: "finance.liquidity-ratios" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **liquidity**?",
    options: [
      ["The ability to pay short-term debts when they are due", "Correct: liquidity is about meeting current liabilities."],
      ["The amount of profit a business makes in a year", "That is profitability, not liquidity."],
      ["The value of all the assets a business owns", "Total assets do not show whether debts can be paid on time."],
      ["The amount the owners have invested in the business", "That is equity."],
    ],
    answer: "A",
    explanation: "Liquidity measures whether a business has enough liquid assets to pay its current liabilities.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which formula gives the acid test ratio?",
    options: [
      ["(Current assets − inventory) ÷ current liabilities", "Correct: inventory is left out."],
      ["Current assets ÷ current liabilities", "That is the current ratio."],
      ["Current liabilities ÷ (current assets − inventory)", "The figures are the wrong way round."],
      ["(Current assets − current liabilities) ÷ inventory", "This is not a liquidity ratio."],
    ],
    answer: "A",
    explanation: "Acid test = (current assets − inventory) ÷ current liabilities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is inventory left out of the acid test ratio?",
    options: [
      ["It is the hardest current asset to turn into cash quickly", "Correct: stock must be sold, and often paid for later, before it becomes cash."],
      ["It is a non-current asset kept for many years", "Inventory is a current asset."],
      ["It is already counted as a current liability", "Inventory is an asset, not a liability."],
      ["Businesses never sell their inventory for cash", "Inventory is sold, but it takes time to become cash."],
    ],
    answer: "A",
    explanation: "The acid test checks whether debts can be paid without relying on selling stock.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A shop has current assets of US\\$27,000 and current liabilities of US\\$18,000. What is its current ratio?",
    options: [
      ["1.50 : 1", "Correct: 27,000 ÷ 18,000."],
      ["0.67 : 1", "This divides current liabilities by current assets."],
      ["0.50 : 1", "This divides working capital (9,000) by current liabilities."],
      ["3.00 : 1", "This divides current assets by working capital (9,000)."],
    ],
    answer: "A",
    explanation: "Current ratio = 27,000 ÷ 18,000 = 1.50 : 1.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A business has a current ratio of 2.40 : 1 but an acid test ratio of 0.55 : 1. What does this show?",
    options: [
      ["Most of its current assets are inventory", "Correct: removing inventory makes the ratio fall sharply."],
      ["It has more cash than it can possibly use", "A low acid test shows little cash or receivables."],
      ["Its current liabilities are larger than its total assets", "The current ratio shows current assets exceed current liabilities."],
      ["It is making a loss on most of its sales", "Liquidity ratios do not measure profit."],
    ],
    answer: "A",
    explanation: "The big gap between the two ratios is caused by inventory; the business relies on selling stock to pay its debts.",
    hints: ["What is the only difference between the two formulas?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which action would improve a business's acid test ratio?",
    options: [
      ["Selling surplus inventory for cash", "Correct: cash rises and inventory falls, so liquid assets rise."],
      ["Buying more inventory on credit", "Current liabilities rise but liquid assets do not."],
      ["Using cash to buy new machinery", "Cash falls and machinery is not a current asset."],
      ["Increasing the bank overdraft to pay wages", "Current liabilities rise."],
    ],
    answer: "A",
    explanation: "Turning inventory into cash raises (current assets − inventory) while current liabilities stay the same.",
    hints: ["Which items are on the top of the acid test fraction?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A company's current ratio is 4.5 : 1. Why might its managers be concerned?",
    options: [
      ["Too much money may be tied up in stock or idle cash", "Correct: resources could earn more if used elsewhere."],
      ["The company will be unable to pay its suppliers", "A high ratio means it can easily pay current liabilities."],
      ["The company must be making a large loss", "The current ratio does not show profit or loss."],
      ["Banks will refuse to keep the company's money", "Banks do not refuse deposits for this reason."],
    ],
    answer: "A",
    explanation: "A very high current ratio is safe but may mean inefficient use of resources: excess inventory or cash earning little.",
    hints: ["Can a ratio be too high?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who would be **most** interested in a business's liquidity ratios before agreeing to deliver goods on credit?",
    options: [
      ["A supplier", "Correct: a supplier wants to know if it will be paid on time."],
      ["A customer buying one item for cash", "A cash customer takes no credit risk."],
      ["A competitor in another country", "A foreign competitor has little interest in its liquidity."],
      ["A tourist visiting the shop", "Tourists have no reason to study its accounts."],
    ],
    answer: "A",
    explanation: "Suppliers giving credit check liquidity to judge the risk of not being paid.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Liquidity ratios are written in the form x : 1.",
    answer: true,
    explanation: "True. For example a current ratio of 1.80 : 1.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business with a high profit margin must also have a high current ratio.",
    answer: false,
    explanation: "False. Profitability and liquidity are different: a profitable business can still be short of liquid assets.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each result with what it suggests.",
    pairs: [
      ["Current ratio 0.8 : 1", "Current liabilities exceed current assets: serious risk"],
      ["Current ratio 1.8 : 1", "Usually a comfortable level of liquidity"],
      ["Current ratio 5 : 1", "Safe, but resources may be lying idle"],
      ["Acid test 0.4 : 1", "Relies heavily on selling inventory to pay debts"],
    ],
    explanation: "Ratios are judged against guides and against similar businesses.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "The current ratio is current assets divided by current {{blank:a}}. The acid test ratio leaves out {{blank:b}} because it is the least liquid current asset.",
    blanks: [
      { id: "a", accepted: ["liabilities"], choices: ["liabilities", "assets", "profit", "revenue"] },
      { id: "b", accepted: ["inventory"], choices: ["inventory", "cash", "trade receivables", "trade payables"] },
    ],
    explanation: "Both ratios divide by current liabilities; the acid test removes inventory.",
  });
  const ca1 = 31500, cl1 = 14000;
  b.num({
    d: 2, skill: "APPLICATION", kind: "ratio", value: f.current(ca1, cl1), daily: true,
    stem: `A garage has current assets of ${money(ca1)} and current liabilities of ${money(cl1)}. Calculate its current ratio as x : 1 to two decimal places (enter x).`,
    wrong: [round(cl1 / ca1, 2)],
    explanation: `${fmt(ca1)} ÷ ${fmt(cl1)} = ${round(f.current(ca1, cl1), 2).toFixed(2)} : 1.`,
  });
  const inv2 = 13200, rec2 = 5400, cash2 = 2700, cl2 = 15000;
  const ca2 = inv2 + rec2 + cash2;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "ratio", value: f.acidTest(ca2, inv2, cl2), calculator: true,
    stem: `A furniture shop has inventory of ${money(inv2)}, trade receivables of ${money(rec2)} and cash of ${money(cash2)}. Its current liabilities are ${money(cl2)}. Calculate its acid test ratio as x : 1 to two decimal places (enter x).`,
    wrong: [round(f.current(ca2, cl2), 2), round(inv2 / cl2, 2)],
    explanation: `Liquid assets = ${fmt(rec2)} + ${fmt(cash2)} = ${fmt(ca2 - inv2)}; ${fmt(ca2 - inv2)} ÷ ${fmt(cl2)} = ${round(f.acidTest(ca2, inv2, cl2), 2).toFixed(2)} : 1.`,
    workedSolution: `1. Current assets = ${fmt(inv2)} + ${fmt(rec2)} + ${fmt(cash2)} = ${fmt(ca2)}.\n2. Current assets − inventory = ${fmt(ca2)} − ${fmt(inv2)} = ${fmt(ca2 - inv2)}.\n3. Acid test = ${fmt(ca2 - inv2)} ÷ ${fmt(cl2)} = ${round(f.acidTest(ca2, inv2, cl2), 2).toFixed(2)} : 1.`,
    hints: ["Leave out the inventory.", "Divide by current liabilities."],
  });
  const cr3 = 1.6, cl3 = 22500;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: Math.round(cr3 * cl3),
    stem: `A business has a current ratio of ${cr3.toFixed(2)} : 1 and current liabilities of ${money(cl3)}. Calculate its current assets.`,
    wrong: [cl3 / cr3],
    explanation: `Current assets = ${cr3} × ${fmt(cl3)} = ${money(Math.round(cr3 * cl3))}.`,
    workedSolution: `1. Current ratio = current assets ÷ current liabilities, so current assets = ratio × current liabilities.\n2. = ${cr3} × ${fmt(cl3)} = ${money(Math.round(cr3 * cl3))}.`,
    hints: ["Rearrange the current ratio formula."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** ways a business could improve its liquidity.",
    points: [
      "Way 1, e.g. sell surplus inventory / clearance sale (1)",
      "Explained: stock becomes cash, raising liquid assets; drawback lower profit (1)",
      "Way 2, e.g. collect receivables faster / sell unused assets / replace overdraft with long-term loan (1)",
      "Explained: more cash or fewer current liabilities; drawback e.g. customers lost / interest (1)",
    ],
    modelAnswer: "The business could hold a clearance sale of slow-selling stock, turning inventory into cash so it can pay its debts, although lower prices reduce profit. It could also replace its overdraft with a long-term loan, which reduces current liabilities and raises both ratios, although interest must still be paid.",
    explanation: "Raise liquid assets or reduce current liabilities.",
    hints: ["Think about the top and the bottom of the ratio."],
  });
  // Structured 1.
  const Y = { inv: 18500, rec: 9400, cash: 2600, cl: 25500 }, Y0 = { inv: 12400, rec: 8300, cash: 7600, cl: 17600 };
  const caY = Y.inv + Y.rec + Y.cash, caY0 = Y0.inv + Y0.rec + Y0.cash;
  const tbl = table(["US\\$", "Last year", "This year"], [["Inventory", Y0.inv, Y.inv], ["Trade receivables", Y0.rec, Y.rec], ["Cash", Y0.cash, Y.cash], ["Current liabilities", Y0.cl, Y.cl]]);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Chipo Electricals Ltd sells televisions and fridges in Kwekwe. A large supplier is deciding whether to give the company 60 days' credit.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "ratio", value: f.current(caY, Y.cl), stem: "Calculate this year's current ratio as x : 1 to two decimal places (enter x).", wrong: [round(f.acidTest(caY, Y.inv, Y.cl), 2)], explanation: `${fmt(caY)} ÷ ${fmt(Y.cl)} = ${round(f.current(caY, Y.cl), 2).toFixed(2)} : 1.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "ratio", value: f.acidTest(caY, Y.inv, Y.cl), stem: "Calculate this year's acid test ratio as x : 1 to two decimal places (enter x).", wrong: [round(f.current(caY, Y.cl), 2)], explanation: `(${fmt(caY)} − ${fmt(Y.inv)}) ÷ ${fmt(Y.cl)} = ${round(f.acidTest(caY, Y.inv, Y.cl), 2).toFixed(2)} : 1.` }),
      P.manual({ label: "(c)", marks: 3, stem: `Last year the ratios were ${round(f.current(caY0, Y0.cl), 2).toFixed(2)} : 1 and ${round(f.acidTest(caY0, Y0.inv, Y0.cl), 2).toFixed(2)} : 1. Explain what has happened to the company's liquidity.`, points: ["Both ratios have fallen: liquidity has worsened (1)", "Acid test now well below 1 : 1: cannot pay debts without selling stock (1)", "Causes from the data: inventory up, cash down, current liabilities up (1)"] }),
      P.manual({ label: "(d)", marks: 5, stem: "Should the supplier give Chipo Electricals Ltd 60 days' credit? Justify your answer.", points: ["Current ratio still above 1 : 1 (1)", "But acid test low; depends on selling televisions and fridges (1)", "Risk of late or no payment; liquidity falling (1)", "Ways to limit risk: shorter credit, a credit limit, part payment, check profitability (1)", "Justified decision (1)"] }),
    ],
    explanation: `This year: current ratio ${round(f.current(caY, Y.cl), 2).toFixed(2)} : 1; acid test ${round(f.acidTest(caY, Y.inv, Y.cl), 2).toFixed(2)} : 1, both lower than last year.`,
    hints: ["Current assets = inventory + receivables + cash.", "Acid test leaves out inventory."],
  });
  // Structured 2.
  const ca5 = 42000, inv5 = 15000, cl5 = 20000, ovd = 8000, loan = 8000;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, calculator: true,
    stem: `Farai's printing company in Harare has current assets of ${money(ca5)}, including inventory of ${money(inv5)}. Its current liabilities are ${money(cl5)}, including a bank overdraft of ${money(ovd)}. The bank has offered a ${money(loan)} five-year loan to repay the overdraft.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "ratio", value: f.acidTest(ca5, inv5, cl5), stem: "Calculate the acid test ratio now, as x : 1 to two decimal places (enter x).", wrong: [round(f.current(ca5, cl5), 2)], explanation: `(${fmt(ca5)} − ${fmt(inv5)}) ÷ ${fmt(cl5)} = ${round(f.acidTest(ca5, inv5, cl5), 2).toFixed(2)} : 1.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "ratio", value: f.current(ca5, cl5 - ovd), stem: "Calculate the current ratio after the loan is used to repay the overdraft, as x : 1 to two decimal places (enter x).", wrong: [round(f.current(ca5, cl5), 2), round(f.current(ca5 + loan, cl5), 2)], explanation: `Current liabilities fall to ${fmt(cl5 - ovd)}; ${fmt(ca5)} ÷ ${fmt(cl5 - ovd)} = ${round(f.current(ca5, cl5 - ovd), 2).toFixed(2)} : 1.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why replacing the overdraft with a loan improves liquidity.", points: ["The overdraft is a current liability; the loan is non-current (1)", "Current liabilities fall, so both ratios rise / bank cannot recall it at short notice (1)"] }),
      P.manual({ label: "(d)", marks: 4, stem: "Discuss whether Farai should accept the loan.", points: ["Benefit: better liquidity and security of finance for five years (1)", "Cost: interest for five years, possibly on a larger sum than he uses (1)", "Liquidity is already reasonable (acid test above 1 : 1) (1)", "Justified conclusion (1)"] }),
    ],
    explanation: `Acid test ${round(f.acidTest(ca5, inv5, cl5), 2).toFixed(2)} : 1; current ratio after the change ${round(f.current(ca5, cl5 - ovd), 2).toFixed(2)} : 1.`,
    hints: ["An overdraft is a current liability; a five-year loan is not."],
  });
  b.card("DEFINITION", "Liquidity", "The ability to pay short-term debts when they are due.");
  b.card("FORMULA", "Current ratio", "Current assets ÷ current liabilities, written x : 1.");
  b.card("FORMULA", "Acid test ratio", "(Current assets − inventory) ÷ current liabilities, written x : 1.");
  b.card("CONCEPT", "Why leave out inventory", "Inventory is the least liquid current asset: it must be sold, often on credit, before it becomes cash.");
  b.card("CONCEPT", "Interpreting liquidity ratios", "Below 1 : 1 is a warning sign; about 1.5-2 : 1 current ratio is usually comfortable; very high may mean idle resources.");
  b.card("CONCEPT", "Improving liquidity", "Sell surplus stock, collect receivables faster, sell unused assets, replace overdraft with long-term finance, delay asset purchases.");
  b.card("FACT", "Quick ratio", "Another name for the acid test ratio.");
  b.card("CONCEPT", "Liquidity v profitability", "A profitable business can have poor liquidity, and a liquid business can be unprofitable.");
});
