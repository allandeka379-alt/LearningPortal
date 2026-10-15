// W4a: the quantity theory of money (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, chk, table, fmt, roundTo, pctChange, quantityTheory } from "../lib.mjs";
import { mc, LV8 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.money.quantity-theory", { file: "money/quantity-theory", keyPrefix: "money.quantity-theory" }, (b) => {
  mc(b, [2, "RECALL"], "In the equation of exchange MV = PT, the letter V stands for",
    ["the velocity of circulation of money", "Correct: the average number of times a unit of money is spent in a period."],
    [["the volume of goods in the economy", "The volume of transactions is T."],
     ["the value of the national debt in the economy", "This is not part of the equation."],
     ["the variable cost of producing goods in the economy", "Costs do not appear in the equation."]],
    "V is the velocity of circulation: V = PT ÷ M.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "According to the quantity theory, if the money supply doubles while V and T stay constant, the price level will",
    ["double", "Correct: P changes in proportion to M."],
    [["halve", "The price level moves with M, not against it."],
     ["stay the same", "Prices change in proportion to the money supply."],
     ["rise by half", "The change is proportional, not half."]],
    "With V and T constant, P = MV ÷ T rises in the same proportion as M.", { daily: true });

  {
    const p = quantityTheory({ M: 100, V: 5, T: 250 }); chk(p, 2);
    mc(b, [3, "APPLICATION"], "In an economy M = US\\$100 million, V = 5 and T = 250 million. The average price level P is",
      ["US\\$2.00", "Correct: P = MV ÷ T = 500 ÷ 250."],
      [["US\\$0.50", "This divides T by MV instead of MV by T."],
       ["US\\$355", "This adds M, V and T instead of using MV ÷ T."],
       ["US\\$1,250", "This multiplies M, V and T together."]],
      "P = MV ÷ T = 100 × 5 ÷ 250 = US\\$2.00.", { hints: ["Rearrange MV = PT to find P."], calculator: true });
  }

  mc(b, [2, "UNDERSTANDING"], "The quantity theory of money assumes that, in the short run,",
    ["V and T are constant", "Correct: this lets M determine P."],
    [["M and P are constant", "M is what is assumed to change."],
     ["M and V always fall together", "No such assumption is made."],
     ["P and T move in opposite directions", "This is not an assumption of the theory."]],
    "The theory treats velocity and transactions as constant, so changes in M cause changes in P.");

  mc(b, [3, "UNDERSTANDING"], "A monetarist would recommend which policy to reduce inflation?",
    ["Limiting the growth rate of the money supply", "Correct: inflation is caused by excess money growth."],
    [["Raising government spending to increase aggregate demand", "This would raise demand and prices."],
     ["Increasing the money supply to match rising prices", "This would accommodate inflation."],
     ["Raising the velocity of circulation of money", "This would raise spending, not reduce it."]],
    "Monetarists see inflation as a monetary phenomenon, to be cured by restraining money supply growth.", { hints: ["Which variable do monetarists say causes inflation?"] });

  mc(b, [3, "ANALYSIS"], "In hyperinflation, people spend money as soon as they receive it. This is a criticism of the quantity theory because it shows that",
    ["velocity of circulation can change sharply", "Correct: V is not constant."],
    [["the volume of transactions must be falling to zero", "Hyperinflation need not mean T falls to zero."],
     ["the money supply has no effect on the price level", "Money growth is often the cause."],
     ["the equation of exchange is no longer an identity", "MV = PT is always true as an identity."]],
    "If V rises as people try to get rid of money quickly, prices rise faster than M, so V is not constant.", { hints: ["Which variable in the equation changes when people spend faster?"] });

  mc(b, [4, "EVALUATION"], "Prices in an economy rise sharply after a rise in world oil prices, while the money supply is unchanged. This suggests that",
    ["the quantity theory does not explain cost-push inflation", "Correct: costs rose without more money."],
    [["the money supply must have been rising secretly", "Cost-push inflation can occur without money growth."],
     ["velocity must have fallen to zero in the economy", "A fall in velocity would reduce prices."],
     ["the price level cannot change unless M changes", "The theory says this only under its assumptions."]],
    "Inflation can come from rising costs; the theory attributes inflation only to money growth.", { hints: ["Is there any link in the equation between oil costs and M?"] });

  {
    const p = quantityTheory({ M: 150, V: 6, T: 300 }); chk(p, 3);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: p, dp: 0, tol: 0.001, hints: ["P = MV ÷ T."],
      stem: "In an economy the money supply (M) is US\\$150 million, velocity (V) is 6 and the volume of transactions (T) is 300 million. Calculate the average price level (P), in US\\$.",
      wrong: [0.33, 1350, 12], explanation: "P = MV ÷ T = 150 × 6 ÷ 300 = US\\$3." });
    const v = quantityTheory({ M: 250, P: 2, T: 1000 }); chk(v, 8);
    b.num({ d: 3, skill: "APPLICATION", kind: "times", value: v, dp: 0, tol: 0.001, hints: ["V = PT ÷ M."],
      stem: "The money supply is US\\$250 million, the average price level is US\\$2 and the volume of transactions is 1,000 million. Calculate the velocity of circulation, in times a year.",
      wrong: [0.125, 500, 2], explanation: "V = PT ÷ M = 2 × 1,000 ÷ 250 = 8 times." });
    const m = quantityTheory({ V: 4, P: 2.5, T: 1200 }); chk(m, 750);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: m, unit: "US$ million", dp: 0, tol: 0.5, hints: ["M = PT ÷ V."],
      stem: "The velocity of circulation is 4, the average price level is US\\$2.50 and the volume of transactions is 1,200 million. Calculate the money supply, in US\\$ million.",
      wrong: [12000, 4800, 480], explanation: "M = PT ÷ V = 2.5 × 1,200 ÷ 4 = US\\$750 million." });
    const pc = pctChange(1, (1.12 / 1.05)); chk(roundTo(pc, 1), 6.7);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "pct", value: pc, dp: 1, unit: "%", calculator: true, hints: ["P = MV ÷ T; the price index changes by (1 + %ΔM) ÷ (1 + %ΔT) when V is constant."],
      stem: "The money supply rises by 12%, velocity is constant and the volume of transactions rises by 5%. Calculate the percentage change in the price level, to one decimal place.",
      wrong: [7, 17, 12], explanation: "1. With V constant, P changes by (1.12 ÷ 1.05) − 1.\n2. 1.12 ÷ 1.05 = 1.0667, so P rises by 6.7%. The approximation 12 − 5 = 7% is close but not exact." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true,
    stem: "True or false: the equation of exchange MV = PT is always true, because total spending equals the total value of transactions.",
    feedbackTrue: "It is an identity. The quantity theory adds the assumptions that V and T are constant.",
    explanation: "MV = PT is an identity; the theory of inflation comes from the assumptions about V and T." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each symbol in the equation of exchange with its meaning.",
    pairs: [["M", "The money supply"], ["V", "The velocity of circulation"], ["P", "The average price level"], ["T", "The volume of transactions"]],
    explanation: "M is money, V is velocity, P is price and T is transactions." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The quantity theory assumes that velocity and the volume of transactions are {{blank:a}}. It concludes that a rise in the money supply causes a {{blank:b}} rise in the price level.",
    blanks: [{ id: "a", accepted: ["constant"], choices: ["constant", "falling", "rising"] }, { id: "b", accepted: ["proportional"], choices: ["proportional", "smaller", "temporary"] }],
    explanation: "With V and T constant, P rises in proportion to M." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the average number of times a unit of money is spent in a period?",
    accepted: ["velocity of circulation", "velocity", "the velocity of circulation", "income velocity"], wrong: ["money supply"],
    explanation: "Velocity of circulation is V in MV = PT." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Name the four terms."],
    stem: "State the equation of exchange and say what each term means.",
    points: ["MV = PT.", "M is the money supply, V velocity of circulation, P the price level and T the volume of transactions."],
    modelAnswer: "The equation of exchange is MV = PT, where M is the money supply, V is the velocity of circulation, P is the average price level and T is the volume of transactions.",
    explanation: "Equation and terms." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use the equation and state the assumptions."],
    stem: "Explain, using the quantity theory, how a faster growth of the money supply than of output causes inflation.",
    points: ["The theory assumes V is constant and T is fixed by real output.", "If M rises faster than T, then MV rises faster than T.", "Since MV = PT, the price level P must rise.", "Too much money chasing too few goods causes prices to rise."],
    modelAnswer: "The theory assumes that velocity is constant and that the volume of transactions is determined by real output. If the money supply rises faster than output, then MV rises faster than T. Since MV = PT, the price level must rise. In other words, too much money is chasing too few goods.",
    explanation: "Assumptions; MV rises faster than T; P rises." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Name two criticisms and develop each."],
    stem: "Analyse two criticisms of the quantity theory of money.",
    points: ["Velocity is not constant: it changes with interest rates, expectations and payment technology.", "So prices may change by more or less than the money supply.", "Spare capacity means T can rise when M rises, so output (not prices) increases.", "Inflation may be caused by costs, such as oil prices or wages, with no rise in M.", "Causation may run from prices to money, as the central bank accommodates higher prices."],
    modelAnswer: "Velocity is not constant: it changes with interest rates, expectations and payment technology, so prices may change by more or less than the money supply. Also, when there is spare capacity the volume of transactions can rise when the money supply rises, so output rather than prices increases. In addition, inflation may be caused by higher costs such as oil prices, with no rise in the money supply.",
    explanation: "Two developed criticisms from V, T, cost-push and causation." });

  {
    const M = [120, 144], V = [5, 5], T = [300, 312];
    const p1 = (M[0] * V[0]) / T[0], p2 = (M[1] * V[1]) / T[1]; chk(p1, 2); chk(roundTo(p2, 4), 2.3077);
    const pc = pctChange(p1, p2); chk(roundTo(pc, 1), 15.4);
    const t1 = table(["", "Year 1", "Year 2"], [["Money supply, M (US\\$ million)", M[0], M[1]], ["Velocity of circulation, V", V[0], V[1]], ["Volume of transactions, T (million)", T[0], T[1]]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["P = MV ÷ T.", "Percentage change = change ÷ original × 100."],
      stem: `**Money and prices in Zandia (fictional, illustrative)**\n\nThe table shows the money supply, the velocity of circulation and the volume of transactions in Zandia in two years.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: p1, dp: 2, stem: "Calculate the price level (P) in year 1, in US\\$.", wrong: [0.5, 1800, 20], explanation: "P = MV ÷ T = 120 × 5 ÷ 300 = US\\$2.00." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: p2, dp: 2, stem: "Calculate the price level (P) in year 2, in US\\$ to two decimal places.", wrong: [2.4, 1.73, 2.5], explanation: "P = 144 × 5 ÷ 312 = US\\$2.31." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: pc, dp: 1, unit: "%", stem: "Calculate the percentage rise in the price level between year 1 and year 2, to one decimal place.", wrong: [20, 16, 4], explanation: "(2.3077 − 2.00) ÷ 2.00 × 100 = 15.4%." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why prices rose between the two years.",
          points: ["The money supply rose by 20%, while the volume of transactions rose by only 4%.", "Velocity was constant, so total spending (MV) rose faster than the quantity of goods traded (T).", "Since MV = PT, the price level had to rise."],
          modelAnswer: "The money supply rose by 20% while the volume of transactions rose by only 4%. With velocity constant, total spending (MV) rose faster than the quantity of goods traded, and since MV = PT the price level had to rise." }),
      ],
      explanation: "P rises from 2.00 to 2.31 (15.4%) because M grew faster than T." });
  }
  {
    const Ms = [100, 160, 275, 520], Ps = [100, 150, 270, 480];
    const gM = pctChange(Ms[2], Ms[3]), inf = pctChange(Ps[2], Ps[3]); chk(roundTo(gM, 1), 89.1); chk(roundTo(inf, 1), 77.8);
    const t1 = table(["Year", "Money supply index (year 1 = 100)", "Price index (year 1 = 100)"], Ms.map((m, i) => [String(i + 1), m, Ps[i]]));
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Growth = (new − old) ÷ old × 100.", "In (d) consider what the theory assumes about velocity and the possible role of costs."],
      stem: `**Rapid inflation in Mbira (a fictional economy, illustrative)**\n\nThe government of Mbira paid its bills by asking the central bank to create money. At the same time, a drought cut the output of food and the currency lost value, which raised the price of imported fuel. The table shows indices for four years. Some economists say that the rise in the money supply explains the inflation completely. Others say that the drought and the fall in the currency were also important.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: gM, dp: 1, unit: "%", stem: "Calculate the percentage growth of the money supply in year 4, to one decimal place.", wrong: [89, 4.2, 520], explanation: "(520 − 275) ÷ 275 × 100 = 89.1%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: inf, dp: 1, unit: "%", stem: "Calculate the rate of inflation in year 4, to one decimal place.", wrong: [480, 43.8, 78], explanation: "(480 − 270) ÷ 270 × 100 = 77.8%." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain the monetarist view that the inflation in Mbira was caused by the growth of the money supply.",
          points: ["The money supply grew faster than the economy's output, which was reduced by the drought.", "With constant velocity and falling output, MV rises faster than T.", "So prices rise in the same proportion as the money supply (MV = PT).", "Printing money to pay bills was the cause, so controlling money growth is the cure."],
          modelAnswer: "The money supply grew far faster than the output of the economy, which was reduced by the drought. If velocity is constant, MV rose faster than T, so by the equation MV = PT the price level had to rise in line with the money supply. The monetarist view is therefore that creating money to pay the government's bills was the cause of the inflation, and that controlling the growth of the money supply is the cure." }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether the quantity theory fully explains the inflation in Mbira.",
          points: ["Prices and the money supply both rose sharply, consistent with the theory.", "Prices rose by less than money in year 4 (77.8% against 89.1%), so the relationship is not exact; velocity and output changed.", "The drought and the fall in the currency raised costs (cost-push), which the theory does not explain.", "Judgement: money growth was probably the main cause, but it is not the full explanation."],
          modelAnswer: "Prices and the money supply both rose sharply, which is consistent with the quantity theory, and the rise in the money supply was so large that it is hard to see how prices could have stayed stable. However, the relationship is not exact, because velocity and output changed. The drought and the fall in the currency raised costs, which is cost-push inflation that the theory does not explain. Money growth was probably the main cause, but the theory is not the full explanation." }),
      ],
      explanation: "Money grew 89.1% and prices 77.8% in year 4; the monetarist view explains most of it, but cost-push factors also matter." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider velocity, output, cost-push and the evidence from high inflation."],
    stem: "Assess the usefulness of the quantity theory of money in explaining inflation.",
    points: ["MV = PT shows a clear link between spending, money and prices.", "In the long run, and in hyperinflation, rapid money growth is closely linked with inflation.", "It explains why financing deficits by printing money is inflationary.", "Velocity is not constant: it varies with interest rates and expectations.", "T is not fixed when there is spare capacity.", "It cannot explain cost-push inflation.", "Causation may run from prices to money.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "The quantity theory shows a clear link between money, spending and prices, and it is most convincing in the long run and in hyperinflation, when very rapid money growth is closely linked with inflation. It also explains why financing government deficits by printing money is inflationary. However, its assumptions are weak in the short run: velocity varies with interest rates and expectations, and when there is spare capacity a rise in the money supply raises output as well as prices. It cannot explain cost-push inflation caused by rising oil prices or wages, and causation may run from prices to money if the central bank increases the money supply to accommodate higher prices. The theory is therefore a useful guide to the long-run and extreme cases but not a complete explanation of short-run inflation.",
    explanation: "Long-run strength against short-run assumptions, cost-push and reverse causation." });

  b.card("FORMULA", "The equation of exchange?", "MV = PT.", "M money supply, V velocity, P price level, T volume of transactions.");
  b.card("FORMULA", "Find P from the equation of exchange?", "P = MV ÷ T.");
  b.card("FORMULA", "Find velocity of circulation?", "V = PT ÷ M.");
  b.card("DEFINITION", "Define **velocity of circulation**.", "The average number of times a unit of money is spent in a period.");
  b.card("CONCEPT", "What does the quantity theory assume?", "V and T are constant (T at full employment), so P changes in proportion to M.");
  b.card("CONCEPT", "Monetarist conclusion on inflation?", "Inflation is caused by excess growth of the money supply; control money growth to control inflation.");
  b.card("CONCEPT", "Name three criticisms of the quantity theory.", "Velocity is not constant, T can change when there is spare capacity, and cost-push inflation or reverse causation.");
  b.card("FORMULA", "Percentage version of the equation?", "%ΔM + %ΔV ≈ %ΔP + %ΔT.");
  b.card("CONCEPT", "Is MV = PT a theory or an identity?", "An identity: total spending equals the value of transactions. The theory adds that V and T are constant.");
});
