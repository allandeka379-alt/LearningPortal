// W2a: capital and revenue expenditure and receipts.
import { concept, P, money, statement, check, sum, r2, CAM } from "../lib.mjs";
import { table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;

concept("acc.adjustments.capital-revenue", { file: "adjustments/capital-revenue", keyPrefix: "adjustments.capital-revenue" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is **capital expenditure** for a printing business?",
    options: [
      ["Buying a new printing press", "Correct: a non-current asset that will be used for several years."],
      ["Buying paper and ink to use in printing jobs", "Materials used up in the year are revenue expenditure."],
      ["Paying the electricity bill", "A running cost: revenue expenditure."],
      ["Repairing a broken window", "A repair keeps the building as it was: revenue expenditure."],
    ],
    answer: "A",
    explanation: "Capital expenditure buys, brings into use or improves non-current assets.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is **revenue expenditure**?",
    options: [
      ["Servicing the delivery van", "Correct: maintenance keeps the van in its existing condition."],
      ["Buying a delivery van", "Buying a non-current asset is capital expenditure."],
      ["Building a new storeroom", "An extension improves the premises: capital."],
      ["Legal fees on buying a shop", "Costs of acquiring premises are part of their cost: capital."],
    ],
    answer: "A",
    explanation: "Revenue expenditure covers running costs and maintenance; it benefits only the current period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tendai pays US\\$600 to install a new freezer in his butchery. How should the installation cost be treated?",
    options: [
      ["Added to the cost of the freezer as capital expenditure", "Correct: installation is needed to bring the freezer into use."],
      ["Charged as an expense in the income statement", "Costs of bringing an asset into use are capital."],
      ["Deducted from sales", "Installation costs have nothing to do with sales."],
      ["Recorded as drawings", "The freezer is for the business, not the owner personally."],
    ],
    answer: "A",
    explanation: "The cost of a non-current asset includes everything needed to get it ready for use: price, delivery, installation and testing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is revenue expenditure shown in the financial statements?",
    options: [
      ["In the income statement (statement of profit or loss)", "Correct: it is charged against this year's income."],
      ["As a non-current asset in the statement of financial position", "Only capital expenditure is shown as a non-current asset."],
      ["As a current liability", "Expenditure that has been paid is not a liability."],
      ["As a deduction from capital", "Only drawings and losses reduce capital directly."],
    ],
    answer: "A",
    explanation: "Revenue expenditure is an expense (or part of cost of sales) in the income statement.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which of these is a **capital receipt**?",
    options: [
      ["A bank loan received", "Correct: it is borrowed money, not income, and must be repaid."],
      ["Cash from sales", "Sales are revenue receipts."],
      ["Rent received from a tenant", "Rent received is income: a revenue receipt."],
      ["Commission received", "Commission is income from normal activities: a revenue receipt."],
    ],
    answer: "A",
    explanation: "Capital receipts include loans received, capital introduced and proceeds from selling non-current assets. They affect the statement of financial position, not profit.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha owns a guest house in Victoria Falls. Which payment is **capital** expenditure?",
    options: [
      ["Adding two extra bedrooms to the building", "Correct: the extension increases the earning capacity of the premises."],
      ["Repainting the outside walls", "Repainting maintains the building."],
      ["Replacing broken roof tiles", "Replacing worn parts restores the roof; it does not improve it."],
      ["Paying the annual property insurance", "Insurance is a running cost."],
    ],
    answer: "A",
    hints: ["Does the spending improve the asset or keep it as it was?"],
    explanation: "Improvements (extensions, upgrades) are capital; maintenance and running costs are revenue.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A mechanic employed by Farai's transport business spends a week fitting a new engine that extends the life of a lorry by five years. His wages for that week are US\\$350. How are the wages treated?",
    options: [
      ["As capital expenditure on the lorry", "Correct: the work improves the lorry and extends its life."],
      ["As revenue expenditure, under wages", "Wages for improving an asset are part of the capital cost."],
      ["As revenue expenditure, under repairs", "A new engine that extends the life is an improvement, not a repair."],
      ["As drawings", "The mechanic is an employee; the work is for the business."],
    ],
    answer: "A",
    hints: ["Classify by what the work achieved, not by the type of payment."],
    explanation: "Spending is classified by its purpose. Wages to improve or install a non-current asset are capital expenditure.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "Where is **commission received** shown in the financial statements?",
    options: [
      ["Added to gross profit in the statement of profit or loss", "Correct: a revenue receipt is income."],
      ["As a non-current liability", "Commission does not have to be repaid."],
      ["Added to capital in the statement of financial position", "Income reaches capital only through the profit for the year."],
      ["Deducted from expenses as a capital receipt", "Commission is a revenue receipt, shown as income."],
    ],
    answer: "A",
    hints: ["Is commission part of the normal earnings of the business?"],
    explanation: "Revenue receipts such as commission, rent and interest received are other income in the statement of profit or loss.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Capital expenditure benefits the business for more than one accounting period.",
    answer: true,
    explanation: "True. That is why it is shown as a non-current asset and spread over its life through depreciation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The cost of repairing a delivery van after a minor accident is capital expenditure.",
    answer: false,
    explanation: "False. Repairs restore the van to its existing condition, so they are revenue expenditure.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Chipo runs a hardware shop in Mutare. Classify each item.",
    pairs: ["Buying a forklift", "Delivery charge on the forklift", "Fuel for the forklift", "Wages of shop assistants", "Installing burglar bars on the shop for the first time"],
    right: ["Capital expenditure", "Revenue expenditure"],
    rightIndex: [0, 0, 1, 1, 0],
    explanation: "Buying an asset, its delivery and a lasting improvement (first-time burglar bars) are capital; fuel and wages are running costs.",
  });
  b.match({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "Classify each receipt of Rudo's business.",
    pairs: ["Cash sales", "Loan from a finance company", "Rent received from a tenant", "Proceeds from selling an old van", "Rudo pays in extra capital", "Interest received on a savings account"],
    right: ["Capital receipt", "Revenue receipt"],
    rightIndex: [1, 0, 1, 0, 0, 1],
    hints: ["Revenue receipts come from normal business activities; capital receipts do not."],
    explanation: "Loans, capital introduced and sale proceeds of non-current assets are capital receipts; sales, rent and interest are revenue receipts.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Capital expenditure is debited to a {{blank:a}} account and shown in the {{blank:b}}; revenue expenditure is shown in the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["non-current asset"], choices: ["non-current asset", "expense", "capital"] },
      { id: "b", accepted: ["statement of financial position"], choices: ["statement of financial position", "income statement"] },
      { id: "c", accepted: ["income statement"], choices: ["income statement", "statement of financial position"] },
    ],
    explanation: "Capital expenditure becomes an asset; revenue expenditure is an expense of the year.",
  });

  // Cost of a machine
  const m = { price: 16800, carriage: 540, install: 1260, test: 300, oil: 85, insurance: 720 };
  const mCost = sum([m.price, m.carriage, m.install, m.test]);
  b.calc({
    d: 3, kind: "money", value: mCost, calculator: true, wrong: [sum(Object.values(m)), m.price],
    stem: "Sipho bought a grinding mill for his business in Gokwe. He paid: price US\\$16,800; carriage to the site US\\$540; installation US\\$1,260; test run US\\$300; lubricating oil for the first month US\\$85; insurance for the first year US\\$720. Calculate the amount to be capitalised as the cost of the mill.",
    hints: ["Include every cost needed to get the mill ready for use.", "Leave out running costs."],
    explanation: `Capital: $16,800 + 540 + 1,260 + 300 = ${mCost.toLocaleString("en-GB")}$, so ${money(mCost)}. Oil (85) and insurance (720) are running costs. Including everything gives ${money(sum(Object.values(m)))}.`,
  });
  check("mCost", mCost, 18900);
  // Revenue expenditure total
  const rv = [["Replacing broken roof sheets on the storeroom", 1250, "R"], ["Extension to the shop", 9500, "C"], ["Painting the extension when built", 640, "C"], ["Repainting the old shop front", 410, "R"], ["Security guard's wages", 2400, "R"]];
  const rvTotal = sum(rv.filter((x) => x[2] === "R").map((x) => x[1]));
  b.calc({
    d: 4, kind: "money", value: rvTotal, calculator: true, wrong: [r2(rvTotal + 640), r2(rvTotal - 1250)],
    stem: "Thandeka's payments during the year included:\n\n" + table(["Payment", U], rv.map((x) => [x[0], x[1]])) + "\n\nCalculate the total **revenue** expenditure.",
    hints: ["Replacing like with like is maintenance.", "Finishing a new extension is part of its cost."],
    explanation: `Revenue: roof sheets 1,250 (restore, do not improve) + repainting 410 + wages 2,400 = ${rvTotal.toLocaleString("en-GB")}. The extension and the painting needed to complete it (9,500 + 640) are capital. Counting the first coat of paint as revenue gives ${money(r2(rvTotal + 640))}.`,
  });
  check("rvTotal", rvTotal, 4060);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between capital expenditure and revenue expenditure, giving **one** example of each for a bakery.",
    points: ["Capital: buying/improving non-current assets with benefit over more than one year, e.g. an oven or delivery van", "Revenue: day-to-day running costs or maintenance used up in the year, e.g. flour, electricity, wages, oven repairs"],
    modelAnswer: "Capital expenditure buys or improves long-term assets, such as a new oven. Revenue expenditure pays for running the business in the current year, such as electricity or oven repairs.",
    explanation: "A definition plus an example for each earns the marks.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: "Explain why it is important to distinguish correctly between capital and revenue expenditure.",
    points: ["So profit is correctly stated: revenue expenditure is charged in full this year, capital expenditure only through depreciation", "So non-current assets are correctly valued in the statement of financial position / users get a true and fair view"],
    modelAnswer: "If they are confused, profit is wrong because expenses are overstated or understated, and the non-current assets in the statement of financial position are wrongly valued, so users are misled.",
    hints: ["Think of both statements."],
    explanation: "Misclassification distorts both profit and asset values (studied further in the next lesson).",
  });

  // Practice structured 1: classify and calculate
  const s = [["Purchase of a delivery truck", 24900, "C"], ["Signwriting the business name on the new truck", 360, "C"], ["Fuel for the truck", 2150, "R"], ["Annual road licence", 260, "R"], ["Air-conditioning fitted to the office for the first time", 1850, "C"], ["Repairs to the office door", 95, "R"], ["Goods for resale", 31700, "R"]];
  const sCap = sum(s.filter((x) => x[2] === "C").map((x) => x[1]));
  const sRev = sum(s.filter((x) => x[2] === "R").map((x) => x[1]));
  check("sCap", sCap, 27110);
  check("sRev", sRev, 34205);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Tatenda runs a building-materials business in Gweru. During the year ended 31 December 2025 he made these payments:\n\n" + table(["Payment", U], s.map((x) => [x[0], x[1]])),
    parts: [
      P.match({ label: "(a)", stem: "Classify each payment.", pairs: s.map((x) => x[0]), right: ["Capital expenditure", "Revenue expenditure"], rightIndex: s.map((x) => (x[2] === "C" ? 0 : 1)), explanation: "The truck, its signwriting and the first-time air-conditioning are capital; running costs, repairs and goods for resale are revenue." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: sCap, wrong: [24900], stem: "Calculate the total capital expenditure.", explanation: `$24,900 + 360 + 1,850 = ${sCap.toLocaleString("en-GB")}$.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: sRev, wrong: [r2(sRev - 31700)], stem: "Calculate the total revenue expenditure.", explanation: `$2,150 + 260 + 95 + 31,700 = ${sRev.toLocaleString("en-GB")}$. Goods for resale are revenue expenditure too.` }),
      P.manual({ label: "(d)", marks: 2, stem: "State where the truck and the fuel appear in Tatenda's financial statements.", points: ["Truck: non-current asset (motor vehicles at cost) in the statement of financial position", "Fuel: expense in the income statement (statement of profit or loss)"], modelAnswer: "The truck is a non-current asset in the statement of financial position; the fuel is an expense in the income statement.", explanation: "Capital → statement of financial position; revenue → income statement." }),
    ],
    hints: ["Ask whether the spending creates or improves a long-term asset.", "Goods for resale are revenue expenditure (purchases)."],
    explanation: "This item tests classifying expenditure and its treatment.",
  });

  // Practice structured 2 (Cambridge): receipts and statements
  const r = { gp: 31450, comm: 1260, loan: 8000, capIntro: 4500, salesNca: 2300, int: 140, exp: 18925 };
  const income = r2(r.gp + r.comm + r.int);
  const profit = r2(income - r.exp);
  const isMd = "**Nyasha's Agro Supplies**\n\n**Statement of profit or loss (extract)**\n\n" + statement("for the year ended 31 December 2025", [["Gross profit", null, r.gp], ["Add: Commission received", null, r.comm], ["Add: Interest received", null, r.int], [null, null, income], ["Less: Expenses", null, -r.exp], ["**Profit for the year**", null, `**${profit.toLocaleString("en-GB")}**`]], { checks: [["income", income, 32850], ["profit", profit, 13925]] });
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", applies: CAM, calculator: true,
    stem: `Nyasha runs an agricultural supplies business in Chinhoyi. During the year ended 31 December 2025 her business received: commission from a seed company ${money(r.comm)}; a loan from Mutapa Finance ${money(r.loan)}; additional capital from Nyasha ${money(r.capIntro)}; ${money(r.salesNca)} from selling an old delivery bike; and interest on a savings account ${money(r.int)}. Gross profit was ${money(r.gp)} and expenses were ${money(r.exp)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r2(r.comm + r.int), wrong: [r2(r.comm + r.int + r.loan + r.capIntro + r.salesNca)], stem: "Calculate the total revenue receipts listed (excluding gross profit).", explanation: `Commission 1,260 + interest 140 = ${r2(r.comm + r.int).toLocaleString("en-GB")}. The loan, capital and bike proceeds are capital receipts.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: profit, wrong: [r2(profit + r.loan + r.capIntro + r.salesNca)], stem: "Calculate the profit for the year.", explanation: `$31,450 + 1,260 + 140 - 18,925 = ${profit.toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare an extract from the statement of profit or loss showing the profit for the year.", points: ["Heading with the year end", "Commission and interest added to gross profit (32,850)", "Expenses deducted; profit for the year 13,925"], modelAnswer: isMd, explanation: "Only revenue receipts appear in the statement of profit or loss." }),
      P.manual({ label: "(d)", marks: 3, stem: "State where each of the three capital receipts is recorded in the statement of financial position.", points: ["Loan: non-current liability", "Additional capital: added to capital (owner's equity)", "Bike proceeds: reduce non-current assets (via the disposal of the bike)"], modelAnswer: "The loan is a non-current liability; the extra capital is added to capital; the bike proceeds are part of its disposal, so the bike is removed from non-current assets.", explanation: "Capital receipts affect the statement of financial position, not profit." }),
      P.manual({ label: "(e)", marks: 2, stem: "Nyasha's assistant says the loan should be included in profit because it is money received. Evaluate this view.", points: ["The view is wrong: a loan must be repaid, so it is a liability / capital receipt, not income", "Including it would overstate profit by 8,000 and could mislead Nyasha into higher drawings"], modelAnswer: "The assistant is wrong. A loan is a capital receipt that must be repaid, so it is a liability. Treating it as income would overstate profit by US\\$8,000 and could lead Nyasha to take drawings the business cannot afford.", explanation: "Money received is not always income." }),
    ],
    hints: ["Revenue receipts come from normal activities.", "Capital receipts go to the statement of financial position."],
    explanation: "This item tests capital and revenue receipts and their treatment.",
  });

  b.card("DEFINITION", "What is **capital expenditure**?", "Spending on buying, bringing into use or improving non-current assets; benefits more than one year.");
  b.card("DEFINITION", "What is **revenue expenditure**?", "Spending on running the business and maintaining assets; benefits the current year only.");
  b.card("FACT", "Costs included in the cost of a non-current asset", "Purchase price, delivery, installation, testing, legal fees: everything needed to get it ready for use.");
  b.card("CONCEPT", "Improvement or repair?", "Improvement (extension, upgrade, longer life) = capital. Repair or maintenance (restore existing condition) = revenue.");
  b.card("FACT", "Where does capital expenditure appear?", "Statement of financial position, as a non-current asset (then depreciated).");
  b.card("FACT", "Where does revenue expenditure appear?", "Income statement (statement of profit or loss), as an expense or in cost of sales.");
  b.card("DEFINITION", "What is a **capital receipt**?", "Money received that is not normal trading income: loans, capital introduced, proceeds from selling non-current assets.", undefined, { applies: CAM });
  b.card("DEFINITION", "What is a **revenue receipt**?", "Income from normal activities: sales, rent received, commission received, interest received.", undefined, { applies: CAM });
  b.card("FACT", "Wages paid to install a machine", "Capital expenditure: part of the machine's cost.");
});
