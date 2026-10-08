// W3b: econ.inflation.effects-policies — effects of inflation on consumers, workers, savers, lenders, borrowers,
// producers, government and the economy; functions of money in high inflation; monetary, fiscal and supply-side
// policies to control inflation. Figures differ from the lesson's worked examples.
import { concept, P, ZIM, table, prices, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.inflation.effects-policies", { file: "inflation/effects-policies", keyPrefix: "inflation.effects-policies" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Who is most likely to **gain** from unexpected inflation?",
    options: [
      ["A person repaying a fixed-rate loan", "Correct: the real value of the debt falls."],
      ["A pensioner on a fixed pension", "A fixed income buys less as prices rise."],
      ["A saver earning a low fixed interest rate", "The real value of savings falls."],
      ["A bank that lent money at a fixed rate", "Lenders are repaid in money worth less."],
    ],
    answer: "A",
    explanation: "Inflation reduces the real value of fixed debts, helping borrowers at the expense of lenders.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which function of money is usually the **first** to be damaged by high inflation?",
    options: [
      ["Store of value", "Correct: money held loses purchasing power."],
      ["Medium of exchange", "Money is still used for buying until inflation becomes extreme."],
      ["Unit of account", "Prices are still quoted in money at first, though they change often."],
      ["Means of producing goods", "This is not a function of money."],
    ],
    answer: "A",
    explanation: "As prices rise, money kept for later buys less, so it fails first as a store of value; in hyperinflation the other functions fail too.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Savers lose from inflation when",
    options: [
      ["the rate of inflation is higher than the interest rate on their savings.", "Correct: the real interest rate is then negative."],
      ["the interest rate is higher than the rate of inflation.", "Then the real value of savings rises."],
      ["prices are falling.", "Falling prices raise the real value of savings."],
      ["they keep their savings in a bank account rather than at home.", "Cash kept at home earns no interest, so it loses even more value; what matters is the real interest rate."],
    ],
    answer: "A",
    explanation: "Savings lose real value when inflation exceeds the interest earned.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Inflation is caused by rapidly rising consumer spending. Which monetary measure would help to reduce it?",
    options: [
      ["Raising interest rates", "Correct: borrowing falls and saving rises, reducing spending."],
      ["Cutting interest rates", "This encourages borrowing and spending."],
      ["Increasing the money supply", "More money adds to spending."],
      ["Cutting income tax", "Taxes are fiscal policy, and a cut would raise spending."],
    ],
    answer: "A",
    explanation: "Tight monetary policy reduces aggregate demand, which tackles demand-pull inflation.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which **fiscal** measure would help to reduce demand-pull inflation?",
    options: [
      ["Reducing government spending", "Correct: lower spending reduces aggregate demand."],
      ["Raising the central bank's interest rate", "This is monetary policy."],
      ["Increasing grants paid to households", "This raises spending."],
      ["Cutting company tax", "This raises firms' spending power."],
    ],
    answer: "A",
    explanation: "Contractionary fiscal policy (lower spending, higher taxes) reduces aggregate demand.",
  });
  {
    const i = 6, inf = 10;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `A bank pays ${i}% interest on savings while inflation is ${inf}%. What is the approximate real interest rate?`,
      options: [
        [`−${inf - i}%`, `Correct: ${i}% − ${inf}% = −${inf - i}%.`],
        [`+${inf - i}%`, "The sign is wrong: inflation is higher than the interest rate."],
        [`+${inf + i}%`, "The rates are subtracted, not added."],
        [`+${i}%`, "This ignores inflation."],
      ],
      answer: "A",
      hints: ["Real interest rate ≈ nominal interest rate − inflation."],
      explanation: `Real interest rate ≈ ${i} − ${inf} = −${inf - i}%: savers lose purchasing power.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A country's inflation rate is much higher than that of its trading partners, and its exchange rate does not change. What is the most likely effect?",
    options: [
      ["Its exports become less competitive and imports more attractive", "Correct: its goods become relatively dearer."],
      ["Its exports become more competitive abroad", "Rising domestic prices make exports dearer."],
      ["Imports fall because foreign goods become dearer for domestic buyers", "Foreign goods become relatively cheaper."],
      ["The current account must move into surplus", "Lower exports and higher imports worsen the current account."],
    ],
    answer: "A",
    hints: ["Compare its prices with foreign prices."],
    explanation: "Higher relative inflation makes domestic goods dearer than foreign goods, harming exports and the current account.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Inflation in a fictional country is caused by a sharp rise in world fuel prices, while output is already falling. Why might a large rise in interest rates be an unsuitable response?",
    options: [
      ["It would deepen the fall in output and jobs without tackling the cause", "Correct: the inflation is cost-push."],
      ["It would raise world fuel prices even more", "Domestic interest rates do not set world fuel prices."],
      ["It would increase consumer borrowing and spending", "Higher rates reduce borrowing."],
      ["It would make imported fuel more expensive by weakening the currency", "Higher rates tend to strengthen the currency, making imports cheaper."],
    ],
    answer: "A",
    hints: ["Is this inflation caused by too much spending?"],
    explanation: "For cost-push inflation, cutting demand reduces prices only by reducing output and employment further.",
  });

  // Numericals.
  {
    const n = 9, inf = 13.5, r = n - inf;
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: r, dp: 1, daily: true,
      stem: `A savings account pays ${n}% interest a year while inflation is ${inf}%. Using nominal interest rate minus inflation, calculate the approximate real interest rate, in per cent. Give a negative rate as a negative number, to one decimal place.`,
      wrong: [-r, n + inf],
      explanation: `Real rate ≈ ${n} − ${inf} = **${fmt(r, 1)}%**: the saver loses purchasing power.`,
    });
  }
  {
    const p = 240, idx = 125, real = prices.realValue(p, idx);
    check("real", real, 192);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: real,
      stem: `Thandeka receives a fixed pension of US\\$${p} a month. Over two years the price index rises from 100 to ${idx}. Calculate the real value of her pension in the prices of two years ago, in US\\$.`,
      wrong: [p * idx / 100, p - 25],
      hints: ["Real value = money value ÷ price index × 100."],
      explanation: `1. Real value = ${p} ÷ ${idx} × 100 = **US\\$${real}**.\n2. Her pension buys ${pct(((p - real) / p) * 100, 0)} less than before, although the money amount has not changed.`,
    });
  }
  {
    const dep = 2500, i = 6, inf = 10, nominal = dep * (1 + i / 100), real = prices.realValue(nominal, 100 + inf);
    check("nom", nominal, 2650);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: real, dp: 2, tol: 0.006, calculator: true,
      stem: `Farai saves US\\$${fmt(dep)} for a year at ${i}% interest. Over the year the price index rises from 100 to ${100 + inf}. Calculate the real value of his savings at the end of the year, in start-of-year prices, in US\\$ to two decimal places.`,
      wrong: [nominal, dep * (1 + (i - inf) / 100)],
      hints: ["First add the interest.", "Then divide by the price index and multiply by 100."],
      explanation: `1. Savings with interest = ${fmt(dep)} × 1.0${i} = US\\$${fmt(nominal)}.\n2. Real value = ${fmt(nominal)} ÷ ${100 + inf} × 100 = **US\\$${fmt(real, 2)}**.\n3. This is less than US\\$${fmt(dep)}: the saver lost purchasing power. (The quick approximation, 2,500 × (1 − 0.04) = US\\$${fmt(dep * 0.96)}, is close but not exact.)`,
    });
  }
  {
    const w0 = 500, w1 = 540, inf = 12, real1 = prices.realValue(w1, 100 + inf), ch = pctChange(w0, real1);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: ch, calculator: true,
      stem: `Nyasha's monthly wage rises from US\\$${w0} to US\\$${w1} in a year when prices rise by ${inf}%. Calculate the percentage change in her real wage. Give a fall as a negative number, to one decimal place.`,
      wrong: [pctChange(w0, w1), pctChange(w0, w1) - inf, -ch],
      hints: ["Convert the new wage into start-of-year prices.", "Compare it with the old wage."],
      explanation: `1. Real value of the new wage = ${w1} ÷ ${100 + inf} × 100 = US\\$${fmt(real1, 2)}.\n2. Change = (${fmt(real1, 2)} − ${w0}) ÷ ${w0} × 100 = **${fmt(ch, 1)}%**.\n3. Her money wage rose by ${pct(pctChange(w0, w1), 0)}, but prices rose faster, so her real wage fell. (8 − 12 = −4 is only an approximation.)`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "People on fixed incomes, such as some pensioners, are harmed by inflation.",
    answer: true,
    explanation: "True. Their money income stays the same while prices rise, so their real income falls.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Supply-side policies reduce inflation mainly by cutting aggregate demand.",
    answer: false,
    explanation: "False. Supply-side policies raise productive capacity and lower costs; it is monetary and fiscal policies that cut aggregate demand.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each group with how it is usually affected by unexpected inflation.",
    pairs: ["Borrowers with fixed-rate loans", "Savers earning less interest than the rate of inflation", "Pensioners on fixed pensions", "Banks that made fixed-rate loans"],
    right: ["Gain", "Lose"],
    rightIndex: [0, 1, 1, 1],
    explanation: "Inflation transfers real wealth from lenders and savers to borrowers, and reduces fixed real incomes.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "To control demand-pull inflation, the central bank can {{blank:a}} interest rates and the government can {{blank:b}} its spending. Both measures {{blank:c}} aggregate demand, but they may also {{blank:d}} unemployment.",
    blanks: [
      { id: "a", accepted: ["raise"], choices: ["raise", "cut"] },
      { id: "b", accepted: ["cut"], choices: ["raise", "cut"] },
      { id: "c", accepted: ["reduce"], choices: ["increase", "reduce"] },
      { id: "d", accepted: ["increase"], choices: ["increase", "reduce"] },
    ],
    wrong: [["cut", "raise", "increase", "reduce"]],
    hints: ["Both policies take spending out of the economy."],
    explanation: "Higher interest rates and lower government spending reduce demand and inflation, at the risk of higher unemployment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Explain how very high inflation affects **two** functions of money.",
    points: [
      "Identifies store of value.",
      "Explains: money held loses purchasing power quickly, so people hold goods, livestock or foreign currency instead.",
      "Identifies a second function: medium of exchange / unit of account / standard of deferred payment.",
      "Explains it, e.g. lenders refuse to lend in the currency because repayments lose value; sellers refuse the currency and use foreign currency or barter.",
    ],
    modelAnswer: "First, money stops being a good store of value: prices rise so fast that money kept for later buys much less, so people spend it immediately or hold goods, cattle or foreign currency instead. Second, it fails as a standard of deferred payment: lenders will not lend in the currency, because the money they are repaid will be worth far less, so loans and contracts are written in a stable foreign currency.",
    hints: ["Think about saving money and lending money."],
    explanation: "Identify (1) + explain (1) for each function.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how high inflation can reduce investment and economic growth.",
    points: [
      "Inflation makes future prices, costs and profits uncertain.",
      "Firms find it hard to plan, so they postpone investment in machinery and buildings.",
      "Savings fall (negative real interest rates), reducing funds for lending to firms.",
      "Less investment means slower growth of productive capacity, so economic growth slows.",
    ],
    modelAnswer: "High and unstable inflation makes it hard for firms to know what their costs, prices and profits will be in future, so they postpone investment in new machinery and buildings. When inflation is higher than interest rates, people save less, so banks have fewer funds to lend for investment. With less investment, productive capacity grows more slowly, so economic growth slows.",
    hints: ["Uncertainty and savings are the key links."],
    explanation: "Uncertainty → postponed investment; negative real rates → less saving → less finance; lower capacity growth.",
  });

  // Structured 1: who gains and loses.
  {
    const yrs = ["2025", "2026"], cpi = [100, 115], pension = [180, 180], wage = [600, 654], loanRate = 9, saveRate = 5;
    const inf = prices.inflationRate(cpi[0], cpi[1]), realW = prices.realValue(wage[1], cpi[1]), realP = prices.realValue(pension[1], cpi[1]);
    const wCh = pctChange(wage[0], realW);
    check("inf", inf, 15); check("realP", realP, 156.5217, 0.001);
    const T = table(["", ...yrs], [["Consumer Price Index", ...cpi], ["Monthly pension (US\\$)", ...pension], ["Average monthly wage of factory workers (US\\$)", ...wage]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `The table shows data for a fictional country. During 2026, banks charged ${loanRate}% interest on fixed-rate loans and paid ${saveRate}% on savings.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: realP, dp: 2, tol: 0.006, stem: "Calculate the real value of the monthly pension in 2026, in 2025 prices, in US\\$ to two decimal places.", wrong: [pension[1] * cpi[1] / 100], explanation: `${pension[1]} ÷ ${cpi[1]} × 100 = US\\$${fmt(realP, 2)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: wCh, stem: "Calculate the percentage change in the real wage of factory workers between 2025 and 2026. Give a fall as a negative number, to one decimal place.", wrong: [pctChange(wage[0], wage[1]), -wCh], explanation: `Real wage 2026 = ${wage[1]} ÷ ${cpi[1]} × 100 = ${fmt(realW, 2)}; change = (${fmt(realW, 2)} − ${wage[0]}) ÷ ${wage[0]} × 100 = ${fmt(wCh, 1)}%.` }),
        P.fib({
          label: "(c)", marks: 2,
          stem: "Complete the sentence.",
          template: "In 2026 the real interest rate on savings was about {{blank:a}}%, so savers {{blank:b}}.",
          blanks: [
            { id: "a", accepted: [String(saveRate - inf)], choices: [String(saveRate - inf), String(inf - saveRate), String(saveRate), String(loanRate - inf)] },
            { id: "b", accepted: ["lost"], choices: ["gained", "lost"] },
          ],
          wrong: [[String(inf - saveRate), "gained"]],
          explanation: `${saveRate}% − ${inf}% = ${saveRate - inf}%: a negative real rate, so savings lost purchasing power.`,
        }),
        P.manual({
          label: "(d)", marks: 2,
          stem: "Explain why people who took out fixed-rate loans in 2025 gained from the inflation in 2026.",
          points: [`Inflation (${inf}%) was higher than the loan interest rate (${loanRate}%): real interest rate negative.`, "They repay in money worth less, so the real burden of the debt falls (their incomes may rise with prices)."],
          modelAnswer: `Inflation of ${inf}% was higher than the ${loanRate}% interest rate on their loans, so the real interest rate was negative. Borrowers repay with money that buys less than the money they borrowed, and if their incomes rise with prices the debt becomes easier to repay.`,
          explanation: "Negative real interest rate reduces the real debt.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government should raise pensions in line with the CPI every year.",
          points: [
            `For: protects pensioners' real income (fell to US\\$${fmt(realP, 2)}); pensioners cannot bargain for increases; reduces poverty.`,
            "Against: costly; raises government spending and the deficit; may add to demand and inflation; opportunity cost.",
            "The CPI basket may not match pensioners' spending (more on food and health), so even indexing may not fully protect them.",
            "Justified conclusion.",
          ],
          modelAnswer: `Pensioners lost about ${pct(((pension[0] - realP) / pension[0]) * 100, 0)} of their real income in 2026, and unlike workers they cannot bargain for higher pay, so indexing pensions to the CPI would protect some of the poorest people. However, it raises government spending every year, which widens the deficit or needs higher taxes and may add to demand, and the money cannot be used elsewhere. The CPI may also understate pensioners' inflation because they spend more on food and medicines. On balance pensions should be indexed, because the burden of inflation otherwise falls on a vulnerable group, but the government should also tackle inflation itself, so that indexing does not become very costly.`,
          explanation: "Protection of real incomes versus cost and inflationary pressure; conclude.",
        }),
      ],
      hints: ["Real value = money value ÷ price index × 100.", "Real interest rate ≈ nominal rate − inflation."],
      explanation: `Inflation ${pct(inf, 0)}; real pension US\\$${fmt(realP, 2)}; real wage change ${fmt(wCh, 1)}%; real interest rate on savings ${saveRate - inf}%.`,
    });
  }
  // Structured 2: choosing a policy.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country, consumer credit has grown rapidly, the government has increased spending on public-sector wages, and shops report strong sales. Inflation has risen from 5% to 12%. The finance minister and the central bank are discussing how to bring inflation down.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which policy would tackle the main cause of this inflation most directly?",
        options: [
          ["Higher interest rates and slower growth of public-sector pay", "Correct: both reduce aggregate demand, the cause of demand-pull inflation."],
          ["Lower interest rates to encourage investment", "This would add to demand."],
          ["Higher import tariffs on consumer goods", "Tariffs raise the prices of imports."],
          ["Price controls on all goods sold in shops and markets across the country", "Price controls do not reduce demand and cause shortages."],
        ],
        answer: "A",
        explanation: "The inflation is demand-pull (credit, government spending, strong sales), so demand must be reduced.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a rise in interest rates would reduce this inflation.",
        points: ["Borrowing becomes dearer, so consumer credit growth slows.", "Saving becomes more attractive and borrowers pay more interest, so spending falls.", "Aggregate demand falls, so firms face less pressure to raise prices."],
        modelAnswer: "Higher interest rates make borrowing more expensive, so households take less consumer credit. Saving becomes more attractive, and existing borrowers have to pay more interest, leaving less to spend. Aggregate demand falls, so shops and firms can no longer raise prices so easily, and inflation slows.",
        explanation: "Credit → spending → aggregate demand → prices.",
      }),
      P.manual({
        label: "(c)", marks: 4, levels: LV(4),
        stem: "Discuss whether monetary policy or fiscal policy would be more effective in reducing this inflation.",
        points: [
          "Monetary: acts on the rapid credit growth; can be changed quickly by the central bank; but time lags, hurts borrowers, may raise the exchange rate and hurt exporters.",
          "Fiscal: tackles the government's own contribution (public-sector pay); reduces the deficit; but politically difficult, slow (budget), may cut services.",
          "Both reduce demand; combination may work best; depends on which source of demand is larger.",
          "Justified conclusion.",
        ],
        modelAnswer: "Monetary policy targets the fast growth of consumer credit, and the central bank can raise interest rates quickly, although the effect takes months to come through, borrowers suffer, and a stronger currency may hurt exporters. Fiscal policy would deal with the government's own part in the problem, the rise in public-sector wages, and would also reduce its deficit, but cutting pay growth is politically difficult and has to wait for the budget. Since both credit and government spending are driving demand, neither alone is likely to be enough: the best approach is to raise interest rates now while slowing public-sector pay growth in the next budget.",
        explanation: "Compare speed, target and side effects; conclude.",
      }),
    ],
    hints: ["What is driving the rise in demand?"],
    explanation: "Demand-pull inflation from credit and government spending calls for tighter monetary and fiscal policy.",
  });

  b.card("CONCEPT", "Who gains and who loses from unexpected inflation?", "Gain: borrowers on fixed-rate loans; those whose incomes rise faster than prices. Lose: savers, lenders, people on fixed incomes, workers whose wages lag behind prices.");
  b.card("FORMULA", "Real interest rate ≈ ?", "Nominal interest rate − rate of inflation");
  b.card("FORMULA", "Real value of an amount = ?", "Money value ÷ price index × 100");
  b.card("FACT", "Which function of money fails first in high inflation?", "Store of value: money held loses its purchasing power.");
  b.card("CONCEPT", "Give two monetary measures to reduce inflation.", "Raise interest rates; slow the growth of the money supply (or allow the currency to appreciate).");
  b.card("CONCEPT", "Give two fiscal measures to reduce inflation.", "Cut government spending; raise direct taxes (reduce the deficit, and stop financing it by creating money).");
  b.card("CONCEPT", "How do supply-side policies reduce inflation?", "They raise productivity and capacity, lowering unit costs, so output can grow without prices rising.");
  b.card("CONCEPT", "Why is cost-push inflation hard to cure by cutting demand?", "Cutting demand lowers inflation only by reducing output and raising unemployment, which are already suffering.");
  b.card("CONCEPT", "How does high inflation harm the economy as a whole?", "Uncertainty reduces investment; exports become less competitive; income is redistributed unfairly; menu and shoe-leather costs.");
});
