// Slice W2b: fascism, Nazism and Mussolini's Italy (ZIMSEC 12.4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.dictators.fascism-mussolini", { file: "dictators/fascism-mussolini", keyPrefix: "dictators.fascism-mussolini" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the March on Rome take place?",
    options: [
      ["1922", "Correct: in October 1922."],
      ["1919", "In 1919 Mussolini founded the Fasci di Combattimento."],
      ["1924", "In 1924 Matteotti was murdered."],
      ["1929", "In 1929 the Lateran Treaty was signed."],
    ],
    answer: "A",
    explanation: "The **March on Rome** was in October 1922, after which the King appointed Mussolini Prime Minister.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the ancient Roman symbol from which fascism took its name?",
    options: [
      ["A bundle of rods with an axe", "Correct: the fasces, symbol of authority."],
      ["A golden eagle on a staff", "The eagle was a Roman standard, but fascism's name comes from the fasces."],
      ["A laurel wreath of a Roman general", "The laurel wreath was a symbol of victory."],
      ["A broken chain", "A broken chain is a symbol of freedom, not of fascism."],
    ],
    answer: "A",
    explanation: "The **fasces**, a bundle of rods bound around an axe, stood for authority and strength through unity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature was central to Nazism from the start but was NOT central to Italian fascism at first?",
    options: [
      ["Racism and antisemitism", "Correct: Italy brought in anti-Jewish laws only in 1938."],
      ["A single ruling party", "Both regimes were one-party states."],
      ["The cult of a supreme leader", "Both had a leader cult: Il Duce and der Führer."],
      ["Hatred of communism", "Both were strongly anti-communist."],
    ],
    answer: "A",
    explanation: "**Racism and antisemitism** were at the core of Nazi ideology; Italian fascism stressed the nation and the state.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Italians mean by a 'mutilated victory'?",
    options: [
      ["Italy won the war but gained too little land", "Correct: it was refused Fiume and most of Dalmatia."],
      ["Italy had lost the war but kept most of its land", "Italy was on the winning side."],
      ["The King had surrendered to Austria in 1918", "Italy was victorious against Austria-Hungary in 1918."],
      ["The war had destroyed Rome and the northern cities", "Italian cities were not destroyed in the First World War."],
    ],
    answer: "A",
    explanation: "Many Italians felt cheated at Paris because Italy did not receive Fiume or most of Dalmatia despite heavy losses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Lateran Treaty of 1929 do?",
    options: [
      ["Recognised the Vatican City as a state", "Correct: it ended the quarrel between the Pope and the Italian state."],
      ["Gave Italy the port of Fiume", "Fiume was gained by agreement with Yugoslavia in 1924."],
      ["Created an alliance between Italy and Germany", "That was the Axis (1936) and the Pact of Steel (1939)."],
      ["Made the Fascist Party the only legal party", "Other parties were banned in 1926 by separate laws."],
    ],
    answer: "A",
    explanation: "The **Lateran Treaty** recognised the Vatican City and made Catholicism the state religion, winning Catholic support for Mussolini.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did King Victor Emmanuel III appoint Mussolini as Prime Minister in October 1922?",
    options: [
      ["He refused to use the army and feared civil war", "Correct: he rejected martial law against the Blackshirts."],
      ["The Fascists had won a majority in parliament", "The Fascists had only 35 seats."],
      ["Mussolini's forces had captured the royal palace", "The Blackshirts did not seize the palace."],
      ["The League of Nations had asked him to do so", "The League had no part in the appointment."],
    ],
    answer: "A",
    hints: ["The Fascists had only a small number of seats in 1922."],
    explanation: "The King refused to sign a martial law decree, perhaps fearing civil war and doubting the army's loyalty, and invited Mussolini to form a government.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What was the main aim of the corporate state?",
    options: [
      ["To end class conflict under state control", "Correct: employers and workers were organised together."],
      ["To hand factories to workers' councils", "This is a communist idea, which fascism opposed."],
      ["To give trade unions the right to strike", "Strikes were banned."],
      ["To sell state industries to foreign companies", "The aim was state control, not foreign ownership."],
    ],
    answer: "A",
    hints: ["Think about what fascism thought of strikes and class struggle."],
    explanation: "The **corporate state** grouped employers and workers in state-run corporations, banning free unions and strikes.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best suggests that Mussolini's economic 'battles' had limited success?",
    options: [
      ["The Battle for Births barely raised the birth rate", "Correct: a clear failure against its own target."],
      ["Wheat output increased after the Battle for Grain", "This is evidence of success, not failure."],
      ["The Pontine Marshes near Rome were drained for new farmland", "This is often cited as an achievement."],
      ["Mussolini signed the Lateran Treaty with the Pope", "This was a religious and political deal, not an economic battle."],
    ],
    answer: "A",
    hints: ["Find a battle that missed its own goal."],
    explanation: "The Battle for Births did not raise the birth rate significantly; even the Battle for Grain reduced other crops.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mussolini's armed supporters were known as the Blackshirts.",
    answer: true,
    explanation: "True. The Blackshirt squads attacked socialists, strike leaders and trade unions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The murder of Matteotti in 1924 led the King to dismiss Mussolini.",
    answer: false,
    explanation: "False. Opposition deputies walked out of parliament, but the King did not act, and Mussolini moved towards full dictatorship in 1925.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each policy with its aim.",
    pairs: [
      ["Battle for Grain", "Make Italy self-sufficient in wheat"],
      ["Battle for Births", "Increase Italy's population"],
      ["Lateran Treaty", "Win the support of the Catholic Church"],
      ["Acerbo Law", "Give the largest party a big majority in parliament"],
    ],
    explanation: "Each policy served fascism's aims of strength, self-sufficiency and control.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Lateran Treaty",
      "The murder of Matteotti",
      "The invasion of Abyssinia",
      "The March on Rome",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["Mussolini came to power before the Matteotti crisis."],
    explanation: "March on Rome 1922; Matteotti 1924; Lateran Treaty 1929; Abyssinia 1935.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mussolini was known as Il {{blank:a}}. His secret police was called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Duce"], choices: ["Duce", "Führer", "Caudillo", "Re"] },
      { id: "b", accepted: ["OVRA"], choices: ["OVRA", "Gestapo", "Cheka", "Balilla"] },
    ],
    explanation: "Mussolini was **Il Duce** (the leader); his secret police was the **OVRA**. The Balilla was a youth movement.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the socialist deputy murdered by fascists in 1924.",
    accepted: ["Matteotti", "Giacomo Matteotti"],
    wrong: ["Mussolini"],
    explanation: "**Giacomo Matteotti** had denounced fascist violence in parliament.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** features of fascism.",
    points: [
      "Extreme nationalism / the state above the individual.",
      "One-party state / rejection of democracy.",
      "A supreme leader / leader cult.",
      "Anti-communism.",
      "Use of propaganda, censorship, violence / glorification of war and expansion.",
    ],
    modelAnswer: "Extreme nationalism; a one-party state that rejects democracy; the cult of a supreme leader; hostility to communism; and rule through propaganda, censorship and violence, with war glorified.",
    explanation: "One mark per feature.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the problems of post-war Italy helped Mussolini to come to power.",
    points: [
      "Identifies the 'mutilated victory'.",
      "Explains that nationalists felt betrayed by the government, and Mussolini promised national greatness.",
      "Identifies economic problems (debts, inflation, unemployment).",
      "Explains that hardship made people lose faith in liberal governments.",
      "Identifies fear of communism (strikes, factory occupations 1919-20).",
      "Explains that industrialists, landowners and the middle class backed the Blackshirts as a defence against revolution.",
    ],
    hints: ["Think about national pride, the economy and fear of revolution."],
    modelAnswer: "After the war many Italians felt Italy had been cheated at Paris, a 'mutilated victory', and blamed the liberal government, while Mussolini promised to restore national greatness. War debts, inflation and unemployment caused hardship, so people lost faith in the weak coalition governments. Above all, strikes, factory occupations and land seizures in 1919-1920 frightened industrialists, landowners and the middle class, who funded and tolerated the Blackshirts as a defence against communist revolution.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which Mussolini turned his government into a dictatorship after 1922.",
    points: [
      "Identifies the Acerbo Law (1923).",
      "Explains that it gave two-thirds of seats to the largest party, securing a Fascist majority in 1924.",
      "Identifies repression after the Matteotti crisis (bans on parties 1926, censorship, OVRA).",
      "Explains that opponents could no longer organise or speak, so no legal opposition remained.",
    ],
    hints: ["Think about elections and about opponents."],
    modelAnswer: "First, the Acerbo Law of 1923 gave two-thirds of the seats to the party with the most votes, so the Fascists gained a secure majority in 1924. Second, after the Matteotti crisis he banned other parties by 1926, censored the press and used the OVRA secret police and internal exile, so opponents could no longer organise.",
    explanation: "Two marks per explained way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "the memories of a fictional factory owner from Turin, written in the 1950s", "In September 1920 my workers locked me out of my own factory and raised the red flag over the gate. The police did nothing; the government in Rome did nothing. When the Blackshirts came to our district they were rough men, but they cleared the streets of the Reds. I gave them money, and so did every owner I knew. In 1922 I would have welcomed the devil himself if he promised order.")}`,
    hints: ["Consider the owner's interests and when he wrote."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A tell you about conditions in Italy in 1920?", points: [
        "Workers occupied factories / strikes (red flag).",
        "The government and police failed to act.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why did people like the writer support the Fascists? Use the source and your own knowledge.", points: [
        "Fear of communist revolution (red flag, factory occupations).",
        "Weakness of the liberal government.",
        "Blackshirts broke strikes and attacked socialists.",
        "Own knowledge: industrialists and landowners funded the squads; wanted order and protection of property.",
      ], explanation: "Reasons linked to the source and context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source A as evidence of why Mussolini came to power? Use the source and your own knowledge.", points: [
        "Useful: shows fear of communism and the failure of the government (supported by the 1920 factory occupations).",
        "Useful: shows funding of the Blackshirts by industrialists.",
        "Limit: one owner's view; workers or peasants would see it differently.",
        "Limit: written in the 1950s, perhaps to excuse his support for fascism.",
        "Limit: omits other factors (mutilated victory, King's decision, Mussolini's propaganda).",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it shows clearly how fear of communism and the weakness of the government drove property owners to support Mussolini, and my own knowledge confirms that workers occupied factories in northern Italy in 1920 and that industrialists funded the Blackshirts. However, it is one owner's view; workers and socialists, who were attacked by the squads, would describe fascism very differently. It was written in the 1950s, when the writer may have wanted to excuse his support for a regime that ended in disaster. It also says nothing about other causes, such as the anger over the mutilated victory or the King's decision not to use the army in 1922. It is therefore useful for one important reason, but not as a full explanation.", explanation: "Provenance, content and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh success at home against the costs and failures."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe Mussolini's foreign policy between 1923 and 1936.", points: [
        "Corfu 1923: occupied the island and forced Greece to pay.",
        "Fiume gained 1924 / influence over Albania.",
        "Stresa Front 1935 / troops to the Austrian border 1934.",
        "Invasion of Abyssinia 1935-36 / Spain 1936 / Axis 1936.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How successful were Mussolini's domestic policies?", points: [
        ["Successes: order and control (one-party state, repression), propaganda cult.", 2],
        ["Successes: Lateran Treaty won Church support; public works and land drainage; more wheat.", 2],
        ["Failures: Battle for Births failed; Battle for Grain hurt other crops; strong lira hurt exports.", 2],
        ["Failures: workers' living standards; corporate state favoured employers; the south stayed poor; propaganda exaggerated.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Mussolini's domestic policies had some successes. He established firm control: parties were banned, opponents silenced and a cult of Il Duce spread through schools, newspapers and radio. The Lateran Treaty of 1929 ended the long quarrel with the Church and won Catholic support. Public works and the draining of the Pontine Marshes created farmland and jobs, and the Battle for Grain increased wheat output.\n\nHowever, many policies failed. The Battle for Births hardly raised the birth rate. The Battle for Grain reduced other crops, and the strong lira made exports expensive. The corporate state favoured employers, banned strikes and did little to improve wages, and the south remained poor. Much of the regime's success existed mainly in its propaganda.\n\nOverall Mussolini succeeded in political control and in his deal with the Church, but his economic and social policies achieved far less than he claimed, so his domestic policies were only partly successful.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Fascism", "Movement putting nation and state above the individual; one party, a supreme leader, anti-communism, propaganda and force.");
  b.card("DEFINITION", "Nazism", "German fascism under Hitler, with racism and antisemitism at its centre and the aim of Lebensraum.");
  b.card("FACT", "When was the March on Rome?", "October 1922; the King then appointed Mussolini Prime Minister.");
  b.card("DEFINITION", "Mutilated victory", "Italians' bitterness that Italy won the war but gained less land than expected at Paris.");
  b.card("FACT", "What was the Acerbo Law (1923)?", "It gave two-thirds of the seats to the party with the most votes.");
  b.card("FACT", "Who was Matteotti?", "A socialist deputy murdered by fascists in 1924 after denouncing their violence.");
  b.card("FACT", "What was the Lateran Treaty (1929)?", "Agreement with the Pope recognising the Vatican City and making Catholicism the state religion.");
  b.card("DEFINITION", "Corporate state", "Employers and workers organised in state-controlled corporations; free unions and strikes banned.");
  b.card("CONCEPT", "Give four inter-war problems that favoured dictatorship in Italy and Germany.", "Resentment of the peace settlement, economic crisis and unemployment, weak coalition governments, fear of communism.");
});
