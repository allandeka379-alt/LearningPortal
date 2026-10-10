// W2b: ZIMSEC Paper 3 essays (ZIM_P3_ESSAY: (a) 8 describe/outline + (b) 12 explain/discuss), self-marked.
import { concept, P, EXAM, checkExam, ZIM } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const essay = (b, { concepts, d = 5, stem, a, bb, hints }) =>
  b.struct({
    d, examStyle: true, skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, paper: "ZIMSEC Paper 3",
    concepts, stem,
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, ...a }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 }, ...bb }),
    ]),
    explanation: "Mark each part against the points: one mark for each point clearly made, up to the marks for the part.",
    hints,
  });

concept(A("reproduction.flowering-plants"), { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- E1: flowering plants
  essay(b, {
    concepts: [A("reproduction.flowering-plants")],
    stem: "Answer both parts.",
    hints: ["In (a) work from the outside of the anther inwards, then follow one pollen mother cell.", "In (b) count the nuclei at each stage and finish with the significance of the endosperm."],
    a: {
      stem: "Describe the structure of a mature anther and the formation of pollen grains.",
      points: [
        "Anther has four pollen sacs (two per lobe) joined by a connective containing a vascular bundle",
        "Wall of each pollen sac: outer epidermis",
        "Fibrous layer (endothecium) with thickened bands, which splits the anther open as it dries (dehiscence)",
        "Middle layers, crushed during development, and inner tapetum that nourishes developing pollen",
        "Diploid pollen (microspore) mother cells divide by meiosis",
        "Forming tetrads of four haploid microspores, which separate",
        "Each microspore develops a tough outer wall; its nucleus divides by mitosis into a tube nucleus and a generative nucleus",
        "Generative nucleus divides by mitosis to form two male gametes (in the grain or the pollen tube)",
      ],
      modelAnswer: "A mature anther has two lobes, each with two pollen sacs, joined by a connective containing a vascular bundle. The wall of each pollen sac has an outer epidermis; a fibrous layer whose cells have bands of thickening, which makes the anther split open as it dries; a few middle layers that become crushed; and an inner tapetum of large cells with dense cytoplasm that nourishes the developing pollen.\n\nInside the sacs, diploid pollen mother cells divide by meiosis, each forming a tetrad of four haploid microspores, which then separate. Each microspore develops a tough, sculptured outer wall, using materials from the tapetum. Its nucleus divides by mitosis into a large tube nucleus and a smaller generative nucleus. The generative nucleus later divides by mitosis to form two male gametes, either in the pollen grain or in the pollen tube.",
    },
    bb: {
      stem: "Explain how the embryo sac develops in the ovule, and describe the process and significance of double fertilisation.",
      points: [
        "Ovule has integuments with a micropyle, enclosing the nucellus",
        "A diploid megaspore mother cell in the nucellus divides by meiosis to form four haploid megaspores",
        "Three megaspores degenerate; one functional megaspore enlarges",
        "Its nucleus divides by mitosis three times, giving eight haploid nuclei",
        "Mature embryo sac: egg cell and two synergids at the micropylar end, three antipodals at the other end",
        "Two polar nuclei in the central cell (seven cells, eight nuclei)",
        "Pollen grain germinates on the stigma; pollen tube grows down the style secreting enzymes, guided to the ovule",
        "Tube enters through the micropyle and releases two male nuclei into the embryo sac",
        "One male nucleus fuses with the egg nucleus to form a diploid zygote, which develops into the embryo",
        "The other fuses with the two polar nuclei to form a triploid primary endosperm nucleus",
        "Endosperm develops into a food store for the embryo / seedling (e.g. maize grain)",
        "Significance: endosperm forms only in fertilised ovules, so food is not wasted; ovule becomes the seed and ovary the fruit",
      ],
      modelAnswer: "An ovule is surrounded by integuments, which leave an opening called the micropyle, and contains a tissue called the nucellus. One cell of the nucellus becomes the diploid megaspore mother cell. It divides by meiosis to form a row of four haploid megaspores, three of which degenerate. The surviving megaspore enlarges and its nucleus divides by mitosis three times, giving eight haploid nuclei. Walls form so that the mature embryo sac has an egg cell and two synergids at the micropylar end, three antipodal cells at the opposite end, and two polar nuclei in a large central cell: seven cells and eight nuclei.\n\nAfter pollination, the pollen grain germinates on the stigma and a pollen tube grows down through the style, secreting hydrolytic enzymes and guided chemically to an ovule. It enters through the micropyle and releases its two male nuclei into the embryo sac. One male nucleus fuses with the egg nucleus to form a diploid zygote, which develops into the embryo. The second fuses with the two polar nuclei to form a triploid primary endosperm nucleus. This is double fertilisation.\n\nThe endosperm nucleus divides repeatedly to form the endosperm, a food store used by the embryo and, in cereals such as maize, by the seedling at germination. Because the endosperm forms only after fertilisation, the plant does not invest food in ovules that contain no embryo. The ovule then becomes the seed, its integuments the testa, and the ovary the fruit.",
    },
  });

  // ---------------------------------------------------------------- E2: oogenesis and the menstrual cycle
  essay(b, {
    concepts: [A("reproduction.gametogenesis"), A("reproduction.menstrual-cycle")],
    stem: "Answer both parts.",
    hints: ["In (a) give the cell at each stage, its ploidy and the division.", "In (b) name the gland, hormone, target and effect, and say where feedback is negative or positive."],
    a: {
      stem: "Outline the process of oogenesis and state how it differs from spermatogenesis.",
      points: [
        "Before birth, oogonia (2n) divide by mitosis in the fetal ovary",
        "They grow into primary oocytes, which begin meiosis I and arrest in prophase I, each in a primary follicle",
        "From puberty, each cycle a primary oocyte completes meiosis I, giving a secondary oocyte and the first polar body",
        "The secondary oocyte arrests at metaphase II and is released at ovulation",
        "Meiosis II is completed only if a sperm enters, giving the ovum and a second polar body",
        "Difference: one functional gamete per primary oocyte; spermatogenesis gives four sperm per primary spermatocyte",
        "Difference: unequal division of cytoplasm in oogenesis; equal in spermatogenesis",
        "Difference: oogonia multiply only before birth and oogenesis is cyclical; spermatogonia divide throughout adult life and spermatogenesis is continuous",
      ],
      modelAnswer: "Before birth, oogonia in the fetal ovary divide repeatedly by mitosis and grow into primary oocytes, which begin meiosis I but stop in prophase I, each inside a primary follicle. From puberty, in each cycle one primary oocyte completes meiosis I just before ovulation, dividing unequally into a large secondary oocyte and a small first polar body. The secondary oocyte begins meiosis II but stops at metaphase II and is released at ovulation. Meiosis II is completed only if a sperm enters, forming the ovum and a second polar body.\n\nOogenesis differs from spermatogenesis in that each primary oocyte gives only one functional gamete, whereas each primary spermatocyte gives four sperm; the cytoplasm divides unequally rather than equally; and oogonia multiply only before birth, so oogenesis is cyclical and ends at the menopause, while spermatogonia divide throughout adult life and sperm production is continuous.",
    },
    bb: {
      stem: "Explain how hormones control the menstrual cycle, including the role of negative and positive feedback.",
      points: [
        "Hypothalamus secretes GnRH, which stimulates the anterior pituitary to secrete FSH and LH",
        "At the start of the cycle low progesterone / oestrogen allow FSH to rise",
        "FSH stimulates follicles to develop; follicle cells secrete oestrogen",
        "Oestrogen causes repair and thickening of the endometrium",
        "Moderate oestrogen inhibits FSH and LH secretion (negative feedback), so usually only one follicle matures",
        "High, sustained oestrogen stimulates a surge of LH (positive feedback)",
        "The LH surge triggers completion of meiosis I and ovulation, about day 14",
        "LH converts the empty follicle into the corpus luteum",
        "The corpus luteum secretes progesterone (and oestrogen), which maintains the thick, vascular endometrium",
        "Progesterone inhibits FSH and LH (negative feedback), so no new follicles develop",
        "Without pregnancy the corpus luteum degenerates, progesterone falls and the endometrium breaks down (menstruation)",
        "The fall in progesterone removes inhibition so FSH rises and a new cycle begins; if an embryo implants, hCG maintains the corpus luteum",
      ],
      modelAnswer: "The hypothalamus secretes GnRH, which stimulates the anterior pituitary gland to secrete FSH and LH. At the start of the cycle, progesterone and oestrogen are low, so FSH secretion rises. FSH stimulates several follicles to develop, and their cells secrete oestrogen, which repairs and thickens the endometrium. At moderate levels oestrogen inhibits FSH and LH secretion by negative feedback, so usually only one follicle matures.\n\nWhen oestrogen reaches a high level and stays high, its effect switches to positive feedback: it stimulates a surge of LH. The LH surge causes the primary oocyte to complete meiosis I and the follicle to rupture, releasing the secondary oocyte at ovulation, around day 14 of a 28-day cycle. LH then converts the empty follicle into the corpus luteum.\n\nThe corpus luteum secretes progesterone and some oestrogen. Progesterone maintains the endometrium in a thick, glandular, well-vascularised state ready for implantation, and inhibits FSH and LH by negative feedback, so no new follicles develop. If no embryo implants, the corpus luteum degenerates after about 10-12 days. Progesterone falls, the endometrium breaks down and menstruation follows, and with the inhibition removed FSH rises again to start a new cycle. If an embryo does implant, it secretes hCG, which keeps the corpus luteum active so that progesterone remains high.",
    },
  });

  // ---------------------------------------------------------------- E3: hormones in contraception and IVF; the placenta
  essay(b, {
    concepts: [A("reproduction.contraception-ivf"), A("reproduction.fertilisation-placenta")],
    stem: "Answer both parts.",
    hints: ["In (a) link each use of a hormone to its normal role in the cycle.", "In (b) give each structural feature with the function it allows, then cover exchange, antibodies, barrier and hormones."],
    a: {
      stem: "Outline how reproductive hormones are used in hormonal contraception and in in vitro fertilisation (IVF).",
      points: [
        "Combined pill contains synthetic oestrogen and progestogen taken daily",
        "These inhibit FSH and LH secretion by negative feedback, so follicles do not mature",
        "No LH surge, so no ovulation; progestogen also thickens cervical mucus (and keeps the endometrium thin)",
        "Progestogen-only methods (pill, injection, implant) mainly thicken mucus and / or prevent ovulation",
        "In IVF, FSH injections stimulate several follicles to mature at once",
        "An hCG injection (acting like LH) triggers final maturation of the oocytes before collection",
        "Oocytes collected and fertilised in vitro; embryos transferred to the uterus",
        "Progesterone is given after transfer to maintain the endometrium for implantation",
      ],
      modelAnswer: "The combined contraceptive pill contains synthetic oestrogen and progestogen, taken daily. They keep hormone levels high enough to inhibit FSH and LH secretion by negative feedback, so follicles do not mature and there is no LH surge, so ovulation does not occur. The progestogen also thickens cervical mucus so sperm cannot pass, and keeps the endometrium thin. Progestogen-only pills, injections and implants work mainly by thickening mucus and, especially the injection and implant, by preventing ovulation.\n\nIn IVF, hormones are used to produce several eggs at once. Injections of FSH stimulate several follicles to mature, and an injection of hCG, which acts like LH, triggers final maturation of the oocytes. These are collected from the follicles and fertilised in a dish, and one or two embryos are transferred to the uterus. Progesterone is then given to maintain the endometrium so that an embryo can implant.",
    },
    bb: {
      stem: "Explain how the structure of the placenta is related to its functions.",
      points: [
        "Placenta formed from fetal chorion (chorionic villi) and maternal endometrium; joined to fetus by umbilical cord",
        "Highly branched chorionic villi give a large surface area for exchange",
        "Villi bathed in maternal blood spaces; only a few thin cell layers separate the bloods, so diffusion distance is short",
        "Maternal and fetal blood do not mix, protecting the fetus from maternal blood pressure and blood-group reactions",
        "Continuous flow in umbilical vessels and maternal spaces maintains steep concentration gradients",
        "Two umbilical arteries bring deoxygenated blood with CO₂ and urea; one umbilical vein returns oxygenated blood with nutrients",
        "Oxygen diffuses to the fetus, helped by fetal haemoglobin's higher affinity for oxygen; CO₂ and urea diffuse to the mother",
        "Glucose by facilitated diffusion; amino acids and ions by active transport (carrier proteins, many mitochondria)",
        "IgG antibodies cross by endocytosis, giving the fetus natural passive immunity",
        "Acts as a partial barrier to maternal cells and most bacteria",
        "But alcohol, nicotine, carbon monoxide, some drugs and pathogens (rubella, syphilis, HIV, Plasmodium) can cross",
        "Secretes hCG early on (maintains corpus luteum), then progesterone and oestrogen to maintain the endometrium and pregnancy",
      ],
      modelAnswer: "The placenta forms from fetal tissue, the chorion with its chorionic villi, and maternal endometrium, and is connected to the fetus by the umbilical cord. Its many highly branched villi give a very large surface area. The villi are bathed in maternal blood in blood spaces, and only a few thin layers of cells separate fetal blood in the villus capillaries from maternal blood, so the diffusion distance is short. The two bloods never mix, which protects the fetus from the mother's high blood pressure and prevents reactions between blood groups. Continuous flow on both sides keeps concentration gradients steep.\n\nTwo umbilical arteries bring deoxygenated blood carrying carbon dioxide and urea from the fetus, and one umbilical vein returns oxygenated blood rich in nutrients. Oxygen diffuses from maternal to fetal blood, helped by fetal haemoglobin, which has a higher affinity for oxygen than adult haemoglobin; carbon dioxide and urea diffuse the other way. Glucose crosses by facilitated diffusion, and amino acids and ions such as calcium and iron by active transport, using carrier proteins and ATP from the many mitochondria in the villus cells. IgG antibodies are taken up by endocytosis and released into fetal blood, giving the baby natural passive immunity.\n\nThe placenta is a partial barrier: it keeps out maternal blood cells and most bacteria, but alcohol, nicotine, carbon monoxide, many drugs and some pathogens, such as rubella virus, the syphilis bacterium, Plasmodium and HIV, can cross. Finally, it is an endocrine organ: early on it secretes hCG, which maintains the corpus luteum, and from about the third month it secretes enough progesterone and oestrogen itself to maintain the endometrium and the pregnancy.",
    },
  });
});
