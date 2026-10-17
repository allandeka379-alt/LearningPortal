// W2a: ahist.liberation.armed-struggle-1966-72 (ZIMSEC only, topic 10).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.liberation.armed-struggle-1966-72", { file: "liberation/armed-struggle-1966-72", keyPrefix: "liberation.armed-struggle-1966-72" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which date was the Battle of Chinhoyi fought?",
    options: [
      ["28 April 1966", "Correct: seven ZANLA fighters were killed."],
      ["11 November 1965", "This is the date of UDI."],
      ["21 December 1972", "This is the date of the Altena Farm attack."],
      ["18 April 1980", "This is the date of independence."],
    ],
    answer: "A",
    explanation: "The Battle of Chinhoyi was fought on 28 April 1966 and is remembered as the start of the Second Chimurenga.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which army was the armed wing of ZAPU?",
    options: [
      ["ZIPRA", "Correct: the Zimbabwe People's Revolutionary Army."],
      ["ZANLA", "ZANLA was the armed wing of ZANU."],
      ["The Selous Scouts", "These were a Rhodesian army unit."],
      ["The Rhodesian African Rifles", "This was a Rhodesian army regiment."],
    ],
    answer: "A",
    explanation: "ZIPRA, the Zimbabwe People's Revolutionary Army, was ZAPU's armed wing; ZANLA was ZANU's.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where did ZANU mainly send its recruits for military training in the 1960s?",
    options: [
      ["China and Tanzania", "Correct: ZANLA's training came from China."],
      ["The Soviet Union and Cuba", "ZAPU was trained mainly in the Soviet bloc."],
      ["South Africa and Portugal", "These supported Rhodesia."],
      ["Britain and the United States", "These did not train the nationalists."],
    ],
    answer: "A",
    explanation: "ZANU's recruits went mainly to China and Tanzania; ZAPU's went mainly to the Soviet Union and allied states.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which two organisations took part in the Wankie campaign of 1967?",
    options: [
      ["ZIPRA and the military wing of the South African ANC", "Correct: a joint force crossed the Zambezi."],
      ["ZANLA and the army of FRELIMO from Mozambique", "FRELIMO was not in the Wankie campaign."],
      ["The Patriotic Front and the Rhodesian Selous Scouts", "The Patriotic Front was formed in 1976."],
      ["ZAPU and the Rhodesian Front government of Smith", "The Rhodesian Front was the government party."],
    ],
    answer: "A",
    explanation: "ZIPRA and Umkhonto we Sizwe, the military wing of the South African ANC, formed a joint force that crossed the Zambezi in August 1967.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which Rhodesian measure helped to defeat the campaigns of 1967-68?",
    options: [
      ["Help from South African police and the use of helicopters and trackers", "Correct: Rhodesia had air power and outside help."],
      ["A ceasefire agreed with the nationalists at a conference in Geneva in 1967", "There was no such ceasefire."],
      ["The withdrawal of all Rhodesian troops from the Zambezi valley in 1967", "Rhodesian troops stayed in the valley."],
      ["The decision to grant votes to all Africans living in the border areas", "No such decision was made."],
    ],
    answer: "A",
    hints: ["Think of what Rhodesia had that the guerrillas lacked."],
    explanation: "South African police units arrived in 1967, and Rhodesian forces used helicopters, trackers and informers to find and defeat the columns.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a main weakness of the guerrillas in the Wankie and Sipolilo campaigns?",
    options: [
      ["They moved in large groups and had little contact with local people", "Correct: they could not hide or be fed by the people."],
      ["They had no weapons of any kind except sticks, stones and a few knives", "They had modern weapons."],
      ["They refused to cross the Zambezi from their bases in Zambia", "They did cross the river."],
      ["They had already won the support of the white farmers in the area", "The farmers were not their supporters."],
    ],
    answer: "A",
    hints: ["Think of the need for the support of the people."],
    explanation: "Large columns without local support were easy to detect and defeat; later strategy aimed to win the rural people first.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What was the main lesson that ZANLA drew from the failures of 1966-68?",
    options: [
      ["That the people must be won over first so that guerrillas could live among them", "Correct: political mobilisation became central."],
      ["That the war should be abandoned and talks begun at once with Ian Smith's government", "The war was continued."],
      ["That only large conventional armies with heavy artillery could defeat the Rhodesian forces", "The lesson was the opposite."],
      ["That the war should be fought only in the towns and cities, avoiding the countryside", "The countryside became the main area."],
    ],
    answer: "A",
    hints: ["Think of the strategy used from 1972."],
    explanation: "ZANLA concluded that rural support was essential, which led to mobilisation of villagers from 1970-72 with FRELIMO's help in Tete.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which view of the Battle of Chinhoyi is best supported by the evidence?",
    options: [
      ["It was a military defeat for ZANLA but a symbol of the start of the armed struggle", "Correct: its importance was symbolic."],
      ["It was a decisive military victory for ZANLA that ended Rhodesian rule in the north", "Rhodesian rule continued for years."],
      ["It was an unimportant event that nobody in Zimbabwe now remembers or commemorates", "It is commemorated."],
      ["It was a battle between Rhodesian forces and the regular army of South Africa", "It involved ZANLA fighters."],
    ],
    answer: "A",
    hints: ["Distinguish military result from symbolic importance."],
    explanation: "All seven fighters were killed, but the battle is remembered as the start of the Second Chimurenga.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Wankie campaign took place in 1967.", answer: true,
    explanation: "The Wankie campaign was fought in August-September 1967.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The guerrillas of 1966-68 had won the support of most of the rural people before they entered the country.", answer: false,
    explanation: "Political preparation was weak; this was a main reason for the failure of the first phase.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "South African police helped Rhodesia to counter the guerrillas from 1967.", answer: true,
    hints: ["Think of Rhodesia's allies."],
    explanation: "South African police units were sent to Rhodesia in 1967.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event or person to its description.",
    pairs: [
      ["Chinhoyi (1966)", "Fight in which seven ZANLA fighters were killed"],
      ["Wankie (1967)", "Joint ZIPRA and ANC campaign across the Zambezi"],
      ["Sipolilo (1968)", "Campaign in the north in which most fighters were killed or captured"],
      ["Herbert Chitepo", "ZANU leader who headed the war council in Zambia"],
    ],
    explanation: "These are the main events and a key leader of the early phase.",
  });
  {
    const events = [
      "The Battle of Chinhoyi",
      "The Wankie campaign",
      "The Sipolilo campaign",
      "ZANU forms the Dare reChimurenga",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1966, 1967, 1968 and 1969."],
      explanation: "April 1966; August 1967; March 1968; 1969.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Battle of {{blank:a}} was fought in {{blank:b}} and is remembered as the start of the Second Chimurenga.",
    blanks: [
      { id: "a", accepted: ["Chinhoyi"], choices: ["Chinhoyi", "Adwa", "Nyadzonia", "Shangani"] },
      { id: "b", accepted: ["1966"], choices: ["1966", "1896", "1976", "1980"] },
    ],
    explanation: "The Battle of Chinhoyi was fought on 28 April 1966.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Zambian-based ZANU leader who headed the war council (Dare reChimurenga) in the early 1970s.",
    accepted: ["Herbert Chitepo", "Chitepo", "Herbert Wiltshire Chitepo"],
    wrong: ["Tongogara"],
    explanation: "**Herbert Chitepo**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the nationalist parties prepared for armed struggle between 1964 and 1966.",
    points: ["Leaders went into detention or exile after the bans of 1964", "Recruits were sent for training in China, the Soviet Union and other states", "Bases were set up in Zambia and Tanzania", "Small acts of sabotage and attacks were carried out inside the country"],
    modelAnswer: "After the bans of 1964 many leaders were in detention or in exile. Recruits were sent for training in China, the Soviet Union and other states, and bases were set up in Zambia and Tanzania. Inside the country there were small acts of sabotage.",
    explanation: "One mark for each point described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Wankie campaign of 1967 failed.",
    points: [["The guerrillas moved in large groups with little contact with the people, so they were easily detected", 2], ["Rhodesian forces had helicopters, trackers and South African police, and the guerrillas were short of water and supplies", 2]],
    hints: ["Give one weakness of the guerrillas and one strength of the enemy."],
    modelAnswer: "The guerrillas moved in large groups with little contact with local people, so they were easily detected. Rhodesian forces had helicopters, trackers and South African police, and the guerrillas were short of water and supplies.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Rhodesian government tried to prevent the spread of guerrilla war in the 1960s.",
    points: [["It used strong security forces, laws allowing detention and the death penalty, and informers", 2], ["It relied on South African police and on the buffer of Portuguese Mozambique and South Africa", 2]],
    hints: ["Think of laws, forces and allies."],
    modelAnswer: "The government used strong security forces, laws allowing detention without trial and the death penalty for sabotage, and informers among chiefs and villagers. It relied on South African police and on the buffer of Portuguese Mozambique and South Africa.",
    explanation: "Credit developed measures.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a communique by a fictional Rhodesian army spokesman, 1967",
        "Security forces have engaged a band of armed terrorists in the north-west of the country. Some have been killed and others captured. Aircraft and police from the Republic of South Africa assisted. The public may be assured that the situation is well in hand."),
      "",
      source("Source B", "a recollection by a fictional ZIPRA fighter who survived the campaign, told in the 1990s",
        "We walked by night with heavy packs. We had no friends in that country; the people did not know us. We were hungry, and we were hunted from the air. Many died who might have lived if we had been taught how to live among the people."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the outcome of the fighting?", points: ["Some of the guerrillas were killed and others captured", "The situation is said to be well in hand / South African aircraft and police helped"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What reasons for the failure of the guerrillas does Source B give?", points: ["They had no friends or support among the people", "They were hungry and hunted from the air / not trained to live among the people"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How reliable are these sources as evidence of the Wankie campaign?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is an official communique, which would stress success and play down difficulties, but it is accurate that South African help was used", 1], ["B is a participant's memory, giving insight into conditions, but told decades later and possibly shaped by hindsight", 1], ["Own knowledge: most guerrillas were killed or captured, and the lack of local support and air power are confirmed elsewhere", 1], ["Judgement: they agree on the outcome and complement each other on causes", 1]], modelAnswer: "Source A is an official communique, so it stresses success and plays down difficulties, though it is accurate about South African help. Source B is a participant's memory which gives insight into conditions, but it was told decades later and may reflect hindsight. My own knowledge confirms that most guerrillas were killed or captured and that lack of local support and Rhodesian air power were decisive. The two agree on the outcome and complement each other on the causes, so together they are reasonably reliable." }),
    ],
    hints: ["For (c), consider purpose and date."],
    explanation: "Both sources are invented: an army communique and a fighter's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was lack of support from the people the main reason why the armed struggle failed between 1966 and 1972?",
    levels: levels(12),
    points: [
      ["Lack of support: columns with little contact with the people, poor political preparation, nowhere to hide or feed", 3],
      ["Rhodesian strength: air power, trackers, informers, strong laws and South African police", 3],
      ["Geography and logistics: crossing the Zambezi, large exposed columns, shortage of supplies", 2],
      ["Division between ZAPU and ZANU and the buffer of Portugal and South Africa", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh the lack of support against Rhodesian strength and the other factors."],
    modelAnswer: "Lack of support from the people was an important reason for the failure of the first phase, but Rhodesian strength was equally important. The guerrillas moved in large groups with little contact with villagers, so they could not hide or be fed, and little time had been spent on political preparation. But the Rhodesian forces also had air power, trackers, informers and strong laws, and South African police helped from 1967. The long Zambezi crossing, shortage of supplies and the divisions between ZAPU and ZANU made things harder, while Portugal and South Africa protected Rhodesia's flanks. I conclude that lack of support was the main weakness of the guerrillas, which made them vulnerable to a stronger enemy, and that ZANLA's response in the 1970s was to put political mobilisation first.",
    explanation: "Credit explained factors and a judgement that weighs support against enemy strength.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the Battle of Chinhoyi in the history of the armed struggle.",
    levels: levels(8),
    points: [
      ["Military result: seven ZANLA fighters killed, no threat to the state", 2],
      ["Symbolic importance: marked the start of the Second Chimurenga and is commemorated", 2],
      ["Limited effect at the time: Rhodesia dismissed it as a criminal incident; the real war came later", 2],
      ["Judgement on importance", 2],
    ],
    hints: ["Distinguish immediate military effect from long-term meaning."],
    modelAnswer: "The Battle of Chinhoyi was important mainly as a symbol. Militarily it was a defeat, as all seven ZANLA fighters were killed, and Rhodesia treated it as a criminal incident. But it marked the start of the armed struggle and has been remembered ever since as the beginning of the Second Chimurenga. I conclude that its importance lay in what it came to represent rather than in its military effect.",
    explanation: "Credit explained importance and a judgement.",
  });

  b.card("DEFINITION", "What is guerrilla warfare?", "Fighting by small mobile forces that use surprise and the support of the people to wear down a stronger army.");
  b.card("DEFINITION", "What were ZANLA and ZIPRA?", "The armed wings of ZANU (ZANLA) and ZAPU (ZIPRA).");
  b.card("FACT", "When was the Battle of Chinhoyi and what happened?", "28 April 1966; seven ZANLA fighters were killed; it is remembered as the start of the Second Chimurenga.");
  b.card("FACT", "What were the Wankie and Sipolilo campaigns?", "Joint ZIPRA and ANC campaigns in 1967 (Wankie) and 1968 (Sipolilo), defeated by Rhodesian forces.");
  b.card("FACT", "Who helped Rhodesia with police from 1967?", "South Africa.");
  b.card("FACT", "Who were Chitepo and Tongogara?", "Chitepo led ZANU's war council (Dare reChimurenga); Tongogara commanded ZANLA.");
  b.card("CONCEPT", "Why did the first phase of the armed struggle fail?", "Large columns with little rural support, weak political preparation, strong Rhodesian forces with South African help, and ZAPU-ZANU division.");
  b.card("CONCEPT", "What did ZANLA learn from the failures of 1966-68?", "That the rural people must be won over first; this led to mobilisation with FRELIMO's help from about 1970.");
  b.card("CONCEPT", "How did Rhodesia counter the guerrillas in the 1960s?", "Strong security forces, air power, informers, severe laws, South African help and a buffer of Portuguese and South African territory.");
});
