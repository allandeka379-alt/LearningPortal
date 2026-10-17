// W4b: ahist.russia.bolshevik-consolidation (both boards; Cambridge key question 3.4).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.russia.bolshevik-consolidation", { file: "russia/bolshevik-consolidation", keyPrefix: "russia.bolshevik-consolidation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which treaty took Russia out of the First World War in March 1918?",
    ok: ["The Treaty of Brest-Litovsk with Germany", "Correct: it was signed on 3 March 1918."],
    no: [
      ["The Treaty of Versailles with Germany", "Versailles was signed in 1919 and did not involve Soviet Russia."],
      ["The Treaty of Portsmouth with Japan", "Portsmouth ended the war with Japan in 1905."],
      ["The Treaty of Riga with Poland", "Riga ended the Polish-Soviet war in 1921."],
    ],
    explanation: "By the Treaty of Brest-Litovsk (3 March 1918) Soviet Russia made peace with Germany and its allies and lost large areas in the west.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the Cheka?",
    ok: ["The Bolshevik secret police that hunted opponents", "Correct: it was founded in December 1917."],
    no: [
      ["The Red Army unit that guarded the Winter Palace", "The Cheka was a police body and not an army unit."],
      ["The committee that organised the Constituent Assembly", "The Cheka did not organise the Assembly."],
      ["The council that managed the nationalised factories", "Factories were run by other bodies, not the Cheka."],
    ],
    explanation: "The Cheka (All-Russian Extraordinary Commission) under Felix Dzerzhinsky arrested and executed opponents and carried out the Red Terror.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Bolsheviks close the Constituent Assembly in January 1918?",
    ok: ["It was led by Social Revolutionaries and rejected Soviet power", "Correct: they preferred rule through the soviets."],
    no: [
      ["It had voted to restore the Tsar to the throne of Russia", "It did not vote to restore the Tsar."],
      ["It had asked the German army to enter Petrograd and restore order", "It made no such request to Germany."],
      ["It had refused to take any decision about peace or land in Russia", "The Assembly's opposition was to Soviet power, not to peace and land."],
    ],
    explanation: "In the elections the Social Revolutionaries won more votes than the Bolsheviks. When the Assembly refused to recognise Soviet power, the Bolsheviks dissolved it after one sitting.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Lenin accept the harsh terms of Brest-Litovsk?",
    ok: ["He judged that the army could not fight and the revolution needed time", "Correct: survival came before land."],
    no: [
      ["He believed that Germany would soon be defeated and the loss would be small", "Lenin was not sure that Germany would be defeated so soon."],
      ["He had been paid by the German government to give up Russian land", "The 'German agent' charge is unproven and does not explain the treaty."],
      ["He wished to extend the Russian empire by gaining new lands in the west", "The treaty took land away from Russia."],
    ],
    hints: ["Think about the state of the army and the Bolsheviks' hold on power."],
    explanation: "Lenin argued that the revolution must survive at any price. The army had melted away, and refusal in February 1918 brought a new German advance.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which factor helped the Reds to win the Civil War?",
    ok: ["Control of the centre, with its railways and arms factories", "Correct: they could move troops between fronts."],
    no: [
      ["Large armies sent by Britain and France to fight for the Reds", "Britain and France supported the Whites, to a limited extent."],
      ["A single White leader who commanded all the opposition forces", "The Whites had no single commander."],
      ["The return of the Tsar to rally the peasants against the landlords", "The Tsar and his family were killed in 1918."],
    ],
    hints: ["Think of geography and communications."],
    explanation: "The Reds held Moscow and Petrograd and the railway network, while the Whites were scattered around the edges and divided in their aims.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was grain requisitioning under War Communism?",
    ok: ["Taking grain from peasants by force to feed the army and towns", "Correct: it was the most hated feature of the policy."],
    no: [
      ["The sale of grain to foreign countries in exchange for machinery", "Requisitioning was a domestic seizure, not a trade."],
      ["The payment of a fair price for grain on the open market", "Requisitioning replaced the market with force."],
      ["The distribution of free seed grain to every peasant household", "It was a taking, not a gift."],
    ],
    hints: ["Think of what the state took from the countryside."],
    explanation: "Armed detachments seized grain from the peasants, who responded by growing less. Requisitioning contributed to the famine of 1921-22 and to the revolts that led to NEP.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why was the Kronstadt Mutiny of 1921 particularly alarming for the Bolsheviks?",
    ok: ["The sailors had been among the strongest supporters of the revolution in 1917", "Correct: even loyal supporters had turned against the regime."],
    no: [
      ["The sailors planned to hand the naval base to the German navy", "There is no evidence of a German plot."],
      ["The sailors were led by the Tsar's former generals and ministers", "The rebels were mostly ordinary sailors and workers."],
      ["The mutiny began in Moscow and spread rapidly to the whole country", "It began at the naval base, and it did not spread."],
    ],
    hints: ["Think of the role of the Kronstadt sailors in 1917."],
    explanation: "The sailors had helped to bring the Bolsheviks to power. Their call for free soviet elections and an end to requisitioning, with strikes and peasant risings, showed that the regime had lost much support.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best describes the New Economic Policy?",
    ok: ["An economic retreat that left the party's political monopoly intact", "Correct: private trade returned, but power did not change."],
    no: [
      ["A return to capitalism with the end of party control of the state", "Political control stayed with the party."],
      ["A plan to abolish money and move straight to full communism", "That is closer to War Communism than to NEP."],
      ["A programme of rapid industrialisation and collectivisation of farms", "That was Stalin's policy of the late 1920s."],
    ],
    hints: ["Think of what changed in the economy and what did not change in politics."],
    explanation: "NEP allowed private trade and a tax in kind, but the Communist Party kept its monopoly of power, banned factions and controlled the commanding heights of the economy.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Leon Trotsky, as Commissar for War, built the Red Army in the Civil War.",
    answer: true,
    explanation: "True. He introduced conscription, used former Tsarist officers under political commissars and directed the army from his armoured train.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The New Economic Policy ended grain requisitioning and replaced it with a tax.",
    answer: true,
    explanation: "True. In March 1921 the fixed tax in kind replaced requisitioning, and peasants could sell any surplus.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Foreign intervention was the main reason why the Bolsheviks won the Civil War.",
    answer: false,
    hints: ["Think of how large the intervention was and whom it helped."],
    explanation: "False. Intervention was limited, and it helped Bolshevik propaganda by making the Whites look like tools of foreign powers. The main reasons were organisation, geography and the divisions of the Whites.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Felix Dzerzhinsky", "Head of the Cheka"],
      ["Admiral Kolchak", "White leader in Siberia"],
      ["General Wrangel", "White commander in the Crimea in 1920"],
      ["Leon Trotsky", "Commissar for War who built the Red Army"],
    ],
    explanation: "Dzerzhinsky (Cheka), Kolchak (Siberia, 1918-20), Wrangel (Crimea, 1920) and Trotsky (Red Army).",
  });
  chrono(b, [
    "The Constituent Assembly is dissolved",
    "The Treaty of Brest-Litovsk is signed",
    "The Red Terror begins",
    "The Kronstadt Mutiny",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from January 1918 to March 1921."],
    explanation: "January 1918; 3 March 1918; September 1918; March 1921.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The economic policy of 1918-21 based on grain requisitioning was called {{blank:a}}, and it was replaced in 1921 by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["War Communism"], choices: ["War Communism", "the Five Year Plan", "collectivisation", "the Great Turn"] },
      { id: "b", accepted: ["New Economic Policy"], choices: ["New Economic Policy", "Kronstadt Programme", "Decree on Land", "Gosplan"] },
    ],
    explanation: "War Communism (1918-21) gave way to the New Economic Policy in March 1921.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which month and year did the Kronstadt Mutiny take place?",
    accepted: ["March 1921", "march 1921"],
    wrong: ["November 1917"],
    explanation: "**March 1921**. It was crushed on 17-18 March, and the Tenth Party Congress introduced NEP in the same month.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main features of War Communism.",
    points: ["The state took over large and most small industry", "Grain was requisitioned from the peasants by armed detachments", "Private trade was banned and food and goods were rationed", "Labour was conscripted and discipline was harsh in the factories"],
    modelAnswer: "The state took over large and most small industry. Grain was requisitioned from the peasants by armed detachments, and private trade was banned while food and goods were rationed. Labour was conscripted and discipline in the factories was harsh.",
    explanation: "One mark for each accurate feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Whites lost the Civil War.",
    points: [["They were scattered around the edges of Russia and divided, with no common command, so the Reds could defeat each army in turn", 2], ["They had no clear policy on land and the peasants feared a return of the landlords, while their reliance on foreign help let the Bolsheviks pose as defenders of Russia", 2]],
    hints: ["Think of geography, unity and the peasants."],
    modelAnswer: "The Whites were scattered around the edges of Russia and had no common command, so the Reds could defeat each army in turn. They also had no clear policy on land, and the peasants feared a return of the landlords, while their reliance on foreign help let the Bolsheviks pose as defenders of Russia.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Lenin introduced the New Economic Policy in 1921.",
    points: [["War Communism had caused famine, a collapse of production and peasant revolts, and Kronstadt showed the loss of support", 2], ["Lenin judged that a retreat to a tax in kind and private trade would restore the economy and the peasants' goodwill while the party kept power", 2]],
    hints: ["Think of the crisis of early 1921 and what Lenin wanted to protect."],
    modelAnswer: "War Communism had caused famine, a collapse of production and peasant revolts, and the Kronstadt Mutiny showed that the Bolsheviks had lost support even among their allies. Lenin judged that a retreat to a tax in kind and private trade would restore the economy and the goodwill of the peasants, while the party kept political power.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a resolution of a fictional meeting of sailors at a naval base, March 1921",
        "We have lost trust in the Communists who rule in the name of the soviets. We ask for new elections by secret ballot, for freedom of speech for workers and peasants, and for an end to the seizure of grain by armed detachments. We are not the enemies of the revolution. We want the soviets without party masters."),
      "",
      source("Source B", "an official bulletin issued by a fictional Bolshevik committee, March 1921",
        "A rebellion has been raised by traitors and former officers, who are paid by foreign powers. The honest sailors have been deceived. The Red Army will crush the revolt, and those who surrender will have their lives spared. The Republic will not permit enemies of the workers to divide the revolution."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A demand?", points: ["New elections by secret ballot and freedom of speech", "An end to the seizure of grain / soviets without party masters"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B say about the rebels' loyalty to the revolution.", points: [["Agree: both accept that the sailors' own cause was the revolution or the soviets, and B says honest sailors were deceived", 2], ["Differ: A says that the sailors are not enemies of the revolution but that the party has betrayed it; B says that the rebellion was raised by traitors and former officers paid by foreign powers", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the causes and results of the Kronstadt Mutiny?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows the rebels' demands (free elections, free speech, an end to requisitioning), which fit the grievances of 1921, but is the rebels' own statement and so presents their motives favourably", 2], ["B shows how the regime presented the rebellion (as a plot by traitors) and its readiness to use force, but it is propaganda and the claim of foreign pay is not supported by evidence", 2], ["Own knowledge: War Communism, strikes and peasant risings, the Red Army's attack on 17-18 March, the ban on factions and the launch of NEP", 2]], modelAnswer: "Source A is useful because it sets out the rebels' own demands for free elections, free speech and an end to requisitioning, which fit the grievances of 1921 under War Communism, but as the rebels' statement it presents their motives in the best light. Source B is useful for showing how the regime portrayed the rebellion as a plot by traitors and foreign powers and its readiness to crush it, but it is propaganda and the foreign-pay claim is unsupported. Using my knowledge that the rising was crushed in March 1921 and that NEP followed, I conclude that the sources are useful for the causes and for the regime's response, though each must be treated with care." }),
    ],
    hints: ["For (c), consider why each source was written and what you know of the results."],
    explanation: "Both sources are invented: a sailors' resolution and a Bolshevik bulletin.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of Trotsky and the Red Army in the Bolshevik victory in the Civil War.",
    levels: levels(8),
    points: [
      ["Trotsky built the Red Army: conscription, former Tsarist officers under commissars, discipline and organisation, and personal leadership at the fronts", 2],
      ["Other factors: control of the centre and railways, War Communism supplies, the Cheka and the Red Terror", 2],
      ["White weaknesses: geographical separation, disunity, lack of a land policy and a reliance on foreign help", 2],
      ["A supported judgement on the army's importance compared with the Whites' weakness", 2],
    ],
    hints: ["Weigh Red strengths against White weaknesses."],
    modelAnswer: "Trotsky and the Red Army were very important. Trotsky built an army of conscripts, used former Tsarist officers under political commissars, and provided discipline and organisation. But the Reds also gained from holding the centre and its railways and factories, from the supplies seized by War Communism and from the terror of the Cheka. The Whites were separated geographically and divided in aims, with no land policy, and their reliance on foreign help harmed them. I conclude that the Red Army was essential, but the Whites' weaknesses made its task easier, so both sides' qualities explain the outcome.",
    explanation: "Credit explained points on both sides and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'The New Economic Policy was a betrayal of the aims of the Bolshevik revolution.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Support: NEP allowed private trade, richer peasants and Nepmen, which many communists saw as a return of capitalism", 3],
      ["Challenge: the state kept the commanding heights (heavy industry, banks, foreign trade) and the party's political monopoly; Lenin called it a temporary retreat", 3],
      ["Context: War Communism's failure, famine, Kronstadt and peasant risings forced a change to save the regime", 3],
      ["A supported judgement, for example that NEP changed the means and not the aim of the party, which kept power", 3],
    ],
    hints: ["Separate the party's political aims from its economic methods."],
    modelAnswer: "There is some truth in the statement, but I disagree with it overall. NEP allowed private trade, richer peasants and the 'Nepmen' to prosper, and many communists saw this as a betrayal of socialism and a return to capitalism. But the state kept control of heavy industry, banks and foreign trade, and the party kept its political monopoly, which was reinforced by the ban on factions in 1921. Lenin called NEP a temporary retreat to allow recovery after the failures of War Communism, which had brought famine, revolts and the Kronstadt Mutiny. The aim of building socialism was not abandoned. What changed was the method and the speed. I therefore conclude that NEP was a tactical retreat that saved the regime, not a betrayal, although the arguments within the party over it show how far many communists felt it to be one.",
    explanation: "Credit both sides and a judgement.",
  });

  b.card("DEFINITION", "What was War Communism?", "The policy of 1918-21 of state control of industry, forced grain requisitioning, rationing and labour conscription to supply the Red Army in the Civil War.");
  b.card("DEFINITION", "What was the New Economic Policy?", "The policy of March 1921 that replaced requisitioning with a tax in kind and allowed small-scale private trade, while the state kept heavy industry, banks and foreign trade.");
  b.card("FACT", "What were the main terms of Brest-Litovsk (3 March 1918)?", "Russia made peace with Germany and lost Poland, the Baltic provinces, Ukraine and Finland, with about a third of its population and much of its industry and coal.");
  b.card("FACT", "Who led the Cheka?", "Felix Dzerzhinsky; it was founded in December 1917 and carried out the Red Terror.");
  b.card("FACT", "What happened at Kronstadt in March 1921?", "Sailors at the naval base rose against the Bolsheviks, demanding free soviet elections and an end to requisitioning; the Red Army crushed them on 17-18 March.");
  b.card("FACT", "Who were the leading White commanders?", "Kolchak in Siberia, Denikin in the south, Yudenich near Petrograd and Wrangel in the Crimea.");
  b.card("CONCEPT", "Why did the Reds win the Civil War?", "They held the centre and railways, Trotsky built the Red Army, War Communism supplied it, and the Whites were scattered and disunited with no land policy.");
  b.card("CONCEPT", "Why did the Bolsheviks close the Constituent Assembly?", "The Social Revolutionaries had won more votes and the Assembly refused to accept Soviet power, so they dissolved it in January 1918.");
  b.card("CONCEPT", "Why did Lenin introduce NEP?", "War Communism had caused famine, collapse and revolts such as Kronstadt, so he retreated to private trade and a tax in kind to save the regime.");
});
