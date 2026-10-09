// W3b: market research.
import { concept, P, BES, CAM, table, round, check } from "../lib.mjs";

// Survey for a bakery (question figures; differ from the lesson's).
const sampleN = 160, prefWhole = 56;
const pctWhole = (prefWhole / sampleN) * 100; // 35
const quotaPop = [2400, 1600]; // households in two areas
const quotaTot = quotaPop[0] + quotaPop[1];
const quotaN = 120;
const quotaA = (quotaPop[0] / quotaTot) * quotaN; // 72
check("quota", quotaA + (quotaPop[1] / quotaTot) * quotaN, quotaN);

// Structured: delivery survey.
const ans = [["Every day", 18], ["Two or three times a week", 54], ["Once a week", 42], ["Less than once a week", 36]];
const ansTot = ans.reduce((s, [, n]) => s + n, 0); // 150
const atLeast2 = ans[0][1] + ans[1][1]; // 72
const pctAtLeast2 = (atLeast2 / ansTot) * 100; // 48
const tbl = table(["How often would you order bread for delivery?", "Number of people"], [...ans, ["Total", ansTot]]);

concept("bus.marketing.market-research", { file: "marketing/market-research", keyPrefix: "marketing.market-research" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of primary market research?",
    options: [
      ["Interviewing shoppers outside a supermarket", "Correct: new information collected first-hand for the business."],
      ["Reading a government population report", "This uses data already published by someone else: secondary."],
      ["Studying last year's sales records", "Existing internal records are secondary (desk) research."],
      ["Reading a trade association magazine", "Published reports are secondary sources."],
    ],
    answer: "A",
    explanation: "Primary (field) research collects **new** information for a specific purpose: questionnaires, interviews, focus groups and observation.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a sample in market research?",
    options: [
      ["The people chosen from the target market to take part", "Correct: a sample represents the whole population."],
      ["A free product given to customers to try", "That is a free sample, a sales promotion method."],
      ["Every customer the business has ever served", "That is the whole population, not a sample."],
      ["A list of questions given to customers", "That is a questionnaire."],
    ],
    answer: "A",
    explanation: "Asking everyone is too costly, so a business questions a **sample** chosen to represent the market.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the main advantage of secondary research compared with primary research?",
    options: [
      ["It is usually cheaper and quicker to obtain", "Correct: the data already exist."],
      ["It is always up to date", "Secondary data may be out of date."],
      ["It answers the business's exact question", "It was collected for another purpose, so it may not fit."],
      ["Competitors cannot see it", "Published data are available to competitors too."],
    ],
    answer: "A",
    explanation: "Secondary data have already been collected, so they are cheap and quick, but they may be out of date, unsuitable and available to rivals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which question would produce qualitative data?",
    options: [
      ["Why do you prefer to buy bread from a tuck shop?", "Correct: it asks for reasons and opinions."],
      ["How many loaves do you buy each week?", "This produces a number: quantitative data."],
      ["How much do you spend on bread each week?", "An amount of money is quantitative."],
      ["How many people live in your household?", "A count is quantitative."],
    ],
    answer: "A",
    explanation: "Qualitative data are opinions, feelings and reasons; quantitative data are numbers that can be counted.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A new minibus operator stands at a junction in Gweru and counts how many people wait for transport each hour. Which research method is this?",
    options: [
      ["Observation", "Correct: behaviour is watched and counted."],
      ["Focus group", "A focus group is a discussion with a small group."],
      ["Questionnaire", "No questions are asked."],
      ["Desk research", "The data are collected first-hand, so it is field research."],
    ],
    answer: "A",
    explanation: "**Observation** records what people actually do, such as numbers passing a site, but not why they do it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which question in a questionnaire is a leading question?",
    options: [
      ["Don't you agree that our new soap smells wonderful?", "Correct: it pushes the respondent towards one answer."],
      ["How often do you buy bath soap?", "A neutral question about frequency."],
      ["Which brand of soap did you buy last?", "A neutral question about behaviour."],
      ["What price would you pay for a bar of soap?", "A neutral question about price."],
    ],
    answer: "A",
    hints: ["Which question suggests the answer the business wants?"],
    explanation: "A **leading question** suggests the answer, so results are biased and inaccurate.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business surveyed 20 people in one street to decide whether to open a clothing shop for the whole of Bulawayo. Why are the results likely to be inaccurate?",
    options: [
      ["The sample is too small and may not represent the market", "Correct: 20 people in one street are unlikely to be typical."],
      ["Primary research is always less accurate than secondary research", "Primary research can be accurate if done well."],
      ["Questionnaires cannot be used for clothing", "Questionnaires can be used for any product."],
      ["The results are qualitative and cannot be counted", "Survey answers can be counted."],
    ],
    answer: "A",
    hints: ["Think about the size and spread of the sample."],
    explanation: "Accuracy depends on a **large enough, unbiased sample**; one street of 20 people does not represent a city.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which is a disadvantage of using a focus group?",
    options: [
      ["One or two strong members may influence the others", "Correct: opinions of the group may be distorted."],
      ["It produces only numerical data that cannot explain opinions", "Focus groups produce mainly qualitative data."],
      ["It needs no planning or leader to run the discussion", "A leader must plan and guide the discussion."],
      ["It reaches thousands of people at once", "A focus group is small."],
    ],
    answer: "A",
    explanation: "Focus groups give detailed opinions, but the group is small and may be dominated by a few people, so it may not represent the market.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business's own records of past sales are a source of secondary data.",
    answer: true,
    explanation: "True. The records already exist and were collected for another purpose (recording sales), so they are an internal secondary source.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Observation tells a business why customers prefer one product to another.",
    answer: false,
    explanation: "False. Observation shows **what** people do; it does not explain **why**. Interviews or questionnaires are needed for reasons.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each research activity with the method it uses.",
    pairs: [
      ["Eight customers discuss a new juice flavour with a leader", "Focus group"],
      ["Counting cars passing a proposed service station", "Observation"],
      ["Reading census figures on the number of households in an area", "Secondary research"],
      ["Selling a new snack in one town before a national launch", "Test marketing"],
      ["Asking 300 people to complete a form with tick-box questions", "Questionnaire"],
    ],
    explanation: "Each activity matches one method; only reading census figures uses existing (secondary) data.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about types of research.",
    template: "Collecting new information first-hand is called {{blank:a}} research. Using information already collected by others is called {{blank:b}} research.",
    blanks: [
      { id: "a", accepted: ["primary", "field"], wrong: "secondary" },
      { id: "b", accepted: ["secondary", "desk"], wrong: "primary" },
    ],
    explanation: "Primary = field research; secondary = desk research.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of sample in which the researcher chooses a set number of people from each group (for example each age group) in proportion to the population.",
    accepted: ["quota sample", "quota", "quota sampling"],
    wrong: ["random sample"],
    explanation: "In a **quota sample** the researcher fills a set number from each group; in a random sample everyone has an equal chance of selection.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A bakery asked ${sampleN} people which bread they prefer. ${prefWhole} chose wholemeal bread. Calculate the percentage of the sample that chose wholemeal bread.`,
    kind: "pct", dp: 0, value: pctWhole, wrong: [round((sampleN / prefWhole) * 100, 1), sampleN - prefWhole],
    explanation: `${prefWhole} ÷ ${sampleN} × 100 = ${pctWhole}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true, applies: BES,
    stem: `A researcher will survey ${quotaN} households using a quota sample. Area X has ${quotaPop[0].toLocaleString("en-GB")} households and Area Y has ${quotaPop[1].toLocaleString("en-GB")}. Calculate how many households in Area X should be surveyed.`,
    kind: "units", value: quotaA, wrong: [quotaN / 2, quotaPop[0] / 20],
    hints: ["Find Area X's share of all households, then apply it to the sample."],
    explanation: `Area X's share = ${quotaPop[0].toLocaleString("en-GB")} ÷ ${quotaTot.toLocaleString("en-GB")} = ${quotaPop[0] / quotaTot}. Quota = ${quotaPop[0] / quotaTot} × ${quotaN} = ${quotaA}.`,
    workedSolution: `1. Total households = ${quotaPop[0].toLocaleString("en-GB")} + ${quotaPop[1].toLocaleString("en-GB")} = ${quotaTot.toLocaleString("en-GB")}.\n2. Area X share = ${quotaPop[0].toLocaleString("en-GB")} ÷ ${quotaTot.toLocaleString("en-GB")} = ${quotaPop[0] / quotaTot}.\n3. Households in Area X = ${quotaPop[0] / quotaTot} × ${quotaN} = ${quotaA}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** reasons why market research data may be inaccurate.",
    points: [
      "Reason 1, e.g. the sample is too small or biased.",
      "Explained: it does not represent the whole target market, so results cannot be applied to all customers.",
      "Reason 2, e.g. leading or unclear questions / respondents not honest / secondary data out of date.",
      "Explained: answers do not show what customers really think or do now.",
    ],
    hints: ["Think about who was asked and how the questions were worded."],
    modelAnswer: "The sample may be too small or chosen from only one group, so it does not represent the whole market. Questions may also be leading, so people give the answer the business wants rather than their true opinion.",
    explanation: "Accuracy depends on the sample, the questions, the honesty of respondents and the age and source of data.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Farai plans to open a car wash in Kwekwe. Suggest **one** primary and **one** secondary method of research he could use, and explain what each would tell him.",
    points: [
      "Primary method suitable, e.g. observation of cars passing the site / questionnaire to drivers.",
      "What it tells him, e.g. likely number of customers / prices drivers would pay.",
      "Secondary method suitable, e.g. visiting / internet search of rival car washes, local council or census data.",
      "What it tells him, e.g. competitors' prices and services / number of vehicles or households in the area.",
    ],
    hints: ["One method collects new data; the other uses data that exist already."],
    modelAnswer: "Farai could count the cars passing his proposed site at different times (observation), which shows how many potential customers there are. He could also look up rival car washes online and note their prices, which tells him what price he can charge.",
    explanation: "Good answers apply each method to the car wash and say what decision it helps.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780, calculator: true,
    stem: `Thandeka runs a bakery in Masvingo and is thinking of starting a home-delivery service. She asked customers in her shop one question. Her results are shown below.\n\n${tbl}`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which type of research has Thandeka carried out?",
        options: [["Primary research", "Correct: she collected new data herself."], ["Secondary research", "She did not use existing data."], ["Test marketing", "No product was sold in a test area."], ["Observation", "She asked a question rather than watching."]],
        answer: "A",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of people who would order bread for delivery at least two or three times a week (including every day).",
        kind: "pct", dp: 0, value: pctAtLeast2, wrong: [round((ans[1][1] / ansTot) * 100, 0)],
        explanation: `${ans[0][1]} + ${ans[1][1]} = ${atLeast2}; ${atLeast2} ÷ ${ansTot} × 100 = ${pctAtLeast2}%.`,
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** reason why Thandeka's results may not be accurate.",
        points: ["Identifies: only customers already in the shop were asked / sample may be biased.", "Explains: people who do not visit the shop (possible delivery customers) are left out.", "Applies: so demand for delivery may be over- or under-estimated."],
        modelAnswer: "She only asked customers inside her shop, so the sample leaves out people who never visit, such as busy office workers who might most want delivery. Her results may therefore misjudge the real demand.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend whether Thandeka should start the delivery service now or carry out more research first. Justify your answer.",
        points: ["Uses the data: almost half would order at least two or three times a week.", "Argument for starting: evidence of demand; early start before rivals.", "Argument for more research: biased sample, people may not do what they say, price not asked.", "Suggests further research, e.g. ask about price, survey offices or estates, trial delivery in one area.", "Weighs cost of research against risk of failure.", "Justified recommendation."],
        modelAnswer: `The survey is encouraging: ${pctAtLeast2}% say they would order at least two or three times a week. But only shop customers were asked, people often say they will buy and then do not, and she did not ask what delivery charge they would pay. Starting with vans and staff is costly. Thandeka should do a little more research first, such as a two-week trial delivery in one suburb with a set charge. This is cheap, shows real buying behaviour and reduces the risk before she invests fully.`,
      }),
    ],
    hints: ["(b) Add the first two rows before dividing by the total.", "(d) Weigh the evidence against its weaknesses."],
    explanation: `(a) Primary. (b) ${pctAtLeast2}%. (c) Biased sample of existing shop customers. (d) A justified decision, ideally a small trial first.`,
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, applies: BES,
    stem: "Sipho has a small workshop in Chinhoyi making school desks. He wants to know whether schools in the district would buy a cheaper plastic-topped desk. He has a budget of only US\\$100 for research.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define the term *questionnaire*.", points: ["A set list of written questions.", "Answered by respondents to collect information (in a survey)."] }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Write **two** suitable questions for a questionnaire to school heads: one closed question and one open question. Explain why each is useful.",
        points: ["A clear closed question, e.g. \"How many new desks will your school buy next year? 0-20 / 21-50 / over 50\".", "Why useful: answers easy to count / estimate demand.", "A clear open question, e.g. \"What do you dislike about the desks you use now?\".", "Why useful: gives reasons / ideas for the product."],
        modelAnswer: "Closed: \"How many desks will your school buy next year? 0-20 / 21-50 / over 50\" gives numbers that are easy to add up to estimate demand. Open: \"What problems do you have with your current desks?\" gives reasons that could improve the design.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Sipho should use interviews with school heads or a postal or emailed questionnaire.",
        points: ["Interviews: can explain the product / show a sample desk, follow up answers.", "But slow and travel costs within a US\\$100 budget limit the number of schools.", "Questionnaire: cheap and reaches many schools.", "But low response rate; cannot show the desk; questions may be misunderstood.", "Considers that the number of schools in a district is small enough to visit some.", "Justified conclusion."],
        modelAnswer: "Interviews let Sipho show a sample desk and ask follow-up questions, which matters for a new product, but travel would use much of his US\\$100 budget. A questionnaire is cheaper and reaches every school, but many heads may not reply and they cannot see the desk. Because the number of schools in one district is small and the decision depends on seeing the product, Sipho should interview heads at the nearest schools, perhaps combining visits with deliveries, and send a short questionnaire to the rest.",
      }),
    ],
    hints: ["(b) A closed question has set answers to choose from.", "(c) Consider cost, response and whether heads need to see the desk."],
    explanation: "Questionnaires are cheap and countable; interviews are detailed but costly. A small budget favours a mix.",
  });
  b.card("DEFINITION", "What is **market research**?", "Collecting, recording and analysing information about customers, competitors and the market to help make marketing decisions.");
  b.card("DEFINITION", "Primary (field) research?", "Collecting new, first-hand information for a specific purpose: questionnaires, interviews, focus groups, observation, test marketing.");
  b.card("DEFINITION", "Secondary (desk) research?", "Using information already collected by others or for another purpose: sales records, government statistics, reports, newspapers, the internet.");
  b.card("CONCEPT", "Primary vs secondary research: one advantage of each?", "Primary: up to date and specific to the question. Secondary: cheap and quick to obtain.");
  b.card("CONCEPT", "Quantitative vs qualitative data?", "Quantitative: numbers that can be counted. Qualitative: opinions, feelings and reasons.");
  b.card("CONCEPT", "Random vs quota sample?", "Random: everyone has an equal chance of being chosen. Quota: a set number chosen from each group in proportion to the population.");
  b.card("CONCEPT", "What makes research data inaccurate?", "Small or biased sample, leading or unclear questions, dishonest answers, out-of-date or biased secondary sources.");
  b.card("CONCEPT", "Features of a good questionnaire?", "Short, clear, unbiased (no leading questions), mostly closed questions with a few open ones, asks only what is needed.", "Business Enterprise and Skills may ask you to design one.", { applies: BES });
  b.card("FORMULA", "Percentage of a sample giving an answer?", "Number giving the answer ÷ number in the sample × 100.");
});
