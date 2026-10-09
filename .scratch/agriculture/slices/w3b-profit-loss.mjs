// Slice W3b: profit and loss account (ZIMSEC only).
import { concept, P, profitLoss, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: profit 520 - 385.
const n1 = profitLoss({ income: [["Sales", 520]], expenses: [["Costs", 385]] });
check(n1.profit === 135, "n1");
// Num: loss.
const n2 = profitLoss({ income: [["Sales", 290]], expenses: [["Seed", 65], ["Fertiliser", 180], ["Labour", 95]] });
check(n2.profit === -50, "n2");
// Calc: layers with valuations.
const c1 = profitLoss({ income: [["Egg sales", 1150], ["Closing valuation", 320]], expenses: [["Opening valuation", 400], ["Feed", 610], ["Vaccines", 25], ["Labour", 120]] });
check(c1.totalIncome === 1470 && c1.totalExpenses === 1155 && c1.profit === 315, "c1");
// Structured 12: tomato project.
const TOM = { sold: 680, price: 0.45, home: 36 };
const tomSales = round(TOM.sold * TOM.price, 2);
const TOM_EXP = [["Seedlings", 24], ["Compost and fertiliser", 58], ["Fungicide and insecticide", 31], ["Stakes and string", 19], ["Water pumping", 27], ["Transport to market", 22]];
const tom = profitLoss({ income: [["Sales", tomSales], ["Eaten at the school", TOM.home]], expenses: TOM_EXP });
check(Math.abs(tomSales - 306) < 1e-9 && tom.totalIncome === 342 && tom.totalExpenses === 181 && tom.profit === 161, "tom");
const TOM_TABLE = table(["Item", "Amount"], [
  ["Tomatoes sold", `${TOM.sold} kg at US\\$${TOM.price.toFixed(2)} per kg`],
  ["Tomatoes used in the school kitchen", `valued at US\\$${TOM.home}`],
  ...TOM_EXP.map(([i, a]) => [i, `US\\$${a}`]),
]);
// Structured 8: broilers with deaths.
const BR = { chicks: 150, chickPrice: 0.85, died: 12, price: 6.2, feed: 360, other: 64 };
const brSold = BR.chicks - BR.died;
const br = profitLoss({ income: [["Sales", brSold * BR.price]], expenses: [["Chicks", BR.chicks * BR.chickPrice], ["Feed", BR.feed], ["Other", BR.other]] });
check(brSold === 138 && Math.abs(br.totalIncome - 855.6) < 1e-9 && Math.abs(br.totalExpenses - 551.5) < 1e-9 && Math.abs(br.profit - 304.1) < 1e-9, "br");
const lostIncome = BR.died * BR.price;
check(Math.abs(lostIncome - 74.4) < 1e-9, "lost");

concept("agri.business.profit-loss", { file: "business/profit-loss", keyPrefix: "business.profit-loss" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the profit and loss account of a layer enterprise, which item is **income**?",
    options: [
      ["Sale of eggs", "Correct: money earned from the enterprise's output."],
      ["Layers' mash bought", "Feed is expenditure."],
      ["Vaccine for the hens", "Vaccines are expenditure."],
      ["Wages of the poultry worker", "Wages are expenditure."],
    ],
    answer: "A",
    explanation: "Income is the value of output: sales, produce used at home and the closing valuation.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an item of **expenditure** for a maize enterprise?",
    options: [
      ["Fertiliser bought", "Correct: an input cost."],
      ["Maize sold to a buyer", "This is income."],
      ["Maize eaten by the family", "This is counted as income (home use)."],
      ["Maize still in store at the end", "This is the closing valuation, counted as income."],
    ],
    answer: "A",
    explanation: "Expenditure is the cost of the inputs used to produce the output.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An enterprise's total expenditure is greater than its total income. What does the account show?",
    options: [
      ["A loss", "Correct: expenditure exceeds income."],
      ["A profit", "A profit needs income greater than expenditure."],
      ["A balance of zero", "Only if the two totals are equal."],
      ["A closing valuation", "A valuation is an item, not the result."],
    ],
    answer: "A",
    explanation: "Profit = income − expenditure; a negative result is a loss.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On which side of a profit and loss account is the **closing valuation** of stock entered?",
    options: [
      ["Income", "Correct: stock on hand at the end is part of what was produced."],
      ["Expenditure", "The opening valuation goes here, not the closing one."],
      ["Neither side; it is left out", "Leaving it out understates the result."],
      ["Both sides equally", "That would cancel it out."],
    ],
    answer: "A",
    explanation: "Closing valuation is income; opening valuation is expenditure.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "A family eats some of the vegetables from its own garden enterprise. How should their value be treated in the garden's profit and loss account?",
    options: [
      ["As income, valued at market price", "Correct: it is output of the enterprise."],
      ["As expenditure, because no cash came in", "Home use is output, not a cost."],
      ["Ignored, because it was not sold", "Ignoring it understates the enterprise's output."],
      ["As a loss, because it was not sold", "It is not a loss."],
    ],
    answer: "A",
    hints: ["Did the enterprise produce it?"],
    explanation: "Produce consumed at home is part of the enterprise's output, so it is valued and counted as income.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a function of a profit and loss account?",
    options: [
      ["Showing which costs of an enterprise are largest", "Correct."],
      ["Recording the daily weather and rainfall on the farm", "That is a farm diary."],
      ["Listing the farm's animals by identity", "That is a livestock register."],
      ["Fixing the market price of the produce", "Market price is set by supply and demand."],
    ],
    answer: "A",
    hints: ["What does the account compare?"],
    explanation: "The account shows profit or loss, the size of each cost, and gives evidence for comparison, loans and planning.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a broiler batch, 15% of the birds die just before sale. What is the main effect on the profit and loss account?",
    options: [
      ["Income falls, but chick and most feed costs remain", "Correct: so profit falls sharply."],
      ["Costs fall by 15%, so profit is unchanged", "Chicks and most feed were already paid for."],
      ["Income rises because fewer birds need feeding in the last week", "Fewer birds means less income."],
      ["The opening valuation becomes an income item", "Deaths do not move items between sides."],
    ],
    answer: "A",
    hints: ["When were most costs for those birds incurred?"],
    explanation: "Birds dying late have already used chicks, feed and other inputs, but bring no income, so profit falls.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Farai's cash from his groundnut project rose by US\\$120, and he calls this his profit. He still owes US\\$45 for hired labour. What is wrong with his claim?",
    options: [
      ["The unpaid labour is a cost, so profit is lower", "Correct: expenditure includes costs not yet paid."],
      ["Unpaid bills are counted as income", "Money owed by the farmer is a cost."],
      ["Profit is always higher than the cash rise", "Not necessarily; here it is lower."],
      ["Labour is never a cost of an enterprise", "Hired labour is a cost."],
    ],
    answer: "A",
    hints: ["Does profit depend on when bills are paid?"],
    explanation: "Profit counts all costs of the period, paid or not; the US\\$45 owed reduces profit below the cash increase.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The opening valuation of livestock is entered as expenditure in a profit and loss account.",
    answer: true,
    explanation: "True. Stock on hand at the start is treated as a cost; stock at the end as income.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Decide whether each item is income or expenditure in a dairy enterprise's profit and loss account.",
    pairs: ["Milk sold to a dairy", "Dairy meal bought", "Calves sold", "Veterinary fees", "Milk drunk by the family", "Opening valuation of the herd"],
    right: ["Income", "Expenditure"],
    rightIndex: [0, 1, 0, 1, 0, 1],
    explanation: "Output (sales, home use) is income; inputs and the opening valuation are expenditure.",
  });
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Profit = total {{blank:a}} − total {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["income", "revenue", "receipts"] },
      { id: "b", accepted: ["expenditure", "expenses", "costs"] },
    ],
    explanation: "Profit = total income − total expenditure.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the value of the stock still on hand at the end of the accounting period?",
    accepted: ["closing valuation", "closing stock", "closing stock valuation", "closing value"],
    keywords: { all: ["closing"] },
    explanation: "The **closing valuation**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A rape and covo enterprise earned US\\$520 from sales and had total expenditure of US\\$385. Calculate the profit.",
    value: n1.profit, prefix: "US$", wrong: [520 + 385, 385 - 520],
    explanation: `US\\$520 − US\\$385 = US\\$${n1.profit}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A sugar bean plot sold beans for US\\$290. Its costs were seed US\\$65, fertiliser US\\$180 and labour US\\$95. Calculate the size of the **loss**.",
    value: -n2.profit, prefix: "US$", wrong: [n2.totalExpenses, 290 - 65 - 180],
    hints: ["Total the costs first."],
    explanation: `Expenditure = 65 + 180 + 95 = US\\$${n2.totalExpenses}; 290 − ${n2.totalExpenses} = −50, a loss of US\\$${-n2.profit}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A layer enterprise's hens were valued at US\\$400 at the start of the year and at US\\$320 at the end. During the year eggs were sold for US\\$1,150, and the enterprise spent US\\$610 on feed, US\\$25 on vaccines and US\\$120 on labour. Calculate the profit for the year.",
    value: c1.profit, prefix: "US$", wrong: [1150 - 610 - 25 - 120, 1150 + 400 - 320 - 610 - 25 - 120],
    hints: ["Closing valuation is income; opening valuation is expenditure."],
    explanation: `Income = 1,150 + 320 = US\\$${c1.totalIncome.toLocaleString("en-GB")}; expenditure = 400 + 610 + 25 + 120 = US\\$${c1.totalExpenses.toLocaleString("en-GB")}; profit = US\\$${c1.profit}. Ignoring the valuations gives US\\$395, which hides the fall in the hens' value as they age.`,
    workedSolution: `1. Income = egg sales + closing valuation = 1,150 + 320 = US\\$${c1.totalIncome.toLocaleString("en-GB")}.\n2. Expenditure = opening valuation + feed + vaccines + labour = 400 + 610 + 25 + 120 = US\\$${c1.totalExpenses.toLocaleString("en-GB")}.\n3. Profit = ${c1.totalIncome.toLocaleString("en-GB")} − ${c1.totalExpenses.toLocaleString("en-GB")} = US\\$${c1.profit}.`,
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State **three** functions of a profit and loss account.",
    points: [
      "Shows whether the enterprise made a profit or a loss, and how much.",
      "Shows the size of each cost, so savings can be made / enterprises and seasons can be compared.",
      "Provides evidence for loans or tax / helps plan and budget for the next period.",
    ],
    modelAnswer: "It shows whether the enterprise made a profit or loss and how much; it shows which costs were largest so savings can be made and enterprises compared; and it gives evidence to a bank and a basis for planning next season.",
    explanation: "Result, cost analysis, evidence and planning.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest **two** ways a school could increase the profit of its broiler project, explaining how each works.",
    hints: ["Raise income or cut costs."],
    points: [
      "Reduce deaths by good brooding, hygiene and vaccination.",
      "More birds are sold from the same chick and feed costs, so income rises.",
      "Buy feed in bulk / avoid feed wastage with proper feeders.",
      "Feed is the largest cost, so a lower feed bill raises profit (or: sell at a time or place with better prices).",
    ],
    modelAnswer: "Reducing deaths through careful brooding, clean litter and vaccination means more birds are sold for the same chick and feed costs. Using proper feeders and buying feed in bulk cuts feed costs, the largest expense, so profit rises.",
    explanation: "Method plus effect, twice.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 12, calculator: true,
    stem: `A school near Masvingo grew tomatoes on a small plot. Its records for the season are shown.\n\n${TOM_TABLE}`,
    hints: ["Home use is income.", "Profit = total income − total expenditure."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the income from tomatoes sold.",
        value: tomSales, prefix: "US$", wrong: [TOM.sold, round(TOM.sold / TOM.price, 2)],
        explanation: `${TOM.sold} × 0.45 = US\\$${tomSales}.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the total income of the enterprise.",
        value: tom.totalIncome, prefix: "US$", wrong: [tomSales, tomSales - TOM.home],
        explanation: `${tomSales} + ${TOM.home} = US\\$${tom.totalIncome}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the total expenditure.",
        value: tom.totalExpenses, prefix: "US$", wrong: [tom.totalExpenses - 22, tom.totalExpenses + TOM.home],
        explanation: `24 + 58 + 31 + 19 + 27 + 22 = US\\$${tom.totalExpenses}.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: "Calculate the profit.",
        value: tom.profit, prefix: "US$", wrong: [tomSales - tom.totalExpenses, tom.totalIncome + tom.totalExpenses],
        explanation: `${tom.totalIncome} − ${tom.totalExpenses} = US\\$${tom.profit}.`,
      }),
      P.mcq({
        label: "(e)", stem: "Which was the largest single item of expenditure?",
        options: [
          ["Compost and fertiliser", "Correct: US\\$58."],
          ["Fungicide and insecticide", "US\\$31."],
          ["Water pumping", "US\\$27."],
          ["Seedlings", "US\\$24."],
        ],
        answer: "A",
        explanation: "Compost and fertiliser cost US\\$58, the largest item.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the tomatoes used in the school kitchen are included as income.",
        points: ["They were produced by the enterprise and have a value.", "The school would otherwise have had to buy them, so leaving them out would understate the profit."],
        explanation: "Home use is output.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Describe how the school should set out this information as a profit and loss account.",
        points: ["Two columns: expenditure on one side, income on the other, with headings and the period.", "Each item listed with its value (and workings such as 680 × 0.45), and each side totalled.", "The difference entered and clearly labelled as profit (or loss), so the two sides balance."],
        explanation: "Layout of the account.",
      }),
    ],
    explanation: "Prepare a profit and loss account for a school vegetable enterprise.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer near Chinhoyi bought ${BR.chicks} day-old broiler chicks at US\\$${BR.chickPrice.toFixed(2)} each. ${BR.died} birds died; the rest were sold at US\\$${BR.price.toFixed(2)} each. Feed cost US\\$${BR.feed} and other costs were US\\$${BR.other}.`,
    hints: ["Only birds sold earn income.", "Lost income = birds that died × price."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the income from the birds sold, to the nearest cent.",
        value: br.totalIncome, prefix: "US$", answer: "855.60", wrong: [BR.chicks * BR.price, BR.died * BR.price],
        explanation: `${BR.chicks} − ${BR.died} = ${brSold} birds; ${brSold} × 6.20 = US\\$${br.totalIncome.toFixed(2)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the profit, to the nearest cent.",
        value: br.profit, prefix: "US$", answer: "304.10", wrong: [round(BR.chicks * BR.price - br.totalExpenses, 2), round(br.totalIncome - BR.feed - BR.other, 2)],
        explanation: `Expenditure = ${BR.chicks} × 0.85 + ${BR.feed} + ${BR.other} = US\\$${br.totalExpenses.toFixed(2)}; profit = ${br.totalIncome.toFixed(2)} − ${br.totalExpenses.toFixed(2)} = US\\$${br.profit.toFixed(2)}.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "How much more income would the farmer have earned if no birds had died? Give your answer to the nearest cent.",
        value: lostIncome, prefix: "US$", answer: "74.40", wrong: [BR.died * BR.chickPrice],
        explanation: `${BR.died} × 6.20 = US\\$${lostIncome.toFixed(2)}.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why reducing deaths has a large effect on profit, and suggest **two** ways to reduce them.",
        points: ["Dead birds have used chicks, feed and other inputs but bring no income, so each death costs both the inputs and the lost sale.", "Good brooding (correct temperature, draught-free house) and clean, dry litter.", "Vaccination (e.g. against Newcastle disease) and good hygiene / clean water and feed."],
        explanation: "Costs already spent plus lost income; brooding and disease prevention.",
      }),
    ],
    explanation: "Prepare the figures for a broiler profit and loss account and analyse the effect of mortality.",
  });

  b.card("DEFINITION", "Profit and loss account", "Statement of income and expenditure of an enterprise or farm over a period, showing profit or loss.");
  b.card("FORMULA", "Profit", "Total income − total expenditure (negative = loss).");
  b.card("FORMULA", "Profit with valuations", "(Sales + other income + closing valuation) − (opening valuation + expenses).");
  b.card("CONCEPT", "Income of an enterprise", "Sales, produce used at home or given away, by-products, closing valuation.");
  b.card("CONCEPT", "Expenditure of an enterprise", "Seed, young stock, feed, fertiliser, chemicals, labour, veterinary, fuel, transport, repairs, opening valuation.");
  b.card("CONCEPT", "Functions of a profit and loss account", "Shows profit or loss, compares enterprises, shows largest costs, supports loans and tax, guides planning.");
  b.card("FACT", "Is home-consumed produce income?", "Yes: it is output of the enterprise, valued at market price.");
  b.card("CONCEPT", "Profit vs cash", "Profit counts all output and all costs of the period (paid or not, plus valuations); cash shows only money in hand.");
});
