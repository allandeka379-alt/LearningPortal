// W1b: econ.elasticity.ped-determinants — what makes demand elastic or inelastic.
import { concept, P, elasticity, table } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const f2 = (v) => v.toFixed(2).replace("-", "−");

concept("econ.elasticity.ped-determinants", { file: "elasticity/ped-determinants", keyPrefix: "elasticity.ped-determinants" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which factor is usually the most important influence on the price elasticity of demand for a good?",
    options: [
      ["The availability of close substitutes", "Correct: the easier it is to switch, the more elastic the demand."],
      ["The cost of producing the good", "Costs affect supply, not how consumers respond to price."],
      ["The number of firms that produce it", "This matters only through the substitutes it gives consumers; it is not itself a determinant."],
      ["Whether the good is made locally or imported", "Origin does not directly decide consumers' responsiveness."],
    ],
    answer: "A",
    explanation: "Close substitutes let consumers switch when the price rises, making demand elastic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Demand for which good is most likely to be price **inelastic**?",
    options: [
      ["Salt", "Correct: a necessity, few substitutes and a tiny share of income."],
      ["One brand of washing powder", "Other brands are close substitutes, so demand is elastic."],
      ["A holiday at a lodge in Hwange", "A luxury that can be postponed, with alternatives: elastic."],
      ["Tickets for one particular kombi operator", "Other operators on the route are close substitutes."],
    ],
    answer: "A",
    explanation: "Salt is a necessity with no close substitute and takes a very small share of income, so demand is very inelastic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the demand for cigarettes usually price inelastic?",
    options: [
      ["They are habit-forming, so smokers keep buying when prices rise", "Correct: addiction makes consumers unresponsive to price."],
      ["They take a very large share of every household's income", "A large share of income would make demand more elastic."],
      ["They have many close substitutes", "Many substitutes would make demand elastic."],
      ["They are a luxury that people can easily give up", "If people could easily give them up, demand would be elastic."],
    ],
    answer: "A",
    explanation: "Habit and addiction make demand inelastic; this is one reason governments tax tobacco.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does demand for a good usually change over time after a large price rise?",
    options: [
      ["It becomes more elastic as consumers find substitutes", "Correct: time allows consumers to adjust."],
      ["It becomes less elastic as consumers get used to the price", "Consumers usually find more alternatives over time, not fewer."],
      ["It stays exactly the same", "Responsiveness usually grows as people adjust their behaviour."],
      ["It becomes perfectly inelastic", "Time makes demand more, not less, responsive."],
    ],
    answer: "A",
    explanation: "In the long run consumers can change habits, equipment and suppliers, so demand is more elastic than in the short run.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which is likely to have the **most elastic** demand?",
    options: [
      ["One supermarket's own brand of rice", "Correct: the narrowest market, with many close substitutes."],
      ["Food bought by households in general", "Food has no substitute: very inelastic."],
      ["Rice of every brand and grade", "Rice has some substitutes (maize meal), but fewer than a single brand."],
      ["All cereals, including maize meal", "A broad category with few substitutes outside it."],
    ],
    answer: "A",
    hints: ["The narrower the definition of the market, the more substitutes there are."],
    explanation: "Narrow definitions (one brand) have many close substitutes, so demand is the most elastic.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "School fees take a large share of many families' incomes. How does this affect the PED for a private school's places, other things equal?",
    options: [
      ["It makes demand more elastic", "Correct: a fee rise has a big effect on the budget, so parents look for alternatives."],
      ["It makes demand perfectly inelastic", "A large share of income makes consumers more, not less, responsive."],
      ["It makes demand less elastic", "Small shares of income make demand inelastic, not large ones."],
      ["It has no effect on PED", "The share of income is one of the determinants of PED."],
    ],
    hints: ["Think about how much a 10% fee rise costs the family compared with a 10% rise in the price of matches."],
    answer: "A",
    explanation: "The larger the share of income, the more noticeable a price rise, so demand tends to be more elastic.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Electricity prices rise sharply. Which change would make the demand for electricity **more elastic** over the following years?",
    options: [
      ["Solar panels and gas cookers become cheaper and easier to buy", "Correct: more substitutes become available, so consumers can switch."],
      ["More households buy electric stoves and fridges", "More appliances that need grid power make households more dependent on it."],
      ["Household incomes rise so electricity is a smaller share of spending", "A smaller share of income makes demand less elastic."],
      ["Electricity becomes more of a necessity for businesses", "Necessities have less elastic demand."],
    ],
    answer: "A",
    hints: ["Which option increases the availability of substitutes?"],
    explanation: "Cheaper substitutes (solar, gas) let consumers switch away from grid electricity, so demand becomes more elastic.",
  });

  // Calculations comparing brand and product.
  const eAll = elasticity.fromPct(-4, 8), eBrand = elasticity.fromPct(-20, 8);
  b.num({
    d: 2, skill: "APPLICATION", kind: "elasticity", value: eBrand,
    stem: "One fictional brand of toothpaste raises its price by 8% while other brands do not, and its sales fall by 20%. Calculate the PED for this brand. Include the minus sign and give your answer to two decimal places.",
    wrong: [1 / eBrand, -eBrand],
    explanation: `PED = −20 ÷ 8 = **${f2(eBrand)}**: elastic, because other brands are close substitutes.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "elasticity", value: eAll, daily: true,
    stem: "When the price of **all** toothpaste in a fictional country rises by 8%, total toothpaste sales fall by 4%. Calculate the PED for toothpaste as a whole. Include the minus sign and give your answer to two decimal places.",
    wrong: [1 / eAll, -eAll],
    explanation: `PED = −4 ÷ 8 = **${f2(eAll)}**: inelastic, because toothpaste in general has no close substitute.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Goods that take up a very small proportion of income tend to have price inelastic demand.",
    answer: true,
    explanation: "True. A price rise on a cheap item (matches, salt) hardly affects the budget, so consumers do not change how much they buy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The more close substitutes a good has, the more price inelastic its demand.",
    answer: false,
    explanation: "False. More close substitutes make demand more **elastic**, because consumers can switch.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each good with the main reason for the elasticity of its demand.",
    pairs: [
      ["Insulin for a diabetic patient", "Necessity with no substitute: inelastic"],
      ["A particular brand of fizzy drink", "Many close substitutes: elastic"],
      ["Alcohol", "Habit-forming: inelastic"],
      ["A new car", "Large share of income: more elastic"],
    ],
    hints: ["Think about substitutes, necessity, habit and share of income."],
    explanation: "Medicines needed to live and habit-forming goods have inelastic demand; single brands and big-ticket items tend to be more elastic.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Demand for necessities tends to be price {{blank:a}}, and demand for luxuries tends to be price {{blank:b}}. Demand is usually more elastic in the {{blank:c}} run.",
    blanks: [
      { id: "a", accepted: ["inelastic"], choices: ["elastic", "inelastic"] },
      { id: "b", accepted: ["elastic"], choices: ["elastic", "inelastic"] },
      { id: "c", accepted: ["long"], choices: ["short", "long"] },
    ],
    wrong: [["elastic", "inelastic", "short"]],
    explanation: "Necessities are bought regardless of price; luxuries can be postponed; consumers adjust more in the long run.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** reasons why the demand for maize meal in Zimbabwe is likely to be price inelastic.",
    points: [
      "Identifies: maize meal is a staple / necessity.",
      "Explains: households must keep buying it for daily meals even when the price rises.",
      "Identifies: few close substitutes (rice and bread are dearer or less preferred) / habit and tradition.",
      "Explains: consumers cannot easily switch, so quantity demanded falls only a little.",
    ],
    modelAnswer: "Maize meal is the staple food for most households, so it is a necessity: families need it for sadza every day and continue to buy it even when its price rises. It also has few close substitutes that are as cheap or as widely accepted, and eating sadza is a strong habit, so consumers do not switch easily. Quantity demanded therefore falls by a smaller percentage than the price rises.",
    hints: ["Think about necessity and substitutes."],
    explanation: "Each reason: identify (1) and explain how it makes consumers unresponsive (1).",
  });

  // Structured 1: data on PEDs for several goods.
  const rows = [["Bread", -0.3], ["Mobile data bundles (one network)", -1.8], ["Cinema tickets", -1.4], ["Electricity (short run)", -0.2]];
  const t = table(["Good", "Estimated PED"], rows.map(([g, v]) => [g, f2(v)]));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `The table shows estimated PEDs for four goods in a fictional town.\n\n${t}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which good has the most price elastic demand?",
        options: [["Mobile data bundles (one network)", "Correct: 1.8 is the largest value ignoring the sign."], ["Cinema tickets", "1.4 is elastic but smaller than 1.8."], ["Bread", "0.3 is inelastic."], ["Electricity (short run)", "0.2 is the least elastic."]],
        answer: "A",
        explanation: "Ignoring the sign, 1.8 is the largest PED.",
      }),
      P.short({ label: "(b)", marks: 1, stem: "Name the good whose demand is the **least** responsive to price.", accepted: ["Electricity", "Electricity (short run)", "electricity in the short run"], wrong: ["Bread"], explanation: "Electricity in the short run: 0.2." }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain why the demand for mobile data bundles from one network is elastic while the demand for electricity in the short run is inelastic.",
        points: [
          "Data bundles: other networks offer close substitutes.",
          "So a price rise makes customers switch networks; quantity falls by a larger percentage.",
          "Electricity: few close substitutes for lighting and running appliances.",
          "It is a necessity for households and firms.",
          "In the short run consumers cannot change their appliances or install alternatives.",
          "So quantity demanded falls by a smaller percentage than price.",
        ],
        modelAnswer: "Bundles from one network have close substitutes, because rival networks offer similar bundles and switching SIM cards is easy, so a price rise sends customers elsewhere and demand is elastic. Electricity has few close substitutes for lighting and running fridges or machines and is a necessity. In the short run households and firms cannot quickly replace their appliances or install solar, so they keep using it and demand is inelastic.",
        explanation: "Apply substitutes, necessity and time to each good.",
      }),
    ],
    hints: ["Compare the values ignoring the sign.", "Think about substitutes and time."],
    explanation: "The determinants explain the different PED values.",
  });

  // Structured 2: discussion of time and PED.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "The price of diesel in a fictional country rises by 25%. A transport firm runs a fleet of diesel lorries, and many households run small diesel generators during power cuts.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** reasons why the demand for diesel is likely to be inelastic in the short run.",
        points: [
          "Few close substitutes: lorries and generators cannot use other fuels.",
          "So users must keep buying diesel to keep operating.",
          "Necessity: transport firms need diesel to earn income / households need power.",
          "Time: in the short run users cannot replace their vehicles or generators.",
        ],
        modelAnswer: "Lorries and generators are built to run on diesel and there is no close substitute fuel, so users keep buying it. It is also a necessity for the transport firm's business, and in the short run neither the firm nor households can replace their equipment, so quantity demanded falls only a little.",
        explanation: "Two determinants, each applied.",
      }),
      P.manual({
        label: "(b)", marks: 8, levels: LV(8),
        stem: "Discuss whether the demand for diesel is likely to remain inelastic in the long run.",
        points: [
          "Over time households can buy solar systems and batteries instead of generators.",
          "Transport firms can replace old lorries with more fuel-efficient ones, or use rail.",
          "So more substitutes become available: demand becomes more elastic.",
          "However, lorries are expensive and last many years, so replacement is slow.",
          "Few practical alternatives for heavy road transport, so diesel remains a necessity for the firm.",
          "Diesel is a large share of a transport firm's costs, which encourages it to economise.",
          "Different users differ: households may become elastic faster than transport firms.",
          "Justified conclusion: more elastic in the long run, but probably still fairly inelastic for transport.",
        ],
        modelAnswer: "In the long run consumers can adjust. Households can replace diesel generators with solar panels and batteries, and the transport firm can buy more fuel-efficient lorries or send some freight by rail, so substitutes become available and demand becomes more elastic. Because diesel is a large part of the firm's costs, it has a strong reason to economise. However, lorries are costly and last many years, so replacement is slow, and for heavy road freight there is still no real substitute for diesel. Households are therefore likely to become quite responsive, while transport firms remain fairly unresponsive. Overall, demand will be more elastic in the long run than the short run, but it is likely to stay inelastic for road transport.",
        explanation: "Use the time determinant, consider both user groups and conclude.",
      }),
    ],
    hints: ["What can consumers change in a year that they cannot change in a week?"],
    explanation: "PED rises over time as substitutes become available, but slowly for goods tied to costly equipment.",
  });

  b.card("CONCEPT", "Most important determinant of PED?", "The availability of close substitutes: more substitutes, more elastic demand.");
  b.card("CONCEPT", "How does the share of income spent on a good affect PED?", "A small share makes demand inelastic; a large share makes it more elastic.");
  b.card("CONCEPT", "Necessities versus luxuries: which has more elastic demand?", "Luxuries; demand for necessities is inelastic.");
  b.card("CONCEPT", "Effect of habit or addiction on PED?", "Demand becomes inelastic (e.g. cigarettes, alcohol).");
  b.card("CONCEPT", "Effect of time on PED?", "Demand becomes more elastic in the long run as consumers find substitutes.");
  b.card("CONCEPT", "How does the definition of the market affect PED?", "The narrower the definition (one brand), the more substitutes and the more elastic the demand.");
  b.card("FACT", "Why is demand for one brand more elastic than for the product as a whole?", "Other brands are close substitutes for one brand, but the product as a whole has no close substitute.");
  b.card("DEFINITION", "What is a **close substitute**?", "A good that satisfies the same want in a very similar way, so consumers can switch easily.");
});
