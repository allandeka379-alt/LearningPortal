// Slice W4a: the revolutions of 1917 (both boards: ZIMSEC topic 14 February/October; 0470 Depth study C March/November).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.russia.revolutions-1917", { file: "russia/revolutions-1917", keyPrefix: "russia.revolutions-1917" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the Bolsheviks in 1917?",
    options: [
      ["Lenin", "Correct: he returned from exile in April 1917."],
      ["Kerensky", "Kerensky led the Provisional Government from July 1917."],
      ["Kornilov", "Kornilov was the army commander whose advance failed in September."],
      ["Prince Lvov, a liberal landowner", "Lvov was the first head of the Provisional Government."],
    ],
    answer: "A",
    explanation: "**Lenin** led the Bolsheviks and became head of the new Soviet government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the revolution that overthrew the Tsar called the February Revolution by some books and the March Revolution by others?",
    options: [
      ["Russia used a calendar 13 days behind the West", "Correct: 23 February old style was 8 March new style."],
      ["It began in February and the Tsar abdicated a year later", "He abdicated within a week, in March (new style)."],
      ["There were two separate revolutions a month apart", "It is one revolution with two dates."],
      ["Cambridge and ZIMSEC disagree about when it happened", "They agree; they use different calendars."],
    ],
    answer: "A",
    explanation: "Russia used the **Julian calendar** until February 1918, 13 days behind the Western calendar.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What was the Bolsheviks' main slogan in 1917?",
    options: [
      ["Peace, Land and Bread", "Correct: it promised what soldiers, peasants and workers wanted."],
      ["Liberty, Equality, Fraternity", "This was the slogan of the French Revolution."],
      ["Socialism in One Country", "This was Stalin's policy in the 1920s."],
      ["Blood and Iron", "This phrase is linked to Bismarck."],
    ],
    answer: "A",
    explanation: "**'Peace, Land and Bread'** summed up the Bolsheviks' appeal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was 'dual power' in 1917?",
    options: [
      ["Power shared by the government and the Petrograd Soviet", "Correct: soldiers obeyed the Soviet first."],
      ["Rule by the Tsar and the Duma together", "The Tsar had abdicated in March 1917."],
      ["Rule by Lenin and Trotsky as joint leaders", "Lenin led the government; Trotsky did not share the leadership."],
      ["A wartime alliance between Russia and Britain against Germany", "The term refers to power inside Russia."],
    ],
    answer: "A",
    explanation: "Under **dual power** the Soviet's Order No. 1 limited what the Provisional Government could do.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the mutiny of the Petrograd garrison decisive in the February (March) Revolution?",
    options: [
      ["Without troops the Tsar could not restore order", "Correct: his generals advised abdication."],
      ["The soldiers immediately made Lenin head of government", "Lenin was still in exile."],
      ["The soldiers ended Russia's part in the war", "Russia stayed in the war until 1918."],
      ["The mutiny was ordered by the Duma to remove Rasputin", "Rasputin had been killed in December 1916."],
    ],
    hints: ["Compare 1917 with how the Tsar survived 1905."],
    answer: "A",
    explanation: "In 1905 the army had saved the Tsar; in 1917 the **garrison joined the crowds**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the Kornilov affair help the Bolsheviks?",
    options: [
      ["Kerensky armed the Red Guards to defend Petrograd", "Correct: Bolsheviks appeared as defenders of the revolution."],
      ["Kornilov joined the Bolsheviks with all of his troops", "Kornilov was a strong opponent of the Bolsheviks."],
      ["It made Lenin Commander-in-Chief of the army", "No such appointment happened."],
      ["It forced Germany to make peace with Russia", "Peace came at Brest-Litovsk in March 1918."],
    ],
    hints: ["Who did Kerensky turn to for help?"],
    answer: "A",
    explanation: "Kerensky had to arm the workers, including the **Red Guards**, and was discredited.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which decision did most to undermine the Provisional Government's support in 1917?",
    options: [
      ["Continuing the war against Germany", "Correct: the failed offensive led to desertion and anger."],
      ["Releasing political prisoners", "This was popular."],
      ["Granting freedom of speech and the press", "This was popular, although it helped its opponents."],
      ["Abolishing the death penalty at first", "This was not a main cause of its unpopularity."],
    ],
    hints: ["What did soldiers and their families want most?"],
    answer: "A",
    explanation: "Staying **in the war** cost lives, food and support; it also made 'Peace' the Bolsheviks' strongest promise.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that the October (November) Revolution was a coup rather than a popular revolution?",
    options: [
      ["The rising was planned by one party and carried out by a small force", "Correct: it was organised by the Military Revolutionary Committee."],
      ["The Bolsheviks had won majorities in the Petrograd and Moscow Soviets", "This suggests popular support."],
      ["Few people were willing to defend the Provisional Government", "This suggests the government had lost support."],
      ["Peasants were already seizing land across the countryside", "This shows a popular revolution in the villages."],
    ],
    hints: ["Look for evidence about how the seizure was carried out."],
    answer: "A",
    explanation: "The seizure was **planned by the Bolshevik leadership** and carried out by a small armed force.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Nicholas II abdicated in March 1917 (February, old style).",
    answer: true,
    explanation: "True. He abdicated on 15 March 1917 (2 March old style).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Bolshevik Party planned and led the revolution that overthrew the Tsar.",
    answer: false,
    explanation: "False. The February (March) Revolution was largely spontaneous; most Bolshevik leaders were in exile or prison.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1917.",
    pairs: [
      ["Alexander Kerensky", "Head of the Provisional Government from July"],
      ["Leon Trotsky", "Organised the seizure of power through the Military Revolutionary Committee"],
      ["Lavr Kornilov", "Army commander whose advance on Petrograd collapsed"],
      ["Prince Lvov", "First head of the Provisional Government"],
    ],
    explanation: "Kerensky (from July), Trotsky (Military Revolutionary Committee), Kornilov (September), Lvov (March-July).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events of 1917 in chronological order.",
    pairs: [
      "The Kornilov affair",
      "Lenin returns to Petrograd",
      "The Bolsheviks capture the Winter Palace",
      "Nicholas II abdicates",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["Lenin returned the month after the abdication."],
    explanation: "Abdication (March); Lenin returns (April); Kornilov affair (September); Winter Palace (November, new style).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Lenin set out his policies in the {{blank:a}} Theses. The Bolsheviks seized power in Petrograd on 7 November 1917, which was {{blank:b}} in the old Russian calendar.",
    blanks: [
      { id: "a", accepted: ["April"], choices: ["April", "October", "July", "Kronstadt"] },
      { id: "b", accepted: ["25 October"], choices: ["25 October", "25 November", "7 October", "20 November"] },
    ],
    explanation: "The **April Theses**; 7 November (new style) was **25 October** (old style), 13 days earlier.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the building in Petrograd where the ministers of the Provisional Government were arrested in November 1917.",
    accepted: ["Winter Palace", "the Winter Palace"],
    wrong: ["Kremlin"],
    explanation: "The **Winter Palace** was captured during the night of 7-8 November 1917.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how the First World War affected Russia before 1917.",
    points: [
      "Military defeats (e.g. Tannenberg 1914; losses in 1915) and huge casualties.",
      "Shortages of weapons and supplies for the army.",
      "Food and fuel shortages in the cities; railways overloaded; inflation.",
      "The Tsar took command (1915) and was blamed; Tsarina and Rasputin discredited the government.",
    ],
    modelAnswer: "The army suffered heavy defeats, such as Tannenberg in 1914 and the losses of 1915, and millions of soldiers were killed, wounded or captured, partly because of shortages of rifles and shells. At home the railways could not carry both troops and food, so the cities ran short of bread and fuel and prices rose much faster than wages. In 1915 the Tsar made himself Commander-in-Chief, so he was blamed for defeats, while the Tsarina and Rasputin discredited the government in Petrograd.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Lenin's April Theses were important.",
    points: [
      "Identifies refusal to support the Provisional Government / 'All power to the Soviets'.",
      "Explains that this made the Bolsheviks the only major party opposing the government, so they gained when it failed.",
      "Identifies the promise of peace and land.",
      "Explains that 'Peace, Land and Bread' matched what soldiers, peasants and workers wanted, winning support.",
    ],
    hints: ["What did Lenin tell his party to do, and what did he promise?"],
    modelAnswer: "In the April Theses Lenin told the Bolsheviks to give no support to the Provisional Government and to demand all power to the soviets. This made them the main party opposing the government, so they gained support whenever it failed. He also demanded an end to the war and the transfer of land, summed up as 'Peace, Land and Bread', which matched exactly what soldiers, peasants and workers wanted.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Provisional Government failed in 1917.",
    points: [
      "Identifies continuing the war.",
      "Explains that the failed summer offensive caused desertion and anger, while the Bolsheviks promised peace.",
      "Identifies delay over land and elections.",
      "Explains that peasants seized land anyway and the government looked weak and unrepresentative.",
      "Identifies dual power / the Kornilov affair.",
      "Explains that Order No. 1 limited its control of the army and Kornilov's failure forced Kerensky to arm the Bolsheviks.",
    ],
    hints: ["War, land and power."],
    modelAnswer: "The Provisional Government kept Russia in the war, and when Kerensky's summer offensive failed soldiers deserted and anger grew, while the Bolsheviks promised peace. It postponed land reform and elections to the Constituent Assembly, so peasants seized land anyway and the government, which had never been elected, looked weak. It also never controlled the army fully, because the Soviet's Order No. 1 told soldiers to obey the Soviet first; and in the Kornilov affair Kerensky had to arm the workers, including the Bolshevik Red Guards, who later used those weapons against him.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter by a fictional Russian soldier at the front to his family in a village near Tambov, October 1917 (old style)", "They tell us to hold the line for Russia and the Allies, but we have no boots and the bread is mouldy. In the village, you write, the landlord's fields stand idle and the committee does nothing. The Bolshevik who came to our regiment said: peace now, and the land to those who work it. Half the men listened. I think we will not stay here through the winter.")}\n\n${source("Source B", "an editorial in a fictional liberal Petrograd newspaper, the morning after the Winter Palace was captured", "A handful of armed men, obeying one party, have seized the capital in the name of the soviets while the Congress of Soviets was still meeting. The Constituent Assembly, for which the people have waited since March, has been robbed of its task before it could meet. What was done last night was not the will of Russia but the will of Mr Lenin.")}`,
    hints: ["Consider who wrote each source and what each wanted."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about why the Bolsheviks gained support?", points: [
        "Soldiers wanted peace; conditions at the front were terrible.",
        "Peasants wanted land; the Bolsheviks promised peace and land while the government delayed.",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B give different views of the Bolshevik seizure of power?", points: [
        "A: suggests real support among soldiers for Bolshevik promises.",
        "B: presents it as a coup by a small armed group of one party.",
        "B: stresses that it pre-empted the Congress and the Constituent Assembly; A says nothing about elections.",
        "Some agreement: both suggest the government's position was weak / it had lost control.",
      ], explanation: "Differences and any similarity, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that the October (November) Revolution was a popular revolution? Use the sources and your own knowledge.", points: [
        "A: support for Bolshevik slogans among soldiers (own knowledge: majorities in the soviets by September).",
        "A: one soldier's private letter; 'half the men' shows support was not universal.",
        "B: a coup by a small armed force (own knowledge: Military Revolutionary Committee; Red Guards).",
        "B: liberal paper hostile to Bolsheviks; written immediately in anger.",
        "Own knowledge: Bolsheviks won only about a quarter of the Constituent Assembly vote.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A suggests popular support: a soldier reports that half his regiment listened to a Bolshevik promising peace and land, and my own knowledge shows that by September the Bolsheviks had majorities in the Petrograd and Moscow Soviets. But it is one private letter, and 'half the men' shows that support was not universal. Source B presents the seizure as a coup by a small armed force obeying one party, and my own knowledge supports this: the rising was organised by Trotsky's Military Revolutionary Committee before the Congress of Soviets could decide. However, B comes from a liberal paper hostile to the Bolsheviks, written in anger. In the Constituent Assembly elections soon after, the Bolsheviks won only about a quarter of the vote. The sources show that the Bolsheviks had real support for their promises, but that the seizure itself was a coup carried out at a moment when few would defend the government.", explanation: "Both sides from the sources, with own knowledge and a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the war with longer-term weaknesses and the events of early 1917."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events of the February (March) Revolution of 1917.", points: [
        "Women queueing for bread joined striking workers on International Women's Day (8 March / 23 February).",
        "A general strike spread through Petrograd.",
        "Soldiers of the garrison refused to fire and joined the crowds; Petrograd Soviet and Duma committee formed.",
        "Nicholas II abdicated (15 March / 2 March); Provisional Government formed; Michael refused the throne.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far was the First World War responsible for the fall of the Tsar in 1917?", points: [
        ["For: military defeats and casualties; the Tsar personally blamed after taking command", 2],
        ["For: shortages, inflation and transport breakdown; Tsarina and Rasputin discredited government", 2],
        ["Against: long-term weaknesses: autocracy, peasant land hunger, workers' conditions, broken promises of 1905", 2],
        ["Against: Nicholas II's own failings; the mutiny of the Petrograd garrison as the decisive event", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The war was the main reason the Tsar fell in 1917. Defeats such as Tannenberg and the huge losses of 1915 destroyed confidence in the regime, and after Nicholas took personal command in 1915 he was blamed for every failure. At home, the war overloaded the railways, causing bread and fuel shortages and rapid inflation in the cities, while the Tsarina and Rasputin made the government look incompetent and even disloyal.\n\nHowever, the war worked on weaknesses that already existed. Russia was an autocracy whose ruler had broken the promises of 1905; peasants still wanted land, workers lived in poor conditions, and strikes were rising before 1914. Nicholas's own stubbornness and poor judgement made things worse, and the decisive moment came when the soldiers of the Petrograd garrison refused to fire on the crowds.\n\nOverall, the war was the most important cause because it turned long-standing discontent into a crisis and turned the army against the Tsar, but it caused his fall only because the regime was already weak.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "Why do Russian 1917 dates differ by 13 days?", "Russia used the Julian calendar until February 1918; the West used the Gregorian.");
  b.card("FACT", "When did Nicholas II abdicate?", "15 March 1917 (2 March old style).");
  b.card("DEFINITION", "Provisional Government", "The temporary government formed from Duma members after the Tsar's abdication, led by Lvov and then Kerensky.");
  b.card("DEFINITION", "Dual power", "The sharing of authority between the Provisional Government and the Petrograd Soviet in 1917.");
  b.card("FACT", "What were the April Theses?", "Lenin's demands of April 1917: no support for the government, end the war, all power to the soviets.");
  b.card("FACT", "What was the Kornilov affair?", "An apparent advance on Petrograd by General Kornilov (September 1917); Kerensky armed the Red Guards to stop it.");
  b.card("FACT", "When did the Bolsheviks seize power?", "6-7 November 1917 (24-25 October old style).");
  b.card("FACT", "What was Trotsky's role in November 1917?", "Chairman of the Petrograd Soviet; he organised the rising through the Military Revolutionary Committee.");
  b.card("CONCEPT", "Why did the Provisional Government fail?", "It continued the war, delayed land reform and elections, shared power with the Soviet and was weakened by the Kornilov affair.");
});
