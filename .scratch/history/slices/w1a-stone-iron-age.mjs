// W1a: hist.precolonial.stone-iron-age (ZIMSEC 4.1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.precolonial.stone-iron-age", { file: "precolonial/stone-iron-age", keyPrefix: "precolonial.stone-iron-age" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which tool is typical of the **Early Stone Age**?",
    options: [
      ["The large hand axe", "Correct: heavy hand axes shaped on both sides are the typical Early Stone Age tool."],
      ["The microlith fixed to an arrow", "Microliths belong to the Late Stone Age."],
      ["The iron hoe", "Iron hoes belong to the Iron Age."],
      ["The decorated clay pot", "Pottery is linked with Iron Age farmers in Zimbabwe."],
    ],
    answer: "A",
    explanation: "Early Stone Age: hand axes and cleavers. Middle: flakes and hafted points. Late: microliths, bows and arrows. Iron Age: iron tools and pottery.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who painted most of the rock art found in places such as the Matobo Hills?",
    options: [
      ["San hunter-gatherers", "Correct: the paintings were made by Late Stone Age hunter-gatherers, ancestors of the San."],
      ["Portuguese traders", "The Portuguese arrived in the sixteenth century; the paintings are much older and African."],
      ["Iron Age smiths", "Iron Age farmers had their own crafts; the fine rock paintings are linked with the San."],
      ["Egyptian scribes", "Egyptian writing developed far to the north; the rock art is local."],
    ],
    answer: "A",
    explanation: "Rock paintings of animals, hunting and ceremonies were made by San hunter-gatherers using ochre, charcoal and fat.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Late Stone Age bands own **few possessions**?",
    options: [
      ["They moved often with the seasons and had to carry everything", "Correct: mobility made heavy or bulky possessions impractical."],
      ["Their chiefs took everything they owned as tribute", "Hunter-gatherer bands had no chiefs collecting tribute."],
      ["They were forbidden to own anything by colonial law", "This period was thousands of years before colonial rule."],
      ["They lived in large stone towns with shared storehouses for their goods", "Stone towns came much later, with states such as Great Zimbabwe."],
    ],
    answer: "A",
    explanation: "Hunter-gatherers followed game and wild foods through the year, so possessions had to be light and portable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these was a crop grown by **Early Iron Age** farmers in Zimbabwe?",
    options: [
      ["Sorghum", "Correct: sorghum and millet were the main grains."],
      ["Maize", "Maize came from the Americas and reached Africa only after the sixteenth century."],
      ["Tobacco", "Tobacco also came from the Americas, much later."],
      ["Wheat", "Wheat was the grain of Egypt and the Mediterranean, not Early Iron Age Zimbabwe."],
    ],
    answer: "A",
    explanation: "Early Iron Age farmers grew sorghum, millet, beans and pumpkins. Maize and tobacco are American crops introduced centuries later.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is **smelting**?",
    options: [
      ["Heating ore in a furnace to extract the iron", "Correct: smelting extracts metal from ore."],
      ["Hammering hot iron into the shape of a hoe", "That is forging, which comes after smelting."],
      ["Shaping clay into pots and firing them", "That is pottery-making."],
      ["Chipping flakes from a stone to make a sharp edge", "That is stone tool-making (knapping)."],
    ],
    answer: "A",
    hints: ["Iron is not found as pure metal: it is in rock (ore).", "What must happen before a smith can shape the iron?"],
    explanation: "Iron Age smiths smelted ore in clay furnaces using charcoal and bellows, then forged the iron into tools.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Gokomere and Ziwa are names that archaeologists use for what?",
    options: [
      ["Early Iron Age pottery traditions", "Correct: styles of pottery are named after the sites where they were first studied."],
      ["Late Stone Age rock-painting styles", "They are names for Iron Age pottery traditions."],
      ["Two rulers of the Mutapa state", "They are site names, not people."],
      ["Mining towns founded by the Pioneer Column", "These are archaeological names for Early Iron Age traditions."],
    ],
    answer: "A",
    hints: ["Archaeologists often name a culture after the place where it was first found."],
    explanation: "Gokomere (near Masvingo) and Ziwa (Nyanga area) are Early Iron Age pottery traditions, evidence of the first farming communities.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which change from the Stone Age to the Early Iron Age **best explains** why chiefs became more powerful?",
    options: [
      ["Cattle and stored grain were wealth that could be owned and inherited", "Correct: wealth that could be accumulated created inequality and the power to reward followers."],
      ["People began to paint on rock shelters", "Rock painting was a Stone Age practice and did not create chiefs."],
      ["People hunted with bows and arrows tipped with poison from plants", "This was a Late Stone Age hunting method in mobile, chief-less bands."],
      ["People moved more often with the seasons", "Farmers moved less, not more."],
    ],
    answer: "A",
    hints: ["What could a farmer own that a hunter-gatherer could not easily keep?"],
    explanation: "Farming and herding created wealth (cattle, grain) that some families controlled; this supported chiefs and, later, states.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about relations between hunter-gatherers and Iron Age farmers is **best supported** by the evidence?",
    options: [
      ["Relations varied: some traded and intermarried; others moved away or lost land", "Correct: the evidence shows a mixed picture over many centuries."],
      ["Farmers wiped out all hunter-gatherers within a few years of arriving in the area", "There is no evidence for a sudden destruction; change took centuries."],
      ["Hunter-gatherers and farmers never had any contact", "Archaeology shows exchange of goods and mixing."],
      ["Hunter-gatherers quickly conquered the farmers and took their iron", "There is no evidence of such a conquest."],
    ],
    answer: "A",
    hints: ["Avoid statements that say 'all', 'never' or 'quickly'."],
    explanation: "The meeting of the two ways of life produced trade, intermarriage, retreat to marginal land and land loss, varying from place to place.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Late Stone Age hunter-gatherer bands were ruled by powerful kings.",
    answer: false,
    explanation: "False. Bands were small and had no kings or chiefs; decisions were made by discussion, with respect for elders and skilled hunters.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Early Iron Age farmers lived in permanent villages of pole-and-daga huts.",
    answer: true,
    explanation: "True. Farming tied people to their fields, so they built permanent villages with grain bins and cattle enclosures.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each period with a typical tool or object.",
    pairs: [
      ["Early Stone Age", "Large hand axe"],
      ["Middle Stone Age", "Flake point fixed to a wooden spear"],
      ["Late Stone Age", "Microlith on an arrow"],
      ["Early Iron Age", "Iron hoe"],
    ],
    explanation: "Tools became smaller and more specialised through the Stone Age; the Iron Age brought metal tools.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each Early Iron Age activity with the area of life it belongs to.",
    pairs: [
      ["Herding cattle, sheep and goats", "Economic"],
      ["A headman settling disputes with elders", "Political"],
      ["Kinship ties and a division of labour between men and women", "Social"],
      ["Rituals to consult the ancestors about rain", "Religious"],
    ],
    explanation: "Exam answers on organisation are usually set out under economic, political, social and religious headings.",
  });
  {
    // Chronological order (earliest first), approximate.
    const events = [
      "Hand axes are made in southern Africa",
      "Middle Stone Age people fix flake points to wooden spears",
      "Late Stone Age hunters use microliths and bows and arrows",
      "Iron-working farmers settle in Zimbabwe",
    ];
    const order = [3, 1, 0, 2];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these developments in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Tools became smaller and more specialised over time.", "Metal came last."],
      explanation: "Early Stone Age hand axes (more than a million years ago), Middle Stone Age hafted points (from about 250,000 years ago), Late Stone Age microliths (from about 40,000 years ago), Early Iron Age farmers (about 200-500 CE).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Very small, sharp stone blades fixed to arrows are called {{blank:a}}. San painters made red and yellow paint from {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["microliths"], choices: ["microliths", "hand axes", "cleavers", "hoes"] },
      { id: "b", accepted: ["ochre"], choices: ["ochre", "iron ore", "papyrus", "copper"] },
    ],
    explanation: "Microliths are Late Stone Age tools; ochre (coloured earth) was mixed with fat to make paint.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the material, made by burning wood, that Iron Age smiths used as fuel in their furnaces.",
    accepted: ["charcoal"],
    wrong: ["coal", "dung"],
    explanation: "**Charcoal** burns hotter than wood and was used with bellows to reach the temperatures needed for smelting.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the way of life of Late Stone Age people in Zimbabwe.",
    points: [
      "Lived by hunting wild animals (with bows and poisoned arrows)",
      "Gathered wild plants, fruits, roots, insects and honey",
      "Lived in small, mobile bands of related families, moving with the seasons",
      "No chiefs: decisions by discussion; shared food and owned few possessions",
      "Made microliths and bone tools; painted on rock shelters",
    ],
    modelAnswer: "Late Stone Age people hunted animals with bows and poisoned arrows and gathered roots, fruits, insects and honey. They lived in small bands of related families and moved with the seasons, sheltering in caves and rock shelters. They had no chiefs; elders and skilled hunters were respected and food was shared. They made microliths and bone tools, owned few possessions, and painted animals, hunts and ceremonies on rock walls.",
    explanation: "One mark per distinct point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the political, economic and social organisation of Early Iron Age communities.",
    points: [
      "Political: villages led by a headman or chief, the senior man of the founding family",
      "Political: elders advised; disputes settled at the chief's court",
      "Economic: grew sorghum, millet, beans and pumpkins; herded cattle, sheep and goats",
      "Economic: smelted iron and made tools; made pottery; traded iron, salt and copper",
      "Social: permanent villages of pole-and-daga huts; kinship bound families together",
      "Social: respect for ancestors; division of labour between men and women",
    ],
    hints: ["Two points for each of the three headings."],
    modelAnswer: "Politically, each village was led by a headman or chief, usually the senior man of the founding family, who settled disputes with the advice of elders. Economically, people grew sorghum, millet, beans and pumpkins, kept cattle, sheep and goats, smelted iron to make hoes and spears, made pottery and traded iron, salt and copper. Socially, they lived in permanent villages of pole-and-daga huts, were bound together by kinship, respected their ancestors, and divided work between men and women.",
    explanation: "Two marks per heading.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the introduction of farming and iron working changed society in Zimbabwe.",
    points: [
      ["Farming produced a reliable surplus, so populations grew and people settled in permanent villages", 2],
      ["Iron tools cleared and cultivated land more efficiently / made better weapons", 2],
      ["Cattle and grain were wealth that could be accumulated, leading to inequality and more powerful chiefs", 2],
    ],
    hints: ["Think of a chain of consequences: food, settlement, wealth, power."],
    modelAnswer: "Farming gave a more reliable food supply and a surplus, so more people could be fed and families settled in permanent villages instead of moving in bands. Iron hoes and axes made it easier to clear and cultivate land, which increased the surplus, and iron spears improved hunting and defence. Above all, cattle and stored grain were wealth that could be owned and inherited, so some families became richer than others and their leaders became chiefs with real power, which later made states possible.",
    explanation: "Each change must be explained with its consequence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the source and answer the questions.",
      "",
      source("Source A", "notes by a fictional archaeologist describing an excavation at a village site in Zimbabwe",
        "Under the floors of collapsed daga huts we found broken pots decorated with comb-stamped patterns, a slag heap beside the remains of a clay furnace, burnt sorghum grains, and the bones of cattle and goats. A few small stone flakes lay in the lowest layer, below everything else."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Identify **four** pieces of evidence in Source A that the village belonged to Early Iron Age farmers.", points: ["Daga huts (permanent settlement)", "Decorated pottery", "Slag and a clay furnace (iron smelting)", "Sorghum grains and cattle/goat bones (crops and herding)"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What might the stone flakes in the lowest layer suggest?", points: ["The lowest layer is the oldest", "Stone-tool users (hunter-gatherers) used the site before the farmers"] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far can archaeology alone tell us about the way of life of Early Iron Age communities?", type: "EXTENDED_RESPONSE", points: [["It shows material life well: houses, crops, animals, iron working, pottery, trade goods", 2], ["It shows less about political and religious life, language, names and beliefs; it must be interpreted", 2], ["Supported judgement (e.g. archaeology is the main source but oral tradition and comparison help)", 2]], levels: levels(6), modelAnswer: "Archaeology tells us a great deal about material life. The remains of huts, furnaces, pottery, burnt grain and animal bones show that people lived in villages, smelted iron, made pottery, grew sorghum and kept cattle and goats. But objects cannot tell us the names of leaders, the language people spoke or exactly what they believed, and archaeologists have to interpret what they find. So archaeology is the main source for this period and is very good on the economy, but it tells us much less about politics and religion." }),
    ],
    hints: ["In archaeology, which layers are older: the higher or the lower ones?", "What kinds of question can objects not answer?"],
    explanation: "In an undisturbed site, lower layers are older. Archaeology is strong on material life and weaker on beliefs and politics.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the change from the Stone Age to the Early Iron Age.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "State **four** tools used in the Stone Age or the Iron Age, naming the period of each.", points: ["Hand axe (Early Stone Age)", "Flakes / scrapers / hafted points (Middle Stone Age)", "Microliths / bows and arrows (Late Stone Age)", "Iron hoes / axes / spears (Iron Age)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe **two** ways in which settlement changed from the Late Stone Age to the Early Iron Age.", points: [["From temporary camps and rock shelters to permanent villages", 2], ["From small bands to larger communities with huts, grain bins and cattle enclosures", 2]] }),
      P.manual({ label: "(c)", marks: 8, stem: "\"Iron working was the most important change of the Early Iron Age.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: iron tools made clearing and farming more efficient and gave better weapons", 2], ["For (developed): smiths and iron trade created new skills and exchange", 2], ["Against: farming and herding (food production, surplus, settlement, wealth in cattle) changed society more", 2], ["Supported judgement", 2]], levels: levels(8), modelAnswer: "Iron working was very important. Iron hoes and axes made it much easier to clear bush and cultivate fields, iron spears improved hunting and defence, and smiths became skilled specialists whose goods were traded. However, the change to producing food by farming and herding was arguably more important. Growing crops and keeping cattle created a surplus, larger populations and permanent villages, and cattle became wealth that gave chiefs power. Iron made farming more efficient, but it was farming itself that transformed society, so I largely disagree with the statement." }),
    ],
    hints: ["In (c), compare iron working with farming and herding."],
    explanation: "Strong answers weigh iron working against food production and judge which had the wider effects.",
  });

  b.card("DEFINITION", "What are **hunter-gatherers**?", "People who live by hunting wild animals and collecting wild plants, moving with the seasons.");
  b.card("DEFINITION", "What are **microliths**?", "Very small, sharp stone blades fixed to arrows, spears and knives in the Late Stone Age.");
  b.card("DEFINITION", "What is **smelting**?", "Heating ore with charcoal in a furnace to separate the metal from the rock.");
  b.card("FACT", "Typical tool of the Early Stone Age?", "The large hand axe.");
  b.card("FACT", "Who made the rock paintings of Zimbabwe?", "San hunter-gatherers (Late Stone Age), using ochre, charcoal and fat.");
  b.card("FACT", "Roughly when did Early Iron Age farmers settle in Zimbabwe?", "From about the third to the fifth centuries CE (about 200-500 CE).");
  b.card("FACT", "Name two Early Iron Age pottery traditions in Zimbabwe.", "Gokomere (near Masvingo) and Ziwa (Nyanga area).");
  b.card("FACT", "Main crops of Early Iron Age farmers?", "Sorghum, millet, beans and pumpkins.");
  b.card("CONCEPT", "Why did farming lead to more powerful chiefs?", "Cattle and stored grain were wealth that could be accumulated and inherited, creating inequality and power.");
  b.card("CONCEPT", "Name three changes from the Stone Age to the Iron Age.", "Food production (farming, herding); permanent villages and larger populations; iron tools and pottery; wealth and chiefs.");
});
