// W1a: enterprise.ventures-risks (ZIMSEC Business Enterprise Skills only; tagged automatically)
import { concept, P, table, cvp, sum, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.enterprise.ventures-risks", { file: "enterprise/ventures-risks", keyPrefix: "enterprise.ventures-risks" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is an example of an enterprise venture?",
    ok: ["Growing mushrooms for sale each week", "Correct: it is an income-earning activity started to meet a local want."],
    bad: [["Paying income tax every single year", "Paying tax is a duty, not a venture."], ["Reading the daily weather forecast", "This earns no income."], ["Attending a school assembly on Monday", "This is not an income-earning activity."]],
    explanation: "Mushroom farming is an income-earning venture; the other options are not.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A rule that vendors must hold a council licence is an example of which type of constraint?",
    ok: ["Legal", "Correct: licensing is set by law or by-law."],
    bad: [["Ecological", "Ecological constraints concern the environment."], ["Social", "Social constraints concern community attitudes and customs."], ["Economic", "Economic constraints concern costs, incomes and prices."]],
    explanation: "Licences are required by rules, so this is a legal constraint.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which question helps an enterpriser to judge whether an opportunity is worth following?",
    ok: ["Will customers pay a price that covers my costs?", "Correct: demand at a profitable price is the first test of an opportunity."],
    bad: [["Do my friends like the colour of the idea?", "Friends' preferences do not show that customers will buy."], ["Is the idea the same as every other idea in town?", "A copied idea may have too much competition."], ["Can I avoid all risk?", "Risk cannot be avoided entirely; the question does not test the opportunity."]],
    explanation: "An opportunity is worthwhile only if there is demand at a price that covers costs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a **natural** risk for a vegetable-growing venture?",
    ok: ["A drought in the dry season", "Correct: weather is a natural event beyond the grower's control."],
    bad: [["A customer who pays his bill late", "This is a financial risk."], ["A worker who steals some stock", "Theft is a risk of dishonesty, not a natural event."], ["A new rival trader at the market", "Competition is a market risk."]],
    explanation: "Drought, floods and fire are natural risks.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bee farmer in Chipinge notices that several colonies have left their hives, causing a loss of honey. Which is the **best** step to reduce this production risk in future?",
    ok: ["Train in hive care and inspect hives often", "Correct: good management and inspection reduce the chance colonies abscond."],
    bad: [["Raise the price of honey immediately", "A higher price does not stop colonies leaving."], ["Stop keeping records of hive numbers", "Records help to find the cause."], ["Sell all the hives and start a different venture", "This abandons the venture rather than reducing the risk."]],
    hints: ["Which step tackles the cause of the loss?"],
    explanation: "Training and regular inspection tackle the production risk directly.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional software start-up in Harare finds that power cuts interrupt its work and make it miss deadlines. Which type of constraint is this?",
    ok: ["Economic", "Correct: unreliable power supply is an infrastructure cost and economic limit on the venture."],
    bad: [["Political", "No change in government policy is described."], ["Ecological", "The case does not concern natural resources or pollution."], ["Social", "No community custom or attitude is mentioned."]],
    hints: ["The constraint comes from infrastructure and the economy."],
    explanation: "Unreliable power raises costs and delays work; it is an economic constraint on the venture.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional vendor in Bulawayo sells goods with the weight understated on the label. Which is the most serious likely long-term effect on the venture?",
    ok: ["Loss of customer trust and possible penalties", "Correct: dishonest practices harm reputation and may lead to fines or loss of licence."],
    bad: [["Higher profit forever because customers never notice", "Customers and inspectors often do notice."], ["More competitors will copy the practice and she will gain", "Copying rivals does not give her a lasting benefit."], ["No effect, because weights do not matter", "Weights and measures rules protect buyers."]],
    hints: ["Think about repeat customers and the authorities."],
    explanation: "Dishonesty may bring short-term gain but harms trust and risks penalties.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional enterpriser can start a venture either in a shed near her home or in a rented shop in town. Which factor is **least** relevant to judging which opportunity is better?",
    ok: ["The colour of the sign she would like", "Correct: appearance does not affect demand, cost or return in a way that decides the choice."],
    bad: [["The rent and running costs of each site", "Costs determine the return."], ["How many customers pass each site", "Customer numbers affect demand."], ["Whether each site is legally allowed for the business", "Legal permission is essential."]],
    hints: ["Which factor does not affect the return or legality?"],
    explanation: "Cost, customers and legality decide the choice; the colour of a sign does not.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Risk in a venture can be completely removed if the enterpriser plans carefully.",
    answer: false,
    explanation: "False. Planning can reduce risk but never remove it, since events such as drought or a fall in demand remain possible.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A hygiene rule for food vendors is a legal constraint that may add to costs but also protects customers.",
    answer: true,
    explanation: "True. Such rules add cost but protect customers and improve trust.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example to the type of constraint it illustrates.",
    pairs: [["A land policy that changes after an election", "Political"], ["A requirement to register a food business", "Legal"], ["Community custom that forbids work on a particular day", "Social"], ["A limit on water use from a river", "Ecological"], ["High interest rates on loans", "Economic"]],
    explanation: "Each example is classified by its source.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "An {{blank:a}} is a gap between what people want and what is currently supplied, while a {{blank:b}} is a limit that restricts what a venture may do.",
    blanks: [
      { id: "a", accepted: ["opportunity"], choices: ["opportunity", "constraint", "risk"] },
      { id: "b", accepted: ["constraint"], choices: ["opportunity", "constraint", "profit"] },
    ],
    explanation: "An opportunity is an unmet want; a constraint is a limit.",
  });

  const cb = cvp({ price: 6, variable: 2.5, fixed: 490 });
  chk(cb.breakEvenUnits, 140);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", unit: "kg", value: cb.breakEvenUnits, calculator: true, daily: true, wrong: [r2(490 / 6), r2(490 / 2.5)],
    stem: "A fictional bee-farming venture near Mutare sells honey at US\\$6 a kilogram. Variable costs (jars, labels and transport) are US\\$2.50 a kilogram and fixed costs are US\\$490 a month. Calculate the break-even output in kilograms a month.",
    hints: ["Break-even = fixed costs ÷ contribution per kilogram."],
    explanation: "Contribution = 6 − 2.50 = 3.50. Break-even = 490 ÷ 3.50 = 140 kg. Dividing by the price gives 81.7 kg and dividing by the variable cost gives 196 kg; both are errors.",
  });
  const ch = cvp({ price: 4, variable: 1.5, fixed: 500 });
  chk(ch.profitAt(260), 150);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: ch.profitAt(260), calculator: true, wrong: [r2(260 * 4 - 500), r2(260 * 2.5)],
    stem: "A fictional honey packer near Chipinge sells honey at US\\$4 a kilogram. Variable costs are US\\$1.50 a kilogram and fixed costs are US\\$500 a month. Calculate the monthly profit if 260 kg are sold.",
    hints: ["Profit = total contribution − fixed costs."],
    explanation: "Contribution = 4 − 1.50 = 2.50 a kilogram; 260 × 2.50 = 650. Profit = 650 − 500 = US\\$150. Using revenue less fixed costs (US\\$540) ignores variable costs.",
  });
  chk(cb.marginOfSafetyPct(200), 30, 0.0001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: cb.marginOfSafetyPct(200), calculator: true, wrong: [r2(60 / 140 * 100), 70],
    stem: "A heavy rainy season reduces the flowers available to the bees. Using the same figures, calculate how far sales of 200 kg can fall, as a percentage of 200 kg, before the venture makes a loss. Give your answer to one decimal place.",
    hints: ["This is the margin of safety as a percentage of sales."],
    explanation: "Break-even is 140 kg, so sales can fall by 200 − 140 = 60 kg. 60 ÷ 200 × 100 = 30.0%. Dividing by break-even output gives 42.9%, which is a different measure.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** example of an enterprise venture that could be started with little capital.",
    accepted: ["mushroom farming", "bee farming", "vending", "selling airtime", "peanut butter", "poultry", "software", "small-scale processing", "market gardening", "selling vegetables", "baking", "tailoring"],
    explanation: "Accept any realistic low-cost venture such as mushroom farming, bee farming, vending or software services.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** ways in which an enterpriser can find opportunities in the local environment.",
    points: ["Observe what local people say they cannot buy or must travel far to get", "Look for plentiful local materials or produce that could be processed", "Use the skills of the community or copy successful ideas from other places"],
    modelAnswer: "An enterpriser can listen to what residents say they cannot buy nearby, which shows unmet demand. They can look for cheap local materials or produce that could be processed to add value. They can also use the community's skills or adapt successful ideas from other towns.",
    hints: ["Think of unmet wants, local resources and local skills."],
    explanation: "One point per way.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tatenda, a fictional grower, starts an oyster-mushroom project in a shed in Marondera. Explain **two** risks and how he could reduce each.",
    points: ["Production risk: contamination can spoil a crop", "Reduction: strict hygiene, clean substrate and training", "Market risk: mushrooms deteriorate quickly if not sold", "Reduction: agree sales with restaurants or dry the surplus"],
    modelAnswer: "Contamination can spoil a whole crop, so he should keep strict hygiene and use clean substrate. Mushrooms also spoil quickly if they are not sold, so he should agree regular sales with restaurants and dry any surplus.",
    hints: ["Link each risk to a reduction."],
    explanation: "Two risks, each with a way to reduce it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Examine how a legal constraint such as a health licence may both help and harm a small food-vending venture.",
    points: ["Harm: licence fees and hygiene equipment raise costs", "Harm: delays in getting a licence may postpone opening", "Help: customers trust licensed sellers, which can raise sales", "Help: it prevents unsafe rivals from undercutting on price"],
    modelAnswer: "A licence adds fees and equipment costs and may delay opening, which harms a small venture with little cash. But customers trust licensed sellers, so sales may rise, and the rule stops unsafe rivals from selling more cheaply. The effect depends on whether customers value safety enough to pay for it.",
    hints: ["Consider cost and trust."],
    explanation: "Both effects, then a condition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why ethical behaviour matters to the success of an enterprise venture.",
    points: ["Customers return to businesses they trust", "Dishonest behaviour can lead to penalties or loss of licence", "The community supports enterprises that behave responsibly"],
    modelAnswer: "Customers return to a business they trust, so honesty raises repeat sales. Dishonesty can lead to fines or loss of a licence. A venture that treats workers and the environment fairly also gains the support of the community.",
    hints: ["Think of customers, the authorities and the community."],
    explanation: "One point per mark.",
  });

  const cm = cvp({ price: 2.5, variable: 1.1, fixed: 560 });
  chk(cm.breakEvenUnits, 400);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional venture: Nyasha plans to make and sell peanut butter from a rented room in Masvingo. She will sell each jar for US\\$2.50. Variable costs (groundnuts, jars, labels) are US\\$1.10 a jar and fixed costs (rent, power, a part-time helper) are US\\$560 a month. She expects to sell 520 jars a month.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: cm.breakEvenUnits, stem: "Calculate the break-even output in jars a month.", wrong: [r2(560 / 2.5), r2(560 / 1.1)], explanation: "Contribution = 2.50 − 1.10 = 1.40. Break-even = 560 ÷ 1.40 = 400 jars." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cm.profitAt(520), stem: "Calculate the expected monthly profit.", wrong: [r2(520 * 2.5 - 560)], explanation: "520 × 1.40 = 728. Profit = 728 − 560 = US\\$168." }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify **two** risks Nyasha faces in this venture.", points: ["Market risk: demand may be below 400 jars if rivals sell cheaper", "Production or supply risk: groundnut supply or prices may change, or the product may be spoiled"], modelAnswer: "She faces market risk, as sales may fall below break-even if rivals cut prices, and supply risk, since groundnut prices may rise or the harvest may fail.", explanation: "Accept production, market, financial, natural or theft risks, with a reason." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest and justify **one** way to reduce the risk that sales fall below break-even.", points: ["A way: agree regular orders with shops before producing in volume, or test the market with a small batch", "Link to the risk: it shows demand before costs are committed", "Judgement: the cost is small compared with the loss it avoids"], modelAnswer: "She could agree regular orders with local shops before producing in volume. This shows demand before costs are committed, so the chance of selling fewer than 400 jars falls. The cost of visiting shops is small compared with the loss from unsold jars.", explanation: "A suggestion, a link, and a justification." }),
    ],
    hints: ["Contribution first, then break-even."],
    explanation: "Break-even 400 jars; profit US\\$168 at 520 jars; risk reduction by securing orders.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional venture: Farai wants to start a small fish-farming project in a pond near Kariba. The local council says that a permit is needed to use the water. Other farmers are worried that the pond may pollute the stream. A bank will lend if Farai can show that the project is viable. He has a choice between a small pond now and a large pond later after saving more.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **two** constraints Farai faces.", points: ["Legal: a permit is needed to use the water", "Ecological or social: pollution of the stream and the concern of neighbouring farmers", "Economic: the bank's requirement to show viability / finance"], modelAnswer: "A permit is needed to use the water, which is a legal constraint, and neighbours are concerned about pollution of the stream, which is an ecological and social constraint.", explanation: "Any two, identified from the case." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Farai should start with a small pond now or wait and build a large one later.", points: ["Small pond: lower cost and lower risk of loss", "Small pond: allows him to learn and prove viability to the bank", "Small pond: lower output and income, and less pollution", "Large pond later: more output and lower cost per fish, but needs savings and permits", "Waiting: loses time and income now and conditions may change", "Judgement and reason"], modelAnswer: "A small pond has a lower cost and a lower risk, lets Farai learn about fish farming, shows the bank that the project works and creates less pollution for neighbours. A large pond would produce more at a lower cost per fish but needs savings and a bigger permit, and waiting loses income. On balance he should start small, because it proves viability and eases the neighbours' concern, and expand when the results justify it.", hints: ["Compare risk, learning, finance and the constraints in the case."], explanation: "Both options weighed, and a justified recommendation." }),
    ],
    hints: ["Use the constraints in the case."],
    explanation: "Constraints are legal, ecological and social; a staged start reduces risk and satisfies the bank.",
  });

  b.card("DEFINITION", "Enterprise venture", "An income-earning activity started by an enterpriser to meet a local need or want, e.g. bee farming, mushrooms, vending or software.");
  b.card("DEFINITION", "Opportunity", "A gap between what people want and what is supplied that an enterpriser could fill profitably.");
  b.card("DEFINITION", "Constraint", "A limit set by rules or conditions that restricts what a venture may do.");
  b.card("FACT", "Types of constraint", "Political, legal, social, ecological and economic.");
  b.card("FACT", "Types of risk in a venture", "Production, market, financial, natural, and theft or fraud.");
  b.card("CONCEPT", "Judging an opportunity", "Check demand at a profitable price, the resources needed, competition, legality and the likely return.");
  b.card("CONCEPT", "Reducing risk", "Training, research, starting small, cash control, security and diversifying; risk is reduced, never removed.");
  b.card("FORMULA", "Break-even output", "Fixed costs ÷ contribution per unit.");
  b.card("CONCEPT", "Why ethics matter", "Trust brings repeat customers; dishonesty risks penalties and loss of licence; the community supports responsible ventures.");
});
