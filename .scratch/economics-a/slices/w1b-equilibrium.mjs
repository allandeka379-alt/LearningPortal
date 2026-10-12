// W1b: market equilibrium and shifts in demand and supply (both boards, AS).
import { concept, P, chk, fmt, pctChange, signedPct, schedule } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

// Linear market in quantity form: Qd = d0 − d1·P, Qs = s0 + s1·P  →  P* = (d0 − s0)/(d1 + s1), Q* = d0 − d1·P*.
const solve = ({ d0, d1, s0, s1 }) => {
  const price = (d0 - s0) / (d1 + s1);
  const q = d0 - d1 * price;
  chk(q, s0 + s1 * price, 1e-9, "equilibrium");
  return { price, q };
};

concept("aecon.market.equilibrium", { file: "market/equilibrium", keyPrefix: "market.equilibrium" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "At the equilibrium price in a market",
    explanation: "Equilibrium is where quantity demanded equals quantity supplied, so there is no pressure for price to change." },
    ["quantity demanded equals quantity supplied", "Correct: the market clears."],
    [["quantity demanded is greater than quantity supplied", "That is excess demand, below equilibrium."], ["quantity supplied is greater than quantity demanded", "That is excess supply, above equilibrium."], ["the price is as low as possible", "Equilibrium is not about the lowest price."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "At a price above the equilibrium price there is",
    explanation: "A high price encourages supply and discourages demand: quantity supplied exceeds quantity demanded, an excess supply." },
    ["excess supply, and price tends to fall", "Correct: sellers cut prices to clear unsold stock."],
    [["excess demand, and price tends to rise", "That occurs below equilibrium."], ["excess supply, and price tends to rise", "Excess supply puts downward pressure on price."], ["equilibrium, because price is stable", "Equilibrium needs Qd = Qs."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which change would shift the demand curve for bread to the right?",
    explanation: "A rise in consumers' incomes raises demand for a normal good at every price: a shift. The others affect supply or are movements along the curve." },
    ["A rise in consumers' incomes", "Correct: demand shifts for a normal good."],
    [["A fall in the price of bread", "This is a movement along the demand curve."], ["A fall in the cost of flour", "This shifts the supply curve."], ["An improvement in baking technology", "This shifts the supply curve."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A drought reduces the supply of maize, other things equal. The equilibrium price and quantity will",
    explanation: "Supply shifts to the left: price rises and quantity falls." },
    ["price rises and quantity falls", "Correct: a left shift in supply."],
    [["price rises and quantity rises", "That follows a rise in demand."], ["price falls and quantity rises", "That follows a rise in supply."], ["price falls and quantity falls", "That follows a fall in demand."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which shift raises quantity and lowers price?"],
    stem: "At a tobacco auction the price falls and the quantity sold rises. The most likely explanation is",
    explanation: "A fall in price with a rise in quantity indicates a shift of supply to the right (for example a good growing season)." },
    ["an increase in supply", "Correct: supply shifted right."],
    [["a decrease in supply", "That would raise price and lower quantity."], ["an increase in demand", "That would raise price."], ["a decrease in demand", "That would lower quantity."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Only one of price and quantity is certain."],
    stem: "Demand for a good rises and, at the same time, supply rises. What happens to equilibrium quantity and price?",
    explanation: "Quantity certainly rises (both shifts increase it); price may rise, fall or stay the same, depending on which shift is larger." },
    ["Quantity rises; the change in price is uncertain", "Correct: both shifts raise quantity but push price in opposite directions."],
    [["Price rises; the change in quantity is uncertain", "A demand rise raises price and a supply rise lowers it."], ["Price and quantity both rise", "The price effect depends on the sizes."], ["Price falls and quantity is unchanged", "Both shifts raise quantity."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Look at the process that moves price."],
    stem: "After demand rises, how does the market reach its new equilibrium?",
    explanation: "Excess demand at the old price pushes price up; quantity supplied extends and quantity demanded contracts until they are equal." },
    ["Price rises, so supply extends and demand contracts", "Correct: this is the adjustment process."],
    [["Price falls until the shortage ends and buyers return", "A shortage raises price."], ["Supply shifts to the left until the shortage ends", "The adjustment is a movement along the supply curve."], ["Demand falls back to its original position over time", "Demand stays at its new position; price adjusts."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Which assumption of the model may fail?"],
    stem: "Which of the following is the best reason why the demand and supply model may predict price changes poorly?",
    explanation: "The model assumes free price adjustment and many buyers and sellers; controls and market power distort prices." },
    ["Prices may be controlled or set by large firms", "Correct: the model assumes free competition."],
    [["Demand curves slope downward for most normal goods", "This is a result of the law of demand, not a weakness."], ["Quantity supplied rises as the price rises in the short run", "This is a basic assumption of the model."], ["Equilibrium is where Qd equals Qs", "This is the definition."]]);

  {
    const e = solve({ d0: 165, d1: 15, s0: -15, s1: 15 });
    chk(e.price, 6, 1e-9); chk(e.q, 75, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: e.price,
      stem: "The market for 10 kg bags of maize meal has Qd = 165 − 15P and Qs = 15P − 15 (P in US\\$, Q in thousand bags). Calculate the equilibrium price.",
      wrong: [75, 5.5, 7],
      explanation: `Qd = Qs: 165 − 15P = 15P − 15, so 180 = 30P and P = US\\$${fmt(e.price)}. Quantity is 165 − 15 × 6 = ${e.q} thousand bags.` });
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: e.q, unit: "units", daily: true,
      stem: "In the same market (Qd = 165 − 15P, Qs = 15P − 15, quantity in thousand bags) calculate the equilibrium quantity in thousand bags.",
      wrong: [6, 90, 180],
      explanation: `Equilibrium price = US\\$6; Q = 165 − 15 × 6 = ${e.q}. Check with supply: 15 × 6 − 15 = 75.` });
  }
  {
    const e = solve({ d0: 195, d1: 15, s0: -15, s1: 15 });
    chk(e.price, 7, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: e.price, hints: ["Rewrite the demand equation after the shift."],
      stem: "Incomes rise in the maize meal market (Qs = 15P − 15) and demand increases by 30 thousand bags at every price, so that Qd = 195 − 15P. Calculate the new equilibrium price.",
      wrong: [6, 8, 90],
      explanation: `195 − 15P = 15P − 15, so 210 = 30P and P = US\\$${fmt(e.price)}. Quantity = 15 × 7 − 15 = 90 thousand bags.` });
  }
  {
    const e = solve({ d0: 165, d1: 15, s0: -45, s1: 15 });
    chk(e.price, 7, 1e-9); chk(e.q, 60, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: e.q, unit: "units", hints: ["A fall in supply of 30 changes the constant in Qs."],
      stem: "A drought reduces supply by 30 thousand bags at every price in the market where Qd = 165 − 15P, so that Qs = 15P − 45. Calculate the new equilibrium quantity in thousand bags.",
      wrong: [75, 90, 7],
      explanation: `165 − 15P = 15P − 45, so 210 = 30P and P = 7. Quantity = 165 − 15 × 7 = ${e.q} thousand bags. The price rises and quantity falls.` });
  }
  {
    const e = solve({ d0: 195, d1: 15, s0: -45, s1: 15 });
    chk(e.price, 8, 1e-9); chk(e.q, 75, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: e.price, hints: ["Both curves shift: change both constants."],
      stem: "In the maize meal market demand rises by 30 thousand bags at every price (Qd = 195 − 15P) while a drought lowers supply by 30 thousand bags at every price (Qs = 15P − 45). Calculate the new equilibrium price.",
      wrong: [6, 7, 7.5],
      explanation: `195 − 15P = 15P − 45, so 240 = 30P and P = US\\$${fmt(e.price)}. Quantity stays at 75 thousand bags: the two shifts cancel in their effect on quantity but both raise price.` });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "When both demand and supply shift, the change in both price and quantity can always be predicted without knowing the size of the shifts.", answer: false,
    explanation: "False. One variable is certain, but the other depends on the relative sizes of the shifts." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with its effect on the equilibrium price and quantity.",
    pairs: [["Demand rises", "Price rises, quantity rises"], ["Demand falls", "Price falls, quantity falls"], ["Supply rises", "Price falls, quantity rises"], ["Supply falls", "Price rises, quantity falls"]],
    explanation: "Demand shifts move price and quantity in the same direction; supply shifts move them in opposite directions." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes a situation in which quantity supplied exceeds quantity demanded at the current price?",
    accepted: ["excess supply", "surplus", "a surplus"], wrong: ["shortage"],
    explanation: "Excess supply (a surplus) occurs when price is above equilibrium." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define market equilibrium.",
    points: ["The price at which quantity demanded equals quantity supplied.", "There is no tendency for price to change (the market clears)."],
    modelAnswer: "Market equilibrium is the price at which the quantity demanded equals the quantity supplied. At this price the market clears and there is no tendency for the price to change.", explanation: "Definition with the idea of no pressure on price." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Describe the disequilibrium and the adjustment."],
    stem: "Explain how a market reaches a new equilibrium after an increase in demand.",
    points: ["Demand shifts to the right, so at the old price quantity demanded exceeds quantity supplied (excess demand).", "Shortage puts upward pressure on price.", "Higher price extends quantity supplied (movement along the supply curve).", "Higher price contracts quantity demanded until Qd = Qs at the new, higher price and quantity."],
    modelAnswer: "When demand shifts right there is excess demand at the old price. The shortage pushes price up. As price rises, producers supply more (an extension along the supply curve) and consumers buy less than they wanted at the old price (a contraction along the new demand curve) until quantity demanded equals quantity supplied at a higher price and a higher quantity.",
    explanation: "Shift, disequilibrium, price signal, movement along the curves." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Which curve shifted and in which direction?"],
    stem: "Analyse the effect on the market for taxi rides in Harare of a rise in the price of fuel.",
    points: ["Fuel is a cost of taxi rides, so costs rise.", "Supply shifts to the left.", "At the old price there is excess demand, so price rises.", "Equilibrium price rises and quantity of rides falls."],
    modelAnswer: "A higher fuel price raises the cost of providing taxi rides, so the supply curve shifts to the left. At the old fare there is excess demand, so fares rise. Passengers reduce their journeys along the demand curve and the equilibrium quantity of rides falls while the equilibrium fare rises.",
    explanation: "Cost rise, supply shift, new equilibrium." });

  {
    const prices = [2, 4, 6, 8, 10];
    const qd = [90, 70, 50, 30, 10];
    const qs = [10, 30, 50, 70, 90];
    const s = schedule({ prices, qd, qs, priceHeader: "Price (US\\$ per kg)", qdHeader: "Quantity demanded (tonnes per week)", qsHeader: "Quantity supplied (tonnes per week)", requireEquilibrium: true });
    chk(s.equilibrium.price, 6, 1e-9);
    const s2 = schedule({ prices, qd: qd.map((x) => x + 40), qs, requireEquilibrium: true });
    chk(s2.equilibrium.price, 8, 1e-9); chk(s2.equilibrium.quantity, 70, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Look for the price at which Qd = Qs."],
      stem: `The table shows the market for a fictional vegetable (illustrative data).\n\n${s.md}\n\nA rise in incomes then increases the quantity demanded by 40 tonnes at every price. Supply is unchanged.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: 6, stem: "State the original equilibrium price.", wrong: [50, 4], explanation: "At US\\$6, Qd = Qs = 50." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 40, unit: "tonnes", stem: "Calculate the excess demand at a price of US\\$4 before the rise in incomes.", wrong: [20, 70, 30], explanation: "Qd 70 − Qs 30 = 40 tonnes of excess demand." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s2.equilibrium.price, stem: "State the new equilibrium price after the rise in incomes.", wrong: [6, 10], explanation: "New Qd = 130, 110, 90, 70, 50; at US\\$8, Qd = 30 + 40 = 70 = Qs." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how the market moves from the old to the new equilibrium.",
          points: ["Demand increases, so at US\\$6 there is excess demand (90 against 50).", "The shortage pushes the price up.", "As price rises, quantity supplied extends and quantity demanded contracts until both are 70 at US\\$8."],
          modelAnswer: "A rise in incomes shifts demand to the right, so at US\\$6 the quantity demanded (90) exceeds the quantity supplied (50). The shortage pushes the price up. Producers supply more as the price rises and buyers cut back, until at US\\$8 quantity demanded and supplied are both 70 tonnes." }),
      ],
      explanation: "Original equilibrium US\\$6 and 50 tonnes; after the rise in demand US\\$8 and 70 tonnes." });
  }
  {
    const e0 = solve({ d0: 240, d1: 20, s0: -40, s1: 20 });
    const e1 = solve({ d0: 240, d1: 20, s0: -80, s1: 20 });
    const e2 = solve({ d0: 260, d1: 20, s0: -80, s1: 20 });
    chk(e0.price, 7, 1e-9); chk(e0.q, 100, 1e-9); chk(e1.price, 8, 1e-9); chk(e1.q, 80, 1e-9); chk(e2.price, 8.5, 1e-9); chk(e2.q, 90, 1e-9);
    const pc = pctChange(e0.price, e1.price);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Solve Qd = Qs each time."],
      stem: "The market for minibus rides in a fictional town has Qd = 240 − 20P and Qs = 20P − 40 (P is the fare in US\\$, Q is rides per day in hundreds). A rise in the price of fuel reduces supply by 40 at every fare, so that Qs = 20P − 80. Later, incomes rise and demand increases by 20 at every fare, so that Qd = 260 − 20P.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: e0.price, stem: "Calculate the original equilibrium fare.", wrong: [100, 8], explanation: "240 − 20P = 20P − 40, so 280 = 40P and P = 7." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: e1.q, unit: "units", stem: "Calculate the equilibrium quantity (hundreds of rides per day) after the fuel price rise, before incomes change.", wrong: [100, 90], explanation: "240 − 20P = 20P − 80, so P = 8 and Q = 240 − 160 = 80." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: pc, dp: 1, unit: "%", stem: "Calculate the percentage change in the fare caused by the fuel price rise, to one decimal place.", wrong: [12.5, 1, 14], explanation: "Fare from 7 to 8: (8 − 7) ÷ 7 × 100 = +14.3%." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the fare rises when the price of fuel rises.",
          points: ["Fuel is a cost, so supply shifts left (at each fare operators supply fewer rides).", "At the old fare there is excess demand, which pushes the fare up."],
          modelAnswer: "A higher fuel price raises operators' costs, so supply shifts to the left. At the old fare of US\\$7 quantity demanded exceeds quantity supplied, and the excess demand pushes the fare up to US\\$8." }),
        P.manual({ label: "(e)", marks: 2, stem: "After both changes, the fare is US\\$8.50 and 90 hundred rides are made. State what is certain about the effect of both changes together, and what is uncertain without further information.",
          points: ["Price definitely rises (supply fall and demand rise both raise the fare).", "The effect on quantity depends on the relative sizes of the shifts (here quantity falls from 100 to 90)."],
          modelAnswer: "The fare is certain to rise because both a fall in supply and a rise in demand raise it. The change in quantity is uncertain in general because the shifts push it in opposite directions; here the supply fall was larger, so quantity fell from 100 to 90." }),
      ],
      explanation: "Fare 7, then 8 (+14.3%) with 80 rides, then 8.50 with 90." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Say what the model explains and where its assumptions fail."],
    stem: "Evaluate the usefulness of the demand and supply model for explaining changes in the price of maize meal in a developing country.",
    points: ["Predicts the direction of price changes after shifts (drought: supply falls, price rises).", "Shows how both curves interact and how the market adjusts.", "Elasticities (inelastic demand) explain why prices change a lot.", "Assumes free competition: may not hold where the government controls prices or firms have power.", "Several changes occur together, hiding individual effects.", "Imperfect information, transport costs and informal markets.", "Data are often weak, so testing is difficult.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "The model is useful because it predicts the direction of price changes: a drought shifts supply left and raises the price of maize meal, while higher incomes shift demand right. With inelastic demand and supply it also explains why prices change sharply. However, the model assumes free competition and perfect information. In many countries the government sets or influences prices, a few firms may have market power, transport costs and informal trading make prices differ between places, and several changes often occur together, hiding the effect of each. Overall the model is a sound first guide to the direction of price changes, but predictions of the size of changes need extra information about elasticities, controls and market structure.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Strengths against assumptions, with a judgement." });

  b.card("DEFINITION", "Define **market equilibrium**.", "The price at which quantity demanded equals quantity supplied, so there is no tendency for price to change.");
  b.card("CONCEPT", "What happens at a price **above** equilibrium?", "Excess supply (a surplus); price tends to fall.");
  b.card("CONCEPT", "What happens at a price **below** equilibrium?", "Excess demand (a shortage); price tends to rise.");
  b.card("FACT", "Effect of a **rise in demand** on price and quantity?", "Both rise (demand curve shifts right).");
  b.card("FACT", "Effect of a **fall in supply** on price and quantity?", "Price rises and quantity falls (supply curve shifts left).");
  b.card("CONCEPT", "How do you solve for equilibrium from equations?", "Set Qd = Qs, solve for P, then substitute back to find Q.");
  b.card("CONCEPT", "When both demand and supply shift, what is certain?", "One variable (price or quantity); the other depends on the relative size of the shifts.");
  b.card("CONCEPT", "Movement along or shift of a curve: a change in the good's own price?", "A movement along the curve (extension or contraction); other influences shift it.");
  b.card("FACT", "Why does a poor harvest raise food prices sharply?", "Supply shifts left and demand and supply are both inelastic, so price must rise a lot to clear the market.");
});
