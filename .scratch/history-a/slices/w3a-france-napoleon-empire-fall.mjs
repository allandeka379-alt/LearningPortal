// W3a: ahist.france.napoleon-empire-fall (ZIMSEC foreign policy and impact; Cambridge France 1.4, the fall).
import { concept, P, source, levels, ZIM } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.france.napoleon-empire-fall", { file: "france/napoleon-empire-fall", keyPrefix: "france.napoleon-empire-fall" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which naval battle ended Napoleon's hopes of invading Britain?",
    ok: ["Trafalgar", "Correct: Nelson defeated the French and Spanish fleet there."],
    no: [
      ["Austerlitz, where he beat the Russians and Austrians on land", "Austerlitz was a land victory for Napoleon."],
      ["Waterloo, where Wellington and Blücher defeated him in Belgium", "Waterloo was a land battle in 1815."],
      ["Borodino, the great battle fought before the entry into Moscow", "Borodino was a land battle in Russia in 1812."],
    ],
    explanation: "At Trafalgar (21 October 1805) Nelson destroyed the French and Spanish fleet. Britain kept command of the sea and Napoleon turned to economic war.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the aim of the Continental System?",
    ok: ["To ruin Britain's economy by closing European ports to British goods", "Correct: it was economic warfare."],
    no: [
      ["To unite the European states in a single customs union under Britain", "Britain was the enemy, not the leader."],
      ["To make France self-sufficient by banning all foreign trade for ever", "The aim was to hurt Britain, not to end all trade."],
      ["To join the navies of Spain and Portugal into a single fleet", "It was a trade policy, not a naval union."],
    ],
    explanation: "The Berlin Decree (1806) and the Milan Decrees (1807) tried to cut British exports to Europe so that Britain would be forced to make peace.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the Peninsular War weaken Napoleon?",
    ok: ["Guerrilla resistance and Wellington's army tied down large French forces for years", "Correct: the war drained men and money."],
    no: [
      ["The Spanish army defeated the Grande Armée in a single great battle", "No single battle decided the war."],
      ["The Pope sent troops to defend the Church in Spain against France", "The Pope did not send an army."],
      ["The war ended the Continental System by opening the ports of Spain", "The war was not about opening ports."],
    ],
    explanation: "From 1808 Spanish guerrillas and a British army under Wellington tied down hundreds of thousands of French troops, so the war drained men and money.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Russia's withdrawal from the Continental System matter?",
    ok: ["It led Napoleon to invade Russia in 1812 to force it back", "Correct: the invasion followed."],
    no: [
      ["It ended the war with Britain and brought peace to Europe", "The war with Britain continued."],
      ["It gave Napoleon control of the Russian navy in the Baltic", "Russia kept its own fleet."],
      ["It made Prussia a member of the Continental System in its place", "Prussia was already forced into the System."],
    ],
    hints: ["Think of what Napoleon did next."],
    explanation: "Russia depended on trade with Britain and left the System in 1810; Napoleon marched into Russia in 1812 to enforce it.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What was the main consequence of the Russian campaign for Napoleon's position?",
    ok: ["His army was largely destroyed, which encouraged his enemies to turn on him", "Correct: Prussia and Austria then took up arms."],
    no: [
      ["He took Moscow and forced the Tsar to make peace on French terms", "The Tsar did not make peace."],
      ["He captured the Tsar and ended the war in the east at once", "The Tsar was not captured."],
      ["He gained Russian help for an invasion of Britain across the sea", "No such help was given."],
    ],
    hints: ["Think of the retreat from Moscow."],
    explanation: "The retreat cost most of the Grande Armée, and in 1813 Prussia and Austria joined Russia and Britain against him.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which battle of October 1813 is known as the Battle of the Nations?",
    ok: ["Leipzig", "Correct: the allies defeated Napoleon there."],
    no: [
      ["Marengo", "Marengo was in Italy in 1800."],
      ["Jena", "Jena was a victory over Prussia in 1806."],
      ["Wagram", "Wagram was a French victory over Austria in 1809."],
    ],
    hints: ["The battle was fought in Germany."],
    explanation: "At Leipzig (16-19 October 1813) the Russian, Austrian, Prussian and Swedish armies defeated Napoleon; his German allies deserted.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best supports the view that Napoleon's fall was largely caused by his own mistakes?",
    ok: ["He invaded Spain and Russia and refused offers of peace in 1813", "Correct: these decisions were his own."],
    no: [
      ["The Royal Navy had destroyed his fleet at Trafalgar in 1805", "This was a defeat imposed by an enemy."],
      ["The British economy continued to grow throughout the wars", "This is not a decision of Napoleon's."],
      ["Prussia had rebuilt its army with reformers' help after 1807", "This describes what his enemies did."],
    ],
    hints: ["Which decisions were taken by Napoleon himself?"],
    explanation: "A historian who stresses his mistakes points to the decisions to intervene in Spain, to invade Russia and to refuse peace in 1813.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which of these was an effect of French rule outside France that outlasted his fall?",
    ok: ["The end of feudal dues and the spread of the Code in many states", "Correct: these changes were not reversed everywhere."],
    no: [
      ["The permanent union of Spain and France under the Bonaparte family", "Joseph Bonaparte lost the Spanish throne in 1813."],
      ["The survival of the Holy Roman Empire under the French emperor", "The Holy Roman Empire ended in 1806."],
      ["The lasting dominance of the French navy over the British fleet", "Britain remained dominant at sea."],
    ],
    hints: ["Think of reforms that continued after 1815."],
    explanation: "In many of the lands he ruled, the end of feudal privileges and the new law codes remained after 1814-15, although the old rulers returned.",
    applies: ZIM,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Napoleon was finally defeated at Waterloo by an army led by Wellington and Blücher.",
    answer: true,
    explanation: "True. Waterloo was fought on 18 June 1815 by British, Dutch, Belgian and German troops under Wellington and the Prussians under Blücher.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Napoleon abdicated for the first time after the allies had entered Paris.",
    answer: true,
    explanation: "True. The allies entered Paris at the end of March 1814, and his marshals urged him to give up; he abdicated in April and went to Elba.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Continental System damaged only Britain and had no economic effect on France or its allies.",
    answer: false,
    hints: ["Think of prices and smuggling in Europe."],
    explanation: "False. The System also hurt France and its allies by cutting off colonial goods and markets, raising prices and encouraging smuggling and resentment.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each battle with its result or importance.",
    pairs: [
      ["Trafalgar", "Nelson destroyed the French and Spanish fleet"],
      ["Austerlitz", "Napoleon defeated Russia and Austria"],
      ["Borodino", "A bloody battle before the French entered Moscow"],
      ["Leipzig", "The allies defeated Napoleon in the Battle of the Nations"],
    ],
    explanation: "Trafalgar (1805, sea), Austerlitz (1805), Borodino (1812) and Leipzig (1813).",
  });
  {
    const events = [
      "The Battle of Trafalgar",
      "The Treaties of Tilsit",
      "The invasion of Russia",
      "The Battle of Waterloo",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1805 to 1815."],
      explanation: "October 1805; July 1807; June 1812; June 1815.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "After his first abdication Napoleon was exiled to the island of {{blank:a}}, and after Waterloo to the island of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Elba"], choices: ["Elba", "St Helena", "Corsica", "Malta"] },
      { id: "b", accepted: ["St Helena"], choices: ["St Helena", "Elba", "Sicily", "Crete"] },
    ],
    explanation: "Elba (1814) and St Helena (1815).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the British general who commanded the army in the Peninsular War and later at Waterloo.",
    accepted: ["Wellington", "Duke of Wellington", "Arthur Wellesley", "Wellesley", "Lord Wellington"],
    wrong: ["Nelson"],
    explanation: "**Wellington** (Arthur Wellesley).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Continental System.",
    points: ["It was begun by the Berlin Decree of 1806 and the Milan Decrees", "It closed the ports of Europe to British goods", "It aimed to ruin British trade and force peace", "It was enforced on allies and conquered states and led to smuggling and resentment"],
    modelAnswer: "The Continental System began with the Berlin Decree of 1806 and the Milan Decrees. It closed the ports of Europe to British goods, in the hope of ruining British trade and forcing Britain to make peace. It was enforced on allies and conquered states, and led to smuggling and resentment.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Russian campaign of 1812 failed.",
    points: [["The Russians retreated and burned supplies, drawing the French deep into Russia, where the army outran its supplies", 2], ["The Tsar refused to make peace after Moscow was taken, and the winter retreat with hunger, disease and attacks destroyed the army", 2]],
    hints: ["Think of the distance, the supplies and the winter retreat."],
    modelAnswer: "The Russians retreated and burned supplies, which drew the French deep into the country, where the army outran its supplies. When Moscow was taken the Tsar refused to make peace, and the retreat in winter, with hunger, disease and attacks, destroyed the army.",
    explanation: "Credit explained reasons, not description of the march.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how nationalism helped to bring about Napoleon's fall.",
    points: [["French conscription, taxes and the removal of rulers made foreign rule hated and led to risings, as in Spain", 2], ["In Germany, especially Prussia, a patriotic movement grew and armies were rebuilt, which brought a united effort in 1813", 2]],
    hints: ["Think of Spain and Germany."],
    modelAnswer: "Conscription, taxes and the removal of rulers made foreign rule hated and led to risings, as in Spain. In Germany, especially in Prussia, a patriotic movement grew and the army was rebuilt, which brought a united effort against him in 1813.",
    explanation: "Credit explained reasons with examples.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter written by a fictional French junior officer in northern Spain to his mother, 1810",
        "We hold the towns, but not the roads. Every convoy that leaves is attacked by men we never see, and the villagers help them. We have lost more men to ambush than to open battle. Our general says the war will be over by spring, but he said the same last year."),
      "",
      source("Source B", "an account by a fictional veteran of the Russian campaign, recorded in France in 1830",
        "We marched for weeks and found empty villages and burned fields. In Moscow there was no peace and no food, and the cold came before we left. Of my company only a handful came back. I do not blame the cold alone; it was the distance and the Emperor's pride."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the nature of the war in Spain?", points: ["Fighting was by ambush and guerrilla attacks on convoys, not open battle", "The local people helped the attackers / the French held towns but not the roads"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the difficulties facing Napoleon's armies.", points: [["Agree: both show the army suffering heavy losses without open defeat in battle, and both show hostility or an empty countryside", 2], ["Differ: A concerns guerrilla attacks and the help of local people; B concerns distance, lack of food and cold in Russia, and blames the Emperor", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the reasons for Napoleon's fall?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private letter from an officer written at the time and so likely to be honest, and it fits what we know of the guerrilla war, but it reflects one region and one man's view", 2], ["B was recorded years later in France, after the fall, and may be affected by hindsight, but it agrees with other evidence about distance, hunger and losses and offers a veteran's judgement", 2], ["Own knowledge: the Peninsular War and the retreat from Moscow are both well attested as causes; together they show two reasons but not nationalism or the allied unity of 1813-14", 2]], modelAnswer: "Source A is useful because it is a private letter written at the time, so the officer had little reason to lie, and it fits what we know of guerrilla warfare in Spain; but it describes one region. Source B is by a veteran recorded years later, so hindsight may colour it, but it agrees with other evidence about hunger, distance and heavy losses, and it blames the Emperor, which is a judgement worth testing. Between them they illustrate two causes of the fall, the Peninsular War and the Russian campaign, but they say nothing of nationalism, the Continental System or the allied unity of 1813-14, so a historian would need other evidence." }),
    ],
    hints: ["For (c), consider when and why each source was written."],
    explanation: "Both sources are invented: an officer's letter and a veteran's account.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Which was the more important cause of Napoleon's fall, the Peninsular War or the invasion of Russia?",
    levels: levels(8),
    points: [
      ["Peninsular War: guerrilla resistance and Wellington tied down large forces from 1808 and showed the French could be defeated", 2],
      ["Russia: the loss of most of the Grande Armée in 1812, which encouraged Prussia and Austria to rise and made Leipzig possible", 2],
      ["Links and other causes: the Continental System caused both wars; nationalism and allied unity finished him in 1813-14", 2],
      ["A supported judgement on which mattered more and why", 2],
    ],
    hints: ["Compare the scale and the timing of the two wars."],
    modelAnswer: "The invasion of Russia was the more important cause. The Peninsular War drained French resources from 1808 and showed that the army could be beaten, but France could bear its cost. In 1812 the army was destroyed in a single campaign, and the disaster encouraged Prussia and Austria to join Russia and Britain in 1813, which led to Leipzig and the fall of Paris. But the two wars were linked, since both arose from the Continental System, and both fed the growth of nationalism. I conclude that Russia was the decisive blow, while Spain weakened him over a longer time.",
    explanation: "Credit explained causes and a supported comparison.",
  });

  b.card("DEFINITION", "What was the Continental System?", "Napoleon's blockade of British trade by closing European ports (Berlin Decree 1806, Milan Decrees 1807).");
  b.card("DEFINITION", "What was the Grand Empire?", "The lands Napoleon ruled directly or through allies and relatives in Europe around 1810-12.", undefined, { applies: ZIM });
  b.card("FACT", "What happened at Trafalgar and Austerlitz in 1805?", "Trafalgar (21 October): Nelson destroyed the French and Spanish fleet. Austerlitz (2 December): Napoleon defeated Russia and Austria.");
  b.card("FACT", "What was the Peninsular War?", "The war in Spain and Portugal from 1808 to 1814, fought by guerrillas and a British army under Wellington.");
  b.card("FACT", "When was Leipzig and why did it matter?", "16-19 October 1813, the Battle of the Nations: the allies defeated Napoleon and his German allies deserted.");
  b.card("FACT", "When did Napoleon abdicate and where was he exiled?", "April 1814 (Elba) and, after Waterloo on 18 June 1815, to St Helena.");
  b.card("CONCEPT", "List five reasons for Napoleon's fall.", "The Continental System, the Peninsular War, nationalism, the Russian campaign, Leipzig and the invasion of France; also loss of support at home and his own mistakes.");
  b.card("CONCEPT", "How did the Continental System contribute to his fall?", "It failed to ruin Britain, hurt France and its allies, and led to the Spanish and Russian wars.");
  b.card("CONCEPT", "What lasted in Europe after Napoleon?", "The Code, the end of feudal dues in many states, and the growth of nationalism.", undefined, { applies: ZIM });
});
