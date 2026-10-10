// W2b: sexual reproduction in flowering plants (ZIMSEC only).
import { concept, P, t, chk, table, dpStr, ZIM } from "../lib.mjs";

concept("abio.reproduction.flowering-plants", { file: "reproduction/flowering-plants", keyPrefix: "reproduction.flowering-plants", applies: ZIM }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which layer of the anther wall nourishes the developing pollen grains?",
    options: [
      ["Tapetum", "Correct: the innermost layer, with dense cytoplasm."],
      ["Fibrous layer, whose thickened cells pull the anther open", "The fibrous layer helps the anther split open; it does not nourish pollen."],
      ["Epidermis", "The epidermis is the outer protective layer."],
      ["Integument", "Integuments surround the ovule, not the pollen sac."],
    ],
    answer: "A",
    explanation: "The **tapetum** nourishes developing pollen and supplies materials for the pollen wall.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many haploid microspores are formed from one pollen mother cell?",
    options: [
      ["Four", "Correct: meiosis gives a tetrad of four."],
      ["Two", "Two would come from a single division."],
      ["One, because three degenerate as in the ovule", "Degeneration of three products happens in the ovule, not the anther."],
      ["Eight", "Eight nuclei form in the embryo sac, not from one pollen mother cell."],
    ],
    answer: "A",
    explanation: "Each pollen mother cell (2n) divides by **meiosis** into a **tetrad** of four haploid microspores.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which type of division forms the two male gametes from the generative nucleus?",
    options: [
      ["Mitosis", "Correct: the generative nucleus is already haploid."],
      ["Meiosis I", "Meiosis took place earlier, in the pollen mother cell."],
      ["Meiosis II", "Meiosis is complete when the microspores form."],
      ["Binary fission", "Binary fission is how prokaryotes divide."],
    ],
    answer: "A",
    explanation: "The haploid generative nucleus divides by **mitosis** to give two haploid male gametes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which list gives the contents of a mature embryo sac?",
    options: [
      ["Egg cell, two synergids, three antipodal cells and two polar nuclei", "Correct: seven cells, eight nuclei."],
      ["Egg cell, one synergid, two antipodal cells and three polar nuclei", "There are two synergids, three antipodals and two polar nuclei."],
      ["Two egg cells, two synergids and four polar nuclei", "There is one egg cell and two polar nuclei."],
      ["Egg cell, tube nucleus and generative nucleus", "Tube and generative nuclei are in the pollen grain."],
    ],
    answer: "A",
    explanation: "Micropylar end: egg + 2 synergids. Centre: 2 polar nuclei. Chalazal end: 3 antipodals.",
    hints: ["Count to eight nuclei."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A plant has a diploid number of 24. How many chromosomes are present in each nucleus of its endosperm?",
    options: [
      ["36", "Correct: triploid, 3 × 12."],
      ["24", "This is the diploid number of the zygote."],
      ["12", "This is the haploid number of the gametes."],
      ["48", "This would be tetraploid."],
    ],
    answer: "A",
    explanation: "n = 12. Endosperm = male nucleus + two polar nuclei = **3n = 36**.",
    hints: ["Which three haploid nuclei fuse?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the role of the tube nucleus in a germinating pollen grain?",
    options: [
      ["It controls the growth of the pollen tube", "Correct: it lies near the tip and directs growth."],
      ["It fuses with the polar nuclei to form the endosperm", "A male gamete does this."],
      ["It fuses with the egg to form the zygote", "A male gamete does this."],
      ["It divides by meiosis to form the male gametes", "The generative nucleus forms the male gametes, by mitosis."],
    ],
    answer: "A",
    explanation: "The **tube nucleus** controls tube growth and then degenerates; it does not take part in fertilisation.",
    hints: ["Which nucleus is not a gamete?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is it an advantage that endosperm develops only after fertilisation?",
    options: [
      ["Food is stored only in ovules that will contain an embryo, so resources are not wasted", "Correct: unfertilised ovules do not receive a food store."],
      ["Endosperm needs the tube nucleus to provide its chromosomes", "The tube nucleus does not contribute to endosperm."],
      ["Fertilisation makes the endosperm diploid, like the embryo", "Endosperm is triploid."],
      ["Endosperm prevents more than one pollen tube from entering the ovule after fertilisation", "This is not its function."],
    ],
    answer: "A",
    explanation: "Linking endosperm formation to fertilisation means the plant invests food only in seeds with embryos.",
    hints: ["What would happen to food stored in an unfertilised ovule?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature is typical of a wind-pollinated flower such as maize?",
    options: [
      ["Feathery stigmas that hang outside the flower", "Correct: a large surface to catch airborne pollen."],
      ["Large, brightly coloured petals and scent that attract insects", "These attract insects; wind-pollinated flowers are small and dull."],
      ["Sticky, spiky pollen", "This attaches to insects; wind pollen is light and smooth."],
      ["Nectaries at the base of the petals", "Nectar rewards animal pollinators."],
    ],
    answer: "A",
    explanation: "Wind-pollinated flowers have exposed anthers, **feathery stigmas** and large amounts of light pollen.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The pollen tube enters the ovule through the micropyle.",
    answer: true,
    explanation: "True. The micropyle is the gap left by the integuments.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Of the four megaspores formed by meiosis in the ovule, all four develop into embryo sacs.",
    answer: false,
    explanation: "False. Three degenerate; one functional megaspore divides by mitosis three times to form the embryo sac.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure with what it becomes, or does, after fertilisation.",
    pairs: [
      ["Zygote", "Develops into the embryo"],
      ["Primary endosperm nucleus", "Divides to form the food store"],
      ["Integuments", "Become the testa (seed coat)"],
      ["Ovary wall", "Becomes the fruit wall"],
      ["Ovule", "Becomes the seed"],
    ],
    explanation: "Zygote → embryo; endosperm nucleus → endosperm; integuments → testa; ovule → seed; ovary → fruit.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "The megaspore mother cell divides by {{blank:a}} to form four megaspores. The surviving megaspore's nucleus divides by {{blank:b}} three times, forming {{blank:c}} nuclei.",
    blanks: [
      { id: "a", accepted: ["meiosis"], choices: ["meiosis", "mitosis", "binary fission"] },
      { id: "b", accepted: ["mitosis"], choices: ["mitosis", "meiosis", "budding"] },
      { id: "c", accepted: ["eight"], choices: ["eight", "four", "seven"] },
    ],
    explanation: "Meiosis, then three mitoses giving eight nuclei (seven cells).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the cells of the embryo sac that lie beside the egg cell and help guide the pollen tube.",
    accepted: ["synergids", "synergid", "synergid cells"],
    wrong: ["antipodal cells"],
    explanation: "The two **synergids** lie beside the egg at the micropylar end.",
  });

  const pmc = 750;
  const grains = pmc * 4;
  chk(grains, 3000);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A pollen sac contains 750 pollen mother cells. Assuming all divide normally, how many pollen grains will be produced?",
    value: grains,
    wrong: [pmc, pmc * 2],
    explanation: t`Each pollen mother cell gives a tetrad of 4 microspores: $750 \times 4 = ${grains}$ pollen grains.`,
  });

  const g = [3, 14, 29, 36, 22, 9];
  const tot = 40;
  const pct = g.map((x) => (x / tot) * 100);
  chk(pct[3], 90);
  const ch = pct[3] - pct[1];
  chk(ch, 55);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Forty pollen grains were placed in each of six sucrose solutions and the number that germinated after 3 hours was counted.\n\n${table(["Sucrose concentration / %", "0", "4", "8", "12", "16", "24"], [["Grains germinated (of 40)", ...g.map(String)]])}\n\nCalculate the difference in percentage germination between 4% and 12% sucrose, in percentage points.`,
    value: ch,
    wrong: [g[3] - g[1], pct[3]],
    explanation: t`1. At 4%: $\dfrac{14}{40} \times 100 = ${pct[1]}\%$.
2. At 12%: $\dfrac{36}{40} \times 100 = ${pct[3]}\%$.
3. Difference $= ${pct[3]} - ${pct[1]} = ${ch}$ percentage points.
4. Subtracting the raw counts (36 − 14 = 22) does not give a percentage.`,
    hints: ["Convert each count to a percentage first."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the formation of pollen grains from pollen mother cells in the anther.",
    points: [
      "Diploid pollen mother cells (in the pollen sacs) divide by meiosis",
      "Forming a tetrad of four haploid microspores, which separate",
      "Each microspore develops a thick (outer) wall, nourished by the tapetum",
      "Its nucleus divides by mitosis into a tube nucleus and a generative nucleus (which later divides by mitosis to form two male gametes)",
    ],
    modelAnswer: "In each pollen sac, diploid pollen mother cells divide by meiosis to give tetrads of four haploid microspores, which separate. Each microspore develops a tough, sculptured outer wall, with materials supplied by the tapetum. The microspore nucleus divides by mitosis into a large tube nucleus and a smaller generative nucleus; the generative nucleus later divides by mitosis to form two male gametes.",
    explanation: "Meiosis → tetrad → wall → mitosis.",
    hints: ["Name each division."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the events from the landing of a pollen grain on a stigma to the formation of the zygote and endosperm.",
    points: [
      "Pollen grain germinates on the stigma (absorbs water / sugar); a pollen tube grows out",
      "Tube grows down the style, secreting (hydrolytic) enzymes, guided towards an ovule",
      "Generative nucleus divides by mitosis to give two male gametes; tube nucleus at the tip",
      "Tube enters the ovule through the micropyle and releases the male nuclei into the embryo sac",
      "One male nucleus fuses with the egg nucleus (diploid zygote); the other fuses with the two polar nuclei (triploid endosperm nucleus)",
    ],
    modelAnswer: "The pollen grain absorbs water and sugar from the stigma and germinates, producing a pollen tube. The tube grows down through the style, secreting hydrolytic enzymes, and is guided chemically to an ovule. The generative nucleus divides by mitosis into two male gametes, while the tube nucleus stays near the tip. The tube enters through the micropyle and releases the male nuclei into the embryo sac. One fuses with the egg nucleus to form a diploid zygote; the other fuses with the two polar nuclei to form a triploid endosperm nucleus.",
    explanation: "Germination → tube growth → micropyle → double fertilisation.",
    hints: ["Finish with the two fusions."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why pollen germination falls in very concentrated sucrose solutions.",
    points: [
      "Concentrated sucrose has a lower (more negative) water potential than the pollen grain",
      "Water leaves the pollen grain by osmosis",
      "Pollen cannot absorb enough water to swell / grow a tube, so fewer germinate",
    ],
    modelAnswer: "A concentrated sucrose solution has a lower water potential than the cytoplasm of the pollen, so water leaves the pollen by osmosis. Without taking up water the grain cannot swell and push out a pollen tube, so germination falls.",
    explanation: "Water potential and osmosis.",
    hints: ["Compare the water potential inside and outside the pollen grain."],
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A student examines a prepared transverse section of a young lily anther at low power. She sees four oval chambers, each filled with many rounded cells, arranged in two pairs around a central strand. Each chamber is surrounded, from outside in, by: one layer of small flattened cells; a layer of cells with bands of thickening in their walls; two or three layers of thin, squashed cells; and one layer of large cells with dense cytoplasm and sometimes two nuclei.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the layer of large cells with dense cytoplasm and sometimes two nuclei.",
        accepted: ["tapetum", "the tapetum", "tapetal layer"],
        wrong: ["endothecium"],
        explanation: "The innermost layer is the **tapetum**.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the layer with bands of thickening.",
        accepted: ["fibrous layer", "endothecium", "the fibrous layer"],
        wrong: ["tapetum"],
        explanation: "The **fibrous layer** (endothecium).",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the layer you named in (b) helps release the pollen.",
        points: ["As the anther dries, its cells lose water and shrink unevenly (because of the bands of thickening)", "This creates tension that splits the anther wall open (dehiscence), releasing pollen"],
        modelAnswer: "When the anther matures and dries, the cells of the fibrous layer shrink unevenly because of their thickening bands. This pulls the wall apart along a line of weakness, so the anther splits open and pollen is released.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe what the student's low-power plan diagram should show.",
        points: [
          "Outlines of the four pollen sacs in two lobes and the central connective / vascular bundle, in correct proportions",
          "Wall layers drawn as tissue boundaries only, no individual cells; pollen sacs not filled in with cells",
          "Clear, continuous lines, no shading; labels with ruled lines (e.g. pollen sac, tapetum, fibrous layer, epidermis)",
        ],
        modelAnswer: "A large outline of the anther showing four pollen sacs in two lobes around the connective with its vascular bundle, in correct proportions. The wall layers are drawn as boundaries between tissues, not as individual cells, with clear continuous lines and no shading, and the main regions are labelled with ruled lines.",
      }),
      P.num({
        label: "(e)", marks: 1, stem: "The student counts 26 tetrads in one pollen sac. How many microspores do these tetrads contain?",
        value: 104, wrong: [26, 52],
        explanation: t`$26 \times 4 = 104$ microspores.`,
      }),
    ],
    explanation: "Epidermis, fibrous layer, middle layers, tapetum; meiosis gives tetrads of four microspores.",
    hints: ["Work from the outside of the pollen sac inwards."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "In a maize plant (2n = 20), a pollen grain lands on a silk (the long stigma and style) and fertilises an ovule.",
    parts: [
      P.fib({
        label: "(a)", stem: "Complete the chromosome numbers.",
        template: "Male gamete: {{blank:a}}. Zygote: {{blank:b}}. Endosperm nucleus: {{blank:c}}. Cell of the testa: {{blank:d}}.",
        blanks: [
          { id: "a", accepted: ["10"], input: "number" },
          { id: "b", accepted: ["20"], input: "number" },
          { id: "c", accepted: ["30"], input: "number" },
          { id: "d", accepted: ["20"], input: "number" },
        ],
        explanation: "Gametes n = 10; zygote 2n = 20; endosperm 3n = 30; the testa forms from the integuments of the parent plant, so 2n = 20.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the testa has the same chromosome number as the parent plant, not the embryo.",
        points: ["The testa develops from the integuments of the ovule", "Integuments are tissue of the (diploid) parent plant, not a product of fertilisation"],
        modelAnswer: "The testa develops from the integuments, which are diploid tissue of the parent plant and are not produced by fertilisation.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why each maize kernel on a cob may have a different combination of alleles.",
        points: ["Each kernel results from a different pollen grain / male gamete (cross-pollination by wind)", "Gametes differ genetically because of meiosis (crossing over / independent assortment)"],
        modelAnswer: "Each kernel is fertilised by a different pollen grain, often from a different plant, and both male and female gametes are genetically different because of crossing over and independent assortment in meiosis.",
      }),
    ],
    explanation: "Gametes n, zygote 2n, endosperm 3n; maternal tissue stays 2n.",
    hints: ["Which structures come from fertilisation and which from the parent plant?"],
  });

  b.card("FACT", "Layers of the anther wall (outside in)", "Epidermis, fibrous layer (endothecium), middle layers, tapetum.");
  b.card("FACT", "Function of the tapetum", "Nourishes developing pollen and supplies material for the pollen wall.");
  b.card("CONCEPT", "Formation of pollen grains", "Pollen mother cell (2n) → meiosis → tetrad of 4 microspores (n) → mitosis → tube + generative nuclei → generative nucleus → 2 male gametes.");
  b.card("CONCEPT", "Formation of the embryo sac", "Megaspore mother cell → meiosis → 4 megaspores, 3 degenerate → 3 mitoses → 8 nuclei, 7 cells.");
  b.card("FACT", "Contents of the embryo sac", "Egg cell, 2 synergids, 3 antipodals, central cell with 2 polar nuclei.");
  b.card("DEFINITION", "Double fertilisation", "Male nucleus + egg → diploid zygote; male nucleus + 2 polar nuclei → triploid endosperm nucleus.");
  b.card("CONCEPT", "Significance of double fertilisation", "Endosperm (food store) forms only in fertilised ovules, so resources are not wasted.");
  b.card("FACT", "Fate of flower parts after fertilisation", "Ovule → seed; integuments → testa; ovary → fruit; zygote → embryo.");
  b.card("CONCEPT", "Role of the tube nucleus", "Controls pollen tube growth; does not fertilise.");
});
