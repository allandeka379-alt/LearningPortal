// W1b: uncontrolled cell division and cancer.
import { concept, P, t, chk, table, pctChange, rnd } from "../lib.mjs";

concept("abio.division.cancer", { file: "division/cancer", keyPrefix: "division.cancer" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is metastasis?",
    options: [
      ["The spread of cancer cells to form secondary tumours elsewhere in the body", "Correct: cells travel in blood or lymph from the primary tumour."],
      ["The slow growth of a benign tumour inside a capsule of fibrous connective tissue", "This describes a benign tumour, which does not spread."],
      ["The mutation of a proto-oncogene into an oncogene", "This is one of the early genetic changes, not the spread of cancer."],
      ["The destruction of cancer cells by radiotherapy", "Radiotherapy is a treatment, not the spread of cancer."],
    ],
    answer: "A",
    explanation: "**Metastasis** is the spread of cancer cells from the primary tumour, through blood or lymph, to form secondary tumours.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature distinguishes a malignant tumour from a benign tumour?",
    options: [
      ["It invades surrounding tissues and can spread to other organs", "Correct: invasion and metastasis define malignancy."],
      ["It is formed by repeated division of cells by mitosis", "Both benign and malignant tumours form by mitosis."],
      ["It is made of cells containing mutated DNA", "Both types arise from cells with mutations."],
      ["It forms a mass of abnormal cells that can press on and damage nearby organs", "Benign tumours also form masses that can press on organs."],
    ],
    answer: "A",
    explanation: "Both kinds arise by uncontrolled mitosis of mutated cells. Only malignant tumours **invade** and **metastasise**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the normal role of a tumour suppressor gene?",
    options: [
      ["It codes for a protein that stops the cell cycle when DNA is damaged", "Correct: such proteins pause division for repair or trigger apoptosis."],
      ["It codes for a growth factor receptor that stimulates division", "That describes a proto-oncogene."],
      ["It codes for telomerase so cells can divide indefinitely", "Telomerase activity is a feature of stem cells and many cancer cells, not the role of a suppressor gene."],
      ["It codes for a protein that helps cancer cells enter the blood", "Tumour suppressor genes protect against cancer; they do not aid spread."],
    ],
    answer: "A",
    explanation: "Tumour suppressor genes (such as the gene for p53) **slow or stop** the cycle when DNA is damaged and can trigger **apoptosis**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Aflatoxins, which can cause liver cancer, are produced by:",
    options: [
      ["a fungus growing on maize and groundnuts stored in damp conditions", "Correct: *Aspergillus flavus* produces aflatoxins on poorly stored grain and nuts."],
      ["bacteria that infect the liver after drinking water contaminated with sewage", "Aflatoxins are fungal products, not bacterial."],
      ["a virus that is transmitted by mosquitoes", "Aflatoxins are toxins, not viruses."],
      ["the tar in tobacco smoke", "Tar contains other carcinogens; aflatoxins come from fungi."],
    ],
    answer: "A",
    explanation: "Aflatoxins are made by the mould *Aspergillus flavus* on crops such as maize and groundnuts kept warm and damp. Proper drying and storage reduces the risk.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Many chemotherapy drugs cause hair loss and a fall in white blood cell count. What is the best explanation?",
    options: [
      ["They affect all rapidly dividing cells, including hair follicle and bone marrow cells", "Correct: the drugs target division, not cancer cells specifically."],
      ["They are carried in the blood only to the hair follicles and bone marrow", "Drugs reach all tissues; the effect depends on which cells divide."],
      ["They cause metastasis of the cancer to the skin and bone marrow", "The drugs do not cause cancer to spread."],
      ["They make the immune system attack hair follicles", "The cause is inhibition of cell division, not an immune attack."],
    ],
    answer: "A",
    explanation: "Chemotherapy drugs block DNA replication or mitosis. **Normal cells that divide often** (hair follicles, gut lining, bone marrow) are affected too.",
    hints: ["What do chemotherapy drugs target?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the risk of most cancers increase with age?",
    options: [
      ["Several mutations must accumulate in one cell line, which takes time", "Correct: older cells have had longer exposure and more divisions in which mutations can arise."],
      ["Older people's cells cannot carry out mitosis", "If cells could not divide, tumours could not form."],
      ["Telomeres become longer as people age", "Telomeres shorten with age in most cells."],
      ["Carcinogens only damage the DNA of cells in people over a certain age", "Carcinogens can damage DNA at any age."],
    ],
    answer: "A",
    explanation: "Cancer usually needs **several mutations** (in proto-oncogenes and tumour suppressor genes). They accumulate over many years of exposure and divisions.",
    hints: ["How many mutations are usually needed?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A person inherits one faulty copy of a tumour suppressor gene. Which statement best explains why they have a higher risk of developing a particular cancer?",
    options: [
      ["Only one further mutation in a cell is needed to lose the gene's function completely", "Correct: both copies must be inactivated; one is already faulty in every cell."],
      ["The faulty copy acts as an oncogene and stimulates division by itself", "Tumour suppressor genes lose function; one faulty copy alone usually still leaves a working copy."],
      ["The faulty gene makes all their cells divide continuously from birth", "One working copy normally remains, so cells are still controlled."],
      ["The faulty gene is a carcinogen that damages other genes", "A gene is not a carcinogen; carcinogens are external agents."],
    ],
    answer: "A",
    explanation: "Tumour suppressor genes usually need **both copies** inactivated. With one already faulty in every cell, a single further mutation in any cell can remove the brake.",
    hints: ["How many copies of a tumour suppressor gene must be lost?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is vaccination against human papillomavirus (HPV) given to girls before they are likely to be exposed to the virus?",
    options: [
      ["Vaccination prevents infection, which is the main cause of cervical cancer", "Correct: the vaccine works by preventing infection, so it must come before exposure."],
      ["The vaccine destroys any cervical cancer cells that have already formed in the body", "The vaccine prevents infection; it does not treat cancer."],
      ["HPV only infects children under a certain age", "The age is chosen to come before exposure, not because of the virus's host range."],
      ["The vaccine repairs mutations in tumour suppressor genes", "Vaccines stimulate immunity; they do not repair DNA."],
    ],
    answer: "A",
    explanation: "Persistent HPV infection is the main cause of cervical cancer. A vaccine gives immunity that **prevents infection**, so it is most effective before any exposure.",
    hints: ["Does a vaccine prevent or treat infection?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ultraviolet radiation in sunlight can cause mutations in the DNA of skin cells.",
    answer: true,
    explanation: "True. UV damages DNA in skin cells, which can lead to skin cancers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An oncogene is a tumour suppressor gene that has stopped working.",
    answer: false,
    explanation: "False. An oncogene is a **mutated proto-oncogene** that is permanently active, stimulating division. A tumour suppressor gene that stops working is a separate kind of change.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each carcinogen with the type of cancer it is most associated with.",
    pairs: [
      ["Tar in tobacco smoke", "Lung cancer"],
      ["Human papillomavirus (HPV)", "Cervical cancer"],
      ["Aflatoxins in mouldy groundnuts", "Liver cancer"],
      ["Ultraviolet radiation", "Skin cancer"],
    ],
    explanation: "Tobacco tar: lung (and mouth, throat, oesophagus); HPV: cervix; aflatoxins: liver; UV: skin.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "A mutated proto-oncogene, called an {{blank:a}}, stimulates cell division even without a signal. Mutations that inactivate {{blank:b}} genes remove the cell's ability to stop dividing or to undergo {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["oncogene"], choices: ["oncogene", "allele", "operon"] },
      { id: "b", accepted: ["tumour suppressor"], choices: ["tumour suppressor", "proto-oncogene", "housekeeping"] },
      { id: "c", accepted: ["apoptosis"], choices: ["apoptosis", "metastasis", "mitosis"] },
    ],
    explanation: "Oncogenes (gain of function) push division; loss of tumour suppressor genes removes the brake and apoptosis.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for programmed cell death, which is triggered when a cell's DNA is badly damaged.",
    accepted: ["apoptosis"],
    wrong: ["necrosis", "lysis"],
    explanation: "**Apoptosis** removes damaged cells in an orderly way; it is triggered by tumour suppressor proteins such as p53.",
  });

  // Numerical: doubling (different numbers from the lesson)
  const days = 60;
  const doublingTime = 4;
  const n = days / doublingTime;
  const cells = 2 ** n;
  chk(cells, 32768);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A single abnormal cell divides by mitosis every 4 days, and every daughter cell continues to divide. Assuming no cells die, how many cells will there be after 60 days?",
    value: cells,
    wrong: [2 * n, n],
    explanation: `60 ÷ 4 = ${n} divisions. Number of cells = 2^${n} = ${cells}. Multiplying 2 × ${n} = ${2 * n} treats growth as linear instead of doubling.`,
  });
  const g = [5, 10, 20, 40, 80];
  b.calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The volume of a tumour grown in a culture was measured every 6 days.\n\n${table(["Day", "0", "6", "12", "18", "24"], [["Volume / mm³", ...g.map(String)]])}\n\nCalculate the percentage increase in volume between day 6 and day 18.`,
    value: pctChange(g[1], g[3]), unit: "%",
    wrong: [rnd(pctChange(g[3], g[1]), 0), g[3] - g[1]],
    explanation: t`1. Increase $= 40 - 10 = 30\ \text{mm}^3$.
2. Percentage increase $= \dfrac{30}{10} \times 100 = ${pctChange(g[1], g[3])}\%$.
3. The volume doubles every 6 days, the pattern expected when all cells keep dividing.`,
    hints: ["Divide the increase by the starting value (day 6)."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain how mutations can lead to the formation of a tumour.",
    points: [
      "Mutation in a proto-oncogene forms an oncogene, which stimulates (permanent) cell division",
      "Mutation inactivating a tumour suppressor gene removes the control that stops division / triggers apoptosis",
      "The cell cycle is no longer controlled, so the cell divides repeatedly by mitosis",
      "A mass of (identical, abnormal) cells forms: a tumour; more mutations accumulate",
    ],
    modelAnswer: "A mutation can turn a proto-oncogene into an oncogene, whose protein keeps stimulating division. Mutations in tumour suppressor genes stop their proteins halting the cycle or triggering apoptosis when DNA is damaged. With the accelerator stuck on and the brake gone, the cell divides repeatedly by mitosis, ignoring normal controls, and a mass of abnormal cells forms: a tumour.",
    explanation: "Name both gene types, the loss of control, and the outcome.",
    hints: ["Use the ideas of an 'accelerator' and a 'brake'."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a malignant tumour spreads to other parts of the body.",
    points: [
      "Cells break away from the primary tumour (lose adhesion) and invade surrounding tissue",
      "They enter blood vessels or lymph vessels and are carried around the body",
      "They leave the vessels in another organ and divide to form secondary tumours (metastasis)",
    ],
    modelAnswer: "Cells of the malignant tumour lose the molecules that hold them in place, break away and invade the surrounding tissue. Some enter the blood or lymph and are carried to other organs, where they leave the vessels and divide to form secondary tumours. This is metastasis.",
    explanation: "Invade, travel, settle and grow.",
    hints: ["Name the two transport systems that carry the cells."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the benefits and limitations of screening programmes for cervical cancer.",
    points: [
      "Benefit: detects precancerous changes / early cancer before symptoms, when treatment is more successful",
      "Benefit: abnormal cells can be removed early, preventing the development of cancer",
      "Limitation: false positives cause anxiety and unnecessary procedures, or false negatives give false reassurance",
      "Limitation: needs trained staff, equipment and repeated attendance; some people cannot easily reach clinics / cost",
    ],
    modelAnswer: "Screening can detect precancerous changes in cervical cells before any symptoms, so they can be treated or removed and cancer prevented, and cancers found early are more often cured. However, no test is perfect: false positives cause worry and unnecessary procedures, while false negatives may reassure someone who needs treatment. Programmes need trained staff and equipment, and people must attend regularly, which can be difficult in remote areas.",
    explanation: "Balanced: two benefits and two limitations.",
    hints: ["Consider timing of detection, accuracy of tests and access."],
  });

  // Practice structured: cell count data for normal and cancer cells in culture
  const day = [0, 2, 4, 6, 8];
  const normal = [10, 19, 37, 52, 54];
  const cancer = [10, 20, 41, 79, 160];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Equal numbers of normal skin cells and skin cancer cells were grown in separate culture dishes of the same size. The number of cells (in thousands) was counted every 2 days.\n\n${table(["Day", ...day.map(String)], [["Normal cells / thousands", ...normal.map(String)], ["Cancer cells / thousands", ...cancer.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate how many times greater the number of cancer cells was than the number of normal cells on day 8. Give your answer to two significant figures.",
        value: cancer[4] / normal[4], sf: 2, wrong: [rnd(normal[4] / cancer[4], 2)],
        explanation: t`$160 \div 54 = ${(cancer[4] / normal[4]).toFixed(3)}$, which is 3.0 to two significant figures.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Compare the growth of the two populations.",
        points: ["Both roughly double every 2 days up to day 4", "Normal cells level off after day 6 (52 to 54 thousand) while cancer cells keep doubling to 160 thousand"],
        modelAnswer: "Both populations roughly double every 2 days until day 4. After day 6 the normal cells level off at about 52-54 thousand, but the cancer cells keep doubling, reaching 160 thousand on day 8.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest an explanation for the difference after day 6.",
        points: [
          "Normal cells stop dividing when they cover the dish / touch each other (contact inhibition / signals from neighbours)",
          "Cancer cells do not respond to these signals because genes controlling the cell cycle are mutated",
          "So cancer cells continue to divide by mitosis / pile up in layers",
        ],
        modelAnswer: "By day 6 the normal cells have covered the dish; contact with neighbouring cells signals them to stop dividing. The cancer cells have mutations in genes that control the cell cycle, so they ignore these signals and keep dividing by mitosis, piling up in layers.",
      }),
    ],
    explanation: "Normal cells stop dividing when crowded; cancer cells with mutated control genes continue.",
    hints: ["What might stop normal cells dividing once the dish is full?"],
    calculator: true,
  });

  b.struct({
    d: 4, skill: "UNDERSTANDING",
    stem: "Tatenda's grandfather farmed groundnuts and maize in a humid area. A health worker advised the family to dry their harvest well and to throw away mouldy nuts.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the group of toxins in mouldy groundnuts that can cause liver cancer.",
        accepted: ["aflatoxins", "aflatoxin"],
        wrong: ["mycotoxin"],
        explanation: "Aflatoxins from *Aspergillus flavus* are carcinogens.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why drying the harvest reduces the risk of cancer.",
        points: ["The fungus (Aspergillus) needs moisture / warm damp conditions to grow", "Less fungal growth means less aflatoxin (carcinogen) is eaten, so fewer DNA mutations in liver cells"],
        modelAnswer: "The mould that makes aflatoxins grows only in damp conditions. Dry grain and nuts do not support it, so less of the carcinogen is eaten and there is less chance of mutations in liver cells.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why aflatoxins mainly affect the liver.",
        points: ["Substances absorbed from the gut go to the liver first (hepatic portal vein)", "The liver processes / metabolises toxins, so its cells are exposed to the highest concentrations"],
        modelAnswer: "Absorbed substances are carried from the gut to the liver in the hepatic portal vein, and the liver metabolises toxins, so its cells receive the highest exposure.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: cooking mouldy groundnuts is a reliable way to make them safe to eat.",
        answer: false,
        explanation: "False. Aflatoxins are heat-stable, so ordinary cooking does not reliably destroy them; mouldy nuts should be discarded.",
      }),
    ],
    explanation: "Dry storage prevents fungal growth and aflatoxin production; the liver receives absorbed toxins first.",
    hints: ["Where does blood from the intestine go first?"],
  });

  b.card("DEFINITION", "What is **cancer**?", "Diseases caused by uncontrolled mitosis of cells with mutated cell-cycle genes; malignant tumours invade and spread.");
  b.card("CONCEPT", "Benign versus malignant tumour", "Benign: slow, encapsulated, does not spread. Malignant: invades tissue, metastasises via blood or lymph.");
  b.card("DEFINITION", "Proto-oncogene and oncogene", "Proto-oncogene: normal gene promoting division. Oncogene: mutated, permanently active form.");
  b.card("DEFINITION", "Tumour suppressor gene", "Gene whose protein stops division or triggers apoptosis when DNA is damaged (e.g. p53); loss of function allows cancer.");
  b.card("DEFINITION", "Define **metastasis**.", "Spread of cancer cells from a primary tumour through blood or lymph to form secondary tumours.");
  b.card("FACT", "Four types of carcinogen", "Chemicals (tobacco tar, aflatoxins), ionising radiation, UV radiation, some viruses (HPV, hepatitis B).");
  b.card("CONCEPT", "Why does chemotherapy cause side effects?", "It targets dividing cells, so hair follicles, gut lining and bone marrow are also affected.");
  b.card("CONCEPT", "Why does cancer risk rise with age?", "Several mutations must accumulate in one cell line over time.");
  b.card("FACT", "Aim of cancer screening", "Detect precancerous or early changes before symptoms, when treatment is most successful.");
});
