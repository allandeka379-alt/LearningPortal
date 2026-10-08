// W1b: ZIMSEC exam-format items. Paper 2 data response (STRUCTURED 20, ANALYSIS) x3; Paper 3 essays (STRUCTURED 10 =
// (a) explain 4 + (b) discuss 6, EVALUATION) x3. Fictional data, computed and checked here.
import { concept, P, ZIM, schedule, elasticity, pctChange, money, table, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const f2 = (v) => (v > 0 ? "+" : "") + v.toFixed(2).replace("-", "−");

concept("econ.markets.equilibrium", { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  // ---------------- Paper 2, item 1: demand and supply schedules with a supply shift.
  {
    const p = [2, 3, 4, 5, 6], d = [910, 810, 710, 610, 510], s1 = [510, 610, 710, 810, 910];
    const s2 = s1.map((x) => x - 200);
    const A = schedule({ prices: p, qd: d, qs: s1, requireEquilibrium: true });
    const B = schedule({ prices: p, qd: d, qs: s2, requireEquilibrium: true });
    check("eq1", A.equilibrium.price, 4); check("eq2", B.equilibrium.price, 5);
    const short = d[2] - s2[2];
    const sp1 = A.equilibrium.price * A.equilibrium.quantity, sp2 = B.equilibrium.price * B.equilibrium.quantity;
    const t = schedule({ prices: p, qd: d, qs: s1, priceHeader: "Price per crate (US\\$)", qdHeader: "Quantity demanded (crates per day)", qsHeader: "Quantity supplied before the storm, S1", extra: [{ header: "Quantity supplied after the storm, S2", values: s2 }] }).md;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2",
      concepts: ["econ.markets.equilibrium", "econ.markets.price-changes", "econ.supply.shifts", "econ.demand.law-of-demand", "econ.supply.law-of-supply"],
      stem: `Tomatoes sold in a fictional town come from small farms in the surrounding district. In February a severe storm destroyed part of the crop. Table 1 shows the daily market for tomatoes before and after the storm (all figures in crates per day). Demand did not change.\n\n**Table 1**\n\n${t}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: A.equilibrium.price, stem: "State the equilibrium price before the storm.", wrong: [B.equilibrium.price], explanation: `Before the storm quantity demanded equals quantity supplied (${A.equilibrium.quantity} crates) at US\\$${A.equilibrium.price}.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: A.equilibrium.quantity, stem: "State the equilibrium quantity before the storm (crates per day).", wrong: [B.equilibrium.quantity], explanation: `${A.equilibrium.quantity} crates per day at US\\$${A.equilibrium.price}.` }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: short, stem: "After the storm, calculate the shortage at the old equilibrium price (crates per day).", wrong: [d[2], s1[2] - s2[2] + d[2]], explanation: `At US\\$${p[2]}: quantity demanded ${d[2]} − quantity supplied on S2 ${s2[2]} = ${short} crates.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: B.equilibrium.price, stem: "State the new equilibrium price after the storm.", wrong: [A.equilibrium.price], explanation: `D = S2 at US\\$${B.equilibrium.price}.` }),
        P.num({ label: "(e)", marks: 1, kind: "plain", value: B.equilibrium.quantity, stem: "State the new equilibrium quantity after the storm (crates per day).", wrong: [A.equilibrium.quantity], explanation: `D = S2 at ${B.equilibrium.quantity} crates.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: sp2 - sp1, stem: "Calculate the change in total daily spending on tomatoes between the two equilibrium positions. Give a fall as a negative number.", wrong: [sp1 - sp2, sp2], explanation: `Before: ${A.equilibrium.price} × ${A.equilibrium.quantity} = ${money(sp1)}. After: ${B.equilibrium.price} × ${B.equilibrium.quantity} = ${money(sp2)}. Change = ${money(sp2 - sp1)}.` }),
        P.manual({
          label: "(g)", marks: 4,
          stem: "Describe a demand and supply diagram that shows the effect of the storm on the tomato market.",
          points: [
            "Price on the vertical axis and quantity (crates per day) on the horizontal axis.",
            "Downward-sloping D and upward-sloping S1 crossing at US\\$4 and 710 crates.",
            "S2 drawn to the left of S1 (decrease in supply).",
            "New equilibrium where D meets S2 at US\\$5 and 610 crates (higher price, lower quantity).",
          ],
          modelAnswer: "Price on the vertical axis and crates per day on the horizontal axis. D slopes down and S1 slopes up; they cross at US\\$4 and 710 crates. The storm shifts supply to the left, to S2, 200 crates to the left of S1 at every price. S2 crosses D at a higher price, US\\$5, and a lower quantity, 610 crates.",
          explanation: "Axes, the original equilibrium, the leftward shift and the new equilibrium.",
        }),
        P.manual({
          label: "(h)", marks: 4,
          stem: "Explain how the market moves from the old equilibrium to the new one.",
          points: [
            "The storm reduces supply at every price (S shifts left).",
            "At US\\$4 there is a shortage of 200 crates: buyers cannot get all the tomatoes they want.",
            "Buyers compete / traders raise the price.",
            "As the price rises, quantity supplied extends along S2 and quantity demanded contracts along D until they are equal at US\\$5 and 610 crates.",
          ],
          modelAnswer: "The storm destroys part of the crop, so fewer crates are offered at every price and supply decreases. At the old price of US\\$4, 710 crates are demanded but only 510 are supplied, a shortage of 200. Buyers compete for the scarce tomatoes and traders raise their prices. As the price rises, farmers send more of their remaining crop to this market (supply extends) and consumers buy fewer tomatoes (demand contracts), until at US\\$5 both equal 610 crates.",
          explanation: "Shift → shortage → price rise → movements along the curves.",
        }),
        P.manual({
          label: "(i)", marks: 4, levels: LV(4),
          stem: "Discuss whether tomato farmers in the district are better off after the storm.",
          points: [
            `Spending on tomatoes (farmers' total revenue) rises from ${money(sp1)} to ${money(sp2)} a day.`,
            "The higher price (US\\$5 instead of US\\$4) benefits farmers whose crop survived.",
            "Farmers whose crop was destroyed lose income and may have repair costs.",
            "Justified conclusion: farmers as a group earn more, but the gain is unevenly shared.",
          ],
          modelAnswer: `Total spending on tomatoes, which is the farmers' total revenue, rises from ${money(sp1)} to ${money(sp2)} a day, because the price rises by more (25%) than the quantity falls (about 14%). Farmers whose crops survived gain from the higher price. However, farmers whose crops were destroyed have little or nothing to sell and may face repair costs. So farmers as a group are slightly better off, but the gain goes to those who were lucky, while others lose heavily.`,
          explanation: "Use the spending figures and consider different groups of farmers.",
        }),
      ],
      explanation: `Before the storm: US\\$${A.equilibrium.price}, ${A.equilibrium.quantity} crates. The storm decreases supply by 200 crates at every price, causing a shortage of ${short} at US\\$4; the new equilibrium is US\\$${B.equilibrium.price}, ${B.equilibrium.quantity} crates.`,
      hints: ["Equilibrium is where quantity demanded equals quantity supplied.", "After the storm, compare D with S2.", "Spending = price × quantity."],
    });
  }

  // ---------------- Paper 2, item 2: PED, PES and revenue.
  {
    const p1 = 2.0, p2 = 2.4, qd1 = 12000, qd2 = 10800, qs1 = 9000, qs2 = 10350;
    const ped = elasticity.ped({ p1, p2, q1: qd1, q2: qd2 });
    const pes = elasticity.pes({ p1, p2, q1: qs1, q2: qs2 });
    check("ped", ped, -0.5); check("pes", pes, 0.75);
    const tr1 = p1 * qd1, tr2 = p2 * qd2;
    const t = table(["", "Before", "After"], [["Price per 2-litre bottle (US\\$)", "2.00", "2.40"], ["Quantity demanded (bottles per week)", qd1, qd2], ["Quantity supplied by local producers (bottles per week)", qs1, qs2]]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2",
      concepts: ["econ.elasticity.ped", "econ.elasticity.ped-revenue", "econ.elasticity.pes", "econ.elasticity.ped-determinants"],
      stem: `In a fictional country, higher world prices for sunflower seed pushed up the price of cooking oil. Table 2 shows weekly sales of cooking oil in one city and the quantity supplied by local producers before and after the price rise. The rest of the oil sold is imported.\n\n**Table 2**\n\n${t}`,
      parts: [
        P.mcq({
          label: "(a)", stem: "Which formula is used to calculate price elasticity of demand?",
          options: [["% change in quantity demanded ÷ % change in price", "Correct."], ["% change in price ÷ % change in quantity demanded", "Upside down."], ["% change in quantity supplied ÷ % change in price", "That is PES."], ["Change in quantity demanded ÷ change in price", "PED uses percentage changes."]],
          answer: "A",
          explanation: "PED = % change in quantity demanded ÷ % change in price.",
        }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: ped, stem: "Calculate the price elasticity of demand for cooking oil. Include the minus sign and give your answer to two decimal places.", wrong: [1 / ped, -ped], explanation: `% change in quantity demanded = (10,800 − 12,000) ÷ 12,000 × 100 = −10%; % change in price = (2.40 − 2.00) ÷ 2.00 × 100 = 20%; PED = −10 ÷ 20 = ${f2(ped)}.` }),
        P.mcq({
          label: "(c)", stem: "What does your answer to (b) show?",
          options: [["Demand is price inelastic", "Correct: 0.5 is less than 1 ignoring the sign."], ["Demand is price elastic", "Elastic demand would need a value above 1."], ["Demand is unitary elastic", "That needs exactly 1."], ["Demand is perfectly inelastic", "Quantity did change, so PED is not 0."]],
          answer: "A",
          explanation: "|−0.5| < 1: inelastic.",
        }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: tr2 - tr1, stem: "Calculate the change in weekly consumer spending on cooking oil in the city.", wrong: [tr2, (p2 - p1) * qd1], explanation: `Before: 2.00 × 12,000 = ${money(tr1)}. After: 2.40 × 10,800 = ${money(tr2)}. Change = +${money(tr2 - tr1)}.` }),
        P.num({ label: "(e)", marks: 2, kind: "elasticity", value: pes, stem: "Calculate the price elasticity of supply of local producers, to two decimal places.", wrong: [1 / pes, 1350 / 0.5], explanation: `% change in quantity supplied = (10,350 − 9,000) ÷ 9,000 × 100 = 15%; PES = 15 ÷ 20 = ${pes.toFixed(2)}.` }),
        P.manual({
          label: "(f)", marks: 4,
          stem: "Explain **two** reasons why the supply of cooking oil by local producers may be price inelastic.",
          points: [
            "Identifies limited capacity / mills already working near full capacity.",
            "Explains: output cannot be raised quickly without new machinery.",
            "Identifies limited raw material: sunflower seed takes a season to grow / short time period.",
            "Explains: producers cannot get extra seed until the next harvest, so quantity rises only a little.",
          ],
          modelAnswer: "First, local mills may already be working close to full capacity, so they cannot raise output much without installing new presses, which takes time. Second, the main raw material, sunflower seed, takes a whole season to grow, so in the short run producers cannot obtain much more seed to crush. Both reasons mean that quantity supplied rises by a smaller percentage (15%) than the price (20%).",
          explanation: "Two determinants of PES applied to cooking oil.",
        }),
        P.manual({
          label: "(g)", marks: 4,
          stem: "Explain why the government might consider PED when deciding whether to tax cooking oil.",
          points: [
            "Demand is inelastic, so a tax would reduce sales only a little.",
            "So the tax would raise a lot of revenue.",
            "But consumers would pay more for a necessity: spending on oil rises, leaving less for other goods.",
            "Poorer households spend a larger share of income on food, so the tax would hit them hardest.",
          ],
          modelAnswer: "Because demand for cooking oil is inelastic (PED −0.5), a tax that raises its price would cut sales only a little, so the government would collect a lot of revenue. However, cooking oil is a necessity: households would end up spending more on it, as the rise in spending in (d) shows, leaving less for other goods. Poorer households spend a larger share of income on food, so they would be hit hardest. The government must weigh revenue against fairness.",
          explanation: "Link PED to tax revenue and to the burden on households.",
        }),
        P.manual({
          label: "(h)", marks: 4, levels: LV(4),
          stem: "Discuss whether a local producer of cooking oil should raise its price further.",
          points: [
            "For: demand is inelastic, so a higher price raises total revenue (as in (d)).",
            "Against: one producer's oil has close substitutes (other brands, imports), so demand for its own brand is more elastic than for oil as a whole.",
            "Against: higher prices may attract more imports or lose customers in the long run as PED rises over time.",
            "Justified conclusion.",
          ],
          modelAnswer: "Demand for cooking oil as a whole is inelastic, so the market price rise increased spending, which suggests a further rise could raise revenue. However, one producer's brand has close substitutes: other local brands and imported oil. If it raises its price alone, many customers will switch, so demand for its own brand is likely to be elastic and its revenue could fall. Over time, consumers may also use less oil or switch brands. It should raise its price only if rivals do the same.",
          explanation: "Distinguish the market PED from the PED for one firm's brand.",
        }),
      ],
      explanation: `PED = ${f2(ped)} (inelastic), so spending rose by ${money(tr2 - tr1)}. PES = ${pes.toFixed(2)} (inelastic): local producers cannot quickly expand output.`,
      hints: ["Use the 'Before' values as the bases for percentage changes.", "Spending = price × quantity demanded."],
    });
  }

  // ---------------- Paper 2, item 3: YED and XED.
  {
    const y1 = 320, y2 = 352;
    const yp = pctChange(y1, y2);
    const goods = [["Rice (kg)", 450, 486], ["Beef (kg)", 180, 207], ["Bus rides", 1800, 1710]];
    const yeds = goods.map(([, q1, q2]) => elasticity.yed({ y1, y2, q1, q2 }));
    check("y0", yeds[0], 0.8); check("y1", yeds[1], 1.5); check("y2", yeds[2], -0.5);
    const xed = elasticity.xed({ pb1: 15, pb2: 18, qa1: 140, qa2: 126 });
    check("xed", xed, -0.5);
    const t3 = table(["Good", "Weekly sales when income was US\\$320", "Weekly sales when income was US\\$352"], goods);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2",
      concepts: ["econ.elasticity.income-cross", "econ.demand.shifts"],
      stem: `In a fictional town average monthly household income rose from US\\$320 to US\\$352. Table 3 shows weekly sales of three goods in the town before and after the rise; prices did not change.\n\n**Table 3**\n\n${t3}\n\nIn the same period a gas company raised the price of refilling a gas cylinder from US\\$15 to US\\$18, and monthly sales of gas stoves in the town fell from 140 to 126.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: yp, stem: "Calculate the percentage increase in average income, to one decimal place.", wrong: [pctChange(y2, y1) * -1, 32], explanation: `(352 − 320) ÷ 320 × 100 = ${yp.toFixed(1)}%.` }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: yeds[0], stem: "Calculate the income elasticity of demand for rice, to two decimal places.", wrong: [1 / yeds[0], 36 / 32], explanation: `% change in quantity = 36 ÷ 450 × 100 = 8%; YED = 8 ÷ 10 = ${f2(yeds[0])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "elasticity", value: yeds[1], stem: "Calculate the income elasticity of demand for beef, to two decimal places.", wrong: [1 / yeds[1], 27 / 32], explanation: `% change in quantity = 27 ÷ 180 × 100 = 15%; YED = 15 ÷ 10 = ${f2(yeds[1])}.` }),
        P.match({
          label: "(d)", marks: 3, stem: "Use the data to match each good with its type.",
          pairs: [["Rice", "Normal good, necessity"], ["Beef", "Normal good, luxury"], ["Bus rides", "Inferior good"]],
          explanation: `Rice YED ${f2(yeds[0])} (0 to 1); beef ${f2(yeds[1])} (above 1); bus rides ${f2(yeds[2])} (negative: as incomes rise, people use cars or kombis instead).`,
        }),
        P.num({ label: "(e)", marks: 2, kind: "elasticity", value: xed, stem: "Calculate the cross elasticity of demand for gas stoves with respect to the price of gas refills. Include the sign and give your answer to two decimal places.", wrong: [-xed, 1 / xed], explanation: `% change in quantity of stoves = (126 − 140) ÷ 140 × 100 = −10%; % change in price of refills = (18 − 15) ÷ 15 × 100 = 20%; XED = −10 ÷ 20 = ${f2(xed)}.` }),
        P.mcq({
          label: "(f)", stem: "What does the value in (e) show about gas stoves and gas refills?",
          options: [["They are complements", "Correct: negative XED."], ["They are substitutes", "Substitutes have a positive XED."], ["They are unrelated goods", "Unrelated goods have XED of about zero."], ["They are inferior goods", "Inferior goods are identified by YED, not XED."]],
          answer: "A",
          explanation: "A negative cross elasticity means the goods are complements (used together).",
        }),
        P.manual({
          label: "(g)", marks: 4,
          stem: "Using the data, explain why a supermarket in the town would find income elasticity of demand useful.",
          points: [
            "Forecasting: with YED known, it can predict how sales change when incomes change.",
            "Uses data: e.g. a 10% income rise raised beef sales by 15% but rice by only 8%.",
            "Stocking/planning: it can order more luxuries such as beef when incomes rise.",
            "Risk: in a recession, sales of luxuries fall most, so it can adjust its range (stock more necessities/inferior goods).",
          ],
          modelAnswer: "Knowing YED lets the supermarket forecast its sales. When incomes rose by 10%, beef sales rose by 15% but rice sales by only 8%, so if incomes are expected to keep rising it should order relatively more beef and other luxuries. If incomes fall in a recession, sales of luxuries will fall fastest, so it can switch shelf space towards necessities and cheaper goods.",
          explanation: "Use the YED values to explain forecasting and planning.",
        }),
        P.manual({
          label: "(h)", marks: 5, levels: LV(5),
          stem: "Discuss whether the bus company in the town should worry about rising incomes.",
          points: [
            `Bus rides have a negative YED (${f2(yeds[2])}): as incomes rise, demand falls.`,
            "If incomes keep rising, the company's revenue will keep falling.",
            "However, the effect is small (5% fall for a 10% income rise), and other factors (fuel prices, population growth) also matter.",
            "The company could respond by improving quality (comfort, reliability) so that bus travel is no longer seen as inferior.",
            "Justified conclusion.",
          ],
          modelAnswer: `Bus rides are an inferior good in this town (YED ${f2(yeds[2])}): when incomes rose by 10%, rides fell by 5% as people switched to cars and kombis. If incomes keep rising, the company's sales and revenue will keep falling, so it should be concerned. However, the effect is fairly small, and a growing population or higher fuel prices could raise bus use. The company could also improve comfort and reliability so that better-off travellers see the bus as a good choice. Overall the company should worry somewhat and act to improve its service rather than rely on low incomes.`,
          explanation: "Use the negative YED, consider its size and other factors, and conclude.",
        }),
      ],
      explanation: `Income rose by ${yp.toFixed(1)}%. YED: rice ${f2(yeds[0])}, beef ${f2(yeds[1])}, bus rides ${f2(yeds[2])}. XED stoves/refills ${f2(xed)}: complements.`,
      hints: ["Percentage changes use the original values.", "Sign of YED: normal or inferior. Sign of XED: substitutes or complements."],
    });
  }

  // ---------------- Paper 3 essays.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.demand.law-of-demand", "econ.demand.shifts", "econ.elasticity.income-cross"],
    stem: "Demand is central to how prices are set in a market economy.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Distinguish between effective demand and latent demand, and explain the law of demand.",
        points: [
          "Effective demand: a desire for a good backed by the ability to pay.",
          "Latent demand: a desire not (yet) backed by the ability to pay.",
          "Law of demand: other things equal, as price rises quantity demanded falls (and vice versa).",
          "Explains a reason, e.g. income or substitution effect / new buyers at lower prices.",
        ],
        modelAnswer: "Effective demand is a want that is backed by the ability to pay at the current price, so it results in purchases. Latent demand is a want that consumers cannot yet pay for, such as a family that would like a car but cannot afford one. The law of demand states that, other things being equal, when the price of a good rises the quantity demanded falls, and when the price falls the quantity demanded rises. This happens because a lower price makes the good cheaper than its substitutes, so consumers switch to it, and the same income can buy more of it.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether a rise in consumers' incomes will always increase the demand for a good.",
        points: [
          "For normal goods a rise in income increases demand: the curve shifts right (positive YED).",
          "Luxuries (YED above 1) see a large increase; necessities (0 to 1) a smaller one.",
          "For inferior goods demand decreases as income rises (negative YED), e.g. the cheapest foods or bus rides.",
          "Other conditions may change at the same time (prices of substitutes, tastes, taxes) and offset the effect.",
          "Whether a good is normal or inferior depends on the income level of the household.",
          "Justified conclusion: not always; it depends on the type of good.",
        ],
        modelAnswer: "For most goods a rise in income increases demand, because consumers can afford more at every price: the demand curve shifts to the right. These are normal goods; for luxuries such as restaurant meals, demand rises by a larger percentage than income (YED above 1), while for necessities such as salt it rises only a little. However, some goods are inferior: as incomes rise, households switch from the cheapest grade of maize meal or from bus rides to better alternatives, so demand for these falls. Whether a good is inferior also depends on the household: a bicycle may be a normal good for a poor family but inferior for a richer one. Other factors can also change at the same time, such as a rise in the price of the good's complement or a change in tastes, which may offset the income effect. Therefore a rise in incomes does not always increase demand: it does for normal goods but reduces demand for inferior goods.",
      }),
    ],
    explanation: "Part (a) tests definitions and the law of demand; part (b) uses normal and inferior goods (income elasticity) to reach a conclusion.",
    hints: ["(a) Ability to pay is the key difference.", "(b) Think about normal and inferior goods."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.supply.climate-change", "econ.supply.shifts", "econ.markets.price-changes"],
    stem: "Climate change is affecting production in many sectors of Zimbabwe's economy.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain how climate change can affect the supply and price of agricultural products.",
        points: [
          "Climate change brings more droughts, erratic rainfall, higher temperatures or floods.",
          "Crop yields fall / livestock die, so supply decreases at every price (shift left).",
          "With unchanged demand there is a shortage at the old price.",
          "So the equilibrium price rises and quantity falls.",
        ],
        modelAnswer: "Climate change means more frequent droughts, less predictable rainfall, higher temperatures and occasional floods. These lower crop yields and kill or weaken livestock, so farmers can offer less at every price: the supply curve of farm products shifts to the left. With demand unchanged, there is a shortage at the old price, so prices rise and the quantity traded falls. Lower hydro-electricity output in dry years can also raise costs in food processing, decreasing supply further.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss the measures that farmers and the government can take to reduce the effects of climate change on production.",
        points: [
          "Adaptation by farmers: conservation agriculture, drought-tolerant crops (sorghum, millet), water harvesting.",
          "Government: irrigation schemes/dams, weather information and early warning, research into seed varieties.",
          "Mitigation: renewable energy (solar), reforestation, reducing deforestation.",
          "Limits: irrigation and dams are costly; small-scale farmers may lack money or skills; drought-tolerant crops yield less in good years.",
          "Some measures work only in the long run (trees, dams); mitigation needs global action.",
          "Justified conclusion on which measures are most effective/practical.",
        ],
        modelAnswer: "Farmers can adapt by using conservation agriculture, such as mulching and planting basins, which keeps moisture in the soil, and by growing drought-tolerant crops such as sorghum and millet. The government can build dams and irrigation schemes, provide weather forecasts and early warnings, and fund research into better seed. To mitigate climate change it can promote solar power and reforestation. However, dams and irrigation are expensive and take years to build, many small-scale farmers cannot afford new inputs, and drought-tolerant crops yield less than maize in good years. Mitigation by one country has little effect on the global climate. Overall, low-cost adaptation measures such as conservation agriculture and drought-tolerant seed are the most practical for most farmers in the short run, while irrigation and renewable energy are important longer-term investments.",
      }),
    ],
    explanation: "Part (a) links climate change to a leftward supply shift and higher prices; part (b) weighs adaptation and mitigation measures.",
    hints: ["(a) Effect on supply, then price.", "(b) Consider cost, time and who can use each measure."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.elasticity.pes", "econ.elasticity.ped-revenue", "econ.elasticity.ped-determinants"],
    stem: "Elasticity measures how strongly buyers and sellers respond to price changes.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain **two** determinants of the price elasticity of supply.",
        points: [
          "Identifies time: supply is more elastic in the long run.",
          "Explains: firms need time to build capacity / farmers need a growing season.",
          "Identifies a second determinant: spare capacity, stocks, or ease of switching factors.",
          "Explains how it allows (or prevents) a quick increase in quantity supplied.",
        ],
        modelAnswer: "The first determinant is time. In the short run firms can only use existing machines and workers more intensively, and farmers cannot grow more until the next season, so supply is inelastic; in the long run they can build new factories or plant more land, so supply becomes more elastic. The second is the level of stocks: firms that hold large stocks of a non-perishable good, such as cement, can release them as soon as the price rises, so their supply is elastic, whereas perishable goods such as fresh milk cannot be stored, so their supply is inelastic.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss the importance of price elasticity of demand to firms and to the government.",
        points: [
          "Firms: pricing; with inelastic demand a price rise raises revenue, with elastic demand a price cut raises revenue.",
          "Firms: estimate the effect of price changes on sales and plan output; branding to make demand less elastic.",
          "Government: taxing goods with inelastic demand raises more revenue.",
          "Government: taxes on inelastic goods do little to cut consumption of harmful goods; burden falls on consumers, often the poor.",
          "Limits: PED is hard to estimate accurately and changes over time; other things do not stay equal.",
          "Justified conclusion.",
        ],
        modelAnswer: "PED is important to firms when they set prices. If demand is inelastic, as for a staple food, a price rise increases total revenue; if it is elastic, as for one brand among many, a price cut increases revenue. Knowing PED also helps firms forecast sales and plan output, and they advertise to make demand less elastic. For the government, PED guides taxation: taxes on goods with inelastic demand, such as fuel and tobacco, raise much revenue because sales fall little. But this also means such taxes do little to reduce consumption of harmful goods, and the burden falls on consumers, including the poor who spend a large share of income on necessities. However, PED is difficult to measure, differs between groups of consumers and changes over time, and other factors such as incomes and rivals' prices change too. PED is therefore a very useful guide for both firms and the government, but it should be used with care rather than relied on alone.",
      }),
    ],
    explanation: "Part (a) covers determinants of PES; part (b) evaluates the uses of PED.",
    hints: ["(a) Time, spare capacity, stocks, switching factors.", "(b) Pricing, revenue and tax, with limits."],
  });
});
