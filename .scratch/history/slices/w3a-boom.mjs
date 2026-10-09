// Slice W3a: the US economic boom of the 1920s (0470 Depth study D1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.usa.boom", { file: "usa/boom", keyPrefix: "usa.boom" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which industry was most important to the boom of the 1920s?",
    options: [
      ["The motor car industry", "Correct: it also boosted steel, rubber, glass and oil."],
      ["The coal mining industry", "Coal declined as oil, gas and electricity replaced it."],
      ["The cotton textile industry", "Textiles struggled with competition and low prices."],
      ["The railway building industry", "Railways lost traffic to cars and lorries."],
    ],
    answer: "A",
    explanation: "The **motor car** industry drove the boom and created many linked industries.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which political party held the presidency throughout the 1920s?",
    options: [
      ["The Republicans", "Correct: Harding, Coolidge and Hoover."],
      ["The Democrats", "The Democrat Roosevelt won only in 1932."],
      ["The Progressives", "No Progressive won the presidency in the 1920s."],
      ["The Socialists", "Socialist candidates won very few votes."],
    ],
    answer: "A",
    explanation: "Three **Republican** presidents (Harding, Coolidge, Hoover) followed laissez-faire policies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main effect of the Fordney-McCumber Tariff of 1922?",
    options: [
      ["Imported goods became dearer than American goods", "Correct: it protected American industry."],
      ["Income taxes on the rich were greatly increased", "Mellon cut income taxes."],
      ["Farmers were paid by the government to produce less food", "This was a New Deal measure (the AAA, 1933)."],
      ["Banks were placed under strict federal control", "Banking was lightly regulated in the 1920s."],
    ],
    answer: "A",
    explanation: "The tariff taxed **imports**, so American goods were cheaper in American shops.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did hire purchase contribute to the boom?",
    options: [
      ["It let people buy goods now and pay in instalments", "Correct: so demand for consumer goods rose."],
      ["It made all goods cheaper by removing taxes", "Hire purchase is a form of credit, not a tax cut."],
      ["It allowed the government to buy surplus goods", "The government did not buy surpluses in the 1920s."],
      ["It stopped ordinary people from buying shares on credit", "Many people bought shares on credit too."],
    ],
    answer: "A",
    explanation: "**Hire purchase** let families buy cars and appliances before they had saved the full price, raising demand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did American farmers suffer in the 1920s?",
    options: [
      ["Overproduction caused prices to fall", "Correct: and European demand dropped after the war."],
      ["Most farmland was destroyed during the war", "No fighting took place on American soil."],
      ["The government banned the use of tractors", "Tractors were widely used and increased output."],
      ["Farmers were forced to join trade unions", "This was not a cause of their problems."],
    ],
    answer: "A",
    explanation: "Farmers produced more than they could sell: **overproduction** pushed prices and incomes down.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the coal industry not share in the boom?",
    options: [
      ["Oil, gas and electricity were replacing coal", "Correct: demand for coal fell."],
      ["Coal mines were nationalised by the government", "There was no nationalisation; this was laissez-faire."],
      ["Imports of foreign coal were made tax-free", "Tariffs protected American industry."],
      ["Car factories refused to use any steel", "Car factories used large amounts of steel."],
    ],
    answer: "A",
    hints: ["What new sources of energy were spreading?"],
    explanation: "Coal faced **competition** from new fuels, so demand, wages and jobs fell.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did Andrew Mellon believe about cutting taxes for the rich?",
    options: [
      ["They would invest the money and create jobs", "Correct: the idea behind his tax cuts."],
      ["They would give the money to the poor", "This was not his argument."],
      ["The government needed less money for the war", "The war had ended in 1918; this was not his reason."],
      ["It would reduce American exports abroad", "He argued tax cuts would help the economy grow."],
    ],
    answer: "A",
    hints: ["Think about how the rich might use extra money."],
    explanation: "**Mellon** argued that lower taxes would encourage investment and growth.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which was a weakness of the American economy by the late 1920s?",
    options: [
      ["Many people could not afford the goods being made", "Correct: inequality limited demand."],
      ["Factories could not produce enough to meet demand", "The problem was overproduction, not shortage."],
      ["Banks were too tightly controlled to lend money", "Banks were weakly regulated and lent freely."],
      ["Taxes on the rich were far too high to allow investment", "Mellon had cut taxes on the rich."],
    ],
    answer: "A",
    hints: ["Who could buy a second car or radio?"],
    explanation: "With wealth so **unequal**, demand could not keep up with production.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Henry Ford introduced the moving assembly line in 1913 to make the Model T.",
    answer: true,
    explanation: "True. Mass production cut the time and cost of building each car.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Most Black Americans gained a great deal from the boom of the 1920s.",
    answer: false,
    explanation: "False. Most lived in the South as poorly paid farm workers or sharecroppers, and those who moved north usually got the lowest-paid jobs.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Laissez-faire", "Government interferes as little as possible in business"],
      ["Tariff", "A tax on imported goods"],
      ["Hire purchase", "Buying goods with a deposit and paying the rest in instalments"],
      ["Overproduction", "Making more goods than people want or can afford to buy"],
    ],
    explanation: "These four terms explain both the boom and its weaknesses.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each industry with how it fared in the 1920s.",
    pairs: [
      ["Motor cars", "Boomed through mass production"],
      ["Coal", "Declined as other fuels replaced it"],
      ["Railways", "Lost traffic to cars and lorries"],
      ["Electrical goods", "Boomed as homes were connected to electricity"],
    ],
    hints: ["Old industries struggled; new ones grew."],
    explanation: "New industries (cars, electrical goods) boomed; older ones (coal, railways, textiles) declined.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Fordney-McCumber Tariff",
      "Ford's moving assembly line",
      "The Wall Street Crash",
      "Coolidge becomes President",
    ],
    right: POS,
    rightIndex: [1, 0, 3, 2],
    hints: ["The assembly line came before the war."],
    explanation: "Assembly line (1913); tariff (1922); Coolidge (1923); Crash (1929).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Secretary of the Treasury who cut income taxes was {{blank:a}}. The Republican who became President when Harding died in office was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Andrew Mellon"], choices: ["Andrew Mellon", "Henry Ford", "Herbert Hoover", "Al Capone"] },
      { id: "b", accepted: ["Calvin Coolidge"], choices: ["Calvin Coolidge", "Woodrow Wilson", "Franklin Roosevelt", "Abraham Lincoln"] },
    ],
    explanation: "**Mellon** cut taxes; **Coolidge** took over on Harding's death in 1923 and was President until 1929.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the car maker who introduced the moving assembly line for the Model T.",
    accepted: ["Ford", "Henry Ford", "Ford Motor Company"],
    wrong: ["General Motors"],
    explanation: "**Henry Ford** introduced the moving assembly line in 1913.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the government policies that helped the US economy to boom in the 1920s.",
    points: [
      "Laissez-faire: few regulations on business.",
      "Low taxes, especially Mellon's cuts for the rich.",
      "High tariffs, such as the Fordney-McCumber Tariff (1922).",
      "Effect explained: protected American industry / encouraged investment and spending.",
    ],
    modelAnswer: "The Republican governments followed laissez-faire, placing few regulations on business. Andrew Mellon cut income taxes, especially for the rich, to encourage investment. The Fordney-McCumber Tariff of 1922 put high taxes on imported goods, which protected American industries from foreign competition and encouraged Americans to buy American goods.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the motor car industry was important to the boom.",
    points: [
      "Identifies mass production making cars affordable.",
      "Explains that the assembly line cut costs and prices, so millions of families bought cars.",
      "Identifies linked industries (steel, rubber, glass, oil, roads).",
      "Explains that demand from the car industry created jobs and spending across the economy (garages, suburbs).",
    ],
    hints: ["Think about the industries a car needs."],
    modelAnswer: "Mass production on Ford's assembly line cut the cost of making cars, so prices fell and millions of ordinary families could buy one. The car industry also boosted many others: it needed steel, rubber, glass and oil, and it created demand for roads, garages and suburbs, so it spread jobs and spending across the whole economy.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why agriculture did not share in the prosperity of the 1920s.",
    points: [
      "Identifies the fall in European demand after the war.",
      "Explains that farmers had expanded and borrowed during the war, and were left with debts when demand fell.",
      "Identifies overproduction / mechanisation.",
      "Explains that tractors and new methods increased output, pushing prices down.",
      "Identifies foreign tariffs in retaliation.",
      "Explains that other countries taxed American goods, so farmers could not sell their surpluses abroad.",
    ],
    hints: ["Demand, supply and foreign markets."],
    modelAnswer: "During the war European demand for American food was high, so farmers borrowed to buy land and machinery. After 1918 European farming recovered and demand fell, leaving farmers with debts. At the same time tractors and new methods increased output, causing overproduction, and prices fell. Other countries also put tariffs on American goods in retaliation for American tariffs, so farmers could not sell their surpluses abroad. Farm incomes fell and many farmers lost their land.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an advertisement of the kind published in American magazines in 1927, described in words", "A smiling family stands beside a shiny new car outside a neat suburban house. Through the window a woman can be seen using an electric vacuum cleaner. The caption reads: \"Why wait? A small deposit puts the good life on your driveway today.\"", { described: true })}\n\n${source("Source B", "a letter from a fictional Kansas farmer to his brother in Chicago, 1927", "Wheat fetches half what it did in the war, and the bank wants its money for the tractor. They tell me the country has never been richer. Maybe so in Chicago. Out here we patch our boots and pray for rain.")}`,
    hints: ["Who produced each source, and for what purpose?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about the reasons for the boom?", points: [
        "Credit / hire purchase made goods affordable (small deposit).",
        "Advertising and new consumer goods (car, vacuum cleaner, suburbs) drove demand.",
      ], explanation: "Two inferences from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B challenge the impression given by Source A?", points: [
        "A suggests prosperity for ordinary families.",
        "B shows farmers suffering from low prices and debt.",
        "B accepts that some places (Chicago) were rich, so does not reject A entirely.",
        "Judgement: B shows the boom was uneven.",
      ], explanation: "Compare specific details." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for a historian studying how far Americans benefited from the boom?", points: [
        "A: an advertisement, designed to sell, so it shows an ideal, not typical lives.",
        "A useful for methods of selling (credit, advertising) and the goods available.",
        "B: a private letter, one farmer's experience; little reason to exaggerate to his brother.",
        "Own knowledge: farm prices fell, overproduction, debt; confirms B.",
        "Own knowledge: other groups left out (Black Americans, old industries).",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is an advertisement, so its purpose was to sell cars and appliances by showing an ideal family; it does not show how typical such lives were. It is useful, however, for showing how the boom worked, through new consumer goods, advertising and buying with a small deposit. Source B is a private letter, with little reason to exaggerate, and it shows that farmers faced low prices and debt; my own knowledge confirms that overproduction and the fall in European demand hit farmers hard throughout the 1920s. Neither source mentions other groups who missed out, such as Black Americans and workers in coal and textiles. Together they are useful because they show both sides of the boom, but a historian would need more evidence to judge how many Americans benefited.", explanation: "Provenance, content and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), set the motor car against government policy and credit."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the weaknesses in the American economy by the late 1920s.", points: [
        "Overproduction: more goods than people could buy.",
        "Unequal distribution of wealth limited demand.",
        "Foreign tariffs made it hard to export surpluses.",
        "Debt, speculation on credit and weak, poorly regulated banks.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "'The motor car was the main reason for the boom of the 1920s.' How far do you agree?", points: [
        ["For: mass production made cars cheap; millions sold", 2],
        ["For: linked industries (steel, rubber, glass, oil, roads, suburbs)", 2],
        ["Other: government policies (laissez-faire, low taxes, tariffs)", 2],
        ["Other: credit, hire purchase and advertising; electrical consumer goods", 2],
        ["Other: wartime advantages and natural resources; confidence and the stock market", 2],
        ["Supported judgement", 2],
      ], levels: levels(12), modelAnswer: "The motor car was very important. Ford's assembly line cut costs so much that ordinary families could buy a car, and millions did. Cars also created demand in other industries, such as steel, rubber, glass and oil, and led to road-building, garages and the growth of suburbs, so the car spread jobs across the economy.\n\nHowever, other factors were also essential. The war had left the USA with strong industries and new markets, and it had vast natural resources. Republican governments helped business through laissez-faire, Mellon's tax cuts and the Fordney-McCumber Tariff. Electricity created demand for radios, refrigerators and other consumer goods, and hire purchase and advertising allowed people to buy them. Rising share prices increased confidence.\n\nThe car was the single most important industry, but it could not have boomed without credit to buy cars, government policies that favoured business and the wartime advantages that gave the USA its start. It was the main engine of the boom, but not its only cause.", explanation: "Levels: several factors weighed with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Laissez-faire", "Government interfering as little as possible in the economy, as under the Republicans in the 1920s.");
  b.card("DEFINITION", "Hire purchase", "Buying goods with a deposit and paying the rest, with interest, in instalments.");
  b.card("DEFINITION", "Overproduction", "Making more goods than people want or can afford, so prices fall.");
  b.card("FACT", "What was the Fordney-McCumber Tariff?", "A 1922 law putting high taxes on imports to protect American industry.");
  b.card("FACT", "Who were the Republican presidents of 1921-1933?", "Harding (1921-23), Coolidge (1923-29), Hoover (1929-33).");
  b.card("CONCEPT", "Why was the motor car central to the boom?", "Mass production made cars cheap, and they boosted steel, rubber, glass, oil, roads and suburbs.");
  b.card("CONCEPT", "Why did farmers not share in the boom?", "Overproduction, falling European demand, foreign tariffs and wartime debts drove prices and incomes down.");
  b.card("CONCEPT", "Which older industries declined in the 1920s?", "Coal (new fuels), textiles (new fibres, competition) and railways (cars and lorries).");
  b.card("CONCEPT", "Name three weaknesses of the economy by 1929.", "Overproduction, unequal wealth, foreign tariffs, debt and weak banks (any three).");
});
