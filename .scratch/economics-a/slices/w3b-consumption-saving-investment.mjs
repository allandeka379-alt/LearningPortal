// W3b: consumption, saving and investment functions (both boards; Cambridge A Level only, ZIMSEC Form 6).
import { concept, P, chk, table, fmt, keynes, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.consumption-saving-investment", { file: "macro/consumption-saving-investment", keyPrefix: "macro.consumption-saving-investment" }, (b) => {
  mc(b, [1, "RECALL"], "Autonomous consumption is",
    ["consumption that does not depend on current income", "Correct: the intercept a in C = a + bY."],
    [["the part of consumption that rises as income rises", "That is induced consumption."],
     ["consumption of goods that are produced at home only", "Origin of the goods is not the test."],
     ["the fraction of extra income that is spent", "That is the marginal propensity to consume."]],
    "Autonomous consumption is spending that occurs even at zero income.");

  mc(b, [2, "UNDERSTANDING"], "The marginal propensity to consume is",
    ["the change in consumption divided by the change in income", "Correct: ΔC ÷ ΔY."],
    [["total consumption divided by total income", "That is the average propensity to consume."],
     ["the change in saving divided by the change in income", "That is the marginal propensity to save."],
     ["the change in income divided by the change in consumption", "That inverts the ratio."]],
    "MPC = ΔC ÷ ΔY, the slope of the consumption function.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A rise in the value of houses and shares makes households feel wealthier. On a diagram of consumption against income, this causes",
    ["an upward shift of the consumption function", "Correct: a change other than income shifts the function."],
    [["a movement up along the existing consumption function", "That is caused by a change in income."],
     ["a downward shift of the consumption function", "Greater wealth raises consumption."],
     ["a fall in the slope of the function to zero", "The slope is the MPC and is unchanged by this."]],
    "Wealth changes autonomous consumption and shifts the whole function.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is investment in the economic sense?",
    ["A bakery buys a new oven for its factory", "Correct: spending on capital goods."],
    [["A household buys shares on the stock exchange", "That is a financial transaction, not spending on capital goods."],
     ["The government pays old-age pensions to retired people", "That is a transfer payment."],
     ["A firm deposits its profits in a bank savings account", "That is saving."]],
    "Investment is spending on capital goods that add to the capital stock.", { daily: true });

  mc(b, [3, "APPLICATION"], "Consumption in a fictional economy is C = 80 + 0.6Y. If national income rises by 250, consumption rises by",
    ["150", "Correct: 0.6 × 250."],
    [["250", "That is the rise in income."],
     ["80", "That is the autonomous part, which does not change."],
     ["250 × 0.4 = 100", "0.4 is the MPS, not the MPC."]],
    "ΔC = MPC × ΔY = 0.6 × 250 = 150.", { hints: ["The autonomous part stays the same when income changes."] });

  mc(b, [3, "APPLICATION"], "If consumption is C = 70 + 0.7Y and there is no government or trade, the saving function is",
    ["S = −70 + 0.3Y", "Correct: S = Y − C."],
    [["S = 70 + 0.3Y", "The autonomous term must be negative."],
     ["S = −70 + 0.7Y", "The slope is the MPS, 1 − 0.7 = 0.3."],
     ["S = 70 − 0.7Y", "Saving rises with income."]],
    "S = Y − (70 + 0.7Y) = −70 + 0.3Y.", { hints: ["S = Y − C."] });

  mc(b, [3, "ANALYSIS"], "Output rises by 10 in one year and by 4 in the next. According to the accelerator, net induced investment in the second year is likely to",
    ["fall, even though output is still rising", "Correct: investment depends on the change in output, which has slowed."],
    [["rise, because output is higher than before", "Investment depends on the change, not the level."],
     ["be zero, because output is still rising", "It would be zero only if output were unchanged."],
     ["stay the same, because it depends on the interest rate only", "The accelerator links investment to output changes."]],
    "Induced investment = v × ΔY, so a smaller rise in output means less investment.", { hints: ["Compare the change in output in the two years."] });

  mc(b, [4, "EVALUATION"], "Why might a fall in the interest rate have little effect on investment during a recession?",
    ["Firms expect low demand and profits, so they do not want to expand capacity", "Correct: expectations dominate the cost of borrowing."],
    [["Lower interest rates always raise the cost of borrowing for firms", "Lower rates reduce the cost of borrowing."],
     ["Investment depends only on the level of government spending", "Many factors affect investment."],
     ["Interest rates have no connection with the profitability of investment", "They affect the cost of funds."]],
    "Weak confidence and spare capacity can outweigh a lower cost of borrowing.", { hints: ["What matters besides the cost of borrowing?"] });

  {
    const mpc = (540 - 450) / (660 - 540); chk(mpc, 0.75, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "elasticity", value: mpc, dp: 2,
      stem: "When national income of a fictional economy rises from US\\$540 billion to US\\$660 billion, consumption rises from US\\$450 billion to US\\$540 billion. Calculate the marginal propensity to consume, to two decimal places.",
      wrong: [0.95, 0.25, 0.90], explanation: "MPC = ΔC ÷ ΔY = (540 − 450) ÷ (660 − 540) = 90 ÷ 120 = 0.75. Dividing C by Y at one point (0.95 or 0.90) gives an average propensity." });
    const s500 = 500 - (60 + 0.75 * 500); chk(s500, 65);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: s500, unit: "US$ billion", hints: ["S = Y − C."],
      stem: "Consumption in a fictional closed economy without government is C = 60 + 0.75Y (US\\$ billion). Calculate saving when national income is US\\$500 billion.",
      wrong: [375, 435, 125], explanation: "C = 60 + 0.75 × 500 = 435. Saving = 500 − 435 = US\\$65 billion." });
    const be = 60 / 0.25; chk(be, 240);
    b.calc({ d: 4, skill: "APPLICATION", kind: "plain", value: be, unit: "US$ billion", hints: ["At break-even, C = Y so saving is zero."],
      stem: "For C = 60 + 0.75Y (US\\$ billion, no government or trade), calculate the break-even level of national income, at which saving is zero, in US\\$ billion.",
      wrong: [80, 60, 300], explanation: "1. Set C = Y: 60 + 0.75Y = Y.\n2. 60 = 0.25Y.\n3. Y = 60 ÷ 0.25 = US\\$240 billion." });
    const v = 2.5, di = keynes.accelerator(v, 220 - 200); chk(di, 50);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: di, unit: "US$ million", hints: ["Induced investment = v × change in output."],
      stem: "The capital–output ratio of a fictional economy is 2.5. Output rises from US\\$200 million to US\\$220 million. Calculate the induced investment, in US\\$ million.",
      wrong: [8, 550, 20], explanation: "Induced investment = 2.5 × (220 − 200) = US\\$50 million." });
    const mpcd = 0.75, mrt = 0.2, mpm = 0.15;
    const mps = (1 - mrt) * (1 - mpcd), leak = mps + mrt + mpm; chk(roundTo(leak, 2), 0.55, 1e-9);
    b.calc({ d: 5, skill: "APPLICATION", kind: "elasticity", value: leak, dp: 2, hints: ["Find MPC, MPS and MPT as fractions of national income first."],
      stem: "Households spend 0.75 of each extra dollar of disposable income. The marginal rate of tax is 20% of national income and the marginal propensity to import is 0.15 of national income. Calculate the total leakage (MPS + MPT + MPM) from each extra dollar of national income, to two decimal places.",
      wrong: [0.35, 0.45, 0.2], explanation: "1. Tax = 0.20, so disposable income is 0.80 of the extra dollar.\n2. Saving = 0.25 × 0.80 = 0.20 (MPS); consumption = 0.75 × 0.80 = 0.60.\n3. Leakages = 0.20 + 0.20 + 0.15 = 0.55." });
  }


  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["MPC", "Change in consumption ÷ change in income"], ["APS", "Total saving ÷ total income"], ["Induced investment", "Investment that depends on changes in output"], ["Autonomous investment", "Investment that does not depend on current output"]],
    explanation: "Propensities are ratios; induced investment depends on output, autonomous does not." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "If the marginal propensity to consume is 0.8, the marginal propensity to save in a closed economy without government is {{blank:a}}. A change in income causes a {{blank:b}} along the consumption function.",
    blanks: [{ id: "a", accepted: ["0.2"], input: "number", tolerance: 0.001 }, { id: "b", accepted: ["movement"], choices: ["movement", "shift"] }],
    explanation: "MPS = 1 − MPC = 0.2; income changes move along the function." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the principle that links induced investment to the rate of change of output.",
    accepted: ["accelerator", "the accelerator", "accelerator principle", "the accelerator principle"], wrong: ["multiplier"],
    explanation: "The accelerator: induced investment = capital–output ratio × change in output." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between the average propensity to consume and the marginal propensity to consume.",
    points: ["APC is total consumption divided by total income (C ÷ Y).", "MPC is the change in consumption divided by the change in income (ΔC ÷ ΔY)."],
    modelAnswer: "The average propensity to consume is total consumption divided by total income, while the marginal propensity to consume is the change in consumption divided by the change in income.",
    explanation: "One mark each." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of the effect on the cost and reward of saving."],
    stem: "Explain two reasons why a rise in the interest rate might reduce consumption.",
    points: ["Borrowing becomes more expensive, so credit-financed purchases fall.", "Households with debts pay more interest, reducing their disposable income.", "Saving becomes more rewarding, so households save a higher proportion.", "So consumption spending falls."],
    modelAnswer: "A higher interest rate makes borrowing more expensive, so households buy fewer goods with credit, and it increases interest payments on existing debt, which reduces disposable income. It also makes saving more attractive, so households save more and spend less. Consumption therefore falls.",
    explanation: "Two reasons with consequences." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use the accelerator: investment depends on the change in output."],
    stem: "Explain why investment is more unstable than consumption.",
    points: ["Investment depends on the change in output (accelerator): a small change in output causes a larger change in investment.", "A slowing of growth can reduce investment even when output is rising.", "Investment depends on expectations and confidence, which can change quickly.", "Investment can be postponed, while households need to keep consuming.", "Consumption depends on income, which changes more slowly."],
    modelAnswer: "According to the accelerator, investment depends on the change in output, so a small change in output causes a larger change in investment, and investment can fall when output growth slows even though output is still rising. It also depends on expectations and confidence, which can change quickly, and it can be postponed. Consumption depends mainly on income, which changes more slowly, and households must keep consuming.",
    explanation: "Accelerator, expectations and the ability to postpone." });

  {
    const Y = [0, 150, 300, 450, 600], C = Y.map((y) => 90 + 0.7 * y);
    const mpc = (C[3] - C[2]) / (Y[3] - Y[2]); chk(roundTo(mpc, 2), 0.7, 1e-9);
    const apc = C[3] / Y[3]; chk(apc, 0.9, 1e-9);
    const t1 = table(["National income Y (US\\$ million)", "Consumption C (US\\$ million)"], Y.map((y, i) => [y, C[i]]), { align: ["l", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["MPC = ΔC ÷ ΔY.", "Saving = Y − C."],
      stem: `**Consumption in Country Zandia (fictional, closed economy without government; illustrative)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: mpc, dp: 2, stem: "Calculate the marginal propensity to consume, to two decimal places.", wrong: [0.3, 0.9, 1.3], explanation: "MPC = (405 − 300) ÷ (450 − 300) = 0.70." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: apc, dp: 2, stem: "Calculate the average propensity to consume when income is US\\$450 million, to two decimal places.", wrong: [0.7, 1.11, 0.1], explanation: "APC = 405 ÷ 450 = 0.90." }),
        P.num({ label: "(c)", marks: 1, kind: "plain", value: 600 - C[4], unit: "US$ million", stem: "Calculate saving when income is US\\$600 million, in US\\$ million.", wrong: [510, 190, 600], explanation: "Saving = 600 − 510 = US\\$90 million." }),
        P.num({ label: "(d)", marks: 1, kind: "plain", value: 300, unit: "US$ million", stem: "State the level of income at which saving is zero, in US\\$ million.", wrong: [150, 90, 200], explanation: "Consumption equals income (300) at Y = 300." }),
        P.manual({ label: "(e)", marks: 4, stem: "A rise in consumer confidence changes the consumption function to C = 110 + 0.7Y. Explain the effect on the function and distinguish this from a rise in income.",
          points: ["The function shifts upwards by 20 at every level of income (autonomous consumption rises from 90 to 110).", "The slope (MPC = 0.7) is unchanged.", "A rise in income is a movement along the existing function.", "Confidence is a determinant other than income, so it shifts the function."],
          modelAnswer: "Autonomous consumption rises from 90 to 110, so the consumption function shifts upwards by 20 at every income level while its slope, the MPC of 0.7, is unchanged. A rise in income, by contrast, is a movement along the existing function. Confidence is a determinant other than income, so it shifts the function." }),
      ],
      explanation: "MPC 0.70; APC 0.90; saving 90 at Y = 600; break-even income 300; a change in confidence shifts the function." });
  }
  {
    const out = [500, 520, 530, 530], v = 2;
    const inv3 = keynes.accelerator(v, out[2] - out[1]); chk(inv3, 20);
    const inv2 = keynes.accelerator(v, out[1] - out[0]); chk(inv2, 40);
    const t2 = table(["Year", "Output (US\\$ million)"], out.map((o, i) => [String(i + 1), o]), { align: ["l", "r"] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Induced investment = v × change in output.", "In (c) weigh the accelerator against other determinants."],
      stem: `**Investment in Mbira (fictional)**\n\nFirms in Mbira need 2 units of capital for each unit of annual output. The central bank cut the interest rate last year, but business surveys show that firms are cautious because the export market for their products is weak. Output has recently changed as follows.\n\n${t2}\n\nThe government has also announced a tax credit for firms that buy new machinery.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: inv2, unit: "US$ million", stem: "Calculate induced investment in year 2, in US\\$ million.", wrong: [20, 1040, 10], explanation: "Induced investment = 2 × (520 − 500) = US\\$40 million." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: inv3, unit: "US$ million", stem: "Calculate induced investment in year 3, in US\\$ million.", wrong: [40, 1060, 10], explanation: "Induced investment = 2 × (530 − 520) = US\\$20 million: it falls although output rises." }),
        P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 300 }, levels: LV8,
          stem: "Assess whether the interest rate cut and the tax credit are likely to raise investment in Mbira.",
          points: ["The lower interest rate reduces the cost of borrowing, which could raise investment.", "But firms are cautious about the weak export market (expected demand and profit matter more).", "The accelerator: output growth has slowed (20 then 10), so induced investment falls.", "The tax credit raises the after-tax return on machinery and may encourage investment.", "Its effect depends on whether firms expect to use the extra capacity.", "Spare capacity or uncertainty could reduce both policies' effect.", "Time lags.", "Judgement: policies help, but investment will recover mainly when output growth and confidence recover."],
          modelAnswer: "The lower interest rate reduces the cost of borrowing and the tax credit increases the return on machinery, so both could encourage investment. However, firms are cautious about the weak export market, and expected demand and profits are more important than the cost of funds. The accelerator also suggests that investment depends on the change in output: output growth has slowed from 20 to 10, so induced investment has fallen from US\\$40 million to US\\$20 million. If firms have spare capacity they will not buy machinery whatever the interest rate or tax credit. The policies are therefore likely to help only a little until demand and confidence recover." }),
      ],
      explanation: "Induced investment 40 then 20 as growth slows; interest rate and tax credit are weaker than expectations of demand." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the interest rate with other determinants."],
    stem: "Assess the importance of the rate of interest as a determinant of investment.",
    points: ["A lower rate reduces the cost of borrowing and the opportunity cost of retained profits, so more projects are profitable.", "Investment is interest-sensitive for long-lived capital such as buildings.", "Expected profits and business confidence often matter more than the rate.", "The accelerator links investment to the change in output.", "Technology, taxes and the availability of finance also matter.", "In a recession a low interest rate may fail to raise investment.", "The effect depends on the elasticity of investment with respect to the rate.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A lower interest rate reduces the cost of borrowing and the opportunity cost of using retained profits, so more projects become profitable, especially long-lived investments such as buildings. But other factors may be more important. Firms invest when they expect demand and profits to rise, so business confidence matters, and the accelerator links investment to the change in output. Technology, taxes and the availability of credit also affect it. In a recession, a low interest rate often fails to raise investment because firms have spare capacity and are pessimistic. Overall the interest rate is one important determinant, but expectations of demand are often more important, so the effect of the interest rate varies.",
    explanation: "Weigh the interest rate against expectations, the accelerator and other determinants." });

  b.card("FORMULA", "What is the **consumption function**?", "C = a + bY: a is autonomous consumption and b the marginal propensity to consume.");
  b.card("FORMULA", "How are **MPC** and **APC** calculated?", "MPC = ΔC ÷ ΔY; APC = C ÷ Y.");
  b.card("FORMULA", "What is the saving function when C = a + bY?", "S = Y − C = −a + (1 − b)Y; MPS = 1 − b.");
  b.card("CONCEPT", "How do you find break-even income?", "Set C = Y (saving is zero): Y = a ÷ (1 − b).");
  b.card("CONCEPT", "Movement along or shift of the consumption function?", "A change in income is a movement; a change in wealth, interest rates, credit or confidence shifts it.");
  b.card("DEFINITION", "What is **investment** in economics?", "Spending on capital goods (and stocks) that adds to the capital stock; not buying shares or saving.");
  b.card("CONCEPT", "Name four determinants of investment.", "Interest rate, expected profits and confidence, changes in output (accelerator), technology, taxes and availability of finance.");
  b.card("FORMULA", "State the **accelerator**.", "Induced investment = capital–output ratio × change in output.");
  b.card("CONCEPT", "Why can investment fall while output rises?", "Investment depends on the change in output; if output rises more slowly, the accelerator effect is smaller.");
});
