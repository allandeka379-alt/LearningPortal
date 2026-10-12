// W1b: price elasticity of demand (both boards, AS): calculation, interpretation, determinants.
import { concept, P, chk, fmt, pctChange, elasticity, signedPct, dpStr } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.ped", { file: "market/ped", keyPrefix: "market.ped" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Price elasticity of demand is calculated as",
    explanation: "PED is the percentage change in quantity demanded divided by the percentage change in price." },
    ["% change in quantity demanded ÷ % change in price", "Correct: this is the definition."],
    [["% change in price ÷ % change in quantity demanded", "This inverts the formula."],
     ["change in quantity demanded ÷ change in price", "This is the slope of the demand curve, not a percentage measure."],
     ["% change in quantity demanded ÷ % change in income", "This is income elasticity of demand."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A price rise of 10% causes quantity demanded to fall by 15%. Demand is",
    explanation: "The size of PED is 15 ÷ 10 = 1.5, which is greater than 1, so demand is elastic." },
    ["elastic, because the size of PED is above 1", "Correct: quantity fell by a larger percentage than price rose."],
    [["inelastic, because quantity demanded fell", "Quantity always falls when price rises; elasticity depends on how much."],
     ["unitary elastic, because the changes have the same sign", "The sizes of the changes must be equal for unitary elasticity."],
     ["perfectly inelastic, because price rose", "Perfectly inelastic means no change in quantity at all."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which statement about a vertical demand curve is correct?",
    explanation: "A vertical curve means quantity demanded does not change when price changes: PED is zero, perfectly inelastic." },
    ["Quantity demanded does not respond to price: PED = 0", "Correct: perfectly inelastic."],
    [["Quantity demanded responds without limit: PED is infinite", "That describes a horizontal demand curve."],
     ["Quantity demanded changes by the same percentage as price", "That is unitary elasticity."],
     ["Demand is elastic because the curve is steep", "Steepness is not elasticity, and a vertical line is perfectly inelastic."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which of the following goods is likely to have the most inelastic demand?",
    explanation: "A necessity with no close substitutes and a small share of the budget has inelastic demand: household salt." },
    ["Salt bought by households", "Correct: a necessity, cheap, with no close substitute."],
    [["One brand of soft drink sold in a town", "Many close substitutes make demand for one brand elastic."],
     ["A holiday at Victoria Falls", "A luxury with substitutes and a large share of income: elastic."],
     ["A new model of a smartphone", "A luxury with close substitutes: elastic."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["% change in quantity = PED × % change in price."],
    stem: "PED for cooking oil is −0.4. The price rises by 20%. What happens to the quantity demanded, other things equal?",
    explanation: "% change in quantity = −0.4 × 20 = −8%: the quantity demanded falls by 8%." },
    ["It falls by 8%", "Correct: −0.4 × 20 = −8."],
    [["It falls by 50%", "This divides 20 by 0.4 instead of multiplying."],
     ["It rises by 8%", "A price rise lowers quantity demanded when PED is negative."],
     ["It falls by 0.8%", "The arithmetic is out by a factor of ten."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which period allows consumers to find substitutes?"],
    stem: "Why is demand for petrol likely to be more elastic in the long run than in the short run?",
    explanation: "Over a longer time households can change where they live, share journeys or buy more fuel-efficient vehicles, so they can respond more to a price change." },
    ["Consumers have time to adjust and find alternatives", "Correct: adjustment takes time."],
    [["Petrol becomes a luxury good as time passes", "Petrol does not change category with time."],
     ["The price of petrol always falls in the long run", "Elasticity concerns the response to a price change, not the direction of price."],
     ["Producers supply more petrol in the long run", "This is about supply, not the responsiveness of demand."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare the percentage changes."],
    stem: "When the price of a good rises by 8%, quantity demanded falls by 12%. What is the value of PED, including the sign?",
    explanation: "PED = −12 ÷ 8 = −1.5." },
    ["−1.5", "Correct: −12 ÷ 8."], [["−0.67", "This divides price change by quantity change."], ["+1.5", "The sign must be negative: price and quantity move in opposite directions."], ["−4", "This subtracts instead of dividing."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about the closeness of substitutes."],
    stem: "A single bakery in a town raises the price of its loaves. Compared with demand for bread in general, demand for this bakery's bread is likely to be",
    explanation: "Other bakeries' bread is a close substitute for this bakery's bread, so customers switch when its price rises: more elastic than demand for bread as a whole." },
    ["more elastic, because close substitutes are available", "Correct: rivals' loaves are close substitutes."],
    [["less elastic, because bread is a necessity", "Bread in general is a necessity; one brand is not."],
     ["equally elastic, because the good is the same", "Elasticity depends on how the good is defined and on its substitutes."],
     ["perfectly inelastic, because there is only one bakery of this name", "Customers can still buy from elsewhere."]]);

  {
    const ped = elasticity.ped({ p1: 6.0, p2: 7.5, q1: 360, q2: 306 });
    chk(ped, -0.6, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, kind: "elasticity", value: ped, dp: 2,
      stem: "A fictional clothes stall in Chitungwiza raises the price of a shirt from US\\$6.00 to US\\$7.50. Weekly sales fall from 360 to 306 shirts. Calculate PED, including the minus sign.",
      wrong: [0.6, -1.67, -0.15],
      explanation: `% change in price = (7.50 − 6.00) ÷ 6.00 × 100 = +25%. % change in quantity = (306 − 360) ÷ 360 × 100 = −15%. PED = −15 ÷ 25 = ${dpStr(ped, 2)}. Leaving out the sign gives 0.60; dividing the other way gives −1.67.` });
  }
  {
    const ped = elasticity.ped({ p1: 5.0, p2: 4.0, q1: 700, q2: 910 });
    chk(ped, -1.5, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: ped, dp: 2, hints: ["Use the original values as the base."],
      stem: "A fictional bus company in Kwekwe cuts its fare from US\\$5.00 to US\\$4.00 and daily passengers rise from 700 to 910. Calculate PED, including the minus sign.",
      wrong: [-1.2, 1.5, -0.67],
      explanation: `% change in price = −20%; % change in passengers = +30%; PED = 30 ÷ (−20) = ${dpStr(ped, 2)}. Using the new price as the base for the price change gives −1.20.` });
  }
  {
    const pq = -0.8 * 15;
    const q = 3200 * (1 + pq / 100);
    chk(q, 2816, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: q, unit: "units", hints: ["First find the percentage change in quantity."],
      stem: "PED for bottled water in a fictional supermarket is −0.8. It sells 3,200 bottles a week. Calculate the weekly sales after a 15% rise in price, other things equal.",
      wrong: [2720, 3584, 2400],
      explanation: `1. % change in quantity = PED × % change in price = −0.8 × 15 = −12%.\n2. New quantity = 3,200 × (1 − 0.12) = ${fmt(q)} bottles.\nUsing 3,200 × 0.85 gives 2,720 (the price percentage applied to quantity); adding the 12% gives 3,584.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A PED of −2 means that demand is elastic.", answer: true,
    explanation: "True. The size, 2, is greater than 1, so quantity demanded changes by a larger percentage than price." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The steeper a straight demand curve, the more inelastic demand is at every price.", answer: false,
    explanation: "False. PED depends on percentage changes and varies along a straight line; slope alone does not determine it." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each value of PED (ignoring the sign) with its description.",
    pairs: [["0", "Perfectly inelastic"], ["0.5", "Inelastic"], ["1", "Unitary elastic"], ["2.5", "Elastic"]],
    explanation: "Below 1 is inelastic, exactly 1 is unitary, above 1 is elastic and 0 is perfectly inelastic." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Choose the correct terms.",
    template: "Demand is {{blank:a}} when the size of PED is greater than 1, and {{blank:b}} when the size of PED is less than 1.",
    blanks: [{ id: "a", accepted: ["elastic"], choices: ["elastic", "inelastic"] }, { id: "b", accepted: ["inelastic"], choices: ["elastic", "inelastic"] }],
    explanation: "Elastic: quantity responds by a larger percentage than price. Inelastic: by a smaller percentage." });

  b.short({ d: 1, skill: "RECALL", stem: "What term describes demand when PED is exactly zero?",
    accepted: ["perfectly inelastic", "perfectly inelastic demand", "perfectly price inelastic"], wrong: ["elastic"],
    explanation: "With PED = 0 quantity demanded does not respond to price: perfectly inelastic." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define price elasticity of demand.",
    points: ["A measure of the responsiveness of quantity demanded to a change in price.", "Calculated as the percentage change in quantity demanded divided by the percentage change in price."],
    modelAnswer: "Price elasticity of demand measures how responsive the quantity demanded of a good is to a change in its own price. It equals the percentage change in quantity demanded divided by the percentage change in price.",
    explanation: "Credit the idea of responsiveness and the formula." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each determinant and say whether it makes demand more or less elastic."],
    stem: "Explain **two** factors that determine the price elasticity of demand for a good.",
    points: ["Factor 1 identified (for example the availability of substitutes).", "Factor 1 explained: close substitutes make demand more elastic because buyers can switch.", "Factor 2 identified (for example necessity, share of income, time or habit).", "Factor 2 explained: for example, a necessity with a small share of income makes demand inelastic because buyers cannot or need not cut back."],
    modelAnswer: "The availability of close substitutes: when many are available, a price rise sends buyers to the alternatives, so demand is more elastic. The time period: over a longer time, consumers can find alternatives or change habits, so demand becomes more elastic than in the short run.",
    explanation: "One mark each for identifying and explaining two determinants." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Link each feature of salt to a determinant."],
    stem: "Analyse why demand for household salt is likely to be price inelastic.",
    points: ["It is a necessity: households must buy some.", "There are few or no close substitutes.", "It takes a very small share of household income, so a price rise matters little.", "Conclusion: quantity demanded changes by a smaller percentage than price, so PED is below 1."],
    modelAnswer: "Salt is a necessity with no close substitute, so households keep buying it when the price rises. It also takes a very small share of household income, so a price rise has little effect on budgets. Quantity demanded therefore falls by a smaller percentage than the price rises: demand is inelastic.",
    explanation: "Three determinants applied to salt and a conclusion in terms of PED." });

  {
    const pa = elasticity.ped({ p1: 1.2, p2: 1.5, q1: 500, q2: 425 });
    chk(pa, -0.6, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Percentage change = change ÷ original × 100."],
      stem: "A fictional bakery in Gweru raised the price of a loaf from US\\$1.20 to US\\$1.50 in March. Weekly sales fell from 500 loaves to 425 loaves. Other bakeries in the town did not change their prices.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: pa, dp: 2, stem: "Calculate PED for the bakery's bread, including the minus sign.", wrong: [0.6, -1.67], explanation: "% change in price = +25%; % change in quantity = −15%; PED = −15 ÷ 25 = −0.60." }),
        P.mcq({ label: "(b)", marks: 1, stem: "What does the value of PED show?", options: [["Demand is inelastic", "Correct: the size, 0.6, is below 1."], ["Demand is elastic", "Elastic needs a size above 1."], ["Demand is unitary elastic", "Unitary needs a size of exactly 1."], ["Demand is perfectly inelastic", "That needs a PED of zero."]], answer: "A", explanation: "0.6 < 1." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why PED for this bakery's bread might be higher than PED for bread in general.",
          points: ["Other bakeries sell close substitutes.", "Customers can switch to rivals when this bakery raises its price.", "Therefore a price rise reduces sales by a larger percentage than for bread as a whole."],
          modelAnswer: "Other bakeries in the town sell very similar loaves, so they are close substitutes. When this bakery raises its price, customers can switch to rivals, so its sales fall by a larger percentage than the market for bread as a whole." }),
        P.manual({ label: "(d)", marks: 2, stem: "State **two** pieces of information needed to be sure the price rise caused the fall in sales.",
          points: ["Evidence that other influences (incomes, prices of rivals, season) did not change.", "Data over a longer period or from other similar shops to check the pattern."],
          modelAnswer: "We need evidence that other factors, such as incomes, rivals' prices and the season, stayed constant, and data from other periods or shops to check that the fall was not a one-off." }),
      ],
      explanation: "PED = −0.6, inelastic; substitutes make one brand's demand more elastic; ceteris paribus must hold." });
  }
  {
    const A = elasticity.ped({ p1: 2.0, p2: 2.4, q1: 500, q2: 450 });
    const B = elasticity.ped({ p1: 2.0, p2: 2.4, q1: 800, q2: 600 });
    chk(A, -0.5, 1e-9); chk(B, -1.25, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Calculate each PED, then compare the routes.", "Think about substitutes on each route."],
      stem: "A fictional bus company in Mutare raised the fare on two routes from US\\$2.00 to US\\$2.40. On Route A (to a rural area with no other bus service) daily passengers fell from 500 to 450. On Route B (a city route also served by taxis and minibuses) daily passengers fell from 800 to 600.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: A, dp: 2, stem: "Calculate PED for Route A, including the minus sign.", wrong: [0.5, -2], explanation: "Price +20%, passengers −10%; PED = −10 ÷ 20 = −0.50." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: B, dp: 2, stem: "Calculate PED for Route B, including the minus sign.", wrong: [-0.8, 1.25], explanation: "Price +20%, passengers −25%; PED = −25 ÷ 20 = −1.25." }),
        P.mcq({ label: "(c)", marks: 1, stem: "On which route is demand elastic?", options: [["Route B only", "Correct: the size of PED is 1.25."], ["Route A only", "Route A's PED has a size of 0.5."], ["Both routes", "Route A is inelastic."], ["Neither route", "Route B is elastic."]], answer: "A", explanation: "Only Route B has a PED size above 1." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why PED differs between the two routes.",
          points: ["Route B has close substitutes (taxis, minibuses); Route A has none.", "On Route B passengers can switch, so quantity demanded falls by a larger percentage.", "On Route A passengers have no alternative, so they keep travelling and demand is inelastic."],
          modelAnswer: "On Route B taxis and minibuses are close substitutes, so a higher fare sends many passengers elsewhere and demand is elastic. On Route A there is no other service, so passengers have to keep travelling and the quantity demanded falls by a smaller percentage: demand is inelastic." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest **one** reason why the company might want to raise fares on Route A more than on Route B.",
          points: ["Demand on Route A is inelastic, so a rise in fares loses few passengers.", "Revenue rises when price rises on inelastic demand (or: fares on Route B would lose revenue)."],
          modelAnswer: "Demand on Route A is inelastic, so a fare rise reduces passengers by a smaller percentage than the rise in fare and the company's revenue increases; on Route B, elastic demand means a fare rise would reduce revenue." }),
      ],
      explanation: "Route A PED −0.50 (inelastic); Route B −1.25 (elastic); substitutes explain the difference." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the short run with the long run.", "Reach a judgement."],
    stem: "Assess whether demand for petrol in Zimbabwe is likely to be more price elastic in the long run than in the short run.",
    points: ["In the short run few substitutes: drivers need to travel.", "Petrol is a necessity for commuters and businesses with a small share of budget for many.", "In the long run households can move closer to work, use shared transport or buy efficient vehicles.", "Firms can change delivery routes or equipment over time.", "Habit and the fixed stock of vehicles slow the response.", "Availability of public transport and alternatives (such as electric vehicles) affects the long run.", "A large and lasting price rise strengthens the long-run response.", "A justified judgement: long-run demand is more elastic, but still probably inelastic."],
    levels: LV8,
    modelAnswer: "In the short run petrol demand is inelastic: drivers have vehicles and jobs fixed in place, there are few substitutes and fuel is a necessity for many, so a price rise reduces quantity only a little. In the long run people can move closer to work, share transport or buy more efficient vehicles, and firms can change delivery methods, so the response becomes larger. However, the long-run response depends on the availability of public transport and alternatives, which may be limited, and on whether the price rise is seen as lasting. Overall demand is more elastic in the long run, but it probably remains inelastic for many users because petrol is a necessity with few close substitutes.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Contrast the short run and long run, apply to petrol, and give a judgement about the size of the difference." });

  b.card("DEFINITION", "Define **price elasticity of demand (PED)**.", "A measure of the responsiveness of quantity demanded to a change in price: % change in quantity demanded ÷ % change in price.");
  b.card("FORMULA", "State the formula for **PED**.", "PED = % change in quantity demanded ÷ % change in price, using the original value as the base for each change.");
  b.card("FACT", "What does a PED of **−0.4** tell you?", "Demand is inelastic: a 1% rise in price lowers quantity demanded by only 0.4%.");
  b.card("FACT", "What does a PED of **−2.5** tell you?", "Demand is elastic: a 1% rise in price lowers quantity demanded by 2.5%.");
  b.card("CONCEPT", "What does a **vertical** demand curve show?", "Perfectly inelastic demand (PED = 0): quantity demanded does not change when price changes.");
  b.card("CONCEPT", "What does a **horizontal** demand curve show?", "Perfectly elastic demand (PED is infinite): any rise in price reduces quantity demanded to zero.");
  b.card("CONCEPT", "List **five** determinants of PED.", "Availability of substitutes, necessity or luxury, share of income, time period, habit or addiction (and breadth of the definition of the good).");
  b.card("CONCEPT", "Why is demand more elastic in the **long run**?", "Consumers have more time to find substitutes and to change habits, location or equipment.");
  b.card("FACT", "Why is PED normally negative?", "Price and quantity demanded move in opposite directions (the law of demand).");
});
