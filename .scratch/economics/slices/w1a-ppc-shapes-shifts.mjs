// W1a: PPC shapes (concave, straight-line, convex: ZIMSEC depth) and shifts (causes, consequences for growth).
import { concept, P, table, fmt, check, ZIM } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];
const LV4 = [
  [3, 4, 4, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 2, 3, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 1, "Simple points, little explanation."],
];
/** Amount of y given up for each step in x (y falls as x rises). */
const steps = (x, y) => x.slice(1).map((_, i) => {
  if (!(x[i + 1] > x[i] && y[i + 1] < y[i])) throw new Error("PPC rows must trade off");
  return y[i] - y[i + 1];
});

concept("econ.basics.ppc-shapes-shifts", { file: "basics/ppc-shapes-shifts", keyPrefix: "basics.ppc-shapes-shifts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", applies: ZIM,
    stem: "A production possibility curve that is **concave** (bowed outwards from the origin) shows that the opportunity cost of producing more of a good",
    options: [
      ["increases as more of the good is produced", "Correct: each extra unit costs more of the other good."],
      ["stays the same as more of the good is produced", "Constant opportunity cost gives a straight-line PPC."],
      ["decreases as more of the good is produced", "Falling opportunity cost gives a convex PPC."],
      ["is zero as long as resources are employed", "On the curve, more of one good always costs some of the other."],
    ],
    answer: "A",
    explanation: "A concave PPC gets steeper as you move along it: each extra unit of a good costs more of the other good, because resources are not equally suited to both.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these would shift a country's production possibility curve **outwards**?",
    options: [
      ["The discovery of large new mineral deposits", "Correct: more natural resources raise productive capacity."],
      ["A severe drought that destroys much of the harvest", "A drought reduces resources, shifting the curve inwards."],
      ["The emigration of many trained engineers", "Losing skilled labour shifts the curve inwards."],
      ["Workers who were unemployed finding jobs", "Re-employing idle workers moves the economy towards its existing curve."],
    ],
    answer: "A",
    explanation: "An outward shift needs more resources, better-quality resources or better technology. New mineral deposits increase the quantity of land (natural resources).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these would shift a country's production possibility curve **inwards**?",
    options: [
      ["Floods that destroy roads, bridges and farmland", "Correct: capital and land are destroyed, reducing productive capacity."],
      ["A government programme that trains young people", "Better-skilled workers shift the curve outwards."],
      ["New machines that raise output per worker", "Better technology shifts the curve outwards."],
      ["Immigration of skilled workers from abroad", "More labour shifts the curve outwards."],
    ],
    answer: "A",
    explanation: "Destruction of land and capital by floods reduces the quantity of resources, so the economy can produce less of both goods.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Unemployment in an economy falls sharply as idle factories reopen. How is this shown on a PPC diagram?",
    options: [
      ["A movement from a point inside the curve towards the curve", "Correct: existing resources are used more fully; the curve itself does not move."],
      ["An outward shift of the whole production possibility curve", "The quantity of resources has not changed, so the curve stays put."],
      ["An inward shift of the whole production possibility curve", "Nothing has reduced the economy's resources."],
      ["A movement along the curve from one good to the other", "More of both goods is produced, so it is not a trade-off along the curve."],
    ],
    answer: "A",
    explanation: "Falling unemployment means idle resources are used: the economy moves from inside its PPC towards the curve. Only a change in the quantity or quality of resources or in technology shifts the curve.",
  });
  {
    const x = [0, 5, 10, 15], y = [60, 45, 30, 15];
    const s = steps(x, y);
    check("constant", s[0], s[2]);
    b.mcq({
      d: 3, skill: "ANALYSIS", applies: ZIM,
      stem: `An economy's production possibilities are shown below.\n\n${table(["Cotton (thousand bales)", "Wheat (thousand tonnes)"], x.map((v, i) => [v, y[i]]))}\n\nWhat shape is its production possibility curve?`,
      options: [
        ["A straight line, because the opportunity cost is constant", "Correct: each extra 5 thousand bales of cotton costs 15 thousand tonnes of wheat."],
        ["Concave, because the opportunity cost of cotton is rising", "The wheat given up does not rise; it is 15 every time."],
        ["Convex, because the opportunity cost is falling", "The wheat given up does not fall; it is 15 every time."],
        ["Concave, because both goods are produced", "Shape depends on how opportunity cost changes, not on producing two goods."],
      ],
      answer: "A",
      explanation: `Wheat given up for each extra 5 thousand bales: ${s.join(", ")}. A constant opportunity cost gives a straight-line PPC.`,
      hints: ["Work out the wheat given up between each pair of rows.", "Is it rising, falling or constant?"],
    });
  }
  {
    const x = [0, 10, 20, 30], y = [90, 60, 40, 30];
    const s = steps(x, y);
    if (!(s[0] > s[1] && s[1] > s[2])) throw new Error("not falling");
    b.mcq({
      d: 3, skill: "ANALYSIS", applies: ZIM,
      stem: `An economy's production possibilities are shown below.\n\n${table(["Good X (thousand units)", "Good Y (thousand units)"], x.map((v, i) => [v, y[i]]))}\n\nWhich statement describes its PPC?`,
      options: [
        ["It is convex: the opportunity cost of good X falls as more is produced", `Correct: the amounts of Y given up are ${s.join(", ")}, so the cost falls.`],
        ["It is concave: the opportunity cost of good X rises as more is produced", "The amounts of Y given up fall, so the cost is not rising."],
        ["It is a straight line: the opportunity cost of good X is constant", "The amounts of Y given up change at each step."],
        ["It shows no opportunity cost because good X keeps rising", "Every extra 10 thousand units of X costs some Y."],
      ],
      answer: "A",
      explanation: `Good Y given up for each extra 10 thousand units of X: ${s.join(", ")}. Falling opportunity cost gives a curve bowed inwards towards the origin: a convex PPC.`,
      hints: ["Find the fall in Y for each step in X."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Why is the production possibility curve of most economies concave (bowed outwards)?",
    options: [
      ["Resources are not equally suited to producing every good", "Correct: as output of one good rises, less suitable resources are switched to it, so the opportunity cost rises."],
      ["All resources are equally productive in every industry", "That would give a constant opportunity cost and a straight-line PPC."],
      ["Technology improves every year in most economies", "Technology shifts the curve; it does not explain its shape."],
      ["Some resources are always left unemployed", "Unemployment puts the economy inside the curve; it does not shape the curve."],
    ],
    answer: "A",
    explanation: "Resources are specialised. The first units of a good use the resources best suited to it; later units need resources better suited to the other good, so each extra unit costs more.",
    hints: ["Would a tailor be as productive on a farm as a farmer?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An economy produces maize and cement. A new drought-tolerant maize seed raises maize yields, but nothing changes in cement production. How does the PPC change?",
    options: [
      ["It pivots outwards along the maize axis only", "Correct: maximum maize rises; maximum cement is unchanged."],
      ["It shifts outwards evenly along both axes", "Cement technology and resources are unchanged."],
      ["It pivots outwards along the cement axis only", "The change affects maize, not cement."],
      ["It does not change, as the economy moves along it", "Better technology changes what can be produced, so the curve moves."],
    ],
    answer: "A",
    explanation: "A change that affects only one good moves only that good's end point. The curve pivots outwards along the maize axis, keeping its end point on the cement axis.",
    hints: ["Which end point of the curve changes?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A country's PPC shifted outwards over five years, but its actual output of both goods stayed the same. Which is the most likely explanation?",
    options: [
      ["Unemployment rose, so the new capacity was not used", "Correct: the economy moved further inside its new curve."],
      ["The new technology made both goods cheaper to produce", "Cheaper production would normally raise output, not leave it unchanged."],
      ["The country discovered further natural resources", "This would shift the curve out more; it does not explain unused capacity."],
      ["The opportunity cost of both goods increased", "That describes the shape of the curve, not the gap between actual and potential output."],
    ],
    answer: "A",
    explanation: "An outward shift raises potential output. Actual output rises only if resources are used; with rising unemployment the economy is further inside its new PPC.",
    hints: ["Potential output and actual output are different.", "Where is the economy relative to the new curve?"],
  });
  b.tf({
    d: 1, skill: "RECALL", applies: ZIM,
    stem: "A straight-line production possibility curve shows a constant opportunity cost.",
    answer: true,
    explanation: "True. A constant slope means each extra unit of one good always costs the same amount of the other.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An outward shift of the production possibility curve means that actual output has increased.",
    answer: false,
    explanation: "False. It means potential output has increased. Actual output rises only if the extra resources are used.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the direction in which each event would shift a country's PPC.",
    template: "Better health care for workers: {{blank:a}}. Large-scale soil erosion: {{blank:b}}. Investment in new irrigation schemes: {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["outwards"], choices: ["outwards", "inwards"] },
      { id: "b", accepted: ["inwards"], choices: ["outwards", "inwards"] },
      { id: "c", accepted: ["outwards"], choices: ["outwards", "inwards"] },
    ],
    wrong: [["inwards", "outwards", "outwards"]],
    explanation: "Healthier workers are more productive (better quality of labour): outwards. Soil erosion reduces usable land: inwards. Irrigation brings more land into use and raises yields: outwards.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each event to its effect on a PPC diagram.",
    pairs: [
      ["A cyclone destroys farms and roads", "The PPC shifts inwards"],
      ["Workers are trained in new skills", "The PPC shifts outwards"],
      ["Idle factories start working again", "A movement from inside the PPC towards it"],
      ["Better technology in only one industry", "The PPC pivots along one axis"],
    ],
    explanation: "Loss of resources shifts the curve in; better-quality resources shift it out; using idle resources moves the economy towards the curve; a change in one industry pivots the curve.",
  });
  {
    const x = [0, 4, 8, 12, 16], y = [50, 48, 42, 30, 0];
    const s = steps(x, y);
    b.num({
      d: 3, skill: "APPLICATION", applies: ZIM, kind: "plain", value: s[3],
      stem: `An economy's production possibilities are shown below.\n\n${table(["Copper (thousand tonnes)", "Sugar (thousand tonnes)"], x.map((v, i) => [v, y[i]]))}\n\nHow many thousand tonnes of sugar are given up to produce the **last** 4 thousand tonnes of copper?`,
      wrong: [s[0], s[2]],
      explanation: `From 12 to 16 thousand tonnes of copper, sugar falls from ${y[3]} to ${y[4]}: ${s[3]} thousand tonnes given up. The first 4 thousand tonnes cost only ${s[0]}, so the opportunity cost rises (${s.join(", ")}): the PPC is concave.`,
      hints: ["Use the last two rows of the table."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** cause of an outward shift of a country's production possibility curve.",
    points: [
      "Identifies a cause: more resources (discovery, investment, immigration), better quality (education, health) or better technology.",
      "Explains that this raises productive capacity, so more of both goods can be produced.",
    ],
    explanation: "Any increase in the quantity or quality of resources, or in technology, raises the maximum the economy can produce.",
    modelAnswer: "More investment in machinery increases the quantity of capital, so workers can produce more output; the economy can now produce more of both goods, so the PPC shifts outwards.",
    hints: ["Quantity of resources, quality of resources or technology?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A cyclone destroys bridges, irrigation canals and crops in an economy that produces agricultural goods and manufactured goods. Describe the diagram you would draw to show the effect on its production possibility curve.",
    points: [
      "Labels the axes: agricultural goods and manufactured goods.",
      "Draws the original curve labelled PPC1, bowed outwards.",
      "Draws a new curve PPC2 inside PPC1 (an inward shift), with an arrow showing the direction.",
      "Explains that the inward shift shows a fall in productive capacity because land and capital were destroyed.",
    ],
    explanation: "Loss of capital and land shifts the curve inwards. The answer needs labelled axes, both curves labelled and the direction of the shift.",
    modelAnswer: "Agricultural goods on the horizontal axis and manufactured goods on the vertical axis. The original curve PPC1 is bowed outwards. A second curve PPC2 lies inside PPC1, with an arrow pointing inwards. The shift shows that the destruction of bridges, canals and crops has reduced the economy's productive capacity, so it can produce less of both goods.",
    hints: ["You need two curves.", "Which way does the curve move when resources are destroyed?"],
  });
  {
    const fx = [0, 15, 30, 45, 60], before = [120, 114, 99, 69, 0], after = [140, 134, 120, 95, 50];
    for (let i = 0; i < fx.length; i++) if (!(after[i] > before[i])) throw new Error("not outward");
    steps(fx, before);
    steps(fx, after);
    const gain = after[3] - before[3];
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true,
      stem: `A fictional economy produces food and manufactured goods. The table shows the maximum output of manufactured goods at different levels of food output, before and after five years of investment in schools and machinery.\n\n${table(["Food (thousand tonnes)", "Manufactured goods before (thousand units)", "Manufactured goods after (thousand units)"], fx.map((v, i) => [v, before[i], after[i]]))}`,
      parts: [
        P.fib({
          label: "(a)", marks: 1,
          stem: "Complete the sentence.",
          template: "The production possibility curve has shifted {{blank:a}}.",
          blanks: [{ id: "a", accepted: ["outwards"], choices: ["outwards", "inwards", "along the curve"] }],
          explanation: "At every food output the maximum of manufactured goods is higher, so the curve has shifted outwards.",
        }),
        P.num({
          label: "(b)", marks: 1, kind: "plain", value: gain,
          stem: "With 45 thousand tonnes of food, how many more thousand units of manufactured goods can now be produced?",
          wrong: [after[3], before[3] - after[3]],
          explanation: `${after[3]} − ${before[3]} = ${gain} thousand units.`,
        }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain how investment in schools could have caused this change.",
          points: [
            "Education and training raise the quality (skills, productivity) of labour.",
            "More productive workers mean more output from the same resources, so capacity rises.",
          ],
          modelAnswer: "Investment in schools gives workers more skills, so each worker can produce more. The same labour force can now make more food and more manufactured goods, so productive capacity rises.",
        }),
        P.manual({
          label: "(d)", marks: 4,
          stem: "Discuss whether the shift means that people's living standards will rise.",
          points: [
            "Yes: potential output of both goods is higher, so more goods could be consumed.",
            "But actual output rises only if resources are fully employed (unemployment would leave the economy inside the new curve).",
            "The extra output may go to capital goods or exports rather than consumption, or be unequally shared; population growth may also absorb it.",
            "Justified conclusion (for example living standards are likely to rise only if the new capacity is used and shared).",
          ],
          levels: LV4,
          modelAnswer: "The shift means the economy can produce more of both goods, so living standards could rise. However, this is only potential output: if unemployment is high, actual output may stay inside the new curve. Even if output rises, it may be used for more capital goods or exports, or go mainly to a few people, and a growing population means more people share it. Living standards are likely to rise only if the extra capacity is used and its benefits are widely shared.",
        }),
      ],
      explanation: "An outward shift raises potential output. Whether living standards rise depends on using the capacity, what is produced and how it is shared.",
      hints: ["Compare the two columns row by row.", "Potential output is not the same as actual output."],
    });
  }
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Country W has lost many of its doctors, nurses and engineers to better-paid jobs abroad over the last ten years. At the same time it has opened two new lithium mines with machinery bought from overseas.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Choose the effect of each change on Country W's production possibility curve.",
        template: "Emigration of skilled workers: {{blank:a}}. Opening new lithium mines: {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["inward shift"], choices: ["outward shift", "inward shift", "no shift"] },
          { id: "b", accepted: ["outward shift"], choices: ["outward shift", "inward shift", "no shift"] },
        ],
        explanation: "Losing skilled labour reduces the quantity and quality of resources (inward); new mines and machinery add natural resources and capital (outward).",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Analyse how the emigration of doctors and nurses affects the economy's productive capacity.",
        points: [
          "Fewer skilled workers: the quantity and quality of labour fall.",
          "Fewer health workers means poorer health care, so other workers are ill more often and less productive.",
          "The cost of training the emigrants is lost to the economy.",
          "So the economy can produce less: the PPC shifts inwards (or grows more slowly).",
        ],
        modelAnswer: "When doctors and nurses emigrate, the economy loses skilled labour, so both the quantity and the quality of its labour fall. With fewer health workers, illnesses go untreated and other workers lose working days, lowering their productivity. The money spent training them is also lost. Together these reduce productive capacity, so the PPC shifts inwards.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether the new lithium mines will outweigh the effects of emigration on Country W's productive capacity.",
        points: [
          "Explains how the mines raise capacity (more natural resources and capital, export earnings to buy more capital).",
          "Develops the mines argument (jobs, skills in mining, tax revenue for investment).",
          "Explains that mining uses few workers and may depend on foreign skills and machinery.",
          "Explains that losing health workers affects the whole workforce and is hard to replace quickly.",
          "Considers time: mines raise output quickly, while training replacements takes years; lithium may run out.",
          "Reaches a justified conclusion.",
        ],
        levels: LV6,
        modelAnswer: "The mines add natural resources and capital, so the economy can produce more lithium and earn foreign currency to buy more machinery: this shifts the PPC outwards, and mining jobs and taxes may add more. However, mines employ relatively few people and may rely on foreign skills, while the loss of doctors and nurses lowers the health and productivity of the whole workforce and takes years to replace. Lithium is also a finite resource. In the short run the mines may outweigh the loss, but in the long run the economy's capacity depends more on a healthy, skilled workforce, so the overall effect is uncertain unless the mining revenue is used to train and keep health workers.",
      }),
    ],
    explanation: "Emigration shifts the PPC inwards and new mines shift it outwards; the overall effect depends on the size and timing of each change and how mining revenue is used.",
    hints: ["Treat each change separately first.", "Which effect is quicker? Which lasts longer?"],
  });

  b.card("DEFINITION", "What does a **concave** PPC show?", "Rising opportunity cost: each extra unit of a good costs more of the other good.", null, { applies: ZIM });
  b.card("DEFINITION", "What does a **straight-line** PPC show?", "Constant opportunity cost: resources are equally suited to both goods.", null, { applies: ZIM });
  b.card("DEFINITION", "What does a **convex** PPC show?", "Falling opportunity cost as more of a good is produced.", null, { applies: ZIM });
  b.card("CONCEPT", "Why is the usual PPC concave?", "Resources are not equally suited to every good, so switching less suitable resources raises the opportunity cost.", null, { applies: ZIM });
  b.card("CONCEPT", "Name three causes of an outward shift of the PPC.", "More resources (discovery, investment, immigration), better-quality resources (education, health), better technology.");
  b.card("CONCEPT", "Name three causes of an inward shift of the PPC.", "Natural disasters (drought, cyclone), emigration of skilled workers, war, land degradation or disease.");
  b.card("FACT", "Does a fall in unemployment shift the PPC?", "No. It moves the economy from inside the curve towards it.");
  b.card("CONCEPT", "What does an outward shift of the PPC mean for growth?", "Potential output has risen; actual growth happens only if the extra capacity is used.");
  b.card("CONCEPT", "How is better technology in only one industry shown?", "The PPC pivots outwards along that good's axis only.");
});
