// W1b: ahist.risings.course-results (ZIMSEC topic 7).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.risings.course-results", { file: "risings/course-results", keyPrefix: "risings.course-results" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where did the Ndebele hold out against the Company after the first months of fighting in 1896?",
    options: [
      ["In the Matopo Hills", "Correct: the broken rocky country protected them."],
      ["In the Zambezi valley near Tete", "The Ndebele did not retreat there."],
      ["On the coast near Beira", "The coast was far from the fighting."],
      ["In the city of Cape Town, where their delegation went to meet the High Commissioner", "No such move took place."],
    ],
    answer: "A",
    explanation: "The Ndebele withdrew to the Matopo Hills, which the Company could not easily attack.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the purpose of the Matopos indabas of 1896?",
    options: [
      ["To end the Ndebele fighting by negotiation between Rhodes and the Ndebele leaders", "Correct: the indabas brought the Ndebele campaign to an end."],
      ["To plan the Shona rising in Mashonaland with the Ndebele leaders", "They were peace talks, not a rising."],
      ["To arrange the surrender of the Company and its police to the Ndebele leaders in the Matopos", "The Company did not surrender."],
      ["To appoint a new king for the Ndebele people", "No king was appointed."],
    ],
    answer: "A",
    explanation: "Rhodes met the Ndebele indunas in the Matopos in August and October 1896 to end the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following describes how the Company fought the Shona in 1896-97?",
    options: [
      ["It attacked chiefs one at a time, burning crops and using dynamite on caves", "Correct: strongholds were taken one by one."],
      ["It made peace with all the Shona chiefs at one great indaba held at Salisbury", "There was no single settlement with the Shona."],
      ["It left the Shona alone while it fought only in Matabeleland and the Matopos", "It fought the Shona in 1896-97."],
      ["It used no soldiers at all, relying on missionaries", "It used soldiers and imperial troops."],
    ],
    answer: "A",
    explanation: "The Company attacked strongholds one by one with troops, burning crops and using dynamite on caves.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Who were executed at Salisbury in April 1898?",
    options: [
      ["Kaguvi and Nehanda, mediums who had led the Shona", "Correct: they were tried and executed."],
      ["Mkwati and Mashayamombe, who were both captured in 1896", "Mashayamombe died in 1897, and Mkwati is not recorded as executed."],
      ["Somabulana and Sekombo", "They made peace at the indabas."],
      ["Lobengula and Mzilikazi", "Mzilikazi died in 1868, and Lobengula in early 1894."],
    ],
    answer: "A",
    hints: ["Think of the mediums of Mashonaland."],
    explanation: "Kaguvi and Nehanda were captured in 1897 and executed in April 1898.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Ndebele leaders agree to talk to Rhodes in 1896?",
    options: [
      ["Hunger and the lost harvest made continued war difficult", "Correct: the people were exhausted."],
      ["They had defeated the Company completely and wanted to dictate terms", "They had not defeated the Company."],
      ["The British government had ordered them to surrender", "The Company, not the government, negotiated."],
      ["Their king Lobengula had returned from exile to order peace after he heard of the war", "Lobengula had died in 1894."],
    ],
    answer: "A",
    hints: ["Think about the planting season and the supplies."],
    explanation: "The war disrupted farming, hunger spread, and the Ndebele could not continue indefinitely; Rhodes offered redress.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which administrative change followed the risings?",
    options: [
      ["Native Commissioners and salaried chiefs became the basis of local administration", "Correct: the Native Department was reorganised."],
      ["The Company was abolished and Britain took direct control of the administration", "The Company continued to rule until 1923."],
      ["The Native Police was expanded to twice its former size", "Rhodes promised restraint of the Native Police."],
      ["Africans were given the vote in all districts and a share of seats in the Legislative Council", "Africans did not receive the vote in this way."],
    ],
    answer: "A",
    hints: ["Think of who dealt with chiefs after 1898."],
    explanation: "Native Commissioners and salaried chiefs were the means of local control after the risings, and the 1898 Order in Council gave Britain more say.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the Mashonaland fighting lasted longer than the Matabeleland fighting?",
    options: [
      ["The Shona fought in separate groups from strongholds that had to be taken one by one, with no single settlement", "Correct: there was no central command or peace."],
      ["The Shona had many more modern weapons than the Company and used them better", "The Company had the superior weapons."],
      ["The Company refused to fight in Mashonaland until 1898", "It fought there in 1896-97."],
      ["Rhodes made a second indaba in Mashonaland in 1896 which the Shona then ignored, so the war went on", "He held the indabas in the Matopos."],
    ],
    answer: "A",
    hints: ["Think of local chiefs and mediums fighting from their own strongholds."],
    explanation: "Shona resistance was organised by chiefs and mediums in different districts, so each stronghold had to be reduced and no single peace could end it.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about the results of the risings is best supported by the evidence?",
    options: [
      ["The risings failed to restore independence but led to changes in the Company's methods of rule", "Correct: control was strengthened and administration was reformed."],
      ["The risings succeeded and the Company left the country", "The Company stayed."],
      ["The risings had no effect on the Company's policies or its way of ruling", "The administration changed after 1897."],
      ["The risings made settler rule impossible and ended all land alienation from 1897 onwards in every district", "Land alienation continued."],
    ],
    answer: "A",
    hints: ["Compare what the Africans wanted with what happened."],
    explanation: "The Company won, but it reorganised the Native Department and the imperial government gained more say.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Kaguvi and Nehanda were executed in April 1898.",
    answer: true,
    explanation: "True. They had been captured in 1897 and were tried and executed at Salisbury.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Matopos indabas ended the fighting in Mashonaland.",
    answer: false,
    explanation: "False. The indabas ended the Ndebele fighting in 1896. The Shona fighting continued into 1897.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians accept that African losses in the risings were far greater than settler losses, although the exact numbers are not known.",
    answer: true,
    hints: ["Think of fighting, hunger and disease."],
    explanation: "True. About 450 settlers died, while African deaths ran to many thousands, through fighting, hunger and disease.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his or her role in the risings.",
    pairs: [
      ["Mashayamombe", "Shona chief in the Hartley area who held out until 1897"],
      ["Somabulana", "Ndebele induna who took part in the indabas"],
      ["Frederick Burnham", "American scout who claimed to have shot the Mlimo in June 1896"],
      ["Nehanda", "Medium of the Mazowe region who was executed in 1898"],
    ],
    explanation: "These four names are often needed in answers on the course of the risings.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each event with its date.",
    pairs: [
      ["Ndebele attacks begin", "March 1896"],
      ["Shona rising begins in Mashonaland", "June 1896"],
      ["The Matopos indabas", "August - October 1896"],
      ["Execution of Kaguvi and Nehanda", "April 1898"],
    ],
    hints: ["The dates run from 1896 to 1898."],
    explanation: "March 1896; June 1896; August to October 1896; April 1898.",
  });
  {
    const events = [
      "The Ndebele rising begins",
      "The Shona rising begins",
      "Rhodes holds the Matopos indabas",
      "Kaguvi and Nehanda are executed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are March 1896, June 1896, August to October 1896 and April 1898."],
      explanation: "March 1896; June 1896; August-October 1896; April 1898.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Rhodes met the Ndebele leaders in the {{blank:a}} Hills in {{blank:b}} 1896 to end the fighting.",
    blanks: [
      { id: "a", accepted: ["Matopo"], choices: ["Matopo", "Chimanimani", "Nyanga", "Mazowe"] },
      { id: "b", accepted: ["August"], choices: ["March", "June", "August", "December"] },
    ],
    explanation: "The first indaba in the Matopo Hills was in August 1896; talks continued until October.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Shona medium of the Mazowe region who was executed in April 1898.",
    accepted: ["Nehanda", "Nehanda Nyakasikana", "Nyakasikana"],
    wrong: ["Kaguvi"],
    explanation: "**Nehanda** (Nyakasikana). Kaguvi was executed with her.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Shona rising of 1896-97.",
    points: ["It began in June 1896 in Mashonaland, around Mazowe and Hartley", "It was led by chiefs and mediums such as Mashayamombe, Makoni, Kaguvi and Nehanda", "Shona fighters used hills and caves as strongholds", "The Company took the strongholds one by one in 1896-97 and executed Kaguvi and Nehanda in 1898"],
    modelAnswer: "The Shona rising began in June 1896 in Mashonaland, around Mazowe and Hartley. It was led by chiefs and mediums such as Mashayamombe, Makoni, Kaguvi and Nehanda. The fighters used hills and caves as strongholds, and the Company took them one by one in 1896-97. Kaguvi and Nehanda were executed in 1898.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Rhodes held the indabas with the Ndebele leaders in the Matopos.",
    points: [["The Company's military efforts in the Matopos were failing and costly", 2], ["The imperial government was concerned, and peace would release the Company's forces and allow the economy to recover", 2]],
    hints: ["Think of cost and the wish to end the war."],
    modelAnswer: "The Company's military efforts in the Matopos were failing and costing a great deal. The imperial government was concerned about the war, and peace would release the Company's forces and allow the economy to recover.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the risings changed the way the Company governed Africans.",
    points: [["Native Commissioners were placed in every district and chiefs were paid salaries, tying them to the administration", 2], ["The imperial government obtained more say through the Order in Council of 1898, and the Native Police was reined in", 2]],
    hints: ["Think of the Native Department and the 1898 Order in Council."],
    modelAnswer: "After the risings Native Commissioners were placed in every district and chiefs were paid salaries, which tied them to the administration. The imperial government gained more say through the Order in Council of 1898, and the Native Police was reined in.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional settler trooper to his family, 1896",
        "We have been out in the hills for three weeks and have found the enemy hard to catch. They fire from the rocks and vanish. Our horses are dying and the men have fever. If the chiefs would talk, there would be an end to it."),
      "",
      source("Source B", "an account told by a fictional Ndebele elder about the peace talks of 1896",
        "The chiefs went to meet the white leader because the fields were empty and the people were hungry. He came with few men and listened. We did not think we had lost our right to the land, but we could not eat stones."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the Company's difficulties in the Matopos?", points: ["The Ndebele fought from the rocks and were hard to catch", "Horses were dying and the men had fever / the Company would welcome talks"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about why the talks took place?", points: [["Agree: both suggest each side was suffering and ready to talk", 2], ["Differ: A stresses military difficulty for the Company, B stresses hunger among the Ndebele and says nothing of the Company's problems", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources as evidence of why the Matopos indabas succeeded?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is contemporary and from a participant, but it is one trooper's view of one patrol", 2], ["B gives the Ndebele view, but it was told later and may be shaped by hindsight", 2], ["Own knowledge: hunger, the cost of the campaign and Rhodes's offers explain the settlement; the sources together support this", 2]], modelAnswer: "Source A is useful because it was written at the time by a participant and shows the Company's difficulties in the hills, but it describes only one man's patrol. Source B gives the Ndebele side and stresses hunger, but it was told later and may reflect hindsight. My own knowledge supports both: the campaign was costly and failing, the Ndebele were hungry, and Rhodes offered redress. Taken together they show that both sides had reasons to settle." }),
    ],
    hints: ["For (c), consider who wrote each source and when."],
    explanation: "Both sources are invented: a trooper's letter and an elder's account.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the results of the 1896-97 risings for the Ndebele and Shona.",
    levels: levels(8),
    points: [
      ["Loss of life, hunger and disease, and the destruction of crops and cattle", 2],
      ["Greater Company control, reorganised administration, Native Commissioners and salaried chiefs", 2],
      ["Concessions and long-term significance: Order in Council, the Native Police restrained, and the risings as an inspiration", 2],
      ["Judgement on whether the results were mainly negative", 2],
    ],
    hints: ["Weigh the immediate losses against the longer-term changes and memory."],
    modelAnswer: "For Africans, the immediate results were severe. Thousands died in fighting, hunger and disease, fields and cattle were lost, and the Company's control was tightened. The Native Department was reorganised, with Native Commissioners and salaried chiefs fitting Africans into the administration. There were some concessions: the Native Police was restrained, and the Order in Council of 1898 gave Britain more say over the Company. In the long term the risings became a source of pride and an inspiration for later nationalists. I conclude that the results were mainly negative in the short term, but the memory of resistance was a lasting gain.",
    explanation: "Credit explained results and a supported judgement.",
  });

  b.card("DEFINITION", "What was an indaba?", "A Nguni word for a meeting between leaders; the Matopos indabas of 1896 were the peace talks between Rhodes and the Ndebele leaders.");
  b.card("FACT", "When did the Ndebele and Shona risings begin?", "Ndebele in March 1896; Shona in June 1896.");
  b.card("FACT", "Where did the Ndebele hold out in 1896?", "In the Matopo Hills.");
  b.card("FACT", "When did the Matopos indabas take place?", "August to October 1896.");
  b.card("FACT", "When were Kaguvi and Nehanda executed?", "April 1898, at Salisbury.");
  b.card("FACT", "Roughly how many settlers died in the risings?", "About 450, according to the usual estimates; African deaths were far greater.");
  b.card("CONCEPT", "Why did the Shona fighting last longer than the Ndebele fighting?", "Chiefs and mediums fought from separate strongholds that had to be taken one by one, and there was no single peace.");
  b.card("CONCEPT", "How did the risings change Company rule?", "Native Commissioners and salaried chiefs, the Order in Council of 1898 and greater imperial say.");
  b.card("CONCEPT", "Why were the risings important later?", "They became a source of pride and an inspiration for the nationalists of the Second Chimurenga.");
});
