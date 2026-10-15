// W4a: monetary policy (both boards; ZIMSEC Form 6, Cambridge AS).
import { concept, P, chk, table, pctChange, realInterest } from "../lib.mjs";
import { mc, LV10 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.policy.monetary-policy", { file: "policy/monetary-policy", keyPrefix: "policy.monetary-policy" }, (b) => {
  mc(b, [2, "RECALL"], "Which of the following is an example of monetary policy?",
    ["The central bank raises its policy interest rate", "Correct: interest rates are a tool of monetary policy."],
    [["The government cuts the rate of income tax", "This is fiscal policy."],
     ["The government raises spending on a new hospital", "This is fiscal policy."],
     ["The government imposes a tariff on imported goods", "This is trade policy."]],
    "Monetary policy is the use of interest rates, the money supply and credit by the central bank.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "If the central bank sells government securities to the public, the immediate effect is that",
    ["banks' reserves fall and their ability to lend falls", "Correct: buyers pay from their bank accounts."],
    [["banks' reserves rise and their ability to lend rises", "This would follow a purchase of securities by the central bank."],
     ["the policy interest rate is automatically reduced", "Selling securities tightens policy; it does not reduce the rate."],
     ["the government's tax revenue rises by the same amount", "The sale is a monetary operation, not a tax."]],
    "A sale of securities drains reserves from banks and tightens policy.", { daily: true, hints: ["Where do buyers get the money to pay for the securities?"] });

  mc(b, [2, "UNDERSTANDING"], "A rise in the reserve requirement is likely to",
    ["reduce the amount that banks can lend", "Correct: banks must hold more of each deposit."],
    [["increase the amount that banks can lend", "A lower requirement would do this."],
     ["increase the supply of notes and coins in circulation", "The requirement affects lending, not the supply of cash."],
     ["lower the price level immediately by law", "Prices are not set by the requirement."]],
    "A higher reserve ratio leaves banks with less to lend, so credit and the money supply grow more slowly.");

  mc(b, [3, "ANALYSIS"], "A central bank cuts its policy rate. Which of the following is most likely to be part of the transmission mechanism?",
    ["Lower bank lending rates encourage firms to borrow and invest", "Correct: investment depends on the cost of borrowing."],
    [["Lower bank lending rates make saving more attractive to households", "Lower rates reduce the reward for saving."],
     ["The exchange rate rises as foreign funds flow into the economy", "Lower rates would tend to cause outflows and a lower exchange rate."],
     ["Aggregate demand falls as the cost of credit increases", "Credit becomes cheaper, not dearer."]],
    "Lower rates reduce borrowing costs, raising investment and consumption, so AD shifts to the right.", { hints: ["Trace the effect on the cost of credit first."] });

  mc(b, [3, "APPLICATION"], "A bank pays a nominal interest rate of 7% on savings while inflation is 11%. The real rate of interest is approximately",
    ["−4%, so savers lose purchasing power", "Correct: 7 − 11 = −4."],
    [["+4%, so savers gain purchasing power", "The sign is wrong: inflation is above the nominal rate."],
     ["+18%, so savers gain a great deal", "This adds the rates instead of subtracting."],
     ["−7%, so savers lose all their interest", "Real rate = nominal − inflation, not minus the nominal rate."]],
    "Real rate ≈ nominal rate − inflation rate = 7 − 11 = −4%.", { hints: ["Real rate = nominal rate − inflation rate."] });

  mc(b, [3, "ANALYSIS"], "A higher domestic interest rate may raise the exchange rate because",
    ["foreign investors move funds into the country to earn the higher return", "Correct: the demand for the currency rises."],
    [["domestic firms export more goods as their costs fall", "Higher rates raise firms' costs of borrowing."],
     ["the central bank is obliged to buy foreign currency", "No such obligation follows a rate rise."],
     ["domestic residents buy more imports with the extra interest", "That would increase the supply of the currency."]],
    "Higher returns attract foreign funds, raising the demand for the currency and its value.", { hints: ["Think about where foreign investors wish to place funds."] });

  mc(b, [4, "EVALUATION"], "Inflation in an economy is caused mainly by a rise in the world price of imported fuel. A higher policy rate is likely to",
    ["reduce demand and output but leave much of the cost-push pressure in place", "Correct: it does not lower fuel prices."],
    [["remove the inflation entirely by lowering the world price of fuel", "A domestic interest rate does not control world prices."],
     ["raise output while lowering the price level by increasing supply", "Higher rates reduce demand and do not raise supply."],
     ["have no effect on output because demand is unaffected by interest rates", "Demand is affected, usually by reducing it."]],
    "A higher rate reduces demand, output and employment but does not remove the cost increase, so it is a costly way of dealing with cost-push inflation.", { hints: ["Does a domestic interest rate change the cost of imported fuel?"] });

  {
    const r = realInterest(13, 9).approx; chk(r, 4);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: r, dp: 1, unit: "%", hints: ["Real rate ≈ nominal rate − inflation."],
      stem: "A bank charges a nominal interest rate of 13% on loans. Inflation is 9%. Calculate the approximate real rate of interest, as a percentage.",
      wrong: [22, 1.44, 13], explanation: "Real rate ≈ 13% − 9% = 4%. Adding the rates gives 22%." });
    const g = pctChange(800, 920); chk(g, 15);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: g, dp: 1, unit: "%", calculator: true, hints: ["Percentage change = change ÷ original × 100."],
      stem: "When the lending rate falls from 12% to 8%, planned investment in an economy rises from US\\$800 million to US\\$920 million. Calculate the percentage rise in investment, as a percentage.",
      wrong: [13, 120, 4], explanation: "Rise = 120; 120 ÷ 800 × 100 = 15%. Dividing by the new value gives 13%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: when a central bank sells government securities it is following an expansionary monetary policy.",
    feedbackFalse: "Selling securities reduces banks' reserves and tightens policy.",
    explanation: "Open-market sales drain reserves and tighten policy; purchases ease it." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each action by the central bank with its type of policy.",
    pairs: ["Lowers the policy interest rate", "Sells government securities", "Reduces the reserve requirement", "Tightens credit ceilings on bank lending"],
    right: ["Expansionary", "Contractionary"], rightIndex: [0, 1, 0, 1], explanation: "Cheaper or more plentiful credit is expansionary; dearer or scarcer credit is contractionary." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The buying and selling of government securities by the central bank is called {{blank:a}} operations. A rise in the policy rate is {{blank:b}} monetary policy.",
    blanks: [{ id: "a", accepted: ["open-market"], choices: ["open-market", "credit", "reserve"] }, { id: "b", accepted: ["contractionary"], choices: ["contractionary", "expansionary", "fiscal"] }],
    explanation: "Open-market operations change banks' reserves; a higher rate tightens policy." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the institution that normally decides the policy interest rate.",
    accepted: ["central bank", "the central bank", "reserve bank", "the reserve bank", "reserve bank of zimbabwe"], wrong: ["ministry of finance"],
    explanation: "The central bank, in Zimbabwe the Reserve Bank, carries out monetary policy." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Name the instruments and the aim."],
    stem: "Define monetary policy.",
    points: ["The use of interest rates, the money supply and credit by the central bank.", "To influence aggregate demand and so the price level, output and employment."],
    modelAnswer: "Monetary policy is the use of interest rates, the supply of money and the availability of credit by the central bank to influence aggregate demand and so the price level, output and employment.",
    explanation: "Instruments and aim." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Follow the chain from the rate to the price level."],
    stem: "Explain how a rise in the policy interest rate could reduce inflation.",
    points: ["Commercial banks raise their lending rates.", "Borrowing becomes more expensive, so consumption and investment fall.", "Aggregate demand shifts to the left (and a higher exchange rate may reduce net exports).", "So demand-pull pressure falls and the price level rises more slowly."],
    modelAnswer: "A higher policy rate leads commercial banks to raise their lending rates. Borrowing becomes more expensive, so firms invest less and households spend less on credit-financed goods, and a higher exchange rate may also reduce net exports. Aggregate demand shifts to the left, which reduces demand-pull pressure so that the price level rises more slowly.",
    explanation: "Bank rates, borrowing, AD, price level." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compare with raising the interest rate."],
    stem: "Explain one reason why a central bank might use credit regulations rather than changing the interest rate.",
    points: ["Credit regulations such as ceilings act directly on the amount of lending.", "Where firms and households are not very sensitive to interest rates, a rate change may have little effect.", "A ceiling limits lending to the target sector or amount regardless of the rate."],
    modelAnswer: "Credit regulations act directly on the amount of lending. If borrowers are not very sensitive to interest rates, a rate change may have only a small effect, whereas a ceiling limits lending by the amount set, whatever the rate.",
    explanation: "Direct control of lending when rates are ineffective." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider lags, confidence and the type of inflation."],
    stem: "Analyse two reasons why a cut in interest rates may fail to raise investment.",
    points: ["Firms' investment depends on expected sales and profits as well as on the cost of borrowing.", "If confidence is low, firms will not borrow even at low rates.", "Banks may be unwilling to lend because they see lending as risky.", "So the cut does not feed through to higher borrowing.", "Lags: the effect of the rate takes many months."],
    modelAnswer: "Investment depends on expected sales and profits as well as on the cost of borrowing, so if business confidence is low firms will not borrow even when rates are low. Banks may also be unwilling to lend because they regard lending as risky, so the lower policy rate does not reach borrowers. In addition the effect of any change in rates takes many months to appear.",
    explanation: "Weak confidence; bank reluctance; lags." });

  {
    const rate = [5, 7, 9, 11, 13], inv = [540, 480, 420, 365, 315];
    for (let i = 1; i < rate.length; i++) if (inv[i] >= inv[i - 1]) throw new Error("investment must fall as the rate rises");
    const t1 = table(["Lending rate (%)", "Planned investment (US\\$ million)"], rate.map((r, i) => [String(r), inv[i]]));
    const dI = inv[0] - inv[2]; chk(dI, 120);
    const pc = pctChange(inv[2], inv[0]); chk(Math.round(pc * 10) / 10, 28.6);
    const k = 2.5; const dAD = k * dI; chk(dAD, 300);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Read investment at each rate from the table.", "Change in AD = multiplier × change in investment."],
      stem: `**Interest rates and investment in Zandia (a fictional economy, illustrative)**\n\nThe central bank of Zandia cuts its policy rate. As a result the lending rate of commercial banks falls from 9% to 5%. The table shows planned investment at different lending rates. The multiplier is 2.5.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: dI, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the rise in planned investment, in US\\$ million.", wrong: [540, 420, 4], explanation: "Investment rises from 420 to 540: 540 − 420 = US\\$120 million." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pc, dp: 1, unit: "%", stem: "Calculate the percentage rise in planned investment, to one decimal place.", wrong: [22.2, 120, 4], explanation: "120 ÷ 420 × 100 = 28.6%. Dividing by the new level gives 22.2%." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: dAD, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the maximum rise in aggregate demand, in US\\$ million.", wrong: [120, 48, 1350], explanation: "Rise = 2.5 × 120 = US\\$300 million." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the actual rise in output may be smaller than the rise in aggregate demand calculated in (c).",
          points: ["If the economy has little spare capacity, firms cannot raise output easily.", "So part of the extra demand raises the price level instead of output.", "Time lags, leakages into imports and saving also reduce the effect."],
          modelAnswer: "If the economy has little spare capacity, firms cannot raise output easily, so part of the extra demand raises the price level instead of real output. Leakages into imports and saving, and time lags, also reduce the effect on output." }),
      ],
      explanation: "Investment rises by 120 (28.6%); with a multiplier of 2.5, AD rises by 300 at most; output rises by less if prices rise." });
  }
  {
    const infl = [6, 9, 12, 15], rate = [8, 8, 9, 9];
    const real = realInterest(rate[3], infl[3]).approx; chk(real, -6);
    const t1 = table(["Year", "Inflation (%)", "Policy interest rate (%)"], infl.map((x, i) => [String(i + 1), x, rate[i]]));
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Real rate ≈ nominal rate − inflation.", "In (d) consider the cause of the inflation and the cost of tight policy."],
      stem: `**Rising prices in Mbira (a fictional economy, illustrative)**\n\nInflation in Mbira has risen for four years. Part of the rise is due to the higher price of imported fuel and fertiliser. Banks have also been lending freely, and many borrowers use loans to buy goods. The central bank is considering raising its policy rate sharply or placing a ceiling on the growth of bank lending. Business groups warn that higher borrowing costs would hurt small firms, many of which are not served by banks at all.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: real, dp: 1, unit: "%", stem: "Calculate the approximate real policy interest rate in year 4 (nominal rate minus inflation). Include the minus sign if the answer is negative.", wrong: [6, 24, 9], explanation: "Real rate ≈ 9% − 15% = −6%." }),
        P.manual({ label: "(b)", marks: 2, stem: "State two tools of monetary policy, other than the policy interest rate.", points: ["Open-market operations (buying or selling government securities).", "Reserve requirements or credit regulations (ceilings on lending)."],
          modelAnswer: "Open-market operations, and reserve requirements or credit ceilings on bank lending." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain how a ceiling on the growth of bank lending could reduce inflation.",
          points: ["The ceiling limits the amount that banks can lend.", "So households and firms borrow and spend less.", "Aggregate demand (consumption and investment) shifts to the left.", "Demand-pull pressure falls, so the price level rises more slowly."],
          modelAnswer: "A ceiling limits the amount that banks can lend, so households and firms can borrow and spend less. Consumption and investment fall, so aggregate demand shifts to the left. The demand-pull pressure on prices is reduced, so the price level rises more slowly." }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether tighter monetary policy is the best way for Mbira to reduce inflation.",
          points: ["Credit-financed demand is a cause of inflation and the real rate is negative (−6%), so tighter policy tackles that part.", "Part of the inflation is cost-push (imported fuel and fertiliser), which tight policy does not cure.", "Tight policy reduces output, may hurt small firms and raises unemployment; the informal sector is not affected.", "Judgement: useful for the demand part but not sufficient alone."],
          modelAnswer: "Tighter monetary policy would reduce credit-financed spending, which is part of the cause of inflation, and with the real rate at −6% borrowing is currently being encouraged. However, part of the inflation is cost-push, caused by higher prices for imported fuel and fertiliser, and a higher interest rate does not lower those costs. It would also reduce output, hurt small firms and raise unemployment, while the informal sector, which is not served by banks, would be little affected. Tighter policy is therefore useful for the demand part of the inflation but not sufficient alone." }),
      ],
      explanation: "Real rate −6%; tools; ceilings cut credit-financed demand; tight policy helps with demand-pull but not cost-push." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Consider speed, lags, confidence, cost-push inflation and the financial system."],
    stem: "Evaluate the effectiveness of monetary policy in controlling inflation in a developing economy.",
    points: ["Raising interest rates or reserve requirements reduces borrowing and spending, so reduces demand-pull inflation.", "A central bank can act quickly and without political delay.", "Credible policy lowers inflation expectations.", "Cost-push inflation (imports, wages) is not removed by higher rates.", "A large informal sector and cash use limit the reach of policy.", "Time lags; the effect is uncertain and may be slow.", "Costs: higher unemployment, lower growth, higher exchange rate.", "Use of foreign currencies limits the central bank's control.", "Application to a developing economy.", "A justified judgement."],
    levels: LV10, wordLimit: { min: 150, max: 400 },
    modelAnswer: "Raising interest rates or the reserve requirement reduces borrowing and spending, so aggregate demand falls and demand-pull inflation is reduced. A central bank can act quickly, and a credible policy lowers expectations of inflation. However, in many developing economies the policy has limits. Cost-push inflation caused by imported fuel or wages is not removed by higher rates, a large informal sector and widespread use of cash mean that many borrowers and savers are not reached by the banks, and if foreign currencies are widely used the central bank has little control over the money supply. The effect takes many months and is uncertain, and it has costs in the form of lower output, higher unemployment and, if the exchange rate rises, damage to exporters. Monetary policy is therefore effective against excess demand where the financial system is well developed and the central bank is credible, but it needs to be combined with supply-side policy where inflation is caused by costs.",
    explanation: "Strengths of speed and credibility against cost-push inflation, financial structure, lags and costs." });

  b.card("DEFINITION", "Define **monetary policy**.", "The use of interest rates, the money supply and credit by the central bank to influence aggregate demand, prices, output and employment.");
  b.card("CONCEPT", "Name four tools of monetary policy.", "The policy interest rate, open-market operations, reserve requirements and credit regulations.");
  b.card("CONCEPT", "Effect of selling government securities?", "Banks' reserves fall, lending falls: a contractionary policy.");
  b.card("CONCEPT", "Effect of a lower reserve requirement?", "Banks can lend more, so credit and the money supply grow: an expansionary policy.");
  b.card("CONCEPT", "What is the transmission mechanism?", "The chain from a change in the policy instrument through bank rates, spending and the exchange rate to AD, output and prices.");
  b.card("FORMULA", "Approximate real interest rate?", "Nominal interest rate − inflation rate.");
  b.card("CONCEPT", "Why can a higher interest rate raise the exchange rate?", "Foreign funds are attracted by the higher return, raising the demand for the currency.");
  b.card("CONCEPT", "Name three limits of monetary policy.", "Time lags, low confidence or reluctant banks, and cost-push inflation (also informal finance).");
  b.card("CONCEPT", "Fiscal or monetary: a cut in income tax?", "Fiscal policy; monetary policy is run by the central bank using interest rates, money supply and credit.");
});
