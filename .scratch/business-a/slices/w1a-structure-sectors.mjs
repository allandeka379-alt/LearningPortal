// W1a: structure.sectors
import { concept, P, table, sum, r2, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.structure.sectors", { file: "structure/sectors", keyPrefix: "structure.sectors" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "To which sector of the economy does a gold mine belong?",
    ok: ["Primary", "Correct: mining extracts natural resources."],
    bad: [["Secondary", "Secondary firms make or build goods from materials."], ["Tertiary", "Tertiary firms provide services."], ["Quaternary", "Quaternary firms deal in knowledge and information."]],
    explanation: "Extracting minerals from the ground is primary activity.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these firms is in the **secondary** sector?",
    ok: ["A furniture factory", "Correct: it manufactures goods from timber."],
    bad: [["A cattle ranch", "A ranch is in the primary sector."], ["A taxi company", "Transport is a service in the tertiary sector."], ["A software research laboratory", "Research and IT are quaternary."]],
    explanation: "Manufacturing and construction are secondary activities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement correctly describes the **public sector**?",
    ok: ["It is made up of bodies owned by the state", "Correct: the state or a local authority owns them."],
    bad: [["It consists of firms whose shares anyone may buy", "That describes public limited companies, which are private sector."], ["It consists only of very large businesses", "Size does not decide the sector."], ["It consists of firms which never charge for goods", "Many public bodies do charge."]],
    explanation: "The public sector is state-owned; the private sector is owned by individuals and companies.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **industrialisation**?",
    ok: ["A move towards manufacturing as the main activity", "Correct: factories and machines grow in importance."],
    bad: [["A fall in the number of firms in the economy", "Industrialisation is about the type of activity, not the number of firms."], ["A shift of all workers into farming", "That would be the reverse of industrialisation."], ["The closing of all service businesses", "Services usually grow alongside industry."]],
    explanation: "Industrialisation moves an economy from mainly primary activity towards manufacturing.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Gweru buys flour, bakes bread and delivers it to its own shops, which sell to the public. In which sectors does the whole business operate?",
    ok: ["Secondary and tertiary", "Correct: baking is manufacturing; selling in shops is retail service."],
    bad: [["Primary and secondary", "No growing or mining is described."], ["Primary and quaternary", "No growing or information work is described."], ["Quaternary only", "The business does not deal mainly in knowledge."]],
    hints: ["Baking makes goods; shops sell them."],
    explanation: "Making the bread is secondary; selling it to customers is tertiary.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the tertiary sector tend to grow as incomes in a country rise?",
    ok: ["People buy more services such as tourism", "Correct: demand for services rises faster than for basic goods."],
    bad: [["People stop buying any manufactured goods", "They still buy goods; demand for services rises faster."], ["Primary products become too expensive to produce", "Primary output continues, with fewer workers."], ["Governments forbid new factories from opening", "Rising incomes do not imply such a ban."]],
    hints: ["What do people buy more of when they are richer?"],
    explanation: "As incomes rise, people spend more on services, which raises the tertiary sector's share.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A town's main clothing factory closes because cheaper imports have taken its customers. Which is the most likely effect on the town's sector balance?",
    ok: ["Secondary output falls and some workers move to services", "Correct: manufacturing jobs are lost and services may absorb some workers."],
    bad: [["The primary sector disappears at once", "The factory's closure does not directly affect farming."], ["The quaternary sector becomes the largest sector overnight", "Knowledge work cannot replace a factory so quickly."], ["The public sector must immediately take over the factory", "No such rule exists."]],
    hints: ["Which sector has lost its main employer?"],
    explanation: "The factory is secondary, so the secondary sector shrinks; displaced workers may find jobs in services.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the strongest judgement about whether a country should aim to industrialise?",
    ok: ["It depends on whether jobs and exports outweigh the costs", "Correct: it weighs benefits against costs and names the condition."],
    bad: [["It should, because industry is always better than farming", "This ignores the costs and the value of farming."], ["It should not, because factories always pollute", "Pollution can be controlled; the claim is too absolute."], ["It makes no difference to jobs or incomes", "Industrialisation affects both."]],
    hints: ["Look for the option that weighs both sides."],
    explanation: "A good judgement weighs jobs and exports against environmental and social costs.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bank belongs to the tertiary sector.",
    answer: true,
    explanation: "True. Banking provides a service, so it is tertiary.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A public limited company is part of the public sector because the public can buy its shares.",
    answer: false,
    explanation: "False. A public limited company is privately owned by its shareholders; the public sector is owned by the state.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each firm to its sector.",
    pairs: [["A tobacco farm", "Primary"], ["A cement factory", "Secondary"], ["A hotel", "Tertiary"], ["A data-analytics firm", "Quaternary"]],
    explanation: "Each firm is classified by its main activity.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A firm that makes bricks is in the {{blank:a}} sector, while a firm that transports them is in the {{blank:b}} sector.",
    blanks: [
      { id: "a", accepted: ["secondary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "b", accepted: ["tertiary"], choices: ["primary", "secondary", "tertiary"] },
    ],
    explanation: "Making bricks is manufacturing (secondary); transport is a service (tertiary).",
  });

  const p = 420, s = 630, t3 = 1050, tot = sum([p, s, t3]);
  chk(tot, 2100);
  chk((t3 / tot) * 100, 50, 0.0001);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: (t3 / tot) * 100, calculator: true, daily: true, wrong: [r2((t3 / s) * 100), r2((s / tot) * 100)],
    stem: "A fictional country produces output worth US\\$420 million in the primary sector, US\\$630 million in the secondary sector and US\\$1,050 million in the tertiary sector. Calculate the tertiary sector's share of total output, to one decimal place.",
    hints: ["Find total output first."],
    explanation: "Total = 420 + 630 + 1,050 = US\\$2,100 million. Tertiary share = 1,050 ÷ 2,100 × 100 = 50.0%. Dividing by the secondary figure gives 166.7%, which is not a share of the total.",
  });
  chk(pctChange(800, 680), -15, 0.0001);
  b.num({
    d: 3, skill: "ANALYSIS", kind: "pct", value: Math.abs(pctChange(800, 680)), calculator: true, wrong: [r2(((800 - 680) / 680) * 100), 120],
    stem: "Manufacturing output in a fictional country falls from US\\$800 million to US\\$680 million over ten years. Calculate the percentage fall, to one decimal place.",
    hints: ["Percentage change is based on the starting figure."],
    explanation: "Fall = 800 − 680 = 120. 120 ÷ 800 × 100 = 15.0%. Using the new figure as the base gives 17.6%.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the sector of the economy that includes research and development and information technology.",
    accepted: ["quaternary", "quaternary sector"],
    explanation: "Knowledge-based activities such as R&D and IT form the quaternary sector.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by the **chain of production**.",
    points: ["The stages through which a product passes from raw material to the final consumer", "Different firms add value at each stage, so each depends on the others"],
    modelAnswer: "The chain of production is the series of stages a product passes through from raw material to the consumer, with different firms adding value at each stage.",
    explanation: "A definition and the link between stages.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional cooperative in Chipinge grows tea, dries and packs it, and sells it in its own shop. Explain how the cooperative operates in more than one sector.",
    points: ["Growing tea is primary", "Application: it extracts value from the land directly", "Drying and packing is secondary processing", "Selling in its shop is tertiary retail, so all three sectors are involved"],
    modelAnswer: "Growing the tea is primary production. Drying and packing it is secondary because it processes raw material into a finished product. Selling it in its own shop is tertiary because it is a retail service. The cooperative therefore works in all three sectors.",
    hints: ["Take each activity in turn."],
    explanation: "Each activity classified and linked to the case.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** reason why a government might own a business in the public sector.",
    points: ["To provide essential services to everyone, even where they are not profitable", "For example, a water or rail service in remote areas", "Private firms might not supply the service or might charge too much"],
    modelAnswer: "A government may own a water supply business to give everyone access to essential water, even in remote areas where a private firm would make no profit. A private firm might not supply these areas or might charge too much.",
    hints: ["Think of essential services."],
    explanation: "A reason, an example and its link to private provision.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the consequences for a country of a shrinking manufacturing sector (deindustrialisation).",
    points: ["Loss of manufacturing jobs and local incomes", "Falling exports of finished goods and greater reliance on imports", "Less demand for suppliers and local services", "Counter-argument: workers may move into growing service work", "Counter-argument: efficient firms can produce more with fewer workers", "Judgement with a condition, e.g. depends on retraining and whether services grow"],
    modelAnswer: "Deindustrialisation can cause job losses, lower exports and less business for local suppliers. However, displaced workers may find jobs in growing service industries, and the remaining factories may be more efficient. Overall the effect depends on whether workers can retrain and whether services expand fast enough to replace the lost jobs.",
    hints: ["Weigh the costs against the possible gains and then state a condition."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The table shows the output of a fictional country by sector (US\\$ million) in two years.\n\n" + table(["Sector", "Year 1", "Year 2"], [["Primary", 540, 520], ["Secondary", 760, 780], ["Tertiary", 1100, 1500]]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: (1500 / 2800) * 100, stem: "Calculate the tertiary sector's share of total output in Year 2, to one decimal place.", wrong: [r2((1500 / 1100) * 100), r2((1500 / 1300) * 100)], explanation: "Total in Year 2 = 520 + 780 + 1,500 = 2,800. 1,500 ÷ 2,800 × 100 = 53.6%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: ((1500 - 1100) / 1100) * 100, stem: "Calculate the percentage increase in tertiary output from Year 1 to Year 2, to one decimal place.", wrong: [r2(((1500 - 1100) / 1500) * 100)], explanation: "(1,500 − 1,100) ÷ 1,100 × 100 = 36.4%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** possible reason for the change in the primary sector's output.", points: ["Primary output fell slightly (540 to 520)", "A possible reason: mechanisation or movement of workers to other sectors", "Linked effect: fewer workers needed or falling demand for raw products"], modelAnswer: "Primary output fell from 540 to 520. A possible reason is that workers have moved to services where incomes are higher, so fewer people work in farming and mining.", explanation: "Any sensible reason, linked to the data." }),
    ],
    hints: ["Find the Year 2 total first."],
    explanation: "Tertiary share 53.6%; increase 36.4%; reasons linked to data.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A fictional government owns a bus company in the public sector. The company runs routes to remote villages where fares do not cover costs. A private operator offers to take over only the profitable town routes and says the government should end its public sector company.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why a public sector bus company may run routes that a private firm would not.", points: ["Its aim includes service to the public, not only profit", "Remote routes are unprofitable but important for villagers", "The state can pay for losses from taxes"], modelAnswer: "A public sector company aims to serve the public as well as to make profit, so it may run routes villagers need even when fares do not cover costs. The state can cover the losses from tax revenue.", explanation: "Aims, the case and funding." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether the government should allow the private operator to take over the profitable routes.", points: ["Benefit: private efficiency and lower cost to the state", "Risk: the public company would keep only loss-making routes, raising its losses", "Remote villages could lose service if funding falls", "Alternative: require the private operator to run some remote routes or pay a subsidy", "Condition: depends on how much service for remote villages the government values", "Judgement and reason"], modelAnswer: "A private operator may run the town routes more efficiently, saving public money. But the public company would be left with only loss-making routes, and villages could lose service. A better option may be to allow the private firm in, but require it to run some rural routes or fund them. The right choice depends on how much the government values the remote service compared with the savings.", hints: ["Think about what is left for the public company after the profitable routes go."], explanation: "Both sides, an alternative and a conditional judgement." }),
    ],
    hints: ["Who would serve the villages?"],
    explanation: "Public bodies serve social aims; taking only the profitable routes weakens that service.",
  });

  b.card("DEFINITION", "Primary sector", "Businesses that extract or grow natural resources: farming, fishing, forestry and mining.");
  b.card("DEFINITION", "Secondary sector", "Businesses that turn raw materials into goods: manufacturing, processing and construction.");
  b.card("DEFINITION", "Tertiary sector", "Businesses that provide services: retail, transport, banking, tourism, health and education.");
  b.card("DEFINITION", "Quaternary sector", "Knowledge-based activities: research and development, information technology and consulting.");
  b.card("DEFINITION", "Industrialisation", "The shift of an economy from mainly primary production towards manufacturing.");
  b.card("DEFINITION", "Public sector and private sector", "Public: owned by the state or a local authority. Private: owned by individuals or companies.");
  b.card("CONCEPT", "Chain of production", "The stages from raw material to consumer; value is added at each stage by different firms.");
  b.card("CONCEPT", "Deindustrialisation", "The decline of manufacturing as a share of output and jobs, because of closure, relocation or higher productivity.");
  b.card("FACT", "Why services grow with income", "Rising incomes raise demand for services such as tourism, education and banking faster than for basic goods; technology also creates new services.");
});
