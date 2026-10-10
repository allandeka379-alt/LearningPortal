// W4b: gene therapy (both boards; ZIMSEC Form 6, Cambridge A Level only).
import { concept, P, t, chk, table, dpStr, pctChange } from "../lib.mjs";

concept("abio.genetech.gene-therapy", { file: "genetech/gene-therapy", keyPrefix: "genetech.gene-therapy" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the aim of gene therapy?",
    options: [
      ["To add a working allele to a patient's cells", "Correct."],
      ["To remove every faulty allele from the body", "The faulty allele usually remains."],
      ["To replace a patient's blood with donor blood", "That is a transfusion."],
      ["To produce a hormone in bacteria for later injection", "That is recombinant protein production."],
    ],
    answer: "A",
    explanation: "Gene therapy inserts a working allele so that the cells make the functional protein.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement describes somatic gene therapy?",
    options: [
      ["Body cells are modified, so the change is not inherited", "Correct."],
      ["Gametes are modified, so all descendants carry the change", "That is germ-line therapy."],
      ["An embryo's cells are modified at the eight-cell stage", "That would be germ-line therapy."],
      ["A protein is injected instead of a gene", "That is enzyme or protein replacement."],
    ],
    answer: "A",
    explanation: "Somatic therapy affects only the treated person's body cells.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which vector inserts the therapeutic gene into the host cell's chromosomes?",
    options: [
      ["A retrovirus", "Correct: reverse transcriptase makes DNA, which integrates."],
      ["A liposome", "Liposomes deliver DNA without integrating it."],
      ["An adenovirus", "Adenoviruses mostly do not integrate."],
      ["A bacterial plasmid", "Plasmids are not used to integrate genes in human therapy."],
    ],
    answer: "A",
    explanation: "Retroviral (and lentiviral) vectors integrate DNA into host chromosomes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are liposomes sometimes chosen as vectors instead of viruses?",
    options: [
      ["They are less likely to trigger an immune response", "Correct."],
      ["They insert the gene into chromosomes more reliably", "Liposomes do not integrate DNA."],
      ["They deliver DNA into far more cells than viruses do", "Liposomes are usually less efficient."],
      ["They make the effect permanent and inherited", "Somatic changes are not inherited."],
    ],
    answer: "A",
    explanation: "Liposomes contain no viral proteins, so they provoke less immune response, but they are less efficient.",
    hints: ["What does the immune system recognise on a virus?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is the retina a good target for gene therapy of an inherited eye disease?",
    options: [
      ["It is small, easy to inject and shielded from immunity", "Correct."],
      ["Its cells divide rapidly, so the gene spreads to the whole body", "Retinal cells do not divide."],
      ["Its cells have no DNA, so the new allele faces no competition", "Retinal cells have nuclei with DNA."],
      ["It can be removed, treated and replaced in the eye", "The vector is injected in vivo."],
    ],
    answer: "A",
    explanation: "A small, accessible, immune-privileged tissue of non-dividing cells keeps expressing the gene.",
    hints: ["Think about access, size and immunity."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is gene therapy more straightforward for recessive conditions than for dominant ones?",
    options: [
      ["One added working allele can supply the missing protein", "Correct."],
      ["Recessive alleles are removed automatically when a new allele is added", "The faulty allele stays."],
      ["Dominant alleles cannot be transcribed in somatic cells", "Dominant alleles are expressed."],
      ["Recessive conditions affect only the gametes", "They affect body cells."],
    ],
    answer: "A",
    explanation: "In a recessive condition, the problem is a missing functional protein; adding a working allele supplies it. A dominant allele's harmful product would still be made.",
    hints: ["What would the dominant faulty allele still do?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a gene therapy trial, some patients developed leukaemia several years later. Which explanation is most likely?",
    options: [
      ["The vector inserted beside and activated a cell-division gene", "Correct: insertional activation of an oncogene."],
      ["The new allele was not expressed, so the original disease returned", "This would not cause leukaemia."],
      ["The liposomes fused with each other inside the bone marrow", "Not a cause of leukaemia."],
      ["The patients' immune systems destroyed all the treated cells", "This would end the treatment, not cause cancer."],
    ],
    answer: "A",
    explanation: "Random integration by retroviral vectors can switch on proto-oncogenes, leading to uncontrolled division.",
    hints: ["Which vectors integrate into chromosomes?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a reason commonly given for not permitting germ-line gene therapy in humans?",
    options: [
      ["Descendants cannot consent to the change", "Correct."],
      ["It cannot affect any cell of the resulting child", "It would affect every cell."],
      ["Its effects would be too short-lived to matter", "Germ-line changes would be permanent."],
      ["It only works for dominant conditions", "This is not the reason given."],
    ],
    answer: "A",
    explanation: "Changes would pass to all descendants, who cannot consent; errors would also be inherited, and enhancement is a concern.",
    hints: ["Who else would carry the change?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A person treated by somatic gene therapy cannot pass the faulty allele to their children.",
    answer: false,
    explanation: "False. Their gametes are unchanged, so they can still pass on the faulty allele.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Viruses used as vectors in gene therapy are modified so that they cannot replicate and cause disease.",
    answer: true,
    explanation: "True. Genes for replication and disease are removed.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each problem of gene therapy with its cause.",
    pairs: [
      ["Short-lived effect", "Treated cells die and are replaced by untreated ones"],
      ["Immune response", "The body recognises viral vector proteins as foreign"],
      ["Risk of cancer", "Vector inserts beside a gene that controls cell division"],
      ["Low efficiency", "Too few target cells take up the vector"],
    ],
    explanation: "Each problem has a biological cause.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In ADA-deficient SCID, toxic products kill developing {{blank:a}}. In gene therapy, the patient's bone marrow {{blank:b}} cells are removed, given the normal allele and returned, which is an {{blank:c}} method.",
    blanks: [
      { id: "a", accepted: ["lymphocytes"], choices: ["lymphocytes", "erythrocytes", "neurones"] },
      { id: "b", accepted: ["stem"], choices: ["stem", "red", "epithelial"] },
      { id: "c", accepted: ["ex vivo"], choices: ["ex vivo", "in vivo", "in vitro fertilisation"] },
    ],
    explanation: "Lymphocytes; stem cells; ex vivo.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the enzyme whose deficiency causes one form of severe combined immunodeficiency (SCID).",
    accepted: ["adenosine deaminase", "ADA"],
    wrong: ["adenylate cyclase"],
    explanation: "**Adenosine deaminase (ADA)**.",
  });

  // Numerical: transfer efficiency (new data)
  const treated = 4.0e8, expr = 1.1e8;
  const pct = (expr / treated) * 100;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Of $4.0 \times 10^{8}$ stem cells treated with a lentiviral vector, $1.1 \times 10^{8}$ expressed the new allele. Calculate the percentage of cells expressing the allele.`,
    value: pct, unit: "%", wrong: [Math.round((treated / expr) * 1000) / 10],
    explanation: t`$\dfrac{1.1 \times 10^{8}}{4.0 \times 10^{8}} \times 100 = ${dpStr(pct, 1)}\%$. Dividing the wrong way round gives over 100%, which is impossible.`,
    hints: ["Divide the number expressing by the number treated."],
  });
  const before = 3, after = 18;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `After gene therapy for an inherited eye disease, a patient could detect a test light at ${after} positions on a screen, compared with ${before} positions before treatment. Calculate the percentage increase.`,
    value: pctChange(before, after), unit: "%", wrong: [Math.round((after / before) * 100)],
    explanation: t`1. Increase $= ${after} - ${before} = ${after - before}$.
2. Percentage increase $= \dfrac{${after - before}}{${before}} \times 100 = ${pctChange(before, after)}\%$.
3. ${Math.round((after / before) * 100)}% is the after value as a percentage of the before value, not the increase.`,
    hints: ["Divide the increase by the starting value."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline how gene therapy can be used to treat SCID caused by ADA deficiency.",
    points: [
      "Normal ADA allele inserted into a (harmless) retroviral / lentiviral vector",
      "Bone marrow stem cells removed from the patient",
      "Cells infected with the vector in the laboratory; allele integrates into their chromosomes",
      "Cells returned to the patient; they make ADA and produce lymphocytes that survive",
    ],
    modelAnswer: "The normal ADA allele is inserted into a harmless retroviral or lentiviral vector. Bone marrow stem cells are removed from the patient and infected with the vector in the laboratory, so that the allele becomes integrated into their chromosomes. The cells are returned to the patient, where they make adenosine deaminase and give rise to lymphocytes that survive, restoring immune function.",
    explanation: "Vector, ex vivo stem cells, return, expression.",
    hints: ["Which cells give rise to lymphocytes?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain four problems that have limited the success of gene therapy.",
    points: [
      "Effects short-lived: treated cells die / non-integrated DNA is lost, so treatment must be repeated",
      "Immune response against the viral vector or the new protein destroys treated cells / reduces repeat doses",
      "Integrating vectors insert randomly and may activate an oncogene, causing cancer",
      "Difficult to deliver to enough target cells / expensive",
    ],
    modelAnswer: "Effects are often short-lived, because treated cells die and are replaced, or the added DNA is lost when cells divide, so treatment must be repeated. The immune system may recognise the viral vector or the new protein as foreign and destroy treated cells. Retroviral vectors insert at random and may activate an oncogene, causing cancer. It is also hard to deliver the gene to enough target cells.",
    explanation: "One mark for each problem explained.",
    hints: ["Duration, immunity, insertion, delivery."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss whether germ-line gene therapy should be permitted in humans.",
    points: [
      "For: could permanently remove a serious inherited disease from a family / all cells corrected",
      "Against: future generations cannot consent; errors or side effects would be inherited",
      "Against: long-term effects unknown / could lead to enhancement (designer babies)",
      "Views differ: some religious groups oppose altering the germ line; most countries currently do not allow it; a reasoned conclusion",
    ],
    modelAnswer: "Supporters argue that germ-line therapy could remove a serious inherited condition permanently, since every cell of the child would carry the working allele and it would not be passed on. Opponents point out that future generations cannot consent, that any error would be inherited, that long-term effects are unknown, and that it could lead to enhancement of normal traits. Some religious groups oppose altering the human germ line. Because of these risks, most countries do not permit it at present.",
    explanation: "Balanced discussion with a conclusion.",
    hints: ["Think about consent and inheritance."],
  });

  // Practice structured
  const mo = [0, 3, 6, 9, 12, 15];
  const tc = [80, 410, 820, 1150, 1240, 1260];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `A child with ADA-deficient SCID received bone marrow stem cells modified with a lentiviral vector carrying the *ADA* allele. T lymphocyte counts (cells per mm³ of blood) were measured.\n\n${table(["Months after treatment", ...mo.map(String)], [["T lymphocytes / cells per mm³", ...tc.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in T lymphocyte count between month 0 and month 12, to the nearest whole number.",
        value: pctChange(tc[0], tc[4]), dp: 0, unit: "%", wrong: [Math.round((tc[4] / tc[0]) * 100)],
        explanation: `(${tc[4]} − ${tc[0]}) ÷ ${tc[0]} × 100 = ${dpStr(pctChange(tc[0], tc[4]), 0)}%.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the change in T lymphocyte count.",
        points: ["Rises steeply from 80 to 1150 cells per mm³ in the first 9 months", "Then levels off at about 1240-1260 cells per mm³"],
        modelAnswer: "The count rises steeply from 80 to 1150 cells per mm³ over the first nine months, then levels off at about 1240-1260 cells per mm³.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the count stays high rather than falling back, as in early trials that treated mature T cells.",
        points: ["Stem cells divide repeatedly / are long-lived", "The integrated allele is copied into every daughter cell, so new lymphocytes keep being made with working ADA"],
        modelAnswer: "Stem cells keep dividing throughout life, and because the lentiviral vector integrated the allele into their chromosomes, it is copied into every daughter cell. New T lymphocytes with working ADA are therefore produced continuously.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two things doctors would monitor in this child over the following years.",
        points: ["Signs of leukaemia / abnormal expansion of one clone of cells (insertion risk)", "Immune function / infections / ADA activity / antibodies against the vector"],
        modelAnswer: "Doctors would watch for leukaemia or abnormal expansion of one cell clone, because the vector inserts into chromosomes, and they would monitor immune function, infections and ADA activity in the blood.",
      }),
    ],
    explanation: "Stem cell therapy gives lasting expression; monitor insertion risks.",
    hints: ["Which cells were modified?"],
    calculator: true,
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Two vectors are being considered for gene therapy of a lung disease caused by a recessive allele: an adenovirus and liposomes.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Give one advantage and one disadvantage of using the adenovirus.",
        points: ["Advantage: enters cells efficiently / delivers the gene into the nucleus without inserting into chromosomes (lower cancer risk)", "Disadvantage: may trigger an immune response / effect is temporary as lung cells are replaced"],
        modelAnswer: "The adenovirus enters cells efficiently and does not integrate into chromosomes, so the risk of activating an oncogene is low. However, it may trigger an immune response, and the effect is temporary as lung lining cells are replaced.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how liposomes deliver DNA into cells.",
        points: ["Liposomes are phospholipid bilayer spheres containing the DNA", "They fuse with the cell surface membrane (phospholipids), releasing DNA into the cell"],
        modelAnswer: "Liposomes are small spheres of phospholipid bilayer containing the DNA. They fuse with the phospholipid bilayer of the cell surface membrane, releasing the DNA into the cytoplasm.",
      }),
      P.mcq({
        label: "(c)", stem: "Why might treatment with either vector need to be repeated?",
        options: [
          ["Lining cells are replaced by cells lacking the allele", "Correct."],
          ["The allele is destroyed by the mucus in the lungs within minutes", "This is not the main reason."],
          ["The treated cells become germ cells", "Somatic cells do not become gametes."],
          ["The allele makes the faulty allele dominant", "Adding an allele does not change dominance in this way."],
        ],
        answer: "A",
        explanation: "Epithelial cells are short-lived; replacement cells come from untreated stem cells.",
      }),
    ],
    explanation: "Vectors differ in efficiency, immunity and integration.",
    hints: ["Do lung lining cells last for ever?"],
  });

  b.card("DEFINITION", "Define **gene therapy**.", "Treating a genetic disorder by inserting a functional allele into a patient's cells.");
  b.card("CONCEPT", "Somatic versus germ-line therapy", "Somatic: body cells, not inherited. Germ-line: gametes or early embryo, inherited by descendants.");
  b.card("FACT", "Three types of vector", "Retroviruses/lentiviruses (integrate), adenoviruses/AAV (mostly do not), liposomes (non-viral).");
  b.card("FACT", "Gene therapy for ADA-deficient SCID", "Bone marrow stem cells given the ADA allele by a retro/lentiviral vector ex vivo, then returned.");
  b.card("FACT", "Gene therapy for Leber congenital amaurosis", "AAV carrying the normal allele injected under the retina; non-dividing retinal cells keep expressing it.");
  b.card("CONCEPT", "Problems with gene therapy", "Short-lived effects, immune responses, insertion near oncogenes, poor delivery, high cost.");
  b.card("CONCEPT", "Why germ-line therapy is not permitted in most countries", "Inherited by future generations who cannot consent; errors inherited; unknown long-term effects; enhancement fears.");
  b.card("CONCEPT", "Why recessive conditions suit gene therapy", "Adding one working allele supplies the missing protein; a dominant faulty allele would still act.");
  b.card("DEFINITION", "Ex vivo versus in vivo", "Ex vivo: cells removed, treated, returned. In vivo: vector delivered directly into the body tissue.");
});
