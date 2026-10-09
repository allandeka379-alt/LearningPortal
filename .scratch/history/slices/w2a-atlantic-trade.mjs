// Slice W2a: the triangular (Atlantic) slave trade (ZIMSEC topic 5.2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.slavery.atlantic-trade", { file: "slavery/atlantic-trade", keyPrefix: "slavery.atlantic-trade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given to the voyage carrying enslaved Africans across the Atlantic?",
    options: [
      ["The Middle Passage", "Correct: the second leg of the triangle."],
      ["The Northern Expedition", "That was a Chinese military campaign of 1926-1928."],
      ["The Great Trek", "That was the migration of Boers into the interior of South Africa in the 1830s."],
      ["The Outward Passage", "The outward leg went from Europe to Africa with goods, not captives."],
    ],
    answer: "A",
    explanation: "The **Middle Passage** was the second leg, from Africa to the Americas.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which goods were carried on the FIRST leg of the triangular trade?",
    options: [
      ["Cloth, guns and metal goods", "Correct: manufactured goods went from Europe to Africa."],
      ["Sugar, tobacco and rum", "These went from the Americas to Europe on the third leg."],
      ["Enslaved Africans", "Captives were carried on the second leg."],
      ["Gold, salt and horses", "These were goods of the trans-Saharan trade."],
    ],
    answer: "A",
    explanation: "Leg one: **manufactured goods** (cloth, guns, gunpowder, metal goods, alcohol, beads) from Europe to the African coast.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which region of Africa supplied the largest number of captives to the Atlantic trade?",
    options: [
      ["West-Central Africa (Kongo and Angola)", "Correct: the largest single source region."],
      ["The Swahili coast of East Africa", "This coast mainly supplied the Indian Ocean trade."],
      ["North Africa and Egypt", "North Africa was a destination of the trans-Saharan trade, not a source for the Atlantic."],
      ["Southern Africa south of the Limpopo River", "This region was not a major source for the Atlantic trade."],
    ],
    answer: "A",
    explanation: "**West-Central Africa** (the Kongo and Angola region) supplied more captives than any other region.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which country in the Americas received the most enslaved Africans?",
    options: [
      ["Brazil", "Correct: Brazil received more than any other country."],
      ["The United States", "It received far fewer than Brazil or the Caribbean."],
      ["Mexico", "Mexico received relatively few compared with Brazil."],
      ["Canada", "Canada was not a major destination."],
    ],
    answer: "A",
    explanation: "**Brazil** received the largest number, mainly for sugar, mining and later coffee.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did merchants find the triangular trade so profitable?",
    options: [
      ["A saleable cargo was carried on every leg", "Correct: goods, captives and produce were each sold for profit."],
      ["Ships were paid by governments to carry passengers", "Captives were not passengers and voyages were privately financed."],
      ["Plantation produce was shipped to Africa for sale", "Produce went to Europe on the third leg."],
      ["African rulers paid Europeans to remove captives", "Europeans paid for captives with goods."],
    ],
    answer: "A",
    hints: ["Think about what was on board on each leg."],
    explanation: "Each of the three legs carried something that could be sold, so a single voyage brought profits three times.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the Middle Passage is correct?",
    options: [
      ["Captives resisted through revolts and refusing food", "Correct: resistance on board is well documented."],
      ["The crossing usually took only three or four days", "It usually took several weeks."],
      ["Most captives travelled on the upper deck in the open air", "Captives were packed below decks."],
      ["Deaths on board were rare because ships carried doctors", "Disease killed many; historians estimate well over a million deaths."],
    ],
    answer: "A",
    hints: ["Africans were not passive victims."],
    explanation: "Captives resisted by revolts, refusing food and sometimes jumping overboard. The crossing took weeks, captives were chained below decks, and deaths were common.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do historians give the number of Africans taken across the Atlantic as an estimate?",
    options: [
      ["Records of many voyages are lost or incomplete", "Correct: historians reconstruct the total from surviving shipping records."],
      ["No ships were ever recorded as leaving the African coast", "Many voyages were recorded; the problem is gaps, not a total absence."],
      ["The trade lasted for less than ten years", "It lasted more than three centuries."],
      ["All historians agree on the exact total", "If they agreed on an exact figure, it would not be an estimate."],
    ],
    answer: "A",
    hints: ["Think about the evidence that survives from centuries of voyages."],
    explanation: "Totals are built from surviving shipping records, which are incomplete, so historians give an estimate: about 12 million embarked.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "On the third leg of the triangle, ships carried sugar, tobacco and cotton to Europe.",
    answer: true,
    explanation: "True. The homeward leg carried plantation produce from the Americas to Europe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Every slave ship followed a neat triangle between Europe, Africa and the Americas.",
    answer: false,
    explanation: "False. Many Portuguese and Brazilian ships sailed directly between Brazil and Angola, a two-way route.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leg of the triangular trade with its cargo.",
    pairs: [
      ["Europe to Africa", "Cloth, guns and metal goods"],
      ["Africa to the Americas", "Enslaved Africans"],
      ["The Americas to Europe", "Sugar, tobacco and rum"],
    ],
    explanation: "Goods out, captives across, produce home.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each place with its role in the Atlantic slave trade.",
    pairs: [
      ["Liverpool", "British port from which slave ships sailed"],
      ["Elmina", "Portuguese fort on the Gold Coast"],
      ["Jamaica", "Caribbean island of sugar plantations"],
      ["Angola", "West-Central African source of captives"],
    ],
    explanation: "Liverpool was the leading British slaving port in the eighteenth century; Elmina was built in 1482; Jamaica was a British sugar colony; Angola was a major source of captives.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Britain abolishes its slave trade",
      "The Portuguese build Elmina castle",
      "Brazil abolishes slavery",
      "Revolution in Saint-Domingue begins",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Elmina was built in the fifteenth century."],
    explanation: "Elmina 1482; Saint-Domingue revolution 1791; British abolition of the trade 1807; Brazil abolishes slavery 1888.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Historians estimate that about {{blank:a}} Africans were embarked for the Americas. Most of them were sent to work on {{blank:b}} plantations in Brazil and the Caribbean.",
    blanks: [
      { id: "a", accepted: ["12 million"], choices: ["12 million", "1.2 million", "120,000", "120 million"] },
      { id: "b", accepted: ["sugar"], choices: ["sugar", "clove", "rubber", "tea"] },
    ],
    explanation: "About **12 million** were embarked (an estimate). **Sugar** plantations took the largest share and had the highest death rates.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the leg of the triangular trade that carried enslaved Africans from Africa to the Americas.",
    accepted: ["Middle Passage", "the Middle Passage", "second leg", "the second leg"],
    wrong: ["first leg"],
    explanation: "The **Middle Passage** was the second leg.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "List the **four** main areas involved in the triangular slave trade.",
    points: [
      "Europe (e.g. Britain, Portugal, France).",
      "West Africa.",
      "West-Central Africa (Kongo/Angola).",
      "The Americas / the Caribbean.",
    ],
    modelAnswer: "Europe; West Africa; West-Central Africa; the Americas and the Caribbean.",
    explanation: "One mark per area (accept \"North and South America\" and \"the Caribbean\" as separate areas if Africa is given once).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe conditions on board slave ships during the Middle Passage.",
    points: [
      "Captives chained and packed tightly below decks.",
      "Little space, air or light; heat and filth.",
      "Disease such as dysentery and smallpox spread.",
      "Shortage of food and water.",
      "Violence and abuse by crews (whipping; abuse of women).",
      "High deaths / resistance (revolts, refusing food).",
    ],
    hints: ["Cover space, health, food, treatment and outcomes."],
    modelAnswer: "Captives were chained in pairs and packed below decks with little room, light or air. The heat and filth spread diseases such as dysentery and smallpox, and food and water were often short. Crews used whips to control them and women were often abused. Many died: historians estimate well over a million deaths at sea. Captives resisted by revolting and refusing food.",
    explanation: "One mark per feature.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which enslaved Africans on plantations resisted slavery.",
    points: [
      "Identifies a form of resistance (e.g. running away / maroon communities).",
      "Explains how it challenged slavery.",
      "Identifies a second form (e.g. revolt such as Saint-Domingue / working slowly / keeping culture).",
      "Explains how it challenged slavery.",
    ],
    hints: ["Resistance could be open or hidden."],
    modelAnswer: "Some ran away; groups of runaways formed free maroon communities that planters could not control, which showed that slavery could be escaped. Others revolted: in Saint-Domingue enslaved people rose in 1791 and by 1804 had created the independent state of Haiti, which frightened planters across the Americas.",
    explanation: "Two marks per developed form of resistance.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an extract from a fictional ship's surgeon's journal kept on a slave voyage in the 1780s and later given to a parliamentary inquiry", "We have been five weeks at sea. The captives lie so close below that they cannot turn without disturbing their neighbours. The flux [dysentery] has broken out, and this morning eleven bodies were thrown over the side. The captain orders the decks scrubbed, but the air below is so foul that I can stay there only a few minutes.")}\n\n${source("Source B", "a statement by a fictional Liverpool ship owner to the same inquiry, 1780s", "My captives are well fed with beans and rice, and are brought on deck each day to dance for their health. A dead captive is a loss to the owner, so it is in every captain's interest to care for them. Reports of cruelty are greatly exaggerated by men who have never been to sea.")}`,
    hints: ["Ask who wrote each source and what each had to gain."],
    parts: [
      P.mcq({ label: "(a)", stem: "Which statement is supported by Source A?", options: [
        ["Disease was killing captives during the voyage", "Correct: dysentery and eleven deaths in one morning."],
        ["Captives were well fed and brought on deck to dance", "That is the claim of Source B."],
        ["The voyage had only just begun", "The surgeon says they had been five weeks at sea."],
        ["The captain refused to clean the ship at all", "The captain ordered the decks scrubbed."],
      ], answer: "A", explanation: "Source A describes dysentery and many deaths." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B disagree with Source A? Use details from both sources.", points: [
        "Disagree: B says captives were well cared for; A describes crowding and foul air.",
        "Disagree: B says cruelty is exaggerated; A records eleven deaths in a morning.",
        "Agree (partly): both mention some care (A: decks scrubbed; B: food and exercise).",
        "Judgement: they mostly disagree.",
      ], explanation: "Compare specific points." }),
      P.manual({ label: "(c)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Which source is more reliable as evidence of conditions on the Middle Passage? Use the sources and your own knowledge.", points: [
        "A: a surgeon on board who saw conditions directly.",
        "A: a journal kept at the time, details precise.",
        "A: content matches own knowledge (crowding, dysentery, high deaths).",
        "A limitation: later given to an inquiry, might be selected for that purpose.",
        "B: a ship owner with a financial interest in continuing the trade.",
        "B: content contradicts own knowledge (well over a million deaths at sea).",
        "Supported judgement (A more reliable).",
      ], levels: levels(7), modelAnswer: "Source A is more reliable. Its author was a surgeon on the ship who saw the conditions himself, and he wrote a journal at the time, recording precise details such as five weeks at sea and eleven deaths in a morning. What he describes, captives packed below decks, dysentery and many deaths, matches what historians know: well over a million Africans died on the Middle Passage. Its one limitation is that it was given to an inquiry, so it may have been chosen to support one side.\n\nSource B comes from a Liverpool ship owner, who profited from the trade and wanted it to continue, so he had a strong reason to deny cruelty. He was probably not on board. His claim that captives were well cared for is contradicted by the high death rates historians have found, although it is true that captives were sometimes brought on deck for exercise.\n\nSo Source A is more reliable because of both its origin and its agreement with other evidence.", explanation: "Use provenance and own knowledge for each source." }),
    ],
    explanation: "Source-based practice question on the Middle Passage (12 marks).",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), use the three legs in order."],
    parts: [
      P.fib({ label: "(a)", stem: "Complete the statements.", template: "Slave ships sailed from European ports such as {{blank:a}}. The Portuguese fort of {{blank:b}} stood on the Gold Coast. A revolution in Saint-Domingue created the state of {{blank:c}}.", blanks: [
        { id: "a", accepted: ["Liverpool"], choices: ["Liverpool", "Zanzibar", "Luanda", "Kilwa"] },
        { id: "b", accepted: ["Elmina"], choices: ["Elmina", "Sofala", "Mombasa", "Timbuktu"] },
        { id: "c", accepted: ["Haiti"], choices: ["Haiti", "Jamaica", "Cuba", "Barbados"] },
      ], explanation: "Liverpool, Elmina (1482) and Haiti (1804)." }),
      P.manual({ label: "(b)", marks: 6, stem: "Describe the routes of the triangular trade and the goods exchanged on each leg.", points: [
        "Leg 1: Europe to West/West-Central Africa.",
        "Carrying cloth, guns, metal goods, alcohol, beads.",
        "Leg 2 (Middle Passage): Africa to the Americas/Caribbean.",
        "Carrying enslaved Africans, sold to planters.",
        "Leg 3: Americas to Europe.",
        "Carrying sugar, tobacco, cotton, rum, coffee.",
      ], explanation: "Route plus cargo for each leg." }),
      P.manual({ label: "(c)", marks: 5, stem: "Describe the conditions of enslaved Africans on plantations in the Americas.", points: [
        "Long hours from dawn to dusk under drivers with whips.",
        "Hardest work and highest deaths on sugar plantations.",
        "Treated as property; families separated by sale.",
        "Children born enslaved; slave codes restricted movement, weapons and learning.",
        "Resistance: running away, maroons, revolts, keeping culture.",
      ], explanation: "One mark per feature." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Triangular trade", "Europe to Africa with goods; Africa to the Americas with captives; the Americas to Europe with plantation produce.");
  b.card("DEFINITION", "Middle Passage", "The second leg: the voyage of enslaved Africans across the Atlantic to the Americas.");
  b.card("FACT", "What goods went from Europe to Africa?", "Cloth, guns and gunpowder, iron and copper goods, alcohol and beads.");
  b.card("FACT", "What goods went from the Americas to Europe?", "Sugar, tobacco, cotton, rum and coffee.");
  b.card("FACT", "About how many Africans were embarked for the Americas?", "Historians estimate about 12 million; well over a million died at sea.");
  b.card("FACT", "Which African region supplied the most captives?", "West-Central Africa (the Kongo and Angola region).");
  b.card("FACT", "Which country received the most enslaved Africans?", "Brazil.");
  b.card("CONCEPT", "Name four features of the Middle Passage.", "Crowding below decks in chains; disease; violence and abuse; many deaths; and resistance by captives.");
  b.card("CONCEPT", "How did enslaved people resist on plantations?", "Working slowly, running away (maroons), keeping their culture alive and revolting, as in Saint-Domingue (Haiti, 1791-1804).");
});
