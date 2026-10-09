// W4a: Indigenous and contemporary industries; types of industry (her.production.industry).
// Reviewer note: indigenous industries described in outline; the soapstone Zimbabwe Birds of Great Zimbabwe are well
// established. Manufacturing methods are her.production.manufacturing.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.production.industry", { file: "production/industry", keyPrefix: "production.industry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **primary** industry?",
    options: [
      ["gold mining", "Correct: mining extracts natural resources."],
      ["sugar refining", "Refining processes a raw material: secondary."],
      ["banking", "Banking is a service: tertiary."],
      ["building a dam", "Construction is secondary industry."],
    ],
    answer: "A",
    explanation: "Primary industry extracts natural resources: farming, mining, fishing and forestry.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which material was used to make **pots** in indigenous industry?",
    options: [
      ["clay", "Correct: clay was shaped by hand and fired."],
      ["iron ore", "Iron ore was smelted to make tools."],
      ["palm leaves", "Palm leaves were woven into mats and baskets."],
      ["soapstone", "Soapstone was carved."],
    ],
    answer: "A",
    explanation: "Potters dug clay from riverbanks, shaped it by hand, dried it and fired it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A company in Harare turns cotton lint into cloth. To which type of industry does this belong?",
    options: [
      ["secondary", "Correct: processing raw materials into goods is secondary industry."],
      ["primary", "Primary industry is growing the cotton."],
      ["tertiary", "Tertiary industry provides services, such as transport or retail."],
      ["indigenous", "This is a type of origin, not one of the three types, and a factory is contemporary."],
    ],
    answer: "A",
    explanation: "Turning lint into cloth is processing, which is secondary industry.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In indigenous iron smelting, what was the purpose of the **bellows**?",
    options: [
      ["to pump air into the furnace to make the fire hotter", "Correct: more air raises the temperature."],
      ["to carry the iron ore from the hills to the village", "Ore was carried in baskets or bags."],
      ["to cool the finished hoe in water", "Bellows blow air into the fire; they do not cool tools."],
      ["to shape the clay walls of the furnace", "Furnace walls were built by hand."],
    ],
    answer: "A",
    explanation: "Bellows blew air into the furnace so the charcoal burned hot enough to smelt iron.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which activity is an example of **tertiary** industry?",
    options: [
      ["a tour operator guiding visitors at Victoria Falls", "Correct: tourism is a service."],
      ["a farmer growing tobacco near Marondera", "Farming is primary."],
      ["a factory making cement near Gweru", "Manufacturing is secondary."],
      ["a fisherman catching kapenta on Lake Kariba", "Fishing is primary."],
    ],
    answer: "A",
    hints: ["Tertiary industry provides services, not goods."],
    explanation: "Tourism, transport, banking, trade, education and health are tertiary industries.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which was a main reason for the **decline** of some indigenous industries during the colonial period?",
    options: [
      ["cheap imported and factory-made goods replaced local products", "Correct: enamel pots and steel hoes competed with local goods."],
      ["the rains failed every year for the whole colonial period", "Droughts did not cause a lasting decline in crafts."],
      ["indigenous goods were of no use to anyone", "They were useful; the problem was competition and changing ways of life."],
      ["local people had never known how to work metal", "Iron working was well established before colonial rule."],
    ],
    hints: ["Think about competition from new goods."],
    answer: "A",
    explanation: "Imported and factory goods, migration to wage work and less teaching of skills led some indigenous industries to decline.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "If a clothing factory closes, which effect on a cotton farmer is **most direct**?",
    options: [
      ["She loses a buyer for her cotton and her income falls", "Correct: secondary industry is a market for primary producers."],
      ["Her soil becomes less fertile", "Soil fertility is not changed by a factory closing."],
      ["She must pay much higher school fees for all her children", "School fees are not directly linked."],
      ["The rains come later in the season", "Rainfall is not affected by factories closing."],
    ],
    answer: "A",
    hints: ["How are primary and secondary industries linked?"],
    explanation: "The three types of industry are linked: secondary industry buys raw materials from primary producers.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument **best** supports processing minerals in Zimbabwe rather than exporting them raw?",
    options: [
      ["It adds value, creating more jobs and higher export earnings", "Correct: processing adds value at home."],
      ["It means that the minerals in the ground will never run out at all", "Processing does not make minerals renewable."],
      ["It removes the need for mining", "Minerals still have to be mined first."],
      ["It makes primary industry unnecessary", "Processing depends on primary industry."],
    ],
    answer: "A",
    hints: ["What does 'adding value' mean?"],
    explanation: "Processing raw materials at home adds value, creating jobs and earning more than raw exports.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Banking, transport and tourism are tertiary industries.",
    answer: true,
    explanation: "True. They provide services rather than goods.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All indigenous industries disappeared during the colonial period.",
    answer: false,
    explanation: "False. Many declined, but pottery, basketry, carving and small-scale mining survive and have adapted.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each indigenous industry with a product.",
    pairs: [
      ["iron smelting and blacksmithing", "hoes and axes"],
      ["pottery", "pots for brewing and storing grain"],
      ["basketry", "winnowing trays"],
      ["stone carving", "soapstone birds and plates"],
    ],
    explanation: "Each indigenous industry used local materials to meet everyday needs.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each activity.",
    template: "Growing maize is {{blank:a}} industry. Milling maize into mealie-meal is {{blank:b}} industry. Selling mealie-meal in a shop is {{blank:c}} industry.",
    blanks: [
      { id: "a", accepted: ["primary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "b", accepted: ["secondary"], choices: ["secondary", "primary", "tertiary"] },
      { id: "c", accepted: ["tertiary"], choices: ["tertiary", "primary", "secondary"] },
    ],
    explanation: "Growing is primary, milling is secondary (processing) and retailing is tertiary (a service).",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the chain for a sugar product.",
    template: "Farmers grow sugar cane ({{blank:a}}). A mill refines it into sugar ({{blank:b}}). Trucks carry the sugar to shops ({{blank:c}}).",
    blanks: [
      { id: "a", accepted: ["primary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "b", accepted: ["secondary"], choices: ["secondary", "primary", "tertiary"] },
      { id: "c", accepted: ["tertiary"], choices: ["tertiary", "primary", "secondary"] },
    ],
    hints: ["Extract, process, serve."],
    explanation: "Growing is primary, refining is secondary and transport is tertiary.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the fuel, made from wood, that was burned in indigenous iron-smelting furnaces.",
    accepted: ["charcoal"],
    wrong: ["coal"],
    explanation: "Charcoal, made by slowly burning wood, was used to smelt iron ore.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** indigenous industries of Zimbabwe.",
    points: [
      "Any one of: iron smelting / blacksmithing; pottery; weaving; basketry; mining (gold, copper); wood or stone carving; salt making; leatherwork",
      "A second different industry",
      "A third different industry",
    ],
    modelAnswer: "Iron smelting, pottery and basketry.",
    explanation: "One mark per correct industry.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why industry is important to Zimbabwe.",
    points: [
      "Identifies: creates employment",
      "Develops: workers earn incomes to support their families and spend in local businesses",
      "Identifies: earns foreign currency / adds value / pays taxes / reduces imports",
      "Develops: e.g. exports of minerals and tobacco pay for imports such as fuel and machinery",
    ],
    modelAnswer: "Industry creates employment, so workers earn incomes that support their families and are spent in local businesses. It also earns foreign currency through exports such as minerals and tobacco, which the country uses to pay for imports like fuel and machinery.",
    hints: ["Think about people and about the country."],
    explanation: "One mark for each reason and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways indigenous industries such as pottery and basketry could be helped to grow today, and explain each.",
    points: [
      "Suggests linking crafters to tourist markets / craft centres / online sales",
      "Explains that a bigger market raises their income and keeps the skills alive",
      "Suggests training young people / teaching crafts in schools / forming co-operatives",
      "Explains that skills are passed on and producers share costs and bargain for better prices",
    ],
    modelAnswer: "Craft centres at tourist sites and online shops could link potters and basket makers to bigger markets, so they earn more and the skills remain worth learning. Young people could be trained by experienced crafters, and producers could form co-operatives, so skills are passed on and members share transport costs and bargain for better prices.",
    hints: ["Think about markets and about skills."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a feature in a fictional travel magazine, 2026",
      "At a craft market near Binga, women sell baskets woven from palm leaves using patterns their grandmothers taught them. Some baskets are bought by tourists from Europe; others are used locally for winnowing grain. Buyers say the work is beautiful, but the weavers say the long road to the market and the low prices paid by middlemen make it hard to earn a living.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which type of industry is the weaving of baskets described in the source?",
        options: [
          ["an indigenous industry", "Correct: it uses skills and patterns passed down through generations."],
          ["a primary industry only", "Weaving turns raw materials into goods."],
          ["a heavy industry", "Heavy industry uses large machines, such as steelworks."],
          ["a financial service", "Basketry produces goods, not financial services."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** uses of the baskets mentioned in the source.",
        points: ["sold to tourists (as crafts / souvenirs)", "used locally for winnowing grain"],
        modelAnswer: "They are sold to tourists and used locally for winnowing grain.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** challenge the weavers face and suggest how it could be overcome.",
        points: [
          "Challenge: long distance to market / low prices from middlemen",
          "Explains its effect: it reduces their income",
          "Suggests a solution: co-operative selling / direct sales at tourist centres or online",
        ],
        modelAnswer: "The weavers must travel a long road to market and middlemen pay low prices, so they earn little for many hours of work. They could form a co-operative and sell directly at tourist centres or online, keeping more of the price.",
      }),
    ],
    hints: ["In (c), link the challenge to the weavers' income."],
    explanation: "A source-based practice item on an indigenous craft industry today.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous and contemporary industries.",
    parts: [
      P.manual({
        label: "(a)", marks: 6,
        stem: "Describe **three** indigenous industries of Zimbabwe.",
        points: [
          "Iron smelting: ore heated with charcoal in clay furnaces using bellows",
          "producing hoes, axes and spears",
          "Pottery: clay shaped by hand and fired, usually by women",
          "producing pots for cooking, brewing and storage",
          "Basketry or weaving (or mining / carving): grass, palm or bark woven",
          "producing mats, baskets and winnowing trays",
        ],
        modelAnswer: "Iron smelting used iron ore heated with charcoal in clay furnaces, with bellows to pump air; the iron was hammered into hoes, axes and spears. Pottery, usually done by women, used clay shaped by hand and fired, giving pots for cooking, brewing and storing grain. Basketry used grass, reeds and palm leaves woven into mats, baskets and winnowing trays.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous industries are no longer important in Zimbabwe today.\" How far do you agree?",
        points: [
          ["For: modern factories and imports supply most goods; iron smelting has largely stopped; small incomes", 2],
          ["Against: pottery, basketry, carving and small-scale mining still provide jobs and incomes, especially in rural areas", 2],
          ["Against: crafts earn from tourism; they preserve heritage, identity and knowledge; use local materials", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is some truth in the statement. Factories and imports supply most tools, pots and cloth, and indigenous iron smelting has almost disappeared. Many crafters earn small incomes.\n\nHowever, indigenous industries remain important. Pottery, basketry, carving and small-scale mining provide work and income for many families, especially in rural areas where formal jobs are few. Crafts such as Binga baskets and stone carvings are sold to tourists, earning money for communities. They also preserve skills, designs and knowledge that are part of national heritage and identity.\n\nI disagree with the statement. Indigenous industries are smaller than before, but they still matter for livelihoods, tourism and heritage.",
      }),
    ],
    hints: ["In (b), consider jobs, tourism and heritage."],
    explanation: "A practice evaluative item on the importance of indigenous industries today.",
  });

  b.card("DEFINITION", "Industry", "A group of businesses or people producing the same kind of goods or services.");
  b.card("DEFINITION", "Primary industry", "Industry that extracts natural resources: farming, mining, fishing, forestry.");
  b.card("DEFINITION", "Secondary industry", "Industry that processes raw materials into goods, or builds: manufacturing, processing, construction.");
  b.card("DEFINITION", "Tertiary industry", "Industry that provides services: trade, transport, banking, tourism, education, health.");
  b.card("FACT", "Name four indigenous industries of Zimbabwe.", "Iron smelting and blacksmithing, pottery, weaving and basketry, mining (also carving, salt making, leatherwork).");
  b.card("FACT", "What were indigenous iron furnaces fuelled with?", "Charcoal, with air pumped in by bellows.");
  b.card("CONCEPT", "Why did some indigenous industries decline in the colonial period?", "Cheap imported and factory goods replaced local products; people left for wage work; skills were taught less often.");
  b.card("CONCEPT", "How are the three types of industry linked?", "Primary industry supplies raw materials to secondary industry, whose goods are moved, financed and sold by tertiary industry.");
  b.card("CONCEPT", "Give three reasons why industry is important.", "It creates jobs, earns foreign currency through exports and pays taxes (also adds value and preserves heritage).");
});
