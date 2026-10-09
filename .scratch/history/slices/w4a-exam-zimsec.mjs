// W4a: ZIMSEC Paper 2 exam-format items (structured questions, 25 marks each = 5 + 12 + 8) on topic 14:
// the Russian Revolution, and Stalin's domestic policy. ZIMSEC naming: the February and October Revolutions
// (old-style dates). Part structure is our convention (reviewer to check).
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const Z = EXAM.ZIM_STRUCTURED;
const common = { skill: Z.skill, applies: Z.applies, secs: Z.secs, examStyle: true, paper: "Paper 2" };
const RU = (n) => `hist.russia.${n}`;

concept(RU("revolutions-1917"), { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec" }, (b) => {
  // 1. The Russian Revolution (topic 14)
  b.struct({
    ...common, d: 4,
    concepts: [RU("revolutions-1917"), RU("tsarist-1905")],
    stem: "**The Russian Revolution of 1917.** Answer all parts.",
    hints: ["(b) needs causes of both revolutions, long-term and short-term, explained.", "(c) needs Lenin's role weighed against other factors, then a judgement."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the Russian Revolution.", template: "The February Revolution of 1917 forced Tsar {{blank:a}} to abdicate. He was replaced by the {{blank:b}} Government, which was led from July 1917 by {{blank:c}}. The Bolsheviks seized power in the October Revolution under the leadership of {{blank:d}}. The rising in Petrograd was organised by the Soviet's Military Revolutionary Committee, led by {{blank:e}}.", blanks: [
        { id: "a", accepted: ["Nicholas II"], choices: ["Nicholas II", "Alexander II", "Alexander III", "Michael"] },
        { id: "b", accepted: ["Provisional"], choices: ["Provisional", "Soviet", "Duma", "National"] },
        { id: "c", accepted: ["Kerensky"], choices: ["Kerensky", "Lvov", "Kornilov", "Stolypin"] },
        { id: "d", accepted: ["Lenin"], choices: ["Lenin", "Stalin", "Gapon", "Witte"] },
        { id: "e", accepted: ["Trotsky"], choices: ["Trotsky", "Stalin", "Kamenev", "Bukharin"] },
      ], wrong: [["Alexander II", "Soviet", "Lvov", "Stalin", "Stalin"]], explanation: "Nicholas II abdicated; the Provisional Government was led by Lvov and, from July, Kerensky; Lenin led the Bolsheviks; Trotsky organised the rising." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain the causes of the February and October Revolutions of 1917.", points: [
        ["February, long-term: autocracy and the broken promises of 1905; peasant land hunger; poor conditions of workers", 2],
        ["February, the war: defeats and huge casualties; the Tsar took command (1915) and was blamed; Tsarina and Rasputin discredited the government", 2],
        ["February, trigger: food and fuel shortages and inflation; strikes in Petrograd; the garrison mutinied and joined the crowds", 2],
        ["October: the Provisional Government continued the war (failed offensive) and delayed land reform and elections; dual power", 2],
        ["October: Lenin's April Theses and 'Peace, Land and Bread' won support; Bolshevik majorities in the soviets", 2],
        ["October: the Kornilov affair armed the Red Guards; Trotsky's Military Revolutionary Committee seized Petrograd", 2],
      ], modelAnswer: "The February Revolution had long-term causes. Russia was an autocracy, and the Tsar had broken most of the promises of the October Manifesto of 1905. Peasants still wanted the landlords' land, and factory workers lived and worked in poor conditions.\n\nThe First World War turned this discontent into a crisis. The army suffered terrible defeats and millions of casualties, and after 1915, when Nicholas II took personal command, he was blamed for every failure. At home the Tsarina and Rasputin made the government look incompetent.\n\nThe trigger was hunger. The railways could not carry both soldiers and food, so Petrograd ran short of bread and fuel while prices soared. In February 1917 strikes and bread queues turned into mass demonstrations, and when the soldiers of the Petrograd garrison refused to fire on the crowds and joined them, the Tsar was forced to abdicate.\n\nThe October Revolution was caused by the failures of the Provisional Government. It kept Russia in the war, and the failed offensive of mid-1917 led to mass desertion. It delayed land reform and the elections to the Constituent Assembly, and it shared power with the Petrograd Soviet, which controlled the soldiers.\n\nThe Bolsheviks used these failures. Lenin's April Theses rejected the government and promised 'Peace, Land and Bread', and by September the Bolsheviks had majorities in the Petrograd and Moscow Soviets. The Kornilov affair was decisive: Kerensky armed the workers, including the Bolshevik Red Guards, and the Bolsheviks appeared as defenders of the revolution. In October Trotsky's Military Revolutionary Committee seized the key points of Petrograd and the Winter Palace.", explanation: "Six developed causes across both revolutions." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent was Lenin responsible for the success of the October Revolution?", points: [
        ["Responsible: April Theses, slogans and opposition to the government; insisted on an armed rising and persuaded the Central Committee", 2],
        ["Other people: Trotsky's organisation of the Military Revolutionary Committee and the Red Guards", 2],
        ["Other factors: failures of the Provisional Government (war, land, Kornilov affair); popular demand for peace and land", 2],
        ["Supported judgement", 2],
      ], levels: levels(8), modelAnswer: "Lenin was largely responsible. When he returned in April 1917 his April Theses turned the Bolsheviks against the Provisional Government, and his slogans of 'Peace, Land and Bread' and 'All power to the Soviets' won support from soldiers, peasants and workers. In October he persuaded a reluctant Central Committee to vote for an armed rising.\n\nHowever, he did not act alone. Trotsky, as chairman of the Petrograd Soviet, organised the rising through the Military Revolutionary Committee and the Red Guards. The Provisional Government's own failures, continuing the war, delaying land reform and elections, and arming the Red Guards during the Kornilov affair, gave the Bolsheviks their opportunity.\n\nTo a large extent Lenin was responsible, because without his insistence the Bolsheviks would not have seized power when they did; but the rising succeeded because Trotsky organised it well and because the government had lost almost all its support.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the Russian Revolution (topic 14).",
  });

  // 2. Stalin's domestic policy (topic 14)
  b.struct({
    ...common, d: 5,
    concepts: [RU("stalin-economy"), RU("stalin-power")],
    stem: "**Stalin's domestic policies, 1928-1941.** Answer all parts.",
    hints: ["(b) should cover the economy (plans and collectivisation) and political control (purges, propaganda).", "(c) needs benefits and costs for different groups, then a judgement."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about Stalin's USSR.", template: "The first Five-Year Plan began in {{blank:a}}. Collective farms were called {{blank:b}}. Peasants who resisted collectivisation were labelled {{blank:c}}. Stalin's secret police in the late 1930s was the {{blank:d}}. Stalin's rival {{blank:e}} was deported from the USSR in 1929.", blanks: [
        { id: "a", accepted: ["1928"], choices: ["1928", "1917", "1921", "1934"] },
        { id: "b", accepted: ["kolkhozy"], choices: ["kolkhozy", "soviets", "mirs", "zemstvos"] },
        { id: "c", accepted: ["kulaks"], choices: ["kulaks", "Nepmen", "Stakhanovites", "Mensheviks"] },
        { id: "d", accepted: ["NKVD"], choices: ["NKVD", "Okhrana", "Gestapo", "SS"] },
        { id: "e", accepted: ["Trotsky"], choices: ["Trotsky", "Bukharin", "Kirov", "Lenin"] },
      ], wrong: [["1921", "soviets", "Nepmen", "Okhrana", "Bukharin"]], explanation: "The first plan began in 1928; collective farms were kolkhozy; resisters were labelled kulaks; the NKVD carried out the Terror; Trotsky was deported in 1929." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the domestic policies of Stalin between 1928 and 1941.", points: [
        ["Five-Year Plans: Gosplan targets for heavy industry (coal, steel, oil, electricity); first plan 1928-32", 2],
        ["Projects and methods: Magnitogorsk, Dnieper dam, Moscow Metro; Stakhanovites; harsh labour discipline; Gulag labour", 2],
        ["Collectivisation from 1929: kolkhozy, grain quotas, Machine Tractor Stations; about nine-tenths collectivised by the mid-1930s", 2],
        ["Dekulakisation: kulaks shot or deported; peasants slaughtered livestock; famine of 1932-33 (estimates about 5-7 million deaths)", 2],
        ["Purges: Kirov's murder (1934); show trials (Zinoviev, Kamenev, Bukharin); army purge; Great Terror 1937-38; NKVD and Gulag", 2],
        ["Propaganda and society: cult of personality; socialist realism; religion attacked; women in work; Russification of minorities", 2],
      ], modelAnswer: "In 1928 Stalin abandoned the NEP and began the Five-Year Plans. The state planning agency, Gosplan, set targets for every industry, concentrating on heavy industry: coal, steel, oil and electricity. The first plan ran from 1928 and was declared complete in 1932, followed by a second (1933-37) and a third (from 1938), which turned increasingly to armaments.\n\nHuge projects were built, such as the steel city of Magnitogorsk, the Dnieper dam and the Moscow Metro. Workers were driven by bonuses, propaganda and the example of Stakhanovites, but also by harsh discipline, and prisoners of the Gulag provided forced labour.\n\nFrom 1929 Stalin forced the peasants into collective farms, kolkhozy, which had to deliver grain quotas to the state and received machinery from Machine Tractor Stations. By the mid-1930s about nine-tenths of households had been collectivised.\n\nPeasants who resisted were labelled kulaks; many were shot and about 1.8 million people were deported in 1930-31, according to historians' estimates. Peasants slaughtered their animals rather than hand them over, and the state's grain seizures led to the famine of 1932-33, in which historians estimate about 5 to 7 million people died, especially in Ukraine and Kazakhstan.\n\nStalin also used terror. After Kirov's murder in 1934, show trials destroyed the Old Bolsheviks such as Zinoviev, Kamenev and Bukharin, the army's leaders were purged in 1937, and in the Great Terror of 1937-38 the NKVD arrested about 1.5 million people and executed about 680,000 (estimates).\n\nFinally, propaganda built a cult of personality around Stalin, writers and artists had to follow socialist realism, churches were closed, millions of women entered paid work, and minorities faced Russification.", explanation: "Six developed points across economic and political policy." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far did Stalin's domestic policies benefit the people of the Soviet Union?", points: [
        ["Benefits: jobs (no unemployment), education and literacy, promotion for workers and peasants' children; women in work and training", 2],
        ["Benefits: the USSR became an industrial and military power, which helped it survive the German invasion", 2],
        ["Costs: famine, deportation, Terror and the Gulag; falling living standards; consumer goods neglected; loss of freedom", 2],
        ["Supported judgement", 2],
      ], levels: levels(8), modelAnswer: "Some people benefited. Unemployment disappeared, education and literacy spread, and many workers and the children of peasants were trained and promoted to become engineers, managers and officials. Millions of women entered paid work and training. The country as a whole became an industrial and military power, which helped it survive the German invasion of 1941.\n\nHowever, the costs were enormous. Collectivisation and the famine of 1932-33 killed millions of peasants, and about 1.8 million people were deported as kulaks. Workers faced falling real wages in the early 1930s, overcrowded housing and harsh discipline, and consumer goods were neglected. The Terror and the Gulag affected millions, and no one was free to speak openly.\n\nOverall Stalin's policies benefited the Soviet state and a minority who rose in the new system far more than the people as a whole; for most peasants, and for the victims of the Terror, they brought suffering rather than benefit.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on Stalin's domestic policies (topic 14).",
  });
});
