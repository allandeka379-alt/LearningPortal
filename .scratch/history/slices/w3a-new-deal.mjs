// Slice W3a: the New Deal: the Hundred Days and after (0470 Depth study D4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.usa.new-deal", { file: "usa/new-deal", keyPrefix: "usa.new-deal" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did Roosevelt become President of the USA?",
    options: [
      ["March 1933", "Correct: he was inaugurated on 4 March 1933."],
      ["November 1932", "He won the election then but took office later."],
      ["October 1929", "October 1929 was the Wall Street Crash."],
      ["January 1937", "This was the start of his second term."],
    ],
    answer: "A",
    explanation: "**Roosevelt** was inaugurated on 4 March 1933.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which agency gave young unemployed men work planting trees and protecting the countryside?",
    options: [
      ["The Civilian Conservation Corps", "Correct: the CCC, set up in 1933."],
      ["The Agricultural Adjustment Administration", "The AAA paid farmers to produce less."],
      ["The National Recovery Administration", "The NRA set codes for wages and prices."],
      ["The Tennessee Valley Authority", "The TVA built dams in one region."],
    ],
    answer: "A",
    explanation: "The **CCC** employed young men in conservation work; most of their wages went to their families.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the Agricultural Adjustment Act try to help farmers?",
    options: [
      ["By paying them to produce less so prices rose", "Correct: it tackled overproduction."],
      ["By buying all their surplus crops at high prices", "This was closer to Hoover's Federal Farm Board."],
      ["By giving land to every sharecropper in the South", "Many sharecroppers lost their land instead."],
      ["By banning food imports from Europe and Canada", "The AAA worked by reducing production."],
    ],
    answer: "A",
    explanation: "The **AAA** paid farmers to cut production so that prices would rise.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main purpose of the Emergency Banking Act of March 1933?",
    options: [
      ["To reopen only sound banks with government support", "Correct: it restored confidence."],
      ["To close every bank in the country permanently", "The bank holiday was temporary."],
      ["To take all the banks into government ownership", "The banks remained privately owned."],
      ["To repay all the savings lost since the Crash", "Lost savings were not repaid by this act."],
    ],
    answer: "A",
    explanation: "Inspectors checked the banks; **sound banks** reopened with government backing.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which law of 1935 set up old-age pensions and unemployment insurance?",
    options: [
      ["The Social Security Act", "Correct: the foundation of the American welfare system."],
      ["The Wagner Act", "The Wagner Act protected trade-union rights."],
      ["The Emergency Banking Act", "That act dealt with the banks in 1933."],
      ["The Fordney-McCumber Act", "That was a tariff law of 1922."],
    ],
    answer: "A",
    explanation: "The **Social Security Act** (1935) introduced pensions and unemployment insurance.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Roosevelt use 'fireside chats' on the radio?",
    options: [
      ["To explain his policies directly and restore confidence", "Correct: the first explained the bank plan."],
      ["Because newspapers were banned from reporting politics", "The press was free."],
      ["To announce that the USA would enter the war in Europe", "The first chats were about the banks and the economy."],
      ["Because Congress had refused to pass any of his laws", "Congress passed his laws quickly."],
    ],
    answer: "A",
    hints: ["What did people need before they would trust the banks again?"],
    explanation: "The **fireside chats** let Roosevelt speak to millions directly and rebuild trust.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was a Second New Deal launched in 1935?",
    options: [
      ["The Supreme Court struck down the NIRA and unemployment stayed high", "Correct: Roosevelt shifted towards reform."],
      ["The Depression had completely ended by early 1935", "Unemployment was still very high."],
      ["Roosevelt had lost the 1934 elections to the Republicans", "The Democrats gained seats in 1934."],
      ["The First New Deal had been entirely run by private charities", "It was run by federal agencies."],
    ],
    answer: "A",
    hints: ["Think about the courts and the critics."],
    explanation: "The **Supreme Court** ruling, continuing unemployment and pressure from critics led to new laws in 1935.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which agency best shows the New Deal's aim of long-term REFORM rather than relief?",
    options: [
      ["The Social Security Act's pensions and insurance", "Correct: a permanent change to the system."],
      ["The Civil Works Administration's winter jobs", "These were temporary relief jobs."],
      ["The Federal Emergency Relief Administration", "This gave immediate relief."],
      ["The bank holiday of March 1933", "This was an emergency measure."],
    ],
    answer: "A",
    hints: ["Which still exists today?"],
    explanation: "**Social Security** permanently changed the relationship between Americans and the federal government.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Tennessee Valley Authority built dams to control floods and produce cheap electricity.",
    answer: true,
    explanation: "True. It covered parts of seven states in one of the poorest regions of the USA.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Public Works Administration (PWA) and the Works Progress Administration (WPA) were the same agency under two names.",
    answer: false,
    explanation: "False. The PWA (1933) funded large construction projects; the WPA (1935) directly employed millions on many kinds of work.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each agency or law with its work.",
    pairs: [
      ["NRA", "Codes on prices, wages and hours; the blue eagle"],
      ["TVA", "Dams and electricity in one poor region"],
      ["WPA", "Employed millions, including artists and writers"],
      ["Wagner Act", "Gave workers the right to join trade unions"],
    ],
    explanation: "NRA (1933), TVA (1933), WPA (1935), Wagner Act (1935).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure with the main aim it served.",
    pairs: [
      ["FERA grants to the states for food and shelter", "Relief"],
      ["PWA building roads, bridges and dams", "Recovery"],
      ["Social Security Act", "Reform"],
    ],
    extraRight: ["Rearmament"],
    explanation: "Relief (immediate help), recovery (restarting the economy), reform (lasting change).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Social Security Act",
      "The bank holiday",
      "Roosevelt's landslide re-election",
      "The Tennessee Valley Authority is set up",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The bank holiday came in Roosevelt's first days in office."],
    explanation: "Bank holiday (March 1933); TVA (May 1933); Social Security Act (August 1935); re-election (November 1936).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Roosevelt's informal radio talks were called {{blank:a}}. His first period of rapid law-making is known as the Hundred {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["fireside chats"], choices: ["fireside chats", "press conferences", "town meetings", "news reels"] },
      { id: "b", accepted: ["Days"], choices: ["Days", "Weeks", "Laws", "Acts"] },
    ],
    explanation: "**Fireside chats**; the **Hundred Days** (March-June 1933).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What do the letters CCC stand for?",
    accepted: ["Civilian Conservation Corps"],
    patterns: ["^civilian conservation corp?s?$"],
    wrong: ["Civil Construction Company"],
    explanation: "**Civilian Conservation Corps**, set up in March 1933.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how Roosevelt dealt with the banking crisis in March 1933.",
    points: [
      "Declared a bank holiday, closing all banks.",
      "Emergency Banking Act: government inspectors checked the banks.",
      "Only sound banks reopened, with government support.",
      "First fireside chat urged people to trust the banks; deposits exceeded withdrawals.",
    ],
    modelAnswer: "Roosevelt declared a bank holiday, closing all the banks. Congress passed the Emergency Banking Act, under which government inspectors checked each bank, and only sound banks were allowed to reopen, with government support. In his first fireside chat he explained the plan on the radio and urged people to trust the reopened banks, and when they reopened more money was deposited than withdrawn.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the alphabet agencies tackled unemployment.",
    points: [
      "Identifies direct work schemes (CCC, CWA, WPA).",
      "Explains that the government employed millions directly, giving them wages to spend.",
      "Identifies public works (PWA, TVA).",
      "Explains that building projects created jobs for contractors and boosted industries such as steel and cement.",
    ],
    hints: ["Who employed the workers?"],
    modelAnswer: "Some agencies, such as the CCC, the CWA and later the WPA, employed millions of people directly, giving them wages which they then spent, helping businesses. Others, such as the PWA and the TVA, funded large building projects such as roads, dams, schools and hospitals, which created jobs for contractors and increased demand in industries such as steel and cement.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the New Deal changed after 1933.",
    points: [
      "Identifies that the First New Deal focused on relief and recovery with business cooperation (NRA, AAA).",
      "Explains that it aimed to raise prices and restore confidence quickly.",
      "Identifies the Supreme Court ruling (1935) and continuing unemployment / critics.",
      "Explains that these forced Roosevelt to find new approaches.",
      "Identifies the Second New Deal's emphasis on reform and social justice (WPA, Wagner Act, Social Security, higher taxes on the rich).",
      "Explains that it created lasting welfare and workers' rights rather than emergency measures.",
    ],
    hints: ["Compare 1933 with 1935."],
    modelAnswer: "In 1933-34 the First New Deal concentrated on relief and recovery: saving the banks, raising farm prices through the AAA and working with business through the NRA's codes. By 1935 unemployment was still very high, critics on both sides were attacking Roosevelt, and in May the Supreme Court struck down the NIRA. Roosevelt responded with the Second New Deal, which put more emphasis on reform and social justice: the WPA employed millions directly, the Wagner Act protected trade unions, the Social Security Act introduced pensions and unemployment insurance, and taxes on the rich were raised. The New Deal moved from emergency measures towards lasting changes in the role of government.",
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter from a fictional young man in a CCC camp in Oregon to his mother in Ohio, 1934", "We planted four thousand trees this week and built a footbridge over the creek. The food is plain but there is plenty. The camp sends twenty-five dollars home to you each month, so tell Pa he can stop worrying about the rent. For the first time since the bank closed, I feel useful.")}\n\n${source("Source B", "a cartoon of the kind published in an American business newspaper in 1934, described in words", "A businessman labelled \"Free Enterprise\" sits tied to a chair while a crowd of small clerks, each wearing a hat with three letters on it, pile paperwork and rulebooks on top of him. In the background a smiling President waves to a cheering crowd.", { described: true })}`,
    hints: ["Think about who produced each source and who it served."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the CCC?", points: [
        "It gave young men useful work and food.",
        "It helped families through wages sent home / restored self-respect.",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of Source B? Explain your answer.", points: [
        "The alphabet agencies are tying up business with regulation.",
        "Details: the clerks' three-letter hats represent the agencies; rulebooks smother 'Free Enterprise'.",
        "The President is popular but harming business.",
        "Context: business critics of the NRA and federal power.",
      ], explanation: "Message with explanation from details and context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Why do Sources A and B give such different views of the New Deal?", points: [
        "A: from a young man helped by the CCC, personal benefit.",
        "B: from a business newspaper, hostile to regulation and higher taxes.",
        "Different aspects: relief schemes (A) against regulation of business (B).",
        "Own knowledge: CCC employed about three million; NRA codes resented by business, struck down in 1935.",
        "Both are partly valid: the New Deal helped some and burdened others.",
        "Supported explanation.",
      ], levels: levels(6), modelAnswer: "The sources differ because their authors were affected by the New Deal in different ways. Source A comes from a young man in the CCC, who had gained work, food and self-respect, and whose family received wages sent home; my knowledge shows that about three million young men served in the CCC. Source B comes from a business newspaper, whose readers resented the rules of the NRA codes, new taxes and the growing power of the federal government, shown by the clerks with three-letter hats burying 'Free Enterprise'. They also deal with different parts of the New Deal: A with relief, B with regulation. Both reflect real experiences: the New Deal helped many of the unemployed but angered many business leaders, whose complaints helped lead to the Supreme Court striking down the NIRA in 1935.", explanation: "Explain difference from provenance and content." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the TVA with other agencies."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the work of the Tennessee Valley Authority.", points: [
        "Set up in May 1933 for the Tennessee Valley, a poor region across seven states.",
        "Built a series of dams on the Tennessee River and its tributaries.",
        "Controlled flooding and produced cheap hydroelectric power.",
        "Created jobs; taught farmers soil conservation; brought electricity to farms.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "'The most important part of the New Deal was the creation of jobs.' How far do you agree?", points: [
        ["For: CCC, CWA, PWA and WPA employed millions, giving wages and hope", 2],
        ["For: public works built lasting infrastructure (TVA, roads, schools)", 2],
        ["Other: saving the banks and restoring confidence (Emergency Banking Act, fireside chats)", 2],
        ["Other: Social Security and the Wagner Act changed the system permanently", 2],
        ["Other: farm support (AAA), with limits; unemployment stayed high, so jobs alone did not end the Depression", 2],
        ["Supported judgement", 2],
      ], levels: levels(12), modelAnswer: "Creating jobs was very important. The CCC, the CWA and later the WPA employed millions of people directly, giving them wages to spend and restoring their self-respect, while the PWA and the TVA built roads, schools, hospitals and dams that lasted for decades.\n\nHowever, other parts of the New Deal were also vital. Saving the banks in March 1933, through the bank holiday, the Emergency Banking Act and the fireside chats, restored confidence and stopped the collapse; without this, recovery could not begin. The AAA raised farm incomes, although it hurt many sharecroppers. In the long term, the Social Security Act and the Wagner Act were perhaps more important still, because they permanently changed the role of the federal government and the rights of workers.\n\nJob creation was the most visible part of the New Deal and gave relief to millions, but unemployment remained high throughout the 1930s. Saving the banking system was the most important short-term achievement, and the reforms of 1935 had the greatest long-term importance.", explanation: "Levels: several aspects weighed with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did Roosevelt take office?", "4 March 1933.");
  b.card("DEFINITION", "The three Rs of the New Deal", "Relief, recovery and reform.");
  b.card("DEFINITION", "Fireside chats", "Roosevelt's informal radio talks explaining his policies.");
  b.card("FACT", "What did the CCC do?", "Gave young unemployed men conservation work in the countryside; wages sent home.");
  b.card("FACT", "What did the AAA do?", "Paid farmers to produce less so prices would rise (1933).");
  b.card("FACT", "What was the TVA?", "Tennessee Valley Authority (1933): dams for flood control, cheap electricity and jobs in a poor region.");
  b.card("FACT", "What did the NIRA create?", "The NRA (codes on wages, prices and hours) and the PWA (public works); struck down in 1935.");
  b.card("CONCEPT", "What was the Second New Deal?", "The 1935 laws stressing reform: WPA, Wagner Act, Social Security Act and higher taxes on the rich.");
  b.card("FACT", "What did the Social Security Act (1935) introduce?", "Old-age pensions, unemployment insurance and help for disabled people and poor children.");
});
