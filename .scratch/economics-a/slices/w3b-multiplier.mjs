// W3b: the multiplier (both boards; Cambridge A Level only, ZIMSEC Form 6).
import { concept, P, chk, table, fmt, keynes, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.multiplier", { file: "macro/multiplier", keyPrefix: "macro.multiplier" }, (b) => {
  mc(b, [1, "RECALL"], "The multiplier is the ratio of",
    ["the total change in national income to the initial change in an injection", "Correct: ΔY ÷ ΔInjection."],
    [["the change in consumption to the change in income", "That is the marginal propensity to consume."],
     ["the change in imports to the change in national income", "That is the marginal propensity to import."],
     ["the initial change in an injection to the change in income", "That inverts the ratio."]],
    "The multiplier shows how many times a change in injections is multiplied in national income.");

  mc(b, [2, "APPLICATION"], "In a closed economy without government the marginal propensity to save is 0.25. The multiplier is",
    ["4", "Correct: 1 ÷ 0.25."],
    [["0.25", "That is the MPS itself."],
     ["0.75", "That is the MPC."],
     ["1.33", "That is 1 ÷ MPC."]],
    "k = 1 ÷ MPS = 1 ÷ 0.25 = 4.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which change would reduce the size of the multiplier?",
    ["A rise in the marginal propensity to import", "Correct: more of each extra dollar leaks abroad."],
    [["A rise in the marginal propensity to consume home goods", "More home spending raises the multiplier."],
     ["A fall in the marginal rate of tax", "A lower tax leakage raises the multiplier."],
     ["A fall in the marginal propensity to save", "A lower saving leakage raises the multiplier."]],
    "Larger leakages (saving, tax, imports) reduce the multiplier.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a withdrawal (leakage) from the circular flow of income?",
    ["Spending on imported goods", "Correct: income that leaves the domestic spending flow."],
    [["Government spending on new schools", "That is an injection."],
     ["Exports of tobacco to foreign buyers", "That is an injection."],
     ["Firms' investment in new machinery", "That is an injection."]],
    "Saving, taxation and imports are withdrawals; investment, government spending and exports are injections.");

  {
    const k = keynes.multiplier({ mpc: 0.8 });
    mc(b, [3, "APPLICATION"], "The multiplier in an economy is 5. Investment falls by US\\$30 million. National income falls by",
      ["US\\$150 million", "Correct: 5 × 30."],
      [["US\\$30 million", "That is the initial fall in investment."],
       ["US\\$6 million", "That divides by the multiplier instead of multiplying."],
       ["US\\$35 million", "That adds the multiplier to the change."]],
      `Change in income = k × change in injection = ${roundTo(k, 0)} × (−30) = −US\\$150 million.`, { hints: ["ΔY = k × ΔI."] });
  }

  mc(b, [3, "APPLICATION"], "Which economy has the largest multiplier? (Propensities as fractions of national income.)",
    ["MPS = 0.05, MPT = 0.15, MPM = 0.10", "Correct: total leakage 0.30 gives k = 3.3."],
    [["MPS = 0.10, MPT = 0.20, MPM = 0.20", "Total leakage 0.50 gives k = 2."],
     ["MPS = 0.15, MPT = 0.25, MPM = 0.30", "Total leakage 0.70 gives k = 1.4."],
     ["MPS = 0.20, MPT = 0.20, MPM = 0.10", "Total leakage 0.50 gives k = 2."]],
    "The smallest total leakage gives the largest multiplier.", { hints: ["k = 1 ÷ (MPS + MPT + MPM)."] });

  mc(b, [3, "ANALYSIS"], "Compared with an economy with high unemployment, in an economy close to full capacity a rise in government spending is likely to have",
    ["a smaller effect on real output and a larger effect on prices", "Correct: extra demand cannot be met by extra output."],
    [["a larger effect on real output and a smaller effect on prices", "Spare capacity allows output to rise."],
     ["no effect on either real output or prices", "Prices and output will be affected."],
     ["an effect on real output only, because the multiplier is the same", "The real multiplier depends on spare capacity."]],
    "Without spare capacity, the multiplier raises prices rather than output.", { hints: ["Can firms increase output when they are at capacity?"] });

  mc(b, [4, "EVALUATION"], "A government expects a multiplier of 3 but finds that an injection of US\\$40 million raises national income by only US\\$60 million. Which is the most likely explanation?",
    ["Much of the spending went on imports and private investment fell as rates rose", "Correct: leakages and crowding out reduce the multiplier."],
    [["The marginal propensity to consume was much higher than the government expected", "A higher MPC would raise the multiplier."],
     ["The injection was spent entirely on goods made at home by firms with idle capacity", "That would give a larger effect."],
     ["The multiplier only operates in the first round of spending and then stops", "It operates through many rounds."]],
    "The actual multiplier was 60 ÷ 40 = 1.5, below 3, because of larger leakages and crowding out.", { hints: ["Calculate the actual multiplier and think about leakages."] });

  {
    const k1 = keynes.multiplier({ mpc: 0.75 }); chk(k1, 4, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: 60 * k1, unit: "US$ million", dp: 0, tol: 0.5,
      stem: "In a closed economy without government the marginal propensity to consume is 0.75. Investment rises by US\\$60 million. Calculate the total rise in national income, in US\\$ million.",
      wrong: [45, 80, 15], explanation: "MPS = 0.25, so k = 4. Rise in income = 4 × 60 = US\\$240 million." });
    const k2 = keynes.multiplierFromWithdrawals({ mps: 0.06, mpt: 0.2, mpm: 0.14 }); chk(roundTo(k2, 2), 2.5, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "elasticity", value: k2, dp: 2, hints: ["Add the three leakages, then invert."],
      stem: "In an open economy the marginal propensity to save is 0.06, the marginal propensity to tax is 0.20 and the marginal propensity to import is 0.14 (all as fractions of national income). Calculate the multiplier, to two decimal places.",
      wrong: [16.67, 0.4, 5.0], explanation: "MPW = 0.06 + 0.20 + 0.14 = 0.40. k = 1 ÷ 0.40 = 2.50. Using only the MPS gives 16.67." });
    const k3 = keynes.multiplier({ mpc: 0.9, mrt: 0.2, mpm: 0.12 }); chk(roundTo(k3, 2), 2.5, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "elasticity", value: k3, dp: 2, hints: ["MPC out of national income = 0.9 × (1 − 0.2)."],
      stem: "Households spend 0.90 of each extra dollar of disposable income. The marginal rate of tax is 20% and the marginal propensity to import is 0.12 (as a fraction of national income). Calculate the multiplier, to two decimal places.",
      wrong: [10.0, 3.57, 1.39], explanation: "1. MPC out of national income = 0.9 × 0.8 = 0.72, so spending leaks out as 1 − 0.72 = 0.28 (saving 0.08 and tax 0.20).\n2. Add imports 0.12: MPW = 0.28 + 0.12 = 0.40.\n3. k = 1 ÷ 0.40 = 2.50. Using 1 ÷ (1 − 0.9) = 10 ignores tax and imports." });
    const dI = -40 * k3; chk(dI, -100, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: dI, unit: "US$ million", dp: 0, tol: 0.5, hints: ["A fall in an injection has a downward multiplier effect."],
      stem: "The multiplier is 2.5. Exports fall by US\\$40 million. Calculate the change in national income, in US\\$ million (a fall is a negative number).",
      wrong: [100, -16, -40], explanation: "Change in national income = 2.5 × (−40) = −US\\$100 million." });
    const kk = 175 / 50; chk(kk, 3.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "elasticity", value: kk, dp: 2, hints: ["Multiplier = change in income ÷ change in injection."],
      stem: "An economy's national income rises by US\\$175 million after a rise in investment of US\\$50 million. Calculate the multiplier, to two decimal places.",
      wrong: [0.29, 125, 2.0], explanation: "k = ΔY ÷ ΔI = 175 ÷ 50 = 3.50." });
  }


  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each propensity with its meaning.",
    pairs: [["MPS", "The fraction of extra income that is saved"], ["MPT", "The fraction of extra income that is paid in tax"], ["MPM", "The fraction of extra income that is spent on imports"], ["MPW", "The fraction of extra income that leaks from the circular flow"]],
    explanation: "MPW = MPS + MPT + MPM." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The multiplier is equal to 1 divided by the marginal propensity to {{blank:a}}. A higher marginal propensity to import makes the multiplier {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["withdraw"], choices: ["withdraw", "consume"] }, { id: "b", accepted: ["smaller"], choices: ["smaller", "larger"] }],
    explanation: "k = 1 ÷ MPW; imports are a leakage, so the multiplier falls." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the part of extra income that is saved, taxed or spent on imports?",
    accepted: ["withdrawals", "leakages", "leakage", "withdrawal", "marginal propensity to withdraw"], wrong: ["injections"],
    explanation: "Withdrawals or leakages are saving, tax and imports." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Trace the rounds of spending."],
    stem: "Explain the multiplier process following a rise in government spending.",
    points: ["The government spending becomes income for those who supply the goods and services.", "They spend a proportion of the extra income (the MPC) on goods and services, creating income for others.", "This process repeats in successive rounds, each smaller because of leakages.", "National income rises by a multiple of the original spending."],
    modelAnswer: "The government spending becomes income for the firms and workers who provide the goods and services. They spend a proportion of their extra income on further goods and services, which creates income for others, and the process continues in successive rounds that become smaller because part of each round leaks into saving, tax and imports. The total rise in national income is a multiple of the original spending.",
    explanation: "Income, re-spending, rounds with leakages, multiple." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about leakages and spare capacity."],
    stem: "Explain two reasons why the actual multiplier may be smaller than the calculated multiplier.",
    points: ["Spare capacity is limited, so extra demand raises prices rather than real output.", "So real national income rises by less than expected.", "Higher leakages than assumed (imports, tax or saving) reduce each round.", "Or crowding out: higher interest rates reduce private investment."],
    modelAnswer: "If the economy has little spare capacity, extra demand raises prices rather than output, so real income rises by less than the formula suggests. Leakages into imports, taxes or saving may also be higher than assumed, so each round of spending is smaller.",
    explanation: "Two reasons with explanations." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Imports as a leakage."],
    stem: "Explain why a small, open economy with a high marginal propensity to import is likely to have a low multiplier.",
    points: ["Imports are a withdrawal from the domestic circular flow.", "A high MPM means a large share of each extra dollar of income is spent abroad.", "Less is spent on home-produced goods in each round.", "The total leakage (MPS + MPT + MPM) is large, so k = 1 ÷ MPW is small.", "So an injection raises national income by a small multiple."],
    modelAnswer: "Imports are a withdrawal from the domestic circular flow. If the marginal propensity to import is high, a large share of each extra dollar of income is spent abroad, so less is spent on home-produced goods in each round. The total leakage is therefore large and the multiplier, 1 divided by the marginal propensity to withdraw, is small.",
    explanation: "Imports leak; high MPM; smaller rounds; large MPW; small k." });

  {
    const mps = 0.04, mpt = 0.24, mpm = 0.12;
    const mpw = mps + mpt + mpm; chk(roundTo(mpw, 2), 0.4, 1e-9);
    const k = keynes.multiplierFromWithdrawals({ mps, mpt, mpm }); chk(roundTo(k, 2), 2.5, 1e-9);
    const dy = 120 * k; chk(roundTo(dy, 1), 300, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["MPW = MPS + MPT + MPM; k = 1 ÷ MPW."],
      stem: "**An export boom in Zandia (fictional, illustrative)**\n\nIn Zandia the marginal propensity to save is 0.04, the marginal propensity to tax is 0.24 and the marginal propensity to import is 0.12 (all as fractions of national income). A new export order raises export earnings by US\\$120 million.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "elasticity", value: mpw, dp: 2, stem: "Calculate the marginal propensity to withdraw.", wrong: [0.04, 0.28, 0.24], explanation: "MPW = 0.04 + 0.24 + 0.12 = 0.40." }),
        P.num({ label: "(b)", marks: 1, kind: "elasticity", value: k, dp: 2, stem: "Calculate the multiplier, to two decimal places.", wrong: [25.0, 0.4, 5.0], explanation: "k = 1 ÷ 0.40 = 2.50." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: dy, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the total rise in national income, in US\\$ million.", wrong: [120, 48, 2000], explanation: "Rise = 2.5 × 120 = US\\$300 million." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how a rise in the marginal propensity to import would affect the rise in national income.",
          points: ["A higher MPM increases the total leakage (MPW).", "The multiplier falls (k = 1 ÷ MPW).", "So the total rise in national income from the US\\$120 million is smaller."],
          modelAnswer: "A higher marginal propensity to import raises the total leakage from each round of spending, so the multiplier, 1 divided by the marginal propensity to withdraw, falls. The total rise in national income from the US\\$120 million export order is therefore smaller." }),
        P.manual({ label: "(e)", marks: 3, stem: "State and explain one reason why the actual rise in national income may differ from the amount calculated in (c).",
          points: ["Spare capacity (or the lack of it): with full employment prices rise instead of output.", ["The explanation: extra demand cannot be met by extra output, so prices rise and real income rises by less than calculated.", 2]],
          modelAnswer: "If the economy has little spare capacity, firms cannot increase output to meet the extra demand, so prices rise instead and real income rises by less than the US\\$300 million calculated." }),
      ],
      explanation: "MPW 0.40; k = 2.50; rise in income US\\$300 million; higher imports reduce k." });
  }
  {
    const mps = 0.05, mpt = 0.25, mpm = 0.35;
    const k = keynes.multiplierFromWithdrawals({ mps, mpt, mpm }); chk(roundTo(k, 2), 1.54, 1e-9);
    const dy = 200 * k; chk(roundTo(dy, 0), 308, 1e-9);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["k = 1 ÷ (MPS + MPT + MPM).", "In (d) think about leakages, spare capacity and who is employed."],
      stem: "**Public works in Dambo (fictional)**\n\nDambo is a small economy that imports most of its fuel, machinery and consumer goods. The marginal propensity to save is 0.05, the marginal propensity to tax is 0.25 and the marginal propensity to import is 0.35 (as fractions of national income). The government plans a US\\$200 million programme of public works to reduce unemployment. Many unemployed workers are available, but the building firms must import most of their equipment, and the central bank says that heavy borrowing by the government could push up interest rates.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: k, dp: 2, stem: "Calculate the multiplier, to two decimal places.", wrong: [20, 0.65, 2.5], explanation: "MPW = 0.05 + 0.25 + 0.35 = 0.65. k = 1 ÷ 0.65 = 1.54." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: dy, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the rise in national income from the programme, in US\\$ million to the nearest whole number.", wrong: [200, 130, 4000], explanation: "Rise = 1.538 × 200 = US\\$308 million." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain two reasons why the actual rise in national income might be less than your answer to (b).",
          points: ["Imported equipment means that part of the spending leaks abroad immediately.", "So less of the injection becomes income for domestic firms.", "Higher interest rates from government borrowing crowd out private investment.", "So private spending falls, offsetting part of the rise in income."],
          modelAnswer: "Building firms import most of their equipment, so part of the spending leaks abroad at once and less becomes income for domestic firms. Government borrowing might also raise interest rates and crowd out private investment, which reduces private spending and offsets part of the rise in national income." }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 200 }, levels: [[3, 4, 4, "Two-sided, applied to the data, with a justified judgement."], [2, 2, 3, "Some weighing, limited application."], [1, 1, 1, "A simple statement."]],
          stem: "Assess whether the public works programme is likely to be effective in reducing unemployment in Dambo.",
          points: ["The multiplier is positive (1.54), and with unemployed workers available there is spare capacity so output can rise.", "The multiplier is low because of the high import content and taxes.", "Import leakages and crowding out reduce the effect.", "Judgement: some reduction in unemployment, but less than calculated; choose local materials."],
          modelAnswer: "Many unemployed workers are available, so the programme can raise output and employment, and the multiplier of 1.54 means that national income rises by about US\\$308 million. However, the multiplier is low because of the high import content and taxes, and crowding out may reduce the effect. The programme will probably reduce unemployment, but by less than the calculation suggests, unless more of the materials are produced at home." }),
      ],
      explanation: "k = 1.54; income rise US\\$308 million; imports and crowding out reduce it; spare labour supports it." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider spare capacity, leakages, time lags and expectations."],
    stem: "Assess the usefulness of the multiplier to a government deciding how much to increase its spending.",
    points: ["It estimates the total effect of an injection on national income.", "It shows how a change in spending is magnified through rounds of spending.", "It helps to calculate the injection needed to close a gap.", "Its value depends on propensities that are uncertain and change.", "Spare capacity is needed; otherwise prices rise.", "Time lags, crowding out and expectations reduce the effect.", "Leakages (especially imports) are large in small open economies.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "The multiplier is useful because it estimates the total effect of an injection on national income and shows how an initial rise in spending is magnified through successive rounds. It helps a government to calculate the injection needed to reach a target level of income. However, the multiplier depends on propensities that are uncertain and change with confidence. It assumes spare capacity, so near full employment extra demand will raise prices rather than output. Time lags delay the effect, crowding out may offset part of it and in a small open economy with large imports much of the extra spending leaks abroad. Overall the multiplier is a useful guide to the direction and approximate scale of the effect but not a precise forecast.",
    explanation: "Weigh the use of the model against uncertain propensities, capacity limits and leakages." });

  b.card("DEFINITION", "Define the **multiplier**.", "The ratio of the change in equilibrium national income to the initial change in autonomous spending (an injection).");
  b.card("FORMULA", "Closed economy multiplier?", "k = 1 ÷ (1 − MPC) = 1 ÷ MPS.");
  b.card("FORMULA", "General multiplier formula?", "k = 1 ÷ (MPS + MPT + MPM), all as fractions of national income.");
  b.card("FORMULA", "Change in income from an injection?", "ΔY = k × ΔInjection.");
  b.card("DEFINITION", "What is the **marginal propensity to withdraw**?", "The fraction of an extra dollar of income that leaks from the circular flow: MPS + MPT + MPM.");
  b.card("CONCEPT", "Which changes reduce the multiplier?", "A higher MPS, MPT or MPM (larger leakages).");
  b.card("CONCEPT", "Name three limitations of the multiplier.", "Time lags, limited spare capacity (inflation), crowding out and leakages/changing propensities.");
  b.card("CONCEPT", "Does the multiplier work for falls in injections?", "Yes: a fall in investment, exports or government spending has a downward multiplier effect on income.");
  b.card("FORMULA", "Alternative open-economy multiplier form?", "k = 1 ÷ (1 − MPC(1 − MRT) + MPM), with MPC out of disposable income.");
});
