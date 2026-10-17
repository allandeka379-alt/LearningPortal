// W2a: ahist.liberation.armed-struggle-1972-79 (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.liberation.armed-struggle-1972-79", { file: "liberation/armed-struggle-1972-79", keyPrefix: "liberation.armed-struggle-1972-79" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the attack on Altena Farm that began the new phase of the war?",
    options: [
      ["21 December 1972", "Correct: ZANLA attacked in the Centenary area."],
      ["28 April 1966", "This is the date of the Battle of Chinhoyi."],
      ["9 August 1976", "This is the date of the Nyadzonia raid."],
      ["21 December 1979", "This is the date of the Lancaster House agreement."],
    ],
    answer: "A",
    explanation: "The Altena Farm attack of 21 December 1972 began the second phase, operating from the north-east.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was a pungwe?",
    options: [
      ["An all-night meeting at which guerrillas won the support of villagers", "Correct: songs, slogans and speeches explained the aims of the war."],
      ["A fenced village into which the Rhodesian army moved rural people", "This describes a protected village."],
      ["A radio programme used by the Rhodesian government to send news to villages", "A pungwe was not a radio programme."],
      ["A type of weapon used by Rhodesian special forces in the north-east", "A pungwe was not a weapon."],
    ],
    answer: "A",
    explanation: "A pungwe was an all-night meeting with songs and speeches in which guerrillas and commissars won over villagers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was Mozambique important for the war after 1972?",
    options: [
      ["It gave ZANLA bases, a long border and help from FRELIMO", "Correct: FRELIMO's help opened the north-east and later the east."],
      ["It gave ZIPRA the use of Lusaka as its headquarters", "Lusaka is in Zambia."],
      ["It sent Portuguese troops to fight alongside ZANLA", "Portugal opposed FRELIMO until 1974."],
      ["It gave Rhodesia a route for exports during the sanctions", "That ended when the border closed in 1976."],
    ],
    answer: "A",
    explanation: "FRELIMO helped ZANLA from about 1970, and after independence in 1975 Mozambique allowed camps and a long open border.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which Rhodesian unit sometimes operated disguised as guerrillas?",
    options: [
      ["The Selous Scouts", "Correct: they were formed in 1973."],
      ["The Rhodesian African Rifles", "This was a regular regiment."],
      ["The British South Africa Police", "This was the national police force."],
      ["The Zimbabwe People's Revolutionary Army", "This was ZAPU's army."],
    ],
    answer: "A",
    explanation: "The Selous Scouts, formed in 1973, sometimes operated in disguise, for example in the Nyadzonia raid.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "What was the purpose of protected villages?",
    options: [
      ["To cut off the rural people from the guerrillas and control them", "Correct: but they caused hardship and resentment."],
      ["To provide new homes for white farmers who had left their land", "They were for Africans, not white farmers."],
      ["To protect cattle from disease during the whole period of the war", "Their purpose was security, not disease control."],
      ["To train African recruits for the Rhodesian army in the border areas", "They were not training camps."],
    ],
    answer: "A",
    hints: ["Think about the guerrillas' need for the people."],
    explanation: "Protected villages were meant to isolate guerrillas from villagers; the policy caused loss of land and crops and angered many Africans.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What happened to Herbert Chitepo on 18 March 1975?",
    options: [
      ["He was killed by a car bomb in Lusaka", "Correct: responsibility has been disputed."],
      ["He was arrested by the Rhodesian army at Chinhoyi", "He was in Lusaka."],
      ["He was elected president of the Patriotic Front", "The Patriotic Front was formed in 1976."],
      ["He was released from a detention camp in Rhodesia", "He had not been in detention."],
    ],
    answer: "A",
    hints: ["Remember the date and place."],
    explanation: "Chitepo, ZANU's chairman, was killed by a car bomb in Lusaka; Zambia blamed ZANU rivalries while others blamed Rhodesian agents.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the raids on Nyadzonia (1976) and Chimoio (1977) is best supported?",
    options: [
      ["Many died, and the death tolls are disputed by Rhodesian and Zimbabwean sources", "Correct: estimates vary widely."],
      ["They destroyed ZANLA completely and brought the war to an end in 1977 itself", "ZANLA rebuilt and the war continued."],
      ["They were attacks on Rhodesian bases by ZANLA fighters, which caused few deaths", "They were Rhodesian attacks on camps."],
      ["They were agreed beforehand by Mozambique and Rhodesia as part of a ceasefire plan", "No such agreement existed."],
    ],
    answer: "A",
    hints: ["Think of the quality of the evidence."],
    explanation: "Rhodesian forces attacked camps in Mozambique; the death tolls are disputed estimates, and many of the dead were young recruits and refugees.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best explains why the war after 1972 put more pressure on Rhodesia than the war before 1972?",
    options: [
      ["Guerrillas had popular support and a long open border through Mozambique", "Correct: the army could not guard everywhere."],
      ["Rhodesia had lost most of its army and police in a single battle in 1972", "No such battle occurred."],
      ["Britain sent troops to defend the Rhodesian farms from 1973", "Britain sent no troops."],
      ["The nationalist parties had been legalised and elected to government", "They remained banned."],
    ],
    answer: "A",
    hints: ["Compare the phases."],
    explanation: "Support from villagers and a very long border made the war impossible to contain, unlike the earlier columns, which were located and destroyed.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "ZAPU and ZANU formed the Patriotic Front in October 1976.", answer: true,
    explanation: "The Patriotic Front was formed before the Geneva Conference as an alliance between ZAPU and ZANU.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Patriotic Front merged ZIPRA and ZANLA into a single army.", answer: false,
    explanation: "It was an alliance; the two armies remained separate.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Historians agree on the exact number of people killed in the Rhodesian war.", answer: false,
    hints: ["Remember that the sources disagree."],
    explanation: "Estimates range from about 20,000 to 30,000 or more, and historians do not agree on an exact figure.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Mujiba", "A young man who acted as messenger or scout for the guerrillas"],
      ["Chimbwido", "A young woman who carried food and messages"],
      ["Fireforce", "A helicopter-borne rapid attack by the Rhodesian army"],
      ["Protected village", "A fenced village into which rural people were moved"],
    ],
    explanation: "These terms describe the contest for support in the countryside.",
  });
  {
    const events = [
      "The Altena Farm attack",
      "Chitepo is killed in Lusaka",
      "The Patriotic Front is formed",
      "The raids on Chimoio and Tembue",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1972, 1975, 1976 and 1977."],
      explanation: "December 1972; March 1975; October 1976; November 1977.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The new phase of the war began with the attack on {{blank:a}} Farm in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Altena"], choices: ["Altena", "Chinhoyi", "Wankie", "Sipolilo"] },
      { id: "b", accepted: ["December 1972"], choices: ["December 1972", "April 1966", "August 1976", "April 1980"] },
    ],
    explanation: "ZANLA attacked Altena Farm on 21 December 1972.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What was the name of the alliance formed by ZAPU and ZANU in October 1976?",
    accepted: ["Patriotic Front", "the Patriotic Front", "PF"],
    wrong: ["Rhodesian Front"],
    explanation: "The **Patriotic Front**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the methods used by Rhodesian forces against the guerrillas after 1972.",
    points: ["Protected villages to cut villagers off from guerrillas", "The Selous Scouts and other special forces", "Fireforce helicopter attacks", "Raids on camps in Mozambique and Zambia"],
    modelAnswer: "The government moved rural people into protected villages to cut them off from the guerrillas, and used special forces such as the Selous Scouts. Fireforce helicopter attacks were used against groups in the field, and the Rhodesian army raided camps in Mozambique and Zambia.",
    explanation: "One mark for each method described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the war was more effective after 1972 than before.",
    points: [["ZANLA prepared the villagers first, using pungwe meetings and spirit mediums, so the guerrillas had support", 2], ["Mozambique, with FRELIMO's help, gave bases and a long border that Rhodesia could not guard", 2]],
    hints: ["Think of the people and of the border."],
    modelAnswer: "ZANLA prepared the villagers first, using pungwe meetings and spirit mediums, so the guerrillas had support and could hide among the people. Mozambique, with FRELIMO's help, gave bases and a long border that Rhodesia could not guard.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the war affected Rhodesia by 1979.",
    points: [["Large parts of the countryside could not be controlled, and white emigration rose", 2], ["The economy was strained by sanctions and war costs, and neighbouring states and Britain and the United States pressed for a settlement", 2]],
    hints: ["Give a military effect and an economic or political effect."],
    modelAnswer: "Large parts of the countryside could not be controlled and white emigration rose. The economy was strained by sanctions and the cost of the war, and neighbouring states, Britain and the United States pressed for a settlement.",
    explanation: "Credit developed effects.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Rhodesian district commissioner to his provincial headquarters, 1975",
        "The protected villages are crowded and the people are resentful. The guerrillas come by night, and the people do not report them. In daylight they obey us; at night they obey others. We hold the roads, but not the people."),
      "",
      source("Source B", "a recollection by a fictional woman who lived in a village in the north-east, told in 2005",
        "At night the soldiers of the struggle came and we sang and cooked for them. In the day the other soldiers came and asked us questions. We were afraid of both. We wanted the war to end, and we wanted our land."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What problems for the government does Source A mention?", points: ["Resentment in the crowded protected villages", "The people obey the guerrillas at night and do not report them"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What does Source B show about the experience of villagers?", points: ["They fed and sang for the guerrillas at night and were questioned by soldiers by day", "They were afraid of both sides and wanted the war to end and land"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources as evidence of the war in the countryside?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is a private official report at the time, honest about the loss of control, but from the government's viewpoint", 1], ["B is a villager's memory that shows divided loyalties and fear, but told 30 years later and from one woman's experience", 1], ["Own knowledge: protected villages, pungwes and the pressure on villagers from both sides are confirmed in other evidence", 1], ["Judgement: they agree that the contest was for the people, and together they give two views", 1]], modelAnswer: "Source A is a private official report written at the time, so it is honest about the government's loss of control, though it is only the government's viewpoint. Source B is a villager's memory which shows divided loyalties and fear, but it was told thirty years later and reflects one woman's experience. My own knowledge confirms that protected villages and pungwes existed and that villagers were pressed by both sides. The sources agree that the contest was for the people, and together they give two useful views." }),
    ],
    hints: ["For (c), consider the date and viewpoint of each source."],
    explanation: "Both sources are invented: a district commissioner's report and a villager's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was support from Mozambique the main reason why the armed struggle became more effective after 1972?",
    levels: levels(12),
    points: [
      ["Mozambique: FRELIMO's help from 1970, Tete as a route, independence in 1975, bases and a long border", 3],
      ["Mobilisation of villagers: pungwe, mediums, mujibas and chimbwidos", 3],
      ["Rhodesian mistakes: protected villages, collective punishments alienated people; forces stretched", 2],
      ["Other factors: Zambia and Tanzania, sanctions, the Patriotic Front and ZIPRA", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh Mozambique's help against mobilisation of the people and Rhodesian mistakes."],
    modelAnswer: "Support from Mozambique was a major reason for the war's effectiveness but it worked together with political mobilisation. FRELIMO's help from about 1970 gave ZANLA a route into the north-east, and after independence in 1975 Mozambique provided camps and a very long border that Rhodesia could not guard. But the guerrillas also used pungwe meetings, spirit mediums, mujibas and chimbwidos to win support from villagers, which allowed them to survive. Rhodesian mistakes such as protected villages and collective punishment alienated people, and the forces were stretched. Zambia, sanctions and ZIPRA's pressure from the west added to the strain. I conclude that Mozambique made the war possible on a large scale, but the support of the rural people was the essential reason that the guerrillas could not be defeated.",
    explanation: "Credit explained factors and a judgement that weighs Mozambique against the rest.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the effectiveness of the Rhodesian government's counter-measures against the guerrillas between 1972 and 1979.",
    levels: levels(8),
    points: [
      ["Measures: protected villages, collective punishment, Selous Scouts, fireforce and cross-border raids", 2],
      ["Achievements: killed many guerrillas and destroyed bases, slowed expansion", 2],
      ["Failures: alienated villagers, did not stop recruitment, guerrillas rebuilt, economic cost and criticism abroad", 2],
      ["Judgement on effectiveness", 2],
    ],
    hints: ["Give both achievements and failures."],
    modelAnswer: "The Rhodesian counter-measures were effective tactically but failed strategically. Fireforce attacks, the Selous Scouts and raids on camps in Mozambique killed many guerrillas and destroyed bases, and slowed ZANLA's expansion for a time. But protected villages and collective punishment alienated villagers, recruitment continued, the camps were rebuilt, and the cost of the war and criticism abroad grew. I conclude that the measures won many battles but could not win the war, because they did not win the support of the people.",
    explanation: "Credit achievements, failures and a judgement.",
  });

  b.card("DEFINITION", "What was a pungwe?", "An all-night meeting with songs and speeches at which guerrillas won the support of villagers.");
  b.card("DEFINITION", "What were protected villages?", "Fenced villages into which the Rhodesian government moved rural people to cut them off from guerrillas.");
  b.card("FACT", "What happened on 21 December 1972?", "ZANLA attacked Altena Farm in the Centenary area, beginning the new phase of the war.");
  b.card("FACT", "What did Mozambique do in March 1976?", "It closed its border to Rhodesia and allowed ZANLA camps.");
  b.card("FACT", "What were the Nyadzonia and Chimoio raids?", "Rhodesian attacks on ZANLA camps in Mozambique in August 1976 and November 1977; death tolls are disputed.");
  b.card("FACT", "When was the Patriotic Front formed?", "October 1976, as an alliance between ZAPU and ZANU.");
  b.card("CONCEPT", "Why was the war more successful after 1972?", "Villagers were prepared first, and Mozambique provided bases and a long border.");
  b.card("CONCEPT", "How did the war pressure Rhodesia by 1979?", "Loss of control of the countryside, white emigration, sanctions and war costs, and pressure from neighbours and the West.");
  b.card("CONCEPT", "How many people died in the war?", "Estimates range from about 20,000 to 30,000 or more; most were civilians; no exact figure is agreed.");
});
