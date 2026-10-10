// W2b: gametogenesis and its hormonal control (ZIMSEC only).
import { concept, P, t, chk, table, ZIM } from "../lib.mjs";

concept("abio.reproduction.gametogenesis", { file: "reproduction/gametogenesis", keyPrefix: "reproduction.gametogenesis", applies: ZIM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which cells in the testis secrete testosterone?",
    options: [
      ["Interstitial (Leydig) cells", "Correct: they lie between the tubules and respond to LH."],
      ["Sertoli cells, which nourish the developing sperm inside the tubules", "Sertoli cells nourish sperm and secrete inhibin, not testosterone."],
      ["Spermatogonia", "Spermatogonia are germ cells that divide by mitosis."],
      ["Spermatids", "Spermatids develop into sperm."],
    ],
    answer: "A",
    explanation: "**Interstitial (Leydig) cells**, between the seminiferous tubules, secrete testosterone in response to LH.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which cell is released from the ovary at ovulation?",
    options: [
      ["A secondary oocyte", "Correct: arrested at metaphase II."],
      ["An ovum that has completed meiosis II", "Meiosis II is completed only after a sperm enters."],
      ["A primary oocyte", "The primary oocyte completes meiosis I before ovulation."],
      ["An oogonium", "Oogonia divide only before birth."],
    ],
    answer: "A",
    explanation: "A **secondary oocyte** is released; it completes meiosis II only if a sperm enters.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many functional spermatozoa are produced from one primary spermatocyte?",
    options: [
      ["Four", "Correct: meiosis I and II give four spermatids."],
      ["One, plus three polar bodies", "Polar bodies form in oogenesis, not spermatogenesis."],
      ["Two", "Two secondary spermatocytes form after meiosis I; meiosis II doubles this."],
      ["Eight", "Meiosis gives four cells."],
    ],
    answer: "A",
    explanation: "One primary spermatocyte → 2 secondary spermatocytes → **4** spermatids → 4 spermatozoa.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are the divisions of the oocyte in oogenesis unequal?",
    options: [
      ["Most cytoplasm stays in one cell, giving the ovum reserves for the embryo", "Correct: polar bodies receive almost no cytoplasm."],
      ["So that the polar bodies can be fertilised as well as the ovum", "Polar bodies normally degenerate."],
      ["To make the ovum diploid", "The ovum is haploid."],
      ["Because the oocyte has no centrioles, so it is unable to divide its cytoplasm equally", "This is not the reason; unequal division is an adaptation."],
    ],
    answer: "A",
    explanation: "Unequal cytokinesis keeps nearly all the **cytoplasm** (food reserves, mitochondria, ribosomes) in one large cell.",
    hints: ["What does the early embryo need before it can feed?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A man has a fault that prevents his anterior pituitary from secreting LH. Which effect would be expected?",
    options: [
      ["Low testosterone and reduced sperm production", "Correct: LH stimulates interstitial cells; spermatogenesis needs testosterone."],
      ["High testosterone and very high sperm production", "Without LH, testosterone secretion falls."],
      ["Normal testosterone but no Sertoli cells", "Sertoli cells are present; LH acts on interstitial cells."],
      ["High GnRH causing the testes to produce oestrogen instead", "This is not the expected effect."],
    ],
    answer: "A",
    explanation: "LH stimulates interstitial cells to secrete testosterone, which is needed with FSH for spermatogenesis.",
    hints: ["Which cells does LH target in the testis?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "When are the primary oocytes of a woman formed?",
    options: [
      ["Before her birth, in the fetal ovary", "Correct: oogonia multiply and form primary oocytes only before birth."],
      ["At puberty, when FSH secretion begins", "FSH starts follicle development; the oocytes already exist."],
      ["Each month, in the follicle that will ovulate", "No new oocytes form after birth."],
      ["At fertilisation, when the sperm enters", "Meiosis II is completed then, but the primary oocyte formed long before."],
    ],
    answer: "A",
    explanation: "Oogonia divide by mitosis and grow into primary oocytes **before birth**; these arrest in prophase I.",
    hints: ["Do adult women have oogonia?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Taking the DNA content of a spermatogonium in G1 as 2 units, what is the DNA content of a secondary spermatocyte?",
    options: [
      ["2 units", "Correct: replication doubles to 4, meiosis I halves to 2 (chromatids still joined)."],
      ["1 unit", "This is a spermatid, after meiosis II."],
      ["4 units", "This is a primary spermatocyte after replication."],
      ["8 units", "DNA is replicated only once before meiosis."],
    ],
    answer: "A",
    explanation: "Spermatogonium (G1) 2 → primary spermatocyte after S phase 4 → meiosis I → secondary spermatocyte **2** → meiosis II → spermatid 1.",
    hints: ["Replication doubles DNA; each division halves it."],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which hormone from the hypothalamus stimulates the anterior pituitary to secrete FSH and LH?",
    options: [
      ["GnRH", "Correct: gonadotrophin-releasing hormone."],
      ["Testosterone", "Testosterone is made in the testes and inhibits GnRH and LH."],
      ["Inhibin", "Inhibin from Sertoli cells inhibits FSH."],
      ["Progesterone", "Progesterone is made by the corpus luteum."],
    ],
    answer: "A",
    explanation: "**GnRH** from the hypothalamus stimulates FSH and LH release.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Spermatogonia divide by mitosis throughout a man's adult life.",
    answer: true,
    explanation: "True. This keeps up a continuous supply of cells entering spermatogenesis.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Meiosis II in the human oocyte is completed only after a sperm has entered the secondary oocyte.",
    answer: true,
    explanation: "True. The second polar body is then released and the nuclei fuse.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each hormone with its effect in the male.",
    pairs: [
      ["GnRH", "Stimulates the anterior pituitary to release FSH and LH"],
      ["LH", "Stimulates interstitial cells to secrete testosterone"],
      ["FSH", "Acts on Sertoli cells to stimulate spermatogenesis"],
      ["Inhibin", "Inhibits FSH secretion by negative feedback"],
    ],
    explanation: "Hypothalamus → pituitary → testis, with negative feedback.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In oogenesis, completion of meiosis I gives a large {{blank:a}} and a small first {{blank:b}}. A mature follicle is called a {{blank:c}} follicle; after ovulation it becomes the {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["secondary oocyte"], choices: ["secondary oocyte", "primary oocyte", "oogonium"] },
      { id: "b", accepted: ["polar body"], choices: ["polar body", "spermatid", "synergid"] },
      { id: "c", accepted: ["Graafian"], choices: ["Graafian", "primary", "Sertoli"] },
      { id: "d", accepted: ["corpus luteum"], choices: ["corpus luteum", "endometrium", "epididymis"] },
    ],
    explanation: "Secondary oocyte, polar body, Graafian follicle, corpus luteum.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the large cells in the seminiferous tubules that nourish developing sperm.",
    accepted: ["Sertoli cells", "Sertoli cell", "Sertoli", "nurse cells"],
    wrong: ["interstitial cells", "Leydig cells"],
    explanation: "**Sertoli cells** nourish developing sperm and respond to FSH.",
  });

  const psc = 85;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a section of a seminiferous tubule, 85 primary spermatocytes complete meiosis. How many spermatids are formed?",
    value: psc * 4,
    wrong: [psc * 2, psc],
    explanation: t`Each primary spermatocyte gives 4 spermatids: $85 \times 4 = ${psc * 4}$. (85 × 2 = 170 is the number of secondary spermatocytes.)`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A human primary oocyte contains 46 chromosomes. How many chromatids does a secondary oocyte (arrested at metaphase II) contain?",
    value: 46,
    wrong: [23, 92],
    explanation: "The secondary oocyte has 23 chromosomes, each still made of two chromatids: 23 × 2 = **46** chromatids.",
    hints: ["Meiosis I separates homologous chromosomes, not chromatids."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the stages of spermatogenesis, from spermatogonia to spermatozoa.",
    points: [
      "Spermatogonia (2n) in the germinal epithelium divide by mitosis",
      "Some grow into primary spermatocytes (2n)",
      "Primary spermatocytes divide by meiosis I to give two secondary spermatocytes (n)",
      "Secondary spermatocytes divide by meiosis II to give four spermatids (n)",
      "Spermatids differentiate into spermatozoa (acrosome, flagellum, mitochondria), nourished by Sertoli cells",
    ],
    modelAnswer: "Diploid spermatogonia in the germinal epithelium of the seminiferous tubules divide repeatedly by mitosis. Some grow into primary spermatocytes, which divide by meiosis I to form two haploid secondary spermatocytes. These divide by meiosis II, giving four haploid spermatids. Embedded in Sertoli cells, the spermatids develop an acrosome, a flagellum and many mitochondria, and lose most of their cytoplasm, becoming spermatozoa.",
    explanation: "Name each cell, its ploidy and the division.",
    hints: ["Start at the outside of the tubule."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Compare spermatogenesis and oogenesis.",
    points: [
      "Spermatogonia multiply throughout adult life; oogonia only before birth",
      "One primary spermatocyte gives four sperm; one primary oocyte gives one ovum (and polar bodies)",
      "Cytoplasm divided equally in spermatogenesis; unequally in oogenesis",
      "Spermatogenesis continuous and meiosis completed in the testis; oogenesis cyclical, with meiosis arrested and completed only at fertilisation",
    ],
    modelAnswer: "Spermatogonia keep dividing throughout adult life, while oogonia multiply only before birth. Each primary spermatocyte forms four sperm by equal divisions, but each primary oocyte forms one ovum and polar bodies by unequal divisions. Spermatogenesis is continuous and meiosis is completed in the testis; oogenesis is cyclical, with meiosis paused in prophase I and metaphase II and completed only after fertilisation.",
    explanation: "Matched points of contrast.",
    hints: ["Compare timing, number of gametes and cytoplasm."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how negative feedback keeps the concentration of testosterone in the blood fairly constant.",
    points: [
      "Hypothalamus secretes GnRH, stimulating the anterior pituitary to secrete LH",
      "LH stimulates interstitial cells to secrete testosterone",
      "A rise in testosterone inhibits secretion of GnRH and LH",
      "So testosterone secretion falls; when it falls, inhibition is removed and LH rises again",
    ],
    modelAnswer: "GnRH from the hypothalamus stimulates the anterior pituitary to release LH, which makes interstitial cells secrete testosterone. When testosterone rises, it inhibits GnRH and LH secretion, so less testosterone is made. When testosterone falls, the inhibition is lifted, LH rises and testosterone secretion increases again.",
    explanation: "A rise switches off the stimulus; a fall switches it on.",
    hints: ["What does testosterone do to the hypothalamus and pituitary?"],
  });

  const stages = ["Primary follicle", "Developing follicle", "Graafian follicle", "Corpus luteum"];
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A photomicrograph of a section through an ovary, described in words: structure P is a small oocyte surrounded by a single layer of flattened cells; structure Q has an oocyte surrounded by several layers of cells and small fluid spaces; structure R is very large, with one big fluid-filled cavity and the oocyte on a mound of cells at one side, bulging from the surface; structure S is a solid mass of large, pale cells with no oocyte and a rich blood supply.",
    parts: [
      P.match({
        label: "(a)", marks: 4, stem: "Match each structure with its name.",
        pairs: [["P", stages[0]], ["Q", stages[1]], ["R", stages[2]], ["S", stages[3]]],
        explanation: "P primary follicle, Q developing follicle, R Graafian follicle, S corpus luteum.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the hormone mainly secreted by structure S.",
        accepted: ["progesterone"],
        wrong: ["FSH", "oestrogen"],
        explanation: "The corpus luteum secretes mainly **progesterone** (and some oestrogen).",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State the stage of meiosis reached by the oocyte in P and explain when it will continue.",
        points: ["Prophase I (primary oocyte, arrested since before birth)", "Meiosis I resumes just before ovulation, after the LH surge, if this follicle becomes the one that matures"],
        modelAnswer: "The primary oocyte in P is arrested in prophase I, where it has been since before birth. It will complete meiosis I only if its follicle develops fully and is stimulated by the LH surge just before ovulation.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest why structure S has a rich blood supply.",
        points: ["To carry the hormones it secretes (progesterone) into the blood / supply raw materials such as cholesterol"],
        modelAnswer: "It is an endocrine structure, so capillaries carry away the progesterone it secretes.",
      }),
    ],
    explanation: "Follicle stages lead to ovulation and the corpus luteum.",
    hints: ["Follow the follicle from smallest to after ovulation."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `In an investigation with laboratory rats, the anterior pituitary gland was removed from adult males (hypophysectomy). Groups were then given daily injections and examined after four weeks.\n\n${table(["Group", "Injection", "Blood testosterone", "Sperm production"], [["1", "None (intact pituitary, control)", "Normal", "Normal"], ["2", "None (pituitary removed)", "Very low", "Absent"], ["3", "LH only", "Normal", "Reduced"], ["4", "LH and FSH", "Normal", "Normal"]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain the results for group 2.",
        points: ["No FSH or LH secreted without the anterior pituitary", "No LH means interstitial cells do not secrete testosterone, and without testosterone / FSH spermatogenesis stops"],
        modelAnswer: "Without the anterior pituitary no FSH or LH is secreted. Without LH the interstitial cells make no testosterone, and without testosterone and FSH spermatogenesis stops.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "What do groups 3 and 4 show about the roles of LH and FSH?",
        points: ["LH alone restores testosterone (LH controls testosterone secretion)", "Full sperm production needs FSH as well as testosterone"],
        modelAnswer: "LH alone restored testosterone, so LH controls its secretion; sperm production returned to normal only with FSH as well, so spermatogenesis needs both FSH and testosterone.",
      }),
      P.mcq({
        label: "(c)", stem: "Which cells are the target of FSH in the testis?",
        options: [
          ["Sertoli cells", "Correct: FSH acts on Sertoli cells, which support spermatogenesis."],
          ["Interstitial cells", "These are the target of LH."],
          ["Red blood cells in the testis capillaries", "These are not hormone targets here."],
          ["Cells of the epididymis that store sperm", "FSH acts in the seminiferous tubules."],
        ],
        answer: "A",
        explanation: "FSH acts on **Sertoli cells**.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest why group 1 was included.",
        points: ["Control: shows normal levels for comparison / that the surgery or injection procedure itself did not cause the changes"],
        modelAnswer: "As a control, to show normal testosterone and sperm production for comparison.",
      }),
    ],
    explanation: "LH → testosterone; FSH + testosterone → spermatogenesis.",
    hints: ["Compare each group with the one before it."],
  });

  b.card("FACT", "Cells of the seminiferous tubule", "Spermatogonia, spermatocytes, spermatids, spermatozoa, Sertoli cells; interstitial cells lie between tubules.");
  b.card("CONCEPT", "Spermatogenesis sequence", "Spermatogonium (2n, mitosis) → primary spermatocyte (2n) → meiosis I → 2 secondary spermatocytes (n) → meiosis II → 4 spermatids → 4 sperm.");
  b.card("CONCEPT", "Oogenesis sequence", "Oogonia (before birth) → primary oocyte (arrested prophase I) → meiosis I → secondary oocyte + polar body → ovulation → meiosis II at fertilisation.");
  b.card("FACT", "Role of Sertoli cells", "Nourish and protect developing sperm; respond to FSH; secrete inhibin.");
  b.card("FACT", "Role of interstitial (Leydig) cells", "Secrete testosterone in response to LH.");
  b.card("CONCEPT", "Why is oocyte division unequal?", "The ovum keeps most cytoplasm, food and organelles for the early embryo; polar bodies degenerate.");
  b.card("FACT", "Which cell is released at ovulation?", "A secondary oocyte arrested at metaphase II.");
  b.card("CONCEPT", "Hormonal control in males", "GnRH → FSH and LH; LH → testosterone; FSH + testosterone → spermatogenesis; testosterone and inhibin feed back negatively.");
});
