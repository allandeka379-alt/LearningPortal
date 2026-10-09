// Slice W2b: classification of crop plants.
import { concept, P, CAM, table, agricultureLevels } from "../lib.mjs";

const PLOT_TABLE = table(["Bed", "Crop grown last season", "Problem seen"], [
  ["1", "Tomatoes", "Plants wilted suddenly; stems showed brown streaks inside"],
  ["2", "Cabbages", "Many small holes in leaves; small green caterpillars"],
  ["3", "Maize", "Good crop"],
  ["4", "Sugar beans", "Good crop"],
]);

concept("agri.plants.classification", { file: "plants/classification", keyPrefix: "plants.classification" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which crop is a **perennial**?",
    options: [
      ["Orange", "Correct: citrus trees live and bear fruit for many years."],
      ["Maize", "Maize completes its life cycle in one season, so it is an annual."],
      ["Onion", "Onion naturally flowers in its second season, so it is a biennial."],
      ["Groundnut", "Groundnuts are annuals harvested within one season."],
    ],
    answer: "A",
    explanation: "Perennials live for more than two years; fruit trees such as citrus are typical examples.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of the Irish potato plant is eaten?",
    options: [
      ["A stem tuber", "Correct: it carries buds (eyes), which only stems have."],
      ["A swollen root", "Sweet potato and cassava are swollen roots; the Irish potato is not."],
      ["A bulb of fleshy leaves", "Bulbs, such as onions, are made of fleshy leaf bases."],
      ["A fruit formed from the ovary", "The potato fruit is a small green berry and is poisonous, not the tuber."],
    ],
    answer: "A",
    explanation: "The Irish potato is a swollen underground stem; its eyes are buds in the axils of scale leaves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A seedling has leaves with parallel veins and a fibrous root system. To which group does it belong?",
    options: [
      ["Monocotyledons, e.g. maize", "Correct: parallel veins and fibrous roots are monocotyledon features."],
      ["Dicotyledons, such as beans", "Dicotyledons have net veins and a tap root."],
      ["Brassicas, such as rape", "Brassicas are dicotyledons with net-veined leaves."],
      ["Cucurbits, such as pumpkin and butternut", "Cucurbits are dicotyledons with broad, net-veined leaves."],
    ],
    answer: "A",
    explanation: "Monocotyledons (cereals and grasses) have one cotyledon, parallel veins, fibrous roots and scattered vascular bundles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group contains **only** solanaceous crops?",
    options: [
      ["Tomato, tobacco, Irish potato", "Correct: all three are in the potato family."],
      ["Tomato, cabbage, Irish potato", "Cabbage is a brassica, not solanaceous."],
      ["Tobacco, cotton, sweet potato", "Cotton and sweet potato belong to other families."],
      ["Pepper, pumpkin, eggplant", "Pumpkin is a cucurbit."],
    ],
    answer: "A",
    explanation: "Solanaceous crops include tomato, Irish potato, tobacco, pepper and eggplant; they share diseases such as bacterial wilt.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which crop is a **biennial**?",
    options: [
      ["Carrot", "Correct: it stores food in its first season and flowers in its second."],
      ["Sorghum", "Sorghum is grown as an annual cereal."],
      ["Banana", "Banana plants keep producing new suckers for years: a perennial."],
      ["Cowpea", "Cowpeas complete their life cycle in one season."],
    ],
    answer: "A",
    explanation: "Biennials (carrot, onion, beetroot, cabbage) take two seasons to set seed; farmers harvest them after the first.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why should cabbages not be planted in a bed where rape was grown last season?",
    options: [
      ["Both are brassicas, so pests and diseases of the rape may attack the cabbages", "Correct: crops of one family share pests and diseases."],
      ["Rape takes all the nitrogen out of the soil, so nothing can grow there for a year", "Rape uses nutrients, but this does not make the bed unusable."],
      ["Cabbages are monocotyledons, and they cannot follow a dicotyledon crop", "Cabbages and rape are both dicotyledons; there is no such rule."],
      ["Rape releases a chemical that stops cabbage seeds from germinating at all", "This is not the reason; cabbages are normally transplanted anyway."],
    ],
    answer: "A",
    hints: ["Think of the botanical family of each crop."],
    explanation: "Rotating crops between families breaks the cycles of pests and soil-borne diseases that attack one family.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer sprays a selective herbicide on a maize field. The broad-leaved weeds die but the maize is not harmed. What explains this?",
    options: [
      ["The herbicide affects dicotyledons but not monocotyledons such as maize", "Correct: many selective herbicides act on broad-leaved (dicotyledon) plants."],
      ["Maize is a perennial, so it can recover from the herbicide", "Maize is an annual; recovery is not the reason."],
      ["The weeds are legumes, which are the only plants affected by herbicides", "Herbicides are not restricted to legumes."],
      ["Maize leaves have net veins, which carry the chemical out of the leaf", "Maize leaves have parallel veins."],
    ],
    answer: "A",
    hints: ["Is maize a monocotyledon or a dicotyledon?"],
    explanation: "Selective herbicides use differences between monocotyledons and dicotyledons to kill broad-leaved weeds in cereals.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which crop is a **cucurbit**?",
    options: [
      ["Butternut", "Correct: butternut is in the pumpkin family."],
      ["Covo", "Covo is a brassica."],
      ["Eggplant", "Eggplant is solanaceous."],
      ["Soya bean", "Soya bean is a legume."],
    ],
    answer: "A",
    explanation: "Cucurbits include pumpkin, butternut, watermelon, cucumber and squash.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cassava and sweet potato are grown for their swollen roots.",
    answer: true,
    explanation: "True. Both store starch in swollen roots; the Irish potato and yam are stem tubers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Vascular bundles are arranged in a ring in the stem of a monocotyledon such as maize.",
    answer: false,
    explanation: "False. In monocotyledons the vascular bundles are scattered; they form a ring in dicotyledons.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each crop with the part that is eaten.",
    pairs: [
      ["Onion", "Bulb"],
      ["Sugar cane", "Stem"],
      ["Rape", "Leaf"],
      ["Tomato", "Fruit"],
      ["Sorghum", "Seed (grain)"],
    ],
    explanation: "Onion: bulb of fleshy leaves. Sugar cane: stem. Rape: leaf. Tomato: fruit. Sorghum: grain.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each crop with its botanical family.",
    pairs: [
      ["Pearl millet", "Cereals (grass family)"],
      ["Bambara nut", "Legumes"],
      ["Kale", "Brassicas"],
      ["Pepper", "Solanaceous crops"],
      ["Watermelon", "Cucurbits"],
    ],
    explanation: "Grouping by family helps to plan rotations, because members of a family share pests and diseases.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A crop that completes its life cycle in one season is called an {{blank:a}}. A seed with two seed leaves belongs to a {{blank:b}}. Legumes carry nitrogen-fixing bacteria in their root {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["annual", "annual crop"] },
      { id: "b", accepted: ["dicotyledon", "dicot", "dicotyledonous plant"] },
      { id: "c", accepted: ["nodules", "nodule"] },
    ],
    explanation: "Annuals live one season; dicotyledons have two cotyledons; legume root nodules hold Rhizobium bacteria.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the family of crops that includes groundnuts, cowpeas and soya beans.",
    accepted: ["legumes", "legume", "legume family", "pea family", "leguminous crops", "fabaceae", "leguminosae", "pulses"],
    explanation: "Groundnuts, cowpeas and soya beans are **legumes**: seeds in pods and nitrogen-fixing root nodules.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the type of root system found in a dicotyledon such as a bean.",
    accepted: ["tap root", "taproot", "tap root system", "taproot system", "a tap root"],
    explanation: "Dicotyledons have a main **tap root** with lateral roots; monocotyledons have fibrous roots.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "State **four** differences between a monocotyledon and a dicotyledon.",
    points: [
      "One cotyledon in a monocotyledon seed; two in a dicotyledon.",
      "Parallel leaf veins in a monocotyledon; net (branched) veins in a dicotyledon.",
      "Fibrous roots in a monocotyledon; a tap root in a dicotyledon.",
      "Scattered vascular bundles in a monocotyledon stem; bundles in a ring in a dicotyledon (or flower parts in threes versus fours or fives).",
    ],
    modelAnswer: "A monocotyledon has one cotyledon, parallel veins, fibrous roots and scattered vascular bundles; a dicotyledon has two cotyledons, net veins, a tap root and bundles in a ring.",
    explanation: "Each difference must give both sides.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which classifying crops into botanical families helps a farmer.",
    hints: ["Think about pests, diseases and nutrients in a rotation."],
    points: [
      "Crops of one family share pests and diseases.",
      "So the farmer rotates between families to break pest and disease cycles.",
      "Legumes fix nitrogen.",
      "So a cereal planted after a legume needs less nitrogen fertiliser (or: crops of a family need similar management, so planning and spraying are easier).",
    ],
    modelAnswer: "Crops in one family, such as tomatoes and potatoes, share pests and diseases, so planting a different family next breaks their cycles. Legumes fix nitrogen, so a cereal that follows them needs less nitrogen fertiliser.",
    explanation: "Each use needs a reason.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Tatenda plans to plant an orchard of mango trees. Explain **three** ways in which the perennial nature of mangoes affects his planning.",
    hints: ["How long is the land occupied, and when does income start?"],
    points: [
      "The land is occupied for many years, so a permanent, suitable site must be chosen.",
      "There is no harvest for several years, so he needs money or other income until the trees bear.",
      "The trees cannot be rotated, so long-term care is needed: protection of young trees, pruning, pest control and fencing.",
    ],
    modelAnswer: "The trees will stay in the field for many years, so he must choose a deep, well-drained permanent site. They will take several years to bear, so he needs other income until then. He cannot rotate the field, so he must plan for long-term pruning, protection and pest control.",
    explanation: "Perennials need a long-term investment and permanent sites.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `A school garden near Mutare had these results last season.\n\n${PLOT_TABLE}\n\nThe garden committee must decide what to plant in each bed this season.`,
    hints: ["Which beds held crops of the same family as the crop that had problems?", "Legumes add nitrogen to the soil."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the botanical family to which the crop in bed 1 belongs.",
        accepted: ["solanaceous", "solanaceous crops", "solanaceae", "potato family", "nightshade family", "solanaceous family"],
        explanation: "Tomatoes are solanaceous crops.",
      }),
      P.mcq({
        label: "(b)", stem: "Which crop should **not** be planted in bed 1 this season?",
        options: [
          ["Irish potato", "Correct: it is solanaceous and would be attacked by the same wilt."],
          ["Rape", "Rape is a brassica and is not attacked by bacterial wilt of tomato."],
          ["Cowpea", "A legume is a safe choice for bed 1."],
          ["Onion", "Onion is from a different family and is a safe choice."],
        ],
        answer: "A",
        explanation: "The wilt organism survives in the soil and attacks other solanaceous crops.",
      }),
      P.short({
        label: "(c)", stem: "Bed 2 had cabbages. Name **one** other crop that should not follow them in that bed.",
        accepted: ["rape", "covo", "kale", "cauliflower", "broccoli", "chinese cabbage", "mustard", "turnip", "cabbage"],
        explanation: "Any brassica would share the caterpillar pests of the cabbages.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest which bed should be planted with maize this season and give a reason.",
        points: ["Bed 4 (after the sugar beans).", "The legume left nitrogen from its root nodules, which the maize (a heavy nitrogen user) can use / maize follows a different family."],
        explanation: "Cereals benefit from following legumes.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why rotating crops between botanical families reduces the problems seen in beds 1 and 2.",
        points: [
          "Pests and disease organisms attack crops of one family (a narrow host range).",
          "Without a host crop from that family, they starve / die out / numbers fall.",
          "So the next crop of that family, planted after a few seasons, is less attacked.",
        ],
        explanation: "Rotation removes the host and breaks the life cycle.",
      }),
    ],
    explanation: "Identify the family of each crop, then use rotation between families to break pest and disease cycles and use legume nitrogen.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, applies: CAM,
    stem: "A district extension leaflet lists the main types of crop grown locally: cereals, legumes, roots and tubers, and fruits.",
    hints: ["Give one crop for each type and a product made from it."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "For **each** of the four types of crop, name one local crop and one product obtained from it.",
        points: [
          "Cereal, e.g. maize: mealie-meal / stockfeed / stover.",
          "Legume, e.g. groundnut or soya bean: peanut butter / cooking oil / oilcake.",
          "Root or tuber, e.g. Irish potato or cassava: chips / starch / food.",
          "Fruit, e.g. orange or mango: fresh fruit / juice / jam.",
        ],
        explanation: "One crop and one product per type.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why growing a legume as well as a cereal improves a family's diet.",
        points: ["Legume seeds are rich in protein.", "Cereals are mainly starch (carbohydrate), so legumes supply the protein that the cereal lacks."],
        explanation: "Legumes complement starchy staples.",
      }),
    ],
    explanation: "Know the main local crop types, examples and products.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer says: \"It does not matter how I classify my crops. All that matters is that they grow.\" Discuss this view.",
    hints: ["Think about rotation, pest control, herbicides and planning perennials.", "End with a judgement."],
    points: [
      "Family classification shows which crops share pests and diseases, guiding rotation.",
      "Legumes fix nitrogen, so classification guides fertiliser savings in a rotation.",
      "Monocotyledon/dicotyledon classification guides the choice of selective herbicides.",
      "Life-cycle classification guides land use: perennials need permanent sites and long-term finance.",
      "Part-eaten classification guides harvesting time, storage and marketing.",
      "Judgement: the view is wrong; classification is a planning tool that improves yields and lowers costs.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "The farmer is right that a good crop is the aim, but classification helps achieve it. Knowing families lets him rotate tomatoes away from potatoes, so soil-borne diseases die out, and put maize after beans to use the nitrogen fixed by legume nodules. Knowing that maize is a monocotyledon lets him use a selective herbicide that kills broad-leaved weeds only. Knowing that citrus is a perennial tells him it needs a permanent site and money to survive until the first harvest. So classification is not just theory: it is a planning tool, and the view is wrong.",
    explanation: "Link each kind of classification to a practical decision, then judge.",
  });

  b.card("DEFINITION", "Annual crop", "A crop that completes its life cycle from seed to seed in one season, e.g. maize, beans.");
  b.card("DEFINITION", "Biennial crop", "A crop that needs two seasons to flower and set seed; harvested after the first, e.g. onion, carrot, cabbage.");
  b.card("DEFINITION", "Perennial crop", "A crop that lives for more than two years, e.g. citrus, mango, banana, sugar cane.");
  b.card("CONCEPT", "Monocotyledon vs dicotyledon", "Mono: one cotyledon, parallel veins, fibrous roots, scattered bundles. Di: two cotyledons, net veins, tap root, bundles in a ring.");
  b.card("FACT", "Which part of the Irish potato is eaten?", "A stem tuber (it has eyes, which are buds).");
  b.card("FACT", "Name three solanaceous crops", "Tomato, Irish potato, tobacco (also pepper, eggplant).");
  b.card("FACT", "Name three brassicas", "Cabbage, rape, covo (also kale, cauliflower).");
  b.card("CONCEPT", "Why rotate between families?", "Crops in one family share pests and diseases; changing family breaks their cycles. Legumes also leave nitrogen for the next crop.");
  b.card("FACT", "Main local crop types", "Cereals, legumes, roots and tubers, fruits (plus vegetables and industrial crops such as cotton and tobacco).");
});
