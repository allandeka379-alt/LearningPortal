// W1b: price elasticity of supply (both boards, AS).
import { concept, P, chk, fmt, pctChange, elasticity, dpStr, linearMarket, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.pes", { file: "market/pes", keyPrefix: "market.pes" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Price elasticity of supply is calculated as",
    explanation: "PES is the percentage change in quantity supplied divided by the percentage change in price." },
    ["% change in quantity supplied ÷ % change in price", "Correct: this is the definition."],
    [["% change in price ÷ % change in quantity supplied", "This inverts the formula."], ["% change in quantity demanded ÷ % change in price", "This is PED."], ["change in quantity supplied ÷ change in price", "This is the slope of the supply curve."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A price rise of 20% leads to a rise in quantity supplied of 10%. Supply is",
    explanation: "PES = 10 ÷ 20 = 0.5, which is less than 1: supply is inelastic." },
    ["inelastic, with PES of 0.5", "Correct: quantity responds by a smaller percentage."],
    [["elastic, with PES of 2", "This inverts the ratio."], ["unitary elastic", "The percentage changes are different."], ["perfectly inelastic", "Quantity did respond, so PES is not zero."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following makes supply of a good more elastic?",
    explanation: "Spare capacity lets a firm raise output quickly when price rises." },
    ["Spare capacity in the industry", "Correct: output can be increased at once."],
    [["Goods that cannot be stored", "These make supply less elastic in the short run."], ["Highly specialised machinery", "Specialised, immobile factors make supply less elastic."], ["A short time period", "Supply is less elastic in a short period."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A vertical supply curve shows that supply is",
    explanation: "The quantity supplied is fixed whatever the price: PES is zero, perfectly inelastic." },
    ["perfectly inelastic", "Correct: PES = 0."],
    [["perfectly elastic", "That is a horizontal curve."], ["unitary elastic", "A straight line from the origin has PES of 1."], ["elastic", "Quantity does not respond at all."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["% change in quantity = PES × % change in price."],
    stem: "PES for milk is 0.5. The price rises by 12%. The quantity supplied will rise by",
    explanation: "0.5 × 12 = 6%." },
    ["6%", "Correct: 0.5 × 12."], [["24%", "This divides 12 by 0.5."], ["12%", "This ignores the elasticity."], ["0.5%", "This multiplies 0.5 by 1."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Consider growing time and storage."],
    stem: "Why is the supply of fresh tomatoes inelastic in the short run?",
    explanation: "Tomatoes take weeks to grow and cannot be stored for long, so the quantity supplied cannot respond quickly to a price rise." },
    ["They take time to grow and cannot be stored for long", "Correct: output cannot rise quickly."],
    [["Tomatoes are a necessity for most households", "Necessity concerns demand, not supply."], ["Farmers are unwilling to earn more money from sales", "A higher price gives an incentive to supply more; the limit is production time."], ["Tomatoes have many close substitutes", "Substitutes affect demand elasticity."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Which resources can be changed over time?"],
    stem: "Supply is usually more elastic in the long run than in the short run because",
    explanation: "Over time firms can build capacity, train workers and new firms can enter." },
    ["all factors can be changed and new firms can enter", "Correct: adjustment takes time."],
    [["producers become less willing to supply over time", "A longer period gives more scope to respond."], ["demand becomes more elastic as time passes", "This concerns demand, not supply."], ["costs of production always fall", "Elasticity does not depend on falling costs."]]);

  mc({ d: 4, skill: "ANALYSIS", hints: ["What happens to price when supply cannot respond?"],
    stem: "Demand for a farm product rises. Compared with a market in which supply is elastic, when supply is inelastic the price will",
    explanation: "With inelastic supply, quantity can rise only a little, so the price must rise more to ration the good." },
    ["rise by more and quantity by less", "Correct: the price does most of the adjusting."],
    [["rise by less and quantity by more", "That happens when supply is elastic."], ["fall because supply is inelastic", "A rise in demand raises price."], ["rise by the same amount", "The size of the price rise depends on elasticity."]]);

  {
    const e = elasticity.pes({ p1: 4.0, p2: 4.8, q1: 500, q2: 530 });
    chk(e, 0.3, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, kind: "elasticity", value: e, dp: 2,
      stem: "The price of eggs at a fictional market rises from US\\$4.00 to US\\$4.80 per tray. The quantity supplied rises from 500 to 530 trays a week. Calculate PES.",
      wrong: [3.33, 0.06, 0.2],
      explanation: `% change in price = +20%; % change in quantity supplied = +6%; PES = 6 ÷ 20 = ${dpStr(e, 2)}. Inverting the ratio gives 3.33.` });
  }
  {
    const e = elasticity.pes({ p1: 10, p2: 11, q1: 1000, q2: 1300 });
    chk(e, 3, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: e, dp: 2, hints: ["Use the original values as the base."],
      stem: "The price of a product rises from US\\$10 to US\\$11. A factory with spare capacity raises output from 1,000 to 1,300 units. Calculate PES.",
      wrong: [0.33, 30, 2.7],
      explanation: `% change in price = +10%; % change in quantity = +30%; PES = 30 ÷ 10 = ${dpStr(e, 2)}. Supply is elastic.` });
  }
  {
    const q = 5000 * (1 + (0.5 * 12) / 100);
    chk(q, 5300, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: q, unit: "litres", hints: ["First find the % change in quantity supplied."],
      stem: "PES for milk at a fictional dairy is 0.5. It supplies 5,000 litres a day. Calculate the quantity supplied after a 12% rise in price, other things equal.",
      wrong: [5600, 5030, 4700],
      explanation: `1. % change in quantity = 0.5 × 12 = 6%.\n2. New quantity = 5,000 × 1.06 = ${fmt(q)} litres.\nAdding 12% gives 5,600; adding 0.6% gives 5,030.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A straight-line supply curve through the origin has a PES of exactly 1 at every point.", answer: true,
    explanation: "True. Quantity changes in the same proportion as price along such a line." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A rise in the price of a good shifts the supply curve to the right.", answer: false,
    explanation: "False. A change in the good's own price causes a movement along the supply curve; PES measures that movement." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each period with the description of supply.",
    pairs: [["Momentary period", "Quantity fixed; only stocks can be sold"], ["Short run", "Variable factors can change but capital is fixed"], ["Long run", "All factors can change and new firms can enter"]],
    extraRight: ["Technology and tastes change"],
    explanation: "Supply becomes more elastic as more factors can be changed." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of supply curve that is horizontal.",
    accepted: ["perfectly elastic", "perfectly elastic supply", "infinitely elastic"], wrong: ["inelastic"],
    explanation: "A horizontal supply curve shows firms will supply any quantity at one price: perfectly elastic." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define price elasticity of supply.",
    points: ["A measure of the responsiveness of quantity supplied to a change in price.", "% change in quantity supplied divided by % change in price."],
    modelAnswer: "Price elasticity of supply measures how responsive the quantity supplied of a good is to a change in its own price. It is the percentage change in quantity supplied divided by the percentage change in price.",
    explanation: "Responsiveness and formula." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name the factor and say whether it makes supply more or less elastic."],
    stem: "Explain **two** factors that determine the price elasticity of supply of a good.",
    points: ["Factor 1 identified (for example spare capacity or stocks).", "Factor 1 explained: spare capacity lets output rise quickly, so supply is more elastic.", "Factor 2 identified (for example time period, factor mobility or perishability).", "Factor 2 explained: for example a longer time lets firms adjust all factors, so supply is more elastic."],
    modelAnswer: "Spare capacity: if firms have idle machines or workers, they can raise output quickly when price rises, so supply is elastic. Time period: the longer the time allowed, the more factors firms can change and the more new firms can enter, so supply becomes more elastic.",
    explanation: "Two determinants, each explained." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Start with the supply response."],
    stem: "Analyse why the price of fresh vegetables often changes sharply when demand changes.",
    points: ["Supply of fresh vegetables is inelastic in the short run.", "Crops take time to grow and perishables cannot be stored for long.", "A change in demand therefore cannot be met by a large change in quantity.", "Price has to change by a large amount to restore equilibrium."],
    modelAnswer: "Fresh vegetables take time to grow and cannot be stored for long, so supply is inelastic in the short run. When demand rises, quantity supplied cannot increase much, so the price has to rise by a large amount to ration the available supply; similarly a fall in demand causes a large fall in price.",
    explanation: "Inelastic supply leads to larger price changes." });

  {
    const sr = elasticity.pes({ p1: 4.0, p2: 5.0, q1: 1000, q2: 1100 });
    const lr = elasticity.pes({ p1: 4.0, p2: 5.0, q1: 1000, q2: 1500 });
    chk(sr, 0.4, 1e-9); chk(lr, 2, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Price rises by 25% in each case."],
      stem: "The price paid to growers of a fictional crop rises from US\\$4.00 to US\\$5.00 per kg. Over the next three months the quantity supplied rises from 1,000 kg to 1,100 kg a week. Three years later, after new growers have entered and existing farms have expanded, the quantity supplied is 1,500 kg a week at the same price.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: sr, dp: 2, stem: "Calculate PES over the first three months.", wrong: [2.5, 0.1], explanation: "Price +25%; quantity +10%; PES = 10 ÷ 25 = 0.40." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: lr, dp: 2, stem: "Calculate PES after three years.", wrong: [0.5, 50], explanation: "Price +25%; quantity +50%; PES = 50 ÷ 25 = 2.00." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which statement is correct?", options: [["Supply is more elastic in the long run", "Correct: PES rose from 0.40 to 2.00."], ["Supply is more elastic in the short run", "The short-run PES is smaller."], ["Supply is perfectly elastic in the long run", "PES of 2 is elastic, not infinite."], ["Supply is unaffected by time", "The data shows it changes."]], answer: "A", explanation: "0.40 < 2.00." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **two** reasons why supply is more elastic after three years.",
          points: ["Farmers can plant more land and buy equipment (all factors can change).", "New growers can enter the industry.", "Time to learn new methods or build storage and transport."],
          modelAnswer: "After three years existing farmers can plant more land, hire more workers and buy equipment because all factors can be varied. New growers can also enter the industry, adding to supply, which could not happen in three months." }),
      ],
      explanation: "Short-run PES 0.40 (inelastic); long-run PES 2.00 (elastic)." });
  }
  {
    const m0 = linearMarket({ a: 30, b: 0.04, c: -10, d: 0.04 });
    const m1 = linearMarket({ a: 38, b: 0.04, c: -10, d: 0.04 });
    const e0 = linearMarket({ a: 30, b: 0.04, c: 5, d: 0.01 });
    const e1 = linearMarket({ a: 38, b: 0.04, c: 5, d: 0.01 });
    chk(m0.price, 10, 1e-9); chk(m0.quantity, 500, 1e-9); chk(m1.price, 14, 1e-9); chk(m1.quantity, 600, 1e-9);
    chk(e0.price, 10, 1e-9); chk(e0.quantity, 500, 1e-9); chk(e1.price, 11.6, 1e-9); chk(e1.quantity, 660, 1e-9);
    const pes1 = elasticity.pes({ p1: 10, p2: 14, q1: 500, q2: 600 });
    const pes2 = elasticity.pes({ p1: 10, p2: 11.6, q1: 500, q2: 660 });
    chk(pes1, 0.5, 1e-9); chk(pes2, 2, 1e-9);
    const md = table(["", "Market X (supply inelastic)", "Market Y (supply elastic)"], [["Equilibrium before the rise in demand", "US\\$10, 500 units", "US\\$10, 500 units"], ["Equilibrium after the rise in demand", "US\\$14, 600 units", "US\\$11.60, 660 units"]], { align: ["l", "l", "l"] });
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Compare the price and quantity changes in the two markets."],
      stem: `Two fictional markets, X and Y, have the same demand. Demand rises by the same amount in both markets. The table shows the equilibrium before and after (illustrative data, price per unit, quantity per week).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: pes1, dp: 2, stem: "Calculate PES in Market X between the two equilibria.", wrong: [2, 0.4], explanation: "Price +40%; quantity +20%; PES = 20 ÷ 40 = 0.50." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: pes2, dp: 2, stem: "Calculate PES in Market Y between the two equilibria.", wrong: [0.5, 0.48], explanation: "Price +16%; quantity +32%; PES = 32 ÷ 16 = 2.00." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: 40, dp: 0, unit: "%", stem: "Calculate the percentage rise in price in Market X.", wrong: [28.6, 4], explanation: "(14 − 10) ÷ 10 × 100 = 40%." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the price rises by more in Market X than in Market Y.",
          points: ["Supply in Market X is inelastic, so quantity cannot expand much.", "Price has to rise more to ration the limited quantity."],
          modelAnswer: "Supply in Market X is inelastic, so output can expand by only a small amount when demand rises, and price must rise by a large amount to restore equilibrium; in Market Y producers expand output a lot, so the price rises less." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest **one** way the government could make supply in Market X more elastic.",
          points: ["Improve storage, transport or credit so producers can respond (any reasonable measure).", "Explain how it raises the ability to increase output quickly."],
          modelAnswer: "The government could improve storage and transport facilities or give training and credit, so producers can expand output more quickly when the price rises, making supply more elastic." }),
      ],
      explanation: "Market X: PES 0.50, price +40%. Market Y: PES 2.00, price +16%." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare agriculture with manufacturing."],
    stem: "Assess why the prices of agricultural products tend to fluctuate more than the prices of manufactured goods.",
    points: ["Agricultural supply is inelastic in the short run: growing time, weather, perishability.", "Manufacturing can use spare capacity and stocks to respond to price.", "Demand for food is inelastic, so shifts in supply cause large price changes.", "Harvests vary with weather and pests, so supply shifts often.", "Storage, imports and buffer stocks can reduce fluctuations.", "Some manufactured goods also have volatile prices (commodity-based inputs).", "Long-run supply is more elastic.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Agricultural supply is inelastic in the short run because crops take time to grow and perishable produce cannot be stored, and harvests vary with the weather, so supply shifts frequently. Demand for food is also inelastic, so any shift in supply produces a large change in price. Manufacturers can use spare capacity and stocks to adjust output quickly, which stabilises prices. However, storage, imports and buffer stock schemes can reduce agricultural fluctuations, and some manufactured goods depend on volatile raw material prices. In the long run supply becomes more elastic. Overall, the combination of inelastic supply, inelastic demand and weather-driven shifts explains the greater volatility of farm prices.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Contrast supply and demand elasticities in the two sectors and weigh offsetting factors." });

  b.card("DEFINITION", "Define **price elasticity of supply (PES)**.", "A measure of the responsiveness of quantity supplied to a change in the good's own price: % change in quantity supplied ÷ % change in price.");
  b.card("FORMULA", "State the formula for **PES**.", "PES = % change in quantity supplied ÷ % change in price (normally positive).");
  b.card("FACT", "What does a PES of **0.4** tell you?", "Supply is inelastic: a 1% rise in price raises quantity supplied by only 0.4%.");
  b.card("FACT", "What does a PES of **3** tell you?", "Supply is elastic: a 1% rise in price raises quantity supplied by 3%.");
  b.card("CONCEPT", "Name **four** determinants of PES.", "Spare capacity, stocks, time period, mobility of factors (also ease of entry and perishability).");
  b.card("CONCEPT", "Which supply curves have PES = 1 everywhere?", "Straight lines through the origin.");
  b.card("CONCEPT", "Describe supply in the **momentary** period.", "Quantity is fixed; only existing stocks can be sold: perfectly or very inelastic.");
  b.card("CONCEPT", "Why is agricultural supply inelastic in the short run?", "Crops take a season to grow, weather affects output and perishable produce cannot be stored for long.");
  b.card("CONCEPT", "What effect does inelastic supply have on price when demand changes?", "Price changes by more, because quantity cannot adjust much.");
});
