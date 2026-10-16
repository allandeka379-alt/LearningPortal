// W3a: marketing.elasticity (W3a owns the elasticity conventions: % changes on the ORIGINAL value, sign kept)
import { concept, P, ZIM, table, r2, rd, elasticity, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.marketing.elasticity", { file: "marketing/elasticity", keyPrefix: "marketing.elasticity" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does **price elasticity of demand** measure?",
    ok: ["How far quantity demanded responds to a price change", "Correct: it compares the percentage changes in quantity and price."],
    bad: [["How far quantity supplied responds to a change in cost", "That is elasticity of supply, not required here."], ["How far profit changes when the price is changed", "Elasticity measures quantity, not profit."], ["The difference between price and the cost of production", "That is the unit profit, not elasticity."]],
    explanation: "PED = % change in quantity demanded ÷ % change in price.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A product has a price elasticity of demand of −0.4. Which description is correct?",
    ok: ["Demand is inelastic, so a price rise would increase revenue", "Correct: quantity falls by less than the price rises."],
    bad: [["Demand is elastic, so a price rise would increase revenue", "Elastic demand (above 1 in size) makes revenue fall when price rises."], ["Demand is elastic, so a price rise would decrease revenue", "A value of 0.4 in size is below 1, so demand is inelastic."], ["Demand is inelastic, so a price rise would decrease revenue", "With inelastic demand a price rise increases revenue."]],
    hints: ["Compare the size of the value with 1."],
    explanation: "A value of −0.4 has a size below 1: inelastic. Quantity falls proportionately less than price rises, so revenue rises.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A good has a **negative income elasticity of demand**. What type of good is it?",
    ok: ["An inferior good, bought less as incomes rise", "Correct: demand falls when incomes rise."],
    bad: [["A luxury good, bought more as incomes rise", "A luxury has YED greater than 1."], ["A necessity, bought in the same amounts at all incomes", "A necessity has YED between 0 and 1."], ["A complement, used together with another good", "Complements are shown by cross elasticity, not YED."]],
    explanation: "Negative YED means that demand falls when incomes rise: an inferior good.",
  });
  const pedA = elasticity.price(10, 10.5, 2000, 1840);
  chk(pedA, -1.6, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional bakery has a price elasticity of demand of −1.6 for its cakes. It raises the price by 5%. What is the expected change in the quantity demanded?",
    ok: ["A fall of 8%", "Correct: −1.6 × 5% = −8%."],
    bad: [["A fall of 3.1%", "This divides 5 by 1.6 instead of multiplying."], ["A rise of 8%", "A price rise lowers quantity demanded."], ["A fall of 1.6%", "This uses the elasticity as the percentage."]],
    hints: ["% change in quantity = PED × % change in price."],
    explanation: "% change in quantity = PED × % change in price = −1.6 × 5 = −8%.",
  });
  const rev0 = 10 * 100, rev1 = 12 * 95;
  const pedB = elasticity.price(10, 12, 100, 95);
  chk(pedB, -0.25, 1e-9);
  chk(rev1 - rev0, 140, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional salon in Harare raises the price of a treatment from US\\$10 to US\\$12. Weekly bookings fall from 100 to 95. What happens to weekly revenue?",
    ok: ["It rises by US\\$140, because demand is inelastic", "Correct: revenue goes from US\\$1,000 to US\\$1,140."],
    bad: [["It falls by US\\$140, because demand is elastic", "PED is −0.25, so demand is inelastic."], ["It rises by US\\$200, equal to the price rise", "This ignores the fall in bookings."], ["It is unchanged, because demand is unitary", "PED is −0.25, not −1."]],
    hints: ["Find revenue before and after: price × bookings."],
    explanation: "Revenue before = 10 × 100 = US\\$1,000; after = 12 × 95 = US\\$1,140, a rise of US\\$140. PED = −5% ÷ +20% = −0.25: inelastic.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional brand of cooking oil has many close substitutes and takes a small share of a household's spending. What is the MOST likely price elasticity of demand?",
    ok: ["Elastic, as customers can switch brands", "Correct: many close substitutes make demand elastic."],
    bad: [["Inelastic, because it is only a small part of spending", "A small share of spending favours inelastic, but many substitutes outweigh it."], ["Perfectly inelastic, because oil is always needed", "Customers can still switch to other brands."], ["Zero, because oil has no substitutes at all", "The question says there are many substitutes."]],
    hints: ["Which determinant is strongest here?"],
    explanation: "Close substitutes are the strongest influence on the elasticity of a brand.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A manager says: \"Our PED is −2.0, so cutting our price by 10% will raise our profit.\" Which statement is the BEST evaluation?",
    ok: ["Revenue should rise, but profit depends on any extra costs", "Correct: elasticity concerns revenue, not costs."],
    bad: [["Profit must rise, because revenue always equals the profit made", "Revenue is not profit."], ["Revenue must fall, because a lower price always cuts the income", "With elastic demand a price cut raises revenue."], ["Nothing can be said, because PED is only ever an estimate", "PED is an estimate, but it still indicates the direction."]],
    hints: ["Does PED include costs?"],
    explanation: "With elastic demand a price cut raises revenue, but the cost of the extra output may exceed the extra revenue.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional retailer estimated its PED from last year's sales and uses it to plan a big price rise. What is the main weakness of this approach?",
    ok: ["Customers and rivals may have changed their behaviour since", "Correct: elasticity from past data may no longer hold."],
    bad: [["Elasticity can only be calculated for price rises, not for falls", "It can be calculated for both."], ["Past sales data cannot be used for any business decision", "Past data is useful but not perfect."], ["A price rise can never affect the quantity of sales", "Price rises normally affect quantity."]],
    hints: ["Think about what is held constant."],
    explanation: "Elasticity assumes that other factors stay constant; past values may not predict future behaviour.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If demand is elastic, a fall in price will increase total revenue.",
    answer: true,
    explanation: "True. Quantity rises by a larger percentage than the price falls, so price × quantity rises.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each elasticity value to its meaning.",
    pairs: [["PED of −2.5", "Elastic demand"], ["PED of −0.3", "Inelastic demand"], ["YED of +2.0", "A luxury good"], ["YED of −0.8", "An inferior good"]],
    explanation: "PED is judged by its size against 1; YED by its sign and size.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "When demand is {{blank:a}}, a rise in price {{blank:b}} total revenue.",
    blanks: [
      { id: "a", accepted: ["inelastic"], choices: ["elastic", "inelastic", "unitary"] },
      { id: "b", accepted: ["raises"], choices: ["raises", "lowers", "does not change"] },
    ],
    explanation: "With inelastic demand, quantity falls by a smaller percentage than the price rises, so revenue rises.",
  });

  const ped1 = elasticity.price(8, 9, 2400, 2220);
  chk(ped1, -0.6, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "index", value: ped1, calculator: true, daily: true, wrong: [-1.667, 0.6],
    stem: "A fictional mill in Gweru raises the price of a bag of flour from US\\$8 to US\\$9. Monthly sales fall from 2,400 to 2,220 bags. Calculate the price elasticity of demand to two decimal places, including the sign.",
    hints: ["Find the percentage change in quantity and in price, both on the original value."],
    explanation: "% change in price = 1 ÷ 8 × 100 = +12.5%. % change in quantity = −180 ÷ 2,400 × 100 = −7.5%. PED = −7.5 ÷ 12.5 = −0.60 (inelastic). Dividing price by quantity (−1.67) is the inverse.",
  });
  const yed1 = elasticity.income(400, 440, 900, 765);
  chk(yed1, -1.5, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "index", value: yed1, calculator: true, wrong: [1.5, -0.67],
    stem: "Average monthly household income in a fictional town rises from US\\$400 to US\\$440. Monthly sales of a cheap brand of tea fall from 900 to 765 packets. Calculate the income elasticity of demand to two decimal places, including the sign.",
    hints: ["Income rises by 10%; calculate the change in quantity."],
    explanation: "% change in income = +10%. % change in quantity = −135 ÷ 900 × 100 = −15%. YED = −15 ÷ 10 = −1.50: an inferior good.",
  });
  const cross1 = elasticity.cross(5, 5.5, 1000, 1060);
  chk(cross1, 0.6, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "index", value: cross1, calculator: true, wrong: [1.667, -0.6],
    stem: "The price of Brand B tea rises from US\\$5.00 to US\\$5.50. Sales of Brand A tea rise from 1,000 to 1,060 packets. Calculate the cross elasticity of demand of Brand A with respect to the price of Brand B, to two decimal places.",
    hints: ["Use the quantity change of A and the price change of B."],
    explanation: "% change in the price of B = +10%. % change in the quantity of A = +6%. Cross elasticity = 6 ÷ 10 = +0.60. The positive sign shows that the brands are substitutes.",
    applies: ZIM,
  });
  const pe = elasticity.promotional(3000, 3600, 2000, 2300);
  chk(pe, 0.75, 1e-9);
  const extraContribution = (2300 - 2000) * (4 - 2.5);
  chk(extraContribution, 450, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: 3600 - 3000 - extraContribution, calculator: true, wrong: [3600 - 3000, extraContribution],
    stem: "A fictional soft-drink seller in Harare raises monthly promotional spending from US\\$3,000 to US\\$3,600. Sales rise from 2,000 to 2,300 bottles a month. Each bottle sells for US\\$4.00 and has a variable cost of US\\$2.50. By how much (in US dollars) does the extra promotional spending exceed the extra contribution?",
    hints: ["Extra contribution = extra bottles × (price − variable cost)."],
    explanation: "Extra bottles = 300. Contribution per bottle = 4.00 − 2.50 = 1.50. Extra contribution = 300 × 1.50 = US\\$450. Extra spending = 3,600 − 3,000 = US\\$600. The spending exceeds the extra contribution by US\\$150. (Promotional elasticity = 15% ÷ 20% = 0.75.) US\\$600 ignores the contribution earned.",
    workedSolution: "1. Extra bottles = 2,300 − 2,000 = 300.\n2. Extra contribution = 300 × (4.00 − 2.50) = US\\$450.\n3. Extra spending = 3,600 − 3,000 = US\\$600.\n4. Spending exceeds contribution by 600 − 450 = US\\$150.",
  });

  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "State the term for demand where the quantity demanded changes by a smaller percentage than the price.",
    accepted: ["inelastic", "price inelastic", "inelastic demand", "price inelastic demand"],
    explanation: "Inelastic demand: PED has a size less than 1.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** factor that makes the demand for a product more price elastic.",
    points: ["A factor, such as the availability of close substitutes", "Customers can easily switch if the price rises", "So quantity demanded falls by a larger percentage than the price rises"],
    modelAnswer: "If there are many close substitutes, customers can easily switch to another product when the price rises. Quantity demanded then falls by a larger percentage than the price rises, so demand is elastic.",
    hints: ["Choose one determinant and say what customers do."],
    explanation: "A determinant developed to its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bus company in Gweru finds that the price elasticity of demand for its tickets is −0.3. Explain **two** consequences of this for its pricing.",
    points: ["Demand is inelastic", "A fare rise lowers passengers by a smaller percentage than the rise", "So revenue increases", "However, passengers may switch to other transport in the long run or the company may lose goodwill"],
    modelAnswer: "Demand is inelastic, so a fare rise lowers the number of passengers by a smaller percentage than the rise. Revenue therefore increases. However, passengers might switch to other transport in the long run, so the company should not raise fares too far.",
    hints: ["Think of revenue now and the longer term."],
    explanation: "Revenue effect and a long-run limit.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a fictional clothing retailer could use knowledge that the YED for its clothes is +1.8.",
    points: ["YED is greater than 1, so clothes are a luxury", "Sales rise faster than incomes in a boom", "Sales fall faster than incomes in a recession", "The retailer can increase stock and staff in a boom and cut costs in a recession"],
    modelAnswer: "A YED of +1.8 means that sales rise faster than incomes in a boom and fall faster in a recession. The retailer can increase stock and staff when incomes are rising and cut costs and orders when incomes are falling.",
    hints: ["Think of the economic cycle."],
    explanation: "YED above 1 shows sensitivity to the economy.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional appliance retailer wants to use last year's elasticity figures to decide a 10% price cut on fridges. Evaluate how useful the figures are.",
    points: ["They indicate the direction and size of the quantity response", "They help to forecast the effect on revenue", "They are based on past data, so may be out of date", "Other factors, such as rivals' prices and incomes, may have changed", "They do not show the effect on costs and profit", "Judgement with reason, e.g. useful as a guide if supported by a trial or current data"],
    modelAnswer: "The figures show the likely direction and size of the response in sales and so help to forecast the effect on revenue. However, they come from last year, and rivals' prices, incomes or tastes may have changed, and they say nothing about costs or profit. They are a useful guide if checked against current data or a trial in one shop, but should not be the only basis for the decision.",
    hints: ["Consider what elasticity does and does not tell the retailer."],
    explanation: "Usefulness weighed against the limits.",
  });

  const p0 = 1.0, p1 = 1.1, q0 = 8000, q1 = 7760;
  const pedS = elasticity.price(p0, p1, q0, q1);
  chk(pedS, -0.3, 1e-9);
  const revS = p1 * q1 - p0 * q0;
  chk(revS, 536, 1e-6);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional minibus operator in Bulawayo raises its fare from US\\$1.00 to US\\$1.10. Daily passengers fall from 8,000 to 7,760.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "index", value: pedS, stem: "Calculate the price elasticity of demand to one decimal place, including the sign.", dp: 1, wrong: [-3.33, 0.3], explanation: "Price +10%; passengers −240 ÷ 8,000 × 100 = −3%. PED = −3 ÷ 10 = −0.3." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: revS, stem: "Calculate the change in daily revenue.", wrong: [1.1 * 7760, p1 * q1 - p0 * q1], explanation: "Revenue before = 1.00 × 8,000 = US\\$8,000. After = 1.10 × 7,760 = US\\$8,536. Increase = US\\$536." }),
      P.manual({ label: "(c)", marks: 5, stem: "Assess whether the operator should raise fares again.", points: ["Demand is inelastic (−0.3), so a rise increases revenue", "A second rise would probably raise revenue again", "Elasticity may change at higher fares or as passengers find alternatives", "Passengers on low incomes may walk or use rivals in the long run", "Judgement with reason, e.g. a smaller rise and a review of passenger numbers"], modelAnswer: "Demand is inelastic, so a second rise would probably raise revenue again. However, elasticity can increase at higher fares as passengers find alternatives such as walking or rival minibuses, especially in the long run. The operator should make a smaller rise and monitor passenger numbers before going further.", explanation: "Inelastic demand supports a rise, but elasticity can change." }),
    ],
    hints: ["Work out the percentage change in fare and in passengers."],
    explanation: "PED −0.3 (inelastic); revenue rises by US\\$536.",
  });
  const yS = elasticity.income(600, 630, 1000, 1075);
  chk(yS, 1.5, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A fictional tiling firm in Masvingo finds that when average household income rose from US\\$600 to US\\$630 a month, its monthly sales rose from 1,000 to 1,075 packs of tiles.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "index", value: yS, stem: "Calculate the income elasticity of demand to one decimal place.", dp: 1, wrong: [0.67, 7.5], explanation: "Income +5%; sales +7.5%. YED = 7.5 ÷ 5 = +1.5." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse **two** implications of this result for the firm's planning.", points: ["YED is above 1 so tiles are a luxury", "Sales will grow faster than incomes in a boom", "Sales will fall faster than incomes in a recession", "The firm should hold more stock in a boom and cut costs or borrowing before a downturn"], modelAnswer: "A YED of +1.5 means that tiles are a luxury: sales rise faster than incomes in a boom and fall faster in a recession. The firm should hold more stock in a boom and keep costs and borrowing under control before a downturn.", explanation: "A luxury good is sensitive to the economy." }),
    ],
    hints: ["Find the percentage change in income and in sales."],
    explanation: "YED +1.5: sales are sensitive to the economic cycle.",
  });

  b.card("FORMULA", "Price elasticity of demand", "PED = % change in quantity demanded ÷ % change in price (changes measured on the original value).");
  b.card("FORMULA", "Income elasticity of demand", "YED = % change in quantity demanded ÷ % change in income.");
  b.card("FORMULA", "Promotional elasticity", "% change in quantity demanded ÷ % change in promotional spending.");
  b.card("FORMULA", "Cross elasticity of demand", "% change in quantity of A ÷ % change in price of B. Positive: substitutes; negative: complements.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Elastic and inelastic demand", "Elastic: size of PED above 1; inelastic: below 1; unitary: equal to 1.");
  b.card("CONCEPT", "Elasticity and revenue", "Elastic: price rise lowers revenue. Inelastic: price rise raises revenue.");
  b.card("FACT", "Determinants of PED", "Substitutes, necessity or luxury, share of income, time period, brand loyalty.");
  b.card("CONCEPT", "Meaning of YED", "Positive: normal; above 1: luxury; between 0 and 1: necessity; negative: inferior.");
  b.card("FACT", "Limitations of elasticity", "Past data, other factors assumed constant, inaccurate data, not constant along the curve, ignores costs.");
});
