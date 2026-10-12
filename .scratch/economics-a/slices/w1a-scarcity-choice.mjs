// W1a: scarcity, choice, opportunity cost and the basic questions (both boards).
import { concept, P, chk, fmt, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.basics.scarcity-choice", { file: "basics/scarcity-choice", keyPrefix: "basics.scarcity-choice" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Which statement best defines scarcity?",
    explanation: "Scarcity is the basic economic problem: unlimited wants but limited resources." },
    ["Unlimited wants but limited resources to satisfy them", "Correct: that is the economic problem."],
    [["A temporary lack of a good because demand exceeds supply at the current price", "That is a shortage, not scarcity."],
     ["A lack of money among the poorest people in society", "Scarcity affects everyone, rich and poor."],
     ["A situation where a good is no longer produced by firms", "Scarcity applies to goods that are still being produced."]]);

  mc({ d: 1, skill: "RECALL", daily: false, stem: "What is meant by opportunity cost?",
    explanation: "Opportunity cost is the value of the next best alternative that is given up when a choice is made." },
    ["The value of the next best alternative given up", "Correct: this is the definition."],
    [["The money price paid for a good or service", "The price is a money cost, not necessarily the opportunity cost."],
     ["The total value of all the alternatives that are given up", "Only the next best alternative counts."],
     ["The cost of producing one extra unit of output", "That is marginal cost."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which of the following is a **free good**?",
    explanation: "A free good is available in such abundance that using more has no opportunity cost. Air in an open field is the standard example; the others use scarce resources." },
    ["Air in an open rural field", "Correct: using it takes nothing from anyone else."],
    [["Water treated and piped to a house in Harare", "Treatment and pipes use scarce resources: an economic good."],
     ["A free school meal provided by a charity", "It is free to the pupil but uses scarce food, labour and fuel."],
     ["Land in the centre of Bulawayo", "Scarce and competed for: an economic good."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A government must decide whether its resources are used to produce more maize or more cotton. Which basic economic question does this show?",
    explanation: "Choosing between goods is the question of what to produce." },
    ["What to produce", "Correct: it is a choice between goods."],
    [["How to produce", "That concerns the methods or resource mix used."],
     ["For whom to produce", "That concerns how output is shared among people."],
     ["Where to produce", "This is not one of the three basic questions."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A factory owner decides to use machines rather than workers to bottle drinks. Which basic economic question is being answered?",
    explanation: "The choice of production method is the question of how to produce." },
    ["How to produce", "Correct: it is a choice of method."],
    [["What to produce", "The product (bottled drinks) is unchanged."],
     ["For whom to produce", "The buyers are not the issue."],
     ["When to produce", "This is not one of the three basic questions."]]);

  {
    const profit = { maize: 280, beans: 350, sunflower: 410, tobacco: 600 };
    const tab = table(["Crop", "Expected profit (US\\$ per hectare)"], Object.entries(profit).map(([k, v]) => [k[0].toUpperCase() + k.slice(1), v]));
    const ctx = `A farmer in a fictional district has one hectare. The expected profit from each crop is shown (illustrative figures).\n\n${tab}`;
    chk(profit.beans, 350);
    mc({ d: 3, skill: "APPLICATION", hints: ["The farmer plants the most profitable crop.", "Which is the next best?"],
      stem: `${ctx}\n\nThe farmer plants tobacco. What is the opportunity cost of this decision?`,
      explanation: "The farmer chooses tobacco (US\\$600). The next best alternative is sunflower at US\\$410, so the opportunity cost is US\\$410. US\\$350 is beans, the third best." },
      ["US\\$410, the profit from sunflower", "Correct: the next best alternative to tobacco."],
      [["US\\$280, the profit from maize", "Maize is the least profitable, not the next best."],
       ["US\\$1,040, the profit from all the other crops added together", "Only the next best alternative counts."],
       ["US\\$600, the profit from tobacco", "This is the benefit of the chosen crop, not the cost."]]);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: profit.sunflower, daily: true,
      stem: `${ctx}\n\nThe farmer plants tobacco. State the opportunity cost of this decision, in US\\$.`,
      wrong: [profit.maize + profit.beans + profit.sunflower, profit.tobacco - profit.sunflower],
      explanation: `The next best alternative to tobacco is sunflower: US\\$${profit.sunflower}. The sum of the other three (US\\$${profit.maize + profit.beans + profit.sunflower}) counts alternatives that could not all be chosen, and ${profit.tobacco} − ${profit.sunflower} = ${profit.tobacco - profit.sunflower} is the extra profit from tobacco, not the opportunity cost.` });
  }
  {
    const hrs = 6, rate = 2.5, oc = hrs * rate;
    chk(oc, 15);
    b.calc({ d: 3, skill: "APPLICATION", kind: "money", value: oc, dp: 2,
      stem: "A student has 6 free hours on a Saturday. She can earn US\\$2.50 per hour at a stall or spend the time studying for an examination. She decides to study. Calculate the opportunity cost in US\\$, assuming the stall work is the next best alternative.",
      wrong: [2.5, 6],
      hints: ["Multiply hours by the hourly rate."],
      explanation: `1. Hours given up: 6.\n2. Earnings per hour: US\\$2.50.\n3. Opportunity cost = 6 × 2.50 = **US\\$15.00**.\n\nUS\\$2.50 is the earnings for one hour only; 6 is the number of hours.` });
  }
  mc({ d: 3, skill: "ANALYSIS", hints: ["Scarcity versus a temporary shortage."],
    stem: "Fuel is delivered to filling stations in a fictional town on Monday and runs out by Tuesday afternoon. Which statement is correct?",
    explanation: "Running out at the current price is a shortage; scarcity is permanent and exists for all economic goods, including those that are plentiful on the shelves." },
    ["It is a shortage, but fuel is also scarce at all times", "Correct: scarcity is always present, a shortage is temporary."],
    [["It shows scarcity only when stations are empty", "Scarcity exists even when stations are full."],
     ["It means fuel has become a free good", "A free good would never run out."],
     ["It means the opportunity cost of fuel is zero", "Fuel has a high opportunity cost."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Who bears the cost of the resources used?"],
    stem: "A fictional government provides school lunches free of charge to all pupils. Which statement is correct?",
    explanation: "The lunches are free to pupils, but the food, cooks and fuel are scarce resources that could have been used elsewhere, so the opportunity cost is borne by society." },
    ["The lunches have an opportunity cost, even though pupils pay nothing", "Correct: scarce resources are used."],
    [["The lunches are free goods because pupils pay nothing", "A free good has no opportunity cost; these have one."],
     ["The lunches have no opportunity cost to the government", "The money could have funded other spending."],
     ["The lunches are not scarce because every pupil receives one", "Resources for them are scarce."]]);

  b.tf({ d: 1, skill: "RECALL", stem: "Opportunity cost is the total value of all the alternatives that are given up when a choice is made.", answer: false,
    explanation: "False. Only the value of the next best alternative counts." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Scarcity exists in rich countries as well as in poor countries.", answer: true,
    explanation: "True. Wants are unlimited everywhere, and resources are limited everywhere." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each decision to the basic economic question it answers.",
    pairs: [
      ["A ministry decides to build roads rather than extra classrooms", "What to produce"],
      ["A farmer chooses to harvest cotton by hand rather than with a machine", "How to produce"],
      ["A government decides to give free health care to children under five", "For whom to produce"],
      ["A firm decides to make bread instead of biscuits", "What to produce"],
    ],
    explanation: "Choice of goods answers 'what'; choice of method answers 'how'; choice of who receives output answers 'for whom'. Two of the examples concern 'what'." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the chain of reasoning.",
    template: "Wants are unlimited but resources are limited, so there is {{blank:a}}. This forces people to make a {{blank:b}}, and the next best alternative given up is the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["scarcity"], choices: ["scarcity", "a shortage", "inflation"] },
      { id: "b", accepted: ["choice"], choices: ["choice", "profit", "subsidy"] },
      { id: "c", accepted: ["opportunity cost"], choices: ["opportunity cost", "money cost", "marginal cost"] },
    ],
    wrong: [["a shortage", "profit", "money cost"]],
    explanation: "Scarcity makes choice necessary; every choice has an opportunity cost." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the value of the next best alternative that is given up when a choice is made?",
    accepted: ["opportunity cost", "the opportunity cost"], wrong: ["marginal cost"],
    explanation: "Opportunity cost." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, stem: "Explain why scarcity makes it necessary to choose.",
    points: ["Wants are unlimited.", "Resources (land, labour, capital) are limited.", "Using resources for one purpose means they cannot be used for another, so choices must be made."],
    modelAnswer: "People's wants are unlimited, but the land, labour and capital available to satisfy them are limited. Resources used for one purpose cannot be used for another, so individuals, firms and governments must choose between alternatives.",
    explanation: "Credit unlimited wants, limited resources and the need to choose." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Who gives something up?"],
    stem: "Explain why a school lunch that pupils receive without paying still has an opportunity cost.",
    points: ["The food, cooks and fuel are scarce resources.", "They could have been used for another purpose (for example other public services).", "So society gives up something even though the pupil pays nothing."],
    modelAnswer: "The food, labour and fuel used to prepare the lunches are scarce and could have been used for other purposes, such as books or clinics. Pupils pay nothing, but society gives up those alternatives, so there is an opportunity cost.",
    explanation: "Free to the user is not free to society." });

  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Name the choice, the benefit and the cost."],
    stem: "A fictional ministry has US\\$30 million to spend. It can build clinics or improve rural roads, but not both. It chooses to build clinics. Analyse the opportunity cost of this decision.",
    points: ["The opportunity cost is the roads (the next best alternative) that are not built.", "Rural households continue to face poor transport.", "Benefits of the roads are lost, such as lower transport costs and easier access to markets.", "The decision is justified only if the benefit of the clinics exceeds the value of the roads."],
    modelAnswer: "The opportunity cost is the improved rural roads that cannot be built because the money is spent on clinics. Rural households and farmers continue to face high transport costs and poor access to markets, so those benefits are lost. The choice is worthwhile only if the benefits of the clinics, such as better health, are greater than the value of the roads given up.",
    explanation: "Identify the next best alternative, say what is lost and compare with the benefit gained." });

  // Structured 1: firm production choice.
  {
    const opts = [["Bread", 5200], ["Buns", 4300], ["Cakes", 6100], ["Biscuits", 3900]];
    const tab = table(["Product", "Profit from one day's flour (US\\$)"], opts);
    chk(opts[1][1], 4300);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Rank the options by profit."],
      stem: `A fictional bakery in Mutare has enough flour for one product a day. The table shows the profit it expects from each (illustrative figures).\n\n${tab}`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Which product should the bakery make to earn the highest profit?", accepted: ["cakes", "cake"], explanation: "Cakes have the highest profit, US\\$6,100." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 5200, stem: "What is the opportunity cost, in US\\$, of making cakes?", wrong: [4300, 900],
          explanation: "The next best alternative to cakes is bread at US\\$5,200, so the opportunity cost is US\\$5,200." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: 6100 - 5200, stem: "By how much does the profit from cakes exceed the profit from the next best alternative, in US\\$?", wrong: [5200, 6100],
          explanation: "6,100 − 5,200 = US\\$900." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the bakery faces an opportunity cost even though it has plenty of customers.",
          points: ["Flour, labour and oven time are scarce.", "Using them for one product means they cannot be used for another.", "So the profit from the next best product is given up."],
          modelAnswer: "The bakery's flour, labour and oven time are limited, so using them to make cakes means they cannot be used to make bread or the other products. The profit from the next best product is given up, whatever the number of customers." }),
      ],
      explanation: "Cakes are the most profitable; the opportunity cost is the next best alternative (bread, US\\$5,200); scarcity of resources creates the cost." });
  }

  // Structured 2: national budget.
  {
    const tab = table(["Project", "Cost (US\\$ million)", "Expected benefit (US\\$ million)"], [["Hospital upgrade", 40, 70], ["Rural roads", 40, 60], ["School buildings", 40, 55], ["Irrigation scheme", 40, 52]]);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Net benefit = benefit − cost.", "Only one project can be funded."],
      stem: `A fictional government has US\\$40 million for one project. The table shows the cost and the estimated benefit of four projects (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: 30, unit: "US$ million", stem: "Calculate the net benefit of the hospital upgrade, in US\\$ million.", wrong: [70, 40],
          explanation: "Net benefit = 70 − 40 = US\\$30 million." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 20, unit: "US$ million", stem: "If the government builds the hospital, what is the opportunity cost in terms of net benefit, in US\\$ million? (Use the net benefit of the next best project.)", wrong: [60, 30],
          explanation: "The next best project by net benefit is the rural roads: 60 − 40 = US\\$20 million." }),
        P.manual({ label: "(c)", marks: 4, stem: "Discuss whether net benefit in US\\$ is the only factor the government should consider when choosing a project.",
          points: ["Net benefit is a useful common measure of value.", "Benefits that are hard to measure (equity, lives saved, jobs) may be left out.", "Who benefits matters: a project may help poorer groups more.", "A reasoned conclusion that the choice also depends on social objectives and risk."],
          modelAnswer: "Net benefit provides a common measure, and the hospital has the highest at US\\$30 million. However, estimates of benefits such as lives saved or jobs created are uncertain, and the project that helps the poorest groups most may be preferred for reasons of fairness. The government should use net benefit as a guide but also consider who benefits and the risks." }),
      ],
      explanation: "Net benefits: 30, 20, 15, 12; the hospital has the highest; the opportunity cost is the next best net benefit, 20." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both sides of the claim.", "Link to opportunity cost."],
    stem: "\"Scarcity is a problem only for poor countries.\" Evaluate this claim.",
    points: ["Poor countries have fewer resources, so many basic needs are unmet.", "Opportunity costs are severe: choices between food, health and education.", "Rich countries also face unlimited wants and limited resources.", "Governments in rich countries must still choose between health, defence and education.", "Scarcity is defined by wants exceeding resources, not by the level of income.", "Time and environmental resources are scarce for everyone.", "The consequences of scarcity are more serious where incomes are low.", "A justified conclusion that scarcity is universal but its impact differs."],
    levels: LV8,
    modelAnswer: "Scarcity exists whenever wants exceed the resources available, and this is true in every country. A rich country still has to choose between hospitals, defence and schools because its tax revenue and workers are limited, and every household chooses how to use its time and income. However, in a poor country scarcity is felt more severely, because even basic needs such as food, clean water and health care may not be met, so the opportunity cost of every choice is high. The claim is therefore wrong in saying scarcity is only a problem for poor countries, but correct in suggesting that its consequences are harder in poor countries.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Distinguish the existence of scarcity from its severity." });

  b.card("DEFINITION", "Define **scarcity**.", "The economic problem arising because wants are unlimited while the resources available to satisfy them are limited.");
  b.card("DEFINITION", "Define **opportunity cost**.", "The value of the next best alternative given up when a choice is made.");
  b.card("CONCEPT", "Name the **three basic economic questions**.", "What to produce, how to produce and for whom to produce.");
  b.card("CONCEPT", "What is the difference between **scarcity** and a **shortage**?", "Scarcity is permanent and applies to all economic goods; a shortage is when demand exceeds supply at the current price.");
  b.card("DEFINITION", "Define an **economic good**.", "A good that is scarce and has an opportunity cost, so it must be produced and normally has a price.");
  b.card("DEFINITION", "Define a **free good**.", "A good with no opportunity cost because it is available in such abundance that using more does not reduce what others can have.");
  b.card("FACT", "A farmer's options earn US\\$900, US\\$500 and US\\$300. She picks the US\\$900 option. What is the opportunity cost?", "US\\$500, the next best alternative; not the sum of the other two.");
  b.card("CONCEPT", "Why is a free school meal not free to society?", "It uses scarce resources (food, labour, fuel) that have alternative uses.");
  b.card("CONCEPT", "Which three groups face scarcity?", "Individuals (income and time), firms (inputs) and governments (tax revenue).");
});
