// W1a: hist.precolonial.ndebele-state (ZIMSEC 4.6).
import { concept, P, source, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.precolonial.ndebele-state", { file: "precolonial/ndebele-state", keyPrefix: "precolonial.ndebele-state" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who founded the Ndebele state?",
    options: [
      ["Mzilikazi", "Correct: Mzilikazi of the Khumalo clan led the Ndebele from Zululand to south-western Zimbabwe."],
      ["Lobengula, who built koBulawayo", "Lobengula was Mzilikazi's son and successor, installed in 1870."],
      ["Shaka, the king of the Zulu", "Mzilikazi broke away from Shaka."],
      ["Changamire Dombo, the Rozvi leader", "Dombo founded the Rozvi state in the seventeenth century."],
    ],
    answer: "A",
    explanation: "Mzilikazi broke with Shaka in about 1822 and founded the Ndebele state, which settled in south-western Zimbabwe in about 1838-1840.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Mzilikazi break with Shaka in about 1822?",
    options: [
      ["He refused to hand over cattle captured in a raid", "Correct: keeping the cattle defied Shaka, so Mzilikazi fled north."],
      ["He was defeated by the Voortrekkers and had to leave Zululand", "The clashes with the Voortrekkers came later, on the Highveld."],
      ["He wanted to join the London Missionary Society at Inyati", "Inyati mission was founded in 1859, long after the break."],
      ["Shaka sent him north to find gold for the Zulu kingdom", "He fled to escape Shaka's anger, not on a mission."],
    ],
    answer: "A",
    explanation: "After a raid, Mzilikazi kept the captured cattle instead of sending them to Shaka, and fled north to escape punishment.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which group in Ndebele society was made up of people incorporated **in Zimbabwe**, mainly Shona?",
    options: [
      ["Hole", "Correct: the Hole were incorporated in Zimbabwe and had the lowest status."],
      ["Zansi, the Nguni who came from the south", "The Zansi were the original Nguni and had the highest status."],
      ["Enhla, incorporated on the Highveld", "The Enhla were mainly Sotho and Tswana incorporated on the Highveld."],
      ["Izinduna, the senior officials of the king", "Izinduna were officials, not one of the three social groups."],
    ],
    answer: "A",
    explanation: "Zansi (Nguni from the south), Enhla (Sotho and Tswana from the Highveld), Hole (mainly Shona, incorporated in Zimbabwe).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the **ukusisa** system in the Ndebele state?",
    options: [
      ["The king lent cattle to loyal subjects", "Correct: lending cattle spread the king's wealth and built loyalty."],
      ["The annual ceremony at which the regiments assembled", "That was the Inxwala."],
      ["The division of society into three social groups", "That was the Zansi, Enhla and Hole system."],
      ["The payment of hut tax to the British South Africa Company", "Hut tax was imposed under Company rule after 1894."],
    ],
    answer: "A",
    explanation: "Under ukusisa, the king lent cattle to subjects to herd and use; it spread wealth and tied people to the king.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did regiments in the Ndebele state live in peacetime?",
    options: [
      ["In their own regimental towns, farming and herding", "Correct: each regiment had its own town under an induna and was economically active."],
      ["In the king's palace, where they were fed by the king alone", "Regiments lived in their own towns across the state."],
      ["In mission stations, where they were taught by missionaries", "Missionaries had little influence on the regiments."],
      ["In the Rozvi capital, which they had captured and rebuilt", "The regiments lived in regimental towns of their own."],
    ],
    hints: ["Regiments were both military and social units."],
    answer: "A",
    explanation: "Regimental towns were the basic units of the state: they farmed and herded in peace and fought when called.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened at **Ntabazinduna**, according to tradition?",
    options: [
      ["Mzilikazi punished the izinduna who had installed Nkulumane", "Correct: the name means 'hill of the izinduna'."],
      ["Lobengula signed the Rudd Concession with Rhodes's agents", "The concession was signed at Lobengula's capital in 1888."],
      ["The Pioneer Column raised the British flag", "The flag was raised at Fort Salisbury in 1890."],
      ["Shaka defeated Zwide in the war with the Ndwandwe", "Those battles took place in Zululand in 1818-1819."],
    ],
    answer: "A",
    hints: ["The name means 'hill of the izinduna'.", "What did the main group do when they believed Mzilikazi was dead?"],
    explanation: "When Mzilikazi rejoined the main group in about 1840, tradition says he had the izinduna who had installed Nkulumane put to death there.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason **best** explains why the Ndebele were able to settle in south-western Zimbabwe without strong resistance?",
    options: [
      ["The Rozvi state had already collapsed after Nguni attacks", "Correct: there was no strong power left to resist them."],
      ["The British South Africa Company invited them to settle there", "The Company did not exist until 1889."],
      ["The Portuguese had conquered the area and handed it over", "The Portuguese had been driven off the plateau in the 1690s."],
      ["The land was completely empty of people", "Shona communities lived there; many were incorporated or paid tribute."],
    ],
    answer: "A",
    hints: ["What had happened to the Rozvi in the 1830s?"],
    explanation: "Nguni groups such as those of Zwangendaba and Nyamazana had broken the Rozvi state in the 1830s, leaving no strong power in the south-west.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about **incorporation** in the Ndebele state is best supported?",
    options: [
      ["It built a large nation, but kept people in ranked groups", "Correct: it strengthened the state, but Zansi, Enhla and Hole kept different status."],
      ["It made all incorporated people equal to the Zansi immediately", "Status differences remained, though individuals could rise."],
      ["It was never used: the Ndebele were all Nguni by birth", "Most Ndebele were incorporated Sotho, Tswana and Shona people."],
      ["It weakened the army because captives refused to serve", "Incorporated young men served in the regiments and were the army's main source of growth."],
    ],
    answer: "A",
    hints: ["Think about both the benefits and the limits of incorporation."],
    explanation: "Incorporation explains the rapid growth of the nation and army; social ranking and limits on intermarriage show its limits.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lobengula was installed as king of the Ndebele in 1870.",
    answer: true,
    explanation: "True. After Mzilikazi's death in 1868 and a succession dispute, Lobengula was installed in 1870 and founded koBulawayo.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Every Shona community in western Zimbabwe was conquered and placed directly under Ndebele regiments.",
    answer: false,
    explanation: "False. Some communities were incorporated, but many kept their own chiefs and paid tribute, while others further away were raided.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Inkosi", "The king"],
      ["Induna", "A senior official or commander"],
      ["Ibutho", "A regiment"],
      ["Inxwala", "The annual national ceremony"],
    ],
    explanation: "Inkosi (king), induna (official/commander), ibutho (regiment), Inxwala (annual ceremony renewing the king's authority).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each social group with its origin.",
    pairs: [
      ["Zansi", "Nguni who came with Mzilikazi from the south"],
      ["Enhla", "Sotho and Tswana incorporated on the Highveld"],
      ["Hole", "Shona incorporated in Zimbabwe"],
    ],
    extraRight: ["Portuguese traders who settled at Inyati"],
    explanation: "The three groups reflect the stages of the migration: south (Zansi), Highveld (Enhla), Zimbabwe (Hole).",
  });
  {
    const t = timeline([
      ["c. 1822", "Mzilikazi breaks with Shaka"],
      ["1837", "Defeats by Boer commandos push the Ndebele out of the Transvaal"],
      ["1868", "Death of Mzilikazi"],
      ["1893-94", "The Anglo-Ndebele War ends the state"],
    ]);
    const order = [2, 0, 3, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["The Ndebele met the Boers on the Highveld before they reached Zimbabwe."],
      explanation: "Break with Shaka (c. 1822), Boer defeats (1837), Mzilikazi's death (1868), the war (1893-94).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Lobengula's capital was called {{blank:a}}. Mzilikazi belonged to the {{blank:b}} clan.",
    blanks: [
      { id: "a", accepted: ["koBulawayo"], choices: ["koBulawayo", "Inyati", "Khami", "Danangombe"] },
      { id: "b", accepted: ["Khumalo"], choices: ["Khumalo", "Ndwandwe", "Mthethwa", "Rozvi"] },
    ],
    explanation: "Lobengula founded koBulawayo in 1870; the city of Bulawayo takes its name from it. Mzilikazi was a Khumalo.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name Mzilikazi's son whom the main Ndebele group installed as king when they believed Mzilikazi was dead.",
    accepted: ["Nkulumane", "Nkulumana"],
    wrong: ["Lobengula", "Gundwane"],
    explanation: "**Nkulumane** was installed by the main group; his fate after Mzilikazi's return is uncertain, and his claim was raised again in the 1868-1870 succession dispute.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the factors that led to the formation of the Ndebele state.",
    points: [
      "Mzilikazi's break with Shaka (about 1822) and the migration north",
      "Military strength based on Zulu-style regiments and weapons",
      "Incorporation of Sotho, Tswana and Shona people increased numbers",
      "Defeats by the Boers (1837) pushed the Ndebele north to Zimbabwe",
      "The collapse of the Rozvi and the good, tsetse-free grazing of the south-west allowed settlement",
    ],
    hints: ["Think about leadership, military strength, people and land."],
    modelAnswer: "Mzilikazi broke with Shaka in about 1822 and led his followers north. His army used Zulu-style regiments and weapons, which made it strong. He incorporated Sotho, Tswana and later Shona people, increasing the nation's size. Defeats by the Boers in 1837 pushed the Ndebele further north. The collapse of the Rozvi and the good, tsetse-free grazing land of south-western Zimbabwe allowed them to settle there in about 1838-1840.",
    explanation: "One mark per factor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the economic organisation of the Ndebele state.",
    points: [
      "Cattle were the main wealth; the king lent cattle to subjects (ukusisa)",
      "Raiding neighbouring communities for cattle, grain and captives",
      "Tribute from subject Shona communities (cattle, grain, hoes and iron goods)",
      "Agriculture: sorghum, millet, maize, pumpkins, largely by women",
      "Hunting for meat, hides and ivory",
      "Trade with Europeans: ivory and cattle for guns, cloth and beads",
    ],
    hints: ["Include production, collection (raiding, tribute) and exchange (trade)."],
    modelAnswer: "Cattle were the main form of wealth, and the king lent cattle to loyal subjects under the ukusisa system. The Ndebele raided neighbouring communities for cattle, grain and captives, and subject Shona communities paid tribute in cattle, grain, hoes and iron goods. Women grew sorghum, millet, maize and pumpkins. Men hunted for meat, hides and ivory, and the Ndebele traded ivory and cattle with European traders for guns, cloth and beads.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Ndebele state declined and fell.",
    points: [
      ["Internal weaknesses: the succession dispute of 1868-1870 and resentment among raided and tributary Shona communities", 2],
      ["European pressure: concession seekers, missionaries and the Rudd Concession, which led to the Royal Charter and the occupation of Mashonaland", 2],
      ["Military defeat by the Company's forces with machine guns in 1893-94; Lobengula fled and died", 2],
    ],
    hints: ["Separate internal weaknesses from external pressures."],
    modelAnswer: "The state had internal weaknesses: the succession dispute after Mzilikazi's death divided the regiments, and raided and tributary Shona communities resented Ndebele rule. From the 1880s European pressure grew: concession seekers and missionaries undermined the king, and Rhodes used the Rudd Concession to obtain the Royal Charter and occupy Mashonaland in 1890, cutting Lobengula off from tributary areas. Finally, in the war of 1893-94 the Company's forces, armed with machine guns, defeated the regiments; Lobengula fled and died, and the state fell.",
    explanation: "A strong answer links internal weaknesses to the external pressures that ended the state.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the source and answer the questions.",
      "",
      source("Source A", "an account by a fictional European hunter who visited the Ndebele capital in the 1870s, written in a book for British readers",
        "The king sits among his councillors and nothing is done without his word. Each regiment lives in its own town, and when the call comes they gather in thousands, their shields all of one colour. The people say every beast in the land belongs to the king, though he lends them freely to those who serve him well."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** features of the Ndebele state described in Source A.", points: ["The king ruled with councillors and held supreme authority", "Regiments lived in their own towns and gathered when called", "Cattle belonged to the king, who lent them to loyal subjects (ukusisa)"] }),
      P.manual({ label: "(b)", marks: 3, stem: "What can be inferred from Source A about how the king kept his subjects loyal?", points: ["He controlled the nation's cattle", "Lending cattle rewarded service and created dependence", "Assembling the regiments displayed his power"] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable is Source A as evidence about the Ndebele state? Use your own knowledge.", type: "EXTENDED_RESPONSE", points: [["An eyewitness visitor at the time; content fits own knowledge (king, izinduna, regimental towns, ukusisa)", 2], ["An outsider who may not understand the language or institutions; writing a book for British readers, perhaps to entertain or exaggerate", 2], ["Judgement: fairly reliable on what he could see, less so on what 'the people say'", 2]], levels: levels(6), modelAnswer: "Source A is fairly reliable because the hunter visited the capital in the 1870s and saw it for himself, and what he describes matches own knowledge: the king ruled with councillors, regiments lived in their own towns, and the king lent cattle under the ukusisa system. But he was an outsider who probably did not speak the language well, and he was writing a book for British readers, who liked dramatic descriptions, so he may exaggerate the king's power. He is most reliable on what he saw and less so on what 'the people say'." }),
    ],
    hints: ["What could the hunter see for himself, and what did he only hear?"],
    explanation: "Eyewitness accounts by outsiders are useful but limited by language, understanding and the audience they wrote for.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the Ndebele state.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the political organisation of the Ndebele state.", points: ["The king was head of state, commander, judge and religious leader", "Izinduna governed regiments and areas and advised the king", "Regiments lived in regimental towns under an induna", "Tributary Shona communities kept their chiefs but paid tribute"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how incorporation strengthened the Ndebele state.", points: [["Young men from conquered peoples joined the regiments, so the army grew", 2], ["Women joined Ndebele families and children were raised as Ndebele, so the nation grew and became united around the king", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Raiding was the most important part of the Ndebele economy.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: raids brought cattle, grain and captives; they increased the king's herds", 2], ["Against: cattle-keeping, agriculture, tribute, hunting and trade were the regular base of the economy; raiding was occasional and often exaggerated by European writers", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Raiding was important: it brought cattle, grain and captives, increased the king's herds and supplied young men for the regiments. However, the everyday economy rested on other activities. Most food came from farming by women, cattle were bred and herded in the regimental towns, tributary communities paid regular tribute, and hunting and trade brought ivory, guns and cloth. Many European writers exaggerated raiding to portray the Ndebele as warlike, which later helped justify colonial conquest. So raiding was one part of the economy, but cattle-keeping and farming were more important." }),
    ],
    hints: ["In (c), think about how European writers described the Ndebele and why."],
    explanation: "A strong answer weighs raiding against the farming and herding base of the economy and is aware of biased European accounts.",
  });

  b.card("FACT", "When did Mzilikazi break with Shaka?", "About 1822, after refusing to hand over raided cattle.");
  b.card("FACT", "When did the Ndebele settle in south-western Zimbabwe?", "About 1838-1840.");
  b.card("DEFINITION", "What was **incorporation**?", "Absorbing conquered or captured people into the nation, e.g. young men into the regiments.");
  b.card("CONCEPT", "Zansi, Enhla and Hole: who were they?", "Zansi: Nguni from the south (highest). Enhla: Sotho/Tswana from the Highveld. Hole: mainly Shona incorporated in Zimbabwe (lowest).");
  b.card("DEFINITION", "What was **ukusisa**?", "The king lending cattle to loyal subjects to herd and use.");
  b.card("DEFINITION", "What was the **Inxwala**?", "The annual Ndebele national ceremony renewing the king's authority.");
  b.card("FACT", "When did Mzilikazi die and when was Lobengula installed?", "Mzilikazi died in 1868; Lobengula was installed in 1870.");
  b.card("FACT", "What does Ntabazinduna mean?", "'Hill of the izinduna': where, by tradition, Mzilikazi punished the izinduna who installed Nkulumane.");
  b.card("CONCEPT", "Main reasons for the fall of the Ndebele state?", "Succession dispute and internal tensions; concession seekers, the Rudd Concession and the Charter; defeat by the Company in 1893-94.");
  b.card("FACT", "Where did Ndebele regiments live in peacetime?", "In their own regimental towns, farming and herding under an induna.");
});
