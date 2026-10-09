// W4b: Pollution (her.global.pollution).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.global.pollution", { file: "global/pollution", keyPrefix: "global.pollution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **pollution**?",
    options: [
      ["the release of harmful substances or energy into the environment", "Correct: pollution makes air, water or land harmful."],
      ["the cutting down of trees without replacing them", "This is deforestation."],
      ["the illegal hunting and trapping of wild animals in parks and protected areas", "This is poaching."],
      ["a long period with little or no rain", "This is a drought."],
    ],
    answer: "A",
    explanation: "Pollution is the release of harmful substances or energy (such as noise) into air, water or land.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Loud music played late at night in a residential area is an example of which type of pollution?",
    options: [
      ["noise pollution", "Correct: unwanted loud sound is noise pollution."],
      ["air pollution", "Air pollution involves smoke, dust or gases."],
      ["water pollution", "Nothing enters a water source."],
      ["land pollution", "Land pollution involves litter or chemicals on the ground."],
    ],
    answer: "A",
    explanation: "Noise pollution is unwanted or harmful sound, such as loud music or machinery.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mercury used by illegal gold panners along a river is **mainly** a source of which type of pollution?",
    options: [
      ["water pollution", "Correct: mercury washes into the river and poisons it."],
      ["noise pollution", "Mercury is a chemical, not a sound."],
      ["air pollution from vehicle exhaust", "Vehicles are not the source here."],
      ["light pollution", "Light is not involved."],
    ],
    answer: "A",
    explanation: "Mercury used to separate gold ends up in rivers, where it poisons fish and people who use the water.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which disease is **most** closely linked to drinking water polluted by raw sewage?",
    options: [
      ["cholera", "Correct: cholera spreads through water and food contaminated with faeces."],
      ["diabetes", "Diabetes is a chronic illness, not spread by water."],
      ["hypertension", "Hypertension is high blood pressure, not caused by sewage."],
      ["asthma caused by dust from roads", "Dust affects breathing, not drinking water."],
    ],
    answer: "A",
    explanation: "Cholera is caused by bacteria spread through water or food contaminated with human waste.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of a **point source** of pollution?",
    options: [
      ["a single factory pipe discharging effluent into a river", "Correct: the pollution comes from one identifiable place."],
      ["fertiliser washed off hundreds of different farms by heavy rain", "This comes from many scattered places: a non-point source."],
      ["exhaust from thousands of vehicles across a city", "Many scattered sources: non-point."],
      ["litter dropped by many people along a road", "Many scattered sources: non-point."],
    ],
    answer: "A",
    explanation: "A point source is one identifiable place, such as a pipe or sewage works; non-point sources are scattered.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A factory in Kwekwe is fined by EMA for releasing untreated effluent into a river. Which principle does the fine apply?",
    options: [
      ["the polluter pays", "Correct: the one who causes pollution bears the cost."],
      ["willing-buyer willing-seller", "This was a land-transfer principle."],
      ["separation of powers", "This is about the arms of government."],
      ["unity in diversity", "This is about national unity."],
    ],
    answer: "A",
    hints: ["Who should bear the cost of the damage?"],
    explanation: "The polluter pays principle says whoever causes pollution should pay for the harm and the clean-up.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo lives in a rural home where food is cooked over an open wood fire inside a closed kitchen hut. Which health risk is she **most** exposed to?",
    options: [
      ["breathing problems from indoor smoke", "Correct: smoke in a closed space damages the lungs."],
      ["hearing loss from traffic noise", "There is no heavy traffic described."],
      ["mercury poisoning from gold panning", "No mining is described."],
      ["illness from factory effluent", "There is no factory in the scenario."],
    ],
    answer: "A",
    hints: ["What fills a closed hut when wood burns?"],
    explanation: "Indoor smoke from cooking fires is a major cause of breathing problems, especially for women and children.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A council bans the burning of rubbish but its refuse trucks rarely come. Which conclusion is **best** supported?",
    options: [
      ["The ban is likely to fail because residents have no alternative", "Correct: a law works best with a realistic alternative."],
      ["The ban will succeed fully because residents always obey every council by-law", "Laws are not always obeyed, especially without alternatives."],
      ["Burning rubbish causes no pollution, so the ban is unnecessary", "Burning rubbish causes air pollution."],
      ["Refuse collection has no link to pollution", "Uncollected refuse leads to burning and dumping."],
    ],
    answer: "A",
    hints: ["What will people do with rubbish that is never collected?"],
    explanation: "Without collection, rubbish piles up and attracts flies and rats, so residents keep burning it despite the ban.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Noise can be a form of pollution.",
    answer: true,
    explanation: "True. Loud or constant noise is pollution: it damages hearing and causes stress.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Pollution affects only people who live in towns.",
    answer: false,
    explanation: "False. Rural people face indoor smoke, pesticide spills and rivers polluted by mines and towns upstream.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source with the type of pollution it mainly causes.",
    pairs: ["vehicle exhaust", "a burst sewer pipe", "plastic bags dumped in a field", "a maize mill running at night"],
    right: ["air pollution", "water pollution", "land pollution", "noise pollution"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Exhaust: air. Sewage: water. Dumped plastic: land. A noisy mill at night: noise.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The body that licenses and monitors polluters in Zimbabwe is the {{blank:a}}. Fertiliser washed off many farms is a {{blank:b}} source of pollution.",
    blanks: [
      { id: "a", accepted: ["Environmental Management Agency"], choices: ["Environmental Management Agency", "Grain Marketing Board", "Forestry Commission", "Zimbabwe Media Commission"] },
      { id: "b", accepted: ["non-point"], choices: ["non-point", "point"] },
    ],
    explanation: "EMA licenses and monitors polluters. Fertiliser from many farms comes from scattered places, so it is a non-point source.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **two** sources of air pollution and **two** sources of water pollution in Zimbabwe.",
    points: [
      "Air source 1, e.g. vehicle exhaust, burning rubbish/tyres, veld fires, coal power stations, factories, mine/road dust, indoor cooking fires",
      "Air source 2 (different)",
      "Water source 1, e.g. raw sewage, industrial effluent, fertiliser/pesticides, mercury from gold panning, litter, washing in rivers",
      "Water source 2 (different)",
    ],
    modelAnswer: "Air: vehicle exhaust and burning rubbish. Water: raw sewage and mercury from gold panning.",
    explanation: "One mark per correct source.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of water pollution on a community.",
    points: [
      "Identifies disease",
      "Develops: e.g. sewage spreads cholera/dysentery when people drink untreated water",
      "Identifies death of fish/aquatic life or poisoning of livestock",
      "Develops: families lose food and income from fishing; cattle fall sick",
      "Identifies higher cost of treating water / water shortages",
      "Develops: councils spend more on chemicals, so water bills rise or supplies are cut",
    ],
    modelAnswer: "Sewage in rivers spreads diseases such as cholera and dysentery, because people who lack piped water drink the untreated water. Chemicals and lack of oxygen kill fish, so families lose food and income from fishing. Polluted water is also more expensive to treat, so councils spend more on chemicals and may cut supplies.",
    hints: ["Think of health, food and cost."],
    explanation: "One mark for each effect and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Residents of a fictional suburb in Mutare complain of plastic litter and smoke from burning rubbish. Suggest **two** ways the residents' association could reduce this pollution.",
    points: [
      "Suggests organising regular clean-ups / collection points / recycling with buyers of plastic",
      "Explains how it reduces litter or turns waste into income",
      "Suggests pressing the council for regular refuse collection / awareness campaign against burning",
      "Explains how it removes the reason for burning or changes behaviour",
    ],
    modelAnswer: "The association could set up a collection point where plastic is sorted and sold to recyclers, so litter is removed and young people earn some income. It could also meet the council to agree a regular refuse collection day, so residents no longer need to burn rubbish that piles up.",
    hints: ["One solution for the plastic, one for the smoke."],
    explanation: "One mark for each suitable suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: source("Source A", "a table of complaints received by a fictional town council in one year",
      table(["Complaint", "Number of complaints"], [["Uncollected refuse and burning rubbish", 140], ["Sewage running in streets", 95], ["Loud music at night", 60], ["Factory smoke", 25]])) +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which type of pollution is shown by the complaint received **least** often?",
        options: [
          ["air pollution from industry", "Correct: factory smoke has 25 complaints, the fewest."],
          ["noise pollution", "Loud music has 60 complaints."],
          ["water and land pollution from sewage", "Sewage has 95 complaints."],
          ["pollution from waste and burning", "Refuse and burning have 140, the most."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** types of pollution caused by uncollected refuse.",
        points: ["Land pollution (litter, rotting waste)", "Air pollution (smoke from burning)"],
        modelAnswer: "Land pollution from litter and rotting waste, and air pollution from burning it.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest which complaint the council should deal with first, and explain your choice.",
        points: [
          "Chooses a complaint, e.g. sewage or refuse",
          "Uses the data (e.g. refuse is the most common complaint, or sewage carries the greatest health risk)",
          "Explains the health or environmental reason (e.g. sewage spreads cholera)",
        ],
        modelAnswer: "The council should first repair the sewers. Although refuse brings more complaints (140 against 95), sewage in streets carries the greatest risk, because it can spread cholera and dysentery very quickly.",
      }),
    ],
    hints: ["In (c), you may choose either, but justify it with the table AND with a reason."],
    explanation: "A data-based practice item on sources of pollution and priorities.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about reducing pollution.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** measures used to reduce pollution in Zimbabwe.",
        points: [
          "Measure 1, e.g. laws and EMA licensing/fines",
          "Described: how it reduces pollution",
          "Measure 2, e.g. recycling, awareness campaigns, cleaner technology, sanitation",
          "Described: how it reduces pollution",
        ],
        modelAnswer: "EMA licenses factories and mines that discharge waste, inspects them and fines those that break the rules, which pushes polluters to treat their waste. Recycling projects collect plastic, paper and metal so that less waste is dumped or burnt.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Laws alone cannot reduce pollution.\" How far do you agree?",
        points: [
          ["Laws do help: rules on discharges, fines, polluter pays, licensing deter some polluters", 2],
          ["Limits of laws: few inspectors, weak enforcement, fines cheaper than cleaning, people lack alternatives", 2],
          ["Other measures needed: awareness, refuse collection, recycling, cleaner technology, sanitation", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Laws are important. The Environmental Management Act sets rules on discharges and dumping, and EMA licenses and fines polluters, so some factories treat their effluent rather than pay.\n\nHowever, laws have limits. There are too few inspectors to watch every factory, river and dumpsite, and a fine may cost less than new equipment. Residents may break a ban on burning rubbish when refuse is never collected.\n\nOther measures are needed alongside the law: awareness campaigns change habits, regular refuse collection and recycling give people an alternative, cleaner technology stops pollution at the source, and working sewers keep sewage out of rivers.\n\nI largely agree. Laws set the standard and punish the worst polluters, but pollution falls only when they are combined with services, technology and changed behaviour.",
      }),
    ],
    hints: ["In (b), ask what people need besides a rule."],
    explanation: "A practice evaluative item assessing pollution control measures.",
  });

  b.card("DEFINITION", "Pollution", "The release of harmful substances or energy (e.g. noise) into air, water or land.");
  b.card("DEFINITION", "Pollutant", "A substance or form of energy that causes pollution, e.g. smoke, sewage, plastic, mercury, noise.");
  b.card("DEFINITION", "Point source (of pollution)", "One identifiable place pollution comes from, e.g. a factory pipe.");
  b.card("DEFINITION", "Non-point source", "Pollution from many scattered places, e.g. fertiliser washed off many farms.");
  b.card("FACT", "Name the four main types of pollution.", "Air, water, land (soil) and noise.");
  b.card("FACT", "Which agency licenses and monitors polluters in Zimbabwe?", "The Environmental Management Agency (EMA), under the Environmental Management Act.");
  b.card("CONCEPT", "What does 'the polluter pays' mean?", "Whoever causes pollution should pay for the damage and the clean-up.");
  b.card("CONCEPT", "Why is pollution usually highest in towns and mining areas?", "Many people, vehicles, factories and waste are crowded together, and mines release dust and chemicals.");
  b.card("CONCEPT", "Why may a ban on burning rubbish fail?", "If refuse is not collected, people have no realistic alternative and keep burning it.");
});
