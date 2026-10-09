// Slice W1b: the turn to armed struggle and its early phase, 1964-1970 (ZIMSEC topic 10.2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.liberation.early-armed-struggle", { file: "liberation/early-armed-struggle", keyPrefix: "liberation.early-armed-struggle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the battle of Chinhoyi fought?",
    options: [
      ["28 April 1966", "Correct: seven ZANLA fighters were killed."],
      ["21 December 1972", "That is the attack on Altena Farm."],
      ["11 November 1965", "That is the date of UDI."],
      ["18 April 1980", "That is Zimbabwe's independence."],
    ],
    answer: "A",
    explanation: "The battle of **Chinhoyi** on **28 April 1966** is widely remembered as the start of the Second Chimurenga.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which army was the armed wing of ZAPU?",
    options: [
      ["ZIPRA", "Correct: the Zimbabwe People's Revolutionary Army."],
      ["ZANLA", "ZANLA was ZANU's army."],
      ["FRELIMO", "FRELIMO was the Mozambican liberation movement."],
      ["The Selous Scouts", "The Selous Scouts were a Rhodesian unit."],
    ],
    answer: "A",
    explanation: "**ZIPRA** belonged to ZAPU; **ZANLA** to ZANU.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which development in 1965 most convinced nationalists that only armed struggle could bring majority rule?",
    options: [
      ["UDI, with Britain refusing to use force", "Correct: no outside power would remove the regime."],
      ["The founding of the Federation of Rhodesia and Nyasaland", "The Federation was founded in 1953 and ended in 1963."],
      ["The Lancaster House conference in London", "That was in 1979."],
      ["The independence of Ghana under Nkrumah", "Ghana became independent in 1957."],
    ],
    answer: "A",
    explanation: "UDI on 11 November 1965 cut the legal link to Britain, and Britain ruled out force, so nationalists concluded they must fight.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group fought alongside ZIPRA in the Hwange (Wankie) campaign of 1967?",
    options: [
      ["The ANC of South Africa", "Correct: its fighters sought a route home through Rhodesia."],
      ["FRELIMO of Mozambique", "FRELIMO later helped ZANLA in the north-east, not at Hwange."],
      ["The Rhodesian African Rifles", "That was a unit of the Rhodesian army."],
      ["Soldiers of the Tanzanian army", "Tanzania hosted camps but did not fight at Hwange."],
    ],
    answer: "A",
    explanation: "The Hwange campaign was a joint operation of ZIPRA and the African National Congress of South Africa; it led South Africa to send police units to Rhodesia.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these countries was a training ground for Zimbabwean freedom fighters in the 1960s?",
    options: [
      ["Tanzania", "Correct: the OAU Liberation Committee was in Dar es Salaam."],
      ["South Africa", "South Africa supported the Rhodesian government."],
      ["Portugal", "Portugal ruled Mozambique and opposed the guerrillas."],
      ["Rhodesia", "Fighters had to train outside the country."],
    ],
    answer: "A",
    explanation: "Fighters trained in Tanzania, Zambia, Ghana, Algeria, Egypt, the USSR, China, Cuba and North Korea, among others.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did moving in large groups make the early guerrillas vulnerable?",
    options: [
      ["They were easy to track and attack from the air", "Correct: Rhodesian helicopters and trackers found them."],
      ["Large groups could not carry rifles across rivers", "Groups did cross the Zambezi with weapons."],
      ["The OAU forbade groups larger than ten fighters", "No such rule existed."],
      ["Their leaders refused to give orders to large groups", "This is not why they were vulnerable."],
    ],
    answer: "A",
    hints: ["Think about the Rhodesians' advantages."],
    explanation: "Large groups left tracks and needed supplies, so Rhodesian forces with aircraft and trackers could locate and attack them in the thinly populated Zambezi valley.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which lesson did the liberation movements draw from the failures of 1966-1968?",
    options: [
      ["Win the people's support before fighting", "Correct: politicisation became central in the 1970s."],
      ["Abandon the armed struggle and rely on talks", "The struggle was intensified, not abandoned."],
      ["Fight only large conventional battles", "This was the approach that failed."],
      ["Recruit only from among settlers", "Recruits came from African communities."],
    ],
    hints: ["Think about what the early fighters lacked inside the country."],
    answer: "A",
    explanation: "Without local support, fighters lacked food, shelter and intelligence. In the second phase small groups worked closely with the people.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the most balanced judgement on the early phase of the armed struggle?",
    options: [
      ["It failed militarily but inspired recruits and taught lessons", "Correct: a judgement that weighs both sides."],
      ["It achieved majority rule within five years", "Majority rule came in 1980."],
      ["It had no effect at all on the Rhodesian government", "It forced Rhodesia to strengthen its forces and seek South African help."],
      ["It succeeded because the people had been well prepared", "Lack of political preparation was a main weakness."],
    ],
    answer: "A",
    hints: ["Look for a statement that accepts both failure and significance."],
    explanation: "The battles were lost, but Chinhoyi became a symbol, the war drew in South African police, and the movements changed strategy because of what they learned.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Seven ZANLA fighters were killed at the battle of Chinhoyi.",
    answer: true,
    explanation: "True. They are remembered as the Chinhoyi Seven.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "During the early phase, freedom fighters had friendly bases all along the border with Mozambique.",
    answer: false,
    explanation: "False. Mozambique was ruled by Portugal until 1975; early fighters had to cross the Zambezi from Zambia.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["ZANLA", "Armed wing of ZANU"],
      ["ZIPRA", "Armed wing of ZAPU"],
      ["Guerrilla warfare", "Small mobile groups using surprise and local support"],
      ["Conventional warfare", "Organised units fighting open battles"],
    ],
    explanation: "The early phase relied too much on conventional methods; guerrilla warfare became the strategy of the 1970s.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The battle of Chinhoyi",
      "ZANU and the PCC are banned",
      "The Hwange (Wankie) campaign",
      "UDI is declared",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The bans came more than a year before UDI."],
    explanation: "Bans August 1964; UDI 11 November 1965; Chinhoyi 28 April 1966; Hwange August 1967.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The OAU {{blank:a}} Committee, based in Dar es Salaam, supported liberation movements. After the 1967 campaigns, {{blank:b}} sent police units to help Rhodesia.",
    blanks: [
      { id: "a", accepted: ["Liberation"], choices: ["Liberation", "Monckton", "Pearce", "Security"] },
      { id: "b", accepted: ["South Africa"], choices: ["South Africa", "Britain", "Zambia", "Tanzania"] },
    ],
    explanation: "The OAU Liberation Committee was set up in 1963; South Africa sent police units from 1967.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the colonial name of Chinhoyi, used in 1966.",
    accepted: ["Sinoia"],
    wrong: ["Salisbury"],
    explanation: "Chinhoyi was called **Sinoia** in the colonial period.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** causes of the armed struggle in Zimbabwe.",
    points: [
      "Banning of nationalist parties.",
      "Detention and restriction of leaders.",
      "Failure of negotiations/peaceful methods.",
      "UDI (1965) and Britain's refusal to use force.",
      "Land alienation and other colonial grievances / examples of armed struggle elsewhere.",
    ],
    modelAnswer: "Nationalist parties were banned; leaders were detained; peaceful negotiations failed; the Rhodesian Front declared UDI and Britain refused to use force; and Africans had lost their land.",
    explanation: "One mark per cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain why the early phase of the armed struggle (1966-1970) failed.",
    points: [
      "Conventional tactics in large groups suited the Rhodesian forces.",
      "Lack of political preparation: local people not mobilised, so no food or shelter.",
      "Informers reported guerrillas / poor intelligence.",
      "Difficult, thinly populated Zambezi valley terrain.",
      "Strong Rhodesian forces with air power, reinforced by South African police from 1967.",
      "Divisions between and within the movements / no bases on the Mozambique border.",
    ],
    hints: ["Think about tactics, the people, the terrain and the enemy."],
    modelAnswer: "Fighters crossed the Zambezi in large groups and fought conventional battles, which suited the Rhodesian forces with their aircraft and trackers. The people had not been prepared politically, so the guerrillas lacked food, shelter and information, and some were reported by informers. The Zambezi valley was hot and thinly populated, so they were easy to track. From 1967 South African police reinforced the Rhodesians. ZANU and ZAPU fought separately and Portuguese-ruled Mozambique was hostile, so there were no bases along the eastern border.",
    explanation: "One mark per developed reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** recruitment strategies used by the nationalist parties in the 1960s.",
    points: [
      "Identifies recruitment of Zimbabweans living or working in Zambia and elsewhere.",
      "Describes how party offices in Lusaka/Dar es Salaam sent them for training.",
      "Identifies recruitment of students/refugees (sometimes with promises of education).",
      "Describes party branches secretly encouraging young men to cross the border (some pressure/force acknowledged).",
    ],
    hints: ["Think about who was recruited and how."],
    modelAnswer: "The parties recruited Zimbabweans living or working in Zambia and other countries; their offices in Lusaka and Dar es Salaam arranged for them to go for military training. They also recruited young people who had left the country, including students and refugees, sometimes after promising them education abroad, while party branches at home secretly encouraged young men to cross the borders.",
    explanation: "Two marks per strategy.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Read the source and answer the questions.\n\n${source("Source A", "a report by a fictional Rhodesian police officer in the Zambezi valley, September 1967", "The terrorists came across in a large body, carrying heavy loads. Their spoor was plain for the trackers to follow, and the villagers, who had not been told of their coming, reported the strangers within a day. Air support located the main group on the third day. We regard the incursion as a complete failure for the enemy.")}`,
    hints: ["Notice the language the officer uses and what he leaves out."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "According to Source A, why were the guerrillas found so quickly? Give three reasons.", points: [
        "They came in a large body with heavy loads.",
        "Their tracks were easy to follow.",
        "Villagers had not been prepared and reported them / air support located them.",
      ], explanation: "Three reasons from the source." }),
      P.manual({ label: "(b)", marks: 3, stem: "What does the language of Source A tell you about the writer's attitude? Explain your answer.", points: [
        "Calls the fighters \"terrorists\" and \"the enemy\".",
        "Shows he sees them as criminals, not freedom fighters.",
        "Confident/triumphant tone (\"complete failure\") suggests official viewpoint.",
      ], explanation: "Attitude supported by language." }),
      P.manual({ label: "(c)", marks: 6, stem: "How far does Source A help to explain the failure of the early phase of the armed struggle? Use the source and your own knowledge.", points: [
        "Supports: large conventional groups were easy to track (matches own knowledge).",
        "Supports: lack of political preparation meant villagers reported fighters.",
        "Supports: Rhodesian air power and trackers.",
        "Limits: written by the enemy, so biased and may exaggerate success.",
        "Limits: leaves out other factors (South African police, divisions, no bases in Mozambique) and the significance of the campaigns.",
        "Supported judgement.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A is useful because the reasons it gives match what we know about the early phase. The guerrillas crossed in large groups that were easy to track, villagers had not been prepared and reported them, and Rhodesian air power found them quickly. However, it was written by a Rhodesian officer who calls the fighters \"terrorists\", so it is biased and may exaggerate the success of his own side. It also leaves out other reasons for failure, such as the arrival of South African police in 1967, divisions between ZANU and ZAPU, and the lack of bases in Portuguese-ruled Mozambique, and it ignores the significance of these campaigns in inspiring recruits. So it explains part of the failure, mainly the military side.", explanation: "Use the source and own knowledge, with a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), compare UDI with the bans and other causes."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the early battles of the armed struggle between 1966 and 1968.", points: [
        "Chinhoyi, 28 April 1966: seven ZANLA fighters killed by police and air force.",
        "Hwange (Wankie), August-September 1967: ZIPRA with the ANC of South Africa.",
        "Fierce fighting over several weeks; guerrillas killed, captured or driven back.",
        "Sipolilo campaign 1967-68; South African police sent to Rhodesia.",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How far was UDI the main reason for the move from peaceful politics to armed struggle?", points: [
        ["UDI showed settlers would never accept majority rule.", 2],
        ["Britain's refusal to use force after UDI left no outside solution.", 2],
        ["Bans of parties (1959-1964) made peaceful politics impossible.", 2],
        ["Detention of leaders and failed negotiations (1961 constitution).", 2],
        ["Land grievances / examples of armed struggle elsewhere; armed preparations began before UDI.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "UDI was very important. On 11 November 1965 the Rhodesian Front declared independence precisely to prevent majority rule, and Britain refused to use force. Nationalists concluded that no outside power would remove the settler government.\n\nHowever, the move to arms had begun before UDI. Every nationalist party had been banned between 1959 and 1964, and laws such as the Law and Order (Maintenance) Act allowed leaders to be detained without trial, so peaceful organisation was impossible. Negotiations such as those over the 1961 constitution had failed. Recruits were already being sent abroad for training in the early 1960s. Deep grievances over land, and the example of armed struggles in Algeria and Kenya, also pushed nationalists towards force.\n\nOverall the bans and detentions made the move to armed struggle likely; UDI made it certain, because it showed that the settlers and Britain would not bring majority rule. UDI was the final cause rather than the only one.", explanation: "Top level weighs UDI against earlier causes." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When was the battle of Chinhoyi?", "28 April 1966; seven ZANLA fighters were killed.");
  b.card("DEFINITION", "ZANLA", "Zimbabwe African National Liberation Army: the armed wing of ZANU.");
  b.card("DEFINITION", "ZIPRA", "Zimbabwe People's Revolutionary Army: the armed wing of ZAPU.");
  b.card("FACT", "What was the Hwange (Wankie) campaign?", "A joint ZIPRA and ANC of South Africa campaign across the Zambezi in August-September 1967.");
  b.card("FACT", "Name four countries where freedom fighters trained.", "Tanzania, Zambia, Ghana, Algeria (also Egypt, the USSR, China, Cuba, North Korea).");
  b.card("CONCEPT", "Why did nationalists turn to armed struggle?", "Bans, detentions, failed negotiations, UDI, Britain's refusal to use force and land grievances.");
  b.card("CONCEPT", "Why did the early phase fail?", "Conventional tactics, no political preparation of the people, poor intelligence and terrain, strong Rhodesian and South African forces, divisions.");
  b.card("DEFINITION", "Guerrilla warfare", "Fighting by small mobile groups using surprise and local support, avoiding open battle.");
  b.card("FACT", "Where was the OAU Liberation Committee based?", "Dar es Salaam, Tanzania (set up in 1963).");
});
