// Slice W4a: the rise of the Nazis, 1919-1933 (both boards: ZIMSEC topic 12, 0470 Depth study B key question 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.germany.nazi-rise", { file: "germany/nazi-rise", keyPrefix: "germany.nazi-rise" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was Hitler appointed Chancellor of Germany?",
    options: [
      ["30 January 1933", "Correct: by President Hindenburg."],
      ["9 November 1923", "This was the day of the march in the Munich Putsch."],
      ["5 March 1933", "This was the date of the last multi-party election."],
      ["2 August 1934", "This was the day Hindenburg died."],
    ],
    answer: "A",
    explanation: "Hindenburg appointed Hitler Chancellor on **30 January 1933**.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What share of the vote did the Nazis win in the Reichstag election of July 1932?",
    options: [
      ["About 37%", "Correct: 37.3%, making them the largest party."],
      ["About 2.6%", "This was their result in 1928."],
      ["About 18%", "This was their result in September 1930."],
      ["Over 50%, an overall majority of the votes", "The Nazis never won a majority in a free election."],
    ],
    answer: "A",
    explanation: "In July 1932 the Nazis won **37.3%** and 230 seats, their best result in a free election.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Nazis mean by 'Lebensraum'?",
    options: [
      ["Land in Eastern Europe for Germans", "Correct: 'living space'."],
      ["A united community of all Germans above class divisions", "This was the Volksgemeinschaft."],
      ["The return of Germany's colonies in Africa and the Pacific", "The term referred to land in Eastern Europe."],
      ["A programme of new housing for German workers", "It was a policy of expansion, not housing."],
    ],
    answer: "A",
    explanation: "**Lebensraum** ('living space') meant conquering land in the East.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which First World War general supported Hitler in the Munich Putsch?",
    options: [
      ["Ludendorff", "Correct: he marched with Hitler on 9 November 1923."],
      ["Hindenburg", "Hindenburg was not involved; he became President in 1925."],
      ["Schleicher", "Schleicher was a general who became Chancellor in 1932."],
      ["Roon, the Prussian War Minister", "Roon was Prussian War Minister in the 1860s."],
    ],
    answer: "A",
    explanation: "General **Ludendorff** lent his prestige to the putsch.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Nazis have little electoral success between 1924 and 1929?",
    options: [
      ["Germany was more prosperous and stable", "Correct: few voters were drawn to extremists."],
      ["The party was banned until 1929", "The ban was lifted and the party refounded in 1925."],
      ["Hitler was in prison throughout these years", "He was released in December 1924."],
      ["Women were not allowed to vote until 1930", "Women had voted since 1919."],
    ],
    hints: ["Think about the Stresemann years."],
    answer: "A",
    explanation: "Under Stresemann the economy recovered, so **few voters wanted extreme solutions**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did Chancellor Brüning govern Germany from 1930?",
    options: [
      ["By presidential decree under Article 48", "Correct: he had no Reichstag majority."],
      ["With a coalition of the Nazis and the Communists", "The two parties were bitter enemies."],
      ["As head of a military government after a coup", "There was no coup in 1930."],
      ["By holding a referendum on every important law", "Laws were made by decree, not referendums."],
    ],
    hints: ["Which article of the constitution allowed government without parliament?"],
    answer: "A",
    explanation: "**Brüning** relied on Hindenburg's emergency decrees, so democracy was already weakened.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did Papen and Hindenburg agree to make Hitler Chancellor in January 1933?",
    options: [
      ["They believed they could control him", "Correct: only three Nazis were in the cabinet."],
      ["The Nazis had just won a majority of the votes", "The Nazis never won a free majority."],
      ["Hitler had promised to restore the Kaiser", "He made no such promise."],
      ["The army had threatened to seize power if they did not", "The decision came from the President's circle."],
    ],
    hints: ["Think about how many Nazis were in the first cabinet."],
    answer: "A",
    explanation: "The conservatives thought that, surrounded by non-Nazis, Hitler could be **used and controlled**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that Hitler was 'given' power rather than winning it?",
    options: [
      ["The Nazi vote fell in November 1932", "Correct: yet he was appointed two months later."],
      ["The Nazis became the largest party in July 1932", "This supports the view that he won support."],
      ["Goebbels ran highly effective propaganda campaigns", "This explains Nazi popularity."],
      ["Hitler won about 37% in the 1932 presidential election", "This shows popular support."],
    ],
    hints: ["Look for evidence that support was falling when he was appointed."],
    answer: "A",
    explanation: "With the Nazi vote **falling**, Hitler's appointment came from a deal at the top.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Hitler wrote Mein Kampf while in prison after the Munich Putsch.",
    answer: true,
    explanation: "True. He wrote it in Landsberg prison in 1924.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Nazi support was strongest among Catholic industrial workers.",
    answer: false,
    explanation: "False. Support was strongest among Protestants, the middle classes and in rural areas; Catholics and industrial workers were less likely to vote Nazi.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Joseph Goebbels", "Nazi propaganda chief"],
      ["Franz von Papen", "Chancellor in 1932 who became Hitler's Vice-Chancellor"],
      ["Heinrich Brüning", "Chancellor who ruled by decree from 1930"],
      ["Anton Drexler", "Founder of the German Workers' Party"],
    ],
    explanation: "Goebbels (propaganda), Papen (Vice-Chancellor 1933), Brüning (Chancellor 1930-32), Drexler (founder, 1919).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Nazis become the largest party in the Reichstag",
      "The Munich Putsch",
      "Brüning begins to govern by decree",
      "Hitler joins the German Workers' Party",
    ],
    right: POS,
    rightIndex: [3, 1, 2, 0],
    hints: ["The Depression began after the Wall Street Crash of 1929."],
    explanation: "Hitler joins (1919); Munich Putsch (1923); Brüning by decree (1930); largest party (July 1932).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Nazi private army, known as the Brownshirts, was the {{blank:a}}. In September 1930 the Nazis won {{blank:b}} seats in the Reichstag.",
    blanks: [
      { id: "a", accepted: ["SA"], choices: ["SA", "SS", "Gestapo", "Freikorps"] },
      { id: "b", accepted: ["107"], choices: ["107", "12", "230", "288"] },
    ],
    explanation: "The **SA** were the Brownshirts; the Nazis won **107** seats in 1930 (12 in 1928, 230 in July 1932, 288 in March 1933).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which city did the Nazis attempt their putsch in November 1923?",
    accepted: ["Munich", "München", "Munchen"],
    wrong: ["Berlin"],
    explanation: "The putsch began in a beer hall in **Munich**, the capital of Bavaria.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the main ideas of the Nazi Party in the 1920s.",
    points: [
      "Destroy the Treaty of Versailles / unite all Germans in a Greater Germany.",
      "Racism: Aryan master race; anti-Semitism, Jews excluded from citizenship.",
      "Lebensraum: expansion into Eastern Europe.",
      "Opposition to democracy and communism; one strong leader / 'socialist' promises to workers and small traders.",
    ],
    modelAnswer: "The Nazis wanted to destroy the Treaty of Versailles and unite all German-speakers in a Greater Germany. They believed Germans were an Aryan master race and blamed Jews for Germany's problems, saying Jews should not be citizens. They wanted Lebensraum, living space in Eastern Europe. They rejected democracy and communism and wanted one strong leader, and they made 'socialist' promises to workers and small traders.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Munich Putsch turned out to be useful to Hitler.",
    points: [
      "Identifies the trial as publicity.",
      "Explains that newspapers reported his speeches nationally, making him famous among nationalists.",
      "Identifies the change of tactics / Mein Kampf.",
      "Explains that he decided to win power legally through elections and set out his ideas in Mein Kampf.",
    ],
    hints: ["What happened after the putsch failed?"],
    modelAnswer: "His trial gave Hitler a national platform: newspapers across Germany reported his attacks on the republic and Versailles, and sympathetic judges gave him a light sentence. In prison he wrote Mein Kampf and decided to change tactics, winning power legally through elections rather than by force, which was the strategy that eventually succeeded.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why support for the Nazis grew between 1929 and 1932.",
    points: [
      "Identifies the Depression / unemployment.",
      "Explains that over six million unemployed and fearful middle classes turned to a party promising work and strong action.",
      "Identifies fear of communism.",
      "Explains that the rising KPD vote drove business, farmers and the middle classes to the Nazis as a barrier.",
      "Identifies propaganda and Hitler's appeal.",
      "Explains that Goebbels' methods and Hitler's image as a strong leader above party quarrels reached many groups.",
    ],
    hints: ["Economic, political and propaganda reasons."],
    modelAnswer: "The Depression was the main reason. Unemployment rose to over six million, and the middle classes feared a repeat of 1923, so many turned to a party that promised work and strong action. Fear of communism also helped: as the Communist vote rose, business leaders, farmers and the middle classes saw the Nazis as a barrier against revolution. Nazi propaganda, organised by Goebbels with rallies, posters and films, presented Hitler as a strong leader above the quarrelling parties who had something to offer every group.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a description in words of a Nazi election poster of the kind used in 1932", "A crowd of thin, grey-faced men and women with tired eyes stands in a long line. Across the top in large letters: 'Our last hope'. Below, in smaller letters, the name of the party's leader.", { described: true })}\n\n${source("Source B", "an extract from the memoirs of a fictional Berlin shopkeeper, published in 1955", "I voted for them in 1932. I was not a party man and cared little for their talk about race. My shop was failing, my son had no work, and every week there was fighting in the street between the Reds and the Brownshirts. Hitler at least seemed to know what he wanted. I thought the old gentlemen around Hindenburg would keep him in order.")}`,
    hints: ["Compare why each source was produced and when."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A?", points: [
        "Ordinary Germans are suffering / desperate in the Depression.",
        "The Nazis (Hitler) are the only hope of rescue.",
      ], explanation: "Two points of message." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B support Source A about why people voted Nazi?", points: [
        "Supports: economic despair (failing shop, unemployed son) matches the poster's suffering crowd.",
        "Supports: Hitler seen as a strong leader / hope.",
        "Differs: B adds fear of communist street violence.",
        "Differs: B shows a voter who ignored Nazi racial ideas and trusted conservatives to control Hitler.",
      ], explanation: "Agreement and difference, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for explaining the rise of the Nazis? Use the sources and your own knowledge.", points: [
        "A: useful for Nazi propaganda methods and targeting of the unemployed.",
        "A: shows what the Nazis wanted voters to think, not why they voted.",
        "B: useful for one voter's motives (economy, fear of communism, Hitler's appeal).",
        "B: written in 1955, after the war: may play down support for Nazi ideas (hindsight/self-justification).",
        "Own knowledge: election figures 1928-32; Papen and Hindenburg's deal.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful as evidence of Nazi propaganda: it targeted the unemployed and presented the party as the last hope, which matches Goebbels' methods. But it shows only what the Nazis wanted voters to believe. Source B is useful because it gives a voter's own reasons: economic ruin, fear of communist street fighting and Hitler's image as a strong leader. It also mentions the conservatives around Hindenburg, which my own knowledge confirms were decisive in January 1933. However, it was written in 1955, after the war, and the shopkeeper may play down his support for Nazi ideas to excuse himself. Together, and checked against the rise from 2.6% in 1928 to 37.3% in 1932, the sources are useful but must be used with care.", explanation: "Usefulness from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the Depression with Nazi methods and the conservatives' deal."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events of the Munich Putsch of 1923.", points: [
        "8 November 1923: Hitler and the SA took over a beer hall meeting of Bavarian leaders.",
        "Supported by General Ludendorff; aimed to march on Berlin.",
        "9 November: Nazis marched through Munich; police fired; deaths on both sides.",
        "Hitler arrested, tried and sentenced to five years (served about nine months).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'The Depression was the main reason why Hitler became Chancellor in January 1933.' How far do you agree?", points: [
        ["For: before 1929 the Nazis won only 2.6%; unemployment over six million drove voters to them", 2],
        ["For: Depression broke parliamentary government (Brüning's decrees) and boosted fear of communism", 2],
        ["Against: Nazi propaganda, organisation, SA and Hitler's leadership", 2],
        ["Against: intrigue of Papen, Schleicher and Hindenburg; Nazi vote falling in November 1932", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The Depression was vital. Before 1929 the Nazis were a fringe party with 2.6% of the vote. Once unemployment rose to over six million, their vote rose to 18.3% in 1930 and 37.3% in July 1932. The Depression also broke parliamentary government: from 1930 Brüning ruled by decree, and fear of the growing Communist Party pushed business and the middle classes towards the Nazis.\n\nHowever, other parties also gained from the crisis, and the Nazis gained most because of their own methods. Goebbels' propaganda, the SA's show of strength and Hitler's image as a strong leader allowed them to appeal to many groups at once.\n\nThe final step was not caused by voters at all. The Nazi vote fell in November 1932, but Papen, seeking revenge on Schleicher, persuaded Hindenburg to appoint Hitler, believing the conservatives could control him.\n\nI largely agree. Without the Depression Hitler would never have been in a position to be considered for Chancellor, but the timing and manner of his appointment were decided by a small group of conservative politicians.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was Hitler appointed Chancellor?", "30 January 1933, by President Hindenburg.");
  b.card("FACT", "What was the Munich Putsch?", "Hitler's failed attempt to seize power in Bavaria, 8-9 November 1923.");
  b.card("DEFINITION", "SA", "The Nazi storm troopers or Brownshirts, used to protect meetings and attack opponents.");
  b.card("DEFINITION", "Lebensraum", "'Living space': the Nazi aim of conquering land in Eastern Europe.");
  b.card("FACT", "Nazi share of the vote: 1928 and July 1932?", "2.6% in 1928; 37.3% in July 1932 (largest party).");
  b.card("FACT", "What was Mein Kampf?", "Hitler's book setting out his ideas, written in prison in 1924.");
  b.card("FACT", "Who persuaded Hindenburg to appoint Hitler?", "Franz von Papen, who became Vice-Chancellor.");
  b.card("CONCEPT", "Why did the Nazis fail before 1930?", "Germany was prosperous and stable under Stresemann, so few voters supported extremists.");
  b.card("CONCEPT", "Why did the Depression help the Nazis?", "Mass unemployment and fear of communism drove voters to a party promising work and strong leadership.");
});
