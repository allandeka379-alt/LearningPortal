// W4b: ahist.russia.revolutions-1917 (both boards; Cambridge key question 3.3).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.russia.revolutions-1917", { file: "russia/revolutions-1917", keyPrefix: "russia.revolutions-1917" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who led the Provisional Government from July 1917?",
    ok: ["Alexander Kerensky, the minister of war", "Correct: he followed Prince Lvov."],
    no: [
      ["Pavel Milyukov, the leader of the Kadet party", "Milyukov was foreign minister and left office in May."],
      ["Lavr Kornilov, the commander-in-chief of the army", "Kornilov tried to move against the Government in September."],
      ["Leon Trotsky, the chairman of the Petrograd Soviet", "Trotsky led the Soviet and the Bolshevik rising, not the Government."],
    ],
    explanation: "Prince Georgy Lvov headed the first Provisional Government. Alexander Kerensky, a moderate socialist and minister of war, became its head in July 1917.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the immediate event that began the February Revolution in 1917?",
    ok: ["Bread strikes by women in Petrograd on International Women's Day", "Correct: the strikes spread and troops joined them."],
    no: [
      ["A mutiny by the sailors of the cruiser Aurora against their officers", "The Aurora played a part in the Bolshevik rising in November."],
      ["A march by Father Gapon with a petition to the Winter Palace in the capital", "That was Bloody Sunday in 1905."],
      ["A coup by General Kornilov against the Government in the capital", "That was the Kornilov affair, months later."],
    ],
    explanation: "On 8 March 1917 (23 February old style) women textile workers marched for bread. Strikes spread, and within days the soldiers refused to fire on the crowds.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Lenin's slogan 'Peace, Land and Bread' promise?",
    ok: ["An end to the war, land for the peasants and bread for the hungry towns", "Correct: it matched the main demands of soldiers, peasants and workers."],
    no: [
      ["A victory over Germany, rich estates for the nobles and stable prices", "It opposed the war and the nobles."],
      ["A Constituent Assembly, a new Tsar and a Church for all the people", "The Bolsheviks did not promise a new Tsar."],
      ["Free trade abroad, factories for their owners and wages for all workers", "It did not promise protection for factory owners."],
    ],
    explanation: "The slogan summed up the April Theses: peace for the soldiers, land for the peasants and bread for the hungry towns. It explains why Bolshevik support grew.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was meant by 'dual power' in 1917?",
    ok: ["The Provisional Government and the Petrograd Soviet both held authority", "Correct: the Government could not command the soldiers without the Soviet."],
    no: [
      ["The Tsar and his brother Michael shared the throne between them", "Michael declined the throne in March."],
      ["The Bolsheviks and the Mensheviks formed a coalition government together", "The Government was not a Bolshevik-Menshevik coalition."],
      ["The army and the Church ruled the capital together under martial law", "Neither ruled the capital in 1917."],
    ],
    hints: ["Think of the two bodies in Petrograd after the Tsar's abdication."],
    explanation: "From March to November the Provisional Government held formal authority, while the Petrograd Soviet had the loyalty of the workers and soldiers (Order No. 1). Neither could rule without the other.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Kornilov affair help the Bolsheviks?",
    ok: ["Kerensky armed the Red Guards, so the Bolsheviks seemed its defenders", "Correct: it restored their standing."],
    no: [
      ["General Kornilov joined the Bolsheviks and brought the whole army with him", "Kornilov opposed the Bolsheviks and failed."],
      ["The Bolsheviks seized power in Petrograd during the revolt itself and held it", "The Bolshevik rising came in November."],
      ["Kerensky resigned in favour of Lenin, who was his chosen successor", "Kerensky did not resign in favour of Lenin."],
    ],
    hints: ["Think about who stopped Kornilov and who looked weaker afterwards."],
    explanation: "The affair discredited the army officers and weakened Kerensky, while the Bolsheviks helped to defeat Kornilov and gained credit and arms. Soon they held majorities in the Petrograd and Moscow Soviets.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the role of the Military Revolutionary Committee in October 1917?",
    ok: ["It organised the seizure of the capital's key points for the Soviet", "Correct: Trotsky chaired it."],
    no: [
      ["It directed the defence of the Winter Palace for the Government", "It attacked the Government, not defended it."],
      ["It prepared the elections to the Constituent Assembly for the Duma", "Elections were not its task."],
      ["It commanded the German army that was advancing on Petrograd", "It was a Russian body of the Soviet."],
    ],
    hints: ["Think of Trotsky and the Petrograd Soviet."],
    explanation: "The MRC of the Petrograd Soviet, with Trotsky as its chairman, used Red Guards and loyal soldiers to take the bridges, stations and telephone exchange and then the Winter Palace.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that the October Revolution was a popular revolution and not only a coup?",
    ok: ["The Bolsheviks held majorities in the Petrograd and Moscow Soviets before the rising", "Correct: they had mass support in the main cities."],
    no: [
      ["The Winter Palace was taken at night by a few Red Guards and sailors", "This could support the coup view."],
      ["Lenin returned to Petrograd with German help in a sealed railway carriage", "This supports a view of outside help, not of popular support."],
      ["The Mensheviks and Social Revolutionaries walked out of the Congress of Soviets", "This shows division among the socialists."],
    ],
    hints: ["Which fact shows support for the Bolsheviks in the city before they acted?"],
    explanation: "Historians who stress popular support point to the Bolshevik majorities in the soviets of the main cities by September-October. Those who see a coup stress the small numbers who acted on the night.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best sums up the historians' debate on October 1917?",
    ok: ["Some call it a minority coup; others stress its popular support", "Correct: both views are held."],
    no: [
      ["All historians agree that it was an inevitable result of Russian history", "Historians do not agree that it was inevitable."],
      ["All historians agree that Germany planned and carried it out in Petrograd", "No historian holds that Germany carried it out."],
      ["Historians agree that few people knew of the Bolsheviks until November", "The Bolsheviks had won support in the soviets earlier."],
    ],
    hints: ["Remember the Western and Soviet interpretations, and the later view that combines them."],
    explanation: "Western historians long described October as a coup; Soviet historians described a popular revolution; many since the 1970s stress both the Bolsheviks' organisation and genuine support among workers and soldiers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Nicholas II abdicated on 15 March 1917 (2 March in the old Russian calendar).",
    answer: true,
    explanation: "True. He abdicated for himself and his son, and his brother Michael declined the throne the next day.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Lenin was the leader of the February Revolution of 1917.",
    answer: false,
    explanation: "False. Lenin was in exile in Switzerland, and returned in April. The February Revolution was a revolt of workers and soldiers that no party led.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Provisional Government failed mainly because it ended Russia's involvement in the war in the summer of 1917.",
    answer: false,
    hints: ["Think of what the Government did about the war."],
    explanation: "False. It continued the war, and the failed summer offensive helped to destroy its support. The Bolsheviks made peace their main promise.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Alexander Kerensky", "Head of the Provisional Government from July 1917"],
      ["Leon Trotsky", "Chairman of the Petrograd Soviet and of the Military Revolutionary Committee"],
      ["Lavr Kornilov", "General whose march on Petrograd in September 1917 failed"],
      ["Georgy Lvov", "First head of the Provisional Government"],
    ],
    explanation: "Kerensky (July-November), Trotsky (MRC), Kornilov (September) and Prince Lvov (March-July).",
  });
  chrono(b, [
    "The Tsar abdicates",
    "Lenin returns to Petrograd and issues the April Theses",
    "The Kornilov affair",
    "The Winter Palace is taken",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from March to November 1917."],
    explanation: "15 March; 16 April; early September; 7-8 November 1917.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Bolshevik government created in November 1917 was called {{blank:a}}, and its chairman was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Sovnarkom"], choices: ["Sovnarkom", "the Duma", "the Cheka", "the Politburo"] },
      { id: "b", accepted: ["Lenin"], choices: ["Lenin", "Trotsky", "Kerensky", "Stalin"] },
    ],
    explanation: "The Council of People's Commissars (Sovnarkom) was set up by the Second Congress of Soviets, with Lenin as chairman.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Russian city where the revolutions of 1917 began, known from 1914 to 1924 as Petrograd.",
    accepted: ["St Petersburg", "Saint Petersburg", "St. Petersburg", "Petrograd", "Petersburg"],
    wrong: ["Moscow"],
    explanation: "**St Petersburg**, renamed Petrograd in 1914 (because the old name sounded German) and Leningrad in 1924.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the Tsar came to abdicate in March 1917.",
    points: ["Bread strikes and demonstrations began in Petrograd on 8 March", "Troops refused to fire on the crowds and some joined them", "The Duma and the Petrograd Soviet formed new authorities", "The generals advised the Tsar to give up the throne, and he abdicated on 15 March"],
    modelAnswer: "Bread strikes and demonstrations began in Petrograd on 8 March. The troops refused to fire on the crowds and some joined them. The Duma and the Petrograd Soviet formed new authorities, and the generals advised the Tsar to give up the throne, so he abdicated on 15 March.",
    explanation: "One mark for each accurate step.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Provisional Government became unpopular.",
    points: [["It continued the war, and the failure of the summer offensive led to heavy losses and desertion", 2], ["It delayed land reform until the Constituent Assembly, while the peasants wanted land at once, and food shortages continued", 2]],
    hints: ["Think of what soldiers, peasants and townspeople wanted."],
    modelAnswer: "It continued the war, and the failure of the summer offensive led to heavy losses and desertion, which turned soldiers against it. It also delayed land reform until a Constituent Assembly could meet, while the peasants wanted land at once, and food shortages in the towns continued.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Trotsky's role was important in the Bolshevik seizure of power.",
    points: [["As chairman of the Petrograd Soviet and of the Military Revolutionary Committee he organised the Red Guards and soldiers who took the capital's key points", 2], ["By acting in the name of the Soviet and the Congress of Soviets he made the rising seem a defence of the revolution, which won over wavering soldiers", 2]],
    hints: ["Think of the MRC and how the rising was presented."],
    modelAnswer: "As chairman of the Petrograd Soviet and of the Military Revolutionary Committee he organised the Red Guards and the soldiers who took the key points of the capital. By acting in the name of the Soviet and the Congress of Soviets he made the rising look like a defence of the revolution, which helped to win over wavering soldiers.",
    explanation: "Credit explained points.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional soldier at the Front to his village, summer 1917",
        "They tell us the new government will bring peace, but they send us forward again. Half my company has gone home. The Committee says we need not obey an officer unless the Soviet agrees. I do not want land at the price of the Germans in our fields, but I will not die for the old masters either. If someone promises peace and land, I will listen."),
      "",
      source("Source B", "an editorial in a fictional liberal newspaper in Petrograd, 8 November 1917",
        "A small party has seized the capital while the Government's ministers sat in the Winter Palace. The workers and soldiers who followed them were told that land and peace are at hand. But the country has not voted for them, and the Constituent Assembly has not yet met. Citizens should remain calm and defend the freedoms won in March."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the state of the army in 1917?", points: ["Discipline was breaking down, with desertions and soldiers' committees questioning officers' authority", "Soldiers were ready to follow anyone who promised peace and land"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to the Provisional Government and the Bolsheviks.", points: [["Agree: both show that peace and land were the promises that attracted support to the Bolsheviks", 2], ["Differ: A shows a soldier open to new leaders and disillusioned with the Government; B comes from a supporter of the March freedoms who condemns the Bolsheviks as a small party without a mandate", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying why the Bolsheviks were able to seize power in 1917?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful for the collapse of discipline and for the appeal of peace and land, but it is one private letter from one soldier and may not be typical", 2], ["B is useful for the opposition to the Bolsheviks and for the view that they were a minority, but it was written at once, as liberal propaganda, by a hostile editor", 2], ["Own knowledge: desertions, the summer offensive, Order No. 1 and the Bolsheviks' majorities in the soviets support A; the walkout of the Mensheviks and Social Revolutionaries and the coup/popular revolution debate bear on B", 2]], modelAnswer: "Source A is useful because it shows the collapse of discipline and the appeal of peace and land, which fits the failed offensive of the summer and the power of soldiers' committees, but it is one soldier's private letter and may not be typical. Source B is useful because it shows how liberal opponents saw the Bolsheviks as a small party without a mandate, a view that some historians still hold, but it was written the day after the rising by a hostile editor and ignores the Bolsheviks' majorities in the soviets. Together they show both why the Bolsheviks gained support and why their right to rule was challenged." }),
    ],
    hints: ["For (c), consider the writers' purposes and what you know about the Bolsheviks' support in the soviets."],
    explanation: "Both sources are invented: a soldier's letter and a liberal editorial.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the First World War in the fall of the Tsar in 1917.",
    levels: levels(8),
    points: [
      ["Military defeats, casualties and shortages of equipment discredited the Tsar, especially after he took command in 1915", 2],
      ["Economic strain: food and fuel shortages, inflation and the breakdown of transport, leading to bread riots in Petrograd", 2],
      ["Political effects: Rasputin and the Empress, refusal to work with the Progressive Bloc, and the loss of army loyalty", 2],
      ["A supported judgement that the war was decisive but worked on existing weaknesses of the autocracy", 2],
    ],
    hints: ["Weigh the war against the existing weaknesses of the regime."],
    modelAnswer: "The First World War was the most important cause of the Tsar's fall. Defeats and heavy casualties discredited the regime, especially after Nicholas II took command of the army in 1915, and the shortage of equipment showed its inefficiency. The strain on the economy brought inflation, food and fuel shortages and the bread riots of March 1917. Politically, the war brought the influence of Rasputin and the Empress, and the Tsar's refusal to work with the Duma, which cost him the support of the army. But the war worked on weaknesses that already existed: an autocracy that had not reformed after 1905 and a poor peasantry. I conclude that the war was the decisive cause, but it destroyed a regime that was already fragile.",
    explanation: "Credit explained effects of the war and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'The Bolsheviks seized power in October 1917 mainly because of the weakness of the Provisional Government.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Weakness of the Government: the war, the failed offensive, delay over land, shortages, dual power, the Kornilov affair and loss of the army", 3],
      ["Bolshevik strengths: Lenin's April Theses and slogans, discipline, Trotsky's MRC and Red Guards, majorities in the Soviets", 3],
      ["The role of other factors: the failure of other socialists to win the same support, German help to Lenin (contested significance)", 3],
      ["A supported judgement on the relative weight of weakness and Bolshevik action", 3],
    ],
    hints: ["Consider whether the Bolsheviks would have won against a stronger government."],
    modelAnswer: "The weakness of the Provisional Government was the main condition for the Bolshevik success, but it was not enough on its own. The Government kept the war going, and its failed summer offensive destroyed the army's loyalty. It delayed land reform when peasants were seizing land, shortages continued, and dual power meant it could not command the soldiers. The Kornilov affair shattered Kerensky's standing. A stronger government might have survived. But the Bolsheviks also made the most of these weaknesses. Lenin's April Theses and slogans matched the demands of soldiers, peasants and workers, the party was disciplined, and Trotsky's Military Revolutionary Committee organised the Red Guards and the seizure of the capital. By October they held majorities in the Petrograd and Moscow Soviets. Other socialists, who had supported the war or the Government, lost credit. I therefore agree that the weakness of the Government was the main condition, but the Bolsheviks' organisation and their promises were needed to turn that weakness into victory.",
    explanation: "Credit both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What was 'dual power' in 1917?", "The sharing of authority between the Provisional Government and the Petrograd Soviet from March to November.");
  b.card("DEFINITION", "What were Lenin's April Theses?", "Lenin's April 1917 programme: no support for the Provisional Government, all power to the Soviets, an end to the war and land for the peasants ('Peace, Land and Bread').");
  b.card("FACT", "When did Nicholas II abdicate?", "15 March 1917 (2 March in the old Russian calendar).");
  b.card("FACT", "When did the Bolsheviks seize power?", "7-8 November 1917 (25-26 October in the old calendar); the Winter Palace was taken in the night.");
  b.card("FACT", "What were the July Days?", "Armed demonstrations in Petrograd on 16-17 July 1917 by soldiers, workers and sailors; the Government crushed them and Lenin fled to Finland.");
  b.card("FACT", "What was the Military Revolutionary Committee?", "A body of the Petrograd Soviet, chaired by Trotsky, that organised the Bolshevik seizure of the capital in October 1917.");
  b.card("CONCEPT", "Why did the February Revolution succeed?", "War, shortages and a discredited Tsar produced bread riots in Petrograd, and the soldiers refused to fire and joined the crowds.");
  b.card("CONCEPT", "Why did the Bolsheviks win in October 1917?", "The Government's weakness over war and land, Lenin's slogans, Trotsky's organisation and majorities in the soviets.");
  b.card("CONCEPT", "Was October a coup or a popular revolution?", "Historians differ: some stress a minority's seizure of power, others the mass support for Bolshevik slogans; many now combine both.");
});
