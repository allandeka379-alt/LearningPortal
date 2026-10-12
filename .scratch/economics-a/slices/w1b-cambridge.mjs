// W1b: Cambridge exam-format items (Paper 2 Section A data response x1, Paper 2 essays x2, micro) on AS concepts.
import { concept, P, EXAM, CAM, checkExam, chk, elasticity, table } from "../lib.mjs";

const L12 = [
  [3, 9, 12, "Developed, balanced analysis applied to the question, with evaluation and a supported judgement."],
  [2, 5, 8, "Some analysis and application; evaluation limited or judgement not supported."],
  [1, 1, 4, "Simple, undeveloped points with little application."],
];
const L6 = [
  [3, 5, 6, "Two-sided, developed and applied to the data, with a supported judgement."],
  [2, 3, 4, "Some development of one side or limited use of the data."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.ped", { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  // Paper 2 Section A: data response on a tax on petrol.
  {
    const ped = elasticity.ped({ p1: 1.4, p2: 1.6, q1: 500, q2: 460 });
    chk(ped, -0.56, 1e-9);
    const revenue = 0.3 * 460;
    chk(revenue, 138, 1e-9);
    const prodShare = (0.1 / 0.3) * 100;
    const t = table(["", "Year 1 (before the tax)", "Year 2 (after the tax)"], [["Price per litre (US\\$)", "1.40", "1.60"], ["Quantity sold (million litres per month)", "500", "460"], ["Tax per litre (US\\$)", "0", "0.30"]], { align: ["l", "r", "r"] });
    const parts = checkExam(EXAM.CAM_P2_DATA, [
      P.num({ label: "(a)", marks: 3, kind: "elasticity", value: ped, dp: 2, stem: "Using the table, calculate the price elasticity of demand for petrol between Year 1 and Year 2. Include the minus sign.", wrong: [0.56, -1.79, -0.08],
        explanation: "% change in price = (1.60 − 1.40) ÷ 1.40 × 100 = +14.3%. % change in quantity = (460 − 500) ÷ 500 × 100 = −8%. PED = −8 ÷ 14.29 = −0.56." }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: revenue, sf: 3, unit: "US$ million", stem: "Calculate the government's monthly revenue from the tax, in US\\$ million.", wrong: [150, 460, 30],
        explanation: "Tax revenue = US\\$0.30 × 460 million litres = US\\$138 million." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why consumers bear most of the tax on petrol.",
        points: ["The price rose by US\\$0.20 of the US\\$0.30 tax.", "Demand is inelastic (PED −0.56): consumers have few substitutes and keep buying.", "Sellers can therefore pass most of the tax on in the price."],
        modelAnswer: "The price rose by US\\$0.20 per litre, two-thirds of the US\\$0.30 tax, so consumers pay most of it. Demand for petrol is inelastic, with a PED of −0.56, because motorists have few substitutes in the short run and keep buying, so sellers can pass most of the tax on in a higher price." }),
      P.num({ label: "(d)", marks: 2, kind: "pct", value: prodShare, dp: 1, unit: "%", stem: "Calculate the percentage of the tax per litre borne by producers, to one decimal place.", wrong: [66.7, 25, 10],
        explanation: "Producers receive US\\$1.60 − 0.30 = US\\$1.30 compared with US\\$1.40, a fall of US\\$0.10 per litre. 0.10 ÷ 0.30 × 100 = 33.3%." }),
      P.manual({ label: "(e)", marks: 4, stem: "Analyse the effect of the tax on consumers of petrol and on petrol retailers.",
        points: ["Consumers pay a higher price (US\\$1.60 against US\\$1.40).", "Quantity bought falls from 500 to 460 million litres; some consumers cut journeys or switch to other transport.", "Producers receive a lower net price (US\\$1.30 against US\\$1.40) and sell less.", "Retailers' revenue and profit fall; the effect is smaller than for consumers because demand is inelastic."],
        modelAnswer: "Consumers pay a higher price, US\\$1.60 instead of US\\$1.40, and buy less, 460 million litres instead of 500. Some cut journeys or switch to other transport, and their consumer surplus falls; poorer households and businesses that depend on petrol are hit hardest. Retailers receive a lower net price of US\\$1.30 and sell fewer litres, so their revenue and profit fall. Because demand is inelastic the fall in quantity is small, so the effect on retailers' sales is limited." }),
      P.manual({ label: "(f)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 250 }, levels: L6, stem: "Assess whether the tax is an effective way for the government of Country X to reduce petrol consumption.",
        points: ["The tax raised price by 14.3% and reduced quantity by 8%: some effect.", "Demand is inelastic, so consumption falls by little.", "The tax raises substantial revenue (US\\$138 million a month) for other uses.", "Long-run demand is more elastic, so the effect may grow.", "Other measures (public transport, regulation) may be needed to cut use further.", "Judgement: effective as a revenue raiser, limited in reducing consumption."],
        modelAnswer: "The tax raised the price by 14.3% and reduced consumption by only 8%, so it did have an effect, but demand is inelastic, with a PED of −0.56, so consumption fell by less than the price rose. In the long run motorists can change vehicles, share journeys or use public transport, so demand is more elastic and the effect may grow. The tax raises US\\$138 million a month, which the government could use for public transport. On balance the tax is effective at raising revenue but only moderately effective at reducing consumption in the short run, so the government might need other measures to cut petrol use substantially." }),
    ]);
    b.struct({
      d: 4, examStyle: true, calculator: true, paper: "Paper 2", skill: EXAM.CAM_P2_DATA.skill, secs: EXAM.CAM_P2_DATA.secs, applies: EXAM.CAM_P2_DATA.applies,
      concepts: ["aecon.market.ped", "aecon.intervention.taxes-subsidies"],
      hints: ["Percentage change = change ÷ original × 100.", "Tax revenue = tax per unit × quantity after the tax."],
      stem: `**A tax on petrol in Country X (illustrative data)**\n\nCountry X is a fictional economy in which most people travel by minibus, car or lorry and almost all vehicles run on petrol. In Year 2 the government introduced a specific tax of US\\$0.30 per litre on petrol. The Ministry of Finance gave two reasons for the tax. The first was to raise revenue for road repairs and public transport. The second was to reduce the environmental damage caused by traffic in the capital city.\n\nAfter the tax, the price at the pump rose from US\\$1.40 to US\\$1.60 per litre and monthly sales fell from 500 to 460 million litres. Minibus operators said that they were forced to raise fares because they have no alternative fuel, and many households said that they travel only when they must. A transport association noted that, over the longer term, some businesses were buying smaller vehicles and a few commuters were moving closer to their workplaces. Critics of the tax argued that it falls hardest on poor households, who spend a larger share of their income on transport. Supporters answered that the revenue would be used to improve public transport, which would benefit low-income households most.\n\nPetrol retailers reported that their sales fell but that they were able to keep most customers. Some smuggling of fuel from a neighbouring country was also reported near the border. The Ministry of Finance said that it would review the tax after one year. Economists at the national university expect that, if the higher price lasts, demand for petrol will become more responsive over time, as households replace old vehicles and as public transport improves.\n\n**Table: Petrol in Country X**\n\n${t}`,
      parts,
      explanation: "PED −0.56; tax revenue US\\$138 million; producers bear 33.3% of the tax; assessment of the tax.",
    });
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Paper 2 essay 1 (micro): price controls and buffer stocks.
  {
    const parts = checkExam(EXAM.CAM_P2_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 350 },
        stem: "Explain how a minimum price for a farm product affects the market for that product. [8]",
        points: ["A minimum price is a legal floor on the price; it only has an effect if set above the equilibrium.", "At the minimum price quantity supplied rises (extension of supply).", "Quantity demanded falls (contraction of demand).", "A surplus arises: quantity supplied exceeds quantity demanded.", "The surplus must be bought, stored or exported by the government or left unsold.", "Farmers who sell gain a higher price; their revenue may rise.", "Consumers pay a higher price and buy less.", "Cost to the government and taxpayers, and resources stay in over-supplied production."],
        modelAnswer: "A minimum price is a legal floor below which the price of a product cannot fall. It has an effect only if it is set above the equilibrium price. At the higher price, farmers have an incentive to supply more, so quantity supplied extends along the supply curve, while consumers buy less, so quantity demanded contracts. The result is a surplus, where quantity supplied exceeds quantity demanded. This surplus must be bought and stored by the government, exported or left unsold. Farmers who sell their produce receive a higher price, and if the government buys the surplus their revenue rises. Consumers pay more and buy less. The government must spend money buying and storing the surplus, which is a cost to taxpayers, and the minimum price keeps resources in the production of a crop for which there is excess supply." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { min: 200, max: 500 }, levels: L12,
        stem: "Assess whether buffer stock schemes are the best way to stabilise farm incomes. [12]",
        points: ["Buffer stock: buys at a floor price, sells at a ceiling price.", "Reduces fluctuations in price, helping farmers plan and invest.", "Stabilises consumer prices in poor harvests.", "Scheme can be self-financing if good and bad years balance.", "Storage costs and deterioration.", "The agency needs to know the long-run equilibrium price; floor set too high creates growing stocks.", "Finance and the risk of running out of stock.", "Cannot handle long-run trends in price.", "Alternatives: crop insurance, improving storage and transport, diversification, direct income support.", "Time period: effects in the short and long run.", "Perishable crops cannot be stored easily.", "A justified judgement."],
        modelAnswer: "A buffer stock scheme buys the crop when the price falls to a floor and sells from stock when the price reaches a ceiling. It reduces fluctuations in price, which helps farmers plan and invest, and it stabilises consumer prices in poor harvests. If good and bad years balance, the scheme can almost finance itself. However, there are important problems. The agency must know the long-run equilibrium price: if the floor is set above it, stocks accumulate and costs rise without limit. Storage is costly, crops deteriorate and some, such as vegetables, cannot be stored at all. The agency needs finance to buy in good years and may run out of stock in a run of bad years. A scheme cannot cope with lasting changes in demand or supply. Alternatives exist: crop insurance, better storage and transport, diversification into other crops and direct income support for poor farmers. These may stabilise incomes at lower cost, though they also have problems, such as the cost of insurance. Overall, buffer stocks are a useful tool for storable crops with temporary price swings, but they are not the best way in every case, and a mix of measures is likely to be more effective." }),
    ]);
    b.struct({ d: 4, examStyle: true, paper: "Paper 2", skill: EXAM.CAM_P2_ESSAY.skill, secs: EXAM.CAM_P2_ESSAY.secs, applies: EXAM.CAM_P2_ESSAY.applies,
      concepts: ["aecon.intervention.price-controls-buffer-stocks"], hints: ["Explain the mechanism in (a); assess advantages, problems and alternatives in (b)."],
      stem: "Answer both parts of this question on minimum prices and buffer stocks in agriculture.", parts,
      explanation: "(a) Effects of a minimum price. (b) Buffer stocks against their problems and alternatives." });
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Paper 2 essay 2 (micro): elasticities and harvests.
  {
    const parts = checkExam(EXAM.CAM_P2_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 350 },
        stem: "Explain how the price elasticity of demand and the price elasticity of supply affect the change in the price of a crop after a poor harvest. [8]",
        points: ["A poor harvest shifts supply to the left.", "At the old price there is excess demand, so price rises.", "Demand for staple foods is inelastic: quantity demanded falls little as price rises.", "Therefore the price must rise by a large amount to restore equilibrium.", "The more inelastic demand, the greater the rise in price.", "Supply is inelastic in the short run: farmers cannot quickly respond to the higher price.", "Elastic supply would lead to a smaller rise in price and a larger rise in quantity next season.", "In the long run both elasticities are larger, so the price effect is reduced."],
        modelAnswer: "A poor harvest shifts the supply curve to the left, creating excess demand at the old price, so the price rises. The size of the rise depends on the elasticities. Demand for staple crops is inelastic, so the quantity demanded falls only a little as the price rises, which means the price must rise by a large amount to restore equilibrium; the more inelastic demand is, the larger the rise. Supply is also inelastic in the short run, since farmers cannot quickly increase output in response to the higher price, so the quantity supplied extends only slightly. If supply were more elastic, the price would rise by less and the quantity traded would be larger. In the long run both demand and supply become more elastic, so the price effect of a poor harvest is reduced." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { min: 200, max: 500 }, levels: L12,
        stem: "Assess whether farmers benefit from a very good harvest. [12]",
        points: ["A good harvest shifts supply to the right and lowers the price.", "Demand for food is inelastic.", "Quantity sold rises by a smaller percentage than price falls, so revenue falls.", "Individual farmers may gain if their harvest is better than average while the price falls less.", "Lower costs per unit may raise profit for efficient farmers.", "Farmers who store crops can sell later at better prices.", "Consumers gain from lower prices and food security.", "Government support (minimum prices, buffer stocks) may protect income.", "Export markets can increase demand and make it less inelastic.", "Time: stocks and lower prices next season.", "Farmers' costs and debts matter.", "A justified judgement."],
        modelAnswer: "A very good harvest shifts supply to the right and lowers the price. Because demand for food is inelastic, quantity demanded rises by a smaller percentage than the price falls, so total revenue for farmers as a group usually falls, which suggests they do not benefit. However, some farmers may gain: an individual farmer whose own harvest is better than the average gains, if the price falls by less than their output rises, and efficient farmers with lower costs per unit may earn more profit. Farmers who can store the crop can sell later when the price recovers, and if there is an export market the extra output can be sold abroad, which makes demand less inelastic. Government support such as a minimum price or a buffer stock can protect incomes. Consumers benefit from lower prices. Overall, farmers as a group usually do not benefit from a very good harvest if demand is inelastic and there is no storage or export outlet, but some individual farmers can gain, and support policies can alter the outcome." }),
    ]);
    b.struct({ d: 4, examStyle: true, paper: "Paper 2", skill: EXAM.CAM_P2_ESSAY.skill, secs: EXAM.CAM_P2_ESSAY.secs, applies: EXAM.CAM_P2_ESSAY.applies,
      concepts: ["aecon.market.ped", "aecon.market.pes", "aecon.market.ped-revenue", "aecon.market.equilibrium"], hints: ["Use shifts of supply and the elasticities in both parts."],
      stem: "Answer both parts of this question on elasticities and agricultural markets.", parts,
      explanation: "(a) Elasticities and the price change after a poor harvest. (b) Good harvest and farm revenue." });
  }
});
