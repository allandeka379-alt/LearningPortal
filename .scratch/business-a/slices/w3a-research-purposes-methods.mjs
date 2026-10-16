// W3a: research.purposes-methods
import { concept, P, table, stats, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.research.purposes-methods", { file: "research/purposes-methods", keyPrefix: "research.purposes-methods" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is an example of **primary** market research?",
    ok: ["A firm interviews 50 customers about a new product", "Correct: the firm collects the data itself for its own purpose."],
    bad: [["A firm reads published government statistics on incomes", "Published statistics are secondary data."], ["A firm studies a rival's annual report for sales figures", "A report prepared by others is secondary data."], ["A firm reads a trade magazine on the market's size", "A magazine article is secondary data."]],
    explanation: "Primary research is collected first-hand for the firm's own purpose.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **sample** in market research?",
    ok: ["A smaller group chosen from the whole population", "Correct: results from the sample are applied to the population."],
    bad: [["The whole population of customers in the market", "That is the population, not a sample."], ["A free product given to customers to try at home", "That is a product sample for promotion."], ["The final report on the findings of the survey", "That is the research report."]],
    explanation: "A sample is a group selected from the population to represent it.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is an advantage of secondary research compared with primary research?",
    ok: ["It is usually quicker and cheaper to obtain", "Correct: the data already exists."],
    bad: [["It is always specific to the firm's own problem", "It was often collected for another purpose."], ["It is always more up to date than primary data", "It may be out of date."], ["It cannot be seen by any of the firm's competitors", "Published data is open to rivals."]],
    explanation: "Secondary data is cheap and quick, but it may not fit the problem exactly and may be out of date.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm wants to know **why** customers prefer one brand of tea to another. Which method is MOST suitable?",
    ok: ["A focus group discussion led by a moderator", "Correct: it explores reasons and attitudes in depth."],
    bad: [["A count of the number of packets sold last week", "Sales figures show how many, not why."], ["A short tick-box form with only two options", "A tick-box form gives little depth."], ["A search of government income statistics", "These figures do not explain brand preference."]],
    explanation: "Qualitative methods such as focus groups explain reasons and attitudes.",
  });
  const pop = 800, n = 50;
  const interval = pop / n;
  chk(interval, 16, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional bank in Mutare has 800 account holders on an alphabetical list and wants a systematic sample of 50. What is the sampling interval?",
    ok: ["Every 16th account holder", "Correct: 800 ÷ 50 = 16."],
    bad: [["Every 50th account holder", "This uses the sample size as the interval."], ["Every 8th account holder", "This divides 800 by 100."], ["Every 40th account holder", "This is not 800 divided by 50."]],
    hints: ["Population ÷ sample size."],
    explanation: "Interval = population ÷ sample size = 800 ÷ 50 = 16.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "An interviewer is told to question 20 men and 20 women of each of three age bands, choosing whoever is available in the street until each group is full. Which sampling method is this?",
    ok: ["Quota sampling", "Correct: set numbers per category, chosen by the interviewer."],
    bad: [["Simple random sampling", "In random sampling the researcher does not choose."], ["Systematic sampling", "Systematic sampling takes every nth item from a list."], ["Stratified sampling", "Stratified sampling is probability-based and proportional to group size."]],
    hints: ["Who chooses the individuals?"],
    explanation: "Quota sampling fills set quotas, with the interviewer choosing the people; it is non-probability sampling.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional firm asks only people at its own shop whether they like its products and finds 95% say yes. Why might the finding be unreliable?",
    ok: ["The sample is biased towards people who already buy from it", "Correct: it does not represent the wider market."],
    bad: [["The sample is too large to give a reliable result", "A large sample is not a weakness."], ["Primary research can never be used to test opinions", "Primary research can test opinions."], ["Customers always give wrong answers to any question", "Answers may be honest; the problem is who was asked."]],
    hints: ["Who was not asked?"],
    explanation: "Asking only existing customers excludes non-customers and gives a biased picture.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional small bakery has US\\$300 to spend on research before launching a new bread. Which approach is the BEST judgement?",
    ok: ["Use free secondary data, then a small, well-chosen survey", "Correct: it is affordable and still gives relevant evidence."],
    bad: [["Commission a large national survey with a market research agency", "This would cost far more than the budget."], ["Ignore research because a small firm cannot afford any", "Low-cost research is possible."], ["Rely on the owner's opinion because owners always know best", "Opinion without evidence is risky."]],
    hints: ["Which answer fits the budget and still gives evidence?"],
    explanation: "A low-cost combination of secondary data and a limited survey fits a small budget.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Qualitative research collects numerical data that can be counted.",
    answer: false,
    explanation: "False. Qualitative research collects opinions, attitudes and reasons; quantitative research produces numbers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A questionnaire should be tested on a few people (piloted) before it is used in the main survey.",
    answer: true,
    explanation: "True. A pilot finds unclear or leading questions before the full survey is carried out.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sampling method to its description.",
    pairs: [["Random", "Every member of the population has an equal chance of selection"], ["Systematic", "Every nth member of a list is chosen"], ["Stratified", "The population is split into groups and sampled in proportion"], ["Quota", "Interviewers fill set numbers from each category"]],
    explanation: "The first three are probability methods; quota sampling is not.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Information collected by the firm itself is called {{blank:a}} research, while information that already exists is {{blank:b}} research.",
    blanks: [
      { id: "a", accepted: ["primary"], choices: ["primary", "secondary", "qualitative"] },
      { id: "b", accepted: ["secondary"], choices: ["primary", "secondary", "quantitative"] },
    ],
    explanation: "Primary = first-hand; secondary = existing data.",
  });

  const strata = [["Under 30", 450], ["30 to 49", 300], ["50 and over", 150]];
  const st = stats.stratified(strata, 60);
  chk(st[0].sample, 30, 1e-9);
  chk(st[1].sample, 20, 1e-9);
  chk(st[2].sample, 10, 1e-9);
  const tbl = table(["Age group", "Customers"], strata);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: st[1].sample, unit: "people", calculator: true, daily: true, wrong: [st[0].sample, 100],
    stem: "A fictional gym in Bulawayo has 900 members and wants a stratified sample of 60 by age group.\n\n" + tbl + "\n\nHow many members aged 30 to 49 should be in the sample?",
    hints: ["Group size ÷ 900 × 60."],
    explanation: "300 ÷ 900 × 60 = 20 members. The sample sizes are 30, 20 and 10, which add up to 60.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: 1500 / 75, unit: "(every nth)", calculator: true, wrong: [75, 20.5],
    stem: "A fictional school with 1,500 pupils uses a systematic sample of 75 pupils from the register. Calculate the sampling interval (the value of n in \"every nth pupil\").",
    hints: ["Population ÷ sample size."],
    explanation: "1,500 ÷ 75 = 20, so every 20th pupil.",
  });
  const costOnline = 80, respOnline = 160, costFace = 240, respFace = 48;
  const cpOnline = costOnline / respOnline, cpFace = costFace / respFace;
  chk(cpOnline, 0.5, 1e-9);
  chk(cpFace, 5, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: cpFace - cpOnline, calculator: true, wrong: [cpFace, cpOnline],
    stem: "A fictional pharmacy compares two methods. An online survey costs US\\$80 and gets 160 replies. Face-to-face interviews cost US\\$240 and reach 48 people. By how much (in US dollars) is the cost per person higher for the interviews?",
    hints: ["Find the cost per person for each method first."],
    explanation: "Online: 80 ÷ 160 = US\\$0.50. Interviews: 240 ÷ 48 = US\\$5.00. Difference = US\\$4.50. Interviews may still be worthwhile because the people are the right ones and can explain their reasons.",
    workedSolution: "1. Online cost per person = 80 ÷ 160 = US\\$0.50.\n2. Interview cost per person = 240 ÷ 48 = US\\$5.00.\n3. Difference = 5.00 − 0.50 = US\\$4.50.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the term for existing information that was collected by someone else for a different purpose.",
    accepted: ["secondary research", "secondary data", "desk research", "secondary"],
    explanation: "Secondary (desk) research.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** advantage of using a sample rather than asking the whole population.",
    points: ["A sample is cheaper and quicker", "Asking everyone would be impractical in a large market", "A well-chosen sample can still represent the population"],
    modelAnswer: "A sample is cheaper and quicker than asking everyone, and asking the whole population would be impractical in a large market. A well-chosen sample can still represent the population fairly well.",
    hints: ["Think about cost, time and practicality."],
    explanation: "An advantage developed.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional cafe in Harare plans to open a branch in a new suburb. Explain **two** pieces of information it could gather from market research.",
    points: ["The number and income of potential customers in the suburb", "Application: so it can estimate sales and whether the branch is viable", "Competitors' prices and menus", "Application: so it can set a competitive price and choose a different offer"],
    modelAnswer: "The cafe could find the number and income of potential customers in the suburb, so it can estimate sales and judge whether the branch is viable. It could also study competitors' prices and menus so it can set a competitive price and offer something different.",
    hints: ["Think of customers and competitors."],
    explanation: "Two pieces of information, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why quota sampling may give less reliable results than stratified sampling.",
    points: ["In quota sampling the interviewer chooses whom to ask", "The interviewer may choose people who are easy to approach", "This introduces bias", "Stratified sampling is chosen at random within groups, so is less biased"],
    modelAnswer: "In quota sampling the interviewer chooses whom to ask, and may pick people who are easy to approach, which introduces bias. In stratified sampling the people are chosen at random within each group, so the sample is less biased.",
    hints: ["Who decides which individuals are asked?"],
    explanation: "Quota sampling is non-random, so bias is more likely.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional furniture firm in Masvingo is deciding whether to use an online survey or face-to-face interviews to test a new sofa design. Evaluate the two methods.",
    points: ["Online survey: cheap, quick, large number of replies", "Online survey: may miss customers without internet; replies may be shallow", "Interviews: can show the design and probe reasons", "Interviews: costly, slow, interviewer bias", "The target customers are likely to be older households, who may be less online", "Judgement with reason, e.g. interviews for depth and a short online survey for numbers"],
    modelAnswer: "An online survey is cheap, quick and can reach many people, but it may miss customers without internet and gives shallow answers. Interviews can show the design and explore reasons, but they are costly, slow and open to interviewer bias. As the target customers may be older households less likely to be online, the firm should use interviews for depth and add a short online survey to measure numbers, if the budget allows.",
    hints: ["Compare cost, depth and who can be reached."],
    explanation: "Two methods weighed with a judgement.",
  });

  const popu = 1000, nS = 40;
  const strata2 = [["Students", 500], ["Workers", 300], ["Retired", 200]];
  const st2 = stats.stratified(strata2, nS);
  chk(st2[0].sample, 20, 1e-9);
  chk(st2[1].sample, 12, 1e-9);
  chk(st2[2].sample, 8, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional library in Chinhoyi has 1,000 registered users:\n\n" + table(["User group", "Users"], strata2) + "\n\nIt wants to survey 40 users using a stratified sample.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", value: st2[1].sample, unit: "people", stem: "Calculate the number of workers in the sample.", wrong: [st2[0].sample, 40], explanation: "300 ÷ 1,000 × 40 = 12." }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: st2[2].sample, unit: "people", stem: "Calculate the number of retired users in the sample.", wrong: [12, 5], explanation: "200 ÷ 1,000 × 40 = 8." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** advantages of a stratified sample here.", points: ["Every user group is represented", "The sample has the same mix as the users, reducing bias"], modelAnswer: "Every user group is represented, and the sample has the same mix as the users, so there is less bias.", explanation: "Representation and reduced bias." }),
    ],
    hints: ["Group size ÷ 1,000 × 40."],
    explanation: "Students 20; workers 12; retired 8.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Nyasha Natural Foods is a fictional business in Mutare that sells herbal teas. It plans to launch a new tea for older customers. The owner has US\\$500 for research. She can use a free government report on household spending, ask the 30 members of a local pensioners' club to complete a questionnaire, or run one focus group of 8 customers who already buy her teas.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** weakness of asking only the pensioners' club members.", points: ["The 30 members are a small sample", "They may not represent all older customers in Mutare", "So the results could be biased and misleading"], modelAnswer: "The 30 members are a small sample and may not represent all older customers in Mutare, so the results could be biased and misleading.", explanation: "Small, unrepresentative sample." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess which combination of research methods Nyasha should use.", points: ["The government report is free and shows spending patterns (secondary)", "The questionnaire gives numbers on likely demand but from a small group", "The focus group gives reasons and ideas but only from existing customers", "Each method has a bias or a limit", "Combining them within US\\$500 improves reliability", "Judgement with reason, e.g. report plus questionnaire first, focus group if the result is unclear"], modelAnswer: "The free report shows spending patterns at no cost. The questionnaire gives numbers on likely demand but only from a small group, and the focus group gives reasons and ideas but only from existing customers. Each has a limit, so combining them improves reliability. Nyasha should use the report and the questionnaire first, and run the focus group if the results are unclear and the budget allows.", explanation: "Methods combined within a budget." }),
    ],
    hints: ["Think about cost, reliability and bias for each method."],
    explanation: "Secondary data plus a survey, with a focus group if needed.",
  });

  b.card("DEFINITION", "Market research", "Collecting, recording and analysing information about the market, customers and competitors to help decisions.");
  b.card("DEFINITION", "Primary research", "Original data collected first-hand for a specific purpose, e.g. surveys and interviews.");
  b.card("DEFINITION", "Secondary research", "Existing data collected by others for another purpose, e.g. government statistics.");
  b.card("FACT", "Methods of primary research", "Questionnaires, interviews, focus groups, observation and online surveys.");
  b.card("CONCEPT", "Qualitative and quantitative", "Qualitative: opinions and reasons (why). Quantitative: numbers (how many).");
  b.card("FACT", "Sampling methods", "Random, systematic and stratified (probability); quota (non-probability).");
  b.card("FORMULA", "Systematic sampling interval", "Population ÷ sample size.");
  b.card("FORMULA", "Stratified sample for a group", "Group size ÷ population × total sample size.");
  b.card("CONCEPT", "Good questionnaire design", "Clear, short, neutral questions, one idea each, logical order, piloted before use.");
});
