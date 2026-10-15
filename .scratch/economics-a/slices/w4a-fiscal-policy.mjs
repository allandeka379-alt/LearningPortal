// W4a: fiscal policy (both boards; ZIMSEC Form 6, Cambridge AS).
import { concept, P, chk, schedule, pctChange } from "../lib.mjs";
import { mc, LV6, LV10 } from "../tables/w4a-kit.mjs";

concept("aecon.policy.fiscal-policy", { file: "policy/fiscal-policy", keyPrefix: "policy.fiscal-policy" }, (b) => {
  mc(b, [2, "RECALL"], "A budget deficit occurs when",
    ["government spending in a year is greater than government revenue", "Correct: the government must borrow the difference."],
    [["government revenue in a year is greater than government spending", "This is a budget surplus."],
     ["the total amount the government owes has risen above GDP", "This describes a high debt ratio, not the year's budget balance."],
     ["the country imports more than it exports in a year", "This is a trade deficit, not a budget deficit."]],
    "A deficit is a flow: spending minus revenue in one year.", { daily: true });

  mc(b, [3, "UNDERSTANDING"], "Which statement about a government's deficit and national debt is correct?",
    ["The debt is the total owed and the deficit is the shortfall in one year", "Correct: a stock and a flow."],
    [["The deficit is the total owed and the debt is the shortfall in one year", "The two terms are reversed."],
     ["The debt is the same as the deficit because borrowing equals spending", "The debt is built up over many years of deficits."],
     ["The deficit can exist only when the national debt has fallen to zero", "Deficits add to the debt; they do not require it to be zero."]],
    "The national debt is a stock of past borrowing; the deficit is the amount borrowed in a year.", { hints: ["Think of a stock as a total at a point in time and a flow as an amount per year."] });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an example of government capital spending?",
    ["Building a new dam for irrigation", "Correct: it creates a long-lasting asset."],
    [["Paying the salaries of nurses", "This is current spending used up in the year."],
     ["Paying interest on the national debt", "This is current spending."],
     ["Paying monthly pensions to retired civil servants", "This is a transfer payment, part of current spending."]],
    "Capital spending buys or builds lasting assets such as dams, roads and hospitals.");

  mc(b, [2, "APPLICATION"], "Which combination of policies is expansionary fiscal policy?",
    ["A rise in spending on public works with a cut in income tax", "Correct: both changes raise aggregate demand."],
    [["A fall in public spending with a rise in income tax", "Both changes reduce aggregate demand, so this is contractionary."],
     ["A rise in the central bank's interest rate with a cut in public spending", "Interest rates are monetary policy, and cutting spending is contractionary."],
     ["A cut in government spending with a cut in income tax", "The spending cut and the tax cut push in opposite directions."]],
    "Expansionary fiscal policy raises spending, cuts taxes or both.", { daily: true });

  mc(b, [3, "ANALYSIS"], "An economy is close to full capacity. A rise in government spending is most likely to cause",
    ["a higher price level and only a small rise in real output", "Correct: firms cannot easily increase output."],
    [["a large rise in real output and no change in the price level", "This would need large spare capacity."],
     ["a fall in the price level and a fall in real output together", "Higher spending shifts AD to the right, not the left."],
     ["a fall in real output because spending reduces capacity", "Spending does not cut capacity; it raises demand."]],
    "Near the vertical part of the SRAS curve extra demand mostly raises prices.", { hints: ["Can firms increase output easily when they are close to capacity?"] });

  mc(b, [3, "UNDERSTANDING"], "Crowding out occurs when",
    ["government borrowing pushes up interest rates and cuts private investment", "Correct: public spending displaces private spending."],
    [["government spending falls, so firms produce less output and hire fewer workers", "That is a fall in aggregate demand, not crowding out."],
     ["higher taxes reduce the amount that households are able to save", "This is a disposable income effect, not crowding out."],
     ["private firms replace the government as the largest buyer of imports", "This has nothing to do with borrowing and interest rates."]],
    "Heavy government borrowing competes for funds, pushes up interest rates and so discourages private investment.", { hints: ["Think about what happens to the demand for loanable funds."] });


  mc(b, [4, "EVALUATION"], "Which situation makes expansionary fiscal policy LEAST likely to raise real output?",
    ["An economy at full employment where the spending is financed by borrowing at home", "Correct: prices rise and private investment is crowded out."],
    [["An economy in a deep recession with unused factories and unemployed workers", "Spare capacity lets output respond."],
     ["An economy in which the extra spending goes mostly on goods made at home", "More domestic spending raises the effect."],
     ["An economy in which firms expect demand to grow and plan new investment", "Optimistic firms add to the effect."]],
    "With no spare capacity, extra demand raises prices, and borrowing crowds out private spending.", { hints: ["Look for spare capacity and leakages."] });

  {
    const def = 7980 - 7450; chk(def, 530);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: def, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Deficit = spending − revenue."],
      stem: "A government plans to spend US\\$7,980 million and expects revenue of US\\$7,450 million. Calculate the budget deficit, in US\\$ million.",
      wrong: [15430, 7450, -530], explanation: "Deficit = spending − revenue = 7,980 − 7,450 = US\\$530 million. Adding the two figures gives 15,430." });
    const r2 = (11400 / 24000) * 100; chk(r2, 47.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: r2, dp: 1, unit: "%", calculator: true, hints: ["Debt ÷ GDP × 100."],
      stem: "A government's national debt is US\\$11,400 million and GDP is US\\$24,000 million. Calculate the debt as a percentage of GDP, to one decimal place.",
      wrong: [210.5, 52.5, 4.75], explanation: "Debt ratio = 11,400 ÷ 24,000 × 100 = 47.5%." });
    const k = 2.5; const dAD = k * 48; chk(dAD, 120);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: dAD, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Change in demand = multiplier × change in spending."],
      stem: "The multiplier is 2.5. The government raises spending by US\\$48 million and keeps tax revenue unchanged. Calculate the maximum rise in aggregate demand, in US\\$ million.",
      wrong: [48, 19.2, 50.5], explanation: "Rise = 2.5 × 48 = US\\$120 million. Dividing 48 by 2.5 gives 19.2." });
    const net = 3 * (60 - 20); chk(net, 120);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "plain", value: net, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Find the net change in spending first, then apply the multiplier."],
      stem: "The government raises spending by US\\$60 million. The multiplier is 3. Borrowing to pay for the spending raises interest rates and crowds out US\\$20 million of private investment. Calculate the net change in aggregate demand, in US\\$ million.",
      wrong: [180, 40, 160], explanation: "1. Net initial change in spending = 60 − 20 = US\\$40 million.\n2. Net change in aggregate demand = 3 × 40 = US\\$120 million.\nIgnoring crowding out gives 3 × 60 = 180." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: a cut in government spending is an example of expansionary fiscal policy.",
    feedbackFalse: "Lower government spending reduces aggregate demand, so it is contractionary.",
    explanation: "Expansionary fiscal policy raises spending or cuts taxes. Cutting spending reduces aggregate demand." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Budget deficit", "Government spending exceeds revenue in a year"], ["National debt", "Total owed by the government at a point in time"], ["Capital spending", "Spending on lasting assets such as roads and dams"], ["Transfer payment", "A payment, such as a pension, that does not buy current output"]],
    explanation: "A deficit is a flow, debt is a stock; capital spending builds assets; transfers move income." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "When government spending is greater than revenue there is a budget {{blank:a}}. The total amount owed built up from past borrowing is called the national {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["deficit"], choices: ["deficit", "surplus", "balance"] }, { id: "b", accepted: ["debt"], choices: ["debt", "deficit", "income"] }],
    explanation: "Spending above revenue is a deficit; the accumulated borrowing is the debt." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the use of government spending and taxation to influence aggregate demand?",
    accepted: ["fiscal policy", "fiscal"], wrong: ["monetary policy"],
    explanation: "Fiscal policy uses spending and taxation; monetary policy uses interest rates and the money supply." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Mention both spending and taxation."],
    stem: "Define fiscal policy.",
    points: ["The use of government spending and taxation (and borrowing).", "To influence aggregate demand, output, employment and the price level."],
    modelAnswer: "Fiscal policy is the use of government spending, taxation and borrowing to influence aggregate demand and so output, employment and the price level.",
    explanation: "Spending and taxation as instruments; aggregate demand as the target." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Start with the change in AD."],
    stem: "Explain how an increase in government spending on public works could reduce unemployment.",
    points: ["Government spending is a component of aggregate demand, so AD shifts to the right.", "Firms hire more workers to build the roads or schools and to supply materials.", "The extra incomes are spent again (the multiplier) and raise demand for other goods.", "So output rises and the demand for labour increases, which reduces demand-deficient unemployment."],
    modelAnswer: "Government spending is a component of aggregate demand, so more spending on public works shifts AD to the right. Firms hire extra workers to build the roads and to supply materials. The new incomes are spent again through the multiplier, which raises demand for other goods and services. Output and the demand for labour rise, so demand-deficient unemployment falls.",
    explanation: "AD rises, extra jobs, multiplier, lower unemployment." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think of opportunity cost and the exchange rate."],
    stem: "Explain two problems that a large national debt can cause for a government.",
    points: ["Interest payments on the debt take a large share of revenue.", "Leaving less to spend on services and investment (an opportunity cost).", "Heavy borrowing may crowd out private investment by raising interest rates.", "Foreign debt must be repaid in foreign currency, which may put pressure on the balance of payments."],
    modelAnswer: "A large debt means that a big share of revenue must be used to pay interest, which leaves less to spend on services and investment because of the opportunity cost. Heavy borrowing at home may also push up interest rates and crowd out private investment, and any foreign debt has to be repaid in foreign currency, which puts pressure on the balance of payments.",
    explanation: "Interest burden and opportunity cost; crowding out; foreign currency repayment." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use the idea of the shape of the SRAS curve."],
    stem: "Analyse why expansionary fiscal policy may have a different effect on output when an economy has spare capacity than when it is at full capacity.",
    points: ["Expansionary policy shifts AD to the right.", "With spare capacity the SRAS curve is flat or gently sloping, so firms can raise output without raising costs much.", "So output and employment rise by most of the shift, with a small rise in prices.", "At or near full capacity the SRAS curve is steep or vertical, because factors are scarce.", "So most of the extra demand raises the price level and output rises very little."],
    modelAnswer: "Expansionary policy shifts aggregate demand to the right. If there is spare capacity the short-run aggregate supply curve is flat or gently sloping, because firms can raise output without much rise in costs, so output and employment rise by most of the shift and prices rise only a little. Near full capacity, factors of production are scarce and the SRAS curve is steep or vertical, so most of the extra demand raises the price level and output rises very little.",
    explanation: "AD shift, flat SRAS with spare capacity, steep SRAS at full capacity." });

  {
    const rev = 3100, cur = 2800, cap = 450, spend = cur + cap; chk(spend, 3250);
    const def = spend - rev; chk(def, 150);
    const ratio = (4500 / 12000) * 100; chk(ratio, 37.5);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Deficit = total spending − revenue.", "Debt ratio = debt ÷ GDP × 100."],
      stem: "**The budget of Zandia (a fictional economy, illustrative)**\n\nThe government of Zandia plans the following budget for next year. Revenue is US\\$3,100 million. Current spending is US\\$2,800 million and capital spending, mainly on roads and irrigation, is US\\$450 million. The national debt is US\\$4,500 million and GDP is US\\$12,000 million.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: def, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the planned budget deficit, in US\\$ million.", wrong: [350, 450, 5950], explanation: "Total spending = 2,800 + 450 = 3,250. Deficit = 3,250 − 3,100 = US\\$150 million." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: ratio, dp: 1, unit: "%", stem: "Calculate the national debt as a percentage of GDP, to one decimal place.", wrong: [26.7, 3.75, 100], explanation: "Debt ratio = 4,500 ÷ 12,000 × 100 = 37.5%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why spending on irrigation might make the debt easier to manage in the long run.",
          points: ["Irrigation is capital spending that creates a lasting asset.", "It raises the economy's productive capacity and output (LRAS), so GDP and tax revenue grow.", "So the debt falls as a percentage of GDP and is easier to repay."],
          modelAnswer: "Irrigation is capital spending that creates a lasting asset. It raises productive capacity and output, so GDP and tax revenue grow in the future. The debt then falls as a percentage of GDP and is easier to repay." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which is a way in which the government of Zandia could finance the deficit?",
          options: [["Borrowing from domestic banks and pension funds", "Correct: this is a normal source of finance."], ["Cutting its own borrowing to zero", "The deficit has to be financed somehow."], ["Reducing the national debt to GDP ratio", "This is a possible result of policy, not a source of finance."], ["Lowering the rate of income tax", "This would increase the deficit."]], answer: "A",
          explanation: "Deficits are financed by borrowing from domestic or foreign lenders, or by creating money." }),
      ],
      explanation: "Deficit US\\$150 million; debt ratio 37.5%; capital spending raises capacity and future revenue." });
  }
  {
    const Pl = [50, 60, 70, 80, 90];
    const ad1 = [1300, 1220, 1140, 1060, 980];
    const as = [1000, 1060, 1140, 1190, 1230];
    const ad2 = ad1.map((x) => x + 130);
    const s1 = schedule({ prices: Pl, qd: ad1, qs: as, priceHeader: "Price level (index)", qdHeader: "AD1 (US\\$ million)", qsHeader: "SRAS (US\\$ million)", requireEquilibrium: true });
    const s2 = schedule({ prices: Pl, qd: ad2, qs: as, requireEquilibrium: true });
    chk(s1.equilibrium.price, 70); chk(s1.equilibrium.quantity, 1140);
    chk(s2.equilibrium.price, 80); chk(s2.equilibrium.quantity, 1190);
    const dP = pctChange(70, 80); chk(Math.round(dP * 10) / 10, 14.3);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Add 130 to AD1 at each price level to get AD2, then find where AD2 equals SRAS.", "In (d) consider spare capacity, the multiplier and crowding out."],
      stem: `**A fiscal stimulus in Mbira (a fictional economy, illustrative)**\n\nMbira has an unemployment problem. The table shows aggregate demand (AD1) and short-run aggregate supply (SRAS) at different price levels. The government raises its spending on school and clinic building, which shifts aggregate demand to the right by US\\$130 million at every price level. The building is paid for by borrowing from local banks, and most materials are made in Mbira.\n\n${s1.md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: 1190, unit: "US$ million", dp: 0, tol: 0.5, stem: "After the shift, find the new equilibrium level of real GDP, in US\\$ million.", wrong: [1140, 1270, 1060], explanation: "AD2 = AD1 + 130. At a price level of 80, AD2 = 1,060 + 130 = 1,190, which equals SRAS: equilibrium real GDP is US\\$1,190 million." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: dP, dp: 1, unit: "%", stem: "Calculate the percentage change in the price level between the old and new equilibrium.", wrong: [10, 4.4, 50], explanation: "The price level rises from 70 to 80: (80 − 70) ÷ 70 × 100 = 14.3%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why real GDP rose by less than the US\\$130 million shift in aggregate demand.",
          points: ["The SRAS curve slopes upward: firms can raise output only if prices rise.", "Part of the extra demand therefore raised the price level (by 14.3%).", "So real output rose only by US\\$50 million, from 1,140 to 1,190."],
          modelAnswer: "The SRAS curve slopes upward, so firms raise output only if the price level rises. Part of the extra demand was therefore absorbed by higher prices (a 14.3% rise) and real GDP rose by only US\\$50 million, from 1,140 to 1,190." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 280 }, levels: LV6,
          stem: "Assess whether the government's policy is likely to reduce unemployment in Mbira.",
          points: ["Real GDP rises by US\\$50 million, so firms need more workers and unemployment falls.", "Spending on materials made in Mbira means little leaks abroad, so the multiplier is larger.", "Prices rise by 14.3%, which erodes part of the gain and may reduce the real value of incomes.", "Borrowing from local banks may push up interest rates and crowd out private investment.", "Time lags in building mean the effect may come late.", "Judgement: some reduction in unemployment, but smaller than the shift in AD suggests."],
          modelAnswer: "Real GDP rises by US\\$50 million, so firms need more workers and unemployment should fall. Because most materials are made in Mbira little of the spending leaks abroad, so the multiplier is larger. However, prices rise by 14.3%, which erodes part of the gain, and borrowing from local banks may push up interest rates and crowd out private investment. The building will also take time. Overall the policy should reduce unemployment, but by less than the size of the AD shift suggests." }),
      ],
      explanation: "New equilibrium US\\$1,190 million at price level 80 (a 14.3% rise); the AD shift of 130 raises output by only 50; assess the effect on unemployment." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Consider spare capacity, the multiplier, crowding out, debt and time lags."],
    stem: "Discuss the effectiveness of fiscal policy in reducing unemployment in a developing economy.",
    points: ["Higher spending or lower taxes raise AD, output and demand for labour.", "The multiplier magnifies the effect.", "Spare capacity and surplus labour mean output can respond without large price rises.", "In a developing economy much unemployment may be structural or hidden, which demand does not cure.", "Borrowing may crowd out private investment and add to debt.", "Small tax base, informal sector and import leakages weaken the effect.", "Time lags in spending and weak administration.", "Spending on infrastructure and education raises long-run supply.", "A justified judgement.", "Application to a developing economy."],
    levels: LV10, wordLimit: { min: 150, max: 400 },
    modelAnswer: "Higher government spending or lower taxes raise aggregate demand, and where there is spare capacity and surplus labour output and employment can rise with little inflation. The multiplier magnifies the effect, and spending on infrastructure and education also raises long-run supply. However, much unemployment in a developing economy may be structural or hidden in the informal sector, so extra demand will not cure it. A small tax base limits the revenue available, borrowing may crowd out private investment and add to debt, and a high marginal propensity to import means that part of the spending leaks abroad. There are also lags in spending because administration may be weak. Fiscal policy is therefore useful where unemployment is caused by a lack of demand and where the spending goes on locally made goods and productive investment, but it must be combined with supply-side measures to deal with structural unemployment.",
    explanation: "Weigh the demand effect and the multiplier against structural unemployment, crowding out, leakages and lags." });

  b.card("DEFINITION", "Define **fiscal policy**.", "The use of government spending, taxation and borrowing to influence aggregate demand and so output, employment and the price level.");
  b.card("DEFINITION", "What is a **budget deficit**?", "Government spending greater than government revenue in a year (a flow).");
  b.card("DEFINITION", "What is the **national debt**?", "The total amount the government owes at a point in time: the stock built up from past deficits.");
  b.card("CONCEPT", "Deficit or debt: which is the stock and which the flow?", "The national debt is a stock; the budget deficit is a flow over a year.");
  b.card("CONCEPT", "What is expansionary fiscal policy?", "Higher government spending, lower taxes or both, to raise aggregate demand.");
  b.card("CONCEPT", "Capital spending against current spending?", "Capital spending builds lasting assets (roads, dams); current spending is used up in the year (wages, interest).");
  b.card("FORMULA", "National debt ratio?", "Debt ÷ GDP × 100.");
  b.card("CONCEPT", "What is crowding out?", "Government borrowing raises interest rates and reduces private investment.");
  b.card("CONCEPT", "Why may expansionary policy raise only prices?", "If the economy is at full capacity the SRAS curve is vertical, so extra demand cannot raise output.");
});
