// W2b: contraception, IVF and abortion: biology and ethics (ZIMSEC only).
import { concept, P, t, chk, table, dpStr, ZIM } from "../lib.mjs";

concept("abio.reproduction.contraception-ivf", { file: "reproduction/contraception-ivf", keyPrefix: "reproduction.contraception-ivf", applies: ZIM }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which method of contraception also greatly reduces the risk of transmitting HIV?",
    options: [
      ["Condom", "Correct: a barrier to the exchange of body fluids."],
      ["Combined oral pill", "The pill prevents ovulation but gives no protection against HIV."],
      ["Copper IUD", "An IUD does not stop body fluids being exchanged."],
      ["Contraceptive implant placed under the skin of the arm", "Implants prevent ovulation but not HIV transmission."],
    ],
    answer: "A",
    explanation: "Only **condoms** act as a barrier to semen and vaginal fluids, reducing HIV and other STIs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does the combined contraceptive pill mainly prevent pregnancy?",
    options: [
      ["It inhibits FSH and LH secretion, so ovulation does not occur", "Correct: negative feedback from the synthetic hormones."],
      ["It kills sperm in the vagina before they can reach the cervix", "Spermicides do this; the pill acts on hormones."],
      ["It blocks the oviducts", "Tubal ligation blocks the oviducts."],
      ["It makes the corpus luteum secrete more FSH", "The corpus luteum does not secrete FSH."],
    ],
    answer: "A",
    explanation: "The oestrogen and progestogen **inhibit FSH and LH** by negative feedback: follicles do not mature and there is no LH surge.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which structures are cut and tied in a vasectomy?",
    options: [
      ["Sperm ducts", "Correct: the vas deferens on each side."],
      ["Oviducts, so that eggs cannot reach the uterus", "This is tubal ligation, in women."],
      ["Urethra", "The urethra is not cut; urine and semen still pass."],
      ["Seminiferous tubules", "Sperm are still made but cannot leave the testes."],
    ],
    answer: "A",
    explanation: "In a **vasectomy** each sperm duct is cut and tied, so semen contains no sperm.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do implants and injections have far fewer pregnancies in typical use than daily pills?",
    options: [
      ["They do not depend on the user remembering to take a dose every day", "Correct: missed pills cause most pill failures."],
      ["They contain much stronger hormones that also kill sperm", "They act mainly by preventing ovulation, not killing sperm."],
      ["They work by blocking the oviducts permanently", "They are reversible and do not block oviducts."],
      ["They prevent sexually transmitted infections as well", "They give no protection against STIs."],
    ],
    answer: "A",
    explanation: "Typical-use failure of pills comes mostly from **missed doses**; long-acting methods remove this.",
    hints: ["Compare perfect use with typical use."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In IVF, why is the woman given injections of FSH?",
    options: [
      ["To make several follicles mature at once, so several oocytes can be collected", "Correct: more eggs give more chances of an embryo."],
      ["To trigger ovulation so the eggs are released into the oviduct", "Eggs are collected from follicles before ovulation."],
      ["To maintain the endometrium after embryo transfer", "Progesterone does this."],
      ["To make the sperm capacitated", "Sperm are prepared in the laboratory."],
    ],
    answer: "A",
    explanation: "FSH stimulates **several follicles** to mature, so several oocytes can be collected.",
    hints: ["What does FSH stimulate?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does a copper intrauterine device (IUD) prevent pregnancy?",
    options: [
      ["Copper ions are toxic to sperm and eggs, and implantation is prevented", "Correct: fertilisation and implantation are both reduced."],
      ["It releases oestrogen that inhibits FSH", "Copper IUDs contain no hormones."],
      ["It blocks the cervix completely so that no semen can enter the uterus at all", "It sits inside the uterus; it does not seal the cervix."],
      ["It removes the endometrium every month", "It does not remove the endometrium."],
    ],
    answer: "A",
    explanation: "Copper ions harm sperm and eggs, and the endometrium becomes unsuitable for **implantation**.",
    hints: ["What do copper ions do to cells?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In the fertility awareness method, a woman records a rise of about 0.3 °C in her morning body temperature. What does this show, and why?",
    options: [
      ["Ovulation has already occurred, because progesterone from the corpus luteum raises body temperature", "Correct: the rise follows ovulation."],
      ["Ovulation will occur in about a week, because oestrogen raises body temperature", "The rise comes after ovulation and is caused by progesterone."],
      ["She is pregnant, because hCG raises body temperature", "A single rise in the cycle shows ovulation, not pregnancy."],
      ["Menstruation has started, because FSH raises body temperature", "Temperature falls back around menstruation."],
    ],
    answer: "A",
    explanation: "The temperature rise is caused by **progesterone** from the corpus luteum, so it shows ovulation has **already** happened; it cannot warn in advance.",
    hints: ["Which hormone rises after ovulation?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which drug used in medical abortion blocks progesterone receptors?",
    options: [
      ["Mifepristone", "Correct: an anti-progesterone; the endometrium is no longer maintained."],
      ["Misoprostol", "Misoprostol is a prostaglandin that causes contractions."],
      ["hCG", "hCG maintains the corpus luteum and pregnancy."],
      ["FSH", "FSH stimulates follicles."],
    ],
    answer: "A",
    explanation: "**Mifepristone** blocks progesterone receptors; misoprostol then makes the uterus contract.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a vasectomy, testosterone production by the testes continues.",
    answer: true,
    explanation: "True. The interstitial cells are unaffected; only the passage of sperm is blocked.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The progestogen-only pill works mainly by making cervical mucus thick so that sperm cannot pass through.",
    answer: true,
    explanation: "True. Some types also prevent ovulation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with the step it mainly prevents.",
    pairs: [
      ["Combined pill", "Ovulation"],
      ["Condom", "Sperm entering the vagina"],
      ["Tubal ligation", "Eggs and sperm meeting in the oviduct"],
      ["Copper IUD", "Fertilisation and implantation in the uterus"],
    ],
    explanation: "Methods act at different stages between ovulation and implantation.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In IVF, an injection of {{blank:a}} triggers final maturation of the oocytes, which are collected using a needle guided by {{blank:b}}. When sperm are few, a single sperm may be injected into each oocyte (ICSI). After transfer the woman is given {{blank:c}} to maintain the endometrium.",
    blanks: [
      { id: "a", accepted: ["hCG"], choices: ["hCG", "insulin", "testosterone"] },
      { id: "b", accepted: ["ultrasound"], choices: ["ultrasound", "X-rays", "an electron microscope"] },
      { id: "c", accepted: ["progesterone"], choices: ["progesterone", "FSH", "oxytocin"] },
    ],
    explanation: "hCG trigger, ultrasound-guided collection, progesterone support.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the full name of the IVF technique abbreviated as ICSI.",
    accepted: ["intracytoplasmic sperm injection", "intra-cytoplasmic sperm injection"],
    wrong: ["in vitro fertilisation"],
    explanation: "**Intracytoplasmic sperm injection**: one sperm is injected directly into the oocyte.",
  });

  const n = 320, preg = 24;
  const rate = (preg / n) * 100;
  chk(rate, 7.5);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "In a hypothetical study, 320 women used a contraceptive method for one year and 24 became pregnant. Calculate the number of pregnancies per 100 women per year.",
    value: rate,
    wrong: [preg, Number((n / preg).toFixed(1))],
    explanation: t`$\dfrac{24}{320} \times 100 = ${rate}$ pregnancies per 100 women per year.`,
  });

  const eggs = 15, fert = 11, emb = 7;
  const fr = (fert / eggs) * 100;
  const er = (emb / fert) * 100;
  chk(Number(fr.toFixed(1)), 73.3);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "In one IVF cycle, 15 oocytes were collected, 11 were fertilised, and 7 developed into embryos suitable for transfer. Calculate the percentage of collected oocytes that were fertilised. Give your answer to three significant figures.",
    value: fr, sf: 3, unit: "%",
    wrong: [Number(er.toFixed(1)), Number((emb / eggs * 100).toFixed(1))],
    explanation: t`1. Fertilisation rate $= \dfrac{11}{15} \times 100 = ${dpStr(fr, 2)}\% \approx ${dpStr(fr, 1)}\%$.
2. Do not divide the embryos by the fertilised oocytes (${dpStr(er, 1)}%) or by all oocytes (${dpStr(emb / eggs * 100, 1)}%); those answer different questions.
3. Not every oocyte is mature or fertilised, which is why ovarian stimulation aims for several.`,
    hints: ["Fertilised ÷ collected × 100."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the combined oral contraceptive pill prevents pregnancy.",
    points: [
      "Contains synthetic oestrogen and progestogen taken daily",
      "These inhibit secretion of FSH and LH (from the anterior pituitary) by negative feedback",
      "Low FSH: follicles do not mature; no LH surge, so no ovulation",
      "Progestogen also thickens cervical mucus (sperm cannot pass) / keeps the endometrium thin",
    ],
    modelAnswer: "The pill contains synthetic oestrogen and progestogen. Taken daily, they keep hormone levels high enough to inhibit FSH and LH secretion by negative feedback, so follicles do not mature and there is no LH surge, so no ovulation. The progestogen also thickens cervical mucus, blocking sperm, and keeps the endometrium thin.",
    explanation: "Negative feedback → no ovulation, plus mucus and endometrium effects.",
    hints: ["Which pituitary hormones are inhibited?"],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Outline the main stages of in vitro fertilisation (IVF).",
    points: [
      "FSH injections stimulate several follicles to mature (after suppressing the woman's own cycle)",
      "hCG injection triggers final maturation; oocytes collected from follicles with a needle guided by ultrasound",
      "Sperm washed / selected and mixed with oocytes in culture medium, or ICSI",
      "Zygotes cultured for 2-5 days and checked as they divide",
      "One or two embryos transferred to the uterus through the cervix; progesterone given; pregnancy test later",
    ],
    modelAnswer: "The woman is given FSH injections so that several follicles mature, then an hCG injection for final maturation. Oocytes are collected from the follicles with a fine needle guided by ultrasound. Prepared sperm are mixed with the oocytes in culture medium, or one sperm is injected into each oocyte (ICSI). The zygotes are cultured for two to five days, and one or two embryos are transferred into the uterus through the cervix. Progesterone supports the endometrium, and a pregnancy test is done about two weeks later.",
    explanation: "Stimulate → trigger → collect → fertilise → culture → transfer.",
    hints: ["Name the hormone used at each stage."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the ethical issues raised by IVF.",
    points: [
      "In favour: relieves the distress of infertility / allows couples to have biologically related children",
      "Concern: spare embryos are frozen, donated or discarded; some groups regard embryos as having full moral status",
      "Concern: health risks (ovarian stimulation, multiple pregnancy) and cost / unequal access",
      "Some religious groups object to fertilisation outside the body or to donor gametes; others accept it, so views differ",
    ],
    modelAnswer: "IVF allows many infertile couples to have children, relieving considerable distress. However, more embryos are usually produced than are transferred, and spare embryos are frozen, donated or discarded, which is unacceptable to groups who regard embryos as having full moral status from fertilisation. There are health risks from ovarian stimulation and multiple pregnancies, and the high cost means only some people can afford it. Some religious groups object to fertilisation outside the body or to donor eggs or sperm, while others accept IVF for married couples.",
    explanation: "Balanced: benefits and concerns, attributed to groups.",
    hints: ["Consider embryos, health, cost and religious views."],
  });

  const rows = [["Implant", 600, 1], ["Daily pill", 800, 56], ["Male condom", 500, 65], ["Fertility awareness", 300, 51]];
  const rates = rows.map(([, n2, p]) => (p / n2) * 100);
  chk(rates[1], 7);
  chk(rates[2], 13);
  chk(rates[3], 17);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A hypothetical study followed women and couples using four methods for one year (typical use).\n\n${table(["Method", "Number followed", "Pregnancies"], rows.map((r) => r.map(String)))}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the pregnancies per 100 users per year for the implant. Give your answer to two decimal places.",
        value: rates[0], dp: 2, wrong: [1],
        explanation: t`$\dfrac{1}{600} \times 100 = ${dpStr(rates[0], 3)} \approx ${dpStr(rates[0], 2)}$ per 100 per year.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "The values for the other methods are 7, 13 and 17 per 100 users per year. Explain why the implant is the most effective in typical use.",
        points: ["Releases progestogen continuously for years, preventing ovulation (and thickening mucus)", "Does not depend on the user remembering or using it correctly each time"],
        modelAnswer: "The implant releases progestogen continuously, so ovulation is prevented all the time, and it needs no action from the user, so there are no missed doses or incorrect use.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why a health worker might still recommend condoms to a couple who use an implant.",
        points: ["The implant gives no protection against HIV / sexually transmitted infections", "Condoms are a barrier to body fluids, so they reduce the risk of infection"],
        modelAnswer: "An implant does not prevent HIV or other sexually transmitted infections; condoms act as a barrier to body fluids and reduce that risk.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons why the comparison between methods may not be entirely fair.",
        points: ["Groups differ in size / age / fertility / frequency of intercourse", "Users chose their own method, so groups are not randomised; or pregnancies may be under-reported"],
        modelAnswer: "The groups were different sizes and may differ in age, fertility and how often they had intercourse, and because people chose their own methods the groups were not randomly allocated.",
      }),
    ],
    explanation: "Long-acting methods are most effective in typical use; condoms also prevent infections.",
    hints: ["Divide pregnancies by number of users, then × 100."],
  });

  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A school debating club in Gweru discusses the statement: \"Young people should be taught how every method of contraception works.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give four biological or health arguments that supporters of the statement might use.",
        points: [
          "Pregnancy in very young mothers carries higher health risks / can interrupt education, so preventing it protects health",
          "Accurate knowledge reduces unplanned pregnancies (and unsafe abortions)",
          "Knowing that condoms protect against HIV / STIs reduces infection",
          "Understanding how methods work helps people use them correctly and dispels myths (e.g. about infertility from methods)",
        ],
        modelAnswer: "Pregnancy at a very young age carries extra health risks and can end a girl's education. Accurate teaching reduces unplanned pregnancies and the risks of unsafe abortion; it explains that only condoms protect against HIV and other infections; and understanding how methods work helps people use them correctly and replaces myths with facts.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Give three views that people who disagree, or who want limits, might hold.",
        points: [
          "Some religious groups teach that artificial contraception is wrong / only natural methods are acceptable",
          "Some parents believe such teaching is the family's role, or that it should be linked to teaching about abstinence / values",
          "Some worry it could encourage earlier sexual activity (a view others dispute)",
        ],
        modelAnswer: "Some religious groups teach that artificial contraception is morally wrong and accept only natural methods; some parents feel this is the family's responsibility, or want it taught alongside abstinence and values; and some people worry that it may encourage earlier sexual activity, although others dispute this.",
      }),
      P.tf({
        label: "(c)", stem: "True or false: a balanced answer to an ethics question attributes views to groups and gives reasons for each.",
        answer: true,
        explanation: "True. Present each view with its reasoning; avoid stating personal opinion as fact.",
      }),
    ],
    explanation: "Present arguments on both sides, attributed to groups, with reasons.",
    hints: ["Give each side its strongest reasons."],
  });

  b.card("DEFINITION", "Contraception", "Deliberate prevention of pregnancy by preventing ovulation, fertilisation or implantation.");
  b.card("CONCEPT", "How does the combined pill work?", "Synthetic oestrogen and progestogen inhibit FSH and LH: no follicle maturation, no LH surge, no ovulation; thick mucus.");
  b.card("FACT", "How does a copper IUD work?", "Copper ions are toxic to sperm and eggs; the endometrium is unsuitable for implantation.");
  b.card("FACT", "Sterilisation methods", "Vasectomy: sperm ducts cut and tied. Tubal ligation: oviducts cut, tied or blocked.");
  b.card("FACT", "Which methods are most effective in typical use?", "Implants, IUDs, injections and sterilisation: they do not depend on daily action.");
  b.card("CONCEPT", "Why use condoms with other methods?", "Only condoms reduce transmission of HIV and other STIs.");
  b.card("FACT", "Stages of IVF", "FSH stimulation → hCG trigger → ultrasound-guided egg collection → fertilisation or ICSI → culture → embryo transfer → progesterone.");
  b.card("FACT", "Medical abortion drugs", "Mifepristone (blocks progesterone receptors) then misoprostol (prostaglandin; uterine contractions).");
  b.card("CONCEPT", "Main ethical issue with spare IVF embryos", "Views differ on their moral status; they may be frozen, donated or discarded.");
});
