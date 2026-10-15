// W3b: national income determination and inflationary and deflationary gaps (both boards; Cambridge A Level only, ZIMSEC Form 6).
import { concept, P, chk, same, table, fmt, keynes, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.income-gaps", { file: "macro/income-gaps", keyPrefix: "macro.income-gaps" }, (b) => {
  mc(b, [1, "RECALL"], "A deflationary (recessionary) gap is the amount by which",
    ["aggregate demand at full employment falls short of the full employment income", "Correct: the shortfall in AD at Yf."],
    [["equilibrium income is greater than the full employment level of national income", "That describes an inflationary position."],
     ["injections are greater than withdrawals at the current level of national income", "That would make income rise."],
     ["government spending is greater than tax revenue in a given financial year", "That is a budget deficit."]],
    "The deflationary gap is the shortfall of AD at the full employment level of income.");

  mc(b, [2, "UNDERSTANDING"], "At the equilibrium level of national income",
    ["planned injections equal planned withdrawals", "Correct: there is no tendency for income to change."],
    [["planned saving always equals planned investment in every economy", "That is only true in a closed economy without government."],
     ["all workers who want a job are employed", "Equilibrium may be below full employment."],
     ["the government budget is always in balance", "The budget need not balance."]],
    "At equilibrium, injections (I + G + X) = withdrawals (S + T + M).", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "If planned aggregate demand is greater than national output, then",
    ["stocks fall and firms raise output", "Correct: output rises towards equilibrium."],
    [["stocks rise and firms cut output", "That happens when AD is less than output."],
     ["output stays the same because it is determined by supply only", "In this model demand determines output."],
     ["prices fall to eliminate the excess demand immediately", "The model adjusts through output."]],
    "Excess demand reduces stocks, which encourages firms to raise output.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "An inflationary gap leads to higher prices because",
    ["real output cannot exceed full employment, so excess demand raises prices", "Correct: capacity limits output."],
    [["unemployment is very high and wages fall, which raises the general price level", "High unemployment is associated with a deflationary gap."],
     ["firms can always produce more output at the same cost per unit of output", "Costs rise near capacity."],
     ["the multiplier falls to zero whenever the level of national income is high", "The multiplier is not zero."]],
    "At full capacity, extra demand pushes up prices rather than real output.");

  {
    const ye = keynes.equilibriumIncome({ autonomous: 60 + 40, mpc: 0.8 }); chk(ye, 500, 1e-9);
    mc(b, [3, "APPLICATION"], "In a closed economy without government, C = 60 + 0.8Y and investment is 40 (US\\$ million). Equilibrium national income is",
      ["US\\$500 million", "Correct: Y = (60 + 40) ÷ (1 − 0.8)."],
      [["US\\$125 million", "That divides by 0.8 instead of by 0.2."],
       ["US\\$100 million", "That is autonomous spending."],
       ["US\\$300 million", "That does not use the multiplier."]],
      "Y = 60 + 0.8Y + 40, so 0.2Y = 100 and Y = 500.", { hints: ["Set Y = C + I and solve."] });
  }

  {
    const g = keynes.gap({ fullEmployment: 1800, equilibrium: 1500, k: 4 }); chk(g.injectionChange, 75, 1e-9);
    mc(b, [3, "APPLICATION"], "Equilibrium income is US\\$1,500 million and the full employment level is US\\$1,800 million. The multiplier is 4. To reach full employment, injections must rise by",
      ["US\\$75 million", "Correct: 300 ÷ 4."],
      [["US\\$300 million", "That is the income gap, not the change in injections."],
       ["US\\$1,200 million", "That multiplies the income gap by the multiplier."],
       ["US\\$7,200 million", "That multiplies 1,800 by 4."]],
      "Income gap = 300; injection needed = 300 ÷ 4 = 75.", { hints: ["Divide the income gap by the multiplier."] });
  }

  mc(b, [3, "ANALYSIS"], "Which policy would be most suitable for removing an inflationary gap?",
    ["A cut in government spending or a rise in taxes", "Correct: it reduces aggregate demand."],
    [["A cut in income tax to increase consumer spending", "That raises AD."],
     ["An increase in government borrowing to build roads", "That raises AD."],
     ["A cut in interest rates to encourage investment", "That raises AD."]],
    "An inflationary gap needs a reduction in aggregate demand.", { hints: ["Does the policy raise or lower AD?"] });

  mc(b, [4, "EVALUATION"], "Why might a government fail to close a deflationary gap exactly using fiscal policy?",
    ["Full employment income and the multiplier are uncertain, so the injection may be wrong", "Correct: estimates are imprecise."],
    [["A rise in government spending can never raise the level of national income", "It does raise income through the multiplier."],
     ["The deflationary gap is always zero in every market economy that exists", "Gaps do occur."],
     ["Fiscal policy affects only the supply of money in the whole economy", "Fiscal policy affects AD."]],
    "The size of the gap depends on estimates of Yf and the multiplier.", { hints: ["Which numbers must be estimated?"] });

  {
    const aut = 50 + 100 + 150 + 90;
    const k = keynes.multiplier({ mpc: 0.9, mrt: 0.2, mpm: 0.12 }); chk(roundTo(k, 2), 2.5, 1e-9);
    const ye = keynes.equilibriumIncome({ autonomous: aut, mpc: 0.9, mrt: 0.2, mpm: 0.12 }); chk(roundTo(ye, 6), 975, 1e-9);
    const g1 = keynes.gap({ fullEmployment: 1100, equilibrium: ye, k }); chk(roundTo(g1.injectionChange, 6), 50, 1e-9); same(g1.type, "deflationary");
    const g2 = keynes.gap({ fullEmployment: 780, equilibrium: 840, k: 3 }); chk(roundTo(g2.injectionChange, 6), 20, 1e-9); same(g2.type, "inflationary");
    const adStr = "C = 50 + 0.9Yd, income tax is 20% of national income, I = 100, G = 150, X = 90 and M = 0.12Y (US\\$ million)";
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "plain", value: ye, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Find autonomous spending and the multiplier first."],
      stem: `A fictional economy has ${adStr}. Calculate equilibrium national income, in US\\$ million.`,
      wrong: [390, 1560, 780], explanation: "1. Autonomous spending = 50 + 100 + 150 + 90 = 390.\n2. k = 1 ÷ (1 − 0.9 × 0.8 + 0.12) = 1 ÷ 0.40 = 2.5.\n3. Ye = 2.5 × 390 = US\\$975 million." });
    b.calc({ d: 5, skill: "APPLICATION", calculator: true, kind: "plain", value: g1.injectionChange, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Income gap ÷ multiplier."],
      stem: `In a fictional economy the multiplier is 2.5 and equilibrium income is US\\$975 million. The full employment level of income is US\\$1,100 million. Calculate the increase in injections needed to reach full employment, in US\\$ million.`,
      wrong: [125, 312.5, 25], explanation: "1. Income gap = 1,100 − 975 = 125.\n2. k = 2.5.\n3. Injection needed = 125 ÷ 2.5 = US\\$50 million." });
    b.num({ d: 4, skill: "APPLICATION", calculator: true, kind: "plain", value: g2.injectionChange, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Equilibrium income exceeds full employment."],
      stem: `In a fictional economy the multiplier is 3, equilibrium income is US\\$840 million and the full employment level of income is only US\\$780 million. Calculate the size of the inflationary gap in aggregate demand, in US\\$ million.`,
      wrong: [60, 180, 23], explanation: "Income gap = 840 − 780 = 60. Inflationary gap = 60 ÷ 3 = US\\$20 million: AD must fall by 20." });
    const k4 = keynes.multiplier({ mpc: 0.75 }); const ye4 = keynes.equilibriumIncome({ autonomous: 300, mpc: 0.75 }); chk(ye4, 1200, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: ye4, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Y = autonomous spending × multiplier."],
      stem: "In a closed economy without government autonomous spending is US\\$300 million and the marginal propensity to consume is 0.75. Calculate equilibrium national income, in US\\$ million.",
      wrong: [400, 225, 1600], explanation: "k = 1 ÷ (1 − 0.75) = 4. Ye = 4 × 300 = US\\$1,200 million." });
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: 1320 - 1200, unit: "US$ million", dp: 0, tol: 0.5,
      stem: "Equilibrium income is US\\$1,200 million and full employment income is US\\$1,320 million. Calculate the income gap, in US\\$ million.",
      wrong: [30, 2520, 1200], explanation: "Income gap = 1,320 − 1,200 = US\\$120 million (a deflationary position)." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "To close a deflationary gap the government must increase injections by the full amount of the income gap.", answer: false,
    explanation: "False. The multiplier magnifies the effect, so injections need rise only by the income gap divided by the multiplier." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each situation with the policy that would be most suitable.",
    pairs: [["Deflationary gap", "Raise government spending or cut taxes"], ["Inflationary gap", "Cut government spending or raise taxes"], ["Equilibrium income below the full employment level", "Raise aggregate demand"], ["Excess demand beyond capacity", "Reduce aggregate demand"]],
    explanation: "Match the gap with the direction of the change in AD." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the level of national income at which all available resources are fully employed?",
    accepted: ["full employment level of income", "full employment income", "full employment", "full employment level of national income"], wrong: ["equilibrium income"],
    explanation: "The full employment level of income (Yf)." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define an inflationary gap.",
    points: ["The amount by which aggregate demand at the full employment level of income exceeds that level.", "Real output cannot rise above full capacity, so the excess demand leads to higher prices."],
    modelAnswer: "An inflationary gap is the amount by which aggregate demand at the full employment level of income exceeds that level. Real output cannot rise above capacity, so the excess demand pulls up prices.",
    explanation: "One mark for the definition and one for the effect." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What happens to stocks and output?"],
    stem: "Explain why national income tends to move to equilibrium when planned aggregate demand is less than output.",
    points: ["Firms produce more than they sell, so stocks of unsold goods build up.", "Firms cut production and employment in response.", "Output and income fall until AD equals output."],
    modelAnswer: "If planned aggregate demand is less than output, firms find that their stocks of unsold goods are building up. They cut production and employment, so output and income fall until aggregate demand equals output.",
    explanation: "Stocks rise, output cut, movement to equilibrium." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Start with the injection and apply the multiplier."],
    stem: "Analyse how an increase in government spending might close a deflationary gap.",
    points: ["Government spending is an injection that raises aggregate demand.", "Firms producing the goods and services earn extra income and increase output.", "The extra income is partly spent again: the multiplier raises income by a multiple of the injection.", "Higher output reduces cyclical unemployment.", "National income rises towards the full employment level, and the gap closes."],
    modelAnswer: "Government spending is an injection that raises aggregate demand. Firms that supply the extra goods and services produce more and pay out extra income, a part of which is spent again, so national income rises by a multiple of the original injection through the multiplier. Higher output reduces cyclical unemployment, and national income moves towards the full employment level, closing the gap.",
    explanation: "Injection, AD, multiplier, employment, closing the gap." });

  {
    const k = keynes.multiplier({ mpc: 0.7, mrt: 0.2, mpm: 0.06 }); chk(roundTo(k, 2), 2, 1e-9);
    const aut = 60 + 110 + 85 + 105; chk(aut, 360);
    const ye = keynes.equilibriumIncome({ autonomous: aut, mpc: 0.7, mrt: 0.2, mpm: 0.06 }); chk(roundTo(ye, 6), 720, 1e-9);
    const gp = keynes.gap({ fullEmployment: 800, equilibrium: ye, k }); chk(roundTo(gp.injectionChange, 6), 40, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Equilibrium: Y = autonomous spending × multiplier.", "Gap in AD = income gap ÷ multiplier."],
      stem: "**Income determination in Mbira (fictional, illustrative)**\n\nIn Mbira C = 60 + 0.7Yd, where disposable income Yd = 0.8Y (a tax of 20% of national income); investment is US\\$110 million, government spending US\\$85 million, exports US\\$105 million and imports are 0.06Y. The full employment level of income is US\\$800 million.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: aut, unit: "US$ million", stem: "Calculate autonomous spending (the part of AD that does not depend on income), in US\\$ million.", wrong: [280, 300, 460], explanation: "Autonomous spending = 60 + 110 + 85 + 105 = US\\$360 million." }),
        P.num({ label: "(b)", marks: 3, kind: "plain", value: ye, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate equilibrium national income, in US\\$ million.", wrong: [360, 1440, 800], explanation: "k = 1 ÷ (1 − 0.7 × 0.8 + 0.06) = 1 ÷ 0.5 = 2. Ye = 2 × 360 = US\\$720 million." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: gp.injectionChange, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the deflationary gap, that is the rise in injections needed to reach full employment, in US\\$ million.", wrong: [80, 160, 20], explanation: "Income gap = 800 − 720 = 80. Gap in AD = 80 ÷ 2 = US\\$40 million." }),
        P.manual({ label: "(d)", marks: 2, stem: "State whether Mbira has an inflationary or a deflationary gap and give a reason.",
          points: ["A deflationary gap.", "Equilibrium income (720) is below the full employment level (800), so AD is too low."],
          modelAnswer: "A deflationary gap, because equilibrium income of US\\$720 million is below the full employment level of US\\$800 million." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two policies the government could use to close the gap.",
          points: ["Raise government spending or cut taxes (fiscal policy).", "Lower interest rates (or other measures to raise investment, exports or consumption)."],
          modelAnswer: "The government could raise its own spending or cut taxes, and the central bank could lower interest rates to encourage investment and consumption." }),
      ],
      explanation: "Autonomous spending 360; k = 2; Ye = 720; deflationary gap of 40 in AD." });
  }
  {
    const k = 2.5, ye = 1060;
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Gap = income gap ÷ multiplier.", "In (d) consider time lags and uncertainty."],
      stem: "**A boom in Zandia (fictional)**\n\nIn Zandia the multiplier is 2.5. Equilibrium national income is US\\$1,060 million, but the economy can produce only US\\$1,000 million of real output at full employment. Prices have risen by 9% in the past year, wage demands are rising and firms report shortages of skilled workers. The government is considering a cut in its spending or a rise in the interest rate.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 60, unit: "US$ million", stem: "Calculate the income gap, in US\\$ million.", wrong: [24, 150, 1060], explanation: "Income gap = 1,060 − 1,000 = US\\$60 million." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 24, unit: "US$ million", stem: "Calculate the inflationary gap in aggregate demand, in US\\$ million.", wrong: [60, 150, 26], explanation: "Gap = 60 ÷ 2.5 = US\\$24 million." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the inflationary gap leads to higher prices rather than higher output.",
          points: ["The economy is already producing at full employment, so real output cannot rise further.", "Aggregate demand exceeds the capacity of the economy to supply.", "Firms compete for scarce resources (skilled workers) and raise prices and wages."],
          modelAnswer: "At full employment real output cannot rise, because there are no unused resources. Aggregate demand is greater than the economy can supply, so firms compete for scarce resources such as skilled workers and raise wages and prices." }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: [[3, 4, 5, "Two-sided, applied to the data, with a justified judgement."], [2, 2, 3, "Some weighing, limited application."], [1, 1, 1, "A simple statement."]],
          stem: "Assess whether cutting government spending is the best way to remove the inflationary gap.",
          points: ["A cut of US\\$24 million would close the gap (multiplier 2.5 reduces income by 60).", "It can be targeted and controlled by the government.", "It affects jobs and services; political difficulty.", "Higher interest rates or taxes are alternatives with different effects on investment and consumption.", "Uncertainty over Yf and the multiplier, and time lags, may cause overshooting."],
          modelAnswer: "A cut in government spending of US\\$24 million would reduce national income by 2.5 × 24 = US\\$60 million and close the gap, and it is under the government's direct control. However, it reduces public services and may cost jobs, and it is politically difficult. A higher interest rate or taxes would also reduce demand but with different effects on investment and consumption. Because the full employment level and the multiplier are estimates and policy works with a lag, the cut may be too large or too small, so the government should monitor the results." }),
      ],
      explanation: "Income gap 60; AD gap 24; capacity limits output so prices rise; spending cuts are direct but uncertain." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider estimation, time lags and the supply side."],
    stem: "Assess the usefulness of the concept of deflationary and inflationary gaps for policy-makers.",
    points: ["It shows whether AD is too low or too high compared with capacity.", "The gap in AD tells the policy-maker how large an injection or cut is needed (income gap ÷ multiplier).", "It guides the choice between expansionary and contractionary policy.", "Full employment income and the multiplier are hard to estimate.", "Time lags mean the economy may change before policy works.", "It ignores the supply side: unemployment may be structural and not due to low demand.", "Expectations and crowding out may change the effect.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "The concept of gaps shows whether aggregate demand is too low or too high for the economy's capacity, and it tells policy-makers how large the change in injections must be, which is the income gap divided by the multiplier. It guides the choice between expansionary and contractionary policy. However, the full employment level of income and the multiplier have to be estimated and are uncertain, so the policy may be too large or too small. Time lags mean that the economy may have changed before the policy takes effect. The model also ignores the supply side, because unemployment may be structural and not a result of low demand, and expectations or crowding out may alter the effect. The concept is therefore a helpful guide to the direction and approximate scale of policy but cannot be used as a precise calculation.",
    explanation: "Weigh the guidance given by the model against estimation problems, lags and the supply side." });

  b.card("DEFINITION", "Define a **deflationary gap**.", "The shortfall of aggregate demand at the full employment level of income; equilibrium income is below Yf.");
  b.card("DEFINITION", "Define an **inflationary gap**.", "The excess of aggregate demand over the full employment level of income; real output cannot rise, so prices rise.");
  b.card("FORMULA", "Equilibrium conditions?", "AD = Y; or injections (I + G + X) = withdrawals (S + T + M).");
  b.card("FORMULA", "How do you find the injection needed to close a gap?", "Income gap (Yf − Ye) ÷ multiplier.");
  b.card("CONCEPT", "What happens when AD is greater than output?", "Stocks fall and firms raise output; income rises towards equilibrium.");
  b.card("FORMULA", "Equilibrium income with the multiplier?", "Ye = autonomous spending × k.");
  b.card("CONCEPT", "Policy for a deflationary gap?", "Raise AD: higher government spending, lower taxes or lower interest rates.");
  b.card("CONCEPT", "Policy for an inflationary gap?", "Reduce AD: lower government spending, higher taxes or higher interest rates.");
  b.card("CONCEPT", "Name two problems in using gap analysis.", "Full employment income and the multiplier are hard to estimate; time lags and supply-side problems.");
});
