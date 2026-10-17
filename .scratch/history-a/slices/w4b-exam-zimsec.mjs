// W4b exam-format items: ZIMSEC 25-mark essays (EXAM.ZIM_ESSAY), Paper 2 (Regional and International History):
// the Russian Revolution x1 and China x1. Part structure and levels are our convention (a reviewer must check against the
// syllabus and ZIMSEC mark schemes).
import { concept, levels, EXAM } from "../lib.mjs";

const Z = EXAM.ZIM_ESSAY;
const base = { d: 5, skill: Z.skill, applies: Z.applies, secs: Z.secs, examStyle: true, marks: 25 };

concept("ahist.russia.bolshevik-consolidation", { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec" }, (b) => {
  // 1. Paper 2: the Bolsheviks 1917-24.
  b.essay({
    ...base, paper: "Paper 2",
    concepts: ["ahist.russia.bolshevik-consolidation", "ahist.russia.revolutions-1917"],
    stem: "To what extent was Lenin's leadership the main reason why the Bolsheviks kept power in Russia between 1917 and 1924?",
    points: [
      ["Lenin's decisions: the April Theses and the Decree on Land to win support, signing Brest-Litovsk against opposition in his own party, and the retreat to NEP in 1921", 3],
      ["Trotsky and the Red Army: conscription, former Tsarist officers under commissars, discipline and victory in the Civil War", 3],
      ["Dictatorship and terror: the Cheka and the Red Terror, the closing of the Constituent Assembly, the banning of rival parties and the ban on factions in 1921", 3],
      ["White weaknesses and geography: scattered armies, disunity, no land policy, limited foreign intervention, and the Reds' control of the centre and railways", 3],
      ["War Communism and its limits: it supplied the army, but caused famine and revolts such as Kronstadt that threatened the regime in 1921", 3],
      ["Peasant attitudes: the Decree on Land and the fear of landlords gave the Bolsheviks acquiescence, while requisitioning turned many against them", 3],
      ["Evaluation: weighing Lenin's leadership against the army, terror, White weakness and the peasants, with a supported judgement", 7],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Consider what Lenin personally decided, and what would have happened without the Red Army, the Cheka and the weaknesses of the Whites."],
    modelAnswer: `Lenin's leadership was an important reason why the Bolsheviks kept power between 1917 and 1924, but it was not the main one. The regime survived because Lenin's decisions were combined with the Red Army, the terror of the Cheka and the weakness of its enemies. A judgement must show how these causes fitted together.

Lenin's personal decisions were decisive at several moments. In April 1917 his theses gave the party a programme of peace, land and bread that matched what soldiers, peasants and workers wanted, and the Decree on Land of November 1917 confirmed the peasants' seizure of the estates. In early 1918 he insisted on signing the Treaty of Brest-Litovsk, against the opposition of many Bolsheviks who wanted a revolutionary war, because he judged that the army could not fight. The treaty cost Russia about a third of its population and much of its industry, but it ended the war and allowed the Bolsheviks to concentrate on their enemies at home; it was annulled when Germany was defeated in November 1918. In March 1921, after the Kronstadt Mutiny, he accepted the New Economic Policy, a retreat that restored the peasants' goodwill. These choices show a flexible leader who put survival first.

Yet Lenin could not have won the Civil War alone. The Red Army that defeated the Whites was built by Trotsky, as Commissar for War, through conscription, the use of former Tsarist officers under the watch of political commissars, and strict discipline. It was a larger and better-organised force than the Whites ever assembled. The Bolsheviks also held the centre of Russia, with Moscow and Petrograd, the railway network and most of the arms factories, so they could move troops between fronts. By contrast, the White armies of Kolchak, Denikin, Yudenich and Wrangel were scattered around the edges, had no common command and no clear policy on land, and the peasants feared that a White victory would bring back the landlords. Foreign intervention was limited, and helped Bolshevik propaganda, which presented the Whites as tools of foreign powers.

Terror and dictatorship also kept the Bolsheviks in power. The Cheka, founded in December 1917 under Dzerzhinsky, arrested and executed opponents, and after the attempt on Lenin's life in 1918 the Red Terror killed tens of thousands. The Constituent Assembly, in which the Social Revolutionaries had won more votes than the Bolsheviks, was closed after one day in January 1918, and other parties were gradually banned. In 1921 the Tenth Party Congress banned factions inside the party. These measures removed the political alternatives and made it hard for opponents to organise. Lenin approved of and encouraged the terror, so they can be counted as part of his leadership, but they depended on an apparatus of loyal officials and police.

War Communism supplied the army and the towns, but it also nearly destroyed the regime. Forced requisitioning led peasants to reduce planting, and the famine of 1921-22 killed millions. The strikes in Petrograd, the peasant risings in Tambov and the Kronstadt Mutiny of March 1921 showed that the Bolsheviks had lost the support even of those who had helped them to power. It was Lenin's recognition of the danger, and his readiness to change course with the NEP, that saved the regime from collapse in 1921. This is the strongest evidence for his personal importance.

Weighing these factors, I conclude that Lenin's leadership was necessary but not sufficient. It gave the party a clear programme, kept it united through the crisis of Brest-Litovsk, and rescued it in 1921. But without Trotsky's army, without the control of the railways and the centre, without the disunity of the Whites and the fear of the landlords among the peasants, and without the Cheka, no leadership could have won. The main reason was the combination of an organised party-state, a strong army and weak enemies, which Lenin directed rather than created. His leadership therefore explains how the opportunities were used, but the opportunities themselves came from the circumstances of the war.`,
    explanation: "A top answer weighs Lenin's decisions against the Red Army, the Cheka and terror, White weakness and peasant attitudes, uses dates and facts, and reaches a supported judgement on whether leadership or circumstances mattered more. Level descriptors are our own wording; a reviewer should compare them with ZIMSEC mark schemes.",
  });

  // 2. Paper 2: Mao's leadership and the rise of the CCP.
  b.essay({
    ...base, paper: "Paper 2",
    concepts: ["ahist.china.revolutions-1900-49"],
    stem: "Examine the part played by Mao Zedong's leadership in the rise of the Chinese Communist Party to power by 1949.",
    points: [
      ["The turn to the peasants: after 1927 Mao based the party on the countryside, with the Jiangxi Soviet (1931), land redistribution and guerrilla warfare", 3],
      ["Survival and leadership: the Long March (1934-35), Mao's emergence as leader at Zunyi, and the base at Yan'an with its training and discipline", 3],
      ["The war with Japan: bases behind enemy lines, rent reduction, a patriotic image and a growth of membership and army from tens of thousands to over a million", 3],
      ["Military leadership in the civil war: the PLA's discipline and the campaigns of 1948-49 in Manchuria, Huai-Hai and the north, directed by Mao and his commanders", 3],
      ["Guomindang weaknesses: corruption, inflation, the loss of its best armies in the war with Japan and the loss of urban support", 3],
      ["Other factors: the Japanese war, land reform in the civil war, Soviet help in Manchuria, the failure of American mediation and peasant nationalism", 3],
      ["Evaluation: weighing Mao's leadership against GMD weakness and the war, with a supported judgement", 7],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Separate what Mao decided from what happened to the Guomindang, and consider whether the party would have won under other leaders."],
    modelAnswer: `Mao Zedong's leadership played a large part in the rise of the Chinese Communist Party to power, but it was not the only cause. His strategic judgement gave the party a base and a method, while the weaknesses of the Guomindang and the war with Japan gave it an opportunity. I will argue that Mao's leadership was the most important single factor in turning that opportunity into victory, but that it cannot be separated from the conditions in which he worked.

Mao's first contribution was to place the revolution on the peasantry. The urban strategy of the early party was destroyed in 1927, when Chiang Kai-shek turned on the Communists in Shanghai and killed many thousands. Mao argued that in a country where the great majority were peasants, the party must build its strength in the countryside. In Jiangxi from 1931 the Communists set up a rural Soviet with land redistribution, a disciplined Red Army and guerrilla tactics. This was a significant change from the Russian model, which relied on urban workers. It created the network of villages from which the party later drew recruits and supplies.

Mao's second contribution was leadership in survival. After Chiang's fifth encirclement campaign, the Communists broke out in October 1934 on the Long March. They lost most of their strength: perhaps 80,000 to 100,000 set out, and under 10,000 reached the north-west. At the Zunyi Conference in January 1935 Mao emerged as the leading figure, and in Yan'an in Shaanxi he built a base, trained cadres and developed a body of ideas that later became known as Mao Zedong Thought. The party was small, but it was disciplined and united behind him. Without that leadership, it might have been destroyed or fallen into the faction fights that had weakened it earlier.

The war with Japan gave the Communists their opportunity, and Mao used it. After the Xi'an Incident of 1936 the Second United Front allowed the party to survive. When full war began in 1937 the Guomindang bore the main burden of the fighting and lost its best troops, while the Communists built bases behind Japanese lines, reduced rents, organised villagers and presented themselves as the leading patriotic force. Party membership grew from tens of thousands in 1937 to over a million by 1945, by estimates. Here Mao's political strategy mattered, since the same war that weakened the Guomindang strengthened his party only because he chose to expand its roots among the peasants rather than to fight set-piece battles.

In the civil war of 1946-49, the People's Liberation Army, disciplined and respected by villagers, won the campaigns in Manchuria, Huai-Hai and the north, and Beijing fell in January 1949. Mao set the broad strategy, although commanders such as Lin Biao and Liu Bocheng carried it out, and land reform in the areas that the party held secured the peasants' loyalty. The Proclamation of the People's Republic on 1 October 1949 followed.

These successes must be set against the Guomindang's failures. Its government was corrupt and depended on landlords and warlords; its armies were exhausted by the war with Japan; and after 1945 ruinous inflation and conscription lost it the support of townspeople as well as peasants. Soviet help in Manchuria, including captured Japanese weapons, and the failure of American mediation also helped the Communists. Many historians would argue that the Guomindang defeated itself as much as it was defeated.

In conclusion, Mao's leadership was central, because he provided the strategy of peasant revolution, kept the party alive and united through the Long March and built Yan'an, and turned the war with Japan to the party's advantage. Yet his leadership worked within conditions that he did not create: the collapse of the Guomindang and the Japanese invasion. I therefore judge that Mao's leadership was the most important single factor in the Communists' success, but that victory resulted from the interaction of his strategy with the weaknesses of his opponents.`,
    explanation: "A top answer examines Mao's strategic and organisational contribution with specific evidence, sets it against GMD weakness and the war with Japan, and reaches a supported judgement. Level descriptors are our own wording; a reviewer should compare them with ZIMSEC mark schemes.",
  });
});
