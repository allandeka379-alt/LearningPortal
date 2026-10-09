// W2b: Early Iron Age farming communities (her.precolonial.early-iron-age).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.precolonial.early-iron-age", { file: "precolonial/early-iron-age", keyPrefix: "precolonial.early-iron-age" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is the name of an **Early Iron Age** tradition in Zimbabwe?",
    options: [
      ["Gokomere", "Correct: Gokomere is an Early Iron Age pottery tradition in south-central Zimbabwe."],
      ["Mutapa", "Mutapa is a Later Iron Age state."],
      ["Rozvi", "The Rozvi state belongs to the Later Iron Age."],
      ["Khoikhoi", "The Khoikhoi were herders, not an Iron Age farming tradition."],
    ],
    answer: "A",
    explanation: "Gokomere, Ziwa and Zhizo are Early Iron Age traditions named after sites or areas.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **smelting**?",
    options: [
      ["Heating ore with charcoal in a furnace to separate the metal", "Correct: smelting extracts iron from ore."],
      ["Shaping wet clay into pots and firing them in a hot open fire", "That is pottery making."],
      ["Grinding grain into flour on a stone", "That is grinding, a food-processing activity."],
      ["Building huts from poles and daga", "That is a building method."],
    ],
    answer: "A",
    explanation: "Iron ore was smelted in clay furnaces; the smith then forged the iron into tools.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which crops did Early Iron Age farmers in Zimbabwe mainly grow?",
    options: [
      ["Sorghum and millets", "Correct: sorghum, finger millet and pearl millet were the main grains."],
      ["Tobacco and cotton for sale", "These were grown commercially much later."],
      ["Wheat and barley", "These were not the main crops of the period."],
      ["Tea and coffee", "Tea and coffee were introduced as estate crops in the colonial period."],
    ],
    answer: "A",
    explanation: "Drought-tolerant grains such as sorghum and millets, plus beans and gourds.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Archaeologists find **lumps of slag** at an Early Iron Age site. What does this show?",
    options: [
      ["Iron was smelted nearby", "Correct: slag is the waste left after smelting."],
      ["Cattle were kept in a kraal", "Bones and dung would show cattle, not slag."],
      ["Gold was traded with the coast", "Slag does not show long-distance gold trade."],
      ["Rock paintings were made there", "Rock art is found on rock surfaces, not as slag."],
    ],
    answer: "A",
    explanation: "Slag is the glassy waste from iron smelting.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Early Iron Age people live in **more settled villages** than the San?",
    options: [
      ["Their fields and herds tied them to one area", "Correct: farmers stay near their crops and grazing."],
      ["They were forced by kings to live in towns", "There were no kings or towns of this kind yet."],
      ["They could not hunt or gather any wild food", "They still hunted and gathered."],
      ["They lived near the coast to trade with ships", "Most lived inland, far from the coast."],
    ],
    answer: "A",
    explanation: "Farming and herding encourage settlement near fields and grazing.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which development during the Iron Age **most directly** allowed some families to become richer and more powerful?",
    options: [
      ["Producing surplus grain and building up herds of cattle", "Correct: stored wealth gave some families influence."],
      ["Painting pictures of animals on rocks", "Rock art belongs to the San and did not create wealth differences."],
      ["Sharing all meat equally among the whole band", "Equal sharing reduces wealth differences."],
      ["Moving camp every few weeks to follow game", "Nomadic life limits the property people can keep."],
    ],
    answer: "A",
    hints: ["What could be stored and passed on?"],
    explanation: "Surplus food and cattle could be stored, exchanged and inherited, creating differences in wealth that led to chiefdoms.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A pot is found with **comb-stamped** decoration, burnt pole-and-daga, cattle bones and charred sorghum. Which conclusion is **best supported**?",
    options: [
      ["It was a farming village of the Early Iron Age", "Correct: pottery, huts, livestock and crops point to a farming village."],
      ["It was a San rock shelter used by a hunting band", "San camps would not have pole-and-daga huts, cattle or crops."],
      ["It was the capital of the Rozvi state", "Nothing suggests a state capital or stone walls."],
      ["It was a Portuguese trading fair", "There is no evidence of foreign goods or trade."],
    ],
    answer: "A",
    hints: ["Put each find together with what it shows."],
    explanation: "Decorated pottery, huts, livestock bones and crop seeds identify an Iron Age farming village.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about dates for the Early Iron Age is **most accurate**?",
    options: [
      ["It is dated approximately, to roughly the first millennium CE", "Correct: archaeological dating gives ranges, not exact years."],
      ["It began on an exact date recorded by Iron Age writers", "Iron Age communities left no written records."],
      ["It began after the arrival of the Portuguese in 1500", "Iron Age farmers lived here more than a thousand years earlier."],
      ["It ended when Great Zimbabwe was abandoned in 1000 CE", "Great Zimbabwe rose after about 1000 CE; it was not abandoned then."],
    ],
    answer: "A",
    hints: ["How do archaeologists date sites?"],
    explanation: "Dates come from methods such as radiocarbon dating, which give approximate ranges.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Great Zimbabwe was built during the Early Iron Age.",
    answer: false,
    explanation: "False. Great Zimbabwe is a Later Iron Age state; Early Iron Age farmers lived in villages without large stone buildings.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Early Iron Age farmers still hunted and gathered wild foods as well as farming.",
    answer: true,
    explanation: "True. Hunting and gathering added to the food from crops and livestock.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each archaeological find with what it shows.",
    pairs: [
      ["Iron slag", "Iron was smelted"],
      ["Charred sorghum seeds", "Crops were grown"],
      ["Burnt clay with pole marks", "Pole-and-daga huts were built"],
      ["Cattle and goat bones", "Livestock were kept"],
    ],
    explanation: "Each find is evidence for one activity.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The Early Iron Age tradition of the eastern highlands, around Nyanga, is called {{blank:a}}. The Later Iron Age begins at about {{blank:b}} CE.",
    blanks: [
      { id: "a", accepted: ["Ziwa"], choices: ["Ziwa", "Gokomere", "Mutapa", "Torwa"] },
      { id: "b", accepted: ["1000"], choices: ["1000", "200", "1500", "1890"] },
    ],
    explanation: "Ziwa: eastern highlands. The Later Iron Age begins about 1000 CE.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the study of the past through material remains such as pottery and tools called?",
    accepted: ["archaeology", "archeology"],
    wrong: ["anthropology", "geology"],
    explanation: "**Archaeology** studies the material remains people left behind.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** tools or objects that Early Iron Age smiths made from iron.",
    points: ["One, e.g. hoes", "A second, e.g. axes", "A third, e.g. spears / arrowheads / knives / ornaments"],
    modelAnswer: "Hoes, axes and spears.",
    explanation: "One mark per iron item.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which iron tools changed the lives of Early Iron Age communities.",
    points: [
      "Iron hoes and axes cleared and dug land faster",
      "so larger fields were planted and more food produced / surplus stored",
      "Iron spears and arrowheads improved hunting and defence",
      "so communities got more meat and protected their villages and herds",
    ],
    modelAnswer: "Iron axes and hoes made it easier to clear bush and dig the soil, so larger fields could be planted and surplus grain stored. Iron spears and arrowheads made hunting and defence more effective, so communities got more meat and could protect their villages and cattle.",
    hints: ["Think about farming and about hunting or defence."],
    explanation: "Two marks per developed effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how Early Iron Age farming communities prepared the way for the states of the Later Iron Age.",
    points: [
      "Surplus food and cattle created wealth",
      "Developed: families with more wealth gained followers and influence, becoming leaders",
      "Settled villages, iron tools and trade links grew",
      "Developed: larger populations and trade allowed rulers to organise bigger areas, leading to chiefdoms and states",
    ],
    modelAnswer: "Farming and herding produced surplus grain and cattle, so some families became wealthier and gained followers and influence. Settled villages, iron tools and growing trade allowed populations to increase, so leaders could organise larger areas, which led in time to chiefdoms and states such as Great Zimbabwe.",
    hints: ["Wealth, population and trade."],
    explanation: "Two developed points.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the table of finds from a fictional excavation near Chinhoyi (invented for this question).\n\n" +
      table(["Layer", "Finds"], [
        ["Top (most recent)", "Glass beads, decorated pottery, cattle bones, iron slag"],
        ["Middle", "Decorated pottery, goat bones, charred millet, iron hoe blade"],
        ["Bottom (oldest)", "Stone tools, bones of wild antelope, ostrich eggshell pieces"],
      ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which layer **most likely** belongs to hunter-gatherers?",
        options: [
          ["The bottom layer", "Correct: stone tools, wild animal bones and ostrich eggshell suggest hunter-gatherers."],
          ["The middle layer", "Millet and an iron hoe show farming."],
          ["The top layer", "Cattle, slag and pottery show Iron Age farmers."],
          ["All three layers equally", "Only the bottom layer lacks evidence of farming and iron."],
        ],
        answer: "A",
        explanation: "Lower layers are usually older; the bottom layer shows a hunter-gatherer way of life.",
      }),
      P.tf({
        label: "(b)",
        stem: "The glass beads in the top layer suggest that the community had trade links that reached the coast.",
        answer: true,
        explanation: "True. Glass beads were not made locally; they came through trade from the coast.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Using the table, explain **three** changes in the way of life of the people at this site over time.",
        points: [
          "From hunting wild animals to keeping livestock",
          "Evidence: antelope bones in the bottom layer, goat and cattle bones above",
          "From stone tools to iron tools",
          "Evidence: stone tools at the bottom, hoe blade and slag above",
          "Growth of farming and trade",
          "Evidence: charred millet in the middle layer; glass beads in the top layer",
        ],
        modelAnswer: "People changed from hunting wild animals to keeping livestock: the bottom layer has antelope bones, while the layers above have goat and cattle bones. They changed from stone to iron tools, shown by stone tools at the bottom and an iron hoe blade and slag above. They also began farming and later trading, shown by charred millet in the middle layer and glass beads from the coast in the top layer.",
      }),
    ],
    hints: ["Read the layers from the bottom up."],
    explanation: "Interpreting archaeological evidence to show change over time.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on Early Iron Age societies.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the social organisation of Early Iron Age communities.",
        points: ["Lived in villages of pole-and-daga huts", "Organised around the extended family and lineage", "Work divided by gender and age", "Led by lineage or village heads and elders"],
        modelAnswer: "They lived in villages of round pole-and-daga huts with kraals and grain bins. Society was organised around the extended family and lineage. Work was divided: men herded, hunted and worked iron, women farmed and made pottery. Villages were led by lineage or village heads and elders.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Iron working was the most important achievement of Early Iron Age communities.\" Discuss.",
        points: [
          ["For: iron tools allowed larger fields, better hunting and defence, and supported population growth", 2],
          ["Against: crop farming and livestock keeping were equally or more important; they produced surplus and wealth", 2],
          ["Against: settled villages, pottery and trade links also laid foundations for later states", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Iron working was a major achievement. Iron hoes and axes allowed farmers to clear and cultivate larger fields, while iron spears and arrowheads improved hunting and defence. This helped populations to grow.\n\nHowever, other achievements were just as important. Crop farming and livestock keeping provided the food surplus and the wealth in cattle that later allowed chiefdoms and states to form; iron tools were useful mainly because people were farming. Settled villages, pottery for storage and early trade links also laid the foundations for later states.\n\nOverall, iron working was very important, but it was one part of a package of farming, herding, settlement and trade. Farming may be judged the most important, because iron tools served it.",
      }),
    ],
    hints: ["In (b), weigh iron against farming, herding and trade."],
    explanation: "Describe (a) and evaluate (b) Early Iron Age achievements.",
  });

  b.card("DEFINITION", "Iron Age", "The period when people made and used iron tools; in Zimbabwe divided into the Early (first millennium CE) and Later (from about 1000 CE) Iron Age.");
  b.card("DEFINITION", "Smelting", "Heating iron ore with charcoal in a clay furnace to separate the iron.");
  b.card("DEFINITION", "Archaeology", "The study of the past through material remains such as pottery, tools, bones and buildings.");
  b.card("FACT", "Name two Early Iron Age traditions in Zimbabwe.", "Gokomere (near Masvingo) and Ziwa (around Nyanga); also Zhizo in the south-west.");
  b.card("FACT", "Main crops of Early Iron Age farmers?", "Sorghum, finger millet and pearl millet, with beans and gourds.");
  b.card("FACT", "Which animals did Early Iron Age farmers keep?", "Cattle, sheep and goats.");
  b.card("CONCEPT", "Why did iron tools lead to larger villages?", "Iron hoes and axes cleared and dug land faster, so more food was grown and stored to feed more people.");
  b.card("CONCEPT", "Why are Early Iron Age dates given as ranges?", "There are no written records; dating methods such as radiocarbon give approximate ranges.");
  b.card("FACT", "What does iron slag at a site show?", "That iron was smelted there.");
});
