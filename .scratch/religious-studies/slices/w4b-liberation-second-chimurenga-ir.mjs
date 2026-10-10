// W4b: Indigenous Religion in the Second Chimurenga/Umvukela (Topic 13.2).
// Reviewer notes: details of taboos observed by fighters vary by area and by account, so the lesson and items speak only of
// "rules of conduct"; the Nehanda medium in Mozambique follows the brief (early 1970s); the song verse in the source item
// is original and labelled; no living politician is praised or blamed.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.liberation.second-chimurenga-ir", { file: "liberation/second-chimurenga-ir", keyPrefix: "liberation.second-chimurenga-ir" }, (b) => {
  mc(b, 1, "RECALL", "What is the meaning of **ancestral legitimacy**?",
    ["Belief that a cause has the approval of the ancestors and spirits", "Correct: a cause with ancestral legitimacy is thought to have the spirits' blessing."],
    [["The right of a government to collect taxes from its citizens", "That is the authority of a government, not ancestral approval."],
     ["The legal right of a family to inherit a house after a death", "That is inheritance law."],
     ["A rule that every child must be named after a dead relative", "That is a naming custom, not legitimacy."]],
    "**Ancestral legitimacy** is the belief that a cause is right and has the approval of the ancestors and territorial spirits.");
  mc(b, 1, "RECALL", "On which date did Zimbabwe become independent?",
    ["18 April 1980", "Correct: independence was on 18 April 1980."],
    [["11 November 1965", "That was the date of the unilateral declaration of independence by the Rhodesian government, not independence."],
     ["22 December 1987", "That was the date of the Unity Accord."],
     ["28 April 1966", "That was the date of the battle at Chinhoyi at the start of the war."]],
    "Zimbabwe became independent on **18 April 1980**.");
  mc(b, 2, "UNDERSTANDING", "Why did the approval of a spirit medium matter to guerrillas who arrived in a new area?",
    ["It showed villagers that the ancestors supported the fighters", "Correct: the medium's approval built trust."],
    [["It gave the fighters the right to collect tax from every home", "The medium's approval was religious and not a tax right."],
     ["It meant the fighters no longer had to ask villagers for any help", "Fighters still depended on food and information from villagers."],
     ["It proved that the medium commanded the soldiers on both sides", "A medium did not command the soldiers of both sides."]],
    "The approval of a medium told villagers that the **ancestors supported** the fighters, which built trust.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is remembered about the elderly Nehanda medium of the early 1970s?",
    ["She went with ZANLA into Mozambique", "Correct: this is remembered as a sign that the spirit of Nehanda supported the struggle."],
    [["She was executed with Kaguvi in April 1898 in Harare", "That refers to the mediums of the First Chimurenga."],
     ["She signed the Lancaster House agreement in London in 1979", "The agreement was signed by political delegations, not by a medium."],
     ["She opened a mission school for girls in Mutare in 1975", "She is remembered for her link with the fighters, not for a school."]],
    "The elderly Nehanda medium is remembered as having gone with **ZANLA into Mozambique** in the early 1970s.");
  mc(b, 3, "APPLICATION", "In a fictional village, a medium tells fighters to respect the sacred pool and not to harm the villagers. What does this show?",
    ["Mediums set rules of conduct that fighters were expected to follow", "Correct: rules of conduct, or taboos, were part of the link between fighters and spirits."],
    [["Religion played no part at all in how fighters and villagers met", "The example shows religion shaping the relationship."],
     ["Mediums were in command of the Rhodesian security forces in the area", "The example does not involve any command over the security forces."],
     ["Fighters had no need of the goodwill of the villagers in that area", "The war depended on the goodwill of villagers."]],
    "Mediums set **rules of conduct** (taboos) that were believed to protect fighters and keep the spirits' favour.",
    { daily: true, hints: ["Think about what the medium asks the fighters to do."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "a verse of an original song written for this question in the style of songs of the struggle",
    "Sing for Nehanda, the spirit who walks again;\nthe ancestors are with us in the night.\nThe land is ours and the graves are ours;\nwe walk together, and the dawn will come.") + "\n\nWhat does Source A suggest about the people who sang it?",
    ["They linked their struggle to the ancestors and to the earlier resistance", "Correct: they name Nehanda and say the ancestors are with them."],
    [["They believed that the struggle had no connection with the land", "The song speaks of the land and the graves."],
     ["They wished to forget the earlier resistance and the ancestors", "The song honours Nehanda and the ancestors."],
     ["They were singing a song of welcome for a newly appointed pastor", "The song is about the struggle and the ancestors."]],
    "The song names **Nehanda**, speaks of the ancestors and the land, and so links the struggle to the earlier resistance.",
    { hints: ["Look for the names and ideas in the song."] });
  mc(b, 4, "ANALYSIS", "Why should students be careful when judging how much the mediums influenced the war?",
    ["Accounts differ by area, and people hold different views", "Correct: memory, evidence and opinion vary, so a balanced judgement is needed."],
    [["There is general agreement that the mediums decided every battle", "No such agreement exists."],
     ["Mediums were present in only one village throughout the whole war", "Mediums were active in many areas, especially in the north-east."],
     ["All accounts of the war were written by the mediums themselves", "Accounts come from many people, including fighters, villagers and historians."]],
    "Accounts **differ by area** and people hold different views, so a balanced judgement is needed.",
    { hints: ["Think about the variety of evidence and opinion."] });
  mc(b, 4, "EVALUATION", "Which statement about Indigenous Religion in the war is the most balanced?",
    ["Mediums gave support, but the war had other causes too", "Correct: it recognises both the contribution and the limits."],
    [["The spirits alone won the war, and no human effort was needed", "This ignores the political and military struggle."],
     ["The mediums had no influence of any kind on the fighters", "Many communities remember their influence."],
     ["Every villager supported the mediums in exactly the same way", "Views differed, and some people did not accept the mediums."]],
    "A balanced answer notes the **legitimacy and support** the mediums gave, together with the other causes of the war and the different views.",
    { hints: ["Choose the answer that gives credit without claiming too much."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Second Chimurenga took place in the 1890s.",
    answer: false,
    explanation: "False. The 1890s saw the First Chimurenga (1896-97). The Second Chimurenga was mainly in the 1970s.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All Zimbabweans agree about how important the spirit mediums were in the war of the 1970s.",
    answer: false,
    explanation: "False. People hold different views: some stress the mediums' importance, some stress other causes, and some did not accept the mediums' authority.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Pungwe", "An all-night meeting of villagers and fighters with songs and teaching"],
      ["Svikiro", "A spirit medium through whom a spirit is believed to speak"],
      ["Mujibhas and chimbwidos", "Young helpers who carried messages and supported the fighters"],
      ["Chimurenga music", "Songs of the struggle that honoured the ancestors"],
    ],
    explanation: "Each term belongs to the religious and social life of the struggle.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In the early 1970s the elderly {{blank:a}} medium went with {{blank:b}} into Mozambique.",
    blanks: [
      { id: "a", accepted: ["Nehanda"], choices: ["Nehanda", "Mkwati", "Njelele", "Lobengula"] },
      { id: "b", accepted: ["ZANLA"], choices: ["ZANLA", "the Rhodesian army", "a mission church", "the United Nations"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "The **Nehanda** medium went with **ZANLA** into Mozambique.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to an all-night meeting of villagers and fighters during the war?",
    accepted: ["pungwe", "a pungwe", "pungwes"],
    wrong: ["bira"],
    explanation: "It is a **pungwe**.",
  });

  ms(b, 1, "RECALL", 3, "State **three** ways in which Indigenous Religion supported the guerrilla fighters.",
    ["Mediums gave ancestral approval to the cause", "Mediums advised and blessed fighters", "Fighters followed rules of conduct (taboos) set by the mediums, or songs and pungwe united fighters and villagers"],
    "Mediums gave ancestral approval to the cause, mediums advised and blessed fighters, and fighters followed rules of conduct set by the mediums.",
    "One mark for each way.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe the importance of chimurenga songs and pungwe gatherings in the struggle.",
    ["Songs honoured Nehanda, Kaguvi and the ancestors", "Songs carried messages of resistance and encouraged unity", "At a pungwe villagers and fighters met through the night to sing, dance and share news and teaching", "They built trust between fighters and communities and linked the war to the earlier resistance"],
    "Songs honoured Nehanda, Kaguvi and the ancestors and carried messages of resistance that encouraged unity. At a pungwe villagers and fighters met through the night to sing, dance and share news and teaching, which built trust between fighters and communities and linked the war to the earlier resistance.",
    "One mark for each point.",
    ["Think of the songs first and the gathering next."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** difficulties that villagers faced during the war.",
    [["Villagers were asked by the guerrillas for food, shelter and information", 1], ["Developed: this could leave them short of food and in danger from the security forces if they were found helping", 2],
     ["The security forces punished villages believed to be helping the fighters", 1], ["Developed: families lost homes and lives, or were moved, so many suffered fear and displacement", 2]],
    "Villagers were asked by the guerrillas for food, shelter and information, which could leave them short of food and in danger from the security forces if they were found helping. The security forces also punished villages believed to be helping the fighters, so families lost homes and lives or were moved, and many suffered fear and displacement.",
    "Two difficulties, each stated and developed. No graphic detail is required.",
    ["Think of the two sides that placed demands on villagers."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a recollection by a fictional grandmother, as told to her grandchild in Masvingo, 2026",
      "When the young fighters came to our village the headman took them to the medium first. She spoke for the spirit and said they could stay if they respected the sacred places and did not harm anyone. That night we had a pungwe and sang until morning. We were afraid of the soldiers, but we felt that the ancestors were with us.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "According to Source A, what was the first step taken by the headman?",
        ["He took the fighters to the medium", "Correct: the source says the headman took them to the medium first."],
        [["He sent the fighters away from the village at once and alone", "The source says the fighters were allowed to stay."],
         ["He held a pungwe before speaking with the medium or fighters", "The pungwe was held that night, after the medium had spoken."],
         ["He asked the soldiers for permission to host the fighters", "The source says the villagers were afraid of the soldiers."]],
        "The headman took the fighters to the medium first."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** conditions or events that show the role of religion in the relationship between the villagers and the fighters.",
        points: ["The medium spoke for the spirit and gave permission for the fighters to stay", "The fighters were told to respect the sacred places and not to harm anyone", "The villagers felt that the ancestors were with them, and they held a pungwe with songs"],
        modelAnswer: "The medium spoke for the spirit and gave permission for the fighters to stay. The fighters were told to respect the sacred places and not to harm anyone. The villagers felt that the ancestors were with them, and they held a pungwe with songs.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why the villagers' fear of the soldiers did not prevent them from welcoming the fighters.",
        points: [["The medium's approval gave the villagers confidence that the ancestors supported the fighters", 2], ["Belief in the ancestors' protection and a shared cause with the fighters made them willing to take the risk", 2]],
        modelAnswer: "The medium's approval gave the villagers confidence that the ancestors supported the fighters. Belief in the ancestors' protection, and a shared cause with the fighters, made them willing to take the risk despite their fear.",
      }),
    ],
    hints: ["In (c) link the medium's approval to the villagers' confidence."],
    explanation: "The source shows religion helping to build trust between villagers and fighters.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Themba says: \"The spirit mediums were the main reason the villagers supported the war.\" Nokuthula says: \"The villagers supported the war for many reasons, and the mediums were only one of them.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which mediums supported the fighters.",
        points: [["They gave ancestral approval, which built trust in the community", 2], ["They advised and blessed fighters and set rules of conduct (taboos)", 2]],
        modelAnswer: "They gave ancestral approval, which built trust between the community and the fighters. They also advised and blessed the fighters and set rules of conduct (taboos) for them to follow.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** other reason why villagers supported the struggle.",
        points: [["Loss of land and unfair laws caused resentment", 1], ["Developed: families wanted to regain land and to be treated equally", 1], ["The fighters were often relatives and neighbours' children", 1], ["Developed: kinship and shared hardship created loyalty", 1]],
        modelAnswer: "Loss of land and unfair laws caused resentment, and families wanted to regain land and to be treated equally. Many of the fighters were relatives and neighbours' children, so kinship and shared hardship created loyalty.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the importance of Indigenous Religion in the Second Chimurenga/Umvukela.",
        points: [["For: ancestral approval from mediums, taboos and blessings built trust and courage", 2], ["For: songs and pungwe linked the war to the first resistance and united villagers and fighters", 2], ["Against or limits: political and economic causes, military organisation, differing views of the mediums, and the suffering of civilians", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Indigenous Religion was important in many areas. Ancestral approval from the mediums, the taboos and the blessings built trust and courage, and songs and pungwe linked the war to the first resistance and united villagers and fighters. However, the war also had political, economic and military causes, people held different views of the mediums, and civilians suffered heavily. I conclude that Indigenous Religion gave the struggle legitimacy and community support, but it was one factor alongside others and not the only reason for the outcome.",
      }),
    ],
    hints: ["Give both the religious contribution and the other causes in (c), then decide."],
    explanation: "A strong answer weighs the religious contribution against other causes and views, and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is a **pungwe**?", "An all-night meeting of villagers and fighters during the war, with songs, dances, news and political teaching.");
  b.card("DEFINITION", "What is **ancestral legitimacy**?", "The belief that a cause has the approval and protection of the ancestors and territorial spirits.");
  b.card("FACT", "Which medium went with ZANLA into Mozambique in the early 1970s?", "The elderly Nehanda medium.");
  b.card("FACT", "In which part of Zimbabwe were the spirit mediums especially important to the war?", "The north-east.");
  b.card("FACT", "When did Zimbabwe become independent?", "18 April 1980.");
  b.card("FACT", "What were the mujibhas and chimbwidos?", "Young helpers who carried messages and supported the fighters.");
  b.card("CONCEPT", "How did mediums help guerrillas gain the trust of villagers?", "They said the ancestors approved the cause, introduced the fighters and set rules of conduct.");
  b.card("CONCEPT", "Why were songs and pungwe important?", "They united villagers and fighters and linked the war to Nehanda, Kaguvi and the ancestors.");
  b.card("CONCEPT", "Why should the role of the mediums be judged with balance?", "People hold different views, accounts differ by area, the war had other causes and civilians suffered.");
});
