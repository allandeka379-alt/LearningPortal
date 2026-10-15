// W3b: actual and potential growth, output gaps and the trade cycle (Cambridge A Level only).
import { concept, P, chk, table, fmt, growthRate, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.growth-cycles-gaps", { file: "macro/growth-cycles-gaps", keyPrefix: "macro.growth-cycles-gaps" }, (b) => {
  const gap = (a, p) => ((a - p) / p) * 100;

  mc(b, [1, "RECALL"], "A negative output gap means that",
    ["actual output is below potential output", "Correct: there is spare capacity."],
    [["actual output has fallen since the previous year", "A gap compares the level of output with potential, not its direction."],
     ["potential output is lower than last year", "The gap does not show a fall in potential."],
     ["the economy is in a boom with scarce labour", "A boom goes with a positive gap."]],
    "A negative output gap is actual output below potential output.");

  mc(b, [2, "UNDERSTANDING"], "Which is most likely when there is a large positive output gap?",
    ["Rising inflationary pressure", "Correct: resources are scarce, so wages and prices tend to rise."],
    [["Rising cyclical unemployment", "Cyclical unemployment goes with a negative gap."],
     ["Large amounts of spare capacity in firms", "A positive gap means capacity is stretched."],
     ["Falling wages in most industries", "Tight labour markets tend to raise wages."]],
    "A positive gap means demand exceeds sustainable supply, so prices tend to rise.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which change would increase an economy's potential growth rate?",
    ["Better education and skills for the labour force", "Correct: it raises the quality of labour and productive capacity."],
    [["A cut in interest rates that raises consumer spending", "That raises demand, not capacity."],
     ["A rise in government transfer payments to households", "Transfers raise demand rather than capacity."],
     ["A temporary rise in the price of exports", "That affects incomes but not capacity."]],
    "Potential growth depends on the quantity and quality of resources and on technology.");

  mc(b, [2, "UNDERSTANDING"], "At the trough of a trade cycle",
    ["real GDP is at its lowest point and the output gap is likely to be negative", "Correct: the slump has reached its bottom."],
    [["real GDP is at its highest point and unemployment is lowest", "That describes the peak."],
     ["real GDP is growing fastest and inflation is rising", "That describes a boom."],
     ["potential output is at its lowest and capacity is full", "Potential does not follow the cycle in this way."]],
    "The trough is the lowest point of output before recovery.", { daily: true });

  mc(b, [3, "ANALYSIS"], "An economy starts with a negative output gap. Actual growth is 4% a year and potential growth is 2.5% a year. What happens to the gap?",
    ["It narrows, because actual growth exceeds potential growth", "Correct: actual output catches up with potential."],
    [["It widens, because actual growth is higher than zero", "Actual growth above potential closes a negative gap."],
     ["It stays the same, because both rates are positive", "The gap changes when the growth rates differ."],
     ["It becomes positive immediately, because growth is above 2%", "It takes time to close; it does not switch at once."]],
    "If actual growth exceeds potential growth, the output gap rises.", { hints: ["Which rate is the faster, and what does the gap compare?"] });

  mc(b, [3, "UNDERSTANDING"], "Which is an automatic stabiliser?",
    ["Unemployment benefits that rise when more people lose their jobs", "Correct: it supports demand in a downturn without a new decision."],
    [["A cut in the central bank's interest rate decided at a regular meeting", "That is a discretionary policy decision."],
     ["A new road-building programme announced in a budget", "A discretionary spending decision."],
     ["A rise in the exchange rate caused by capital inflows", "That is not part of the budget."]],
    "Automatic stabilisers change tax and benefit flows without a new decision.", { hints: ["Does it need a new decision by a government?"] });

  mc(b, [3, "ANALYSIS"], "According to the accelerator, when the growth of output slows, investment in capital goods is likely to",
    ["fall by a larger percentage, which makes the downturn worse", "Correct: investment depends on the change in output."],
    [["rise, because firms have more spare capacity", "Spare capacity discourages investment."],
     ["stay the same, because it depends only on the interest rate", "The accelerator links investment to the change in output."],
     ["fall by a smaller percentage than output", "The accelerator magnifies changes."]],
    "Induced investment depends on the rate of change of output, so it swings more than output.", { hints: ["Does investment respond to the level of output or to its change?"] });

  mc(b, [4, "EVALUATION"], "Why might a government find it difficult to use policy to close an output gap?",
    ["Potential output has to be estimated, so the size of the gap is uncertain", "Correct: policy may be too strong or too weak."],
    [["Governments are not able to change taxes or public spending at all", "They can, but with lags."],
     ["Changes in aggregate demand never affect actual output", "Demand affects actual output in the short run."],
     ["Output gaps never occur in any market economy", "They do occur."]],
    "Potential output is an estimate, so the output gap is uncertain.", { hints: ["Can potential output be measured directly?"] });

  {
    const g4 = gap(612, 640); chk(roundTo(g4, 1), -4.4, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: g4, dp: 1, unit: "%",
      stem: "Actual real GDP in a fictional economy is US\\$612 billion and potential real GDP is US\\$640 billion. Calculate the output gap as a percentage of potential GDP, to one decimal place (a negative gap is a negative number).",
      wrong: [4.4, -4.6, -28], explanation: "Output gap = (612 − 640) ÷ 640 × 100 = −4.4%. Dividing by actual GDP (−4.6) uses the wrong base; the sign is negative because actual is below potential." });
    const gr = growthRate(640, 618); chk(roundTo(gr, 1), -3.4, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: gr, dp: 1, unit: "%", hints: ["Percentage change = change ÷ original × 100."],
      stem: "Actual real GDP falls from US\\$640 billion in year 3 to US\\$618 billion in year 4. Calculate the rate of actual growth in year 4, to one decimal place (a fall is a negative number).",
      wrong: [3.4, -3.6, -22], explanation: "Growth = (618 − 640) ÷ 640 × 100 = −3.4%." });
    const pg = growthRate(700, 721); chk(roundTo(pg, 1), 3.0, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: pg, dp: 1, unit: "%", hints: ["Use potential GDP, not actual GDP."],
      stem: "Potential real GDP is US\\$700 billion in year 5 and US\\$721 billion in year 6. Calculate the rate of potential growth in year 6, to one decimal place.",
      wrong: [2.9, 5.4, 21], explanation: "Potential growth = (721 − 700) ÷ 700 × 100 = 3.0%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Actual growth can be higher than potential growth for a period when an economy is recovering from a recession.", answer: true,
    explanation: "True. Unused resources are brought back into use, so output can grow faster than capacity until the gap is closed." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Potential growth", "The rate at which productive capacity grows"], ["Positive output gap", "Actual output above potential output"], ["Recession", "A period of falling real GDP, commonly two quarters in a row"], ["Automatic stabiliser", "A budget feature that offsets swings in demand without a new decision"]],
    explanation: "Match each term with its meaning." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A progressive income tax is an {{blank:a}} stabiliser because tax revenue {{blank:b}} when incomes rise in a boom.",
    blanks: [{ id: "a", accepted: ["automatic"], choices: ["automatic", "discretionary"] }, { id: "b", accepted: ["rises"], choices: ["rises", "falls"] }],
    explanation: "Revenue rises with incomes without any new decision, restraining demand." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the phase of the trade cycle in which real GDP starts to rise after the lowest point.",
    accepted: ["recovery", "the recovery", "upturn", "expansion"], wrong: ["boom"],
    explanation: "After the trough comes the recovery." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between actual growth and potential growth.",
    points: ["Actual growth is the rise in real GDP (the actual level of output).", "Potential growth is the rise in productive capacity (the output the economy could produce at normal use of resources)."],
    modelAnswer: "Actual growth is the percentage rise in real GDP from one period to the next, while potential growth is the rate at which the economy's productive capacity increases.",
    explanation: "One mark for each term." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Trace the chain from a rise in income to the budget and back to demand."],
    stem: "Explain how automatic stabilisers reduce fluctuations in demand.",
    points: ["In a boom incomes rise and tax receipts rise (particularly with progressive taxes).", "Fewer people claim unemployment benefits, so government spending falls.", "These changes reduce households' spending power and so restrain demand.", "In a slump the reverse happens: lower taxes and higher benefits support demand."],
    modelAnswer: "In a boom incomes rise, so households pay more tax and fewer people claim unemployment benefits. This reduces spending power and restrains demand. In a slump, tax receipts fall and benefit payments rise, which supports spending, so fluctuations are reduced without any new decisions.",
    explanation: "Boom effects, the link to demand, and the reverse in a slump." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use multiplier and accelerator language."],
    stem: "Explain two causes of the trade cycle.",
    points: ["Changes in confidence and expectations alter consumption and investment.", "A fall in confidence reduces aggregate demand and output.", "The accelerator: a change in output causes a larger change in investment.", "The multiplier: a change in investment causes a larger change in national income.", "A cause is linked to a swing in output, for example falling output reduces investment and deepens the downturn."],
    modelAnswer: "Changes in confidence alter spending: if firms and households become pessimistic, consumption and investment fall, aggregate demand falls and output falls. The accelerator makes the swing larger, because a small fall in output causes a larger fall in investment, and the multiplier then means that the fall in investment reduces income by a larger amount, deepening the downturn.",
    explanation: "Two causes with links to output; the accelerator and multiplier magnify swings." });

  {
    const act = [520, 531, 507, 510, 530], pot = [500, 515, 530, 546, 562];
    const gaps = act.map((a, i) => gap(a, pot[i]));
    chk(roundTo(gaps[2], 1), -4.3, 1e-9); chk(roundTo(gaps[1], 1), 3.1, 1e-9);
    const gr3 = growthRate(act[1], act[2]); chk(roundTo(gr3, 1), -4.5, 1e-9);
    const t1 = table(["Year", "Actual real GDP (US\\$ billion)", "Potential real GDP (US\\$ billion)"], act.map((a, i) => [String(i + 1), a, pot[i]]), { align: ["l", "r", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Output gap = (actual − potential) ÷ potential × 100.", "Think of what the gap implies about inflation and unemployment."],
      stem: `**Output in Mbira (fictional, illustrative data)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: gaps[1], dp: 1, unit: "%", stem: "Calculate the output gap in year 2, to one decimal place.", wrong: [-3.1, 3.0, 16], explanation: "Output gap = (531 − 515) ÷ 515 × 100 = +3.1%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: gr3, dp: 1, unit: "%", stem: "Calculate the rate of actual growth in year 3, to one decimal place (a fall is a negative number).", wrong: [4.5, -4.3, -24], explanation: "Growth = (507 − 531) ÷ 531 × 100 = −4.5%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain what the output gap in year 3 suggests about unemployment and inflationary pressure.",
          points: ["The gap is negative (−4.3%): actual output is below potential.", "Firms have spare capacity and workers are unemployed (cyclical unemployment).", "Weak demand and slack labour markets keep inflationary pressure low."],
          modelAnswer: "The output gap in year 3 is −4.3%, so actual output is below potential. Firms have spare capacity and are likely to employ fewer workers, so unemployment is high, and weak demand with a slack labour market keeps inflationary pressure low." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why automatic stabilisers would have lessened the fall in output in year 3.",
          points: ["Falling incomes reduce tax revenue automatically.", "More people claim unemployment benefits, so government spending rises.", "These support households' spending power and so aggregate demand."],
          modelAnswer: "When output and incomes fell, tax revenue fell automatically and more people claimed unemployment benefits. Households therefore had more spending power than they otherwise would, which supported aggregate demand and reduced the fall in output." }),
      ],
      explanation: "Year 2 gap +3.1%; year 3 growth −4.5%, gap −4.3% (spare capacity, low inflation pressure); stabilisers support demand." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) compare speed, cost and lasting effect of the two types of policy."],
    stem: "**A slump in Dambo (fictional)**\n\nDambo's output fell sharply after a drop in the world price of its main export, and unemployment is high. Firms say they are using only 70% of their capacity. The government is considering two policies: cutting the interest rate and increasing public spending on repairing roads, or a ten-year programme of investment in technical colleges and power supply. Economists disagree about how much of the fall in output is temporary and how much is permanent, because it is hard to know how much the potential output of Dambo has changed.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why a large negative output gap is likely in Dambo.",
        points: ["Output fell while potential output did not fall as quickly.", "Firms are using only 70% of capacity: spare capacity.", "Actual output is therefore below potential output."],
        modelAnswer: "Output fell after the export price fell, but the country's capacity did not fall at the same rate. Firms are using only 70% of their capacity, so actual output is well below potential output, which is a negative output gap." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how cutting the interest rate and repairing roads might help the economy to recover.",
        points: ["A lower interest rate reduces the cost of borrowing and encourages consumption and investment.", "Road repair spending is government spending, a direct injection into the circular flow.", "Higher aggregate demand raises actual output and reduces unemployment."],
        modelAnswer: "A lower interest rate makes borrowing cheaper, which encourages households and firms to spend and invest. Spending on road repairs is a direct addition to aggregate demand and creates jobs. Higher aggregate demand raises actual output and reduces unemployment." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess which of the two policies is more suitable for Dambo.",
        points: ["Demand-side policy works quickly and suits a negative gap with 30% spare capacity.", "It may be ineffective if firms are pessimistic or if the interest rate is already low, and it may increase the budget deficit.", "The ten-year programme raises potential output permanently (skills, power).", "It works slowly and does little to cure the current slump; costs now.", "Uncertainty about the size of the gap and whether the fall is permanent.", "Judgement: combine them, or favour demand-side policy first if the slump is temporary and the supply-side programme if potential output has fallen."],
        modelAnswer: "The first policy raises demand quickly, which suits an economy where firms use only 70% of their capacity, but it may not work if firms are pessimistic and it increases the budget deficit. The ten-year programme raises potential output for the long run through skills and power supply, but it does not cure the present slump and costs money now. Since economists disagree about how much of the fall is permanent, the best course is probably to use demand-side policy to restore output in the short run if the slump is temporary, while continuing with the supply-side programme if potential output has been lowered." }),
    ],
    explanation: "Negative gap from spare capacity; demand-side policy raises AD quickly; supply-side policy raises capacity slowly; the right mix depends on whether the fall is temporary." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Define the gap, then policy options, then limitations."],
    stem: "Assess the view that governments can remove the fluctuations of the trade cycle.",
    points: ["Governments can use fiscal and monetary policy to raise or reduce demand.", "Automatic stabilisers reduce swings without any decision.", "Time lags mean that policy may take effect when the cycle has moved on.", "Potential output and the output gap are estimates, so policy may be wrong.", "External shocks (commodity prices, world recession) are outside government control.", "Expectations and confidence may offset policy.", "Supply-side policy raises capacity but only slowly.", "A justified judgement: cycles can be reduced but not removed."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Governments can use fiscal policy and monetary policy to raise demand in a slump and to reduce it in a boom, and automatic stabilisers reduce swings without any decision. But policy takes time to work, so a stimulus decided in a slump may take effect only when the economy is already recovering. Potential output and the output gap have to be estimated, so policy can be too strong or too weak. Many cycles are caused by shocks outside the government's control, such as changes in world commodity prices, and changes in confidence may offset the policy. Supply-side policy can raise capacity but only slowly. Overall, governments can reduce the size of fluctuations, but they cannot remove them.",
    explanation: "Policy tools and stabilisers against lags, uncertainty, external shocks and expectations." });

  b.card("DEFINITION", "Define **potential growth**.", "The rate at which productive capacity grows; shown by an outward shift of LRAS or the PPC.");
  b.card("FORMULA", "How is the **output gap** calculated?", "(Actual GDP − potential GDP) ÷ potential GDP × 100.");
  b.card("CONCEPT", "What does a positive output gap suggest?", "Actual output above potential: scarce resources, rising wages and prices, inflationary pressure.");
  b.card("CONCEPT", "What does a negative output gap suggest?", "Spare capacity and cyclical unemployment, and low inflationary pressure.");
  b.card("CONCEPT", "Name the four phases of the trade cycle.", "Boom (peak), downturn or recession, trough (slump) and recovery.");
  b.card("DEFINITION", "What are **automatic stabilisers**?", "Budget features such as progressive taxes and unemployment benefits that reduce fluctuations in demand without a new decision.");
  b.card("CONCEPT", "What is the accelerator?", "A change in output causes a larger percentage change in investment, which magnifies swings in the cycle.");
  b.card("CONCEPT", "Why can actual growth exceed potential growth for a time?", "In a recovery spare capacity is brought back into use, closing a negative output gap.");
  b.card("CONCEPT", "Why is it hard to close an output gap with policy?", "Potential output cannot be observed, policy has time lags and shocks and confidence also move demand.");
});
