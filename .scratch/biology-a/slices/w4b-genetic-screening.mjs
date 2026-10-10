// W4b: genetic screening and genetic counselling (both boards; ZIMSEC Form 6, Cambridge A Level only).
import { concept, P, t, chk, table, dpStr } from "../lib.mjs";

concept("abio.genetech.genetic-screening", { file: "genetech/genetic-screening", keyPrefix: "genetech.genetic-screening" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which inherited condition is caused by a dominant allele and usually shows its first symptoms in middle age?",
    options: [
      ["Huntington's disease", "Correct."],
      ["Cystic fibrosis", "Cystic fibrosis is recessive and shows from early childhood."],
      ["Sickle cell anaemia", "Sickle cell anaemia is recessive (codominant at protein level) and appears in childhood."],
      ["Duchenne muscular dystrophy", "This is X-linked recessive and appears in early childhood."],
    ],
    answer: "A",
    explanation: "**Huntington's disease**: dominant, late onset, no cure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is pre-implantation genetic diagnosis?",
    options: [
      ["Testing cells from IVF embryos before implanting them", "Correct."],
      ["Testing amniotic fluid taken from a pregnant woman at 15 weeks", "That is amniocentesis."],
      ["Testing a sample of the placenta at about 11 weeks", "That is chorionic villus sampling."],
      ["Testing a newborn baby's blood from a heel prick", "That is newborn screening."],
    ],
    answer: "A",
    explanation: "PGD tests one or a few cells from each IVF embryo; only unaffected embryos are transferred.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the normal function of the proteins coded by *BRCA1* and *BRCA2*?",
    options: [
      ["Repairing damaged DNA as tumour suppressors", "Correct."],
      ["Transporting chloride ions out of epithelial cells", "That is CFTR (cystic fibrosis)."],
      ["Carrying oxygen in red blood cells", "That is haemoglobin."],
      ["Stimulating cell division as oncogenes", "BRCA genes suppress, not drive, tumour formation."],
    ],
    answer: "A",
    explanation: "BRCA proteins help repair DNA; faulty alleles allow mutations to accumulate, raising cancer risk.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which method of prenatal testing can be carried out earliest in pregnancy?",
    options: [
      ["Chorionic villus sampling", "Correct: at about 10-13 weeks."],
      ["Amniocentesis", "Usually from about 15 weeks."],
      ["Newborn heel-prick testing", "This is after birth."],
      ["Adult carrier testing", "This is not prenatal testing."],
    ],
    answer: "A",
    explanation: "CVS samples placental tissue at about 10-13 weeks; amniocentesis is later.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two parents are both carriers of cystic fibrosis. Their first child has cystic fibrosis. What is the probability that their second child will have it?",
    options: [
      ["1/4", "Correct: each child is independent."],
      ["1/2", "1/2 is the chance of a carrier child."],
      ["0", "The previous child does not affect this probability."],
      ["3/4", "3/4 is the chance of an unaffected child."],
    ],
    answer: "A",
    explanation: "Each pregnancy is independent: $Ff$ × $Ff$ gives $ff$ with probability 1/4 every time.",
    hints: ["Does the first child change the gametes?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is genetic counselling important before a test for Huntington's disease?",
    options: [
      ["A positive result means a future incurable disease", "Correct."],
      ["The test cannot detect the allele until symptoms have begun", "The test can be done at any age."],
      ["Huntington's disease can be cured if counselling starts early", "There is currently no cure."],
      ["The allele is recessive, so carriers need to be told", "The allele is dominant."],
    ],
    answer: "A",
    explanation: "Counselling helps people decide whether to test and supports them through the consequences.",
    hints: ["Is there a treatment?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A woman tests positive for a high-risk *BRCA1* allele. Which statement is most accurate?",
    options: [
      ["Her risk is raised, but she may never develop cancer", "Correct: a risk, not a certainty."],
      ["She will certainly develop breast cancer within ten years", "Not every carrier develops cancer."],
      ["She already has breast cancer, which the test has detected", "The test detects an allele, not a tumour."],
      ["Her children cannot inherit the allele, because it is somatic", "An inherited allele is in the germ line and can be passed on."],
    ],
    answer: "A",
    explanation: "BRCA alleles raise risk; monitoring and preventive options are offered, but cancer is not certain.",
    hints: ["Does the allele cause cancer directly?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two parents without cystic fibrosis have a child with the condition. What is the probability that an unaffected brother of this child is a carrier?",
    options: [
      ["2/3", "Correct: two of three unaffected outcomes are Ff."],
      ["1/2", "1/2 is the probability for any child, affected or not."],
      ["1/4", "1/4 is the probability of an affected child."],
      ["3/4", "3/4 is the probability of an unaffected child."],
    ],
    answer: "A",
    explanation: "Parents are $Ff$ × $Ff$. Among unaffected outcomes (FF, Ff, Ff), two of three are carriers: 2/3.",
    hints: ["Remove the affected outcome first."],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Amniocentesis samples amniotic fluid, which contains cells from the fetus.",
    answer: true,
    explanation: "True. The fetal cells are tested.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A genetic counsellor decides for a couple whether they should have children.",
    answer: false,
    explanation: "False. Counsellors explain results, risks and options and give support; the decision belongs to the couple.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each condition with its pattern of inheritance or cause.",
    pairs: [
      ["Huntington's disease", "Dominant allele with an expanded CAG repeat"],
      ["Cystic fibrosis", "Recessive alleles of the chloride channel gene"],
      ["Sickle cell anaemia", "Allele of the β-globin gene"],
      ["Inherited breast cancer risk", "Mutant alleles of a DNA-repair gene"],
    ],
    explanation: "HTT, CFTR, β-globin, BRCA1/2.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In chorionic villus sampling, a small sample of the {{blank:a}} is removed at about {{blank:b}} weeks of pregnancy. The cells are genetically identical to those of the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["placenta"], choices: ["placenta", "amniotic fluid", "umbilical cord"] },
      { id: "b", accepted: ["10-13"], choices: ["10-13", "15-20", "30-35"] },
      { id: "c", accepted: ["fetus"], choices: ["fetus", "mother", "father"] },
    ],
    explanation: "CVS samples chorionic villi (placenta) at about 10-13 weeks; they are fetal tissue.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a person who is heterozygous for a recessive allele and does not show the condition.",
    accepted: ["carrier", "a carrier"],
    wrong: ["mutant"],
    explanation: "A **carrier**.",
  });

  // Numerical and calculation: probabilities (new scenarios)
  const pThreeUnaff = (3 / 4) ** 3 * 100;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Both parents are carriers of sickle cell anaemia ($Hb^A Hb^S$). Calculate the percentage probability that all three of their children are unaffected (not $Hb^S Hb^S$). Give your answer to one decimal place.",
    value: pThreeUnaff, dp: 1, unit: "%", wrong: [75, 25],
    explanation: t`$P(\text{unaffected}) = \dfrac{3}{4}$ for each child; $\left(\dfrac{3}{4}\right)^3 \times 100 = ${dpStr(pThreeUnaff, 1)}\%$. 75% is the probability for one child only.`,
    hints: ["Multiply the probabilities for independent children."],
  });
  const pGirlAff = (1 / 2) * (1 / 4) * 100;
  chk(pGirlAff, 12.5);
  calc({
    d: 3, skill: "APPLICATION",
    stem: "Two carriers of cystic fibrosis plan a child. Calculate the percentage probability that their child will be a girl with cystic fibrosis.",
    value: pGirlAff, dp: 1, unit: "%", wrong: [25, 50],
    explanation: t`1. $P(\text{girl}) = \dfrac{1}{2}$.
2. $P(ff) = \dfrac{1}{4}$, independent of sex (the gene is on an autosome).
3. $P(\text{girl with CF}) = \dfrac{1}{2} \times \dfrac{1}{4} = \dfrac{1}{8} = 12.5\%$.`,
    hints: ["Two independent events: sex and genotype."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how pre-implantation genetic diagnosis is used to help a couple who are both carriers of cystic fibrosis to have an unaffected child.",
    points: [
      "Eggs fertilised by IVF to produce several embryos",
      "One or a few cells removed from each embryo after a few days (embryo still develops normally)",
      "DNA amplified by PCR and tested for the CF alleles",
      "Only embryos without two CF alleles (FF or Ff) are implanted in the uterus",
    ],
    modelAnswer: "The woman's eggs are fertilised by IVF, producing several embryos. After a few days one or a few cells are removed from each embryo, which continues to develop normally. Their DNA is amplified by PCR and tested for the cystic fibrosis allele. Only embryos that are not homozygous for it are placed in the uterus.",
    explanation: "IVF, biopsy, PCR test, select.",
    hints: ["Which reproductive technique is needed first?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the roles of a genetic counsellor.",
    points: [
      "Explains what a test result means, in terms of risk / probability",
      "Explains implications for relatives who may share the allele",
      "Describes options (monitoring, treatment, PGD, prenatal testing, adoption) without directing the decision",
      "Provides emotional support before and after testing",
    ],
    modelAnswer: "A genetic counsellor explains what a test result means, usually as a risk or probability, and what it implies for relatives who may carry the same allele. They set out the options available, such as monitoring, treatment, PGD, prenatal testing or adoption, without telling people what to choose, and give emotional support before and after testing.",
    explanation: "Inform, explain, set out options, support.",
    hints: ["Think before, during and after a test."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Discuss the social and ethical issues raised by genetic screening of embryos and fetuses.",
    points: [
      "For: allows couples at risk to have children without a serious genetic condition / informed choices",
      "For: reduces suffering and prepares families / allows early treatment",
      "Against: may lead to destruction of embryos or termination of pregnancy, which some religious groups and others oppose",
      "Against: concern about extending to non-medical traits (designer babies) / devaluing people with disabilities",
      "Other: prenatal tests carry a small miscarriage risk; cost and unequal access; privacy of genetic information",
    ],
    modelAnswer: "Screening embryos and fetuses lets couples at high risk have children without serious genetic conditions and make informed choices, and can prepare families or allow early treatment. However, it can lead to the destruction of embryos or termination of pregnancy, which some religious groups and others consider wrong. Some people fear it could extend to selecting non-medical traits, and that it may send a negative message about people living with disabilities. Prenatal tests carry a small risk of miscarriage, tests may be available only to those who can pay, and genetic information must be kept private.",
    explanation: "Balanced points, attributed to groups.",
    hints: ["Give both sides."],
  });

  // Practice structured: pedigree for sickle cell
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "Rudo and Sipho are planning to marry. Both are healthy, but Rudo's brother has sickle cell anaemia, and a screening test shows that Sipho is a carrier ($Hb^A Hb^S$). Rudo's parents are both healthy.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What are the genotypes of Rudo's parents?",
        options: [
          ["Both $Hb^A Hb^S$", "Correct: healthy parents of an affected child must both be carriers."],
          ["Both $Hb^A Hb^A$", "They could not then have an affected son."],
          ["One $Hb^S Hb^S$ and one $Hb^A Hb^A$", "Both parents are healthy, so neither is $Hb^S Hb^S$."],
          ["Both $Hb^S Hb^S$", "Both would have the condition."],
        ],
        answer: "A",
        explanation: "Healthy parents with an $Hb^S Hb^S$ son are both carriers.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Before any test, what is the probability, as a fraction in decimal form to two decimal places, that Rudo is a carrier?",
        value: 2 / 3, dp: 2, wrong: [0.5],
        explanation: "Rudo is healthy, so she is $Hb^A Hb^A$ or $Hb^A Hb^S$; 2 of the 3 unaffected outcomes are carriers: 2/3 = 0.67.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "If Rudo is a carrier, calculate the probability that a child of Rudo and Sipho has sickle cell anaemia. Give it as a decimal.",
        value: 0.25, dp: 2, wrong: [0.5],
        explanation: "$Hb^A Hb^S$ × $Hb^A Hb^S$: probability of $Hb^S Hb^S$ = 1/4 = 0.25.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two pieces of information a genetic counsellor would give the couple.",
        points: ["Risk for each pregnancy (1/4 if both carriers; testing Rudo would clarify) / each child independent", "Options: test Rudo; prenatal testing (CVS / amniocentesis) or PGD; early treatment is available; decision is theirs"],
        modelAnswer: "The counsellor would explain that if Rudo is a carrier, each child has a 1 in 4 chance of sickle cell anaemia, independently for every pregnancy, and that a test can show whether she is a carrier. They would describe the options, such as prenatal testing or PGD, and the treatments available, leaving the decision to the couple.",
      }),
    ],
    explanation: "Deduce genotypes, then calculate risks; counselling informs choices.",
    hints: ["Healthy parents of an affected child must both carry the allele."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Screening can be carried out on adults, embryos and fetuses.",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe how amniocentesis is carried out and how the sample is tested.",
        points: ["From about 15 weeks, a needle guided by ultrasound is inserted through the abdomen into the amniotic sac", "A small volume of amniotic fluid containing fetal cells is removed", "Cells are cultured / DNA amplified by PCR and tested for alleles or chromosome abnormalities"],
        modelAnswer: "From about 15 weeks, a fine needle guided by ultrasound is passed through the mother's abdomen into the amniotic sac and a small volume of amniotic fluid, containing cells shed by the fetus, is withdrawn. The cells are cultured, or their DNA amplified by PCR, and tested for the alleles or chromosome abnormality in question.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Compare amniocentesis with chorionic villus sampling.",
        points: ["CVS earlier (about 10-13 weeks) than amniocentesis (about 15 weeks or later)", "CVS samples placental tissue rather than amniotic fluid / CVS has a slightly higher miscarriage risk; both carry a small risk"],
        modelAnswer: "CVS can be done earlier, at about 10-13 weeks, compared with about 15 weeks for amniocentesis. CVS samples placental tissue while amniocentesis samples amniotic fluid, and CVS carries a slightly higher risk of miscarriage, although both risks are small.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Suggest one advantage of screening newborn babies for cystic fibrosis.",
        points: ["Early diagnosis allows treatment (physiotherapy, antibiotics, enzymes) to start early, improving health"],
        modelAnswer: "Early diagnosis means treatment such as physiotherapy, antibiotics and digestive enzymes can start before damage builds up.",
      }),
    ],
    explanation: "Methods of prenatal testing and newborn screening.",
    hints: ["When, what sample, how tested."],
  });

  b.card("DEFINITION", "Define **genetic screening**.", "Testing DNA for alleles that cause or raise the risk of genetic conditions.");
  b.card("DEFINITION", "Define **genetic counselling**.", "Professional advice and support explaining test results, risks, implications for relatives and options.");
  b.card("CONCEPT", "Amniocentesis versus CVS", "Amniocentesis: fluid, from about 15 weeks. CVS: placental villi, about 10-13 weeks. Both: small miscarriage risk.");
  b.card("DEFINITION", "Define **pre-implantation genetic diagnosis**.", "Testing cells from IVF embryos so that only unaffected embryos are implanted.");
  b.card("FACT", "BRCA1 and BRCA2", "Tumour suppressor (DNA repair) genes; mutant alleles raise breast and ovarian cancer risk.");
  b.card("FACT", "Huntington's disease", "Dominant allele (expanded CAG repeat), late onset, no cure; child of a heterozygote has a 1/2 chance.");
  b.card("FACT", "Cystic fibrosis", "Recessive alleles of CFTR (chloride channel); carrier and newborn screening, PGD.");
  b.card("CONCEPT", "Carrier probability for an unaffected sibling", "If both parents are carriers, an unaffected child has a 2/3 chance of being a carrier.");
  b.card("CONCEPT", "Ethical issues of screening", "Anxiety, embryo destruction or termination, designer babies, privacy and discrimination, cost and access.");
});
