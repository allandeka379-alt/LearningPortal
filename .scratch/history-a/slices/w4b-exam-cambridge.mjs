// W4b exam-format items for Cambridge 9489: Paper 1 x2 (Russia: sources), Paper 2 x4 (one per Russia key question 3.1-3.4),
// Paper 4 x3 (Stalin's Russia). Part structure and levels are our convention (a reviewer must check against the syllabus
// and Cambridge mark schemes). All sources are invented and labelled.
import { concept, P, levels, EXAM, checkExam, source, paper1Sources } from "../lib.mjs";

const C1 = EXAM.CAM_P1;
const C2 = EXAM.CAM_P2;
const C4 = EXAM.CAM_P4;
const AS = "ahist.russia";

concept("ahist.russia.revolution-1905", { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge" }, (b) => {
  // ---------------------------------------------------------------- Paper 1 (Russia) x2
  // 1. Paper 1: the 1905 Revolution (key question 3.2).
  b.struct({
    d: 5, skill: C1.skill, applies: C1.applies, secs: C1.secs, examStyle: true, paper: "Paper 1",
    concepts: ["ahist.russia.revolution-1905"],
    stem: [
      "Study the sources and answer the questions on Russia, 1905.",
      "",
      paper1Sources([
        source("Source A", "a letter written by a fictional St Petersburg factory worker to his brother in the countryside, late January 1905",
          "We went on Sunday with our wives and children, carrying icons, to ask the Tsar for an eight-hour day and a hearing. Soldiers fired into the crowd and many fell near the bridge. Now no one in our workshop speaks of the Tsar except with hatred. The war has taken our best men and prices are rising, and on Monday the whole factory struck. Do not believe what the newspapers say of a few troublemakers. We were loyal until they shot us."),
        source("Source B", "a confidential report by a fictional official of the Ministry of the Interior to his minister, February 1905",
          "The strikes in the capital are the work of agitators who have taken advantage of the setbacks in the war and of the workers' ignorance. The priest who led the procession was a tool of these men. The workers themselves are, in the main, loyal and would return to work if the leaders were removed. Firm measures and a few concessions on hours would restore order. There is no reason to believe that the army will waver."),
        source("Source C", "a cartoon of the kind published in a liberal newspaper in western Europe in November 1905, described in words",
          "A crowned figure labelled \"Autocracy\" holds out a scroll marked \"Manifesto\" with one hand and keeps a whip behind his back with the other. In front of him a group of men in frock coats argue about who should take the scroll, while behind them workers with red flags look on in silence.", { described: true }),
        source("Source D", "a report by a fictional police officer in Moscow to his superior, January 1906",
          "The rising in December was crushed by the regiments brought from the capital and from the Far East; the barricades were cleared within ten days. In the countryside the troubles are over where troops have been sent. The Manifesto has satisfied the merchants and the landowners, and the liberals no longer join the workers. It is certain that the government would be in danger if the soldiers had joined the rebels, but they did not."),
      ]),
    ].join("\n"),
    parts: checkExam(C1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 200, max: 500 },
        stem: "Compare Sources A and B as evidence about the causes of the unrest in Russia in 1905.",
        levels: levels(15, "sources"),
        points: [
          ["Similarities: both refer to the war and the strikes in the capital after the procession, and both accept that the workers had grievances (hours, prices)", 3],
          ["Differences: A blames the shooting, hardship and the war and says that loyalty to the Tsar is gone; B blames agitators and ignorance and says that the workers are mainly loyal", 3],
          ["Provenance: A is a private letter by a worker (honest and angry but one-sided); B is a confidential report for a minister (well informed but defensive, and likely to reassure)", 3],
          ["Own knowledge: Bloody Sunday, Gapon's petition, the war with Japan and the spread of strikes fit A and challenge the picture of loyalty and agitators in B", 3],
          ["Evaluation: a supported judgement on which source is the better evidence of the causes of unrest, with a reason", 3],
        ],
        modelAnswer: "The sources agree on some features. Both refer to the war with Japan (A's war that has taken the best men and B's setbacks in the war) and to the strikes in the capital that followed the procession, and both accept that the workers had some grievance, such as hours and prices. They differ on the cause of the unrest. Source A blames the shooting of peaceful petitioners and hardship: the worker says that no one now speaks of the Tsar except with hatred and that the factory struck on Monday because of it. Source B blames agitators who exploited the war and the workers' ignorance, and says that the workers are loyal and would return if their leaders were removed.\n\nThe provenance explains the difference. Source A is a private letter by a worker to his brother, so it is likely to be frank, and it was written within days of the event. But it is angry and one-sided, and written by someone who was in the crowd. Source B is a confidential report for the minister, written by an official who has access to police information, but it has an interest in reassuring the minister and in blaming outsiders rather than the government, and it suggests that the army will not waver.\n\nMy own knowledge supports Source A more than B on the cause. On 22 January 1905 troops fired on Gapon's march, which carried a petition to the Tsar for reforms, and strikes spread across the empire. The war with Japan was going badly, with Port Arthur taken in January. Although Gapon's organisation had police approval and revolutionaries did exploit the unrest, the evidence suggests that the grievances were deep. Source B is correct to say that the army remained mostly loyal, but it is wrong to dismiss the causes as the work of agitators. Overall Source A is the better evidence of why the unrest broke out, because it reflects the workers' own experience, while B is more useful as evidence of how the government wished to see the crisis.",
        explanation: "A top answer compares on specific points (war, strikes, loyalty, cause), uses provenance for each source, tests them with knowledge of Bloody Sunday and the war, and gives a supported judgement. Level descriptors are our own wording.",
      }),
      P.manual({
        label: "(b)", marks: 25, type: "EXTENDED_RESPONSE", wordLimit: { min: 350, max: 900 },
        stem: "'The October Manifesto saved the Tsarist regime in 1905.' How far do Sources A to D support this view? Use all four sources and your own knowledge to explain your answer.",
        levels: levels(25, "sources"),
        points: [
          ["Support: B suggests that concessions would help to restore order; D says the Manifesto satisfied the merchants and landowners and that the liberals no longer join the workers; C shows the opposition arguing among themselves over the scroll", 6],
          ["Challenge: D says that the rising was crushed by regiments and that the regime would have been in danger if the soldiers had joined the rebels; B expects the army to hold; A shows a hatred of the Tsar that a promise would not remove", 6],
          ["Provenance and weighing: A private and early, before the Manifesto; B confidential and defensive; C a foreign liberal's comment on the autocracy's intentions; D a police officer with an interest in reporting success", 4],
          ["Own knowledge: October strike, Witte, the Manifesto of 30 October, Octobrists and Kadets, the Moscow rising, loyal troops from Manchuria, the French loan, the Fundamental Laws and the Duma", 5],
          ["Judgement: a supported conclusion on how far the Manifesto, rather than force and army loyalty, saved the regime", 4],
        ],
        modelAnswer: "The sources give some support to the view that the October Manifesto saved the Tsarist regime, but they suggest more strongly that the regime survived because of the loyalty of the army, and that the Manifesto worked by dividing the opposition rather than by satisfying it.\n\nSome sources support the view. Source D, written by a police officer, says that the Manifesto has satisfied the merchants and the landowners and that the liberals no longer join the workers. This agrees with what I know: after the Tsar issued the Manifesto on 30 October 1905, with its promises of civil liberties and a Duma, moderate liberals formed the Octobrist party and accepted it, while the Kadets wanted more and the socialists rejected it. Source C also supports the view. The cartoon shows men in frock coats arguing about who should take the scroll, while the workers look on in silence, suggesting that the Manifesto divided the opposition, although the whip behind the back warns that the concession may be insincere. Source B, written before the Manifesto, supports the idea that a few concessions would help to restore order, and Witte did advise the Tsar to grant it in order to split the opposition.\n\nHowever, the sources also challenge the view. Source D says that the December rising was crushed by regiments, and that the government 'would be in danger if the soldiers had joined the rebels, but they did not'. This points to force and army loyalty as the real safeguard. My knowledge confirms this: the army, with troops returning from the Far East after the Treaty of Portsmouth, put down the Moscow rising and the peasant disturbances, and the St Petersburg Soviet was arrested. Source B also assumes that the army will not waver. Source A shows a deeper difficulty: the worker says that the Tsar is now hated, which a promise issued nine months later could not remove, and the strikes of October were not satisfied by a Manifesto that left the Tsar's powers largely intact in the Fundamental Laws of 1906.\n\nThe provenance of the sources affects their value. Source A is a private letter, written early, which shows the loss of trust but not what happened after the Manifesto. Source B is a confidential report, written before the Manifesto, by an official with an interest in reassurance. Source C is a cartoon by a western European liberal, who may emphasise the autocracy's insincerity. Source D is by a police officer who has a motive to report success, so its claim that the troubles are over may be too optimistic. Even so, its account of the army matches independent evidence.\n\nWeighing the evidence, I conclude that the Manifesto played a significant but secondary role. It split the opposition and gave the regime breathing space, but without the loyalty of the army, which crushed the Moscow rising, and without the loan from France in 1906 that financed the repression, the concessions might not have been enough. The sources therefore support the view only in part: the Manifesto helped to save the regime by dividing its enemies, but the army saved it by defeating the rebels.",
        explanation: "A top answer uses all four sources for both support and challenge, weighs provenance, tests the sources with own knowledge (the Manifesto, Octobrists and Kadets, the army and the Moscow rising) and reaches a supported judgement. Level descriptors are our own wording.",
      }),
    ]),
    hints: ["For (b), group the sources into those that suggest the Manifesto worked by dividing the opposition and those that point to force and the army, then weigh them."],
    explanation: "Exam-format item for Cambridge Paper 1 (40 marks). All four sources are invented and labelled; the part structure and levels are our convention.",
  });

  // 2. Paper 1: 1917 (key question 3.3).
  b.struct({
    d: 5, skill: C1.skill, applies: C1.applies, secs: C1.secs, examStyle: true, paper: "Paper 1",
    concepts: ["ahist.russia.revolutions-1917"],
    stem: [
      "Study the sources and answer the questions on Russia, 1917.",
      "",
      paper1Sources([
        source("Source A", "a diary entry by a fictional Petrograd housewife, March 1917",
          "The queue for bread began at four this morning, and by noon the shop had nothing. Women from the textile mills marched down the avenue calling for bread, and no one stopped them. The Cossacks sat on their horses and looked at the ground. Tonight my neighbour says that the soldiers will not fire. I do not know what will happen, but I know that we cannot go on like this."),
        source("Source B", "a statement by a fictional minister of the Provisional Government to a gathering of delegates, July 1917",
          "The Government understands the hunger of the peasants for land, but the land must be divided justly, and this can only be decided by the Constituent Assembly. Until then, order must be kept and the war must be carried on to honour our alliances. Those who tell the people that they can take what they want are leading them to ruin."),
        source("Source C", "a poster of the kind issued by the Bolsheviks in the autumn of 1917, described in words",
          "A soldier, a peasant and a worker stand side by side, with a red banner behind them. Above them runs a slogan in large letters: \"Peace, Land and Bread. All power to the Soviets.\" At their feet lies a broken crown and a torn flag.", { described: true }),
        source("Source D", "a report by a fictional Bolshevik district organiser to his party committee, October 1917",
          "In the regiments the men say that they will not fight again, and many will not obey officers who support the Government. The Red Guards in our district have rifles and are ready. The Soviet is with us, but the peasants in the country still follow the Social Revolutionaries, and some workers say that we should wait for the Congress of Soviets. We must act before the Government brings loyal troops to the capital."),
      ]),
    ].join("\n"),
    parts: checkExam(C1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 200, max: 500 },
        stem: "Compare Sources B and C as evidence about the attitudes of the Provisional Government and the Bolsheviks to the demands of the Russian people in 1917.",
        levels: levels(15, "sources"),
        points: [
          ["Similarities: both refer to land and to the war, and both claim to speak for the people's interests", 3],
          ["Differences: B asks the people to wait for the Constituent Assembly and to continue the war; C promises peace, land and bread at once and the end of the old order", 3],
          ["Provenance: B is a ministerial statement to an audience of delegates that justifies government policy; C is a Bolshevik propaganda poster, designed to attract mass support and not to explain details", 3],
          ["Own knowledge: the Government's delay over land and its summer offensive, the April Theses and the slogan 'Peace, Land and Bread', the soviets and the Bolsheviks' rising support", 3],
          ["Evaluation: a supported judgement on which source better shows the real attitudes, noting that both are persuasive", 3],
        ],
        modelAnswer: "The sources have some points in common. Both refer to the two great demands of the Russian people, land and the war, and both claim to act for the interest of the people. They differ sharply on what should be done. Source B, from a minister of the Provisional Government, says that land reform must wait for the Constituent Assembly and that the war must continue to honour the alliances, and it warns that those who tell people to take what they want lead them to ruin. Source C, a Bolshevik poster, promises peace, land and bread at once, and 'all power to the Soviets', with a broken crown to show that the old order has gone.\n\nThe provenance explains the difference. Source B is an official statement to delegates, in July 1917, intended to justify a cautious policy and to keep order while the Government's authority was weak, so it presents delay as justice. Source C is a poster designed for mass appeal, with simple images and slogans, which gives promises without explaining how they will be achieved. Neither is neutral.\n\nMy own knowledge fits both. The Provisional Government did delay land reform until the Constituent Assembly, kept Russia in the war, and launched a failed offensive in the summer, which cost it the army's support. Meanwhile Lenin's April Theses had made 'Peace, Land and Bread' the Bolsheviks' slogan, and peasants were already seizing land. Source B is therefore a fair statement of the Government's attitude, and Source C of the Bolsheviks'. As evidence of what the people actually wanted, C is perhaps more revealing, because it reflects demands that the Bolsheviks had learned from soldiers and peasants, while B shows the reasons for the Government's caution. Both are useful but each must be treated as a persuasive statement from one side.",
        explanation: "A top answer compares on land, the war and the claims made, evaluates the provenance of a ministerial statement and a propaganda poster, and uses knowledge of the Provisional Government and the April Theses. Level descriptors are our own wording.",
      }),
      P.manual({
        label: "(b)", marks: 25, type: "EXTENDED_RESPONSE", wordLimit: { min: 350, max: 900 },
        stem: "'The Provisional Government fell in October 1917 because it failed to give the Russian people what they wanted.' How far do Sources A to D support this view? Use all four sources and your own knowledge to explain your answer.",
        levels: levels(25, "sources"),
        points: [
          ["Support: A shows hunger and the collapse of the old order before the Government existed; B shows delay over land and the war; D shows soldiers who will not fight and Red Guards prepared to act", 6],
          ["Challenge: C is a promise and not a record of performance; D shows that the peasants still followed the Social Revolutionaries, some workers wished to wait, and the Bolsheviks needed to act quickly, so organisation and timing mattered; B shows reasons for caution", 6],
          ["Provenance and weighing: A private and from before the Government; B a minister's justification; C propaganda; D an internal party report that is frank about difficulties", 4],
          ["Own knowledge: dual power, the failed offensive, land seizures, the July Days, the Kornilov affair, Lenin and Trotsky, the MRC and the Congress of Soviets", 5],
          ["Judgement: a supported conclusion on how far failure to meet demands, rather than Bolshevik action, explains October", 4],
        ],
        modelAnswer: "The sources provide considerable support for the view that the Provisional Government fell because it failed to give the people what they wanted, but they also show that the Bolsheviks' own actions were needed to turn that failure into the seizure of power.\n\nSource A supports the view in a way that predates the Provisional Government: it shows hunger and the collapse of loyalty in March 1917, with women demanding bread and soldiers who will not fire. The Provisional Government inherited this problem, and food shortages continued. Source B shows two of its most damaging choices. The minister says that land must wait for the Constituent Assembly and the war must continue, which is the reverse of what the peasants and soldiers wanted. I know that the peasants began to seize land in the summer, and that the failed offensive of July destroyed the army's will to fight. Source D confirms the result: the soldiers say they will not fight again and will not obey officers who support the Government, and the Red Guards are armed and ready.\n\nHowever, the sources also qualify the view. Source C is a Bolshevik poster, which promises peace, land and bread but shows nothing about what the Bolsheviks could deliver; it shows that the party understood the demands and exploited them, which supports the idea that the Government's failure created an opportunity but not that it caused the fall by itself. Source D is the most revealing, because it is frank: the peasants still follow the Social Revolutionaries, some workers want to wait for the Congress of Soviets, and the party must act before the Government brings loyal troops. This suggests that the result depended on organisation, timing and leadership as well as popular discontent. Source B also gives reasons for the Government's caution, as it could argue that a Constituent Assembly was the only legitimate way to settle the land.\n\nThe provenance affects the weight of the evidence. Source A is a private diary, vivid but dated before the Government. Source B is an official statement that tries to justify policy. Source C is propaganda. Source D, an internal report meant for the party committee and not for publication, is the most reliable on the state of the regiments and Red Guards, although the writer may be anxious to push the party to act.\n\nMy knowledge adds that the Government was also weakened by dual power with the Petrograd Soviet, by the Kornilov affair in September, which discredited Kerensky and armed the Bolsheviks, and by the Bolsheviks' majorities in the soviets. Trotsky's Military Revolutionary Committee then organised the rising on 7-8 November. In conclusion, the sources support the view to a large extent: the Government failed on bread, land and the war, and that failure drove soldiers and workers to the Bolsheviks. But the sources suggest that the failure alone did not cause the fall. The Bolsheviks needed to be organised and decisive, and Source D shows them acting for that reason. I therefore agree with the view to a large extent but argue that the Bolshevik action was the necessary second cause.",
        explanation: "A top answer uses all four sources to support and to qualify the view, weighs their provenance and tests them with own knowledge of the Provisional Government's failures and of Bolshevik organisation. Level descriptors are our own wording.",
      }),
    ]),
    hints: ["For (b), consider which sources show the Government's failures, and which show the Bolsheviks' need to act."],
    explanation: "Exam-format item for Cambridge Paper 1 (40 marks). All four sources are invented and labelled; the part structure and levels are our convention.",
  });

  // ---------------------------------------------------------------- Paper 2 (Russia key questions 3.1-3.4) x4
  // 3.1 challenges of 1881-94.
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.russia.tsarist-challenges"],
    stem: "Answer both parts on Russia, 1881-94.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain why Alexander III followed a policy of repression after 1881.",
        levels: levels(10),
        points: [
          ["The murder of Alexander II in March 1881 convinced his son that reform had encouraged revolution, so he reversed it (police powers of 1881, censorship, university control)", 3],
          ["The ideas of advisers such as Pobedonostsev, who believed in autocracy and Orthodoxy and distrusted parliaments and a free press", 3],
          ["Fear of opposition and of national minorities, leading to Russification, the May Laws, land captains and the zemstvo reform", 2],
          ["A supported link or judgement on which reason mattered most", 2],
        ],
        modelAnswer: "The most immediate reason was the murder of Alexander II by the People's Will in March 1881. The new Tsar believed that his father's reforms had encouraged the revolutionaries, not satisfied them, so he abandoned plans for more reform and turned to repression. The Statute on Measures to Preserve State Order of August 1881 allowed states of emergency, exile without trial and the closing of newspapers.\n\nA second reason was the influence of his advisers, especially Konstantin Pobedonostsev, the Procurator of the Holy Synod, who believed that the autocracy and the Orthodox Church were the foundations of Russia and that parliaments and a free press were dangerous. His ideas shaped the censorship of 1882, the University Statute of 1884 and the restrictions on the education of the lower classes.\n\nA third reason was the fear of opposition, including the national minorities. Alexander III believed that a united empire needed one language, one Church and one ruler, so Russification was pursued in Poland, the Baltic provinces and elsewhere, and the May Laws of 1882 restricted the Jews. Land captains (1889) and the zemstvo law (1890) were meant to place the countryside under the control of the nobility.\n\nThe murder of his father was the decisive trigger, because it removed any chance of reform, but the other reasons explain why the repression continued for his whole reign.",
        explanation: "A top answer gives three or more developed reasons with specific policies and links them. Level descriptors are our own wording.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 800 },
        stem: "'Economic development strengthened the Tsarist regime in the years 1881-94.' How far do you agree?",
        levels: levels(20),
        points: [
          ["Given perspective: finance ministers Bunge, Vyshnegradsky and Witte promoted railways, tariffs, foreign loans and industry, which increased state revenue and military strength", 5],
          ["Alternative perspective: heavy taxation of the peasants, the famine of 1891-92, and the growth of a working class without rights created discontent and an audience for Marxism", 5],
          ["Other factors: repression, the army, the police and the Church kept the regime in power regardless of the economy", 4],
          ["Judgement: a comparative, supported conclusion on how far economic development strengthened the regime", 6],
        ],
        modelAnswer: "Economic development strengthened the Tsarist regime in some ways, but it also created problems, and the regime's survival in these years depended more on repression than on economic growth.\n\nThere is a strong case that development strengthened the state. Bunge cut the peasants' redemption payments and founded the Peasants' Land Bank, Vyshnegradsky raised revenue through taxes and tariffs, and Witte from 1892 promoted railways, foreign loans and industry, including the Trans-Siberian Railway begun in 1891. Coal, iron and steel, oil at Baku and textiles grew. A stronger economy gave the state revenue and the means to equip an army and to remain a great power, and the alliance with France in 1894 brought loans. The state, not private business, led the process, which kept control in the hands of the government.\n\nHowever, the economic changes also weakened the regime in important ways. The tax burden and the policy of exporting grain fell on the peasants, who were poor, and the famine of 1891-92 exposed the weakness of the administration and led educated Russians to organise relief themselves. Industrial growth created a working class in crowded towns, without unions or political rights, and Marxist ideas spread: Plekhanov founded his group in 1883, and study circles formed. In the long term these were sources of opposition, though in 1881-94 they were still small.\n\nThe regime's strength in these years rested more on other factors. The army and police were loyal, the Church taught obedience, and the emergency powers of 1881, censorship, land captains and Russification kept order. The People's Will was destroyed and no serious opposition could organise. Alexander III's character and the lack of any national political institutions also helped.\n\nOn balance, I agree only in part. Economic development strengthened the state's resources, but it did so at a cost to the peasants and by creating a working class that would later threaten the regime. During 1881-94 itself, repression and the loyalty of the armed forces were more important in keeping the Tsar secure. Economic development was therefore a secondary source of strength and a long-term source of weakness.",
        explanation: "A top answer weighs the given view (development as strength) against the alternative (costs and new opposition) and other factors (repression), with specific evidence and a comparative judgement. Level descriptors are our own wording.",
      }),
    ]),
    hints: ["For (b), consider both the immediate and the long-term effects of economic development."],
    explanation: "Exam-format item for Cambridge Paper 2 (30 marks) on key question 3.1. Part structure and levels are our convention.",
  });

  // 3.2 the 1905 Revolution.
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.russia.revolution-1905"],
    stem: "Answer both parts on Russia, 1905-14.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain why the 1905 Revolution broke out.",
        levels: levels(10),
        points: [
          ["Long-term discontent: land hunger, poor conditions and no political rights for workers, and the Tsar's refusal to reform", 3],
          ["The Russo-Japanese War: defeats at Port Arthur, Mukden and Tsushima discredited the regime and added hardship", 3],
          ["Opposition and the trigger: organised parties (Liberals, Social Revolutionaries, Social Democrats), the Putilov strike and Bloody Sunday", 2],
          ["A supported link or judgement on which reason mattered most", 2],
        ],
        modelAnswer: "The 1905 Revolution had long-term and short-term causes. The deep cause was discontent. Peasants were short of land and heavily burdened, workers had long hours and no right to form unions, educated Russians wanted a constitution, and minorities resented Russification. Nicholas II had rejected calls for reform, so there was no legal way to express these grievances, and opposition parties such as the Liberals, the Social Revolutionaries and the Social Democrats grew in the early 1900s.\n\nThe Russo-Japanese War, which began in February 1904, made the situation worse. Russia expected an easy victory but lost Port Arthur in January 1905, was defeated at Mukden and had its fleet destroyed at Tsushima in May. The defeats discredited the Tsar and his officials and added to economic hardship at home.\n\nThe trigger was Bloody Sunday, 22 January 1905. After the dismissal of workers at the Putilov works, Father Gapon led a peaceful procession to the Winter Palace with a petition for reforms, and troops fired on it. The shooting destroyed the people's faith in the Tsar and set off strikes and unrest across the empire.\n\nThe deep discontent made a crisis possible, but the war and Bloody Sunday explain why it happened in 1905.",
        explanation: "A top answer separates long-term causes, the war and the trigger, with accurate detail and a link. Level descriptors are our own wording.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 800 },
        stem: "'The loyalty of the army was the main reason why the Tsarist regime survived the 1905 Revolution.' How far do you agree?",
        levels: levels(20),
        points: [
          ["Given perspective: most of the army stayed loyal, troops returned from the Far East after Portsmouth and crushed the Moscow rising and peasant risings; Potemkin was an exception", 5],
          ["Alternative perspectives: the October Manifesto divided the opposition (Octobrists and Kadets); the opposition was disunited and uncoordinated", 5],
          ["Other factors: foreign loans (France 1906), Stolypin's repression and reforms, and the Tsar's refusal to give up basic power in the Fundamental Laws", 4],
          ["Judgement: a comparative, supported conclusion on the army's weight compared with the other reasons", 6],
        ],
        modelAnswer: "The loyalty of the army was the most important reason why the regime survived, but it was supported by other factors, especially the divisions of the opposition and the concessions that caused them.\n\nThe army was the regime's last defence. Despite mutinies, such as the battleship Potemkin in June 1905, most units obeyed. After the Treaty of Portsmouth in September, troops were brought back from the Far East and used against the rebels. The Moscow rising of December 1905 was crushed by regiments sent from St Petersburg, and peasant disturbances and risings in the non-Russian regions were put down by soldiers, backed by courts-martial under Stolypin. If the soldiers had joined the strikers, as they did in 1917, the regime would have fallen. This is the strongest argument for the view.\n\nYet the opposition was also weak and divided, and the October Manifesto widened its divisions. The strikes, peasant risings and mutinies were not co-ordinated; the leaders of the socialist parties were arrested or in exile. When the Tsar issued the Manifesto on 30 October, moderate liberals accepted and formed the Octobrist party, while the Kadets and the socialists wanted more. This division prevented a united front and gave the government time to arrest the St Petersburg Soviet and regain the initiative.\n\nOther factors helped. A large loan from France in 1906 enabled the government to pay for the repression, and the Fundamental Laws of 1906 kept the Tsar's control of ministers, the army and foreign affairs while the Duma had limited power. Stolypin's mixture of harsh punishment and land reform reduced rural unrest.\n\nOverall, the army was the deciding factor: without it the other factors could not have worked, since a government cannot negotiate from weakness if its soldiers will not obey. But it is not the whole explanation, because the opposition's division allowed the army to deal with each part of it in turn, and the concession of October made that division wider. I therefore agree to a large extent, while recognising that the army's loyalty was made effective by the weakness of the opposition.",
        explanation: "A top answer weighs the army against the divisions of the opposition and other factors, using dated evidence, and reaches a supported comparative judgement. Level descriptors are our own wording.",
      }),
    ]),
    hints: ["For (b), ask what the army could have done if the opposition had been united, and what the opposition could have done if the army had joined it."],
    explanation: "Exam-format item for Cambridge Paper 2 (30 marks) on key question 3.2. Part structure and levels are our convention.",
  });

  // 3.3 the Bolshevik seizure of power.
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.russia.revolutions-1917"],
    stem: "Answer both parts on Russia, 1917.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain why Nicholas II abdicated in March 1917.",
        levels: levels(10),
        points: [
          ["Defeats and heavy casualties in the First World War, and the Tsar's decision to take personal command in 1915, tied his name to the failures", 3],
          ["Economic collapse: shortages of bread and fuel, inflation and the breakdown of transport, leading to strikes and bread riots in Petrograd", 3],
          ["Loss of support: the soldiers refused to fire, the Duma formed a committee and the generals advised abdication; Rasputin and the Empress had damaged the court", 2],
          ["A supported link or judgement on the most important reason", 2],
        ],
        modelAnswer: "Nicholas II abdicated because the war destroyed the support on which his rule depended. The army suffered heavy defeats and shortages of equipment, and from September 1915 the Tsar commanded it himself, so every failure was blamed on him. He left the government in the hands of the Empress, whose reliance on Rasputin made the court unpopular.\n\nThe war also broke the economy. Millions of peasants had been called up, the railways were overloaded and prices rose faster than wages, so that by the winter of 1916-17 there were long bread queues in Petrograd. On 8 March, International Women's Day, women textile workers marched for bread and were joined by men from the factories, and within days the strike became general.\n\nWhat made the difference was that the army would not suppress it. After soldiers had fired on the crowds on 11 March, the Volynsky regiment and others refused to fire on 12 March and joined the people. The Duma formed a committee, the Petrograd Soviet was created, and the generals advised the Tsar that he had lost control. He abdicated on 15 March.\n\nThe war was the root of everything, but the immediate reason was the army's refusal to obey.",
        explanation: "A top answer explains war, economic collapse and loss of the army's loyalty, with dates, and links them. Level descriptors are our own wording.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 800 },
        stem: "'Lenin's leadership was the main reason why the Bolsheviks seized power in October 1917.' How far do you agree?",
        levels: levels(20),
        points: [
          ["Given perspective: Lenin's April Theses and slogans, his insistence on acting before the Constituent Assembly, and his pressure on a hesitant Central Committee in October", 5],
          ["Alternative perspectives: the Provisional Government's weakness (the war, land, the July Days and the Kornilov affair) and dual power", 5],
          ["Other factors: Trotsky and the Military Revolutionary Committee, Red Guards, Bolshevik majorities in the soviets, and the divisions of other socialists", 4],
          ["Judgement: a comparative, supported conclusion on the weight of Lenin's leadership", 6],
        ],
        modelAnswer: "Lenin's leadership was an important reason why the Bolsheviks seized power, but it was not the main one. The Provisional Government's weakness created the opportunity, and Trotsky's organisation and the party's support in the soviets turned it into a seizure of power. I will argue that Lenin was necessary but not sufficient.\n\nThe case for Lenin is strong. On his return in April 1917 he rejected cooperation with the Provisional Government and gave the party a programme: no support for the Government, 'all power to the Soviets' and the slogan 'Peace, Land and Bread', which matched the demands of soldiers, peasants and workers. In September and October, writing from Finland, he pressed his party to act before the Constituent Assembly could meet, and when the Central Committee voted for an armed rising on 23 October (10 October old style) it was against the opposition of Zinoviev and Kamenev. Without his determination the party might have waited, and the opportunity could have passed.\n\nHowever, the Provisional Government's failures were at least as important. It continued the war, and the summer offensive failed; it delayed land reform when the peasants were seizing land; and shortages continued. Dual power meant that it could not command the soldiers without the Petrograd Soviet. The July Days showed its weakness, and the Kornilov affair in September discredited Kerensky, armed the Red Guards and made the Bolsheviks defenders of the revolution. Without these failures Lenin's slogans would not have attracted support.\n\nOther factors also mattered. Trotsky, chairman of the Petrograd Soviet from early October, and the Military Revolutionary Committee organised the Red Guards and the soldiers who took the bridges, stations and the Winter Palace on 7-8 November (25-26 October) while appearing to defend the Soviet. By then the Bolsheviks had majorities in the Petrograd and Moscow Soviets. The Mensheviks and Social Revolutionaries, who had supported the war or the Government, lost credit.\n\nIn conclusion, Lenin was the driving force behind the decision to act, but he depended on the Government's collapse and on Trotsky's organisation. If Lenin had been absent, the Bolsheviks might still have gained power given the situation, possibly in a different form or at a different time. If the Government had been strong, no leader could have succeeded. I therefore agree only in part: Lenin's leadership was a major cause, but the weakness of the Provisional Government was the main one.",
        explanation: "A top answer weighs Lenin against the Provisional Government's weakness and the contribution of Trotsky and the soviets, with dated evidence, and reaches a comparative judgement. Level descriptors are our own wording.",
      }),
    ]),
    hints: ["For (b), ask whether the Bolsheviks would have won without Lenin, and whether Lenin could have won without the Government's failures."],
    explanation: "Exam-format item for Cambridge Paper 2 (30 marks) on key question 3.3. Part structure and levels are our convention.",
  });

  // 3.4 consolidation: NEP and the economy.
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.russia.bolshevik-consolidation"],
    stem: "Answer both parts on Russia, 1917-24.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain why the Bolsheviks introduced the New Economic Policy in 1921.",
        levels: levels(10),
        points: [
          ["War Communism had failed: requisitioning led peasants to cut sowing, industrial output collapsed and famine followed in 1921-22", 3],
          ["Opposition and revolt: the Kronstadt Mutiny, peasant risings such as Tambov and strikes in Petrograd showed that the regime was losing support", 3],
          ["Lenin's judgement that a tactical retreat to a tax in kind and private trade would restore the economy and the peasants' goodwill while the party kept power", 2],
          ["A supported link or judgement on the most important reason", 2],
        ],
        modelAnswer: "The Bolsheviks introduced the New Economic Policy in March 1921 because War Communism had brought the country to the edge of collapse. Under War Communism the state took grain from the peasants by force, banned private trade and nationalised industry. The peasants responded by planting less and hiding grain, industrial output fell far below its pre-war level, the towns lost population, and a severe famine followed in 1921-22.\n\nThe second reason was open revolt. By early 1921 there were peasant risings in Tambov and elsewhere and strikes in Petrograd, and in March the sailors of Kronstadt, once strong supporters of the Bolsheviks, rose against the regime demanding free elections to the soviets and an end to requisitioning. Although the Red Army crushed the revolt, it showed that the party had lost the support even of its allies.\n\nLenin concluded that a retreat was necessary. The Tenth Party Congress replaced requisitioning with a fixed tax in kind, allowed peasants to sell their surplus, and permitted small traders and businesses, while the state kept control of heavy industry, banks and foreign trade. He described this as a temporary retreat which would restore the economy and the goodwill of the peasants, while the party kept political power.\n\nThe immediate cause was the political threat shown by Kronstadt, but it arose from the failure of War Communism.",
        explanation: "A top answer explains the failure of War Communism, the revolts and Lenin's judgement, with accurate detail and a link. Level descriptors are our own wording.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 800 },
        stem: "How successful were the Bolsheviks in dealing with the economic problems they faced in the years 1917-24?",
        levels: levels(20),
        points: [
          ["Successes: War Communism supplied the army and the towns and helped to win the Civil War; NEP restored farm output, trade and industry by the mid-1920s", 5],
          ["Failures: War Communism caused a collapse of production and famine; the Decree on Land and workers' control failed to solve problems; NEP had the scissors crisis and criticism within the party", 5],
          ["Context and alternatives: the economic damage of war and civil war, the absence of expertise, and the dilemma between ideology and pragmatism", 4],
          ["Judgement: a comparative, supported conclusion on the degree of success, distinguishing phases", 6],
        ],
        modelAnswer: "The Bolsheviks were only partly successful in dealing with the economic problems of 1917-24. War Communism succeeded in supplying the army but failed as an economic policy, while the New Economic Policy was a notable success in restoring the economy, although it left problems.\n\nThe economic problems were huge. Russia was devastated by the First World War and then by the Civil War, with industry in decline and the transport system broken. In the first months the Bolsheviks tried to meet popular demands: the Decree on Land confirmed the peasants' seizure of the estates, workers' control was introduced in factories, and banks were nationalised. These measures won support but did not solve the problems of production and supply.\n\nWar Communism, from mid-1918, was designed to supply the Red Army and the towns. The state nationalised industry, banned private trade, rationed goods and requisitioned grain. In that limited sense it was successful, since it allowed the Reds to win the Civil War. But the economic results were disastrous: peasants planted less, industrial output fell to a fraction of its pre-war level, and there was a famine in 1921-22 in which millions died, along with revolts such as Kronstadt. As economic policy, it failed.\n\nThe NEP, introduced in March 1921, was more successful. Replacing requisitioning with a tax in kind and allowing private trade led to a rapid recovery. By the middle of the 1920s farm and industrial output had come close to the pre-war level, a stable currency was introduced, and the peasants were conciliated. Yet NEP had weaknesses: the scissors crisis of 1923, in which industrial prices were high and grain prices low, showed its strains; the Nepmen and richer peasants prospered, which many communists disliked; and the party was divided about whether it was a retreat from socialism. It also did not solve the long-term problem of how to industrialise.\n\nOverall, the Bolsheviks were successful in the sense that they kept the economy going long enough to win the war and then recovered it through a pragmatic change of course. They were unsuccessful in that War Communism caused unnecessary suffering and the longer-term questions remained unsettled. I judge that the record was mixed, with the NEP the main success, but it was a success reached through the failure of an earlier policy and under the threat of collapse.",
        explanation: "A top answer judges success by phase (early measures, War Communism, NEP), uses specific evidence and reaches a comparative conclusion. Level descriptors are our own wording.",
      }),
    ]),
    hints: ["For (b), judge each phase of policy separately before giving an overall view."],
    explanation: "Exam-format item for Cambridge Paper 2 (30 marks) on key question 3.4. Part structure and levels are our convention.",
  });

  // ---------------------------------------------------------------- Paper 4 (Stalin's Russia) x3
  b.essay({
    d: 5, skill: C4.skill, applies: C4.applies, secs: C4.secs, examStyle: true, marks: 30, paper: "Paper 4",
    concepts: ["ahist.stalin.power-struggle"],
    stem: "Evaluate the view that Stalin won the struggle for power after Lenin's death mainly because of his control of the party machine.",
    points: [
      ["Control of the party machine: General Secretary since 1922, control of appointments, the Lenin Enrolment, and delegates at congresses (1925, 1927)", 5],
      ["Tactics and alliances: the triumvirate against Trotsky, the alliance with Bukharin against Zinoviev and Kamenev, and the turn to the Left's policy against the Right", 4],
      ["Rivals' weaknesses and mistakes: Trotsky's arrogance, absence from the funeral and lack of a base; Zinoviev and Kamenev's shifts; Bukharin's tie to NEP", 4],
      ["Ideas and appeal: Socialism in One Country, the arguments over NEP and industrialisation, and Stalin as Lenin's pupil in the cult of Lenin", 4],
      ["Structure inherited from Lenin: the ban on factions (1921), one-party rule, the suppression of the Testament and the OGPU", 3],
      ["Evaluation: a sustained judgement weighing the party machine against the other factors, with the relationships between them", 10],
    ],
    levels: levels(30),
    wordLimit: { min: 600, max: 1300 },
    hints: ["Ask whether the party machine would have been enough without the rivals' errors, the ban on factions and Stalin's tactics."],
    modelAnswer: `Stalin's control of the party machine was the most important single reason why he won the struggle for power between 1924 and 1929, but it worked only in combination with his tactics, the mistakes of his rivals and the structure that Lenin had created. I will argue that the machine was the foundation of his victory, while the other factors explain how he used it.

The party machine gave Stalin a decisive advantage. He became General Secretary in April 1922, a post that controlled the Secretariat and the Orgburo, which appointed party secretaries and delegates. Through these appointments he built a network of men who owed their careers to him. The Lenin Enrolment of 1924 brought in more than 200,000 new members whose loyalty was to the leadership. At the party congresses of 1925 and 1927 the delegations were filled with his supporters, so that the Fourteenth Congress defeated Zinoviev and Kamenev, and the Fifteenth expelled Trotsky and his allies. Trotsky, who relied on persuasion and his reputation, had no such organisation. Without the machine, Stalin's tactics would have had no force.

Stalin's tactics also mattered. He never fought alone: he allied with Zinoviev and Kamenev in the triumvirate to keep Trotsky from power (1923-25), then with Bukharin and the Right to defeat Zinoviev and Kamenev when they broke away (1925-26), and then he adopted the Left's policy of rapid industrialisation to destroy Bukharin, Rykov and Tomsky (1928-29). Each of his opponents was defeated one at a time, and he presented himself as a moderate defender of the party's unity. The machine gave him the power to carry out these moves, but the timing and skill were his.

The rivals' errors helped him. Trotsky was a brilliant figure but arrogant, a former Menshevik, and he was ill and absent from Lenin's funeral. His attack on Zinoviev and Kamenev in 1924 isolated him. Zinoviev and Kamenev underestimated Stalin and helped him to defeat Trotsky before finding themselves isolated. Bukharin supported Stalin against the Left and then had no allies against him. They also failed to publish or to use Lenin's Testament, which criticised Stalin and which the Central Committee decided not to publish in May 1924, partly because Zinoviev and Kamenev defended him.

Ideas gave him an appeal beyond the machine. Socialism in One Country offered party members a patriotic, practical goal, in contrast to Trotsky's Permanent Revolution, which depended on revolutions abroad. His lectures on Leninism presented him as the faithful heir to Lenin. The arguments about NEP, which the Right defended and the Left attacked, were real, and the grain crisis of 1927-28 gave Stalin a reason to shift to rapid industrialisation.

Finally, the system that Lenin had left was important. The ban on factions of 1921 allowed Stalin to treat criticism as disloyalty, so that any opposition could be condemned as a split; the OGPU watched the opponents; and the one-party state had no other institutions to which they could appeal.

Weighing these factors, I conclude that the party machine was the decisive reason, because the other factors worked through it: the tactics needed delegates to vote, the ban on factions needed officials to enforce it, and the rivals' errors would not have mattered if one of them had controlled the Secretariat. But the machine alone was not enough. Stalin's ability to use it, the quarrels of his enemies and the political structure all contributed. The view is therefore largely valid, though it should be qualified: control of the machine made Stalin's victory possible, while his tactics and his rivals' mistakes made it certain.`,
    explanation: "A top answer judges the party machine against tactics, rivals' errors, ideas and the inherited structure, with accurate dated evidence, and reaches a sustained, supported conclusion. Level descriptors are our own wording; a reviewer should compare them with Cambridge's published grids.",
  });

  b.essay({
    d: 5, skill: C4.skill, applies: C4.applies, secs: C4.secs, examStyle: true, marks: 30, paper: "Paper 4",
    concepts: ["ahist.stalin.governance"],
    stem: "Assess the impact of the Terror and the Purges on the Soviet Union in the years 1934-41.",
    points: [
      ["Human cost: arrests, executions and the gulag, with labelled estimates (over 1.5 million arrested and about 700,000 shot in 1937-38) and the effects on families", 5],
      ["Effect on the party, the NKVD and the leadership: the destruction of the old Bolsheviks, the show trials, the removal of Yezhov", 4],
      ["Effect on the armed forces and the economy: the loss of officers (Tukhachevsky and others), managers and experts; the poor performance against Finland; weakened planning", 5],
      ["Effect on society: fear, denunciation, obedience, the cult of Stalin, and promotion of new men into the elite", 4],
      ["Effect on Stalin's power and foreign policy: unchallenged authority but a weakened state in 1939-41", 2],
      ["Evaluation: a sustained judgement on the overall impact, weighing gains for Stalin against costs to the state and society", 10],
    ],
    levels: levels(30),
    wordLimit: { min: 600, max: 1300 },
    hints: ["Consider the impact on different groups (people, party, army, economy) and separate Stalin's gains from the country's losses."],
    modelAnswer: `The Terror and Purges of 1934-41 had a profound impact on the Soviet Union. They gave Stalin unchallenged power and an obedient society, but they killed or imprisoned huge numbers of people and weakened the army, the economy and the state's efficiency. I will argue that the impact was greatest on people and institutions, and that the gains were largely Stalin's own.

The human cost was enormous. After the murder of Kirov on 1 December 1934 the arrests widened, and in the Yezhovshchina of 1937-38 the NKVD used quotas against supposed enemies of every kind. Archive records suggest that more than 1.5 million people were arrested and about 700,000 shot in those two years, with many more sent to the gulag, where the population of camps and colonies stood at between one and two and a half million (these are estimates and historians debate them). The victims included workers, peasants, scientists, clergy and national minorities, such as the Poles, as well as party members. Their families suffered too, losing a breadwinner and being marked as relatives of an enemy.

The impact on the party and its leadership was dramatic. The show trials of 1936-38 destroyed the old Bolsheviks: Zinoviev and Kamenev in 1936, Pyatakov and Radek in 1937, and Bukharin and Rykov in 1938. The NKVD itself was purged, Yagoda was tried and Yezhov was removed in late 1938 and later shot. The result was a leadership that owed everything to Stalin, and a party that no longer contained a rival.

The impact on the armed forces and the economy was damaging. In June 1937 Marshal Tukhachevsky and seven other officers were shot, and historians estimate that some 30,000 to 35,000 officers were removed, including three of the five marshals. Inexperienced men replaced them, and the Red Army performed poorly in the Winter War against Finland in 1939-40. Managers, engineers and planners were arrested as wreckers, which encouraged caution and falsification of reports and reduced efficiency in industry. Stalin's wish to avoid a war with Germany in 1939-41 was partly based on knowing how weakened the army was, though he also ignored warnings of attack.

The impact on society was one of fear and conformity. Denunciation became a way to settle quarrels or to gain advancement, people avoided speaking freely, and the cult of Stalin and the 1936 Constitution presented a picture of unity. At the same time young men of working-class and peasant origin rose into the vacant posts, which gave some a sense of opportunity and loyalty to the regime.

Weighing these, the Terror had a mixed impact from the point of view of the regime. For Stalin personally it brought complete control and removed any possible rivals or critics. But for the state it brought heavy losses of skill and trust at the very time when war was approaching; the army, economy and the party's machinery were weakened. For the people the impact was largely a disaster of death, imprisonment and fear, though a minority rose rapidly. I conclude that the Terror strengthened Stalin's personal power but weakened the Soviet Union's capacity, and that its human cost was out of all proportion to any security gain.`,
    explanation: "A top answer assesses impact on several groups with labelled estimates, separates Stalin's gains from the state's and society's losses, and gives a sustained judgement. Level descriptors are our own wording; a reviewer should compare them with Cambridge's published grids.",
  });

  b.essay({
    d: 5, skill: C4.skill, applies: C4.applies, secs: C4.secs, examStyle: true, marks: 30, paper: "Paper 4",
    concepts: ["ahist.stalin.economy"],
    stem: "'Collectivisation was Stalin's greatest failure.' Assess this view.",
    points: [
      ["Aims achieved: state control of the grain supply, a surplus for the towns and exports, and labour released for industry", 5],
      ["Costs and failures: resistance, the slaughter of livestock, dekulakisation and the famine of 1932-33 (an estimated 5 to 8 million deaths)", 5],
      ["Long-term effects: low productivity, dependence on private plots, Machine Tractor Stations and the party's control of the countryside", 4],
      ["Comparison with other policies: the Five Year Plans' achievements and costs, the Terror, the Nazi-Soviet Pact", 4],
      ["Alternative interpretations: success by the state's aims; failure by human and economic cost; the argument that NEP could have continued", 2],
      ["Evaluation: a sustained judgement on whether collectivisation was the greatest failure, using criteria", 10],
    ],
    levels: levels(30),
    wordLimit: { min: 600, max: 1300 },
    hints: ["Decide what 'failure' means before you judge, and compare with other policies."],
    modelAnswer: `Collectivisation was one of Stalin's most costly policies, and it has a strong claim to be called his greatest failure in human terms. Yet in terms of the state's own aims it was partly successful, and the Terror may have been a more damaging failure to the Soviet state. The answer therefore depends on the criteria, and I will argue that collectivisation was the greatest failure in humanity and agriculture but not necessarily in the regime's own terms.

The state's aims were to gain control of grain, to feed the cities and industrial workers, to earn foreign currency through exports to pay for machinery and to release labour from the land. By the mid-1930s these were largely achieved. By 1932 about three in five peasant households were in collectives, and by the late 1930s nearly all. The state procured grain at low prices through quotas, the Machine Tractor Stations gave it control over machinery and the countryside, and millions of peasants moved to the towns to work in industry. The Five Year Plans depended on these things, so collectivisation contributed to industrialisation.

But the costs were severe. The peasants resisted: they killed their animals rather than hand them over, so that livestock numbers fell sharply and took until the late 1930s to recover. Dekulakisation deported about 1.8 million people in 1930-31, by estimate, many of whom died. The state's high grain quotas, together with poor harvests in some areas and the continued export of grain, produced the famine of 1932-33, in which historians estimate that 5 to 8 million people died in Ukraine, the Volga region, Kazakhstan and elsewhere. Some historians and governments call the Ukrainian famine a deliberate genocide, while others argue it resulted from policy against the peasantry in general. In either view, the loss of life was a catastrophe for which the policy was responsible.

In the long term, collectivised agriculture was inefficient. Peasants worked poorly on the collective land and relied on small private plots, which gave a large share of vegetables, milk and meat. Output of grain recovered only slowly, and the Soviet Union remained weak in agriculture for decades.

Comparison with other policies is necessary. The Five Year Plans had real achievements, in building an industrial base that proved vital in the war, although they also brought waste, falsified figures and hardship. The Terror killed some 700,000 people in two years (an estimate) and destroyed the army's leadership and the experience of managers, which weakened the state when war approached. The Nazi-Soviet Pact bought time but left the country exposed in 1941. In terms of cost to the state's capacity, one could argue that the Terror was the greater failure, while in terms of deaths and long-term damage to agriculture collectivisation was the greatest.

I therefore conclude that the claim is partly valid. Collectivisation failed in agriculture and in human terms, and in that sense it was Stalin's worst failure. But it achieved the state's objective of control over the countryside and grain, which were important aims for Stalin, so it was not a failure by his own measure. The question of "greatest" depends on whether the standard is human cost, which favours the claim, or the effect on the state, where the Terror has an equal claim.`,
    explanation: "A top answer defines failure, judges collectivisation by the state's aims and by its costs, compares it with other policies and reaches a sustained judgement. Level descriptors are our own wording; a reviewer should compare them with Cambridge's published grids.",
  });
});
