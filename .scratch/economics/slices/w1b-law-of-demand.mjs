// W1b: econ.demand.law-of-demand — demand, effective and latent demand, the law of demand, schedules, market demand.
import { concept, P, schedule, marketSum, money, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.demand.law-of-demand", { file: "demand/law-of-demand", keyPrefix: "demand.law-of-demand" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best defines **demand** in economics?",
    options: [
      ["The quantity consumers are willing and able to buy at each price over a period", "Correct: demand needs willingness, ability to pay, a price and a time period."],
      ["The quantity of a good that consumers would like to own at some time in the future", "A wish without the ability to pay is latent demand, and there is no price or time period."],
      ["The quantity of a good that firms offer for sale at each price", "That is supply, the producers' side of the market."],
      ["The total amount of money consumers spend on a good in a year", "Spending is price × quantity; demand is a quantity at each price."],
    ],
    answer: "A",
    explanation: "Demand is the quantity of a good or service that consumers are **willing and able** to buy at each possible price over a given period of time.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the **law of demand** state?",
    options: [
      ["Other things equal, a rise in price leads to a fall in quantity demanded", "Correct: price and quantity demanded are inversely related."],
      ["Other things equal, a rise in price leads to a rise in quantity demanded", "This reverses the relationship; it describes the law of supply."],
      ["A rise in income always leads to a rise in quantity demanded", "Income is a condition of demand that shifts the curve; the law of demand is about the good's own price."],
      ["Demand and supply are always equal at the market price", "That describes equilibrium, not the law of demand."],
    ],
    answer: "A",
    explanation: "The law of demand: other things being equal (ceteris paribus), as the price of a good rises the quantity demanded falls, and as it falls the quantity demanded rises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Thandeka would like to buy a laptop for her studies but has no income or savings to pay for one. Her desire for a laptop is an example of",
    options: [
      ["latent demand.", "Correct: a desire not backed by the ability to pay is latent (potential) demand."],
      ["effective demand.", "Effective demand must be backed by the ability to pay, which Thandeka does not have."],
      ["market demand.", "Market demand is the total quantity all consumers are willing and able to buy at each price."],
      ["a contraction of demand.", "A contraction is a fall in quantity demanded caused by a rise in the good's own price."],
    ],
    answer: "A",
    explanation: "Latent demand is a want that is not yet backed by money. It becomes effective demand if Thandeka's income rises or the price falls far enough for her to afford a laptop.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A demand curve is drawn with price on the vertical axis and quantity demanded on the horizontal axis. How does it normally slope?",
    options: [
      ["Downwards from left to right", "Correct: higher prices go with smaller quantities demanded."],
      ["Upwards from left to right", "An upward slope is the normal shape of a supply curve."],
      ["It is a vertical straight line", "A vertical line would mean quantity demanded never changes with price."],
      ["It is a horizontal straight line", "A horizontal line would mean one price for every quantity; that is a special case, not the normal demand curve."],
    ],
    answer: "A",
    explanation: "Because price and quantity demanded are inversely related, the demand curve slopes downwards from left to right.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The price of a 2 kg packet of sugar falls and, other things being equal, shoppers in Mutare buy more sugar. How is this shown on a demand diagram?",
    options: [
      ["A movement down along the demand curve", "Correct: a change in the good's own price causes a movement along the curve, an extension of demand."],
      ["A shift of the demand curve to the right", "A shift is caused by a change in a condition of demand such as income, not by the good's own price."],
      ["A shift of the demand curve to the left", "A leftward shift is a decrease in demand at every price, caused by a non-price factor."],
      ["A movement up along the demand curve", "Moving up the curve means a higher price and a smaller quantity: a contraction."],
    ],
    answer: "A",
    explanation: "A lower own price leads to a larger quantity demanded: a movement down along the existing demand curve, called an **extension** of demand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which reason helps to explain why consumers buy more of a good when its price falls?",
    options: [
      ["The good becomes cheaper relative to its substitutes", "Correct: the substitution effect leads consumers to switch towards the cheaper good."],
      ["Firms are willing to supply more at the lower price", "At a lower price firms supply less, and supply does not explain consumers' choices."],
      ["Consumers' money incomes rise when prices fall", "Money incomes do not change; it is real purchasing power that rises (the income effect)."],
      ["The good becomes more fashionable when it is cheaper", "Tastes are a condition of demand that is held constant; a lower price does not change fashion."],
    ],
    answer: "A",
    explanation: "Two main reasons: the **substitution effect** (the good is now cheaper than its substitutes) and the **income effect** (the same income buys more). Lower prices also bring in new buyers whose demand was latent.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The table shows the weekly demand for bus tickets from Kariba to Harare by three travellers. Every other traveller in the market buys no tickets.\n\n| Price per ticket (US\\$) | Tatenda | Chipo | Sipho |\n| --- | ---: | ---: | ---: |\n| 10 | 3 | 2 | 1 |\n| 12 | 2 | 2 | 1 |\n| 14 | 2 | 1 | 0 |\n\nWhat is the market quantity demanded at US\\$12?",
    options: [
      ["5 tickets", "Correct: 2 + 2 + 1 = 5 tickets a week at US\\$12."],
      ["6 tickets", "6 is the market quantity at US\\$10 (3 + 2 + 1), not at US\\$12."],
      ["3 tickets", "3 is the market quantity at US\\$14 (2 + 1 + 0)."],
      ["36 tickets", "This adds the prices (10 + 12 + 14); market demand adds quantities at one price."],
    ],
    answer: "A",
    hints: ["Market demand adds the quantities of every consumer at the same price.", "Read across the US\\$12 row."],
    explanation: "Market demand is the horizontal sum of individual demands: at US\\$12, 2 + 2 + 1 = **5 tickets** a week.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which change would turn some **latent** demand for solar lamps in a rural district into **effective** demand?",
    options: [
      ["A fall in the price of solar lamps", "Correct: at a lower price some people who wanted a lamp can now afford one."],
      ["An advertising campaign that makes the lamps more popular", "Advertising increases the desire; it does not give people the money to pay."],
      ["A rise in the price of paraffin for lamps", "This raises the desire to switch, but people still need the ability to pay for the solar lamp."],
      ["A fall in household incomes in the district", "Lower incomes reduce the ability to pay, so less demand is effective."],
    ],
    answer: "A",
    hints: ["Effective demand needs willingness **and** ability to pay.", "Which option gives more people the ability to pay?"],
    explanation: "Latent demand becomes effective when consumers become **able** to pay: a lower price (or a higher income) does this. Advertising and dearer substitutes raise willingness, not ability to pay.",
  });

  // Numerical: market demand from three individual schedules (data bundles).
  const prices = [1, 2, 3, 4];
  const N = [6, 4, 3, 1], S = [5, 4, 2, 2], C = [3, 2, 2, 1];
  const M = marketSum([N, S, C]);
  for (const q of [N, S, C, M]) schedule({ prices, qd: q });
  const tbl = schedule({ prices, qd: N, priceHeader: "Price per bundle (US\\$)", qdHeader: "Nyasha", extra: [{ header: "Sipho", values: S }, { header: "Chipo", values: C }] }).md;
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: M[2], daily: false,
    stem: `The table shows how many mobile data bundles three students buy each week at different prices.\n\n${tbl}\n\nIf these three students make up the whole market, what is the market quantity demanded at US\\$3 per bundle?`,
    wrong: [M[1], 3 + 2 + 2 + 3],
    explanation: `At US\\$3: Nyasha 3 + Sipho 2 + Chipo 2 = **${M[2]} bundles** a week. ${M[1]} is the total at US\\$2.`,
  });
  // Numerical: identical households.
  const hh = 320, q1 = 2.5, q2 = 1.5;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: hh * (q1 - q2),
    stem: `A fictional town has ${hh} households with identical demand for paraffin. Each household buys ${q1} litres a week when the price is US\\$1.50 a litre and ${q2} litres a week when the price is US\\$2.00 a litre. By how many litres a week does the **market** quantity demanded fall when the price rises from US\\$1.50 to US\\$2.00?`,
    wrong: [q1 - q2, hh * q1],
    hints: ["Find the market quantity at each price first: number of households × quantity per household.", "Then subtract."],
    explanation: `1. Market quantity at US\\$1.50 = ${hh} × ${q1} = ${hh * q1} litres.\n2. Market quantity at US\\$2.00 = ${hh} × ${q2} = ${hh * q2} litres.\n3. Fall = ${hh * q1} − ${hh * q2} = **${hh * (q1 - q2)} litres a week** (a contraction of demand). The answer 1 is the change for one household only.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "On a demand diagram, price is shown on the vertical axis and quantity demanded on the horizontal axis.",
    answer: true,
    explanation: "True. Economists always put price on the vertical (y) axis and quantity per period on the horizontal (x) axis.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A rise in the price of tomatoes, other things being equal, shifts the demand curve for tomatoes to the left.",
    answer: false,
    explanation: "False. A change in the good's **own price** causes a movement **along** the demand curve (a contraction), not a shift. Shifts are caused by other factors such as income or the prices of related goods.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Effective demand", "A desire for a good backed by the ability to pay"],
      ["Latent demand", "A desire for a good that consumers cannot yet afford"],
      ["Market demand", "The sum of all individual demands at each price"],
      ["Extension of demand", "A rise in quantity demanded caused by a fall in the good's own price"],
    ],
    explanation: "Effective demand is backed by money; latent demand is not (yet). Market demand adds every consumer's quantity at each price. An extension is a movement down along the demand curve after the price falls.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "When the price of maize meal rises, other things being equal, the quantity demanded {{blank:a}}. This is shown as a movement {{blank:b}} the demand curve, called a {{blank:c}} of demand.",
    blanks: [
      { id: "a", accepted: ["falls"], choices: ["rises", "falls", "stays the same"] },
      { id: "b", accepted: ["along"], choices: ["along", "of"] },
      { id: "c", accepted: ["contraction"], choices: ["contraction", "extension", "decrease"] },
    ],
    wrong: [["rises", "of", "decrease"]],
    explanation: "A higher own price reduces the quantity demanded: a movement up **along** the curve, called a **contraction**. A *decrease* in demand is a leftward shift caused by a non-price factor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between **effective demand** and **latent demand**.",
    points: [
      "Effective demand is a want backed by the ability (money) to pay at the market price.",
      "Latent demand is a want that cannot yet be paid for / not backed by money (it may become effective if income rises or price falls).",
    ],
    modelAnswer: "Effective demand is a desire for a good that the consumer can actually pay for at the current price, so it results in purchases. Latent demand is a desire that is not backed by the ability to pay, so no purchase is made unless incomes rise or the price falls.",
    hints: ["Think about the ability to pay."],
    explanation: "The difference is the **ability to pay**: only effective demand appears in a demand schedule.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the quantity demanded of a good usually rises when its price falls.",
    points: [
      "Identifies the substitution effect: the good becomes cheaper relative to substitutes.",
      "Develops: so consumers switch from substitutes to this good, raising quantity demanded.",
      "Identifies the income effect: a lower price raises consumers' real income / purchasing power.",
      "Develops: so they can afford to buy more units of the good (or new buyers can now afford it).",
    ],
    modelAnswer: "First, the substitution effect: when the price of bread falls it becomes cheaper than buns and porridge, so some consumers switch to bread and buy more of it. Second, the income effect: the lower price means the same income now buys more, so households can afford more loaves, and some people who could not afford bread before can now buy it.",
    hints: ["One reason is about substitutes; another is about what a fixed income can buy."],
    explanation: "Each reason earns 1 mark for identifying it and 1 for explaining how it raises quantity demanded.",
  });

  // Structured 1: identical households, market schedule, movement along the curve.
  const n2 = 400, p = [3, 4, 5, 6], one = [3, 2.5, 2, 1.5];
  const mk = one.map((x) => x * n2);
  const s1 = schedule({ prices: p, qd: one, priceHeader: "Price per 2-litre bottle (US\\$)", qdHeader: "Bottles per month (one household)" });
  check("mk", mk[2], 800);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: `A fictional town near Masvingo has ${n2} households, each with the same demand for cooking oil. The table shows the demand of one household.\n\n${s1.md}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: mk[2], stem: "Calculate the market quantity demanded per month at US\\$5.", wrong: [one[2]], explanation: `${n2} × ${one[2]} = ${mk[2]} bottles a month.` }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: mk[1] - mk[3], stem: "By how many bottles a month does the market quantity demanded fall when the price rises from US\\$4 to US\\$6?", wrong: [one[1] - one[3], mk[3]], explanation: `At US\\$4: ${n2} × ${one[1]} = ${mk[1]}; at US\\$6: ${n2} × ${one[3]} = ${mk[3]}. Fall = ${mk[1]} − ${mk[3]} = ${mk[1] - mk[3]} bottles.` }),
      P.fib({
        label: "(c)", marks: 2, stem: "Complete the sentence.",
        template: "The price rise from US\\$4 to US\\$6 causes a {{blank:a}} of demand, shown as a movement {{blank:b}} the demand curve.",
        blanks: [
          { id: "a", accepted: ["contraction"], choices: ["contraction", "extension", "decrease", "increase"] },
          { id: "b", accepted: ["up along"], choices: ["up along", "down along", "to the left of", "to the right of"] },
        ],
        wrong: [["decrease", "to the left of"]],
        explanation: "A rise in the good's own price reduces quantity demanded: a contraction, a movement up along the same curve.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Describe the market demand diagram you would draw from this data, showing the change in (b).",
        points: [
          "Price (US\\$) on the vertical axis and quantity demanded (bottles per month) on the horizontal axis.",
          "A demand curve labelled D sloping downwards from left to right (through the market points, e.g. 1,200 at US\\$3 and 600 at US\\$6).",
          `Marks the starting point P = US\\$4, Q = ${mk[1]}.`,
          `Shows a movement up along the same curve to P = US\\$6, Q = ${mk[3]} (no shift).`,
        ],
        modelAnswer: `Price on the vertical axis, quantity of bottles per month on the horizontal axis. A straight demand curve D slopes down from (US\\$6, ${mk[3]}) to (US\\$3, ${mk[0]}). The price rises from US\\$4 to US\\$6 and the point moves up along D from ${mk[1]} bottles to ${mk[3]} bottles; the curve does not shift.`,
        explanation: "A diagram description earns marks for correct axes, the correct slope, and the old and new points on the same curve.",
      }),
    ],
    hints: ["Market demand = number of households × one household's quantity.", "A change in the good's own price never shifts its demand curve."],
    explanation: "The market schedule is found by multiplying each household quantity by 400. The price rise is a movement along the curve (a contraction).",
  });

  // Structured 2: effective and latent demand; discuss.
  const lamp = [40, 30, 20], buyers = [150, 260, 410];
  const s2 = schedule({ prices: lamp, qd: buyers, priceHeader: "Price of a solar lamp (US\\$)", qdHeader: "Lamps bought per year in the district" });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: `A firm sells solar lamps in a fictional rural district of 2,000 households, many without electricity. A survey found that most households would like a lamp but only a few can afford one. The table shows estimated demand for lamps.\n\n${s2.md}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "At a price of US\\$40, which households' desire for a lamp counts as **effective demand**?",
        options: [
          ["The 150 households that buy at that price", "Correct: they are willing and able to pay US\\$40."],
          ["All 2,000 households in the district", "Many of them cannot afford a lamp, so their demand is latent."],
          ["The households that would buy only at US\\$20", "At US\\$40 they cannot or will not pay, so for them it is latent demand."],
          ["Only households that already have electricity", "Effective demand depends on ability and willingness to pay, not on electricity."],
        ],
        answer: "A",
        explanation: "Effective demand at US\\$40 is the 150 lamps households are willing and able to buy at that price.",
      }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: buyers[2] - buyers[0], stem: "By how many lamps a year would quantity demanded rise if the price fell from US\\$40 to US\\$20?", wrong: [buyers[2]], explanation: `${buyers[2]} − ${buyers[0]} = ${buyers[2] - buyers[0]} lamps a year (an extension of demand).` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the data, explain how a fall in price turns latent demand into effective demand.",
        points: [
          "Latent demand is a desire not backed by the ability to pay.",
          "A lower price means households with limited income can now afford a lamp.",
          `Uses data: quantity rises from ${buyers[0]} at US\\$40 to ${buyers[2]} at US\\$20.`,
          "So more of the existing desire is now backed by money and becomes effective (an extension along the demand curve).",
        ],
        modelAnswer: `Most households want a lamp but cannot afford one at US\\$40, so their demand is latent. When the price falls to US\\$20 the lamp costs less of their income, so more households are able to pay: purchases rise from ${buyers[0]} to ${buyers[2]} a year. Their desire is now backed by money, so it has become effective demand; this is shown as an extension along the demand curve.`,
        explanation: "Credit the definition, the ability-to-pay mechanism, the data and the link to effective demand.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether the firm should cut the price of its lamps to US\\$20.",
        points: [
          `For: quantity demanded more than doubles (from ${buyers[0]} to ${buyers[2]}), bringing in buyers whose demand was latent.`,
          `For: total spending on lamps rises from ${money(lamp[0] * buyers[0])} to ${money(lamp[2] * buyers[2])}, so revenue rises.`,
          "Against: the firm earns less on each lamp, so profit depends on its costs per lamp (if a lamp costs more than US\\$20 to supply, each sale makes a loss).",
          "Against: the firm must be able to supply the extra lamps / the survey is only an estimate.",
          "Considers other ways to make demand effective, e.g. payment in instalments or mobile-money credit.",
          "Justified conclusion (e.g. cut the price only if US\\$20 still covers the cost of each lamp).",
        ],
        modelAnswer: `Cutting the price would turn much latent demand into effective demand: sales would rise from ${buyers[0]} to ${buyers[2]} lamps and revenue from ${money(lamp[0] * buyers[0])} to ${money(lamp[2] * buyers[2])}. However, the firm receives only US\\$20 per lamp; if each lamp costs more than that to buy in and deliver, higher sales mean bigger losses. The figures are only survey estimates, and the firm must be able to supply 410 lamps. It could instead offer instalments so that households pay over time. Conclusion: the price cut is sensible only if US\\$20 still covers the cost of each lamp; otherwise instalment payments may achieve the same rise in effective demand without cutting the price.`,
        explanation: "A top-level answer weighs higher sales and revenue against the lower price per lamp and costs, and reaches a justified conclusion.",
      }),
    ],
    hints: ["Effective demand = willing and able to pay.", "Revenue = price × quantity; compare it at both prices, then think about costs."],
    explanation: "The data show the law of demand: as the price falls, quantity demanded rises because more households can afford a lamp.",
  });

  b.card("DEFINITION", "Define **demand**.", "The quantity of a good or service that consumers are willing and able to buy at each possible price over a given period of time.");
  b.card("DEFINITION", "What is **effective demand**?", "A want for a good backed by the ability to pay for it.");
  b.card("DEFINITION", "What is **latent (potential) demand**?", "A desire for a good that consumers cannot yet pay for; it may become effective if incomes rise or the price falls.");
  b.card("DEFINITION", "State the **law of demand**.", "Other things being equal, as price rises quantity demanded falls, and as price falls quantity demanded rises.");
  b.card("CONCEPT", "How does a demand curve slope, and why?", "Downwards from left to right, because price and quantity demanded are inversely related (income and substitution effects).");
  b.card("CONCEPT", "How is **market demand** found from individual demand?", "Add the quantities demanded by all consumers at each price (horizontal summation).");
  b.card("CONCEPT", "What does a change in a good's own price do on a demand diagram?", "It causes a movement along the demand curve: an extension (price falls) or a contraction (price rises).");
  b.card("FACT", "Which axis shows price on a demand diagram?", "The vertical axis; quantity demanded per period is on the horizontal axis.");
  b.card("CONCEPT", "What is the **substitution effect** of a price fall?", "The good becomes cheaper relative to its substitutes, so consumers switch towards it and buy more.");
});
