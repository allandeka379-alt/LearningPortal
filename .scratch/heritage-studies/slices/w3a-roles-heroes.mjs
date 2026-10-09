// W3a: roles of the people in the liberation struggle; national heroes and heroines (her.liberation.roles-heroes).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.liberation.roles-heroes", { file: "liberation/roles-heroes", keyPrefix: "liberation.roles-heroes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name was given to **girls and young women** who helped the freedom fighters?",
    options: [
      ["Chimbwidos", "Correct."],
      ["Mujibhas", "Mujibhas were boys and young men."],
      ["Izinduna", "Izinduna were Ndebele officials and commanders."],
      ["Masvikiro", "Masvikiro are spirit mediums."],
    ],
    answer: "A",
    explanation: "Chimbwidos (zvimbwido) were girls and young women; mujibhas were boys and young men.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where is the **National Heroes Acre**?",
    options: [
      ["Harare", "Correct."],
      ["Bulawayo", "Bulawayo is the second city; the national shrine is in the capital."],
      ["Masvingo", "Masvingo is near Great Zimbabwe, a world heritage site."],
      ["Chinhoyi", "Chinhoyi is linked with the battle of 28 April 1966."],
    ],
    answer: "A",
    explanation: "The National Heroes Acre is in Harare.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which was the **main** role of the masses in the liberation struggle?",
    options: [
      ["Feeding, hiding and informing the freedom fighters", "Correct."],
      ["Negotiating the Lancaster House Agreement in London", "Leaders negotiated at Lancaster House."],
      ["Supplying aircraft and heavy weapons to the armies", "Weapons came from foreign supporters."],
      ["Running the refugee camps in Mozambique and Zambia", "The camps were run by the movements with host countries."],
    ],
    answer: "A",
    explanation: "Guerrilla war depended on villagers for food, shelter and information.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these countries was **one of the Frontline States**?",
    options: [
      ["Tanzania", "Correct: with Zambia, Botswana, Mozambique and Angola."],
      ["South Africa", "Apartheid South Africa supported the Rhodesian government."],
      ["Portugal", "Portugal was a colonial power in Mozambique until 1975."],
      ["Britain", "Britain was the colonial power; it hosted the Lancaster House talks."],
    ],
    answer: "A",
    explanation: "The Frontline States: Tanzania, Zambia, Botswana, Mozambique and Angola.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did **spirit mediums** support the liberation struggle?",
    options: [
      ["By giving spiritual guidance and linking the war to the ancestors", "Correct."],
      ["By commanding the regular units of the Rhodesian army", "Spirit mediums supported the liberation movements."],
      ["By signing treaties with Britain on behalf of the armies", "No spirit medium signed treaties."],
      ["By running the radio stations broadcasting from Lusaka", "Broadcasting was done by the movements' information departments."],
    ],
    answer: "A",
    explanation: "Mediums blessed fighters, advised on customs and sacred places, and linked the struggle to the First Chimurenga.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In 1977 a boy in a village near Mt Darwin watches the road and runs to warn fighters when soldiers approach. Which role is he playing?",
    options: [
      ["A mujibha acting as a lookout", "Correct."],
      ["A chimbwido cooking for fighters", "Chimbwidos were girls; the boy is a lookout."],
      ["A spirit medium giving guidance", "He is not a medium; he is gathering information."],
      ["A refugee crossing the border", "He has stayed in the village."],
    ],
    hints: ["Boy or girl? What is he doing?"],
    answer: "A",
    explanation: "Mujibhas acted as lookouts, messengers and guides.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Frontline States pay **a heavy price** for supporting the struggle?",
    options: [
      ["Rhodesian forces attacked camps, bridges and roads in their territory", "Correct: e.g. Nyadzonia, Chimoio and Freedom Camp."],
      ["The United Nations imposed trade sanctions on all of them for helping the movements", "UN sanctions were imposed on Rhodesia, not on them."],
      ["They had to pay compensation to Britain after Lancaster House", "There was no such compensation."],
      ["Their own citizens were made to vote in Rhodesian elections", "This did not happen."],
    ],
    hints: ["What happened at Chimoio and Freedom Camp?"],
    answer: "A",
    explanation: "Hosting bases and refugees exposed them to attacks and economic losses.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why the struggle is often called a \"people's war\"?",
    options: [
      ["Its success depended on the support of ordinary people as well as fighters", "Correct."],
      ["Every adult in the country carried a weapon and fought in battles against the Rhodesian army", "Most people did not fight; they supported the fighters."],
      ["It was fought only by civilians, without any trained armies", "ZANLA and ZIPRA were trained armies."],
      ["The people voted to start the war in a national referendum", "There was no referendum on the war."],
    ],
    hints: ["Who besides the fighters made guerrilla war possible?"],
    answer: "A",
    explanation: "Guerrilla war cannot succeed without civilian support, so the people were central.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Heroes Day is commemorated on the second Monday of August.",
    answer: true,
    explanation: "True. Defence Forces Day follows on the Tuesday.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Tomb of the Unknown Soldier honours only the leaders of the liberation movements.",
    answer: false,
    explanation: "False. It honours the many fighters and civilians whose graves are unknown.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each group with its role in the liberation struggle.",
    pairs: [
      ["Churches and missions", "Treated the wounded and publicised abuses"],
      ["Students", "Protested and crossed borders to join the struggle"],
      ["Workers", "Organised strikes and sent money and supplies"],
      ["The OAU Liberation Committee", "Gave money, supplies and recognition"],
    ],
    explanation: "Many groups contributed in different ways.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Night political meetings held with villagers were called {{blank:a}}. The OAU Liberation Committee was based in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["pungwe"], choices: ["pungwe", "bira", "nhimbe", "indaba"] },
      { id: "b", accepted: ["Dar es Salaam"], choices: ["Dar es Salaam", "Gaborone", "Addis Ababa", "London"] },
    ],
    explanation: "Pungwe were night meetings; the Liberation Committee was in Dar es Salaam.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name was given to **boys and young men** who carried messages and acted as lookouts for the fighters? (one word)",
    accepted: ["mujibha", "mujibhas", "mujiba", "mujibas"],
    wrong: ["chimbwido"],
    explanation: "**Mujibhas** were boys and young men; chimbwidos were girls and young women.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which heroes and heroines are honoured in Zimbabwe.",
    points: ["Burial at the National Heroes Acre or a provincial heroes acre with state honours", "Commemoration on Heroes Day", "Naming roads, schools or buildings after them / support for their families"],
    modelAnswer: "They are buried with state honours at the National Heroes Acre or a provincial heroes acre, they are remembered on Heroes Day, and roads and schools are named after them.",
    explanation: "One mark per way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** roles of mujibhas and chimbwidos in the liberation struggle.",
    points: [
      "Carried messages / acted as lookouts",
      "Developed: warned fighters of soldiers nearby, so they could avoid ambush",
      "Cooked, washed and carried supplies",
      "Developed: fighters could keep moving and fighting without carrying everything themselves",
    ],
    modelAnswer: "Mujibhas acted as lookouts and messengers, warning fighters when soldiers were nearby so that they could avoid ambush. Chimbwidos cooked, washed clothes and carried supplies, so the fighters could keep moving and fighting.",
    hints: ["Say what they did and how it helped."],
    explanation: "Two marks per developed role.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** risks that rural people faced by supporting the freedom fighters.",
    points: [
      "Punishment by Rhodesian forces",
      "Developed: villages could be punished, people beaten, detained or killed if support was discovered",
      "Loss of homes and food / forced removal",
      "Developed: homes burned, food taken, or people moved into protected villages",
    ],
    modelAnswer: "If the Rhodesian forces discovered that a village had supported the fighters, people could be beaten, detained or killed. Villages also lost food and homes, and many people were moved into protected villages, where conditions were often hard.",
    hints: ["What happened when support was discovered?"],
    explanation: "Two marks per developed risk.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Suggest **three** ways in which a school could honour the people who contributed to the liberation struggle, explaining why each is valuable.",
    points: [
      "Oral history project", "Developed: students record stories of elders, preserving memories of ordinary people",
      "Visit to a heroes acre or liberation heritage site", "Developed: students see and learn the history directly",
      "Heroes Day assembly / essay or drama", "Developed: builds national identity and respect across all groups",
    ],
    modelAnswer: "Students could record the stories of elderly relatives who fed fighters or worked as mujibhas and chimbwidos, so that the memories of ordinary people are preserved. The school could visit a heroes acre or liberation heritage site, so students learn the history directly. It could also hold a Heroes Day assembly or drama, which builds respect for everyone who contributed and strengthens national identity.",
    hints: ["Think of activities that include ordinary people too."],
    explanation: "Two marks per developed suggestion.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "an account by a fictional former chimbwido from Mutoko, recorded for a school history project in 2026", `I was fourteen when the comrades first came to our village. My mother cooked for them, and I carried the pots to the hills at night. Sometimes I carried messages to the next village. The soldiers came and beat my uncle because they thought he knew where the comrades were. Later we were all moved into a keep, where we could leave only in the daytime.`),
    parts: [
      P.mcq({
        label: "(a)", stem: "What was a \"keep\" in Source A?",
        options: [
          ["A protected village used to separate people from the fighters", "Correct."],
          ["A base camp used by the freedom fighters in the hills", "The fighters hid in the hills; the keep was a government measure."],
          ["A granary where the village stored grain for the dry season", "A keep was not a granary."],
          ["A school built by missionaries for the village children", "A keep was a fenced village controlled by the government."],
        ],
        answer: "A",
        explanation: "Keeps were fenced protected villages that cut people off from the fighters.",
      }),
      P.tf({
        label: "(b)",
        stem: "Source A shows that civilians who supported the fighters could be punished.",
        answer: true,
        explanation: "True: the uncle was beaten by soldiers.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the source, explain **two** roles the writer and her family played in the struggle.",
        points: [
          "Cooking and carrying food",
          "Developed: the mother cooked and the girl carried pots at night, keeping the fighters fed",
          "Carrying messages",
          "Developed: linked villages and fighters, passing on information",
        ],
        modelAnswer: "The mother cooked for the fighters and the writer carried the pots to the hills at night, so the fighters were fed. The writer also carried messages to the next village, passing on information that helped the fighters.",
      }),
    ],
    hints: ["Quote from the source."],
    explanation: "Reading a source on the role of chimbwidos.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on outside support for the liberation struggle.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which the Frontline States supported the struggle.",
        points: [
          "Bases and transit routes",
          "Developed: ZANLA in Mozambique, ZIPRA in Zambia, with transit through Botswana",
          "Shelter for refugees / diplomatic support",
          "Developed: refugee camps; urged talks and spoke for the movements internationally",
        ],
        modelAnswer: "The Frontline States gave the movements bases and routes: ZANLA operated mainly from Mozambique and ZIPRA from Zambia, with recruits passing through Botswana. They also sheltered refugees in camps and gave diplomatic support, speaking for the movements and pressing for a settlement.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Outside support was more important than support from inside the country.\" How far do you agree?",
        points: [
          ["For outside: bases, training, weapons and refuge; diplomacy and sanctions; Frontline States pressed for Lancaster House", 2],
          ["For inside: guerrilla war depended on the masses for food, shelter and information", 2],
          ["For inside: mujibhas, chimbwidos, spirit mediums, workers and students; recruits came from inside", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Outside support was very important. The Frontline States gave bases, transit routes and refuge, foreign supporters provided training and weapons, and international sanctions and diplomacy put pressure on Rhodesia. The Frontline States also pressed both sides to settle at Lancaster House.\n\nHowever, the war was fought inside the country, where the fighters depended on the masses for food, shelter and information. Mujibhas and chimbwidos acted as messengers and lookouts, spirit mediums gave guidance, and almost every recruit came from inside.\n\nI disagree with the statement: outside support made the war possible, but inside support made it succeed. The two depended on each other.",
      }),
    ],
    hints: ["Consider what each kind of support provided."],
    explanation: "Evaluating inside and outside support.",
  });

  b.card("DEFINITION", "Mujibha", "A boy or young man who helped the freedom fighters as messenger, lookout or guide.");
  b.card("DEFINITION", "Chimbwido", "A girl or young woman who helped the fighters by cooking, carrying supplies and messages.");
  b.card("DEFINITION", "Frontline States", "Tanzania, Zambia, Botswana, Mozambique and Angola: neighbours that supported the liberation struggle.");
  b.card("FACT", "Where is the National Heroes Acre?", "Harare.");
  b.card("FACT", "When is Heroes Day?", "The second Monday of August (Defence Forces Day is the Tuesday).");
  b.card("FACT", "Where was the OAU Liberation Committee based?", "Dar es Salaam, Tanzania.");
  b.card("CONCEPT", "Why is the struggle called a people's war?", "The fighters depended on ordinary people for food, shelter and information.");
  b.card("CONCEPT", "What does the Tomb of the Unknown Soldier honour?", "Fighters and civilians who died and whose graves are unknown.");
  b.card("CONCEPT", "Two roles of spirit mediums?", "Spiritual guidance and blessing; linking the struggle to the ancestors and the First Chimurenga.");
});
