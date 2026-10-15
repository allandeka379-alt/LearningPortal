// W3b: effectiveness of macroeconomic policies, policy conflicts and government failure (both boards; Cambridge A Level only, ZIMSEC Form 6).
import { concept, P, chk, table, fmt, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

// Illustrative Laffer relationship: tax base = a - b t (US$ million), revenue = t/100 x base.
const laffer = (a, bb, t) => ({ base: a - bb * t, revenue: (t / 100) * (a - bb * t) });

concept("aecon.policy.effectiveness-conflicts", { file: "policy/effectiveness-conflicts", keyPrefix: "policy.effectiveness-conflicts" }, (b) => {
  mc(b, [1, "RECALL"], "A policy conflict (trade-off) exists when",
    ["a policy that improves one objective worsens another", "Correct: the objectives cannot both be improved with the same instrument."],
    [["a policy improves every single objective at the same time", "That would be no conflict."],
     ["a government does not have any objectives", "A conflict needs objectives."],
     ["two different governments choose the same policy", "That is not a conflict."]],
    "A conflict arises when improving one objective costs another.");

  mc(b, [2, "UNDERSTANDING"], "An expansionary fiscal policy is most likely to have which effect on the current account of the balance of payments?",
    ["It worsens, because higher incomes raise spending on imports", "Correct: the marginal propensity to import is positive."],
    [["It improves, because higher incomes raise export demand abroad", "Home incomes do not raise foreign demand."],
     ["It is unaffected, because fiscal policy affects only the budget", "It changes AD and so imports."],
     ["It always moves into surplus, because the currency rises", "A rise in AD tends to cause a deficit."]],
    "More spending and income raise imports, worsening the current account.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A government decides to cut spending to reduce a boom, but by the time the cut takes effect the economy is already in recession. This is an example of",
    ["government failure caused by time lags", "Correct: the policy arrives too late and adds to instability."],
    [["a conflict between inflation and unemployment", "The problem here is timing."],
     ["a movement along the Laffer curve", "The Laffer curve relates tax rates and revenue."],
     ["crowding out of private investment by public borrowing", "No borrowing is mentioned."]],
    "Time lags can make policy destabilising.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "On a Laffer curve, a cut in the tax rate will increase tax revenue only if the economy is",
    ["at a tax rate above the one that maximises revenue", "Correct: on the downward-sloping part of the curve."],
    [["at a tax rate below the one that maximises revenue", "There, a cut lowers revenue."],
     ["at a tax rate of exactly zero percent", "A rate of zero yields zero revenue."],
     ["at the tax rate that maximises revenue", "Any change from the peak lowers revenue."]],
    "Above the revenue-maximising rate, a lower rate raises revenue by expanding the base.");

  mc(b, [3, "ANALYSIS"], "A central bank cuts interest rates to boost growth in an economy that is already close to full capacity. The most likely conflict is with the objective of",
    ["price stability", "Correct: demand-pull inflation may follow."],
    [["a lower budget deficit in all circumstances", "A lower rate may reduce interest costs."],
     ["raising the unemployment rate", "Lower rates reduce unemployment."],
     ["reducing the volume of imports", "Higher incomes would raise imports, but the main conflict is with prices."]],
    "Near capacity, extra demand raises prices.", { hints: ["What happens when AD rises with no spare capacity?"] });

  mc(b, [3, "ANALYSIS"], "Which of the following is an interventionist supply-side policy?",
    ["Government spending on technical training and rural roads", "Correct: direct government action to raise capacity."],
    [["Deregulation of markets to encourage competition", "That is market-based."],
     ["A cut in the marginal rate of income tax", "That is market-based."],
     ["A reduction in the power of trade unions", "That is market-based."]],
    "Market-based policies free markets; interventionist ones use government spending and direction.", { hints: ["Does the government act directly or free up markets?"] });

  mc(b, [3, "ANALYSIS"], "Crowding out occurs when",
    ["government borrowing raises interest rates and reduces private investment", "Correct: public spending displaces private spending."],
    [["government spending rises and so private firms receive more orders", "That would be crowding in."],
     ["the central bank prints money to finance the whole budget deficit", "That is money financing."],
     ["a rise in tax rates reduces the demand for imports", "That is not crowding out."]],
    "Borrowing competes with private borrowers for funds.", { hints: ["What happens to interest rates when the government borrows more?"] });

  mc(b, [4, "EVALUATION"], "Why is a demand stimulus often less effective in a small open economy than in a large closed one?",
    ["A larger share of the extra spending leaks into imports", "Correct: a lower multiplier."],
    [["Small economies cannot collect any taxes on spending", "They collect taxes."],
     ["Imports are not affected when incomes rise in a small economy", "They rise."],
     ["The marginal propensity to save is always zero in small economies", "It is not."]],
    "High import content reduces the multiplier and the effect on domestic output.", { hints: ["Think of leakages."] });

  {
    const L = (t) => laffer(1500, 15, t);
    chk(L(40).revenue, 360, 1e-9); chk(L(50).revenue, 375, 1e-9); chk(L(60).revenue, 360, 1e-9); chk(L(70).revenue, 315, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: L(40).revenue, unit: "US$ million", dp: 0, tol: 0.5,
      stem: "In a fictional economy the tax base (taxable income) is US\\$1,500 million − US\\$15 million for each percentage point of the tax rate. Calculate tax revenue at a tax rate of 40%, in US\\$ million.",
      wrong: [600, 900, 900 * 0.4 + 40], explanation: "Base = 1,500 − 15 × 40 = 900. Revenue = 0.40 × 900 = US\\$360 million." });
    b.calc({ d: 4, skill: "APPLICATION", kind: "plain", value: L(50).revenue, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Revenue = rate × base; compare the rates around the peak."],
      stem: "For the same economy (base = 1,500 − 15t, t in percent) revenue is US\\$315 million at 30%, US\\$360 million at 40%, and US\\$360 million at 60%. Calculate the maximum possible revenue, in US\\$ million, which occurs at the rate midway between 40% and 60%.",
      wrong: [360, 400, 450], explanation: "The curve is symmetrical around 50%. At t = 50: base = 1,500 − 750 = 750 and revenue = 0.50 × 750 = US\\$375 million." });
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: L(70).revenue - L(60).revenue, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Revenue at 70% minus revenue at 60%."],
      stem: "In the same economy (base = 1,500 − 15t, t in percent), calculate the change in tax revenue if the tax rate is raised from 60% to 70%, in US\\$ million (a fall is negative).",
      wrong: [45, -10, 315], explanation: "Revenue at 60% = 0.60 × 600 = 360. Revenue at 70% = 0.70 × 450 = 315. Change = −US\\$45 million: the higher rate lowers revenue." });
    const budget = 120 - 95; chk(budget, 25);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: budget, unit: "US$ million", dp: 0, tol: 0.5,
      stem: "A government plans spending of US\\$120 million and expects tax revenue of US\\$95 million. Calculate the budget deficit, in US\\$ million.",
      wrong: [215, -25, 95], explanation: "Deficit = spending − revenue = 120 − 95 = US\\$25 million." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A cut in the rate of income tax always increases tax revenue.", answer: false,
    explanation: "False. It raises revenue only if the economy is on the downward-sloping part of the Laffer curve." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each policy with its likely side effect.",
    pairs: [["Higher interest rates to reduce inflation", "Higher unemployment and slower growth"], ["Expansionary fiscal policy", "A larger budget deficit and more imports"], ["Currency depreciation", "Higher import prices"], ["Tariffs to improve the current account", "Retaliation and higher prices for consumers"]],
    explanation: "Each policy helps one objective at a cost to another." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Policies such as deregulation and lower taxes on enterprise are {{blank:a}} supply-side policies, while government spending on training and roads is {{blank:b}} supply-side policy.",
    blanks: [{ id: "a", accepted: ["market-based"], choices: ["market-based", "interventionist"] }, { id: "b", accepted: ["interventionist"], choices: ["market-based", "interventionist"] }],
    explanation: "Market-based policies free up markets; interventionist policies use public spending and direction." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the effect in which government borrowing raises interest rates and reduces private investment.",
    accepted: ["crowding out", "crowding-out", "the crowding out effect"], wrong: ["multiplier"],
    explanation: "This is crowding out." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name two conflicts and explain each."],
    stem: "Explain two conflicts that may arise between macroeconomic objectives.",
    points: ["Growth and the balance of payments: faster growth raises incomes and spending on imports.", "So the current account deficit widens.", "Inflation and unemployment: raising demand to cut unemployment raises wages and prices.", "So inflation rises in the short run."],
    modelAnswer: "Faster growth raises incomes and so spending on imports, so the current account deficit widens. Raising demand to reduce unemployment increases the demand for labour and pushes up wages and prices, so inflation rises in the short run.",
    explanation: "Two conflicts, each with its link." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Name the type of lag and how it can destabilise."],
    stem: "Explain how time lags may cause macroeconomic policy to be ineffective.",
    points: ["There is a lag before the problem is recognised (data are late).", "There is a lag before a decision is made (budgets, committees).", "There is a lag before the policy affects spending and output.", "By the time it takes effect the economy may have changed.", "The policy may then add to instability instead of reducing it."],
    modelAnswer: "There are delays before a problem is recognised because data are published late, before a decision is made, and before the policy affects spending and output. By the time the policy takes effect the economy may have changed, so a policy designed for a slump may arrive in a boom and add to instability.",
    explanation: "Recognition, decision and impact lags, then the effect." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 5, hints: ["Both sides of the Laffer argument."],
    stem: "Assess the claim that cutting income tax rates will raise government revenue.",
    points: ["It can happen if the rate is above the revenue-maximising rate, because the base expands.", "Lower rates can improve incentives to work, invest and declare income.", "If the rate is below the peak, a cut reduces revenue.", "Evidence on where an economy lies is uncertain.", "Judgement: depends on the starting rate and on how people respond."],
    modelAnswer: "A tax cut raises revenue only if the rate is above the revenue-maximising rate, so that a lower rate expands the tax base through greater effort, investment and less evasion. If the rate is below that point, a cut reduces revenue. It is hard to know where an economy is on the Laffer curve, so the claim is true only in some circumstances.",
    explanation: "Condition, mechanism, opposite case, uncertainty and judgement." });

  {
    const rates = [15, 35, 45, 50, 55, 65, 85];
    const L = (t) => laffer(3600, 36, t);
    const rows = rates.map((t) => [t, L(t).base, L(t).revenue]);
    const t1 = table(["Tax rate (%)", "Tax base (US\\$ million)", "Tax revenue (US\\$ million)"], rows);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Revenue = rate × base.", "The peak of the curve is the revenue-maximising rate."],
      stem: `**Tax rates and revenue in Zandia (fictional, illustrative data)**\n\n${t1}\n\nThe government is considering a change in the rate of the income tax, now 65%.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: L(35).revenue, unit: "US$ million", dp: 0, tol: 0.5, stem: "State the tax revenue at a rate of 35%, in US\\$ million.", wrong: [2340, 450, 810], explanation: "From the table: 819." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: 50, dp: 0, unit: "%", stem: "State the tax rate that maximises revenue.", wrong: [40, 60, 70], explanation: "Revenue is highest (900) at 50%." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: L(55).revenue - L(65).revenue, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the change in revenue if the rate is cut from 65% to 55%, in US\\$ million (a fall is negative).", wrong: [-72, 891, 144], explanation: "Revenue rises from 819 to 891: a change of +US\\$72 million." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why tax revenue falls when the rate rises above 50%.",
          points: ["Higher rates reduce the incentive to work, invest and declare income (more avoidance and evasion).", "So the tax base shrinks.", "Above 50%, the base falls by more than the rate rises, so revenue falls."],
          modelAnswer: "At very high rates people have less incentive to work, invest or declare their income, and avoidance and evasion increase, so the tax base shrinks. Above 50% the fall in the base outweighs the higher rate, so total revenue falls." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain two reasons why the government should be cautious about using this analysis to set the tax rate.",
          points: ["The Laffer relationship is a model; the real curve and its peak are not known.", "Revenue is not the only objective: fairness, efficiency and incentives matter.", "The response of the base may take time or differ between groups."],
          modelAnswer: "The Laffer curve is a model, and the true position of the peak is uncertain, so the government cannot be sure what rate would maximise revenue. Revenue is also not the only objective, since fairness and incentives matter, and the response of the tax base may take time and differ between groups." }),
      ],
      explanation: "Revenue 819 at 35%; peak at 50% (900); cut from 65% to 55% raises revenue by 72; high rates shrink the base." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) weigh the options against the three problems."],
    stem: "**Policy choices in Dambo (fictional)**\n\nDambo has inflation of 18%, unemployment of 20% and a current account deficit equal to 8% of GDP. The finance ministry wants to cut the budget deficit by raising taxes. The central bank wants to raise interest rates to reduce inflation. The trade minister proposes higher tariffs to improve the current account, and the education minister wants more spending on technical schools and roads. Economists warn that every option has costs and that the government's forecasts have often been wrong.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify and explain one conflict between the objectives in Dambo.",
        points: ["Identify a conflict such as price stability against unemployment.", "Raising interest rates or taxes to cut inflation reduces demand and output.", "So unemployment, already high, would rise."],
        modelAnswer: "There is a conflict between reducing inflation and reducing unemployment. Raising interest rates or taxes lowers aggregate demand and so inflation, but it also reduces output and employment, so unemployment which is already 20% would rise." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain one way in which the government's forecasts being wrong could lead to government failure.",
        points: ["Wrong forecasts of the output gap or the multiplier lead to policy that is too strong or too weak.", "For example, the tax rise might reduce demand more than planned.", "The result is a deeper recession or inflation not reduced."],
        modelAnswer: "If the government's forecasts of the output gap or the multiplier are wrong, a policy such as a tax rise may be too strong or too weak. For example, it might reduce demand by more than planned and deepen the recession, which is government failure." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess which one of the four proposals is likely to be the most effective for Dambo.",
        points: ["Higher taxes and interest rates reduce inflation and imports but worsen unemployment.", "Tariffs improve the current account in the short run but raise prices, invite retaliation and protect inefficiency.", "Spending on technical schools and roads is supply-side: raises capacity, reduces structural unemployment and costs and imports in the long run.", "It is slow and costs money (deficit), so does not help inflation quickly.", "With unemployment at 20% a contraction is risky.", "Judgement: the supply-side proposal is best for the long term, supported by a careful short-run policy."],
        modelAnswer: "Higher taxes and interest rates would reduce inflation and imports but would worsen unemployment, which is already 20%. Tariffs might improve the current account in the short run but raise prices, which is bad for inflation, and could provoke retaliation. Spending on technical schools and roads is a supply-side measure that raises productive capacity and reduces structural unemployment, and it can lower costs and import dependence in the long run, although it is slow and expensive and does not help inflation quickly. On balance the investment proposal is likely to be the most effective in the long term, with careful short-run measures to control inflation." }),
    ],
    explanation: "Conflicts between inflation and unemployment; forecast errors cause government failure; supply-side spending best in the long run." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Both policies, then the conditions that decide which works better."],
    stem: "Assess whether monetary policy is more effective than fiscal policy in controlling inflation.",
    points: ["Monetary policy: interest rates can be changed quickly by the central bank, independent of politics.", "Higher interest rates reduce borrowing, consumption and investment.", "But lags, uncertain effects and effects on the exchange rate and investment.", "Fiscal policy: cuts in spending or tax rises directly reduce AD and are certain in size.", "But slow to decide, politically difficult and affects services and growth.", "If inflation is cost-push neither is effective.", "Effects depend on the openness of the economy and credibility.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Monetary policy has the advantage that interest rates can be changed quickly by a central bank that is independent of politics, and higher rates reduce borrowing, consumption and investment, lowering demand-pull inflation. But its effects come with a lag, are uncertain, and may be weak if households and firms do not borrow much or if the exchange rate rises and hurts exporters. Fiscal policy acts directly on demand through spending cuts or tax rises, but it takes time to decide and is politically difficult, and it affects public services and growth. If inflation is cost-push, neither policy removes its cause. Overall monetary policy is usually more flexible and quicker, but fiscal policy can be a useful support, and the better choice depends on the cause of inflation, the state of the economy and the credibility of the authorities.",
    explanation: "Compare speed, certainty and side effects of monetary and fiscal policy; the cause of inflation matters." });

  b.card("DEFINITION", "What is a **policy conflict**?", "A situation where a policy that improves one objective worsens another, for example growth against the balance of payments.");
  b.card("DEFINITION", "Define **government failure** in macroeconomic policy.", "Intervention that fails to improve outcomes or makes them worse, because of time lags, poor information, crowding out, political motives or unintended effects.");
  b.card("DEFINITION", "What is the **Laffer curve**?", "A curve showing tax revenue against the tax rate: zero at 0% and 100%, rising to a maximum and then falling because high rates shrink the tax base.");
  b.card("CONCEPT", "When does a tax cut raise revenue?", "When the rate is above the revenue-maximising rate (the downward-sloping part of the Laffer curve).");
  b.card("CONCEPT", "Name three types of time lag.", "Recognition lag, decision lag and impact lag.");
  b.card("CONCEPT", "What is crowding out?", "Government borrowing raises interest rates and reduces private investment.");
  b.card("CONCEPT", "Market-based and interventionist supply-side policies?", "Market-based: deregulation, lower taxes, flexible labour markets. Interventionist: spending on education, infrastructure and R&D.");
  b.card("CONCEPT", "Why is expansionary fiscal policy likely to worsen the current account?", "Higher incomes raise spending on imports.");
  b.card("CONCEPT", "What determines policy effectiveness?", "The cause of the problem, the state of the economy, the speed and strength of the response, openness, credibility and side effects.");
});
