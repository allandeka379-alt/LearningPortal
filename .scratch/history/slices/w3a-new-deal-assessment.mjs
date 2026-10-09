// Slice W3a: opposition to the New Deal and its success (0470 Depth study D4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.usa.new-deal-assessment", { file: "usa/new-deal-assessment", keyPrefix: "usa.new-deal-assessment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which senator from Louisiana led the 'Share Our Wealth' campaign?",
    options: [
      ["Huey Long", "Correct: assassinated in September 1935."],
      ["Charles Coughlin", "Coughlin was a Catholic priest with a radio audience."],
      ["Francis Townsend", "Townsend campaigned for old-age pensions."],
      ["Herbert Hoover", "Hoover was the former Republican President."],
    ],
    answer: "A",
    explanation: "**Huey Long** demanded heavy taxes on the rich and guaranteed incomes.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which New Deal law did the Supreme Court strike down in May 1935?",
    options: [
      ["The National Industrial Recovery Act", "Correct: the NRA codes ended."],
      ["The Social Security Act of that August", "The Social Security Act was later upheld by the Court."],
      ["The Twenty-first Amendment ending Prohibition", "Constitutional amendments are not struck down by the Court."],
      ["The Emergency Banking Act of March 1933", "This act was not struck down."],
    ],
    answer: "A",
    explanation: "The Court ruled the **NIRA** unconstitutional in May 1935; the AAA followed in January 1936.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did many business leaders oppose the New Deal?",
    options: [
      ["They disliked regulation, higher taxes and support for unions", "Correct: they saw it as a threat to free enterprise."],
      ["They thought it did far too little to help the poor and jobless", "This was the view of radical critics such as Huey Long."],
      ["They wanted the government to own and run all their factories", "Business leaders wanted less government control, not more."],
      ["They believed Prohibition should be brought back across the USA", "This was not the reason for their opposition."],
    ],
    answer: "A",
    explanation: "Business disliked **regulation**, taxes and the Wagner Act's support for trade unions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What caused the recession that began in 1937?",
    options: [
      ["Roosevelt cut government spending to balance the budget", "Correct: and credit was tightened."],
      ["The USA entered the Second World War in Europe that year", "The USA entered the war in December 1941."],
      ["The Supreme Court closed every bank in the United States", "The Court did not close banks."],
      ["Congress raised the tariff on all imports to new record levels", "This was not the cause of the 1937 recession."],
    ],
    answer: "A",
    explanation: "Believing recovery was secure, Roosevelt **cut spending**; demand fell and unemployment rose again.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the American Liberty League?",
    options: [
      ["An organisation of wealthy opponents of the New Deal", "Correct: founded in 1934."],
      ["A New Deal agency that gave jobs to young men in camps", "That was the CCC."],
      ["A campaign led by Townsend for pensions for the elderly", "Townsend's movement was separate."],
      ["A trade union protected by the Wagner Act of 1935", "The League was hostile to the New Deal's support for unions."],
    ],
    answer: "A",
    explanation: "The **Liberty League** (1934) campaigned against the New Deal as a threat to freedom and property.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was Roosevelt's court-packing plan of 1937 widely criticised?",
    options: [
      ["It seemed to attack the independence of the courts", "Correct: even many Democrats opposed it."],
      ["It proposed to abolish the Supreme Court and replace it entirely", "It proposed adding judges, not abolishing the Court."],
      ["It would have cut the salaries of every federal judge in half", "Pay was not the issue."],
      ["It allowed the states to ignore every decision the Court made", "This was not part of the plan."],
    ],
    answer: "A",
    hints: ["Why would adding friendly judges worry people?"],
    explanation: "Adding judges who agreed with him looked like an attempt to **control the Court**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which group was most often treated unequally by New Deal programmes?",
    options: [
      ["Black Americans", "Correct: segregated agencies and lower pay were common."],
      ["Bank depositors", "Deposit insurance protected them from 1933."],
      ["Large landowners", "The AAA paid them to cut production."],
      ["Young white men", "The CCC was designed for them."],
    ],
    answer: "A",
    hints: ["Think about the AAA and the southern states."],
    explanation: "Many **Black Americans** were hurt by the AAA, segregated in agencies or paid less.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the New Deal failed to bring recovery?",
    options: [
      ["Unemployment rose again to about one in five in 1938", "Correct: recovery depended on government spending."],
      ["The banks reopened and confidence returned in 1933", "This supports success."],
      ["The Social Security Act introduced old-age pensions", "This shows reform rather than failure."],
      ["Roosevelt won all but two states in the 1936 election", "This shows popularity, not economic failure."],
    ],
    answer: "A",
    hints: ["Which option is about the economy?"],
    explanation: "The **1937-38 recession** showed that the recovery was fragile and incomplete.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Congress rejected Roosevelt's plan to add new judges to the Supreme Court.",
    answer: true,
    explanation: "True: in 1937. But the Court then began to accept New Deal laws.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Mass unemployment in the USA ended in 1934 as a result of the Hundred Days.",
    answer: false,
    explanation: "False. Unemployment stayed high through the 1930s and fell to low levels only with war production from 1940-41.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each critic with their criticism of the New Deal.",
    pairs: [
      ["Huey Long", "Share Our Wealth: heavy taxes on the rich"],
      ["Francis Townsend", "Generous pensions for everyone over 60"],
      ["The Liberty League", "Too much government power over business"],
      ["The Supreme Court", "Some New Deal laws were unconstitutional"],
    ],
    explanation: "Long and Townsend wanted more; the Liberty League wanted less; the Court ruled on constitutionality.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Huey Long is assassinated",
      "The American Liberty League is founded",
      "The court-packing plan is defeated",
      "The Supreme Court strikes down the AAA",
    ],
    right: POS,
    rightIndex: [1, 0, 3, 2],
    hints: ["Long died a few months after the NIRA ruling."],
    explanation: "Liberty League (1934); Long assassinated (September 1935); AAA struck down (January 1936); court plan defeated (1937).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Catholic priest who attacked Roosevelt in radio broadcasts was Father {{blank:a}}. Mass unemployment ended only when the USA began producing weapons for the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Coughlin"], choices: ["Coughlin", "Townsend", "Long", "Darrow"] },
      { id: "b", accepted: ["Second World War"], choices: ["Second World War", "First World War", "Korean War", "Cold War"] },
    ],
    explanation: "Father **Coughlin**; war production for the **Second World War** ended mass unemployment.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the senator who led the 'Share Our Wealth' movement.",
    accepted: ["Huey Long", "Long", "Huey P. Long", "Huey P Long", "Senator Long"],
    wrong: ["Coughlin"],
    explanation: "**Huey Long** of Louisiana.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the conflict between Roosevelt and the Supreme Court.",
    points: [
      "Conservative judges, appointed by earlier presidents.",
      "Struck down the NIRA (May 1935) and the AAA (January 1936).",
      "Roosevelt's plan (1937) to add up to six judges was rejected by Congress.",
      "From 1937 the Court accepted New Deal laws (Wagner Act, Social Security); retirements let Roosevelt appoint new judges.",
    ],
    modelAnswer: "The Supreme Court was dominated by conservative judges appointed by earlier presidents. It struck down the NIRA in May 1935 and the AAA in January 1936. After his re-election Roosevelt proposed adding up to six new judges, but Congress rejected this court-packing plan in 1937. However, from 1937 the Court began to accept New Deal laws such as the Wagner Act and the Social Security Act, and retirements allowed Roosevelt to appoint new judges.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why some critics said the New Deal did not go far enough.",
    points: [
      "Identifies the persistence of poverty and unemployment.",
      "Explains that millions were still jobless and the rich kept most of the wealth.",
      "Identifies named critics' alternatives (Long's Share Our Wealth, Townsend's pensions, socialists).",
      "Explains that they wanted redistribution of wealth or pensions, and saw the New Deal as saving capitalism instead of changing it.",
    ],
    hints: ["What did Long and Townsend want instead?"],
    modelAnswer: "Critics on the left pointed out that millions were still unemployed and that the rich still held most of the nation's wealth. Huey Long wanted to tax the very rich heavily and guarantee every family an income, Dr Townsend wanted generous pensions for everyone over 60, and socialists argued that the New Deal had only rescued capitalism instead of replacing it.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why unemployment remained high in the 1930s despite the New Deal.",
    points: [
      "Identifies that government spending was too small for the scale of the depression.",
      "Explains that work schemes could not employ all of the millions out of work.",
      "Identifies the spending cuts of 1937 and the recession.",
      "Explains that unemployment rose again to about one in five by 1938.",
      "Identifies low business confidence / temporary jobs / weak world economy.",
      "Explains that private firms would not invest while fearing taxes and regulation, and exports stayed low.",
    ],
    hints: ["Spending, confidence and the world economy."],
    modelAnswer: "Government spending, though large by earlier standards, was too small for the size of the depression, and the work schemes could not employ all the millions who were jobless; many of their jobs were temporary. In 1937 Roosevelt cut spending to balance the budget and credit was tightened, causing a recession in which unemployment rose again to roughly one in five by 1938. Business confidence also stayed low, since many firms feared regulation and higher taxes and so held back investment, and the depressed world economy kept exports down.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a speech by a fictional Republican businessman to a dinner of manufacturers during Roosevelt's first term", "Every week a new agency, a new tax, a new rule. Washington tells the farmer what to plant and the factory what to pay. Our grandfathers built this country without asking permission from a clerk in the capital. This is not recovery; it is the road to a planned economy.")}\n\n${source("Source B", "a letter from a fictional Black sharecropper in Mississippi to a federal official, 1935", "The government pays the landlord to plough under the cotton, and he keeps the money and puts us off the land. My family has worked this farm for twenty years. They say this New Deal is for the forgotten man. Sir, we are still forgotten.")}`,
    hints: ["Do the writers criticise the New Deal for the same reason?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the main criticism of the New Deal in Source A?", points: [
        "Too much government interference / regulation and taxes.",
        "Threatens free enterprise and self-reliance (leading to a planned economy).",
      ], explanation: "Criticism supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How do the criticisms in Sources A and B differ?", points: [
        "A: the New Deal does too much (government power).",
        "B: the New Deal does too little for the poor / helps landlords, not tenants.",
        "B refers to a specific agency's effect (the AAA).",
        "Different positions: a wealthy businessman and a poor Black sharecropper.",
      ], explanation: "Specific differences explained." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that the New Deal was unsuccessful? Use your own knowledge.", points: [
        "A: opinion of an opponent with an interest in low taxes; does not prove failure.",
        "B: own knowledge confirms AAA payments led to evictions of sharecroppers.",
        "Own knowledge of failures: unemployment high; 1937-38 recession; unequal treatment.",
        "Own knowledge of successes not in the sources: banks saved, relief, Social Security, TVA.",
        "Provenance weighed.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A comes from a Republican businessman speaking to manufacturers, who had an interest in lower taxes and less regulation; it shows opposition to the New Deal, but it is opinion and does not prove that it failed. Source B is stronger evidence of failure for one group: my own knowledge confirms that AAA payments to landowners led many sharecroppers, often Black families, to lose their land. Other evidence also points to failure: unemployment stayed high, and rose again in the 1937-38 recession. However, the sources leave out the New Deal's successes: the banks were saved, millions received relief and work, the TVA brought electricity to a poor region, and the Social Security Act introduced pensions. The sources show that the New Deal was unsuccessful for some groups and unpopular with business, but not that it failed overall.", explanation: "Use sources, provenance and own knowledge on both sides." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge relief, recovery and reform separately."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the opposition to the New Deal from the rich and from business.", points: [
        "Objected to higher taxes (Revenue Act 1935).",
        "Disliked regulation (NRA codes) and support for unions (Wagner Act).",
        "TVA seen as unfair competition with private power companies.",
        "American Liberty League (1934); claims the New Deal was socialist / a threat to freedom.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How successful was the New Deal in dealing with the problems of the Depression?", points: [
        ["Success: confidence restored; banks saved; deposit insurance", 2],
        ["Success: relief and work for millions; lasting reforms (Social Security, Wagner Act, TVA)", 2],
        ["Failure: unemployment stayed high; recession of 1937-38; war production needed", 2],
        ["Failure: unequal treatment of Black Americans, women, farm workers", 2],
        ["Supported judgement by aim", 2],
      ], levels: levels(10), modelAnswer: "The New Deal was successful in several ways. It saved the banking system in 1933 and restored confidence, and deposit insurance meant bank failures became rare. Millions of people received relief or work through FERA, the CCC and the WPA, and the TVA, the Social Security Act and the Wagner Act made lasting changes to American life. The USA also kept its democracy at a time when the Depression helped extremists to power elsewhere.\n\nHowever, the New Deal did not bring full recovery. Unemployment fell from about a quarter of the workforce to about one in seven by 1937, but when Roosevelt cut spending the 1937-38 recession pushed it back up to roughly one in five. Mass unemployment ended only with war production. Many Black Americans, women and farm workers were treated unequally or left out.\n\nThe New Deal was successful in relief and reform, but only partly successful in recovery, which was its most urgent aim.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "What was 'Share Our Wealth'?", "Huey Long's campaign for heavy taxes on the rich and guaranteed incomes for families.");
  b.card("FACT", "Which New Deal laws did the Supreme Court strike down?", "The NIRA (May 1935) and the AAA (January 1936).");
  b.card("DEFINITION", "Court-packing plan", "Roosevelt's 1937 proposal to add up to six Supreme Court judges; rejected by Congress.");
  b.card("FACT", "What was the American Liberty League?", "A group of wealthy opponents of the New Deal, founded in 1934.");
  b.card("CONCEPT", "What caused the recession of 1937-38?", "Roosevelt cut spending to balance the budget and credit was tightened, so demand fell.");
  b.card("CONCEPT", "Why did business oppose the New Deal?", "Regulation, higher taxes, support for unions and competition from agencies such as the TVA.");
  b.card("CONCEPT", "Name two groups treated unequally by the New Deal.", "Black Americans (AAA evictions, segregation, lower pay) and women (lower pay, CCC for men only).");
  b.card("CONCEPT", "In which of the three Rs was the New Deal least successful?", "Recovery: unemployment stayed high until war production began.");
  b.card("FACT", "Who was Dr Francis Townsend?", "Campaigner for generous pensions for everyone over 60; helped push Roosevelt towards Social Security.");
});
