// W1a: research methods (ZIMSEC only): primary/secondary data, techniques, sampling, reliability and validity.
import { concept, P, chk, fmt } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.tools.research-methods", { file: "tools/research-methods", keyPrefix: "tools.research-methods" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Which of the following is an example of **primary** data?",
    explanation: "Primary data is collected first-hand for the investigation. The other sources were gathered earlier by someone else." },
    ["Answers collected by the researcher in her own questionnaire", "Correct: she collected them herself for her own purpose."],
    [["Figures copied from a statistical office report", "This is secondary data: someone else collected it earlier."],
     ["Sales totals published in a company's annual report", "Published company figures are secondary data for an outside researcher."],
     ["A table taken from an old newspaper article", "Newspapers report data collected by others: secondary."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A researcher wants to know why traders in a market prefer to be paid by mobile money. Which technique is **most** suitable for finding reasons in detail?",
    explanation: "Detailed reasons need open, flexible questions; a face-to-face interview allows explanation and follow-up questions." },
    ["A structured interview with open questions", "Correct: it allows reasons to be explored and the interviewer can probe."],
    [["A count of how many traders enter the market each hour", "Counting is observation and records behaviour, not reasons."],
     ["A table of national mobile money totals from the central bank", "Secondary totals cannot show why individual traders choose it."],
     ["An experiment that changes the price of a stall", "Changing prices would not reveal reasons for a payment preference."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "What is the main weakness of a postal questionnaire?",
    explanation: "Few people may return it, and those who do may be unlike the rest of the sample, so the results may be biased." },
    ["A low response rate that may make the sample unrepresentative", "Correct: non-response is the typical weakness of postal surveys."],
    [["The interviewer may influence the answers given", "No interviewer is present in a postal questionnaire."],
     ["The researcher cannot reach people who live far away", "A postal questionnaire can reach distant people more cheaply than a visit can."],
     ["The answers are always secondary data for the researcher", "The answers are collected first-hand, so they are primary data."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which question is a **leading** question?",
    explanation: "A leading question suggests the answer the researcher expects, so it biases the results." },
    ["\"Do you agree that the unfair price rise should be stopped?\"", "Correct: the word 'unfair' pushes the respondent towards agreeing."],
    [["\"How many times did you buy bread last week?\"", "This is a neutral question asking for a number."],
     ["\"Which brand of cooking oil do you usually buy?\"", "This is neutral and open to any brand."],
     ["\"Do you own a mobile phone?\"", "A neutral closed question."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which sample reflects the sizes of the groups?", "Think of strata."],
    stem: "A researcher divides the households of a fictional town into three suburbs and chooses a number from each suburb in proportion to its size. Which sampling method is this?",
    explanation: "Dividing the population into groups and sampling each in proportion to its size is stratified sampling. Quota sampling also uses groups but the interviewer chooses whom to ask." },
    ["Stratified sampling", "Correct: groups are sampled in proportion to their size."],
    [["Systematic sampling", "Systematic sampling picks every kth member of one list."],
     ["Simple random sampling", "Random sampling does not divide the population into groups first."],
     ["Convenience sampling", "Convenience sampling takes whoever is easiest to reach, with no groups or proportions."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Compare what each finding says about consistency and accuracy."],
    stem: "A scale in a shop always weighs maize meal 2 kg too heavy, but gives the same reading each time the same bag is weighed. The readings are",
    explanation: "Repeating the measurement gives the same result (reliable), but it does not measure the true mass (not valid)." },
    ["reliable but not valid", "Correct: consistent, but wrong."],
    [["valid but not reliable", "Valid means accurate; these readings are consistently inaccurate."],
     ["both reliable and valid", "They are reliable, but the 2 kg error means they are not valid."],
     ["neither reliable nor valid", "They are consistent, so they are reliable."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which data was already collected by someone else?"],
    stem: "A student uses the data published by the national statistics office to study household spending, and also interviews ten families herself. How should her data be described?",
    explanation: "Published figures are secondary; her interview answers are primary. She uses both." },
    ["Secondary data from the statistics office and primary data from the interviews", "Correct: she uses both kinds."],
    [["Primary data from the statistics office and secondary data from the interviews", "This reverses the types."],
     ["Only primary data, because she has used both sources herself", "Using a source herself does not make published data primary."],
     ["Only secondary data, because the interviews took place later", "First-hand interview answers are primary whenever they are collected."]]);

  {
    const N = 1800, n = 60, k = N / n;
    chk(k, 30);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: k, daily: true, unit: "units",
      stem: "A researcher wants a systematic sample of 60 from a list of 1,800 households in a fictional town. She will choose every *k*th household. What is *k*?",
      wrong: [N * n, N - n],
      explanation: `The interval is the population divided by the sample size: ${fmt(N)} ÷ ${n} = ${k}. Choose a random starting household from 1 to ${k}, then every ${k}th one. Multiplying (${fmt(N * n)}) or subtracting (${fmt(N - n)}) does not give the interval.` });
  }
  {
    const N = [600, 540, 360], tot = 1500, n = 100;
    const B = (N[1] / tot) * n;
    chk(B, 36);
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: B, unit: "units", hints: ["Find the sampling fraction first."],
      stem: "A fictional town has 1,500 households: 600 in suburb A, 540 in suburb B and 360 in suburb C. A stratified sample of 100 households is to be taken, with each suburb sampled in proportion to its size. How many households must be sampled in suburb B?",
      wrong: [40, 24],
      explanation: `1. Sampling fraction: 100 ÷ 1,500 = 1/15 (about 6.7%).\n2. Suburb B: 540 × 100 ÷ 1,500 = **${B}** households.\n\n40 is the sample for suburb A and 24 the sample for suburb C.` });
  }
  {
    const sent = 250, back = 70, r = (back / sent) * 100;
    chk(r, 28);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: r, dp: 1, unit: "%",
      stem: "A fictional survey posts 250 questionnaires and 70 are returned completed. Calculate the response rate as a percentage.",
      wrong: [250 - 70, (70 / 180) * 100],
      explanation: `Response rate = returned ÷ sent × 100 = 70 ÷ 250 × 100 = ${fmt(r, 1)}%. ${250 - 70} is the number not returned; dividing by 180 uses the wrong base.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A pilot study tests a questionnaire on a small group before the main survey.", answer: true,
    explanation: "True. A pilot study reveals unclear or biased questions so they can be corrected before the full survey." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A larger sample always gives a more representative result, whichever way it is chosen.", answer: false,
    explanation: "False. A large sample chosen in a biased way (for example only people at one shopping centre) is still unrepresentative." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each sampling method to its description.",
    pairs: [
      ["Random", "Every member of the population has an equal chance of selection"],
      ["Systematic", "Every kth member of a list is selected after a random start"],
      ["Stratified", "Groups are sampled in proportion to their size in the population"],
      ["Quota", "The interviewer fills a fixed number of people of each type"],
    ],
    explanation: "Random: equal chance. Systematic: regular interval. Stratified: proportional groups. Quota: fixed numbers per type chosen by the interviewer." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct terms.",
    template: "Data that already exists, collected by others, is called {{blank:a}} data. The whole group a researcher wants to learn about is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["secondary"], choices: ["primary", "secondary", "sample"] },
      { id: "b", accepted: ["population"], choices: ["sample", "population", "stratum"] },
    ],
    wrong: [["primary", "sample"]],
    explanation: "Existing data is secondary. The whole group is the population; the part studied is the sample." });

  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of sampling in which every member of the population has an equal chance of being chosen.",
    accepted: ["random sampling", "random", "simple random sampling", "simple random"],
    wrong: ["quota"],
    explanation: "Random (simple random) sampling gives each member an equal chance of selection, for example by drawing names from a hat." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between primary data and secondary data.",
    points: ["Primary data is collected first-hand by the researcher for the purpose of the investigation.", "Secondary data already exists, collected by someone else for another purpose."],
    modelAnswer: "Primary data is gathered directly by the researcher for the current investigation, for example through a questionnaire. Secondary data was collected earlier by others, for example census reports.",
    explanation: "A definition of each, with the key difference: who collected the data and for what purpose." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["One advantage and one disadvantage, each explained."],
    stem: "Explain **one** advantage and **one** disadvantage of using interviews rather than postal questionnaires.",
    points: ["Advantage stated (for example detailed answers or the interviewer can explain questions).", "Disadvantage stated (for example costly, slow or interviewer bias).", "At least one point is explained in context, for example few people can be reached so the sample may be small."],
    modelAnswer: "An interview lets the interviewer explain difficult terms and ask follow-up questions, which gives fuller and more accurate answers. However, interviews are costly and slow, so only a small sample can be reached and the interviewer may influence the replies.",
    explanation: "Credit a stated advantage, a stated disadvantage and development of either." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Why might a non-random sample differ from the population?"],
    stem: "A researcher studying household spending in a fictional city interviews only people she meets at one large shopping centre. Analyse **two** problems with this method of sampling.",
    points: ["Problem 1 identified: only people who shop there are included, so the sample is unrepresentative.", "Problem 1 explained: other groups (such as the poorest households or those in other suburbs) are missed so results are biased.", "Problem 2 identified: shoppers are not chosen randomly (the researcher chooses whom to approach).", "Problem 2 explained: researcher bias or convenience means results cannot be generalised to the whole city."],
    modelAnswer: "First, the sample covers only people who use that shopping centre, so households who shop elsewhere or cannot afford to shop there are missed and the results will not represent the whole city. Second, the researcher chooses whom to approach, so she may favour certain types of people, which adds bias and means the findings cannot safely be applied to all households.",
    explanation: "Convenience sampling is biased: unrepresentative coverage and researcher selection." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, stem: "Explain why a pilot study is useful before a large survey.",
    points: ["It tests the questions on a small group.", "Unclear, leading or confusing questions are found and corrected, saving time and improving reliability."],
    modelAnswer: "A pilot tests the questionnaire on a few people first, so unclear or leading questions can be corrected before the full survey, which improves the quality of the results and avoids wasted cost.",
    explanation: "Credit the trial and the improvement it allows." });

  // Structured 1: postal survey.
  {
    const sent = 300, back = 87, r = (back / sent) * 100;
    chk(r, 29);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Response rate = returned ÷ sent × 100.", "Who might not reply?"],
      stem: "A fictional bus company in Zandia wants to know whether lower fares would make people travel more. It posts 300 questionnaires to randomly chosen households and 87 are returned. Two questions were: \"Do you agree that the company's very high fares are a scandal?\" and \"How many bus journeys did you make last week?\"",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: r, dp: 0, unit: "%", stem: "Calculate the response rate, to the nearest whole number.",
          wrong: [300 - 87, (87 / 213) * 100],
          explanation: `87 ÷ 300 × 100 = ${r}%.` }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which question is a leading question?",
          options: [["The first question, because 'scandal' suggests the answer", "Correct: the wording pushes people towards agreeing."], ["The second question, because it asks for a number", "A request for a number is neutral."], ["Neither question", "The first question is leading."], ["Both questions", "Only the first one is leading."]],
          answer: "A", explanation: "The first question uses emotive words ('very high', 'scandal')." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain **one** reason why the 29% response rate may make the results unreliable.",
          points: ["Most households (71%) did not reply, so the sample is small and may differ from the population.", "Those who reply may be people with strong views, so the results are biased and may not be repeated."],
          modelAnswer: "Only 29% replied, so most of the sample is missing. Those who did reply may feel strongly about fares, so the results would be biased and a repeat survey could give different answers." }),
        P.manual({ label: "(d)", marks: 3, stem: "Suggest **three** ways the company could improve the quality of its research.",
          points: ["Reword the leading question in a neutral way.", "Pilot the questionnaire or follow up non-respondents / use interviews to raise the response rate.", "Increase the sample size or use a stratified sample covering all groups."],
          modelAnswer: "It should use neutral wording, pilot the questions, remind non-respondents or conduct short interviews to raise the response rate, and use a stratified sample so that all types of household are represented." }),
      ],
      explanation: "Response rate 29%; first question leading; non-response threatens validity; improve wording, response and sampling." });
  }

  // Structured 2: stratified sample of market traders.
  {
    const strata = [["stalls selling food", 450], ["stalls selling clothes", 300], ["stalls selling hardware", 150]];
    const tot = 900, n = 90;
    const alloc = strata.map(([, s]) => (s / tot) * n);
    chk(alloc[0], 45); chk(alloc[1], 30); chk(alloc[2], 15);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Sampling fraction = sample ÷ population.", "Use proportions."],
      stem: "A researcher plans to find out how traders at a fictional market in Masvingo feel about a new stall fee. The market has 900 stalls: 450 selling food, 300 selling clothes and 150 selling hardware. She will interview 90 traders using a stratified sample, with the stalls grouped by what they sell.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: alloc[1], unit: "units", stem: "Calculate how many clothes traders must be interviewed.",
          wrong: [45, 90 / 3],
          explanation: "Sampling fraction 90 ÷ 900 = 0.1. Clothes traders: 300 × 0.1 = 30." }),
        P.fib({ label: "(b)", marks: 2, stem: "Complete the sentence.", template: "The 900 stalls are the {{blank:a}}, and the 90 traders interviewed are the {{blank:b}}.",
          blanks: [{ id: "a", accepted: ["population"], choices: ["population", "sample", "stratum"] }, { id: "b", accepted: ["sample"], choices: ["population", "sample", "stratum"] }],
          explanation: "The whole group is the population; those interviewed are the sample." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** advantage of a stratified sample compared with a simple random sample here.",
          points: ["Every type of stall is guaranteed to be represented.", "The numbers from each group are proportional to its size.", "So results are less likely to be biased towards one group (for example a random sample might happen to contain few hardware sellers)."],
          modelAnswer: "A stratified sample guarantees that food, clothes and hardware sellers appear in proportion to their numbers. A simple random sample might by chance include very few hardware traders, so their views could be missed and the results biased." }),
        P.manual({ label: "(d)", marks: 3, stem: "Discuss whether interviews or a questionnaire handed out at the stalls would be better for this research.",
          points: ["Interviews: detailed answers and explanations, higher response; but slower and costlier.", "Questionnaire: cheaper and quicker to reach many traders; but low response, misunderstanding and less detail.", "A justified judgement (for example short interviews, since 90 is a small sample and reasons matter)."],
          modelAnswer: "Interviews give fuller answers and let the researcher explain the fee and ask why, and with only 90 traders they are manageable, although they take longer. A questionnaire is cheaper but many traders may not complete it. On balance short interviews are better because the sample is small and reasons matter." }),
      ],
      explanation: "Sampling fraction 10%: 45, 30 and 15; population and sample defined; stratified sampling represents all groups." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider cost, time, accuracy and type of information.", "End with a judgement."],
    stem: "A government department wants to find out how many households in Zimbabwe's rural districts have a regular source of income. Evaluate whether it should collect primary data by survey or rely on secondary data.",
    points: ["Survey gives up-to-date information designed for the exact question.", "Survey can be targeted at rural households and cover the exact definition of 'regular income'.", "A survey is costly and slow, especially across scattered districts.", "Secondary data is quick and cheap (for example earlier censuses).", "Secondary data may be out of date or defined differently.", "Quality of secondary data cannot be checked.", "Sampling or non-response may limit the survey's validity.", "A justified conclusion (for example use secondary data to plan, then survey a stratified sample to fill gaps)."],
    levels: LV8,
    modelAnswer: "A primary survey would give current information on exactly the question asked, such as how many households have regular income, and it can be designed with a clear definition and a stratified sample covering every district. However, travelling to scattered rural households is costly and slow, and low response or an unrepresentative sample could reduce validity. Secondary data such as earlier census results is quick and cheap, but it may be out of date, collected for a different purpose and with a different definition, and its quality cannot be checked. Because policy decisions need accurate current figures, the department should use secondary data to design the study and identify gaps, then run a carefully sampled survey. The extra cost is justified when the data will guide spending on many households.",
    wordLimit: { min: 100, max: 300 },
    explanation: "A balanced evaluation compares cost, time, accuracy and fit, then judges." });

  b.card("DEFINITION", "Define **primary data**.", "Information collected first-hand by the researcher for the purpose of the investigation.");
  b.card("DEFINITION", "Define **secondary data**.", "Information that already exists, collected earlier by someone else for another purpose.");
  b.card("CONCEPT", "What is a **leading question**?", "A question worded to suggest the answer the researcher expects, which biases the results.");
  b.card("CONCEPT", "Why use a **pilot study**?", "To test a questionnaire on a few people so that unclear or biased questions can be corrected before the main survey.");
  b.card("FORMULA", "Interval for a **systematic sample**", "k = population size ÷ sample size; choose a random start from 1 to k, then every kth member.");
  b.card("FORMULA", "Number sampled in each group in a **stratified sample**", "Group size × (sample size ÷ population size).");
  b.card("FORMULA", "**Response rate**", "Questionnaires returned ÷ questionnaires sent × 100.");
  b.card("CONCEPT", "**Reliability** compared with **validity**", "Reliable: repeating the research gives similar results. Valid: it measures what it claims to and applies to the population.");
  b.card("FACT", "Main weakness of **quota sampling**", "The interviewer chooses whom to ask within each quota, so bias is possible.");
});
