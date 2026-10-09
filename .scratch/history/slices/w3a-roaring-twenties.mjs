// Slice W3a: the Roaring Twenties: society, culture, women and Prohibition (0470 Depth study D2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.usa.roaring-twenties", { file: "usa/roaring-twenties", keyPrefix: "usa.roaring-twenties" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Prohibition come into force in the USA?",
    options: [
      ["1920", "Correct: in January 1920."],
      ["1917", "1917 was the year the USA entered the First World War."],
      ["1929", "1929 was the year of the Wall Street Crash."],
      ["1933", "1933 was the year Prohibition was repealed."],
    ],
    answer: "A",
    explanation: "The Eighteenth Amendment and the Volstead Act brought **Prohibition** into force in January 1920.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which gangster controlled much of Chicago's illegal alcohol trade?",
    options: [
      ["Al Capone", "Correct: jailed for tax evasion in 1931."],
      ["Babe Ruth", "Babe Ruth was a baseball star."],
      ["Charlie Chaplin", "Chaplin was a film star."],
      ["Louis Armstrong", "Armstrong was a jazz musician."],
    ],
    answer: "A",
    explanation: "**Al Capone** made a fortune from bootlegging, gambling and other rackets in Chicago.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was a speakeasy?",
    options: [
      ["An illegal bar that sold alcohol", "Correct: thousands opened during Prohibition."],
      ["A radio programme of news and music", "Radio stations broadcast news and music, but they were not speakeasies."],
      ["A cinema showing the first talking films", "The first talking feature was The Jazz Singer, 1927."],
      ["A meeting of the Anti-Saloon League", "The League campaigned for Prohibition."],
    ],
    answer: "A",
    explanation: "**Speakeasies** were illegal drinking places; customers had to speak quietly to get in.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these was a reason for introducing Prohibition?",
    options: [
      ["Temperance groups blamed alcohol for crime and poverty", "Correct: the Anti-Saloon League and others."],
      ["The government wanted to increase taxes on beer", "Prohibition ended the tax on legal alcohol."],
      ["Gangsters demanded a ban to increase their profits", "Gangsters profited, but they did not bring in the ban."],
      ["The Wall Street Crash had ruined the American brewing industry", "The Crash came nine years later, in 1929."],
    ],
    answer: "A",
    explanation: "**Temperance** campaigners blamed drink for crime, poverty and violence in the home.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What did the Nineteenth Amendment of 1920 do?",
    options: [
      ["It gave women the right to vote", "Correct: in all elections across the country."],
      ["It banned the sale of alcohol", "That was the Eighteenth Amendment."],
      ["It ended Prohibition", "That was the Twenty-first Amendment, 1933."],
      ["It limited immigration from Europe", "Immigration was limited by acts of 1921 and 1924."],
    ],
    answer: "A",
    explanation: "The **Nineteenth Amendment** (August 1920) gave women the vote.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was Prohibition so difficult to enforce?",
    options: [
      ["Millions still wanted to drink and there were few agents", "Correct: and many officials were bribed."],
      ["The law allowed alcohol to be sold in bars", "The law banned its sale."],
      ["Most Americans had never drunk alcohol", "Demand for alcohol remained high."],
      ["Canada and Mexico also banned the sale of alcohol at the same time", "Alcohol was smuggled across both borders."],
    ],
    answer: "A",
    hints: ["Think about demand and the number of people enforcing the law."],
    explanation: "Continued **demand**, long borders, too few agents and widespread corruption made enforcement almost impossible.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Depression help bring about the repeal of Prohibition?",
    options: [
      ["Legal alcohol would create jobs and tax revenue", "Correct: both badly needed after 1929."],
      ["Gangsters had all been jailed by 1930", "Organised crime continued into the 1930s."],
      ["Farmers stopped growing grain during the Depression", "Grain was in surplus, not short supply."],
      ["The Supreme Court had already declared it illegal", "Repeal came through the Twenty-first Amendment."],
    ],
    answer: "A",
    hints: ["What did the government and the unemployed need after 1929?"],
    explanation: "Repeal promised **jobs** in brewing and **tax** income for the government.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that women's lives changed only a little in the 1920s?",
    options: [
      ["Most married women still did not work outside the home", "Correct: traditional roles remained strong."],
      ["Women gained the vote in 1920", "This supports change."],
      ["Flappers smoked and danced in public", "This supports change, at least for some."],
      ["More women worked as typists, secretaries and telephonists", "This supports change in work."],
    ],
    answer: "A",
    hints: ["Which option shows continuity rather than change?"],
    explanation: "That most **married women** stayed at home shows how limited change was.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Al Capone was jailed in 1931 for not paying income tax.",
    answer: true,
    explanation: "True. Evidence of his other crimes could not be proved in court.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Jazz was created mainly by white musicians in Hollywood.",
    answer: false,
    explanation: "False. Jazz grew from Black American communities, especially in New Orleans, before spreading to Chicago and New York.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with what they were famous for in the 1920s.",
    pairs: [
      ["Louis Armstrong", "Jazz trumpeter and singer"],
      ["Babe Ruth", "Baseball star"],
      ["Charlie Chaplin", "Film comedian"],
      ["Al Capone", "Chicago gangster"],
    ],
    explanation: "Armstrong (jazz), Ruth (baseball), Chaplin (cinema), Capone (organised crime).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The St Valentine's Day Massacre",
      "Prohibition comes into force",
      "Prohibition is repealed",
      "The Jazz Singer is released",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The massacre came in the last year of the decade."],
    explanation: "Prohibition (1920); The Jazz Singer (1927); St Valentine's Day Massacre (1929); repeal (1933).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A young woman who wore short skirts, cut her hair short and danced in public was called a {{blank:a}}. A person who smuggled or sold alcohol illegally was called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["flapper"], choices: ["flapper", "suffragette", "speakeasy", "temperance"] },
      { id: "b", accepted: ["bootlegger"], choices: ["bootlegger", "moonshiner", "flapper", "carpetbagger"] },
    ],
    explanation: "**Flappers** challenged old rules; **bootleggers** supplied illegal alcohol.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the 1927 film that introduced synchronised talking scenes.",
    accepted: ["The Jazz Singer", "Jazz Singer"],
    wrong: ["Gone with the Wind"],
    explanation: "***The Jazz Singer*** (1927) ended the era of silent films.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the main features of the 'Roaring Twenties'.",
    points: [
      "Jazz music and new dances such as the Charleston.",
      "Cinema: Hollywood stars; talking films from 1927.",
      "Radio and mass-circulation newspapers and magazines.",
      "Spectator sport (Babe Ruth, Jack Dempsey) / flappers / cars and leisure.",
    ],
    modelAnswer: "Jazz music spread from New Orleans to the cities, with new dances such as the Charleston. Millions went to the cinema each week to see Hollywood stars, and talking films began with The Jazz Singer in 1927. Radio spread quickly, carrying music, news and sport. Sport became big business, with heroes such as Babe Ruth, and young women known as flappers challenged traditional rules.",
    explanation: "One mark per accurate feature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Prohibition led to the growth of organised crime.",
    points: [
      "Identifies continued demand for alcohol.",
      "Explains that only criminals could supply it, so profits were huge.",
      "Identifies competition between gangs / bribery.",
      "Explains that gangs fought for control of markets and bribed police and politicians, growing more powerful (Capone, St Valentine's Day Massacre).",
    ],
    hints: ["Who supplied alcohol once it was illegal?"],
    modelAnswer: "Millions of Americans still wanted to drink, but only criminals could supply alcohol, so gangsters made huge profits from bootlegging and speakeasies. Gangs competed violently to control markets, as in the St Valentine's Day Massacre, and used their wealth to bribe police, judges and politicians, which made organised crime more powerful than before.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Prohibition was repealed in 1933.",
    points: [
      "Identifies failure to stop drinking.",
      "Explains that speakeasies, moonshine and smuggling meant people drank anyway, so the law was ignored.",
      "Identifies crime and corruption.",
      "Explains that gangsters grew rich and powerful and officials were bribed, causing loss of respect for the law.",
      "Identifies the Depression.",
      "Explains that legal alcohol would create jobs and tax revenue; Roosevelt promised repeal in 1932.",
    ],
    hints: ["Failure, side effects and the economy."],
    modelAnswer: "Prohibition failed to stop drinking: speakeasies, home-made moonshine and smuggling from Canada meant that people drank anyway, and the law was widely ignored. Worse, it increased crime and corruption: gangsters such as Capone became rich and powerful, and police and politicians were bribed, so many Americans lost respect for the law. Finally, the Depression after 1929 made repeal attractive, because legal brewing would create jobs and the government could tax alcohol again. Roosevelt promised repeal in 1932, and the Twenty-first Amendment ended Prohibition in December 1933.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in American magazines in the mid-1920s, described in words", "An elderly woman in a long black dress and bonnet stares in horror at a young woman with bobbed hair, a short dress and a cigarette, who is stepping into a sports car beside a young man. The caption reads: \"Whatever would your grandmother say?\"", { described: true })}\n\n${source("Source B", "the memoir of a fictional farmer's wife from Iowa, published in 1960", "People talk about the twenties as if we all danced the Charleston. On our farm I rose at five, fed the hens, cooked for the hired men and sewed by lamplight; we had no electricity until 1938. I read about flappers in the magazine, the way you read about film stars.")}`,
    hints: ["Whose lives does each source describe?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about changes for women in the 1920s?", points: [
        "Young women had new freedoms (fashion, smoking, cars, going out with men).",
        "These changes shocked older, traditional people.",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B disagree with Source A?", points: [
        "A suggests women's lives changed dramatically.",
        "B shows a rural woman's life barely changed (no electricity, hard work).",
        "B agrees flappers existed but saw them as distant, like film stars.",
        "Judgement: they describe different groups, so the disagreement is partial.",
      ], explanation: "Specific points with a judgement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that women's lives changed in the 1920s? Use your own knowledge.", points: [
        "A shows change for some young, urban women.",
        "B shows continuity for rural women.",
        "Provenance: A is a cartoon, exaggerates for humour; B is a memoir written decades later, one person's memory.",
        "Own knowledge for change: the vote 1920, new jobs, consumer goods.",
        "Own knowledge for continuity: unequal pay, few in professions, most married women at home; Black and immigrant women.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A suggests a dramatic change, with a young woman smoking, wearing a short dress and driving off with a young man, to her grandmother's horror. But it is a cartoon, exaggerating for humour, and it shows only young urban women. Source B, a farmer's wife's memoir, shows that rural life hardly changed: she worked long hours without electricity and knew of flappers only from magazines. It was written decades later and is one person's memory, but it fits my knowledge that change was greatest in the cities. Women did gain the vote in 1920 and many found new jobs as typists and telephonists, but pay was unequal, few entered the professions and most married women stayed at home. The sources show that women's lives changed for some groups, especially young urban women, but much less for most.", explanation: "Use both sources, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh organised crime against other reasons for failure."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how Americans got hold of alcohol during Prohibition.", points: [
        "Speakeasies: illegal bars.",
        "Bootleggers smuggled alcohol from Canada, Mexico and by sea.",
        "Home-made 'moonshine' (sometimes poisonous).",
        "Gangs organised supply; officials bribed to look away.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'Organised crime was the main reason why Prohibition failed.' How far do you agree?", points: [
        ["For: gangs such as Capone's supplied alcohol on a huge scale", 2],
        ["For: violence and bribery made the law unenforceable", 2],
        ["Against: millions of ordinary Americans wanted to drink; demand created the market", 2],
        ["Against: too few agents, long borders, corruption among officials; the Depression made repeal attractive", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Organised crime was very important. Gangsters such as Al Capone supplied alcohol on a huge scale through bootlegging and speakeasies, and their violence, such as the St Valentine's Day Massacre, and their bribery of police and politicians made the law impossible to enforce in cities like Chicago.\n\nHowever, gangsters existed only because ordinary Americans wanted to drink. Millions of people visited speakeasies or made their own moonshine, so the demand was there before the gangs. The government also employed only a few thousand agents to police long borders with Canada and Mexico, and many officials were corrupt. After 1929 the Depression added economic reasons for repeal.\n\nOrganised crime made Prohibition's failure obvious and dangerous, but the main reason it failed was that so many Americans refused to obey it. Without that demand, there would have been no profits for the gangsters.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did Prohibition begin and end?", "January 1920 to December 1933.");
  b.card("DEFINITION", "Flapper", "Young 1920s woman with short hair and skirts who smoked, drank and danced in public.");
  b.card("DEFINITION", "Speakeasy", "An illegal bar selling alcohol during Prohibition.");
  b.card("DEFINITION", "Bootlegger", "A person who made, smuggled or sold alcohol illegally.");
  b.card("FACT", "When did American women gain the vote?", "1920 (Nineteenth Amendment).");
  b.card("FACT", "What was the St Valentine's Day Massacre?", "The killing of seven men linked to a rival gang in a Chicago garage on 14 February 1929.");
  b.card("CONCEPT", "Why was Prohibition introduced?", "Temperance campaigns, Protestant religious views and wartime feeling against German brewers and wasting grain.");
  b.card("CONCEPT", "Why was Prohibition repealed?", "It failed to stop drinking, increased crime and corruption, and the Depression made jobs and taxes from alcohol attractive.");
  b.card("CONCEPT", "How far did women's lives change in the 1920s?", "The vote, new jobs and freedoms for young urban women; little change in pay, the professions or rural life.");
});
