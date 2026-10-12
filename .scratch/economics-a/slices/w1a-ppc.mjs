// W1a: production possibility curves (both boards; decreasing opportunity cost is ZIMSEC detail).
import { concept, P, chk, fmt, table, ZIM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

/** PPC schedule with checked trade-offs; oc[i] = movement from row i to row i+1. */
function ppc(labels, x, y, xName, yName) {
  const oc = [];
  for (let i = 1; i < x.length; i++) {
    if (!(x[i] > x[i - 1] && y[i] < y[i - 1])) throw new Error("PPC rows must trade off");
    oc.push({ dx: x[i] - x[i - 1], dy: y[i - 1] - y[i], per: (y[i - 1] - y[i]) / (x[i] - x[i - 1]) });
  }
  return { md: table(["Combination", xName, yName], labels.map((l, i) => [l, x[i], y[i]])), oc };
}

concept("aecon.basics.ppc", { file: "basics/ppc", keyPrefix: "basics.ppc" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  // Country Y: tobacco (x) and maize (y), thousand tonnes: increasing cost.
  const L = ["P", "Q", "R", "S", "T"], tob = [0, 15, 30, 45, 60], mz = [90, 87, 78, 57, 0];
  const Y = ppc(L, tob, mz, "Tobacco (thousand tonnes)", "Maize (thousand tonnes)");
  chk(Y.oc[2].dy, 21); chk(Y.oc[3].dy, 57);
  const ctx = `A fictional country, Country Y, can produce the following combinations of tobacco and maize when all its resources are fully and efficiently used (illustrative data).\n\n${Y.md}`;

  mc({ d: 1, skill: "RECALL", stem: "What does a production possibility curve show?",
    explanation: "A PPC shows the maximum combinations of two goods an economy can produce with its resources and technology." },
    ["The maximum combinations of two goods that can be produced with given resources", "Correct."],
    [["The quantities of a good that buyers want at different prices", "That is a demand curve."],
     ["The quantities of a good that firms offer at different prices", "That is a supply curve."],
     ["The growth in total output of an economy over time", "That is a growth rate, not a PPC."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "An economy is producing at a point **inside** its PPC. This shows that",
    explanation: "Inside the curve output is below the maximum, so resources are unemployed or inefficiently used." },
    ["some resources are unemployed or used inefficiently", "Correct."],
    [["the economy is using all its resources fully and efficiently", "That describes a point on the curve."],
     ["the combination cannot be produced with present resources", "That describes a point outside the curve."],
     ["the economy has experienced economic growth", "Growth shifts the curve outwards."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare each combination with the maximum for that amount of tobacco."],
    stem: `${ctx}\n\nWhich combination (tobacco, maize in thousand tonnes) is **unattainable** for Country Y?`,
    explanation: "With 30 of tobacco the most maize possible is 78, so (30, 80) is outside the curve. (15, 80) and (45, 50) are inside; (60, 0) is on it." },
    ["30 of tobacco and 80 of maize", "Correct: the maximum maize at 30 is 78."],
    [["15 of tobacco and 80 of maize", "At 15 the maximum is 87: this point is inside."],
     ["45 of tobacco and 50 of maize", "At 45 the maximum is 57: this point is inside."],
     ["60 of tobacco and 0 of maize", "This is combination T, on the curve."]]);

  b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: Y.oc[2].dy, unit: "tonnes", daily: true,
    stem: `${ctx}\n\nCountry Y moves from combination R to combination S. How many thousand tonnes of maize are given up?`,
    wrong: [mz[3], Y.oc[2].dx],
    explanation: `Maize falls from ${mz[2]} to ${mz[3]}: ${mz[2]} − ${mz[3]} = ${Y.oc[2].dy} thousand tonnes. ${mz[3]} is the maize still produced at S, and ${Y.oc[2].dx} is the extra tobacco.` });

  {
    const per = Y.oc[3].per; // S to T: 57 / 15 = 3.8
    chk(per, 3.8);
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: per, dp: 1, calculator: true, unit: "tonnes",
      stem: `${ctx}\n\nCalculate the opportunity cost of **one** extra thousand tonnes of tobacco when Country Y moves from S to T, in thousand tonnes of maize, to one decimal place.`,
      wrong: [15 / 57, 57], hints: ["Find the change in each good first."],
      explanation: `1. Extra tobacco: 60 − 45 = 15 thousand tonnes.\n2. Maize given up: 57 − 0 = 57 thousand tonnes.\n3. Per thousand tonnes of tobacco: 57 ÷ 15 = **${fmt(per, 1)}**.\n\nDividing the other way (0.3) turns the ratio upside down; 57 is the cost of all 15 units.` });
  }

  mc({ d: 3, skill: "ANALYSIS", hints: ["Why are the first resources moved the best suited?"],
    stem: "A concave (bowed-out) PPC shows increasing opportunity cost. The main reason is that",
    explanation: "Resources are not equally good at producing both goods; as production of one good rises, less suitable resources are moved, so more of the other good is sacrificed for each extra unit." },
    ["resources are not equally suited to producing both goods", "Correct: later resources are less suitable."],
    [["all resources are equally suited to producing both goods", "That would give a straight line."],
     ["the prices of both goods rise as more is produced", "A PPC shows quantities, not prices."],
     ["the economy has unemployed resources at every point", "Points on the curve are fully employed."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which event would shift an economy's PPC outwards?",
    explanation: "A discovery of resources raises productive capacity. A fall in unemployment is a movement towards the curve, and a price rise does not change capacity." },
    ["The discovery of a large new mineral deposit that can be mined", "Correct: more resources."],
    [["A fall in unemployment that brings idle workers into jobs", "This moves the economy to the curve; it does not shift the curve."],
     ["A rise in the price of both goods produced in the economy", "Prices do not change capacity."],
     ["A decision to produce more consumer goods and fewer capital goods", "This is a movement along the curve."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Does the event destroy resources or only idle them?"],
    stem: "A severe flood destroys roads, bridges and farm machinery in a fictional country. What is the effect on its PPC?",
    explanation: "Destruction of capital reduces productive capacity, so the PPC shifts inwards." },
    ["It shifts inwards", "Correct: capacity falls."],
    [["It shifts outwards", "Capacity has fallen, not risen."],
     ["It does not move, but the economy moves outside the curve", "A point outside is unattainable."],
     ["The economy moves along the curve to a point with more capital goods", "Destruction changes the curve, not the position along it."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A straight-line PPC implies",
    explanation: "A straight line means each unit of one good always costs the same amount of the other: constant opportunity cost." },
    ["constant opportunity cost", "Correct."],
    [["increasing opportunity cost", "That gives a bowed-out curve."],
     ["decreasing opportunity cost", "That gives a bowed-in curve."],
     ["zero opportunity cost", "Moving along the curve always has a cost."]]);

  {
    const maxAt = 87, act = 70, short = maxAt - act, shortPct = (short / maxAt) * 100;
    chk(short, 17);
    // With 15 thousand tonnes of tobacco, actual maize is 70, potential is 87.
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: shortPct, dp: 1, calculator: true, unit: "%", hints: ["Shortfall ÷ potential output × 100."],
      stem: `${ctx}\n\nCountry Y produces 15 thousand tonnes of tobacco and 70 thousand tonnes of maize. By what percentage is its maize output below the maximum possible at that level of tobacco output? Give your answer to one decimal place.`,
      wrong: [(17 / 70) * 100, 17],
      explanation: `1. Maximum maize with 15 of tobacco: ${maxAt}.\n2. Shortfall: ${maxAt} − ${act} = ${short}.\n3. As a percentage of potential: ${short} ÷ ${maxAt} × 100 = **${fmt(shortPct, 1)}%**.\n\nDividing by the actual output (24.3%) uses the wrong base.` });
  }

  mc({ d: 4, skill: "ANALYSIS", hints: ["Which intercepts change when technology improves only one good?"],
    stem: "A new tractor design raises the maximum output of maize but does not affect the production of tobacco. What happens to the PPC with maize on the vertical axis and tobacco on the horizontal axis?",
    explanation: "The maize intercept rises while the tobacco intercept stays the same, so the curve pivots outwards on the maize axis." },
    ["The vertical intercept rises while the horizontal intercept stays the same", "Correct: the curve pivots outwards on the maize axis."],
    [["The horizontal intercept rises while the vertical intercept stays the same", "That would be an improvement in tobacco output."],
     ["Both intercepts rise by the same proportion", "Only maize capacity has improved."],
     ["The curve shifts inwards on the maize axis only", "Technology improves capacity; it does not reduce it."]]);

  mc({ d: 3, skill: "UNDERSTANDING", applies: ZIM, hints: ["Which shape shows a falling cost of one good in terms of the other?"],
    stem: "A PPC that is bowed **in** towards the origin (convex) shows",
    explanation: "A convex PPC shows decreasing opportunity cost: each extra unit of a good costs less of the other, for example because of economies of scale." },
    ["decreasing opportunity cost", "Correct: ZIMSEC detail."],
    [["increasing opportunity cost", "That gives a concave curve."],
     ["constant opportunity cost", "That gives a straight line."],
     ["unemployed resources", "Unemployment is shown by a point inside any curve."]]);

  b.tf({ d: 1, skill: "RECALL", stem: "A movement along a PPC represents economic growth.", answer: false,
    explanation: "False. Growth is an outward shift of the curve. A movement along it only changes the mix of the two goods." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A PPC is drawn on the assumption that resources and technology are fixed.", answer: true,
    explanation: "True. A change in either shifts the curve." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each situation to the correct description.",
    pairs: [
      ["A point on the PPC", "Productively efficient"],
      ["A point inside the PPC", "Unemployed or inefficiently used resources"],
      ["A point outside the PPC", "Unattainable with present resources and technology"],
      ["An outward shift of the PPC", "Economic growth in productive capacity"],
    ],
    explanation: "These four positions and movements are the core of the model." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A PPC that is concave to the origin shows {{blank:a}} opportunity cost. A straight-line PPC shows {{blank:b}} opportunity cost.",
    blanks: [{ id: "a", accepted: ["increasing"], choices: ["increasing", "constant", "decreasing"] }, { id: "b", accepted: ["constant"], choices: ["increasing", "constant", "decreasing"] }],
    wrong: [["constant", "increasing"]],
    explanation: "Concave: increasing cost. Straight: constant cost." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of efficiency achieved by an economy producing at a point on its PPC.",
    accepted: ["productive efficiency", "productive"], wrong: ["allocative efficiency"],
    explanation: "Productive efficiency: no more of one good can be produced without producing less of the other." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Why do resources differ in suitability?"],
    stem: "Explain why a production possibility curve is usually concave to the origin.",
    points: ["Resources are not equally suited to producing both goods.", "As output of one good increases, resources less suited to it are moved.", "So more of the other good must be given up for each extra unit: opportunity cost increases."],
    modelAnswer: "Resources such as land and workers are better suited to some goods than others. The first resources moved to a good are those best suited to it, but later ones are less suitable, so more of the other good has to be given up for each extra unit. Rising opportunity cost makes the curve bowed outwards.",
    explanation: "Specialised resources lead to increasing opportunity cost." });

  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Which resource changes and how does the curve move?"],
    stem: "Analyse how an increase in the number of skilled workers entering a fictional economy could affect its production possibility curve.",
    points: ["More labour (and human capital) increases the quantity and quality of resources.", "Productive capacity increases.", "The PPC shifts outwards (possibly more for goods needing skills).", "The economy can produce more of both goods, but only if the workers find jobs and are used productively."],
    modelAnswer: "Extra skilled workers increase the quantity and quality of labour, so the economy's productive capacity rises. The PPC shifts outwards, perhaps more for goods that use skilled labour, so more of both goods is possible. This will happen only if the workers are employed; if they are unemployed, actual output stays inside the curve.",
    explanation: "Link resource change to capacity, to the shift, with a limit." });

  // Structured 1: schedule and shifts.
  {
    const Lz = ["A", "B", "C", "D", "E"], cem = [0, 10, 20, 30, 40], bic = [80, 76, 64, 40, 0];
    const Z = ppc(Lz, cem, bic, "Cement (thousand tonnes)", "Bicycles (thousands)");
    chk(Z.oc[2].dy, 24); chk(Z.oc[2].per, 2.4);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Find the row with the same cement output.", "Opportunity cost per unit = amount given up ÷ amount gained."],
      stem: `A fictional economy, Country Z, produces cement and bicycles. The table shows its production possibilities (illustrative data).\n\n${Z.md}\n\nLast year Country Z produced 20 thousand tonnes of cement and 50 thousand bicycles.`,
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Where was last year's output?",
          options: [["Inside the PPC", "Correct: with 20 of cement the maximum is 64 thousand bicycles."], ["On the PPC", "The curve gives 64, not 50."], ["Outside the PPC", "50 is less than 64, so it is attainable."], ["At combination B", "B has 10 of cement."]],
          answer: "A", explanation: "(20, 50) is below C (20, 64)." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: 14, unit: "units", stem: "How many more thousand bicycles could be produced without producing less cement?", wrong: [64, 50], explanation: "64 − 50 = 14 thousand bicycles." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: Z.oc[2].per, dp: 1, unit: "units", stem: "Calculate the opportunity cost of one extra thousand tonnes of cement when moving from C to D, in thousand bicycles, to one decimal place.", wrong: [24, 0.4],
          explanation: "Bicycles given up: 64 − 40 = 24 thousand for 10 thousand tonnes of cement; 24 ÷ 10 = 2.4." }),
        P.manual({ label: "(d)", marks: 4, stem: "Analyse **two** possible reasons why Country Z produced inside its PPC last year.",
          points: ["Reason 1 identified (for example unemployment of workers).", "Reason 1 explained: idle labour means output is below the maximum.", "Reason 2 identified (for example power cuts or shortages of imported parts).", "Reason 2 explained: machines stand idle so fewer goods are made."],
          modelAnswer: "First, there may have been unemployment, so workers who could have produced bicycles were idle and output was below the maximum. Second, power cuts may have stopped factories for part of the year, so machines stood idle and fewer goods were made than the resources could produce." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain **one** way Country Z could shift its PPC outwards.",
          points: ["A cause identified (for example investment in machines, training or new technology).", "Explained: productive capacity rises so more of both goods can be produced."],
          modelAnswer: "It could invest in new machines and train workers, which would raise its productive capacity so that more cement and bicycles could be produced at every point." }),
      ],
      explanation: "(20, 50) is inside the curve; 14 thousand more bicycles; 2.4 thousand bicycles per thousand tonnes of cement between C and D." });
  }

  // Structured 2: evaluation with consumer vs capital goods and a growth shift.
  {
    const Lk = ["J", "K", "L", "M"], cons = [0, 30, 60, 90], cap = [60, 54, 40, 0];
    const K = ppc(Lk, cons, cap, "Consumer goods (thousand units)", "Capital goods (thousand units)");
    chk(K.oc[1].dy, 14);
    b.struct({ d: 5, skill: "EVALUATION", examStyle: true, hints: ["Consider today against the future."],
      stem: `A fictional economy can produce the following combinations of consumer goods and capital goods (illustrative data).\n\n${K.md}\n\nIts government must choose between combination K and combination L.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: K.oc[1].dy, unit: "units", stem: "Calculate the opportunity cost, in thousand units of capital goods, of moving from K to L.", wrong: [40, 30], explanation: "54 − 40 = 14 thousand units of capital goods." }),
        P.fib({ label: "(b)", marks: 2, stem: "Complete the sentences.", template: "Choosing K gives {{blank:a}} consumer goods than L. Choosing K gives {{blank:b}} capital goods than L.",
          blanks: [{ id: "a", accepted: ["fewer"], choices: ["more", "fewer"] }, { id: "b", accepted: ["more"], choices: ["more", "fewer"] }], explanation: "K has 30 consumer goods (fewer than L's 60) and 54 capital goods (more than L's 40)." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why both K and L are productively efficient.",
          points: ["Both lie on the PPC.", "Resources are fully used, so more of one good means less of the other."],
          modelAnswer: "Both combinations are on the PPC, so resources are fully employed and more of either good can only be produced by giving up some of the other." }),
        P.manual({ label: "(d)", marks: 6, stem: "Discuss whether the government should choose combination K or combination L.",
          points: ["K has more capital goods, which can raise future capacity and growth.", "Developed: more machines and infrastructure shift the PPC outwards later.", "L raises living standards now with more consumer goods.", "Developed: poor households may need food and clothing today.", "Uses the figures (14 thousand capital goods given up for 30 thousand consumer goods).", "A justified conclusion (for example depends on how poor people are now and how productive the investment is)."],
          levels: [[3, 5, 6, "Two-sided, developed, justified conclusion."], [2, 3, 4, "Some analysis, limited conclusion."], [1, 1, 2, "Simple points."]],
          modelAnswer: "Combination K gives 54 thousand capital goods, which would raise the economy's productive capacity and could shift the PPC outwards in future, but only 30 thousand consumer goods now. L gives 30 thousand more consumer goods at an opportunity cost of 14 thousand capital goods. If many people are poor, L may be better because basic needs must be met now; if living standards are adequate, K is better for growth. On balance a point nearer K may be best for a developing economy, provided the investment is productive and the short-term cost to households is not too severe." }),
      ],
      explanation: "Moving from K to L trades future capacity for present consumption; both are on the curve." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Name uses and limits.", "End with a judgement."],
    stem: "Assess the usefulness of the production possibility curve for explaining the problems facing an economy such as Zimbabwe's.",
    points: ["Shows scarcity and choice between goods.", "Illustrates opportunity cost and unemployed resources.", "Shows growth as an outward shift and how investment affects it.", "Can describe the effect of drought or loss of skilled workers.", "Limited to two goods when real economies make many.", "Assumes fixed technology and ignores prices and distribution.", "Hard to measure real curves.", "A justified judgement: useful for reasoning, less so for precise policy."],
    levels: LV8,
    modelAnswer: "The PPC is useful because it makes the central ideas of scarcity, choice and opportunity cost visible. It can show how unemployed workers or idle factories put an economy inside its curve, how a drought or the emigration of skilled workers shifts it inwards, and how investment and education shift it outwards. However, it considers only two goods when an economy such as Zimbabwe's produces many, assumes fixed technology, and says nothing about prices or who receives the output. Real PPCs also cannot be measured accurately. The curve is therefore a helpful tool for reasoning about trade-offs and growth, but it must be supported by data and other models before it is used to advise on specific policies.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the uses of the PPC against its limits." });

  b.card("DEFINITION", "Define a **production possibility curve**.", "A curve showing the maximum combinations of two goods an economy can produce with its resources and technology when resources are fully and efficiently used.");
  b.card("CONCEPT", "What does a point **inside** the PPC show?", "Unemployed or inefficiently used resources: more of both goods could be produced.");
  b.card("CONCEPT", "What does a point **outside** the PPC show?", "A combination that is unattainable with present resources and technology.");
  b.card("FORMULA", "Opportunity cost per unit on a PPC", "Units of the other good given up ÷ units of the good gained.");
  b.card("CONCEPT", "What shape shows **increasing** opportunity cost?", "A PPC that is concave to the origin (bowed outwards), because resources are not equally suited to both goods.");
  b.card("CONCEPT", "What shape shows **constant** opportunity cost?", "A straight-line PPC, because resources are equally suited to both goods.");
  b.card("CONCEPT", "What shape shows **decreasing** opportunity cost?", "A PPC that is convex to the origin (bowed inwards).", "ZIMSEC detail.", { applies: ZIM });
  b.card("CONCEPT", "Give **three** causes of an outward shift of the PPC.", "More resources, better technology, and more education, training or investment.");
  b.card("CONCEPT", "Name **two** limits of the PPC model.", "It shows only two goods and fixed technology; it ignores prices and distribution.");
});
