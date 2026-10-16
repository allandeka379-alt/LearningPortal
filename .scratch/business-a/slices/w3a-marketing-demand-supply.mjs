// W3a: marketing.demand-supply
import { concept, P, ZIM, table, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

// Schedule helpers: equilibrium is FOUND in code, never typed.
const eq = (prices, qd, qs) => {
  const i = prices.findIndex((_, k) => qd[k] === qs[k]);
  if (i < 0) throw new Error("no equilibrium on the grid");
  return { price: prices[i], qty: qd[i] };
};
const sched = (prices, qd, qs, unit = "Price per bag (US\\$)") =>
  table([unit, "Quantity demanded", "Quantity supplied"], prices.map((p, k) => [p.toFixed(2), qd[k], qs[k]]), ["l", "r", "r"]);

// S1: position at a price (MCQ)
const prices1 = [4, 5, 6, 7, 8];
const qd1 = [960, 800, 640, 480, 320];
const qs1 = [320, 480, 640, 800, 960];
const base1 = eq(prices1, qd1, qs1);
chk(base1.price, 6, 1e-9);
chk(base1.qty, 640, 1e-9);
const T1 = sched(prices1, qd1, qs1);
chk(qs1[3] - qd1[3], 320, 1e-9);
// S2: equilibrium (fill in the blanks)
const prices2 = [10, 12, 14, 16, 18];
const qd2 = [420, 350, 280, 210, 140];
const qs2 = [140, 210, 280, 350, 420];
const base2 = eq(prices2, qd2, qs2);
chk(base2.price, 14, 1e-9);
chk(base2.qty, 280, 1e-9);
const T2 = sched(prices2, qd2, qs2, "Price per carton (US\\$)");
// S3: demand rises by 30 at every price (numerical)
const prices3 = [21, 22, 23, 24, 25];
const qd3 = [75, 60, 45, 30, 15];
const qs3 = [15, 30, 45, 60, 75];
const base3 = eq(prices3, qd3, qs3);
chk(base3.price, 23, 1e-9);
const qd3Up = qd3.map((x) => x + 30);
const eq3 = eq(prices3, qd3Up, qs3);
chk(eq3.price, 24, 1e-9);
chk(eq3.qty, 60, 1e-9);
const T3 = sched(prices3, qd3, qs3, "Price per kg (US\\$)");
// S4: supply rises by 300 at every price (numerical)
const prices4 = [20, 25, 30, 35, 40];
const qd4 = [1250, 1100, 950, 800, 650];
const qs4 = [650, 800, 950, 1100, 1250];
const base4 = eq(prices4, qd4, qs4);
chk(base4.price, 30, 1e-9);
chk(base4.qty, 950, 1e-9);
const qs4Up = qs4.map((x) => x + 300);
const eq4 = eq(prices4, qd4, qs4Up);
chk(eq4.price, 25, 1e-9);
chk(eq4.qty, 1100, 1e-9);
const T4 = sched(prices4, qd4, qs4, "Price per crate (US\\$)");

concept("abus.marketing.demand-supply", { file: "marketing/demand-supply", keyPrefix: "marketing.demand-supply" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What happens to the quantity demanded of a normal good when its own price rises, other things unchanged?",
    ok: ["It falls, as a movement along the demand curve", "Correct: this is the law of demand."],
    bad: [["It rises, as a shift of the whole demand curve", "A price change moves along the curve; it does not shift it."], ["It stays the same, as demand is fixed in the short run", "Quantity demanded responds to price."], ["It rises, as buyers expect the good to be scarce", "The law of demand assumes other things equal."]],
    explanation: "A price rise reduces the quantity demanded: a movement along the demand curve.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following would cause the **supply** of maize meal to increase?",
    ok: ["A fall in the cost of maize and milling", "Correct: lower costs raise supply at every price."],
    bad: [["A rise in the wages paid to all of the millers", "Higher wages raise costs and reduce supply."], ["A drought that destroys part of the maize harvest", "A drought reduces the supply of maize."], ["A new tax on every bag of maize meal sold", "A tax raises costs and reduces supply."]],
    explanation: "Lower costs of production shift supply to the right.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A fictional bakery in Harare finds that the price of its bread is above the equilibrium price. What is the market position?",
    ok: ["A surplus, so there is pressure on prices to fall", "Correct: quantity supplied exceeds quantity demanded."],
    bad: [["A shortage, so there is pressure on price to rise", "A shortage occurs below the equilibrium price."], ["Equilibrium, so there is no pressure on the price", "Equilibrium is where demand equals supply."], ["A shortage, so the bakery should raise output soon", "A price above equilibrium creates a surplus, not a shortage."]],
    explanation: "Above equilibrium, the quantity supplied exceeds the quantity demanded, so sellers cut prices.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "The price of margarine, a substitute for butter, rises. What is the most likely effect on the market for butter?",
    ok: ["Demand for butter increases, so its price rises", "Correct: consumers switch to the cheaper substitute."],
    bad: [["Demand for butter decreases, so its price falls", "Buyers move towards butter, not away from it."], ["Supply of butter increases, so its price falls", "The price of a substitute shifts demand, not supply."], ["Nothing happens, because the two goods are unrelated", "Substitutes are related; their prices affect each other's demand."]],
    hints: ["Which way do buyers switch?"],
    explanation: "A higher price of a substitute raises demand for the good, raising its price and quantity.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture maker in Gweru reads that incomes in the town are expected to rise sharply. Furniture is a normal good. What is the best prediction for the market?",
    ok: ["Demand shifts right, so price and quantity both rise", "Correct: higher income raises demand for a normal good."],
    bad: [["Demand shifts left, so price and quantity both fall", "Higher income raises, not lowers, demand for normal goods."], ["Supply shifts right, so price falls and quantity rises", "Income affects demand, not supply."], ["Quantity demanded falls, with a movement along the curve", "A change in income shifts the curve; it is not a movement."]],
    hints: ["Income is a factor other than price."],
    explanation: "A rise in income shifts the demand curve for a normal good to the right, which raises both price and quantity.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Read the schedule of a fictional market for bags of maize meal in Masvingo.\n\n" + T1 + "\n\nWhat is the market position at a price of US\\$7?",
    ok: ["A surplus of 320 bags", "Correct: 800 supplied minus 480 demanded is 320."],
    bad: [["A shortage of 320 bags", "At US\\$7 supply exceeds demand, so it is a surplus."], ["A surplus of 800 bags", "This is the quantity supplied, not the surplus."], ["Equilibrium, with 640 bags traded", "Equilibrium is at US\\$6."]],
    hints: ["Compare the two quantities at US\\$7."],
    explanation: "At US\\$7, quantity supplied = 800 and quantity demanded = 480, so there is a surplus of 320 bags, which pushes the price down towards US\\$6.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "In a fictional market, both demand and supply increase. Which statement is certainly correct?",
    ok: ["The equilibrium quantity rises, but the price may rise or fall", "Correct: both shifts raise quantity; the price effect depends on their sizes."],
    bad: [["The equilibrium price must rise, but quantity may fall", "Quantity rises when both curves shift right."], ["The equilibrium price must fall, with quantity unchanged", "Neither the price nor the quantity result is fixed this way."], ["Both the price and quantity must fall in the market", "Increases in demand and supply do not cause both to fall."]],
    hints: ["Think of each shift separately, then combine."],
    explanation: "Demand rising raises price and quantity; supply rising lowers price and raises quantity. Quantity certainly rises; the price effect depends on which shift is larger.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A government fixes the price of bread below the equilibrium price. Which statement is the best evaluation of the likely result for a baker?",
    ok: ["A shortage is likely, so bakers may cut output or queues form", "Correct: the controlled price is below equilibrium, so quantity demanded exceeds supply."],
    bad: [["A surplus is likely, so bakers must lower their prices again", "A price below equilibrium causes a shortage."], ["The market stays in equilibrium, so nothing else changes", "A fixed price below equilibrium prevents the market clearing."], ["Supply will certainly rise, so profits will increase", "A lower price usually reduces the incentive to supply."]],
    hints: ["Compare the fixed price with the equilibrium price."],
    explanation: "A price below equilibrium creates excess demand (a shortage); suppliers have less incentive to produce at the low price.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A change in the price of a good shifts its demand curve.",
    answer: false,
    explanation: "False. A change in the price of the good is a movement along the curve; a shift needs a change in another factor.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A fall in the cost of raw materials shifts the supply curve to the right.",
    answer: true,
    explanation: "True. Lower costs make production more profitable at each price, so firms supply more at every price.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each event in a market to its effect on equilibrium.",
    pairs: [["Demand increases", "Price and quantity both rise"], ["Demand decreases", "Price and quantity both fall"], ["Supply increases", "Price falls and quantity rises"], ["Supply decreases", "Price rises and quantity falls"]],
    explanation: "Shifts of demand move price and quantity in the same direction; shifts of supply move them in opposite directions.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "At a price above equilibrium there is a {{blank:a}}, and the price tends to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["surplus"], choices: ["surplus", "shortage", "balance"] },
      { id: "b", accepted: ["fall"], choices: ["fall", "rise", "stay fixed"] },
    ],
    explanation: "Excess supply forces sellers to cut the price until the market clears.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Use the schedule for a fictional wholesale market in Bulawayo to complete the sentence.\n\n" + T2,
    template: "The equilibrium price is {{blank:a}} US dollars per carton and the equilibrium quantity is {{blank:b}} cartons.",
    blanks: [
      { id: "a", accepted: [String(base2.price)], choices: ["12", "14", "16"] },
      { id: "b", accepted: [String(base2.qty)], choices: ["210", "280", "350"] },
    ],
    hints: ["Find the row where the two quantities are equal."],
    explanation: "Quantity demanded equals quantity supplied (280) at US\\$14.",
  });

  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: eq3.price, daily: true, wrong: [base3.price, 25],
    stem: "The schedule shows a fictional market for sweet potatoes in Mutare. Demand then rises by 30 kg at every price and supply is unchanged. Using the schedule, state the new equilibrium price per kg.\n\n" + T3,
    hints: ["Add 30 to each quantity demanded, then look for equality."],
    explanation: "New quantity demanded: " + qd3Up.join(", ") + " kg at US\\$21 to US\\$25. It equals supply (60) at US\\$24. The price rises from US\\$23 to US\\$24 and quantity from 45 to 60 kg. US\\$23 is the old price.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: eq4.qty, wrong: [base4.qty, qs4Up[0]],
    stem: "The schedule shows a fictional market for crates of oranges in Chipinge. Supply then rises by 300 crates at every price and demand is unchanged. State the new equilibrium quantity in crates.\n\n" + T4,
    hints: ["Add 300 to each quantity supplied, then look for equality with demand."],
    explanation: "New quantity supplied: " + qs4Up.join(", ") + ". It equals demand (1,100) at US\\$25. Price falls from US\\$30 to US\\$25 and the quantity traded rises to 1,100 crates. 950 is the old quantity.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the name for the quantity by which supply exceeds demand at a price above equilibrium.",
    accepted: ["surplus", "excess supply", "a surplus"],
    explanation: "A surplus (excess supply).",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between a movement along a demand curve and a shift of the demand curve.",
    points: ["A movement along the curve is caused by a change in the price of the good itself", "A shift is caused by a change in another factor, such as income or tastes", "A shift means that the quantity demanded changes at every price"],
    modelAnswer: "A movement along the curve happens when the price of the good itself changes. A shift happens when another factor, such as income or tastes, changes, so that the quantity demanded changes at every price.",
    hints: ["What is the cause in each case?"],
    explanation: "Cause and effect for each.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional chicken farm near Chinhoyi faces a rise in the price of feed. Explain **two** effects of this on the market for chickens.",
    points: ["Feed is a major cost, so the supply of chickens decreases", "Application: farms can supply fewer chickens at every price", "The equilibrium price rises", "Application: the price of chickens in shops goes up while the quantity bought falls"],
    modelAnswer: "Feed is a major cost, so farms supply fewer chickens at every price. The supply curve shifts left, so the price of chickens in the shops rises and the quantity bought falls.",
    hints: ["Which curve shifts, and in which direction?"],
    explanation: "A cost rise shifts supply left, raising price and reducing quantity.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how an advertising campaign for yoghurt by a fictional dairy could change the market price and quantity of yoghurt.",
    points: ["Advertising raises awareness and changes tastes", "Demand shifts right", "At the old price there is a shortage", "The equilibrium price and quantity rise"],
    modelAnswer: "Advertising raises awareness and shifts tastes towards yoghurt, so demand shifts to the right. At the old price there is now a shortage, so the price rises until the market clears, at a higher price and a higher quantity.",
    hints: ["Link the advertising to the demand curve."],
    explanation: "A chain from advertising to a rise in price and quantity.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A drought halves the supply of maize in Zimbabwe (a fictional scenario). Evaluate the effects on a fictional maize-meal miller in Gweru and the options available to the miller.",
    points: ["Supply of maize falls, so its price rises", "The miller's costs rise, so profit falls unless the miller raises prices", "The miller may raise prices, but demand may fall if consumers can switch to substitutes", "The miller could source maize elsewhere or sell alternative products, but this has cost and delay", "The size of the effect depends on how much buyers respond to price", "Judgement with reason, e.g. a partial price rise with alternative sourcing is best"],
    modelAnswer: "A fall in the supply of maize raises its price, which raises the miller's costs. The miller can raise the price of meal, but demand may fall if consumers switch to substitutes such as rice or sorghum. Sourcing maize elsewhere or selling other products would help, but takes time and money. How far the miller can pass on the cost depends on how much buyers respond to price, so a partial price rise combined with finding other supplies is the best course.",
    hints: ["Think of cost, price, substitutes and time."],
    explanation: "Effects weighed with limits and a judgement.",
  });

  const pr = [31, 32, 33, 34, 35];
  const d1 = [120, 105, 90, 75, 60], s1 = [30, 60, 90, 120, 150];
  const e1 = eq(pr, d1, s1);
  chk(e1.price, 33, 1e-9);
  chk(e1.qty, 90, 1e-9);
  const sTax = s1.map((x) => x - 45);
  const sTaxClip = sTax.map((x) => Math.max(x, 0));
  const e2 = eq(pr, d1, sTaxClip);
  chk(e2.price, 34, 1e-9);
  chk(e2.qty, 75, 1e-9);
  const t1 = table(["Price per kg (US\\$)", "Quantity demanded (kg)", "Quantity supplied (kg)"], pr.map((p, k) => [p.toFixed(2), d1[k], s1[k]]), ["l", "r", "r"]);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A fictional market in Bulawayo trades beans. The weekly schedule is shown below.\n\n" + t1 + "\n\nA new tax on bean sellers reduces the quantity supplied by 45 kg at every price (supply cannot go below zero).",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: e1.price, stem: "State the equilibrium price per kg before the tax.", wrong: [32, 34], explanation: "Quantity demanded equals quantity supplied (90 kg) at US\\$33." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: e2.price, stem: "State the equilibrium price per kg after the tax.", wrong: [e1.price, 35], explanation: "New supply: " + sTaxClip.join(", ") + " kg. It equals demand (75 kg) at US\\$34." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the effect of the tax on the quantity of beans bought and on the price.", points: ["The tax raises sellers' costs, so supply shifts left", "The price rises from US\\$33 to US\\$34", "The quantity bought falls from 90 kg to 75 kg"], modelAnswer: "The tax raises sellers' costs, so supply shifts to the left. The price rises from US\\$33 to US\\$34 and the quantity bought falls from 90 kg to 75 kg.", explanation: "Direction and size, from the schedule." }),
    ],
    hints: ["Subtract 45 from each supply figure first."],
    explanation: "Equilibrium moves from US\\$33 and 90 kg to US\\$34 and 75 kg.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. A fictional mobile-phone retailer in Harare sells a popular handset. A rival launches a cheaper, similar handset, and at the same time the national electricity shortage raises the retailer's costs of charging and storing stock. The retailer's manager says: \"Demand for our handset will fall and our supply will fall. We cannot know what will happen to the price.\"",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the rival's cheaper handset is likely to reduce demand for the retailer's handset.", points: ["The handsets are substitutes", "Some buyers switch to the cheaper one", "Demand shifts left at every price"], modelAnswer: "The two handsets are substitutes, so some buyers will switch to the cheaper handset. Demand for the retailer's handset shifts to the left at every price.", explanation: "A substitute's lower price shifts demand left." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether the manager is right that the effect on price cannot be known.", points: ["A fall in demand lowers price and quantity", "A fall in supply raises price and lowers quantity", "Quantity falls in both cases", "The price effect depends on which shift is larger", "The manager is right about price only until the sizes of the shifts are known", "Judgement, e.g. the retailer should estimate both shifts or watch the price"], modelAnswer: "A fall in demand lowers the price and quantity, but a fall in supply raises the price and lowers quantity. Quantity must fall in both cases, but the effect on price depends on which shift is larger. The manager is right about price in principle, but the retailer should estimate the size of each shift, for example by watching rival prices and sales, so that it can set a price with some confidence.", explanation: "Combined shifts: quantity certain, price depends on sizes." }),
    ],
    hints: ["Consider each shift on its own, then together."],
    explanation: "Quantity falls; the price effect depends on the size of the shifts.",
  });

  b.card("DEFINITION", "Demand", "The quantity consumers are willing and able to buy at each price in a given period.");
  b.card("DEFINITION", "Supply", "The quantity producers are willing and able to offer for sale at each price in a given period.");
  b.card("DEFINITION", "Equilibrium price", "The price at which quantity demanded equals quantity supplied.");
  b.card("CONCEPT", "Movement or shift", "A change in the price of the good moves along the curve; a change in any other factor shifts the curve.");
  b.card("FACT", "Factors that shift demand", "Income, prices of substitutes and complements, tastes, population, advertising, expectations and seasons.");
  b.card("FACT", "Factors that shift supply", "Costs, technology, weather, taxes and subsidies, number of firms, prices of other goods and expectations.");
  b.card("CONCEPT", "Surplus and shortage", "Above equilibrium: surplus, price falls. Below equilibrium: shortage, price rises.");
  b.card("FACT", "Effects of shifts", "Demand up: price and quantity up. Supply up: price down, quantity up. Opposite for decreases.");
  b.card("DEFINITION", "Derived demand", "Demand for a good because it is needed to make another good, e.g. flour for bread.", undefined, { applies: ZIM });
});
