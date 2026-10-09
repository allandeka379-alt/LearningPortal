// W1a: production possibility curves: construction from a table, points, movements, opportunity cost, efficiency.
import { concept, P, table, fmt, check } from "../lib.mjs";

/** PPC table with checked trade-offs; oc[i] = movement from row i to row i+1. */
function ppc(labels, x, y, xName, yName) {
  const oc = [];
  for (let i = 1; i < x.length; i++) {
    if (!(x[i] > x[i - 1] && y[i] < y[i - 1])) throw new Error("PPC rows must trade off");
    oc.push({ dx: x[i] - x[i - 1], dy: y[i - 1] - y[i], per: (y[i - 1] - y[i]) / (x[i] - x[i - 1]) });
  }
  return { md: table(["Combination", xName, yName], labels.map((l, i) => [l, x[i], y[i]])), oc, maxY: (xv) => y[x.indexOf(xv)] };
}

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];

concept("econ.basics.ppc", { file: "basics/ppc", keyPrefix: "basics.ppc" }, (b) => {
  // Country Y: tobacco and maize (thousand tonnes).
  const L = ["P", "Q", "R", "S", "T"], tob = [0, 10, 20, 30, 40], mz = [100, 90, 75, 50, 0];
  const Y = ppc(L, tob, mz, "Tobacco (thousand tonnes)", "Maize (thousand tonnes)");
  check("oc R-S", Y.oc[2].dy, 25);
  const ctx = `A fictional country, Country Y, can produce the following combinations of tobacco and maize when all its resources are fully and efficiently employed.\n\n${Y.md}`;

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a production possibility curve show?",
    options: [
      ["The maximum combinations of two goods an economy can produce with its resources", "Correct: the PPC is the boundary of what can be produced when resources are fully used."],
      ["The quantities of a good that consumers will buy at each different price", "That is a demand curve."],
      ["The quantities of a good that firms will offer for sale at each price", "That is a supply curve."],
      ["The changes in the total output of an economy from one year to the next", "That is economic growth over time, not a PPC."],
    ],
    answer: "A",
    explanation: "A PPC shows the maximum combinations of two goods (or groups of goods) that can be produced when all resources are fully and efficiently employed with given technology.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An economy is producing at a point **inside** its production possibility curve. What does this show?",
    options: [
      ["Some resources are unemployed or used inefficiently", "Correct: more of both goods could be produced."],
      ["The economy is producing the maximum possible output", "Maximum output is on the curve, not inside it."],
      ["The combination cannot be produced with present resources", "Points beyond the curve are unattainable; the economy is already at this point."],
      ["The economy has experienced economic growth this year", "Growth shifts the curve outwards; it is not shown by an inside point."],
    ],
    answer: "A",
    explanation: "A point inside the PPC means output is below the maximum: resources are unemployed or used inefficiently.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A point **beyond** (outside) an economy's production possibility curve represents a combination that is",
    options: [
      ["unattainable with present resources and technology", "Correct: the economy does not have the resources to produce it now."],
      ["productively efficient and already being produced", "Efficient combinations lie on the curve."],
      ["inefficient because resources are left unused", "That describes a point inside the curve."],
      ["produced only when there is high unemployment", "Unemployment puts the economy inside the curve, not beyond it."],
    ],
    answer: "A",
    explanation: "Points beyond the PPC cannot be reached with the existing quantity and quality of resources and technology.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which assumption is made when a production possibility curve is drawn?",
    options: [
      ["The quantity of resources and the technology are fixed", "Correct: a PPC is drawn for given resources and technology."],
      ["The economy produces only one good with all its resources", "A PPC shows combinations of two goods."],
      ["Prices of both goods rise as more of each is produced", "A PPC shows quantities, not prices."],
      ["Some workers are always unemployed in the economy", "Points on the curve assume full employment of resources."],
    ],
    answer: "A",
    explanation: "A PPC holds the quantity and quality of resources and the state of technology constant. A change in either shifts the curve.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: Y.oc[2].dy, daily: true,
    stem: `${ctx}\n\nCountry Y moves from combination R to combination S. What is the opportunity cost of the extra tobacco, in thousand tonnes of maize?`,
    wrong: [mz[3], Y.oc[2].dx],
    explanation: `From R to S, maize falls from ${mz[2]} to ${mz[3]} thousand tonnes: ${mz[2]} − ${mz[3]} = ${Y.oc[2].dy} thousand tonnes of maize given up for ${Y.oc[2].dx} thousand tonnes more tobacco. ${mz[3]} is the maize still produced at S, not the amount given up.`,
  });
  {
    const dx = tob[3] - tob[1], dy = mz[1] - mz[3], per = dy / dx;
    b.calc({
      d: 3, skill: "APPLICATION", kind: "plain", value: per, dp: 1, calculator: true,
      stem: `${ctx}\n\nCalculate the opportunity cost of **one** extra thousand tonnes of tobacco when Country Y moves from combination Q to combination S. Give your answer in thousand tonnes of maize to one decimal place.`,
      wrong: [dx / dy, dy],
      explanation: `1. Extra tobacco: ${tob[3]} − ${tob[1]} = ${dx} thousand tonnes.\n2. Maize given up: ${mz[1]} − ${mz[3]} = ${dy} thousand tonnes.\n3. Per thousand tonnes of tobacco: ${dy} ÷ ${dx} = **${fmt(per, 1)}** thousand tonnes of maize.\n\nDividing tobacco by maize (${fmt(dx / dy, 2)}) turns the ratio upside down; ${dy} is the total cost of all ${dx} thousand tonnes, not of one.`,
      hints: ["Find the change in each good first.", "Opportunity cost per unit = amount given up ÷ amount gained."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${ctx}\n\nCountry Y is producing 20 thousand tonnes of tobacco and 60 thousand tonnes of maize. It then moves to combination R. What is the opportunity cost of the extra maize?`,
    options: [
      ["Zero, because unused resources are now employed", "Correct: (20, 60) is inside the curve, so more maize is produced without giving up tobacco."],
      ["15 thousand tonnes of tobacco given up for the maize", "Tobacco stays at 20 thousand tonnes, so none is given up; 15 is the extra maize."],
      ["10 thousand tonnes of tobacco given up for the maize", "Tobacco output does not change in this movement."],
      ["20 thousand tonnes of maize given up for the tobacco", "Maize rises from 60 to 75; nothing is given up."],
    ],
    answer: "A",
    explanation: "At 20 thousand tonnes of tobacco the curve allows 75 thousand tonnes of maize, so (20, 60) is inside the curve. Moving to R uses idle resources: 15 thousand tonnes more maize with no tobacco given up, so the opportunity cost is zero.",
    hints: ["Compare the point with combination R in the table.", "Does tobacco output fall?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `${ctx}\n\nWhich combination (tobacco, maize) is **unattainable** for Country Y?`,
    options: [
      ["30 thousand tonnes of tobacco and 60 thousand tonnes of maize", "Correct: with 30 of tobacco the most maize possible is 50, so 60 is beyond the curve."],
      ["20 thousand tonnes of tobacco and 70 thousand tonnes of maize", "With 20 of tobacco up to 75 of maize is possible: this point is inside the curve."],
      ["40 thousand tonnes of tobacco and 25 thousand tonnes of maize", "This is combination T, on the curve."],
      ["10 thousand tonnes of tobacco and 80 thousand tonnes of maize", "With 10 of tobacco up to 90 of maize is possible: this point is inside the curve."],
    ],
    answer: "A",
    explanation: "Compare each point with the maximum maize for that amount of tobacco: (30, 60) needs more maize than the 50 possible, so it lies beyond the PPC.",
    hints: ["For each option, find the row with the same tobacco output."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `${ctx}\n\nWhat does the table show about the opportunity cost of tobacco as Country Y moves from P towards T?`,
    options: [
      ["Each extra 10 thousand tonnes of tobacco costs more maize than the last", "Correct: the maize given up rises from 10 to 15, 25 and 50 thousand tonnes."],
      ["Each extra 10 thousand tonnes of tobacco costs the same amount of maize", "The maize given up changes with each step, so it is not constant."],
      ["Each extra 10 thousand tonnes of tobacco costs less maize than the last", "The amounts given up rise, they do not fall."],
      ["Extra tobacco can be produced without giving up any maize", "Every movement along the curve reduces maize output."],
    ],
    answer: "A",
    explanation: "Maize given up for each extra 10 thousand tonnes of tobacco: 10, 15, 25, 50. The opportunity cost rises, so the curve gets steeper (it is bowed outwards).",
    hints: ["Work out the maize given up between each pair of rows."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An economy is producing inside its PPC because of long power cuts. Which change would most likely move it **onto** its PPC?",
    options: [
      ["A reliable electricity supply that lets idle factories work again", "Correct: idle resources are re-employed, so output rises to the curve."],
      ["The discovery of a large new deposit of platinum", "A new resource shifts the curve outwards; it does not use idle capacity."],
      ["Emigration of many skilled workers to other countries in the region", "Fewer resources would shift the curve inwards."],
      ["A rise in the price of both goods in the economy", "Prices do not change the economy's productive capacity or its use."],
    ],
    answer: "A",
    explanation: "Producing inside the curve means resources are idle. Restoring power brings idle machines and workers back into use, moving the economy to the curve.",
    hints: ["Is the problem a lack of resources or idle resources?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every point on a production possibility curve shows all resources fully and efficiently employed.",
    answer: true,
    explanation: "True. Points on the PPC are productively efficient: more of one good can only be made by giving up some of the other.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A movement along a production possibility curve from one point to another has no opportunity cost.",
    answer: false,
    explanation: "False. On the curve, more of one good can only be produced by moving resources away from the other, so some of the other good is given up.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A point on the PPC is {{blank:a}}. A point inside the PPC is {{blank:b}}. A point beyond the PPC is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["efficient"], choices: ["efficient", "inefficient", "unattainable"] },
      { id: "b", accepted: ["inefficient"], choices: ["efficient", "inefficient", "unattainable"] },
      { id: "c", accepted: ["unattainable"], choices: ["efficient", "inefficient", "unattainable"] },
    ],
    wrong: [["efficient", "unattainable", "inefficient"]],
    explanation: "On the curve: efficient (full use of resources). Inside: inefficient (idle or wasted resources). Beyond: unattainable with present resources and technology.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each description to the correct idea.",
    pairs: [
      ["A movement along the PPC", "Shows an opportunity cost"],
      ["A movement from inside the PPC to the curve", "Uses idle resources at no opportunity cost"],
      ["A point beyond the PPC", "Cannot be reached with present resources"],
      ["The slope of the PPC between two points", "Measures the amount of one good given up for the other"],
    ],
    explanation: "Movements along the curve trade one good for the other; moving from inside to the curve uses idle resources; points beyond are unattainable; the slope measures opportunity cost.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** reason why an economy might be producing inside its production possibility curve.",
    points: [
      "Identifies a cause (unemployment of workers, idle factories, power or fuel shortages, inefficient methods, strikes).",
      "Explains that output is therefore below the maximum the resources could produce.",
    ],
    explanation: "Any cause of idle or badly used resources puts the economy inside its PPC.",
    modelAnswer: "There may be high unemployment: workers who could be producing goods are idle, so total output is below the maximum the economy's resources could produce.",
    hints: ["Think of resources that are not being used."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: `${ctx}\n\nDescribe the diagram you would draw to show the opportunity cost of Country Y moving from combination Q to combination R.`,
    points: [
      "Labels the axes: tobacco (thousand tonnes) on one axis and maize (thousand tonnes) on the other.",
      "Draws a downward-sloping PPC bowed outwards through the five combinations, labelled PPC.",
      "Marks Q (10, 90) and R (20, 75) on the curve.",
      "Shows the change: tobacco up by 10 thousand tonnes and maize down by 15 thousand tonnes, the maize lost being the opportunity cost.",
    ],
    explanation: "A full description labels axes, draws and labels the curve, marks both points and identifies the amount of maize given up between them.",
    modelAnswer: "Tobacco on the horizontal axis and maize on the vertical axis, both in thousand tonnes. A PPC bowed outwards from 100 on the maize axis to 40 on the tobacco axis. Point Q at 10 tobacco, 90 maize and point R at 20 tobacco, 75 maize. Dotted lines to the axes show tobacco rising by 10 and maize falling by 15: the 15 thousand tonnes of maize lost is the opportunity cost.",
    hints: ["Start with the axes and their labels.", "How much of each good changes between Q and R?"],
  });
  {
    const Lz = ["A", "B", "C", "D", "E"], cem = [0, 5, 10, 15, 20], bic = [40, 38, 33, 24, 0];
    const Z = ppc(Lz, cem, bic, "Cement (thousand tonnes)", "Bicycles (thousands)");
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `A fictional economy, Country Z, produces cement and bicycles. The table shows its production possibilities.\n\n${Z.md}\n\nLast year Country Z produced 10 thousand tonnes of cement and 25 thousand bicycles.`,
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "Where was last year's output?",
          options: [
            ["Inside the PPC", "Correct: with 10 thousand tonnes of cement it could make 33 thousand bicycles, more than 25."],
            ["On the PPC", "Combination C on the curve has 33 thousand bicycles, not 25."],
            ["Beyond the PPC", "25 thousand bicycles is fewer than the 33 thousand possible, so it is attainable."],
            ["At combination B", "B is 5 thousand tonnes of cement and 38 thousand bicycles."],
          ],
          answer: "A",
          explanation: "At 10 thousand tonnes of cement the maximum is 33 thousand bicycles, so (10, 25) lies inside the curve.",
        }),
        P.num({
          label: "(b)", marks: 1, kind: "plain", value: bic[2] - 25,
          stem: "How many more thousand bicycles could Country Z have produced without producing less cement?",
          wrong: [25, bic[2]],
          explanation: `${bic[2]} − 25 = ${bic[2] - 25} thousand bicycles, by moving from inside the curve to combination C.`,
        }),
        P.num({
          label: "(c)", marks: 2, kind: "plain", value: Z.oc[2].per, dp: 1,
          stem: "Calculate the opportunity cost of one extra thousand tonnes of cement when Country Z moves from C to D, in thousand bicycles. Give your answer to one decimal place.",
          wrong: [Z.oc[2].dy, Z.oc[2].dx / Z.oc[2].dy],
          explanation: `Bicycles given up: ${bic[2]} − ${bic[3]} = ${Z.oc[2].dy} thousand for ${Z.oc[2].dx} thousand tonnes of cement, so ${Z.oc[2].dy} ÷ ${Z.oc[2].dx} = ${fmt(Z.oc[2].per, 1)} thousand bicycles per thousand tonnes.`,
        }),
        P.manual({
          label: "(d)", marks: 4,
          stem: "Analyse **two** possible reasons why Country Z produced inside its PPC last year.",
          points: [
            "Reason 1 identified (for example unemployment of workers).",
            "Reason 1 explained: idle labour means output is below the maximum possible.",
            "Reason 2 identified (for example power cuts or shortages of imported parts, inefficient methods).",
            "Reason 2 explained: machines stand idle or are used badly, so output falls short of the curve.",
          ],
          modelAnswer: "First, there may have been unemployment: workers able to produce bicycles were idle, so output was below what the economy's labour could make. Second, power cuts may have stopped the bicycle factories for part of the year, so machines stood idle and fewer bicycles were made than the curve shows is possible.",
        }),
      ],
      explanation: "Compare actual output with the curve: (10, 25) is below C (10, 33). Opportunity cost per unit = amount given up ÷ amount gained.",
      hints: ["Find the row with the same cement output.", "For (c), find the change in each good between C and D."],
    });
  }
  {
    const Lk = ["J", "K", "L", "M"], cons = [0, 30, 60, 90], cap = [60, 54, 40, 0];
    const K = ppc(Lk, cons, cap, "Consumer goods (thousand units)", "Capital goods (thousand units)");
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `A fictional economy can produce the following combinations of consumer goods and capital goods.\n\n${K.md}\n\nIts government is deciding whether to plan for combination K or combination L next year.`,
      parts: [
        P.num({
          label: "(a)", marks: 2, kind: "plain", value: K.oc[1].dy,
          stem: "Calculate the opportunity cost, in thousand units of capital goods, of moving from K to L.",
          wrong: [cap[2], K.oc[1].dx],
          explanation: `${cap[1]} − ${cap[2]} = ${K.oc[1].dy} thousand units of capital goods are given up for ${K.oc[1].dx} thousand more consumer goods.`,
        }),
        P.fib({
          label: "(b)", marks: 2,
          stem: "Complete the sentences.",
          template: "Choosing combination K gives {{blank:a}} consumer goods today. Choosing combination L gives {{blank:b}} capital goods for future production.",
          blanks: [
            { id: "a", accepted: ["fewer"], choices: ["more", "fewer"] },
            { id: "b", accepted: ["fewer"], choices: ["more", "fewer"] },
          ],
          explanation: "K has 30 thousand consumer goods (fewer than L's 60) and L has 40 thousand capital goods (fewer than K's 54).",
        }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain why both K and L are productively efficient.",
          points: [
            "Both lie on the PPC.",
            "All resources are fully used, so more of one good can only be made by giving up the other.",
          ],
          modelAnswer: "Both combinations are on the PPC, so resources are fully employed: more of either good can only be produced by giving up some of the other.",
        }),
        P.manual({
          label: "(d)", marks: 6,
          stem: "Discuss whether the government should choose combination K or combination L.",
          points: [
            "Explains that K (more capital goods) can raise future productive capacity and growth.",
            "Develops: more machines and infrastructure can let the PPC shift outwards later.",
            "Explains that L (more consumer goods) raises living standards now.",
            "Develops: people with low incomes may need more food and clothing today; the cost is slower future growth.",
            "Uses the figures (14 thousand capital goods given up for 30 thousand consumer goods).",
            "Reaches a justified conclusion (for example depends on how poor people are now).",
          ],
          levels: LV6,
          modelAnswer: "Combination K gives 54 thousand units of capital goods, such as machines and roads, which would raise the economy's productive capacity and could shift the PPC outwards in future. However, people would have only 30 thousand units of consumer goods now. Combination L gives 30 thousand more units of consumer goods, raising living standards today, at an opportunity cost of 14 thousand units of capital goods. If many people are very poor, L may be better because basic needs must be met now; if living standards are already adequate, K is better because it raises future output. On balance, for a developing economy a point between the two, closer to K, may balance present needs and future growth.",
        }),
      ],
      explanation: "Moving from K to L trades future capacity (capital goods) for present consumption. Both points are efficient; the choice depends on what society values.",
      hints: ["Subtract the capital goods at L from those at K.", "Think about today versus the future."],
    });
  }

  b.card("DEFINITION", "Define a **production possibility curve**.", "A curve showing the maximum combinations of two goods an economy can produce when all its resources are fully and efficiently employed, with given technology.");
  b.card("CONCEPT", "What does a point **inside** the PPC show?", "Unemployed or inefficiently used resources: more of both goods could be produced.");
  b.card("CONCEPT", "What does a point **beyond** the PPC show?", "A combination that is unattainable with present resources and technology.");
  b.card("CONCEPT", "What does a movement **along** the PPC show?", "The opportunity cost of producing more of one good: some of the other good is given up.");
  b.card("FORMULA", "Opportunity cost per unit on a PPC", "Units of the other good given up ÷ units of the good gained.");
  b.card("FACT", "What is the opportunity cost of moving from inside the PPC to the curve?", "Zero: idle resources are put to work, so no good is given up.");
  b.card("CONCEPT", "What two things are held constant when a PPC is drawn?", "The quantity (and quality) of resources and the state of technology.");
  b.card("CONCEPT", "Why might a country choose a point with more capital goods?", "More machines and infrastructure raise future productive capacity, though people consume less today.");
  b.card("DEFINITION", "What is **productive efficiency** on a PPC?", "Producing on the curve: the maximum output from the resources available.");
});
