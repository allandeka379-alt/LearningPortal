// Slice W2a: effects of the slave trade and its abolition (ZIMSEC topic 5.3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.slavery.effects-abolition", { file: "slavery/effects-abolition", keyPrefix: "slavery.effects-abolition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Britain abolish its slave trade?",
    options: [
      ["1807", "Correct: the Slave Trade Act of 1807."],
      ["1833", "That was the Act abolishing slavery itself in most of the empire."],
      ["1787", "That was when the abolition society was founded."],
      ["1888", "That was when Brazil abolished slavery."],
    ],
    answer: "A",
    explanation: "Britain abolished its **slave trade** in **1807**; slavery itself was abolished by the 1833 Act, in force from 1 August 1834.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which formerly enslaved African published an account of his life in 1789 that helped the abolition campaign?",
    options: [
      ["Olaudah Equiano", "Correct: his autobiography was widely read in Britain."],
      ["William Wilberforce", "Wilberforce was a British MP, not a formerly enslaved writer."],
      ["Thomas Clarkson", "Clarkson was a British campaigner who collected evidence."],
      ["Walter Rodney", "Rodney was a twentieth-century historian."],
    ],
    answer: "A",
    explanation: "**Olaudah Equiano** published his autobiography in 1789.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these was a POSITIVE effect of contact through the slave trade for many Africans?",
    options: [
      ["New food crops such as maize and cassava", "Correct: these crops from the Americas became staple foods."],
      ["The loss of young men and women", "That is depopulation, a negative effect."],
      ["The spread of raiding, wars and insecurity", "That is a negative effect."],
      ["The decline of local weaving", "That is a negative effect of imported cloth."],
    ],
    answer: "A",
    explanation: "**Maize, cassava and groundnuts** came from the Americas and became important food crops.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did farming decline in many areas affected by the slave trade?",
    options: [
      ["Raids took young workers and made fields unsafe", "Correct: labour loss and insecurity cut food production."],
      ["Europeans banned Africans from growing their own food", "There was no such ban in this period."],
      ["Farmers moved to work in European factories", "Africans did not migrate to European factories."],
      ["New crops from the Americas would not grow", "Maize and cassava grew well and spread."],
    ],
    answer: "A",
    explanation: "Raids removed young workers, and fear of raids stopped people farming outlying fields.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the main job of Britain's West Africa Squadron after 1808?",
    options: [
      ["To capture ships carrying captives illegally", "Correct: freed Africans were often landed at Freetown."],
      ["To protect British slave ships from pirates", "Britain had abolished its trade; the squadron opposed slaving."],
      ["To conquer the kingdoms of the West African interior", "The squadron worked at sea."],
      ["To carry palm oil to Britain's factories", "Naval ships did not carry trade goods."],
    ],
    answer: "A",
    hints: ["Britain had just made its own slave trade illegal."],
    explanation: "The **West Africa Squadron** patrolled the coast and captured slave ships; many freed Africans were landed at Freetown, Sierra Leone.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What did the historian Eric Williams argue in Capitalism and Slavery (1944)?",
    options: [
      ["Abolition came mainly because slavery became less profitable", "Correct: he stressed economic change in industrial Britain."],
      ["Abolition was caused only by the work of Christian campaigners", "Williams played down the humanitarian explanation."],
      ["The slave trade had no effect on Britain's economy", "He argued the opposite: slavery helped British growth."],
      ["Slavery was abolished first by Brazil", "Brazil was the last in the Americas, in 1888."],
    ],
    answer: "A",
    hints: ["Look at the title of his book."],
    explanation: "Williams argued that economic change, not mainly humanitarianism, ended the trade. Other historians reply that the trade was still profitable in 1807.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which fact makes it hardest to argue that abolition happened only because the trade was no longer profitable?",
    options: [
      ["Smugglers kept shipping captives to Cuba", "Correct: continuing demand shows the trade still made money."],
      ["British factories needed palm oil from West Africa", "This supports the economic argument."],
      ["Free trade ideas spread among British politicians", "This supports the economic argument."],
      ["The Caribbean faced competition in sugar", "This supports the economic argument."],
    ],
    answer: "A",
    hints: ["Which option shows people still wanted to buy captives?"],
    explanation: "If smugglers kept shipping captives to Brazil and Cuba, the trade was still profitable for someone, which weakens a purely economic explanation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Britain's Slavery Abolition Act came into force in 1834.",
    answer: true,
    explanation: "True. It freed enslaved people in most of the British Empire, although an apprenticeship system lasted until 1838.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The East African slave trade ended at the same time as Britain's abolition of its Atlantic trade in 1807.",
    answer: false,
    explanation: "False. The East African trade grew in the nineteenth century; the Zanzibar slave market closed only in 1873.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each campaigner or group with their role in the abolition movement.",
    pairs: [
      ["William Wilberforce", "Led the campaign in Parliament"],
      ["Thomas Clarkson", "Collected evidence about the trade"],
      ["Olaudah Equiano", "Formerly enslaved author of a life story"],
      ["Quakers", "Religious group that formed most of the 1787 Society"],
    ],
    explanation: "Wilberforce in Parliament; Clarkson as researcher; Equiano as writer and speaker; Quakers as early organisers.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Britain abolishes slavery in most of its empire",
      "The abolition society is founded in London",
      "The Zanzibar slave market is closed",
      "Britain abolishes its slave trade",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The trade was abolished before slavery itself."],
    explanation: "1787 society; 1807 trade abolished; 1833-34 slavery abolished; 1873 Zanzibar market closed.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Many Africans freed by British patrols were landed at {{blank:a}} in Sierra Leone. The historian Walter Rodney argued that the slave trade helped to {{blank:b}} Africa.",
    blanks: [
      { id: "a", accepted: ["Freetown"], choices: ["Freetown", "Elmina", "Zanzibar", "Luanda"] },
      { id: "b", accepted: ["underdevelop"], choices: ["underdevelop", "industrialise", "unite", "Christianise"] },
    ],
    explanation: "Freetown was the settlement for freed Africans; Rodney's book was *How Europe Underdeveloped Africa* (1972).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name did Europeans give to trade in goods such as palm oil that they hoped would replace the trade in people?",
    accepted: ["legitimate trade", "legitimate commerce"],
    wrong: ["triangular trade"],
    explanation: "**Legitimate trade** meant trade in goods such as palm oil, groundnuts and ivory.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "Identify **five** groups or individuals who campaigned for the abolition of the slave trade.",
    points: [
      "Quakers.",
      "Evangelical Christians / William Wilberforce.",
      "Humanitarians such as Thomas Clarkson or Granville Sharp.",
      "Formerly enslaved Africans such as Olaudah Equiano or Ottobah Cugoano.",
      "Enslaved people who revolted / ordinary people who petitioned and boycotted sugar.",
    ],
    modelAnswer: "Quakers; evangelical Christians led in Parliament by William Wilberforce; humanitarians such as Thomas Clarkson; formerly enslaved writers such as Olaudah Equiano; and enslaved people themselves through revolts such as Saint-Domingue.",
    explanation: "One mark per group or named individual (different categories).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe **three** negative effects of the slave trade on Africa.",
    points: [
      "Identifies depopulation.",
      "Develops: loss of young, productive men and women / deaths in raids and marches.",
      "Identifies insecurity and wars.",
      "Develops: gun-slave cycle spread raiding; people moved to defensive sites.",
      "Identifies decline of crafts or farming.",
      "Develops: imported cloth undercut weavers / loss of workers cut food production.",
    ],
    hints: ["Name each effect, then say how it happened."],
    modelAnswer: "The trade caused depopulation, because millions of young, productive people were taken and many more died in raids and on the way to the coast. It spread insecurity and war, since the gun-slave cycle encouraged states to raid their neighbours and people moved to defensive sites. It damaged crafts and farming: imported cloth undercut local weavers, and the loss of workers and fear of raids reduced food production.",
    explanation: "Two marks per developed effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** challenges that Britain faced in ending the slave trade after 1807.",
    points: [
      "Identifies continuing demand (Brazil, Cuba, United States).",
      "Explains: smugglers kept shipping captives illegally because it was profitable.",
      "Identifies the difficulty of policing (long coastline / other nations' ships / East African trade).",
      "Explains: patrols could not cover it all; treaties were needed to search foreign ships; Zanzibar trade continued.",
    ],
    hints: ["Think about demand and about policing the sea."],
    modelAnswer: "Plantations in Brazil and Cuba still wanted labour, so smugglers kept shipping captives because the trade remained profitable. Policing was also hard: the West African coast was very long, and the Royal Navy could only search foreign ships where treaties allowed it, so many slave ships escaped.",
    explanation: "Two marks per developed challenge.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a poster of the kind displayed by abolition societies in British towns in the 1790s, described in words", "A kneeling African man in chains looks upwards with his hands raised. Beneath him are the words \"Am I not a man and a brother?\" A smaller line at the bottom asks shoppers to refuse sugar grown by enslaved people.", { described: true })}`,
    hints: ["Think about who produced the poster and who it was aimed at."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** things the poster asked the British public to do or believe.", points: [
        "Believe that the enslaved African was a fellow human being / a brother.",
        "Refuse (boycott) sugar grown by enslaved people.",
      ], explanation: "One mark each." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why was a poster like this produced in the 1790s? Use the source and your own knowledge.", points: [
        "Purpose: to win public support for abolition.",
        "Detail: appeals to Christian brotherhood / sympathy for the kneeling figure.",
        "Context: the campaign of the 1787 Society; petitions to Parliament.",
        "Context: the sugar boycott to put economic pressure on planters.",
      ], explanation: "Purpose plus context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far does this source show that abolition was caused by humanitarian and religious feeling? Use the source and your own knowledge.", points: [
        "Source supports: appeals to humanity and Christian brotherhood.",
        "Own knowledge supports: Quakers, evangelicals, Wilberforce, Equiano's writings changed opinion.",
        "Limitation: the poster shows the campaign's message, not why Parliament acted.",
        "Other causes: economic change (Williams' argument, Industrial Revolution, legitimate trade).",
        "Other causes: resistance of enslaved people (Saint-Domingue).",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The source shows that humanitarian and religious feeling was important. It appeals to readers to see the enslaved man as a \"brother\", a Christian idea, and asks them to give up slave-grown sugar. From my own knowledge, Quakers and evangelicals such as Wilberforce led the campaign, and writers such as Equiano changed public opinion.\n\nHowever, the poster only shows what campaigners wanted people to feel; it cannot show why Parliament voted for abolition in 1807. Historians such as Eric Williams argue that economic change mattered more, as industrial Britain wanted raw materials and markets in Africa. The revolt in Saint-Domingue also showed how dangerous slavery had become.\n\nSo the source shows that humanitarian feeling was a major force, but on its own it cannot prove it was the only cause.", explanation: "Use the source and own knowledge on both sides." }),
    ],
    explanation: "Source-based practice question on the abolition campaign (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider who gained and who lost."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the positive effects of the slave trade claimed for Africa.", points: [
        "New crops (maize, cassava, groundnuts) from the Americas.",
        "Rise of states such as Dahomey and Asante.",
        "Wealth for some rulers and merchants / growth of coastal towns.",
        "New goods and contact with the wider world.",
      ], explanation: "Four effects." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The slave trade did far more harm than good to Africa.\" How far do you agree?", points: [
        ["Harm: depopulation, loss of young workers; deaths in raids and marches.", 2],
        ["Harm: insecurity, wars and the gun-slave cycle; brutalisation.", 2],
        ["Harm: decline of crafts and farming; Rodney's underdevelopment argument.", 2],
        ["Good (limited): new crops; rise of some states and merchants.", 2],
        ["Qualification: gains went to a few; effects varied by region; debate over long-term impact.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The harm done by the slave trade was enormous. Historians estimate that about 12 million people were embarked across the Atlantic alone, mostly young men and women, and many more died in raids and on the march to the coast. The gun-slave cycle spread wars and raiding, so people lived in fear and moved to defensive sites. Farming suffered from the loss of workers and from insecurity, and imported cloth undercut local crafts. Walter Rodney argued that this drained Africa of labour and held back its development.\n\nSome claim there were benefits. Maize, cassava and groundnuts came from the Americas and became staple foods. States such as Dahomey and Asante grew powerful, and some rulers and merchants became rich.\n\nHowever, these gains were limited. The new crops could have arrived through ordinary trade, and the wealth went to a small group while most people suffered. Historians debate how far the trade alone explains later poverty, as effects varied by region and colonial rule followed. Even so, the evidence strongly supports the view that the trade did far more harm than good.", explanation: "Both sides with a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did Britain abolish its slave trade?", "1807.");
  b.card("FACT", "When did Britain's Slavery Abolition Act come into force?", "1 August 1834 (passed in 1833).");
  b.card("DEFINITION", "Legitimate trade", "Trade in goods such as palm oil, groundnuts and ivory, which Europeans hoped would replace the trade in people.");
  b.card("FACT", "Who was Olaudah Equiano?", "A formerly enslaved African whose autobiography (1789) helped the abolition campaign.");
  b.card("FACT", "Who led the abolition campaign in the British Parliament?", "William Wilberforce, an evangelical Christian MP.");
  b.card("CONCEPT", "What did Eric Williams argue about abolition?", "In Capitalism and Slavery (1944) he argued abolition came mainly because slavery became less profitable to industrial Britain; others stress humanitarian and religious campaigns.");
  b.card("CONCEPT", "Give four negative effects of the slave trade on Africa.", "Depopulation; insecurity and wars; decline of crafts; decline of farming (also brutalisation and, some argue, long-term underdevelopment).");
  b.card("CONCEPT", "Why was the slave trade hard to end?", "Continuing demand in Brazil and Cuba; a long coast to patrol; other nations' ships; African rulers' interests; the growing East African trade.");
  b.card("FACT", "When was the Zanzibar slave market closed?", "1873, under a treaty with Britain.");
});
