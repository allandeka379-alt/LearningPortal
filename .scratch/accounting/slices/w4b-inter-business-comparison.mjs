// W4b: comparing two businesses (Cambridge 6.3). The concept is Cambridge-only, so items are tagged automatically.
import { concept, P, money } from "../lib.mjs";
import { ratios, table, fmt, r2, check, d1, d2 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.inter-business-comparison", { file: "analysis/inter-business-comparison", keyPrefix: "analysis.inter-business-comparison" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **inter-business comparison**?",
    options: [
      ["Comparing one business's ratios with another business's", "Correct: comparing different businesses for the same period."],
      ["Comparing one business's ratios over several years", "That is a trend (comparison over time)."],
      ["Comparing budgeted figures with actual figures", "That is budgetary control, not inter-business comparison."],
      ["Comparing a trial balance with the ledger accounts", "That is part of checking the records."],
    ],
    answer: "A",
    explanation: "Inter-business comparison judges a business against others, ideally in the same trade.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A supermarket has a much faster rate of inventory turnover than a jewellery shop. What is the main reason?",
    options: [
      ["They are different types of business", "Correct: everyday goods sell far faster than jewellery."],
      ["The supermarket uses straight-line depreciation", "Depreciation does not affect inventory turnover."],
      ["The jewellery shop has a later year end", "A year end might shift inventory a little, but not explain a large gap."],
      ["The supermarket has a higher gross margin", "Supermarkets usually have lower margins."],
    ],
    answer: "A",
    explanation: "Ratios differ naturally between trades; compare like with like.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two identical shops use different depreciation methods. Shop P's depreciation charge is higher. Compared with Shop Q, Shop P will show …",
    options: [
      ["a lower profit margin", "Correct: higher depreciation means lower profit for the same revenue."],
      ["a lower gross profit margin", "Depreciation is below gross profit."],
      ["a higher ROCE", "Lower profit usually means a lower ROCE."],
      ["a higher current ratio", "Depreciation does not affect current assets or liabilities."],
    ],
    answer: "A",
    explanation: "A different accounting policy changes the profit figure even though trading is the same.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Business X bought all its equipment ten years ago; Business Y bought identical equipment last year. Both earn the same profit. Why is X's ROCE likely to be higher?",
    options: [
      ["Its capital employed is lower", "Correct: its old assets are heavily depreciated, so the same profit is divided by a smaller figure."],
      ["X charges more depreciation every year", "Older assets usually carry less depreciation, not more, and profits are equal here."],
      ["X has a higher gross profit margin than Y", "The question says profits are the same."],
      ["X has a lower current ratio than Y", "The current ratio does not affect ROCE."],
    ],
    answer: "A",
    hints: ["ROCE = profit before interest ÷ capital employed."],
    explanation: "Old assets at a low net book value reduce capital employed, flattering ROCE.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **problem** of comparing two businesses using only their latest statements?",
    options: [
      ["One year may be unusual for either business", "Correct: a single year may not show the normal position."],
      ["Ratios turn figures into percentages", "This is what makes comparison possible."],
      ["Both businesses use the same year end", "This makes comparison easier, not harder."],
      ["Both businesses sell similar goods", "This also makes comparison fairer."],
    ],
    answer: "A",
    explanation: "Trends over several years are more reliable than one year's figures.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Shop M's year ends on 31 December, just after the festive season; Shop N's ends on 30 November. Which ratio is most likely to be distorted by the different dates?",
    options: [
      ["The acid test ratio", "Correct: inventory and cash on the two dates differ sharply."],
      ["The mark-up", "The mark-up depends on prices, which the date does not change."],
      ["The gross profit margin", "Margins over a whole year are not much affected by the closing date."],
      ["The profit margin", "This is a whole-year figure."],
    ],
    answer: "A",
    hints: ["Which ratios use figures from one date rather than the whole year?"],
    explanation: "Ratios built from statement of financial position figures (inventory, cash, payables) depend on the date; shops hold far more stock before a busy season.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A large wholesaler has a higher gross profit margin than a small retailer selling similar goods. Which factor most likely explains this?",
    options: [
      ["Bulk buying at lower unit cost", "Correct: size brings bigger purchase discounts."],
      ["Lower rent for its premises", "Rent is an expense below gross profit."],
      ["A longer credit period for customers", "Credit terms do not change the margin."],
      ["Smaller loans and less interest", "Interest is below gross profit."],
    ],
    answer: "A",
    explanation: "Economies of scale in buying raise gross profit for the same selling prices.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "An investor wants to compare two hardware shops fairly. Which step would make the comparison **most** reliable?",
    options: [
      ["Use several years of figures for both shops", "Correct: trends reduce the effect of one unusual year."],
      ["Compare the shops' revenue in dollars only", "Size differences make raw dollar figures misleading."],
      ["Use only the shop with the higher profit", "Comparison needs both businesses."],
      ["Ignore their accounting policies", "Different policies must be checked, not ignored."],
    ],
    answer: "A",
    hints: ["Think about the problems of comparison and which one this removes."],
    explanation: "Several years of data, similar policies and similar businesses all improve comparability.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If two businesses use different methods of depreciation, their profit figures may differ even though they trade identically.",
    answer: true,
    explanation: "True. Accounting policies affect reported profit and asset values.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A higher gross profit margin always shows that a business is better managed than another.",
    answer: false,
    explanation: "False. Margins depend on the type of business and strategy; a low-margin, high-volume business can be very successful.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each situation with the factor that explains why the two businesses' ratios differ.",
    right: ["Type of business", "Size", "Accounting policy", "Method of financing", "Location"],
    pairs: ["A bakery and a car dealer have very different inventory turnover", "A chain buys in bulk and gets bigger discounts than a corner shop", "One shop uses reducing balance depreciation, the other straight line", "One business pays loan interest, the other is funded by the owner", "A shop in central Harare pays far higher rent than one in a small town"],
    rightIndex: [0, 1, 2, 3, 4],
    hints: ["Ask what is really different about the two businesses in each case."],
    explanation: "Each situation is a typical reason why ratios differ between businesses.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Comparisons between businesses are most useful when the businesses are of the same {{blank:a}}, use the same {{blank:b}} policies and prepare statements to the same {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["type"], choices: ["type", "owner", "bank"] },
      { id: "b", accepted: ["accounting"], choices: ["accounting", "pricing", "marketing"] },
      { id: "c", accepted: ["date"], choices: ["date", "auditor", "customer"] },
    ],
    explanation: "Like-for-like comparison needs similar businesses, policies and year ends.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const A = { rev: 145000, gp: 43500 }, B = { rev: 88000, gp: 30800 };
    const gA = ratios.grossMargin(A.gp, A.rev), gB = ratios.grossMargin(B.gp, B.rev);
    check("ibc num1", r2(gB - gA), 5);
    b.calc({
      d: 3, kind: "pct", value: gB - gA, calculator: true, wrong: [d1(ratios.markUp(B.gp, B.rev - B.gp) - ratios.markUp(A.gp, A.rev - A.gp))],
      stem: `Shop A had revenue of ${money(A.rev)} and gross profit of ${money(A.gp)}. Shop B had revenue of ${money(B.rev)} and gross profit of ${money(B.gp)}. By how many percentage points is Shop B's gross profit margin higher than Shop A's? Give your answer to one decimal place.`,
      hints: ["Calculate each margin, then subtract."],
      explanation: `A: ${fmt(A.gp)} ÷ ${fmt(A.rev)} × 100 = ${d1(gA)}%. B: ${fmt(B.gp)} ÷ ${fmt(B.rev)} × 100 = ${d1(gB)}%. Difference ${d1(gB - gA)} percentage points.`,
    });
  }
  {
    const rev = 160000, gp = 52000, other = 30500, ce = 90000;
    const depA = 3000, depB = 7500;
    const roceA = ratios.roce(gp - other - depA, ce), roceB = ratios.roce(gp - other - depB, ce - (depB - depA));
    b.calc({
      d: 4, kind: "pct", value: roceB, calculator: true, wrong: [d1(ratios.roce(gp - other - depB, ce)), d1(roceA)],
      stem: `Two identical shops each have revenue of ${money(rev)}, gross profit of ${money(gp)} and other expenses (excluding depreciation) of ${money(other)}, and no loans. Shop C charges depreciation of ${money(depA)} and has capital employed of ${money(ce)}. Shop D charges depreciation of ${money(depB)}, so its capital employed is ${money(ce - (depB - depA))}. Calculate Shop D's ROCE, to one decimal place.`,
      hints: ["Profit = gross profit − other expenses − depreciation."],
      explanation: `Shop D profit = ${fmt(gp)} − ${fmt(other)} − ${fmt(depB)} = ${fmt(gp - other - depB)}. ROCE = ${fmt(gp - other - depB)} ÷ ${fmt(ce - (depB - depA))} × 100 = ${d1(roceB)}% (Shop C: ${d1(roceA)}%). Using Shop C's capital employed gives ${d1(ratios.roce(gp - other - depB, ce))}%.`,
    });
  }
  {
    const cos = 54000, oi = 5600, ci = 6400;
    const v = ratios.inventoryTurnover(cos, oi, ci);
    b.num({
      d: 2, kind: "times", value: v, wrong: [d1(cos / ci)],
      stem: `A hardware shop's cost of sales was ${money(cos)}; inventory was ${money(oi)} at the start and ${money(ci)} at the end of the year. The average rate of inventory turnover for hardware shops in the area is 6.5 times. Calculate the shop's rate of inventory turnover, to one decimal place.`,
      explanation: `Average inventory ${fmt((oi + ci) / 2)}; ${fmt(cos)} ÷ ${fmt((oi + ci) / 2)} = ${d1(v)} times, faster than the local average of 6.5.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** factors, other than accounting policies, that may cause the ratios of two businesses to differ.",
    points: ["Type of business / product range", "Size / location / method of financing / age of non-current assets / business strategy"],
    modelAnswer: "The two businesses may sell different types of goods, and one may be much larger and able to buy in bulk.",
    explanation: "Any two distinct factors.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Tendai's ROCE is 14%; his competitor's is 21%. Tendai's equipment is new; his competitor's is nine years old. Evaluate whether Tendai's business is performing worse.",
    points: ["Competitor's old equipment has a low net book value, so its capital employed is low and ROCE is flattered", "Tendai's new assets raise capital employed and depreciation, lowering his ROCE", "Conclusion: the gap may not mean worse performance; compare other ratios / several years / note competitor may soon need to replace equipment"],
    modelAnswer: "Not necessarily. The competitor's equipment is almost fully depreciated, so its capital employed is small and its ROCE looks high. Tendai's new equipment increases both his capital employed and his depreciation. The competitor will soon face replacement costs, so Tendai should compare margins and several years' results before concluding he is doing worse.",
    hints: ["Think about how asset age affects capital employed."],
    explanation: "Asset age is a key factor in comparing ROCE.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const T = { name: "Tatenda Traders", rev: 210000, cos: 155400, exp: 31500, int: 0, ce: 120000, ca: 33600, inv: 21000, cl: 16800 };
    const S = { name: "Sipho Stores", rev: 132000, cos: 85800, exp: 33360, int: 2400, ce: 95000, ca: 18900, inv: 12600, cl: 12600 };
    const calc = (x) => {
      const gp = x.rev - x.cos, np = gp - x.exp;
      return { gp, np, gpm: ratios.grossMargin(gp, x.rev), pm: ratios.profitMargin(np, x.rev), roce: ratios.roce(np + x.int, x.ce), cr: ratios.current(x.ca, x.cl), at: ratios.acidTest(x.ca, x.inv, x.cl) };
    };
    const t = calc(T), s = calc(S);
    const stim = table(["", "Tatenda Traders US\\$", "Sipho Stores US\\$"], [["Revenue", T.rev, S.rev], ["Cost of sales", T.cos, S.cos], ["Expenses (including any loan interest)", T.exp, S.exp], ["Loan interest included in expenses", "–", S.int], ["Capital employed", T.ce, S.ce], ["Current assets (including inventory)", T.ca, S.ca], ["Inventory", T.inv, S.inv], ["Current liabilities", T.cl, S.cl]]);
    b.struct({
      d: 4, examStyle: true, skill: "EVALUATION", calculator: true,
      stem: `Rudo has savings to invest and is considering two hardware businesses in Gweru. Their figures for 2025:\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: s.gpm, stem: "Calculate Sipho Stores' gross profit margin, to one decimal place.", explanation: `${fmt(s.gp)} ÷ ${fmt(S.rev)} × 100 = ${d1(s.gpm)}% (Tatenda Traders ${d1(t.gpm)}%).` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: s.roce, wrong: [d1(ratios.roce(s.np, S.ce))], stem: "Calculate Sipho Stores' return on capital employed, to one decimal place.", explanation: `Profit ${fmt(s.np)} + interest ${fmt(S.int)} = ${fmt(s.np + S.int)}; ÷ ${fmt(S.ce)} × 100 = ${d1(s.roce)}% (Tatenda Traders ${d1(t.roce)}%).` }),
        P.num({ label: "(c)", marks: 2, kind: "ratio", value: s.at, stem: "Calculate Sipho Stores' acid test ratio, as x : 1 to two decimal places.", explanation: `(${fmt(S.ca)} − ${fmt(S.inv)}) ÷ ${fmt(S.cl)} = ${d2(s.at)} : 1 (Tatenda Traders ${d2(t.at)} : 1).` }),
        P.manual({ label: "(d)", marks: 2, stem: "State **two** problems Rudo may face in comparing the two businesses.", points: ["Different sizes / product ranges / customers", "Different accounting policies, year ends, only one year's figures, or different financing (Sipho has a loan)"], modelAnswer: "Tatenda Traders is much larger, so it may buy in bulk; and the businesses may use different depreciation policies, so their profits are not calculated in the same way.", explanation: "Any two valid problems." }),
        P.manual({ label: "(e)", marks: 3, stem: "Advise Rudo which business appears the better investment. Justify your answer using the ratios.", points: [`Sipho Stores has the higher gross margin (${d1(s.gpm)}% v ${d1(t.gpm)}%)`, `Tatenda Traders has the higher ROCE (${d1(t.roce)}% v ${d1(s.roce)}%) and better liquidity (acid test ${d2(t.at)} v ${d2(s.at)} : 1)`, "Conclusion with justification, e.g. Tatenda Traders, because return on capital and liquidity matter most to an investor (or reasoned alternative)"], modelAnswer: `Sipho Stores earns a higher gross margin (${d1(s.gpm)}% against ${d1(t.gpm)}%), but its expenses and loan interest are high, so its ROCE is only ${d1(s.roce)}% compared with ${d1(t.roce)}% for Tatenda Traders. Tatenda Traders is also more liquid (acid test ${d2(t.at)} : 1 against ${d2(s.at)} : 1). Rudo should prefer Tatenda Traders, after checking that both use similar accounting policies.`, explanation: "A justified recommendation using at least two ratios." }),
      ],
      hints: ["ROCE uses profit before interest.", "Acid test = (current assets − inventory) ÷ current liabilities."],
      explanation: `Tatenda Traders: GPM ${d1(t.gpm)}%, ROCE ${d1(t.roce)}%, acid test ${d2(t.at)} : 1. Sipho Stores: GPM ${d1(s.gpm)}%, ROCE ${d1(s.roce)}%, acid test ${d2(s.at)} : 1.`,
    });
  }
  // ---------------------------------------------------------------- Practice structured 2 (policies)
  {
    const gp = 48000, other = 27200, cost = 32000;
    const slA = r2(cost * 0.125), rbB = r2(cost * 0.3);
    const npA = gp - other - slA, npB = gp - other - rbB;
    check("ibc s2", r2(npA - npB), 5600);
    b.struct({
      d: 3, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Nyasha and Farai each opened a stationery shop on 1 January 2025 with equipment costing ${money(cost)}. In 2025 both shops made gross profit of ${money(gp)} and had other expenses of ${money(other)}. Nyasha depreciates equipment at 12.5% per annum straight line; Farai uses 30% per annum reducing balance.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: npA, stem: "Calculate Nyasha's profit for 2025.", explanation: `Depreciation ${fmt(slA)}; ${fmt(gp)} − ${fmt(other)} − ${fmt(slA)} = ${fmt(npA)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: npB, stem: "Calculate Farai's profit for 2025.", explanation: `Depreciation ${fmt(rbB)}; ${fmt(gp)} − ${fmt(other)} − ${fmt(rbB)} = ${fmt(npB)}.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why a comparison of the two shops' profit margins could mislead an investor, and what the investor should do.", points: [`The difference of ${fmt(npA - npB)} is caused only by the depreciation policy, not by trading`, "So Farai's profit margin looks lower although the businesses performed equally", "Investor should adjust to the same policy / compare gross margins / check accounting policies before comparing"], modelAnswer: `Both shops traded identically; Farai's profit is ${money(npA - npB)} lower only because he charges more depreciation in the first year. His profit margin therefore looks worse. An investor should restate both on the same depreciation policy, or compare gross margins, before judging them.`, explanation: "Accounting policies affect comparability." }),
      ],
      hints: ["Reducing balance in year 1 = rate × cost."],
      explanation: `Nyasha ${fmt(npA)}; Farai ${fmt(npB)}.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Inter-business comparison", "Comparing the results and ratios of one business with another, ideally in the same trade and period.");
  b.card("FACT", "Factors that make two businesses' ratios differ", "Type of business, size, location, financing, accounting policies, age of assets, strategy.");
  b.card("FACT", "Problems of inter-business comparison", "Different accounting policies, year ends, sizes, types of business, one year's data only, limited information, historic cost.");
  b.card("CONCEPT", "Old, depreciated assets and ROCE", "Low net book value lowers capital employed, so ROCE looks higher.");
  b.card("CONCEPT", "Different depreciation policies", "Change profit and asset values for identical trading, so the ratios are not comparable.");
  b.card("CONCEPT", "Different year ends", "Inventory, cash and payables on the two dates may differ, distorting liquidity and efficiency ratios.");
  b.card("FACT", "Making comparisons fairer", "Compare similar businesses, use several years, check accounting policies and year ends.");
  b.card("CONCEPT", "Is a higher margin always better?", "No: a high-volume, low-margin business may earn more profit and a higher return than a low-volume, high-margin one.");
});
