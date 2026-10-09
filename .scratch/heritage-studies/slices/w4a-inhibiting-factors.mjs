// W4a: Factors inhibiting production and their solutions (her.production.inhibiting-factors).
// Reviewer note: sanctions / restrictive measures presented as contested, with three views; SADC Anti-Sanctions Day
// 25 October (from 2019). Indigenisation requirement "later relaxed for most sectors" (2018) — please confirm wording.
// Kariba (hydro) and Hwange (thermal) as main power stations. No statistics. No MCQ hinges on the sanctions debate.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.production.inhibiting-factors", { file: "production/inhibiting-factors", keyPrefix: "production.inhibiting-factors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **brain drain**?",
    options: [
      ["the emigration of skilled and educated people", "Correct: e.g. nurses and engineers leaving to work abroad."],
      ["the loss of soil by water erosion", "That is soil erosion."],
      ["the closure of factories because of power cuts", "This is another inhibiting factor, not brain drain."],
      ["the movement of rural people to towns", "That is rural-urban migration."],
    ],
    answer: "A",
    explanation: "Brain drain is the loss of skilled people to other countries, which creates skills shortages at home.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How do **power cuts** inhibit production in factories?",
    options: [
      ["Machines stop, so output falls and costs rise", "Correct: idle machines and generator costs."],
      ["They make raw materials cheaper", "Power cuts do not lower the cost of materials."],
      ["They increase the number of skilled workers", "Power cuts do not create skills."],
      ["They raise the level of Lake Kariba", "Power cuts are partly a result of low lake levels, not a cause of higher ones."],
    ],
    answer: "A",
    explanation: "Without power, machines stand idle; firms that run generators pay more for fuel, raising costs.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which power station depends on the water level of Lake Kariba?",
    options: [
      ["the Kariba hydro-electric power station", "Correct: it generates electricity from water."],
      ["the Hwange thermal power station", "Hwange burns coal."],
      ["a diesel generator in a factory", "Generators burn diesel."],
      ["a household solar panel", "Solar panels use sunlight."],
    ],
    answer: "A",
    explanation: "Kariba generates hydro-electric power; when drought lowers the lake, less power can be generated.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda has land and seed, but the bank will not lend him money for fertiliser because he has no title deed. Which inhibiting factor does he face?",
    options: [
      ["lack of capital", "Correct: he cannot obtain finance without collateral."],
      ["brain drain", "His problem is finance, not loss of skilled people."],
      ["outdated technology", "His problem is money for inputs."],
      ["competition from imports", "He has not yet produced anything to sell."],
    ],
    answer: "A",
    hints: ["What does he lack: skills, machines or money?"],
    explanation: "Lack of collateral blocks access to loans, a common capital problem for farmers and small businesses.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which solution is **best matched** to the problem of skills shortages?",
    options: [
      ["expanding vocational and technical training", "Correct: training builds the missing skills."],
      ["building more dams", "Dams address water shortages."],
      ["planting drought-tolerant crops", "This addresses drought."],
      ["repairing damaged roads, railways and bridges", "This addresses infrastructure."],
    ],
    answer: "A",
    hints: ["Match the solution to the cause."],
    explanation: "Training and better conditions for skilled workers address skills shortages.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why can a drought reduce production in **factories** as well as on farms?",
    options: [
      ["It lowers hydro-power and reduces raw materials from farms", "Correct: drought affects power and supply chains."],
      ["It makes factory workers forget their skills", "Drought does not affect skills."],
      ["It increases the price of all imported machines and spare parts", "This is not a direct effect of drought."],
      ["It closes all roads in the country", "Drought does not close roads."],
    ],
    answer: "A",
    hints: ["Think about Kariba and about agro-processing."],
    explanation: "Drought reduces Kariba's output and the crops that factories process, so factories are hit too.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about sanctions or restrictive measures is the most **balanced**?",
    options: [
      ["Their effect is debated, and it is hard to separate from other causes", "Correct: this acknowledges the different views."],
      ["They are the only cause of every economic problem in Zimbabwe", "This ignores other factors."],
      ["They have had no effect of any kind on anyone", "This ignores the measures on individuals and companies and the debate."],
      ["They were imposed by SADC on its own members", "SADC called for them to be lifted."],
    ],
    answer: "A",
    hints: ["A balanced statement recognises more than one view."],
    explanation: "The government sees them as damaging sanctions; the countries that imposed them call them targeted measures; many researchers say the effects are hard to separate from other causes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does **outdated technology** inhibit production?",
    options: [
      ["Old machines break down often and produce at higher cost", "Correct: breakdowns and inefficiency reduce output."],
      ["Old machines never need any maintenance or spare parts at all", "Old machines need more maintenance."],
      ["Old machines always make better goods", "Quality often falls."],
      ["Old machines use no electricity", "They often use more power."],
    ],
    answer: "A",
    explanation: "Outdated equipment breaks down, uses more power and produces lower-quality goods at higher cost.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Drought can reduce both crop production and hydro-electric power.",
    answer: true,
    explanation: "True. Crops fail, and low lake levels reduce power from Kariba.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Everyone agrees about the effect of Western sanctions or restrictive measures on Zimbabwe's economy.",
    answer: false,
    explanation: "False. The effect is contested: the government, the countries that imposed them and researchers hold different views.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each inhibiting factor with a suitable solution.",
    pairs: [
      ["power shortages", "solar and other renewable energy"],
      ["drought", "irrigation and drought-tolerant crops"],
      ["lack of capital", "microfinance and development funds"],
      ["outdated technology", "investment in new equipment"],
    ],
    hints: ["Each solution should remove the cause."],
    explanation: "Good solutions match the factor they address.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The hydro-electric power station is at {{blank:a}}, and the coal-fired power station is at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Kariba"], choices: ["Kariba", "Hwange", "Mutare", "Gweru"] },
      { id: "b", accepted: ["Hwange"], choices: ["Hwange", "Kariba", "Masvingo", "Lupane"] },
    ],
    explanation: "Kariba uses water; Hwange uses coal.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the statements about the different views.",
    template: "The Zimbabwean government calls the Western measures {{blank:a}}. The countries that imposed them describe them as {{blank:b}} measures.",
    blanks: [
      { id: "a", accepted: ["sanctions"], choices: ["sanctions", "loans", "tariffs", "grants"] },
      { id: "b", accepted: ["targeted restrictive"], choices: ["targeted restrictive", "economic recovery", "regional trade", "humanitarian aid"] },
    ],
    hints: ["The two sides use different names."],
    explanation: "The words used reflect the different views; a balanced answer explains both.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to money sent home by Zimbabweans working abroad?",
    accepted: ["remittances", "remittance", "diaspora remittances"],
    wrong: ["royalties"],
    explanation: "Remittances support many families and businesses, partly offsetting the effects of brain drain.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** factors that inhibit production in Zimbabwe.",
    points: [
      "Any one of: lack of capital; restrictive legislation / procedures; sanctions or restrictive measures; skills shortages / brain drain; outdated technology; power shortages; water shortages; drought; poor infrastructure; economic instability; competition from imports",
      "A second different factor",
      "A third different factor",
    ],
    modelAnswer: "Lack of capital, power shortages and drought.",
    explanation: "One mark per correct factor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how **two** factors inhibit production in Zimbabwe.",
    points: [
      "Identifies a factor (e.g. brain drain)",
      "Explains its effect (e.g. hospitals and industries lose skilled staff, so services and output fall and training costs are lost)",
      "Identifies a second factor (e.g. power shortages)",
      "Explains its effect (e.g. production lines stop and firms pay for diesel, so output falls and costs rise)",
    ],
    modelAnswer: "Brain drain means that engineers, nurses and artisans leave for other countries, so industries and hospitals lose skilled staff and the cost of training them is lost. Power shortages stop production lines and irrigation pumps, so output falls and firms must pay for diesel to run generators.",
    hints: ["For each factor, say what it stops or makes more costly."],
    explanation: "One mark for each factor and one for explaining its effect.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways the government could reduce the brain drain, and explain each.",
    points: [
      "Suggests better pay and working conditions (e.g. for health workers, teachers)",
      "Explains that skilled people have less reason to leave",
      "Suggests incentives for professionals abroad to return or invest / career development / housing schemes",
      "Explains that their skills and money come back to benefit the country",
    ],
    modelAnswer: "The government could improve pay and working conditions for health workers, teachers and engineers, so skilled people have less reason to leave. It could also offer incentives such as housing schemes and recognition of foreign experience to professionals abroad, so they return or invest at home and their skills benefit the country.",
    hints: ["Why do skilled people leave, and what would bring them back?"],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "a report in a fictional business newsletter, Bulawayo, 2026",
      "Manufacturers in the city say that their factories are working well below capacity. They blame long power cuts, old machines that need imported spare parts, and difficulty in raising loans. Some managers also say that skilled technicians have left for jobs abroad. A spokesperson for a manufacturers' association said that installing solar power had helped some firms keep production going.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What does \"working well below capacity\" mean?",
        options: [
          ["producing much less than the factories could produce", "Correct: machines and workers are partly idle."],
          ["having too many workers for the space available", "This is overcrowding, not capacity."],
          ["producing more than customers want", "This would be overproduction."],
          ["working only at night", "Capacity refers to output, not hours."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** factors inhibiting production mentioned in the source.",
        points: ["Any one of: power cuts; old machines / spare parts; difficulty raising loans; skilled technicians leaving", "A second different factor"],
        modelAnswer: "Power cuts and difficulty in raising loans.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Using the source and your own knowledge, explain how **one** of these factors could be overcome.",
        points: [
          "Names the factor and a solution (e.g. power cuts: solar power, as in the source)",
          "Explains how the solution works (e.g. firms generate their own electricity during cuts)",
          "Explains the result (e.g. production continues and generator fuel costs fall)",
        ],
        modelAnswer: "Power cuts could be overcome by installing solar power, as some firms in the source have done. The factories generate their own electricity during the day, so production continues during cuts and they spend less on diesel for generators.",
      }),
    ],
    hints: ["In (c), use the solution mentioned at the end of the source or one of your own."],
    explanation: "A source-based practice item on factors inhibiting manufacturing.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about factors inhibiting production.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the different views on the effect of Western sanctions or restrictive measures on Zimbabwe.",
        points: [
          "Government view: they are sanctions that damaged the whole economy",
          "by limiting loans, credit and investment (SADC called for their removal)",
          "Imposing countries' view: targeted measures on individuals and companies, not ordinary citizens",
          "Other view: economic problems mainly due to policies and other factors / effects hard to separate",
        ],
        modelAnswer: "The Zimbabwean government says they are sanctions that have damaged the whole economy by limiting access to international loans, credit and investment, and SADC has called for their removal. The countries that imposed them say they are targeted measures on particular individuals and companies, not on ordinary citizens, and that economic problems came mainly from policies and other factors. Many researchers say the effects are hard to separate from these other causes.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Power shortages are the main factor inhibiting production in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: power cuts stop factories, mines and irrigation; generator costs; linked to drought at Kariba and ageing plants", 2],
          ["Against: lack of capital, skills shortages / brain drain, outdated technology", 2],
          ["Against: drought, sanctions or restrictive measures (contested), legislation, instability; factors interact", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Power shortages are a very important factor. When the power goes off, production lines, mines and irrigation pumps stop, and firms that run generators face higher costs. Shortages are linked to drought lowering Lake Kariba and to ageing thermal units at Hwange, so they affect almost every sector.\n\nHowever, other factors also matter greatly. Many businesses lack capital to buy inputs and replace old machines, and outdated technology causes breakdowns. Brain drain has taken away skilled technicians and engineers. Drought reduces farm output directly. The effect of sanctions or restrictive measures is debated, but many argue that limited access to loans and investment has slowed recovery.\n\nI partly agree. Power shortages are among the most widespread problems, but they interact with lack of capital and skills; solving power alone would not restore production without investment and training.",
      }),
    ],
    hints: ["In (b), weigh power shortages against at least three other factors."],
    explanation: "A practice evaluative item on the factors inhibiting production.",
  });

  b.card("DEFINITION", "Inhibiting factor", "Anything that limits or slows down the production of goods and services.");
  b.card("DEFINITION", "Brain drain", "The emigration of skilled and educated people to work in other countries.");
  b.card("DEFINITION", "Capacity utilisation", "The share of possible output that a factory or industry actually produces.");
  b.card("FACT", "Name six factors inhibiting production in Zimbabwe.", "Lack of capital, restrictive procedures, skills shortages / brain drain, outdated technology, power and water shortages, drought (also sanctions or restrictive measures, poor infrastructure).");
  b.card("FACT", "Which two power stations supply much of Zimbabwe's electricity?", "Kariba (hydro-electric) and Hwange (coal-fired thermal).");
  b.card("FACT", "What date does SADC mark as Anti-Sanctions Day?", "25 October.");
  b.card("CONCEPT", "Give the two main views on Western measures against Zimbabwe.", "The government: damaging sanctions on the whole economy. The imposing countries: targeted restrictive measures on individuals and companies.");
  b.card("CONCEPT", "How does drought affect industry?", "It lowers hydro-power from Kariba and reduces farm raw materials for processing.");
  b.card("CONCEPT", "Name four solutions to factors inhibiting production.", "Finance for small businesses, skills training, new technology and renewable energy, irrigation and drought-tolerant crops.");
});
