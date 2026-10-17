// W1a: ahist.precolonial.bantu-migrations (ZIMSEC topic 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.bantu-migrations", { file: "precolonial/bantu-migrations", keyPrefix: "precolonial.bantu-migrations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where do most scholars place the original home of the Bantu languages?",
    options: [
      ["The borderlands of Nigeria and Cameroon", "Correct: this is the most widely accepted view."],
      ["The shores of the Indian Ocean in Mozambique", "The Indian Ocean coast was reached later, in the course of the migrations."],
      ["The Limpopo valley in southern Africa", "The Limpopo valley was settled by Bantu speakers long after the languages began."],
      ["The Nile delta in northern Egypt", "The Nile delta was the home of Egyptian civilisation, not of the Bantu languages."],
    ],
    answer: "A",
    explanation: "Linguistic and other evidence points to the Nigeria-Cameroon region in west-central Africa as the original home.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which kind of evidence shows that languages as far apart as Shona and Swahili descend from one ancestor language?",
    options: [
      ["Shared words and grammar in many Bantu languages", "Correct: shared words, such as the stem for \"person\", show a common origin."],
      ["Written records of the journeys kept by early kings", "No such records exist; the migrations took place long before writing in the region."],
      ["Portuguese accounts of the sixteenth century", "The Portuguese arrived only in the sixteenth century CE, long after the languages spread."],
      ["The treaty signed by Bantu leaders at the Great Lakes", "No such treaty exists; this is invented."],
    ],
    answer: "A",
    explanation: "Comparative linguistics uses shared vocabulary and grammar to trace the family of languages back to a common ancestor.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which new skill helped the Bantu-speaking farmers to clear woodland and farm the savanna?",
    options: [
      ["Iron-working, which produced axes and hoes", "Correct: iron tools were stronger and sharper than stone."],
      ["Gunpowder weapons obtained from traders", "Guns reached the region far later, with Europeans."],
      ["Writing, which allowed farmers to keep farm records", "The farmers of the Early Iron Age did not use writing."],
      ["Irrigation by canals from the Nile", "Nile irrigation belongs to ancient Egypt, not to the Bantu migrations."],
    ],
    answer: "A",
    explanation: "Iron axes and hoes helped to clear land and work the soil, which supported larger populations.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best describes the view of historians who prefer the \"gradual spread\" model of the Bantu migrations?",
    options: [
      ["Small farming groups moved over generations and mixed with others", "Correct: movement was slow, varied and involved mixing."],
      ["A single conquering army swept south from Cameroon in a few years", "This is the discredited idea of a sudden invasion."],
      ["The language spread, but no people ever moved from their homes", "Most scholars accept that real movement of people took place."],
      ["One king ordered the migrations and ruled all Bantu speakers then", "There was no such ruler; the movement was by many small groups."],
    ],
    answer: "A",
    hints: ["Think of farmers splitting off when villages grew."],
    explanation: "The gradual model stresses small-scale movement, intermarriage and the spread of ideas over many centuries rather than one mass invasion.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which finding by archaeologists would best support a movement of Bantu-speaking farmers into Zimbabwe in the early centuries CE?",
    options: [
      ["Early Iron Age pottery and furnaces with radiocarbon dates", "Correct: pottery styles, furnaces and radiocarbon dates trace farming communities."],
      ["A Portuguese document recording the arrival of the farmers then", "No such document could exist; Europeans arrived over a thousand years later."],
      ["Stone tools of hunter-gatherers dated to those same centuries", "San stone tools show the earlier inhabitants, not the arrival of farmers."],
      ["Chinese porcelain buried in the Great Enclosure of the hill", "Porcelain at Great Zimbabwe belongs to the medieval period."],
    ],
    answer: "A",
    hints: ["Which finds belong to farmers who worked iron?"],
    explanation: "Early Iron Age pottery and smelting remains with radiocarbon dates are the standard archaeological evidence for farming communities.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **strongest** objection to describing the Bantu migrations as an \"invasion\" of southern Africa?",
    options: [
      ["Evidence shows slow settlement and intermarriage, not one conquest", "Correct: the evidence shows gradual movement and mixing."],
      ["The migrants were too poor to own any iron tools or any cattle", "The migrants had iron-working and often cattle."],
      ["The earlier inhabitants all moved away before the farmers came", "San and Khoi-Khoi remained in many areas and mixed with the newcomers."],
      ["The farmers arrived in the region after the Portuguese traders", "The farmers arrived many centuries before the Portuguese."],
    ],
    answer: "A",
    hints: ["Think about the pattern revealed by archaeology and language."],
    explanation: "The word \"invasion\" suggests sudden conquest, whereas the evidence suggests a long process with exchange and intermarriage as well as displacement.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "\"Bantu\" is the name of a language family, not of a race.",
    answer: true,
    explanation: "True. Bantu languages share a common ancestor; the word does not describe a race.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Bantu migrations took place in a single year and were completed within a generation.",
    answer: false,
    explanation: "False. They lasted many centuries and consisted of many small movements.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Because the Bantu migrations are debated, historians know nothing reliable about them.",
    answer: false,
    hints: ["Is there a difference between the core and the detail?"],
    explanation: "False. The west-central African origin is well supported by several kinds of evidence; it is the routes, speed and causes that are debated.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of the Bantu migrations with its explanation.",
    pairs: [
      ["Population growth", "Villages grew too large and groups split off to find land"],
      ["Iron-working", "Stronger tools made clearing and farming new land easier"],
      ["Environmental change", "Changes in climate and vegetation opened routes through the savanna"],
      ["Conflict", "Disputes within a village led a faction to leave with followers"],
    ],
    explanation: "Each cause links to movement: land shortage, new technology, new routes and political disputes.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each type of evidence with what it contributes to the study of the migrations.",
    pairs: [
      ["Comparison of Bantu languages", "Shows a common ancestor and suggests where the languages are oldest"],
      ["Pottery styles and furnaces", "Allow communities to be traced and dated with radiocarbon"],
      ["Crops and human biology", "Add further support for a movement of farmers from west-central Africa"],
      ["Oral traditions of migration", "Preserve a people's memory of movement, but need checking"],
    ],
    hints: ["Which evidence is about words, which about objects?"],
    explanation: "The strongest case combines linguistic, archaeological and other evidence, with oral tradition used carefully.",
  });
  {
    const events = [
      "Bantu languages begin in the Nigeria-Cameroon borderlands",
      "Speakers reach the Great Lakes region",
      "Early Iron Age farming communities are settled in Zimbabwe",
      "Large Late Iron Age states such as Great Zimbabwe develop",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these developments in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Languages began long before the farmers reached the south.", "Great Zimbabwe belongs to the Late Iron Age."],
      explanation: "Origins in west-central Africa (several thousand years ago), the Great Lakes (about 2,500 years ago), Zimbabwe (early centuries CE) and Late Iron Age states (after about 1000 CE).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Most scholars place the origin of the Bantu languages in the borderlands of Nigeria and {{blank:a}}, and the Iron Age is divided into the {{blank:b}} and Late Iron Age.",
    blanks: [
      { id: "a", accepted: ["Cameroon"], choices: ["Cameroon", "Egypt", "Kenya", "Angola"] },
      { id: "b", accepted: ["Early"], choices: ["Early", "Middle", "Stone", "Golden"] },
    ],
    explanation: "The origin lies in the Nigeria-Cameroon borderlands; archaeologists speak of the Early and Late Iron Age.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to the large family of related languages that includes Shona, Zulu and Swahili? (One word.)",
    accepted: ["Bantu", "Bantu languages"],
    wrong: ["Khoisan"],
    explanation: "The **Bantu** languages share a common ancestor.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "State **four** causes of the Bantu migrations.",
    points: ["Population growth", "Search for land or other resources", "Iron-working and farming made expansion possible", "Environmental change or conflict"],
    modelAnswer: "Population growth in villages, a search for new land, iron tools and farming that made clearing land easier, and environmental change or disputes that led groups to leave.",
    explanation: "One mark for each cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how iron-working helped the spread of Bantu-speaking farmers.",
    points: [
      ["Iron axes and hoes were stronger than stone tools, so land could be cleared and farmed more easily", 2],
      ["More food supported more people, so population grew and groups moved to new land", 2],
    ],
    hints: ["Link the tool, the food and the movement."],
    modelAnswer: "Iron axes and hoes were stronger than stone tools, so farmers could clear woodland and work the soil more easily. This produced more food and supported larger populations, which encouraged groups to split off and settle new land.",
    explanation: "One mark for each point and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** effects of the Bantu migrations on the San.",
    points: [
      ["Farmers took the best-watered land, pushing many bands into drier regions", 2],
      ["Contact led to trade, clientship and intermarriage, so some San were absorbed into farming communities", 2],
    ],
    hints: ["Think of both conflict over land and peaceful contact."],
    modelAnswer: "Farmers settled the best-watered land, so many San bands were pushed into drier regions such as the Kalahari. At the same time there was trade, clientship and intermarriage, so some San people were absorbed into farming communities.",
    explanation: "One effect with one developed reason each.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was iron-working the main reason for the Bantu migrations?",
    levels: levels(6),
    points: [
      ["Iron tools made clearing and farming new land easier and supported growth (supports the view)", 2],
      ["Other causes: population growth, land shortage, environmental change, conflict (challenges the view)", 2],
      ["Judgement: iron was an enabling factor, but the movements had several linked causes", 2],
    ],
    hints: ["Explain iron, then the other causes, then say which counts most."],
    modelAnswer: "Iron-working was important because iron axes and hoes made it easier to clear woodland and farm, which supported larger populations. However, iron alone does not explain why people moved. Population growth, shortage of land, environmental change and conflict also pushed groups to find new places. Iron made expansion possible, but several causes worked together, so it was one of the main reasons rather than the only one.",
    explanation: "Credit explanation of iron, other causes and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an extract from a textbook for schools, written in the 1930s by a fictional European author",
        "Long ago the Bantu swept down from the north in great armies, conquering the weaker peoples who lived in the land and taking their cattle and women."),
      "",
      source("Source B", "a summary of recent research, written by a fictional African historian for a university course",
        "Evidence from language, pottery and furnaces suggests that farming communities spread slowly over many centuries. They cleared woodland with iron tools, traded with hunter-gatherers and often married local people, though in some areas land was taken from earlier inhabitants."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source B say about the relations between farmers and hunter-gatherers?", points: ["They traded and often intermarried", "In some areas land was taken from earlier inhabitants"] }),
      P.manual({ label: "(b)", marks: 4, stem: "In what ways do Sources A and B differ in their view of the Bantu migrations?", points: [["A describes sudden conquest by armies; B describes slow spread over centuries", 2], ["A shows only violence and domination; B shows trade, intermarriage and some loss of land", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source gives the more reliable account? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["B is more reliable: based on linguistic and archaeological evidence and modern research, which supports a gradual spread", 2], ["A is a school text of the 1930s whose language reflects the prejudiced idea of an invasion by a conquering race, with no evidence cited", 2], ["Judgement using own knowledge: B matches the evidence of mixed pottery traditions, borrowed clicks and intermarriage; A is unsupported", 2]], modelAnswer: "Source B is more reliable. It is based on evidence from language, pottery and furnaces, and it recognises that the picture was varied, with trade and intermarriage in some places and land loss in others. This fits what we know, for example that Zulu and Xhosa borrowed click sounds from Khoisan speakers, which shows contact and mixing. Source A was written in the 1930s in a period when many European writers held prejudiced ideas about African history. It describes armies sweeping south without citing any evidence, which is the discredited idea of an invasion. Source B is therefore far more reliable, although as a summary it cannot show all the local differences." }),
    ],
    hints: ["For (c), check the date, the author's likely attitudes and whether evidence is given."],
    explanation: "Both sources are invented; one reflects an outdated view and the other modern research.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the impact of the Bantu migrations on the development of southern Africa.",
    levels: levels(8),
    points: [
      ["Brought farming, iron-working, cattle-keeping and pottery traditions; Bantu languages became dominant", 2],
      ["Larger populations and surplus created conditions for chiefdoms and later states (Mapungubwe, Great Zimbabwe)", 2],
      ["Negative or mixed impact on the San and Khoi-Khoi: loss of land, displacement, absorption, but also trade and intermarriage", 2],
      ["Judgement on overall significance, noting that the process was gradual and that evidence is debated", 2],
    ],
    hints: ["Consider both the farmers' impact on the land and on the earlier peoples."],
    modelAnswer: "The Bantu migrations changed southern Africa fundamentally. The migrants brought farming, iron-working, cattle-keeping and pottery traditions, and their languages became dominant across the region. Larger populations and farming surpluses created the conditions for chiefdoms and later states such as Mapungubwe and Great Zimbabwe. The impact on the San and Khoi-Khoi was mixed: they lost the best land and many were pushed into drier regions, yet there was also trade and intermarriage and some borrowing of language. Because the movement was gradual and the evidence is still debated, we should be careful not to describe it as a single invasion, but its impact on the economy, language and politics of the region was very great.",
    explanation: "Credit specific effects, balance and a supported judgement.",
  });

  b.card("DEFINITION", "What are the Bantu languages?", "A large family of related languages, from Cameroon and Kenya southwards, that descend from a common ancestor; \"Bantu\" is a language label, not a race.");
  b.card("DEFINITION", "What is the Iron Age in southern Africa?", "The period of farming communities using iron: the Early Iron Age (roughly the first millennium CE) and the Late Iron Age (after about 1000 CE).");
  b.card("FACT", "Where do most scholars place the origin of the Bantu languages?", "The borderlands of Nigeria and Cameroon in west-central Africa.");
  b.card("FACT", "By about when had Early Iron Age farming communities settled in Zimbabwe?", "By about the third century CE.");
  b.card("FACT", "Which two linguists are associated with theories of the Bantu homeland?", "Joseph Greenberg (Nigeria and Cameroon) and Malcolm Guthrie (a core area in the savanna south of the forest).");
  b.card("CONCEPT", "Name four causes of the Bantu migrations.", "Population growth, search for land, iron-working and farming, environmental change and conflict.");
  b.card("CONCEPT", "Why is \"invasion\" a poor word for the Bantu migrations?", "Evidence shows a slow, varied spread with trade and intermarriage as well as displacement, not a single conquest.");
  b.card("CONCEPT", "What did the Bantu-speaking farmers bring to southern Africa?", "Farming, iron-working, cattle-keeping, pottery traditions and the Bantu languages.");
  b.card("CONCEPT", "What did the Bantu migrations do to the San and Khoi-Khoi?", "Farmers took fertile land, so many were pushed into drier regions or absorbed, though trade and intermarriage also occurred.");
});
