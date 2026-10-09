// W3a: the Second Chimurenga/Umvukela, 1966-79 (her.liberation.second-chimurenga).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.liberation.second-chimurenga", { file: "liberation/second-chimurenga", keyPrefix: "liberation.second-chimurenga" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the **Battle of Chinhoyi** fought?",
    options: [
      ["28 April 1966", "Correct: it is remembered as the start of the armed struggle."],
      ["21 December 1972", "This is the date of the attack on Altena Farm."],
      ["11 November 1965", "This is the date of UDI."],
      ["21 December 1979", "This is when the Lancaster House Agreement was signed."],
    ],
    answer: "A",
    explanation: "Chinhoyi: 28 April 1966. Altena Farm: 21 December 1972. Lancaster House: 21 December 1979.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which army was the military wing of **ZAPU**?",
    options: [
      ["ZIPRA", "Correct: the Zimbabwe People's Revolutionary Army."],
      ["ZANLA", "ZANLA was the military wing of ZANU."],
      ["The BSAC Police", "This was the colonial police force."],
      ["The Patriotic Front", "The Patriotic Front was a 1976 alliance of ZANU and ZAPU, not an army."],
    ],
    answer: "A",
    explanation: "ZAPU → ZIPRA; ZANU → ZANLA.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "From which country did **ZANLA** mainly operate after 1975?",
    options: [
      ["Mozambique", "Correct: after Mozambique's independence in 1975 ZANLA used its whole border."],
      ["Zambia", "Zambia was the main rear base of ZIPRA."],
      ["Botswana", "Botswana was mainly a transit route, especially for ZIPRA recruits."],
      ["South Africa", "Apartheid South Africa supported the Rhodesian government."],
    ],
    answer: "A",
    explanation: "ZANLA operated mainly from Mozambique; ZIPRA mainly from Zambia.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main aim of **UDI** in 1965?",
    options: [
      ["To keep white minority rule by breaking away from Britain", "Correct."],
      ["To hand power to the African majority after an election", "UDI was declared to prevent majority rule."],
      ["To join the Federation of Rhodesia and Nyasaland once more", "The Federation had ended in 1963."],
      ["To end the land laws that divided the country by race", "The Rhodesian Front kept and tightened the land laws."],
    ],
    answer: "A",
    explanation: "Smith's government declared independence without British agreement to avoid majority rule.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which camp near Lusaka in Zambia was attacked by Rhodesian forces in **October 1978**?",
    options: [
      ["Freedom Camp", "Correct."],
      ["Chimoio", "Chimoio, in Mozambique, was attacked on 23 November 1977."],
      ["Nyadzonia", "Nyadzonia, in Mozambique, was attacked on 9 August 1976."],
      ["Altena Farm", "Altena Farm was a farm in the Centenary area attacked by ZANLA in 1972."],
    ],
    answer: "A",
    explanation: "Nyadzonia 9 August 1976; Chimoio 23 November 1977; Freedom Camp 19 October 1978.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the nationalist movements turn to **armed struggle** in the 1960s?",
    options: [
      ["Peaceful parties were banned and talks did not bring majority rule", "Correct: peaceful means had been closed off."],
      ["Britain asked them to fight the Rhodesian Front on its behalf", "Britain did not ask the nationalists to fight."],
      ["The United Nations ordered an armed rising against UDI in 1965 and supplied the weapons", "The UN imposed sanctions; it did not order a rising."],
      ["The Lancaster House Agreement had failed to give them land", "Lancaster House came at the end of the war, in 1979."],
    ],
    hints: ["What happened to the peaceful parties?"],
    answer: "A",
    explanation: "Bans on the ANC, NDP, ZAPU and ZANU, detention of leaders, UDI and failed talks convinced nationalists that only armed struggle remained.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A Rhodesian official in 1977 orders villagers to move into a fenced \"protected village\". What was the **main** purpose of this policy?",
    options: [
      ["To cut the guerrillas off from food and information", "Correct: the keeps aimed to separate people from fighters."],
      ["To provide better schools and clinics for rural people", "The keeps were a military measure; conditions were often poor."],
      ["To prepare villagers to vote in the 1980 elections", "The policy was a war measure, not an election plan."],
      ["To return land taken under the Land Apportionment Act", "No land was returned; people were moved and controlled."],
    ],
    hints: ["Who depended on the villagers' support?"],
    answer: "A",
    explanation: "Guerrilla warfare depended on the people, so the government tried to separate them from the fighters.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why the Lancaster House talks succeeded where earlier talks failed?",
    options: [
      ["War, regional and international pressure made both sides accept compromise", "Correct: the combined pressures explain the outcome."],
      ["The Rhodesian army had won the war and could set its own terms", "The war had not been won by either side; Rhodesia was under great strain."],
      ["The Internal Settlement had already been recognised by every country", "Zimbabwe-Rhodesia was not recognised internationally."],
      ["The Patriotic Front had been excluded, so agreement was easier", "The Patriotic Front took part; excluding it was why the Internal Settlement failed."],
    ],
    hints: ["Think of several pressures together."],
    answer: "A",
    explanation: "The strain of the war, the Frontline States' urging and international pressure combined.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Lancaster House conference was held in London from September to December 1979.",
    answer: true,
    explanation: "True. The agreement was signed on 21 December 1979.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Internal Settlement of 1978 was recognised internationally and ended the war.",
    answer: false,
    explanation: "False. It excluded the Patriotic Front, was not recognised internationally, and the war continued.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its date.",
    pairs: [
      ["UDI", "11 November 1965"],
      ["Battle of Chinhoyi", "28 April 1966"],
      ["Attack on Altena Farm", "21 December 1972"],
      ["Lancaster House Agreement signed", "21 December 1979"],
    ],
    explanation: "Note the two 21 December dates, seven years apart.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each attempt at a settlement with what happened.",
    pairs: [
      ["Victoria Falls conference (1975)", "Held in a train on the bridge; failed"],
      ["Pearce Commission (1972)", "Africans rejected the proposed settlement"],
      ["Internal Settlement (1978)", "Led to Zimbabwe-Rhodesia; not recognised"],
      ["Lancaster House (1979)", "Ceasefire, new constitution and elections"],
    ],
    explanation: "Only Lancaster House included all parties and ended the war.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "In 1976 ZANU and ZAPU formed an alliance called the {{blank:a}}. ZANLA received most of its foreign support from {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Patriotic Front"], choices: ["Patriotic Front", "Frontline States", "Rhodesian Front", "Unity Accord"] },
      { id: "b", accepted: ["China"], choices: ["China", "Britain", "South Africa", "Portugal"] },
    ],
    explanation: "The Patriotic Front (1976). ZANLA was supported mainly by China, ZIPRA mainly by the Soviet Union.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Ndebele name for the liberation struggle? (one word)",
    accepted: ["Umvukela", "Umvukela wesibili"],
    wrong: ["Chimurenga"],
    explanation: "**Umvukela** (Ndebele); **Chimurenga** (Shona).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** causes of the Second Chimurenga/Umvukela.",
    points: ["Land alienation / land laws", "Political exclusion (few Africans could vote)", "Racial discrimination in jobs, schools, wages or services", "Banning of nationalist parties / UDI / failed talks"],
    modelAnswer: "Land alienation; political exclusion, since few Africans could vote; racial discrimination; and the banning of nationalist parties followed by UDI.",
    explanation: "One mark per cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** terms of the Lancaster House Agreement.",
    points: [
      "Reserved seats",
      "Developed: 20 of the 100 House of Assembly seats were reserved for whites for seven years",
      "Protection of property",
      "Developed: land could be bought only on a willing-buyer willing-seller basis for ten years",
    ],
    modelAnswer: "The constitution reserved 20 of the 100 seats in the House of Assembly for whites for seven years, protecting white political representation. It also protected property, so for ten years the government could buy land only on a willing-buyer willing-seller basis, which slowed land reform.",
    hints: ["One political term, one about land."],
    explanation: "Two marks per developed term; a ceasefire and supervised elections are also creditworthy.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **three** effects of the Second Chimurenga/Umvukela on the people of Zimbabwe.",
    points: [
      "Independence / majority rule", "Developed: Africans gained the vote and control of government on 18 April 1980",
      "Loss of life and injury", "Developed: tens of thousands died, many of them civilians; families lost members",
      "Displacement and damage", "Developed: refugees, protected villages, destroyed homes, schools and cattle",
    ],
    modelAnswer: "The war led to independence on 18 April 1980, so Africans gained the vote and control of their own government. It cost tens of thousands of lives, many of them civilians, and left many people wounded. Many people became refugees or were moved into protected villages, and homes, schools, clinics and cattle were destroyed.",
    hints: ["Consider positive and negative effects."],
    explanation: "Two marks per developed effect.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the list of events, given in the order in which they happened.\n\n" + table(["Order", "Event"], [
      ["First", "ZAPU banned"],
      ["Second", "ZANU banned"],
      ["Third", "UDI"],
      ["Fourth", "Battle of Chinhoyi; talks on HMS Tiger fail"],
      ["Fifth", "Pearce Commission; attack on Altena Farm"],
      ["Sixth", "Mozambique independent; Victoria Falls conference fails"],
      ["Seventh", "Lancaster House Agreement"],
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which event on the timeline gave ZANLA a long border from which to operate?",
        options: [
          ["Mozambique's independence", "Correct: ZANLA could now use the whole eastern border."],
          ["The Pearce Commission", "This tested a proposed settlement; it did not provide a border."],
          ["The banning of ZANU", "The ban pushed ZANU into exile but gave it no base."],
          ["The talks on HMS Tiger", "These talks were between Britain and Rhodesia."],
        ],
        answer: "A",
        explanation: "After 1975 ZANLA operated along the whole eastern border from Mozambique.",
      }),
      P.tf({
        label: "(b)",
        stem: "According to the list, both nationalist parties had been banned before UDI was declared.",
        answer: true,
        explanation: "True: ZAPU (1962) and ZANU (1964) were both banned before UDI (1965).",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Using the list, explain how **three** events pushed the nationalists towards armed struggle or helped it grow.",
        points: [
          "Bans on ZAPU and ZANU", "Developed: closed peaceful politics, so leaders turned to armed struggle from exile",
          "UDI / failed talks", "Developed: showed that the settler government would not accept majority rule",
          "Altena Farm / Mozambique's independence", "Developed: new guerrilla strategy with rural support / long border allowed the war to spread",
        ],
        modelAnswer: "The bans on ZAPU and ZANU closed peaceful politics, so the leaders organised armed struggle from exile. UDI and the failure of the Tiger talks showed that the settler government would not accept majority rule by negotiation. The Altena Farm attack began a guerrilla strategy based on rural support, and Mozambique's independence in 1975 gave ZANLA a long border, so the war spread across the country.",
      }),
    ],
    hints: ["Link each event to its result."],
    explanation: "Using a chronological list to explain the growth of the struggle.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: source("Source A", "a letter by a fictional retired teacher from Chinhoyi to a community newsletter, 2026", `Young people sometimes ask me who won our independence. I tell them it was not one army or one party. ZANLA fought in the east and ZIPRA in the west. Villagers fed and hid them, and boys and girls carried messages. Our neighbours in Mozambique and Zambia sheltered refugees, even when their own people were attacked. Without all of them, there would have been no Lancaster House.`),
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Identify **four** groups that the writer of Source A credits with winning independence.",
        points: ["ZANLA", "ZIPRA", "Villagers / the masses", "Young messengers (mujibhas and chimbwidos) or neighbouring countries (Mozambique and Zambia)"],
        modelAnswer: "ZANLA, ZIPRA, the villagers who fed and hid the fighters, and neighbouring countries such as Mozambique and Zambia.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Independence was won by the freedom fighters alone.\" Using the source and your own knowledge, how far do you agree?",
        points: [
          ["For: ZANLA and ZIPRA fought the war; their pressure made Rhodesia negotiate", 2],
          ["Against: the masses, mujibhas and chimbwidos supplied food, shelter and information; guerrilla war depended on them", 2],
          ["Against: Frontline States (Mozambique, Zambia, Tanzania, Botswana) provided bases and pressed for talks; sanctions and diplomacy also mattered", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The freedom fighters of ZANLA and ZIPRA did the fighting, and their pressure placed the Rhodesian government under great strain, forcing it to negotiate.\n\nHowever, guerrilla war depended on the people. Villagers fed and hid the fighters, and mujibhas and chimbwidos carried messages and warned of danger, as Source A says. The Frontline States gave bases and shelter to refugees, even when attacked, and pressed for talks; international sanctions and diplomacy also helped bring about Lancaster House.\n\nI therefore disagree: the fighters were essential, but independence was won by many groups working together.",
      }),
    ],
    hints: ["Use the source and add groups it does not name."],
    explanation: "Evaluating who won independence.",
  });

  b.card("FACT", "Date of the Battle of Chinhoyi?", "28 April 1966.");
  b.card("FACT", "Date of UDI?", "11 November 1965.");
  b.card("FACT", "When was the Lancaster House Agreement signed?", "21 December 1979.");
  b.card("FACT", "Dates of the attacks on Nyadzonia, Chimoio and Freedom Camp?", "9 August 1976; 23 November 1977; 19 October 1978.");
  b.card("FACT", "Military wings of ZANU and ZAPU?", "ZANU: ZANLA. ZAPU: ZIPRA.");
  b.card("DEFINITION", "Guerrilla warfare", "Fighting by small mobile groups that attack and withdraw, relying on the support of local people.");
  b.card("DEFINITION", "Patriotic Front", "The 1976 alliance of ZANU and ZAPU for negotiations.");
  b.card("CONCEPT", "Why did the nationalists turn to armed struggle?", "Parties were banned, leaders detained, UDI blocked majority rule and talks failed.");
  b.card("CONCEPT", "Two Lancaster House terms on seats and land?", "20 of 100 seats reserved for whites for seven years; willing-buyer willing-seller land purchase for ten years.");
});
