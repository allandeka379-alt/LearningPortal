// W3b: ratios.liquidity
import { concept, P, table, chk, r2, ratios } from "../lib.mjs";
import { coYear, R, mc, F, usd } from "../tables/w3b-lib.mjs";

const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);
const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);

concept("aacc.ratios.liquidity", { file: "ratios/liquidity", keyPrefix: "ratios.liquidity" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is the current ratio calculated?",
    ok: ["Current assets divided by current liabilities", "Correct: the answer is written as x : 1."],
    bad: [["Current liabilities divided by current assets", "The ratio is upside down."], ["Current assets less inventory, divided by current liabilities", "That is the acid test ratio."], ["Current assets less current liabilities, divided by revenue", "That mixes working capital with revenue."]],
    explanation: "Current ratio = current assets : current liabilities. Inventory is removed only in the acid test.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is inventory excluded from the acid test ratio?",
    ok: ["It must be sold and then collected before it becomes cash", "Correct: it is the least liquid of the current assets."],
    bad: [["It is not owned by the business until it has been sold to a customer", "Inventory is an asset of the business."], ["It is already included in the non-current assets of the business", "Inventory is a current asset."], ["Its value is always overstated at the year end by the directors", "Valuation errors are not the reason; liquidity is."]],
    explanation: "Inventory takes time to sell and may be sold on credit, so the acid test gives a stricter test of the ability to pay.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pattern is the best sign that a company is overtrading?",
    ok: ["Revenue rising fast, with inventory and receivables rising and cash falling", "Correct: growth is being financed by creditors and the bank."],
    bad: [["Revenue falling, with cash rising and trade payables being reduced", "That is the opposite of fast growth."], ["Revenue steady, with nearly all the current assets held as cash", "That is the pattern of a cautious business with idle cash."], ["Profit rising, with new non-current assets paid for out of retained profits", "That is not a liquidity problem."]],
    hints: ["Overtrading means growing faster than the business can finance."],
    explanation: "Overtrading shows rapid growth, more working capital tied up in inventory and receivables, falling cash and more reliance on suppliers.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company has a current ratio of 2 : 1. It pays some of its trade payables from the bank. What happens to the current ratio?",
    ok: ["It rises", "Correct: both totals fall by the same amount, and the ratio is above 1."],
    bad: [["It falls", "A fall would happen only if the ratio started below 1."], ["It stays at 2 : 1", "Equal falls in two unequal totals change the ratio."], ["It cannot be found without the amount paid", "The direction is known when the ratio is above 1."]],
    hints: ["Try 200 and 100, then take off 50 from each."],
    explanation: "For example 200 ÷ 100 = 2 becomes 150 ÷ 50 = 3. When the ratio is above 1, subtracting the same amount from each total raises it.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A business sells inventory at cost for cash. What is the effect on the current ratio and the acid test ratio?",
    ok: ["The current ratio is unchanged and the acid test ratio rises", "Correct: total current assets are the same but liquid assets rise."],
    bad: [["Both ratios rise, because the business now holds more cash than before", "Total current assets have not changed."], ["Both ratios are unchanged, because the sale is at cost", "The acid test excludes inventory, so it changes."], ["The current ratio falls and the acid test ratio rises", "Inventory is replaced by an equal amount of cash."]],
    hints: ["Does the total of current assets change when inventory becomes cash at cost?"],
    explanation: "Cash replaces inventory at the same value, so current assets are unchanged; the acid test numerator rises by the amount sold.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which action just before the year end is an example of window dressing?",
    ok: ["Paying trade payables from the bank so the year-end ratio looks better", "Correct: the ratio improves for the year-end date only."],
    bad: [["Writing off an irrecoverable debt that the customer has admitted", "This is correct accounting for a known loss."], ["Buying a delivery van with a bank loan that runs for five years", "A normal investment decision."], ["Charging depreciation on all non-current assets in the year", "This is required by accounting standards."]],
    hints: ["Window dressing improves the picture at the date of the statements."],
    explanation: "Window dressing is a short-term action taken to flatter the year-end figures; it does not change the real position during the year.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why might a supermarket operate safely with a lower current ratio than a furniture manufacturer?",
    ok: ["It sells mostly for cash and turns its inventory over quickly", "Correct: cash arrives before the suppliers must be paid."],
    bad: [["It pays no income tax on any of its profits", "Taxation does not explain the difference."], ["It owns far more non-current assets than the furniture factory does", "That does not make the current ratio less important."], ["It has no trade payables or other current liabilities", "Supermarkets owe their suppliers."]],
    hints: ["Think of how quickly each business receives cash."],
    explanation: "Suitable ratios depend on the industry: quick cash sales and fast inventory turnover reduce the need for current assets.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A company offers customers a 3% discount for payment within 10 days to improve its liquidity. What is the main cost of this action?",
    ok: ["Profit is reduced by the discounts given to customers", "Correct: liquidity is improved at the cost of profit."],
    bad: [["The current ratio will fall because receivables are lower", "Cash rises as receivables fall, so current assets are unchanged by the collection."], ["Inventory will increase because customers buy less", "No link to inventory is stated."], ["The company will have to pay its suppliers sooner", "The discount does not change supplier terms."]],
    hints: ["Every discount allowed is an expense."],
    explanation: "A discount speeds up the receipt of cash but reduces the amount received, which reduces profit.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A business with a very high current ratio is always in a strong position.", answer: false, explanation: "False. A very high ratio can mean idle cash, slow-moving inventory or receivables that are not collected." });
  b.tf({ d: 3, skill: "APPLICATION", daily: true, stem: "Buying inventory on credit lowers the current ratio when it is above 1.", answer: true, hints: ["The same amount is added to both totals."], explanation: "True. Adding the same amount to current assets and current liabilities moves the ratio towards 1; for example 3 : 1 becomes 2.5 : 1 when 100 is added to 300 and 100." });

  b.match({
    d: 3, skill: "APPLICATION",
    stem: "A company has a current ratio above 1 : 1. Match each transaction to its effect on the current ratio.",
    pairs: ["Paying a trade payable from the bank", "Buying inventory on credit", "Receiving a long-term loan into the bank", "Customer settles a receivable in cash"],
    right: ["Rises", "Falls", "No change"],
    rightIndex: [0, 1, 0, 2],
    hints: ["Ask which totals change and by how much."],
    explanation: "Equal reductions in both totals raise a ratio above 1; equal additions to both lower it; new cash without a current liability raises it; a receivable swapped for cash leaves current assets unchanged.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The acid test ratio is current assets less {{blank:a}}, divided by current liabilities. A business that grows faster than it can finance is said to be {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["inventory"], choices: ["inventory", "receivables", "cash"] }, { id: "b", accepted: ["overtrading"], choices: ["overtrading", "window dressing", "undertrading"] }],
    explanation: "The acid test removes inventory; rapid growth financed by creditors is overtrading.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "What name is given to actions taken near the year end to make the statement of financial position look more favourable than the position through the year?", accepted: ["window dressing"], explanation: "This is window dressing." });

  // numerical items, each on its own figures
  const cr = ratios.current(34600 + 22900 + 6500, 41000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "ratio", value: cr, calculator: true, daily: true, wrong: [41000 / 64000, ratios.acidTest(64000, 34600, 41000)],
    stem: `A company's inventory is ${usd(34600)}, trade receivables ${usd(22900)} and cash ${usd(6500)}. Its trade payables and accrued expenses total ${usd(41000)}. Calculate the current ratio as x : 1 to two decimal places (enter x).`,
    explanation: `Current assets = ${F(34600)} + ${F(22900)} + ${F(6500)} = ${F(64000)}. Current ratio = ${F(64000)} ÷ ${F(41000)} = ${p2(cr)} : 1. Dividing the other way gives ${p2(41000 / 64000)}.`,
  });
  const at = ratios.acidTest(118400, 52700, 79300);
  b.num({
    d: 3, skill: "APPLICATION", kind: "ratio", value: at, calculator: true, wrong: [ratios.current(118400, 79300), (118400 - 52700 - 6000) / 79300],
    stem: `A business has current assets of ${usd(118400)}, of which inventory is ${usd(52700)}, and current liabilities of ${usd(79300)}. Calculate the acid test ratio as x : 1 to two decimal places (enter x).`,
    hints: ["Remove inventory from current assets first."],
    explanation: `(${F(118400)} - ${F(52700)}) ÷ ${F(79300)} = ${F(118400 - 52700)} ÷ ${F(79300)} = ${p2(at)} : 1. Leaving the inventory in gives the current ratio, ${p2(ratios.current(118400, 79300))} : 1.`,
  });
  const caNeeded = r2(1.8 * 56500);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: caNeeded, calculator: true, wrong: [r2(56500 / 1.8), r2(56500 * 0.8)],
    stem: `A company has a current ratio of 1.8 : 1 and current liabilities of ${usd(56500)}. Calculate its current assets.`,
    hints: ["Current ratio = current assets ÷ current liabilities, so rearrange."],
    explanation: `Current assets = 1.8 × ${F(56500)} = ${F(caNeeded)}. Dividing by 1.8 would give ${F(r2(56500 / 1.8))}, which treats the liabilities as the numerator.`,
  });
  const newCr = ratios.current(87300 - 12800, 61500 - 12800);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "ratio", value: newCr, calculator: true, wrong: [ratios.current(87300, 61500), ratios.current(87300 - 12800, 61500)],
    stem: `A company has current assets of ${usd(87300)} and current liabilities of ${usd(61500)}. It pays ${usd(12800)} of its trade payables from the bank on the last day of the year. Calculate the current ratio after the payment as x : 1 to two decimal places (enter x).`,
    hints: ["The payment reduces cash and trade payables by the same amount."],
    explanation: `New current assets = ${F(87300)} - ${F(12800)} = ${F(87300 - 12800)}; new current liabilities = ${F(61500)} - ${F(12800)} = ${F(61500 - 12800)}. Ratio = ${F(87300 - 12800)} ÷ ${F(61500 - 12800)} = ${p2(newCr)} : 1, up from ${p2(ratios.current(87300, 61500))} : 1. The improvement is the effect of window dressing.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a profitable business can still run out of cash.",
    points: ["Profit is earned when sales are made, but cash arrives only when customers pay; receivables and inventory can absorb the cash", "Cash is also used for non-current assets, loan repayments and drawings or dividends that are not expenses"],
    modelAnswer: "Profit is not cash. Sales on credit and unsold inventory tie up funds, and money spent on assets or dividends does not appear as an expense, so a profitable firm can be short of cash.",
    explanation: "One mark each for the timing difference and for the other uses of cash.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "A company's current ratio rose from 1.4 : 1 to 2.9 : 1, and its cash balance trebled. Evaluate this change from the point of view of the shareholders.",
    points: ["Liquidity is safer: more resources to pay the creditors", "The company may be holding idle cash that earns no return", "A better use might be to repay loans, buy assets or pay a dividend", "Judgement: the position is safe but may be inefficient; the shareholders need the reason for the cash"],
    modelAnswer: "The company is safer, because it can pay its creditors easily. However, idle cash earns little and could be used to repay loans or invest. The change is good for safety but may reduce the return to shareholders.",
    hints: ["A high ratio can be a sign of inefficiency."],
    explanation: "One mark each for safety, idle cash, an alternative use and a judgement.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A wholesaler has a current ratio of 0.9 : 1 and an acid test ratio of 0.3 : 1. Suggest two ways of improving its liquidity and give one drawback of each.",
    points: ["Method 1: collect receivables faster (discount or stricter credit control)", "Drawback of method 1: discounts reduce profit or customers may be lost", "Method 2: raise long-term finance (loan notes or shares) or sell a surplus asset", "Drawback of method 2: interest is a cost, new shares dilute ownership, or the asset's capacity is lost", "Recognises that the acid test is much lower than the current ratio because of inventory, so reducing slow-moving inventory is also relevant"],
    modelAnswer: "The wholesaler could collect its receivables sooner, at the cost of discounts or lost customers, and raise long-term finance, at the cost of interest. The very low acid test ratio shows that most of its current assets are inventory, so selling slow items would also help.",
    hints: ["Compare the two ratios: what does the difference say?"],
    explanation: "Two marks for suitable methods, two for drawbacks and one for the link to the acid test.",
  });

  // Structured 1: 12 marks
  const a = coYear({ name: "Rusape Hardware Ltd", year: 2024, revenue: 296000, cos: 192400, distribution: 14800, admin: 40100, finance: 2700, tax: 9300, nca: 122000, inventory: 36800, receivables: 24300, bank: 11900, payables: 29400, otherCL: 7100, loan: 25000, shareCapital: 90000 });
  const c = coYear({ name: "Rusape Hardware Ltd", year: 2025, revenue: 331000, cos: 215200, distribution: 16300, admin: 45500, finance: 2700, tax: 9900, nca: 130000, inventory: 51200, receivables: 33100, bank: 4300, payables: 41800, otherCL: 8600, loan: 25000, shareCapital: 90000 });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rusape Hardware Ltd shows the following current items at 31 December. Give ratios as x : 1 to two decimal places.\n\n${table(["Item", "2024 US\\$", "2025 US\\$"], [["Inventory", a.inventory, c.inventory], ["Trade receivables", a.receivables, c.receivables], ["Cash and cash equivalents", a.bank, c.bank], ["Trade payables", a.payables, c.payables], ["Tax and accruals", a.otherCL, c.otherCL]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the current ratio for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "ratio", value: R.current(a), wrong: [R.acid(a)], stem: "2024", explanation: `${F(a.ca)} ÷ ${F(a.cl)} = ${p2(R.current(a))} : 1.` }),
        P.num({ label: "(ii)", marks: 1, kind: "ratio", value: R.current(c), wrong: [R.acid(c)], stem: "2025", explanation: `${F(c.ca)} ÷ ${F(c.cl)} = ${p2(R.current(c))} : 1.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the acid test ratio for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "ratio", value: R.acid(a), wrong: [R.current(a)], stem: "2024", explanation: `(${F(a.ca)} - ${F(a.inventory)}) ÷ ${F(a.cl)} = ${p2(R.acid(a))} : 1.` }),
        P.num({ label: "(ii)", marks: 2, kind: "ratio", value: R.acid(c), wrong: [R.current(c)], stem: "2025", explanation: `(${F(c.ca)} - ${F(c.inventory)}) ÷ ${F(c.cl)} = ${p2(R.acid(c))} : 1.` }),
      ] }),
      P.manual({ label: "(c)", marks: 3, stem: "Comment on the change in liquidity between 2024 and 2025.", points: [`Both ratios fell (current ${p2(R.current(a))} to ${p2(R.current(c))}; acid test ${p2(R.acid(a))} to ${p2(R.acid(c))})`, `Cash fell from ${F(a.bank)} to ${F(c.bank)} while inventory and receivables rose`, "Liquidity is weaker: the company is more dependent on selling inventory and on its suppliers"], modelAnswer: "Liquidity has weakened. Both ratios fell, and cash fell to a low level while inventory and receivables increased, so the company depends more on selling inventory and on its suppliers to pay its debts.", explanation: "One mark each for the direction, the cause and the conclusion." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two actions the directors could take to improve liquidity.", points: ["Collect trade receivables faster, or reduce slow-moving inventory", "Raise long-term finance, or delay non-urgent purchases"], modelAnswer: "Chase customers for payment and reduce slow-moving inventory; or raise a long-term loan.", explanation: "One mark for each suitable action." }),
    ],
    hints: ["Remove inventory for the acid test.", "Look at what happened to cash."],
    explanation: "This item tests both liquidity ratios for two years with a short comment.",
  });

  // Structured 2: 16 marks, overtrading
  const e = coYear({ name: "Kwekwe Poultry Ltd", year: 2024, revenue: 252000, cos: 163800, distribution: 11000, admin: 35000, finance: 2300, tax: 8500, nca: 180000, inventory: 19400, receivables: 15200, bank: 16800, payables: 18900, otherCL: 5400, loan: 60000, shareCapital: 100000 });
  const f = coYear({ name: "Kwekwe Poultry Ltd", year: 2025, revenue: 403200, cos: 270200, distribution: 17500, admin: 52000, finance: 6400, tax: 8700, nca: 235000, inventory: 41300, receivables: 49700, bank: 800, payables: 52600, otherCL: 9200, loan: 90000, shareCapital: 100000 });
  const gr = (f.revenue / e.revenue - 1) * 100;
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Kwekwe Poultry Ltd, a producer of eggs and broilers, expanded quickly in 2025. Extracts from its financial statements follow. Give ratios as x : 1 to two decimal places and percentages to one decimal place.\n\n${table(["Item", "2024 US\\$", "2025 US\\$"], [["Revenue", e.revenue, f.revenue], ["Inventory", e.inventory, f.inventory], ["Trade receivables", e.receivables, f.receivables], ["Cash and cash equivalents", e.bank, f.bank], ["Trade payables", e.payables, f.payables], ["Tax and accruals", e.otherCL, f.otherCL], ["Loan notes (non-current)", e.loan, f.loan]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: gr, wrong: [f.revenue - e.revenue, (f.revenue / e.revenue) * 100], stem: "Calculate the percentage increase in revenue from 2024 to 2025.", explanation: `(${F(f.revenue)} - ${F(e.revenue)}) ÷ ${F(e.revenue)} × 100 = ${p1(gr)}%.` }),
      P.group({ label: "(b)", stem: "Calculate the current ratio for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "ratio", value: R.current(e), wrong: [R.acid(e)], stem: "2024", explanation: `${F(e.ca)} ÷ ${F(e.cl)} = ${p2(R.current(e))} : 1.` }),
        P.num({ label: "(ii)", marks: 1, kind: "ratio", value: R.current(f), wrong: [R.acid(f)], stem: "2025", explanation: `${F(f.ca)} ÷ ${F(f.cl)} = ${p2(R.current(f))} : 1.` }),
      ] }),
      P.group({ label: "(c)", stem: "Calculate the acid test ratio for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "ratio", value: R.acid(e), wrong: [R.current(e)], stem: "2024", explanation: `(${F(e.ca)} - ${F(e.inventory)}) ÷ ${F(e.cl)} = ${p2(R.acid(e))} : 1.` }),
        P.num({ label: "(ii)", marks: 2, kind: "ratio", value: R.acid(f), wrong: [R.current(f)], stem: "2025", explanation: `(${F(f.ca)} - ${F(f.inventory)}) ÷ ${F(f.cl)} = ${p2(R.acid(f))} : 1.` }),
      ] }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain why the directors may be worried that the company is overtrading.", points: [`Revenue rose by ${p1(gr)}%`, `Inventory and receivables rose (to ${F(f.inventory)} and ${F(f.receivables)}) while cash fell to ${F(f.bank)}`, `The acid test ratio fell to ${p2(R.acid(f))} : 1, so the company cannot pay its short-term debts from liquid assets`, "Growth is being financed by suppliers (payables rose to " + F(f.payables) + ") and loan notes rather than by cash from operations"], modelAnswer: `Revenue grew by ${p1(gr)}% but cash fell to ${F(f.bank)} while inventory and receivables rose. The acid test ratio of ${p2(R.acid(f))} : 1 shows that liquid assets are less than the short-term debts, and the growth is financed by suppliers and loans.`, explanation: "One mark for each piece of evidence." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Advise the directors on how to restore the liquidity of the company. Give a reason for each suggestion.", points: ["Collect receivables faster (stricter credit terms or early-settlement discount), because receivables rose sharply", "Reduce inventory levels or move to smaller, more frequent orders, because inventory has absorbed cash", "Arrange long-term finance (shares or longer loan) instead of relying on suppliers", "Slow the rate of expansion until cash flow improves, or judgement that the actions should be used together"], modelAnswer: "Tighten credit control so receivables convert to cash sooner, order smaller quantities to cut inventory, and raise long-term finance so that suppliers are not funding the growth. Expansion should slow until cash flow improves.", explanation: "One mark each for a suitable action with its reason, up to 4." }),
    ],
    hints: ["Compare cash with current liabilities.", "Overtrading: growth faster than finance."],
    explanation: "This item tests liquidity ratios, the recognition of overtrading and advice on remedies.",
  });

  b.card("FORMULA", "Current ratio", "Current assets : current liabilities, written as x : 1.");
  b.card("FORMULA", "Acid test ratio", "(Current assets - inventory) : current liabilities, written as x : 1.");
  b.card("DEFINITION", "What is **liquidity**?", "The ability of a business to pay its short-term debts as they fall due.");
  b.card("DEFINITION", "What is **overtrading**?", "Expanding revenue faster than the business can finance, so that cash runs out while inventory and receivables grow.");
  b.card("DEFINITION", "What is **window dressing**?", "Actions near the year end that make the statement of financial position look better than the position through the year, for example paying creditors from cash.");
  b.card("FACT", "Effect of paying a payable when the current ratio is above 1", "Both totals fall by the same amount, so the current ratio rises (the acid test ratio rises only if it is above 1).");
  b.card("FACT", "Is a high current ratio always good?", "No. It may mean idle cash, slow-moving inventory or receivables not collected. Compare with the industry and earlier years.");
  b.card("CONCEPT", "Ways to improve liquidity", "Collect receivables faster, hold less inventory, raise long-term finance, sell surplus assets. Each has a cost.");
  b.card("CONCEPT", "Profit and liquidity", "A profitable business can run out of cash if inventory and receivables grow faster than cash comes in.");
});
void chk;
