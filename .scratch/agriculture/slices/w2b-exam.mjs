// Slice W2b: exam-format items. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge P1 Section A), ZIMSEC
// P2 Section B crop production (20 marks) and Cambridge P1 Section B (15 marks). Part splits are our convention; a
// reviewer must check them against past papers.
import { concept, P, ZIM, CAM, germinationPct, monohybrid, mean, pct, pctChange, round, check, table, agricultureLevels } from "../lib.mjs";

// T1: potometer, bubble distance in 5 minutes.
const T1_MIN = 5;
const T1 = [["A", "Shade, still air", 9], ["B", "Shade, electric fan", 33], ["C", "Bright light, still air", 21], ["D", "Shade, still air, shoot in a clear plastic bag", 3]];
const T1_TABLE = table(["Set-up", "Conditions", `Distance moved by bubble in ${T1_MIN} min (mm)`], T1);
const t1RateB = 33 / T1_MIN;
const t1Inc = pctChange(9, 33);
check(Math.abs(t1RateB - 6.6) < 1e-9 && Math.abs(t1Inc - 266.667) < 1e-2, "T1");

// T2: germination test, four lots of 50.
const T2_LOTS = [46, 44, 47, 43];
const t2Germ = T2_LOTS.reduce((a, c) => a + c, 0);
const t2Pct = germinationPct(t2Germ, 200);
check(t2Germ === 180 && t2Pct === 90, "T2");
const T2_TABLE = table(["Lot", "1", "2", "3", "4"], [["Seeds germinated (out of 50)", ...T2_LOTS]]);

// T3: monohybrid, polled x polled heterozygotes, 64 calves.
const t3 = monohybrid("Pp", "Pp");
const T3_CALVES = 64;
const t3Horned = (T3_CALVES * t3.phenotypes.recessive) / 4;
const t3Het = (T3_CALVES * t3.genotypes.Pp) / 4;
check(t3Horned === 16 && t3Het === 32, "T3");

// T4: heterosis and F2 fall (fictional, t/ha).
const T4 = { a: 2.5, b: 3.1, f1: 7.28, f2: 5.6 };
const t4Mid = mean([T4.a, T4.b]);
const t4Het = pct(T4.f1 - t4Mid, t4Mid);
const t4Fall = -pctChange(7.0, T4.f2);
check(Math.abs(t4Mid - 2.8) < 1e-9 && Math.abs(t4Het - 160) < 1e-9 && Math.abs(t4Fall - 20) < 1e-9, "T4");

// Z1: dry mass of bean seedlings (g per seedling).
const Z1 = { start: 0.8, light: 1.4, dark: 0.56 };
const z1Dark = -pctChange(Z1.start, Z1.dark);
const z1Light = pctChange(Z1.start, Z1.light);
check(Math.abs(z1Dark - 30) < 1e-9 && Math.abs(z1Light - 75) < 1e-9, "Z1");
const Z1_TABLE = table(["Seedlings", "Mean dry mass per seedling (g)"], [
  ["At the start (day 0)", Z1.start.toFixed(2)],
  ["After 14 days in a sunny window", Z1.light.toFixed(2)],
  ["After 14 days in a dark cupboard", Z1.dark.toFixed(2)],
]);

// Z2: three-way hybrid seed field.
const Z2_ROWS = 120, Z2_F = 4, Z2_M = 2;
const z2Female = (Z2_ROWS / (Z2_F + Z2_M)) * Z2_F;
const Z2_FHA = 3, Z2_TPH = 2.4, Z2_BAG = 10;
const z2Bags = (Z2_FHA * Z2_TPH * 1000) / Z2_BAG;
check(z2Female === 80 && Math.abs(z2Bags - 720) < 1e-9, "Z2");

concept("agri.plants.water-uptake-transpiration", { file: "exam/w2b-theory", keyPrefix: "exam.w2b-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.plants.water-uptake-transpiration", "agri.plants.roots-stems-leaves"],
    stem: `Form 3 pupils set up four potometers, each with a similar leafy bean shoot, and recorded how far the air bubble moved in ${T1_MIN} minutes.\n\n${T1_TABLE}`,
    hints: ["Rate = distance ÷ time.", "Compare each set-up with set-up A."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the rate of water uptake in set-up B, in mm per minute.", value: t1RateB, tol: 0.05, wrong: [33], explanation: `33 ÷ ${T1_MIN} = ${t1RateB} mm per minute.` }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage increase in the distance moved in B compared with A, to the nearest whole number.",
        value: t1Inc, unit: "%", tol: 0.5, answer: String(round(t1Inc, 0)), wrong: [round(pct(33, 9), 0), 24],
        explanation: `(33 − 9) ÷ 9 × 100 = ${round(t1Inc, 1)}%, i.e. ${round(t1Inc, 0)}%.`,
      }),
      P.short({ label: "(c)", stem: "Name the factor that was changed in set-up D.", accepted: ["humidity", "air humidity", "relative humidity", "water vapour in the air", "humidity of the air"], explanation: "The bag raised the humidity." }),
      P.mcq({
        label: "(d)", stem: "Through which structures is most of the water lost from the shoots?",
        options: [["Stomata", "Correct: water vapour diffuses out through them."], ["Root hairs", "The shoots have no roots, and root hairs absorb water."], ["Phloem", "Phloem carries food."], ["Cuticle", "Only a little water is lost through the cuticle."]],
        answer: "A", explanation: "Most transpiration is through the stomata.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain the result for set-up C compared with set-up A.",
        points: ["Bright light makes the stomata open wider (and warms the leaves).", "So more water vapour diffuses out and the shoot takes up water faster."],
        explanation: "Light opens stomata.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Suggest **three** ways in which a farmer could reduce water loss from newly transplanted cabbage seedlings.",
        points: ["Transplant in the late afternoon or on a cloudy day.", "Shade the seedlings / plant windbreaks to reduce wind.", "Mulch and water immediately after transplanting."],
        explanation: "Apply the factors to the field.",
      }),
    ],
    explanation: "Rates from the table; wind, light and humidity change transpiration; apply to transplanting.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.plants.germination"],
    stem: `Tatenda tested saved maize seed by placing four lots of 50 seeds on moist paper in a warm room for 7 days.\n\n${T2_TABLE}\n\nHe also set up three test tubes of soaked seeds: X on moist cotton wool at room temperature; Y under boiled, cooled water covered with oil; Z on moist cotton wool in a refrigerator. Only the seeds in X germinated.`,
    hints: ["Percentage = germinated ÷ tested × 100.", "Each tube lacks one condition compared with X."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total number of seeds that germinated.", value: t2Germ, wrong: [200], explanation: `${T2_LOTS.join(" + ")} = ${t2Germ}.` }),
      P.num({ label: "(b)", stem: "Calculate the percentage germination of the seed.", value: t2Pct, unit: "%", wrong: [t2Germ], explanation: `${t2Germ} ÷ 200 × 100 = ${t2Pct}%.` }),
      P.mcq({
        label: "(c)", stem: "Which tube shows that oxygen is needed for germination?",
        options: [["Y", "Correct: boiled water and oil exclude oxygen."], ["X", "X is the control with all conditions."], ["Z", "Z shows the need for a suitable temperature."], ["X and Z together", "X is the control and Z lacks warmth; neither lacks oxygen."]],
        answer: "A", explanation: "Tube Y lacks oxygen only.",
      }),
      P.short({ label: "(d)", stem: "Name the condition that was lacking in tube Z.", accepted: ["suitable temperature", "warmth", "temperature", "warm temperature", "heat", "optimum temperature"], explanation: "Z was too cold." }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why water is needed for germination.",
        points: ["It softens the testa so the seed swells and the coat splits.", "It activates enzymes that digest the stored food / carries dissolved food to the embryo."],
        explanation: "Roles of water.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Distinguish between germination and emergence.",
        points: ["Germination: the embryo resumes growth and the radicle breaks through the seed coat (in the soil).", "Emergence: the shoot appears above the soil surface."],
        explanation: "Two different stages.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest **two** reasons why fewer seedlings may emerge in the field than germinated in the test.",
        points: ["A hard cap on the soil surface / planting too deep.", "Cold or waterlogged soil / soil pests or fungi / birds eating the seed."],
        explanation: "Field conditions reduce emergence.",
      }),
    ],
    explanation: "A germination test gives viability; tubes show the conditions; field emergence can be lower.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.breeding.monohybrid"],
    stem: `In cattle, the allele for polled (P) is dominant to the allele for horned (p). A farmer mates polled cows that are heterozygous with a heterozygous polled bull. ${T3_CALVES} calves are born.`,
    hints: ["Draw the Punnett square for Pp × Pp.", "A test cross uses a homozygous recessive partner."],
    parts: [
      P.short({ label: "(a)", stem: "State the genotype of a horned calf.", accepted: ["pp"], normalise: ["trim"], explanation: "Horned is recessive: pp." }),
      P.manual({
        label: "(b)", marks: 3, stem: "Use a genetic diagram to show the expected genotypes and phenotypes of the calves.",
        points: ["Gametes: P and p from each parent.", "Offspring genotypes: 1 PP : 2 Pp : 1 pp.", "Phenotypes: 3 polled : 1 horned."],
        explanation: "Heterozygous × heterozygous.",
      }),
      P.num({ label: "(c)", stem: "Calculate the number of horned calves expected.", value: t3Horned, unit: "animals", wrong: [T3_CALVES / 2, (3 * T3_CALVES) / 4], explanation: `1/4 × ${T3_CALVES} = ${t3Horned}.` }),
      P.num({ label: "(d)", stem: "Calculate the number of heterozygous polled calves expected.", value: t3Het, unit: "animals", wrong: [(3 * T3_CALVES) / 4, T3_CALVES / 4], explanation: `2/4 × ${T3_CALVES} = ${t3Het}.` }),
      P.mcq({
        label: "(e)", stem: "To find out whether a polled calf is PP or Pp, it should be mated with:",
        options: [["horned (pp) animals", "Correct: this is a test cross."], ["pure-breeding polled animals", "All offspring would be polled whatever its genotype."], ["polled carrier animals", "Possible but much harder to interpret."], ["its own polled parents", "This is inbreeding, not a test cross."]],
        answer: "A", explanation: "A homozygous recessive partner reveals any p allele.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Explain why a breeder of polled cattle wants bulls that are homozygous (PP).",
        points: ["A PP bull passes only P to every calf.", "So all his calves are polled whatever the cow's genotype.", "A Pp bull passes p to half his calves, so horned calves appear when mated with carrier or horned cows."],
        explanation: "Homozygous sires breed true.",
      }),
    ],
    explanation: "Pp × Pp gives 3 polled : 1 horned; test crosses identify homozygous breeding stock.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.breeding.crop-improvement"],
    stem: `In a fictional seed-company trial, inbred maize line A yielded ${T4.a} t/ha, inbred line B ${T4.b} t/ha and the single cross A × B ${T4.f1} t/ha. On a nearby farm, a hybrid crop yielded 7.0 t/ha and grain saved from it and replanted the next season yielded ${T4.f2} t/ha.`,
    hints: ["Heterosis = (F1 − mean of parents) ÷ mean of parents × 100.", "The saved grain is the F2."],
    parts: [
      P.short({ label: "(a)", stem: "Name the type of hybrid produced by crossing a single cross (A × B) with a third inbred line C.", accepted: ["three-way", "three way", "three-way cross", "three way cross", "three-way hybrid", "three way hybrid", "triple cross"], explanation: "(A × B) × C is a three-way cross." }),
      P.mcq({
        label: "(b)", stem: "Why are the tassels removed from the female rows of a hybrid seed field?",
        options: [["So all silks get pollen from the male rows", "Correct: this prevents self-pollination."], ["To reduce the spread of stalk borer", "This is not the reason."], ["To make the cobs grow larger", "Not the purpose."], ["So the male rows can be harvested", "Seed comes from the female rows."]],
        answer: "A", explanation: "Detasselling controls the pollen parent.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the heterosis of the single cross as a percentage above the mean yield of its parents.",
        value: t4Het, unit: "%", tol: 0.5, wrong: [round(pct(T4.f1, t4Mid), 0), round(pct(T4.f1 - T4.b, T4.b), 0)],
        explanation: `Mean of parents = (${T4.a} + ${T4.b}) ÷ 2 = ${t4Mid.toFixed(1)} t/ha; (${T4.f1} − ${t4Mid.toFixed(1)}) ÷ ${t4Mid.toFixed(1)} × 100 = ${round(t4Het, 0)}%.`,
      }),
      P.num({ label: "(d)", stem: "Calculate the percentage fall in yield when the hybrid grain was replanted.", value: t4Fall, unit: "%", tol: 0.5, wrong: [round(7.0 - T4.f2, 1)], explanation: `(7.0 − ${T4.f2}) ÷ 7.0 × 100 = ${round(t4Fall, 0)}%.` }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the yield fell when the hybrid grain was replanted.",
        points: ["The saved grain is the F2, in which alleles segregate.", "Plants vary, many resemble the weaker inbreds and hybrid vigour is lost."],
        explanation: "Segregation in the F2.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Suggest **three** reasons why some farmers still grow open-pollinated varieties.",
        points: ["Seed can be saved and replanted, so it is cheap.", "Hybrid seed must be bought every season and may be unaffordable or unavailable.", "OPVs may be better adapted to low-input, dry conditions / farmers prefer their taste or storage qualities."],
        explanation: "Cost, availability, adaptation.",
      }),
    ],
    explanation: "Calculate heterosis and the F2 fall, and link them to seed choice.",
  });
});

concept("agri.plants.photosynthesis", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.plants.photosynthesis", "agri.plants.respiration-tropisms"],
    stem: `Pupils grew bean seedlings for 14 days, one tray in a sunny window and one in a dark cupboard, and dried samples to find the mean dry mass per seedling.\n\n${Z1_TABLE}\n\nThe seedlings in the window bent towards the glass; those in the cupboard were tall, thin and yellow.`,
    hints: ["Dry mass rises only when photosynthesis exceeds respiration.", "Percentage change = change ÷ starting value × 100."],
    parts: [
      P.short({ label: "(a)", stem: "Name the process that caused the loss of dry mass in the dark.", accepted: ["respiration", "aerobic respiration", "respiring"], explanation: "Respiration used stored food." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage decrease in dry mass of the seedlings kept in the dark.", value: z1Dark, unit: "%", tol: 0.5, wrong: [round(Z1.start - Z1.dark, 2), 70], explanation: `(${Z1.start.toFixed(2)} − ${Z1.dark.toFixed(2)}) ÷ ${Z1.start.toFixed(2)} × 100 = ${round(z1Dark, 0)}%.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage increase in dry mass of the seedlings in the window.", value: z1Light, unit: "%", tol: 0.5, wrong: [round(pct(Z1.light - Z1.start, Z1.light), 0), 175], explanation: `(${Z1.light.toFixed(2)} − ${Z1.start.toFixed(2)}) ÷ ${Z1.start.toFixed(2)} × 100 = ${round(z1Light, 0)}%.` }),
      P.mcq({
        label: "(d)", stem: "Which gas did the seedlings in the window give out overall during the day?",
        options: [["Oxygen", "Correct: photosynthesis was faster than respiration."], ["Carbon dioxide", "Given out overall only in the dark."], ["Nitrogen", "Not produced by these processes."], ["Water vapour only", "Water vapour is lost, but the question asks about the gas exchange of the two processes."]],
        answer: "A", explanation: "In light, net oxygen is released.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Write the word equation for photosynthesis.",
        points: ["Carbon dioxide + water → glucose + oxygen.", "Light (energy) and chlorophyll shown as conditions over/under the arrow."],
        explanation: "Reactants, products and conditions.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Name the response shown by the seedlings in the window and state its importance to a crop.",
        points: ["Positive phototropism.", "Shoots and leaves grow towards light, so the leaves receive more light for photosynthesis."],
        explanation: "Tropism and its benefit.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Compare photosynthesis and respiration in **four** ways.",
        points: [
          "Photosynthesis makes glucose; respiration breaks it down.",
          "Photosynthesis uses carbon dioxide and releases oxygen; respiration uses oxygen and releases carbon dioxide.",
          "Photosynthesis needs light and chlorophyll and occurs only in green cells; respiration occurs in all living cells.",
          "Photosynthesis occurs only in light; respiration day and night (photosynthesis stores energy; respiration releases it).",
        ],
        explanation: "Matched pairs.",
      }),
      P.manual({
        label: "(h)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Describe and explain how a farmer can manage a maize crop so that photosynthesis is as high as possible and the gain in dry matter is greatest.",
        points: [
          "Correct plant population and spacing so the canopy captures most light without excessive shading.",
          "Timely weeding to remove competition for light, water and nutrients.",
          "Irrigation or moisture conservation (mulch) so stomata stay open for carbon dioxide uptake.",
          "Nitrogen (and magnesium) fertiliser for chlorophyll and leaf growth; top dressing at the right time.",
          "Control of pests and leaf diseases (e.g. stalk borer, fall armyworm, grey leaf spot) to keep green leaf area.",
          "Plant early with the effective rains so the full canopy coincides with the sunniest, warmest part of the season; harvest and dry grain promptly to limit losses by respiration in store.",
        ],
        levels: agricultureLevels(6),
        modelAnswer: "The farmer should plant at the recommended spacing so the leaves of neighbouring plants do not shade each other but the ground is covered and little light is wasted. Early weeding removes plants that shade the maize and compete for water and nutrients. Keeping the soil moist by mulching or irrigation lets the stomata stay open, so carbon dioxide enters. A nitrogen top dressing keeps the leaves green, as nitrogen and magnesium are needed for chlorophyll. Pest and disease control keeps the green leaf area intact. Planting early with the effective rains means the crop has a full canopy during the sunniest, warmest months. Finally, drying grain quickly limits losses of dry matter by respiration in store.",
        explanation: "Link each practice to a factor of photosynthesis or to respiration losses.",
      }),
    ],
    explanation: "Dry mass reflects the balance of photosynthesis and respiration; farm practices raise photosynthesis.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.breeding.crop-improvement", "agri.plants.flowers-pollination"],
    stem: `A fictional seed company near Chinhoyi produces three-way hybrid maize seed. It plants a seed field of ${Z2_ROWS} rows in a repeating pattern of ${Z2_F} female rows (single cross A × B) and ${Z2_M} male rows (inbred line C). The female rows cover ${Z2_FHA} ha and are expected to yield ${Z2_TPH} t/ha of seed.`,
    hints: ["Which rows give the seed?", "1 t = 1,000 kg."],
    parts: [
      P.short({ label: "(a)", stem: "Write the cross that produces this hybrid, using the letters A, B and C.", accepted: ["(A × B) × C", "(A x B) x C", "(AxB)xC", "(A×B)×C", "C × (A × B)", "C x (A x B)", "(A*B)*C"], normalise: ["trim", "lowercase", "collapse_whitespace"], model: "(A × B) × C", explanation: "Single cross (A × B) as female × inbred C as male." }),
      P.short({ label: "(b)", stem: "Name the operation carried out on the female rows before they shed pollen.", accepted: ["detasselling", "detasseling", "removing the tassels", "removal of tassels", "tassel removal"], explanation: "Detasselling." }),
      P.num({ label: "(c)", stem: "Calculate the number of female rows in the field.", value: z2Female, wrong: [Z2_ROWS - z2Female, Z2_ROWS / Z2_F], explanation: `${Z2_ROWS} ÷ ${Z2_F + Z2_M} = ${Z2_ROWS / (Z2_F + Z2_M)} blocks × ${Z2_F} = ${z2Female} rows.` }),
      P.num({
        label: "(d)", marks: 2, stem: `Calculate the number of ${Z2_BAG} kg bags of seed expected from the female rows.`,
        value: z2Bags, unit: "bags", wrong: [Z2_FHA * Z2_TPH * 1000, round((Z2_FHA * Z2_TPH) / Z2_BAG, 2)],
        explanation: `${Z2_FHA} ha × ${Z2_TPH} t/ha = ${round(Z2_FHA * Z2_TPH, 1)} t = ${round(Z2_FHA * Z2_TPH * 1000, 0).toLocaleString("en-GB")} kg; ÷ ${Z2_BAG} kg = ${z2Bags} bags. Forgetting to convert tonnes to kg gives a tiny number.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the seed field must be isolated from other maize fields.",
        points: ["Maize is wind- and cross-pollinated, so pollen from other fields can reach the silks.", "Foreign pollen would produce off-type seed that is not the intended hybrid."],
        explanation: "Isolation keeps the hybrid pure.",
      }),
      P.mcq({
        label: "(f)", stem: "Why is three-way seed cheaper to produce than single-cross seed?",
        options: [["Its female parent is a vigorous single cross", "Correct: it yields much more seed."], ["It needs no detasselling at all", "The female rows are still detasselled."], ["Line C produces seed on the male rows", "Seed is harvested from the female rows only."], ["It is made from open-pollinated varieties", "It is made from inbred lines and a single cross."]],
        answer: "A", explanation: "A vigorous female gives a high seed yield, lowering cost.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain the term heterosis.",
        points: ["The greater vigour / yield of the F1 offspring of a cross.", "Between genetically different (unrelated) parents, compared with the parents."],
        explanation: "Definition with the comparison.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "State **four** aims of crop breeding.",
        points: ["Higher yield.", "Resistance to pests and diseases.", "Hardiness: drought or heat tolerance / early maturity.", "Better quality (nutrition, taste, storage) / uniformity."],
        explanation: "Any four aims.",
      }),
      P.manual({
        label: "(i)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Discuss whether smallholder farmers should buy hybrid maize seed every season or grow open-pollinated varieties.",
        points: [
          "Hybrids give higher, more uniform yields because of heterosis.",
          "Hybrid seed must be bought every season because F2 grain segregates and loses vigour; it is costly.",
          "Hybrids need good management (fertiliser, timely planting, weeding) to reach their potential.",
          "OPV seed can be saved for a few seasons, reducing cost and dependence on suppliers.",
          "OPVs yield less but may be adapted to low-input or dry conditions; seed must be kept isolated to stay true.",
          "Judgement linked to the farmer's resources and region, e.g. hybrids where inputs and rainfall are reliable, OPVs or small grains where they are not.",
        ],
        levels: agricultureLevels(6),
        modelAnswer: "Hybrid maize gives the highest and most uniform yields because of heterosis, so a farmer with good rainfall who can afford fertiliser and timely weeding will usually earn more from it. But hybrid seed must be bought every season, because grain from the hybrid is the F2, in which alleles segregate and the yield falls; this cost is a burden, and if the rains fail the money is lost. Open-pollinated varieties yield less but their seed can be saved and replanted for several seasons if kept away from other maize, which suits farmers with little cash or in drier areas where high inputs do not pay. The best choice therefore depends on the farmer's resources and region: hybrids where inputs and rainfall are reliable, OPVs (or small grains) where they are not.",
        explanation: "Weigh yield against cost and risk and decide for named circumstances.",
      }),
    ],
    explanation: "Hybrid seed production, heterosis and the choice between hybrids and OPVs.",
  });
});

concept("agri.plants.flowers-pollination", { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.plants.flowers-pollination", "agri.plants.asexual-propagation"],
    stem: "A farmer grows maize from seed and cassava from stem cuttings.",
    hints: ["(a) Tassel and silks, wind.", "(b) Cuttings, nodes, roots and shoots; why farmers use them.", "(c) Weigh variation, disease, speed and storage, then judge."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the structure of the maize flowers and how they are pollinated.",
        points: [
          "Male flowers in the tassel at the top of the plant, with anthers hanging on long filaments.",
          "Female flowers on the cob (ear) in a leaf axil; each ovary has a long silk (style and stigma) hanging out of the husks.",
          "Pollen is light and is carried by the wind; the long, sticky/feathery silks catch it.",
          "Tassels shed pollen before the silks of the same plant are ready, so maize is mainly cross-pollinated.",
        ],
        explanation: "Structure and wind pollination.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain how cassava is propagated from stem cuttings and why farmers use this method.",
        points: [
          "Mature, woody stems from healthy plants are cut into pieces with several nodes.",
          "The cuttings are planted upright, slanting or flat in moist soil.",
          "Roots form from the base / nodes and shoots grow from the buds at the nodes.",
          "The new plants are identical to the parent, so a good variety stays true to type.",
          "Cuttings establish quickly using stored food / cassava is easy to multiply this way.",
        ],
        explanation: "Method and reasons.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss the advantages and disadvantages of sexual and asexual reproduction in crop production.",
        points: [
          "Sexual reproduction gives variation, which breeders use to develop new varieties.",
          "Seed is small, light, easy to store and transport, and usually carries few viruses.",
          "But offspring of cross-pollinated crops are not true to type and some crops grow slowly from seed.",
          "Asexual reproduction gives uniform, true-to-type crops that often mature or bear earlier.",
          "But diseases (especially viruses) pass on in planting material, material is bulky and perishable, and there is no variation, so a new disease can destroy the crop.",
          "Judgement: each suits different crops; clean (certified) planting material makes asexual reproduction safer.",
        ],
        levels: agricultureLevels(6),
        explanation: "Balanced discussion with a judgement.",
      }),
    ],
    explanation: "Maize flower structure and pollination, cassava propagation and a comparison of the two kinds of reproduction.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.breeding.livestock-breeding", "agri.breeding.crop-improvement"],
    stem: "A farmer wants to increase the milk yield of her herd of local dairy cows in a hot area.",
    hints: ["(a) Performance, records, conformation.", "(b) Think of the bull, disease and cost.", "(c) Weigh yield against adaptation and management."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe how she should select animals for breeding.",
        points: [
          "Use performance: keep cows with high milk yields and regular calving.",
          "Use records: choose a bull whose daughters (progeny) or mother gave high yields.",
          "Use conformation: sound legs and feet, well-formed udder and teats, good body depth.",
          "Cull cows with low yields, poor fertility, defects or bad temperament.",
        ],
        explanation: "Selection by performance, records and conformation.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain the benefits of using artificial insemination for this herd.",
        points: [
          "Semen from a proven, high-yielding dairy bull can be used without buying him.",
          "No need to keep a bull, saving feed and avoiding danger.",
          "Reduces the spread of venereal diseases.",
          "Avoids inbreeding, as semen from unrelated bulls can be chosen.",
          "Gives access to many breeds, so she can choose genes for milk and heat tolerance.",
        ],
        explanation: "Five distinct benefits.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether she should cross-breed her cows with a high-yielding exotic dairy breed.",
        points: [
          "Crossbreds inherit genes for higher milk yield and show hybrid vigour.",
          "Local genes help the crossbreds tolerate heat, ticks and poorer feed.",
          "Exotic genes bring heat stress, lower fertility and more disease in hot areas.",
          "Crossbreds need better feeding, water, housing and health care to show their potential.",
          "Crossbred females mated together give variable offspring, so a planned breeding system (or AI) is needed.",
          "Judgement: a first cross is worthwhile only if she can improve feeding and disease control; otherwise keep selecting within the local breed.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh genetic gain against adaptation and management, then judge.",
      }),
    ],
    explanation: "Selection, AI and cross-breeding, judged against the environment.",
  });
});
