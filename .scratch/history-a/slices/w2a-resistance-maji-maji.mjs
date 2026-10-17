// W2a: ahist.resistance.maji-maji (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.resistance.maji-maji", { file: "resistance/maji-maji", keyPrefix: "resistance.maji-maji" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which European power ruled the colony in which the Maji Maji uprising took place?",
    options: [
      ["Germany", "Correct: the colony was German East Africa."],
      ["Britain", "Britain ruled Kenya and Uganda, not this colony."],
      ["Portugal", "Portugal ruled Angola and Mozambique."],
      ["France", "France ruled Madagascar and much of West Africa."],
    ],
    answer: "A",
    explanation: "The uprising was against German rule in German East Africa (mainland Tanzania today).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did the word maji mean in the name Maji Maji?",
    options: [
      ["Water", "Correct: the medicine was made with water."],
      ["Freedom, as a battle cry of the rebels", "It does not mean freedom."],
      ["Fire, from the burning of crops by the Germans", "It does not mean fire."],
      ["Cotton, from the crop that the Germans forced people to grow", "It does not mean cotton."],
    ],
    answer: "A",
    explanation: "Maji is Swahili for water; the medicine of water was believed to turn German bullets to water.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which was a main cause of the Maji Maji uprising?",
    options: [
      ["Compulsory communal cotton growing and forced labour", "Correct: people resented unpaid work on German-ordered cotton plots."],
      ["A German decision to abolish all taxes in the colony", "The Germans increased, not abolished, taxes."],
      ["A British invasion from the north of the colony", "There was no British invasion."],
      ["The defeat of the Hehe by the Germans in 1905", "The Hehe were defeated earlier, by 1898."],
    ],
    answer: "A",
    explanation: "Forced cotton growing, taxes, forced labour and abuse by akidas were the main grievances.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who was the spirit medium who taught the maji belief?",
    options: [
      ["Kinjikitile Ngwale", "Correct: he was possessed by the spirit Hongo."],
      ["Mkwawa of the Hehe", "Mkwawa was a Hehe leader who fought the Germans earlier."],
      ["Abushiri bin Salim", "Abushiri led the coastal revolt of 1888-89."],
      ["Governor von Götzen", "Götzen was the German governor."],
    ],
    answer: "A",
    explanation: "Kinjikitile Ngwale claimed possession by the spirit Hongo, distributed the maji and was hanged by the Germans in August 1905.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "How did the Germans mainly defeat the uprising?",
    options: [
      ["With reinforcements, machine guns and a scorched-earth policy that brought famine", "Correct: destroyed crops starved the rebels."],
      ["By giving land to every African family that agreed to surrender within a month", "No such land grants were made."],
      ["By persuading the Hehe and the coastal peoples to lead a joint African army against the rebels", "The Hehe were not a leading force in this."],
      ["By withdrawing all troops from the south and leaving the rebels to rule the region", "They did not withdraw."],
    ],
    answer: "A",
    hints: ["Think of weapons and of food."],
    explanation: "German columns with machine guns burned villages and crops in 1905-06, causing famine that ended the rising by 1907.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the belief in the maji a weakness as well as a strength?",
    options: [
      ["It united peoples but led fighters to attack machine guns believing they were protected", "Correct: faith gave courage but proved false in battle."],
      ["It divided the rebels into many groups that then fought one another for leadership", "It united rather than divided them."],
      ["It persuaded the Germans to make peace with the rebels after the first battles", "The Germans did not."],
      ["It required fighters to give up their land and cattle to the priests in advance", "There was no such rule."],
    ],
    answer: "A",
    hints: ["Think about what happened to fighters in front of the guns."],
    explanation: "The maji gave courage and unity but did not stop bullets, so many fighters died in assaults on guns.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the death toll of the uprising is the most accurate?",
    options: [
      ["Estimates vary widely, from about 75,000 to well over 200,000, mostly from famine", "Correct: the figures are uncertain."],
      ["The toll is known exactly from German records, which give about 10,000 deaths in all", "German records are incomplete and low."],
      ["Almost all deaths were in open battles during the first three months of the war", "Most deaths came later, from famine."],
      ["Only German soldiers and officials were killed, in a few hundred cases", "Most victims were Africans."],
    ],
    answer: "A",
    hints: ["Remember that historians can only estimate."],
    explanation: "Estimates differ widely, and most of the dead died of famine and disease after crops and villages were destroyed.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best supports the view that the Maji Maji uprising achieved unity beyond ethnic divisions?",
    options: [
      ["Many different peoples across a wide area rose within weeks of one another", "Correct: this suggests wide shared belief."],
      ["The rebels were led by a single commander from the start", "There was no single commander."],
      ["The Germans negotiated with a united council of the rebels in 1905", "No such council existed."],
      ["All peoples of the colony joined, including the Hehe and the coastal Swahili", "Not all peoples joined."],
    ],
    answer: "A",
    hints: ["Look for evidence from the spread of the rising."],
    explanation: "The rapid spread over a wide area, among peoples who had few links before 1905, suggests a shared belief, though unity was never complete.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Maji Maji uprising began in 1905.", answer: true,
    explanation: "It began in July 1905 and the last fighting ended in 1907.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Most of the people who died in the Maji Maji war were killed in open battles.", answer: false,
    explanation: "Most deaths came from famine and disease after the Germans destroyed crops and villages.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Kinjikitile Ngwale was hanged by the Germans in August 1905.", answer: true,
    hints: ["He was arrested after the maji had begun to spread."],
    explanation: "The Germans arrested and hanged him, but the movement continued under local leaders.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or name to its meaning.",
    pairs: [
      ["Akida", "A district official who collected taxes and labour for the Germans"],
      ["Hongo", "The spirit said to possess Kinjikitile"],
      ["Scorched earth", "Destruction of crops and villages to starve the enemy"],
      ["Matumbi hills", "Area where the rising began in July 1905"],
    ],
    explanation: "These are the key terms and places of the Maji Maji story.",
  });
  {
    const events = [
      "The hut and head tax is introduced",
      "Compulsory communal cotton plots begin",
      "The rising begins in the Matumbi hills",
      "The last resistance ends",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1898, about 1902, 1905 and 1907."],
      explanation: "1898; about 1902; July 1905; 1907.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Maji Maji uprising began in {{blank:a}} against {{blank:b}} rule.",
    blanks: [
      { id: "a", accepted: ["1905"], choices: ["1905", "1888", "1896", "1914"] },
      { id: "b", accepted: ["German"], choices: ["German", "British", "Portuguese", "Italian"] },
    ],
    explanation: "It began in 1905 against German rule in East Africa.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name was given to the medicine believed to turn German bullets into water?",
    accepted: ["maji", "the maji", "maji medicine", "maji maji", "water"],
    wrong: ["quinine"],
    explanation: "The **maji** (water) medicine.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the grievances of people in German East Africa before 1905.",
    points: ["Compulsory communal cotton growing for little reward", "A cash hut and head tax", "Forced labour on roads and plantations", "Abuse by akidas and other officials"],
    modelAnswer: "People were forced to work on communal cotton plots for little reward and had to pay a hut and head tax in cash. They were compelled to labour on roads and plantations, and akidas and other officials beat and robbed them.",
    explanation: "One mark for each grievance described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how religion helped to unite different peoples in the Maji Maji uprising.",
    points: [["The maji teaching was simple and spread along trade routes and pilgrim paths to many districts", 2], ["It promised protection against bullets and the help of the ancestors, which gave courage and a shared cause", 2]],
    hints: ["Think of how the message travelled and what it promised."],
    modelAnswer: "The maji teaching was simple, and pilgrims carried the water to many districts, so it spread widely. It promised protection against bullets and the help of the ancestors, which gave courage and a shared cause to peoples who had different local grievances.",
    explanation: "Credit explained links between religion and unity.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Germans were able to defeat the uprising.",
    points: [["Germany had machine guns and brought reinforcements from Germany and its other colonies", 2], ["The scorched-earth policy destroyed crops and villages, causing famine that weakened the rebels, who lacked modern weapons and a central command", 2]],
    hints: ["Give a military reason and a reason about food."],
    modelAnswer: "The Germans had machine guns and brought reinforcements from Germany and from other colonies. Their scorched-earth policy destroyed crops and villages and caused famine, which weakened the rebels, who had no modern weapons and no central command.",
    explanation: "Credit developed reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional German district officer to his superiors, 1906",
        "The disturbances in the south have been put down. Columns have burned the villages of the rebels and their stores of grain. The population has been taught that resistance is useless. Hunger will complete what the troops have begun."),
      "",
      source("Source B", "a song remembered by a fictional elder and recorded in the 1960s",
        "They told us the water would turn the bullets, and we believed. They told us the cotton would make us rich, and we dug for them. Now the fields are empty and the people are few."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What methods does Source A say the German columns used?", points: ["Burning the villages of the rebels", "Burning grain stores so that hunger would end resistance"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What do Sources A and B each suggest about the results of the uprising?", points: ["A: the rising was put down and hunger would follow", "B: fields empty and few people left / belief in the maji and the cotton scheme had failed"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources as evidence of the Maji Maji war?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is an official report written at the time, so it shows German methods first-hand, though it justifies them and may understate the harm", 1], ["B is an African memory of belief in maji and cotton and of the cost, but a song recorded decades later may have changed", 1], ["Own knowledge: scorched earth, famine and the maji medicine are well attested in other evidence", 1], ["Judgement: they are useful together, giving two opposite viewpoints", 1]], modelAnswer: "Source A is useful because a German officer wrote it at the time and shows the scorched-earth methods and the aim of using hunger, though he justifies them and may understate the suffering. Source B is useful as an African memory of the belief in the maji, the forced cotton and the cost, but it was recorded decades later and a song may have changed over time. My own knowledge confirms both, since scorched earth, famine and the maji medicine are well attested. Together they give two opposite viewpoints and are more useful than either alone." }),
    ],
    hints: ["For (c), consider the dates and viewpoints of the sources."],
    explanation: "Both sources are invented: a German officer's report and a song recorded by a collector.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent were the methods of resistance used in the Maji Maji uprising effective?",
    levels: levels(12),
    points: [
      ["Strengths: religion and the maji united peoples, rapid mobilisation across a wide area, local knowledge", 3],
      ["Weaknesses: belief in protection against bullets was false, no central command and few modern weapons", 3],
      ["German response: machine guns, reinforcements and scorched earth leading to famine", 2],
      ["Results: heavy loss of life, but German reforms and a lasting memory of unity", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh the success in building unity against the failure to defeat the Germans."],
    modelAnswer: "The methods of resistance were effective in uniting people but not in defeating the Germans. The maji teaching spread quickly along pilgrim paths and brought many peoples together within weeks, and the rebels knew the ground and fought bravely. But the belief that the water would turn bullets was false, there was no central command, and the rebels had few modern weapons. The Germans brought reinforcements with machine guns and used scorched earth to cause a famine that ended the rising by 1907. The cost was very heavy, with estimates of dead ranging from about 75,000 to well over 200,000. Germany did reform some policies and the memory of the rising inspired later nationalists. I conclude that the methods were effective for mobilisation and memory but not for military success.",
    explanation: "Credit strengths, weaknesses and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of German colonial policies in causing the Maji Maji uprising.",
    levels: levels(8),
    points: [
      ["Policies: forced cotton growing, taxes, forced labour and the use of akidas", 2],
      ["Effects: people lost time for food crops and suffered abuse, so grievances were deep and widespread", 2],
      ["Other factors: the religious movement and the leadership of Kinjikitile gave unity and timing", 2],
      ["Judgement on the importance of German policy", 2],
    ],
    hints: ["Compare the policies with the religious leadership."],
    modelAnswer: "German colonial policies were the most important cause of the uprising. Forced cotton growing, taxes in cash, forced labour and the abuses of akidas created deep grievances over a wide area, and the cotton scheme took time from food crops. But grievances alone did not produce unity, and the religious movement of Kinjikitile and the maji gave the timing and common purpose. I conclude that German policies were the underlying cause, and religion the force that turned discontent into a common rising.",
    explanation: "Credit explained policies, the role of religion and a judgement.",
  });

  b.card("DEFINITION", "What was the maji?", "A medicine of water mixed with other substances, believed to turn German bullets into water.");
  b.card("DEFINITION", "What was an akida?", "A district official in German East Africa who collected taxes and labour and was often accused of abuse.");
  b.card("FACT", "When did the Maji Maji uprising take place?", "From July 1905 to 1907, in southern German East Africa.");
  b.card("FACT", "Who was Kinjikitile Ngwale?", "The spirit medium who taught the maji belief; hanged by the Germans in August 1905.");
  b.card("FACT", "Name two causes of the Maji Maji uprising.", "Forced cotton growing and taxes (also forced labour and abuse by akidas).");
  b.card("FACT", "What was the estimated death toll of the uprising?", "Estimates range from about 75,000 to well over 200,000, mostly from famine and disease.");
  b.card("CONCEPT", "How did the Germans defeat the uprising?", "With machine guns, reinforcements and scorched earth, which caused famine.");
  b.card("CONCEPT", "Why was the maji belief both a strength and a weakness?", "It united peoples and gave courage, but it did not stop bullets.");
  b.card("CONCEPT", "What was the legacy of the Maji Maji?", "German reforms from 1907 and a memory of unity used by later nationalists.");
});
