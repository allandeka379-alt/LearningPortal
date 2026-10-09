// Slice W4a: Stalin's economic policies and life in the Soviet Union (both boards: ZIMSEC topic 14, 0470 Depth study C4).
// Famine and deportation figures are historians' estimates.
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.russia.stalin-economy", { file: "russia/stalin-economy", keyPrefix: "russia.stalin-economy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the first Five-Year Plan begin?",
    options: [
      ["1928", "Correct: it was declared complete in 1932."],
      ["1917", "This was the year of the revolutions."],
      ["1921", "The NEP was introduced in 1921."],
      ["1936", "The second plan was already under way by 1936."],
    ],
    answer: "A",
    explanation: "The **first Five-Year Plan** ran from **1928** and was declared complete in four years.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was a kolkhoz?",
    options: [
      ["A collective farm controlled by the state", "Correct: peasants pooled land, animals and tools."],
      ["A better-off peasant who owned his own land", "This describes a kulak."],
      ["A Gulag labour camp in Siberia", "Kolkhozy were farms, not camps."],
      ["A state agency that set production targets", "This was Gosplan."],
    ],
    answer: "A",
    explanation: "A **kolkhoz** was a collective farm that had to deliver grain quotas to the state.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which new industrial city was built in the Ural Mountains under the Five-Year Plans?",
    options: [
      ["Magnitogorsk", "Correct: a huge iron and steel centre."],
      ["St Petersburg", "This was an old city, founded in the eighteenth century."],
      ["Kronstadt", "This was a naval base near Petrograd."],
      ["Yalta, on the Black Sea coast", "Yalta is a resort in Crimea."],
    ],
    answer: "A",
    explanation: "**Magnitogorsk** was built from nothing as a centre of iron and steel production.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did many peasants slaughter their animals during collectivisation?",
    options: [
      ["Rather than hand them over to the collective farms", "Correct: livestock numbers fell by about half."],
      ["Because the state was paying very high prices for meat", "Prices paid by the state were low."],
      ["Because tractors had replaced all horses by 1930", "There were too few tractors at first."],
      ["To feed the Red Army in the war against Germany", "The war with Germany began in 1941."],
    ],
    answer: "A",
    explanation: "Peasants killed animals **in protest** rather than give them to the collectives.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Stalin want to collectivise agriculture?",
    options: [
      ["To control grain supplies for the cities and exports", "Correct: grain paid for industrialisation."],
      ["To give each peasant family more land of its own", "Collectivisation ended private farms."],
      ["To restore the land to the old noble landlords of the Tsarist era", "The landlords had lost their land in 1917."],
      ["To copy the farming system used in the USA", "American farming was private."],
    ],
    hints: ["Think about how industrialisation was paid for."],
    answer: "A",
    explanation: "Control of **grain** fed the workers and paid for machinery from abroad; it also broke peasant independence.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Who was Alexei Stakhanov?",
    options: [
      ["A coal miner held up as a model worker", "Correct: his record of 1935 started a movement."],
      ["The head of Gosplan who designed the first plan", "Stakhanov was a miner."],
      ["A kulak who led resistance in Ukraine", "He was a miner from the Donbas."],
      ["A writer who criticised socialist realism", "He was a worker, not a writer."],
    ],
    hints: ["His name was given to workers who exceeded their targets."],
    answer: "A",
    explanation: "**Stakhanov's** record was used to push other workers to produce more.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which was a major weakness of the Five-Year Plans?",
    options: [
      ["Managers chased quantity, so quality suffered", "Correct: much output was badly made or wasted."],
      ["Heavy industry grew more slowly than under the NEP", "Heavy industry grew very fast."],
      ["Too many consumer goods were produced", "Consumer goods were neglected."],
      ["Unemployment rose sharply in the cities", "Unemployment disappeared."],
    ],
    hints: ["What happened when targets mattered more than anything else?"],
    answer: "A",
    explanation: "Pressure to meet **targets** led to poor quality, waste and false figures.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the famine of 1932-33 is most accurate?",
    options: [
      ["Historians estimate about 5-7 million died", "Correct: figures are estimates; some are higher."],
      ["Official records show exactly 1 million deaths", "No such exact figure exists; estimates are far higher."],
      ["It affected only the city of Moscow and its suburbs", "It hit Ukraine, Kazakhstan, the North Caucasus and the Volga."],
      ["It was caused by a German naval blockade of Soviet ports", "It was caused by Soviet policies."],
    ],
    hints: ["Deaths in famines are usually estimates."],
    answer: "A",
    explanation: "Death figures are **historians' estimates**, mostly between about 5 and 7 million across the USSR.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Five-Year Plans concentrated on heavy industry such as coal, steel and oil.",
    answer: true,
    explanation: "True. Consumer goods were a low priority.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under Stalin most Soviet women stopped working outside the home.",
    answer: false,
    explanation: "False. Millions of women entered paid work in the 1930s, while also doing most of the housework.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Gosplan", "State agency that drew up the plans"],
      ["Kulak", "Better-off peasant, or anyone resisting collectivisation"],
      ["Machine Tractor Station", "State centre supplying machinery to collective farms"],
      ["Holodomor", "Ukrainian name for the famine of 1932-33"],
    ],
    explanation: "Gosplan (planning), kulak (target of dekulakisation), Machine Tractor Station (machinery and control), Holodomor (famine in Ukraine).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Stakhanov's coal-mining record",
      "Forced collectivisation begins",
      "The first Five-Year Plan begins",
      "Famine in Ukraine and Kazakhstan",
    ],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["The plan began a year before forced collectivisation."],
    explanation: "First plan (1928); forced collectivisation (late 1929); famine (1932-33); Stakhanov (1935).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "By the mid-1930s about {{blank:a}} of peasant households had been collectivised. The large dam completed on the River {{blank:b}} in 1932 supplied electricity to industry.",
    blanks: [
      { id: "a", accepted: ["nine-tenths"], choices: ["nine-tenths", "one-tenth", "a quarter", "half"] },
      { id: "b", accepted: ["Dnieper"], choices: ["Dnieper", "Thames", "Rhine", "Zambezi"] },
    ],
    explanation: "About **nine-tenths** of households were in collective farms by the mid-1930s; the **Dnieper** dam opened in 1932.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how collectivisation was carried out.",
    points: [
      "From late 1929 peasants forced to join collective farms, handing over land, animals and tools.",
      "Collectives delivered fixed grain quotas to the state at low prices; machinery from Machine Tractor Stations.",
      "Resisters labelled kulaks: property seized, many shot or deported (about 1.8 million deported, estimate).",
      "Slowed briefly in March 1930, then resumed; about nine-tenths collectivised by the mid-1930s.",
    ],
    modelAnswer: "From late 1929 peasants were forced to join collective farms, handing over their land, animals and tools. The collectives had to deliver fixed quotas of grain to the state at low prices and received machinery from Machine Tractor Stations. Peasants who resisted were labelled kulaks: their property was seized, and many were shot or deported, historians estimate about 1.8 million people in 1930-31. Stalin slowed the campaign briefly in March 1930, but pressure resumed, and by the mid-1930s about nine-tenths of households were collectivised.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Stalin introduced the Five-Year Plans.",
    points: [
      "Identifies backwardness / fear of invasion.",
      "Explains that he believed the USSR must catch up with the West quickly or be crushed, so heavy industry and arms were needed.",
      "Identifies ideological and political aims.",
      "Explains that industry would create a working class for socialism, end the NEP's private enterprise and increase state control.",
    ],
    hints: ["Defence, ideology and control."],
    modelAnswer: "Stalin believed the USSR was far behind the capitalist countries and must catch up within about ten years or be crushed by them, so it needed heavy industry and armaments quickly. Industrialisation also fitted communist ideas: it would create a large working class, the base of socialism, end the private enterprise of the NEP and give the state control of the whole economy.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how different groups in Soviet society were affected by Stalin's economic policies.",
    points: [
      "Identifies peasants.",
      "Explains forced collectivisation, deportation of kulaks, low pay, restrictions on movement and the famine of 1932-33.",
      "Identifies industrial workers.",
      "Explains jobs and education but falling real wages, poor housing and harsh discipline (passports, penalties); Stakhanovites rewarded.",
      "Identifies women or ethnic minorities.",
      "Explains women's entry into work and the double burden, or minorities' Russification, deportations and the Kazakh famine.",
    ],
    hints: ["Choose at least three groups."],
    modelAnswer: "Peasants suffered most: they were forced into collective farms, those labelled kulaks were deported, and collective farm members were poorly paid and could not leave; millions died in the famine of 1932-33. Industrial workers gained jobs, education and chances of promotion, but real wages fell in the early 1930s, housing was overcrowded and discipline harsh, with internal passports and penalties for lateness, although Stakhanovites earned bonuses. Women entered paid work in millions but still did most of the housework, a double burden, while ethnic minorities faced Russification and, in some cases, the deportation of whole peoples; Kazakh nomads were devastated by forced settlement.",
    explanation: "Two marks per developed point (three groups).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a table of the kind printed in Soviet official publications in the late 1930s", "Electricity generated: 1928, about 5 billion kilowatt-hours; 1932, about 13 billion; 1937, about 36 billion.\nPig iron produced: 1928, about 3 million tonnes; 1932, about 6 million tonnes; 1937, about 15 million tonnes.")}\n\n${source("Source B", "a letter by a fictional American engineer working at a Soviet steel works, to his family, 1932", "The plant is enormous and the workers are young and keen. But half the machines we installed last spring are already broken through careless use, the barracks are freezing and the canteen serves the same soup every day. The managers report everything as done ahead of schedule. I have learned not to believe the figures on the factory noticeboard.")}`,
    hints: ["Compare an official source with an eyewitness."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about Soviet industry between 1928 and 1937?", points: [
        "Output rose very fast between 1928 and 1937 (electricity about seven times, pig iron more than four times).",
        "Growth continued through both plans and was largest in 1932-37 (e.g. electricity 13 to 36 billion kilowatt-hours).",
      ], explanation: "Two points from the data." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B support Source A?", points: [
        "Supports: huge new plants and keen workers suggest real growth.",
        "Challenges: managers report everything as done ahead of schedule; figures not trustworthy.",
        "Challenges: broken machines show waste and poor quality behind the numbers.",
        "Adds: poor living conditions, which A does not show.",
      ], explanation: "Support and challenge, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for judging the success of the Five-Year Plans? Use the sources and your own knowledge.", points: [
        "A: useful for the scale of growth; historians accept growth was rapid.",
        "A: official propaganda figures, some exaggerated; quantity, not quality or cost.",
        "B: eyewitness from an outsider with no reason to praise; shows waste, false reporting, poor conditions.",
        "B: one plant, one year (1932, the hardest year).",
        "Own knowledge: new cities, industry moved east, consumer goods neglected, Gulag labour, famine.",
        "Supported judgement on usefulness.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it shows the scale of growth in heavy industry, and historians accept that growth was very rapid even if some figures were exaggerated. But it is an official Soviet publication designed to show success, and it measures only quantity, saying nothing about quality, waste or human cost. Source B is useful because it comes from a foreign engineer with no reason to praise the system, and it reveals broken machines, false reporting and poor living conditions. However, it describes one plant in 1932, the hardest year. My own knowledge supports both: new cities such as Magnitogorsk and the move of industry east were real achievements, but consumer goods were neglected and forced labour was used. Together the sources are useful because each corrects the other: A shows what was achieved, B shows how and at what cost.", explanation: "Usefulness from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge success against Stalin's aims and against the cost to the people."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the main features of the Five-Year Plans.", points: [
        "Targets set by Gosplan for every industry and factory.",
        "Concentration on heavy industry (coal, steel, oil, electricity, machinery), later armaments.",
        "Huge projects (Magnitogorsk, Dnieper dam, Moscow Metro); industry moved east.",
        "Harsh labour discipline, Stakhanovite movement and forced Gulag labour.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'Stalin's economic policies were a success.' How far do you agree?", points: [
        ["Success: rapid growth of heavy industry; USSR a major industrial power by 1941", 2],
        ["Success: industry moved east and armaments helped win the war; jobs, education and social mobility", 2],
        ["Failure: collectivisation reduced output; livestock halved; famine of 1932-33 (estimates 5-7 million)", 2],
        ["Failure: consumer goods and living standards neglected; waste, false figures, forced labour", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "In terms of Stalin's own aims, the policies were a success. Heavy industry grew very fast: official figures show coal production more than tripling between 1928 and 1937, and even allowing for exaggeration the USSR became a major industrial power by 1941. New cities such as Magnitogorsk were built, industry was moved east beyond the reach of invaders, and the armaments produced helped the USSR survive the German invasion. Unemployment disappeared and education spread.\n\nHowever, the policies failed in other ways. Collectivisation reduced grain output in the early 1930s, livestock numbers fell by about half, and the famine of 1932-33 killed, by historians' estimates, about 5 to 7 million people. Consumer goods, housing and food were neglected, so living standards fell, and much production was wasteful, of poor quality or exaggerated. Much was built by forced labour.\n\nI partly agree. The policies succeeded in making the USSR an industrial and military power and in giving Stalin control, but at an enormous human cost and with lasting damage to agriculture, so they cannot be called a success for the Soviet people.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Five-Year Plan", "Production targets for the whole economy over five years, set by Gosplan; the first began in 1928.");
  b.card("DEFINITION", "Collectivisation", "Joining peasant farms into large state-controlled collective farms (kolkhozy), from 1929.");
  b.card("DEFINITION", "Kulak", "A better-off peasant; the label used for peasants who resisted collectivisation.");
  b.card("DEFINITION", "Stakhanovite", "A worker who greatly exceeded targets, named after the miner Alexei Stakhanov (1935).");
  b.card("FACT", "Name two great projects of the Five-Year Plans.", "Magnitogorsk (iron and steel city) and the Dnieper dam (1932); also the Moscow Metro (1935).");
  b.card("FACT", "What happened to livestock during collectivisation?", "Numbers fell by about half as peasants slaughtered animals rather than hand them over.");
  b.card("FACT", "How many died in the famine of 1932-33 (estimates)?", "Historians estimate about 5-7 million across the USSR, especially in Ukraine and Kazakhstan.");
  b.card("CONCEPT", "What was the 'double burden' of Soviet women?", "Full-time paid work plus nearly all the housework and childcare.");
  b.card("CONCEPT", "Were Stalin's economic policies a success?", "Industry and military power grew fast, but at huge human cost: famine, deportation, low living standards.");
});
