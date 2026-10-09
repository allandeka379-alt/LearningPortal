// W1a: factors of production, their rewards, and changes in their quantity and quality.
import { concept, P, money, fmt, table, check } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];
const FACTORS = ["land", "labour", "capital", "enterprise"];

concept("econ.basics.factors-of-production", { file: "basics/factors-of-production", keyPrefix: "basics.factors-of-production" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the reward to the factor of production **capital**?",
    options: [
      ["Interest", "Correct: capital earns interest."],
      ["Rent", "Rent is the reward to land."],
      ["Wages and salaries", "Wages are the reward to labour."],
      ["Profit", "Profit is the reward to enterprise."],
    ],
    answer: "A",
    explanation: "Land: rent. Labour: wages or salaries. Capital: interest. Enterprise: profit (or loss).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of the factor of production **land**?",
    options: [
      ["Chrome deposits under the Great Dyke", "Correct: minerals are natural resources, so they are land."],
      ["A drilling machine used in a mine", "A machine is man-made: capital."],
      ["A geologist who searches for minerals", "A person's work is labour."],
      ["A mining company's office building", "A building is man-made: capital."],
    ],
    answer: "A",
    explanation: "Land is every natural resource: soil, minerals, forests, water, fish and climate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is **capital** as a factor of production?",
    options: [
      ["A grinding mill used by a village business", "Correct: a man-made good used to produce other goods."],
      ["US\\$5,000 kept in a bank savings account", "Money is not a factor of production; it can buy capital goods."],
      ["The fertile soil on a farm near Bindura", "Soil is natural: land."],
      ["The skills of a trained mechanic", "Skills are part of the quality of labour."],
    ],
    answer: "A",
    explanation: "Capital is man-made aids to production: machines, tools, buildings, vehicles and infrastructure. Money is not capital in this sense.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What distinguishes **enterprise** from the other factors of production?",
    options: [
      ["It organises the other factors and bears the risk of loss", "Correct: the entrepreneur takes the risk and receives profit or loss."],
      ["It is the only factor that is supplied by people", "Labour is also supplied by people."],
      ["It is the only factor that earns a fixed reward", "Profit is not fixed; it can even be a loss."],
      ["It is a natural resource provided free by nature, like land", "That describes land."],
    ],
    answer: "A",
    explanation: "Enterprise combines land, labour and capital and accepts the risk. Its reward, profit, is what is left after the other factors are paid, and it may be negative.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A hotel in Victoria Falls pays a monthly amount to the owner of the land on which it stands. Which factor reward is this?",
    options: [
      ["Rent", "Correct: payment for the use of land is rent."],
      ["Interest", "Interest is paid for the use of capital (borrowed funds)."],
      ["Wages", "Wages are paid for labour."],
      ["Profit", "Profit goes to the entrepreneur after all costs."],
    ],
    answer: "A",
    explanation: "Rent is the reward for the use of land.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which change would increase the **quality** rather than the quantity of labour in a country?",
    options: [
      ["A national programme to train young people as artisans", "Correct: training raises skills and productivity per worker."],
      ["A rise in the retirement age from 60 to 65 years", "More people stay in work: the quantity of labour rises."],
      ["More workers immigrating from neighbouring countries", "This adds workers: the quantity of labour rises."],
      ["A rise in the birth rate twenty years ago", "This increases the number of working-age people: quantity."],
    ],
    answer: "A",
    explanation: "Quality of labour means how productive each worker is: education, training, health and experience raise it. Retirement age, migration and population growth change the number of workers.",
    hints: ["Quantity means how many workers; quality means how productive each is."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which change would **reduce** the quantity of land available for farming?",
    options: [
      ["Severe soil erosion on overgrazed hillsides", "Correct: eroded land can no longer be farmed."],
      ["A new irrigation scheme in a dry region", "Irrigation brings more land into use."],
      ["Wider use of improved maize seed", "Better seed raises yields (quality), not the quantity of land."],
      ["Clearing bush to make new fields", "Clearing adds land for farming."],
    ],
    answer: "A",
    explanation: "Soil erosion and land degradation take land out of productive use. Irrigation and clearing add land; better seed raises output from the same land.",
    hints: ["Which option takes land out of use?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A family firm employs a manager on a fixed monthly salary to run its bakery. The owners keep whatever is left after all costs. In economic terms, the manager supplies",
    options: [
      ["labour, and the owners supply enterprise", "Correct: the manager is paid a salary and bears no risk; the owners bear the risk."],
      ["enterprise, because she runs the business", "Running the bakery for a fixed salary is labour; enterprise means bearing the risk."],
      ["capital, because she organises the machinery", "Capital is the machinery itself, not the person organising it."],
      ["land, because she controls the bakery site", "Land is the natural resource, not the person managing it."],
    ],
    answer: "A",
    explanation: "The key feature of enterprise is risk-bearing. A salaried manager supplies labour; the owners, who receive profit or loss, supply enterprise.",
    hints: ["Who loses money if the bakery fails?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Money saved in a bank is a factor of production called capital.",
    answer: false,
    explanation: "False. In economics capital means man-made goods used in production, such as machines and buildings. Money can buy capital goods but is not itself a factor of production.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An entrepreneur's reward can be negative.",
    answer: true,
    explanation: "True. If revenue is less than the costs of the other factors, the entrepreneur makes a loss.",
  });
  b.match({
    d: 1, skill: "RECALL",
    stem: "Match each factor of production to its reward.",
    pairs: [["Land", "Rent"], ["Labour", "Wages or salaries"], ["Capital", "Interest"], ["Enterprise", "Profit"]],
    explanation: "Land earns rent, labour earns wages or salaries, capital earns interest and enterprise earns profit (or a loss).",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the factor of production each item belongs to.",
    template: "Fish in Lake Kariba: {{blank:a}}. A kombi used to carry passengers: {{blank:b}}. A nurse's work at a clinic: {{blank:c}}. Opening a new carpentry business: {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["land"], choices: FACTORS },
      { id: "b", accepted: ["capital"], choices: FACTORS },
      { id: "c", accepted: ["labour"], choices: FACTORS },
      { id: "d", accepted: ["enterprise"], choices: FACTORS },
    ],
    wrong: [["capital", "capital", "labour", "labour"]],
    explanation: "Fish are a natural resource (land). A kombi is a man-made aid to production (capital). Human effort is labour. Starting a business and bearing its risk is enterprise.",
  });
  {
    const loan = 7500, rate = 12, interest = (loan * rate) / 100;
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: interest, daily: true,
      stem: `A carpenter in Kwekwe borrows ${money(loan)} to buy woodworking machines, at an interest rate of ${rate}% a year. How much interest, the reward to capital, does he pay in one year?`,
      wrong: [loan + interest, rate * 10],
      explanation: `${rate}% of ${money(loan)} = 0.${rate} × ${fmt(loan)} = ${money(interest)}. ${money(loan + interest)} is the loan plus the interest, not the interest alone.`,
    });
  }
  {
    const revenue = 26500, rent = 3000, wages = 11400, loan = 20000, rate = 8, materials = 6200;
    const interest = (loan * rate) / 100, paid = rent + wages + interest + materials, profit = revenue - paid;
    check("profit", profit, 4300);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: profit, calculator: true,
      stem: `Farai runs a small brick-making business. In one year:\n\n${table(["Item", "Amount (US\\$)"], [["Revenue from selling bricks", revenue], ["Rent paid for the site", rent], ["Wages of workers", wages], ["Materials and fuel bought", materials]])}\n\nHe also has a ${money(loan)} loan for machinery at ${rate}% interest a year. Calculate Farai's profit, the reward for his enterprise.`,
      wrong: [revenue - rent - wages - materials, revenue - rent - wages - loan - materials],
      explanation: `1. Interest: ${rate}% × ${fmt(loan)} = ${money(interest)}.\n2. Total costs: ${fmt(rent)} + ${fmt(wages)} + ${fmt(interest)} + ${fmt(materials)} = ${money(paid)}.\n3. Profit: ${fmt(revenue)} − ${fmt(paid)} = **${money(profit)}**.\n\nForgetting the interest gives ${money(revenue - rent - wages - materials)}; subtracting the whole loan instead of the interest gives a loss of ${money(Math.abs(revenue - rent - wages - loan - materials))}.`,
      hints: ["Work out the interest first.", "Profit is what is left after all the other costs are paid."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** reason why the quantity of labour in a country might fall.",
    points: [
      "Identifies a cause (emigration, falling birth rate, earlier retirement, more young people staying in education, disease).",
      "Explains that fewer people are available or willing to work, so the labour force is smaller.",
    ],
    explanation: "The quantity of labour depends on the number of working-age people and the share who are willing to work.",
    modelAnswer: "If many skilled workers emigrate to neighbouring countries for higher pay, fewer people are left to work in the home country, so the quantity of labour falls.",
    hints: ["Think about how many people are available to work."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how better health care could increase both the quantity and the quality of a country's labour.",
    points: [
      "Quantity: fewer deaths and longer working lives mean more people of working age.",
      "Quantity: fewer days lost to illness mean more hours of work supplied.",
      "Quality: healthier workers are stronger and concentrate better, so output per worker rises.",
      "Links to the result: the economy can produce more (higher productivity, outward shift of the PPC).",
    ],
    explanation: "Health care affects both how many people can work and how productive each worker is.",
    modelAnswer: "Better health care means fewer people die young and workers can keep working for longer, so the number of people available to work rises. Workers also lose fewer days to illness, so more hours are supplied. Healthier workers have more energy and concentrate better, so each produces more. Together these raise the economy's productive capacity.",
    hints: ["Quantity: number of workers and hours.", "Quality: output per worker."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Tendai has opened a small dairy in Marondera. He rents 5 hectares of grazing land, employs four farm workers and a part-time bookkeeper, and has borrowed money from a bank to buy a milking machine and a cooling tank. He sells milk to shops in the town.",
    parts: [
      P.fib({
        label: "(a)", marks: 4,
        stem: "Identify the factor of production and the reward for each item.",
        template: "The grazing land: {{blank:a}}, rewarded by {{blank:b}}. The milking machine: {{blank:c}}, rewarded by {{blank:d}}.",
        blanks: [
          { id: "a", accepted: ["land"], choices: FACTORS },
          { id: "b", accepted: ["rent"], choices: ["rent", "wages", "interest", "profit"] },
          { id: "c", accepted: ["capital"], choices: FACTORS },
          { id: "d", accepted: ["interest"], choices: ["rent", "wages", "interest", "profit"] },
        ],
        wrong: [["land", "profit", "capital", "rent"]],
        explanation: "Grazing land is land, rewarded by rent. The milking machine is capital; the reward to capital is interest (here paid on the bank loan).",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why Tendai's income is less certain than his workers' income.",
        points: [
          "Tendai supplies enterprise and receives profit, which is what is left after all costs are paid.",
          "If costs rise or milk sales fall, his profit falls or becomes a loss, while workers are paid their agreed wages.",
        ],
        modelAnswer: "Tendai's reward is profit, the amount left after he has paid rent, wages and interest. If a drought cuts milk output or feed prices rise, his profit falls or turns into a loss, while the workers still receive their agreed wages.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain one way Tendai could improve the quality of his labour.",
        points: [
          "Identifies a measure (training in animal health or hygiene, better working conditions, experience).",
          "Explains the effect: more milk or less waste per worker (higher productivity).",
        ],
        modelAnswer: "He could train his workers in animal health and milking hygiene, so cows stay healthier and less milk is spoiled, raising output per worker.",
      }),
    ],
    explanation: "Each factor has its reward: land/rent, labour/wages, capital/interest, enterprise/profit. Enterprise bears the risk, so its reward is uncertain.",
    hints: ["Which items are natural, man-made or human effort?", "Who bears the risk of the business?"],
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "A fictional developing country wants to increase its productive capacity. Its government is considering two policies: (1) spending more on technical colleges, and (2) giving tax breaks to firms that buy new machinery.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify which factor of production each policy aims to improve.",
        points: [
          "Policy 1: labour (its quality, through skills).",
          "Policy 2: capital (its quantity and quality, through investment).",
        ],
        modelAnswer: "Technical colleges improve the quality of labour; tax breaks for machinery increase the quantity (and quality) of capital.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss which policy is likely to do more to increase the country's productive capacity.",
        points: [
          "Explains how colleges raise skills and productivity of labour.",
          "Notes a limitation of colleges (takes years; graduates may emigrate; needs jobs and machines to use the skills).",
          "Explains how new machinery raises output per worker and may bring new technology.",
          "Notes a limitation of the tax breaks (lost revenue; firms might have invested anyway; machines need skilled operators; imported machines use foreign currency).",
          "Recognises that the factors work together (skilled workers and machines are complements).",
          "Reaches a justified conclusion.",
        ],
        levels: LV6,
        modelAnswer: "Technical colleges would raise the quality of labour: trained artisans produce more and make fewer mistakes, and the benefit lasts for their whole working lives. However, training takes years, and some graduates may emigrate. Tax breaks for machinery would raise the quantity of capital quickly, increasing output per worker and bringing in new technology, but the government loses tax revenue, some firms would have bought machines anyway, and machines are of little use without skilled operators. Because skilled workers and machines work best together, the colleges are likely to do more in the long run, while tax breaks give a quicker boost; the best approach combines both.",
      }),
    ],
    explanation: "Training improves labour quality; investment increases capital. Productive capacity depends on both, and on timing, cost and how well they work together.",
    hints: ["Which factor does each policy change?", "Consider speed, cost and whether the factors work together."],
  });

  b.card("DEFINITION", "What are the four **factors of production**?", "Land, labour, capital and enterprise.");
  b.card("DEFINITION", "Define **land** as a factor of production.", "All natural resources: soil, minerals, forests, water, fish and climate.");
  b.card("DEFINITION", "Define **capital** as a factor of production.", "Man-made goods used to produce other goods, such as machines, tools, buildings and vehicles.");
  b.card("DEFINITION", "Define **enterprise**.", "The organising of the other factors of production and the bearing of risk in running a business.");
  b.card("FACT", "What are the rewards to land, labour, capital and enterprise?", "Rent, wages or salaries, interest, and profit (or loss).");
  b.card("CONCEPT", "Is money a factor of production?", "No. Money buys capital goods; the capital goods are the factor.");
  b.card("CONCEPT", "Give two causes of a rise in the quality of labour.", "Education and training; better health care and nutrition (also experience).");
  b.card("CONCEPT", "Give two causes of a fall in the quantity of land.", "Soil erosion or desertification; exhaustion of mineral deposits (also flooding).");
  b.card("FORMULA", "How is the entrepreneur's profit found?", "Profit = revenue − all costs (rent, wages, interest and materials).");
});
