// W4b: Waste management (her.global.waste-management).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.global.waste-management", { file: "global/waste-management", keyPrefix: "global.waste-management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Used needles and bandages from a clinic are an example of which type of waste?",
    options: [
      ["medical waste", "Correct: waste from health care."],
      ["agricultural waste", "This comes from farms."],
      ["domestic waste", "This comes from households."],
      ["electronic waste", "This is old phones, computers and batteries."],
    ],
    answer: "A",
    explanation: "Medical waste comes from clinics and hospitals and must be handled safely.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Turning old plastic bottles into new products is called",
    options: [
      ["recycling", "Correct: used material is processed into new products."],
      ["reducing", "Reducing means producing less waste."],
      ["incineration", "Incineration burns waste."],
      ["littering", "Littering is dropping rubbish carelessly."],
    ],
    answer: "A",
    explanation: "Recycling processes used materials into new products.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which step comes **first** in the waste hierarchy?",
    options: [
      ["reduce", "Correct: avoiding waste is best."],
      ["recycle", "Recycling comes after reducing and reusing."],
      ["dispose in a landfill", "Disposal is the last resort."],
      ["incinerate", "Incineration is a disposal or recovery method."],
    ],
    answer: "A",
    explanation: "The hierarchy is reduce, reuse, recycle, recover, then dispose: avoiding waste comes first.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How can plastic litter cause flooding in towns?",
    options: [
      ["It blocks drains, so storm water cannot flow away", "Correct: blocked drains overflow."],
      ["It absorbs rainwater and swells up", "Plastic does not absorb water."],
      ["It makes rain heavier", "Litter does not change rainfall."],
      ["It raises the level of rivers by melting", "Plastic does not melt in rivers."],
    ],
    answer: "A",
    explanation: "Plastic and litter block storm drains, so water floods streets and homes.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which body is responsible for collecting refuse in an urban area?",
    options: [
      ["the urban council", "Correct: councils collect refuse and enforce by-laws."],
      ["the Supreme Court", "Courts decide cases; they do not collect refuse."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Grain Marketing Board", "The GMB buys and stores grain."],
    ],
    answer: "A",
    explanation: "Local authorities (urban councils, rural district councils) collect and dispose of refuse.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A school wants to deal with the vegetable peelings from its kitchen in the cheapest way that also helps its garden. What should it do?",
    options: [
      ["compost the peelings", "Correct: composting turns organic waste into fertiliser."],
      ["burn them in an open pit", "Burning pollutes the air and wastes nutrients."],
      ["send them to an incinerator", "Incineration is costly and wasteful for food scraps."],
      ["dump them behind the classrooms", "Dumping attracts flies and rats."],
    ],
    answer: "A",
    hints: ["Which method turns waste into something useful for soil?"],
    explanation: "Composting is cheap and turns organic waste into fertiliser for the garden.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Mthulisi takes a cloth bag to the shops instead of accepting new plastic bags. Which step of the waste hierarchy is he following?",
    options: [
      ["reduce", "Correct: he avoids creating plastic waste."],
      ["recycle", "Recycling processes waste that already exists."],
      ["dispose", "He is not getting rid of anything."],
      ["recover", "Recovery gets energy or compost from waste."],
    ],
    answer: "A",
    hints: ["Does any plastic waste exist in the first place?"],
    explanation: "Using a reusable bag means less waste is produced: reduce.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **strongest** criticism of relying only on landfills to manage waste?",
    options: [
      ["They deal with waste after it is made and can pollute if badly managed", "Correct: landfills do not reduce waste and may pollute water and air."],
      ["They are the cheapest and cleanest approach for every type of waste in every town", "This is not a criticism, and it is not true."],
      ["They make recycling compulsory for everyone", "Landfills have no effect of this kind."],
      ["They can only hold medical waste", "Landfills take many kinds of waste."],
    ],
    answer: "A",
    hints: ["Think about the waste hierarchy and pollution."],
    explanation: "Landfills are a last resort: they need land, can leak pollution and methane, and do nothing to reduce waste.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Old phones, computers and batteries are called electronic waste (e-waste).",
    answer: true,
    explanation: "True. E-waste can contain harmful substances and needs special handling.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Burning rubbish in the backyard is a safe way to dispose of plastic.",
    answer: false,
    explanation: "False. Burning plastic releases smoke and poisonous gases that harm health.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of waste with an example.",
    pairs: [
      ["domestic waste", "vegetable peelings from a kitchen"],
      ["industrial waste", "chemical effluent from a factory"],
      ["agricultural waste", "empty pesticide containers"],
      ["electronic waste", "a broken mobile phone"],
    ],
    explanation: "Each example matches its source: homes, factories, farms and electronic devices.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the waste hierarchy.",
    template: "Reduce, then {{blank:a}}, then recycle, then recover, and finally {{blank:b}} safely.",
    blanks: [
      { id: "a", accepted: ["reuse"], choices: ["reuse", "burn", "dump", "litter"] },
      { id: "b", accepted: ["dispose"], choices: ["dispose", "reduce", "compost", "collect"] },
    ],
    explanation: "Reduce, reuse, recycle, recover, dispose.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** problems caused by poor waste disposal.",
    points: [
      "Any one of: disease (flies, rats, cholera), air pollution from burning, water/soil pollution, flooding from blocked drains, animals swallowing plastic, injuries, ugliness/lost tourism",
      "A second different problem",
      "A third different problem",
      "A fourth different problem",
    ],
    modelAnswer: "Spread of disease, air pollution from burning, blocked drains causing flooding, and livestock swallowing plastic.",
    explanation: "One mark per correct problem.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** roles of citizens in waste management.",
    points: [
      "Identifies reducing and reusing",
      "Develops: less waste is produced, so less needs collecting",
      "Identifies using bins / not littering, burning or dumping",
      "Develops: streets and drains stay clean; less pollution",
      "Identifies taking part in clean-ups / recycling / reporting illegal dumping / paying rates",
      "Develops: e.g. rates fund collection; reports help EMA and councils act",
    ],
    modelAnswer: "Citizens can reduce and reuse, for example by carrying cloth bags, so less waste needs collecting. They should put rubbish in bins and never burn or dump it, which keeps streets and drains clean. They can take part in clean-ups and report illegal dumping, which helps the council and EMA act against offenders.",
    hints: ["What can each person do before, during and after waste is made?"],
    explanation: "One mark for each role and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a fictional rural district council near Marondera could improve waste management at a growing business centre, and explain how each would help.",
    points: [
      "Suggests providing skips/bins and a regular collection day",
      "Explains that waste is not left to pile up, so burning and dumping fall",
      "Suggests separating waste for composting and recycling / by-laws with fines / awareness for traders",
      "Explains how it reduces the waste to be disposed of or changes behaviour",
    ],
    modelAnswer: "The council could place skips at the business centre and collect them on a fixed day each week, so rubbish does not pile up and traders no longer burn it. It could also ask traders to separate organic waste for a compost site and plastic for a recycler, which reduces the amount of waste the council must dispose of.",
    hints: ["Collection and reduction."],
    explanation: "One mark for each suitable way and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: source("Source A", "a report in a fictional town newsletter, Midlands Province, 2026",
      "Residents of Ward 7 say refuse trucks came only twice in the past three months. Heaps of rubbish now stand at every street corner. Some residents burn the heaps at night; others dump bags in the stream behind the market. The council says it has only two working trucks for the whole town. A group of young people has started collecting plastic bottles and selling them to a recycler.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "According to the source, what is the council's explanation for the problem?",
        options: [
          ["it has too few working trucks", "Correct: only two trucks for the whole town."],
          ["residents refuse to pay rates", "This is not mentioned in the source."],
          ["the recycler buys too many bottles", "Recycling is not blamed."],
          ["the stream is too far from the market", "The source does not say this."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** harmful ways residents are disposing of waste.",
        points: ["Burning the heaps (air pollution)", "Dumping bags in the stream (water pollution)"],
        modelAnswer: "Burning rubbish at night and dumping bags in the stream.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain whether the young people's recycling project can solve the ward's waste problem.",
        points: [
          "It helps: removes some plastic and earns income",
          "But it deals only with one material (plastic bottles), not food or other waste",
          "Judgement: it must be combined with regular collection / more trucks / composting",
        ],
        modelAnswer: "The project helps, because it removes some plastic from the streets and gives young people an income. But it deals only with plastic bottles, not food scraps or other waste. It cannot solve the problem alone: the council still needs regular collection, and composting could deal with organic waste.",
      }),
    ],
    hints: ["In (c), what types of waste does the project leave behind?"],
    explanation: "A source-based practice item evaluating a local waste problem and response.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about approaches to waste management.",
    parts: [
      P.manual({
        label: "(a)", marks: 6,
        stem: "Describe the roles of local authorities, EMA and businesses in waste management.",
        points: [
          "Local authorities: collect refuse, provide bins/skips",
          "run disposal sites and enforce by-laws",
          "EMA: sets standards, licenses waste sites and hazardous waste handlers",
          "inspects, educates and fines offenders / bans polluting products",
          "Businesses: manage their own industrial waste safely",
          "reduce packaging and take part in recycling",
        ],
        modelAnswer: "Local authorities collect refuse, provide bins and skips, run disposal sites and enforce by-laws against dumping. EMA sets standards for waste disposal, licenses waste sites and handlers of hazardous waste, inspects them, educates the public and fines offenders. Businesses must manage their own industrial waste safely, reduce packaging and take part in recycling.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Recycling is the best answer to Zimbabwe's waste problem.\" Discuss.",
        points: [
          ["For recycling: saves materials and energy, reduces dumped waste, creates income and jobs", 2],
          ["Limits: not all materials have buyers; collection systems limited; organic waste and e-waste need other methods", 2],
          ["Other approaches: reduce and reuse (higher in hierarchy), composting, regular collection, managed landfills", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Recycling has clear benefits. It turns plastic, paper, glass and metal into new products, saves raw materials and energy, reduces the waste sent to dumps and gives income to collectors and small businesses.\n\nBut recycling has limits. Not every material has a buyer, collection points are few, and much household waste is food and garden waste, which cannot be recycled in this way. E-waste and medical waste need special handling.\n\nOther approaches matter as much or more. Reducing and reusing come higher in the waste hierarchy because they avoid waste altogether. Composting suits the large share of organic waste. Regular collection and managed landfills are still needed for what remains.\n\nI disagree that recycling is the best answer on its own. It is a valuable part of the solution, but Zimbabwe's waste problem needs reduction, composting, collection and recycling working together.",
      }),
    ],
    hints: ["In (b), use the waste hierarchy to weigh recycling against other steps."],
    explanation: "A practice evaluative item on waste management approaches.",
  });

  b.card("DEFINITION", "Waste management", "Collecting, transporting, treating, recycling and safely disposing of waste, and reducing how much is produced.");
  b.card("DEFINITION", "Recycling", "Processing used materials so they can be made into new products.");
  b.card("DEFINITION", "Composting", "Letting organic waste rot into material that improves soil.");
  b.card("DEFINITION", "Landfill", "A site where waste is buried in layers and covered with soil, ideally lined and managed to prevent pollution.");
  b.card("FACT", "Name the five types of waste in the syllabus.", "Domestic, industrial, agricultural, medical and electronic.");
  b.card("CONCEPT", "What is the waste hierarchy?", "Reduce, reuse, recycle, recover, then dispose safely as a last resort.");
  b.card("CONCEPT", "Give three problems of poor waste disposal.", "Disease (flies, rats, cholera), pollution from burning and dumping, flooding from blocked drains (also harm to animals, injury).");
  b.card("CONCEPT", "What does EMA do in waste management?", "Sets standards, licenses waste sites, inspects, educates and fines offenders; bans some polluting products.");
  b.card("CONCEPT", "Why is composting well suited to Zimbabwe?", "Much household waste is organic; composting is cheap and produces fertiliser for gardens.");
});
