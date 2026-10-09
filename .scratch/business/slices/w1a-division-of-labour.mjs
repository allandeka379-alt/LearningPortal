// W1a: direct and indirect production, division of labour, mass production (COM).
import { concept, P, f } from "../lib.mjs";

concept("bus.production.division-of-labour", { file: "production/division-of-labour", keyPrefix: "production.division-of-labour" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A family that grows maize only to feed itself is engaged in:",
    options: [
      ["direct production", "Correct: production for one's own use is direct (subsistence) production."],
      ["indirect production", "Indirect production is for sale or exchange."],
      ["mass production", "Mass production means very large quantities of standardised goods."],
      ["tertiary production", "Growing maize is primary, and here it is not sold."],
    ],
    answer: "A",
    explanation: "Direct production satisfies the producer's own wants; nothing is exchanged.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The tea estates of the Eastern Highlands and the cattle ranches of Matabeleland are examples of specialisation by:",
    options: [
      ["region", "Correct: areas produce what suits their climate, soil and resources."],
      ["process", "Specialisation by process divides the making of one product into stages."],
      ["person", "Specialisation by person is about individuals' occupations."],
      ["country", "Both areas are within one country, so this is regional specialisation."],
    ],
    answer: "A",
    explanation: "Regional specialisation follows natural advantages: high rainfall and cool slopes suit tea; drier grasslands suit cattle ranching.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a shoe factory, one worker cuts the leather, another stitches the uppers and a third attaches the soles. This is:",
    options: [
      ["division of labour", "Correct: production is split into processes, each done by different workers."],
      ["direct production", "The shoes are made for sale, so production is indirect."],
      ["regional specialisation", "This happens inside one factory, not across regions."],
      ["specialisation by country", "Nothing here involves different countries."],
    ],
    answer: "A",
    explanation: "Division of labour is specialisation by process: each worker repeats one stage of production.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **disadvantage to the worker** of the division of labour?",
    options: [
      ["Boredom from repeating the same task", "Correct: monotony is a major disadvantage to workers."],
      ["Lower cost of producing each unit", "Lower unit costs benefit the producer, not a disadvantage to the worker."],
      ["Greater use of machinery in production", "This is an advantage to the producer."],
      ["Quicker and cheaper training for one task", "This is an advantage, not a disadvantage."],
    ],
    answer: "A",
    explanation: "Disadvantages to workers include monotony, loss of craftsmanship and the risk of unemployment because their skill is narrow.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does division of labour usually increase output per worker?",
    options: [
      ["Workers become skilled and quick at one task", "Correct: repetition builds speed and skill."],
      ["Workers are paid more for every task they do", "Pay is not the reason output rises."],
      ["Each worker makes the whole product alone", "That is the opposite of division of labour."],
      ["The factory needs fewer raw materials in total", "Materials per unit do not fall simply because tasks are divided."],
    ],
    answer: "A",
    explanation: "Practice makes workers expert and fast, no time is lost moving between tasks, and machines can be used for repeated tasks.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which condition is most necessary before a business introduces mass production?",
    options: [
      ["A large market for a standardised product", "Correct: the large output must be sold, otherwise machines stand idle."],
      ["Many products made to each customer's design", "Mass production makes identical, not customised, goods."],
      ["Workers who can each make the whole product", "Mass production relies on division of labour, not all-round craftsmen."],
      ["Very small amounts of capital equipment", "Mass production needs a lot of capital (machinery)."],
    ],
    answer: "A",
    explanation: "Mass production needs a large, steady demand, standardised goods, capital, reliable materials and power, and transport.",
    hints: ["What happens if a factory makes thousands of units but can sell only a few?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "On a production line, the worker who attaches labels is absent and no one else can do the task. What does this show?",
    options: [
      ["Interdependence between the stages of production", "Correct: when one stage stops, the whole line stops."],
      ["The benefit of direct production to the business", "Direct production is for one's own use, not relevant here."],
      ["That the business has too large a market", "The problem is on the production line, not with demand."],
      ["That regional specialisation has failed", "This happens inside one factory."],
    ],
    answer: "A",
    explanation: "Each stage depends on the one before it. A strike, absence or breakdown at one stage can halt all production: a disadvantage of division of labour.",
    hints: ["Think about how the stages of a production line link together."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Indirect production means producing goods for sale or exchange.",
    answer: true,
    explanation: "True. The producer exchanges the output (for money) and buys what others produce.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Specialisation reduces the need for trade.",
    answer: false,
    explanation: "False. Specialists produce a surplus of one thing and must trade it for everything else they need, so specialisation increases the need for trade.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each example with the type of specialisation.",
    pairs: [
      ["Tatenda works only as an electrician", "By person (profession)"],
      ["In a clothing factory one worker only sews collars", "By process (division of labour)"],
      ["Mining is concentrated along the Great Dyke", "By region"],
      ["Zimbabwe exports tobacco and imports vehicles", "By country"],
    ],
    explanation: "Specialisation can be by person, by process, by region or by country.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Mass production makes very large quantities of {{blank:a}} goods, usually on an assembly line, and needs a large {{blank:b}} to buy the output.",
    blanks: [
      { id: "a", accepted: ["standardised"], choices: ["standardised", "handmade", "unique", "imported"] },
      { id: "b", accepted: ["market"], choices: ["market", "workshop", "family", "warehouse"] },
    ],
    explanation: "Mass-produced goods are identical (standardised); without a large market the output cannot be sold.",
  });
  // Output comparison: figures computed here.
  const workers = 4, perWorkerAlone = 12, lineOutput = 80;
  const aloneTotal = perWorkerAlone * workers;
  const extra = lineOutput - aloneTotal;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "units", value: extra,
    stem: `Four tailors in a Gweru workshop each made complete shirts, and each tailor produced ${perWorkerAlone} shirts per day. After dividing the work into cutting, sewing, buttonholing and ironing, the four tailors together produce ${lineOutput} shirts per day. Calculate the **increase** in daily output.`,
    wrong: [lineOutput - perWorkerAlone, lineOutput / workers - perWorkerAlone],
    explanation: `Before: ${perWorkerAlone} × ${workers} = ${aloneTotal} shirts. After: ${lineOutput} shirts. Increase: ${lineOutput} − ${aloneTotal} = ${extra} shirts per day.`,
    workedSolution: `1. Output before: ${perWorkerAlone} × ${workers} = ${aloneTotal} shirts per day.\n2. Output after: ${lineOutput} shirts per day.\n3. Increase: ${lineOutput} − ${aloneTotal} = ${extra} shirts.`,
    hints: ["First find the total output before the change for all four tailors.", "Subtract that from the new output."],
  });
  const perWorkerAfter = f.labourProductivity(lineOutput, workers);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: perWorkerAfter,
    stem: `Using the same workshop, the four tailors together now produce ${lineOutput} shirts per day. How many shirts per worker per day is this?`,
    wrong: [lineOutput, perWorkerAlone],
    explanation: `${lineOutput} ÷ ${workers} = ${perWorkerAfter} shirts per worker per day, compared with ${perWorkerAlone} before.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of the division of labour to an **employer**.",
    points: [
      "Advantage 1, e.g. higher output (1)",
      "Explained: workers become fast and skilled at one task (1)",
      "Advantage 2, e.g. lower cost per unit / machinery can be used / less time wasted (1)",
      "Explained, e.g. more output from the same wage bill, so higher profits or lower prices (1)",
    ],
    modelAnswer: "Output rises because each worker repeats one task and becomes very quick at it. This lowers the cost of each unit, because the same wages buy more output, so the employer can lower prices or earn more profit.",
    explanation: "Each advantage must be both stated and explained, and must benefit the employer.",
    hints: ["Think about output and cost per unit."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest **two** ways an employer could reduce the boredom caused by the division of labour.",
    points: [
      "Way 1, e.g. job rotation (1)",
      "Explained: workers move between tasks, giving variety (1)",
      "Way 2, e.g. team working / rest breaks / music / bonuses / recognition (1)",
      "Explained, e.g. raises motivation and reduces mistakes and accidents (1)",
    ],
    modelAnswer: "Job rotation moves workers between tasks every few weeks, which adds variety and gives them more skills. Working in teams that are responsible for a whole section of the product gives workers more interest and pride in their work, which reduces mistakes and absence.",
    explanation: "Credit realistic methods with an explanation of how they reduce monotony.",
    hints: ["How could workers get more variety?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Farai owns a small furniture workshop in Kwekwe. Each of his five carpenters makes complete tables and chairs by hand to customers' own designs. Farai has won a contract to supply 600 identical school desks a year, and is thinking of dividing the work into stages (cutting, planing, joining, sanding, varnishing) and buying power tools.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "At present, the carpenters are specialised by:",
        options: [["person (craft)", "Correct: each is a carpenter who makes the whole product."], ["process (stages of work)", "They do not yet divide the work into stages."], ["region", "Regional specialisation concerns areas, not one workshop."], ["country", "Nothing here involves countries."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "State **two** reasons why the school desk contract suits division of labour.",
        points: ["Large quantity (600 a year) (1)", "Identical / standardised desks (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** disadvantage to Farai's carpenters of the change.",
        points: ["Identifies, e.g. boredom / loss of craftsmanship / narrow skills (1)", "Explains, e.g. repeating sanding all day is monotonous (1)", "Effect, e.g. lower motivation / mistakes / harder to find other work (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Should Farai use division of labour for all his work, including the furniture made to customers' designs? Justify your answer.",
        points: [
          "Benefit for desks: faster output, lower unit cost (1)",
          "Benefit: power tools raise productivity (1)",
          "Problem for custom work: each order is different, so it cannot be standardised (1)",
          "Problem: customers value craftsmanship / quality of handmade work (1)",
          "Conclusion (1)",
          "Justified, e.g. use division of labour for the desk contract but keep craft production for custom orders (1)",
        ],
        modelAnswer: "Division of labour suits the desks because the 600 desks are identical and the work can be split into repeated tasks with power tools, cutting the time and cost per desk. However, custom furniture is different for every customer, so it cannot be standardised, and customers pay for skilled craftsmanship. Farai should run a production line for the desks and let one or two skilled carpenters continue making custom furniture, so he gains the efficiency without losing his custom customers.",
      }),
    ],
    explanation: "Large, standardised orders suit division of labour; customised, varied work suits craft production. A mixed approach is a well-justified conclusion.",
    hints: ["Which work is identical and in large quantities?", "What do customers of custom furniture value?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Chipo used to grow vegetables, keep goats and sew clothes for her own family. She now grows only tomatoes, which she sells at Sakubva market in Mutare, and buys the other things her family needs.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Identify the change.",
        template: "Chipo has changed from {{blank:a}} production to {{blank:b}} production.",
        blanks: [
          { id: "a", accepted: ["direct"], choices: ["direct", "indirect", "mass"] },
          { id: "b", accepted: ["indirect"], choices: ["direct", "indirect", "mass"] },
        ],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why Chipo now depends on trade.",
        points: ["She produces a surplus of tomatoes only (1)", "She must sell them to buy goods she no longer produces (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Discuss **one** benefit and **one** risk to Chipo of specialising in tomatoes.",
        points: ["Benefit identified, e.g. higher output / skill / income (1)", "Benefit explained (1)", "Risk identified, e.g. tomato prices fall / disease / pests destroy the crop (1)", "Risk explained: she has no other source of income or food (1)"],
      }),
    ],
    explanation: "Chipo moved from direct to indirect production. She depends on selling her surplus and is exposed to the risks of relying on one product.",
    hints: ["Is she producing for herself or for sale?", "What happens if tomato prices fall?"],
  });
  b.card("DEFINITION", "Direct production", "Producing goods and services for one's own use (subsistence).");
  b.card("DEFINITION", "Indirect production", "Producing for sale or exchange and buying what others produce.");
  b.card("DEFINITION", "Specialisation", "Concentrating on one product or one task.");
  b.card("DEFINITION", "Division of labour", "Splitting production into separate processes, each done by different workers (specialisation by process).");
  b.card("FACT", "Types of specialisation", "By person (profession), by process (division of labour), by region, by country.");
  b.card("CONCEPT", "Advantages of division of labour", "Higher output, workers gain skill and speed, time saved, machinery used, lower unit cost, quicker training.");
  b.card("CONCEPT", "Disadvantages of division of labour", "Monotony, loss of craftsmanship, risk of unemployment, interdependence (one stop halts all), standardised goods, overdependence.");
  b.card("DEFINITION", "Mass production", "Producing very large quantities of standardised goods, usually with machines on an assembly line.");
  b.card("FACT", "Conditions for mass production", "Large market, standardised product, capital, reliable materials and power, good transport.");
});
