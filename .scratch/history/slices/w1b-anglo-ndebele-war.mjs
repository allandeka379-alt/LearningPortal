// Slice W1b: the Anglo-Ndebele War, 1893-94 (ZIMSEC topic 7.3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonisation.anglo-ndebele-war", { file: "colonisation/anglo-ndebele-war", keyPrefix: "colonisation.anglo-ndebele-war" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which event in July 1893 gave the British South Africa Company its excuse to invade Matabeleland?",
    options: [
      ["The Victoria incident near Fort Victoria", "Correct: an Ndebele raid near Fort Victoria and the shooting of retreating Ndebele by Company troopers."],
      ["The Jameson Raid into the Transvaal republic", "The Jameson Raid was in December 1895 to January 1896, after the war."],
      ["The signing of the Rudd Concession at Bulawayo", "The Rudd Concession was signed on 30 October 1888."],
      ["The arrival of the Pioneer Column at Fort Salisbury", "The Pioneer Column reached Fort Salisbury on 12 September 1890."],
    ],
    answer: "A",
    explanation: "The **Victoria incident** (July 1893) was the trigger of the Anglo-Ndebele War. The deeper causes were the Company's economic problems and settler demands for land, cattle and labour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Company's disappointment with gold in Mashonaland make war with the Ndebele more likely?",
    options: [
      ["Its shares fell, and many believed richer gold lay in Matabeleland", "Correct: conquest promised land, cattle and possibly gold to rescue the Company's finances."],
      ["Lobengula had refused to sell the Company any gold from his own mines", "Lobengula did not run gold mines that the Company was trying to buy from."],
      ["The British government ordered the Company to find gold within two years", "No such order was given; the pressure came from shareholders and settlers."],
      ["Shona chiefs demanded that the Company drive the Ndebele out of the gold areas", "The war was driven by Company and settler interests, not by Shona demands."],
    ],
    answer: "A",
    explanation: "Mashonaland did not become the hoped-for \"second Rand\". With its shares losing value, the Company and its settlers looked to Matabeleland's land, cattle and possible gold.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What did the Victoria Agreement of August 1893 promise to settler volunteers?",
    options: [
      ["A farm, gold claims and a share of captured cattle", "Correct: these promises recruited men for the invasion."],
      ["A seat in a settler parliament and the vote", "Settlers had no parliament in 1893; the Legislative Council came in 1898."],
      ["Free transport back to Britain after six months of service", "No such promise was made; the aim was to settle men on the land."],
      ["A cash wage paid by the British government", "The British government did not pay the volunteers."],
    ],
    answer: "A",
    explanation: "Jameson's **Victoria Agreement** promised each volunteer a farm in Matabeleland, gold claims and a share of the \"loot\" cattle. It shows that land and cattle were central aims of the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which weapon gave the Company forces the greatest advantage at the battles of Shangani and Bembesi?",
    options: [
      ["Maxim machine guns fired from wagon laagers", "Correct: it cut down Ndebele regiments making frontal attacks."],
      ["Heavy artillery brought by rail from the Cape", "There was no railway to Matabeleland in 1893."],
      ["Aircraft used to bomb the Ndebele regiments", "Aircraft did not exist as weapons in 1893."],
      ["Poison gas released ahead of the advance", "Poison gas was first used in war in 1915."],
    ],
    answer: "A",
    explanation: "Ndebele regiments attacked the laagers bravely, but machine-gun and rifle fire at long range caused very heavy losses.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What did Lobengula do when the Company columns approached Bulawayo in November 1893?",
    options: [
      ["He ordered the town burnt and fled north", "Correct: Company troops entered the ruins on 4 November 1893."],
      ["He surrendered and signed a treaty of protection", "He never surrendered to the Company."],
      ["He fled south to seek help from the Transvaal", "He went north, towards the Zambezi."],
      ["He was captured and sent as a prisoner to Cape Town", "He was never captured; he died in the north early in 1894."],
    ],
    answer: "A",
    explanation: "Lobengula had his capital burnt and moved north. A patrol sent after him (the Shangani Patrol) was wiped out, and he died early in 1894.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which result of the war was a **long-term cause** of the 1896 rising in Matabeleland?",
    options: [
      ["The seizure of most Ndebele cattle by the Company and settlers", "Correct: cattle were the basis of Ndebele wealth and status."],
      ["The death of Major Allan Wilson's patrol at the Shangani River", "This was a Company loss during the war, not a grievance of the Ndebele."],
      ["The building of the Kariba Dam on the Zambezi", "Kariba was built in the 1950s."],
      ["The Land Apportionment Act passed by the settler parliament", "That Act was passed in 1930."],
    ],
    answer: "A",
    hints: ["Look for a result that hurt the Ndebele and was still felt in 1896."],
    explanation: "Loss of cattle, land in the Gwaai and Shangani reserves, forced labour and humiliation by the Native Police were all results of 1893-94 that fed the 1896 rising.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why were most Ndebele unwilling to move into the Gwaai and Shangani reserves after 1894?",
    options: [
      ["They were dry, tsetse-affected and far from markets", "Correct: the reserves were poor land compared with the high veld."],
      ["They were already full of Shona villages", "This was not the main objection; the land itself was poor."],
      ["The British government had promised the land to the Portuguese", "No such promise was made."],
      ["The reserves lay inside the Bechuanaland Protectorate", "They lay inside Matabeleland."],
    ],
    answer: "A",
    hints: ["Think about what cattle-keepers need from land."],
    explanation: "The Land Commission of 1894 created the Gwaai and Shangani reserves on poor land, while the best land near Bulawayo was pegged by settlers.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A student writes: \"The Ndebele lost in 1893 only because the Company had machine guns.\" Which statement gives the strongest reason to qualify this view?",
    options: [
      ["Costly frontal attacks and political division also mattered", "Correct: tactics and politics combined with technology."],
      ["The Ndebele had no firearms of any kind in 1893", "Untrue: the Ndebele had obtained rifles before 1893."],
      ["The Company had far more soldiers than the Ndebele had warriors in their regiments", "The invaders were fewer than the Ndebele regiments."],
      ["Lobengula refused to send his regiments to fight", "Ndebele regiments fought at Shangani and Bembesi."],
    ],
    answer: "A",
    hints: ["The correct option must be factually true and must add a cause other than weapons."],
    explanation: "Weapons were decisive in the battles, but a balanced answer adds the costly frontal tactics against defended positions and the divisions in the kingdom, where Lobengula had tried diplomacy to the last.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Shangani Patrol under Major Allan Wilson was wiped out by Ndebele regiments in December 1893.",
    answer: true,
    explanation: "True. On 4 December 1893 Wilson's small patrol, cut off by the rising Shangani River, was surrounded and killed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The war of 1893-94 brought the Company the rich goldfield it had hoped for, ending its financial problems.",
    answer: false,
    explanation: "False. No goldfield comparable with the Witwatersrand was found in Matabeleland, so the Company's financial problems continued.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in the events of 1893-94.",
    pairs: [
      ["Lobengula", "Ndebele king who fled north and died early in 1894"],
      ["Leander Starr Jameson", "Company administrator who planned the invasion"],
      ["Allan Wilson", "Commander of the patrol wiped out at the Shangani River"],
      ["Captain Lendy", "Officer whose troopers fired on the Ndebele near Fort Victoria"],
    ],
    explanation: "Jameson was the Company's administrator; Lendy led the troopers in the Victoria incident; Wilson led the Shangani Patrol; Lobengula was the Ndebele king.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Company forces enter the burnt royal town of Bulawayo",
      "The Victoria incident near Fort Victoria",
      "The Shangani Patrol is wiped out",
      "The Victoria Agreement is signed",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The incident came first and the agreement followed it within weeks."],
    explanation: "July 1893 Victoria incident; August 1893 Victoria Agreement; 4 November 1893 Bulawayo entered; 4 December 1893 Shangani Patrol wiped out.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Company forces entered Bulawayo on {{blank:a}}, and the Shangani Patrol was wiped out a month later on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["4 November 1893"], choices: ["4 November 1893", "30 October 1888", "12 September 1890", "4 December 1893"] },
      { id: "b", accepted: ["4 December 1893"], choices: ["4 December 1893", "4 November 1893", "29 October 1889", "1 October 1923"] },
    ],
    explanation: "4 November 1893 (Bulawayo) and 4 December 1893 (Shangani Patrol). 30 October 1888 is the Rudd Concession, 29 October 1889 the Royal Charter, 12 September 1890 the Pioneer Column at Fort Salisbury.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "After the war a Land Commission set up the {{blank:a}} and Shangani reserves for the Ndebele.",
    blanks: [{ id: "a", accepted: ["Gwaai"], choices: ["Gwaai", "Chiweshe", "Tribal Trust", "Matopos"] }],
    explanation: "The **Gwaai and Shangani reserves** were created in 1894. Tribal Trust Lands was a later name for African reserves.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the Ndebele king whose capital was Bulawayo in 1893.",
    accepted: ["Lobengula", "Lobhengula", "King Lobengula", "Lobengula Khumalo", "Lobhengula Khumalo"],
    wrong: ["Mzilikazi"],
    explanation: "**Lobengula** (also spelt Lobhengula) was king from 1870. His father Mzilikazi founded the Ndebele state.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** causes of the Anglo-Ndebele War of 1893-94.",
    points: [
      "The Company's financial problems/disappointing gold in Mashonaland and hopes of gold in Matabeleland.",
      "Settler demand for Ndebele land and cattle.",
      "Ndebele raids into Mashonaland that disrupted the labour supply / clash over authority over the Shona.",
      "The Victoria incident of July 1893 (or Jameson's plans and the Victoria Agreement).",
    ],
    modelAnswer: "The Company needed gold after the disappointment in Mashonaland; settlers wanted Ndebele land and cattle; Ndebele raids on Shona communities disrupted settler labour; the Victoria incident of July 1893 gave Jameson an excuse.",
    explanation: "One mark for each different cause; accept Jameson's plans or the Victoria Agreement as a cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the course of the Anglo-Ndebele War from October 1893 to early 1894.",
    points: [
      "Columns from Fort Salisbury and Fort Victoria advanced into Matabeleland (with a force from Bechuanaland).",
      "They formed laagers of wagons and used Maxim guns.",
      "Battle of Shangani (late October 1893): Ndebele attacks beaten off with heavy losses.",
      "Battle of Bembesi (1 November 1893): heavy Ndebele losses.",
      "Lobengula burnt Bulawayo and fled north; Company forces entered on 4 November 1893.",
      "The Shangani Patrol was wiped out on 4 December 1893; Lobengula died early in 1894.",
    ],
    hints: ["Work in order: advance, two battles, Bulawayo, the pursuit, the end."],
    modelAnswer: "In October 1893 columns from Fort Salisbury and Fort Victoria joined and marched on Bulawayo, while a smaller force came from Bechuanaland. At night they formed laagers and defended them with Maxim guns. At the Shangani in late October and at Bembesi on 1 November the Ndebele regiments attacked and suffered heavy losses. Lobengula ordered Bulawayo burnt and fled north, and the Company entered the town on 4 November. A patrol under Allan Wilson chased the king but was wiped out at the Shangani River on 4 December 1893. Lobengula died early in 1894.",
    explanation: "Credit accurate sequence with places and dates.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the war of 1893-94 affected the Ndebele economy.",
    points: [
      "Identifies loss of cattle.",
      "Explains: cattle were the basis of wealth, bridewealth and status, so households were impoverished.",
      "Identifies loss of land / removal to reserves.",
      "Explains: the Gwaai and Shangani reserves were dry and tsetse-affected, so farming and herding suffered (or: forced labour took men away from their own fields).",
    ],
    hints: ["Identify an effect, then say why it damaged the economy."],
    modelAnswer: "The Company and the settlers seized most Ndebele cattle; as cattle were the basis of wealth and marriage payments, many families became poor. Settlers pegged the best land near Bulawayo and the Ndebele were expected to move to the dry, tsetse-affected Gwaai and Shangani reserves, where it was hard to keep cattle or grow crops.",
    explanation: "Two marks for each effect: identify and explain.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Read the source and answer the questions.\n\n${source("Source A", "a letter by a fictional settler at Fort Victoria to his brother in England, August 1893", "Work on every farm and claim has stopped. Our boys ran into the hills when the Matabele came, and not one has come back. The Doctor [Jameson] says the country can never be settled while the king's regiments come and go as they please. Every man here is ready to ride; we are promised a farm and a share of the cattle, and they say the reefs beyond Bulawayo are richer than anything we have found.")}`,
    hints: ["For reliability, think about who wrote the letter, when, and what he stood to gain."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, why had work stopped near Fort Victoria?", points: [
        "African workers had fled when the Ndebele raiders came.",
        "None had returned, so farms and claims had no labour.",
      ], explanation: "Two points taken directly from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "What can you infer from Source A about the settlers' motives for war? Use the source to support your answer.", points: [
        "Inference: settlers wanted land (\"promised a farm\").",
        "Inference: settlers wanted cattle (\"a share of the cattle\").",
        "Inference: hope of gold (\"the reefs beyond Bulawayo are richer\").",
        "Inference: they wanted a reliable labour supply / end to Ndebele power (\"can never be settled while the king's regiments...\").",
      ], explanation: "One mark per supported inference." }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable is Source A as evidence of the causes of the Anglo-Ndebele War? Use the source and your own knowledge.", points: [
        "Provenance: a settler writing at the time, so an eyewitness of the scare at Fort Victoria.",
        "Provenance: he was one of the men promised land and cattle, so he had reasons to justify war.",
        "Content supported by own knowledge: the Victoria Agreement did promise farms and cattle.",
        "Content supported: raids did disrupt the labour supply in July 1893.",
        "Limitation: it shows only the settler view, not Lobengula's attempts at diplomacy or the Ndebele reasons for the raid.",
        "Judgement: reliable for settler motives, less reliable as a full account of the causes.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A is useful evidence because it was written at the time by a settler at Fort Victoria who saw the scare. What he says is supported by other evidence: the Ndebele raid in July 1893 did drive workers away, and Jameson's Victoria Agreement did promise farms and a share of the cattle. However, he was one of the men who stood to gain land and cattle, so he presents the war as necessary and says nothing of Lobengula's efforts to avoid war or of the Ndebele reasons for the raid. It is therefore reliable as evidence of what settlers wanted, but one-sided as an account of the causes.", explanation: "Best answers use both provenance and content checked against own knowledge, and reach a judgement." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain **one** cause of the war that is not mentioned in Source A.", points: [
        ["Identifies a cause not in the source, e.g. the Company's falling shares / Jameson's plans to provoke war / the dispute over Lobengula's authority over Shona communities.", 1],
        ["Explains how it led to war with developed reasoning.", 2],
        ["Supporting detail (date, name or example).", 1],
      ], explanation: "The source does not mention the Company's finances or the High Commissioner's approval." }),
    ],
    explanation: "A source-based practice question on the causes of the war (16 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (c), weigh the Ndebele losses against what the Company gained and failed to gain."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Victoria incident of July 1893.", points: [
        "An Ndebele force entered the Fort Victoria district.",
        "Its aim was to punish Shona communities (for taking telegraph wire/cattle).",
        "Jameson ordered the Ndebele commanders to leave.",
        "Company troopers under Lendy pursued and fired on the Ndebele, killing a number of them.",
      ], explanation: "Four accurate points in sequence." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "To what extent did the Company gain what it wanted from the war of 1893-94?", points: [
        ["Gained: control of Matabeleland and the end of the Ndebele state.", 2],
        ["Gained: land for settlers and most Ndebele cattle.", 2],
        ["Gained: labour from the defeated Ndebele and British recognition of its rule (1894).", 2],
        ["Not gained: no rich goldfield, so financial problems continued.", 2],
        ["Not gained: lasting peace; grievances led to the 1896 rising; supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The Company gained a great deal in the short term. The Ndebele state was destroyed, Bulawayo became a settler town and Matabeleland came under Company rule, which the British government accepted in 1894. Settlers pegged farms and took most of the Ndebele cattle, and defeated Ndebele men were forced to work.\n\nHowever, the Company's main hope, a rich goldfield, was not found, so its financial problems continued. Its harsh treatment of the Ndebele, especially the seizure of cattle and removal to the poor Gwaai and Shangani reserves, created grievances that exploded in 1896, when the Company nearly lost the country and the British government imposed closer control.\n\nOverall the Company gained what it wanted politically and in land and cattle, but failed economically and did not win lasting security.", explanation: "Both sides plus a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did Company forces enter Bulawayo?", "4 November 1893, after Lobengula had ordered it burnt.");
  b.card("FACT", "What was the trigger of the Anglo-Ndebele War?", "The Victoria incident, July 1893: an Ndebele raid near Fort Victoria and the shooting of Ndebele by Company troopers.");
  b.card("DEFINITION", "Victoria Agreement (1893)", "Jameson's promise to volunteers of a farm, gold claims and a share of captured cattle in return for fighting the Ndebele.");
  b.card("FACT", "Name two battles of the Anglo-Ndebele War.", "Shangani (late October 1893) and Bembesi (1 November 1893).");
  b.card("FACT", "What was the Shangani Patrol?", "Major Allan Wilson's patrol, sent after Lobengula, which was wiped out near the Shangani River on 4 December 1893.");
  b.card("CONCEPT", "Why did the Company want war in 1893?", "Mashonaland's gold disappointed and shares fell; settlers wanted Ndebele land, cattle and labour; Matabeleland was thought to hold richer gold.");
  b.card("CONCEPT", "Why did the Ndebele lose the battles of 1893?", "Maxim guns and laagers made frontal attacks very costly; the kingdom was divided over war; the invaders had horses and modern rifles.");
  b.card("FACT", "Which reserves were created for the Ndebele in 1894?", "The Gwaai and Shangani reserves: dry, tsetse-affected and far from markets.");
  b.card("CONCEPT", "How did the 1893-94 war lead to the 1896 rising?", "Loss of land, cattle and independence, forced labour and abuse by the Native Police created grievances that exploded in March 1896.");
});
