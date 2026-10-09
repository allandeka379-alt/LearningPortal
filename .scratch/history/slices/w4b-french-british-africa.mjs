// Slice W4b: French and British rule in Africa - Senegal and Nigeria (0470 Option A key question 5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.imperialism.french-british-africa", { file: "imperialism/french-british-africa", keyPrefix: "imperialism.french-british-africa" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the French governor who expanded Senegal inland from 1854?",
    options: [
      ["Louis Faidherbe", "Correct: he was governor in 1854-1861 and 1863-1865."],
      ["Frederick Lugard", "Lugard was the British High Commissioner of Northern Nigeria."],
      ["Blaise Diagne", "Diagne was the first Black African elected to the French parliament, in 1914."],
      ["Umar Tal", "Umar Tal was a West African Muslim leader whose forces fought the French."],
    ],
    answer: "A",
    explanation: "**Faidherbe** built forts along the Senegal River and created the Tirailleurs Sénégalais.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Muslim state in northern Nigeria did Lugard's forces conquer in 1903?",
    options: [
      ["The Sokoto Caliphate", "Correct: Kano and Sokoto were captured in 1903."],
      ["The Asante kingdom", "Asante is in present-day Ghana and was conquered by Britain separately."],
      ["The Kingdom of Dahomey", "Dahomey was conquered by France in the 1890s."],
      ["The Mutapa state", "Mutapa was in present-day Zimbabwe and Mozambique."],
    ],
    answer: "A",
    explanation: "The **Sokoto Caliphate** was a large state of emirates; Lugard then ruled through its emirs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the French policy of assimilation?",
    options: [
      ["Making colonised people culturally and legally French", "Correct: through the French language, education, law and, for a few, citizenship."],
      ["Ruling through existing African kings and emirs", "This describes British indirect rule."],
      ["Leaving African societies entirely unchanged under French protection", "Assimilation aimed to change them."],
      ["Granting full independence to every colony after a period of training", "Independence was not the aim of French policy in this period."],
    ],
    answer: "A",
    explanation: "**Assimilation** aimed to make Africans French; in practice citizenship went to very few.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under indirect rule in Northern Nigeria, who governed at local level?",
    options: [
      ["Emirs, supervised by British Residents", "Correct: Native Authorities collected taxes and ran courts."],
      ["French commandants de cercle appointed from Paris", "These were officials in French West Africa."],
      ["Elected councils chosen by all adult Nigerians", "There were no such elections."],
      ["Officers of the Royal Navy based in Lagos", "The navy did not run local government."],
    ],
    answer: "A",
    explanation: "Under **indirect rule**, emirs governed through Native Authorities under British supervision.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which towns made up the Four Communes of Senegal?",
    options: [
      ["Saint-Louis, Gorée, Rufisque and Dakar", "Correct: their African inhabitants had French citizenship rights."],
      ["Lagos, Kano, Sokoto and Ibadan", "These are Nigerian towns under British rule."],
      ["Algiers, Tunis, Rabat and Cairo", "These are North African cities."],
      ["Bamako, Timbuktu, Conakry and Abidjan", "These were in other French colonies, not the Four Communes."],
    ],
    answer: "A",
    explanation: "The **Four Communes** were Saint-Louis, Gorée, Rufisque and Dakar.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Lugard choose to rule Northern Nigeria through the emirs?",
    options: [
      ["He had few officials and little money, and the emirates already had working systems", "Correct: tax systems and courts could be used."],
      ["The British government ordered him to give the emirs full independence after 1903", "The emirs remained under British authority."],
      ["The emirs had invited the British to take over their states in 1900", "The British conquered Kano and Sokoto by force in 1903."],
      ["The French had already trained the emirs to serve as colonial officials", "Northern Nigeria was British, not French."],
    ],
    hints: ["Think about what Lugard lacked and what the emirates already had."],
    answer: "A",
    explanation: "**Shortage of staff and money** and the **existing structures** of the Caliphate made indirect rule practical.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did indirect rule cause problems among many Igbo communities in south-eastern Nigeria?",
    options: [
      ["They had no single rulers, so the British appointed unpopular warrant chiefs", "Correct: these chiefs had no traditional authority."],
      ["They were all Muslims who rejected any form of rule by Christian outsiders from Britain", "Most Igbo were not Muslims; this describes neither the problem nor the people."],
      ["The emirs of Sokoto refused to let the British enter the south-east", "The emirates were in the north and had no power over the south-east."],
      ["They had been made French citizens and refused British rule", "French citizenship applied only in the Four Communes of Senegal."],
    ],
    hints: ["Indirect rule needs existing rulers."],
    answer: "A",
    explanation: "Where there were **no kings**, the British created **warrant chiefs**, who were often resented.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best supports the view that French and British rule were similar in their impact on most Africans?",
    options: [
      ["Both imposed taxes and labour demands and gave most Africans no say in government", "Correct: the experience of ordinary people was often alike."],
      ["France granted citizenship in the Four Communes", "This is a difference between the systems."],
      ["Britain kept the emirs in power in Northern Nigeria", "This is a difference between the systems."],
      ["France used the French language in its schools, while Britain often used local languages", "This is a feature of French policy, not a similarity."],
    ],
    hints: ["Look for something true of both systems."],
    answer: "A",
    explanation: "Despite different theories, both systems **taxed, demanded labour and denied political rights** to most Africans.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Northern and Southern Nigeria were joined into a single colony on 1 January 1914.",
    answer: true,
    explanation: "True. Lugard became Governor-General of the amalgamated colony.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under the indigénat, French subjects in West Africa had the right to a trial before being punished.",
    answer: false,
    explanation: "False. The indigénat allowed officials to punish subjects without trial and to demand forced labour.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Indirect rule", "Governing through existing African rulers under British supervision"],
      ["Assimilation", "Making colonised people French in culture and law"],
      ["Indigénat", "French rules allowing punishment of subjects without trial"],
      ["Tirailleurs Sénégalais", "African soldiers serving under French officers"],
    ],
    explanation: "Indirect rule (Britain), assimilation and the indigénat (France), Tirailleurs Sénégalais (created 1857).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "British capture Kano and Sokoto",
      "Faidherbe becomes governor of Senegal",
      "Amalgamation of Nigeria",
      "Britain annexes Lagos",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Faidherbe's governorship began in the 1850s."],
    explanation: "Faidherbe (1854); Lagos (1861); Kano and Sokoto (1903); amalgamation (1914).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Faidherbe encouraged Senegalese farmers to grow {{blank:a}} for export to France. Under indirect rule, British officials who supervised the emirs were called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["groundnuts"], choices: ["groundnuts", "tobacco", "tea", "rubber"] },
      { id: "b", accepted: ["Residents"], choices: ["Residents", "Commandants", "Governors-General", "Warrant chiefs"] },
    ],
    explanation: "**Groundnuts** were Senegal's main export crop; British **Residents** supervised the emirs.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the British official who introduced indirect rule in Northern Nigeria.",
    accepted: ["Lugard", "Frederick Lugard", "Lord Lugard", "Sir Frederick Lugard", "F. D. Lugard", "Frederick John Dealtry Lugard"],
    wrong: ["Faidherbe"],
    explanation: "**Lugard** was High Commissioner of Northern Nigeria from 1900.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how indirect rule worked in Northern Nigeria.",
    points: [
      "Emirs stayed in office if they accepted British authority.",
      "British Residents supervised and advised them / could remove them.",
      "Native Authorities collected taxes and kept part in native treasuries.",
      "Native courts used Islamic law / missionaries were restricted in the north.",
    ],
    modelAnswer: "After the conquest of 1903, emirs who accepted British authority stayed in office. British Residents supervised and advised them and could have them removed. The emirs' Native Authorities collected taxes, keeping part in native treasuries for local services, and native courts continued to judge cases using Islamic law. Christian missionaries were kept out of much of the Muslim north to avoid unrest.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why French assimilation benefited only a small number of Africans in Senegal.",
    points: [
      "Identifies that citizenship was limited to the Four Communes / very few qualified.",
      "Explains that most Africans were subjects without political rights.",
      "Identifies the indigénat.",
      "Explains that subjects could be punished without trial and forced to work, so French rule was harsh for most.",
    ],
    hints: ["Who were citizens and who were subjects?"],
    modelAnswer: "French citizenship was limited mainly to the inhabitants of the Four Communes, and very few other Africans ever qualified, so most were subjects without political rights. Subjects were governed under the indigénat, which allowed French officials to punish them without trial and to demand forced labour. A small educated elite gained jobs and rights, but for most Africans French rule meant taxes and labour demands, not equality.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the impact of colonial rule differed between groups of Africans in Senegal and Nigeria.",
    points: [
      "Identifies elites who gained (originaires / educated clerks / emirs).",
      "Explains that citizens of the Four Communes gained votes and a deputy, and emirs kept or increased their power.",
      "Identifies ordinary people / subjects who suffered.",
      "Explains that they faced taxes, forced labour and the indigénat or chiefs' demands.",
      "Identifies regional differences (northern and south-eastern Nigeria).",
      "Explains that the north kept its rulers but had little Western education, while warrant chiefs caused anger in the south-east.",
    ],
    hints: ["Compare elites with ordinary people, and one region with another."],
    modelAnswer: "Some Africans gained from colonial rule. The originaires of the Four Communes voted and sent a deputy to Paris, and a small educated elite became clerks and teachers. In Northern Nigeria the emirs kept their positions, and with British backing some became more powerful than before. Ordinary people had a very different experience: French subjects faced the indigénat and forced labour, and Nigerians paid taxes to Native Authorities and grew export crops. There were also regional differences: the Muslim north kept its rulers but received little Western education, while in the south-east the British imposed warrant chiefs who had no traditional authority and were widely resented.",
    explanation: "Two marks per developed difference.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a report by a fictional British Resident in Northern Nigeria to his superiors, 1908", "The Emir collects the tax with less trouble than any European officer could. His courts keep order, and the people obey him as they did before our arrival. My task is to advise, not to command, though when advice is not taken I make my views known firmly. This is government at small cost to the Treasury.")}\n\n${source("Source B", "a statement by a fictional farmer from a village in northern Nigeria, recorded by a visiting researcher in the 1960s, remembering the 1910s", "Before the Europeans, the emir's men took our grain when they wished. After they came, the emir's men still took it, but now they took coins as well, and nobody could complain, because the white man stood behind the emir.")}`,
    hints: ["Compare the official view with the memory of an ordinary farmer."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the advantages of indirect rule for the British?", points: [
        "It was cheap ('small cost to the Treasury').",
        "It used existing authority to collect taxes and keep order.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B challenge the view of indirect rule given in Source A?", points: [
        "Agree: both show the emir continued to collect taxes / held power.",
        "Agree: both show the British stood behind the emir.",
        "Challenge: A presents it as orderly and accepted; B shows heavier burdens (coins as well as grain) and no way to complain.",
        "Challenge: A says the British only advise; B suggests British power protected the emir's demands.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How reliable are these sources as evidence of the impact of indirect rule? Use the sources and your own knowledge.", points: [
        "A: official report by a Resident, who wanted to show his district was well run; describes the system as intended.",
        "A confirmed: emirs collected taxes and ran courts; indirect rule was cheap (own knowledge).",
        "B: an ordinary person's view, rarely recorded; but memory recorded fifty years later and after independence.",
        "B confirmed: taxes in cash were introduced; emirs' power was backed by the British.",
        "Both partial: one region; neither shows the south-east (warrant chiefs).",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is an official report by a British Resident to his superiors, so he had reason to show that his district was well run and cheap; it describes indirect rule as it was meant to work. My knowledge confirms that emirs collected taxes and ran courts under British supervision and that the system was cheap. Source B gives the rare view of an ordinary farmer, which makes it valuable, but it was recorded about fifty years later, after independence, so memory and later attitudes may have shaped it. Its claims fit what I know: cash taxes were introduced, and the emirs' power was backed by British force. Both are reliable for part of the picture: A for how the British saw the system, B for how it felt to some subjects. Neither covers the south-east, where warrant chiefs caused much greater anger.", explanation: "Reliability judged from provenance and from content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider elites and ordinary people, citizens and subjects, and different regions."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the work of Faidherbe in Senegal.", points: [
        "Governor of Senegal 1854-1861 and 1863-1865; expanded French control inland along the Senegal River with forts.",
        "Fought African resistance, e.g. Umar Tal's forces at Médine (1857).",
        "Created the Tirailleurs Sénégalais (1857).",
        "School for chiefs' sons / encouraged groundnut exports / Dakar occupied.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "\"French and British rule had very different impacts on Africans.\" How far do you agree? Explain your answer.", points: [
        ["Different: French direct rule turned chiefs into agents; British kept emirs with real power.", 2],
        ["Different: citizenship and a deputy for the Four Communes; French-language elite; no equivalent in Nigeria.", 2],
        ["Similar: taxes, forced labour or labour demands, export crops in both.", 2],
        ["Similar: most Africans had no political rights; rule backed by force in both.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "There were real differences. In French West Africa chiefs became agents appointed and dismissed by French officials, while in Northern Nigeria the emirs kept much of their authority, their courts and their tax systems. France gave citizenship and a deputy in Paris to the Four Communes and educated a French-speaking elite, which had no equivalent in Nigeria, where Western education in the north was limited.\n\nHowever, for most Africans the impact was similar. In both territories people paid taxes, often in cash, and were pressed to grow export crops such as groundnuts. French subjects faced the indigénat and forced labour, and Nigerians faced the demands of Native Authorities backed by British force. In neither system did most Africans have any say in government.\n\nOverall I only partly agree. The systems had very different effects on African rulers and elites, but for ordinary people the experience of taxation, labour and rule without consent was much the same.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Assimilation", "French policy of making colonised people culturally and legally French.");
  b.card("DEFINITION", "Indirect rule", "British system of governing through existing African rulers under the supervision of British officials.");
  b.card("DEFINITION", "Indigénat", "French rules allowing officials to punish African subjects without trial and demand forced labour.");
  b.card("FACT", "Who was Louis Faidherbe?", "French governor of Senegal (1854-1861, 1863-1865) who expanded the colony and created the Tirailleurs Sénégalais.");
  b.card("FACT", "What were the Four Communes?", "Saint-Louis, Gorée, Rufisque and Dakar, whose African inhabitants had French citizenship rights.");
  b.card("FACT", "When did Lugard's forces capture Kano and Sokoto?", "1903.");
  b.card("FACT", "When was Nigeria amalgamated?", "1 January 1914, with Lugard as Governor-General.");
  b.card("DEFINITION", "Warrant chiefs", "Chiefs appointed by the British in south-eastern Nigeria, where there had been no single rulers; often resented.");
  b.card("CONCEPT", "Why did Lugard use indirect rule?", "Few officials, little money, and the Sokoto Caliphate's existing rulers, taxes and courts could be used.");
});
