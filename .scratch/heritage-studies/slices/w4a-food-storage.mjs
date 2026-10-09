// W4a: Storage and preservation of indigenous and contemporary foods (her.production.food-storage).
// Reviewer note: Shona/Ndebele pairs as in the concept description (madora/amacimbi, mufushwa/umfushwa, dovi/idobi,
// dura/ingqolobane); lesson also gives mapfunde/amabele (sorghum), rukweza or zviyo/uphoko (finger millet), mhunga
// (pearl millet), nyimo/indlubu (round nuts) — please confirm spellings. Hygiene matches general public advice.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.production.food-storage", { file: "production/food-storage", keyPrefix: "production.food-storage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are **madora** (amacimbi)?",
    options: [
      ["mopane worms gathered from mopane trees", "Correct: edible caterpillars, usually dried."],
      ["leafy vegetables that have been sun-dried", "That is mufushwa / umfushwa."],
      ["peanut butter made from roasted groundnuts", "That is dovi / idobi."],
      ["round nuts (Bambara groundnuts)", "These are nyimo / indlubu."],
    ],
    answer: "A",
    explanation: "Madora / amacimbi are mopane worms, a protein-rich indigenous food that is cleaned and dried for storage.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **dura** (ingqolobane) used for?",
    options: [
      ["storing grain", "Correct: a granary keeps grain dry and safe from pests."],
      ["smoking fish", "Fish is smoked over a fire."],
      ["brewing traditional beer", "Beer is brewed in pots."],
      ["keeping cattle at night", "Cattle are kept in a kraal."],
    ],
    answer: "A",
    explanation: "A dura / ingqolobane is a granary, often raised on stones or poles, that keeps grain dry and away from rats and termites.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does **sun-drying** preserve food?",
    options: [
      ["It removes water, so bacteria and moulds cannot grow", "Correct: microorganisms need moisture."],
      ["It adds a layer of salt to the food that kills all the insects in it", "Salting is a different method."],
      ["It keeps the food very cold", "Cold preserves food in fridges and freezers."],
      ["It seals the food inside a metal tin", "That is canning."],
    ],
    answer: "A",
    explanation: "Without water, bacteria, yeasts and moulds cannot grow, so dried food keeps for months.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which method is a **contemporary** way of preserving food?",
    options: [
      ["canning", "Correct: food is heated and sealed in tins."],
      ["smoking over the hearth", "This is an indigenous method."],
      ["storing in a granary", "This is an indigenous storage method."],
      ["mixing grain with ash", "This is an indigenous way of keeping pests away."],
    ],
    answer: "A",
    explanation: "Contemporary methods include canning, refrigeration, freezing, packaging and pasteurisation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a traditional granary often **raised** on stones or poles?",
    options: [
      ["to keep the grain dry and away from rats and termites", "Correct: raising it protects against damp and pests."],
      ["so that the grain can be cooked inside it", "Grain is not cooked in the granary."],
      ["to make the grain ripen faster after harvest", "Grain is harvested when ripe; storage does not ripen it."],
      ["so that cattle can shelter underneath", "This is not its purpose."],
    ],
    answer: "A",
    hints: ["What spoils stored grain?"],
    explanation: "Raising the granary keeps damp from the ground and pests such as rats and termites away from the grain.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai finds that groundnuts stored in a damp corner have grown mould. What should the family do?",
    options: [
      ["Throw them away, because some moulds produce poisons", "Correct: mouldy nuts can contain aflatoxins."],
      ["Wash them and use them to make dovi", "Washing does not remove poisons made by moulds."],
      ["Mix them with fresh groundnuts so the mould is diluted", "This spreads the problem."],
      ["Feed them to small children because they are soft", "This is dangerous."],
    ],
    answer: "A",
    hints: ["What can some moulds produce?"],
    explanation: "Mouldy groundnuts and grain can contain aflatoxins, which cause serious illness; they should be thrown away and stores kept dry.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why are **small grains** such as sorghum and millet important for food security in dry regions?",
    options: [
      ["They tolerate drought better than maize", "Correct: they still yield in poor rainfall seasons."],
      ["They grow only in very wet places", "They are suited to dry areas."],
      ["They cannot be stored at all", "Small grains store well."],
      ["They are imported every year", "They are grown locally."],
    ],
    answer: "A",
    hints: ["Think about rainfall."],
    explanation: "Small grains survive drought better than maize and store well, so they protect families in poor seasons.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **strongest** reason for a rural family to keep using indigenous storage methods alongside shop-bought food?",
    options: [
      ["They are cheap and protect the family when prices rise or roads are cut", "Correct: they support household food security."],
      ["They never allow any pests, damp or mould to reach the stored food at any time", "Indigenous methods can also fail if not done well."],
      ["They make all food last for ever", "No method makes food last for ever."],
      ["They are required by law in rural areas", "There is no such law."],
    ],
    answer: "A",
    hints: ["Think about cost and independence from shops."],
    explanation: "Indigenous methods use little money and local materials, so a family's own stored food protects it from shortages and high prices.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mufushwa (umfushwa) is made by drying leafy vegetables.",
    answer: true,
    explanation: "True. Leaves such as pumpkin or cowpea leaves are blanched and sun-dried.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Food that has thawed should be frozen again to keep it safe.",
    answer: false,
    explanation: "False. Thawed food should not be refrozen; it should be cooked and eaten, because bacteria may have multiplied while it thawed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each indigenous food (Shona / Ndebele) with what it is.",
    pairs: [
      ["madora / amacimbi", "mopane worms"],
      ["mufushwa / umfushwa", "dried leafy vegetables"],
      ["dovi / idobi", "peanut butter"],
      ["mapfunde / amabele", "sorghum"],
    ],
    explanation: "These indigenous foods are still widely eaten across Zimbabwe.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about how food is preserved.",
    template: "Salting preserves meat because salt draws out {{blank:a}}. Refrigeration preserves milk because {{blank:b}} slows the growth of bacteria.",
    blanks: [
      { id: "a", accepted: ["water"], choices: ["water", "smoke", "air", "sugar"] },
      { id: "b", accepted: ["cold"], choices: ["cold", "heat", "light", "salt"] },
    ],
    explanation: "Salt removes water; cold slows bacteria.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the best method for each situation.",
    template: "A fisherman at Kariba with no electricity should {{blank:a}} his fish. A family in town with a freezer wants to keep chicken for two weeks: they should {{blank:b}} it.",
    blanks: [
      { id: "a", accepted: ["sun-dry or smoke"], choices: ["sun-dry or smoke", "freeze", "pasteurise", "can"] },
      { id: "b", accepted: ["freeze"], choices: ["freeze", "smoke", "sun-dry", "salt"] },
    ],
    hints: ["Which methods need electricity?"],
    explanation: "Without electricity, drying and smoking are suitable; with a freezer, freezing keeps chicken safely.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona or Ndebele name for peanut butter made by grinding roasted groundnuts.",
    accepted: ["dovi", "idobi", "dovi/idobi", "dovi idobi"],
    wrong: ["nyimo"],
    explanation: "Dovi (Shona) / idobi (Ndebele) is used to flavour relishes.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** indigenous methods of preserving or storing food.",
    points: [
      "Any one of: sun-drying; smoking; salting; granaries (dura / ingqolobane); sealed clay pots or gourds; pits; mixing grain with ash or leaves",
      "A second different method",
      "A third different method",
    ],
    modelAnswer: "Sun-drying, smoking and storing grain in a raised granary.",
    explanation: "One mark per correct method.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why indigenous foods are important.",
    points: [
      "Identifies: nutrition",
      "Develops: e.g. mopane worms and groundnuts provide protein; leafy vegetables provide vitamins and minerals",
      "Identifies: food security / heritage / income / low cost",
      "Develops: e.g. small grains tolerate drought and dried foods last through the dry season",
    ],
    modelAnswer: "Indigenous foods are nutritious: mopane worms and groundnuts are rich in protein, and leafy vegetables provide vitamins and minerals. They also support food security, because small grains survive drought better than maize and dried foods last through the dry season.",
    hints: ["Think about health and about bad seasons."],
    explanation: "One mark for each reason and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A school in Masvingo wants learners to value indigenous foods. Suggest **two** activities and explain how each would help.",
    points: [
      "Suggests a food fair / cooking day where families prepare indigenous dishes",
      "Explains that learners taste the foods and learn recipes and preservation methods from elders",
      "Suggests a school garden of small grains and indigenous vegetables / drying project",
      "Explains that learners practise growing and preserving foods and see their value for food security",
    ],
    modelAnswer: "The school could hold an indigenous food fair where parents and grandparents cook dishes such as mufushwa with dovi, so learners taste them and learn recipes and methods from elders. It could also start a garden of small grains and indigenous vegetables and dry the harvest, so learners practise the methods and see how these foods protect families in dry years.",
    hints: ["Think about tasting, learning from elders and growing."],
    explanation: "One mark for each activity and one for explaining its effect.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a description of a homestead in Gwanda written by a fictional student, 2026",
      "Behind the kitchen hut stands a small granary raised on flat stones, with a thatched lid. Inside the kitchen, strips of meat hang above the fire, and a clay pot sealed with mud holds sorghum seed for next season. My grandmother mixes a little ash into the beans before she stores them.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which preservation method is used for the meat in the source?",
        options: [
          ["smoking", "Correct: it hangs above the fire."],
          ["canning", "Canning uses sealed tins."],
          ["freezing", "There is no freezer in the source."],
          ["pasteurisation", "This is used for milk and juice."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** other storage or preservation methods described in the source.",
        points: ["raised granary (on stones, with a lid)", "sealed clay pot / ash mixed with beans"],
        modelAnswer: "A granary raised on stones, and a clay pot sealed with mud.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why storing sorghum seed in a sealed pot is important for the family.",
        points: [
          "The seal keeps out insects, damp and rats",
          "so the seed stays healthy and able to grow",
          "the family has seed to plant next season / does not need to buy seed (food security)",
        ],
        modelAnswer: "The sealed pot keeps out insects, damp and rats, so the seed stays healthy and able to grow. This means the family has its own seed to plant next season and does not have to buy it, which protects its food supply.",
      }),
    ],
    hints: ["In (c), think about next season."],
    explanation: "A source-based practice item on indigenous storage and preservation.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "This question is about methods of storing and preserving food.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe how **two** contemporary methods preserve food.",
        points: [
          "Names a contemporary method (e.g. refrigeration / freezing)",
          "Describes how it works (cold slows or stops bacteria)",
          "Names a second method (e.g. canning / packaging / pasteurisation)",
          "Describes how it works (heat kills microorganisms and the sealed tin keeps air out)",
        ],
        modelAnswer: "Freezing keeps food at very low temperatures so that bacteria cannot multiply. Canning heats food in sealed tins, killing microorganisms, and the seal keeps air and new germs out.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous methods of preserving food are better than contemporary methods.\" How far do you agree?",
        points: [
          ["For indigenous: cheap, local materials, no electricity; support food security and heritage", 2],
          ["For contemporary: longer storage, convenience, hygiene standards, variety, large-scale transport", 2],
          ["Limitations: indigenous methods can fail with damp and pests; contemporary methods cost money and need electricity / power cuts", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Indigenous methods have clear strengths. Sun-drying, smoking and granaries use local materials and no electricity, so they suit rural families and cost little. They keep food through the dry season and preserve heritage and knowledge.\n\nContemporary methods also have strengths. Freezing, canning and packaging keep food safe for longer, meet hygiene standards and allow food to be transported across the country, giving variety all year. However, they cost money and many depend on electricity, so power cuts can spoil frozen food. Indigenous methods can fail too, if grain is stored damp or pests get in.\n\nI partly agree. Indigenous methods are better for cheap, independent household food security, while contemporary methods are better for convenience and large-scale supply. The best approach uses both, with good hygiene.",
      }),
    ],
    hints: ["In (b), think about cost, electricity, hygiene and scale."],
    explanation: "A practice evaluative item comparing indigenous and contemporary preservation.",
  });

  b.card("DEFINITION", "Food preservation", "Treating food so it does not go bad quickly, by slowing or stopping bacteria, moulds and yeasts.");
  b.card("DEFINITION", "Food security", "When all people at all times have enough safe and nutritious food.");
  b.card("FACT", "What are madora / amacimbi?", "Mopane worms: edible caterpillars gathered from mopane trees and dried.");
  b.card("FACT", "What is mufushwa / umfushwa?", "Leafy vegetables, blanched and sun-dried for use in the dry season.");
  b.card("FACT", "What is a dura / ingqolobane?", "A granary, often raised on stones or poles, for storing grain.");
  b.card("FACT", "Name four contemporary methods of preserving food.", "Refrigeration, freezing, canning, packaging (also pasteurisation).");
  b.card("CONCEPT", "Why should mouldy groundnuts or grain be thrown away?", "Some moulds produce poisons (aflatoxins) that cause serious illness; washing does not remove them.");
  b.card("CONCEPT", "Why do small grains matter for food security?", "They tolerate drought better than maize and store well.");
  b.card("CONCEPT", "Give four food hygiene rules for storage.", "Wash hands; use clean, dry, sealed containers; dry food fully; keep raw meat away from cooked food (also check dates, do not refreeze).");
});
