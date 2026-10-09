// W4a: why businesses need finance (COM Form 3; BES Form 1; CAM 5.1.1).
import { concept, P, money, fmt, sum, table, COM } from "../lib.mjs";

concept("bus.finance.need-for-finance", { file: "finance/need-for-finance", keyPrefix: "finance.need-for-finance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is start-up capital?",
    options: [
      ["Finance needed to set up a new business", "Correct: for first assets, stock and early expenses."],
      ["Profit made in the first year of trading", "Profit is earned later, not raised to start."],
      ["Money paid to shareholders as dividends", "Dividends are a share of profit."],
      ["Tax paid when a business is registered", "Registration fees are only one small start-up cost."],
    ],
    answer: "A",
    explanation: "Start-up capital pays for what a new business needs before it earns income.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a long-term finance need?",
    options: [
      ["Buying a new factory building", "Correct: the building will be used for many years."],
      ["Paying this month's wages", "Wages are a short-term need."],
      ["Buying stock for the festive season", "Stock is sold within months: short-term."],
      ["Paying the electricity bill", "Bills are day-to-day revenue expenditure."],
    ],
    answer: "A",
    explanation: "Long-term needs are for assets used over many years.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of capital expenditure?",
    options: [
      ["Buying a delivery van", "Correct: a non-current asset used for several years."],
      ["Paying rent for a shop", "Rent is revenue expenditure."],
      ["Buying fuel for the van", "Fuel is a running cost."],
      ["Paying drivers' wages", "Wages are revenue expenditure."],
    ],
    answer: "A",
    explanation: "Capital expenditure buys non-current assets; revenue expenditure pays running costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a profitable business still need short-term finance?",
    options: [
      ["Customers on credit have not yet paid", "Correct: profit is not the same as cash in hand."],
      ["Profitable businesses are not allowed to borrow", "No such rule exists."],
      ["Its non-current assets have increased in value", "A rise in asset value does not create a cash need."],
      ["It has too much cash in the bank", "Too much cash does not create a need for finance."],
    ],
    answer: "A",
    explanation: "Timing gaps between paying suppliers and receiving cash create short-term needs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A printing business replaces a worn-out printing press. Which reason for needing finance is this?",
    options: [
      ["Replacing non-current assets", "Correct: the old press has worn out."],
      ["Raising start-up capital", "The business is already trading."],
      ["Funding day-to-day working capital", "Working capital is for day-to-day spending."],
      ["Paying dividends to its owners", "Dividends are not a finance need."],
    ],
    answer: "A",
    explanation: "Assets wear out and must be replaced to keep output and quality.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business plans to use its overdraft to buy a building. Why is this risky?",
    options: [
      ["The bank can demand the overdraft back at short notice", "Correct: a long-term asset is financed with short-term money."],
      ["Overdraft interest is never charged on buildings", "Interest is charged on any overdraft."],
      ["Buildings cannot be bought with borrowed money", "Buildings are often bought with loans or mortgages."],
      ["Overdrafts must be repaid in exactly one month", "There is no fixed one-month rule."],
    ],
    answer: "A",
    explanation: "Long-term needs should be matched with long-term finance.",
    hints: ["How long will the building be used, and how long can the overdraft be relied on?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A seasonal clothing shop needs extra stock each November and sells it by January. What kind of finance need is this?",
    options: [
      ["A short-term working capital need", "Correct: repaid from sales within a few months."],
      ["A long-term capital expenditure need", "Stock is not a long-lasting asset."],
      ["A need for start-up capital", "The shop is already trading."],
      ["A need to replace non-current assets", "Stock is a current asset."],
    ],
    answer: "A",
    explanation: "Seasonal stock is a short-term need, financed by overdraft or trade credit.",
    hints: ["How long before the stock turns back into cash?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "In ZIMSEC Commerce, capital invested in buildings and machinery that stays in the business for many years is called:",
    options: [
      ["Long-term (fixed) capital", "Correct: it finances non-current assets."],
      ["Short-term (circulating) capital", "Short-term capital finances current assets."],
      ["Working capital", "Working capital is current assets minus current liabilities."],
      ["Called-up capital", "Called-up capital relates to shares."],
    ],
    answer: "A",
    explanation: "Long-term (fixed) capital is tied up in non-current assets.",
  });
  const needs = [["Second-hand delivery truck", 7800], ["Cold room for vegetables", 4300], ["Opening stock", 1650], ["Cash reserve", 900]];
  const total = sum(needs.map((x) => x[1]));
  b.calc({
    d: 2, skill: "APPLICATION", kind: "money", value: total,
    stem: `Sipho plans a vegetable wholesale business in Mutare. His estimated start-up needs are:\n\n${table(["Need", "US\\$"], needs)}\n\nCalculate the total start-up capital he needs.`,
    wrong: [needs[0][1] + needs[1][1], needs[2][1] + needs[3][1]],
    explanation: `${needs.map((x) => fmt(x[1])).join(" + ")} = ${money(total)}.`,
    workedSolution: `1. Add every need: ${needs.map((x) => fmt(x[1])).join(" + ")} = ${money(total)}.`,
  });
  const tn = [["Minibus", 9600], ["Workshop tools", 2750], ["Spare parts", 1180], ["Fuel float", 640]];
  const lt = tn[0][1] + tn[1][1];
  b.num({
    d: 3, skill: "ANALYSIS", kind: "money", value: lt,
    stem: `Tendai is starting a transport business. He needs a minibus (${money(tn[0][1])}), workshop tools (${money(tn[1][1])}), spare parts to be used in the first months (${money(tn[2][1])}) and a fuel float (${money(tn[3][1])}). How much of his finance is needed for **long-term** assets?`,
    wrong: [sum(tn.map((x) => x[1])), tn[2][1] + tn[3][1]],
    explanation: `The minibus and tools last many years: ${fmt(tn[0][1])} + ${fmt(tn[1][1])} = ${money(lt)}.`,
    hints: ["Which items will still be in use in five years?"],
  });
  const machine = 6200, own = 2450;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: machine - own, daily: true,
    stem: `A brick-making business wants a machine costing ${money(machine)}. It has ${money(own)} of retained profit to use. How much external finance does it need?`,
    wrong: [machine + own],
    explanation: `${fmt(machine)} − ${fmt(own)} = ${money(machine - own)}.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Paying wages is an example of revenue expenditure.",
    answer: true,
    explanation: "True. Wages are a day-to-day running cost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Inventory is a long-term finance need because a shop always holds some stock.",
    answer: false,
    explanation: "False. Each item of stock is sold and replaced within months, so it is a short-term (working capital) need.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the reason the business needs finance.",
    pairs: [
      ["A new hair salon buys chairs and dryers before opening", "Start-up capital"],
      ["A bakery opens a second branch in another town", "Expansion"],
      ["A transport firm replaces a lorry that has worn out", "Replacing non-current assets"],
      ["A shop pays suppliers before credit customers pay", "Working capital"],
    ],
    explanation: "Each stage and activity of a business creates a different need for finance.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Spending on non-current assets such as machinery is {{blank:a}} expenditure. Spending on day-to-day costs such as rent is {{blank:b}} expenditure.",
    blanks: [
      { id: "a", accepted: ["capital"], choices: ["capital", "revenue", "working", "current"] },
      { id: "b", accepted: ["revenue"], choices: ["capital", "revenue", "working", "current"] },
    ],
    explanation: "Capital expenditure buys long-lasting assets; revenue expenditure pays running costs.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name for the finance needed to set up a new business?",
    accepted: ["start-up capital", "start up capital", "startup capital", "start-up finance"],
    wrong: ["working capital"],
    explanation: "Start-up capital.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why an established business needs finance.",
    points: [
      "Reason, e.g. expansion (1)",
      "Explained, e.g. new branches or machinery need large sums before extra sales arrive (1)",
      "Reason, e.g. replacing assets / new technology / working capital (1)",
      "Explained, e.g. wages and suppliers must be paid before customers pay (1)",
    ],
    modelAnswer: "An established business needs finance to expand, for example to open a new branch, because the cost is paid long before extra sales arrive. It also needs working capital to pay wages and suppliers while waiting for credit customers to pay.",
    explanation: "Name each reason and explain why money is needed in advance.",
    hints: ["Think about growth and day-to-day running."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a business should match the length of its finance to the length of its need.",
    points: [
      "Long-term assets earn income over many years, so repayments can be spread (1)",
      "Short-term finance for a long-term asset may have to be repaid before the asset has earned enough (1)",
      "Short-term needs are repaid quickly from sales, so long-term finance would cost interest for longer than needed (1)",
      "Example, e.g. overdraft for a building risks the bank recalling it (1)",
    ],
    modelAnswer: "A machine earns income over many years, so it should be paid for with long-term finance whose repayments are spread over that time. If it were bought with an overdraft, the bank could demand repayment before the machine had earned enough. For short-term needs such as stock, long-term loans would mean paying interest long after the stock has been sold.",
    explanation: "Matching avoids repayment pressure and unnecessary interest.",
    hints: ["When does an asset earn the money to repay the finance?"],
  });
  const kit = [["Commercial ovens", 5400], ["Shop fittings", 2100], ["Flour, sugar and packaging", 1350], ["Rent and wages for the first month", 1800]];
  const kitT = sum(kit.map((x) => x[1]));
  const savings = 4000;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Nyasha plans to open a bakery in Bulawayo. Her estimated needs are:\n\n${table(["Need", "US\\$"], [...kit, ["Total", kitT]])}\n\nShe has ${money(savings)} of savings. Her bank has offered either an overdraft or a five-year loan.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: kitT - savings, type: "CALCULATION",
        stem: "Calculate the finance Nyasha needs in addition to her savings.",
        wrong: [kitT, kitT + savings],
        explanation: `${fmt(kitT)} − ${fmt(savings)} = ${money(kitT - savings)}.`,
      }),
      P.fib({
        label: "(b)", marks: 2,
        stem: "Classify the needs.",
        template: "The ovens are a {{blank:a}} need. Flour, sugar and packaging are a {{blank:b}} need.",
        blanks: [
          { id: "a", accepted: ["long-term"], choices: ["long-term", "short-term"] },
          { id: "b", accepted: ["short-term"], choices: ["long-term", "short-term"] },
        ],
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why Nyasha needs money for the first month's rent and wages before she opens.",
        points: ["Expenses are paid before sales revenue comes in (1)", "Sales may be slow at first while customers learn about the bakery (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend whether Nyasha should use the overdraft or the five-year loan for the ovens. Justify your answer.",
        points: ["Ovens are long-term assets used for years (1)", "Loan repayments spread over five years while the ovens earn income (1)", "Overdraft can be withdrawn at short notice / higher interest (1)", "Justified recommendation: loan for ovens; overdraft only for short-term gaps (1)"],
      }),
    ],
    explanation: `Total needs ${money(kitT)}; external finance ${money(kitT - savings)}. Long-term assets should be financed long-term.`,
    hints: ["Subtract her savings from the total.", "How long will the ovens last?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Gweru Metalworks (a fictional sole trader) makes window frames. Orders are rising, and the owner wants to buy computer-controlled cutting equipment and a second welding machine. Some of the existing machines are old and break down often.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Identify **three** reasons why Gweru Metalworks needs finance.",
        points: ["Expansion / extra capacity for rising orders (1)", "New technology: computer-controlled equipment (1)", "Replacing old machines (1)"],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "State whether these needs are short-term or long-term and give a reason.",
        points: ["Long-term (1)", "The machines will be used for many years (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the business will also need more working capital as orders rise.",
        points: ["More raw materials such as steel must be bought (1)", "More wages to pay (1)", "Customers may pay later, so cash is tied up before payment (1)"],
      }),
    ],
    explanation: "Expansion, new technology and replacement are long-term needs; rising orders also need more working capital.",
    hints: ["List what the owner wants to buy and why."],
  });
  b.card("DEFINITION", "Start-up capital", "Finance needed to set up a business: first assets, opening stock, deposits and early expenses.");
  b.card("CONCEPT", "Reasons businesses need finance", "Start-up, expansion, replacing non-current assets, new technology, working capital, temporary cash shortages.");
  b.card("DEFINITION", "Capital expenditure", "Spending on non-current assets used for more than a year (buildings, machinery, vehicles).");
  b.card("DEFINITION", "Revenue expenditure", "Spending on day-to-day running costs (wages, rent, electricity, materials).");
  b.card("CONCEPT", "Short-term versus long-term needs", "Short-term: stock, wages, seasonal gaps (under a year). Long-term: buildings, machinery, expansion (many years).");
  b.card("CONCEPT", "Matching principle", "Finance long-term needs with long-term sources and short-term needs with short-term sources.");
  b.card("DEFINITION", "Long-term and short-term capital (ZIMSEC)", "Long-term (fixed) capital is invested in non-current assets; short-term capital finances current assets and daily operations.", undefined, { applies: COM });
  b.card("FORMULA", "External finance needed", "External finance = total finance needed − funds already available (savings, retained profit).");
});
