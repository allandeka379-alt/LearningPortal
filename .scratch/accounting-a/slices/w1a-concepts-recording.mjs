// W1a: concepts.recording
import { concept, P, table, check, sum, r2, fmt, money, ratios, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.concepts.recording", { file: "concepts/recording", keyPrefix: "concepts.recording" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which concept treats the business as separate from its owner?",
    ok: ["Business entity", "Correct: the owner's private affairs are kept out of the business records."],
    bad: [["Historical cost", "This concerns the value at which assets are recorded."], ["Duality", "This concerns the two aspects of every transaction."], ["Objectivity", "This concerns evidence for the records."]],
    explanation: "The business entity concept separates the business and its owner for accounting.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Under the historical cost concept, at what value is an asset normally recorded?",
    ok: ["The price paid when it was acquired", "Correct: cost is shown by the supplier's invoice."],
    bad: [["Its present market value", "Market value changes; historical cost does not."], ["The owner's estimate of its worth", "Estimates are not objective."], ["The price at which it could be replaced", "Replacement cost is not the recorded cost."]],
    explanation: "Assets are recorded at cost on the date of purchase.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are the skills of a bakery's loyal workforce not recorded as an asset?",
    ok: ["They cannot be measured reliably in money", "Correct: this is the money measurement concept."],
    bad: [["Employees are not valuable to the business", "They are valuable, but not measurable."], ["The workforce belongs to the owner personally", "Employees work for the business."], ["Assets must always be physical", "Intangible assets can be recorded if measurable."]],
    explanation: "Money measurement limits recording to items that can be measured in money.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "Chipo takes goods costing US\\$150 from the shop for her family. Which concept requires this to be treated as drawings and not as an expense?",
    ok: ["Business entity", "Correct: her private use is not a cost of the business."],
    bad: [["Historical cost", "Historical cost concerns asset values."], ["Money measurement", "The goods can be measured; the issue is whose they are."], ["Objectivity", "The cost is known; the issue is the nature of the item."]],
    hints: ["Whose benefit is the item for?"],
    explanation: "Goods taken for private use are drawings under the business entity concept.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What is a weakness of the historical cost concept when prices are rising?",
    ok: ["Assets are shown at amounts below their current value", "Correct: old assets are carried at their original cost."],
    bad: [["Assets are shown at amounts above their current value", "That happens when prices fall."], ["Assets are not recorded at all", "They are recorded at cost."], ["Liabilities are not recorded", "The concept concerns assets."]],
    hints: ["Compare the price paid some years ago with today's price."],
    explanation: "With rising prices, cost understates the current value of assets such as land.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which document gives the most **objective** evidence of the cost of goods bought on credit?",
    ok: ["The supplier's invoice", "Correct: it is independent evidence of price and quantity."],
    bad: [["The owner's recollection of the price", "Memory is not objective."], ["The business's own estimate of the cost", "An estimate is not evidence."], ["A newspaper advertisement for similar goods", "It does not show what was actually paid."]],
    hints: ["Which document comes from outside the business?"],
    explanation: "Objectivity requires verifiable, independent evidence such as an invoice.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A business buys a computer on credit from a supplier. Which pair of aspects does the duality concept show?",
    ok: ["An asset increases and a liability increases", "Correct: both sides of the accounting equation rise equally."],
    bad: [["An asset increases and another asset decreases", "That would occur if the computer were paid for by bank."], ["A liability increases and capital decreases", "The purchase does not reduce capital."], ["An expense increases and capital increases", "The computer is an asset, not an expense."]],
    hints: ["Has any cash been paid?"],
    explanation: "Debit Computer equipment (asset up); credit the supplier (liability up).",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "An owner pays his private car insurance from the business bank account and charges it to business expenses. What is the effect?",
    ok: ["Profit is understated and drawings are understated", "Correct: the private cost is wrongly deducted in arriving at profit."],
    bad: [["Profit is overstated and drawings are overstated", "The direction is the opposite."], ["Profit is understated and drawings are overstated", "Drawings are too low, not too high."], ["Profit is unaffected because the bank is reduced either way", "The bank falls either way, but profit is affected by the expense."]],
    hints: ["Where should the item have been recorded?"],
    explanation: "The item belongs in drawings. Charging it as an expense reduces profit wrongly.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the money measurement concept, the skills of employees are recorded as an asset of the business.",
    answer: false,
    explanation: "False. Skills cannot be measured reliably in money, so they are not recorded.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under the business entity concept, a sole trader's drawings are an expense of the business.",
    answer: false,
    explanation: "False. Drawings reduce capital. They are never an expense.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation to the concept it illustrates.",
    pairs: ["The owner's personal holiday is not recorded in the business books", "A shop bought land in 2012 and still shows it at the 2012 price", "The reputation of a restaurant is not shown as an asset", "A purchase on credit increases both an asset and a liability", "Every purchase is supported by a supplier's invoice"],
    right: ["Business entity", "Historical cost", "Money measurement", "Duality", "Objectivity"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Each situation matches one recording concept.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Under the {{blank:a}} concept assets are recorded at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["historical cost"], choices: ["historical cost", "business entity", "duality"] },
      { id: "b", accepted: ["the price paid"], choices: ["the price paid", "current market value", "the owner's estimate"] },
    ],
    explanation: "The historical cost concept uses the price paid.",
  });

  const c1 = r2(31400 + 760);
  check("c1", c1, 32160);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: c1, daily: true, calculator: true, wrong: [r2(31400 - 760)],
    stem: "The draft profit of Farai's business was US\\$31,400. It was found that expenses included US\\$760 paid for the owner's private medical bills. Calculate the corrected profit.",
    explanation: "The private bills are drawings, not an expense. Profit rises by 760: 31,400 + 760 = 32,160.",
  });
  const r1 = ratios.roce(9600, 48000);
  chk(r1, 20, 0.0001);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: r1, calculator: true, wrong: [r2((48000 / 9600) * 100)],
    stem: "A business has profit from operations of US\\$9,600 and capital employed of US\\$48,000, with land at its historical cost. Calculate the return on capital employed (profit from operations ÷ capital employed) as a percentage to one decimal place.",
    hints: ["ROCE = profit ÷ capital employed × 100."],
    explanation: "9,600 ÷ 48,000 × 100 = 20.0%.",
  });
  const r2v = ratios.roce(9600, 48000 + 90000);
  b.num({
    d: 3, skill: "ANALYSIS", kind: "pct", value: r2v, calculator: true, wrong: [20, r2((9600 / (48000 + 120000)) * 100)],
    stem: "The business in the previous question owns land bought for US\\$30,000 which is now worth US\\$120,000. Recalculate the return on capital employed if the land is included at its current value instead of cost, as a percentage to one decimal place.",
    hints: ["Capital employed rises by the increase in the land's value."],
    explanation: "Capital employed becomes 48,000 + (120,000 - 30,000) = 138,000. ROCE = 9,600 ÷ 138,000 × 100 = 7.0%, compared with 20.0% at historical cost.",
  });
  const cap = r2(52000 + 14300 - sum([4800, 340, 1200]));
  check("cap", cap, 59960);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: cap, calculator: true, wrong: [r2(52000 + 14300), r2(52000 + 14300 - 4800)],
    stem: "At 1 January 2025 a sole trader's capital was US\\$52,000. The business made a profit of US\\$14,300 in the year. During the year the owner took cash of US\\$4,800, goods costing US\\$340 and paid private bills of US\\$1,200 from the business bank account. Calculate the capital at 31 December 2025.",
    hints: ["Drawings include goods and bills paid for the owner's private use."],
    explanation: "Total drawings 4,800 + 340 + 1,200 = 6,340. Closing capital = 52,000 + 14,300 - 6,340 = 59,960. Counting only the cash drawings gives 61,500.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the concept that explains why a business's good reputation is not shown as an asset.",
    accepted: ["money measurement", "the money measurement concept", "money measurement concept"],
    explanation: "A reputation cannot be measured reliably in money.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** limitations of the historical cost concept.",
    points: ["Asset values become out of date when prices change, so the statement of financial position does not show current values", "Profit and ratios such as ROCE can be distorted, and comparison between old and new assets is unfair"],
    modelAnswer: "Assets are shown at old prices, so they can be well below their current value. This can distort measures such as return on capital employed and make comparison between businesses unfair.",
    explanation: "Out-of-date values and distorted ratios.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a sole trader's private expenses must be excluded from the business's expenses.",
    points: ["They are not costs of earning the business's revenue, so including them would understate profit", "The business is treated as separate from the owner, so private items are drawings that reduce capital"],
    modelAnswer: "Private expenses are not incurred to earn revenue, so deducting them would understate profit. Under the business entity concept they are drawings that reduce capital.",
    hints: ["Think about profit and capital."],
    explanation: "Link the concept to profit and capital.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Land bought for a school's bus depot twenty years ago is shown at cost although its market value is now eight times higher. Evaluate whether the school should revalue the land in its accounts.",
    points: ["Revaluing would show a more realistic asset value and a fairer return on capital employed", "But it is less objective, as it depends on a valuer's opinion, and has to be repeated regularly", "Judgement: the benefit is greatest when the land is a large part of total assets; the school should disclose the market value if it does not revalue"],
    modelAnswer: "A revaluation would give a more realistic asset value and a fairer return on capital employed. However, it depends on a valuer's opinion, so it is less objective and must be repeated. If land is a large part of total assets, the benefit is greater, and the market value can be disclosed in any case.",
    hints: ["Weigh relevance against objectivity."],
    explanation: "A balanced judgement referring to the concepts earns the marks.",
  });

  // Structured 1: 8 marks
  const dp = 28400;
  const priv = sum([240, 520]);
  const cp = r2(dp + priv);
  check("cp", cp, 29160);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rudo's shop in Mutare showed a draft profit of ${money(dp)}. On review it was found that expenses included ${money(240)} for the telephone at Rudo's home and ${money(520)} for clothes for her children.`,
    parts: [
      P.match({ label: "(a)", stem: "Match each item to the concept.", pairs: ["The home telephone bill is not a business cost", "The shop's land is shown at its purchase price", "The delivery van purchase is supported by an invoice", "Rudo's talent for selling is not recorded as an asset"], right: ["Business entity", "Historical cost", "Objectivity", "Money measurement"], rightIndex: [0, 1, 2, 3], explanation: "Each statement is an example of the concept named." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cp, wrong: [r2(dp - priv)], stem: "Calculate the corrected profit.", explanation: "28,400 + 240 + 520 = 29,160." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: priv, wrong: [240], stem: "Calculate the amount to be debited to drawings.", explanation: "240 + 520 = 760." }),
    ],
    hints: ["Private items are drawings, not expenses."],
    explanation: "This item tests the business entity concept and its effect on profit.",
  });

  // Structured 2: 12 marks
  const landC = 40000;
  const landV = 150000;
  const other = 60000;
  const pr = 15000;
  const ra = ratios.roce(pr, landC + other);
  const rb = ratios.roce(pr, landV + other);
  chk(ra, 15, 0.0001);
  chk(rb, 7.1429, 0.001);
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Gweru Dairy bought its premises in 2008 for ${money(landC)}. They are now worth ${money(landV)}. Other net assets are ${money(other)} and profit from operations for the year was ${money(pr)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: ra, wrong: [r2((pr / landC) * 100)], stem: "Calculate the return on capital employed (profit ÷ capital employed) with the premises at historical cost, as a percentage to one decimal place.", explanation: "15,000 ÷ (40,000 + 60,000) × 100 = 15.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: rb, wrong: [ra], stem: "Calculate the return on capital employed with the premises at current value, as a percentage to one decimal place.", explanation: "15,000 ÷ (150,000 + 60,000) × 100 = 7.1%." }),
      P.mcq({ label: "(c)", marks: 2, stem: "Which concept explains why the first calculation uses the 2008 price?", options: [["Historical cost", "Correct: assets are recorded at the price paid."], ["Business entity", "This separates the owner and the business."], ["Duality", "This concerns double entry."], ["Money measurement", "The premises can be measured; the issue is which amount is used."]], answer: "A", explanation: "The premises are recorded at cost." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** other limitations of the statement of financial position that arise from the recording concepts.", points: ["Items that cannot be measured in money, such as staff skills or reputation, are not shown", "Assets are not valued at what they could be sold for, so the total is not the value of the business"], modelAnswer: "Items that cannot be measured in money, such as staff skills and reputation, are left out, and the assets are shown at cost, so the total is not the value of the business.", explanation: "Money measurement and historical cost." }),
      P.manual({ label: "(e)", marks: 4, stem: "Evaluate whether the return on capital employed calculated using historical cost is a fair measure of the dairy's performance.", points: ["At cost the return is 15.0%, which looks high, but the premises are shown at a value from 2008", "At current value it is 7.1%, nearer to what the owner could earn by selling the premises and investing elsewhere", "Historical cost is objective and consistent, so it allows comparison with earlier years and is supported by evidence", "Conclusion: the figure at cost overstates the return in real terms; users should consider both and the age of the assets"], modelAnswer: "At historical cost the return is 15.0%, but the premises are shown at their 2008 price. At current value the return is only 7.1%, which is nearer to the owner's alternative. Historical cost is objective and consistent over time, but it flatters performance. Users should consider both figures.", explanation: "Use both ratios and reach a conclusion." }),
    ],
    hints: ["Capital employed changes only through the value of the premises."],
    explanation: "This item tests the effect of historical cost on a ratio.",
  });

  b.card("DEFINITION", "What is the **business entity** concept?", "The business is separate from its owner; private items are drawings, not expenses.");
  b.card("DEFINITION", "What is the **historical cost** concept?", "Assets are recorded at the price paid when acquired.");
  b.card("DEFINITION", "What is the **money measurement** concept?", "Only items measurable in money are recorded; skills and reputation are not.");
  b.card("DEFINITION", "What is the **duality** concept?", "Every transaction has two equal aspects: a debit and a credit.");
  b.card("DEFINITION", "What is the **objectivity** concept?", "Records should be based on verifiable evidence such as invoices and receipts.");
  b.card("FACT", "Weakness of historical cost", "With rising prices, assets are shown below current value and ratios such as ROCE look high.");
  b.card("CONCEPT", "Owner's private spending", "Drawings: reduces capital; never an expense in the statement of profit or loss.");
  b.card("FACT", "Is internally generated goodwill recorded?", "No: it cannot be measured objectively. Only purchased goodwill is recorded.");
  b.card("CONCEPT", "Is the statement of financial position a valuation?", "No: it shows assets at cost and omits unmeasurable resources.");
});
