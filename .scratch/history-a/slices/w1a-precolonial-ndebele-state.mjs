// W1a: ahist.precolonial.ndebele-state (ZIMSEC topic 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.ndebele-state", { file: "precolonial/ndebele-state", keyPrefix: "precolonial.ndebele-state" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the Ndebele from the Zulu kingdom and across the Limpopo?",
    options: [
      ["Mzilikazi kaMashobane", "Correct: a Khumalo chief who had served under Shaka."],
      ["Lobengula kaMzilikazi", "Lobengula succeeded his father in 1870."],
      ["Soshangane kaZikode", "Soshangane founded the Gaza state."],
      ["Dingiswayo kaJobe", "Dingiswayo led the Mthethwa confederacy before Shaka."],
    ],
    answer: "A",
    explanation: "Mzilikazi, chief of the Khumalo, broke away from Shaka and led his people north.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was an **ibutho** (plural amabutho) in the Ndebele state?",
    options: [
      ["A regiment of young men serving the king", "Correct: age regiments were the basis of the army and the state."],
      ["A council of royal wives at the capital", "The king's wives were not organised as regiments."],
      ["A shrine to the ancestors in the Matobo Hills", "Shrines belonged to the Mwari cult."],
      ["A tax collected on cattle at river crossings", "Tribute was collected by officers, not by a tax of this name."],
    ],
    answer: "A",
    explanation: "An ibutho was an age regiment. Regiments fought, herded cattle and collected tribute for the king.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which group formed the lowest rank in Ndebele society?",
    options: [
      ["The Holi, mainly local Shona people", "Correct: the Holi were incorporated after settlement in Zimbabwe."],
      ["The Zansi, the original Khumalo Nguni", "The Zansi were the highest rank."],
      ["The Enhla, absorbed in the Transvaal", "The Enhla held a middle rank."],
      ["The izinduna, the senior officers of the king", "The izinduna were officials, mostly of high rank."],
    ],
    answer: "A",
    explanation: "Zansi (original Nguni) held the highest rank, the Enhla (absorbed in the Transvaal) came next and the Holi (local people) had the lowest rank, though status could rise.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Ndebele cross the Limpopo into present-day Zimbabwe in the late 1830s?",
    options: [
      ["They were attacked by Boers and the Zulu in the Transvaal", "Correct: defeat in the Transvaal drove them north."],
      ["They had been invited by the Rozvi Mambo to rule the plateau", "The Ndebele invaded; they were not invited."],
      ["They were sent by the British to protect the gold fields", "The British were not in the region at this time."],
      ["They were seeking the ruins of Great Zimbabwe for its wealth", "There is no evidence for this."],
    ],
    answer: "A",
    hints: ["Who attacked the Ndebele in 1836-37?"],
    explanation: "Boer trekkers and Zulu forces defeated the Ndebele in the Transvaal, which led Mzilikazi to move north of the Limpopo.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the Ndebele state obtain much of its cattle and grain from its Shona neighbours?",
    options: [
      ["Through raiding and tribute collected by the regiments", "Correct: regiments enforced the payment of tribute."],
      ["Through selling goods in a market run by the British", "The state did not depend on a market of this kind."],
      ["Through payments made by missionaries for land", "Missionaries paid little and did not buy land at this time."],
      ["Through trade in cattle for guns at the Portuguese fairs", "The Portuguese fairs had ended long before."],
    ],
    answer: "A",
    hints: ["Remember what the regiments did besides fight."],
    explanation: "Raiding and tribute were central to the Ndebele economy, with regiments collecting cattle and grain from Shona communities.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best describes the Rudd Concession of 30 October 1888?",
    options: [
      ["It gave Rudd's partners exclusive mineral rights for money, guns and a boat", "Correct: Lobengula later said he had been misled about its meaning."],
      ["It handed all the land of Matabeleland over to Queen Victoria for ever", "The concession was about mineral rights, not a cession of all land."],
      ["It ended a long war between Lobengula and the Boers of the Transvaal", "No such war was ended by the concession."],
      ["It made Lobengula a loyal vassal of the Portuguese Crown at the coast", "The Portuguese were not parties to it."],
    ],
    answer: "A",
    hints: ["Remember the three payments in the English text."],
    explanation: "The concession gave exclusive rights to minerals in Lobengula's territory in return for money, rifles and a steamboat, and its meaning was disputed.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which factor most clearly shows the **external** pressure on the Ndebele state in the late 1880s?",
    options: [
      ["Treaties and concessions sought by Boers and British", "Correct: outsiders sought to control his lands and dealings."],
      ["A dispute about who should succeed Mzilikazi", "This was an internal matter and was settled by 1870."],
      ["Resentment of tribute among the Shona subjects", "This was an internal weakness."],
      ["Disagreement between young regiments and older leaders", "This was an internal division."],
    ],
    answer: "A",
    hints: ["Which factor came from outside Matabeleland?"],
    explanation: "Treaties (Grobler 1887, Moffat 1888) and the concession hunters were external pressures. The others are internal weaknesses.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lobengula became king of the Ndebele in 1870.",
    answer: true,
    explanation: "True. Mzilikazi died in 1868 and Lobengula was installed in 1870 after a period of uncertainty.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Ndebele state incorporated Sotho, Tswana and Shona people into its society.",
    answer: true,
    explanation: "True. Absorbing conquered peoples increased the manpower of the state.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Lobengula wanted war with the British and was held back by his council.",
    answer: false,
    hints: ["Who in the army wanted war, and what did Lobengula himself try to do?"],
    explanation: "False. Young regiments tended to want war, but Lobengula tried to avoid war with a powerful opponent and to balance concession seekers against each other.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Ndebele term with its meaning.",
    pairs: [
      ["Inkosi", "The king"],
      ["Induna", "A senior officer or councillor"],
      ["Ibutho", "An age regiment"],
      ["Holi", "Local Shona people absorbed into the state"],
    ],
    explanation: "These terms describe the political, military and social organisation.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each pressure on the Ndebele state with its type.",
    pairs: ["The succession dispute after Mzilikazi's death", "Resentment of tribute by Shona subjects", "The Rudd Concession of 1888", "The arrival of the Pioneer Column in 1890"],
    right: ["Internal", "External"],
    rightIndex: [0, 0, 1, 1],
    hints: ["Did the pressure come from within the state or from outside it?"],
    explanation: "The first two were internal weaknesses; the concession and the Pioneer Column were external pressures.",
  });
  {
    const events = [
      "Mzilikazi breaks away from Shaka",
      "The Ndebele cross the Limpopo into present-day Zimbabwe",
      "Lobengula becomes king",
      "The Rudd Concession is signed",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Remember the dates: 1820s, 1837-39, 1870, 1888."],
      explanation: "1820s, 1837-1839, 1870, 1888.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mzilikazi was the chief of the {{blank:a}} clan, and the highest rank in Ndebele society was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Khumalo"], choices: ["Khumalo", "Mthethwa", "Ngwane", "Ndwandwe"] },
      { id: "b", accepted: ["Zansi"], choices: ["Zansi", "Enhla", "Holi", "Rozvi"] },
    ],
    explanation: "Mzilikazi led the Khumalo; the Zansi were the original Nguni at the top of society.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the son of Mzilikazi who became king of the Ndebele in 1870.",
    accepted: ["Lobengula", "Lobhengula"],
    wrong: ["Mzilikazi"],
    explanation: "**Lobengula** (also spelled Lobhengula).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the military organisation of the Ndebele state.",
    points: ["Young men were enrolled in age regiments (amabutho)", "Regiments lived in military towns around the royal capital", "Regiments raided neighbours for cattle and collected tribute", "Regiments defended the state and were rewarded by the king"],
    modelAnswer: "Young men from all groups were enrolled in age regiments called amabutho, which lived in military towns around the royal capital. They raided neighbours for cattle, collected tribute from the Shona and defended the state, and successful regiments were rewarded with cattle by the king.",
    explanation: "One mark for each feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Ndebele turned a refugee group into a united state.",
    points: [["Young men of different origins served in the same regiments under the king, so loyalty to the king replaced old loyalties", 2], ["Conquered peoples were incorporated, increasing manpower and giving them a place in the state; intermarriage blurred divisions", 2]],
    hints: ["Think of the regiments and of incorporation."],
    modelAnswer: "Young men of different origins were enrolled in the same regiments under the king's officers, so loyalty to the king replaced older loyalties of clan. Conquered Sotho, Tswana and Shona people were incorporated into the state, which increased its manpower, and intermarriage and service blurred the divisions between groups.",
    explanation: "One mark for each point and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** internal weaknesses of the Ndebele state in the 1880s.",
    points: [["Disagreement between young regiments who wanted war and older leaders and Lobengula who wished to avoid it weakened the response", 2], ["Resentment of tribute and raiding among the Shona subjects, who might not support the Ndebele against a stronger power", 2]],
    hints: ["Think of the army and of the subject peoples."],
    modelAnswer: "The army was divided: young regiments wanted war, while older leaders and Lobengula wished to avoid it, so the state could not respond with one voice. The Shona subjects also resented tribute and raiding and might not support the Ndebele against a stronger power.",
    explanation: "One mark for each weakness and one for the explanation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was the Ndebele state weakened more by external than by internal pressures by 1890?",
    levels: levels(6),
    points: [["External: Grobler and Moffat treaties, concession hunters, Rudd Concession, Royal Charter and the Pioneer Column placed the kingdom under growing pressure", 2], ["Internal: divisions in the army, resentful tributaries and succession tensions weakened it", 2], ["Judgement: external pressure was the greater, but internal divisions weakened the response", 2]],
    hints: ["List external pressures, then internal ones, then decide which mattered more."],
    modelAnswer: "External pressures were the greater. The Grobler and Moffat treaties limited Lobengula's freedom, concession seekers crowded his court, the Rudd Concession gave Rudd's partners mineral rights, and the Royal Charter and the Pioneer Column placed an armed company beside his borders. Internal weaknesses also mattered: the army was divided over war, the Shona subjects resented tribute, and succession had been disputed. However, these would not have been decisive without the outside pressure, so I conclude that external pressure was the main cause and the internal divisions weakened the response.",
    explanation: "Credit both sets of pressures and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter written by a fictional European trader at Bulawayo, 1880s",
        "The king sits in the cattle kraal each day to hear cases. The great men stand about him, and the regiments camp on the plain. He is obeyed by all. He asks about everything the white men bring and trusts none of us completely."),
      "",
      source("Source B", "an account by a fictional Ndebele elder, recorded in the 1950s",
        "The young men wanted to fight. The old men said, 'Look at their guns.' The king knew the whites were many and he asked himself how long the nation could stand if there were war."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the king's authority?", points: ["He hears cases and is obeyed by all", "He is surrounded by senior men and the regiments"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How do Sources A and B show different aspects of the king's position in the 1880s?", points: [["A: strong authority at court, but the king is cautious and distrustful of foreigners", 2], ["B: the nation is divided about war and the king weighs the strength of the whites", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source is more useful for explaining why the Ndebele state fell? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["B is more useful: shows the division between young and old men and the king's awareness of white strength, which links to the causes of fall", 2], ["A is useful for the king's authority and caution, but is an outsider's view and silent on the causes", 2], ["Own knowledge: concessions, Rudd Concession, army divisions, guns of the BSAC; both sources recorded from particular viewpoints and need checking", 2]], modelAnswer: "Source B is more useful for explaining the fall of the state because it shows the division between the young men who wanted to fight and the older men who counselled caution, and it shows the king's awareness that the whites were many and had guns. This matches what I know of the divisions in the army and the power of the Company's weapons. Source A shows the king's authority and his caution towards foreigners, which is useful background, but it was written by a trader who saw only the court and says nothing about the causes of the fall. Source B was recorded decades later and may have been shaped by hindsight, so both need to be checked against other evidence." }),
    ],
    hints: ["For (c), decide which source speaks directly about the causes of fall."],
    explanation: "Both sources are invented. A is an outsider's letter and B an oral tradition.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the regimental system (amabutho) to the success of the Ndebele state.",
    levels: levels(8),
    points: [
      ["Military: regiments defended the state, raided and enforced tribute", 2],
      ["Political and social: unified Zansi, Enhla and Holi under loyalty to the king", 2],
      ["Economic: raiding and tribute produced cattle and grain which the king redistributed", 2],
      ["Judgement: important, but dependent on the king, raiding and cattle; other factors (incorporation, leadership, Rozvi weakness) also mattered", 2],
    ],
    hints: ["Consider military, political and economic roles, then other causes of success."],
    modelAnswer: "The regimental system was central to the success of the Ndebele state. Militarily the regiments defended the kingdom, raided neighbours and enforced tribute. Politically they united young men of Zansi, Enhla and Holi origin in loyalty to the king. Economically they brought in cattle and grain which the king could reward his followers with. However, the system depended on a strong king, on continued raiding and on cattle, and other factors also mattered, including the incorporation of conquered peoples, the leadership of Mzilikazi and the weakness of the Rozvi. The regiments were therefore a key reason for success, but not the only one.",
    explanation: "Credit explained roles and a supported judgement.",
  });

  b.card("DEFINITION", "What was an ibutho (plural amabutho)?", "An Ndebele age regiment of young men who served the king as warriors, herders and tribute collectors.");
  b.card("DEFINITION", "Who were the Zansi, Enhla and Holi?", "The three ranks of Ndebele society: the original Khumalo Nguni, the people absorbed in the Transvaal, and the local people absorbed in Zimbabwe.");
  b.card("DEFINITION", "What is incorporation?", "The absorption of conquered peoples into a state, giving them a place in its society and increasing its manpower.");
  b.card("FACT", "Who led the Ndebele from the Zulu kingdom?", "Mzilikazi kaMashobane, chief of the Khumalo.");
  b.card("FACT", "When did Lobengula become king?", "1870, two years after Mzilikazi's death in 1868.");
  b.card("FACT", "What was signed on 30 October 1888?", "The Rudd Concession, giving Rudd's partners exclusive mineral rights in Lobengula's territory.");
  b.card("CONCEPT", "How did the regiments help to hold the Ndebele state together?", "Young men of all groups served together under the king, which replaced old loyalties with loyalty to him, and regiments brought in cattle and tribute.");
  b.card("CONCEPT", "Name two internal weaknesses of the Ndebele state.", "Divisions in the army over war and resentment among Shona tributaries (also succession tensions).");
  b.card("CONCEPT", "Why did the Ndebele cross the Limpopo?", "They were attacked by Boers and the Zulu in the Transvaal in 1836-37.");
});
