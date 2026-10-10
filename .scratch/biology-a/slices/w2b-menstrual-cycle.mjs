// W2b: the menstrual cycle and reproductive hormones (ZIMSEC only).
import { concept, P, t, chk, table, dpStr, ZIM } from "../lib.mjs";

concept("abio.reproduction.menstrual-cycle", { file: "reproduction/menstrual-cycle", keyPrefix: "reproduction.menstrual-cycle", applies: ZIM }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which gland secretes FSH and LH?",
    options: [
      ["Anterior pituitary gland", "Correct: both gonadotrophins come from the anterior pituitary."],
      ["Ovary", "The ovary secretes oestrogen and progesterone."],
      ["Hypothalamus, which also produces GnRH", "The hypothalamus secretes GnRH, which stimulates FSH and LH release."],
      ["Adrenal gland", "The adrenal glands do not secrete FSH or LH."],
    ],
    answer: "A",
    explanation: "FSH and LH are secreted by the **anterior pituitary** in response to GnRH.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What triggers ovulation?",
    options: [
      ["A surge in LH", "Correct: caused by positive feedback from high oestrogen."],
      ["A fall in FSH", "FSH stays fairly low; the LH surge is the trigger."],
      ["A rise in progesterone", "Progesterone rises after ovulation, from the corpus luteum."],
      ["The breakdown of the endometrium", "This is menstruation, at the start of the cycle."],
    ],
    answer: "A",
    explanation: "A **surge of LH** around day 14 causes the follicle to rupture and release the secondary oocyte.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which hormone is secreted mainly by the corpus luteum?",
    options: [
      ["Progesterone", "Correct: it maintains the endometrium."],
      ["FSH", "FSH is made by the anterior pituitary."],
      ["LH", "LH is made by the anterior pituitary."],
      ["GnRH", "GnRH is made by the hypothalamus."],
    ],
    answer: "A",
    explanation: "The **corpus luteum** secretes progesterone (and some oestrogen).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "High concentrations of oestrogen just before day 14 cause the LH surge. What kind of control is this?",
    options: [
      ["Positive feedback", "Correct: a rise in oestrogen increases LH, which increases the change further."],
      ["Negative feedback", "Negative feedback would reduce LH; here LH rises sharply."],
      ["Nervous control", "This is hormonal control."],
      ["Antagonistic control by insulin and glucagon", "Insulin and glucagon control blood glucose."],
    ],
    answer: "A",
    explanation: "Sustained high oestrogen **stimulates** LH release: **positive feedback**, leading to ovulation.",
    hints: ["Does the rise in oestrogen reduce or increase LH?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does menstruation occur at the end of a cycle in which there is no pregnancy?",
    options: [
      ["The corpus luteum degenerates, so progesterone falls and the endometrium breaks down", "Correct: the endometrium is no longer maintained."],
      ["A surge of LH causes the endometrium to be shed through the cervix", "The LH surge causes ovulation, mid-cycle."],
      ["FSH digests the endometrium", "FSH acts on follicles, not on the endometrium."],
      ["Oestrogen rises to a very high level and destroys the blood vessels", "Oestrogen falls at the end of the cycle."],
    ],
    answer: "A",
    explanation: "Without hCG from an embryo, the **corpus luteum degenerates**; the **fall in progesterone** means the endometrium is no longer maintained.",
    hints: ["Which hormone maintains the endometrium?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do the concentrations of FSH and LH rise after the menopause?",
    options: [
      ["Low ovarian hormones no longer give negative feedback", "Correct: the pituitary is no longer inhibited."],
      ["The anterior pituitary gland grows larger and more active with age after about 45", "The rise is due to loss of feedback, not pituitary growth."],
      ["Follicles make more FSH and LH as they run out", "Follicles do not make FSH or LH."],
      ["HRT always contains FSH and LH", "HRT contains oestrogen and progestogen."],
    ],
    answer: "A",
    explanation: "With few follicles left, oestrogen and progesterone fall, so they no longer **inhibit** FSH and LH.",
    hints: ["What normally keeps FSH and LH low?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is a progestogen included in HRT for women who still have a uterus?",
    options: [
      ["Oestrogen alone makes the endometrium grow, raising cancer risk", "Correct: the progestogen protects the endometrium."],
      ["Progestogen stimulates ovulation, restoring fertility", "HRT does not restore fertility."],
      ["Progestogen is needed to make the oestrogen dissolve in the blood plasma for transport", "This is not its role."],
      ["Oestrogen cannot reach the bones without progestogen", "Oestrogen acts on bone by itself."],
    ],
    answer: "A",
    explanation: "Unopposed oestrogen makes the endometrium keep thickening, increasing the risk of endometrial cancer; adding a **progestogen** reduces this.",
    hints: ["Which tissue does oestrogen stimulate to grow?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change in the ovary is caused by FSH?",
    options: [
      ["Growth of follicles", "Correct: FSH is follicle-stimulating hormone."],
      ["Formation of the corpus luteum from the empty follicle", "LH converts the follicle into the corpus luteum."],
      ["Release of the secondary oocyte", "Ovulation is triggered by LH."],
      ["Degeneration of the corpus luteum", "This happens when LH is low and no hCG is present."],
    ],
    answer: "A",
    explanation: "FSH stimulates **follicle growth** and oestrogen secretion by follicle cells.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Oestrogen stimulates the repair and thickening of the endometrium after menstruation.",
    answer: true,
    explanation: "True. Oestrogen from the developing follicle rebuilds the endometrium.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If an embryo implants, hCG keeps the corpus luteum active so that progesterone stays high.",
    answer: true,
    explanation: "True. This prevents menstruation and maintains the pregnancy early on.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each event with the hormone change that causes it.",
    pairs: [
      ["Growth of several follicles at the start of the cycle", "Rise in FSH"],
      ["Ovulation", "Surge in LH"],
      ["Maintenance of a thick, glandular endometrium", "High progesterone"],
      ["Menstruation", "Fall in progesterone"],
    ],
    explanation: "FSH → follicles; LH surge → ovulation; progesterone maintains, and its fall causes menstruation.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "After ovulation, LH converts the follicle into the {{blank:a}}, which secretes {{blank:b}}. This hormone inhibits FSH and LH by {{blank:c}} feedback.",
    blanks: [
      { id: "a", accepted: ["corpus luteum"], choices: ["corpus luteum", "Graafian follicle", "placenta"] },
      { id: "b", accepted: ["progesterone"], choices: ["progesterone", "testosterone", "FSH"] },
      { id: "c", accepted: ["negative"], choices: ["negative", "positive", "no"] },
    ],
    explanation: "Corpus luteum, progesterone, negative feedback.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the time in a woman's life, usually between about 45 and 55, when ovulation and menstruation stop permanently.",
    accepted: ["menopause", "the menopause"],
    wrong: ["puberty"],
    explanation: "The **menopause**.",
  });

  const cycle = 30;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The luteal phase of the menstrual cycle lasts about 14 days. On approximately which day would ovulation occur in a woman whose cycle is 30 days long?",
    value: cycle - 14,
    wrong: [14, 15],
    explanation: t`Ovulation ≈ cycle length − 14 = $30 - 14 = ${cycle - 14}$. Day 14 applies only to a 28-day cycle.`,
  });

  const lhD = [0, 12, 24, 36, 48];
  const lh = [7, 11, 38, 66, 9];
  const fold = lh[3] / lh[0];
  chk(Number(fold.toFixed(2)), 9.43);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The LH concentration in a woman's blood was measured every 12 hours around the middle of her cycle.\n\n${table(["Time from first sample / hours", ...lhD.map(String)], [["LH / arbitrary units", ...lh.map(String)]])}\n\nCalculate how many times greater the peak LH concentration is than the concentration in the first sample. Give your answer to three significant figures.`,
    value: fold, sf: 3,
    wrong: [lh[3] - lh[0], Number((lh[0] / lh[3]).toFixed(3))],
    explanation: t`1. Peak (at 36 hours) $= 66$; first sample $= 7$.
2. $66 \div 7 = ${dpStr(fold, 3)}$, which is ${dpStr(fold, 2)} to three significant figures.
3. Subtracting (66 − 7 = 59) gives the increase, not the number of times greater.
4. This is the LH surge; ovulation would be expected about a day after the peak.`,
    hints: ["Divide the peak by the starting value."],
  });

  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how hormones control the events of the menstrual cycle from day 1 to ovulation.",
    points: [
      "Low progesterone / oestrogen at the start allows FSH secretion to rise",
      "FSH stimulates growth of follicles, whose cells secrete oestrogen",
      "Oestrogen causes repair and thickening of the endometrium",
      "Moderate oestrogen inhibits FSH and LH (negative feedback), so usually only one follicle matures",
      "High sustained oestrogen triggers an LH surge (positive feedback), causing ovulation",
    ],
    modelAnswer: "At the start of the cycle progesterone and oestrogen are low, so the anterior pituitary secretes more FSH. FSH stimulates follicles to grow, and their cells secrete oestrogen, which repairs and thickens the endometrium. At moderate levels oestrogen inhibits FSH and LH secretion, so usually only one follicle matures. When oestrogen becomes high and stays high, it switches to positive feedback, causing a surge of LH that triggers ovulation around day 14.",
    explanation: "FSH → follicle → oestrogen → endometrium; negative then positive feedback → LH surge.",
    hints: ["Mention both kinds of feedback."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the role of progesterone in the second half of the menstrual cycle.",
    points: [
      "Secreted by the corpus luteum after ovulation",
      "Maintains the thick, glandular, well-vascularised endometrium for implantation",
      "Inhibits FSH and LH (negative feedback), so no new follicles develop",
    ],
    modelAnswer: "Progesterone is secreted by the corpus luteum after ovulation. It keeps the endometrium thick, glandular and rich in blood vessels, ready for an embryo to implant, and it inhibits FSH and LH so that no new follicles develop.",
    explanation: "Source, effect on endometrium, effect on pituitary.",
    hints: ["Where is it made, and what does it act on?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the benefits and risks of hormone replacement therapy (HRT) after the menopause.",
    points: [
      "Benefit: relieves symptoms caused by low oestrogen, e.g. hot flushes, night sweats, sleep problems",
      "Benefit: slows bone loss, reducing the risk of osteoporosis and fractures",
      "Risk: small increased risk of breast cancer with some types / longer use",
      "Risk: increased risk of blood clots / stroke with some types; so decisions are individual, with a doctor",
    ],
    modelAnswer: "HRT replaces oestrogen, relieving hot flushes, night sweats and sleep problems, and slows the loss of bone density, lowering the risk of osteoporosis and fractures. However, some types of HRT slightly increase the risk of breast cancer, especially with longer use, and tablets can increase the risk of blood clots and stroke. The balance depends on each woman's age and health, so the decision is made individually with a doctor.",
    explanation: "Two benefits and two risks, stated cautiously.",
    hints: ["Think about symptoms, bones, cancer and clots."],
  });

  const day = [1, 5, 9, 14, 17, 19, 22, 26, 30, 32];
  const prog = [1, 1, 1, 1, 1, 3, 11, 24, 7, 1];
  const oes = [3, 4, 8, 17, 23, 9, 11, 19, 6, 3];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Blood concentrations of two ovarian hormones, X and Y, were measured during one 32-day cycle of a healthy woman (arbitrary units).\n\n${table(["Day", ...day.map(String)], [["Hormone X", ...oes.map(String)], ["Hormone Y", ...prog.map(String)]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Identify hormone Y.",
        options: [
          ["Progesterone", "Correct: low until after ovulation, peaking in the luteal phase."],
          ["Oestrogen", "Oestrogen (X) peaks before ovulation."],
          ["FSH", "FSH is a pituitary hormone, not an ovarian one."],
          ["LH", "LH is a pituitary hormone."],
        ],
        answer: "A",
        explanation: "Y rises only after ovulation and peaks on day 26: progesterone from the corpus luteum.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "On which day did hormone X reach its first peak?",
        value: 17, wrong: [23],
        explanation: "X (oestrogen) peaks at 23 units on day 17.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest on which day ovulation most probably occurred, and give a reason using the data.",
        points: ["About day 18 (between day 17 and day 19)", "After the oestrogen peak on day 17 (which triggers the LH surge) and just before progesterone starts to rise on day 19"],
        modelAnswer: "About day 18: just after oestrogen peaked on day 17, which would trigger the LH surge, and just before progesterone began to rise on day 19 as the corpus luteum formed. In a 32-day cycle this fits a luteal phase of about two weeks.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the changes in hormone Y from day 22 to day 32.",
        points: [
          "Y rises to a peak of 24 on day 26 because the corpus luteum secretes progesterone",
          "Y then falls to 1 by day 32 because the corpus luteum degenerates (no pregnancy / no hCG)",
          "The fall causes the endometrium to break down (menstruation) and removes inhibition of FSH",
        ],
        modelAnswer: "Progesterone rises to 24 units on day 26 as the corpus luteum secretes it. Without an embryo producing hCG, the corpus luteum degenerates, so progesterone falls to 1 unit by day 32. This fall causes the endometrium to break down and allows FSH to rise for the next cycle.",
      }),
      P.tf({
        label: "(e)", stem: "True or false: the data suggest this woman became pregnant during this cycle.",
        answer: false,
        explanation: "False. Progesterone fell to baseline by day 32; in pregnancy hCG would keep it high.",
      }),
    ],
    explanation: "Oestrogen peaks before ovulation; progesterone peaks in the luteal phase and falls without pregnancy.",
    hints: ["Which hormone rises only after ovulation?"],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Chipo is 51 years old. Her periods have become irregular and then stopped, and she has hot flushes and poor sleep. A blood test shows high FSH and low oestrogen.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the stage of life Chipo is going through.",
        accepted: ["menopause", "the menopause", "perimenopause"],
        wrong: ["puberty"],
        explanation: "The **menopause**.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why her FSH is high.",
        points: ["Ovaries have few follicles / stop responding, so oestrogen (and progesterone) are low", "Low ovarian hormones no longer inhibit FSH secretion (negative feedback removed)"],
        modelAnswer: "Her ovaries have few follicles left and secrete little oestrogen, so there is no negative feedback to inhibit FSH, which rises.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why low oestrogen increases her risk of fractures in later life.",
        points: ["Oestrogen helps maintain bone density (slows bone breakdown)", "Low oestrogen leads to faster bone loss / osteoporosis, so bones break more easily"],
        modelAnswer: "Oestrogen slows the breakdown of bone; with low oestrogen bone is lost faster, causing osteoporosis, so bones become weaker and fracture more easily.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: after the menopause, a woman still ovulates but no longer menstruates.",
        answer: false,
        explanation: "False. Both ovulation and menstruation stop.",
      }),
    ],
    explanation: "Loss of ovarian hormones at the menopause removes negative feedback and reduces bone protection.",
    hints: ["What controls FSH secretion?"],
  });

  b.card("FACT", "Source of the four cycle hormones", "Anterior pituitary: FSH, LH. Follicle: oestrogen. Corpus luteum: progesterone (and oestrogen).");
  b.card("FACT", "Role of FSH", "Stimulates follicle growth and oestrogen secretion.");
  b.card("FACT", "Role of LH", "Surge triggers ovulation; forms and maintains the corpus luteum.");
  b.card("FACT", "Role of oestrogen", "Repairs and thickens the endometrium; moderate levels inhibit FSH and LH; high levels trigger the LH surge.");
  b.card("FACT", "Role of progesterone", "Maintains the endometrium; inhibits FSH and LH.");
  b.card("CONCEPT", "Positive feedback in the cycle", "High sustained oestrogen stimulates the LH surge, causing ovulation.");
  b.card("CONCEPT", "What causes menstruation?", "Corpus luteum degenerates; progesterone falls; endometrium breaks down.");
  b.card("CONCEPT", "Hormone changes at the menopause", "Oestrogen and progesterone fall; FSH and LH rise (no negative feedback).");
  b.card("FACT", "Benefits and risks of HRT", "Benefits: relieves hot flushes, protects bone. Risks: small rises in breast cancer, clots and stroke with some types.");
});
