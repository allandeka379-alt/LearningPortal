// Slice W4a: Bolshevik rule, the Civil War and the NEP, 1917-1924 (both boards: ZIMSEC topic 14, 0470 Depth study C2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.russia.civil-war-nep", { file: "russia/civil-war-nep", keyPrefix: "russia.civil-war-nep" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which treaty ended Russia's war with Germany in March 1918?",
    options: [
      ["Brest-Litovsk", "Correct: signed on 3 March 1918."],
      ["Versailles", "Versailles was signed by Germany and the Allies in June 1919."],
      ["Portsmouth", "This ended the Russo-Japanese War in 1905."],
      ["Riga, signed with Poland", "The Treaty of Riga ended the war with Poland in 1921."],
    ],
    answer: "A",
    explanation: "By the **Treaty of Brest-Litovsk** Russia left the war and gave up huge territories.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who built and led the Red Army as Commissar for War during the Civil War?",
    options: [
      ["Trotsky", "Correct: he used conscription, former Tsarist officers and commissars."],
      ["Stalin", "Stalin served on some fronts but did not lead the Red Army."],
      ["Kolchak", "Kolchak was a White commander in Siberia."],
      ["Dzerzhinsky, head of the Cheka", "Dzerzhinsky led the secret police."],
    ],
    answer: "A",
    explanation: "**Trotsky** created the Red Army and directed it from his armoured train.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happened to the Constituent Assembly in January 1918?",
    options: [
      ["It was closed by the Bolsheviks after one day", "Correct: the Bolsheviks had won only about a quarter of the vote."],
      ["It elected Lenin as President of Russia", "It refused to accept Bolshevik rule."],
      ["It voted to restore the Tsar to the throne", "No party proposed this."],
      ["It approved the Treaty of Brest-Litovsk with a large majority", "It was closed before the treaty was signed."],
    ],
    answer: "A",
    explanation: "Red Guards **closed the Assembly** the day after it met, ending multi-party democracy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which measure was part of War Communism?",
    options: [
      ["Forced requisitioning of grain from peasants", "Correct: armed squads seized surplus grain."],
      ["Allowing peasants to sell their surplus for profit", "This was part of the NEP."],
      ["Returning small businesses to private owners", "This was part of the NEP."],
      ["Collective farms set up in every village", "Collectivisation came under Stalin from 1929."],
    ],
    answer: "A",
    explanation: "**Requisitioning** grain was the heart of War Communism, together with nationalisation and rationing.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the Kronstadt Rising of 1921 especially alarming for the Bolsheviks?",
    options: [
      ["The sailors had been strong supporters in 1917", "Correct: the revolution's own heroes had turned against it."],
      ["The sailors were led by White generals", "The rebels demanded free soviets, not a White government."],
      ["It was backed by a British invasion of Petrograd", "There was no British invasion."],
      ["The rebels captured Moscow for several weeks", "The rising was confined to the naval base."],
    ],
    hints: ["Who were the Kronstadt sailors in 1917?"],
    answer: "A",
    explanation: "The **Kronstadt sailors** had been heroes of 1917; their revolt showed how unpopular War Communism had become.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a major weakness of the White armies in the Civil War?",
    options: [
      ["They were divided and spread around the edges of Russia", "Correct: they could not co-ordinate."],
      ["They had no officers with military experience", "Many were experienced Tsarist officers."],
      ["They controlled Moscow and Petrograd but not the countryside", "The Reds held Moscow."],
      ["They refused all help from foreign governments", "They received foreign help."],
    ],
    hints: ["Think about where the White forces were and what they wanted."],
    answer: "A",
    explanation: "The Whites were **divided** in aims and **scattered** around Russia's edges, so the Reds beat them one by one.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the NEP was an economic success?",
    options: [
      ["Output returned to roughly pre-war levels by about 1926", "Correct: famine ended and trade revived."],
      ["The party banned factions at the Tenth Congress", "This was a political measure."],
      ["Many leading Bolsheviks saw it as a return to capitalism", "This was a criticism of the NEP."],
      ["Industrial prices rose faster than farm prices in 1923", "This was the 'scissors crisis', a problem."],
    ],
    hints: ["Look for evidence of recovery."],
    answer: "A",
    explanation: "Recovery to about **pre-war output** shows the NEP's economic success.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did Lenin accept the harsh terms of Brest-Litovsk?",
    options: [
      ["Without peace the revolution itself might not survive", "Correct: the army had collapsed."],
      ["Germany had promised to support the Bolsheviks in the Civil War", "Germany made no such promise."],
      ["The Constituent Assembly had voted for peace on any terms", "It had been closed in January."],
      ["He expected Russia to gain land in the treaty", "Russia lost large territories."],
    ],
    hints: ["What state was the Russian army in by early 1918?"],
    answer: "A",
    explanation: "With the army gone and Germans advancing, Lenin believed **peace was the price of survival**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lenin died in January 1924.",
    answer: true,
    explanation: "True. He died on 21 January 1924 after a series of strokes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under the NEP the state gave up control of heavy industry and banking.",
    answer: false,
    explanation: "False. The state kept the 'commanding heights': heavy industry, banking, transport and foreign trade.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Cheka", "Bolshevik secret police"],
      ["Nepmen", "Private traders who flourished under the NEP"],
      ["Whites", "Anti-Bolshevik forces in the Civil War"],
      ["Commanding heights", "Industries the state kept under the NEP"],
    ],
    explanation: "Cheka (December 1917), Nepmen (traders), Whites (anti-Bolsheviks), commanding heights (state sector).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Kronstadt Rising",
      "The Constituent Assembly is closed",
      "The Treaty of Brest-Litovsk",
      "The Tsar and his family are shot",
    ],
    right: POS,
    rightIndex: [3, 0, 1, 2],
    hints: ["The Assembly met before the peace treaty was signed."],
    explanation: "Assembly closed (January 1918); Brest-Litovsk (March 1918); Tsar shot (July 1918); Kronstadt (March 1921).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In 1918 the Bolsheviks moved the capital from Petrograd to {{blank:a}}. The policy announced in 1921 was called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Moscow"], choices: ["Moscow", "Kiev", "Yekaterinburg", "Kronstadt"] },
      { id: "b", accepted: ["New Economic Policy"], choices: ["New Economic Policy", "Five-Year Plan", "War Communism", "Great Turn"] },
    ],
    explanation: "The capital moved to **Moscow** in March 1918; the **New Economic Policy** replaced War Communism in 1921.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the naval base near Petrograd where sailors rebelled against the Bolsheviks in March 1921.",
    accepted: ["Kronstadt", "Kronshtadt", "Cronstadt"],
    wrong: ["Odessa"],
    explanation: "The **Kronstadt** Rising helped persuade Lenin to introduce the NEP.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the main features of the New Economic Policy.",
    points: [
      "Grain requisitioning replaced by a tax.",
      "Peasants could sell their surplus for profit.",
      "Small private businesses and trade allowed (Nepmen).",
      "State kept the commanding heights (heavy industry, banks, transport, foreign trade); new stable currency.",
    ],
    modelAnswer: "The NEP ended grain requisitioning and replaced it with a tax, so peasants could sell their surplus for profit. Small private businesses and private trade were allowed again, and traders known as Nepmen became common. The state kept control of the commanding heights of the economy, heavy industry, banking, transport and foreign trade, and a new, stable currency was introduced.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Lenin introduced the New Economic Policy in 1921.",
    points: [
      "Identifies economic collapse / famine caused by War Communism.",
      "Explains that requisitioning made peasants grow less, causing famine and the collapse of production.",
      "Identifies revolt / Kronstadt.",
      "Explains that peasant risings and the Kronstadt Rising showed the regime might fall unless it made concessions.",
    ],
    hints: ["Economic and political pressure."],
    modelAnswer: "War Communism had ruined the economy: peasants grew less because their surplus was seized, so famine struck in 1921 and industrial production collapsed. At the same time peasant revolts, such as in Tambov, and above all the Kronstadt Rising of March 1921 showed that even former supporters had turned against the regime, so Lenin made an economic retreat to keep political power.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Bolsheviks won the Civil War.",
    points: [
      "Identifies central position / control of railways and industry.",
      "Explains that interior lines let them move troops between fronts and supply the army.",
      "Identifies Trotsky and the Red Army.",
      "Explains conscription, former Tsarist officers under commissars and strict discipline produced an effective army.",
      "Identifies White weaknesses.",
      "Explains that the Whites were divided, scattered, feared as restorers of landlords, and foreign help was limited.",
    ],
    hints: ["Geography, leadership and the enemy's weaknesses."],
    modelAnswer: "The Reds held the centre of Russia, with Moscow, Petrograd, most of the industry and the railway network, so they could move troops from one front to another and keep the army supplied. Trotsky built an effective Red Army by conscription, using former Tsarist officers watched by political commissars and enforcing strict discipline. The Whites, by contrast, were divided in their aims and scattered around the edges of the country, so they could not co-ordinate; many peasants feared they would bring back the landlords; and foreign intervention was small and short-lived.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a leaflet of the kind issued by the Red Army in 1919", "Peasant! The Whites march with the landlords behind them. Where Denikin's army passes, the estates return to their old masters and the flogging begins again. Defend the land the revolution gave you. Join the Red Army!")}\n\n${source("Source B", "a complaint by fictional villagers from a district near Tambov to the local soviet, 1920", "The food squad came again last week. They took the seed grain as well as the surplus, and said that anyone hiding grain is an enemy of the people. We gave our sons to the Red Army. Now we have nothing to sow. Is this the land and bread we were promised?")}`,
    hints: ["Think about what each source shows about peasants and the Bolsheviks."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A?", points: [
        "A White victory would bring back the landlords and take the peasants' land.",
        "Peasants should join / support the Red Army to keep their land.",
      ], explanation: "Two points of message." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why do Sources A and B give such different impressions of peasant attitudes to the Bolsheviks?", points: [
        "A is Bolshevik propaganda aimed at winning peasants by stressing the White threat.",
        "B is peasants' own complaint about the effects of War Communism (requisitioning).",
        "A dates from 1919, when the White threat was greatest; B from 1920, when requisitioning bit hardest and Whites were mostly beaten.",
        "Peasants could fear the Whites and resent the Reds at the same time.",
      ], explanation: "Explain the differences from purpose, origin and date." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources help to explain both the Bolshevik victory in the Civil War and the introduction of the NEP?", points: [
        "A: explains victory: fear of the landlords' return kept peasants from supporting the Whites.",
        "A: propaganda; own knowledge confirms the Reds' use of propaganda and the Whites' link with landlords.",
        "B: explains the NEP: requisitioning destroyed peasant support and production (own knowledge: famine 1921, Tambov, Kronstadt).",
        "B: one village's complaint, but typical; shows the cost of War Communism.",
        "Limits: neither covers Trotsky's army, geography, White divisions or foreign intervention.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A helps to explain the Red victory: it shows the Bolsheviks persuading peasants that a White victory would bring back the landlords, and my own knowledge confirms that many peasants disliked the Reds but feared the Whites more. As propaganda it exaggerates, but it shows a real Red advantage. Source B helps to explain the NEP: requisitioning took even seed grain, leaving peasants unable to sow, and my own knowledge shows that this led to the famine of 1921, peasant revolts like Tambov and, with the Kronstadt Rising, Lenin's retreat. It is one village's complaint but typical. However, neither source mentions Trotsky's Red Army, the Reds' central position, the divisions of the Whites or the limited foreign intervention, so they explain only part of each development.", explanation: "Both developments assessed, with limits and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), define what 'success' could mean for the Bolsheviks."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the measures the Bolsheviks took to consolidate their power in 1917-18.", points: [
        "Decrees on Peace and Land (November 1917).",
        "Cheka set up (December 1917); opposition newspapers closed.",
        "Constituent Assembly closed (January 1918).",
        "Treaty of Brest-Litovsk (March 1918) ended the war; capital moved to Moscow.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How successful was the New Economic Policy?", points: [
        ["Success: farm output and trade recovered; famine ended; output near pre-war levels by about 1926", 2],
        ["Success: calmed peasants and ended revolts; the regime survived; stable currency", 2],
        ["Failure: heavy industry slow to recover; scissors crisis (1923); unemployment in towns", 2],
        ["Failure: Nepmen and richer peasants seen as a return to capitalism; split in the party", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The NEP was a success as a rescue operation. Once peasants could sell their surplus, food production recovered quickly, the famine of 1921 was not repeated, and private trade revived. By about 1926 overall output had returned to roughly pre-war levels. Peasant revolts died down, a stable currency was introduced, and the regime survived the crisis of 1921.\n\nHowever, the success was uneven. Heavy industry, which the state controlled, recovered more slowly than farming and small trade. In 1923 the prices of manufactured goods rose far faster than farm prices, the 'scissors crisis', and there was unemployment in the towns. Politically, many Bolsheviks hated the sight of Nepmen and prosperous peasants and saw the NEP as a return to capitalism, which split the party.\n\nOverall the NEP succeeded in its immediate aim of saving the economy and the regime, but it did not build the industrial, socialist economy the Bolsheviks wanted, which is why Stalin abandoned it in 1928-29.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Cheka", "The Bolshevik secret police, set up in December 1917 and led by Dzerzhinsky.");
  b.card("FACT", "What happened to the Constituent Assembly?", "It met in January 1918 and was closed by the Bolsheviks the next day.");
  b.card("FACT", "When was the Treaty of Brest-Litovsk signed?", "3 March 1918; Russia lost Poland, Finland, the Baltic lands and Ukraine.");
  b.card("DEFINITION", "War Communism", "Bolshevik policy of 1918-21: grain requisitioning, nationalisation, rationing and a ban on private trade.");
  b.card("DEFINITION", "New Economic Policy (NEP)", "Policy of 1921: tax instead of requisitioning, private trade and small businesses allowed, state kept the commanding heights.");
  b.card("FACT", "What was the Kronstadt Rising?", "A rebellion by sailors near Petrograd in March 1921, crushed by the Red Army.");
  b.card("FACT", "Name three White commanders.", "Kolchak (Siberia), Denikin (south) and Yudenich (near Petrograd).");
  b.card("FACT", "When did Lenin die?", "21 January 1924.");
  b.card("CONCEPT", "Why did the Reds win the Civil War?", "Central position and railways, Trotsky's Red Army, unity and terror, and divided, scattered Whites.");
});
