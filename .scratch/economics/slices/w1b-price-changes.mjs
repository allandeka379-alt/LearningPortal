// W1b: econ.markets.price-changes — shifts, new equilibrium, consequences for sales.
import { concept, P, schedule, money, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const UPDOWN = ["rises", "falls", "stays the same", "is uncertain"];

concept("econ.markets.price-changes", { file: "markets/price-changes", keyPrefix: "markets.price-changes" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The demand for a good increases while supply is unchanged. What happens to the equilibrium price and quantity?",
    options: [
      ["Price rises and quantity rises", "Correct: D shifts right; the shortage at the old price pushes price up and supply extends."],
      ["Price rises and quantity falls", "This is the effect of a decrease in supply."],
      ["Price falls and quantity rises", "This is the effect of an increase in supply."],
      ["Price falls and quantity falls", "This is the effect of a decrease in demand."],
    ],
    answer: "A",
    explanation: "An increase in demand creates a shortage at the old price; the price rises and quantity supplied extends to a new, higher equilibrium quantity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Good rains produce a very large maize harvest. What is the most likely effect on the market for maize?",
    options: [
      ["Price falls and quantity traded rises", "Correct: supply increases (shift right), creating a surplus at the old price."],
      ["Price rises and quantity traded rises", "Price and quantity rise together after an increase in demand, not supply."],
      ["Price falls and quantity traded falls", "This follows a decrease in demand."],
      ["Price rises and quantity traded falls", "This follows a decrease in supply, such as a drought."],
    ],
    answer: "A",
    explanation: "A bumper harvest increases supply. At the old price there is a surplus, so the price falls and demand extends to a larger quantity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A health report warns that a popular brand of fizzy drink is harmful. Other things being equal, the price and sales of the drink will",
    options: [
      ["both fall.", "Correct: demand decreases (shift left), creating a surplus; price falls and supply contracts."],
      ["both rise.", "Both rise only after an increase in demand."],
      ["fall and rise respectively.", "Price falls with higher sales after an increase in supply."],
      ["rise and fall respectively.", "Price rises with lower sales after a decrease in supply."],
    ],
    answer: "A",
    explanation: "A change in tastes against the drink decreases demand: price and quantity both fall.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The government places a new tax on every litre of petrol sold. Which describes the effect on the petrol market?",
    options: [
      ["Supply decreases; price rises and quantity falls", "Correct: the tax raises suppliers' costs, shifting S left."],
      ["Demand decreases; price falls and quantity falls", "The tax is collected from sellers, so it shifts supply, not demand."],
      ["Supply increases; price falls and quantity rises", "A tax raises costs, so supply decreases."],
      ["Demand increases; price rises and quantity rises", "Nothing makes consumers want more petrol at every price."],
    ],
    answer: "A",
    hints: ["Does the tax change producers' costs or consumers' wants?"],
    explanation: "An indirect tax shifts supply left: shortage at the old price, price rises, demand contracts to a lower quantity.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a market, demand decreases and at the same time supply increases. Which is certain?",
    options: [
      ["The equilibrium price falls", "Correct: both shifts push the price down."],
      ["The equilibrium quantity falls", "Demand falling lowers quantity, but supply rising raises it: uncertain."],
      ["The equilibrium quantity rises", "This depends on which shift is larger."],
      ["The equilibrium price rises", "Both shifts push the price down, so it cannot rise."],
    ],
    answer: "A",
    hints: ["Work out the effect of each shift on price separately.", "Then do the same for quantity."],
    explanation: "Demand decrease: price ↓, quantity ↓. Supply increase: price ↓, quantity ↑. Price certainly falls; the change in quantity depends on the relative sizes of the shifts.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Mobile phones and airtime are complements. A new factory greatly reduces the cost of making mobile phones. What is the most likely effect in the market for **airtime**?",
    options: [
      ["Price of airtime rises and quantity rises", "Correct: cheaper phones mean more phone users, so demand for airtime increases."],
      ["Price of airtime falls and quantity rises", "This would follow an increase in the supply of airtime."],
      ["Price of airtime falls and quantity falls", "Demand for airtime increases, it does not decrease."],
      ["There is no change in the airtime market", "Markets for complements are linked through demand."],
    ],
    answer: "A",
    hints: ["First find what happens in the phone market.", "Then ask how that changes the demand for the complement."],
    explanation: "Phone market: supply increases, price of phones falls, more phones sold. Airtime market: demand increases (shift right), so price and quantity of airtime both rise.",
  });

  // Schedules for numeric items.
  const p = [2, 2.5, 3, 3.5, 4], qd = [835, 755, 675, 595, 515], s1 = [515, 595, 675, 755, 835], s2 = [675, 755, 835, 915, 995];
  const A = schedule({ prices: p, qd, qs: s1, requireEquilibrium: true });
  const Bm = schedule({ prices: p, qd, qs: s2, requireEquilibrium: true });
  check("A", A.equilibrium.price, 3);
  check("B", Bm.equilibrium.price, 2.5);
  const t = schedule({ prices: p, qd, qs: s1, priceHeader: "Price per kg (US\\$)", qdHeader: "D (kg per day)", qsHeader: "S1 (kg per day)", extra: [{ header: "S2 (kg per day)", values: s2 }] }).md;
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `A fictional market for fresh fish from Lake Kariba has the schedules below. New fishing co-operatives start work, and supply moves from S1 to S2.\n\n${t}\n\nWhat is the new equilibrium price?`,
    options: [
      ["US\\$2.50", `Correct: at US\\$2.50 quantity demanded (${qd[1]}) equals S2 (${s2[1]}).`],
      ["US\\$3.00", "US\\$3.00 was the old equilibrium with S1."],
      ["US\\$2.00", `At US\\$2.00 demand is ${qd[0]} but S2 is ${s2[0]}: a shortage.`],
      ["US\\$3.50", `At US\\$3.50 S2 is ${s2[3]} but demand is ${qd[3]}: a surplus.`],
    ],
    answer: "A",
    hints: ["Use the D column with the S2 column.", "Find the row where they are equal."],
    explanation: `Old equilibrium (D = S1): US\\$3.00, ${A.equilibrium.quantity} kg. New equilibrium (D = S2): **US\\$2.50, ${Bm.equilibrium.quantity} kg**: supply increased, so price fell and quantity rose.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: 1615 - 1240,
    stem: "In a fictional market for bicycles the equilibrium price is US\\$90, with 1,240 bicycles a month bought and sold. Cheaper imported parts then increase supply, so that 1,615 bicycles a month are offered at US\\$90. Demand does not change. How large is the surplus at US\\$90, in bicycles a month?",
    wrong: [1615, 1615 + 1240],
    hints: ["Surplus = quantity supplied − quantity demanded at that price.", "Demand has not changed, so 1,240 are still demanded at US\\$90."],
    explanation: "Surplus = 1,615 − 1,240 = **375 bicycles** a month. The surplus pushes the price down until a new, lower equilibrium price is reached with more bicycles sold.",
  });
  const r1 = 4.5 * 2200, r2 = 3.75 * 2480;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: r2 - r1, calculator: true,
    stem: "After a new mill opens, the equilibrium in a fictional market for 10 kg bags of maize meal moves from US\\$4.50 and 2,200 bags a week to US\\$3.75 and 2,480 bags a week. Calculate the change in total weekly spending on maize meal. Give a fall as a negative number.",
    wrong: [-(r2 - r1), r2],
    hints: ["Spending = price × quantity at each equilibrium.", "Change = new − old."],
    explanation: `1. Old spending = 4.50 × 2,200 = ${money(r1)}.
2. New spending = 3.75 × 2,480 = ${money(r2)}.
3. Change = ${money(r2)} − ${money(r1)} = **${money(r2 - r1)}** a week (a fall of ${money(r1 - r2)}). The lower price outweighs the extra quantity sold.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A decrease in supply, with demand unchanged, leads to a higher equilibrium price and a lower equilibrium quantity.",
    answer: true,
    explanation: "True. S shifts left; a shortage at the old price pushes the price up and demand contracts to a smaller quantity.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "If demand and supply both increase, the equilibrium price must rise.",
    answer: false,
    hints: ["Consider the effect of each shift on price separately."],
    explanation: "False. The demand increase pushes price up but the supply increase pushes it down; the price may rise, fall or stay the same. Quantity certainly rises.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each event in the market for **beef** to its effect on equilibrium price and quantity.",
    pairs: [
      ["A rise in consumers' incomes", "Price rises, quantity rises"],
      ["A fall in the price of chicken, a substitute", "Price falls, quantity falls"],
      ["A drought kills many cattle", "Price rises, quantity falls"],
      ["Cheaper animal feed lowers ranchers' costs", "Price falls, quantity rises"],
    ],
    hints: ["Decide first whether each event shifts demand or supply, and in which direction."],
    explanation: "Income up: D right. Cheaper substitute: D left. Drought: S left. Lower costs: S right.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "When new firms enter a market, supply {{blank:a}}. At the old price there is a {{blank:b}}, so the price {{blank:c}} and quantity demanded {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases", "extends", "contracts"] },
      { id: "b", accepted: ["surplus"], choices: ["surplus", "shortage"] },
      { id: "c", accepted: ["falls"], choices: ["rises", "falls"] },
      { id: "d", accepted: ["extends"], choices: ["increases", "decreases", "extends", "contracts"] },
    ],
    wrong: [["extends", "shortage", "rises", "increases"]],
    hints: ["Shifts are increases/decreases; movements are extensions/contractions."],
    explanation: "More firms → supply increases (shift right) → surplus at the old price → price falls → quantity demanded extends along D.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain the effect of a rise in the price of fertiliser on the equilibrium price and quantity of maize.",
    points: [
      "Fertiliser is a cost of producing maize, so costs rise.",
      "Supply of maize decreases: the supply curve shifts to the left.",
      "At the old price there is a shortage, so the price rises.",
      "Demand contracts along D: equilibrium quantity falls (price higher, quantity lower).",
    ],
    modelAnswer: "Fertiliser is an input into maize farming, so its higher price raises farmers' costs. Farmers supply less maize at every price: supply decreases and the curve shifts left. At the old price there is now a shortage, so the price of maize rises. As it rises, consumers buy less (a contraction of demand) until a new equilibrium is reached at a higher price and a lower quantity.",
    hints: ["Which side of the market does fertiliser affect?"],
    explanation: "Cost ↑ → S left → shortage → price ↑ → quantity ↓.",
  });

  // Structured 1: new equilibrium from schedules (demand shift).
  const pp = [8, 10, 12, 14, 16], dd1 = [570, 510, 450, 390, 330], dd2 = [390, 330, 270, 210, 150], ss = [210, 330, 450, 570, 690];
  const E1 = schedule({ prices: pp, qd: dd1, qs: ss, requireEquilibrium: true });
  const E2 = schedule({ prices: pp, qd: dd2, qs: ss, requireEquilibrium: true });
  check("surplus", ss[2] - dd2[2], 180);
  check("E1", E1.equilibrium.price, 12); check("E2", E2.equilibrium.price, 10);
  const tt = schedule({ prices: pp, qd: dd1, qs: ss, priceHeader: "Price per ticket (US\\$)", qdHeader: "D1 (tickets per week)", qsHeader: "S (tickets per week)", extra: [{ header: "D2 (tickets per week)", values: dd2 }] }).md;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `Bus companies run services between two fictional towns. A new tarred road shortens the journey for private cars, and many travellers start to share lifts instead of taking the bus. The table shows the weekly market for bus tickets before (D1) and after (D2) the new road.\n\n${tt}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: E1.equilibrium.price, stem: "State the original equilibrium price.", wrong: [E2.equilibrium.price], explanation: `D1 = S at US\\$${E1.equilibrium.price} (${E1.equilibrium.quantity} tickets).` }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: ss[2] - dd2[2], stem: "After demand changes to D2, calculate the surplus at the original equilibrium price (tickets per week).", wrong: [dd2[2]], explanation: `At US\\$12: S = ${ss[2]}, D2 = ${dd2[2]}; surplus = ${ss[2] - dd2[2]} tickets.` }),
      P.num({ label: "(c)", marks: 1, kind: "plain", value: E2.equilibrium.quantity, stem: "State the new equilibrium quantity (tickets per week).", wrong: [E1.equilibrium.quantity], explanation: `D2 = S at US\\$${E2.equilibrium.price} with ${E2.equilibrium.quantity} tickets.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: E2.equilibrium.price * E2.equilibrium.quantity - E1.equilibrium.price * E1.equilibrium.quantity, stem: "Calculate the change in the bus companies' total weekly revenue. Give a fall as a negative number.", wrong: [E1.equilibrium.price * E1.equilibrium.quantity - E2.equilibrium.price * E2.equilibrium.quantity, E2.equilibrium.price * E2.equilibrium.quantity], explanation: `Old: 12 × ${E1.equilibrium.quantity} = ${money(E1.equilibrium.price * E1.equilibrium.quantity)}. New: 10 × ${E2.equilibrium.quantity} = ${money(E2.equilibrium.price * E2.equilibrium.quantity)}. Change = ${money(E2.equilibrium.price * E2.equilibrium.quantity - E1.equilibrium.price * E1.equilibrium.quantity)}.` }),
      P.manual({
        label: "(e)", marks: 3,
        stem: "Describe the diagram that shows the change in the bus-ticket market.",
        points: [
          "Axes labelled price (vertical) and tickets per week (horizontal); D1 and S crossing at US\\$12 and 440.",
          "D2 to the left of D1 (decrease in demand).",
          "New equilibrium where D2 meets S at US\\$10 and 330 tickets (movement down along S: contraction of supply).",
        ],
        modelAnswer: "Price on the vertical axis, tickets per week on the horizontal axis. D1 and S cross at US\\$12 and 450 tickets. D2 lies to the left of D1. It crosses S at US\\$10 and 330 tickets; the move from 450 to 330 along S is a contraction of supply.",
        explanation: "Axes, the leftward shift and both equilibria.",
      }),
      P.manual({
        label: "(f)", marks: 4,
        stem: "Explain why the equilibrium price and quantity of bus tickets changed.",
        points: [
          "Lift-sharing in private cars is a substitute for bus travel, now quicker and more attractive.",
          "Demand for bus tickets decreases: D shifts left (fewer tickets wanted at every price).",
          "At US\\$12 there is a surplus of seats, so bus companies cut fares.",
          "Supply contracts and demand extends along D2 until the new equilibrium at a lower price and quantity.",
        ],
        modelAnswer: "The new road makes car travel quicker, so lift-sharing, a substitute for the bus, becomes more attractive. Demand for bus tickets decreases at every price and the demand curve shifts left. At the old fare of US\\$12 the companies now have 180 unsold seats a week, so they cut fares. As fares fall, companies offer fewer seats and travellers buy a few more, until a new equilibrium is reached at US\\$10 and 330 tickets.",
        explanation: "Cause → shift → surplus → price falls → movements along curves → new equilibrium.",
      }),
    ],
    hints: ["Find the old equilibrium with D1 and S, then the new one with D2 and S.", "Revenue = price × quantity."],
    explanation: "A decrease in demand lowers both price and quantity; revenue falls.",
  });

  // Structured 2: two shifts, discuss.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country, a successful campaign persuades many households to switch from firewood to solar cookers. At the same time, two new firms begin assembling solar cookers locally.",
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Complete the sentence about the market for solar cookers.",
        template: "The equilibrium quantity of solar cookers {{blank:a}}, but the effect on the equilibrium price {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["rises"], choices: UPDOWN },
          { id: "b", accepted: ["is uncertain"], choices: UPDOWN },
        ],
        wrong: [["rises", "rises"]],
        explanation: "Demand increases (price ↑, quantity ↑) and supply increases (price ↓, quantity ↑): quantity certainly rises; price depends on the relative shifts.",
      }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the price of solar cookers is likely to rise or fall.",
        points: [
          "Explains that the increase in demand (campaign, tastes) pushes the price up.",
          "Explains that the increase in supply (new firms) pushes the price down.",
          "Argues the price rises if the demand increase is larger (e.g. the campaign is very successful, many households switch).",
          "Argues the price falls if the supply increase is larger (e.g. local assembly lowers costs, competition between firms).",
          "Considers time: supply may take longer to expand, so price may rise at first and fall later.",
          "Reaches a justified conclusion on what the outcome depends on.",
        ],
        modelAnswer: "The campaign increases demand for solar cookers, shifting demand right and pushing the price up. The new local firms increase supply, shifting supply right and pushing the price down. If many households switch quickly, the demand shift may be larger and the price would rise. But local assembly may cut transport and import costs, and competition between firms keeps prices down, so the supply shift may be larger and the price would fall. In the short run, demand may rise faster than the new firms can produce, so prices may rise at first, then fall as the firms expand. Overall the quantity sold will rise; the price will probably rise at first and then fall as supply catches up, but this depends on the relative size of the two shifts.",
        explanation: "Analyse both shifts, consider their relative size and timing, and conclude.",
      }),
    ],
    hints: ["Take each event separately, then combine.", "What does the outcome for price depend on?"],
    explanation: "When both demand and supply increase, quantity rises for certain; the price change depends on which shift is larger.",
  });

  b.card("FACT", "Effect of an **increase in demand** on equilibrium?", "Price rises and quantity rises (shortage at the old price).");
  b.card("FACT", "Effect of a **decrease in demand** on equilibrium?", "Price falls and quantity falls (surplus at the old price).");
  b.card("FACT", "Effect of an **increase in supply** on equilibrium?", "Price falls and quantity rises (surplus at the old price).");
  b.card("FACT", "Effect of a **decrease in supply** on equilibrium?", "Price rises and quantity falls (shortage at the old price).");
  b.card("CONCEPT", "Pattern for demand shifts versus supply shifts?", "Demand shifts move price and quantity in the same direction; supply shifts move them in opposite directions.");
  b.card("CONCEPT", "If demand and supply both increase, what is certain?", "Quantity rises; the effect on price is uncertain (depends on the relative shifts).");
  b.card("CONCEPT", "Four steps to analyse a price change?", "Identify demand or supply; direction of shift; shortage or surplus at the old price; adjustment to the new equilibrium.");
  b.card("FORMULA", "How do you find the change in spending after a price change?", "New price × new quantity − old price × old quantity.");
});
