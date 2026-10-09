// W1a: hist.precolonial.mfecane-zulu (ZIMSEC 4.5).
import { concept, P, source, sources, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.precolonial.mfecane-zulu", { file: "precolonial/mfecane-zulu", keyPrefix: "precolonial.mfecane-zulu" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the usual English translation of the Nguni word **Mfecane**?",
    options: [
      ["The crushing", "Correct: often given as 'the crushing' or 'the scattering'."],
      ["The great trek of the farmers into the interior", "That describes the Great Trek of the Boers in the 1830s."],
      ["The first-fruits ceremony of the king", "The first-fruits ceremony is the umkhosi."],
      ["The houses of stone built by the ancestors", "That is the meaning of dzimba dza mabwe, the origin of 'Zimbabwe'."],
    ],
    answer: "A",
    explanation: "Mfecane means 'the crushing' or 'the scattering'; the Sotho-Tswana name is Difaqane (Lifaqane).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who was the ruler of the **Mthethwa** under whom Shaka served as a soldier?",
    options: [
      ["Dingiswayo", "Correct: Dingiswayo led the Mthethwa confederacy and supported Shaka's rise."],
      ["Dingane, who later became the Zulu king", "Dingane was Shaka's half-brother, who assassinated him in 1828."],
      ["Zwide, the ruler of the Ndwandwe", "Zwide was the Ndwandwe ruler who killed Dingiswayo."],
      ["Moshoeshoe, the founder of the Sotho kingdom", "Moshoeshoe built the Sotho kingdom in the mountains of Lesotho."],
    ],
    answer: "A",
    explanation: "Shaka served in Dingiswayo's Mthethwa army; Dingiswayo helped him become Zulu chief in about 1816.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the **iklwa**?",
    options: [
      ["A short stabbing spear", "Correct: it was used at close quarters instead of being thrown."],
      ["A large cowhide shield carried by every warrior", "Shaka's warriors did carry large shields, but the iklwa was the spear."],
      ["A royal military homestead where regiments lived", "Those were the amakhanda."],
      ["A senior official appointed by the king", "That is an induna."],
    ],
    answer: "A",
    explanation: "The iklwa, a short broad-bladed stabbing spear, was used with a large shield in close combat.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Shaka's **cow-horn formation**, what did the 'horns' do?",
    options: [
      ["They encircled the enemy from the sides", "Correct: the horns surrounded the enemy while the chest attacked head-on."],
      ["They waited behind the battle as a reserve force", "That was the role of the 'loins'."],
      ["They attacked the enemy directly from the front", "That was the role of the 'chest'."],
      ["They guarded the king's cattle far from the battle", "The horns were attacking units within the formation."],
    ],
    answer: "A",
    explanation: "Chest: frontal attack. Horns: encircle from the sides. Loins: reserve.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Shaka make warriors wait for the king's permission to **marry**?",
    options: [
      ["To keep them in service for longer", "Correct: delayed marriage kept regiments ready and loyal to the king."],
      ["Because marriage was forbidden by the Christian missionaries at his court", "There were no missionaries influencing Shaka's army policy."],
      ["Because there were not enough cattle in the kingdom for bridewealth", "The aim was military, not a shortage of cattle."],
      ["To force warriors to join the Ndwandwe army instead", "The Ndwandwe were Shaka's enemies."],
    ],
    answer: "A",
    hints: ["What happened to a young man's duties once he had his own homestead and family?"],
    explanation: "Delaying marriage kept young men in the regiments, building a standing army whose first loyalty was to the king.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which leader of a group fleeing the Mfecane crossed Zimbabwe and led his followers over the Zambezi in **1835**?",
    options: [
      ["Zwangendaba", "Correct: his Ngoni settled eventually in present-day Malawi, Zambia and Tanzania."],
      ["Soshangane, the founder of the Gaza kingdom", "Soshangane founded the Gaza kingdom in southern Mozambique."],
      ["Moshoeshoe, the founder of the Sotho kingdom", "Moshoeshoe stayed in the mountains of Lesotho."],
      ["Sebetwane, the leader of the Kololo", "Sebetwane's Kololo moved to Barotseland on the upper Zambezi, but did not cross in 1835 with the Ngoni."],
    ],
    answer: "A",
    hints: ["His followers are known as the Ngoni of Malawi and Zambia."],
    explanation: "Zwangendaba's Ngoni raided the Rozvi lands and crossed the Zambezi in 1835.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **correctly** describes the view of the Mfecane put forward by Julian Cobbing and others?",
    options: [
      ["Slave and labour raiding caused much of the disruption", "Correct: they argued Delagoa Bay slave-raiding and Cape labour raids were major causes, and that Shaka's role was exaggerated."],
      ["Shaka alone caused all the wars and migrations of the period", "That is the older view that Cobbing challenged."],
      ["The Mfecane never happened and was invented by missionaries", "Cobbing questioned its causes and interpretation, not that upheaval occurred."],
      ["Drought was the only cause, and no state played any part", "No historian argues for a single cause of this kind."],
    ],
    answer: "A",
    hints: ["The question asks what the view SAYS, not whether it is right."],
    explanation: "This revisionist view is debated: critics point out that evidence for large-scale slave-trading from Delagoa Bay before the 1820s is weak.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which of these is a **constructive** (state-building) effect of the Mfecane?",
    options: [
      ["Moshoeshoe gathered refugees into the Sotho kingdom", "Correct: new, larger states were created and protected people."],
      ["Large areas were left thinly populated for a time", "This was a destructive effect, later used by settlers to claim land."],
      ["Crops and herds were destroyed, causing famine", "This was a destructive effect."],
      ["The Rozvi state collapsed under Nguni attacks", "The collapse of an existing state was destructive."],
    ],
    answer: "A",
    hints: ["Constructive means building something new."],
    explanation: "New kingdoms (Zulu, Swazi, Sotho, Gaza, Ndebele) were constructive effects; depopulation, famine and the collapse of older states were destructive.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Shaka was assassinated by his half-brothers, including Dingane, in 1828.",
    answer: true,
    explanation: "True. Dingane and Mhlangana killed Shaka in 1828; Dingane became king.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Historians all agree that Shaka's wars were the only cause of the Mfecane.",
    answer: false,
    explanation: "False. The causes are debated: land pressure, drought, trade at Delagoa Bay, rival states and possibly slave and labour raiding are all argued.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with the state or group they led.",
    pairs: [
      ["Soshangane", "Gaza kingdom"],
      ["Moshoeshoe", "Sotho kingdom"],
      ["Sobhuza", "Swazi (Ngwane) kingdom"],
      ["Zwide", "Ndwandwe"],
    ],
    explanation: "The Mfecane period produced several new states: Gaza (Soshangane), Sotho (Moshoeshoe), Swazi (Sobhuza); Zwide led the Ndwandwe, Shaka's main rival.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each military reform of Shaka with what it achieved.",
    pairs: [
      ["Age regiments in royal homesteads", "Loyalty to the king rather than to clan chiefs"],
      ["Short stabbing spear and large shield", "Decisive close combat"],
      ["Cow-horn formation", "Surrounding and destroying the enemy"],
      ["Incorporating defeated peoples", "A larger army and state"],
    ],
    explanation: "Each reform had a purpose: loyalty (regiments), effective combat (iklwa), tactics (cow-horn), growth (incorporation).",
  });
  {
    const t = timeline([
      ["c. 1816", "Shaka becomes chief of the Zulu"],
      ["c. 1817-1818", "Dingiswayo is killed by Zwide"],
      ["1828", "Shaka is assassinated"],
      ["1879", "Britain defeats the Zulu kingdom at Ulundi"],
    ]);
    const order = [2, 0, 3, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["Shaka rose with Dingiswayo's support, so he became chief before Dingiswayo died."],
      explanation: "Shaka became chief (c. 1816), Dingiswayo was killed (c. 1817-1818), Shaka was assassinated (1828), the British won at Ulundi (1879).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Young men of the same age served together in {{blank:a}}. The king's senior officials and commanders were called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["amabutho"], choices: ["amabutho", "prazos", "mhondoro", "feiras"] },
      { id: "b", accepted: ["izinduna"], choices: ["izinduna", "prazeros", "vashambadzi", "svikiro"] },
    ],
    explanation: "Amabutho = age regiments; izinduna = officials and commanders appointed by the king.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Sotho-Tswana name for the Mfecane?",
    accepted: ["Difaqane", "Lifaqane", "Difaqane/Lifaqane"],
    wrong: ["Mfecane", "Chimurenga"],
    explanation: "The Sotho-Tswana call it **Difaqane** (also Lifaqane).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Outline **five** causes of the Mfecane.",
    points: [
      "Population growth and land pressure",
      "Drought and famine (Madlathule)",
      "Competition for trade at Delagoa Bay",
      "The rise of strong rival states (Mthethwa, Ndwandwe, Ngwane)",
      "Shaka's military expansion / slave and labour raiding (debated)",
    ],
    hints: ["Think of environmental, economic and political causes."],
    modelAnswer: "The population of the region grew, so good land became scarce. A severe drought and famine (Madlathule) increased competition for food and land. Rulers competed to control the ivory and cattle trade with Delagoa Bay. Strong rival states, the Mthethwa, Ndwandwe and Ngwane, fought for land and power. Shaka's military expansion drove other groups away, although some historians argue that slave and labour raiding was also a major cause.",
    explanation: "One mark per cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the political and economic organisation of the Zulu state.",
    points: [
      "Political: the king was supreme commander, judge and lawmaker",
      "Political: izinduna appointed to command regiments and govern areas, replacing many hereditary chiefs",
      "Political: defeated chiefdoms incorporated; royal homesteads as centres of power",
      "Economic: cattle as wealth; the king controlled large herds from raids and tribute",
      "Economic: the king redistributed cattle to reward loyalty",
      "Economic: agriculture by women; royal control of trade with Delagoa Bay and Port Natal",
    ],
    hints: ["Three political points and three economic points."],
    modelAnswer: "The king was supreme commander, judge and lawmaker. He appointed izinduna to command regiments and govern areas, replacing many hereditary chiefs, and defeated chiefdoms were incorporated into the state. Economically, cattle were the main wealth; the king controlled huge herds from raids and tribute and gave cattle to reward loyal subjects. Women grew crops such as sorghum and millet, and the king controlled the trade in ivory and cattle with Delagoa Bay and later Port Natal.",
    explanation: "Three marks per area.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the effects of the Mfecane on the area that is now Zimbabwe.",
    points: [
      ["Nguni groups (Zwangendaba, Nxaba, Nyamazana) raided the Rozvi lands in the 1830s, bringing about the collapse of the Rozvi state", 2],
      ["Soshangane's Gaza kingdom dominated the south-east, raiding and demanding tribute", 2],
      ["The Ndebele under Mzilikazi settled in the south-west (about 1838-1840), incorporating many Shona communities and creating a new state", 2],
    ],
    hints: ["Think about the south-west, the south-east and the Rozvi."],
    modelAnswer: "In the 1830s Nguni groups led by Zwangendaba, Nxaba and Nyamazana crossed Zimbabwe and raided the Rozvi lands; the Rozvi state, already weakened, collapsed, and tradition says the last Changamire died at this time. In the south-east, Soshangane's Gaza kingdom raided and demanded tribute. Finally, Mzilikazi's Ndebele settled in the south-west in about 1838-1840, incorporating many Shona people and creating a powerful new state.",
    explanation: "Each effect needs to be explained, not just named.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "a passage from a fictional settler history of Natal, published in the 1890s",
          "When our people arrived, the land was empty. Shaka's armies had killed or driven away every tribe, and the country lay waiting for those who would farm it."),
        source("Source B", "a summary by a fictional historian writing in the 1990s",
          "The upheavals had many causes, among them land shortage, drought, competition for trade at Delagoa Bay and the rise of rival states. Some areas were thinly populated for a time, but people returned, and the claim of an 'empty land' served settlers who wanted it."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A claim about the land and its people?", points: ["The land was empty when settlers arrived", "Because Shaka's armies had killed or driven away the people"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B disagree with Source A?", points: ["B disagrees that Shaka alone caused the upheaval: it lists land, drought, trade and rival states", "B says areas were only thinly populated for a time and people returned, not empty", "B says the 'empty land' claim served settlers (challenging A's purpose)", "Some agreement: both accept that some areas lost population"] }),
      P.manual({ label: "(c)", marks: 6, stem: "Why do the two sources give different interpretations of the Mfecane?", type: "EXTENDED_RESPONSE", points: [["A was written by a settler in the 1890s, when the 'empty land' idea justified settler land claims", 2], ["B was written a century later by a historian using wider evidence and aware of the debate", 2], ["Judgement: purpose and context explain the difference; B is more balanced but is still one interpretation", 2]], levels: levels(6), modelAnswer: "Source A was written by a settler in the 1890s. Settlers had taken land in Natal, and claiming that Shaka had emptied it made their occupation seem fair, so A blames Shaka alone and calls the land empty. Source B was written by a historian in the 1990s who had more evidence and knew of the debate about the Mfecane, so it lists several causes and points out that people returned. The difference comes from purpose and context: A justifies settlement, while B tries to explain. B is more balanced, but it is still one interpretation in a continuing debate." }),
    ],
    hints: ["Who would benefit from the claim that the land was empty?"],
    explanation: "Interpretations differ because of their authors' context and purpose; the 'empty land' idea served settler land claims.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about Shaka and the Zulu state.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "State **four** of Shaka's military reforms.", points: ["Age regiments (amabutho) in royal homesteads", "The short stabbing spear (iklwa) and large shield", "The cow-horn formation", "Strict discipline / delayed marriage / a standing army / incorporation of defeated peoples"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why Shaka was assassinated.", points: [["Harsh rule and constant wars made him unpopular with warriors and subjects", 2], ["Extreme demands after his mother Nandi's death / ambition of his half-brothers Dingane and Mhlangana", 2]] }),
      P.manual({ label: "(c)", marks: 8, stem: "\"Shaka's military reforms were the main reason for the rise of the Zulu state.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: regiments, iklwa, cow-horn formation and discipline gave decisive victories (e.g. over the Ndwandwe)", 2], ["For (developed): the standing army and incorporation grew the state", 2], ["Against: Dingiswayo's earlier regiments and confederacy, land pressure and trade, Shaka's leadership and political organisation also mattered", 2], ["Supported judgement", 2]], levels: levels(8), modelAnswer: "Shaka's reforms were very important. Age regiments housed in royal homesteads made warriors loyal to him; the iklwa and large shield made close combat decisive; and the cow-horn formation let his armies surround the enemy, as in the defeat of the Ndwandwe in 1818-1819. A standing army and the incorporation of defeated peoples allowed the state to grow quickly. However, Shaka built on Dingiswayo's age regiments and Mthethwa confederacy, and wider conditions, such as land pressure and the value of trade at Delagoa Bay, encouraged state-building. His political methods, appointing izinduna and controlling cattle, also held the state together. The reforms were the main reason for military success, but the state rose through a combination of military, political and economic factors." }),
    ],
    hints: ["In (c), remember what Dingiswayo had already done."],
    explanation: "A strong answer recognises Shaka's reforms while weighing Dingiswayo's legacy, political organisation and wider conditions.",
  });

  b.card("DEFINITION", "What was the **Mfecane**?", "A period of wars, state-building and migration in southern Africa, about the 1810s-1830s ('the crushing'); Difaqane in Sotho-Tswana.");
  b.card("DEFINITION", "What were **amabutho**?", "Age regiments of young men who served the king together.");
  b.card("DEFINITION", "What was the **iklwa**?", "Shaka's short stabbing spear, used in close combat.");
  b.card("CONCEPT", "Describe the cow-horn formation.", "Chest attacked head-on; horns encircled from the sides; loins waited in reserve.");
  b.card("FACT", "Who led the Mthethwa and helped Shaka rise?", "Dingiswayo (killed by Zwide of the Ndwandwe in about 1817-1818).");
  b.card("FACT", "When and by whom was Shaka assassinated?", "1828, by his half-brothers Dingane and Mhlangana.");
  b.card("CONCEPT", "Causes of the Mfecane (debated)?", "Land pressure, drought (Madlathule), trade at Delagoa Bay, rival states, Shaka's expansion, possibly slave and labour raiding.");
  b.card("FACT", "Which Nguni leader crossed the Zambezi in 1835?", "Zwangendaba (the Ngoni).");
  b.card("CONCEPT", "New states formed in the Mfecane period?", "Zulu, Swazi, Sotho, Gaza and Ndebele.");
  b.card("FACT", "What was the umkhosi?", "The Zulu first-fruits ceremony, led by the king.");
});
