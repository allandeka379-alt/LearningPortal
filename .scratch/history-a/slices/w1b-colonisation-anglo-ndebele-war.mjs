// W1b: ahist.colonisation.anglo-ndebele-war (ZIMSEC topic 6).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.colonisation.anglo-ndebele-war", { file: "colonisation/anglo-ndebele-war", keyPrefix: "colonisation.anglo-ndebele-war" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which incident of July 1893 is regarded as the trigger of the Anglo-Ndebele War?",
    options: [
      ["The Victoria incident near Fort Victoria", "Correct: an Ndebele impi was fired on after it was ordered to withdraw."],
      ["The signing of the Rudd Concession at Bulawayo", "This was in 1888, five years earlier."],
      ["The destruction of the Shangani Patrol in December", "This took place during the war."],
      ["The Matabeleland Order in Council of 1894", "This was a result of the war."],
    ],
    answer: "A",
    explanation: "The Victoria incident near Fort Victoria, in July 1893, was used by Jameson to justify the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Victoria Agreement of August 1893 promise to volunteers?",
    options: [
      ["A farm of about 6,000 acres, 20 gold claims and a share of captured cattle", "Correct: rewards were offered to attract volunteers."],
      ["A guaranteed wage of fifty pounds a month paid by the British Treasury", "The volunteers were rewarded with land and loot."],
      ["The right to rule the Ndebele as chiefs", "No such right was promised."],
      ["Free passage to Britain after the war", "No such promise was made."],
    ],
    answer: "A",
    explanation: "The Company attracted about 700 volunteers by promising land, claims and a share in the cattle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which weapon gave the Company's force its decisive advantage at Shangani and Bembesi?",
    options: [
      ["The Maxim gun", "Correct: it broke the Ndebele charges."],
      ["Spears and shields captured from the Shona", "The Company relied on modern weapons."],
      ["Cannon taken from Fort Salisbury", "The Maxim was the key weapon."],
      ["Poisoned water in the rivers of Matabeleland, which weakened the Ndebele fighters", "No such tactic was used."],
    ],
    answer: "A",
    explanation: "A small number of Maxim guns, with rifles and laager defence, stopped massed Ndebele attacks.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened at Bulawayo in early November 1893?",
    options: [
      ["It was found burnt and abandoned by Lobengula, and the Company occupied it", "Correct: the king had set it alight and moved north."],
      ["It was defended in a long siege by the Ndebele regiments", "There was no siege at that point."],
      ["It was handed over by treaty to the Company on the king's order", "He did not hand it over."],
      ["It was attacked by Shona fighters allied to the king", "The Shona were not his allies."],
    ],
    answer: "A",
    hints: ["Think about what Lobengula did before the Company arrived."],
    explanation: "Lobengula had burnt his capital and moved north; the Company's columns entered the ruins on 3-4 November.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to the Shangani Patrol in December 1893?",
    options: [
      ["It was cut off while pursuing Lobengula and was wiped out", "Correct: all 34 men died."],
      ["It captured Lobengula and brought him back to Bulawayo", "He was never captured."],
      ["It made a treaty with the Ndebele indunas", "No treaty was made."],
      ["It returned safely after burying the king at Shangani", "The patrol did not return."],
    ],
    answer: "A",
    hints: ["Think of what the patrol was pursuing."],
    explanation: "Major Allan Wilson's party crossed the Shangani river after the king, was cut off from the main column and was destroyed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was an underlying cause, rather than the trigger, of the war?",
    options: [
      ["The Company's wish to take Matabeleland's land and wealth", "Correct: this lay behind the war."],
      ["The shooting of an Ndebele party near Fort Victoria", "This was the trigger."],
      ["The Ndebele impi sent to punish Shona near Fort Victoria in July 1893", "This was part of the trigger."],
      ["The decision of Jameson to order the Ndebele to withdraw", "This was part of the trigger events."],
    ],
    answer: "A",
    hints: ["The underlying cause existed before July 1893."],
    explanation: "The Company's wish for Matabeleland was a long-term motive; the incidents near Fort Victoria were the events that set off the war.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the Ndebele lost the war despite their large numbers?",
    options: [
      ["The Company's Maxim guns and rifles defeated massed charges, and Lobengula's leadership was divided and hesitant", "Correct: military technology and political weakness together."],
      ["The Ndebele had no weapons of any kind", "They had spears and some firearms."],
      ["The Shona army fought alongside the Company in every battle and supplied most of its soldiers", "Some Shona helped, but they were not the main force."],
      ["The Company's soldiers were far more numerous than the Ndebele army and surrounded it at Bulawayo before the battle of Bembesi in November", "The Ndebele outnumbered them."],
    ],
    answer: "A",
    hints: ["Consider both weapons and leadership."],
    explanation: "A small, well-armed force with Maxim guns beat larger numbers, and Ndebele leadership was divided about whether to fight.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which result of the war is most directly linked to the causes of the 1896 Umvukela?",
    options: [
      ["The seizure of Ndebele cattle and land", "Correct: these grievances persisted until 1896."],
      ["The death of Allan Wilson at the Shangani river", "This was a loss on the Company's side."],
      ["The signing of the Moffat Treaty", "This was before the war."],
      ["The arrival of the Pioneer Column in 1890", "This was before the war."],
    ],
    answer: "A",
    hints: ["Which result made life harder for the Ndebele?"],
    explanation: "The loss of land and cattle after 1893-94 was one of the main grievances of the Ndebele in 1896.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Battle of Bembesi took place on 1 November 1893.",
    answer: true,
    explanation: "True. Bembesi followed Shangani (25 October).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Lobengula surrendered to the Company at Bulawayo in 1893.",
    answer: false,
    explanation: "False. He left Bulawayo, moved north and died early in 1894 without surrendering.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Company claimed that Lobengula had no right to raid the Shona and presented itself as their protector, although some historians see this as a pretext.",
    answer: true,
    hints: ["Think about the Company's other policies towards the Shona."],
    explanation: "True. The Company used the Shona as a reason for war, but historians point to its own interest in land and gold.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each name or term with its meaning.",
    pairs: [
      ["Leander Starr Jameson", "The Company's administrator who ordered the war"],
      ["Allan Wilson", "Commander of the Shangani Patrol"],
      ["Maxim gun", "An early machine-gun used by the Company's force"],
      ["Impi", "A fighting force or army of the Ndebele"],
    ],
    explanation: "These terms are needed for answers on the war.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each event with its date.",
    pairs: [
      ["The Victoria incident", "July 1893"],
      ["The Battle of Shangani", "25 October 1893"],
      ["The Battle of Bembesi", "1 November 1893"],
      ["The destruction of the Shangani Patrol", "4 December 1893"],
    ],
    hints: ["All four events took place in 1893."],
    explanation: "July 1893; 25 October; 1 November; 4 December.",
  });
  {
    const events = [
      "The Victoria incident",
      "The Battle of Bembesi",
      "Bulawayo is found burnt and occupied",
      "The Shangani Patrol is destroyed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates run from July to December 1893."],
      explanation: "July; 1 November; 3-4 November; 4 December 1893.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Company's force defeated the Ndebele at {{blank:a}} on 1 November 1893 using {{blank:b}} guns.",
    blanks: [
      { id: "a", accepted: ["Bembesi"], choices: ["Bembesi", "Adwa", "Sedan", "Chinhoyi"] },
      { id: "b", accepted: ["Maxim"], choices: ["Maxim", "Gatling", "Zulu", "Flintlock"] },
    ],
    explanation: "Bembesi was fought on 1 November 1893, and the Maxim gun was the decisive weapon.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Company's administrator who ordered the war against the Ndebele in 1893. Give his surname.",
    accepted: ["Jameson", "Leander Starr Jameson", "Dr Jameson", "Starr Jameson"],
    wrong: ["Rhodes"],
    explanation: "**Jameson**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Victoria incident of July 1893.",
    points: ["Shona people near Fort Victoria were said to have taken cattle or cut telegraph wire", "Lobengula sent an impi to punish them", "Jameson ordered the Ndebele to withdraw", "A Company patrol fired on the Ndebele as they withdrew, killing a number"],
    modelAnswer: "Shona people near Fort Victoria were said to have taken cattle and cut telegraph wire. Lobengula sent an impi to punish them, and Jameson ordered it to withdraw. As the Ndebele withdrew, a Company patrol fired on them and killed a number.",
    explanation: "One mark for each stage described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Company wished to go to war with the Ndebele.",
    points: [["Mashonaland had not produced the expected gold, so the Company looked to Matabeleland's land, cattle and supposed wealth", 2], ["The Ndebele state was the last African power in the country, and its army and claim over the Shona blocked Company control", 2]],
    hints: ["Think of what the Company wanted and what stood in the way."],
    modelAnswer: "Mashonaland had not produced the gold that investors expected, so the Company looked to Matabeleland's land, cattle and supposed wealth. The Ndebele state was also the last African power in the country, and its army and claim over the Shona blocked the Company's control.",
    explanation: "One mark for each reason and one for the development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Ndebele lost the battles of Shangani and Bembesi.",
    points: [["The Company had Maxim guns and rifles, which broke up massed charges", 2], ["The Ndebele had divided leadership and relied on spears and shields in open attacks against a laager", 2]],
    hints: ["Consider weapons, tactics and leadership."],
    modelAnswer: "The Company had Maxim guns and rifles which cut down massed charges. The Ndebele attacked in the open with spears and shields against a defended laager, and their leadership was divided about whether to fight.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional settler volunteer to his brother, 1893",
        "We were told that the Matabele would fight and they did, in thousands, but the Maxims stopped them before they came near. The farms promised are good and the cattle are many. When the king is gone, the country will be ours."),
      "",
      source("Source B", "an account told by a fictional Ndebele elder in the 1930s",
        "Our regiments went to the fight with courage. They did not know what the machine would do, and many fell in a short time. After that the king left, and the cattle were taken by the white men. We were no longer a nation."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the volunteer's motives for taking part in the war?", points: ["He expected good farms", "He expected cattle and the country to pass to the settlers"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about why the Ndebele were defeated?", points: [["Agree: both stress the power of the machine guns against the Ndebele", 2], ["Differ in emphasis: A is about the volunteer's expectations of gain, B stresses courage and the loss of nation and cattle", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources as evidence of the results of the war?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is contemporary and shows what settlers expected: land and cattle, but it is a private letter with a bias for the settlers", 2], ["B shows the Ndebele sense of loss of cattle and nationhood, but it was told long afterwards and may be shaped by memory", 2], ["Own knowledge: the Matabeleland Order in Council, loss of land and cattle and reserves confirm both", 2]], modelAnswer: "Source A is useful because it was written at the time and shows what settlers expected from victory, which was land and cattle, though it is a private letter by a man who expected to benefit. Source B shows the Ndebele sense of loss of nation and cattle, but it was told long afterwards by an elder and may be shaped by memory. My own knowledge, including the Order in Council of 1894 and the seizure of land and cattle, supports both. Together they show the results from both sides." }),
    ],
    hints: ["For (c), consider who wrote each source, when, and what each leaves out."],
    explanation: "Both sources are invented: a settler's private letter and an Ndebele elder's account.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was the Victoria incident the cause of the Anglo-Ndebele War of 1893-94?",
    levels: levels(8),
    points: [
      ["The incident as trigger: the Ndebele impi, Jameson's order and the shooting", 2],
      ["Underlying causes: wish for land and gold, Rhodes's ambition, the dispute over the Concession and Ndebele raids on the Shona", 2],
      ["Evidence of preparation: the Victoria Agreement and volunteers", 2],
      ["Judgement that the incident was the trigger and not the main cause", 2],
    ],
    hints: ["Separate the trigger from the long-term causes."],
    modelAnswer: "The Victoria incident was the trigger of the war but not its main cause. An Ndebele impi sent to punish Shona near Fort Victoria was ordered to withdraw and was fired on by a Company patrol, and Jameson used this to claim that the Ndebele had attacked. But the underlying causes were more important: the Company wanted the land, cattle and expected wealth of Matabeleland, Rhodes wished to remove the last African power, and the Concession was disputed. The Victoria Agreement shows that the Company was already preparing for war. I conclude that the incident gave an occasion, but the war would probably have come without it.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What was a Maxim gun?", "An early machine-gun used by the Company's force, which stopped massed Ndebele charges.");
  b.card("FACT", "What was the trigger of the Anglo-Ndebele War?", "The Victoria incident of July 1893.");
  b.card("FACT", "What did the Victoria Agreement promise to volunteers?", "A farm of about 6,000 acres, 20 gold claims and a share of captured cattle.");
  b.card("FACT", "On which dates were the battles of Shangani and Bembesi fought?", "Shangani 25 October 1893; Bembesi 1 November 1893.");
  b.card("FACT", "What was the Shangani Patrol?", "A party of 34 men under Major Allan Wilson, cut off and destroyed on 4 December 1893 while pursuing Lobengula.");
  b.card("FACT", "What happened to Lobengula after Bulawayo was burnt?", "He moved north and died in early 1894, probably of smallpox.");
  b.card("CONCEPT", "Why did the Ndebele lose the war?", "Maxim guns and rifles against spears, laager tactics, Company preparation and divided Ndebele leadership.");
  b.card("CONCEPT", "What were the results of the war for the Ndebele?", "Loss of independence, land and cattle; the Matabeleland Order in Council of 1894; reserves.");
  b.card("CONCEPT", "Trigger or underlying cause of the war?", "Trigger: the Victoria incident. Underlying: the Company's wish for land and wealth and the dispute about the Concession.");
});
