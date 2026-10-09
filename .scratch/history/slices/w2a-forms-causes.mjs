// Slice W2a: forms of slavery, causes of the slave trade and methods (ZIMSEC topic 5.1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.slavery.forms-causes", { file: "slavery/forms-causes", keyPrefix: "slavery.forms-causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which form of slavery treated the enslaved person as property whose children were also born enslaved?",
    options: [
      ["Chattel slavery", "Correct: the person was a chattel (property) and the status was hereditary."],
      ["Pawnship", "A pawn was security for a debt and was not automatically a slave for life."],
      ["Domestic slavery", "Household slaves often had some rights and their descendants could be absorbed into the family."],
      ["Tribute labour", "Tribute was paid by subject communities; it is not a form of hereditary ownership."],
    ],
    answer: "A",
    explanation: "**Chattel slavery** made the person property for life and passed slave status to the children. It was the form used on plantations in the Americas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was pawnship?",
    options: [
      ["Handing over a person as security for a debt", "Correct: the pawn could be enslaved if the debt was not repaid."],
      ["Selling a prisoner of war at a coastal fort", "That is the sale of a war captive, not pawnship."],
      ["Paying tribute to a ruler in cattle or grain", "Tribute in goods is not pawnship."],
      ["Shipping captives across the Indian Ocean", "That is the East African slave trade."],
    ],
    answer: "A",
    explanation: "In **pawnship** a person, often a relative of the debtor, was handed to a creditor as security. If the debt was not cleared the pawn could be enslaved or sold.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which goods were carried SOUTH across the Sahara in exchange for captives and gold?",
    options: [
      ["Salt, horses and cloth", "Correct: these came from North Africa to the West African states."],
      ["Cloves, sugar and tea", "Cloves and sugar were plantation crops of the Indian Ocean islands."],
      ["Ivory, kola nuts and gold", "These were carried north from West Africa, not south."],
      ["Tobacco, rum and cotton", "These were products of the Americas carried to Europe."],
    ],
    answer: "A",
    explanation: "Camel caravans took **salt, horses, cloth and metal goods** south, and gold, ivory, kola nuts and captives north.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the East African slave trade grow sharply in the nineteenth century?",
    options: [
      ["Clove plantations on Zanzibar and Pemba needed workers", "Correct: Omani rulers based on Zanzibar developed clove plantations."],
      ["The Portuguese founded the prazo system on the Zambezi", "The prazos date from earlier centuries and are a different topic."],
      ["Camel caravans began to cross the Sahara Desert", "Camel caravans belong to the trans-Saharan trade, centuries earlier."],
      ["Britain began buying captives for its Caribbean islands", "Britain abolished its slave trade in 1807."],
    ],
    answer: "A",
    explanation: "Omani rulers moved their capital to Zanzibar (1840), and the **clove plantations** of Zanzibar and Pemba and the sugar islands of the Indian Ocean created a strong demand for labour.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these is a METHOD of obtaining slaves rather than a cause of the slave trade?",
    options: [
      ["Kidnapping people at water points", "Correct: this describes how people were seized."],
      ["Demand for labour on plantations", "This explains why the trade existed: it is a cause."],
      ["The wish of rulers for imported guns", "This is a reason for taking part: a cause."],
      ["Profits made by merchants", "Profit is a cause, not a method."],
    ],
    answer: "A",
    hints: ["A method answers the question \"how?\"; a cause answers \"why?\"."],
    explanation: "**Kidnapping** is a method. Demand for labour, the wish for guns and profit are causes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best describes the gun-slave cycle?",
    options: [
      ["Guns bought with captives made it easier to take more captives", "Correct: the cycle drew neighbours into raiding to defend themselves."],
      ["Guns were banned by African rulers to stop the trade", "There was no general ban; rulers sought guns."],
      ["Captives were given guns and trained as plantation guards", "Enslaved people on plantations were not armed in this way."],
      ["European navies used guns to free captives at sea", "That describes later anti-slavery patrols, after 1807."],
    ],
    answer: "A",
    hints: ["Think about what a ruler did with the guns he received."],
    explanation: "Rulers sold captives for guns; better-armed forces raided neighbours for more captives; the threatened neighbours needed guns too, so the cycle spread.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "On the West African coast, how did most European traders obtain captives?",
    options: [
      ["By buying them from African rulers and merchants", "Correct: Europeans mostly traded at forts and coastal markets."],
      ["By leading armed expeditions deep into the interior", "Europeans rarely went far inland; disease and African states kept them on the coast."],
      ["By taking them as tribute from conquered colonies", "There were no large inland European colonies in West Africa at this time."],
      ["By recruiting volunteers with promises of wages", "Captives were not volunteers."],
    ],
    answer: "A",
    hints: ["Think about where European forts were built."],
    explanation: "Europeans mostly **bought** captives at coastal forts and markets from African rulers and merchants. This does not reduce European responsibility, because European demand drove the trade.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The trans-Saharan slave trade began only after the Atlantic slave trade had started.",
    answer: false,
    explanation: "False. Captives were carried across the Sahara for many centuries before the Atlantic trade began in the fifteenth and sixteenth centuries.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In many African societies, the descendants of household slaves could become free members of the family over time.",
    answer: true,
    explanation: "True. In domestic slavery, enslaved people and especially their descendants were often absorbed into the lineage, unlike chattel slavery in the Americas.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of the slave trade with its type.",
    pairs: [
      "Demand for plantation labour",
      "Selling people convicted of crimes",
      "Wars between rival states",
      "Owning many dependants as a sign of wealth",
    ],
    right: ["Economic", "Social", "Political"],
    rightIndex: [0, 1, 2, 1],
    explanation: "Plantation demand is economic; punishment and status are social; wars between states are political.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each slave trade with its main destination.",
    pairs: [
      ["Trans-Saharan trade", "North Africa and the Middle East"],
      ["East African trade", "Arabia, the Gulf and Indian Ocean islands"],
      ["Atlantic trade", "The Americas and the Caribbean"],
    ],
    explanation: "Each trade had its own routes: across the desert, across the Indian Ocean and across the Atlantic.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Zanzibar slave market is closed",
      "Portuguese sailors begin taking captives from West Africa",
      "The Sultan of Oman moves his capital to Zanzibar",
      "The Atlantic trade reaches its peak",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The Portuguese reached West Africa in the fifteenth century."],
    explanation: "1440s Portuguese begin; the 1700s peak of the Atlantic trade; 1840 Zanzibar becomes the Omani capital; 1873 the Zanzibar market is closed.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Captives in the trans-Saharan trade were carried by {{blank:a}} caravans. In the nineteenth century, East African captives were sent to the {{blank:b}} plantations of Zanzibar and Pemba.",
    blanks: [
      { id: "a", accepted: ["camel"], choices: ["camel", "ox-wagon", "canoe", "railway"] },
      { id: "b", accepted: ["clove"], choices: ["clove", "cotton", "tobacco", "coffee"] },
    ],
    explanation: "Camels carried goods across the Sahara; cloves were the main plantation crop of Zanzibar and Pemba.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the one-word name for a person handed to a creditor as security for a debt.",
    accepted: ["pawn", "a pawn"],
    wrong: ["chattel"],
    explanation: "A **pawn** could be enslaved if the debt was not repaid.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "List **five** methods used to obtain slaves in Africa.",
    points: [
      "Raids on villages.",
      "Wars between states (prisoners of war).",
      "Kidnapping.",
      "Debt / pawnship.",
      "Punishment for crimes / purchase at markets / tribute.",
    ],
    modelAnswer: "Raids on villages; prisoners taken in wars; kidnapping; enslavement for debt or of pawns; selling people convicted of crimes.",
    explanation: "One mark per method; trade at markets and tribute also score.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Outline the economic, social and political causes of the slave trade in Africa.",
    points: [
      "Economic: demand for labour on plantations abroad.",
      "Economic: profit for merchants / desire for imported goods such as guns and cloth.",
      "Social: wealth and status measured in dependants.",
      "Social: debt, pawnship and punishment for crimes.",
      "Political: wars between states produced captives.",
      "Political: gun-slave cycle / expansion of states such as Dahomey and Asante.",
    ],
    hints: ["Give two causes under each heading."],
    modelAnswer: "Economically, plantations in the Americas and later on Zanzibar needed labour, and merchants and rulers profited and wanted imported goods such as guns and cloth. Socially, owning dependants was a sign of wealth, and people in debt or convicted of crimes could be sold. Politically, wars between states produced prisoners, and the gun-slave cycle forced states to raid to obtain guns; some states, such as Dahomey and Asante, grew strong through the trade.",
    explanation: "Two causes under each heading.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** differences between domestic slavery in many African societies and chattel slavery in the Americas.",
    points: [
      "Identifies a difference in rights (domestic slaves could marry / own some property; chattel slaves had none).",
      "Develops it with an example or consequence.",
      "Identifies a difference in inheritance (descendants absorbed into the family vs children born enslaved).",
      "Develops it with an example or consequence.",
    ],
    hints: ["Think about rights and about what happened to the children."],
    modelAnswer: "Domestic slaves often had some rights: they could marry and sometimes hold property or positions of trust, whereas chattel slaves were property with no rights and could be sold at any time. Also, the descendants of domestic slaves were often absorbed into the family as free members, while the children of chattel slaves were born enslaved, so slavery passed from generation to generation.",
    explanation: "Two marks per developed difference.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Read the source and answer the questions.\n\n${source("Source A", "an account by a fictional trader who travelled between the coast and inland markets in the 1780s, written for a European audience", "In the dry season the markets fill with captives. Some were taken when one kingdom made war on another. Others, I was told, were sold by their own headmen for debts or for crimes. A great number had been seized on the roads by armed bands, who sell them to dealers for cloth and powder. The dealers pass them from market to market towards the sea, where the ships wait. Without the ships, said one dealer, there would be no market.")}`,
    hints: ["Separate the ways people were obtained from the reasons the trade existed."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** methods of obtaining captives mentioned in Source A.", points: [
        "War between kingdoms.",
        "Sale for debts or crimes.",
        "Seizure on the roads by armed bands (kidnapping/raiding).",
      ], explanation: "One mark per method taken from the source." }),
      P.manual({ label: "(b)", marks: 3, stem: "What can you infer from Source A about the causes of the trade? Use details from the source.", points: [
        "Inference: European demand drove the trade.",
        "Detail: \"Without the ships ... there would be no market\".",
        "Inference/detail: imported goods (cloth and powder) encouraged raiding.",
      ], explanation: "Inference supported by detail." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source A as evidence about how people were enslaved in West Africa? Use the source and your own knowledge.", points: [
        "Useful: a trader saw the markets himself (provenance).",
        "Useful: the methods it lists (war, debt, punishment, kidnapping) match what historians know.",
        "Useful: it shows the chain of dealers from inland to coast, which matches own knowledge.",
        "Limitation: some details are hearsay (\"I was told\").",
        "Limitation: written for a European audience; a trader may play down his own role / gives no voice to captives.",
        "Supported judgement on usefulness.",
      ], levels: levels(6), modelAnswer: "Source A is useful because its author was a trader who saw the inland markets himself. The methods he describes, war, sale for debt or crime and kidnapping by armed bands, match what historians know, and his account of dealers passing captives from market to market towards the coast fits the way the Atlantic trade worked. He even admits that the ships created the market.\n\nHowever, some of his information is hearsay, as he says he \"was told\" about debts and crimes. He wrote for a European audience, and as a trader he may have stressed African methods to play down the part of European buyers. The source gives no voice to the captives themselves.\n\nOverall it is useful as evidence of the methods and the chain of trade, but it must be checked against other evidence because of its author's interest and its one-sided view.", explanation: "Weigh provenance and content against own knowledge." }),
    ],
    explanation: "Source-based practice question on methods and causes (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), weigh outside demand against conditions inside Africa."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the East African slave trade in the nineteenth century.", points: [
        "Run by Swahili-Arab and Indian merchants through coastal towns such as Kilwa and Zanzibar.",
        "Caravans went inland (e.g. towards Lake Malawi) for ivory and captives, with African traders such as the Yao.",
        "Captives sent to Zanzibar and Pemba clove plantations / Indian Ocean sugar islands.",
        "Others shipped to Arabia, the Persian Gulf and India.",
      ], explanation: "Four features." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far was the slave trade in Africa caused by demand from outside the continent?", points: [
        ["Outside demand: plantations in the Americas and the Indian Ocean needed labour.", 2],
        ["Outside demand: foreign merchants and imported goods (guns, cloth) gave strong incentives.", 2],
        ["Internal: wars between states, debt, punishment and status already produced captives (domestic slavery existed).", 2],
        ["Internal: rulers and merchants profited; the gun-slave cycle drew states in.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Demand from outside Africa was very important. Plantations in the Americas needed huge numbers of workers, and in the nineteenth century the clove plantations of Zanzibar and the sugar islands of the Indian Ocean did too. Foreign merchants offered guns, cloth and other goods, which gave rulers and traders a strong reason to supply captives.\n\nHowever, conditions inside Africa also mattered. Domestic slavery, pawnship and the sale of criminals existed in many societies, and wars between states produced prisoners. African rulers and merchants profited from the trade, and once guns were involved the gun-slave cycle pushed even unwilling states to raid their neighbours.\n\nOverall outside demand was the main cause of the great growth of the trade, because the scale of the Atlantic and Indian Ocean trades went far beyond older local slavery. But internal practices and the interests of some African rulers explain how the demand was met.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Chattel slavery", "Slavery in which the person is property, can be sold at any time and passes slave status to the children.");
  b.card("DEFINITION", "Domestic (household) slavery", "Slavery within a household or community; enslaved people often had some rights and their descendants could be absorbed into the family.");
  b.card("DEFINITION", "Pawnship", "Handing over a person as security for a debt; the pawn could be enslaved if the debt was not repaid.");
  b.card("FACT", "What goods went south across the Sahara in exchange for gold and captives?", "Salt, horses, cloth and metal goods.");
  b.card("FACT", "What created new demand for captives in nineteenth-century East Africa?", "The clove plantations of Zanzibar and Pemba and the sugar islands of the Indian Ocean.");
  b.card("CONCEPT", "What was the gun-slave cycle?", "Captives were sold for guns; guns made it easier to take more captives; threatened neighbours had to join in to get guns themselves.");
  b.card("CONCEPT", "Give one economic, one social and one political cause of the slave trade.", "Economic: demand for plantation labour. Social: debt or punishment for crimes. Political: wars between states.");
  b.card("FACT", "Name five methods of obtaining slaves.", "Raids, wars, kidnapping, debt or pawnship, punishment for crimes (also trade at markets and tribute).");
  b.card("CONCEPT", "How did most Europeans on the West African coast obtain captives?", "They bought them from African rulers and merchants at coastal forts and markets; European demand drove the trade.");
});
