// W1a: concepts.reporting
import { concept, P, table, check, sum, r2, fmt, money, inventory, depreciation } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.concepts.reporting", { file: "concepts/reporting", keyPrefix: "concepts.reporting" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does the prudence concept require?",
    ok: ["That profit and assets are not overstated and expenses and liabilities are not understated", "Correct: be cautious, but not deliberately pessimistic."],
    bad: [["That all assets are valued at current market value", "That is not prudence."], ["That revenue is recorded when cash is received", "That ignores realisation."], ["That the same methods are used every year", "That is consistency."]],
    explanation: "Prudence is caution in the face of uncertainty: expected losses are recognised, but profits only when realised.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Under the realisation concept, when is revenue from a credit sale recognised?",
    ok: ["When the goods are delivered and the right to payment arises", "Correct: the sale is made, whether or not cash is received."],
    bad: [["When the customer pays", "That would delay revenue until cash is received."], ["When the order is first discussed", "No sale has yet been made."], ["At the end of the financial year, whatever the date of the sale", "Revenue belongs to the period of sale."]],
    explanation: "Revenue is recognised when earned, usually on delivery.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Valuing inventory at the lower of cost and net realisable value applies which concept?",
    ok: ["Prudence", "Correct: expected losses are recognised, but unrealised profits are not."],
    bad: [["Consistency", "Consistency concerns using the same method each year."], ["Materiality", "Materiality concerns the importance of an item."], ["Going concern", "Going concern assumes the business continues."]],
    explanation: "Prudence requires a write-down when NRV is below cost.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Spreading the cost of a machine over the years in which it will be used applies which concept?",
    ok: ["Matching", "Correct: the cost is matched with the revenue it helps to earn."],
    bad: [["Realisation", "Realisation concerns when revenue is earned."], ["Duality", "Duality concerns the two aspects of a transaction."], ["Objectivity", "Objectivity concerns evidence."]],
    explanation: "Depreciation matches the cost of the asset with the periods that benefit.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "On 29 December 2025 a customer pays a deposit for goods that will be delivered in February 2026. How should the deposit be treated at 31 December 2025?",
    ok: ["As a liability, not as revenue", "Correct: the goods have not yet been delivered."],
    bad: [["As revenue of 2025", "Revenue is earned on delivery, which is in 2026."], ["As a reduction in expenses", "A deposit is not an expense reduction."], ["As an increase in capital", "Customers' deposits are not owners' capital."]],
    hints: ["Has the business yet supplied the goods?"],
    explanation: "Under realisation, revenue is not earned until delivery; the deposit is owed to the customer.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A business uses straight line depreciation in 2024 and reducing balance in 2025 with no explanation. Which concept is breached?",
    ok: ["Consistency", "Correct: the method has been changed without reason."],
    bad: [["Business entity", "The business and owner remain separate."], ["Money measurement", "The assets are measured in money."], ["Duality", "Both entries are still made."]],
    hints: ["Think about the same method from year to year."],
    explanation: "Consistency requires the same methods each period unless a change is justified and disclosed.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which item could the business treat as an immediate expense, under materiality, even though it will last a few years?",
    ok: ["A stapler costing a few dollars", "Correct: the amount is too small to affect any user's decisions."],
    bad: [["A delivery lorry", "A lorry is material and must be capitalised."], ["A new factory building", "This is highly material."], ["A computer system costing a large part of profit", "This is also material."]],
    hints: ["Would the amount influence a user's decision?"],
    explanation: "Immaterial items are treated simply, as expenses.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company's directors conclude that it will close in three months. Which change to the financial statements is **most** appropriate?",
    ok: ["Assets are valued at break-up values and liabilities may fall due immediately", "Correct: the going concern basis no longer applies."],
    bad: [["Assets continue at cost less depreciation", "That assumes the business continues."], ["Depreciation is increased to match the lives of the assets", "The issue is the valuation basis, not the rate."], ["No change is needed because statements are historic", "Directors must assess going concern."]],
    hints: ["What happens to assets if the business does not continue?"],
    explanation: "If going concern fails, assets are valued on a break-up basis.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the realisation concept, revenue is recognised only when cash is received.",
    answer: false,
    explanation: "False. Revenue is recognised when it is earned, usually on delivery, even if payment comes later.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under prudence, an expected profit on unsold goods should be recorded as soon as it appears likely.",
    answer: false,
    explanation: "False. Expected losses are recognised at once, but profits are recognised only when they are realised.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each treatment to the concept.",
    pairs: ["Allowance made for debts that may not be paid", "A December credit sale is included in the year's revenue", "Rent for next year is excluded from this year's expenses", "The same depreciation method is used every year", "A finance lease is shown as an asset and a liability", "A small stationery purchase is charged to expenses"],
    right: ["Prudence", "Realisation", "Matching", "Consistency", "Substance over form", "Materiality"],
    rightIndex: [0, 1, 2, 3, 4, 5],
    explanation: "Each treatment follows from the concept named.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the rule for valuing inventory.",
    template: "Inventory is valued at the lower of {{blank:a}} and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cost"], choices: ["cost", "selling price", "net realisable value"] },
      { id: "b", accepted: ["net realisable value"], choices: ["cost", "selling price", "net realisable value"] },
    ],
    explanation: "The comparison is between cost and net realisable value.",
  });

  const nrv = inventory.lowerOfCostAndNrv(Infinity, 740, 55);
  check("nrv", nrv, 685);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: nrv, daily: true, calculator: true, wrong: [740, r2(740 + 55)],
    stem: "A shop expects to sell damaged goods for US\\$740, after spending US\\$55 on repairs and selling costs. Calculate the net realisable value.",
    explanation: "NRV = selling price - costs to complete and sell = 740 - 55 = 685.",
  });
  const lines = [[1200, 1500, 0], [900, 640, 0], [2100, 2350, 0]];
  const inv = sum(lines.map(([c, s, k]) => inventory.lowerOfCostAndNrv(c, s, k)));
  check("inv", inv, 3940);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: inv, calculator: true, wrong: [sum(lines.map((l) => l[0])), sum(lines.map((l) => l[1]))],
    stem: "A trader's inventory at the year end consists of three lines. Costs and net realisable values (NRV) are: line 1 cost US\\$1,200, NRV US\\$1,500; line 2 cost US\\$900, NRV US\\$640; line 3 cost US\\$2,100, NRV US\\$2,350. Calculate the value of inventory for the statement of financial position.",
    hints: ["Compare each line separately, then add."],
    explanation: "Line 1: 1,200 (cost is lower). Line 2: 640 (NRV is lower). Line 3: 2,100 (cost is lower). Total 3,940. Using total cost gives 4,200.",
  });
  const dep = depreciation.straightLine(16500, 1500, 5);
  check("dep", dep, 3000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: dep, calculator: true, wrong: [r2(16500 / 5), 16500],
    stem: "A machine costing US\\$16,500 has an expected residual value of US\\$1,500 and a useful life of 5 years. Using straight line depreciation, calculate the annual charge that matches the cost to the years of use.",
    hints: ["Depreciable amount = cost - residual value."],
    explanation: "(16,500 - 1,500) ÷ 5 = 3,000 a year. Ignoring the residual value gives 3,300.",
  });
  const cp = r2(21800 - 4500);
  check("cp", cp, 17300);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: cp, calculator: true, wrong: [21800, r2(21800 + 4500)],
    stem: "Draft profit for the year ended 31 December 2025 was US\\$21,800. This included a deposit of US\\$4,500, received on 20 December, as revenue for goods that will not be delivered until February 2026. Ignoring any cost of the goods, calculate the corrected profit.",
    hints: ["Revenue is recognised when the goods are delivered."],
    explanation: "The deposit is not revenue until delivery. Removing it gives 21,800 - 4,500 = 17,300.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the concept that requires the same accounting methods to be used from year to year.",
    accepted: ["consistency", "the consistency concept", "consistency concept"],
    explanation: "Consistency.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how the prudence concept applies to the valuation of inventory.",
    points: ["Inventory is valued at the lower of cost and net realisable value", "A loss is recognised when NRV is below cost, but a profit above cost is not recognised until sale"],
    modelAnswer: "Inventory is valued at the lower of cost and net realisable value. If NRV is below cost the loss is recognised now, but if NRV is above cost the profit is not recorded until the goods are sold.",
    explanation: "Losses early, profits only when realised.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between the realisation concept and the matching concept.",
    points: ["Realisation determines when revenue is recognised (when earned, not when paid)", "Matching determines in which period an expense is charged (the period it helps to earn revenue)", "Together they give the profit for the right period"],
    modelAnswer: "Realisation decides when revenue is recognised: when it is earned, not when cash is received. Matching decides in which period expenses are charged: the period in which they help to earn the revenue. Together they give the profit of the correct period.",
    hints: ["One concerns revenue, the other expenses."],
    explanation: "Revenue timing against expense timing.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A company decides to charge to expenses every purchase costing under US\\$300, even if it will last for many years. Evaluate this policy using the materiality concept.",
    points: ["It saves the time and cost of recording and depreciating small items", "It is acceptable if the total effect on profit and assets is too small to affect users' decisions", "But if many such items are bought, the total may be material, so the limit must be reviewed and applied consistently"],
    modelAnswer: "The policy saves effort and is acceptable if the total effect on profit and assets is too small to change a user's decisions. If many such items are bought the total may be material, so the limit must be reviewed and applied consistently.",
    hints: ["Think of the total effect, not one item."],
    explanation: "A balanced judgement on materiality and consistency.",
  });

  // Structured 1: 10 marks
  const lns = [["P", 2400, 3100, 180], ["Q", 1650, 1500, 100], ["R", 980, 1350, 70]];
  const vals = lns.map(([n, c, s, k]) => inventory.lowerOfCostAndNrv(c, s, k));
  const totV = sum(vals);
  const totC = sum(lns.map((l) => l[1]));
  check("totV", totV, 4780);
  check("totC", totC, 5030);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Gokwe Hardware has three lines of inventory at 31 December 2025:\n\n" + table(["Line", "Cost US\\$", "Expected selling price US\\$", "Costs to sell US\\$"], lns.map((l) => [l[0], l[1], l[2], l[3]])),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r2(1500 - 100), wrong: [1500], stem: "Calculate the net realisable value of line Q.", explanation: "1,500 - 100 = 1,400." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: totV, wrong: [totC], stem: "Calculate the value of inventory at the lower of cost and net realisable value.", explanation: "P 2,400 (cost lower); Q 1,400 (NRV lower); R 980 (cost lower). Total 4,780." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(totC - totV), wrong: [totV], stem: "Calculate the reduction in profit caused by valuing inventory at the lower of cost and NRV instead of cost.", explanation: "5,030 - 4,780 = 250." }),
      P.manual({ label: "(d)", marks: 3, stem: "Name the concept applied and explain why lines P and R are not valued at their higher NRV.", points: ["Prudence", "Profits must not be recognised before they are realised", "The expected profit on P and R will be recorded when the goods are sold"], modelAnswer: "The concept is prudence. The extra profit expected on lines P and R is not recorded until the goods are sold, because unrealised profit must not be anticipated.", explanation: "Name, then explain the treatment of unrealised profit." }),
    ],
    hints: ["Compare cost and NRV line by line."],
    explanation: "This item tests prudence and the valuation of inventory.",
  });

  // Structured 2: 14 marks
  const draft = 45000;
  const depr = depreciation.straightLine(21000, 3000, 6);
  check("depr", depr, 3000);
  const fixed = r2(draft - 1200 - 3600 - depr + 800);
  check("fixed", fixed, 38000);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `The draft profit for the year ended 31 December 2025 of Chipo's Furniture, Mutare, was ${money(draft)}. These items had not been correctly treated:\n\n1. Closing inventory included a line costing ${money(4200)} with an NRV of ${money(3000)}.\n2. A deposit of ${money(3600)} received in December for goods to be delivered in January 2026 was included in revenue.\n3. A machine bought on 1 January 2025 for ${money(21000)}, with a residual value of ${money(3000)} and a life of 6 years, was not depreciated.\n4. A subscription of ${money(800)} paid in 2025 for 2026 was charged as an expense of 2025.`,
    parts: [
      P.match({ label: "(a)", stem: "Match each item to the concept.", pairs: ["Item 1", "Item 2", "Item 3", "Item 4"], right: ["Prudence", "Realisation", "Matching: depreciation", "Matching: prepayment"], rightIndex: [0, 1, 2, 3], explanation: "Item 1 is prudence; item 2 realisation; item 3 matching (depreciation) and item 4 matching (prepayment)." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: depr, wrong: [r2(21000 / 6)], stem: "Calculate the annual depreciation of the machine (straight line).", explanation: "(21,000 - 3,000) ÷ 6 = 3,000." }),
      P.num({ label: "(c)", marks: 4, kind: "money", value: fixed, wrong: [r2(draft + 1200 + 3600 + depr - 800), r2(draft - 3600 - depr + 800)], stem: "Calculate the corrected profit for the year.", explanation: "Inventory write-down 4,200 - 3,000 = 1,200. Corrected profit: 45,000 - 1,200 - 3,600 - 3,000 + 800 = 38,000." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: r2(draft - fixed), wrong: [r2(1200 + 3600)], stem: "Calculate the total amount by which the draft profit was overstated.", explanation: "45,000 - 38,000 = 7,000." }),
      P.manual({ label: "(e)", marks: 2, stem: "The owner objects that the corrected profit is far lower and says 'the accountant is being too prudent'. Evaluate this view.", points: ["Most of the reduction is correction of errors (revenue not yet earned, depreciation omitted), not excessive prudence", "Only the inventory write-down of 1,200 is an application of prudence, and it follows the rule of lower of cost and NRV"], modelAnswer: "The view is mostly wrong. Most of the reduction comes from correcting errors: revenue not yet earned and missing depreciation. Only the inventory write-down of 1,200 applies prudence, and it follows the rule of lower of cost and NRV.", explanation: "Distinguish error correction from prudence." }),
    ],
    hints: ["Apply each concept to one item at a time.", "A prepayment increases profit because the expense is reduced."],
    explanation: "This item tests the effect of the reporting concepts on profit.",
  });

  b.card("DEFINITION", "What is **prudence**?", "Do not overstate profit or assets; recognise expected losses, but profits only when realised.");
  b.card("DEFINITION", "What is the **realisation** concept?", "Revenue is recognised when earned (goods delivered), not when cash is received.");
  b.card("DEFINITION", "What is the **matching** concept?", "Expenses are charged in the period in which they help to earn revenue.");
  b.card("DEFINITION", "What is **materiality**?", "An item is material if omitting or misstating it could change users' decisions.");
  b.card("DEFINITION", "What is **consistency**?", "The same accounting methods are used each period unless a change is justified and disclosed.");
  b.card("DEFINITION", "What is **going concern**?", "The assumption that the business will continue for the foreseeable future.");
  b.card("DEFINITION", "What is **substance over form**?", "Record the economic reality of a transaction, not just its legal form (for example a finance lease).");
  b.card("FORMULA", "Net realisable value", "Estimated selling price less costs still to be incurred to complete and sell.");
  b.card("FACT", "Inventory valuation rule", "Lower of cost and net realisable value, item by item.");
});
