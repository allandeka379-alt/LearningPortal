// W3a: aggregate demand (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, fmt, pctChange, round } from "../lib.mjs";
import { mc, LV5, LV8, LV10 } from "../tables/w3a-kit.mjs";

const ad = (o) => o.c + o.i + o.g + (o.x - o.m);
const y1 = { c: 5600, i: 1350, g: 1900, x: 2100, m: 2450 };
const y2 = { c: 5880, i: 1350, g: 1710, x: 2100, m: 2450 };
chk(ad(y1), 8500); chk(ad(y2), 8590);

concept("aecon.macro.aggregate-demand", { file: "macro/aggregate-demand", keyPrefix: "macro.aggregate-demand" }, (b) => {
  mc(b, [1, "RECALL"], "Aggregate demand is made up of",
    ["C + I + G + (X − M)", "Correct: consumption, investment, government spending and net exports."],
    [["C + S + T + M", "That adds a mixture of spending and leakages."], ["I + G + X", "That is total injections, not AD."], ["Y − T + G + M", "That is not a standard expression for AD."]],
    "AD = C + I + G + (X − M).", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following would cause a movement along the aggregate demand curve?",
    ["A change in the general price level", "Correct: a price level change is a movement along AD."],
    [["A rise in consumer confidence about future incomes", "That shifts AD."], ["A cut in the rate of income tax on households", "That shifts AD."], ["A rise in the incomes of the country's trading partners", "That shifts AD by raising exports."]],
    "Only a change in the price level moves the economy along the AD curve; other determinants shift it.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an explanation for the downward slope of the AD curve?",
    ["A lower price level raises exports by making domestic goods cheaper abroad", "Correct: the international trade effect raises net exports."],
    [["A lower price level means each consumer buys more of one particular good", "That describes substitution within one market, not AD."], ["A lower price level reduces the value of savings held by households", "A lower price level raises the real value of money savings."], ["A lower price level means producers supply more output", "That is about aggregate supply, not the slope of AD."]],
    "Lower domestic prices raise net exports (as well as the wealth and interest rate effects), so AD is higher at lower prices.");

  mc(b, [2, "UNDERSTANDING"], "Which event is most likely to shift the AD curve to the right?",
    ["A fall in interest rates", "Correct: cheaper borrowing raises consumption and investment."],
    [["A rise in income tax rates paid by households", "That reduces disposable income and AD."], ["A cut in government spending on infrastructure", "That reduces G and AD."], ["A recession in the country's main trading partners", "That reduces exports and AD."]],
    "Lower interest rates stimulate consumption and investment at every price level.");

  mc(b, [3, "APPLICATION"], "In a year, C = 4,800, I = 1,100, G = 1,600, X = 1,900 and M = 2,250 (US\\$ million). Aggregate demand is",
    ["US\\$7,150 million", "Correct: 4,800 + 1,100 + 1,600 + (1,900 − 2,250)."],
    [["US\\$7,850 million", "That adds net exports with the wrong sign."], ["US\\$11,650 million", "That adds exports and imports to the total instead of subtracting net exports."], ["US\\$7,500 million", "That leaves out net exports altogether."]],
    "AD = 4,800 + 1,100 + 1,600 + (1,900 − 2,250) = 7,500 − 350 = US\\$7,150 million.", { hints: ["Net exports are exports minus imports."], calculator: true });

  mc(b, [3, "ANALYSIS"], "The government cuts its spending by 10% from US\\$1,900 million, and other components do not change. AD at the current price level will",
    ["fall by US\\$190 million before any multiplier effect", "Correct: 10% of 1,900."],
    [["fall by US\\$1,900 million", "That is the whole of G, not a 10% cut."], ["rise by US\\$190 million", "A cut in G reduces AD."], ["stay the same because G is not part of AD", "G is a component of AD."]],
    "A 10% cut in G of 1,900 is 190, which lowers AD by 190 initially.", { hints: ["10% of 1,900."], calculator: true });

  mc(b, [3, "UNDERSTANDING"], "Why is a government pension payment not counted as government spending (G) in AD?",
    ["It is a transfer payment, not spending on goods and services", "Correct: it only becomes spending when recipients consume."],
    [["Pensions are paid by firms, not by the government", "Pensions may be paid by the government."], ["Pensions are too small to affect the economy", "The size is not the reason."], ["Government spending includes only spending on exports", "G includes purchases of domestic goods and services."]],
    "Transfers move income between people; AD counts spending on output, so pensions affect AD only through consumption.", { hints: ["Does the payment buy goods and services directly?"] });

  mc(b, [4, "EVALUATION"], "A fall in the exchange rate of a country's currency will most likely, other things equal,",
    ["shift AD to the right by raising exports and reducing imports", "Correct: the country's goods become cheaper abroad and imports dearer."],
    [["shift AD to the left because exports become more expensive", "A fall in the exchange rate makes exports cheaper abroad."], ["cause a movement down along the AD curve", "The exchange rate is not the domestic price level."], ["have no effect because only domestic spending matters", "Net exports are part of AD."]],
    "A depreciation raises X and lowers M, so net exports and AD rise (a rightward shift).", { hints: ["How does the price of exports in foreign currency change?"] });

  {
    const share = y1.c / ad(y1) * 100;
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: ad(y1), unit: "US$ million", calculator: true, daily: true,
      stem: "A fictional economy has (US\\$ million) C = 5,600, I = 1,350, G = 1,900, X = 2,100 and M = 2,450. Calculate aggregate demand, in US\\$ million.",
      wrong: [8850, 13400, 8100], explanation: "AD = 5,600 + 1,350 + 1,900 + (2,100 − 2,450) = 8,500." });
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: share, dp: 1, calculator: true, hints: ["Share = component ÷ AD × 100."],
      stem: "In the same economy (AD = US\\$8,500 million), calculate the share of consumption in AD, to one decimal place.",
      wrong: [65, 14, 22.4], explanation: "5,600 ÷ 8,500 × 100 = 65.9%." });
    chk(y2.c, 5600 * 1.05); chk(y2.g, 1900 * 0.9);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "plain", value: ad(y2) - ad(y1), unit: "US$ million", calculator: true, hints: ["Work out the new C and G, then the change in AD."],
      stem: "In the following year consumption rises by 5% and government spending falls by 10%; all other components are unchanged. Calculate the change in aggregate demand, in US\\$ million (a negative number for a fall).",
      wrong: [-190, 280, 8590], explanation: "1. New C = 5,600 × 1.05 = 5,880 (+280).\n2. New G = 1,900 × 0.90 = 1,710 (−190).\n3. Change in AD = 280 − 190 = +90. New AD = 8,590." });
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: pctChange(ad(y1), ad(y2)), dp: 1, calculator: true, hints: ["Percentage change = change ÷ original × 100."],
      stem: "Using the same data, calculate the percentage change in aggregate demand, to one decimal place.",
      wrong: [90, 1.6, 0.5], explanation: "90 ÷ 8,500 × 100 = 1.1%." });
  }
  {
    const sched = [[90, 9050], [100, 8500], [110, 8050]];
    const dpct = pctChange(8500, 8050);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: dpct, dp: 1, calculator: true, hints: ["Compare real AD at price levels 100 and 110."],
      stem: "A fictional AD schedule shows real AD (US\\$ million) of 9,050 at a price level of 90, 8,500 at a price level of 100 and 8,050 at a price level of 110. Calculate the percentage change in real AD when the price level rises from 100 to 110, to one decimal place (negative for a fall).",
      wrong: [5.3, 10, -5.9], explanation: "(8,050 − 8,500) ÷ 8,500 × 100 = −5.3%. This is a movement along the AD curve, not a shift." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A rise in the price level causes the AD curve to shift to the left.", answer: false,
    explanation: "False. A rise in the price level causes a movement along the AD curve (to a lower level of real AD); the curve itself does not shift." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Which determinant has changed?"], stem: "A fall in the incomes of a country's trading partners shifts its AD curve to the left.", answer: true,
    explanation: "True. Lower foreign incomes reduce demand for the country's exports, lowering net exports and AD at every price level." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each event with its likely effect on aggregate demand.",
    pairs: [["A rise in consumer confidence", "AD shifts to the right"], ["An increase in income tax rates", "AD shifts to the left"], ["A rise in the price level", "Movement along AD"], ["A rise in foreign incomes", "AD shifts to the right through exports"]],
    explanation: "Confidence and foreign incomes raise AD; higher taxes reduce it; a price level change moves along the curve." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A change in the {{blank:a}} level causes a movement along the AD curve, whereas a change in interest rates causes a {{blank:b}} of the curve.",
    blanks: [{ id: "a", accepted: ["price"], choices: ["price", "wage", "tax"] }, { id: "b", accepted: ["shift"], choices: ["shift", "movement", "fall"] }],
    explanation: "Price level changes are movements along AD; other determinants shift it." });

  b.short({ d: 2, skill: "RECALL", stem: "State the formula for aggregate demand in terms of C, I, G, X and M.",
    accepted: ["AD = C + I + G + (X − M)", "AD = C + I + G + X − M", "C + I + G + (X - M)", "C + I + G + X - M", "AD = C + I + G + (X-M)", "ad = c + i + g + x - m"], model: "AD = C + I + G + (X − M)", wrong: ["AD = C + S + T"],
    explanation: "AD = C + I + G + (X − M)." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define aggregate demand.",
    points: ["The total planned spending on an economy's output (domestic goods and services).", "At different price levels in a given period (AD = C + I + G + (X − M))."],
    modelAnswer: "Aggregate demand is the total planned spending on an economy's output at different price levels in a given period, made up of consumption, investment, government spending and net exports.",
    explanation: "One mark for total spending and one for price levels/period or the formula." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use two of the three effects."],
    stem: "Explain two reasons why the AD curve slopes downward.",
    points: ["Wealth effect: a lower price level raises the real value of money and assets, so households spend more.", "So consumption and AD rise at lower prices.", "Interest rate effect (or international trade effect): a lower price level lowers interest rates and encourages investment and consumption (or makes exports cheaper and imports dearer).", "So real AD is higher at a lower price level."],
    modelAnswer: "First, the wealth effect: a lower price level raises the real value of money and other assets, so households feel wealthier and spend more, raising consumption. Second, the international trade effect: a lower domestic price level makes the country's goods cheaper relative to foreign goods, so exports rise and imports fall, raising net exports. In both cases real AD is higher at a lower price level.",
    explanation: "Two effects, each linked to a component of AD." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Trace the chain from the interest rate to AD."],
    stem: "Analyse how a rise in interest rates might shift the AD curve.",
    points: ["Higher interest rates raise the cost of borrowing for households and firms.", "Consumption of goods bought on credit falls, and saving becomes more attractive.", "Investment falls because projects become less profitable at the higher cost of finance.", "The exchange rate may rise, reducing exports and raising imports.", "C, I and net exports are lower at every price level, so AD shifts to the left."],
    modelAnswer: "Higher interest rates raise the cost of borrowing for households and firms. Households cut consumption of goods bought on credit and are encouraged to save, and firms cut investment because projects become less profitable at the higher cost of finance. The exchange rate may also rise, reducing exports and raising imports. C, I and net exports are therefore lower at every price level, so AD shifts to the left.",
    explanation: "Borrowing cost, C, I, exchange rate, AD shifts left." });

  {
    const o = { c: 4200, i: 1050, g: 1500, x: 1650, m: 1900 };
    const o2 = { ...o, i: 1050 * 0.8, x: 1650 * 1.1 };
    chk(ad(o), 6500); chk(o2.i, 840); chk(o2.x, 1815); chk(ad(o2), 4200 + 840 + 1500 + (1815 - 1900));
    const t1 = table(["Component (US\\$ million)", "Year 1", "Year 2"], [["Consumption (C)", 4200, 4200], ["Investment (I)", 1050, 840], ["Government spending (G)", 1500, 1500], ["Exports (X)", 1650, 1815], ["Imports (M)", 1900, 1900]]);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["AD = C + I + G + (X − M).", "Percentage change = change ÷ original × 100."],
      stem: `**Aggregate demand in a fictional economy (illustrative data)**\n\nIn Year 2 the central bank raised interest rates and a trading partner's economy grew strongly.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: ad(o), unit: "US$ million", stem: "Calculate aggregate demand in Year 1, in US\\$ million.", wrong: [8400, 6100, 7150], explanation: "4,200 + 1,050 + 1,500 + (1,650 − 1,900) = 6,750 − 250 = 6,500." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: ad(o2), unit: "US$ million", stem: "Calculate aggregate demand in Year 2, in US\\$ million.", wrong: [6500, 6255, 6670], explanation: "4,200 + 840 + 1,500 + (1,815 − 1,900) = 6,540 − 85 = 6,455." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: pctChange(1050, 840), dp: 1, stem: "Calculate the percentage change in investment (a negative number for a fall), to one decimal place.", wrong: [20, -25, 21], explanation: "(840 − 1,050) ÷ 1,050 × 100 = −20.0%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain how the two events led to the changes in investment and exports.",
          points: ["Higher interest rates raise the cost of borrowing, so firms cut investment (from 1,050 to 840).", "The rise in the interest rate also makes some investment projects unprofitable.", "Growth in the trading partner raises its incomes, so it buys more of this country's exports (from 1,650 to 1,815).", "Exports are an injection into this country's AD."],
          modelAnswer: "Higher interest rates raise the cost of borrowing, so some investment projects are no longer profitable and firms cut investment from 1,050 to 840. Strong growth in a trading partner raises its incomes, so it buys more of this country's exports, which rise from 1,650 to 1,815. Exports are part of this country's AD." }),
      ],
      explanation: "AD Year 1 6,500; Year 2 6,455; investment −20.0%; higher interest rates cut I; foreign growth raises X." });
  }
  {
    const t2 = table(["Price level (index)", "Real AD before (US\\$ million)", "Real AD after (US\\$ million)"], [[90, 7700, 8100], [100, 7300, 7700], [110, 6950, 7350]]);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Compare the columns at the same price level for a shift.", "Compare rows within a column for a movement."],
      stem: `**An AD schedule before and after a policy change (illustrative data)**\n\nThe government announces a cut in income tax rates.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: 400, unit: "US$ million", stem: "By how much does real AD change at each price level after the tax cut, in US\\$ million?", wrong: [350, 300, 7700], explanation: "8,100 − 7,700 = 400 (and 7,700 − 7,300 = 400, 7,350 − 6,950 = 400)." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(7300, 6950), dp: 1, stem: "Before the tax cut, calculate the percentage change in real AD when the price level rises from 100 to 110 (negative for a fall), to one decimal place.", wrong: [5, 4.8, -5], explanation: "(6,950 − 7,300) ÷ 7,300 × 100 = −4.8%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the AD curve has shifted to the right.",
          points: ["The tax cut raises households' disposable income.", "Households increase consumption at every price level.", "So real AD is higher (by 400) at every price level."],
          modelAnswer: "The cut in income tax raises households' disposable income, so they increase consumption at every price level. Real AD is therefore higher by US\\$400 million at every price level, which is a rightward shift of the AD curve." }),
        P.manual({ label: "(d)", marks: 4, stem: "Distinguish between the change in AD caused by the price level rising from 100 to 110 and the change caused by the tax cut.",
          points: ["A price level rise causes a movement along the AD curve (real AD falls from 7,300 to 6,950).", "It is due to the wealth, interest rate and trade effects.", "The tax cut causes a shift of the curve to the right (real AD rises at every price level).", "It is due to a change in a determinant other than the price level."],
          modelAnswer: "A rise in the price level from 100 to 110 causes a movement along the AD curve, with real AD falling from 7,300 to 6,950 because of the wealth, interest rate and trade effects. The tax cut shifts the whole curve to the right, raising real AD at every price level, because it changes a determinant of AD other than the price level." }),
      ],
      explanation: "Shift +400 at each price level; movement −4.8% along the curve; tax cut raises consumption; shift against movement." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Consider several determinants and how large their effects may be.", "Reach a judgement."],
    stem: "Assess which of the components of aggregate demand is likely to have the greatest influence on changes in national output in a developing economy.",
    points: ["Consumption is the largest component, so changes in it have a large effect.", "Consumption depends on incomes, which in a developing economy may be volatile (harvests, remittances).", "Investment is smaller but more volatile and depends on confidence, interest rates and availability of finance.", "Government spending is under the government's control, but depends on revenue and borrowing.", "Exports (often commodities) expose output to world prices and demand.", "Imports reduce AD; a high import share reduces the effect of other changes.", "The multiplier magnifies changes in the most volatile components.", "Investment also affects the supply side and long-term growth.", "The importance differs between countries and years.", "A justified judgement."],
    levels: LV10,
    modelAnswer: "Consumption is the largest component of AD, so even a small percentage change in it has a large effect on output. In a developing economy household incomes can be volatile, depending on harvests and remittances. Investment is smaller but more volatile and depends on business confidence, interest rates and the availability of finance, and it also affects long-term growth. Government spending is controlled by the government but depends on revenue and borrowing. Exports, often of primary commodities, expose output to world prices and demand, while imports are a leakage that reduces the effect of any change. The multiplier magnifies changes in the most volatile components. Overall, consumption has the greatest influence because of its size, but the biggest changes in output often come from the more volatile components, investment and exports, so the answer depends on the country and the period.",
    wordLimit: { min: 120, max: 350 },
    explanation: "Weigh size (consumption) against volatility (investment, exports)." });

  b.card("DEFINITION", "Define **aggregate demand**.", "The total planned spending on an economy's output at different price levels in a period: AD = C + I + G + (X − M).");
  b.card("CONCEPT", "Name the three reasons the AD curve slopes downward.", "The wealth effect, the interest rate effect and the international trade (exchange rate) effect.");
  b.card("CONCEPT", "What causes a movement along the AD curve?", "A change in the general price level.");
  b.card("CONCEPT", "What causes a shift of the AD curve?", "A change in any determinant other than the price level: confidence, taxes, interest rates, government spending, foreign incomes, exchange rate.");
  b.card("CONCEPT", "Give three determinants of consumption.", "Disposable income, interest rates and wealth (also confidence, credit availability).");
  b.card("CONCEPT", "Give three determinants of investment.", "Interest rates, business confidence and expected profit, and technology (also changes in demand).");
  b.card("CONCEPT", "What determines net exports?", "Foreign and domestic incomes, the exchange rate, relative prices and competitiveness.");
  b.card("FORMULA", "How do you work out a component's share of AD?", "Component ÷ total AD × 100.");
  b.card("CONCEPT", "Why are transfer payments not counted in G?", "They are not spending on goods and services; they affect AD only when recipients spend them (in C).");
});
