// W4b: ahist.stalin.economy (both boards; Cambridge Paper 4 key question 2.3).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.stalin.economy", { file: "stalin/economy", keyPrefix: "stalin.economy" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What name was given to Soviet collective farms?",
    ok: ["Kolkhozy, farms worked in common by the peasants", "Correct: peasants were forced to join them."],
    no: [
      ["Sovkhozy, large farms run directly by the state", "Sovkhozy were state farms; the collective farms were kolkhozy."],
      ["Artels, small workshops of craftsmen in the towns", "Artels were not farms."],
      ["Zemstva, rural councils elected by landowners", "Zemstva were Tsarist-era local councils."],
    ],
    explanation: "A kolkhoz was a collective farm. A sovkhoz was a state farm with paid workers.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which Soviet body drew up the Five Year Plans?",
    ok: ["Gosplan, the State Planning Commission", "Correct: it set targets for each sector."],
    no: [
      ["Sovnarkom, the Council of People's Commissars", "Sovnarkom was the government; Gosplan prepared the plans."],
      ["The Cheka, the first Bolshevik secret police", "The Cheka was a police body."],
      ["The Comintern, the body for foreign communist parties", "The Comintern dealt with foreign communist parties."],
    ],
    explanation: "Gosplan, founded in 1921, drew up the plans with the party leadership setting the main goals.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Stalin end NEP in 1928-29?",
    ok: ["The grain shortages and the wish to industrialise the USSR very quickly", "Correct: the crisis of 1927-28 pushed him to act."],
    no: [
      ["An agreement with foreign banks that ordered the Soviets to end private trade", "No such agreement existed."],
      ["A rising of the workers in Moscow who demanded collective farms at once", "The change came from the top."],
      ["A decision by the Duma that NEP had enriched the landlords too much", "There was no Duma in the USSR."],
    ],
    explanation: "Peasants withheld grain in 1927-28 and the towns were short of food. Stalin concluded that the state must control the grain and drive industrialisation.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was dekulakisation?",
    ok: ["The campaign to remove the supposedly rich peasants as a class, by force", "Correct: it was used to break resistance to collectivisation."],
    no: [
      ["The plan to give the best land to peasants who had served in the army", "It was not a reward for army service."],
      ["The training of party workers to run the collective farms and the schools", "It was not a training programme."],
      ["The policy of selling grain to foreign merchants to pay for machinery", "That was a policy of exports, not dekulakisation."],
    ],
    hints: ["Think of who the 'kulaks' were said to be."],
    explanation: "Dekulakisation meant arresting, deporting and dispossessing peasants labelled kulaks, a label applied widely to any who resisted collectivisation.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What was the effect of collectivisation on livestock in the early 1930s?",
    ok: ["The numbers fell sharply as peasants killed animals rather than hand them over", "Correct: herds took years to recover."],
    no: [
      ["The numbers rose quickly as the collective farms bred more animals", "The numbers fell."],
      ["The numbers stayed the same because the state forbade slaughter in the villages", "Peasants slaughtered animals despite the rules."],
      ["The numbers rose because the state bought animals from foreign farmers", "No such large purchases were made."],
    ],
    hints: ["Think of what the peasants did with their animals."],
    explanation: "Many peasants slaughtered cattle, pigs and sheep rather than give them to the collectives, and livestock numbers fell by a large fraction. They did not recover to the 1928 level until the late 1930s.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the purpose of the Stakhanovite movement?",
    ok: ["To encourage workers to raise their output far above the official norm", "Correct: Stakhanovites gained honours and higher pay."],
    no: [
      ["To set up free trade unions independent of the managers and the party", "Unions remained under party control."],
      ["To reduce the working day of miners to a shorter and safer shift", "The aim was higher output, not shorter hours."],
      ["To train managers to leave the factories and work on the farms", "It was not a training scheme for managers."],
    ],
    hints: ["Think of the miner Alexei Stakhanov in 1935."],
    explanation: "Alexei Stakhanov was reported to have cut 102 tons of coal in a shift in August 1935. The campaign aimed to push all workers to exceed norms, though it caused resentment as norms were then raised.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which evidence best supports the view that the Five Year Plans caused hardship for workers?",
    ok: ["Real wages fell sharply in the early 1930s and food was rationed until 1935", "Correct: consumption was sacrificed for heavy industry."],
    no: [
      ["Magnitogorsk and Dnieprostroi were built within a few years of the first plan", "This shows industrial achievement."],
      ["Industrial output of steel, coal and electricity rose several times by 1940", "This shows growth in production."],
      ["Women were recruited into factories in large numbers in the 1930s", "This is a change in employment and does not show hardship."],
    ],
    hints: ["Which fact is about the standard of living?"],
    explanation: "Real wages fell sharply in the early 1930s, there was rationing and overcrowding, and consumer goods were neglected in favour of heavy industry.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the famine of 1932-33 is best supported by the evidence?",
    ok: ["It killed millions, and historians differ on whether it was aimed at Ukrainians", "Correct: causes and intent are debated."],
    no: [
      ["It was caused only by drought, with no connection to state policy", "Policy on grain quotas and exports was a major cause."],
      ["It was limited to a single province and killed fewer than a thousand people", "It affected several regions and killed millions."],
      ["It was the result of the German invasion and the occupation of Ukraine", "It took place nine years before the invasion."],
    ],
    hints: ["Think of the estimated deaths and of the debate about the Holodomor."],
    explanation: "Estimates of 5 to 8 million deaths are uncertain. Historians agree that state grain quotas contributed, and disagree on whether the policy deliberately targeted Ukrainians or the peasantry as a whole.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The First Five Year Plan concentrated mainly on heavy industry.",
    answer: true,
    explanation: "True. It stressed coal, iron, steel, electricity and machinery, with consumer goods given a low priority.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In 'Dizzy with Success' (March 1930) Stalin blamed local officials for excesses in collectivisation.",
    answer: true,
    explanation: "True. He used the article to slow the campaign and shift the blame, but pressure on the peasants resumed.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Soviet production figures for the Five Year Plans can be used as exact and fully reliable evidence.",
    answer: false,
    hints: ["Think of why managers might falsify reports."],
    explanation: "False. Managers feared punishment for failure and falsified results, and the regime announced early completion. Historians use the figures as estimates and compare them with other evidence.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Kolkhoz", "A collective farm"],
      ["Sovkhoz", "A farm run directly by the state"],
      ["Gosplan", "The State Planning Commission"],
      ["Kulak", "A supposedly rich peasant who was attacked as a class"],
    ],
    explanation: "Kolkhoz (collective), sovkhoz (state farm), Gosplan (planners) and kulak (targets of dekulakisation).",
  });
  chrono(b, [
    "The grain procurement crisis",
    "Stalin announces the liquidation of the kulaks as a class",
    "The famine in Ukraine, the Volga and Kazakhstan",
    "Stakhanov's record is announced",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1927 to 1935."],
    explanation: "1927-28; December 1929; 1932-33; August 1935.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The First Five Year Plan began in {{blank:a}}, and the miner whose record in 1935 inspired a movement was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1928"], choices: ["1921", "1928", "1936", "1941"] },
      { id: "b", accepted: ["Stakhanov"], choices: ["Stakhanov", "Kirov", "Bukharin", "Zhukov"] },
    ],
    explanation: "The first plan began in October 1928. Alexei Stakhanov's record gave his name to the movement of 1935.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Soviet steel city built in the Urals during the First Five Year Plan.",
    accepted: ["Magnitogorsk", "Magnitogorsk steel city"],
    wrong: ["Kiev"],
    explanation: "**Magnitogorsk**, a steel city built beside a mountain rich in iron ore.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main features of collectivisation.",
    points: ["Peasants were forced to give up their land and animals and join large collective farms", "Rich peasants (kulaks) were deported or imprisoned and their property seized", "The state set grain quotas and bought the grain at low fixed prices", "Machine Tractor Stations supplied machinery and the farms were controlled by the party"],
    modelAnswer: "Peasants were forced to give up their land and animals and join large collective farms. Kulaks were deported or imprisoned and their property seized. The state set grain quotas and bought grain at low fixed prices, and Machine Tractor Stations supplied machinery and kept the farms under party control.",
    explanation: "One mark for each accurate feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why many peasants resisted collectivisation.",
    points: [["They lost their land, animals and independence and had to work for the state on the collective farm", 2], ["Dekulakisation and heavy grain quotas threatened them with exile or hunger, so they killed their livestock or hid grain", 2]],
    hints: ["Think of what the peasants lost and what they feared."],
    modelAnswer: "The peasants lost their land, animals and independence and had to work for the state on the collective farm. Dekulakisation and heavy grain quotas threatened them with exile or hunger, so they killed their livestock or hid grain.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the figures for Soviet industrial production in the 1930s need to be treated with caution.",
    points: [["Managers feared punishment for failing to meet targets, so they falsified or exaggerated reports", 2], ["The regime announced the plans as fulfilled early and used the figures for propaganda, while Western estimates were lower", 2]],
    hints: ["Think of who produced the figures and why."],
    modelAnswer: "Managers feared punishment for failing to meet targets, so they falsified or exaggerated their reports. The regime also announced the plans as fulfilled early and used the figures for propaganda, while Western estimates were lower.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an article in a fictional Soviet newspaper, 1931",
        "In the village of Krasny Put the poor and middle peasants have joined the kolkhoz with joy. The kulaks have been removed, and the new tractor will plough the fields of the whole village. The old ways of the village are dying. Soon there will be bread for the workers of the new factories."),
      "",
      source("Source B", "a private letter by a fictional peasant woman to her son in the city, spring 1933",
        "They took our cow and our seed for the quotas, and the men from the district came again and searched the house. People are eating bark and roots. Your uncle has gone with his family and we do not know where. Do not write to us about the new tractor. Send us bread if you can."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the effects of collectivisation in the village?", points: ["The kulaks have been removed", "The tractor will plough all the village fields, and there will be bread for the workers"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about collectivisation.", points: [["Agree: both refer to the removal or loss of families and to the tractor and the demands of the state", 2], ["Differ: A presents a village that welcomes change and promises bread; B describes seizure, hunger and fear", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the effects of collectivisation?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of what the regime wanted people to read, including the label 'kulak' and the promise of machinery, but it is state propaganda and cannot show real feelings", 2], ["B is useful as private evidence of seizures, hunger and deportation, which fits the famine, but it is one person's account and cannot show how typical it was", 2], ["Own knowledge: dekulakisation, grain quotas, resistance and the famine of 1932-33 support B and show the limits of A", 2]], modelAnswer: "Source A is useful because it shows what the regime wanted people to read, with the kulaks removed and machinery promised, but as state propaganda it cannot show the real feelings of the peasants. Source B is a private letter and gives evidence of seizures, hunger and deportation that fits what we know of the grain quotas and the famine of 1932-33, but it comes from one family and may not be typical. Together they show the official image and the experience of the peasants, so they are useful to a historian, especially B for the human cost." }),
    ],
    hints: ["For (c), consider the purpose of a newspaper article and of a private letter."],
    explanation: "Both sources are invented: a newspaper article and a peasant's letter.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the reasons why Stalin introduced collectivisation.",
    levels: levels(8),
    points: [
      ["The grain crisis of 1927-28: the state wanted control of the grain supply to feed the towns", 2],
      ["Industrialisation: grain exports to pay for machinery and labour released from the land", 2],
      ["Ideology and politics: socialism meant collective ownership, and the policy defeated the Right and removed the kulaks as a class", 2],
      ["A supported judgement on the relative importance of the reasons", 2],
    ],
    hints: ["Link collectivisation to the needs of industry and of the state."],
    modelAnswer: "Stalin introduced collectivisation mainly to control the grain supply. The crisis of 1927-28 showed that peasants would not sell enough grain at low prices, and the towns and the planned industrial expansion needed food and exports. Collectivisation also released labour for industry and fitted the ideology of socialism, in which land was owned in common, and it removed the kulaks as a class. I judge that the need for state control of grain was the main cause, because the other aims depended on it.",
    explanation: "Credit explained reasons and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'The Five Year Plans were a great success.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Success: heavy industry grew rapidly, new industrial cities were built and the USSR could produce weapons in large numbers by 1941", 3],
      ["Failures: figures were exaggerated, the quality was poor, consumer goods were neglected and real wages fell", 3],
      ["Human cost: forced labour, harsh discipline, the famine of 1932-33 that financed the plans and the purges of managers", 3],
      ["A supported judgement on criteria: it succeeded by the state's own aims but at a heavy cost and with waste", 3],
    ],
    hints: ["Decide whether 'success' is measured by output or by the cost."],
    modelAnswer: "By the state's own aims, the Five Year Plans were a success. Heavy industry grew rapidly, new cities such as Magnitogorsk and new plants were built, and by 1941 the USSR could produce tanks and aircraft in large numbers. However, the claims were exaggerated. Figures were falsified, the quality of goods was poor, consumer goods were neglected, and real wages fell. The human cost was very high: prisoners were used for forced labour, discipline was harsh, managers who failed were punished as wreckers, and the collectivisation that fed the plans caused the famine of 1932-33. I therefore agree only in part. The plans created an industrial base that was essential in the war, but they were wasteful and the price was heavy, so 'a great success' needs strong qualification.",
    explanation: "Credit both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What was collectivisation?", "The forced merging of peasant farms into large collective farms (kolkhozy), giving the state control of grain.");
  b.card("DEFINITION", "What was dekulakisation?", "The campaign from 1929-30 to remove 'rich' peasants as a class by deportation, imprisonment and seizure of property.");
  b.card("FACT", "What was the First Five Year Plan?", "The plan of 1928-32 that stressed heavy industry (coal, iron, steel, electricity); declared fulfilled in four years and three months.");
  b.card("FACT", "How many died in the famine of 1932-33?", "Historians estimate 5 to 8 million, in Ukraine, the Volga region, Kazakhstan and elsewhere; the figures are uncertain.");
  b.card("FACT", "Who was Alexei Stakhanov?", "A Donbas miner reported to have cut 102 tons of coal in one shift in August 1935, who gave his name to a movement for higher output.");
  b.card("FACT", "What were Magnitogorsk and Dnieprostroi?", "Symbols of the plans: a steel city in the Urals and a giant hydroelectric dam in Ukraine.");
  b.card("CONCEPT", "Why did Stalin end NEP?", "The grain crisis of 1927-28, the need for rapid industrialisation for security, ideology and politics.");
  b.card("CONCEPT", "How did workers fare under the Five Year Plans?", "They gained jobs and promotion but suffered falling real wages, rationing, poor housing and harsh discipline.");
  b.card("CONCEPT", "Why must Soviet production statistics be used with caution?", "Managers falsified reports and the regime exaggerated success; Western estimates are lower.");
});
