// W2a: ahist.liberation.nationalist-parties (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.liberation.nationalist-parties", { file: "liberation/nationalist-parties", keyPrefix: "liberation.nationalist-parties" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which party was formed in 1960 after Congress was banned in 1959?",
    options: [
      ["The National Democratic Party", "Correct: the NDP was formed on 1 January 1960."],
      ["The Zimbabwe African National Union", "ZANU was formed in 1963."],
      ["The Rhodesian Front", "The Rhodesian Front was the white settler party."],
      ["The Pearce Commission", "The Commission was a British inquiry of 1972."],
    ],
    answer: "A",
    explanation: "The National Democratic Party was formed on 1 January 1960 to replace the banned Congress.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the first president of ZANU when it was formed in 1963?",
    options: [
      ["Ndabaningi Sithole", "Correct: he led ZANU until the 1970s."],
      ["Joshua Nkomo", "Nkomo led ZAPU."],
      ["Josiah Tongogara", "Tongogara was the ZANLA commander."],
      ["Abel Tendekayi Muzorewa", "Muzorewa led the ANC of the 1970s."],
    ],
    answer: "A",
    explanation: "The Rev. Ndabaningi Sithole was elected president of ZANU in 1963; Robert Mugabe was secretary-general.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happened to the NDP in December 1961?",
    options: [
      ["The government banned it and its leaders formed ZAPU", "Correct: ZAPU was formed on 17 December 1961."],
      ["Its members merged with the Rhodesian Front in a coalition", "The NDP never joined the Rhodesian Front."],
      ["It won a majority of seats in a general election that month", "Africans did not win a majority."],
      ["It voluntarily dissolved after the end of the Federation", "The Federation ended in 1963."],
    ],
    answer: "A",
    explanation: "The NDP was banned in December 1961, and ZAPU was formed within days under Nkomo.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What were the armed wings of ZAPU and ZANU called?",
    options: [
      ["ZIPRA and ZANLA", "Correct: ZIPRA for ZAPU, ZANLA for ZANU."],
      ["ZANLA and ZIPRA, respectively", "These are reversed: ZIPRA belonged to ZAPU."],
      ["RAR and the Selous Scouts", "These were Rhodesian government forces."],
      ["FRELIMO and the MPLA", "These were Mozambican and Angolan movements."],
    ],
    answer: "A",
    explanation: "ZAPU's army was ZIPRA (Zimbabwe People's Revolutionary Army) and ZANU's was ZANLA (Zimbabwe African National Liberation Army).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best describes the 1961 constitution proposals as the nationalists saw them?",
    options: [
      ["They gave Africans only a small number of seats and no guaranteed majority", "Correct: 15 of 65 seats under a two-roll system."],
      ["They gave Africans a clear majority in parliament within one year", "They gave no guaranteed majority."],
      ["They abolished all racial restrictions on land ownership immediately", "Land restrictions remained."],
      ["They were drawn up by the nationalists themselves in Dar es Salaam", "They were negotiated in Salisbury with Britain."],
    ],
    answer: "A",
    hints: ["Remember the A and B rolls."],
    explanation: "The 1961 constitution provided 15 seats out of 65 for the B roll, mostly African, with no guaranteed majority; the nationalists rejected it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a cause of the split that created ZANU in 1963?",
    options: [
      ["Disagreement over Nkomo's leadership and the strategy of the movement", "Correct: critics wanted a more determined line."],
      ["A British order to form two separate African parties after banning", "Britain gave no such order."],
      ["The end of the Federation, which removed the need for a single party", "The Federation had not yet ended."],
      ["A vote of the white electorate to split the African leadership", "Whites played no such role."],
    ],
    answer: "A",
    hints: ["Think of the leaders' criticisms of Nkomo."],
    explanation: "Critics, including Sithole, Mugabe and Takawira, differed with Nkomo over leadership and strategy; personal and regional rivalries also played a part.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which effect of the bans of 1964 and the detention of leaders was most important for the later war?",
    options: [
      ["Open political activity became impossible, so leaders moved abroad and prepared guerrilla war", "Correct: the peaceful route seemed closed."],
      ["The nationalists agreed to merge with the Rhodesian Front and to join a coalition government", "No such merger occurred."],
      ["The Federation was restored by Britain and gave Africans a majority in the federal parliament", "The Federation had ended."],
      ["Britain withdrew from Southern Rhodesia and gave full independence to the African majority at once", "Britain did not do this."],
    ],
    answer: "A",
    hints: ["Think about what remained when the parties were banned."],
    explanation: "With parties banned and leaders detained, activity moved abroad, mainly to Zambia and Tanzania, and the nationalists began to train guerrillas.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the split of 1963 is best supported by historians?",
    options: [
      ["Several causes combined, including strategy, leadership and personal rivalry", "Correct: historians stress a mix of causes."],
      ["Ethnic differences alone were the single cause of the split between the two parties", "Historians do not accept a single cause."],
      ["The Rhodesian government caused the split by an order of the High Court in Salisbury", "No such order was made."],
      ["The split was planned in advance by the British High Commissioner in Salisbury and Zambia", "No such plan existed."],
    ],
    answer: "A",
    hints: ["Remember that historians disagree about weight, not about the list of causes."],
    explanation: "Historians agree that several factors operated, and disagree about how much weight each deserves.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "ZAPU was formed in 1961 under the leadership of Joshua Nkomo.", answer: true,
    explanation: "ZAPU was formed on 17 December 1961 after the NDP was banned.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "ZANU and the People's Caretaker Council were both banned in August 1964.", answer: true,
    explanation: "The Rhodesian Front government banned both parties and detained their leaders in August 1964.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Historians agree that ethnic division was the only cause of the split between ZAPU and ZANU.", answer: false,
    hints: ["Think of leadership, strategy and rivalry."],
    explanation: "Historians point to several causes and disagree about weight; they do not accept a single cause.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each party or body to its description.",
    pairs: [
      ["NDP", "Formed on 1 January 1960; banned in December 1961"],
      ["ZAPU", "Formed in December 1961 under Joshua Nkomo"],
      ["ZANU", "Formed in 1963 under the Rev. Ndabaningi Sithole"],
      ["People's Caretaker Council", "Formed in 1962 after ZAPU was banned"],
    ],
    explanation: "These bodies appear in the order NDP, ZAPU/PCC, ZANU.",
  });
  {
    const events = [
      "Congress is banned and a state of emergency is declared",
      "ZAPU is formed after the NDP is banned",
      "ZANU is formed",
      "ZANU and the PCC are banned and leaders detained",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1959, 1961, 1963 and 1964."],
      explanation: "February 1959; December 1961; August 1963; August 1964.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} was banned in 1959, and the National Democratic Party was formed in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Congress"], choices: ["Congress", "ZANU", "ZAPU", "Rhodesian Front"] },
      { id: "b", accepted: ["1960"], choices: ["1960", "1957", "1963", "1965"] },
    ],
    explanation: "Congress was banned in February 1959; the NDP was formed on 1 January 1960.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Who was president of ZAPU when it was formed in 1961?",
    accepted: ["Joshua Nkomo", "Nkomo", "Joshua Mqabuko Nyongolo Nkomo"],
    wrong: ["Sithole"],
    explanation: "**Joshua Nkomo**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the policies of the nationalist parties between 1960 and 1964.",
    points: ["Majority rule, summed up as one man, one vote", "An end to racial discrimination", "A fairer share of the land", "Opposition to the 1961 constitution and to the Federation, using rallies and protest"],
    modelAnswer: "The parties demanded majority rule, or one man, one vote, and an end to racial discrimination. They wanted a fairer share of the land. They opposed the 1961 constitution and the Federation, using rallies, protests and petitions.",
    explanation: "One mark for each policy described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the nationalist movement split in 1963.",
    points: [["Some leaders criticised Nkomo's leadership and strategy and wanted a more determined line", 2], ["Personal and regional rivalries sharpened the quarrel, and the strain of bans and detention increased disagreement", 2]],
    hints: ["Give the disagreement over strategy and one other reason."],
    modelAnswer: "Some leaders, such as Sithole and Mugabe, criticised Nkomo's leadership and strategy and wanted a more determined line. Personal and regional rivalries sharpened the quarrel, and the strain of bans and detention made it worse.",
    explanation: "Credit explained causes; historians differ on weight.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the actions of the Rhodesian government pushed the nationalists towards armed struggle.",
    points: [["It banned each party in turn (1959, 1961, 1962 and 1964) and detained their leaders", 2], ["It refused to negotiate majority rule, so peaceful methods seemed to have failed", 2]],
    hints: ["Think of bans and of negotiations."],
    modelAnswer: "The government banned each party in turn and detained the leaders, so open political activity inside the country became impossible. It also refused to negotiate majority rule, so peaceful methods seemed to have failed and many nationalists turned to armed struggle.",
    explanation: "Credit developed reasoning.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a statement by a fictional nationalist speaker at a rally, 1961",
        "The government says that we may have fifteen seats in sixty-five. We say that a people cannot be a minority in its own country. We shall have one man, one vote, and we shall have the land that was taken from our fathers."),
      "",
      source("Source B", "a report by a fictional Rhodesian security officer, 1964",
        "The two African parties are rivals, and their followers fight in the townships. The banning of both and the detention of their leaders will remove the threat of disorder for the present. We expect the extremists to leave for training abroad."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say the nationalists wanted?", points: ["One man, one vote / majority rule", "The return of the land taken from their fathers"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How do the aims of the writers of Source A and Source B differ?", points: ["A seeks majority rule and land for Africans", "B seeks to remove disorder and the nationalist threat by banning the parties"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources as evidence of the nationalist movement in the early 1960s?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is a nationalist speech at the time, showing demands, though speeches use strong language for a crowd", 1], ["B is a security report that shows the government's view, rivalries between parties and its expectation, but is hostile to the nationalists", 1], ["Own knowledge: the 1961 constitution gave 15 of 65 seats; rivalry and violence occurred in 1963-64; leaders did go abroad", 1], ["Judgement: together they show the movement's demands and the government's response", 1]], modelAnswer: "Source A is useful because it shows the demands for majority rule and land and the rejection of the 15 seats of the 1961 constitution, though a speech to a crowd uses strong language. Source B is a security officer's report which shows the rivalry between the parties and the government's plan to ban them, but it is hostile to the nationalists and calls them extremists. My own knowledge confirms the seat numbers, the violence between supporters in 1963-64 and the departure of leaders for training. Together they show both the movement's demands and the government's response." }),
    ],
    hints: ["For (c), consider the purpose of each source."],
    explanation: "Both sources are invented: a rally speech and a security report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the split of 1963 the main reason why the nationalists turned to armed struggle?",
    levels: levels(12),
    points: [
      ["The split: rivalry and violence weakened the movement and gave the government an excuse for repression", 3],
      ["Repression: successive bans (1959, 1961, 1962, 1964) and detention of leaders closed legal politics", 3],
      ["Government refusal to negotiate under the Rhodesian Front and the failure of constitutional methods", 2],
      ["Wider context: decolonisation elsewhere and support from African states and the Soviet Union and China", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh the split against repression and the failure of constitutional methods."],
    modelAnswer: "The split of 1963 was one reason for the turn to armed struggle, but not the main one. It weakened the movement, led to violence in the townships and allowed the government to justify repression. However, the greater cause was repression itself: Congress, the NDP, ZAPU and finally ZANU and the PCC were banned in turn, and the leaders were detained. The Rhodesian Front government under Ian Smith refused to negotiate majority rule, so constitutional methods seemed to have failed. The success of independence movements elsewhere in Africa and the promise of help from Tanzania, Zambia and the communist states made armed struggle possible. I conclude that repression and the refusal to negotiate were the main reasons, with the split an aggravating factor.",
    explanation: "Credit explained factors and a judgement that weighs the split against repression.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of Joshua Nkomo in the development of African nationalism in Southern Rhodesia up to 1964.",
    levels: levels(8),
    points: [
      ["Leader of Congress (1957), the NDP (president 1960) and ZAPU (1961): a national figure", 2],
      ["Mass support and the organisation of rallies and protest; diplomacy abroad", 2],
      ["Criticism: caution in 1961 and leadership style, which contributed to the split of 1963", 2],
      ["Judgement on his importance", 2],
    ],
    hints: ["Give his achievements and the criticisms made of him."],
    modelAnswer: "Joshua Nkomo was the most important leader of African nationalism up to 1964. He led Congress, the NDP and ZAPU, gave the movement national leadership and won mass support through rallies and protest, and he took the case abroad. But his handling of the 1961 constitution and his leadership style were criticised, and they contributed to the split of 1963. I conclude that he was central to building the movement, even if disagreements over his leadership were one cause of its division.",
    explanation: "Credit achievements, criticisms and a judgement.",
  });

  b.card("DEFINITION", "What is detention?", "Imprisonment without trial, used by the Rhodesian government to remove nationalist leaders.");
  b.card("DEFINITION", "What did the nationalist slogan 'one man, one vote' mean?", "Majority rule: every adult would have an equal vote, giving power to the African majority.");
  b.card("FACT", "What happened to Congress in February 1959?", "It was banned; a state of emergency was declared and about 500 people were detained.");
  b.card("FACT", "When were the NDP and ZAPU formed?", "The NDP on 1 January 1960; ZAPU on 17 December 1961 after the NDP was banned.");
  b.card("FACT", "When was ZANU formed and who led it?", "August 1963; the Rev. Ndabaningi Sithole was president, with Robert Mugabe as secretary-general.");
  b.card("FACT", "What were ZIPRA and ZANLA?", "The armed wings of ZAPU (ZIPRA) and ZANU (ZANLA).");
  b.card("CONCEPT", "Why did the nationalist movement split in 1963?", "Disagreement over leadership and strategy, with personal and regional rivalries; historians differ on weight.");
  b.card("CONCEPT", "How did repression push nationalists towards armed struggle?", "Successive bans, detention of leaders and the refusal to negotiate closed peaceful politics.");
  b.card("CONCEPT", "Which states and powers supported ZAPU and ZANU?", "ZAPU mainly the Soviet Union and its allies; ZANU mainly China; both used bases in Zambia and Tanzania.");
});
