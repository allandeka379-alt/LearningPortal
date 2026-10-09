// Slice W3a: the Wall Street Crash, the Depression and the 1932 election (0470 Depth study D3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.usa.crash-1932", { file: "usa/crash-1932", keyPrefix: "usa.crash-1932" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which date was 'Black Tuesday', the worst day of the Wall Street Crash?",
    options: [
      ["29 October 1929", "Correct: about 16 million shares were sold."],
      ["24 October 1929", "This was 'Black Thursday', when panic selling began."],
      ["4 March 1933", "This was the day Roosevelt became President."],
      ["11 November 1918", "This was the armistice ending the First World War."],
    ],
    answer: "A",
    explanation: "**Black Tuesday**, 29 October 1929, saw prices collapse.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was President of the USA when the Wall Street Crash happened?",
    options: [
      ["Herbert Hoover", "Correct: President from March 1929 to March 1933."],
      ["Calvin Coolidge", "Coolidge left office in March 1929, before the Crash."],
      ["Franklin D. Roosevelt", "Roosevelt took office in March 1933."],
      ["Woodrow Wilson", "Wilson was President during the First World War."],
    ],
    answer: "A",
    explanation: "**Hoover** had been President for only seven months when the Crash came.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was meant by 'buying on the margin'?",
    options: [
      ["Paying part of a share's price and borrowing the rest", "Correct: a loan to be repaid from the profit."],
      ["Buying shares only in the smallest, newest companies", "This is not what the phrase means."],
      ["Buying goods in instalments under a hire-purchase deal", "This is hire purchase, used for consumer goods."],
      ["Buying government bonds that paid a fixed rate of interest", "This is not buying on the margin."],
    ],
    answer: "A",
    explanation: "Investors paid a small part of the price and **borrowed** the rest, so a fall in prices could ruin them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was a 'Hooverville'?",
    options: [
      ["A shanty town of homeless people", "Correct: named mockingly after the President."],
      ["A dam built on the Colorado River in the 1930s", "That was the Hoover Dam."],
      ["A government relief office for the unemployed", "Hoover refused direct federal relief."],
      ["A new suburb built for workers in the car industry", "Suburbs grew in the boom, not the Depression."],
    ],
    answer: "A",
    explanation: "**Hoovervilles** were shanty towns of scrap materials built by the homeless.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What did the Reconstruction Finance Corporation (1932) do?",
    options: [
      ["It lent money to banks, railways and large businesses", "Correct: Hoover's main recovery measure."],
      ["It paid unemployment benefit directly to every jobless worker", "Hoover refused direct federal relief."],
      ["It ended Prohibition and taxed alcohol again", "Prohibition was repealed in December 1933."],
      ["It bought shares to stop the Crash on Black Tuesday", "Bankers bought shares in October 1929; the RFC came in 1932."],
    ],
    answer: "A",
    explanation: "The **RFC** lent money to banks and big businesses, hoping the benefits would reach ordinary people.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did bank failures make the Depression worse?",
    options: [
      ["Savings were lost, so people and firms spent and invested less", "Correct: demand fell further."],
      ["Banks gave all their money to the government in 1930", "No such transfer happened."],
      ["Failed banks were taken over by foreign governments", "This did not happen."],
      ["Closed banks forced share prices to rise far too quickly", "Bank failures came with falling, not rising, prices."],
    ],
    answer: "A",
    hints: ["What happens to spending when savings disappear?"],
    explanation: "Lost savings and the end of lending cut **spending and investment**, deepening the slump.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did Hoover mean by 'rugged individualism'?",
    options: [
      ["People should solve problems by their own efforts", "Correct: so he opposed direct federal relief."],
      ["The government should own all major industries", "Hoover strongly opposed this."],
      ["Each state should leave the Union if it wished", "This was not his meaning."],
      ["Workers should form unions to fight for higher wages", "This was not what he meant by the phrase."],
    ],
    answer: "A",
    hints: ["Think about why Hoover refused direct help to the unemployed."],
    explanation: "Hoover believed that **self-reliance** made Americans strong and that federal handouts would weaken it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which event most damaged Hoover's reputation in the summer of 1932?",
    options: [
      ["Troops driving the Bonus Army out of Washington", "Correct: veterans were attacked with tear gas."],
      ["The opening of the Reconstruction Finance Corporation", "This was an attempt to help recovery."],
      ["Black Thursday on the New York Stock Exchange", "This happened in October 1929."],
      ["The repeal of Prohibition by the Twenty-first Amendment", "Repeal came in December 1933."],
    ],
    answer: "A",
    hints: ["Who were the veterans, and what happened to them?"],
    explanation: "The violent clearing of the **Bonus Army** camp made Hoover look cruel to suffering veterans.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Roosevelt defeated Hoover by a landslide in the presidential election of November 1932.",
    answer: true,
    explanation: "True. He carried 42 of the 48 states.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hoover took no action at all to deal with the Depression.",
    answer: false,
    explanation: "False. He set up the Reconstruction Finance Corporation, supported public works and persuaded businesses to keep wages up, but he refused direct federal relief.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Speculation", "Buying in order to sell quickly at a profit"],
      ["Black Thursday", "The day panic selling began"],
      ["Bonus Army", "Veterans who marched to Washington demanding early payment"],
      ["Hawley-Smoot Tariff", "A 1930 increase in taxes on imports"],
    ],
    explanation: "Speculation (cause), Black Thursday (24 October 1929), Bonus Army (summer 1932), Hawley-Smoot Tariff (1930).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Bonus Army is driven out of Washington",
      "Black Tuesday on Wall Street",
      "Roosevelt takes office as President",
      "The Hawley-Smoot Tariff",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The tariff came the year after the Crash."],
    explanation: "Black Tuesday (October 1929); Hawley-Smoot Tariff (1930); Bonus Army (July 1932); Roosevelt takes office (March 1933).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Democratic candidate in 1932 promised Americans a {{blank:a}}. At its worst, about {{blank:b}} of American workers were unemployed.",
    blanks: [
      { id: "a", accepted: ["New Deal"], choices: ["New Deal", "Fair Deal", "Square Deal", "Great Society"] },
      { id: "b", accepted: ["a quarter"], choices: ["a quarter", "a tenth", "a half", "three-quarters"] },
    ],
    explanation: "Roosevelt promised a **New Deal**; unemployment reached about **a quarter** of the workforce.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which city is Wall Street, the centre of the American stock market?",
    accepted: ["New York", "New York City", "NYC"],
    wrong: ["Washington"],
    explanation: "The Stock Exchange is on Wall Street in **New York**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the social effects of the Depression in the USA.",
    points: [
      "Mass unemployment: about a quarter of the workforce at its worst.",
      "Evictions and homelessness; Hoovervilles.",
      "Breadlines and soup kitchens; charities overwhelmed.",
      "People travelling in search of work / minorities hit first / farmers lost land.",
    ],
    modelAnswer: "Unemployment rose to about a quarter of the workforce. Families who could not pay their rent or mortgage were evicted, and homeless people built shanty towns called Hoovervilles. Breadlines and soup kitchens fed the hungry, but charities could not cope. Many people travelled the country looking for work, and Black and Mexican Americans were often the first to lose their jobs.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why speculation made the stock market unstable by 1929.",
    points: [
      "Identifies that share prices rose above the real value of companies.",
      "Explains that people bought to resell rather than for profits, so prices depended on confidence alone.",
      "Identifies buying on the margin / borrowed money.",
      "Explains that when prices fell, borrowers had to sell to repay loans, turning a fall into a collapse.",
    ],
    hints: ["What held prices up, and what happened when it stopped?"],
    modelAnswer: "Speculators bought shares to sell them at a higher price, not for the companies' profits, so prices rose far above the real value of the companies and depended only on confidence that they would keep rising. Many had bought on the margin with borrowed money, so when prices began to fall they were forced to sell to repay their loans, which pushed prices down further and turned a fall into a collapse.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Roosevelt won the 1932 presidential election.",
    points: [
      "Identifies that Hoover was blamed for the Depression.",
      "Explains that unemployment and bank failures happened under him and his measures seemed too little.",
      "Identifies Hoover's beliefs / the Bonus Army.",
      "Explains that rugged individualism and the attack on veterans made him seem uncaring.",
      "Identifies Roosevelt's promise of a New Deal and his personality.",
      "Explains that he promised action (relief, public works, ending Prohibition) and his confidence and record in New York gave hope.",
    ],
    hints: ["Why voters turned against one man and towards the other."],
    modelAnswer: "Voters blamed Hoover for the Depression: unemployment and bank failures had happened while he was President, and his measures, such as the Reconstruction Finance Corporation, seemed too little and too late. His belief in rugged individualism and his refusal of direct relief made him seem uncaring, and the clearing of the Bonus Army in July 1932 confirmed this. Roosevelt, by contrast, promised a New Deal of government action, including relief, public works and the end of Prohibition. His confidence, energy and record as Governor of New York, where he had organised relief, gave people hope.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an article in a fictional American business magazine, September 1929", "Never in history has so much wealth been within reach of so many. The shoeshine boy and the stenographer hold shares alongside the banker. There may be days of nervousness, but the foundations of American prosperity are sound, and those who sell now will regret it.")}\n\n${source("Source B", "a description in words of a photograph of the kind taken in an American city during the Depression", "A long line of men in worn coats and hats stands along a city street outside a building with a sign reading \"Free soup, coffee and bread\". Behind them, a large advertisement painted on a wall shows a smiling family in a car with the slogan \"There's no way like the American way\".", { described: true })}`,
    hints: ["Think about the date of each source."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about the stock market in 1929?", points: [
        "Ordinary people, not only the rich, were buying shares (speculation was widespread).",
        "Confidence was high; there was little fear of a crash.",
      ], explanation: "Two inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why does the photograph in Source B show such a different picture from Source A?", points: [
        "B dates from the Depression years, after the Crash.",
        "Unemployment and poverty: men queue for free food.",
        "Contrast with the advertisement shows the promises of the boom had failed.",
        "A was written before the Crash by a business magazine with an interest in confidence.",
      ], explanation: "Explain the difference using dates and purpose." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for explaining why the Crash happened?", points: [
        "A: useful evidence of overconfidence and mass speculation before the Crash.",
        "A: a business magazine with an interest in keeping confidence; claims 'sound foundations' were wrong.",
        "B: shows effects, not causes, of the Crash.",
        "Own knowledge: margin buying, overproduction, inequality, weak banks not mentioned.",
        "Own knowledge: confirms speculation by ordinary people.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful for explaining the Crash because it shows the overconfidence and mass speculation of 1929: ordinary people such as shoeshine boys held shares, and the writer urges readers not to sell. As a business magazine it had an interest in keeping confidence high, and its claim that the foundations were sound was wrong, which is itself evidence of the blindness to risk. But it says nothing about buying on the margin, overproduction, inequality or weak banks, which my own knowledge shows were also causes. Source B shows the effects of the Crash, unemployment and hunger in 1932, not its causes, so it is much less useful for this question. Source A is useful but incomplete, and Source B is of little use for causes.", explanation: "Usefulness for the specific question asked." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh speculation against weaknesses in the wider economy."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how Hoover responded to the Depression.", points: [
        "Believed in rugged individualism; refused direct federal relief.",
        "Voluntary agreements with business to keep up wages and investment.",
        "Public works (for example the dam on the Colorado River); Federal Farm Board.",
        "Reconstruction Finance Corporation (1932) lent to banks and businesses; Hawley-Smoot Tariff (1930).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far was speculation responsible for the Wall Street Crash?", points: [
        ["For: speculation pushed share prices far above real values", 2],
        ["For: buying on the margin turned falling prices into forced selling and panic", 2],
        ["Against: overproduction and inequality meant profits could not keep rising", 2],
        ["Against: weak, unregulated banks; foreign tariffs; farm depression", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Speculation was the immediate cause of the Crash. By 1929 millions of Americans were buying shares to resell at a profit, so prices rose far above the real value of the companies. Many had bought on the margin, and when prices started to fall in October 1929 they were forced to sell to repay their loans, turning a fall into the panic of Black Thursday and Black Tuesday.\n\nHowever, prices began to fall because the economy beneath them was weakening. Overproduction meant that factories were making more goods than people could buy, and inequality meant that demand could not keep growing. Farmers had been in depression all decade, foreign tariffs blocked exports, and thousands of weak banks had lent heavily to speculators.\n\nSpeculation was responsible for the scale and speed of the Crash, but not for its underlying cause. Without the weaknesses in the economy, confidence would not have collapsed; without speculation, the fall would have been far less dramatic.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When were Black Thursday and Black Tuesday?", "24 and 29 October 1929.");
  b.card("DEFINITION", "Speculation", "Buying shares to sell them quickly at a higher price.");
  b.card("DEFINITION", "Buying on the margin", "Paying part of a share's price and borrowing the rest.");
  b.card("DEFINITION", "Hooverville", "A shanty town built by homeless people during the Depression.");
  b.card("DEFINITION", "Rugged individualism", "Hoover's belief that people should solve their problems by their own efforts, without federal relief.");
  b.card("FACT", "What was the Bonus Army?", "First World War veterans who marched to Washington in 1932 and were driven out by troops in July.");
  b.card("FACT", "What was the Reconstruction Finance Corporation?", "Hoover's agency (1932) lending money to banks, railways and large businesses.");
  b.card("CONCEPT", "How did the Crash lead to the Depression?", "Lost savings and bank failures cut spending; firms cut output and jobs, so demand fell further.");
  b.card("CONCEPT", "Why did Roosevelt win in 1932?", "Hoover was blamed for the Depression and seemed uncaring; Roosevelt promised a New Deal and gave hope.");
});
