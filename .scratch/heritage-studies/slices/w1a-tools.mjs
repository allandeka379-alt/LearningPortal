// W1a: indigenous hunting and production tools (her.identity.tools).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.tools", { file: "identity/tools", keyPrefix: "identity.tools" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an indigenous **hunting** tool?",
    options: [
      ["Spear (pfumo / umkhonto)", "Correct: the spear was thrown at or thrust into animals."],
      ["Winnowing basket (rusero)", "The rusero is a production tool used to clean grain."],
      ["Grinding stones (guyo and huyo)", "Grinding stones are production tools for making flour."],
      ["Mortar and pestle (duri and mutswi)", "These are production tools for pounding grain."],
    ],
    answer: "A",
    explanation: "Hunting tools: spears, bows and arrows, clubs, axes, traps, snares, nets, hunting dogs.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the **hoe** (badza / ikhuba) mainly used for?",
    options: [
      ["Digging and weeding fields", "Correct: the hoe was the main farming tool."],
      ["Grinding grain into flour", "Grain was ground on grinding stones."],
      ["Catching fish in rivers", "Fish were caught with nets, baskets or hooks."],
      ["Pumping air into a furnace", "Bellows pumped air into furnaces."],
    ],
    answer: "A",
    explanation: "The iron hoe was used to dig, plant and weed. It is still widely used today.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **riva**?",
    options: [
      ["A deadfall trap made of a heavy stone propped on sticks", "Correct: the stone falls on small animals that take the bait."],
      ["A wooden club with a heavy round knob carved at one end", "That is a knobkerrie (tsvimbo / induku)."],
      ["A flat basket used to separate husks from grain", "That is a winnowing basket (rusero)."],
      ["A clay furnace in which iron ore was smelted", "A riva is a trap, not a furnace."],
    ],
    answer: "A",
    explanation: "The riva is a deadfall trap: a heavy flat stone propped up over bait falls and traps small animals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why were **bellows** essential for making iron tools?",
    options: [
      ["They pumped air into the furnace to make it hot enough", "Correct: extra air raises the temperature enough to smelt ore."],
      ["They were used to hammer the hot iron into the shape of a hoe", "Hammering on an anvil shaped the iron."],
      ["They cooled the finished tools quickly in water", "Bellows blow air into the fire; they do not cool tools."],
      ["They carried iron ore from the mine to the furnace", "Ore was carried in baskets or by hand."],
    ],
    answer: "A",
    explanation: "Bellows made of skins and clay pipes forced air into the charcoal fire so it became hot enough to smelt iron ore and work iron.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "After pounding sorghum, Chipo's grandmother tosses the grain in a flat basket so the wind blows the husks away. Which tool is she using?",
    options: [
      ["A winnowing basket (rusero)", "Correct: winnowing separates grain from chaff."],
      ["A mortar (duri)", "The mortar is used for pounding, which she has already done."],
      ["A clay pot (hari / imbiza)", "Clay pots are for cooking, brewing and storing."],
      ["A grinding stone (guyo)", "Grinding stones turn grain into flour."],
    ],
    answer: "A",
    explanation: "The winnowing basket (rusero) is used to toss grain so the wind carries away the chaff.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put the stages of making an iron hoe in the correct order.",
    options: [
      ["Mining ore, smelting, forging, fitting a handle", "Correct: ore is dug, smelted in a furnace, hammered into shape, then fitted with a handle."],
      ["Smelting, mining ore, fitting a handle, forging", "Ore must be mined before it can be smelted."],
      ["Forging, mining ore, smelting, fitting a handle", "Iron cannot be forged before it has been mined and smelted."],
      ["Fitting a handle, forging, smelting, mining ore", "This is the reverse of the real order."],
    ],
    answer: "A",
    hints: ["Start with where the iron comes from."],
    explanation: "Mining → smelting (furnace, charcoal, bellows) → forging (hammering) → fitting a wooden handle.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which **best** explains why many rural families still use indigenous production tools such as hoes, mortars and clay pots?",
    options: [
      ["They are cheap, repairable and need no electricity or fuel", "Correct: they suit rural life and local resources."],
      ["The law forbids the use of machines in rural areas", "There is no such law."],
      ["Factory-made tools are not sold anywhere in rural Zimbabwe", "Factory-made tools are widely sold."],
      ["Indigenous tools are faster than any modern machine", "Machines are often faster; indigenous tools are chosen for cost and convenience."],
    ],
    answer: "A",
    hints: ["Think about cost, repairs and energy in a rural home."],
    explanation: "Indigenous tools are affordable, made from local materials, easy to repair and need no electricity or fuel.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A school wants to teach learners about indigenous tools as heritage. Which activity would be **most** effective?",
    options: [
      ["Inviting a local potter and basket weaver to demonstrate their crafts", "Correct: learners see real skills, ask questions and connect the tools with living heritage."],
      ["Asking learners to set snares in the school grounds to catch wild hares", "Setting snares is illegal and harmful; heritage can be learned without hunting."],
      ["Copying a list of tool names from the board into exercise books", "A list gives names but not understanding of how tools were made and used."],
      ["Telling learners that indigenous tools are no longer of any use", "This is untrue: many are still used and are valuable heritage."],
    ],
    answer: "A",
    hints: ["Which activity is safe, legal and shows the skills behind the tools?"],
    explanation: "Demonstrations by skilled craftspeople show how tools are made and used and why they matter, safely and legally.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Shona, the mortar is called duri and the pestle is called mutswi.",
    answer: true,
    explanation: "True. The duri (mortar) is a hollowed log; the mutswi (pestle) is a long wooden pole.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Setting wire snares to catch wild animals is legal today because it is an indigenous practice.",
    answer: false,
    explanation: "False. Hunting without a permit and setting snares are illegal poaching. Indigenous hunting tools are studied as heritage.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tool with its main use.",
    pairs: [
      ["Grinding stones (guyo and huyo)", "Making flour from grain"],
      ["Clay pot (hari / imbiza)", "Cooking, brewing and storing water"],
      ["Net (mambure)", "Catching fish or small animals"],
      ["Knobkerrie (tsvimbo / induku)", "Throwing at small animals and birds"],
    ],
    explanation: "Each indigenous tool had a particular job in hunting or production.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In Ndebele the hoe is called {{blank:a}} and the spear is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["ikhuba"], choices: ["ikhuba", "izembe", "induku", "imbiza"] },
      { id: "b", accepted: ["umkhonto"], choices: ["umkhonto", "induku", "izembe", "imbiza"] },
    ],
    explanation: "Ndebele: ikhuba (hoe), umkhonto (spear), izembe (axe), induku (knobkerrie), imbiza (clay pot).",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the **Shona** word for the hoe?",
    accepted: ["badza"],
    wrong: ["demo", "pfumo"],
    explanation: "The hoe is **badza** in Shona (ikhuba in Ndebele). Demo is the axe; pfumo is the spear.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** indigenous production tools.",
    points: ["One of: hoe, axe, grinding stones, mortar and pestle", "Another from the list or: winnowing basket, basket", "Another from the list or: clay pot, bellows"],
    modelAnswer: "The hoe, the mortar and pestle, and the clay pot.",
    explanation: "One mark per correct production tool.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how **two** indigenous hunting methods were used to catch animals.",
    points: [
      "Names a method, e.g. pit trap",
      "Explains: a hole on an animal path covered with branches, so the animal falls in",
      "Names a second method, e.g. deadfall trap (riva), snare, net or hunting dogs",
      "Explains: e.g. bait under a propped stone that falls; noose tightens; dogs chase and hold the animal",
    ],
    modelAnswer: "A pit trap was a deep hole dug on an animal path and covered with branches, so an animal walking over it fell in and was caught. A riva was a heavy flat stone propped on sticks over bait; when a small animal took the bait, the stone fell and trapped it.",
    hints: ["Describe what was set up and what happened to the animal."],
    explanation: "Two marks per method: name it, then explain how it worked.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest **two** ways in which indigenous production tools could be used to create income for young people today.",
    points: [
      "Suggests e.g. making and selling baskets, pottery or carvings",
      "Explains: sold to tourists, shops or online, giving income while keeping skills alive",
      "Suggests e.g. cultural tourism demonstrations or museum/school workshops",
      "Explains: visitors pay to see or learn the skills, and heritage is promoted",
    ],
    modelAnswer: "Young people could learn to make baskets, clay pots and carvings and sell them to tourists, shops or online buyers, earning money while keeping the skills alive. They could also run demonstrations for tourists or workshops for schools, where visitors pay to see iron working, pottery or weaving.",
    hints: ["Who might pay for indigenous crafts or for learning about them?"],
    explanation: "Credit realistic income ideas, each explained (problem solving).",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "a description of a display in a fictional district museum near Masvingo, described in words", "Glass case 4 shows: an iron hoe blade with a hole for a wooden handle; three iron arrowheads; a clay pot with a pattern of triangles around the neck; two goat-skin bags joined to clay pipes; and a small flat basket made of grass. A label reads: Tools made and used by families in this area before factory-made tools.", { described: true }) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What were the goat-skin bags joined to clay pipes used for?",
        options: [
          ["Pumping air into a furnace (bellows)", "Correct: skin bags and clay pipes formed bellows."],
          ["Carrying water from the river", "Water was carried in clay pots or gourds."],
          ["Storing grain after the harvest season", "Grain was stored in baskets, pots or granaries."],
          ["Making music at ceremonies", "These objects are bellows, not musical instruments."],
        ],
        answer: "A",
        explanation: "Skin bags attached to clay pipes are bellows, used in iron smelting and forging.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **one** hunting tool and **one** production tool shown in the display.",
        points: ["Hunting: iron arrowheads", "Production: any one of hoe blade, clay pot, bellows, flat (winnowing) basket"],
        modelAnswer: "Hunting tool: the iron arrowheads. Production tool: the iron hoe blade.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why displays like this are important for young Zimbabweans.",
        points: ["Show the skills and knowledge of ancestors (heritage)", "Build pride and identity", "Teach how people lived and produced food before factory tools / inspire crafts today"],
        modelAnswer: "The display shows the skills and knowledge of people who lived in the area, which is part of our heritage. Seeing them builds pride and identity, and it teaches young people how families produced food and goods before factory-made tools, which can inspire crafts today.",
      }),
    ],
    hints: ["In (a), think about what was needed to make iron arrowheads and hoes."],
    explanation: "A museum display described in words, used to identify and explain indigenous tools.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on indigenous hunting and production tools.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define an **indigenous tool**.",
        points: ["A tool made by local people from local materials", "using skills passed down through generations"],
        modelAnswer: "A tool made by local people from local materials such as wood, iron, clay or grass, using skills passed down through generations.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe how grain was processed into flour using indigenous tools.",
        points: ["Pounded in a mortar (duri) with a pestle (mutswi) to remove husks", "Winnowed in a rusero so the wind blew away the chaff", "Ground on grinding stones (guyo and huyo)", "into flour, then cooked in a clay pot"],
        modelAnswer: "The grain was first pounded in a wooden mortar (duri) with a pestle (mutswi) to loosen the husks. It was then tossed in a winnowing basket (rusero) so the wind blew away the chaff. The clean grain was ground between the lower stone (guyo) and upper stone (huyo) into flour, which was cooked in a clay pot.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous tools are only of historical interest today.\" Discuss.",
        points: [
          ["For: factory tools, machines and mills have replaced many; hunting tools can no longer legally be used to hunt wildlife", 2],
          ["Against: hoes, axes, mortars, winnowing baskets and clay pots are still used in many rural homes; cheap and need no electricity", 2],
          ["Against: crafts, ceremonies, tourism, museums and sustainable technology give them present-day value", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some indigenous tools are now mainly of historical interest. Grinding mills and factory-made tools have replaced grinding stones and home-made iron tools in many places, and hunting with spears, traps and snares is no longer legal for protected wildlife.\n\nHowever, many indigenous tools are still in daily use. Rural families use hoes, axes, mortars and pestles, winnowing baskets and clay pots because they are cheap, repairable and need no electricity. Baskets, pots and carvings also earn income from tourists, knobkerries and axes are carried at ceremonies, and museums use the tools to teach heritage. Their use of local, renewable materials is a lesson in sustainability.\n\nOverall, the statement is not true. Some tools now belong mainly to history, but many remain part of daily life, culture and the economy.",
      }),
    ],
    hints: ["In (c), separate tools still in use from those that are now mainly heritage."],
    explanation: "Define (a), describe (b) and discuss (c) indigenous tools today.",
  });

  b.card("DEFINITION", "Indigenous tool", "A tool made by local people from local materials using skills passed down through generations.");
  b.card("DEFINITION", "Bellows", "Skins attached to clay pipes, used to pump air into a furnace so it is hot enough to smelt or work iron.");
  b.card("FACT", "Hoe, axe and spear in Shona and Ndebele?", "Hoe: badza / ikhuba. Axe: demo / izembe. Spear: pfumo / umkhonto.");
  b.card("FACT", "What are duri and mutswi?", "The mortar (duri, a hollowed log) and pestle (mutswi, a wooden pole) used to pound grain.");
  b.card("FACT", "What is a riva?", "A deadfall trap: a heavy flat stone propped on sticks over bait, which falls on small animals.");
  b.card("CONCEPT", "Four stages of making an iron tool?", "Mining ore → smelting with charcoal and bellows → forging (hammering) → fitting a wooden handle.");
  b.card("CONCEPT", "How was grain turned into flour with indigenous tools?", "Pound in mortar and pestle, winnow in a rusero, grind on guyo and huyo.");
  b.card("CONCEPT", "Why do indigenous tools matter today?", "Heritage and identity, continued rural use, ceremonies, crafts and income, education, sustainability.");
  b.card("CONCEPT", "Is hunting with snares legal today?", "No: hunting without a permit and setting snares are illegal poaching; wildlife is protected by law.");
});
