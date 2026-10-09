// Slice W3a: American involvement in Vietnam, 1955-1975 (0470 B5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.containment.vietnam", { file: "containment/vietnam", keyPrefix: "containment.vietnam" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Along which line did the Geneva Agreements of 1954 divide Vietnam?",
    options: [
      ["The 17th parallel", "Correct: a communist North and a non-communist South."],
      ["The 38th parallel", "The 38th parallel divided Korea."],
      ["The Mekong River", "The Mekong flows through the South; it was not the dividing line."],
      ["The Ho Chi Minh Trail", "The Trail was a supply route through Laos and Cambodia."],
    ],
    answer: "A",
    explanation: "Vietnam was divided at the **17th parallel** in 1954, pending elections in 1956 that never took place.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led communist North Vietnam?",
    options: [
      ["Ho Chi Minh", "Correct: he had led the Viet Minh against the French."],
      ["Ngo Dinh Diem", "Diem led South Vietnam from 1955 to 1963."],
      ["Kim Il-sung", "Kim Il-sung led North Korea."],
      ["Pol Pot", "Pol Pot led the Khmer Rouge in Cambodia."],
    ],
    answer: "A",
    explanation: "**Ho Chi Minh** led the North until his death in 1969.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Gulf of Tonkin Resolution (August 1964) do?",
    options: [
      ["Gave Johnson power to use force without declaring war", "Correct: it opened the way to escalation."],
      ["Declared war on North Vietnam", "Congress never declared war."],
      ["Ordered all American advisers and troops home from Vietnam", "It led to more, not fewer, American forces."],
      ["Divided Vietnam at the 17th parallel", "That was the Geneva Agreements of 1954."],
    ],
    answer: "A",
    explanation: "The **Gulf of Tonkin Resolution** let Johnson take all necessary measures without a declaration of war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the purpose of spraying Agent Orange?",
    options: [
      ["To destroy the jungle cover used by the Viet Cong", "Correct: it was a defoliant."],
      ["To poison the rivers of North Vietnam", "It was used to strip leaves, mainly in the South."],
      ["To mark targets for American bombers", "Smoke markers, not Agent Orange, marked targets."],
      ["To protect American troops from malaria", "It was not a medical product and harmed many people."],
    ],
    answer: "A",
    explanation: "**Agent Orange** stripped leaves from the jungle; it caused lasting harm to people and land.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "When did Saigon fall to North Vietnamese forces?",
    options: [
      ["April 1975", "Correct: on 30 April 1975."],
      ["January 1968", "January 1968 was the Tet Offensive."],
      ["January 1973", "January 1973 was the Paris Peace Accords."],
      ["November 1963", "November 1963 was the overthrow of Diem."],
    ],
    answer: "A",
    explanation: "**Saigon** fell on 30 April 1975, two years after the last US combat troops left.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the Tet Offensive a turning point even though it failed militarily?",
    options: [
      ["It convinced many Americans the war could not be won", "Correct: it destroyed claims that victory was near."],
      ["It captured Saigon for the communists", "Saigon did not fall until 1975."],
      ["It persuaded China to stop helping the North", "China continued its support."],
      ["It led the US Congress to make a formal declaration of war", "Congress never declared war."],
    ],
    answer: "A",
    hints: ["Think about American public opinion, not the battlefield."],
    explanation: "Tet's **political** impact was huge: Americans saw fighting in Saigon and lost faith in official claims of progress.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was Nixon's policy of Vietnamisation?",
    options: [
      ["Handing the fighting to the South Vietnamese army", "Correct: US troops were withdrawn gradually."],
      ["Sending more American combat troops", "Nixon reduced US troop numbers."],
      ["Reuniting Vietnam under Ho Chi Minh", "Nixon wanted South Vietnam to survive."],
      ["Ending all bombing of North Vietnam at once", "Nixon increased bombing at times."],
    ],
    answer: "A",
    hints: ["The word suggests who would do the fighting."],
    explanation: "**Vietnamisation** built up South Vietnam's army so that American troops could leave.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why search and destroy missions often helped the Viet Cong?",
    options: [
      ["Raids that harmed civilians turned villagers against the USA", "Correct: each raid could create new recruits."],
      ["The missions were carried out only by South Vietnamese soldiers", "American troops carried out many of them."],
      ["The Viet Cong were invited to join the missions", "This did not happen."],
      ["The missions used no weapons and arrested nobody", "They were heavily armed operations."],
    ],
    answer: "A",
    hints: ["Who suffered when villages were searched?"],
    explanation: "Civilian casualties and destroyed homes **alienated peasants**, whose support decided the war.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Ho Chi Minh Trail ran through Laos and Cambodia.",
    answer: true,
    explanation: "True. It carried soldiers and supplies from the North to the South; bombing never closed it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The elections to reunite Vietnam promised for 1956 were held, and Diem won them.",
    answer: false,
    explanation: "False. Diem, backed by the USA, refused to hold them because Ho Chi Minh was expected to win.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each US President with his role in Vietnam.",
    pairs: [
      ["Eisenhower", "Described the domino theory in 1954"],
      ["Kennedy", "Increased American advisers to about 16,000"],
      ["Johnson", "Began Rolling Thunder and sent combat troops"],
      ["Nixon", "Introduced Vietnamisation and withdrew troops"],
    ],
    explanation: "Eisenhower (domino theory), Kennedy (advisers), Johnson (escalation from 1965), Nixon (Vietnamisation from 1969).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Tet Offensive",
      "The Gulf of Tonkin incident",
      "The Paris Peace Accords",
      "The French defeat at Dien Bien Phu",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["The French left before the Americans arrived in force."],
    explanation: "Dien Bien Phu (1954); Gulf of Tonkin (1964); Tet (1968); Paris Peace Accords (1973).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The American bombing campaign against North Vietnam from 1965 was called Operation {{blank:a}}. In May 1970 four students were shot dead during a protest at {{blank:b}} University.",
    blanks: [
      { id: "a", accepted: ["Rolling Thunder"], choices: ["Rolling Thunder", "Overlord", "Barbarossa", "Desert Storm"] },
      { id: "b", accepted: ["Kent State"], choices: ["Kent State", "Harvard", "Yale", "Stanford"] },
    ],
    explanation: "**Rolling Thunder** began in March 1965; the **Kent State** shootings followed the invasion of Cambodia in 1970.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the leader of South Vietnam who was overthrown and killed in November 1963.",
    accepted: ["Diem", "Ngo Dinh Diem", "Ngô Đình Diệm", "Ngo Diem", "President Diem"],
    wrong: ["Ho Chi Minh"],
    explanation: "**Ngo Dinh Diem** was overthrown in a military coup in November 1963.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the guerrilla tactics used by the Viet Cong.",
    points: [
      "Small units ambushed patrols and then disappeared.",
      "Booby traps and mines.",
      "Tunnel networks (for example at Cu Chi) to hide, store supplies and move.",
      "Blended in with villagers / relied on peasant support; supplied by the Ho Chi Minh Trail.",
    ],
    modelAnswer: "The Viet Cong fought in small units that ambushed American patrols and then disappeared into the jungle. They laid booby traps and mines, and built networks of tunnels, such as those at Cu Chi, to hide fighters and supplies. They dressed like ordinary peasants and relied on villagers for food and information, while supplies came from the North along the Ho Chi Minh Trail.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the United States supported South Vietnam after 1954.",
    points: [
      "Identifies the domino theory / containment.",
      "Explains the fear that if South Vietnam fell, Laos, Cambodia, Thailand and others would follow.",
      "Identifies the need to keep American credibility.",
      "Explains that abandoning an ally would make the USA look weak to the USSR, China and its own allies.",
    ],
    hints: ["Think about what Eisenhower said in 1954."],
    modelAnswer: "The USA supported South Vietnam because of containment and the domino theory: American leaders feared that if South Vietnam fell to communism, its neighbours such as Laos, Cambodia and Thailand would follow. They also wanted to keep American credibility, because abandoning an ally would make the USA look weak to the USSR and China and worry its allies elsewhere.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why opposition to the war grew in the United States.",
    points: [
      "Identifies rising American casualties and the draft.",
      "Explains that young men, many of them poor or Black Americans, were conscripted to fight in a war many did not support.",
      "Identifies television and press coverage (Tet, My Lai).",
      "Explains that images contradicted claims that the war was being won and showed civilian suffering.",
      "Identifies the cost of the war.",
      "Explains that spending on the war took money from programmes at home and the war seemed endless.",
    ],
    hints: ["Who fought, what people saw, and what it cost."],
    modelAnswer: "Opposition grew as American casualties rose and the draft sent young men, many of them poor or Black Americans, to fight in a war they had not chosen. Television brought the war into American homes: the Tet Offensive in 1968 contradicted official claims that the war was nearly won, and the revelation of the My Lai killings in 1969 showed the suffering of Vietnamese civilians. The war was also enormously expensive, taking money from programmes at home while seeming to have no end, so many Americans, especially students, protested against it.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a statement issued by a fictional US Army press officer in Saigon, December 1967", "Enemy losses this year have been heavy. The number of villages under government control is rising every month, and the Viet Cong can no longer mount large attacks. With patience, the end of the war is in sight.")}\n\n${source("Source B", "a letter from a fictional American mother to her senator, March 1968", "Last autumn they told us the enemy was beaten. Then I watched them fighting inside our own embassy in Saigon on the evening news. My son has been drafted. Before he goes, I want someone to tell me the truth about this war.")}`,
    hints: ["What happened between the two sources?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What impression of the war does Source A give?", points: [
        "The USA is winning / the enemy is weakening.",
        "Supported from the source (heavy losses, villages under control, end in sight).",
      ], explanation: "Impression plus support." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why does the writer of Source B no longer believe statements like Source A?", points: [
        "The Tet Offensive (January 1968) came after official claims of success.",
        "She saw fighting inside the US embassy compound on television.",
        "This created a 'credibility gap' between official claims and what people saw.",
        "Her son has been drafted, so she has a personal reason to question the war.",
      ], explanation: "Use the source and context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How reliable is Source A as evidence of the progress of the war in late 1967?", points: [
        "Provenance: an army press officer, whose job was to present the war positively.",
        "Content partly accurate: enemy losses were heavy.",
        "Own knowledge: weeks later the Tet Offensive showed the enemy could still mount large attacks.",
        "Own knowledge: claims about villages were unreliable; the South Vietnamese government remained weak.",
        "Useful as evidence of official optimism.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A was written by an army press officer, whose job was to present the war in a positive light, so we should expect it to be optimistic. Some of it was accurate: communist losses were heavy. But my own knowledge shows that its main claims were wrong. Only weeks later, in January 1968, the Tet Offensive attacked more than a hundred towns and cities and even entered the US embassy compound, proving that the enemy could still mount large attacks. Claims about government control of villages were also doubtful, since South Vietnam's government remained weak. The source is unreliable as evidence of the war's real progress, though it is reliable evidence of the official optimism that made Tet so damaging.", explanation: "Provenance plus content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh guerrilla tactics against politics in Vietnam and opinion in the USA."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how the war escalated under President Johnson.", points: [
        "Gulf of Tonkin incident, August 1964.",
        "Gulf of Tonkin Resolution gave Johnson power to act without declaring war.",
        "Operation Rolling Thunder bombing of the North from March 1965.",
        "First combat troops (Marines) landed at Da Nang in March 1965; numbers rose rapidly.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'The USA withdrew from Vietnam mainly because of the success of guerrilla tactics.' How far do you agree?", points: [
        ["For: ambushes, tunnels and the Ho Chi Minh Trail made the war unwinnable by firepower", 2],
        ["Also: South Vietnam's governments were weak and unpopular", 2],
        ["Also: opposition at home: casualties, draft, Tet, My Lai, Kent State", 2],
        ["Also: cost; Nixon's wish for 'peace with honour' and détente", 2],
        ["Supported judgement on 'mainly'", 2],
      ], levels: levels(10), modelAnswer: "Guerrilla tactics were very important. Viet Cong units ambushed patrols and vanished, hid in tunnels and were supplied along the Ho Chi Minh Trail, which bombing never closed. American firepower and search and destroy missions often killed civilians and turned villagers against them, so the USA won battles without winning the war.\n\nBut other factors explain why the USA actually withdrew. South Vietnam's governments were weak, corrupt and unpopular, so there was little for American troops to defend. At home, rising casualties, the draft and television coverage turned opinion against the war, especially after the Tet Offensive in 1968 and the revelation of My Lai. The cost was enormous, and Nixon wanted 'peace with honour' so that he could improve relations with the USSR and China.\n\nGuerrilla tactics explain why the USA could not win, but the decision to withdraw came mainly from loss of support at home: when Americans would no longer accept the cost of a war that could not be won quickly, Nixon pulled out.", explanation: "Levels: both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Domino theory", "The belief that if one country fell to communism, its neighbours would follow.");
  b.card("DEFINITION", "Vietnamisation", "Nixon's policy (from 1969) of handing the fighting to South Vietnam's army while US troops withdrew.");
  b.card("FACT", "What happened in the Gulf of Tonkin in August 1964?", "A reported attack on US destroyers led Congress to give Johnson power to use force without declaring war.");
  b.card("FACT", "When was the Tet Offensive?", "From 30-31 January 1968.");
  b.card("FACT", "When were the Paris Peace Accords signed?", "27 January 1973.");
  b.card("FACT", "When did Saigon fall?", "30 April 1975.");
  b.card("CONCEPT", "Why was Tet a turning point?", "It failed militarily but convinced many Americans that the war could not be won.");
  b.card("CONCEPT", "Why did search and destroy fail?", "Raids harmed civilians and turned villagers against the USA, creating Viet Cong recruits.");
  b.card("DEFINITION", "Ho Chi Minh Trail", "Network of paths through Laos and Cambodia carrying soldiers and supplies from North to South Vietnam.");
});
