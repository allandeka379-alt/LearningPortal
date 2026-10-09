// W4a: ZIMSEC Commerce Paper 2 exam-format items: 2 × 7-mark and 1 × 6-mark Section A structured questions and
// 2 × 20-mark Section B essays. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, money, fmt, r2, round, table, COM } from "../lib.mjs";

const L8 = [[3, 6, 8, "Well-developed explanation of several relevant points, applied with examples."], [2, 3, 5, "Some explanation of relevant points; limited examples."], [1, 1, 2, "Points listed with little or no explanation."]];
const L10 = [[3, 7, 10, "Detailed, accurate explanation of a full range of points, each developed with examples."], [2, 4, 6, "Several relevant points with some development."], [1, 1, 3, "A few points listed, little development."]];
const L12 = [[3, 9, 12, "Balanced discussion of both sides, well developed, with a justified conclusion."], [2, 5, 8, "Some discussion of both sides, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points on one side, little explanation, no conclusion."]];

concept("bus.finance.shares-debentures", { file: "exam/w4a-commerce", keyPrefix: "exam.w4a-commerce", applies: COM }, (b) => {
  // 7 marks: shares, dividends and the stock exchange.
  const ord = 200000, pref = 50000, pr = 6, avail = 27000;
  const pd = r2((pref * pr) / 100), od = r2(avail - pd);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 480, calculator: true, paper: "Paper 2",
    concepts: ["bus.finance.shares-debentures", "bus.finance.stock-exchange"],
    stem: `Kopje Paints Ltd (a fictional company listed on the Zimbabwe Stock Exchange) has issued 200,000 ordinary shares of US\\$1 each and 50,000 ${pr}% preference shares of US\\$1 each. Profit available for dividends this year is ${money(avail)}. Tatenda bought some of its ordinary shares last month because he expects the share price to rise.`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "What type of speculator is Tatenda?",
        options: [["A bull", "Correct: he buys expecting a rise."], ["A bear", "Bears sell expecting a fall."], ["A stag", "Stags buy new issues."], ["A jobber", "A jobber is a dealer, not a speculator."]],
        answer: "A",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "pct", value: (od / ord) * 100, type: "CALCULATION",
        stem: "Calculate the ordinary dividend as a percentage of the nominal value, to one decimal place.",
        wrong: [round((avail / ord) * 100, 1)],
        explanation: `Preference dividend = ${pr}% × ${fmt(pref)} = ${money(pd)}; ordinary = ${fmt(avail)} − ${fmt(pd)} = ${money(od)}; ${fmt(od)} ÷ ${fmt(ord)} × 100 = ${round((od / ord) * 100, 1)}%.`,
        workedSolution: `1. Preference dividend = ${pr}% × ${fmt(pref)} = ${fmt(pd)}.\n2. For ordinary shareholders = ${fmt(avail)} − ${fmt(pd)} = ${fmt(od)}.\n3. ${fmt(od)} ÷ ${fmt(ord)} × 100 = ${round((od / ord) * 100, 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** differences between ordinary shares and preference shares.",
        points: [
          "Dividend: ordinary varies with profit; preference fixed rate (1)",
          "Developed: preference paid first (1)",
          "Voting: ordinary shareholders vote; preference usually do not / repayment order on winding up (1)",
          "Developed: ordinary holders control the company but bear more risk (1)",
        ],
        modelAnswer: "Ordinary shareholders receive a dividend that varies with profit, whereas preference shareholders receive a fixed rate that is paid before any ordinary dividend. Ordinary shareholders can vote and so control the company, while preference shareholders usually cannot vote but are repaid before ordinary shareholders if the company is wound up.",
      }),
    ],
    explanation: `(a) Bull. (b) Preference dividend ${money(pd)}; ordinary dividend ${round((od / ord) * 100, 1)}%. (c) Fixed versus variable dividend, priority, votes and risk.`,
    hints: ["Does Tatenda expect a rise or a fall?", "Pay the preference dividend first."],
  });

  // 7 marks: taxation and ZIMRA.
  const pre = 460, vat = 15;
  const v = r2((pre * vat) / 100);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: true, paper: "Paper 2",
    concepts: ["bus.finance.taxation"],
    stem: `Rudo imports small generators from a neighbouring country and sells them from her shop in Chinhoyi. Assume a VAT rate of ${vat}%. A generator's price before VAT is ${money(pre)}. Rudo also pays customs duty at the border and income tax on her profits.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: r2(pre + v), type: "CALCULATION",
        stem: "Calculate the price of a generator including VAT.",
        wrong: [v],
        explanation: `VAT = ${vat}% × ${fmt(pre)} = ${fmt(v)}; price = ${money(r2(pre + v))}.`,
      }),
      P.fib({
        label: "(b)", marks: 1,
        stem: "Complete the sentence.",
        template: "Income tax on Rudo's profits is an example of a {{blank:a}} tax.",
        blanks: [{ id: "a", accepted: ["direct"], choices: ["direct", "indirect"] }],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** functions of the Zimbabwe Revenue Authority (ZIMRA) that affect Rudo's business.",
        points: [
          "Collects customs duty on her imports at the border (1)",
          "Checks her declaration / prevents smuggling, so she must declare the true value (1)",
          "Collects VAT and income tax / registers taxpayers (1)",
          "Audits her records; penalties if she under-declares (1)",
        ],
        modelAnswer: "ZIMRA collects customs duty on the generators when Rudo brings them across the border, checking her declaration so that she pays duty on their true value. It also collects the VAT she charges customers and the income tax on her profits, and it may audit her records and charge penalties if she has under-declared.",
      }),
    ],
    explanation: `(a) ${money(r2(pre + v))}. (b) Direct. (c) ZIMRA collects duties and taxes, controls borders and audits taxpayers.`,
    hints: ["VAT = rate × price before VAT.", "Who pays income tax directly?"],
  });

  // 6 marks: money and inflation.
  const old = 150, now = 168;
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 420, calculator: true, paper: "Paper 2",
    concepts: ["bus.finance.money"],
    stem: `A family in Kwekwe spent ${money(old)} on its usual monthly groceries last year. This year the same groceries cost ${money(now)}. The family keeps its savings in cash at home.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "pct", value: ((now - old) / old) * 100, type: "CALCULATION",
        stem: "Calculate the percentage rise in the cost of the groceries, to one decimal place.",
        wrong: [round(((now - old) / now) * 100, 1)],
        explanation: `(${now} − ${old}) ÷ ${old} × 100 = ${round(((now - old) / old) * 100, 1)}%.`,
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Rising prices most weaken which function of money for this family?",
        options: [["Store of value", "Correct: saved cash buys less each year."], ["Medium of exchange", "Money is still accepted in payment."], ["Measure of value", "Prices are still stated in money."], ["Portability", "Portability is a quality, not a function."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how inflation affects the family's savings and suggest **one** way to protect them.",
        points: ["Cash savings buy fewer goods / lose purchasing power (1)", "No interest is earned to offset rising prices (1)", "Suggestion: savings account or fixed deposit earning interest / buying assets that keep value (1)"],
      }),
    ],
    explanation: `(a) ${round(((now - old) / old) * 100, 1)}%. (b) Store of value. (c) Idle cash loses purchasing power; interest-earning accounts or assets protect value.`,
    hints: ["Divide the increase by last year's cost."],
  });

  // Essay 1 (20 marks): commercial bank services and trends in banking.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.finance.commercial-banks", "bus.finance.banking-trends"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe **five** services that commercial banks offer to businesses.",
        points: [
          ["Current accounts: payments by cheque, card and transfer; statements", 2],
          ["Overdrafts and loans: short- and long-term finance, often secured", 2],
          ["Electronic transfers / RTGS / standing and debit orders for paying suppliers and staff", 2],
          ["Foreign exchange and letters of credit for importers and exporters", 2],
          ["Night safes, safe custody, advice, POS machines or payroll services", 2],
        ],
        levels: L10,
        modelAnswer: "Commercial banks provide current accounts through which a business receives payments and pays suppliers by cheque, card and electronic transfer, with a statement showing every transaction. They lend through overdrafts, which cover short gaps in cash, and loans for equipment and expansion, usually secured on assets. They transfer money electronically, including RTGS payments between banks, and set up standing orders and debit orders so that rent and insurance are paid automatically. For firms in foreign trade they exchange currencies and issue letters of credit that guarantee payment to overseas suppliers. Banks also provide night safes for depositing takings after hours, safe custody of documents, point-of-sale machines for card payments, payroll services and financial advice.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Discuss the impact of mobile money and agency banking on Zimbabwe's economy.",
        points: [
          "Financial inclusion: rural and low-income people can pay and save (1)",
          "Faster, cheaper payments speed up trade (1)",
          "Less cash handled: safer, easier to trace transactions / tax (1)",
          "Remittances reach families quickly, supporting spending (1)",
          "Agents (shops) earn commission; more customers for small businesses (1)",
          "Banks reach customers without costly branches (1)",
          "Against: transaction charges reduce incomes (1)",
          "Against: fraud, network failures (1)",
          "Against: job losses in bank branches / people without phones excluded (1)",
          "Justified conclusion (1)",
        ],
        levels: L10,
        modelAnswer: "Mobile money and agency banking have brought financial services to people who live far from bank branches, so rural households and informal traders can now receive, send and save money. Payments are faster and cheaper than travelling to town, which speeds up trade, and less cash is carried, which reduces theft and makes transactions easier to trace. Remittances from relatives reach families within minutes, supporting spending in local shops. Shops that act as agents earn commission and attract more customers, while banks reach new customers without building branches. However, every transaction carries a charge, which takes a share of small incomes; fraud and network failures cause losses and disruption; some bank tellers lose their jobs as branches close; and people without phones or network coverage are left behind. Overall the impact has been strongly positive because it has widened access to payments, but charges, security and coverage must be improved.",
      }),
    ],
    explanation: "(a) Accounts, lending, transfers, foreign trade services and other services. (b) Inclusion, faster trade, safety and remittances against charges, fraud, job losses and exclusion.",
    hints: ["(a) Think about accounts, lending and payments.", "(b) Consider people, businesses, banks and the economy."],
  });

  // Essay 2 (20 marks): the Reserve Bank and the Zimbabwe Stock Exchange.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.finance.reserve-bank", "bus.finance.stock-exchange"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Explain **four** functions of the Reserve Bank of Zimbabwe.",
        points: [
          ["Issues notes and coins: sole issuer, controls supply, prevents forgery", 2],
          ["Banker to the government: keeps accounts, manages borrowing, advises", 2],
          ["Banker to banks / lender of last resort: holds reserves, settles, lends when banks are short", 2],
          ["Monetary policy / supervision / foreign reserves", 2],
        ],
        levels: L8,
        modelAnswer: "The Reserve Bank is the sole issuer of notes and coins; it controls how much currency is in circulation, which helps prevent inflation, and protects notes against forgery. It is banker to the government, keeping its accounts, receiving revenue, making payments and managing borrowing through treasury bills. It is banker to the commercial banks, which keep reserves with it and settle payments between themselves through it, and it acts as lender of last resort to a bank short of cash so that depositors do not panic. It also carries out monetary policy, raising or lowering its policy rate to control borrowing and inflation, and it licenses and supervises banks to protect depositors.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "\"The Zimbabwe Stock Exchange benefits only the rich.\" Discuss.",
        points: [
          "Agree: mainly wealthy people and institutions own shares directly (1)",
          "Agree: brokerage and minimum deals deter small investors (1)",
          "Agree: speculators gain from price swings (1)",
          "Agree: only large listed companies can raise capital there (1)",
          "Disagree: pension funds and insurers invest ordinary workers' savings there (1)",
          "Disagree: companies raise capital, expand and create jobs (1)",
          "Disagree: market for second-hand shares gives liquidity to all investors (1)",
          "Disagree: government can raise funds for public services / privatisation (1)",
          "Disagree: attracts foreign investment; share prices signal confidence (1)",
          "Disagree: listing rules protect small investors with information (1)",
          ["Justified conclusion", 2],
        ],
        levels: L12,
        modelAnswer: "It can be argued that the stock exchange mainly benefits the rich, because those who own shares directly are usually wealthy individuals and large institutions, brokerage costs deter small savers, and speculators can profit from short-term price changes. Only large public companies can raise capital there. However, ordinary workers benefit indirectly, because their pension and insurance contributions are invested in listed shares. Companies use the exchange to raise capital for expansion, which creates jobs and output for everyone. The exchange gives all investors, large or small, a market in which they can sell shares when they need cash, and listing rules force companies to publish information that protects small investors. The government can also raise funds, and an active exchange attracts foreign investment. In conclusion, the direct gains go largely to wealthier investors, but the wider benefits in jobs, pensions and investment reach the whole economy, so the statement is only partly true.",
      }),
    ],
    explanation: "(a) Currency issue, banker to government and banks, lender of last resort, monetary policy, supervision. (b) Direct ownership favours the wealthy, but pensions, jobs, liquidity and investment spread the benefits; justified conclusion.",
    hints: ["(a) Who are the Reserve Bank's customers?", "(b) Who owns pension funds?"],
  });
});
