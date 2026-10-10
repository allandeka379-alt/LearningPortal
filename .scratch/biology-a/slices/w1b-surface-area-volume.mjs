// W1b: surface area to volume ratio and diffusion (Cambridge only).
import { concept, P, t, sav, chk, table, mean, dpStr, sfStr, rnd } from "../lib.mjs";

concept("abio.membranes.surface-area-volume", { file: "membranes/surface-area-volume", keyPrefix: "membranes.surface-area-volume" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What happens to the surface area to volume ratio of a cube when the length of each side is doubled?",
    options: [
      ["It halves", "Correct: SA:V of a cube is 6/l, so doubling l halves the ratio."],
      ["It doubles", "Volume grows faster than surface area, so the ratio falls."],
      ["It stays the same", "Area rises 4 times but volume 8 times, so the ratio changes."],
      ["It falls to one quarter", "Surface area rises 4 times and volume 8 times; 4 ÷ 8 = 1/2, not 1/4."],
    ],
    answer: "A",
    explanation: "Surface area × 4, volume × 8, so SA:V × 4/8 = × ½. For a cube SA:V = 6/l.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a single-celled organism such as *Amoeba* rely on diffusion across its surface for its oxygen supply?",
    options: [
      ["It has a large surface area to volume ratio and short diffusion distances", "Correct: plenty of surface per unit volume and every part is close to the surface."],
      ["It has a small surface area to volume ratio, so it needs less oxygen", "Single cells have a large, not small, SA:V."],
      ["It respires anaerobically and so needs no oxygen", "Amoeba respires aerobically; it is supplied by diffusion."],
      ["Its cytoplasm pumps oxygen in by active transport", "Oxygen is a small non-polar molecule that diffuses across membranes."],
    ],
    answer: "A",
    explanation: "Small size gives a **large SA:V** and a **short diffusion distance** to every part of the cell, so diffusion meets demand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which object has the largest surface area to volume ratio?",
    options: [
      ["A cube of side 1 cm", "Correct: SA:V = 6/1 = 6 : 1."],
      ["A cube of side 2 cm", "SA:V = 6/2 = 3 : 1."],
      ["A cube of side 3 cm", "SA:V = 6/3 = 2 : 1."],
      ["A cuboid of 2 cm × 2 cm × 4 cm", "SA = 2(4 + 8 + 8) = 40 cm², V = 16 cm³, so SA:V = 2.5 : 1."],
    ],
    answer: "A",
    explanation: "For cubes SA:V = 6/l, so the smallest cube wins (6 : 1). The cuboid has 40/16 = 2.5 : 1.",
  });
  chk(sav([2, 2, 4]).ratio, 2.5);
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A flatworm and a spherical organism have the same volume. Which statement explains why the flatworm can rely on diffusion for gas exchange but the spherical organism cannot?",
    options: [
      ["The flat shape gives a larger SA:V and a shorter distance to the centre", "Correct: flattening increases surface area per unit volume and shortens diffusion paths."],
      ["The flat shape gives a smaller SA:V, which slows oxygen loss", "Flattening increases SA:V; it does not reduce it."],
      ["The flatworm has a higher metabolic rate than the spherical organism", "A higher metabolic rate would make diffusion less, not more, adequate."],
      ["The spherical organism has a thinner body surface than the flatworm", "A thinner surface would help the spherical organism, not hinder it."],
    ],
    answer: "A",
    explanation: "For the same volume, a flattened body has more surface and no cell is far from the surface, so diffusion is fast enough.",
    hints: ["Compare surface area per unit volume and the distance to the innermost cells."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the agar block investigation, blocks of pink agar containing sodium hydroxide and phenolphthalein are placed in dilute hydrochloric acid. What is the dependent variable?",
    options: [
      ["The time taken for each block to become colourless", "Correct: this is what is measured."],
      ["The size of each agar block", "Block size (or SA:V) is the independent variable."],
      ["The concentration of the hydrochloric acid used to bathe the blocks", "This is a standardised variable."],
      ["The temperature of the hydrochloric acid", "This is a standardised variable."],
    ],
    answer: "A",
    explanation: "Independent: block size (SA:V). Dependent: time to decolourise (or % decolourised after a fixed time). Standardised: acid concentration, volume and temperature.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which feature of a large mammal is mainly a consequence of its small surface area to volume ratio?",
    options: [
      ["A circulatory system that carries oxygen from the lungs to every tissue", "Correct: diffusion alone cannot supply the inner cells, so a mass transport system is needed."],
      ["Hair that traps a layer of still air next to the skin to reduce heat loss", "Hair is for insulation; it is related to heat loss, not to supplying cells by diffusion."],
      ["A nervous system that coordinates the muscles", "Coordination is not a consequence of SA:V."],
      ["Teeth that are adapted to the animal's diet", "Dentition depends on diet, not on SA:V."],
    ],
    answer: "A",
    explanation: "A small SA:V and long diffusion distances mean the body surface cannot supply inner cells; a specialised exchange surface (lungs) plus a **mass transport system** (blood, heart) is needed.",
    hints: ["Which feature solves the problem of long diffusion distances?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Acid diffuses 0.5 cm into each face of three agar cubes in 10 minutes. Which cube will be completely decolourised?",
    options: [
      ["A cube of side 1.0 cm", "Correct: acid reaching 0.5 cm from every face meets in the centre of a 1.0 cm cube."],
      ["A cube of side 1.5 cm", "A core of side 1.5 − 2(0.5) = 0.5 cm stays pink."],
      ["A cube of side 2.0 cm", "A core of side 2.0 − 1.0 = 1.0 cm stays pink."],
      ["None of the cubes", "Acid entering 0.5 cm from each side of a 1.0 cm cube reaches the centre."],
    ],
    answer: "A",
    explanation: "The uncoloured core has side l − 2 × 0.5. Only for l = 1.0 cm is the core zero, so that cube becomes completely colourless.",
    hints: ["Acid enters from both opposite faces."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A large organism has a smaller total surface area than a small organism of the same shape.",
    answer: false,
    explanation: "False. The large organism has a larger **total** surface area but a smaller surface area **per unit volume** (lower SA:V).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Flattening a structure, as in a leaf, increases its surface area to volume ratio compared with a cube of the same volume.",
    answer: true,
    explanation: "True. Spreading the same volume thinly exposes more surface, raising SA:V and shortening diffusion distances.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure with the way it increases the surface area available for exchange.",
    pairs: [
      ["Alveoli", "Millions of tiny air sacs in the lungs"],
      ["Villi and microvilli", "Folds and projections of the small intestine lining"],
      ["Root hairs", "Long, thin extensions of epidermal cells into the soil"],
      ["Gill lamellae", "Thin plates on gill filaments in fish"],
    ],
    explanation: "Each exchange surface multiplies the area for diffusion while keeping the diffusion distance short.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulae for a cube of side l.",
    template: "Surface area = {{blank:a}} l², volume = l³, so SA:V = {{blank:b}} ÷ l.",
    blanks: [
      { id: "a", accepted: ["6"], input: "number", wrong: "4" },
      { id: "b", accepted: ["6"], input: "number", wrong: "3" },
    ],
    explanation: "Six square faces: SA = 6l²; V = l³; SA:V = 6l² ÷ l³ = 6/l.",
  });

  const cub = sav([5, 2, 1]);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "Calculate the surface area to volume ratio of a cuboid of 5 cm × 2 cm × 1 cm. Give the answer as the number x in x : 1, to two significant figures.",
    value: cub.ratio, sf: 2,
    wrong: [rnd(cub.vol / cub.area, 2), 6],
    explanation: t`1. Surface area $= 2\big((5 \times 2) + (5 \times 1) + (2 \times 1)\big) = 2(17) = ${cub.area}\ \text{cm}^2$.
2. Volume $= 5 \times 2 \times 1 = ${cub.vol}\ \text{cm}^3$.
3. SA:V $= ${cub.area} \div ${cub.vol} = ${sfStr(cub.ratio, 2)} : 1$.
4. Dividing volume by area (${dpStr(cub.vol / cub.area, 2)}) inverts the ratio.`,
  });
  chk(cub.ratio, 3.4);

  const cyl = sav({ r: 0.4, h: 3 });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A cylinder of potato tissue has a radius of $0.4\ \text{cm}$ and a length of $3\ \text{cm}$. Calculate its surface area to volume ratio. Use $\text{SA} = 2\pi r^2 + 2\pi r h$ and $V = \pi r^2 h$. Give the value of $x$ in $x : 1$ to three significant figures.`,
    value: cyl.ratio, sf: 3,
    wrong: [rnd((2 * Math.PI * 0.4 * 3) / (Math.PI * 0.16 * 3), 2)],
    explanation: t`1. Ends: $2\pi(0.4)^2 = ${dpStr(2 * Math.PI * 0.16, 3)}\ \text{cm}^2$; curved surface: $2\pi(0.4)(3) = ${dpStr(2 * Math.PI * 1.2, 3)}\ \text{cm}^2$.
2. Surface area $= ${dpStr(cyl.area, 3)}\ \text{cm}^2$.
3. Volume $= \pi(0.4)^2(3) = ${dpStr(cyl.vol, 3)}\ \text{cm}^3$.
4. SA:V $= ${dpStr(cyl.area, 3)} \div ${dpStr(cyl.vol, 3)} = ${sfStr(cyl.ratio, 3)} : 1$. Leaving out the two ends gives 5.00, which is wrong.`,
    hints: ["Work out the area of the two circular ends and the curved surface separately.", "Keep π in the calculator until the end."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain why large multicellular animals need specialised gas exchange surfaces and a transport system.",
    points: [
      "Large animals have a small surface area to volume ratio",
      "Their body surface is too small to supply enough oxygen for the volume of respiring tissue / high metabolic demand",
      "Diffusion distances to inner cells are too long, so diffusion would be too slow",
      "Exchange surfaces increase surface area and a transport system (blood) carries gases quickly to and from all cells, maintaining gradients",
    ],
    modelAnswer: "As animals get larger their surface area to volume ratio falls, so the body surface is too small to absorb enough oxygen for all the respiring tissue, especially in active animals. The distance from the surface to inner cells is too great for diffusion to be fast enough. Specialised exchange surfaces such as alveoli provide a large area with a short diffusion distance, and the blood system carries oxygen rapidly to every cell and keeps concentration gradients steep.",
    explanation: "SA:V, demand, distance, and the two solutions.",
    hints: ["Mention both surface area per unit volume and diffusion distance."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest three limitations of using agar blocks as a model of how SA:V affects the supply of substances to living organisms.",
    points: [
      "Agar has no cell membranes / no partially permeable membrane or carrier proteins",
      "Agar blocks do not respire / use up the substance, so no concentration gradient is maintained by use",
      "Organisms have transport systems / exchange surfaces / are not cube-shaped; acid is not oxygen (different diffusion rates)",
    ],
    modelAnswer: "Agar has no membranes or transport proteins, so diffusion into it is not the same as across cells. The blocks do not use up the acid as cells use oxygen, so the gradient differs. Real organisms are not cubes and have exchange surfaces and transport systems that agar lacks.",
    explanation: "Any three valid differences between agar and living tissue.",
    hints: ["Think of what living cells have that agar does not."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Elephants have very large, thin ears with many blood vessels near the surface. Suggest how this helps an elephant in the hot Zambezi valley.",
    points: [
      "The ears greatly increase the surface area to volume ratio of the body (large thin surface)",
      "More heat can be lost from warm blood to the air by radiation / convection, helping to prevent overheating",
    ],
    modelAnswer: "The large thin ears add a lot of surface for very little volume, increasing the elephant's SA:V. Warm blood flowing close to that surface loses heat to the surroundings, helping the elephant to keep cool.",
    explanation: "SA:V affects heat exchange as well as gas exchange: a large animal has a low SA:V and loses heat slowly.",
    hints: ["SA:V affects heat loss as well as diffusion."],
  });

  // Practice structured: agar block timing data (original)
  const sides = [0.8, 1.2, 1.6, 2.4];
  const times = [[148, 155, 142], [338, 350, 331], [602, 588, 615], [1352, 1330, 1371]];
  const means = times.map(mean);
  const ratios = sides.map((s) => sav(s).ratio);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Thandeka placed pink agar cubes (containing sodium hydroxide and phenolphthalein) in 0.1 mol dm⁻³ hydrochloric acid at 25 °C and timed how long each took to become colourless.\n\n${table(["Side of cube / cm", "Time 1 / s", "Time 2 / s", "Time 3 / s"], sides.map((s, i) => [s.toFixed(1), ...times[i].map(String)]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the SA:V of the 1.6 cm cube. Give x in x : 1 to three significant figures.",
        value: ratios[2], sf: 3, wrong: [1.6],
        explanation: t`SA:V $= 6 \div 1.6 = 3.75 : 1$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the mean time for the 2.4 cm cubes, to the nearest second.",
        value: means[3], dp: 0, unit: "s", wrong: [1352],
        explanation: t`$(1352 + 1330 + 1371) \div 3 = ${dpStr(means[3], 1)}$, so ${Math.round(means[3])} s.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe the relationship between SA:V and the time taken to decolourise.",
        points: ["As SA:V decreases (cube size increases), the time taken increases", "Quote data: e.g. 7.5 : 1 took a mean of 148 s, 2.5 : 1 took a mean of 1351 s; time increases more than in proportion to side length"],
        modelAnswer: "The smaller the SA:V, the longer the time: a mean of 148 s at 7.5 : 1 rose to 1351 s at 2.5 : 1. Tripling the side from 0.8 to 2.4 cm made the time about nine times longer.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain the result for the largest cube.",
        points: ["Smallest SA:V: least surface for acid to enter per unit volume", "Longest distance from surface to centre, so acid takes longer to diffuse to the centre"],
        modelAnswer: "The 2.4 cm cube has the smallest SA:V, so less surface is available per unit volume, and the acid has the farthest to diffuse to reach the centre, so it took longest.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest two improvements to make the timing more accurate.",
        points: ["Use a white tile / standard light behind the beaker to judge the end point consistently (or use a colour standard)", "Stir the acid / use more replicates / cut blocks more precisely with a ruler and scalpel"],
        modelAnswer: "View the blocks against a white tile under the same lighting and compare with a colourless standard to judge the end point; gently stir the acid so its concentration at the surface stays the same, and repeat more times.",
      }),
    ],
    explanation: "Smaller blocks have a larger SA:V and shorter diffusion distances, so they decolourise faster.",
    hints: ["For a cube SA:V = 6 ÷ side.", "Mean = sum ÷ number of readings."],
    calculator: true,
  });
  chk(Math.round(means[0]), 148); chk(means[3], 1351); chk(ratios[0], 7.5); chk(ratios[3], 2.5);

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A spherical bacterium has a diameter of 2 µm. A spherical yeast cell has a diameter of 8 µm. For a sphere, SA = 4πr² and V = (4/3)πr³, so SA:V = 3/r.",
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the SA:V of the bacterium, in µm⁻¹ (give the number only).",
        value: 3 / 1, wrong: [1.5],
        explanation: t`Radius $= 1\ \mu\text{m}$, so SA:V $= 3/1 = 3$ (that is, $3 : 1$ per µm). Using the diameter instead of the radius gives 1.5.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "How many times greater is the SA:V of the bacterium than that of the yeast cell?",
        value: (3 / 1) / (3 / 4), wrong: [16, 64],
        explanation: t`Yeast: $r = 4\ \mu\text{m}$, SA:V $= 3/4 = 0.75$. Ratio $= 3 \div 0.75 = 4$.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why the yeast cell can still be supplied adequately by diffusion although its SA:V is smaller.",
        points: ["It is still very small, so diffusion distances (about 4 µm to the centre) are short", "Its SA:V is still large compared with multicellular organisms / demand can be met at this size"],
        modelAnswer: "At 8 µm across, the centre is only 4 µm from the surface, so diffusion is still fast enough, and its SA:V is still very large compared with that of a multicellular organism.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Cells usually divide before they become very large. Suggest an advantage of this, in terms of SA:V.",
        points: ["Dividing restores a larger SA:V (two smaller cells have more surface per unit volume than one large cell)", "So exchange across the membrane (oxygen, nutrients in; wastes out) can keep pace with the needs of the cytoplasm"],
        modelAnswer: "Two small daughter cells together have a larger SA:V than the one large cell they came from, so their membranes can exchange enough oxygen, nutrients and wastes to meet the needs of their cytoplasm.",
      }),
    ],
    explanation: "SA:V of a sphere is 3/r, so a four-fold larger radius gives a four-fold smaller SA:V; both cells are still small enough for diffusion.",
    hints: ["Use the radius, not the diameter."],
  });

  b.card("FORMULA", "SA:V of a cube of side l", "SA = 6l², V = l³, so SA:V = 6/l.");
  b.card("FORMULA", "Surface area and volume of a cylinder", "SA = 2πr² + 2πrh; V = πr²h.");
  b.card("FORMULA", "Surface area and volume of a cuboid l × w × h", "SA = 2(lw + lh + wh); V = lwh.");
  b.card("CONCEPT", "Why does SA:V fall as size increases?", "Surface area scales with length², volume with length³, so volume grows faster.");
  b.card("CONCEPT", "Why do large organisms need exchange surfaces?", "Small SA:V and long diffusion distances: the body surface cannot supply enough for the volume of tissue.");
  b.card("CONCEPT", "How does shape affect SA:V?", "Flattened or elongated shapes have a larger SA:V than a cube or sphere of the same volume.");
  b.card("FACT", "Agar block practical: what changes colour?", "Pink agar (NaOH + phenolphthalein) turns colourless as hydrochloric acid diffuses in.");
  b.card("CONCEPT", "Agar block variables", "Independent: block size/SA:V; dependent: time to decolourise or % decolourised; standardised: acid concentration, volume, temperature.");
});
