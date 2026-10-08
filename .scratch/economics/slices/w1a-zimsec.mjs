// W1a: ZIMSEC Paper 3 essays (STRUCTURED 10 = (a) explain/describe 4 + (b) discuss 6), self-marked.
import { concept, P, ZIM } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];

concept("econ.basics.scarcity", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.basics.scarcity", "econ.systems.types", "econ.systems.market-economy", "econ.systems.planned-mixed"],
    stem: "Every economy must deal with the basic economic problem, whatever its economic system.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain the basic economic problem and the three basic economic questions that it creates.",
        points: [
          "The basic economic problem: finite (limited) resources but unlimited wants, so choices must be made (scarcity).",
          "What to produce: which goods and services, and in what quantities (with an example).",
          "How to produce: which combination of factors and methods, for example labour-intensive or capital-intensive (with an example).",
          "For whom to produce: how output is distributed among people, for example by ability to pay or by need (with an example).",
        ],
        modelAnswer: "The basic economic problem is scarcity: resources such as land, labour, capital and enterprise are finite, while human wants are unlimited, so every society must choose how to use its resources. This creates three questions. What to produce: for example, whether to grow more maize or more tobacco, or build more schools or more roads. How to produce: for example, whether a mine should use many workers with simple tools or a few workers with large machines. For whom to produce: whether goods go to those who can pay the most, to those in greatest need, or are shared equally.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Discuss whether a market economy answers these questions better than a planned economy.",
        points: [
          "Market economy: consumer sovereignty and price signals mean firms produce what people want (what), explained.",
          "Market economy: competition and the profit motive lead to efficient, low-cost methods and innovation (how), explained.",
          "Against the market: goods go to those who can pay, so inequality; merit and public goods under-provided (for whom), explained.",
          "Planned economy: the state can meet everyone's basic needs and reduce inequality.",
          "Against planning: without price signals planners misjudge wants (shortages and surpluses) and incentives are weak.",
          "Justified conclusion (for example markets answer what and how better; planning may answer for whom more fairly; a mixed economy combines them).",
        ],
        levels: LV6,
        modelAnswer: "A market economy answers what to produce through consumer sovereignty: when people want more of a good its price and profit rise and firms produce more, so output matches wants. It answers how to produce efficiently, because competition and the profit motive push firms to use the cheapest methods and to innovate. However, it answers for whom by ability to pay, so the poor may go without basic goods, and it does not provide public goods such as street lighting or enough merit goods such as education. A planned economy can make sure that everyone's basic needs are met and keep inequality low. But planners have no price signals, so they often produce too much of some goods and too little of others, and workers paid the same whatever they produce have little incentive to be efficient. On balance a market economy answers what and how better, while a planned economy may answer for whom more fairly. This is why most countries, including Zimbabwe, use a mixed economy.",
      }),
    ],
    explanation: "(a) Scarcity (finite resources, unlimited wants) forces choices about what, how and for whom. (b) Markets are stronger on what and how (signals, incentives); planning is stronger on fairness; a balanced answer concludes, often in favour of a mixed economy.",
    hints: ["(a) Define the problem first, then one example for each question.", "(b) Compare both systems on each question before concluding."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.basics.ppc", "econ.basics.opportunity-cost", "econ.basics.ppc-shapes-shifts", "econ.basics.factors-of-production"],
    stem: "A production possibility curve (PPC) shows the choices open to an economy and how they change over time.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "With the help of a production possibility curve, explain the meaning of opportunity cost.",
        points: [
          "Defines opportunity cost as the next best alternative forgone.",
          "Describes the PPC: two goods on labelled axes, a curve (bowed outwards) showing maximum combinations with all resources employed.",
          "Shows a movement along the curve from one point to another, with more of one good and less of the other.",
          "Explains that the amount of the other good given up is the opportunity cost (rising along a concave curve).",
        ],
        modelAnswer: "Opportunity cost is the next best alternative given up when a choice is made. A PPC with, for example, capital goods on the vertical axis and consumer goods on the horizontal axis shows the maximum combinations an economy can produce when all its resources are fully employed. If the economy moves along the curve from point A to point B to produce more consumer goods, it must produce fewer capital goods, because resources are moved from one use to the other. The capital goods given up are the opportunity cost of the extra consumer goods. Because the curve is bowed outwards, each extra unit of consumer goods costs more capital goods than the last.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Discuss whether investment in education and training is the best way for Zimbabwe to shift its production possibility curve outwards.",
        points: [
          "Explains how education and training raise the quality of labour (productivity), shifting the PPC outwards.",
          "Develops: lasting benefits, skilled workers attract investment and use new technology.",
          "Limitation: benefits take years; trained workers may emigrate; skills need jobs and capital to be used.",
          "Explains an alternative: investment in capital (machinery, infrastructure, power supply) or new technology.",
          "Explains another alternative: discovering and developing natural resources (for example minerals, irrigated land) or improving health care.",
          "Justified conclusion (for example education is essential for long-run growth but works best combined with investment in capital and infrastructure).",
        ],
        levels: LV6,
        modelAnswer: "Education and training raise the quality of labour: skilled workers produce more per hour, make fewer mistakes and can use new technology, so the economy can produce more of all goods and the PPC shifts outwards. The benefits also last for a worker's whole career. However, education takes years to pay off, some trained workers such as nurses and engineers may emigrate, and skills add little output if there are no jobs, machines or reliable electricity to use them. Other ways to shift the PPC include investment in capital, such as machinery, roads and power stations, and developing natural resources such as minerals or irrigated land, which can raise capacity more quickly. Better health care also raises the quantity and quality of labour. Education is therefore necessary for long-run growth but is not enough on its own: it works best combined with investment in capital and infrastructure that lets skilled workers be productive.",
      }),
    ],
    explanation: "(a) On a PPC, moving along the curve gives up some of one good: that amount is the opportunity cost. (b) Education raises labour quality, but its effect is slow and depends on capital, jobs and keeping skilled workers; compare with other causes of an outward shift.",
    hints: ["(a) Define, describe the curve, show a movement, name what is given up.", "(b) Give the case for education, its limits and at least one alternative before concluding."],
  });
});
