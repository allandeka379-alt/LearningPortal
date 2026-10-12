// W1a: Cambridge exam-format item: one Paper 2 AS essay (8 + 12 marks, microeconomics) on classifying goods.
import { concept, P, EXAM, checkExam, CAM } from "../lib.mjs";

const A = (k) => `aecon.${k}`;
const P2E = { skill: EXAM.CAM_P2_ESSAY.skill, secs: EXAM.CAM_P2_ESSAY.secs, applies: EXAM.CAM_P2_ESSAY.applies, examStyle: true, paper: "Paper 2" };

concept(A("basics.goods-classification"), { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  b.struct({
    ...P2E, d: 5,
    concepts: [A("basics.goods-classification")],
    hints: ["In (a) link non-excludability to free riding and revenue.", "In (b) weigh the case for free provision against its costs and alternatives."],
    stem: "In many countries the government provides education and health care free of charge, but leaves most other goods to be sold by private firms.",
    parts: checkExam(EXAM.CAM_P2_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 350 },
        stem: "Explain why public goods are unlikely to be provided by private firms in a free market.",
        points: [
          "Defines a public good as non-rival (one person's use does not reduce what is available to others).",
          "Defines a public good as non-excludable (non-payers cannot be prevented from using it).",
          "Because of non-excludability, consumers have an incentive to free ride, benefiting without paying.",
          "Consumers will not reveal their true willingness to pay.",
          "A private firm cannot earn revenue by charging for the good.",
          "Without revenue the firm cannot cover its costs or make a profit, so it will not supply the good.",
          "Because the marginal cost of an extra user is zero, charging would exclude some who would benefit without cost, which is inefficient.",
          "Gives an example (street lighting, flood warning, national defence) and notes that the market fails to supply the good, or supplies too little.",
        ],
        modelAnswer: "A public good is non-rival, because one person's use does not reduce the amount available to others, and non-excludable, because people who do not pay cannot be stopped from benefiting. Street lighting is an example. Non-excludability creates a free-rider problem: each person can enjoy the light whether or not they pay, so no one has an incentive to reveal how much they value it or to contribute. A private firm therefore cannot earn revenue from supplying it. Without revenue it cannot cover its costs or make a profit, so it will not provide the good, or will supply much less than society would value. Even if the firm could charge, the marginal cost of one more person using the light is zero, so excluding people who would gain at no cost would be inefficient. The free market therefore fails to supply public goods, which is why governments provide them from tax revenue." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { min: 250, max: 600 },
        levels: [[3, 9, 12, "Developed analysis of both sides, applied to education and health, with a supported judgement."], [2, 5, 8, "Some analysis of one or both sides, limited application or evaluation."], [1, 1, 4, "Simple, undeveloped points."]],
        stem: "Assess whether governments should provide merit goods such as education free of charge.",
        points: [
          "Defines merit goods as goods that are under-consumed in a free market (and society regards as beneficial).",
          "Under-consumption arises from imperfect information: people may undervalue long-term benefits.",
          "Positive externalities: others and society gain (a healthier, more productive workforce), so the private benefit is lower than the social benefit.",
          "Free provision increases consumption to the socially desirable level.",
          "It improves equity: access does not depend on income, which raises opportunities for low-income households.",
          "Education and health are important for long-run growth and development (human capital).",
          "Opportunity cost: the tax revenue used cannot fund other services or tax cuts.",
          "Possible waste: free provision can lead to over-use or inefficiency if costs are not considered.",
          "Quality or capacity problems may arise if funding is insufficient.",
          "Alternatives: subsidies, vouchers, compulsory attendance or information campaigns may target the problem at lower cost.",
          "Free provision is more justified for primary education and basic health than for all levels; a means-tested approach may be better value.",
          "A supported judgement that depends on the good, the income of the country and the quality of the government's spending.",
        ],
        modelAnswer: "Merit goods are goods that society regards as beneficial but which would be under-consumed in a free market, because people may undervalue their long-term benefits or lack information, and because others also benefit through positive externalities such as a healthier and more productive workforce. Providing education free of charge raises consumption towards the level that is best for society and improves equity, because access then depends on need rather than on income, which opens opportunities to poor households and supports long-run growth through human capital. However, free provision has an opportunity cost: the tax revenue used cannot fund other services or lower taxes, and when a service is free there is little incentive to avoid waste, so quality may suffer if funding is inadequate. Alternatives such as subsidies, vouchers or compulsory attendance can sometimes achieve the same increase in consumption at lower cost, and charging those who can afford to pay may release money for the poor. The case for free provision is strongest for basic education and primary health care, where the externalities are large and low-income families would otherwise go without. For other levels, partial charges combined with support for poorer households may be more efficient. On balance governments should provide basic merit goods free, but the extent depends on the country's income and how effectively the money is spent." }),
    ]),
    explanation: "(a) Public goods: non-excludability, free riding and no revenue. (b) Free provision of merit goods corrects under-consumption and improves equity, but has opportunity costs and alternatives.",
  });
});
